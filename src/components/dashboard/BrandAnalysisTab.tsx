
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { formatCurrency } from '../../utils/formatters';

interface BrandAnalysisTabProps {
  brandPerformance: any[];
  productPerformance: any[];
  brandRepPerformance: any[];
}

const BrandAnalysisTab: React.FC<BrandAnalysisTabProps> = ({
  brandPerformance,
  productPerformance,
  brandRepPerformance
}) => {
  return (
    <div className="space-y-8">
      {/* Brand Performance Comparison */}
      <div className="bg-gray-800 rounded-lg p-6">
        <h3 className="text-xl font-bold text-white mb-6">Brand Performance Comparison</h3>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={brandPerformance || []}>
            <CartesianGrid strokeDasharray="3,3" stroke="#374151" />
            <XAxis 
              dataKey="brand" 
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
            <Bar dataKey="revenue" fill="#DC2626" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Product Performance Analysis */}
      <div className="bg-gray-800 rounded-lg p-6">
        <h3 className="text-xl font-bold text-white mb-6">Top Product Performance</h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={productPerformance?.slice(0, 10) || []}>
                <CartesianGrid strokeDasharray="3,3" stroke="#374151" />
                <XAxis 
                  dataKey="product_name" 
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
                <Bar dataKey="total_revenue" fill="#EF4444" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          
          <div className="space-y-3 max-h-80 overflow-y-auto">
            {productPerformance?.slice(0, 10).map((product, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors cursor-pointer">
                <div>
                  <div className="text-white font-medium text-sm">{product.product_name}</div>
                  <div className="text-gray-400 text-xs">{product.brand || 'N/A'}</div>
                </div>
                <div className="text-right">
                  <div className="text-white font-bold">{formatCurrency(product.total_revenue || 0)}</div>
                  <div className="text-gray-400 text-sm">{product.quantity_sold || 0} sold</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Brand-Rep Performance Heatmap */}
      <div className="bg-gray-800 rounded-lg p-6">
        <h3 className="text-xl font-bold text-white mb-6">Top Rep-Brand Combinations</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {brandRepPerformance?.slice(0, 9).map((combo, index) => (
            <div key={index} className="bg-gray-700 rounded-lg p-4 hover:bg-gray-600 transition-colors cursor-pointer">
              <div className="flex items-center justify-between mb-2">
                <div className="text-white font-medium text-sm">{combo.rep_name}</div>
                <div className="text-red-400 text-xs font-bold">{combo.brand}</div>
              </div>
              <div className="text-2xl font-bold text-white mb-1">
                {formatCurrency(combo.total_revenue || 0)}
              </div>
              <div className="text-gray-400 text-sm">
                {combo.order_count || 0} orders • {combo.customer_count || 0} customers
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BrandAnalysisTab;
