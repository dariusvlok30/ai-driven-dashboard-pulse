
import React from 'react';
import { Brain, TrendingUp, AlertTriangle, Lightbulb } from 'lucide-react';

interface AIInsightsPanelProps {
  insights: string;
  lastUpdated: string;
}

const AIInsightsPanel: React.FC<AIInsightsPanelProps> = ({ insights, lastUpdated }) => {
  return (
    <div className="bg-gradient-to-r from-red-900 via-red-800 to-gray-900 rounded-lg p-6 mb-8 shadow-xl">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <Brain className="h-8 w-8 text-red-300" />
          <h2 className="text-2xl font-bold text-white">🤖 AI Business Intelligence</h2>
        </div>
        <div className="text-sm text-red-200">
          Last updated: {new Date(lastUpdated).toLocaleString('en-ZA')}
        </div>
      </div>
      
      <div className="bg-black/30 rounded-lg p-4 mb-4">
        <div className="text-white leading-relaxed whitespace-pre-wrap">
          {insights || "AI analysis is being generated..."}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="flex items-center space-x-2 text-green-300">
          <TrendingUp className="h-5 w-5" />
          <span className="text-sm">Growth Opportunities</span>
        </div>
        <div className="flex items-center space-x-2 text-yellow-300">
          <AlertTriangle className="h-5 w-5" />
          <span className="text-sm">Risk Indicators</span>
        </div>
        <div className="flex items-center space-x-2 text-blue-300">
          <Lightbulb className="h-5 w-5" />
          <span className="text-sm">Smart Recommendations</span>
        </div>
      </div>
    </div>
  );
};

export default AIInsightsPanel;
