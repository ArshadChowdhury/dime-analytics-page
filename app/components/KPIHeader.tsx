const tabs = ['Revenue', 'Expense', 'Cash Flow', 'Margin', 'KPI', 'Forecast'];

export default function KPIHeader() {
  return (
    <div className="flex justify-between items-center mb-6">
      <div className="flex gap-2 flex-wrap">
        {tabs.map((tab) => (
          <button
            key={tab}
            className={`text-xs px-4 py-1.5 rounded border ${
              tab === 'KPI'
                ? 'bg-indigo-100 text-indigo-700 border-indigo-300'
                : 'bg-white text-gray-600 border-gray-300'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>
    </div>
  );
}