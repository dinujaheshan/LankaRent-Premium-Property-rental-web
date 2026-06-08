'use client';

import { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import Logo from '@/components/Logo';
import { useTheme } from '@/components/ThemeProvider';

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
  category: 'Apartment' | 'Studio' | 'Office' | 'Villa';
  location: string;
  district: string;
  monthlyRate: number;
  description: string;
  bedrooms: number;
  bathrooms: number;
  areaSqft: number;
  amenities: string[];
  petPolicy: string;
  utilitiesIncluded: string[];
  availableFrom: string;
  isAvailable: boolean;
  images: string[];
};

type Tab = 'overview' | 'applications' | 'inquiries' | 'properties';

const STATUS_STYLES: Record<string, string> = {
  'Under Review': 'status-review badge',
  'Approved':     'status-approved badge',
  'Rejected':     'status-rejected badge',
};

const CATEGORY_COLORS: Record<string, string> = {
  Apartment: 'text-blue-500 bg-blue-500/10 border-blue-500/20 dark:text-blue-400 dark:bg-blue-500/10 dark:border-blue-500/20',
  Studio:    'text-purple-500 bg-purple-500/10 border-purple-500/20 dark:text-purple-400 dark:bg-purple-500/10 dark:border-purple-500/20',
  Office:    'text-green-500 bg-green-500/10 border-green-500/20 dark:text-green-400 dark:bg-green-500/10 dark:border-green-500/20',
  Villa:     'text-amber-500 bg-amber-500/10 border-amber-500/20 dark:text-amber-400 dark:bg-amber-500/10 dark:border-amber-500/20',
};

// Default values based on categories to speed up adding properties
const DEFAULT_PRESETS = {
  Apartment: {
    images: '/images/apartment1.png',
    amenities: 'Swimming Pool, Gym, Concierge, Rooftop Terrace, Underground Parking, 24h Security, Backup Generator',
    utilitiesIncluded: 'Water, Building Maintenance, Security',
    petPolicy: 'Small pets allowed with deposit',
  },
  Studio: {
    images: '/images/studio1.png',
    amenities: 'Beach Access, Shared Kitchen, WiFi, Laundry, Bike Rental, Common Lounge',
    utilitiesIncluded: 'Water, Electricity, Internet, Cleaning (Weekly)',
    petPolicy: 'No pets allowed',
  },
  Office: {
    images: '/images/office1.png',
    amenities: 'High-Speed WiFi, Meeting Room, Reception, Parking, AC, Backup Power, Coffee Station',
    utilitiesIncluded: 'Electricity, Water, Internet, Cleaning',
    petPolicy: 'No pets allowed',
  },
  Villa: {
    images: '/images/villa1.png',
    amenities: 'Private Pool, Garden, Chef Kitchen, Sea View, Parking, Smart Home, Wine Cellar',
    utilitiesIncluded: 'Water, Electricity, Gardening, Pool Maintenance',
    petPolicy: 'Pets allowed',
  },
};

export default function AdminDashboardPage() {
  const router = useRouter();
  const { theme, toggleTheme } = useTheme();
  
  const [tab, setTab]                     = useState<Tab>('overview');
  const [applications, setApplications]   = useState<Application[]>([]);
  const [inquiries,    setInquiries]       = useState<Inquiry[]>([]);
  const [properties,  setProperties]       = useState<Property[]>([]);
  const [loading,     setLoading]          = useState(true);
  const [updating,    setUpdating]         = useState<string | null>(null);

  // Email replies state variables
  const [replyingInquiryId, setReplyingInquiryId] = useState<string | null>(null);
  const [replyText, setReplyText]                 = useState('');
  const [submittingReplyId, setSubmittingReplyId] = useState<string | null>(null);

  // Property CRUD Modals and form state
  const [isModalOpen, setIsModalOpen]             = useState(false);
  const [editingProperty, setEditingProperty]     = useState<Property | null>(null);
  const [savingProperty, setSavingProperty]       = useState(false);
  const [crudError, setCrudError]                 = useState('');
  
  const [formData, setFormData] = useState({
    title: '',
    category: 'Apartment' as Property['category'],
    location: '',
    district: 'Colombo',
    monthlyRate: '',
    description: '',
    bedrooms: '2',
    bathrooms: '2',
    areaSqft: '',
    amenities: '',
    petPolicy: 'No pets allowed',
    utilitiesIncluded: '',
    availableFrom: '',
    isAvailable: true,
    images: '',
  });

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

  // Populate form with smart presets when category changes
  const applyPresetForCategory = (cat: Property['category']) => {
    const preset = DEFAULT_PRESETS[cat];
    setFormData(prev => ({
      ...prev,
      category: cat,
      images: prev.images || preset.images,
      amenities: prev.amenities || preset.amenities,
      utilitiesIncluded: prev.utilitiesIncluded || preset.utilitiesIncluded,
      petPolicy: prev.petPolicy === 'No pets allowed' || !prev.petPolicy ? preset.petPolicy : prev.petPolicy,
    }));
  };

  const openAddModal = () => {
    setEditingProperty(null);
    setCrudError('');
    const today = new Date().toISOString().split('T')[0];
    
    // Set initial values
    setFormData({
      title: '',
      category: 'Apartment',
      location: '',
      district: 'Colombo',
      monthlyRate: '',
      description: '',
      bedrooms: '2',
      bathrooms: '2',
      areaSqft: '',
      amenities: DEFAULT_PRESETS.Apartment.amenities,
      petPolicy: DEFAULT_PRESETS.Apartment.petPolicy,
      utilitiesIncluded: DEFAULT_PRESETS.Apartment.utilitiesIncluded,
      availableFrom: today,
      isAvailable: true,
      images: DEFAULT_PRESETS.Apartment.images,
    });
    setIsModalOpen(true);
  };

  const openEditModal = (prop: Property) => {
    setEditingProperty(prop);
    setCrudError('');
    setFormData({
      title: prop.title,
      category: prop.category,
      location: prop.location,
      district: prop.district || 'Colombo',
      monthlyRate: String(prop.monthlyRate),
      description: prop.description || '',
      bedrooms: String(prop.bedrooms || 0),
      bathrooms: String(prop.bathrooms || 1),
      areaSqft: String(prop.areaSqft || ''),
      amenities: (prop.amenities || []).join(', '),
      petPolicy: prop.petPolicy || 'No pets allowed',
      utilitiesIncluded: (prop.utilitiesIncluded || []).join(', '),
      availableFrom: prop.availableFrom ? new Date(prop.availableFrom).toISOString().split('T')[0] : '',
      isAvailable: prop.isAvailable,
      images: (prop.images || []).join(', '),
    });
    setIsModalOpen(true);
  };

  const handleDeleteProperty = async (prop: Property) => {
    if (confirm(`Are you sure you want to permanently delete "${prop.title}"?`)) {
      try {
        const res = await fetch(`/api/properties/${prop._id}`, { method: 'DELETE' });
        const json = await res.json();
        if (json.success) {
          fetchAll();
        } else {
          alert(json.error || 'Failed to delete property');
        }
      } catch {
        alert('Server connection error. Please try again.');
      }
    }
  };

  const handleSavePropertySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSavingProperty(true);
    setCrudError('');

    // Prepare payload
    const payload = {
      title: formData.title,
      category: formData.category,
      location: formData.location,
      district: formData.district,
      monthlyRate: Number(formData.monthlyRate),
      description: formData.description,
      bedrooms: Number(formData.bedrooms) || 0,
      bathrooms: Number(formData.bathrooms) || 1,
      areaSqft: Number(formData.areaSqft),
      amenities: formData.amenities.split(',').map(s => s.trim()).filter(Boolean),
      petPolicy: formData.petPolicy,
      utilitiesIncluded: formData.utilitiesIncluded.split(',').map(s => s.trim()).filter(Boolean),
      availableFrom: formData.availableFrom,
      isAvailable: formData.isAvailable,
      images: formData.images.split(',').map(s => s.trim()).filter(Boolean),
    };

    try {
      const url = editingProperty ? `/api/properties/${editingProperty._id}` : '/api/properties';
      const method = editingProperty ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const json = await res.json();
      if (json.success) {
        setIsModalOpen(false);
        fetchAll();
      } else {
        setCrudError(json.error || 'Failed to save property listing');
      }
    } catch {
      setCrudError('Connection error. Please try again.');
    } finally {
      setSavingProperty(false);
    }
  };

  // Calculations for dashboard analytics
  const totalApps = applications.length;
  const reviewApps = applications.filter(a => a.status === 'Under Review').length;
  const approvedApps = applications.filter(a => a.status === 'Approved').length;
  const rejectedApps = applications.filter(a => a.status === 'Rejected').length;
  const unreadMail = inquiries.filter(i => !i.isRead).length;

  const totalProps = properties.length;
  const availableProps = properties.filter(p => p.isAvailable).length;
  const rentedProps = totalProps - availableProps;
  const occupancyRate = totalProps ? Math.round((rentedProps / totalProps) * 100) : 0;

  // Monthly Revenue potential (estimated totals)
  const totalRevenuePotential = properties.reduce((sum, p) => sum + p.monthlyRate, 0);
  const activeRevenue = properties.filter(p => !p.isAvailable).reduce((sum, p) => sum + p.monthlyRate, 0);
  const averageRent = totalProps ? Math.round(totalRevenuePotential / totalProps) : 0;

  // Categories counts
  const catApartment = properties.filter(p => p.category === 'Apartment').length;
  const catStudio = properties.filter(p => p.category === 'Studio').length;
  const catOffice = properties.filter(p => p.category === 'Office').length;
  const catVilla = properties.filter(p => p.category === 'Villa').length;

  const stats = {
    total:      totalApps,
    review:     reviewApps,
    approved:   approvedApps,
    rejected:   rejectedApps,
    unread:     unreadMail,
    available:  availableProps,
  };

  const TABS: { id: Tab; icon: string; label: string; badge?: number }[] = [
    { id: 'overview',     icon: 'uil-chart-growth',    label: 'Overview' },
    { id: 'applications', icon: 'uil-file-contract',  label: 'Applications',  badge: stats.review },
    { id: 'inquiries',    icon: 'uil-envelope',        label: 'Mailbox',       badge: stats.unread },
    { id: 'properties',   icon: 'uil-building',        label: 'Properties' },
  ];

  return (
    <div 
      className="min-h-screen flex font-inter overflow-hidden"
      style={{ background: 'var(--admin-bg)', color: 'var(--text-primary)' }}
    >
      {/* ─── SIDEBAR ────────────────────────────────────────── */}
      <aside 
        className="w-64 hidden lg:flex flex-col shrink-0 p-5 glass-card m-4 mr-0 relative"
        style={{ height: 'calc(100vh - 2rem)', background: 'var(--admin-sidebar-bg)', borderColor: 'var(--border-color)', backdropFilter: 'blur(30px)' }}
      >
        {/* Glow */}
        <div className="absolute -top-10 -left-10 w-40 h-40 rounded-full opacity-10 blur-3xl pointer-events-none"
          style={{ background: 'var(--admin-sidebar-glow)' }} />

        {/* Logo */}
        <div className="flex items-center gap-2.5 pb-5 border-b mb-6" style={{ borderColor: 'var(--border-color)' }}>
          <Logo className="w-8 h-8" />
          <span className="font-outfit font-extrabold text-lg" style={{ color: 'var(--text-primary)' }}>Lanka<span className="text-gold-500">Rent</span></span>
        </div>

        {/* User profile */}
        <div className="flex items-center gap-3 p-3 rounded-2xl mb-6" style={{ background: 'var(--admin-user-bg)', border: '1px solid var(--admin-user-border)' }}>
          <div className="w-10 h-10 rounded-xl flex items-center justify-center font-outfit font-bold text-navy-900 text-sm"
            style={{ background: 'linear-gradient(135deg, #F5A623 0%, #fbbf24 100%)' }}>
            AD
          </div>
          <div>
            <div className="font-outfit font-bold text-xs leading-none" style={{ color: 'var(--text-primary)' }}>System Admin</div>
            <div className="text-[9px] font-inter uppercase tracking-wider mt-1.5" style={{ color: 'var(--text-tertiary)' }}>Control Center</div>
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
                className={`w-full flex items-center justify-between px-4 py-3.5 rounded-xl text-sm font-outfit font-bold transition-all duration-300 relative group`}
                style={active 
                  ? { background: 'linear-gradient(135deg, #F5A623 0%, #fbbf24 100%)', color: 'var(--navy-900)', boxShadow: '0 8px 24px rgba(245, 166, 35, 0.25)' } 
                  : { color: 'var(--admin-tab-inactive)' }
                }
              >
                <div className="flex items-center gap-2.5">
                  <i className={`uil ${icon} text-lg ${active ? 'text-navy-900' : 'opacity-70 group-hover:opacity-100'}`} />
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
      </aside>

      {/* ─── MAIN CONTENT ───────────────────────────────────── */}
      <main className="flex-1 p-4 lg:p-6 overflow-y-auto max-h-screen">
        
        {/* Header Greeting */}
        <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="font-outfit font-black text-2xl sm:text-3xl" style={{ color: 'var(--text-primary)' }}>
              Welcome, <span className="text-gold-gradient">System Administrator</span>
            </h1>
            <p className="font-inter text-xs mt-1" style={{ color: 'var(--text-tertiary)' }}>
              Real-time monitoring panel for LankaRent leases, mailbox, and database.
            </p>
          </div>

          <div className="flex items-center gap-2 flex-wrap sm:flex-nowrap">
            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              className="theme-toggle"
              aria-label="Toggle theme"
              title={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
            >
              <i className={`uil ${theme === 'light' ? 'uil-moon' : 'uil-sun'} text-lg`} />
            </button>

            <button onClick={fetchAll} className="btn-outline text-xs py-2.5 px-4 whitespace-nowrap bg-navy-900/5 dark:bg-navy-900/30">
              <i className="uil uil-redo" />
              <span>Sync Database</span>
            </button>

            <Link href="/" target="_blank" className="btn-outline text-xs py-2.5 px-4 whitespace-nowrap bg-navy-900/5 dark:bg-navy-900/30">
              <i className="uil uil-external-link-alt" />
              <span>Visit Site</span>
            </Link>

            <button
              onClick={handleLogout}
              className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-outfit font-semibold transition-all duration-200"
              style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.2)', color: theme === 'light' ? '#dc2626' : '#f87171' }}
            >
              <i className="uil uil-sign-out-alt text-sm" />
              <span>Logout</span>
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
            <div key={label} className="glass-card p-4 relative overflow-hidden group hover:border-gold-500/30 transition-all duration-300"
              style={{ background: 'var(--admin-stat-card-bg)', boxShadow: 'var(--admin-stat-card-shadow)', border: '1px solid var(--border-color)' }}>
              {/* Backglow on hover */}
              <div className="absolute top-0 right-0 w-24 h-24 rounded-full opacity-0 group-hover:opacity-10 blur-xl transition-all duration-500 pointer-events-none"
                style={{ background: grad }} />

              <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-3 text-white shadow-md transition-transform duration-300 group-hover:scale-110"
                style={{ background: grad, boxShadow: `0 4px 12px ${shadow}` }}>
                <i className={`uil ${icon} text-lg`} />
              </div>
              <div className="font-outfit font-black text-2xl tracking-tight" style={{ color: 'var(--text-primary)' }}>{val}</div>
              <div className="text-xs font-inter mt-1 font-medium" style={{ color: 'var(--text-tertiary)' }}>{label}</div>
            </div>
          ))}
        </div>

        {/* Mobile Navigation bar */}
        <div className="lg:hidden flex gap-1 mb-6 glass-card p-1 w-full overflow-x-auto" style={{ background: 'var(--admin-sidebar-bg)' }}>
          {TABS.map(({ id, icon, label, badge }) => (
            <button
              key={id}
              onClick={() => setTab(id)}
              className={`flex-1 flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-outfit font-bold whitespace-nowrap transition-all duration-200`}
              style={tab === id 
                ? { background: 'linear-gradient(135deg,#F5A623,#fbbf24)', color: 'var(--navy-900)' } 
                : { color: 'var(--admin-tab-inactive)' }
              }
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
          <div className="glass-card py-32 flex items-center justify-center" style={{ background: 'var(--admin-sidebar-bg)' }}>
            <div className="text-center">
              <div className="w-10 h-10 border-2 border-t-gold-500 border-white/10 rounded-full animate-spin mx-auto mb-4" />
              <p className="font-inter text-xs" style={{ color: 'var(--text-tertiary)' }}>Retrieving database sync records...</p>
            </div>
          </div>
        ) : (
          <div className="animate-fade-in-up">

            {/* OVERVIEW TAB */}
            {tab === 'overview' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Left Column: Quick Actions & Basic Info */}
                  <div className="glass-card p-6 flex flex-col justify-between" style={{ background: 'var(--admin-sidebar-bg)', borderColor: 'var(--border-color)' }}>
                    <div>
                      <h2 className="font-outfit font-bold text-lg mb-2" style={{ color: 'var(--text-primary)' }}>Quick Portal Actions</h2>
                      <p className="text-xs font-inter leading-relaxed mb-6" style={{ color: 'var(--text-secondary)' }}>
                        Add properties directly to the system catalog, or perform system database refreshes.
                      </p>
                    </div>
                    
                    <div className="space-y-3">
                      <button 
                        onClick={openAddModal}
                        className="btn-gold w-full justify-center text-sm py-3"
                      >
                        <i className="uil uil-plus-circle text-base" />
                        <span>Add New Property</span>
                      </button>
                      
                      <button
                        onClick={() => setTab('applications')}
                        className="btn-outline w-full justify-center text-sm py-3"
                        style={{ border: '1.5px solid var(--border-color)', color: 'var(--text-secondary)' }}
                      >
                        <i className="uil uil-file-contract text-base" />
                        <span>Manage Applications</span>
                      </button>
                    </div>
                  </div>

                  {/* Middle Column: Inventory breakdown */}
                  <div className="glass-card p-6" style={{ background: 'var(--admin-sidebar-bg)', borderColor: 'var(--border-color)' }}>
                    <h2 className="font-outfit font-bold text-lg mb-4" style={{ color: 'var(--text-primary)' }}>Inventory Categories</h2>
                    <div className="space-y-4">
                      {[
                        { label: 'Apartments', count: catApartment, percent: totalProps ? Math.round((catApartment/totalProps)*100) : 0, color: 'bg-blue-500' },
                        { label: 'Luxury Villas', count: catVilla, percent: totalProps ? Math.round((catVilla/totalProps)*100) : 0, color: 'bg-amber-500' },
                        { label: 'Executive Offices', count: catOffice, percent: totalProps ? Math.round((catOffice/totalProps)*100) : 0, color: 'bg-green-500' },
                        { label: 'Studios', count: catStudio, percent: totalProps ? Math.round((catStudio/totalProps)*100) : 0, color: 'bg-purple-500' },
                      ].map(({ label, count, percent, color }) => (
                        <div key={label} className="space-y-1">
                          <div className="flex justify-between text-xs font-inter font-medium">
                            <span style={{ color: 'var(--text-secondary)' }}>{label}</span>
                            <span className="font-bold" style={{ color: 'var(--text-primary)' }}>{count} ({percent}%)</span>
                          </div>
                          <div className="w-full h-2 rounded-full bg-navy-900/10 dark:bg-white/5 overflow-hidden">
                            <div className={`h-full rounded-full ${color}`} style={{ width: `${percent}%` }} />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Right Column: Financial overview */}
                  <div className="glass-card p-6" style={{ background: 'var(--admin-sidebar-bg)', borderColor: 'var(--border-color)' }}>
                    <h2 className="font-outfit font-bold text-lg mb-4" style={{ color: 'var(--text-primary)' }}>Revenue Metrics</h2>
                    
                    <div className="space-y-4 font-inter">
                      <div>
                        <div className="text-2xs uppercase tracking-wider font-semibold" style={{ color: 'var(--text-tertiary)' }}>Total Managed Volume</div>
                        <div className="text-2xl font-outfit font-black mt-1" style={{ color: theme === 'light' ? '#b45309' : 'var(--gold-500)' }}>LKR {totalRevenuePotential.toLocaleString()}/mo</div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4 pt-2 border-t" style={{ borderColor: 'var(--border-color)' }}>
                        <div>
                          <div className="text-[10px] uppercase tracking-wider font-semibold" style={{ color: 'var(--text-tertiary)' }}>Active Income</div>
                          <div className="text-sm font-bold mt-0.5" style={{ color: 'var(--text-primary)' }}>LKR {activeRevenue.toLocaleString()}</div>
                        </div>
                        <div>
                          <div className="text-[10px] uppercase tracking-wider font-semibold" style={{ color: 'var(--text-tertiary)' }}>Occupancy</div>
                          <div className="text-sm font-bold mt-0.5" style={{ color: 'var(--text-primary)' }}>{occupancyRate}%</div>
                        </div>
                      </div>

                      <div className="pt-2 border-t" style={{ borderColor: 'var(--border-color)' }}>
                        <div className="text-2xs uppercase tracking-wider font-semibold" style={{ color: 'var(--text-tertiary)' }}>Average Property Rent</div>
                        <div className="text-sm font-bold mt-0.5" style={{ color: 'var(--text-primary)' }}>LKR {averageRent.toLocaleString()}/mo</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Bottom Section: Pipeline and Activity */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Pipeline */}
                  <div className="glass-card p-6" style={{ background: 'var(--admin-sidebar-bg)', borderColor: 'var(--border-color)' }}>
                    <h2 className="font-outfit font-bold text-lg mb-4" style={{ color: 'var(--text-primary)' }}>Lease Application Pipeline</h2>
                    
                    <div className="space-y-5">
                      <div className="space-y-2">
                        <div className="flex justify-between text-xs font-semibold">
                          <span style={{ color: 'var(--text-secondary)' }}>Status Distributions</span>
                          <span style={{ color: 'var(--text-primary)' }}>{totalApps} Total</span>
                        </div>
                        
                        {/* Dynamic custom stacked chart */}
                        <div className="w-full h-4 rounded-lg overflow-hidden flex bg-navy-900/10 dark:bg-white/5">
                          {totalApps > 0 ? (
                            <>
                              <div className="h-full bg-emerald-500 transition-all duration-300" style={{ width: `${(approvedApps/totalApps)*100}%` }} title={`Approved: ${approvedApps}`} />
                              <div className="h-full bg-amber-500 transition-all duration-300" style={{ width: `${(reviewApps/totalApps)*100}%` }} title={`Under Review: ${reviewApps}`} />
                              <div className="h-full bg-red-500 transition-all duration-300" style={{ width: `${(rejectedApps/totalApps)*100}%` }} title={`Rejected: ${rejectedApps}`} />
                            </>
                          ) : (
                            <div className="h-full w-full bg-navy-900/10 dark:bg-white/5" />
                          )}
                        </div>
                      </div>

                      <div className="grid grid-cols-3 gap-2 text-center text-xs font-inter pt-2">
                        <div className="p-2.5 rounded-xl border border-emerald-500/10" style={{ background: 'rgba(16,185,129,0.04)' }}>
                          <div className="font-bold text-emerald-500 text-base">{approvedApps}</div>
                          <div className="text-[10px] mt-1 text-emerald-500/80 font-semibold uppercase">Approved</div>
                        </div>
                        <div className="p-2.5 rounded-xl border border-amber-500/10" style={{ background: 'rgba(245,166,35,0.04)' }}>
                          <div className="font-bold text-base" style={{ color: theme === 'light' ? '#b45309' : '#f59e0b' }}>{reviewApps}</div>
                          <div className="text-[10px] mt-1 font-semibold uppercase" style={{ color: theme === 'light' ? '#b45309' : '#f59e0b' }}>In Review</div>
                        </div>
                        <div className="p-2.5 rounded-xl border border-red-500/10" style={{ background: 'rgba(239,68,68,0.04)' }}>
                          <div className="font-bold text-red-500 text-base">{rejectedApps}</div>
                          <div className="text-[10px] mt-1 text-red-500/80 font-semibold uppercase">Rejected</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Mailbox Status */}
                  <div className="glass-card p-6 flex flex-col justify-between" style={{ background: 'var(--admin-sidebar-bg)', borderColor: 'var(--border-color)' }}>
                    <div>
                      <h2 className="font-outfit font-bold text-lg mb-2" style={{ color: 'var(--text-primary)' }}>Mailbox Inquiries</h2>
                      <p className="text-xs font-inter leading-relaxed mb-4" style={{ color: 'var(--text-secondary)' }}>
                        Keep track of customer questions, requests, and listings feedback.
                      </p>
                    </div>

                    <div className="flex items-center justify-between p-4 rounded-2xl mb-4" style={{ background: 'var(--admin-user-bg)', border: '1px solid var(--border-color)' }}>
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-purple-500/10 text-purple-500 border border-purple-500/20">
                          <i className="uil uil-envelope text-xl" />
                        </div>
                        <div>
                          <div className="text-sm font-bold" style={{ color: 'var(--text-primary)' }}>{inquiries.length} Inquiries</div>
                          <div className="text-[10px] font-medium" style={{ color: 'var(--text-tertiary)' }}>Total messages received</div>
                        </div>
                      </div>
                      {unreadMail > 0 ? (
                        <span className="badge status-review">{unreadMail} Unread</span>
                      ) : (
                        <span className="badge status-approved">All Read</span>
                      )}
                    </div>

                    <button 
                      onClick={() => setTab('inquiries')}
                      className="btn-gold justify-center text-sm py-3 w-full"
                    >
                      <i className="uil uil-envelope-open" />
                      <span>Open Inquiry Mailbox</span>
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* APPLICATIONS TAB */}
            {tab === 'applications' && (
              <div className="glass-card overflow-hidden" style={{ background: 'var(--admin-sidebar-bg)', borderColor: 'var(--border-color)' }}>
                <div className="px-6 py-4 flex items-center justify-between" style={{ borderBottom: '1px solid var(--border-color)' }}>
                  <h2 className="font-outfit font-bold text-base" style={{ color: 'var(--text-primary)' }}>
                    Applicant Screening Matrix
                    <span className="ml-2 font-normal text-sm" style={{ color: 'var(--text-tertiary)' }}>({applications.length} total)</span>
                  </h2>
                </div>
                {applications.length === 0 ? (
                  <div className="py-16 text-center font-inter text-sm" style={{ color: 'var(--text-muted)' }}>
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
                                  <div className="w-9 h-9 rounded-full flex items-center justify-center shrink-0 border text-xs font-bold font-outfit"
                                    style={{ background: 'rgba(245,166,35,0.12)', color: '#F5A623', borderColor: 'var(--border-color)' }}>
                                    {userInitial}
                                  </div>
                                  <div>
                                    <div className="font-outfit font-bold text-sm leading-tight" style={{ color: 'var(--text-primary)' }}>{app.fullName}</div>
                                    <div className="text-[10px] font-inter mt-1" style={{ color: 'var(--text-tertiary)' }}>{app.email} &bull; {app.phone}</div>
                                  </div>
                                </div>
                              </td>
                              <td>
                                <div className="font-medium text-xs max-w-xs truncate" style={{ color: 'var(--text-secondary)' }}>{app.propertyTitle}</div>
                              </td>
                              <td className="text-xs font-medium" style={{ color: 'var(--text-secondary)' }}>
                                {new Date(app.proposedMoveIn).toLocaleDateString('en-LK', { month: 'short', day: 'numeric', year: 'numeric' })}
                              </td>
                              <td className="min-w-44">
                                <div className="flex items-center justify-between text-[10px] mb-1 font-inter">
                                  <span style={{ color: 'var(--text-tertiary)' }}>{app.employmentStatus}</span>
                                  <span className="font-bold" style={{ color: 'var(--text-primary)' }}>LKR {app.grossAnnualIncome.toLocaleString()}/yr</span>
                                </div>
                                <div className="w-full h-1.5 rounded-full bg-navy-900/10 dark:bg-white/5 overflow-hidden">
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
                                    className="form-select text-xs py-1 px-2.5 pr-7 w-32"
                                    style={{ border: '1px solid var(--border-color)' }}
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
                <div className="glass-card px-6 py-4 flex items-center justify-between" style={{ borderRadius: '1.25rem', background: 'var(--admin-sidebar-bg)', borderColor: 'var(--border-color)' }}>
                  <h2 className="font-outfit font-bold text-base" style={{ color: 'var(--text-primary)' }}>
                    Inquiry Mailbox
                    <span className="ml-2 font-normal text-sm" style={{ color: 'var(--text-tertiary)' }}>({inquiries.length} messages)</span>
                  </h2>
                  {stats.unread > 0 && (
                    <span className="badge status-review">{stats.unread} unread</span>
                  )}
                </div>
                {inquiries.length === 0 ? (
                  <div className="glass-card py-16 text-center font-inter text-sm" style={{ background: 'var(--admin-sidebar-bg)', borderColor: 'var(--border-color)', color: 'var(--text-muted)' }}>
                    <i className="uil uil-envelope text-3xl block mb-2" />
                    No inquiries received yet
                  </div>
                ) : (
                  inquiries.map((inq) => (
                    <div
                      key={inq._id}
                      className="glass-card p-5 transition-all duration-300 hover:border-gold-500/20"
                      style={!inq.isRead 
                        ? { borderColor: 'rgba(245,166,35,0.2)', background: 'var(--admin-unread-bg)' } 
                        : { background: 'var(--admin-sidebar-bg)', borderColor: 'var(--border-color)' }
                      }
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
                              <span className="font-outfit font-bold text-sm" style={{ color: 'var(--text-primary)' }}>{inq.fullName}</span>
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
                            <div className="text-[10px] font-inter mb-2.5" style={{ color: 'var(--text-tertiary)' }}>{inq.email}</div>
                            <p className="text-sm font-inter leading-relaxed text-inherit opacity-90">{inq.message}</p>
                            
                            {/* Render Admin Response history if replied */}
                            {inq.isReplied && inq.replyMessage && (
                              <div className="mt-4 p-4 rounded-xl border border-emerald-500/10" style={{ background: 'rgba(16,185,129,0.02)' }}>
                                <div className="flex items-center gap-1.5 text-[10px] font-bold text-emerald-400 font-outfit uppercase tracking-wider mb-1.5">
                                  <i className="uil uil-reply" />
                                  Admin Response
                                  {inq.repliedAt && (
                                    <span className="font-normal normal-case ml-auto" style={{ color: 'var(--text-muted)' }}>
                                      Replied on {new Date(inq.repliedAt).toLocaleDateString('en-LK', { month: 'short', day: 'numeric', year: 'numeric' })}
                                    </span>
                                  )}
                                </div>
                                <p className="text-xs font-inter whitespace-pre-wrap" style={{ color: 'var(--text-secondary)' }}>{inq.replyMessage}</p>
                              </div>
                            )}

                            {/* Render Inline Reply Editor */}
                            {replyingInquiryId === inq._id && (
                              <div className="mt-4 p-4 rounded-xl border bg-white/2 space-y-3" style={{ borderColor: 'var(--border-color)' }}>
                                <div className="font-outfit font-bold text-xs" style={{ color: 'var(--text-primary)' }}>Compose Reply Email to {inq.fullName}</div>
                                <textarea
                                  value={replyText}
                                  onChange={(e) => setReplyText(e.target.value)}
                                  placeholder="Type your email response here..."
                                  rows={4}
                                  className="form-input text-xs w-full min-h-[80px]"
                                  style={{ background: 'var(--input-bg)', color: 'var(--input-text)' }}
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
                                    style={{ border: '1px solid var(--border-color)', color: 'var(--text-secondary)' }}
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
                          <div className="text-[10px] font-inter font-medium" style={{ color: 'var(--text-tertiary)' }}>
                            {new Date(inq.createdAt).toLocaleDateString('en-LK', { month: 'short', day: 'numeric' })}
                          </div>
                          <button
                            onClick={() => markInquiryRead(inq._id, !inq.isRead)}
                            className="text-[10px] font-outfit font-bold px-2.5 py-1.5 rounded-lg transition-all duration-200 w-28 text-center"
                            style={inq.isRead
                              ? { background: 'rgba(0,0,0,0.05)', color: 'var(--text-secondary)', border: '1px solid var(--border-color)' }
                              : { background: 'rgba(245,166,35,0.1)', color: theme === 'light' ? '#b45309' : 'var(--gold-500)', border: '1px solid rgba(245,166,35,0.25)' }
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
                            style={{ background: 'rgba(0,0,0,0.05)', color: 'var(--text-primary)', border: '1px solid var(--border-color)' }}
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
              <div className="glass-card overflow-hidden" style={{ background: 'var(--admin-sidebar-bg)', borderColor: 'var(--border-color)' }}>
                <div className="px-6 py-4 flex items-center justify-between" style={{ borderBottom: '1px solid var(--border-color)' }}>
                  <h2 className="font-outfit font-bold text-base" style={{ color: 'var(--text-primary)' }}>
                    Property Inventory Catalog
                    <span className="ml-2 font-normal text-sm" style={{ color: 'var(--text-tertiary)' }}>({properties.length} listings)</span>
                  </h2>
                  
                  <button 
                    onClick={openAddModal}
                    className="btn-gold py-2 px-4 text-xs font-bold font-outfit"
                  >
                    <i className="uil uil-plus-circle text-sm" />
                    <span>Add Property</span>
                  </button>
                </div>
                {properties.length === 0 ? (
                  <div className="py-16 text-center font-inter text-sm" style={{ color: 'var(--text-muted)' }}>
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
                          <th className="text-right">CRUD Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {properties.map((prop) => (
                          <tr key={prop._id}>
                            <td>
                              <div className="flex items-center gap-3">
                                <div className="relative w-10 h-10 rounded-lg overflow-hidden border shrink-0" style={{ borderColor: 'var(--border-color)' }}>
                                  <Image
                                    src={prop.images?.[0] || '/images/hero1.png'}
                                    alt={prop.title}
                                    fill
                                    className="object-cover"
                                    unoptimized
                                  />
                                </div>
                                <div className="font-outfit font-bold text-sm" style={{ color: 'var(--text-primary)' }}>{prop.title}</div>
                              </div>
                            </td>
                            <td>
                              <span className={`text-[10px] font-bold px-2 py-0.5 border rounded-full ${CATEGORY_COLORS[prop.category] || ''}`}>
                                {prop.category}
                              </span>
                            </td>
                            <td className="text-xs font-medium" style={{ color: 'var(--text-secondary)' }}>{prop.location}</td>
                            <td className="font-outfit font-bold text-sm" style={{ color: theme === 'light' ? '#b45309' : 'var(--gold-500)' }}>
                              LKR {prop.monthlyRate.toLocaleString()}
                            </td>
                            <td>
                              <span className={`badge ${prop.isAvailable ? 'status-approved' : 'status-rejected'}`}>
                                {prop.isAvailable ? 'Available' : 'Rented'}
                              </span>
                            </td>
                            <td>
                              <div className="flex items-center justify-end gap-1.5">
                                <Link
                                  href={`/listings/${prop._id}`}
                                  target="_blank"
                                  className="text-[10px] font-outfit font-bold px-2.5 py-1.5 rounded-lg transition-all duration-200 border"
                                  style={{ background: 'rgba(0,0,0,0.04)', color: 'var(--text-secondary)', borderColor: 'var(--border-color)' }}
                                >
                                  <i className="uil uil-external-link-alt" />
                                </Link>

                                <button
                                  onClick={() => openEditModal(prop)}
                                  className="text-[10px] font-outfit font-bold px-2.5 py-1.5 rounded-lg transition-all duration-200 border text-blue-500 hover:bg-blue-500/10"
                                  style={{ background: 'rgba(0,0,0,0.04)', borderColor: 'var(--border-color)' }}
                                  title="Edit Listing"
                                >
                                  <i className="uil uil-edit" />
                                </button>

                                <button
                                  onClick={() => handleDeleteProperty(prop)}
                                  className="text-[10px] font-outfit font-bold px-2.5 py-1.5 rounded-lg transition-all duration-200 border text-red-500 hover:bg-red-500/10"
                                  style={{ background: 'rgba(0,0,0,0.04)', borderColor: 'var(--border-color)' }}
                                  title="Delete Listing"
                                >
                                  <i className="uil uil-trash-alt" />
                                </button>
                              </div>
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
        <div className="mt-6 glass-card p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
          style={{ background: 'var(--admin-sidebar-bg)', borderColor: 'var(--border-color)' }}>
          <div>
            <p className="text-xs font-inter leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
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
            className="btn-outline text-xs whitespace-nowrap bg-navy-900/5 dark:bg-navy-900/40"
            style={{ border: '1.5px solid var(--border-color)', color: 'var(--text-secondary)' }}
          >
            <i className="uil uil-database mr-1" />
            Seed Database
          </button>
        </div>
      </main>

      {/* ─── CRUD EDIT/CREATE PROPERTY MODAL ────────────────── */}
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content p-6 max-w-2xl w-full" style={{ background: 'var(--bg-secondary)', borderColor: 'var(--border-color)' }}>
            <div className="flex items-center justify-between pb-4 mb-4 border-b" style={{ borderColor: 'var(--border-color)' }}>
              <h2 className="font-outfit font-bold text-lg" style={{ color: 'var(--text-primary)' }}>
                {editingProperty ? `Edit Listing: ${editingProperty.title}` : 'Add New Property Listing'}
              </h2>
              <button 
                onClick={() => setIsModalOpen(false)} 
                className="p-1 text-inherit opacity-50 hover:opacity-100 transition-opacity"
              >
                <i className="uil uil-times text-xl" />
              </button>
            </div>

            <form onSubmit={handleSavePropertySubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Title */}
                <div className="sm:col-span-2">
                  <label className="form-label">Property Title</label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="e.g. Skyline Luxury Penthouse"
                    className="form-input"
                  />
                </div>

                {/* Category & District */}
                <div>
                  <label className="form-label">Category</label>
                  <select
                    value={formData.category}
                    onChange={(e) => {
                      const cat = e.target.value as Property['category'];
                      setFormData({ ...formData, category: cat });
                      applyPresetForCategory(cat);
                    }}
                    className="form-select"
                  >
                    <option value="Apartment">Apartment</option>
                    <option value="Studio">Studio</option>
                    <option value="Office">Office</option>
                    <option value="Villa">Villa</option>
                  </select>
                </div>

                <div>
                  <label className="form-label">District</label>
                  <select
                    value={formData.district}
                    onChange={(e) => setFormData({ ...formData, district: e.target.value })}
                    className="form-select"
                  >
                    <option value="Colombo">Colombo</option>
                    <option value="Kandy">Kandy</option>
                    <option value="Galle">Galle</option>
                    <option value="Gampaha">Gampaha</option>
                    <option value="Matara">Matara</option>
                    <option value="Nuwara Eliya">Nuwara Eliya</option>
                    <option value="Batticaloa">Batticaloa</option>
                    <option value="Jaffna">Jaffna</option>
                  </select>
                </div>

                {/* Location Area & Monthly Rate */}
                <div>
                  <label className="form-label">Location Address</label>
                  <input
                    type="text"
                    required
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    placeholder="e.g. Kollupitiya, Colombo 03"
                    className="form-input"
                  />
                </div>

                <div>
                  <label className="form-label">Monthly Rate (LKR)</label>
                  <input
                    type="number"
                    min="1"
                    required
                    value={formData.monthlyRate}
                    onChange={(e) => setFormData({ ...formData, monthlyRate: e.target.value })}
                    placeholder="e.g. 150000"
                    className="form-input"
                  />
                </div>

                {/* Bedrooms & Bathrooms */}
                <div>
                  <label className="form-label">Bedrooms</label>
                  <input
                    type="number"
                    min="0"
                    required
                    value={formData.bedrooms}
                    onChange={(e) => setFormData({ ...formData, bedrooms: e.target.value })}
                    className="form-input"
                  />
                </div>

                <div>
                  <label className="form-label">Bathrooms</label>
                  <input
                    type="number"
                    min="1"
                    required
                    value={formData.bathrooms}
                    onChange={(e) => setFormData({ ...formData, bathrooms: e.target.value })}
                    className="form-input"
                  />
                </div>

                {/* Square Footage & Available From */}
                <div>
                  <label className="form-label">Area (Sqft)</label>
                  <input
                    type="number"
                    min="100"
                    required
                    value={formData.areaSqft}
                    onChange={(e) => setFormData({ ...formData, areaSqft: e.target.value })}
                    placeholder="e.g. 1200"
                    className="form-input"
                  />
                </div>

                <div>
                  <label className="form-label">Available From</label>
                  <input
                    type="date"
                    required
                    value={formData.availableFrom}
                    onChange={(e) => setFormData({ ...formData, availableFrom: e.target.value })}
                    className="form-input"
                  />
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="form-label">Description</label>
                <textarea
                  required
                  rows={3}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Provide property details, landmarks, surroundings..."
                  className="form-input text-xs w-full min-h-[60px]"
                />
              </div>

              {/* Amenities & Utilities (Comma separated list) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="form-label">Amenities (Comma separated)</label>
                  <input
                    type="text"
                    value={formData.amenities}
                    onChange={(e) => setFormData({ ...formData, amenities: e.target.value })}
                    placeholder="e.g. Pool, Gym, 24h Security"
                    className="form-input"
                  />
                </div>

                <div>
                  <label className="form-label">Utilities Included (Comma separated)</label>
                  <input
                    type="text"
                    value={formData.utilitiesIncluded}
                    onChange={(e) => setFormData({ ...formData, utilitiesIncluded: e.target.value })}
                    placeholder="e.g. Water, Maintenance"
                    className="form-input"
                  />
                </div>

                {/* Pet Policy & Images */}
                <div>
                  <label className="form-label">Pet Policy</label>
                  <input
                    type="text"
                    value={formData.petPolicy}
                    onChange={(e) => setFormData({ ...formData, petPolicy: e.target.value })}
                    placeholder="e.g. Small pets allowed"
                    className="form-input"
                  />
                </div>

                <div>
                  <label className="form-label">Image URLs (Comma separated)</label>
                  <input
                    type="text"
                    value={formData.images}
                    onChange={(e) => setFormData({ ...formData, images: e.target.value })}
                    placeholder="e.g. /images/apartment1.png"
                    className="form-input"
                  />
                </div>
              </div>

              {/* Availability Status Checkbox */}
              <div className="flex items-center gap-2.5 pt-2">
                <input
                  type="checkbox"
                  id="crud-isAvailable"
                  checked={formData.isAvailable}
                  onChange={(e) => setFormData({ ...formData, isAvailable: e.target.checked })}
                  className="w-4 h-4 rounded text-gold-500 focus:ring-gold-500 cursor-pointer accent-gold-500"
                />
                <label htmlFor="crud-isAvailable" className="text-sm font-semibold select-none cursor-pointer" style={{ color: 'var(--text-secondary)' }}>
                  Mark Listing as Available Immediately
                </label>
              </div>

              {/* Error display */}
              {crudError && (
                <div className="p-3 rounded-lg text-xs border" style={{ background: 'rgba(239,68,68,0.08)', borderColor: 'rgba(239,68,68,0.2)', color: 'var(--status-rejected-text)' }}>
                  <i className="uil uil-exclamation-triangle mr-1.5" />
                  {crudError}
                </div>
              )}

              {/* Form Actions */}
              <div className="flex justify-end gap-2.5 pt-4 border-t" style={{ borderColor: 'var(--border-color)' }}>
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="btn-outline py-2 px-5 text-sm font-bold font-outfit"
                  style={{ border: '1.5px solid var(--border-color)', color: 'var(--text-secondary)' }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={savingProperty}
                  className="btn-gold py-2 px-6 text-sm font-bold font-outfit"
                >
                  {savingProperty ? (
                    <><div className="w-4 h-4 border-2 border-t-navy-900 border-navy-900/30 rounded-full animate-spin mr-1.5" /> Saving...</>
                  ) : (
                    <><i className="uil uil-check-circle" /> Save Listing</>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
