import {
  ScrollView,
  StyleSheet,
  useWindowDimensions,
  View,
} from "react-native";
import { Colors } from "@/assets/constants/Colors";
import { HeaderMenu } from "@/components/layout/HeaderMenu";
import { FooterMenu } from "@/components/layout/FooterMenu";
import { Styles } from "@/assets/constants/Styles";

interface ScreenWrapperProps {
  children: React.ReactNode;
}

export const ScreenWrapper: React.FC<ScreenWrapperProps> = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { width: windowWidth } = useWindowDimensions();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: Colors.base.white,
    },
    scrollViewContent: {
      flexGrow: 1,
    },
    contentContainer: {
      flex: 1,
      paddingHorizontal: Styles.spacing.xxxxl,
      paddingTop: windowWidth < 724 ? 0 : 40,
      paddingBottom: Styles.spacing.md,
    },
  });

  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        stickyHeaderIndices={[0]}
        contentContainerStyle={styles.scrollViewContent}
      >
        <HeaderMenu />
        <View style={styles.contentContainer}>{children}</View>
        <FooterMenu />
      </ScrollView>
    </View>
  );
};
