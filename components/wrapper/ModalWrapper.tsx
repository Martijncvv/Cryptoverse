import {
  Pressable,
  ScrollView,
  StyleSheet,
  useWindowDimensions,
  View,
} from "react-native";
import { Styles } from "@/assets/constants/Styles";
import { CrossButton } from "@/components/form/CrossButton";

interface ModalWrapperProps {
  children: React.ReactNode;
  onBackPress: () => void;
  style?: any;
}

export const ModalWrapper: React.FC<ModalWrapperProps> = ({
  children,
  onBackPress,
  style,
}) => {
  const { width: windowWidth } = useWindowDimensions();
  const isMobileView = windowWidth < 724;

  const styles = StyleSheet.create({
    overlay: {
      height: "100%",
      flex: 1,
      padding: isMobileView ? 0 : "10%",
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "rgba(0, 0, 0, 0.5)",
      zIndex: 100,
    },
    container: {
      padding: isMobileView ? Styles.spacing.xl : Styles.spacing.xxxl,
      flexDirection: "column",
      gap: Styles.spacing.xxl,
      borderRadius: Styles.borderRadius.xxxl,
      backgroundColor: "#FFFFFF",
      flexGrow: 0,
    },
    closeButton: {
      marginLeft: "auto",
      marginBottom: Styles.spacing.xs,
    },
  });

  return (
    <>
      <Pressable style={styles.overlay}>
        <View style={[styles.container, style]}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.closeButton}>
              <CrossButton onPress={onBackPress} />
            </View>
            {children}
          </ScrollView>
        </View>
      </Pressable>
    </>
  );
};
