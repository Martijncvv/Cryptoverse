import { StyleSheet, View } from "react-native";
import { Styles } from "@/assets/constants/Styles";
import { Colors } from "@/assets/constants/Colors";
import { TextSF } from "@/components/ui/TextSF";
import Ionicons from "@expo/vector-icons/Ionicons";

export interface ToastProps {
  text: string;
  type: ToastType;
}

type TypeScheme = {
  background: string;
  text: string;
  border: string;
  icon: any; // ionicons name
};

export type ToastType = "success" | "error" | "pending";

export const Toast: React.FC<ToastProps> = ({ text, type }) => {
  const typeMap: Record<ToastType, TypeScheme> = {
    success: {
      background: Colors.green.default,
      text: Colors.green.dark,
      border: Colors.green.light,
      icon: "checkmark-circle",
    },
    error: {
      background: Colors.pink.default,
      text: Colors.pink.dark,
      border: Colors.pink.light,
      icon: "close-circle",
    },
    pending: {
      background: Colors.orange.default,
      text: Colors.orange.dark,
      border: Colors.orange.light,
      icon: "ellipsis-horizontal-circle",
    },
  };

  const styles = StyleSheet.create({
    container: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      paddingVertical: Styles.spacing.sm,
      paddingHorizontal: Styles.spacing.xl,
      gap: Styles.spacing.xs,

      borderWidth: 1,
      borderRadius: Styles.borderRadius.md,
      borderColor: typeMap[type].border,

      backgroundColor: typeMap[type].background,
    },
    text: {
      color: typeMap[type].text,
    },
  });

  return (
    <View style={styles.container}>
      <Ionicons
        name={typeMap[type].icon}
        size={Styles.typography.fontSize.xs}
        color={typeMap[type].text}
      />
      <TextSF style={[styles.text]}>{text}</TextSF>
    </View>
  );
};
