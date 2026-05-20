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
  hybridClan: "Clan hybride"
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
  marionnettisme: {
    label: "Voie du Marionnettisme",
    village: "suna",
    selectable: false,
    tags: ["voie", "puppet", "suna"]
  }
};