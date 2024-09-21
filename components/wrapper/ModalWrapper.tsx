import { ScrollView, StyleSheet, View } from "react-native";
import { Colors } from "@/assets/constants/Colors";
import { Styles } from "@/assets/constants/Styles";

interface ModalWrapperProps {
  children: React.ReactNode;
}

export const ModalWrapper: React.FC<ModalWrapperProps> = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <View style={styles.overlay}>
      <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
        {children}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  container: {
    width: "80%",
    padding: Styles.spacing.modalPadding,
    flexDirection: "column",

    gap: Styles.spacing.xxl,
    borderRadius: Styles.borderRadius.xxxl,
    backgroundColor: Colors.neutrals.white,
    flexGrow: 0,
  },
});
