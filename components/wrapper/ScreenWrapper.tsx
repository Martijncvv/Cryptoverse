import { ScrollView, StyleSheet, View } from "react-native";
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.neutrals.white,
  },
  scrollViewContent: {
    flexGrow: 1,
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: Styles.spacing.xxxxl,
    paddingBottom: Styles.spacing.md, // Reduced padding to allow footer to be closer to content
  },
});
