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

  /* ── Canvas object-fit helper avec Zoom Out ── */
  const drawCoverImage = (
    ctx: CanvasRenderingContext2D,
    img: HTMLImageElement | HTMLCanvasElement,
    x: number,
    y: number,
    w: number,
    h: number
  ) => {
    const imgRatio = img.width / img.height;
    const canvasRatio = w / h;
    let renderW, renderH, offsetX = 0, offsetY = 0;

    if (imgRatio > canvasRatio) {
      renderH = h;
      renderW = img.width * (h / img.height);
    } else {
      renderW = w;
      renderH = img.height * (w / img.width);
    }
    
    // Dé-zoom de 60% comme demandé (il reste donc 40% de la taille d'origine)
    const zoom = 0.4;
    renderW *= zoom;
    renderH *= zoom;
    
    offsetX = (w - renderW) / 2;
    offsetY = (h - renderH) / 2;

    ctx.drawImage(img, x + offsetX, y + offsetY, renderW, renderH);
  };

  const renderPoster = async (photoSrc: string | null, badge: BadgeConfig, name: string) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    try {
      const templateImg = await loadImage('/jserai-template.jpg');
      
      const W = templateImg.width;
      const H = templateImg.height;
      canvas.width = W;
      canvas.height = H;

      // Dessiner le fond (qui contient déjà le titre, la date, etc.)
      ctx.drawImage(templateImg, 0, 0, W, H);

      // Dessiner la photo (masquée) à gauche
      if (photoSrc) {
        const photo = await loadImage(photoSrc);
        const mask = await loadImage('/jseraimask.png');
        
        ctx.save();
        
        // On garde les proportions EXACTES du masque (jseraimask.png)
        const maskRatio = mask.width / mask.height;
        const photoH = H * 1.175; // Augmenté de +200px (dépasse l'écran si H=1080)
        const photoW = photoH * maskRatio;
        
        // Coordonnées pour centrer dans le cadre violet
        const photoX = W * -0.045; // Ajusté à gauche pour compenser
        const photoY = H * -0.087;  // Ajusté vers le haut pour compenserre
        
        const off = document.createElement('canvas');
        off.width = photoW;
        off.height = photoH;
        const offCtx = off.getContext('2d');
        
        if (offCtx) {
          drawCoverImage(offCtx, photo, 0, 0, photoW, photoH);
          
          offCtx.globalCompositeOperation = 'destination-in';
          offCtx.drawImage(mask, 0, 0, photoW, photoH);
          
          ctx.drawImage(off, photoX, photoY);
        }
        
        ctx.restore();
      }

      // Dessiner le nom du participant (à droite)
      ctx.textAlign = 'center';
      ctx.fillStyle = '#FCE100'; // Jaune pour mieux ressortir
      ctx.font      = 'bold 45px "Inter", sans-serif';
      
      const nameX = W * 0.73; // 73% (milieu de la zone droite)
      const nameY = H * 0.52; // 52% (légèrement plus bas pour éviter de toucher le texte au-dessus)
      
      ctx.fillText(name.toUpperCase(), nameX, nameY);

      setIsGenerated(true);
    } catch (err) {
      console.error('Error drawing poster:', err);
    }
  };

  /* ── Synchronize Name and Photo from Registration Form in Real Time ── */
  useEffect(() => {
    const handleNameSync = (e: Event) => {
      const customEvent = e as CustomEvent<string>;
      const newName = customEvent.detail || 'Votre Prénom';
      setParticipantName(newName);
      void renderPoster(userImageSrc, selectedBadge, newName);
    };

    const handlePhotoSync = (e: Event) => {
      const customEvent = e as CustomEvent<string>;
      const newPhoto = customEvent.detail;
      setUserImageSrc(newPhoto);
      void renderPoster(newPhoto, selectedBadge, participantName);
    };

    if (typeof window !== 'undefined') {
      window.addEventListener('ltw-name-sync', handleNameSync);
      window.addEventListener('ltw-photo-sync', handlePhotoSync);
    }
    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('ltw-name-sync', handleNameSync);
        window.removeEventListener('ltw-photo-sync', handlePhotoSync);
      }
    };
  }, [userImageSrc, selectedBadge, participantName]);

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
    <section id="studio" className="hidden py-20 bg-gradient-to-b from-white via-purple-50/50 to-white relative">
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
              <div className="flex items-center justify-center mb-4 px-2 text-xs text-gray-400">
                <span className="font-bold text-yellow-accent">APERÇU AFFICHE</span>
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
                  Télécharger mon Affiche
                </button>

                <a
                  href="https://chat.whatsapp.com/HT9FRLWQAHt9pKRLMZ2UPr"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3.5 rounded-xl bg-[#25D366] hover:bg-[#128C7E] text-white font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2"
                >
                  <Share2 className="w-5 h-5" />
                  Rejoindre le Groupe WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
