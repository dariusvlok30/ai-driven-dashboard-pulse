
import React, { useState } from 'react';
import { useDashboardData } from '../../hooks/useDashboardData';
import LoadingSkeleton from './LoadingSkeleton';
import AIInsightsPanel from './AIInsightsPanel';
import KPICard from './KPICard';
import SalesPerformanceTab from './SalesPerformanceTab';
import CustomerAnalyticsTab from './CustomerAnalyticsTab';
import BrandAnalysisTab from './BrandAnalysisTab';
import RegionalPerformanceTab from './RegionalPerformanceTab';
import ExportButton from './ExportButton';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Activity, Users, TrendingUp, DollarSign, AlertCircle, Wifi } from 'lucide-react';
import { formatCurrency, formatNumber } from '../../utils/formatters';

const Dashboard = () => {
  const { data, isLoading, error, isError } = useDashboardData();
  const [activeTab, setActiveTab] = useState('sales');

  if (isLoading) return <LoadingSkeleton />;

  if (isError) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-white mb-2">Connection Error</h2>
          <p className="text-gray-400 mb-4">Unable to fetch dashboard data from the server.</p>
          <p className="text-sm text-gray-500">Please check the API endpoint: http://10.51.0.16:8089/dashboardresults?format=json</p>
        </div>
      </div>
    );
  }

  const dashboardData = data?.dashboard_data || {};
  const kpiData = dashboardData.kpi_executive_summary?.[0] || {};

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Header */}
      <div className="bg-gradient-to-r from-red-900 via-red-800 to-gray-900 shadow-xl">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-white">AI Business Intelligence Dashboard</h1>
              <p className="text-red-200 mt-1">Production-Ready Analytics • South African Business Intelligence</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-green-400">
                <Wifi className="h-4 w-4" />
                <span className="text-sm">Live Data</span>
              </div>
              <ExportButton dashboardData={data} />
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* AI Insights Panel */}
        <AIInsightsPanel 
          insights={data?.ai_analysis || "Analyzing business performance data..."} 
          lastUpdated={data?.last_updated || new Date().toISOString()}
        />

        {/* KPI Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <KPICard
            title="Total Revenue"
            value={kpiData.total_revenue || 0}
            format="currency"
            icon={<DollarSign className="h-5 w-5" />}
            subtitle="This Period"
          />
          <KPICard
            title="Total Orders"
            value={kpiData.total_orders || 0}
            format="number"
            icon={<Activity className="h-5 w-5" />}
            subtitle="Active Orders"
          />
          <KPICard
            title="Active Customers"
            value={kpiData.total_customers || 0}
            format="number"
            icon={<Users className="h-5 w-5" />}
            subtitle="Customer Base"
          />
          <KPICard
            title="Growth Rate"
            value={kpiData.growth_rate || 0}
            format="percentage"
            icon={<TrendingUp className="h-5 w-5" />}
            subtitle="Month over Month"
          />
        </div>

        {/* Interactive Dashboard Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 bg-gray-800 p-1 rounded-lg">
            <TabsTrigger 
              value="sales" 
              className="data-[state=active]:bg-red-600 data-[state=active]:text-white text-gray-300"
            >
              Sales Performance
            </TabsTrigger>
            <TabsTrigger 
              value="customers" 
              className="data-[state=active]:bg-red-600 data-[state=active]:text-white text-gray-300"
            >
              Customer Analytics
            </TabsTrigger>
            <TabsTrigger 
              value="brands" 
              className="data-[state=active]:bg-red-600 data-[state=active]:text-white text-gray-300"
            >
              Brand Analysis
            </TabsTrigger>
            <TabsTrigger 
              value="regional" 
              className="data-[state=active]:bg-red-600 data-[state=active]:text-white text-gray-300"
            >
              Regional Performance
            </TabsTrigger>
          </TabsList>

          <TabsContent value="sales" className="space-y-6">
            <SalesPerformanceTab
              repLeaderboard={dashboardData.sales_rep_leaderboard || []}
              repPerformanceByBrand={dashboardData.sales_rep_performance_by_brand || []}
              weeklyTrends={dashboardData.weekly_sales_trends || []}
            />
          </TabsContent>

          <TabsContent value="customers" className="space-y-6">
            <CustomerAnalyticsTab
              topCustomers={dashboardData.top_customers_analysis || []}
              rfmSegmentation={dashboardData.customer_rfm_segmentation || []}
            />
          </TabsContent>

          <TabsContent value="brands" className="space-y-6">
            <BrandAnalysisTab
              brandPerformance={dashboardData.brand_performance_comparison || []}
              productPerformance={dashboardData.product_performance_analysis || []}
              brandRepPerformance={dashboardData.top_performing_rep_brand_combinations || []}
            />
          </TabsContent>

          <TabsContent value="regional" className="space-y-6">
            <RegionalPerformanceTab
              branchPerformance={dashboardData.branch_performance_dashboard || []}
              businessSegments={dashboardData.business_segment_performance || []}
            />
          </TabsContent>
        </Tabs>

        {/* Footer */}
        <div className="mt-12 pt-8 border-t border-gray-700">
          <div className="flex items-center justify-between text-sm text-gray-400">
            <div>
              Data Source: Live API • Last Updated: {new Date(data?.server_time || Date.now()).toLocaleString('en-ZA')}
            </div>
            <div>
              Status: {data?.status || 'Connected'} • Auto-refresh: 5min
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
