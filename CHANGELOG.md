# Changelog — Naruto 2.5e Foundry VTT System

Toutes les modifications notables de ce système seront listées ici.

## [0.1.11.2] - En cours

### Corrigé
- Correction de la clé interne de la Base Lignée dans la fiche : `lign` au lieu de `lig`.
- Le déverrouillage visuel des rangs de lignée utilise désormais correctement la Base Lignée.

---

## [0.1.11.1]

### Corrigé
- Correction du déverrouillage visuel des rangs de lignée lors de l’augmentation de la Base Lignée.
- Les pistes de lignée sont désormais recalculées directement au rendu de la fiche.

---

## [0.1.11]

### Ajouté
- Ajout des limites de rangs de lignée par clan.
- Ajout de l’affichage des pistes de capacités de lignée dans l’onglet Lignée.
- Ajout du déverrouillage visuel des rangs de lignée selon la Base Lignée.
- Ajout de l’affichage des compétences obligatoires de clan.
- Ajout de l’application automatique des compétences obligatoires de clan.
- Prise en charge du clan principal, du clan hybride et de la voie hybridée pour les compétences obligatoires.

### Modifié
- L’onglet Lignée prépare désormais les futures capacités détaillées sans les automatiser immédiatement.

---

## [0.1.10.2]

### Corrigé
- Correction d’une double déclaration de la variable `heritage` empêchant le chargement du script de fiche.
- Restauration du chargement de la fiche Shinobi personnalisée et des paramètres système.

---

## [0.1.10.1]

### Corrigé
- Républication propre de la version 0.1.10 suite à un problème d’installation ou de cache sur The Forge.
- Vérification du chargement du script principal du système.

---

## [0.1.10]

### Ajouté
- Ajout d’options MJ par fiche pour autoriser le Clan hybride ou la Voie hybridée.
- Ajout du verrouillage des modes d’héritage hybrides si l’option MJ correspondante n’est pas activée.
- Ajout du verrouillage des champs incompatibles selon le mode d’héritage choisi.

### Modifié
- Le mode Clan vide désormais la Voie et les données d’hybridation.
- Le mode Voie vide désormais le Clan principal et les données d’hybridation.
- Le mode Clan hybride interdit désormais la Voie.
- Le mode Voie hybridée interdit désormais le Clan principal.

---

## [0.1.9.2]

### Corrigé
- Correction de l’affichage du champ Rang dans l’en-tête de la fiche.

---

## [0.1.9.1]

### Ajouté
- Ajout des voies connues :
  - Shōkan-shi - Voie du Genjutsu
  - Ninpō - Voie du Ninjutsu
  - Kriegsiter - Voie des Armes
  - Kugutsu - Voie du Marionnettiste
  - Hachimon - Voie du Taijutsu
- Ajout du mode d’héritage Voie hybridée.
- Ajout d’un résumé automatique de l’héritage dans l’en-tête de la fiche.

### Modifié
- Retrait des champs libres Village caché et Clan depuis l’en-tête.
- L’onglet Lignée devient la source principale des informations de village, clan, voie et hybridation.
- Les voies respectent désormais leurs restrictions de village.
- Le champ “Clan hybride secondaire” devient “Clan secondaire / hybridation”.

---

## [0.1.9]

### Ajouté
- Ajout des villages shinobi dans la configuration système.
- Ajout des 25 clans de Konoha.
- Ajout du statut vis-à-vis du village : Loyal, Déserteur, Ermite, Exilé, Indépendant.
- Ajout de la structure d’héritage : Clan, Voie, Clan hybride.
- Ajout de l’onglet Lignée / Clan / Voie.
- Ajout de la Voie du Marionnettisme comme voie liée à Suna, indisponible pour le moment.
- Les villages autres que Konoha sont visibles mais non sélectionnables.

---

## [0.1.8.1]

### Corrigé
- Correction de l’ordre de préparation des données acteur.
- L’XP des compétences est désormais calculée avant le total d’XP dépensée.

---

## [0.1.8]

### Ajouté
- Ajout des boutons d’augmentation et de réduction des compétences.
- Ajout des coûts XP automatiques pour les compétences.
- Calcul automatique de l’XP investie dans chaque compétence.
- Ajout du détail XP dépensée entre Bases et Compétences.
- Blocage de l’augmentation si l’XP disponible est insuffisante.
- Blocage de l’augmentation si la compétence n’est pas possédée.
- Blocage de l’augmentation selon la règle permanente : compétence max = Base associée + 2.

### Modifié
- L’XP dépensée totale inclut désormais les Bases et les Compétences.

---

## [0.1.7]

### Ajouté
- Ajout de la liste complète des compétences communes, de combat, de terrain et de clan.
- Ajout des catégories de compétences.
- Ajout d’un affichage groupé des compétences par catégorie.
- Ajout du paramètre MJ de mode de création :
  - Aspirant Ninja — 100 XP
  - Genin rang D — 125 XP

### Modifié
- Les compétences affichées sur la fiche utilisent désormais la liste complète du système papier.

---

## [0.1.6]

### Ajouté
- Ajout de l’onglet Compétences.
- Ajout d’une première liste de compétences.
- Affichage du score naturel, de la base associée, du bonus et du total.
- Calcul automatique du total des compétences.
- Affichage des compétences non possédées en grisé.
- Ajout des catégories et tags de compétences pour préparer les futures conditions de progression.
- Affichage automatique des paliers Expérimenté et Maîtrise selon le score naturel.

---

## [0.1.5]

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