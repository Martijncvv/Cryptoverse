import React, { useState } from "react";
import { StyleSheet, useWindowDimensions, View } from "react-native";
import { TextSF } from "@/components/ui/TextSF";
import { ButtonSF } from "@/components/form/ButtonSF";
import { Styles } from "@/assets/constants/Styles";
import { config } from "@/app/_layout";
import { Colors } from "@/assets/constants/Colors";
import { Connector, useConnect } from "wagmi";
import { ConnectorOption } from "@/components/onchain/ConnectorOption";
import { useToast } from "@/hooks/ToastProvider";

interface ConnectAccountFieldProps {}

export const ConnectAccountField: React.FC<ConnectAccountFieldProps> = () => {
  const { displayToast } = useToast();
  const { connectors, connect } = useConnect(config);
  const { width: windowWidth } = useWindowDimensions();

  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const isBurgerMenu = windowWidth < 724;

  const toggleExpand = () => {
    setIsExpanded((prev) => !prev);
  };

  const handleConnectPress = (connector: Connector) => {
    try {
      connect({ connector });
      displayToast("wallet connected");
      setIsExpanded(false);
    } catch (error: any) {
      console.error("Error connecting wallet");
      console.error(error);
      displayToast(`error: ${error?.message}`, "error");
      setIsExpanded(false);
    }
  };

  return (
    <View style={styles.container}>
      <ButtonSF
        onPress={toggleExpand}
        text={"Connect"}
        icon={"wallet"}
        iconPosition={"pre"}
        iconSize={18}
        color={"whiteOutlined"}
      />
      {isExpanded && (
        <View
          style={[
            styles.menuFieldContainer,
            isBurgerMenu && styles.mobileMenuFieldContainer,
          ]}
        >
          <View style={styles.menuOptionHeader}>
            <TextSF style={styles.menuOptionHeaderText}>Your wallets</TextSF>
          </View>
          {connectors.map((connector) => (
            <ConnectorOption
              key={connector.id}
              text={
                connector.id === "coinbaseWalletSDK"
                  ? "CB SmartWallet"
                  : connector.name
              }
              imageSource={connector.icon}
              onPress={() => handleConnectPress(connector)}
            />
          ))}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "relative",
    zIndex: 1000,
  },
  menuFieldContainer: {
    position: "absolute",
    top: "100%",
    marginTop: Styles.spacing.xs,
    right: 0,
    backgroundColor: Colors.neutrals.medium,
    borderRadius: Styles.borderRadius.md,
    borderWidth: 1,
    borderColor: Colors.neutrals.dark,
    overflow: "hidden",
    zIndex: 1001,
    elevation: 5, // for Android
    shadowColor: "#000", // for iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  mobileMenuFieldContainer: {
    position: "relative",
    marginTop: Styles.spacing.md,
    right: 0,
    left: 0,
    backgroundColor: Colors.neutrals.light,
  },
  menuOptionHeader: {
    paddingVertical: Styles.spacing.md,
    paddingLeft: Styles.spacing.xl,
    backgroundColor: Colors.principal.medium,
  },
  menuOptionHeaderText: {
    fontSize: Styles.typography.fontSize.xs,
    fontWeight: Styles.typography.fontWeight.medium,
  },
});
