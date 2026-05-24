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
  hybridVoie: "Voie hybridée"
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
  uchiha: { label: "Uchiha", village: "konoha", skillKey: "" },
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
  "iryo"
];

NARUTO25E.chakraAffinities = {
  katon: {
    label: "Katon",
    type: "elemental",
    skillKey: "katon",
    description: "Nature du Feu."
  },
  suiton: {
    label: "Suiton",
    type: "elemental",
    skillKey: "suiton",
    description: "Nature de l’Eau."
  },
  raiton: {
    label: "Raïton",
    type: "elemental",
    skillKey: "raiton",
    description: "Nature de la Foudre."
  },
  futon: {
    label: "Fūton",
    type: "elemental",
    skillKey: "futon",
    description: "Nature du Vent."
  },
  doton: {
    label: "Doton",
    type: "elemental",
    skillKey: "doton",
    description: "Nature de la Terre."
  },
  iryo: {
    label: "Iryō",
    type: "special",
    skillKey: "iryo",
    description: "Nature médicale / usage médical du Chakra."
  }
};

NARUTO25E.affinityCostModes = {
  freePrimary: "Affinité principale offerte",
  countPrimary: "Affinité principale déduite des 5 compétences initiales"
};

NARUTO25E.clanCreationData = {
  nara: {
    summary: "Clan spécialisé dans la manipulation des ombres. Le Kage est une compétence propre au clan Nara.",
    mandatorySkills: ["kage"],
    mandatoryAffinities: [],
    startingFeatures: []
  },

  uchiha: {
    summary: "Clan célèbre pour son affinité naturelle avec le Katon et l’éveil du Sharingan.",
    mandatorySkills: [],
    mandatoryAffinities: ["katon"],
    startingFeatures: ["Sharingan — premier tomoe"]
  },

  hyuga: {
    summary: "Clan détenteur du Byakugan et maître du Jūken.",
    mandatorySkills: ["juken"],
    mandatoryAffinities: [],
    startingFeatures: ["Byakugan"]
  },

  aburame: {
    summary: "Clan utilisant les Kikaichū comme partenaires et armes vivantes.",
    mandatorySkills: ["kikaichu"],
    mandatoryAffinities: [],
    startingFeatures: []
  },

  senju: {
    summary: "Clan réputé pour sa vitalité exceptionnelle et ses héritages puissants.",
    mandatorySkills: ["mokuton"],
    mandatoryAffinities: [],
    startingFeatures: []
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

NARUTO25E.getClanCreationData = function (clanKey) {
  return NARUTO25E.clanCreationData?.[clanKey] ?? {
    summary: "",
    mandatorySkills: [],
    mandatoryAffinities: [],
    startingFeatures: []
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
      label: "Kikaichū — Insectes destructeurs",
      type: "Compétence de clan",
      summary: "Le personnage obtient la compétence Kikaichū et peut allouer une partie de son chakra général à sa réserve d’insectes.",
      mechanical: "Active la réserve Kikaichū. Minimum : Lignée × 15. Maximum : Lignée × 25.",
      tags: ["clan", "kikaichu", "chakra-reserve"]
    },
    {
      rank: 2,
      label: "Essaim défensif",
      type: "Capacité de lignée",
      summary: "Les insectes peuvent être employés pour gêner, protéger ou intercepter selon la situation.",
      mechanical: "Effet détaillé à préciser depuis la lignée Aburame.",
      tags: ["clan", "kikaichu", "defense"]
    },
    {
      rank: 3,
      label: "Dévoration de chakra",
      type: "Capacité de lignée",
      summary: "Les Kikaichū peuvent drainer ou perturber le chakra adverse.",
      mechanical: "Effet détaillé à préciser depuis la lignée Aburame.",
      tags: ["clan", "kikaichu", "chakra-drain"]
    }
  ],

  hyuga: [
    {
      rank: 1,
      label: "Jūken — Poing Souple",
      type: "Compétence obligatoire",
      summary: "Le personnage obtient la compétence Jūken, cœur martial du clan Hyūga.",
      mechanical: "Compétence de combat imposée par le clan Hyūga.",
      tags: ["clan", "hyuga", "juken", "taijutsu"]
    },
    {
      rank: 2,
      label: "Byakugan — Œil blanc",
      type: "Dōjutsu",
      summary: "Le personnage éveille ou stabilise l’usage du Byakugan, perception emblématique du clan Hyūga.",
      mechanical: "Prépare l’activation future du Byakugan, la lecture du chakra et les interactions avec Jūken.",
      tags: ["clan", "hyuga", "byakugan", "dojutsu"]
    },
    {
      rank: 3,
      label: "Tenketsu — Frappe des méridiens",
      type: "Technique de lignée",
      summary: "Le personnage apprend à frapper les points de circulation du chakra.",
      mechanical: "Prépare les futurs effets de blocage ou perturbation du chakra.",
      tags: ["clan", "hyuga", "juken", "chakra-control"]
    },
    {
      rank: 4,
      label: "Vision panoramique",
      type: "Dōjutsu",
      summary: "Le Byakugan améliore la perception spatiale et la lecture des mouvements.",
      mechanical: "Effet détaillé à préciser lors de l’automatisation du Byakugan.",
      tags: ["clan", "hyuga", "byakugan", "perception"]
    },
    {
      rank: 5,
      label: "Hakke — Domaine du Poing Souple",
      type: "Technique de lignée",
      summary: "Le personnage étend son contrôle du Jūken à une zone de combat plus large.",
      mechanical: "Effet détaillé à préciser.",
      tags: ["clan", "hyuga", "juken", "zone"]
    },
    {
      rank: 6,
      label: "Défense absolue",
      type: "Technique de lignée",
      summary: "Le personnage peut employer son contrôle du chakra pour renforcer ses défenses.",
      mechanical: "Prépare les futures interceptions ou défenses spéciales Hyūga.",
      tags: ["clan", "hyuga", "defense"]
    },
    {
      rank: 7,
      label: "Lecture parfaite du chakra",
      type: "Dōjutsu",
      summary: "Le Byakugan révèle plus finement les flux, blocages et signatures de chakra.",
      mechanical: "Effet détaillé à préciser.",
      tags: ["clan", "hyuga", "byakugan", "chakra-sense"]
    },
    {
      rank: 8,
      label: "Maîtrise supérieure du Jūken",
      type: "Technique de lignée",
      summary: "Le personnage atteint un degré supérieur de précision et de dangerosité au Poing Souple.",
      mechanical: "Effet détaillé à préciser.",
      tags: ["clan", "hyuga", "juken"]
    },
    {
      rank: 9,
      label: "Hakke avancé",
      type: "Technique de lignée",
      summary: "Le personnage déploie les formes les plus avancées du style Hyūga.",
      mechanical: "Effet détaillé à préciser.",
      tags: ["clan", "hyuga", "juken", "advanced"]
    },
    {
      rank: 10,
      label: "Tenseigan",
      type: "Dōjutsu supérieur",
      summary: "Éveil ultime et rarissime de la lignée Hyūga.",
      mechanical: "Capacité mythique / exceptionnelle. À verrouiller derrière validation MJ.",
      tags: ["clan", "hyuga", "tenseigan", "mythic", "mj-only"]
    }
  ],

  nara: [
    {
      rank: 1,
      label: "Pouvoir des Ombres",
      type: "Compétence de clan",
      summary: "Le personnage obtient la compétence Kage.",
      mechanical: "Compétence de clan imposée par le clan Nara.",
      tags: ["clan", "nara", "kage"]
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
      type: "Compétence de clan",
      summary: "Le personnage obtient Mokuton, héritage rarissime du clan Senju.",
      mechanical: "Compétence de clan imposée. Suiton et Doton sont nécessaires dans la logique de création avancée.",
      tags: ["clan", "senju", "mokuton"]
    },
    {
      rank: 2,
      label: "Force Naturelle",
      type: "Bonus de lignée",
      summary: "Le corps du personnage bénéficie de la vitalité du Mokuton.",
      mechanical: "+2 Vigueur, +50 Chakra.",
      tags: ["clan", "senju", "vigueur", "chakra"]
    },
    {
      rank: 3,
      label: "Jukai Shirei — Domination Végétale",
      type: "Technique de lignée",
      summary: "Le personnage manipule le bois et les structures végétales.",
      mechanical: "Effet détaillé à automatiser plus tard.",
      tags: ["clan", "senju", "mokuton", "control"]
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

  munefuda: [
    {
      rank: 1,
      label: "Nature Supérieure — Jiton",
      type: "Compétence de clan",
      summary: "Le personnage obtient Jiton, la manipulation du magnétisme.",
      mechanical: "Compétence de clan imposée. Prépare les interactions avec armes métalliques et interceptions ARM.",
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
      mechanical: "Prépare l’activation future du Sharingan et les interactions avec copie, perception et Genjutsu.",
      tags: ["clan", "uchiha", "sharingan", "dojutsu"]
    },
    {
      rank: 2,
      label: "Héritage du Katon",
      type: "Affinité imposée",
      summary: "Le clan Uchiha impose l’affinité Katon.",
      mechanical: "Katon est accordé via affinité imposée.",
      tags: ["clan", "uchiha", "katon"]
    },
    {
      rank: 3,
      label: "Sharingan — Deuxième tomoe",
      type: "Dōjutsu",
      summary: "Le Sharingan progresse et affine la lecture du mouvement et du chakra.",
      mechanical: "Effet détaillé à automatiser plus tard.",
      tags: ["clan", "uchiha", "sharingan", "dojutsu"]
    },
    {
      rank: 5,
      label: "Sharingan — Troisième tomoe",
      type: "Dōjutsu",
      summary: "Le Sharingan atteint sa forme classique complète.",
      mechanical: "Prépare la copie de techniques et la lecture avancée.",
      tags: ["clan", "uchiha", "sharingan", "copy"]
    },
    {
      rank: 10,
      label: "Mangekyō Sharingan",
      type: "Dōjutsu supérieur",
      summary: "Éveil rare et dramatique du Sharingan.",
      mechanical: "À verrouiller derrière validation MJ et conditions narratives.",
      tags: ["clan", "uchiha", "mangekyo", "mj-only"]
    }
  ],

  yamanaka: [
    {
      rank: 1,
      label: "Stabilité émotionnelle",
      type: "Compétence de clan",
      summary: "Le personnage obtient Résistances Émotionnelles.",
      mechanical: "Compétence de clan imposée.",
      tags: ["clan", "yamanaka", "resistance", "emotion"]
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
      label: "Maître de l’Encre Vivante",
      type: "Compétence de clan",
      summary: "Le personnage obtient Sumi.",
      mechanical: "Compétence de clan imposée.",
      tags: ["clan", "aniki", "sumi"]
    }
  ]
};

NARUTO25E.getClanLineageFeature = function (clanKey, rank) {
  if (!clanKey || !rank) return null;

  const clanFeatures = NARUTO25E.clanLineageFeatures?.[clanKey];
  if (!clanFeatures) return null;

  return clanFeatures[rank] ?? clanFeatures[String(rank)] ?? null;
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
  clan: "Clan",
  lineage: "Lignée",
  kekkeiGenkai: "Kekkei Genkai",
  kekkeiTota: "Kekkei Tōta",
  kinjutsu: "Kinjutsu / Technique interdite",
  gm: "Validation MJ"
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