import React from "react";
import CircleIcon from '@mui/icons-material/Circle';

const tabs = ['Revenue', 'Expense', 'Cash Flow', 'Margin', 'KPI', 'Forecast'];

const sections = [
  {
    title: 'Profitability',
    rows: [
      ['Total Revenue', '$329,397', '$328,739', '+0.2%', '$373,063', 3],
      ['Gross Profit Margin', '58.45%', '61.68%', '-3.23%', '45.88%', 3],
      ['Profitability Ratio', '58.45%', '61.68%', '-3.23%', '45.88%', 3],
      ['Net Profit After Tax Margin', '58.45%', '61.68%', '-3.23%', '45.88%', 3],
      ['Wages as a % of Sales', '58.45%', '61.68%', '-3.23%', '45.88%', 3],
      ['Rent as a % of Sales *', '58.45%', '61.68%', '-3.23%', '45.88%', 3],
    ],
  },
  {
    title: 'Membership',
    rows: [
      ['Number of Members', '2,087', '1,990', '97', '1,272', 3],
      ['Active Member', '2,087', '1,990', '97', '1,272', 3],
      ['Revenue per Active Member', '$329,397', '$328,739', '+0.2%', '$373,063', 3],
      ['Rev / SQM of Gym', '$329,397', '$328,739', '+0.2%', '$373,063', 3],
    ],
  },
  {
    title: 'Cash Flow',
    rows: [
      ['Cash on Hand', '$329,397', '$328,739', '+0.2%', '$373,063', 3],
      ['Net Variable Cash Flow', '58.45%', '61.68%', '-3.23%', '45.88%', 3],
    ],
  },
  {
    title: 'Growth',
    rows: [
      ['Revenue Growth', '58.45%', '61.68%', '-3.23%', '45.88%', 3],
      ['Gross Profit Growth', '58.45%', '61.68%', '-3.23%', '45.88%', 3],
      ['EBIT Growth', '58.45%', '61.68%', '-3.23%', '45.88%', 3],
    ],
  },
];


export default function KPIResultsTable() {
  return (
    <section className="bg-white rounded-lg p-8">
      <div className="flex justify-between mb-10">
        <h2 className="text-2xl text-[#3C2C63]">KPI Results</h2>
        <hr className="self-end h-1 w-[55%] text-[#E9DFFD]" />
        <div className="relative inline-block">
          <select className="border border-[#C1C1CE] rounded pl-4 py-2 text-sm font-light text-[#5F6073] pr-20 appearance-none">
            <option>Current Week to Previous Week</option>
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-700">
            <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.25 4.25a.75.75 0 01-1.06 0L5.21 8.27a.75.75 0 01.02-1.06z" clipRule="evenodd" />
            </svg>
          </div>
        </div>
      </div>
      <div>
        <table className="min-w-full text-sm">
          <thead className="text-gray-500 uppercase text-right">
            <tr className="border-b border-[#5F6073]">
              <th className="py-3 font-medium text-sm text-left text-[#1D1D1D]">
                Parameter
              </th>
              <th className="py-3 text-xs">
                <span className="w-full text-[#3C2C63]"> Result</span>
                <div className="text-sm text-[#1D1D1D]">Nov 2021</div>
              </th>
              <th className="py-3 text-[#1D1D1D]">Oct 2021</th>
              <th className="py-3 text-[#3C2C63]">Trend
                <div className="text-xs text-[#1D1D1D]">VS Oct 2021</div></th>
              <th className="py-3 text-[#1D1D1D]">Median</th>
              <th className="py-3 text-[#3C2C63]">Trend
                <div className="text-xs text-[#1D1D1D]">Percentile</div>
              </th>
            </tr>
          </thead>
          <tbody>
            {sections.map((section) => (
              <React.Fragment key={section.title}>
                <tr className="my-6">
                  <td colSpan={6} className="pt-8 pb-4 text-base text-left font-semibold text-gray-700">
                    {section.title}
                  </td>
                </tr>
                {section.rows.map(([label, nov, oct, trend, median, percentile], i) => (
                  <tr key={i} className="border-t border-gray-100 hover:bg-gray-50">
                    <td className="py-2 text-gray-700 text-left">{label}</td>
                    <td className="py-2 text-gray-800 text-right">{nov}</td>
                    <td className="py-2 text-gray-500 text-right">{oct}</td>
                    <td className={`py-2 text-right ${String(trend).includes('-') ? 'text-red-500' : 'text-green-600'}`}>
                      {trend}
                    </td>
                    <td className="py-2 text-gray-700 text-right">{median}</td>
                    <td className="py-2 flex items-center space-x-1 justify-end"> {/* Added justify-end for right alignment of flex items */}
                      {[1, 2, 3, 4, 5].map((n) => (
                        <div
                          key={n}
                          className={`w-5 h-5 rounded text-xl p-3 flex items-center justify-center ${n === percentile
                            ? 'bg-gray-800 text-white'
                            : 'bg-gray-100 text-gray-600'
                            }`}
                        >
                          {n}
                        </div>
                      ))}
                    </td>
                  </tr>
                ))}
              </React.Fragment>
            ))}
          </tbody>
        </table>
        <p className="flex gap-2 items-center text-xs text-[#5F6073] mt-2 px-4 pt-2"><CircleIcon className="!w-[6px]" /> For this metric, a result below target is favorable.</p>
      </div>
    </section>
  );
}