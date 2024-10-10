export const SHARED_API_KEY_ETHERSCAN = "9Z1G1NN35M1URWAANE5CBZ2WJRJMABDCC8";

export const MIN_WIDTH = 300;

export const BASE_SEPOLIA_CHAIN_ID = 84532;
export const BASE_SEPOLIA_USDC_CONTRACT_ADDRESS =
  "0x036CbD53842c5426634e7929541eC2318f3dCF7e" as `0x${string}`;

export const TEST_1155_CONTRACT_ADDRESS =
  "0x30C7E39F0dCDCd7358714856Ae8BA24830cc6f10" as `0x${string}`;

// const MARTY_CFLY_WALLET =
//   "0x6c49C9975dF28670D86cdab96A560Da289814A43" as `0x${string}`;

export const NETWORKS = {
  base: {
    name: "Base",
    domain: "api.basescan.org",
    usdcContractAddress: "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913",
    color: [0, 79, 247, 255],
    src: "images/baseIcon.png",
    apikey: "WE8V2FI55PN7K8J3U76CGT445CMVW9KKAX",
  },
  baseSepolia: {
    name: "Base",
    domain: "api-sepolia.basescan.org",
    usdcContractAddress: "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913",
    color: [0, 79, 247, 255],
    src: "images/baseIcon.png",
    apikey: "WE8V2FI55PN7K8J3U76CGT445CMVW9KKAX",
  },
  ethereum: {
    name: "Ethereum",
    domain: "api.etherscan.io",
    usdcContractAddress: "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
    color: [95, 88, 131, 255],
    src: "images/ethereumIcon.png",
    apikey: "9Z1G1NN35M1URWAANE5CBZ2WJRJMABDCC8",
  },
  "arbitrum-one": {
    name: "Arbitrum",
    domain: "api.arbiscan.io",
    usdcContractAddress: "0xaf88d065e77c8cc2239327c5edb3a432268e5831",
    color: [17, 165, 247, 255],
    src: "images/arbitrumIcon.png",
    apikey: "P6V1TYPF7V97KPA5BN6BE9YVWAPZNNE2VA",
  },
  "optimistic-ethereum": {
    // #f7041f
    name: "Optimism",
    domain: "api-optimistic.etherscan.io",
    usdcContractAddress: "0x0b2c639c533813f4aa9d7837caf62653d097ff85",
    color: [247, 4, 31, 255],
    src: "images/optimismIcon.png",
    apikey: "EDHXVGWDZJSGXR2ZV4P4F5CMN8Q4EEDHSA",
  },

  scroll: {
    // ##ffeeda
    name: "Scroll",
    domain: "api.scrollscan.com",
    usdcContractAddress: "0x06eFdBFf2a14a7c8E15944D1F4A48F9F95F663A4",
    color: [255, 238, 218, 255],
    src: "images/scrollIcon.png",
    apikey: "Z8BXW9WVI2B3IPD9K5TQV1SX2T99PKNYHE",
  },

  zksync: {
    // ##2e318b
    name: "zkSync",
    domain: "api-era.zksync.network",
    usdcContractAddress: "0x3355df6d4c9c3035724fd0e3914de96a5a83aaf4",
    color: [46, 49, 139, 255],
    src: "images/zksyncIcon.png",
    apikey: "8Z22AKCH7AFXYR7INFMV9IIXDDABZZJB1X",
  },
};
