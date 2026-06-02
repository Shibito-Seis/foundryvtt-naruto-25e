const TECHNIQUE_SOURCES = [
  {
    pack: "naruto-25e.techniques-communes",
    path: "systems/naruto-25e/data/techniques/techniques-communes.json"
  },
  {
    pack: "naruto-25e.techniques-elementaires",
    path: "systems/naruto-25e/data/techniques/techniques-elementaires.json"
  },
  {
    pack: "naruto-25e.techniques-lignees",
    path: "systems/naruto-25e/data/techniques/techniques-lignees.json"
  }
];

const LINEAGE_POWER_SOURCES = [
  {
    pack: "naruto-25e.pouvoirs-lignee",
    path: "systems/naruto-25e/data/pouvoirs-lignee/pouvoirs-lignee.json"
  }
];

function getTechniqueDefaults() {
  return {
    type: "technique",
    img: "icons/svg/book.svg",
    system: {
      description: "",
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
  };
}

function normalizeTechniqueData(data) {
  return foundry.utils.mergeObject(
    getTechniqueDefaults(),
    data,
    {
      inplace: false,
      overwrite: true,
      insertKeys: true,
      insertValues: true
    }
  );
}

function getLineagePowerDefaults() {
  return {
    type: "pouvoirLignee",
    img: "icons/svg/eye.svg",
    system: {
      description: "",
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
  };
}

function normalizeLineagePowerData(data) {
  return foundry.utils.mergeObject(
    getLineagePowerDefaults(),
    data,
    {
      inplace: false,
      overwrite: true,
      insertKeys: true,
      insertValues: true
    }
  );
}

async function readTechniqueSource(source) {
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

export async function importNaruto25eTechniquePacks(options = {}) {
  const clear = Boolean(options.clear);

  if (!game.user?.isGM) {
    ui.notifications.warn("Seul le MJ peut importer les données Naruto 2.5e.");
    return [];
  }

  const results = [];

  const importSources = [
    ...TECHNIQUE_SOURCES.map((source) => ({
      ...source,
      label: "technique",
      normalize: normalizeTechniqueData
    })),
    ...LINEAGE_POWER_SOURCES.map((source) => ({
      ...source,
      label: "pouvoir de lignée",
      normalize: normalizeLineagePowerData
    }))
  ];

  for (const source of importSources) {
    const pack = game.packs.get(source.pack);

    if (!pack) {
      ui.notifications.warn(`Compendium introuvable : ${source.pack}`);
      results.push({
        pack: source.pack,
        type: source.label,
        imported: 0,
        deleted: 0,
        error: "Compendium introuvable"
      });
      continue;
    }

    await unlockPack(pack);

    const deleted = clear ? await clearPack(pack) : 0;
    const sourceData = await readTechniqueSource(source);
    const documents = sourceData.map(source.normalize);

    if (documents.length > 0) {
      await Item.createDocuments(documents, {
        pack: pack.collection
      });
    }

    results.push({
      pack: source.pack,
      type: source.label,
      imported: documents.length,
      deleted
    });
  }

  const totalImported = results.reduce((total, result) => total + result.imported, 0);
  const totalDeleted = results.reduce((total, result) => total + result.deleted, 0);

  ui.notifications.info(
    `Import Naruto 2.5e terminé : ${totalImported} entrée(s) importée(s), ${totalDeleted} ancienne(s) entrée(s) supprimée(s).`
  );

  console.table(results);

  return results;
}

export class Naruto25eTechniqueImportApplication extends FormApplication {
  static get defaultOptions() {
    return foundry.utils.mergeObject(super.defaultOptions, {
      id: "naruto-25e-technique-importer",
      title: "Importer les techniques Naruto 2.5e",
      template: "systems/naruto-25e/templates/apps/technique-importer.hbs",
      width: 560,
      height: "auto",
      closeOnSubmit: true
    });
  }

  async getData(options = {}) {
    const context = await super.getData(options);

    context.sources = [
      ...TECHNIQUE_SOURCES,
      ...LINEAGE_POWER_SOURCES
    ].map((source) => ({
      pack: source.pack,
      path: source.path
    }));

    return context;
  }

  async _updateObject(event, formData) {
    await importNaruto25eTechniquePacks({
      clear: Boolean(formData.clear)
    });
  }
}