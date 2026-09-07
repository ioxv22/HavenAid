import React from 'react';
import { ArrowRight, CheckCircle2, ShieldCheck, Sparkles, Users } from 'lucide-react';

type PresentationModeProps = {
  language?: 'en' | 'ar';
};

function PresentationMode({ language = 'en' }: PresentationModeProps) {
  const isArabic = language === 'ar';

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="rounded-[32px] border border-blue-200 bg-gradient-to-br from-blue-700 via-blue-600 to-cyan-500 p-8 text-white shadow-[0_25px_70px_rgba(37,99,235,0.28)]">
        <div className="mb-6 flex items-center justify-between gap-3">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-100">HavenAid</p>
            <h1 className="mt-2 text-4xl font-black">{isArabic ? 'وضع العرض التقديمي' : 'Presentation mode'}</h1>
          </div>
          <div className="rounded-full border border-white/30 bg-white/10 px-4 py-2 text-sm font-semibold">
            {isArabic ? 'مؤثر في الوقت الفعلي' : 'Live impact'}
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {[
            { icon: Sparkles, label: isArabic ? 'الذكاء الاصطناعي' : 'AI triage', value: '96%' },
            { icon: Users, label: isArabic ? 'الاستجابة' : 'Response coordination', value: '1.8x' },
            { icon: ShieldCheck, label: isArabic ? 'الثقة' : 'Trust & safety', value: '24/7' },
          ].map(({ icon: Icon, label, value }) => (
            <div key={label} className="rounded-[28px] border border-white/15 bg-white/5 p-5 backdrop-blur-sm">
              <Icon size={24} className="mb-3" />
              <p className="text-sm text-blue-100">{label}</p>
              <div className="mt-3 text-3xl font-black">{value}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="rounded-[30px] border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-2xl font-black text-slate-900">{isArabic ? 'القيمة المضافة' : 'Why it matters'}</h2>
          <div className="mt-5 space-y-4">
            {[
              isArabic ? 'يساعد المجتمعات على الإبلاغ بسرعة عن الحوادث الحرجة.' : 'Helps communities report emergencies in seconds.',
              isArabic ? 'يُحسن تخصيص الموارد من خلال تحليل أولي ذكي.' : 'Improves resource allocation through AI-backed prioritization.',
              isArabic ? 'يربط المتطوعين والمنظمات عبر رؤية موحدة.' : 'Connects responders and organizations through one shared picture.',
            ].map((item) => (
              <div key={item} className="flex items-start gap-3 rounded-2xl bg-slate-50 p-4">
                <CheckCircle2 className="mt-1 text-emerald-500" size={20} />
                <span className="text-slate-700">{item}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-[30px] border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-2xl font-black text-slate-900">{isArabic ? 'تدفق التطبيق' : 'Application flow'}</h2>
          <div className="mt-5 space-y-3">
            {['Report', 'Analyze', 'Match', 'Respond'].map((step, index) => (
              <div key={step} className="flex items-center gap-3 rounded-2xl bg-slate-50 p-3">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-sm font-bold text-white">{index + 1}</span>
                <span className="font-semibold text-slate-700">{step}</span>
                {index < 3 && <ArrowRight className="ml-auto text-slate-400" size={18} />}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default PresentationMode;
