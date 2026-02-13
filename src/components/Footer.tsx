import React from 'react';
import { Instagram, Facebook, Linkedin, UtensilsCrossed } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="py-16 bg-white border-t border-gray-100">
      <div className="container px-4 mx-auto">
        <div className="flex flex-col items-center">
          {/* Logo & Brand */}
          <div className="flex items-center gap-2 mb-8">
            <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
              <UtensilsCrossed size={20} />
            </div>
            <span className="text-2xl font-black text-secondary tracking-tighter">
              TyebLiya
            </span>
          </div>

          {/* Navigation Links */}
          <nav className="flex flex-wrap justify-center gap-x-8 gap-y-4 mb-10">
            {['Privacy Policy', 'Terms', 'Contact'].map((item) => (
              <a 
                key={item} 
                href="#" 
                className="text-sm font-bold text-secondary/40 hover:text-primary transition-colors"
              >
                {item}
              </a>
            ))}
          </nav>

          {/* Social Icons */}
          <div className="flex items-center gap-6 mb-12">
            {[
              { Icon: Instagram, href: '#', label: 'Instagram' },
              { Icon: Facebook, href: '#', label: 'Facebook' },
              { Icon: Linkedin, href: '#', label: 'LinkedIn' }
            ].map(({ Icon, href, label }) => (
              <a 
                key={label}
                href={href}
                className="w-12 h-12 rounded-2xl bg-gray-50 flex items-center justify-center text-secondary/40 hover:bg-primary hover:text-white transition-all duration-300 shadow-sm hover:shadow-lg hover:shadow-primary/20"
                aria-label={label}
              >
                <Icon size={20} />
              </a>
            ))}
          </div>

          {/* Copyright & Microcopy */}
          <div className="text-center">
            <p className="text-sm font-bold text-secondary/40">
              © 2026 TyebLiya — Connecting Food Lovers & Chefs
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
