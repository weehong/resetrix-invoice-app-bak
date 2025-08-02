import { StyleSheet, Text, View } from "@react-pdf/renderer";

import { colors } from "@/helper/color";
import type { AddressInfo } from "@/types/invoice";

const styles = StyleSheet.create({
  section: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  addressBlock: {
    width: "45%",
  },
  label: {
    fontSize: 10,
    fontWeight: "bold",
    color: colors.primary,
    marginBottom: 4,
    textTransform: "uppercase",
  },
  text: {
    fontSize: 10,
    color: colors.darkText,
    lineHeight: 1.4,
  },
  name: {
    fontWeight: "bold",
    marginBottom: 2,
  },
  company: {
    fontStyle: "italic",
    marginBottom: 2,
  },
});

interface AddressSectionProps {
  from: AddressInfo;
  to: AddressInfo;
}

const AddressBlock = ({
  label,
  address,
}: {
  label: string;
  address: AddressInfo;
}) => (
  <View style={styles.addressBlock}>
    <Text style={styles.label}>{label}</Text>
    {address.name ? (
      <Text style={[styles.text, styles.name]}>{address.name}</Text>
    ) : (
      <Text style={[styles.text, styles.name]}>John company</Text>
    )}
    {address.registrationNumber && (
      <Text style={[styles.text, styles.name]}>
        {address.registrationNumber}
      </Text>
    )}
    {address.name !== address.company && (
      <Text style={[styles.text, styles.company]}>{address.company}</Text>
    )}
    <Text style={styles.text}>{address.address}</Text>
    {address.postal_code && (
      <Text style={styles.text}>{address.postal_code}</Text>
    )}
    {address.email && <Text style={styles.text}>{address.email}</Text>}
    {address.phone && <Text style={styles.text}>{address.phone}</Text>}
  </View>
);

export default function AddressSection({ from, to }: AddressSectionProps) {
  return (
    <View style={styles.section}>
      <AddressBlock label="From" address={from} />
      <AddressBlock label="To" address={to} />
    </View>
  );
}
