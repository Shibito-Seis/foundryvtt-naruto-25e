export const NARUTO25E = {};

NARUTO25E.baseXpCosts = {
  2: 15,
  3: 20,
  4: 25,
  5: 30,
  6: 35,
  7: 40,
  8: 45,
  9: 50,
  10: 55,
  11: 60,
  12: 65,
  13: 70,
  14: 75,
  15: 90,
  16: 100
};

NARUTO25E.baseCaps = {
  aspirant: 3,
  genin: 5,
  chunin: 7,
  joninA: 10,
  joninS: 12,
  joninAA: 14,
  joninSPlus: 16
};

NARUTO25E.baseLabels = {
  cor: "Corps",
  esp: "Esprit",
  arm: "Armes",
  tai: "Taijutsu",
  nin: "Ninjutsu",
  gen: "Genjutsu",
  lign: "Lignée"
};

NARUTO25E.skillCategoryLabels = {
  common: "Compétences communes",
  combat: "Compétences de combat",
  terrain: "Compétences de terrain",
  clan: "Compétences de clan"
};

NARUTO25E.skillDefinitions = {
  // Communes
  armesSimples: {
    label: "Armes Simples",
    base: "arm",
    category: "common",
    tags: ["common", "combat", "weapon"],
    ownedByDefault: true
  },
  camouflage: {
    label: "Camouflage",
    base: "nin",
    category: "common",
    tags: ["common", "infiltration", "stealth"],
    ownedByDefault: true
  },
  corpsACorps: {
    label: "Corps à Corps",
    base: "tai",
    category: "common",
    tags: ["common", "combat", "melee"],
    ownedByDefault: true
  },
  esquive: {
    label: "Esquive",
    base: "tai",
    category: "common",
    tags: ["common", "defense"],
    ownedByDefault: true
  },
  gensou: {
    label: "Gensou",
    base: "gen",
    category: "common",
    tags: ["common", "genjutsu", "chakraNature", "spiritual"],
    ownedByDefault: true
  },
  henge: {
    label: "Henge",
    base: "nin",
    category: "common",
    tags: ["common", "jutsu", "utility"],
    ownedByDefault: true
  },
  kawarimi: {
    label: "Kawarimi",
    base: "gen",
    category: "common",
    tags: ["common", "jutsu", "defense"],
    ownedByDefault: true
  },
  mental: {
    label: "Mental",
    base: "esp",
    category: "common",
    tags: ["common", "mental"],
    ownedByDefault: true
  },
  parade: {
    label: "Parade",
    base: "arm",
    category: "common",
    tags: ["common", "defense", "weapon"],
    ownedByDefault: true
  },
  physique: {
    label: "Physique",
    base: "cor",
    category: "common",
    tags: ["common", "physical"],
    ownedByDefault: true
  },
  survie: {
    label: "Survie",
    base: "nin",
    category: "common",
    tags: ["common", "survival"],
    ownedByDefault: true
  },
  vigilance: {
    label: "Vigilance",
    base: "nin",
    category: "common",
    tags: ["common", "perception"],
    ownedByDefault: true
  },

  // Combat
  armesExotiques: {
    label: "Armes Exotiques",
    base: "arm",
    category: "combat",
    tags: ["combat", "weapon"],
    ownedByDefault: false
  },
  chuken: {
    label: "Chūken",
    base: "tai",
    category: "combat",
    tags: ["combat", "taijutsu"],
    ownedByDefault: false
  },
  coupSpecialArm: {
    label: "Coup Spécial (ARM)",
    base: "arm",
    category: "combat",
    tags: ["combat", "weapon", "specialAttack"],
    ownedByDefault: false
  },
  coupSpecialTai: {
    label: "Coup Spécial (TAI)",
    base: "tai",
    category: "combat",
    tags: ["combat", "taijutsu", "specialAttack"],
    ownedByDefault: false
  },
  doton: {
    label: "Doton",
    base: "nin",
    category: "combat",
    tags: ["chakraNature", "elemental", "earth"],
    ownedByDefault: false
  },
  futon: {
    label: "Fūton",
    base: "nin",
    category: "combat",
    tags: ["chakraNature", "elemental", "wind"],
    ownedByDefault: false
  },
  goken: {
    label: "Gōken",
    base: "tai",
    category: "combat",
    tags: ["combat", "taijutsu"],
    ownedByDefault: false
  },
  juken: {
    label: "Jūken",
    base: "tai",
    category: "combat",
    tags: ["combat", "taijutsu", "hyuga"],
    ownedByDefault: false
  },
  intimidation: {
    label: "Intimidation",
    base: "cor",
    category: "combat",
    tags: ["combat", "social", "pressure"],
    ownedByDefault: false
  },
  katon: {
    label: "Katon",
    base: "nin",
    category: "combat",
    tags: ["chakraNature", "elemental", "fire"],
    ownedByDefault: false
  },
  premiersSoins: {
    label: "Premiers Soins",
    base: "cor",
    category: "combat",
    tags: ["combat", "medical", "support"],
    ownedByDefault: false
  },
  raiton: {
    label: "Raïton",
    base: "nin",
    category: "combat",
    tags: ["chakraNature", "elemental", "lightning"],
    ownedByDefault: false
  },
  regeneration: {
    label: "Régénération",
    base: "cor",
    category: "combat",
    tags: ["combat", "healing", "chakra"],
    ownedByDefault: false
  },
  resistancesElementaires: {
    label: "Résistances Élémentaires",
    base: "nin",
    category: "combat",
    tags: ["resistance", "elemental"],
    ownedByDefault: false
  },
  resistancesEnvironnementales: {
    label: "Résistances Environnementales",
    base: "cor",
    category: "combat",
    tags: ["resistance", "environment"],
    ownedByDefault: false
  },
  resistancesPhysiques: {
    label: "Résistances Physiques",
    base: "cor",
    category: "combat",
    tags: ["resistance", "physical"],
    ownedByDefault: false
  },
  resistancesPsychiques: {
    label: "Résistances Psychiques",
    base: "esp",
    category: "combat",
    tags: ["resistance", "psychic"],
    ownedByDefault: false
  },
  scienceExplosifs: {
    label: "Science des Explosifs",
    base: "arm",
    category: "combat",
    tags: ["combat", "explosive", "craft"],
    ownedByDefault: false
  },
  sciencePieges: {
    label: "Science des Pièges",
    base: "arm",
    category: "combat",
    tags: ["combat", "trap", "craft"],
    ownedByDefault: false
  },
  suiton: {
    label: "Suiton",
    base: "nin",
    category: "combat",
    tags: ["chakraNature", "elemental", "water"],
    ownedByDefault: false
  },
  yuryoku: {
    label: "Yūryoku",
    base: "gen",
    category: "combat",
    tags: ["chakraNature", "spiritual", "genjutsu"],
    ownedByDefault: false
  },

  // Terrain
  collecterInformations: {
    label: "Collecter des Informations",
    base: "esp",
    category: "terrain",
    tags: ["terrain", "investigation", "social"],
    ownedByDefault: false
  },
  education: {
    label: "Éducation",
    base: "esp",
    category: "terrain",
    tags: ["terrain", "knowledge"],
    ownedByDefault: false
  },
  empathie: {
    label: "Empathie",
    base: "nin",
    category: "terrain",
    tags: ["terrain", "social", "perception"],
    ownedByDefault: false
  },
  fauxSemblants: {
    label: "Faux Semblants",
    base: "gen",
    category: "terrain",
    tags: ["terrain", "deception", "social"],
    ownedByDefault: false
  },
  fuin: {
    label: "Fūin",
    base: "gen",
    category: "terrain",
    tags: ["terrain", "seal", "jutsu"],
    ownedByDefault: false
  },
  iryo: {
    label: "Iryō",
    base: "gen",
    category: "terrain",
    tags: ["terrain", "medical", "chakra"],
    ownedByDefault: false
  },
  kuchiyose: {
    label: "Kuchiyose",
    base: "gen",
    category: "terrain",
    tags: ["terrain", "summoning", "contract"],
    ownedByDefault: false
  },
  loisTraditions: {
    label: "Lois & Traditions",
    base: "esp",
    category: "terrain",
    tags: ["terrain", "law", "knowledge"],
    ownedByDefault: false
  },
  manipulation: {
    label: "Manipulation",
    base: "tai",
    category: "terrain",
    tags: ["terrain", "social", "deception"],
    ownedByDefault: false
  },
  medecine: {
    label: "Médecine",
    base: "esp",
    category: "terrain",
    tags: ["terrain", "medical", "knowledge"],
    ownedByDefault: false
  },
  scienceDrogues: {
    label: "Science des Drogues",
    base: "nin",
    category: "terrain",
    tags: ["terrain", "drug", "craft"],
    ownedByDefault: false
  },
  sciencePoisons: {
    label: "Science des Poisons",
    base: "nin",
    category: "terrain",
    tags: ["terrain", "poison", "craft"],
    ownedByDefault: false
  },
  sentinelle: {
    label: "Sentinelle",
    base: "gen",
    category: "terrain",
    tags: ["terrain", "chakraSense", "perception"],
    ownedByDefault: false
  },
  sixiemeSens: {
    label: "Sixième Sens",
    base: "gen",
    category: "terrain",
    tags: ["terrain", "occult", "spiritual"],
    ownedByDefault: false
  },
  technologie: {
    label: "Technologie",
    base: "arm",
    category: "terrain",
    tags: ["terrain", "technology", "craft"],
    ownedByDefault: false
  },

  // Clan
  jiton: {
    label: "Jiton",
    base: "nin",
    category: "clan",
    tags: ["clan", "chakraNature", "magnetism", "munefuda"],
    ownedByDefault: false
  },
  kage: {
    label: "Kage",
    base: "nin",
    category: "clan",
    tags: ["clan", "chakraNature", "shadow", "nara"],
    ownedByDefault: false
  },
  kikaichu: {
    label: "Kikaichū",
    base: "nin",
    category: "clan",
    tags: ["clan", "chakraNature", "insects", "aburame"],
    ownedByDefault: false
  },
  mokuton: {
    label: "Mokuton",
    base: "nin",
    category: "clan",
    tags: ["clan", "chakraNature", "wood", "senju"],
    ownedByDefault: false
  },
  resistancesEmotionnelles: {
    label: "Résistances Émotionnelles",
    base: "gen",
    category: "clan",
    tags: ["clan", "resistance", "emotional", "yamanaka"],
    ownedByDefault: false
  },
  sumi: {
    label: "Sumi",
    base: "nin",
    category: "clan",
    tags: ["clan", "chakraNature", "ink", "aniki"],
    ownedByDefault: false
  },
  unificationDesunification: {
    label: "Unification / Désunification",
    base: "nin",
    category: "clan",
    tags: ["clan", "chakra", "ud"],
    ownedByDefault: false
  }
};

NARUTO25E.getSkillXpCost = function (rank) {
  return Number(rank ?? 0);
};

NARUTO25E.villages = {
  konoha: { label: "Konoha", selectable: true },
  suna: { label: "Suna", selectable: false },
  kumo: { label: "Kumo", selectable: false },
  iwa: { label: "Iwa", selectable: false },
  kiri: { label: "Kiri", selectable: false },
  kusa: { label: "Kusa", selectable: false },
  ame: { label: "Ame", selectable: false },
  taki: { label: "Taki", selectable: false },
  oto: { label: "Oto", selectable: false },
  yuki: { label: "Yuki", selectable: false },
  hoshi: { label: "Hoshi", selectable: false }
};

NARUTO25E.villageStatuses = {
  loyal: "Loyal",
  deserter: "Déserteur",
  hermit: "Ermite",
  exile: "Exilé",
  independent: "Indépendant"
};

NARUTO25E.heritageModes = {
  clan: "Clan",
  voie: "Voie",
  hybridClan: "Clan hybride",
  hybridVoie: "Voie hybridée",
  hiddenClan: "Clan caché / dissimulé"
};

NARUTO25E.hiddenClanAwarenessStates = {
  ignorant: {
    label: "Dans l’ignorance",
    summary: "Le personnage ignore totalement sa vraie lignée. La Base Lignée est forcée à 0.",
    maxCreationLineage: 0,
    requiresUnlockAbove: 0
  },
  awareUndeveloped: {
    label: "Au courant, pas développé",
    summary: "Le personnage connaît son vrai clan, mais n’a pas encore développé son héritage. La Base Lignée est forcée à 0.",
    maxCreationLineage: 0,
    requiresUnlockAbove: 0
  },
  selfKnown: {
    label: "Je sais qui je suis",
    summary: "Le personnage connaît et assume son vrai clan. À la création, la Base Lignée peut monter à 1 maximum avant déblocage narratif.",
    maxCreationLineage: 1,
    requiresUnlockAbove: 1
  }
};

NARUTO25E.getHiddenClanAwarenessState = function (awarenessKey) {
  const key = String(awarenessKey ?? "ignorant");

  return NARUTO25E.hiddenClanAwarenessStates[key]
    ?? NARUTO25E.hiddenClanAwarenessStates.ignorant;
};

NARUTO25E.clans = {
  aburame: { label: "Aburame", village: "konoha", skillKey: "kikaichu" },
  akaba: { label: "Akaba", village: "konoha", skillKey: "" },
  akimichi: { label: "Akimichi", village: "konoha", skillKey: "" },
  aniki: { label: "Aniki", village: "konoha", skillKey: "sumi" },
  ao: { label: "Ao", village: "konoha", skillKey: "" },
  eshimuro: { label: "Eshimuro", village: "konoha", skillKey: "" },
  hyuga: { label: "Hyūga", village: "konoha", skillKey: "juken" },
  inuzuka: { label: "Inuzuka", village: "konoha", skillKey: "" },
  ishida: { label: "Ishida", village: "konoha", skillKey: "" },
  kagayaki: { label: "Kagayaki", village: "konoha", skillKey: "" },
  kato: { label: "Katō", village: "konoha", skillKey: "" },
  kenta: { label: "Kenta", village: "konoha", skillKey: "" },
  kurama: { label: "Kurama", village: "konoha", skillKey: "" },
  mitokado: { label: "Mitokado", village: "konoha", skillKey: "" },
  morino: { label: "Morino", village: "konoha", skillKey: "" },
  munefuda: { label: "Munefuda", village: "konoha", skillKey: "jiton" },
  nara: { label: "Nara", village: "konoha", skillKey: "kage" },
  sarutobi: { label: "Sarutobi", village: "konoha", skillKey: "" },
  senju: { label: "Senju", village: "konoha", skillKey: "mokuton" },
  shimadoku: { label: "Shimadoku", village: "konoha", skillKey: "" },
  shimura: { label: "Shimura", village: "konoha", skillKey: "" },
  takeda: { label: "Takeda", village: "konoha", skillKey: "" },
  uchiha: { label: "Uchiha", village: "konoha", skillKey: "katon" },
  utatane: { label: "Utatane", village: "konoha", skillKey: "" },
  yamanaka: { label: "Yamanaka", village: "konoha", skillKey: "resistancesEmotionnelles" }
};

NARUTO25E.voies = {
  shokanShi: {
    label: "Shōkan-shi - Voie du Genjutsu",
    village: "any",
    selectable: true,
    tags: ["voie", "genjutsu"]
  },
  ninpo: {
    label: "Ninpō - Voie du Ninjutsu",
    village: "any",
    selectable: true,
    tags: ["voie", "ninjutsu"]
  },
  kriegsiter: {
    label: "Kriegsiter - Voie des Armes",
    village: "any",
    selectable: true,
    tags: ["voie", "armes"]
  },
  kugutsu: {
    label: "Kugutsu - Voie du Marionnettiste",
    village: "suna",
    selectable: false,
    tags: ["voie", "puppet", "suna", "kugutsu"]
  },
  hachimon: {
    label: "Hachimon - Voie du Taijutsu",
    village: "konoha",
    selectable: true,
    tags: ["voie", "taijutsu", "konoha"]
  }
};

NARUTO25E.chakraAffinityOrder = [
  "katon",
  "suiton",
  "raiton",
  "futon",
  "doton",
  "iryo",
  "fuin"
];

NARUTO25E.chakraAffinities = {
  katon: {
    label: "Katon",
    type: "elemental",
    skillKey: "katon",
    description: "Nature du Feu.",
    playstyle: "Offensif, frontal et intimidant.",
    strengths: [
      "Dégâts directs",
      "Pression de zone",
      "Brûlures et dégâts sur la durée",
      "Destruction d’obstacles",
      "Très bon langage visuel en combat"
    ],
    weaknesses: [
      "Discret seulement avec beaucoup de maîtrise",
      "Peut être dangereux en environnement fermé",
      "Faible contre les contre-mesures adaptées au feu"
    ],
    recommendedFor: [
      "Joueurs voulant un style offensif clair",
      "Shinobi de pression",
      "Combattants élémentaires classiques",
      "Uchiha ou profils agressifs"
    ],
    associatedSkills: ["katon"],
    previewTags: ["Dégâts", "Zone", "Pression", "Brûlure"]
  },

  suiton: {
    label: "Suiton",
    type: "elemental",
    skillKey: "suiton",
    description: "Nature de l’Eau.",
    playstyle: "Polyvalent, fluide et adaptatif.",
    strengths: [
      "Contrôle de terrain",
      "Défense souple",
      "Entrave et déplacement",
      "Bon support en équipe",
      "Très utile selon l’environnement"
    ],
    weaknesses: [
      "Peut dépendre du terrain ou de l’eau disponible selon les techniques",
      "Moins explosif que Katon ou Raïton en dégâts purs",
      "Demande souvent une bonne lecture tactique"
    ],
    recommendedFor: [
      "Joueurs aimant s’adapter",
      "Shinobi tactiques",
      "Profils de soutien ou contrôle",
      "Combattants opportunistes"
    ],
    associatedSkills: ["suiton"],
    previewTags: ["Contrôle", "Défense", "Adaptation", "Entrave"]
  },

  raiton: {
    label: "Raïton",
    type: "elemental",
    skillKey: "raiton",
    description: "Nature de la Foudre.",
    playstyle: "Rapide, perforant et agressif.",
    strengths: [
      "Dégâts précis",
      "Percée défensive",
      "Stimulation nerveuse ou corporelle selon techniques",
      "Très bon pour les attaques décisives",
      "Style dynamique et dangereux"
    ],
    weaknesses: [
      "Peut manquer de contrôle durable",
      "Exige souvent un bon timing",
      "Risqué si mal utilisé près d’alliés ou de surfaces conductrices"
    ],
    recommendedFor: [
      "Joueurs aimant frapper vite et fort",
      "Assassins",
      "Duellistes",
      "Shinobi mobiles"
    ],
    associatedSkills: ["raiton"],
    previewTags: ["Vitesse", "Percée", "Dégâts", "Précision"]
  },

  futon: {
    label: "Fūton",
    type: "elemental",
    skillKey: "futon",
    description: "Nature du Vent.",
    playstyle: "Mobile, tranchant et tactique.",
    strengths: [
      "Dégâts tranchants",
      "Projection",
      "Amélioration d’armes",
      "Contrôle léger de zone",
      "Très bon pour garder la distance"
    ],
    weaknesses: [
      "Moins défensif que Doton",
      "Peut demander une bonne gestion de placement",
      "Faible contre certaines pressions de feu"
    ],
    recommendedFor: [
      "Joueurs aimant la mobilité",
      "Bretteurs élémentaires",
      "Tireurs ou combattants à distance",
      "Shinobi qui veulent frapper sans rester exposés"
    ],
    associatedSkills: ["futon"],
    previewTags: ["Mobilité", "Tranchant", "Distance", "Arme"]
  },

  doton: {
    label: "Doton",
    type: "elemental",
    skillKey: "doton",
    description: "Nature de la Terre.",
    playstyle: "Défensif, robuste et orienté contrôle.",
    strengths: [
      "Solidité",
      "Protection",
      "Barrières",
      "Contrôle de terrain",
      "Renforcement corporel",
      "Construction et destruction d’obstacles"
    ],
    weaknesses: [
      "Souvent moins rapide ou spectaculaire",
      "Peut être contourné par mobilité ou foudre",
      "Demande une bonne anticipation du terrain"
    ],
    recommendedFor: [
      "Joueurs aimant encaisser",
      "Protecteurs",
      "Contrôleurs de terrain",
      "Shinobi méthodiques et résistants"
    ],
    associatedSkills: ["doton"],
    previewTags: ["Défense", "Terrain", "Contrôle", "Endurance"]
  },

  iryo: {
    label: "Iryō",
    type: "special",
    skillKey: "iryo",
    description: "Usage médical du Chakra.",
    playstyle: "Soutien, soin et maîtrise du corps.",
    strengths: [
      "Soins",
      "Stabilisation",
      "Lecture médicale",
      "Soutien d’équipe",
      "Synergies avec médecine, poisons ou drogues"
    ],
    weaknesses: [
      "Moins offensif au départ",
      "Demande souvent une bonne protection d’équipe",
      "Peut dépendre fortement de la situation"
    ],
    recommendedFor: [
      "Joueurs aimant sauver les autres",
      "Médecins ninja",
      "Soutiens tactiques",
      "Personnages scientifiques ou expérimentaux"
    ],
    associatedSkills: ["iryo", "medecine", "premiersSoins"],
    previewTags: ["Soin", "Support", "Corps", "Stabilisation"]
  },

  fuin: {
    label: "Fūin",
    type: "special",
    skillKey: "fuin",
    description: "Art des sceaux et contrats.",
    playstyle: "Préparation, contrôle rituel et solutions techniques.",
    strengths: [
      "Sceaux",
      "Contrats",
      "Verrouillage",
      "Préparation tactique",
      "Effets différés ou conditionnels",
      "Très utile hors combat"
    ],
    weaknesses: [
      "Moins immédiat qu’un élément offensif",
      "Demande préparation et créativité",
      "Peut être dépendant du matériel ou du contexte"
    ],
    recommendedFor: [
      "Joueurs méthodiques",
      "Stratèges",
      "Créateurs de pièges ou sceaux",
      "Personnages érudits ou traditionnels"
    ],
    associatedSkills: ["fuin"],
    previewTags: ["Sceaux", "Contrat", "Préparation", "Contrôle"]
  }
};

NARUTO25E.affinityCostModes = {
  freePrimary: "Affinité principale offerte",
  countPrimary: "Affinité principale déduite des 5 compétences initiales"
};

NARUTO25E.clanCreationData = {
  uchiha: {
    summary: "Clan célèbre pour son affinité naturelle avec le Katon et l’éveil du Sharingan.",
    lore: "Les Uchiha sont une lignée prestigieuse, crainte et surveillée, dont le Sharingan fascine autant qu’il inquiète. Leur puissance naît souvent d’une tension entre discipline, héritage familial et émotions extrêmes.",
    creationAdvice: "Très bon choix pour un joueur voulant un personnage offensif, perceptif et marqué par un dōjutsu évolutif. Le Katon donne une base élémentaire agressive, tandis que le Sharingan ouvre une progression de lignée très forte.",
    mandatorySkills: [],
    mandatoryAffinities: ["katon"],
    startingFeatures: ["Sharingan — premier tomoe"],
    futureUnlocks: [
      "Évolution du Sharingan par rangs de Lignée",
      "Dōsatsugan et copie limitée",
      "Magen et genjutsu oculaire",
      "Mangekyō Sharingan avec validation MJ",
      "EMS et Rinnegan comme options rares et narratives"
    ],
    narrativeWarnings: [
      "Le Sharingan est politiquement sensible et doit être utilisé avec discrétion.",
      "Le Mangekyō Sharingan nécessite un traumatisme narratif majeur validé par le MJ.",
      "EMS et Rinnegan ne sont pas des progressions automatiques."
    ],
    recommendedBuilds: [
      "Ninjutsu offensif Katon",
      "Genjutsu oculaire",
      "Duelliste tactique",
      "Shinobi prodige mais surveillé"
    ],
    previewTags: ["Katon", "Dōjutsu", "Genjutsu", "Éveil rare"]
  },

  senju: {
    summary: "Clan réputé pour sa vitalité exceptionnelle, sa puissance de lignée et ses héritages fondateurs.",
    lore: "Les Senju incarnent la force vitale, l’adaptation et l’héritage ancien de Konoha. Leur sang est lié à de nombreuses légendes, notamment aux compatibilités rares avec certaines évolutions de lignée.",
    creationAdvice: "Très bon choix pour un personnage robuste, polyvalent ou destiné à porter une lignée puissante. Le clan convient bien aux profils protecteurs, meneurs ou ninjas à forte endurance.",
    mandatorySkills: ["mokuton"],
    mandatoryAffinities: ["doton", "suiton"],
    startingFeatures: [],
    futureUnlocks: [
      "Vitalité et puissance de lignée",
      "Compatibilités spéciales avec cellules Senju",
      "Accès narratif privilégié au Mokuton selon validation MJ",
      "Synergies possibles avec endurance, soin et défense"
    ],
    narrativeWarnings: [
      "Le Mokuton et les cellules Senju doivent rester des éléments surveillés par le MJ.",
      "La puissance du clan peut avoir des implications politiques ou médicales."
    ],
    recommendedBuilds: [
      "Protecteur robuste",
      "Ninjutsu polyvalent",
      "Contrôle et terrain",
      "Héritier d’une lignée fondatrice"
    ],
    previewTags: ["Vitalité", "Mokuton", "Polyvalence", "Héritage"]
  },

  hyuga: {
    summary: "Clan détenteur du Byakugan et maître du Jūken.",
    lore: "Les Hyūga sont une famille ancienne, hiérarchisée et redoutée pour leur vision parfaite du chakra. Leur Byakugan donne une perception exceptionnelle, mais aussi des responsabilités et des secrets de clan.",
    creationAdvice: "Excellent choix pour un joueur voulant un combattant précis, défensif et perceptif. Le Jūken oriente naturellement vers le corps à corps technique et la lecture du chakra.",
    mandatorySkills: ["juken"],
    mandatoryAffinities: [],
    startingFeatures: ["Byakugan"],
    futureUnlocks: [
      "Amélioration du Byakugan par rangs de Lignée",
      "Techniques Jūken",
      "Détection et lecture du chakra",
      "Tenseigan comme éveil rare réservé aux Hyūga"
    ],
    narrativeWarnings: [
      "La plupart des pouvoirs Hyūga exigent l’activation du Byakugan.",
      "Le Tenseigan est extrêmement rare et nécessite validation MJ."
    ],
    recommendedBuilds: [
      "Combattant au corps à corps précis",
      "Détecteur / éclaireur",
      "Protecteur défensif",
      "Duel tactique"
    ],
    previewTags: ["Byakugan", "Jūken", "Perception", "Défense"]
  },

  kato: {
    summary: "Clan lié au Yūrengan, à l’infiltration spectrale et aux arts de Meidō.",
    lore: "Les Katō sont associés aux missions à haut risque, aux phénomènes surnaturels et aux techniques fantomatiques. Leur dōjutsu, le Yūrengan, modifie leur perception et leur permet de distinguer le tangible de l’intangible.",
    creationAdvice: "Bon choix pour un joueur voulant un personnage subtil, infiltrateur ou mystique. Le clan se prête bien aux éclaireurs surnaturels, assassins spectraux, médiums de terrain et spécialistes des créatures issues des Royaumes Parallèles.",
    mandatorySkills: [],
    mandatoryAffinities: [],
    startingFeatures: ["Yūrengan"],
    futureUnlocks: [
      "Yūrengan comme dōjutsu de rang 1",
      "Forteresse mentale et renforcement interne",
      "Forme spectrale / état éthéré",
      "Invisibilité fantomatique",
      "Cri silencieux et possession spectrale",
      "Transformation spirituelle comme sommet de lignée"
    ],
    narrativeWarnings: [
      "Les pouvoirs actifs Katō exigent généralement l’activation du Yūrengan.",
      "La forme spectrale, la possession et les interactions avec Meidō doivent être cadrées par le MJ.",
      "Le rang 8 Katō devra être vérifié ou clarifié depuis les règles papier avant automatisation complète."
    ],
    recommendedBuilds: [
      "Infiltrateur spectral",
      "Éclaireur surnaturel",
      "Contrôleur subtil",
      "Spécialiste des Royaumes Parallèles"
    ],
    previewTags: ["Yūrengan", "Spectral", "Infiltration", "Meidō"]
  },

  nara: {
    summary: "Clan spécialisé dans la manipulation des ombres. Le Kage est une compétence propre au clan Nara.",
    lore: "Les Nara sont connus pour leur intelligence froide, leur patience et leur art du contrôle par les ombres. Ils gagnent rarement par force brute : ils gagnent parce que le piège était déjà posé.",
    creationAdvice: "Très bon choix pour un joueur tactique qui aime contrôler le terrain, immobiliser les adversaires et réfléchir avant d’agir.",
    mandatorySkills: ["kage"],
    mandatoryAffinities: [],
    startingFeatures: [],
    futureUnlocks: [
      "Manipulation des ombres",
      "Immobilisation et contrôle",
      "Techniques de piège et de coordination",
      "Progression tactique très forte en équipe"
    ],
    narrativeWarnings: [
      "Le clan est moins adapté au joueur qui veut uniquement frapper fort.",
      "Le placement et l’anticipation sont essentiels."
    ],
    recommendedBuilds: [
      "Contrôleur de terrain",
      "Stratège",
      "Chef d’équipe discret",
      "Support tactique"
    ],
    previewTags: ["Kage", "Contrôle", "Ombres", "Stratégie"]
  },

  aburame: {
    summary: "Clan utilisant les Kikaichū comme partenaires et armes vivantes.",
    lore: "Les Aburame vivent en symbiose avec leurs insectes. Cette relation donne des capacités uniques, mais impose une identité très particulière et parfois inquiétante pour les autres shinobi.",
    creationAdvice: "Très bon choix pour tester les mécaniques spéciales : réserve Kikaichū, gestion de ressource, contrôle, détection et pression indirecte.",
    mandatorySkills: ["kikaichu"],
    mandatoryAffinities: [],
    startingFeatures: ["Réserve Kikaichū"],
    futureUnlocks: [
      "Réserve Kikaichū",
      "Utilisation d’insectes en combat et exploration",
      "Détection, harcèlement et contrôle",
      "Progression de colonie liée à la Lignée"
    ],
    narrativeWarnings: [
      "Le personnage possède une relation permanente avec une colonie vivante.",
      "La gestion de réserve Kikaichū doit rester claire pour éviter les oublis."
    ],
    recommendedBuilds: [
      "Contrôleur indirect",
      "Éclaireur",
      "Harceleur tactique",
      "Spécialiste de ressource"
    ],
    previewTags: ["Kikaichū", "Ressource", "Contrôle", "Détection"]
  },

  inuzuka: {
    summary: "Clan combattant en duo permanent avec un compagnon du clan Inu.",
    lore: "Les Inuzuka forment un binôme instinctif avec leur partenaire animal. Leur style repose sur l’odorat, la traque, la vitesse, la brutalité coordonnée et les techniques de Forme Sauvage.",
    creationAdvice: "Excellent choix pour un joueur voulant un style direct, mobile et très incarné. Le personnage doit être pensé avec son compagnon, car le duo est le cœur de la lignée.",
    mandatorySkills: ["kuchiyose"],
    mandatoryAffinities: [],
    startingFeatures: ["Gardien du clan Inu"],
    futureUnlocks: [
      "Compagnon canin permanent",
      "Bonus de pistage et de survie",
      "Jinjū Kongō / Forme Sauvage",
      "Gatsuga et assauts coordonnés",
      "Flair, fusion et appel de la meute"
    ],
    narrativeWarnings: [
      "Le compagnon animal doit être géré comme une partie importante du personnage.",
      "Le Charactomancer devra prévoir une étape dédiée au compagnon Inuzuka.",
      "Les pouvoirs de duo seront d’abord prévisualisés avant automatisation complète."
    ],
    recommendedBuilds: [
      "Traqueur",
      "Combattant mobile",
      "Duo offensif",
      "Éclaireur agressif"
    ],
    previewTags: ["Clan Inu", "Traque", "Forme Sauvage", "Duo"]
  },

  munefuda: {
    summary: "Clan lié au Jiton et aux arts magnétiques.",
    mandatorySkills: ["jiton"],
    mandatoryAffinities: [],
    startingFeatures: []
  },

  yamanaka: {
    summary: "Clan spécialisé dans l’esprit, les émotions et la transmission mentale.",
    mandatorySkills: ["resistancesEmotionnelles"],
    mandatoryAffinities: [],
    startingFeatures: []
  },

  aniki: {
    summary: "Clan lié au Sumi et aux techniques d’encre.",
    mandatorySkills: ["sumi"],
    mandatoryAffinities: [],
    startingFeatures: []
  }
};

Object.assign(NARUTO25E.clanCreationData, {
  akaba: {
    summary: "Clan guerrier endurant, spécialisé dans la résistance et la pression de combat.",
    lore: "Les Akaba incarnent une tradition martiale robuste, tournée vers la confrontation, le courage et la tenue de ligne.",
    creationAdvice: "Bon choix pour un personnage solide, frontal, capable d’encaisser et de soutenir l’équipe en combat.",
    mandatorySkills: ["intimidation"],
    mandatoryAffinities: [],
    startingFeatures: ["Corps du Guerrier"],
    futureUnlocks: ["Blessure A", "interceptions supplémentaires", "pression d’initiative", "bonus de Parade", "Fureur du Lion"],
    narrativeWarnings: ["Style orienté combat direct et intimidation."],
    recommendedBuilds: ["Combattant robuste", "Intercepteur", "Frontliner", "Chef de mêlée"],
    previewTags: ["Résistance", "Interception", "Intimidation", "Mêlée"]
  },

  akimichi: {
    summary: "Clan à la vitalité massive, lié à la croissance corporelle et aux pilules sacrées.",
    lore: "Les Akimichi sont connus pour leur puissance physique, leur contrôle calorique et leurs arts secrets liés aux pilules.",
    creationAdvice: "Très bon choix pour un tank physique, un combattant massif ou un personnage centré sur la Vigueur.",
    mandatorySkills: [],
    mandatoryAffinities: [],
    startingFeatures: ["Endurance Singulière"],
    futureUnlocks: ["Blessures supplémentaires", "bonus de Vigueur", "techniques de croissance", "pilules sacrées", "immunité physique temporaire"],
    narrativeWarnings: ["Les pilules sacrées et la croissance géante demandent un cadrage MJ."],
    recommendedBuilds: ["Tank", "Briseur", "Combattant massif", "Utilisateur de pilules"],
    previewTags: ["Vigueur", "Croissance", "Pilules", "Tank"]
  },

  ao: {
    summary: "Clan de lignée instable, capable d’assimiler temporairement des pouvoirs par ingestion de sang.",
    lore: "La lignée Ao fonctionne comme un mimétisme héréditaire dangereux, dépendant du sang et de la stabilité physique du personnage.",
    creationAdvice: "À réserver aux tables prêtes à gérer un pouvoir très spécial, variable et supervisé par le MJ.",
    mandatorySkills: [],
    mandatoryAffinities: [],
    startingFeatures: ["Assimilation du Sang"],
    futureUnlocks: ["Copie d’un pouvoir de lignée", "remplacement de pouvoir", "gestion de compétence copiée", "risques narratifs"],
    narrativeWarnings: ["Clan fortement MJ-dépendant. La copie de pouvoir doit toujours être arbitrée."],
    recommendedBuilds: ["Caméléon de lignée", "Sujet expérimental", "Shinobi instable"],
    previewTags: ["Copie", "Sang", "Variable", "MJ"]
  },

  eshimuro: {
    summary: "Lignée secrète de réceptacles sacrés, liée au Fūin et à l’emprisonnement de créatures.",
    lore: "Les Eshimuro portent en eux des sceaux capables d’emprisonner des entités et d’altérer leur signature de chakra.",
    creationAdvice: "Très bon choix pour un personnage mystique, scellé, dangereux et narrativement lourd.",
    mandatorySkills: ["fuin"],
    mandatoryAffinities: [],
    startingFeatures: ["Shinseina Yōki — Réceptacle Sacré"],
    futureUnlocks: ["Chakra supplémentaire", "signature de royaume", "pouvoir SPE de créature", "Kongō Fūsa", "extraction"],
    narrativeWarnings: ["Le contenu de la créature scellée doit être validé par le MJ."],
    recommendedBuilds: ["Réceptacle", "Fūin mystique", "Prison vivante", "Spécialiste des royaumes"],
    previewTags: ["Fūin", "Réceptacle", "Créature", "Chakra"]
  },

  ishida: {
    summary: "Clan lié aux visions, aux songes, au calme spirituel et aux protections de Yumedō.",
    mandatorySkills: [],
    mandatoryAffinities: [],
    startingFeatures: ["Shikyo — Vision des Futures"],
    futureUnlocks: ["vision de mort", "bonus Caractère", "dissipation d’illusions", "barrière spirituelle", "voyage spectral", "prédiction"],
    narrativeWarnings: ["Les pouvoirs de vision et de prédiction doivent rester sous contrôle MJ."],
    recommendedBuilds: ["Oracle", "Défenseur spirituel", "Anti-genjutsu", "Mystique de Yumedō"],
    previewTags: ["Yumedō", "Vision", "Gensou", "Caractère"]
  },

  kagayaki: {
    summary: "Clan solaire lié au Katon, à la radiance, aux barrières sacrées et aux soins purificateurs.",
    mandatorySkills: ["katon"],
    mandatoryAffinities: ["katon"],
    startingFeatures: ["Shakujo — Bâton Sacré"],
    futureUnlocks: ["Radiance", "soins", "barrière divine", "immunité au feu", "Nova", "Renaissance Divine"],
    narrativeWarnings: ["Plusieurs pouvoirs mélangent soin, feu sacré et anti-créatures des royaumes parallèles."],
    recommendedBuilds: ["Soigneur solaire", "Katon sacré", "Protecteur", "Anti-démon"],
    previewTags: ["Katon", "Soin", "Barrière", "Solaire"]
  },

  kenta: {
    summary: "Clan des masques, de la contrefaçon et des états psychophysiques extrêmes.",
    mandatorySkills: [],
    mandatoryAffinities: [],
    startingFeatures: ["Masque physique"],
    futureUnlocks: ["masques", "vigueur", "rage", "vitalité", "contrefaçon", "protection psychique"],
    narrativeWarnings: ["Les masques et états de rage doivent être surveillés pour éviter les abus."],
    recommendedBuilds: ["Infiltrateur masqué", "Combattant instable", "Tank psychique"],
    previewTags: ["Masques", "Physique", "Psychique", "Contrefaçon"]
  },

  kurama: {
    summary: "Clan genjutsu à la psyché multiple, capable d’illusions dangereusement réalistes.",
    mandatorySkills: ["gensou"],
    mandatoryAffinities: [],
    startingFeatures: ["Un et Multiple"],
    futureUnlocks: ["résistance psychique", "Gensou renforcé", "Cauchemar éveillé", "double maléfique", "illusions dans l’illusion"],
    narrativeWarnings: ["La santé mentale, le double maléfique et Jigokudō sont des enjeux narratifs importants."],
    recommendedBuilds: ["Genjutsu", "Illusionniste", "Contrôleur mental", "Personnage fragmenté"],
    previewTags: ["Gensou", "Illusions", "Psychique", "Jigokudō"]
  },

  morino: {
    summary: "Clan d’interrogateurs et de résistants mentaux, spécialisé dans l’intimidation et la vigilance.",
    mandatorySkills: ["intimidation"],
    mandatoryAffinities: [],
    startingFeatures: ["Chokan — Vigilance de l’Esprit"],
    futureUnlocks: ["immunité à la surprise", "aura menaçante", "feindre la mort", "langage silencieux", "présence immobile"],
    narrativeWarnings: ["Clan très lié à la Police Centrale et aux méthodes d’interrogatoire."],
    recommendedBuilds: ["Interrogateur", "Intimidateur", "Sentinelle", "Tank mental"],
    previewTags: ["Intimidation", "Vigilance", "Mental", "Police"]
  },

  sarutobi: {
    summary: "Clan polyvalent lié au feu, à la démolition et à la tradition martiale de Kashin.",
    mandatorySkills: [],
    mandatoryAffinities: [],
    startingFeatures: ["Force de Kashin"],
    futureUnlocks: ["démineur", "poudre à canon", "feu intérieur", "brasier protecteur"],
    narrativeWarnings: ["Très bon clan de base polyvalent sans sous-système lourd."],
    recommendedBuilds: ["Polyvalent", "Katon", "Démolition", "Protecteur"],
    previewTags: ["Kashin", "Feu", "Explosifs", "Polyvalence"]
  },

  shimadoku: {
    summary: "Clan reptilien et toxique lié aux contrats sacrés, au poison et au remodelage physique.",
    mandatorySkills: ["kuchiyose"],
    mandatoryAffinities: [],
    startingFeatures: ["Contrat Sacré"],
    futureUnlocks: ["immunité aux poisons", "mue céleste", "sang empoisonné", "remodelage physique"],
    narrativeWarnings: ["Les contrats Dokuja/Kabutomushi et le sang empoisonné devront être cadrés."],
    recommendedBuilds: ["Invocateur reptilien", "Poison", "Survivant", "Contrôleur physique"],
    previewTags: ["Kuchiyose", "Poison", "Reptile", "Mue"]
  },

  shimura: {
    summary: "Clan secret de Fūin, de sceaux de contrainte, de protection et de destruction.",
    mandatorySkills: ["fuin"],
    mandatoryAffinities: [],
    startingFeatures: ["In’go"],
    futureUnlocks: ["sceaux", "renforcement", "silence", "clairvoyance", "paralysie", "scellement destructeur"],
    narrativeWarnings: ["Les sceaux Shimura sont politiquement et moralement sensibles."],
    recommendedBuilds: ["Fūin", "Contrôleur", "Agent secret", "Scelleur"],
    previewTags: ["Fūin", "Sceaux", "Secret", "Contrôle"]
  },

  takeda: {
    summary: "Clan armé d’une arme céleste, prédateur des créatures de Jigokudō.",
    mandatorySkills: ["armesExotiques"],
    mandatoryAffinities: [],
    startingFeatures: ["Arme Céleste — Houtai"],
    futureUnlocks: ["arme éveillée", "sixième sens", "châtiment", "anti-Jigokudō", "forme cannibale", "momie", "Léviathan"],
    narrativeWarnings: ["Très marqué par les ennemis de Jigokudō et les armes sacrées."],
    recommendedBuilds: ["Arme sacrée", "Chasseur de démons", "Combattant monstrueux"],
    previewTags: ["Arme", "Jigokudō", "Châtiment", "Prédateur"]
  },

  utatane: {
    summary: "Clan d’armurerie vivante, de Sōgu et d’armes invoquées.",
    mandatorySkills: ["kuchiyose"],
    mandatoryAffinities: [],
    startingFeatures: ["Tenbuki — Armes célestes"],
    futureUnlocks: ["armurerie humaine", "onde de choc", "interception armée", "déverrouillage sacré", "garde impériale"],
    narrativeWarnings: ["Le stockage d’armes et les armes célestes nécessiteront une UX inventaire plus tard."],
    recommendedBuilds: ["Arsenal vivant", "Kuchiyose d’armes", "Combattant armé"],
    previewTags: ["Kuchiyose", "Armes", "Sōgu", "Fūin"]
  }
});

NARUTO25E.getClanCreationData = function (clanKey) {
  return NARUTO25E.clanCreationData?.[clanKey] ?? {
    summary: "",
    lore: "",
    creationAdvice: "",
    mandatorySkills: [],
    mandatoryAffinities: [],
    startingFeatures: [],
    futureUnlocks: [],
    narrativeWarnings: [],
    recommendedBuilds: [],
    previewTags: []
  };
};

NARUTO25E.getClanMandatorySkills = function (clanKey) {
  const clan = NARUTO25E.clans?.[clanKey];
  const data = NARUTO25E.getClanCreationData(clanKey);

  const skills = [
    ...(data.mandatorySkills ?? []),
    clan?.skillKey || ""
  ].filter(Boolean);

  return Array.from(new Set(skills));
};

NARUTO25E.getClanMandatoryAffinities = function (clanKey) {
  const data = NARUTO25E.getClanCreationData(clanKey);
  return Array.from(new Set(data.mandatoryAffinities ?? []));
};

NARUTO25E.getAffinitySkillKey = function (affinityKey) {
  return NARUTO25E.chakraAffinities?.[affinityKey]?.skillKey ?? "";
};

NARUTO25E.getAffinityCreationData = function (affinityKey) {
  return NARUTO25E.chakraAffinities?.[affinityKey] ?? {
    label: affinityKey ?? "",
    type: "",
    skillKey: "",
    description: "",
    playstyle: "",
    strengths: [],
    weaknesses: [],
    recommendedFor: [],
    associatedSkills: [],
    previewTags: []
  };
};

NARUTO25E.customClanKey = "custom";

NARUTO25E.isCustomClanKey = function (clanKey) {
  return clanKey === NARUTO25E.customClanKey;
};

NARUTO25E.getCustomClanMandatoryChoices = function (customClan = {}) {
  const normalizeArray = (value) => {
    if (Array.isArray(value)) return value.filter(Boolean);
    if (value && typeof value === "object") return Object.values(value).filter(Boolean);
    return [];
  };

  const directChoices = normalizeArray(customClan.mandatoryChoices);

  if (directChoices.length > 0) {
    return directChoices.slice(0, 2);
  }

  /*
  Compatibilité de secours avec les fiches déjà touchées par la 0.1.24 :
  si Foundry a stocké mandatorySkills / mandatoryAffinities, on les relit
  sans jamais appeler .filter() sur un objet.
  */
  const legacySkillChoices = normalizeArray(customClan.mandatorySkills).map((skillKey) => `skill:${skillKey}`);
  const legacyAffinityChoices = normalizeArray(customClan.mandatoryAffinities).map((affinityKey) => `affinity:${affinityKey}`);

  return [...legacySkillChoices, ...legacyAffinityChoices].slice(0, 2);
};

NARUTO25E.getCustomClanChoiceData = function (choiceKey) {
  if (!choiceKey || typeof choiceKey !== "string") return null;

  const [type, key] = choiceKey.split(":");
  if (!type || !key) return null;

  if (type === "skill") {
    const skill = NARUTO25E.skillDefinitions?.[key];
    if (!skill) return null;

    return {
      type,
      key,
      label: skill.label ?? key,
      valid: skill.category !== "clan",
      invalidReason: skill.category === "clan"
        ? "Les compétences de clan existantes ne peuvent pas être reprises par un clan custom."
        : ""
    };
  }

  if (type === "affinity") {
    const affinity = NARUTO25E.chakraAffinities?.[key];
    if (!affinity) return null;

    return {
      type,
      key,
      label: affinity.label ?? key,
      valid: true,
      invalidReason: ""
    };
  }

  return null;
};

NARUTO25E.getCustomClanChoiceLabel = function (choiceKey) {
  const choice = NARUTO25E.getCustomClanChoiceData(choiceKey);

  if (!choice) return choiceKey ?? "";

  if (choice.type === "skill") return `Compétence — ${choice.label}`;
  if (choice.type === "affinity") return `Affinité — ${choice.label}`;

  return choice.label;
};

NARUTO25E.uchihaPowerModes = {
  classic: {
    label: "Pouvoirs Uchiha classiques",
    summary: "La progression suit le databook papier : Tsukuyomi, Amaterasu, Allégeance/Kotoamatsukami, Izanagi/Izanami, Susanō.",
    warning: "Mode simple et compatible avec le système papier, mais moins fidèle à la logique individuelle des Mangekyō."
  },
  original: {
    label: "Pouvoirs Uchiha originaux",
    summary: "À l’éveil du Mangekyō, le joueur choisit ou crée un pouvoir pour l’œil droit et un pouvoir pour l’œil gauche.",
    warning: "Amaterasu, Tsukuyomi, Kamui et Kotoamatsukami ne sont pas obtenus automatiquement. Chaque œil doit être défini avec validation MJ."
  }
};

NARUTO25E.uchihaEyePowers = {
  amaterasu: {
    label: "Amaterasu",
    category: "Flammes noires",
    summary: "Produit les flammes noires capables de consumer presque toute matière.",
    requirements: ["Mangekyō Sharingan", "Validation MJ"],
    eyeNotes: "Pouvoir personnel d’un œil. Ne donne pas automatiquement la manipulation avancée des flammes.",
    tags: ["mangekyo", "katon", "flammes-noires", "offensif"]
  },

  enton: {
    label: "Enton / Kagutsuchi",
    category: "Manipulation des flammes noires",
    summary: "Permet de modeler, contrôler ou transformer les flammes noires d’Amaterasu.",
    requirements: ["Mangekyō Sharingan", "Amaterasu dans l’autre œil", "Validation MJ"],
    requiresOtherEyePower: "amaterasu",
    eyeNotes: "Ne fonctionne pleinement que si l’autre œil possède Amaterasu.",
    tags: ["mangekyo", "enton", "flammes-noires", "synergie"]
  },

  tsukuyomi: {
    label: "Tsukuyomi",
    category: "Genjutsu oculaire",
    summary: "Impose une illusion mentale d’une intensité extrême, souvent liée à la distorsion de la perception temporelle.",
    requirements: ["Mangekyō Sharingan", "Validation MJ"],
    eyeNotes: "Un double Tsukuyomi reste un cas ouvert à interprétation MJ, faute d’exemple canon clair.",
    tags: ["mangekyo", "genjutsu", "mental"]
  },

  kamui: {
    label: "Kamui",
    category: "Espace-temps",
    summary: "Manipule l’espace autour du porteur ou de la cible, selon l’œil concerné et la variante choisie.",
    requirements: ["Mangekyō Sharingan", "Validation MJ"],
    eyeNotes: "Les effets peuvent différer selon l’œil : contact/proximité, distance, transfert ou intangibilité selon cadrage MJ.",
    tags: ["mangekyo", "espace-temps", "déplacement"]
  },

  kotoamatsukami: {
    label: "Kotoamatsukami / Allégeance",
    category: "Contrôle mental absolu",
    summary: "Influence ou reprogramme subtilement la volonté d’une cible.",
    requirements: ["Mangekyō Sharingan", "Validation MJ forte"],
    eyeNotes: "Pouvoir extrêmement rare. Les deux yeux peuvent avoir des variantes de portée, subtilité ou intensité.",
    tags: ["mangekyo", "contrôle", "mental", "rare"]
  },

  custom: {
    label: "Pouvoir original",
    category: "Création MJ-joueur",
    summary: "Pouvoir de Mangekyō créé spécifiquement pour le personnage.",
    requirements: ["Mangekyō Sharingan", "Validation MJ"],
    eyeNotes: "À définir avec le MJ selon le traumatisme, la personnalité et le thème du personnage.",
    tags: ["mangekyo", "custom", "mj"]
  }
};

NARUTO25E.getUchihaPowerMode = function () {
  try {
    return game.settings?.get("naruto-25e", "uchihaPowerMode") ?? "classic";
  } catch (_error) {
    return "classic";
  }
};

NARUTO25E.getUchihaPowerModeData = function () {
  const mode = NARUTO25E.getUchihaPowerMode();
  return NARUTO25E.uchihaPowerModes?.[mode] ?? NARUTO25E.uchihaPowerModes.classic;
};

NARUTO25E.uchihaEyeStates = {
  healthy: {
    label: "Sain",
    summary: "L’œil est fonctionnel et ne présente pas encore de séquelle notable."
  },
  strained: {
    label: "Fatigué",
    summary: "L’œil montre les premiers signes d’usure liés au Mangekyō."
  },
  damaged: {
    label: "Abîmé",
    summary: "La vision est sérieusement atteinte. Le personnage devrait chercher une solution durable."
  },
  blind: {
    label: "Aveugle",
    summary: "L’œil est perdu ou inutilisable pour les pouvoirs du Sharingan."
  },
  eternal: {
    label: "Mangekyō Éternel",
    summary: "L’œil bénéficie d’une stabilité supérieure et ignore normalement la dégradation du Mangekyō."
  },
  rinnegan: {
    label: "Rinnegan",
    summary: "L’œil a évolué ou été remplacé par un Rinnegan, selon validation MJ."
  }
};

NARUTO25E.getUchihaEyeStateData = function (stateKey) {
  return NARUTO25E.uchihaEyeStates?.[stateKey] ?? NARUTO25E.uchihaEyeStates.healthy;
};

NARUTO25E.getUchihaEyePowerData = function (powerKey) {
  return NARUTO25E.uchihaEyePowers?.[powerKey] ?? null;
};

NARUTO25E.canSelectUchihaEyePower = function ({
  powerKey,
  eyeKey,
  rightEyePower,
  leftEyePower,
  rightEyePlayerValidated
} = {}) {
  if (!powerKey) {
    return {
      valid: true,
      reason: ""
    };
  }

  const power = NARUTO25E.getUchihaEyePowerData(powerKey);

  if (!power) {
    return {
      valid: false,
      reason: "Pouvoir oculaire inconnu."
    };
  }

  if (eyeKey === "left" && !rightEyePlayerValidated) {
    return {
      valid: false,
      reason: "L’œil gauche ne peut être choisi qu’après confirmation PJ de l’œil droit."
    };
  }

  if (power.requiresOtherEyePower) {
    const otherEyePower = eyeKey === "right" ? leftEyePower : rightEyePower;

    if (otherEyePower !== power.requiresOtherEyePower) {
      const requiredPower = NARUTO25E.getUchihaEyePowerData(power.requiresOtherEyePower);
      const requiredLabel = requiredPower?.label ?? power.requiresOtherEyePower;

      return {
        valid: false,
        reason: `${power.label} nécessite ${requiredLabel} dans l’autre œil.`
      };
    }
  }

  return {
    valid: true,
    reason: ""
  };
};

NARUTO25E.getMangekyoUsageState = function (uses = 0, hasEternalMangekyoSharingan = false, hasRinnegan = false) {
  const safeUses = Math.max(0, Number(uses ?? 0));

  if (hasRinnegan) {
    return {
      uses: safeUses,
      vigilancePenalty: 0,
      thresholdLabel: "Rinnegan",
      warning: "Le Rinnegan permet d’ignorer ou de remodeler les séquelles selon validation MJ.",
      shouldSeekEms: false,
      blindThresholdReached: false
    };
  }

  if (hasEternalMangekyoSharingan) {
    return {
      uses: safeUses,
      vigilancePenalty: 0,
      thresholdLabel: "Mangekyō Éternel",
      warning: "L’EMS stabilise normalement la dégradation du Mangekyō.",
      shouldSeekEms: false,
      blindThresholdReached: false
    };
  }

  const vigilancePenalty = Math.min(5, Math.floor(safeUses / 10));
  const shouldSeekEms = safeUses >= 30;
  const blindThresholdReached = safeUses >= 50;

  let thresholdLabel = "Stable";
  let warning = "Aucune séquelle mécanique notable pour le moment.";

  if (safeUses >= 50) {
    thresholdLabel = "Cécité";
    warning = "Seuil de cécité atteint : les yeux devraient être considérés comme aveugles sans intervention narrative majeure.";
  } else if (safeUses >= 30) {
    thresholdLabel = "Dégradation critique";
    warning = "Quête EMS fortement conseillée : la vision décline dangereusement.";
  } else if (safeUses >= 10) {
    thresholdLabel = "Dégradation";
    warning = "La fatigue visuelle devient notable. Appliquer le malus conseillé si le MJ le valide.";
  }

  return {
    uses: safeUses,
    vigilancePenalty,
    thresholdLabel,
    warning,
    shouldSeekEms,
    blindThresholdReached
  };
};

NARUTO25E.uchihaRanksRequiringMangekyo = [5, 6, 7, 8, 10];

NARUTO25E.requiresMangekyoForUchihaRank = function (rank) {
  return NARUTO25E.uchihaRanksRequiringMangekyo.includes(Number(rank));
};

NARUTO25E.clanLineageCaps = {
  aburame: 5,
  akaba: 5,
  akimichi: 10,
  aniki: 5,
  ao: 10,
  eshimuro: 10,
  hyuga: 10,
  inuzuka: 10,
  ishida: 10,
  kagayaki: 10,
  kato: 10,
  kenta: 10,
  kurama: 10,
  mitokado: 10,
  morino: 10,
  munefuda: 10,
  nara: 5,
  sarutobi: 5,
  senju: 10,
  shimadoku: 10,
  shimura: 10,
  takeda: 10,
  uchiha: 10,
  utatane: 10,
  yamanaka: 10
};

NARUTO25E.getClanLineageCap = function (clanKey) {
  return Number(NARUTO25E.clanLineageCaps[clanKey] ?? 10);
};

NARUTO25E.clanLineageFeatures = {
  aburame: [
    {
      rank: 1,
      label: "Esprit de l’Essaim",
      type: "Capacité de lignée",
      summary: "Le personnage abrite une colonie de Kikaichū et gagne la compétence clanique Kikaichū dès la création.",
      mechanical: "Débloque la compétence Kikaichū au niveau 1. Prépare la future réserve Kikaichū et les interactions de chakra des insectes.",
      tags: ["clan", "aburame", "kikaichu", "chakra-reserve"]
    },
    {
      rank: 2,
      label: "Empathie",
      type: "Capacité de lignée",
      summary: "Les insectes étendent les sens du personnage et servent de relais de perception.",
      mechanical: "Permet des jets de Vigilance, Sixième Sens ou Sentinelle dans une large zone. Détail exact à automatiser plus tard.",
      tags: ["clan", "aburame", "kikaichu", "perception"]
    },
    {
      rank: 3,
      label: "Kaisan — Devenir la Multitude",
      type: "Pouvoir actif",
      summary: "Le personnage peut se désunifier en une multitude d’insectes.",
      mechanical: "Prépare l’état Particules / unification-désunification. Immunités et faiblesses à automatiser plus tard.",
      tags: ["clan", "aburame", "kikaichu", "particles", "ud"]
    },
    {
      rank: 4,
      label: "Ruche",
      type: "Bonus de lignée",
      summary: "La symbiose avec la colonie renforce le chakra et la stabilité mentale du personnage.",
      mechanical: "+100 Chakra, +2 Caractère.",
      tags: ["clan", "aburame", "kikaichu", "chakra", "caractere"]
    },
    {
      rank: 5,
      label: "Ryūsei — Météore d’Insectes",
      type: "Technique de lignée",
      summary: "Le personnage concentre son essaim en une attaque destructrice.",
      mechanical: "Dégâts de base LIGN × 4, augmentés par dépense de chakra insecte. Automatisation future.",
      tags: ["clan", "aburame", "kikaichu", "damage"]
    }
  ],

  hyuga: [
    {
      rank: 1,
      label: "Byakugan",
      type: "Dōjutsu",
      summary: "Œil blanc héréditaire du clan Hyūga, permettant de voir le chakra et presque tout l’environnement autour du personnage.",
      mechanical: "Activation à volonté. Coût papier : 10 Chakra, entretien 5 Chakra par tour actif. Zone de vision du chakra : Lignée × 5 m.",
      tags: ["clan", "hyuga", "byakugan", "dojutsu"]
    },
    {
      rank: 2,
      label: "Art du Poing Faible",
      type: "Bonus de lignée",
      summary: "Le personnage raffine son Jūken grâce à la lecture du chakra offerte par le Byakugan.",
      mechanical: "Bonus de Lignée à Corps à Corps selon le databook. Condition : Byakugan activé. À adapter plus tard à la compétence Jūken du système.",
      tags: ["clan", "hyuga", "juken", "taijutsu"]
    },
    {
      rank: 3,
      label: "Vision Spatiale",
      type: "Pouvoir actif",
      summary: "Le Byakugan projette la perception du personnage sur une zone étendue.",
      mechanical: "Zone papier : 500 m de rayon par point de Lignée. Immunité à la situation Surpris pendant l’activation. Automatisation future.",
      tags: ["clan", "hyuga", "byakugan", "perception"]
    },
    {
      rank: 4,
      label: "Intensité Spirituelle",
      type: "Bonus de lignée",
      summary: "Le sang Hyūga renforce le corps, l’esprit et la réserve de chakra.",
      mechanical: "+2 Vigueur, +1 Caractère, +50 Chakra.",
      tags: ["clan", "hyuga", "vigueur", "caractere", "chakra"]
    },
    {
      rank: 5,
      label: "Hakke Kūshō — Technique de la Paume Absolue",
      type: "Technique de lignée",
      summary: "Le personnage projette une frappe de Jūken à distance.",
      mechanical: "Condition : jet de Jūken réussi et Byakugan activé. Coût papier : 50 Chakra. Dégâts et portée à automatiser plus tard.",
      tags: ["clan", "hyuga", "juken", "byakugan", "damage"]
    },
    {
      rank: 6,
      label: "359 Degrés",
      type: "Bonus de lignée",
      summary: "Le personnage exploite presque parfaitement l’angle de vision du Byakugan.",
      mechanical: "+Lignée Esquive selon le databook. À automatiser plus tard.",
      tags: ["clan", "hyuga", "byakugan", "defense"]
    },
    {
      rank: 7,
      label: "Hakke Rokujūyon Shō — Soixante-Quatre Paumes",
      type: "Technique de lignée",
      summary: "Le personnage frappe les points de chakra d’une cible et bloque sa circulation interne.",
      mechanical: "Bloque le chakra et les pouvoirs de lignée actifs des cibles pendant Lignée rounds. Condition : attaque de corps à corps réussie. Automatisation future.",
      tags: ["clan", "hyuga", "juken", "chakra-block"]
    },
    {
      rank: 8,
      label: "Force Mystique",
      type: "Bonus de lignée",
      summary: "La lignée Hyūga atteint un palier supérieur de puissance interne.",
      mechanical: "+2 Vigueur, +2 Caractère, +150 Chakra.",
      tags: ["clan", "hyuga", "vigueur", "caractere", "chakra"]
    },
    {
      rank: 9,
      label: "Hakkeshō Kaiten — Barrage Tournoyant de Tendō",
      type: "Technique de lignée",
      summary: "Le personnage crée une défense tournoyante de chakra repoussant les attaques et les adversaires.",
      mechanical: "Barrière de rayon Lignée mètres, solidité TAI × 6, repousse hors zone. Automatisation future.",
      tags: ["clan", "hyuga", "juken", "barrier", "defense"]
    },
    {
      rank: 10,
      label: "Tenseigan — Œil de la Réincarnation",
      type: "Dōjutsu supérieur",
      summary: "Évolution extrêmement rare du Byakugan, réservée aux Hyūga sous validation MJ.",
      mechanical: "Option MJ rare. Augmente la supervision et permet des interactions télépathiques selon le databook. Éveil réel à cadrer narrativement.",
      tags: ["clan", "hyuga", "tenseigan", "dojutsu", "mj-only"]
    }
  ],

  nara: [
    {
      rank: 1,
      label: "Sens des Ombres",
      type: "Capacité de lignée",
      summary: "Le personnage développe une affinité instinctive avec les ombres, leur position, leur portée et leur potentiel tactique.",
      mechanical: "Prépare les techniques utilisant la compétence Kage, déjà accordée comme compétence obligatoire de clan.",
      tags: ["clan", "nara", "kage", "shadow"]
    },
    {
      rank: 2,
      label: "Stratège",
      type: "Bonus de lignée",
      summary: "Le personnage renforce ses capacités tactiques et mentales.",
      mechanical: "Bonus Lignée sur Mental.",
      tags: ["clan", "nara", "mental"]
    },
    {
      rank: 3,
      label: "Kagemane — Manipulation des Ombres",
      type: "Technique de lignée",
      summary: "Le personnage peut immobiliser ou contrôler une cible par son ombre.",
      mechanical: "Sur jet de Kage réussi. Effet détaillé à automatiser plus tard.",
      tags: ["clan", "nara", "kage", "control"]
    },
    {
      rank: 4,
      label: "Profondeur mentale",
      type: "Bonus de lignée",
      summary: "Le personnage gagne une stabilité mentale supérieure.",
      mechanical: "+3 Caractère.",
      tags: ["clan", "nara", "caractere"]
    },
    {
      rank: 5,
      label: "Kage Nui — Entrelacement des Ombres",
      type: "Technique de lignée",
      summary: "Le personnage transforme son ombre en arme offensive.",
      mechanical: "Sur jet de Kage réussi. Dégâts et zone à automatiser plus tard.",
      tags: ["clan", "nara", "kage", "damage"]
    }
  ],

  senju: [
    {
      rank: 1,
      label: "Nature Supérieure — Mokuton",
      type: "Capacité de lignée",
      summary: "Le personnage manifeste l’élément Bois, héritage rare du clan Senju.",
      mechanical: "Débloque la compétence Mokuton. Le databook indique que Suiton et Doton sont nécessaires pour les techniques Mokuton.",
      tags: ["clan", "senju", "mokuton", "chakra-nature"]
    },
    {
      rank: 2,
      label: "Force Naturelle",
      type: "Bonus de lignée",
      summary: "Le corps du personnage bénéficie de la vitalité naturelle du Mokuton.",
      mechanical: "+2 Vigueur, +50 Chakra.",
      tags: ["clan", "senju", "vigueur", "chakra"]
    },
    {
      rank: 3,
      label: "Jukai Shirei — Domination Végétale",
      type: "Technique de lignée",
      summary: "Le personnage manipule les structures végétales et les objets en bois.",
      mechanical: "Attraction/répulsion du bois, dégâts sur structures et cibles selon jet de Mokuton réussi. Automatisation future.",
      tags: ["clan", "senju", "mokuton", "control"]
    },
    {
      rank: 4,
      label: "Vague de Chakra",
      type: "Bonus de lignée",
      summary: "Le chakra du personnage se manifeste avec une présence imposante.",
      mechanical: "+Lignée Intimidation.",
      tags: ["clan", "senju", "chakra", "intimidation"]
    },
    {
      rank: 5,
      label: "Shichūrō — La Prison aux Quatre Piliers",
      type: "Technique de lignée",
      summary: "Le personnage crée une prison de bois drainant le chakra.",
      mechanical: "Sur jet de Mokuton réussi. Prison avec solidité NIN + Lignée × 2, drain Lignée × 5 Chakra par tour. Automatisation future.",
      tags: ["clan", "senju", "mokuton", "prison", "chakra-drain"]
    },
    {
      rank: 6,
      label: "Énergie Mystique",
      type: "Bonus de lignée",
      summary: "Le personnage atteint un palier supérieur de vitalité et de force spirituelle.",
      mechanical: "+2 Vigueur, +2 Caractère, +150 Chakra.",
      tags: ["clan", "senju", "vigueur", "caractere", "chakra"]
    },
    {
      rank: 7,
      label: "Jukai Gōhei — Fusion Végétale",
      type: "Pouvoir actif",
      summary: "Le personnage transforme son corps en bois et peut absorber les dégâts.",
      mechanical: "Prépare une unification/désunification végétale. Automatisation future.",
      tags: ["clan", "senju", "mokuton", "ud", "defense"]
    },
    {
      rank: 8,
      label: "Piliers Mythiques",
      type: "Technique de lignée",
      summary: "Le Mokuton permet de réduire à l’obéissance ou d’immobiliser des créatures mythiques.",
      mechanical: "Effet contre démons / animaux mythiques selon le databook. Automatisation future.",
      tags: ["clan", "senju", "mokuton", "mythic", "control"]
    },
    {
      rank: 9,
      label: "Jukai Heki — Barrière Végétale",
      type: "Technique de lignée",
      summary: "Le personnage érige une barrière végétale défensive.",
      mechanical: "Solidité (LIGN + NIN) × 3. Durée, zone et fréquence à automatiser plus tard.",
      tags: ["clan", "senju", "mokuton", "barrier", "defense"]
    },
    {
      rank: 10,
      label: "Jukai Kōtan — Nativité Végétale",
      type: "Technique de lignée",
      summary: "Expression mythique du Mokuton à grande échelle.",
      mechanical: "LIGN × 6 dégâts, zone et durée à automatiser plus tard.",
      tags: ["clan", "senju", "mokuton", "mythic"]
    }
  ],

    kato: [
    {
      rank: 1,
      label: "Yūrengan — Vision Crépusculaire",
      type: "Dōjutsu",
      summary: "Le personnage éveille le Yūrengan, dōjutsu du clan Katō lié à Meidō et aux phénomènes surnaturels.",
      mechanical: "Activation à volonté. Coût papier : 10 Chakra, entretien 5 Chakra par tour actif. Permet de percevoir les manifestations surnaturelles et de distinguer tangible / intangible.",
      tags: ["clan", "kato", "yurengan", "dojutsu"]
    },
    {
      rank: 2,
      label: "Forteresse Mentale",
      type: "Bonus de lignée",
      summary: "Le sang Katō renforce la stabilité psychique, physique et la réserve de chakra.",
      mechanical: "+1 Caractère, +1 Vigueur, +50 Chakra.",
      tags: ["clan", "kato", "caractere", "vigueur", "chakra"]
    },
    {
      rank: 3,
      label: "Ikiryō — Forme Spectrale",
      type: "Pouvoir actif",
      summary: "Le personnage transforme son corps en forme spectrale intangible.",
      mechanical: "État Éthéré, durée Lignée tours, coût papier 30 Chakra, utilisable Lignée fois par semaine. Automatisation future.",
      tags: ["clan", "kato", "spectral", "ethereal", "ud"]
    },
    {
      rank: 4,
      label: "Invisibilité Fantomatique",
      type: "Bonus de lignée",
      summary: "Le personnage devient plus difficile à percevoir et à suivre.",
      mechanical: "+Lignée Camouflage.",
      tags: ["clan", "kato", "camouflage", "infiltration"]
    },
    {
      rank: 5,
      label: "Zekkyou — Cri Silencieux",
      type: "Technique de lignée",
      summary: "Le personnage projette un cri spirituel inaudible perturbant l’initiative ennemie.",
      mechanical: "Genjutsu auditif. Effet papier : -3 × GEN Initiative pendant Lignée tours. Automatisation future.",
      tags: ["clan", "kato", "genjutsu", "meido", "control"]
    },
    {
      rank: 6,
      label: "Amplificateur",
      type: "Bonus de lignée",
      summary: "La forme spectrale du personnage devient plus stable et son chakra augmente.",
      mechanical: "+100 Chakra. La forme spectrale dure désormais LIGN × 5 tours selon le databook.",
      tags: ["clan", "kato", "chakra", "spectral"]
    },
    {
      rank: 7,
      label: "Possession Spectrale",
      type: "Pouvoir actif",
      summary: "En forme spectrale, le personnage peut entrer dans le corps d’un individu et contrôler ses facultés motrices.",
      mechanical: "Durée Lignée tours. Effet sensible à cadrer par le MJ. Automatisation future.",
      tags: ["clan", "kato", "spectral", "possession", "mj-sensitive"]
    },
    {
      rank: 9,
      label: "Himei — Cri de la Banshee",
      type: "Technique de lignée",
      summary: "Le personnage libère un cri spirituel destructeur, particulièrement efficace contre les créatures des Royaumes Parallèles.",
      mechanical: "NIN × 4 dégâts, ×2 contre créatures des Royaumes Parallèles. Automatisation future.",
      tags: ["clan", "kato", "meido", "damage", "banshee"]
    },
    {
      rank: 10,
      label: "Reika — Transformation Spirituelle",
      type: "Pouvoir mythique",
      summary: "Le personnage devient un esprit capable de traverser de grandes distances et de posséder un corps.",
      mechanical: "Immunité aux attaques pendant l’effet, déplacement Lignée × 100 km par tour, peut utiliser les pouvoirs du Yūrengan. Automatisation future et validation MJ recommandée.",
      tags: ["clan", "kato", "spirit", "meido", "mythic", "mj-only"]
    }
  ],

  inuzuka: [
    {
      rank: 1,
      label: "Gardien du clan Inu",
      type: "Capacité de lignée",
      summary: "Le personnage est lié à un compagnon chien-loup du clan Inu.",
      mechanical: "Compagnon permanent joué conjointement par le PJ et le MJ. Prépare la future étape Charactomancer dédiée au compagnon.",
      tags: ["clan", "inuzuka", "companion", "inu"]
    },
    {
      rank: 2,
      label: "Pisteur de Chikushōdō",
      type: "Bonus de lignée",
      summary: "Le personnage hérite des instincts de traque du clan Inuzuka.",
      mechanical: "+Lignée Survie.",
      tags: ["clan", "inuzuka", "survie", "tracking"]
    },
    {
      rank: 3,
      label: "Jinjū Kongō — Forme Sauvage",
      type: "Pouvoir actif",
      summary: "Le personnage adopte une forme de combat bestiale renforçant sa puissance physique.",
      mechanical: "+Lignée Physique / dégâts selon le databook. Durée Lignée rounds, fréquence Lignée par semaine. Automatisation future.",
      tags: ["clan", "inuzuka", "wild-form", "physical"]
    },
    {
      rank: 4,
      label: "Empathie Animale",
      type: "Capacité de lignée",
      summary: "Le personnage communique plus naturellement avec les animaux.",
      mechanical: "Permet de parler ou donner des ordres aux animaux selon leur niveau et la situation. Automatisation future.",
      tags: ["clan", "inuzuka", "animal", "communication"]
    },
    {
      rank: 5,
      label: "Gatsuga — Furie Sauvage",
      type: "Technique de lignée",
      summary: "Le personnage lance une attaque tournoyante brutale, souvent en coordination avec son compagnon.",
      mechanical: "Sur jet de Corps à corps réussi. Dégâts papier : (TAI + COR) × 2. Automatisation future.",
      tags: ["clan", "inuzuka", "gatsuga", "damage"]
    },
    {
      rank: 6,
      label: "Flair",
      type: "Bonus de lignée",
      summary: "L’odorat du personnage devient un outil de traque exceptionnel.",
      mechanical: "+Lignée Vigilance.",
      tags: ["clan", "inuzuka", "flair", "vigilance"]
    },
    {
      rank: 7,
      label: "Sōtōrō — Loup Monstrueux à Deux Têtes",
      type: "Pouvoir actif",
      summary: "Le personnage et son animal fusionnent en une créature gigantesque à deux têtes.",
      mechanical: "+Lignée Vigueur et Caractère. Effet de terreur / initiative en zone à automatiser plus tard.",
      tags: ["clan", "inuzuka", "fusion", "beast", "mythic"]
    },
    {
      rank: 8,
      label: "Crocs & Fourrure",
      type: "Bonus de lignée",
      summary: "Le personnage et son compagnon gagnent en robustesse et en puissance interne.",
      mechanical: "+3 Vigueur, +3 Caractère, +100 Chakra.",
      tags: ["clan", "inuzuka", "vigueur", "caractere", "chakra"]
    },
    {
      rank: 9,
      label: "Appeler la Meute",
      type: "Pouvoir actif",
      summary: "Le personnage peut rejoindre Chikushōdō avec son animal gardien et emmener d’autres alliés.",
      mechanical: "Effet de voyage / unification-désunification. Peut emmener Lignée % 3 personnes en plus du compagnon. Automatisation future.",
      tags: ["clan", "inuzuka", "chikushodo", "travel", "pack"]
    },
    {
      rank: 10,
      label: "Totem",
      type: "Pouvoir mythique",
      summary: "Sommet spirituel et bestial de la lignée Inuzuka.",
      mechanical: "Effet exact à préciser depuis le databook ou cadrage MJ avant automatisation.",
      tags: ["clan", "inuzuka", "totem", "mythic", "mj-only"]
    }
  ],


  munefuda: [
    {
      rank: 1,
      label: "Champ Magnétique Héréditaire",
      type: "Capacité de lignée",
      summary: "Le personnage perçoit instinctivement les métaux, les charges et les tensions magnétiques autour de lui.",
      mechanical: "Prépare les interactions avec Jiton, déjà accordé comme compétence obligatoire de clan.",
      tags: ["clan", "munefuda", "jiton", "magnetism"]
    },
    {
      rank: 2,
      label: "Fort comme la Foudre",
      type: "Bonus de lignée",
      summary: "Le corps et l’esprit sont renforcés par l’héritage magnétique.",
      mechanical: "+1 Vigueur, +1 Caractère.",
      tags: ["clan", "munefuda", "vigueur", "caractere"]
    },
    {
      rank: 3,
      label: "Raichikyū",
      type: "Technique de lignée",
      summary: "Le personnage perturbe les courants et magnétise les objets non organiques.",
      mechanical: "Effet EMP / magnétisation à automatiser plus tard.",
      tags: ["clan", "munefuda", "jiton", "emp"]
    }
  ],

  uchiha: [
    {
      rank: 1,
      label: "Sharingan — Premier tomoe",
      type: "Dōjutsu",
      summary: "Le personnage possède le Sharingan à son premier stade.",
      mechanical: "Prépare l’activation future du Sharingan et les interactions avec perception, lecture du mouvement et Genjutsu.",
      tags: ["clan", "uchiha", "sharingan", "dojutsu"]
    },
    {
      rank: 2,
      label: "Dōsatsugan — Sharingan Deuxième tomoe",
      type: "Dōjutsu",
      summary: "Le Sharingan développe une lecture plus fine du chakra, des gestes et des intentions adverses.",
      mechanical: "Effet détaillé à automatiser plus tard.",
      tags: ["clan", "uchiha", "sharingan", "dojutsu", "perception"]
    },
    {
      rank: 3,
      label: "Mitsudomoe — Sharingan Troisième tomoe",
      type: "Dōjutsu",
      summary: "Le Sharingan atteint sa forme classique complète à trois tomoe.",
      mechanical: "Prépare les effets avancés de lecture, anticipation, copie et pression mentale.",
      tags: ["clan", "uchiha", "sharingan", "dojutsu", "copy"]
    },
    {
      rank: 4,
      label: "Magen — Illusion démoniaque",
      type: "Genjutsu de lignée",
      summary: "Le Sharingan permet d’imposer des illusions mentales brutales et précises.",
      mechanical: "Effet détaillé à automatiser plus tard.",
      tags: ["clan", "uchiha", "sharingan", "genjutsu", "magen"]
    },
    {
      rank: 5,
      label: "Mangekyō Sharingan",
      type: "Dōjutsu supérieur",
      summary: "Éveil rare et dramatique du Sharingan, lié à un choc émotionnel majeur.",
      mechanical: "À verrouiller derrière validation MJ et conditions narratives.",
      tags: ["clan", "uchiha", "mangekyo", "dojutsu", "mj-only"]
    },
    {
      rank: 6,
      label: "Tsukuyomi — Monde spirituel des ténèbres",
      type: "Technique de lignée",
      summary: "Le Mangekyō impose une illusion mentale d’une intensité exceptionnelle.",
      mechanical: "Effet détaillé à automatiser plus tard.",
      tags: ["clan", "uchiha", "mangekyo", "genjutsu", "tsukuyomi"]
    },
    {
      rank: 7,
      label: "Amaterasu",
      type: "Technique de lignée",
      summary: "Le Mangekyō manifeste des flammes noires capables de consumer presque toute matière.",
      mechanical: "Effet détaillé à automatiser plus tard.",
      tags: ["clan", "uchiha", "mangekyo", "katon", "amaterasu"]
    },
    {
      rank: 8,
      label: "Allégeance",
      type: "Dōjutsu supérieur",
      summary: "Le pouvoir oculaire impose une domination ou une influence d’une puissance exceptionnelle.",
      mechanical: "Effet détaillé à automatiser plus tard selon les règles de contrôle mental et validation MJ.",
      tags: ["clan", "uchiha", "mangekyo", "control", "mj-only"]
    },
    {
      rank: 9,
      label: "Izanagi / Izanami",
      type: "Kinjutsu de lignée",
      summary: "Techniques interdites du Sharingan, capables de déformer le destin ou d’enfermer une cible dans une boucle spirituelle.",
      mechanical: "À verrouiller derrière validation MJ, coût narratif et conséquences lourdes.",
      tags: ["clan", "uchiha", "sharingan", "kinjutsu", "izanagi", "izanami", "mj-only"]
    },
    {
      rank: 10,
      label: "Susanō — le Guerrier des Six Mondes",
      type: "Dōjutsu mythique",
      summary: "Manifestation ultime du pouvoir protecteur et destructeur du Mangekyō Sharingan.",
      mechanical: "Effet détaillé à automatiser plus tard. Nécessite validation MJ et conditions narratives.",
      tags: ["clan", "uchiha", "mangekyo", "susanoo", "mythic", "mj-only"]
    }
  ],

  yamanaka: [
    {
      rank: 1,
      label: "Ancrage émotionnel",
      type: "Capacité de lignée",
      summary: "Le personnage possède un contrôle émotionnel renforcé, essentiel aux techniques mentales du clan Yamanaka.",
      mechanical: "Prépare les techniques mentales du clan. Résistances Émotionnelles reste accordée comme compétence obligatoire de clan.",
      tags: ["clan", "yamanaka", "emotion", "mind"]
    },
    {
      rank: 3,
      label: "Shintenshin",
      type: "Technique de lignée",
      summary: "Le personnage projette son esprit dans un autre corps.",
      mechanical: "Effet détaillé à automatiser plus tard.",
      tags: ["clan", "yamanaka", "mind-transfer"]
    }
  ],

  aniki: [
    {
      rank: 1,
      label: "Encre Vivante",
      type: "Capacité de lignée",
      summary: "Le personnage peut insuffler son chakra dans l’encre et préparer les futures techniques Sumi.",
      mechanical: "Prépare les techniques d’encre du clan. Sumi reste accordée comme compétence obligatoire de clan.",
      tags: ["clan", "aniki", "sumi", "ink"]
    }
  ]
};

Object.assign(NARUTO25E.clanLineageFeatures, {
  akaba: [
    { rank: 1, label: "Corps du Guerrier", type: "Capacité de lignée", summary: "Le corps de l’Akaba encaisse les blessures graves.", mechanical: "Blessure A.", bonuses: { special: ["Blessure A"] }, tags: ["clan", "akaba", "vigueur"] },
    { rank: 2, label: "Enchaînements Successifs", type: "Bonus de lignée", summary: "L’Akaba enchaîne les défenses et réactions.", mechanical: "+1 Interception TAI/ARM, puis +2 à partir de Lignée 6.", tags: ["clan", "akaba", "interception"] },
    { rank: 3, label: "Kyoukan — Clameur du Lion", type: "Pouvoir actif", summary: "Cri de guerre intimidant qui perturbe l’initiative adverse.", mechanical: "Sur Intimidation réussi : malus d’initiative aux adversaires identifiés. Automatisation future.", tags: ["clan", "akaba", "intimidation", "initiative"] },
    { rank: 4, label: "Instinct du Combattant", type: "Bonus de lignée", summary: "Instinct défensif renforcé.", mechanical: "Bonus de Lignée à Parade.", bonuses: { skills: { parade: "lineage" } }, tags: ["clan", "akaba", "parade"] },
    { rank: 5, label: "Eikou — La Fureur du Lion", type: "Pouvoir actif", summary: "Fureur martiale renforçant initiative et dégâts.", mechanical: "+Lignée initiative/dégâts corps à corps/armes, doublé contre créatures des Royaumes Parallèles. Automatisation future.", tags: ["clan", "akaba", "damage", "initiative"] }
  ],

  akimichi: [
    { rank: 1, label: "Endurance Singulière", type: "Capacité de lignée", summary: "Le corps Akimichi supporte des blessures extrêmes.", mechanical: "Blessure A sur Vigueur.", bonuses: { special: ["Blessure A — Vigueur"] }, tags: ["clan", "akimichi", "vigueur"] },
    { rank: 2, label: "Régulation Calorique", type: "Bonus de lignée", summary: "Contrôle calorique renforçant la vitalité.", mechanical: "+2 Vigueur, limite d’overdose augmentée.", bonuses: { resources: { vigueurMax: 2 } }, tags: ["clan", "akimichi", "vigueur"] },
    { rank: 3, label: "Nikudan Sensha — L’Obus Humain", type: "Technique de lignée", summary: "Attaque roulante massive.", mechanical: "Sur Armes Simples réussi : COR × 3 dégâts. Automatisation future.", tags: ["clan", "akimichi", "attack"] },
    { rank: 4, label: "Trois Pilules Sacrées", type: "Capacité de lignée", summary: "Accès aux pilules sacrées Akimichi.", mechanical: "Débloque les trois pilules sacrées. Automatisation future avec consommables.", tags: ["clan", "akimichi", "pills"] },
    { rank: 5, label: "Baika — La Croissance Divine", type: "Pouvoir actif", summary: "Croissance corporelle gigantesque.", mechanical: "Sur Henge réussi : taille +2 m × Lignée, +Lignée Vigueur et dégâts. Automatisation future.", tags: ["clan", "akimichi", "giant"] },
    { rank: 6, label: "Endurance Souveraine", type: "Capacité de lignée", summary: "Endurance supérieure.", mechanical: "Blessure B sur Vigueur.", bonuses: { special: ["Blessure B — Vigueur"] }, tags: ["clan", "akimichi", "vigueur"] },
    { rank: 7, label: "Chōdan Bakugeki — Impact Destructeur du Papillon", type: "Technique de lignée", summary: "Impact destructeur massif.", mechanical: "Sur Armes Simples réussi : (COR + ARM) × 3 dégâts. Automatisation future.", tags: ["clan", "akimichi", "damage"] },
    { rank: 8, label: "Répartition Calorique Extrême", type: "Bonus de lignée", summary: "Répartition calorique parfaite.", mechanical: "+3 Vigueur, +2 Caractère, limite d’overdose augmentée.", bonuses: { resources: { vigueurMax: 3, caractereMax: 2 } }, tags: ["clan", "akimichi", "vigueur", "caractere"] },
    { rank: 9, label: "Perfection", type: "Capacité de lignée", summary: "Sommet de maîtrise corporelle Akimichi.", mechanical: "Fondation de données. Effet à préciser.", tags: ["clan", "akimichi"] },
    { rank: 10, label: "Aura — Immunité aux dégâts physiques", type: "Pouvoir actif", summary: "Aura défensive extrême.", mechanical: "Immunité temporaire aux dégâts physiques, Lignée/tour/mois. Automatisation future.", tags: ["clan", "akimichi", "immunity"] }
  ],

  aniki: [
    { rank: 1, label: "Maître de l’Encre Vivante", type: "Capacité de lignée", summary: "Maîtrise de l’encre vivante.", mechanical: "Débloque Jutsu — Sumi.", tags: ["clan", "aniki", "sumi"] },
    { rank: 2, label: "Aniki — Lignée 2", type: "Bonus de lignée", summary: "Renforcement physique lié à l’encre.", mechanical: "+2 Vigueur.", bonuses: { resources: { vigueurMax: 2 } }, tags: ["clan", "aniki", "vigueur"] },
    { rank: 3, label: "Unification / Désunification — Encre", type: "Capacité de lignée", summary: "Désunification sous forme d’encre.", mechanical: "Accès à Unification / Désunification sous forme d’encre. Automatisation future.", tags: ["clan", "aniki", "sumi", "ud"] },
    { rank: 4, label: "Nezumi — Invocation de souris", type: "Capacité de lignée", summary: "Invocation et réseau de souris.", mechanical: "Bonus Vigilance ou Collecter des Informations. Automatisation future.", tags: ["clan", "aniki", "summon", "perception"] },
    { rank: 5, label: "Gokusha", type: "Pouvoir actif", summary: "Prison personnelle ou sur rouleau.", mechanical: "Prison d’une cible/arme/objet/jutsu élémentaire. Automatisation future.", tags: ["clan", "aniki", "prison"] }
  ],

  ao: [
    { rank: 1, label: "Assimilation du Sang", type: "Capacité de lignée", summary: "L’Ao peut copier un pouvoir de lignée par ingestion de sang.", mechanical: "Copie un pouvoir de même niveau et le conserve jusqu’à remplacement. Si le pouvoir donne une compétence, elle démarre à 1 puis disparaît si remplacée.", tags: ["clan", "ao", "blood", "copy"] }
  ],

  eshimuro: [
    { rank: 1, label: "Shinseina Yōki — Réceptacle Sacré", type: "Capacité de lignée", summary: "Réceptacle sacré contenant une créature ou une puissance de royaume.", mechanical: "LIGN × 50 Chakra supplémentaire et signature liée au royaume de la première créature. Peut emprisonner des créatures et gagner un pouvoir SPE. Automatisation future.", bonuses: { resources: { chakraPerLineage: 50 } }, tags: ["clan", "eshimuro", "fuin", "chakra"] }
  ],

  ishida: [
    { rank: 1, label: "Shikyo — Vision des Futures", type: "Pouvoir passif", summary: "Vision de la cause future du décès d’une cible touchée.", mechanical: "Au contact, révèle la cause future du décès. Arbitrage MJ.", tags: ["clan", "ishida", "vision"] },
    { rank: 2, label: "Calme comme les Vents", type: "Bonus de lignée", summary: "Calme spirituel exceptionnel.", mechanical: "+2 Caractère.", bonuses: { resources: { caractereMax: 2 } }, tags: ["clan", "ishida", "caractere"] },
    { rank: 3, label: "Kan’pa — Dissipation des Illusions", type: "Pouvoir actif", summary: "Kaï multiple contre les illusions.", mechanical: "Sur Gensou réussi : dissipation d’illusions en groupe. Automatisation future.", tags: ["clan", "ishida", "anti-genjutsu"] },
    { rank: 4, label: "Gardien des Connaissances", type: "Bonus de lignée", summary: "Lecture des influences illusoires.", mechanical: "Bonus de Lignée à Mental, voit si une cible est sous genjutsu.", bonuses: { skills: { mental: "lineage" } }, tags: ["clan", "ishida", "mental"] },
    { rank: 5, label: "Kyuuhogo — Barrière Spirituelle de Yumedō", type: "Pouvoir actif", summary: "Barrière spirituelle protectrice.", mechanical: "Barrière de Caractère, empêche les intrusions non invitées. Automatisation future.", tags: ["clan", "ishida", "barrier"] },
    { rank: 6, label: "Solide comme la Pierre", type: "Bonus de lignée", summary: "Solidité spirituelle et vitale.", mechanical: "+3 Caractère, +1 Vigueur, +100 Chakra.", bonuses: { resources: { caractereMax: 3, vigueurMax: 1, chakraMax: 100 } }, tags: ["clan", "ishida", "resources"] },
    { rank: 7, label: "Voix des Songes", type: "Bonus de lignée", summary: "Voix apaisante et puissance de Gensou.", mechanical: "Bonus de Lignée à Gensou.", bonuses: { skills: { gensou: "lineage" } }, tags: ["clan", "ishida", "gensou"] },
    { rank: 8, label: "Allégeance à Yumedō", type: "Pouvoir actif", summary: "Ordre spirituel issu de Yumedō.", mechanical: "Obéissance immédiate à l’ordre donné. Automatisation future.", tags: ["clan", "ishida", "control"] },
    { rank: 9, label: "Maboroshi — Voyage Spectral", type: "Pouvoir actif", summary: "Désincarnation spectrale.", mechanical: "La cible se désincarne, traverse la matière et ne peut attaquer. Automatisation future.", tags: ["clan", "ishida", "spectral"] },
    { rank: 10, label: "Takusen", type: "Pouvoir actif", summary: "Voyage libre dans Yumedō et prédiction majeure.", mechanical: "Voyage dans Yumedō et prédiction d’un lieu/objet/personne. Arbitrage MJ.", tags: ["clan", "ishida", "prophecy"] }
  ],

  kagayaki: [
    { rank: 1, label: "Shakujo — Bâton Sacré", type: "Capacité de lignée", summary: "Objet sacré de clan.", mechanical: "Bâton sacré avec augmentations. Automatisation future.", tags: ["clan", "kagayaki", "weapon"] },
    { rank: 2, label: "Radiance", type: "Bonus de lignée", summary: "Radiance médicale et sacrée.", mechanical: "Bonus de Lignée à Médecine.", bonuses: { skills: { medecine: "lineage" } }, tags: ["clan", "kagayaki", "medicine"] },
    { rank: 3, label: "Ikarishin — Flamme Purificatrice", type: "Pouvoir actif", summary: "Soin purificateur ou attaque contre créatures maléfiques.", mechanical: "Soigne un cran ou inflige LIGN × 4 dégâts aux créatures maléfiques. Automatisation future.", tags: ["clan", "kagayaki", "healing", "katon"] },
    { rank: 4, label: "Vision du Combat", type: "Bonus de lignée", summary: "Lecture défensive des affrontements.", mechanical: "Interceptions défensives ARM. Automatisation future.", tags: ["clan", "kagayaki", "interception"] },
    { rank: 5, label: "Kekkai — Barrière Divine", type: "Pouvoir actif", summary: "Sanctuaire protecteur.", mechanical: "Bonus d’Esquive d’équipe et blocage des créatures des royaumes parallèles. Automatisation future.", tags: ["clan", "kagayaki", "barrier"] },
    { rank: 7, label: "Byakugō — Les Cent Guérisons", type: "Pouvoir actif", summary: "Radiance multiple de soin.", mechanical: "Soigne plusieurs états légers. Automatisation future.", tags: ["clan", "kagayaki", "healing"] },
    { rank: 8, label: "Immunité au Feu", type: "Capacité de lignée", summary: "Immunité aux flammes et au Katon.", mechanical: "Immunité au feu, aux jutsu Katon et dérivés. Automatisation future.", tags: ["clan", "kagayaki", "katon", "immunity"] },
    { rank: 9, label: "Nova", type: "Pouvoir actif", summary: "Explosion solaire gravitationnelle.", mechanical: "Sur Katon réussi : NIN × 3 dégâts et malus d’initiative. Automatisation future.", tags: ["clan", "kagayaki", "katon", "damage"] },
    { rank: 10, label: "Sōzō Saisei — Renaissance Divine", type: "Pouvoir actif", summary: "Renaissance et guérison complète.", mechanical: "Guérison complète d’une cible. Automatisation future.", tags: ["clan", "kagayaki", "healing", "mythic"] }
  ],

  kenta: [
    { rank: 1, label: "Masque Physique", type: "Capacité de lignée", summary: "Résistance physique accrue.", mechanical: "Blessure A physique.", bonuses: { special: ["Blessure A — Physique"] }, tags: ["clan", "kenta", "mask"] },
    { rank: 2, label: "Masque d’Observation", type: "Bonus de lignée", summary: "Perception physique et analyse.", mechanical: "Bonus de Lignée à Physique.", bonuses: { skills: { physique: "lineage" } }, tags: ["clan", "kenta", "physique"] },
    { rank: 3, label: "Fukumen — Masque de Simulacre", type: "Pouvoir actif", summary: "Imitation parfaite d’un individu.", mechanical: "Sur Mental réussi, prend l’apparence et les manières d’un individu. Automatisation future.", tags: ["clan", "kenta", "disguise"] },
    { rank: 4, label: "Masque de Robustesse", type: "Bonus de lignée", summary: "Robustesse accrue.", mechanical: "+4 Vigueur.", bonuses: { resources: { vigueurMax: 4 } }, tags: ["clan", "kenta", "vigueur"] },
    { rank: 5, label: "Masuku — Masque de Rage", type: "Pouvoir actif", summary: "Masque de rage meurtrière.", mechanical: "+LIGN × 2 dégâts ou +LIGN initiative, avec risque en cas d’échec. Automatisation future.", tags: ["clan", "kenta", "rage"] },
    { rank: 6, label: "Masque Psychique", type: "Capacité de lignée", summary: "Résistance psychique accrue.", mechanical: "Blessure B psychique.", bonuses: { special: ["Blessure B — Psychique"] }, tags: ["clan", "kenta", "psychic"] },
    { rank: 7, label: "Tsura — Masque de Vitalité", type: "Pouvoir actif", summary: "Ignore les malus d’état de santé.", mechanical: "Décale une blessure et ignore les malus de santé. Automatisation future.", tags: ["clan", "kenta", "health"] },
    { rank: 8, label: "Masque de Contrefaçon", type: "Bonus de lignée", summary: "Perfection de la contrefaçon.", mechanical: "Bonus de Lignée à Faux Semblants.", bonuses: { skills: { fauxSemblants: "lineage" } }, tags: ["clan", "kenta", "deception"] },
    { rank: 9, label: "Numen — Masque de Protection", type: "Pouvoir actif", summary: "Masque protecteur.", mechanical: "+LIGN × 2 Vigueur/Caractère temporaire. Automatisation future.", tags: ["clan", "kenta", "protection"] },
    { rank: 10, label: "Gakure — Masque Invincible", type: "Pouvoir actif", summary: "Immunité psychique temporaire extrême.", mechanical: "Immunité totale aux dégâts psychiques, chakra divisé par deux à chaque round. Automatisation future.", tags: ["clan", "kenta", "immunity"] }
  ],

  kurama: [
    { rank: 1, label: "Un et Multiple", type: "Capacité de lignée", summary: "Psyché multiple résistante.", mechanical: "Blessure A psychique.", bonuses: { special: ["Blessure A — Psychique"] }, tags: ["clan", "kurama", "psychic"] },
    { rank: 2, label: "Empire Mental", type: "Bonus de lignée", summary: "Puissance de Gensou.", mechanical: "Bonus de Lignée à Gensou.", bonuses: { skills: { gensou: "lineage" } }, tags: ["clan", "kurama", "gensou"] },
    { rank: 3, label: "Akumu — Le Cauchemar Éveillé", type: "Pouvoir actif", summary: "Illusion de groupe réaliste.", mechanical: "Sur Yūryoku contre Mental. Automatisation future.", tags: ["clan", "kurama", "illusion"] }
  ],

  morino: [
    { rank: 1, label: "Chokan — La Vigilance de l’Esprit", type: "Pouvoir passif", summary: "Le Morino ne se laisse jamais surprendre.", mechanical: "Démarre toujours une confrontation avec une action retardée et n’est pas Surpris.", tags: ["clan", "morino", "vigilance"] },
    { rank: 2, label: "Aura Menaçante", type: "Bonus de lignée", summary: "Aura d’intimidation permanente.", mechanical: "Bonus de Lignée à Intimidation.", bonuses: { skills: { intimidation: "lineage" } }, tags: ["clan", "morino", "intimidation"] },
    { rank: 3, label: "Shibito — Feindre la Mort", type: "Pouvoir actif", summary: "Feint la mort et masque les signes vitaux.", mechanical: "Sur Physique, le chakra, le pouls et la chaleur ne sont plus perceptibles. Automatisation future.", tags: ["clan", "morino", "stealth"] },
    { rank: 4, label: "Langage du Silence", type: "Capacité de lignée", summary: "Communication silencieuse codifiée.", mechanical: "Fondation de données. Effet social/infiltration à préciser.", tags: ["clan", "morino", "silence"] },
    { rank: 5, label: "Tatazumu", type: "Capacité de lignée", summary: "Présence immobile et maîtrise de soi.", mechanical: "Fondation de données. Effet à préciser.", tags: ["clan", "morino"] }
  ],

  munefuda: [
    { rank: 1, label: "Nature Supérieure — Jiton", type: "Capacité de lignée", summary: "Accès au Jiton.", mechanical: "Débloque Jiton comme compétence de clan.", tags: ["clan", "munefuda", "jiton"] },
    { rank: 2, label: "Fort comme la Foudre", type: "Bonus de lignée", summary: "Corps renforcé par magnétisme.", mechanical: "+1 Vigueur, +1 Caractère.", bonuses: { resources: { vigueurMax: 1, caractereMax: 1 } }, tags: ["clan", "munefuda", "resources"] },
    { rank: 3, label: "Raichikyū", type: "Technique de lignée", summary: "Perturbation magnétique.", mechanical: "Effet EMP / magnétisation. Automatisation future.", tags: ["clan", "munefuda", "jiton", "emp"] },
    { rank: 4, label: "Courber les Étoiles", type: "Pouvoir actif", summary: "Manipulation magnétique avancée.", mechanical: "Fondation de données. Automatisation future.", tags: ["clan", "munefuda", "jiton"] },
    { rank: 5, label: "Jiki — Sceau Magnétique", type: "Pouvoir actif", summary: "Sceau magnétique.", mechanical: "Fondation de données. Automatisation future.", tags: ["clan", "munefuda", "jiton", "seal"] }
  ],

  sarutobi: [
    { rank: 1, label: "Force de Kashin", type: "Capacité de lignée", summary: "Force martiale liée au feu et à Kashin.", mechanical: "Fondation de données.", tags: ["clan", "sarutobi"] },
    { rank: 2, label: "Démineur", type: "Capacité de lignée", summary: "Expertise de démolition et désamorçage.", mechanical: "Fondation de données. Probable lien Science des Explosifs/Pièges.", tags: ["clan", "sarutobi", "explosive"] },
    { rank: 3, label: "Haisekishō — Nuage de poudre à canon", type: "Technique de lignée", summary: "Nuage de poudre à canon.", mechanical: "Fondation de technique. Automatisation future.", tags: ["clan", "sarutobi", "katon"] },
    { rank: 4, label: "Feu intérieur", type: "Bonus de lignée", summary: "Volonté brûlante.", mechanical: "Fondation de données.", tags: ["clan", "sarutobi"] },
    { rank: 5, label: "Bashōsen — Brasier protecteur", type: "Technique de lignée", summary: "Brasier protecteur.", mechanical: "Fondation de technique. Automatisation future.", tags: ["clan", "sarutobi", "katon", "defense"] }
  ],

  shimadoku: [
    { rank: 1, label: "Contrat Sacré", type: "Capacité de lignée", summary: "Contrat Kuchiyose Dokuja ou Kabutomushi.", mechanical: "Débloque Kuchiyose lié au clan. Automatisation future.", tags: ["clan", "shimadoku", "kuchiyose"] },
    { rank: 2, label: "Sang Froid", type: "Capacité de lignée", summary: "Immunité aux poisons.", mechanical: "Immunité aux poisons BIO et CHIM.", tags: ["clan", "shimadoku", "poison"] },
    { rank: 3, label: "Bakuga — Mue Céleste", type: "Pouvoir actif", summary: "Mue régénératrice.", mechanical: "Soigne instantanément des blessures selon Lignée. Automatisation future.", tags: ["clan", "shimadoku", "healing"] },
    { rank: 4, label: "Constitution Reptilienne", type: "Bonus de lignée", summary: "Corps reptilien toxique.", mechanical: "+50 Chakra, +2 Vigueur, sang empoisonné.", bonuses: { resources: { chakraMax: 50, vigueurMax: 2 } }, tags: ["clan", "shimadoku", "poison", "resources"] },
    { rank: 5, label: "Kaizō — Remodelage Physique", type: "Pouvoir actif", summary: "Membres flexibles et enserrement.", mechanical: "Solidité et extension corporelle. Automatisation future.", tags: ["clan", "shimadoku", "body"] }
  ],

  shimura: [
    { rank: 1, label: "In’go", type: "Capacité de lignée", summary: "Sceau fondamental Shimura.", mechanical: "Débloque Fūin comme compétence obligatoire.", tags: ["clan", "shimura", "fuin"] },
    { rank: 2, label: "Sceau de Renforcement", type: "Bonus de lignée", summary: "Renforcement par sceau.", mechanical: "+1 Vigueur, +2 Caractère.", bonuses: { resources: { vigueurMax: 1, caractereMax: 2 } }, tags: ["clan", "shimura", "seal"] },
    { rank: 3, label: "Kan — Silence", type: "Pouvoir actif", summary: "Sceau empêchant la divulgation d’informations.", mechanical: "Sur toucher, interdit de parler d’un sujet sous peine de dégâts. Automatisation future.", tags: ["clan", "shimura", "seal", "silence"] },
    { rank: 4, label: "Sceau de Clairvoyance", type: "Bonus de lignée", summary: "Clairvoyance par sceau.", mechanical: "Bonus de Lignée à Sentinelle.", bonuses: { skills: { sentinelle: "lineage" } }, tags: ["clan", "shimura", "sentinelle"] },
    { rank: 5, label: "Mahi — Paralysie", type: "Pouvoir actif", summary: "Sceau de paralysie.", mechanical: "Malus d’initiative sur toucher. Automatisation future.", tags: ["clan", "shimura", "paralysis"] },
    { rank: 6, label: "Sceau de Combativité", type: "Bonus de lignée", summary: "Sceau renforçant corps et esprit.", mechanical: "+2 Vigueur, +2 Caractère.", bonuses: { resources: { vigueurMax: 2, caractereMax: 2 } }, tags: ["clan", "shimura", "resources"] },
    { rank: 7, label: "En’go — Protéger", type: "Pouvoir actif", summary: "Sceau forçant une cible à protéger le personnage.", mechanical: "Contrôle protecteur sur toucher. Automatisation future.", tags: ["clan", "shimura", "control"] },
    { rank: 8, label: "Ura Shishō — Quatre Symboles Renversés", type: "Pouvoir actif", summary: "Sceau de disparition de matière.", mechanical: "Sphère scellant toute matière vers un royaume parallèle. Automatisation future.", tags: ["clan", "shimura", "seal"] },
    { rank: 9, label: "Tojiru — Fermer", type: "Pouvoir actif", summary: "Scelle la réserve de chakra.", mechanical: "Scelle Lignée × 50 Chakra sur toucher. Automatisation future.", tags: ["clan", "shimura", "chakra-seal"] },
    { rank: 10, label: "Kaimetsu — Destruction", type: "Pouvoir actif", summary: "Destruction dérivée d’Ura Shishō.", mechanical: "Lignée × 6 dégâts, sphère autour du personnage ou de la cible. Automatisation future.", tags: ["clan", "shimura", "damage"] }
  ],

  takeda: [
    { rank: 1, label: "Arme Céleste — Houtai", type: "Capacité de lignée", summary: "Arme éveillée liée au clan.", mechanical: "Choisit une arme et l’augmente d’un niveau par point de Lignée.", tags: ["clan", "takeda", "weapon"] },
    { rank: 2, label: "Instincts Carnassiers", type: "Bonus de lignée", summary: "Instinct prédateur.", mechanical: "Bonus de Lignée à Sixième Sens.", bonuses: { skills: { sixiemeSens: "lineage" } }, tags: ["clan", "takeda", "sense"] },
    { rank: 3, label: "Ten’batsu — Rétribution Divine", type: "Pouvoir actif", summary: "Châtiment de l’arme céleste.", mechanical: "Attaque Lignée/semaine, LIGN × 4 dégâts. Automatisation future.", tags: ["clan", "takeda", "damage"] },
    { rank: 4, label: "Faim Dévorante", type: "Capacité de lignée", summary: "Prédation contre les êtres de Jigokudō.", mechanical: "Dégâts ×2 contre êtres de Jigokudō, immunité pouvoir spécial Jigokudō/clans affiliés.", tags: ["clan", "takeda", "jigokudo"] },
    { rank: 5, label: "Ueru — Forme Cannibale", type: "Pouvoir actif", summary: "Forme monstrueuse cannibale.", mechanical: "+LIGN déplacement, dégâts, Caractère et Vigueur. Automatisation future.", tags: ["clan", "takeda", "form"] },
    { rank: 6, label: "Célérité Défensive", type: "Bonus de lignée", summary: "Défense accélérée.", mechanical: "Bonus de Lignée à Parade.", bonuses: { skills: { parade: "lineage" } }, tags: ["clan", "takeda", "parade"] },
    { rank: 7, label: "Momie", type: "Pouvoir actif", summary: "Protection momifiée.", mechanical: "LIGN + ARM Vigueur, empêche Houtai pendant l’effet. Automatisation future.", tags: ["clan", "takeda", "defense"] },
    { rank: 10, label: "Léviathan", type: "Pouvoir actif", summary: "Fusion monstrueuse avec l’épée de Gakidō.", mechanical: "Effet type sceau maudit niveau 5. Automatisation future.", tags: ["clan", "takeda", "monster"] }
  ],

  utatane: [
    { rank: 1, label: "Tenbuki — Armes célestes", type: "Capacité de lignée", summary: "Création d’armes éveillées.", mechanical: "Nouvelle compétence Kuchiyose — Tenbuki. Automatisation future.", tags: ["clan", "utatane", "weapon", "kuchiyose"] },
    { rank: 2, label: "Armurerie humaine", type: "Capacité de lignée", summary: "Fūin d’invocation sur le corps.", mechanical: "Stockage personnel, projectiles virtuellement infinis. Automatisation future.", tags: ["clan", "utatane", "inventory"] },
    { rank: 3, label: "Sōgu: Kaimetsu — Onde de choc", type: "Pouvoir actif", summary: "Onde de choc armée.", mechanical: "Armes Simples ou Exotiques, +ARM dégâts, projection. Automatisation future.", tags: ["clan", "utatane", "damage"] },
    { rank: 4, label: "Interception illusoire", type: "Bonus de lignée", summary: "Interception armée supplémentaire.", mechanical: "+1 interception armée.", tags: ["clan", "utatane", "interception"] },
    { rank: 5, label: "Kaijō — Déverrouillage sacré", type: "Pouvoir actif", summary: "Désactivation de sceaux et notes célestes.", mechanical: "Déverrouille notes célestes, Fūin et rouleaux si GEN > niveau. Automatisation future.", tags: ["clan", "utatane", "unlock"] },
    { rank: 6, label: "Garde Impériale", type: "Bonus de lignée", summary: "Défense armée parfaite.", mechanical: "Bonus de Lignée à Parade.", bonuses: { skills: { parade: "lineage" } }, tags: ["clan", "utatane", "parade"] },
    { rank: 7, label: "Sōgu: Tensasai — Tempête d’acier", type: "Pouvoir actif", summary: "Tempête d’armes invoquées.", mechanical: "Fondation de données. Automatisation future.", tags: ["clan", "utatane", "weapon"] }
  ],

  yamanaka: [
    { rank: 1, label: "Ancrage émotionnel", type: "Capacité de lignée", summary: "Résistance émotionnelle et mentale renforcée.", mechanical: "Débloque Résistances Émotionnelles comme compétence obligatoire de clan.", tags: ["clan", "yamanaka", "emotion"] },
    { rank: 3, label: "Shintenshin", type: "Pouvoir actif", summary: "Permutation d’esprit.", mechanical: "Sur Kawarimi réussi + cible immobile, prend le contrôle du corps. Automatisation future.", tags: ["clan", "yamanaka", "mind-transfer"] },
    { rank: 4, label: "Blessure 4 Esprit", type: "Capacité de lignée", summary: "Résistance spirituelle supérieure.", mechanical: "Blessure 4 Esprit.", bonuses: { special: ["Blessure 4 — Esprit"] }, tags: ["clan", "yamanaka", "spirit"] },
    { rank: 5, label: "Shikou", type: "Pouvoir actif", summary: "Télépathie ou lecture de pensées.", mechanical: "Communication télépathique ou lecture de pensées sur contact. Automatisation future.", tags: ["clan", "yamanaka", "telepathy"] },
    { rank: 6, label: "Sentir le Chakra", type: "Bonus de lignée", summary: "Perception du chakra accrue.", mechanical: "Bonus de Lignée à Sentinelle.", bonuses: { skills: { sentinelle: "lineage" } }, tags: ["clan", "yamanaka", "chakra-sense"] },
    { rank: 7, label: "Shinten Kugutsu", type: "Pouvoir actif", summary: "Transfert d’esprit vers objet ou corps.", mechanical: "Permutation d’esprit vers un objet inanimé ou transfert d’une cible vers un objet. Automatisation future.", tags: ["clan", "yamanaka", "mind-puppet"] },
    { rank: 8, label: "Blessure 5 Esprit", type: "Capacité de lignée", summary: "Résistance spirituelle majeure.", mechanical: "Blessure 5 Esprit.", bonuses: { special: ["Blessure 5 — Esprit"] }, tags: ["clan", "yamanaka", "spirit"] },
    { rank: 10, label: "Shinten Nagori", type: "Pouvoir actif", summary: "Voyage mental et lecture des souvenirs.", mechanical: "Lecture de pensées/souvenirs, création de souvenirs mineurs. Automatisation future.", tags: ["clan", "yamanaka", "memory"] }
  ]
});

NARUTO25E.uchihaOriginalLineageFeatures = [
  {
    rank: 1,
    label: "Sharingan — Premier tomoe",
    type: "Dōjutsu",
    summary: "Le personnage possède le Sharingan à son premier stade.",
    mechanical: "Prépare l’activation future du Sharingan et les interactions avec perception, lecture du mouvement et Genjutsu.",
    tags: ["clan", "uchiha", "sharingan", "dojutsu"]
  },
  {
    rank: 2,
    label: "Dōsatsugan — Sharingan Deuxième tomoe",
    type: "Dōjutsu",
    summary: "Le Sharingan développe une lecture plus fine du chakra, des gestes et des intentions adverses.",
    mechanical: "Effet détaillé à automatiser plus tard.",
    tags: ["clan", "uchiha", "sharingan", "dojutsu", "perception"]
  },
  {
    rank: 3,
    label: "Mitsudomoe — Sharingan Troisième tomoe",
    type: "Dōjutsu",
    summary: "Le Sharingan atteint sa forme classique complète à trois tomoe.",
    mechanical: "Prépare les effets avancés de lecture, anticipation, copie et pression mentale.",
    tags: ["clan", "uchiha", "sharingan", "dojutsu", "copy"]
  },
  {
    rank: 4,
    label: "Magen — Illusion démoniaque",
    type: "Genjutsu de lignée",
    summary: "Le Sharingan permet d’imposer des illusions mentales brutales et précises.",
    mechanical: "Effet détaillé à automatiser plus tard.",
    tags: ["clan", "uchiha", "sharingan", "genjutsu", "magen"]
  },
  {
    rank: 5,
    label: "Mangekyō Sharingan",
    type: "Dōjutsu supérieur",
    summary: "Éveil rare et dramatique du Sharingan, lié à un choc émotionnel majeur.",
    mechanical: "Débloque le choix d’un pouvoir personnel pour l’œil droit et d’un pouvoir personnel pour l’œil gauche. Validation MJ obligatoire.",
    tags: ["clan", "uchiha", "mangekyo", "dojutsu", "mj-only"]
  },
  {
    rank: 6,
    label: "Pouvoir de l’œil droit",
    type: "Pouvoir personnel du Mangekyō",
    summary: "Le personnage définit le pouvoir propre à son œil droit : Amaterasu, Tsukuyomi, Kamui, Kotoamatsukami, Enton ou création originale.",
    mechanical: "Choix à définir avec le MJ. Enton nécessite Amaterasu dans l’autre œil.",
    tags: ["clan", "uchiha", "mangekyo", "right-eye", "mj-only"]
  },
  {
    rank: 7,
    label: "Pouvoir de l’œil gauche",
    type: "Pouvoir personnel du Mangekyō",
    summary: "Le personnage définit le pouvoir propre à son œil gauche : Amaterasu, Tsukuyomi, Kamui, Kotoamatsukami, Enton ou création originale.",
    mechanical: "Choix à définir avec le MJ. Enton nécessite Amaterasu dans l’autre œil.",
    tags: ["clan", "uchiha", "mangekyo", "left-eye", "mj-only"]
  },
  {
    rank: 8,
    label: "Maîtrise croisée du Mangekyō",
    type: "Synergie oculaire",
    summary: "Les deux pouvoirs du Mangekyō commencent à fonctionner comme une combinaison personnelle.",
    mechanical: "Prépare les synergies entre œil droit et œil gauche. Exemple : Amaterasu + Enton.",
    tags: ["clan", "uchiha", "mangekyo", "synergy", "mj-only"]
  },
  {
    rank: 9,
    label: "Izanagi / Izanami",
    type: "Kinjutsu du Sharingan",
    summary: "Techniques interdites du Sharingan, capables de déformer le destin ou d’enfermer une cible dans une boucle spirituelle.",
    mechanical: "Ne nécessite pas le Mangekyō. Nécessite un Sharingan fonctionnel, validation MJ et sacrifice de l’œil utilisé. EMS/Rinnegan peuvent permettre une récupération ou exception limitée.",
    tags: ["clan", "uchiha", "sharingan", "kinjutsu", "izanagi", "izanami", "mj-only"]
  },
  {
    rank: 10,
    label: "Susanō — le Guerrier des Six Mondes",
    type: "Dōjutsu mythique",
    summary: "Manifestation ultime du pouvoir protecteur et destructeur du Mangekyō Sharingan.",
    mechanical: "Effet détaillé à automatiser plus tard. Le Susanō devra probablement disposer d’une fiche/progression dédiée.",
    tags: ["clan", "uchiha", "mangekyo", "susanoo", "mythic", "mj-only"]
  }
];

NARUTO25E.getClanLineageFeatures = function (clanKey, rank) {
  const sourceFeatures =
    clanKey === "uchiha" && NARUTO25E.getUchihaPowerMode() === "original"
      ? NARUTO25E.uchihaOriginalLineageFeatures
      : NARUTO25E.clanLineageFeatures?.[clanKey] ?? [];

  return sourceFeatures.filter((feature) => Number(feature.rank) === Number(rank));
};

NARUTO25E.getClanLineageFeature = function (clanKey, rank) {
  return NARUTO25E.getClanLineageFeatures(clanKey, rank)[0] ?? null;
};

NARUTO25E.getClanMandatorySkill = function (clanKey) {
  const clan = NARUTO25E.clans?.[clanKey];
  return clan?.skillKey || "";
};

NARUTO25E.ranks = {
  aspirant: {
    label: "Aspirant Ninja",
    shortLabel: "Aspirant",
    xp: 0,
    grade: "aspirant",
    baseCap: 3,
    requiresGM: false
  },

  geninD: {
    label: "Genin rang D",
    shortLabel: "Genin D",
    xp: 0,
    grade: "genin",
    baseCap: 5,
    requiresGM: true,
    promotion: "genin"
  },
  geninC: {
    label: "Genin rang C",
    shortLabel: "Genin C",
    xp: 200,
    grade: "genin",
    baseCap: 5,
    requiresGM: false
  },
  geninB: {
    label: "Genin rang B",
    shortLabel: "Genin B",
    xp: 400,
    grade: "genin",
    baseCap: 5,
    requiresGM: false
  },
  geninA: {
    label: "Genin rang A",
    shortLabel: "Genin A",
    xp: 600,
    grade: "genin",
    baseCap: 5,
    requiresGM: false
  },

  chuninD: {
    label: "Chūnin rang D",
    shortLabel: "Chūnin D",
    xp: 700,
    grade: "chunin",
    baseCap: 7,
    requiresGM: true,
    promotion: "chunin"
  },
  chuninC: {
    label: "Chūnin rang C",
    shortLabel: "Chūnin C",
    xp: 1000,
    grade: "chunin",
    baseCap: 7,
    requiresGM: false
  },
  chuninB: {
    label: "Chūnin rang B",
    shortLabel: "Chūnin B",
    xp: 1300,
    grade: "chunin",
    baseCap: 7,
    requiresGM: false
  },
  chuninA: {
    label: "Chūnin rang A",
    shortLabel: "Chūnin A",
    xp: 1600,
    grade: "chunin",
    baseCap: 7,
    requiresGM: false
  },

  joninD: {
    label: "Jōnin rang D",
    shortLabel: "Jōnin D",
    xp: 1700,
    grade: "jonin",
    baseCap: 10,
    requiresGM: true,
    promotion: "jonin"
  },
  joninC: {
    label: "Jōnin rang C",
    shortLabel: "Jōnin C",
    xp: 2200,
    grade: "jonin",
    baseCap: 10,
    requiresGM: false
  },
  joninB: {
    label: "Jōnin rang B",
    shortLabel: "Jōnin B",
    xp: 2700,
    grade: "jonin",
    baseCap: 10,
    requiresGM: false
  },
  joninA: {
    label: "Jōnin rang A",
    shortLabel: "Jōnin A",
    xp: 3200,
    grade: "jonin",
    baseCap: 10,
    requiresGM: false
  },

  joninS: {
    label: "Jōnin rang S (Sensei)",
    shortLabel: "Jōnin S",
    xp: 4500,
    grade: "joninSpecial",
    baseCap: 12,
    requiresGM: true
  },
  sanninAA: {
    label: "Sannin (AA)",
    shortLabel: "Sannin",
    xp: 6500,
    grade: "sannin",
    baseCap: 14,
    requiresGM: true
  },
  kageSplus: {
    label: "Kage (S+)",
    shortLabel: "Kage",
    xp: 8500,
    grade: "kage",
    baseCap: 16,
    requiresGM: true
  }
};

NARUTO25E.rankOrder = [
  "aspirant",
  "geninD",
  "geninC",
  "geninB",
  "geninA",
  "chuninD",
  "chuninC",
  "chuninB",
  "chuninA",
  "joninD",
  "joninC",
  "joninB",
  "joninA",
  "joninS",
  "sanninAA",
  "kageSplus"
];

NARUTO25E.getRank = function (rankKey) {
  return NARUTO25E.ranks[rankKey] ?? NARUTO25E.ranks.aspirant;
};

NARUTO25E.getNextRankKey = function (rankKey) {
  const index = NARUTO25E.rankOrder.indexOf(rankKey);
  if (index < 0) return "geninD";
  return NARUTO25E.rankOrder[index + 1] ?? "";
};

NARUTO25E.healthStates = {
  none: "Pleine forme",
  fatigue1: "Fatigue 1",
  fatigue2: "Fatigue 2",
  sonne: "Sonné",
  blessure1: "Blessure 1",
  blessure2: "Blessure 2",
  blessure3: "Blessure 3"
};

NARUTO25E.chakraSpecializations = {
  acered: {
    label: "Acéré",
    maxStacks: 5,
    effect: "+2 dégâts ARM par rang",
    bonuses: {
      armDamage: 2
    }
  },

  colossal: {
    label: "Colossal",
    maxStacks: 9,
    effect: "+100 Chakra par rang",
    bonuses: {
      chakraMax: 100
    }
  },

  endurci: {
    label: "Endurci",
    maxStacks: 5,
    effect: "+1 Vigueur et +50 Chakra par rang",
    bonuses: {
      vigueurMax: 1,
      chakraMax: 50
    }
  },

  explosif: {
    label: "Explosif",
    maxStacks: 5,
    effect: "+2 dégâts TAI par rang",
    bonuses: {
      taiDamage: 2
    }
  },

  fulgurant: {
    label: "Fulgurant",
    maxStacks: 5,
    effect: "+2 Initiative et +10 m au déplacement simple par rang",
    bonuses: {
      initiative: 2,
      moveMeters: 10
    }
  },

  hereditaire: {
    label: "Héréditaire",
    maxStacks: 3,
    effect: "+1 utilisation de pouvoir de lignée actif par session et par rang",
    bonuses: {
      lineagePowerUses: 1
    }
  },

  imperieux: {
    label: "Impérieux",
    maxStacks: 5,
    effect: "+1 Caractère et +50 Chakra par rang",
    bonuses: {
      caractereMax: 1,
      chakraMax: 50
    }
  },

  inepuisable: {
    label: "Inépuisable",
    maxStacks: 3,
    effect: "+1% à la régénération passive par rang",
    bonuses: {
      passiveRegenPercent: 1
    }
  },

  puissant: {
    label: "Puissant",
    maxStacks: 1,
    unique: true,
    effect: "Effet spécial : annule certains paliers liés à la réserve naturelle de Chakra et certains échecs automatiques liés aux blessures.",
    bonuses: {},
    specialOnly: true
  },

  remanent: {
    label: "Rémanent",
    maxStacks: 1,
    unique: true,
    effect: "Effet spécial : le Chakra appliqué en petite quantité sur un objet reste actif tant que le personnage le souhaite.",
    bonuses: {},
    specialOnly: true
  }
};

NARUTO25E.chakraSpecializationOrder = [
  "acered",
  "colossal",
  "endurci",
  "explosif",
  "fulgurant",
  "hereditaire",
  "imperieux",
  "inepuisable",
  "puissant",
  "remanent"
];

NARUTO25E.getChakraSpecializationSlotsForRank = function (rankKey) {
  if (["joninS", "sanninAA", "kageSplus"].includes(rankKey)) return 14;

  if (["joninD", "joninC", "joninB", "joninA"].includes(rankKey)) return 9;

  if (["chuninD", "chuninC", "chuninB", "chuninA"].includes(rankKey)) return 4;

  if (["geninC", "geninB", "geninA"].includes(rankKey)) return 2;

  return 1;
};

NARUTO25E.inventoryTypes = {
  weapon: "Arme",
  armor: "Protection",
  consumable: "Consommable",
  misc: "Objet"
};

NARUTO25E.inventoryTypeOrder = [
  "weapon",
  "armor",
  "consumable",
  "misc"
];

NARUTO25E.techniqueFamilies = {
  ninjutsu: "Ninjutsu",
  genjutsu: "Genjutsu",
  taijutsu: "Taijutsu",
  armes: "Armes",
  lignee: "Lignée",
  nindo: "Nindō",
  autre: "Autre"
};

NARUTO25E.techniqueRanks = {
  d: "Rang D",
  c: "Rang C",
  b: "Rang B",
  a: "Rang A",
  s: "Rang S",
  aa: "Rang AA",
  sPlus: "Rang S+"
};

NARUTO25E.techniqueActionTypes = {
  simple: "Action simple",
  complex: "Action complexe",
  intervention: "Intervention",
  lineage: "Action de lignée",
  delayed: "Action retardée",
  passive: "Passive"
};

NARUTO25E.techniquePrerequisiteTypes = {
  none: "Aucun",
  skill: "Compétence possédée",
  mastery: "Maîtrise de compétence",
  affinity: "Affinité naturelle",
  clan: "Clan requis",
  voie: "Voie requise",
  lineage: "Lignée minimale",
  kekkeiGenkai: "Kekkei Genkai",
  kekkeiTota: "Kekkei Tōta",
  kinjutsu: "Kinjutsu / Technique interdite",
  gmOption: "Option MJ de lignée",
  gm: "Validation MJ manuelle"
};

NARUTO25E.damageTypes = {
  none: "—",
  physical: "Physique",
  chakra: "Chakra",
  fire: "Feu",
  water: "Eau",
  lightning: "Foudre",
  wind: "Vent",
  earth: "Terre",
  shadow: "Ombre",
  magnet: "Magnétisme",
  medical: "Médical",
  mental: "Mental",
  poison: "Poison",
  slashing: "Tranchant",
  piercing: "Perforant",
  bludgeoning: "Contondant",
  sound: "Son",
  dust: "Poussière",
  other: "Autre"
};

NARUTO25E.nindoChoiceModes = {
  preset: "Nindō prédéfini",
  custom: "Nindō personnalisé"
};

NARUTO25E.nindoPresets = {
  autorite: {
    label: "Autorité",
    description: "L’ordre et la loi sont un devoir dans ce monde si instable."
  },
  coeurSansLimite: {
    label: "Cœur sans limite",
    description: "Personne dans le besoin ne sera laissé pour compte."
  },
  desirBrulant: {
    label: "Désir brûlant",
    description: "Pourquoi vivre si on ne peut pas faire des choses intéressantes ?"
  },
  doctrine: {
    label: "Doctrine",
    description: "Vivre pour le code, mourir pour le code."
  },
  evolution: {
    label: "Évolution",
    description: "S’adapter, plutôt que rester prisonnier du passé."
  },
  harmonie: {
    label: "Harmonie",
    description: "Paix et frugalité, c’est la devise du sage."
  },
  heroisme: {
    label: "Héroïsme",
    description: "Le courage fleurit en bravant l’inconnu."
  },
  indomptable: {
    label: "Indomptable",
    description: "Un cœur pur ne connaît ni peur ni défaite."
  },
  konoha: {
    label: "Konoha",
    description: "Le village nous protège, nous le protégeons à notre tour."
  },
  ordreDuMonde: {
    label: "L’ordre du monde",
    description: "La logique et l’efficacité, au-dessus de tout."
  },
  marionnette: {
    label: "Marionnette",
    description: "Vivre et mourir pour une personne."
  },
  promesse: {
    label: "Promesse",
    description: "Envers moi-même ou d’autres, rien n’arrêtera sa réalisation."
  },
  puissance: {
    label: "Puissance",
    description: "Seuls les puissants sont maîtres de leur destinée."
  },
  revolution: {
    label: "Révolution",
    description: "Réduire en cendres le statu quo et changer le monde."
  },
  lameKunai: {
    label: "Sur la lame d’un kunaï",
    description: "Entre la lumière et les ténèbres, se trouve la vérité."
  },
  tresorGenetique: {
    label: "Trésor génétique",
    description: "Les traditions et la génétique séculaire du clan sont inestimables."
  },
  voieDuSacrifice: {
    label: "Voie du sacrifice",
    description: "Obéir aux ordres même si le chemin est celui du carnage."
  },
  volonteDuFeu: {
    label: "Volonté du feu",
    description: "La vie est précieuse et nous devons l’aider à grandir."
  }
};

NARUTO25E.nindoActions = {
  accroissementChakra: {
    label: "Accroissement du Chakra",
    cost: 1,
    temporalite: "Momentané — 5 tours",
    type: "chakraBoost",
    description: "Augmente temporairement le potentiel de Chakra de 500 points pendant 5 tours."
  },
  depassement: {
    label: "Dépassement",
    cost: 1,
    temporalite: "5 charges",
    type: "charges",
    description: "Gagne 5 charges pouvant servir de Bonus Critique, Interception ou Relance."
  },
  eveil: {
    label: "Éveil",
    cost: 5,
    temporalite: "Instantané",
    type: "awakening",
    description: "Gagne 3 actions retardées et/ou de lignée pour le tour, avec accès temporaire à l’ensemble des pouvoirs de lignée."
  },
  lierDestinees: {
    label: "Lier nos destinées",
    cost: 1,
    variableCost: true,
    maxCost: 3,
    temporalite: "Permanent",
    type: "bond",
    description: "Crée ou renforce un Lien avec un PNJ, de 1 à 3 paliers."
  },
  unison: {
    label: "Unison",
    cost: 1,
    temporalite: "Instantané",
    type: "opportunity",
    description: "Gagne une Opportunité à jouer à l’initiative actuelle ou suivante."
  }
};

NARUTO25E.nindoChargeUses = {
  criticalBonus: "Bonus Critique (+5 au jet)",
  interception: "Déluge de kunaï / Interception",
  reroll: "Relance"
};