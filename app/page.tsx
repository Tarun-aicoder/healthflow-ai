import React from 'react';
import DashboardCard from '@/components/DashboardCard';
import { Calendar, AlertCircle, DollarSign, Stethoscope, ArrowRight, Zap, CheckCircle2, Activity } from 'lucide-react';
import { kpis, insights, utilization, recentActions } from '@/lib/dummyData';

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-black px-4 py-6 sm:px-6 sm:py-8 md:px-8 md:py-10 w-full">
      <div className="max-w-7xl mx-auto">

        {/* Header Section */}
        <header className="mb-10 sm:mb-12 md:mb-14 card-animate">
          <div className="flex items-baseline gap-3 sm:gap-4 mb-3 sm:mb-4">
            <div className="flex items-center gap-2 sm:gap-3">
              <Activity className="w-7 sm:w-8 md:w-9 h-7 sm:h-8 md:h-9 text-lime-400 flex-shrink-0" />
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight">Operations Hub</h1>
            </div>
          </div>
          <p className="text-gray-400 text-sm sm:text-base md:text-lg leading-relaxed">AI-powered intelligence for healthcare operations</p>
        </header>

        {/* KPI Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 md:gap-6 mb-10 sm:mb-12 md:mb-14" style={{ animation: 'fadeInUp 0.6s ease-out' }}>
          <DashboardCard
            title="Total Appointments"
            value={kpis.appointments}
            icon={Calendar}
            trend={4.2}
            trendDirection="up"
            subtitle="vs last week"
          />
          <DashboardCard
            title="Predicted No-Shows"
            value={kpis.predictedNoShows}
            icon={AlertCircle}
            trend={12}
            trendDirection="down"
            subtitle="vs last week"
          />
          <DashboardCard
            title="Revenue at Risk"
            value={`$${kpis.revenueRisk.toLocaleString()}`}
            icon={DollarSign}
            subtitle="Requires action"
          />
          <DashboardCard
            title="Slots Recovered"
            value={kpis.recoveredSlots}
            icon={Stethoscope}
            trend={18}
            trendDirection="up"
            subtitle="This week"
          />
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-7 md:gap-8">
          {/* AI Insights Card */}
          <div className="lg:col-span-2 card-animate" style={{ animationDelay: '0.1s' }}>
            <div className="glow-accent bg-zinc-950 border border-gray-800 rounded-2xl overflow-hidden shadow-xl">
              <div className="border-b border-gray-800 px-5 sm:px-7 md:px-8 py-5 sm:py-6 md:py-7 flex items-center justify-between gap-3">
                <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-white flex items-center gap-3 sm:gap-4 min-w-0">
                  <div className="p-2.5 sm:p-3 bg-lime-500/20 rounded-lg flex-shrink-0">
                    <Zap className="w-5 sm:w-6 h-5 sm:h-6 text-lime-400" />
                  </div>
                  <span className="truncate">AI Insights</span>
                </h2>
                <button className="text-sm sm:text-base font-semibold text-lime-400 hover:text-lime-300 transition-colors flex-shrink-0 hover:scale-105">View All</button>
              </div>
              <div className="divide-y divide-gray-800">
                {insights.map((insight, idx) => (
                  <div key={insight.id} className="px-5 sm:px-7 md:px-8 py-5 sm:py-6 md:py-8 hover:bg-gray-900/50 transition-colors duration-200 cursor-pointer group" style={{ animation: `slideInLeft 0.5s ease-out ${0.15 + idx * 0.1}s both` }}>
                    <div className="flex items-start gap-4 sm:gap-5">
                      <div className={`mt-1 p-3 sm:p-3.5 rounded-lg sm:rounded-xl flex-shrink-0 group-hover:scale-110 transition-transform ${
                        insight.type === 'warning' ? 'bg-red-500/20 text-red-400' :
                        insight.type === 'opportunity' ? 'bg-yellow-500/20 text-yellow-400' :
                        'bg-emerald-500/20 text-emerald-400'
                      }`}>
                        {insight.type === 'warning' && <AlertCircle className="w-5 sm:w-6 h-5 sm:h-6" />}
                        {insight.type === 'opportunity' && <Calendar className="w-5 sm:w-6 h-5 sm:h-6" />}
                        {insight.type === 'success' && <CheckCircle2 className="w-5 sm:w-6 h-5 sm:h-6" />}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-lime-400 transition-colors">{insight.title}</h3>
                        <p className="text-gray-400 text-sm sm:text-base mt-2 sm:mt-3 leading-relaxed">{insight.description}</p>
                      </div>
                      <button className="flex items-center gap-1.5 text-sm sm:text-base font-semibold text-lime-400 hover:text-lime-300 transition-colors flex-shrink-0 group-hover:translate-x-1 transition-transform">
                        <span className="hidden sm:inline">Action</span> <ArrowRight className="w-4 sm:w-5 h-4 sm:h-5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6 sm:space-y-7 md:space-y-8">
            {/* Department Utilization */}
            <div className="glow-accent bg-zinc-950 border border-gray-800 rounded-2xl p-5 sm:p-7 md:p-8 shadow-xl card-animate" style={{ animationDelay: '0.2s' }}>
              <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-7 sm:mb-9 md:mb-10">Department Utilization</h2>
              <div className="space-y-6 sm:space-y-8">
                {utilization.map((dept, idx) => {
                  const percentage = Math.round((dept.current / dept.capacity) * 100);
                  const isHigh = percentage >= 90;
                  return (
                    <div key={dept.department} style={{ animation: `slideInLeft 0.5s ease-out ${0.25 + idx * 0.08}s both` }}>
                      <div className="flex justify-between items-end gap-3 mb-3 sm:mb-4 group">
                        <span className="text-sm sm:text-base font-semibold text-gray-200 truncate">{dept.department}</span>
                        <span className={`text-lg sm:text-xl font-bold flex-shrink-0 transition-colors ${isHigh ? 'text-red-400' : 'text-lime-400'}`}>{percentage}%</span>
                      </div>
                      <div className="w-full bg-gray-900 rounded-full h-3 sm:h-3.5 overflow-hidden group-hover:bg-gray-800 transition-colors">
                        <div
                          className={`h-full rounded-full transition-all duration-700 ${isHigh ? 'bg-gradient-to-r from-red-500 to-red-600' : 'bg-gradient-to-r from-lime-400 to-lime-500'}`}
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Recent Actions */}
            <div className="glow-accent bg-zinc-950 border border-gray-800 rounded-2xl p-5 sm:p-7 md:p-8 shadow-xl card-animate" style={{ animationDelay: '0.3s' }}>
              <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-6 sm:mb-8">Recent Activity</h2>
              <div className="space-y-5 sm:space-y-6">
                {recentActions.map((action, idx) => (
                  <div key={action.id} className="flex flex-col gap-2 sm:gap-2.5 pb-5 sm:pb-6 border-b border-gray-800 last:border-b-0 last:pb-0 hover:border-lime-500/30 transition-colors cursor-pointer group" style={{ animation: `slideInLeft 0.5s ease-out ${0.35 + idx * 0.08}s both` }}>
                    <p className="text-sm sm:text-base font-medium text-gray-100 group-hover:text-lime-400 transition-colors">{action.action}</p>
                    <div className="flex items-center text-xs sm:text-sm text-gray-500 gap-2">
                      <span>{action.time}</span>
                      <span className="text-gray-700">•</span>
                      <span>{action.user}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
