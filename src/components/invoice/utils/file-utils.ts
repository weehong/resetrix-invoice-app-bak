// Helper function to convert file to base64
export const convertFileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });
};

// Validate image file
export const validateImageFile = (file: File): string | null => {
  const validTypes = ["image/jpeg", "image/jpg", "image/png", "image/svg+xml"];
  const maxSize = 5 * 1024 * 1024; // 5MB

  if (!validTypes.includes(file.type)) {
    return "Please upload a valid image file (JPG, PNG, or SVG)";
  }

  if (file.size > maxSize) {
    return "File size must be less than 5MB";
  }

  return null;
};
