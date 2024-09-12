import {
  Image,
  ImageSourcePropType,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Styles } from "@/assets/constants/Styles";
import { Colors } from "@/assets/constants/Colors";

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
        <Text style={styles.title}>{title}</Text>
        {children}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 400,
    padding: Styles.spacing.lg,
    flexDirection: "row",
    // alignItems: "flex-start",
    gap: Styles.spacing.lg,

    borderWidth: 1,
    borderColor: Colors.neutrals.black,
    borderRadius: Styles.borderRadius.lg,
    backgroundColor: Colors.neutrals.white,
    // backgroundColor: "red",
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: Styles.borderRadius.sm,
  },

  infoWrapper: {
    // flex: 1,
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    gap: Styles.spacing.lg,
    backgroundColor: "blue",
  },

  title: {
    fontSize: Styles.typography.fontSize.xl,
    fontWeight: "bold",
    marginBottom: Styles.spacing.sm,
  },
});
