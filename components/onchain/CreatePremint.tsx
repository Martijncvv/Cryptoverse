import { createCreatorClient } from "@zoralabs/protocol-sdk";
import {
  useAccount,
  useChainId,
  usePublicClient,
  useSignTypedData,
} from "wagmi";
import { useEffect, useState } from "react";
import ZoraCollectPremint from "@/components/onchain/ZoraCollectPremint";

export type PremintProps = {
  contractName: string;
  maxSupply: bigint;
  maxTokensPerAddress: bigint;
  mintStart: bigint;
  mintDuration: bigint;
  pricePerToken: bigint;
  contractURI: string;
  tokenURI: string;
};

export const CreatePremint = ({
  contractName,
  maxSupply,
  maxTokensPerAddress,
  mintStart,
  mintDuration,
  pricePerToken,
  contractURI, // todo test
  tokenURI, // todo test
}: PremintProps) => {
  const chainId = useChainId();
  const publicClient = usePublicClient()!;
  const { address: creatorAddress } = useAccount();

  const [debugGlobalAddress, setDebugGlobalAddress] = useState<string | null>(
    null,
  );
  const [debugGlobalUid, setDebugGlobalUid] = useState<number | null>(null);
  const [premintConfig, setPremintConfig] = useState<any>(null);
  const [collectionAddress, setCollectionAddress] = useState<string | null>(
    null,
  );
  const [typedDataDefinition, setTypedDataDefinition] = useState<any>(null);
  const [submit, setSubmit] = useState<Function | null>(null);

  const creatorClient = createCreatorClient({ chainId, publicClient });

  const { signTypedData, data: signature } = useSignTypedData();

  useEffect(() => {
    async function createPremint() {
      const {
        premintConfig: pC,
        collectionAddress: cA,
        typedDataDefinition: tDD,
        submit: sub,
      } = await creatorClient.createPremint({
        // info of the 1155 contract to create.
        contract: {
          // the account that will be the admin of the collection.
          // Must match the signer of the premint.
          contractAdmin: creatorAddress!,
          contractName,
          contractURI,
        },
        // token info of token to create
        token: {
          tokenURI,
          // Put your address as `createReferral`, you get rewards!
          createReferral: "0x6c49C9975dF28670D86cdab96A560Da289814A43",
          maxSupply,
          maxTokensPerAddress,
          mintStart,
          mintDuration,
          pricePerToken,
          payoutRecipient: creatorAddress!,
        },
      });

      console.log("pC: ", pC);
      console.log("cA: ", cA);

      setPremintConfig(pC);
      setCollectionAddress(cA);
      setTypedDataDefinition(tDD);
      setSubmit(() => sub); // Ensure submit is set as a function
    }

    if (creatorAddress) {
      createPremint();
    }
  }, [creatorAddress]);

  useEffect(() => {
    if (signature) {
      if (submit) {
        submit({
          signature,
        });
        // Debug to store collection info
        setDebugGlobalAddress(collectionAddress);
        setDebugGlobalUid(premintConfig.uid);
      } else {
        console.error("Submit function is not set.");
      }
    }
  }, [signature]);

  if (!debugGlobalAddress || !debugGlobalUid) {
    return (
      <main className="flex h-10 items-center space-x-4">
        <button
          className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
          onClick={() => signTypedData(typedDataDefinition)}
        >
          Create Premint
        </button>
      </main>
    );
  } else {
    return (
      <main className="flex h-10 items-center space-x-4">
        <p>Collection Address: {debugGlobalAddress}</p>
        <p>UID: {debugGlobalUid}</p>
        <br />
        <ZoraCollectPremint
          contractAddress={debugGlobalAddress}
          uid={debugGlobalUid}
        />
      </main>
    );
  }
};
