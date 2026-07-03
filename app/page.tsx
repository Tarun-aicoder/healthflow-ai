import React from 'react';
import DashboardCard from '@/components/DashboardCard';
import { Calendar, AlertCircle, DollarSign, Stethoscope, ArrowRight, Zap, CheckCircle2 } from 'lucide-react';
import { kpis, insights, utilization, recentActions } from '@/lib/dummyData';

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-zinc-50/50 p-8 w-full">
      <div className="max-w-6xl mx-auto space-y-8">
        
        <header>
          <h1 className="text-2xl font-semibold text-zinc-900">Hospital Operations Copilot</h1>
          <p className="text-zinc-500 mt-1">Good morning! Here is your predictive overview for today.</p>
        </header>

        {/* KPI Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* AI Insights & Actions */}
          <div className="col-span-2 space-y-6">
            <div className="bg-white rounded-xl border border-zinc-200 shadow-sm overflow-hidden">
              <div className="border-b border-zinc-100 px-6 py-4 flex items-center justify-between">
                <h2 className="text-lg font-semibold text-zinc-900 flex items-center gap-2">
                  <Zap className="w-5 h-5 text-indigo-500" /> AI Insights
                </h2>
                <button className="text-sm font-medium text-indigo-600 hover:text-indigo-700">View All</button>
              </div>
              <div className="divide-y divide-zinc-100">
                {insights.map((insight) => (
                  <div key={insight.id} className="p-6 hover:bg-zinc-50/50 transition-colors">
                    <div className="flex items-start gap-4">
                      <div className={`mt-0.5 p-2 rounded-full ${
                        insight.type === 'warning' ? 'bg-red-100 text-red-600' :
                        insight.type === 'opportunity' ? 'bg-amber-100 text-amber-600' :
                        'bg-emerald-100 text-emerald-600'
                      }`}>
                        {insight.type === 'warning' && <AlertCircle className="w-4 h-4" />}
                        {insight.type === 'opportunity' && <Calendar className="w-4 h-4" />}
                        {insight.type === 'success' && <CheckCircle2 className="w-4 h-4" />}
                      </div>
                      <div className="flex-1">
                        <h3 className="text-sm font-semibold text-zinc-900">{insight.title}</h3>
                        <p className="text-sm text-zinc-500 mt-1">{insight.description}</p>
                      </div>
                      <button className="flex items-center text-sm font-medium text-zinc-400 hover:text-zinc-600 transition-colors">
                        Action <ArrowRight className="w-4 h-4 ml-1" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Department Utilization & Recent Actions */}
          <div className="space-y-6">
            <div className="bg-white rounded-xl border border-zinc-200 shadow-sm p-6">
              <h2 className="text-lg font-semibold text-zinc-900 mb-6">Department Utilization</h2>
              <div className="space-y-5">
                {utilization.map((dept) => {
                  const percentage = Math.round((dept.current / dept.capacity) * 100);
                  const isHigh = percentage >= 90;
                  return (
                    <div key={dept.department}>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium text-zinc-700">{dept.department}</span>
                        <span className="text-sm text-zinc-500">{percentage}%</span>
                      </div>
                      <div className="w-full bg-zinc-100 rounded-full h-2 overflow-hidden">
                        <div 
                          className={`h-2 rounded-full transition-all duration-500 ${isHigh ? 'bg-red-500' : 'bg-indigo-500'}`}
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="bg-white rounded-xl border border-zinc-200 shadow-sm p-6">
              <h2 className="text-lg font-semibold text-zinc-900 mb-4">Recent Actions</h2>
              <div className="space-y-4">
                {recentActions.map((action) => (
                  <div key={action.id} className="flex flex-col gap-1">
                    <p className="text-sm text-zinc-700">{action.action}</p>
                    <div className="flex items-center text-xs text-zinc-400 gap-2">
                      <span>{action.time}</span>
                      <span>•</span>
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