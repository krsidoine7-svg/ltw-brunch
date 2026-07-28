'use client';

import React from 'react';
import { Heart, MessageCircle } from 'lucide-react';

const INSCRIPTION_URL = 'https://forms.gle/u4BeKn4n6MeRCjk89';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-dark text-white pt-16 pb-10 border-t border-gray-800 relative overflow-hidden">

      {/* Decorative glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[200px] bg-violet/10 blur-3xl rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-gray-800">

          {/* Brand Block (5 cols) */}
          <div className="md:col-span-5 space-y-5">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-violet-dark to-violet p-1 shadow-lg flex items-center justify-center overflow-hidden">
                <img
                  src="/logo-removebg.png"
                  alt="Light of the World Logo"
                  className="w-full h-full object-contain"
                />
              </div>
              <div>
                <span className="block font-extrabold text-lg tracking-tight text-white leading-tight">
                  Light of the World
                </span>
                <span className="block text-[11px] text-gray-400 font-medium">
                  Brunch Officiel — 2ᵉ Édition 2026
                </span>
              </div>
            </div>

            <p className="text-gray-400 text-sm leading-relaxed max-w-sm">
              Un moment d&apos;écoute, de partage, de restauration et d&apos;espérance autour du thème :{' '}
              <strong className="text-yellow-accent">
                « LA GUÉRISON DES VICTIMES DE VIOLS »
              </strong>
            </p>

            {/* Dress Code Pill */}
            <div className="inline-flex items-center gap-3 text-xs font-bold text-gray-300 bg-gray-900 px-4 py-2.5 rounded-2xl border border-gray-700">
              <span className="text-gray-500">Dress Code :</span>
              <span className="text-violet-light">Femme 💜 Violet</span>
              <span className="text-gray-600">•</span>
              <span className="text-yellow-accent">Garçon 💛 Jaune</span>
            </div>

            {/* Inscription Button */}
            <a
              href={INSCRIPTION_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-gradient-to-r from-violet to-violet-dark text-white font-extrabold text-xs shadow-xl hover:shadow-violet/40 transition-all hover:scale-105"
            >
              ✍🏽 S&apos;inscrire via le Formulaire Officiel
            </a>
          </div>

          {/* Navigation (3 cols) */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-yellow-accent">
              Navigation Rapide
            </h4>
            <ul className="space-y-2 text-sm text-gray-400">
              {[
                { href: '#accueil',   label: 'Accueil & Compte à Rebours' },
                { href: '#programme', label: 'Programme de la Journée' },
                { href: '#studio',    label: 'Studio Affiches & Badges' },
                { href: '#ticket',    label: 'Ticket Gratuit' },
                { href: '#accès',     label: 'Lieu — HETEC Dokui' },
              ].map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="hover:text-white hover:pl-1 transition-all duration-200 flex items-center gap-1 group"
                  >
                    <span className="w-1 h-1 rounded-full bg-violet opacity-0 group-hover:opacity-100 transition-opacity" />
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Block (4 cols) */}
          <div className="md:col-span-4 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-widest text-yellow-accent">
              Contact & Communauté
            </h4>
            <p className="text-xs text-gray-400 leading-relaxed">
              Une question ? Besoin de la géolocalisation ou d&apos;informations pratiques ? Notre équipe est disponible sur WhatsApp.
            </p>

            <a
              href="https://wa.me/2250576341955"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-sm shadow-lg transition-all hover:scale-[1.02]"
            >
              <MessageCircle className="w-5 h-5" />
              Infoline : 05 76 34 19 55
            </a>
 

            <div className="text-[11px] text-gray-500 space-y-1 pt-1">
              <p>📅 14 Août 2026 · 08h30 GMT</p>
              <p>📍 HETEC Dokui, Abidjan, Côte d&apos;Ivoire</p>
              <p>🎟️ Entrée Libre sur Inscription</p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500">
          <p>
            © 2026 <span className="text-gray-300 font-semibold">Light of the World</span>. Tous droits réservés. Conformité ARTCI/RGPD Côte d&apos;Ivoire.
          </p>
          <p className="flex items-center gap-1.5">
            Conçu avec <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500 animate-pulse" /> pour la famille LTW.
          </p>
        </div>

      </div>
    </footer>
  );
};
