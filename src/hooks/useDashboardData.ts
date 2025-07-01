
import { useQuery } from '@tanstack/react-query';

export interface DashboardData {
  dashboard_data: {
    kpi_executive_summary: any[];
    top_customers_analysis: any[];
    customer_rfm_segmentation: any[];
    sales_rep_leaderboard: any[];
    sales_rep_performance_by_brand: any[];
    sales_rep_brand_summary: any[];
    top_performing_rep_brand_combinations: any[];
    brand_performance_top_reps: any[];
    monthly_rep_brand_performance: any[];
    product_performance_analysis: any[];
    brand_performance_comparison: any[];
    branch_performance_dashboard: any[];
    weekly_sales_trends: any[];
    business_segment_performance: any[];
  };
  ai_analysis: string;
  last_updated: string;
  server_time: string;
  status: string;
}

export const useDashboardData = () => {
  return useQuery({
    queryKey: ['dashboard-data'],
    queryFn: async (): Promise<DashboardData> => {
      const response = await fetch('http://10.51.0.16:8089/dashboardresults?format=json');
      if (!response.ok) {
        throw new Error('Failed to fetch dashboard data');
      }
      return response.json();
    },
    refetchInterval: 300000, // 5 minutes
    retry: 3,
    staleTime: 60000, // 1 minute
  });
};
