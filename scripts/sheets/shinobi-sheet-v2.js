import { NARUTO25E } from "../config.js";
import { Naruto25eShinobiSheet } from "./shinobi-sheet.js";

const NARUTO25E_V2_CHAKRA_ICON_PATHS = {
  katon: "systems/naruto-25e/assets/chakra/katon.webp",
  suiton: "systems/naruto-25e/assets/chakra/suiton.webp",
  doton: "systems/naruto-25e/assets/chakra/doton.webp",
  raiton: "systems/naruto-25e/assets/chakra/raiton.webp",
  futon: "systems/naruto-25e/assets/chakra/futon.webp",
  iryo: "systems/naruto-25e/assets/chakra/iryo.webp",
  taijutsu: "systems/naruto-25e/assets/chakra/taijutsu.webp",
  armes: "systems/naruto-25e/assets/chakra/armes.webp"
};

const NARUTO25E_V2_VILLAGE_ICON_PATHS = {
  konoha: "systems/naruto-25e/assets/village/konoha.webp",
  konoha_nukenin: "systems/naruto-25e/assets/village/konoha_nukenin.webp",
  kiri: "systems/naruto-25e/assets/village/kiri.webp",
  kiri_nukenin: "systems/naruto-25e/assets/village/kiri_nukenin.webp",
  suna: "systems/naruto-25e/assets/village/suna.webp",
  suna_nukenin: "systems/naruto-25e/assets/village/suna_nukenin.webp"
};

export class Naruto25eShinobiSheetV2 extends Naruto25eShinobiSheet {
  static get defaultOptions() {
    return foundry.utils.mergeObject(super.defaultOptions, {
      classes: ["naruto-25e", "sheet", "actor", "shinobi", "shinobi-v2"],
      template: "systems/naruto-25e/templates/actor/shinobi-sheet-v2.hbs",
      width: 1080,
      height: 780,
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
    return `${this.actor.name} — Shinobi V2`;
  }

  async getData(options = {}) {
    const context = await super.getData(options);

    context.v2 = this._buildV2Context(context);

    return context;
  }

  _buildV2Context(context = {}) {
    const system = this.actor.system ?? {};
    const identity = system.identity ?? {};
    const heritage = system.heritage ?? {};
    const resources = system.resources ?? {};
    const combat = system.combat ?? {};
    const combatActions = combat.actions ?? {};
    const progression = system.progression ?? {};
    const canSeePrivateLineage = Boolean(this.actor.isOwner || game.user?.isGM);

    const identityContext = this._buildV2IdentityContext(
      context,
      identity,
      heritage,
      progression,
      canSeePrivateLineage
    );

    return {
      canSeePrivateLineage,
      identity: identityContext,
      resources: this._buildV2ResourceContext(context, resources, combatActions),
      health: this._buildV2HealthContext(context),
      summary: this._buildV2SummaryContext(context, identityContext),
      character: this._buildV2CharacterContext(identity),
      creation: this._buildV2CreationContext(context, progression),
      combat: this._buildV2CombatContext(context, combat),
      techniques: this._buildV2TechniqueContext(context),
      inventory: this._buildV2InventoryContext(context),
      lineage: this._buildV2LineageContext(context, heritage, identityContext, canSeePrivateLineage),
      progression: this._buildV2ProgressionContext(context),
      tabs: this._buildV2TabsContext()
    };
  }

  _buildV2IdentityContext(context, identity, heritage, progression, canSeePrivateLineage) {
    const villageKey = String(heritage.village || identity.village || "");
    const villageStatusKey = String(heritage.villageStatus || "loyal");
    const villageLabel = NARUTO25E.villages?.[villageKey]?.label ?? villageKey;
    const statusLabel = NARUTO25E.villageStatuses?.[villageStatusKey] ?? villageStatusKey;
    const villageIcon = this._getV2VillageIcon(villageKey, villageStatusKey);

    const heritageMode = typeof this.actor._getNormalizedHeritageMode === "function"
      ? this.actor._getNormalizedHeritageMode(heritage)
      : String(heritage.mode ?? "clan");

    const publicHeritageModeLabel = canSeePrivateLineage
      ? NARUTO25E.heritageModes?.[heritageMode] ?? "Clan"
      : heritageMode === "voie"
        ? "Voie"
        : "Clan";

    const publicHeritageLabel = this._getV2PublicHeritageLabel(heritage, heritageMode);

    const rankLabel = context.rankProgression?.currentLabel
      ?? NARUTO25E.ranks?.[progression.rank?.current]?.label
      ?? progression.rank?.current
      ?? identity.rang
      ?? "—";

    return {
      name: this.actor.name,
      img: this.actor.img,
      nickname: identity.prenom || "—",
      age: identity.age || "—",
      birth: identity.birth || "—",
      sex: identity.sex || "—",
      height: identity.height || "—",
      weight: identity.weight || "—",
      hair: identity.hair || "—",
      eyes: identity.eyes || "—",
      sensei: identity.sensei || "—",
      team: identity.team || "—",
      nindo: this._getV2NindoShort(identity),
      rankLabel,
      villageKey,
      villageLabel,
      villageStatusKey,
      statusLabel,
      villageIcon,
      publicHeritageLabel,
      publicHeritageModeLabel,
      chakraIcons: this._getV2ChakraIcons()
    };
  }

  _buildV2ResourceContext(context, resources, combatActions) {
    const chakraValue = Math.max(0, Number(resources.chakra?.value ?? 0));
    const chakraMax = Math.max(0, Number(resources.chakra?.max ?? 0));
    const chakraPercent = chakraMax > 0
      ? Math.max(0, Math.min(100, Math.round((chakraValue / chakraMax) * 100)))
      : 0;

    const initiative = Number(this.actor.system?.combat?.initiative?.total ?? 0);

    return {
      chakra: {
        value: chakraValue,
        max: chakraMax,
        percent: chakraPercent,
        passiveRegen: Number(resources.chakra?.passiveRegen ?? 0),
        activeRegen: Number(resources.chakra?.activeRegen ?? 0)
      },
      vigor: Number(resources.vigueur?.value ?? 0),
      character: Number(resources.caractere?.value ?? 0),
      initiative,
      actions: {
        simple: Boolean(combatActions.simpleAvailable),
        complex: Boolean(combatActions.complexAvailable),
        delayed: Boolean(combatActions.delayedAvailable),
        label: this._getV2ActionSummary(combatActions)
      }
    };
  }

  _buildV2HealthContext(context) {
    const track = context.combatHealthTrack ?? this.actor.getHealthTrackSummary?.() ?? {
      value: 0,
      max: 0,
      segments: []
    };

    const percent = track.max > 0
      ? Math.max(0, Math.min(100, Math.round((track.value / track.max) * 100)))
      : 0;

    return {
      track,
      percent,
      effective: context.effectiveHealthState ?? this.actor.getEffectiveHealthStateSummary?.() ?? {
        label: "Pleine forme",
        source: "—",
        hasPenalty: false
      },
      stateLabel: context.combatSummary?.effectiveStateLabel ?? "Pleine forme",
      stateSource: context.combatSummary?.effectiveStateSource ?? "—"
    };
  }

  _buildV2SummaryContext(context, identityContext) {
    const techniqueGroups = Array.isArray(context.techniqueGroups)
      ? context.techniqueGroups
      : [];

    const visibleTechniqueGroups = techniqueGroups
      .map((group) => {
        const techniques = Array.isArray(group.techniques) ? group.techniques : [];

        return {
          key: group.key,
          label: group.label,
          count: techniques.length,
          techniques: techniques.slice(0, 4)
        };
      })
      .filter((group) => group.count > 0);

    const techniqueTotal = visibleTechniqueGroups.reduce((total, group) => {
      return total + group.count;
    }, 0);

    const lineagePowers = Array.isArray(context.lineagePowerItems)
      ? context.lineagePowerItems
      : [];

    const activeLineagePowers = lineagePowers.filter((power) => Boolean(power.active));

    return {
      identity: identityContext,
      creationState: context.creationState ?? {},
      creationValidation: context.creationValidation ?? {},
      equippedWeapons: Array.isArray(context.equippedWeapons) ? context.equippedWeapons : [],
      equippedArmors: Array.isArray(context.equippedArmors) ? context.equippedArmors : [],
      techniqueGroups: visibleTechniqueGroups,
      techniqueTotal,
      lineagePowerItems: lineagePowers,
      activeLineagePowers,
      hasTechniqueItems: techniqueTotal > 0,
      hasLineagePowerItems: lineagePowers.length > 0,
      hasActiveLineagePowers: activeLineagePowers.length > 0
    };
  }

  _buildV2CharacterContext(identity) {
    return {
      age: identity.age || "",
      birth: identity.birth || "",
      sex: identity.sex || "",
      height: identity.height || "",
      weight: identity.weight || "",
      hair: identity.hair || "",
      eyes: identity.eyes || "",
      sensei: identity.sensei || "",
      team: identity.team || "",
      loyalty: identity.loyalty || "",
      doctrine: identity.doctrine || "",
      dailyLife: identity.dailyLife || "",
      religion: identity.religion || "",
      prejudices: identity.prejudices || "",
      notes: identity.notes || "",
      hasPhysicalDetails: Boolean(
        identity.age
        || identity.birth
        || identity.sex
        || identity.height
        || identity.weight
        || identity.hair
        || identity.eyes
      ),
      hasSocialDetails: Boolean(
        identity.sensei
        || identity.team
        || identity.loyalty
        || identity.doctrine
        || identity.dailyLife
        || identity.religion
        || identity.prejudices
      )
    };
  }

  _buildV2CreationContext(context, progression) {
    const creationState = context.creationState ?? {};
    const creationValidation = context.creationValidation ?? {};
    const creation = progression.creation ?? {};
    const experience = progression.experience ?? {};
    const rank = progression.rank ?? {};

    return {
      state: creationState,
      validation: creationValidation,
      locked: Boolean(creation.locked),
      mode: creation.mode || "—",
      currentStep: creation.currentStep || "—",
      validatedAt: creation.validatedAt || "",
      validatedBy: creation.validatedBy || "",
      notes: creation.notes || "",
      xpTotal: Number(experience.total ?? 0),
      xpSpent: Number(experience.spent ?? 0),
      xpAvailable: Number(experience.available ?? 0),
      rankCurrent: rank.current || "—",
      lastPromotion: rank.lastPromotion || "",
      promotionNotes: rank.promotionNotes || ""
    };
  }

  _buildV2CombatContext(context, combat) {
    const attacks = combat.attacks ?? {};
    const damage = combat.damage ?? {};
    const interceptions = combat.interceptions ?? {};
    const counters = combat.counters ?? {};
    const health = combat.health ?? {};
    const inventoryItems = Array.isArray(this.actor.system?.inventory?.items)
      ? this.actor.system.inventory.items
      : [];

    const equippedWeapons = inventoryItems
      .filter((item) => item.type === "weapon" && item.equipped)
      .map((item) => this._buildV2CombatItemContext(item));

    const combatItems = inventoryItems
      .filter((item) => Boolean(item.hasCombatUse))
      .map((item) => this._buildV2CombatItemContext(item));

    return {
      quickSkillOptions: Array.isArray(context.combatSkillOptions) ? context.combatSkillOptions : [],
      attacks: {
        arm: {
          total: Number(attacks.arm?.total ?? 0),
          bonus: Number(attacks.arm?.bonus ?? 0),
          skill: attacks.arm?.skill ?? "armesSimples",
          skillLabel: NARUTO25E.skillDefinitions?.[attacks.arm?.skill]?.label ?? "Armes Simples",
          damageTotal: Number(damage.arm?.total ?? 0),
          damageBonus: Number(damage.arm?.bonus ?? 0),
          weaponBonus: Number(damage.arm?.weaponBonus ?? 0)
        },
        tai: {
          total: Number(attacks.tai?.total ?? 0),
          bonus: Number(attacks.tai?.bonus ?? 0),
          skill: attacks.tai?.skill ?? "corpsACorps",
          skillLabel: NARUTO25E.skillDefinitions?.[attacks.tai?.skill]?.label ?? "Corps à Corps",
          damageTotal: Number(damage.tai?.total ?? 0),
          damageBonus: Number(damage.tai?.bonus ?? 0)
        }
      },
      taijutsuStyles: this._getV2TaijutsuStyleSummaries(),
      equippedWeapons,
      combatItems,
      hasEquippedWeapons: equippedWeapons.length > 0,
      hasCombatItems: combatItems.length > 0,
      counters: {
        interceptionsArm: counters.interceptions?.arm ?? { remaining: 0, max: 0 },
        interceptionsTai: counters.interceptions?.tai ?? { remaining: 0, max: 0 },
        esquive: counters.defenses?.esquive ?? { remaining: 0, max: 0 },
        parade: counters.defenses?.parade ?? { remaining: 0, max: 0 },
        lineagePowers: counters.lineagePowers ?? {
          base: 0,
          bonus: 0,
          max: 0,
          remaining: 0,
          usedThisTurn: false
        }
      },
      interceptions: {
        arm: {
          total: Number(interceptions.arm?.total ?? interceptions.arm?.rollTotal ?? 0),
          bonus: Number(interceptions.arm?.bonus ?? 0)
        },
        tai: {
          total: Number(interceptions.tai?.total ?? interceptions.tai?.rollTotal ?? 0),
          bonus: Number(interceptions.tai?.bonus ?? 0)
        }
      },
      health: {
        manualState: health.manualState ?? "none",
        conditions: health.conditions ?? "",
        aggravations: health.aggravations ?? "",
        weaknesses: health.weaknesses ?? "",
        notes: health.notes ?? "",
        woundCalculator: health.woundCalculator ?? {
          incomingDamage: 0,
          defense: "vigueur",
          damageType: "PHY"
        }
      },
      maintenance: context.lineageMaintenanceSummary ?? {
        activeCount: 0,
        totalMaintenance: 0,
        passiveRegen: 0,
        netCost: 0,
        currentChakra: 0,
        nextChakra: 0,
        crossesCriticalThreshold: false
      }
    };
  }

  _buildV2CombatItemContext(item = {}) {
    const damage = item.damage ?? {};
    const useEffect = item.useEffect ?? {};
    const uses = item.uses ?? {};
    const carryState = String(item.carryState ?? "notHeld");
    const carryLabel = typeof this.actor._getInventoryCarryStateLabel === "function"
      ? this.actor._getInventoryCarryStateLabel(carryState)
      : carryState;

    return {
      id: item.id,
      name: item.name ?? "Objet",
      type: item.type ?? "misc",
      quantity: Number(item.quantity ?? 1),
      equipped: Boolean(item.equipped),
      carryState,
      carryLabel,
      damageFormula: damage.formula ?? "",
      damageType: NARUTO25E.damageTypes?.[damage.type] ?? damage.type ?? "",
      hasDamage: Boolean(damage.formula),
      hasCombatUse: Boolean(item.hasCombatUse),
      hasUses: Boolean(item.hasUses),
      usesValue: Number(uses.value ?? 0),
      usesMax: Number(uses.max ?? 0),
      useEffectText: useEffect.text ?? "",
      notes: item.notes ?? ""
    };
  }

  _getV2TaijutsuStyleSummaries() {
    const skills = this.actor.system?.skills ?? {};
    const styleKeys = ["corpsACorps", "goken", "juken", "chuken", "coupSpecialTai"];

    return styleKeys
      .map((skillKey) => {
        const skill = skills[skillKey] ?? {};
        const definition = NARUTO25E.skillDefinitions?.[skillKey] ?? {};
        const owned = Boolean(skill.owned || definition.ownedByDefault);

        if (!owned) return null;

        return {
          key: skillKey,
          label: definition.label ?? skillKey,
          value: Number(skill.total ?? skill.natural ?? skill.value ?? 0),
          base: definition.base ?? "",
          hint: skillKey === "juken"
            ? "Style Jūken : dépend des prérequis Hyūga / Byakugan / Médecine selon cadrage."
            : skillKey === "goken"
            ? "Style Gōken : combat physique direct."
            : skillKey === "chuken"
            ? "Style Chūken : combat souple / alternatif."
            : "Corps à corps générique."
        };
      })
      .filter(Boolean);
  }

  _buildV2TechniqueContext(context) {
    const groups = Array.isArray(context.techniqueGroups)
      ? context.techniqueGroups
      : [];

    const lineagePowers = Array.isArray(context.lineagePowerItems)
      ? context.lineagePowerItems
      : [];

    const activeLineagePowers = lineagePowers.filter((power) => Boolean(power.active));

    return {
      groups,
      hasGroups: groups.some((group) => Array.isArray(group.techniques) && group.techniques.length > 0),
      total: groups.reduce((total, group) => {
        return total + (Array.isArray(group.techniques) ? group.techniques.length : 0);
      }, 0),
      lineagePowers,
      activeLineagePowers,
      hasLineagePowers: lineagePowers.length > 0,
      hasActiveLineagePowers: activeLineagePowers.length > 0,
      maintenance: context.lineageMaintenanceSummary ?? {
        activeCount: 0,
        totalMaintenance: 0,
        passiveRegen: 0,
        netCost: 0,
        currentChakra: 0,
        nextChakra: 0,
        crossesCriticalThreshold: false
      }
    };
  }

  _buildV2InventoryContext(context) {
    const system = this.actor.system ?? {};
    const inventory = system.inventory ?? {};
    const consumables = system.consumables ?? {};
    const groups = Array.isArray(context.inventoryByType) ? context.inventoryByType : [];

    const countItems = (type) => {
      const group = groups.find((entry) => entry.type === type);
      return Array.isArray(group?.items) ? group.items.length : 0;
    };

    return {
      ryo: Number(inventory.ryo ?? 0),
      ryoDelta: Number(inventory.ryoDelta ?? 0),
      groups,
      summary: inventory.summary ?? {
        totalItems: 0,
        totalWeight: 0,
        equippedWeight: 0,
        totalValue: 0,
        valueByType: {}
      },
      encumbrance: inventory.encumbrance ?? {
        label: "Charge inactive",
        penaltyText: "La charge est désactivée pour Naruto 2.5e dans cette version."
      },
      toxicity: consumables.toxicity ?? {
        value: 0,
        max: 10,
        dailyValue: 0,
        dailyMax: 6,
        weeklyValue: 0,
        weeklyMax: 10,
        notes: ""
      },
      counts: {
        weapons: countItems("weapon"),
        armors: countItems("armor"),
        consumables: countItems("consumable"),
        misc: countItems("misc")
      }
    };
  }

  _buildV2LineageContext(context, heritage, identityContext, canSeePrivateLineage) {
    const heritageState = context.heritageState ?? {};
    const mode = String(heritageState.mode ?? heritage.mode ?? "clan");
    const hiddenClan = heritageState.hiddenClan ?? {};
    const gmOptions = heritage.gmOptions ?? {};
    const lineagePowerItems = Array.isArray(context.lineagePowerItems)
      ? context.lineagePowerItems
      : [];

    const getClanLabel = (clanKey) => {
      const key = String(clanKey ?? "");
      if (!key) return "—";
      return NARUTO25E.clans?.[key]?.label ?? key;
    };

    const getVoieLabel = (voieKey) => {
      const key = String(voieKey ?? "");
      if (!key) return "—";
      return NARUTO25E.voies?.[key]?.label ?? key;
    };

    const primaryClanKey = String(heritage.clan ?? "");
    const secondaryClanKey = String(heritage.hybrid?.secondaryClan ?? "");
    const voieKey = String(heritage.voie ?? "");
    const customClan = heritage.customClan ?? {};

    const mechanicalClanLabels = Array.isArray(heritageState.mechanicalClanKeys)
      ? heritageState.mechanicalClanKeys.map((clanKey) => ({
          key: clanKey,
          label: getClanLabel(clanKey)
        }))
      : [];

    return {
      canSeePrivateLineage,
      public: {
        modeLabel: identityContext.publicHeritageModeLabel,
        heritageLabel: identityContext.publicHeritageLabel
      },
      mode,
      modeLabel: NARUTO25E.heritageModes?.[mode] ?? mode,
      primaryClan: {
        key: primaryClanKey,
        label: getClanLabel(primaryClanKey)
      },
      secondaryClan: {
        key: secondaryClanKey,
        label: getClanLabel(secondaryClanKey)
      },
      voie: {
        key: voieKey,
        label: getVoieLabel(voieKey)
      },
      customClan: {
        name: String(customClan.name ?? ""),
        summary: String(customClan.summary ?? ""),
        notes: String(customClan.notes ?? "")
      },
      hiddenClan: {
        officialClan: hiddenClan.officialClan ?? "",
        officialClanLabel: hiddenClan.officialClanLabel ?? getClanLabel(hiddenClan.officialClan),
        realClan: hiddenClan.realClan ?? "",
        realClanLabel: hiddenClan.realClanLabel ?? getClanLabel(hiddenClan.realClan),
        awareness: hiddenClan.awareness ?? "ignorant",
        awarenessLabel: hiddenClan.awarenessLabel ?? "—",
        awarenessSummary: hiddenClan.awarenessSummary ?? "",
        unlocked: Boolean(hiddenClan.unlocked),
        effectiveLineageCap: hiddenClan.effectiveLineageCap ?? null,
        effectiveLineageValue: hiddenClan.effectiveLineageValue ?? 0,
        notes: hiddenClan.notes ?? ""
      },
      mechanicalClanLabels,
      hasMechanicalClans: mechanicalClanLabels.length > 0,
      mandatorySkills: Array.isArray(context.heritageMandatorySkills) ? context.heritageMandatorySkills : [],
      hasMandatorySkills: Boolean(context.lineageInfo?.hasMandatorySkills),
      tracks: Array.isArray(context.lineageTracks) ? context.lineageTracks : [],
      hasTracks: Boolean(context.lineageInfo?.hasTracks),
      lineageValue: Number(context.lineageInfo?.value ?? this.actor.system?.bases?.lign?.value ?? 0),
      powers: lineagePowerItems,
      activePowers: lineagePowerItems.filter((power) => Boolean(power.active)),
      hasPowers: lineagePowerItems.length > 0,
      hasActivePowers: lineagePowerItems.some((power) => Boolean(power.active)),
      gmOptions: {
        allowHybridClan: Boolean(heritageState.allowHybridClan ?? gmOptions.allowHybridClan),
        allowHybridVoie: Boolean(heritageState.allowHybridVoie ?? gmOptions.allowHybridVoie),
        allowCustomClan: Boolean(heritageState.allowCustomClan ?? gmOptions.allowCustomClan),
        hasMangekyoSharingan: Boolean(heritageState.hasMangekyoSharingan ?? gmOptions.hasMangekyoSharingan),
        hasEternalMangekyoSharingan: Boolean(heritageState.hasEternalMangekyoSharingan ?? gmOptions.hasEternalMangekyoSharingan),
        hasSenjuCells: Boolean(heritageState.hasSenjuCells ?? gmOptions.hasSenjuCells),
        hasRinnegan: Boolean(heritageState.hasRinnegan ?? gmOptions.hasRinnegan),
        hasTenseigan: Boolean(heritageState.hasTenseigan ?? gmOptions.hasTenseigan)
      },
      dojutsu: {
        hasUchihaLineage: Boolean(heritageState.hasUchihaLineage),
        hasHyugaLineage: Boolean(heritageState.hasHyugaLineage),
        hasSenjuLineage: Boolean(heritageState.hasSenjuLineage),
        hasMangekyoSharingan: Boolean(heritageState.hasMangekyoSharingan),
        hasEternalMangekyoSharingan: Boolean(heritageState.hasEternalMangekyoSharingan),
        hasSenjuCells: Boolean(heritageState.hasSenjuCells),
        hasSenjuCellsByLineage: Boolean(heritageState.hasSenjuCellsByLineage),
        hasSenjuCellsByImplant: Boolean(heritageState.hasSenjuCellsByImplant),
        canAwakenRinnegan: Boolean(heritageState.canAwakenRinnegan),
        hasRinnegan: Boolean(heritageState.hasRinnegan),
        hasTenseigan: Boolean(heritageState.hasTenseigan)
      },
      uchihaPowerMode: heritageState.uchihaPowerMode ?? "classic",
      uchihaPowerModeData: heritageState.uchihaPowerModeData ?? {},
      uchihaEyePowers: heritageState.uchihaEyePowers ?? [],
      mangekyo: heritageState.mangekyo ?? {
        rightEyePowerLabel: "—",
        leftEyePowerLabel: "—",
        rightEyeStateLabel: "Sain",
        leftEyeStateLabel: "Sain",
        rightEyePowerOptions: [],
        leftEyePowerOptions: [],
        rightEyeStateOptions: [],
        leftEyeStateOptions: [],
        uses: 0,
        usageState: {}
      }
    };
  }

  _buildV2ProgressionContext(context) {
    const system = this.actor.system ?? {};
    const missions = system.missions ?? {};
    const rankProgression = context.rankProgression ?? {};
    const experienceSummary = context.experienceSummary ?? {};
    const creationValidation = context.creationValidation ?? {};

    return {
      rank: {
        currentLabel: rankProgression.currentLabel ?? "Aspirant Ninja",
        currentShortLabel: rankProgression.currentShortLabel ?? "Aspirant",
        currentBaseCap: Number(rankProgression.currentBaseCap ?? context.baseCap ?? 3),
        next: rankProgression.next ?? null,
        checks: Array.isArray(rankProgression.checks) ? rankProgression.checks : [],
        canPromote: Boolean(rankProgression.canPromote),
        requiresGM: Boolean(rankProgression.requiresGM),
        automaticChecksPassed: Boolean(rankProgression.automaticChecksPassed),
        isMaxRank: Boolean(rankProgression.isMaxRank)
      },
      experience: {
        total: Number(experienceSummary.total ?? system.progression?.experience?.total ?? 0),
        spent: Number(experienceSummary.spent ?? system.progression?.experience?.spent ?? 0),
        baseSpent: Number(experienceSummary.baseSpent ?? 0),
        skillSpent: Number(experienceSummary.skillSpent ?? 0),
        available: Number(experienceSummary.available ?? system.progression?.experience?.available ?? 0)
      },
      bases: Array.isArray(context.bases) ? context.bases : [],
      skillGroups: Array.isArray(context.skillGroups) ? context.skillGroups : [],
      creationSkillSummary: context.creationSkillSummary ?? {
        used: 0,
        max: 5,
        remaining: 5,
        overLimit: false
      },
      missions: {
        ranks: Array.isArray(context.missionRanks) ? context.missionRanks : [],
        totalCompleted: Number(missions.totalCompleted ?? 0),
        totalFailed: Number(missions.totalFailed ?? 0)
      },
      creation: {
        state: context.creationState ?? {},
        validation: creationValidation,
        valid: Boolean(creationValidation.valid),
        errors: Array.isArray(creationValidation.errors) ? creationValidation.errors : [],
        warnings: Array.isArray(creationValidation.warnings) ? creationValidation.warnings : [],
        summary: creationValidation.summary ?? {}
      }
    };
  }

  _buildV2TabsContext() {
    return [
      { key: "summary", label: "Résumé" },
      { key: "combat", label: "Combat" },
      { key: "techniques", label: "Techniques" },
      { key: "inventory", label: "Inventaire" },
      { key: "character", label: "Personnage" },
      { key: "lineage", label: "Lignée" },
      { key: "progression", label: "Progression" }
    ];
  }

  _getV2PublicHeritageLabel(heritage, heritageMode) {
    if (heritageMode === "voie") {
      const voieKey = String(heritage.voie ?? "");
      return NARUTO25E.voies?.[voieKey]?.label ?? (voieKey || "—");
    }

    if (heritageMode === "hiddenClan" && typeof this.actor._getSocialClanKey === "function") {
      const socialClanKey = this.actor._getSocialClanKey();
      return NARUTO25E.clans?.[socialClanKey]?.label ?? (socialClanKey || "—");
    }

    const clanKey = String(heritage.clan ?? "");

    if (clanKey) {
      return NARUTO25E.clans?.[clanKey]?.label ?? clanKey;
    }

    const voieKey = String(heritage.voie ?? "");

    if (voieKey) {
      return NARUTO25E.voies?.[voieKey]?.label ?? voieKey;
    }

    return "—";
  }

  _getV2NindoShort(identity) {
    const nindo = this.actor.system?.nindo ?? {};
    const choiceMode = String(nindo.choiceMode ?? "preset");

    if (choiceMode === "custom") {
      return String(identity.nindoText ?? "").trim() || "—";
    }

    const presetKey = String(nindo.preset ?? "");
    const preset = NARUTO25E.nindoPresets?.[presetKey];

    return preset?.name ?? preset?.label ?? identity.nindoText ?? "—";
  }

  _getV2VillageIcon(villageKey, villageStatusKey) {
    const isNukenin = ["deserter", "nukenin"].includes(String(villageStatusKey ?? ""));
    const iconKey = isNukenin ? `${villageKey}_nukenin` : villageKey;

    return NARUTO25E_V2_VILLAGE_ICON_PATHS[iconKey] ?? NARUTO25E_V2_VILLAGE_ICON_PATHS[villageKey] ?? "";
  }

  _getV2ChakraIcons() {
    const icons = [];
    const addIcon = (key, label = "") => {
      const normalizedKey = String(key ?? "");
      if (!normalizedKey) return;
      if (icons.some((icon) => icon.key === normalizedKey)) return;

      const src = NARUTO25E_V2_CHAKRA_ICON_PATHS[normalizedKey];
      if (!src) return;

      icons.push({
        key: normalizedKey,
        label: label || NARUTO25E.skillDefinitions?.[normalizedKey]?.label || NARUTO25E.chakraAffinities?.[normalizedKey]?.label || normalizedKey,
        src
      });
    };

    const affinities = this.actor.system?.chakra?.affinities ?? {};
    const ownedAffinities = Array.isArray(affinities.owned) ? affinities.owned : [];
    const forcedAffinities = Array.isArray(affinities.forced) ? affinities.forced : [];
    const extraAffinities = Array.isArray(affinities.extra) ? affinities.extra : [];

    addIcon(affinities.primary);
    addIcon(affinities.secondary);

    for (const affinity of ownedAffinities) {
      addIcon(typeof affinity === "object" ? affinity.key : affinity);
    }

    for (const affinity of forcedAffinities) {
      addIcon(typeof affinity === "object" ? affinity.key : affinity);
    }

    for (const affinity of extraAffinities) {
      addIcon(typeof affinity === "object" ? affinity.key : affinity);
    }

    const skills = this.actor.system?.skills ?? {};

    if (skills.iryo?.owned) addIcon("iryo", "Iryō");

    if (skills.goken?.owned || skills.juken?.owned || skills.chuken?.owned || skills.corpsACorps?.owned) {
      addIcon("taijutsu", "Taijutsu");
    }

    if (skills.armesSimples?.owned || skills.armesExotiques?.owned || skills.coupSpecialArm?.owned) {
      addIcon("armes", "Armes");
    }

    return icons;
  }

  _getV2ActionSummary(combatActions) {
    const simple = combatActions.simpleAvailable ? "Simple ✓" : "Simple ×";
    const complex = combatActions.complexAvailable ? "Complexe ✓" : "Complexe ×";
    const delayed = combatActions.delayedAvailable ? "Retardée ✓" : "Retardée —";

    return `${simple} · ${complex} · ${delayed}`;
  }
}