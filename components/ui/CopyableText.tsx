import { Pressable, StyleSheet, View } from "react-native";
import { Styles } from "@/assets/constants/Styles";
import { Colors } from "@/assets/constants/Colors";
import * as Clipboard from "expo-clipboard";
import Ionicons from "@expo/vector-icons/Ionicons";
import { TextSF } from "@/components/ui/TextSF";
import { useState } from "react";

interface CopyableTextProps {
  text: string;
}

export const CopyableText: React.FC<CopyableTextProps> = ({ text }) => {
  const [isCopied, setIsCopied] = useState(false);
  const handleCopy = async () => {
    await Clipboard.setStringAsync(text);
    setIsCopied(true);
    // wait 5s and reset isCopied
    setTimeout(() => {
      setIsCopied(false);
    }, 2000);
  };

  return (
    <View style={styles.container}>
      <TextSF style={styles.text}>{text}</TextSF>
      <Pressable onPress={handleCopy} style={styles.iconContainer}>
        <Ionicons
          name={"copy-outline"}
          size={Styles.typography.fontSize.lg}
          color={isCopied ? Colors.principal.default : Colors.neutrals.default}
        />
        {isCopied ? (
          <View style={styles.overlayContainer}>
            <Ionicons
              name={"checkmark-circle"}
              size={Styles.typography.fontSize.xs}
              color={Colors.green.dark}
            />
            <TextSF style={styles.copiedMessage}>Copied</TextSF>
          </View>
        ) : null}
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
  },
  text: {
    marginRight: 8,
  },
  overlayContainer: {
    position: "absolute",
    top: -10,
    left: "100%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: Styles.spacing.xs,
    zIndex: 1000,
    paddingVertical: Styles.spacing.xs,
    paddingHorizontal: Styles.spacing.sm,
    backgroundColor: Colors.neutrals.black,
    borderRadius: Styles.borderRadius.xs,
  },
  copiedMessage: {
    fontSize: Styles.typography.fontSize.xs,
    fontWeight: Styles.typography.fontWeight.medium,
    color: Colors.neutrals.white,
  },
  iconContainer: {
    padding: 4,
  },
});
