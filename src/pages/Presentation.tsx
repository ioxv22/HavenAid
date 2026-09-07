import React from 'react';
import { ArrowRight, BarChart3, BrainCircuit, CheckCircle2, Globe2, ShieldCheck, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

const stats = [
  { value: '72%', label: 'faster triage' },
  { value: '4.8x', label: 'more response coordination' },
  { value: '24/7', label: 'continuous monitoring' },
  { value: '95%', label: 'need matching confidence' },
];

const pillars = [
  {
    title: 'AI-assisted crisis detection',
    description: 'HavenAid identifies urgent needs from photos, text, location data, and severity signals to triage reports in seconds.',
    icon: BrainCircuit,
  },
  {
    title: 'Localized impact intelligence',
    description: 'The platform prioritizes communities based on vulnerability, urgency, and resource gaps to drive smarter decisions.',
    icon: Globe2,
  },
  {
    title: 'Trustworthy action routing',
    description: 'Reports are matched to the right aid organizations and response workflows with transparency and human oversight.',
    icon: ShieldCheck,
  },
];

const impact = [
  'Track unmet needs in real time',
  'Connect affected communities with aid teams faster',
  'Reduce delay between reporting and field action',
  'Support decision-making with explainable AI insights',
];

function Presentation() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <section className="overflow-hidden rounded-[32px] border border-slate-200 bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 p-6 text-white shadow-[0_30px_80px_rgba(15,23,42,0.28)] sm:p-10 lg:p-14">
        <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.2em] text-blue-100">
              <Sparkles size={12} />
              HavenAid — AI for Good
            </div>
            <h1 className="max-w-2xl text-4xl font-black tracking-tight sm:text-5xl lg:text-6xl">
              Faster humanitarian response. Smarter support. Real impact.
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-8 text-slate-300">
              HavenAid is an intelligent humanitarian coordination platform that helps communities report urgent needs, allows AI to detect risk patterns, and connects response teams to the right action at the right time.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link to="/report" className="inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-blue-500 to-cyan-400 px-6 py-3.5 text-base font-bold text-white shadow-[0_16px_32px_rgba(59,130,246,0.34)]">
                Try the demo <ArrowRight size={18} />
              </Link>
              <Link to="/" className="inline-flex items-center justify-center rounded-2xl border border-white/20 bg-white/5 px-6 py-3.5 text-base font-bold text-white/90 transition hover:bg-white/10">
                View product home
              </Link>
            </div>
          </div>

          <div className="rounded-[28px] border border-white/10 bg-white/5 p-4 backdrop-blur-sm">
            <div className="rounded-[24px] border border-slate-700 bg-slate-900/80 p-4">
              <div className="mb-4 flex items-center justify-between text-[10px] font-bold uppercase tracking-[0.22em] text-slate-300">
                <span>Response dashboard</span>
                <span className="rounded-full bg-emerald-500/15 px-2 py-1 text-emerald-300">Live</span>
              </div>
              <div className="space-y-3">
                <div className="rounded-2xl border border-slate-700 bg-slate-800 p-3">
                  <div className="flex items-center justify-between text-sm text-slate-300">
                    <span>Flooding / Al-Dahar</span>
                    <span className="font-bold text-red-300">High priority</span>
                  </div>
                  <div className="mt-3 h-2.5 overflow-hidden rounded-full bg-slate-700">
                    <div className="h-full w-[92%] rounded-full bg-gradient-to-r from-red-500 to-orange-400" />
                  </div>
                </div>
                <div className="grid gap-3 sm:grid-cols-2">
                  <div className="rounded-2xl border border-slate-700 bg-slate-800 p-3">
                    <p className="text-[10px] uppercase tracking-[0.2em] text-slate-400">Affected</p>
                    <p className="mt-2 text-2xl font-black text-white">45+</p>
                  </div>
                  <div className="rounded-2xl border border-slate-700 bg-slate-800 p-3">
                    <p className="text-[10px] uppercase tracking-[0.2em] text-slate-400">Matched</p>
                    <p className="mt-2 text-2xl font-black text-cyan-300">7 orgs</p>
                  </div>
                </div>
                <div className="rounded-2xl border border-slate-700 bg-slate-800 p-3">
                  <p className="text-[10px] uppercase tracking-[0.2em] text-slate-400">AI recommendation</p>
                  <p className="mt-2 text-base font-bold text-white">Deploy emergency water + shelter support</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mt-16">
        <div className="mb-8 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">Why it matters</p>
          <h2 className="mt-3 text-3xl font-black text-slate-900 sm:text-4xl">Built for the moments when every hour matters</h2>
        </div>
        <div className="grid gap-4 md:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="rounded-[26px] border border-slate-200 bg-white p-5 shadow-[0_12px_30px_rgba(15,23,42,0.04)]">
              <div className="text-4xl font-black text-slate-900">{stat.value}</div>
              <p className="mt-2 text-sm uppercase tracking-[0.16em] text-slate-500">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-16 rounded-[30px] border border-slate-200 bg-slate-50 p-8">
        <div className="mb-8 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">Core pillars</p>
          <h2 className="mt-3 text-3xl font-black text-slate-900">A complete humanitarian intelligence loop</h2>
        </div>
        <div className="grid gap-6 lg:grid-cols-3">
          {pillars.map(({ title, description, icon: Icon }) => (
            <div key={title} className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-[0_12px_30px_rgba(15,23,42,0.04)]">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-700">
                <Icon size={24} />
              </div>
              <h3 className="text-xl font-black text-slate-900">{title}</h3>
              <p className="mt-3 text-sm leading-7 text-slate-600">{description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-16 grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
        <div className="rounded-[30px] border border-slate-200 bg-white p-8 shadow-[0_12px_30px_rgba(15,23,42,0.04)]">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">Problem we solve</p>
          <h2 className="mt-3 text-3xl font-black text-slate-900">Humanitarian response is often delayed by fragmented reporting</h2>
          <p className="mt-4 text-base leading-8 text-slate-600">
            Communities report emergencies in disconnected ways. Aid organizations often receive incomplete information, delay triage, and struggle to prioritize the most urgent needs. HavenAid closes that gap with AI-guided urgency analysis and structured coordination.
          </p>
        </div>
        <div className="rounded-[30px] border border-slate-200 bg-slate-950 p-8 text-white shadow-[0_18px_40px_rgba(15,23,42,0.14)]">
          <div className="mb-6 flex items-center gap-3">
            <BarChart3 className="text-cyan-300" size={28} />
            <h3 className="text-2xl font-black">What the platform enables</h3>
          </div>
          <ul className="space-y-4 text-base text-slate-200">
            {impact.map((item) => (
              <li key={item} className="flex gap-3">
                <CheckCircle2 className="mt-1 shrink-0 text-emerald-400" size={18} />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}

export default Presentation;
