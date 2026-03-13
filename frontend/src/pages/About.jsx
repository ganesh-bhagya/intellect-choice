import { Seo } from "../components/Seo"
import {
  AboutHeroSection,
  AboutWhoWeAreSection,
  AboutMissionVisionSection,
  AboutHowWeDoSection,
  AboutWhyChooseUsSection,
  AboutCtaSection,
} from "../components/sections/about"

export default function About() {
  return (
    <>
      <Seo
        title="About Us"
        description="Learn about Intellect Choice – our mission, vision, and the team behind smart digital solutions."
      />
      <AboutHeroSection />
      <AboutWhoWeAreSection />

      <AboutCtaSection />
      <AboutMissionVisionSection />
      <AboutHowWeDoSection />
      <AboutWhyChooseUsSection />
    </>
  )
}
