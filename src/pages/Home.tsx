import { motion, useReducedMotion } from 'framer-motion'
import { SplitText } from '../components/Motion'
import ServiceExplorer from '../components/ServiceExplorer'
import WorldReach from '../components/WorldMap'
import {
  Button,
  EngagementModels,
  EnquirySection,
  FactsRow,
  FinancePackCard,
  FundraisingFeature,
  HoursBand,
  HowWeWorkSection,
  IndustriesGrid,
  InsightsTeaser,
  MonthlyCalendar,
  Moments,
  OtherServiceCards,
  StandardsSection,
} from '../components/Sections'

function Hero() {
  const reduce = useReducedMotion()
  const fade = (d: number) => ({ initial: { opacity: 0, y: 16 }, animate: { opacity: 1, y: 0 }, transition: { duration: reduce ? 0 : 0.6, delay: reduce ? 0 : d } })
  return (
    <section className="bg-green/[0.06]">
      <div className="wrap grid items-center gap-14 pb-20 pt-10 md:grid-cols-12 md:pb-28 md:pt-16">
        <div className="md:col-span-6">
          <motion.p className="eyebrow text-[0.72rem] text-green" {...fade(0)}>
            Chartered Accountants · India · Serving clients worldwide
          </motion.p>
          <SplitText as="h1" onMount delay={0.1} text="Virtual CFO, FP&A and fundraising support for *growing businesses.*" className="display mt-6 text-[3rem] sm:text-6xl lg:text-[5.4rem]" />
          <motion.p className="mt-6 max-w-[34rem] text-lg text-muted" {...fade(0.6)}>
            A Chartered Accountant-led finance team that keeps your books, plans your numbers and prepares you for investors.
          </motion.p>
          <motion.div className="mt-8 flex flex-wrap gap-3" {...fade(0.75)}>
            <Button to="/contact">Send an enquiry</Button>
            <Button to="/services" variant="outline">
              Explore services
            </Button>
          </motion.div>
          <motion.div className="mt-12 max-w-[30rem]" {...fade(0.9)}>
            <FactsRow />
          </motion.div>
        </div>
        <div className="md:col-span-5 md:col-start-8">
          <FinancePackCard />
        </div>
      </div>
    </section>
  )
}

export default function Home() {
  return (
    <>
      <Hero />
      <HoursBand />
      <ServiceExplorer />
      <section aria-label="Specialist and other services" className="wrap pb-20 md:pb-28">
        <OtherServiceCards />
      </section>
      <Moments />
      <MonthlyCalendar />
      <FundraisingFeature />
      <EngagementModels />
      <WorldReach />
      <IndustriesGrid />
      <HowWeWorkSection />
      <StandardsSection />
      <InsightsTeaser />
      <EnquirySection />
    </>
  )
}
