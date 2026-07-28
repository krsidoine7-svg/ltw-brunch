'use client';

import React, { useState, useRef } from 'react';
import QRCode from 'qrcode';
import { sendToMakeWebhook } from '@/lib/makeWebhook';
import { TicketRegistration } from '@/lib/types';
import { Ticket, Download, Share2, Sparkles, User, AlertCircle } from 'lucide-react';

export const TicketGenerator: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    firstname: '',
    email: '',
    phone: '',
    address: '',
    isVolunteer: false,
  });

  const [loading, setLoading]     = useState(false);
  const [ticket, setTicket]       = useState<TicketRegistration | null>(null);
  const [qrCodeUrl, setQrCodeUrl] = useState<string | null>(null);
  const [errorMsg, setErrorMsg]   = useState<string | null>(null);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    const updated = { ...formData, [name]: type === 'checkbox' ? checked : value };
    setFormData(updated);

    if (name === 'name' || name === 'firstname') {
      const fullName = `${updated.firstname} ${updated.name}`.trim();
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new CustomEvent('ltw-name-sync', { detail: fullName }));
      }
    }
  };

  /* ── Load Image helper ── */
  const loadImg = (src: string): Promise<HTMLImageElement> =>
    new Promise((res, rej) => {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.onload  = () => res(img);
      img.onerror = rej;
      img.src = src;
    });

  /* ── Canvas object-fit: cover helper (no deformation) ── */
  const drawCoverImage = (
    ctx: CanvasRenderingContext2D,
    img: HTMLImageElement,
    x: number,
    y: number,
    w: number,
    h: number
  ) => {
    const imgRatio = img.width / img.height;
    const rectRatio = w / h;
    let sx = 0, sy = 0, sw = img.width, sh = img.height;

    if (imgRatio > rectRatio) {
      sw = img.height * rectRatio;
      sx = (img.width - sw) / 2;
    } else {
      sh = img.width / rectRatio;
      sy = (img.height - sh) / 2;
    }

    ctx.drawImage(img, sx, sy, sw, sh, x, y, w, h);
  };

  /* ── Canvas object-fit: contain helper (no deformation) ── */
  const drawContainImage = (
    ctx: CanvasRenderingContext2D,
    img: HTMLImageElement,
    x: number,
    y: number,
    maxW: number,
    maxH: number
  ) => {
    const imgRatio = img.width / img.height;
    let w = maxW;
    let h = maxW / imgRatio;

    if (h > maxH) {
      h = maxH;
      w = maxH * imgRatio;
    }

    const dx = x + (maxW - w) / 2;
    const dy = y + (maxH - h) / 2;

    ctx.drawImage(img, dx, dy, w, h);
  };

  /* ── Canvas Ticket Renderer (Horizontal Landscape Coupon 1200×500 px) ── */
  const renderTicket = async (t: TicketRegistration, qrUrl: string) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const W = 1200, H = 500;
    const stubX = 840; // Right stub starts at X=840 (Width: 360px)

    canvas.width  = W;
    canvas.height = H;

    /* Base Fill */
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(0, 0, W, H);

    /* ── LEFT MAIN SECTION (0 -> 840) — Official LTW Poster Background ── */
    /* Step 1: Deep violet base gradient (matching official poster) */
    const bgGrad = ctx.createLinearGradient(0, 0, stubX, H);
    bgGrad.addColorStop(0,   '#2A0055');
    bgGrad.addColorStop(0.4, '#5500AA');
    bgGrad.addColorStop(1,   '#1A0033');
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, stubX, H);

    /* Step 2: Soft white misty foam blobs — MORE WHITE, denser effect */
    const blobs = [
      { x: 85,  y: 80,  r: 150, a: 0.45 },
      { x: 380, y: 55,  r: 120, a: 0.30 },
      { x: 620, y: 140, r: 180, a: 0.25 },
      { x: 200, y: 340, r: 140, a: 0.35 },
      { x: 480, y: 400, r: 160, a: 0.22 },
      { x: 760, y: 300, r: 130, a: 0.20 },
      { x: 700, y: 30,  r: 110, a: 0.28 },
      { x: 50,  y: 420, r: 100, a: 0.40 },
      { x: 310, y: 200, r: 130, a: 0.18 },
      { x: 820, y: 80,  r:  90, a: 0.25 },
    ];

    for (const blob of blobs) {
      const radGrad = ctx.createRadialGradient(blob.x, blob.y, 0, blob.x, blob.y, blob.r);
      radGrad.addColorStop(0,   `rgba(255, 255, 255, ${blob.a})`);
      radGrad.addColorStop(0.4, `rgba(220, 190, 255, ${blob.a * 0.6})`);
      radGrad.addColorStop(1,   'rgba(255, 255, 255, 0)');
      ctx.fillStyle = radGrad;
      ctx.beginPath();
      ctx.arc(blob.x, blob.y, blob.r, 0, Math.PI * 2);
      ctx.fill();
    }

    /* Left Image Thumbnail (object-fit: cover, perfectly proportional) */
    try {
      const coverImg = await loadImg('/img-prin-couleur.png');
      ctx.save();
      ctx.beginPath();
      ctx.roundRect(25, 25, 195, H - 50, 16);
      ctx.clip();
      drawCoverImage(ctx, coverImg, 25, 25, 195, H - 50);
      ctx.restore();

      ctx.strokeStyle = '#FCE100';
      ctx.lineWidth   = 3;
      ctx.beginPath(); ctx.roundRect(25, 25, 195, H - 50, 16); ctx.stroke();
    } catch { /* optional */ }

    /* Text Content Left Offset */
    const contentX = 245;

    /* Top Subtitle Pill */
    ctx.textAlign = 'left';
    ctx.fillStyle = '#FCE100';
    ctx.font      = 'bold 15px sans-serif';
    ctx.fillText('✨ INVITATION OFFICIELLE — 2ᵉ ÉDITION ✨', contentX, 60);

    /* Big Title */
    ctx.fillStyle = '#FFFFFF';
    ctx.font      = 'black 34px sans-serif';
    ctx.fillText('BRUNCH LIGHT OF THE WORLD', contentX, 105);

    /* Subtheme */
    ctx.fillStyle = '#FCE100';
    ctx.font      = 'bold 22px sans-serif';
    ctx.fillText('LA GUÉRISON DES VICTIMES DE VIOLS', contentX, 138);

    /* Participant Name Box */
    ctx.fillStyle   = 'rgba(255, 255, 255, 0.12)';
    ctx.strokeStyle = 'rgba(252, 225, 0, 0.4)';
    ctx.lineWidth   = 1.5;
    ctx.beginPath(); ctx.roundRect(contentX, 162, 565, 105, 16); ctx.fill(); ctx.stroke();

    ctx.fillStyle = '#E9D5FF';
    ctx.font      = 'bold 13px sans-serif';
    ctx.fillText('TITULAIRE DU BILLET :', contentX + 22, 192);

    /* Participant Name in BIG UPPERCASE ONLY */
    ctx.fillStyle = '#FFFFFF';
    ctx.font      = 'black 32px sans-serif';
    ctx.fillText(`${t.firstname.toUpperCase()} ${t.name.toUpperCase()}`, contentX + 22, 235);

    /* Dress Code Strip */
    ctx.fillStyle = '#FCE100';
    ctx.beginPath(); ctx.roundRect(contentX, 295, 565, 46, 12); ctx.fill();
    ctx.fillStyle = '#111111';
    ctx.font      = 'bold 15px sans-serif';
    ctx.fillText('👗 DRESS CODE :  FEMME 💜 VIOLET   |   GARÇON 💛 JAUNE', contentX + 20, 324);

    /* Bottom Partner Logos (object-fit: contain, perfectly proportional) */
    try {
      const logo1 = await loadImg('/logo-removebg.png');
      drawContainImage(ctx, logo1, contentX, 365, 75, 75);

      const logo2 = await loadImg('/patenaire-light.png');
      drawContainImage(ctx, logo2, contentX + 90, 365, 130, 75);
    } catch { /* optional */ }

    ctx.fillStyle = '#9CA3AF';
    ctx.font      = '12px sans-serif';
    ctx.fillText('Organisé par la Famille Light of the World © 2026', contentX + 240, 410);

    /* ── RIGHT STUB SECTION (840 -> 1200) ── */
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(stubX, 0, W - stubX, H);

    /* Right Stub Top Banner */
    ctx.fillStyle = '#6A00C8';
    ctx.fillRect(stubX, 0, W - stubX, 70);

    ctx.fillStyle = '#FFFFFF';
    ctx.textAlign = 'center';
    ctx.font      = 'black 20px sans-serif';
    ctx.fillText('TALON ACCÈS VIP', stubX + 180, 38);

    ctx.fillStyle = '#FCE100';
    ctx.font      = 'bold 12px sans-serif';
    ctx.fillText('RESTAURATION & ÉCOUTE', stubX + 180, 58);

    /* QR Code */
    const qrImg  = await loadImg(qrUrl);
    const qrSize = 180;
    const qrX    = stubX + (360 - qrSize) / 2;
    const qrY    = 90;

    ctx.strokeStyle = '#6A00C8';
    ctx.lineWidth   = 2;
    ctx.strokeRect(qrX - 5, qrY - 5, qrSize + 10, qrSize + 10);
    ctx.drawImage(qrImg, qrX, qrY, qrSize, qrSize);

    /* Ticket ID */
    ctx.fillStyle = '#31005C';
    ctx.font      = 'black 18px sans-serif';
    ctx.fillText(t.ticketId, stubX + 180, 305);

    /* Date & Location Pill */
    ctx.fillStyle = '#F3E8FF';
    ctx.beginPath(); ctx.roundRect(stubX + 25, 325, 310, 75, 12); ctx.fill();

    ctx.fillStyle = '#6A00C8';
    ctx.font      = 'bold 15px sans-serif';
    ctx.fillText('📅 14 AOÛT 2026 · 08H30', stubX + 180, 352);

    ctx.fillStyle = '#111111';
    ctx.font      = 'bold 13px sans-serif';
    ctx.fillText('📍 HETEC DOKUI, ABIDJAN', stubX + 180, 378);

    /* Status Tag */
    ctx.fillStyle = t.status === 'VOLUNTEER' ? '#059669' : '#6A00C8';
    ctx.beginPath(); ctx.roundRect(stubX + 40, 420, 280, 36, 18); ctx.fill();
    ctx.fillStyle = '#FFFFFF';
    ctx.font      = 'bold 13px sans-serif';
    ctx.fillText(t.status === 'VOLUNTEER' ? '🤝 ÉQUIPE BÉNÉVOLE' : '✅ TOTALEMENT GRATUIT', stubX + 180, 443);

    /* ── SEPARATION DASHED LINE & COUPON CUTOUT NOTCHES ── */
    ctx.strokeStyle = '#D1D5DB';
    ctx.lineWidth   = 2.5;
    ctx.setLineDash([8, 8]);
    ctx.beginPath();
    ctx.moveTo(stubX, 0); ctx.lineTo(stubX, H);
    ctx.stroke();
    ctx.setLineDash([]); // Reset line dash

    /* Notch cutouts */
    ctx.fillStyle = '#111111';
    ctx.beginPath(); ctx.arc(stubX, 0, 22, 0, Math.PI * 2); ctx.fill();
    ctx.beginPath(); ctx.arc(stubX, H, 22, 0, Math.PI * 2); ctx.fill();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (!formData.name.trim() || !formData.firstname.trim() || !formData.email.trim()) {
      setErrorMsg('Veuillez renseigner votre Nom, Prénom et Adresse Email.');
      return;
    }

    setLoading(true);

    try {
      const ticketId = `LTW-2026-${Math.random().toString(36).substring(2, 7).toUpperCase()}`;
      const qrData   = `LTW-2026|${ticketId}|${formData.name.toUpperCase()}|${formData.firstname}|${formData.email}`;

      const qrUrl = await QRCode.toDataURL(qrData, {
        width: 300, margin: 1,
        color: { dark: '#31005C', light: '#FFFFFF' },
      });

      setQrCodeUrl(qrUrl);

      const newTicket: TicketRegistration = {
        ticketId,
        name:       formData.name,
        firstname:  formData.firstname,
        email:      formData.email,
        phone:      formData.phone || '+225 0000000000',
        address:    formData.address || 'Abidjan',
        eventTitle: 'Brunch Light of the World - 2e Edition',
        theme:      'LA GUERISON DES VICTIMES DE VIOLS',
        eventDate:  '14/08/2026',
        eventTime:  '08:30 GMT',
        location:   'HETEC Dokui, Abidjan',
        qrData,
        registeredAt: new Date().toISOString(),
        status:     formData.isVolunteer ? 'VOLUNTEER' : 'REGISTERED',
        isVolunteer: formData.isVolunteer,
        deleted_at: null,
      };

      setTicket(newTicket);
      await sendToMakeWebhook(newTicket);

      setTimeout(() => void renderTicket(newTicket, qrUrl), 100);
    } catch (err) {
      console.error(err);
      setErrorMsg('Une erreur est survenue. Veuillez réessayer.');
    } finally {
      setLoading(false);
    }
  };

  const downloadTicket = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const link = document.createElement('a');
    link.download = `Ticket_LTW_${ticket?.firstname || 'Brunch'}_2026.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
  };

  const siteUrl = typeof window !== 'undefined' ? window.location.href : 'https://brunch-ltw.ci';

  return (
    <section id="ticket" className="py-20 bg-white relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Title */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-violet/10 border border-violet/20 text-violet font-semibold text-xs tracking-wider uppercase">
            <Ticket className="w-4 h-4 text-violet" />
            <span>🎟️ Billetterie Digitale — 100% GRATUIT</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-dark tracking-tight">
            Générez votre <span className="text-gradient-violet">Ticket Gratuit</span>
          </h2>
          <p className="text-dark/70 text-base font-normal">
            L&apos;entrée au Brunch est <strong className="text-violet font-extrabold">TOTALEMENT GRATUITE</strong>. Remplissez le formulaire pour obtenir instantanément votre pass VIP avec QR Code.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

          {/* Form (6 cols) */}
          <div className="lg:col-span-6 glass-panel p-6 sm:p-8 rounded-3xl border border-violet/15 shadow-xl">
            <h3 className="text-xl font-bold text-dark mb-6 flex items-center gap-2">
              <User className="w-5 h-5 text-violet" />
              Vos Coordonnées d&apos;Inscription
            </h3>

            {errorMsg && (
              <div className="mb-4 p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm flex items-center gap-2">
                <AlertCircle className="w-5 h-5 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {[
                { name: 'name',      label: 'Nom *',            type: 'text',  placeholder: 'Ex: KOUASSI' },
                { name: 'firstname', label: 'Prénom *',         type: 'text',  placeholder: 'Ex: Marie-Esther' },
                { name: 'email',     label: 'Adresse Email *',  type: 'email', placeholder: 'Ex: marie@gmail.com' },
              ].map((field) => (
                <div key={field.name}>
                  <label className="block text-xs font-bold text-dark/80 uppercase mb-1">
                    {field.label}
                  </label>
                  <input
                    type={field.type}
                    name={field.name}
                    value={formData[field.name as 'name' | 'firstname' | 'email']}
                    onChange={handleInputChange}
                    placeholder={field.placeholder}
                    required={field.label.includes('*')}
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-violet focus:ring-2 focus:ring-violet/20 outline-none text-sm transition-all"
                  />
                </div>
              ))}

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-dark/80 uppercase mb-1">Téléphone</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="+225 0707070707"
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-violet focus:ring-2 focus:ring-violet/20 outline-none text-sm transition-all"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-dark/80 uppercase mb-1">Quartier</label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    placeholder="Ex: Cocody Angré"
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-violet focus:ring-2 focus:ring-violet/20 outline-none text-sm transition-all"
                  />
                </div>
              </div>

              {/* ── Volunteer Checkbox ── */}
              <div className="p-4 rounded-2xl border-2 border-violet/20 bg-violet/5 flex items-start gap-3 cursor-pointer group hover:border-violet/40 transition-all">
                <input
                  type="checkbox"
                  id="isVolunteer"
                  name="isVolunteer"
                  checked={formData.isVolunteer}
                  onChange={handleInputChange}
                  className="mt-0.5 w-5 h-5 accent-violet rounded cursor-pointer shrink-0"
                />
                <label htmlFor="isVolunteer" className="flex flex-col gap-0.5 cursor-pointer">
                  <span className="text-sm font-bold text-dark group-hover:text-violet transition-colors">
                    🙋🏽 Voulez-vous servir à ce Brunch en tant que bénévole ?
                  </span>
                  <span className="text-[11px] text-gray-500 leading-relaxed">
                    En cochant cette case, vous signalez votre disponibilité à rejoindre l&apos;équipe de service (accueil, communication, logistique…). L&apos;équipe d&apos;organisation vous contactera.
                  </span>
                </label>
              </div>

              {/* Consent notice */}
              <p className="text-[11px] text-gray-500 leading-relaxed">
                🔐 Vos données sont transmises de manière sécurisée exclusivement à l&apos;organisation de l&apos;événement (Loi N°2013-450, Côte d&apos;Ivoire).
              </p>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 rounded-2xl bg-gradient-to-r from-violet to-violet-dark text-white font-extrabold text-base shadow-xl hover:shadow-violet/40 transition-all hover:scale-[1.02] flex items-center justify-center gap-2 mt-2 cursor-pointer disabled:opacity-60"
              >
                {loading ? (
                  <span className="animate-spin rounded-full h-5 w-5 border-b-2 border-white" />
                ) : (
                  <>
                    <Sparkles className="w-5 h-5 text-yellow-accent" />
                    Générer mon Ticket Gratuit & Envoyer
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Canvas Preview (6 cols) */}
          <div className="lg:col-span-6 flex flex-col items-center justify-center w-full">
            <div className="bg-gray-900 p-4 sm:p-5 rounded-3xl shadow-2xl border-4 border-gray-800 w-full text-center">
              <div className="overflow-hidden rounded-2xl border border-white/20 shadow-lg bg-gray-950 flex justify-center">
                <canvas
                  ref={canvasRef}
                  width={1200}
                  height={500}
                  className="max-w-full h-auto rounded-2xl block"
                />
              </div>

              {ticket && (
                <div className="mt-6 space-y-3">
                  <button
                    onClick={downloadTicket}
                    className="w-full py-3.5 rounded-xl bg-yellow-accent text-dark font-black text-sm shadow-md hover:opacity-90 transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Download className="w-5 h-5" />
                    Télécharger mon Ticket PNG
                  </button>

                  <a
                    href={`https://api.whatsapp.com/send?text=${encodeURIComponent(
                      `Je viens de réserver mon ticket pour le Brunch Light of the World (2ᵉ Édition) — « LA GUÉRISON DES VICTIMES DE VIOLS » ! Rejoins-nous le 14/08/2026 à HETEC Dokui : ${siteUrl}`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2"
                  >
                    <Share2 className="w-5 h-5" />
                    Inviter un(e) Ami(e) sur WhatsApp
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
