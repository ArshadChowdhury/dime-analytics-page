'use client';

import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
} from 'recharts';
import AdditionalInfoLegend from './AdditionalInfoLegend';

// Mock Data for the Growth Benchmark Chart
const chartData = [
  { name: 'Jan 1', revenue: 50000, pv: 2400, amt: 2400 },
  { name: 'Jan 15', revenue: 70000, pv: 1398, amt: 2210 },
  { name: 'Feb 1', revenue: 60000, pv: 9800, amt: 2290 },
  { name: 'Feb 15', revenue: 80000, pv: 3908, amt: 2000 },
  { name: 'Mar 1', revenue: 120000, pv: 4800, amt: 2181 },
  { name: 'Mar 15', revenue: 150000, pv: 3800, amt: 2500 },
  { name: 'Apr 1', revenue: 180000, pv: 4300, amt: 2100 },
  { name: 'Apr 15', revenue: 200000, pv: 2400, amt: 2400 },
  { name: 'May 1', revenue: 220000, pv: 1398, amt: 2210 },
  { name: 'May 15', revenue: 250000, pv: 9800, amt: 2290 },
  { name: 'Jun 1', revenue: 280000, pv: 3908, amt: 2000 },
  { name: 'Jun 15', revenue: 290000, pv: 4800, amt: 2181 },
];

// Custom Tooltip for Recharts (as seen in the image)
const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-gray-800 bg-opacity-90 p-3 rounded-lg text-white text-xs shadow-lg">
        <p className="font-bold">{`REVENUE`}</p>
        <p className="text-gray-400">{`January 6: $6,900`}</p> {/* Static for now, would be dynamic */}
      </div>
    );
  }
  return null;
};

export default function GrowthBenchmarkChart() {
  return (
    <section className="p-6 rounded-lg shadow-md mb-8">
      <h2 className="text-xl font-semibold mb-4 text-[#3C2C63]">Growth Benchmark</h2>

      <div className="mb-6 text-gray-400 text-sm">Revenue Growth</div>

      <ResponsiveContainer width="100%" height={250}>
        <LineChart
          data={chartData}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#333" />
          <XAxis dataKey="name" stroke="#888" tickLine={false} axisLine={false} />
          <YAxis
            stroke="#888"
            tickFormatter={(value) => `$${value / 1000}k`}
            tickLine={false}
            axisLine={false}
            domain={[0, 300000]} // Adjust based on your data range
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend
            wrapperStyle={{ paddingTop: '20px', outline : '2px', outlineColor: '#E7E7ED' }}
            payload={[
              { value: 'North', type: 'circle', color: '#4CAF50' },
              { value: 'South', type: 'circle', color: '#FFC107' },
              { value: 'East', type: 'circle', color: '#F44336' },
              { value: 'West', type: 'circle', color: '#E91E63' },
              { value: 'Other', type: 'circle', color: '#9C27B0' },
            ]}
          />
          <Line
            type="monotone"
            dataKey="revenue"
            stroke="#A78BFA"
            strokeWidth={2}
            dot={{ r: 4, fill: '#A78BFA', stroke: '#A78BFA', strokeWidth: 1 }}
            activeDot={{ r: 6, fill: '#A78BFA', stroke: '#A78BFA', strokeWidth: 2 }}
          />
        </LineChart>
      </ResponsiveContainer>
           <AdditionalInfoLegend /> 

    </section>
  );
}