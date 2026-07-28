'use client';

import React, { useState } from 'react';
import { ProgramItem } from '@/lib/types';
import { Clock, User, Sparkles, ChevronDown, ChevronUp, Heart, Shield, Award } from 'lucide-react';

const PROGRAM_ITEMS: ProgramItem[] = [
  {
    id: 'prog-1',
    time: '08:30 - 09:15',
    title: 'Accueil Chaleureux, Validation des Tickets & Installation',
    description: 'Accueil personnalisé par l\'équipe Service d\'Accueil. Distribution des badges officiels. Installation selon le Dress Code (Violet 💜 pour les femmes, Jaune 💛 pour les hommes).',
    category: 'Ouverture',
    speaker: 'Équipe Service d\'Accueil & Organisation',
    speakerRole: 'Light of the World',
  },
  {
    id: 'prog-2',
    time: '09:15 - 10:00',
    title: 'Mot de Bienvenue & Cérémonie d\'Ouverture Officielle',
    description: 'Allocution d\'ouverture de la famille Light of the World, prière d\'action de grâce et introduction du thème de la 2ᵉ édition.',
    category: 'Ouverture',
    speaker: 'Comité de Direction',
    speakerRole: 'Famille Light of the World',
    isKeynote: true,
  },
  {
    id: 'prog-3',
    time: '10:00 - 11:30',
    title: 'Panel Central : << LA GUÉRISON DES VICTIMES DE VIOLS >>',
    description: 'Moment fort d\'écoute, de témoignages poignants, de conseils psychologiques et spirituels pour surmonter le traumatisme, retrouver sa dignité et marcher dans la guérison.',
    category: 'Écoute & Partage',
    speaker: 'Intervenants Spécialisés & Témoins',
    speakerRole: 'Experts en Restauration & Psychologie',
    isKeynote: true,
  },
  {
    id: 'prog-4',
    time: '11:30 - 12:30',
    title: 'Session de Restauration, Prières & Temps d\'Espérance',
    description: 'Temps d\'accompagnement individuel, prières d\'intercession et libération dans un cadre sécurisé, confidentiel et bienveillant.',
    category: 'Restauration',
    speaker: 'Équipe de Serviteurs & Conseillers',
    speakerRole: 'Ministère d\'Écoute',
  },
  {
    id: 'prog-5',
    time: '12:30 - 14:00',
    title: 'Brunch VIP Fraternel & Échanges Communautaires',
    description: 'Partage du grand repas de célébration dans la joie et la communion. Moments de réseautage, d\'amitié et de partages fraternels.',
    category: 'Restauration',
    speaker: 'Tous les Participants',
    speakerRole: 'Famille LTW',
  },
  {
    id: 'prog-6',
    time: '14:00 - 14:30',
    title: 'Clôture, Photos Souvenirs & Intégration WhatsApp',
    description: 'Séance photo officielle avec les badges et affiches personnalisées. Mot de clôture et invitation permanente dans le groupe communautaire WhatsApp.',
    category: 'Clôture',
    speaker: 'Comité d\'Organisation',
    speakerRole: 'LTW 2026',
  },
];

export const ProgramSection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('Tous');
  const [expandedId, setExpandedId] = useState<string | null>('prog-3');

  const categories = ['Tous', 'Ouverture', 'Écoute & Partage', 'Restauration', 'Clôture'];

  const filteredItems = activeCategory === 'Tous'
    ? PROGRAM_ITEMS
    : PROGRAM_ITEMS.filter((item) => item.category === activeCategory);

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <section id="programme" className="py-20 bg-gradient-to-b from-white via-purple-50/30 to-white relative">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header (Inspired by Aspex Africa) */}
        <div className="text-center space-y-4 mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-violet/10 border border-violet/20 text-violet font-semibold text-xs tracking-wider uppercase">
            <Sparkles className="w-4 h-4" />
            <span>Déroulement de la Journée</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-dark tracking-tight">
            Programme du <span className="text-gradient-violet">Brunch du 14 Août 2026</span>
          </h2>

          <p className="text-dark/70 text-base max-w-2xl mx-auto font-normal">
            Découvrez le déroulé chronologique de cette journée spéciale à HETEC Dokui, conçue pour vous apporter soutien, restauration et espérance.
          </p>

          {/* Theme Banner Display */}
          <div className="flex justify-center pt-2 pb-2">
            <div className="relative group max-w-lg">
              <div className="absolute -inset-1 bg-gradient-to-r from-violet to-yellow-accent rounded-2xl blur opacity-30 group-hover:opacity-60 transition duration-500" />
              <img
                src="/THEME.png"
                alt="Thème Officiel : La Guérison des Victimes de Viols"
                className="relative max-h-28 sm:max-h-32 object-contain rounded-xl shadow-md border border-violet/20 bg-white p-2.5"
              />
            </div>
          </div>

          {/* Category Filter Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-4">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2.5 rounded-full text-xs font-bold transition-all shadow-sm ${
                  activeCategory === cat
                    ? 'bg-violet text-white shadow-violet/30 scale-105'
                    : 'bg-white text-dark/70 hover:bg-violet/10 hover:text-violet border border-gray-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Timeline Items */}
        <div className="space-y-4">
          {filteredItems.map((item) => {
            const isExpanded = expandedId === item.id;
            return (
              <div
                key={item.id}
                className={`glass-panel rounded-2xl transition-all duration-300 border ${
                  item.isKeynote
                    ? 'border-violet/40 bg-gradient-to-r from-purple-50/80 to-white shadow-md'
                    : 'border-violet/10 hover:border-violet/30'
                }`}
              >
                {/* Item Header Button */}
                <button
                  onClick={() => toggleExpand(item.id)}
                  className="w-full p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between text-left gap-4 cursor-pointer"
                >
                  <div className="flex items-start sm:items-center gap-4">
                    {/* Time Badge */}
                    <div className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-violet/15 text-violet-dark font-extrabold text-xs sm:text-sm shrink-0 border border-violet/20">
                      <Clock className="w-4 h-4 text-violet" />
                      <span>{item.time}</span>
                    </div>

                    <div>
                      {item.isKeynote && (
                        <span className="inline-block text-[10px] font-extrabold tracking-wider uppercase px-2 py-0.5 rounded bg-yellow-accent text-dark mb-1">
                          ★ Moment Clé
                        </span>
                      )}
                      <h3 className="text-lg sm:text-xl font-bold text-dark group-hover:text-violet transition-colors">
                        {item.title}
                      </h3>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 shrink-0 self-end sm:self-center">
                    <span className="text-xs font-semibold text-gray-500 bg-gray-100 px-3 py-1 rounded-full border border-gray-200">
                      {item.category}
                    </span>
                    <div className="w-8 h-8 rounded-full bg-violet/10 flex items-center justify-center text-violet">
                      {isExpanded ? (
                        <ChevronUp className="w-5 h-5" />
                      ) : (
                        <ChevronDown className="w-5 h-5" />
                      )}
                    </div>
                  </div>
                </button>

                {/* Expanded Details Body */}
                {isExpanded && (
                  <div className="px-5 sm:px-6 pb-6 pt-2 border-t border-violet/10 text-dark/80 text-sm leading-relaxed space-y-4">
                    <p className="font-normal">{item.description}</p>

                    {item.speaker && (
                      <div className="flex items-center gap-3 pt-2 bg-violet/5 p-3 rounded-xl border border-violet/10">
                        <div className="w-9 h-9 rounded-full bg-violet text-white flex items-center justify-center font-bold text-xs">
                          <User className="w-4 h-4" />
                        </div>
                        <div>
                          <span className="block text-xs font-bold text-dark">
                            {item.speaker}
                          </span>
                          <span className="text-[11px] text-violet font-semibold">
                            {item.speakerRole}
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
