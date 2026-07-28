# 🏛️ ARCHITECTE.md — Blueprint d'Architecture Système & Agents

## 📐 1. Diagramme d'Architecture Globale (Mermaid)

```mermaid
flowchart TD
    subgraph Client [Navigateur Participant - Next.js 15 / React 19]
        UI[Landing Page VIP]
        Form[Formulaire d'Inscription]
        CanvasTicket[Générateur Ticket Mobile Canvas]
        CanvasPoster[Studio Affiche & Badges Canvas]
    end

    subgraph Automation [Make.com Webhook BaaS]
        Webhook[Make Webhook Endpoint]
        Sheets[(Google Sheets / Excel DB)]
        EmailSvc[Service d'Envoi d'Email]
    end

    Form -->|1. Submit Payload| Webhook
    Webhook -->|2. Append Row| Sheets
    Webhook -->|3. Dispatch Email| EmailSvc
    
    Form -->|4. Trigger Canvas| CanvasTicket
    CanvasTicket -->|5. Export PNG/PDF| Client
    
    CanvasPoster -->|6. Export Poster HD| Client
```

---

## 🤖 2. Architecture Multi-Agents (Chefskrsidoine7)

- **Agent Orchestrateur** : `Chefskrsidoine7` (Gestion de projet, supervision, mémoire et radiographie d'impact).
- **Sous-Agents Spécialisés** :
  - `ui-ux-designer` : Conception visuelle VIP & tokens de couleur.
  - `codebase-pattern-finder` : Respect des motifs TypeScript strict & OWASP.
  - `mermaid-diagram-specialist` : Génération des diagrammes d'architecture.
  - `communication-excellence-coach` : Écriture des textes engageants et bienveillants.
  - `general-purpose` & `ascii-ui-mockup-generator` : Tâches complémentaires.
