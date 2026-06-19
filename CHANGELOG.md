# Changelog — Naruto 2.5e Foundry VTT System

Toutes les modifications notables de ce système seront listées ici.

## 0.1.39.2 - Techniques jouables V1

### Ajouté

- Ajout des sources JSON fines pour les techniques Iryō et Fūin.
- Ajout des premières techniques jouables V1 dans les compendiums structurés :
  - techniques communes ;
  - Henge ;
  - Kawarimi ;
  - Gensou ;
  - Yūryoku ;
  - Katon ;
  - Suiton ;
  - Doton ;
  - Fūton ;
  - Raïton ;
  - Iryō ;
  - Fūin ;
  - Mokuton ;
  - Kage ;
  - Kikaichū ;
  - Jiton ;
  - Kuchiyose / contrats selon données exploitables ;
  - drogues et poisons comme facettes techniques liées à Iryō / terrain.

### Modifié

- Les anciens fichiers legacy de techniques sont vidés pour éviter les doublons :
  - `techniques-communes.json` ;
  - `techniques-elementaires.json` ;
  - `techniques-lignees.json`.
- Les techniques sont désormais réparties dans les fichiers fins par famille, affinité ou lignée.
- Les rangs de techniques sont déduits du niveau de jutsu :
  - niveaux 1 à 5 : Rang D ;
  - niveaux 6 à 7 : Rang C ;
  - niveaux 8 à 9 : Rang B ;
  - niveaux 10 à 12 : Rang A ;
  - niveaux 13 à 15 : Rang S ;
  - niveaux 16 à 19 : Rang AA ;
  - niveau 20 et plus : Rang S+.
- Les techniques incomplètes ou non automatisées sont conservées avec un statut d’automatisation `manual` ou `partial`.

### Notes

- Cette version ne code pas encore les effets automatiques complets de combat.
- Cette version prépare le choix de techniques de départ du Shinobimancer en 0.1.40.
- Les améliorations futures de jutsus par niveaux/augmentations seront traitées plus tard.

## 0.1.39.1 - Dossiers de compendiums et rangement automatique

### Ajouté

- Ajout de dossiers internes dans les compendiums de techniques.
- Ajout de dossiers internes dans les compendiums d’équipement.
- Ajout automatique des 25 dossiers de clans dans le compendium `Techniques de lignées`.
- Ajout d’une assignation automatique des items importés vers le bon dossier de compendium.

### Modifié

- Les techniques `Gensou` présentes dans les sources legacy communes sont désormais importées dans `Techniques — Genjutsu`, dossier `Gensou`.
- Les techniques de Ninjutsu sont rangées par affinité ou domaine :
  - Katon ;
  - Suiton ;
  - Doton ;
  - Fūton ;
  - Raïton ;
  - Iryō ;
  - Fūin.
- Les techniques Mokuton legacy sont normalisées :
  - `family: "Lignée"` devient `family: "lignee"` ;
  - `rank: "Mokuton"` devient provisoirement `rank: "d"` ;
  - `taxonomy.clan` devient `senju` ;
  - le dossier cible devient `Senju`.
- Les techniques de lignée sont rangées par clan, sans dossier générique `Divers`.

### Notes

- Cette version ne remplit pas encore massivement les compendiums rang D.
- La priorité de la prochaine passe est l’audit et l’ajout des techniques rang D / assimilées rang D.

## 0.1.39 - Charpente compendiums et taxonomy

### Ajouté

- Ajout de nouveaux packs de techniques :
  - Techniques communes ;
  - Techniques — Ninjutsu ;
  - Techniques — Genjutsu ;
  - Techniques — Taijutsu ;
  - Techniques — Armes ;
  - Techniques de lignées.
- Ajout de nouveaux packs d’équipement :
  - Armes ;
  - Armures ;
  - Consommables ;
  - Explosifs ;
  - Kits ;
  - Outils ;
  - Équipements de départ.
- Ajout d’une structure `taxonomy` commune aux items.
- Ajout d’une structure `automation` commune aux items.
- Ajout d’un bloc `Classement / automatisation` sur la fiche Item.
- Ajout de sources JSON fines pour préparer l’éclatement des techniques et équipements.
- L’importeur de données peut désormais gérer plusieurs sources vers un même compendium sans vider le pack entre chaque source.

### Modifié

- Le pack `techniques-elementaires` est retiré au profit du pack `techniques-ninjutsu`.
- Le fichier legacy `techniques-elementaires.json` est conservé temporairement comme source de migration vers `techniques-ninjutsu`.
- Les techniques de lignée legacy sont normalisées automatiquement :
  - `family: "Lignée"` devient `family: "lignee"` ;
  - `rank: "Mokuton"` est déplacé en taxonomy de sous-catégorie quand possible.
- Correction de l’affichage `Rang Rang D` dans l’onglet Techniques.
- L’interface d’import affiche désormais les sources regroupées par famille de données.

### Notes

- Cette version pose la charpente des futurs compendiums propres.
- Cette version ne remplit pas encore les nouveaux fichiers JSON fins.
- Cette version ne crée pas encore le navigateur de compendiums façon PF2e.
- Cette version ne branche pas encore le choix de technique de départ dans le Shinobimancer.

## 0.1.38 - Techniques V1 jouables

### Ajouté

- Ajout d’un onglet `Techniques` sur la fiche Shinobi.
- Les techniques possédées par l’acteur sont maintenant listées sur la fiche.
- Les techniques sont regroupées par famille :
  - Ninjutsu ;
  - Genjutsu ;
  - Taijutsu ;
  - Lignée ;
  - Autres.
- Ajout d’un bouton `Utiliser` sur chaque technique possédée.
- Ajout du drag & drop des items `technique` depuis les compendiums vers une fiche Shinobi.
- Une technique déposée sur une fiche est créée comme Item embedded de l’acteur.
- Les techniques paient maintenant leur coût initial en Chakra à l’utilisation.
- Les techniques avec entretien sont ajoutées aux effets maintenus actifs.
- Les techniques maintenues peuvent être arrêtées depuis la fiche.
- L’entretien des techniques maintenues rejoint le système existant d’entretien :
  - les coûts d’entretien sont additionnés ;
  - la régénération passive est soustraite une seule fois ;
  - le MJ peut résoudre le maintien via le bouton d’entretien existant.

### Modifié

- Les cartes de chat des techniques affichent désormais :
  - Chakra avant / après ;
  - coût initial ;
  - coût d’entretien ;
  - état maintenu si applicable.
- Les techniques sans jet activé peuvent créer une carte de chat sans lancer de dé, tout en payant leur coût de Chakra.
- Le système `activeLineagePowers` est conservé pour compatibilité, mais peut maintenant contenir des effets maintenus de type `technique`.

### Notes

- Cette version ne code pas encore les effets automatiques de dégâts, blessures ou conditions.
- Cette version ne code pas encore le navigateur de compendiums façon PF2e.
- Cette version ne classe pas encore les compendiums par dossiers techniques.
- Cette version ne branche pas encore le choix de technique de départ dans le Shinobimancer.
- `technique-sheet.hbs` reste inutilisé pour l’instant.

## 0.1.37.1 - Correctif récursion tenue inventaire

### Corrigé

- Correction d’une récursion infinie dans la préparation des états de tenue d’inventaire.
- `_normalizeInventoryCarryState()` n’appelle plus `_getInventoryCarryStateOptions()`.
- Ajout d’un helper `_getAllowedInventoryCarryStates()` utilisé par :
  - `_normalizeInventoryCarryState()` ;
  - `_getInventoryCarryStateOptions()`.
- Correction du crash `Maximum call stack size exceeded` à l’ouverture d’une fiche possédant des objets dans l’inventaire.

### Notes

- Aucun changement de structure de données.
- Aucun changement de template.
- Aucun changement de comportement hors correction du crash.

---

## 0.1.37 - Inventaire V1, tenue et toxicité simple

### Ajouté

- Ajout d’un état de tenue des objets d’inventaire :
  - non tenu ;
  - main droite ;
  - main gauche ;
  - deux mains ;
  - lâché ;
  - porté.
- Ajout d’une gestion des conflits de mains :
  - tenir un objet à deux mains libère les deux mains ;
  - tenir un objet en main droite libère la main droite et les objets à deux mains ;
  - tenir un objet en main gauche libère la main gauche et les objets à deux mains.
- Ajout d’une structure de toxicité simple pour les consommables :
  - toxicité globale ;
  - toxicité journalière ;
  - toxicité hebdomadaire ;
  - notes MJ.
- Ajout de champs de toxicité sur les items consommables :
  - toxicité activée ;
  - montant ;
  - période ;
  - IA en tours.
- Ajout de boutons MJ pour réinitialiser la toxicité journalière, hebdomadaire ou totale.

### Modifié

- Le système de charge reste présent dans les données mais est désactivé mécaniquement.
- L’affichage `Charge` devient un affichage de poids indicatif.
- Les états `Chargé`, `Surchargé` et `Surcharge critique` ne produisent plus d’état mécanique.
- Les valeurs et poids des objets d’inventaire ne sont modifiables que par le MJ.
- Les Ryō conservent la permission existante :
  - le MJ peut toujours les modifier ;
  - un joueur peut les modifier uniquement si le MJ l’autorise.
- Les consommables vérifient maintenant la toxicité avant application de leur effet.
- Les consommables non automatisés restent bloqués au lieu d’être consommés avec un effet narratif approximatif.

### Données

- La Pilule de chakra mineure reçoit une toxicité journalière simple.
- La Note explosive reste un consommable, mais devient un objet tenable/préparable en main.

### Notes

- Cette version ne code pas encore l’overdose complexe.
- Cette version ne code pas encore le calendrier ni la réinitialisation automatique jour/semaine.
- Cette version ne code pas encore les effets complets des pilules longues comme la Pilule du soldat.
- Cette version ne modifie pas le skin de la fiche Shinobi.

## 0.1.36.7 - Cadre dossier central Shinobimancer

### Modifié

- Ajout d’un wrapper visuel `shinobimancer-dossier-frame` autour du contenu principal et du résumé permanent.
- Les rouleaux haut/bas encadrent désormais la zone dossier centrale :
  - contenu principal ;
  - résumé permanent.
- La colonne d’étapes reste indépendante des rouleaux haut/bas, en préparation de son futur asset dédié.
- Le header principal `.shinobimancer-topbar` est neutralisé visuellement dans la fenêtre principale.
- Le titre fonctionnel est désormais porté par le corps principal via `.shinobimancer-page-header`.
- Le footer principal reste fonctionnel, mais s’aligne maintenant sur la zone dossier plutôt que sur toute la fenêtre.
- Stabilisation du footer de l’écran de choix : il reste en bas de la fenêtre, tandis que le corps de choix devient scrollable.

### Notes

- Aucun changement de logique de création.
- Aucun changement JavaScript.
- Les assets utilisés restent :
  - `assets/ui/shinobimancer/scroll-top.png` ;
  - `assets/ui/shinobimancer/scroll-bottom.png`.
- L’asset de rouleau d’étapes gauche et l’étiquette séparée seront intégrés plus tard.

---

## 0.1.36.6 - Correctif nom asset rouleau haut Shinobimancer

### Corrigé

- Renommage de l’asset haut rogné :
  - `scroll-top-tag.png` devient `scroll-top.png`.
- Correction du décalage entre le chemin CSS et le fichier réellement présent dans l’archive.
- `scroll-top.png` et `scroll-bottom.png` sont désormais les noms canoniques des rouleaux haut et bas du Shinobimancer.

---

## 0.1.36.5 - Test header/footer assets rognés Shinobimancer

### Modifié

- Remplacement du test d’assets pleine toile par deux PNG rognés :
  - `assets/ui/shinobimancer/scroll-top.png` ;
  - `assets/ui/shinobimancer/scroll-bottom.png`.
- `scroll-top.png` est utilisé comme peau visuelle du header :
  - écran d’accueil ;
  - fenêtre principale du Shinobimancer.
- `scroll-bottom.png` est utilisé comme peau visuelle du footer.
- Les conteneurs existants restent en place :
  - `.shinobimancer-hero` ;
  - `.shinobimancer-topbar` ;
  - `.shinobimancer-footer`.
- Le layout stable, le scroll, les colonnes et les boutons restent gérés par `styles/shinobimancer.css`.

### Notes

- Aucun changement de logique.
- Aucun changement de template.
- `tag-left.png` n’est pas encore intégré : l’étiquette séparée sera ajoutée plus tard lorsqu’elle sera disponible.

---

## 0.1.36.4 - Correctif noms assets rouleaux Shinobimancer

### Corrigé

- Correction des noms des assets rouleaux Shinobimancer :
  - `scroll-top-tag.png.png` devient `scroll-top-tag.png` ;
  - `scroll-bottom.png.png` devient `scroll-bottom.png`.
- Les chemins CSS pointent désormais vers des fichiers réellement présents dans l’archive.

---

## 0.1.36.3.1 - Correctif noms assets rouleaux Shinobimancer

### Corrigé

- Correction des noms des assets rouleaux Shinobimancer :
  - `scroll-top-tag.png.png` devient `scroll-top-tag.png` ;
  - `scroll-bottom.png.png` devient `scroll-bottom.png`.
- Les chemins CSS pointent désormais vers des fichiers réellement présents dans l’archive.

---

## 0.1.36.3 - Test assets rouleaux Shinobimancer

### Ajouté

- Ajout d’un premier test d’intégration des assets graphiste :
  - `assets/ui/shinobimancer/scroll-top-tag.png` ;
  - `assets/ui/shinobimancer/scroll-bottom.png`.

### Modifié

- Le CSS de maquette applique désormais les rouleaux comme fonds décoratifs de `.shinobimancer-shell`.
- Les assets suivent la fenêtre Foundry lorsqu’elle est déplacée.
- Les assets restent indépendants du corps scrollable du Shinobimancer.
- Les fonds du header, du footer et des panneaux sont légèrement allégés pour laisser apparaître les PNG.

### Notes

- Aucun changement de logique.
- Aucun changement de template.
- Aucun changement du layout stable porté par `styles/shinobimancer.css`.
- Ce test sert uniquement à vérifier le placement visuel des assets avant découpe ou ajustements plus fins.

---

## 0.1.36.2 - Stabilisation Shinobimancer héritage et Nindō

### Ajouté

- Ajout d’une purge ciblée des caches Handlebars liés au Shinobimancer.
- Ajout d’un bouton MJ `Autoriser ce mode` pour les héritages hybrides sans demande joueur préalable.
- Ajout d’états visuels dédiés aux demandes MJ :
  - demande en attente ;
  - demande acceptée ;
  - demande refusée.

### Modifié

- Les cartes `Clan hybride` et `Voie hybridée` ne sont plus visuellement grisées lorsqu’une action de demande ou d’autorisation est disponible.
- Les cartes refusées restent grisées et affichent un état `Demande refusée ✕`.
- L’étape 4 de la barre latérale affiche désormais `Clan / Voie`.
- L’affichage du Nindō dans le Shinobimancer est clarifié :
  - le mode `Nindō prédéfini` affiche seulement la sélection prédéfinie et sa description ;
  - le mode `Nindō personnalisé` affiche seulement le champ de devise personnelle.
- Passer en `Nindō personnalisé` vide le prédéfini sélectionné.
- Choisir un prédéfini vide la devise personnelle pour éviter les états mixtes.

### Notes

- Cette version ne modifie pas la validation mécanique des héritages hybrides.
- Cette version ne modifie pas les règles de Nindō, seulement l’interface de création.
- La purge de cache est limitée aux entrées contenant `shinobimancer`.

## 0.1.36.1 - Demandes MJ pour héritages hybrides

### Ajouté

- Ajout d’un cycle de demande MJ dans l’étape `Héritage` du Shinobimancer pour :
  - `Clan hybride` ;
  - `Voie hybridée`.
- Côté joueur :
  - ajout d’un bouton `Demander au MJ` sur les modes hybrides verrouillés ;
  - affichage de l’état de demande : en attente, acceptée ou refusée.
- Côté MJ :
  - ajout des boutons `Demande acceptée` et `Demande refusée` quand une demande est en attente ;
  - ajout d’un bouton discret de réinitialisation de demande.
- L’acceptation MJ active automatiquement l’option correspondante :
  - `allowHybridClan` pour `Clan hybride` ;
  - `allowHybridVoie` pour `Voie hybridée`.

### Modifié

- Les modes `Clan hybride` et `Voie hybridée` restent verrouillés tant qu’ils ne sont pas autorisés par le MJ.
- Un clic sur une carte hybride verrouillée affiche désormais un message indiquant qu’une autorisation MJ est requise.
- La réinitialisation MJ retire l’autorisation du mode concerné et permet au joueur de refaire une demande.

### Notes

- Cette version ne modifie pas les règles de validation mécanique des héritages hybrides.
- Les données de demande sont stockées dans `system.heritage.requests`.
- Aucun changement n’est apporté à `actor.js`, la validation existante des options MJ est conservée.

## 0.1.36 - Voies jouables dans le Shinobimancer

### Ajouté

- Ajout des Voies dans l’étape `Clan / Voie` du Shinobimancer.
- Ajout de cartes de Voies pour :
  - Shōkan-shi - Voie du Genjutsu ;
  - Ninpō - Voie du Ninjutsu ;
  - Kriegsiter - Voie des Armes ;
  - Kugutsu - Voie du Marionnettiste ;
  - Hachimon - Voie du Taijutsu.
- Ajout de l’affichage conditionnel de l’étape `Clan / Voie` selon le mode d’héritage choisi :
  - `Clan` affiche uniquement les clans ;
  - `Voie` affiche uniquement les voies ;
  - `Clan hybride` affiche un clan principal et un clan secondaire ;
  - `Voie hybridée` affiche un clan principal et une voie ;
  - `Clan caché / dissimulé` conserve le clan officiel/social et le Réel Clan.

### Modifié

- Le clic sur une carte de clan respecte désormais le mode d’héritage courant au lieu de forcer systématiquement le mode `Clan`.
- Le mode `Voie hybridée` conserve le clan principal lorsqu’une voie est sélectionnée.
- Le mode `Clan hybride` permet de sélectionner un clan secondaire distinct du clan principal.
- Le compteur d’arme principale du paquetage de départ affiche maintenant `0 / 1` avant sélection puis `1 / 1` après sélection.
- Mise à jour du texte de l’écran de choix Shinobimancer / fiche manuelle pour mentionner les voies.

### Notes

- Kugutsu reste visible mais verrouillée tant que Suna n’est pas disponible à la création.
- Cette version ne code pas encore les mécaniques détaillées propres aux voies.
- Les effets de combat, d’ouverture des portes, de marionnettes, de techniques avancées et de spécialisations restent prévus pour les chantiers Combat / Actions et Techniques.

## 0.1.35 - Clans jouables étendus dans le Shinobimancer

### Ajouté

- Ajout des 25 clans jouables dans la grille de sélection du Shinobimancer.
- Les cartes de clans du Shinobimancer sont maintenant générées depuis `NARUTO25E.clans` au lieu d’une liste limitée aux 7 clans de test.
- Le mode `Clan caché / dissimulé` utilise aussi la liste complète des clans jouables pour :
  - le clan officiel / social ;
  - le Réel Clan mécanique.

### Modifié

- Mise à jour des textes du Shinobimancer :
  - retrait des mentions `Clans de test` ;
  - retrait des mentions `7 clans initiaux` ;
  - mise à jour de l’écran de choix Shinobimancer / fiche manuelle.
- Mise à jour du tampon de version visible dans l’écran de choix du Shinobimancer.
- Les cartes de clans affichent une prévisualisation générique pour les clans étendus, avec :
  - village ;
  - compétence obligatoire éventuelle ;
  - plafond de Lignée ;
  - premiers pouvoirs de lignée disponibles.

### Corrigé

- Retrait de `immunity` comme critère automatique de typage passif pour les pouvoirs de lignée générés depuis `config.js`.
- Une immunité n’est plus automatiquement considérée comme passive :
  - les immunités permanentes peuvent rester passives si leur type l’indique ;
  - les immunités temporaires ou déclenchées restent des pouvoirs actifs.

### Notes

- Cette version ne code pas l’automatisation complète des effets complexes de clans.
- Les effets liés au combat, aux transformations, aux blessures, aux états, aux techniques et aux objets spéciaux restent prévus pour les chantiers dédiés.
- Le Shakujo Kagayaki reste noté comme futur objet spécial avec 5 augmentations / spécialisations de rang.
- L’audit complet des passifs des 7 clans historiques sera traité plus tard, au moment des chantiers Combat / Actions, Techniques et Santé / Blessures / États.

## 0.1.34.1 - Correctif typage passif et Mangekyō Amaterasu

### Corrigé

- Correction de la règle de sélection Mangekyō en mode `Pouvoirs Uchiha originaux` :
  - Amaterasu ne peut plus être choisi sur les deux yeux ;
  - Amaterasu + Enton / Kagutsuchi reste la combinaison attendue pour produire puis contrôler les flammes noires ;
  - les doublons des autres pouvoirs Mangekyō restent autorisés selon validation MJ :
    - Kamui + Kamui ;
    - Tsukuyomi + Tsukuyomi ;
    - Kotoamatsukami + Kotoamatsukami ;
    - Pouvoir Mangekyō original + Pouvoir Mangekyō original.
- Correction du typage automatique des pouvoirs de lignée générés depuis `config.js` :
  - les capacités de lignée ;
  - les déblocages ;
  - les bonus ;
  - les passifs ;
  - les pouvoirs marqués `passive`, `unlock` ou `interception`
  sont générés comme `passive` plutôt que comme pouvoirs activables.

### Modifié

- Clarification du pouvoir Akaba `Enchaînements Successifs` comme passif d’interceptions supplémentaires.
- Clarification du pouvoir Kagayaki `Shakujo — Bâton Sacré` comme déblocage passif d’objet spécial.
- Clarification du pouvoir Kagayaki `Vision du Combat` comme passif d’interception défensive ARM supplémentaire.

### Notes

- Cette version ne code pas encore le système complet de blessures supplémentaires.
- `Blessure A`, `Blessure B` et les autres paliers spéciaux sont conservés comme données préparatoires pour le futur chantier Santé / Blessures / États.
- Cette version ne code pas encore l’overdose des pilules.
- Le Shakujo devra devenir plus tard un objet spécial avec 5 augmentations / spécialisations de rang.

## 0.1.34 - Clans jouables étendus : phase mécanique

### Ajouté

- Ajout de la phase mécanique d’intégration des 25 clans jouables.
- Ajout des données de création mécaniques pour les clans restants :
  - Akaba ;
  - Akimichi ;
  - Ao ;
  - Eshimuro ;
  - Ishida ;
  - Kagayaki ;
  - Kenta ;
  - Kurama ;
  - Morino ;
  - Sarutobi ;
  - Shimadoku ;
  - Shimura ;
  - Takeda ;
  - Utatane.
- Complétion des données mécaniques déjà amorcées pour :
  - Aniki ;
  - Munefuda ;
  - Yamanaka.
- Ajout d’un système générique de lecture des pouvoirs de lignée depuis `NARUTO25E.clanLineageFeatures`.
- Ajout d’un fallback permettant de créer un item `pouvoirLignee` depuis `config.js` si le pouvoir n’est pas trouvé dans le compendium ou dans le JSON.
- Ajout de la génération automatique des pouvoirs de lignée issus de `config.js` lors de l’import du compendium `Pouvoirs de lignée`.
- Ajout d’une première couche de bonus passifs simples de lignée :
  - bonus de Vigueur maximum ;
  - bonus de Caractère maximum ;
  - bonus de Chakra maximum ;
  - bonus de compétence fixe ou égal à la Lignée.

### Modifié

- La synchronisation des pouvoirs de lignée n’est plus limitée aux clans codés à la main.
- Les clans non encore présents dans le Shinobimancer peuvent être rendus fonctionnels mécaniquement depuis la fiche si leur clé de clan est renseignée.
- Les 7 clans tests existants restent protégés par leurs chemins spécifiques :
  - Aburame ;
  - Hyūga ;
  - Inuzuka ;
  - Katō ;
  - Nara ;
  - Senju ;
  - Uchiha.

### Notes

- Cette version ne rend pas encore les 25 clans sélectionnables proprement dans le Shinobimancer.
- Les clans nouvellement intégrés sont fonctionnels mécaniquement côté fiche, synchronisation et compendium.
- Les effets complexes de combat, transformations, immunités, réserves spéciales et techniques détaillées restent à automatiser dans les futurs chantiers Inventaire, Combat, Actions et Techniques.
- Les rangs ou pouvoirs non nommés explicitement dans la source sont conservés sous forme de fondation mécanique minimale, sans inventer de règle complète.

## 0.1.33.2 - Correctif rangs Mangekyō par œil

### Ajouté

- Ajout d’une fenêtre automatique de choix du pouvoir d’œil Mangekyō au moment où le rang de Lignée requis est atteint :
  - Lignée 6 : choix de l’œil droit ;
  - Lignée 7 : choix de l’œil gauche.
- Ajout de l’option `Choisir plus tard` dans cette fenêtre.
- Ajout des marqueurs de suivi :
  - `rightEyeChoicePromptedAtLineage` ;
  - `leftEyeChoicePromptedAtLineage`.
- Ajout du pouvoir de lignée `Amaterasu — Flammes noires instables`.

### Modifié

- Les pouvoirs d’œil Mangekyō ne sont plus synchronisables dès Lignée 5 :
  - Lignée 5 donne seulement accès au Mangekyō Sharingan validé ;
  - l’œil droit ne peut accorder son pouvoir qu’à partir de Lignée 6 ;
  - l’œil gauche ne peut accorder son pouvoir qu’à partir de Lignée 7.
- Enton / Kagutsuchi ne peut plus être choisi comme premier pouvoir d’œil.
- Enton / Kagutsuchi reste réservé au second œil et nécessite Amaterasu sur l’autre œil.
- Si le personnage possède Amaterasu + Enton et que l’œil Amaterasu devient aveugle :
  - Enton est retiré ;
  - Amaterasu est conservé sous forme instable.
- Si l’œil Enton devient aveugle, Amaterasu reste conservé normalement.

### Corrigé

- Correction du cas où un Uchiha Lignée 5 avec Mangekyō validé pouvait recevoir immédiatement des pouvoirs d’œil.
- Correction du cas où Enton pouvait être préparé sur l’œil droit avant que l’autre œil puisse fournir Amaterasu.

## 0.1.33.1 - Correctif sync Lignée et santé oculaire interdite

### Corrigé

- Correction des doublons de pouvoirs de lignée lors des synchronisations automatiques.
- Correction des doublons plus fréquents en mode `Clan caché / dissimulé`, notamment lorsque le Réel Clan réattribue plusieurs rangs de Lignée.
- Correction du doublon possible du `Mangekyō Sharingan` lors de la validation MJ.
- Ajout d’un verrou interne empêchant plusieurs synchronisations concurrentes de créer les mêmes pouvoirs en parallèle.
- Ajout d’un nettoyage automatique des doublons de pouvoirs de lignée déjà présents sur la fiche lors de la prochaine synchronisation MJ.
- `Izanagi` dépend désormais de l’état de l’œil droit.
- `Izanami` dépend désormais de l’état de l’œil gauche.
- `Izanagi` et `Izanami` ne sont plus accordés si l’œil correspondant est aveugle.

### Notes

- `Izanagi` et `Izanami` restent des pouvoirs généraux Uchiha : ils ne deviennent pas des choix Mangekyō.
- Les exceptions rares liées à l’EMS, au Rinnegan ou à une décision MJ seront traitées plus tard si nécessaire.

## 0.1.33 - Lignée avancée et Mangekyō fonctionnel

### Ajouté

- Ajout de la synchronisation réelle des pouvoirs de Mangekyō choisis par œil.
- Ajout de l’attribution automatique des pouvoirs d’œil uniquement lorsque le choix est :
  - renseigné ;
  - confirmé par le joueur ;
  - validé par le MJ ;
  - porté par un œil utilisable.
- Ajout des pouvoirs de lignée manquants :
  - `Kamui` ;
  - `Pouvoir Mangekyō original`.

### Modifié

- Les pouvoirs d’œil Mangekyō ne sont plus seulement des choix d’interface : ils peuvent maintenant accorder ou retirer leurs items `pouvoirLignee`.
- La règle `Enton / Kagutsuchi` est renforcée :
  - Enton nécessite Amaterasu dans l’autre œil ;
  - Amaterasu doit être confirmé par le joueur et validé par le MJ ;
  - l’œil porteur d’Amaterasu doit être utilisable.
- Le Rinnegan, l’EMS et les états d’œil ne valident jamais automatiquement un pouvoir d’œil.
- La synchronisation des pouvoirs de lignée réagit désormais aussi aux changements :
  - de pouvoir choisi par œil ;
  - de validation PJ/MJ ;
  - d’état d’œil ;
  - de Rinnegan ;
  - de Tenseigan ;
  - de lignée cachée réelle ou débloquée.

### Corrigé

- Correction du cas où les boutons de validation Mangekyō modifiaient les données sans déclencher d’attribution mécanique réelle.
- Correction du cas où un pouvoir Mangekyō invalidé, non validé MJ ou porté par un œil aveugle pouvait rester conceptuellement présent sans être correctement resynchronisé.
- Les joueurs peuvent maintenant choisir et confirmer leurs pouvoirs d’œil après validation de la création, sans pouvoir s’accorder eux-mêmes la validation MJ.

### Notes

- Cette version ne crée pas encore les techniques détaillées Uchiha dans `techniques-lignees.json`.
- Les pouvoirs accordés sont des items `pouvoirLignee`.
- Les effets précis de Kamui et des pouvoirs originaux restent à cadrer avec le MJ.
- Le Shinobimancer reste limité à la création initiale et ne gère pas les éveils Mangekyō.

## 0.1.32.4.2 - Skin maquette Shinobimancer sur base stable

### Modifié

- Reprise complète de `styles/shinobimancer-maquette.css`.
- Le CSS de maquette devient une surcouche visuelle uniquement.
- Conservation du layout fonctionnel porté par `styles/shinobimancer.css` :
  - hauteur adaptive ;
  - scroll interne ;
  - footer visible ;
  - colonnes fonctionnelles ;
  - responsive existant.
- Suppression des règles structurelles dangereuses du prototype précédent.
- Application d’une palette plus proche du PSD :
  - fond parchemin `#ae9b79` ;
  - panneaux sobres ;
  - bordures fines ;
  - ombres supprimées ou fortement réduites ;
  - cartes et boutons harmonisés.

### Notes

- Aucun changement de logique de création.
- Aucun changement de template.
- Les futurs rouleaux, l’étiquette suspendue et les détails dessinés seront portés par des assets dédiés.

---

## 0.1.32.4.1 - Reprise sobre du prototype maquette Shinobimancer

### Modifié

- Reprise complète de la surcouche `styles/shinobimancer-maquette.css`.
- Suppression des faux rouleaux CSS lourds de la première tentative.
- Suppression des dégradés et ombres trop marqués.
- Retour à un fond parchemin plus plat, basé sur `#ae9b79`.
- Allègement du rendu général pour rester plus proche du PSD :
  - panneaux plus plats ;
  - bordures plus fines ;
  - cartes moins texturées ;
  - résumé permanent plus sobre ;
  - barre d’étapes moins massive ;
  - header et footer moins épais.

### Notes

- Cette version reste une surcouche CSS de test.
- Les vrais rouleaux, l’étiquette suspendue et les détails dessinés seront portés plus tard par des assets dédiés.
- Aucun changement de logique de création.
- Aucun changement de template.

---

## 0.1.32.4 - Prototype CSS maquette graphiste Shinobimancer

### Ajouté

- Ajout d’un fichier CSS isolé `styles/shinobimancer-maquette.css`.
- Ajout d’une classe de test `shinobimancer-maquette-v2` sur :
  - la fenêtre de choix Shinobimancer / fiche manuelle ;
  - la fenêtre principale du Shinobimancer.
- Préparation du dossier d’assets futur :
  - `assets/ui/shinobimancer/`.
- Ajout d’une première surcouche visuelle inspirée de la maquette graphiste :
  - fond parchemin plus proche du PSD ;
  - couleur de base `#ae9b79` ;
  - panneaux plus administratifs ;
  - barre d’étapes plus compacte ;
  - simulation CSS du rouleau supérieur ;
  - simulation CSS du rouleau inférieur ;
  - simulation CSS de l’étiquette de registre ;
  - cartes et champs harmonisés avec la nouvelle direction graphique.

### Notes

- Aucun asset graphique définitif n’est encore requis.
- Cette version ne modifie pas la logique de création.
- Cette version ne modifie pas les templates.
- Cette version sert uniquement à tester la direction graphique dans Foundry avant réception des exports propres de la graphiste.

---

## 0.1.32.2 + 0.1.32.3 - Correctif Clan caché / dissimulé

### Corrigé

- Correction du mode `Clan caché / dissimulé` :
  - le Réel Clan impose désormais correctement ses obligations mécaniques ;
  - les affinités forcées du Réel Clan s’appliquent même si la lignée est encore dormante ;
  - les compétences obligatoires du Réel Clan s’appliquent correctement ;
  - le clan officiel/social reste sans impact mécanique direct par défaut.
- Correction de la validation de création :
  - les états `Dans l’ignorance` et `Au courant, pas développé` ne bloquent plus la validation lorsque la Base Lignée brute vaut 1 ;
  - la Lignée effective est traitée comme 0 tant que l’héritage réel n’est pas éveillé ;
  - aucun pouvoir de rang 1 n’est accordé si la Lignée effective vaut 0.
- Correction du Shinobimancer :
  - les cartes de Clan caché ne déclenchent plus le choix de clan classique ;
  - le mode `Clan caché / dissimulé` reste actif après sélection du clan officiel ou du Réel Clan.

### Modifié

- Clarification de la séparation entre :
  - obligations mécaniques du Réel Clan ;
  - pouvoirs de lignée réellement éveillés ;
  - affichage social du clan officiel.
- Ajout d’un affichage de la Lignée effective lorsque celle-ci diffère de la Base Lignée brute.

### Notes

- La Base Lignée reste techniquement à 1 minimum dans la fiche, mais le système utilise une Lignée effective de 0 pour les lignées cachées non éveillées.
- Cette version ne modifie pas encore le fonctionnement détaillé des pouvoirs Mangekyō par œil.

## 0.1.32.1 - Rattrapage héritage caché et dōjutsu avancés

### Ajouté

- Ajout des fondations du mode d’héritage `Clan caché / dissimulé`.
- Ajout de la structure de données `hiddenClan` :
  - clan officiel/social ;
  - réel clan mécanique ;
  - état de connaissance de la lignée ;
  - déblocage narratif MJ ;
  - notes.
- Ajout des états de lignée cachée :
  - `Dans l’ignorance` ;
  - `Au courant, pas développé` ;
  - `Je sais qui je suis`.
- Ajout de l’item `Rinnegan` comme pouvoir de lignée Uchiha permanent.

### Modifié

- Préparation de la logique permettant de distinguer le clan affiché/social du clan réellement utilisé par les mécaniques de Lignée.
- Préparation du Rinnegan comme dōjutsu permanent, non activable et non désactivable.
- Préparation de la correction d’affichage du Tenseigan pour reprendre la logique des rangs verrouillés par validation MJ.

### Notes

- Le Rinnegan est traité dans cette version comme un éveil complet des deux yeux.
- Le cas d’un seul œil éveillé, du Rinne Sharingan ou d’un Rinnegan conservant explicitement une forme de Sharingan sera traité plus tard.
- Cette version ne refond pas encore l’onglet Jutsu, les techniques de lignée, le Susanō complet ou les pouvoirs détaillés du Rinnegan.

## 0.1.32 - Pouvoirs de lignée des clans de test

### Ajouté

- Ajout des items `pouvoirLignee` manquants pour les 7 clans de test :
  - Aburame ;
  - Hyūga ;
  - Katō ;
  - Nara ;
  - Senju ;
  - Inuzuka ;
  - Uchiha.
- Ajout des pouvoirs de lignée Senju, dont `Nature Supérieure — Mokuton`.
- Ajout des fondations de données pour les pouvoirs avancés Uchiha : Magen, Tsukuyomi, Amaterasu, Enton, Kotoamatsukami, Izanagi, Izanami et Susanō.
- Ajout du réglage MJ `Ruche Aburame — bonus de Chakra` :
  - option A : +100 Chakra maximum général ;
  - option B : +100 réserve Kikaichū uniquement.
- Ajout du réglage MJ `Invisibilité Fantomatique Katō` :
  - option A : pouvoir passif ;
  - option B : pouvoir maintenu avec activation 10 / entretien 5.

### Modifié

- Extension de la synchronisation automatique des pouvoirs de lignée depuis l’héritage et la Base Lignée.
- Les pouvoirs de lignée gérés automatiquement couvrent désormais les progressions des clans de test non-Uchiha.
- Le Tenseigan n’est accordé qu’aux Hyūga de Lignée 10 avec validation MJ.
- Le Katō respecte le trou du rang 8 : aucun pouvoir inventé n’est ajouté à ce rang.
- Les pouvoirs avancés Uchiha ne sont pas accordés automatiquement afin de préserver le futur système de choix par œil.

### Notes

- Cette version ajoute les données et la synchronisation des pouvoirs, mais n’automatise pas encore les effets complexes.
- Les techniques de lignée détaillées, les bonus de compétences, le compagnon Inuzuka, la possession Katō, le Susanō et les pouvoirs Mangekyō avancés restent des chantiers séparés.

## 0.1.31.5 - Correction définitive anti-doublon paquetage

### Corrigé

- Correction de l’anti-doublon du paquetage de départ après déverrouillage et revalidation.
- Les métadonnées du paquetage sont désormais conservées lors de la préparation de l’inventaire custom :
  - `sourceItemId` ;
  - `sourceItemUuid` ;
  - `creationGranted` ;
  - `grantedAtCreation` ;
  - `creationPackage` ;
  - `grantedAt` ;
  - `grantedBy` ;
  - `flags`.
- Ajout d’une sécurité par noms d’items :
  - si tous les objets attendus du paquetage sont déjà présents dans `system.inventory.items`, le paquetage n’est pas attribué une seconde fois.
- Correction du cas où les embedded Items existent déjà mais où le miroir custom était recréé à tort.

### Notes

- Cette version ne supprime pas automatiquement les doublons déjà créés sur les acteurs existants.
- Les doublons déjà présents doivent être nettoyés manuellement si nécessaire.

## 0.1.31.4 - Portrait PJ guidé et sécurité paquetage

### Ajouté

- Ajout d’un upload guidé du portrait depuis le Shinobimancer.
- Ajout d’une fenêtre “Changer le portrait” :
  - les joueurs peuvent importer une image depuis leur ordinateur ;
  - le MJ peut importer une image ou choisir une image existante via le FilePicker classique.
- Ajout de deux réglages système :
  - `portraitUploadSource`, par défaut `forgevtt` ;
  - `portraitUploadPath`, par défaut `worlds/Naruto/PJ`.

### Modifié

- Le clic sur le portrait du Shinobimancer n’ouvre plus directement l’explorateur Foundry pour les joueurs.
- Le chemin canonique des portraits PJ devient `worlds/Naruto/PJ`.

### Corrigé

- Renforcement de l’anti-doublon du paquetage de départ après déverrouillage et revalidation.
- Si le paquetage est déjà présent dans l’inventaire custom ou en embedded Items, il n’est plus attribué une seconde fois.

## 0.1.31.3 - Correction paquetage dans inventaire custom

### Corrigé

- Correction de l’attribution du paquetage de départ dans l’onglet Inventaire :
  - les items sont toujours créés comme embedded Items Foundry ;
  - une entrée miroir est maintenant créée dans `system.inventory.items` ;
  - l’inventaire custom de la fiche affiche désormais les armes, consommables et objets accordés.
- Correction de l’anti-doublon du paquetage :
  - détection des embedded Items déjà accordés ;
  - détection des entrées d’inventaire custom déjà accordées ;
  - possibilité de réparer un ancien paquetage embedded sans miroir custom lors d’une revalidation.
- Ajout de logs console pour diagnostiquer la synchronisation entre embedded Items et inventaire custom.

### Technique

- Maintien des types Item Foundry en français :
  - `arme`
  - `armure`
  - `equipement`
  - `consommable`
- Maintien des types internes d’inventaire custom en anglais :
  - `weapon`
  - `armor`
  - `consumable`
  - `misc`

## 0.1.31.2 - Correctifs inventaire, Senju et validation Chakra

### Corrigé

- Correction du clan Senju :
  - Doton est désormais imposé comme affinité principale ;
  - Suiton est désormais imposé comme affinité secondaire ;
  - les deux affinités sont verrouillées dans le Shinobimancer.
- Correction de l’attribution du paquetage de départ :
  - création des items via `createEmbeddedDocuments("Item", ...)` ;
  - ajout de logs console détaillés ;
  - notification du nombre d’items réellement créés ;
  - interruption de la validation si aucun item n’est créé.
- Correction de la validation de création :
  - une spécialisation de Chakra de départ est désormais obligatoire ;
  - le dossier ne peut plus être validé si le personnage a trop de spécialisations.

### Modifié

- Les Bases affichent désormais le coût XP du niveau suivant.
- Les Compétences affichent désormais le coût XP du niveau suivant.
- Les cartes d’affinités affichent davantage d’informations quand elles sont disponibles :
  - description ;
  - style de jeu ;
  - forces ou tags de prévisualisation.

## 0.1.31.1 - Modification de léger bug et affichage visuel enrichie

### Modifié

- Correction de la sélection des compétences initiales depuis le Shinobimancer :
  - clic sur une compétence disponible avec confirmation ;
  - clic sur une compétence manuelle déjà choisie pour proposer son retrait ;
  - maintien des boutons `+` / `-` pour monter ou descendre les valeurs.
- Correction de la lisibilité des cartes sélectionnées :
  - bordure renforcée ;
  - sceau visuel “Sélectionné” ;
  - état visible pour village, héritage, clan, affinités, compétences et équipement.
- Correction de l’affichage du Nindō : la description du Nindō prédéfini sélectionné est désormais visible dans l’étape Identité.
- Correction du cadrage du portrait dans l’étape Identité.
- Renforcement de l’attribution de l’équipement de départ à la validation finale.

## 0.1.31 — Shinobimancer éditable, kamon de clans et équipement sélectionnable

### Ajouté

- Préparation du Shinobimancer éditable sans refonte graphique.
- Ajout de la structure de choix d’équipement de départ dans `progression.creation.startingEquipment`.
- Ajout d’un choix d’arme principale à la création.
- Ajout d’un choix de 2 lots d’armes de jet ou consommables ninja.
- Ajout des armes de départ suivantes :
  - Tantō ;
  - Wakizashi ;
  - Katana ;
  - Ninjatō ;
  - Senbon — lot de jet.
- Ajout de l’attribution automatique du paquetage de départ lors de la validation finale.
- Ajout de flags sur les items attribués à la création pour éviter les doublons.
- Ajout de l’édition directe dans le Shinobimancer :
  - identité ;
  - portrait ;
  - village ;
  - héritage ;
  - clan ;
  - bases ;
  - affinités ;
  - spécialisations de Chakra ;
  - compétences ;
  - équipement.
- Ajout des kamon SVG de clans via la convention `assets/clans/kamon_<clan>.svg`.
- Ajout du choix du Nindō dans l’étape Identité.

### Modifié

- Le paquetage de départ n’est plus seulement une prévisualisation fixe.
- Les pilules et kits deviennent des éléments fixes du paquetage.
- Les armes et lots de combat deviennent des choix de création.
- Le compendium `Équipements de départ` doit être réimporté après mise à jour du JSON.
- Les cartes du Shinobimancer restent visuellement identiques mais deviennent interactives.
- Les cartes de village, héritage, clan, affinités et équipement sont désormais cliquables.
- Les Bases et Compétences utilisent des boutons `+` / `-` directement dans le Shinobimancer.
- Les spécialisations de Chakra sont intégrées à l’étape Affinités.
- Les affinités imposées par clan sont verrouillées visuellement dans les cartes.

### Corrigé

- Prévention de la validation finale si l’équipement de départ requis n’est pas sélectionné.
- Prévention de la double attribution du paquetage si la création est déverrouillée puis revalidée.

## 0.1.30 — Shinobimancer : finalisation fonctionnelle du dossier

### Ajouté

- Ajout de la finalisation de création côté joueur : un joueur propriétaire peut désormais valider son dossier de Shinobi sans intervention obligatoire du MJ.
- Ajout d’un état de finalisation exploitable dans le Shinobimancer :

  - `canFinalizeCreation`
  - `creationLocked`
- Ajout d’une validation bloquante pour le clan Katō : un seul acteur `shinobi` validé peut porter ce clan dans le monde.
- Ajout d’une gestion structurée des affinités imposées par héritage/clan via des entrées `forced` contenant notamment :

  - `slot`
  - `key`
  - `source`
  - `sourceKey`
  - `locked`
- Ajout des champs d’identité étendue dans le modèle acteur :

  - âge
  - naissance
  - sexe
  - taille
  - poids
  - cheveux
  - yeux
  - sensei
  - équipe
  - notes

### Modifié

- Le champ principal `actor.name` est désormais présenté comme “Nom du ninja”.
- Le champ `system.identity.prenom` est désormais présenté comme “Surnom Shinobi”.
- La validation de création n’est plus réservée au MJ : le MJ conserve seulement le déverrouillage exceptionnel.
- Les warnings ne bloquent plus la finalisation : seules les erreurs bloquantes empêchent la validation du dossier.
- Les affinités forcées sont désormais appliquées mécaniquement :

  - Uchiha : Katon imposé en affinité principale.
  - Senju : Doton imposé en affinité principale et Suiton imposé en affinité secondaire.
- Le résumé final du Shinobimancer affiche désormais une validation de dossier plutôt qu’un futur sceau MJ mécanique.
- L’étape équipement précise que le paquetage reste en prévisualisation et sera automatisé dans une future version.

### Corrigé

- Clarification de la séparation entre erreurs bloquantes et avertissements non bloquants.
- Compatibilité renforcée avec les affinités forcées sous forme d’objets structurés plutôt que simples chaînes.
- Le panneau droit et le résumé final disposent maintenant des données nécessaires pour gérer l’état de validation/finalisation.

## [0.1.29.2]

### Corrigé

- Correction mineure de la hauteur maximale de la fenêtre principale du Shinobimancer.
- La fenêtre principale n’est plus bridée à environ 750 px de hauteur.
- La hauteur maximale dépend désormais du viewport disponible.
- Les grands écrans peuvent agrandir davantage la fenêtre vers le bas.
- Les petits écrans conservent le scroll interne du corps du Shinobimancer.

### Notes

- Aucun changement de logique de création.
- Aucun changement de template.
- La largeur minimale ajoutée en `0.1.29.1` reste inchangée.
- La hauteur `740 px` reste la hauteur d’ouverture par défaut, mais n’est plus un plafond absolu.

---

## [0.1.29.1]

### Corrigé

- Correction mineure de la largeur de la fenêtre principale du Shinobimancer.
- La fenêtre principale passe à une largeur par défaut plus confortable pour la pré-maquette complète.
- Ajout d’une largeur minimale afin d’éviter le chevauchement entre le panneau central et le résumé permanent.
- Ajout d’une sécurité de scroll horizontal si la fenêtre est forcée sous la largeur minimale.

### Notes

- Aucun changement de logique de création.
- Aucun changement de template.
- La fenêtre d’accueil du choix Shinobimancer / fiche manuelle reste inchangée.

---

## [0.1.29]

### Ajouté

- Ajout d’une pré-maquette complète navigable du Shinobimancer.
- Ajout des 9 étapes visibles :
  - Identité ;
  - Village ;
  - Héritage ;
  - Clan / Voie ;
  - Bases / XP ;
  - Affinités ;
  - Compétences ;
  - Équipement ;
  - Résumé final.
- Ajout d’une navigation réelle entre les étapes avec :
  - bouton Retour ;
  - bouton Suivant ;
  - clic sur les étapes de la barre latérale ;
  - sauvegarde de l’étape courante via `currentStep`.
- Ajout d’une toile SVG des Bases.
- La toile des Bases utilise désormais les 7 axes :
  - Corps ;
  - Armes ;
  - Taijutsu ;
  - Ninjutsu ;
  - Genjutsu ;
  - Esprit ;
  - Lignée.
- Ajout de la toile des Bases dans l’étape `Bases / XP`.
- Ajout d’une reprise compacte de la toile des Bases dans le `Résumé final`.
- Ajout d’écrans de prévisualisation pour :
  - les villages ;
  - les modes d’héritage ;
  - les 7 clans de test ;
  - les affinités ;
  - les compétences ;
  - le paquetage ninja de départ.
- Ajout d’un résumé final inspiré d’un dossier officiel / fiche papier de Shinobi.
- Ajout d’un bouton de prévisualisation du futur sceau de validation MJ.

### Modifié

- Réorganisation de l’ordre des étapes :
  - les Bases / XP passent avant les Affinités ;
  - les Affinités passent avant les Compétences.
- Le Shinobimancer devient une vraie pré-maquette graphique complète avant la version fonctionnelle `0.2.0`.

### Notes

- Cette version reste une pré-maquette : les choix ne sont pas encore tous appliqués automatiquement.
- La validation finale réelle, l’attribution automatique complète et les verrous mécaniques restent prévus pour `0.2.0`.
- Le mode PNJ MJ reste une piste future.

---

## [0.1.28.2]

### Corrigé

- Correction mineure du CSS du Shinobimancer.
- Le fond de la zone centrale scrollable est désormais porté par le conteneur principal.
- Les styles de colonnes restent visibles lors du défilement global du Shinobimancer.
- Les séparations visuelles gauche / centre / droite restent cohérentes même lorsque le contenu dépasse la hauteur visible initiale.

### Notes

- Aucun changement de logique de création.
- Aucun changement de template.
- Cette version corrige uniquement l’habillage visuel de la pré-version Shinobimancer.

---

## [0.1.28.1]

### Corrigé

- Correction de la logique d’ouverture du Shinobimancer.
- Fermer la fenêtre de choix ne compte plus comme un choix de création.
- Ajout d’un mode de création persistant sur l’acteur :
  - aucun mode choisi ;
  - fiche manuelle ;
  - Shinobimancer.
- Si le mode Shinobimancer est choisi, l’ouverture d’un Shinobi non validé relance directement le Shinobimancer.
- Préparation de la reprise à la dernière étape via `currentStep`.
- La fiche manuelle n’est plus conservée ouverte derrière le Shinobimancer lorsque celui-ci est le mode choisi.
- Correction de la hauteur de la fenêtre principale du Shinobimancer.
- Ajout d’un scroll global unique sur le corps du Shinobimancer pour garder ensemble la barre d’étapes, le panneau central et le résumé permanent.

### Notes

- La navigation complète entre les étapes reste prévue pour la vraie `0.2.0`.
- Le mode PNJ MJ reste une piste future et n’est pas encore ajouté dans cette version.
- Cette version reste une pré-version visuelle destinée à stabiliser l’expérience avant la maquette définitive.

---

## [0.1.28]

### Ajouté

- Ajout d’une pré-version visuelle du `Shinobimancer`.
- Ajout d’une grande fenêtre d’accueil de création avec choix entre :
  - utiliser le Shinobimancer ;
  - ouvrir la fiche manuelle.
- Ajout d’une première fenêtre Shinobimancer avec :
  - barre latérale verticale d’étapes ;
  - panneau central ;
  - résumé permanent à droite ;
  - première étape `Identité`.
- Ajout des templates :
  - `templates/apps/shinobimancer-choice.hbs` ;
  - `templates/apps/shinobimancer.hbs`.
- Ajout du script dédié :
  - `scripts/apps/shinobimancer.js`.
- Ajout du style dédié :
  - `styles/shinobimancer.css`.
- Ajout des commandes de test :
  - `game.naruto25e.openShinobimancerChoice(actor)` ;
  - `game.naruto25e.openShinobimancer(actor)`.

### Modifié

- Le manifeste charge désormais le CSS dédié du Shinobimancer.
- À l’ouverture d’un Shinobi non validé, la fiche peut proposer le choix entre Shinobimancer et fiche manuelle.

### Notes

- Cette version sert de support de maquette graphique.
- Le Shinobimancer n’est pas encore un assistant de création complet.
- Les étapes suivantes, la sauvegarde progressive, l’attribution d’équipement et la validation finale restent prévues pour la vraie `0.2.0`.

---

## [0.1.27.1]

### Corrigé

- Correction d’un bug où certains champs texte se remplissaient progressivement de virgules.
- Suppression des doublons de champs éditables dans plusieurs onglets de la fiche.
- Le bloc Nindō de l’onglet Background devient un rappel en lecture seule.
- Les conditions, aggravations, faiblesses et notes de combat affichées dans `Effets / États` deviennent un résumé en lecture seule.

### Notes

- Les champs Nindō restent modifiables depuis le bloc Nindō principal.
- Les champs d’états de combat restent modifiables depuis l’onglet Combat / Actions.

---

## [0.1.27]

### Ajouté

- Ajout de l’onglet `Effets / États` sur la fiche Shinobi.
- Ajout de l’onglet `Background` sur la fiche Shinobi.
- Ajout de champs libres pour :
  - loyauté ;
  - doctrine ;
  - vie quotidienne ;
  - religion ;
  - préjugés ;
  - arcs narratifs / Roue Narrative ;
  - balance narrative manuelle ;
  - notes de background.
- Ajout d’un compendium `Équipements de départ`.
- Ajout d’un fichier JSON source `equipements-depart.json`.
- Ajout des premiers items d’équipement de départ :
  - Kunaï ;
  - Shuriken ;
  - Note explosive ;
  - Pilule du soldat ;
  - Pilule de chakra mineure ;
  - Kit de premiers soins ;
  - Kit de survie ;
  - Kit technique.
- Ajout d’avertissements non bloquants dans le résumé de création pour les 7 clans test.

### Modifié

- L’importeur MJ importe désormais aussi les équipements de départ.
- L’auto-import non destructif peut importer les équipements de départ manquants.
- Le résumé de création prépare mieux les informations utiles au futur Charactomancer.
- Le résumé de création affiche désormais les avertissements non bloquants.

### Notes

- La Roue Narrative reste volontairement en version champ libre / balance manuelle.
- L’attribution automatique de l’équipement de départ est repoussée au Charactomancer.
- Le bouton de calcul de blessures depuis la carte d’attaque est repoussé à `0.2.1`.
- Les ActiveEffects Foundry, icônes token, onglet Actions complet, greffes, techniques automatisées et Kagemane/Kage Nui automatisés restent prévus après `0.2.0`.

---

## [0.1.26.4]

### Corrigé

- Correction du cas Nara : le pouvoir de rang 1 est désormais traité comme un passif de socle.
- Renommage du pouvoir Nara `Affinité aux ombres` en `Pouvoir des Ombres`, plus conforme au databook.
- Les pouvoirs de lignée passifs ne peuvent plus être activés ou désactivés.
- Les pouvoirs de lignée passifs ne consomment plus d’utilisation de lignée.
- Les pouvoirs de lignée passifs ne sont plus ajoutés aux pouvoirs maintenus actifs.

### Modifié

- La synchronisation automatique des pouvoirs de lignée met désormais à jour les pouvoirs déjà présents sur l’acteur lorsque les données source ont changé.
- Les anciens pouvoirs automatiques obsolètes peuvent être retirés ou resynchronisés proprement.
- L’affichage des pouvoirs de lignée distingue désormais les passifs des pouvoirs activables/maintenus.

### Notes

- Kagemane et Kage Nui ne sont pas encore automatisés : ils seront traités plus tard comme techniques de clan Nara actives.
- Mokuton reste une nature/compétence de chakra supérieure et ne consomme pas d’utilisation de lignée.
- Les techniques de clan classiques ne consomment pas automatiquement d’utilisation de lignée.

---

## [0.1.26.3]

### Corrigé

- Correction du compteur de pouvoirs de lignée : la dépense d’une utilisation reste désormais correctement affichée et conservée après recalcul de la fiche.
- Stabilisation de la persistance des valeurs base/bonus/max du compteur de lignée lors d’une dépense.

## [0.1.26.2]

### Ajouté

- Ajout d’une première confrontation automatisée attaque/défense pour les attaques ARM et TAI basiques.
- Les attaques ARM/TAI peuvent désormais utiliser la cible token sélectionnée.
- La cible défend automatiquement avec Esquive ou Parade.
- Si plusieurs défenses sont valides, le propriétaire de la cible ou le MJ peut choisir la défense utilisée.
- Ajout de l’indicateur `Action de lignée ce tour : Disponible / Déjà utilisée`.

### Modifié

- Les utilisations de pouvoirs de lignée par session sont désormais calculées automatiquement :
  - base = score effectif de Lignée ;
  - bonus = spécialisation Chakra Héréditaire ;
  - total = base + bonus.
- Le champ manuel `Utilisations de lignée de base` est remplacé par un affichage calculé.
- Dépenser une utilisation de pouvoir de lignée consomme aussi l’action de lignée du tour.
- Activer un pouvoir de lignée activable comme Sharingan, Mangekyō, Byakugan ou Yūrengan consomme désormais une utilisation de lignée.
- Le reset de round rend l’action de lignée à nouveau disponible.
- Le reset de session MJ restaure les utilisations de lignée et libère l’action de lignée du tour.

### Notes

- Mokuton n’est pas concerné : il reste une nature/compétence de chakra supérieure, pas un pouvoir actif de lignée par session.
- Les techniques de clan classiques ne consomment pas automatiquement d’utilisation de lignée.
- Seuls les pouvoirs activables passant par le système de pouvoirs de lignée consomment actuellement cette ressource.
- L’application automatique complète dégâts → Vigueur/Caractère → blessures reste volontairement séparée pour éviter une automatisation prématurée.

---

## [0.1.26.1]

### Ajouté

- Ajout de l’intégration de l’initiative Naruto au Combat Tracker Foundry.
- Le bouton d’initiative de la fiche met désormais à jour l’initiative du combattant dans le Combat Tracker si l’acteur est en combat.
- Le bouton d’initiative du Combat Tracker utilise désormais la logique Naruto pour les acteurs Shinobi.
- Ajout d’un paramètre MJ `Relancer l’initiative à chaque round`.

### Modifié

- Au changement de round, les compteurs de round des Shinobi sont automatiquement réinitialisés :
  - interceptions ARM ;
  - interceptions TAI ;
  - action simple ;
  - action complexe ;
  - action retardée.
- Le reset automatique de round ne génère plus de notification par acteur.
- L’entretien des pouvoirs maintenus reste déclenché au changement de tour comme auparavant.

### Notes

- La relance automatique de l’initiative à chaque round est désactivée par défaut.
- Les tables qui préfèrent une initiative fixe façon Foundry classique peuvent conserver le comportement standard.
- La relance automatique par round reste une option MJ pour coller davantage au databook.

---

## [0.1.26]

### Ajouté

- Ajout d’une économie d’action minimale sur la fiche :
  - action simple disponible ;
  - action complexe disponible ;
  - action retardée en réserve ;
  - notes d’action.
- Ajout d’un calculateur MJ de blessures :
  - dégâts entrants ;
  - défense ciblée : Vigueur ou Caractère ;
  - type de dégâts : PHY, ELEM, ENVI, EMO, PSY, MYTH ;
  - calcul du nombre de Blessures selon les degrés de 5.
- Ajout de champs de suivi simples pour :
  - conditions ;
  - aggravations ;
  - faiblesses.

### Modifié

- L’initiative utilise désormais la compétence Physique comme base, conformément au databook.
- Les dégâts basiques sont rapprochés des formules papier :
  - ARM : COR + ARM + bonus arme provisoire + bonus divers ;
  - TAI : COR + TAI + bonus divers.
- Les interceptions utilisent désormais la table papier :
  - score 1 : 1 interception ;
  - score 4 : 2 interceptions ;
  - score 6 : 3 interceptions ;
  - score 8 : 4 interceptions ;
  - score 10 : 5 interceptions.
- Le bonus manuel d’interception ajoute des utilisations d’interception, pas un bonus au jet.
- Le reset de round réinitialise aussi l’économie d’action minimale.

### Notes

- Les attaques depuis armes équipées et techniques restent prévues pour une itération ultérieure.
- L’onglet Actions complet façon PF2e est repoussé à une future refonte de fiche.
- Le calculateur de blessures affiche un résultat en chat mais n’applique pas encore automatiquement les blessures à une cible.

---

## [0.1.25.6]

### Ajouté

- Ajout du mode `Relatif plafonné` pour la désactivation du bonus actif du Mangekyō Sharingan.
- Mémorisation du Chakra restant après paiement du coût d’activation du Mangekyō afin d’éviter les gains abusifs de Chakra en mode relatif plafonné.
- Ajout d’un paramètre MJ `Auto-import des données système`.
- Ajout d’un auto-import non destructif des compendiums au lancement du monde :
  - MJ uniquement ;
  - ajoute les entrées manquantes depuis les fichiers JSON ;
  - ne vide pas les compendiums déjà remplis ;
  - conserve l’import manuel existant.

### Modifié

- Le paramètre de désactivation du bonus actif Mangekyō propose désormais trois modes :
  - relatif classique ;
  - relatif plafonné ;
  - perte sèche de 200 Chakra actuel.
- Le mode relatif plafonné empêche le Mangekyō Sharingan de devenir une source de régénération de Chakra par activation/désactivation répétée.

### Notes

- Le mode relatif classique reste disponible pour les MJ qui souhaitent une lecture plus généreuse ou dramatique du Mangekyō.
- Le Chakra négatif n’est toujours pas automatisé : la perte sèche reste plafonnée à 0.

---

## [0.1.25.5]

### Ajouté

- Ajout du pouvoir de lignée `Mangekyō Sharingan`.
- Attribution automatique du Mangekyō Sharingan pour les Uchiha de Lignée 5+ lorsque le Mangekyō est validé par le MJ.
- Ajout d’un paramètre MJ `Bonus Chakra Mangekyō` :
  - mode passif : +200 Chakra maximum dès possession validée ;
  - mode actif : +200 Chakra maximum et actuel à l’activation.
- Ajout d’un paramètre MJ de désactivation du bonus actif Mangekyō :
  - conservation relative du pourcentage de Chakra ;
  - perte sèche de 200 Chakra actuel.
- Ajout d’un fallback JSON pour les pouvoirs de lignée si le compendium `pouvoirs-lignee` est vide, incomplet ou introuvable.

### Modifié

- Le Mangekyō Sharingan ne remplace pas `Sharingan — 3 tomoe` dans les items possédés.
- À l’activation, le Mangekyō Sharingan surclasse le Sharingan classique actif.
- Activation directe du Mangekyō : 30 Chakra.
- Activation depuis un Sharingan classique déjà actif : 20 Chakra.
- Entretien du Mangekyō : 10 Chakra par tour.
- L’activation seule du Mangekyō ne compte pas comme une utilisation oculaire dégradante.

### Notes

- Les techniques propres au Mangekyō comme Amaterasu, Tsukuyomi, Kamui, Kotoamatsukami, Enton et Susanō restent prévues pour une itération ultérieure.
- Le Chakra négatif n’est pas encore automatisé : en mode perte sèche, le Chakra actuel est plafonné à 0.

---

## [0.1.25.4]

### Ajouté

- Ajout de la synchronisation automatique des pouvoirs de lignée selon le clan et la Base Lignée.
- Ajout automatique des pouvoirs de lignée depuis le compendium `Pouvoirs de lignée`.
- Retrait automatique des pouvoirs de lignée gérés lorsqu’ils ne correspondent plus au clan actuel du personnage.
- Gestion du remplacement naturel du Sharingan selon la Base Lignée :
  - Lignée 1 : Sharingan — 1 tomoe ;
  - Lignée 2 : Sharingan — 2 tomoe ;
  - Lignée 3+ : Sharingan — 3 tomoe.
- Support initial des clans suivants pour l’attribution automatique :
  - Uchiha ;
  - Hyūga ;
  - Katō ;
  - Aburame ;
  - Nara ;
  - Inuzuka.
- Les cartes chat d’activation et de désactivation des pouvoirs de lignée affichent désormais un rappel d’effet.

### Notes

- Le clan Senju ne reçoit pas encore de pouvoir de lignée automatique dédié : Mokuton reste géré par la compétence de clan et les techniques associées.
- Les greffes, implants, multiplicateurs de coût hors lignée et exceptions de compatibilité seront traités dans une itération future.
- L’habillage visuel avancé des cartes chat sera traité plus tard avec la refonte visuelle des fiches acteur/item.

---

## [0.1.25.3]

### Ajouté

- Ajout du fichier JSON `data/pouvoirs-lignee/pouvoirs-lignee.json`.
- Ajout de l’import des pouvoirs de lignée vers le compendium `Pouvoirs de lignée`.
- Extension de l’importeur MJ pour importer à la fois les techniques et les pouvoirs de lignée.
- Ajout des premiers pouvoirs de lignée importables :
  - Sharingan — 1 tomoe ;
  - Sharingan — 2 tomoe ;
  - Sharingan — 3 tomoe ;
  - Byakugan ;
  - Yūrengan ;
  - Kikaichū — Colonie symbiotique ;
  - Affinité aux ombres ;
  - Gardien du clan Inu.
- Les Sharingan 1, 2 et 3 tomoe sont séparés afin d’exploiter directement le rang de Lignée du personnage.

### Notes

- Aucun pouvoir de lignée Senju/Mokuton n’est ajouté pour l’instant : Mokuton reste géré par la compétence de clan et les techniques associées.
- L’attribution automatique des pouvoirs selon le clan et le rang de Lignée sera traitée dans une itération suivante.
- Les prérequis stricts de clan, les greffes et les multiplicateurs de Chakra hors lignée d’origine seront traités plus tard avec la logique d’implantation.

---

## [0.1.25.2.1]

### Corrigé

- Le bouton de résolution manuelle de l’entretien des pouvoirs de lignée est désormais cadré comme outil MJ.
- Ajout d’un récapitulatif non destructif des coûts d’entretien actifs sur la fiche Shinobi.
- Le récapitulatif affiche le nombre de pouvoirs actifs, l’entretien total, la régénération passive, le coût net et le Chakra restant après entretien.
- Correction du dialogue d’entretien : si la sélection choisie ne peut pas être maintenue, le dialogue se rouvre au lieu de laisser les pouvoirs actifs sans paiement valide.

### Confirmé

- Le comportement Aburame / Kikaichū est correct : la réserve dépend bien de la Lignée et peut absorber une grande partie du Chakra si le personnage n’a pas assez investi en Chakra brut.

---

## [0.1.25.2]

### Ajouté

- Ajout du moteur minimal des pouvoirs de lignée activables.
- Ajout des coûts d’activation et d’entretien sur les items `pouvoirLignee`.
- Ajout du suivi des pouvoirs de lignée actifs sur la fiche Shinobi.
- Ajout de l’activation et de la désactivation des pouvoirs de lignée depuis la fiche.
- Ajout de la dépense immédiate du coût d’activation en Chakra.
- Ajout de l’entretien automatique au changement de tour en combat.
- Ajout du calcul d’entretien cumulé : tous les coûts actifs sont additionnés avant soustraction unique de la régénération passive.
- Ajout d’une fenêtre de choix si le Chakra est insuffisant ou si l’entretien franchit un seuil critique.
- Ajout du drag & drop des items `pouvoirLignee` sur la fiche Shinobi.

### Notes

- Les premiers pouvoirs concrets comme Sharingan, Byakugan et Yūrengan seront ajoutés au compendium dans une itération dédiée de la 0.1.25.x.
- La fenêtre de choix d’entretien est actuellement gérée côté MJ pendant le combat.

---

## [0.1.25.1]

### Modifié

- Consolidation des données de lignée pour les 7 clans de test du futur Charactomancer.
- Extension de la progression Hyūga avec les rangs Byakugan, Art du Poing Faible, Vision Spatiale, Intensité Spirituelle, Hakke Kūshō, 359 Degrés, Hakke Rokujūyon Shō, Force Mystique, Hakkeshō Kaiten et Tenseigan.
- Extension de la progression Senju avec les rangs Mokuton, Force Naturelle, Jukai Shirei, Vague de Chakra, Shichūrō, Énergie Mystique, Jukai Gōhei, Piliers Mythiques, Jukai Heki et Jukai Kōtan.
- Extension de la progression Aburame avec Esprit de l’Essaim, Empathie, Kaisan, Ruche et Ryūsei.
- Ajout de la progression Katō avec Yūrengan, Forteresse Mentale, Ikiryō, Invisibilité Fantomatique, Zekkyou, Amplificateur, Possession Spectrale, Himei et Reika.
- Ajout de la progression Inuzuka avec Gardien du clan Inu, Pisteur de Chikushōdō, Forme Sauvage, Empathie Animale, Gatsuga, Flair, Sōtōrō, Crocs & Fourrure, Appeler la Meute et Totem.
- Mise à jour des données de création Katō et Inuzuka pour mieux préparer leur affichage dans le futur Charactomancer.

### À vérifier plus tard

- Le rang 8 Katō n’a pas été trouvé dans l’extrait exploitable du databook et reste à clarifier avant automatisation complète.
- Les effets actifs Byakugan, Yūrengan, Sharingan, Forme Sauvage, Kikaichū et autres pouvoirs de lignée devront être transformés en vrais items activables dans une version ultérieure.

---

## [0.1.25]

### Ajouté

- Ajout du choix fonctionnel des pouvoirs du Mangekyō Sharingan en mode Uchiha original.
- Ajout du choix séparé du pouvoir de l’œil droit et de l’œil gauche.
- L’œil gauche est verrouillé tant que le pouvoir de l’œil droit n’a pas été confirmé côté joueur.
- Ajout d’une validation PJ puis MJ pour chaque pouvoir oculaire.
- Ajout du blocage d’Enton / Kagutsuchi si l’autre œil ne possède pas Amaterasu.
- Ajout d’un suivi des utilisations du Mangekyō Sharingan.
- Ajout d’un affichage de santé oculaire pour les deux yeux.
- Ajout des états d’œil : sain, fatigué, abîmé, aveugle, Mangekyō Éternel et Rinnegan.
- Ajout d’un seuil de quête EMS recommandé à partir de 30 utilisations.
- Ajout d’un seuil de cécité à 50 utilisations.
- Ajout d’un malus de Vigilance conseillé par tranche de 10 utilisations du Mangekyō.

### Préparé

- Préparation de la future page Santé / États / Blessures.
- Préparation de la future page Implantation pour les yeux greffés, Sharingan implanté, Byakugan implanté, EMS et Rinnegan.
- Préparation d’une automatisation future des malus de Vigilance liés à la dégradation oculaire.

---

## [0.1.24.2]

### Corrigé

- Correction d’une erreur JavaScript bloquant le chargement du système :
  - suppression d’une double déclaration de `gmOptions` dans `shinobi-sheet.js`.
- Correction du problème empêchant l’enregistrement des paramètres système Naruto et le chargement de la fiche Shinobi personnalisée.

---

## [0.1.24.1]

### Corrigé

- Correction de la structure du clan custom :
  - le clan custom n’est plus un type d’héritage ;
  - il devient une option spéciale de `Clan principal`, visible uniquement si le MJ l’autorise.
- Correction des champs actifs selon le type d’héritage :
  - `Clan` : Clan principal actif, Voie et Clan secondaire bloqués ;
  - `Voie` : Voie active, Clan principal et Clan secondaire bloqués ;
  - `Clan hybride` : Clan principal et Clan secondaire actifs, Voie bloquée ;
  - `Voie hybridée` : Clan principal et Voie actifs, Clan secondaire bloqué.
- Correction de la logique de `Voie hybridée`, qui repose désormais sur `Clan principal + Voie`, et non sur `Voie + Clan secondaire`.
- Correction des choix imposés du clan custom :
  - remplacement des 2 compétences + 2 affinités par 2 choix imposés maximum au total ;
  - chaque choix peut être une compétence normale ou une affinité.
- Correction de sécurité pour les anciennes données `mandatorySkills` / `mandatoryAffinities`.

### Conservé

- Les corrections Uchiha de la 0.1.24 sont conservées.

---

## [0.1.24]

### Ajouté

- Ajout du paramètre monde MJ `Pouvoirs Uchiha` :
  - `Classique — progression papier`
  - `Original — pouvoirs par œil`
- Ajout des données préparatoires des pouvoirs oculaires Uchiha :
  - Amaterasu
  - Enton / Kagutsuchi
  - Tsukuyomi
  - Kamui
  - Kotoamatsukami / Allégeance
  - Pouvoir original
- Ajout d’une progression Uchiha alternative en mode `Pouvoirs Uchiha originaux`.
- Ajout d’une règle de prévisualisation : Enton / Kagutsuchi nécessite Amaterasu dans l’autre œil.
- Ajout d’une règle de prévisualisation : Izanagi et Izanami ne nécessitent pas le Mangekyō Sharingan.
- Ajout d’une fondation de clan custom :
  - autorisation MJ par fiche ;
  - nom de clan custom ;
  - résumé court ;
  - jusqu’à 2 compétences de clan imposées ;
  - jusqu’à 2 affinités imposées ;
  - notes MJ/lore.

### Modifié

- Les rangs Uchiha nécessitant le Mangekyō sont désormais explicitement limités aux rangs concernés.
- Izanagi / Izanami ne sont plus traités comme des techniques nécessitant automatiquement le Mangekyō.
- L’onglet Lignée affiche désormais des explications spécifiques au mode de pouvoirs Uchiha choisi par le MJ.
- Le futur Charactomancer pourra distinguer le mode Uchiha classique du mode Uchiha original.

### Préparé

- Préparation du choix futur des pouvoirs d’œil droit et d’œil gauche du Mangekyō Sharingan.
- Préparation d’une future fiche/progression dédiée au Susanō.
- Préparation d’un futur vrai éditeur de clan custom, sans import massif ni texte libre incontrôlé pour les compétences/affinités.

---

## [0.1.23]

### Ajouté

- Ajout d’une première couche de données pédagogiques pour les affinités de Chakra.
- Les affinités Chakra disposent désormais d’un style de jeu, de forces, de limites, de conseils de création, de compétences associées et de tags de prévisualisation.
- Ajout de `Fūin` dans les affinités spéciales affichables.
- Ajout d’une première couche de données pédagogiques de clan pour le futur Charactomancer.
- Ajout des données de création pour les clans de test du Charactomancer 0.2.0 : Uchiha, Senju, Hyūga, Kato, Nara, Aburame et Inuzuka.
- Ajout de cartes d’aide de création dans l’onglet Chakra.
- Ajout de cartes d’aide de création dans l’onglet Lignée.

### Modifié

- Les affinités Chakra ne sont plus de simples descriptions courtes : elles deviennent des données de prévisualisation exploitables par le futur Charactomancer.
- Les données de clan commencent à distinguer résumé, lore, conseil de création, départ, déblocages futurs, avertissements narratifs et archétypes conseillés.

### Préparé

- Préparation de la prévisualisation des choix de création avant validation.
- Préparation du futur Charactomancer 0.2.0 sur un périmètre de 7 clans représentatifs.

---

## [0.1.22.4]

### Ajouté

- Ajout du pont fonctionnel entre les vrais Items Foundry d’équipement et l’inventaire intégré des fiches Shinobi.
- Ajout du drag & drop d’Items `arme`, `armure`, `equipement` et `consommable` vers l’inventaire d’un Shinobi.
- Les consommables déposés depuis un vrai Item Foundry conservent désormais leur effet structuré `system.useEffect`.
- Les consommables peuvent restaurer Chakra, Vigueur ou Caractère selon leur configuration.
- Ajout de la prise en compte du champ `consumeOnUse` pour les consommables.

### Modifié

- Suppression de la reconnaissance spéciale par nom exact de la `Pilule de Chakra mineure`.
- L’ajout manuel d’un objet dans l’inventaire crée désormais un objet neutre, sans effet caché.
- L’effet d’un consommable dépend désormais de ses données structurées, et non plus de son nom.

### Préparé

- Préparation du futur compendium d’équipement et de consommables.
- Préparation d’un futur système d’utilisation depuis carte de chat ou ciblage de token.

---

## [0.1.22.3]

### Ajouté

- Ajout du type d’Item Foundry `consommable`.
- Ajout de `consommable` dans les types d’Items déclarés par le système.
- Ajout de la fiche dédiée aux consommables.
- Ajout des champs de consommable : sous-type, quantité par défaut, valeur et poids.
- Ajout des champs d’effet de consommable : type d’effet, ressource ciblée, montant, consommation à l’usage et texte d’effet.
- Préparation de la Pilule de Chakra mineure comme vrai Item structuré.

### Préparé

- Préparation du futur pont entre les vrais Items `consommable` et l’inventaire intégré des fiches Shinobi.
- Préparation du futur drag & drop depuis un compendium d’équipements vers l’inventaire d’un acteur.

---

## 0.1.22.2

### Ajouté

- Ajout d’un bouton `Utiliser` pour les consommables dans l’inventaire.
- Ajout d’une première logique fonctionnelle d’effet de consommable.
- Ajout de la `Pilule de Chakra mineure`, reconnue par son nom dans l’inventaire.
- La `Pilule de Chakra mineure` restaure 25 Chakra sans dépasser le maximum.
- L’utilisation d’un consommable réduit sa quantité de 1.
- Le consommable est retiré de l’inventaire si sa quantité tombe à 0.
- Ajout d’une carte de chat récapitulative lors de l’utilisation d’un consommable.

### Préparé

- Préparation d’un futur système d’effets génériques pour les consommables.
- Préparation d’une future application des consommables à une cible ou depuis une carte de chat.

## 0.1.22.1

### Ajouté

- Ajout d’un résumé calculé de l’inventaire.
- Ajout du nombre total d’objets portés.
- Ajout du poids total porté.
- Ajout du poids équipé.
- Ajout de la valeur totale de l’inventaire.
- Ajout de la valeur totale par catégorie : armes, protections, consommables et objets.
- Ajout d’un système de charge basé sur le COR effectif.
- Ajout des seuils de charge : chargé, surchargé et surcharge critique.
- Ajout d’un affichage des malus conseillés liés à la charge.

### Préparé

- Préparation de l’intégration future des malus de charge dans les jets de combat.
- Préparation de la suite `0.1.22.x` dédiée aux consommables utilisables, au typage avancé des objets et aux compendiums d’équipement.

## 0.1.21.2

### Ajouté

- Ajout d’une interface MJ d’import des techniques accessible depuis les paramètres du système.
- Ajout d’une commande d’ouverture rapide `game.naruto25e.openTechniqueImporter()`.
- Ajout du fichier source `techniques-lignees.json`.
- Ajout du compendium `Techniques de lignées` à la procédure d’import automatique.

### Contenu

- Ajout des premières techniques Mokuton importables :
  - `Mokuton: Jukai Heki`
  - `Mokuton: Shichūrō`
  - `Mokuton: Mokusatsu Shibari`
  - `Mokuton: Sōshinki`
  - `Mokuton: Bunshin`
  - `Mokuton: Kajukai Kōrin`
  - `Mokuton: Jukai Kōtan`

### Préparé

- Préparation du remplissage progressif des techniques de lignées et techniques de clans.
- Préparation d’un workflow d’import utilisable sans passer par la console développeur.

## 0.1.21.1

### Ajouté

- Ajout d’un importeur MJ pour générer les premiers compendiums de Techniques depuis des fichiers JSON.
- Ajout de la commande système `game.naruto25e.importTechniquePacks({ clear: true })`.
- Ajout du dossier `data/techniques/` pour stocker les sources JSON des techniques.
- Ajout des premiers fichiers sources :
  - `techniques-communes.json`
  - `techniques-elementaires.json`

### Contenu

- Ajout de premiers échantillons importables pour Henge, Gensou, Fūton, Doton, Iryō et Fūin.
- Les techniques importées respectent la structure actuelle des items `technique`.
- Les prérequis utilisent provisoirement le type `skill` afin de vérifier que la compétence correspondante est possédée.

### Préparé

- Préparation du remplissage progressif des compendiums depuis les documents papier/numériques.
- Préparation de la séparation future entre Techniques communes, Techniques élémentaires, Techniques de lignées et Pouvoirs de lignée.

## 0.1.21

### Ajouté

- Déclaration des premiers compendiums système vides.
- Ajout du compendium `Techniques communes`.
- Ajout du compendium `Techniques élémentaires`.
- Ajout du compendium `Techniques de lignées`.
- Ajout du compendium `Pouvoirs de lignée`.

### Préparé

- Préparation du remplissage des compendiums de Techniques en 0.1.21.1.
- Préparation des futurs contenus de clan, de lignée et de pouvoirs héréditaires.
- Les techniques de clan et les pouvoirs liés aux lignées seront rangés dans des compendiums dédiés.

## 0.1.20

### Ajouté

- Ajout des prérequis avancés pour les Techniques.
- Ajout du champ `system.prerequisites.value` pour définir la valeur attendue du prérequis.
- Ajout du champ `system.prerequisites.validated` pour les prérequis nécessitant une validation MJ manuelle.
- Ajout du type de prérequis `voie`.
- Ajout du type de prérequis `gmOption` pour lire les options MJ de lignée.
- Les Techniques peuvent désormais vérifier automatiquement :
  - une compétence possédée ;
  - une maîtrise minimale de compétence ;
  - une affinité naturelle ;
  - un clan requis ;
  - une voie requise ;
  - une valeur minimale de Lignée ;
  - une option MJ de lignée comme Mangekyō Sharingan, EMS, cellules Senju, Rinnegan ou Tenseigan.

### Modifié

- La vérification des prérequis de Technique est centralisée dans `item.js`.
- La carte de chat affiche désormais le prérequis réellement vérifié plutôt qu’un simple type générique.
- Les prérequis Kekkei Genkai, Kekkei Tōta, Kinjutsu et Validation MJ utilisent la case de validation MJ manuelle.

### Préparé

- Préparation des futurs compendiums de Techniques avec prérequis structurés.
- Préparation des futures Techniques liées au Mangekyō Sharingan, au Rinnegan et au Tenseigan.

## 0.1.19.9.1

### Corrigé

- Correction d’un doublon d’affichage du bloc Options MJ de l’onglet Lignée.
- Les options MJ de lignée, clan hybride, voie hybridée, Mangekyō Sharingan, EMS, cellules Senju, Rinnegan et Tenseigan ne s’affichent désormais qu’une seule fois.

## 0.1.19.9

### Ajouté

- Ajout des options MJ conditionnelles de lignée dans l’onglet Lignée.
- Ajout de la validation MJ du Mangekyō Sharingan pour les personnages Uchiha.
- Ajout de la validation MJ du Mangekyō Sharingan Éternel pour les personnages Uchiha.
- Ajout de la validation MJ des cellules Senju implantées pour les personnages Uchiha non-Senju.
- Ajout de la validation MJ du Rinnegan pour les personnages Uchiha remplissant les conditions.
- Ajout de la validation MJ du Tenseigan pour les personnages Hyūga.

### Modifié

- Les rangs Uchiha 5 et plus sont désormais considérés comme verrouillés narrativement tant que le Mangekyō Sharingan n’est pas validé par le MJ.
- Le Rinnegan nécessite désormais une lignée Uchiha, le Mangekyō Sharingan ou EMS, et des cellules Senju naturelles ou implantées.
- Les personnages hybrides Uchiha/Senju ou Senju/Uchiha remplissent automatiquement la condition des cellules Senju.

### Préparé

- Préparation de la future page Implantation pour gérer les greffes d’yeux, cellules spéciales, compatibilités, malus et validations MJ.

## 0.1.19.8.5

### Modifié

- Harmonisation des capacités de lignée existantes.
- Les rangs de lignée ne décrivent plus l’obtention directe des compétences obligatoires déjà accordées par `skillKey` ou `mandatorySkills`.
- Les rangs Aburame, Nara, Senju, Munefuda, Yamanaka et Aniki ont été reformulés pour distinguer clairement capacité de lignée et compétence obligatoire.
- Les capacités Hyūga utilisent désormais `label` comme les autres lignées, au lieu de `title`.
- Le rang 10 Hyūga prépare désormais la voie du Tenseigan comme prédisposition d’éveil, en attente d’une future option MJ.

### Préparé

- Préparation de la version 0.1.19.9 pour les options MJ de lignée conditionnelles :
  - EMS et Rinnegan réservés aux Uchiha.
  - Tenseigan réservé aux Hyūga.

## 0.1.19.8.4

### Corrigé

- Correction de l’affichage des capacités de lignée dans l’onglet Lignée : suppression d’une structure HTML imbriquée en double.
- Les rangs de lignée affichent désormais correctement leurs capacités via la liste `features`.
- Correction de l’affichage des compétences obligatoires de lignée : la fiche utilise désormais la lecture plurielle des compétences obligatoires de clan.
- Uchiha affiche correctement Katon comme compétence obligatoire de lignée via `skillKey`.

### Modifié

- Réorganisation de la progression de lignée Uchiha du rang 1 au rang 10.
- Suppression de “Héritage du Katon” comme capacité de rang Uchiha.
- Katon reste géré comme compétence obligatoire et affinité imposée, mais n’est plus une capacité de lignée.
- Préparation narrative future de l’EMS et du Rinnegan comme options MJ séparées des rangs automatiques.

## 0.1.19.8.3

### Corrigé

- Correction de l’affichage des capacités de lignée dans l’onglet Lignée.
- Correction de la lecture des capacités par rang réel au lieu de l’index de tableau.
- Correction de Hyūga : Byakugan est désormais affiché au rang 1.
- Tenseigan est préparé au rang 10.
- Jūken reste géré comme compétence obligatoire de clan, et non comme capacité de rang.
- Correction de l’affichage des capacités pour les clans hybrides et voies hybridées.
- La réserve Kikaichū actuelle peut désormais être modifiée manuellement.

## 0.1.19.8

### Ajouté

- Ajout d’une structure de données pour les capacités de lignée par clan.
- Ajout des premières capacités structurées pour Hyūga, Aburame, Nara, Senju, Munefuda, Uchiha, Yamanaka et Aniki.
- Affichage enrichi des rangs de lignée dans l’onglet Lignée.
- Les rangs de lignée affichent désormais leur nom, type, résumé, effet et état de déverrouillage.

### Modifié

- Les pistes de lignée n’affichent plus seulement un placeholder générique.
- Le rang actuel de Lignée est mis en évidence visuellement.

## 0.1.19.7.1

### Corrigé

- Correction du calcul du Chakra max après ajout de la réserve Kikaichū.
- Correction de l’activation de la réserve Kikaichū pour le clan Aburame et l’hybridation Aburame.
- Application de la règle stricte : réserve Kikaichū minimum Lignée × 15, maximum Lignée × 25.
- La réserve Kikaichū est désormais correctement déduite du Chakra général utilisable.

## 0.1.19.7

### Ajouté

- Ajout de la réserve Kikaichū pour les personnages Aburame.
- Ajout d’un chakra brut avant déduction de réserve.
- Ajout de boutons ±5 / ±10 pour allouer ou retirer du chakra vers la réserve Kikaichū.

### Modifié

- Le chakra maximum utilisable est réduit par le chakra alloué à la réserve Kikaichū.

### Corrigé

- Préparation de la gestion des réserves de chakra séparées pour les futurs clans et pouvoirs spéciaux.

## [0.1.19.6.1]

### Corrigé

- Correction des actions Nindō côté joueur.
- Les boutons Nindō peuvent désormais dépenser les points de Nindō d’un joueur.
- Dépassement ajoute désormais correctement les charges côté joueur.
- Dépenser une charge réduit désormais correctement le compteur côté joueur.
- Les modifications manuelles des points, charges et maximums restent protégées pour les joueurs.

## [0.1.19.6]

### Ajouté

- Ajout des Nindō prédéfinis.
- Ajout du mode Nindō prédéfini ou personnalisé.
- Ajout des actions Nindō universelles.
- Ajout d’un bouton d’utilisation pour les actions Nindō.
- Ajout de la dépense automatique des points de Nindō.
- Ajout des charges de Nindō via Dépassement.
- Ajout d’un bouton pour dépenser une charge de Nindō.
- Ajout de cartes de chat pour les actions Nindō.

### Modifié

- Le Nindō peut désormais devenir négatif afin de préparer la règle de renégat.
- Le bloc Nindō du Résumé devient une vraie section fonctionnelle.

## [0.1.19.5.1]

### Corrigé

- Correction d’un bug côté joueur où les compétences communes devenaient des choix initiaux.
- Correction du compteur de compétences initiales explosant après modification d’une affinité ou d’une compétence côté joueur.
- Les compétences communes ne peuvent plus être converties en choix initial.
- Les compétences de clan ne peuvent plus être sélectionnées manuellement.

## [0.1.19.5]

### Ajouté

- Ajout d’un rappel d’XP disponible dans l’onglet Bases.
- Ajout d’un rappel d’XP disponible dans l’onglet Compétences.
- Ajout d’un ordre de priorité pour l’affichage des sources de compétences.

### Modifié

- Le résumé de création utilise désormais l’XP disponible réelle.
- Les sources de compétences sont affichées dans un ordre plus lisible.
- Le compteur de compétences initiales compte les compétences uniques, pas les sources empilées.

### Corrigé

- Correction de l’XP disponible affichée à 0 dans le résumé de création.
- Correction de l’affichage prioritaire de “Choix initial” sur les compétences aussi accordées par affinité ou clan.
- Les joueurs ne peuvent plus modifier directement l’XP totale.
- Les joueurs ne peuvent plus modifier directement les utilisations de lignée de base.

## [0.1.19.4]

### Ajouté

- Ajout d’un résumé de création dans l’onglet Résumé.
- Ajout d’un affichage des affinités, de l’héritage, des compétences initiales et de l’XP disponible.
- Ajout d’une liste d’erreurs bloquantes pour la validation de création.
- Blocage du bouton de validation si la création n’est pas conforme.

### Corrigé

- La validation MJ refuse désormais une fiche dont les conditions de création ne sont pas remplies.

## [0.1.19.3]

### En correction

- Non-Correction d’un cas où une compétence accordée par affinité devenait automatiquement un choix initial lors d’un changement d’affinité.
- Correction du nettoyage des compétences accordées par affinité lorsque l’affinité principale ou secondaire est remplacée.
- Correction du rendu des groupes de compétences après l’ajout des sources de création.

## [0.1.19.2]

### Non Corrigé totalement

- Correction d’un cas où une compétence accordée par affinité devenait automatiquement un choix initial lors d’un changement d’affinité.
- Correction du nettoyage des compétences accordées par affinité lorsque l’affinité principale ou secondaire est remplacée.
- Correction du rendu des groupes de compétences après l’ajout des sources de création.

## [0.1.19.1]

### Ajouté

- Ajout des sources de possession des compétences.
- Ajout de l’affichage des sources de compétence sur la fiche Shinobi.
- Ajout du résumé des compétences initiales utilisées et restantes.
- Ajout de la distinction entre compétences communes, choix initial, clan/voie et affinité.

### Modifié

- Les compétences accordées par affinité sont désormais recalculées proprement.
- Changer d’affinité retire l’ancienne compétence uniquement si elle n’est pas possédée par une autre source.
- Les compétences imposées par clan/voie et affinité ne peuvent plus être perdues par simple décochage.

### Corrigé

- Correction du cas où plusieurs affinités testées successivement laissaient toutes les compétences possédées.
- Correction du numéro de version système après la 0.1.19.0.

## [0.1.19.0]

### Ajouté

- Ajout de la structure des Affinités de Chakra.
- Ajout des affinités Katon, Suiton, Raïton, Fūton, Doton et Iryō.
- Ajout d’un paramètre mondial pour déterminer si l’affinité principale est offerte ou déduite des compétences initiales.
- Les affinités possédées accordent automatiquement la compétence liée.
- Préparation des données de création de clan.
- Ajout des premières données de création pour Nara, Uchiha, Hyūga, Aburame, Senju, Munefuda, Yamanaka et Aniki.

### Préparé

- Préparation du futur contrôle des 5 compétences initiales.
- Préparation du futur résumé de création.
- Préparation des futures erreurs bloquantes avant validation.

## [0.1.18.2] - Validée côté MJ

### Validé

- Validation et déverrouillage de création fonctionnels.
- Verrouillage logique de création opérationnel côté MJ.
- Village, statut, clan, voie et hybridation modifiables par le MJ.
- Missions modifiables par le MJ et totaux recalculés.
- Nindō et Charges de Nindō fonctionnels.
- Permissions temporaires de modification du Nindō fonctionnelles.
- Ryō visibles, ajoutables et retirables par le MJ.
- Permission temporaire de modification des Ryō fonctionnelle.
- Bases et compétences modifiables par le MJ même après validation.
- Fiches Techniques modifiables et sauvegardables par le MJ.

### À tester plus tard

- Permissions côté joueur.
- Verrouillage joueur après validation.
- Consultation mais non-modification des Techniques côté joueur.

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
