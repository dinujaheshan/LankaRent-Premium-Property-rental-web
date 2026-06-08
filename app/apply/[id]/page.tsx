'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useTheme } from '@/components/ThemeProvider';

const schema = z.object({
  fullName:          z.string().min(3, 'Full name must be at least 3 characters'),
  email:             z.string().email('Please enter a valid email address'),
  phone:             z.string().min(9, 'Enter a valid Sri Lankan phone number'),
  employmentStatus:  z.enum(['Employed', 'Self-Employed', 'Unemployed', 'Student'] as const, { message: 'Select employment status' }),
  grossAnnualIncome: z.number({ message: 'Enter a valid amount' }).min(600000, 'Annual income must be at least LKR 600,000'),
  proposedMoveIn:    z.string().refine((v) => v && new Date(v) > new Date(), 'Move-in date must be a future date'),
});

type FormData = z.infer<typeof schema>;

const STEPS = [
  { label: 'Personal Info',  icon: 'uil-user' },
  { label: 'Financial',      icon: 'uil-money-bill' },
  { label: 'Move-in & Review', icon: 'uil-calendar-alt' },
];

interface Property {
  _id: string;
  title: string;
  location: string;
  monthlyRate: number;
  category: string;
}

export default function ApplyPage() {
  const params   = useParams();
  const router   = useRouter();
  const id       = params.id as string;
  const { theme } = useTheme();

  const [property, setProperty] = useState<Property | null>(null);
  const [step, setStep]         = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError]       = useState('');

  useEffect(() => {
    fetch(`/api/properties/${id}`)
      .then(r => r.json())
      .then(d => setProperty(d.data))
      .catch(() => {});
  }, [id]);

  const { register, handleSubmit, trigger, getValues, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { grossAnnualIncome: undefined },
  });

  const stepFields: (keyof FormData)[][] = [
    ['fullName', 'email', 'phone'],
    ['employmentStatus', 'grossAnnualIncome'],
    ['proposedMoveIn'],
  ];

  const nextStep = async () => {
    const valid = await trigger(stepFields[step]);
    if (valid) setStep(s => s + 1);
  };

  const onSubmit = async (data: FormData) => {
    if (!property) return;
    setSubmitting(true);
    setError('');
    try {
      const res = await fetch('/api/applications', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, propertyId: property._id, propertyTitle: property.title }),
      });
      const json = await res.json();
      if (json.success) {
        router.push(`/confirmation?name=${encodeURIComponent(data.fullName)}&property=${encodeURIComponent(property.title)}`);
      } else {
        setError(json.error || 'Submission failed. Please try again.');
        setSubmitting(false);
      }
    } catch {
      setError('Network error. Please try again.');
      setSubmitting(false);
    }
  };

  const vals = getValues();

  return (
    <div className="min-h-screen pt-28 pb-16 page-enter">
      <div className="max-w-2xl mx-auto px-4 sm:px-6">

        {/* Back link */}
        {property && (
          <Link href={`/listings/${id}`} className="inline-flex items-center gap-1.5 text-theme-muted hover:text-theme-secondary text-sm font-inter mb-6 transition-colors">
            <i className="uil uil-arrow-left" />
            Back to {property.title}
          </Link>
        )}

        {/* Header */}
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-4 text-xs font-outfit font-semibold uppercase tracking-wider"
            style={{ background: 'rgba(245,166,35,0.08)', border: '1px solid rgba(245,166,35,0.2)', color: '#F5A623' }}>
            <i className="uil uil-file-contract" />
            Tenancy Application
          </div>
          <h1 className="section-title text-2xl sm:text-3xl mb-2">
            Apply to <span className="text-gold-gradient">Rent</span>
          </h1>
          {property && (
            <p className="text-theme-secondary font-inter text-sm">
              Applying for: <span className="text-theme-primary font-semibold">{property.title}</span>
              <span className="mx-2 text-theme-muted/50">|</span>
              <span className="text-gold-500 font-outfit font-semibold">LKR {property.monthlyRate.toLocaleString()}/mo</span>
            </p>
          )}
        </div>

        {/* Step Indicator */}
        <div className="flex items-center gap-0 mb-10">
          {STEPS.map((s, i) => (
            <div key={s.label} className="flex items-center flex-1 last:flex-none">
              <div className="flex flex-col items-center gap-1.5">
                <div className={`step-circle ${i < step ? 'done' : i === step ? 'active' : 'pending'}`}>
                  {i < step ? <i className="uil uil-check text-sm" /> : <span>{i + 1}</span>}
                </div>
                <span className={`text-xs font-inter hidden sm:block ${i <= step ? 'text-theme-secondary' : 'text-theme-muted'}`}>
                  {s.label}
                </span>
              </div>
              {i < STEPS.length - 1 && (
                <div className="flex-1 h-px mx-2 transition-all duration-500" style={{ background: i < step ? '#F5A623' : 'var(--border-color)' }} />
              )}
            </div>
          ))}
        </div>

        {/* Form Card */}
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="glass-card p-6 sm:p-8 space-y-5">

            {/* Step 0: Personal Info */}
            {step === 0 && (
              <>
                <h2 className="font-outfit font-bold text-theme-primary text-lg mb-1">
                  <i className="uil uil-user text-gold-500 mr-2" />
                  Personal Information
                </h2>
                <div>
                  <label className="form-label">Full Name *</label>
                  <input {...register('fullName')} placeholder="e.g. Kamal Perera" className="form-input" />
                  {errors.fullName && <p className="text-red-400 text-xs mt-1.5"><i className="uil uil-exclamation-circle mr-1" />{errors.fullName.message}</p>}
                </div>
                <div>
                  <label className="form-label">Email Address *</label>
                  <input {...register('email')} type="email" placeholder="kamal@example.com" className="form-input" />
                  {errors.email && <p className="text-red-400 text-xs mt-1.5"><i className="uil uil-exclamation-circle mr-1" />{errors.email.message}</p>}
                </div>
                <div>
                  <label className="form-label">Phone Number *</label>
                  <input {...register('phone')} placeholder="+94 77 123 4567" className="form-input" />
                  {errors.phone && <p className="text-red-400 text-xs mt-1.5"><i className="uil uil-exclamation-circle mr-1" />{errors.phone.message}</p>}
                </div>
              </>
            )}

            {/* Step 1: Financial */}
            {step === 1 && (
              <>
                <h2 className="font-outfit font-bold text-theme-primary text-lg mb-1">
                  <i className="uil uil-money-bill text-gold-500 mr-2" />
                  Financial Information
                </h2>
                <div>
                  <label className="form-label">Employment Status *</label>
                  <select {...register('employmentStatus')} className="form-select">
                    <option value="">Select status</option>
                    <option value="Employed">Employed</option>
                    <option value="Self-Employed">Self-Employed</option>
                    <option value="Unemployed">Unemployed</option>
                    <option value="Student">Student</option>
                  </select>
                  {errors.employmentStatus && <p className="text-red-400 text-xs mt-1.5"><i className="uil uil-exclamation-circle mr-1" />{errors.employmentStatus.message}</p>}
                </div>
                <div>
                  <label className="form-label">Gross Annual Income (LKR) *</label>
                  <input
                    {...register('grossAnnualIncome', { valueAsNumber: true })}
                    type="number"
                    placeholder="e.g. 1800000"
                    className="form-input"
                  />
                  <p className="text-theme-muted text-xs mt-1.5 font-inter"><i className="uil uil-info-circle mr-1" />Minimum LKR 600,000 required</p>
                  {errors.grossAnnualIncome && <p className="text-red-400 text-xs mt-1"><i className="uil uil-exclamation-circle mr-1" />{errors.grossAnnualIncome.message}</p>}
                </div>
              </>
            )}

            {/* Step 2: Move-in + Review */}
            {step === 2 && (
              <>
                <h2 className="font-outfit font-bold text-theme-primary text-lg mb-1">
                  <i className="uil uil-calendar-alt text-gold-500 mr-2" />
                  Proposed Move-in Date
                </h2>
                <div>
                  <label className="form-label">Move-in Date *</label>
                  <input
                    {...register('proposedMoveIn')}
                    type="date"
                    min={new Date(Date.now() + 86400000).toISOString().split('T')[0]}
                    className="form-input"
                    style={{ colorScheme: theme }}
                  />
                  {errors.proposedMoveIn && <p className="text-red-400 text-xs mt-1.5"><i className="uil uil-exclamation-circle mr-1" />{errors.proposedMoveIn.message}</p>}
                </div>

                {/* Review summary */}
                <div className="mt-4 p-5 rounded-xl space-y-3" style={{ background: 'rgba(245,166,35,0.04)', border: '1px solid rgba(245,166,35,0.12)' }}>
                  <h3 className="font-outfit font-semibold text-theme-primary text-sm mb-3">Application Summary</h3>
                  {[
                    { label: 'Full Name',        val: vals.fullName },
                    { label: 'Email',            val: vals.email },
                    { label: 'Phone',            val: vals.phone },
                    { label: 'Employment',       val: vals.employmentStatus },
                    { label: 'Annual Income',    val: vals.grossAnnualIncome ? `LKR ${Number(vals.grossAnnualIncome).toLocaleString()}` : '' },
                    { label: 'Property',         val: property?.title },
                    { label: 'Monthly Rate',     val: property ? `LKR ${property.monthlyRate.toLocaleString()}` : '' },
                  ].map(({ label, val }) => val ? (
                    <div key={label} className="flex justify-between text-sm font-inter">
                      <span className="text-theme-muted">{label}</span>
                      <span className="text-theme-primary font-medium text-right max-w-xs truncate">{val}</span>
                    </div>
                  ) : null)}
                </div>
              </>
            )}

            {/* Error */}
            {error && (
              <div className="p-4 rounded-xl text-sm text-red-400 flex items-center gap-2"
                style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.2)' }}>
                <i className="uil uil-exclamation-triangle" />
                {error}
              </div>
            )}
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between mt-5">
            {step > 0 ? (
              <button type="button" onClick={() => setStep(s => s - 1)} className="btn-outline text-sm">
                <i className="uil uil-arrow-left" />
                Previous
              </button>
            ) : (
              <div />
            )}

            {step < STEPS.length - 1 ? (
              <button type="button" onClick={nextStep} className="btn-gold text-sm">
                Continue
                <i className="uil uil-arrow-right" />
              </button>
            ) : (
              <button type="submit" disabled={submitting} className="btn-gold text-sm disabled:opacity-60">
                {submitting ? (
                  <><div className="w-4 h-4 border-2 border-t-navy-900 border-navy-900/30 rounded-full animate-spin" /> Submitting...</>
                ) : (
                  <><i className="uil uil-check-circle" /> Submit Application</>
                )}
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
