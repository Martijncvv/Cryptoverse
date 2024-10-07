import { StyleSheet, View } from "react-native";
import { router } from "expo-router";
import { Styles } from "@/assets/constants/Styles";
import { LabeledInfo } from "@/components/ui/LabeledInfo";
import { MIN_WIDTH } from "@/assets/constants/Constants";
import { LocationDetails } from "@/components/layout/LocationDetails";
import { SpendingDetails } from "@/components/layout/SpendingDetails";
import { ModalWrapper } from "@/components/wrapper/ModalWrapper";
import { TextSF } from "@/components/ui/TextSF";

export default function ProjectDetailsModal() {
  const closeModal = () => {
    // check if back is available
    if (router.canGoBack()) {
      router.back();
    } else {
      router.push("/");
    }
  };

  return (
    <ModalWrapper onBackPress={closeModal}>
      <View style={styles.contentContainer}>
        <View style={styles.column}>
          <TextSF style={styles.modalTitle}>More about the project</TextSF>
          <TextSF style={styles.projectDescription}>
            {`In Panajachel, Guatemala, many families struggle to provide their children with the basic supplies needed for school, making it challenging for these young learners to succeed academically. A school backpack filled with essential supplies not only equips a child for learning but also symbolizes hope and opportunity. By addressing this fundamental need, we can help break the cycle of poverty and pave the way for a brighter future for these children and their families.

Supporting this cause will have a profound impact on the entire community. Education is a powerful tool for change, and by ensuring that every child has the resources they need to thrive, we can foster a more educated, empowered, and prosperous community. Your contribution will help to alleviate the financial burden on families, increase school attendance, and inspire a generation of learners to pursue their dreams and contribute positively to Panajachel’s development.`}
          </TextSF>
          <View style={styles.labelsContainer}>
            <LabeledInfo label="Organizers:" text="Andrea Milian" />
            <LabeledInfo label="Created:" text="May 23, 2024" />
          </View>
        </View>
        <View style={styles.column}>
          <LocationDetails />
          <SpendingDetails />
        </View>
      </View>
    </ModalWrapper>
  );
}

const styles = StyleSheet.create({
  modalTitle: {
    fontSize: Styles.typography.fontSize.xxxl,
    fontWeight: Styles.typography.fontWeight.bold,
  },
  contentContainer: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 48,
  },
  column: {
    flex: 1,
    minWidth: MIN_WIDTH,
    paddingTop: Styles.spacing.md,
    flexDirection: "column",
    alignItems: "flex-start",
    gap: Styles.spacing.xl,
  },
  labelsContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    flexWrap: "wrap",
    gap: Styles.spacing.xl,
  },
  projectDescription: {
    width: "100%",
    flexWrap: "wrap",
  },
});
