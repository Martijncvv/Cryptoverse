import { Pressable, StyleSheet, Text } from "react-native";
import { Styles } from "@/assets/constants/Styles";
import { Colors } from "@/assets/constants/Colors";
import Ionicons from "@expo/vector-icons/Ionicons";

interface ButtonSFProps {
  text?: string;
  onPress: () => void;
  disabled?: boolean;
  color?: "white" | "black" | "whiteOutlined";
  icon?: string;
  iconSize?: number;
}

export const ButtonSF: React.FC<ButtonSFProps> = ({
  text,
  onPress,
  disabled,
  color = "black",
  icon,
  iconSize = 16,
}) => {
  const backgroundColorMap = {
    whiteOutlined: Colors.neutrals.white,
    black: Colors.neutrals.black,
    white: Colors.neutrals.white,
  };
  const textColorMap = {
    whiteOutlined: Colors.neutrals.black,
    black: Colors.neutrals.white,
    white: Colors.neutrals.black,
  };

  const borderColorMap = {
    whiteOutlined: Colors.neutrals.black,
    black: Colors.neutrals.black,
    white: "transparent",
  };

  return (
    <Pressable
      style={{
        ...styles.container,
        backgroundColor: backgroundColorMap[color],
        borderColor: borderColorMap[color],
      }}
      onPress={onPress}
      disabled={disabled}
    >
      {text ? (
        <Text
          style={{
            ...styles.text,
            color: textColorMap[color],
          }}
        >
          {text}
        </Text>
      ) : null}
      {icon ? (
        // @ts-ignore
        <Ionicons name={icon} size={iconSize} color={textColorMap[color]} />
      ) : null}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: Styles.spacing.xs,
    paddingHorizontal: Styles.spacing.xl,
    paddingVertical: Styles.spacing.md,
    borderRadius: Styles.borderRadius.md,
    borderWidth: 1,
  },
  text: {
    fontSize: Styles.typography.fontSize.md,
    fontWeight: Styles.typography.fontWeight.bold,
  },
});
