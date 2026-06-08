'use client';

import { useState } from 'react';
import Link from 'next/link';

interface Application {
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
}

const STATUS_STYLES: Record<string, { bg: string; text: string; border: string; icon: string }> = {
  'Under Review': { bg: 'var(--status-review-bg)', text: 'var(--status-review-text)', border: 'var(--status-review-border)',  icon: 'uil-hourglass' },
  'Approved':     { bg: 'var(--status-approved-bg)', text: 'var(--status-approved-text)', border: 'var(--status-approved-border)',   icon: 'uil-check-circle' },
  'Rejected':     { bg: 'var(--status-rejected-bg)', text: 'var(--status-rejected-text)', border: 'var(--status-rejected-border)',  icon: 'uil-times-circle' },
};

export default function TrackApplicationPage() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const [applications, setApplications] = useState<Application[]>([]);
  const [error, setError] = useState('');

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    setLoading(true);
    setError('');
    setSearched(true);

    try {
      const res = await fetch(`/api/applications?email=${encodeURIComponent(email.trim())}`);
      const data = await res.json();
      if (data.success) {
        setApplications(data.data || []);
      } else {
        setError(data.error || 'Failed to retrieve applications.');
      }
    } catch {
      setError('An error occurred. Please verify your connection and try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-28 pb-16 page-enter">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-4 text-xs font-outfit font-bold tracking-wider uppercase animate-fade-in-up"
            style={{ background: 'rgba(245,166,35,0.08)', border: '1px solid rgba(245,166,35,0.2)', color: '#F5A623' }}>
            <i className="uil uil-history" />
            Application Tracker
          </div>
          <h1 className="section-title text-3xl sm:text-4xl mb-3 animate-fade-in-up">
            Track Your <span className="text-gold-gradient">Tenancy Application</span>
          </h1>
          <p className="text-theme-secondary font-inter text-sm max-w-lg mx-auto animate-fade-in-up delay-100">
            Enter the email address you used in your application form to view status updates and official landlord decisions.
          </p>
        </div>

        {/* Search Card */}
        <div className="glass-card p-6 sm:p-8 mb-8 animate-fade-in-up delay-200">
          <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3">
            <div className="flex-1 relative">
              <i className="uil uil-envelope absolute left-4 top-1/2 -translate-y-1/2 text-xl" style={{ color: 'var(--text-tertiary)' }} />
              <input
                type="email"
                placeholder="Enter your registered email address..."
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="form-input form-input-icon-left"
              />
            </div>
            <button type="submit" disabled={loading} className="btn-gold whitespace-nowrap justify-center sm:w-36">
              {loading ? (
                <div className="w-5 h-5 border-2 border-t-navy-900 border-navy-900/30 rounded-full animate-spin" />
              ) : (
                <>
                  <i className="uil uil-search-alt" />
                  Track Status
                </>
              )}
            </button>
          </form>
        </div>

        {/* Results */}
        {loading && (
          <div className="text-center py-16 animate-fade-in-up">
            <div className="w-10 h-10 border-2 border-t-gold-500 border-theme-muted/20 rounded-full animate-spin mx-auto mb-4" />
            <p className="text-theme-secondary text-sm font-inter">Retrieving your application history...</p>
          </div>
        )}

        {!loading && error && (
          <div className="glass-card p-6 text-center border border-red-500/20 bg-red-500/5 animate-fade-in-up" style={{ color: 'var(--status-rejected-text)' }}>
            <i className="uil uil-exclamation-triangle text-3xl block mb-2" />
            <p className="font-outfit font-semibold">{error}</p>
          </div>
        )}

        {!loading && searched && applications.length === 0 && !error && (
          <div className="glass-card p-10 text-center animate-fade-in-up">
            <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
              style={{ background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.15)' }}>
              <i className="uil uil-file-search text-2xl text-red-400" />
            </div>
            <h3 className="font-outfit font-bold text-theme-primary text-lg mb-2">No Applications Found</h3>
            <p className="text-theme-secondary font-inter text-sm max-w-sm mx-auto leading-relaxed">
              We couldn&apos;t find any rental applications linked to <strong>{email}</strong>. Please ensure the email is spelled correctly or try submitting a new application.
            </p>
          </div>
        )}

        {!loading && applications.length > 0 && (
          <div className="space-y-6">
            <h2 className="font-outfit font-bold text-theme-primary text-lg px-1 flex items-center gap-2 animate-fade-in-up">
              <i className="uil uil-file-check-alt text-gold-500" />
              Found {applications.length} Application{applications.length !== 1 ? 's' : ''}
            </h2>

            {applications.map((app, index) => {
              const cfg = STATUS_STYLES[app.status] || STATUS_STYLES['Under Review'];
              const submitDate = new Date(app.createdAt).toLocaleDateString('en-LK', { month: 'long', day: 'numeric', year: 'numeric' });
              const moveInDate = new Date(app.proposedMoveIn).toLocaleDateString('en-LK', { month: 'long', day: 'numeric', year: 'numeric' });
              
              // Timeline steps completion checking
              const isSubmitted = true;
              const isUnderReview = app.status === 'Under Review' || app.status === 'Approved' || app.status === 'Rejected';
              const isDecided = app.status === 'Approved' || app.status === 'Rejected';

              return (
                <div key={app._id} className="glass-card p-6 sm:p-8 animate-fade-in-up" style={{ animationDelay: `${index * 100}ms` }}>
                  
                  {/* Property Title & Status */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 mb-6" style={{ borderBottom: '1px solid var(--border-color)' }}>
                    <div>
                      <h3 className="font-outfit font-bold text-theme-primary text-lg leading-tight mb-1">{app.propertyTitle}</h3>
                      <p className="text-theme-tertiary text-xs font-inter">Submitted on {submitDate}</p>
                    </div>
                    
                    <span className="badge w-fit text-sm" style={{ background: cfg.bg, color: cfg.text, border: `1.5px solid ${cfg.border}` }}>
                      <i className={`uil ${cfg.icon} text-base`} />
                      {app.status}
                    </span>
                  </div>

                  {/* Info Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                    <div className="p-3.5 rounded-xl border" style={{ background: 'var(--input-bg)', borderColor: 'var(--border-color)' }}>
                      <div className="text-theme-tertiary text-xs font-inter mb-0.5">Applicant Name</div>
                      <div className="font-outfit font-semibold text-theme-primary text-sm">{app.fullName}</div>
                    </div>
                    <div className="p-3.5 rounded-xl border" style={{ background: 'var(--input-bg)', borderColor: 'var(--border-color)' }}>
                      <div className="text-theme-tertiary text-xs font-inter mb-0.5">Proposed Move-In Date</div>
                      <div className="font-outfit font-semibold text-theme-primary text-sm">{moveInDate}</div>
                    </div>
                    <div className="p-3.5 rounded-xl border" style={{ background: 'var(--input-bg)', borderColor: 'var(--border-color)' }}>
                      <div className="text-theme-tertiary text-xs font-inter mb-0.5">Employment & Income</div>
                      <div className="font-outfit font-semibold text-theme-primary text-sm truncate">
                        {app.employmentStatus} (LKR {app.grossAnnualIncome.toLocaleString()}/yr)
                      </div>
                    </div>
                  </div>

                  {/* Live Progress Timeline */}
                  <div>
                    <h4 className="font-outfit font-bold text-theme-primary text-xs uppercase tracking-wider mb-5">Processing Timeline</h4>
                    <div className="relative">
                      {/* Connector Line */}
                      <div className="absolute top-4 left-4 right-4 sm:left-6 sm:right-6 h-1 -translate-y-1/2 z-0" style={{ background: 'var(--border-color)' }} />
                      
                      {/* Active Connector Progress */}
                      <div 
                        className="absolute top-4 left-4 h-1 bg-gold-500 -translate-y-1/2 z-0 transition-all duration-500" 
                        style={{ 
                          width: isDecided ? 'calc(100% - 2rem)' : isUnderReview ? '50%' : '0%' 
                        }} 
                      />

                      {/* Steps Container */}
                      <div className="relative z-10 flex justify-between">
                        
                        {/* Step 1 */}
                        <div className="flex flex-col items-center text-center max-w-[85px] sm:max-w-[120px]">
                          <div className={`step-circle ${isSubmitted ? 'done' : 'pending'}`}>
                            <i className="uil uil-check text-lg" />
                          </div>
                          <span className="text-[11px] sm:text-xs font-outfit font-bold mt-2 text-theme-primary leading-tight">Submitted</span>
                          <span className="text-[9px] sm:text-[10px] font-inter text-theme-muted mt-0.5 leading-tight hidden sm:block">Documents uploaded</span>
                        </div>

                        {/* Step 2 */}
                        <div className="flex flex-col items-center text-center max-w-[85px] sm:max-w-[120px]">
                          <div className={`step-circle ${app.status === 'Under Review' ? 'active' : isDecided ? 'done' : 'pending'}`}>
                            {isDecided ? <i className="uil uil-check text-lg" /> : <i className="uil uil-hourglass text-base" />}
                          </div>
                          <span className={`text-[11px] sm:text-xs font-outfit font-bold mt-2 leading-tight ${isUnderReview ? 'text-theme-primary' : 'text-theme-muted'}`}>Under Review</span>
                          <span className="text-[9px] sm:text-[10px] font-inter text-theme-muted mt-0.5 leading-tight hidden sm:block">Verifying credentials</span>
                        </div>

                        {/* Step 3 */}
                        <div className="flex flex-col items-center text-center max-w-[85px] sm:max-w-[120px]">
                          <div className={`step-circle ${isDecided ? 'done' : 'pending'}`} style={isDecided ? { background: cfg.bg, color: cfg.text, border: `2px solid ${cfg.border}` } : {}}>
                            {isDecided ? <i className={`uil ${cfg.icon} text-lg`} /> : <i className="uil uil-trophy text-sm" />}
                          </div>
                          <span className={`text-[11px] sm:text-xs font-outfit font-bold mt-2 leading-tight ${isDecided ? 'text-theme-primary' : 'text-theme-muted'}`}>
                            {app.status === 'Approved' ? 'Approved' : app.status === 'Rejected' ? 'Rejected' : 'Decision'}
                          </span>
                          <span className="text-[9px] sm:text-[10px] font-inter text-theme-muted mt-0.5 leading-tight hidden sm:block">
                            {app.status === 'Approved' ? 'Ready to sign lease' : app.status === 'Rejected' ? 'Application declined' : 'Final landlord outcome'}
                          </span>
                        </div>

                      </div>
                    </div>
                  </div>

                  {/* Decision Callout message if approved */}
                  {app.status === 'Approved' && (
                    <div className="mt-8 p-4 rounded-xl flex items-start gap-3 bg-green-500/5 border border-green-500/20">
                      <i className="uil uil-shield-check text-green-400 text-xl shrink-0 mt-0.5" />
                      <div>
                        <h5 className="font-outfit font-bold text-theme-primary text-sm mb-0.5">Congratulations! Your application is approved.</h5>
                        <p className="text-theme-secondary font-inter text-xs leading-relaxed">
                          The landlord has approved your tenancy screening. Our leasing agent will contact you shortly via <strong>{app.email}</strong> or <strong>{app.phone}</strong> to finalize the lease agreement and coordinate your security deposit transfer.
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Decision Callout message if rejected */}
                  {app.status === 'Rejected' && (
                    <div className="mt-8 p-4 rounded-xl flex items-start gap-3 bg-red-500/5 border border-red-500/20">
                      <i className="uil uil-info-circle text-red-400 text-xl shrink-0 mt-0.5" />
                      <div>
                        <h5 className="font-outfit font-bold text-theme-primary text-sm mb-0.5">Application Outcome Notice</h5>
                        <p className="text-theme-secondary font-inter text-xs leading-relaxed">
                          We regret to inform you that your application did not meet the landlord&apos;s specific selection criteria at this time. You are welcome to browse other verified listings in our directory.
                        </p>
                      </div>
                    </div>
                  )}

                </div>
              );
            })}
          </div>
        )}

      </div>
    </div>
  );
}
