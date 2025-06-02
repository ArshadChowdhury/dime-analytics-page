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
    ResponsiveContainer
} from 'recharts';


const breakevenData = [
    { fullDate: '2023-01-05', revenue: 69000, fixed: 40000, variable: 29000 },
    { fullDate: '2023-02-05', revenue: 72000, fixed: 40000, variable: 32000 },
    { fullDate: '2023-03-05', revenue: 78000, fixed: 40000, variable: 38000 },
    { fullDate: '2023-04-05', revenue: 83000, fixed: 40000, variable: 43000 },
    { fullDate: '2023-05-05', revenue: 87000, fixed: 40000, variable: 47000 },
    { fullDate: '2023-06-05', revenue: 95000, fixed: 40000, variable: 55000 },
    { fullDate: '2023-07-05', revenue: 98000, fixed: 40000, variable: 58000 },
    { fullDate: '2023-08-05', revenue: 110000, fixed: 40000, variable: 70000 },
];


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

// Define the interface for the data structure of each metric card
interface MetricCardData {
    title: string;
    value: string; // Use string for values that might contain symbols like $ or %
    description?: string; // Optional description
    isTall?: boolean; // Flag for the card that spans two rows
}




// Reusable MetricCard Component
const MetricCard: React.FC<MetricCardData> = ({ title, value, description, isTall }) => {
    return (
        <div
            className={`rounded-lg border border-[#7940F3] p-4 ${isTall ? 'row-span-2' : ''}`}
        >
            <h3 className="text-sm font-medium uppercase text-gray-500 mb-2">{title}</h3>
            <p className="text-[28px] text-[#3C2C63] mb-2">{value}</p>
            {description && (
                <p className="text-sm text-gray-600 leading-tight">{description}</p>
            )}
        </div>
    );
};

const CustomLegend: React.FC<CustomLegendProps> = ({ payload }) => {
    return (
        <ul className="flex flex-wrap justify-center gap-x-6 gap-y-2 mt-4 rounded py-2 border border-gray-200">
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
    console.log(payload);
    
    if (active && payload && payload.length) {
        const date = new Date(payload[0].payload.fullDate);
        const month = date.toLocaleString('default', { month: 'long' });
        const day = date.getDate();
        const revenueValue = payload[0].value.toLocaleString();
        const variableValue = payload[2].value.toLocaleString();

        return (
            <div style={{ background: '#111', color: '#fff', padding: '8px 12px', borderRadius: 6 }}>
                <div style={{ fontSize: 10, color: '#ccc' }}>{payload[0].name.toUpperCase()}</div>
                <div style={{ fontWeight: 600, fontSize: 12 }}>
                    {month} {day}: ${revenueValue}
                </div>
                <div style={{ fontSize: 10, color: '#ccc' }}>{payload[2].name.toUpperCase()}</div>
                <div style={{ fontWeight: 600, fontSize: 12 }}>
                    {month} {day}: ${variableValue}
                </div>
            </div>
        );
    }
    return null;
};



const KPIBreakEvenChart = () => {
    return (
        <>
            <div className="my-6 rounded-xl border border-gray-200 bg-white shadow-sm p-8">
                <h2 className="text-2xl text-[#3C2C63] mb-10">Breakeven Analysis</h2>
                <ResponsiveContainer width="100%" height={300}>
                    <AreaChart data={breakevenData} margin={{ top: 10, right: 0, left: 0, bottom: 0 }}>
                        <CartesianGrid vertical={false} />
                        <XAxis dataKey="month" stroke="#8884d8" />
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

                        <Area
                            type="monotone"
                            dataKey="revenue"
                            stroke="#EF4444"
                            // fill="#EF4444"
                            fillOpacity={0.05}
                            name="Revenue"
                        />
                        <Area
                            type="monotone"
                            dataKey="fixed"
                            stroke="#8B5CF6"
                            fill="#C1C1CE"
                            fillOpacity={0.05}
                            name="Fixed Costs"
                            dot={false}
                            activeDot={false}
                        />
                        <Area
                            type="monotone"
                            dataKey="variable"
                            stroke="#7C3AED"
                            // fill="#7C3AED"
                            fillOpacity={0.05}
                            name="Variable Costs"
                        />
                    </AreaChart>
                </ResponsiveContainer>

                <div className="rounded-xl border border-gray-200 bg-white mt-10 p-6 shadow-sm">
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
        </>
    )
}

export default KPIBreakEvenChart