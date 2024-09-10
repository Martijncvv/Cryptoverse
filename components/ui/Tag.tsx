import { StyleSheet, Text, View } from "react-native";
import { Colors } from "@/assets/constants/Colors";
import { Styles } from "@/assets/constants/Styles";

interface TagProps {
  text: string;
  backgroundColor: string;
}

export const Tag: React.FC<TagProps> = ({
  text,
  backgroundColor = Colors.neutrals.white,
}) => {
  return (
    <View style={{ ...styles.container, backgroundColor: backgroundColor }}>
      <Text style={styles.text}>{text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 100,
    height: 22,

    justifyContent: "center",
    alignItems: "center",

    borderWidth: 0.5,
    borderColor: Colors.neutrals.black,
    borderRadius: Styles.borderRadius.xs,
  },
  text: {
    fontSize: Styles.typography.fontSize.xs,
    fontWeight: Styles.typography.fontWeight.medium,
    color: Colors.neutrals.black,
  },
});
