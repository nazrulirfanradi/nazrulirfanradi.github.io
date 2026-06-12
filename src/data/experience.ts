export interface TimelineEntry {
  type: 'work' | 'education'
  company: string
  role: string
  period: string
  location: string
  highlights: string[]
  tags: string[]
}

export const timeline: TimelineEntry[] = [
  {
    type: 'work',
    company: 'BASF Asia-Pacific Service Centre',
    role: 'Data Quality Management (Executive)',
    period: 'May 2024 — Present',
    location: 'Kuala Lumpur, Malaysia',
    highlights: [
      'Own shipment lifecycle data quality on the BASF global track & trace platform — monitoring, root cause analysis and corrective actions across 22 carriers and 7 regions.',
      'Built the Global Lead Time Calculator and VISTA Data Quality Dashboard used by supply chain leadership for data-driven decisions.',
      'Collaborate cross-regionally with data scientists, supply chain experts and IT to resolve systemic data issues.',
      'Mentor of the BASF Data Practitioner Community — coaching colleagues on Power BI, data quality and pipeline design.',
    ],
    tags: ['Power BI', 'Azure Data Factory', 'Databricks', 'MongoDB', 'SAP'],
  },
  {
    type: 'work',
    company: 'Nestlé Products Sdn. Bhd.',
    role: 'Transportation Executive (Service Specialist)',
    period: 'Oct 2022 — Apr 2024',
    location: 'Selangor, Malaysia',
    highlights: [
      'Managed 14 transportation service providers for on-time collection and delivery across Malaysia & Singapore.',
      'Improved OTC/OTD KPIs from 70% to 85% in 6 months with a Power BI registration tracker.',
      'Automated the weekly Fleet Safety Inspection Report with Power BI + Power Automate, lifting inspections from 30 to 55 per week.',
      'Led Daily / Weekly / Monthly Operation Reviews with cross-functional teams.',
    ],
    tags: ['Power BI', 'Power Automate', 'SAP TM', 'SAP ECC', '3PL Management'],
  },
  {
    type: 'work',
    company: 'Maybank',
    role: 'Financial Analyst',
    period: 'Mar 2022 — Sep 2022',
    location: 'Kuala Lumpur, Malaysia',
    highlights: [
      'Prepared monthly & quarterly management reporting with analysis and recommendations for Maybank Shared Services and MBB Labs.',
      'Tracked financial performance, headcount movement and cost management initiatives.',
      'Supported external, statutory and tax audits with stakeholders inside and outside Maybank Group.',
    ],
    tags: ['Financial Reporting', 'Excel', 'Stakeholder Management'],
  },
  {
    type: 'education',
    company: 'Asia Pacific University (APU)',
    role: 'Certified Data Analyst',
    period: 'Dec 2024 — Mar 2025',
    location: 'Kuala Lumpur, Malaysia',
    highlights: [
      'Data analytics bootcamp covering SQL, Python, Power BI and statistics.',
      'Passed Microsoft PL-300 (Power BI Data Analyst Associate) and Python PCEP along the way.',
    ],
    tags: ['Power BI', 'Python', 'SQL'],
  },
  {
    type: 'education',
    company: 'Universiti Putra Malaysia (UPM)',
    role: 'Bachelor of Accountancy',
    period: '2018 — 2022',
    location: 'Serdang, Malaysia',
    highlights: [
      'Student Representative Council member; Putra Icon Award (Entrepreneurial Leadership).',
      'Maybank Student Ambassador two years running; Top 50 Malaysia Young Talent Award finalist.',
    ],
    tags: ['Accountancy', 'Leadership'],
  },
]

export const leadership = [
  { title: 'BASF Data Practitioner Community Mentor', year: '2026' },
  { title: 'BASF Data Practitioner Community Member', year: '2025' },
  { title: 'BASF Social Club Representative', year: '2025' },
  { title: 'Nestlé Cares Lead Volunteer', year: '2024' },
]
