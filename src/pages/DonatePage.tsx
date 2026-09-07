import React, { useMemo, useState } from 'react';
import { ArrowRight, BadgeCheck, ShieldCheck, X } from 'lucide-react';

type DonatePageProps = {
  language?: 'en' | 'ar';
};

type Charity = {
  id: 'dubai-cares' | 'dar-al-ber';
  name: string;
  nameArabic: string;
  cause: string;
  causeArabic: string;
  description: string;
  descriptionArabic: string;
  websiteUrl: string;
  donationUrl: string;
  category: 'Education' | 'Humanitarian';
};

const charities: Charity[] = [
  {
    id: 'dubai-cares',
    name: 'Dubai Cares',
    nameArabic: 'دار كيرز',
    cause: 'Education & Humanitarian Support',
    causeArabic: 'الدعم التعليمي والإنساني',
    description: 'A UAE-based philanthropic organization supporting education and development initiatives.',
    descriptionArabic: 'منظمة خيرية مقرها الإمارات تدعم التعليم ومبادرات التنمية.',
    websiteUrl: 'https://www.dubaicares.ae/',
    donationUrl: 'https://www.dubaicares.ae/support-us/donate/',
    category: 'Education',
  },
  {
    id: 'dar-al-ber',
    name: 'Dar Al Ber Society',
    nameArabic: 'جمعية دار البر',
    cause: 'General Charity & Humanitarian Support',
    causeArabic: 'العمل الخيري والدعم الإنساني العام',
    description: 'A UAE charitable organization supporting humanitarian and social welfare efforts.',
    descriptionArabic: 'جمعية خيرية إماراتية تدعم الجهود الإنسانية والخيرية والاجتماعية.',
    websiteUrl: 'https://www.daralber.ae/',
    donationUrl: 'https://www.daralber.ae/en/home',
    category: 'Humanitarian',
  },
];

const amounts = [25, 50, 100, 250];

function DonatePage({ language = 'en' }: DonatePageProps) {
  const isArabic = language === 'ar';
  const [selectedCategory, setSelectedCategory] = useState<'All' | Charity['category']>('All');
  const [selectedOrg, setSelectedOrg] = useState<Charity>(charities[0]);
  const [selectedAmount, setSelectedAmount] = useState<number>(250);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const [popupBlocked, setPopupBlocked] = useState(false);

  const filtered = useMemo(() => {
    if (selectedCategory === 'All') return charities;
    return charities.filter((charity) => charity.category === selectedCategory);
  }, [selectedCategory]);

  const openOfficialLink = (url: string) => {
    const newWindow = window.open(url, '_blank', 'noopener,noreferrer');
    if (!newWindow) {
      setPopupBlocked(true);
      setToast(isArabic ? 'تم حظر النافذة الجديدة بواسطة المتصفح.' : 'Your browser blocked the new tab.');
      return;
    }

    setPopupBlocked(false);
    setConfirmOpen(false);
    setToast(isArabic ? '✓ تم فتح صفحة التبرع الرسمية.' : '✓ Official donation page opened.');
  };

  const handleDonateClick = () => {
    setConfirmOpen(true);
    setPopupBlocked(false);
  };

  return (
    <div dir={isArabic ? 'rtl' : 'ltr'} className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-8 text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">
          {isArabic ? 'تبرع' : 'Donate'}
        </p>
        <h1 className="mt-3 text-4xl font-black text-slate-900">
          {isArabic ? 'دعم العمل الإنساني' : 'Support Humanitarian Action'}
        </h1>
        <p className="mt-4 text-lg text-slate-600">
          {isArabic
            ? 'تربط HavenAid الزوار بصفحات التبرع الرسمية للمنظمات الخيرية.'
            : 'HavenAid connects visitors with official donation pages of charitable organizations.'}
        </p>
      </div>

      <div className="mb-8 flex flex-wrap gap-2">
        {(['All', 'Education', 'Humanitarian'] as const).map((category) => (
          <button
            key={category}
            type="button"
            onClick={() => setSelectedCategory(category)}
            className={`rounded-full px-4 py-2 text-sm font-semibold ${selectedCategory === category ? 'bg-blue-600 text-white' : 'border border-slate-200 bg-white text-slate-600'}`}
          >
            {category === 'All' ? (isArabic ? 'الكل' : 'All') : category}
          </button>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {filtered.map((org) => (
          <div
            key={org.id}
            className={`rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm transition ${selectedOrg.id === org.id ? 'border-blue-200 bg-blue-50/40' : ''}`}
          >
            <div className="mb-4 flex items-center justify-between gap-3">
              <div>
                <h2 className="text-2xl font-black text-slate-900">{isArabic ? org.nameArabic : org.name}</h2>
                <p className="mt-2 text-sm font-semibold text-blue-700">{isArabic ? org.causeArabic : org.cause}</p>
              </div>
              <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-2 py-1 text-[11px] font-bold text-emerald-700">
                <BadgeCheck size={12} /> {isArabic ? 'موثّق' : 'Verified'}
              </span>
            </div>

            <p className="text-sm leading-7 text-slate-600">
              {isArabic ? org.descriptionArabic : org.description}
            </p>

            <div className="mt-5 flex flex-wrap gap-2 text-xs font-semibold text-slate-600">
              <span className="rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-1 text-emerald-700">
                ✓ {isArabic ? 'منظمة رسمية' : 'Official organization'}
              </span>
              <span className="rounded-full border border-blue-200 bg-blue-50 px-2.5 py-1 text-blue-700">
                ✓ {isArabic ? 'صفحة تبرع رسمية' : 'Official donation page'}
              </span>
            </div>

            <div className="mt-6 flex gap-3">
              <button
                type="button"
                onClick={() => {
                  setSelectedOrg(org);
                  window.open(org.websiteUrl, '_blank', 'noopener,noreferrer');
                }}
                className="flex-1 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-bold text-slate-700 transition hover:bg-slate-50"
              >
                {isArabic ? 'اعرف المزيد' : 'Learn More'}
              </button>
              <button
                type="button"
                onClick={() => {
                  setSelectedOrg(org);
                  setConfirmOpen(true);
                }}
                className="flex-1 rounded-xl bg-blue-600 px-4 py-3 text-sm font-bold text-white transition hover:bg-blue-700"
              >
                {isArabic ? 'تبرع' : 'Donate'}
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-10 rounded-[32px] border border-slate-200 bg-slate-50 p-6 shadow-sm">
        <div className="mb-5 flex items-center gap-2">
          <ShieldCheck className="text-emerald-600" size={20} />
          <h2 className="text-2xl font-black text-slate-900">
            {isArabic ? 'اختر الجهة الخيرية' : 'Choose a cause'}
          </h2>
        </div>

        <div className="grid gap-4 md:grid-cols-4">
          {amounts.map((amount) => (
            <button
              key={amount}
              type="button"
              onClick={() => setSelectedAmount(amount)}
              className={`rounded-2xl border px-4 py-3 text-sm font-bold transition ${selectedAmount === amount ? 'border-blue-600 bg-blue-600 text-white shadow-sm' : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-100'}`}
            >
              {isArabic ? `${amount} درهم` : `AED ${amount}`}
            </button>
          ))}
        </div>

        <div className="mt-6 flex flex-col gap-3 rounded-2xl bg-white p-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm text-slate-500">{isArabic ? 'المبلغ المحدد' : 'Selected amount'}</p>
            <p className="text-2xl font-black text-slate-900">
              {isArabic ? `${selectedAmount} درهم` : `AED ${selectedAmount}`}
            </p>
          </div>

          <button
            type="button"
            onClick={handleDonateClick}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-blue-700"
          >
            {isArabic ? 'المتابعة إلى صفحة التبرع الرسمية' : 'Continue to Official Donation Page'}
            <ArrowRight size={16} />
          </button>
        </div>

        <div className="mt-5 rounded-2xl border border-slate-200 bg-white p-4 text-sm text-slate-700">
          <p>
            <span className="font-bold">{isArabic ? 'الجهة المختارة:' : 'Selected organization:'}</span>{' '}
            {isArabic ? selectedOrg.nameArabic : selectedOrg.name}
          </p>
          <p className="mt-2">
            <span className="font-bold">{isArabic ? 'المبلغ:' : 'Amount:'}</span>{' '}
            {isArabic ? `${selectedAmount} درهم` : `AED ${selectedAmount}`}
          </p>
        </div>
      </div>

      {confirmOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-900/55 p-4">
          <div className="w-full max-w-lg rounded-[30px] bg-white p-6 shadow-[0_25px_80px_rgba(15,23,42,0.2)]">
            <h3 className="text-2xl font-black text-slate-900">
              {isArabic ? 'أنت تغادر HavenAid' : 'You\'re leaving HavenAid'}
            </h3>
            <p className="mt-4 text-sm leading-7 text-slate-600">
              {isArabic
                ? 'أنت على وشك الانتقال إلى الموقع الرسمي للجهة الخيرية.'
                : 'You are about to continue to the selected organization\'s official donation website.'}
            </p>

            <div className="mt-5 rounded-2xl bg-slate-50 p-4 text-sm text-slate-700">
              <p>
                <span className="font-bold">{isArabic ? 'المنظمة:' : 'Organization:'}</span>{' '}
                {isArabic ? selectedOrg.nameArabic : selectedOrg.name}
              </p>
              <p className="mt-2">
                <span className="font-bold">{isArabic ? 'المبلغ:' : 'Amount:'}</span>{' '}
                {isArabic ? `${selectedAmount} درهم` : `AED ${selectedAmount}`}
              </p>
            </div>

            <p className="mt-4 text-sm text-slate-600">
              {isArabic
                ? 'لا يقوم HavenAid بمعالجة أو تخزين معلومات الدفع.'
                : 'HavenAid does not process or store your payment information.'}
            </p>

            <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={() => setConfirmOpen(false)}
                className="rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-bold text-slate-700"
              >
                {isArabic ? 'إلغاء' : 'Cancel'}
              </button>
              <button
                type="button"
                onClick={() => openOfficialLink(selectedOrg.donationUrl)}
                className="rounded-xl bg-blue-600 px-5 py-3 text-sm font-bold text-white"
              >
                {isArabic ? 'المتابعة' : 'Continue'}
              </button>
            </div>

            {popupBlocked && (
              <div className="mt-4 rounded-2xl bg-amber-50 p-3 text-sm font-semibold text-amber-700">
                {isArabic ? 'تم حظر النافذة الجديدة.' : 'Your browser blocked the new tab.'}
                <a
                  href={selectedOrg.donationUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 inline-flex rounded-xl bg-blue-600 px-3 py-2 text-white"
                >
                  {isArabic ? 'فتح صفحة التبرع' : 'Open Donation Page'}
                </a>
              </div>
            )}
          </div>
        </div>
      )}

      {toast && (
        <div className="fixed right-4 top-24 z-[70] rounded-full border border-emerald-200 bg-emerald-50 px-4 py-2 text-sm font-semibold text-emerald-700 shadow-lg">
          {toast}
        </div>
      )}
    </div>
  );
}

export default DonatePage;
