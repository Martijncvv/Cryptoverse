import { ActivityIndicator, StyleSheet, View } from "react-native";
import { Styles } from "@/assets/constants/Styles";
import { Colors } from "@/assets/constants/Colors";
import useAddressTxs from "@/hooks/api/useAddressTxs";
import { useState } from "react";
import { Pagination } from "@/components/layout/DonationHistory/Pagination";
import { TxInfoRow } from "@/components/layout/DonationHistory/TxInfoRow";
import { MIN_WIDTH } from "@/assets/constants/Constants";
import { TextSF } from "@/components/ui/TextSF";

interface DonationsHistoryProps {
  // TODO
}

const address = "0x8DD8cC8D942C40679D84A6C0476279DB0d12016a";
const networkId = "ethereum";
export const DonationsHistory: React.FC<DonationsHistoryProps> = () => {
  const [page, setPage] = useState(1);
  const { data, isLoading, error } = useAddressTxs(address, networkId, page);

  if (error) return <p>An error occurred: {error.message}</p>;

  // donor txhash date, network, qty total
  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  console.log("data: ", data);

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <TextSF style={styles.title}>Donations History</TextSF>
        <Pagination currentPage={page} onPageChange={handlePageChange} />
      </View>
      {/*HEADER*/}
      <View style={styles.table}>
        <View style={styles.header}>
          <TextSF style={styles.headerText}>Donor</TextSF>
          <TextSF style={styles.headerText}>Date</TextSF>
          <TextSF style={styles.headerText}>Network</TextSF>
          <TextSF style={styles.headerText}>Qty</TextSF>
          <TextSF style={styles.headerText}>Total</TextSF>
        </View>
        {/*LIST*/}
        {data?.result?.map((tx: any) => (
          <TxInfoRow key={tx.hash} tx={tx} networkId={networkId} />
        ))}
      </View>
      {isLoading ? (
        <View style={styles.loadingIcon}>
          <ActivityIndicator size="large" color={Colors.neutrals.dark} />
        </View>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  loadingIcon: {
    // center on parent container
    position: "absolute",
    top: "50%",
    left: "50%",
  },
  container: {
    flex: 1,
    minWidth: MIN_WIDTH,
    minHeight: 400,
  },
  titleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    fontSize: Styles.typography.fontSize.xxl,
    fontWeight: Styles.typography.fontWeight.extraBold,
    color: Colors.neutrals.black,
    paddingBottom: Styles.spacing.xs,
  },
  table: {
    borderWidth: 0.5,
    borderColor: Colors.neutrals.black,
    borderRadius: Styles.borderRadius.lg,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: Styles.spacing.sm,

    borderBottomWidth: 1,
    borderBottomColor: Colors.neutrals.black,
    borderTopLeftRadius: Styles.borderRadius.lg,
    borderTopRightRadius: Styles.borderRadius.lg,

    backgroundColor: Colors.neutrals.light,
  },
  headerText: {
    flex: 1,
    textAlign: "left",
    paddingLeft: Styles.spacing.xl,

    fontSize: Styles.typography.fontSize.xs,
    fontWeight: Styles.typography.fontWeight.bold,
    color: Colors.neutrals.black,
  },
});
