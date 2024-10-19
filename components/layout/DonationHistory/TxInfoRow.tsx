import { Linking, Pressable, StyleSheet } from "react-native";
import { addressFormatter } from "@/utils/addressFormatter";
import { timestampFormatter } from "@/utils/timestampFormatter";
import { formatTxExplorerLink } from "@/utils/formatTxExplorerLink";
import { Styles } from "@/assets/constants/Styles";
import { Colors } from "@/assets/constants/Colors";
import { TextSF } from "@/components/ui/TextSF";
import { MINT_OPTIONS } from "@/components/layout/DonateModal/MintContainer";

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

  const formatWeiToEth = (wei: string) => {
    // round to 2 digits
    return (parseFloat(wei) / 10 ** 18).toFixed(3);
  };

  const formatToUsdc = (txFunctionInput: string) => {
    // find mindoption based on functionInput\
    const mintOption = MINT_OPTIONS.find(
      (option) => option.mintInput === txFunctionInput,
    );
    return mintOption?.usdc;
  };
  const formatToPackages = (txFunctionInput: string) => {
    // find mindoption based on functionInput\
    const mintOption = MINT_OPTIONS.find(
      (option) => option.mintInput === txFunctionInput,
    );
    return mintOption?.packages;
  };

  return (
    <Pressable
      onPress={() => handleRowClick(tx.hash, networkId)}
      key={tx.hash}
      style={styles.row}
    >
      <TextSF style={styles.rowText}>{addressFormatter(tx.from)}</TextSF>
      <TextSF style={styles.rowText}>{timestampFormatter(tx.timeStamp)}</TextSF>
      <TextSF style={styles.rowText}>{formatToUsdc(tx.input)}</TextSF>
      <TextSF style={styles.rowText}>{formatToPackages(tx.input)}</TextSF>
      {/*<TextSF style={styles.rowText}>{tx.nonce}</TextSF>*/}
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
