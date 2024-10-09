import React, { useState } from "react";
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
  {
    bg: string;
    text: string;
    border: string;
    hoverBg: string;
    hoverText: string;
    hoverBorder: string;
    hoverShadow: string;
  }
> = {
  white: {
    bg: Colors.base.white,
    text: Colors.base.black,
    border: "transparent",
    hoverBg: Colors.neutrals.light,
    hoverText: Colors.base.black,
    hoverBorder: Colors.principal.light,
    hoverShadow: Colors.principal.medium,
  },
  black: {
    bg: Colors.base.black,
    text: Colors.base.white,
    border: Colors.base.black,
    hoverBg: Colors.neutrals.dark,
    hoverText: Colors.base.white,
    hoverBorder: Colors.principal.light,
    hoverShadow: Colors.principal.medium,
  },
  whiteOutlined: {
    bg: Colors.base.white,
    text: Colors.base.black,
    border: Colors.base.black,
    hoverBg: Colors.neutrals.light,
    hoverText: Colors.principal.default,
    hoverBorder: Colors.principal.default,
    hoverShadow: Colors.principal.medium,
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
  const [isHovered, setIsHovered] = useState(false);
  const {
    bg,
    text: textColor,
    border,
    hoverBg,
    hoverText,
    hoverBorder,
    hoverShadow,
  } = colorSchemes[color];

  const buttonStyle = {
    ...styles.container,
    backgroundColor: isHovered ? hoverBg : bg,
    borderColor: isHovered ? hoverBorder : border,
    ...style,
  };

  const contentStyle = [
    styles.text,
    { color: isHovered ? hoverText : textColor },
    textStyle,
  ];

  const hoverStyle: ViewStyle = {
    shadowColor: hoverShadow,
    shadowOpacity: 1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 0 },
  };

  return (
    <Pressable
      style={({ pressed }) => [
        buttonStyle,
        { opacity: disabled || pressed ? 0.7 : 1 },
        isHovered && hoverStyle,
      ]}
      onPress={onPress}
      disabled={disabled}
      onHoverIn={() => setIsHovered(true)}
      onHoverOut={() => setIsHovered(false)}
    >
      {icon && iconPosition === "pre" ? (
        <Ionicons
          name={icon}
          size={iconSize}
          color={textColor}
          style={contentStyle}
        />
      ) : null}
      {text && <TextSF style={contentStyle}>{text}</TextSF>}
      {icon && iconPosition === "post" ? (
        <Ionicons
          name={icon}
          size={iconSize}
          color={textColor}
          style={contentStyle}
        />
      ) : null}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 42,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: Styles.spacing.sm,
    paddingHorizontal: Styles.spacing.xl,
    borderRadius: Styles.borderRadius.md,
    borderWidth: 1,
  },
  text: {
    fontWeight: Styles.typography.fontWeight.bold,
  },
  icon: {},
});
