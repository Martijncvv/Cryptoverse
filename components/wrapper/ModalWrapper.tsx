import {
  Pressable,
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
  style?: any;
}

export const ModalWrapper: React.FC<ModalWrapperProps> = ({
  children,
  onBackPress,
  style,
}) => {
  const { width: windowWidth } = useWindowDimensions();

  const styles = StyleSheet.create({
    overlay: {
      height: "100%",
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "rgba(0, 0, 0, 0.5)",
      zIndex: 999,
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
  // todo onpress
  return (
    <>
      <Pressable style={styles.overlay}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={[styles.container, style]}
        >
          <View style={{ marginTop: -15 }}>
            <BackButton onPress={onBackPress} />
          </View>
          {children}
        </ScrollView>
      </Pressable>
    </>
  );
};
