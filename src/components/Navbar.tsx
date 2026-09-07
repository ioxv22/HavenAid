import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Menu, X, Heart, Globe, ShieldCheck, Home, MapPinned, FileText, FolderOpen, User, LogOut, Bell, Settings } from 'lucide-react';

const navItems = [
  { to: '/', label: 'Home' },
  { to: '/#how-it-works', label: 'How It Works' },
  { to: '/#try-havenaid', label: 'Try HavenAid' },
  { to: '/success-stories', label: 'Success Stories' },
  { to: '/track', label: 'Track' },
  { to: '/donate', label: 'Donate' },
  { to: '/dashboard', label: 'Dashboard' },
];

type NavbarProps = {
  user?: string | null;
  onLogout?: () => void;
  language?: 'en' | 'ar';
  setLanguage?: (value: 'en' | 'ar') => void;
  role?: 'citizen' | 'responder' | 'admin';
  setRole?: (value: 'citizen' | 'responder' | 'admin') => void;
  notifications?: Array<{ id: string; type: string; message: string; read: boolean }>;
};

function Navbar({ user, onLogout, language = 'en', setLanguage, role = 'citizen', setRole, notifications = [] }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const isArabic = language === 'ar';

  return (
    <nav className="sticky top-0 z-40 border-b border-blue-700/60 bg-[#0c5cd9] shadow-[0_10px_30px_rgba(14,84,191,0.18)] backdrop-blur-sm">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between lg:h-20">
          <Link to="/" className="flex items-center gap-3 text-white">
            <span className="flex h-8 w-8 items-center justify-center rounded-full border border-white/30 bg-white/10 lg:h-9 lg:w-9">
              <Heart className="h-4 w-4 lg:h-5 lg:w-5" />
            </span>
            <span className="text-xl font-black tracking-tight lg:text-2xl">HavenAid</span>
          </Link>

          <div className="hidden items-center gap-4 lg:flex xl:gap-6">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `text-xs font-semibold transition xl:text-sm ${isActive ? 'text-white' : 'text-blue-100 hover:text-white'}`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </div>

          <div className="hidden items-center gap-2 lg:flex xl:gap-3">
            <button
              type="button"
              onClick={() => setLanguage?.(isArabic ? 'en' : 'ar')}
              className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-2.5 py-1.5 text-xs font-semibold text-white transition hover:bg-white/15 xl:px-3 xl:py-2 xl:text-sm"
            >
              <Globe size={15} />
              {isArabic ? 'English | العربية' : 'العربية | English'}
            </button>
            <button type="button" className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-2.5 py-1.5 text-xs font-semibold text-white transition hover:bg-white/15 xl:px-3 xl:py-2 xl:text-sm">
              <Bell size={15} />
              {notifications.filter((n) => !n.read).length}
            </button>
            {user ? (
              <button type="button" onClick={onLogout} className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-2 text-xs font-bold text-blue-700 shadow-sm transition hover:bg-blue-50 xl:px-4 xl:text-sm">
                <LogOut size={15} />
                Logout
              </button>
            ) : (
              <a href="#try-havenaid" className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-2 text-xs font-bold text-blue-700 shadow-sm transition hover:bg-blue-50 xl:px-4 xl:text-sm">
                Try HavenAid
              </a>
            )}
          </div>

          <div className="flex items-center gap-3 lg:hidden">
            <button
              type="button"
              onClick={() => setLanguage?.(isArabic ? 'en' : 'ar')}
              className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-2.5 py-1.5 text-xs font-semibold text-white"
            >
              <Globe size={12} />
              {isArabic ? 'EN' : 'AR'}
            </button>
            <button onClick={() => setIsOpen(!isOpen)} className="text-white" type="button">
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="border-t border-blue-700/60 bg-[#0c5cd9] lg:hidden">
          <div className="mx-auto max-w-7xl space-y-1 px-4 py-3">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                onClick={() => setIsOpen(false)}
                className={({ isActive }) =>
                  `block rounded-xl px-3 py-2 text-base font-semibold ${isActive ? 'bg-white/10 text-white' : 'text-blue-100 hover:bg-white/5 hover:text-white'}`
                }
              >
                {item.label}
              </NavLink>
            ))}
            <div className="mt-3 flex items-center gap-3 border-t border-white/15 pt-3">
              <a href="#try-havenaid" className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-2 text-sm font-semibold text-white">
                <ShieldCheck size={15} />
                Try HavenAid
              </a>
              <Link to="/settings" className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-2 text-sm font-semibold text-white">
                <Settings size={15} />
                Settings
              </Link>
            </div>
            {setRole && (
              <div className="mt-3 flex items-center gap-2 rounded-xl bg-white/5 p-2">
                {(['citizen', 'responder', 'admin'] as const).map((option) => (
                  <button
                    key={option}
                    type="button"
                    onClick={() => setRole(option)}
                    className={`rounded-lg px-2 py-1 text-xs font-semibold capitalize ${role === option ? 'bg-white text-blue-700' : 'text-blue-100'}`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      <div className="fixed inset-x-0 bottom-0 z-50 border-t border-slate-200 bg-white/95 shadow-[0_-6px_30px_rgba(15,23,42,0.08)] backdrop-blur-md lg:hidden">
        <div className="mx-auto grid max-w-md grid-cols-5 gap-1 px-2 py-2">
          {[
            { to: '/', label: 'Home', icon: Home },
            { to: '/report', label: 'Report', icon: FileText },
            { to: '/map', label: 'Map', icon: MapPinned },
            { to: '/my-reports', label: 'Reports', icon: FolderOpen },
            { to: '/dashboard', label: 'Profile', icon: User },
          ].map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `flex flex-col items-center justify-center gap-1 rounded-xl px-2 py-2 text-[11px] font-semibold ${isActive ? 'bg-blue-50 text-blue-700' : 'text-slate-500'}`
              }
            >
              <Icon size={18} />
              <span>{label}</span>
            </NavLink>
          ))}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;