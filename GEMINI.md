# Architecture Multi-Agents du Projet

Ce projet utilise une architecture multi-agents dirigée par un skill principal appelé **Chefskrsidoine7**.

## Chefskrsidoine7

**Chefskrsidoine7** est l'agent principal (le manager, chef de projet et orchestrateur central). Son rôle est de :
- Superviser l'intégralité du développement.
- Assurer le respect absolu des spécifications contenues dans `prompt/`.
- Orchestrer la délégation des tâches à des sous-agents spécialisés.
- Gérer la mémoire externe du projet (`memoire-favor`).

Il possède un **Manifeste de Compétences** global qui répertorie l'ensemble des sous-agents à sa disposition et leurs capacités.

## Les Sous-Agents

Chefskrsidoine7 gère 6 sous-agents spécialisés, chacun ayant son propre manifeste de compétences local :

1. **ascii-ui-mockup-generator** : Spécialiste de la création de maquettes UI en ASCII.
2. **codebase-pattern-finder** : Analyste de code, chargé de trouver des motifs et structures dans le code.
3. **communication-excellence-coach** : Coach pour la rédaction et la communication.
4. **general-purpose** : Agent polyvalent pour les tâches génériques.
5. **mermaid-diagram-specialist** : Spécialiste de la génération de diagrammes Mermaid.
6. **ui-ux-designer** : Designer UI/UX.

## Procédures Clés

Chefskrsidoine7 applique 3 procédures fondamentales :

1. **Reprise de Session** : Au démarrage, il recharge le contexte depuis la mémoire (`memoire-favor`) et les spécifications (`prompt/`).
2. **Exécution & Délégation** : Pour toute tâche complexe, il réalise une **Cartographie d'Impact**, identifie les compétences requises, formule un brief structuré, et supervise l'exécution.
3. **Mise à Jour de la Mémoire** : Il sauvegarde automatiquement l'historique en fin de session.

### Règles de Délégation

- Lorsqu'un sous-agent a besoin de l'expertise d'un autre sous-agent, il doit demander la validation de **Chefskrsidoine7**.
- L'ensemble des skills et des manifestes est encapsulé de manière relative dans le dossier `Chefskrsidoine7` pour garantir la portabilité du système.
- **Visualisation de flux** : pour brainstorming, nouvelle fonctionnalité, modification, workflows, onboarding ou UX — Chefskrsidoine7 délègue à `mermaid-diagram-specialist` avec `skill-mermaidH`.
- **Interdit** : délégation en chaîne (A→B→C) sans nouvelle approbation à chaque maillon.

### Règles d'Or

- **Soft Delete obligatoire** pour toutes les entités clés (pas de suppression physique).
- **Cartographie d'Impact** obligatoire avant toute modification de code ou de fonctionnalité.
- **Qualité Premium** : aucun placeholder ou code à moitié écrit.
- **Standards 5 Étoiles** : tout nouveau skill doit passer par le processus d'audit de `skill-creator`.

## Comment l'utiliser

Pour utiliser cette architecture, invoquez le skill principal depuis votre assistant IA avec la commande de skill correspondante pointant vers `Chefskrsidoine7/SKILL.md`. Vous pouvez lui confier une tâche de haut niveau, et il se chargera de la diviser et de la déléguer aux bons sous-agents.



# CLAUDE.md

Behavioral guidelines to reduce common LLM coding mistakes. Merge with project-specific instructions as needed.

**Tradeoff:** These guidelines bias toward caution over speed. For trivial tasks, use judgment.

## 1. Think Before Coding

**Don't assume. Don't hide confusion. Surface tradeoffs.**

Before implementing:
- State your assumptions explicitly. If uncertain, ask.
- If multiple interpretations exist, present them - don't pick silently.
- If a simpler approach exists, say so. Push back when warranted.
- If something is unclear, stop. Name what's confusing. Ask.

## 2. Simplicity First

**Minimum code that solves the problem. Nothing speculative.**

- No features beyond what was asked.
- No abstractions for single-use code.
- No "flexibility" or "configurability" that wasn't requested.
- No error handling for impossible scenarios.
- If you write 200 lines and it could be 50, rewrite it.

Ask yourself: "Would a senior engineer say this is overcomplicated?" If yes, simplify.

## 3. Surgical Changes

**Touch only what you must. Clean up only your own mess.**

When editing existing code:
- Don't "improve" adjacent code, comments, or formatting.
- Don't refactor things that aren't broken.
- Match existing style, even if you'd do it differently.
- If you notice unrelated dead code, mention it - don't delete it.

When your changes create orphans:
- Remove imports/variables/functions that YOUR changes made unused.
- Don't remove pre-existing dead code unless asked.

The test: Every changed line should trace directly to the user's request.

## 4. Goal-Driven Execution

**Define success criteria. Loop until verified.**

Transform tasks into verifiable goals:
- "Add validation" → "Write tests for invalid inputs, then make them pass"
- "Fix the bug" → "Write a test that reproduces it, then make it pass"
- "Refactor X" → "Ensure tests pass before and after"

For multi-step tasks, state a brief plan:
```
1. [Step] → verify: [check]
2. [Step] → verify: [check]
3. [Step] → verify: [check]
```

Strong success criteria let you loop independently. Weak criteria ("make it work") require constant clarification.

---

**These guidelines are working if:** fewer unnecessary changes in diffs, fewer rewrites due to overcomplication, and clarifying questions come before implementation rather than after mistakes.




