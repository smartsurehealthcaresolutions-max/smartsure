import Image from "next/image";
import HealthcareHero from "../components/HealthcareHero";
import WhoWeAre from "../components/WhoWeAre";
import OurExpertise from "../components/OurExperties";
import OurServices from "../components/OurServices";
import Leadership from "../components/Leadership";
import HowWeWork from "../components/HowWeWork";
import OurImpact from "../components/OurImpact";
import CareerInHealthcare from "../components/CarrerInHealthcare";
import Contact from "../components/Contact";

export default function Home() {
  return (
    <main>
      {/* <MainComponent /> */}
      <HealthcareHero />
      <HowWeWork />
      <OurImpact />
      <Contact />
    </main>
  );
}
