'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Send, CheckCircle2, Copy, Check, Twitter, MessageCircle, Mail, Sparkles, Timer, ShieldCheck, Users, ChefHat } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { waitlistSchema } from '@/lib/validation';
import { EASE, DURATION, REVEAL, VIEWPORT } from '@/lib/motion';
import confetti from 'canvas-confetti';
import * as gtag from '@/lib/gtag';

const WaitlistForm = () => {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [referralCode, setReferralCode] = useState('');
  const [referredBy, setReferredBy] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [shareUrl, setShareUrl] = useState('');
  const submitLockRef = useRef(false);

  const [formData, setFormData] = useState({
    role: 'client' as 'client' | 'chef',
    name: '',
    email: '',
    phone: '',
    website: '',
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const params = new URLSearchParams(window.location.search);
    const ref = params.get('ref');
    if (ref && /^[A-Z0-9]{1,20}$/.test(ref)) {
      setReferredBy(ref);
    }
  }, []);

  const triggerConfetti = () => {
    const duration = 3 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };
    const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

    const interval = setInterval(function () {
      const timeLeft = animationEnd - Date.now();
      if (timeLeft <= 0) return clearInterval(interval);
      const particleCount = 50 * (timeLeft / duration);
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
    }, 250);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (submitLockRef.current || loading) return;
    submitLockRef.current = true;

    if (formData.website) {
      setSubmitted(true);
      submitLockRef.current = false;
      return;
    }

    setError(null);

    const parsed = waitlistSchema.safeParse({
      ...formData,
      referredBy,
    });

    if (!parsed.success) {
      const firstError = parsed.error.issues[0]?.message || 'Invalid input.';
      setError(firstError);
      submitLockRef.current = false;
      return;
    }

    setLoading(true);

    try {
      const res = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          role: formData.role,
          name: formData.name.trim(),
          email: formData.email.trim() || undefined,
          phone: formData.phone.trim() || undefined,
          referredBy: referredBy || undefined,
          website: formData.website,
        }),
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.error || 'Something went wrong.');
      }

      const code = result.referralCode || 'TYEB000000';
      setReferralCode(code);
      setShareUrl(`${window.location.origin}?ref=${code}`);
      setSubmitted(true);
      triggerConfetti();

      gtag.event({
        action: 'submit_waitlist',
        category: 'Conversion',
        label: formData.role,
      });
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Something went wrong. Please try again.';
      setError(message);
    } finally {
      setLoading(false);
      setTimeout(() => { submitLockRef.current = false; }, 3000);
    }
  };

  return (
    <section id="waitlist" className="py-16 md:py-24 bg-white relative overflow-hidden">
      {/* Decorative Gradients */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-primary/5 rounded-full blur-[100px]" />
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-accent/30 rounded-full blur-[100px]" />
      </div>

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row lg:items-start gap-10 lg:gap-14">
          {/* FOMO / Urgency Side */}
          <div className="w-full lg:w-5/12">
            <motion.div
              initial={REVEAL.initial}
              whileInView={REVEAL.animate}
              viewport={VIEWPORT}
              transition={REVEAL.transition}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 bg-orange-50 rounded-xl text-primary font-bold text-[11px] tracking-[0.2em] uppercase">
                <Timer size={14} />
                <span>Limited Early Access</span>
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-secondary mb-4 leading-tight tracking-tight">
                Join <span className="text-primary">Early.</span>
              </h2>
              <p className="text-base text-secondary/60 mb-8 leading-relaxed">
                We&apos;re opening TyebLiya to a select group of founding members first. Spots are limited.
              </p>

              {/* Urgency Progress Bar */}
              <div className="bg-gray-50 p-6 rounded-xl border border-gray-100">
                <div className="flex justify-between items-end mb-3">
                  <span className="text-secondary font-bold text-sm">Spots Taken</span>
                  <span className="text-primary font-bold text-lg">172/200</span>
                </div>
                <div className="w-full h-2.5 bg-white rounded-full overflow-hidden border border-gray-100">
                  <motion.div
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 0.86 }}
                    viewport={VIEWPORT}
                    transition={{ duration: 1.2, ease: EASE }}
                    className="h-full bg-gradient-to-r from-primary to-orange-400 rounded-full origin-left"
                  />
                </div>
                <p className="mt-3 text-xs font-medium text-secondary/40 flex items-center gap-1.5">
                  <Sparkles size={12} />
                  86% claimed
                </p>
                <div className="mt-5 pt-4 border-t border-gray-100 flex items-center justify-center gap-5">
                  <div className="flex items-center gap-1.5 text-secondary/40 text-xs font-medium">
                    <ShieldCheck size={14} />
                    <span>No Spam</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-secondary/40 text-xs font-medium">
                    <Timer size={14} />
                    <span>Secure Access</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Form Side */}
          <div className="w-full lg:w-7/12">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={VIEWPORT}
              transition={{ duration: DURATION.normal, ease: EASE, delay: 0.1 }}
              className="bg-secondary p-6 md:p-10 rounded-2xl shadow-xl text-white relative overflow-hidden"
            >
              <AnimatePresence mode="wait">
                {!submitted ? (
                  <motion.div
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: DURATION.fast, ease: EASE }}
                  >
                    <h3 className="text-xl md:text-2xl font-bold mb-3 tracking-tight">Sign Up</h3>
                    <p className="text-white/50 mb-6 text-sm">Pick your role. We&apos;ll notify you when we launch in your city.</p>

                    <form onSubmit={handleSubmit} className="space-y-5">
                      {/* Role Selection */}
                      <div className="space-y-4">
                        <label className="text-[10px] font-bold uppercase tracking-widest text-white/40 ml-1">I am joining as a:</label>
                        <div className="grid grid-cols-2 gap-4">
                          <button
                            type="button"
                            onClick={() => setFormData({ ...formData, role: 'client' })}
                            className={`py-3 px-4 rounded-xl border-2 font-bold text-sm transition-colors duration-200 flex items-center justify-center gap-2 ${formData.role === 'client' ? 'bg-primary border-primary text-white shadow-sm shadow-primary/20' : 'bg-white/5 border-white/10 text-white/40 hover:border-white/20'}`}
                          >
                            <Users size={16} />
                            Customer
                          </button>
                          <button
                            type="button"
                            onClick={() => setFormData({ ...formData, role: 'chef' })}
                            className={`py-3 px-4 rounded-xl border-2 font-bold text-sm transition-colors duration-200 flex items-center justify-center gap-2 ${formData.role === 'chef' ? 'bg-primary border-primary text-white shadow-sm shadow-primary/20' : 'bg-white/5 border-white/10 text-white/40 hover:border-white/20'}`}
                          >
                            <ChefHat size={16} />
                            Chef
                          </button>
                        </div>
                      </div>

                      {/* Name Field */}
                      <div className="space-y-2">
                        <label className="text-[10px] font-bold uppercase tracking-widest text-white/40 ml-1">Full Name*</label>
                        <input
                          type="text"
                          placeholder="e.g. Ahmed El Fassi"
                          required
                          maxLength={100}
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="w-full px-5 py-3.5 bg-white/5 border border-white/10 rounded-xl text-white text-sm placeholder:text-white/20 focus:border-primary focus:outline-none focus:shadow-[0_0_0_3px_rgba(255,107,53,0.15)] transition-all duration-200"
                        />
                      </div>

                      {/* Honeypot Field (Hidden from humans) */}
                      <div className="hidden" aria-hidden="true">
                        <input
                          type="text"
                          name="website"
                          tabIndex={-1}
                          autoComplete="off"
                          value={formData.website}
                          onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                        />
                      </div>

                      {/* Contact Fields */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label className="text-[10px] font-bold uppercase tracking-widest text-white/40 ml-1">Email Address</label>
                          <input
                            type="email"
                            placeholder="ahmed@example.com"
                            maxLength={254}
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            className="w-full px-5 py-3.5 bg-white/5 border border-white/10 rounded-xl text-white text-sm placeholder:text-white/20 focus:border-primary focus:outline-none focus:shadow-[0_0_0_3px_rgba(255,107,53,0.15)] transition-all duration-200"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-[10px] font-bold uppercase tracking-widest text-white/40 ml-1">Phone Number</label>
                          <input
                            type="tel"
                            placeholder="+212..."
                            maxLength={15}
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            className="w-full px-5 py-3.5 bg-white/5 border border-white/10 rounded-xl text-white text-sm placeholder:text-white/20 focus:border-primary focus:outline-none focus:shadow-[0_0_0_3px_rgba(255,107,53,0.15)] transition-all duration-200"
                          />
                        </div>
                      </div>

                      <p className="text-[10px] text-white/30 text-center font-bold uppercase tracking-widest">
                        * At least one contact method (Email or Phone) is required
                      </p>

                      {error && (
                        <motion.p
                          initial={{ opacity: 0, y: -4 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: DURATION.fast, ease: EASE }}
                          className="text-red-400 text-sm font-bold bg-red-400/10 p-4 rounded-xl border border-red-400/20"
                        >
                          {error}
                        </motion.p>
                      )}

                      <button
                        disabled={loading}
                        className="w-full py-4 bg-primary text-white font-bold text-base rounded-xl shadow-lg shadow-primary/20 flex items-center justify-center gap-3 transition-all duration-200 ease-out disabled:opacity-50 hover:shadow-xl hover:shadow-primary/30 hover:scale-[1.02] active:scale-[0.98]"
                      >
                        {loading ? 'Joining...' : 'Get Early Access'}
                        <Send size={18} />
                      </button>

                      <div className="flex items-center justify-center gap-2 text-white/30 text-xs pt-3">
                        <ShieldCheck size={14} />
                        <p>No spam. Unsubscribe anytime.</p>
                      </div>
                    </form>
                  </motion.div>
                ) : (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: DURATION.normal, ease: EASE }}
                    className="text-center py-10"
                  >
                    <motion.div
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: DURATION.normal, ease: EASE, delay: 0.1 }}
                      className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-primary/30"
                    >
                      <CheckCircle2 size={32} className="text-white" />
                    </motion.div>
                    <h3 className="text-2xl font-bold mb-3">You&apos;re In.</h3>
                    <p className="text-base text-white/60 mb-8">
                      We&apos;ll reach out before launch. Welcome to TyebLiya.
                    </p>

                    {/* Referral Section */}
                    <div className="bg-white/5 p-5 rounded-xl border border-white/10">
                      <p className="text-sm font-black uppercase tracking-[0.2em] text-primary mb-6">Move up the waitlist</p>
                      <div className="flex flex-col md:flex-row gap-4 mb-8">
                        <div className="flex-1 bg-white/5 px-6 py-4 rounded-xl border border-white/10 text-white/80 font-mono text-sm break-all">
                          {shareUrl}
                        </div>
                        <button
                          onClick={() => {
                            navigator.clipboard.writeText(shareUrl);
                            setCopied(true);
                            setTimeout(() => setCopied(false), 2000);
                          }}
                          className="px-8 py-4 bg-white text-secondary font-black rounded-xl transition-colors duration-200 hover:bg-primary hover:text-white flex items-center justify-center gap-2"
                        >
                          {copied ? <Check size={20} /> : <Copy size={20} />}
                          {copied ? 'Copied!' : 'Copy Link'}
                        </button>
                      </div>
                      <div className="flex justify-center gap-4">
                        <a href={`https://twitter.com/intent/tweet?text=I just joined the TyebLiya waitlist! Get authentic local meals first: ${shareUrl}`} target="_blank" rel="noopener noreferrer" className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center transition-colors duration-200 hover:bg-primary text-white/60 hover:text-white">
                          <Twitter size={24} />
                        </a>
                        <a href={`https://wa.me/?text=I just joined the TyebLiya waitlist! Get authentic local meals first: ${shareUrl}`} target="_blank" rel="noopener noreferrer" className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center transition-colors duration-200 hover:bg-primary text-white/60 hover:text-white">
                          <MessageCircle size={24} />
                        </a>
                        <a href={`mailto:?subject=Join TyebLiya Waitlist&body=Get authentic local meals first: ${shareUrl}`} rel="noopener noreferrer" className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center transition-colors duration-200 hover:bg-primary text-white/60 hover:text-white">
                          <Mail size={24} />
                        </a>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WaitlistForm;
