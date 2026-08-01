'use client';

import React, { useState, useRef } from 'react';
import QRCode from 'qrcode';
import { sendToMakeWebhook } from '@/lib/makeWebhook';
import { TicketRegistration } from '@/lib/types';
import { Ticket, Download, Share2, Sparkles, User, AlertCircle } from 'lucide-react';

// Removed getCroppedTemplate as requested

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
  const [photoUrl, setPhotoUrl]   = useState<string | null>(null);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let { name, value, type, checked } = e.target;
    
    // Empêcher la saisie d'espaces dans le prénom
    if (name === 'firstname') {
      value = value.replace(/\s/g, '');
    }

    const updated = { ...formData, [name]: type === 'checkbox' ? checked : value };
    setFormData(updated);

    if (name === 'name' || name === 'firstname') {
      const fullName = `${updated.firstname} ${updated.name}`.trim();
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new CustomEvent('ltw-name-sync', { detail: fullName }));
      }
    }
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const url = URL.createObjectURL(file);
      setPhotoUrl(url);
      
      // Synchronisation vers l'affiche officielle
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new CustomEvent('ltw-photo-sync', { detail: url }));
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
    img: HTMLImageElement | HTMLCanvasElement,
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
    img: HTMLImageElement | HTMLCanvasElement,
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

  /* ── Canvas Ticket Renderer (Using the uploaded design template) ── */
  const renderTicket = async (t: TicketRegistration, qrUrl: string, userPhotoUrl?: string) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Fix internal resolution for high quality
    const W = 1500;
    const H = 1000;
    canvas.width = W;
    canvas.height = H;

    // Fill background with white
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(0, 0, W, H);

    try {
      const templateImg = await loadImg('/design ticket.png');
      // Using ctx.drawImage ensures the entire template fits the canvas without any cropping
      ctx.drawImage(templateImg, 0, 0, W, H);

      // 1. Draw user photo over the left white blob
      if (userPhotoUrl) {
        const photo = await loadImg(userPhotoUrl);
        const mask = await loadImg('/mask.png');
        ctx.save();
        
        // Coordonnées ajustées pour décaler vers la gauche
        const photoX = -10;
        const photoY = 50;
        const photoW = 380;
        const photoH = 840;
        
        // Création d'un canvas offscreen pour appliquer le masque
        const off = document.createElement('canvas');
        off.width = photoW;
        off.height = photoH;
        const offCtx = off.getContext('2d');
        
        if (offCtx) {
          // Dessine la photo
          drawCoverImage(offCtx, photo, 0, 0, photoW, photoH);
          
          // Applique le masque en utilisant l'alpha de mask.png
          offCtx.globalCompositeOperation = 'destination-in';
          offCtx.drawImage(mask, 0, 0, photoW, photoH);
          
          // Redessine l'image en multiply pour conserver la bordure jaune de mask.png si elle existe
          // (le blanc de l'image de masque devient transparent sur la photo)
          offCtx.globalCompositeOperation = 'multiply';
          offCtx.drawImage(mask, 0, 0, photoW, photoH);
          
          // Dessine le résultat final sur le canvas principal
          ctx.drawImage(off, photoX, photoY);
        }
        
        ctx.restore();
      }

      // 3. Dessiner le nom du participant (sans fond jaune)
      // On décale nameBoxX vers la gauche et on augmente la taille
      const nameBoxX = 450;
      const nameBoxY = 490;
      const nameBoxW = 450;
      const nameBoxH = 70;

      ctx.fillStyle = '#1D083E';
      ctx.font = '900 60px "Inter", sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(`${t.firstname.toUpperCase()} ${t.name.toUpperCase()}`, nameBoxX + nameBoxW / 2, nameBoxY + 55);

      // 4. Mask the {{LE CODE QR}} placeholder and draw the QR
      const qrBoxX = 1120;
      const qrBoxY = 320;
      const qrBoxW = 320;
      const qrBoxH = 320;
      
      ctx.fillStyle = '#FFFFFF';
      ctx.fillRect(qrBoxX, qrBoxY, qrBoxW, qrBoxH);
      
      const qrImg = await loadImg(qrUrl);
      ctx.drawImage(qrImg, qrBoxX + 10, qrBoxY + 10, qrBoxW - 20, qrBoxH - 20);

      // 5. Optionally override the "Entrée libre" if Volunteer
      if (t.status === 'VOLUNTEER') {
        ctx.fillStyle = '#FCE100'; // Yellow background 
        ctx.fillRect(1050, 750, 400, 100);
        ctx.fillStyle = '#31005C';
        ctx.font = 'bold 35px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('ÉQUIPE BÉNÉVOLE', 1250, 810);
      }

    } catch (err) {
      console.error('Error drawing template:', err);
    }
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

      setTimeout(() => void renderTicket(newTicket, qrUrl, photoUrl || undefined), 100);
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
              <div>
                <label className="block text-xs font-bold text-dark/80 uppercase mb-1">
                  Photo (Optionnelle)
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoChange}
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-violet focus:ring-2 focus:ring-violet/20 outline-none text-sm transition-all bg-white"
                />
              </div>
              {[
                { name: 'name',      label: 'Nom *',            type: 'text',  placeholder: 'Ex: KOUASSI' },
                { name: 'firstname', label: 'Prénom * (entrer un seul prénom)', type: 'text',  placeholder: 'Ex: Marie-Esther', pattern: '^\\S+$', title: 'Veuillez entrer un seul prénom (sans espaces)' },
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
                    pattern={field.pattern}
                    title={field.title}
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
