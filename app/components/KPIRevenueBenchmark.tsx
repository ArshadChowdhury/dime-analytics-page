'use client';

import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  ZAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import AdditionalInfoLegend from './AdditionalInfoLegend';

const data = [
  { name: 'Company C', region: 'North', revenue: 130000, x: 50, sizeMetric: 40 },
  { name: 'Company D', region: 'South', revenue: 160000, x: 40, sizeMetric: 50 },
  { name: 'Company E', region: 'South', revenue: 270000, x: 25, sizeMetric: 70 },
  { name: 'Company F', region: 'South', revenue: 15000, x: 90, sizeMetric: 10 },
  { name: 'Company G', region: 'East', revenue: 240000, x: 35, sizeMetric: 55 },
  { name: 'Company H', region: 'East', revenue: 35000, x: 80, sizeMetric: 20 },
  { name: 'Company I', region: 'West', revenue: 320000, x: 20, sizeMetric: 75 },
  { name: 'Company J', region: 'West', revenue: 90000, x: 60, sizeMetric: 35 },
  { name: 'Company K', region: 'Other', revenue: 380000, x: 15, sizeMetric: 85 },
  { name: 'Company L', region: 'Other', revenue: 60000, x: 70, sizeMetric: 25 },
];

const regionColors: Record<string, string> = {
  North: '#6495ED',
  South: '#3CB371',
  East: '#FFD580',
  West: '#FF7F7F',
  Other: '#DC143C',
};

export default function KPIRevenueBenchmark() {
  const groupedData = Object.entries(
    data.reduce((acc, item) => {
      acc[item.region] = acc[item.region] || [];
      acc[item.region].push(item);
      return acc;
    }, {} as Record<string, typeof data>)
  );

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm">
      <h2 className="text-lg font-semibold mb-4">Revenue Benchmark</h2>

      <ResponsiveContainer width="100%" height={400}>
        <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
          <CartesianGrid strokeDasharray="3 3" />

          <XAxis
            type="number"
            dataKey="x"
            name="Percentile Rank"
            tickFormatter={(value) => `${value}th`}
            domain={[0, 100]}
            label={{ value: 'Percentile', position: 'insideBottomRight', offset: -5 }}
          />

          <YAxis
            type="number"
            dataKey="revenue"
            name="Total Revenue"
            tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`}
            domain={[0, 500000]}
            label={{ value: 'Total Revenue', angle: -90, position: 'insideLeft' }}
          />

          <ZAxis
            type="number"
            dataKey="sizeMetric"
            range={[400, 2000]}
            name="Size Metric"
          />

          <Tooltip
            formatter={(value: any, name: string) => {
              console.log(value, name);
              
              if (typeof value === 'number' && name === 'Total Revenue') {
                return `$${value.toLocaleString()}`;
              }
              return value;
            }}
            labelFormatter={(label) => `Percentile: ${label}th`}
          />


          <Legend />

          {groupedData.map(([region, points]) => (
            <Scatter
              key={region}
              name={region}
              data={points}
              fill={regionColors[region]}
            />
          ))}
        </ScatterChart>
      </ResponsiveContainer>


     <AdditionalInfoLegend /> 
    </div>
  );
}
