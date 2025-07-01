
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { formatCurrency } from '../../utils/formatters';

interface RegionalPerformanceTabProps {
  branchPerformance: any[];
  businessSegments: any[];
}

const RegionalPerformanceTab: React.FC<RegionalPerformanceTabProps> = ({
  branchPerformance,
  businessSegments
}) => {
  const COLORS = ['#DC2626', '#EF4444', '#F87171', '#FCA5A5', '#FECACA'];

  return (
    <div className="space-y-8">
      {/* Branch Performance Dashboard */}
      <div className="bg-gray-800 rounded-lg p-6">
        <h3 className="text-xl font-bold text-white mb-6">Branch Performance Dashboard</h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={branchPerformance || []}>
                <CartesianGrid strokeDasharray="3,3" stroke="#374151" />
                <XAxis 
                  dataKey="branch" 
                  tick={{ fill: '#9CA3AF' }}
                  angle={-45}
                  textAnchor="end"
                  height={80}
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
          
          <div className="space-y-3">
            {branchPerformance?.map((branch, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors cursor-pointer">
                <div>
                  <div className="text-white font-medium">{branch.branch}</div>
                  <div className="text-gray-400 text-sm">{branch.region || 'N/A'}</div>
                </div>
                <div className="text-right">
                  <div className="text-white font-bold">{formatCurrency(branch.total_revenue || 0)}</div>
                  <div className="text-gray-400 text-sm">{branch.order_count || 0} orders</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Business Segment Performance */}
      <div className="bg-gray-800 rounded-lg p-6">
        <h3 className="text-xl font-bold text-white mb-6">Business Segment Performance</h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={businessSegments || []}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="revenue"
                  nameKey="segment"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {(businessSegments || []).map((entry, index) => (
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
                  formatter={(value: any) => [formatCurrency(value), 'Revenue']}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          
          <div className="space-y-4">
            {businessSegments?.map((segment, index) => (
              <div key={index} className="bg-gray-700 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-3">
                    <div 
                      className="w-4 h-4 rounded-full"
                      style={{ backgroundColor: COLORS[index % COLORS.length] }}
                    ></div>
                    <div className="text-white font-medium">{segment.segment}</div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <div className="text-gray-400">Revenue</div>
                    <div className="text-white font-bold">{formatCurrency(segment.revenue || 0)}</div>
                  </div>
                  <div>
                    <div className="text-gray-400">Orders</div>
                    <div className="text-white font-bold">{segment.order_count || 0}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegionalPerformanceTab;
