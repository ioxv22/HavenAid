import React, { useMemo, useState } from 'react';
import { ArrowRight, CheckCircle2, Clock3, Sparkles, X } from 'lucide-react';

type SuccessStoriesPageProps = {
  language?: 'en' | 'ar';
};

type Story = {
  title: string;
  category: string;
  description: string;
  impact: string;
  image: string;
  workflow: string[];
  resources: string[];
  timeline: string[];
};

const stories: Story[] = [
  {
    title: 'Clean Water Initiative',
    category: 'Water',
    description: 'A prototype scenario showing how a local response team could coordinate water deliveries and protect public health during a crisis.',
    impact: 'Faster coordination and better resource allocation.',
    image: 'https://images.unsplash.com/photo-1541534401786-2077eed87a74?auto=format&fit=crop&w=1200&q=80',
    workflow: [
      'Report the water shortage',
      'Analyze the situation',
      'Estimate severity',
      'Identify required resources',
      'Recommend a response',
      'Track progress',
    ],
    resources: ['Water purification kits', 'Mobile supply vans', 'Hygiene packs', 'Community health volunteers'],
    timeline: ['0h Report received', '1h AI triage complete', '2h Relief team notified', '6h Distribution initiated'],
  },
  {
    title: 'Emergency Medical Response',
    category: 'Medical',
    description: 'A demonstration of how medical teams can be prioritized when alert volume and criticality rise in a region.',
    impact: 'Improved triage and faster aid routing.',
    image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=1200&q=80',
    workflow: [
      'Identify critical medical need',
      'Review local capacity',
      'Prioritize urgent cases',
      'Assign field response',
      'Support transport and treatment',
      'Monitor follow-up',
    ],
    resources: ['Ambulance units', 'Medical kits', 'Pharmacy supplies', 'Field nurses'],
    timeline: ['0h Case flagged', '30m Triage review', '90m Response team mobilized', '4h Treatment begins'],
  },
  {
    title: 'Flood Recovery',
    category: 'Disaster Relief',
    description: 'A simulated recovery workflow showing how AI-supported prioritization can coordinate shelter and infrastructure support.',
    impact: 'Better coordination during large-scale disruption.',
    image: 'https://images.unsplash.com/photo-1521295121783-8a321d551ad2?auto=format&fit=crop&w=1200&q=80',
    workflow: [
      'Detect flood-related impact',
      'Assess population exposure',
      'Map shelter needs',
      'Recommend infrastructure teams',
      'Coordinate food and water',
      'Track recovery milestones',
    ],
    resources: ['Temporary shelter kits', 'Repair crews', 'Food packages', 'Water delivery plan'],
    timeline: ['0h Flood report logged', '45m Risk assessment', '2h Shelter routing', '1 day Recovery staging'],
  },
];

function SuccessStoriesPage({ language = 'en' }: SuccessStoriesPageProps) {
  const isArabic = language === 'ar';
  const [selectedStory, setSelectedStory] = useState<Story | null>(null);
  const [scenarioOpen, setScenarioOpen] = useState(false);
  const [step, setStep] = useState(0);
  const [problem, setProblem] = useState('Water shortage');
  const [priority, setPriority] = useState('High');
  const [resources, setResources] = useState<string[]>(['Water purification kits', 'Community volunteers']);
  const [scenarioComplete, setScenarioComplete] = useState(false);

  const scenarioSummary = useMemo(() => ({
    quality: '92%',
    responseTime: '18 min',
    resources: resources.join(', '),
    xp: 240,
  }), [resources]);

  const startScenario = (story: Story) => {
    setSelectedStory(story);
    setScenarioOpen(true);
    setStep(0);
    setProblem(story.category === 'Medical' ? 'Medical emergency' : story.category === 'Water' ? 'Water shortage' : 'Infrastructure disruption');
    setPriority('High');
    setResources(story.resources.slice(0, 2));
    setScenarioComplete(false);
  };

  const nextStep = () => {
    if (step < 5) {
      setStep(step + 1);
      return;
    }
    setScenarioComplete(true);
  };

  const renderStep = () => {
    if (scenarioComplete) {
      return (
        <div className="space-y-4 text-left">
          <div className="inline-flex items-center rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold uppercase tracking-[0.15em] text-emerald-700">
            {isArabic ? 'اكتمل السيناريو' : 'Scenario Complete'}
          </div>
          <h3 className="text-2xl font-black text-slate-900">{isArabic ? 'التقرير النهائي' : 'Decision summary'}</h3>
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-2xl bg-slate-50 p-3"><p className="text-xs uppercase tracking-[0.15em] text-slate-500">{isArabic ? 'جودة القرار' : 'Decision quality'}</p><p className="mt-2 text-2xl font-black text-slate-900">{scenarioSummary.quality}</p></div>
            <div className="rounded-2xl bg-slate-50 p-3"><p className="text-xs uppercase tracking-[0.15em] text-slate-500">{isArabic ? 'زمن الاستجابة' : 'Response time'}</p><p className="mt-2 text-2xl font-black text-slate-900">{scenarioSummary.responseTime}</p></div>
            <div className="rounded-2xl bg-slate-50 p-3 sm:col-span-2"><p className="text-xs uppercase tracking-[0.15em] text-slate-500">{isArabic ? 'الموارد الموصى بها' : 'Recommended resources'}</p><p className="mt-2 text-sm leading-6 text-slate-700">{scenarioSummary.resources}</p></div>
            <div className="rounded-2xl bg-blue-50 p-3 sm:col-span-2"><p className="text-xs uppercase tracking-[0.15em] text-blue-700">XP</p><p className="mt-2 text-2xl font-black text-blue-700">{scenarioSummary.xp}</p></div>
          </div>
        </div>
      );
    }

    const steps = [
      {
        title: isArabic ? 'اختر المشكلة' : 'Choose the problem',
        content: (
          <div className="grid gap-3 sm:grid-cols-2">
            {['Water shortage', 'Medical emergency', 'Infrastructure disruption', 'Shelter need'].map((option) => (
              <button key={option} type="button" onClick={() => setProblem(option)} className={`rounded-2xl border px-4 py-3 text-left text-sm font-semibold ${problem === option ? 'border-blue-600 bg-blue-50 text-blue-700' : 'border-slate-200 bg-white text-slate-700'}`}>
                {option}
              </button>
            ))}
          </div>
        ),
      },
      {
        title: isArabic ? 'اختر الأولوية' : 'Choose the priority',
        content: (
          <div className="grid gap-3 sm:grid-cols-3">
            {['Low', 'Medium', 'High', 'Critical'].map((option) => (
              <button key={option} type="button" onClick={() => setPriority(option)} className={`rounded-2xl border px-4 py-3 text-sm font-semibold ${priority === option ? 'border-blue-600 bg-blue-50 text-blue-700' : 'border-slate-200 bg-white text-slate-700'}`}>
                {option}
              </button>
            ))}
          </div>
        ),
      },
      {
        title: isArabic ? 'اختر الموارد المطلوبة' : 'Choose required resources',
        content: (
          <div className="grid gap-3 sm:grid-cols-2">
            {['Water purification kits', 'Medical kits', 'Temporary shelter', 'Volunteers', 'Generators', 'Logistics support'].map((option) => (
              <button key={option} type="button" onClick={() => setResources((current) => current.includes(option) ? current.filter((item) => item !== option) : [...current, option])} className={`rounded-2xl border px-4 py-3 text-left text-sm font-semibold ${resources.includes(option) ? 'border-blue-600 bg-blue-50 text-blue-700' : 'border-slate-200 bg-white text-slate-700'}`}>
                {option}
              </button>
            ))}
          </div>
        ),
      },
      {
        title: isArabic ? 'دع الذكاء الاصطناعي يحلل' : 'Let AI analyze',
        content: (
          <div className="rounded-2xl bg-slate-50 p-4 text-sm leading-7 text-slate-700">
            <p><strong>{isArabic ? 'المشكلة' : 'Problem'}:</strong> {problem}</p>
            <p><strong>{isArabic ? 'الأولوية' : 'Priority'}:</strong> {priority}</p>
            <p><strong>{isArabic ? 'الموارد' : 'Resources'}:</strong> {resources.length ? resources.join(', ') : (isArabic ? 'لا توجد موارد مختارة' : 'No resources selected')}</p>
            <p className="mt-3 text-blue-700"><strong>{isArabic ? 'تحليل' : 'AI analysis'}:</strong> {isArabic ? 'المخاطر مرتفعة في المنطقة، والتنسيق الفوري هو الأفضل لتقليل التأثير.' : 'Risk is elevated in the area and rapid coordination is the best way to reduce harm.'}</p>
          </div>
        ),
      },
      {
        title: isArabic ? 'توصية الذكاء الاصطناعي' : 'AI recommendation',
        content: (
          <div className="rounded-2xl border border-blue-100 bg-blue-50 p-4 text-sm leading-7 text-slate-700">
            <p>1. Activate response coordination for {problem.toLowerCase()}.</p>
            <p>2. Prioritize {priority.toLowerCase()} resources for the affected community.</p>
            <p>3. Dispatch a field team and begin operations within 30 minutes.</p>
          </div>
        ),
      },
      {
        title: isArabic ? 'الجدول الزمني للاستجابة' : 'Response timeline',
        content: (
          <div className="space-y-2 text-sm text-slate-700">
            {['Confirmed', 'Team assigned', 'Supplies dispatched', 'Field update received', 'Monitoring active'].map((item, index) => (
              <div key={item} className="flex items-center gap-3 rounded-xl bg-slate-50 p-3">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-600 text-xs font-bold text-white">{index + 1}</span>
                <span>{item}</span>
              </div>
            ))}
          </div>
        ),
      },
    ];

    return steps[step];
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-10 text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">{isArabic ? 'قصص النجاح' : 'Success Stories'}</p>
        <h1 className="mt-3 text-4xl font-black text-slate-900">{isArabic ? 'شاهد كيف يمكن للتقنية الإنسانية أن تساعد المجتمعات' : 'See how humanitarian technology can help communities respond faster.'}</h1>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {stories.map((story) => (
          <article key={story.title} className="overflow-hidden rounded-[30px] border border-slate-200 bg-white shadow-sm">
            <img src={story.image} alt={story.title} className="h-52 w-full object-cover" />
            <div className="p-6">
              <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-bold uppercase tracking-[0.15em] text-blue-700">{story.category}</span>
              <h2 className="mt-4 text-2xl font-black text-slate-900">{story.title}</h2>
              <p className="mt-3 text-sm leading-6 text-slate-600">{story.description}</p>
              <div className="mt-4 rounded-2xl bg-slate-50 p-3 text-sm font-semibold text-slate-700">{story.impact}</div>
              <button type="button" onClick={() => setSelectedStory(story)} className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-blue-700 transition hover:text-blue-800">
                {isArabic ? 'اعرف المزيد' : 'Learn more'} <ArrowRight size={16} />
              </button>
            </div>
          </article>
        ))}
      </div>

      {selectedStory && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/55 p-4">
          <div className="max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-[30px] bg-white p-0 shadow-[0_25px_80px_rgba(15,23,42,0.25)]">
            <div className="flex items-center justify-between border-b border-slate-200 p-5">
              <div className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-3 py-1.5 text-xs font-bold uppercase tracking-[0.15em] text-blue-700">
                <Sparkles size={12} /> {isArabic ? 'سيناريو تجريبي' : 'Prototype Scenario'}
              </div>
              <button type="button" onClick={() => setSelectedStory(null)} className="rounded-full bg-slate-100 p-2 text-slate-600 hover:bg-slate-200"><X size={18} /></button>
            </div>
            <div className="grid gap-0 md:grid-cols-2">
              <img src={selectedStory.image} alt={selectedStory.title} className="h-full min-h-[240px] w-full object-cover" />
              <div className="p-6">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-700">{selectedStory.category}</p>
                <h2 className="mt-3 text-3xl font-black text-slate-900">{selectedStory.title}</h2>
                <p className="mt-4 text-sm leading-7 text-slate-600">{selectedStory.description}</p>
                <div className="mt-6 rounded-2xl bg-slate-50 p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">{isArabic ? 'التأثير المحتمل' : 'Potential impact'}</p>
                  <p className="mt-2 text-sm font-semibold text-slate-700">{selectedStory.impact}</p>
                </div>
              </div>
            </div>

            <div className="grid gap-6 p-6 md:grid-cols-2">
              <div>
                <h3 className="text-xl font-black text-slate-900">{isArabic ? 'كيف يمكن لـ HavenAid المساعدة' : 'How HavenAid could help'}</h3>
                <ol className="mt-4 space-y-3 text-sm leading-6 text-slate-700">
                  {selectedStory.workflow.map((item, index) => (
                    <li key={item} className="flex gap-3"><span className="mt-0.5 flex h-6 w-6 items-center justify-center rounded-full bg-blue-100 text-xs font-black text-blue-700">{index + 1}</span> <span>{item}</span></li>
                  ))}
                </ol>
              </div>

              <div>
                <h3 className="text-xl font-black text-slate-900">{isArabic ? 'الموارد المطلوبة' : 'Resources required'}</h3>
                <ul className="mt-4 space-y-2 text-sm leading-6 text-slate-700">
                  {selectedStory.resources.map((item) => (
                    <li key={item} className="flex items-center gap-2"><CheckCircle2 size={14} className="text-emerald-600" /> {item}</li>
                  ))}
                </ul>
                <div className="mt-5 rounded-2xl bg-slate-50 p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">{isArabic ? 'الجدول الزمني للاستجابة' : 'Response timeline'}</p>
                  <div className="mt-3 space-y-2 text-sm text-slate-700">
                    {selectedStory.timeline.map((stepLabel) => (
                      <div key={stepLabel} className="flex items-center gap-2"><Clock3 size={14} className="text-blue-600" /> {stepLabel}</div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-3 border-t border-slate-200 p-6 sm:flex-row sm:justify-end">
              <button type="button" onClick={() => setSelectedStory(null)} className="rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-bold text-slate-700 transition hover:bg-slate-50">{isArabic ? 'إغلاق' : 'Close'}</button>
              <button type="button" onClick={() => startScenario(selectedStory)} className="rounded-xl bg-blue-600 px-5 py-3 text-sm font-bold text-white transition hover:bg-blue-700">{isArabic ? 'جرّب السيناريو' : 'Try This Scenario'}</button>
            </div>
          </div>
        </div>
      )}

      {scenarioOpen && selectedStory && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-900/60 p-4">
          <div className="w-full max-w-2xl rounded-[30px] bg-white p-6 shadow-[0_25px_80px_rgba(15,23,42,0.25)]">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-700">{isArabic ? 'محاكاة تعليمية' : 'Educational Prototype Simulation'}</p>
                <h3 className="mt-2 text-2xl font-black text-slate-900">{isArabic ? 'تم اكتشاف سيناريو طارئ.' : 'Emergency scenario detected.'}</h3>
              </div>
              <button type="button" onClick={() => setScenarioOpen(false)} className="rounded-full bg-slate-100 p-2 text-slate-600 hover:bg-slate-200"><X size={18} /></button>
            </div>

            <div className="mb-5 rounded-2xl bg-blue-50 p-3 text-xs font-bold uppercase tracking-[0.15em] text-blue-700">
              {isArabic ? 'الخطوة' : 'Step'} {Math.min(step + 1, 6)} / 6
            </div>

            <div className="space-y-5">
              <div>
                <h4 className="text-xl font-black text-slate-900">{renderStep()?.title}</h4>
              </div>
              {renderStep()?.content}
            </div>

            {!scenarioComplete && (
              <div className="mt-6 flex justify-end">
                <button type="button" onClick={nextStep} className="rounded-xl bg-blue-600 px-5 py-3 text-sm font-bold text-white transition hover:bg-blue-700">
                  {step === 5 ? (isArabic ? 'إكمال' : 'Complete') : (isArabic ? 'التالي' : 'Next')}
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default SuccessStoriesPage;
