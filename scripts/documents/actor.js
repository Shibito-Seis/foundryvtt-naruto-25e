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
    kunaiLot: "Kunaï — lot de jet",
    shurikenLot: "Shuriken — lot de jet",
    senbonLot: "Senbon — lot de jet",
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

      if (hiddenCap === null) return rawLineage;

      return Math.min(rawLineage, hiddenCap);
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

    _getCreationGrantedEmbeddedItems() {
      return this.items.filter((item) => {
        return item.getFlag?.("naruto-25e", "grantedAtCreation") === true;
      });
    }

    _hasCreationEquipmentAlreadyGranted() {
      return this._getCreationGrantedEmbeddedItems().length > 0;
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
      const existingEmbeddedItems = this._getCreationGrantedEmbeddedItems();
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

      await this.update({
        "system.progression.creation.locked": true,
        "system.progression.creation.validatedAt": new Date().toISOString(),
        "system.progression.creation.validatedBy": game.user.name,
        "system.progression.creation.currentStep": "summary"
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
        updateData["system.nindo.activeEffects.chakraBoost"] = {
          active: true,
          remainingTurns: 5,
          amount: 500
        };
      }

      if (action.type === "awakening") {
        updateData["system.nindo.activeEffects.awakening"] = {
          active: true,
          actionsRemaining: 3,
          bonus: 10
        };
      }

      if (action.type === "opportunity") {
        updateData["system.nindo.activeEffects.opportunity.available"] = true;
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
      vigueur.max = Math.max(
        0,
        2
        + cor
        + bonus
        + Number(chakraBonuses.vigueurMax ?? 0)
        + Number(lineageResourceBonuses.vigueurMax ?? 0)
      );
      vigueur.value = this._clampNumber(vigueur.value, 0, vigueur.max);
    }

    const caractere = system.resources?.caractere;
    if (caractere) {
      const bonus = Number(caractere.bonus ?? 0);
      caractere.max = Math.max(
        0,
        2
        + esp
        + bonus
        + Number(chakraBonuses.caractereMax ?? 0)
        + Number(lineageResourceBonuses.caractereMax ?? 0)
      );
      caractere.value = this._clampNumber(caractere.value, 0, caractere.max);
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

      chakra.max = Math.max(0, rawMax - kikaichuAllocated + mangekyoChakraBonus);
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
        nindo.activeEffects.chakraBoost = {
          active: false,
          remainingTurns: 0,
          amount: 0
        };
      }

      if (!nindo.activeEffects.awakening) {
        nindo.activeEffects.awakening = {
          active: false,
          actionsRemaining: 0,
          bonus: 0
        };
      }

      if (!nindo.activeEffects.opportunity) {
        nindo.activeEffects.opportunity = {
          available: false
        };
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

  _getCombatDefenseValue(defenseKey) {
    if (defenseKey === "caractere") {
      return Number(this.system.resources?.caractere?.max ?? this.system.resources?.caractere?.value ?? 0);
    }

    return Number(this.system.resources?.vigueur?.max ?? this.system.resources?.vigueur?.value ?? 0);
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
    combat.actions.notes = combat.actions.notes ?? "";

    combat.counters = combat.counters ?? {};
    combat.counters.interceptions = combat.counters.interceptions ?? {};
    combat.counters.interceptions.arm = combat.counters.interceptions.arm ?? {};
    combat.counters.interceptions.tai = combat.counters.interceptions.tai ?? {};
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

      if (path === "system.progression.creation.locked") {
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
    const total = Number(this.system.combat?.initiative?.total ?? 0);

    const roll = await this._rollExplodingD10("Initiative", total, {
      flavor: `Initiative — ${this.name}`
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

    return {
      key: skillKey,
      label: definition.label,
      total: Number(skill.total ?? 0)
    };
  }

  _getBasicDefenseOptions(kind) {
    const options = [];

    const esquive = this._getSkillCombatTotal("esquive");
    const parade = this._getSkillCombatTotal("parade");

    if (esquive) options.push(esquive);
    if (parade) options.push(parade);

    return options;
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
      return `
        <label class="naruto-defense-choice">
          <input type="radio" name="defense" value="${option.key}" ${option.key === defenseOptions[0].key ? "checked" : ""} />
          <span>${foundry.utils.escapeHTML?.(option.label) ?? option.label}</span>
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

  async rollBasicAttack(kind) {
    const attack = this.system.combat?.attacks?.[kind];

    if (!attack) {
      ui.notifications.warn("Attaque introuvable.");
      return null;
    }

    const label = kind === "arm" ? "Attaque ARM basique" : "Attaque TAI basique";
    const attackTotal = Number(attack.total ?? 0);

    const targets = Array.from(game.user?.targets ?? []);

    if (targets.length !== 1) {
      return this._rollExplodingD10(label, attackTotal, {
        flavor: `${label} — ${this.name}`
      });
    }

    const targetToken = targets[0];
    const targetActor = targetToken?.actor;

    if (!targetActor || targetActor.type !== "shinobi") {
      ui.notifications.warn("La cible doit être un acteur Shinobi.");
      return null;
    }

    const defenseOptions = targetActor._getBasicDefenseOptions?.(kind) ?? [];
    const defense = await targetActor._chooseDefenseOption?.(targetActor, kind, defenseOptions);

    if (!defense) {
      ui.notifications.warn("Aucune défense valide sélectionnée.");
      return null;
    }

    const attackRoll = await this._rollExplodingD10Data(attackTotal);
    const defenseRoll = await targetActor._rollExplodingD10Data(defense.total);

    const success = attackRoll.total >= defenseRoll.total;
    const margin = attackRoll.total - defenseRoll.total;

    const safeActorName = foundry.utils.escapeHTML?.(this.name) ?? this.name;
    const safeTargetName = foundry.utils.escapeHTML?.(targetActor.name) ?? targetActor.name;
    const safeLabel = foundry.utils.escapeHTML?.(label) ?? label;
    const safeDefenseLabel = foundry.utils.escapeHTML?.(defense.label) ?? defense.label;

    await ChatMessage.create({
      speaker: ChatMessage.getSpeaker({ actor: this }),
      flavor: `${safeLabel} — ${safeActorName}`,
      content: `
        <div class="naruto-roll-card">
          <header class="naruto-roll-header">
            <h3>${safeLabel}</h3>
          </header>

          <p><strong>${safeActorName}</strong> attaque <strong>${safeTargetName}</strong>.</p>

          <div class="naruto-roll-result ${success ? "success" : "failure"}">
            ${success ? "Réussite" : "Échec"}
          </div>

          <div class="naruto-roll-details">
            <span>Résultat d’attaque : ${attackRoll.total}</span>
            <span>Cible : ${safeTargetName}</span>
          </div>

          ${success ? `<p>L’attaque touche. Résous ensuite les dégâts et blessures.</p>` : `<p>La défense tient bon.</p>`}
        </div>
      `,
      rolls: [attackRoll.roll]
    });

    if (game.user?.isGM) {
      await ChatMessage.create({
        speaker: ChatMessage.getSpeaker({ actor: this }),
        whisper: ChatMessage.getWhisperRecipients("GM"),
        flavor: `Détails MJ — ${safeLabel}`,
        content: `
          <div class="naruto-roll-card">
            <header class="naruto-roll-header">
              <h3>Détails MJ — confrontation</h3>
            </header>

            <div><strong>Attaquant :</strong> ${safeActorName}</div>
            <div><strong>Cible :</strong> ${safeTargetName}</div>
            <div><strong>Attaque :</strong> ${attackRoll.total} — D10 ${attackRoll.diceText} + ${attackRoll.modifier}</div>
            <div><strong>Défense :</strong> ${defenseRoll.total} — ${safeDefenseLabel}, D10 ${defenseRoll.diceText} + ${defenseRoll.modifier}</div>
            <div><strong>Marge :</strong> ${margin >= 0 ? "+" : ""}${margin}</div>
          </div>
        `,
        rolls: [defenseRoll.roll]
      });
    }

    return attackRoll.roll;
  }

  async rollSkillAction(skillKey) {
    if (!skillKey) {
      ui.notifications.warn("Aucune compétence sélectionnée.");
      return null;
    }

    const skill = this.system.skills?.[skillKey];
    const definition = NARUTO25E.skillDefinitions?.[skillKey];

    if (!skill || !definition) {
      ui.notifications.warn("Compétence introuvable.");
      return null;
    }

    if (!skill.owned && !definition.ownedByDefault) {
      ui.notifications.warn("Cette compétence n’est pas possédée.");
      return null;
    }

    const total = Number(skill.total ?? 0);

    return this._rollExplodingD10(definition.label, total, {
      flavor: `Jet de compétence : ${definition.label} — ${this.name}`
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
    const counter = this.system.combat?.counters?.lineagePowers;
    if (!counter) return false;

    const remaining = Number(counter.remaining ?? 0);
    const usedThisTurn = Boolean(counter.usedThisTurn);

    if (usedThisTurn) {
      if (notify) ui.notifications.warn("Une action de lignée a déjà été utilisée ce tour.");
      return false;
    }

    if (remaining <= 0) {
      if (notify) ui.notifications.warn("Aucune utilisation de pouvoir de lignée restante.");
      return false;
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

    async calculateWoundFromCombatForm() {
    if (this.type !== "shinobi") return null;

    const calculator = this.system.combat?.health?.woundCalculator ?? {};
    const incomingDamage = Math.max(0, Number(calculator.incomingDamage ?? 0));
    const defenseKey = calculator.defense ?? "vigueur";
    const damageType = calculator.damageType ?? "PHY";
    const defenseValue = Math.max(0, this._getCombatDefenseValue(defenseKey));
    const margin = incomingDamage - defenseValue;

    const wounds = margin > 0
      ? 1 + Math.floor(Math.max(0, margin - 1) / 5)
      : 0;

    const defenseLabel = defenseKey === "caractere" ? "Caractère" : "Vigueur";
    const woundLabel = wounds > 1 ? "Blessures" : "Blessure";

    const content = `
      <div class="naruto-roll-card combat-wound-card">
        <header class="naruto-roll-header">
          <h2>Calcul de blessures</h2>
        </header>

        <div class="naruto-roll-details">
          <div><strong>Acteur :</strong> ${this.name}</div>
          <div><strong>Dégâts entrants :</strong> ${incomingDamage} (${damageType})</div>
          <div><strong>Défense :</strong> ${defenseLabel} ${defenseValue}</div>
          <div><strong>Marge :</strong> ${margin}</div>
          <div><strong>Résultat :</strong> ${wounds > 0 ? `${wounds} ${woundLabel}` : "Aucune Blessure"}</div>
        </div>

        <p class="formula-hint">
          Rappel : si les dégâts dépassent la défense, la cible subit 1 Blessure, puis +1 Blessure par tranche complète de 5 points au-dessus.
        </p>
      </div>
    `;

    await ChatMessage.create({
      speaker: ChatMessage.getSpeaker({ actor: this }),
      flavor: `Calcul de blessures — ${this.name}`,
      content
    });

    return {
      incomingDamage,
      defenseKey,
      defenseValue,
      damageType,
      margin,
      wounds
    };
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
      updates["system.combat.actions.simpleAvailable"] = true;
      updates["system.combat.actions.complexAvailable"] = true;
      updates["system.combat.actions.delayedAvailable"] = false;
      updates["system.combat.counters.lineagePowers.usedThisTurn"] = false;
    }

    if (scope === "session") {
      const lineageMax = Number(this.system.combat?.counters?.lineagePowers?.max ?? 0);

      updates["system.combat.counters.lineagePowers.remaining"] = lineageMax;
      updates["system.combat.counters.lineagePowers.usedThisTurn"] = false;
    }

    await this.update(updates);

    if (notify && scope === "round") {
      ui.notifications.info("Compteurs de round réinitialisés.");
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

    const holdable = Boolean(
      carry.holdable
      ?? item.holdable
      ?? type === "weapon"
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

    const lineageUseSpent = await this.spendLineagePowerUse({ notify: false });

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

    await ChatMessage.create({
      speaker: ChatMessage.getSpeaker({ actor: this }),
      flavor: `${safeActorName} active ${safePowerName}`,
      content: `
        <div class="naruto-lineage-power-card">
          <header><h3>${safePowerName}</h3></header>
          <p><strong>${safeActorName}</strong> active un pouvoir de lignée.</p>

          ${safeEffect ? `<p class="lineage-power-effect"><strong>Effet :</strong> ${safeEffect}</p>` : ""}

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
      ui.notifications.warn("Pouvoir actif introuvable.");
      return;
    }

    const remainingPowers = activePowers.filter((entry) => entry.id !== power.id);

    const updateData = {
      "system.resources.activeLineagePowers": remainingPowers
    };

    let mangekyoChakraMessage = "";

    if (this._isMangekyoPowerName(power.name) && this._getMangekyoChakraBonusMode() === "active") {
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
    const safeEffect = foundry.utils.escapeHTML?.(item?.system?.effect ?? "") ?? "";
    const maintenanceCost = Math.max(0, Number(power.maintenanceCost ?? item?.system?.maintenanceCost ?? 0));

    await ChatMessage.create({
      speaker: ChatMessage.getSpeaker({ actor: this }),
      flavor: `${safeActorName} désactive ${safePowerName}`,
      content: `
        <div class="naruto-lineage-power-card">
          <header><h3>${safePowerName}</h3></header>
          <p><strong>${safeActorName}</strong> désactive ce pouvoir de lignée.</p>

          ${safeEffect ? `<p class="lineage-power-effect"><strong>Effet interrompu :</strong> ${safeEffect}</p>` : ""}

          <div><strong>Entretien arrêté :</strong> ${maintenanceCost} Chakra / tour</div>
          ${mangekyoChakraMessage}
        </div>
      `
    });

    ui.notifications.info(`${power.name} désactivé.`);
  }

  _computeLineageMaintenanceCost(powers = []) {
    const totalMaintenance = powers.reduce((total, power) => {
      return total + Math.max(0, Number(power.maintenanceCost ?? 0));
    }, 0);

    const passiveRegen = Math.max(0, Number(this.system.resources?.chakra?.passiveRegen ?? 0));
    const netCost = Math.max(0, totalMaintenance - passiveRegen);

    return {
      totalMaintenance,
      passiveRegen,
      netCost
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
    const nextChakra = Math.max(0, currentChakra - maintenance.netCost);

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
      flavor: `${safeActorName} entretient ses pouvoirs de lignée`,
      content: `
        <div class="naruto-lineage-power-card">
          <header><h3>Entretien des pouvoirs de lignée</h3></header>
          <p><strong>${safeActorName}</strong> maintient ses pouvoirs actifs.</p>
          <div><strong>Entretien total :</strong> ${maintenance.totalMaintenance}</div>
          <div><strong>Régénération passive :</strong> -${maintenance.passiveRegen}</div>
          <div><strong>Coût net :</strong> ${maintenance.netCost}</div>
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
          <div><strong>Régénération passive :</strong> -${context.passiveRegen}</div>
          <div><strong>Coût net actuel :</strong> ${context.netCost}</div>
        </div>

        <hr />

        ${rows}

        <p class="formula-hint">
          Rappel : les entretiens sont additionnés, puis la régénération passive est soustraite une seule fois.
        </p>
      </form>
    `;

    await new Promise((resolve) => {
      new Dialog({
        title: `Entretien des pouvoirs — ${this.name}`,
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
                    netCost: maintenance.netCost
                  });
                }, 100);

                resolve();
                return;
              }

              const nextChakra = Math.max(0, currentChakra - maintenance.netCost);

              await this.update({
                "system.resources.chakra.value": nextChakra,
                "system.resources.activeLineagePowers": keptPowers
              });

              const safeActorName = foundry.utils.escapeHTML?.(this.name) ?? this.name;
              const keptNames = keptPowers.map((power) => foundry.utils.escapeHTML?.(power.name) ?? power.name).join(", ") || "Aucun";
              const removedNames = removedPowers.map((power) => foundry.utils.escapeHTML?.(power.name) ?? power.name).join(", ") || "Aucun";

              await ChatMessage.create({
                speaker: ChatMessage.getSpeaker({ actor: this }),
                flavor: `${safeActorName} ajuste ses pouvoirs maintenus`,
                content: `
                  <div class="naruto-lineage-power-card">
                    <header><h3>Entretien ajusté</h3></header>
                    <p><strong>${safeActorName}</strong> choisit les pouvoirs de lignée maintenus.</p>
                    <div><strong>Maintenus :</strong> ${keptNames}</div>
                    <div><strong>Désactivés :</strong> ${removedNames}</div>
                    <div><strong>Entretien total :</strong> ${maintenance.totalMaintenance}</div>
                    <div><strong>Régénération passive :</strong> -${maintenance.passiveRegen}</div>
                    <div><strong>Coût net :</strong> ${maintenance.netCost}</div>
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

    if (effect.type !== "restoreResource") {
      ui.notifications.warn("Cet effet de consommable n’est pas encore pris en charge.");
      return;
    }

    const toxicityData = this._getInventoryItemToxicity(item);
    const toxicityCheck = this._getConsumableToxicityUpdate(toxicityData);

    if (!toxicityCheck.valid) {
      ui.notifications.warn(toxicityCheck.reason ?? "La toxicité empêche d’utiliser ce consommable.");
      return;
    }

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

    if (effect.consumeOnUse) {
      item.quantity = Math.max(1, Number(item.quantity ?? 1)) - 1;
    }

    const updatedItems = item.quantity > 0
      ? items
      : items.filter((entry) => entry.id !== itemId);

    await this.update({
      [resource.valuePath]: newValue,
      "system.inventory.items": updatedItems,
      ...toxicityCheck.updateData
    });

    const safeItemName = foundry.utils.escapeHTML?.(String(item.name ?? "Consommable")) ?? String(item.name ?? "Consommable");
    const safeActorName = foundry.utils.escapeHTML?.(this.name) ?? this.name;
    const safeResourceLabel = foundry.utils.escapeHTML?.(resource.label) ?? resource.label;
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

          <div class="naruto-consumable-effect">
            <strong>Effet :</strong>
            <span>+${restored} ${safeResourceLabel}</span>
          </div>

          <div class="naruto-consumable-resource">
            <strong>${safeResourceLabel} :</strong>
            <span>${currentValue} → ${newValue} / ${maxValue}</span>
          </div>

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

    ui.notifications.info(`${item.name} utilisé : +${restored} ${resource.label}.`);
  }
}