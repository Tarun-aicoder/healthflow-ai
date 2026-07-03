import React from 'react';
import { waitlist } from '@/lib/dummyData';
import { Search, Filter, AlertCircle, ArrowUpRight, UserPlus } from 'lucide-react';

export default function WaitlistPage() {
  const recommendedPatient = waitlist.find(w => w.priority === "High");

  return (
    <div className="min-h-screen bg-zinc-50/50 w-full p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        
        <header className="flex flex-col md:flex-row md:justify-between md:items-end gap-4">
          <div>
            <h1 className="text-2xl font-semibold text-zinc-900">Waitlist Management</h1>
            <p className="text-zinc-500 mt-1">Manage patients waiting for cancellations and open slots.</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" />
              <input 
                type="text" 
                placeholder="Search patient..." 
                className="pl-9 pr-4 py-2 border border-zinc-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 w-64"
              />
            </div>
            <button className="flex items-center gap-2 px-4 py-2 bg-white border border-zinc-200 rounded-lg text-sm font-medium text-zinc-700 hover:bg-zinc-50 shadow-sm transition-colors">
              <Filter className="w-4 h-4" /> Filter
            </button>
          </div>
        </header>

        {/* AI Recommended Replacement Section */}
        {recommendedPatient && (
          <div className="bg-gradient-to-r from-indigo-600 to-violet-600 rounded-xl p-6 text-white shadow-md relative overflow-hidden">
            <div className="absolute right-0 top-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-10 -mt-10 pointer-events-none"></div>
            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
              <div>
                <div className="flex items-center gap-2 text-indigo-200 mb-2 font-medium text-sm tracking-wide uppercase">
                  <UserPlus className="w-4 h-4" /> Top Recommended Replacement
                </div>
                <h2 className="text-2xl font-bold">{recommendedPatient.patientName}</h2>
                <p className="text-indigo-100 mt-1 text-sm">
                  {recommendedPatient.department} • {recommendedPatient.procedure} • Waiting {recommendedPatient.waitDays} days
                </p>
              </div>
              <button className="bg-white text-indigo-600 px-5 py-2.5 rounded-lg font-semibold text-sm hover:bg-indigo-50 transition-colors shadow-sm flex items-center gap-2 whitespace-nowrap">
                Slot Available <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Waitlist Table */}
        <div className="bg-white border border-zinc-200 rounded-xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-zinc-50/50 border-b border-zinc-200 text-zinc-500 uppercase tracking-wider text-xs font-semibold">
                <tr>
                  <th className="px-6 py-4">Patient Name</th>
                  <th className="px-6 py-4">Department</th>
                  <th className="px-6 py-4">Procedure</th>
                  <th className="px-6 py-4">Priority</th>
                  <th className="px-6 py-4">Wait Time</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100">
                {waitlist.map((patient) => {
                  const isHigh = patient.priority === 'High';
                  const isMed = patient.priority === 'Medium';
                  
                  return (
                    <tr key={patient.id} className="hover:bg-zinc-50/50 transition-colors">
                      <td className="px-6 py-4 font-medium text-zinc-900">{patient.patientName}</td>
                      <td className="px-6 py-4 text-zinc-600">{patient.department}</td>
                      <td className="px-6 py-4 text-zinc-600">{patient.procedure}</td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium border ${
                          isHigh ? 'bg-red-50 text-red-700 border-red-200' : 
                          isMed ? 'bg-amber-50 text-amber-700 border-amber-200' : 
                          'bg-zinc-100 text-zinc-700 border-zinc-200'
                        }`}>
                          {isHigh && <AlertCircle className="w-3.5 h-3.5" />}
                          {patient.priority}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-zinc-600">
                        {patient.waitDays} days
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button className="text-indigo-600 hover:text-indigo-800 font-medium text-sm transition-colors">
                          Schedule
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
}