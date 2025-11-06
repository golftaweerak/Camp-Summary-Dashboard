export interface Metric {
  name: string;
  score: number;
}

export interface DashboardItem {
  id: string;
  title: string;
  n: number;
  average: number;
  colorClass: string;
  metrics: Metric[];
  icon: string;
}

export interface FinancialMetric {
  name: string;
  amount: number;
}