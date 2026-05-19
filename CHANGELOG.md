# Changelog — Naruto 2.5e Foundry VTT System

Toutes les modifications notables de ce système seront listées ici.

## [0.1.5] - En cours

### Ajouté
- Ajout des boutons d’augmentation et de réduction des Bases.
- Ajout des coûts XP automatiques pour les Bases.
- Calcul automatique de l’XP investie dans chaque Base.
- Calcul automatique de l’XP dépensée totale à partir des Bases.
- Blocage de l’augmentation si l’XP disponible est insuffisante.
- Blocage de l’augmentation si le plafond de rang est atteint.

### Modifié
- Les valeurs de Bases ne sont plus modifiées directement à la main.
- Le plafond actuel des Bases est affiché dans l’onglet Bases.

---

## [0.1.4]

### Modifié
- Déplacement du choix de formule de Chakra vers les paramètres de monde.
- La formule de Chakra est désormais configurée par le MJ dans les paramètres Foundry.
- Retrait du sélecteur de formule de Chakra depuis la fiche Shinobi.

---

## [0.1.3]

### Ajouté
- Calcul automatique de la Vigueur maximale.
- Calcul automatique du Caractère maximal.
- Calcul automatique du Chakra maximal selon les formules A/B/C/D.
- Calcul automatique de l’XP disponible : XP totale - XP dépensée.
- Calcul automatique du total des missions réussies et échouées.
- Blocage automatique du Nindō entre 0 et 10.

### Objectif
- Mettre en place les premières ressources dérivées du personnage Shinobi.

---

## [0.1.2]

### Modifié
- Amélioration de l’affichage des rangs de mission sur la fiche.
- Les rangs techniques comme `sPlus` sont désormais affichés proprement sous forme lisible, par exemple `S+`.

---

## [0.1.1]

### Ajouté
- Création de la fiche d’acteur Shinobi minimale.
- Ajout des onglets :
  - Résumé
  - Bases
  - Missions
  - Progression
- Affichage initial des champs :
  - Identité
  - Bases
  - Ressources
  - Nindō
  - Expérience
  - Missions

---

## [0.1.0]

### Ajouté
- Création initiale du système Foundry VTT `naruto-25e`.
- Ajout du manifeste `system.json`.
- Ajout du `template.json` initial.
- Déclaration du type d’acteur `shinobi`.
- Déclaration des types d’objets de base :
  - technique
  - arme
  - armure
  - équipement
  - clan
  - pouvoir de lignée
  - développement
  - condition
  - blessure
  - action de Nindō
- Première installation fonctionnelle sur The Forge.