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

const data = [
  { id: 1, name: 'Company C', region: 'North', revenue: 130000, x: 50, sizeMetric: 40 },
  { id: 2, name: 'Company D', region: 'South', revenue: 160000, x: 40, sizeMetric: 50 },
  { id: 3, name: 'Company E', region: 'South', revenue: 270000, x: 25, sizeMetric: 70 },
  { id: 4, name: 'Company F', region: 'South', revenue: 15000, x: 90, sizeMetric: 10 },
  { id: 5, name: 'Company G', region: 'East', revenue: 240000, x: 35, sizeMetric: 55 },
  { id: 6, name: 'Company H', region: 'East', revenue: 35000, x: 80, sizeMetric: 20 },
  { id: 7, name: 'Company I', region: 'West', revenue: 320000, x: 20, sizeMetric: 75 },
  { id: 8, name: 'Company J', region: 'West', revenue: 90000, x: 60, sizeMetric: 35 },
  { id: 9, name: 'Company K', region: 'Other', revenue: 380000, x: 15, sizeMetric: 85 },
  { id: 10, name: 'Company L', region: 'Other', revenue: 60000, x: 70, sizeMetric: 25 },
];

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
  const groupedData = Object.entries(
    data.reduce((acc, item) => {
      acc[item.region] = acc[item.region] || [];
      acc[item.region].push(item);
      return acc;
    }, {} as Record<string, typeof data>)
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
