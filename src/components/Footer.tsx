'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Instagram, Facebook, Linkedin, UtensilsCrossed } from 'lucide-react';
import { EASE, DURATION, VIEWPORT } from '@/lib/motion';

const Footer = () => {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={VIEWPORT}
      transition={{ duration: DURATION.normal, ease: EASE }}
      className="py-10 bg-white border-t border-gray-100"
    >
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col items-center">
          {/* Logo & Brand */}
          <div className="flex items-center gap-2 mb-6">
            <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center text-primary">
              <UtensilsCrossed size={16} />
            </div>
            <span className="text-lg font-bold text-secondary tracking-tight">
              TyebLiya
            </span>
          </div>

          {/* Navigation Links */}
          <nav className="flex flex-wrap justify-center gap-x-6 gap-y-3 mb-6">
            {['Privacy Policy', 'Terms', 'Contact'].map((item) => (
              <a
                key={item}
                href="#"
                className="text-xs font-medium text-secondary/40 hover:text-primary transition-colors duration-200"
              >
                {item}
              </a>
            ))}
          </nav>

          {/* Social Icons */}
          <div className="flex items-center gap-3 mb-6">
            {[
              { Icon: Instagram, href: '#', label: 'Instagram' },
              { Icon: Facebook, href: '#', label: 'Facebook' },
              { Icon: Linkedin, href: '#', label: 'LinkedIn' }
            ].map(({ Icon, href, label }) => (
              <a
                key={label}
                href={href}
                className="w-9 h-9 rounded-lg bg-gray-50 flex items-center justify-center text-secondary/30 hover:bg-primary hover:text-white transition-colors duration-200"
                aria-label={label}
              >
                <Icon size={16} />
              </a>
            ))}
          </div>

          {/* Copyright */}
          <p className="text-xs text-secondary/30">
            © 2026 TyebLiya — Home food, made with heart.
          </p>
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;
