import { Image, Pressable, StyleSheet } from "react-native";
import { Styles } from "@/assets/constants/Styles";
import { Colors } from "@/assets/constants/Colors";
import { TextSF } from "@/components/ui/TextSF";
import React, { useState } from "react";

interface ConnectorOptionProps {
  text: string;
  imageSource: any;
  onPress: () => void;
}

export const ConnectorOption: React.FC<ConnectorOptionProps> = ({
  text,
  imageSource,
  onPress,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Pressable
      style={[
        styles.menuOption,
        isHovered ? styles.menuOptionHoover : undefined,
      ]}
      onPress={onPress}
      onHoverIn={() => setIsHovered(true)}
      onHoverOut={() => setIsHovered(false)}
    >
      <Image style={styles.tokenIcon} source={imageSource} />
      <TextSF style={isHovered ? styles.hoverText : undefined}>{text}</TextSF>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  menuOption: {
    flexDirection: "row",
    alignItems: "center",
    minWidth: 200,
    gap: Styles.spacing.sm,
    paddingVertical: Styles.spacing.lg,
    paddingLeft: Styles.spacing.xl,
    backgroundColor: Colors.neutrals.light,
  },
  menuOptionHoover: {
    backgroundColor: Colors.principal.light,
  },
  hoverText: {
    color: Colors.principal.default,
  },
  tokenIcon: {
    height: 20,
    width: 20,
    resizeMode: "contain",
  },
});
