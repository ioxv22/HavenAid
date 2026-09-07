import React, { useMemo, useState } from 'react';
import { ArrowRight, BrainCircuit, CheckCircle2, Clock3, Heart, MapPinned, PlayCircle, ShieldCheck, Sparkles, ShieldAlert, Waves, Stethoscope, Home, UtensilsCrossed, Building2 } from 'lucide-react';
import { Link } from 'react-router-dom';

type ScenarioKey = 'Flooding' | 'Disaster' | 'Medical' | 'Water' | 'Infrastructure';

type Scenario = {
  key: ScenarioKey;
  title: string;
  label: string;
  image: string;
  description: string;
  impact: string;
  needs: string[];
  icon: React.ComponentType<{ className?: string; size?: number }>;
};

const scenarios: Scenario[] = [
  {
    key: 'Flooding',
    title: 'Flooding',
    label: 'Flooding',
    image: 'https://images.unsplash.com/photo-1521295121783-8a321d551ad2?auto=format&fit=crop&w=1200&q=80',
    description: 'Imagine severe flooding affecting a community that depends on one road and a single local clinic.',
    impact: 'Blocked roads, damaged homes, and urgent water access needs.',
    needs: ['Water', 'Medical assistance', 'Shelter', 'Transportation'],
    icon: Waves,
  },
  {
    key: 'Disaster',
    title: 'Disaster',
    label: 'Disaster',
    image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1200&q=80',
    description: 'A sudden regional disruption creates urgent pressure across multiple services and communities.',
    impact: 'Multiple areas may need coordination across food, shelter, and logistics.',
    needs: ['Emergency relief', 'Shelter', 'Food', 'Logistics'],
    icon: ShieldAlert,
  },
  {
    key: 'Medical',
    title: 'Medical Emergency',
    label: 'Medical Emergency',
    image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=1200&q=80',
    description: 'A clinic is overwhelmed and local medical access is at risk after a sudden increase in patients.',
    impact: 'Prioritization becomes critical when time and supplies are limited.',
    needs: ['Medical supplies', 'Ambulance support', 'Field triage', 'Medicine'],
    icon: Stethoscope,
  },
  {
    key: 'Water',
    title: 'Water Shortage',
    label: 'Water Shortage',
    image: 'https://images.unsplash.com/photo-1541534401786-2077eed87a74?auto=format&fit=crop&w=1200&q=80',
    description: 'A community is facing unreliable supply and poor access to safe water resources.',
    impact: 'Water, hygiene, and public health support may need to be prioritized immediately.',
    needs: ['Water delivery', 'Hygiene packs', 'Community support', 'Monitoring'],
    icon: Waves,
  },
  {
    key: 'Infrastructure',
    title: 'Infrastructure Damage',
    label: 'Infrastructure Damage',
    image: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=1200&q=80',
    description: 'A damaged bridge or blocked route is limiting access to essential services and family support.',
    impact: 'Mobility, food access, and response timing may all be affected.',
    needs: ['Assessment', 'Repair coordination', 'Route clearance', 'Shelter'],
    icon: Building2,
  },
];

const stepLabels = {
  en: {
    heroBadge: 'AI for humanitarian action',
    heroHeading: 'Turn a humanitarian problem into action.',
    heroSub: 'HavenAid uses AI to help people report humanitarian problems, understand their urgency, identify needed resources, and track the response.',
    primary: 'Try HavenAid',
    secondary: 'How It Works',
    flowLabel: 'Report → AI → Resources → Response → Track',
    demoTitle: 'HavenAid Interactive Demo',
    demoSub: 'Choose a situation and see how HavenAid could help.',
    demoMode: 'Demo Mode',
    demoModeSub: 'This experience uses simulated humanitarian scenarios and AI responses for demonstration purposes.',
    howTitle: 'How HavenAid Works',
    exampleTitle: 'What can HavenAid help organize?',
    actionTitle: 'See HavenAid in Action',
    actionBefore: 'A humanitarian problem is discovered.',
    actionAfter: 'Priority and potential resources are organized for human review.',
    startDemo: 'Start 2-Minute Demo',
    aiHumanTitle: 'AI + Human',
    aiHumanText: 'AI helps analyze and organize information. Humans remain responsible for reviewing important decisions.',
    emergencyTitle: 'Are you in immediate danger?',
    emergencyText: 'If this is a real emergency, contact your local emergency services first.',
    emergencyPrimary: 'Contact Emergency Services',
    emergencySecondary: 'Explore HavenAid',
    endTitle: 'You now understand how HavenAid works.',
    badge: 'Prototype Scenario',
  },
  ar: {
    heroBadge: 'الذكاء الاصطناعي للمساعدات الإنسانية',
    heroHeading: 'حوّل مشكلة إنسانية إلى عمل.',
    heroSub: 'تستخدم HavenAid الذكاء الاصطناعي لمساعدة الناس في الإبلاغ عن المشكلات الإنسانية، وفهم حدتها، وتحديد الموارد اللازمة، ومتابعة الاستجابة.',
    primary: 'جرّب HavenAid',
    secondary: 'كيف يعمل',
    flowLabel: 'إبلاغ → ذكاء اصطناعي → موارد → استجابة → متابعة',
    demoTitle: 'عرض HavenAid التفاعلي',
    demoSub: 'اختر موقفًا وشاهد كيف يمكن لـ HavenAid المساعدة.',
    demoMode: 'وضع العرض',
    demoModeSub: 'يستخدم هذا التفاعل سيناريوهات إنسانية محاكاة واستجابات ذكاء اصطناعي لغرض العرض فقط.',
    howTitle: 'كيف تعمل HavenAid',
    exampleTitle: 'ماذا يمكن أن تساعد HavenAid في تنظيمه؟',
    actionTitle: 'شاهد HavenAid أثناء العمل',
    actionBefore: 'تُكتشف مشكلة إنسانية.',
    actionAfter: 'يتم تنظيم الأولوية والموارد المحتملة للمراجعة البشرية.',
    startDemo: 'ابدأ العرض لمدة دقيقتين',
    aiHumanTitle: 'الذكاء الاصطناعي + الإنسان',
    aiHumanText: 'يساعد الذكاء الاصطناعي في تحليل وتنظيم المعلومات. ويظل الإنسان مسؤولاً عن مراجعة القرارات المهمة.',
    emergencyTitle: 'هل أنت في خطر فوري؟',
    emergencyText: 'إذا كانت هذه حالة طارئة حقيقية، فاتصل بخدمات الطوارئ المحلية أولاً.',
    emergencyPrimary: 'اتصل بخدمات الطوارئ',
    emergencySecondary: 'استكشف HavenAid',
    endTitle: 'أنت الآن تفهم كيف تعمل HavenAid.',
    badge: 'سيناريو تجريبي',
  },
};

function ResponsiveLanding({ language = 'en' }: { language?: 'en' | 'ar' }) {
  const isArabic = language === 'ar';
  const t = stepLabels[language];
  const [selectedScenario, setSelectedScenario] = useState<ScenarioKey>('Flooding');
  const [showScenario, setShowScenario] = useState(false);
  const [stage, setStage] = useState<'question' | 'analysis' | 'response' | 'tracking' | 'complete'>('question');
  const [answer, setAnswer] = useState<'report' | 'resource' | 'ignore' | null>(null);
  const [aiStep, setAiStep] = useState(0);
  const [decision, setDecision] = useState<'AI' | 'Human' | null>(null);

  const chosenScenario = useMemo(
    () => scenarios.find((scenario) => scenario.key === selectedScenario) ?? scenarios[0],
    [selectedScenario],
  );

  const openScenario = (scenarioKey: ScenarioKey) => {
    setSelectedScenario(scenarioKey);
    setShowScenario(true);
    setStage('question');
    setAnswer(null);
    setAiStep(0);
    setDecision(null);
  };

  const continueFromQuestion = () => {
    if (answer === 'report') {
      setStage('analysis');
      setAiStep(0);
      return;
    }
    setStage('response');
  };

  const runAiAnalysis = () => {
    if (aiStep < 4) {
      setAiStep((current) => current + 1);
      return;
    }
    setStage('response');
  };

  const startDemo = () => {
    const section = document.getElementById('try-havenaid');
    section?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    setShowScenario(true);
    setStage('question');
    setAnswer(null);
    setAiStep(0);
  };

  const aiMessages = [
    isArabic ? 'تحليل الصورة...' : 'Analyzing image...',
    isArabic ? 'فهم الوصف...' : 'Understanding description...',
    isArabic ? 'تقييم الخطورة...' : 'Assessing severity...',
    isArabic ? 'تحديد الاحتياجات...' : 'Identifying needs...',
    isArabic ? 'تجهيز الاستجابة...' : 'Preparing response...',
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <section className="relative overflow-hidden rounded-[32px] border border-slate-200 bg-white p-6 shadow-[0_20px_50px_rgba(15,23,42,0.08)] sm:p-10 lg:p-14">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(59,130,246,0.12),transparent_30%),radial-gradient(circle_at_bottom_left,_rgba(16,185,129,0.10),transparent_35%)]" />
        <div className="relative grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-blue-700">
              <Sparkles size={14} />
              {t.heroBadge}
            </div>
            <h1 className="max-w-xl text-4xl font-black tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
              {t.heroHeading}
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-8 text-slate-600">{t.heroSub}</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <button type="button" onClick={startDemo} className="inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-blue-600 to-blue-500 px-6 py-3.5 text-base font-bold text-white shadow-[0_12px_30px_rgba(37,99,235,0.28)] transition hover:brightness-105">
                <PlayCircle size={18} />
                {t.primary}
              </button>
              <a href="#how-it-works" className="inline-flex items-center justify-center rounded-2xl border border-slate-200 bg-white px-6 py-3.5 text-base font-bold text-slate-700 shadow-sm transition hover:bg-slate-50">
                {t.secondary}
              </a>
            </div>
            <div className="mt-6 flex flex-wrap items-center gap-3 text-sm text-slate-600">
              <span className="inline-flex items-center gap-2"><CheckCircle2 className="text-emerald-600" size={16} /> {t.flowLabel}</span>
            </div>
          </div>

          <div className="relative">
            <div className="relative overflow-hidden rounded-[30px] border border-slate-200 bg-slate-900 p-3 shadow-[0_28px_80px_rgba(15,23,42,0.18)]">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(59,130,246,0.2),transparent_48%)]" />
              <div className="relative rounded-[24px] border border-slate-700 bg-slate-800/80 p-4">
                <div className="mb-4 flex items-center justify-between text-xs uppercase tracking-[0.18em] text-slate-300">
                  <span>{t.demoMode}</span>
                  <span className="inline-flex items-center gap-2 text-cyan-300"><span className="h-2 w-2 rounded-full bg-cyan-400" /> Live</span>
                </div>
                <div className="relative overflow-hidden rounded-[22px] border border-slate-700 bg-slate-900">
                  <img src={chosenScenario.image} alt={chosenScenario.title} className="h-[420px] w-full object-cover opacity-90" />
                  <div className="absolute inset-0 animate-pulse bg-[radial-gradient(circle_at_center,_rgba(59,130,246,0.3),transparent_55%)]" />
                </div>

                <div className="mt-5 grid gap-3 sm:grid-cols-2">
                  <div className="rounded-2xl border border-slate-700 bg-slate-900/70 p-3">
                    <p className="text-xs uppercase tracking-[0.18em] text-slate-400">Detected</p>
                    <p className="mt-2 text-xl font-black text-white">{chosenScenario.title}</p>
                  </div>
                  <div className="rounded-2xl border border-red-500/30 bg-red-500/10 p-3">
                    <p className="text-xs uppercase tracking-[0.18em] text-red-200">Priority</p>
                    <p className="mt-2 text-xl font-black text-red-200">High</p>
                  </div>
                </div>

                <div className="mt-4 rounded-2xl border border-slate-700 bg-slate-900/70 p-3">
                  <div className="flex items-center justify-between text-sm text-slate-300">
                    <span>Location</span>
                    <span className="font-semibold text-white">Demo Location</span>
                  </div>
                  <div className="mt-2 flex items-center justify-between text-sm text-slate-300">
                    <span>AI confidence</span>
                    <span className="font-semibold text-cyan-300">94%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="try-havenaid" className="mt-16 rounded-[30px] border border-slate-200 bg-slate-50 p-6 sm:p-8">
        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">{t.demoMode}</p>
            <h2 className="mt-3 text-3xl font-black text-slate-900">{t.demoTitle}</h2>
            <p className="mt-2 text-slate-600">{t.demoSub}</p>
          </div>
          <span className="inline-flex items-center rounded-full border border-blue-200 bg-blue-50 px-3 py-1.5 text-xs font-bold uppercase tracking-[0.15em] text-blue-700">{t.demoModeSub}</span>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
          {scenarios.map((scenario) => {
            const Icon = scenario.icon;
            const isActive = selectedScenario === scenario.key;
            return (
              <button
                key={scenario.key}
                type="button"
                onClick={() => openScenario(scenario.key)}
                className={`rounded-[26px] border p-4 text-left transition ${isActive ? 'border-blue-200 bg-blue-50 shadow-sm' : 'border-slate-200 bg-white hover:border-slate-300'}`}
              >
                <div className="mb-4 inline-flex rounded-2xl bg-blue-100 p-3 text-blue-700">
                  <Icon size={20} />
                </div>
                <h3 className="text-xl font-black text-slate-900">{scenario.title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">{scenario.description}</p>
              </button>
            );
          })}
        </div>

        {showScenario && (
          <div className="mt-8 overflow-hidden rounded-[30px] border border-slate-200 bg-white shadow-[0_16px_30px_rgba(15,23,42,0.05)]">
            <div className="grid gap-0 lg:grid-cols-[1fr_1.1fr]">
              <div className="relative min-h-[260px]">
                <img src={chosenScenario.image} alt={chosenScenario.title} className="h-full w-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-100">{t.badge}</p>
                  <h3 className="mt-2 text-3xl font-black">{chosenScenario.title}</h3>
                </div>
              </div>
              <div className="p-6 sm:p-8">
                {stage === 'question' && (
                  <>
                    <p className="text-sm font-semibold uppercase tracking-[0.18em] text-blue-600">Step 1</p>
                    <h3 className="mt-3 text-2xl font-black text-slate-900">{isArabic ? 'هل اكتشفت في مجتمعك فيضانًا شديدًا؟' : 'Imagine you discover severe flooding in your community.'}</h3>
                    <p className="mt-3 text-slate-600">{isArabic ? 'ما الذي ستفعله أولاً؟' : 'What would you do first?'}</p>
                    <div className="mt-5 space-y-3">
                      {[
                        { value: 'report', label: isArabic ? 'الإبلاغ عن المشكلة' : 'Report the problem' },
                        { value: 'resource', label: isArabic ? 'البحث عن الموارد' : 'Look for resources' },
                        { value: 'ignore', label: isArabic ? 'تجاهل الأمر' : 'Ignore it' },
                      ].map((option) => (
                        <button
                          key={option.value}
                          type="button"
                          onClick={() => setAnswer(option.value as 'report' | 'resource' | 'ignore')}
                          className={`flex w-full items-center justify-between rounded-2xl border px-4 py-3 text-left text-sm font-semibold ${answer === option.value ? 'border-blue-600 bg-blue-50 text-blue-700' : 'border-slate-200 bg-white text-slate-700'}`}
                        >
                          <span>{option.label}</span>
                          <ArrowRight size={16} />
                        </button>
                      ))}
                    </div>
                    <div className="mt-6 flex justify-end">
                      <button
                        type="button"
                        disabled={!answer}
                        onClick={continueFromQuestion}
                        className="rounded-xl bg-blue-600 px-5 py-3 text-sm font-bold text-white disabled:cursor-not-allowed disabled:bg-slate-200 disabled:text-slate-400"
                      >
                        {isArabic ? 'متابعة' : 'Continue'}
                      </button>
                    </div>
                  </>
                )}

                {stage === 'analysis' && (
                  <>
                    <p className="text-sm font-semibold uppercase tracking-[0.18em] text-blue-600">Step 2</p>
                    <h3 className="mt-3 text-2xl font-black text-slate-900">{isArabic ? 'الآن يقوم HavenAid بتحليل البلاغ.' : 'Now HavenAid analyzes the report.'}</h3>
                    <div className="mt-6 space-y-3">
                      {aiMessages.map((message, index) => (
                        <div key={message} className={`flex items-center gap-3 rounded-2xl p-3 text-sm font-semibold ${index <= aiStep ? 'bg-blue-50 text-blue-700' : 'bg-slate-100 text-slate-500'}`}>
                          <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-white text-xs font-black text-blue-700">{index + 1}</span>
                          {message}
                        </div>
                      ))}
                    </div>
                    <div className="mt-6 rounded-2xl border border-blue-100 bg-blue-50 p-4 text-sm leading-7 text-slate-700">
                      <p><strong>{isArabic ? 'نوع المشكلة' : 'Detected Issue'}:</strong> {chosenScenario.title}</p>
                      <p><strong>{isArabic ? 'الأولوية' : 'Priority'}:</strong> High</p>
                      <p><strong>{isArabic ? 'الاحتياجات المحتملة' : 'Potential Needs'}:</strong> {chosenScenario.needs.join(', ')}</p>
                    </div>
                    <p className="mt-4 text-sm leading-7 text-slate-600">
                      {isArabic ? 'يساعد الذكاء الاصطناعي على تنظيم المعلومات بحيث يمكن للجهات المستجيبة فهم ما قد يحتاجه الناس بشكل أسرع.' : 'AI helps organize the information so responders can understand what may be needed faster.'}
                    </p>
                    <div className="mt-6 flex justify-end">
                      <button type="button" onClick={runAiAnalysis} className="rounded-xl bg-blue-600 px-5 py-3 text-sm font-bold text-white">
                        {aiStep === 4 ? (isArabic ? 'عرض الاستجابة الموصى بها' : 'See Recommended Response') : (isArabic ? 'التالي' : 'Next')}
                      </button>
                    </div>
                  </>
                )}

                {stage === 'response' && (
                  <>
                    <p className="text-sm font-semibold uppercase tracking-[0.18em] text-blue-600">Step 3</p>
                    <h3 className="mt-3 text-2xl font-black text-slate-900">{isArabic ? 'بناءً على المعلومات المتاحة، توصي HavenAid بما يلي:' : 'Based on the available information, HavenAid recommends:'}</h3>
                    <ol className="mt-5 space-y-3 text-sm leading-7 text-slate-700">
                      {[
                        'Assess affected areas',
                        'Prioritize vulnerable people',
                        'Coordinate water supplies',
                        'Arrange medical support',
                        'Track the response',
                      ].map((item, index) => (
                        <li key={item} className="flex gap-3">
                          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-100 text-xs font-black text-blue-700">{index + 1}</span>
                          <span>{isArabic ? (item === 'Assess affected areas' ? 'تقييم المناطق المتضررة' : item === 'Prioritize vulnerable people' ? 'تحديد أولويات الأشخاص الأكثر ضعفاً' : item === 'Coordinate water supplies' ? 'تنسيق إمدادات المياه' : item === 'Arrange medical support' ? 'ترتيب الدعم الطبي' : 'متابعة الاستجابة') : item}</span>
                        </li>
                      ))}
                    </ol>
                    <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-4">
                      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">{isArabic ? 'الجدول الزمني' : 'Response timeline'}</p>
                      <div className="mt-4 flex items-center justify-between text-sm text-slate-700">
                        <span>{isArabic ? 'الإبلاغ' : 'Report'}</span>
                        <span>✓</span>
                        <span>{isArabic ? 'تحليل' : 'AI Analysis'}</span>
                        <span>✓</span>
                        <span>{isArabic ? 'تقييم الأولوية' : 'Priority'}</span>
                        <span>✓</span>
                        <span>{isArabic ? 'الموارد' : 'Resources'}</span>
                        <span>✓</span>
                        <span>{isArabic ? 'الاستجابة' : 'Response'}</span>
                        <span>→</span>
                      </div>
                    </div>
                    <div className="mt-6 flex justify-end">
                      <button type="button" onClick={() => setStage('tracking')} className="rounded-xl bg-blue-600 px-5 py-3 text-sm font-bold text-white">
                        {isArabic ? 'تتبع هذا السيناريو' : 'Track This Scenario'}
                      </button>
                    </div>
                  </>
                )}

                {stage === 'tracking' && (
                  <>
                    <p className="text-sm font-semibold uppercase tracking-[0.18em] text-blue-600">Step 4</p>
                    <h3 className="mt-3 text-2xl font-black text-slate-900">HavenAid Demo Report</h3>
                    <div className="mt-5 space-y-4 rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-700">
                      <div className="flex items-center justify-between"><span>{isArabic ? 'الحالة' : 'Status'}:</span><span className="rounded-full bg-amber-100 px-2 py-1 font-bold text-amber-700">🟡 In Progress</span></div>
                      <div className="flex items-center justify-between"><span>{isArabic ? 'الموقع' : 'Location'}:</span><span>Demo Location</span></div>
                      <div className="flex items-center justify-between"><span>{isArabic ? 'الأولوية' : 'Priority'}:</span><span>High</span></div>
                      <div className="flex items-center justify-between"><span>{isArabic ? 'الموارد' : 'Resources'}:</span><span>Water, Medical, Shelter</span></div>
                    </div>
                    <div className="mt-5 space-y-3 text-sm text-slate-700">
                      {[
                        '10:02 — Report submitted',
                        '10:03 — AI analysis completed',
                        '10:05 — Priority assigned',
                        '10:08 — Resources recommended',
                        '10:15 — Response started',
                      ].map((item) => (
                        <div key={item} className="flex items-center gap-3 rounded-xl bg-slate-100 p-3">
                          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-600 text-xs font-bold text-white">✓</span>
                          {item}
                        </div>
                      ))}
                    </div>
                    <p className="mt-5 text-sm leading-7 text-slate-600">{isArabic ? 'وهكذا تتحول بلاغة واحدة إلى استجابة منظمة.' : 'This is how HavenAid turns a report into an organized response.'}</p>
                    <div className="mt-6 flex justify-end">
                      <button type="button" onClick={() => setStage('complete')} className="rounded-xl bg-blue-600 px-5 py-3 text-sm font-bold text-white">
                        {isArabic ? 'إكمال العرض' : 'Finish Demo'}
                      </button>
                    </div>
                  </>
                )}

                {stage === 'complete' && (
                  <>
                    <p className="text-sm font-semibold uppercase tracking-[0.18em] text-blue-600">Outcome</p>
                    <h3 className="mt-3 text-2xl font-black text-slate-900">{t.endTitle}</h3>
                    <div className="mt-5 space-y-3 text-sm leading-7 text-slate-700">
                      <div className="rounded-2xl bg-blue-50 p-4">Problem → AI → Resources → Response → Tracking</div>
                      <div className="rounded-2xl border border-slate-200 p-4">{isArabic ? 'يُظهر هذا أن HavenAid يساعد في تحويل المعلومات إلى إجراءات عملية.' : 'This demonstrates how HavenAid turns a report into a coordinated humanitarian response.'}</div>
                    </div>
                    <div className="mt-6 flex justify-end gap-3">
                      <button type="button" onClick={() => setShowScenario(false)} className="rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-bold text-slate-700">{isArabic ? 'إغلاق' : 'Close'}</button>
                      <Link to="/report" className="rounded-xl bg-blue-600 px-5 py-3 text-sm font-bold text-white">{isArabic ? 'استكشف HavenAid' : 'Explore HavenAid'}</Link>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </section>

      <section id="how-it-works" className="mt-16">
        <div className="mb-8 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">{t.howTitle}</p>
          <h2 className="mt-3 text-3xl font-black text-slate-900 sm:text-4xl">{t.howTitle}</h2>
        </div>
        <div className="grid gap-6 md:grid-cols-4">
          {[
            { title: isArabic ? 'إبلاغ' : 'REPORT', description: isArabic ? 'ارفع صورة ووصف المشكلة.' : 'Upload an image and describe the problem.' },
            { title: isArabic ? 'فهم' : 'UNDERSTAND', description: isArabic ? 'يحلل الذكاء الاصطناعي المعلومات ويحدد نوع المشكلة وشدتها.' : 'AI analyzes the information and identifies the type and severity of the issue.' },
            { title: isArabic ? 'استجابة' : 'RESPOND', description: isArabic ? 'يتم تنظيم الموارد والإجراءات الموصى بها.' : 'Recommended resources and response actions are organized.' },
            { title: isArabic ? 'تتبع' : 'TRACK', description: isArabic ? 'تابع التقدم من التقرير إلى الحل.' : 'Follow the progress from report to resolution.' },
          ].map((item, index) => (
            <div key={item.title} className="rounded-[26px] border border-slate-200 bg-white p-5 shadow-[0_12px_30px_rgba(15,23,42,0.04)]">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 text-lg font-black text-blue-700">{index + 1}</div>
              <h3 className="text-xl font-black text-slate-900">{item.title}</h3>
              <p className="mt-3 text-sm leading-6 text-slate-600">{item.description}</p>
            </div>
          ))}
        </div>
        <div className="mt-8 flex justify-center">
          <button type="button" onClick={startDemo} className="rounded-2xl bg-blue-600 px-6 py-3 text-sm font-bold text-white">{isArabic ? 'جرّب نفسك' : 'Try It Yourself'}</button>
        </div>
      </section>

      <section className="mt-16">
        <div className="mb-8 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">{t.exampleTitle}</p>
          <h2 className="mt-3 text-3xl font-black text-slate-900">{t.exampleTitle}</h2>
        </div>
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {[
            { title: isArabic ? 'فيضان' : 'Flooding', icon: Waves, color: 'bg-cyan-50 text-cyan-700', description: isArabic ? 'تحديد مناطق التضرر وتقييم الحاجة إلى التحرك السريع.' : 'Identify affected areas and assess emergency response needs.' },
            { title: isArabic ? 'نقص المياه' : 'Water shortages', icon: Waves, color: 'bg-blue-50 text-blue-700', description: isArabic ? 'تنظيم إمدادات الماء وضمان النظافة والصحة العامة.' : 'Coordinate water supplies and hygiene support for vulnerable groups.' },
            { title: isArabic ? 'طوارئ طبية' : 'Medical emergencies', icon: Stethoscope, color: 'bg-rose-50 text-rose-700', description: isArabic ? 'تحديد أولويات الحالات الحرجة وتوجيه الجهات الطبية.' : 'Prioritize urgent care and route support to the right teams.' },
            { title: isArabic ? 'أضرار في البنية' : 'Infrastructure damage', icon: Building2, color: 'bg-amber-50 text-amber-700', description: isArabic ? 'مساعدة الفرق على تقييم الطرق والمباني والعبور الآمن.' : 'Support field teams assessing damaged routes and public structures.' },
            { title: isArabic ? 'نقص الغذاء' : 'Food shortages', icon: UtensilsCrossed, color: 'bg-emerald-50 text-emerald-700', description: isArabic ? 'تنسيق التوزيع الجغرافي والاحتياجات الإنسانية.' : 'Coordinate food access and delivery planning for impacted communities.' },
            { title: isArabic ? 'حاجة إلى مأوى' : 'Shelter needs', icon: Home, color: 'bg-violet-50 text-violet-700', description: isArabic ? 'تحديد الأسر المتضررة وتسهيل التوزيع السريع.' : 'Help teams identify families in need and arrange shelter support.' },
          ].map(({ title, description, icon: Icon, color }) => (
            <button key={title} type="button" onClick={() => openScenario(title.includes('Flood') || title.includes('فيضان') ? 'Flooding' : title.includes('Water') || title.includes('مياه') ? 'Water' : title.includes('Medical') || title.includes('طبية') ? 'Medical' : title.includes('Infrastructure') || title.includes('بنية') ? 'Infrastructure' : 'Disaster')} className={`${color} rounded-[28px] border p-5 text-left shadow-sm transition hover:-translate-y-0.5`}>
              <div className="mb-4 inline-flex rounded-2xl bg-white/75 p-3"><Icon size={20} /></div>
              <h3 className="text-xl font-black">{title}</h3>
              <p className="mt-3 text-sm leading-6">{description}</p>
            </button>
          ))}
        </div>
      </section>

      <section className="mt-16 rounded-[30px] border border-slate-200 bg-white p-8 shadow-[0_12px_30px_rgba(15,23,42,0.04)]">
        <div className="mb-8 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">{t.actionTitle}</p>
          <h2 className="mt-3 text-3xl font-black text-slate-900">{t.actionTitle}</h2>
        </div>
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="rounded-[28px] border border-slate-200 bg-slate-50 p-6">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-blue-600">Before</p>
            <h3 className="mt-4 text-2xl font-black text-slate-900">{t.actionBefore}</h3>
            <div className="mt-4 space-y-3 text-sm leading-7 text-slate-600">
              <p>• Information may be incomplete</p>
              <p>• Details can be hard to organize</p>
              <p>• Response timing may be delayed</p>
            </div>
          </div>
          <div className="rounded-[28px] border border-blue-200 bg-gradient-to-br from-blue-50 to-cyan-50 p-6">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-blue-700">HavenAid</p>
            <div className="mt-4 space-y-3 text-sm leading-7 text-slate-700">
              <p>📸 Report captured</p>
              <p>🤖 AI analyzes the issue</p>
              <p>📋 Resources and urgency are organized</p>
            </div>
            <div className="mt-6 rounded-2xl bg-white/70 p-4">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-emerald-700">After</p>
              <p className="mt-2 text-lg font-black text-slate-900">{t.actionAfter}</p>
            </div>
          </div>
        </div>
        <div className="mt-8 flex justify-center">
          <button type="button" onClick={startDemo} className="rounded-2xl bg-blue-600 px-6 py-3 text-sm font-bold text-white">{t.startDemo}</button>
        </div>
      </section>

      <section className="mt-16 rounded-[30px] border border-slate-200 bg-slate-50 p-8">
        <div className="mb-8 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">{t.aiHumanTitle}</p>
          <h2 className="mt-3 text-3xl font-black text-slate-900">{t.aiHumanTitle}</h2>
        </div>
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="rounded-[26px] bg-white p-5 shadow-sm">
            <BrainCircuit className="mb-4 text-blue-600" size={28} />
            <h3 className="text-xl font-black text-slate-900">AI Recommendation</h3>
            <p className="mt-3 text-sm leading-7 text-slate-600">Recommended resources include water, shelter, and transport based on the alert details.</p>
          </div>
          <div className="rounded-[26px] bg-white p-5 shadow-sm">
            <ShieldCheck className="mb-4 text-emerald-600" size={28} />
            <h3 className="text-xl font-black text-slate-900">Human Review</h3>
            <p className="mt-3 text-sm leading-7 text-slate-600">A responder checks whether the recommendation fits local conditions and field capacity.</p>
          </div>
          <div className="rounded-[26px] bg-white p-5 shadow-sm">
            <CheckCircle2 className="mb-4 text-violet-600" size={28} />
            <h3 className="text-xl font-black text-slate-900">Final Decision</h3>
            <p className="mt-3 text-sm leading-7 text-slate-600">Human teams make the final decision while AI helps organize the information more quickly.</p>
          </div>
        </div>
        <div className="mt-8 rounded-[26px] border border-blue-100 bg-blue-50 p-5">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-blue-700">{isArabic ? 'ما الذي يجب أن يحدث؟' : 'What should happen?'}</p>
          <div className="mt-4 grid gap-3 sm:grid-cols-3">
            {[
              { value: 'AI', label: isArabic ? 'توصية الذكاء' : 'AI Recommendation' },
              { value: 'Human', label: isArabic ? 'مراجعة بشرية' : 'Human Review' },
            ].map((choice) => (
              <button
                key={choice.value}
                type="button"
                onClick={() => setDecision(choice.value as 'AI' | 'Human')}
                className={`rounded-2xl border px-4 py-3 text-sm font-semibold ${decision === choice.value ? 'border-blue-600 bg-blue-100 text-blue-700' : 'border-slate-200 bg-white text-slate-700'}`}
              >
                {choice.label}
              </button>
            ))}
          </div>
          {decision && (
            <div className="mt-5 rounded-2xl bg-white p-4 text-sm leading-7 text-slate-700">
              {decision === 'AI' ? (isArabic ? 'تقديم توجيه مبدئي ثم مراجعة بشرية.' : 'AI can propose a fast first-pass recommendation, then a human confirms it.') : (isArabic ? 'يجب أن يراجع فريق بشري القرار قبل التنفيذ.' : 'A human team should review the recommendation before action is taken.')}
            </div>
          )}
        </div>
      </section>

      <section className="mt-16 rounded-[30px] border border-slate-200 bg-white p-8 shadow-[0_12px_30px_rgba(15,23,42,0.04)]">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">{t.emergencyTitle}</p>
            <h2 className="mt-3 text-3xl font-black text-slate-900">{t.emergencyTitle}</h2>
            <p className="mt-3 max-w-xl text-slate-600">{t.emergencyText}</p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <a href="tel:999" className="inline-flex items-center justify-center rounded-2xl bg-red-600 px-5 py-3 text-sm font-bold text-white">{t.emergencyPrimary}</a>
            <button type="button" onClick={startDemo} className="inline-flex items-center justify-center rounded-2xl border border-slate-200 bg-white px-5 py-3 text-sm font-bold text-slate-700">{t.emergencySecondary}</button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default ResponsiveLanding;
