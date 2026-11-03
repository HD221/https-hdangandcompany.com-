// All facts and copy on this site come from the firm's own website design document.
// Contact details reflect the latest address and email supplied by the firm.

export const firm = {
  name: 'H Dang and Company',
  tagline: 'Chartered Accountants',
  frn: '158649W',
  established: '2022',
  teamSize: 'Dedicated team',
  proprietor: 'CA Hritik Dang',
  membership: '615134',
  phoneDisplay: '+91 88492 20024',
  phoneHref: 'tel:+918849220024',
  whatsapp: 'https://wa.me/918849220024',
  email: 'info@hdangandcompany.com',
  linkedin: 'https://www.linkedin.com/company/h-dang-and-company',
  address: ['Unit 509, Empire Edge', 'Gotri - Vasna Road, Near Nilambar Circle', 'Vadodara, Gujarat, India 390 007'],
  url: 'https://hdangandcompany.com',
  hours: 'Monday to Friday, 10:00 AM – 2:30 AM IST',
  icaiNote:
    "As per ICAI rules, Chartered Accountants are not permitted to solicit work or advertise. The information on this website is provided at the visitor's request, is for general information only and is not professional advice.",
}

export type Feature = { title: string; text: string }
export type QA = { q: string; a: string }

export type Service = {
  slug: string
  kind: 'core' | 'specialist' | 'also'
  number: string
  name: string
  menuName: string
  /** One or two lines for lists and cards */
  short: string
  /** Bullet points shown in the home and services lists */
  bullets: string[]
  intro: string
  features: Feature[]
  suitedTo?: string
  receive?: string
  platforms?: string
  faq?: QA[]
  metaDescription: string
  /** Extra content used only on the fundraising readiness page */
  fundraising?: {
    heading: string
    intro: string
    strip: string[]
    steps: Feature[]
    receiveList: string[]
  }
}

export const services: Service[] = [
  {
    slug: 'virtual-cfo',
    kind: 'core',
    number: '01',
    name: 'Virtual CFO',
    menuName: 'Virtual CFO',
    short:
      'Senior finance leadership without a full-time hire, for businesses whose decisions now depend on cash, margins, lenders and investors.',
    bullets: ['Cash-flow planning', 'Profitability analysis', 'Lender and covenant reporting', 'Financing analysis', 'Controls and processes', 'Board reporting'],
    intro:
      'Senior finance leadership without a full-time hire. For owner-managed and venture-backed businesses whose decisions now depend on cash, margins, lenders and investors.',
    features: [
      { title: 'Cash-flow management', text: '13-week cash forecasts, payment planning and runway tracking.' },
      { title: 'Profitability analysis', text: 'Margins by product, client, location or channel, and what drives them.' },
      { title: 'Financing analysis', text: 'Comparing term sheets, debt capacity, covenants and lender reporting.' },
      { title: 'Finance operations', text: 'Approval workflows, internal controls, month-end discipline.' },
      { title: 'Board and investor reporting', text: 'Monthly or quarterly packs and preparation for board meetings.' },
      { title: 'Stakeholder coordination', text: 'Working with your auditors, CPA, bankers and investors.' },
    ],
    suitedTo:
      'Businesses past early stage with growing complexity: multiple entities, bank debt, investors, or a team that has outgrown a bookkeeper.',
    receive: 'A monthly CFO pack, a rolling cash forecast, a decisions log and a scheduled review call.',
    faq: [
      {
        q: "How much of a CFO's time do we get?",
        a: 'Time and cadence are agreed in the engagement letter, typically a fixed monthly calendar plus agreed availability for decisions in between.',
      },
    ],
    metaDescription:
      'Virtual CFO services from H Dang and Company: cash-flow management, profitability and financing analysis, finance operations and board reporting.',
  },
  {
    slug: 'fpa',
    kind: 'core',
    number: '02',
    name: 'Financial Planning and Analysis',
    menuName: 'FP&A',
    short: 'A dedicated three-member FP&A team that turns your actuals into budgets, forecasts and decisions.',
    bullets: ['Annual budgets', 'Rolling forecasts', 'Budget vs actual', 'KPI dashboards', 'Scenario models', 'Investor packs'],
    intro:
      'A dedicated three-member FP&A team that turns your actuals into budgets, forecasts and decisions, working in your tools on a fixed calendar.',
    features: [
      { title: 'Budgets and operating plans', text: 'Built bottom-up with department owners.' },
      { title: 'Rolling forecasts', text: '12-month P&L, balance sheet and cash, updated monthly.' },
      { title: 'Budget vs actual', text: 'Variance analysis with plain-English commentary.' },
      { title: 'KPI dashboards', text: 'Revenue, margins, unit economics, working capital, headcount.' },
      { title: 'Scenario models', text: 'Pricing, hiring, expansion and financing decisions.' },
      { title: 'Inventory and demand planning', text: 'Reorder points and stock cover for product businesses.' },
    ],
    suitedTo:
      'Businesses with reliable books that need forward-looking numbers, and finance teams that need modelling capacity.',
    receive: 'A monthly management pack: one-page summary, KPIs, budget vs actual and an updated forecast.',
    faq: [
      {
        q: 'Can your analysts work alongside our finance team?',
        a: 'Yes. They can sit alongside your controller or accountant and take over modelling and reporting.',
      },
    ],
    metaDescription:
      'FP&A from H Dang and Company: budgets, rolling forecasts, budget vs actual, KPI dashboards and scenario models from a dedicated three-member team.',
  },
  {
    slug: 'virtual-bookkeeping',
    kind: 'core',
    number: '03',
    name: 'Virtual Bookkeeping',
    menuName: 'Virtual Bookkeeping',
    short: 'Accurate weekly or monthly books for businesses worldwide, kept in your own accounting system.',
    bullets: ['Reconciliations', 'Payables and receivables', 'Month-end close', 'Multi-currency', 'Catch-up and clean-up', 'CPA year-end package'],
    intro:
      'Accurate weekly or monthly books for businesses worldwide, kept in your own accounting system and reviewed by a Chartered Accountant.',
    features: [
      { title: 'Transaction recording', text: 'Sales, purchases, expenses and payroll journals.' },
      { title: 'Reconciliations', text: 'Bank, card, payment-gateway and marketplace settlements.' },
      { title: 'Payables and receivables', text: 'Bill processing, ageing reports and collection follow-ups.' },
      { title: 'Month-end close', text: 'Accruals, prepaids, depreciation and loan amortisation.' },
      { title: 'Multi-entity and multi-currency', text: 'Intercompany and foreign-currency accounting.' },
      { title: 'Catch-up and year-end', text: 'Clean-up of past periods and a package for your CPA.' },
    ],
    platforms: 'QuickBooks Online, Xero, Zoho Books, Tally, MYOB, Sage 50; Yardi Breeze and AppFolio for property.',
    receive: 'Balance sheet, P&L, cash-flow summary, reconciliation reports and a short note on open items.',
    faq: [
      {
        q: 'Do you file overseas tax returns?',
        a: 'No. We maintain the books and hand a year-end package to your CPA or tax preparer, who handles the filing.',
      },
    ],
    metaDescription:
      'Virtual bookkeeping for businesses worldwide: reconciliations, payables and receivables, month-end close and CPA year-end packages.',
  },
  {
    slug: 'fundraising-readiness',
    kind: 'core',
    number: '04',
    name: 'Fundraising Readiness',
    menuName: 'Fundraising Readiness',
    short: 'The financial preparation behind an equity or debt raise, built from your actual numbers.',
    bullets: ['Business plan', 'Financial model', 'Pitch deck', 'Cap table', 'Data room', 'Diligence support'],
    intro:
      'The financial preparation behind an equity or debt raise: a business plan, financial model and pitch deck built from your actual numbers, and support through diligence.',
    features: [
      { title: 'Business plan', text: 'Market, operating plan, unit economics and milestones.' },
      { title: 'Three-statement financial model', text: 'Driver-based P&L, balance sheet and cash flow over 3–5 years, with scenarios.' },
      { title: 'Pitch deck', text: 'Narrative, financial slides and use of funds.' },
      { title: 'Cap table and dilution', text: 'Ownership before and after the round, under different terms.' },
      { title: 'Data-room preparation', text: 'Financials, contracts and compliance records, organised.' },
      { title: 'Due-diligence support', text: 'Responses to information requests and Q&A on the numbers.' },
    ],
    faq: [
      {
        q: 'Do you introduce us to investors?',
        a: 'No. We prepare the plan, model and deck and support you in diligence; we do not arrange, broker or place funds.',
      },
      { q: 'Can you build the model if our books are messy?', a: 'Yes. We clean up historical financials first, so the model starts from reliable actuals.' },
      { q: 'How long does it take?', a: 'Typically a few weeks, depending on the state of your books and the scope agreed in the engagement letter.' },
    ],
    fundraising: {
      heading: 'Fundraising readiness: business plan, financial model and pitch deck.',
      intro:
        'For founders and owner-managed businesses preparing to raise equity or debt. We build the financial story investors and lenders ask for, from your actual numbers, and support you through their diligence.',
      strip: ['Business plan', 'Financial model', 'Pitch deck', 'Data room and diligence'],
      steps: [
        { title: 'Clean the historicals', text: 'Reconcile and close past periods so the model starts from reliable actuals.' },
        { title: 'Agree the drivers', text: 'Revenue, cost and hiring assumptions, agreed with you line by line.' },
        { title: 'Build model, plan and deck', text: 'One set of numbers flowing into every document.' },
        { title: 'Diligence support', text: 'Data room, information requests and Q&A on the numbers.' },
      ],
      receiveList: ['Editable Excel or Google Sheets model', 'Pitch deck in your preferred format', 'Written business plan', 'Organised data room'],
    },
    metaDescription:
      'Fundraising readiness: business plan, three-statement financial model, pitch deck, data room and diligence support, built from your actual numbers.',
  },
  {
    slug: 'cap-table-management',
    kind: 'specialist',
    number: 'S1',
    name: 'Cap Table Management',
    menuName: 'Cap Table Management',
    short: 'Rebuilds, SAFEs and convertibles, ESOP pools and dilution analysis.',
    bullets: [],
    intro: 'An accurate, up-to-date record of who owns what, and how that changes with each round, option grant or conversion.',
    features: [
      { title: 'Cap table rebuilds', text: 'Reconstructing ownership from share records and agreements.' },
      { title: 'SAFEs and convertible notes', text: 'Modelling conversion at different valuations and caps.' },
      { title: 'ESOP modelling', text: 'Pool sizing, grants and vesting schedules.' },
      { title: 'Dilution analysis', text: 'Pre- and post-money ownership under different round terms.' },
    ],
    metaDescription: 'Cap table management: rebuilds, SAFEs and convertible notes, ESOP modelling and dilution analysis.',
  },
  {
    slug: 'feasibility-studies',
    kind: 'specialist',
    number: 'S2',
    name: 'Feasibility Studies and Project Reports',
    menuName: 'Feasibility Studies',
    short: 'Market, costing, five-year projections, IRR and payback.',
    bullets: [],
    intro: 'An independent view of whether a new project, unit or expansion makes financial sense, before you commit capital.',
    features: [
      { title: 'Market and demand', text: 'Market size, pricing and competitive landscape.' },
      { title: 'Costing and unit economics', text: 'Capex, operating costs and contribution per unit.' },
      { title: 'Five-year projections', text: 'P&L, balance sheet and cash flow for the project.' },
      { title: 'Returns analysis', text: 'IRR, NPV, payback period and break-even, with scenarios.' },
    ],
    suitedTo: 'Expansions, new manufacturing units, new locations and real estate projects.',
    receive: 'A written report and the underlying model, for your board, partners or bank.',
    metaDescription: 'Feasibility studies and project reports: market and demand, costing, five-year projections and IRR, NPV and payback analysis.',
  },
  {
    slug: 'tax-audit-compliance',
    kind: 'also',
    number: 'A1',
    name: 'Tax, Audit and Compliance',
    menuName: 'Tax, Audit and Compliance',
    short: 'Audit and assurance, GST, income tax and TDS, cross-border receipts, business setup.',
    bullets: [],
    intro: 'The statutory work of a Chartered Accountant firm, for businesses and individuals.',
    features: [
      { title: 'Audit and assurance', text: 'Statutory audit, tax audit, internal audit and stock audit.' },
      { title: 'GST', text: 'Registration, returns, ITC reconciliation, refunds and notices.' },
      { title: 'Income tax and TDS', text: 'Returns for businesses, individuals and NRIs; TDS compliance.' },
      { title: 'Cross-border receipts', text: 'LUT, FIRC / e-BRC and export-of-services compliance.' },
      { title: 'Business setup', text: 'Entity choice, registrations and accounting systems.' },
      { title: 'Notices and assessments', text: 'Responses to GST and income tax notices and queries.' },
    ],
    metaDescription: 'Tax, audit and compliance: audit and assurance, GST, income tax and TDS, cross-border receipts, business setup and notices.',
  },
]

export const coreServices = services.filter((s) => s.kind === 'core')
export const otherServices = services.filter((s) => s.kind !== 'core')

export const moments = [
  {
    n: 'i.',
    title: 'The books are behind',
    text: 'Reconciliations are months old, the CPA is waiting on year-end, and nobody is sure of the real cash position.',
    link: { label: 'Virtual bookkeeping', to: '/services/virtual-bookkeeping' },
  },
  {
    n: 'ii.',
    title: 'Decisions need forecasts',
    text: 'Hiring, pricing, inventory and financing decisions now depend on what next quarter looks like.',
    link: { label: 'FP&A and virtual CFO', to: '/services/fpa' },
  },
  {
    n: 'iii.',
    title: 'A raise is coming',
    text: 'Investors or lenders want a model, a plan and a deck that tie back to clean historical numbers.',
    link: { label: 'Fundraising readiness', to: '/services/fundraising-readiness' },
  },
]

export const calendar = [
  { when: 'Days 1–5', title: 'Reconcile', text: 'Bank, card, gateway and payroll reconciliations; open items flagged to you.' },
  { when: 'Days 6–10', title: 'Close', text: 'Accruals and adjustments; statements reviewed by a Chartered Accountant.' },
  { when: 'Days 10–15', title: 'Report', text: 'KPIs, budget vs actual, cash position and an updated forecast.' },
  { when: 'Mid-month', title: 'Review', text: 'A call on the numbers, decisions ahead and lender or investor needs.' },
]

export const fundraisingGrid = [
  { title: 'Business plan', text: 'Market, operating plan, unit economics, milestones.' },
  { title: 'Financial model', text: 'Three-statement, driver-based, 3–5 years, with scenarios.' },
  { title: 'Pitch deck', text: 'Narrative, financial slides and use of funds.' },
  { title: 'Data room and diligence', text: 'Organised records and Q&A on the numbers.' },
]

export const engagementModels = [
  {
    title: 'Monthly engagement',
    text: 'Ongoing bookkeeping, FP&A and virtual CFO work on a fixed monthly calendar, with a named team and a regular review call.',
  },
  {
    title: 'Project engagement',
    text: 'Defined-scope work with a start and an end: fundraising readiness, feasibility studies, cap table rebuilds and books clean-up.',
  },
  {
    title: 'Dedicated team',
    text: 'Accountants or FP&A analysts working as an extension of your in-house finance team, in your systems and on your calendar.',
  },
]

export const industries = [
  { title: 'Startups and SaaS', text: 'ARR, burn, runway and investor reporting.' },
  { title: 'E-commerce and D2C', text: 'Marketplace and gateway settlements, inventory, returns.' },
  { title: 'Real estate', text: 'Property-level books, loans, leases and CAM.' },
  { title: 'Import and distribution', text: 'Landed cost, duties, inventory planning.' },
  { title: 'Professional services', text: 'Project profitability, export-of-services compliance.' },
  { title: 'Hospitality', text: 'Location-level P&L, food and labour costs.' },
  { title: 'Healthcare practices', text: 'Practice accounting, payroll, cash planning.' },
  { title: 'Manufacturing', text: 'Costing, inventory valuation, capex.' },
]

export const howWeWork = [
  { title: 'Discovery call', text: 'Your business, current books and deadlines.' },
  { title: 'Engagement letter', text: 'Written scope, deliverables and timelines.' },
  { title: 'Onboarding', text: 'Secure access and clean-up of past periods.' },
  { title: 'Monthly cycle', text: 'Close, reports and forecasts on a fixed calendar.' },
  { title: 'Review', text: 'A regular call on the numbers and decisions ahead.' },
]

export const hoursTable = [
  { region: 'IST, our office', standard: '10:00 AM – 2:30 AM', daylight: '—' },
  { region: 'Eastern Time', standard: 'until 4:00 PM', daylight: 'until 5:00 PM' },
  { region: 'Pacific Time', standard: 'until 1:00 PM', daylight: 'until 2:00 PM' },
]

export const platforms = ['QuickBooks Online', 'Xero', 'Zoho Books', 'Tally', 'MYOB', 'Sage 50', 'Yardi Breeze', 'AppFolio', 'Fathom', 'Monday.com']

export const faqs: QA[] = [
  {
    q: 'Can you work on our books if our business is overseas?',
    a: 'Yes. We work inside your accounting system and hand a year-end package to your CPA or tax preparer, who handles the local tax filing.',
  },
  {
    q: 'How is our data kept secure?',
    a: "Role-based logins to your software and read-only bank feeds; we don't ask for banking passwords. Client information is handled under the ICAI Code of Ethics and an NDA where required.",
  },
  {
    q: "What's the difference between FP&A and a virtual CFO?",
    a: 'FP&A produces the budgets, forecasts and reports. The virtual CFO uses them to advise you on cash, financing, controls and strategy, and works with your lenders and investors.',
  },
  {
    q: 'Do you introduce us to investors?',
    a: 'No. We prepare the plan, model and deck and support you through diligence; we do not arrange, broker or place funds.',
  },
  { q: 'Can you start if our books are months behind?', a: 'Yes. Catch-up work is scoped separately and completed before the monthly cycle begins.' },
]

export type ArticleBlock =
  | { type: 'p'; text: string }
  | { type: 'h2'; text: string }
  | { type: 'quote'; text: string }
  | { type: 'list'; items: string[] }

export type Article = {
  slug: string
  category: string
  title: string
  summary: string
  minutes: number
  featured?: boolean
  author?: string
  keyPoints?: string[]
  body?: ArticleBlock[]
}

export const insightCategories = ['Virtual CFO', 'FP&A', 'Bookkeeping', 'Fundraising', 'Tax and compliance']

export const articles: Article[] = [
  {
    slug: 'what-investors-look-for-in-a-startup-financial-model',
    category: 'Fundraising',
    title: 'What investors look for in a startup financial model',
    summary: 'The assumptions, structure and checks that make a model credible in diligence, and the mistakes that undermine it.',
    minutes: 7,
    featured: true,
    author: 'CA Hritik Dang',
    keyPoints: [
      'Every forecast number should trace back to a stated driver.',
      'The three statements must link and balance in every period.',
      'Investors test the base case against your actual history.',
      'Use of funds and runway should fall straight out of the model.',
    ],
    body: [
      {
        type: 'p',
        text: "After the pitch deck, the financial model is usually the first file an investor's analyst opens. They are not looking for a precise prediction of the future. They are checking whether the founders understand how the business makes money, and whether the plan for the new capital is internally consistent.",
      },
      { type: 'p', text: 'A model that answers those questions quickly shortens diligence. One that raises new questions on every tab slows it down, or ends it.' },
      { type: 'h2', text: '1. Assumptions they can trace' },
      {
        type: 'p',
        text: 'Revenue should be built from drivers, not typed in as a growth percentage. For a SaaS business that means new customers, average contract value, expansion and churn. For a product business, it means units, price, channel mix and returns.',
      },
      {
        type: 'p',
        text: 'Keep every assumption on one inputs sheet, label its unit and note its source: historical average, signed contract, market benchmark or management estimate. An analyst should be able to change one input and watch it flow through.',
      },
      { type: 'h2', text: '2. Three statements that link and balance' },
      {
        type: 'p',
        text: 'The profit and loss, balance sheet and cash-flow statement should be connected, not built separately. Working capital, capital expenditure, depreciation, debt and equity all move between them. If the balance sheet does not balance in every month, investors assume the cash forecast is wrong too.',
      },
      { type: 'h2', text: '3. A base case that respects your history' },
      {
        type: 'p',
        text: 'The first forecast months are compared with your last twelve months of actuals. A sudden jump in conversion rates or a fall in cost per customer, with no explanation, is the most common reason a model loses credibility. Start the forecast from cleaned-up, reconciled historical financials and make any step change explicit.',
      },
      { type: 'p', text: 'Alongside the base case, show a downside scenario. It signals that you have thought about what happens if sales take longer than planned.' },
      { type: 'h2', text: '4. Unit economics that tie to the plan' },
      {
        type: 'p',
        text: 'Customer acquisition cost, gross margin, payback period and lifetime value should be calculated from the same numbers as the main forecast, not quoted separately in the deck. If the deck says payback is nine months, the model should show how.',
      },
      { type: 'quote', text: 'A model is credible when an outsider can change one assumption and understand everything that moves as a result.' },
      { type: 'h2', text: '5. Use of funds and runway' },
      {
        type: 'p',
        text: 'The amount you are raising should come from the model: the hiring plan, marketing spend and capital expenditure needed to reach the next milestone, plus a buffer. The cash-flow statement should then show how many months of runway the round buys, under both the base and downside cases.',
      },
      { type: 'h2', text: '6. A clean structure' },
      {
        type: 'p',
        text: 'Separate inputs, calculations and outputs. Avoid hard-coded numbers inside formulas, keep one consistent timeline across sheets, and add a checks sheet that flags imbalances or broken links. These details are what an analyst notices in the first ten minutes.',
      },
      { type: 'h2', text: 'Common mistakes' },
      {
        type: 'list',
        items: [
          'Revenue growth typed as a flat percentage with no drivers behind it.',
          "Hiring plans that don't match the salary line in the forecast.",
          'Ignoring payment terms, so cash and profit move together.',
          'Different numbers in the deck, the plan and the model.',
          'No downside case.',
        ],
      },
      { type: 'h2', text: 'A short pre-diligence checklist' },
      {
        type: 'list',
        items: [
          'Historical financials reconciled and closed for at least the last twelve months.',
          'All assumptions on one labelled inputs sheet, with sources.',
          'Balance sheet balances in every period; checks sheet shows no errors.',
          'Base and downside scenarios, with runway shown for each.',
          'Unit economics and use of funds calculated in the model and matching the deck.',
        ],
      },
    ],
  },
  {
    slug: '13-week-cash-flow-forecast',
    category: 'FP&A',
    title: 'The 13-week cash flow forecast: a practical guide',
    summary: 'How to build a rolling weekly cash forecast from receivables, payables and payroll, and how to keep it accurate week to week.',
    minutes: 6,
  },
  {
    slug: 'bookkeeping-fpa-or-virtual-cfo',
    category: 'Virtual CFO',
    title: 'Bookkeeping, FP&A or a virtual CFO: what a growing business needs',
    summary: "The difference between recording, planning and leading finance, and the signals that tell you it's time to add each layer.",
    minutes: 5,
  },
  {
    slug: 'month-end-close-checklist-quickbooks-online',
    category: 'Bookkeeping',
    title: 'Month-end close checklist for businesses on QuickBooks Online',
    summary: 'A step-by-step close: reconciliations, accruals, prepaids, fixed assets and the reports to review before you sign off.',
    minutes: 6,
  },
  {
    slug: 'safes-convertible-notes-cap-table',
    category: 'Fundraising',
    title: 'SAFEs, convertible notes and your cap table',
    summary: 'How caps, discounts and conversion triggers change ownership, with worked examples of dilution at the next priced round.',
    minutes: 6,
  },
  {
    slug: 'variance-commentary',
    category: 'FP&A',
    title: 'Writing variance commentary that actually gets read',
    summary: 'Turning budget-vs-actual tables into three or four sentences a founder or board can act on.',
    minutes: 4,
  },
  {
    slug: 'feasibility-study-basics',
    category: 'Specialist',
    title: 'Feasibility study basics: IRR, NPV and payback explained',
    summary: 'What each measure tells you about a new project, where they disagree, and which one lenders and boards focus on.',
    minutes: 5,
  },
  {
    slug: 'lut-for-export-of-services',
    category: 'Tax and compliance',
    title: 'LUT for export of services: who needs it and how to file it',
    summary: 'When exporters of services should file a Letter of Undertaking, the filing steps, and what happens without one.',
    minutes: 4,
  },
  {
    slug: 'catching-up-on-bookkeeping',
    category: 'Bookkeeping',
    title: 'Catching up on months of bookkeeping: where to start',
    summary: 'A practical order of work for bringing books current before a year-end, a loan application or a raise.',
    minutes: 5,
  },
]

export type FaqGroup = { topic: string; items: QA[] }

const svcFaq = (slug: string) => services.find((s) => s.slug === slug)?.faq ?? []

export const faqGroups: FaqGroup[] = [
  {
    topic: 'Working with us',
    items: [
      {
        q: 'How does an engagement start?',
        a: 'With a discovery call about your business, current books and deadlines. We then send an engagement letter with the written scope, deliverables and timelines, onboard with secure access and clean-up of past periods, and move into a fixed monthly cycle with a regular review call.',
      },
      {
        q: 'What ways can we work with you?',
        a: 'Three engagement models: a monthly engagement for ongoing bookkeeping, FP&A and virtual CFO work; a project engagement with a defined start and end, such as fundraising readiness, feasibility studies, cap table rebuilds or books clean-up; and a dedicated team of accountants or FP&A analysts working as an extension of your in-house finance team.',
      },
      {
        q: 'What are your working hours?',
        a: `${firm.hours}. Exact dates for each piece of work are fixed in your engagement letter.`,
      },
      { q: 'How quickly do you respond to an enquiry?', a: 'We respond within one working day (IST).' },
      {
        q: 'Who reviews the work?',
        a: 'Every deliverable is reviewed by a Chartered Accountant before it reaches you.',
      },
      {
        q: 'What does a typical month look like?',
        a: 'Days 1–5: reconciliations, with open items flagged to you. Days 6–10: accruals and adjustments, and statements reviewed by a Chartered Accountant. Days 10–15: KPIs, budget vs actual, cash position and an updated forecast. Mid-month: a review call on the numbers, decisions ahead and lender or investor needs.',
      },
      {
        q: 'Which industries do you work with?',
        a: 'Startups and SaaS, e-commerce and D2C, real estate, import and distribution, professional services, hospitality, healthcare practices and manufacturing.',
      },
    ],
  },
  {
    topic: 'Security and ethics',
    items: [
      faqs[1],
      {
        q: 'Do you work in our own accounting system?',
        a: 'Yes. We work inside your accounting system, so your books and records stay with you.',
      },
      {
        q: 'Which platforms do you work in?',
        a: `${platforms.join(', ')}.`,
      },
      {
        q: 'Is the firm registered with the ICAI?',
        a: `Yes. H Dang and Company is registered with the Institute of Chartered Accountants of India under FRN ${firm.frn}. The proprietor is ${firm.proprietor}, ICAI M. No. ${firm.membership}.`,
      },
    ],
  },
  {
    topic: 'Virtual CFO and FP&A',
    items: [
      faqs[2],
      ...svcFaq('virtual-cfo'),
      {
        q: 'What do we receive from a virtual CFO each month?',
        a: 'A monthly CFO pack, a rolling cash forecast, a decisions log and a scheduled review call.',
      },
      ...svcFaq('fpa'),
      {
        q: 'What is in the monthly management pack?',
        a: 'A one-page summary, KPIs, budget vs actual and an updated forecast.',
      },
    ],
  },
  {
    topic: 'Bookkeeping',
    items: [
      faqs[0],
      ...svcFaq('virtual-bookkeeping'),
      faqs[4],
      {
        q: 'What do we receive from bookkeeping?',
        a: 'Balance sheet, P&L, cash-flow summary, reconciliation reports and a short note on open items.',
      },
    ],
  },
  {
    topic: 'Fundraising and specialist work',
    items: [
      ...svcFaq('fundraising-readiness'),
      {
        q: 'What do we receive from fundraising readiness?',
        a: 'An editable Excel or Google Sheets model, a pitch deck in your preferred format, a written business plan and an organised data room.',
      },
      {
        q: 'Can you help with our cap table, SAFEs or ESOP?',
        a: 'Yes. We rebuild cap tables from share records and agreements, model SAFE and convertible note conversion at different valuations and caps, size ESOP pools and show dilution under different round terms.',
      },
      {
        q: 'Do you prepare feasibility studies and project reports?',
        a: 'Yes. We cover market and demand, costing and unit economics, five-year projections and returns analysis, and deliver a written report and the underlying model for your board, partners or bank.',
      },
    ],
  },
]
