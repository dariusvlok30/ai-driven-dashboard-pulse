
import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';
import { formatCurrency } from '../../utils/formatters';

interface CustomerAnalyticsTabProps {
  topCustomers: any[];
  rfmSegmentation: any[];
}

const CustomerAnalyticsTab: React.FC<CustomerAnalyticsTabProps> = ({
  topCustomers,
  rfmSegmentation
}) => {
  const COLORS = ['#DC2626', '#EF4444', '#F87171', '#FCA5A5', '#FECACA'];

  return (
    <div className="space-y-8">
      {/* Top Customers Analysis */}
      <div className="bg-gray-800 rounded-lg p-6">
        <h3 className="text-xl font-bold text-white mb-6">Top Customers Analysis</h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={topCustomers?.slice(0, 10) || []}>
                <CartesianGrid strokeDasharray="3,3" stroke="#374151" />
                <XAxis 
                  dataKey="customer_name" 
                  tick={{ fill: '#9CA3AF', fontSize: 10 }}
                  angle={-45}
                  textAnchor="end"
                  height={100}
                />
                <YAxis tick={{ fill: '#9CA3AF' }} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1F2937', 
                    border: 'none', 
                    borderRadius: '8px',
                    color: '#fff'
                  }}
                  formatter={(value: any) => [formatCurrency(value), 'Revenue']}
                />
                <Bar dataKey="total_revenue" fill="#DC2626" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          
          <div className="space-y-3 max-h-80 overflow-y-auto">
            {topCustomers?.slice(0, 8).map((customer, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors cursor-pointer">
                <div>
                  <div className="text-white font-medium">{customer.customer_name}</div>
                  <div className="text-gray-400 text-sm">{customer.location || 'N/A'}</div>
                </div>
                <div className="text-right">
                  <div className="text-white font-bold">{formatCurrency(customer.total_revenue || 0)}</div>
                  <div className="text-gray-400 text-sm">{customer.order_count || 0} orders</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* RFM Segmentation */}
      <div className="bg-gray-800 rounded-lg p-6">
        <h3 className="text-xl font-bold text-white mb-6">Customer RFM Segmentation</h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={rfmSegmentation || []}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="customer_count"
                  nameKey="segment"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {(rfmSegmentation || []).map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1F2937', 
                    border: 'none', 
                    borderRadius: '8px',
                    color: '#fff'
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          
          <div className="space-y-3">
            {rfmSegmentation?.map((segment, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-700 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div 
                    className="w-4 h-4 rounded-full"
                    style={{ backgroundColor: COLORS[index % COLORS.length] }}
                  ></div>
                  <div>
                    <div className="text-white font-medium">{segment.segment}</div>
                    <div className="text-gray-400 text-sm">Avg: {formatCurrency(segment.avg_revenue || 0)}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-white font-bold">{segment.customer_count || 0}</div>
                  <div className="text-gray-400 text-sm">customers</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerAnalyticsTab;
