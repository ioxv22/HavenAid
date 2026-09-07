import React, { useMemo, useState } from 'react';
import { AlertTriangle, BarChart3, CheckCircle2, CircleUserRound, HeartPulse, ShieldCheck, Users, Waves, X } from 'lucide-react';
import { ReportItem } from '../App';

type AdminDashboardProps = {
  reports: ReportItem[];
  role?: 'citizen' | 'responder' | 'admin';
  setRole?: (role: 'citizen' | 'responder' | 'admin') => void;
  language?: 'en' | 'ar';
  onUpdateReport?: (id: string, nextStatus: string, note?: string, responder?: string) => void;
};

const statusColor: Record<string, string> = {
  Pending: 'bg-amber-100 text-amber-700 border-amber-200',
  'Pending Review': 'bg-amber-100 text-amber-700 border-amber-200',
  'In Review': 'bg-blue-100 text-blue-700 border-blue-200',
  Approved: 'bg-emerald-100 text-emerald-700 border-emerald-200',
  Assigned: 'bg-sky-100 text-sky-700 border-sky-200',
  'In Progress': 'bg-violet-100 text-violet-700 border-violet-200',
  Escalated: 'bg-red-100 text-red-700 border-red-200',
  Resolved: 'bg-emerald-100 text-emerald-700 border-emerald-200',
};

const teamOptions = ['Infrastructure Team', 'Medical Response Team', 'Water & Relief Team', 'Emergency Coordination Team'];

function AdminDashboard({ reports, role = 'admin', setRole, language = 'en', onUpdateReport }: AdminDashboardProps) {
  const isArabic = language === 'ar';
  const [selectedInsight, setSelectedInsight] = useState<'all' | 'high' | 'medical' | 'infrastructure' | 'resources'>('all');
  const [selectedReport, setSelectedReport] = useState<ReportItem | null>(null);
  const [actionType, setActionType] = useState<'approve' | 'escalate' | 'resolve' | null>(null);
  const [assignmentTeam, setAssignmentTeam] = useState(teamOptions[0]);
  const [escalationReason, setEscalationReason] = useState('Critical risk');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const visibleReports = useMemo(() => {
    if (selectedInsight === 'all') return reports.slice(0, 4);
    if (selectedInsight === 'high') return reports.filter((report) => report.severity === 'High' || report.severity === 'Critical');
    if (selectedInsight === 'medical') return reports.filter((report) => report.category === 'Medical');
    if (selectedInsight === 'infrastructure') return reports.filter((report) => report.category === 'Infrastructure');
    return reports.filter((report) => report.needs.length > 0);
  }, [reports, selectedInsight]);

  const stats = useMemo(() => {
    const total = reports.length || 1;
    const pp = reports.filter((r) => r.severity === 'High' || r.severity === 'Critical').length;
    const resolved = reports.filter((r) => r.status === 'Resolved').length;
    const active = reports.filter((r) => r.status !== 'Resolved').length;
    return { total, priority: pp, resolved, active };
  }, [reports]);

  const handleAction = (type: 'approve' | 'escalate' | 'resolve', report: ReportItem) => {
    setActionType(type);
    setSelectedReport(report);
    setAssignmentTeam(teamOptions[0]);
    setEscalationReason('Critical risk');
  };

  const confirmAction = () => {
    if (!selectedReport || !onUpdateReport) return;
    setIsSubmitting(true);

    window.setTimeout(() => {
      if (actionType === 'approve') {
        onUpdateReport(selectedReport.id, 'Assigned', 'Issue approved and assigned to response team.', assignmentTeam);
      }
      if (actionType === 'escalate') {
        onUpdateReport(selectedReport.id, 'Escalated', `Escalated due to ${escalationReason}.`, 'Operations Unit');
      }
      if (actionType === 'resolve') {
        onUpdateReport(selectedReport.id, 'Resolved', `Issue resolved by admin at ${new Date().toISOString().slice(0, 10)}.`, 'Resolved by Admin');
      }

      setIsSubmitting(false);
      setActionType(null);
      setSelectedReport(null);
    }, 600);
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8 flex items-center justify-between gap-4">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">Admin console</p>
          <h1 className="mt-2 text-4xl font-black text-slate-900">Management Dashboard</h1>
        </div>
        {setRole && (
          <div className="flex rounded-full border border-slate-200 bg-white p-1 shadow-sm">
            {(['citizen', 'responder', 'admin'] as const).map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => setRole(option)}
                className={`rounded-full px-3 py-1.5 text-xs font-semibold capitalize ${role === option ? 'bg-blue-600 text-white' : 'text-slate-600'}`}
              >
                {option}
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-[0_16px_40px_rgba(15,23,42,0.04)]">
          <div className="mb-4 flex items-center justify-between">
            <span className="text-lg font-semibold text-slate-600">Total Population</span>
            <CircleUserRound className="text-slate-400" size={20} />
          </div>
          <div className="text-[2.1rem] font-black text-slate-900">25,000</div>
        </div>

        <div className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-[0_16px_40px_rgba(15,23,42,0.04)]">
          <div className="mb-4 flex items-center justify-between">
            <span className="text-lg font-semibold text-slate-600">Food Supply</span>
            <HeartPulse className="text-emerald-500" size={20} />
          </div>
          <div className="mt-4 h-3 overflow-hidden rounded-full bg-slate-200">
            <div className="h-full w-[85%] rounded-full bg-emerald-500" />
          </div>
          <div className="mt-3 text-2xl font-black text-slate-900">85%</div>
        </div>

        <div className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-[0_16px_40px_rgba(15,23,42,0.04)]">
          <div className="mb-4 flex items-center justify-between">
            <span className="text-lg font-semibold text-slate-600">Water Supply</span>
            <Waves className="text-blue-500" size={20} />
          </div>
          <div className="mt-4 h-3 overflow-hidden rounded-full bg-slate-200">
            <div className="h-full w-[78%] rounded-full bg-blue-500" />
          </div>
          <div className="mt-3 text-2xl font-black text-slate-900">78%</div>
        </div>

        <div className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-[0_16px_40px_rgba(15,23,42,0.04)]">
          <div className="mb-4 flex items-center justify-between">
            <span className="text-lg font-semibold text-slate-600">Active Alerts</span>
            <AlertTriangle className="text-red-500" size={20} />
          </div>
          <div className="text-[2.1rem] font-black text-slate-900">{stats.active}</div>
        </div>
      </div>

      <div className="mt-8 grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <div className="rounded-[30px] border border-slate-200 bg-white p-6 shadow-[0_16px_40px_rgba(15,23,42,0.04)]">
          <div className="mb-5 flex items-center justify-between">
            <h2 className="text-2xl font-black text-slate-900">Recent reports</h2>
            <button type="button" className="rounded-full border border-blue-200 bg-blue-50 px-3 py-1.5 text-xs font-bold uppercase tracking-[0.15em] text-blue-700">Live</button>
          </div>

          <div className="space-y-4">
            {visibleReports.map((report) => (
              <div key={report.id} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                  <div>
                    <p className="text-xl font-black text-slate-900">{report.title}</p>
                    <p className="mt-1 text-sm text-slate-500">{report.location}</p>
                  </div>
                  <span className={`inline-flex rounded-full border px-2.5 py-1 text-xs font-bold ${statusColor[report.status] || statusColor.Pending}`}>
                    {report.status}
                  </span>
                </div>
                <div className="mt-4 flex flex-wrap gap-3 text-xs uppercase tracking-[0.15em] text-slate-500">
                  <span>{report.category}</span>
                  <span>•</span>
                  <span>{report.severity}</span>
                  <span>•</span>
                  <span>{report.createdAt}</span>
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => handleAction('approve', report)}
                    className="rounded-xl bg-emerald-600 px-3 py-2 text-xs font-bold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-emerald-700"
                  >
                    {isArabic ? 'اعتماد وتعيين' : 'Approve & Assign'}
                  </button>
                  <button
                    type="button"
                    onClick={() => handleAction('escalate', report)}
                    className="rounded-xl bg-red-600 px-3 py-2 text-xs font-bold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-red-700"
                  >
                    {isArabic ? 'تصعيد' : 'Escalate'}
                  </button>
                  <button
                    type="button"
                    onClick={() => handleAction('resolve', report)}
                    className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-bold text-slate-700 shadow-sm transition hover:-translate-y-0.5 hover:bg-slate-100"
                  >
                    {isArabic ? 'حل المشكلة' : 'Resolve'}
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedReport(report)}
                    className="rounded-xl border border-blue-200 bg-blue-50 px-3 py-2 text-xs font-bold text-blue-700 shadow-sm transition hover:-translate-y-0.5 hover:bg-blue-100"
                  >
                    {isArabic ? 'عرض التفاصيل' : 'View Details'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-[30px] border border-slate-200 bg-white p-6 shadow-[0_16px_40px_rgba(15,23,42,0.04)]">
          <h2 className="text-2xl font-black text-slate-900">AI insights</h2>
          <div className="mt-5 space-y-4">
            {[
              { id: 'high', label: 'High Priority Reports', color: 'bg-blue-50', accent: 'text-blue-700' },
              { id: 'medical', label: 'Critical Medical Issues', color: 'bg-rose-50', accent: 'text-rose-700' },
              { id: 'infrastructure', label: 'Infrastructure Risks', color: 'bg-amber-50', accent: 'text-amber-700' },
              { id: 'resources', label: 'Resource Demand', color: 'bg-emerald-50', accent: 'text-emerald-700' },
            ].map((insight) => (
              <button
                key={insight.id}
                type="button"
                onClick={() => setSelectedInsight(insight.id as typeof selectedInsight)}
                className={`w-full rounded-2xl ${insight.color} p-4 text-left shadow-sm transition hover:-translate-y-0.5`}
              >
                <div className="flex items-center justify-between">
                  <span className={`font-semibold ${insight.accent}`}>{insight.label}</span>
                  <span className={`rounded-full bg-white px-2.5 py-1 text-xs font-bold ${insight.accent}`}>
                    {isArabic ? 'عرض التقارير' : 'View Reports'}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-8 rounded-[30px] border border-slate-200 bg-white p-6 shadow-[0_16px_40px_rgba(15,23,42,0.04)]">
        <div className="flex items-center gap-3">
          <BarChart3 className="text-blue-600" size={24} />
          <h2 className="text-2xl font-black text-slate-900">Resource predictions</h2>
        </div>

        <div className="mt-6 grid gap-6 md:grid-cols-3">
          {[
            { label: 'Food Supply', value: 85, color: 'bg-emerald-500', icon: HeartPulse },
            { label: 'Water Supply', value: 78, color: 'bg-blue-500', icon: Waves },
            { label: 'Medical Supply', value: 69, color: 'bg-red-500', icon: ShieldCheck },
          ].map(({ label, value, color, icon: Icon }) => (
            <div key={label} className="rounded-2xl bg-slate-50 p-4">
              <div className="mb-3 flex items-center justify-between text-sm font-semibold text-slate-600">
                <span>{label}</span>
                <Icon size={18} className="text-slate-500" />
              </div>
              <div className="h-3 overflow-hidden rounded-full bg-slate-200">
                <div className={`h-full rounded-full ${color}`} style={{ width: `${value}%` }} />
              </div>
              <div className="mt-3 text-2xl font-black text-slate-900">{value}%</div>
            </div>
          ))}
        </div>
      </div>

      {selectedReport && !actionType && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4">
          <div className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-[30px] bg-white p-6 shadow-[0_25px_80px_rgba(15,23,42,0.2)]">
            <div className="flex items-center justify-between">
              <h3 className="text-2xl font-black text-slate-900">{isArabic ? 'تفاصيل التقرير' : 'Report Details'}</h3>
              <button type="button" onClick={() => setSelectedReport(null)} className="rounded-full bg-slate-100 p-2 text-slate-600"><X size={18} /></button>
            </div>
            <div className="mt-5 grid gap-6 md:grid-cols-[0.8fr_1.2fr]">
              <img src={selectedReport.image} alt={selectedReport.title} className="h-full min-h-[200px] w-full rounded-[24px] object-cover" />
              <div className="space-y-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-700">{selectedReport.id}</p>
                  <h4 className="mt-2 text-2xl font-black text-slate-900">{selectedReport.title}</h4>
                </div>
                <p className="text-sm leading-7 text-slate-600">{selectedReport.description}</p>
                <div className="grid gap-3 sm:grid-cols-2">
                  <div className="rounded-2xl bg-slate-50 p-3"><p className="text-xs uppercase tracking-[0.15em] text-slate-500">Location</p><p className="mt-2 font-bold text-slate-900">{selectedReport.location}</p></div>
                  <div className="rounded-2xl bg-slate-50 p-3"><p className="text-xs uppercase tracking-[0.15em] text-slate-500">Category</p><p className="mt-2 font-bold text-slate-900">{selectedReport.category}</p></div>
                  <div className="rounded-2xl bg-slate-50 p-3"><p className="text-xs uppercase tracking-[0.15em] text-slate-500">Priority</p><p className="mt-2 font-bold text-slate-900">{selectedReport.severity}</p></div>
                  <div className="rounded-2xl bg-slate-50 p-3"><p className="text-xs uppercase tracking-[0.15em] text-slate-500">Status</p><p className="mt-2 font-bold text-slate-900">{selectedReport.status}</p></div>
                </div>
                <div className="rounded-2xl bg-blue-50 p-4">
                  <p className="text-xs uppercase tracking-[0.2em] text-blue-700">AI Recommendation</p>
                  <p className="mt-2 text-sm font-semibold text-slate-700">{selectedReport.adminNote || 'Assess and repair critical infrastructure damage.'}</p>
                </div>
                <div className="rounded-2xl bg-slate-50 p-4">
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Required resources</p>
                  <ul className="mt-2 list-disc pl-5 text-sm text-slate-700">
                    {(selectedReport.needs.length ? selectedReport.needs : ['Temporary shelter', 'Water support', 'Infrastructure assessment']).map((need) => <li key={need}>{need}</li>)}
                  </ul>
                </div>
              </div>
            </div>
            <div className="mt-6 rounded-2xl bg-slate-50 p-4">
              <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Timeline</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {selectedReport.timeline.map((item, index) => (
                  <span key={`${item}-${index}`} className="rounded-full border border-slate-200 bg-white px-2.5 py-1 text-xs font-semibold text-slate-700">{item}</span>
                ))}
              </div>
            </div>
            <div className="mt-5 flex justify-end">
              <button type="button" onClick={() => setSelectedReport(null)} className="rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-bold text-slate-700">Close</button>
            </div>
          </div>
        </div>
      )}

      {selectedReport && actionType && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-900/50 p-4">
          <div className="w-full max-w-xl rounded-[30px] bg-white p-6 shadow-[0_25px_80px_rgba(15,23,42,0.2)]">
            <div className="flex items-center justify-between">
              <h3 className="text-2xl font-black text-slate-900">
                {actionType === 'approve' ? (isArabic ? 'اعتماد وتعيين الاستجابة' : 'Approve & Assign Response') : actionType === 'escalate' ? (isArabic ? 'تصعيد البلاغ' : 'Escalate Issue') : (isArabic ? 'حل البلاغ' : 'Resolve Issue')}
              </h3>
              <button type="button" onClick={() => { setActionType(null); setSelectedReport(null); }} className="rounded-full bg-slate-100 p-2 text-slate-600"><X size={18} /></button>
            </div>

            {actionType === 'approve' && (
              <div className="mt-5 space-y-5">
                <div className="rounded-2xl bg-slate-50 p-4">
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Issue</p>
                  <p className="mt-2 text-lg font-black text-slate-900">{selectedReport.title}</p>
                  <p className="mt-2 text-sm text-slate-600">{selectedReport.location}</p>
                  <p className="mt-3 text-sm text-slate-600"><span className="font-bold">Priority:</span> {selectedReport.severity}</p>
                </div>
                <div className="rounded-2xl bg-blue-50 p-4 text-sm leading-7 text-slate-700">
                  <p className="font-bold text-blue-700">AI Recommendation:</p>
                  <p className="mt-2">“Assess and repair critical infrastructure damage.”</p>
                </div>
                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">Assign Response Team</label>
                  <select value={assignmentTeam} onChange={(e) => setAssignmentTeam(e.target.value)} className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-3 py-3 text-sm text-slate-700 outline-none focus:border-blue-400 focus:bg-white">
                    {teamOptions.map((team) => <option key={team} value={team}>{team}</option>)}
                  </select>
                  <div className="mt-3 inline-flex rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">Recommended by AI</div>
                </div>
              </div>
            )}

            {actionType === 'escalate' && (
              <div className="mt-5 space-y-5">
                <div className="rounded-2xl bg-slate-50 p-4">
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Current Priority</p>
                  <p className="mt-2 text-2xl font-black text-slate-900">{selectedReport.severity}</p>
                </div>
                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">Reason</label>
                  <select value={escalationReason} onChange={(e) => setEscalationReason(e.target.value)} className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-3 py-3 text-sm text-slate-700 outline-none focus:border-blue-400 focus:bg-white">
                    {['Critical risk', 'More resources required', 'Immediate attention needed', 'Infrastructure danger', 'Medical risk', 'Other'].map((reason) => <option key={reason} value={reason}>{reason}</option>)}
                  </select>
                </div>
              </div>
            )}

            {actionType === 'resolve' && (
              <div className="mt-5 space-y-5">
                <div className="rounded-2xl bg-slate-50 p-4">
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Issue</p>
                  <p className="mt-2 text-lg font-black text-slate-900">{selectedReport.title}</p>
                  <p className="mt-2 text-sm text-slate-600">{selectedReport.location}</p>
                  <p className="mt-2 text-sm text-slate-600"><span className="font-bold">Assigned team:</span> {selectedReport.responder || 'Field Response Team'}</p>
                  <p className="mt-2 text-sm text-slate-600"><span className="font-bold">Current status:</span> {selectedReport.status}</p>
                </div>
                <div className="rounded-2xl bg-amber-50 p-4 text-sm font-semibold text-amber-800">
                  Are you sure this issue has been resolved?
                </div>
              </div>
            )}

            <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
              <button type="button" onClick={() => { setActionType(null); setSelectedReport(null); }} className="rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-bold text-slate-700">{isArabic ? 'إلغاء' : 'Cancel'}</button>
              <button type="button" disabled={isSubmitting} onClick={confirmAction} className="rounded-xl bg-blue-600 px-5 py-3 text-sm font-bold text-white shadow-sm disabled:cursor-not-allowed disabled:opacity-70">
                {isSubmitting ? (actionType === 'approve' ? (isArabic ? 'تعيين...' : 'Assigning...') : actionType === 'escalate' ? (isArabic ? 'تصعيد...' : 'Escalating...') : (isArabic ? 'حل...' : 'Resolving...')) : (actionType === 'approve' ? (isArabic ? 'تأكيد التعيين' : 'Confirm Assignment') : actionType === 'escalate' ? (isArabic ? 'تأكيد التصعيد' : 'Confirm Escalation') : (isArabic ? 'تحديد كمحلولة' : 'Mark as Resolved'))}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminDashboard;
