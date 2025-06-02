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
import { useQuery } from '@tanstack/react-query';
import axios from '@/lib/axios';



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

  const { data: growthBenchmarksData, isLoading: isLoadingGrowth, error: errorGrowth } = useQuery({
    queryKey: ['growthBenchmarks'],
    queryFn: () =>
      axios.get('/growthBenchmarksData').then(res => res.data),
  });

  if (isLoadingGrowth) return <p>Loading growth benchmarks...</p>;
  if (errorGrowth) return <p>Error loading growth benchmark data</p>;


  const groupedData = Object.entries(
    growthBenchmarksData.reduce((acc: any, item: any) => {
      acc[item.region] = acc[item.region] || [];
      acc[item.region].push(item);
      return acc;
    }, {} as Record<string, typeof growthBenchmarksData[0][]>)
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

          {groupedData.map(([region, points]: any) => (
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
