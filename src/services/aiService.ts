export interface ChartSuggestion {
  chartType: string;
  reasoning: string;
  confidence: number;
}

export interface DataInsight {
  summary: string;
  trends: string[];
  recommendations: string[];
}

class AIService {
  private baseUrl = '/api/ai';

  async suggestChartType(columns: string[], sampleData: any[]): Promise<ChartSuggestion> {
    try {
      const response = await fetch(`${this.baseUrl}/suggest-chart`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({
          columns,
          sampleData: sampleData.slice(0, 5), // Send only first 5 rows for analysis
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to get chart suggestion');
      }

      return await response.json();
    } catch (error) {
      console.error('Error getting chart suggestion:', error);
      // Fallback to basic logic if AI service fails
      return this.fallbackChartSuggestion(columns);
    }
  }

  async generateInsights(data: any[], chartType: string, xAxis: string, yAxis: string): Promise<DataInsight> {
    try {
      const response = await fetch(`${this.baseUrl}/generate-insights`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({
          data: data.slice(0, 10), // Send sample data
          chartType,
          xAxis,
          yAxis,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate insights');
      }

      return await response.json();
    } catch (error) {
      console.error('Error generating insights:', error);
      // Fallback to basic insights
      return this.fallbackInsights(data, xAxis, yAxis);
    }
  }

  private fallbackChartSuggestion(columns: string[]): ChartSuggestion {
    // Basic logic for chart type suggestion
    const numericColumns = columns.filter(col => 
      col.toLowerCase().includes('amount') || 
      col.toLowerCase().includes('value') || 
      col.toLowerCase().includes('price') ||
      col.toLowerCase().includes('sales') ||
      col.toLowerCase().includes('profit')
    );

    const timeColumns = columns.filter(col =>
      col.toLowerCase().includes('date') ||
      col.toLowerCase().includes('time') ||
      col.toLowerCase().includes('month') ||
      col.toLowerCase().includes('year')
    );

    if (timeColumns.length > 0 && numericColumns.length > 0) {
      return {
        chartType: 'line',
        reasoning: 'Time-based data is best visualized with line charts to show trends over time.',
        confidence: 0.8
      };
    } else if (numericColumns.length >= 2) {
      return {
        chartType: 'scatter',
        reasoning: 'Multiple numeric columns suggest correlation analysis with scatter plots.',
        confidence: 0.7
      };
    } else {
      return {
        chartType: 'bar',
        reasoning: 'Bar charts are versatile for comparing categorical data.',
        confidence: 0.6
      };
    }
  }

  private fallbackInsights(data: any[], xAxis: string, yAxis: string): DataInsight {
    const values = data.map(item => item[yAxis]).filter(val => typeof val === 'number');
    const avg = values.reduce((a, b) => a + b, 0) / values.length;
    const max = Math.max(...values);
    const min = Math.min(...values);

    return {
      summary: `Analysis of ${yAxis} shows an average value of ${avg.toFixed(2)}, with a range from ${min} to ${max}.`,
      trends: [
        `Highest value: ${max}`,
        `Lowest value: ${min}`,
        `Average: ${avg.toFixed(2)}`
      ],
      recommendations: [
        'Consider analyzing outliers for deeper insights',
        'Look for seasonal patterns if time-based data',
        'Compare with industry benchmarks'
      ]
    };
  }
}

export const aiService = new AIService();