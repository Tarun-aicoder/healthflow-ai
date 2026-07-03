"use client";

import React, { useState } from 'react';
import { appointments } from '@/lib/dummyData';
import { AlertTriangle, Clock, User, Check, X, ShieldAlert, Sparkles, DollarSign, CalendarCheck } from 'lucide-react';

export default function AppointmentsPage() {
  const [actionStates, setActionStates] = useState<Record<string, 'pending' | 'approved' | 'rejected'>>({});

  const handleApprove = (id: string) => {
    setActionStates((prev) => ({ ...prev, [id]: 'approved' }));
  };

  const handleReject = (id: string) => {
    setActionStates((prev) => ({ ...prev, [id]: 'rejected' }));
  };

  return (
    <div className="min-h-screen bg-zinc-50/50 w-full p-8">
      <div className="max-w-5xl mx-auto space-y-6">
        
        <header className="flex justify-between items-end mb-8">
          <div>
            <h1 className="text-2xl font-semibold text-zinc-900">Appointment Risk Management</h1>
            <p className="text-zinc-500 mt-1">Review AI-flagged appointments and approve recommendations.</p>
          </div>
          <div className="flex gap-4">
            <div className="flex items-center gap-2 text-sm text-zinc-600 bg-white px-3 py-1.5 rounded-md border border-zinc-200">
              <div className="w-2.5 h-2.5 rounded-full bg-red-500"></div> High Risk
            </div>
            <div className="flex items-center gap-2 text-sm text-zinc-600 bg-white px-3 py-1.5 rounded-md border border-zinc-200">
              <div className="w-2.5 h-2.5 rounded-full bg-amber-500"></div> Medium Risk
            </div>
          </div>
        </header>

        <div className="space-y-6">
          {appointments.map((apt) => {
            const state = actionStates[apt.id] || 'pending';
            
            if (state === 'rejected') return null; // Hide rejected items from feed
            
            const isHighRisk = apt.riskScore >= 80;
            const isMediumRisk = apt.riskScore >= 50 && apt.riskScore < 80;
            const isLowRisk = apt.riskScore < 50;

            const badgeClasses = isHighRisk 
              ? 'bg-red-50 text-red-700 border-red-200' 
              : isMediumRisk 
                ? 'bg-amber-50 text-amber-700 border-amber-200' 
                : 'bg-emerald-50 text-emerald-700 border-emerald-200';

            return (
              <div key={apt.id} className="bg-white border border-zinc-200 rounded-xl shadow-sm overflow-hidden flex flex-col md:flex-row transition-all">
                
                {/* Appointment Info */}
                <div className="p-6 md:w-5/12 border-b md:border-b-0 md:border-r border-zinc-100 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className={`px-2.5 py-1 text-xs font-semibold rounded-md border flex items-center gap-1.5 ${badgeClasses}`}>
                        <ShieldAlert className="w-3.5 h-3.5" />
                        Risk Score: {apt.riskScore}
                      </div>
                      <span className="text-sm font-medium text-zinc-500">{apt.department}</span>
                    </div>
                    
                    <h3 className="text-lg font-bold text-zinc-900 flex items-center gap-2">
                      <User className="w-5 h-5 text-zinc-400" /> {apt.patientName}
                    </h3>
                    <p className="text-sm text-zinc-500 flex items-center gap-2 mt-2">
                      <Clock className="w-4 h-4" /> {apt.time} • {apt.doctor}
                    </p>
                  </div>

                  {apt.riskFactors.length > 0 && (
                    <div className="mt-6">
                      <p className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-2">Risk Factors</p>
                      <ul className="space-y-2">
                        {apt.riskFactors.map((factor, idx) => (
                          <li key={idx} className="text-sm text-zinc-700 flex items-start gap-2">
                            <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                            {factor}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                {/* Recommendation & Action Panel */}
                <div className="p-6 md:w-7/12 bg-zinc-50/50 flex flex-col justify-center relative">
                  {state === 'approved' ? (
                    <div className="animate-in fade-in zoom-in duration-300 flex flex-col items-center justify-center h-full text-center py-4">
                      <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mb-4">
                        <Check className="w-6 h-6 text-emerald-600" />
                      </div>
                      <h4 className="text-lg font-semibold text-zinc-900 mb-2">Recommendation Approved</h4>
                      <p className="text-emerald-700 bg-emerald-50 px-4 py-2 rounded-full text-sm font-medium flex items-center gap-2 mb-4 border border-emerald-100">
                        <DollarSign className="w-4 h-4" /> 
                        ${apt.recommendation?.recoveredRevenue} Revenue Recovered
                      </p>
                      <div className="bg-white p-4 rounded-lg border border-zinc-200 w-full text-left flex items-start gap-3">
                        <CalendarCheck className="w-5 h-5 text-indigo-500 shrink-0 mt-0.5" />
                        <div>
                          <p className="text-sm font-medium text-zinc-900">Schedule Updated</p>
                          <p className="text-sm text-zinc-500 mt-1">{apt.recommendation?.reassignmentText}</p>
                        </div>
                      </div>
                    </div>
                  ) : apt.recommendation ? (
                    <>
                      <div className="flex items-center gap-2 mb-4 text-indigo-600 font-semibold">
                        <Sparkles className="w-5 h-5" /> AI Recommendation
                      </div>
                      <p className="text-zinc-800 text-lg mb-6 leading-relaxed">
                        {apt.recommendation.action}
                      </p>
                      <div className="grid grid-cols-2 gap-4 mb-8">
                        <div className="bg-white p-3 rounded-lg border border-zinc-200">
                          <span className="block text-xs text-zinc-500 mb-1">Recoverable Revenue</span>
                          <span className="text-sm font-semibold text-emerald-600 flex items-center">
                            +${apt.recommendation.recoveredRevenue}
                          </span>
                        </div>
                        <div className="bg-white p-3 rounded-lg border border-zinc-200">
                          <span className="block text-xs text-zinc-500 mb-1">Replacement Patient</span>
                          <span className="text-sm font-semibold text-zinc-900">
                            {apt.recommendation.newPatientName || 'N/A'}
                          </span>
                        </div>
                      </div>
                      
                      <div className="flex gap-3 mt-auto">
                        <button 
                          onClick={() => handleApprove(apt.id)}
                          className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2.5 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors shadow-sm"
                        >
                          <Check className="w-4 h-4" /> Approve Action
                        </button>
                        <button 
                          onClick={() => handleReject(apt.id)}
                          className="flex-1 bg-white hover:bg-zinc-50 text-zinc-700 border border-zinc-300 font-medium py-2.5 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors"
                        >
                          <X className="w-4 h-4" /> Dismiss
                        </button>
                      </div>
                    </>
                  ) : (
                    <div className="flex flex-col items-center justify-center h-full text-center text-zinc-400">
                      <Sparkles className="w-8 h-8 mb-2 opacity-50" />
                      <p className="text-sm">No action required for this appointment.</p>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}