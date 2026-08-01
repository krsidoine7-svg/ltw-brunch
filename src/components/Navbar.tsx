'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Ticket, Sparkles, MessageCircle, Menu, X } from 'lucide-react';

export const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'glass-panel shadow-lg py-3'
          : 'bg-white/80 backdrop-blur-md py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo & Name */}
        <a href="#" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-violet-dark to-violet p-1 shadow-md group-hover:scale-105 transition-transform flex items-center justify-center">
            <img
              src="/logo-removebg.png"
              alt="Logo Light of the World"
              className="w-full h-full object-contain"
            />
          </div>
          <div>
            <span className="font-extrabold text-lg sm:text-xl tracking-tight text-gradient-violet">
              Light of the World
            </span>
            <span className="block text-[11px] font-bold text-violet uppercase tracking-widest">
              Brunch 2ᵉ Édition
            </span>
          </div>
        </a>

        {/* Desktop Nav Items */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
          <a href="#accueil" className="text-dark/80 hover:text-violet transition-colors">
            Accueil
          </a>
          <a href="#programme" className="text-dark/80 hover:text-violet transition-colors">
            Programme
          </a>
          <a href="#studio" className="text-dark/80 hover:text-violet transition-colors flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-violet" />
            Studio Affiche
          </a>
          <a href="#ticket" className="text-dark/80 hover:text-violet transition-colors flex items-center gap-1.5">
            <Ticket className="w-4 h-4 text-violet" />
            Mon Ticket Gratuit
          </a>
          <a href="#accès" className="text-dark/80 hover:text-violet transition-colors">
            Lieu & Accès
          </a>
        </nav>

        {/* CTA Actions */}
        <div className="hidden md:flex items-center gap-4">

          <a
            href="https://chat.whatsapp.com/HT9FRLWQAHt9pKRLMZ2UPr"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold bg-[#25D366] hover:bg-[#128C7E] text-white shadow-md transition-all hover:scale-105"
          >
            <MessageCircle className="w-4 h-4" />
            Groupe WhatsApp
          </a>


          <a
            href="#ticket"
            className="flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold bg-gradient-to-r from-violet to-violet-dark text-white shadow-md hover:shadow-violet/30 transition-all hover:scale-105"
          >
            <Ticket className="w-4 h-4 text-yellow-accent" />
            Mon Ticket Gratuit
          </a>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 rounded-lg text-dark hover:bg-gray-100 transition-colors"
          aria-label="Toggle Navigation Menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden glass-panel border-t border-violet/10 px-4 py-6 mt-2 space-y-4 shadow-xl">
          <a
            href="#accueil"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-base font-semibold text-dark hover:text-violet"
          >
            Accueil
          </a>
          <a
            href="#programme"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-base font-semibold text-dark hover:text-violet"
          >
            Programme du Brunch
          </a>
          <a
            href="#studio"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-base font-semibold text-dark hover:text-violet"
          >
            Studio Affiche (Badges)
          </a>
          <a
            href="#ticket"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-base font-semibold text-dark hover:text-violet"
          >
            Générer mon Ticket Gratuit
          </a>
          <a
            href="#accès"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-base font-semibold text-dark hover:text-violet"
          >
            Lieu & Horaires
          </a>
          <div className="pt-4 border-t border-gray-100 flex flex-col gap-3">

            <a
              href="https://chat.whatsapp.com/HT9FRLWQAHt9pKRLMZ2UPr"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl font-bold bg-[#25D366] hover:bg-[#128C7E] text-white shadow-md"
            >
              <MessageCircle className="w-5 h-5" />
              Rejoindre le Groupe WhatsApp
            </a>

            <a
              href="#ticket"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center py-3 rounded-xl font-bold bg-violet text-white shadow-md"
            >
              🎟️ Mon Ticket Gratuit
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
