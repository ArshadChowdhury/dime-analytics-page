"use client"

import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from '@/lib/axios';

// Define the shape of the data for each KPI item
interface KpiDataItem {
  id: string; // Unique ID for key prop
  title: string;
  value: number;
  status: 'good' | 'bad'; // Determines the icon (green check / red cross)
  description: string;
  formula: string;
  median: number;
  rank: string; // e.g., "5/6"
  percentile: number; // 0-100 for the progress bar
}



// Reusable KpiItem Component
const KpiItem: React.FC<{ data: KpiDataItem; isLast: boolean }> = ({ data, isLast }) => {
  const [isCollapsed, setIsCollapsed] = useState(data.status === 'bad' ? false : true); // Expand if bad status by default, collapse if good

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  // Helper for currency formatting
  const formatCurrency = (value: number) => `$${value.toLocaleString()}`;

  return (
    <div className={`relative ${!isLast ? 'border-b border-gray-200' : ''}`}>
      {/* Header */}
      <div
        className="flex items-center justify-between py-4 cursor-pointer select-none"
        onClick={toggleCollapse}
      >
        <div className="flex items-center space-x-2">
          <h3 className="text-lg font-semibold text-[#3C2C63]">
            {data.title}: {formatCurrency(data.value)}
          </h3>
          {data.status === 'bad' ? (
            // Red Cross Icon (simple SVG)
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-red-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          ) : (
            // Green Check Icon (simple SVG)
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-green-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          )}
        </div>
        <button
          className="text-sm text-[#615591] font-medium uppercase tracking-wider flex items-center cursor-pointer"
        >
          {isCollapsed ? 'Expand' : 'Collapse'}
          {/* Chevron icon for expand/collapse */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={`h-5 w-5 ml-1 transform transition-transform duration-200 ${isCollapsed ? 'rotate-0' : 'rotate-180'
              }`}
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>

      {/* Collapsible Content */}
      <div
        className={`${isCollapsed ? 'hidden' : ''} transition-all duration-300 rounded-lg py-6 px-4 border border-gray-200 ${isCollapsed ? 'max-h-0 opacity-0 py-0' : 'max-h-screen opacity-100 py-4'
          }`}
      >
        <p className="text-sm text-gray-700 mb-4">
          {data.description}
        </p>

        <p className="text-sm font-medium text-gray-700 mb-4">
          {data.formula}
        </p>

        {/* Metrics Row */}
        <div className="grid grid-cols-3 gap-4 mb-4">
          <div>
            <p className="text-sm text-gray-500">Median</p>
            <p className="text-lg font-semibold text-gray-800">{formatCurrency(data.median)}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Rank</p>
            <p className="text-lg font-semibold text-gray-800">{data.rank}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Percentile</p>
            <p className="text-lg font-semibold text-gray-800">{data.percentile}%</p>
          </div>
        </div>

        {/* Custom Progress Bar / Slider */}
        <div className="relative w-full h-2 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-[#7940F3] rounded-full"
            style={{ width: `${data.percentile}%` }}
          ></div>
          {/* Slider thumb */}
          <div
            className="absolute -top-1 w-4 h-4 bg-[#7940F3] rounded-full shadow-md border-2 border-white"
            style={{ left: `calc(${data.percentile}% - 8px)` }} /* Adjust -8px for half thumb width */
          ></div>
        </div>
      </div>
    </div>
  );
};

// Main KpiSection Component
const KPIExplanation: React.FC = () => {


  const { data: kpiExplanationData, isLoading, error } = useQuery({
    queryKey: ['kpiexplanation'],
    queryFn: () =>
      axios.get('/kpiExplanationData').then(res => res.data),
  });


  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading breakeven data</p>;

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
      <h2 className="text-lg font-semibold text-[#3C2C63] mb-4">KPIs Explained (Appendix)</h2>
      <div>
        {kpiExplanationData.map((item: any, index: number) => (
          <KpiItem key={item.id} data={item} isLast={index === kpiExplanationData.length - 1} />
        ))}
      </div>
    </div>
  );
};

export default KPIExplanation;