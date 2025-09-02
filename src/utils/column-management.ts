// Column management utilities for dynamic invoice table columns

export interface ColumnConfig {
  id: string;
  key: string;
  label: string;
  type: "text" | "number" | "currency";
  required: boolean;
  order: number;
  width?: string;
}

export interface ColumnManagementUtils {
  addColumn: (columns: ColumnConfig[], newColumn: Omit<ColumnConfig, "id" | "order">) => ColumnConfig[];
  removeColumn: (columns: ColumnConfig[], columnId: string) => ColumnConfig[];
  updateColumn: (columns: ColumnConfig[], columnId: string, updates: Partial<ColumnConfig>) => ColumnConfig[];
  reorderColumns: (columns: ColumnConfig[], fromIndex: number, toIndex: number) => ColumnConfig[];
  validateColumnKey: (key: string, existingColumns: ColumnConfig[], excludeId?: string) => string | null;
  getDefaultColumns: () => ColumnConfig[];
  syncItemsWithColumns: (items: any[], oldColumns: ColumnConfig[], newColumns: ColumnConfig[]) => any[];
}

/**
 * Generate a unique column ID
 */
export const generateColumnId = (): string => {
  return `col_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};

/**
 * Get default column configuration
 */
export const getDefaultColumns = (): ColumnConfig[] => [
  { id: "desc", key: "description", label: "Description", type: "text", required: true, order: 0 },
  { id: "qty", key: "quantity", label: "Quantity", type: "number", required: true, order: 1 },
  { id: "rate", key: "unitPrice", label: "Rate", type: "currency", required: true, order: 2 },
  { id: "total", key: "total", label: "Total", type: "currency", required: false, order: 3 },
];

/**
 * Add a new column to the configuration
 */
export const addColumn = (
  columns: ColumnConfig[],
  newColumn: Omit<ColumnConfig, "id" | "order">
): ColumnConfig[] => {
  const maxOrder = Math.max(...columns.map(col => col.order), -1);
  const columnWithId: ColumnConfig = {
    ...newColumn,
    id: generateColumnId(),
    order: maxOrder + 1,
  };

  return [...columns, columnWithId].sort((a, b) => a.order - b.order);
};

/**
 * Remove a column from the configuration
 */
export const removeColumn = (columns: ColumnConfig[], columnId: string): ColumnConfig[] => {
  const filteredColumns = columns.filter(col => col.id !== columnId);

  // Reorder remaining columns to maintain sequential order
  return filteredColumns
    .sort((a, b) => a.order - b.order)
    .map((col, index) => ({ ...col, order: index }));
};

/**
 * Update an existing column
 */
export const updateColumn = (
  columns: ColumnConfig[],
  columnId: string,
  updates: Partial<ColumnConfig>
): ColumnConfig[] => {
  return columns.map(col =>
    col.id === columnId ? { ...col, ...updates } : col
  ).sort((a, b) => a.order - b.order);
};

/**
 * Reorder columns by moving from one index to another
 */
export const reorderColumns = (
  columns: ColumnConfig[],
  fromIndex: number,
  toIndex: number
): ColumnConfig[] => {
  const sortedColumns = [...columns].sort((a, b) => a.order - b.order);
  const [movedColumn] = sortedColumns.splice(fromIndex, 1);
  sortedColumns.splice(toIndex, 0, movedColumn);

  // Update order values
  return sortedColumns.map((col, index) => ({ ...col, order: index }));
};

/**
 * Validate column key uniqueness and format
 */
export const validateColumnKey = (
  key: string,
  existingColumns: ColumnConfig[],
  excludeId?: string
): string | null => {
  if (!key || key.trim().length === 0) {
    return "Column key is required";
  }

  const trimmedKey = key.trim();

  // Check for valid key format (alphanumeric and underscores only)
  if (!/^[a-zA-Z][a-zA-Z0-9_]*$/.test(trimmedKey)) {
    return "Column key must start with a letter and contain only letters, numbers, and underscores";
  }

  // Check for reserved keys
  const reservedKeys = ["id", "description", "quantity", "unitPrice", "total"];
  if (reservedKeys.includes(trimmedKey)) {
    return "This key is reserved and cannot be used";
  }

  // Check for uniqueness
  const isDuplicate = existingColumns.some(col =>
    col.key === trimmedKey && col.id !== excludeId
  );

  if (isDuplicate) {
    return "Column key must be unique";
  }

  return null;
};

/**
 * Synchronize invoice items with column changes
 * Handles adding/removing custom fields when columns are added/removed
 */
export const syncItemsWithColumns = (
  items: any[],
  oldColumns: ColumnConfig[],
  newColumns: ColumnConfig[]
): any[] => {
  const oldCustomKeys = oldColumns
    .filter(col => !["description", "quantity", "unitPrice", "total"].includes(col.key))
    .map(col => col.key);

  const newCustomKeys = newColumns
    .filter(col => !["description", "quantity", "unitPrice", "total"].includes(col.key))
    .map(col => col.key);

  const removedKeys = oldCustomKeys.filter(key => !newCustomKeys.includes(key));
  const addedKeys = newCustomKeys.filter(key => !oldCustomKeys.includes(key));

  return items.map(item => {
    const updatedItem = { ...item };

    // Initialize customFields if it doesn't exist
    if (!updatedItem.customFields) {
      updatedItem.customFields = {};
    }

    // Remove fields for deleted columns
    removedKeys.forEach(key => {
      delete updatedItem.customFields[key];
    });

    // Add default values for new columns
    addedKeys.forEach(key => {
      const column = newColumns.find(col => col.key === key);
      if (column) {
        updatedItem.customFields[key] = column.type === "number" || column.type === "currency" ? 0 : "";
      }
    });

    // Clean up empty customFields object
    if (Object.keys(updatedItem.customFields).length === 0) {
      delete updatedItem.customFields;
    }

    return updatedItem;
  });
};

/**
 * Get column value from an item
 */
export const getColumnValue = (item: any, column: ColumnConfig): any => {
  // Handle built-in fields
  if (["description", "quantity", "unitPrice", "total"].includes(column.key)) {
    return item[column.key];
  }

  // Handle custom fields
  return item.customFields?.[column.key] || (column.type === "number" || column.type === "currency" ? 0 : "");
};

/**
 * Set column value in an item
 */
export const setColumnValue = (item: any, column: ColumnConfig, value: any): any => {
  const updatedItem = { ...item };

  // Handle built-in fields
  if (["description", "quantity", "unitPrice", "total"].includes(column.key)) {
    updatedItem[column.key] = value;
  } else {
    // Handle custom fields
    if (!updatedItem.customFields) {
      updatedItem.customFields = {};
    }
    updatedItem.customFields[column.key] = value;
  }

  return updatedItem;
};

/**
 * Column management utilities object
 */
export const columnUtils: ColumnManagementUtils = {
  addColumn,
  removeColumn,
  updateColumn,
  reorderColumns,
  validateColumnKey,
  getDefaultColumns,
  syncItemsWithColumns,
};
