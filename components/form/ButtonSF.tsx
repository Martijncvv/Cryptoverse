import { Pressable, StyleSheet, Text } from "react-native";
import { Styles } from "@/assets/constants/Styles";
import { Colors } from "@/assets/constants/Colors";

interface ButtonSFProps {
  text: string;
  onPress: () => void;
  color?: "white" | "black";
}

export const ButtonSF: React.FC<ButtonSFProps> = ({
  text,
  onPress,
  color = "black",
}) => {
  const backgroundColorMap = {
    white: Colors.neutrals.white,
    black: Colors.neutrals.black,
  };
  const fontColorMap = {
    white: Colors.neutrals.black,
    black: Colors.neutrals.white,
  };

  return (
    <Pressable
      style={{
        ...styles.container,
        backgroundColor: backgroundColorMap[color],
      }}
      onPress={onPress}
    >
      <Text
        style={{
          ...styles.text,
          color: fontColorMap[color],
        }}
      >
        {text}
      </Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: Styles.spacing.xl,
    paddingVertical: Styles.spacing.md,
    borderRadius: Styles.borderRadius.md,
  },
  text: {
    fontSize: Styles.typography.fontSize.md,
    fontWeight: Styles.typography.fontWeight.bold,
  },
});
