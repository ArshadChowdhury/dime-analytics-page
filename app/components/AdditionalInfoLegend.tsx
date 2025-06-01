import React from 'react'

const AdditionalInfoLegend = () => {
    return (
        <div className="mt-6 grid grid-cols-4 gap-4 text-sm border-t pt-4">
            <div>
                <p className="text-gray-500">November 2021</p>
                <p className="font-medium">$329,397</p>
            </div>
            <div>
                <p className="text-gray-500">Median</p>
                <p className="font-medium">$373,063</p>
            </div>
            <div>
                <p className="text-gray-500">Rank</p>
                <p className="font-medium">5 / 68</p>
            </div>
            <div>
                <p className="text-gray-500">Percentile</p>
                <p className="font-medium">94%</p>
            </div>
        </div>
    )
}

export default AdditionalInfoLegend