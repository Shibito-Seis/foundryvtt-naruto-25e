import { NARUTO25E } from "../config.js";

const DATA_SOURCES = [
  // Techniques communes
  {
    group: "techniques",
    groupLabel: "Techniques communes",
    label: "technique commune legacy",
    pack: "naruto-25e.techniques-communes",
    path: "systems/naruto-25e/data/techniques/techniques-communes.json",
    normalize: normalizeTechniqueData
  },
  {
    group: "techniques",
    groupLabel: "Techniques communes",
    label: "technique commune d’académie",
    pack: "naruto-25e.techniques-communes",
    path: "systems/naruto-25e/data/techniques/communes-academie.json",
    normalize: normalizeTechniqueData
  },
  {
    group: "techniques",
    groupLabel: "Techniques communes",
    label: "technique commune de combat",
    pack: "naruto-25e.techniques-communes",
    path: "systems/naruto-25e/data/techniques/communes-combat.json",
    normalize: normalizeTechniqueData
  },

  // Ninjutsu
  {
    group: "techniques",
    groupLabel: "Techniques — Ninjutsu",
    label: "technique ninjutsu legacy élémentaire",
    pack: "naruto-25e.techniques-ninjutsu",
    path: "systems/naruto-25e/data/techniques/techniques-elementaires.json",
    normalize: normalizeTechniqueData
  },
  {
    group: "techniques",
    groupLabel: "Techniques — Ninjutsu",
    label: "technique Katon",
    pack: "naruto-25e.techniques-ninjutsu",
    path: "systems/naruto-25e/data/techniques/ninjutsu-katon.json",
    normalize: normalizeTechniqueData
  },
  {
    group: "techniques",
    groupLabel: "Techniques — Ninjutsu",
    label: "technique Suiton",
    pack: "naruto-25e.techniques-ninjutsu",
    path: "systems/naruto-25e/data/techniques/ninjutsu-suiton.json",
    normalize: normalizeTechniqueData
  },
  {
    group: "techniques",
    groupLabel: "Techniques — Ninjutsu",
    label: "technique Doton",
    pack: "naruto-25e.techniques-ninjutsu",
    path: "systems/naruto-25e/data/techniques/ninjutsu-doton.json",
    normalize: normalizeTechniqueData
  },
  {
    group: "techniques",
    groupLabel: "Techniques — Ninjutsu",
    label: "technique Fūton",
    pack: "naruto-25e.techniques-ninjutsu",
    path: "systems/naruto-25e/data/techniques/ninjutsu-futon.json",
    normalize: normalizeTechniqueData
  },
  {
    group: "techniques",
    groupLabel: "Techniques — Ninjutsu",
    label: "technique Raïton",
    pack: "naruto-25e.techniques-ninjutsu",
    path: "systems/naruto-25e/data/techniques/ninjutsu-raiton.json",
    normalize: normalizeTechniqueData
  },
  {
    group: "techniques",
    groupLabel: "Techniques — Ninjutsu",
    label: "technique Iryō",
    pack: "naruto-25e.techniques-ninjutsu",
    path: "systems/naruto-25e/data/techniques/ninjutsu-iryo.json",
    normalize: normalizeTechniqueData
  },
  {
    group: "techniques",
    groupLabel: "Techniques — Ninjutsu",
    label: "technique Fūin",
    pack: "naruto-25e.techniques-ninjutsu",
    path: "systems/naruto-25e/data/techniques/ninjutsu-fuin.json",
    normalize: normalizeTechniqueData
  },

  // Genjutsu
  {
    group: "techniques",
    groupLabel: "Techniques — Genjutsu",
    label: "technique Gensou",
    pack: "naruto-25e.techniques-genjutsu",
    path: "systems/naruto-25e/data/techniques/genjutsu-gensou.json",
    normalize: normalizeTechniqueData
  },
  {
    group: "techniques",
    groupLabel: "Techniques — Genjutsu",
    label: "technique Yūryoku",
    pack: "naruto-25e.techniques-genjutsu",
    path: "systems/naruto-25e/data/techniques/genjutsu-yuryoku.json",
    normalize: normalizeTechniqueData
  },
  {
    group: "techniques",
    groupLabel: "Techniques — Genjutsu",
    label: "technique Genjutsu de lignée",
    pack: "naruto-25e.techniques-genjutsu",
    path: "systems/naruto-25e/data/techniques/genjutsu-lignees.json",
    normalize: normalizeTechniqueData
  },

  // Taijutsu
  {
    group: "techniques",
    groupLabel: "Techniques — Taijutsu",
    label: "technique Gōken",
    pack: "naruto-25e.techniques-taijutsu",
    path: "systems/naruto-25e/data/techniques/taijutsu-goken.json",
    normalize: normalizeTechniqueData
  },
  {
    group: "techniques",
    groupLabel: "Techniques — Taijutsu",
    label: "technique Jūken",
    pack: "naruto-25e.techniques-taijutsu",
    path: "systems/naruto-25e/data/techniques/taijutsu-juken.json",
    normalize: normalizeTechniqueData
  },
  {
    group: "techniques",
    groupLabel: "Techniques — Taijutsu",
    label: "technique Chūken",
    pack: "naruto-25e.techniques-taijutsu",
    path: "systems/naruto-25e/data/techniques/taijutsu-chuken.json",
    normalize: normalizeTechniqueData
  },
  {
    group: "techniques",
    groupLabel: "Techniques — Taijutsu",
    label: "technique Hachimon",
    pack: "naruto-25e.techniques-taijutsu",
    path: "systems/naruto-25e/data/techniques/taijutsu-hachimon.json",
    normalize: normalizeTechniqueData
  },

  // Armes
  {
    group: "techniques",
    groupLabel: "Techniques — Armes",
    label: "technique d’armes",
    pack: "naruto-25e.techniques-armes",
    path: "systems/naruto-25e/data/techniques/armes-coups-speciaux.json",
    normalize: normalizeTechniqueData
  },

  // Lignées
  {
    group: "techniques",
    groupLabel: "Techniques de lignées",
    label: "technique de lignée legacy",
    pack: "naruto-25e.techniques-lignees",
    path: "systems/naruto-25e/data/techniques/techniques-lignees.json",
    normalize: normalizeTechniqueData
  },
  {
    group: "techniques",
    groupLabel: "Techniques de lignées",
    label: "technique Mokuton",
    pack: "naruto-25e.techniques-lignees",
    path: "systems/naruto-25e/data/techniques/lignees-mokuton.json",
    normalize: normalizeTechniqueData
  },
  {
    group: "techniques",
    groupLabel: "Techniques de lignées",
    label: "technique Kage",
    pack: "naruto-25e.techniques-lignees",
    path: "systems/naruto-25e/data/techniques/lignees-kage.json",
    normalize: normalizeTechniqueData
  },
  {
    group: "techniques",
    groupLabel: "Techniques de lignées",
    label: "technique Kikaichū",
    pack: "naruto-25e.techniques-lignees",
    path: "systems/naruto-25e/data/techniques/lignees-kikaichu.json",
    normalize: normalizeTechniqueData
  },
  {
    group: "techniques",
    groupLabel: "Techniques de lignées",
    label: "technique Uchiha",
    pack: "naruto-25e.techniques-lignees",
    path: "systems/naruto-25e/data/techniques/lignees-uchiha.json",
    normalize: normalizeTechniqueData
  },
  {
    group: "techniques",
    groupLabel: "Techniques de lignées",
    label: "technique Hyūga",
    pack: "naruto-25e.techniques-lignees",
    path: "systems/naruto-25e/data/techniques/lignees-hyuga.json",
    normalize: normalizeTechniqueData
  },
  {
    group: "techniques",
    groupLabel: "Techniques de lignées",
    label: "technique de lignée diverse",
    pack: "naruto-25e.techniques-lignees",
    path: "systems/naruto-25e/data/techniques/lignees-diverses.json",
    normalize: normalizeTechniqueData
  },

  // Pouvoirs de lignée
  {
    group: "lineage",
    groupLabel: "Pouvoirs de lignée",
    label: "pouvoir de lignée",
    pack: "naruto-25e.pouvoirs-lignee",
    path: "systems/naruto-25e/data/pouvoirs-lignee/pouvoirs-lignee.json",
    normalize: normalizeLineagePowerData,
    generatedLineagePowers: true
  },

  // Équipement propre
  {
    group: "equipment",
    groupLabel: "Équipement — Armes",
    label: "arme simple",
    pack: "naruto-25e.armes",
    path: "systems/naruto-25e/data/equipements/armes-simples.json",
    normalize: normalizeEquipmentData
  },
  {
    group: "equipment",
    groupLabel: "Équipement — Armes",
    label: "arme exotique",
    pack: "naruto-25e.armes",
    path: "systems/naruto-25e/data/equipements/armes-exotiques.json",
    normalize: normalizeEquipmentData
  },
  {
    group: "equipment",
    groupLabel: "Équipement — Armes",
    label: "arme de jet",
    pack: "naruto-25e.armes",
    path: "systems/naruto-25e/data/equipements/armes-jet.json",
    normalize: normalizeEquipmentData
  },
  {
    group: "equipment",
    groupLabel: "Équipement — Armures",
    label: "armure",
    pack: "naruto-25e.armures",
    path: "systems/naruto-25e/data/equipements/armures.json",
    normalize: normalizeEquipmentData
  },
  {
    group: "equipment",
    groupLabel: "Équipement — Consommables",
    label: "pilule",
    pack: "naruto-25e.consommables",
    path: "systems/naruto-25e/data/equipements/pilules.json",
    normalize: normalizeEquipmentData
  },
  {
    group: "equipment",
    groupLabel: "Équipement — Consommables",
    label: "drogue",
    pack: "naruto-25e.consommables",
    path: "systems/naruto-25e/data/equipements/drogues.json",
    normalize: normalizeEquipmentData
  },
  {
    group: "equipment",
    groupLabel: "Équipement — Consommables",
    label: "poison",
    pack: "naruto-25e.consommables",
    path: "systems/naruto-25e/data/equipements/poisons.json",
    normalize: normalizeEquipmentData
  },
  {
    group: "equipment",
    groupLabel: "Équipement — Explosifs",
    label: "explosif",
    pack: "naruto-25e.explosifs",
    path: "systems/naruto-25e/data/equipements/explosifs.json",
    normalize: normalizeEquipmentData
  },
  {
    group: "equipment",
    groupLabel: "Équipement — Kits",
    label: "kit",
    pack: "naruto-25e.kits",
    path: "systems/naruto-25e/data/equipements/kits.json",
    normalize: normalizeEquipmentData
  },
  {
    group: "equipment",
    groupLabel: "Équipement — Outils",
    label: "outil",
    pack: "naruto-25e.outils",
    path: "systems/naruto-25e/data/equipements/outils.json",
    normalize: normalizeEquipmentData
  },
  {
    group: "equipment",
    groupLabel: "Équipement — Outils",
    label: "communication",
    pack: "naruto-25e.outils",
    path: "systems/naruto-25e/data/equipements/communication.json",
    normalize: normalizeEquipmentData
  },
  {
    group: "equipment",
    groupLabel: "Équipement — Outils",
    label: "objet ou service",
    pack: "naruto-25e.outils",
    path: "systems/naruto-25e/data/equipements/objets-services.json",
    normalize: normalizeEquipmentData
  },

  // Équipement de départ
  {
    group: "equipment",
    groupLabel: "Équipements de départ",
    label: "équipement de départ",
    pack: "naruto-25e.equipements-depart",
    path: "systems/naruto-25e/data/equipements/equipements-depart.json",
    normalize: normalizeStartingEquipmentData
  }
];

const NINJUTSU_FOLDER_LABELS = {
  katon: "Katon",
  suiton: "Suiton",
  doton: "Doton",
  futon: "Fūton",
  raiton: "Raïton",
  iryo: "Iryō",
  fuin: "Fūin"
};

const GENJUTSU_FOLDER_LABELS = {
  gensou: "Gensou",
  yuryoku: "Yūryoku",
  uchiha: "Uchiha",
  kurama: "Kurama"
};

const TAIJUTSU_FOLDER_LABELS = {
  goken: "Gōken",
  juken: "Jūken",
  chuken: "Chūken",
  hachimon: "Hachimon"
};

const COMMUNE_FOLDER_LABELS = {
  academie: "Académie",
  henge: "Henge",
  kawarimi: "Kawarimi",
  combat: "Combat commun"
};

const ARMES_FOLDER_LABELS = {
  coupsSpeciaux: "Coups spéciaux",
  armesSimples: "Armes simples",
  armesExotiques: "Armes exotiques",
  armesJet: "Armes de jet"
};

const EQUIPMENT_FOLDER_LABELS = {
  armesSimples: "Armes simples",
  armesExotiques: "Armes exotiques",
  armesJet: "Armes de jet",
  armures: "Armures",
  pilules: "Pilules",
  drogues: "Drogues",
  poisons: "Poisons",
  explosifs: "Explosifs",
  kits: "Kits",
  outils: "Outils",
  communication: "Communication",
  objetsServices: "Objets et services",
  depart: "Équipement de départ"
};

const EQUIPMENT_PACK_FOLDERS = {
  "naruto-25e.armes": [
    EQUIPMENT_FOLDER_LABELS.armesSimples,
    EQUIPMENT_FOLDER_LABELS.armesExotiques,
    EQUIPMENT_FOLDER_LABELS.armesJet
  ],
  "naruto-25e.armures": [
    EQUIPMENT_FOLDER_LABELS.armures
  ],
  "naruto-25e.consommables": [
    EQUIPMENT_FOLDER_LABELS.pilules,
    EQUIPMENT_FOLDER_LABELS.drogues,
    EQUIPMENT_FOLDER_LABELS.poisons
  ],
  "naruto-25e.explosifs": [
    EQUIPMENT_FOLDER_LABELS.explosifs
  ],
  "naruto-25e.kits": [
    EQUIPMENT_FOLDER_LABELS.kits
  ],
  "naruto-25e.outils": [
    EQUIPMENT_FOLDER_LABELS.outils,
    EQUIPMENT_FOLDER_LABELS.communication,
    EQUIPMENT_FOLDER_LABELS.objetsServices
  ],
  "naruto-25e.equipements-depart": [
    EQUIPMENT_FOLDER_LABELS.depart
  ]
};

function getBaseItemDefaults() {
  return {
    system: {
      description: "",
      taxonomy: {
        category: "",
        subcategory: "",
        rankGroup: "",
        academy: false,
        startingEligible: false,
        clan: "",
        element: "",
        school: "",
        packTarget: "",
        tags: []
      },
      automation: {
        status: "manual",
        notes: ""
      }
    }
  };
}

function getTechniqueDefaults() {
  return foundry.utils.mergeObject(
    {
      type: "technique",
      img: "icons/svg/book.svg",
      system: {
        family: "",
        domain: "",
        rank: "",
        level: 1,
        skill: "",
        base: "",
        range: "",
        duration: "",
        target: "",
        area: "",
        damage: {
          formula: "",
          type: "none",
          scaling: ""
        },
        chakra: {
          initial: 0,
          maintenance: 0,
          text: ""
        },
        roll: {
          enabled: true,
          defaultDifficulty: 6,
          opposed: false
        },
        prerequisites: {
          strict: false,
          type: "none",
          value: "",
          masteryRank: 5,
          validated: false,
          text: ""
        },
        effect: ""
      }
    },
    getBaseItemDefaults(),
    {
      inplace: false,
      overwrite: false,
      insertKeys: true,
      insertValues: true
    }
  );
}

function getLineagePowerDefaults() {
  return foundry.utils.mergeObject(
    {
      type: "pouvoirLignee",
      img: "icons/svg/eye.svg",
      system: {
        clan: "",
        lineageRank: 1,
        powerType: "maintained",
        activationCost: 0,
        maintenanceCost: 0,
        effect: "",
        prerequisites: {
          text: "",
          gmValidation: false
        }
      }
    },
    getBaseItemDefaults(),
    {
      inplace: false,
      overwrite: false,
      insertKeys: true,
      insertValues: true
    }
  );
}

function getEquipmentDefaults() {
  return foundry.utils.mergeObject(
    {
      type: "equipement",
      img: "icons/svg/item-bag.svg",
      system: {
        quantity: 1,
        value: 0,
        weight: 0,
        carry: {
          holdable: false,
          wearable: false
        },
        useEffect: {
          type: "none",
          resource: "none",
          amount: 0,
          consumeOnUse: true,
          text: ""
        },
        toxicity: {
          enabled: false,
          amount: 0,
          period: "none",
          iaTurns: 0
        }
      }
    },
    getBaseItemDefaults(),
    {
      inplace: false,
      overwrite: false,
      insertKeys: true,
      insertValues: true
    }
  );
}

function normalizeTags(tags) {
  if (Array.isArray(tags)) {
    return tags.map((tag) => String(tag ?? "").trim()).filter(Boolean);
  }

  if (typeof tags === "string") {
    return tags.split(/[,;\n]/g).map((tag) => tag.trim()).filter(Boolean);
  }

  return [];
}

function normalizeBaseItemData(data) {
  const normalized = foundry.utils.mergeObject(
    getBaseItemDefaults(),
    data,
    {
      inplace: false,
      overwrite: true,
      insertKeys: true,
      insertValues: true
    }
  );

  normalized.system.taxonomy = normalized.system.taxonomy ?? {};
  normalized.system.taxonomy.tags = normalizeTags(normalized.system.taxonomy.tags);

  normalized.system.automation = normalized.system.automation ?? {};
  normalized.system.automation.status = ["automated", "partial", "manual", "blocked"].includes(normalized.system.automation.status)
    ? normalized.system.automation.status
    : "manual";
  normalized.system.automation.notes = normalized.system.automation.notes ?? "";

  return normalized;
}

function normalizeTechniqueData(data) {
  const normalized = normalizeBaseItemData(
    foundry.utils.mergeObject(
      getTechniqueDefaults(),
      data,
      {
        inplace: false,
        overwrite: true,
        insertKeys: true,
        insertValues: true
      }
    )
  );

  const system = normalized.system;
  const skill = String(system.skill ?? "").toLowerCase();
  const legacyFamily = String(system.family ?? "");
  const legacyRank = String(system.rank ?? "");
  const domain = String(system.domain ?? "").toLowerCase();

  if (legacyFamily.toLowerCase() === "lignée") {
    system.family = "lignee";
  }

  const declaredCategory = String(system.taxonomy?.category ?? "").toLowerCase();
  const isDeclaredLineageTechnique = system.family === "lignee" || declaredCategory === "lignee";

  if (["gensou", "yuryoku"].includes(skill) && !isDeclaredLineageTechnique) {
    system.family = "genjutsu";
    system.base = system.base || "gen";
    system.taxonomy.category = "genjutsu";
    system.taxonomy.subcategory = skill;
    system.taxonomy.packTarget = "techniques-genjutsu";
  }

  if (skill === "mokuton" && legacyRank.toLowerCase() === "mokuton") {
    system.family = "lignee";
    system.rank = "d";
    system.taxonomy.category = "lignee";
    system.taxonomy.subcategory = "mokuton";
    system.taxonomy.clan = "senju";
    system.taxonomy.rankGroup = system.taxonomy.rankGroup || "d";
    system.taxonomy.packTarget = "techniques-lignees";

    if (!String(system.domain ?? "").toLowerCase().includes("mokuton")) {
      system.domain = `Mokuton — ${system.domain || "Technique"}`;
    }
  }

  if (!["d", "c", "b", "a", "s", "aa", "sPlus"].includes(system.rank)) {
    const rankAsDomain = String(system.rank ?? "").toLowerCase();

    if (rankAsDomain && !system.taxonomy.subcategory) {
      system.taxonomy.subcategory = rankAsDomain;
    }

    if (rankAsDomain === "mokuton") {
      system.family = "lignee";
      system.rank = "d";
      system.taxonomy.category = "lignee";
      system.taxonomy.subcategory = "mokuton";
      system.taxonomy.clan = "senju";
      system.taxonomy.rankGroup = system.taxonomy.rankGroup || "d";
      system.taxonomy.packTarget = "techniques-lignees";
    }
  }

  if (!system.taxonomy.category) {
    if (system.family === "lignee") system.taxonomy.category = "lignee";
    else if (system.family === "armes") system.taxonomy.category = "armes";
    else if (system.family === "taijutsu") system.taxonomy.category = "taijutsu";
    else if (system.family === "genjutsu") system.taxonomy.category = "genjutsu";
    else if (["gensou", "yuryoku"].includes(skill)) system.taxonomy.category = "genjutsu";
    else if (["henge", "kawarimi"].includes(skill)) system.taxonomy.category = "commune";
    else if (["katon", "suiton", "doton", "futon", "raiton", "iryo", "fuin"].includes(skill)) system.taxonomy.category = "ninjutsu";
    else if (["goken", "juken", "chuken", "hachimon"].includes(skill)) system.taxonomy.category = "taijutsu";
    else if (domain.includes("mokuton") || skill === "mokuton") system.taxonomy.category = "lignee";
    else system.taxonomy.category = system.family || "divers";
  }

  if (!system.taxonomy.rankGroup && ["d", "c", "b", "a", "s", "aa", "sPlus"].includes(system.rank)) {
    system.taxonomy.rankGroup = system.rank;
  }

  if (!system.taxonomy.element && ["katon", "suiton", "doton", "futon", "raiton"].includes(skill)) {
    system.taxonomy.element = skill;
  }

  if (!system.taxonomy.school && ["goken", "juken", "chuken", "hachimon"].includes(skill)) {
    system.taxonomy.school = skill;
  }

  if (!system.taxonomy.clan) {
    system.taxonomy.clan = inferTechniqueClanKey(normalized);
  }

  if (!system.taxonomy.subcategory) {
    if (system.taxonomy.category === "lignee") {
      system.taxonomy.subcategory = inferTechniqueLineageSubcategory(normalized);
    } else if (system.taxonomy.element) {
      system.taxonomy.subcategory = system.taxonomy.element;
    } else if (system.taxonomy.school) {
      system.taxonomy.subcategory = system.taxonomy.school;
    } else if (skill) {
      system.taxonomy.subcategory = skill;
    }
  }

  system.taxonomy.packTarget = inferTechniquePackTarget(normalized);

  return normalized;
}

function inferTechniquePackTarget(document) {
  const category = document.system?.taxonomy?.category ?? "";

  if (category === "commune") return "techniques-communes";
  if (category === "ninjutsu") return "techniques-ninjutsu";
  if (category === "genjutsu") return "techniques-genjutsu";
  if (category === "taijutsu") return "techniques-taijutsu";
  if (category === "armes") return "techniques-armes";
  if (category === "lignee") return "techniques-lignees";

  return document.system?.taxonomy?.packTarget ?? "";
}

function inferTechniqueClanKey(document) {
  const system = document.system ?? {};
  const skill = String(system.skill ?? "").toLowerCase();
  const domain = String(system.domain ?? "").toLowerCase();
  const name = String(document.name ?? "").toLowerCase();

  if (skill === "mokuton" || domain.includes("mokuton") || name.includes("mokuton")) return "senju";
  if (skill === "kage") return "nara";
  if (skill === "kikaichu") return "aburame";
  if (skill === "jiton") return "munefuda";
  if (skill === "sumi") return "aniki";
  if (skill === "juken") return "hyuga";
  if (skill === "resistancesEmotionnelles") return "yamanaka";

  if (name.includes("sharingan") || name.includes("mangeky") || name.includes("amaterasu") || name.includes("tsukuyomi")) {
    return "uchiha";
  }

  if (name.includes("byakugan") || name.includes("tenseigan")) {
    return "hyuga";
  }

  return "";
}

function inferTechniqueLineageSubcategory(document) {
  const skill = String(document.system?.skill ?? "").toLowerCase();

  if (skill === "mokuton") return "mokuton";
  if (skill === "kage") return "kage";
  if (skill === "kikaichu") return "kikaichu";
  if (skill === "jiton") return "jiton";
  if (skill === "sumi") return "sumi";
  if (skill === "juken") return "juken";
  if (skill === "resistancesEmotionnelles") return "resistancesEmotionnelles";

  return document.system?.taxonomy?.clan ?? "";
}

function normalizeLineagePowerData(data) {
  const normalized = normalizeBaseItemData(
    foundry.utils.mergeObject(
      getLineagePowerDefaults(),
      data,
      {
        inplace: false,
        overwrite: true,
        insertKeys: true,
        insertValues: true
      }
    )
  );

  normalized.system.taxonomy.category = normalized.system.taxonomy.category || "lignee";
  normalized.system.taxonomy.subcategory = normalized.system.taxonomy.subcategory || normalized.system.clan || "";
  normalized.system.taxonomy.clan = normalized.system.taxonomy.clan || normalized.system.clan || "";
  normalized.system.taxonomy.packTarget = normalized.system.taxonomy.packTarget || "pouvoirs-lignee";

  return normalized;
}

function normalizeEquipmentData(data) {
  const normalized = normalizeBaseItemData(
    foundry.utils.mergeObject(
      getEquipmentDefaults(),
      data,
      {
        inplace: false,
        overwrite: true,
        insertKeys: true,
        insertValues: true
      }
    )
  );

  const system = normalized.system;

  system.quantity = Math.max(1, Number(system.quantity ?? 1));
  system.value = Math.max(0, Number(system.value ?? 0));
  system.weight = Math.max(0, Number(system.weight ?? 0));

  system.taxonomy = system.taxonomy ?? {};
  system.taxonomy.category = String(system.taxonomy.category ?? "");
  system.taxonomy.subcategory = String(system.taxonomy.subcategory ?? "");
  system.taxonomy.packTarget = String(system.taxonomy.packTarget ?? "");

  if (normalized.type === "arme") {
    system.taxonomy.category = system.taxonomy.category || "arme";
  } else if (normalized.type === "armure") {
    system.taxonomy.category = system.taxonomy.category || "armure";
  } else if (normalized.type === "consommable") {
    system.subtype = system.subtype ?? "medicine";
    system.taxonomy.category = system.taxonomy.category || "consommable";
    system.taxonomy.subcategory = system.taxonomy.subcategory || system.subtype;

    system.carry = system.carry ?? {};
    system.carry.holdable = Boolean(system.carry.holdable);
    system.carry.wearable = Boolean(system.carry.wearable);

    system.useEffect = system.useEffect ?? {};
    system.useEffect.type = system.useEffect.type ?? "none";
    system.useEffect.resource = system.useEffect.resource ?? "none";
    system.useEffect.amount = Math.max(0, Number(system.useEffect.amount ?? 0));
    system.useEffect.consumeOnUse = system.useEffect.consumeOnUse !== false;
    system.useEffect.text = system.useEffect.text ?? "";

    system.toxicity = system.toxicity ?? {};
    system.toxicity.enabled = Boolean(system.toxicity.enabled);
    system.toxicity.amount = Math.max(0, Number(system.toxicity.amount ?? 0));
    system.toxicity.period = ["none", "day", "week"].includes(system.toxicity.period)
      ? system.toxicity.period
      : "none";
    system.toxicity.iaTurns = Math.max(0, Number(system.toxicity.iaTurns ?? 0));
  } else {
    system.taxonomy.category = system.taxonomy.category || "divers";
  }

  if (!system.taxonomy.packTarget) {
    system.taxonomy.packTarget = inferEquipmentPackTarget(normalized);
  }

  return normalized;
}

function normalizeStartingEquipmentData(data) {
  const normalized = normalizeEquipmentData(data);

  normalized.system.taxonomy = normalized.system.taxonomy ?? {};
  normalized.system.taxonomy.packTarget = "equipements-depart";
  normalized.system.taxonomy.tags = normalizeTags([
    ...(normalized.system.taxonomy.tags ?? []),
    "equipement-depart"
  ]);

  return normalized;
}

function inferEquipmentPackTarget(document) {
  const type = String(document.type ?? "");
  const taxonomy = document.system?.taxonomy ?? {};
  const category = String(taxonomy.category ?? "");
  const subcategory = String(taxonomy.subcategory ?? "");

  if (category === "depart") return "equipements-depart";

  if (type === "arme" || category === "arme") return "armes";
  if (type === "armure" || category === "armure") return "armures";

  if (category === "explosif" || subcategory === "explosif" || subcategory === "explosifs") {
    return "explosifs";
  }

  if (category === "kit" || subcategory === "kit" || subcategory === "kits") {
    return "kits";
  }

  if (category === "outil" || category === "communication" || category === "service") {
    return "outils";
  }

  if (
    type === "consommable"
    || category === "consommable"
    || ["medicine", "pilule", "pilules", "drug", "drogue", "drogues", "poison", "poisons"].includes(subcategory)
  ) {
    return "consommables";
  }

  return "";
}

function getGeneratedLineagePowerDataFromConfig(existingSourceData = []) {
  const existingNames = new Set(
    existingSourceData
      .map((entry) => String(entry.name ?? ""))
      .filter(Boolean)
  );

  const generated = [];

  for (const [clanKey, features] of Object.entries(NARUTO25E.clanLineageFeatures ?? {})) {
    for (const feature of features ?? []) {
      const name = String(feature.label ?? "");
      if (!name || existingNames.has(name)) continue;

      const rank = Math.max(1, Number(feature.rank ?? 1));
      const tags = Array.isArray(feature.tags) ? feature.tags : [];
      const typeLabel = String(feature.type ?? "")
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase();

      const isPassive =
        typeLabel.includes("passif")
        || typeLabel.includes("bonus")
        || typeLabel.includes("capacite")
        || typeLabel.includes("deblocage")
        || tags.includes("bonus")
        || tags.includes("passive")
        || tags.includes("unlock")
        || tags.includes("interception");

      generated.push({
        name,
        type: "pouvoirLignee",
        img: "icons/svg/aura.svg",
        system: {
          description: feature.summary ?? "",
          clan: clanKey,
          lineageRank: rank,
          powerType: isPassive ? "passive" : "active",
          activationCost: 0,
          maintenanceCost: 0,
          effect: feature.mechanical ?? "Fondation de données. Effet détaillé à automatiser plus tard.",
          prerequisites: {
            text: `Clan ${NARUTO25E.clans?.[clanKey]?.label ?? clanKey}. Lignée ${rank} requise.`,
            gmValidation: tags.includes("mj-only")
          },
          taxonomy: {
            category: "lignee",
            subcategory: clanKey,
            rankGroup: "",
            academy: false,
            startingEligible: false,
            clan: clanKey,
            element: "",
            school: "",
            packTarget: "pouvoirs-lignee",
            tags: ["pouvoir-lignee", ...tags]
          },
          automation: {
            status: isPassive ? "partial" : "manual",
            notes: "Généré depuis la configuration de lignée."
          }
        },
        flags: {
          "naruto-25e": {
            generatedFromLineageFeature: true,
            sourceClan: clanKey,
            sourceRank: rank
          }
        }
      });
    }
  }

  return generated;
}

async function readJsonSource(source) {
  const response = await fetch(source.path);

  if (!response.ok) {
    throw new Error(`Impossible de lire ${source.path} (${response.status}).`);
  }

  const json = await response.json();

  if (Array.isArray(json)) return json;
  if (Array.isArray(json.items)) return json.items;

  throw new Error(`Format JSON invalide pour ${source.path}.`);
}

async function unlockPack(pack) {
  if (!pack.locked) return;

  await pack.configure({
    locked: false
  });
}

async function clearPack(pack) {
  const documents = await pack.getDocuments();
  const ids = documents.map((document) => document.id);

  if (ids.length === 0) return 0;

  await Item.deleteDocuments(ids, {
    pack: pack.collection
  });

  return ids.length;
}

function getDeclaredPackKeys(sources = DATA_SOURCES) {
  return new Set(sources.map((source) => source.pack));
}

function getPackKeyFromPackTarget(packTarget) {
  const target = String(packTarget ?? "").trim();

  if (!target) return "";
  if (target.startsWith("naruto-25e.")) return target;

  return `naruto-25e.${target}`;
}

function getDocumentTargetPackKey(source, document) {
  const packTarget = document.system?.taxonomy?.packTarget ?? "";
  return getPackKeyFromPackTarget(packTarget) || source.pack;
}

async function collectDocumentsByTargetPack(sources = DATA_SOURCES) {
  const documentsByPack = new Map();
  const sourceResults = [];

  for (const source of sources) {
    try {
      const sourceDocuments = await collectDocumentsForSource(source);

      for (const document of sourceDocuments) {
        const targetPackKey = getDocumentTargetPackKey(source, document);

        if (!documentsByPack.has(targetPackKey)) {
          documentsByPack.set(targetPackKey, []);
        }

        documentsByPack.get(targetPackKey).push(document);
      }

      sourceResults.push({
        pack: source.pack,
        type: source.label,
        source: source.path,
        imported: sourceDocuments.length,
        deleted: 0
      });
    } catch (error) {
      console.error(`Naruto 2.5e | Import impossible pour ${source.path}`, error);

      sourceResults.push({
        pack: source.pack,
        type: source.label,
        source: source.path,
        imported: 0,
        deleted: 0,
        error: error.message
      });
    }
  }

  return {
    documentsByPack,
    sourceResults
  };
}

function getPackFolderNames(packKey) {
  if (packKey === "naruto-25e.techniques-communes") {
    return Object.values(COMMUNE_FOLDER_LABELS);
  }

  if (packKey === "naruto-25e.techniques-ninjutsu") {
    return Object.values(NINJUTSU_FOLDER_LABELS);
  }

  if (packKey === "naruto-25e.techniques-genjutsu") {
    return Object.values(GENJUTSU_FOLDER_LABELS);
  }

  if (packKey === "naruto-25e.techniques-taijutsu") {
    return Object.values(TAIJUTSU_FOLDER_LABELS);
  }

  if (packKey === "naruto-25e.techniques-armes") {
    return Object.values(ARMES_FOLDER_LABELS);
  }

  if (packKey === "naruto-25e.techniques-lignees") {
    return Object.values(NARUTO25E.clans ?? {}).map((clan) => clan.label);
  }

  const equipmentFolderNames = EQUIPMENT_PACK_FOLDERS[packKey];

  if (equipmentFolderNames) {
    return equipmentFolderNames;
  }

  return [];
}

function getExistingPackFolders(pack) {
  const folders = [];

  if (pack.folders) {
    if (typeof pack.folders[Symbol.iterator] === "function") {
      folders.push(...pack.folders);
    } else if (Array.isArray(pack.folders.contents)) {
      folders.push(...pack.folders.contents);
    }
  }

  const worldFolders = game.folders?.filter?.((folder) => folder.pack === pack.collection && folder.type === "Item") ?? [];
  folders.push(...worldFolders);

  const uniqueFolders = new Map();

  for (const folder of folders) {
    if (!folder?.id) continue;
    uniqueFolders.set(folder.id, folder);
  }

  return Array.from(uniqueFolders.values());
}

async function ensurePackFolders(pack, packKey) {
  const existingFolders = getExistingPackFolders(pack);
  const foldersByName = new Map(existingFolders.map((folder) => [folder.name, folder]));

  for (const folderName of getPackFolderNames(packKey)) {
    if (foldersByName.has(folderName)) continue;

    const createdFolder = await Folder.create(
      {
        name: folderName,
        type: "Item",
        sorting: "a"
      },
      {
        pack: pack.collection
      }
    );

    foldersByName.set(folderName, createdFolder);
  }

  return foldersByName;
}

function getDocumentFolderName(packKey, document) {
  const system = document.system ?? {};
  const taxonomy = system.taxonomy ?? {};
  const skill = String(system.skill ?? "").toLowerCase();
  const name = String(document.name ?? "");
  const lowerName = name.toLowerCase();

  if (packKey === "naruto-25e.techniques-communes") {
    if (taxonomy.academy) return COMMUNE_FOLDER_LABELS.academie;
    if (skill === "henge") return COMMUNE_FOLDER_LABELS.henge;
    if (skill === "kawarimi") return COMMUNE_FOLDER_LABELS.kawarimi;
    return COMMUNE_FOLDER_LABELS.combat;
  }

  if (packKey === "naruto-25e.techniques-ninjutsu") {
    const element = taxonomy.element || skill;

    if (NINJUTSU_FOLDER_LABELS[element]) {
      return NINJUTSU_FOLDER_LABELS[element];
    }

    if (skill === "iryo") return NINJUTSU_FOLDER_LABELS.iryo;
    if (skill === "fuin") return NINJUTSU_FOLDER_LABELS.fuin;

    return "";
  }

  if (packKey === "naruto-25e.techniques-genjutsu") {
    const subcategory = taxonomy.subcategory || skill;

    if (GENJUTSU_FOLDER_LABELS[subcategory]) {
      return GENJUTSU_FOLDER_LABELS[subcategory];
    }

    return "";
  }

  if (packKey === "naruto-25e.techniques-taijutsu") {
    const school = taxonomy.school || skill;

    if (TAIJUTSU_FOLDER_LABELS[school]) {
      return TAIJUTSU_FOLDER_LABELS[school];
    }

    return "";
  }

  if (packKey === "naruto-25e.techniques-armes") {
    return ARMES_FOLDER_LABELS.coupsSpeciaux;
  }

  if (packKey === "naruto-25e.techniques-lignees") {
    const clanKey = taxonomy.clan || inferTechniqueClanKey(document);
    const clanLabel = NARUTO25E.clans?.[clanKey]?.label;

    if (clanLabel) return clanLabel;

    if (lowerName.includes("mokuton")) return NARUTO25E.clans?.senju?.label ?? "Senju";
    if (lowerName.includes("sharingan") || lowerName.includes("amaterasu") || lowerName.includes("tsukuyomi")) {
      return NARUTO25E.clans?.uchiha?.label ?? "Uchiha";
    }

    return "";
  }

  if (packKey === "naruto-25e.armes") {
    if (taxonomy.subcategory === "armesExotiques") return EQUIPMENT_FOLDER_LABELS.armesExotiques;
    if (taxonomy.subcategory === "armesJet" || lowerName.includes("lot de jet")) return EQUIPMENT_FOLDER_LABELS.armesJet;
    return EQUIPMENT_FOLDER_LABELS.armesSimples;
  }

  if (packKey === "naruto-25e.armures") {
    return EQUIPMENT_FOLDER_LABELS.armures;
  }

  if (packKey === "naruto-25e.consommables") {
    const subcategory = String(taxonomy.subcategory ?? "").toLowerCase();

    if (subcategory === "poison" || subcategory === "poisons" || lowerName.includes("poison")) {
      return EQUIPMENT_FOLDER_LABELS.poisons;
    }

    if (subcategory === "drug" || subcategory === "drogue" || subcategory === "drogues") {
      return EQUIPMENT_FOLDER_LABELS.drogues;
    }

    return EQUIPMENT_FOLDER_LABELS.pilules;
  }

  if (packKey === "naruto-25e.explosifs") {
    return EQUIPMENT_FOLDER_LABELS.explosifs;
  }

  if (packKey === "naruto-25e.kits") {
    return EQUIPMENT_FOLDER_LABELS.kits;
  }

  if (packKey === "naruto-25e.outils") {
    const category = String(taxonomy.category ?? "").toLowerCase();

    if (category === "communication") return EQUIPMENT_FOLDER_LABELS.communication;
    if (category === "service") return EQUIPMENT_FOLDER_LABELS.objetsServices;

    return EQUIPMENT_FOLDER_LABELS.outils;
  }

  if (packKey === "naruto-25e.equipements-depart") {
    return EQUIPMENT_FOLDER_LABELS.depart;
  }

  return "";
}

async function assignFoldersToDocuments(pack, packKey, documents) {
  const foldersByName = await ensurePackFolders(pack, packKey);

  return documents.map((document) => {
    const folderName = getDocumentFolderName(packKey, document);
    const folder = folderName ? foldersByName.get(folderName) : null;

    if (folder?.id) {
      document.folder = folder.id;
    }

    return document;
  });
}

function getSourceGroupsForDisplay() {
  const groups = new Map();

  for (const source of DATA_SOURCES) {
    const groupKey = source.groupLabel ?? source.group ?? "Sources";

    if (!groups.has(groupKey)) {
      groups.set(groupKey, {
        label: groupKey,
        sources: []
      });
    }

    groups.get(groupKey).sources.push({
      pack: source.pack,
      path: source.path,
      label: source.label
    });
  }

  return Array.from(groups.values());
}

async function collectDocumentsForSource(source) {
  let sourceData = await readJsonSource(source);

  if (source.generatedLineagePowers) {
    sourceData = [
      ...sourceData,
      ...getGeneratedLineagePowerDataFromConfig(sourceData)
    ];
  }

  return sourceData.map(source.normalize);
}

export async function importNaruto25eTechniquePacks(options = {}) {
  const clear = Boolean(options.clear);

  if (!game.user?.isGM) {
    ui.notifications.warn("Seul le MJ peut importer les données Naruto 2.5e.");
    return [];
  }

  const results = [];
  const { documentsByPack, sourceResults } = await collectDocumentsByTargetPack(DATA_SOURCES);
  results.push(...sourceResults);

  const packKeys = new Set([
    ...getDeclaredPackKeys(DATA_SOURCES),
    ...documentsByPack.keys()
  ]);

  for (const packKey of packKeys) {
    const pack = game.packs.get(packKey);

    if (!pack) {
      ui.notifications.warn(`Compendium introuvable : ${packKey}`);
      results.push({
        pack: packKey,
        imported: 0,
        deleted: 0,
        error: "Compendium introuvable"
      });
      continue;
    }

    await unlockPack(pack);

    const deleted = clear ? await clearPack(pack) : 0;
    const documents = documentsByPack.get(packKey) ?? [];
    const documentsWithFolders = await assignFoldersToDocuments(pack, packKey, documents);

    if (documentsWithFolders.length > 0) {
      await Item.createDocuments(documentsWithFolders, {
        pack: pack.collection
      });
    }

    results.push({
      pack: packKey,
      type: "compendium final",
      source: "",
      imported: documentsWithFolders.length,
      deleted
    });
  }

  const finalResults = results.filter((result) => result.type === "compendium final");
  const sourceEntriesRead = sourceResults.reduce((total, result) => total + Number(result.imported ?? 0), 0);
  const totalImported = finalResults.reduce((total, result) => total + Number(result.imported ?? 0), 0);
  const totalDeleted = finalResults.reduce((total, result) => total + Number(result.deleted ?? 0), 0);

  ui.notifications.info(
    `Import Naruto 2.5e terminé : ${totalImported} entrée(s) créée(s), ${totalDeleted} ancienne(s) entrée(s) supprimée(s), ${sourceEntriesRead} entrée(s) lue(s) depuis les sources.`
  );

  console.table(results);

  return results;
}

export async function autoImportMissingNaruto25eDataPacks(options = {}) {
  const notify = Boolean(options.notify);

  if (!game.user?.isGM) {
    return [];
  }

  const results = [];
  const { documentsByPack, sourceResults } = await collectDocumentsByTargetPack(DATA_SOURCES);

  results.push(...sourceResults.filter((result) => result.error));

  const packKeys = new Set([
    ...getDeclaredPackKeys(DATA_SOURCES),
    ...documentsByPack.keys()
  ]);

  for (const packKey of packKeys) {
    const pack = game.packs.get(packKey);

    if (!pack) {
      console.warn(`Naruto 2.5e | Auto-import impossible, compendium introuvable : ${packKey}`);
      results.push({
        pack: packKey,
        imported: 0,
        skipped: 0,
        error: "Compendium introuvable"
      });
      continue;
    }

    await unlockPack(pack);

    const documents = documentsByPack.get(packKey) ?? [];
    const index = await pack.getIndex({
      fields: ["name", "type"]
    });

    const existingKeys = new Set(
      index.map((document) => `${document.type ?? ""}::${document.name ?? ""}`)
    );

    const missingDocuments = documents.filter((document) => {
      const key = `${document.type ?? ""}::${document.name ?? ""}`;
      return !existingKeys.has(key);
    });

    const missingDocumentsWithFolders = await assignFoldersToDocuments(pack, packKey, missingDocuments);

    if (missingDocumentsWithFolders.length > 0) {
      await Item.createDocuments(missingDocumentsWithFolders, {
        pack: pack.collection
      });
    }

    results.push({
      pack: packKey,
      imported: missingDocumentsWithFolders.length,
      skipped: documents.length - missingDocumentsWithFolders.length
    });
  }

  const totalImported = results.reduce((total, result) => total + Number(result.imported ?? 0), 0);

  if (totalImported > 0) {
    console.table(results);

    if (notify) {
      ui.notifications.info(`Naruto 2.5e : ${totalImported} entrée(s) manquante(s) auto-importée(s).`);
    }
  }

  return results;
}

export class Naruto25eTechniqueImportApplication extends FormApplication {
  static get defaultOptions() {
    return foundry.utils.mergeObject(super.defaultOptions, {
      id: "naruto-25e-technique-importer",
      title: "Importer les données Naruto 2.5e",
      template: "systems/naruto-25e/templates/apps/technique-importer.hbs",
      width: 640,
      height: "auto",
      closeOnSubmit: true
    });
  }

  async getData(options = {}) {
    const context = await super.getData(options);

    context.sourceGroups = getSourceGroupsForDisplay();

    return context;
  }

  async _updateObject(event, formData) {
    await importNaruto25eTechniquePacks({
      clear: Boolean(formData.clear)
    });
  }
}