
const AdditionalInfoLegend = () => {
    return (
        <div className="mt-6 rounded border border-gray-200 p-4"> {/* Outer container with border and padding */}

            {/* Header Row */}
            <div className="grid grid-cols-4 gap-x-6 text-sm mb-4"> {/* gap-x-6 for horizontal spacing, mb-2 for spacing below headers */}
                <p className="text-gray-500 font-semibold uppercase">November 2021</p> {/* Added font-semibold and uppercase for headers */}
                <p className="text-gray-500 font-semibold uppercase">Median</p>
                <p className="text-gray-500 font-semibold uppercase">Rank</p>
                <p className="text-gray-500 font-semibold uppercase">Percentile</p>
            </div>

            {/* Separator Line */}
            <hr className="border-t border-gray-400 my-2" /> {/* A simple horizontal rule */}

            {/* Data Row */}
            <div className="grid grid-cols-4 gap-x-6 text-sm mt-2"> {/* mt-2 for spacing above data */}
                <p className="font-medium">$328,397</p>
                <p className="font-medium">$373,063</p>
                <p className="font-medium">5 / 68</p>
                <p className="font-medium">94%</p>
            </div>
        </div>
    )
}

export default AdditionalInfoLegend