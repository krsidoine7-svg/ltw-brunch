'use client';

import React, { useState } from 'react';
import { ProgramItem } from '@/lib/types';
import { Clock, User, Sparkles, ChevronDown, ChevronUp, Heart, Shield, Award } from 'lucide-react';

const PROGRAM_ITEMS: ProgramItem[] = [
  {
    id: 'prog-1',
    time: '09:00 - 10:00',
    title: 'Début du brunch (Installation)',
    description: "Arrivée, validation des tickets et installation des invités pour bien commencer la journée.",
    category: 'Accueil',
    speaker: "Équipe d'Accueil",
    speakerRole: 'Light of the World',
  },
  {
    id: 'prog-2',
    time: '10:00 - 10:45',
    title: 'Direction (Prière)',
    description: "Temps de prière d'ouverture pour confier ce moment spirituel entre les mains du Seigneur.",
    category: 'Prière & Adoration',
    speaker: 'Comité de Direction',
    speakerRole: 'Famille LTW',
    isKeynote: true,
  },
  {
    id: 'prog-3',
    time: '10:45 - 11:15',
    title: 'Adoration et louanges',
    description: "Célébration à travers des chants d'adoration et de louanges intenses.",
    category: 'Prière & Adoration',
    speaker: 'Chantres LTW',
    speakerRole: 'Louange',
  },
  {
    id: 'prog-4',
    time: '11:15 - 12:10',
    title: 'À cœur ouvert',
    description: "Un temps de partage sincère, d'écoute et de témoignages autour du thème de la guérison.",
    category: 'Partage & Enseignement',
    speaker: 'Intervenants & Témoins',
    speakerRole: 'Panel d\'Écoute',
    isKeynote: true,
  },
  {
    id: 'prog-5',
    time: '12:10 - 13:00',
    title: 'Enseignement',
    description: "L'enseignement principal de la journée axé sur la restauration des blessures spirituelles et émotionnelles.",
    category: 'Partage & Enseignement',
    speaker: 'Orateur Principal',
    speakerRole: 'Ministère',
    isKeynote: true,
  },
  {
    id: 'prog-6',
    time: '13:00 - 13:40',
    title: 'La nourriture',
    description: "Partage du grand repas de célébration dans la joie et la convivialité fraternelle.",
    category: 'Repas & Activités',
    speaker: 'Tous les Participants',
    speakerRole: 'Famille LTW',
  },
  {
    id: 'prog-7',
    time: '13:40 - 14:40',
    title: 'Jeu activité',
    description: "Activités ludiques et jeux interactifs pour renforcer les liens communautaires.",
    category: 'Repas & Activités',
    speaker: 'Équipe d\'Animation',
    speakerRole: 'Divertissement',
  },
  {
    id: 'prog-8',
    time: '14:40 - 14:45',
    title: 'Explication de la vision de LOW',
    description: "Présentation courte de la mission, des valeurs et des objectifs futurs de Light of the World.",
    category: 'Clôture',
    speaker: 'Comité d\'Organisation',
    speakerRole: 'Vision',
  },
  {
    id: 'prog-9',
    time: '14:45 - Fin',
    title: 'Adoration acte 2',
    description: "Moment final d'adoration pour sceller les bénédictions et clôturer l'événement dans la grâce.",
    category: 'Clôture',
    speaker: 'Chantres LTW',
    speakerRole: 'Louange',
  },
];

export const ProgramSection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('Tous');
  const [expandedId, setExpandedId] = useState<string | null>('prog-5');

  const categories = ['Tous', 'Accueil', 'Prière & Adoration', 'Partage & Enseignement', 'Repas & Activités', 'Clôture'];

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
