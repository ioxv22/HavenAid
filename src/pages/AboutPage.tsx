import React from 'react';
import { BrainCircuit, ShieldCheck, Users } from 'lucide-react';

type AboutPageProps = {
  language?: 'en' | 'ar';
};

function AboutPage({ language = 'en' }: AboutPageProps) {
  const isArabic = language === 'ar';

  const sections = [
    {
      icon: BrainCircuit,
      title: isArabic ? 'حل المشكلات الإنسانية' : 'The Problem',
      text: isArabic
        ? 'غالبًا ما تكون المشكلات الإنسانية صعبة في التبليغ والتصنيف وربطها بالمصادر المناسبة.'
        : 'Humanitarian problems can be difficult to report, classify, and connect with the right response resources.',
    },
    {
      icon: Users,
      title: isArabic ? 'فكرة المنصة' : 'Our Concept',
      text: isArabic
        ? 'تجمع HavenAid بين تحليل الصور والنصوص ودعم اتخاذ القرار ومطابقة الاستجابة.'
        : 'HavenAid combines image analysis, text analysis, decision support, and responder matching.',
    },
    {
      icon: ShieldCheck,
      title: isArabic ? 'كيف يساعد الذكاء الاصطناعي' : 'How AI Helps',
      text: isArabic
        ? 'التعرف على الصور، معالجة اللغة الطبيعية، تقييم الخطورة، توصية الموارد، مطابقة المجيب.'
        : 'Image Recognition, Natural Language Processing, Severity Assessment, Resource Recommendation, Responder Matching.',
    },
  ];

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-10 text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">{isArabic ? 'من نحن' : 'About'}</p>
        <h1 className="mt-3 text-4xl font-black text-slate-900">{isArabic ? 'نبني نظامًا إنسانيًا أكثر فاعلية' : 'Building a faster, more connected humanitarian response'}</h1>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {sections.map(({ icon: Icon, title, text }) => (
          <div key={title} className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
            <div className="mb-4 inline-flex rounded-2xl bg-blue-100 p-3 text-blue-700">
              <Icon size={26} />
            </div>
            <h2 className="text-xl font-black text-slate-900">{title}</h2>
            <p className="mt-3 text-sm leading-7 text-slate-600">{text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AboutPage;
