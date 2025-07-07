'use client';

import { ArrowUpRight, Target,  ArrowDownRight, ShoppingCart, Eye, DollarSign, Box, Users } from 'lucide-react';

const stats = [
  {
    title: 'Total Booking',
    value: '300',
    icon: <ShoppingCart className="w-6 h-6 text-green-500" />,
    change: '+0.43%',
    changeColor: 'text-green-500',
    arrow: <ArrowUpRight className="w-4 h-4 text-green-500" />,
  },
  {
    title: 'Total Profit',
    value: 'Rp 420.000.000,00',
    icon: <DollarSign className="w-6 h-6 text-orange-400" />,
    change: '+3249,19%',
    changeColor: 'text-green-500',
    arrow: <ArrowUpRight className="w-4 h-4 text-green-500" />,
  },
  {
    title: 'Total Meja',
    value: '4',
    icon: <Target className="w-6 h-6 text-purple-500" />,
    changeColor: 'text-green-500',
    arrow: <ArrowUpRight className="w-4 h-4 text-green-500" />,
  },
];

export default function HighlightDashboard() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4 bg-gray-900 min-h-screen">
      {stats.map((stat, index) => (
        <div key={index} className="flex flex-col items-start justify-between bg-[#0d1b2a] rounded-xl p-6 shadow-md">
          <div className="mb-4">{stat.icon}</div>
          <div className="text-2xl font-bold text-white">{stat.value}</div>
          <div className="text-sm text-gray-400">{stat.title}</div>
          <div className="flex items-center mt-2">
            <span className={`${stat.changeColor} text-xs mr-1`}>{stat.change}</span>
            {stat.arrow}
          </div>
        </div>
      ))}
    </div>
  );
}
