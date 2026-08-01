'use client';

import React, { useState } from 'react';
import { Heart, Copy, CheckCircle2 } from 'lucide-react';

export const DonationSection: React.FC = () => {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const donationMethods = [
    {
      name: 'Orange Money',
      number: '+225 07 03 86 59 53',
      color: 'text-orange-500',
      bg: 'bg-orange-50',
      border: 'border-orange-200'
    },
    {
      name: 'MTN Mobile Money',
      number: '+225 05 85 76 19 49',
      color: 'text-yellow-600',
      bg: 'bg-yellow-50',
      border: 'border-yellow-200'
    },
    {
      name: 'Moov Money',
      number: '+225 01 70 99 52 00',
      color: 'text-blue-600',
      bg: 'bg-blue-50',
      border: 'border-blue-200'
    },
    {
      name: 'Wave',
      number: '+225 05 85 76 19 49',
      color: 'text-cyan-600',
      bg: 'bg-cyan-50',
      border: 'border-cyan-200'
    }
  ];

  const handleCopy = async (number: string, index: number) => {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(number);
      } else {
        // Fallback pour les environnements non sécurisés (HTTP local)
        const textArea = document.createElement("textarea");
        textArea.value = number;
        textArea.style.position = "absolute";
        textArea.style.opacity = "0";
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        document.execCommand('copy');
        textArea.remove();
      }
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 2000);
    } catch (err) {
      console.error('Erreur lors de la copie:', err);
    }
  };

  return (
    <section className="py-16 bg-white relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-50 border border-rose-200 text-rose-600 font-semibold text-xs tracking-wider uppercase mb-4">
            <Heart className="w-4 h-4" />
            <span>Soutenir l'événement</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-dark tracking-tight mb-4">
            Faites un Don pour soutenir la vision
          </h2>
          <p className="text-dark/70 text-base font-normal max-w-2xl mx-auto">
            Votre soutien financier nous aide à organiser ce brunch 100% gratuit et à impacter la vie de nombreuses personnes. Vous pouvez faire votre transfert directement sur l'un de ces numéros.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {donationMethods.map((method, idx) => (
            <div key={method.name} className={`p-6 rounded-3xl border ${method.border} ${method.bg} flex flex-col items-center text-center transition-all hover:scale-[1.02] hover:shadow-lg`}>
              <h3 className={`text-lg font-black ${method.color} mb-2`}>{method.name}</h3>
              <div className="text-2xl font-bold text-dark mb-4 tabular-nums tracking-wide">
                {method.number}
              </div>
              <button
                onClick={() => handleCopy(method.number, idx)}
                className="w-full py-3 rounded-xl bg-white border border-gray-200 text-dark font-semibold text-sm shadow-sm hover:bg-gray-50 transition-all flex items-center justify-center gap-2"
              >
                {copiedIndex === idx ? (
                  <>
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                    <span className="text-emerald-600">Numéro Copié !</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 text-gray-500" />
                    Copier le numéro
                  </>
                )}
              </button>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
