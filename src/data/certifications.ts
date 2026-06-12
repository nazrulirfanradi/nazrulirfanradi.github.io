export interface Certification {
  name: string
  issuer: string
  code: string
  year: string
  vendor: 'microsoft' | 'google' | 'python' | 'apu'
  // Replace '#' with the Credly / Microsoft Learn share link when available
  credentialUrl: string
}

export const certifications: Certification[] = [
  {
    name: 'Power BI Data Analyst Associate',
    issuer: 'Microsoft',
    code: 'PL-300',
    year: '2025',
    vendor: 'microsoft',
    credentialUrl: '#',
  },
  {
    name: 'Azure Fundamentals',
    issuer: 'Microsoft',
    code: 'AZ-900',
    year: '2025',
    vendor: 'microsoft',
    credentialUrl: '#',
  },
  {
    name: 'Certified Entry-Level Python Programmer',
    issuer: 'Python Institute',
    code: 'PCEP',
    year: '2025',
    vendor: 'python',
    credentialUrl: '#',
  },
  {
    name: 'Professional Data Analyst',
    issuer: 'Google',
    code: 'Coursera',
    year: '2024',
    vendor: 'google',
    credentialUrl: '#',
  },
  {
    name: 'Certified Data Analyst',
    issuer: 'Asia Pacific University',
    code: 'Bootcamp',
    year: '2024',
    vendor: 'apu',
    credentialUrl: '#',
  },
  {
    name: 'Certified Data Associate',
    issuer: 'Asia Pacific University',
    code: 'Bootcamp',
    year: '2023',
    vendor: 'apu',
    credentialUrl: '#',
  },
]

export interface Award {
  title: string
  org: string
  year: string
  description: string
}

export const awards: Award[] = [
  {
    title: 'SPOT Award — Employee of the Month',
    org: 'BASF',
    year: '2025',
    description: 'Second consecutive year, for contributions to data quality and BI in the Supply Chain Nerve Centre.',
  },
  {
    title: 'SPOT Award — Employee of the Month',
    org: 'BASF',
    year: '2024',
    description: 'For a proactive approach to solving VISTA data quality problems.',
  },
  {
    title: 'Maybank Student Ambassador',
    org: 'Maybank',
    year: '2020–2022',
    description: 'Selected two years running from 600+ global applicants.',
  },
  {
    title: 'Top 50 Malaysia Young Talent Award',
    org: 'National',
    year: '2020',
    description: 'Finalist among 500+ applicants for leadership and youth empowerment.',
  },
  {
    title: 'Champion — School of Boost',
    org: 'Boost',
    year: '2020',
    description: 'Led the UPM team to the national championship of Malaysia\'s first corporate school.',
  },
]
