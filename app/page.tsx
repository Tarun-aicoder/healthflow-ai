import React from 'react';
import DashboardCard from '@/components/DashboardCard';
import { Calendar, AlertCircle, DollarSign, Stethoscope, ArrowRight, Zap, CheckCircle2, Activity } from 'lucide-react';
import { kpis, insights, utilization, recentActions } from '@/lib/dummyData';

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-slate-950 p-4 sm:p-6 md:p-8 w-full">
      <div className="max-w-7xl mx-auto">

        {/* Header Section */}
        <header className="mb-8 sm:mb-10">
          <div className="flex items-baseline gap-2 sm:gap-3 mb-2">
            <div className="flex items-center gap-1.5 sm:gap-2">
              <Activity className="w-6 sm:w-8 h-6 sm:h-8 text-blue-500 flex-shrink-0" />
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white">Operations Hub</h1>
            </div>
          </div>
          <p className="text-slate-400 text-sm sm:text-base md:text-lg">AI-powered intelligence for healthcare operations</p>
        </header>

        {/* KPI Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-5 mb-8 sm:mb-10">
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
          <div className="lg:col-span-2">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
              <div className="border-b border-slate-800 px-4 sm:px-6 md:px-8 py-4 sm:py-5 md:py-6 flex items-center justify-between gap-2">
                <h2 className="text-base sm:text-lg md:text-xl font-bold text-white flex items-center gap-2 sm:gap-3 min-w-0">
                  <div className="p-2 bg-blue-500/20 rounded-lg flex-shrink-0">
                    <Zap className="w-4 sm:w-5 h-4 sm:h-5 text-blue-400" />
                  </div>
                  <span className="truncate">AI Insights</span>
                </h2>
                <button className="text-xs sm:text-sm font-semibold text-blue-400 hover:text-blue-300 transition-colors flex-shrink-0">View All</button>
              </div>
              <div className="divide-y divide-slate-800">
                {insights.map((insight) => (
                  <div key={insight.id} className="p-4 sm:p-6 md:p-8 hover:bg-slate-800/50 transition-colors duration-200">
                    <div className="flex items-start gap-3 sm:gap-4">
                      <div className={`mt-0.5 p-2 sm:p-3 rounded-lg sm:rounded-xl flex-shrink-0 ${
                        insight.type === 'warning' ? 'bg-red-500/20 text-red-400' :
                        insight.type === 'opportunity' ? 'bg-amber-500/20 text-amber-400' :
                        'bg-emerald-500/20 text-emerald-400'
                      }`}>
                        {insight.type === 'warning' && <AlertCircle className="w-4 sm:w-5 h-4 sm:h-5" />}
                        {insight.type === 'opportunity' && <Calendar className="w-4 sm:w-5 h-4 sm:h-5" />}
                        {insight.type === 'success' && <CheckCircle2 className="w-4 sm:w-5 h-4 sm:h-5" />}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-sm sm:text-base font-bold text-white">{insight.title}</h3>
                        <p className="text-slate-400 text-xs sm:text-sm mt-1 sm:mt-2 leading-relaxed">{insight.description}</p>
                      </div>
                      <button className="flex items-center gap-1 text-xs sm:text-sm font-semibold text-blue-400 hover:text-blue-300 transition-colors flex-shrink-0">
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
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-6 md:p-8 shadow-xl">
              <h2 className="text-base sm:text-lg md:text-xl font-bold text-white mb-5 sm:mb-8">Department Utilization</h2>
              <div className="space-y-5 sm:space-y-7">
                {utilization.map((dept) => {
                  const percentage = Math.round((dept.current / dept.capacity) * 100);
                  const isHigh = percentage >= 90;
                  return (
                    <div key={dept.department}>
                      <div className="flex justify-between items-end gap-2 mb-2 sm:mb-3">
                        <span className="text-xs sm:text-sm font-semibold text-slate-200 truncate">{dept.department}</span>
                        <span className={`text-base sm:text-lg font-bold flex-shrink-0 ${isHigh ? 'text-red-400' : 'text-blue-400'}`}>{percentage}%</span>
                      </div>
                      <div className="w-full bg-slate-800 rounded-full h-2.5 sm:h-3 overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all duration-500 ${isHigh ? 'bg-gradient-to-r from-red-500 to-red-600' : 'bg-gradient-to-r from-blue-500 to-blue-600'}`}
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Recent Actions */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-6 md:p-8 shadow-xl">
              <h2 className="text-base sm:text-lg md:text-xl font-bold text-white mb-4 sm:mb-6">Recent Activity</h2>
              <div className="space-y-4 sm:space-y-5">
                {recentActions.map((action) => (
                  <div key={action.id} className="flex flex-col gap-1.5 sm:gap-2 pb-4 sm:pb-5 border-b border-slate-800 last:border-b-0 last:pb-0">
                    <p className="text-xs sm:text-sm font-medium text-slate-100">{action.action}</p>
                    <div className="flex items-center text-xs text-slate-500 gap-2">
                      <span>{action.time}</span>
                      <span className="text-slate-700">•</span>
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
