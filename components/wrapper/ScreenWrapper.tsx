import {
  ScrollView,
  StyleSheet,
  useWindowDimensions,
  View,
  ViewStyle,
} from "react-native";
import { Colors } from "@/assets/constants/Colors";
import { HeaderMenu } from "@/components/layout/HeaderMenu";
import { FooterMenu } from "@/components/layout/FooterMenu";
import { Styles } from "@/assets/constants/Styles";

interface ScreenWrapperProps {
  children: React.ReactNode;
  customStyles?: {
    container?: ViewStyle;
    scrollViewContent?: ViewStyle;
    contentContainer?: ViewStyle;
  };
}

export const ScreenWrapper: React.FC<ScreenWrapperProps> = ({
  children,
  customStyles = {},
}) => {
  const { width: windowWidth } = useWindowDimensions();
  const isMobileView = windowWidth < 724;

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: Colors.base.white,
      ...(customStyles.container || {}),
    },
    scrollViewContent: {
      flexGrow: 1,
      ...(customStyles.scrollViewContent || {}),
    },
    contentContainer: {
      flex: 1,
      paddingHorizontal: isMobileView
        ? Styles.spacing.xl
        : Styles.spacing.xxxxl,
      paddingTop: isMobileView ? 0 : 40,
      paddingBottom: Styles.spacing.md,
      ...(customStyles.contentContainer || {}),
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
