'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const schema = z.object({
  fullName:    z.string().min(3, 'Full name must be at least 3 characters'),
  email:       z.string().email('Please enter a valid email address'),
  phone:       z.string().optional(),
  inquiryType: z.enum(['General', 'Pricing', 'Availability', 'Maintenance', 'Legal', 'Other'] as const, { message: 'Please select an inquiry type' }),
  message:     z.string().min(20, 'Message must be at least 20 characters'),
});

type FormData = z.infer<typeof schema>;

const faqs = [
  { q: 'How do I apply for a rental property?', a: 'Browse listings, click on any available property, and hit "Apply to Rent". Our multi-step form guides you through the process in minutes.' },
  { q: 'What documents are needed for tenancy?', a: 'You will need a copy of your NIC/Passport, proof of income (payslips or bank statements), and employment confirmation where applicable.' },
  { q: 'Is my personal information secure?', a: 'Absolutely. All data is encrypted and stored securely. We never share your information with third parties without your consent.' },
  { q: 'How long does the application review take?', a: 'Our team typically reviews applications within 2-3 business days. You will receive a status update via email once a decision is made.' },
];

const contactInfo = [
  { icon: 'uil-phone', label: 'Phone',   val: '+94 11 234 5678', href: 'tel:+94112345678' },
  { icon: 'uil-envelope', label: 'Email', val: 'hello@lankarent.lk', href: 'mailto:hello@lankarent.lk' },
  { icon: 'uil-clock',  label: 'Hours',   val: 'Mon-Fri: 8AM - 6PM (SLST)', href: '#' },
  { icon: 'uil-map-marker', label: 'Office', val: 'Colombo 03, Sri Lanka', href: '#' },
];

export default function HelpPage() {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError]          = useState('');
  const [openFaq, setOpenFaq]      = useState<number | null>(null);

  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    setSubmitting(true);
    setError('');
    try {
      const res  = await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      if (json.success) {
        setSubmitted(true);
        reset();
      } else {
        setError(json.error || 'Submission failed. Please try again.');
      }
    } catch {
      setError('Network error. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen pt-28 pb-16 page-enter">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-4 text-xs font-outfit font-semibold uppercase tracking-wider"
            style={{ background: 'rgba(245,166,35,0.08)', border: '1px solid rgba(245,166,35,0.2)', color: '#F5A623' }}>
            <i className="uil uil-headphones" />
            Support Center
          </div>
          <h1 className="section-title text-3xl sm:text-4xl mb-4">
            Help & <span className="text-gold-gradient">Inquiries</span>
          </h1>
          <p className="text-theme-secondary font-inter max-w-lg mx-auto">
            Have a question or need assistance? Our team is ready to help you find your perfect rental in Sri Lanka.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Left: Contact info + FAQ */}
          <div className="space-y-6">
            {/* Contact cards */}
            <div className="glass-card p-6 space-y-4">
              <h3 className="font-outfit font-bold text-theme-primary text-base mb-1">Contact Us</h3>
              {contactInfo.map(({ icon, label, val, href }) => (
                <a key={label} href={href} className="flex items-start gap-3 group">
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 mt-0.5 transition-all duration-200 group-hover:scale-110"
                    style={{ background: 'rgba(245,166,35,0.1)', border: '1px solid rgba(245,166,35,0.2)' }}>
                    <i className={`uil ${icon} text-gold-500 text-base`} />
                  </div>
                  <div>
                    <div className="text-theme-muted text-xs font-inter">{label}</div>
                    <div className="text-theme-secondary text-sm font-inter mt-0.5 group-hover:text-theme-primary transition-colors">{val}</div>
                  </div>
                </a>
              ))}
            </div>

            {/* FAQs */}
            <div className="glass-card p-6">
              <h3 className="font-outfit font-bold text-theme-primary text-base mb-4">
                <i className="uil uil-question-circle text-gold-500 mr-2" />
                Frequently Asked
              </h3>
              <div className="space-y-2">
                {faqs.map((faq, i) => (
                  <div key={i} className="rounded-xl overflow-hidden" style={{ border: '1px solid var(--border-color)' }}>
                    <button
                      onClick={() => setOpenFaq(openFaq === i ? null : i)}
                      className="w-full flex items-center justify-between gap-3 p-4 text-left transition-all duration-200 hover:bg-theme-muted/5"
                    >
                      <span className="text-theme-secondary font-inter text-sm">{faq.q}</span>
                      <i className={`uil uil-angle-${openFaq === i ? 'up' : 'down'} text-gold-500 text-lg shrink-0`} />
                    </button>
                    {openFaq === i && (
                      <div className="px-4 pb-4 text-theme-tertiary font-inter text-sm leading-relaxed" style={{ borderTop: '1px solid var(--border-light)' }}>
                        <div className="pt-3">{faq.a}</div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Inquiry form */}
          <div className="lg:col-span-2">
            <div className="glass-card p-6 sm:p-8">
              {submitted ? (
                <div className="text-center py-12">
                  <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6"
                    style={{ background: 'rgba(34,197,94,0.1)', border: '2px solid rgba(34,197,94,0.25)' }}>
                    <i className="uil uil-check-circle text-4xl text-green-400" />
                  </div>
                  <h3 className="font-outfit font-bold text-theme-primary text-xl mb-2">Message Sent!</h3>
                  <p className="text-theme-secondary font-inter text-sm mb-6">
                    Thank you for reaching out. Our team will respond within 24 hours.
                  </p>
                  <button onClick={() => setSubmitted(false)} className="btn-outline text-sm">
                    <i className="uil uil-envelope" />
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                  <h3 className="font-outfit font-bold text-theme-primary text-lg mb-1">
                    <i className="uil uil-comment-message text-gold-500 mr-2" />
                    Send a Message
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="form-label">Full Name *</label>
                      <input {...register('fullName')} placeholder="Kamal Perera" className="form-input" />
                      {errors.fullName && <p className="text-red-400 text-xs mt-1.5"><i className="uil uil-exclamation-circle mr-1" />{errors.fullName.message}</p>}
                    </div>
                    <div>
                      <label className="form-label">Email Address *</label>
                      <input {...register('email')} type="email" placeholder="kamal@example.com" className="form-input" />
                      {errors.email && <p className="text-red-400 text-xs mt-1.5"><i className="uil uil-exclamation-circle mr-1" />{errors.email.message}</p>}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="form-label">Phone (Optional)</label>
                      <input {...register('phone')} placeholder="+94 77 123 4567" className="form-input" />
                    </div>
                    <div>
                      <label className="form-label">Inquiry Type *</label>
                      <select {...register('inquiryType')} className="form-select">
                        <option value="">Select type</option>
                        <option value="General">General Inquiry</option>
                        <option value="Pricing">Pricing & Fees</option>
                        <option value="Availability">Availability</option>
                        <option value="Maintenance">Maintenance</option>
                        <option value="Legal">Legal / Contracts</option>
                        <option value="Other">Other</option>
                      </select>
                      {errors.inquiryType && <p className="text-red-400 text-xs mt-1.5"><i className="uil uil-exclamation-circle mr-1" />{errors.inquiryType.message}</p>}
                    </div>
                  </div>

                  <div>
                    <label className="form-label">Message *</label>
                    <textarea
                      {...register('message')}
                      rows={5}
                      placeholder="Tell us how we can help you..."
                      className="form-input resize-none"
                    />
                    {errors.message && <p className="text-red-400 text-xs mt-1.5"><i className="uil uil-exclamation-circle mr-1" />{errors.message.message}</p>}
                  </div>

                  {error && (
                    <div className="p-4 rounded-xl text-sm text-red-400 flex items-center gap-2"
                      style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.2)' }}>
                      <i className="uil uil-exclamation-triangle" />{error}
                    </div>
                  )}

                  <button type="submit" disabled={submitting} className="btn-gold w-full justify-center disabled:opacity-60">
                    {submitting ? (
                      <><div className="w-4 h-4 border-2 border-t-navy-900 border-navy-900/30 rounded-full animate-spin" /> Sending...</>
                    ) : (
                      <><i className="uil uil-message" /> Send Message</>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
