/**
 * Single source of truth for site copy and structured content.
 * Components render this data; they do not hold copy of their own.
 */

export const siteConfig = {
  name: 'Movement',
  tagline: 'Investing Through Time',
  description:
    'Movement is a special situations investment firm with hubs in Toronto and Singapore, partnering with companies and lenders across North America and Asia Pacific through recapitalizations, carve-outs, consolidations and ownership transitions.',
  shortDescription:
    'A flexible capital and operating partner for businesses in transition, with hubs in Toronto and Singapore.',
}

export type NavItem = { name: string; href: string }

export const navigation: NavItem[] = [
  { name: 'The firm', href: '/#who-we-are' },
  { name: 'Approach', href: '/#what-we-do' },
  { name: 'Team', href: '/#team' },
  { name: 'Contact', href: '/#contact' },
]

export const hero = {
  eyebrow: 'Investing Through Time',
  /** The emphasised phrase is rendered in the Cormorant italic. */
  headline: 'Flexible capital for businesses at a',
  headlineEmphasis: 'turning point.',
  lead:
    'Movement partners with owners, management teams and lenders across North America and Asia Pacific, combining patient capital with hands-on operational support through recapitalizations, carve-outs, consolidations and ownership transitions.',
  primaryCta: { label: 'Discuss a situation', href: '#contact' },
  secondaryCta: { label: 'Our approach', href: '#what-we-do' },
  backingNote: 'Backed by a global family office',
  mediaCaption: 'A mechanical watch movement: small, precise parts working in concert over time.',
  mediaAlt: 'Close-up of the gears and jewelled bearing inside a mechanical watch movement',
}

export type Criterion = { label: string; value: string }

export const criteria: { eyebrow: string; note: string; items: Criterion[] } = {
  eyebrow: 'Investment criteria',
  note: 'Where our capital and experience fit.',
  items: [
    { label: 'Focus', value: 'Special situations' },
    { label: 'Equity check', value: '$5M – $50M' },
    { label: 'Enterprise value', value: '$20M – $150M' },
    { label: 'Position', value: 'Control or significant minority' },
    { label: 'Geography', value: 'North America & Asia Pacific' },
  ],
}

export const firm = {
  eyebrow: 'The firm',
  headline: 'A flexible capital and operating partner, built for complexity.',
  paragraphs: [
    'Movement is a flexible capital and business calibration firm with hubs in Toronto and Singapore. We partner with companies and lenders to navigate complexity, providing patient capital, strategic guidance and operational expertise through periods of transition and growth.',
    'We specialize in situations that demand both conviction and nuance: recapitalizing balance sheets, consolidating fragmented industries, and working alongside management teams to build durable businesses. Where others see disorder, we see the opportunity for calibration.',
  ],
  howWeWorkEyebrow: 'How we work',
  differentiators: [
    {
      title: 'Flexible capital',
      description: 'Tailored capital solutions for balance sheet resets and pivotal transitions.',
    },
    {
      title: 'Toronto & Singapore',
      description: 'A dual-time-zone presence enabling seamless cross-border execution.',
    },
    {
      title: 'Execution certainty',
      description: 'Decisive action with institutional reliability and disciplined risk mitigation.',
    },
    {
      title: 'Operational calibration',
      description: 'Hands-on P&L re-engineering and management evolution.',
    },
  ],
}

export const backing = {
  eyebrow: 'Our backing',
  statement:
    'Backed by a global family office with generational time horizons, we are unconstrained by traditional fund mandates, free to focus on the long-term mechanics of value creation rather than short-term liquidity events.',
  supporting: 'Our approach is built on duration and discipline.',
}

export type Strategy = { title: string; subtitle: string; description: string }

export const strategies: { eyebrow: string; headline: string; lead: string; items: Strategy[] } = {
  eyebrow: 'Approach',
  headline: 'Investment strategies',
  lead:
    'Five ways we deploy flexible capital and operational expertise across the full spectrum of business transitions.',
  items: [
    {
      title: 'Strategic recapitalization',
      subtitle: 'Flexible capital solutions',
      description:
        'Flexible capital for balance sheet resets, buyouts and pivotal transitions. We provide tailored financing structures that restore operational flexibility and position companies for sustainable growth.',
    },
    {
      title: 'Industrial roll-ups',
      subtitle: 'Market consolidation',
      description:
        'Consolidating fragmented sectors to build market-leading platforms. We identify synergies, integrate operations and create scale advantages that drive long-term value.',
    },
    {
      title: 'Lender solutions',
      subtitle: 'Institutional partnership',
      description:
        'Partnering with financial institutions to provide decisive capital and management solutions for complex or stressed loan files, with execution certainty and risk mitigation for lender portfolios.',
    },
    {
      title: 'Operational calibration',
      subtitle: 'Performance engineering',
      description:
        'Management evolution and P&L re-engineering: installing leadership and systems to drive performance. We calibrate operations to improve margins and free cash flow generation.',
    },
    {
      title: 'Complex carve-outs',
      subtitle: 'Strategic decoupling',
      description:
        'Decoupling non-core assets from parent organizations and establishing them as high-performing standalone entities. We unlock trapped value through strategic separation and focused management.',
    },
  ],
}

export const sectors = {
  eyebrow: 'Sector experience',
  items: [
    'Renewable energy',
    'Bio-fertilizer',
    'E-commerce',
    'Retail',
    'Tourism & leisure',
    'Media & entertainment',
    'Manufacturing',
    'Aerospace & defense',
    'Commodities',
    'Distribution',
    'Education',
  ],
}

export type BioSection = { heading: string; items: string[] }

export type TeamMember = {
  slug: string
  name: string
  title: string
  /** One-sentence description used for cards, metadata and structured data. */
  summary: string
  image: string
  linkedin?: string
  bio: BioSection[]
}

export const teamSection = {
  eyebrow: 'Our team',
  headline: 'Investment professionals across two hubs.',
  lead:
    'Combined decades of experience in special situations, M&A and operating roles across North America and Asia Pacific.',
  careersEyebrow: 'Careers',
  careersText:
    'We are always interested in meeting exceptional people who want to build durable businesses. Write to us at',
}

export const team: TeamMember[] = [
  {
    slug: 'javier-ballve',
    name: 'Javier Ballve',
    title: 'Partner',
    summary:
      'Partner with more than a decade of experience across investment banking, leveraged finance and entrepreneurship.',
    image: '/images/team/javier-ballve.jpg',
    linkedin: 'https://www.linkedin.com/in/javierballve/',
    bio: [
      {
        heading: 'Professional summary',
        items: [
          'Over a decade of experience across investment banking, commercial banking, leveraged finance and entrepreneurship.',
        ],
      },
      {
        heading: 'Prior experience',
        items: [
          'Held roles at Jefferies International Ltd. and TD Bank, focused on transaction execution and capital structuring for mid-market and institutional clients.',
        ],
      },
      {
        heading: 'Entrepreneurship',
        items: [
          'Founder of Hustle, a fitness and education platform in Vietnam, where he serves as Executive Chairman.',
        ],
      },
      {
        heading: 'Education',
        items: [
          'Joint Honours degree in Business Administration and Economics, St. Francis Xavier University.',
        ],
      },
    ],
  },
  {
    slug: 'gregory-gruschka',
    name: 'Gregory Gruschka',
    title: 'Partner',
    summary: 'Partner focused on mid-market deal origination and portfolio operations.',
    image: '/images/team/gregory-gruschka.jpg',
    linkedin: 'https://www.linkedin.com/in/gregory-gruschka-burda/',
    bio: [
      {
        heading: 'Professional summary',
        items: ['Four years of experience in corporate finance, private equity and operational strategy.'],
      },
      {
        heading: 'Focus',
        items: ['Mid-market deal origination and streamlining portfolio operations to drive value creation.'],
      },
      {
        heading: 'Education',
        items: ['Degree in Business Administration, University of British Columbia.'],
      },
    ],
  },
  {
    slug: 'jerry-tan',
    name: 'Jerry Tan',
    title: 'Director',
    summary:
      'Director with over 15 years as a private equity investor, operator and advisor across Southeast Asia and Greater China.',
    image: '/images/team/jerry-tan.jpg',
    linkedin: 'https://www.linkedin.com/in/contactjerry/',
    bio: [
      {
        heading: 'Professional summary',
        items: [
          'Over 15 years of experience as a private equity investor, operator and advisor.',
          'Completed more than $1.2 billion in M&A and IPO transactions across Southeast Asia and Greater China.',
        ],
      },
      {
        heading: 'Prior experience',
        items: [
          'Director of M&A Advisory at RSM.',
          'Vice President, Private Equity at Novo Tellus Capital Partners ($1B AUM).',
          'Deputy Director at Enterprise Singapore, where he led the Scale-up SG program.',
        ],
      },
      {
        heading: 'Education and credentials',
        items: [
          'Bachelor of Business Management in Finance (Summa Cum Laude), Singapore Management University.',
          'Alumnus of the Stanford Scale-up Executive Programme.',
          'Licensed Representative (Fund Management) under the Monetary Authority of Singapore.',
        ],
      },
    ],
  },
  {
    slug: 'seth-chong',
    name: 'Seth Chong',
    title: 'Associate',
    summary:
      'Associate with experience in corporate development, M&A advisory and financial due diligence across Southeast Asia.',
    image: '/images/team/seth-chong.jpg',
    linkedin: 'https://www.linkedin.com/in/sze-siang-chong/',
    bio: [
      {
        heading: 'Professional summary',
        items: [
          'Experience spanning corporate development, M&A advisory and financial due diligence across Southeast Asia and the wider Asia Pacific region.',
          'Track record in deal origination, execution and investment committee preparation for buyouts, minority stakes and joint ventures.',
        ],
      },
      {
        heading: 'Prior experience',
        items: [
          'Investment and Portfolio Development at Abdul Latif Jameel (ALJ), a globally diversified family enterprise recognized as a 2024 Forbes Middle East Top Arab Family Business.',
          'Deals and Strategy (M&A) Associate at Deloitte SEA Financial Advisory, executing end-to-end M&A and corporate finance engagements across Singapore, Vietnam and Bangladesh.',
          'Began his career in Financial Services Assurance at Ernst & Young, auditing Global Banking and Capital Markets clients.',
        ],
      },
      {
        heading: 'Education and credentials',
        items: [
          'Bachelor of Accountancy (Honours with Distinction), Singapore Institute of Technology.',
          'Recipient of the EY Outstanding Student Award.',
          'Financial Modeling & Valuation Analyst (FMVA), Corporate Finance Institute.',
        ],
      },
    ],
  },
  {
    slug: 'matthias-lee',
    name: 'Matthias Lee',
    title: 'Associate',
    summary: 'Associate with over four years of cross-border M&A advisory experience across Asia Pacific.',
    image: '/images/team/matthias-lee.jpg',
    bio: [
      {
        heading: 'Professional summary',
        items: [
          'Over four years of experience as an M&A advisor across Southeast Asia and Australia, spanning the consumer, logistics, industrials and technology sectors.',
          'Executed buy-side and sell-side transactions, including cross-border acquisitions in Southeast Asia, Australia and Mongolia.',
          'Experience across the full transaction lifecycle, from valuation and operating modelling through multi-stream due diligence to signing and closing.',
        ],
      },
      {
        heading: 'Prior experience',
        items: [
          'M&A Associate at Pickering Pacific, an advisory firm focused on cross-border mid-market transactions in Asia Pacific.',
          'Internships at ING Bank, Titan Capital and Koninklijke Philips.',
        ],
      },
      {
        heading: 'Education',
        items: ['Bachelor of Business Management in Finance, Singapore Management University.'],
      },
    ],
  },
]

export function getTeamMember(slug: string): TeamMember | undefined {
  return team.find((m) => m.slug === slug)
}

export type Office = {
  id: string
  city: string
  region: string
  role: string
  email: string
  timeZone: string
}

export const offices: Office[] = [
  {
    id: 'toronto',
    city: 'Toronto',
    region: 'North America',
    role: 'North American headquarters',
    email: 'toronto@invest-movement.com',
    timeZone: 'America/Toronto',
  },
  {
    id: 'singapore',
    city: 'Singapore',
    region: 'Asia Pacific',
    role: 'Asia Pacific hub',
    email: 'singapore@invest-movement.com',
    timeZone: 'Asia/Singapore',
  },
]

export const contact = {
  eyebrow: 'Contact',
  headline: 'Start a conversation.',
  lead:
    "Whether you are an owner considering a transition, a lender with a complex file, or an advisor with a situation that fits our mandate, we would like to hear from you.",
  officesEyebrow: 'Offices',
  processEyebrow: 'Working with Movement',
  process: [
    {
      title: 'Introduction',
      description: 'A short conversation to understand the business, the situation and what you need.',
    },
    {
      title: 'Assessment',
      description: 'We review the opportunity in confidence and give you a clear, direct view on fit.',
    },
    {
      title: 'Proposal',
      description: 'Where there is a fit, we move quickly to a structured proposal with clear terms and timing.',
    },
  ],
  form: {
    eyebrow: 'Send a message',
    inquiryTypes: [
      { value: 'owner', label: 'A business owner or management team' },
      { value: 'lender', label: 'A lender or financial institution' },
      { value: 'advisor', label: 'An advisor or intermediary' },
      { value: 'careers', label: 'Exploring a career at Movement' },
      { value: 'other', label: 'Other' },
    ],
    submitLabel: 'Send message',
    successTitle: 'Thank you.',
    successBody: 'Your message has been received and a member of our team will be in touch.',
    errorBody: 'Something went wrong and your message was not sent. Please try again, or email us directly at',
  },
}

export const footer = {
  description: siteConfig.shortDescription,
  disclaimer:
    'This website is for informational purposes only and does not constitute an offer to sell or a solicitation of an offer to buy any security.',
  links: [
    { name: 'Privacy Policy', href: '/privacy' },
    { name: 'Terms of Use', href: '/terms' },
  ],
}

export const legal = {
  /** Explicit revision date for the legal pages. Update when the policy text changes. */
  lastUpdated: '2026-09-11',
}
