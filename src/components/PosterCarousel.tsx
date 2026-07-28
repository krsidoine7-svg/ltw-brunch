'use client';

import React from 'react';
import { Sparkles, Shield } from 'lucide-react';

interface PosterCard {
  id: string;
  badge: string;
  badgeImage: string;
  theme: string;
  tagline: string;
}

const POSTERS: PosterCard[] = [
  {
    id: '1',
    badge: 'ORGANISATION',
    badgeImage: '/les badges/ORGANISATION.png',
    theme: 'LA GUÉRISON DES VICTIMES DE VIOLS',
    tagline: "Construire un avenir d'espérance ensemble",
  },
  {
    id: '2',
    badge: 'INVITÉ(E)',
    badgeImage: '/les badges/invitee.png',
    theme: 'RESTAURATION & ÉCOUTE',
    tagline: 'Chaque vie a une valeur inestimable',
  },
  {
    id: '3',
    badge: 'COMMUNICATION',
    badgeImage: '/les badges/COMMUNICATION.png',
    theme: 'PORTEURS DE LUMIÈRE',
    tagline: "Diffuser l'espérance sans tabou",
  },
  {
    id: '4',
    badge: 'SERVITEUR',
    badgeImage: '/les badges/SERVITEUR.png',
    theme: 'ACCUEIL & BIENVENANCE',
    tagline: 'Servir avec amour et dignité',
  },
  {
    id: '5',
    badge: 'MÉDIA',
    badgeImage: '/les badges/MEDIA.png',
    theme: 'VOIX DE LA GUÉRISON',
    tagline: 'Informer, sensibiliser, libérer',
  },
  {
    id: '6',
    badge: 'INFLUENCEUR',
    badgeImage: '/les badges/influenceur.png',
    theme: 'AMBASSADEUR DE LA GUÉRISON',
    tagline: 'Engagés pour la restauration',
  },
  {
    id: '7',
    badge: 'CRÉATEUR',
    badgeImage: '/les badges/createur.png',
    theme: 'BÂTISSEUR DE CONTENUS',
    tagline: "L'art au service de la guérison",
  },
  {
    id: '8',
    badge: "SERVICE D'ACCUEIL",
    badgeImage: "/les badges/SERVICE D'ACCEUILLE.png",
    theme: 'PREMIÈRE LIGNE DE BIENVEILLANCE',
    tagline: 'Accueillir chaque âme avec douceur',
  },
];

export const PosterCarousel: React.FC = () => {
  return (
    <section className="py-16 bg-[#FFF6F8] text-dark overflow-hidden relative border-y border-rose-200/60">
      {/* Soft Light Rose Glow Background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-rose-200/40 via-[#FFF6F8] to-white pointer-events-none" />

      {/* Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10 text-center relative z-10">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#1F0038] tracking-tight">
          Galerie des <span className="text-gradient-violet">Badges & Visuels du Brunch</span>
        </h2>

        {/* Highlight Theme & Verse */}
        <div className="mt-3 inline-block px-5 py-2.5 rounded-2xl bg-white border border-rose-200 shadow-sm max-w-2xl mx-auto">
          <p className="text-base sm:text-xl font-black text-violet-dark uppercase tracking-wide">
            Thème Officiel : LA GUÉRISON DES VICTIMES DE VIOLS
          </p>
          <p className="text-[11px] sm:text-xs text-dark/75 italic mt-1">
            📖 &ldquo;Il guérit ceux qui ont le cœur brisé, et il panse leurs blessures.&rdquo; — <strong className="text-violet">Psaume 147:3</strong>
          </p>
        </div>
      </div>

      {/* ── Marquee Track 1 (EN HAUT : Grand format avec badge agrandi) ── */}
      <div className="w-full py-2 overflow-hidden flex relative z-10 group select-none">
        <div className="flex shrink-0 gap-6 pr-6 animate-marquee-left">
          {POSTERS.map((poster, idx) => (
            <LargePosterCardItem key={`row1-a-${poster.id}-${idx}`} poster={poster} />
          ))}
        </div>
        <div className="flex shrink-0 gap-6 pr-6 animate-marquee-left" aria-hidden="true">
          {POSTERS.map((poster, idx) => (
            <LargePosterCardItem key={`row1-b-${poster.id}-${idx}`} poster={poster} />
          ))}
        </div>
      </div>

      {/* ── Marquee Track 2 (EN BAS : Format compact discret) ── */}
      <div className="w-full py-2 mt-4 overflow-hidden flex relative z-10 group select-none">
        <div className="flex shrink-0 gap-6 pr-6 animate-marquee-right">
          {[...POSTERS].reverse().map((poster, idx) => (
            <CompactPosterCardItem key={`row2-a-${poster.id}-${idx}`} poster={poster} />
          ))}
        </div>
        <div className="flex shrink-0 gap-6 pr-6 animate-marquee-right" aria-hidden="true">
          {[...POSTERS].reverse().map((poster, idx) => (
            <CompactPosterCardItem key={`row2-b-${poster.id}-${idx}`} poster={poster} />
          ))}
        </div>
      </div>

      {/* Gradient fade edges matching soft rose-white background */}
      <div className="absolute inset-y-0 left-0 w-28 bg-gradient-to-r from-[#FFF6F8] via-[#FFF6F8]/80 to-transparent pointer-events-none z-20" />
      <div className="absolute inset-y-0 right-0 w-28 bg-gradient-to-l from-[#FFF6F8] via-[#FFF6F8]/80 to-transparent pointer-events-none z-20" />
    </section>
  );
};

/* ── ROW 1 (EN HAUT) : Large Card avec badge agrandi & textes blanc cassé ── */
const LargePosterCardItem: React.FC<{ poster: PosterCard }> = ({ poster }) => {
  return (
    <div className="w-72 sm:w-80 rounded-3xl border border-violet/30 bg-gradient-to-b from-[#2E0054] via-[#1A0033] to-[#0F001C] shadow-2xl hover:shadow-violet/20 transition-all duration-500 transform hover:scale-[1.03] hover:-rotate-1 hover:border-yellow-accent/70 cursor-pointer shrink-0 relative flex flex-col justify-between">
      {/* Soft radial aura behind badge */}
      <div className="absolute top-6 left-1/2 -translate-x-1/2 w-44 h-44 bg-violet/20 rounded-full blur-2xl pointer-events-none" />

      {/* Enlarged Badge Image Section */}
      <div className="flex justify-center items-center pt-5 pb-3 px-4 relative z-10">
        <img
          src={poster.badgeImage}
          alt={poster.badge}
          className="w-44 h-44 sm:w-52 sm:h-52 object-contain drop-shadow-[0_12px_24px_rgba(0,0,0,0.6)] hover:scale-105 transition-transform duration-500"
        />
      </div>

      {/* Text Content */}
      <div className="px-5 pb-4 space-y-1.5 text-left relative z-10">
        <div className="inline-block px-2.5 py-0.5 rounded-full bg-yellow-accent text-dark font-black text-[10px] tracking-wider uppercase shadow-sm">
          {poster.badge}
        </div>

        <h3 className="text-[11px] sm:text-xs font-bold text-[#F3E8FF] leading-snug tracking-wide">
          {poster.theme}
        </h3>

        <p className="text-[10px] text-purple-200/80 italic font-normal">
          &ldquo;{poster.tagline}&rdquo;
        </p>

        <div className="pt-2 border-t border-purple-400/15 flex items-center justify-between text-[9px] text-purple-300/70">
          <span className="font-semibold text-[#F5F0FF]">📅 14 Août 2026</span>
          <span>📍 HETEC Dokui</span>
        </div>
      </div>

      {/* Footer Tag */}
      <div className="px-5 pb-3.5 flex items-center justify-between relative z-10 border-t border-white/5 pt-2">
        <span className="text-[9px] font-bold text-purple-200/80 flex items-center gap-1">
          <Shield className="w-3 h-3 text-yellow-accent" />
          Light of the World
        </span>
        <span className="text-[9px] font-extrabold text-yellow-accent bg-violet/50 border border-yellow-accent/30 px-2 py-0.5 rounded-md uppercase">
          VIP 2026
        </span>
      </div>
    </div>
  );
};

/* ── ROW 2 (EN BAS) : Format compact discret ── */
const CompactPosterCardItem: React.FC<{ poster: PosterCard }> = ({ poster }) => {
  return (
    <div className="w-56 sm:w-64 rounded-2xl border border-rose-200/80 p-3.5 flex items-center gap-3 bg-white/90 shadow-md hover:shadow-lg hover:border-violet/50 transition-all shrink-0 cursor-pointer group/item">
      <img
        src={poster.badgeImage}
        alt={poster.badge}
        className="w-14 h-14 object-contain shrink-0 group-hover/item:scale-110 transition-transform drop-shadow-md"
      />
      <div className="text-left overflow-hidden">
        <span className="block text-[10px] font-extrabold text-violet uppercase tracking-wider truncate">
          {poster.badge}
        </span>
        <span className="block text-[11px] font-bold text-dark/80 leading-tight mt-0.5 line-clamp-2">
          {poster.tagline}
        </span>
      </div>
    </div>
  );
};
