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
    width: 50,
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
});

interface InvoiceHeaderProps {
  invoiceNumber: string;
  logo: string | undefined;
}

const Logo = ({ logo }: { logo: string | undefined }) => (
  <View style={styles.logoContainer}>
    {/* eslint-disable-next-line jsx-a11y/alt-text */}
    <Image style={styles.logo} src={logo} />
  </View>
);

const InvoiceInfo = ({ invoiceNumber }: { invoiceNumber: string }) => (
  <View style={styles.invoiceInfo}>
    <Text style={styles.invoiceTitle}>INVOICE</Text>
    <Text style={styles.invoiceNumber}>{invoiceNumber}</Text>
  </View>
);

export default function InvoiceHeader({
  invoiceNumber,
  logo,
}: InvoiceHeaderProps) {
  return (
    <View style={styles.container}>
      <InvoiceInfo invoiceNumber={invoiceNumber} />
      <Logo logo={logo} />
    </View>
  );
}
