import {
  ScrollView,
  StyleSheet,
  useWindowDimensions,
  View,
} from "react-native";
import { Styles } from "@/assets/constants/Styles";
import { BackButton } from "@/components/form/BackButton";

interface ModalWrapperProps {
  children: React.ReactNode;
  onBackPress: () => void;
}

export const ModalWrapper: React.FC<ModalWrapperProps> = ({
  children,
  onBackPress,
}) => {
  const { width: windowWidth } = useWindowDimensions();

  const styles = StyleSheet.create({
    overlay: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    container: {
      width: windowWidth < 724 ? "100%" : "80%",
      padding: windowWidth < 724 ? Styles.spacing.xl : 40,

      flexDirection: "column",

      gap: Styles.spacing.xxl,
      borderRadius: Styles.borderRadius.xxxl,
      backgroundColor: "#FFFFFF",
      flexGrow: 0,
    },
  });

  return (
    <View style={styles.overlay}>
      <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
        <BackButton onPress={onBackPress} />
        {children}
      </ScrollView>
    </View>
  );
};
