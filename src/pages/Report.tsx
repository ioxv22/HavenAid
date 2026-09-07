import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AlertTriangle, ArrowRight, MapPin, ShieldCheck } from 'lucide-react';
import { analyzeDemoIssue, ReportItem } from '../App';
import ImageUploader from '../components/ImageUploader';

type ReportProps = {
  onSubmit: (payload: Omit<ReportItem, 'id' | 'status' | 'createdAt' | 'timeline' | 'organization'> & { image?: string }) => void;
  language?: 'en' | 'ar';
  settings?: {
    camera?: boolean;
  };
};

const emergencyOptions = ['Flooding', 'Medical', 'Food & Water', 'Infrastructure', 'Shelter', 'Refugee Support', 'Other'];

const demoPresets = [
  {
    name: 'Flooded road access',
    title: 'Road collapse near Al-Dahar village',
    description: 'Heavy rain caused part of the main road to collapse and cut off access to the clinic and market. Several families are stranded and need emergency assistance.',
    location: 'Northern Region, Village of Al-Dahar',
    category: 'Infrastructure',
    people: '45+',
    urgency: 'High',
    severity: 'High',
  },
  {
    name: 'Clinic stock crisis',
    title: 'Medical supplies urgently running low in the local clinic',
    description: 'The local clinic is running low on antibiotics, wound care supplies, and basic medicine for children. Waiting times have increased and the community is worried about access.',
    location: 'Sana\'a, Yemen',
    category: 'Medical',
    people: '120',
    urgency: 'Critical',
    severity: 'Critical',
  },
  {
    name: 'Water distribution need',
    title: 'Water shortages affecting multiple families in the district',
    description: 'Water tanks are running low, residents are relying on unsafe sources, and households need clean water and hygiene support before the next supply cycle.',
    location: 'Kabul, Afghanistan',
    category: 'Food & Water',
    people: '300+',
    urgency: 'High',
    severity: 'High',
  },
];

function Report({ onSubmit, language = 'en', settings }: ReportProps) {
  const navigate = useNavigate();
  const isArabic = language === 'ar';
  const [selectedFile, setSelectedFile] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [form, setForm] = useState({
    title: 'Road collapse near Al-Dahar village',
    description: 'Heavy rain caused part of the main road to collapse and cut off access to the clinic and market. Several families are stranded and need emergency assistance.',
    location: 'Northern Region, Village of Al-Dahar',
    category: 'Infrastructure',
    people: '45+',
    urgency: 'High',
    severity: 'High',
  });

  const aiAssessment = useMemo(() => analyzeDemoIssue({
    description: form.description,
    category: form.category,
    location: form.location,
    urgency: form.urgency,
    people: form.people,
    title: form.title,
  }), [form]);

  const handleImageChange = (file: File | null, preview: string | null) => {
    if (!file || !preview) {
      setSelectedFile(null);
      return;
    }
    setSelectedFile(preview);
  };

  const handleAnalyze = () => {
    setIsAnalyzing(true);
    setIsSubmitted(false);
    window.setTimeout(() => {
      setIsAnalyzing(false);
      setIsSubmitted(true);
    }, 2200);
  };

  const handleSubmit = () => {
    if (!form.description.trim() || !form.location.trim()) {
      return;
    }

    onSubmit({
      title: form.title || 'Emergency assistance needed',
      description: form.description,
      location: form.location,
      category: form.category,
      severity: form.severity,
      urgency: form.urgency,
      people: form.people,
      image: selectedFile || 'https://images.unsplash.com/photo-1521295121783-8a321d551ad2?auto=format&fit=crop&w=1200&q=80',
      needs: aiAssessment.needs,
    });

    setIsSubmitted(true);
    navigate('/my-reports');
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8 flex items-center justify-between gap-3">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">Humanitarian response</p>
          <h1 className="mt-2 text-4xl font-black text-slate-900">What’s happening?</h1>
        </div>
        <button type="button" onClick={handleAnalyze} disabled={isAnalyzing} className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-700 shadow-sm hover:bg-blue-100 disabled:cursor-wait disabled:opacity-70">
          <ShieldCheck size={16} />
          AI Demo Mode
        </button>
      </div>

      <div className="mb-8 rounded-[28px] border border-blue-100 bg-gradient-to-r from-blue-50 to-cyan-50 p-5 shadow-sm">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-700">Quick demo</p>
            <h2 className="mt-2 text-2xl font-black text-slate-900">Try one realistic scenario</h2>
          </div>
          <div className="flex flex-wrap gap-2">
            {demoPresets.map((preset) => (
              <button
                key={preset.name}
                type="button"
                onClick={() => setForm({ ...preset })}
                className="rounded-full border border-blue-200 bg-white px-3 py-2 text-sm font-semibold text-blue-700 transition hover:border-blue-400 hover:bg-blue-50"
              >
                {preset.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="grid gap-8 xl:grid-cols-[1.1fr_0.9fr]">
        <section className="rounded-[30px] border border-slate-200 bg-white p-5 shadow-[0_12px_30px_rgba(15,23,42,0.06)] sm:p-7">
          <div className="space-y-6">
            <div>
              <label className="mb-3 block text-sm font-semibold text-slate-700">
                {isArabic ? 'تحميل / كاميرا' : 'Upload / Camera'}
              </label>
              <ImageUploader
                language={language}
                value={selectedFile}
                onChange={(file, preview) => handleImageChange(file, preview)}
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">{isArabic ? 'عنوان البلاغ' : 'Report title'}</label>
              <input
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                className="mb-4 w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-base text-slate-700 outline-none transition focus:border-blue-400 focus:bg-white"
                placeholder={isArabic ? 'ماذا حدث؟' : 'What happened?'}
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">{isArabic ? 'الوصف' : 'Description'}</label>
              <textarea
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                rows={5}
                className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-base text-slate-700 outline-none transition focus:border-blue-400 focus:bg-white"
                placeholder={isArabic ? 'صف المشكلة...' : 'Describe the problem...'}
              />
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">{isArabic ? 'الموقع' : 'Location'}</label>
                <div className="rounded-2xl border border-slate-300 bg-slate-50 px-3 py-3">
                  <div className="flex items-center gap-2 text-slate-600">
                    <MapPin size={18} className="text-blue-500" />
                    <input
                      value={form.location}
                      onChange={(e) => setForm({ ...form, location: e.target.value })}
                      className="w-full bg-transparent text-sm outline-none"
                    />
                  </div>
                </div>
              </div>
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">{isArabic ? 'الفئة' : 'Category'}</label>
                <select
                  value={form.category}
                  onChange={(e) => setForm({ ...form, category: e.target.value })}
                  className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-3 py-3 text-sm text-slate-700 outline-none transition focus:border-blue-400 focus:bg-white"
                >
                  {emergencyOptions.map((option) => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">{isArabic ? 'عدد المتأثرين' : 'People affected'}</label>
                <input
                  value={form.people}
                  onChange={(e) => setForm({ ...form, people: e.target.value })}
                  className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-3 py-3 text-sm outline-none focus:border-blue-400 focus:bg-white"
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">{isArabic ? 'درجة الاستعجال' : 'Urgency'}</label>
                <select
                  value={form.urgency}
                  onChange={(e) => setForm({ ...form, urgency: e.target.value })}
                  className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-3 py-3 text-sm text-slate-700 outline-none transition focus:border-blue-400 focus:bg-white"
                >
                  <option>Low</option>
                  <option>Medium</option>
                  <option>High</option>
                  <option>Critical</option>
                </select>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={handleAnalyze}
                className="inline-flex flex-1 items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-blue-600 to-blue-500 px-5 py-4 text-base font-bold text-white shadow-[0_12px_30px_rgba(37,99,235,0.28)] transition hover:brightness-105 disabled:cursor-not-allowed disabled:opacity-80"
                disabled={isAnalyzing}
              >
                {isAnalyzing ? (isArabic ? 'جارٍ تحليل الصورة...' : 'Analyzing with AI...') : (isArabic ? 'تحليل باستخدام الذكاء الاصطناعي' : 'Analyze with AI')}
                {!isAnalyzing && <ArrowRight size={18} />}
              </button>

              <button
                onClick={handleSubmit}
                className="inline-flex items-center justify-center rounded-2xl bg-gradient-to-r from-emerald-500 to-green-500 px-5 py-4 text-base font-bold text-white shadow-[0_12px_30px_rgba(16,185,129,0.25)] transition hover:brightness-105"
              >
                {isArabic ? 'إرسال البلاغ' : 'Send Report'}
              </button>
            </div>
          </div>
        </section>

        <aside className="rounded-[30px] border border-slate-200 bg-slate-50 p-5 shadow-[0_12px_30px_rgba(15,23,42,0.06)] sm:p-7">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-2xl font-black text-slate-900">{isArabic ? 'تحليل الذكاء الاصطناعي' : 'AI Analysis'}</h2>
            {isSubmitted && (
              <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-bold uppercase tracking-[0.18em] text-green-700">
                Ready
              </span>
            )}
          </div>

          {isAnalyzing ? (
            <div className="space-y-5">
              {['Analyzing Image', 'Understanding Description', 'Assessing Severity', 'Identifying Needs', 'Finding Response Organizations', 'Generating Action Plan'].map((step, index) => (
                <div key={step} className="space-y-2">
                  <div className="flex items-center justify-between text-sm font-medium text-slate-700">
                    <span>{step}</span>
                    <span>{index + 1}/6</span>
                  </div>
                  <div className="h-2.5 overflow-hidden rounded-full bg-slate-200">
                    <div className="h-full rounded-full bg-gradient-to-r from-blue-500 to-cyan-400 transition-all duration-700" style={{ width: `${((index + 1) / 6) * 100}%` }} />
                  </div>
                </div>
              ))}
            </div>
          ) : isSubmitted ? (
            <div className="space-y-5">
              <div className="rounded-2xl bg-white p-4 shadow-sm">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-slate-500">{isArabic ? 'المشكلة المكتشفة' : 'Problem detected'}</p>
                  <span className="rounded-full bg-red-100 px-2.5 py-1 text-xs font-bold uppercase tracking-[0.18em] text-red-700">{aiAssessment.severity}</span>
                </div>
                <p className="mt-2 text-2xl font-black text-slate-900">{aiAssessment.category}</p>
                <div className="mt-3 flex items-center justify-between rounded-xl bg-blue-50 px-3 py-2 text-sm font-semibold text-blue-700">
                  <span>{isArabic ? 'فريق الاستجابة' : 'Response team'}</span>
                  <span>{isArabic ? '12 كم بعيد — متاح' : '12 km away — Available'}</span>
                </div>
                <div className="mt-4 flex items-center gap-3">
                  <div className="text-sm text-slate-500">{isArabic ? 'ثقة الذكاء الاصطناعي' : 'AI confidence'}</div>
                  <div className="h-2.5 w-28 overflow-hidden rounded-full bg-slate-200">
                    <div className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-green-500" style={{ width: `${aiAssessment.confidence}%` }} />
                  </div>
                  <div className="text-sm font-semibold text-slate-700">{aiAssessment.confidence}%</div>
                </div>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <div className="rounded-2xl bg-white p-4 shadow-sm">
                  <p className="text-sm text-slate-500">{isArabic ? 'الأشخاص المتأثرون' : 'People potentially affected'}</p>
                  <p className="mt-2 text-2xl font-black text-slate-900">{form.people}</p>
                </div>
                <div className="rounded-2xl bg-white p-4 shadow-sm">
                  <p className="text-sm text-slate-500">{isArabic ? 'الاستجابة الموصى بها' : 'Recommended response'}</p>
                  <p className="mt-2 text-lg font-bold text-blue-600">{aiAssessment.severity} priority</p>
                </div>
              </div>

              <div className="rounded-2xl bg-white p-4 shadow-sm">
                <p className="mb-3 text-base font-bold text-slate-800">{isArabic ? 'الاحتياجات الأساسية' : 'Key needs'}</p>
                <ul className="space-y-2 text-sm text-slate-700">
                  {aiAssessment.needs.map((need) => (
                    <li key={need} className="flex items-center gap-2">
                      <span className="inline-block h-2 w-2 rounded-full bg-green-500" />
                      {need}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-2xl bg-white p-4 shadow-sm">
                <p className="mb-3 text-base font-bold text-slate-800">{isArabic ? 'الإجراءات الموصى بها' : 'Recommended actions'}</p>
                <ol className="space-y-2 text-sm text-slate-700">
                  {aiAssessment.actions.map((action, index) => (
                    <li key={action} className="flex gap-3">
                      <span className="mt-0.5 inline-flex h-5 w-5 items-center justify-center rounded-full bg-blue-600 text-[10px] font-bold text-white">{index + 1}</span>
                      <span>{action}</span>
                    </li>
                  ))}
                </ol>
              </div>

              <button onClick={handleSubmit} className="w-full rounded-2xl bg-gradient-to-r from-emerald-500 to-green-500 px-4 py-3 text-base font-bold text-white shadow-[0_10px_20px_rgba(16,185,129,0.25)] transition hover:brightness-105">
                {isArabic ? 'إرسال البلاغ إلى شبكة الاستجابة' : 'Send report to response network'}
              </button>
            </div>
          ) : (
            <div className="flex min-h-[420px] flex-col items-center justify-center rounded-[24px] border border-dashed border-slate-300 bg-white p-6 text-center">
              <AlertTriangle className="mb-4 text-amber-500" size={42} />
              <p className="text-lg font-bold text-slate-800">{isArabic ? 'لم يتم إجراء التحليل بعد' : 'No AI analysis yet'}</p>
              <p className="mt-2 max-w-xs text-sm text-slate-500">{isArabic ? 'ارفع صورة واكتب وصفاً لمحاكاة عملية فرز البلاغات الإنسانية.' : 'Upload a photo and description to simulate the humanitarian triage workflow.'}</p>
            </div>
          )}
        </aside>
      </div>
    </div>
  );
}

export default Report;
