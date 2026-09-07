import React from 'react';
import { ArrowRight, BadgeCheck, LockKeyhole, Shield, ShieldAlert, UserRoundCheck } from 'lucide-react';

const pillars = [
  {
    title: 'Data Encryption',
    text: 'Encrypt information during transmission and storage.',
    icon: LockKeyhole,
  },
  {
    title: 'Secure Authentication',
    text: 'Use secure authentication and authorization mechanisms.',
    icon: UserRoundCheck,
  },
  {
    title: 'Access Control',
    text: 'Only authorized personnel access sensitive humanitarian reports.',
    icon: BadgeCheck,
  },
  {
    title: 'Fraud Prevention',
    text: 'AI can detect suspicious or duplicate reports and malicious behavior.',
    icon: ShieldAlert,
  },
];

function Safety() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8 text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">Security by design</p>
        <h1 className="mt-3 text-4xl font-black text-slate-900">Trust and protection</h1>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {pillars.map(({ title, text, icon: Icon }) => (
          <div key={title} className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-[0_12px_30px_rgba(15,23,42,0.04)]">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-sky-100 text-sky-700">
              <Icon size={22} />
            </div>
            <h3 className="text-2xl font-black text-slate-900">{title}</h3>
            <p className="mt-3 text-base leading-7 text-slate-600">{text}</p>
          </div>
        ))}
      </div>

      <div className="mt-12 rounded-[32px] border border-slate-200 bg-gradient-to-br from-emerald-50 to-sky-50 p-8 shadow-[0_12px_30px_rgba(15,23,42,0.04)]">
        <div className="flex items-center gap-3">
          <Shield className="text-emerald-600" size={28} />
          <h3 className="text-2xl font-black text-slate-900">Secure AI controls</h3>
        </div>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {['Sandboxed testing', 'Monitoring & logging', 'Rate limiting & validation'].map((item) => (
            <div key={item} className="rounded-2xl border border-white/50 bg-white/70 p-4 text-sm font-semibold text-slate-700 shadow-sm">
              <div className="flex items-center justify-between">
                <span>{item}</span>
                <ArrowRight size={16} className="text-blue-600" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Safety;
