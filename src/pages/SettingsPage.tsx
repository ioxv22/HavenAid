import React from 'react';
import { Bell, Camera, MonitorSmartphone, ShieldCheck, SlidersHorizontal } from 'lucide-react';
import { SettingsState } from '../App';

type SettingsPageProps = {
  language?: 'en' | 'ar';
  settings: SettingsState;
  onSettingsChange: (next: SettingsState) => void;
};

function SettingsPage({ language = 'en', settings, onSettingsChange }: SettingsPageProps) {
  const isArabic = language === 'ar';
  const update = (patch: Partial<SettingsState>) => onSettingsChange({ ...settings, ...patch });

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-8 flex items-center gap-3">
        <div className="rounded-2xl bg-blue-100 p-3 text-blue-700">
          <SlidersHorizontal size={24} />
        </div>
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">{isArabic ? 'الإعدادات' : 'Settings'}</p>
          <h1 className="mt-2 text-4xl font-black text-slate-900">{isArabic ? 'تخصيص تجربة HavenAid' : 'Customize your HavenAid experience'}</h1>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <section className="rounded-[30px] border border-slate-200 bg-white p-6 shadow-sm">
          <div className="mb-5 flex items-center gap-3">
            <MonitorSmartphone className="text-blue-600" size={22} />
            <h2 className="text-xl font-black text-slate-900">{isArabic ? 'التفضيلات العامة' : 'General preferences'}</h2>
          </div>

          <div className="space-y-5">
            <label className="flex items-center justify-between rounded-2xl bg-slate-50 p-4">
              <span>{isArabic ? 'الوضع الداكن' : 'Dark mode'}</span>
              <select
                value={settings.theme}
                onChange={(e) => update({ theme: e.target.value as SettingsState['theme'] })}
                className="rounded-xl border border-slate-200 bg-white px-3 py-2"
              >
                <option value="light">Light</option>
                <option value="dark">Dark</option>
                <option value="system">System</option>
              </select>
            </label>

            <label className="flex items-center justify-between rounded-2xl bg-slate-50 p-4">
              <span className="flex items-center gap-2"><Bell size={16} /> {isArabic ? 'الإشعارات' : 'Notifications'}</span>
              <input type="checkbox" checked={settings.notifications} onChange={(e) => update({ notifications: e.target.checked })} />
            </label>

            <label className="flex items-center justify-between rounded-2xl bg-slate-50 p-4">
              <span className="flex items-center gap-2"><Camera size={16} /> {isArabic ? 'استخدام الكاميرا' : 'Camera access'}</span>
              <input type="checkbox" checked={settings.camera} onChange={(e) => update({ camera: e.target.checked })} />
            </label>
          </div>
        </section>

        <section className="rounded-[30px] border border-slate-200 bg-white p-6 shadow-sm">
          <div className="mb-5 flex items-center gap-3">
            <ShieldCheck className="text-emerald-600" size={22} />
            <h2 className="text-xl font-black text-slate-900">{isArabic ? 'السلامة والوصول' : 'Accessibility & safety'}</h2>
          </div>

          <div className="space-y-5">
            <label className="flex items-center justify-between rounded-2xl bg-slate-50 p-4">
              <span>{isArabic ? 'موقعك' : 'Location sharing'}</span>
              <input type="checkbox" checked={settings.location} onChange={(e) => update({ location: e.target.checked })} />
            </label>

            <label className="flex items-center justify-between rounded-2xl bg-slate-50 p-4">
              <span>{isArabic ? 'تباين عالي' : 'High contrast mode'}</span>
              <select
                value={settings.accessibility}
                onChange={(e) => update({ accessibility: e.target.value as SettingsState['accessibility'] })}
                className="rounded-xl border border-slate-200 bg-white px-3 py-2"
              >
                <option value="default">Default</option>
                <option value="high-contrast">High contrast</option>
              </select>
            </label>

            <div className="rounded-2xl bg-blue-50 p-4 text-sm text-slate-700">
              {isArabic ? 'تأكد من تحديث إعدادات الخصوصية قبل إرسال أي بيانات حساسة.' : 'Always review your privacy and safety settings before sending sensitive information.'}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default SettingsPage;
