import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, MapPin, ShieldCheck } from 'lucide-react';

type FooterProps = {
  language?: 'en' | 'ar';
};

function Footer({ language = 'en' }: FooterProps) {
  const isArabic = language === 'ar';

  return (
    <footer className="bg-[#021b3d] text-white">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-4">
          <div>
            <div className="mb-4 flex items-center gap-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-white/10">
                <ShieldCheck className="h-5 w-5 text-blue-200" />
              </span>
              <span className="text-2xl font-black">HavenAid</span>
            </div>
            <p className="max-w-xs text-sm leading-7 text-blue-100/80">
              {isArabic ? 'تمكين العمل بنقرة واحدة في كل مرة.' : 'Empowering action, one click at a time.'}
            </p>
          </div>

          <div>
            <h4 className="mb-4 text-lg font-bold">{isArabic ? 'روابط سريعة' : 'Quick Links'}</h4>
            <ul className="space-y-2 text-sm text-blue-100/80">
              <li><Link to="/" className="hover:text-white">{isArabic ? 'الرئيسية' : 'Home'}</Link></li>
              <li><Link to="/presentation" className="hover:text-white">{isArabic ? 'العرض' : 'Presentation'}</Link></li>
              <li><Link to="/report" className="hover:text-white">{isArabic ? 'إبلاغ' : 'Report'}</Link></li>
              <li><Link to="/map" className="hover:text-white">{isArabic ? 'الخريطة' : 'Map'}</Link></li>
              <li><Link to="/my-reports" className="hover:text-white">{isArabic ? 'بلاغاتي' : 'My Reports'}</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-lg font-bold">{isArabic ? 'تواصل' : 'Contact'}</h4>
            <div className="space-y-3 text-sm text-blue-100/80">
              <a href="mailto:info@havenaid.org" className="flex items-center gap-2 hover:text-white"><Mail size={16} /> info@havenaid.org</a>
              <p className="flex items-center gap-2"><MapPin size={16} /> {isArabic ? 'دبي، الإمارات العربية المتحدة' : 'Dubai, UAE'}</p>
            </div>
          </div>

          <div>
            <h4 className="mb-4 text-lg font-bold">{isArabic ? 'إخلاء مسؤولية' : 'Disclaimer'}</h4>
            <p className="text-sm leading-7 text-blue-100/80">
              {isArabic ? 'هذا العرض التوضيحي لغرض توضيحي فقط ولا يعالج القضايا الإنسانية الحقيقية بعد.' : 'This website demo is for illustrative purposes only and does not yet handle real humanitarian issues.'}
            </p>
          </div>
        </div>

        <div className="mt-10 border-t border-white/10 pt-6 text-center text-sm text-blue-100/60">
          © {new Date().getFullYear()} HavenAid. Prototype for AI for Good / Humanitarian Action.
        </div>
      </div>
    </footer>
  );
}

export default Footer;