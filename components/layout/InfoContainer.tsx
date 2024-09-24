import { Image, ImageSourcePropType, StyleSheet, View } from "react-native";
import { Styles } from "@/assets/constants/Styles";
import { Colors } from "@/assets/constants/Colors";
import { MIN_WIDTH } from "@/assets/constants/Constants";
import { TextSF } from "@/components/ui/TextSF";

interface InfoContainerProps {
  title: string;
  image: ImageSourcePropType;
  children: React.ReactNode;
}

export const InfoContainer: React.FC<InfoContainerProps> = ({
  title,
  image,
  children,
}) => {
  return (
    <View style={styles.container}>
      <Image source={image} style={styles.image} />
      <View style={styles.infoWrapper}>
        <TextSF style={styles.title}>{title}</TextSF>
        {children}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    minWidth: MIN_WIDTH,
    padding: Styles.spacing.lg,
    flexDirection: "row",
    alignSelf: "flex-start",
    flexWrap: "wrap",
    gap: Styles.spacing.lg,

    borderWidth: 0.5,
    borderColor: Colors.neutrals.black,
    borderRadius: Styles.borderRadius.lg,
    backgroundColor: Colors.neutrals.white,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: Styles.borderRadius.sm,
  },

  infoWrapper: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "flex-start",
    flexWrap: "wrap",
    gap: Styles.spacing.lg,
  },

  title: {
    fontSize: Styles.typography.fontSize.xxl,
    fontWeight: Styles.typography.fontWeight.extraBold,
    marginBottom: Styles.spacing.sm,
  },
});
