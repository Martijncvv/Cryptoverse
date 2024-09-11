import { ScrollView, StyleSheet } from "react-native";
import { Colors } from "@/assets/constants/Colors";
import { HeaderMenu } from "@/components/layout/HeaderMenu";

interface ScreenWrapperProps {
  children: React.ReactNode;
}

export const ScreenWrapper: React.FC<ScreenWrapperProps> = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      stickyHeaderIndices={[0]}
      style={styles.container}
    >
      <HeaderMenu />
      {children}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 40,
    backgroundColor: Colors.neutrals.white,
  },
});
