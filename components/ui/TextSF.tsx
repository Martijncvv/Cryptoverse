import { Platform, StyleSheet, Text } from "react-native";
import { Styles } from "@/assets/constants/Styles";
import { Colors } from "@/assets/constants/Colors";

interface TextSFProps {
  children: any;
  style?: any;
}

export const TextSF: React.FC<TextSFProps> = ({
  children,
  style,
  ...props
}) => {
  return (
    <Text
      style={[
        styles.text,
        style,
        { lineHeight: Boolean(style?.fontSize) ? undefined : 22 },
      ]}
      {...props}
    >
      {children}
    </Text>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: Styles.typography.fontSize.md,
    fontWeight: Styles.typography.fontWeight.normal,
    color: Colors.base.black,
    fontFamily: Platform.select({
      android: "Manrope_400Regular",
      web: "Manrope_400Regular",
      ios: "Manrope-Regular",
    }),
  },
});
