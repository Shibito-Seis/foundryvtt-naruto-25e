const TECHNIQUE_SOURCES = [
  {
    pack: "naruto-25e.techniques-communes",
    path: "systems/naruto-25e/data/techniques/techniques-communes.json"
  },
  {
    pack: "naruto-25e.techniques-elementaires",
    path: "systems/naruto-25e/data/techniques/techniques-elementaires.json"
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
    ui.notifications.warn("Seul le MJ peut importer les techniques Naruto 2.5e.");
    return [];
  }

  const results = [];

  for (const source of TECHNIQUE_SOURCES) {
    const pack = game.packs.get(source.pack);

    if (!pack) {
      ui.notifications.warn(`Compendium introuvable : ${source.pack}`);
      results.push({
        pack: source.pack,
        imported: 0,
        deleted: 0,
        error: "Compendium introuvable"
      });
      continue;
    }

    await unlockPack(pack);

    const deleted = clear ? await clearPack(pack) : 0;
    const sourceData = await readTechniqueSource(source);
    const documents = sourceData.map(normalizeTechniqueData);

    if (documents.length > 0) {
      await Item.createDocuments(documents, {
        pack: pack.collection
      });
    }

    results.push({
      pack: source.pack,
      imported: documents.length,
      deleted
    });
  }

  const totalImported = results.reduce((total, result) => total + result.imported, 0);
  const totalDeleted = results.reduce((total, result) => total + result.deleted, 0);

  ui.notifications.info(
    `Import Naruto 2.5e terminé : ${totalImported} technique(s) importée(s), ${totalDeleted} ancienne(s) entrée(s) supprimée(s).`
  );

  console.table(results);

  return results;
}