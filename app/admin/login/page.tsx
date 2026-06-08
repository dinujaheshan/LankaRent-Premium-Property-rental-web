'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Logo from '@/components/Logo';

export default function AdminLoginPage() {
  const router = useRouter();
  const [username,   setUsername]   = useState('');
  const [password,   setPassword]   = useState('');
  const [showPass,   setShowPass]   = useState(false);
  const [loading,    setLoading]    = useState(false);
  const [error,      setError]      = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res  = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
      const json = await res.json();
      if (json.success) {
        router.push('/admin/dashboard');
      } else {
        setError(json.error || 'Invalid credentials');
      }
    } catch {
      setError('Connection error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4"
      style={{ background: 'var(--admin-bg)' }}
    >
      {/* Background glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full opacity-5 blur-3xl pointer-events-none"
        style={{ background: 'var(--admin-sidebar-glow)' }} />

      <div className="w-full max-w-md relative z-10">
        {/* Logo */}
        <div className="text-center mb-10">
          <Link href="/" className="inline-flex flex-col items-center gap-3 group">
            <Logo className="w-16 h-16 transition-transform duration-300 group-hover:scale-105" />
            <span className="font-outfit font-extrabold text-2xl" style={{ color: 'var(--text-primary)' }}>
              Lanka<span className="text-gold-500">Rent</span>
            </span>
          </Link>
          <div className="mt-4 flex items-center gap-2 justify-center text-sm font-inter" style={{ color: 'var(--text-tertiary)' }}>
            <i className="uil uil-shield-check text-gold-500/60" />
            Admin Control Center
          </div>
        </div>

        {/* Card */}
        <div className="glass-card p-8">
          <h1 className="font-outfit font-bold text-xl text-center mb-6" style={{ color: 'var(--text-primary)' }}>
            Sign in to Dashboard
          </h1>

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="form-label">Username</label>
              <div className="relative">
                <i className="uil uil-user absolute left-3.5 top-1/2 -translate-y-1/2 text-lg" style={{ color: 'var(--text-muted)' }} />
                <input
                  id="admin-username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter username"
                  className="form-input form-input-icon-left"
                  autoComplete="username"
                  required
                />
              </div>
            </div>

            <div>
              <label className="form-label">Password</label>
              <div className="relative">
                <i className="uil uil-lock absolute left-3.5 top-1/2 -translate-y-1/2 text-lg" style={{ color: 'var(--text-muted)' }} />
                <input
                  id="admin-password"
                  type={showPass ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter password"
                  className="form-input form-input-icon-left form-input-icon-right"
                  autoComplete="current-password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 hover:opacity-80 transition-opacity"
                  style={{ color: 'var(--text-muted)' }}
                >
                  <i className={`uil ${showPass ? 'uil-eye-slash' : 'uil-eye'} text-lg`} />
                </button>
              </div>
            </div>

            {error && (
              <div className="p-3.5 rounded-xl text-sm flex items-center gap-2 border"
                style={{ background: 'rgba(239,68,68,0.08)', borderColor: 'rgba(239,68,68,0.2)', color: 'var(--status-rejected-text)' }}>
                <i className="uil uil-exclamation-triangle shrink-0" />
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="btn-gold w-full justify-center mt-2 disabled:opacity-60"
            >
              {loading ? (
                <><div className="w-4 h-4 border-2 border-t-navy-900 border-navy-900/30 rounded-full animate-spin" /> Signing in...</>
              ) : (
                <><i className="uil uil-sign-out-alt" /> Sign In</>
              )}
            </button>
          </form>

          <div className="mt-6 p-4 rounded-xl" style={{ background: 'rgba(245,166,35,0.04)', border: '1px solid rgba(245,166,35,0.1)' }}>
            <p className="font-inter text-xs text-center font-medium" style={{ color: 'var(--text-tertiary)' }}>
              <i className="uil uil-lock text-gold-500/50 mr-1" />
              Secured with bcrypt encryption. Unauthorized access is prohibited.
            </p>
          </div>
        </div>

        <p className="text-center mt-6 text-xs font-inter font-medium">
          <Link href="/" className="hover:text-gold-500 transition-colors" style={{ color: 'var(--text-secondary)' }}>
            <i className="uil uil-arrow-left mr-1" />Back to LankaRent
          </Link>
        </p>
      </div>
    </div>
  );
}
