'use client';


import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Area,
  AreaChart,
  ResponsiveContainer,
} from 'recharts';


// Define the interface for the data structure of each metric card
interface MetricCardData {
  title: string;
  value: string; // Use string for values that might contain symbols like $ or %
  description?: string; // Optional description
  isTall?: boolean; // Flag for the card that spans two rows
}

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


// Reusable MetricCard Component
const MetricCard: React.FC<MetricCardData>  = ({ title, value, description, isTall }) => {
  return (
    <div
      className={`rounded-lg border border-purple-300 p-4 ${isTall ? 'row-span-2' : ''}`}
    >
      <h3 className="text-xs font-semibold uppercase text-gray-500 mb-2">{title}</h3>
      <p className="text-2xl font-bold text-purple-700 mb-2">{value}</p>
      {description && (
        <p className="text-sm text-gray-600 leading-tight">{description}</p>
      )}
    </div>
  );
};

// Data for the metric cards, directly from your image
const metricData = [
  {
    title: 'TOTAL REVENUE',
    value: '$329,397',
    description: 'A measure of the total amount of money received by the company for goods sold or services provided.',
  },
  {
    title: 'EXPENSES TO REVENUE RATIO',
    value: '79.72%',
    description: 'A measure of how efficiently the business is conducting its operations.',
  },
  {
    title: 'TOTAL COSTS',
    value: '$262,606',
  },
  {
    title: 'BREAKEVEN MARGIN OF SAFETY',
    value: '$103,578',
    description: 'The breakeven safety margin represents the gap between the actual revenue level and the breakeven point. In other words, the amount by which revenue can drop before losses begin to be incurred.',
    isTall: true, // This card will span two rows
  },
  {
    title: 'VARIABLE COSTS',
    value: '$0.36/$1 rev',
  },
  {
    title: 'FIXED COSTS',
    value: '$145,617',
  },
  {
    title: 'BREAKEVEN POINT',
    value: '$225,818',
  },
];


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
  { fullDate: '2023-10-05', displayMonth: 'Oct', revenue: 130000, gross: 94000, operating: 74000 },
  { fullDate: '2023-11-05', displayMonth: 'Nov', revenue: 140000, gross: 100000, operating: 80000 },
  { fullDate: '2023-12-05', displayMonth: 'Dec', revenue: 150000, gross: 106000, operating: 86000 },
];


const breakevenData = [
  { month: 'Jan', revenue: 69000, fixed: 40000, variable: 29000 },
  { month: 'Feb', revenue: 72000, fixed: 40000, variable: 32000 },
  { month: 'Mar', revenue: 78000, fixed: 40000, variable: 38000 },
  { month: 'Apr', revenue: 83000, fixed: 40000, variable: 43000 },
  { month: 'May', revenue: 87000, fixed: 40000, variable: 47000 },
  { month: 'Jun', revenue: 95000, fixed: 40000, variable: 55000 },
  { month: 'Jul', revenue: 98000, fixed: 40000, variable: 58000 },
  { month: 'Aug', revenue: 110000, fixed: 40000, variable: 70000 },
];

const CustomTooltip = ({ active, payload, label }: CustomTooltipProps) => {
  if (active && payload && payload.length) {
    const dataPoint = payload[0].payload; // Access the full data object for the hovered point
    const value = payload[0].value;
    const name = payload[0].name;

    // Use a more robust date formatting if fullDate is a Date object or standard string
    let dateToDisplay = dataPoint.fullDate;
    try {
      const dateObj = new Date(dataPoint.fullDate);
      dateToDisplay = dateObj.toLocaleDateString('en-US', { month: 'long', day: 'numeric' }); // e.g., "January 5"
    } catch (e) {
      // Fallback if fullDate is not a valid date string
      console.error("Invalid date format for tooltip:", dataPoint.fullDate);
    }


    return (
      <div className="rounded-md bg-gray-800 text-white p-2 text-sm shadow-md">
        <p className="font-semibold">{name}</p>
        <p className="text-gray-400">{dateToDisplay}: <span className="text-white">${value.toLocaleString()}</span></p>
      </div>
    );
  }
  return null;
};


export default function KPICharts() {
  return (
    <section className="my-6 space-y-12">
      <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Profitability for All Time</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={profitData} margin={{ top: 5, right: 30, left: 20, bottom: 5, }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E0E0E0" />
            <XAxis dataKey="displayMonth" axisLine={false} tickLine={false} /> {/* Display month on axis */}
            <YAxis
              tickFormatter={(value) => `$${value / 1000}k`}
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#6B7280' }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend wrapperStyle={{ paddingTop: '20px' }} />
            <Line
              type="monotone"
              dataKey="revenue"
              stroke="#6366F1"
              name="Revenue"
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 6, fill: '#6366F1', stroke: '#fff', strokeWidth: 2 }}
            />
            <Line
              type="monotone"
              dataKey="gross"
              stroke="#22C55E"
              name="Gross Profit"
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 6, fill: '#22C55E', stroke: '#fff', strokeWidth: 2 }}
            />
            <Line
              type="monotone"
              dataKey="operating"
              stroke="#EF4444"
              name="Operating Profit"
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 6, fill: '#EF4444', stroke: '#fff', strokeWidth: 2 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Breakeven */}
      <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Breakeven Analysis</h2>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={breakevenData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" stroke="#8884d8" />
            <YAxis
              stroke="#8884d8"
              tickFormatter={(value) => `$${value / 1000}k`}
              axisLine={{ stroke: '#ccc' }}
              tickLine={{ stroke: '#ccc' }}
            />
            <Tooltip formatter={(value: number) => `$${value.toLocaleString()}`} />
            <Legend />

            <Area
              type="monotone"
              dataKey="revenue"
              stroke="#EF4444"
              fill="#EF4444"
              fillOpacity={0.05}
              name="Revenue"
            />
            <Area
              type="monotone"
              dataKey="fixed"
              stroke="#8B5CF6"
              fill="#8B5CF6"
              fillOpacity={0.05}
              name="Fixed Costs"
            />
            <Area
              type="monotone"
              dataKey="variable"
              stroke="#7C3AED"
              fill="#7C3AED"
              fillOpacity={0.05}
              name="Variable Costs"
            />
          </AreaChart>
        </ResponsiveContainer>

        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          {/* Title is not explicitly in the image, but common for such sections */}
          {/* <h2 className="text-lg font-semibold text-gray-800 mb-4">Key Metrics</h2> */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {metricData.map((metric, index) => (
              <MetricCard
                key={index} // Using index as key is okay if the list is static and never reordered
                title={metric.title}
                value={metric.value}
                description={metric.description}
                isTall={metric.isTall}
              />
            ))}
          </div>
        </div>
      </div>

    </section>
  );
}