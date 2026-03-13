import { Seo } from "../components/Seo"
import {
  ServicesHeroSection,
  ServicesWhatWeDoSection,
  ServicesWhyWorkWithUsSection,
} from "../components/sections/services"
import { ServicesCtaSection } from "../components/sections/services/AboutCtaSection"
import seviceImg from "../assets/dc7c99720fcef1cc3529dfe84d195e75384d9ec6.jpg?w=1600&format=webp"

export default function Services() {
  return (
    <>
      <Seo
        title="Our Services"
        description="IT Consulting, UI/UX Design, Web Apps, Mobile Apps, E-Commerce, and Custom Solutions."
      />
      <ServicesHeroSection />
      <ServicesWhatWeDoSection />
      <div className=" max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <img src={seviceImg} alt="Services" className="w-full aspect-square md:aspect-4/2 rounded-4xl md:rounded-[50px] object-cover" />
      </div>
      <ServicesWhyWorkWithUsSection />
      <ServicesCtaSection />
    </>
  )
}
