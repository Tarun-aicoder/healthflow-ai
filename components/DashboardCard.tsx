import React from 'react';
import { LucideIcon, TrendingUp, TrendingDown } from 'lucide-react';

interface DashboardCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: number;
  trendDirection?: 'up' | 'down';
  subtitle?: string;
}

export default function DashboardCard({ title, value, icon: Icon, trend, trendDirection, subtitle }: DashboardCardProps) {
  return (
    <div className="bg-white border border-zinc-200 rounded-xl p-6 shadow-sm flex flex-col justify-between transition-all hover:shadow-md">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-medium text-zinc-500">{title}</h3>
        <div className="p-2 bg-zinc-50 rounded-lg border border-zinc-100">
          <Icon className="w-5 h-5 text-zinc-700" />
        </div>
      </div>
      <div>
        <div className="text-3xl font-semibold text-zinc-900 tracking-tight">{value}</div>
        {(trend || subtitle) && (
          <div className="flex items-center mt-2 text-sm">
            {trend && trendDirection === 'up' && (
              <span className="flex items-center text-emerald-600 font-medium bg-emerald-50 px-1.5 py-0.5 rounded-md mr-2">
                <TrendingUp className="w-3.5 h-3.5 mr-1" />
                {trend}%
              </span>
            )}
            {trend && trendDirection === 'down' && (
              <span className="flex items-center text-red-600 font-medium bg-red-50 px-1.5 py-0.5 rounded-md mr-2">
                <TrendingDown className="w-3.5 h-3.5 mr-1" />
                {trend}%
              </span>
            )}
            <span className="text-zinc-500">{subtitle}</span>
          </div>
        )}
      </div>
    </div>
  );
}