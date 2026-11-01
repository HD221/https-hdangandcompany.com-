// All facts on this site come from the firm's existing website (hdangandcompany.com).
// Do not add numbers, clients or testimonials here unless the firm supplies them.

export const firm = {
  name: 'H Dang and Company',
  tagline: 'Chartered Accountants',
  phoneDisplay: '+91 88492 20024',
  phoneHref: 'tel:+918849220024',
  whatsapp: 'https://wa.me/918849220024',
  email: 'hello@hdangandcompany.com',
  linkedin: 'https://www.linkedin.com/company/h-dang-and-company',
  address: ['Unit 509, Empire Edge', 'Gotri - Vasna Road, Near Nilambar Circle', 'Vadodara, Gujarat, India 390 007'],
  url: 'https://hdangandcompany.com',
}

export type Section = { title: string; body?: string; items?: string[] }

export type Service = {
  slug: string
  number: string
  name: string
  short: string
  tagline: string
  intro: string
  sections: Section[]
  image?: { src: string; alt: string; w: number; h: number }
  metaDescription: string
}

export const services: Service[] = [
  {
    slug: 'startup-advisory',
    tagline: 'From registration to your first investor meeting.',
    number: '01',
    name: 'Startup advisory',
    short:
      'Starting a firm, LLP or company comes with decisions you have not made before. We help you get the structure, paperwork and plan right so early mistakes do not cost you later.',
    intro:
      'You may not have run every part of a business before. We sit with you from registration to your first funding conversation and help you avoid the expensive mistakes.',
    metaDescription:
      'Startup advisory in Vadodara: choosing a legal entity, writing SOPs, pitch decks and business plans, investment strategy and hiring your first team.',
    image: { src: '/images/workshop', alt: 'A small team reviewing notes on a whiteboard during a planning session', w: 940, h: 788 },
    sections: [
      {
        title: 'Setting up the legal entity',
        body:
          'Your legal structure affects your accounting, tax, IT and supply chain for years. Many businesses put one together in a hurry and end up with a setup that is slow and costly to maintain. We explain the risks and the common misunderstandings, then help you pick a structure that suits your goals and is tax efficient.',
      },
      {
        title: 'Designing business processes',
        body:
          'Every firm has a way of doing things. Writing it down as standard operating procedures makes it repeatable. We walk through how work happens today, then help you design SOPs that work for the whole firm.',
      },
      {
        title: 'Pitch deck and business plan',
        body:
          'Investors judge you on your deck and plan before they meet you. A weak one lowers your chances of being funded. We help you build a plan that holds up to questions and a deck that is clear about the numbers.',
      },
      {
        title: 'Investment strategy for your capital',
        body:
          'We build an investment plan around your goals, how much risk you can carry and your time frame, so the money you raise or earn is put to work sensibly.',
      },
      {
        title: 'Building the team',
        body:
          'A good team makes every other goal easier to hit, but finding one is hard. We help you work out who to hire, in what order, and how to structure the roles.',
      },
    ],
  },
  {
    slug: 'financial-advisory-and-virtual-cfo',
    tagline: 'A part time CFO for cash, debt and budgets.',
    number: '02',
    name: 'Financial advisory and virtual CFO',
    short:
      'A financial plan built around your goals. We act as your part time CFO for debt, cash flow, budgets and risk.',
    intro:
      'We start by understanding what you want the business to achieve. Then we build a financial plan for it and stay on as your virtual CFO to keep it on track.',
    metaDescription:
      'Virtual CFO services in Vadodara: debt management, financial modelling, cash flow forecasting, budgeting, break-even analysis and risk management.',
    image: { src: '/images/desk', alt: 'Hands working through figures with a calculator and pen at a desk', w: 640, h: 426 },
    sections: [
      {
        title: 'Debt management',
        body:
          'We plan how to repay your debts at the lowest overall cost and help you raise new debt at the lowest rate available to you.',
      },
      {
        title: 'Financial modelling',
        body:
          'We collect your business data, analyse it and turn it into a roadmap. The model helps with decisions on hiring, raising capital, R&D and how you structure sales.',
      },
      {
        title: 'Cash flow forecasting',
        body:
          'Knowing what cash you will need ahead of time is how you avoid running short. We build a cash flow plan that covers every inflow and outflow, and update it weekly or monthly.',
      },
      {
        title: 'Budgeting',
        body:
          'A budget tells you whether a project is worth doing before you spend on it. We prepare management, departmental and cash budgets so you get the most from what you have.',
      },
      {
        title: 'Break-even analysis',
        body:
          'Your break-even point is where total cost (fixed plus variable) equals what you sell for. We work it out with you so you can set revenue targets and price with confidence.',
      },
      {
        title: 'Risk management',
        body:
          'As your virtual CFO we keep watching financial, legal and strategic risks, reduce the ones we can and plan for the rest, so you can keep to your goals and deadlines.',
      },
    ],
  },
  {
    slug: 'virtual-bookkeeping',
    tagline: 'Your books kept current, from anywhere.',
    number: '03',
    name: 'Virtual bookkeeping',
    short:
      'We record your transactions, find tax deductions and prepare regular financial statements. It is the same work an in-house bookkeeper does, done remotely.',
    intro:
      'A virtual bookkeeper does what an on-site bookkeeper does. We record transactions, identify tax deductions and prepare your financial statements on a regular schedule. The difference is that we do it remotely.',
    metaDescription:
      'Virtual bookkeeping in Vadodara: reconciliations, accounts payable and receivable, and full service cloud accounting for businesses at any stage.',
    sections: [
      {
        title: 'Reconciliation',
        body: 'We reconcile all your financial records and give you accurate reports you can rely on.',
      },
      {
        title: 'Accounts payable',
        body:
          'We track what you owe, remind you before payments fall due and keep a full record of payables for later reference.',
      },
      {
        title: 'Accounts receivable',
        body:
          'We send invoices to your clients and follow up when payments are late, so you get paid on time.',
      },
      {
        title: 'Full service cloud accounting',
        body: 'We take care of every part of your bookkeeping, whatever stage your company is at.',
      },
    ],
  },
]

export const founder = {
  name: 'Hritik Dang',
  role: 'Chartered Accountant and founder',
  bio: [
    'Hritik Dang is a qualified Chartered Accountant, an investment banker and an entrepreneur.',
    'He is a keen follower of technology and likes learning something new every day. His aim is to bring more finance work online.',
  ],
  image: { src: '/images/hritik-dang-desk', alt: 'Hritik Dang, Chartered Accountant, seated at his office desk', w: 940, h: 788 },
}
