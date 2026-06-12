export type ProjectCategory = 'supply-chain' | 'data-eng' | 'ai-automation'

export interface Project {
  title: string
  org: string
  category: ProjectCategory
  tag: string
  description: string
  metrics: string[]
  tech: string[]
  links: { label: string; url: string }[]
  // Seed for the generated mini-dashboard preview
  previewSeed: number
}

export const projectCategories: { id: ProjectCategory | 'all'; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'supply-chain', label: 'Supply Chain & BI' },
  { id: 'data-eng', label: 'Data Engineering' },
  { id: 'ai-automation', label: 'AI & Automation' },
]

export const projects: Project[] = [
  {
    title: 'Global Lead Time Calculator',
    org: 'BASF',
    category: 'data-eng',
    tag: 'Power BI + Databricks',
    description:
      'Replaced a manual Excel/VBA scheduling file with a Power BI dashboard fed by an Azure Data Factory pipeline over SAP Cobalt tables — later migrated to Databricks for cost optimisation.',
    metrics: ['5,402 arrival points · 4 departure zones', 'MVP shipped in 1 week', 'ADF → Databricks migration cut pipeline cost'],
    tech: ['Power BI', 'DAX', 'Azure Data Factory', 'Databricks', 'SAP'],
    links: [],
    previewSeed: 1,
  },
  {
    title: 'VISTA Data Quality Dashboard',
    org: 'BASF',
    category: 'supply-chain',
    tag: 'Power BI + MongoDB',
    description:
      'Data quality cockpit tracking shipment event accuracy across the BASF track & trace platform, presented to the Head of Supply Chain.',
    metrics: ['22 carriers monitored', '7 global regions + 1 AIS provider', 'Presented to Head of Supply Chain'],
    tech: ['Power BI', 'MongoDB Charts', 'Data Quality'],
    links: [],
    previewSeed: 2,
  },
  {
    title: '3PL Coordinator Registration Tracker',
    org: 'Nestlé',
    category: 'supply-chain',
    tag: 'Power BI',
    description:
      'Dashboard ensuring on-time third-party coordinator registration at the Nestlé Distribution Centre, built with HR, Security and 3PL partners.',
    metrics: ['On-time registration 65% → 80% in 3 months', 'OTC/OTD KPIs 70% → 85% in 6 months'],
    tech: ['Power BI', 'Power Query', 'SAP TM'],
    links: [],
    previewSeed: 3,
  },
  {
    title: 'Fleet Safety Inspection Report',
    org: 'Nestlé',
    category: 'ai-automation',
    tag: 'Power BI + Power Automate',
    description:
      'Automated weekly safety report delivered to transport leadership without anyone pressing a button — surfaced the top truck rejection factors.',
    metrics: ['Weekly inspections 30 → 55 (+30%)', 'Showcased at Nestlé National Safety Day'],
    tech: ['Power BI', 'Power Automate'],
    links: [],
    previewSeed: 4,
  },
  {
    title: 'Nike Sales Dashboard',
    org: 'Maven Analytics',
    category: 'supply-chain',
    tag: 'Power BI',
    description:
      'Personal portfolio dashboard exploring Nike retail sales performance — part of my public Maven Analytics portfolio.',
    metrics: ['Public portfolio project'],
    tech: ['Power BI', 'DAX'],
    links: [
      { label: 'Portfolio', url: 'https://www.datascienceportfol.io/nazrulirfanradi' },
      { label: 'Maven Profile', url: 'https://mavenanalytics.io/profile/nazrulirfanradi' },
    ],
    previewSeed: 5,
  },
  {
    title: 'LEGO & Street Fighter Dashboards',
    org: 'Maven Analytics',
    category: 'supply-chain',
    tag: 'Power BI',
    description:
      'Fun exploratory dashboards (LEGO set economics, Street Fighter matchup data) sharpening design, modelling and DAX skills.',
    metrics: ['Public portfolio projects'],
    tech: ['Power BI', 'Power Query'],
    links: [
      { label: 'Portfolio', url: 'https://www.datascienceportfol.io/nazrulirfanradi' },
    ],
    previewSeed: 6,
  },
]
