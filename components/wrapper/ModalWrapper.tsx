import React from "react";
import {
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  useWindowDimensions,
  View,
  ViewStyle,
} from "react-native";
import { Styles } from "@/assets/constants/Styles";
import { CrossButton } from "@/components/form/CrossButton";

interface ModalWrapperProps {
  children: React.ReactNode;
  modalVisible: boolean;
  setModalVisible: (value: boolean) => void;
  onClose: () => void;
  style?: ViewStyle;
}

export const ModalWrapper: React.FC<ModalWrapperProps> = ({
  children,
  modalVisible,
  setModalVisible,
  onClose,
  style,
}) => {
  const { width: windowWidth } = useWindowDimensions();
  const isMobileView = windowWidth < 724;

  const styles = StyleSheet.create({
    shadowOverlay: {
      position: "absolute",
      top: -1000,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: "rgba(0, 0, 0, 0.5)",
      zIndex: -1,
    },
    modalContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    container: {
      maxWidth: isMobileView ? "100%" : "80%",
      maxHeight: "80%",
      marginTop: isMobileView ? "auto" : undefined,
      padding: isMobileView ? Styles.spacing.xl : Styles.spacing.xxxl,
      borderTopLeftRadius: isMobileView ? Styles.borderRadius.lg : undefined,
      borderTopRightRadius: isMobileView ? Styles.borderRadius.lg : undefined,
      borderRadius: isMobileView ? undefined : Styles.borderRadius.xxxl,
      backgroundColor: "#FFFFFF",
    },
    scrollView: {
      flexGrow: 1,
    },
    closeButton: {
      alignSelf: "flex-end",
      marginBottom: Styles.spacing.xs,
    },
    content: {
      flexGrow: 1,
    },
  });

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={[styles.container, style]}>
          <ScrollView
            style={styles.scrollView}
            contentContainerStyle={styles.content}
            showsVerticalScrollIndicator={false}
          >
            <View style={styles.closeButton}>
              <CrossButton onPress={onClose} />
            </View>
            {children}
          </ScrollView>
        </View>
      </View>
      <Pressable onPress={onClose} style={styles.shadowOverlay} />
    </Modal>
  );
};
