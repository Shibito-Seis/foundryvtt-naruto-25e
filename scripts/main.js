import { Naruto25eActor } from "./documents/actor.js";
import { Naruto25eShinobiSheet } from "./sheets/shinobi-sheet.js";

Hooks.once("init", async function () {
  console.log("Naruto 2.5e | Initialisation du système");

  CONFIG.Actor.documentClass = Naruto25eActor;

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

  Handlebars.registerHelper("eq", function (a, b) {
    return a === b;
  });

  Actors.unregisterSheet("core", ActorSheet);
  Actors.registerSheet("naruto-25e", Naruto25eShinobiSheet, {
    types: ["shinobi"],
    makeDefault: true
  });
});