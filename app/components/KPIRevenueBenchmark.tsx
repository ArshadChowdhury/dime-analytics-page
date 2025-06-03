'use client';

import {
  ScatterChart,
  Scatter,
  Line,
  YAxis,
  ZAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import AdditionalInfoLegend from './AdditionalInfoLegend';
import { useQuery } from '@tanstack/react-query';
import axios from '@/lib/axios';


interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{
    name: string;
    value: number;
    dataKey: string;
    payload: any;
  }>;
  label?: string | number;
}

interface LegendPayloadItem {
  value: string;
  id: string;
  type: string;
  color: string;
  payload: any;
}


interface CustomLegendProps {
  payload?: LegendPayloadItem[];
}

const CustomLegend: React.FC<CustomLegendProps> = ({ payload }) => {
  return (
    <ul className="flex flex-wrap justify-center gap-x-6 gap-y-2 mt-4 rounded py-2 border border-gray-200">
      {payload?.map((entry, index) => (
        <li key={`item-${index}`} className="flex items-center">
          <div
            className="w-4 h-4 mr-2 rounded-full"
            style={{ backgroundColor: entry.color }} // Use the line's color
          />
          <span className="text-sm font-medium text-[#5F6073]">
            {entry.value}
          </span>
        </li>
      ))}
    </ul>
  );
};

const CustomTooltip = ({ active, payload }: CustomTooltipProps) => {
  if (active && payload && payload.length) {

    const dataPoint = payload[0].payload;

    // Now you can access your data properties directly from dataPoint
    const companyName = dataPoint.name;
    const companyID = dataPoint.id;

    return (
      <div style={{ background: '#111', color: '#fff', padding: '8px 12px', borderRadius: 6 }}>
        {/* ID */}
        <div style={{ fontSize: 10, color: '#ccc', marginTop: '8px' }}>#{companyID}</div>
        {/* Company Name */}
        <div style={{ fontWeight: 600, fontSize: 12 }}>
          {companyName}
        </div>
      </div>
    );
  }
};

const regionColors: Record<string, string> = {
  North: '#6495ED',
  South: '#3CB371',
  East: '#FFD580',
  West: '#FF7F7F',
  Other: '#DC143C',
};

export default function KPIRevenueBenchmark() {

  const { data: revenueBenchmarksData, isLoading: isLoadingRevenue, error: errorRevenue } = useQuery({
    queryKey: ['revenueBenchmarks'],
    queryFn: () =>
      axios.get('/revenueBenchmarksData').then(res => res.data),
  });

  if (isLoadingRevenue) return <p>Loading revenue benchmarks...</p>;

  if (errorRevenue) return <p>Error loading revenue benchmark data</p>;



  const groupedData = Object.entries(
    revenueBenchmarksData.reduce((acc: any, item: any) => {
      acc[item.region] = acc[item.region] || [];
      acc[item.region].push(item);
      return acc;
    }, {} as Record<string, typeof revenueBenchmarksData>)
  );

  return (
    <div className="my-6 rounded-xl border border-gray-200 bg-white shadow-sm p-8">
      <h2 className="text-2xl text-[#3C2C63] mb-10">Revenue Benchmark</h2>
      <div className="mb-6 text-gray-400 text-sm">Total Revenue</div>

      <ResponsiveContainer width="100%" height={400}>
        <ScatterChart margin={{ top: 20, right: 0, bottom: 20, left: 0 }}>
          <CartesianGrid />
          <YAxis
            type="number"
            dataKey="revenue"
            name="Total Revenue"
            ticks={[0, 50000, 200000, 300000]}
            tickFormatter={(value) => `$${value}`}
            domain={[0, 400000]}
            tick={{ fill: '#4B5563', fontSize: 12 }}

          />
          <YAxis yAxisId="visitors" orientation="right" stroke="#82ca9d" />


          {/* Line for Sales, linked to the 'sales' Y-axis */}
          <Line yAxisId="sales" type="monotone" dataKey="sales" stroke="#8884d8" activeDot={{ r: 8 }} />

          {/* Line for Visitors, linked to the 'visitors' Y-axis */}
          <Line yAxisId="visitors" type="monotone" dataKey="visitors" stroke="#82ca9d" activeDot={{ r: 8 }} />
          <ZAxis
            type="number"
            dataKey="sizeMetric"
            range={[400, 2000]}
            name="Size Metric"
          />

          <Tooltip
            content={<CustomTooltip />}
          />


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
    </div>
  );
}
