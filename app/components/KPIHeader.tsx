const tabs = ['Revenue', 'Expense', 'Cash Flow', 'Margin', 'KPI', 'Forecast'];

export default function KPIHeader() {
  return (
    <div className="flex justify-between items-center mb-6">
      <div className="flex gap-2 flex-wrap">
        {tabs.map((tab) => (
          <button
            key={tab}
            className={`text-sm bg-white px-4 py-1.5 text-[#1D1D1D] rounded cursor-pointer ${
              tab === 'KPI'
                ? 'font-semibold border-2 border-[#7940F3]'
                : 'border border-gray-400 font-light'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>
    </div>
  );
}