import KPIHeader from "../components/KPIHeader";
import KPIResultsTable from "../components/KPIResultsTable";

export default function KpiAnalytics() {
  return (
   <div className="bg-white shadow rounded-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">Clients</h1>
        <button className="text-sm text-gray-500 border border-gray-300 rounded px-3 py-1 hover:bg-gray-100">
          ← Back to Dashboard
        </button>
      </div>

      <nav className="flex space-x-4 text-sm border-b border-gray-200 mb-4">
        {['Overview', 'Cash Flow', 'Transactions', 'Audits', 'Documents', 'Analytics'].map((item) => (
          <span
            key={item}
            className={`pb-2 ${
              item === 'Analytics' ? 'border-b-2 border-black font-medium' : 'text-gray-500'
            }`}
          >
            {item}
          </span>
        ))}
      </nav>

      <KPIHeader />
      <KPIResultsTable />
    </div>
  );
}
