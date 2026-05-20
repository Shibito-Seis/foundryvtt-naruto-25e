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

NARUTO25E.skillDefinitions = {
  physique: {
    label: "Physique",
    base: "cor",
    category: "common",
    tags: ["physical"],
    ownedByDefault: true
  },
  mental: {
    label: "Mental",
    base: "esp",
    category: "common",
    tags: ["mental"],
    ownedByDefault: true
  },
  armesSimples: {
    label: "Armes simples",
    base: "arm",
    category: "combat",
    tags: ["combat", "weapon"],
    ownedByDefault: true
  },
  parade: {
    label: "Parade",
    base: "arm",
    category: "combat",
    tags: ["combat", "defense"],
    ownedByDefault: true
  },
  corpsACorps: {
    label: "Corps à corps",
    base: "tai",
    category: "combat",
    tags: ["combat", "melee"],
    ownedByDefault: true
  },
  esquive: {
    label: "Esquive",
    base: "tai",
    category: "combat",
    tags: ["combat", "defense"],
    ownedByDefault: true
  },
  camouflage: {
    label: "Camouflage",
    base: "nin",
    category: "infiltration",
    tags: ["infiltration", "stealth"],
    ownedByDefault: true
  },
  vigilance: {
    label: "Vigilance",
    base: "nin",
    category: "common",
    tags: ["perception"],
    ownedByDefault: true
  },
  survie: {
    label: "Survie",
    base: "nin",
    category: "common",
    tags: ["survival"],
    ownedByDefault: true
  },
  henge: {
    label: "Jutsu - Henge",
    base: "nin",
    category: "jutsu",
    tags: ["jutsu", "utility"],
    ownedByDefault: true
  },
  kawarimi: {
    label: "Jutsu - Kawarimi",
    base: "gen",
    category: "jutsu",
    tags: ["jutsu", "defense"],
    ownedByDefault: true
  },
  gensou: {
    label: "Jutsu - Gensou",
    base: "gen",
    category: "jutsu",
    tags: ["jutsu", "illusion"],
    ownedByDefault: true
  },

  katon: {
    label: "Katon",
    base: "nin",
    category: "chakraNature",
    tags: ["chakraNature", "elemental", "fire"],
    ownedByDefault: false
  },
  futon: {
    label: "Fūton",
    base: "nin",
    category: "chakraNature",
    tags: ["chakraNature", "elemental", "wind"],
    ownedByDefault: false
  },
  suiton: {
    label: "Suiton",
    base: "nin",
    category: "chakraNature",
    tags: ["chakraNature", "elemental", "water"],
    ownedByDefault: false
  },
  doton: {
    label: "Doton",
    base: "nin",
    category: "chakraNature",
    tags: ["chakraNature", "elemental", "earth"],
    ownedByDefault: false
  },
  raiton: {
    label: "Raiton",
    base: "nin",
    category: "chakraNature",
    tags: ["chakraNature", "elemental", "lightning"],
    ownedByDefault: false
  },
  fuin: {
    label: "Fūin",
    base: "nin",
    category: "jutsu",
    tags: ["jutsu", "seal"],
    ownedByDefault: false
  },
  iryo: {
    label: "Iryō",
    base: "nin",
    category: "jutsu",
    tags: ["jutsu", "medical"],
    ownedByDefault: false
  },
  kage: {
    label: "Kage",
    base: "nin",
    category: "chakraNature",
    tags: ["chakraNature", "shadow"],
    ownedByDefault: false
  },
  jiton: {
    label: "Jiton",
    base: "nin",
    category: "chakraNature",
    tags: ["chakraNature", "magnetism"],
    ownedByDefault: false
  },
  ingyo: {
    label: "Ingyō",
    base: "nin",
    category: "chakraNature",
    tags: ["chakraNature", "yinYang"],
    ownedByDefault: false
  }
};