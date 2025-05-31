const tabs = ['Revenue', 'Expense', 'Cash Flow', 'Margin', 'KPI', 'Forecast'];

export default function KPIResultsTable() {
  return (
    <div className="flex justify-between p-6 bg-white rounded-lg">
       <h1 className="text-3xl font-medium text-[#1f1a37]">KPI Results</h1>

      <select className="border border-gray-300 rounded px-3 py-1.5 text-sm text-gray-700">
        <option>Current Week to Previous Week</option>
      </select>
    </div>
  );
}