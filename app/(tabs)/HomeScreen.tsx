import { HeroContainer } from "@/components/layout/HeroContainer";
import { FundCardsWrapper } from "@/components/wrapper/FundCardsWrapper";
import { ScreenWrapper } from "@/components/wrapper/ScreenWrapper";

export default function HomeScreen() {
  return (
    <ScreenWrapper>
      <HeroContainer />
      <FundCardsWrapper />
    </ScreenWrapper>
  );
}
