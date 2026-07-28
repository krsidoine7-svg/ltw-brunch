# 🛡️ SECURITY.md — Politique de Sécurité & Conformité OWASP

## 🔒 1. Principes de Sécurité Appliqués

1. **Validation & Échappement des Entrées** :
   - Assainissement systématique des entrées de texte (Nom, Prénom, Email, Téléphone) pour neutraliser toute injection XSS (Cross-Site Scripting) ou HTML injection.
2. **Encodage QR Code Sécurisé** :
   - Contenu lisible et structuré sans données sensibles ou confidentielles non chiffrées.
3. **Protection contre le Déni de Service (DoS)** :
   - Debounce local sur le bouton d'inscription pour empêcher le matraquage de soumission.
4. **Intégrité et Auditabilité (Soft Delete)** :
   - Conformité à la règle d'or du projet : aucune suppression physique irréversible (`deleted_at`).
