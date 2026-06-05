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
      style={{ background: 'linear-gradient(135deg,#050d24 0%,#0B1437 60%,#1a3080 100%)' }}
    >
      {/* Background glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full opacity-5 blur-3xl pointer-events-none"
        style={{ background: 'radial-gradient(circle,#F5A623,transparent)' }} />

      <div className="w-full max-w-md relative z-10">
        {/* Logo */}
        <div className="text-center mb-10">
          <Link href="/" className="inline-flex flex-col items-center gap-3 group">
            <Logo className="w-16 h-16 transition-transform duration-300 group-hover:scale-105" />
            <span className="font-outfit font-extrabold text-2xl text-white">
              Lanka<span className="text-gold-500">Rent</span>
            </span>
          </Link>
          <div className="mt-4 flex items-center gap-2 justify-center text-sm text-white/40 font-inter">
            <i className="uil uil-shield-check text-gold-500/60" />
            Admin Control Center
          </div>
        </div>

        {/* Card */}
        <div className="glass-card p-8">
          <h1 className="font-outfit font-bold text-white text-xl text-center mb-6">
            Sign in to Dashboard
          </h1>

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="form-label">Username</label>
              <div className="relative">
                <i className="uil uil-user absolute left-3.5 top-1/2 -translate-y-1/2 text-white/35 text-lg" />
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
                <i className="uil uil-lock absolute left-3.5 top-1/2 -translate-y-1/2 text-white/35 text-lg" />
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
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-white/35 hover:text-white/60 transition-colors"
                >
                  <i className={`uil ${showPass ? 'uil-eye-slash' : 'uil-eye'} text-lg`} />
                </button>
              </div>
            </div>

            {error && (
              <div className="p-3.5 rounded-xl text-sm text-red-400 flex items-center gap-2"
                style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.2)' }}>
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
                <><i className="uil uil-sign-in-alt" /> Sign In</>
              )}
            </button>
          </form>

          <div className="mt-6 p-4 rounded-xl" style={{ background: 'rgba(245,166,35,0.04)', border: '1px solid rgba(245,166,35,0.1)' }}>
            <p className="text-white/35 font-inter text-xs text-center">
              <i className="uil uil-lock text-gold-500/50 mr-1" />
              Secured with bcrypt encryption. Unauthorized access is prohibited.
            </p>
          </div>
        </div>

        <p className="text-center mt-6 text-white/30 text-xs font-inter">
          <Link href="/" className="hover:text-white/50 transition-colors">
            <i className="uil uil-arrow-left mr-1" />Back to LankaRent
          </Link>
        </p>
      </div>
    </div>
  );
}
