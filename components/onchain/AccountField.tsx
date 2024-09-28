import { useAccount, useConnect, useDisconnect } from "wagmi";
import { StyleSheet, View } from "react-native";
import { TextSF } from "@/components/ui/TextSF";
import { ButtonSF } from "@/components/form/ButtonSF";
import { Styles } from "@/assets/constants/Styles";
import { base } from "wagmi/chains";
import { mainnet } from "viem/chains";
import type {
  Basename,
  GetName,
  GetNameReturnType,
} from "@coinbase/onchainkit/src/identity/types";
import { getChainPublicClient } from "@coinbase/onchainkit/src/network/getChainPublicClient";
import { convertReverseNodeToBytes } from "@coinbase/onchainkit/src/identity/utils/convertReverseNodeToBytes";
import L2ResolverAbi from "@coinbase/onchainkit/src/identity/abis/L2ResolverAbi";
import { RESOLVER_ADDRESSES_BY_CHAIN_ID } from "@coinbase/onchainkit/src/identity/constants";

interface AccountFieldProps {}

export const AccountField: AccountFieldProps = () => {
  const { address } = useAccount();
  const { connectors, connect } = useConnect();
  const { disconnect } = useDisconnect();

  console.log("address: ", address);

  if (!address && connectors.length > 0) {
    return (
      <>
        {connectors.map((connector) => (
          <ButtonSF
            key={connector.uid}
            onPress={() => connect({ connector })}
            text={connector.name}
          />
        ))}
      </>
    );
  }

  const getBaseEns = async () => {
    const baseEnsName = getName({ address, chain: base });
    console.log("baseEnsName: ", baseEnsName);
  };

  const baseName = getBaseEns();
  return (
    <View style={styles.container}>
      {address && (
        <TextSF>{baseName ? `${baseName} (${address})` : address}</TextSF>
      )}
      <ButtonSF onPress={() => disconnect()} text={"Disconnect"} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 50,
    paddingHorizontal: 40,
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    gap: Styles.spacing.xxxxl,
  },
});

const getName = async ({
  address,
  chain = mainnet,
}: GetName): Promise<GetNameReturnType> => {
  let client = getChainPublicClient(chain);

  const addressReverseNode = convertReverseNodeToBytes(address, base.id);
  try {
    const basename = await client.readContract({
      abi: L2ResolverAbi,
      address: RESOLVER_ADDRESSES_BY_CHAIN_ID[chain.id],
      functionName: "name",
      args: [addressReverseNode],
    });
    if (basename) {
      return basename as Basename;
    }
  } catch (_error) {
    // This is a best effort attempt, so we don't need to do anything here.
  }
};
