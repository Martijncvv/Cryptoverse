import { StyleSheet, View } from "react-native";
import { Styles } from "@/assets/constants/Styles";
import { Colors } from "@/assets/constants/Colors";
import { TextSF } from "@/components/ui/TextSF";

interface BoxedTextProps {
  text: string;
  backgroundColor?: string;
}

export const BoxedText: React.FC<BoxedTextProps> = ({
  text,
  backgroundColor = Colors.principal.medium,
}) => {
  const styles = StyleSheet.create({
    container: {
      alignSelf: "flex-start",
      height: 30,
      justifyContent: "center",
      paddingHorizontal: Styles.spacing.xl,
      borderRadius: Styles.borderRadius.sm,
      backgroundColor: backgroundColor,
    },

    text: {},
  });

  return (
    <View style={styles.container}>
      <TextSF style={styles.text}>{text}</TextSF>
    </View>
  );
};
