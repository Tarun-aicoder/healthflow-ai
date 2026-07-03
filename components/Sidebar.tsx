"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, CalendarWarning, ListOrdered, Settings, Activity } from 'lucide-react';

const navigation = [
  { name: 'Dashboard', href: '/', icon: LayoutDashboard },
  { name: 'Appointments', href: '/appointments', icon: CalendarWarning },
  { name: 'Waitlist', href: '/waitlist', icon: ListOrdered },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="w-64 h-screen bg-zinc-950 text-zinc-300 flex flex-col border-r border-zinc-800 flex-shrink-0 sticky top-0">
      <div className="h-16 flex items-center px-6 border-b border-zinc-800">
        <div className="flex items-center gap-2">
          <div className="bg-indigo-500 p-1.5 rounded-md">
            <Activity className="w-5 h-5 text-white" />
          </div>
          <span className="text-white font-semibold tracking-wide">HealthFlow AI</span>
        </div>
      </div>

      <nav className="flex-1 px-4 py-6 space-y-1">
        <div className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-4 px-2">
          Copilot Menu
        </div>
        {navigation.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                isActive
                  ? 'bg-zinc-800 text-white'
                  : 'hover:bg-zinc-800/50 hover:text-white'
              }`}
            >
              <item.icon className={`w-5 h-5 ${isActive ? 'text-indigo-400' : 'text-zinc-400'}`} />
              {item.name}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-zinc-800">
        <button className="flex items-center gap-3 px-3 py-2 w-full rounded-lg text-sm font-medium hover:bg-zinc-800/50 hover:text-white transition-colors">
          <Settings className="w-5 h-5 text-zinc-400" />
          Settings
        </button>
        <div className="mt-4 px-3 flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-zinc-700 flex items-center justify-center text-white font-semibold text-xs">
            SL
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-medium text-white">Dr. Sarah Lee</span>
            <span className="text-xs text-zinc-500">Admin</span>
          </div>
        </div>
      </div>
    </div>
  );
}