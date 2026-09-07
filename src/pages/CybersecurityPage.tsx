import React from 'react';
import { BellRing, LockKeyhole, Radar, Shield, ShieldCheck, UserCog } from 'lucide-react';

const items = [
  { title: 'Encryption', text: 'Protect data in transit and at rest using secure protocols.', icon: LockKeyhole },
  { title: 'Secure authentication', text: 'Require verified access for admin and response workflows.', icon: UserCog },
  { title: 'Access control', text: 'Limit sensitive actions by role, team, and trust level.', icon: ShieldCheck },
  { title: 'Fraud detection', text: 'Identify duplicate or suspicious submissions before action is taken.', icon: Radar },
  { title: 'Rate limiting', text: 'Reduce abuse and overload through request validation and throttling.', icon: BellRing },
  { title: 'AI safety', text: 'Monitor model outputs and keep critical decisions under human supervision.', icon: Shield },
];

function CybersecurityPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8 text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">Cybersecurity</p>
        <h1 className="mt-3 text-4xl font-black text-slate-900">Security-first humanitarian operations</h1>
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {items.map(({ title, text, icon: Icon }) => (
          <div key={title} className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-[0_12px_30px_rgba(15,23,42,0.04)]">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-100 text-indigo-700">
              <Icon size={22} />
            </div>
            <h3 className="text-2xl font-black text-slate-900">{title}</h3>
            <p className="mt-3 text-base leading-7 text-slate-600">{text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CybersecurityPage;
