"use client"

import Image from "next/image"
import Link from "next/link"
import { usePathname } from 'next/navigation';


import DashboardIcon from '@mui/icons-material/Dashboard';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import ForumIcon from '@mui/icons-material/Forum';
import TaskIcon from '@mui/icons-material/Task';
import RequestQuoteIcon from '@mui/icons-material/RequestQuote';
import BusinessIcon from '@mui/icons-material/Business';
import InboxIcon from '@mui/icons-material/Inbox';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import LockOutlineIcon from '@mui/icons-material/LockOutline';
import RedeemIcon from '@mui/icons-material/Redeem';
import SettingsIcon from '@mui/icons-material/Settings';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

// Define the structure for your navigation items
interface NavItems {
    name: string;
    iconSrc: React.ReactElement; // Now expecting a React element (MUI Icon)
    url: string;
}

// Your updated navItems array
const navItems: NavItems[] = [
    { name: 'Dashboard', iconSrc: <DashboardIcon />, url: '/dashboard' },
    { name: 'Launchpad', iconSrc: <RocketLaunchIcon />, url: '#' },
    { name: 'Payments', iconSrc: <CreditCardIcon />, url: '#' },
    { name: 'Messages', iconSrc: <ForumIcon />, url: '#' },
    { name: 'Tasks', iconSrc: <TaskIcon />, url: '#' },
    { name: 'Balances', iconSrc: <RequestQuoteIcon />, url: '#' },
    { name: 'Clients', iconSrc: <BusinessIcon />, url: '/clients' },
    { name: 'Inbox', iconSrc: <InboxIcon />, url: '#' },
    { name: 'Tax Strategies', iconSrc: <ReceiptLongIcon />, url: '#' },
    { name: 'Unlock Navbar', iconSrc: <LockOutlineIcon />, url: '#' },
    { name: 'Launchpad', iconSrc: <RedeemIcon />, url: '#' },
    { name: 'Settings', iconSrc: <SettingsIcon />, url: '#' },
    { name: 'User Profile', iconSrc: <AccountCircleIcon />, url: '#' },
];


const Sidebar = () => {

    const pathname = usePathname();

    return (
        <aside className="flex flex-col justify-between w-52 text-white px-4 py-6" >
            <div>
                <div className="font-bold py-2 rounded-lg text-lg mb-6">
                    <Image src="dime-logo.svg" alt="Dime logo" height="24" width="90" />
                </div>
                <nav className="flex flex-col gap-3">
                    {
                        navItems.slice(0, 9).map((item) => (
                            <Link
                                href={item.url}
                                key={item.name}
                                className={"p-2 flex gap-2 items-center rounded cursor-pointer hover:bg-violet-900"}
                            >
                                <div className={`text-sm ${pathname === item.url ? 'text-[#FFC979]' : 'text-[#C1C1CE]'}`}>
                                    {item.iconSrc}
                                </div>
                                <span className={`text-sm ${pathname === item.url ? 'text-[#FFC979]' : 'text-[#C1C1CE]'}`}>{item.name}</span>
                            </Link>
                        ))}
                </nav>
            </div>
            <div>

                <nav className="flex flex-col gap-3">
                    {
                        navItems.slice(9).map((item, index) => (
                            <Link
                                href={item.url}
                                key={index}
                                className={"p-2 flex gap-2 items-center rounded cursor-pointer hover:bg-violet-900"}
                            >
                                <div className={`text-sm ${pathname === item.url ? 'text-[#FFC979]' : 'text-[#C1C1CE]'}`}>
                                    {item.iconSrc}
                                </div>
                                <span className={`text-sm ${pathname === item.url ? 'text-[#FFC979]' : 'text-[#C1C1CE]'}`}>{item.name}</span>
                            </Link>
                        ))}
                </nav>
            </div>
        </aside >

    )
}

export default Sidebar