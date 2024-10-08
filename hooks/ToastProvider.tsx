import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useState,
} from "react";
import { StyleSheet, View } from "react-native";
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

  return (
    <ToastContext.Provider value={{ displayToast }}>
      {children}
      <View style={styles.toastContainer}>
        {toasts.map((toast) => (
          <Toast key={toast.id} text={toast.text} type={toast.type} />
        ))}
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

const styles = StyleSheet.create({
  toastContainer: {
    position: "absolute",
    top: 40,
    left: "40%",
    right: "40%",
  },
});
