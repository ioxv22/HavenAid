import React, { useMemo } from 'react';
import { MapPin, Waves, Building2, HeartPulse, UtensilsCrossed } from 'lucide-react';
import { ReportItem } from '../App';

type MapPageProps = {
  reports: ReportItem[];
};

const baseMarkers = [
  { id: 1, name: 'Flooding', severity: 'High', x: '18%', y: '26%', category: 'Flooding', color: 'bg-red-500', icon: Waves },
  { id: 2, name: 'Medical', severity: 'Critical', x: '46%', y: '48%', category: 'Medical', color: 'bg-amber-500', icon: HeartPulse },
  { id: 3, name: 'Infrastructure', severity: 'Medium', x: '72%', y: '36%', category: 'Infrastructure', color: 'bg-blue-500', icon: Building2 },
  { id: 4, name: 'Food & Water', severity: 'High', x: '58%', y: '71%', category: 'Food & Water', color: 'bg-emerald-500', icon: UtensilsCrossed },
];

function MapPage({ reports }: MapPageProps) {
  const activeMarkers = useMemo(() => {
    const mapReports = reports.slice(0, 4);
    return mapReports.length ? mapReports.map((report, index) => ({
      id: report.id,
      name: report.category,
      severity: report.severity,
      x: baseMarkers[index % baseMarkers.length].x,
      y: baseMarkers[index % baseMarkers.length].y,
      category: report.category,
      color: baseMarkers[index % baseMarkers.length].color,
      icon: baseMarkers[index % baseMarkers.length].icon,
    })) : baseMarkers;
  }, [reports]);

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8 flex items-center justify-between gap-3">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">Humanitarian overview</p>
          <h1 className="mt-2 text-4xl font-black text-slate-900">Live Map</h1>
        </div>
        <div className="flex flex-wrap gap-2">
          {['All', 'Emergency', 'Medical', 'Flooding', 'Infrastructure', 'Food & Water', 'Shelter'].map((filter) => (
            <button
              key={filter}
              className={`rounded-full border px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.12em] ${filter === 'All' ? 'border-blue-200 bg-blue-50 text-blue-700' : 'border-slate-200 bg-white text-slate-600'}`}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      <div className="grid gap-8 xl:grid-cols-[1.4fr_0.6fr]">
        <div className="relative overflow-hidden rounded-[30px] border border-slate-200 bg-white p-3 shadow-[0_12px_30px_rgba(15,23,42,0.05)]">
          <div className="relative h-[560px] overflow-hidden rounded-[24px] bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.2),transparent_30%),linear-gradient(135deg,#e2e8f0_0%,#f8fafc_100%)]">
            <div className="absolute inset-0 opacity-60" style={{ backgroundImage: 'linear-gradient(rgba(148,163,184,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(148,163,184,0.08) 1px, transparent 1px)', backgroundSize: '36px 36px' }} />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(14,165,233,0.12),transparent_18%),radial-gradient(circle_at_70%_60%,rgba(34,197,94,0.10),transparent_18%)]" />

            {activeMarkers.map((marker) => {
              const Icon = marker.icon;
              return (
                <button
                  key={marker.id}
                  className="absolute -translate-x-1/2 -translate-y-1/2"
                  style={{ left: marker.x, top: marker.y }}
                >
                  <div className={`flex h-12 w-12 items-center justify-center rounded-full ${marker.color} shadow-lg ring-4 ring-white/80`}>
                    <Icon size={20} className="text-white" />
                  </div>
                </button>
              );
            })}

            <div className="absolute left-6 top-6 rounded-2xl border border-slate-200 bg-white/80 px-4 py-3 backdrop-blur-md shadow-lg">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Active reports</p>
              <p className="mt-1 text-3xl font-black text-slate-900">{reports.length || 12}</p>
            </div>
          </div>
        </div>

        <aside className="space-y-4">
          <div className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-[0_12px_30px_rgba(15,23,42,0.04)]">
            <div className="flex items-center gap-2">
              <MapPin className="text-blue-600" size={18} />
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Selected incident</p>
            </div>
            <h3 className="mt-3 text-2xl font-black text-slate-900">{reports[0]?.category || 'Flooding'}</h3>
            <div className="mt-3 space-y-3 text-sm text-slate-600">
              <div className="flex items-center justify-between"><span>Severity</span><span className="font-bold text-red-600">{reports[0]?.severity || 'High'}</span></div>
              <div className="flex items-center justify-between"><span>Time reported</span><span className="font-bold">2h ago</span></div>
              <div className="flex items-center justify-between"><span>People affected</span><span className="font-bold">{reports[0]?.people || '45+'}</span></div>
              <div className="flex items-center justify-between"><span>Status</span><span className="font-bold text-amber-600">Active response</span></div>
            </div>
          </div>

          <div className="rounded-[28px] border border-slate-200 bg-slate-50 p-5 shadow-[0_12px_30px_rgba(15,23,42,0.04)]">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Legend</p>
            <div className="mt-4 space-y-3 text-sm text-slate-700">
              {[
                ['High priority', 'bg-red-500'],
                ['Medical', 'bg-amber-500'],
                ['Infrastructure', 'bg-blue-500'],
                ['Food & Water', 'bg-emerald-500'],
              ].map(([label, color]) => (
                <div key={label} className="flex items-center gap-3">
                  <span className={`inline-block h-3 w-3 rounded-full ${color}`} />
                  {label}
                </div>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}

export default MapPage;
