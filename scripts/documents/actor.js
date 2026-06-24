import { NARUTO25E } from "../config.js";
const NARUTO25E_STARTING_EQUIPMENT = {
  mainWeapons: {
    kunai: "Kunaï",
    tanto: "Tantō",
    wakizashi: "Wakizashi",
    katana: "Katana",
    ninjato: "Ninjatō"
  },
  combatLots: {
    kunaiLot: "Kunaï — Arme de jet",
    shurikenLot: "Shuriken — Arme de jet",
    senbonLot: "Senbon — Arme de jet",
    explosiveNoteLot: "Note explosive — lot"
  },
  fixed: [
    "Pilule du soldat",
    "Pilule de chakra mineure",
    "Kit de premiers soins",
    "Kit de survie",
    "Kit technique"
  ]
};

const NARUTO25E_STARTING_TECHNIQUES = {
  caseSchool: {
    maxChoices: 3,
    maxAcademy: 2,
    maxKawarimi: 1
  },
  specialized: {
    maxChoices: 3,
    maxLevel: 1,
    allowedRanks: ["d"]
  },
  gensouUnlock: {
    minimumGensouSkill: 3,
    minimumGenjutsuBase: 3
  }
};

const NARUTO25E_NARRATIVE_ARC_LIMITS = {
  min: 3,
  max: 7,
  wheelSizes: [3, 5, 7],
  statuses: ["active", "completed", "abandoned"]
};

const NARUTO25E_RELATIONSHIP_LIMITS = {
  max: 50,
  minScore: -150,
  maxScore: 150
};

const NARUTO25E_EFFECT_LIMITS = {
  max: 100,
  minRank: 0,
  maxRank: 10,
  maxDuration: 999
};

export class Naruto25eActor extends Actor {
  prepareDerivedData() {
    super.prepareDerivedData();

    if (this.type !== "shinobi") return;

    const system = this.system;

    this._prepareCreation(system);
    this._prepareBases(system);
    this._prepareSkills(system);
    this._prepareHeritage(system);
    this._prepareChakraAffinities(system);
    this._finalizeSkillOwnership(system);
    this._prepareLineagePassiveBonuses(system);
    this._prepareChakraSpecializations(system);
    this._prepareResources(system);
    this._prepareEffects(system);
    this._prepareCombat(system);
    this._prepareInventory(system);
    this._prepareExperience(system);
    this._prepareMissions(system);
    this._prepareNindo(system);
    this._prepareBackground(system);
    this._prepareRankProgression(system);
  }

  _getBaseEffective(system, key) {
    const base = system.bases?.[key];
    if (!base) return 0;

    const value = Number(base.value ?? 0);
    const bonus = Number(base.bonus ?? 0);

    return value + bonus;
  }

  _prepareCreation(system) {
    if (!system.progression) system.progression = {};

    if (!system.progression.creation) {
      system.progression.creation = {
        locked: false,
        validatedAt: "",
        validatedBy: "",
        notes: "",
        mode: "",
        currentStep: "identity",
        manualChosenAt: "",
        shinobimancerStartedAt: "",
        lastOpenedAt: ""
      };
    }

    const creation = system.progression.creation;

    creation.locked = Boolean(creation.locked);
    creation.validatedAt = creation.validatedAt ?? "";
    creation.validatedBy = creation.validatedBy ?? "";
    creation.notes = creation.notes ?? "";

    const allowedCreationModes = new Set(["", "manual", "shinobimancer"]);
    const mode = String(creation.mode ?? "");

    creation.mode = allowedCreationModes.has(mode) ? mode : "";
    creation.currentStep = creation.currentStep ?? "identity";
    creation.manualChosenAt = creation.manualChosenAt ?? "";
    creation.shinobimancerStartedAt = creation.shinobimancerStartedAt ?? "";
    creation.lastOpenedAt = creation.lastOpenedAt ?? "";
        if (!creation.startingEquipment) {
      creation.startingEquipment = {
        mainWeapon: "",
        combatLots: [],
        granted: false,
        grantedAt: "",
        grantedBy: ""
      };
    }

    creation.startingEquipment.mainWeapon = String(creation.startingEquipment.mainWeapon ?? "");
    creation.startingEquipment.combatLots = Array.isArray(creation.startingEquipment.combatLots)
      ? creation.startingEquipment.combatLots
      : [];
    creation.startingEquipment.granted = Boolean(creation.startingEquipment.granted);
    creation.startingEquipment.grantedAt = creation.startingEquipment.grantedAt ?? "";
    creation.startingEquipment.grantedBy = creation.startingEquipment.grantedBy ?? "";

    this._prepareStartingTechniquesCreationState(creation);
  }

  _prepareStartingTechniquesCreationState(creation) {
    if (!creation.startingTechniques) {
      creation.startingTechniques = {};
    }

    const startingTechniques = creation.startingTechniques;

    if (!startingTechniques.caseSchool) {
      startingTechniques.caseSchool = {
        choices: [],
        locked: false,
        completed: false
      };
    }

    if (!startingTechniques.specialized) {
      startingTechniques.specialized = {
        choices: [],
        locked: false,
        completed: false
      };
    }

    startingTechniques.caseSchool.choices = Array.isArray(startingTechniques.caseSchool.choices)
      ? startingTechniques.caseSchool.choices
          .map((choice) => String(choice ?? ""))
          .filter(Boolean)
      : [];

    startingTechniques.caseSchool.locked = Boolean(startingTechniques.caseSchool.locked);
    startingTechniques.caseSchool.completed = Boolean(startingTechniques.caseSchool.completed);

    startingTechniques.specialized.choices = Array.isArray(startingTechniques.specialized.choices)
      ? startingTechniques.specialized.choices
          .map((choice) => String(choice ?? ""))
          .filter(Boolean)
      : [];

    startingTechniques.specialized.locked = Boolean(startingTechniques.specialized.locked);
    startingTechniques.specialized.completed = Boolean(startingTechniques.specialized.completed);

    startingTechniques.grantedLineage = Array.isArray(startingTechniques.grantedLineage)
      ? startingTechniques.grantedLineage
          .map((entry) => String(entry ?? ""))
          .filter(Boolean)
      : [];

    startingTechniques.grantedPowers = Array.isArray(startingTechniques.grantedPowers)
      ? startingTechniques.grantedPowers
          .map((entry) => String(entry ?? ""))
          .filter(Boolean)
      : [];

    startingTechniques.granted = Boolean(startingTechniques.granted);
    startingTechniques.grantedAt = startingTechniques.grantedAt ?? "";
    startingTechniques.grantedBy = startingTechniques.grantedBy ?? "";
  }

  getStartingTechniqueRules() {
    return foundry.utils.deepClone(NARUTO25E_STARTING_TECHNIQUES);
  }

  getStartingTechniqueState() {
    const creation = this.system?.progression?.creation ?? {};

    return creation.startingTechniques ?? {
      caseSchool: {
        choices: [],
        locked: false,
        completed: false
      },
      specialized: {
        choices: [],
        locked: false,
        completed: false
      },
      grantedLineage: [],
      grantedPowers: [],
      granted: false,
      grantedAt: "",
      grantedBy: ""
    };
  }

  hasStartingGensouAccess() {
    const gensouSkill = Number(this.system?.skills?.gensou?.natural ?? 0);
    const gensouBonus = Number(this.system?.skills?.gensou?.bonus ?? 0);
    const gensouTotal = gensouSkill + gensouBonus;

    const genjutsuBase = Number(this.system?.bases?.gen?.value ?? 0)
      + Number(this.system?.bases?.gen?.bonus ?? 0);

    const rules = NARUTO25E_STARTING_TECHNIQUES.gensouUnlock;

    return gensouTotal >= rules.minimumGensouSkill
      || genjutsuBase >= rules.minimumGenjutsuBase;
  }

  getOwnedStartingTechniqueSkillKeys() {
    const skills = this.system?.skills ?? {};
    const ownedSkillKeys = [];

    for (const [skillKey, skill] of Object.entries(skills)) {
      if (!Boolean(skill?.owned)) continue;

      const definition = NARUTO25E.skillDefinitions?.[skillKey];
      if (!definition) continue;

      const category = String(definition.category ?? "");

      if (!["combat", "terrain", "clan"].includes(category)) continue;
      if (skillKey === "armesExotiques") continue;
      if (skillKey === "coupSpecialArm") continue;
      if (skillKey === "coupSpecialTai") continue;
      if (skillKey === "scienceExplosifs") continue;
      if (skillKey === "sciencePieges") continue;
      if (skillKey === "scienceDrogues") continue;
      if (skillKey === "sciencePoisons") continue;

      ownedSkillKeys.push(skillKey);
    }

    if (this.hasStartingGensouAccess() && !ownedSkillKeys.includes("gensou")) {
      ownedSkillKeys.push("gensou");
    }

    return ownedSkillKeys;
  }

    isCreationLocked() {
      return Boolean(this.system.progression?.creation?.locked);
    }

    canUserEditLockedCreationFields(user = game.user) {
      return Boolean(user?.isGM) || !this.isCreationLocked();
    }

    canUserEditRyo(user = game.user) {
      if (user?.isGM) return true;

      return Boolean(this.system.inventory?.permissions?.allowPlayerRyoEdit);
    }

    canUserEditNindo(user = game.user) {
      if (user?.isGM) return true;
      if (!this.isCreationLocked()) return true;

      return Boolean(this.system.nindo?.unlockedByGM);
    }

    _getNormalizedHeritageMode(heritage = this.system?.heritage ?? {}) {
      const mode = heritage.mode === "customClan"
        ? "clan"
        : heritage.mode ?? "clan";

      return NARUTO25E.heritageModes?.[mode] ? mode : "clan";
    }

    _getHiddenClanData(heritage = this.system?.heritage ?? {}) {
      const hiddenClan = heritage.hiddenClan ?? {};
      const awareness = String(hiddenClan.awareness ?? "ignorant");
      const state = NARUTO25E.getHiddenClanAwarenessState?.(awareness) ?? {
        label: "Dans l’ignorance",
        maxCreationLineage: 0,
        requiresUnlockAbove: 0
      };

      return {
        officialClan: String(hiddenClan.officialClan ?? ""),
        realClan: String(hiddenClan.realClan ?? ""),
        awareness,
        state,
        unlocked: Boolean(hiddenClan.unlocked),
        notes: String(hiddenClan.notes ?? "")
      };
    }

    _getHiddenClanLineageCap() {
      const heritage = this.system?.heritage ?? {};
      const mode = this._getNormalizedHeritageMode(heritage);

      if (mode !== "hiddenClan") return null;

      const hiddenClan = this._getHiddenClanData(heritage);

      if (hiddenClan.unlocked) return null;

      return Math.max(0, Number(hiddenClan.state.maxCreationLineage ?? 0));
    }

    _getEffectiveLineageValue() {
      const rawLineage = Math.max(0, Number(this.system?.bases?.lign?.value ?? 0));
      const hiddenCap = this._getHiddenClanLineageCap();

      const effectiveLineage = hiddenCap === null
        ? rawLineage
        : Math.min(rawLineage, hiddenCap);

      const awakening = this._getNindoAwakeningState?.() ?? {};
      const awakeningActive = Boolean(awakening.active);

      if (awakeningActive) {
        return Math.max(effectiveLineage, 10);
      }

      return effectiveLineage;
    }

    _getMechanicalClanKeys(options = {}) {
      const purpose = String(options.purpose ?? "powers");
      const includeDormantHiddenClan = Boolean(options.includeDormantHiddenClan);
      const heritage = this.system?.heritage ?? {};
      const mode = this._getNormalizedHeritageMode(heritage);
      const clanKeys = [];

      const addClan = (clanKey) => {
        const key = String(clanKey ?? "");
        if (!key) return;
        if (NARUTO25E.isCustomClanKey?.(key)) return;
        if (!NARUTO25E.clans?.[key]) return;
        if (!clanKeys.includes(key)) clanKeys.push(key);
      };

      if (mode === "clan" || mode === "hybridClan" || mode === "hybridVoie") {
        addClan(heritage.clan);
      }

      if (mode === "hybridClan") {
        addClan(heritage.hybrid?.secondaryClan);
      }

      if (mode === "hiddenClan") {
        const hiddenClan = this._getHiddenClanData(heritage);
        const hiddenCap = this._getHiddenClanLineageCap();

        /*
          En Clan caché, le Réel Clan est toujours le clan mécanique
          pour les obligations de création : affinités, compétences,
          validations, restrictions et avertissements.

          En revanche, pour l'attribution des pouvoirs de lignée,
          le Réel Clan ne produit des pouvoirs que si la Lignée effective
          est supérieure à 0, ou si le déblocage narratif MJ est actif.
        */
        if (purpose === "requirements" || includeDormantHiddenClan) {
          addClan(hiddenClan.realClan);
        } else if (hiddenClan.unlocked || hiddenCap === null || hiddenCap > 0) {
          addClan(hiddenClan.realClan);
        }
      }

      return clanKeys;
    }

    _getSocialClanKey() {
      const heritage = this.system?.heritage ?? {};
      const mode = this._getNormalizedHeritageMode(heritage);

      if (mode === "hiddenClan") {
        return this._getHiddenClanData(heritage).officialClan;
      }

      return String(heritage.clan ?? "");
    }

    getPublicClanKamonPath() {
      if (this.type !== "shinobi") return "";

      const clanKey = String(this._getSocialClanKey() ?? "").trim().toLowerCase();

      if (!clanKey || !NARUTO25E.clans?.[clanKey]) {
        return "";
      }

      return `systems/naruto-25e/assets/clans/kamon_${clanKey}.svg`;
    }

    _hasMechanicalClan(clanKey, options = {}) {
      return this._getMechanicalClanKeys(options).includes(clanKey);
    }

    _hasValidatedRinnegan() {
      return Boolean(this.system.heritage?.gmOptions?.hasRinnegan);
    }

    _hasValidatedTenseigan() {
      return Boolean(this.system.heritage?.gmOptions?.hasTenseigan);
    }

    _hasValidatedEternalMangekyoSharingan() {
      return Boolean(this.system.heritage?.gmOptions?.hasEternalMangekyoSharingan);
    }

    _hasSenjuCellsForRinnegan() {
      return Boolean(this.system.heritage?.gmOptions?.hasSenjuCells)
        || this._hasMechanicalClan("senju", { purpose: "requirements" });
    }

    getCreationValidationSummary() {
      if (this.type !== "shinobi") {
        return {
          valid: true,
          errors: [],
          warnings: [],
          summary: {}
        };
      }

      const system = this.system;
      const heritage = system.heritage ?? {};
      const chakra = system.chakra ?? {};
      const affinities = chakra.affinities ?? {};
      const skills = system.skills ?? {};
      const experience = system.progression?.experience ?? {};
      const startingEquipment = system.progression?.creation?.startingEquipment ?? {};
      const startingTechniques = system.progression?.creation?.startingTechniques ?? {};
      const chakraSpecializationState = system.chakra?.specializationState ?? {};

      const errors = [];
      const warnings = [];

      const addError = (message) => {
        if (!errors.includes(message)) errors.push(message);
      };

      const addWarning = (message) => {
        if (!warnings.includes(message)) warnings.push(message);
      };

      const getForcedAffinityKey = (entry) => {
        if (!entry) return "";
        if (typeof entry === "object") {
          return String(entry.key ?? entry.id ?? entry.value ?? "");
        }
        return String(entry);
      };

      const getForcedAffinitySlot = (entry) => {
        if (!entry || typeof entry !== "object") return "";
        return String(entry.slot ?? "");
      };

      const getAffinityLabel = (key) => {
        return NARUTO25E.chakraAffinities?.[key]?.label ?? key;
      };

      const villageKey = heritage.village ?? "";
      const village = NARUTO25E.villages?.[villageKey];

      const mode = this._getNormalizedHeritageMode(heritage);
      const clanKey = heritage.clan ?? "";
      const voieKey = heritage.voie ?? "";
      const secondaryClanKey = heritage.hybrid?.secondaryClan ?? "";

      const clan = NARUTO25E.clans?.[clanKey];
      const voie = NARUTO25E.voies?.[voieKey];
      const secondaryClan = NARUTO25E.clans?.[secondaryClanKey];

      const hiddenClan = this._getHiddenClanData(heritage);
      const officialHiddenClan = NARUTO25E.clans?.[hiddenClan.officialClan];
      const realHiddenClan = NARUTO25E.clans?.[hiddenClan.realClan];

      const gmOptions = heritage.gmOptions ?? {};

      const countableSources = new Set([
        "manual",
        "heritage",
        "affinityForced",
        "affinityPrimary",
        "affinitySecondary",
        "affinityExtra"
      ]);

      let initialSkillsUsed = 0;

      for (const skill of Object.values(skills)) {
        const sources = Array.isArray(skill.creationSources)
          ? skill.creationSources
          : [];

        const hasCountingSource = sources.some((source) => countableSources.has(source));
        const hasFreePrimaryAffinity = sources.includes("affinityPrimaryFree");

        /*
        Une compétence ne compte qu'une seule fois.
        Si elle est seulement possédée via affinité principale offerte, elle ne compte pas.
        Si elle a une source payante/obligatoire, elle compte.
        Si elle a "manual" + "affinityPrimaryFree", on ne la compte pas deux fois,
        et on privilégie l'idée qu'elle est surtout accordée par l'affinité offerte.
        */
        const counts =
          hasCountingSource
          && !(hasFreePrimaryAffinity && sources.every((source) => {
            return source === "manual" || source === "affinityPrimaryFree";
          }));

        if (counts) initialSkillsUsed += 1;
      }

      const maxInitialSkills = 5;

      const actorName = String(this.name ?? "").trim();

      if (!actorName) {
        addError("Le nom du ninja est obligatoire.");
      }

      if (!villageKey || !village) {
        addError("Aucun village d’origine valide n’est sélectionné.");
      } else if (!village.selectable) {
        addError(`Le village ${village.label} est visible mais pas encore sélectionnable.`);
      }

      const validateCustomClan = (roleLabel = "clan custom") => {
        const customClan = heritage.customClan ?? {};
        const customName = String(customClan.name ?? "").trim();
        const choices = NARUTO25E.getCustomClanMandatoryChoices?.(customClan) ?? [];

        if (!gmOptions.allowCustomClan) {
          addError(`Le ${roleLabel} n’est pas autorisé par le MJ pour cette fiche.`);
        }

        if (!customName) {
          addError("Le clan custom doit avoir un nom.");
        }

        if (choices.length > 2) {
          addError("Le clan custom ne peut pas imposer plus de 2 choix au total.");
        }

        const uniqueChoices = new Set(choices);

        if (uniqueChoices.size !== choices.length) {
          addError("Le clan custom ne peut pas imposer deux fois le même choix.");
        }

        for (const choiceKey of choices) {
          const choice = NARUTO25E.getCustomClanChoiceData?.(choiceKey);

          if (!choice) {
            addError(`Choix imposé de clan custom invalide : ${choiceKey}.`);
            continue;
          }

          if (!choice.valid) {
            addError(choice.invalidReason || `Choix imposé de clan custom invalide : ${choiceKey}.`);
          }
        }
      };

      if (mode === "clan") {
        if (NARUTO25E.isCustomClanKey?.(clanKey)) {
          validateCustomClan("clan custom");
        } else if (!clanKey || !clan) {
          addError("Aucun clan principal n’est sélectionné.");
        } else if (clan.village !== villageKey) {
          addError(`Le clan ${clan.label} n’est pas compatible avec le village sélectionné.`);
        }
      }

      if (mode === "voie") {
        if (!voieKey || !voie) {
          addError("Aucune voie n’est sélectionnée.");
        } else {
          const voieAllowed = voie.village === "any" || voie.village === villageKey;

          if (!voie.selectable || !voieAllowed) {
            addError(`La voie ${voie.label} n’est pas compatible avec le village sélectionné.`);
          }
        }
      }

      if (mode === "hybridClan") {
        if (!gmOptions.allowHybridClan) {
          addError("Le clan hybride n’est pas autorisé par le MJ pour cette fiche.");
        }

        if (NARUTO25E.isCustomClanKey?.(clanKey)) {
          validateCustomClan("clan custom principal");
        } else if (!clanKey || !clan) {
          addError("Aucun clan principal n’est sélectionné pour l’hybridation.");
        } else if (clan.village !== villageKey) {
          addError(`Le clan principal ${clan.label} n’est pas compatible avec le village sélectionné.`);
        }

        if (!secondaryClanKey || !secondaryClan) {
          addError("Aucun clan secondaire n’est sélectionné pour l’hybridation.");
        } else if (secondaryClan.village !== villageKey) {
          addError(`Le clan secondaire ${secondaryClan.label} n’est pas compatible avec le village sélectionné.`);
        }

        if (clanKey && secondaryClanKey && clanKey === secondaryClanKey) {
          addError("Le clan secondaire doit être différent du clan principal.");
        }
      }

      if (mode === "hybridVoie") {
        if (!gmOptions.allowHybridVoie) {
          addError("La voie hybridée n’est pas autorisée par le MJ pour cette fiche.");
        }

        if (NARUTO25E.isCustomClanKey?.(clanKey)) {
          validateCustomClan("clan custom principal");
        } else if (!clanKey || !clan) {
          addError("Aucun clan principal n’est sélectionné pour la voie hybridée.");
        } else if (clan.village !== villageKey) {
          addError(`Le clan principal ${clan.label} n’est pas compatible avec le village sélectionné.`);
        }

        if (!voieKey || !voie) {
          addError("Aucune voie n’est sélectionnée pour la voie hybridée.");
        } else {
          const voieAllowed = voie.village === "any" || voie.village === villageKey;

          if (!voie.selectable || !voieAllowed) {
            addError(`La voie ${voie.label} n’est pas compatible avec le village sélectionné.`);
          }
        }
      }

      if (mode === "hiddenClan") {
        if (!hiddenClan.officialClan || !officialHiddenClan) {
          addError("Aucun clan officiel/social n’est sélectionné pour le Clan caché.");
        } else if (officialHiddenClan.village !== villageKey) {
          addError(`Le clan officiel ${officialHiddenClan.label} n’est pas compatible avec le village sélectionné.`);
        }

        if (!hiddenClan.realClan || !realHiddenClan) {
          addError("Aucun Réel Clan n’est sélectionné pour le Clan caché.");
        } else if (realHiddenClan.village !== villageKey) {
          addError(`Le Réel Clan ${realHiddenClan.label} n’est pas compatible avec le village sélectionné.`);
        }

        if (
          hiddenClan.officialClan
          && hiddenClan.realClan
          && hiddenClan.officialClan === hiddenClan.realClan
        ) {
          addError("Le clan officiel et le Réel Clan doivent être différents pour un Clan caché.");
        }

        const rawLineage = Math.max(0, Number(system.bases?.lign?.value ?? 0));
        const effectiveLineage = this._getEffectiveLineageValue();
        const hiddenCap = this._getHiddenClanLineageCap();

        if (hiddenCap !== null && hiddenCap > 0 && rawLineage > hiddenCap) {
          addError(`La Lignée cachée est verrouillée : le score de Lignée ne peut pas dépasser ${hiddenCap} tant que la progression réelle n’est pas débloquée par le MJ.`);
        }

        if (hiddenCap === 0 && effectiveLineage === 0) {
          addWarning("Lignée cachée non éveillée : la Base Lignée brute reste à 1 sur la fiche, mais la Lignée effective est traitée comme 0. Aucun pouvoir de rang 1 n’est accordé.");
        }
      }

      const mechanicalClanKeys = this._getMechanicalClanKeys({ purpose: "requirements" });
      const hasClan = (key) => mechanicalClanKeys.includes(key);

      if (hasClan("kato")) {
        const existingKatoActor = (game.actors ?? []).find((actor) => {
          if (!actor || actor.id === this.id) return false;
          if (actor.type !== "shinobi") return false;

          const actorCreation = actor.system?.progression?.creation ?? {};
          if (!Boolean(actorCreation.locked)) return false;

          if (typeof actor._getMechanicalClanKeys === "function") {
            return actor._getMechanicalClanKeys({ purpose: "requirements" }).includes("kato");
          }

          const actorHeritage = actor.system?.heritage ?? {};
          const actorClan = actorHeritage.clan ?? "";
          const actorSecondaryClan = actorHeritage.hybrid?.secondaryClan ?? "";

          return actorClan === "kato" || actorSecondaryClan === "kato";
        });

        if (existingKatoActor) {
          addError(`Le clan Katō est déjà attribué à ${existingKatoActor.name}, un autre Shinobi validé.`);
        }
      }

      const forcedAffinities = Array.isArray(affinities.forced) ? affinities.forced : [];
      const forcedAffinityKeys = Array.from(new Set(forcedAffinities.map(getForcedAffinityKey).filter(Boolean)));
      const primaryAffinity = affinities.primary ?? "";
      const secondaryAffinity = affinities.secondary ?? "";

      const forcedPrimary = forcedAffinities.find((entry) => getForcedAffinitySlot(entry) === "primary");
      const forcedSecondary = forcedAffinities.find((entry) => getForcedAffinitySlot(entry) === "secondary");

      if (forcedPrimary) {
        const forcedKey = getForcedAffinityKey(forcedPrimary);

        if (primaryAffinity !== forcedKey) {
          addError(`L’affinité principale doit être ${getAffinityLabel(forcedKey)} car elle est imposée par l’héritage.`);
        }
      }

      if (forcedSecondary) {
        const forcedKey = getForcedAffinityKey(forcedSecondary);

        if (secondaryAffinity !== forcedKey) {
          addError(`L’affinité secondaire doit être ${getAffinityLabel(forcedKey)} car elle est imposée par l’héritage.`);
        }
      }

      if (hasClan("uchiha") && primaryAffinity !== "katon") {
        addError("Un Uchiha doit avoir Katon comme affinité principale.");
      }

      if (hasClan("senju")) {
        if (primaryAffinity !== "doton") {
          addError("Un Senju doit avoir Doton comme affinité principale.");
        }

        if (secondaryAffinity !== "suiton") {
          addError("Un Senju doit avoir Suiton comme affinité secondaire.");
        }
      }

      const hasAnyAffinity =
        Boolean(primaryAffinity)
        || Boolean(secondaryAffinity)
        || forcedAffinityKeys.length > 0;

      if (!hasAnyAffinity) {
        addError("Aucune affinité de Chakra n’est sélectionnée.");
      }

      if (primaryAffinity && secondaryAffinity && primaryAffinity === secondaryAffinity) {
        addError("L’affinité secondaire doit être différente de l’affinité principale.");
      }

      if (initialSkillsUsed > maxInitialSkills) {
        addError(`Trop de compétences initiales : ${initialSkillsUsed} / ${maxInitialSkills}.`);
      }

      const xpAvailable = Number(experience.available ?? 0);

      if (xpAvailable < 0) {
        addError(`XP disponible négative : ${xpAvailable}.`);
      }
      const specializationAvailable = Number(chakraSpecializationState.available ?? 0);
      const specializationSpent = Number(chakraSpecializationState.spent ?? 0);

      if (specializationAvailable > 0 && specializationSpent < specializationAvailable) {
        addError("Choisis ta spécialisation de Chakra de départ.");
      }

      if (Boolean(chakraSpecializationState.overLimit)) {
        addError("Trop de spécialisations de Chakra sont sélectionnées.");
      }
      const mainWeaponChoice = String(startingEquipment.mainWeapon ?? "");
      const combatLots = Array.isArray(startingEquipment.combatLots)
        ? startingEquipment.combatLots.filter(Boolean)
        : [];

      const uniqueCombatLots = Array.from(new Set(combatLots));

      if (!NARUTO25E_STARTING_EQUIPMENT.mainWeapons[mainWeaponChoice]) {
        addError("Choisis 1 arme principale dans le paquetage de départ.");
      }

      if (uniqueCombatLots.length !== 2) {
        addError("Choisis exactement 2 lots d’armes de jet ou consommables ninja.");
      }

      for (const lotKey of uniqueCombatLots) {
        if (!NARUTO25E_STARTING_EQUIPMENT.combatLots[lotKey]) {
          addError(`Choix de paquetage invalide : ${lotKey}.`);
        }
      }

      const caseSchoolChoices = Array.isArray(startingTechniques.caseSchool?.choices)
        ? startingTechniques.caseSchool.choices.filter(Boolean)
        : [];

      const specializedChoices = Array.isArray(startingTechniques.specialized?.choices)
        ? startingTechniques.specialized.choices.filter(Boolean)
        : [];

      const uniqueCaseSchoolChoices = Array.from(new Set(caseSchoolChoices));
      const uniqueSpecializedChoices = Array.from(new Set(specializedChoices));

      if (caseSchoolChoices.length !== uniqueCaseSchoolChoices.length) {
        addError("Les techniques cas d’école ne peuvent pas contenir de doublon.");
      }

      if (specializedChoices.length !== uniqueSpecializedChoices.length) {
        addError("Les techniques spécialisées de départ ne peuvent pas contenir de doublon.");
      }

      if (uniqueCaseSchoolChoices.length !== NARUTO25E_STARTING_TECHNIQUES.caseSchool.maxChoices) {
        addError(`Choisis exactement ${NARUTO25E_STARTING_TECHNIQUES.caseSchool.maxChoices} techniques cas d’école.`);
      }

      if (!Boolean(startingTechniques.caseSchool?.completed)) {
        addError("Valide tes techniques cas d’école dans l’étape Équipement.");
      }

      if (uniqueSpecializedChoices.length > NARUTO25E_STARTING_TECHNIQUES.specialized.maxChoices) {
        addError(`Trop de techniques spécialisées de départ : ${uniqueSpecializedChoices.length} / ${NARUTO25E_STARTING_TECHNIQUES.specialized.maxChoices}.`);
      }

      if (!Boolean(startingTechniques.specialized?.completed)) {
        addError("Valide tes techniques spécialisées dans l’étape Équipement, même si tu n’en choisis aucune.");
      }

      const heritageLabel = (() => {
        if (mode === "clan") {
          if (NARUTO25E.isCustomClanKey?.(clanKey)) {
            const customName = String(heritage.customClan?.name ?? "").trim();
            return customName ? `Clan custom ${customName}` : "Clan custom non nommé";
          }

          return clan?.label ? `Clan ${clan.label}` : "Clan non sélectionné";
        }

        if (mode === "voie") return voie?.label ?? "Voie non sélectionnée";
        if (mode === "hybridClan") {
          const clanLabel = NARUTO25E.isCustomClanKey?.(clanKey)
            ? String(heritage.customClan?.name ?? "").trim() || "Clan custom non nommé"
            : clan?.label ?? "Clan ?";

          return `${clanLabel} / ${secondaryClan?.label ?? "Clan secondaire ?"}`;
        }
        if (mode === "hybridVoie") {
          const clanLabel = NARUTO25E.isCustomClanKey?.(clanKey)
            ? String(heritage.customClan?.name ?? "").trim() || "Clan custom non nommé"
            : clan?.label ?? "Clan ?";

          return `${clanLabel} / ${voie?.label ?? "Voie ?"}`;
        }

        if (mode === "hiddenClan") {
          const officialLabel = officialHiddenClan?.label ?? "Clan officiel ?";
          const realLabel = realHiddenClan?.label ?? "Réel Clan ?";
          return `Clan officiel ${officialLabel} / Réel Clan ${realLabel}`;
        }

        return "Héritage non défini";
      })();

      const affinityLabels = [];

      for (const entry of forcedAffinities) {
        const key = getForcedAffinityKey(entry);
        if (!key) continue;

        const slot = getForcedAffinitySlot(entry);
        const slotLabel = slot === "primary"
          ? "principale"
          : slot === "secondary"
          ? "secondaire"
          : "imposée";

        affinityLabels.push(`${getAffinityLabel(key)} ${slotLabel} imposée`);
      }

      if (primaryAffinity && !forcedAffinityKeys.includes(primaryAffinity)) {
        affinityLabels.push(`${getAffinityLabel(primaryAffinity)} principale`);
      }

      if (secondaryAffinity && !forcedAffinityKeys.includes(secondaryAffinity)) {
        affinityLabels.push(`${getAffinityLabel(secondaryAffinity)} secondaire`);
      }

      if (mechanicalClanKeys.length > 0) {
        if (hasClan("uchiha")) {
          addWarning("Uchiha : les pouvoirs du Mangekyō peuvent nécessiter une validation narrative, une santé oculaire suivie et des choix d’œil cohérents.");
        }

        if (hasClan("senju")) {
          addWarning("Senju : Mokuton impose Doton et Suiton. Le personnage n’a pas de choix libre d’affinité naturelle au départ.");
        }

        if (hasClan("aburame")) {
          addWarning("Aburame : une part du Chakra brut est allouée aux Kikaichū. Un faible COR/ESP peut fortement réduire le Chakra général disponible.");
        }

        if (hasClan("nara")) {
          addWarning("Nara : Pouvoir des Ombres est un passif. Kagemane et Kage Nui seront traités plus tard comme techniques de clan.");
        }

        if (hasClan("hyuga")) {
          addWarning("Hyūga : Jūken et Byakugan structurent fortement le style de combat. Les greffes et cas particuliers seront gérés plus tard.");
        }

        if (hasClan("kato")) {
          addWarning("Katō : ce clan est limité à un seul Shinobi joueur validé dans ce monde.");
        }

        if (hasClan("inuzuka")) {
          addWarning("Inuzuka : le compagnon ou gardien canin est préparé comme passif, mais la fiche compagnon complète viendra plus tard.");
        }
      }

      if (xpAvailable > 0) {
        addWarning(`Il reste ${xpAvailable} XP disponible(s) à la création.`);
      }

      if (initialSkillsUsed === maxInitialSkills) {
        addWarning("Les compétences initiales sont au maximum autorisé.");
      }

      if (initialSkillsUsed === maxInitialSkills - 1) {
        addWarning("Il ne reste qu’une compétence initiale disponible.");
      }

      if (!String(system.identity?.prenom ?? "").trim()) {
        addWarning("Le surnom Shinobi est vide.");
      }

      return {
        valid: errors.length === 0,
        errors,
        warnings,
        summary: {
          village: village?.label ?? "—",
          status: NARUTO25E.villageStatuses?.[heritage.villageStatus ?? "loyal"] ?? "—",
          heritage: heritageLabel,
          heritageMode: NARUTO25E.heritageModes?.[mode] ?? mode,
          affinities: affinityLabels.length > 0 ? affinityLabels : ["—"],
          initialSkillsUsed,
          maxInitialSkills,
          initialSkillsRemaining: Math.max(0, maxInitialSkills - initialSkillsUsed),
          xpAvailable
        }
      };
    }

    _getStartingEquipmentItemNames() {
      const creation = this.system.progression?.creation ?? {};
      const startingEquipment = creation.startingEquipment ?? {};
      const mainWeaponKey = String(startingEquipment.mainWeapon ?? "");
      const combatLotKeys = Array.isArray(startingEquipment.combatLots)
        ? Array.from(new Set(startingEquipment.combatLots.filter(Boolean)))
        : [];

      const itemNames = [];

      const mainWeaponName = NARUTO25E_STARTING_EQUIPMENT.mainWeapons[mainWeaponKey];
      if (mainWeaponName) itemNames.push(mainWeaponName);

      for (const lotKey of combatLotKeys) {
        const lotName = NARUTO25E_STARTING_EQUIPMENT.combatLots[lotKey];
        if (lotName) itemNames.push(lotName);
      }

      itemNames.push(...NARUTO25E_STARTING_EQUIPMENT.fixed);

      return Array.from(new Set(itemNames));
    }

    async _getStartingEquipmentDocumentsFromPack(itemNames) {
      const pack = game.packs.get("naruto-25e.equipements-depart");

      if (!pack) return [];

      const index = await pack.getIndex({
        fields: ["name", "type"]
      });

      const documents = [];

      for (const itemName of itemNames) {
        const entry = index.find((document) => document.name === itemName);

        if (!entry) continue;

        const document = await pack.getDocument(entry._id);
        if (document) documents.push(document);
      }

      return documents;
    }

    async _getStartingEquipmentDocumentsFromJson(itemNames) {
      const path = "systems/naruto-25e/data/equipements/equipements-depart.json";

      try {
        const response = await fetch(path);

        if (!response.ok) {
          console.warn(`Naruto 2.5e | Impossible de lire ${path} (${response.status}).`);
          return [];
        }

        const json = await response.json();
        const sourceItems = Array.isArray(json) ? json : [];

        return sourceItems
          .filter((item) => itemNames.includes(item.name))
          .map((item) => foundry.utils.deepClone(item));
      } catch (error) {
        console.warn("Naruto 2.5e | Lecture JSON équipement de départ impossible.", error);
        return [];
      }
    }

    _getCreationGrantedEmbeddedItems(packageKey = "") {
      return this.items.filter((item) => {
        const grantedAtCreation = item.getFlag?.("naruto-25e", "grantedAtCreation") === true;

        if (!grantedAtCreation) return false;
        if (!packageKey) return true;

        return item.getFlag?.("naruto-25e", "creationPackage") === packageKey;
      });
    }

    _hasCreationEquipmentAlreadyGranted() {
      return this._getCreationGrantedEmbeddedItems("startingEquipment").length > 0;
    }

    _hasCreationStartingTechniquesAlreadyGranted() {
      return this._getCreationGrantedEmbeddedItems("startingTechniques").length > 0;
    }

    _hasCreationInventoryItemsAlreadyGranted() {
      const inventoryItems = this.system.inventory?.items ?? [];

      return inventoryItems.some((item) => {
        return item.creationGranted === true
          || item.grantedAtCreation === true
          || item.creationPackage === "startingEquipment"
          || item.flags?.["naruto-25e"]?.grantedAtCreation === true;
      });
    }

    _hasExpectedStartingEquipmentInventoryItems() {
      const expectedNames = this._getStartingEquipmentItemNames();
      const inventoryItems = this.system.inventory?.items ?? [];

      if (expectedNames.length === 0) return false;

      const existingNames = new Set(
        inventoryItems
          .map((item) => String(item.name ?? "").trim())
          .filter(Boolean)
      );

      return expectedNames.every((itemName) => existingNames.has(itemName));
    }

    _getCreationInventoryEntryFromDocument(itemDocument, options = {}) {
      const inventoryItem = this._getInventoryItemDataFromDocument(itemDocument);

      inventoryItem.sourceItemId = itemDocument.id ?? inventoryItem.sourceItemId ?? "";
      inventoryItem.sourceItemUuid = itemDocument.uuid ?? inventoryItem.sourceItemUuid ?? "";
      inventoryItem.creationGranted = true;
      inventoryItem.grantedAtCreation = true;
      inventoryItem.creationPackage = "startingEquipment";
      inventoryItem.grantedAt = options.grantedAt ?? "";
      inventoryItem.grantedBy = options.grantedBy ?? "";
      inventoryItem.notes = inventoryItem.notes || "Paquetage de départ du Shinobimancer.";

      inventoryItem.flags = foundry.utils.mergeObject(inventoryItem.flags ?? {}, {
        "naruto-25e": {
          grantedAtCreation: true,
          creationPackage: "startingEquipment",
          sourceItemId: inventoryItem.sourceItemId,
          sourceItemUuid: inventoryItem.sourceItemUuid,
          grantedAt: inventoryItem.grantedAt,
          grantedBy: inventoryItem.grantedBy
        }
      }, {
        inplace: false,
        overwrite: true,
        insertKeys: true,
        insertValues: true
      });

      return inventoryItem;
    }

    async grantStartingEquipment() {
      if (this.type !== "shinobi") return false;

      const creation = this.system.progression?.creation ?? {};
      const startingEquipment = creation.startingEquipment ?? {};
      const existingEmbeddedItems = this._getCreationGrantedEmbeddedItems("startingEquipment");
      const hasCustomInventoryItems = this._hasCreationInventoryItemsAlreadyGranted();
      const hasExpectedInventoryItems = this._hasExpectedStartingEquipmentInventoryItems();

      const markStartingEquipmentGranted = async () => {
        if (startingEquipment.granted) return;

        await this.update({
          "system.progression.creation.startingEquipment.granted": true,
          "system.progression.creation.startingEquipment.grantedAt": startingEquipment.grantedAt || new Date().toISOString(),
          "system.progression.creation.startingEquipment.grantedBy": startingEquipment.grantedBy || game.user?.name || ""
        });
      };

      if (hasCustomInventoryItems || hasExpectedInventoryItems) {
        await markStartingEquipmentGranted();

        ui.notifications.info("Le paquetage de départ est déjà présent dans l’inventaire.");
        console.info("Naruto 2.5e | Paquetage déjà détecté dans l’inventaire custom, aucune attribution supplémentaire.", {
          actor: this.name,
          hasCustomInventoryItems,
          hasExpectedInventoryItems,
          embeddedCount: existingEmbeddedItems.length
        });
        return true;
      }

      if (startingEquipment.granted && existingEmbeddedItems.length === 0 && !hasCustomInventoryItems && !hasExpectedInventoryItems) {
        ui.notifications.warn("Le paquetage est marqué comme déjà attribué, mais aucun item n’a été trouvé. Déverrouillage de sécurité : aucune nouvelle attribution automatique.");
        console.warn("Naruto 2.5e | Paquetage marqué attribué sans miroir trouvé.", {
          actor: this.name,
          startingEquipment
        });
        return true;
      }

      const itemNames = this._getStartingEquipmentItemNames();

      if (itemNames.length === 0) {
        ui.notifications.warn("Aucun équipement de départ à attribuer.");
        console.warn("Naruto 2.5e | Paquetage demandé vide.", {
          actor: this.name,
          startingEquipment
        });
        return false;
      }

      let sourceDocuments = await this._getStartingEquipmentDocumentsFromJson(itemNames);

      const missingAfterJson = itemNames.filter((itemName) => {
        return !sourceDocuments.some((document) => document.name === itemName);
      });

      if (missingAfterJson.length > 0) {
        const packDocuments = await this._getStartingEquipmentDocumentsFromPack(missingAfterJson);
        sourceDocuments = [...sourceDocuments, ...packDocuments];
      }

      const missingAfterFallback = itemNames.filter((itemName) => {
        return !sourceDocuments.some((document) => document.name === itemName);
      });

      if (missingAfterFallback.length > 0) {
        ui.notifications.warn(`Équipement de départ introuvable : ${missingAfterFallback.join(", ")}.`);
        console.warn("Naruto 2.5e | Équipement de départ introuvable.", {
          actor: this.name,
          requested: itemNames,
          found: sourceDocuments.map((document) => document.name),
          missing: missingAfterFallback
        });
        return false;
      }

      const grantedAt = new Date().toISOString();
      const grantedBy = game.user?.name ?? "";

      let createdItems = existingEmbeddedItems;

      if (createdItems.length === 0) {
        const documentsToCreate = sourceDocuments.map((document) => {
          const raw = typeof document.toObject === "function"
            ? document.toObject()
            : foundry.utils.deepClone(document);

          return {
            name: raw.name,
            type: raw.type,
            img: raw.img ?? "icons/svg/item-bag.svg",
            system: foundry.utils.deepClone(raw.system ?? {}),
            flags: {
              "naruto-25e": {
                grantedAtCreation: true,
                creationPackage: "startingEquipment",
                grantedAt,
                grantedBy
              }
            }
          };
        });

        console.groupCollapsed(`Naruto 2.5e | Attribution paquetage de départ — ${this.name}`);
        console.info("Items demandés :", itemNames);
        console.info("Documents trouvés :", sourceDocuments.map((document) => document.name));
        console.table(documentsToCreate.map((document) => ({
          name: document.name,
          type: document.type,
          quantity: document.system?.quantity ?? 1
        })));
        console.groupEnd();

        try {
          createdItems = await this.createEmbeddedDocuments("Item", documentsToCreate);
        } catch (error) {
          console.error("Naruto 2.5e | Attribution du paquetage de départ impossible.", error);
          ui.notifications.error("Erreur pendant l’attribution du paquetage de départ. Voir la console.");
          return false;
        }

        if (!createdItems || createdItems.length === 0) {
          ui.notifications.warn("Aucun item de paquetage n’a été créé.");
          console.warn("Naruto 2.5e | createEmbeddedDocuments a retourné 0 item.", {
            actor: this.name,
            documentsToCreate
          });
          return false;
        }
      } else {
        console.info(`Naruto 2.5e | Paquetage embedded déjà présent pour ${this.name}, création miroir inventaire custom.`);
      }

      if (!hasCustomInventoryItems) {
        const inventoryItems = foundry.utils.deepClone(this.system.inventory?.items ?? []);
        const existingCreationItemNames = new Set(
          inventoryItems
            .filter((item) => item.creationPackage === "startingEquipment" || item.creationGranted === true)
            .map((item) => item.name)
        );

        const inventoryEntries = createdItems
          .filter((item) => !existingCreationItemNames.has(item.name))
          .map((item, index) => {
            const entry = this._getCreationInventoryEntryFromDocument(item, {
              grantedAt,
              grantedBy
            });

            entry.sort = inventoryItems.length + index;

            return entry;
          });

        if (inventoryEntries.length === 0) {
          ui.notifications.warn("Aucune entrée d’inventaire custom n’a été créée pour le paquetage.");
          console.warn("Naruto 2.5e | Miroir inventaire custom vide.", {
            actor: this.name,
            createdItems: createdItems.map((item) => item.name),
            inventoryItems
          });
          return false;
        }

        await this.update({
          "system.inventory.items": inventoryItems.concat(inventoryEntries)
        });

        console.groupCollapsed(`Naruto 2.5e | Miroir inventaire custom — ${this.name}`);
        console.table(inventoryEntries.map((item) => ({
          name: item.name,
          type: item.type,
          quantity: item.quantity,
          sourceItemId: item.sourceItemId
        })));
        console.groupEnd();
      }

      await this.update({
        "system.progression.creation.startingEquipment.granted": true,
        "system.progression.creation.startingEquipment.grantedAt": grantedAt,
        "system.progression.creation.startingEquipment.grantedBy": grantedBy
      });

      ui.notifications.info(`Paquetage de départ attribué à ${this.name} : ${createdItems.length} item(s), inventaire synchronisé.`);

      return true;
    }

    _getStartingTechniqueChoiceKeys() {
      const startingTechniques = this.system.progression?.creation?.startingTechniques ?? {};
      const caseSchoolChoices = Array.isArray(startingTechniques.caseSchool?.choices)
        ? startingTechniques.caseSchool.choices
        : [];
      const specializedChoices = Array.isArray(startingTechniques.specialized?.choices)
        ? startingTechniques.specialized.choices
        : [];

      return Array.from(new Set(
        caseSchoolChoices
          .concat(specializedChoices)
          .map((choice) => String(choice ?? ""))
          .filter(Boolean)
      ));
    }

    async _getStartingTechniqueDocumentsFromChoices(choiceKeys) {
      const documents = [];
      const foundKeys = new Set();
      const techniquePackKeys = [
        "naruto-25e.techniques-communes",
        "naruto-25e.techniques-ninjutsu",
        "naruto-25e.techniques-genjutsu",
        "naruto-25e.techniques-taijutsu",
        "naruto-25e.techniques-armes",
        "naruto-25e.techniques-lignees"
      ];

      for (const choiceKey of choiceKeys) {
        if (!String(choiceKey).startsWith("Compendium.")) continue;

        try {
          const document = await fromUuid(choiceKey);

          if (!document || document.type !== "technique") continue;

          documents.push(document);
          foundKeys.add(choiceKey);
        } catch (error) {
          console.warn(`Naruto 2.5e | Technique de départ introuvable via UUID : ${choiceKey}`, error);
        }
      }

      const missingNameChoices = choiceKeys.filter((choiceKey) => {
        return !foundKeys.has(choiceKey) && !String(choiceKey).startsWith("Compendium.");
      });

      if (missingNameChoices.length === 0) {
        return documents;
      }

      for (const packKey of techniquePackKeys) {
        const pack = game.packs.get(packKey);
        if (!pack) continue;

        const index = await pack.getIndex({
          fields: ["name", "type"]
        });

        for (const choiceName of missingNameChoices) {
          if (foundKeys.has(choiceName)) continue;

          const entry = index.find((document) => {
            return document.type === "technique" && document.name === choiceName;
          });

          if (!entry) continue;

          const document = await pack.getDocument(entry._id);

          if (!document || document.type !== "technique") continue;

          documents.push(document);
          foundKeys.add(choiceName);
        }
      }

      return documents;
    }

    async grantStartingTechniques() {
      if (this.type !== "shinobi") return false;

      const creation = this.system.progression?.creation ?? {};
      const startingTechniques = creation.startingTechniques ?? {};
      const choiceKeys = this._getStartingTechniqueChoiceKeys();

      const markStartingTechniquesGranted = async () => {
        if (startingTechniques.granted) return;

        await this.update({
          "system.progression.creation.startingTechniques.granted": true,
          "system.progression.creation.startingTechniques.grantedAt": startingTechniques.grantedAt || new Date().toISOString(),
          "system.progression.creation.startingTechniques.grantedBy": startingTechniques.grantedBy || game.user?.name || ""
        });
      };

      if (choiceKeys.length === 0) {
        ui.notifications.warn("Aucune technique de départ à attribuer.");
        console.warn("Naruto 2.5e | Techniques de départ demandées vides.", {
          actor: this.name,
          startingTechniques
        });
        return false;
      }

      if (this._hasCreationStartingTechniquesAlreadyGranted()) {
        await markStartingTechniquesGranted();

        ui.notifications.info("Les techniques de départ sont déjà présentes sur la fiche.");
        console.info("Naruto 2.5e | Techniques de départ déjà détectées, aucune attribution supplémentaire.", {
          actor: this.name,
          choiceKeys
        });
        return true;
      }

      if (startingTechniques.granted && !this._hasCreationStartingTechniquesAlreadyGranted()) {
        ui.notifications.warn("Les techniques de départ sont marquées comme déjà attribuées, mais aucun item n’a été trouvé. Aucune nouvelle attribution automatique.");
        console.warn("Naruto 2.5e | Techniques marquées attribuées sans item trouvé.", {
          actor: this.name,
          startingTechniques
        });
        return true;
      }

      const sourceDocuments = await this._getStartingTechniqueDocumentsFromChoices(choiceKeys);
      const foundChoiceNames = new Set(sourceDocuments.map((document) => document.name));
      const missingChoices = choiceKeys.filter((choiceKey) => {
        if (String(choiceKey).startsWith("Compendium.")) {
          return !sourceDocuments.some((document) => document.uuid === choiceKey);
        }

        return !foundChoiceNames.has(choiceKey);
      });

      if (missingChoices.length > 0) {
        ui.notifications.warn(`Technique(s) de départ introuvable(s) : ${missingChoices.join(", ")}.`);
        console.warn("Naruto 2.5e | Techniques de départ introuvables.", {
          actor: this.name,
          requested: choiceKeys,
          found: sourceDocuments.map((document) => ({
            name: document.name,
            uuid: document.uuid
          })),
          missing: missingChoices
        });
        return false;
      }

      const grantedAt = new Date().toISOString();
      const grantedBy = game.user?.name ?? "";
      const existingTechniqueNames = new Set(
        this.items
          .filter((item) => item.type === "technique")
          .map((item) => item.name)
      );

      const documentsToCreate = sourceDocuments
        .filter((document) => !existingTechniqueNames.has(document.name))
        .map((document) => {
          const raw = typeof document.toObject === "function"
            ? document.toObject()
            : foundry.utils.deepClone(document);

          return {
            name: raw.name,
            type: raw.type,
            img: raw.img ?? "icons/svg/item-bag.svg",
            system: foundry.utils.deepClone(raw.system ?? {}),
            flags: {
              "naruto-25e": {
                grantedAtCreation: true,
                creationPackage: "startingTechniques",
                sourceItemUuid: document.uuid ?? "",
                grantedAt,
                grantedBy
              }
            }
          };
        });

      if (documentsToCreate.length === 0) {
        await this.update({
          "system.progression.creation.startingTechniques.granted": true,
          "system.progression.creation.startingTechniques.grantedAt": grantedAt,
          "system.progression.creation.startingTechniques.grantedBy": grantedBy
        });

        ui.notifications.info("Toutes les techniques de départ étaient déjà présentes sur la fiche.");
        return true;
      }

      console.groupCollapsed(`Naruto 2.5e | Attribution techniques de départ — ${this.name}`);
      console.info("Choix demandés :", choiceKeys);
      console.info("Documents trouvés :", sourceDocuments.map((document) => document.name));
      console.table(documentsToCreate.map((document) => ({
        name: document.name,
        type: document.type,
        rank: document.system?.rank ?? "",
        level: document.system?.level ?? 1,
        skill: document.system?.skill ?? ""
      })));
      console.groupEnd();

      try {
        const createdItems = await this.createEmbeddedDocuments("Item", documentsToCreate);

        if (!createdItems || createdItems.length === 0) {
          ui.notifications.warn("Aucune technique de départ n’a été créée.");
          console.warn("Naruto 2.5e | createEmbeddedDocuments a retourné 0 technique.", {
            actor: this.name,
            documentsToCreate
          });
          return false;
        }

        await this.update({
          "system.progression.creation.startingTechniques.granted": true,
          "system.progression.creation.startingTechniques.grantedAt": grantedAt,
          "system.progression.creation.startingTechniques.grantedBy": grantedBy
        });

        ui.notifications.info(`Techniques de départ attribuées à ${this.name} : ${createdItems.length} technique(s).`);

        return true;
      } catch (error) {
        console.error("Naruto 2.5e | Attribution des techniques de départ impossible.", error);
        ui.notifications.error("Erreur pendant l’attribution des techniques de départ. Voir la console.");
        return false;
      }
    }

    async validateCreation() {
      if (this.type !== "shinobi") return;

      if (this.isCreationLocked()) {
        ui.notifications.warn("Cette création est déjà validée.");
        return;
      }

      if (!this.isOwner && !game.user.isGM) {
        ui.notifications.warn("Tu n’as pas les droits nécessaires pour valider ce dossier.");
        return;
      }

      const validation = this.getCreationValidationSummary();

      if (!validation.valid) {
        const errorList = validation.errors.map((error) => `<li>${error}</li>`).join("");

        await Dialog.alert({
          title: "Création invalide",
          content: `
            <p>La création de <strong>${this.name}</strong> ne peut pas encore être validée.</p>
            <p>Corrige les erreurs bloquantes suivantes :</p>
            <ul>${errorList}</ul>
          `
        });

        return;
      }

      const warningList = validation.warnings.length > 0
        ? `
          <p>Le dossier contient aussi des avertissements non bloquants :</p>
          <ul>${validation.warnings.map((warning) => `<li>${warning}</li>`).join("")}</ul>
        `
        : "";

      const confirmed = await Dialog.confirm({
        title: "Valider le dossier de Shinobi",
        content: `
          <p>Valider définitivement le dossier de <strong>${this.name}</strong> ?</p>
          <p>Le sceau officiel sera apposé et les choix fondateurs seront verrouillés.</p>
          <ul>
            <li>Village, statut, clan, voie, hybridation</li>
            <li>Nindō narratif</li>
            <li>Compétences initiales</li>
            <li>Affinités de Chakra futures</li>
            <li>Paquetage et techniques de départ</li>
          </ul>
          ${warningList}
        `,
        yes: () => true,
        no: () => false,
        defaultYes: false
      });

      if (!confirmed) return;

      const equipmentGranted = await this.grantStartingEquipment();

      if (!equipmentGranted && !this.system.progression?.creation?.startingEquipment?.granted && !this._hasCreationEquipmentAlreadyGranted()) {
        ui.notifications.warn("Validation interrompue : le paquetage de départ n’a pas pu être attribué.");
        return;
      }

      const startingTechniquesGranted = await this.grantStartingTechniques();

      if (!startingTechniquesGranted && !this.system.progression?.creation?.startingTechniques?.granted && !this._hasCreationStartingTechniquesAlreadyGranted()) {
        ui.notifications.warn("Validation interrompue : les techniques de départ n’ont pas pu être attribuées.");
        return;
      }

      await this.update({
        "system.progression.creation.locked": true,
        "system.progression.creation.validatedAt": new Date().toISOString(),
        "system.progression.creation.validatedBy": game.user.name,
        "system.progression.creation.currentStep": "summary"
      }, {
        naruto25e: {
          allowCreationLockUpdate: true
        }
      });

      ui.notifications.info(`Dossier de Shinobi validé pour ${this.name}.`);
    }

    async finalizeCreation() {
      return this.validateCreation();
    }

    async unlockCreation() {
      if (this.type !== "shinobi") return;

      if (!game.user.isGM) {
        ui.notifications.warn("Seul le MJ peut déverrouiller la création.");
        return;
      }

      const confirmed = await Dialog.confirm({
        title: "Déverrouiller la création",
        content: `
          <p>Déverrouiller la création de <strong>${this.name}</strong> ?</p>
          <p>Les joueurs pourront à nouveau modifier les choix fondateurs.</p>
        `,
        yes: () => true,
        no: () => false,
        defaultYes: false
      });

      if (!confirmed) return;

      await this.update({
        "system.progression.creation.locked": false
      });

      ui.notifications.info(`Création déverrouillée pour ${this.name}.`);
    }

    _getActiveNindoChakraBoostAmount(system = this.system) {
      const boost = system.nindo?.activeEffects?.chakraBoost ?? {};

      if (!Boolean(boost.active)) return 0;
      if (Number(boost.remainingTurns ?? 0) <= 0) return 0;

      return Math.max(0, Number(boost.amount ?? 0));
    }

    _getNindoChakraBoostEndData(system = this.system) {
      const boost = system.nindo?.activeEffects?.chakraBoost ?? {};
      const active = Boolean(boost.active) && Number(boost.remainingTurns ?? 0) > 0;
      const amount = Math.max(0, Number(boost.amount ?? 0));
      const chakra = system.resources?.chakra ?? {};
      const currentChakra = Math.max(0, Number(chakra.value ?? 0));
      const effectiveMax = Math.max(0, Number(chakra.max ?? 0));
      const naturalMax = Math.max(0, Number(chakra.naturalMax ?? Math.max(0, effectiveMax - amount)));

      if (!active || amount <= 0) {
        return {
          active: false,
          amount,
          currentChakra,
          naturalMax,
          storedChakraBeforeGain: Math.min(currentChakra, naturalMax),
          nextChakra: Math.min(currentChakra, naturalMax)
        };
      }

      const hasStoredValue = boost.storedChakraBeforeGain !== undefined
        && boost.storedChakraBeforeGain !== null
        && boost.storedChakraBeforeGain !== "";

      const storedChakraBeforeGain = hasStoredValue
        ? Math.max(0, Number(boost.storedChakraBeforeGain ?? 0))
        : Math.min(currentChakra, naturalMax);

      const nextChakra = Math.max(
        0,
        Math.min(
          currentChakra,
          storedChakraBeforeGain,
          naturalMax
        )
      );

      return {
        active: true,
        amount,
        currentChakra,
        naturalMax,
        storedChakraBeforeGain,
        nextChakra
      };
    }

    _getInactiveNindoChakraBoostData() {
      return {
        active: false,
        remainingTurns: 0,
        amount: 0,
        storedChakraBeforeGain: 0,
        startedRound: 0,
        startedTurn: 0
      };
    }

    _getInactiveNindoOpportunityData() {
      return {
        available: false,
        source: "",
        createdRound: 0,
        createdTurn: 0,
        consumedRound: 0,
        consumedTurn: 0
      };
    }

    _getActiveNindoOpportunityData(system = this.system) {
      const opportunity = system.nindo?.activeEffects?.opportunity ?? {};

      return {
        available: Boolean(opportunity.available),
        source: String(opportunity.source ?? ""),
        createdRound: Math.max(0, Number(opportunity.createdRound ?? 0)),
        createdTurn: Math.max(0, Number(opportunity.createdTurn ?? 0)),
        consumedRound: Math.max(0, Number(opportunity.consumedRound ?? 0)),
        consumedTurn: Math.max(0, Number(opportunity.consumedTurn ?? 0))
      };
    }

    _getTemporaryChakraBonusBreakdown(system = this.system) {
      const nindoBoost = this._getActiveNindoChakraBoostAmount(system);
      const mangekyoMode = this._getMangekyoChakraBonusMode();
      const mangekyoBonus = mangekyoMode === "active"
        ? this._getMangekyoChakraBonusForPrepare()
        : 0;

      const sources = [];

      if (nindoBoost > 0) {
        sources.push({
          key: "nindoChakraBoost",
          label: "Accroissement du Chakra",
          amount: nindoBoost
        });
      }

      if (mangekyoBonus > 0) {
        sources.push({
          key: "mangekyoActive",
          label: "Mangekyō Sharingan actif",
          amount: mangekyoBonus
        });
      }

      return {
        total: nindoBoost + mangekyoBonus,
        nindoBoost,
        mangekyoBonus,
        sources
      };
    }

    _getCombatActionState() {
      return this.system.combat?.actions ?? {};
    }

    _buildCombatActionNotes(currentNotes = "", addedNote = "") {
      const current = String(currentNotes ?? "").trim();
      const added = String(addedNote ?? "").trim();

      if (!added) return current;
      if (!current) return added;

      return `${current} | ${added}`;
    }

    _getInactiveNindoAwakeningData() {
      return {
        active: false,
        actionsRemaining: 0,
        maxActions: 0,
        actionsSpent: 0,
        bonus: 0,
        startedRound: 0,
        startedTurn: 0,
        startedCombatantId: "",
        expiresAtNextOwnTurn: true
      };
    }

    _getNindoAwakeningState(system = this.system) {
      const awakening = system.nindo?.activeEffects?.awakening ?? {};
      const active = Boolean(awakening.active);
      const actionsRemaining = Math.max(0, Number(awakening.actionsRemaining ?? 0));

      return {
        active,
        actionsRemaining,
        maxActions: Math.max(0, Number(awakening.maxActions ?? 3)),
        actionsSpent: Math.max(0, Number(awakening.actionsSpent ?? 0)),
        bonus: active && actionsRemaining > 0
          ? Math.max(10, Number(awakening.bonus ?? 10))
          : 0,
        startedRound: Math.max(0, Number(awakening.startedRound ?? 0)),
        startedTurn: Math.max(0, Number(awakening.startedTurn ?? 0)),
        startedCombatantId: String(awakening.startedCombatantId ?? ""),
        expiresAtNextOwnTurn: awakening.expiresAtNextOwnTurn !== false
      };
    }

    _consumeNindoAwakeningRollBonus() {
      const bonus = Math.max(0, Number(this._naruto25ePendingAwakeningRollBonus ?? 0));

      this._naruto25ePendingAwakeningRollBonus = 0;

      return bonus;
    }

    _canSpendNindoAwakeningAction() {
      const awakening = this._getNindoAwakeningState();

      return Boolean(awakening.active) && awakening.actionsRemaining > 0;
    }

    async _confirmSpendNindoAwakeningAction(label = "Action", actionType = "complex") {
      const awakening = this._getNindoAwakeningState();
      const safeLabel = foundry.utils.escapeHTML?.(label) ?? label;
      const typeLabel = actionType === "lineage"
        ? "action de lignée"
        : actionType === "delayed"
        ? "action retardée"
        : "action complexe";

      return Dialog.confirm({
        title: "Utiliser une action d’Éveil ?",
        content: `
          <p><strong>${foundry.utils.escapeHTML?.(this.name) ?? this.name}</strong> n’a plus l’action normale nécessaire.</p>
          <p>Utiliser <strong>1 action d’Éveil</strong> pour : <strong>${safeLabel}</strong> ?</p>
          <p>Type : ${typeLabel}. Actions d’Éveil restantes : <strong>${awakening.actionsRemaining}</strong>.</p>
        `,
        yes: () => true,
        no: () => false,
        defaultYes: true
      });
    }

    async spendNindoAwakeningAction(label = "Action", options = {}) {
      if (this.type !== "shinobi") return false;

      const awakening = this._getNindoAwakeningState();
      const notify = options.notify !== false;
      const actionType = String(options.actionType ?? "complex");

      if (!awakening.active || awakening.actionsRemaining <= 0) {
        if (notify) ui.notifications.warn(`${this.name} n’a plus d’action d’Éveil disponible.`);
        return false;
      }

      if (options.confirm !== false) {
        const confirmed = await this._confirmSpendNindoAwakeningAction(label, actionType);

        if (!confirmed) return false;
      }

      const nextRemaining = Math.max(0, awakening.actionsRemaining - 1);
      const nextSpent = awakening.actionsSpent + 1;
      const note = this._buildCombatActionNotes(
        this.system.combat?.actions?.notes,
        `${label} : action d’Éveil utilisée`
      );

      await this.update({
        "system.nindo.activeEffects.awakening.active": true,
        "system.nindo.activeEffects.awakening.actionsRemaining": nextRemaining,
        "system.nindo.activeEffects.awakening.maxActions": awakening.maxActions || 3,
        "system.nindo.activeEffects.awakening.actionsSpent": nextSpent,
        "system.nindo.activeEffects.awakening.bonus": awakening.bonus,
        "system.nindo.activeEffects.awakening.startedRound": awakening.startedRound,
        "system.nindo.activeEffects.awakening.startedTurn": awakening.startedTurn,
        "system.nindo.activeEffects.awakening.startedCombatantId": awakening.startedCombatantId,
        "system.nindo.activeEffects.awakening.expiresAtNextOwnTurn": awakening.expiresAtNextOwnTurn,
        "system.combat.actions.notes": note
      }, {
        naruto25e: {
          allowNindoActionUpdate: true
        }
      });

      this._naruto25ePendingAwakeningRollBonus = Math.max(10, Number(awakening.bonus ?? 10));

      await ChatMessage.create({
        speaker: ChatMessage.getSpeaker({ actor: this }),
        content: `
          <div class="naruto-roll-card nindo-card">
            <h2>Action d’Éveil utilisée</h2>
            <p><strong>${foundry.utils.escapeHTML?.(this.name) ?? this.name}</strong> dépense 1 action d’Éveil.</p>
            <p><strong>Action :</strong> ${foundry.utils.escapeHTML?.(label) ?? label}</p>
            <p><strong>Actions d’Éveil restantes :</strong> ${nextRemaining} / ${awakening.maxActions || 3}</p>
          </div>
        `
      });

      if (notify) {
        ui.notifications.info(`${this.name} : action d’Éveil consommée (${nextRemaining}/${awakening.maxActions || 3}).`);
      }

      return true;
    }

    async spendCombatAction(actionType = "complex", label = "Action", options = {}) {
      if (this.type !== "shinobi") return false;

      const type = String(actionType ?? "complex");
      const free = type === "free";

      if (free) {
        return true;
      }

      const actions = this._getCombatActionState();
      const updateData = {};
      const note = this._buildCombatActionNotes(
        actions.notes,
        `${label} : ${type === "simple" ? "action simple" : "action complexe"} utilisée`
      );

      if (type === "simple") {
        if (!Boolean(actions.simpleAvailable)) {
          ui.notifications.warn(`${this.name} n’a plus d’action simple disponible.`);
          return false;
        }

        updateData["system.combat.actions.simpleAvailable"] = false;
        updateData["system.combat.actions.notes"] = note;
      } else if (type === "complex") {
        if (!Boolean(actions.complexAvailable)) {
          if (Boolean(actions.delayedAvailable)) {
            return this.spendDelayedAction(label, {
              notify: options.notify
            });
          }

          return this.spendNindoAwakeningAction(label, {
            actionType: "complex",
            confirm: options.confirmAwakening !== false,
            notify: options.notify
          });
        }

        updateData["system.combat.actions.complexAvailable"] = false;
        updateData["system.combat.actions.notes"] = note;
      } else {
        ui.notifications.warn(`Type d’action inconnu : ${type}.`);
        return false;
      }

      await this.update(updateData);

      if (options.notify !== false) {
        ui.notifications.info(`${this.name} : ${type === "simple" ? "action simple" : "action complexe"} consommée.`);
      }

      return true;
    }

    async spendDelayedAction(label = "Action retardée", options = {}) {
      if (this.type !== "shinobi") return false;

      const actions = this._getCombatActionState();

      if (!Boolean(actions.delayedAvailable)) {
        ui.notifications.warn(`${this.name} n’a pas d’action retardée disponible.`);
        return false;
      }

      const note = this._buildCombatActionNotes(
        actions.notes,
        `${label} : action retardée utilisée`
      );

      await this.update({
        "system.combat.actions.delayedAvailable": false,
        "system.combat.actions.delayedTurnGraceUsed": false,
        "system.combat.actions.delayedCreatedRound": 0,
        "system.combat.actions.delayedCreatedTurn": 0,
        "system.combat.actions.delayedCreatedCombatantId": "",
        "system.combat.actions.notes": note
      });

      await ChatMessage.create({
        speaker: ChatMessage.getSpeaker({ actor: this }),
        content: `
          <div class="naruto-roll-card">
            <h2>Action retardée utilisée</h2>
            <p><strong>${foundry.utils.escapeHTML?.(this.name) ?? this.name}</strong> utilise son action complexe retardée.</p>
            <p><strong>Action :</strong> ${foundry.utils.escapeHTML?.(label) ?? label}</p>
          </div>
        `
      });

      if (options.notify !== false) {
        ui.notifications.info(`${this.name} : action retardée consommée.`);
      }

      return true;
    }


    async delayComplexAction() {
      if (this.type !== "shinobi") return false;

      const actions = this._getCombatActionState();

      if (!Boolean(actions.complexAvailable)) {
        ui.notifications.warn(`${this.name} n’a plus d’action complexe à reporter.`);
        return false;
      }

      if (Boolean(actions.delayedAvailable)) {
        ui.notifications.warn(`${this.name} possède déjà une action retardée en réserve.`);
        return false;
      }

      const note = this._buildCombatActionNotes(
        actions.notes,
        "Action complexe reportée : 1 action retardée disponible"
      );

      await this.update({
        "system.combat.actions.complexAvailable": false,
        "system.combat.actions.delayedAvailable": true,
        "system.combat.actions.delayedTurnGraceUsed": false,
        "system.combat.actions.delayedCreatedRound": Math.max(0, Number(game.combat?.round ?? 0)),
        "system.combat.actions.delayedCreatedTurn": Math.max(0, Number(game.combat?.turn ?? 0)),
        "system.combat.actions.delayedCreatedCombatantId": String(game.combat?.combatant?.id ?? ""),
        "system.combat.actions.notes": note
      });

      await ChatMessage.create({
        speaker: ChatMessage.getSpeaker({ actor: this }),
        content: `
          <div class="naruto-roll-card">
            <h2>Action reportée</h2>
            <p><strong>${foundry.utils.escapeHTML?.(this.name) ?? this.name}</strong> reporte son action complexe.</p>
            <p>Action complexe consommée. Action retardée disponible jusqu’au prochain tour du personnage inclus.</p>
          </div>
        `
      });

      return true;
    }


    async useNindoAction(actionKey) {
      if (this.type !== "shinobi") return;

      const action = NARUTO25E.nindoActions?.[actionKey];

      if (!action) {
        ui.notifications.warn("Action Nindō inconnue.");
        return;
      }

      let cost = Number(action.cost ?? 0);

      if (action.variableCost) {
        const input = await Dialog.prompt({
          title: action.label,
          content: `
            <p>Combien de points de Nindō investir ?</p>
            <p>Maximum : ${action.maxCost ?? cost}</p>
            <input type="number" name="cost" value="${cost}" min="1" max="${action.maxCost ?? cost}" />
          `,
          label: "Valider",
          callback: (html) => {
            return Number(html.find('input[name="cost"]').val() ?? cost);
          },
          rejectClose: false
        });

        if (!input) return;

        cost = Math.clamp(
          Number(input),
          1,
          Number(action.maxCost ?? cost)
        );
      }

      const currentNindo = Number(this.system.nindo?.value ?? 0);
      const nextNindo = currentNindo - cost;

      if (nextNindo < 0) {
        const confirmed = await Dialog.confirm({
          title: "Nindō négatif",
          content: `
            <p><strong>${this.name}</strong> n’a pas assez de points de Nindō.</p>
            <p>Utiliser cette action fera passer son Nindō à <strong>${nextNindo}</strong>.</p>
            <p>Selon les règles, cela peut mener vers la voie du renégat.</p>
          `,
          yes: () => true,
          no: () => false,
          defaultYes: false
        });

        if (!confirmed) return;
      }

      const updateData = {
        "system.nindo.value": nextNindo
      };

      if (action.type === "charges") {
        const currentCharges = Number(this.system.nindo?.charges?.value ?? 0);
        const maxCharges = Number(this.system.nindo?.charges?.max ?? 5);

        updateData["system.nindo.charges.value"] = Math.min(
          maxCharges,
          currentCharges + 5
        );
      }

      if (action.type === "chakraBoost") {
        const chakra = this.system.resources?.chakra ?? {};
        const currentChakra = Math.max(0, Number(chakra.value ?? 0));
        const boostAmount = 500;
        const existingBoost = this.system.nindo?.activeEffects?.chakraBoost ?? {};
        const boostAlreadyActive = Boolean(existingBoost.active)
          && Number(existingBoost.remainingTurns ?? 0) > 0;
        const existingAmount = boostAlreadyActive
          ? Math.max(0, Number(existingBoost.amount ?? 0))
          : 0;
        const additionalBoost = Math.max(0, boostAmount - existingAmount);
        const naturalMax = Math.max(0, Number(chakra.naturalMax ?? chakra.rawMax ?? chakra.max ?? 0));

        const storedChakraBeforeGain = boostAlreadyActive
          ? Math.max(0, Number(existingBoost.storedChakraBeforeGain ?? Math.min(currentChakra, naturalMax)))
          : Math.min(currentChakra, naturalMax || currentChakra);

        updateData["system.nindo.activeEffects.chakraBoost"] = {
          active: true,
          remainingTurns: 5,
          amount: boostAmount,
          storedChakraBeforeGain,
          startedRound: boostAlreadyActive
            ? Number(existingBoost.startedRound ?? game.combat?.round ?? 0)
            : Number(game.combat?.round ?? 0),
          startedTurn: boostAlreadyActive
            ? Number(existingBoost.startedTurn ?? game.combat?.turn ?? 0)
            : Number(game.combat?.turn ?? 0)
        };

        updateData["system.resources.chakra.value"] = currentChakra + additionalBoost;
      }

      if (action.type === "awakening") {
        updateData["system.nindo.activeEffects.awakening"] = {
          active: true,
          actionsRemaining: 3,
          maxActions: 3,
          actionsSpent: 0,
          bonus: 10,
          startedRound: Number(game.combat?.round ?? 0),
          startedTurn: Number(game.combat?.turn ?? 0),
          startedCombatantId: String(game.combat?.combatant?.id ?? ""),
          expiresAtNextOwnTurn: true
        };
      }

      if (action.type === "opportunity") {
        updateData["system.nindo.activeEffects.opportunity"] = {
          available: true,
          source: action.label ?? "Unison",
          createdRound: Number(game.combat?.round ?? 0),
          createdTurn: Number(game.combat?.turn ?? 0),
          consumedRound: 0,
          consumedTurn: 0
        };
      }

      await this.update(updateData, {
        naruto25e: {
        allowNindoActionUpdate: true
        }
      });

      const warning = nextNindo < 0
        ? `<p class="nindo-warning"><strong>Attention :</strong> le Nindō devient négatif. Le personnage s’éloigne de sa voie.</p>`
        : "";

      await ChatMessage.create({
        speaker: ChatMessage.getSpeaker({ actor: this }),
        content: `
          <div class="naruto-roll-card nindo-card">
            <h2>${action.label}</h2>
            <p><strong>Coût :</strong> ${cost} point(s) de Nindō</p>
            <p><strong>Temporalité :</strong> ${action.temporalite}</p>
            <p>${action.description}</p>
            <p><strong>Nindō restant :</strong> ${nextNindo}</p>
            ${warning}
          </div>
        `
      });
    }

    async spendNindoCharge(chargeType = "") {
      if (this.type !== "shinobi") return;

      const charges = this.system.nindo?.charges ?? {};
      const current = Number(charges.value ?? 0);

      if (current <= 0) {
        ui.notifications.warn("Aucune charge de Nindō disponible.");
        return;
      }

      let selectedType = chargeType;

      if (!selectedType) {
        selectedType = await Dialog.prompt({
          title: "Dépenser une charge de Nindō",
          content: `
            <p>Choisir l’usage de la charge :</p>
            <select name="chargeType">
              ${Object.entries(NARUTO25E.nindoChargeUses).map(([key, label]) => {
                return `<option value="${key}">${label}</option>`;
              }).join("")}
            </select>
          `,
          label: "Dépenser",
          callback: (html) => {
            return html.find('select[name="chargeType"]').val();
          },
          rejectClose: false
        });
      }

      if (!selectedType) return;

      const label = NARUTO25E.nindoChargeUses?.[selectedType] ?? selectedType;

      await this.update({
        "system.nindo.charges.value": Math.max(0, current - 1)
      }, {
        naruto25e: {
        allowNindoActionUpdate: true
        }
      });

      await ChatMessage.create({
        speaker: ChatMessage.getSpeaker({ actor: this }),
        content: `
          <div class="naruto-roll-card nindo-card">
            <h2>Charge de Nindō dépensée</h2>
            <p><strong>Usage :</strong> ${label}</p>
            <p><strong>Charges restantes :</strong> ${Math.max(0, current - 1)}</p>
          </div>
        `
      });
    }

    async consumeNindoOpportunity(options = {}) {
      if (this.type !== "shinobi") return false;

      const opportunity = this._getActiveNindoOpportunityData();

      if (!opportunity.available) {
        ui.notifications.warn(`${this.name} n’a pas d’opportunité disponible.`);
        return false;
      }

      const source = opportunity.source || "Unison";

      await this.update({
        "system.nindo.activeEffects.opportunity": {
          available: false,
          source,
          createdRound: opportunity.createdRound,
          createdTurn: opportunity.createdTurn,
          consumedRound: Number(game.combat?.round ?? 0),
          consumedTurn: Number(game.combat?.turn ?? 0)
        }
      }, {
        naruto25e: {
          allowNindoActionUpdate: true
        }
      });

      await ChatMessage.create({
        speaker: ChatMessage.getSpeaker({ actor: this }),
        content: `
          <div class="naruto-roll-card nindo-card">
            <h2>Opportunité consommée</h2>
            <p><strong>${foundry.utils.escapeHTML?.(this.name) ?? this.name}</strong> consomme l’opportunité obtenue grâce à ${foundry.utils.escapeHTML?.(source) ?? source}.</p>
            <p>L’effet exact est choisi et résolu selon le contexte : combat, information, narration ou action spéciale.</p>
          </div>
        `
      });

      if (options.notify !== false) {
        ui.notifications.info(`${this.name} : opportunité consommée.`);
      }

      return true;
    }

    async endNindoChakraBoost(options = {}) {
      if (this.type !== "shinobi") return false;

      const chakraBoostEnd = this._getNindoChakraBoostEndData();

      if (!chakraBoostEnd.active) {
        await this.update({
          "system.nindo.activeEffects.chakraBoost": this._getInactiveNindoChakraBoostData()
        }, {
          naruto25e: {
            allowNindoActionUpdate: true
          }
        });

        return false;
      }

      const reason = String(options.reason ?? "Fin de l’effet");

      await this.update({
        "system.nindo.activeEffects.chakraBoost": this._getInactiveNindoChakraBoostData(),
        "system.resources.chakra.value": chakraBoostEnd.nextChakra
      }, {
        naruto25e: {
          allowNindoActionUpdate: true
        }
      });

      await ChatMessage.create({
        speaker: ChatMessage.getSpeaker({ actor: this }),
        content: `
          <div class="naruto-roll-card nindo-card">
            <h2>Accroissement du Chakra terminé</h2>
            <p><strong>${foundry.utils.escapeHTML?.(this.name) ?? this.name}</strong> perd son Chakra temporaire.</p>
            <p><strong>Raison :</strong> ${foundry.utils.escapeHTML?.(reason) ?? reason}</p>
            <p><strong>Chakra :</strong> ${chakraBoostEnd.currentChakra} → ${chakraBoostEnd.nextChakra} / ${chakraBoostEnd.naturalMax}</p>
            <p class="hint">Valeur mémorisée avant bonus : ${chakraBoostEnd.storedChakraBeforeGain}.</p>
          </div>
        `
      });

      return true;
    }

    async reduceNindoChakraBoostTurns(amount = 1, options = {}) {
      if (this.type !== "shinobi") return false;

      if (options.requireGM !== false && !game.user?.isGM) {
        ui.notifications.warn("Seul le MJ peut modifier la durée d’Accroissement du Chakra.");
        return false;
      }

      const boost = this.system.nindo?.activeEffects?.chakraBoost ?? {};
      const active = Boolean(boost.active) && Number(boost.remainingTurns ?? 0) > 0;

      if (!active) {
        ui.notifications.warn(`${this.name} n’a pas d’Accroissement du Chakra actif.`);
        return false;
      }

      const currentTurns = Math.max(0, Number(boost.remainingTurns ?? 0));
      const reduction = Math.max(1, Number(amount ?? 1));
      const nextTurns = Math.max(0, currentTurns - reduction);

      if (nextTurns <= 0) {
        return this.endNindoChakraBoost({
          reason: options.reason ?? "Durée réduite à 0"
        });
      }

      await this.update({
        "system.nindo.activeEffects.chakraBoost.remainingTurns": nextTurns
      }, {
        naruto25e: {
          allowNindoActionUpdate: true
        }
      });

      if (options.notify !== false) {
        ui.notifications.info(`${this.name} : Accroissement du Chakra ${currentTurns} → ${nextTurns} tour(s).`);
      }

      return true;
    }

    async processNindoChakraBoostAtTurnStart(options = {}) {
      if (this.type !== "shinobi") return false;

      const combat = options.combat ?? game.combat;
      const combatant = options.combatant ?? combat?.combatant ?? null;

      if (!combat || !combatant) return false;
      if (combatant.actor?.id !== this.id) return false;

      const boost = this.system.nindo?.activeEffects?.chakraBoost ?? {};
      const active = Boolean(boost.active) && Number(boost.remainingTurns ?? 0) > 0;

      if (!active) return false;

      const currentRound = Number(combat.round ?? 0);
      const currentTurn = Number(combat.turn ?? 0);
      const startedRound = Number(boost.startedRound ?? 0);
      const startedTurn = Number(boost.startedTurn ?? 0);

      const sameStartTurn = currentRound === startedRound && currentTurn === startedTurn;

      if (sameStartTurn) return false;

      return this.reduceNindoChakraBoostTurns(1, {
        requireGM: false,
        notify: false,
        reason: "Durée écoulée au début du tour"
      });
    }


    async resetNindoActiveEffects() {
      if (this.type !== "shinobi") return;

      if (!game.user?.isGM) {
        ui.notifications.warn("Seul le MJ peut réinitialiser les effets actifs de Nindō.");
        return;
      }

      const chakraBoostEnd = this._getNindoChakraBoostEndData();
      const updateData = {
        "system.nindo.activeEffects.chakraBoost": this._getInactiveNindoChakraBoostData(),
        "system.nindo.activeEffects.awakening": this._getInactiveNindoAwakeningData(),
        "system.nindo.activeEffects.opportunity": this._getInactiveNindoOpportunityData()
      };

      if (chakraBoostEnd.active) {
        updateData["system.resources.chakra.value"] = chakraBoostEnd.nextChakra;
      }

      await this.update(updateData, {
        naruto25e: {
          allowNindoActionUpdate: true
        }
      });

      const chakraLine = chakraBoostEnd.active
        ? `
          <p>
            <strong>Accroissement du Chakra terminé :</strong>
            ${chakraBoostEnd.currentChakra} → ${chakraBoostEnd.nextChakra} / ${chakraBoostEnd.naturalMax}.
          </p>
          <p class="hint">
            Valeur mémorisée avant bonus : ${chakraBoostEnd.storedChakraBeforeGain}.
          </p>
        `
        : "";

      await ChatMessage.create({
        speaker: ChatMessage.getSpeaker({ actor: this }),
        content: `
          <div class="naruto-roll-card nindo-card">
            <h2>Effets Nindō réinitialisés</h2>
            <p><strong>${foundry.utils.escapeHTML?.(this.name) ?? this.name}</strong> n’a plus d’effet actif de Nindō suivi par la fiche.</p>
            ${chakraLine}
          </div>
        `
      });

      ui.notifications.info(`${this.name} : effets Nindō réinitialisés.`);
    }

    async expireNindoAwakeningAtTurnStart(options = {}) {
      if (this.type !== "shinobi") return false;

      const awakening = this._getNindoAwakeningState();

      if (!awakening.active) return false;

      const combat = options.combat ?? game.combat;
      const combatant = options.combatant ?? combat?.combatant ?? null;

      if (!combat || !combatant) return false;
      if (combatant.actor?.id !== this.id) return false;

      const currentRound = Number(combat.round ?? 0);
      const currentTurn = Number(combat.turn ?? 0);
      const currentCombatantId = String(combatant.id ?? "");

      const sameStartTurn =
        currentRound === awakening.startedRound
        && currentTurn === awakening.startedTurn
        && (!awakening.startedCombatantId || currentCombatantId === awakening.startedCombatantId);

      if (sameStartTurn) return false;

      const shouldExpire =
        currentRound > awakening.startedRound
        || currentTurn !== awakening.startedTurn
        || (
          awakening.startedCombatantId
          && currentCombatantId !== awakening.startedCombatantId
        );

      if (!shouldExpire) return false;

      await this.update({
        "system.nindo.activeEffects.awakening": this._getInactiveNindoAwakeningData()
      }, {
        naruto25e: {
          allowNindoActionUpdate: true
        }
      });

      await ChatMessage.create({
        speaker: ChatMessage.getSpeaker({ actor: this }),
        content: `
          <div class="naruto-roll-card nindo-card">
            <h2>Éveil terminé</h2>
            <p><strong>${foundry.utils.escapeHTML?.(this.name) ?? this.name}</strong> revient à son état normal.</p>
            <p>Les actions d’Éveil non utilisées sont perdues.</p>
          </div>
        `
      });

      return true;
    }

  _prepareBases(system) {
    for (const base of Object.values(system.bases ?? {})) {
      base.value = Number(base.value ?? 0);
      base.bonus = Number(base.bonus ?? 0);
      base.max = Number(base.max ?? 14);
      base.absoluteMax = Number(base.absoluteMax ?? 16);
    }
  }

  _getMangekyoChakraBonusMode() {
    try {
      return game.settings?.get("naruto-25e", "mangekyoChakraBonusMode") ?? "passive";
    } catch (error) {
      return "passive";
    }
  }

  _getMangekyoActiveChakraEndMode() {
    try {
      return game.settings?.get("naruto-25e", "mangekyoActiveChakraEndMode") ?? "relative";
    } catch (error) {
      return "relative";
    }
  }

    _getAburameRucheChakraMode() {
    try {
      return game.settings?.get("naruto-25e", "aburameRucheChakraMode") ?? "general";
    } catch (error) {
      return "general";
    }
  }

  _getKatoInvisibilityMode() {
    try {
      return game.settings?.get("naruto-25e", "katoInvisibilityMode") ?? "passive";
    } catch (error) {
      return "passive";
    }
  }

  _hasClanKey(clanKey) {
    return this._hasMechanicalClan(clanKey, { purpose: "requirements" });
  }

  _hasAburameRuche() {
    if (!this._hasMechanicalClan("aburame", { purpose: "powers" })) return false;

    return this._getEffectiveLineageValue() >= 4;
  }

  _getAburameRucheGeneralChakraBonus() {
    if (!this._hasAburameRuche()) return 0;
    if (this._getAburameRucheChakraMode() !== "general") return 0;

    return 100;
  }

  _getAburameRucheKikaichuReserveBonus() {
    if (!this._hasAburameRuche()) return 0;
    if (this._getAburameRucheChakraMode() !== "kikaichu") return 0;

    return 100;
  }

  _isMangekyoPowerName(name) {
    return name === "Mangekyō Sharingan";
  }

  _isClassicSharinganPowerName(name) {
    return [
      "Sharingan — 1 tomoe",
      "Sharingan — 2 tomoe",
      "Sharingan — 3 tomoe"
    ].includes(name);
  }

  _hasValidatedMangekyoSharingan() {
    return Boolean(this.system.heritage?.gmOptions?.hasMangekyoSharingan);
  }

  _hasMangekyoPowerItem() {
    return this.items.some((item) => {
      return item.type === "pouvoirLignee" && this._isMangekyoPowerName(item.name);
    });
  }

  _hasActiveMangekyoSharingan(activePowers = null) {
    const powers = activePowers ?? this._getActiveLineagePowers?.() ?? [];

    return powers.some((power) => this._isMangekyoPowerName(power.name));
  }

  _getMangekyoChakraBonusForPrepare() {
    const mode = this._getMangekyoChakraBonusMode();

    if (mode === "passive") {
      return this._hasValidatedMangekyoSharingan() || this._hasMangekyoPowerItem()
        ? 200
        : 0;
    }

    if (mode === "active") {
      return this._hasActiveMangekyoSharingan()
        ? 200
        : 0;
    }

    return 0;
  }

  _getLineagePowerDefaults() {
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
        consumesLineageUse: true,
        effect: "",
        prerequisites: {
          text: "",
          gmValidation: false
        }
      }
    };
  }

  _normalizeLineagePowerSourceData(data) {
    return foundry.utils.mergeObject(
      this._getLineagePowerDefaults(),
      data,
      {
        inplace: false,
        overwrite: true,
        insertKeys: true,
        insertValues: true
      }
    );
  }

  _slugifyLineagePowerKey(value) {
    return String(value ?? "")
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase()
      .replace(/œ/g, "oe")
      .replace(/æ/g, "ae")
      .replace(/[^a-z0-9]+/g, "_")
      .replace(/^_+|_+$/g, "");
  }

  _getLineageFeatureByName(powerName) {
    const wantedName = String(powerName ?? "");

    for (const [clanKey, features] of Object.entries(NARUTO25E.clanLineageFeatures ?? {})) {
      for (const feature of features ?? []) {
        if (feature.label !== wantedName) continue;

        return {
          clanKey,
          feature
        };
      }
    }

    return null;
  }

  _getLineagePowerSourceDataFromConfig(powerName) {
    const match = this._getLineageFeatureByName(powerName);
    if (!match) return null;

    const { clanKey, feature } = match;
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

    const data = {
      name: feature.label,
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
    };

    return this._normalizeLineagePowerSourceData(data);
  }

  async _getLineagePowerSourceDataFromJson(powerName) {
    const path = "systems/naruto-25e/data/pouvoirs-lignee/pouvoirs-lignee.json";

    try {
      const response = await fetch(path);

      if (!response.ok) {
        console.warn(`Naruto 2.5e | Impossible de lire ${path} (${response.status}) pour ${powerName}.`);
        return null;
      }

      const json = await response.json();
      const entries = Array.isArray(json)
        ? json
        : Array.isArray(json.items)
          ? json.items
          : [];

      const entry = entries.find((document) => document.name === powerName);

      if (!entry) {
        console.warn(`Naruto 2.5e | Pouvoir de lignée introuvable dans le JSON : ${powerName}.`);
        return null;
      }

      return this._normalizeLineagePowerSourceData(entry);
    } catch (error) {
      console.warn(`Naruto 2.5e | Erreur pendant la lecture JSON du pouvoir de lignée ${powerName}.`, error);
      return null;
    }
  }

  _getUnlockedLineageFeatures() {
    if (this.type !== "shinobi") return [];

    const lineageValue = this._getEffectiveLineageValue();
    const clanKeys = this._getMechanicalClanKeys({ purpose: "powers" });
    const features = [];

    for (const clanKey of clanKeys) {
      const clanFeatures = NARUTO25E.clanLineageFeatures?.[clanKey] ?? [];

      for (const feature of clanFeatures) {
        const rank = Number(feature.rank ?? 0);
        if (rank <= 0) continue;
        if (lineageValue < rank) continue;

        features.push({
          clan: clanKey,
          ...feature
        });
      }
    }

    return features;
  }

  _getLineagePassiveBonuses(system = this.system) {
    const bonuses = {
      resources: {
        vigueurMax: 0,
        caractereMax: 0,
        chakraMax: 0
      },
      skills: {},
      special: []
    };

    const lineageValue = this._getEffectiveLineageValue();
    const features = this._getUnlockedLineageFeatures();

    for (const feature of features) {
      const featureBonuses = feature.bonuses ?? {};
      const resourceBonuses = featureBonuses.resources ?? {};
      const skillBonuses = featureBonuses.skills ?? {};

      bonuses.resources.vigueurMax += Number(resourceBonuses.vigueurMax ?? 0);
      bonuses.resources.caractereMax += Number(resourceBonuses.caractereMax ?? 0);
      bonuses.resources.chakraMax += Number(resourceBonuses.chakraMax ?? 0);

      if (resourceBonuses.chakraPerLineage) {
        bonuses.resources.chakraMax += Number(resourceBonuses.chakraPerLineage ?? 0) * lineageValue;
      }

      for (const [skillKey, value] of Object.entries(skillBonuses)) {
        if (!NARUTO25E.skillDefinitions?.[skillKey]) continue;

        const amount = value === "lineage"
          ? lineageValue
          : Number(value ?? 0);

        bonuses.skills[skillKey] = Number(bonuses.skills[skillKey] ?? 0) + amount;
      }

      if (Array.isArray(featureBonuses.special)) {
        bonuses.special.push(...featureBonuses.special);
      }
    }

    return bonuses;
  }

  _prepareLineagePassiveBonuses(system) {
    if (!system.resources) system.resources = {};
    if (!system.skills) return;

    const bonuses = this._getLineagePassiveBonuses(system);

    system.resources.lineageBonuses = bonuses.resources;
    system.resources.lineageSpecialBonuses = bonuses.special;

    for (const [skillKey, skill] of Object.entries(system.skills)) {
      const definition = NARUTO25E.skillDefinitions?.[skillKey];
      if (!definition) continue;

      const lineageBonus = Number(bonuses.skills?.[skillKey] ?? 0);
      const baseKey = definition.base;
      const baseValue = this._getBaseEffective(system, baseKey);

      skill.lineageBonus = lineageBonus;
      skill.total = Number(skill.natural ?? 1)
        + baseValue
        + Number(skill.bonus ?? 0)
        + lineageBonus;
    }
  }

  _prepareResources(system) {
    const cor = this._getBaseEffective(system, "cor");
    const esp = this._getBaseEffective(system, "esp");
    const lign = this._getBaseEffective(system, "lign");

    const chakraBonuses = system.chakra?.specializationBonuses ?? {};
    const lineageResourceBonuses = system.resources?.lineageBonuses ?? {};

    const vigueur = system.resources?.vigueur;
    if (vigueur) {
      const bonus = Number(vigueur.bonus ?? 0);
      const base = 2 + cor;
      const specializationBonus = Number(chakraBonuses.vigueurMax ?? 0);
      const lineageBonus = Number(lineageResourceBonuses.vigueurMax ?? 0);
      const total = Math.max(0, base + bonus + specializationBonus + lineageBonus);

      vigueur.base = base;
      vigueur.bonus = bonus;
      vigueur.specializationBonus = specializationBonus;
      vigueur.lineageBonus = lineageBonus;
      vigueur.total = total;

      /*
        Vigueur n’est pas une réserve actuel / max.
        On garde value et max synchronisés pour compatibilité avec les anciens champs,
        mais la valeur utile est désormais total/value.
      */
      vigueur.value = total;
      vigueur.max = total;
    }

    const caractere = system.resources?.caractere;
    if (caractere) {
      const bonus = Number(caractere.bonus ?? 0);
      const base = 2 + esp;
      const specializationBonus = Number(chakraBonuses.caractereMax ?? 0);
      const lineageBonus = Number(lineageResourceBonuses.caractereMax ?? 0);
      const total = Math.max(0, base + bonus + specializationBonus + lineageBonus);

      caractere.base = base;
      caractere.bonus = bonus;
      caractere.specializationBonus = specializationBonus;
      caractere.lineageBonus = lineageBonus;
      caractere.total = total;

      /*
        Caractère n’est pas une réserve actuel / max.
        On garde value et max synchronisés pour compatibilité avec les anciens champs,
        mais la valeur utile est désormais total/value.
      */
      caractere.value = total;
      caractere.max = total;
    }

    const chakra = system.resources?.chakra;
    if (chakra) {
      const specializationChakraBonus =
        Number(chakraBonuses.chakraMax ?? 0)
        + Number(lineageResourceBonuses.chakraMax ?? 0);
      const passiveRegenPercent = 1 + Number(chakraBonuses.passiveRegenPercent ?? 0);

      chakra.bonus = Number(chakra.bonus ?? 0);
      chakra.activeRegen = Number(chakra.activeRegen ?? 0);
      chakra.sonneThreshold = Number(chakra.sonneThreshold ?? 50);

      const formulaMode = game.settings?.get("naruto-25e", "chakraFormulaMode") ?? "standard";

      let rawMax = 0;

      if (formulaMode === "manual") {
        rawMax = Math.max(0, Number(chakra.max ?? 0));
      } else if (formulaMode === "harsh") {
        rawMax = Math.max(0, cor * 30 + esp * 30 + chakra.bonus + specializationChakraBonus);
      } else if (formulaMode === "heroic") {
        rawMax = Math.max(0, cor * 50 + esp * 50 + chakra.bonus + specializationChakraBonus);
      } else {
        rawMax = Math.max(0, cor * 30 + esp * 30 + 50 + chakra.bonus + specializationChakraBonus);
      }

      const aburameRucheGeneralChakraBonus = this._getAburameRucheGeneralChakraBonus();
      rawMax = Math.max(0, rawMax + aburameRucheGeneralChakraBonus);

      chakra.rawMax = rawMax;

      const kikaichuAllocated = this._prepareKikaichuReserve(system, rawMax, lign);
      const mangekyoChakraBonus = this._getMangekyoChakraBonusForPrepare();
      const mangekyoMode = this._getMangekyoChakraBonusMode();
      const mangekyoPassiveBonus = mangekyoMode === "passive"
        ? mangekyoChakraBonus
        : 0;
      const mangekyoActiveBonus = mangekyoMode === "active"
        ? mangekyoChakraBonus
        : 0;
      const nindoChakraBoost = this._getActiveNindoChakraBoostAmount(system);
      const naturalMax = Math.max(0, rawMax - kikaichuAllocated + mangekyoPassiveBonus);
      const temporaryBonus = Math.max(0, nindoChakraBoost + mangekyoActiveBonus);

      chakra.naturalMax = naturalMax;
      chakra.temporaryBonus = {
        total: temporaryBonus,
        nindoBoost: nindoChakraBoost,
        mangekyoActive: mangekyoActiveBonus,
        sources: this._getTemporaryChakraBonusBreakdown(system).sources
      };

      chakra.max = Math.max(0, naturalMax + temporaryBonus);
      chakra.value = this._clampNumber(chakra.value, 0, chakra.max);

      chakra.passiveRegenPercent = passiveRegenPercent;
      chakra.passiveRegen = chakra.max > 0
        ? Math.max(1, Math.floor(chakra.max * passiveRegenPercent / 100))
        : 0;
    }
  }

  _prepareKikaichuReserve(system, chakraRawMax, lineageValue = 1) {
    if (!system.resources) system.resources = {};

    if (!system.resources.kikaichu) {
      system.resources.kikaichu = {
        enabled: false,
        value: 0,
        max: 0,
        min: 0,
        allocated: 0,
        notes: ""
      };
    }

    const reserve = system.resources.kikaichu;
    const heritage = system.heritage ?? {};

    const clan = heritage.clan ?? "";
    const secondaryClan = heritage.hybrid?.secondaryClan ?? "";

    const isAburame = clan === "aburame" || secondaryClan === "aburame";

    reserve.enabled = isAburame;

    if (!isAburame) {
      reserve.value = 0;
      reserve.max = 0;
      reserve.min = 0;
      reserve.allocated = 0;
      return 0;
    }

    const lign = Math.max(1, Number(lineageValue ?? 1));
    const rawMax = Math.max(0, Number(chakraRawMax ?? 0));

    const rucheReserveBonus = this._getAburameRucheKikaichuReserveBonus();
    const paperMin = lign * 15;
    const paperMax = lign * 25;
    const generalAllocationMax = Math.min(rawMax, paperMax);

    reserve.min = Math.min(rawMax, paperMin);
    reserve.bonus = rucheReserveBonus;
    reserve.max = generalAllocationMax + rucheReserveBonus;
    reserve.notes = rucheReserveBonus > 0
      ? "Ruche : +100 Chakra maximum de réserve Kikaichū, sans augmenter le Chakra général."
      : "";

    reserve.allocated = Math.clamp(
      Number(reserve.allocated ?? reserve.min),
      reserve.min,
      reserve.max
    );

    reserve.value = Math.clamp(
      Number(reserve.value ?? reserve.allocated),
      0,
      reserve.allocated
    );

    return Math.min(reserve.allocated, generalAllocationMax);
  }

_prepareExperience(system) {
  const experience = system.progression?.experience;
  if (!experience) return;

  experience.total = Number(experience.total ?? 0);

  let baseXpSpent = 0;

  for (const base of Object.values(system.bases ?? {})) {
    const value = Number(base.value ?? 1);
    let spent = 0;

    for (let rank = 2; rank <= value; rank++) {
      spent += Number(NARUTO25E.baseXpCosts[rank] ?? 0);
    }

    base.xpSpent = spent;
    baseXpSpent += spent;
  }

  let skillXpSpent = 0;

  for (const skill of Object.values(system.skills ?? {})) {
    skillXpSpent += Number(skill.xpSpent ?? 0);
  }

  experience.baseSpent = baseXpSpent;
  experience.skillSpent = skillXpSpent;
  experience.spent = baseXpSpent + skillXpSpent;
  experience.available = Math.max(0, experience.total - experience.spent);
}

  _prepareMissions(system) {
    const missions = system.missions;
    if (!missions) return;

    const ranks = ["d", "c", "b", "a", "s", "aa", "sPlus"];

    let totalCompleted = 0;
    let totalFailed = 0;

    for (const rank of ranks) {
      const mission = missions[rank];
      if (!mission) continue;

      mission.completed = Number(mission.completed ?? 0);
      mission.failed = Number(mission.failed ?? 0);

      totalCompleted += mission.completed;
      totalFailed += mission.failed;
    }

    missions.totalCompleted = totalCompleted;
    missions.totalFailed = totalFailed;
  }

    _prepareNindo(system) {
      if (!system.nindo) system.nindo = {};

      const nindo = system.nindo;

      nindo.max = 10;

      /*
        Important :
        Le Nindō peut devenir négatif selon les règles de renégat.
        On limite donc seulement le maximum à 10.
      */
      nindo.value = Math.min(
        Number(nindo.max ?? 10),
        Number(nindo.value ?? 0)
      );

      nindo.choiceMode = nindo.choiceMode ?? "preset";
      nindo.preset = nindo.preset ?? "";

      if (!nindo.custom) nindo.custom = {};
      nindo.custom.name = nindo.custom.name ?? "";
      nindo.custom.description = nindo.custom.description ?? "";

      if (!nindo.charges) nindo.charges = {};
      nindo.charges.max = 5;
      nindo.charges.value = Math.clamp(
        Number(nindo.charges.value ?? 0),
        0,
        Number(nindo.charges.max ?? 5)
      );

      if (!nindo.activeEffects) nindo.activeEffects = {};

      if (!nindo.activeEffects.chakraBoost) {
        nindo.activeEffects.chakraBoost = this._getInactiveNindoChakraBoostData();
      } else {
        nindo.activeEffects.chakraBoost.active = Boolean(nindo.activeEffects.chakraBoost.active);
        nindo.activeEffects.chakraBoost.remainingTurns = Math.max(0, Number(nindo.activeEffects.chakraBoost.remainingTurns ?? 0));
        nindo.activeEffects.chakraBoost.amount = Math.max(0, Number(nindo.activeEffects.chakraBoost.amount ?? 0));
        nindo.activeEffects.chakraBoost.storedChakraBeforeGain = Math.max(0, Number(nindo.activeEffects.chakraBoost.storedChakraBeforeGain ?? 0));
        nindo.activeEffects.chakraBoost.startedRound = Math.max(0, Number(nindo.activeEffects.chakraBoost.startedRound ?? 0));
        nindo.activeEffects.chakraBoost.startedTurn = Math.max(0, Number(nindo.activeEffects.chakraBoost.startedTurn ?? 0));
      }

      if (!nindo.activeEffects.awakening) {
        nindo.activeEffects.awakening = this._getInactiveNindoAwakeningData();
      } else {
        nindo.activeEffects.awakening.active = Boolean(nindo.activeEffects.awakening.active);
        nindo.activeEffects.awakening.actionsRemaining = Math.max(0, Number(nindo.activeEffects.awakening.actionsRemaining ?? 0));
        nindo.activeEffects.awakening.maxActions = Math.max(0, Number(nindo.activeEffects.awakening.maxActions ?? 3));
        nindo.activeEffects.awakening.actionsSpent = Math.max(0, Number(nindo.activeEffects.awakening.actionsSpent ?? 0));
        nindo.activeEffects.awakening.bonus = Boolean(nindo.activeEffects.awakening.active)
          ? Math.max(10, Number(nindo.activeEffects.awakening.bonus ?? 10))
          : 0;
        nindo.activeEffects.awakening.startedRound = Math.max(0, Number(nindo.activeEffects.awakening.startedRound ?? 0));
        nindo.activeEffects.awakening.startedTurn = Math.max(0, Number(nindo.activeEffects.awakening.startedTurn ?? 0));
        nindo.activeEffects.awakening.startedCombatantId = String(nindo.activeEffects.awakening.startedCombatantId ?? "");
        nindo.activeEffects.awakening.expiresAtNextOwnTurn = nindo.activeEffects.awakening.expiresAtNextOwnTurn !== false;
      }

      if (!nindo.activeEffects.opportunity) {
        nindo.activeEffects.opportunity = this._getInactiveNindoOpportunityData();
      } else {
        nindo.activeEffects.opportunity.available = Boolean(nindo.activeEffects.opportunity.available);
        nindo.activeEffects.opportunity.source = String(nindo.activeEffects.opportunity.source ?? "");
        nindo.activeEffects.opportunity.createdRound = Math.max(0, Number(nindo.activeEffects.opportunity.createdRound ?? 0));
        nindo.activeEffects.opportunity.createdTurn = Math.max(0, Number(nindo.activeEffects.opportunity.createdTurn ?? 0));
        nindo.activeEffects.opportunity.consumedRound = Math.max(0, Number(nindo.activeEffects.opportunity.consumedRound ?? 0));
        nindo.activeEffects.opportunity.consumedTurn = Math.max(0, Number(nindo.activeEffects.opportunity.consumedTurn ?? 0));
      }

      nindo.unlockedByGM = Boolean(nindo.unlockedByGM);
    }

  _prepareBackground(system) {
    system.identity = system.identity ?? {};
    system.identity.loyalty = system.identity.loyalty ?? "";
    system.identity.doctrine = system.identity.doctrine ?? "";
    system.identity.dailyLife = system.identity.dailyLife ?? "";
    system.identity.religion = system.identity.religion ?? "";
    system.identity.prejudices = system.identity.prejudices ?? "";

    system.background = system.background ?? {};
    system.background.notes = system.background.notes ?? "";

    system.background.narrativeWheel = system.background.narrativeWheel ?? {};
    system.background.narrativeWheel.arcs = system.background.narrativeWheel.arcs ?? "";
    system.background.narrativeWheel.balance = Number(system.background.narrativeWheel.balance ?? 0);
    system.background.narrativeWheel.notes = system.background.narrativeWheel.notes ?? "";

    const narrativeArcSource = system.background.narrativeArcs;

    const rawArcs = Array.isArray(narrativeArcSource)
      ? narrativeArcSource
      : narrativeArcSource && typeof narrativeArcSource === "object"
        ? Object.keys(narrativeArcSource)
            .filter((key) => /^\d+$/.test(String(key)))
            .sort((a, b) => Number(a) - Number(b))
            .map((key) => narrativeArcSource[key])
        : [];

    const normalizedArcs = rawArcs
      .slice(0, NARUTO25E_NARRATIVE_ARC_LIMITS.max)
      .map((arc, index) => this._normalizeNarrativeArcData(arc, index));

    while (normalizedArcs.length < NARUTO25E_NARRATIVE_ARC_LIMITS.min) {
      normalizedArcs.push(this._getDefaultNarrativeArc(normalizedArcs.length));
    }

    system.background.narrativeArcs = normalizedArcs;

    const relationshipSource = system.background.relationships;

    const rawRelationships = Array.isArray(relationshipSource)
      ? relationshipSource
      : relationshipSource && typeof relationshipSource === "object"
        ? Object.keys(relationshipSource)
            .filter((key) => /^\d+$/.test(String(key)))
            .sort((a, b) => Number(a) - Number(b))
            .map((key) => relationshipSource[key])
        : [];

    system.background.relationships = rawRelationships
      .slice(0, NARUTO25E_RELATIONSHIP_LIMITS.max)
      .map((relationship, index) => this._normalizeRelationshipData(relationship, index));
  }

  _getDefaultNarrativeArc(index = 0, id = "") {
    const arcNumber = Math.max(1, Number(index ?? 0) + 1);

    return {
      id: id || `arc-${arcNumber}`,
      title: `Arc narratif ${arcNumber}`,
      wheelSize: 3,
      progress: 0,
      status: "active",
      description: "",
      stakes: "",
      notes: ""
    };
  }

  _normalizeNarrativeArcData(arc = {}, index = 0) {
    const fallback = this._getDefaultNarrativeArc(index);
    const allowedWheelSizes = NARUTO25E_NARRATIVE_ARC_LIMITS.wheelSizes;
    const wheelSize = Number(arc.wheelSize ?? fallback.wheelSize);
    const normalizedWheelSize = allowedWheelSizes.includes(wheelSize) ? wheelSize : fallback.wheelSize;
    const rawStatus = String(arc.status ?? fallback.status);
    const status = NARUTO25E_NARRATIVE_ARC_LIMITS.statuses.includes(rawStatus)
      ? rawStatus
      : fallback.status;
    const progress = Math.min(
      Math.max(0, Number(arc.progress ?? fallback.progress)),
      normalizedWheelSize
    );

    return {
      id: String(arc.id ?? fallback.id) || fallback.id,
      title: String(arc.title ?? fallback.title),
      wheelSize: normalizedWheelSize,
      progress,
      status,
      description: String(arc.description ?? ""),
      stakes: String(arc.stakes ?? ""),
      notes: String(arc.notes ?? "")
    };
  }

  _canUserEditNarrativeArcs(user = game.user) {
    return Boolean(user?.isGM) || Boolean(this.isOwner);
  }

  async addNarrativeArc() {
    if (this.type !== "shinobi") return false;

    if (!this._canUserEditNarrativeArcs()) {
      ui.notifications.warn("Tu n’as pas les droits nécessaires pour modifier les arcs narratifs.");
      return false;
    }

    const arcs = foundry.utils.deepClone(this.system.background?.narrativeArcs ?? []);

    if (arcs.length >= NARUTO25E_NARRATIVE_ARC_LIMITS.max) {
      ui.notifications.warn(`Maximum ${NARUTO25E_NARRATIVE_ARC_LIMITS.max} arcs narratifs.`);
      return false;
    }

    const id = foundry.utils.randomID?.(8) ?? `arc-${Date.now()}`;
    arcs.push(this._getDefaultNarrativeArc(arcs.length, id));

    await this.update({
      "system.background.narrativeArcs": arcs
    });

    return true;
  }

  async deleteNarrativeArc(arcId) {
    if (this.type !== "shinobi") return false;

    if (!this._canUserEditNarrativeArcs()) {
      ui.notifications.warn("Tu n’as pas les droits nécessaires pour modifier les arcs narratifs.");
      return false;
    }

    const id = String(arcId ?? "");
    const arcs = foundry.utils.deepClone(this.system.background?.narrativeArcs ?? []);

    if (arcs.length <= NARUTO25E_NARRATIVE_ARC_LIMITS.min) {
      ui.notifications.warn(`Minimum ${NARUTO25E_NARRATIVE_ARC_LIMITS.min} arcs narratifs.`);
      return false;
    }

    const nextArcs = arcs.filter((arc) => String(arc.id ?? "") !== id);

    if (nextArcs.length === arcs.length) {
      ui.notifications.warn("Arc narratif introuvable.");
      return false;
    }

    await this.update({
      "system.background.narrativeArcs": nextArcs
    });

    return true;
  }

  async updateNarrativeArcProgress(arcId, progress) {
    if (this.type !== "shinobi") return false;

    if (!game.user?.isGM) {
      ui.notifications.warn("Seul le MJ peut modifier la progression des arcs narratifs.");
      return false;
    }

    const id = String(arcId ?? "");
    const arcs = foundry.utils.deepClone(this.system.background?.narrativeArcs ?? []);
    const arc = arcs.find((entry) => String(entry.id ?? "") === id);

    if (!arc) {
      ui.notifications.warn("Arc narratif introuvable.");
      return false;
    }

    const wheelSize = NARUTO25E_NARRATIVE_ARC_LIMITS.wheelSizes.includes(Number(arc.wheelSize ?? 3))
      ? Number(arc.wheelSize ?? 3)
      : 3;

    arc.progress = Math.min(Math.max(0, Number(progress ?? 0)), wheelSize);

    await this.update({
      "system.background.narrativeArcs": arcs
    });

    return true;
  }

  async updateNarrativeArcStatus(arcId, status) {
    if (this.type !== "shinobi") return false;

    if (!game.user?.isGM) {
      ui.notifications.warn("Seul le MJ peut modifier le statut des arcs narratifs.");
      return false;
    }

    const id = String(arcId ?? "");
    const nextStatus = String(status ?? "active");

    if (!NARUTO25E_NARRATIVE_ARC_LIMITS.statuses.includes(nextStatus)) {
      ui.notifications.warn(`Statut d’arc narratif invalide : ${nextStatus}.`);
      return false;
    }

    const arcs = foundry.utils.deepClone(this.system.background?.narrativeArcs ?? []);
    const arc = arcs.find((entry) => String(entry.id ?? "") === id);

    if (!arc) {
      ui.notifications.warn("Arc narratif introuvable.");
      return false;
    }

    arc.status = nextStatus;

    await this.update({
      "system.background.narrativeArcs": arcs
    });

    return true;
  }

  async updateNarrativeArcField(arcId, field, value) {
    if (this.type !== "shinobi") return false;

    if (!this._canUserEditNarrativeArcs()) {
      ui.notifications.warn("Tu n’as pas les droits nécessaires pour modifier les arcs narratifs.");
      return false;
    }

    const id = String(arcId ?? "");
    const fieldKey = String(field ?? "");
    const allowedFields = new Set([
      "title",
      "wheelSize",
      "description",
      "stakes",
      "notes"
    ]);

    if (!allowedFields.has(fieldKey)) {
      ui.notifications.warn(`Champ d’arc narratif invalide : ${fieldKey}.`);
      return false;
    }

    const arcs = foundry.utils.deepClone(this.system.background?.narrativeArcs ?? []);
    const arc = arcs.find((entry) => String(entry.id ?? "") === id);

    if (!arc) {
      ui.notifications.warn("Arc narratif introuvable.");
      return false;
    }

    if (fieldKey === "wheelSize") {
      const nextWheelSize = Number(value ?? 3);

      if (!NARUTO25E_NARRATIVE_ARC_LIMITS.wheelSizes.includes(nextWheelSize)) {
        ui.notifications.warn(`Taille de roue narrative invalide : ${nextWheelSize}.`);
        return false;
      }

      arc.wheelSize = nextWheelSize;
      arc.progress = Math.min(Math.max(0, Number(arc.progress ?? 0)), nextWheelSize);
    } else {
      arc[fieldKey] = String(value ?? "");
    }

    await this.update({
      "system.background.narrativeArcs": arcs
    });

    return true;
  }

  _getDefaultRelationship(index = 0, id = "") {
    const relationshipNumber = Math.max(1, Number(index ?? 0) + 1);

    return {
      id: id || `relationship-${relationshipNumber}`,
      name: `Relation ${relationshipNumber}`,
      actorUuid: "",
      role: "",
      faction: "",
      score: 0,
      personalTag: "none",
      targetTag: "unknown",
      personalNotes: "",
      targetNotes: "",
      gmNotes: "",
      isSecret: false
    };
  }

  _normalizeRelationshipTag(tagKey, fallback = "none") {
    const key = String(tagKey ?? fallback);

    return NARUTO25E.relationshipTags?.[key] ? key : fallback;
  }

  _normalizeRelationshipData(relationship = {}, index = 0) {
    const fallback = this._getDefaultRelationship(index);
    const score = this._clampNumber(
      Number(relationship.score ?? fallback.score),
      NARUTO25E_RELATIONSHIP_LIMITS.minScore,
      NARUTO25E_RELATIONSHIP_LIMITS.maxScore
    );

    return {
      id: String(relationship.id ?? fallback.id) || fallback.id,
      name: String(relationship.name ?? fallback.name),
      actorUuid: String(relationship.actorUuid ?? ""),
      role: String(relationship.role ?? ""),
      faction: String(relationship.faction ?? ""),
      score,
      personalTag: this._normalizeRelationshipTag(relationship.personalTag, "none"),
      targetTag: this._normalizeRelationshipTag(relationship.targetTag, "unknown"),
      personalNotes: String(relationship.personalNotes ?? ""),
      targetNotes: String(relationship.targetNotes ?? ""),
      gmNotes: String(relationship.gmNotes ?? ""),
      isSecret: Boolean(relationship.isSecret)
    };
  }

  _canUserEditRelationships(user = game.user) {
    return Boolean(user?.isGM) || Boolean(this.isOwner);
  }

  _canUserEditRelationshipField(fieldKey, user = game.user) {
    if (user?.isGM) return true;

    if (!this._canUserEditRelationships(user)) return false;

    return new Set([
      "name",
      "actorUuid",
      "role",
      "faction",
      "personalTag",
      "personalNotes"
    ]).has(String(fieldKey ?? ""));
  }

  async addRelationship() {
    if (this.type !== "shinobi") return false;

    if (!this._canUserEditRelationships()) {
      ui.notifications.warn("Tu n’as pas les droits nécessaires pour modifier les relations.");
      return false;
    }

    const relationships = foundry.utils.deepClone(this.system.background?.relationships ?? []);

    if (relationships.length >= NARUTO25E_RELATIONSHIP_LIMITS.max) {
      ui.notifications.warn(`Maximum ${NARUTO25E_RELATIONSHIP_LIMITS.max} relations.`);
      return false;
    }

    const id = foundry.utils.randomID?.(8) ?? `relationship-${Date.now()}`;
    relationships.push(this._getDefaultRelationship(relationships.length, id));

    await this.update({
      "system.background.relationships": relationships
    });

    return true;
  }

  async deleteRelationship(relationshipId) {
    if (this.type !== "shinobi") return false;

    if (!this._canUserEditRelationships()) {
      ui.notifications.warn("Tu n’as pas les droits nécessaires pour modifier les relations.");
      return false;
    }

    const id = String(relationshipId ?? "");
    const relationships = foundry.utils.deepClone(this.system.background?.relationships ?? []);
    const nextRelationships = relationships.filter((relationship) => String(relationship.id ?? "") !== id);

    if (nextRelationships.length === relationships.length) {
      ui.notifications.warn("Relation introuvable.");
      return false;
    }

    await this.update({
      "system.background.relationships": nextRelationships
    });

    return true;
  }

  async updateRelationshipField(relationshipId, field, value) {
    if (this.type !== "shinobi") return false;

    const id = String(relationshipId ?? "");
    const fieldKey = String(field ?? "");

    const allowedFields = new Set([
      "name",
      "actorUuid",
      "role",
      "faction",
      "score",
      "personalTag",
      "targetTag",
      "personalNotes",
      "targetNotes",
      "gmNotes",
      "isSecret"
    ]);

    if (!allowedFields.has(fieldKey)) {
      ui.notifications.warn(`Champ de relation invalide : ${fieldKey}.`);
      return false;
    }

    if (!this._canUserEditRelationshipField(fieldKey)) {
      ui.notifications.warn("Tu n’as pas les droits nécessaires pour modifier ce champ de relation.");
      return false;
    }

    const relationships = foundry.utils.deepClone(this.system.background?.relationships ?? []);
    const relationship = relationships.find((entry) => String(entry.id ?? "") === id);

    if (!relationship) {
      ui.notifications.warn("Relation introuvable.");
      return false;
    }

    if (fieldKey === "score") {
      relationship.score = this._clampNumber(
        Number(value ?? 0),
        NARUTO25E_RELATIONSHIP_LIMITS.minScore,
        NARUTO25E_RELATIONSHIP_LIMITS.maxScore
      );
    } else if (fieldKey === "personalTag" || fieldKey === "targetTag") {
      relationship[fieldKey] = this._normalizeRelationshipTag(value, fieldKey === "targetTag" ? "unknown" : "none");
    } else if (fieldKey === "isSecret") {
      relationship.isSecret = Boolean(value);
    } else {
      relationship[fieldKey] = String(value ?? "");
    }

    await this.update({
      "system.background.relationships": relationships
    });

    return true;
  }

  async adjustRelationshipScore(relationshipId, delta) {
    if (this.type !== "shinobi") return false;

    if (!game.user?.isGM) {
      ui.notifications.warn("Seul le MJ peut modifier le score de relation.");
      return false;
    }

    const id = String(relationshipId ?? "");
    const scoreDelta = Number(delta ?? 0);
    const relationships = foundry.utils.deepClone(this.system.background?.relationships ?? []);
    const relationship = relationships.find((entry) => String(entry.id ?? "") === id);

    if (!relationship) {
      ui.notifications.warn("Relation introuvable.");
      return false;
    }

    relationship.score = this._clampNumber(
      Number(relationship.score ?? 0) + scoreDelta,
      NARUTO25E_RELATIONSHIP_LIMITS.minScore,
      NARUTO25E_RELATIONSHIP_LIMITS.maxScore
    );

    await this.update({
      "system.background.relationships": relationships
    });

    return true;
  }

  _prepareEffects(system) {
    system.effects = system.effects ?? {};

    const effectSource = system.effects.narutoEffects;

    const rawEffects = Array.isArray(effectSource)
      ? effectSource
      : effectSource && typeof effectSource === "object"
        ? Object.keys(effectSource)
            .filter((key) => /^\d+$/.test(String(key)))
            .sort((a, b) => Number(a) - Number(b))
            .map((key) => effectSource[key])
        : [];

    system.effects.narutoEffects = rawEffects
      .slice(0, NARUTO25E_EFFECT_LIMITS.max)
      .map((effect, index) => this._normalizeNarutoEffectData(effect, index));
  }

  _getDefaultNarutoEffect(index = 0, id = "") {
    const effectNumber = Math.max(1, Number(index ?? 0) + 1);

    return {
      id: id || `effect-${effectNumber}`,
      name: `Effet ${effectNumber}`,
      category: "custom",
      mode: "active",
      statusKey: "none",
      rank: 0,
      enabled: true,
      sourceName: "",
      sourceUuid: "",
      sourceType: "manual",
      targetType: "none",
      targetItemId: "",
      durationType: "manual",
      remainingRounds: 0,
      remainingTurns: 0,
      maintenanceCost: 0,
      isHidden: false,
      notes: "",
      modifierNotes: "",
      modifiers: []
    };
  }

  _normalizeNarutoEffectKey(collection, key, fallback = "") {
    const normalizedKey = String(key ?? fallback);

    return collection?.[normalizedKey] ? normalizedKey : fallback;
  }

  _normalizeNarutoEffectModifier(modifier = {}, index = 0) {
    const modifierNumber = Math.max(1, Number(index ?? 0) + 1);

    return {
      id: String(modifier.id ?? "") || `modifier-${modifierNumber}`,
      target: this._normalizeNarutoEffectKey(NARUTO25E.effectModifierTargets, modifier.target, "none"),
      key: String(modifier.key ?? ""),
      value: Number(modifier.value ?? 0),
      type: this._normalizeNarutoEffectKey(NARUTO25E.effectModifierTypes, modifier.type, "flat"),
      condition: String(modifier.condition ?? "")
    };
  }

  _normalizeNarutoEffectData(effect = {}, index = 0) {
    const fallback = this._getDefaultNarutoEffect(index);
    const rank = this._clampNumber(
      Number(effect.rank ?? fallback.rank),
      NARUTO25E_EFFECT_LIMITS.minRank,
      NARUTO25E_EFFECT_LIMITS.maxRank
    );

    const remainingRounds = this._clampNumber(
      Number(effect.remainingRounds ?? 0),
      0,
      NARUTO25E_EFFECT_LIMITS.maxDuration
    );

    const remainingTurns = this._clampNumber(
      Number(effect.remainingTurns ?? 0),
      0,
      NARUTO25E_EFFECT_LIMITS.maxDuration
    );

    const maintenanceCost = this._clampNumber(
      Number(effect.maintenanceCost ?? 0),
      0,
      9999
    );

    const modifiers = Array.isArray(effect.modifiers)
      ? effect.modifiers
          .slice(0, 20)
          .map((modifier, modifierIndex) => this._normalizeNarutoEffectModifier(modifier, modifierIndex))
      : [];

    return {
      id: String(effect.id ?? fallback.id) || fallback.id,
      name: String(effect.name ?? fallback.name),
      category: this._normalizeNarutoEffectKey(NARUTO25E.effectCategories, effect.category, fallback.category),
      mode: this._normalizeNarutoEffectKey(NARUTO25E.effectModes, effect.mode, fallback.mode),
      statusKey: this._normalizeNarutoEffectKey(NARUTO25E.effectStatusKeys, effect.statusKey, fallback.statusKey),
      rank,
      enabled: effect.enabled !== false,
      sourceName: String(effect.sourceName ?? ""),
      sourceUuid: String(effect.sourceUuid ?? ""),
      sourceType: this._normalizeNarutoEffectKey(NARUTO25E.effectSourceTypes, effect.sourceType, fallback.sourceType),
      targetType: this._normalizeNarutoEffectKey(NARUTO25E.effectTargetTypes, effect.targetType, fallback.targetType),
      targetItemId: String(effect.targetItemId ?? ""),
      durationType: this._normalizeNarutoEffectKey(NARUTO25E.effectDurationTypes, effect.durationType, fallback.durationType),
      remainingRounds,
      remainingTurns,
      maintenanceCost,
      isHidden: Boolean(effect.isHidden),
      notes: String(effect.notes ?? ""),
      modifierNotes: String(effect.modifierNotes ?? ""),
      modifiers
    };
  }

  _canUserEditNarutoEffects(user = game.user) {
    return Boolean(user?.isGM) || Boolean(this.isOwner);
  }

  _canUserEditNarutoEffectField(fieldKey, user = game.user) {
    if (user?.isGM) return true;

    if (!this._canUserEditNarutoEffects(user)) return false;

    return new Set([
      "name",
      "category",
      "mode",
      "statusKey",
      "rank",
      "enabled",
      "sourceName",
      "sourceUuid",
      "sourceType",
      "targetType",
      "targetItemId",
      "durationType",
      "remainingRounds",
      "remainingTurns",
      "maintenanceCost",
      "notes",
      "modifierNotes"
    ]).has(String(fieldKey ?? ""));
  }

  async addNarutoEffect(category = "custom") {
    if (this.type !== "shinobi") return false;

    if (!this._canUserEditNarutoEffects()) {
      ui.notifications.warn("Tu n’as pas les droits nécessaires pour modifier les effets.");
      return false;
    }

    const effects = foundry.utils.deepClone(this.system.effects?.narutoEffects ?? []);

    if (effects.length >= NARUTO25E_EFFECT_LIMITS.max) {
      ui.notifications.warn(`Maximum ${NARUTO25E_EFFECT_LIMITS.max} effets suivis.`);
      return false;
    }

    const id = foundry.utils.randomID?.(8) ?? `effect-${Date.now()}`;
    const effect = this._getDefaultNarutoEffect(effects.length, id);
    effect.category = this._normalizeNarutoEffectKey(NARUTO25E.effectCategories, category, "custom");

    if (effect.category === "condition") {
      effect.mode = "temporary";
      effect.durationType = "manual";
      effect.statusKey = "custom";
    }

    effects.push(effect);

    await this.update({
      "system.effects.narutoEffects": effects
    });

    return true;
  }

  async deleteNarutoEffect(effectId) {
    if (this.type !== "shinobi") return false;

    if (!this._canUserEditNarutoEffects()) {
      ui.notifications.warn("Tu n’as pas les droits nécessaires pour modifier les effets.");
      return false;
    }

    const id = String(effectId ?? "");
    const effects = foundry.utils.deepClone(this.system.effects?.narutoEffects ?? []);
    const nextEffects = effects.filter((effect) => String(effect.id ?? "") !== id);

    if (nextEffects.length === effects.length) {
      ui.notifications.warn("Effet introuvable.");
      return false;
    }

    await this.update({
      "system.effects.narutoEffects": nextEffects
    });

    return true;
  }

  async updateNarutoEffectField(effectId, field, value) {
    if (this.type !== "shinobi") return false;

    const id = String(effectId ?? "");
    const fieldKey = String(field ?? "");

    const allowedFields = new Set([
      "name",
      "category",
      "mode",
      "statusKey",
      "rank",
      "enabled",
      "sourceName",
      "sourceUuid",
      "sourceType",
      "targetType",
      "targetItemId",
      "durationType",
      "remainingRounds",
      "remainingTurns",
      "maintenanceCost",
      "isHidden",
      "notes",
      "modifierNotes"
    ]);

    if (!allowedFields.has(fieldKey)) {
      ui.notifications.warn(`Champ d’effet invalide : ${fieldKey}.`);
      return false;
    }

    if (!this._canUserEditNarutoEffectField(fieldKey)) {
      ui.notifications.warn("Tu n’as pas les droits nécessaires pour modifier ce champ d’effet.");
      return false;
    }

    const effects = foundry.utils.deepClone(this.system.effects?.narutoEffects ?? []);
    const effect = effects.find((entry) => String(entry.id ?? "") === id);

    if (!effect) {
      ui.notifications.warn("Effet introuvable.");
      return false;
    }

    if (fieldKey === "category") {
      effect.category = this._normalizeNarutoEffectKey(NARUTO25E.effectCategories, value, "custom");
    } else if (fieldKey === "mode") {
      effect.mode = this._normalizeNarutoEffectKey(NARUTO25E.effectModes, value, "active");
    } else if (fieldKey === "statusKey") {
      effect.statusKey = this._normalizeNarutoEffectKey(NARUTO25E.effectStatusKeys, value, "none");
    } else if (fieldKey === "sourceType") {
      effect.sourceType = this._normalizeNarutoEffectKey(NARUTO25E.effectSourceTypes, value, "manual");
    } else if (fieldKey === "targetType") {
      effect.targetType = this._normalizeNarutoEffectKey(NARUTO25E.effectTargetTypes, value, "none");

      if (effect.targetType === "none") {
        effect.targetItemId = "";
      }
    } else if (fieldKey === "durationType") {
      effect.durationType = this._normalizeNarutoEffectKey(NARUTO25E.effectDurationTypes, value, "manual");

      if (["manual", "scene", "session", "untilCancelled", "permanent"].includes(effect.durationType)) {
        effect.remainingRounds = 0;
        effect.remainingTurns = 0;
      }
    } else if (fieldKey === "rank") {
      effect.rank = this._clampNumber(
        Number(value ?? 0),
        NARUTO25E_EFFECT_LIMITS.minRank,
        NARUTO25E_EFFECT_LIMITS.maxRank
      );
    } else if (fieldKey === "remainingRounds") {
      effect.remainingRounds = this._clampNumber(
        Number(value ?? 0),
        0,
        NARUTO25E_EFFECT_LIMITS.maxDuration
      );
    } else if (fieldKey === "remainingTurns") {
      effect.remainingTurns = this._clampNumber(
        Number(value ?? 0),
        0,
        NARUTO25E_EFFECT_LIMITS.maxDuration
      );
    } else if (fieldKey === "maintenanceCost") {
      effect.maintenanceCost = this._clampNumber(Number(value ?? 0), 0, 9999);
    } else if (fieldKey === "enabled" || fieldKey === "isHidden") {
      effect[fieldKey] = Boolean(value);
    } else {
      effect[fieldKey] = String(value ?? "");
    }

    await this.update({
      "system.effects.narutoEffects": effects
    });

    return true;
  }

  async toggleNarutoEffect(effectId) {
    if (this.type !== "shinobi") return false;

    if (!this._canUserEditNarutoEffects()) {
      ui.notifications.warn("Tu n’as pas les droits nécessaires pour modifier les effets.");
      return false;
    }

    const id = String(effectId ?? "");
    const effects = foundry.utils.deepClone(this.system.effects?.narutoEffects ?? []);
    const effect = effects.find((entry) => String(entry.id ?? "") === id);

    if (!effect) {
      ui.notifications.warn("Effet introuvable.");
      return false;
    }

    effect.enabled = !Boolean(effect.enabled);

    await this.update({
      "system.effects.narutoEffects": effects
    });

    return true;
  }

  async adjustNarutoEffectRank(effectId, delta) {
    if (this.type !== "shinobi") return false;

    if (!this._canUserEditNarutoEffects()) {
      ui.notifications.warn("Tu n’as pas les droits nécessaires pour modifier les effets.");
      return false;
    }

    const id = String(effectId ?? "");
    const rankDelta = Number(delta ?? 0);
    const effects = foundry.utils.deepClone(this.system.effects?.narutoEffects ?? []);
    const effect = effects.find((entry) => String(entry.id ?? "") === id);

    if (!effect) {
      ui.notifications.warn("Effet introuvable.");
      return false;
    }

    effect.rank = this._clampNumber(
      Number(effect.rank ?? 0) + rankDelta,
      NARUTO25E_EFFECT_LIMITS.minRank,
      NARUTO25E_EFFECT_LIMITS.maxRank
    );

    await this.update({
      "system.effects.narutoEffects": effects
    });

    return true;
  }

  async addNarutoEffectModifier(effectId) {
    if (this.type !== "shinobi") return false;

    if (!this._canUserEditNarutoEffects()) {
      ui.notifications.warn("Tu n’as pas les droits nécessaires pour modifier les effets.");
      return false;
    }

    const id = String(effectId ?? "");
    const effects = foundry.utils.deepClone(this.system.effects?.narutoEffects ?? []);
    const effect = effects.find((entry) => String(entry.id ?? "") === id);

    if (!effect) {
      ui.notifications.warn("Effet introuvable.");
      return false;
    }

    effect.modifiers = Array.isArray(effect.modifiers) ? effect.modifiers : [];

    if (effect.modifiers.length >= 20) {
      ui.notifications.warn("Maximum 20 modificateurs par effet.");
      return false;
    }

    effect.modifiers.push(this._normalizeNarutoEffectModifier({
      id: foundry.utils.randomID?.(8) ?? `modifier-${Date.now()}`,
      target: "skill",
      key: "",
      value: 1,
      type: "bonus",
      condition: ""
    }, effect.modifiers.length));

    await this.update({
      "system.effects.narutoEffects": effects
    });

    return true;
  }

  async deleteNarutoEffectModifier(effectId, modifierId) {
    if (this.type !== "shinobi") return false;

    if (!this._canUserEditNarutoEffects()) {
      ui.notifications.warn("Tu n’as pas les droits nécessaires pour modifier les effets.");
      return false;
    }

    const id = String(effectId ?? "");
    const modifierKey = String(modifierId ?? "");
    const effects = foundry.utils.deepClone(this.system.effects?.narutoEffects ?? []);
    const effect = effects.find((entry) => String(entry.id ?? "") === id);

    if (!effect) {
      ui.notifications.warn("Effet introuvable.");
      return false;
    }

    const modifiers = Array.isArray(effect.modifiers) ? effect.modifiers : [];
    const nextModifiers = modifiers.filter((modifier) => String(modifier.id ?? "") !== modifierKey);

    if (nextModifiers.length === modifiers.length) {
      ui.notifications.warn("Modificateur introuvable.");
      return false;
    }

    effect.modifiers = nextModifiers;

    await this.update({
      "system.effects.narutoEffects": effects
    });

    return true;
  }

  async updateNarutoEffectModifierField(effectId, modifierId, field, value) {
    if (this.type !== "shinobi") return false;

    if (!this._canUserEditNarutoEffects()) {
      ui.notifications.warn("Tu n’as pas les droits nécessaires pour modifier les effets.");
      return false;
    }

    const id = String(effectId ?? "");
    const modifierKey = String(modifierId ?? "");
    const fieldKey = String(field ?? "");

    const allowedFields = new Set([
      "target",
      "key",
      "value",
      "type",
      "condition"
    ]);

    if (!allowedFields.has(fieldKey)) {
      ui.notifications.warn(`Champ de modificateur invalide : ${fieldKey}.`);
      return false;
    }

    const effects = foundry.utils.deepClone(this.system.effects?.narutoEffects ?? []);
    const effect = effects.find((entry) => String(entry.id ?? "") === id);

    if (!effect) {
      ui.notifications.warn("Effet introuvable.");
      return false;
    }

    effect.modifiers = Array.isArray(effect.modifiers) ? effect.modifiers : [];

    const modifier = effect.modifiers.find((entry) => String(entry.id ?? "") === modifierKey);

    if (!modifier) {
      ui.notifications.warn("Modificateur introuvable.");
      return false;
    }

    if (fieldKey === "target") {
      modifier.target = this._normalizeNarutoEffectKey(NARUTO25E.effectModifierTargets, value, "none");
    } else if (fieldKey === "type") {
      modifier.type = this._normalizeNarutoEffectKey(NARUTO25E.effectModifierTypes, value, "flat");
    } else if (fieldKey === "value") {
      modifier.value = this._clampNumber(Number(value ?? 0), -999, 999);
    } else {
      modifier[fieldKey] = String(value ?? "");
    }

    await this.update({
      "system.effects.narutoEffects": effects
    });

    return true;
  }

  async applyNarutoEffectFromItemDefinition(effectDefinition = {}, options = {}) {
    if (this.type !== "shinobi") return false;

    if (!this._canUserEditNarutoEffects()) {
      ui.notifications.warn("Tu n’as pas les droits nécessaires pour appliquer cet effet.");
      return false;
    }

    const effects = foundry.utils.deepClone(this.system.effects?.narutoEffects ?? []);

    if (effects.length >= NARUTO25E_EFFECT_LIMITS.max) {
      ui.notifications.warn(`Maximum ${NARUTO25E_EFFECT_LIMITS.max} effets suivis.`);
      return false;
    }

    const rawEffect = foundry.utils.deepClone(effectDefinition ?? {});
    const sourceName = String(options.sourceName ?? rawEffect.sourceName ?? rawEffect.name ?? "Effet");
    const sourceUuid = String(options.sourceUuid ?? rawEffect.sourceUuid ?? "");
    const sourceType = String(options.sourceType ?? rawEffect.sourceType ?? "custom");
    const targetType = String(options.targetType ?? rawEffect.targetType ?? "none");
    const targetItemId = String(options.targetItemId ?? rawEffect.targetItemId ?? "");

    rawEffect.id = foundry.utils.randomID?.(8) ?? `effect-${Date.now()}`;
    rawEffect.enabled = true;
    rawEffect.sourceName = sourceName;
    rawEffect.sourceUuid = sourceUuid;
    rawEffect.sourceType = this._normalizeNarutoEffectKey(NARUTO25E.effectSourceTypes, sourceType, "custom");
    rawEffect.targetType = this._normalizeNarutoEffectKey(NARUTO25E.effectTargetTypes, targetType, "none");
    rawEffect.targetItemId = targetItemId;

    const normalizedEffect = this._normalizeNarutoEffectData(rawEffect, effects.length);

    effects.push(normalizedEffect);

    await this.update({
      "system.effects.narutoEffects": effects
    });

    ui.notifications.info(`${normalizedEffect.name} appliqué à ${this.name}.`);
    return true;
  }

  _getItemAppliedEffects(item) {
    if (!item) return [];

    const declaredEffects = typeof item.getAppliedNarutoEffects === "function"
      ? item.getAppliedNarutoEffects()
      : foundry.utils.deepClone(item.system?.effects?.applied ?? []);

    const activeDeclaredEffects = Array.isArray(declaredEffects)
      ? declaredEffects.filter((effect) => effect.enabled !== false)
      : [];

    if (activeDeclaredEffects.length) return activeDeclaredEffects;

    return this._getFallbackAppliedEffectsForItem(item);
  }

  _getFallbackAppliedEffectsForItem(item) {
    if (!item || item.type !== "pouvoirLignee") return [];
    if (!this._isPersonalLineageFallbackEligible(item)) return [];

    const system = item.system ?? {};
    const powerType = String(system.powerType ?? "maintained");
    const maintenanceCost = Math.max(0, Number(system.maintenanceCost ?? 0));

    return [
      {
        id: "fallback-personal-lineage-power",
        name: item.name,
        category: "lineage",
        mode: powerType === "maintained" ? "maintained" : "active",
        statusKey: "none",
        rank: Math.max(0, Number(system.lineageRank ?? 0)),
        enabled: true,
        applyTarget: "self",
        sourceName: item.name,
        sourceUuid: item.uuid,
        sourceType: "lineage",
        targetType: "none",
        targetItemId: "",
        durationType: powerType === "active" || powerType === "maintained" ? "untilCancelled" : "manual",
        remainingRounds: 0,
        remainingTurns: 0,
        maintenanceCost,
        isHidden: false,
        notes: String(system.effect ?? ""),
        modifierNotes: "Fallback temporaire : effet personnel de lignée. À remplacer par un effet JSON dédié.",
        modifiers: []
      }
    ];
  }

  _isPersonalLineageFallbackEligible(item) {
    if (!item || item.type !== "pouvoirLignee") return false;

    const system = item.system ?? {};
    const powerType = String(system.powerType ?? "maintained");

    if (powerType === "passive") return false;

    const normalize = (value) => {
      return String(value ?? "")
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase();
    };

    const clan = normalize(system.clan ?? system.taxonomy?.clan ?? "");
    const text = normalize([
      item.name,
      system.effect,
      system.clan,
      system.powerType,
      system.taxonomy?.category,
      system.taxonomy?.subcategory,
      system.taxonomy?.clan,
      system.taxonomy?.school,
      system.taxonomy?.tags?.join?.(" ")
    ].join(" "));

    const personalKeywords = [
      "sharingan",
      "mangekyo",
      "mangekyou",
      "byakugan",
      "tenseigan",
      "rinnegan",
      "yurengan",
      "dojutsu",
      "dōjutsu"
    ];

    if (personalKeywords.some((keyword) => text.includes(keyword))) {
      return true;
    }

    if (clan === "akimichi") {
      return [
        "forme",
        "baika",
        "papillon",
        "colossal",
        "geante",
        "geant",
        "taille",
        "souveraine",
        "expansion"
      ].some((keyword) => text.includes(keyword));
    }

    return false;
  }

  _getNarutoItemChatThemeClass(item) {
    if (!item) return "";

    const system = item.system ?? {};

    const normalize = (value) => {
      return String(value ?? "")
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase();
    };

    const text = normalize([
      item.name,
      item.type,
      system.family,
      system.domain,
      system.skill,
      system.base,
      system.damage?.type,
      system.clan,
      system.taxonomy?.category,
      system.taxonomy?.subcategory,
      system.taxonomy?.clan,
      system.taxonomy?.element,
      system.taxonomy?.school,
      system.taxonomy?.tags?.join?.(" ")
    ].join(" "));

    const rules = [
      ["mangekyo", ["mangekyo", "mangekyou", "amaterasu", "tsukuyomi", "susano", "susanoo", "kotoamatsukami", "izanagi", "izanami"]],
      ["sharingan", ["sharingan", "uchiha"]],
      ["byakugan", ["byakugan", "hyuga", "juken"]],
      ["rinnegan", ["rinnegan"]],
      ["tenseigan", ["tenseigan"]],
      ["katon", ["katon", "fire", "feu"]],
      ["suiton", ["suiton", "water", "eau"]],
      ["raiton", ["raiton", "lightning", "foudre", "electricite", "electric"]],
      ["doton", ["doton", "earth", "terre"]],
      ["futon", ["futon", "wind", "vent"]],
      ["mokuton", ["mokuton", "bois"]],
      ["gensou", ["gensou", "genjutsu", "illusion"]],
      ["yuryoku", ["yuryoku", "spirituel", "emotionnel", "emotionnelle"]],
      ["kage", ["kage", "nara", "ombre"]],
      ["iryo", ["iryo", "medical", "medecine", "soin"]]
    ];

    const classes = ["naruto-themed-item-card"];

    for (const [theme, keywords] of rules) {
      if (keywords.some((keyword) => text.includes(keyword))) {
        classes.push(`naruto-theme-${theme}`);
      }
    }

    return classes.join(" ");
  }


  _getItemAppliedEffectsChatHtml(item, options = {}) {
    const effects = this._getItemAppliedEffects(item);

    if (!effects.length) return "";

    const targetActorIds = Array.isArray(options.targetActorIds)
      ? options.targetActorIds.map((entry) => String(entry ?? "")).filter(Boolean)
      : [];

    const hasSingleTarget = targetActorIds.length === 1;
    const weapons = Array.from(this.items ?? [])
      .filter((entry) => entry.type === "arme")
      .map((entry) => ({
        id: entry.id,
        name: entry.name
      }))
      .sort((a, b) => a.name.localeCompare(b.name, "fr"));

    const safe = (value) => foundry.utils.escapeHTML?.(String(value ?? "")) ?? String(value ?? "");

    return `
      <div class="naruto-item-applied-effects">
        <strong>Effets déclarés</strong>

        ${effects.map((effect) => {
          const effectId = safe(effect.id);
          const applyTarget = String(effect.applyTarget ?? "self");
          const targetType = String(effect.targetType ?? "none");
          const showSelfButton = ["self", "manual"].includes(applyTarget) && targetType !== "weapon";
          const showTargetButton = ["target", "manual"].includes(applyTarget) && hasSingleTarget && targetType !== "weapon";
          const showSelectedButton = targetType !== "weapon";
          const showWeaponButton = applyTarget === "weapon" || targetType === "weapon";
          const categoryLabel = NARUTO25E.effectCategories?.[effect.category] ?? effect.category;
          const modeLabel = NARUTO25E.effectModes?.[effect.mode] ?? effect.mode;
          const durationLabel = NARUTO25E.effectDurationTypes?.[effect.durationType] ?? effect.durationType;

          return `
            <div class="naruto-item-applied-effect" data-effect-id="${effectId}">
              <div class="naruto-item-applied-effect-main">
                <span>${safe(effect.name)}</span>
                <small>${safe(categoryLabel)} · ${safe(modeLabel)} · ${safe(durationLabel)}</small>
              </div>

              ${effect.notes ? `<p>${safe(effect.notes)}</p>` : ""}

              <div class="naruto-item-applied-effect-actions">
                ${showSelfButton ? `
                  <button
                    type="button"
                    class="naruto-chat-apply-item-effect"
                    data-effect-id="${effectId}"
                    data-application="self"
                  >
                    Appliquer au lanceur
                  </button>
                ` : ""}

                ${showTargetButton ? `
                  <button
                    type="button"
                    class="naruto-chat-apply-item-effect"
                    data-effect-id="${effectId}"
                    data-application="target"
                  >
                    Appliquer à la cible
                  </button>
                ` : ""}

                ${showSelectedButton ? `
                  <button
                    type="button"
                    class="naruto-chat-apply-item-effect"
                    data-effect-id="${effectId}"
                    data-application="selected"
                  >
                    Appliquer au token sélectionné
                  </button>
                ` : ""}

                ${showWeaponButton ? `
                  <select class="naruto-chat-effect-weapon-select" data-effect-id="${effectId}">
                    <option value="">— Choisir une arme —</option>
                    ${weapons.map((weapon) => `<option value="${safe(weapon.id)}">${safe(weapon.name)}</option>`).join("")}
                  </select>

                  <button
                    type="button"
                    class="naruto-chat-apply-item-effect"
                    data-effect-id="${effectId}"
                    data-application="weapon"
                  >
                    Appliquer à l’arme
                  </button>
                ` : ""}
              </div>
            </div>
          `;
        }).join("")}
      </div>
    `;
  }


  _isNarutoEffectCurrentlyActive(effect = {}) {
    if (effect.enabled === false) return false;

    const durationType = String(effect.durationType ?? "manual");

    if (durationType === "turn") {
      return Number(effect.remainingTurns ?? 0) > 0;
    }

    if (durationType === "round") {
      return Number(effect.remainingRounds ?? 0) > 0;
    }

    return true;
  }

  _getActiveNarutoEffects(options = {}) {
    const includeHidden = options.includeHidden !== false;
    const effects = Array.isArray(this.system.effects?.narutoEffects)
      ? this.system.effects.narutoEffects
      : [];

    return effects.filter((effect) => {
      if (!this._isNarutoEffectCurrentlyActive(effect)) return false;
      if (!includeHidden && effect.isHidden) return false;

      return true;
    });
  }

  _getSignedNarutoEffectModifierValue(modifier = {}) {
    const rawValue = Number(modifier.value ?? 0);
    const type = String(modifier.type ?? "flat");

    if (type === "penalty") return -Math.abs(rawValue);
    if (type === "override") return 0;

    return rawValue;
  }

  _doesNarutoEffectModifierApply(effect = {}, modifier = {}, target = "", options = {}) {
    const modifierTarget = String(modifier.target ?? "none");
    const requestedTarget = String(target ?? "none");

    if (!requestedTarget || requestedTarget === "none") return false;
    if (modifierTarget !== requestedTarget) return false;

    const effectTargetType = String(effect.targetType ?? "none");
    const requestedTargetType = String(options.targetType ?? "");

    if (effectTargetType !== "none" && requestedTargetType && effectTargetType !== requestedTargetType) {
      return false;
    }

    const effectTargetItemId = String(effect.targetItemId ?? "");
    const requestedItemId = String(options.itemId ?? "");

    if (effectTargetItemId && !requestedItemId) return false;
    if (effectTargetItemId && requestedItemId && effectTargetItemId !== requestedItemId) return false;

    const modifierKey = String(modifier.key ?? "").trim();

    if (!modifierKey || modifierKey === "all") return true;

    const acceptedKeys = [
      options.key,
      options.skillKey,
      options.baseKey,
      options.kind,
      options.damageType,
      options.defenseKey,
      options.itemId,
      options.itemType,
      options.targetType
    ]
      .map((entry) => String(entry ?? "").trim())
      .filter(Boolean);

    return acceptedKeys.includes(modifierKey);
  }

  _getNarutoEffectModifierSummary(target = "", options = {}) {
    const items = [];
    let total = 0;

    for (const effect of this._getActiveNarutoEffects()) {
      const modifiers = Array.isArray(effect.modifiers) ? effect.modifiers : [];

      for (const modifier of modifiers) {
        if (!this._doesNarutoEffectModifierApply(effect, modifier, target, options)) continue;

        const value = this._getSignedNarutoEffectModifierValue(modifier);

        if (value === 0) continue;

        const entry = {
          effectId: String(effect.id ?? ""),
          effectName: String(effect.name ?? "Effet"),
          target: String(modifier.target ?? target),
          key: String(modifier.key ?? ""),
          type: String(modifier.type ?? "flat"),
          value,
          condition: String(modifier.condition ?? "")
        };

        items.push(entry);
        total += value;
      }
    }

    return {
      target: String(target ?? ""),
      key: String(options.key ?? ""),
      total,
      items
    };
  }

  _combineNarutoEffectModifierSummaries(...summaries) {
    const items = summaries
      .filter(Boolean)
      .flatMap((summary) => Array.isArray(summary.items) ? summary.items : []);

    const total = items.reduce((sum, item) => {
      return sum + Number(item.value ?? 0);
    }, 0);

    return {
      target: "combined",
      key: "",
      total,
      items
    };
  }

  _getNarutoEffectModifierSummaryHtml(summary = null) {
    const items = Array.isArray(summary?.items) ? summary.items : [];

    if (!items.length) return "";

    const safe = (value) => foundry.utils.escapeHTML?.(String(value ?? "")) ?? String(value ?? "");

    return `
      <div class="naruto-effect-modifier-summary">
        <strong>Effets appliqués</strong>
        ${items.map((item) => {
          const value = Number(item.value ?? 0);
          const sign = value >= 0 ? "+" : "";

          return `
            <span>
              ${safe(item.effectName)}
              <em>${sign}${value}</em>
              ${item.key ? `<small>${safe(item.key)}</small>` : ""}
              ${item.condition ? `<small>${safe(item.condition)}</small>` : ""}
            </span>
          `;
        }).join("")}
      </div>
    `;
  }


  _clampNumber(value, min, max) {
    const number = Number(value ?? 0);
    return Math.min(Math.max(number, min), max);
  }
  getBaseCap() {
  const rankKey = this.system.progression?.rank?.key ?? this.system.identity?.rang ?? "aspirant";
  return this.getCurrentBaseCap();
  }

getBaseUpgradeCost(baseKey) {
  const base = this.system.bases?.[baseKey];
  if (!base) return null;

  const current = Number(base.value ?? 1);
  const next = current + 1;

  return NARUTO25E.baseXpCosts[next] ?? null;
  }

async increaseBase(baseKey) {
  if (this.type !== "shinobi") return;

  const base = this.system.bases?.[baseKey];
  if (!base) return;

  const current = Number(base.value ?? 1);
  const cap = this.getBaseCap();
  const next = current + 1;
  if (baseKey === "lign") {
    const hiddenCap = this._getHiddenClanLineageCap();

    if (hiddenCap !== null && next > hiddenCap) {
      ui.notifications.warn(`Lignée cachée verrouillée : la Base Lignée ne peut pas dépasser ${hiddenCap} avant déblocage narratif MJ.`);
      return;
    }
  }

  if (next > cap) {
    ui.notifications.warn(`Impossible d’augmenter ${base.label ?? baseKey} : plafond de rang atteint (${cap}).`);
    return;
  }

  const cost = Number(NARUTO25E.baseXpCosts[next] ?? 0);
  const available = Number(this.system.progression?.experience?.available ?? 0);

  if (cost <= 0) {
    ui.notifications.warn(`Aucun coût XP défini pour le rang ${next}.`);
    return;
  }

  if (available < cost) {
    ui.notifications.warn(`XP insuffisante : ${cost} XP nécessaires, ${available} disponibles.`);
    return;
  }

  await this.update({
    [`system.bases.${baseKey}.value`]: next
  });

  ui.notifications.info(`${base.label ?? baseKey} augmenté à ${next} pour ${cost} XP.`);
  }

async decreaseBase(baseKey) {
  if (this.type !== "shinobi") return;
  if (this.isCreationLocked() && !game.user.isGM) {
    ui.notifications.warn("La création est validée : seul le MJ peut réduire une Base.");
    return;
  }

  const base = this.system.bases?.[baseKey];
  if (!base) return;

  const current = Number(base.value ?? 1);
  const previous = current - 1;

  if (previous < 1) {
    ui.notifications.warn(`${base.label ?? baseKey} ne peut pas descendre sous 1.`);
    return;
  }

  await this.update({
    [`system.bases.${baseKey}.value`]: previous
  });

  ui.notifications.info(`${base.label ?? baseKey} réduit à ${previous}.`);
  }

  _addSkillCreationSource(system, skillKey, source) {
    if (!skillKey || !source) return;

    const definition = NARUTO25E.skillDefinitions?.[skillKey];
    if (!definition) return;

    if (!system.skills) system.skills = {};

    if (!system.skills[skillKey]) {
      system.skills[skillKey] = {
        natural: 1,
        bonus: 0,
        owned: false,
        manualOwned: false,
        creationSources: []
      };
    }

    const skill = system.skills[skillKey];

    if (!Array.isArray(skill.creationSources)) {
      skill.creationSources = [];
    }

    if (!skill.creationSources.includes(source)) {
      skill.creationSources.push(source);
    }

    if (source === "heritage") {
      skill.grantedByHeritage = true;
    }

    if (source.startsWith("affinity")) {
      skill.grantedByAffinity = true;
    }
  }

  _finalizeSkillOwnership(system) {
    if (!system.skills) return;

    for (const [skillKey, definition] of Object.entries(NARUTO25E.skillDefinitions)) {
      const skill = system.skills[skillKey];
      if (!skill) continue;

      const sources = Array.isArray(skill.creationSources)
        ? skill.creationSources
        : [];

      const ownedByDefault = Boolean(definition.ownedByDefault);
      const manualOwned = Boolean(skill.manualOwned);

      skill.owned = ownedByDefault || manualOwned || sources.some((source) => source !== "common");

      if (ownedByDefault && !sources.includes("common")) {
        sources.unshift("common");
      }

      skill.creationSources = Array.from(new Set(sources));
    }
  }
    _prepareSkills(system) {
      if (!system.skills) system.skills = {};

      for (const [key, definition] of Object.entries(NARUTO25E.skillDefinitions)) {
        if (!system.skills[key]) {
          system.skills[key] = {
            natural: 1,
            bonus: 0,
            owned: Boolean(definition.ownedByDefault),
            manualOwned: false,
            creationSources: []
          };
        }

      const skill = system.skills[key];
      if (definition.ownedByDefault) {
        skill.manualOwned = false;
      }
      const baseKey = definition.base;
      const baseValue = this._getBaseEffective(system, baseKey);
      const naturalBaseValue = Number(system.bases?.[baseKey]?.value ?? 1);

      const previousSources = Array.isArray(skill.creationSources)
        ? skill.creationSources
        : [];

      if (typeof skill.manualOwned !== "boolean") {
        const wasOwnedManually =
          Boolean(skill.owned)
          && !definition.ownedByDefault
          && !previousSources.includes("affinity")
          && !previousSources.includes("affinityForced")
          && !previousSources.includes("affinityPrimary")
          && !previousSources.includes("affinityPrimaryFree")
          && !previousSources.includes("affinitySecondary")
          && !previousSources.includes("affinityExtra")
          && !previousSources.includes("heritage");

        skill.manualOwned = wasOwnedManually;
      }

      skill.label = definition.label;
      skill.base = baseKey;
      skill.baseLabel = NARUTO25E.baseLabels[baseKey] ?? baseKey;
      skill.category = definition.category;
      skill.tags = definition.tags ?? [];

      skill.natural = Number(skill.natural ?? 1);
      skill.bonus = Number(skill.bonus ?? 0);
      skill.total = skill.natural + baseValue + skill.bonus;

      skill.max = naturalBaseValue + 2;

      skill.grantedByHeritage = false;
      skill.grantedByAffinity = false;

      skill.creationSources = [];

      if (definition.ownedByDefault) {
        skill.creationSources.push("common");
      }

      if (skill.manualOwned) {
        skill.creationSources.push("manual");
      }

      skill.owned = Boolean(definition.ownedByDefault) || Boolean(skill.manualOwned);

      let xpSpent = 0;
      for (let rank = 2; rank <= skill.natural; rank++) {
        xpSpent += NARUTO25E.getSkillXpCost(rank);
      }

      skill.xpSpent = xpSpent;

      if (skill.natural >= 7) {
        skill.masteryLabel = "Maîtrise";
      } else if (skill.natural >= 5) {
        skill.masteryLabel = "Expérimenté";
      } else {
        skill.masteryLabel = "";
      }
    }
  }

    getSkillUpgradeCost(skillKey) {
    const skill = this.system.skills?.[skillKey];
    if (!skill) return null;

    const current = Number(skill.natural ?? 1);
    const next = current + 1;

    return NARUTO25E.getSkillXpCost(next);
  }

  getSkillCap(skillKey) {
    const definition = NARUTO25E.skillDefinitions[skillKey];
    if (!definition) return 1;

    const baseKey = definition.base;
    const baseValue = Number(this.system.bases?.[baseKey]?.value ?? 1);

    return baseValue + 2;
  }

  async increaseSkill(skillKey) {
    if (this.type !== "shinobi") return;

    const skill = this.system.skills?.[skillKey];
    const definition = NARUTO25E.skillDefinitions[skillKey];

    if (!skill || !definition) return;

    const label = definition.label ?? skillKey;

    if (!skill.owned) {
      ui.notifications.warn(`Impossible d’augmenter ${label} : cette compétence n’est pas possédée.`);
      return;
    }

    const current = Number(skill.natural ?? 1);
    const next = current + 1;
    const cap = this.getSkillCap(skillKey);

    if (next > cap) {
      ui.notifications.warn(`Impossible d’augmenter ${label} : limite atteinte (${definition.base.toUpperCase()} + 2 = ${cap}).`);
      return;
    }

    const cost = this.getSkillUpgradeCost(skillKey);
    const available = Number(this.system.progression?.experience?.available ?? 0);

    if (available < cost) {
      ui.notifications.warn(`XP insuffisante : ${cost} XP nécessaires, ${available} disponibles.`);
      return;
    }

    await this.update({
      [`system.skills.${skillKey}.natural`]: next
    });

    ui.notifications.info(`${label} augmenté à ${next} pour ${cost} XP.`);
  }

  async decreaseSkill(skillKey) {
    if (this.type !== "shinobi") return;
    if (this.isCreationLocked() && !game.user.isGM) {
      ui.notifications.warn("La création est validée : seul le MJ peut réduire une Compétence.");
      return;
    }

    const skill = this.system.skills?.[skillKey];
    const definition = NARUTO25E.skillDefinitions[skillKey];

    if (!skill || !definition) return;

    const label = definition.label ?? skillKey;
    const current = Number(skill.natural ?? 1);
    const previous = current - 1;

    if (previous < 1) {
      ui.notifications.warn(`${label} ne peut pas descendre sous 1.`);
      return;
    }

    await this.update({
      [`system.skills.${skillKey}.natural`]: previous
    });

    ui.notifications.info(`${label} réduit à ${previous}.`);
  }

    _prepareHeritage(system) {
    if (!system.heritage) return;

    const heritage = system.heritage;
    const mode = this._getNormalizedHeritageMode(heritage);

    const grantedSkillKeys = new Set();
    if (!heritage.hiddenClan) {
      heritage.hiddenClan = {
        officialClan: "",
        realClan: "",
        awareness: "ignorant",
        unlocked: false,
        notes: ""
      };
    }

    heritage.hiddenClan.officialClan = String(heritage.hiddenClan.officialClan ?? "");
    heritage.hiddenClan.realClan = String(heritage.hiddenClan.realClan ?? "");
    heritage.hiddenClan.awareness = String(heritage.hiddenClan.awareness ?? "ignorant");
    heritage.hiddenClan.unlocked = Boolean(heritage.hiddenClan.unlocked);
    heritage.hiddenClan.notes = String(heritage.hiddenClan.notes ?? "");

    heritage.hiddenClan.state = NARUTO25E.getHiddenClanAwarenessState?.(heritage.hiddenClan.awareness) ?? {
      label: "Dans l’ignorance",
      summary: "Le personnage ignore totalement sa vraie lignée. La Base Lignée est forcée à 0.",
      maxCreationLineage: 0,
      requiresUnlockAbove: 0
    };

    heritage.hiddenClan.effectiveLineageCap = this._getHiddenClanLineageCap();
    heritage.hiddenClan.effectiveLineageValue = this._getEffectiveLineageValue();

    const addClanMandatorySkill = (clanKey) => {
      if (!clanKey || NARUTO25E.isCustomClanKey?.(clanKey)) return;

      const skillKeys = NARUTO25E.getClanMandatorySkills
        ? NARUTO25E.getClanMandatorySkills(clanKey)
        : [NARUTO25E.getClanMandatorySkill(clanKey)].filter(Boolean);

      for (const skillKey of skillKeys) {
        grantedSkillKeys.add(skillKey);
      }
    };

    for (const clanKey of this._getMechanicalClanKeys({ purpose: "requirements" })) {
      addClanMandatorySkill(clanKey);
    }

    if (NARUTO25E.isCustomClanKey?.(heritage.clan)) {
      const customChoices = NARUTO25E.getCustomClanMandatoryChoices?.(heritage.customClan) ?? [];

      for (const choiceKey of customChoices) {
        const choice = NARUTO25E.getCustomClanChoiceData?.(choiceKey);

        if (choice?.type === "skill" && choice.valid) {
          grantedSkillKeys.add(choice.key);
        }
      }
    }

    for (const skillKey of grantedSkillKeys) {
    this._addSkillCreationSource(system, skillKey, "heritage");
  }

    const lineageValue = Number(system.bases?.lign?.value ?? 1);
    heritage.lineageValue = lineageValue;

    const buildClanTrack = (clanKey, role) => {
      if (!clanKey) return null;

      const clan = NARUTO25E.clans?.[clanKey];
      if (!clan) return null;

      const maxRank = NARUTO25E.getClanLineageCap(clanKey);
      const ranks = [];

      for (let rank = 1; rank <= maxRank; rank++) {
        const features = NARUTO25E.getClanLineageFeatures
          ? NARUTO25E.getClanLineageFeatures(clanKey, rank)
          : [];

        ranks.push({
          rank,
          unlocked: lineageValue >= rank,
          isCurrent: lineageValue === rank,
          label: `Rang ${rank}`,
          features,
          hasFeatures: features.length > 0
        });
      }

      return {
        key: clanKey,
        label: clan.label,
        role,
        maxRank,
        unlockedRanks: Math.min(lineageValue, maxRank),
        ranks
      };
    };

    heritage.tracks = [];

    if (mode === "clan") {
      const primaryTrack = buildClanTrack(heritage.clan, "Clan principal");
      if (primaryTrack) heritage.tracks.push(primaryTrack);
    }

    if (mode === "hybridClan") {
      const primaryTrack = buildClanTrack(heritage.clan, "Clan principal");
      const secondaryTrack = buildClanTrack(heritage.hybrid?.secondaryClan, "Clan secondaire");

      if (primaryTrack) heritage.tracks.push(primaryTrack);
      if (secondaryTrack) heritage.tracks.push(secondaryTrack);
    }

    if (mode === "hybridVoie") {
      const primaryTrack = buildClanTrack(heritage.clan, "Clan principal");

      if (primaryTrack) heritage.tracks.push(primaryTrack);
    }

    if (mode === "hiddenClan") {
      const hiddenClan = this._getHiddenClanData(heritage);
      const officialTrack = buildClanTrack(hiddenClan.officialClan, "Clan officiel");
      const realTrack = buildClanTrack(hiddenClan.realClan, "Réel Clan");

      if (officialTrack) {
        officialTrack.isSocialOnly = true;
        officialTrack.note = "Clan officiel/social : aucune mécanique de lignée par défaut.";
        heritage.tracks.push(officialTrack);
      }

      if (realTrack) {
        realTrack.isHiddenRealClan = true;
        realTrack.hiddenAwareness = hiddenClan.awareness;
        realTrack.hiddenAwarenessLabel = hiddenClan.state.label;
        realTrack.hiddenUnlocked = hiddenClan.unlocked;
        realTrack.hiddenLineageCap = this._getHiddenClanLineageCap();
        realTrack.unlockedRanks = Math.min(this._getEffectiveLineageValue(), realTrack.maxRank);

        for (const rank of realTrack.ranks) {
          rank.unlocked = this._getEffectiveLineageValue() >= rank.rank;
          rank.isCurrent = this._getEffectiveLineageValue() === rank.rank;
        }

        heritage.tracks.push(realTrack);
      }
    }
  }

  _prepareChakraAffinities(system) {
    if (!system.chakra) system.chakra = {};

    if (!system.chakra.affinities) {
      system.chakra.affinities = {
        primary: "",
        secondary: "",
        forced: [],
        extra: [],
        owned: [],
        unlockedByGM: false,
        notes: ""
      };
    }

    const affinities = system.chakra.affinities;
    const heritage = system.heritage ?? {};
    const mode = this._getNormalizedHeritageMode(heritage);

    if (!heritage.affinities) {
      heritage.affinities = {
        primary: "",
        secondary: "",
        forced: [],
        extra: [],
        notes: ""
      };
    }

    affinities.primary = affinities.primary ?? "";
    affinities.secondary = affinities.secondary ?? "";
    affinities.extra = Array.isArray(affinities.extra) ? affinities.extra : [];
    affinities.notes = affinities.notes ?? "";
    affinities.unlockedByGM = Boolean(affinities.unlockedByGM);

    const forcedAffinities = [];

    const addForcedAffinity = (affinityKey, options = {}) => {
      if (!affinityKey) return;

      const entry = {
        slot: options.slot ?? "",
        key: affinityKey,
        source: options.source ?? "clan",
        sourceKey: options.sourceKey ?? "",
        locked: options.locked !== false
      };

      const exists = forcedAffinities.some((candidate) => {
        return candidate.key === entry.key
          && candidate.slot === entry.slot
          && candidate.source === entry.source
          && candidate.sourceKey === entry.sourceKey;
      });

      if (!exists) forcedAffinities.push(entry);
    };

    const addClanAffinities = (clanKey) => {
      if (!clanKey || !NARUTO25E.getClanMandatoryAffinities) return;

      const mandatoryAffinities = NARUTO25E.getClanMandatoryAffinities(clanKey);

      for (const affinityKey of mandatoryAffinities) {
        let slot = "";

        if (clanKey === "uchiha" && affinityKey === "katon") {
          slot = "primary";
        }

        if (clanKey === "senju" && affinityKey === "doton") {
          slot = "primary";
        }

        if (clanKey === "senju" && affinityKey === "suiton") {
          slot = "secondary";
        }

        addForcedAffinity(affinityKey, {
          slot,
          source: "clan",
          sourceKey: clanKey,
          locked: true
        });
      }
    };

    for (const clanKey of this._getMechanicalClanKeys({ purpose: "requirements" })) {
      addClanAffinities(clanKey);
    }

    if (NARUTO25E.isCustomClanKey?.(heritage.clan)) {
      const customChoices = NARUTO25E.getCustomClanMandatoryChoices?.(heritage.customClan) ?? [];

      for (const choiceKey of customChoices) {
        const choice = NARUTO25E.getCustomClanChoiceData?.(choiceKey);

        if (choice?.type === "affinity" && choice.valid) {
          addForcedAffinity(choice.key, {
            slot: "",
            source: "customClan",
            sourceKey: "custom",
            locked: true
          });
        }
      }
    }

    affinities.forced = forcedAffinities;

    for (const entry of forcedAffinities) {
      if (!entry.locked) continue;

      if (entry.slot === "primary") {
        affinities.primary = entry.key;
      }

      if (entry.slot === "secondary") {
        affinities.secondary = entry.key;
      }
    }

    heritage.affinities.primary = affinities.primary;
    heritage.affinities.secondary = affinities.secondary;
    heritage.affinities.forced = forcedAffinities;
    heritage.affinities.extra = Array.isArray(heritage.affinities.extra)
      ? heritage.affinities.extra
      : [];
    heritage.affinities.notes = heritage.affinities.notes ?? "";

    const ownedAffinityKeys = new Set();

    const addAffinitySkill = (affinityKey, source) => {
      if (!affinityKey) return;

      ownedAffinityKeys.add(affinityKey);

      const skillKey = NARUTO25E.getAffinitySkillKey?.(affinityKey);
      if (!skillKey) return;

      this._addSkillCreationSource(system, skillKey, source);
    };

    for (const entry of affinities.forced) {
      addAffinitySkill(entry.key, "affinityForced");
    }

    const affinityCostMode = game.settings?.get("naruto-25e", "affinityCostMode") ?? "freePrimary";

    if (affinities.primary) {
      addAffinitySkill(
        affinities.primary,
        affinityCostMode === "freePrimary" ? "affinityPrimaryFree" : "affinityPrimary"
      );
    }

    if (affinities.secondary) {
      addAffinitySkill(affinities.secondary, "affinitySecondary");
    }

    for (const affinityKey of affinities.extra) {
      addAffinitySkill(affinityKey, "affinityExtra");
    }

    affinities.owned = Array.from(ownedAffinityKeys);
  }
    _getMissionSuccessCount(system, rank) {
    const missions = system.missions ?? {};

    const candidates = [
      missions?.[rank]?.completed,
      missions?.[rank]?.success,
      missions?.[rank]?.successes,
      missions?.[rank]?.reussies,
      missions?.[rank]?.succeeded,
      missions?.[`mission${rank.toUpperCase()}`]?.completed,
      missions?.[`mission${rank.toUpperCase()}`]?.success,
      missions?.[`mission${rank.toUpperCase()}`]?.successes,
      missions?.[`mission${rank.toUpperCase()}`]?.reussies,
      missions?.[`mission${rank.toUpperCase()}`]?.succeeded,
      missions?.completed?.[rank],
      missions?.success?.[rank],
      missions?.reussies?.[rank]
    ];

    for (const value of candidates) {
      if (Number.isFinite(Number(value))) return Number(value);
    }

    return 0;
  }

  _countBasesAtLeast(system, threshold) {
    return Object.values(system.bases ?? {}).filter((base) => {
      return Number(base.value ?? 0) >= threshold;
    }).length;
  }

  _countOwnedSkillsAtLeast(system, threshold, tagFilter) {
    return Object.values(system.skills ?? {}).filter((skill) => {
      if (!skill.owned) return false;
      if (Number(skill.natural ?? 0) < threshold) return false;

      const tags = skill.tags ?? [];
      return tagFilter(tags, skill);
    }).length;
  }

  _hasOwnedSkillAtLeast(system, threshold, tagFilter) {
    return this._countOwnedSkillsAtLeast(system, threshold, tagFilter) >= 1;
  }

  _getPromotionChecks(system, nextRankKey) {
    const xpTotal = Number(system.progression?.experience?.total ?? 0);

    const checks = [];

    const addCheck = (key, label, passed, detail = "") => {
      checks.push({
        key,
        label,
        passed: Boolean(passed),
        detail
      });
    };

    const nextRank = NARUTO25E.getRank(nextRankKey);

    addCheck(
      "xp",
      `XP minimale : ${nextRank.xp}`,
      xpTotal >= nextRank.xp,
      `${xpTotal} / ${nextRank.xp}`
    );

    if (nextRankKey === "geninD") {
      const missionsD = this._getMissionSuccessCount(system, "d");

      addCheck(
        "missionD",
        "Avoir réussi au moins 1 mission de rang D",
        missionsD >= 1,
        `${missionsD} / 1`
      );

      addCheck(
        "gm",
        "Validation MJ / examen Genin",
        false,
        "Validation manuelle requise"
      );
    }

    if (nextRankKey === "chuninD") {
      const missionsC = this._getMissionSuccessCount(system, "c");
      const basesAt5 = this._countBasesAtLeast(system, 5);

      const hasChakraNature5 = this._hasOwnedSkillAtLeast(system, 5, (tags) => {
        return tags.includes("chakraNature");
      });

      const hasCombatOrInfiltration5 = this._hasOwnedSkillAtLeast(system, 5, (tags) => {
        return tags.includes("combat") || tags.includes("infiltration");
      });

      addCheck(
        "missionsC",
        "Avoir réussi plus de 10 missions de rang C",
        missionsC >= 11,
        `${missionsC} / 11`
      );

      addCheck(
        "chakraNature5",
        "Avoir une nature de chakra au niveau Expérimenté",
        hasChakraNature5,
        "Compétence de nature de chakra à 5+"
      );

      addCheck(
        "combatInfiltration5",
        "Avoir une discipline de combat ou d’infiltration au niveau Expérimenté",
        hasCombatOrInfiltration5,
        "Compétence combat/infiltration à 5+"
      );

      addCheck(
        "bases5",
        "Avoir trois Bases à 5",
        basesAt5 >= 3,
        `${basesAt5} / 3`
      );

      addCheck(
        "gm",
        "Validation MJ / examen Chūnin",
        false,
        "Validation manuelle requise"
      );
    }

    if (nextRankKey === "joninD") {
      const missionsB = this._getMissionSuccessCount(system, "b");
      const basesAt7 = this._countBasesAtLeast(system, 7);

      const hasChakraNature7 = this._hasOwnedSkillAtLeast(system, 7, (tags) => {
        return tags.includes("chakraNature");
      });

      const combatOrInfiltration7Count = this._countOwnedSkillsAtLeast(system, 7, (tags) => {
        return tags.includes("combat") || tags.includes("infiltration");
      });

      addCheck(
        "missionsB",
        "Avoir réussi plus de 10 missions de rang B",
        missionsB >= 11,
        `${missionsB} / 11`
      );

      addCheck(
        "chakraNature7",
        "Avoir une nature de chakra au niveau Maîtrise",
        hasChakraNature7,
        "Compétence de nature de chakra à 7+"
      );

      addCheck(
        "combatInfiltration7",
        "Avoir deux disciplines de combat ou d’infiltration au niveau Maîtrise",
        combatOrInfiltration7Count >= 2,
        `${combatOrInfiltration7Count} / 2`
      );

      addCheck(
        "bases7",
        "Avoir trois Bases à 7",
        basesAt7 >= 3,
        `${basesAt7} / 3`
      );

      addCheck(
        "gm",
        "Validation MJ / comité Jōnin",
        false,
        "Validation manuelle requise"
      );
    }

    if (["joninS", "sanninAA", "kageSplus"].includes(nextRankKey)) {
      addCheck(
        "gmSpecial",
        "Validation MJ recommandée pour rang spécial",
        false,
        "Sensei / Sannin / Kage"
      );
    }

    return checks;
  }

    _getInterceptionUsesFromScore(score) {
    const value = Math.max(0, Number(score ?? 0));

    if (value >= 10) return 5;
    if (value >= 8) return 4;
    if (value >= 6) return 3;
    if (value >= 4) return 2;
    if (value >= 1) return 1;

    return 0;
  }

  _normalizeDamageData(damage = {}) {
    const normalized = foundry.utils.deepClone(damage ?? {});

    normalized.formula = String(normalized.formula ?? "");
    normalized.type = String(normalized.type ?? "none");
    normalized.scaling = String(normalized.scaling ?? "");
    normalized.calculation = normalized.calculation ?? {};
    normalized.calculation.enabled = Boolean(normalized.calculation.enabled);
    normalized.calculation.bases = Array.isArray(normalized.calculation.bases)
      ? normalized.calculation.bases
          .map((base) => String(base ?? "").trim())
          .filter(Boolean)
      : [];
    normalized.calculation.flat = Number(normalized.calculation.flat ?? 0);
    normalized.calculation.perItem = Math.max(0, Number(normalized.calculation.perItem ?? 0));
    normalized.calculation.perItemLimitBase = String(normalized.calculation.perItemLimitBase ?? "");
    normalized.calculation.condition = String(normalized.calculation.condition ?? "");

    return normalized;
  }

  _getDamageBaseValue(baseKey) {
    const key = String(baseKey ?? "").toLowerCase();
    const base = this.system.bases?.[key];

    if (!base) return 0;

    const baseValue = Number(base.value ?? 0) + Number(base.bonus ?? 0);
    const effectModifierSummary = this._getNarutoEffectModifierSummary("base", {
      key,
      baseKey: key
    });

    return Math.max(0, baseValue + Number(effectModifierSummary.total ?? 0));
  }

  _getDamageDefenseKey(damageType = "physical") {
    const type = String(damageType ?? "physical").toLowerCase();

    if (["mental", "psychic", "spiritual", "emotional"].includes(type)) {
      return "caractere";
    }

    return "vigueur";
  }

  _getDamageDefenseLabel(defenseKey = "vigueur") {
    return defenseKey === "caractere" ? "Caractère" : "Vigueur";
  }

  _getDamageDefenseValue(defenseKey = "vigueur", targetActor = null) {
    const actor = targetActor ?? this;

    if (defenseKey === "caractere") {
      return Math.max(0, Number(actor.system.resources?.caractere?.value ?? actor.system.resources?.caractere?.max ?? 0));
    }

    return Math.max(0, Number(actor.system.resources?.vigueur?.value ?? actor.system.resources?.vigueur?.max ?? 0));
  }

  _calculateDamageData(damage = {}, options = {}) {
    const normalized = this._normalizeDamageData(damage);
    const calculation = normalized.calculation ?? {};

    if (!calculation.enabled) {
      return {
        calculable: false,
        formula: normalized.formula,
        type: normalized.type,
        total: 0,
        baseTotal: 0,
        flat: 0,
        perItemBonus: 0,
        perItemCount: 0,
        parts: [],
        reason: "Aucun calcul de dégâts automatisé n’est défini."
      };
    }

    const parts = [];
    let baseTotal = 0;

    for (const baseKey of calculation.bases ?? []) {
      const value = this._getDamageBaseValue(baseKey);
      baseTotal += value;

      parts.push({
        key: baseKey,
        label: NARUTO25E.baseLabels?.[baseKey] ?? baseKey,
        value
      });
    }

    const flat = Number(calculation.flat ?? 0);
    const perItemCount = Math.max(0, Number(options.perItemCount ?? 0));
    const perItem = Math.max(0, Number(calculation.perItem ?? 0));
    const limitBaseKey = String(calculation.perItemLimitBase ?? "");
    const limit = limitBaseKey ? Math.max(0, this._getDamageBaseValue(limitBaseKey)) : null;
    const rawPerItemBonus = perItem * perItemCount;
    const perItemBonus = limit === null ? rawPerItemBonus : Math.min(rawPerItemBonus, limit);

    const effectModifierSummary = this._getNarutoEffectModifierSummary("damage", {
      key: options.effectOptions?.key ?? normalized.type,
      kind: options.effectOptions?.kind ?? "",
      damageType: options.effectOptions?.damageType ?? normalized.type,
      itemId: options.effectOptions?.itemId ?? "",
      itemType: options.effectOptions?.itemType ?? "",
      targetType: options.effectOptions?.targetType ?? ""
    });

    const effectBonus = Number(effectModifierSummary.total ?? 0);
    const total = Math.max(0, baseTotal + flat + perItemBonus + effectBonus);

    return {
      calculable: true,
      formula: normalized.formula,
      type: normalized.type,
      total,
      baseTotal,
      flat,
      perItemBonus,
      effectBonus,
      effectModifierSummary,
      perItemCount,
      perItem,
      perItemLimitBase: limitBaseKey,
      perItemLimit: limit,
      parts,
      condition: String(calculation.condition ?? "")
    };
  }

  _createDamageButtonHtml(damageAvailable = false) {
    if (!damageAvailable) return "";

    return `
      <div class="button-row">
        <button type="button" class="naruto-chat-damage-roll">
          Calculer les dégâts
        </button>
      </div>
    `;
  }

  _getPrimaryOwnerColor() {
    const ownership = this.ownership ?? {};
    const owner = Array.from(game.users ?? []).find((user) => {
      if (!user || user.isGM) return false;

      const level = Number(ownership[user.id] ?? ownership.default ?? 0);

      return level >= CONST.DOCUMENT_OWNERSHIP_LEVELS.OWNER;
    });

    return owner?.color ?? "";
  }

  _getStyledActorNameHtml(actor = this) {
    const safeName = foundry.utils.escapeHTML?.(actor?.name ?? "—") ?? (actor?.name ?? "—");
    const ownership = actor?.ownership ?? {};

    const owner = Array.from(game.users ?? []).find((user) => {
      if (!user || user.isGM) return false;

      const level = Number(ownership[user.id] ?? ownership.default ?? 0);

      return level >= CONST.DOCUMENT_OWNERSHIP_LEVELS.OWNER;
    });

    const color = owner?.color ?? "";

    if (!color) return `<strong>${safeName}</strong>`;

    return `<strong class="naruto-chat-actor-name" style="color: ${foundry.utils.escapeHTML?.(color) ?? color};">${safeName}</strong>`;
  }

  async _createDamageChatCard(payload = {}) {
    const damage = this._normalizeDamageData(payload.damage ?? {});
    const damageResult = this._calculateDamageData(damage, {
      perItemCount: Number(payload.perItemCount ?? 0),
      effectOptions: {
        key: payload.damageKey ?? payload.kind ?? payload.damageType ?? damage.type,
        kind: payload.kind ?? "",
        damageType: payload.damageType ?? damage.type,
        itemId: payload.itemId ?? "",
        itemType: payload.itemType ?? "",
        targetType: payload.targetType ?? ""
      }
    });

    const targetActor = payload.targetActorId
      ? game.actors?.get(payload.targetActorId)
      : null;

    const defenseKey = this._getDamageDefenseKey(payload.damageType ?? damage.type);
    const defenseLabel = this._getDamageDefenseLabel(defenseKey);
    const defenseValue = targetActor
      ? this._getDamageDefenseValue(defenseKey, targetActor)
      : 0;
    const passingDamage = targetActor
      ? Math.max(0, damageResult.total - defenseValue)
      : damageResult.total;

    const safe = (value) => foundry.utils.escapeHTML?.(String(value ?? "")) ?? String(value ?? "");
    const safeSourceName = safe(payload.sourceName ?? "Dégâts");
    const safeTargetName = targetActor ? safe(targetActor.name) : "—";
    const safeFormula = safe(damageResult.formula || "—");
    const safeType = safe(payload.damageType ?? damage.type ?? "physical");
    const safeCondition = safe(damageResult.condition ?? "");
    const actorNameHtml = this._getStyledActorNameHtml(this);
    const targetNameHtml = targetActor ? this._getStyledActorNameHtml(targetActor) : "<strong>—</strong>";

    const partsText = damageResult.parts?.length
      ? damageResult.parts.map((part) => `${safe(part.label)} ${Number(part.value ?? 0)}`).join(" + ")
      : "—";
    const effectModifierSummaryHtml = this._getNarutoEffectModifierSummaryHtml(damageResult.effectModifierSummary);
    const itemThemeClass = String(payload.itemThemeClass ?? "");

    await ChatMessage.create({
      speaker: ChatMessage.getSpeaker({ actor: this }),
      flavor: `Dégâts — ${safeSourceName}`,
      content: `
        <div class="naruto-roll-card naruto-damage-card ${itemThemeClass}">
          <header class="naruto-roll-header">
            <h3>Dégâts — ${safeSourceName}</h3>
          </header>

          <div class="naruto-chat-info-list">
            <div>
              <strong>Source</strong>
              <span>${safeSourceName}</span>
            </div>

            <div>
              <strong>Attaquant</strong>
              <span>${actorNameHtml}</span>
            </div>

            <div>
              <strong>Cible</strong>
              <span>${targetNameHtml}</span>
            </div>
          </div>

          ${damageResult.calculable ? `
            <div class="naruto-roll-result naruto-damage-total">
              ${damageResult.total}
            </div>

            <div class="naruto-chat-info-list">
              <div>
                <strong>Formule</strong>
                <span>${safeFormula}</span>
              </div>

              <div>
                <strong>Détail</strong>
                <span>${partsText}${damageResult.flat ? ` + ${damageResult.flat}` : ""}${damageResult.perItemBonus ? ` + cumul ${damageResult.perItemBonus}` : ""}${damageResult.effectBonus ? ` + effets ${damageResult.effectBonus}` : ""}</span>
              </div>

              <div>
                <strong>Type</strong>
                <span>${safeType}</span>
              </div>

              ${safeCondition ? `
                <div>
                  <strong>Condition</strong>
                  <span>${safeCondition}</span>
                </div>
              ` : ""}
            </div>

            ${effectModifierSummaryHtml}

            ${targetActor ? `
              <div class="naruto-damage-breakdown is-readable">
                <div>
                  <span>Dégâts bruts</span>
                  <strong>${damageResult.total}</strong>
                </div>

                <div>
                  <span>${safe(defenseLabel)}</span>
                  <strong>-${defenseValue}</strong>
                </div>

                <div>
                  <span>Dégâts qui passent</span>
                  <strong>${passingDamage}</strong>
                </div>
              </div>

              ${passingDamage > 0 ? `
                <div class="button-row">
                  <button
                    type="button"
                    class="naruto-chat-health-apply"
                    data-target-actor-id="${targetActor.id}"
                    data-damage="${passingDamage}"
                    data-damage-type="${safeType}"
                    data-source-name="${safeSourceName}"
                  >
                    Appliquer à la santé de ${safeTargetName}
                  </button>
                </div>
              ` : `
                <p>Aucun dégât ne passe la défense passive de ${targetNameHtml}.</p>
              `}
            ` : `
              <p>Aucune cible de dégâts renseignée : dégâts bruts ${damageResult.total}.</p>
            `}
          ` : `
            <div class="naruto-roll-result">
              Manuel
            </div>

            <p>${safe(damageResult.reason)}</p>
            <p>Formule papier : ${safeFormula}</p>
          `}
        </div>
      `
    });

    return damageResult;
  }

  async rollTechniqueDamage(itemId) {
    const item = this.items.get(itemId);

    if (!item || item.type !== "technique") {
      ui.notifications.warn("Technique introuvable.");
      return null;
    }

    const targets = Array.from(game.user?.targets ?? []);
    const targetActor = targets.length === 1 ? targets[0]?.actor : null;

    return this._createDamageChatCard({
      sourceName: item.name,
      sourceType: "technique",
      itemId,
      itemType: item.type,
      targetType: "technique",
      damageKey: item.system?.skill ?? item.system?.family ?? "technique",
      kind: item.system?.skill ?? item.system?.family ?? "technique",
      targetActorId: targetActor?.id ?? "",
      damage: item.system.damage ?? {},
      damageType: this._getTechniqueDamageType(item)
    });
  }

  async rollInventoryCombatDamage(itemId) {
    const item = this.system.inventory?.items?.find((entry) => entry.id === itemId);

    if (!item) {
      ui.notifications.warn("Objet introuvable.");
      return null;
    }

    const targets = Array.from(game.user?.targets ?? []);
    const targetActor = targets.length === 1 ? targets[0]?.actor : null;

    return this._createDamageChatCard({
      sourceName: item.name,
      sourceType: "inventory",
      itemId,
      itemType: item.type ?? "inventory",
      targetType: item.type === "arme" ? "weapon" : "custom",
      damageKey: item.type ?? "inventory",
      kind: item.type ?? "inventory",
      targetActorId: targetActor?.id ?? "",
      damage: item.damage ?? {
        formula: this._extractInventoryDamageFormula(item),
        type: "physical",
        calculation: {
          enabled: false
        }
      },
      damageType: item.damage?.type ?? "physical"
    });
  }

  async rollDamageFromChatMessage(message) {
    const payload = message?.getFlag?.("naruto-25e", "damagePayload");

    if (!payload) {
      ui.notifications.warn("Aucune donnée de dégâts trouvée sur cette carte.");
      return null;
    }

    return this._createDamageChatCard(payload);
  }

  _getCombatDefenseValue(defenseKey) {
    if (defenseKey === "caractere") {
      return Number(this.system.resources?.caractere?.value ?? this.system.resources?.caractere?.max ?? 0);
    }

    return Number(this.system.resources?.vigueur?.value ?? this.system.resources?.vigueur?.max ?? 0);
  }

  _prepareCombat(system) {
    if (!system.combat) system.combat = {};

    const combat = system.combat;
    const chakraBonuses = system.chakra?.specializationBonuses ?? {};

    combat.initiative = combat.initiative ?? {};
    combat.attacks = combat.attacks ?? {};
    combat.attacks.arm = combat.attacks.arm ?? {};
    combat.attacks.tai = combat.attacks.tai ?? {};
    combat.damage = combat.damage ?? {};
    combat.damage.arm = combat.damage.arm ?? {};
    combat.damage.tai = combat.damage.tai ?? {};
    combat.interceptions = combat.interceptions ?? {};
    combat.interceptions.arm = combat.interceptions.arm ?? {};
    combat.interceptions.tai = combat.interceptions.tai ?? {};
    combat.actions = combat.actions ?? {};
    combat.health = combat.health ?? {};
    combat.health.reserves = combat.health.reserves ?? {};
    combat.health.reserves.lineageA = combat.health.reserves.lineageA ?? {};
    combat.health.reserves.lineageB = combat.health.reserves.lineageB ?? {};
    combat.health.woundCalculator = combat.health.woundCalculator ?? {};

    const cor = this._getBaseEffective(system, "cor");
    const arm = this._getBaseEffective(system, "arm");
    const tai = this._getBaseEffective(system, "tai");

    const getSkillTotal = (skillKey) => {
      return Number(system.skills?.[skillKey]?.total ?? 0);
    };

    const physique = getSkillTotal("physique");
    const armesSimples = getSkillTotal("armesSimples");
    const corpsACorps = getSkillTotal("corpsACorps");

    // Initiative databook : 1d10 + Physique + bonus/malus.
    combat.initiative.skill = "physique";
    combat.initiative.base = physique;
    combat.initiative.bonus = Number(combat.initiative.bonus ?? 0);
    combat.initiative.specializationBonus = Number(chakraBonuses.initiative ?? 0);
    combat.initiative.total = combat.initiative.base + combat.initiative.bonus + combat.initiative.specializationBonus;
    combat.initiative.formula = `1d10 + ${combat.initiative.total}`;

    // Attaques basiques provisoires, en attendant les jets directement depuis armes/techniques.
    combat.attacks.arm.label = "Attaque ARM basique";
    combat.attacks.arm.skill = "armesSimples";
    combat.attacks.arm.bonus = Number(combat.attacks.arm.bonus ?? 0);
    combat.attacks.arm.total = Math.max(armesSimples, arm) + combat.attacks.arm.bonus;

    combat.attacks.tai.label = "Attaque TAI basique";
    combat.attacks.tai.skill = "corpsACorps";
    combat.attacks.tai.bonus = Number(combat.attacks.tai.bonus ?? 0);
    combat.attacks.tai.total = Math.max(corpsACorps, tai) + combat.attacks.tai.bonus;

    // Dégâts basiques databook.
    combat.damage.arm.weaponBonus = Math.max(0, Number(combat.damage.arm.weaponBonus ?? 1));
    combat.damage.arm.base = cor + arm + combat.damage.arm.weaponBonus;
    combat.damage.arm.bonus = Number(combat.damage.arm.bonus ?? 0);
    combat.damage.arm.specializationBonus = Number(chakraBonuses.armDamage ?? 0);
    combat.damage.arm.total = combat.damage.arm.base + combat.damage.arm.bonus + combat.damage.arm.specializationBonus;

    combat.damage.tai.base = cor + tai;
    combat.damage.tai.bonus = Number(combat.damage.tai.bonus ?? 0);
    combat.damage.tai.specializationBonus = Number(chakraBonuses.taiDamage ?? 0);
    combat.damage.tai.total = combat.damage.tai.base + combat.damage.tai.bonus + combat.damage.tai.specializationBonus;

    // Interceptions databook : le score ARM/TAI donne un nombre d'interceptions par paliers.
    combat.interceptions.arm.base = this._getInterceptionUsesFromScore(arm);
    combat.interceptions.arm.bonus = Number(combat.interceptions.arm.bonus ?? 0);
    combat.interceptions.arm.total = Math.max(0, combat.interceptions.arm.base + combat.interceptions.arm.bonus);
    combat.interceptions.arm.rollTotal = arm;

    combat.interceptions.tai.base = this._getInterceptionUsesFromScore(tai);
    combat.interceptions.tai.bonus = Number(combat.interceptions.tai.bonus ?? 0);
    combat.interceptions.tai.total = Math.max(0, combat.interceptions.tai.base + combat.interceptions.tai.bonus);
    combat.interceptions.tai.rollTotal = tai;

    combat.quickSkill = combat.quickSkill ?? "";

    combat.actions.simpleAvailable = combat.actions.simpleAvailable !== false;
    combat.actions.complexAvailable = combat.actions.complexAvailable !== false;
    combat.actions.delayedAvailable = Boolean(combat.actions.delayedAvailable);
    combat.actions.delayedTurnGraceUsed = Boolean(combat.actions.delayedTurnGraceUsed);
    combat.actions.delayedCreatedRound = Math.max(0, Number(combat.actions.delayedCreatedRound ?? 0));
    combat.actions.delayedCreatedTurn = Math.max(0, Number(combat.actions.delayedCreatedTurn ?? 0));
    combat.actions.delayedCreatedCombatantId = String(combat.actions.delayedCreatedCombatantId ?? "");
    combat.actions.notes = combat.actions.notes ?? "";

    if (!combat.actions.delayedAvailable) {
      combat.actions.delayedTurnGraceUsed = false;
      combat.actions.delayedCreatedRound = 0;
      combat.actions.delayedCreatedTurn = 0;
      combat.actions.delayedCreatedCombatantId = "";
    }

    combat.counters = combat.counters ?? {};
    combat.counters.interceptions = combat.counters.interceptions ?? {};
    combat.counters.interceptions.arm = combat.counters.interceptions.arm ?? {};
    combat.counters.interceptions.tai = combat.counters.interceptions.tai ?? {};
    combat.counters.defenses = combat.counters.defenses ?? {};
    combat.counters.defenses.esquive = combat.counters.defenses.esquive ?? {};
    combat.counters.defenses.parade = combat.counters.defenses.parade ?? {};
    combat.counters.lineagePowers = combat.counters.lineagePowers ?? {};

    const prepareCounter = (counter, max) => {
      counter.max = Math.max(0, Number(max ?? 0));

      if (!Number.isFinite(Number(counter.remaining))) {
        counter.remaining = counter.max;
      }

      counter.remaining = this._clampNumber(
        Number(counter.remaining ?? counter.max),
        0,
        counter.max
      );
    };

    prepareCounter(combat.counters.interceptions.arm, combat.interceptions.arm.total);
    prepareCounter(combat.counters.interceptions.tai, combat.interceptions.tai.total);


    prepareCounter(combat.counters.defenses.esquive, 1);
    prepareCounter(combat.counters.defenses.parade, 1);

    combat.defenses = combat.defenses ?? {};
    combat.defenses.physical = combat.defenses.physical ?? {};
    combat.defenses.mental = combat.defenses.mental ?? {};

    combat.defenses.physical.vigueur = Math.max(0, Number(system.resources?.vigueur?.value ?? 0));
    combat.defenses.physical.label = "Vigueur";
    combat.defenses.mental.caractere = Math.max(0, Number(system.resources?.caractere?.value ?? 0));
    combat.defenses.mental.label = "Caractère";
    combat.defenses.mental.activeSkill = "mental";

    const previousLineageMax = Math.max(0, Number(combat.counters.lineagePowers.max ?? 0));
    const previousLineageRemaining = Number(combat.counters.lineagePowers.remaining);

    const lineageBaseUses = Math.max(0, this._getBaseEffective(system, "lign"));
    const lineageBonusUses = Math.max(0, Number(system.chakra?.specializationBonuses?.lineagePowerUses ?? 0));
    const lineageMaxUses = lineageBaseUses + lineageBonusUses;

    combat.counters.lineagePowers.base = lineageBaseUses;
    combat.counters.lineagePowers.bonus = lineageBonusUses;
    combat.counters.lineagePowers.max = lineageMaxUses;
    combat.counters.lineagePowers.usedThisTurn = Boolean(combat.counters.lineagePowers.usedThisTurn);

    let lineageRemaining;

    if (!Number.isFinite(previousLineageRemaining)) {
      lineageRemaining = lineageMaxUses;
    } else if (previousLineageMax <= 0 && previousLineageRemaining <= 0 && lineageMaxUses > 0) {
      lineageRemaining = lineageMaxUses;
    } else {
      lineageRemaining = previousLineageRemaining;
    }

    if (previousLineageMax > 0 && lineageMaxUses > previousLineageMax) {
      lineageRemaining += lineageMaxUses - previousLineageMax;
    }

    combat.counters.lineagePowers.remaining = this._clampNumber(
      lineageRemaining,
      0,
      lineageMaxUses
    );

    // Santé / paliers.
    combat.health.manualState = combat.health.manualState ?? "none";
    combat.health.conditions = combat.health.conditions ?? "";
    combat.health.aggravations = combat.health.aggravations ?? "";
    combat.health.weaknesses = combat.health.weaknesses ?? "";
    combat.health.notes = combat.health.notes ?? "";

    combat.health.damageTrack = combat.health.damageTrack ?? {};
    combat.health.damageTrack.value = Math.max(0, Number(combat.health.damageTrack.value ?? 0));
    combat.health.damageTrack.segmentSize = Math.max(1, Number(combat.health.damageTrack.segmentSize ?? 5));
    combat.health.damageTrack.criticalThreshold = Math.max(1, Number(combat.health.damageTrack.criticalThreshold ?? 6));
    combat.health.damageTrack.criticalBonusSegments = Math.max(0, Number(combat.health.damageTrack.criticalBonusSegments ?? 1));
    combat.health.damageTrack.useCriticalShock = combat.health.damageTrack.useCriticalShock !== false;
    combat.health.damageTrack.reserves = combat.health.damageTrack.reserves ?? {};

    combat.health.damageTrack.reserves.spiritA = combat.health.damageTrack.reserves.spiritA ?? {};
    combat.health.damageTrack.reserves.spiritA.enabled = Boolean(combat.health.damageTrack.reserves.spiritA.enabled);
    combat.health.damageTrack.reserves.spiritA.label = combat.health.damageTrack.reserves.spiritA.label ?? "Esprit A";

    combat.health.damageTrack.reserves.spiritB = combat.health.damageTrack.reserves.spiritB ?? {};
    combat.health.damageTrack.reserves.spiritB.enabled = Boolean(combat.health.damageTrack.reserves.spiritB.enabled);
    combat.health.damageTrack.reserves.spiritB.label = combat.health.damageTrack.reserves.spiritB.label ?? "Esprit B";

    combat.health.damageTrack.reserves.woundA = combat.health.damageTrack.reserves.woundA ?? {};
    combat.health.damageTrack.reserves.woundA.enabled = Boolean(combat.health.damageTrack.reserves.woundA.enabled);
    combat.health.damageTrack.reserves.woundA.label = combat.health.damageTrack.reserves.woundA.label ?? "Blessure A";

    combat.health.damageTrack.reserves.woundB = combat.health.damageTrack.reserves.woundB ?? {};
    combat.health.damageTrack.reserves.woundB.enabled = Boolean(combat.health.damageTrack.reserves.woundB.enabled);
    combat.health.damageTrack.reserves.woundB.label = combat.health.damageTrack.reserves.woundB.label ?? "Blessure B";

    combat.health.woundCalculator.incomingDamage = Math.max(
      0,
      Number(combat.health.woundCalculator.incomingDamage ?? 0)
    );
    combat.health.woundCalculator.defense = combat.health.woundCalculator.defense ?? "vigueur";
    combat.health.woundCalculator.damageType = combat.health.woundCalculator.damageType ?? "PHY";

    const chakraValue = Number(system.resources?.chakra?.value ?? 0);

    if (chakraValue < 10) {
      combat.health.chakraState = "blessure2";
    } else if (chakraValue < 30) {
      combat.health.chakraState = "blessure1";
    } else if (chakraValue < 50) {
      combat.health.chakraState = "sonne";
    } else {
      combat.health.chakraState = "none";
    }

    combat.health.reserves.lineageA.label = combat.health.reserves.lineageA.label ?? "Lignée A";
    combat.health.reserves.lineageA.enabled = Boolean(combat.health.reserves.lineageA.enabled);
    combat.health.reserves.lineageA.checked = Boolean(combat.health.reserves.lineageA.checked);

    combat.health.reserves.lineageB.label = combat.health.reserves.lineageB.label ?? "Lignée B";
    combat.health.reserves.lineageB.enabled = Boolean(combat.health.reserves.lineageB.enabled);
    combat.health.reserves.lineageB.checked = Boolean(combat.health.reserves.lineageB.checked);
  }

  _prepareRankProgression(system) {
    if (!system.progression) system.progression = {};
    if (!system.progression.rank) {
      system.progression.rank = {
        current: "aspirant",
        lastPromotion: "",
        promotionNotes: ""
      };
    }

    const rankData = system.progression.rank;
    const currentKey = rankData.current ?? "aspirant";
    const currentRank = NARUTO25E.getRank(currentKey);
    const nextKey = NARUTO25E.getNextRankKey(currentKey);
    const nextRank = nextKey ? NARUTO25E.getRank(nextKey) : null;

    rankData.currentLabel = currentRank.label;
    rankData.currentShortLabel = currentRank.shortLabel;
    rankData.currentBaseCap = currentRank.baseCap;

    if (!nextKey || !nextRank) {
      rankData.next = null;
      rankData.canPromote = false;
      rankData.checks = [];
      return;
    }

    const checks = this._getPromotionChecks(system, nextKey);
    const blockingChecks = checks.filter((check) => {
      return check.key !== "gm" && check.key !== "gmSpecial";
    });

    const automaticChecksPassed = blockingChecks.every((check) => check.passed);
    const requiresGM = Boolean(nextRank.requiresGM) || checks.some((check) => {
      return check.key === "gm" || check.key === "gmSpecial";
    });

    rankData.next = {
      key: nextKey,
      label: nextRank.label,
      shortLabel: nextRank.shortLabel,
      xp: nextRank.xp,
      baseCap: nextRank.baseCap,
      requiresGM
    };

    rankData.checks = checks;
    rankData.automaticChecksPassed = automaticChecksPassed;
    rankData.requiresGM = requiresGM;
    rankData.canPromote = automaticChecksPassed;
  }

  getCurrentRankKey() {
    return this.system.progression?.rank?.current ?? "aspirant";
  }

  getCurrentRank() {
    return NARUTO25E.getRank(this.getCurrentRankKey());
  }

  getCurrentBaseCap() {
    return Number(this.getCurrentRank().baseCap ?? 3);
  }

  async adjustRyo(delta) {
    if (this.type !== "shinobi") return;

    if (!this.canUserEditRyo(game.user)) {
      ui.notifications.warn("Seul le MJ peut modifier les Ryō de cette fiche.");
      return;
    }

    const amount = Number(delta ?? 0);

    if (!Number.isFinite(amount) || amount === 0) {
      ui.notifications.warn("Montant de Ryō invalide.");
      return;
    }

    const current = Number(this.system.inventory?.ryo ?? 0);
    const next = Math.max(0, current + amount);

    await this.update({
      "system.inventory.ryo": next,
      "system.inventory.ryoDelta": 0
    });

    const sign = amount > 0 ? "+" : "";
    ui.notifications.info(`Ryō : ${current} → ${next} (${sign}${amount}).`);
  }

  async setPlayerRyoPermission(allowed) {
    if (this.type !== "shinobi") return;

    if (!game.user.isGM) {
      ui.notifications.warn("Seul le MJ peut modifier cette permission.");
      return;
    }

    await this.update({
      "system.inventory.permissions.allowPlayerRyoEdit": Boolean(allowed)
    });
  }

  async setNindoUnlockedByGM(allowed) {
    if (this.type !== "shinobi") return;

    if (!game.user.isGM) {
      ui.notifications.warn("Seul le MJ peut modifier cette permission.");
      return;
    }

    await this.update({
      "system.nindo.unlockedByGM": Boolean(allowed)
    });
  }

  async _preUpdate(changed, options, user) {
    const allowed = await super._preUpdate(changed, options, user);
    if (allowed === false) return false;

    if (this.type !== "shinobi") return allowed;

    const updatingUser = typeof user === "string"
      ? game.users?.get(user)
      : (user ?? game.user);

    const isGM = Boolean(updatingUser?.isGM);
    const allowNindoActionUpdate = Boolean(options?.naruto25e?.allowNindoActionUpdate);
    const allowCreationLockUpdate = Boolean(options?.naruto25e?.allowCreationLockUpdate);

    if (isGM) return allowed;

    const creationLocked = this.isCreationLocked();

    const flat = foundry.utils.flattenObject(changed);

    if (!game.user.isGM) {
      const playerForbiddenPaths = [
        "system.progression.experience.total",
        "system.progression.experience.spent",
        "system.progression.experience.available",
        "system.combat.counters.lineagePowers.base",
        "system.combat.counters.lineagePowers.max"
      ];

      for (const path of playerForbiddenPaths) {
        if (foundry.utils.hasProperty(changed, path)) {
          foundry.utils.deleteProperty(changed, path);
        }
      }
    }

    if (!creationLocked) {
      for (const [path, value] of Object.entries(flat)) {
        const match = path.match(/^system\.skills\.([^.]+)\.owned$/);
        if (!match) continue;

        const skillKey = match[1];
        const definition = NARUTO25E.skillDefinitions?.[skillKey];
        const currentSkill = this.system.skills?.[skillKey] ?? {};

        const checked = Boolean(value);

        /*
          Les compétences communes sont toujours possédées par défaut.
          Elles ne doivent jamais devenir des "Choix initial".
        */
        if (definition?.ownedByDefault) {
          foundry.utils.setProperty(
            changed,
            `system.skills.${skillKey}.manualOwned`,
            false
          );

          foundry.utils.deleteProperty(
            changed,
            `system.skills.${skillKey}.owned`
          );

          continue;
        }

        /*
          Les compétences de clan ne sont pas choisies manuellement.
          Elles doivent venir du clan / de la voie / de l’hybridation.
        */
        if (definition?.category === "clan") {
          foundry.utils.setProperty(
            changed,
            `system.skills.${skillKey}.manualOwned`,
            false
          );

          foundry.utils.deleteProperty(
            changed,
            `system.skills.${skillKey}.owned`
          );

          continue;
        }

        const sources = Array.isArray(currentSkill.creationSources)
          ? currentSkill.creationSources
          : [];

        const hasManualSource = sources.includes("manual") || Boolean(currentSkill.manualOwned);

        /*
          Logique importante :
          - Si la compétence était déjà possédée par affinité/clan, une checkbox cochée
            ne doit PAS la transformer en choix initial.
          - Si elle n’était pas possédée avant et qu’elle arrive cochée, là oui :
            c’est un vrai choix manuel.
          - Si elle est décochée, on retire le choix manuel.
        */
        if (checked) {
          if (!currentSkill.owned || hasManualSource) {
            foundry.utils.setProperty(
              changed,
              `system.skills.${skillKey}.manualOwned`,
              true
            );
          }
        } else {
          foundry.utils.setProperty(
            changed,
            `system.skills.${skillKey}.manualOwned`,
            false
          );
        }

        foundry.utils.deleteProperty(
          changed,
          `system.skills.${skillKey}.owned`);
      }
    }

        /*
          Nettoyage des compétences données par affinité.

          Cas corrigé :
          - Katon est donné par affinité principale.
          - Le joueur remplace Katon par Suiton.
          - La fiche renvoie encore Katon comme "owned" pendant l'update.
          - Sans ce nettoyage, Katon devient à tort un "Choix initial".

          On retire donc le statut manuel uniquement si :
          - la compétence venait d'une affinité,
          - elle n'est plus dans les affinités sélectionnées,
          - elle n'avait pas été choisie manuellement avant.
        */
        const affinityPaths = [
          "system.chakra.affinities.primary",
          "system.chakra.affinities.secondary",
          "system.chakra.affinities.extra"
        ];

        const hasAffinityChange = affinityPaths.some((path) => {
          return foundry.utils.hasProperty(changed, path);
        });

        if (!creationLocked && hasAffinityChange) {
          const getAffinitySkillKey = (affinityKey) => {
            if (!affinityKey) return null;
            return NARUTO25E.getAffinitySkillKey?.(affinityKey) ?? null;
          };

          const oldAffinities = this.system.chakra?.affinities ?? {};

          const oldAffinityKeys = new Set([
            oldAffinities.primary,
            oldAffinities.secondary,
            ...(Array.isArray(oldAffinities.extra) ? oldAffinities.extra : [])
          ].filter(Boolean));

          const newPrimary = foundry.utils.hasProperty(changed, "system.chakra.affinities.primary")
            ? foundry.utils.getProperty(changed, "system.chakra.affinities.primary")
            : oldAffinities.primary;

          const newSecondary = foundry.utils.hasProperty(changed, "system.chakra.affinities.secondary")
            ? foundry.utils.getProperty(changed, "system.chakra.affinities.secondary")
            : oldAffinities.secondary;

          const newExtraRaw = foundry.utils.hasProperty(changed, "system.chakra.affinities.extra")
            ? foundry.utils.getProperty(changed, "system.chakra.affinities.extra")
            : oldAffinities.extra;

          const newExtra = Array.isArray(newExtraRaw) ? newExtraRaw : [];

          const newAffinityKeys = new Set([
            newPrimary,
            newSecondary,
            ...newExtra
          ].filter(Boolean));

          const oldAffinitySkillKeys = new Set(
            Array.from(oldAffinityKeys)
              .map(getAffinitySkillKey)
              .filter(Boolean)
          );

          const newAffinitySkillKeys = new Set(
            Array.from(newAffinityKeys)
              .map(getAffinitySkillKey)
              .filter(Boolean)
          );

          for (const skillKey of oldAffinitySkillKeys) {
            if (newAffinitySkillKeys.has(skillKey)) continue;

            const currentSkill = this.system.skills?.[skillKey];
            if (!currentSkill) continue;

            const sources = Array.isArray(currentSkill.creationSources)
              ? currentSkill.creationSources
              : [];

            const hadAffinitySource = sources.some((source) => {
              return String(source).startsWith("affinity");
            });

            const wasManualChoice = Boolean(currentSkill.manualOwned) || sources.includes("manual");

            if (hadAffinitySource && !wasManualChoice) {
              foundry.utils.setProperty(
                changed,
                `system.skills.${skillKey}.manualOwned`,
                false
              );

              foundry.utils.deleteProperty(
                changed,
                `system.skills.${skillKey}.owned`
              );
            }
          }
        }

    const deletePath = (path) => {
      if (foundry.utils.hasProperty(changed, path)) {
        foundry.utils.deleteProperty(changed, path);
      }
    };

    for (const path of Object.keys(flat)) {
      if (creationLocked) {
        const lockedPrefixes = [
          "system.heritage.",
          "system.identity.nindoText"
        ];

        const lockedMangekyoPlayerPaths = new Set([
          "system.heritage.uchiha.mangekyo.rightEyePower",
          "system.heritage.uchiha.mangekyo.leftEyePower",
          "system.heritage.uchiha.mangekyo.rightEyePlayerValidated",
          "system.heritage.uchiha.mangekyo.leftEyePlayerValidated",
          "system.heritage.uchiha.mangekyo.rightEyeChoicePromptedAtLineage",
          "system.heritage.uchiha.mangekyo.leftEyeChoicePromptedAtLineage"
        ]);

        const lockedMangekyoResettableGmPaths = new Set([
          "system.heritage.uchiha.mangekyo.rightEyeGmValidated",
          "system.heritage.uchiha.mangekyo.leftEyeGmValidated"
        ]);

        const isAllowedLockedMangekyoUpdate =
          lockedMangekyoPlayerPaths.has(path)
          || (
            lockedMangekyoResettableGmPaths.has(path)
            && foundry.utils.getProperty(changed, path) === false
          );

        if (lockedPrefixes.some((prefix) => path.startsWith(prefix)) && !isAllowedLockedMangekyoUpdate) {
          deletePath(path);
        }

        if (
          path.match(/^system\.skills\.[^.]+\.owned$/)
          || path.match(/^system\.skills\.[^.]+\.manualOwned$/)
        ) {
        deletePath(path);
        }

        if (path.startsWith("system.heritage.affinities.")) {
          deletePath(path);
        }
      }

      if (path.startsWith("system.missions.")) {
        deletePath(path);
      }

      if (path === "system.nindo.value" || path === "system.nindo.max") {
        if (!allowNindoActionUpdate || path === "system.nindo.max") {
          deletePath(path);
        }
      }

      if (path === "system.nindo.charges.value" || path === "system.nindo.charges.max") {
        if (!allowNindoActionUpdate || path === "system.nindo.charges.max") {
          deletePath(path);
        }
      }

      if (path === "system.identity.nindoText" && !this.canUserEditNindo(updatingUser)) {
        deletePath(path);
      }

      if (path === "system.inventory.ryo" && !this.canUserEditRyo(updatingUser)) {
        deletePath(path);
      }

      if (path.startsWith("system.inventory.permissions.")) {
        deletePath(path);
      }

      if (path === "system.progression.creation.locked" && !allowCreationLockUpdate) {
        deletePath(path);
      }
    }

    return allowed;
  }

  async promoteToNextRank() {
    if (this.type !== "shinobi") return;

    if (!game.user.isGM) {
      ui.notifications.warn("Seul le MJ peut valider un passage de rang.");
      return;
    }

    const currentKey = this.getCurrentRankKey();
    const nextKey = NARUTO25E.getNextRankKey(currentKey);

    if (!nextKey) {
      ui.notifications.warn("Ce personnage est déjà au rang maximal.");
      return;
    }

    const rankData = this.system.progression?.rank;
    if (!rankData?.canPromote) {
      ui.notifications.warn("Les conditions de promotion ne sont pas encore remplies.");
      return;
    }

    const nextRank = NARUTO25E.getRank(nextKey);

    await this.update({
      "system.progression.rank.current": nextKey,
      "system.progression.rank.lastPromotion": new Date().toISOString()
    });

    ui.notifications.info(`${this.name} passe au rang : ${nextRank.label}.`);
  }

  _prepareChakraSpecializations(system) {
    if (!system.chakra) system.chakra = {};
    if (!system.chakra.specializations) system.chakra.specializations = {};

    const chakra = system.chakra;
    const specializations = chakra.specializations;

    const bonuses = {
      chakraMax: 0,
      vigueurMax: 0,
      caractereMax: 0,
      initiative: 0,
      moveMeters: 0,
      armDamage: 0,
      taiDamage: 0,
      passiveRegenPercent: 0,
      lineagePowerUses: 0
    };

    let spent = 0;

    for (const key of NARUTO25E.chakraSpecializationOrder) {
      const definition = NARUTO25E.chakraSpecializations[key];
      if (!definition) continue;

      const maxStacks = Number(definition.maxStacks ?? 1);
      let value = Number(specializations[key] ?? 0);

      value = this._clampNumber(value, 0, maxStacks);
      specializations[key] = value;

      spent += value;

      const specBonuses = definition.bonuses ?? {};

      for (const [bonusKey, bonusValue] of Object.entries(specBonuses)) {
        bonuses[bonusKey] = Number(bonuses[bonusKey] ?? 0) + Number(bonusValue ?? 0) * value;
      }
    }

    const rankKey = system.progression?.rank?.current ?? "aspirant";
    const available = NARUTO25E.getChakraSpecializationSlotsForRank(rankKey);

    chakra.specializationState = {
      available,
      spent,
      remaining: Math.max(0, available - spent),
      overLimit: spent > available
    };

    chakra.specializationBonuses = bonuses;
  }

  getChakraSpecializationCount(key) {
    return Number(this.system.chakra?.specializations?.[key] ?? 0);
  }

  getChakraSpecializationState() {
    return this.system.chakra?.specializationState ?? {
      available: 1,
      spent: 0,
      remaining: 1,
      overLimit: false
    };
  }

  async increaseChakraSpecialization(key) {
    if (this.type !== "shinobi") return;

    const definition = NARUTO25E.chakraSpecializations[key];
    if (!definition) return;

    const current = this.getChakraSpecializationCount(key);
    const maxStacks = Number(definition.maxStacks ?? 1);

    if (current >= maxStacks) {
      ui.notifications.warn(`${definition.label} ne peut pas être choisi davantage.`);
      return;
    }

    const state = this.getChakraSpecializationState();

    if (Number(state.remaining ?? 0) <= 0) {
      ui.notifications.warn("Aucun emplacement de spécialisation de Chakra disponible.");
      return;
    }

    await this.update({
      [`system.chakra.specializations.${key}`]: current + 1
    });

    ui.notifications.info(`${definition.label} augmenté à ${current + 1}.`);
  }

  async decreaseChakraSpecialization(key) {
    if (this.type !== "shinobi") return;

    const definition = NARUTO25E.chakraSpecializations[key];
    if (!definition) return;

    const current = this.getChakraSpecializationCount(key);

    if (current <= 0) {
      ui.notifications.warn(`${definition.label} est déjà à 0.`);
      return;
    }

    await this.update({
      [`system.chakra.specializations.${key}`]: current - 1
    });

    ui.notifications.info(`${definition.label} réduit à ${current - 1}.`);
  }

  async _rollExplodingD10(label, modifier = 0, options = {}) {
    if (this.type !== "shinobi") return null;

    const safeModifier = Number(modifier ?? 0);
    const formula = `1d10x + ${safeModifier}`;

    const roll = new Roll(formula);
    await roll.evaluate();

    const dice = roll.dice?.[0];
    const dieResults = dice?.results ?? [];

    const naturalResults = dieResults.map((result) => Number(result.result ?? 0));
    const exploded = naturalResults.some((value) => value === 10) && naturalResults.length > 1;

    const diceText = naturalResults.length
      ? naturalResults.join(" + ")
      : "—";

    const modifierText = safeModifier >= 0
      ? `+ ${safeModifier}`
      : `- ${Math.abs(safeModifier)}`;

    const resultClass = exploded ? "naruto-roll-result exploded" : "naruto-roll-result";

    const flavor = options.flavor ?? label;
    const effectModifierSummary = options.effectModifierSummary ?? null;
    const effectModifierSummaryHtml = this._getNarutoEffectModifierSummaryHtml(effectModifierSummary);

    const content = `
      <div class="naruto-roll-card ${exploded ? "is-exploded" : ""}">
        <header class="naruto-roll-header">
          <h3>${flavor}</h3>
        </header>

        <div class="${resultClass}">
          ${roll.total}
        </div>

        <div class="naruto-roll-details">
          <span>D10 : ${diceText}</span>
          <span>Modificateur : ${modifierText}</span>
        </div>

        ${effectModifierSummaryHtml}

        ${exploded ? `
          <div class="naruto-roll-explosion">
            Explosion du dé !
          </div>
        ` : ""}
      </div>
    `;

    await ChatMessage.create({
      speaker: ChatMessage.getSpeaker({ actor: this }),
      flavor: label,
      content,
      rolls: [roll]
    });

    return roll;
  }

  async rollInitiativeAction(options = {}) {
    const updateTracker = options.updateTracker !== false;
    const baseTotal = Number(this.system.combat?.initiative?.total ?? 0);
    const effectModifierSummary = this._getNarutoEffectModifierSummary("skill", {
      key: "physique",
      skillKey: "physique"
    });
    const total = baseTotal + Number(effectModifierSummary.total ?? 0);

    const roll = await this._rollExplodingD10("Initiative", total, {
      flavor: `Initiative — ${this.name}`,
      effectModifierSummary
    });

    if (updateTracker && game.combat) {
      const combatant = game.combat.combatants.find((candidate) => {
        return candidate.actor?.id === this.id;
      });

      if (combatant) {
        await game.combat.updateEmbeddedDocuments("Combatant", [
          {
            _id: combatant.id,
            initiative: roll.total
          }
        ]);
      }
    }

    return roll;
  }

  async _rollExplodingD10Data(modifier = 0) {
    const safeModifier = Number(modifier ?? 0);
    const formula = `1d10x + ${safeModifier}`;

    const roll = new Roll(formula);
    await roll.evaluate();

    const dice = roll.dice?.[0];
    const naturalResults = (dice?.results ?? []).map((result) => Number(result.result ?? 0));
    const exploded = naturalResults.some((value) => value === 10) && naturalResults.length > 1;

    return {
      roll,
      total: roll.total,
      modifier: safeModifier,
      diceText: naturalResults.length ? naturalResults.join(" + ") : "—",
      exploded
    };
  }

  _getSkillCombatTotal(skillKey) {
    const skill = this.system.skills?.[skillKey];
    const definition = NARUTO25E.skillDefinitions?.[skillKey];

    if (!skill || !definition) return null;
    if (!skill.owned && !definition.ownedByDefault) return null;

    const baseTotal = Number(skill.total ?? 0);
    const effectModifierSummary = this._getNarutoEffectModifierSummary("skill", {
      key: skillKey,
      skillKey
    });

    return {
      key: skillKey,
      label: definition.label,
      baseTotal,
      total: Math.max(0, baseTotal + Number(effectModifierSummary.total ?? 0)),
      effectModifierSummary
    };
  }

  _getBasicDefenseOptions(kind) {
    const options = [];
    const defenseCounters = this.system.combat?.counters?.defenses ?? {};

    const esquive = this._getSkillCombatTotal("esquive");
    const parade = this._getSkillCombatTotal("parade");

    const esquiveRemaining = Number(defenseCounters.esquive?.remaining ?? 0);
    const paradeRemaining = Number(defenseCounters.parade?.remaining ?? 0);

    if (esquive && esquiveRemaining > 0) {
      const defenseEffectModifierSummary = this._getNarutoEffectModifierSummary("defense", {
        key: "esquive",
        defenseKey: "esquive",
        skillKey: "esquive"
      });
      const effectModifierSummary = this._combineNarutoEffectModifierSummaries(
        esquive.effectModifierSummary,
        defenseEffectModifierSummary
      );

      options.push({
        ...esquive,
        total: Math.max(0, Number(esquive.total ?? 0) + Number(defenseEffectModifierSummary.total ?? 0)),
        effectModifierSummary,
        mode: "active",
        counterKey: "esquive",
        limited: true,
        remaining: esquiveRemaining
      });
    }

    if (parade && paradeRemaining > 0) {
      const defenseEffectModifierSummary = this._getNarutoEffectModifierSummary("defense", {
        key: "parade",
        defenseKey: "parade",
        skillKey: "parade"
      });
      const effectModifierSummary = this._combineNarutoEffectModifierSummaries(
        parade.effectModifierSummary,
        defenseEffectModifierSummary
      );

      options.push({
        ...parade,
        total: Math.max(0, Number(parade.total ?? 0) + Number(defenseEffectModifierSummary.total ?? 0)),
        effectModifierSummary,
        mode: "active",
        counterKey: "parade",
        limited: true,
        remaining: paradeRemaining
      });
    }

    const vigueur = Math.max(0, Number(this.system.resources?.vigueur?.value ?? 0));

    const vigorDefenseEffectModifierSummary = this._getNarutoEffectModifierSummary("defense", {
      key: "vigueur",
      defenseKey: "vigueur"
    });

    options.push({
      key: "encaisser",
      label: "Encaisser",
      total: Math.max(0, vigueur + Number(vigorDefenseEffectModifierSummary.total ?? 0)),
      effectModifierSummary: vigorDefenseEffectModifierSummary,
      mode: "passive",
      defenseKey: "vigueur",
      limited: false,
      remaining: null
    });

    return options;
  }

  _canUseSkillForDefense(skillKey) {
    const skill = this.system.skills?.[skillKey];
    const definition = NARUTO25E.skillDefinitions?.[skillKey];

    if (!skill || !definition) return false;

    return Boolean(skill.owned) || Boolean(definition.ownedByDefault);
  }

  _getMentalDefenseOptions(profile = {}) {
    const options = [];

    if (this._canUseSkillForDefense("mental")) {
      const mental = this._getSkillCombatTotal("mental");

      if (mental) {
        const defenseEffectModifierSummary = this._getNarutoEffectModifierSummary("defense", {
          key: "mental",
          defenseKey: "mental",
          skillKey: "mental"
        });
        const effectModifierSummary = this._combineNarutoEffectModifierSummaries(
          mental.effectModifierSummary,
          defenseEffectModifierSummary
        );

        options.push({
          ...mental,
          total: Math.max(0, Number(mental.total ?? 0) + Number(defenseEffectModifierSummary.total ?? 0)),
          effectModifierSummary,
          mode: "active",
          counterKey: "",
          limited: false,
          remaining: null,
          defenseFamily: "mental"
        });
      }
    }

    const caractere = Math.max(0, Number(this.system.resources?.caractere?.value ?? 0));

    const characterDefenseEffectModifierSummary = this._getNarutoEffectModifierSummary("defense", {
      key: "caractere",
      defenseKey: "caractere"
    });

    options.push({
      key: "encaisserCaractere",
      label: "Encaisser — Caractère",
      total: Math.max(0, caractere + Number(characterDefenseEffectModifierSummary.total ?? 0)),
      effectModifierSummary: characterDefenseEffectModifierSummary,
      mode: "passive",
      defenseKey: "caractere",
      limited: false,
      remaining: null,
      defenseFamily: "mental"
    });

    return options;
  }

  _getDefenseOptionsForAttack(profile = {}) {
    const defenseType = String(profile.defenseType ?? "physical");

    if (defenseType === "mental") {
      return this._getMentalDefenseOptions(profile);
    }

    return this._getBasicDefenseOptions(profile.kind ?? "physical");
  }

  _getPsychicResistanceSummary(profile = {}) {
    const damageType = String(profile.damageType ?? "");
    const isPsychicDamage = ["psychic", "mental", "spiritual", "emotional"].includes(damageType);

    if (!isPsychicDamage) return null;

    const summaries = [];

    if (this._canUseSkillForDefense("resistancesPsychiques")) {
      const resistance = this._getSkillCombatTotal("resistancesPsychiques");

      if (resistance) {
        summaries.push({
          key: "resistancesPsychiques",
          label: resistance.label,
          total: resistance.total,
          note: "S’applique aux dégâts psychiques avant comparaison avec Caractère."
        });
      }
    }

    if (damageType === "emotional" && this._canUseSkillForDefense("resistancesEmotionnelles")) {
      const resistance = this._getSkillCombatTotal("resistancesEmotionnelles");

      if (resistance) {
        summaries.push({
          key: "resistancesEmotionnelles",
          label: resistance.label,
          total: resistance.total,
          note: "S’applique aux dégâts émotionnels avant comparaison avec Caractère."
        });
      }
    }

    return summaries.length ? summaries : null;
  }

  async _chooseDefenseOption(targetActor, kind, defenseOptions) {
    if (!defenseOptions.length) return null;
    if (defenseOptions.length === 1) return defenseOptions[0];

    const canChoose = game.user?.isGM || targetActor.isOwner;

    if (!canChoose) {
      return defenseOptions.reduce((best, option) => {
        return option.total > best.total ? option : best;
      }, defenseOptions[0]);
    }

    const rows = defenseOptions.map((option) => {
      const safeLabel = foundry.utils.escapeHTML?.(option.label) ?? option.label;
      const modeLabel = option.mode === "passive"
        ? "passif"
        : option.limited
        ? `${option.remaining} usage restant`
        : "actif";

      return `
        <label class="naruto-defense-choice">
          <input type="radio" name="defense" value="${option.key}" ${option.key === defenseOptions[0].key ? "checked" : ""} />
          <span>${safeLabel} <small>(${modeLabel})</small></span>
          <strong>${option.total}</strong>
        </label>
      `;
    }).join("");

    return new Promise((resolve) => {
      new Dialog({
        title: `Défense — ${targetActor.name}`,
        content: `
          <form class="naruto-defense-dialog">
            <p>Choisis la défense utilisée contre cette attaque.</p>
            ${rows}
          </form>
        `,
        buttons: {
          validate: {
            label: "Valider",
            callback: (html) => {
              const selectedKey = html.find('input[name="defense"]:checked').val();
              resolve(defenseOptions.find((option) => option.key === selectedKey) ?? defenseOptions[0]);
            }
          },
          best: {
            label: "Meilleure défense",
            callback: () => {
              resolve(defenseOptions.reduce((best, option) => {
                return option.total > best.total ? option : best;
              }, defenseOptions[0]));
            }
          }
        },
        default: "validate",
        close: () => resolve(null)
      }).render(true);
    });
  }

  async _consumeDefenseOption(defense) {
    if (!defense?.limited || !defense.counterKey) return true;

    const path = `system.combat.counters.defenses.${defense.counterKey}.remaining`;
    const current = Number(foundry.utils.getProperty(this, path) ?? 0);

    if (current <= 0) {
      ui.notifications.warn(`${defense.label} n’est plus disponible ce tour.`);
      return false;
    }

    await this.update({
      [path]: Math.max(0, current - 1)
    });

    return true;
  }

  _getActorPrimaryOwnerIds(actor) {
    const ownership = actor?.ownership ?? {};
    const ids = [];

    for (const user of game.users ?? []) {
      if (!user || user.isGM) continue;

      const level = Number(ownership[user.id] ?? ownership.default ?? 0);
      if (level >= CONST.DOCUMENT_OWNERSHIP_LEVELS.OWNER) ids.push(user.id);
    }

    return ids;
  }

  _canUserResolveDefenseForActor(actor) {
    return Boolean(game.user?.isGM || actor?.isOwner);
  }

  _getDefenseModeLabel(option = {}) {
    if (option.mode === "passive") return "passif";
    if (option.limited) return `${option.remaining ?? 0} usage restant`;
    return "actif";
  }

  _buildDefenseRequestCardContent(data = {}) {
    const safe = (value) => foundry.utils.escapeHTML?.(String(value ?? "")) ?? String(value ?? "");
    const options = Array.isArray(data.defenseOptions) ? data.defenseOptions : [];

    const buttons = options.map((option) => {
      return `
        <button
          type="button"
          class="naruto-chat-defense-select"
          data-defense-key="${safe(option.key)}"
        >
          <span>${safe(option.label)}</span>
          <small>${safe(this._getDefenseModeLabel(option))}</small>
          <strong>${Number(option.total ?? 0)}</strong>
        </button>
      `;
    }).join("");

    const waitingText = "Le propriétaire de la cible ou le MJ choisit la défense utilisée contre cette attaque.";
    const itemThemeClass = String(data.itemThemeClass ?? "");

    return `
      <div class="naruto-roll-card naruto-opposed-card is-pending ${itemThemeClass}">
        <header class="naruto-roll-header">
          <h3>${safe(data.label)}</h3>
        </header>

        <div class="naruto-opposed-summary">
          <div><strong>Attaquant</strong><span>${safe(data.actorName)}</span></div>
          <div><strong>Cible</strong><span>${safe(data.targetName)}</span></div>
        </div>

        <div class="naruto-roll-result">
          Défense demandée
        </div>

        <p>${waitingText}</p>

        ${this._getNarutoEffectModifierSummaryHtml(data.attackEffectModifierSummary)}

        <div class="naruto-defense-button-grid">
          ${buttons}
        </div>

        ${data.damageFormula ? `
          <div class="naruto-roll-details">
            <span>Dégâts : ${safe(data.damageFormula)}</span>
            <span>Type : ${safe(data.damageType)}</span>
          </div>
        ` : ""}

        ${data.effectText ? `
          <div class="naruto-consumable-text">
            ${safe(data.effectText)}
          </div>
        ` : ""}
      </div>
    `;
  }

  _buildOpposedResultCardContent(data = {}) {
    const safe = (value) => foundry.utils.escapeHTML?.(String(value ?? "")) ?? String(value ?? "");
    const success = Boolean(data.success);
    const margin = Number(data.margin ?? 0);
    const impactPercent = Math.max(8, Math.min(92, Number(data.impactPercent ?? 50)));
    const kunaiClass = success ? "is-hit" : "is-miss";
    const damageAvailable = Boolean(data.damageAvailable);
    const itemThemeClass = String(data.itemThemeClass ?? "");

    return `
      <div class="naruto-roll-card naruto-opposed-card ${success ? "is-hit" : "is-miss"} ${itemThemeClass}">
        <header class="naruto-roll-header">
          <h3>${safe(data.label)}</h3>
        </header>

        <div class="naruto-opposed-summary">
          <div><strong>Attaquant</strong><span>${safe(data.actorName)}</span></div>
          <div><strong>Cible</strong><span>${safe(data.targetName)}</span></div>
        </div>

        <div class="naruto-roll-result ${success ? "success" : "failure"}">
          ${success ? "Attaque réussie" : "Attaque échouée"}
        </div>

        <div class="naruto-opposed-versus">
          <div class="naruto-opposed-score is-attack">
            <span>Attaque</span>
            <strong>${Number(data.attackTotal ?? 0)}</strong>
            <small>D10 ${safe(data.attackDiceText)} + ${Number(data.attackModifier ?? 0)}</small>
          </div>

          <div class="naruto-opposed-track">
            <span class="naruto-opposed-line"></span>
            <img
              class="naruto-opposed-kunai ${kunaiClass}"
              src="systems/naruto-25e/assets/ui/chat/kunai.webp"
              alt="Kunai"
              style="left: ${impactPercent}%;"
            />
          </div>

          <div class="naruto-opposed-score is-defense ${success ? "is-broken" : ""}">
            <span>Défense</span>
            <strong>${Number(data.defenseTotal ?? 0)}</strong>
            <small>${safe(data.defenseLabel)}${data.defenseRoll ? ` · D10 ${safe(data.defenseDiceText)} + ${Number(data.defenseModifier ?? 0)}` : " · fixe"}</small>
          </div>
        </div>

        <div class="naruto-roll-details">
          <span>Marge : ${margin >= 0 ? "+" : ""}${margin}</span>
          <span>Cible : ${safe(data.targetName)}</span>
          <span>Défense choisie : ${safe(data.defenseLabel)}</span>
        </div>

        ${this._getNarutoEffectModifierSummaryHtml(data.attackEffectModifierSummary)}
        ${this._getNarutoEffectModifierSummaryHtml(data.defenseEffectModifierSummary)}

        ${data.damageFormula ? `
          <div class="naruto-roll-details">
            <span>Dégâts : ${safe(data.damageFormula)}</span>
            <span>Type : ${safe(data.damageType)}</span>
          </div>
        ` : ""}

        ${data.resistanceBlock ?? ""}

        ${data.effectText ? `
          <div class="naruto-consumable-text">
            ${safe(data.effectText)}
          </div>
        ` : ""}

        ${success ? `
          <p>L’action touche ou affecte la cible.</p>
          ${this._createDamageButtonHtml(damageAvailable)}
          ${data.appliedEffectsHtml ?? ""}
        ` : `<p>La défense tient bon.</p>`}
      </div>
    `;
  }

  async _resolveTargetedAttack(profile = {}) {
    const label = String(profile.label ?? "Attaque");
    const attackTotal = Math.max(0, Number(profile.attackTotal ?? 0));
    const defenseType = String(profile.defenseType ?? "physical");
    const damageFormula = String(profile.damageFormula ?? "");
    const damageType = String(profile.damageType ?? "physical");
    const damageData = this._normalizeDamageData(profile.damage ?? {
      formula: damageFormula,
      type: damageType,
      calculation: {
        enabled: false
      }
    });
    const effectText = String(profile.effectText ?? "");
    const attackEffectModifierSummary = profile.attackEffectModifierSummary ?? null;
    const itemThemeClass = String(profile.itemThemeClass ?? "");

    const targets = Array.from(game.user?.targets ?? []);

    if (!targets.length) {
      ui.notifications.warn("Aucun token ciblé : jet simple sans demande de défense.");
      return this._rollExplodingD10(label, attackTotal, {
        flavor: `${label} — ${this.name}`,
        effectModifierSummary: attackEffectModifierSummary
      });
    }

    const safeLabel = foundry.utils.escapeHTML?.(label) ?? label;
    const safeActorName = foundry.utils.escapeHTML?.(this.name) ?? this.name;
    let createdRequests = 0;

    for (const targetToken of targets) {
      const targetActor = targetToken?.actor;

      if (!targetActor || targetActor.type !== "shinobi") {
        ui.notifications.warn("Une cible ignorée : elle doit être un acteur Shinobi.");
        continue;
      }

      const defenseOptions = targetActor._getDefenseOptionsForAttack?.({
        ...profile,
        defenseType
      }) ?? [];

      if (!defenseOptions.length) {
        ui.notifications.warn(`Aucune défense valide disponible pour ${targetActor.name}.`);
        continue;
      }

      const safeTargetName = foundry.utils.escapeHTML?.(targetActor.name) ?? targetActor.name;
      const defenseData = {
        actorId: this.id,
        actorName: this.name,
        targetActorId: targetActor.id,
        targetName: targetActor.name,
        label,
        attackTotal,
        attackEffectModifierSummary,
        itemThemeClass,
        defenseType,
        kind: String(profile.kind ?? defenseType),
        itemId: String(profile.itemId ?? ""),
        itemType: String(profile.itemType ?? ""),
        sourceUuid: String(profile.sourceUuid ?? ""),
        sourceType: String(profile.sourceType ?? profile.itemType ?? "custom"),
        targetType: String(profile.targetType ?? ""),
        appliedEffects: Array.isArray(profile.appliedEffects)
          ? foundry.utils.deepClone(profile.appliedEffects)
          : [],
        damageKey: String(profile.damageKey ?? profile.kind ?? damageType),
        damageFormula,
        damageType,
        damage: damageData,
        effectText,
        defenseOptions: defenseOptions.map((option) => ({
          key: String(option.key ?? ""),
          label: String(option.label ?? option.key ?? "Défense"),
          total: Math.max(0, Number(option.total ?? 0)),
          mode: String(option.mode ?? "active"),
          counterKey: String(option.counterKey ?? ""),
          limited: Boolean(option.limited),
          remaining: option.remaining === null || option.remaining === undefined ? null : Number(option.remaining),
          defenseKey: String(option.defenseKey ?? ""),
          defenseFamily: String(option.defenseFamily ?? ""),
          effectModifierSummary: option.effectModifierSummary ?? null
        }))
      };

      await ChatMessage.create({
        speaker: ChatMessage.getSpeaker({ actor: this }),
        flavor: `Défense demandée — ${safeLabel}`,
        flags: {
          "naruto-25e": {
            defenseRequest: defenseData
          }
        },
        content: this._buildDefenseRequestCardContent(defenseData)
      });

      createdRequests += 1;
      ui.notifications.info(`Défense demandée à ${safeTargetName} contre ${safeActorName}.`);
    }

    if (!createdRequests) {
      ui.notifications.warn("Aucune demande de défense n’a pu être créée.");
    }

    return null;
  }

  async resolveDefenseFromChatMessage(message, defenseKey = "") {
    const data = message?.getFlag?.("naruto-25e", "defenseRequest");

    if (!data || data.actorId !== this.id) {
      ui.notifications.warn("Cette carte de défense n’est plus exploitable.");
      return null;
    }

    const targetActor = game.actors?.get(data.targetActorId);

    if (!targetActor || targetActor.type !== "shinobi") {
      ui.notifications.warn("Cible introuvable pour résoudre la défense.");
      return null;
    }

    if (!this._canUserResolveDefenseForActor(targetActor)) {
      ui.notifications.warn("Seul le propriétaire de la cible ou le MJ peut choisir cette défense.");
      return null;
    }

    if (message.getFlag("naruto-25e", "defenseResolved")) {
      ui.notifications.warn("Cette défense a déjà été résolue.");
      return null;
    }

    const defenseOptions = Array.isArray(data.defenseOptions) ? data.defenseOptions : [];
    const defense = defenseOptions.find((option) => option.key === defenseKey) ?? defenseOptions[0];

    if (!defense) {
      ui.notifications.warn("Défense introuvable.");
      return null;
    }

    const consumed = await targetActor._consumeDefenseOption?.(defense);
    if (!consumed) return null;

    const attackRoll = await this._rollExplodingD10Data(Number(data.attackTotal ?? 0));
    const defenseRoll = defense.mode === "passive"
      ? null
      : await targetActor._rollExplodingD10Data(Number(defense.total ?? 0));

    const defenseTotal = defenseRoll?.total ?? Number(defense.total ?? 0);
    const success = attackRoll.total >= defenseTotal;
    const margin = attackRoll.total - defenseTotal;
    const maxTotal = Math.max(1, attackRoll.total, defenseTotal);
    const impactPercent = success
      ? Math.max(10, Math.min(90, (defenseTotal / maxTotal) * 100))
      : 50;

    const resistanceSummaries = targetActor._getPsychicResistanceSummary?.({
      damageType: data.damageType
    });

    const resistanceBlock = resistanceSummaries?.length
      ? `
        <div class="naruto-roll-details">
          <strong>Résistances pertinentes :</strong>
          ${resistanceSummaries.map((resistance) => {
            const safeResistanceLabel = foundry.utils.escapeHTML?.(resistance.label) ?? resistance.label;
            const safeResistanceNote = foundry.utils.escapeHTML?.(resistance.note) ?? resistance.note;

            return `<span>${safeResistanceLabel} ${resistance.total} — ${safeResistanceNote}</span>`;
          }).join("")}
        </div>
      `
      : "";

    const appliedEffects = Array.isArray(data.appliedEffects)
      ? foundry.utils.deepClone(data.appliedEffects)
      : [];

    const attackerActor = game.actors?.get(String(data.actorId ?? ""));
    const sourceItem = attackerActor?.items?.get(String(data.itemId ?? ""));
    const itemEffectRequest = success && appliedEffects.length ? {
      actorId: data.actorId ?? "",
      itemId: data.itemId ?? "",
      itemUuid: data.sourceUuid ?? "",
      sourceName: data.label ?? "",
      sourceUuid: data.sourceUuid ?? "",
      sourceType: data.sourceType ?? "technique",
      targetActorIds: [targetActor.id],
      effects: appliedEffects
    } : null;

    const appliedEffectsHtml = itemEffectRequest && sourceItem && typeof attackerActor?._getItemAppliedEffectsChatHtml === "function"
      ? attackerActor._getItemAppliedEffectsChatHtml(sourceItem, {
          targetActorIds: [targetActor.id]
        })
      : "";


    const resultData = {
      ...data,
      defenseLabel: defense.label,
      defenseTotal,
      defenseRoll: Boolean(defenseRoll),
      defenseDiceText: defenseRoll?.diceText ?? "",
      defenseModifier: defenseRoll?.modifier ?? Number(defense.total ?? 0),
      attackTotal: attackRoll.total,
      attackDiceText: attackRoll.diceText,
      attackModifier: attackRoll.modifier,
      attackEffectModifierSummary: data.attackEffectModifierSummary ?? null,
      defenseEffectModifierSummary: defense.effectModifierSummary ?? null,
      success,
      margin,
      impactPercent,
      damageAvailable: Boolean(data.damage?.calculation?.enabled),
      itemEffectRequest,
      appliedEffectsHtml,
      resistanceBlock
    };

    await ChatMessage.create({
      speaker: ChatMessage.getSpeaker({ actor: this }),
      flavor: `${data.label} — ${data.actorName} contre ${data.targetName}`,
      flags: {
        "naruto-25e": {
          itemEffectRequest,
          damagePayload: success ? {
            actorId: this.id,
            targetActorId: targetActor.id,
            sourceName: data.label,
            itemId: data.itemId ?? "",
            itemType: data.itemType ?? "",
            targetType: data.targetType ?? "",
            kind: data.kind ?? "",
            damageKey: data.damageKey ?? data.kind ?? data.damageType,
            damage: data.damage,
            damageType: data.damageType,
            itemThemeClass: data.itemThemeClass ?? ""
          } : null,
          defenseResult: resultData,
          defenseResolvedFrom: message.id
        }
      },
      content: this._buildOpposedResultCardContent(resultData)
    });

    if (game.user?.isGM || message.isOwner) {
      await message.update({
        content: `
          <div class="naruto-roll-card naruto-opposed-card is-resolved">
            <header class="naruto-roll-header">
              <h3>${foundry.utils.escapeHTML?.(data.label) ?? data.label}</h3>
            </header>
            <p>Défense résolue. Voir la carte de confrontation publique.</p>
          </div>
        `,
        flags: {
          "naruto-25e.defenseResolved": true
        }
      });
    }

    return attackRoll.roll;
  }

  async rollBasicAttack(kind) {
    const attack = this.system.combat?.attacks?.[kind];

    if (!attack) {
      ui.notifications.warn("Attaque introuvable.");
      return null;
    }

    const label = kind === "arm" ? "Attaque ARM basique" : "Attaque TAI basique";
    const attackEffectModifierSummary = this._getNarutoEffectModifierSummary("attack", {
      key: kind,
      kind,
      targetType: kind === "arm" ? "weapon" : "actor"
    });
    const attackTotal = Number(attack.total ?? 0) + Number(attackEffectModifierSummary.total ?? 0);

    const damageFormula = kind === "arm"
      ? this.system.combat?.damage?.arm?.formula ?? ""
      : this.system.combat?.damage?.tai?.formula ?? "";

    const damage = kind === "arm"
      ? {
          formula: damageFormula,
          type: "physical",
          calculation: {
            enabled: true,
            bases: ["cor", "arm"],
            flat: Number(this.system.combat?.damage?.arm?.bonus ?? 0),
            perItem: 0,
            perItemLimitBase: "",
            condition: ""
          }
        }
      : {
          formula: damageFormula,
          type: "physical",
          calculation: {
            enabled: true,
            bases: ["cor", "tai"],
            flat: Number(this.system.combat?.damage?.tai?.bonus ?? 0),
            perItem: 0,
            perItemLimitBase: "",
            condition: ""
          }
        };

    return this._resolveTargetedAttack({
      label,
      attackTotal,
      attackEffectModifierSummary,
      kind,
      targetType: kind === "arm" ? "weapon" : "actor",
      damageKey: kind,
      defenseType: "physical",
      damageFormula,
      damageType: "physical",
      damage
    });
  }

  _getTechniqueSkillTotal(item) {
    const system = item?.system ?? {};
    const skillKey = String(system.skill ?? "");
    const baseKey = String(system.base ?? "");

    const skill = this.system.skills?.[skillKey];
    const definition = NARUTO25E.skillDefinitions?.[skillKey];

    if (skillKey && skill && definition && (skill.owned || definition.ownedByDefault)) {
      const skillData = this._getSkillCombatTotal(skillKey);

      return {
        key: skillKey,
        label: definition.label ?? skillKey,
        baseTotal: Number(skill.total ?? 0),
        total: Number(skillData?.total ?? skill.total ?? 0),
        effectModifierSummary: skillData?.effectModifierSummary ?? null
      };
    }

    if (baseKey) {
      const base = this.system.bases?.[baseKey];

      if (base) {
        const label = NARUTO25E.baseLabels?.[baseKey] ?? base.label ?? baseKey;
        const baseTotal = Number(base.value ?? 0) + Number(base.bonus ?? 0);
        const effectModifierSummary = this._getNarutoEffectModifierSummary("base", {
          key: baseKey,
          baseKey
        });

        return {
          key: baseKey,
          label,
          baseTotal,
          total: Math.max(0, baseTotal + Number(effectModifierSummary.total ?? 0)),
          effectModifierSummary
        };
      }
    }

    return null;
  }

  _isTechniqueMentalAttack(item) {
    const system = item?.system ?? {};
    const family = String(system.family ?? "").toLowerCase();
    const category = String(system.taxonomy?.category ?? "").toLowerCase();
    const skill = String(system.skill ?? "").toLowerCase();
    const damageType = String(system.damage?.type ?? "").toLowerCase();

    return family === "genjutsu"
      || category === "genjutsu"
      || ["gensou", "yuryoku"].includes(skill)
      || ["mental", "psychic", "spiritual", "emotional"].includes(damageType);
  }

  _isTechniqueOffensive(item) {
    const system = item?.system ?? {};
    const damageFormula = String(system.damage?.formula ?? "").trim();
    const damageType = String(system.damage?.type ?? "none").toLowerCase();
    const effect = String(system.effect ?? "").toLowerCase();

    if (damageFormula && damageType !== "none") return true;

    return [
      "attaque",
      "dégât",
      "degat",
      "blesse",
      "touche",
      "ralenti",
      "bloque",
      "obstrue",
      "hallucination",
      "sommeil",
      "brûlure",
      "brulure"
    ].some((keyword) => effect.includes(keyword));
  }

  _getTechniqueDefenseType(item) {
    if (this._isTechniqueMentalAttack(item)) return "mental";

    return "physical";
  }

  _getTechniqueDamageType(item) {
    const rawType = String(item?.system?.damage?.type ?? "none").toLowerCase();

    if (rawType && rawType !== "none") return rawType;
    if (this._isTechniqueMentalAttack(item)) return "mental";

    return "physical";
  }

  async _spendTechniqueChakra(item) {
    const initialCost = Math.max(0, Number(item?.system?.chakra?.initial ?? 0));

    if (initialCost <= 0) {
      return {
        spent: 0,
        before: Math.max(0, Number(this.system.resources?.chakra?.value ?? 0)),
        after: Math.max(0, Number(this.system.resources?.chakra?.value ?? 0)),
        max: Math.max(0, Number(this.system.resources?.chakra?.max ?? 0))
      };
    }

    const chakra = this.system.resources?.chakra ?? {};
    const current = Math.max(0, Number(chakra.value ?? 0));
    const max = Math.max(0, Number(chakra.max ?? 0));

    if (current < initialCost) {
      ui.notifications.warn(`${this.name} n’a pas assez de Chakra pour utiliser ${item.name} (${current}/${initialCost}).`);
      return null;
    }

    const next = Math.max(0, current - initialCost);

    await this.update({
      "system.resources.chakra.value": next
    });

    return {
      spent: initialCost,
      before: current,
      after: next,
      max
    };
  }

  async _startMaintainedTechnique(item, chakraSpend = null) {
    const maintenanceCost = Math.max(0, Number(item?.system?.chakra?.maintenance ?? 0));

    if (maintenanceCost <= 0) return;

    if (this.isLineagePowerActive?.(item)) return;

    const activePowers = this._getActiveLineagePowers?.() ?? [];

    const updatedActivePowers = [
      ...activePowers,
      {
        id: foundry.utils.randomID(16),
        itemId: item.id,
        uuid: item.uuid,
        name: item.name,
        activationCost: Math.max(0, Number(chakraSpend?.spent ?? item.system?.chakra?.initial ?? 0)),
        maintenanceCost,
        isTechnique: true,
        startedRound: game.combat?.round ?? 0,
        startedTurn: game.combat?.turn ?? 0
      }
    ];

    await this.update({
      "system.resources.activeLineagePowers": updatedActivePowers
    });
  }

  async _createTechniqueChatCard(item, options = {}) {
    const system = item.system ?? {};
    const chakraSpend = options.chakraSpend ?? {};
    const roll = options.roll ?? null;
    const rollTotal = options.rollTotal ?? null;
    const effectText = String(system.effect ?? "");
    const damageFormula = String(system.damage?.formula ?? "");
    const damageType = this._getTechniqueDamageType(item);
    const damageResult = this._calculateDamageData(system.damage ?? {});
    const maintenanceCost = Math.max(0, Number(system.chakra?.maintenance ?? 0));
    const familyLabel = NARUTO25E.techniqueFamilies?.[system.family] ?? system.family ?? "—";
    const rankLabel = NARUTO25E.techniqueRanks?.[system.rank] ?? system.rank ?? "—";
    const actionLabel = NARUTO25E.techniqueActionTypes?.[system.actionType] ?? system.actionType ?? "—";
    const skillData = this._getTechniqueSkillTotal(item);
    const effectModifierSummary = options.effectModifierSummary ?? skillData?.effectModifierSummary ?? null;
    const effectModifierSummaryHtml = this._getNarutoEffectModifierSummaryHtml(effectModifierSummary);
    const targetActorIds = Array.isArray(options.targetActorIds)
      ? options.targetActorIds.map((entry) => String(entry ?? "")).filter(Boolean)
      : [];
    const appliedEffects = this._getItemAppliedEffects(item);
    const appliedEffectsHtml = this._getItemAppliedEffectsChatHtml(item, {
      targetActorIds
    });

    const safeTechniqueName = foundry.utils.escapeHTML?.(item.name) ?? item.name;
    const safeActorName = foundry.utils.escapeHTML?.(this.name) ?? this.name;
    const safeFamily = foundry.utils.escapeHTML?.(familyLabel) ?? familyLabel;
    const safeRank = foundry.utils.escapeHTML?.(rankLabel) ?? rankLabel;
    const safeAction = foundry.utils.escapeHTML?.(actionLabel) ?? actionLabel;
    const safeSkill = foundry.utils.escapeHTML?.(skillData?.label ?? "—") ?? (skillData?.label ?? "—");
    const safeRange = foundry.utils.escapeHTML?.(system.range || "—") ?? (system.range || "—");
    const safeTarget = foundry.utils.escapeHTML?.(system.target || "—") ?? (system.target || "—");
    const safeDuration = foundry.utils.escapeHTML?.(system.duration || "—") ?? (system.duration || "—");
    const safeArea = foundry.utils.escapeHTML?.(system.area || "—") ?? (system.area || "—");
    const safeDamageFormula = foundry.utils.escapeHTML?.(damageFormula || "—") ?? (damageFormula || "—");
    const safeDamageType = foundry.utils.escapeHTML?.(damageType) ?? damageType;
    const safeEffect = foundry.utils.escapeHTML?.(effectText) ?? effectText;
    const itemThemeClass = this._getNarutoItemChatThemeClass(item);

    await ChatMessage.create({
      speaker: ChatMessage.getSpeaker({ actor: this }),
      flavor: `Technique : ${safeTechniqueName}`,
      flags: {
        "naruto-25e": {
          itemEffectRequest: appliedEffects.length ? {
            actorId: this.id,
            itemId: item.id,
            itemUuid: item.uuid,
            sourceName: item.name,
            sourceUuid: item.uuid,
            sourceType: "technique",
            targetActorIds,
            effects: appliedEffects
          } : null
        }
      },
      content: `
        <div class="naruto-roll-card naruto-technique-card ${itemThemeClass}">
          <header class="naruto-roll-header">
            <h3>${safeTechniqueName} — ${safeActorName}</h3>
          </header>

          <div class="naruto-technique-meta">
            <span><strong>Famille</strong> ${safeFamily}</span>
            <span><strong>Rang</strong> ${safeRank}</span>
            <span><strong>Action</strong> ${safeAction}</span>
            <span><strong>Compétence</strong> ${safeSkill}</span>
          </div>

          ${roll ? `
            <div class="naruto-roll-result">
              ${rollTotal}
            </div>
          ` : `
            <div class="naruto-roll-result">
              Sans jet ciblé
            </div>
          `}

          <div class="naruto-technique-details">
            <div><strong>Chakra :</strong> ${chakraSpend.before ?? 0} → ${chakraSpend.after ?? 0} / ${chakraSpend.max ?? 0}</div>
            <div><strong>Coût initial :</strong> ${chakraSpend.spent ?? 0}</div>
            <div><strong>Entretien :</strong> ${maintenanceCost} Chakra / tour</div>
            <div><strong>Portée :</strong> ${safeRange}</div>
            <div><strong>Cible :</strong> ${safeTarget}</div>
            <div><strong>Durée :</strong> ${safeDuration}</div>
            <div><strong>Zone :</strong> ${safeArea}</div>
            <div><strong>Dégâts :</strong> ${safeDamageFormula} ${safeDamageType}</div>
            ${damageResult.calculable ? `<div><strong>Dégâts calculés :</strong> ${damageResult.total}</div>` : ""}
          </div>

          ${effectModifierSummaryHtml}

          ${appliedEffectsHtml}

          ${maintenanceCost > 0 ? `
            <p class="naruto-technique-maintained">
              Technique maintenue ajoutée à l’entretien actif.
            </p>
          ` : ""}

          ${safeEffect ? `
            <div class="naruto-technique-effect">
              <strong>Effet</strong>
              <div>${safeEffect}</div>
            </div>
          ` : ""}
        </div>
      `,
      rolls: roll ? [roll] : []
    });
  }

  async useTechniqueItem(itemId) {
    const item = this.items.get(itemId);

    if (!item || item.type !== "technique") {
      ui.notifications.warn("Technique introuvable.");
      return null;
    }

    const skillData = this._getTechniqueSkillTotal(item);

    if (!skillData && item.system?.roll?.enabled !== false) {
      ui.notifications.warn(`Aucune compétence ou Base valide trouvée pour ${item.name}.`);
      return null;
    }

    const actionSpent = await this.spendCombatAction("complex", `Technique — ${item.name}`);

    if (!actionSpent) return null;

    const awakeningRollBonus = this._consumeNindoAwakeningRollBonus();

    const chakraSpend = await this._spendTechniqueChakra(item);

    if (!chakraSpend) return null;

    await this._startMaintainedTechnique(item, chakraSpend);

    const rollEnabled = item.system?.roll?.enabled !== false;
    const offensive = this._isTechniqueOffensive(item);
    const targets = Array.from(game.user?.targets ?? []);
    const targetActorIds = targets
      .map((target) => target?.actor?.id ?? "")
      .filter(Boolean);
    const appliedEffects = this._getItemAppliedEffects(item);
    const itemThemeClass = this._getNarutoItemChatThemeClass(item);

    const attackEffectModifierSummary = skillData
      ? this._getNarutoEffectModifierSummary("attack", {
          key: item.system?.skill ?? item.system?.family ?? "technique",
          skillKey: item.system?.skill ?? "",
          kind: item.system?.family ?? "technique",
          itemId: item.id,
          itemType: item.type,
          targetType: "technique"
        })
      : null;
    const combinedEffectModifierSummary = this._combineNarutoEffectModifierSummaries(
      skillData?.effectModifierSummary,
      attackEffectModifierSummary
    );

    if (rollEnabled && offensive && targets.length >= 1 && skillData) {
      const maintenanceCost = Math.max(0, Number(item.system?.chakra?.maintenance ?? 0));
      const effectText = [
        String(item.system?.effect ?? ""),
        `Chakra : ${chakraSpend.before} → ${chakraSpend.after} / ${chakraSpend.max}. Coût initial : ${chakraSpend.spent}.`,
        maintenanceCost > 0
          ? `Technique maintenue : entretien ${maintenanceCost} Chakra / tour.`
          : ""
      ].filter(Boolean).join("\n\n");

      return this._resolveTargetedAttack({
        label: `Technique — ${item.name}`,
        attackTotal: Number(skillData.total ?? 0) + awakeningRollBonus + Number(attackEffectModifierSummary?.total ?? 0),
        attackEffectModifierSummary: combinedEffectModifierSummary,
        kind: String(item.system?.skill ?? item.system?.family ?? "technique"),
        itemId: item.id,
        itemType: item.type,
        sourceUuid: item.uuid,
        sourceType: "technique",
        targetType: "technique",
        appliedEffects,
        itemThemeClass,
        damageKey: item.system?.skill ?? item.system?.family ?? "technique",
        defenseType: this._getTechniqueDefenseType(item),
        damageFormula: String(item.system?.damage?.formula ?? ""),
        damageType: this._getTechniqueDamageType(item),
        damage: item.system?.damage ?? {},
        effectText: [
          effectText,
          awakeningRollBonus > 0 ? `Éveil : +${awakeningRollBonus} au jet.` : ""
        ].filter(Boolean).join("\n\n")
      });
    }

    let roll = null;
    let rollTotal = null;

    if (rollEnabled && skillData) {
      const rollData = await this._rollExplodingD10Data(
        Number(skillData.total ?? 0)
        + awakeningRollBonus
        + Number(attackEffectModifierSummary?.total ?? 0)
      );

      roll = rollData.roll;
      rollTotal = rollData.total;
    }

    await this._createTechniqueChatCard(item, {
      chakraSpend,
      roll,
      rollTotal,
      effectModifierSummary: combinedEffectModifierSummary,
      targetActorIds
    });

    return roll;
  }

  async rollMentalDefenseTest() {
    const gensou = this._getSkillCombatTotal("gensou");
    const yuryoku = this._getSkillCombatTotal("yuryoku");

    const attack = yuryoku?.total > gensou?.total
      ? yuryoku
      : gensou;

    if (!attack) {
      ui.notifications.warn("Aucune compétence Gensou ou Yūryoku disponible.");
      return null;
    }

    return this._resolveTargetedAttack({
      label: `Test Genjutsu — ${attack.label}`,
      attackTotal: Number(attack.total ?? 0),
      kind: "genjutsu",
      defenseType: "mental",
      damageFormula: "Selon technique",
      damageType: "mental",
      effectText: "Test de défense mentale : la cible utilise Mental ou encaisse contre Caractère. Les résistances psychiques s’appliqueront aux dégâts lors de la résolution complète des techniques."
    });
  }

  async rollSkillAction(skillKey) {
    if (!skillKey) {
      ui.notifications.warn("Aucune compétence sélectionnée.");
      return null;
    }

    const skillData = this._getSkillCombatTotal(skillKey);
    const definition = NARUTO25E.skillDefinitions?.[skillKey];

    if (!skillData || !definition) {
      ui.notifications.warn("Compétence introuvable ou non possédée.");
      return null;
    }

    const actionSpent = await this.spendCombatAction("complex", `Jet de compétence — ${definition.label}`);

    if (!actionSpent) return null;

    const awakeningRollBonus = this._consumeNindoAwakeningRollBonus();
    const finalTotal = Number(skillData.total ?? 0) + awakeningRollBonus;
    const awakeningText = awakeningRollBonus > 0
      ? ` — Éveil +${awakeningRollBonus}`
      : "";

    return this._rollExplodingD10(definition.label, finalTotal, {
      flavor: `Jet de compétence : ${definition.label} — ${this.name}${awakeningText}`,
      effectModifierSummary: skillData.effectModifierSummary
    });
  }

  async rollInterception(kind) {
    if (this.type !== "shinobi") return null;

    const counter = this.system.combat?.counters?.interceptions?.[kind];
    const interception = this.system.combat?.interceptions?.[kind];

    if (!counter || !interception) {
      ui.notifications.warn("Interception introuvable.");
      return null;
    }

    const remaining = Number(counter.remaining ?? 0);

    if (remaining <= 0) {
      ui.notifications.warn("Aucune interception restante pour ce round.");
      return null;
    }

    await this.update({
      [`system.combat.counters.interceptions.${kind}.remaining`]: remaining - 1
    });

    const label = kind === "arm" ? "Interception ARM" : "Interception TAI";
    const total = Number(interception.rollTotal ?? 0);

    return this._rollExplodingD10(label, total, {
      flavor: `${label} — ${this.name} (${remaining - 1}/${counter.max} restantes)`
    });
  }

  async spendLineagePowerUse(options = {}) {
    if (this.type !== "shinobi") return false;

    const notify = options.notify !== false;
    const label = options.label ?? "Action de lignée";
    const counter = this.system.combat?.counters?.lineagePowers;

    if (!counter) {
      return this.spendNindoAwakeningAction(label, {
        actionType: "lineage",
        confirm: options.confirmAwakening !== false,
        notify
      });
    }

    const remaining = Number(counter.remaining ?? 0);
    const usedThisTurn = Boolean(counter.usedThisTurn);

    if (usedThisTurn || remaining <= 0) {
      return this.spendNindoAwakeningAction(label, {
        actionType: "lineage",
        confirm: options.confirmAwakening !== false,
        notify
      });
    }

    await this.update({
      "system.combat.counters.lineagePowers.base": Math.max(0, Number(counter.base ?? 0)),
      "system.combat.counters.lineagePowers.bonus": Math.max(0, Number(counter.bonus ?? 0)),
      "system.combat.counters.lineagePowers.max": Math.max(0, Number(counter.max ?? 0)),
      "system.combat.counters.lineagePowers.remaining": remaining - 1,
      "system.combat.counters.lineagePowers.usedThisTurn": true
    });

    if (notify) {
      ui.notifications.info(`Utilisation de pouvoir de lignée dépensée (${remaining - 1}/${counter.max} restantes).`);
    }

    return true;
  }

  _getHealthTrackSegments(track = this.system.combat?.health?.damageTrack ?? {}) {
    const reserves = track.reserves ?? {};
    const segments = [
      { key: "fatigue1", label: "Fatigue 1", state: "fatigue1" },
      { key: "fatigue2", label: "Fatigue 2", state: "fatigue2" }
    ];

    if (reserves.spiritA?.enabled) {
      segments.push({
        key: "spiritA",
        label: reserves.spiritA.label ?? "Esprit A",
        state: "fatigue2"
      });
    }

    if (reserves.spiritB?.enabled) {
      segments.push({
        key: "spiritB",
        label: reserves.spiritB.label ?? "Esprit B",
        state: "fatigue2"
      });
    }

    segments.push(
      { key: "sonne", label: "Sonné", state: "sonne" },
      { key: "blessure1", label: "Blessure 1", state: "blessure1" },
      { key: "blessure2", label: "Blessure 2", state: "blessure2" },
      { key: "blessure3", label: "Blessure 3", state: "blessure3" }
    );

    if (reserves.woundA?.enabled) {
      segments.push({
        key: "woundA",
        label: reserves.woundA.label ?? "Blessure A",
        state: "blessure3"
      });
    }

    if (reserves.woundB?.enabled) {
      segments.push({
        key: "woundB",
        label: reserves.woundB.label ?? "Blessure B",
        state: "blessure3"
      });
    }

    return segments;
  }

  getHealthTrackSummary(valueOverride = null) {
    const health = this.system.combat?.health ?? {};
    const track = health.damageTrack ?? {};
    const segmentSize = Math.max(1, Number(track.segmentSize ?? 5));
    const segments = this._getHealthTrackSegments(track);
    const max = segments.length * segmentSize;
    const value = Math.min(
      max,
      Math.max(0, Number(valueOverride ?? track.value ?? 0))
    );

    let activeState = "none";
    let activeLabel = "Pleine forme";

    const renderedSegments = segments.map((segment, index) => {
      const start = index * segmentSize;
      const end = start + segmentSize;
      const filled = Math.max(0, Math.min(segmentSize, value - start));
      const complete = filled >= segmentSize;

      if (complete) {
        activeState = segment.state;
        activeLabel = segment.label;
      }

      return {
        ...segment,
        start,
        end,
        filled,
        empty: segmentSize - filled,
        complete,
        marks: `${"-".repeat(filled)}${"/".repeat(segmentSize - filled)}`
      };
    });

    return {
      value,
      max,
      segmentSize,
      activeState,
      activeLabel,
      segments: renderedSegments,
      isSonneOrWorse: ["sonne", "blessure1", "blessure2", "blessure3"].includes(activeState),
      isWounded: ["blessure1", "blessure2", "blessure3"].includes(activeState)
    };
  }

  _getHealthStateRank(stateKey) {
    const ranks = {
      none: 0,
      fatigue1: 1,
      fatigue2: 2,
      sonne: 3,
      blessure1: 4,
      blessure2: 5,
      blessure3: 6
    };

    return ranks[String(stateKey ?? "none")] ?? 0;
  }

  getEffectiveHealthStateSummary() {
    const health = this.system.combat?.health ?? {};
    const trackSummary = this.getHealthTrackSummary();
    const manualState = String(health.manualState ?? "none");
    const chakraState = String(health.chakraState ?? "none");

    const candidates = [
      {
        key: trackSummary.activeState,
        label: trackSummary.activeLabel,
        source: "Piste de santé",
        rank: this._getHealthStateRank(trackSummary.activeState)
      },
      {
        key: chakraState,
        label: NARUTO25E.healthStates?.[chakraState] ?? "Pleine forme",
        source: "Chakra",
        rank: this._getHealthStateRank(chakraState)
      },
      {
        key: manualState,
        label: NARUTO25E.healthStates?.[manualState] ?? "Pleine forme",
        source: "Palier manuel",
        rank: this._getHealthStateRank(manualState)
      }
    ];

    const effective = candidates.reduce((best, candidate) => {
      return candidate.rank > best.rank ? candidate : best;
    }, candidates[0]);

    const effectHints = [];

    if (effective.rank >= 1) {
      effectHints.push("Fatigue : suivre l’état du personnage et les limitations narratives éventuelles.");
    }

    if (effective.rank >= 3) {
      effectHints.push("Sonné : retirer manuellement l’action complexe du tour en cours / prochain tour selon le timing de table.");
    }

    if (effective.rank >= 4) {
      effectHints.push("Blessure : soins longs ou traitement narratif requis.");
    }

    if (effective.rank >= 6) {
      effectHints.push("Blessure 3 : personnage probablement inconscient ou hors combat selon l’arbitrage MJ.");
    }

    return {
      key: effective.key,
      label: effective.label,
      source: effective.source,
      rank: effective.rank,
      candidates,
      effectHints,
      hasPenalty: effective.rank > 0,
      isSonneOrWorse: effective.rank >= 3,
      isWounded: effective.rank >= 4
    };
  }

  _previewHealthTrackDamage(incomingDamage = 0) {
    const health = this.system.combat?.health ?? {};
    const track = health.damageTrack ?? {};
    const segmentSize = Math.max(1, Number(track.segmentSize ?? 5));
    const baseDamage = Math.max(0, Number(incomingDamage ?? 0));
    const criticalThreshold = Math.max(1, Number(track.criticalThreshold ?? 6));
    const criticalBonusSegments = Math.max(0, Number(track.criticalBonusSegments ?? 1));
    const criticalShock = Boolean(track.useCriticalShock) && baseDamage >= criticalThreshold;
    const criticalBonus = criticalShock ? criticalBonusSegments * segmentSize : 0;
    const appliedDamage = baseDamage + criticalBonus;
    const before = this.getHealthTrackSummary();
    const after = this.getHealthTrackSummary(before.value + appliedDamage);

    return {
      baseDamage,
      criticalShock,
      criticalBonus,
      appliedDamage,
      before,
      after
    };
  }

  async calculateWoundFromCombatForm() {
    if (this.type !== "shinobi") return null;

    const calculator = this.system.combat?.health?.woundCalculator ?? {};
    const incomingDamage = Math.max(0, Number(calculator.incomingDamage ?? 0));
    const damageType = calculator.damageType ?? "PHY";
    const preview = this._previewHealthTrackDamage(incomingDamage);

    const safeActorName = foundry.utils.escapeHTML?.(this.name) ?? this.name;
    const criticalText = preview.criticalShock
      ? `Oui (+${preview.criticalBonus} dégâts de choc)`
      : "Non";

    const content = `
      <div class="naruto-roll-card combat-wound-card">
        <header class="naruto-roll-header">
          <h2>Prévisualisation santé</h2>
        </header>

        <div class="naruto-roll-details">
          <div><strong>Acteur :</strong> ${safeActorName}</div>
          <div><strong>Dégâts qui passent :</strong> ${preview.baseDamage} (${damageType})</div>
          <div><strong>Coup violent :</strong> ${criticalText}</div>
          <div><strong>Dégâts appliqués à la piste :</strong> ${preview.appliedDamage}</div>
          <div><strong>Piste :</strong> ${preview.before.value} → ${preview.after.value} / ${preview.after.max}</div>
          <div><strong>État avant :</strong> ${preview.before.activeLabel}</div>
          <div><strong>État après :</strong> ${preview.after.activeLabel}</div>
        </div>

        ${preview.after.isSonneOrWorse ? `
          <p class="warning-text">
            Sonné ou pire : retirer manuellement l’action complexe du tour en cours / prochain tour selon le timing de table.
          </p>
        ` : ""}

        ${preview.after.isWounded ? `
          <p class="warning-text">
            Blessure atteinte : soins longs ou traitement narratif requis selon la gravité.
          </p>
        ` : ""}

        <p class="formula-hint">
          Cette carte prévisualise seulement. Utilise “Appliquer à la piste” sur la fiche pour enregistrer les dégâts.
        </p>
      </div>
    `;

    await ChatMessage.create({
      speaker: ChatMessage.getSpeaker({ actor: this }),
      flavor: `Prévisualisation santé — ${this.name}`,
      content
    });

    return preview;
  }

  async applyDamageToHealthTrack(incomingDamage = 0, options = {}) {
    if (this.type !== "shinobi") return null;

    if (!this.isOwner && !game.user?.isGM) {
      ui.notifications.warn("Tu n’as pas les droits pour modifier la santé de cette fiche.");
      return null;
    }

    const damageType = String(options.damageType ?? "PHY");
    const sourceName = String(options.sourceName ?? "Dégâts");
    const preview = this._previewHealthTrackDamage(incomingDamage);

    await this.update({
      "system.combat.health.damageTrack.value": preview.after.value
    });

    const safeActorName = foundry.utils.escapeHTML?.(this.name) ?? this.name;
    const safeSourceName = foundry.utils.escapeHTML?.(sourceName) ?? sourceName;
    const safeDamageType = foundry.utils.escapeHTML?.(damageType) ?? damageType;
    const actorNameHtml = this._getStyledActorNameHtml(this);
    const remainingBefore = Math.max(0, Number(preview.before.max ?? 0) - Number(preview.before.value ?? 0));
    const remainingAfter = Math.max(0, Number(preview.after.max ?? 0) - Number(preview.after.value ?? 0));
    const criticalText = preview.criticalShock
      ? `Oui (+${preview.criticalBonus} dégâts de choc)`
      : "Non";

    await ChatMessage.create({
      speaker: ChatMessage.getSpeaker({ actor: this }),
      flavor: `Santé — ${safeActorName}`,
      content: `
        <div class="naruto-roll-card combat-wound-card naruto-health-applied-card">
          <header class="naruto-roll-header">
            <h2>Santé — dégâts appliqués</h2>
          </header>

          <div class="naruto-chat-info-list">
            <div>
              <strong>Cible</strong>
              <span>${actorNameHtml}</span>
            </div>

            <div>
              <strong>Source</strong>
              <span>${safeSourceName}</span>
            </div>
          </div>

          <div class="naruto-damage-breakdown is-readable">
            <div>
              <span>Dégâts qui passent</span>
              <strong>${preview.baseDamage}</strong>
            </div>

            <div>
              <span>Type</span>
              <strong>${safeDamageType}</strong>
            </div>

            <div>
              <span>Dégâts appliqués</span>
              <strong>${preview.appliedDamage}</strong>
            </div>
          </div>

          <div class="naruto-chat-info-list">
            <div>
              <strong>Santé restante</strong>
              <span>${remainingBefore} → ${remainingAfter} / ${preview.after.max}</span>
            </div>

            <div>
              <strong>Piste de dégâts</strong>
              <span>${preview.before.value} → ${preview.after.value} / ${preview.after.max}</span>
            </div>

            <div>
              <strong>État</strong>
              <span>${preview.before.activeLabel} → ${preview.after.activeLabel}</span>
            </div>

            <div>
              <strong>Coup violent</strong>
              <span>${criticalText}</span>
            </div>
          </div>

          ${preview.after.isSonneOrWorse ? `
            <p class="warning-text">
              Sonné ou pire : retirer manuellement l’action complexe du tour en cours / prochain tour selon le timing de table.
            </p>
          ` : ""}

          ${preview.after.isWounded ? `
            <p class="warning-text">
              Blessure atteinte : soins longs ou traitement narratif requis.
            </p>
          ` : ""}
        </div>
      `
    });

    ui.notifications.info(`${this.name} : santé ${preview.before.value} → ${preview.after.value}.`);

    return preview;
  }

  async applyDamageToHealthTrackFromCombatForm() {
    const calculator = this.system.combat?.health?.woundCalculator ?? {};
    const incomingDamage = Math.max(0, Number(calculator.incomingDamage ?? 0));
    const damageType = String(calculator.damageType ?? "PHY");

    return this.applyDamageToHealthTrack(incomingDamage, {
      damageType,
      sourceName: "Application manuelle"
    });
  }

  async recoverHealthTrackFromCombatForm() {
    const calculator = this.system.combat?.health?.woundCalculator ?? {};
    const recoveredDamage = Math.max(0, Number(calculator.incomingDamage ?? 0));

    return this.adjustHealthTrack(-recoveredDamage, {
      sourceName: "Récupération manuelle",
      reason: "Soins / récupération"
    });
  }

  async adjustHealthTrack(delta = 0, options = {}) {
    if (this.type !== "shinobi") return null;

    if (!this.isOwner && !game.user?.isGM) {
      ui.notifications.warn("Tu n’as pas les droits pour modifier la santé de cette fiche.");
      return null;
    }

    const amount = Number(delta ?? 0);

    if (!Number.isFinite(amount) || amount === 0) {
      ui.notifications.warn("Indique une valeur différente de 0 pour ajuster la piste de santé.");
      return null;
    }

    const sourceName = String(options.sourceName ?? "Ajustement manuel");
    const reason = String(options.reason ?? "");
    const before = this.getHealthTrackSummary();
    const afterValue = Math.max(0, Math.min(before.max, before.value + amount));
    const after = this.getHealthTrackSummary(afterValue);

    await this.update({
      "system.combat.health.damageTrack.value": after.value
    });

    const safeActorName = foundry.utils.escapeHTML?.(this.name) ?? this.name;
    const safeSourceName = foundry.utils.escapeHTML?.(sourceName) ?? sourceName;
    const safeReason = foundry.utils.escapeHTML?.(reason) ?? reason;
    const directionLabel = amount > 0 ? "Dégâts ajoutés" : "Dégâts récupérés";

    await ChatMessage.create({
      speaker: ChatMessage.getSpeaker({ actor: this }),
      flavor: `Santé — ${safeActorName}`,
      content: `
        <div class="naruto-roll-card combat-wound-card">
          <header class="naruto-roll-header">
            <h2>Santé — ajustement manuel</h2>
          </header>

          <div class="naruto-roll-details">
            <div><strong>Acteur :</strong> ${safeActorName}</div>
            <div><strong>Source :</strong> ${safeSourceName}</div>
            ${safeReason ? `<div><strong>Raison :</strong> ${safeReason}</div>` : ""}
            <div><strong>${directionLabel} :</strong> ${Math.abs(amount)}</div>
            <div><strong>Piste :</strong> ${before.value} → ${after.value} / ${after.max}</div>
            <div><strong>État :</strong> ${before.activeLabel} → ${after.activeLabel}</div>
          </div>

          ${after.isSonneOrWorse ? `
            <p class="warning-text">
              Sonné ou pire : retirer manuellement l’action complexe du tour en cours / prochain tour selon le timing de table.
            </p>
          ` : ""}

          ${after.isWounded ? `
            <p class="warning-text">
              Blessure atteinte : soins longs ou traitement narratif requis.
            </p>
          ` : ""}
        </div>
      `
    });

    ui.notifications.info(`${this.name} : santé ${before.value} → ${after.value}.`);

    return {
      before,
      after,
      delta: amount
    };
  }

  async resetHealthTrack() {
    if (this.type !== "shinobi") return null;

    if (!game.user?.isGM) {
      ui.notifications.warn("Seul le MJ peut remettre la piste de santé à zéro.");
      return null;
    }

    const before = this.getHealthTrackSummary();

    await this.update({
      "system.combat.health.damageTrack.value": 0
    });

    await ChatMessage.create({
      speaker: ChatMessage.getSpeaker({ actor: this }),
      flavor: `Santé remise à zéro — ${this.name}`,
      content: `
        <div class="naruto-roll-card combat-wound-card">
          <header class="naruto-roll-header">
            <h2>Santé remise à zéro</h2>
          </header>

          <p><strong>${this.name}</strong> revient à 0 / ${before.max} sur sa piste de santé.</p>
        </div>
      `
    });

    return true;
  }

  async resetCombatCounters(scope = "round", options = {}) {
    if (this.type !== "shinobi") return;

    const notify = options.notify !== false;
    const requireGM = options.requireGM !== false;

    if (requireGM && !game.user?.isGM) {
      ui.notifications.warn("Seul le MJ peut réinitialiser les compteurs.");
      return;
    }

    const updates = {};

    if (scope === "round") {
      const armMax = Number(this.system.combat?.counters?.interceptions?.arm?.max ?? 0);
      const taiMax = Number(this.system.combat?.counters?.interceptions?.tai?.max ?? 0);

      updates["system.combat.counters.interceptions.arm.remaining"] = armMax;
      updates["system.combat.counters.interceptions.tai.remaining"] = taiMax;
      updates["system.combat.counters.defenses.esquive.remaining"] = 1;
      updates["system.combat.counters.defenses.parade.remaining"] = 1;
    }

    if (scope === "turn") {
      const actions = this._getCombatActionState();
      const delayedAvailable = Boolean(actions.delayedAvailable);
      const delayedGraceUsed = Boolean(actions.delayedTurnGraceUsed);

      let keepDelayedAction = delayedAvailable;
      let delayedNote = "";

      if (delayedAvailable && delayedGraceUsed) {
        keepDelayedAction = false;
        delayedNote = "Action retardée expirée";
      }

      const nextNotes = delayedNote
        ? this._buildCombatActionNotes(actions.notes, delayedNote)
        : actions.notes ?? "";

      updates["system.combat.actions.simpleAvailable"] = true;
      updates["system.combat.actions.complexAvailable"] = true;
      updates["system.combat.actions.delayedAvailable"] = keepDelayedAction;
      updates["system.combat.actions.delayedTurnGraceUsed"] = keepDelayedAction;
      updates["system.combat.actions.notes"] = nextNotes;
      updates["system.combat.counters.lineagePowers.usedThisTurn"] = false;

      if (!keepDelayedAction) {
        updates["system.combat.actions.delayedCreatedRound"] = 0;
        updates["system.combat.actions.delayedCreatedTurn"] = 0;
        updates["system.combat.actions.delayedCreatedCombatantId"] = "";
      }
    }

    if (scope === "session") {
      const lineageMax = Number(this.system.combat?.counters?.lineagePowers?.max ?? 0);

      updates["system.combat.counters.lineagePowers.remaining"] = lineageMax;
      updates["system.combat.counters.lineagePowers.usedThisTurn"] = false;
    }

    if (!["round", "turn", "session"].includes(scope)) {
      ui.notifications.warn(`Type de réinitialisation inconnu : ${scope}.`);
      return;
    }

    if (Object.keys(updates).length > 0) {
      await this.update(updates);
    }

    if (notify && scope === "round") {
      ui.notifications.info("Compteurs de round réinitialisés.");
    }

    if (notify && scope === "turn") {
      ui.notifications.info("Actions du tour réinitialisées.");
    }

    if (notify && scope === "session") {
      ui.notifications.info("Compteurs de session réinitialisés.");
    }
  }


  _prepareInventory(system) {
    if (!system.inventory) system.inventory = {};
    if (!system.consumables) system.consumables = {};

    const inventory = system.inventory;

    inventory.ryo = Math.max(0, Number(inventory.ryo ?? 0));
    inventory.ryoDelta = Math.max(0, Number(inventory.ryoDelta ?? 0));

    inventory.permissions = inventory.permissions ?? {};
    inventory.permissions.allowPlayerRyoEdit = Boolean(inventory.permissions.allowPlayerRyoEdit);

    inventory.newItem = inventory.newItem ?? {};
    inventory.newItem.name = inventory.newItem.name ?? "";
    inventory.newItem.type = inventory.newItem.type ?? "misc";
    inventory.newItem.quantity = Math.max(1, Number(inventory.newItem.quantity ?? 1));

    const toxicity = system.consumables.toxicity ?? {};
    system.consumables.toxicity = {
      value: Math.max(0, Number(toxicity.value ?? 0)),
      max: Math.max(1, Number(toxicity.max ?? 10)),
      dailyValue: Math.max(0, Number(toxicity.dailyValue ?? 0)),
      dailyMax: Math.max(1, Number(toxicity.dailyMax ?? 6)),
      weeklyValue: Math.max(0, Number(toxicity.weeklyValue ?? 0)),
      weeklyMax: Math.max(1, Number(toxicity.weeklyMax ?? 10)),
      notes: toxicity.notes ?? ""
    };

    if (!Array.isArray(inventory.items)) {
      inventory.items = [];
    }

    inventory.items = inventory.items.map((item, index) => {
      const type = NARUTO25E.inventoryTypes[item.type] ? item.type : "misc";
      const carry = this._prepareInventoryCarryData(item, type);
      const carryState = this._normalizeInventoryCarryState(item.carryState, type, carry);

      return {
        id: item.id ?? foundry.utils.randomID(16),
        sourceItemId: item.sourceItemId ?? "",
        sourceItemUuid: item.sourceItemUuid ?? "",
        name: item.name ?? "Objet",
        type,
        description: item.description ?? "",
        subtype: item.subtype ?? "",
        taxonomy: foundry.utils.deepClone(item.taxonomy ?? {}),
        automation: foundry.utils.deepClone(item.automation ?? {}),
        combat: foundry.utils.deepClone(item.combat ?? {}),
        damage: this._normalizeDamageData(item.damage ?? {}),
        quantity: Math.max(1, Number(item.quantity ?? 1)),
        carryState,
        carry,
        holdable: carry.holdable,
        wearable: carry.wearable,
        equipped: this._isInventoryCarryStateEquipped(type, carryState),
        notes: item.notes ?? "",
        value: Math.max(0, Number(item.value ?? 0)),
        weight: Math.max(0, Number(item.weight ?? 0)),
        useEffect: {
          type: item.useEffect?.type ?? "none",
          resource: item.useEffect?.resource ?? "none",
          amount: Math.max(0, Number(item.useEffect?.amount ?? 0)),
          consumeOnUse: item.useEffect?.consumeOnUse !== false,
          text: item.useEffect?.text ?? ""
        },
        uses: {
          enabled: Boolean(item.uses?.enabled),
          value: Math.max(0, Number(item.uses?.value ?? item.uses?.max ?? 0)),
          max: Math.max(0, Number(item.uses?.max ?? 0)),
          per: item.uses?.per ?? "charges"
        },
        hasUses: Boolean(item.uses?.enabled) && Math.max(0, Number(item.uses?.max ?? 0)) > 0,
        hasCombatUse: type === "weapon" || this._isInventoryExplosiveItem(item),
        toxicity: {
          enabled: Boolean(item.toxicity?.enabled),
          amount: Math.max(0, Number(item.toxicity?.amount ?? 0)),
          period: ["none", "day", "week"].includes(item.toxicity?.period)
            ? item.toxicity.period
            : "none",
          iaTurns: Math.max(0, Number(item.toxicity?.iaTurns ?? 0))
        },
        creationGranted: Boolean(item.creationGranted),
        grantedAtCreation: Boolean(item.grantedAtCreation),
        creationPackage: item.creationPackage ?? "",
        grantedAt: item.grantedAt ?? "",
        grantedBy: item.grantedBy ?? "",
        flags: foundry.utils.deepClone(item.flags ?? {}),
        sort: Number(item.sort ?? index)
      };
    }).sort((a, b) => {
      const typeA = NARUTO25E.inventoryTypeOrder.indexOf(a.type);
      const typeB = NARUTO25E.inventoryTypeOrder.indexOf(b.type);

      if (typeA !== typeB) return typeA - typeB;
      return Number(a.sort ?? 0) - Number(b.sort ?? 0);
    });

    const valueByType = {};

    for (const type of NARUTO25E.inventoryTypeOrder ?? []) {
      valueByType[type] = 0;
    }

    let totalItems = 0;
    let totalWeight = 0;
    let equippedWeight = 0;
    let totalValue = 0;

    for (const item of inventory.items) {
      const quantity = Math.max(1, Number(item.quantity ?? 1));
      const itemWeight = Math.max(0, Number(item.weight ?? 0));
      const itemValue = Math.max(0, Number(item.value ?? 0));

      const stackWeight = itemWeight * quantity;
      const stackValue = itemValue * quantity;

      totalItems += quantity;
      totalWeight += stackWeight;
      totalValue += stackValue;

      if (item.equipped) {
        equippedWeight += stackWeight;
      }

      valueByType[item.type] = Number(valueByType[item.type] ?? 0) + stackValue;
    }

    const cor = Math.max(1, this._getBaseEffective(system, "cor"));
    const lightLimit = cor * 5;
    const heavyLimit = cor * 10;
    const criticalLimit = cor * 15;

    inventory.summary = {
      totalItems,
      totalWeight: Number(totalWeight.toFixed(2)),
      equippedWeight: Number(equippedWeight.toFixed(2)),
      totalValue: Number(totalValue.toFixed(2)),
      valueByType: {
        weapon: Number((valueByType.weapon ?? 0).toFixed(2)),
        armor: Number((valueByType.armor ?? 0).toFixed(2)),
        consumable: Number((valueByType.consumable ?? 0).toFixed(2)),
        misc: Number((valueByType.misc ?? 0).toFixed(2))
      }
    };

    inventory.encumbrance = {
      disabled: true,
      cor,
      current: Number(totalWeight.toFixed(2)),
      lightLimit,
      heavyLimit,
      criticalLimit,
      state: "disabled",
      label: "Charge désactivée",
      statusClass: "inventory-load-disabled",
      penaltyText: "La charge est désactivée pour Naruto 2.5e dans cette version. Le poids reste une information de référence.",
      isLoaded: false,
      isOverloaded: false,
      isCritical: false
    };
  }

  _prepareInventoryCarryData(item = {}, type = "misc") {
    const carry = item.carry ?? {};

    const inferredHoldable = type === "weapon" || this._isInventoryExplosiveItem(item);

    const holdable = Boolean(
      carry.holdable
      ?? item.holdable
      ?? inferredHoldable
    );

    const wearable = Boolean(
      carry.wearable
      ?? item.wearable
      ?? type === "armor"
    );

    return {
      holdable,
      wearable
    };
  }

  _getInventoryCarryStateDefinitions() {
    return {
      notHeld: "Non tenu",
      rightHand: "Main droite",
      leftHand: "Main gauche",
      twoHands: "Deux mains",
      dropped: "Lâché",
      worn: "Porté"
    };
  }

  _getInventoryCarryStateLabel(state) {
    return this._getInventoryCarryStateDefinitions()[state] ?? state;
  }

  _getAllowedInventoryCarryStates(type = "misc", carry = {}) {
    const states = ["notHeld"];

    if (carry.holdable) {
      states.push("rightHand", "leftHand", "twoHands");
    }

    if (carry.wearable) {
      states.push("worn");
    }

    if (carry.holdable || carry.wearable || type === "weapon" || type === "armor") {
      states.push("dropped");
    }

    return states;
  }

  _getInventoryCarryStateOptions(item = {}) {
    const type = NARUTO25E.inventoryTypes[item.type] ? item.type : "misc";
    const carry = this._prepareInventoryCarryData(item, type);
    const current = this._normalizeInventoryCarryState(item.carryState, type, carry);
    const labels = this._getInventoryCarryStateDefinitions();

    return this._getAllowedInventoryCarryStates(type, carry).map((state) => ({
      key: state,
      label: labels[state] ?? state,
      selected: state === current
    }));
  }

  _normalizeInventoryCarryState(state, type = "misc", carry = null) {
    const carryData = carry ?? this._prepareInventoryCarryData({}, type);
    const requested = String(state ?? "");
    const allowed = this._getAllowedInventoryCarryStates(type, carryData);

    if (allowed.includes(requested)) return requested;

    return "notHeld";
  }

  _isInventoryCarryStateEquipped(type, carryState) {
    if (type === "armor") return carryState === "worn";

    return ["rightHand", "leftHand", "twoHands"].includes(carryState);
  }

  _applyInventoryHandConflicts(items, itemId, nextState) {
    if (!["rightHand", "leftHand", "twoHands"].includes(nextState)) return items;

    return items.map((entry) => {
      if (entry.id === itemId) return entry;

      const currentState = String(entry.carryState ?? "notHeld");
      const mustRelease =
        nextState === "twoHands"
          ? ["rightHand", "leftHand", "twoHands"].includes(currentState)
          : currentState === nextState || currentState === "twoHands";

      if (!mustRelease) return entry;

      return {
        ...entry,
        carryState: "notHeld",
        equipped: false
      };
    });
  }

  async setInventoryItemCarryState(itemId, carryState) {
    if (this.type !== "shinobi") return;

    let items = foundry.utils.deepClone(this.system.inventory?.items ?? []);
    const item = items.find((entry) => entry.id === itemId);

    if (!item) {
      ui.notifications.warn("Objet introuvable.");
      return;
    }

    const type = NARUTO25E.inventoryTypes[item.type] ? item.type : "misc";
    const carry = this._prepareInventoryCarryData(item, type);
    const nextState = this._normalizeInventoryCarryState(carryState, type, carry);
    const allowedStates = this._getInventoryCarryStateOptions(item).map((option) => option.key);

    if (!allowedStates.includes(nextState)) {
      ui.notifications.warn("Cet objet ne peut pas être placé dans cet état.");
      return;
    }

    if (nextState !== "dropped") {
      const actionSpent = await this.spendCombatAction("simple", `${item.name} — ${this._getInventoryCarryStateLabel(nextState)}`);

      if (!actionSpent) return;
    }

    items = this._applyInventoryHandConflicts(items, itemId, nextState);

    const updatedItem = items.find((entry) => entry.id === itemId);
    updatedItem.carryState = nextState;
    updatedItem.carry = carry;
    updatedItem.holdable = carry.holdable;
    updatedItem.wearable = carry.wearable;
    updatedItem.equipped = this._isInventoryCarryStateEquipped(type, nextState);

    await this.update({
      "system.inventory.items": items
    });

    ui.notifications.info(`${item.name} : ${this._getInventoryCarryStateLabel(nextState)}.`);
  }

    _getUchihaEyePowerItemName(powerKey) {
      const key = String(powerKey ?? "");

      const itemNames = {
        amaterasu: "Amaterasu — Flammes noires",
        amaterasuUnstable: "Amaterasu — Flammes noires instables",
        enton: "Enton — Kagutsuchi",
        tsukuyomi: "Tsukuyomi — Le Monde Illusoire",
        kamui: "Kamui",
        kotoamatsukami: "Kotoamatsukami — Allégeance",
        custom: "Pouvoir Mangekyō original"
      };

      return itemNames[key] ?? "";
    }

    _isUchihaEyeStateUsableForMangekyo(stateKey) {
      const state = String(stateKey ?? "healthy");

      return state !== "blind";
    }

    _getUchihaMangekyoEyeMinimumLineage(eyeKey) {
      return eyeKey === "right" ? 6 : 7;
    }

    _isUchihaMangekyoEyeChoiceUnlocked(eyeKey, lineageValue = null) {
      const effectiveLineage = lineageValue === null
        ? this._getEffectiveLineageValue()
        : Number(lineageValue ?? 0);

      return effectiveLineage >= this._getUchihaMangekyoEyeMinimumLineage(eyeKey);
    }

    _hasEffectiveMangekyoSharinganForEyePowers() {
      const hasUchihaLineage = this._hasMechanicalClan("uchiha", { purpose: "powers" });
      const lineageValue = this._getEffectiveLineageValue();
      const hasMangekyo = Boolean(this.system.heritage?.gmOptions?.hasMangekyoSharingan);

      return hasUchihaLineage && lineageValue >= 5 && hasMangekyo;
    }

    _getValidatedUchihaMangekyoEyePowerDefinitions() {
      if (this.type !== "shinobi") return [];

      const uchihaPowerMode = NARUTO25E.getUchihaPowerMode?.() ?? "classic";
      if (uchihaPowerMode !== "original") return [];

      if (!this._hasEffectiveMangekyoSharinganForEyePowers()) return [];

      const lineageValue = this._getEffectiveLineageValue();
      const mangekyo = this.system.heritage?.uchiha?.mangekyo ?? {};
      const rightEyePower = String(mangekyo.rightEyePower ?? "");
      const leftEyePower = String(mangekyo.leftEyePower ?? "");

      const eyeData = {
        right: {
          eye: "right",
          powerKey: rightEyePower,
          playerValidated: Boolean(mangekyo.rightEyePlayerValidated),
          gmValidated: Boolean(mangekyo.rightEyeGmValidated),
          state: String(mangekyo.rightEyeState ?? "healthy")
        },
        left: {
          eye: "left",
          powerKey: leftEyePower,
          playerValidated: Boolean(mangekyo.leftEyePlayerValidated),
          gmValidated: Boolean(mangekyo.leftEyeGmValidated),
          state: String(mangekyo.leftEyeState ?? "healthy")
        }
      };

      const getOtherEye = (eyeKey) => {
        return eyeKey === "right" ? "left" : "right";
      };

      const isEyeChoiceUnlocked = (eyeKey) => {
        return this._isUchihaMangekyoEyeChoiceUnlocked(eyeKey, lineageValue);
      };

      const isEyeChoiceValidatedIgnoringState = (eyeKey) => {
        const currentEye = eyeData[eyeKey];
        if (!currentEye) return false;
        if (!isEyeChoiceUnlocked(eyeKey)) return false;
        if (!currentEye.powerKey) return false;
        if (!currentEye.playerValidated) return false;
        if (!currentEye.gmValidated) return false;

        /*
          Enton est le pouvoir de contrôle des flammes noires.
          Il ne peut pas être le premier pouvoir débloqué.
          Dans notre progression, le premier œil est l’œil droit au rang 6.
        */
        if (eyeKey === "right" && currentEye.powerKey === "enton") {
          return false;
        }

        const selectionValidation = NARUTO25E.canSelectUchihaEyePower?.({
          powerKey: currentEye.powerKey,
          eyeKey,
          rightEyePower,
          leftEyePower,
          rightEyePlayerValidated: Boolean(eyeData.right.playerValidated)
        }) ?? { valid: true, reason: "" };

        if (!selectionValidation.valid) return false;

        return true;
      };

      const isEyeFullyValidated = (eyeKey) => {
        const currentEye = eyeData[eyeKey];
        if (!isEyeChoiceValidatedIgnoringState(eyeKey)) return false;
        if (!this._isUchihaEyeStateUsableForMangekyo(currentEye.state)) return false;

        const powerData = NARUTO25E.getUchihaEyePowerData?.(currentEye.powerKey);
        const requiredOtherEyePower = String(powerData?.requiresOtherEyePower ?? "");

        if (requiredOtherEyePower) {
          const otherEyeKey = getOtherEye(eyeKey);
          const otherEye = eyeData[otherEyeKey];

          if (!otherEye) return false;
          if (!isEyeChoiceUnlocked(otherEyeKey)) return false;
          if (otherEye.powerKey !== requiredOtherEyePower) return false;
          if (!otherEye.playerValidated) return false;
          if (!otherEye.gmValidated) return false;
          if (!this._isUchihaEyeStateUsableForMangekyo(otherEye.state)) return false;
        }

        return true;
      };

      const isEntonEyeValidatedAndUsable = (eyeKey) => {
        const eye = eyeData[eyeKey];

        return Boolean(eye)
          && eye.powerKey === "enton"
          && isEyeChoiceUnlocked(eyeKey)
          && eye.playerValidated
          && eye.gmValidated
          && this._isUchihaEyeStateUsableForMangekyo(eye.state);
      };

      const definitions = [];

      for (const eyeKey of ["right", "left"]) {
        const currentEye = eyeData[eyeKey];
        if (!currentEye?.powerKey) continue;

        /*
          Cas spécial validé :
          Amaterasu + Enton.
          Si l’œil Amaterasu devient aveugle, Enton est perdu,
          mais l’autre œil peut encore produire un Amaterasu basique instable.
        */
        if (
          currentEye.powerKey === "amaterasu"
          && isEyeChoiceValidatedIgnoringState(eyeKey)
          && !this._isUchihaEyeStateUsableForMangekyo(currentEye.state)
        ) {
          const otherEyeKey = getOtherEye(eyeKey);

          if (isEntonEyeValidatedAndUsable(otherEyeKey)) {
            definitions.push({
              clan: "uchiha",
              key: `uchiha_mangekyo_${eyeKey}_amaterasu_unstable`,
              name: "Amaterasu — Flammes noires instables"
            });
          }

          continue;
        }

        if (!isEyeFullyValidated(eyeKey)) continue;

        const powerKey = currentEye.powerKey;
        const itemName = this._getUchihaEyePowerItemName(powerKey);

        if (!itemName) continue;

        definitions.push({
          clan: "uchiha",
          key: `uchiha_mangekyo_${eyeKey}_${powerKey}`,
          name: itemName
        });
      }

      return definitions;
    }

    _getCurrentLineagePowerDefinitions() {
    if (this.type !== "shinobi") return [];

    const system = this.system ?? {};
    const heritage = system.heritage ?? {};
    const gmOptions = heritage.gmOptions ?? {};
    const lineageValue = this._getEffectiveLineageValue();
    const definitions = [];

    const addPower = (clan, key, name) => {
      if (!clan || !key || !name) return;

      const exists = definitions.some((definition) => definition.name === name);
      if (exists) return;

      definitions.push({
        clan,
        key,
        name
      });
    };

    const clanKeys = this._getMechanicalClanKeys({ purpose: "powers" });

    for (const clanKey of clanKeys) {
      if (clanKey === "uchiha") {
        const hasRinnegan = Boolean(gmOptions.hasRinnegan);

        if (hasRinnegan) {
          addPower("uchiha", "uchiha-rinnegan", "Rinnegan");
        } else if (lineageValue >= 3) {
          addPower("uchiha", "uchiha_sharingan_3", "Sharingan — 3 tomoe");
        } else if (lineageValue >= 2) {
          addPower("uchiha", "uchiha_sharingan_2", "Sharingan — 2 tomoe");
        } else if (lineageValue >= 1) {
          addPower("uchiha", "uchiha_sharingan_1", "Sharingan — 1 tomoe");
        }

        if (lineageValue >= 4) {
          addPower("uchiha", "uchiha_magen", "Magen — Illusion démoniaque");
        }

        if (lineageValue >= 5 && Boolean(gmOptions.hasMangekyoSharingan) && !hasRinnegan) {
          addPower("uchiha", "uchiha_mangekyo", "Mangekyō Sharingan");
        }

        if (lineageValue >= 5 && Boolean(gmOptions.hasMangekyoSharingan)) {
          const validatedEyePowerDefinitions = this._getValidatedUchihaMangekyoEyePowerDefinitions();

          for (const eyePowerDefinition of validatedEyePowerDefinitions) {
            addPower(
              eyePowerDefinition.clan,
              eyePowerDefinition.key,
              eyePowerDefinition.name
            );
          }
        }

        if (lineageValue >= 9) {
          const mangekyo = heritage.uchiha?.mangekyo ?? {};
          const rightEyeUsable = this._isUchihaEyeStateUsableForMangekyo?.(
            mangekyo.rightEyeState ?? "healthy"
          ) ?? String(mangekyo.rightEyeState ?? "healthy") !== "blind";

          const leftEyeUsable = this._isUchihaEyeStateUsableForMangekyo?.(
            mangekyo.leftEyeState ?? "healthy"
          ) ?? String(mangekyo.leftEyeState ?? "healthy") !== "blind";

          if (rightEyeUsable) {
            addPower("uchiha", "uchiha_izanagi", "Izanagi");
          }

          if (leftEyeUsable) {
            addPower("uchiha", "uchiha_izanami", "Izanami");
          }
        }

        continue;
      }

      if (clanKey === "hyuga") {
        if (lineageValue >= 1) addPower("hyuga", "hyuga_byakugan", "Byakugan");
        if (lineageValue >= 2) addPower("hyuga", "hyuga_juken", "Art du Poing Faible");
        if (lineageValue >= 3) addPower("hyuga", "hyuga_vision_spatiale", "Vision Spatiale");
        if (lineageValue >= 4) addPower("hyuga", "hyuga_intensite_spirituelle", "Intensité Spirituelle");
        if (lineageValue >= 5) addPower("hyuga", "hyuga_hakke_kusho", "Hakke Kūshō — Technique de la Paume Absolue");
        if (lineageValue >= 6) addPower("hyuga", "hyuga_359_degres", "359 Degrés");
        if (lineageValue >= 7) addPower("hyuga", "hyuga_64_paumes", "Hakke Rokujūyon Shō — Soixante-Quatre Paumes");
        if (lineageValue >= 8) addPower("hyuga", "hyuga_force_mystique", "Force Mystique");
        if (lineageValue >= 9) addPower("hyuga", "hyuga_kaiten", "Hakkeshō Kaiten — Barrage Tournoyant de Tendō");

        if (lineageValue >= 10 && Boolean(gmOptions.hasTenseigan)) {
          addPower("hyuga", "hyuga_tenseigan", "Tenseigan — Œil de la Réincarnation");
        }

        continue;
      }

      if (clanKey === "kato") {
        if (lineageValue >= 1) addPower("kato", "kato_yurengan", "Yūrengan");
        if (lineageValue >= 2) addPower("kato", "kato_forteresse_mentale", "Forteresse Mentale");
        if (lineageValue >= 3) addPower("kato", "kato_ikiryo", "Ikiryō — Forme Spectrale");
        if (lineageValue >= 4) addPower("kato", "kato_invisibilite_fantomatique", "Invisibilité Fantomatique");
        if (lineageValue >= 5) addPower("kato", "kato_zekkyou", "Zekkyou — Cri Silencieux");
        if (lineageValue >= 6) addPower("kato", "kato_amplificateur", "Amplificateur");
        if (lineageValue >= 7) addPower("kato", "kato_possession_spectrale", "Possession Spectrale");
        if (lineageValue >= 9) addPower("kato", "kato_himei", "Himei — Cri de la Banshee");
        if (lineageValue >= 10) addPower("kato", "kato_reika", "Reika — Transformation Spirituelle");

        continue;
      }

      if (clanKey === "aburame") {
        if (lineageValue >= 1) addPower("aburame", "aburame_kikaichu", "Kikaichū — Colonie symbiotique");
        if (lineageValue >= 2) addPower("aburame", "aburame_empathie", "Empathie");
        if (lineageValue >= 3) addPower("aburame", "aburame_kaisan", "Kaisan — Devenir la Multitude");
        if (lineageValue >= 4) addPower("aburame", "aburame_ruche", "Ruche");
        if (lineageValue >= 5) addPower("aburame", "aburame_ryusei", "Ryūsei — Météore d’Insectes");

        continue;
      }

      if (clanKey === "nara") {
        if (lineageValue >= 1) addPower("nara", "nara_pouvoir_ombres", "Pouvoir des Ombres");
        if (lineageValue >= 2) addPower("nara", "nara_stratege", "Stratège");
        if (lineageValue >= 3) addPower("nara", "nara_kagemane", "Kagemane — Manipulation des Ombres");
        if (lineageValue >= 4) addPower("nara", "nara_profondeur_mentale", "Profondeur mentale");
        if (lineageValue >= 5) addPower("nara", "nara_kage_nui", "Kage Nui — Entrelacement des Ombres");

        continue;
      }

      if (clanKey === "senju") {
        if (lineageValue >= 1) addPower("senju", "senju_mokuton", "Nature Supérieure — Mokuton");
        if (lineageValue >= 2) addPower("senju", "senju_force_naturelle", "Force Naturelle");
        if (lineageValue >= 3) addPower("senju", "senju_jukai_shirei", "Jukai Shirei — Domination Végétale");
        if (lineageValue >= 4) addPower("senju", "senju_vague_chakra", "Vague de Chakra");
        if (lineageValue >= 5) addPower("senju", "senju_shichuro", "Shichūrō — La Prison aux Quatre Piliers");
        if (lineageValue >= 6) addPower("senju", "senju_energie_mystique", "Énergie Mystique");
        if (lineageValue >= 7) addPower("senju", "senju_jukai_gohei", "Jukai Gōhei — Fusion Végétale");
        if (lineageValue >= 8) addPower("senju", "senju_piliers_mythiques", "Piliers Mythiques");
        if (lineageValue >= 9) addPower("senju", "senju_jukai_heki", "Jukai Heki — Barrière Végétale");
        if (lineageValue >= 10) addPower("senju", "senju_jukai_kotan", "Jukai Kōtan — Naissance de la Forêt");

        continue;
      }

      if (clanKey === "inuzuka") {
        if (lineageValue >= 1) addPower("inuzuka", "inuzuka_gardien_inu", "Gardien du clan Inu");
        if (lineageValue >= 2) addPower("inuzuka", "inuzuka_pisteur_chikushodo", "Pisteur de Chikushōdō");
        if (lineageValue >= 3) addPower("inuzuka", "inuzuka_forme_sauvage", "Jinjū Kongō — Forme Sauvage");
        if (lineageValue >= 4) addPower("inuzuka", "inuzuka_empathie_animale", "Empathie Animale");
        if (lineageValue >= 5) addPower("inuzuka", "inuzuka_gatsuga", "Gatsuga — Furie Sauvage");
        if (lineageValue >= 6) addPower("inuzuka", "inuzuka_flair", "Flair");
        if (lineageValue >= 7) addPower("inuzuka", "inuzuka_sotoro", "Sōtōrō — Loup Monstrueux à Deux Têtes");
        if (lineageValue >= 8) addPower("inuzuka", "inuzuka_crocs_fourrure", "Crocs & Fourrure");
        if (lineageValue >= 9) addPower("inuzuka", "inuzuka_appeler_meute", "Appeler la Meute");
        if (lineageValue >= 10) addPower("inuzuka", "inuzuka_totem", "Totem");

        continue;
      }

      const lineageFeatures = NARUTO25E.clanLineageFeatures?.[clanKey] ?? [];

      for (const feature of lineageFeatures) {
        const rank = Number(feature.rank ?? 0);
        const name = String(feature.label ?? "");

        if (rank <= 0 || !name) continue;
        if (lineageValue < rank) continue;

        addPower(
          clanKey,
          `${clanKey}_${this._slugifyLineagePowerKey(name)}`,
          name
        );
      }
    }

    return definitions;
  }

  _getManagedLineagePowerNames() {
    const names = new Set([
      "Sharingan — 1 tomoe",
      "Sharingan — 2 tomoe",
      "Sharingan — 3 tomoe",
      "Magen — Illusion démoniaque",
      "Mangekyō Sharingan",
      "Tsukuyomi — Le Monde Illusoire",
      "Amaterasu — Flammes noires",
      "Amaterasu — Flammes noires instables",
      "Enton — Kagutsuchi",
      "Kotoamatsukami — Allégeance",
      "Kamui",
      "Pouvoir Mangekyō original",
      "Rinnegan",
      "Izanagi",
      "Izanami",

      "Byakugan",
      "Art du Poing Faible",
      "Vision Spatiale",
      "Intensité Spirituelle",
      "Hakke Kūshō — Technique de la Paume Absolue",
      "359 Degrés",
      "Hakke Rokujūyon Shō — Soixante-Quatre Paumes",
      "Force Mystique",
      "Hakkeshō Kaiten — Barrage Tournoyant de Tendō",
      "Tenseigan — Œil de la Réincarnation",

      "Yūrengan",
      "Forteresse Mentale",
      "Ikiryō — Forme Spectrale",
      "Invisibilité Fantomatique",
      "Zekkyou — Cri Silencieux",
      "Amplificateur",
      "Possession Spectrale",
      "Himei — Cri de la Banshee",
      "Reika — Transformation Spirituelle",

      "Kikaichū — Colonie symbiotique",
      "Empathie",
      "Kaisan — Devenir la Multitude",
      "Ruche",
      "Ryūsei — Météore d’Insectes",

      "Pouvoir des Ombres",
      "Stratège",
      "Kagemane — Manipulation des Ombres",
      "Profondeur mentale",
      "Kage Nui — Entrelacement des Ombres",

      "Nature Supérieure — Mokuton",
      "Force Naturelle",
      "Jukai Shirei — Domination Végétale",
      "Vague de Chakra",
      "Shichūrō — La Prison aux Quatre Piliers",
      "Énergie Mystique",
      "Jukai Gōhei — Fusion Végétale",
      "Piliers Mythiques",
      "Jukai Heki — Barrière Végétale",
      "Jukai Kōtan — Naissance de la Forêt",

      "Gardien du clan Inu",
      "Pisteur de Chikushōdō",
      "Jinjū Kongō — Forme Sauvage",
      "Empathie Animale",
      "Gatsuga — Furie Sauvage",
      "Flair",
      "Sōtōrō — Loup Monstrueux à Deux Têtes",
      "Crocs & Fourrure",
      "Appeler la Meute",
      "Totem"
    ]);

    for (const features of Object.values(NARUTO25E.clanLineageFeatures ?? {})) {
      for (const feature of features ?? []) {
        if (feature?.label) names.add(feature.label);
      }
    }

    return names;
  }

  async _getLineagePowerSourceData(powerName) {
    const pack = game.packs.get("naruto-25e.pouvoirs-lignee");

    if (pack) {
      const index = await pack.getIndex({
        fields: ["name", "type", "system.clan", "system.lineageRank"]
      });

      const entry = index.find((document) => document.name === powerName);

      if (entry) {
        const sourceDocument = await pack.getDocument(entry._id);
        if (sourceDocument) return sourceDocument.toObject();
      }

      console.warn(`Naruto 2.5e | Pouvoir de lignée absent du compendium, tentative JSON : ${powerName}.`);
    } else {
      console.warn(`Naruto 2.5e | Compendium pouvoirs-lignee introuvable, tentative JSON : ${powerName}.`);
    }

    const jsonData = await this._getLineagePowerSourceDataFromJson(powerName);
    if (jsonData) return jsonData;

    return this._getLineagePowerSourceDataFromConfig(powerName);
  }

  async syncLineagePowersFromHeritage({ notify = false } = {}) {
    if (this.type !== "shinobi") return;
    if (!game.user?.isGM) return;

    if (this._naruto25eLineageSyncInProgress) {
      this._naruto25eLineageSyncPending = true;
      return;
    }

    this._naruto25eLineageSyncInProgress = true;

    let totalDeleted = 0;
    let totalCreated = 0;
    let totalUpdated = 0;

    try {
      do {
        this._naruto25eLineageSyncPending = false;

        const desiredDefinitions = this._getCurrentLineagePowerDefinitions();
        const desiredNames = new Set(desiredDefinitions.map((definition) => definition.name));
        const managedNames = this._getManagedLineagePowerNames();

        const currentManagedItems = this.items.filter((item) => {
          return item.type === "pouvoirLignee" && managedNames.has(item.name);
        });

        const activePowers = this._getActiveLineagePowers();
        const activePowerIds = new Set(activePowers.map((power) => power.itemId));

        const managedItemsByName = new Map();

        for (const item of currentManagedItems) {
          const items = managedItemsByName.get(item.name) ?? [];
          items.push(item);
          managedItemsByName.set(item.name, items);
        }

        const duplicateItemsToDelete = [];

        for (const [name, items] of managedItemsByName.entries()) {
          if (items.length <= 1) continue;

          const keptItem =
            items.find((item) => activePowerIds.has(item.id))
            ?? items.find((item) => Boolean(item.flags?.["naruto-25e"]?.autoLineagePower))
            ?? items[0];

          for (const item of items) {
            if (item.id === keptItem.id) continue;
            duplicateItemsToDelete.push(item);
          }

          console.warn(`Naruto 2.5e | Doublons de pouvoir de lignée détectés sur ${this.name} : ${name}. Conservation de ${keptItem.id}.`);
        }

        const duplicateItemIds = new Set(duplicateItemsToDelete.map((item) => item.id));

        const undesiredItemsToDelete = currentManagedItems.filter((item) => {
          if (duplicateItemIds.has(item.id)) return false;
          return !desiredNames.has(item.name);
        });

        const itemsToDelete = [
          ...duplicateItemsToDelete,
          ...undesiredItemsToDelete
        ];

        const deletedIds = itemsToDelete.map((item) => item.id);

        if (deletedIds.length > 0) {
          const deletedIdSet = new Set(deletedIds);
          const remainingActivePowers = activePowers.filter((power) => {
            return !deletedIdSet.has(power.itemId);
          });

          await this.deleteEmbeddedDocuments("Item", deletedIds);
          totalDeleted += deletedIds.length;

          if (remainingActivePowers.length !== activePowers.length) {
            await this.update({
              "system.resources.activeLineagePowers": remainingActivePowers
            });
          }
        }

        const deletedIdSet = new Set(deletedIds);
        const currentPowerItems = this.items.filter((item) => {
          return item.type === "pouvoirLignee" && !deletedIdSet.has(item.id);
        });

        const currentItemsByName = new Map();

        for (const item of currentPowerItems) {
          if (currentItemsByName.has(item.name)) continue;
          currentItemsByName.set(item.name, item);
        }

        const documentsToCreate = [];
        const documentsToUpdate = [];
        const passivePowerIdsToDeactivate = new Set();

        for (const definition of desiredDefinitions) {
          const sourceData = await this._getLineagePowerSourceData(definition.name);
          if (!sourceData) continue;

          if (definition.name === "Invisibilité Fantomatique" && this._getKatoInvisibilityMode() === "maintained") {
            sourceData.system = sourceData.system ?? {};
            sourceData.system.powerType = "maintained";
            sourceData.system.activationCost = Math.max(10, Number(sourceData.system.activationCost ?? 0));
            sourceData.system.maintenanceCost = Math.max(5, Number(sourceData.system.maintenanceCost ?? 0));
            sourceData.system.effect = `${sourceData.system.effect ?? ""} Mode MJ actuel : pouvoir maintenu, activation 10 Chakra, entretien 5 Chakra par tour actif.`;
          }

          sourceData.flags = foundry.utils.mergeObject(sourceData.flags ?? {}, {
            "naruto-25e": {
              autoLineagePower: true,
              lineagePowerKey: definition.key,
              lineagePowerClan: definition.clan
            }
          }, {
            inplace: false
          });

          const existingItem = currentItemsByName.get(definition.name);

          if (existingItem) {
            documentsToUpdate.push({
              _id: existingItem.id,
              img: sourceData.img,
              "system.description": sourceData.system?.description ?? "",
              "system.clan": sourceData.system?.clan ?? "",
              "system.lineageRank": Math.max(1, Number(sourceData.system?.lineageRank ?? 1)),
              "system.powerType": sourceData.system?.powerType ?? "maintained",
              "system.activationCost": Math.max(0, Number(sourceData.system?.activationCost ?? 0)),
              "system.maintenanceCost": Math.max(0, Number(sourceData.system?.maintenanceCost ?? 0)),
              "system.consumesLineageUse": sourceData.system?.powerType !== "passive",
              "system.effect": sourceData.system?.effect ?? "",
              "system.prerequisites": sourceData.system?.prerequisites ?? {
                text: "",
                gmValidation: false
              },
              flags: sourceData.flags
            });

            if (sourceData.system?.powerType === "passive") {
              passivePowerIdsToDeactivate.add(existingItem.id);
            }

            continue;
          }

          sourceData.system = sourceData.system ?? {};
          sourceData.system.consumesLineageUse = sourceData.system.powerType !== "passive";

          documentsToCreate.push(sourceData);
        }

        if (documentsToUpdate.length > 0) {
          await this.updateEmbeddedDocuments("Item", documentsToUpdate);
          totalUpdated += documentsToUpdate.length;
        }

        if (documentsToCreate.length > 0) {
          await this.createEmbeddedDocuments("Item", documentsToCreate);
          totalCreated += documentsToCreate.length;
        }

        if (passivePowerIdsToDeactivate.size > 0) {
          const currentActivePowers = this._getActiveLineagePowers();
          const remainingActivePowers = currentActivePowers.filter((power) => {
            return !passivePowerIdsToDeactivate.has(power.itemId);
          });

          if (remainingActivePowers.length !== currentActivePowers.length) {
            await this.update({
              "system.resources.activeLineagePowers": remainingActivePowers
            });
          }
        }
      } while (this._naruto25eLineageSyncPending);
    } finally {
      this._naruto25eLineageSyncInProgress = false;
      this._naruto25eLineageSyncPending = false;
    }

    if (notify && (totalDeleted > 0 || totalCreated > 0 || totalUpdated > 0)) {
      ui.notifications.info(`${this.name} : pouvoirs de lignée synchronisés.`);
    }
  }

    isLineagePowerActive(itemOrId) {
    const itemId = typeof itemOrId === "string"
      ? itemOrId
      : itemOrId?.id;

    if (!itemId) return false;

    const activePowers = this.system.resources?.activeLineagePowers ?? [];
    return activePowers.some((power) => power.itemId === itemId);
  }

  _getActiveLineagePowers() {
    return foundry.utils.deepClone(this.system.resources?.activeLineagePowers ?? []);
  }

  _getLineagePowerCostsFromItem(item) {
    const system = item?.system ?? {};

    return {
      activationCost: Math.max(0, Number(system.activationCost ?? 0)),
      maintenanceCost: Math.max(0, Number(system.maintenanceCost ?? 0))
    };
  }

  async activateLineagePower(item) {
    if (this.type !== "shinobi") return;

    if (!item || item.type !== "pouvoirLignee") {
      ui.notifications.warn("Pouvoir de lignée invalide.");
      return;
    }

    if (this.isLineagePowerActive(item)) {
      ui.notifications.info(`${item.name} est déjà actif.`);
      return;
    }

    const powerType = item.system?.powerType ?? "maintained";

    if (powerType === "passive") {
      ui.notifications.info(`${item.name} est un pouvoir passif et ne s’active pas.`);
      return;
    }

    const chakra = this.system.resources?.chakra ?? {};
    const currentChakra = Math.max(0, Number(chakra.value ?? 0));
    const maxChakra = Math.max(0, Number(chakra.max ?? 0));

    let { activationCost, maintenanceCost } = this._getLineagePowerCostsFromItem(item);

    const isMangekyo = this._isMangekyoPowerName(item.name);
    const mangekyoBonusMode = this._getMangekyoChakraBonusMode();

    const activePowers = this._getActiveLineagePowers();
    let powersToKeep = activePowers;

    let supersededSharingan = null;

    if (isMangekyo) {
      supersededSharingan = activePowers.find((power) => this._isClassicSharinganPowerName(power.name));

      if (supersededSharingan) {
        const sharinganActivationCost = Math.max(0, Number(supersededSharingan.activationCost ?? 0));
        activationCost = Math.max(0, activationCost - sharinganActivationCost);
        powersToKeep = activePowers.filter((power) => power.id !== supersededSharingan.id);
      }
    }

    if (activationCost > 0 && currentChakra < activationCost) {
      ui.notifications.warn(`${this.name} n’a pas assez de Chakra pour activer ${item.name} (${currentChakra}/${activationCost}).`);
      return;
    }

    const lineageUseSpent = await this.spendLineagePowerUse({
      notify: false,
      label: `Pouvoir de lignée — ${item.name}`
    });

    if (!lineageUseSpent) {
      return;
    }

    const mangekyoActiveBonus = isMangekyo && mangekyoBonusMode === "active"
      ? 200
      : 0;

    const chakraAfterActivationCost = Math.max(0, currentChakra - activationCost);

    const mangekyoChakraSnapshot = mangekyoActiveBonus
      ? {
        beforeActivationCurrent: currentChakra,
        afterActivationCostCurrent: chakraAfterActivationCost,
        beforeActivationMax: maxChakra,
        activeBonus: mangekyoActiveBonus
      }
      : null;

    const updatedActivePowers = [
      ...powersToKeep,
      {
        id: foundry.utils.randomID(16),
        itemId: item.id,
        uuid: item.uuid,
        name: item.name,
        activationCost,
        maintenanceCost,
        mangekyoChakraSnapshot,
        startedRound: game.combat?.round ?? 0,
        startedTurn: game.combat?.turn ?? 0
      }
    ];

    const newChakra = chakraAfterActivationCost + mangekyoActiveBonus;
    const displayMaxChakra = maxChakra + mangekyoActiveBonus;

    await this.update({
      "system.resources.chakra.value": newChakra,
      "system.resources.activeLineagePowers": updatedActivePowers
    });

    const safeActorName = foundry.utils.escapeHTML?.(this.name) ?? this.name;
    const safePowerName = foundry.utils.escapeHTML?.(item.name) ?? item.name;
    const safeEffect = foundry.utils.escapeHTML?.(item.system.effect ?? "") ?? "";
    const safeClan = foundry.utils.escapeHTML?.(item.system.clan ?? "—") ?? "—";
    const lineageRank = Math.max(0, Number(item.system.lineageRank ?? 0));
    const appliedEffects = this._getItemAppliedEffects(item);
    const appliedEffectsHtml = this._getItemAppliedEffectsChatHtml(item);
    const itemThemeClass = this._getNarutoItemChatThemeClass(item);

    await ChatMessage.create({
      speaker: ChatMessage.getSpeaker({ actor: this }),
      flavor: `${safeActorName} active ${safePowerName}`,
      flags: {
        "naruto-25e": {
          itemEffectRequest: appliedEffects.length ? {
            actorId: this.id,
            itemId: item.id,
            itemUuid: item.uuid,
            sourceName: item.name,
            sourceUuid: item.uuid,
            sourceType: "lineage",
            targetActorIds: [],
            effects: appliedEffects
          } : null
        }
      },
      content: `
        <div class="naruto-roll-card naruto-lineage-power-card ${itemThemeClass}">
          <header><h3>${safePowerName}</h3></header>
          <p><strong>${safeActorName}</strong> active un pouvoir de lignée.</p>

          ${safeEffect ? `<p class="lineage-power-effect"><strong>Effet :</strong> ${safeEffect}</p>` : ""}

          ${appliedEffectsHtml}

          <div><strong>Clan :</strong> ${safeClan}</div>
          <div><strong>Rang requis :</strong> ${lineageRank}</div>
          <div><strong>Coût d’activation :</strong> ${activationCost} Chakra</div>
          <div><strong>Chakra :</strong> ${currentChakra} → ${newChakra} / ${displayMaxChakra}</div>
          <div><strong>Entretien :</strong> ${maintenanceCost} Chakra / tour</div>
          ${supersededSharingan ? `<div><strong>Surclasse :</strong> ${foundry.utils.escapeHTML?.(supersededSharingan.name) ?? supersededSharingan.name}</div>` : ""}
          ${mangekyoActiveBonus ? `<div><strong>Bonus Mangekyō actif :</strong> +200 Chakra max et actuel</div>` : ""}
        </div>
      `
    });

    ui.notifications.info(`${item.name} activé.`);
  }

  async deactivateLineagePower(itemId) {
    if (this.type !== "shinobi") return;

    const activePowers = this._getActiveLineagePowers();
    const power = activePowers.find((entry) => entry.itemId === itemId || entry.id === itemId);

    if (!power) {
      ui.notifications.warn("Effet maintenu introuvable.");
      return;
    }

    const remainingPowers = activePowers.filter((entry) => entry.id !== power.id);

    const updateData = {
      "system.resources.activeLineagePowers": remainingPowers
    };

    const isTechnique = power.sourceType === "technique";
    const typeLabel = isTechnique ? "technique maintenue" : "pouvoir de lignée";

    let mangekyoChakraMessage = "";

    if (!isTechnique && this._isMangekyoPowerName(power.name) && this._getMangekyoChakraBonusMode() === "active") {
      const chakra = this.system.resources?.chakra ?? {};
      const currentChakra = Math.max(0, Number(chakra.value ?? 0));
      const activeMaxChakra = Math.max(0, Number(chakra.max ?? 0));
      const normalMaxChakra = Math.max(0, activeMaxChakra - 200);
      const endMode = this._getMangekyoActiveChakraEndMode();

      let nextChakra = currentChakra;

      if (endMode === "brutal") {
        nextChakra = Math.max(0, currentChakra - 200);
        mangekyoChakraMessage = `<div><strong>Fin du bonus Mangekyō :</strong> perte sèche de 200 Chakra (${currentChakra} → ${nextChakra} / ${normalMaxChakra}).</div>`;
      } else {
        const ratio = activeMaxChakra > 0
          ? currentChakra / activeMaxChakra
          : 0;

        const relativeChakra = Math.floor(ratio * normalMaxChakra);

        if (endMode === "relativeCapped") {
          const cap = Math.max(
            0,
            Math.min(
              normalMaxChakra,
              Number(power.mangekyoChakraSnapshot?.afterActivationCostCurrent ?? normalMaxChakra)
            )
          );

          nextChakra = Math.min(relativeChakra, cap);
          mangekyoChakraMessage = `<div><strong>Fin du bonus Mangekyō :</strong> conservation relative plafonnée (${currentChakra}/${activeMaxChakra} → ${nextChakra}/${normalMaxChakra}, plafond ${cap}).</div>`;
        } else {
          nextChakra = relativeChakra;
          mangekyoChakraMessage = `<div><strong>Fin du bonus Mangekyō :</strong> conservation relative classique (${currentChakra}/${activeMaxChakra} → ${nextChakra}/${normalMaxChakra}).</div>`;
        }
      }

      updateData["system.resources.chakra.value"] = nextChakra;
    }

    await this.update(updateData);

    const item = this.items.get(power.itemId);
    const safeActorName = foundry.utils.escapeHTML?.(this.name) ?? this.name;
    const safePowerName = foundry.utils.escapeHTML?.(power.name) ?? power.name;
    const safeTypeLabel = foundry.utils.escapeHTML?.(typeLabel) ?? typeLabel;
    const safeEffect = foundry.utils.escapeHTML?.(item?.system?.effect ?? "") ?? "";

    const fallbackMaintenance = isTechnique
      ? item?.system?.chakra?.maintenance
      : item?.system?.maintenanceCost;

    const maintenanceCost = Math.max(0, Number(power.maintenanceCost ?? fallbackMaintenance ?? 0));

    await ChatMessage.create({
      speaker: ChatMessage.getSpeaker({ actor: this }),
      flavor: `${safeActorName} arrête ${safePowerName}`,
      content: `
        <div class="naruto-lineage-power-card">
          <header><h3>${safePowerName}</h3></header>
          <p><strong>${safeActorName}</strong> arrête cette ${safeTypeLabel}.</p>

          ${safeEffect ? `<p class="lineage-power-effect"><strong>Effet interrompu :</strong> ${safeEffect}</p>` : ""}

          <div><strong>Entretien arrêté :</strong> ${maintenanceCost} Chakra / tour</div>
          ${mangekyoChakraMessage}
        </div>
      `
    });

    ui.notifications.info(`${power.name} arrêté.`);
  }

  _computeLineageMaintenanceCost(powers = []) {
    const totalMaintenance = powers.reduce((total, power) => {
      return total + Math.max(0, Number(power.maintenanceCost ?? 0));
    }, 0);

    const passiveRegen = Math.max(0, Number(this.system.resources?.chakra?.passiveRegen ?? 0));
    const activeRegen = Math.max(0, Number(this.system.resources?.chakra?.activeRegen ?? 0));
    const totalRegen = passiveRegen + activeRegen;
    const netCost = Math.max(0, totalMaintenance - totalRegen);
    const overflowRegen = Math.max(0, totalRegen - totalMaintenance);

    return {
      totalMaintenance,
      passiveRegen,
      activeRegen,
      totalRegen,
      netCost,
      overflowRegen
    };
  }

  _crossesCriticalChakraThreshold(currentValue, nextValue) {
    const thresholds = [50, 30, 10];

    return thresholds.some((threshold) => {
      return currentValue >= threshold && nextValue < threshold;
    });
  }

  async applyMaintainedLineagePowerUpkeep({ forceDialog = false } = {}) {
    if (this.type !== "shinobi") return;

    const activePowers = this._getActiveLineagePowers();

    if (!activePowers.length) return;

    const chakra = this.system.resources?.chakra ?? {};
    const currentChakra = Math.max(0, Number(chakra.value ?? 0));
    const maxChakra = Math.max(0, Number(chakra.max ?? 0));

    const maintenance = this._computeLineageMaintenanceCost(activePowers);
    const nextChakra = Math.min(
      maxChakra,
      Math.max(0, currentChakra - maintenance.netCost + maintenance.overflowRegen)
    );

    const needsChoice = forceDialog
      || currentChakra < maintenance.netCost
      || this._crossesCriticalChakraThreshold(currentChakra, nextChakra);

    if (needsChoice) {
      await this._openLineageMaintenanceDialog(activePowers, {
        currentChakra,
        maxChakra,
        ...maintenance
      });
      return;
    }

    await this.update({
      "system.resources.chakra.value": nextChakra
    });

    const safeActorName = foundry.utils.escapeHTML?.(this.name) ?? this.name;

    await ChatMessage.create({
      speaker: ChatMessage.getSpeaker({ actor: this }),
      flavor: `${safeActorName} entretient ses effets maintenus`,
      content: `
        <div class="naruto-lineage-power-card">
          <header><h3>Entretien des effets maintenus</h3></header>
          <p><strong>${safeActorName}</strong> maintient ses pouvoirs et techniques actifs.</p>
          <div><strong>Entretien total :</strong> ${maintenance.totalMaintenance}</div>
          <div><strong>Régénération passive :</strong> +${maintenance.passiveRegen}</div>
          <div><strong>Régénération active :</strong> +${maintenance.activeRegen}</div>
          <div><strong>Régénération totale :</strong> +${maintenance.totalRegen}</div>
          <div><strong>Coût net :</strong> ${maintenance.netCost}</div>
          <div><strong>Gain net :</strong> +${maintenance.overflowRegen}</div>
          <div><strong>Chakra :</strong> ${currentChakra} → ${nextChakra} / ${maxChakra}</div>
        </div>
      `
    });
  }

  async _openLineageMaintenanceDialog(activePowers, context = {}) {
    const rows = activePowers.map((power) => {
      const safeName = foundry.utils.escapeHTML?.(power.name) ?? power.name;
      const cost = Math.max(0, Number(power.maintenanceCost ?? 0));

      return `
        <label class="naruto-maintenance-choice">
          <input type="checkbox" name="power" value="${power.id}" checked />
          <span>${safeName}</span>
          <strong>${cost} Chakra / tour</strong>
        </label>
      `;
    }).join("");

    const content = `
      <form class="naruto-maintenance-dialog">
        <p>
          Les entretiens actifs dépassent la réserve disponible ou franchissent un seuil critique.
          Choisis les effets à maintenir.
        </p>

        <div class="naruto-maintenance-summary">
          <div><strong>Chakra actuel :</strong> ${context.currentChakra} / ${context.maxChakra}</div>
          <div><strong>Entretien total actuel :</strong> ${context.totalMaintenance}</div>
          <div><strong>Régénération passive :</strong> +${context.passiveRegen}</div>
          <div><strong>Régénération active :</strong> +${context.activeRegen}</div>
          <div><strong>Régénération totale :</strong> +${context.totalRegen}</div>
          <div><strong>Coût net actuel :</strong> ${context.netCost}</div>
          <div><strong>Gain net actuel :</strong> +${context.overflowRegen}</div>
        </div>

        <hr />

        ${rows}

        <p class="formula-hint">
          Rappel : les entretiens sont additionnés, puis les régénérations passive et active sont appliquées une seule fois.
        </p>
      </form>
    `;

    await new Promise((resolve) => {
      new Dialog({
        title: `Entretien des effets maintenus — ${this.name}`,
        content,
        buttons: {
          validate: {
            label: "Valider l’entretien",
            callback: async (html) => {
              const selectedIds = html.find('input[name="power"]:checked')
                .map((_, input) => input.value)
                .get();

              const keptPowers = activePowers.filter((power) => selectedIds.includes(power.id));
              const removedPowers = activePowers.filter((power) => !selectedIds.includes(power.id));

              const maintenance = this._computeLineageMaintenanceCost(keptPowers);
              const currentChakra = Math.max(0, Number(this.system.resources?.chakra?.value ?? 0));
              const maxChakra = Math.max(0, Number(this.system.resources?.chakra?.max ?? 0));

              if (currentChakra < maintenance.netCost) {
                ui.notifications.warn("Le Chakra restant ne permet toujours pas de maintenir cette sélection. Décoche au moins un effet maintenu.");

                setTimeout(() => {
                  this._openLineageMaintenanceDialog(activePowers, {
                    ...context,
                    currentChakra,
                    maxChakra,
                    totalMaintenance: maintenance.totalMaintenance,
                    passiveRegen: maintenance.passiveRegen,
                    activeRegen: maintenance.activeRegen,
                    totalRegen: maintenance.totalRegen,
                    netCost: maintenance.netCost,
                    overflowRegen: maintenance.overflowRegen
                  });
                }, 100);

                resolve();
                return;
              }

              const nextChakra = Math.min(
                maxChakra,
                Math.max(0, currentChakra - maintenance.netCost + maintenance.overflowRegen)
              );

              await this.update({
                "system.resources.chakra.value": nextChakra,
                "system.resources.activeLineagePowers": keptPowers
              });

              const safeActorName = foundry.utils.escapeHTML?.(this.name) ?? this.name;
              const keptNames = keptPowers.map((power) => foundry.utils.escapeHTML?.(power.name) ?? power.name).join(", ") || "Aucun";
              const removedNames = removedPowers.map((power) => foundry.utils.escapeHTML?.(power.name) ?? power.name).join(", ") || "Aucun";

              await ChatMessage.create({
                speaker: ChatMessage.getSpeaker({ actor: this }),
                flavor: `${safeActorName} ajuste ses effets maintenus`,
                content: `
                  <div class="naruto-lineage-power-card">
                    <header><h3>Entretien ajusté</h3></header>
                    <p><strong>${safeActorName}</strong> choisit les effets maintenus.</p>
                    <div><strong>Maintenus :</strong> ${keptNames}</div>
                    <div><strong>Désactivés :</strong> ${removedNames}</div>
                    <div><strong>Entretien total :</strong> ${maintenance.totalMaintenance}</div>
                    <div><strong>Régénération passive :</strong> +${maintenance.passiveRegen}</div>
                    <div><strong>Régénération active :</strong> +${maintenance.activeRegen}</div>
                    <div><strong>Régénération totale :</strong> +${maintenance.totalRegen}</div>
                    <div><strong>Coût net :</strong> ${maintenance.netCost}</div>
                    <div><strong>Gain net :</strong> +${maintenance.overflowRegen}</div>
                    <div><strong>Chakra :</strong> ${currentChakra} → ${nextChakra} / ${maxChakra}</div>
                  </div>
                `
              });

              resolve();
            }
          },
          cancel: {
            label: "Reporter",
            callback: () => resolve()
          }
        },
        default: "validate",
        close: () => resolve()
      }).render(true);
    });
  }


    async addInventoryItemFromDraft() {
    if (this.type !== "shinobi") return;

    const draft = this.system.inventory?.newItem ?? {};
    const name = String(draft.name ?? "").trim();

    if (!name) {
      ui.notifications.warn("Nom d’objet requis.");
      return;
    }

    const type = NARUTO25E.inventoryTypes[draft.type] ? draft.type : "misc";
    const quantity = Math.max(1, Number(draft.quantity ?? 1));

    const items = foundry.utils.deepClone(this.system.inventory?.items ?? []);

    items.push({
      id: foundry.utils.randomID(16),
      name,
      type,
      quantity,
      carryState: "notHeld",
      carry: {
        holdable: type === "weapon",
        wearable: type === "armor"
      },
      holdable: type === "weapon",
      wearable: type === "armor",
      equipped: false,
      notes: "",
      value: 0,
      weight: 0,
      useEffect: this._getBlankInventoryUseEffect(),
      uses: this._getBlankInventoryUses(),
      toxicity: this._getBlankInventoryToxicity(),
      sort: items.length
    });

    await this.update({
      "system.inventory.items": items,
      "system.inventory.newItem.name": "",
      "system.inventory.newItem.quantity": 1
    });

    ui.notifications.info(`${name} ajouté à l’inventaire.`);
  }

  async addInventoryItemFromDocument(itemDocument, quantity = null) {
    if (this.type !== "shinobi") return;
    if (!itemDocument) return;

    const allowedTypes = ["arme", "armure", "equipement", "consommable"];

    if (!allowedTypes.includes(itemDocument.type)) {
      ui.notifications.warn("Seuls les objets d’équipement peuvent être ajoutés à l’inventaire.");
      return;
    }

    const items = foundry.utils.deepClone(this.system.inventory?.items ?? []);
    const inventoryItem = this._getInventoryItemDataFromDocument(itemDocument, quantity);
    inventoryItem.sort = items.length;

    items.push(inventoryItem);

    await this.update({
      "system.inventory.items": items
    });

    ui.notifications.info(`${inventoryItem.name} ajouté à l’inventaire.`);
  }

  async deleteInventoryItem(itemId) {
    if (this.type !== "shinobi") return;

    const items = foundry.utils.deepClone(this.system.inventory?.items ?? []);
    const item = items.find((entry) => entry.id === itemId);

    if (!item) {
      ui.notifications.warn("Objet introuvable.");
      return;
    }

    const confirmed = await Dialog.confirm({
      title: "Supprimer l’objet",
      content: `<p>Supprimer <strong>${item.name}</strong> de l’inventaire ?</p>`,
      yes: () => true,
      no: () => false,
      defaultYes: false
    });

    if (!confirmed) return;

    await this.update({
      "system.inventory.items": items.filter((entry) => entry.id !== itemId)
    });

    ui.notifications.info(`${item.name} supprimé.`);
  }

  async useInventoryItemCharge(itemId) {
    if (this.type !== "shinobi") return;

    const items = foundry.utils.deepClone(this.system.inventory?.items ?? []);
    const item = items.find((entry) => entry.id === itemId);

    if (!item) {
      ui.notifications.warn("Objet introuvable.");
      return;
    }

    const uses = item.uses ?? {};

    if (!uses.enabled || Number(uses.max ?? 0) <= 0) {
      ui.notifications.warn("Cet objet n’a pas d’utilisations suivies.");
      return;
    }

    const currentUses = Math.max(0, Number(uses.value ?? uses.max ?? 0));
    const maxUses = Math.max(0, Number(uses.max ?? 0));

    if (currentUses <= 0) {
      ui.notifications.warn(`${item.name} n’a plus d’utilisation disponible.`);
      return;
    }

    const actionSpent = await this.spendCombatAction("simple", `${item.name} — utilisation d’une charge`);

    if (!actionSpent) return;

    item.uses = {
      enabled: true,
      value: Math.max(0, currentUses - 1),
      max: maxUses,
      per: uses.per ?? "charges"
    };

    await this.update({
      "system.inventory.items": items
    });

    const safeItemName = foundry.utils.escapeHTML?.(String(item.name ?? "Objet")) ?? String(item.name ?? "Objet");
    const safeActorName = foundry.utils.escapeHTML?.(this.name) ?? this.name;
    const safeNotes = foundry.utils.escapeHTML?.(String(item.notes ?? "")) ?? String(item.notes ?? "");

    await ChatMessage.create({
      speaker: ChatMessage.getSpeaker({ actor: this }),
      flavor: `${safeActorName} utilise ${safeItemName}`,
      content: `
        <div class="naruto-consumable-card">
          <header>
            <h3>${safeItemName}</h3>
          </header>

          <p><strong>${safeActorName}</strong> utilise une charge de cet objet.</p>

          <div class="naruto-consumable-quantity">
            <strong>Utilisations restantes :</strong>
            <span>${item.uses.value} / ${item.uses.max}</span>
          </div>

          ${safeNotes ? `
            <div class="naruto-consumable-text">
              ${safeNotes}
            </div>
          ` : ""}
        </div>
      `
    });

    ui.notifications.info(`${item.name} utilisé : ${item.uses.value} / ${item.uses.max} utilisation(s) restante(s).`);
  }

  async updateInventoryItem(itemId, changes = {}) {
    if (this.type !== "shinobi") return;

    const sanitizedChanges = foundry.utils.deepClone(changes ?? {});

    if (!game.user?.isGM) {
      delete sanitizedChanges.value;
      delete sanitizedChanges.weight;
    }

    if ("carryState" in sanitizedChanges) {
      await this.setInventoryItemCarryState(itemId, sanitizedChanges.carryState);
      return;
    }

    const items = foundry.utils.deepClone(this.system.inventory?.items ?? []);
    const item = items.find((entry) => entry.id === itemId);

    if (!item) {
      ui.notifications.warn("Objet introuvable.");
      return;
    }

    Object.assign(item, sanitizedChanges);

    const type = NARUTO25E.inventoryTypes[item.type] ? item.type : "misc";
    const carry = this._prepareInventoryCarryData(item, type);
    const carryState = this._normalizeInventoryCarryState(item.carryState, type, carry);

    item.quantity = Math.max(1, Number(item.quantity ?? 1));
    item.value = Math.max(0, Number(item.value ?? 0));
    item.weight = Math.max(0, Number(item.weight ?? 0));
    item.carry = carry;
    item.holdable = carry.holdable;
    item.wearable = carry.wearable;
    item.carryState = carryState;
    item.equipped = this._isInventoryCarryStateEquipped(type, carryState);

    await this.update({
      "system.inventory.items": items
    });
  }

  async toggleInventoryItemEquipped(itemId) {
    if (this.type !== "shinobi") return;

    const items = foundry.utils.deepClone(this.system.inventory?.items ?? []);
    const item = items.find((entry) => entry.id === itemId);

    if (!item) {
      ui.notifications.warn("Objet introuvable.");
      return;
    }

    if (!["weapon", "armor"].includes(item.type)) {
      ui.notifications.warn("Seules les armes et protections peuvent être équipées.");
      return;
    }

    item.equipped = !Boolean(item.equipped);

    await this.update({
      "system.inventory.items": items
    });

    ui.notifications.info(`${item.name} ${item.equipped ? "équipé" : "déséquipé"}.`);
  }

  _getBlankInventoryUseEffect() {
    return {
      type: "none",
      resource: "none",
      amount: 0,
      consumeOnUse: true,
      text: ""
    };
  }

  _getBlankInventoryUses() {
    return {
      enabled: false,
      value: 0,
      max: 0,
      per: "charges"
    };
  }

  _getBlankInventoryToxicity() {
    return {
      enabled: false,
      amount: 0,
      period: "none",
      iaTurns: 0
    };
  }

  _getInventoryTypeFromItemType(itemType) {
    const typeMap = {
      arme: "weapon",
      armure: "armor",
      equipement: "misc",
      consommable: "consumable"
    };

    return typeMap[itemType] ?? "misc";
  }

  _getInventoryItemDataFromDocument(itemDocument, quantity = null) {
    const system = itemDocument.system ?? {};
    const inventoryType = this._getInventoryTypeFromItemType(itemDocument.type);

    const baseQuantity = quantity ?? system.quantity ?? 1;

    return {
      id: foundry.utils.randomID(16),
      sourceItemId: itemDocument.id ?? "",
      sourceItemUuid: itemDocument.uuid ?? "",
      name: itemDocument.name ?? "Objet",
      type: inventoryType,
      description: system.description ?? "",
      subtype: system.subtype ?? "",
      taxonomy: foundry.utils.deepClone(system.taxonomy ?? {}),
      automation: foundry.utils.deepClone(system.automation ?? {}),
      combat: foundry.utils.deepClone(system.combat ?? {}),
      damage: this._normalizeDamageData(system.damage ?? {}),
      quantity: Math.max(1, Number(baseQuantity ?? 1)),
      carryState: "notHeld",
      carry: {
        holdable: Boolean(system.carry?.holdable ?? inventoryType === "weapon"),
        wearable: Boolean(system.carry?.wearable ?? inventoryType === "armor")
      },
      holdable: Boolean(system.carry?.holdable ?? inventoryType === "weapon"),
      wearable: Boolean(system.carry?.wearable ?? inventoryType === "armor"),
      equipped: false,
      notes: "",
      value: Math.max(0, Number(system.value ?? 0)),
      weight: Math.max(0, Number(system.weight ?? 0)),
      useEffect: inventoryType === "consumable"
        ? foundry.utils.deepClone(system.useEffect ?? this._getBlankInventoryUseEffect())
        : this._getBlankInventoryUseEffect(),
      uses: foundry.utils.deepClone(system.uses ?? this._getBlankInventoryUses()),
      toxicity: inventoryType === "consumable"
        ? foundry.utils.deepClone(system.toxicity ?? this._getBlankInventoryToxicity())
        : this._getBlankInventoryToxicity(),
      sort: 0
    };
  }

  _getInventoryUseEffect(item) {
    const explicitEffect = item.useEffect ?? {};
    const type = explicitEffect.type ?? "none";
    const resource = explicitEffect.resource ?? "none";

    if (!type || type === "none") {
      return this._getBlankInventoryUseEffect();
    }

    return {
      type,
      resource,
      amount: Math.max(0, Number(explicitEffect.amount ?? 0)),
      consumeOnUse: explicitEffect.consumeOnUse !== false,
      text: explicitEffect.text ?? ""
    };
  }

  _getInventoryItemToxicity(item) {
    const toxicity = item.toxicity ?? {};

    return {
      enabled: Boolean(toxicity.enabled),
      amount: Math.max(0, Number(toxicity.amount ?? 0)),
      period: ["none", "day", "week"].includes(toxicity.period)
        ? toxicity.period
        : "none",
      iaTurns: Math.max(0, Number(toxicity.iaTurns ?? 0))
    };
  }

  _getConsumableToxicityState() {
    const toxicity = this.system.consumables?.toxicity ?? {};

    return {
      value: Math.max(0, Number(toxicity.value ?? 0)),
      max: Math.max(1, Number(toxicity.max ?? 10)),
      dailyValue: Math.max(0, Number(toxicity.dailyValue ?? 0)),
      dailyMax: Math.max(1, Number(toxicity.dailyMax ?? 6)),
      weeklyValue: Math.max(0, Number(toxicity.weeklyValue ?? 0)),
      weeklyMax: Math.max(1, Number(toxicity.weeklyMax ?? 10)),
      notes: toxicity.notes ?? ""
    };
  }

  _getConsumableToxicityUpdate(toxicityData) {
    const current = this._getConsumableToxicityState();
    const amount = Math.max(0, Number(toxicityData.amount ?? 0));
    const period = toxicityData.period ?? "none";

    if (!toxicityData.enabled || amount <= 0) {
      return {
        valid: true,
        updateData: {},
        current,
        next: current,
        amount: 0,
        period
      };
    }

    const next = foundry.utils.deepClone(current);
    next.value += amount;

    if (period === "day") {
      next.dailyValue += amount;
    }

    if (period === "week") {
      next.weeklyValue += amount;
    }

    if (next.value > next.max) {
      return {
        valid: false,
        reason: `Toxicité maximale atteinte (${current.value} / ${current.max}).`,
        current,
        next,
        amount,
        period
      };
    }

    if (period === "day" && next.dailyValue > next.dailyMax) {
      return {
        valid: false,
        reason: `Limite journalière de toxicité atteinte (${current.dailyValue} / ${current.dailyMax}).`,
        current,
        next,
        amount,
        period
      };
    }

    if (period === "week" && next.weeklyValue > next.weeklyMax) {
      return {
        valid: false,
        reason: `Limite hebdomadaire de toxicité atteinte (${current.weeklyValue} / ${current.weeklyMax}).`,
        current,
        next,
        amount,
        period
      };
    }

    return {
      valid: true,
      updateData: {
        "system.consumables.toxicity.value": next.value,
        "system.consumables.toxicity.dailyValue": next.dailyValue,
        "system.consumables.toxicity.weeklyValue": next.weeklyValue
      },
      current,
      next,
      amount,
      period
    };
  }

  async resetConsumableToxicity(period = "all") {
    if (this.type !== "shinobi") return;

    if (!game.user?.isGM) {
      ui.notifications.warn("Seul le MJ peut réinitialiser la toxicité.");
      return;
    }

    const updateData = {};

    if (period === "day" || period === "all") {
      updateData["system.consumables.toxicity.dailyValue"] = 0;
    }

    if (period === "week" || period === "all") {
      updateData["system.consumables.toxicity.weeklyValue"] = 0;
    }

    if (period === "all") {
      updateData["system.consumables.toxicity.value"] = 0;
    }

    await this.update(updateData);

    ui.notifications.info("Toxicité réinitialisée.");
  }

  _normalizeTextForCombatSearch(value) {
    return String(value ?? "")
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase();
  }

  _isInventoryExplosiveItem(item = {}) {
    const subtype = this._normalizeTextForCombatSearch(item.subtype);
    const category = this._normalizeTextForCombatSearch(item.taxonomy?.category);
    const subcategory = this._normalizeTextForCombatSearch(item.taxonomy?.subcategory);
    const tags = Array.isArray(item.taxonomy?.tags)
      ? item.taxonomy.tags.map((tag) => this._normalizeTextForCombatSearch(tag))
      : [];

    return subtype === "explosive"
      || category === "explosif"
      || subcategory === "explosifs"
      || tags.includes("explosif")
      || this._normalizeTextForCombatSearch(item.name).includes("fuda")
      || this._normalizeTextForCombatSearch(item.name).includes("poudre");
  }

  _extractInventoryDamageFormula(item = {}) {
    if (item.damage?.formula) return String(item.damage.formula);
    if (item.combat?.damageFormula) return String(item.combat.damageFormula);

    const searchableText = [
      item.description,
      item.automation?.notes,
      item.useEffect?.text,
      item.notes
    ].map((entry) => String(entry ?? "")).join("\n");

    const damageMatch = searchableText.match(/Dégâts?\s*:\s*([^.;\n]+)/i);

    if (damageMatch?.[1]) {
      return damageMatch[1].trim();
    }

    const name = this._normalizeTextForCombatSearch(item.name);

    if (name.includes("katana")) return "COR + ARM + 3";
    if (name.includes("ninjato")) return "COR + ARM + 2";
    if (name.includes("nodachi")) return "COR + ARM + 4";
    if (name.includes("kunai")) return "COR + ARM + 1(1)";
    if (name.includes("shuriken")) return "TAI + ARM + 1(1)";
    if (name.includes("senbon")) return "ESP + ARM + 1(1)";
    if (name.includes("manriki") || name.includes("kusarigama")) return "NIN + ARM";
    if (name.includes("kibaku")) return "GEN + 1";

    return "";
  }

  _extractInventoryRange(item = {}) {
    if (item.combat?.range) return String(item.combat.range);

    const searchableText = [
      item.description,
      item.automation?.notes,
      item.useEffect?.text,
      item.notes
    ].map((entry) => String(entry ?? "")).join("\n");

    const rangeMatch = searchableText.match(/Portée\s*:\s*([^.;\n]+)/i);

    if (rangeMatch?.[1]) {
      return rangeMatch[1].trim();
    }

    const name = this._normalizeTextForCombatSearch(item.name);

    if (name.includes("katana")) return "Z1";
    if (name.includes("ninjato")) return "Z1";
    if (name.includes("nodachi")) return "Z2";
    if (name.includes("kunai")) return "D3";
    if (name.includes("shuriken")) return "D4";
    if (name.includes("senbon")) return "D5";
    if (name.includes("manriki")) return "Z4";
    if (name.includes("kibaku")) return "Z2";

    return "—";
  }

  _getInventoryWeaponSkillKey(item = {}) {
    const explicitSkill = String(item.combat?.skill ?? "");

    if (explicitSkill) return explicitSkill;

    const subcategory = this._normalizeTextForCombatSearch(item.taxonomy?.subcategory);
    const tags = Array.isArray(item.taxonomy?.tags)
      ? item.taxonomy.tags.map((tag) => this._normalizeTextForCombatSearch(tag))
      : [];
    const name = this._normalizeTextForCombatSearch(item.name);

    if (
      subcategory.includes("armesexotiques")
      || tags.includes("arme-exotique")
      || name.includes("kusarigama")
      || name.includes("kanabo")
      || name.includes("zambato")
      || name.includes("bunto")
      || name.includes("tessen")
      || name.includes("nunchakus")
    ) {
      return "armesExotiques";
    }

    return "armesSimples";
  }

  _getInventoryCombatSkillData(item = {}) {
    if (this._isInventoryExplosiveItem(item)) {
      if (this._canUseSkillForDefense?.("scienceExplosifs")) {
        return this._getSkillCombatTotal("scienceExplosifs");
      }

      return null;
    }

    const skillKey = this._getInventoryWeaponSkillKey(item);

    if (!this._canUseSkillForDefense?.(skillKey)) {
      return null;
    }

    return this._getSkillCombatTotal(skillKey);
  }

  async _createInventoryCombatCard(item, profile = {}, rollData = null) {
    const safeActorName = foundry.utils.escapeHTML?.(this.name) ?? this.name;
    const safeItemName = foundry.utils.escapeHTML?.(item.name) ?? item.name;
    const safeDamageFormula = foundry.utils.escapeHTML?.(profile.damageFormula || "—") ?? (profile.damageFormula || "—");
    const safeDamageType = foundry.utils.escapeHTML?.(profile.damageType || "physical") ?? (profile.damageType || "physical");
    const safeRange = foundry.utils.escapeHTML?.(profile.range || "—") ?? (profile.range || "—");
    const safeArea = foundry.utils.escapeHTML?.(profile.area || "—") ?? (profile.area || "—");
    const safeEffectText = foundry.utils.escapeHTML?.(profile.effectText || "") ?? (profile.effectText || "");
    const safeSkillLabel = foundry.utils.escapeHTML?.(profile.skillLabel || "—") ?? (profile.skillLabel || "—");
    const damageResult = this._calculateDamageData(profile.damage ?? item.damage ?? {});

    await ChatMessage.create({
      speaker: ChatMessage.getSpeaker({ actor: this }),
      flavor: `${safeActorName} utilise ${safeItemName}`,
      content: `
        <div class="naruto-roll-card naruto-inventory-combat-card">
          <header class="naruto-roll-header">
            <h3>${safeItemName}</h3>
          </header>

          <p><strong>${safeActorName}</strong> utilise un objet de combat.</p>

          ${rollData ? `
            <div class="naruto-roll-result">
              ${rollData.total}
            </div>
          ` : `
            <div class="naruto-roll-result">
              Résolution manuelle
            </div>
          `}

          <div class="naruto-roll-details">
            <span>Compétence : ${safeSkillLabel}</span>
            <span>Dégâts : ${safeDamageFormula}</span>
            <span>Type : ${safeDamageType}</span>
            ${damageResult.calculable ? `<span>Dégâts calculés : ${damageResult.total}</span>` : ""}
            <span>Portée : ${safeRange}</span>
            <span>Zone : ${safeArea}</span>
          </div>

          ${safeEffectText ? `
            <div class="naruto-consumable-text">
              ${safeEffectText}
            </div>
          ` : ""}
        </div>
      `,
      rolls: rollData?.roll ? [rollData.roll] : []
    });
  }

  async useInventoryCombatItem(itemId) {
    if (this.type !== "shinobi") return null;

    const items = foundry.utils.deepClone(this.system.inventory?.items ?? []);
    const item = items.find((entry) => entry.id === itemId);

    if (!item) {
      ui.notifications.warn("Objet introuvable.");
      return null;
    }

    const isExplosive = this._isInventoryExplosiveItem(item);

    if (item.type !== "weapon" && !isExplosive) {
      ui.notifications.warn("Cet objet n’est pas utilisable comme action de combat.");
      return null;
    }

    const actionSpent = await this.spendCombatAction("complex", `${item.name} — attaque / utilisation`);

    if (!actionSpent) return null;

    const damage = this._normalizeDamageData(item.damage ?? {});
    const damageFormula = damage.formula || this._extractInventoryDamageFormula(item);
    const range = this._extractInventoryRange(item);
    const area = item.area ?? (isExplosive ? range : "");
    const effectText = [
      item.useEffect?.text,
      item.automation?.notes,
      item.notes
    ].map((entry) => String(entry ?? "").trim()).filter(Boolean).join("\n\n");

    if (isExplosive) {
      await this._createInventoryCombatCard(item, {
        damageFormula,
        damageType: damage.type || "physical",
        damage,
        range,
        area,
        skillLabel: "Science des Explosifs / résolution MJ",
        effectText: effectText || "Explosif : résoudre la zone, les dégâts et les blessures manuellement."
      });

      return null;
    }

    const skillData = this._getInventoryCombatSkillData(item);

    if (!skillData) {
      ui.notifications.warn(`${this.name} ne possède pas la compétence nécessaire pour utiliser ${item.name}.`);
      return null;
    }

    const targets = Array.from(game.user?.targets ?? []);
    const profile = {
      label: `Arme — ${item.name}`,
      attackTotal: Number(skillData.total ?? 0),
      kind: String(skillData.key ?? "armesSimples"),
      defenseType: "physical",
      damageFormula,
      damageType: damage.type || "physical",
      damage,
      effectText: [
        `Compétence : ${skillData.label}.`,
        `Portée : ${range}.`,
        effectText
      ].filter(Boolean).join("\n\n")
    };

    if (targets.length === 1) {
      return this._resolveTargetedAttack(profile);
    }

    const rollData = await this._rollExplodingD10Data(Number(skillData.total ?? 0));

    await this._createInventoryCombatCard(item, {
      damageFormula,
      damageType: damage.type || "physical",
      damage,
      range,
      area: "",
      skillLabel: skillData.label,
      effectText
    }, rollData);

    return rollData.roll;
  }

  async useInventoryConsumable(itemId) {
    if (this.type !== "shinobi") return;

    const items = foundry.utils.deepClone(this.system.inventory?.items ?? []);
    const item = items.find((entry) => entry.id === itemId);

    if (!item) {
      ui.notifications.warn("Objet introuvable.");
      return;
    }

    if (item.type !== "consumable") {
      ui.notifications.warn("Seuls les consommables peuvent être utilisés.");
      return;
    }

    const effect = this._getInventoryUseEffect(item);

    if (!effect.type || effect.type === "none") {
      ui.notifications.warn("Ce consommable n’a pas encore d’effet automatisé fiable.");
      return;
    }

    const supportedEffectTypes = new Set([
      "restoreResource",
      "increaseActiveRegenPercent"
    ]);

    if (!supportedEffectTypes.has(effect.type)) {
      ui.notifications.warn("Cet effet de consommable n’est pas encore pris en charge.");
      return;
    }

    const toxicityData = this._getInventoryItemToxicity(item);
    const toxicityCheck = this._getConsumableToxicityUpdate(toxicityData);

    if (!toxicityCheck.valid) {
      ui.notifications.warn(toxicityCheck.reason ?? "La toxicité empêche d’utiliser ce consommable.");
      return;
    }

    const updateData = {
      ...toxicityCheck.updateData
    };

    let effectLine = "";
    let resourceLine = "";
    let notificationText = "";

    if (effect.type === "restoreResource") {
      const supportedResources = {
        chakra: {
          label: "Chakra",
          valuePath: "system.resources.chakra.value",
          maxPath: "system.resources.chakra.max",
          data: this.system.resources?.chakra
        },
        vigueur: {
          label: "Vigueur",
          valuePath: "system.resources.vigueur.value",
          maxPath: "system.resources.vigueur.max",
          data: this.system.resources?.vigueur
        },
        caractere: {
          label: "Caractère",
          valuePath: "system.resources.caractere.value",
          maxPath: "system.resources.caractere.max",
          data: this.system.resources?.caractere
        }
      };

      const resource = supportedResources[effect.resource];

      if (!resource) {
        ui.notifications.warn("La ressource ciblée par ce consommable n’est pas prise en charge.");
        return;
      }

      const currentValue = Math.max(0, Number(resource.data?.value ?? 0));
      const maxValue = Math.max(0, Number(resource.data?.max ?? 0));
      const amount = Math.max(0, Number(effect.amount ?? 0));

      if (amount <= 0) {
        ui.notifications.warn("La quantité restaurée par ce consommable est invalide.");
        return;
      }

      if (maxValue <= 0) {
        ui.notifications.warn(`Le maximum de ${resource.label} du personnage est invalide.`);
        return;
      }

      if (currentValue >= maxValue) {
        ui.notifications.info(`${this.name} a déjà sa ressource ${resource.label} au maximum.`);
        return;
      }

      const newValue = Math.min(maxValue, currentValue + amount);
      const restored = newValue - currentValue;
      const safeResourceLabel = foundry.utils.escapeHTML?.(resource.label) ?? resource.label;

      updateData[resource.valuePath] = newValue;

      effectLine = `
        <div class="naruto-consumable-effect">
          <strong>Effet :</strong>
          <span>+${restored} ${safeResourceLabel}</span>
        </div>
      `;

      resourceLine = `
        <div class="naruto-consumable-resource">
          <strong>${safeResourceLabel} :</strong>
          <span>${currentValue} → ${newValue} / ${maxValue}</span>
        </div>
      `;

      notificationText = `${item.name} utilisé : +${restored} ${resource.label}.`;
    }

    if (effect.type === "increaseActiveRegenPercent") {
      if (effect.resource !== "chakra") {
        ui.notifications.warn("La régénération active automatisée ne prend en charge que le Chakra.");
        return;
      }

      const chakra = this.system.resources?.chakra ?? {};
      const maxChakra = Math.max(0, Number(chakra.max ?? 0));
      const currentActiveRegen = Math.max(0, Number(chakra.activeRegen ?? 0));
      const percent = Math.max(0, Number(effect.amount ?? 0));

      if (maxChakra <= 0) {
        ui.notifications.warn("Le Chakra maximum du personnage est invalide.");
        return;
      }

      if (percent <= 0) {
        ui.notifications.warn("Le bonus de régénération active est invalide.");
        return;
      }

      const regenGain = Math.max(1, Math.ceil(maxChakra * percent / 100));
      const newActiveRegen = currentActiveRegen + regenGain;

      updateData["system.resources.chakra.activeRegen"] = newActiveRegen;

      effectLine = `
        <div class="naruto-consumable-effect">
          <strong>Effet :</strong>
          <span>+${regenGain} régénération active de Chakra (${percent}% du Chakra max)</span>
        </div>
      `;

      resourceLine = `
        <div class="naruto-consumable-resource">
          <strong>Régénération active :</strong>
          <span>${currentActiveRegen} → ${newActiveRegen}</span>
        </div>
      `;

      notificationText = `${item.name} utilisé : +${regenGain} régénération active de Chakra.`;
    }

    const actionSpent = await this.spendCombatAction("simple", `${item.name} — consommation`);

    if (!actionSpent) return;

    if (effect.consumeOnUse) {
      item.quantity = Math.max(1, Number(item.quantity ?? 1)) - 1;
    }

    const updatedItems = item.quantity > 0
      ? items
      : items.filter((entry) => entry.id !== itemId);

    updateData["system.inventory.items"] = updatedItems;

    await this.update(updateData);

    const safeItemName = foundry.utils.escapeHTML?.(String(item.name ?? "Consommable")) ?? String(item.name ?? "Consommable");
    const safeActorName = foundry.utils.escapeHTML?.(this.name) ?? this.name;
    const safeEffectText = foundry.utils.escapeHTML?.(String(effect.text ?? "")) ?? String(effect.text ?? "");

    const toxicityLine = toxicityData.enabled && toxicityCheck.amount > 0
      ? `
        <div class="naruto-consumable-toxicity">
          <strong>Toxicité :</strong>
          <span>
            +${toxicityCheck.amount}
            —
            total ${toxicityCheck.current.value} → ${toxicityCheck.next.value} / ${toxicityCheck.next.max}
            ${toxicityData.period === "day" ? ` — jour ${toxicityCheck.current.dailyValue} → ${toxicityCheck.next.dailyValue} / ${toxicityCheck.next.dailyMax}` : ""}
            ${toxicityData.period === "week" ? ` — semaine ${toxicityCheck.current.weeklyValue} → ${toxicityCheck.next.weeklyValue} / ${toxicityCheck.next.weeklyMax}` : ""}
          </span>
        </div>
      `
      : "";

    const iaLine = toxicityData.enabled && toxicityData.iaTurns > 0
      ? `
        <div class="naruto-consumable-ia">
          <strong>IA :</strong>
          <span>${toxicityData.iaTurns} tour(s)</span>
        </div>
      `
      : "";

    await ChatMessage.create({
      speaker: ChatMessage.getSpeaker({ actor: this }),
      flavor: `${safeActorName} utilise ${safeItemName}`,
      content: `
        <div class="naruto-consumable-card">
          <header>
            <h3>${safeItemName}</h3>
          </header>

          <p><strong>${safeActorName}</strong> utilise un consommable.</p>

          ${effectLine}
          ${resourceLine}
          ${toxicityLine}
          ${iaLine}

          ${safeEffectText ? `
            <div class="naruto-consumable-text">
              ${safeEffectText}
            </div>
          ` : ""}

          <div class="naruto-consumable-quantity">
            <strong>Quantité restante :</strong>
            <span>${Math.max(0, item.quantity)}</span>
          </div>
        </div>
      `
    });

    ui.notifications.info(notificationText);
  }
}

function getNaruto25eChatSpeakerActor(message) {
  const speaker = message?.speaker ?? {};

  let actor = null;

  if (speaker.actor) {
    actor = game.actors?.get(speaker.actor) ?? null;
  }

  if (!actor && speaker.scene && speaker.token) {
    actor = game.scenes?.get(speaker.scene)?.tokens?.get(speaker.token)?.actor ?? null;
  }

  if (!actor && speaker.token) {
    actor = canvas?.tokens?.get(speaker.token)?.actor ?? null;
  }

  if (!actor && typeof ChatMessage.getSpeakerActor === "function") {
    actor = ChatMessage.getSpeakerActor(speaker) ?? null;
  }

  return actor?.type === "shinobi" ? actor : null;
}

function applyNaruto25eClanKamonToElement(element, kamonPath, actorName = "") {
  const $element = element instanceof jQuery ? element : $(element);

  if (!$element.length || !kamonPath || $element.hasClass("naruto-chat-kamon-host")) {
    return;
  }

  const currentContent = $element.html() ?? "";
  const safeTitle = foundry.utils.escapeHTML?.(actorName || "Kamon de clan") ?? (actorName || "Kamon de clan");
  const safePath = String(kamonPath);

  $element
    .addClass("naruto-chat-kamon-host")
    .html(`
      <div class="naruto-chat-kamon-watermark" aria-hidden="true">
        <img src="${safePath}" alt="">
      </div>
      <div class="naruto-chat-kamon-body">
        ${currentContent}
      </div>
      <div class="naruto-chat-kamon-stamp" aria-hidden="true" title="${safeTitle}">
        <img src="${safePath}" alt="">
      </div>
    `);
}

Hooks.on("renderChatMessage", (message, html) => {
  const speakerActor = getNaruto25eChatSpeakerActor(message);
  const kamonPath = typeof speakerActor?.getPublicClanKamonPath === "function"
    ? speakerActor.getPublicClanKamonPath()
    : "";

  if (kamonPath) {
    const rollCards = html.find(".naruto-roll-card");

    if (rollCards.length > 0) {
      rollCards.each((_index, card) => {
        applyNaruto25eClanKamonToElement(card, kamonPath, speakerActor?.name ?? "");
      });
    } else {
      const messageContent = html.find(".message-content").first();

      if (messageContent.length) {
        messageContent.addClass("naruto-chat-kamon-message");
        applyNaruto25eClanKamonToElement(messageContent, kamonPath, speakerActor?.name ?? "");
      }
    }
  }

  html.find(".naruto-chat-defense-select").on("click", async (event) => {
    event.preventDefault();

    const button = event.currentTarget;
    const defenseKey = String(button.dataset.defenseKey ?? "");
    const request = message.getFlag("naruto-25e", "defenseRequest");
    const actorId = request?.actorId ?? "";
    const actor = game.actors?.get(actorId);

    if (!actor || typeof actor.resolveDefenseFromChatMessage !== "function") {
      ui.notifications.warn("Acteur introuvable pour résoudre la défense.");
      return;
    }

    await actor.resolveDefenseFromChatMessage(message, defenseKey);
  });

  html.find(".naruto-chat-damage-roll").on("click", async (event) => {
    event.preventDefault();

    const payload = message.getFlag("naruto-25e", "damagePayload");
    const actorId = payload?.actorId ?? "";
    const actor = game.actors?.get(actorId);

    if (!actor || typeof actor.rollDamageFromChatMessage !== "function") {
      ui.notifications.warn("Acteur introuvable pour calculer les dégâts.");
      return;
    }

    await actor.rollDamageFromChatMessage(message);
  });

  html.find(".naruto-chat-health-apply").on("click", async (event) => {
    event.preventDefault();

    const button = event.currentTarget;
    const targetActorId = button.dataset.targetActorId ?? "";
    const targetActor = game.actors?.get(targetActorId);
    const damage = Math.max(0, Number(button.dataset.damage ?? 0));
    const damageType = String(button.dataset.damageType ?? "PHY");
    const sourceName = String(button.dataset.sourceName ?? "Dégâts");

    if (!targetActor || typeof targetActor.applyDamageToHealthTrack !== "function") {
      ui.notifications.warn("Cible introuvable pour appliquer les dégâts à la santé.");
      return;
    }

    await targetActor.applyDamageToHealthTrack(damage, {
      damageType,
      sourceName
    });
  });

  html.find(".naruto-chat-apply-item-effect").on("click", async (event) => {
    event.preventDefault();

    const button = event.currentTarget;
    const effectId = String(button.dataset.effectId ?? "");
    const application = String(button.dataset.application ?? "self");
    const request = message.getFlag("naruto-25e", "itemEffectRequest");

    if (!request || !Array.isArray(request.effects)) {
      ui.notifications.warn("Aucun effet applicable trouvé sur cette carte.");
      return;
    }

    const effect = request.effects.find((entry) => String(entry.id ?? "") === effectId);

    if (!effect) {
      ui.notifications.warn("Effet introuvable sur cette carte.");
      return;
    }

    let actorId = String(request.actorId ?? "");
    let targetType = String(effect.targetType ?? "none");
    let targetItemId = "";

    if (application === "target") {
      const targetActorIds = Array.isArray(request.targetActorIds)
        ? request.targetActorIds.map((entry) => String(entry ?? "")).filter(Boolean)
        : [];

      if (targetActorIds.length !== 1) {
        ui.notifications.warn("Aucune cible unique disponible pour appliquer cet effet.");
        return;
      }

      actorId = targetActorIds[0];

      if (targetType === "none") {
        targetType = "actor";
      }
    }

    if (application === "selected") {
      const controlledTokens = Array.from(canvas?.tokens?.controlled ?? []);
      const selectedToken = controlledTokens.length === 1 ? controlledTokens[0] : null;
      const selectedActor = selectedToken?.actor ?? null;

      if (!selectedActor || selectedActor.type !== "shinobi") {
        ui.notifications.warn("Sélectionne exactement un token Shinobi pour appliquer cet effet.");
        return;
      }

      actorId = selectedActor.id;

      if (targetType === "none") {
        targetType = "actor";
      }
    }

    if (application === "weapon") {
      const effectContainer = $(button).closest(".naruto-item-applied-effect");
      targetItemId = String(effectContainer.find(".naruto-chat-effect-weapon-select").val() ?? "");

      if (!targetItemId) {
        ui.notifications.warn("Choisis une arme avant d’appliquer cet effet.");
        return;
      }

      targetType = "weapon";
    }

    const actor = game.actors?.get(actorId);

    if (!actor || typeof actor.applyNarutoEffectFromItemDefinition !== "function") {
      ui.notifications.warn("Acteur introuvable pour appliquer cet effet.");
      return;
    }

    await actor.applyNarutoEffectFromItemDefinition(effect, {
      sourceName: request.sourceName ?? effect.sourceName ?? "",
      sourceUuid: request.sourceUuid ?? effect.sourceUuid ?? "",
      sourceType: request.sourceType ?? effect.sourceType ?? "custom",
      targetType,
      targetItemId
    });
  });
});