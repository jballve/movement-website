import HeroSection from '@/components/sections/HeroSection'
import WhoWeAreSection from '@/components/sections/WhoWeAreSection'
import TeamSection from '@/components/sections/TeamSection'
import WhatWeDoSection from '@/components/sections/WhatWeDoSection'
import InvestmentParameters from '@/components/sections/InvestmentParameters'
import ContactSection from '@/components/sections/ContactSection'

export default function Home() {
  return (
    <>
      <HeroSection />
      <WhoWeAreSection />
      <TeamSection />
      <WhatWeDoSection />
      <InvestmentParameters />
      <ContactSection />
    </>
  )
}
