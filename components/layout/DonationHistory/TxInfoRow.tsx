import { Linking, Pressable, StyleSheet, Text } from "react-native";
import { addressFormatter } from "@/utils/addressFormatter";
import { timestampFormatter } from "@/utils/timestampFormatter";
import { formatTxExplorerLink } from "@/utils/formatTxExplorerLink";
import { Styles } from "@/assets/constants/Styles";
import { Colors } from "@/assets/constants/Colors";

interface TxInfoRowProps {
  tx: any;
  networkId: string;
}

export const TxInfoRow: React.FC<TxInfoRowProps> = ({ tx, networkId }) => {
  const handleRowClick = (txHash: string, networkId: string) => {
    const explorerLink = formatTxExplorerLink(txHash, networkId);
    Linking.openURL(explorerLink).catch((err) =>
      console.error("Failed to open URL:", err),
    );
  };

  return (
    <Pressable
      onPress={() => handleRowClick(tx.hash, networkId)}
      key={tx.hash}
      style={styles.row}
    >
      <Text style={styles.rowText}>{addressFormatter(tx.from)}</Text>
      <Text style={styles.rowText}>{timestampFormatter(tx.timeStamp)}</Text>
      <Text style={styles.rowText}>Ethereum</Text>
      <Text style={styles.rowText}>{tx.value}</Text>
      <Text style={styles.rowText}>{tx.nonce}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    justifyContent: "flex-start",
  },
  rowText: {
    flex: 1,
    textAlign: "left",
    paddingLeft: Styles.spacing.xl,

    paddingVertical: Styles.spacing.sm,
    fontSize: Styles.typography.fontSize.sm,
    fontWeight: Styles.typography.fontWeight.normal,
    color: Colors.neutrals.dark,
  },
});
