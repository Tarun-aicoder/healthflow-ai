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
  const isPositiveTrend = trendDirection === 'up';

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-7 shadow-xl flex flex-col justify-between transition-all hover:border-slate-700 hover:shadow-2xl hover:bg-slate-800/50">
      <div className="flex items-center justify-between mb-5">
        <h3 className="text-sm font-semibold text-slate-400 tracking-wide uppercase">{title}</h3>
        <div className="p-3 bg-slate-800/50 rounded-xl border border-slate-700">
          <Icon className="w-5 h-5 text-blue-400" />
        </div>
      </div>
      <div>
        <div className="text-4xl font-bold text-white tracking-tight mb-3">{value}</div>
        {(trend || subtitle) && (
          <div className="flex items-center gap-2 text-sm">
            {trend && (
              <span className={`flex items-center gap-1 font-bold px-3 py-1.5 rounded-lg ${
                isPositiveTrend
                  ? 'bg-emerald-500/20 text-emerald-300'
                  : 'bg-red-500/20 text-red-300'
              }`}>
                {isPositiveTrend ? (
                  <TrendingUp className="w-4 h-4" />
                ) : (
                  <TrendingDown className="w-4 h-4" />
                )}
                {trend}%
              </span>
            )}
            {subtitle && <span className="text-slate-500 font-medium">{subtitle}</span>}
          </div>
        )}
      </div>
    </div>
  );
}
