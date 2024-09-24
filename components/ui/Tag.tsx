import { StyleSheet, View } from "react-native";
import { Colors } from "@/assets/constants/Colors";
import { Styles } from "@/assets/constants/Styles";
import Ionicons from "@expo/vector-icons/Ionicons";
import { TextSF } from "@/components/ui/TextSF";

interface TagProps {
  text: TabOptions;
  backgroundColor?: string;
  icon?: string;
  iconSize?: number;
}

export type TabOptions = "funding now" | "guatemala";

const tabColorMap: Record<string, string> = {
  "funding now": Colors.orange.medium,
  guatemala: Colors.green.light,
  default: Colors.neutrals.white,
};

const tabIconMap: Record<string, string> = {
  guatemala: "location-outline",
  default: "",
};

export const Tag: React.FC<TagProps> = ({
  text,
  backgroundColor = Colors.neutrals.white,
  iconSize = 12,
}) => {
  const hasIcon: boolean = tabIconMap[text] ? true : false;

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: tabColorMap[text] || backgroundColor },
      ]}
    >
      {hasIcon ? (
        <Ionicons
          // @ts-ignore
          name={tabIconMap[text] || ""}
          size={iconSize}
          color={Colors.neutrals.black}
        />
      ) : null}
      <TextSF style={styles.text}>{text}</TextSF>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    width: 100,
    height: 22,
    paddingHorizontal: Styles.spacing.sm,
    flexDirection: "row",
    alignItems: "center",
    gap: Styles.spacing.xs,

    borderWidth: 0.5,
    borderColor: Colors.neutrals.black,
    borderRadius: Styles.borderRadius.xs,
  },
  text: {
    fontSize: Styles.typography.fontSize.xs,
    fontWeight: Styles.typography.fontWeight.medium,
    color: Colors.neutrals.black,
    textTransform: "capitalize",
  },
});
