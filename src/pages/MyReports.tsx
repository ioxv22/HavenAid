import React, { useState } from 'react';
import { AlertCircle, CheckCircle2, Clock3, MapPin, Search } from 'lucide-react';
import { ReportItem } from '../App';

type MyReportsProps = {
  reports: ReportItem[];
  language?: 'en' | 'ar';
};

const statusColors: Record<string, string> = {
  Pending: 'bg-amber-100 text-amber-700 border-amber-200',
  'Pending Review': 'bg-amber-100 text-amber-700 border-amber-200',
  'In Review': 'bg-blue-100 text-blue-700 border-blue-200',
  Approved: 'bg-emerald-100 text-emerald-700 border-emerald-200',
  Assigned: 'bg-sky-100 text-sky-700 border-sky-200',
  'In Progress': 'bg-violet-100 text-violet-700 border-violet-200',
  Escalated: 'bg-red-100 text-red-700 border-red-200',
  Resolved: 'bg-emerald-100 text-emerald-700 border-emerald-200',
};

function MyReports({ reports, language = 'en' }: MyReportsProps) {
  const isArabic = language === 'ar';
  const [selectedId, setSelectedId] = useState<string | null>(reports[0]?.id ?? null);
  const selectedReport = reports.find((report) => report.id === selectedId) ?? reports[0];

  if (!reports.length) {
    return (
      <div className="mx-auto flex min-h-[50vh] max-w-4xl items-center justify-center px-4 py-12">
        <div className="text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-slate-200 text-slate-500">
            <AlertCircle size={28} />
          </div>
          <h1 className="text-3xl font-black text-slate-900">No issues found</h1>
          <p className="mt-2 text-slate-600">You haven’t submitted any issues yet.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8 flex items-center justify-between gap-4">
        <h1 className="text-4xl font-black text-slate-900">{isArabic ? 'بلاغاتــي' : 'My Reports'}</h1>
      </div>

      <div className="mb-8 rounded-[24px] border border-slate-200 bg-white p-3 shadow-sm">
        <div className="flex items-center gap-3 px-3 py-2 text-slate-500">
          <Search size={18} />
          <input className="w-full bg-transparent text-sm outline-none placeholder:text-slate-400" placeholder="Search issues..." />
        </div>
      </div>

      <div className="space-y-6">
        {reports.map((report) => (
          <article key={report.id} className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-[0_12px_30px_rgba(15,23,42,0.04)] sm:p-7">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
              <div className="max-w-3xl">
                <h2 className="text-3xl font-black tracking-tight text-slate-900">{report.title}</h2>
                <p className="mt-3 text-base leading-7 text-slate-600">{report.description}</p>
              </div>
              <span className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-sm font-semibold ${statusColors[report.status] || statusColors.Pending}`}>
                {report.status === 'Pending' ? <Clock3 size={14} /> : report.status === 'In Review' ? <AlertCircle size={14} /> : <CheckCircle2 size={14} />}
                {report.status}
              </span>
            </div>

            <div className="mt-6 overflow-hidden rounded-[22px] border border-slate-200 bg-slate-100">
              <img src={report.image} alt={report.title} className="h-64 w-full object-cover" onError={(event) => {
                event.currentTarget.src = 'https://images.unsplash.com/photo-1521295121783-8a321d551ad2?auto=format&fit=crop&w=1200&q=80';
              }} />
            </div>

            <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">Location</p>
                <p className="mt-2 flex items-center gap-2 text-lg font-bold text-slate-800">
                  <MapPin className="text-blue-600" size={18} />
                  {report.location}
                </p>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">Category</p>
                <p className="mt-2 text-lg font-bold text-slate-800">{report.category}</p>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">Severity</p>
                <p className="mt-2 text-lg font-bold text-slate-800">{report.severity}</p>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">Date</p>
                <p className="mt-2 text-lg font-bold text-slate-800">{report.createdAt}</p>
              </div>
            </div>

            <div className="mt-6 rounded-2xl bg-slate-50 p-4">
              <div className="flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                {report.timeline.map((status, index) => (
                  <React.Fragment key={status}>
                    <div className="flex items-center gap-2">
                      <span className={`inline-flex h-6 w-6 items-center justify-center rounded-full ${index <= 2 ? 'bg-blue-600 text-white' : 'bg-slate-200 text-slate-500'}`}>
                        {index + 1}
                      </span>
                      <span>{status}</span>
                    </div>
                    {index < report.timeline.length - 1 && <span className="text-slate-300">→</span>}
                  </React.Fragment>
                ))}
              </div>
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => setSelectedId(report.id)}
                className="rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-bold text-white shadow-sm hover:bg-blue-700"
              >
                Track report
              </button>
              <button
                type="button"
                onClick={() => setSelectedId(report.id)}
                className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50"
              >
                View details
              </button>
            </div>

            {selectedReport && selectedReport.id === report.id && (
              <div className="mt-6 rounded-2xl border border-blue-100 bg-blue-50 p-4">
                <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-700">Live status</p>
                    <p className="mt-1 text-lg font-black text-slate-900">{report.status}</p>
                  </div>
                  <span className="rounded-full bg-white px-3 py-1.5 text-sm font-semibold text-blue-700 shadow-sm">12 km away — Available</span>
                </div>
                <p className="mt-3 text-sm leading-6 text-slate-600">
                  A response team has been assigned for this report and is preparing to reach the location. Updates will appear here as the case progresses.
                </p>
              </div>
            )}
          </article>
        ))}
      </div>
    </div>
  );
}

export default MyReports;
