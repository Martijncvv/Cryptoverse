import { createConfig, http } from "@wagmi/core";
import { base } from "viem/chains";
import { coinbaseWallet } from "@wagmi/connectors";

export const wagmiConfig = createConfig({
  chains: [base],
  multiInjectedProviderDiscovery: false,
  connectors: [
    coinbaseWallet({
      appName: "sendaFund",
      preference: "all", // set this to `all` to use EOAs as well
      version: "4",
    }),
  ],
  ssr: true,
  transports: {
    [base.id]: http(),
  },
});
