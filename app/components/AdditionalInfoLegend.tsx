
"use client";

import { useQuery } from "@tanstack/react-query";
import axios from "@/lib/axios";


const AdditionalInfoLegend = () => {

    const { data: legendData, isLoading, isError } = useQuery({
        queryKey: ['legendData'],
        queryFn: () =>
            axios.get('/legendData').then(res => res.data),
    });

    if (isLoading) return <p>Loading revenue benchmarks...</p>;

    if (isError) return <p>Error loading legend data</p>;

    const { header, data: legend } = legendData;

    return (
        <div className="mt-6 rounded border border-gray-200 p-4">
            {/* Header Row */}
            <div className="grid grid-cols-4 gap-x-6 text-sm mb-4">
                <p className="text-gray-500 font-semibold uppercase">{header}</p>
                <p className="text-gray-500 font-semibold uppercase">Median</p>
                <p className="text-gray-500 font-semibold uppercase">Rank</p>
                <p className="text-gray-500 font-semibold uppercase">Percentile</p>
            </div>

            {/* Separator */}
            <hr className="border-t border-gray-400 my-2" />

            {/* Data Row */}
            <div className="grid grid-cols-4 gap-x-6 text-sm mt-2">
                <p className="font-medium">{legend.value}</p>
                <p className="font-medium">{legend.median}</p>
                <p className="font-medium">{legend.rank}</p>
                <p className="font-medium">{legend.percentile}</p>
            </div>
        </div>
    );
}

export default AdditionalInfoLegend