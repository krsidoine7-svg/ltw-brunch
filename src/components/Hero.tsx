'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { Calendar, Clock, MapPin, Sparkles, Ticket, ChevronLeft, ChevronRight } from 'lucide-react';

/* ── Hero Image Slider Config ── */
const HERO_IMAGES = [
  {
    src: '/img-prin-couleur.png',
    alt: 'Modèle Brunch Light of the World — Version Couleur',
    caption: 'Brunch Light of the World • 2ᵉ Édition',
    sub: "Un moment d'écoute, d'amour et de restauration spirituelle.",
  },
  {
    src: '/img-prin-noire.png',
    alt: 'Modèle Brunch Light of the World — Version Noir & Blanc',
    caption: 'La Guérison est Possible',
    sub: 'Chaque vie a une valeur inestimable — rejoignez-nous.',
  },
  {
    src: '/Gemini_Generated_Image_7z9vvg7z9vvg7z9v.png',
    alt: 'Visuel Officiel Brunch Light of the World 2026',
    caption: 'LA GUÉRISON DES VICTIMES DE VIOLS',
    sub: 'Partage, espérance et restauration — 14 Août 2026.',
  },
];

const SLIDE_INTERVAL_MS = 4000;

export const Hero: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0, hours: 0, minutes: 0, seconds: 0,
  });

  /* ── Slider State ── */
  const [activeIdx, setActiveIdx]     = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [direction, setDirection]     = useState<'left' | 'right'>('right');

  /* ── Countdown ── */
  useEffect(() => {
    const targetDate = new Date('2026-08-14T08:30:00');
    const update = () => {
      const diff = targetDate.getTime() - Date.now();
      if (diff > 0) {
        setTimeLeft({
          days:    Math.floor(diff / (1000 * 60 * 60 * 24)),
          hours:   Math.floor((diff / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((diff / 1000 / 60) % 60),
          seconds: Math.floor((diff / 1000) % 60),
        });
      }
    };
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, []);

  /* ── Slide Transition ── */
  const goTo = useCallback((nextIdx: number, dir: 'left' | 'right') => {
    if (isAnimating) return;
    setDirection(dir);
    setIsAnimating(true);
    setTimeout(() => {
      setActiveIdx(nextIdx);
      setIsAnimating(false);
    }, 500);
  }, [isAnimating]);

  const next = useCallback(() => {
    goTo((activeIdx + 1) % HERO_IMAGES.length, 'right');
  }, [activeIdx, goTo]);

  const prev = useCallback(() => {
    goTo((activeIdx - 1 + HERO_IMAGES.length) % HERO_IMAGES.length, 'left');
  }, [activeIdx, goTo]);

  /* ── Auto-play ── */
  useEffect(() => {
    const id = setInterval(next, SLIDE_INTERVAL_MS);
    return () => clearInterval(id);
  }, [next]);

  const current = HERO_IMAGES[activeIdx];

  return (
    <section
      id="accueil"
      className="relative pt-28 pb-16 md:pt-36 md:pb-24 overflow-hidden bg-gradient-to-b from-purple-50/50 via-white to-white"
    >
      {/* Decorative Curves */}
      <div
        className="absolute top-0 right-0 w-full h-full opacity-20 pointer-events-none bg-cover bg-right -z-10"
        style={{ backgroundImage: "url('/Courbes 2.png')" }}
      />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-violet/20 to-yellow-accent/20 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

          {/* ── Text Content (7 cols) ── */}
          <div className="lg:col-span-7 text-center lg:text-left space-y-6">

            {/* Pill badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-violet/10 border border-violet/20 text-violet font-semibold text-xs sm:text-sm shadow-sm">
              <Sparkles className="w-4 h-4 text-violet animate-pulse" />
              <span>Événement d&apos;Espérance &amp; de Restauration • 2ᵉ Édition</span>
            </div>

            {/* Title */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-dark tracking-tight leading-tight">
              <span className="relative inline-block px-3 py-1 mr-2">
                <span className="relative z-10 text-white">Brunch</span>
                <span className="absolute inset-0 bg-gradient-to-r from-violet to-violet-dark rounded-xl -rotate-1 shadow-lg" aria-hidden="true" />
              </span>
              <span className="text-gradient-violet">Light of the World</span>
            </h1>

            {/* Official Theme Highlight Banner */}
            <div className="p-4 rounded-2xl bg-gradient-to-r from-violet/10 via-purple-100/50 to-violet/10 border-2 border-violet/30 shadow-sm text-left max-w-2xl">
              <span className="block text-[11px] font-black uppercase tracking-wider text-violet mb-1">
                📌 THÈME OFFICIEL DE LA 2ᵉ ÉDITION :
              </span>
              <p className="text-2xl sm:text-3xl lg:text-4xl font-black text-violet-dark leading-tight">
                LA GUÉRISON DES VICTIMES DE VIOLS
              </p>
              <p className="text-xs sm:text-sm italic font-medium text-dark/80 mt-1.5 border-t border-violet/20 pt-1.5">
                📖 Verset &amp; Ancrage : &ldquo;Il guérit ceux qui ont le cœur brisé, et il panse leurs blessures.&rdquo; — <strong className="text-violet">Psaume 147:3</strong>
              </p>
            </div>

            {/* Description */}
            <p className="text-base sm:text-lg text-dark/80 font-normal leading-relaxed max-w-2xl">
              Parce que la guérison est possible et que chaque vie a de la valeur, nous vous invitons à venir vivre un moment d&apos;écoute, de partage, de restauration et d&apos;espérance dans un cadre bienveillant.
            </p>

            {/* Date / Time / Place cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-2xl pt-2">
              {[
                { icon: <Calendar className="w-5 h-5" />, label: 'Date',  value: '14 Août 2026' },
                { icon: <Clock    className="w-5 h-5" />, label: 'Heure', value: '08h30 GMT'   },
                { icon: <MapPin   className="w-5 h-5" />, label: 'Lieu',  value: 'HETEC Dokui' },
              ].map((item) => (
                <div
                  key={item.label}
                  className="glass-panel p-3.5 rounded-2xl flex items-center gap-3 shadow-sm border border-violet/15"
                >
                  <div className="w-10 h-10 rounded-xl bg-violet/10 flex items-center justify-center text-violet shrink-0">
                    {item.icon}
                  </div>
                  <div className="text-left">
                    <span className="block text-xs font-semibold text-gray-500 uppercase">{item.label}</span>
                    <span className="font-bold text-sm text-dark">{item.value}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Dress Code */}
            <div className="glass-panel max-w-xl p-4 rounded-2xl border-2 border-violet/20 shadow-md">
              <span className="block text-xs font-extrabold text-violet uppercase tracking-widest mb-2 text-center lg:text-left">
                👗 Dress Code Officiel 👕
              </span>
              <div className="flex items-center justify-center lg:justify-start gap-6 text-sm font-bold">
                <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-violet/15 text-violet-dark border border-violet/30">
                  <span>Femme 👩🏻:</span>
                  <span className="font-black text-violet">Violet 💜</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-yellow-accent/20 text-dark border border-yellow-accent/40">
                  <span>Garçon 👨🏻:</span>
                  <span className="font-black text-amber-600">Jaune 💛</span>
                </div>
              </div>
            </div>

            {/* Live Countdown */}
            <div className="pt-2">
              <span className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-2 text-center lg:text-left">
                Compte à rebours avant le Brunch :
              </span>
              <div className="flex items-center justify-center lg:justify-start gap-3 max-w-md">
                {[
                  { val: timeLeft.days,    label: 'Jours' },
                  { val: timeLeft.hours,   label: 'Heures' },
                  { val: timeLeft.minutes, label: 'Min' },
                  { val: timeLeft.seconds, label: 'Sec' },
                ].map(({ val, label }) => (
                  <div
                    key={label}
                    className="flex-1 bg-gradient-to-b from-gray-900 to-dark text-white p-3 rounded-2xl text-center shadow-lg border border-gray-800"
                  >
                    <span className="block text-2xl font-black text-yellow-accent tabular-nums">
                      {String(val).padStart(2, '0')}
                    </span>
                    <span className="block text-[10px] text-gray-400 font-semibold uppercase">{label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* CTAs */}
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 flex-wrap">
              <a
                href="https://forms.gle/u4BeKn4n6MeRCjk89"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-yellow-accent text-dark font-black text-base shadow-xl hover:shadow-yellow-accent/40 transition-all hover:scale-105 flex items-center justify-center gap-2 border-2 border-yellow-400"
              >
                ✍🏽 S&apos;inscrire au Formulaire Officiel
              </a>
              <a
                href="#ticket"
                className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-violet to-violet-dark text-white font-extrabold text-base shadow-xl hover:shadow-violet/40 transition-all hover:scale-105 flex items-center justify-center gap-2 group"
              >
                <Ticket className="w-5 h-5 text-yellow-accent group-hover:rotate-12 transition-transform" />
                Obtenir mon Ticket Gratuit
              </a>
            </div>
          </div>

          {/* ── Image Slider (5 cols) ── */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center gap-4 relative">
            
            {/* Ticket Floating Decoration */}
            <div className="hidden lg:block absolute -left-16 top-10 z-20 w-40 -rotate-[20deg] shadow-2xl rounded-xl overflow-hidden border-4 border-white/80 pointer-events-none hover:scale-105 transition-transform duration-500">
              <img src="/ex-rendu-ticket.jpg" alt="Ticket Brunch" className="w-full h-auto" />
            </div>

            {/* Slider Card */}
            <div className="relative w-full max-w-md group">

              {/* Image frame */}
              <div className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl border-4 border-white glass-panel p-2">

                {/* Images */}
                {HERO_IMAGES.map((img, idx) => {
                  const isActive = idx === activeIdx;
                  return (
                    <img
                      key={img.src}
                      src={img.src}
                      alt={img.alt}
                      className={[
                        'absolute inset-2 w-[calc(100%-1rem)] h-[calc(100%-1rem)] object-cover rounded-2xl',
                        'transition-all duration-700 ease-in-out',
                        isActive
                          ? 'opacity-100 scale-100 z-10'
                          : direction === 'right'
                          ? 'opacity-0 scale-95 -translate-x-4 z-0'
                          : 'opacity-0 scale-95 translate-x-4 z-0',
                      ].join(' ')}
                    />
                  );
                })}

                {/* Caption Overlay */}
                <div
                  key={activeIdx}
                  className="absolute bottom-4 left-4 right-4 z-20 p-4 rounded-2xl glass-panel-dark text-white border border-white/20 transition-all duration-500"
                >
                  <p className="font-extrabold text-yellow-accent uppercase tracking-wider text-xs mb-1">
                    {current.caption}
                  </p>
                  <p className="text-gray-200 text-xs leading-relaxed">
                    {current.sub}
                  </p>
                </div>

                {/* Prev / Next Arrows */}
                <button
                  onClick={prev}
                  className="absolute left-3 top-1/2 -translate-y-1/2 z-30 w-9 h-9 rounded-full bg-black/50 hover:bg-violet text-white flex items-center justify-center shadow-lg transition-all opacity-0 group-hover:opacity-100 hover:scale-110 cursor-pointer"
                  aria-label="Image précédente"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={next}
                  className="absolute right-3 top-1/2 -translate-y-1/2 z-30 w-9 h-9 rounded-full bg-black/50 hover:bg-violet text-white flex items-center justify-center shadow-lg transition-all opacity-0 group-hover:opacity-100 hover:scale-110 cursor-pointer"
                  aria-label="Image suivante"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>

              {/* Glow ring behind frame */}
              <div className="absolute -inset-2 rounded-3xl bg-gradient-to-tr from-violet/30 to-yellow-accent/20 blur-xl -z-10 opacity-60 group-hover:opacity-90 transition-opacity" />
            </div>

            {/* Dot Indicators */}
            <div className="flex items-center justify-center gap-2 mt-1">
              {HERO_IMAGES.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => goTo(idx, idx > activeIdx ? 'right' : 'left')}
                  aria-label={`Afficher image ${idx + 1}`}
                  className={[
                    'rounded-full transition-all duration-500 cursor-pointer',
                    idx === activeIdx
                      ? 'w-8 h-3 bg-violet shadow-md shadow-violet/40'
                      : 'w-3 h-3 bg-gray-300 hover:bg-violet/50',
                  ].join(' ')}
                />
              ))}
            </div>

            {/* Progress Bar */}
            <div className="w-full max-w-md h-1 bg-gray-200 rounded-full overflow-hidden">
              <div
                key={activeIdx}
                className="h-full bg-gradient-to-r from-violet to-yellow-accent rounded-full"
                style={{
                  animation: `heroProgress ${SLIDE_INTERVAL_MS}ms linear forwards`,
                }}
              />
            </div>

            {/* CTA Button directly under Hero Image Slider */}
            <a
              href="#studio"
              className="w-full max-w-md py-3.5 px-6 rounded-2xl bg-gradient-to-r from-violet via-purple-700 to-violet-dark text-white font-extrabold text-base shadow-xl hover:shadow-violet/40 transition-all hover:scale-[1.03] flex items-center justify-center gap-2.5 cursor-pointer group border border-violet-400/30"
            >
              <Sparkles className="w-5 h-5 text-yellow-accent group-hover:rotate-12 transition-transform" />
              <span>✨ Créer mon Affiche Personnalisée</span>
            </a>

            {/* Partner logo */}
            <div className="flex items-center gap-3 px-4 py-2.5 rounded-2xl bg-white shadow-md border border-gray-100">
              <span className="text-xs font-bold text-gray-500 uppercase">Partenaire Officiel :</span>
              <img
                src="/patenaire-light.png"
                alt="Partenaire Officiel Light"
                className="h-8 object-contain"
              />
            </div>
          </div>
        </div>
      </div>

      {/* ── Keyframe for progress bar ── */}
      <style>{`
        @keyframes heroProgress {
          from { width: 0%; }
          to   { width: 100%; }
        }
      `}</style>
    </section>
  );
};
