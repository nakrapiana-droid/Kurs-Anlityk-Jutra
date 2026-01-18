export interface RiskSummaryItem {
  area: string;
  severity: 'High' | 'Medium' | 'Low' | 'Critical';
  likelihood: 'High' | 'Medium' | 'Low';
  priority: 'High' | 'Medium' | 'Low' | 'Critical';
  action: string;
}

export interface AnalysisResponse {
  markdownReport: string;
  riskData: RiskSummaryItem[];
}

export enum LoadingState {
  IDLE = 'IDLE',
  ANALYZING = 'ANALYZING',
  COMPLETE = 'COMPLETE',
  ERROR = 'ERROR'
}
