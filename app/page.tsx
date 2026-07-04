import React from 'react';
import DashboardCard from '@/components/DashboardCard';
import { Calendar, AlertCircle, DollarSign, Stethoscope, ArrowRight, Zap, CheckCircle2, Activity } from 'lucide-react';
import { kpis, insights, utilization, recentActions } from '@/lib/dummyData';

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-slate-950 p-6 md:p-8 w-full">
      <div className="max-w-7xl mx-auto">

        {/* Header Section */}
        <header className="mb-10">
          <div className="flex items-baseline gap-3 mb-2">
            <div className="flex items-center gap-2">
              <Activity className="w-8 h-8 text-blue-500" />
              <h1 className="text-4xl font-bold text-white">Operations Hub</h1>
            </div>
          </div>
          <p className="text-slate-400 text-lg">AI-powered intelligence for healthcare operations</p>
        </header>

        {/* KPI Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
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
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* AI Insights Card */}
          <div className="lg:col-span-2">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
              <div className="border-b border-slate-800 px-8 py-6 flex items-center justify-between">
                <h2 className="text-xl font-bold text-white flex items-center gap-3">
                  <div className="p-2 bg-blue-500/20 rounded-lg">
                    <Zap className="w-5 h-5 text-blue-400" />
                  </div>
                  AI Insights
                </h2>
                <button className="text-sm font-semibold text-blue-400 hover:text-blue-300 transition-colors">View All</button>
              </div>
              <div className="divide-y divide-slate-800">
                {insights.map((insight) => (
                  <div key={insight.id} className="p-8 hover:bg-slate-800/50 transition-colors duration-200">
                    <div className="flex items-start gap-4">
                      <div className={`mt-1 p-3 rounded-xl flex-shrink-0 ${
                        insight.type === 'warning' ? 'bg-red-500/20 text-red-400' :
                        insight.type === 'opportunity' ? 'bg-amber-500/20 text-amber-400' :
                        'bg-emerald-500/20 text-emerald-400'
                      }`}>
                        {insight.type === 'warning' && <AlertCircle className="w-5 h-5" />}
                        {insight.type === 'opportunity' && <Calendar className="w-5 h-5" />}
                        {insight.type === 'success' && <CheckCircle2 className="w-5 h-5" />}
                      </div>
                      <div className="flex-1">
                        <h3 className="text-base font-bold text-white">{insight.title}</h3>
                        <p className="text-slate-400 mt-2 leading-relaxed">{insight.description}</p>
                      </div>
                      <button className="flex items-center gap-2 text-sm font-semibold text-blue-400 hover:text-blue-300 transition-colors flex-shrink-0 mt-1">
                        Action <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Department Utilization */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 shadow-xl">
              <h2 className="text-xl font-bold text-white mb-8">Department Utilization</h2>
              <div className="space-y-7">
                {utilization.map((dept) => {
                  const percentage = Math.round((dept.current / dept.capacity) * 100);
                  const isHigh = percentage >= 90;
                  return (
                    <div key={dept.department}>
                      <div className="flex justify-between items-end mb-3">
                        <span className="text-sm font-semibold text-slate-200">{dept.department}</span>
                        <span className={`text-lg font-bold ${isHigh ? 'text-red-400' : 'text-blue-400'}`}>{percentage}%</span>
                      </div>
                      <div className="w-full bg-slate-800 rounded-full h-3 overflow-hidden">
                        <div
                          className={`h-3 rounded-full transition-all duration-500 ${isHigh ? 'bg-gradient-to-r from-red-500 to-red-600' : 'bg-gradient-to-r from-blue-500 to-blue-600'}`}
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Recent Actions */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 shadow-xl">
              <h2 className="text-xl font-bold text-white mb-6">Recent Activity</h2>
              <div className="space-y-5">
                {recentActions.map((action) => (
                  <div key={action.id} className="flex flex-col gap-2 pb-5 border-b border-slate-800 last:border-b-0 last:pb-0">
                    <p className="text-sm font-medium text-slate-100">{action.action}</p>
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
