'use client';

import {
  ResponsiveContainer,
  ScatterChart,
  Scatter,
  YAxis,
  Tooltip,
  Legend,
  XAxis,
  ZAxis,
} from 'recharts';
import AdditionalInfoLegend from './AdditionalInfoLegend';

const data = [
  { id: 1, name: 'Company C', region: 'North', revenue: 130000, rank: 30, xPosition: 1 },
  { id: 2, name: 'Company D', region: 'South', revenue: 160000, rank: 40, xPosition: 2 },
  { id: 3, name: 'Company E', region: 'South', revenue: 270000, rank: 25, xPosition: 3 },
  { id: 4, name: 'Company F', region: 'South', revenue: 15000, rank: 90, xPosition: 4 },
  { id: 5, name: 'Foundry Fitness', region: 'East', revenue: 200000, rank: 50, xPosition: 5 },
  { id: 6, name: 'Company H', region: 'East', revenue: 35000, rank: 80, xPosition: 6 },
  { id: 7, name: 'Company I', region: 'West', revenue: 320000, rank: 20, xPosition: 7 },
  { id: 8, name: 'Company J', region: 'West', revenue: 90000, rank: 60, xPosition: 8 },
  { id: 9, name: 'Company K', region: 'Other', revenue: 380000, rank: 15, xPosition: 9 },
  { id: 10, name: 'Company L', region: 'Other', revenue: 60000, rank: 70, xPosition: 10 },
];

const regionColors: Record<string, string> = {
  North: '#6495ED',
  South: '#3CB371',
  East: '#FFD580',
  West: '#FF7F7F',
  Other: '#DC143C',
};

interface CustomTooltipProps {
  active?: boolean;
  payload?: any[];
}

const CustomTooltip = ({ active, payload }: CustomTooltipProps) => {
  if (active && payload?.length) {
    const { name, revenue, rank } = payload[0].payload;
    return (
      <div className="bg-black text-white text-xs rounded px-3 py-2 shadow-lg">
        <p className="font-bold">#{rank}</p>
        <p>{name} - {(revenue / 1000000).toFixed(1)}%</p>
      </div>
    );
  }
  return null;
};

const CustomLegend = ({ payload }: any) => {
  return (
    <ul className="flex flex-wrap justify-center gap-x-6 gap-y-2 mt-4 rounded py-2 border border-gray-200">
      {payload?.map((entry: any, index: number) => (
        <li key={`item-${index}`} className="flex items-center">
          <div
            className="w-4 h-4 mr-2 rounded-full"
            style={{ backgroundColor: entry.color }}
          />
          <span className="text-sm font-medium text-[#5F6073]">
            {entry.value}
          </span>
        </li>
      ))}
    </ul>
  );
};

export default function KPIGrowthBenchmarkChart() {
  const groupedData = Object.entries(
    data.reduce((acc, item) => {
      acc[item.region] = acc[item.region] || [];
      acc[item.region].push(item);
      return acc;
    }, {} as Record<string, typeof data[0][]>)
  );

  return (
    <section className="my-6 rounded-xl border border-gray-200 bg-white shadow-sm p-8">
      <h2 className="text-xl font-semibold mb-4 text-[#3C2C63]">Growth Benchmark</h2>
      <div className="mb-6 text-gray-400 text-sm">Revenue Growth</div>

      <ResponsiveContainer width="100%" height={300}>

        <ScatterChart>
          <XAxis dataKey="xPosition" type="number" hide />
          <YAxis
            dataKey="revenue"
            type="number"
            domain={[0, 400000]}
            ticks={[0, 50000, 200000, 300000]}
            tickFormatter={(value) => `$${value.toLocaleString()}`}
            tickLine={false}
            axisLine={false}
            tick={{ fill: '#4B5563', fontSize: 12 }}
          />

          <ZAxis dataKey="rank" range={[450, 1450]} />
          <Tooltip content={<CustomTooltip />} />
          <Legend
            verticalAlign="bottom"
            wrapperStyle={{ paddingTop: 16 }}
            content={<CustomLegend />}
          />

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
    </section>
  );
}
