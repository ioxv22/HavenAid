import React, { useEffect, useMemo, useState } from 'react';
import { BrowserRouter as Router, Navigate, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Report from './pages/Report';
import MyReports from './pages/MyReports';
import MapPage from './pages/MapPage';
import AIPage from './pages/AIPage';
import Safety from './pages/Safety';
import Contact from './pages/Contact';
import ResponsiveLanding from './pages/ResponsiveLanding';
import AboutPage from './pages/AboutPage';
import SuccessStoriesPage from './pages/SuccessStoriesPage';
import DonationPage from './pages/DonatePage';
import Presentation from './pages/Presentation';
import ImpactPage from './pages/ImpactPage';
import ResponsibleAIPage from './pages/ResponsibleAIPage';
import CybersecurityPage from './pages/CybersecurityPage';
import SettingsPage from './pages/SettingsPage';
import HelpPage from './pages/HelpPage';
import PresentationMode from './pages/PresentationMode';
import LoginPage from './pages/LoginPage';
import AdminDashboard from './pages/AdminDashboard';

export type ReportItem = {
  id: string;
  title: string;
  description: string;
  location: string;
  category: string;
  severity: string;
  urgency: string;
  people: string;
  image: string;
  status: string;
  createdAt: string;
  organization: string;
  needs: string[];
  timeline: string[];
  aiConfidence?: number;
  responder?: string;
  adminNote?: string;
};

export const statusOrder = ['Pending', 'In Review', 'Approved', 'Assigned', 'In Progress', 'Escalated', 'Resolved'];

const buildTimelineForStatus = (status: string, fallback: string[]) => {
  const statusMap: Record<string, string[]> = {
    Pending: ['Reported', 'AI Analyzed', 'Pending'],
    'In Review': ['Reported', 'AI Analyzed', 'In Review'],
    Approved: ['Reported', 'AI Analyzed', 'Approved'],
    Assigned: ['Reported', 'AI Analyzed', 'Approved', 'Assigned'],
    'In Progress': ['Reported', 'AI Analyzed', 'Approved', 'Assigned', 'In Progress'],
    Escalated: ['Reported', 'AI Analyzed', 'Approved', 'Assigned', 'In Progress', 'Escalated'],
    Resolved: ['Reported', 'AI Analyzed', 'Approved', 'Assigned', 'In Progress', 'Resolved'],
  };

  return statusMap[status] || fallback;
};

export type Language = 'en' | 'ar';
export type Role = 'citizen' | 'responder' | 'admin';
export type SettingsState = {
  theme: 'light' | 'dark' | 'system';
  notifications: boolean;
  location: boolean;
  camera: boolean;
  accessibility: 'default' | 'high-contrast';
};

const defaultReports: ReportItem[] = [
  {
    id: 'HA-DEMO-001',
    title: 'Collapsed Bridge Cutting Off Community Access to Essential Supplies',
    description: 'A key bridge connecting a rural village to nearby towns has collapsed due to severe flooding. This bridge was the only access point for food, medical supplies, and other essential resources.',
    location: 'Northern Region, Village of Al-Dahar',
    category: 'Infrastructure',
    severity: 'High',
    urgency: 'High',
    people: '45+',
    image: 'https://images.unsplash.com/photo-1521295121783-8a321d551ad2?auto=format&fit=crop&w=1200&q=80',
    status: 'Pending',
    createdAt: '2025-03-17',
    organization: 'Demo Emergency Relief Team',
    needs: ['Clean water', 'Temporary shelter', 'Medical support'],
    timeline: ['Reported', 'AI Analyzed', 'Responder Matching', 'Response', 'Resolved'],
    aiConfidence: 94,
    responder: 'Emergency Relief Team',
  },
  {
    id: 'HA-DEMO-002',
    title: 'Emergency Medical Supplies Needed',
    description: 'Local clinic running low on essential medical supplies including antibiotics and wound care materials.',
    location: 'Sana\'a, Yemen',
    category: 'Medical',
    severity: 'Critical',
    urgency: 'Critical',
    people: '120',
    image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=1200&q=80',
    status: 'In Review',
    createdAt: '2025-03-19',
    organization: 'Demo Medical Response Unit',
    needs: ['Antibiotics', 'Wound care', 'Mobile clinic'],
    timeline: ['Reported', 'AI Analyzed', 'Responder Matching', 'Response'],
    aiConfidence: 96,
    responder: 'Medical Response Unit',
  },
];

const storageKey = 'havenaid-reports';
const authKey = 'havenaid-auth';
const languageKey = 'havenaid-language';
const settingsKey = 'havenaid-settings';

export const analyzeDemoIssue = (form: {
  description: string;
  category: string;
  location: string;
  urgency: string;
  people: string;
  title?: string;
}) => {
  const text = `${form.description} ${form.category} ${form.location} ${form.urgency}`.toLowerCase();
  let category = form.category;
  if (text.includes('flood') || text.includes('water') || text.includes('overflow')) category = 'Flooding';
  if (text.includes('fire') || text.includes('smoke') || text.includes('burning')) category = 'Fire';
  if (text.includes('injury') || text.includes('medical') || text.includes('hospital') || text.includes('sick')) category = 'Medical';
  if (text.includes('road') || text.includes('bridge') || text.includes('building') || text.includes('collapse')) category = 'Infrastructure';
  if (text.includes('food') || text.includes('supply') || text.includes('water shortage')) category = 'Food & Water';

  let severity = 'Medium';
  if (form.urgency === 'Critical' || form.people.includes('45') || form.people.includes('100') || text.includes('danger')) severity = 'Critical';
  else if (form.urgency === 'High' || text.includes('urgent') || text.includes('collapse')) severity = 'High';

  const confidence = 91 + Math.min(7, Math.max(0, form.description.length / 80));
  const needs = [...new Set([
    category === 'Flooding' ? 'Clean water' : category === 'Medical' ? 'Medical assistance' : category === 'Infrastructure' ? 'Infrastructure assessment' : 'Emergency relief supplies',
    category === 'Flooding' ? 'Temporary shelter' : category === 'Medical' ? 'Mobile clinic support' : category === 'Infrastructure' ? 'Repair coordination' : 'Food distribution',
    category === 'Flooding' ? 'Medical assistance' : category === 'Medical' ? 'Emergency transport' : category === 'Infrastructure' ? 'Safety inspection' : 'Shelter support',
  ])];

  const actions = [
    category === 'Flooding' ? 'Assess affected residential areas.' : category === 'Medical' ? 'Coordinate urgent medical response.' : category === 'Infrastructure' ? 'Inspect damaged structures and access routes.' : 'Assess urgent needs and delivery routes.',
    category === 'Flooding' ? 'Provide emergency water supplies.' : category === 'Medical' ? 'Deploy mobile medical team.' : category === 'Infrastructure' ? 'Prioritize repair access and safe passage.' : 'Distribute food and water supplies.',
    category === 'Flooding' ? 'Coordinate temporary shelter.' : category === 'Medical' ? 'Support ambulance and field care.' : category === 'Infrastructure' ? 'Protect impacted communities and assess safety risks.' : 'Activate community support and shelter coordination.',
    'Prepare response timeline and field status updates.'
  ];

  return {
    title: form.title || 'Severe humanitarian issue',
    category,
    severity,
    confidence: Math.round(confidence),
    needs,
    actions,
    reason: {
      image: category === 'Flooding' ? 'Visible floodwater and submerged infrastructure' : 'Visual indicators suggest urgent impact',
      text: 'Description highlights risk to people and local access',
      location: form.location ? 'Location suggests a vulnerable area requiring rapid assessment' : 'Location context is not yet precise',
      severity: 'Multiple people may be affected and immediate assistance may be needed',
    },
    responder: 'Demo Emergency Response Team',
  };
};

function App() {
  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem(languageKey) as Language | null;
    return saved || 'en';
  });

  const [settings, setSettings] = useState<SettingsState>(() => {
    const raw = localStorage.getItem(settingsKey);
    if (!raw) return { theme: 'light', notifications: true, location: true, camera: true, accessibility: 'default' };
    try {
      return JSON.parse(raw) as SettingsState;
    } catch {
      return { theme: 'light', notifications: true, location: true, camera: true, accessibility: 'default' };
    }
  });

  const [reports, setReports] = useState<ReportItem[]>(() => {
    const raw = localStorage.getItem(storageKey);
    if (!raw) return defaultReports;
    try {
      return JSON.parse(raw) as ReportItem[];
    } catch {
      return defaultReports;
    }
  });

  const [role, setRole] = useState<Role>('citizen');
  const [user, setUser] = useState<string | null>(() => localStorage.getItem(authKey));
  const [toast, setToast] = useState<string | null>(null);
  const [notifications, setNotifications] = useState<Array<{ id: string; type: string; message: string; read: boolean }>>([
    { id: 'n1', type: 'critical', message: 'New high-priority report received', read: false },
    { id: 'n2', type: 'ai', message: 'AI analysis completed for Flooding report', read: false },
    { id: 'n3', type: 'status', message: 'Responder matched and review queued', read: true },
  ]);

  useEffect(() => {
    localStorage.setItem(languageKey, language);
  }, [language]);

  useEffect(() => {
    localStorage.setItem(settingsKey, JSON.stringify(settings));
  }, [settings]);

  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(reports));
  }, [reports]);

  useEffect(() => {
    if (user) {
      localStorage.setItem(authKey, user);
    } else {
      localStorage.removeItem(authKey);
    }
  }, [user]);

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 2800);
    return () => clearTimeout(t);
  }, [toast]);

  const addReport = (payload: Omit<ReportItem, 'id' | 'status' | 'createdAt' | 'timeline' | 'organization'> & { image?: string }) => {
    const analysis = analyzeDemoIssue({
      description: payload.description,
      category: payload.category,
      location: payload.location,
      urgency: payload.urgency,
      people: payload.people,
      title: payload.title,
    });

    const newItem: ReportItem = {
      ...payload,
      id: `HA-${new Date().getFullYear()}-${String(Date.now()).slice(-6)}`,
      status: 'Pending Review',
      createdAt: new Date().toISOString().slice(0, 10),
      organization: 'Admin review queue',
      timeline: ['Submitted', 'AI triage', 'Admin review', 'Assignment'],
      image: payload.image || 'https://images.unsplash.com/photo-1521295121783-8a321d551ad2?auto=format&fit=crop&w=1200&q=80',
      aiConfidence: analysis.confidence,
      responder: 'Awaiting assignment',
      adminNote: 'Submitted by citizen and waiting for management review.',
      needs: analysis.needs,
      severity: analysis.severity,
      category: analysis.category,
    };

    setReports((current) => [newItem, ...current]);
    setNotifications((current) => [
      { id: `n-${Date.now()}`, type: 'new', message: `New ${analysis.severity.toLowerCase()} report detected for ${analysis.category}`, read: false },
      ...current,
    ]);
    setToast(language === 'ar' ? 'تم إرسال البلاغ إلى الإدارة بنجاح' : 'Report submitted successfully');
  };

  const updateReportStatus = (id: string, nextStatus: string, note?: string, responder?: string) => {
    setReports((current) => current.map((report) => {
      if (report.id !== id) return report;
      const statusValue = nextStatus === 'Approved & Assigned' ? 'Assigned' : nextStatus;
      const nextTimeline = buildTimelineForStatus(statusValue, Array.from(new Set([...report.timeline, statusValue])));
      return {
        ...report,
        status: statusValue,
        adminNote: note || report.adminNote,
        responder: responder || report.responder,
        timeline: nextTimeline,
        organization: responder || report.organization,
      };
    }));

    const transformedStatus = nextStatus === 'Approved & Assigned' ? 'Assigned' : nextStatus;
    const messages: Record<string, string> = {
      Approved: language === 'ar' ? 'تم اعتماد البلاغ بنجاح' : 'Report approved successfully',
      Assigned: language === 'ar' ? 'تم تعيين فريق الاستجابة بنجاح' : 'Response team assigned',
      Escalated: language === 'ar' ? 'تم تصعيد البلاغ بنجاح' : 'Issue escalated successfully',
      Resolved: language === 'ar' ? 'تم حل البلاغ بنجاح' : 'Issue marked as resolved',
    };

    setToast(messages[transformedStatus] || (language === 'ar' ? 'تم تحديث حالة البلاغ' : 'Report status updated'));
  };

  const logout = () => setUser(null);
  const navUser = useMemo(() => (user ? 'admin' : null), [user]);
  const direction = language === 'ar' ? 'rtl' : 'ltr';

  return (
    <Router>
      <div dir={direction} className={`min-h-screen flex flex-col bg-slate-100 text-slate-900 ${settings.theme === 'dark' ? 'dark bg-slate-950 text-white' : ''} ${settings.accessibility === 'high-contrast' ? 'contrast-125' : ''}`}>
        <Navbar user={navUser} onLogout={logout} language={language} setLanguage={setLanguage} role={role} setRole={setRole} notifications={notifications} />
        <main className="flex-grow pb-24 lg:pb-0">
          <Routes>
            <Route path="/" element={<ResponsiveLanding language={language} />} />
            <Route path="/home" element={<ResponsiveLanding language={language} />} />
            <Route path="/about" element={<AboutPage language={language} />} />
            <Route path="/success-stories" element={<SuccessStoriesPage language={language} />} />
            <Route path="/track" element={<MyReports reports={reports} language={language} />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/donate" element={<DonationPage language={language} />} />
            <Route path="/presentation" element={<Presentation language={language} />} />
            <Route path="/login" element={<LoginPage onLogin={(email) => { setUser(email); setToast(language === 'ar' ? 'تم تسجيل الدخول بنجاح' : `Signed in as ${email}`); }} language={language} />} />
            <Route path="/demo" element={<Report onSubmit={addReport} language={language} settings={settings} />} />
            <Route path="/report" element={<Report onSubmit={addReport} language={language} settings={settings} />} />
            <Route path="/my-reports" element={<MyReports reports={reports} language={language} />} />
            <Route path="/map" element={<MapPage reports={reports} language={language} />} />
            <Route path="/ai" element={<AIPage language={language} />} />
            <Route path="/impact" element={<ImpactPage language={language} />} />
            <Route path="/responsible-ai" element={<ResponsibleAIPage language={language} />} />
            <Route path="/cybersecurity" element={<CybersecurityPage language={language} />} />
            <Route path="/safety" element={<ResponsibleAIPage language={language} />} />
            <Route path="/settings" element={<SettingsPage language={language} settings={settings} onSettingsChange={setSettings} />} />
            <Route path="/help" element={<HelpPage language={language} />} />
            <Route path="/presentation-mode" element={<PresentationMode language={language} />} />
            <Route path="/dashboard" element={user ? <AdminDashboard reports={reports} role={role} setRole={setRole} language={language} onUpdateReport={updateReportStatus} /> : <Navigate to="/login" replace />} />
            <Route path="/admin" element={user ? <AdminDashboard reports={reports} role={role} setRole={setRole} language={language} onUpdateReport={updateReportStatus} /> : <Navigate to="/login" replace />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
        <Footer language={language} />
        {toast && (
          <div className="fixed right-4 top-24 z-[60] rounded-full border border-emerald-200 bg-emerald-50 px-4 py-2 text-sm font-semibold text-emerald-700 shadow-lg">
            {toast}
          </div>
        )}
      </div>
    </Router>
  );
}

export default App;