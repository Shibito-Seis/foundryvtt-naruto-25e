import { Naruto25eActor } from "./documents/actor.js";
import { Naruto25eItem } from "./documents/item.js";
import { Naruto25eShinobiSheet } from "./sheets/shinobi-sheet.js";
import { Naruto25eItemSheet } from "./sheets/item-sheet.js";
import {
  autoImportMissingNaruto25eDataPacks,
  importNaruto25eTechniquePacks,
  Naruto25eTechniqueImportApplication
} from "./importers/technique-pack-importer.js";

Hooks.once("init", async function () {
  console.log("Naruto 2.5e | Initialisation du système");

  CONFIG.Actor.documentClass = Naruto25eActor;
  CONFIG.Item.documentClass = Naruto25eItem;

  game.settings.register("naruto-25e", "chakraFormulaMode", {
    name: "Formule de Chakra",
    hint: "Détermine la formule globale utilisée pour calculer le Chakra maximum des personnages.",
    scope: "world",
    config: true,
    restricted: true,
    type: String,
    choices: {
      standard: "A — COR×30 + ESP×30 + 50",
      harsh: "B — COR×30 + ESP×30",
      heroic: "C — COR×50 + ESP×50",
      manual: "D — Manuel"
    },
    default: "standard",
    onChange: () => {
      for (const actor of game.actors ?? []) {
        actor.prepareData();
        actor.sheet?.render(false);
      }
    }
  });

  game.settings.register("naruto-25e", "startingMode", {
  name: "Mode de création des personnages",
  hint: "Détermine le rang et l’expérience de départ utilisés par défaut lors de la création guidée des Shinobi.",
  scope: "world",
  config: true,
  restricted: true,
  type: String,
  choices: {
    aspirant100: "Aspirant Ninja — 100 XP",
    geninD125: "Genin rang D — 125 XP"
    },
  default: "aspirant100"
  });

  game.settings.register("naruto-25e", "affinityCostMode", {
    name: "Coût des affinités naturelles",
    hint: "Détermine si l’affinité principale est offerte ou déduite des 5 compétences initiales.",
    scope: "world",
    config: true,
    restricted: true,
    type: String,
    choices: {
      freePrimary: "Affinité principale offerte",
      countPrimary: "Affinité principale déduite des 5 compétences initiales"
    },
    default: "freePrimary",
    onChange: () => {
      for (const actor of game.actors ?? []) {
        actor.prepareData();
        actor.sheet?.render(false);
      }
    }
  });

    game.settings.register("naruto-25e", "uchihaPowerMode", {
    name: "Pouvoirs Uchiha",
    hint: "Détermine si la progression Uchiha suit le databook papier ou si les pouvoirs du Mangekyō sont choisis par œil.",
    scope: "world",
    config: true,
    restricted: true,
    type: String,
    choices: {
      classic: "Classique — progression papier",
      original: "Original — pouvoirs par œil"
    },
    default: "classic",
    onChange: () => {
      for (const actor of game.actors ?? []) {
        actor.prepareData();
        actor.sheet?.render(false);
      }
    }
  });

    game.settings.register("naruto-25e", "mangekyoChakraBonusMode", {
    name: "Bonus Chakra Mangekyō",
    hint: "Détermine si le bonus de +200 Chakra du Mangekyō Sharingan est passif ou seulement actif pendant l’activation du pouvoir.",
    scope: "world",
    config: true,
    restricted: true,
    type: String,
    choices: {
      passive: "Passif — +200 Chakra max dès possession validée",
      active: "Actif — +200 Chakra max et actuel pendant l’activation"
    },
    default: "passive",
    onChange: () => {
      for (const actor of game.actors ?? []) {
        actor.prepareData();
        actor.sheet?.render(false);
      }
    }
  });

  game.settings.register("naruto-25e", "mangekyoActiveChakraEndMode", {
    name: "Désactivation du bonus actif Mangekyō",
    hint: "S’applique uniquement si le bonus Chakra Mangekyō est actif. Détermine comment le Chakra actuel est recalculé à la désactivation.",
    scope: "world",
    config: true,
    restricted: true,
    type: String,
    choices: {
      relative: "Relatif classique — garde le même pourcentage de Chakra",
      relativeCapped: "Relatif plafonné — garde le pourcentage sans gain abusif",
      brutal: "Perte sèche — retire 200 Chakra actuel"
    },
    default: "relativeCapped",
    onChange: () => {
      for (const actor of game.actors ?? []) {
        actor.prepareData();
        actor.sheet?.render(false);
      }
    }
  });

    game.settings.register("naruto-25e", "autoImportDataOnReady", {
    name: "Auto-import des données système",
    hint: "Au lancement du monde, le MJ importe automatiquement les entrées JSON manquantes dans les compendiums système. L’import est non destructif : les entrées déjà présentes ne sont pas supprimées.",
    scope: "world",
    config: true,
    restricted: true,
    type: Boolean,
    default: true
  });

    game.settings.registerMenu("naruto-25e", "techniqueImporter", {
    name: "Importer les techniques",
    label: "Ouvrir l’importeur",
    hint: "Ouvre l’outil MJ d’import des techniques depuis les fichiers JSON du système.",
    icon: "fas fa-file-import",
    type: Naruto25eTechniqueImportApplication,
    restricted: true
  });

  Handlebars.registerHelper("eq", function (a, b) {
    return a === b;
  });

  Handlebars.registerHelper("or", function (...args) {
    return args.slice(0, -1).some(Boolean);
  });

  Actors.unregisterSheet("core", ActorSheet);
  Actors.registerSheet("naruto-25e", Naruto25eShinobiSheet, {
    types: ["shinobi"],
    makeDefault: true
  });

  Items.unregisterSheet("core", ItemSheet);
  Items.registerSheet("naruto-25e", Naruto25eItemSheet, {
    types: [
      "technique",
      "arme",
      "armure",
      "equipement",
      "consommable",
      "clan",
      "pouvoirLignee",
      "developpement",
      "condition",
      "blessure",
      "nindoAction"
    ],
    makeDefault: true
  });

  game.naruto25e = foundry.utils.mergeObject(game.naruto25e ?? {}, {
    autoImportMissingDataPacks: autoImportMissingNaruto25eDataPacks,
    importTechniquePacks: importNaruto25eTechniquePacks,
    openTechniqueImporter: () => new Naruto25eTechniqueImportApplication().render(true)
  }, {
    inplace: false
  });
});

Hooks.once("ready", async function () {
  if (!game.user?.isGM) return;

  let enabled = true;

  try {
    enabled = game.settings.get("naruto-25e", "autoImportDataOnReady");
  } catch (error) {
    enabled = true;
  }

  if (!enabled) return;

  await autoImportMissingNaruto25eDataPacks({
    notify: true
  });
});

Hooks.on("updateCombat", async function (combat, changed) {
  const turnChanged = foundry.utils.hasProperty(changed, "turn");
  const roundChanged = foundry.utils.hasProperty(changed, "round");

  if (!turnChanged && !roundChanged) return;
  if (!game.user.isGM) return;

  const actor = combat.combatant?.actor;

  if (!actor || actor.type !== "shinobi") return;
  if (typeof actor.applyMaintainedLineagePowerUpkeep !== "function") return;

  await actor.applyMaintainedLineagePowerUpkeep({ forceDialog: false });
});

Hooks.on("createActor", async function (actor) {
  if (!game.user?.isGM) return;
  if (!actor || actor.type !== "shinobi") return;
  if (typeof actor.syncLineagePowersFromHeritage !== "function") return;

  await actor.syncLineagePowersFromHeritage();
});

Hooks.on("updateActor", async function (actor, changed) {
  if (!game.user?.isGM) return;
  if (!actor || actor.type !== "shinobi") return;
  if (typeof actor.syncLineagePowersFromHeritage !== "function") return;

  const shouldSync =
    foundry.utils.hasProperty(changed, "system.heritage.mode")
    || foundry.utils.hasProperty(changed, "system.heritage.clan")
    || foundry.utils.hasProperty(changed, "system.heritage.hybrid.secondaryClan")
    || foundry.utils.hasProperty(changed, "system.heritage.gmOptions.hasMangekyoSharingan")
    || foundry.utils.hasProperty(changed, "system.heritage.uchiha.mangekyo.rightEyePlayerValidated")
    || foundry.utils.hasProperty(changed, "system.heritage.uchiha.mangekyo.rightEyeGmValidated")
    || foundry.utils.hasProperty(changed, "system.heritage.uchiha.mangekyo.leftEyePlayerValidated")
    || foundry.utils.hasProperty(changed, "system.heritage.uchiha.mangekyo.leftEyeGmValidated")
    || foundry.utils.hasProperty(changed, "system.bases.lign.value")
    || foundry.utils.hasProperty(changed, "system.bases.lign.bonus");

  if (!shouldSync) return;

  await actor.syncLineagePowersFromHeritage({ notify: true });
});