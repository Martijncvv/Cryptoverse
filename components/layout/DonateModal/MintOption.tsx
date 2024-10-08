import { Pressable, StyleSheet } from "react-native";
import { TextSF } from "@/components/ui/TextSF";
import { useState } from "react";
import { Styles } from "@/assets/constants/Styles";
import { Colors } from "@/assets/constants/Colors";

interface MintOptionProps {
  option: any;
  onPress: any;
  selectedId: string | null;
}

export const MintOption: React.FC<MintOptionProps> = ({
  option,
  onPress,
  selectedId,
}) => {
  const [hooveredId, setHooveredId] = useState<string>("");

  return (
    <Pressable
      key={option.id}
      style={[
        styles.donationOptionBox,
        hooveredId === option.id && {
          ...styles.donationOptionBoxHoover,
        },
        selectedId === option.id && {
          ...styles.donationOptionBoxSelected,
        },
      ]}
      onPress={() => onPress(option.id)}
      onHoverIn={() => setHooveredId(option.id)}
      onHoverOut={() => setHooveredId("")}
    >
      <TextSF
        style={[
          styles.packagesText,
          selectedId === option.id && {
            ...styles.textSelected,
          },
        ]}
      >
        {option.packages}
      </TextSF>
      <TextSF
        style={[
          styles.valueText,
          selectedId === option.id && {
            ...styles.textSelected,
          },
        ]}
      >
        {`${option.usdc} USDC`}
      </TextSF>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  donationOptionBox: {
    flex: 1,
    paddingVertical: Styles.spacing.md,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: Styles.borderRadius.sm,
    borderWidth: 1,
    borderColor: Colors.neutrals.default,
    backgroundColor: Colors.base.white,
  },
  donationOptionBoxSelected: {
    borderColor: Colors.principal.default,
  },
  donationOptionBoxHoover: {
    borderColor: Colors.principal.default,
    backgroundColor: Colors.principal.light,

    // WEB
    shadowColor: Colors.principal.medium,
    shadowOpacity: 1,
    shadowRadius: 5,
  },
  packagesText: {
    fontSize: Styles.typography.fontSize.xl,
    fontWeight: Styles.typography.fontWeight.bold,
    color: Colors.principal.dark,
    textAlign: "center",
  },
  valueText: {
    display: "flex",
    fontSize: Styles.typography.fontSize.xs,
    color: Colors.principal.dark,
    fontWeight: Styles.typography.fontWeight.medium,
    textAlign: "center",
  },
  textSelected: {
    color: Colors.principal.default,
  },
});
