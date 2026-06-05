'use client';

import { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import Logo from '@/components/Logo';

type Application = {
  _id: string;
  propertyTitle: string;
  fullName: string;
  email: string;
  phone: string;
  employmentStatus: string;
  grossAnnualIncome: number;
  proposedMoveIn: string;
  status: 'Under Review' | 'Approved' | 'Rejected';
  createdAt: string;
};

type Inquiry = {
  _id: string;
  fullName: string;
  email: string;
  inquiryType: string;
  message: string;
  isRead: boolean;
  replyMessage?: string;
  repliedAt?: string;
  isReplied?: boolean;
  createdAt: string;
};

type Property = {
  _id: string;
  title: string;
  category: string;
  location: string;
  monthlyRate: number;
  isAvailable: boolean;
  images?: string[];
};

type Tab = 'applications' | 'inquiries' | 'properties';

const STATUS_STYLES: Record<string, string> = {
  'Under Review': 'status-review badge',
  'Approved':     'status-approved badge',
  'Rejected':     'status-rejected badge',
};

const CATEGORY_COLORS: Record<string, string> = {
  Apartment: 'text-blue-400 bg-blue-500/10 border-blue-500/20',
  Studio:    'text-purple-400 bg-purple-500/10 border-purple-500/20',
  Office:    'text-green-400 bg-green-500/10 border-green-500/20',
  Villa:     'text-amber-400 bg-amber-500/10 border-amber-500/20',
};

export default function AdminDashboardPage() {
  const router = useRouter();
  const [tab, setTab]                     = useState<Tab>('applications');
  const [applications, setApplications]   = useState<Application[]>([]);
  const [inquiries,    setInquiries]       = useState<Inquiry[]>([]);
  const [properties,  setProperties]       = useState<Property[]>([]);
  const [loading,     setLoading]          = useState(true);
  const [updating,    setUpdating]         = useState<string | null>(null);

  // Email replies state variables
  const [replyingInquiryId, setReplyingInquiryId] = useState<string | null>(null);
  const [replyText, setReplyText]                 = useState('');
  const [submittingReplyId, setSubmittingReplyId] = useState<string | null>(null);

  const fetchAll = useCallback(async () => {
    setLoading(true);
    try {
      const [appRes, inqRes, propRes] = await Promise.all([
        fetch('/api/applications'),
        fetch('/api/inquiries'),
        fetch('/api/properties'),
      ]);
      const [appData, inqData, propData] = await Promise.all([
        appRes.json(), inqRes.json(), propRes.json(),
      ]);
      setApplications(appData.data || []);
      setInquiries(inqData.data    || []);
      setProperties(propData.data  || []);
    } catch { /* swallow */ }
    setLoading(false);
  }, []);

  useEffect(() => { fetchAll(); }, [fetchAll]);

  const updateAppStatus = async (id: string, status: string) => {
    setUpdating(id);
    await fetch(`/api/applications/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    });
    setApplications(prev => prev.map(a => a._id === id ? { ...a, status: status as Application['status'] } : a));
    setUpdating(null);
  };

  const markInquiryRead = async (id: string, isRead: boolean) => {
    await fetch(`/api/inquiries/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ isRead }),
    });
    setInquiries(prev => prev.map(i => i._id === id ? { ...i, isRead } : i));
  };

  const submitInquiryReply = async (id: string) => {
    if (!replyText.trim()) return;
    setSubmittingReplyId(id);
    try {
      const res = await fetch(`/api/inquiries/${id}/reply`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ replyMessage: replyText }),
      });
      const json = await res.json();
      if (json.success) {
        setInquiries(prev =>
          prev.map(i =>
            i._id === id
              ? {
                  ...i,
                  isReplied: true,
                  replyMessage: replyText,
                  repliedAt: new Date().toISOString(),
                  isRead: true,
                }
              : i
          )
        );
        setReplyingInquiryId(null);
        setReplyText('');
      } else {
        alert(json.error || 'Failed to send reply');
      }
    } catch {
      alert('Connection error. Please try again.');
    } finally {
      setSubmittingReplyId(null);
    }
  };

  const handleLogout = async () => {
    await fetch('/api/admin/logout', { method: 'POST' });
    router.push('/admin/login');
  };

  const stats = {
    total:      applications.length,
    review:     applications.filter(a => a.status === 'Under Review').length,
    approved:   applications.filter(a => a.status === 'Approved').length,
    rejected:   applications.filter(a => a.status === 'Rejected').length,
    unread:     inquiries.filter(i => !i.isRead).length,
    available:  properties.filter(p => p.isAvailable).length,
  };

  const TABS: { id: Tab; icon: string; label: string; badge?: number }[] = [
    { id: 'applications', icon: 'uil-file-contract',  label: 'Applications',  badge: stats.review },
    { id: 'inquiries',    icon: 'uil-envelope',        label: 'Mailbox',       badge: stats.unread },
    { id: 'properties',   icon: 'uil-building',        label: 'Properties' },
  ];

  return (
    <div 
      className="min-h-screen flex bg-navy-950 text-white font-inter overflow-hidden"
      style={{ background: 'radial-gradient(circle at top right, #0e1e4c 0%, #050d24 80%)' }}
    >
      {/* ─── SIDEBAR ────────────────────────────────────────── */}
      <aside 
        className="w-64 hidden lg:flex flex-col shrink-0 p-5 glass-card m-4 mr-0 relative border-white/6"
        style={{ height: 'calc(100vh - 2rem)', background: 'rgba(5, 13, 36, 0.75)', backdropFilter: 'blur(30px)' }}
      >
        {/* Glow */}
        <div className="absolute -top-10 -left-10 w-40 h-40 rounded-full opacity-10 blur-3xl pointer-events-none"
          style={{ background: 'radial-gradient(circle, #F5A623, transparent)' }} />

        {/* Logo */}
        <div className="flex items-center gap-2.5 pb-5 border-b border-white/6 mb-6">
          <Logo className="w-8 h-8" />
          <span className="font-outfit font-extrabold text-lg text-white">Lanka<span className="text-gold-500">Rent</span></span>
        </div>

        {/* User profile */}
        <div className="flex items-center gap-3 p-3 rounded-2xl mb-6 bg-white/4 border border-white/6">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center font-outfit font-bold text-navy-900 text-sm"
            style={{ background: 'linear-gradient(135deg, #F5A623 0%, #fbbf24 100%)' }}>
            AD
          </div>
          <div>
            <div className="font-outfit font-bold text-white text-xs leading-none">System Admin</div>
            <div className="text-white/40 text-[9px] font-inter uppercase tracking-wider mt-1.5">Control Center</div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav className="space-y-1.5 flex-1">
          {TABS.map(({ id, icon, label, badge }) => {
            const active = tab === id;
            return (
              <button
                key={id}
                onClick={() => setTab(id)}
                className={`w-full flex items-center justify-between px-4 py-3.5 rounded-xl text-sm font-outfit font-bold transition-all duration-300 relative group ${
                  active ? 'text-navy-900 shadow-lg' : 'text-white/50 hover:text-white/80 hover:bg-white/4'
                }`}
                style={active ? { background: 'linear-gradient(135deg, #F5A623 0%, #fbbf24 100%)', boxShadow: '0 8px 24px rgba(245, 166, 35, 0.25)' } : {}}
              >
                <div className="flex items-center gap-2.5">
                  <i className={`uil ${icon} text-lg ${active ? 'text-navy-900' : 'text-white/40 group-hover:text-white'}`} />
                  <span>{label}</span>
                </div>
                {badge !== undefined && badge > 0 && (
                  <span className={`px-1.5 py-0.5 rounded-full text-2xs font-bold ${active ? 'bg-navy-900/20 text-navy-900' : 'bg-gold-500/20 text-gold-500'}`}>
                    {badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Footer actions */}
        <div className="pt-5 border-t border-white/6 space-y-2.5">
          <Link href="/" target="_blank" className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-outfit font-bold text-white/50 hover:text-white hover:bg-white/4 transition-all duration-300">
            <i className="uil uil-external-link-alt text-sm text-white/35" />
            <span>Visit Site</span>
          </Link>
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-outfit font-bold transition-all duration-300"
            style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.2)', color: '#f87171' }}
          >
            <i className="uil uil-sign-out-alt text-sm" />
            <span>Logout Portal</span>
          </button>
        </div>
      </aside>

      {/* ─── MAIN CONTENT ───────────────────────────────────── */}
      <main className="flex-1 p-4 lg:p-6 overflow-y-auto max-h-screen">
        
        {/* Header Greeting */}
        <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="font-outfit font-black text-2xl sm:text-3xl text-white">
              Welcome, <span className="text-gold-gradient">System Administrator</span>
            </h1>
            <p className="text-white/40 font-inter text-xs mt-1">
              Real-time monitoring panel for LankaRent leases, mailbox, and database.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button onClick={fetchAll} className="btn-outline text-xs py-2 px-4 whitespace-nowrap bg-navy-900/30">
              <i className="uil uil-redo" />
              <span>Sync Database</span>
            </button>
            <Link href="/" target="_blank" className="lg:hidden text-white/40 hover:text-white/70 text-xs font-inter flex items-center gap-1 transition-colors">
              <i className="uil uil-external-link-alt" />
              <span>View Site</span>
            </Link>
            <button onClick={handleLogout} className="lg:hidden flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-outfit font-semibold transition-all duration-200"
              style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.2)', color: '#f87171' }}>
              <i className="uil uil-sign-out-alt text-sm" />
            </button>
          </div>
        </header>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 mb-6">
          {[
            { icon: 'uil-file-alt',      grad: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)', shadow: 'rgba(59, 130, 246, 0.25)', label: 'Total Apps',     val: stats.total },
            { icon: 'uil-hourglass',     grad: 'linear-gradient(135deg, #F5A623 0%, #b45309 100%)', shadow: 'rgba(245, 166, 35, 0.25)', label: 'Reviewing', val: stats.review },
            { icon: 'uil-check-circle',  grad: 'linear-gradient(135deg, #10b981 0%, #047857 100%)', shadow: 'rgba(16, 185, 129, 0.25)', label: 'Approved',  val: stats.approved },
            { icon: 'uil-times-circle',  grad: 'linear-gradient(135deg, #ef4444 0%, #b91c1c 100%)', shadow: 'rgba(239, 68, 68, 0.25)',  label: 'Rejected',  val: stats.rejected },
            { icon: 'uil-envelope',      grad: 'linear-gradient(135deg, #a855f7 0%, #6b21a8 100%)', shadow: 'rgba(168, 85, 247, 0.25)', label: 'Unread Mail', val: stats.unread },
            { icon: 'uil-home-alt',      grad: 'linear-gradient(135deg, #fbbf24 0%, #d97706 100%)', shadow: 'rgba(251, 191, 36, 0.25)', label: 'Available', val: stats.available },
          ].map(({ icon, grad, shadow, label, val }) => (
            <div key={label} className="glass-card p-4 relative overflow-hidden group hover:border-white/20 transition-all duration-300"
              style={{ background: 'rgba(255,255,255,0.04)', boxShadow: `0 8px 30px rgba(0,0,0,0.3)` }}>
              {/* Backglow on hover */}
              <div className="absolute top-0 right-0 w-24 h-24 rounded-full opacity-0 group-hover:opacity-10 blur-xl transition-all duration-500 pointer-events-none"
                style={{ background: grad }} />

              <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-3 text-white shadow-md transition-transform duration-300 group-hover:scale-110"
                style={{ background: grad, boxShadow: `0 4px 12px ${shadow}` }}>
                <i className={`uil ${icon} text-lg`} />
              </div>
              <div className="font-outfit font-black text-2xl text-white tracking-tight">{val}</div>
              <div className="text-white/40 text-xs font-inter mt-1">{label}</div>
            </div>
          ))}
        </div>

        {/* Mobile Navigation bar */}
        <div className="lg:hidden flex gap-1 mb-6 glass-card p-1 w-full overflow-x-auto">
          {TABS.map(({ id, icon, label, badge }) => (
            <button
              key={id}
              onClick={() => setTab(id)}
              className={`flex-1 flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-outfit font-bold whitespace-nowrap transition-all duration-200 ${
                tab === id ? 'text-navy-900' : 'text-white/50 hover:text-white/80'
              }`}
              style={tab === id ? { background: 'linear-gradient(135deg,#F5A623,#fbbf24)' } : {}}
            >
              <i className={`uil ${icon} text-sm`} />
              {label}
              {badge !== undefined && badge > 0 && (
                <span className={`px-1 py-0.5 rounded-full text-[10px] font-bold ${tab === id ? 'bg-navy-900/30 text-navy-900' : 'bg-gold-500/20 text-gold-500'}`}>
                  {badge}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Content Panel */}
        {loading ? (
          <div className="glass-card py-32 flex items-center justify-center">
            <div className="text-center">
              <div className="w-10 h-10 border-2 border-t-gold-500 border-white/10 rounded-full animate-spin mx-auto mb-4" />
              <p className="text-white/40 font-inter text-xs">Retrieving database sync records...</p>
            </div>
          </div>
        ) : (
          <div className="animate-fade-in-up">
            {/* APPLICATIONS TAB */}
            {tab === 'applications' && (
              <div className="glass-card overflow-hidden">
                <div className="px-6 py-4 flex items-center justify-between" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                  <h2 className="font-outfit font-bold text-white text-base">
                    Applicant Screening Matrix
                    <span className="ml-2 text-white/40 font-normal text-sm">({applications.length} total)</span>
                  </h2>
                </div>
                {applications.length === 0 ? (
                  <div className="py-16 text-center text-white/30 font-inter text-sm">
                    <i className="uil uil-file-alt text-3xl block mb-2" />
                    No applications received yet
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full admin-table">
                      <thead>
                        <tr>
                          <th>Applicant</th>
                          <th>Property</th>
                          <th>Proposed Move-in</th>
                          <th>Income Meter (Min 600K)</th>
                          <th>Status</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {applications.map((app) => {
                          const incomePercent = Math.min(100, Math.max(0, ((app.grossAnnualIncome - 600000) / 1400000) * 100));
                          const userInitial = app.fullName.charAt(0).toUpperCase();

                          return (
                            <tr key={app._id}>
                              <td>
                                <div className="flex items-center gap-3">
                                  <div className="w-9 h-9 rounded-full flex items-center justify-center shrink-0 border border-white/10 text-xs font-bold font-outfit"
                                    style={{ background: 'rgba(245,166,35,0.12)', color: '#F5A623' }}>
                                    {userInitial}
                                  </div>
                                  <div>
                                    <div className="font-outfit font-bold text-white text-sm leading-tight">{app.fullName}</div>
                                    <div className="text-white/40 text-[10px] font-inter mt-1">{app.email} &bull; {app.phone}</div>
                                  </div>
                                </div>
                              </td>
                              <td>
                                <div className="text-white/80 font-medium text-xs max-w-xs truncate">{app.propertyTitle}</div>
                              </td>
                              <td className="text-white/60 text-xs font-medium">
                                {new Date(app.proposedMoveIn).toLocaleDateString('en-LK', { month: 'short', day: 'numeric', year: 'numeric' })}
                              </td>
                              <td className="min-w-44">
                                <div className="flex items-center justify-between text-[10px] mb-1 font-inter">
                                  <span className="text-white/50">{app.employmentStatus}</span>
                                  <span className="text-white font-bold">LKR {app.grossAnnualIncome.toLocaleString()}/yr</span>
                                </div>
                                <div className="w-full h-1.5 rounded-full bg-white/5 overflow-hidden">
                                  <div className="h-full rounded-full bg-emerald-500" style={{ width: `${incomePercent}%` }} />
                                </div>
                              </td>
                              <td>
                                <span className={STATUS_STYLES[app.status]}>
                                  {app.status}
                                </span>
                              </td>
                              <td>
                                <div className="flex items-center gap-2">
                                  <select
                                    value={app.status}
                                    disabled={updating === app._id}
                                    onChange={(e) => updateAppStatus(app._id, e.target.value)}
                                    className="form-select text-xs py-1 px-2.5 pr-7 w-32 border-white/10"
                                  >
                                    <option value="Under Review">Reviewing</option>
                                    <option value="Approved">Approve</option>
                                    <option value="Rejected">Reject</option>
                                  </select>
                                  {updating === app._id && (
                                    <div className="w-3.5 h-3.5 border border-t-gold-500 border-white/10 rounded-full animate-spin shrink-0" />
                                  )}
                                </div>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            )}

            {/* INQUIRIES TAB */}
            {tab === 'inquiries' && (
              <div className="space-y-4">
                <div className="glass-card px-6 py-4 flex items-center justify-between" style={{ borderRadius: '1.25rem' }}>
                  <h2 className="font-outfit font-bold text-white text-base">
                    Inquiry Mailbox
                    <span className="ml-2 text-white/40 font-normal text-sm">({inquiries.length} messages)</span>
                  </h2>
                  {stats.unread > 0 && (
                    <span className="badge status-review">{stats.unread} unread</span>
                  )}
                </div>
                {inquiries.length === 0 ? (
                  <div className="glass-card py-16 text-center text-white/30 font-inter text-sm">
                    <i className="uil uil-envelope text-3xl block mb-2" />
                    No inquiries received yet
                  </div>
                ) : (
                  inquiries.map((inq) => (
                    <div
                      key={inq._id}
                      className="glass-card p-5 transition-all duration-300 hover:border-white/10"
                      style={!inq.isRead ? { borderColor: 'rgba(245,166,35,0.2)', background: 'rgba(245,166,35,0.03)' } : {}}
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex items-start gap-3 flex-1 min-w-0">
                          <div className="w-9 h-9 rounded-full flex items-center justify-center shrink-0"
                            style={{ background: 'rgba(245,166,35,0.1)', border: '1px solid rgba(245,166,35,0.2)' }}>
                            <span className="font-outfit font-bold text-gold-500 text-xs">
                              {inq.fullName.charAt(0).toUpperCase()}
                            </span>
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex flex-wrap items-center gap-2 mb-1">
                              <span className="font-outfit font-bold text-white text-sm">{inq.fullName}</span>
                              <span className="text-[10px] font-bold px-2 py-0.5 rounded-md border" 
                                style={{ background: 'rgba(147,197,253,0.1)', color: '#93c5fd', borderColor: 'rgba(147,197,253,0.2)' }}>
                                {inq.inquiryType}
                              </span>
                              {inq.isReplied && (
                                <span className="text-[10px] font-bold px-2 py-0.5 rounded-md border" 
                                  style={{ background: 'rgba(16,185,129,0.1)', color: '#10b981', borderColor: 'rgba(16,185,129,0.2)' }}>
                                  Replied
                                </span>
                              )}
                              {!inq.isRead && (
                                <span className="w-1.5 h-1.5 rounded-full bg-gold-500 inline-block" style={{ boxShadow: '0 0 6px rgba(245,166,35,0.6)' }} />
                              )}
                            </div>
                            <div className="text-white/40 text-[10px] font-inter mb-2.5">{inq.email}</div>
                            <p className="text-white/70 text-sm font-inter leading-relaxed">{inq.message}</p>
                            
                            {/* Render Admin Response history if replied */}
                            {inq.isReplied && inq.replyMessage && (
                              <div className="mt-4 p-4 rounded-xl border border-emerald-500/10" style={{ background: 'rgba(16,185,129,0.02)' }}>
                                <div className="flex items-center gap-1.5 text-[10px] font-bold text-emerald-400 font-outfit uppercase tracking-wider mb-1.5">
                                  <i className="uil uil-reply" />
                                  Admin Response
                                  {inq.repliedAt && (
                                    <span className="text-white/30 font-normal normal-case ml-auto">
                                      Replied on {new Date(inq.repliedAt).toLocaleDateString('en-LK', { month: 'short', day: 'numeric', year: 'numeric' })}
                                    </span>
                                  )}
                                </div>
                                <p className="text-white/80 text-xs font-inter whitespace-pre-wrap">{inq.replyMessage}</p>
                              </div>
                            )}

                            {/* Render Inline Reply Editor */}
                            {replyingInquiryId === inq._id && (
                              <div className="mt-4 p-4 rounded-xl border border-white/10 bg-white/2 space-y-3">
                                <div className="font-outfit font-bold text-white text-xs">Compose Reply Email to {inq.fullName}</div>
                                <textarea
                                  value={replyText}
                                  onChange={(e) => setReplyText(e.target.value)}
                                  placeholder="Type your email response here..."
                                  rows={4}
                                  className="form-input text-xs w-full min-h-[80px]"
                                  style={{ background: 'rgba(5, 13, 36, 0.4)' }}
                                  required
                                />
                                <div className="flex justify-end gap-2">
                                  <button
                                    type="button"
                                    onClick={() => {
                                      setReplyingInquiryId(null);
                                      setReplyText('');
                                    }}
                                    className="btn-outline py-1.5 px-3 text-xs font-bold font-outfit"
                                    style={{ background: 'rgba(255,255,255,0.05)', color: 'rgba(255,255,255,0.6)' }}
                                  >
                                    Cancel
                                  </button>
                                  <button
                                    type="button"
                                    disabled={submittingReplyId === inq._id}
                                    onClick={() => submitInquiryReply(inq._id)}
                                    className="btn-gold py-1.5 px-4 text-xs font-bold font-outfit"
                                  >
                                    {submittingReplyId === inq._id ? (
                                      <><div className="w-3.5 h-3.5 border-2 border-t-navy-900 border-navy-900/30 rounded-full animate-spin mr-1" /> Sending...</>
                                    ) : (
                                      <><i className="uil uil-message mr-1" /> Send Reply Email</>
                                    )}
                                  </button>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="flex flex-col items-end gap-2.5 shrink-0">
                          <div className="text-white/35 text-[10px] font-inter font-medium">
                            {new Date(inq.createdAt).toLocaleDateString('en-LK', { month: 'short', day: 'numeric' })}
                          </div>
                          <button
                            onClick={() => markInquiryRead(inq._id, !inq.isRead)}
                            className="text-[10px] font-outfit font-bold px-2.5 py-1.5 rounded-lg transition-all duration-200 w-28 text-center"
                            style={inq.isRead
                              ? { background: 'rgba(255,255,255,0.05)', color: 'rgba(255,255,255,0.4)', border: '1px solid rgba(255,255,255,0.08)' }
                              : { background: 'rgba(245,166,35,0.1)', color: '#F5A623', border: '1px solid rgba(245,166,35,0.25)' }
                            }
                          >
                            {inq.isRead ? 'Mark Unread' : 'Mark Read'}
                          </button>
                          <button
                            onClick={() => {
                              if (replyingInquiryId === inq._id) {
                                setReplyingInquiryId(null);
                                setReplyText('');
                              } else {
                                setReplyingInquiryId(inq._id);
                                setReplyText('');
                              }
                            }}
                            className="text-[10px] font-outfit font-bold px-2.5 py-1.5 rounded-lg transition-all duration-200 w-28 text-center"
                            style={{ background: 'rgba(255,255,255,0.05)', color: 'rgba(255,255,255,0.8)', border: '1px solid rgba(255,255,255,0.08)' }}
                          >
                            {replyingInquiryId === inq._id ? 'Cancel' : inq.isReplied ? 'Send Another' : 'Reply'}
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}

            {/* PROPERTIES TAB */}
            {tab === 'properties' && (
              <div className="glass-card overflow-hidden">
                <div className="px-6 py-4" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                  <h2 className="font-outfit font-bold text-white text-base">
                    Property Inventory Catalog
                    <span className="ml-2 text-white/40 font-normal text-sm">({properties.length} listings)</span>
                  </h2>
                </div>
                {properties.length === 0 ? (
                  <div className="py-16 text-center text-white/30 font-inter text-sm">
                    <i className="uil uil-building text-3xl block mb-2" />
                    No properties found. Run the seed API first.
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full admin-table">
                      <thead>
                        <tr>
                          <th>Property Title</th>
                          <th>Category</th>
                          <th>Location Area</th>
                          <th>Monthly rate</th>
                          <th>Availability</th>
                          <th>Quick Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {properties.map((prop) => (
                          <tr key={prop._id}>
                            <td>
                              <div className="flex items-center gap-3">
                                <div className="relative w-10 h-10 rounded-lg overflow-hidden border border-white/8 shrink-0">
                                  <Image
                                    src={prop.images?.[0] || '/images/hero1.png'}
                                    alt={prop.title}
                                    fill
                                    className="object-cover"
                                  />
                                </div>
                                <div className="font-outfit font-bold text-white text-sm">{prop.title}</div>
                              </div>
                            </td>
                            <td>
                              <span className={`text-[10px] font-bold px-2 py-0.5 border rounded-full ${CATEGORY_COLORS[prop.category] || ''}`}>
                                {prop.category}
                              </span>
                            </td>
                            <td className="text-white/60 text-xs font-medium">{prop.location}</td>
                            <td className="font-outfit font-bold text-gold-500 text-sm">
                              LKR {prop.monthlyRate.toLocaleString()}
                            </td>
                            <td>
                              <span className={`badge ${prop.isAvailable ? 'status-approved' : 'status-rejected'}`}>
                                {prop.isAvailable ? 'Available' : 'Rented'}
                              </span>
                            </td>
                            <td>
                              <Link
                                href={`/listings/${prop._id}`}
                                target="_blank"
                                className="text-[10px] font-outfit font-bold px-3 py-1.5 rounded-lg transition-all duration-200"
                                style={{ background: 'rgba(255,255,255,0.06)', color: 'rgba(255,255,255,0.8)', border: '1px solid rgba(255,255,255,0.08)' }}
                              >
                                <i className="uil uil-external-link-alt mr-1" />
                                View Details
                              </Link>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* Seed Helper */}
        <div className="mt-6 glass-card p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-white/6">
          <div>
            <p className="text-white/50 font-inter text-xs leading-relaxed">
              <i className="uil uil-database text-gold-500/60 mr-1" />
              <strong>Control Option:</strong> Clear and seed the database with sample Sri Lankan listings and the default admin user.
            </p>
          </div>
          <button
            onClick={async () => {
              if (confirm("Are you sure you want to wipe and re-seed the entire database?")) {
                const res = await fetch('/api/seed', { method: 'POST' });
                const d = await res.json();
                alert(d.message || d.error);
                fetchAll();
              }
            }}
            className="btn-outline text-xs whitespace-nowrap bg-navy-900/40"
          >
            <i className="uil uil-database mr-1" />
            Seed Database
          </button>
        </div>
      </main>
    </div>
  );
}
