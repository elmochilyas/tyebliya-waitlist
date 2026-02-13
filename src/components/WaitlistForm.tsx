'use client';

import React, { useState, useEffect } from 'react';
import { Send, CheckCircle2, Copy, Check, Twitter, MessageCircle, Mail, Sparkles, Timer, ShieldCheck, Users, ChefHat } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '@/lib/supabase';
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

  const [formData, setFormData] = useState({
    role: 'client',
    name: '',
    email: '',
    phone: '',
    website: '', // Honeypot field
  });

  const [lastSubmitTime, setLastSubmitTime] = useState<number>(0);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const params = new URLSearchParams(window.location.search);
    const ref = params.get('ref');
    if (ref) {
      setReferredBy(ref);
    }
  }, []);

  const triggerConfetti = () => {
    const duration = 3 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };
    const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

    const interval: any = setInterval(function () {
      const timeLeft = animationEnd - Date.now();
      if (timeLeft <= 0) return clearInterval(interval);
      const particleCount = 50 * (timeLeft / duration);
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
    }, 250);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // 1. Honeypot check (Bot protection)
    if (formData.website) {
      console.warn('Bot detected via honeypot');
      setSubmitted(true); // Fake success for bots
      return;
    }

    // 2. Client-side Rate Limiting (Prevent spam clicks)
    const now = Date.now();
    if (now - lastSubmitTime < 10000) { // 10 second cooldown
      setError('Please wait a moment before trying again.');
      return;
    }

    // Reset error state
    setError(null);

    // 3. Advanced Validation Logic
    if (!formData.name.trim() || formData.name.length < 2) {
      setError('Please enter a valid full name');
      return;
    }

    const emailTrimmed = formData.email.trim();
    const phoneTrimmed = formData.phone.trim();

    if (!emailTrimmed && !phoneTrimmed) {
      setError('Please provide either an email or a phone number');
      return;
    }

    if (emailTrimmed) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(emailTrimmed)) {
        setError('Please enter a valid email address');
        return;
      }
    }

    if (phoneTrimmed && !/^\+?[0-9\s\-]{7,15}$/.test(phoneTrimmed)) {
      setError('Please enter a valid phone number');
      return;
    }

    setLoading(true);

    try {
      // 4. Secure Direct Supabase Integration
      const { error: supabaseError } = await supabase
        .from('waitlist_users')
        .insert([
          {
            role: formData.role,
            name: formData.name.substring(0, 100), // Limit length
            email: emailTrimmed || null,
            phone: phoneTrimmed || null,
            referred_by: referredBy,
            metadata: {
              source: 'web_v1',
              screen_res: `${window.innerWidth}x${window.innerHeight}`
            }
          }
        ]);

      if (supabaseError) {
        if (supabaseError.code === '23514') throw new Error('Invalid input data.');
        throw supabaseError;
      }

      setLastSubmitTime(now);
      const mockReferral = 'TYEB' + Math.random().toString(36).substring(7).toUpperCase();
      setReferralCode(mockReferral);
      setShareUrl(`${window.location.origin}?ref=${mockReferral}`);

      setSubmitted(true);
      triggerConfetti();
      gtag.event({ action: 'submit_waitlist', category: 'Conversion', label: emailTrimmed || phoneTrimmed });
    } catch (err: any) {
      console.error('Waitlist Error:', err.message);
      setError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // shareUrl is computed in handleSubmit after referralCode is generated (avoids SSR hydration mismatch)

  return (
    <section id="waitlist" className="py-24 md:py-32 bg-white relative overflow-hidden">
      {/* Decorative Gradients */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-primary/5 rounded-full blur-[100px]" />
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-accent/30 rounded-full blur-[100px]" />
      </div>

      <div className="container px-4 mx-auto relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-wrap items-center -mx-4">
            {/* FOMO / Urgency Side */}
            <div className="w-full lg:w-5/12 px-4 mb-16 lg:mb-0">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <div className="inline-flex items-center gap-2 px-4 py-2 mb-8 bg-orange-100 rounded-2xl text-primary font-black text-xs tracking-widest uppercase">
                  <Timer size={14} className="animate-pulse" />
                  <span>Limited Spots Available</span>
                </div>
                <h2 className="text-4xl md:text-6xl font-black text-secondary mb-8 leading-[1.1] tracking-tight">
                  Join the inner circle of <span className="text-primary">TyebLiya.</span>
                </h2>
                <p className="text-xl text-secondary/60 mb-10 leading-relaxed font-medium">
                  We're only accepting 200 early members this month to ensure the highest quality experience. Grab your spot before they're gone.
                </p>

                {/* Urgency Progress Bar */}
                <div className="bg-gray-100 p-8 rounded-[2.5rem] border border-gray-200">
                  <div className="flex justify-between items-end mb-4">
                    <span className="text-secondary font-black text-lg">Waitlist Progress</span>
                    <span className="text-primary font-black text-2xl">172/200</span>
                  </div>
                  <div className="w-full h-4 bg-white rounded-full overflow-hidden border border-gray-100">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: '86%' }}
                      transition={{ duration: 2, ease: "easeOut" }}
                      className="h-full bg-gradient-to-r from-primary to-orange-400 rounded-full shadow-[0_0_20px_rgba(255,107,53,0.3)]"
                    />
                  </div>
                  <p className="mt-4 text-sm font-bold text-secondary/40 flex items-center gap-2">
                    <Sparkles size={14} />
                    86% of spots are already claimed!
                  </p>
                  <div className="mt-8 pt-8 border-t border-gray-100 flex items-center justify-center gap-6">
                    <div className="flex items-center gap-2 text-secondary/40 text-sm font-bold">
                      <ShieldCheck size={16} />
                      <span>No Spam Ever</span>
                    </div>
                    <div className="flex items-center gap-2 text-secondary/40 text-sm font-bold">
                      <Timer size={16} />
                      <span>Secure Access</span>
                    </div>
                  </div>
                  <p className="mt-6 text-center text-xs text-secondary/30 font-medium">
                    We respect your privacy — no spam, just updates.
                  </p>
                </div>
              </motion.div>
            </div>

            {/* Form Side */}
            <div className="w-full lg:w-7/12 px-4">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="bg-secondary p-8 md:p-16 rounded-[3rem] shadow-3xl text-white relative overflow-hidden"
              >
                <AnimatePresence mode="wait">
                  {!submitted ? (
                    <motion.div
                      key="form"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                    >
                      <h3 className="text-4xl font-black mb-4 tracking-tight">Join the Waitlist & Be First to Taste!</h3>
                      <p className="text-white/60 mb-10 font-medium">Choose how you’d like to join and we’ll notify you when TyebLiya launches.</p>

                      <form onSubmit={handleSubmit} className="space-y-8">
                        {/* Role Selection */}
                        <div className="space-y-4">
                          <label className="text-xs font-black uppercase tracking-widest text-white/40 ml-4">I am joining as a:</label>
                          <div className="grid grid-cols-2 gap-4">
                            <button
                              type="button"
                              onClick={() => setFormData({ ...formData, role: 'client' })}
                              className={`py-4 px-6 rounded-2xl border-2 font-black transition-all flex items-center justify-center gap-3 ${formData.role === 'client' ? 'bg-primary border-primary text-white shadow-lg shadow-primary/20' : 'bg-white/5 border-white/10 text-white/40 hover:border-white/20'}`}
                            >
                              <Users size={20} />
                              Client
                            </button>
                            <button
                              type="button"
                              onClick={() => setFormData({ ...formData, role: 'chef' })}
                              className={`py-4 px-6 rounded-2xl border-2 font-black transition-all flex items-center justify-center gap-3 ${formData.role === 'chef' ? 'bg-primary border-primary text-white shadow-lg shadow-primary/20' : 'bg-white/5 border-white/10 text-white/40 hover:border-white/20'}`}
                            >
                              <ChefHat size={20} />
                              Chef
                            </button>
                          </div>
                        </div>

                        {/* Name Field */}
                        <div className="space-y-2">
                          <label className="text-xs font-black uppercase tracking-widest text-white/40 ml-4">Full Name*</label>
                          <input
                            type="text"
                            placeholder="e.g. John Doe"
                            required
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            className="w-full px-8 py-5 bg-white/5 border-2 border-white/10 rounded-2xl text-white placeholder:text-white/20 focus:border-primary focus:outline-none transition-all font-bold"
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
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="space-y-2">
                            <label className="text-xs font-black uppercase tracking-widest text-white/40 ml-4">Email Address</label>
                            <input
                              type="email"
                              placeholder="john@example.com"
                              value={formData.email}
                              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                              className="w-full px-8 py-5 bg-white/5 border-2 border-white/10 rounded-2xl text-white placeholder:text-white/20 focus:border-primary focus:outline-none transition-all font-bold"
                            />
                          </div>
                          <div className="space-y-2">
                            <label className="text-xs font-black uppercase tracking-widest text-white/40 ml-4">Phone Number</label>
                            <input
                              type="tel"
                              placeholder="+213..."
                              value={formData.phone}
                              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                              className="w-full px-8 py-5 bg-white/5 border-2 border-white/10 rounded-2xl text-white placeholder:text-white/20 focus:border-primary focus:outline-none transition-all font-bold"
                            />
                          </div>
                        </div>

                        <p className="text-[10px] text-white/30 text-center font-bold uppercase tracking-widest">
                          * At least one contact method (Email or Phone) is required
                        </p>

                        {error && (
                          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-red-400 text-sm font-bold bg-red-400/10 p-4 rounded-xl border border-red-400/20">
                            {error}
                          </motion.p>
                        )}

                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          disabled={loading}
                          className="w-full py-6 bg-primary text-white font-black text-xl rounded-2xl shadow-2xl shadow-primary/20 flex items-center justify-center gap-4 transition-all disabled:opacity-50"
                        >
                          {loading ? 'Securing Spot...' : 'Join Now'}
                          <Send size={24} />
                        </motion.button>

                        <div className="flex items-center justify-center gap-3 text-white/40 font-bold text-sm pt-4">
                          <ShieldCheck size={18} />
                          <p>We respect your privacy — no spam, just updates.</p>
                        </div>
                      </form>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="text-center py-10"
                    >
                      <div className="w-24 h-24 bg-primary rounded-full flex items-center justify-center mx-auto mb-8 shadow-2xl shadow-primary/40">
                        <CheckCircle2 size={48} className="text-white" />
                      </div>
                      <h3 className="text-4xl font-black mb-4">You're in!</h3>
                      <p className="text-xl text-white/60 mb-12 font-medium">
                        Welcome to the TyebLiya family. We'll notify you the moment authentic meals are ready in your area.
                      </p>

                      {/* Referral Section */}
                      <div className="bg-white/5 p-8 rounded-3xl border-2 border-white/10">
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
                            className="px-8 py-4 bg-white text-secondary font-black rounded-xl hover:bg-primary hover:text-white transition-all flex items-center justify-center gap-2"
                          >
                            {copied ? <Check size={20} /> : <Copy size={20} />}
                            {copied ? 'Copied!' : 'Copy Link'}
                          </button>
                        </div>
                        <div className="flex justify-center gap-4">
                          <a href={`https://twitter.com/intent/tweet?text=I just joined the TyebLiya waitlist! Get authentic local meals first: ${shareUrl}`} target="_blank" className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center hover:bg-primary transition-all text-white/60 hover:text-white">
                            <Twitter size={24} />
                          </a>
                          <a href={`https://wa.me/?text=I just joined the TyebLiya waitlist! Get authentic local meals first: ${shareUrl}`} target="_blank" className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center hover:bg-primary transition-all text-white/60 hover:text-white">
                            <MessageCircle size={24} />
                          </a>
                          <a href={`mailto:?subject=Join TyebLiya Waitlist&body=Get authentic local meals first: ${shareUrl}`} className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center hover:bg-primary transition-all text-white/60 hover:text-white">
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
      </div>
    </section>
  );
};

export default WaitlistForm;
