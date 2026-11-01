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
  address: ['TF-29, Earth Alpha', 'Opp. Nilamber 1, Tandalja, Vasna', 'Vadodara 390 007', 'Gujarat, India'],
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
    slug: 'rpa-and-data-analytics',
    tagline: 'Let software handle the repetitive office work.',
    number: '02',
    name: 'RPA and data analytics',
    short:
      'Robotic process automation lets software handle repetitive office work. We map your processes, automate the routine parts and give you reports you can act on.',
    intro:
      'Robotic process automation (RPA) is software that carries out routine business tasks on its own. Used well, it cuts manual work and makes your processes easier to change. We use it as part of business process reengineering for your company.',
    metaDescription:
      'RPA and data analytics for businesses in Vadodara: automating approvals, tasks, contact centre work and internal collaboration.',
    image: { src: '/images/office', alt: 'An open plan office with rows of desks and chairs', w: 940, h: 788 },
    sections: [
      {
        title: 'Business process management',
        items: [
          'Leave requests',
          'Business travel',
          'Purchases, expenses and other forms',
          'General helpdesk',
          'Absence charts',
          'Clocking in and out',
          'Task management tools',
          'CRM applications',
          'Online store automation',
        ],
      },
      {
        title: 'Task automation',
        items: [
          'Triggers that create tasks from business processes',
          'Repeating tasks',
          'Templates',
          'Recurring tasks based on an interval or an event',
          'Task sequences',
          'Dependencies between tasks',
        ],
      },
      {
        title: 'Contact centre',
        items: [
          'Canned replies from an autodialer',
          'Voicemail and website widgets connected to bots',
          'Automated responses',
          'Call forwarding and transfer',
        ],
      },
      {
        title: 'Communication and collaboration',
        items: [
          'Knowledge management',
          'Company structure',
          'HR resources',
          'Workgroups and projects',
          'Document distribution and processing',
          'Access rights for creating, editing, viewing and publishing',
          'Time tracking',
          'Workload management',
          'Calendars and schedules',
        ],
      },
    ],
  },
  {
    slug: 'financial-advisory-and-virtual-cfo',
    tagline: 'A part time CFO for cash, debt and budgets.',
    number: '03',
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
    number: '04',
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
  {
    slug: 'cryptocurrency-and-blockchain',
    tagline: 'Audit, tax and controls for crypto businesses.',
    number: '05',
    name: 'Cryptocurrency and blockchain',
    short:
      'Audit, tax, controls and accounting systems for businesses that hold or deal in crypto assets.',
    intro:
      'A blockchain is a shared ledger that records every transaction on a peer-to-peer network, so transactions can be confirmed without a central clearing house. It is used for payments, trade settlement, voting and more. We help businesses that work with it keep their audit, tax and controls in order.',
    metaDescription:
      'Cryptocurrency audit, taxation, risk assurance and crypto accounting consulting from H Dang and Company, Chartered Accountants, Vadodara.',
    sections: [
      {
        title: 'Cryptocurrency audit',
        items: [
          'PCAOB financial statement audits for public filers',
          'Proof of reserves',
          'MTL and state licensure audits',
          'Stablecoin attestations',
          'IT audits',
        ],
      },
      {
        title: 'Cryptocurrency taxation',
        items: [
          'Individual tax preparation and reporting',
          'Tax planning and reporting for companies',
          'International tax credits and incentives',
          'State and local tax credits and incentives',
        ],
      },
      {
        title: 'Risk assurance',
        body:
          'The CryptoCurrency Security Standard (CCSS) is the benchmark for securing crypto custody systems. We find the gaps and have them validated against it before you share the results with your users.',
        items: [
          'SOC 1 and SOC 2 audit and compliance',
          'Designing and putting internal controls in place',
          'Preparing and reviewing policies and procedures',
          'SOX compliance and audit',
          'Cybersecurity and privacy',
          'Internal controls over financial reporting, ERM and internal audit',
        ],
      },
      {
        title: 'Consulting',
        items: [
          'Sub-ledger, ERP and crypto accounting systems',
          'Token treasury management and token valuation',
          'Outsourced accounting, HR and payroll strategy',
        ],
      },
    ],
  },
]

export const founder = {
  name: 'Hritik Dang',
  role: 'Chartered Accountant and founder',
  bio: [
    'Hritik Dang is a qualified Chartered Accountant, an investment banker and an entrepreneur.',
    'He is a keen follower of technology and likes learning something new every day. His aim is to build a firm that brings finance work online, which is why the practice covers automation and data alongside accounts.',
  ],
  image: { src: '/images/hritik-dang', alt: 'Hritik Dang, Chartered Accountant, standing in a navy suit', w: 960, h: 1016 },
}
