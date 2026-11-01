import { ArrowLink } from '../components/Arrow'

export default function NotFound() {
  return (
    <section className="wrap pb-32 pt-24">
      <p className="mb-8 text-[0.8rem] font-medium uppercase tracking-[0.25em] text-green">404</p>
      <h1 className="display max-w-[16ch] text-5xl md:text-7xl">This page does not exist.</h1>
      <p className="mt-10"><ArrowLink to="/" className="font-medium">Back to the home page</ArrowLink></p>
    </section>
  )
}
