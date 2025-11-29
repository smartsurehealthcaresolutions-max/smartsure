import HealthcareHero from "../components/HealthcareHero";
import HowWeWork from "../components/HowWeWork";
import OurImpact from "../components/OurImpact";
import Query from "@/components/Query";

export default function Home() {
  return (
    <main>
      {/* <MainComponent /> */}
      <HealthcareHero />
      <HowWeWork />
      <OurImpact />
      <Query />
    </main>
  );
}
