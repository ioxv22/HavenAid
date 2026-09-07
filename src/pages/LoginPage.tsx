import React, { useState } from 'react';
import { Heart, LockKeyhole } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const adminEmail = 'admin@havenaid.org';
const adminPassword = 'admin123';

type LoginPageProps = {
  onLogin: (email: string) => void;
  language?: 'en' | 'ar';
};

function LoginPage({ onLogin, language = 'en' }: LoginPageProps) {
  const isArabic = language === 'ar';
  const navigate = useNavigate();
  const [email, setEmail] = useState(adminEmail);
  const [password, setPassword] = useState(adminPassword);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim() === adminEmail && password === adminPassword) {
      onLogin(email.trim());
      navigate('/dashboard');
      return;
    }
    setError(isArabic ? 'بيانات الدخول غير صحيحة. استخدم admin@havenaid.org / admin123' : 'Invalid admin credentials. Use admin@havenaid.org / admin123');
  };

  return (
    <div className="mx-auto flex min-h-[calc(100vh-160px)] max-w-5xl items-center justify-center px-4 py-12 sm:px-6">
      <div className="w-full max-w-xl rounded-[30px] border border-slate-200 bg-white p-8 shadow-[0_25px_70px_rgba(15,23,42,0.08)]">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 text-blue-700">
            <Heart size={28} />
          </div>
          <h1 className="text-4xl font-black text-slate-900">{isArabic ? 'تسجيل الدخول إلى HavenAid' : 'Sign in to HavenAid'}</h1>
          <p className="mt-3 text-sm text-slate-500">{isArabic ? 'بيانات الدخول التجريبية: admin@havenaid.org / admin123' : 'Demo credentials: admin@havenaid.org / admin123'}</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">{isArabic ? 'البريد الإلكتروني' : 'Email address'}</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-base outline-none transition focus:border-blue-400 focus:bg-white"
              placeholder="admin@havenaid.org"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">{isArabic ? 'كلمة المرور' : 'Password'}</label>
            <div className="flex items-center gap-2 rounded-2xl border border-slate-300 bg-slate-50 px-3 py-3 focus-within:border-blue-400 focus-within:bg-white">
              <LockKeyhole size={18} className="text-slate-500" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-transparent text-base outline-none"
                placeholder="••••••••"
              />
            </div>
          </div>

          {error && <p className="rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>}

          <button type="submit" className="w-full rounded-2xl bg-gradient-to-r from-blue-600 to-blue-500 px-5 py-4 text-base font-bold text-white shadow-[0_12px_30px_rgba(37,99,235,0.25)] transition hover:brightness-105">
            {isArabic ? 'تسجيل الدخول' : 'Sign In'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
