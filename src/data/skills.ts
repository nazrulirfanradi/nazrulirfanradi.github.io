export interface SkillCategory {
  id: string
  label: string
  skills: string[]
}

export const skillCategories: SkillCategory[] = [
  {
    id: 'programming',
    label: 'Programming',
    skills: ['SQL', 'Python', 'Pandas', 'PySpark', 'NumPy', 'Matplotlib', 'DAX'],
  },
  {
    id: 'data-eng',
    label: 'Data Engineering',
    skills: [
      'Apache Airflow',
      'Spark',
      'Azure Data Factory',
      'Databricks',
      'ETL Pipelines',
      'Data Modelling',
      'Data Quality',
    ],
  },
  {
    id: 'bi',
    label: 'Analytics & BI',
    skills: [
      'Power BI',
      'Power Query',
      'Power Automate',
      'Power Apps',
      'Excel',
      'MongoDB Charts',
      'Dashboard Design',
    ],
  },
  {
    id: 'cloud',
    label: 'Cloud',
    skills: [
      'Azure Databricks',
      'Azure Data Factory',
      'Azure Data Lake',
      'Azure Fundamentals',
      'Alibaba Cloud',
    ],
  },
  {
    id: 'db-tools',
    label: 'Databases & Tools',
    skills: ['SQL Server', 'MySQL', 'MongoDB', 'GitHub', 'VS Code', 'Jupyter'],
  },
  {
    id: 'sap',
    label: 'Enterprise SAP',
    skills: ['SAP TM', 'SAP ECC', 'SAP S/4 HANA', 'SAP IBP', 'SAP R3 Cobalt'],
  },
]
