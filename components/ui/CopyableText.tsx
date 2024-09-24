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
    }, 3000);
  };

  return (
    <View style={styles.container}>
      <TextSF style={styles.text}>{text}</TextSF>
      <Pressable onPress={handleCopy} style={styles.iconContainer}>
        <Ionicons
          name={"copy-outline"}
          size={Styles.typography.fontSize.lg}
          color={Colors.neutrals.default}
        />
      </Pressable>
      {isCopied ? <TextSF style={styles.copiedMessage}>Copied!</TextSF> : null}
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
  copiedMessage: {
    fontSize: Styles.typography.fontSize.xs,
  },
  iconContainer: {
    padding: 4,
  },
});