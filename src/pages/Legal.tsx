import { firm } from '../content'
import { PageHero } from '../components/Sections'

type Doc = { title: string; sections: { h: string; p: string[] }[] }

export const legalDocs: Record<string, Doc> = {
  disclaimer: {
    title: 'Disclaimer',
    sections: [
      { h: 'ICAI guidelines', p: [firm.icaiNote] },
      {
        h: 'No professional advice',
        p: [
          'The content on this website, including articles in Blogs, is general information. It does not take account of your circumstances and is not a substitute for advice on your specific situation.',
          'No client relationship is created by reading this website or by sending an enquiry. An engagement begins only when both parties sign an engagement letter.',
        ],
      },
      {
        h: 'Accuracy',
        p: ['We take care to keep the information current, but laws, rates and procedures change. We do not accept responsibility for any loss arising from reliance on this website.'],
      },
    ],
  },
  'privacy-policy': {
    title: 'Privacy Policy',
    sections: [
      {
        h: 'What we collect',
        p: [
          'When you send an enquiry we receive the details you enter: your name, business name, email address, country, the service you ask about and your message. When you subscribe to updates we receive your email address.',
        ],
      },
      {
        h: 'How we use it',
        p: [
          'We use enquiry details only to respond to you and to discuss a possible engagement. We use subscriber email addresses only to send the updates you asked for. We do not sell or share your details for marketing.',
        ],
      },
      {
        h: 'Client information',
        p: ['Information shared during an engagement is handled under the ICAI Code of Ethics and, where required, a non-disclosure agreement.'],
      },
      {
        h: 'Your choices',
        p: [`You can unsubscribe at any time, or ask us to correct or delete your details, by writing to ${firm.email}.`],
      },
    ],
  },
  'terms-of-use': {
    title: 'Terms of Use',
    sections: [
      {
        h: 'Use of this website',
        p: ['This website is provided by H Dang and Company, Chartered Accountants (FRN 158649W), for general information. By using it you agree to these terms.'],
      },
      {
        h: 'Content',
        p: ['All text, graphics and the firm name and logo belong to H Dang and Company. You may read and share links to pages; please do not copy content for commercial use without permission.'],
      },
      {
        h: 'Links',
        p: ['Links to other websites are provided for convenience. We are not responsible for their content.'],
      },
      {
        h: 'Contact',
        p: [`Questions about these terms can be sent to ${firm.email}.`],
      },
    ],
  },
}

export default function Legal({ doc }: { doc: keyof typeof legalDocs }) {
  const d = legalDocs[doc]
  return (
    <>
      <PageHero crumbs={[{ label: 'Home', to: '/' }, { label: d.title }]} title={d.title} />
      <div className="mx-auto max-w-[46rem] space-y-10 px-4 py-16 md:py-20">
        {d.sections.map((s) => (
          <section key={s.h}>
            <h2 className="display text-3xl">{s.h}</h2>
            {s.p.map((p) => (
              <p key={p} className="mt-3 text-muted">{p}</p>
            ))}
          </section>
        ))}
        <p className="border-t border-rule pt-5 text-[0.9rem] text-muted">
          H Dang and Company, Chartered Accountants · FRN {firm.frn} · {firm.address.join(', ')}
        </p>
      </div>
    </>
  )
}
