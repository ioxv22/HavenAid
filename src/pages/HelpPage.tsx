import React from 'react';
import { BookOpen, Headphones, MessageSquareText, ShieldCheck } from 'lucide-react';

type HelpPageProps = {
  language?: 'en' | 'ar';
};

function HelpPage({ language = 'en' }: HelpPageProps) {
  const isArabic = language === 'ar';
  const helpItems = [
    {
      icon: BookOpen,
      title: isArabic ? 'إبلاغ جديد' : 'Submit a report',
      description: isArabic ? 'ارفع صورة، اكتب تفاصيل الحدث، ثم استخدم الذكاء الاصطناعي لتقييمه.' : 'Upload a photo, describe the issue, and let AI triage the request.',
    },
    {
      icon: MessageSquareText,
      title: isArabic ? 'تتبع الحالات' : 'Track cases',
      description: isArabic ? 'تابع حالة كل بلاغ في خريطة المشاريع أو صفحة تقاريرك.' : 'Monitor case progress in the map or your personal reports dashboard.',
    },
    {
      icon: ShieldCheck,
      title: isArabic ? 'الأمان والخصوصية' : 'Safety & privacy',
      description: isArabic ? 'تأكد من مشاركة الموقع فقط عند الحاجة وتحقق من البيانات الحساسة.' : 'Review location sharing and confirm only the minimum necessary data is disclosed.',
    },
    {
      icon: Headphones,
      title: isArabic ? 'الدعم' : 'Support',
      description: isArabic ? 'تواصل مع فريق الاستجابة أو استخدم معلومات المساعدة داخل التطبيق.' : 'Contact the response team or use built-in guidance for urgent updates.',
    },
  ];

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-8">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">{isArabic ? 'مساعدة' : 'Help'}</p>
        <h1 className="mt-2 text-4xl font-black text-slate-900">{isArabic ? 'كيف تساعد المجتمع بشكل أسرع' : 'How to act faster for the community'}</h1>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {helpItems.map(({ icon: Icon, title, description }) => (
          <div key={title} className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
            <div className="mb-4 inline-flex rounded-2xl bg-blue-100 p-3 text-blue-700">
              <Icon size={24} />
            </div>
            <h2 className="text-xl font-black text-slate-900">{title}</h2>
            <p className="mt-3 text-sm leading-7 text-slate-600">{description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HelpPage;
