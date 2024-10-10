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

const accountAddress = "0x30C7E39F0dCDCd7358714856Ae8BA24830cc6f10"; // testAddress
const networkId = "ethereum";
export const DonationsHistory: React.FC<DonationsHistoryProps> = () => {
  const [page, setPage] = useState(1);
  const { data, isLoading, error } = useAddressTxs(
    accountAddress,
    networkId,
    page,
  );

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
          <TextSF style={styles.headerText}>USDC</TextSF>
          <TextSF style={styles.headerText}>Packages</TextSF>
          {/*<TextSF style={styles.headerText}>Total</TextSF>*/}
        </View>
        {/*LIST*/}
        {data?.result?.map((tx: any) => (
          <TxInfoRow key={tx.hash} tx={tx} networkId={networkId} />
        ))}
        {/*PLACEHOLDER*/}
        {data?.result?.length === 0 ? (
          <TextSF style={styles.headerText}>No donations found</TextSF>
        ) : null}
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
    paddingBottom: Styles.spacing.xs,
  },
  table: {
    borderWidth: 0.5,
    borderColor: Colors.base.black,
    borderRadius: Styles.borderRadius.lg,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: Styles.spacing.sm,

    borderBottomWidth: 0.5,
    borderBottomColor: Colors.base.black,
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
  },
});
