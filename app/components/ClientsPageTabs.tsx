// "use client"


// import React from 'react'

// const ClientsPageTabs = () => {
//     return (
//         <nav className="w-full flex items-center justify-between text-sm border-b-1 border-[#7940F3] mb-4">
//             <div className="flex items-center gap-16">
//                 {['Overview', 'Cash Flow', 'Transactions', 'Audits', 'Documents', 'Analytics'].map((item) => (
//                     <span
//                         key={item}
//                         className={`tracking-wide text-[#1D1D1D] pb-2 cursor-pointer text-base font-light ${item === 'Analytics' ? 'border-b-4 border-[#7940F3] font-semibold' : 'text-[#1D1D1D]'
//                             }`}
//                     >
//                         {item}
//                     </span>
//                 ))}
//             </div>
//             <div className="flex items-center gap-2">
//                 <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="green" className="size-6">
//                     <path fillRule="evenodd" d="M9 4.5a.75.75 0 0 1 .721.544l.813 2.846a3.75 3.75 0 0 0 2.576 2.576l2.846.813a.75.75 0 0 1 0 1.442l-2.846.813a3.75 3.75 0 0 0-2.576 2.576l-.813 2.846a.75.75 0 0 1-1.442 0l-.813-2.846a3.75 3.75 0 0 0-2.576-2.576l-2.846-.813a.75.75 0 0 1 0-1.442l2.846-.813A3.75 3.75 0 0 0 7.466 7.89l.813-2.846A.75.75 0 0 1 9 4.5ZM18 1.5a.75.75 0 0 1 .728.568l.258 1.036c.236.94.97 1.674 1.91 1.91l1.036.258a.75.75 0 0 1 0 1.456l-1.036.258c-.94.236-1.674.97-1.91 1.91l-.258 1.036a.75.75 0 0 1-1.456 0l-.258-1.036a2.625 2.625 0 0 0-1.91-1.91l-1.036-.258a.75.75 0 0 1 0-1.456l1.036-.258a2.625 2.625 0 0 0 1.91-1.91l.258-1.036A.75.75 0 0 1 18 1.5ZM16.5 15a.75.75 0 0 1 .712.513l.394 1.183c.15.447.5.799.948.948l1.183.395a.75.75 0 0 1 0 1.422l-1.183.395c-.447.15-.799.5-.948.948l-.395 1.183a.75.75 0 0 1-1.422 0l-.395-1.183a1.5 1.5 0 0 0-.948-.948l-1.183-.395a.75.75 0 0 1 0-1.422l1.183-.395c.447-.15.799-.5.948-.948l.395-1.183A.75.75 0 0 1 16.5 15Z" clipRule="evenodd" />
//                 </svg>

//                 AI CFO
//             </div>
//         </nav>
//     )
// }

// export default ClientsPageTabs

"use client";

import { useRouter, useSearchParams } from "next/navigation";

const tabs = ["Overview", "Cash Flow", "Transactions", "Audits", "Documents", "Analytics"];

const ClientsPageTabs = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const activeTab = searchParams.get("tab") || "Overview";

  const handleTabClick = (tab: string) => {
    const params = new URLSearchParams(searchParams);
    if (tab === "Overview") {
      params.delete("tab"); // fallback to default if it's Overview
    } else {
      params.set("tab", tab.toLowerCase().replace(" ", "-"));
    }
    router.push(`/clients?${params.toString()}`);
  };

  return (
    <nav className="w-full flex items-center justify-between text-sm border-b-1 border-[#7940F3] mb-4">
      <div className="flex items-center gap-16">
        {tabs.map((tab) => {
          const normalized = tab.toLowerCase().replace(" ", "-");
          const isActive = (activeTab.toLowerCase() === normalized) || (tab === "Overview" && !searchParams.get("tab"));

          return (
            <span
              key={tab}
              onClick={() => handleTabClick(tab)}
              className={`tracking-wide text-[#1D1D1D] pb-2 cursor-pointer text-base font-light ${
                isActive ? "border-b-4 border-[#7940F3] font-semibold" : ""
              }`}
            >
              {tab}
            </span>
          );
        })}
      </div>

      <div className="flex items-center gap-2">
        {/* Your AI CFO Icon */}
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="green" className="size-6">
          <path
            fillRule="evenodd"
            d="M9 4.5a.75.75 0 0 1 .721.544l.813 2.846a3.75 3.75 0 0 0 2.576 2.576l2.846.813a.75.75 0 0 1 0 1.442l-2.846.813a3.75 3.75 0 0 0-2.576 2.576l-.813 2.846a.75.75 0 0 1-1.442 0l-.813-2.846a3.75 3.75 0 0 0-2.576-2.576l-2.846-.813a.75.75 0 0 1 0-1.442l2.846-.813A3.75 3.75 0 0 0 7.466 7.89l.813-2.846A.75.75 0 0 1 9 4.5ZM18 1.5a.75.75 0 0 1 .728.568l.258 1.036c.236.94.97 1.674 1.91 1.91l1.036.258a.75.75 0 0 1 0 1.456l-1.036.258c-.94.236-1.674.97-1.91 1.91l-.258 1.036a.75.75 0 0 1-1.456 0l-.258-1.036a2.625 2.625 0 0 0-1.91-1.91l-1.036-.258a.75.75 0 0 1 0-1.456l1.036-.258a2.625 2.625 0 0 0 1.91-1.91l.258-1.036A.75.75 0 0 1 18 1.5ZM16.5 15a.75.75 0 0 1 .712.513l.394 1.183c.15.447.5.799.948.948l1.183.395a.75.75 0 0 1 0 1.422l-1.183.395c-.447.15-.799.5-.948.948l-.395 1.183a.75.75 0 0 1-1.422 0l-.395-1.183a1.5 1.5 0 0 0-.948-.948l-1.183-.395a.75.75 0 0 1 0-1.422l1.183-.395c.447-.15.799-.5.948-.948l.395-1.183A.75.75 0 0 1 16.5 15Z"
            clipRule="evenodd"
          />
        </svg>
        AI CFO
      </div>
    </nav>
  );
};

export default ClientsPageTabs;