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
    <section className="bg-white rounded-lg">
    <div className="flex justify-between p-6">
       <h2 className="text-[40px] font-medium text-red-200 purpleTitle">KPI Results</h2>
       <hr className="self-end h-1 w-[55%] dimeFaintPink" />
      <select className="border dimeFieldGrey rounded px-3 py-1 text-sm font-light text-dimeBodyGrey">
        <option>Current Week to Previous Week</option>
      </select>
    </div>
    <div className="overflow-x-auto border-t border-gray-200">
      <table className="min-w-full text-sm text-left">
        <thead className="text-gray-500 uppercase">
          <tr>
            <th className="py-3 px-4 font-medium">Parameter</th>
            <th className="py-3 px-4 font-medium text-center" colSpan={2}>
              Result
              <div className="text-xs font-normal text-gray-400">Nov 2021 / Oct 2021</div>
            </th>
            <th className="py-3 px-4 font-medium">Trend vs Oct 2021</th>
            <th className="py-3 px-4 font-medium">Median</th>
            <th className="py-3 px-4 font-medium">Trend Percentile</th>
          </tr>
        </thead>
        <tbody>
          {sections.map((section) => (
            <React.Fragment key={section.title}>
              <tr>
                <td colSpan={6} className="py-3 px-4 font-semibold text-gray-700 border-t border-gray-200">
                  {section.title}
                </td>
              </tr>
              {section.rows.map(([label, nov, oct, trend, median, percentile], i) => (
                <tr key={i} className="border-t border-gray-100 hover:bg-gray-50">
                  <td className="py-2 px-4 text-gray-700">{label}</td>
                  <td className="py-2 px-4 text-gray-800">{nov}</td>
                  <td className="py-2 px-4 text-gray-500">{oct}</td>
                  <td className={`py-2 px-4 ${String(trend).includes('-') ? 'text-red-500' : 'text-green-600'}`}>
                    {trend}
                  </td>
                  <td className="py-2 px-4 text-gray-700">{median}</td>
                  <td className="py-2 px-4 flex items-center space-x-1">
                    {[1, 2, 3, 4, 5].map((n) => (
                      <div
                        key={n}
                        className={`w-5 h-5 rounded text-xs flex items-center justify-center border ${
                          n === percentile
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