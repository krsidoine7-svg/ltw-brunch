# 🎨 DESIGN_SYSTEM.md — Charte UX/UI & Design System (La Bible UX/UI)

## 🎨 1. Palette de Couleurs & Tokens

```css
:root {
  /* Couleurs Fondamentales */
  --bg-primary: #FFFFFF;
  --bg-secondary: #F8F9FA;
  --bg-dark: #111111;

  /* Couleurs de la Marque & Dress Code */
  --color-violet-primary: #6A00C8;   /* Femme 💜 / Dignité */
  --color-violet-dark: #31005C;      /* Gradient profond */
  --color-yellow-accent: #FCE100;    /* Garçon 💛 / Lumière */
  
  /* Textes & Neutres */
  --text-main: #111111;
  --text-muted: #666666;
  --text-light: #FFFFFF;

  /* Ombrages & Rayons */
  --radius-sm: 8px;
  --radius-md: 16px;
  --radius-lg: 24px;
  --shadow-premium: 0 20px 40px rgba(106, 0, 200, 0.08);
}
```

---

## 🔤 2. Typographies & Hiérarchie

- **Police Principale** : Inter / Outfit (Google Fonts)
- **Titre Majeur (H1)** : 2.5rem (Mobile) / 4.2rem (Desktop), Bold (700/800), gradient text `#6A00C8` vers `#31005C`.
- **Titre Section (H2)** : 1.8rem (Mobile) / 2.8rem (Desktop), SemiBold (600).
- **Corps de texte (Body)** : 1rem (16px), Line-height 1.6, `#111111`.

---

## ✨ 3. Animations & Micro-Interactions VIP

1. **Infinite Slow Scroll Carousel** :
   - Défilement continu horizontal très lent (25s - 35s par boucle) de la gauche vers la droite.
   - Survol (Hover) : Effet 3D perspective `scale(1.05)` avec une rotation subtile de `-2deg` à `2deg`.
2. **Scroll-Driven Parallax** :
   - Déplacement fluide des formes d'arrière-plan ("Courbes 2.png", masques) au défilement vertical.
3. **Cartes du Programme (Style Aspex Africa)** :
   - Accordéons interactifs avec révélations douces, bordures réactives Violet/Jaune et badges horaires dorés.
