
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { formatCurrency } from '../../utils/formatters';

interface SalesPerformanceTabProps {
  repLeaderboard: any[];
  repPerformanceByBrand: any[];
  weeklyTrends: any[];
}

const SalesPerformanceTab: React.FC<SalesPerformanceTabProps> = ({
  repLeaderboard,
  repPerformanceByBrand,
  weeklyTrends
}) => {
  return (
    <div className="space-y-8">
      {/* Sales Rep Leaderboard */}
      <div className="bg-gray-800 rounded-lg p-6">
        <h3 className="text-xl font-bold text-white mb-6">Sales Rep Leaderboard</h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={repLeaderboard?.slice(0, 10) || []}>
                <CartesianGrid strokeDasharray="3,3" stroke="#374151" />
                <XAxis 
                  dataKey="rep_name" 
                  tick={{ fill: '#9CA3AF', fontSize: 12 }}
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
            {repLeaderboard?.slice(0, 5).map((rep, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors cursor-pointer">
                <div className="flex items-center space-x-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold ${
                    index === 0 ? 'bg-yellow-500' : 
                    index === 1 ? 'bg-gray-400' : 
                    index === 2 ? 'bg-orange-600' : 'bg-red-600'
                  }`}>
                    {index + 1}
                  </div>
                  <div>
                    <div className="text-white font-medium">{rep.rep_name}</div>
                    <div className="text-gray-400 text-sm">{rep.branch || 'N/A'}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-white font-bold">{formatCurrency(rep.total_revenue || 0)}</div>
                  <div className="text-gray-400 text-sm">{rep.orders_count || 0} orders</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Weekly Sales Trends */}
      <div className="bg-gray-800 rounded-lg p-6">
        <h3 className="text-xl font-bold text-white mb-6">Weekly Sales Trends</h3>
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={weeklyTrends || []}>
            <CartesianGrid strokeDasharray="3,3" stroke="#374151" />
            <XAxis 
              dataKey="week" 
              tick={{ fill: '#9CA3AF' }}
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
            <Line 
              type="monotone" 
              dataKey="revenue" 
              stroke="#DC2626" 
              strokeWidth={3}
              dot={{ fill: '#DC2626', strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, stroke: '#DC2626', strokeWidth: 2 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default SalesPerformanceTab;
