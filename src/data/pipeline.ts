export interface PipelineMode {
  id: string
  label: string
  headline: string
  stages: string[]
  // Each line belongs to a stage index; lines appear beat-by-beat
  lines: { stage: number; text: string; accent?: boolean }[]
  checklist: { stage: number; text: string }[]
}

export const pipelineModes: PipelineMode[] = [
  {
    id: 'data',
    label: 'Data Pipeline',
    headline: 'how a shipment becomes a dashboard',
    stages: ['Extract', 'Clean', 'Transform', 'Load', 'Dashboard'],
    lines: [
      { stage: 0, text: '> ingest SAP Cobalt tables — 5,402 lanes, 4 departure zones' },
      { stage: 1, text: 'validate lifecycle events: 22 carriers, 7 regions ✓', accent: true },
      { stage: 1, text: 'flag missing events → root cause queue' },
      { stage: 2, text: 'compute lead times (DAX + Power Query)' },
      { stage: 3, text: 'load to Databricks delta tables — cost-optimised' },
      { stage: 4, text: "published: 'Global Lead Time Calculator' refreshed ✓", accent: true },
    ],
    checklist: [
      { stage: 0, text: 'Source data extracted' },
      { stage: 1, text: 'Quality checks passed' },
      { stage: 2, text: 'Lead times calculated' },
      { stage: 3, text: 'Warehouse updated' },
      { stage: 4, text: 'Dashboard refreshed' },
    ],
  },
  {
    id: 'ai',
    label: 'AI Automation',
    headline: 'how an automation thinks',
    stages: ['Trigger', 'Agent', 'Tool Call', 'Action', 'Report'],
    lines: [
      { stage: 0, text: '> schedule fired: weekly fleet safety review (Mon 06:00)' },
      { stage: 1, text: 'agent: summarise inspection results, find rejection factors' },
      { stage: 2, text: 'tool_call → query("inspections", last_7_days)', accent: true },
      { stage: 3, text: 'top factors: fire extinguisher, driver rest, sensors' },
      { stage: 3, text: 'compose report + charts' },
      { stage: 4, text: 'sent to Transport Operations Managers ✓ (zero clicks)', accent: true },
    ],
    checklist: [
      { stage: 0, text: 'Trigger received' },
      { stage: 1, text: 'Agent reasoned over data' },
      { stage: 2, text: 'Tools executed' },
      { stage: 3, text: 'Insights generated' },
      { stage: 4, text: 'Report delivered' },
    ],
  },
]

// Airflow-style DAG snippet typed into the terminal card
export const terminalCode = [
  { text: 'from airflow.decorators import dag, task', color: 'text-violet-400' },
  { text: '', color: '' },
  { text: '@dag(schedule="@daily", tags=["supply-chain"])', color: 'text-amber-300' },
  { text: 'def shipment_quality_pipeline():', color: 'text-glow' },
  { text: '    events = extract_lifecycle_events()   # 22 carriers', color: 'text-ink' },
  { text: '    clean  = validate(events, rules=SOP)  # data quality', color: 'text-ink' },
  { text: '    marts  = transform(clean, model="star")', color: 'text-ink' },
  { text: '    publish_powerbi(marts)                # auto refresh', color: 'text-accent' },
]

export const currentlyLearning = [
  'Building AI agents & LLM workflows',
  'n8n + Power Automate orchestration',
  'PySpark at scale on Databricks',
  'Apache Airflow in production',
]
