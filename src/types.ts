export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'user';
}

export interface ExcelFile {
  id: string;
  name: string;
  uploadDate: string;
  size: number;
  userId: string;
  columns: string[];
}

export interface ChartData {
  id: string;
  fileId: string;
  userId: string;
  chartType: ChartType;
  title: string;
  xAxis: string;
  yAxis: string;
  zAxis?: string;
  createdAt: string;
}

export type ChartType = 
  | 'bar' 
  | 'line' 
  | 'pie' 
  | 'scatter' 
  | 'area' 
  | 'bubble' 
  | 'column3d' 
  | 'bar3d';

export interface ChartOptions {
  title: string;
  chartType: ChartType;
  xAxis: string;
  yAxis: string;
  zAxis?: string;
}