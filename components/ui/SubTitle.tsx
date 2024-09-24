import { StyleSheet, Text } from "react-native";
import { Styles } from "@/assets/constants/Styles";
import { Colors } from "@/assets/constants/Colors";

interface SubTitleProps {
  text: string;
}

export const SubTitle: React.FC<SubTitleProps> = ({ text }) => {
  const styles = StyleSheet.create({
    text: {
      fontSize: Styles.typography.fontSize.md,
      fontWeight: Styles.typography.fontWeight.bold,
      color: Colors.neutrals.black,
    },
  });

  return <Text style={styles.text}>{text}</Text>;
};
