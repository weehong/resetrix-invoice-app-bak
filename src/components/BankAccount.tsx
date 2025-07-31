import { StyleSheet, Text, View } from "@react-pdf/renderer";

import { colors } from "@/helper/color";

const styles = StyleSheet.create({
  section: {
    backgroundColor: colors.white,
  },
  heading: {
    fontSize: 12,
    fontWeight: "bold",
    color: colors.primary,
    marginBottom: 4,
    textTransform: "uppercase",
  },
  detailRow: {
    flexDirection: "row",
  },
  label: {
    width: 100,
    fontSize: 10,
    fontWeight: "semibold",
    color: colors.primary,
  },
  value: {
    fontFamily: "DM Sans",
    fontSize: 10,
    color: colors.darkText,
    flex: 1,
  },
  accountName: {
    fontFamily: "DM Sans",
    color: colors.darkText,
  },
});

export default function BankDetails({
  bankName,
  swiftCode,
  accountNumber,
  accountName,
}: {
  bankName: string;
  swiftCode: string;
  accountNumber: string;
  accountName: string;
}) {
  // Helper function to check if a field should be displayed
  const shouldShowField = (value: string) => {
    return (
      value &&
      value.trim() !== "" &&
      value !== "Bank Name" &&
      value !== "SWIFT" &&
      value !== "Account Number" &&
      value !== "Account Name"
    );
  };

  return (
    <View style={styles.section}>
      <Text style={styles.heading}>Bank Transfer Details</Text>

      {shouldShowField(bankName) && (
        <View style={styles.detailRow}>
          <Text style={styles.label}>Bank Name</Text>
          <Text style={styles.value}>{bankName}</Text>
        </View>
      )}

      {shouldShowField(accountName) && (
        <View style={styles.detailRow}>
          <Text style={styles.label}>Account Name</Text>
          <Text style={[styles.value, styles.accountName]}>{accountName}</Text>
        </View>
      )}

      {shouldShowField(accountNumber) && (
        <View style={styles.detailRow}>
          <Text style={styles.label}>Account Number</Text>
          <Text style={[styles.value]}>{accountNumber}</Text>
        </View>
      )}

      {shouldShowField(swiftCode) && (
        <View style={styles.detailRow}>
          <Text style={styles.label}>SWIFT Code</Text>
          <Text style={[styles.value]}>{swiftCode}</Text>
        </View>
      )}
    </View>
  );
}
