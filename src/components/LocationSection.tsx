'use client';

import React from 'react';
import { MapPin, Calendar, Clock, Phone, MessageCircle, Navigation, Shield, Heart } from 'lucide-react';

export const LocationSection: React.FC = () => {
  return (
    <section id="accès" className="py-20 bg-white relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-violet/10 border border-violet/20 text-violet font-semibold text-xs tracking-wider uppercase">
            <MapPin className="w-4 h-4 text-violet" />
            <span>Localisation & Accès Pratique</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-dark tracking-tight">
            Lieu du Brunch : <span className="text-gradient-violet">HETEC Dokui</span>
          </h2>

          <p className="text-dark/70 text-base font-normal">
            Retrouvez-nous le 14 Août 2026 dès 08h30 dans l&apos;enceinte de l&apos;université HETEC Dokui à Abidjan pour ce moment de célébration et de restauration.
          </p>
        </div>

        {/* Location Info Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          
          <div className="glass-panel p-6 rounded-3xl border border-violet/15 shadow-lg flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-violet/10 text-violet flex items-center justify-center font-bold">
                <MapPin className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-dark">Adresse exacte</h3>
              <p className="text-sm text-dark/70 leading-relaxed">
                HETEC Dokui, Quartier Abobo Dokui, près de la voie principale, Abidjan, Côte d&apos;Ivoire.
              </p>
            </div>
            <div className="pt-4 border-t border-violet/10 text-xs font-bold text-violet">
              📍 Repère : Dokui Campus
            </div>
          </div>

          <div className="glass-panel p-6 rounded-3xl border border-violet/15 shadow-lg flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-violet/10 text-violet flex items-center justify-center font-bold">
                <Calendar className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-dark">Date & Horaire</h3>
              <p className="text-sm text-dark/70 leading-relaxed">
                Vendredi 14 Août 2026<br />
                Ouverture des portes à <strong className="text-dark">08h30 GMT</strong> precise.
              </p>
            </div>
            <div className="pt-4 border-t border-violet/10 text-xs font-bold text-violet">
              ⏰ Arrivée recommandée à 08h15
            </div>
          </div>

          <div className="glass-panel p-6 rounded-3xl border border-violet/15 shadow-lg flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
                <Phone className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-dark">Infoline & WhatsApp</h3>
              <p className="text-sm text-dark/70 leading-relaxed">
                Pour toute question, assistance de transport ou demande d&apos;information :
              </p>
            </div>
            <div className="pt-4 border-t border-violet/10">
              <a
                href="https://wa.me/2250576341955"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-600 text-white font-extrabold text-xs shadow-md hover:bg-emerald-700 transition-all"
              >
                <MessageCircle className="w-4 h-4" />
                Contact : 05 76 34 19 55
              </a>
            </div>
          </div>

        </div>

        {/* Interactive Map Visual Box */}
        <div className="glass-panel p-8 rounded-3xl border border-violet/15 shadow-xl text-center space-y-6 bg-gradient-to-r from-purple-50/50 to-white">
          <div className="max-w-xl mx-auto space-y-2">
            <span className="text-xs font-extrabold uppercase tracking-widest text-violet">
              Guide de Déplacement
            </span>
            <h3 className="text-2xl font-black text-dark">
              Besoin d&apos;aide pour vous rendre à HETEC Dokui ?
            </h3>
            <p className="text-sm text-dark/70">
              Contactez directement l&apos;équipe d&apos;organisation par WhatsApp pour recevoir la géolocalisation exacte sur votre téléphone.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="https://wa.me/2250576341955?text=Bonjour,%20pouvez-vous%20m'envoyer%20la%20localisation%20Google%20Maps%20de%20HETEC%20Dokui%20pour%20le%20Brunch%20?"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-sm shadow-xl transition-all hover:scale-105 flex items-center gap-2"
            >
              <Navigation className="w-5 h-5" />
              Recevoir le lien Google Maps sur WhatsApp
            </a>
          </div>
        </div>

      </div>
    </section>
  );
};
