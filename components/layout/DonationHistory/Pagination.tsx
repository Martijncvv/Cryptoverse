import { Pressable, StyleSheet, View } from "react-native";
import { Styles } from "@/assets/constants/Styles";
import { Colors } from "@/assets/constants/Colors";
import Ionicons from "@expo/vector-icons/Ionicons";
import { TextSF } from "@/components/ui/TextSF";

interface PaginationProps {
  currentPage: number;
  onPageChange: (newPage: number) => void;
}

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  onPageChange,
}) => {
  const handleNextPage = () => {
    onPageChange(currentPage + 1);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  return (
    <View style={styles.paginationContainer}>
      <Pressable onPress={handlePrevPage} disabled={currentPage === 1}>
        <Ionicons
          name={"chevron-back-outline"}
          size={20}
          color={Colors.neutrals.black}
        />
      </Pressable>
      <TextSF style={styles.pageText}>{currentPage}</TextSF>
      <Pressable onPress={handleNextPage}>
        <Ionicons
          name={"chevron-forward-outline"}
          size={20}
          color={Colors.neutrals.black}
        />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  paginationContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: Styles.spacing.sm,
  },
  pageText: {
    width: 24,
    height: 24,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: Styles.borderRadius.sm,

    borderWidth: 1,
    borderColor: Colors.neutrals.black,

    fontSize: Styles.typography.fontSize.xs,
  },
});
