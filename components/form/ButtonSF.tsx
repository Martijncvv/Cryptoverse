import React from "react";
import {
  Pressable,
  StyleSheet,
  Text,
  TextStyle,
  ViewStyle,
} from "react-native";
import { Styles } from "@/assets/constants/Styles";
import { Colors } from "@/assets/constants/Colors";
import { Ionicons } from "@expo/vector-icons";

type ButtonColor = "white" | "black" | "whiteOutlined";

interface ButtonSFProps {
  text?: string;
  onPress: () => void;
  disabled?: boolean;
  color?: ButtonColor;
  icon?: keyof typeof Ionicons.glyphMap;
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
  iconSize = 16,
  style,
  textStyle,
}) => {
  const { bg, text: textColor, border } = colorSchemes[color];

  const buttonStyle = [
    styles.container,
    { backgroundColor: bg, borderColor: border },
    style,
  ];

  const contentStyle = [styles.text, { color: textColor }, textStyle];

  const renderContent = () => (
    <>
      {icon && (
        <Ionicons
          name={icon}
          size={iconSize}
          color={textColor}
          style={styles.icon}
        />
      )}
      {text && <Text style={contentStyle}>{text}</Text>}
    </>
  );

  return (
    <Pressable
      style={({ pressed }) => [
        ...buttonStyle,
        { opacity: disabled || pressed ? 0.7 : 1 },
      ]}
      onPress={onPress}
      disabled={disabled}
    >
      {renderContent()}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: Styles.spacing.xl,
    paddingVertical: Styles.spacing.md,
    borderRadius: Styles.borderRadius.md,
    borderWidth: 1,
  },
  text: {
    textAlign: "center",
    fontSize: Styles.typography.fontSize.md,
    fontWeight: Styles.typography.fontWeight.bold,
  },
  icon: {
    marginRight: Styles.spacing.xs,
  },
});
