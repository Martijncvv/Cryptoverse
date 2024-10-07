import { StyleSheet, View } from "react-native";
import { Styles } from "@/assets/constants/Styles";
import { Colors } from "@/assets/constants/Colors";

interface CardContainerProps {
  children: any;
  gap?: number;
}

export const CardContainer: React.FC<CardContainerProps> = ({
  children,
  gap = 0,
}) => {
  const styles = StyleSheet.create({
    cardContainer: {
      flexShrink: 1,
      borderWidth: 0.5,
      borderColor: Colors.neutrals.default,
      borderRadius: Styles.borderRadius.lg,
      padding: Styles.spacing.xl,
      gap: gap,
    },
  });
  return <View style={styles.cardContainer}>{children}</View>;
};
