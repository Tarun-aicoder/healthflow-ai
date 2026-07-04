import React from 'react';
import DashboardCard from '@/components/DashboardCard';
import { Calendar, AlertCircle, DollarSign, Stethoscope, ArrowRight, Zap, CheckCircle2, Activity } from 'lucide-react';
import { kpis, insights, utilization, recentActions } from '@/lib/dummyData';

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-black p-4 sm:p-6 md:p-8 w-full">
      <div className="max-w-7xl mx-auto">

        {/* Header Section */}
        <header className="mb-8 sm:mb-10 card-animate">
          <div className="flex items-baseline gap-2 sm:gap-3 mb-2">
            <div className="flex items-center gap-1.5 sm:gap-2">
              <Activity className="w-6 sm:w-8 h-6 sm:h-8 text-lime-400 flex-shrink-0" />
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white">Operations Hub</h1>
            </div>
          </div>
          <p className="text-gray-400 text-sm sm:text-base md:text-lg">AI-powered intelligence for healthcare operations</p>
        </header>

        {/* KPI Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-5 mb-8 sm:mb-10" style={{ animation: 'fadeInUp 0.6s ease-out' }}>
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
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
          {/* AI Insights Card */}
          <div className="lg:col-span-2 card-animate" style={{ animationDelay: '0.1s' }}>
            <div className="glow-accent bg-zinc-950 border border-gray-800 rounded-2xl overflow-hidden shadow-xl">
              <div className="border-b border-gray-800 px-4 sm:px-6 md:px-8 py-4 sm:py-5 md:py-6 flex items-center justify-between gap-2">
                <h2 className="text-base sm:text-lg md:text-xl font-bold text-white flex items-center gap-2 sm:gap-3 min-w-0">
                  <div className="p-2 bg-lime-500/20 rounded-lg flex-shrink-0">
                    <Zap className="w-4 sm:w-5 h-4 sm:h-5 text-lime-400" />
                  </div>
                  <span className="truncate">AI Insights</span>
                </h2>
                <button className="text-xs sm:text-sm font-semibold text-lime-400 hover:text-lime-300 transition-colors flex-shrink-0 hover:scale-105">View All</button>
              </div>
              <div className="divide-y divide-gray-800">
                {insights.map((insight, idx) => (
                  <div key={insight.id} className="p-4 sm:p-6 md:p-8 hover:bg-gray-900/50 transition-colors duration-200 cursor-pointer group" style={{ animation: `slideInLeft 0.5s ease-out ${0.15 + idx * 0.1}s both` }}>
                    <div className="flex items-start gap-3 sm:gap-4">
                      <div className={`mt-0.5 p-2 sm:p-3 rounded-lg sm:rounded-xl flex-shrink-0 group-hover:scale-110 transition-transform ${
                        insight.type === 'warning' ? 'bg-red-500/20 text-red-400' :
                        insight.type === 'opportunity' ? 'bg-yellow-500/20 text-yellow-400' :
                        'bg-emerald-500/20 text-emerald-400'
                      }`}>
                        {insight.type === 'warning' && <AlertCircle className="w-4 sm:w-5 h-4 sm:h-5" />}
                        {insight.type === 'opportunity' && <Calendar className="w-4 sm:w-5 h-4 sm:h-5" />}
                        {insight.type === 'success' && <CheckCircle2 className="w-4 sm:w-5 h-4 sm:h-5" />}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-sm sm:text-base font-bold text-white group-hover:text-lime-400 transition-colors">{insight.title}</h3>
                        <p className="text-gray-400 text-xs sm:text-sm mt-1 sm:mt-2 leading-relaxed">{insight.description}</p>
                      </div>
                      <button className="flex items-center gap-1 text-xs sm:text-sm font-semibold text-lime-400 hover:text-lime-300 transition-colors flex-shrink-0 group-hover:translate-x-1 transition-transform">
                        <span className="hidden sm:inline">Action</span> <ArrowRight className="w-3.5 sm:w-4 h-3.5 sm:h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-4 sm:space-y-6">
            {/* Department Utilization */}
            <div className="glow-accent bg-zinc-950 border border-gray-800 rounded-2xl p-4 sm:p-6 md:p-8 shadow-xl card-animate" style={{ animationDelay: '0.2s' }}>
              <h2 className="text-base sm:text-lg md:text-xl font-bold text-white mb-5 sm:mb-8">Department Utilization</h2>
              <div className="space-y-5 sm:space-y-7">
                {utilization.map((dept, idx) => {
                  const percentage = Math.round((dept.current / dept.capacity) * 100);
                  const isHigh = percentage >= 90;
                  return (
                    <div key={dept.department} style={{ animation: `slideInLeft 0.5s ease-out ${0.25 + idx * 0.08}s both` }}>
                      <div className="flex justify-between items-end gap-2 mb-2 sm:mb-3 group">
                        <span className="text-xs sm:text-sm font-semibold text-gray-200 truncate">{dept.department}</span>
                        <span className={`text-base sm:text-lg font-bold flex-shrink-0 transition-colors ${isHigh ? 'text-red-400' : 'text-lime-400'}`}>{percentage}%</span>
                      </div>
                      <div className="w-full bg-gray-900 rounded-full h-2.5 sm:h-3 overflow-hidden group-hover:bg-gray-800 transition-colors">
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
            <div className="glow-accent bg-zinc-950 border border-gray-800 rounded-2xl p-4 sm:p-6 md:p-8 shadow-xl card-animate" style={{ animationDelay: '0.3s' }}>
              <h2 className="text-base sm:text-lg md:text-xl font-bold text-white mb-4 sm:mb-6">Recent Activity</h2>
              <div className="space-y-4 sm:space-y-5">
                {recentActions.map((action, idx) => (
                  <div key={action.id} className="flex flex-col gap-1.5 sm:gap-2 pb-4 sm:pb-5 border-b border-gray-800 last:border-b-0 last:pb-0 hover:border-lime-500/30 transition-colors cursor-pointer group" style={{ animation: `slideInLeft 0.5s ease-out ${0.35 + idx * 0.08}s both` }}>
                    <p className="text-xs sm:text-sm font-medium text-gray-100 group-hover:text-lime-400 transition-colors">{action.action}</p>
                    <div className="flex items-center text-xs text-gray-500 gap-2">
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
