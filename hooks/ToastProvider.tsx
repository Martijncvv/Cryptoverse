import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useState,
} from "react";
import { StyleSheet, useWindowDimensions, View } from "react-native";
import { Toast, ToastType } from "@/components/ui/Toast";

interface ToastItem {
  id: number;
  text: string;
  type: ToastType;
}

export interface ToastContextType {
  displayToast: (text: string, type?: ToastType) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

interface ToastProviderProps {
  children: ReactNode;
}

export const ToastProvider: React.FC<ToastProviderProps> = ({ children }) => {
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const { width: windowWidth } = useWindowDimensions();

  const displayToast = useCallback(
    (text: string, type: ToastType = "success") => {
      const id = Date.now();
      setToasts((prevToasts) => [...prevToasts, { id, text, type }]);
      setTimeout(() => removeToast(id), 3000); // Auto remove after 3 seconds
    },
    [],
  );

  const removeToast = useCallback((id: number) => {
    setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id));
  }, []);

  const styles = StyleSheet.create({
    toastWrapper: {
      position: "absolute",
      top: 60,
      left: 0,
      right: 0,
      alignItems: "center",
    },
    toastContainer: {
      maxWidth: windowWidth - 32,
      alignItems: "center",
    },
  });

  return (
    <ToastContext.Provider value={{ displayToast }}>
      {children}
      <View style={styles.toastWrapper}>
        <View style={styles.toastContainer}>
          {toasts.map((toast) => (
            <Toast key={toast.id} text={toast.text} type={toast.type} />
          ))}
        </View>
      </View>
    </ToastContext.Provider>
  );
};

export const useToast = (): ToastContextType => {
  const context = useContext(ToastContext);
  if (context === undefined) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
};
