import { NARUTO25E } from "../config.js";
export class Naruto25eShinobiSheet extends ActorSheet {
  static get defaultOptions() {
    return foundry.utils.mergeObject(super.defaultOptions, {
      classes: ["naruto-25e", "sheet", "actor", "shinobi"],
      template: "systems/naruto-25e/templates/actor/shinobi-sheet.hbs",
      width: 900,
      height: 760,
      tabs: [
        {
          navSelector: ".sheet-tabs",
          contentSelector: ".sheet-body",
          initial: "summary"
        }
      ]
    });
  }

  get title() {
    return `${this.actor.name} — Shinobi`;
  }

  async getData(options = {}) {
  const context = await super.getData(options);

  context.system = this.actor.system;
  context.actor = this.actor;
  context.items = this.actor.items;
  context.chakraFormulaMode = game.settings.get("naruto-25e", "chakraFormulaMode");
  context.affinityCostMode = game.settings.get("naruto-25e", "affinityCostMode");

  context.missionRanks = [
    { key: "d", label: "D", data: this.actor.system.missions.d },
    { key: "c", label: "C", data: this.actor.system.missions.c },
    { key: "b", label: "B", data: this.actor.system.missions.b },
    { key: "a", label: "A", data: this.actor.system.missions.a },
    { key: "s", label: "S", data: this.actor.system.missions.s },
    { key: "aa", label: "AA", data: this.actor.system.missions.aa },
    { key: "sPlus", label: "S+", data: this.actor.system.missions.sPlus }
  ];

  context.baseCap = this.actor.getBaseCap();

context.bases = Object.entries(this.actor.system.bases ?? {}).map(([key, base]) => {
  const current = Number(base.value ?? 1);
  const next = current + 1;
  const nextCost = this.actor.getBaseUpgradeCost(key);

  return {
    key,
    label: base.label,
    value: current,
    bonus: Number(base.bonus ?? 0),
    max: Number(base.max ?? 14),
    cap: context.baseCap,
    xpSpent: Number(base.xpSpent ?? 0),
    nextCost,
    canIncrease: next <= context.baseCap && nextCost !== null,
    canDecrease: current > 1
  };
});

  const skillSourceLabels = {
    common: "Commune",
    manual: "Choix initial",
    heritage: "Clan / Voie",
    affinityForced: "Affinité imposée",
    affinityPrimary: "Affinité principale",
    affinityPrimaryFree: "Affinité principale offerte",
    affinitySecondary: "Affinité secondaire",
    affinityExtra: "Affinité spéciale"
  };

  const countableCreationSources = new Set([
    "manual",
    "heritage",
    "affinityForced",
    "affinityPrimary",
    "affinitySecondary",
    "affinityExtra"
  ]);

  context.skills = Object.entries(NARUTO25E.skillDefinitions).map(([key, definition]) => {
    const skill = this.actor.system.skills?.[key] ?? {};
    const current = Number(skill.natural ?? 1);
    const next = current + 1;
    const nextCost = this.actor.getSkillUpgradeCost(key);
    const cap = this.actor.getSkillCap(key);

    const sources = Array.isArray(skill.creationSources)
      ? skill.creationSources
      : [];

    const sourceLabels = sources.map((source) => ({
      key: source,
      label: skillSourceLabels[source] ?? source
    }));

    const countsForCreationLimit = sources.some((source) => countableCreationSources.has(source));

    return {
      key,
      label: definition.label,
      base: definition.base,
      baseLabel: NARUTO25E.baseLabels[definition.base] ?? definition.base,
      category: definition.category,
      tags: definition.tags ?? [],
      natural: current,
      bonus: Number(skill.bonus ?? 0),
      total: Number(skill.total ?? 0),
      owned: Boolean(skill.owned),
      manualOwned: Boolean(skill.manualOwned),
      grantedByHeritage: Boolean(skill.grantedByHeritage),
      grantedByAffinity: Boolean(skill.grantedByAffinity),
      creationSources: sources,
      sourceLabels,
      countsForCreationLimit,
      masteryLabel: skill.masteryLabel ?? "",
      xpSpent: Number(skill.xpSpent ?? 0),
      nextCost,
      cap,
      canIncrease: Boolean(skill.owned) && next <= cap,
      canDecrease: current > 1
    };
  });

  const categoryOrder = ["common", "combat", "terrain", "clan"];

  context.skillGroups = categoryOrder.map((category) => ({
    key: category,
    label: NARUTO25E.skillCategories?.[category] ?? category,
    skills: context.skills.filter((skill) => skill.category === category)
  }));

  const usedInitialSkills = context.skills.filter((skill) => skill.countsForCreationLimit).length;
  const maxInitialSkills = 5;

  context.creationSkillSummary = {
    used: usedInitialSkills,
    max: maxInitialSkills,
    remaining: Math.max(0, maxInitialSkills - usedInitialSkills),
    overLimit: usedInitialSkills > maxInitialSkills
  };

  context.villages = Object.entries(NARUTO25E.villages).map(([key, village]) => ({
    key,
    label: village.label,
    selectable: Boolean(village.selectable),
    selected: this.actor.system.heritage?.village === key
  }));

  context.villageStatuses = Object.entries(NARUTO25E.villageStatuses).map(([key, label]) => ({
    key,
    label,
    selected: this.actor.system.heritage?.villageStatus === key
  }));

  context.heritageModes = Object.entries(NARUTO25E.heritageModes).map(([key, label]) => {
    let disabled = false;

    if (key === "hybridClan" && !this.actor.system.heritage?.gmOptions?.allowHybridClan) {
      disabled = true;
    }

    if (key === "hybridVoie" && !this.actor.system.heritage?.gmOptions?.allowHybridVoie) {
      disabled = true;
    }

    return {
      key,
      label,
      selected: this.actor.system.heritage?.mode === key,
      disabled
    };
  });

  const selectedVillage = this.actor.system.heritage?.village ?? "konoha";

  context.clans = Object.entries(NARUTO25E.clans)
    .filter(([, clan]) => clan.village === selectedVillage)
    .map(([key, clan]) => ({
      key,
      label: clan.label,
      skillKey: clan.skillKey,
      selected: this.actor.system.heritage?.clan === key
    }));

  context.secondaryClans = Object.entries(NARUTO25E.clans)
    .filter(([, clan]) => clan.village === selectedVillage)
    .map(([key, clan]) => ({
      key,
      label: clan.label,
      selected: this.actor.system.heritage?.hybrid?.secondaryClan === key
    }));

  context.voies = Object.entries(NARUTO25E.voies).map(([key, voie]) => {
    const allowedByVillage = voie.village === "any" || voie.village === selectedVillage;
    const selectable = Boolean(voie.selectable) && allowedByVillage;

    return {
      key,
      label: voie.label,
      village: voie.village,
      selectable,
      selected: this.actor.system.heritage?.voie === key
    };
  });

  const heritage = this.actor.system.heritage ?? {};
  const villageKey = heritage.village ?? "konoha";
  const village = NARUTO25E.villages[villageKey];

  const statusKey = heritage.villageStatus ?? "loyal";
  const statusLabel = NARUTO25E.villageStatuses[statusKey] ?? "Loyal";

  const modeKey = heritage.mode ?? "clan";
  const modeLabel = NARUTO25E.heritageModes[modeKey] ?? "Clan";

  const clan = NARUTO25E.clans[heritage.clan];
  const voie = NARUTO25E.voies[heritage.voie];
  const secondaryClan = NARUTO25E.clans[heritage.hybrid?.secondaryClan];

  let heritageMainLabel = "Aucun héritage sélectionné";

  if (modeKey === "clan" && clan) {
    heritageMainLabel = `Clan ${clan.label}`;
  } else if (modeKey === "voie" && voie) {
    heritageMainLabel = voie.label;
  } else if (modeKey === "hybridClan" && clan) {
    heritageMainLabel = `Clan ${clan.label}`;
    if (secondaryClan) heritageMainLabel += ` / ${secondaryClan.label}`;
  } else if (modeKey === "hybridVoie" && voie) {
    heritageMainLabel = voie.label;
    if (secondaryClan) heritageMainLabel += ` / ${secondaryClan.label}`;
  }

  context.heritageSummary = {
    village: village?.label ?? villageKey,
    status: statusLabel,
    mode: modeLabel,
    main: heritageMainLabel
  };

  const chakraAffinities = this.actor.system.chakra?.affinities ?? {};
  const forcedAffinities = Array.isArray(chakraAffinities.forced) ? chakraAffinities.forced : [];
  const ownedAffinities = Array.isArray(chakraAffinities.owned) ? chakraAffinities.owned : [];

  context.chakraAffinityOptions = NARUTO25E.chakraAffinityOrder.map((key) => {
    const affinity = NARUTO25E.chakraAffinities[key];

    return {
      key,
      label: affinity.label,
      type: affinity.type,
      description: affinity.description,
      primarySelected: chakraAffinities.primary === key,
      secondarySelected: chakraAffinities.secondary === key,
      forced: forcedAffinities.includes(key),
      owned: ownedAffinities.includes(key),
      skillKey: affinity.skillKey,
      skillLabel: NARUTO25E.skillDefinitions?.[affinity.skillKey]?.label ?? affinity.skillKey
    };
  });

  context.chakraAffinitySummary = {
    primary:
      NARUTO25E.chakraAffinities?.[chakraAffinities.primary]?.label
      ?? "Aucune",
    secondary:
      NARUTO25E.chakraAffinities?.[chakraAffinities.secondary]?.label
      ?? "Aucune",
    forced: forcedAffinities.map((key) => ({
      key,
      label: NARUTO25E.chakraAffinities?.[key]?.label ?? key,
      skillLabel:
        NARUTO25E.skillDefinitions?.[NARUTO25E.getAffinitySkillKey?.(key)]?.label
        ?? NARUTO25E.getAffinitySkillKey?.(key)
        ?? key
    })),
    owned: ownedAffinities.map((key) => ({
      key,
      label: NARUTO25E.chakraAffinities?.[key]?.label ?? key,
      skillLabel:
        NARUTO25E.skillDefinitions?.[NARUTO25E.getAffinitySkillKey?.(key)]?.label
        ?? NARUTO25E.getAffinitySkillKey?.(key)
        ?? key
    }))
  };

  context.isGM = game.user.isGM;
  const creation = this.actor.system.progression?.creation ?? {};

  context.creationState = {
    locked: Boolean(creation.locked),
    label: creation.locked ? "Validée" : "Brouillon",
    validatedAt: creation.validatedAt ?? "",
    validatedBy: creation.validatedBy ?? "",
    canValidate: game.user.isGM && !creation.locked,
    canUnlock: game.user.isGM && creation.locked
  };

  context.permissionsState = {
    canEditLockedCreationFields: this.actor.canUserEditLockedCreationFields(game.user),
    canEditRyo: this.actor.canUserEditRyo(game.user),
    canEditNindo: this.actor.canUserEditNindo(game.user),
    allowPlayerRyoEdit: Boolean(this.actor.system.inventory?.permissions?.allowPlayerRyoEdit),
    nindoUnlockedByGM: Boolean(this.actor.system.nindo?.unlockedByGM)
  };

  const mode = heritage.mode ?? "clan";
  const gmOptions = heritage.gmOptions ?? {};

  context.heritageState = {
    mode,
    isClanMode: mode === "clan",
    isVoieMode: mode === "voie",
    isHybridClanMode: mode === "hybridClan",
    isHybridVoieMode: mode === "hybridVoie",
    allowHybridClan: Boolean(gmOptions.allowHybridClan),
    allowHybridVoie: Boolean(gmOptions.allowHybridVoie),
    clanDisabled: mode === "voie" || mode === "hybridVoie",
    voieDisabled: mode === "clan" || mode === "hybridClan",
    hybridDisabled:
      (mode === "clan") ||
      (mode === "voie") ||
      (mode === "hybridClan" && !gmOptions.allowHybridClan) ||
      (mode === "hybridVoie" && !gmOptions.allowHybridVoie)
  };

  const lineageValue = Number(this.actor.system.bases?.lign?.value ?? 1);

  const buildClanTrackForSheet = (clanKey, role) => {
    if (!clanKey) return null;

    const clan = NARUTO25E.clans?.[clanKey];
    if (!clan) return null;

    const maxRank = NARUTO25E.getClanLineageCap(clanKey);
    const ranks = [];

    for (let rank = 1; rank <= maxRank; rank++) {
      ranks.push({
        rank,
        unlocked: lineageValue >= rank,
        label: `Rang ${rank}`,
        placeholder: "Capacité de lignée à définir"
      });
    }

    return {
      key: clanKey,
      label: clan.label,
      role,
      maxRank,
      ranks
    };
  };

  context.lineageTracks = [];

  if (heritage.mode === "clan") {
    const primaryTrack = buildClanTrackForSheet(heritage.clan, "Clan principal");
    if (primaryTrack) context.lineageTracks.push(primaryTrack);
  }

  if (heritage.mode === "hybridClan") {
    const primaryTrack = buildClanTrackForSheet(heritage.clan, "Clan principal");
    const secondaryTrack = buildClanTrackForSheet(heritage.hybrid?.secondaryClan, "Clan secondaire");

    if (primaryTrack) context.lineageTracks.push(primaryTrack);
    if (secondaryTrack) context.lineageTracks.push(secondaryTrack);
  }

  if (heritage.mode === "hybridVoie") {
    const secondaryTrack = buildClanTrackForSheet(heritage.hybrid?.secondaryClan, "Hybridation de voie");

    if (secondaryTrack) context.lineageTracks.push(secondaryTrack);
  }

  context.heritageMandatorySkills = [];

  const addMandatorySkillDisplay = (clanKey, sourceLabel) => {
    if (!clanKey) return;

    const clan = NARUTO25E.clans?.[clanKey];
    if (!clan) return;

    const skillKey = NARUTO25E.getClanMandatorySkill(clanKey);
    if (!skillKey) return;

    const skillDefinition = NARUTO25E.skillDefinitions?.[skillKey];
    if (!skillDefinition) return;

    context.heritageMandatorySkills.push({
      clanKey,
      clanLabel: clan.label,
      skillKey,
      skillLabel: skillDefinition.label,
      sourceLabel
    });
  };

  if (heritage.mode === "clan" || heritage.mode === "hybridClan") {
    addMandatorySkillDisplay(heritage.clan, "Clan principal");
  }

  if (heritage.mode === "hybridClan") {
    addMandatorySkillDisplay(heritage.hybrid?.secondaryClan, "Clan secondaire");
  }

  if (heritage.mode === "hybridVoie") {
    addMandatorySkillDisplay(heritage.hybrid?.secondaryClan, "Hybridation de voie");
  }

  context.lineageInfo = {
    value: lineageValue,
    hasTracks: context.lineageTracks.length > 0,
    hasMandatorySkills: context.heritageMandatorySkills.length > 0
  };

  const rank = this.actor.system.progression?.rank ?? {};

  context.rankProgression = {
    currentLabel: rank.currentLabel ?? "Aspirant Ninja",
    currentShortLabel: rank.currentShortLabel ?? "Aspirant",
    currentBaseCap: rank.currentBaseCap ?? 3,
    next: rank.next ?? null,
    checks: rank.checks ?? [],
    canPromote: Boolean(rank.canPromote),
    requiresGM: Boolean(rank.requiresGM),
    automaticChecksPassed: Boolean(rank.automaticChecksPassed),
    isMaxRank: !rank.next
  };

  context.combatHealthStates = Object.entries(NARUTO25E.healthStates).map(([key, label]) => ({
    key,
    label,
    selected: this.actor.system.combat?.health?.manualState === key
  }));

  context.combatSummary = {
    manualStateLabel:
      NARUTO25E.healthStates[this.actor.system.combat?.health?.manualState ?? "none"] ?? "Pleine forme",
    chakraStateLabel:
      NARUTO25E.healthStates[this.actor.system.combat?.health?.chakraState ?? "none"] ?? "Pleine forme",
    hasChakraAlert: (this.actor.system.combat?.health?.chakraState ?? "none") !== "none"
  };

  const chakraSpecState = this.actor.system.chakra?.specializationState ?? {
    available: 1,
    spent: 0,
    remaining: 1,
    overLimit: false
  };

  context.chakraSpecializationState = chakraSpecState;

  context.chakraSpecializations = NARUTO25E.chakraSpecializationOrder.map((key) => {
    const definition = NARUTO25E.chakraSpecializations[key];
    const value = Number(this.actor.system.chakra?.specializations?.[key] ?? 0);
    const maxStacks = Number(definition.maxStacks ?? 1);

    return {
      key,
      label: definition.label,
      value,
      maxStacks,
      unique: Boolean(definition.unique),
      specialOnly: Boolean(definition.specialOnly),
      effect: definition.effect,
      canIncrease: value < maxStacks && Number(chakraSpecState.remaining ?? 0) > 0,
      canDecrease: value > 0
    };
  });

  context.chakraSpecializationSummary = context.chakraSpecializations
    .filter((spec) => spec.value > 0)
    .map((spec) => ({
      label: spec.label,
      value: spec.value,
      text: spec.value > 1 ? `${spec.label} x${spec.value}` : spec.label
    }));

  context.chakraSpecializationBonuses = this.actor.system.chakra?.specializationBonuses ?? {};

  context.combatSkillOptions = Object.entries(NARUTO25E.skillDefinitions ?? {})
    .filter(([key, definition]) => {
      const skill = this.actor.system.skills?.[key];

      if (definition.ownedByDefault) return true;
      if (skill?.owned) return true;

      return false;
    })
    .map(([key, definition]) => ({
      key,
      label: definition.label,
      selected: this.actor.system.combat?.quickSkill === key
    }))
    .sort((a, b) => a.label.localeCompare(b.label, "fr"));

  context.combatCounters = this.actor.system.combat?.counters ?? {};

  context.inventoryTypes = Object.entries(NARUTO25E.inventoryTypes).map(([key, label]) => ({
    key,
    label,
    selected: this.actor.system.inventory?.newItem?.type === key
  }));

  const inventoryItems = this.actor.system.inventory?.items ?? [];

  context.inventoryByType = NARUTO25E.inventoryTypeOrder.map((type) => ({
    type,
    label: NARUTO25E.inventoryTypes[type],
    items: inventoryItems.filter((item) => item.type === type)
  }));

  context.equippedWeapons = inventoryItems.filter((item) => item.type === "weapon" && item.equipped);
  context.equippedArmors = inventoryItems.filter((item) => item.type === "armor" && item.equipped);
    return context;
  }

  activateListeners(html) {
  super.activateListeners(html);

  if (!this.isEditable) return;

  html.find(".base-increase").on("click", async (event) => {
    event.preventDefault();
    const baseKey = event.currentTarget.dataset.base;
    await this.actor.increaseBase(baseKey);
  });

  html.find(".base-decrease").on("click", async (event) => {
    event.preventDefault();
    const baseKey = event.currentTarget.dataset.base;
    await this.actor.decreaseBase(baseKey);
  });

  html.find(".skill-increase").on("click", async (event) => {
  event.preventDefault();
  const skillKey = event.currentTarget.dataset.skill;
  await this.actor.increaseSkill(skillKey);
  });

  html.find(".skill-decrease").on("click", async (event) => {
  event.preventDefault();
  const skillKey = event.currentTarget.dataset.skill;
  await this.actor.decreaseSkill(skillKey);
  });

  html.find(".heritage-mode-select").on("change", async (event) => {
  event.preventDefault();

  const mode = event.currentTarget.value;
  const gmOptions = this.actor.system.heritage?.gmOptions ?? {};

  if (mode === "hybridClan" && !gmOptions.allowHybridClan) {
    ui.notifications.warn("Le Clan hybride n’est pas autorisé sur cette fiche.");
    await this.actor.update({ "system.heritage.mode": "clan" });
    return;
  }

  if (mode === "hybridVoie" && !gmOptions.allowHybridVoie) {
    ui.notifications.warn("La Voie hybridée n’est pas autorisée sur cette fiche.");
    await this.actor.update({ "system.heritage.mode": "voie" });
    return;
  }

  const updateData = {
    "system.heritage.mode": mode
  };

  if (mode === "clan") {
    updateData["system.heritage.voie"] = "";
    updateData["system.heritage.hybrid.secondaryClan"] = "";
    updateData["system.heritage.hybrid.reason"] = "";
  }

  if (mode === "voie") {
    updateData["system.heritage.clan"] = "";
    updateData["system.heritage.hybrid.secondaryClan"] = "";
    updateData["system.heritage.hybrid.reason"] = "";
  }

  if (mode === "hybridClan") {
    updateData["system.heritage.voie"] = "";
  }

  if (mode === "hybridVoie") {
    updateData["system.heritage.clan"] = "";
  }

  await this.actor.update(updateData);
});

  html.find(".heritage-gm-option").on("change", async (event) => {
    event.preventDefault();

    if (!game.user.isGM) return;

    const field = event.currentTarget.dataset.field;
    const checked = event.currentTarget.checked;

    const updateData = {
      [`system.heritage.gmOptions.${field}`]: checked
    };

    const currentMode = this.actor.system.heritage?.mode;

    if (field === "allowHybridClan" && !checked && currentMode === "hybridClan") {
      updateData["system.heritage.mode"] = "clan";
      updateData["system.heritage.hybrid.secondaryClan"] = "";
      updateData["system.heritage.hybrid.reason"] = "";
    }

    if (field === "allowHybridVoie" && !checked && currentMode === "hybridVoie") {
      updateData["system.heritage.mode"] = "voie";
      updateData["system.heritage.hybrid.secondaryClan"] = "";
      updateData["system.heritage.hybrid.reason"] = "";
    }

    await this.actor.update(updateData);
  });

  html.find(".rank-promote").on("click", async (event) => {
  event.preventDefault();
  await this.actor.promoteToNextRank();
  });

  html.find(".chakra-specialization-increase").on("click", async (event) => {
    event.preventDefault();
    const key = event.currentTarget.dataset.specialization;
    await this.actor.increaseChakraSpecialization(key);
  });

  html.find(".chakra-specialization-decrease").on("click", async (event) => {
    event.preventDefault();
    const key = event.currentTarget.dataset.specialization;
    await this.actor.decreaseChakraSpecialization(key);
  });

  html.find(".combat-roll-initiative").on("click", async (event) => {
    event.preventDefault();
    await this.actor.rollInitiativeAction();
  });

  html.find(".combat-roll-attack").on("click", async (event) => {
    event.preventDefault();
    const kind = event.currentTarget.dataset.kind;
    await this.actor.rollBasicAttack(kind);
  });

  html.find(".combat-roll-interception").on("click", async (event) => {
    event.preventDefault();
    const kind = event.currentTarget.dataset.kind;
    await this.actor.rollInterception(kind);
  });

  html.find(".combat-roll-skill").on("click", async (event) => {
    event.preventDefault();

    const skillKey = html.find('[name="system.combat.quickSkill"]').val();
    await this.actor.rollSkillAction(skillKey);
  });

  html.find(".combat-reset-counters").on("click", async (event) => {
    event.preventDefault();

    const scope = event.currentTarget.dataset.scope;
    await this.actor.resetCombatCounters(scope);
  });

  html.find(".combat-spend-lineage-power").on("click", async (event) => {
    event.preventDefault();

    await this.actor.spendLineagePowerUse();
  });

  html.find(".inventory-add-item").on("click", async (event) => {
    event.preventDefault();
    await this.actor.addInventoryItemFromDraft();
  });

  html.find(".inventory-delete-item").on("click", async (event) => {
    event.preventDefault();
    const itemId = event.currentTarget.dataset.itemId;
    await this.actor.deleteInventoryItem(itemId);
  });

  html.find(".inventory-toggle-equipped").on("click", async (event) => {
    event.preventDefault();
    const itemId = event.currentTarget.dataset.itemId;
    await this.actor.toggleInventoryItemEquipped(itemId);
  });

  html.find(".inventory-item-field").on("change", async (event) => {
    event.preventDefault();

    const input = event.currentTarget;
    const itemId = input.dataset.itemId;
    const field = input.dataset.field;

    if (!itemId || !field) return;

    let value;

    if (input.type === "checkbox") {
      value = input.checked;
    } else if (input.type === "number") {
      value = Number(input.value ?? 0);
    } else {
      value = input.value;
    }

    await this.actor.updateInventoryItem(itemId, {
      [field]: value
    });
  });

  html.find(".creation-validate").on("click", async (event) => {
    event.preventDefault();
    await this.actor.validateCreation();
  });

  html.find(".creation-unlock").on("click", async (event) => {
    event.preventDefault();
    await this.actor.unlockCreation();
  });

  html.find(".ryo-adjust").on("click", async (event) => {
    event.preventDefault();

    const mode = event.currentTarget.dataset.mode;
    const rawAmount = html.find('[name="system.inventory.ryoDelta"]').val();
    const amount = Math.abs(Number(rawAmount ?? 0));

    if (!Number.isFinite(amount) || amount <= 0) {
      ui.notifications.warn("Entre une valeur de Ryō positive.");
      return;
    }

    const delta = mode === "remove" ? -amount : amount;

    await this.actor.adjustRyo(delta);
  });

  html.find(".ryo-permission-toggle").on("change", async (event) => {
    event.preventDefault();

    await this.actor.setPlayerRyoPermission(event.currentTarget.checked);
  });

  html.find(".nindo-unlock-toggle").on("change", async (event) => {
    event.preventDefault();

    await this.actor.setNindoUnlockedByGM(event.currentTarget.checked);
  });
  }
}