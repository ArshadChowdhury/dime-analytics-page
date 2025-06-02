'use client';


import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
import React from 'react';


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


const profitData = [
  { fullDate: '2023-01-05', displayMonth: 'Jan', revenue: 68900, gross: 52000, operating: 35000 },
  { fullDate: '2023-02-05', displayMonth: 'Feb', revenue: 72000, gross: 55000, operating: 38000 },
  { fullDate: '2023-03-05', displayMonth: 'Mar', revenue: 78000, gross: 60000, operating: 42000 },
  { fullDate: '2023-04-05', displayMonth: 'Apr', revenue: 86000, gross: 66000, operating: 46000 },
  { fullDate: '2023-05-05', displayMonth: 'May', revenue: 92000, gross: 70000, operating: 50000 },
  { fullDate: '2023-06-05', displayMonth: 'Jun', revenue: 98000, gross: 74000, operating: 54000 },
  { fullDate: '2023-07-05', displayMonth: 'Jul', revenue: 104000, gross: 78000, operating: 58000 },
  { fullDate: '2023-08-05', displayMonth: 'Aug', revenue: 110000, gross: 82000, operating: 62000 },
  { fullDate: '2023-09-05', displayMonth: 'Sep', revenue: 120000, gross: 88000, operating: 68000 },
  { fullDate: '2023-10-05', displayMonth: 'Oct', revenue: 110000, gross: 74000, operating: 54000 },
  { fullDate: '2023-11-05', displayMonth: 'Nov', revenue: 140000, gross: 100000, operating: 80000 },
  { fullDate: '2023-12-05', displayMonth: 'Dec', revenue: 150000, gross: 106000, operating: 86000 },
];



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
    <ul className="flex flex-wrap justify-center gap-x-6 gap-y-2 mt-4 py-2 border border-gray-200">
      {payload?.map((entry, index) => (
        <li key={`item-${index}`} className="flex items-center">
          <div
            className="w-8 h-0.5 mr-2 rounded-full"
            style={{ backgroundColor: entry.color }} // Use the line's color
          />
          <span className="text-sm font-medium text-[#5F6073]"> {/* Change 'text-gray-600' to your desired color */}
            {entry.value}
          </span>
        </li>
      ))}
    </ul>
  );
};


// Custom tooltip
const CustomTooltip = ({ active, payload }: CustomTooltipProps) => {
  if (active && payload && payload.length) {
    const date = new Date(payload[0].payload.fullDate);
    const month = date.toLocaleString('default', { month: 'long' });
    const day = date.getDate();
    const value = payload[0].value.toLocaleString();

    return (
      <div style={{ background: '#111', color: '#fff', padding: '8px 12px', borderRadius: 6 }}>
        <div style={{ fontSize: 10, color: '#ccc' }}>{payload[0].name.toUpperCase()}</div>
        <div style={{ fontWeight: 600, fontSize: 12 }}>
          {month} {day}: ${value}
        </div>
      </div>
    );
  }
  return null;
};




export default function KPIProfitabilityChart() {
  return (
    <section className="my-6 space-y-12">
      <div className="rounded-xl border border-gray-200 bg-white shadow-sm p-8">
        <h2 className="text-2xl text-[#3C2C63] mb-10">Profitability for All Time</h2>
        <ResponsiveContainer width="100%" height={350}>
          <LineChart data={profitData} margin={{ top: 20, right: 0, bottom: 30, left: 0 }}>
            <CartesianGrid stroke="#E5E7EB" vertical={false} />
            <XAxis
              dataKey="displayMonth"
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#4B5563', fontSize: 12 }}
              hide
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#4B5563', fontSize: 12 }}
              domain={[0, 150000]}
              ticks={[0, 50000, 100000, 150000]}
              tickFormatter={(v) => `$${v.toLocaleString()}`}
            />
            <Tooltip content={<CustomTooltip />} />

            <Legend
              verticalAlign="bottom"
              wrapperStyle={{ paddingTop: 16 }}
              content={<CustomLegend />}
            />
            <Line
              type="monotone"
              dataKey="revenue"
              name="Revenue"
              stroke="#3B82F6"
              strokeWidth={2}
              dot={false}
              activeDot={
                ((props: any) => {
                  const { cx, cy } = props;
                  return (
                    <circle
                      cx={cx}
                      cy={cy - 15}
                      r={5}
                      fill="#7940F3"
                      stroke="white"
                      strokeWidth={2}
                    />
                  );
                })
              }
            />
            <Line
              type="monotone"
              dataKey="gross"
              name="Gross Profit"
              stroke="#10B981"
              strokeWidth={2}
              dot={false}
              activeDot={false}

            />
            <Line
              type="monotone"
              dataKey="operating"
              name="Operating Profit"
              stroke="#EF4444"
              strokeWidth={2}
              dot={false}
              activeDot={false}

            />
          </LineChart>
        </ResponsiveContainer>
      </div>

    </section>
  );
}