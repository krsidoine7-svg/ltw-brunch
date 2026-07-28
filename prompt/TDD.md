# ⚙️ TDD.md — Technical Design Document (La Bible Technique)

## 🏗️ 1. Architecture Système & Stack Technique

**Stack JavaScript Moderne & Scalable** :
- **Framework Web** : Next.js 15 (App Router) + React 19
- **Langage** : TypeScript 5.x avec typage strict (`noImplicitAny: true`, aucun type `any`)
- **Styling** : Tailwind CSS v3/v4 + Vanilla CSS Custom Tokens
- **Icons & UI** : Lucide React icons, primitives composables Shadcn-inspired
- **Animations** : Framer Motion / CSS Scroll-Driven Keyframes
- **Génération Graphique & Canvas** : API Canvas HTML5 natif, `qrcode`, `html2canvas`, `jspdf`
- **Intégration Automation & BaaS** : Webhook Make.com (`https://hook.eu2.make.com/u3bh8d1dirnkj93ciix96co74k24nb4k`)

---

## 📡 2. Contrat de l'API & Payload Webhook Make.com

Lorsqu'un utilisateur génère son ticket sur la landing page, l'application effectue un appel `POST` asynchrone vers le Webhook Make avec le payload JSON suivant :

```json
{
  "ticketId": "LTW-2026-8F9A2",
  "name": "Kouassi",
  "firstname": "Ahou Marie",
  "email": "marie.kouassi@example.com",
  "phone": "+225 0707070707",
  "address": "Abidjan, Cocody",
  "event": "Brunch Light of the World - 2e Edition",
  "theme": "LA GUERISON DES VICTIMES DE VIOLS",
  "date": "14/08/2026",
  "time": "08:30 GMT",
  "location": "HETEC Dokui",
  "qrData": "LTW-2026-8F9A2|Kouassi|Ahou Marie|marie.kouassi@example.com",
  "registeredAt": "2026-07-28T12:48:00Z",
  "status": "ACTIVE",
  "deleted_at": null
}
```

---

## 🔒 3. Normes de Sécurité & Conformité OWASP

1. **Validation stricte des entrées (Sanitization)** :
   - Assainissement des chaînes de caractères (anti-XSS) via `DOMPurify` ou filtres d'échappement HTML.
   - Validation du format d'email RFC 5322.
   - Nettoyage des numéros de téléphone (Format Côte d'Ivoire `+225 ...`).
2. **CORS & Masquage API Proxy** :
   - Option d'API Route proxy Next.js (`/api/register`) pour relayer le formulaire sans exposer publiquement le Webhook direct si nécessaire.
3. **Protection contre le Spam / Rate Limiting** :
   - Limitation locale des soumissions de formulaire (Throttling / Debounce de 3 secondes).
