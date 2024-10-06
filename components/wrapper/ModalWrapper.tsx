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

// TODO BE ABLE TO SEND NOTIFICATIONS TO THE NFT

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
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "rgba(0, 0, 0, 0.5)",
      zIndex: 999,
    },
    container: {
      flexShrink: 1,
      padding: isMobileView ? Styles.spacing.xl : 40,

      flexDirection: "column",

      gap: Styles.spacing.xxl,
      borderRadius: Styles.borderRadius.xxxl,
      backgroundColor: "#FFFFFF",
      flexGrow: 0,
    },
  });

  return (
    <>
      <Pressable style={styles.overlay}>
        <View style={[styles.container, style]}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View>
              <BackButton onPress={onBackPress} />
            </View>
            {children}
          </ScrollView>
        </View>
      </Pressable>
    </>
  );
};
