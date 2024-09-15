import { StyleSheet, Text, View } from "react-native";
import { router } from "expo-router";
import { Colors } from "@/assets/constants/Colors";
import { Styles } from "@/assets/constants/Styles";
import { BackButton } from "@/components/form/BackButton";
import { LabeledInfo } from "@/components/ui/LabeledInfo";
import { MIN_WIDTH } from "@/assets/constants/Constants";
import { LocationDetails } from "@/components/layout/LocationDetails";
import { SpendingDetails } from "@/components/layout/SpendingDetails";

export default function Modal() {
  const closeModal = () => {
    router.back();
  };

  return (
    <View style={styles.overlay}>
      <View style={styles.container}>
        <BackButton onPress={closeModal} />
        <View style={styles.contentContainer}>
          <View style={styles.column}>
            <Text style={styles.modalTitle}>More about the project</Text>
            <View style={styles.labelsContainer}>
              <LabeledInfo label="Organizers" text="Andrea Milian" />
              <LabeledInfo label="Created" text="May 23, 2024" />
            </View>
            <Text style={styles.projectDescription}>
              {`In Panajachel, Guatemala, many families struggle to provide their children with the basic supplies needed for school, making it challenging for these young learners to succeed academically. A school backpack filled with essential supplies not only equips a child for learning but also symbolizes hope and opportunity. By addressing this fundamental need, we can help break the cycle of poverty and pave the way for a brighter future for these children and their families.

Supporting this cause will have a profound impact on the entire community. Education is a powerful tool for change, and by ensuring that every child has the resources they need to thrive, we can foster a more educated, empowered, and prosperous community. Your contribution will help to alleviate the financial burden on families, increase school attendance, and inspire a generation of learners to pursue their dreams and contribute positively to Panajachel’s development.`}
            </Text>
          </View>
          <View style={styles.column}>
            <LocationDetails />
            <SpendingDetails />
          </View>
        </View>
      </View>
    </View>
  );
}

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
    minHeight: 600,
    gap: Styles.spacing.xxl,

    borderRadius: Styles.borderRadius.xxxl,
    backgroundColor: Colors.neutrals.white,
  },

  modalTitle: {
    fontSize: Styles.typography.fontSize.title,
    fontWeight: Styles.typography.fontWeight.bold,
    color: Colors.neutrals.black,
  },
  contentContainer: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    gap: Styles.spacing.xxl,
  },
  column: {
    flex: 1,
    minWidth: MIN_WIDTH,
    flexDirection: "column",
    alignItems: "flex-start",
    gap: Styles.spacing.xxl,
  },
  labelsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    flexWrap: "wrap",
    gap: Styles.spacing.xl,
  },
  projectDescription: {
    width: "100%",
    flexWrap: "wrap",
    fontSize: Styles.typography.fontSize.md,
    fontWeight: Styles.typography.fontWeight.normal,
  },
});
