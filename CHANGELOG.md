# Changelog — Naruto 2.5e Foundry VTT System

Toutes les modifications notables de ce système seront listées ici.

## [0.1.18.1]

### Corrigé

- Correction de la détection du MJ dans les hooks `_preUpdate`.
- La validation de création est désormais correctement enregistrée.
- Le MJ peut à nouveau modifier les fiches Technique.
- Les champs MJ-only ne sont plus bloqués par erreur pour le MJ.

## [0.1.18]

### Ajouté

- Ajout d’un état de création Brouillon / Validé pour les Shinobi.
- Ajout d’un bouton MJ pour valider la création.
- Ajout d’un bouton MJ pour déverrouiller la création.
- Ajout des Charges de Nindō, limitées à 5.
- Ajout d’une permission MJ permettant d’autoriser temporairement un joueur à modifier ses Ryō.
- Ajout de boutons Ajouter / Retirer pour gérer les Ryō.
- Préparation des champs d’affinités de chakra dans l’héritage.

### Modifié

- Les choix fondateurs de création sont verrouillés après validation.
- Le Village, le Statut, le Clan, la Voie et l’Hybridation deviennent verrouillés pour les joueurs après validation.
- Le Nindō narratif devient verrouillé après validation, sauf autorisation MJ.
- Les points de Nindō deviennent modifiables par le MJ uniquement.
- Les Missions deviennent modifiables par le MJ uniquement.
- Les Ryō deviennent modifiables par le MJ uniquement par défaut.
- Les joueurs ne peuvent plus réduire les Bases ou Compétences après validation.
- Les fiches Item / Technique deviennent modifiables par le MJ uniquement.

### Préparé

- Préparation du verrouillage futur des Affinités de Chakra.
- Préparation du futur Charactomancer.

## [0.1.17.2]

### Corrigé

- Correction du prérequis strict de Maîtrise pour les techniques.
- Le prérequis de Maîtrise utilise désormais le rang naturel de compétence.
- Une technique avec Maîtrise requise 5 bloque si la compétence naturelle est inférieure à 5.
- Une technique avec Maîtrise requise 5 fonctionne si la compétence naturelle est égale ou supérieure à 5.

## [0.1.17.1]

### Ajouté

- Ajout des types de dégâts tagués pour les techniques.
- Ajout des champs de prérequis des techniques.
- Ajout du mode de prérequis strict.
- Ajout de la distinction entre compétence possédée et compétence non possédée lors du lancement d’une technique.

### Modifié

- Les dégâts des techniques utilisent désormais une formule texte au lieu d’une valeur numérique fixe.
- Une technique élémentaire simple peut être lancée même si la compétence liée n’est pas possédée.
- Si la compétence liée n’est pas possédée, le jet utilise uniquement la Base associée.
- Si la compétence liée est possédée, le jet utilise le total de compétence.
- Les champs Description et Effet utilisent temporairement des zones de texte simples pour garantir leur édition.

### Préparé

- Préparation des prérequis de type affinité, maîtrise, clan, lignée, Kekkei Genkai, Kekkei Tōta, Kinjutsu et validation MJ.

## [0.1.17]

### Ajouté

- Ajout de la classe de document Item Naruto 2.5e.
- Ajout de la fiche Item Naruto 2.5e.
- Ajout d’une fiche dédiée aux Techniques / Jutsus.
- Ajout des champs de technique : famille, domaine, rang, niveau, action, base, compétence.
- Ajout des champs de portée, durée, cible, zone, dégâts, coût Chakra et entretien.
- Ajout d’un bouton de lancement de technique.
- Ajout d’une carte de chat dédiée aux techniques.
- Préparation du futur suivi des actions de round via le champ action de technique.

### Modifié

- Nettoyage Markdown du changelog.

## [0.1.16]

### Ajouté

- Ajout de l’onglet Inventaire.
- Ajout de la monnaie Ryō 両.
- Ajout d’un inventaire minimal intégré à la fiche.
- Ajout des catégories Arme, Protection, Consommable et Objet.
- Ajout d’un formulaire rapide pour ajouter un objet.
- Ajout de la modification de quantité, valeur, poids et notes.
- Ajout de l’équipement/déséquipement pour les armes et protections.
- Ajout de la suppression d’un objet avec confirmation.
- Ajout d’un résumé des armes et protections équipées dans l’onglet Résumé.

### Validé

- Les armes et protections peuvent être équipées/déséquipées.
- Les consommables et objets divers ne peuvent pas être équipés.
- Le résumé affiche correctement l’équipement porté.
- Les données d’inventaire sont conservées correctement.

## [0.1.15.1]

### Ajouté

- Ajout d’une carte de chat personnalisée pour les jets du système.
- Ajout de la détection des jets explosifs au d10.
- Ajout d’une mise en valeur visuelle des explosions de dé.
- Préparation des styles futurs pour les réussites, échecs et réussites supérieures.

---

## [0.1.15]

### Ajouté

- Ajout des jets cliquables d’initiative, d’attaque ARM, d’attaque TAI et de compétence rapide.
- Ajout des interceptions ARM / TAI avec compteur par round.
- Ajout du reset de round réservé au MJ.
- Ajout d’un compteur provisoire de pouvoirs de lignée.
- Ajout du reset de session réservé au MJ.
- Prise en compte du bonus Héréditaire dans les utilisations de pouvoir de lignée.

### Validé

- Les jets utilisent bien le d10 explosif.
- Les interceptions consomment correctement leurs compteurs.
- Les boutons sont bloqués lorsque les compteurs sont à 0.
- Le reset round restaure les interceptions.
- Le reset session restaure les utilisations de lignée.

## [0.1.14.2]

### Corrigé

- Correction de la régénération passive du Chakra.
- La régénération passive est désormais calculée depuis le Chakra maximum.
- La spécialisation Inépuisable augmente correctement le pourcentage de régénération passive.
- La régénération passive affiche maintenant sa valeur et son pourcentage réel sur la fiche.

### Validé

- Les spécialisations de Chakra fonctionnent avec leurs limites respectives.
- Les bonus de Chakra, Vigueur, Caractère, Initiative, dégâts ARM/TAI et régénération passive sont correctement appliqués.

## [0.1.14]

### Ajouté

- Ajout de l’onglet Chakra.
- Ajout du système de spécialisations de Chakra.
- Ajout des spécialisations Acéré, Colossal, Endurci, Explosif, Fulgurant, Héréditaire, Impérieux, Inépuisable, Puissant et Rémanent.
- Ajout des limites par spécialisation : unique, 3, 5 ou 9 rangs.
- Ajout du calcul du nombre de spécialisations disponibles selon le rang.
- Ajout du calcul des spécialisations dépensées et restantes.
- Ajout des bonus automatiques simples des spécialisations.
- Ajout d’un résumé des spécialisations dans l’onglet Résumé.

### Modifié

- Les calculs de Vigueur, Caractère, Chakra, Initiative et dégâts prennent désormais en compte les spécialisations de Chakra.

---

## [0.1.13]

### Ajouté

- Ajout de l’onglet Combat / Actions.
- Ajout des ressources rapides : Vigueur, Caractère, Chakra.
- Ajout de l’initiative calculée.
- Ajout des attaques basiques ARM et TAI.
- Ajout des dégâts basiques ARM et TAI.
- Ajout des interceptions ARM et TAI.
- Ajout du bloc Santé : Fatigue, Sonné, Blessures.
- Ajout du palier automatique lié au niveau actuel de Chakra.
- Ajout des réserves de lignée A/B, grisées par défaut et activables par le MJ.
- Ajout d’un mini-résumé d’état de combat dans l’onglet Résumé.

### Validé

- Initiative = 1d10 + 1 + COR total + bonus.
- Interception ARM suit la Base ARM.
- Interception TAI suit la Base TAI.
- Dégâts ARM = ARM + 1 + bonus.
- Dégâts TAI = TAI + 1 + bonus.
- Les seuils Chakra appliquent correctement Pleine forme / Sonné / Blessure 1 / Blessure 2.

---

## [0.1.12.2]

### Corrigé

- Correction de la lecture des missions réussies dans les conditions de promotion.
- Les promotions lisent désormais correctement `system.missions.<rang>.completed`.

---

## [0.1.12.1]

### Corrigé

- Correction de l’appel automatique de la préparation de progression de rang.
- L’onglet Progression affiche désormais correctement le prochain rang et les conditions de promotion sans appel manuel en console.

---

## [0.1.12]

### Ajouté

- Ajout de la table officielle des rangs ninja.
- Ajout des seuils d’XP par rang.
- Ajout des plafonds de Bases selon le rang.
- Ajout de l’affichage du rang actuel et du prochain rang.
- Ajout des conditions de promotion Aspirant vers Genin.
- Ajout des conditions de promotion Genin vers Chūnin.
- Ajout des conditions de promotion Chūnin vers Jōnin.
- Ajout d’une validation MJ pour les promotions importantes.
- Ajout d’une validation MJ recommandée pour Jōnin S, Sannin et Kage.

### Modifié

- L’onglet Progression affiche désormais les conditions réelles de passage de rang.
- L’en-tête de fiche utilise désormais le rang calculé par la progression.

---

## [0.1.11.2]

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
  - Première installation fonctionnelle sur The Forge
