import { Pressable, StyleSheet, Text } from "react-native";
import { Styles } from "@/assets/constants/Styles";
import { Colors } from "@/assets/constants/Colors";
import Ionicons from "@expo/vector-icons/Ionicons";

interface ButtonSFProps {
  text: string;
  onPress: () => void;
  color?: "white" | "black";
  icon?: string;
  iconSize?: number;
}

export const ButtonSF: React.FC<ButtonSFProps> = ({
  text,
  onPress,
  color = "black",
  icon,
  iconSize = 16,
}) => {
  const backgroundColorMap = {
    white: Colors.neutrals.white,
    black: Colors.neutrals.black,
  };
  const fontColorMap = {
    white: Colors.neutrals.black,
    black: Colors.neutrals.white,
  };

  const borderColorMap = {
    white: Colors.neutrals.black,
    black: Colors.neutrals.black,
  };

  return (
    <Pressable
      style={{
        ...styles.container,
        backgroundColor: backgroundColorMap[color],
        borderColor: borderColorMap[color],
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
      {icon ? (
        // @ts-ignore
        <Ionicons name={icon} size={iconSize} color={Colors.neutrals.black} />
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
