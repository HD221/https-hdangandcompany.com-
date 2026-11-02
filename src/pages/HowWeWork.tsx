import { CtaBand, EngagementModels, HoursBand, HowWeWorkSection, MonthlyCalendar, PageHero } from '../components/Sections'

export default function HowWeWork() {
  return (
    <>
      <PageHero
        crumbs={[{ label: 'Home', to: '/' }, { label: 'How we work' }]}
        eyebrow="How we work"
        title="From first call to a *steady monthly cycle.*"
        intro="Each engagement runs on a written scope and a fixed monthly calendar. Every deliverable is reviewed by a Chartered Accountant before it reaches you."
      />
      <HoursBand />
      <HowWeWorkSection />
      <div className="bg-green/[0.06]">
        <MonthlyCalendar />
      </div>
      <EngagementModels />
      <CtaBand />
    </>
  )
}
