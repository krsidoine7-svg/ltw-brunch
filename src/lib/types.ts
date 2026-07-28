export interface TicketRegistration {
  ticketId: string;
  name: string;
  firstname: string;
  email: string;
  phone: string;
  address: string;
  eventTitle: string;
  theme: string;
  eventDate: string;
  eventTime: string;
  location: string;
  qrData: string;
  registeredAt: string;
  status: 'REGISTERED' | 'VOLUNTEER' | 'CHECKED_IN' | 'CANCELLED';
  isVolunteer?: boolean;
  deleted_at: string | null;
}

export type BadgeCategory =
  | 'Invité(e)'
  | 'Serviteur'
  | 'Organisation'
  | 'Média'
  | 'Communication'
  | 'Influenceur'
  | 'Créateur'
  | 'Service d\'Accueil';

export interface ProgramItem {
  id: string;
  time: string;
  title: string;
  description: string;
  speaker?: string;
  speakerRole?: string;
  category: 'Ouverture' | 'Écoute & Partage' | 'Restauration' | 'Clôture';
  isKeynote?: boolean;
}

export interface EventPosterTemplate {
  id: string;
  title: string;
  badge: BadgeCategory;
  frameColor: string;
}
