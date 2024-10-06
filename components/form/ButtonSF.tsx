import React from "react";
import { Pressable, StyleSheet, TextStyle, ViewStyle } from "react-native";
import { Styles } from "@/assets/constants/Styles";
import { Colors } from "@/assets/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { TextSF } from "@/components/ui/TextSF";

type ButtonColor = "white" | "black" | "whiteOutlined";

interface ButtonSFProps {
  text?: string;
  onPress: () => void;
  disabled?: boolean;
  color?: ButtonColor;
  icon?: keyof typeof Ionicons.glyphMap;
  iconPosition?: "pre" | "post";
  iconSize?: number;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

const colorSchemes: Record<
  ButtonColor,
  { bg: string; text: string; border: string }
> = {
  white: {
    bg: Colors.neutrals.white,
    text: Colors.neutrals.black,
    border: "transparent",
  },
  black: {
    bg: Colors.neutrals.black,
    text: Colors.neutrals.white,
    border: Colors.neutrals.black,
  },
  whiteOutlined: {
    bg: Colors.neutrals.white,
    text: Colors.neutrals.black,
    border: Colors.neutrals.black,
  },
};

export const ButtonSF: React.FC<ButtonSFProps> = ({
  text,
  onPress,
  disabled = false,
  color = "black",
  icon,
  iconPosition = "pre",
  iconSize = 16,
  style,
  textStyle,
}) => {
  const { bg, text: textColor, border } = colorSchemes[color];

  const buttonStyle = {
    ...styles.container,
    backgroundColor: bg,
    borderColor: border,
    ...style,
  };

  const contentStyle = [styles.text, { color: textColor }, textStyle];

  return (
    <Pressable
      style={({ pressed }) => [
        buttonStyle,
        { opacity: disabled || pressed ? 0.7 : 1 },
      ]}
      onPress={onPress}
      disabled={disabled}
    >
      {icon && iconPosition === "pre" ? (
        <Ionicons
          name={icon}
          size={iconSize}
          color={textColor}
          style={styles.icon}
        />
      ) : null}
      {text && <TextSF style={contentStyle}>{text}</TextSF>}
      {icon && iconPosition === "post" ? (
        <Ionicons
          name={icon}
          size={iconSize}
          color={textColor}
          style={styles.icon}
        />
      ) : null}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: Styles.spacing.sm,
    paddingHorizontal: Styles.spacing.xl,
    paddingVertical: Styles.spacing.md,
    borderRadius: Styles.borderRadius.md,
    borderWidth: 1,
  },
  text: {
    fontWeight: Styles.typography.fontWeight.bold,
  },
  icon: {},
});
