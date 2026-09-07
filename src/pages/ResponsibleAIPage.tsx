import React from 'react';
import { BrainCircuit, Eye, Lock, ShieldCheck, Sparkles, Users } from 'lucide-react';

const principles = [
  { title: 'Fairness', text: 'Reduce bias by validating outputs across communities and contexts.', icon: Users },
  { title: 'Safety', text: 'Protect people from harmful, misleading, or overconfident recommendations.', icon: ShieldCheck },
  { title: 'Privacy', text: 'Sensitive data is handled with clear safeguards and least-privilege access.', icon: Lock },
  { title: 'Inclusiveness', text: 'Support communities across languages, devices, and digital access levels.', icon: Sparkles },
  { title: 'Transparency', text: 'Show how recommendations are generated and where human review remains essential.', icon: Eye },
  { title: 'Accountability', text: 'Human teams evaluate AI output before major decisions are made.', icon: BrainCircuit },
];

function ResponsibleAIPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8 text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">Responsible AI</p>
        <h1 className="mt-3 text-4xl font-black text-slate-900">Ethical and human-centered design</h1>
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {principles.map(({ title, text, icon: Icon }) => (
          <div key={title} className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-[0_12px_30px_rgba(15,23,42,0.04)]">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-sky-100 text-sky-700">
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

export default ResponsibleAIPage;
