import { HeroContainer } from "@/components/layout/HeroContainer";
import { FundCardsWrapper } from "@/components/wrapper/FundCardsWrapper";
import { ScreenWrapper } from "@/components/wrapper/ScreenWrapper";
import { OnchainProviders } from "@/components/onchain/OnchainProviders";

export default function HomeScreen() {
  return (
    <OnchainProviders>
      <ScreenWrapper>
        <HeroContainer />
        <FundCardsWrapper />
      </ScreenWrapper>
    </OnchainProviders>
  );
}
