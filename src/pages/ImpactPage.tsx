import React from 'react';
import { ArrowRight, CheckCircle2, Gauge, Globe2, ShieldCheck, Users } from 'lucide-react';

const cards = [
  {
    title: 'Faster response time',
    text: 'Reduce the delay between reporting a crisis and mobilizing human and material support.',
    icon: Gauge,
  },
  {
    title: 'Better resource allocation',
    text: 'Prioritize the right aid packages based on urgency, location, and need type.',
    icon: CheckCircle2,
  },
  {
    title: 'Community empowerment',
    text: 'Give communities a simple, trusted way to report urgent issues and receive support.',
    icon: Users,
  },
  {
    title: 'Transparency and trust',
    text: 'Create a clearer and more traceable flow from report to beneficiary response.',
    icon: ShieldCheck,
  },
  {
    title: 'Global reach',
    text: 'Scale aid coordination across wide geographies with a common digital workflow.',
    icon: Globe2,
  },
];

function ImpactPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8 text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">Impact</p>
        <h1 className="mt-3 text-4xl font-black text-slate-900">Why HavenAid matters</h1>
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-5">
        {cards.map(({ title, text, icon: Icon }) => (
          <div key={title} className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-[0_12px_30px_rgba(15,23,42,0.04)]">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-700">
              <Icon size={22} />
            </div>
            <h3 className="text-xl font-black text-slate-900">{title}</h3>
            <p className="mt-3 text-sm leading-7 text-slate-600">{text}</p>
          </div>
        ))}
      </div>

      <div className="mt-12 grid gap-8 lg:grid-cols-2">
        <div className="rounded-[30px] border border-slate-200 bg-slate-900 p-8 text-white shadow-[0_18px_40px_rgba(15,23,42,0.15)]">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-300">Before HavenAid</p>
          <div className="mt-6 space-y-4 text-slate-200">
            <p>• Person notices a problem</p>
            <p>• Searches for the right organization</p>
            <p>• Sends a message or call manually</p>
            <p>• Long waiting periods and missing information</p>
          </div>
        </div>

        <div className="rounded-[30px] border border-blue-200 bg-gradient-to-br from-blue-50 to-cyan-50 p-8 shadow-[0_18px_40px_rgba(59,130,246,0.08)]">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-700">With HavenAid</p>
          <div className="mt-6 space-y-4 text-slate-700">
            <p className="flex items-center gap-2"><span>📸</span> Photo and problem report</p>
            <p className="flex items-center gap-2"><span>🤖</span> AI classifies severity and need</p>
            <p className="flex items-center gap-2"><span>📋</span> Response plan is generated</p>
            <p className="flex items-center gap-2"><span>🏢</span> Matching organization receives the case</p>
            <p className="flex items-center gap-2"><span>📍</span> Tracking and accountability continue</p>
          </div>
        </div>
      </div>

      <div className="mt-12 rounded-[30px] border border-slate-200 bg-gradient-to-br from-emerald-500 to-teal-600 p-8 text-white shadow-[0_18px_40px_rgba(16,185,129,0.24)]">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-100">Demo scenario</p>
            <h2 className="mt-2 text-3xl font-black">Severe Flooding</h2>
          </div>
          <div className="hidden rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] sm:block">
            High priority
          </div>
        </div>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          <div className="rounded-2xl bg-white/10 p-4 backdrop-blur-sm">
            <p className="text-xs uppercase tracking-[0.2em] text-emerald-100">Location</p>
            <p className="mt-2 text-lg font-bold">Abu Dhabi — Demo Location</p>
          </div>
          <div className="rounded-2xl bg-white/10 p-4 backdrop-blur-sm">
            <p className="text-xs uppercase tracking-[0.2em] text-emerald-100">Affected</p>
            <p className="mt-2 text-lg font-bold">45+ potentially affected</p>
          </div>
          <div className="rounded-2xl bg-white/10 p-4 backdrop-blur-sm">
            <p className="text-xs uppercase tracking-[0.2em] text-emerald-100">Response</p>
            <p className="mt-2 text-lg font-bold">Emergency Relief Team</p>
          </div>
        </div>
        <div className="mt-6 flex flex-wrap items-center gap-3">
          <button className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2.5 text-sm font-bold text-emerald-700 shadow-sm">
            Send Report <ArrowRight size={16} />
          </button>
          <span className="text-sm text-emerald-100">12 km away — Available</span>
        </div>
      </div>
    </div>
  );
}

export default ImpactPage;
