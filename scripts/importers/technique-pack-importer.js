import { NARUTO25E } from "../config.js";
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

const STARTING_EQUIPMENT_SOURCES = [
  {
    pack: "naruto-25e.equipements-depart",
    path: "systems/naruto-25e/data/equipements/equipements-depart.json"
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

function getStartingEquipmentDefaults() {
  return {
    type: "equipement",
    img: "icons/svg/item-bag.svg",
    system: {
      description: "",
      quantity: 1,
      value: 0,
      weight: 0
    }
  };
}

function normalizeStartingEquipmentData(data) {
  return foundry.utils.mergeObject(
    getStartingEquipmentDefaults(),
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
    })),
    ...STARTING_EQUIPMENT_SOURCES.map((source) => ({
      ...source,
      label: "équipement de départ",
      normalize: normalizeStartingEquipmentData
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
    let sourceData = await readTechniqueSource(source);

    if (source.pack === "naruto-25e.pouvoirs-lignee") {
      sourceData = [
        ...sourceData,
        ...getGeneratedLineagePowerDataFromConfig(sourceData)
      ];
    }

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

export async function autoImportMissingNaruto25eDataPacks(options = {}) {
  const notify = Boolean(options.notify);

  if (!game.user?.isGM) {
    return [];
  }

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
    })),
    ...STARTING_EQUIPMENT_SOURCES.map((source) => ({
      ...source,
      label: "équipement de départ",
      normalize: normalizeStartingEquipmentData
    }))
  ];

  const results = [];

  for (const source of importSources) {
    const pack = game.packs.get(source.pack);

    if (!pack) {
      console.warn(`Naruto 2.5e | Auto-import impossible, compendium introuvable : ${source.pack}`);
      results.push({
        pack: source.pack,
        type: source.label,
        imported: 0,
        skipped: 0,
        error: "Compendium introuvable"
      });
      continue;
    }

    await unlockPack(pack);

    let sourceData = await readTechniqueSource(source);

    if (source.pack === "naruto-25e.pouvoirs-lignee") {
      sourceData = [
        ...sourceData,
        ...getGeneratedLineagePowerDataFromConfig(sourceData)
      ];
    }

    const documents = sourceData.map(source.normalize);

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

    if (missingDocuments.length > 0) {
      await Item.createDocuments(missingDocuments, {
        pack: pack.collection
      });
    }

    results.push({
      pack: source.pack,
      type: source.label,
      imported: missingDocuments.length,
      skipped: documents.length - missingDocuments.length
    });
  }

  const totalImported = results.reduce((total, result) => total + result.imported, 0);

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
      ...LINEAGE_POWER_SOURCES,
      ...STARTING_EQUIPMENT_SOURCES
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