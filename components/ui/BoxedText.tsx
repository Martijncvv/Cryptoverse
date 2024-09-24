import { StyleSheet, useWindowDimensions, View } from "react-native";
import { Styles } from "@/assets/constants/Styles";
import { Colors } from "@/assets/constants/Colors";
import { TextSF } from "@/components/ui/TextSF";

interface BoxedTextProps {
  text: string;
  backgroundColor?: string;
}

export const BoxedText: React.FC<BoxedTextProps> = ({
  text,
  backgroundColor = Colors.principal.light,
}) => {
  const { width: windowWidth } = useWindowDimensions();

  const styles = StyleSheet.create({
    container: {
      alignSelf: "flex-start",
      // width: windowWidth < 724 ? "100%" : "48%",
      paddingHorizontal: Styles.spacing.xl,
      paddingVertical: Styles.spacing.sm,
      borderRadius: Styles.borderRadius.sm,
      backgroundColor: backgroundColor,
    },

    text: {
      fontSize: Styles.typography.fontSize.md,
      fontWeight: Styles.typography.fontWeight.normal,
      color: Colors.neutrals.black,
    },
  });

  return (
    <View style={styles.container}>
      <TextSF style={styles.text}>{text}</TextSF>
    </View>
  );
};
