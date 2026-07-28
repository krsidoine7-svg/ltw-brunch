'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { BadgeCategory } from '@/lib/types';
import { Sparkles, Upload, Download, Share2 } from 'lucide-react';

interface BadgeConfig {
  category: BadgeCategory;
  imagePath: string;
  label: string;
}

const BADGES: BadgeConfig[] = [
  { category: 'Invité(e)',         imagePath: '/les badges/invitee.png',                label: 'Invité(e)' },
  { category: 'Serviteur',         imagePath: '/les badges/SERVITEUR.png',              label: 'Serviteur' },
  { category: 'Organisation',      imagePath: '/les badges/ORGANISATION.png',           label: 'Organisation' },
  { category: 'Média',             imagePath: '/les badges/MEDIA.png',                  label: 'Média' },
  { category: 'Communication',     imagePath: '/les badges/COMMUNICATION.png',          label: 'Communication' },
  { category: 'Influenceur',       imagePath: '/les badges/influenceur.png',            label: 'Influenceur' },
  { category: "Créateur",          imagePath: '/les badges/createur.png',               label: 'Créateur' },
  { category: "Service d'Accueil",  imagePath: "/les badges/SERVICE D'ACCEUILLE.png",   label: "Service d'Accueil" },
];

export const PosterStudio: React.FC = () => {
  const [selectedBadge, setSelectedBadge] = useState<BadgeConfig>(BADGES[0]);
  const [userImageSrc, setUserImageSrc]   = useState<string | null>(null);
  const [participantName, setParticipantName] = useState<string>('Votre Prénom');
  const [isGenerated, setIsGenerated]     = useState(false);

  const canvasRef   = useRef<HTMLCanvasElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  /* ── Load all Images as HTML Images ── */
  const loadImage = (src: string): Promise<HTMLImageElement> =>
    new Promise((res, rej) => {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.onload  = () => res(img);
      img.onerror = rej;
      img.src = src;
    });

  const renderPoster = async (photoSrc: string | null, badge: BadgeConfig, name: string) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width  = 1080;
    canvas.height = 1080;

    /* Background gradient */
    const bg = ctx.createLinearGradient(0, 0, 1080, 1080);
    bg.addColorStop(0,   '#31005C');
    bg.addColorStop(0.5, '#6A00C8');
    bg.addColorStop(1,   '#111111');
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, 1080, 1080);

    /* Soft glow circles */
    ctx.save();
    ctx.globalAlpha = 0.18;
    ctx.fillStyle = '#FCE100';
    ctx.beginPath(); ctx.arc(900, 180, 260, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = '#FFFFFF';
    ctx.beginPath(); ctx.arc(160, 860, 200, 0, Math.PI * 2); ctx.fill();
    ctx.restore();

    /* ── User Photo Circle ── */
    const avatarX = 540, avatarY = 310, avatarR = 175;

    ctx.save();
    ctx.beginPath();
    ctx.arc(avatarX, avatarY, avatarR, 0, Math.PI * 2);
    ctx.clip();

    if (photoSrc) {
      try {
        const photo = await loadImage(photoSrc);
        const side  = Math.min(photo.width, photo.height);
        const sx    = (photo.width  - side) / 2;
        const sy    = (photo.height - side) / 2;
        ctx.drawImage(photo, sx, sy, side, side,
          avatarX - avatarR, avatarY - avatarR, avatarR * 2, avatarR * 2);
      } catch {
        ctx.fillStyle = '#4c1d95';
        ctx.fillRect(avatarX - avatarR, avatarY - avatarR, avatarR * 2, avatarR * 2);
      }
    } else {
      ctx.fillStyle = '#4c1d95';
      ctx.fillRect(avatarX - avatarR, avatarY - avatarR, avatarR * 2, avatarR * 2);
      ctx.fillStyle = '#FFFFFF';
      ctx.font      = 'bold 22px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('VOTRE PHOTO ICI', avatarX, avatarY + 8);
    }
    ctx.restore();

    /* Circle border Gold */
    ctx.strokeStyle = '#FCE100';
    ctx.lineWidth   = 8;
    ctx.beginPath();
    ctx.arc(avatarX, avatarY, avatarR + 4, 0, Math.PI * 2);
    ctx.stroke();

    /* ── Text Zone ── */
    ctx.textAlign = 'center';

    /* Participant Name */
    ctx.fillStyle = '#FFFFFF';
    ctx.font      = 'bold 50px sans-serif';
    ctx.fillText(name.toUpperCase(), 540, 565);

    /* Official Participant Tag Pill */
    ctx.fillStyle   = '#FCE100';
    ctx.beginPath(); ctx.roundRect(330, 595, 420, 48, 24); ctx.fill();
    ctx.fillStyle   = '#111111';
    ctx.font        = 'bold 23px sans-serif';
    ctx.fillText('JE SERAI PRÉSENT(E) !', 540, 627);

    /* Event Title & Theme */
    ctx.fillStyle = '#FFFFFF';
    ctx.font      = 'bold 34px sans-serif';
    ctx.fillText('BRUNCH LIGHT OF THE WORLD', 540, 705);

    ctx.fillStyle = '#FCE100';
    ctx.font      = 'bold 26px sans-serif';
    ctx.fillText('LA GUÉRISON DES VICTIMES DE VIOLS', 540, 742);

    /* Bible Verse */
    ctx.fillStyle = 'rgba(255, 255, 255, 0.85)';
    ctx.font      = 'italic 16px sans-serif';
    ctx.fillText('“Il guérit ceux qui ont le cœur brisé, et panse leurs blessures.” — Psaume 147:3', 540, 775);

    /* Footer strip */
    ctx.fillStyle = 'rgba(0,0,0,0.45)';
    ctx.beginPath(); ctx.roundRect(60, 830, 960, 84, 20); ctx.fill();

    ctx.fillStyle = '#FFFFFF';
    ctx.font      = 'bold 23px sans-serif';
    ctx.fillText('📅 14 AOÛT 2026 · 08H30   |   📍 HETEC DOKUI, ABIDJAN', 540, 868);

    ctx.fillStyle = '#FCE100';
    ctx.font      = 'bold 17px sans-serif';
    ctx.fillText('DRESS CODE :  FEMME 💜 VIOLET   |   GARÇON 💛 JAUNE', 540, 896);

    setIsGenerated(true);
  };

  /* ── Synchronize Name from Registration Form in Real Time ── */
  useEffect(() => {
    const handleNameSync = (e: Event) => {
      const customEvent = e as CustomEvent<string>;
      const newName = customEvent.detail || 'Votre Prénom';
      setParticipantName(newName);
      void renderPoster(userImageSrc, selectedBadge, newName);
    };

    if (typeof window !== 'undefined') {
      window.addEventListener('ltw-name-sync', handleNameSync);
    }
    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('ltw-name-sync', handleNameSync);
      }
    };
  }, [userImageSrc, selectedBadge]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const src = ev.target?.result as string;
      setUserImageSrc(src);
      void renderPoster(src, selectedBadge, participantName);
    };
    reader.readAsDataURL(file);
  };

  const handleBadgeSelect = (badge: BadgeConfig) => {
    setSelectedBadge(badge);
    void renderPoster(userImageSrc, badge, participantName);
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setParticipantName(val);
    void renderPoster(userImageSrc, selectedBadge, val);
  };

  const downloadPoster = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const link = document.createElement('a');
    link.download = `Affiche_${selectedBadge.label}_LTW2026.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
  };

  const siteUrl = typeof window !== 'undefined' ? window.location.href : 'https://brunch-ltw.ci';

  return (
    <section id="studio" className="py-20 bg-gradient-to-b from-white via-purple-50/50 to-white relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-violet/10 border border-violet/20 text-violet font-semibold text-xs tracking-wider uppercase">
            <Sparkles className="w-4 h-4" />
            <span>Générateur d&apos;Affiche Officielle</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-dark tracking-tight">
            Studio <span className="text-gradient-violet">Affiche Officielle</span>
          </h2>
          <p className="text-dark/70 text-base font-normal">
            Entrez votre prénom, chargez votre photo et téléchargez votre affiche personnalisée HD pour la partager avec vos proches !
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

          {/* Controls Panel */}
          <div className="lg:col-span-6 glass-panel p-6 sm:p-8 rounded-3xl border border-violet/15 shadow-xl space-y-6">

            {/* Step 1 – Name Input */}
            <div>
              <label className="block text-xs font-extrabold text-dark uppercase mb-1">
                1. Votre Prénom / Nom :
              </label>
              <input
                type="text"
                value={participantName}
                onChange={handleNameChange}
                placeholder="Ex: Marie-Esther Kouassi"
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-violet focus:ring-2 focus:ring-violet/20 outline-none text-sm transition-all"
              />
            </div>

            {/* Step 2 – Photo Upload */}
            <div>
              <label className="block text-xs font-extrabold text-dark uppercase mb-2">
                2. Charger votre Photo :
              </label>
              <input
                type="file"
                ref={fileInputRef}
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
              <button
                onClick={() => fileInputRef.current?.click()}
                className="w-full py-4 rounded-2xl bg-violet/10 border-2 border-dashed border-violet/30 hover:border-violet text-violet font-bold text-sm transition-all flex items-center justify-center gap-2 cursor-pointer hover:bg-violet/15"
              >
                <Upload className="w-5 h-5 text-violet" />
                {userImageSrc ? '✅ Changer ma Photo' : 'Importer ma Photo (JPG / PNG)'}
              </button>
            </div>

            <button
              onClick={() => void renderPoster(userImageSrc, selectedBadge, participantName)}
              className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-violet to-violet-dark text-white font-black text-sm shadow-xl hover:shadow-violet/40 transition-all hover:scale-[1.02] flex items-center justify-center gap-2 cursor-pointer"
            >
              <Sparkles className="w-5 h-5 text-yellow-accent" />
              Générer mon Affiche Officielle
            </button>
          </div>

          {/* Canvas Preview */}
          <div className="lg:col-span-6 flex flex-col items-center justify-center">
            <div className="bg-slate-950 p-4 sm:p-5 rounded-3xl shadow-2xl border-4 border-slate-900 max-w-[400px] w-full text-center">
              <div className="flex items-center justify-between mb-4 px-2 text-xs text-gray-400">
                <span className="font-bold text-yellow-accent">APERÇU AFFICHE HD</span>
                <span>1080 × 1080 px</span>
              </div>

              <div className="overflow-hidden rounded-2xl border border-white/20 shadow-xl bg-slate-900 flex justify-center">
                <canvas
                  ref={canvasRef}
                  width={1080}
                  height={1080}
                  className="max-w-full h-auto rounded-2xl block"
                />
              </div>

              {/* Actions */}
              <div className="mt-6 space-y-3">
                <button
                  onClick={downloadPoster}
                  className="w-full py-3.5 rounded-xl bg-yellow-accent text-dark font-black text-sm shadow-md hover:opacity-90 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Download className="w-5 h-5" />
                  Télécharger mon Affiche HD (PNG)
                </button>

                <div className="grid grid-cols-2 gap-3">
                  <a
                    href={`https://api.whatsapp.com/send?text=${encodeURIComponent(
                      `Je soutiens la 2ᵉ Édition du Brunch Light of the World sous le thème « LA GUÉRISON DES VICTIMES DE VIOLS » ! Viens participer le 14/08/2026 à HETEC Dokui : ${siteUrl}`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-1.5"
                  >
                    <Share2 className="w-4 h-4" />
                    Partager WhatsApp
                  </a>
                  <a
                    href="https://wa.me/2250576341955"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-3 rounded-xl bg-violet hover:opacity-90 text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-1.5"
                  >
                    <Share2 className="w-4 h-4" />
                    Envoyer à LTW
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
