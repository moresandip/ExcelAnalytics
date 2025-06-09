import { ChartOptions } from '../types';

export interface SavedChart {
  id: string;
  userId: string;
  fileId: string;
  title: string;
  chartType: string;
  xAxis: string;
  yAxis: string;
  zAxis?: string;
  labels: string[];
  values: number[];
  createdAt: string;
  updatedAt: string;
}

class ChartService {
  private baseUrl = '/api/charts';

  async saveChart(chartData: {
    fileId: string;
    title: string;
    chartType: string;
    xAxis: string;
    yAxis: string;
    zAxis?: string;
    labels: string[];
    values: number[];
  }): Promise<SavedChart> {
    try {
      const response = await fetch(`${this.baseUrl}/save`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(chartData),
      });

      if (!response.ok) {
        throw new Error('Failed to save chart');
      }

      return await response.json();
    } catch (error) {
      console.error('Error saving chart:', error);
      throw error;
    }
  }

  async getUserCharts(): Promise<SavedChart[]> {
    try {
      const response = await fetch(`${this.baseUrl}/user`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch user charts');
      }

      return await response.json();
    } catch (error) {
      console.error('Error fetching user charts:', error);
      throw error;
    }
  }

  async deleteChart(chartId: string): Promise<void> {
    try {
      const response = await fetch(`${this.baseUrl}/${chartId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to delete chart');
      }
    } catch (error) {
      console.error('Error deleting chart:', error);
      throw error;
    }
  }

  async getChartById(chartId: string): Promise<SavedChart> {
    try {
      const response = await fetch(`${this.baseUrl}/${chartId}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch chart');
      }

      return await response.json();
    } catch (error) {
      console.error('Error fetching chart:', error);
      throw error;
    }
  }
}

export const chartService = new ChartService();