import { Image, StyleSheet, Text, View } from "@react-pdf/renderer";

import { colors } from "@/helper/color";

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  logoContainer: {
    width: "50%",
    alignItems: "flex-end",
  },
  logo: {
    width: 150,
    objectFit: "contain",
  },
  invoiceInfo: {
    width: "50%",
    alignItems: "flex-start",
    justifyContent: "flex-end",
  },
  invoiceTitle: {
    fontSize: 12,
    fontWeight: "bold",
    color: colors.primary,
  },
  invoiceNumber: {
    fontSize: 10,
    color: colors.darkText,
  },
  dueDate: {
    fontSize: 10,
    color: colors.darkText,
    marginTop: 4,
  },
});

interface InvoiceHeaderProps {
  invoiceNumber: string;
  logo: string | undefined;
  invoiceDate?: string;
  dueDate?: string;
}

const Logo = ({ logo, dueDate }: { logo: string | undefined; dueDate?: string }) => {
  const formatDate = (dateString?: string) => {
    if (!dateString) return new Date().toLocaleDateString('en-GB').replace(/\//g, '-');
    return new Date(dateString).toLocaleDateString('en-GB').replace(/\//g, '-');
  };

  return (
    <View style={styles.logoContainer}>
      {/* eslint-disable-next-line jsx-a11y/alt-text */}
      <Image style={styles.logo} src={logo} />
      {dueDate && (
        <Text style={styles.dueDate}>Due Date: {formatDate(dueDate)}</Text>
      )}
    </View>
  );
};

const InvoiceInfo = ({
  invoiceNumber,
  invoiceDate,
}: {
  invoiceNumber: string;
  invoiceDate?: string;
}) => {
  const formatDate = (dateString?: string) => {
    if (!dateString) return new Date().toLocaleDateString('en-GB').replace(/\//g, '-');
    return new Date(dateString).toLocaleDateString('en-GB').replace(/\//g, '-');
  };

  return (
    <View style={styles.invoiceInfo}>
      <Text style={styles.invoiceTitle}>INVOICE</Text>
      <Text style={styles.invoiceNumber}>{invoiceNumber}</Text>
      <Text style={styles.invoiceNumber}>{formatDate(invoiceDate)}</Text>
    </View>
  );
};

export default function InvoiceHeader({
  invoiceNumber,
  logo,
  invoiceDate,
  dueDate,
}: InvoiceHeaderProps) {
  return (
    <View style={styles.container}>
      <InvoiceInfo
        invoiceNumber={invoiceNumber}
        invoiceDate={invoiceDate}
      />
      <Logo logo={logo} dueDate={dueDate} />
    </View>
  );
}
