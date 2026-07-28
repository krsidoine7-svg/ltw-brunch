# 🗄️ DB_SCHEMA.md — Modèle de Données & TypeScript Interfaces

## 📐 1. Entités de Données TypeScript Stricte

```typescript
export interface TicketParticipant {
  id: string; // Ex: "LTW-2026-8F9A2"
  firstname: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  eventTitle: string;
  theme: string;
  eventDate: string;
  eventTime: string;
  location: string;
  qrData: string;
  createdAt: string;
  status: 'REGISTERED' | 'CHECKED_IN' | 'CANCELLED';
  deleted_at: string | null; // Soft Delete
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

export interface UserPosterConfig {
  photoUrl: string | null;
  badge: BadgeCategory;
  customText?: string;
  generatedAt?: string;
}
```
