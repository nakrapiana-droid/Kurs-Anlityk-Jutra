import React, { useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, Legend } from 'recharts';
import { RiskSummaryItem } from '../types';

interface RiskChartProps {
  data: RiskSummaryItem[];
}

const PRIORITY_ORDER = {
  'Critical': 4,
  'High': 3,
  'Medium': 2,
  'Low': 1
};

const COLORS = {
  'Critical': '#ef4444', // red-500
  'High': '#f97316',     // orange-500
  'Medium': '#eab308',   // yellow-500
  'Low': '#3b82f6'       // blue-500
};

export const RiskChart: React.FC<RiskChartProps> = ({ data }) => {
  const chartData = useMemo(() => {
    // Aggregate data by priority
    const counts = { Critical: 0, High: 0, Medium: 0, Low: 0 };
    data.forEach(item => {
      if (counts[item.priority] !== undefined) {
        counts[item.priority]++;
      }
    });

    return Object.keys(counts).map(key => ({
      name: key,
      count: counts[key as keyof typeof counts],
      value: PRIORITY_ORDER[key as keyof typeof PRIORITY_ORDER] // For sorting context if needed
    })).sort((a, b) => b.value - a.value); // Sort Critical first
  }, [data]);

  if (data.length === 0) return null;

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 h-80 flex flex-col">
      <h3 className="text-lg font-semibold text-slate-800 mb-4">Risk Severity Distribution</h3>
      <div className="flex-1 w-full min-h-0">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={chartData}
            layout="vertical"
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" horizontal={false} />
            <XAxis type="number" allowDecimals={false} />
            <YAxis type="category" dataKey="name" width={60} tick={{fill: '#64748b'}} />
            <Tooltip 
              cursor={{fill: '#f1f5f9'}}
              contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
            />
            <Bar dataKey="count" radius={[0, 4, 4, 0]} barSize={30}>
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[entry.name as keyof typeof COLORS]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
