import { NARUTO25E } from "../config.js";
import {
  Naruto25eShinobimancerApplication,
  Naruto25eShinobimancerChoiceApplication
} from "../apps/shinobimancer.js";

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

  _maybeOpenShinobimancerChoice() {
    if (!this.actor || this.actor.type !== "shinobi") return;

    const creationLocked = typeof this.actor.isCreationLocked === "function"
      ? this.actor.isCreationLocked()
      : Boolean(this.actor.system?.progression?.creation?.locked);

    if (creationLocked) return;

    if (!this.actor.isOwner && !game.user?.isGM) return;

    const bypassUserId = this.actor._naruto25eBypassShinobimancerOnce;

    if (bypassUserId && bypassUserId === (game.user?.id ?? "unknown")) {
      delete this.actor._naruto25eBypassShinobimancerOnce;
      return;
    }

    if (!Naruto25eShinobiSheet._shinobimancerOpeningActors) {
      Naruto25eShinobiSheet._shinobimancerOpeningActors = new Set();
    }

    const promptKey = `${game.user?.id ?? "unknown"}:${this.actor.id}`;

    if (Naruto25eShinobiSheet._shinobimancerOpeningActors.has(promptKey)) {
      return;
    }

    Naruto25eShinobiSheet._shinobimancerOpeningActors.add(promptKey);

    window.setTimeout(async () => {
      try {
        if (!this.rendered) return;

        const creation = this.actor.system?.progression?.creation ?? {};
        const creationMode = String(creation.mode ?? "");
        const currentStep = String(creation.currentStep ?? "identity");

        if (creationMode === "manual") return;

        if (creationMode === "shinobimancer") {
          const opener = game.naruto25e?.openShinobimancer;

          if (typeof opener === "function") {
            opener(this.actor, {
              sourceSheet: this,
              currentStep
            });
          } else {
            new Naruto25eShinobimancerApplication(this.actor, {
              sourceSheet: this,
              currentStep
            }).render(true);
          }

          await this.close();
          return;
        }

        const opener = game.naruto25e?.openShinobimancerChoice;

        if (typeof opener === "function") {
          opener(this.actor, {
            sourceSheet: this
          });
        } else {
          new Naruto25eShinobimancerChoiceApplication(this.actor, {
            sourceSheet: this
          }).render(true);
        }

        await this.close();
      } finally {
        Naruto25eShinobiSheet._shinobimancerOpeningActors.delete(promptKey);
      }
    }, 150);
  }

  _getUchihaSheetEffectiveLineageValue() {
    if (typeof this.actor._getEffectiveLineageValue === "function") {
      return this.actor._getEffectiveLineageValue();
    }

    return Number(this.actor.system?.bases?.lign?.value ?? 1);
  }

  _getUchihaSheetEyeMinimumLineage(eyeKey) {
    return eyeKey === "right" ? 6 : 7;
  }

  _isUchihaSheetEyeChoiceUnlocked(eyeKey, lineageValue = null) {
    const effectiveLineage = lineageValue === null
      ? this._getUchihaSheetEffectiveLineageValue()
      : Number(lineageValue ?? 0);

    return effectiveLineage >= this._getUchihaSheetEyeMinimumLineage(eyeKey);
  }

  _getUchihaSheetEyePowerChoiceOptions(eyeKey) {
    const heritage = this.actor.system?.heritage ?? {};
    const mangekyo = heritage.uchiha?.mangekyo ?? {};
    const rightEyePower = String(mangekyo.rightEyePower ?? "");
    const leftEyePower = String(mangekyo.leftEyePower ?? "");
    const rightEyePlayerValidated = Boolean(mangekyo.rightEyePlayerValidated);

    return Object.entries(NARUTO25E.uchihaEyePowers ?? {})
      .map(([key, power]) => {
        let disabled = false;
        let reason = "";

        if (eyeKey === "right" && key === "enton") {
          disabled = true;
          reason = "Enton ne peut pas être le premier pouvoir d’œil débloqué. Il nécessite Amaterasu sur l’œil droit.";
        }

        const validation = NARUTO25E.canSelectUchihaEyePower?.({
          powerKey: key,
          eyeKey,
          rightEyePower,
          leftEyePower,
          rightEyePlayerValidated
        }) ?? { valid: true, reason: "" };

        if (!validation.valid) {
          disabled = true;
          reason = validation.reason;
        }

        return {
          key,
          label: power.label,
          summary: power.summary,
          disabled,
          reason
        };
      })
      .filter((option) => !option.disabled);
  }

  async _maybePromptUchihaMangekyoEyeChoice() {
    if (!this.actor || this.actor.type !== "shinobi") return;
    if (!this.actor.isOwner && !game.user?.isGM) return;

    if (this._naruto25eMangekyoEyePromptOpen) return;

    const heritage = this.actor.system?.heritage ?? {};
    const mangekyo = heritage.uchiha?.mangekyo ?? {};
    const uchihaPowerMode = NARUTO25E.getUchihaPowerMode?.() ?? "classic";

    if (uchihaPowerMode !== "original") return;

    const hasUchihaLineage = typeof this.actor._hasMechanicalClan === "function"
      ? this.actor._hasMechanicalClan("uchiha", { purpose: "powers" })
      : heritage.clan === "uchiha";

    if (!hasUchihaLineage) return;

    const lineageValue = this._getUchihaSheetEffectiveLineageValue();
    const rightEyePower = String(mangekyo.rightEyePower ?? "");
    const leftEyePower = String(mangekyo.leftEyePower ?? "");
    const rightPromptedAt = Number(mangekyo.rightEyeChoicePromptedAtLineage ?? 0);
    const leftPromptedAt = Number(mangekyo.leftEyeChoicePromptedAtLineage ?? 0);

    let eyeKey = "";

    if (
      this._isUchihaSheetEyeChoiceUnlocked("right", lineageValue)
      && !rightEyePower
      && rightPromptedAt < lineageValue
    ) {
      eyeKey = "right";
    } else if (
      this._isUchihaSheetEyeChoiceUnlocked("left", lineageValue)
      && rightEyePower
      && !leftEyePower
      && leftPromptedAt < lineageValue
    ) {
      eyeKey = "left";
    }

    if (!eyeKey) return;

    const eyeLabel = eyeKey === "right" ? "œil droit" : "œil gauche";
    const minimumLineage = this._getUchihaSheetEyeMinimumLineage(eyeKey);
    const options = this._getUchihaSheetEyePowerChoiceOptions(eyeKey);

    if (options.length === 0) return;

    const optionRows = options.map((option, index) => {
      const checked = index === 0 ? "checked" : "";
      const safeKey = foundry.utils.escapeHTML?.(option.key) ?? option.key;
      const safeLabel = foundry.utils.escapeHTML?.(option.label) ?? option.label;
      const safeSummary = foundry.utils.escapeHTML?.(option.summary ?? "") ?? (option.summary ?? "");

      return `
        <label class="naruto-defense-choice">
          <input type="radio" name="eyePower" value="${safeKey}" ${checked} />
          <span>
            <strong>${safeLabel}</strong>
            <br />
            <small>${safeSummary}</small>
          </span>
        </label>
      `;
    }).join("");

    this._naruto25eMangekyoEyePromptOpen = true;

    new Dialog({
      title: `Mangekyō — choix du ${eyeLabel}`,
      content: `
        <form class="naruto-defense-dialog">
          <p>
            La Lignée effective de ${this.actor.name} atteint le rang ${lineageValue}.
            Le ${eyeLabel} est débloqué à partir de Lignée ${minimumLineage}.
          </p>
          <p class="hint">
            Choisir un pouvoir ici confirme le choix côté joueur. Le MJ devra encore le valider pour l’accorder mécaniquement.
          </p>
          ${optionRows}
        </form>
      `,
      buttons: {
        choose: {
          label: "Choisir et confirmer",
          callback: async (html) => {
            const selectedPower = String(html.find('input[name="eyePower"]:checked').val() ?? "");
            if (!selectedPower) return;

            await this.actor.update({
              [`system.heritage.uchiha.mangekyo.${eyeKey}EyePower`]: selectedPower,
              [`system.heritage.uchiha.mangekyo.${eyeKey}EyePlayerValidated`]: true,
              [`system.heritage.uchiha.mangekyo.${eyeKey}EyeGmValidated`]: false,
              [`system.heritage.uchiha.mangekyo.${eyeKey}EyeChoicePromptedAtLineage`]: lineageValue
            });

            ui.notifications.info(`Pouvoir du ${eyeLabel} choisi et confirmé côté joueur.`);
          }
        },
        later: {
          label: "Choisir plus tard",
          callback: async () => {
            await this.actor.update({
              [`system.heritage.uchiha.mangekyo.${eyeKey}EyeChoicePromptedAtLineage`]: lineageValue
            });

            ui.notifications.info(`Choix du ${eyeLabel} remis à plus tard.`);
          }
        }
      },
      default: "choose",
      close: () => {
        this._naruto25eMangekyoEyePromptOpen = false;
      }
    }).render(true);
  }

  async getData(options = {}) {
  const context = await super.getData(options);

  context.system = this.actor.system;
  context.actor = this.actor;
  context.items = this.actor.items;
    const activeLineagePowers = this.actor.system.resources?.activeLineagePowers ?? [];

  context.lineagePowerItems = this.actor.items
    .filter((item) => item.type === "pouvoirLignee")
    .map((item) => {
      const powerType = item.system.powerType ?? "maintained";

      return {
        id: item.id,
        name: item.name,
        activationCost: Number(item.system.activationCost ?? 0),
        maintenanceCost: Number(item.system.maintenanceCost ?? 0),
        powerType,
        isPassive: powerType === "passive",
        isActivable: powerType !== "passive",
        typeLabel: powerType === "passive"
          ? "Passif"
          : powerType === "maintained"
          ? "Maintenu"
          : "Activable",
          effect: item.system.effect ?? "",
          active: activeLineagePowers.some((power) => power.itemId === item.id)
      };
    });

  context.hasLineagePowerItems = context.lineagePowerItems.length > 0;

  const activeMaintainedEffects = activeLineagePowers;

  const getTechniqueFamilyLabel = (familyKey) => {
    return NARUTO25E.techniqueFamilies?.[familyKey] ?? familyKey ?? "Autres";
  };

  const getTechniqueRankLabel = (rankKey) => {
    return NARUTO25E.techniqueRanks?.[rankKey] ?? rankKey ?? "—";
  };

  const getTechniqueActionLabel = (actionKey) => {
    return NARUTO25E.techniqueActionTypes?.[actionKey] ?? actionKey ?? "—";
  };

  const techniqueItems = this.actor.items
    .filter((item) => item.type === "technique")
    .map((item) => {
      const system = item.system ?? {};
      const family = system.family || "autres";
      const maintenanceCost = Math.max(0, Number(system.chakra?.maintenance ?? 0));
      const activeEffect = activeMaintainedEffects.find((effect) => effect.itemId === item.id);

      return {
        id: item.id,
        name: item.name,
        img: item.img,
        family,
        familyLabel: getTechniqueFamilyLabel(family),
        domain: system.domain ?? "",
        rank: system.rank ?? "",
        rankLabel: getTechniqueRankLabel(system.rank),
        level: Number(system.level ?? 1),
        skill: system.skill ?? "",
        skillLabel: NARUTO25E.skillDefinitions?.[system.skill]?.label ?? system.skill ?? "—",
        base: system.base ?? "",
        actionType: system.actionType ?? "complex",
        actionLabel: getTechniqueActionLabel(system.actionType),
        range: system.range ?? "",
        duration: system.duration ?? "",
        target: system.target ?? "",
        area: system.area ?? "",
        damageFormula: system.damage?.formula ?? "",
        damageType: NARUTO25E.damageTypes?.[system.damage?.type] ?? system.damage?.type ?? "",
        chakraInitial: Math.max(0, Number(system.chakra?.initial ?? 0)),
        chakraMaintenance: maintenanceCost,
        hasMaintenance: maintenanceCost > 0,
        effect: system.effect ?? "",
        active: Boolean(activeEffect),
        activeId: activeEffect?.id ?? ""
      };
    })
    .sort((a, b) => {
      const familyCompare = a.familyLabel.localeCompare(b.familyLabel, "fr");
      if (familyCompare !== 0) return familyCompare;

      const rankCompare = String(a.rankLabel).localeCompare(String(b.rankLabel), "fr");
      if (rankCompare !== 0) return rankCompare;

      return a.name.localeCompare(b.name, "fr");
    });

  context.techniqueItems = techniqueItems;
  context.hasTechniqueItems = techniqueItems.length > 0;

  const techniqueGroupsMap = new Map();

  for (const technique of techniqueItems) {
    const key = technique.family || "autres";

    if (!techniqueGroupsMap.has(key)) {
      techniqueGroupsMap.set(key, {
        key,
        label: technique.familyLabel || "Autres",
        techniques: []
      });
    }

    techniqueGroupsMap.get(key).techniques.push(technique);
  }

  context.techniqueGroups = Array.from(techniqueGroupsMap.values());

  const lineageMaintenance = this.actor._computeLineageMaintenanceCost?.(activeLineagePowers) ?? {
    totalMaintenance: 0,
    passiveRegen: 0,
    netCost: 0
  };

  const currentChakra = Math.max(0, Number(this.actor.system.resources?.chakra?.value ?? 0));
  const nextChakraAfterMaintenance = Math.max(0, currentChakra - lineageMaintenance.netCost);

  context.lineageMaintenanceSummary = {
    activeCount: activeMaintainedEffects.length,
    totalMaintenance: lineageMaintenance.totalMaintenance,
    passiveRegen: lineageMaintenance.passiveRegen,
    netCost: lineageMaintenance.netCost,
    currentChakra,
    nextChakra: nextChakraAfterMaintenance,
    crossesCriticalThreshold: this.actor._crossesCriticalChakraThreshold?.(
      currentChakra,
      nextChakraAfterMaintenance
    ) ?? false
  };
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

  const hiddenLineageCap = key === "lign" && typeof this.actor._getHiddenClanLineageCap === "function"
    ? this.actor._getHiddenClanLineageCap()
    : null;

  const effectiveLineage = key === "lign" && typeof this.actor._getEffectiveLineageValue === "function"
    ? this.actor._getEffectiveLineageValue()
    : current;

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
    canDecrease: current > 1,
    hiddenLineageCap,
    effectiveLineage,
    hasHiddenEffectiveValue: key === "lign" && hiddenLineageCap !== null && effectiveLineage !== current
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

  const skillSourcePriority = {
    heritage: 10,
    affinityForced: 20,
    affinityPrimary: 30,
    affinityPrimaryFree: 35,
    affinitySecondary: 40,
    affinityExtra: 45,
    manual: 60,
    common: 90
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

    const sourceLabels = sources
      .map((source) => ({
        key: source,
        label: skillSourceLabels[source] ?? source,
        priority: skillSourcePriority[source] ?? 999
      }))
      .sort((a, b) => a.priority - b.priority);

    const hasCountingCreationSource = sources.some((source) => countableCreationSources.has(source));
    const hasFreePrimaryAffinity = sources.includes("affinityPrimaryFree");

    const countsForCreationLimit =
      hasCountingCreationSource
      && !(hasFreePrimaryAffinity && sources.every((source) => {
        return source === "manual" || source === "affinityPrimaryFree";
      }));

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
      canDecrease: current > 1,
      canToggleOwned:
        !definition.ownedByDefault
        && definition.category !== "clan",
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

  const progressionExperience = this.actor.system.progression?.experience ?? {};

    context.experienceSummary = {
      total: Number(progressionExperience.total ?? 0),
      spent: Number(progressionExperience.spent ?? 0),
      baseSpent: Number(progressionExperience.baseSpent ?? 0),
      skillSpent: Number(progressionExperience.skillSpent ?? 0),
      available: Number(progressionExperience.available ?? 0)
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
  const heritage = this.actor.system.heritage ?? {};
  const gmOptions = heritage.gmOptions ?? {};
  const customClan = heritage.customClan ?? {};
  const customClanChoices = NARUTO25E.getCustomClanMandatoryChoices?.(customClan) ?? [];

  context.clans = Object.entries(NARUTO25E.clans)
    .filter(([, clan]) => clan.village === selectedVillage)
    .map(([key, clan]) => ({
      key,
      label: clan.label,
      skillKey: clan.skillKey,
      selected: heritage.clan === key
    }));

  if (gmOptions.allowCustomClan) {
    context.clans.push({
      key: NARUTO25E.customClanKey,
      label: "Clan custom",
      skillKey: "",
      selected: heritage.clan === NARUTO25E.customClanKey
    });
  }

  context.secondaryClans = Object.entries(NARUTO25E.clans)
    .filter(([, clan]) => clan.village === selectedVillage)
    .map(([key, clan]) => ({
      key,
      label: clan.label,
      selected: heritage.hybrid?.secondaryClan === key
    }));

  const hiddenClan = heritage.hiddenClan ?? {};
  const hiddenClanAwareness = String(hiddenClan.awareness ?? "ignorant");
  const hiddenClanState = NARUTO25E.getHiddenClanAwarenessState?.(hiddenClanAwareness) ?? {
    label: "Dans l’ignorance",
    summary: "Le personnage ignore totalement sa vraie lignée.",
    maxCreationLineage: 0
  };

  const canSeeHiddenClan =
    Boolean(game.user?.isGM)
    || Boolean(this.actor.isOwner);

  context.hiddenClanOfficialClans = Object.entries(NARUTO25E.clans)
    .filter(([, clan]) => clan.village === selectedVillage)
    .map(([key, clan]) => ({
      key,
      label: clan.label,
      selected: hiddenClan.officialClan === key
    }));

  context.hiddenClanRealClans = Object.entries(NARUTO25E.clans)
    .filter(([, clan]) => clan.village === selectedVillage)
    .map(([key, clan]) => ({
      key,
      label: clan.label,
      selected: hiddenClan.realClan === key
    }));

  context.hiddenClanAwarenessStates = Object.entries(NARUTO25E.hiddenClanAwarenessStates ?? {}).map(([key, state]) => ({
    key,
    label: state.label,
    summary: state.summary,
    selected: hiddenClanAwareness === key
  }));

  context.customClanChoiceOptions = [
    ...Object.entries(NARUTO25E.skillDefinitions)
      .filter(([, skill]) => skill.category !== "clan" && !skill.ownedByDefault)
      .map(([key, skill]) => ({
        key: `skill:${key}`,
        label: `Compétence — ${skill.label}`,
        selectedFirst: customClanChoices[0] === `skill:${key}`,
        selectedSecond: customClanChoices[1] === `skill:${key}`
      })),
    ...NARUTO25E.chakraAffinityOrder.map((key) => ({
      key: `affinity:${key}`,
      label: `Affinité — ${NARUTO25E.chakraAffinities?.[key]?.label ?? key}`,
      selectedFirst: customClanChoices[0] === `affinity:${key}`,
      selectedSecond: customClanChoices[1] === `affinity:${key}`
    }))
  ];

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

  const villageKey = heritage.village ?? "konoha";
  const village = NARUTO25E.villages[villageKey];

  const statusKey = heritage.villageStatus ?? "loyal";
  const statusLabel = NARUTO25E.villageStatuses[statusKey] ?? "Loyal";

  const modeKey = heritage.mode ?? "clan";
  const modeLabel = NARUTO25E.heritageModes[modeKey] ?? "Clan";

  const clan = NARUTO25E.clans[heritage.clan];
  const voie = NARUTO25E.voies[heritage.voie];
  const secondaryClan = NARUTO25E.clans[heritage.hybrid?.secondaryClan];
  const officialHiddenClan = NARUTO25E.clans[hiddenClan.officialClan];
  const realHiddenClan = NARUTO25E.clans[hiddenClan.realClan];

  let heritageMainLabel = "Aucun héritage sélectionné";

  const getPrimaryClanLabel = () => {
    if (NARUTO25E.isCustomClanKey?.(heritage.clan)) {
      return String(heritage.customClan?.name ?? "").trim() || "Clan custom non nommé";
    }

    return clan?.label ?? "Clan ?";
  };

  if (modeKey === "clan" && (clan || NARUTO25E.isCustomClanKey?.(heritage.clan))) {
    heritageMainLabel = `Clan ${getPrimaryClanLabel()}`;
  } else if (modeKey === "voie" && voie) {
    heritageMainLabel = voie.label;
  } else if (modeKey === "hybridClan" && (clan || NARUTO25E.isCustomClanKey?.(heritage.clan))) {
    heritageMainLabel = `Clan ${getPrimaryClanLabel()}`;
    if (secondaryClan) heritageMainLabel += ` / ${secondaryClan.label}`;
  } else if (modeKey === "hybridVoie" && voie) {
    heritageMainLabel = `${getPrimaryClanLabel()} / ${voie.label}`;
  } else if (modeKey === "hiddenClan") {
    const officialLabel = officialHiddenClan?.label ?? "Clan officiel ?";
    const realLabel = realHiddenClan?.label ?? "Réel Clan ?";

    heritageMainLabel = canSeeHiddenClan
      ? `Clan officiel ${officialLabel} / Réel Clan ${realLabel}`
      : `Clan ${officialLabel}`;
  }

  context.heritageSummary = {
    village: village?.label ?? villageKey,
    status: statusLabel,
    mode: modeLabel,
    main: heritageMainLabel
  };

  const buildClanCreationPreview = (clanKey, role) => {
    if (!clanKey) return null;

    const clanDefinition = NARUTO25E.clans?.[clanKey];
    const creationData = NARUTO25E.getClanCreationData?.(clanKey);

    if (!clanDefinition || !creationData) return null;

    const mandatorySkillKeys = NARUTO25E.getClanMandatorySkills?.(clanKey) ?? [];
    const mandatoryAffinityKeys = NARUTO25E.getClanMandatoryAffinities?.(clanKey) ?? [];

    return {
      key: clanKey,
      role,
      label: clanDefinition.label ?? clanKey,
      summary: creationData.summary ?? "",
      lore: creationData.lore ?? "",
      creationAdvice: creationData.creationAdvice ?? "",
      mandatorySkills: mandatorySkillKeys.map((skillKey) => ({
        key: skillKey,
        label: NARUTO25E.skillDefinitions?.[skillKey]?.label ?? skillKey
      })),
      mandatoryAffinities: mandatoryAffinityKeys.map((affinityKey) => ({
        key: affinityKey,
        label: NARUTO25E.chakraAffinities?.[affinityKey]?.label ?? affinityKey
      })),
      startingFeatures: creationData.startingFeatures ?? [],
      futureUnlocks: creationData.futureUnlocks ?? [],
      narrativeWarnings: creationData.narrativeWarnings ?? [],
      recommendedBuilds: creationData.recommendedBuilds ?? [],
      previewTags: creationData.previewTags ?? []
    };
  };

  const buildCustomClanCreationPreview = () => {
    if (!NARUTO25E.isCustomClanKey?.(heritage.clan)) return null;

    const custom = heritage.customClan ?? {};
    const name = String(custom.name ?? "").trim();
    const choices = NARUTO25E.getCustomClanMandatoryChoices?.(custom) ?? [];

    const mandatorySkills = [];
    const mandatoryAffinities = [];

    for (const choiceKey of choices) {
      const choice = NARUTO25E.getCustomClanChoiceData?.(choiceKey);
      if (!choice?.valid) continue;

      if (choice.type === "skill") {
        mandatorySkills.push({
          key: choice.key,
          label: choice.label
        });
      }

      if (choice.type === "affinity") {
        mandatoryAffinities.push({
          key: choice.key,
          label: choice.label
        });
      }
    }

    return {
      key: "custom",
      role: "Clan principal",
      label: name || "Clan custom non nommé",
      summary: custom.summary ?? "",
      lore: "",
      creationAdvice: "Clan personnalisé soumis à validation MJ. Il peut imposer jusqu’à 2 choix au total : compétences normales ou affinités.",
      mandatorySkills,
      mandatoryAffinities,
      startingFeatures: [],
      futureUnlocks: ["Progression et pouvoirs à définir avec le MJ."],
      narrativeWarnings: ["Le clan custom nécessite une validation MJ avant verrouillage de la création."],
      recommendedBuilds: [],
      previewTags: ["Custom", "Validation MJ"]
    };
  };

  context.clanCreationPreviews = [
    NARUTO25E.isCustomClanKey?.(heritage.clan)
      ? buildCustomClanCreationPreview()
      : buildClanCreationPreview(heritage.clan, "Clan principal"),
    heritage.mode === "hybridClan"
      ? buildClanCreationPreview(heritage.hybrid?.secondaryClan, "Clan secondaire")
      : null
  ].filter(Boolean);

  const chakraAffinities = this.actor.system.chakra?.affinities ?? {};
  const forcedAffinityEntries = Array.isArray(chakraAffinities.forced) ? chakraAffinities.forced : [];
  const getForcedAffinityKey = (entry) => {
    if (!entry) return "";
    if (typeof entry === "object") return String(entry.key ?? entry.id ?? entry.value ?? "");
    return String(entry);
  };
  const forcedAffinities = forcedAffinityEntries.map(getForcedAffinityKey).filter(Boolean);
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
      skillLabel: NARUTO25E.skillDefinitions?.[affinity.skillKey]?.label ?? affinity.skillKey,
      playstyle: affinity.playstyle ?? "",
      strengths: affinity.strengths ?? [],
      weaknesses: affinity.weaknesses ?? [],
      recommendedFor: affinity.recommendedFor ?? [],
      associatedSkills: (affinity.associatedSkills ?? []).map((skillKey) => ({
        key: skillKey,
        label: NARUTO25E.skillDefinitions?.[skillKey]?.label ?? skillKey
      })),
      previewTags: affinity.previewTags ?? []
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

  context.creationValidation = this.actor.getCreationValidationSummary();

  context.isGM = game.user.isGM;
  const creation = this.actor.system.progression?.creation ?? {};

  context.creationState = {
    locked: Boolean(creation.locked),
    label: creation.locked ? "Validée" : "Brouillon",
    validatedAt: creation.validatedAt ?? "",
    validatedBy: creation.validatedBy ?? "",
    canValidate: (this.actor.isOwner || game.user.isGM) && !creation.locked,
    validationValid: Boolean(context.creationValidation?.valid),
    canUnlock: game.user.isGM && creation.locked
  };

  context.permissionsState = {
    canEditLockedCreationFields: this.actor.canUserEditLockedCreationFields(game.user),
    canEditRyo: this.actor.canUserEditRyo(game.user),
    canEditInventoryEconomy: game.user.isGM,
    canEditNindo: this.actor.canUserEditNindo(game.user),
    allowPlayerRyoEdit: Boolean(this.actor.system.inventory?.permissions?.allowPlayerRyoEdit),
    nindoUnlockedByGM: Boolean(this.actor.system.nindo?.unlockedByGM)
  };

    const mode = heritage.mode ?? "clan";

    const mechanicalClanKeys = typeof this.actor._getMechanicalClanKeys === "function"
      ? this.actor._getMechanicalClanKeys({ purpose: "requirements" })
      : [
          heritage.clan,
          heritage.hybrid?.secondaryClan
        ].filter(Boolean);

    const displayedClanKey = typeof this.actor._getSocialClanKey === "function"
      ? this.actor._getSocialClanKey()
      : String(heritage.clan ?? "");

    const hasUchihaLineage = mechanicalClanKeys.includes("uchiha");
    const hasHyugaLineage = mechanicalClanKeys.includes("hyuga");
    const hasSenjuLineage = mechanicalClanKeys.includes("senju");

    const hasMangekyoSharingan = Boolean(gmOptions.hasMangekyoSharingan);
    const hasEternalMangekyoSharingan =
      hasUchihaLineage
      && hasMangekyoSharingan
      && Boolean(gmOptions.hasEternalMangekyoSharingan);

    const hasSenjuCells =
      hasSenjuLineage
      || Boolean(gmOptions.hasSenjuCells);

    const canAwakenRinnegan =
      hasUchihaLineage
      && (hasMangekyoSharingan || hasEternalMangekyoSharingan)
      && hasSenjuCells;

    const hasRinnegan =
      canAwakenRinnegan
      && Boolean(gmOptions.hasRinnegan);

    const hasTenseigan =
      hasHyugaLineage
      && Boolean(gmOptions.hasTenseigan);

    const mangekyo = heritage.uchiha?.mangekyo ?? {};
    const rightEyePower = mangekyo.rightEyePower ?? "";
    const leftEyePower = mangekyo.leftEyePower ?? "";
    const rightEyePlayerValidated = Boolean(mangekyo.rightEyePlayerValidated);
    const leftEyePlayerValidated = Boolean(mangekyo.leftEyePlayerValidated);
    const rightEyeGmValidated = Boolean(mangekyo.rightEyeGmValidated);
    const leftEyeGmValidated = Boolean(mangekyo.leftEyeGmValidated);
    const rightEyeState = mangekyo.rightEyeState ?? "healthy";
    const leftEyeState = mangekyo.leftEyeState ?? "healthy";
    const rightEyeChoicePromptedAtLineage = Number(mangekyo.rightEyeChoicePromptedAtLineage ?? 0);
    const leftEyeChoicePromptedAtLineage = Number(mangekyo.leftEyeChoicePromptedAtLineage ?? 0);
    const mangekyoUses = Number(mangekyo.uses ?? 0);

    const lineageValue = typeof this.actor._getEffectiveLineageValue === "function"
      ? this.actor._getEffectiveLineageValue()
      : Number(this.actor.system.bases?.lign?.value ?? 1);

    const rightEyeMinimumLineage = 6;
    const leftEyeMinimumLineage = 7;
    const rightEyeChoiceUnlocked = lineageValue >= rightEyeMinimumLineage;
    const leftEyeChoiceUnlocked = lineageValue >= leftEyeMinimumLineage;

    const validateUchihaEyePowerForSheet = (powerKey, eyeKey) => {
      if (!powerKey) return { valid: true, reason: "" };

      if (eyeKey === "right" && !rightEyeChoiceUnlocked) {
        return {
          valid: false,
          reason: "L’œil droit du Mangekyō se débloque à Lignée 6."
        };
      }

      if (eyeKey === "left" && !leftEyeChoiceUnlocked) {
        return {
          valid: false,
          reason: "L’œil gauche du Mangekyō se débloque à Lignée 7."
        };
      }

      if (eyeKey === "right" && powerKey === "enton") {
        return {
          valid: false,
          reason: "Enton ne peut pas être choisi sur le premier œil débloqué. Il nécessite Amaterasu sur l’œil droit."
        };
      }

      const validation = NARUTO25E.canSelectUchihaEyePower?.({
        powerKey,
        eyeKey,
        rightEyePower,
        leftEyePower,
        rightEyePlayerValidated
      }) ?? { valid: true, reason: "" };

      return validation;
    };

    const buildUchihaEyePowerOptions = (eyeKey) => {
      const eyeUnlocked = eyeKey === "right" ? rightEyeChoiceUnlocked : leftEyeChoiceUnlocked;

      return Object.entries(NARUTO25E.uchihaEyePowers ?? {}).map(([key, power]) => {
        let validation = validateUchihaEyePowerForSheet(key, eyeKey);

        if (!eyeUnlocked) {
          validation = {
            valid: false,
            reason: eyeKey === "right"
              ? "Disponible à Lignée 6."
              : "Disponible à Lignée 7."
          };
        }

        return {
          key,
          label: power.label,
          selected: eyeKey === "right" ? rightEyePower === key : leftEyePower === key,
          disabled: !validation.valid,
          reason: validation.reason
        };
      });
    };

    const buildUchihaEyeStateOptions = (selectedState) => {
      return Object.entries(NARUTO25E.uchihaEyeStates ?? {}).map(([key, state]) => ({
        key,
        label: state.label,
        selected: selectedState === key
      }));
    };

    const rightEyeValidation = validateUchihaEyePowerForSheet(rightEyePower, "right");
    const leftEyeValidation = validateUchihaEyePowerForSheet(leftEyePower, "left");

    const mangekyoUsageState = NARUTO25E.getMangekyoUsageState?.(
      mangekyoUses,
      hasEternalMangekyoSharingan,
      hasRinnegan
    ) ?? {
      uses: mangekyoUses,
      vigilancePenalty: 0,
      thresholdLabel: "—",
      warning: "",
      shouldSeekEms: false,
      blindThresholdReached: false
    };

    context.heritageState = {
      mode,
      isClanMode: mode === "clan",
      isVoieMode: mode === "voie",
      isHybridClanMode: mode === "hybridClan",
      isHybridVoieMode: mode === "hybridVoie",
      isHiddenClanMode: mode === "hiddenClan",
      canSeeHiddenClan,
      hiddenClan: {
        officialClan: String(hiddenClan.officialClan ?? ""),
        officialClanLabel: officialHiddenClan?.label ?? "—",
        realClan: String(hiddenClan.realClan ?? ""),
        realClanLabel: realHiddenClan?.label ?? "—",
        awareness: hiddenClanAwareness,
        awarenessLabel: hiddenClanState.label,
        awarenessSummary: hiddenClanState.summary,
        unlocked: Boolean(hiddenClan.unlocked),
        effectiveLineageCap: this.actor.system.heritage?.hiddenClan?.effectiveLineageCap ?? null,
        effectiveLineageValue: this.actor.system.heritage?.hiddenClan?.effectiveLineageValue ?? Number(this.actor.system.bases?.lign?.value ?? 0),
        notes: String(hiddenClan.notes ?? "")
      },
      mechanicalClanKeys,
      displayedClanKey,
      isCustomClanMode: NARUTO25E.isCustomClanKey?.(heritage.clan),
      allowHybridClan: Boolean(gmOptions.allowHybridClan),
      allowHybridVoie: Boolean(gmOptions.allowHybridVoie),
      allowCustomClan: Boolean(gmOptions.allowCustomClan),
      uchihaPowerMode: NARUTO25E.getUchihaPowerMode?.() ?? "classic",
      uchihaPowerModeData: NARUTO25E.getUchihaPowerModeData?.(),
      uchihaEyePowers: Object.entries(NARUTO25E.uchihaEyePowers ?? {}).map(([key, power]) => ({
        key,
        label: power.label,
        category: power.category,
        summary: power.summary,
        requirements: power.requirements ?? [],
        eyeNotes: power.eyeNotes ?? "",
        requiresOtherEyePower: power.requiresOtherEyePower ?? "",
        tags: power.tags ?? []
      })),
      hasUchihaLineage,
      hasHyugaLineage,
      hasSenjuLineage,
      hasMangekyoSharingan,
      hasEternalMangekyoSharingan,
      hasSenjuCells,
      hasSenjuCellsByLineage: hasSenjuLineage,
      hasSenjuCellsByImplant: Boolean(gmOptions.hasSenjuCells),
      canAwakenRinnegan,
      hasRinnegan,
      hasTenseigan,
      mangekyo: {
        rightEyePower,
        leftEyePower,
        rightEyePowerLabel: NARUTO25E.getUchihaEyePowerData?.(rightEyePower)?.label ?? "—",
        leftEyePowerLabel: NARUTO25E.getUchihaEyePowerData?.(leftEyePower)?.label ?? "—",
        rightEyePlayerValidated,
        leftEyePlayerValidated,
        rightEyeGmValidated,
        leftEyeGmValidated,
        rightEyeState,
        leftEyeState,
        rightEyeStateLabel: NARUTO25E.getUchihaEyeStateData?.(rightEyeState)?.label ?? "Sain",
        leftEyeStateLabel: NARUTO25E.getUchihaEyeStateData?.(leftEyeState)?.label ?? "Sain",
        rightEyeChoicePromptedAtLineage,
        leftEyeChoicePromptedAtLineage,
        rightEyeMinimumLineage,
        leftEyeMinimumLineage,
        rightEyeChoiceUnlocked,
        leftEyeChoiceUnlocked,
        rightEyePowerOptions: buildUchihaEyePowerOptions("right"),
        leftEyePowerOptions: buildUchihaEyePowerOptions("left"),
        rightEyeStateOptions: buildUchihaEyeStateOptions(rightEyeState),
        leftEyeStateOptions: buildUchihaEyeStateOptions(leftEyeState),
        rightEyeValidation,
        leftEyeValidation,
        leftEyeChoiceLocked: !rightEyePlayerValidated,
        uses: mangekyoUses,
        usageState: mangekyoUsageState,
        canEditRightEye: rightEyeChoiceUnlocked && (!rightEyePlayerValidated || game.user.isGM),
        canEditLeftEye: leftEyeChoiceUnlocked && rightEyePlayerValidated && (!leftEyePlayerValidated || game.user.isGM),
        canValidateRightEyeAsPlayer: rightEyeChoiceUnlocked && Boolean(rightEyePower),
        canValidateLeftEyeAsPlayer: leftEyeChoiceUnlocked && rightEyePlayerValidated && Boolean(leftEyePower)
      },
      clanDisabled: mode === "voie" || mode === "hiddenClan",
      voieDisabled: mode === "clan" || mode === "hybridClan" || mode === "hiddenClan",
      hybridDisabled:
        mode !== "hybridClan" ||
        !gmOptions.allowHybridClan
    };


  const buildClanTrackForSheet = (clanKey, role) => {
    if (!clanKey) return null;

    const clan = NARUTO25E.clans?.[clanKey];
    if (!clan) return null;

    const maxRank = NARUTO25E.getClanLineageCap(clanKey);
    const ranks = [];

    for (let rank = 1; rank <= maxRank; rank++) {
      const features = NARUTO25E.getClanLineageFeatures
        ? NARUTO25E.getClanLineageFeatures(clanKey, rank)
        : [NARUTO25E.getClanLineageFeature?.(clanKey, rank)].filter(Boolean);

      const rankUnlockedByLineage = lineageValue >= rank;
      const requiresMangekyo =
        clanKey === "uchiha"
        && NARUTO25E.requiresMangekyoForUchihaRank?.(rank);

      const requiresTenseigan =
        clanKey === "hyuga"
        && rank === 10;

      const narrativeLocked =
        rankUnlockedByLineage
        && (
          (requiresMangekyo && !hasMangekyoSharingan)
          || (requiresTenseigan && !hasTenseigan)
        );

      const lockReason = requiresTenseigan
        ? "Rang atteint par la Base Lignée, mais le Tenseigan reste verrouillé tant que le MJ ne valide pas l’éveil."
        : "Rang atteint par la Base Lignée, mais capacité verrouillée tant que le Mangekyō Sharingan n’est pas validé par le MJ.";

      ranks.push({
        rank,
        unlocked: rankUnlockedByLineage && !narrativeLocked,
        unlockedByLineage: rankUnlockedByLineage,
        narrativeLocked,
        requiresMangekyo,
        requiresTenseigan,
        lockReason,
        current: lineageValue === rank,
        label: `Rang ${rank}`,
        features,
        hasFeatures: features.length > 0,
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
    const primaryTrack = buildClanTrackForSheet(heritage.clan, "Clan principal");

    if (primaryTrack) context.lineageTracks.push(primaryTrack);
  }

  if (heritage.mode === "hiddenClan") {
    const officialTrack = buildClanTrackForSheet(hiddenClan.officialClan, "Clan officiel");
    const realTrack = buildClanTrackForSheet(hiddenClan.realClan, "Réel Clan");

    if (officialTrack && canSeeHiddenClan) {
      officialTrack.isSocialOnly = true;
      officialTrack.note = "Clan officiel/social : affiché sur la fiche, sans impact mécanique par défaut.";
      context.lineageTracks.push(officialTrack);
    }

    if (realTrack && canSeeHiddenClan) {
      realTrack.isHiddenRealClan = true;
      realTrack.note = hiddenClanState.summary;
      context.lineageTracks.push(realTrack);
    }

    if (officialTrack && !canSeeHiddenClan) {
      officialTrack.isSocialOnly = true;
      officialTrack.note = "Clan officiel/social.";
      context.lineageTracks.push(officialTrack);
    }
  }

  context.heritageMandatorySkills = [];

  const addMandatorySkillDisplay = (clanKey, sourceLabel) => {
    if (!clanKey) return;

    const clan = NARUTO25E.clans?.[clanKey];
    if (!clan) return;

    const skillKeys = NARUTO25E.getClanMandatorySkills
      ? NARUTO25E.getClanMandatorySkills(clanKey)
      : [NARUTO25E.getClanMandatorySkill?.(clanKey)].filter(Boolean);

    for (const skillKey of skillKeys) {
      if (!skillKey) continue;

      const skillDefinition = NARUTO25E.skillDefinitions?.[skillKey];
      if (!skillDefinition) continue;

      const alreadyDisplayed = context.heritageMandatorySkills.some((entry) => {
        return entry.clanKey === clanKey && entry.skillKey === skillKey && entry.sourceLabel === sourceLabel;
      });

      if (alreadyDisplayed) continue;

      context.heritageMandatorySkills.push({
        clanKey,
        clanLabel: clan.label,
        skillKey,
        skillLabel: skillDefinition.label,
        sourceLabel
      });
    }
  };

  if (
    (heritage.mode === "clan" || heritage.mode === "hybridClan" || heritage.mode === "hybridVoie")
    && !NARUTO25E.isCustomClanKey?.(heritage.clan)
  ) {
    addMandatorySkillDisplay(heritage.clan, "Clan principal");
  }

  if (heritage.mode === "hybridClan") {
    addMandatorySkillDisplay(heritage.hybrid?.secondaryClan, "Clan secondaire");
  }

  if (heritage.mode === "hiddenClan" && canSeeHiddenClan) {
    addMandatorySkillDisplay(hiddenClan.realClan, "Réel Clan");
  }

  if (NARUTO25E.isCustomClanKey?.(heritage.clan)) {
    const custom = heritage.customClan ?? {};
    const customName = String(custom.name ?? "").trim() || "Clan custom";
    const customChoices = NARUTO25E.getCustomClanMandatoryChoices?.(custom) ?? [];

    for (const choiceKey of customChoices) {
      const choice = NARUTO25E.getCustomClanChoiceData?.(choiceKey);
      if (!choice?.valid || choice.type !== "skill") continue;

      context.heritageMandatorySkills.push({
        clanKey: "custom",
        clanLabel: customName,
        skillKey: choice.key,
        skillLabel: choice.label,
        sourceLabel: "Clan custom"
      });
    }
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
    items: inventoryItems
      .filter((item) => item.type === type)
      .map((item) => ({
        ...item,
        carryOptions: typeof this.actor._getInventoryCarryStateOptions === "function"
          ? this.actor._getInventoryCarryStateOptions(item)
          : []
      }))
  }));

  context.equippedWeapons = inventoryItems.filter((item) => item.type === "weapon" && item.equipped);
  context.equippedArmors = inventoryItems.filter((item) => item.type === "armor" && item.equipped);

  const nindo = this.actor.system.nindo ?? {};
  const presetKey = nindo.preset ?? "";
  const preset = NARUTO25E.nindoPresets?.[presetKey];

  context.nindoChoiceModes = Object.entries(NARUTO25E.nindoChoiceModes ?? {}).map(([key, label]) => ({
    key,
    label,
    selected: key === (nindo.choiceMode ?? "preset")
  }));

  context.nindoPresets = Object.entries(NARUTO25E.nindoPresets ?? {}).map(([key, data]) => ({
    key,
    label: data.label,
    description: data.description,
    selected: key === presetKey
  }));

  context.nindoDisplay = {
    mode: nindo.choiceMode ?? "preset",
    name: nindo.choiceMode === "custom"
      ? (nindo.custom?.name || "Nindō personnalisé")
      : (preset?.label || "Aucun Nindō choisi"),
    description: nindo.choiceMode === "custom"
      ? (nindo.custom?.description || "")
      : (preset?.description || "")
  };

  context.nindoActions = Object.entries(NARUTO25E.nindoActions ?? {}).map(([key, action]) => ({
    key,
    label: action.label,
    cost: action.cost,
    variableCost: Boolean(action.variableCost),
    temporalite: action.temporalite,
    description: action.description,
    canUse: true
  }));

  context.nindoChargeUses = Object.entries(NARUTO25E.nindoChargeUses ?? {}).map(([key, label]) => ({
    key,
    label
  }));
    return context;
  }

  async _onKikaichuAllocate(event) {
    event.preventDefault();

    const button = event.currentTarget;
    const amount = Number(button.dataset.amount ?? 0);

    if (!amount) return;

    const actor = this.actor;
    const system = actor.system;

    const reserve = system.resources?.kikaichu;
    const chakra = system.resources?.chakra;

    if (!reserve?.enabled) {
      ui.notifications.warn("Ce personnage ne possède pas de réserve Kikaichū.");
      return;
    }

    const currentAllocated = Number(reserve.allocated ?? 0);
    const currentReserveValue = Number(reserve.value ?? 0);
    const reserveMax = Number(reserve.max ?? 0);

    const currentChakra = Number(chakra?.value ?? 0);
    const chakraMax = Number(chakra?.max ?? 0);

    let newAllocated = currentAllocated;
    let newReserveValue = currentReserveValue;
    let newChakraValue = currentChakra;

    if (amount > 0) {
      const realAmount = Math.min(
        amount,
        reserveMax - currentAllocated,
        currentChakra
      );

      if (realAmount <= 0) {
        ui.notifications.warn("Pas assez de chakra disponible à transférer vers la réserve Kikaichū.");
        return;
      }

      newAllocated += realAmount;
      newReserveValue += realAmount;
      newChakraValue -= realAmount;
    }

    if (amount < 0) {
      const realAmount = Math.min(
        Math.abs(amount),
        currentAllocated
      );

      if (realAmount <= 0) {
        ui.notifications.warn("La réserve Kikaichū est déjà vide.");
        return;
      }

      newAllocated -= realAmount;
      newReserveValue = Math.max(0, newReserveValue - realAmount);

      // On rend le chakra au pool principal.
      // Le max sera recalculé après diminution de la réserve.
      newChakraValue = Math.min(
        chakraMax + realAmount,
        currentChakra + realAmount
      );
    }

    await actor.update({
      "system.resources.kikaichu.allocated": newAllocated,
      "system.resources.kikaichu.value": newReserveValue,
      "system.resources.chakra.value": newChakraValue
    });
  }

  async _onDrop(event) {
    const data = TextEditor.getDragEventData(event);

    if (data?.type !== "Item") {
      return super._onDrop(event);
    }

    const item = await Item.implementation.fromDropData(data);

    if (!item) {
      ui.notifications.warn("Impossible de lire l’objet déposé.");
      return false;
    }

    if (item.type === "pouvoirLignee") {
      const itemData = item.toObject();
      delete itemData._id;

      await this.actor.createEmbeddedDocuments("Item", [itemData]);

      ui.notifications.info(`${item.name} ajouté aux pouvoirs de lignée de ${this.actor.name}.`);
      return false;
    }

    if (item.type === "technique") {
      const existing = this.actor.items.find((actorItem) => {
        return actorItem.type === "technique" && actorItem.name === item.name;
      });

      if (existing) {
        ui.notifications.warn(`${this.actor.name} possède déjà la technique ${item.name}.`);
        return false;
      }

      const itemData = item.toObject();
      delete itemData._id;

      await this.actor.createEmbeddedDocuments("Item", [itemData]);

      ui.notifications.info(`${item.name} ajoutée aux techniques de ${this.actor.name}.`);
      return false;
    }

    const allowedTypes = ["arme", "armure", "equipement", "consommable"];

    if (!allowedTypes.includes(item.type)) {
      ui.notifications.warn("Cet Item ne peut pas être ajouté à l’inventaire.");
      return false;
    }

    await this.actor.addInventoryItemFromDocument(item);

    return false;
  }

  activateListeners(html) {
  super.activateListeners(html);

  this._maybeOpenShinobimancerChoice();

  window.setTimeout(() => {
    this._maybePromptUchihaMangekyoEyeChoice();
  }, 250);

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
    updateData["system.heritage.hybrid.secondaryClan"] = "";
  }

  if (mode === "hiddenClan") {
    updateData["system.heritage.clan"] = "";
    updateData["system.heritage.voie"] = "";
    updateData["system.heritage.hybrid.secondaryClan"] = "";
    updateData["system.heritage.hybrid.reason"] = "";
  }

  await this.actor.update(updateData);
});

  html.find(".hidden-clan-field").on("change", async (event) => {
    event.preventDefault();

    if (!this.actor.isOwner && !game.user?.isGM) {
      ui.notifications.warn("Tu n’as pas les droits nécessaires pour modifier cette lignée cachée.");
      this.render(false);
      return;
    }

    const field = event.currentTarget.dataset.field;
    if (!field) return;

    const value = event.currentTarget.type === "checkbox"
      ? event.currentTarget.checked
      : event.currentTarget.value;

    await this.actor.update({
      [`system.heritage.hiddenClan.${field}`]: value
    });

    if (game.user?.isGM && typeof this.actor.syncLineagePowersFromHeritage === "function") {
      await this.actor.syncLineagePowersFromHeritage({ notify: false });
    }

    this.render(false);
  });

  html.find(".uchiha-eye-power-choice").on("change", async (event) => {
    event.preventDefault();

    const eye = event.currentTarget.dataset.eye;
    const powerKey = event.currentTarget.value;
    const heritage = this.actor.system.heritage ?? {};
    const mangekyo = heritage.uchiha?.mangekyo ?? {};

    const rightEyePower = eye === "right" ? powerKey : mangekyo.rightEyePower ?? "";
    const leftEyePower = eye === "left" ? powerKey : mangekyo.leftEyePower ?? "";
    const rightEyePlayerValidated = Boolean(mangekyo.rightEyePlayerValidated);

    const lineageValue = this._getUchihaSheetEffectiveLineageValue();

    if (!this._isUchihaSheetEyeChoiceUnlocked(eye, lineageValue)) {
      ui.notifications.warn(
        eye === "right"
          ? "L’œil droit du Mangekyō se débloque à Lignée 6."
          : "L’œil gauche du Mangekyō se débloque à Lignée 7."
      );
      return;
    }

    if (eye === "right" && powerKey === "enton") {
      ui.notifications.warn("Enton ne peut pas être choisi sur le premier œil débloqué.");
      return;
    }

    const validation = NARUTO25E.canSelectUchihaEyePower?.({
      powerKey,
      eyeKey: eye,
      rightEyePower,
      leftEyePower,
      rightEyePlayerValidated
    }) ?? { valid: true, reason: "" };

    if (!validation.valid) {
      ui.notifications.warn(validation.reason);
      this.render(false);
      return;
    }

    const updateData = {
      [`system.heritage.uchiha.mangekyo.${eye}EyePower`]: powerKey,
      [`system.heritage.uchiha.mangekyo.${eye}EyePlayerValidated`]: false,
      [`system.heritage.uchiha.mangekyo.${eye}EyeGmValidated`]: false
    };

    if (eye === "right") {
      updateData["system.heritage.uchiha.mangekyo.leftEyePlayerValidated"] = false;
      updateData["system.heritage.uchiha.mangekyo.leftEyeGmValidated"] = false;
    }

    await this.actor.update(updateData);
  });

  html.find(".uchiha-eye-player-validate").on("click", async (event) => {
    event.preventDefault();

    const eye = event.currentTarget.dataset.eye;
    const heritage = this.actor.system.heritage ?? {};
    const mangekyo = heritage.uchiha?.mangekyo ?? {};

    const rightEyePower = mangekyo.rightEyePower ?? "";
    const leftEyePower = mangekyo.leftEyePower ?? "";
    const powerKey = eye === "right" ? rightEyePower : leftEyePower;
    const rightEyePlayerValidated = Boolean(mangekyo.rightEyePlayerValidated);

    if (!powerKey) {
      ui.notifications.warn("Choisis d’abord un pouvoir pour cet œil.");
      return;
    }

    const validation = NARUTO25E.canSelectUchihaEyePower?.({
      powerKey,
      eyeKey: eye,
      rightEyePower,
      leftEyePower,
      rightEyePlayerValidated
    }) ?? { valid: true, reason: "" };

    if (!validation.valid) {
      ui.notifications.warn(validation.reason);
      return;
    }

    await this.actor.update({
      [`system.heritage.uchiha.mangekyo.${eye}EyePlayerValidated`]: true,
      [`system.heritage.uchiha.mangekyo.${eye}EyeGmValidated`]: false
    });

    ui.notifications.info(`Choix de l’œil ${eye === "right" ? "droit" : "gauche"} confirmé côté joueur.`);
  });

  html.find(".uchiha-eye-gm-validate").on("change", async (event) => {
    event.preventDefault();

    if (!game.user.isGM) {
      ui.notifications.warn("Seul le MJ peut valider ce choix.");
      event.currentTarget.checked = false;
      return;
    }

    const eye = event.currentTarget.dataset.eye;
    const checked = event.currentTarget.checked;
    const heritage = this.actor.system.heritage ?? {};
    const mangekyo = heritage.uchiha?.mangekyo ?? {};
    const playerValidated = Boolean(mangekyo[`${eye}EyePlayerValidated`]);

    const lineageValue = this._getUchihaSheetEffectiveLineageValue();

    if (checked && !this._isUchihaSheetEyeChoiceUnlocked(eye, lineageValue)) {
      ui.notifications.warn(
        eye === "right"
          ? "L’œil droit du Mangekyō se débloque à Lignée 6."
          : "L’œil gauche du Mangekyō se débloque à Lignée 7."
      );
      event.currentTarget.checked = false;
      return;
    }

    if (checked && !playerValidated) {
      ui.notifications.warn("Le joueur doit d’abord confirmer ce choix.");
      event.currentTarget.checked = false;
      return;
    }

    await this.actor.update({
      [`system.heritage.uchiha.mangekyo.${eye}EyeGmValidated`]: checked
    });
  });

  html.find(".uchiha-eye-reset").on("click", async (event) => {
    event.preventDefault();

    if (!game.user.isGM) {
      ui.notifications.warn("Seul le MJ peut annuler une validation de pouvoir oculaire.");
      return;
    }

    const eye = event.currentTarget.dataset.eye;

    await this.actor.update({
      [`system.heritage.uchiha.mangekyo.${eye}EyePlayerValidated`]: false,
      [`system.heritage.uchiha.mangekyo.${eye}EyeGmValidated`]: false
    });

    ui.notifications.info(`Validation de l’œil ${eye === "right" ? "droit" : "gauche"} annulée.`);
  });

  html.find(".uchiha-eye-state").on("change", async (event) => {
    event.preventDefault();

    if (!game.user.isGM) {
      ui.notifications.warn("Seul le MJ peut modifier l’état d’un œil.");
      this.render(false);
      return;
    }

    const eye = event.currentTarget.dataset.eye;
    const state = event.currentTarget.value;

    await this.actor.update({
      [`system.heritage.uchiha.mangekyo.${eye}EyeState`]: state
    });
  });

  html.find(".mangekyo-uses-adjust").on("click", async (event) => {
    event.preventDefault();

    const delta = Number(event.currentTarget.dataset.delta ?? 0);
    const current = Number(this.actor.system.heritage?.uchiha?.mangekyo?.uses ?? 0);
    const next = Math.max(0, Math.min(50, current + delta));

    await this.actor.update({
      "system.heritage.uchiha.mangekyo.uses": next
    });
  });

  html.find(".heritage-gm-option").on("change", async (event) => {
    event.preventDefault();

    if (!game.user.isGM) return;

    const field = event.currentTarget.dataset.field;
    const checked = event.currentTarget.checked;
    const heritage = this.actor.system.heritage ?? {};
    const gmOptions = heritage.gmOptions ?? {};

    const clanKeys = typeof this.actor._getMechanicalClanKeys === "function"
      ? this.actor._getMechanicalClanKeys({ includeDormantHiddenClan: true })
      : [
          heritage.clan,
          heritage.hybrid?.secondaryClan
        ].filter(Boolean);

    const hasUchihaLineage = clanKeys.includes("uchiha");
    const hasHyugaLineage = clanKeys.includes("hyuga");
    const hasSenjuLineage = clanKeys.includes("senju");

    const effectiveMangekyo =
      field === "hasMangekyoSharingan"
        ? checked
        : Boolean(gmOptions.hasMangekyoSharingan);

    const effectiveEternalMangekyo =
      field === "hasEternalMangekyoSharingan"
        ? checked
        : Boolean(gmOptions.hasEternalMangekyoSharingan);

    const effectiveSenjuCells =
      hasSenjuLineage
      || (
        field === "hasSenjuCells"
          ? checked
          : Boolean(gmOptions.hasSenjuCells)
      );

    const canAwakenRinnegan =
      hasUchihaLineage
      && (effectiveMangekyo || effectiveEternalMangekyo)
      && effectiveSenjuCells;

    if (
      checked
      && ["hasMangekyoSharingan", "hasEternalMangekyoSharingan", "hasRinnegan"].includes(field)
      && !hasUchihaLineage
    ) {
      ui.notifications.warn("Cette option est réservée aux personnages ayant une lignée Uchiha.");
      event.currentTarget.checked = false;
      return;
    }

    if (checked && field === "hasTenseigan" && !hasHyugaLineage) {
      ui.notifications.warn("Le Tenseigan est réservé aux personnages ayant une lignée Hyūga.");
      event.currentTarget.checked = false;
      return;
    }

    if (checked && field === "hasEternalMangekyoSharingan" && !effectiveMangekyo) {
      ui.notifications.warn("Le Mangekyō Sharingan Éternel nécessite d’abord le Mangekyō Sharingan.");
      event.currentTarget.checked = false;
      return;
    }

    if (checked && field === "hasRinnegan" && !canAwakenRinnegan) {
      ui.notifications.warn("Le Rinnegan nécessite une lignée Uchiha, le Mangekyō Sharingan ou EMS, et des cellules Senju.");
      event.currentTarget.checked = false;
      return;
    }

    const updateData = {
      [`system.heritage.gmOptions.${field}`]: checked
    };

    const currentMode = heritage.mode;

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

    if (field === "allowCustomClan" && !checked && heritage.clan === NARUTO25E.customClanKey) {
      updateData["system.heritage.clan"] = "";
      updateData["system.heritage.customClan.name"] = "";
      updateData["system.heritage.customClan.summary"] = "";
      updateData["system.heritage.customClan.mandatoryChoices"] = ["", ""];
      updateData["system.heritage.customClan.notes"] = "";
    }

    if (field === "hasMangekyoSharingan" && !checked) {
      updateData["system.heritage.gmOptions.hasEternalMangekyoSharingan"] = false;
      updateData["system.heritage.gmOptions.hasRinnegan"] = false;
    }

    if (field === "hasEternalMangekyoSharingan" && !checked && !effectiveMangekyo) {
      updateData["system.heritage.gmOptions.hasRinnegan"] = false;
    }

    if (field === "hasSenjuCells" && !checked && !hasSenjuLineage) {
      updateData["system.heritage.gmOptions.hasRinnegan"] = false;
    }

    await this.actor.update(updateData);

    const shouldSyncLineagePowers = [
      "hasMangekyoSharingan",
      "hasEternalMangekyoSharingan",
      "hasRinnegan",
      "hasTenseigan",
      "hasSenjuCells"
    ].includes(field);

    if (shouldSyncLineagePowers && typeof this.actor.syncLineagePowersFromHeritage === "function") {
      await this.actor.syncLineagePowersFromHeritage({ notify: false });
    }

    this.render(false);
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

  html.find(".combat-calculate-wounds").on("click", async (event) => {
    event.preventDefault();

    await this.actor.calculateWoundFromCombatForm();
  });

  html.find(".lineage-power-toggle").on("click", async (event) => {
    event.preventDefault();

    const itemId = event.currentTarget.dataset.itemId;
    const item = this.actor.items.get(itemId);

    if (!item) {
      ui.notifications.warn("Pouvoir de lignée introuvable.");
      return;
    }

    await item.toggleLineagePower();
  });

  html.find(".lineage-power-upkeep-check").on("click", async (event) => {
    event.preventDefault();

    await this.actor.applyMaintainedLineagePowerUpkeep({ forceDialog: true });
  });

  html.find(".technique-use").on("click", async (event) => {
    event.preventDefault();

    const itemId = event.currentTarget.dataset.itemId;
    const item = this.actor.items.get(itemId);

    if (!item || item.type !== "technique") {
      ui.notifications.warn("Technique introuvable.");
      return;
    }

    await item.rollTechnique(this.actor);
    this.render(false);
  });

  html.find(".technique-stop-maintained").on("click", async (event) => {
    event.preventDefault();

    const itemId = event.currentTarget.dataset.itemId;

    await this.actor.deactivateLineagePower(itemId);
    this.render(false);
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

  html.find(".inventory-carry-state").on("change", async (event) => {
    event.preventDefault();

    const itemId = event.currentTarget.dataset.itemId;
    const carryState = event.currentTarget.value;

    await this.actor.setInventoryItemCarryState(itemId, carryState);
  });

    html.find(".inventory-use-consumable").on("click", async (event) => {
    event.preventDefault();
    const itemId = event.currentTarget.dataset.itemId;
    await this.actor.useInventoryConsumable(itemId);
  });

  html.find(".inventory-use-charge").on("click", async (event) => {
    event.preventDefault();
    const itemId = event.currentTarget.dataset.itemId;
    await this.actor.useInventoryItemCharge(itemId);
    this.render(false);
  });

  html.find(".toxicity-reset").on("click", async (event) => {
    event.preventDefault();

    const period = event.currentTarget.dataset.toxicityReset ?? "all";

    await this.actor.resetConsumableToxicity(period);
  });

  html.find(".inventory-item-field").on("change", async (event) => {
    event.preventDefault();

    const input = event.currentTarget;
    const itemId = input.dataset.itemId;
    const field = input.dataset.field;

    if (!itemId || !field) return;

    if (["value", "weight"].includes(field) && !game.user.isGM) {
      ui.notifications.warn("Seul le MJ peut modifier la valeur ou le poids d’un objet.");
      this.render(false);
      return;
    }

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

  html.find(".nindo-action-use").on("click", async (event) => {
    event.preventDefault();

    const actionKey = event.currentTarget.dataset.action;
    await this.actor.useNindoAction(actionKey);
  });

  html.find(".nindo-charge-spend").on("click", async (event) => {
    event.preventDefault();

    await this.actor.spendNindoCharge();
  });

  html.find(".kikaichu-allocate").on("click", this._onKikaichuAllocate.bind(this));
  }
}