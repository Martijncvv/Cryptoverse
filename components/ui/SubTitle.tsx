import { StyleSheet } from "react-native";
import { Styles } from "@/assets/constants/Styles";
import { TextSF } from "@/components/ui/TextSF";

interface SubTitleProps {
  text: string;
}

export const SubTitle: React.FC<SubTitleProps> = ({ text }) => {
  const styles = StyleSheet.create({
    text: {
      fontWeight: Styles.typography.fontWeight.bold,
    },
  });

  return <TextSF style={styles.text}>{text}</TextSF>;
};
