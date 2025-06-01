import React from "react";


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
      <div className="flex justify-between my-4">
        <h2 className="text-2xl font-medium text-[#3C2C63]">KPI Results</h2>
        <hr className="self-end h-1 w-[55%] text-[#E9DFFD]" />
        <select className="border dimeFieldGrey rounded px-3 py-1 text-sm font-light text-dimeBodyGrey pr-10">
          <option>Current Week to Previous Week</option>
        </select>
      </div>
      <div>
        <table className="min-w-full text-sm">
          <thead className="text-gray-500 uppercase text-right">
            <tr className="font-medium border-b border-[#5F6073]">
              <th className="py-3 text-sm text-left text-[#1D1D1D]">
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
                <tr className="my-4">
                  <td colSpan={6} className="py-3 text-left font-semibold text-gray-700">
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
        <p className="text-xs text-gray-400 mt-2 px-4 pt-2">* For this metric, a result below target is favorable.</p>
      </div>
    </section>
  );
}