import React from 'react';
import { ArrowRight, BrainCircuit, FileText, Landmark, ScanSearch, Sparkles } from 'lucide-react';

const pipeline = [
  'Photo + Description',
  'AI Vision + NLP',
  'Problem Classification',
  'Severity Assessment',
  'Action Plan',
  'Organization Matching',
  'Humanitarian Response',
];

function AIPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8 text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">AI capabilities</p>
        <h1 className="mt-3 text-4xl font-black text-slate-900">How HavenAid uses AI</h1>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="rounded-[26px] border border-slate-200 bg-white p-6 shadow-[0_12px_30px_rgba(15,23,42,0.04)]">
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-100 text-blue-700">
            <ScanSearch size={22} />
          </div>
          <h3 className="text-2xl font-black text-slate-900">Computer Vision</h3>
          <p className="mt-3 text-base leading-7 text-slate-600">
            AI analyzes uploaded images to identify humanitarian problems such as flooding, damaged infrastructure, collapsed buildings, and overcrowded shelters.
          </p>
        </div>

        <div className="rounded-[26px] border border-slate-200 bg-white p-6 shadow-[0_12px_30px_rgba(15,23,42,0.04)]">
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-100 text-cyan-700">
            <FileText size={22} />
          </div>
          <h3 className="text-2xl font-black text-slate-900">Natural Language Processing</h3>
          <p className="mt-3 text-base leading-7 text-slate-600">
            AI analyzes descriptions to extract problem type, location, severity, urgency, and required resources while supporting multilingual reports.
          </p>
        </div>

        <div className="rounded-[26px] border border-slate-200 bg-white p-6 shadow-[0_12px_30px_rgba(15,23,42,0.04)]">
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-700">
            <Landmark size={22} />
          </div>
          <h3 className="text-2xl font-black text-slate-900">Decision & Matching AI</h3>
          <p className="mt-3 text-base leading-7 text-slate-600">
            AI combines image and text data to assess urgency, generate recommended actions, identify required resources, and match issues with suitable organizations.
          </p>
        </div>
      </div>

      <div className="mt-12 rounded-[30px] border border-slate-200 bg-white p-6 shadow-[0_12px_30px_rgba(15,23,42,0.04)]">
        <div className="mb-6 flex items-center gap-3 text-slate-700">
          <BrainCircuit size={24} className="text-blue-600" />
          <h3 className="text-2xl font-black">AI workflow</h3>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3">
          {pipeline.map((step, index) => (
            <React.Fragment key={step}>
              <div className="rounded-full border border-blue-200 bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-700">{step}</div>
              {index < pipeline.length - 1 && <ArrowRight className="text-slate-400" size={18} />}
            </React.Fragment>
          ))}
        </div>
      </div>

      <div className="mt-12 rounded-[30px] border border-slate-200 bg-gradient-to-br from-slate-900 via-slate-800 to-blue-900 p-8 text-white shadow-[0_20px_45px_rgba(15,23,42,0.18)]">
        <div className="flex items-center gap-3">
          <Sparkles size={24} className="text-cyan-300" />
          <h3 className="text-2xl font-black">Why it matters</h3>
        </div>
        <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-200">
          HavenAid helps turn quick observations into structured, actionable humanitarian responses—bringing speed, clarity, and coordination to crisis response.
        </p>
      </div>
    </div>
  );
}

export default AIPage;
