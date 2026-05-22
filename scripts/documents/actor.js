import { NARUTO25E } from "../config.js";

export class Naruto25eActor extends Actor {
  prepareDerivedData() {
    super.prepareDerivedData();

    if (this.type !== "shinobi") return;

    const system = this.system;

    this._prepareCreation(system);
    this._prepareBases(system);
    this._prepareSkills(system);
    this._prepareHeritage(system);
    this._prepareChakraSpecializations(system);
    this._prepareResources(system);
    this._prepareCombat(system);
    this._prepareInventory(system);
    this._prepareExperience(system);
    this._prepareMissions(system);
    this._prepareNindo(system);
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
        notes: ""
      };
    }

    const creation = system.progression.creation;

    creation.locked = Boolean(creation.locked);
    creation.validatedAt = creation.validatedAt ?? "";
    creation.validatedBy = creation.validatedBy ?? "";
    creation.notes = creation.notes ?? "";
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

      return Boolean(this.system.nindo?.unlockedByGM);
    }

    async validateCreation() {
      if (this.type !== "shinobi") return;

      if (!game.user.isGM) {
        ui.notifications.warn("Seul le MJ peut valider définitivement la création.");
        return;
      }

      const confirmed = await Dialog.confirm({
        title: "Valider la création",
        content: `
          <p>Valider la création de <strong>${this.name}</strong> ?</p>
          <p>Les choix fondateurs seront verrouillés pour les joueurs :</p>
          <ul>
            <li>Village, statut, clan, voie, hybridation</li>
            <li>Nindō narratif</li>
            <li>Compétences initiales</li>
            <li>Affinités de chakra futures</li>
          </ul>
        `,
        yes: () => true,
        no: () => false,
        defaultYes: false
      });

      if (!confirmed) return;

      await this.update({
        "system.progression.creation.locked": true,
        "system.progression.creation.validatedAt": new Date().toISOString(),
        "system.progression.creation.validatedBy": game.user.name
      });

      ui.notifications.info(`Création validée pour ${this.name}.`);
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

  _prepareBases(system) {
    for (const base of Object.values(system.bases ?? {})) {
      base.value = Number(base.value ?? 0);
      base.bonus = Number(base.bonus ?? 0);
      base.max = Number(base.max ?? 14);
      base.absoluteMax = Number(base.absoluteMax ?? 16);
    }
  }

  _prepareResources(system) {
    const cor = this._getBaseEffective(system, "cor");
    const esp = this._getBaseEffective(system, "esp");
    const chakraBonuses = system.chakra?.specializationBonuses ?? {};

    const vigueur = system.resources?.vigueur;
    if (vigueur) {
      const bonus = Number(vigueur.bonus ?? 0);
      vigueur.max = Math.max(0, 2 + cor + bonus + Number(chakraBonuses.vigueurMax ?? 0));
      vigueur.value = this._clampNumber(vigueur.value, 0, vigueur.max);
    }

    const caractere = system.resources?.caractere;
    if (caractere) {
      const bonus = Number(caractere.bonus ?? 0);
      caractere.max = Math.max(0, 2 + esp + bonus + Number(chakraBonuses.caractereMax ?? 0));
      caractere.value = this._clampNumber(caractere.value, 0, caractere.max);
    }

    const chakra = system.resources?.chakra;
    if (chakra) {
      const specializationChakraBonus = Number(chakraBonuses.chakraMax ?? 0);
      const passiveRegenPercent = 1 + Number(chakraBonuses.passiveRegenPercent ?? 0);
      chakra.passiveRegenPercent = passiveRegenPercent;
      chakra.passiveRegen = chakra.max > 0
        ? Math.max(1, Math.floor(chakra.max * passiveRegenPercent / 100))
        : 0;

      chakra.activeRegen = Number(chakra.activeRegen ?? 0);
      chakra.sonneThreshold = Number(chakra.sonneThreshold ?? 50);

      const formulaMode = game.settings?.get("naruto-25e", "chakraFormulaMode") ?? "standard";

      if (formulaMode === "manual") {
        chakra.max = Math.max(0, Number(chakra.max ?? 0));
      } else if (formulaMode === "harsh") {
        chakra.max = Math.max(0, cor * 30 + esp * 30 + chakra.bonus + specializationChakraBonus);
      } else if (formulaMode === "heroic") {
        chakra.max = Math.max(0, cor * 50 + esp * 50 + chakra.bonus + specializationChakraBonus);
      } else {
        chakra.max = Math.max(0, cor * 30 + esp * 30 + 50 + chakra.bonus + specializationChakraBonus);
      }

      chakra.value = this._clampNumber(chakra.value, 0, chakra.max);
    }
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
      const nindo = system.nindo;
      if (!nindo) return;

      nindo.max = Number(nindo.max ?? 10);
      nindo.value = this._clampNumber(nindo.value, 0, nindo.max);

      if (!nindo.charges) {
        nindo.charges = {
          value: 0,
          max: 5
        };
      }

      nindo.charges.max = Number(nindo.charges.max ?? 5);
      nindo.charges.value = this._clampNumber(nindo.charges.value, 0, nindo.charges.max);

      nindo.unlockedByGM = Boolean(nindo.unlockedByGM);
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
    _prepareSkills(system) {
    if (!system.skills) system.skills = {};

    for (const [key, definition] of Object.entries(NARUTO25E.skillDefinitions)) {
      if (!system.skills[key]) {
        system.skills[key] = {
          natural: 1,
          bonus: 0,
          owned: Boolean(definition.ownedByDefault)
        };
      }

      const skill = system.skills[key];
      const baseKey = definition.base;
      const baseValue = this._getBaseEffective(system, baseKey);
      const naturalBaseValue = Number(system.bases?.[baseKey]?.value ?? 1);

      skill.label = definition.label;
      skill.base = baseKey;
      skill.baseLabel = NARUTO25E.baseLabels[baseKey] ?? baseKey;
      skill.category = definition.category;
      skill.tags = definition.tags ?? [];

      skill.natural = Number(skill.natural ?? 1);
      skill.bonus = Number(skill.bonus ?? 0);
      skill.total = skill.natural + baseValue + skill.bonus;

      skill.max = naturalBaseValue + 2;

      if (typeof skill.owned !== "boolean") {
        skill.owned = Boolean(definition.ownedByDefault);
      }

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
    const mode = heritage.mode ?? "clan";

    const grantedSkillKeys = new Set();

    const addClanMandatorySkill = (clanKey) => {
      if (!clanKey) return;

      const skillKey = NARUTO25E.getClanMandatorySkill(clanKey);
      if (!skillKey) return;

      grantedSkillKeys.add(skillKey);
    };

    if (mode === "clan" || mode === "hybridClan") {
      addClanMandatorySkill(heritage.clan);
    }

    if (mode === "hybridClan" || mode === "hybridVoie") {
      addClanMandatorySkill(heritage.hybrid?.secondaryClan);
    }

    for (const skillKey of grantedSkillKeys) {
      const definition = NARUTO25E.skillDefinitions?.[skillKey];
      if (!definition) continue;

      if (!system.skills[skillKey]) {
        system.skills[skillKey] = {
          natural: 1,
          bonus: 0,
          owned: true
        };
      }

      system.skills[skillKey].owned = true;
      system.skills[skillKey].grantedByHeritage = true;
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
      const secondaryTrack = buildClanTrack(heritage.hybrid?.secondaryClan, "Hybridation de voie");

      if (secondaryTrack) heritage.tracks.push(secondaryTrack);
    }
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
    combat.health = combat.health ?? {};
    combat.health.reserves = combat.health.reserves ?? {};
    combat.health.reserves.lineageA = combat.health.reserves.lineageA ?? {};
    combat.health.reserves.lineageB = combat.health.reserves.lineageB ?? {};

    const cor = this._getBaseEffective(system, "cor");
    const arm = this._getBaseEffective(system, "arm");
    const tai = this._getBaseEffective(system, "tai");

    const getSkillTotal = (skillKey) => {
      return Number(system.skills?.[skillKey]?.total ?? 0);
    };

    const armesSimples = getSkillTotal("armesSimples");
    const corpsACorps = getSkillTotal("corpsACorps");

    // Initiative provisoire validée : 1d10 + 1 + COR total + bonus éventuel.
    combat.initiative.base = 1 + cor;
    combat.initiative.bonus = Number(combat.initiative.bonus ?? 0);
    combat.initiative.specializationBonus = Number(chakraBonuses.initiative ?? 0);
    combat.initiative.total = combat.initiative.base + combat.initiative.bonus + combat.initiative.specializationBonus;
    combat.initiative.formula = `1d10 + ${combat.initiative.total}`;

    // Attaques basiques.
    combat.attacks.arm.label = "Attaque ARM basique";
    combat.attacks.arm.skill = "armesSimples";
    combat.attacks.arm.bonus = Number(combat.attacks.arm.bonus ?? 0);
    combat.attacks.arm.total = Math.max(armesSimples, arm) + combat.attacks.arm.bonus;

    combat.attacks.tai.label = "Attaque TAI basique";
    combat.attacks.tai.skill = "corpsACorps";
    combat.attacks.tai.bonus = Number(combat.attacks.tai.bonus ?? 0);
    combat.attacks.tai.total = Math.max(corpsACorps, tai) + combat.attacks.tai.bonus;

    // Dégâts basiques provisoires : Base effective + 1 + bonus.
    combat.damage.arm.base = arm + 1;
    combat.damage.arm.bonus = Number(combat.damage.arm.bonus ?? 0);
    combat.damage.arm.specializationBonus = Number(chakraBonuses.armDamage ?? 0);
    combat.damage.arm.total = combat.damage.arm.base + combat.damage.arm.bonus + combat.damage.arm.specializationBonus;

    combat.damage.tai.base = tai + 1;
    combat.damage.tai.bonus = Number(combat.damage.tai.bonus ?? 0);
    combat.damage.tai.specializationBonus = Number(chakraBonuses.taiDamage ?? 0);
    combat.damage.tai.total = combat.damage.tai.base + combat.damage.tai.bonus + combat.damage.tai.specializationBonus;

    // Interceptions basiques.
    combat.interceptions.arm.base = arm;
    combat.interceptions.arm.bonus = Number(combat.interceptions.arm.bonus ?? 0);
    combat.interceptions.arm.total = combat.interceptions.arm.base + combat.interceptions.arm.bonus;

    combat.interceptions.tai.base = tai;
    combat.interceptions.tai.bonus = Number(combat.interceptions.tai.bonus ?? 0);
    combat.interceptions.tai.total = combat.interceptions.tai.base + combat.interceptions.tai.bonus;

    combat.quickSkill = combat.quickSkill ?? "";

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

    const lineageBaseUses = Number(combat.counters.lineagePowers.base ?? 0);
    const lineageBonusUses = Number(system.chakra?.specializationBonuses?.lineagePowerUses ?? 0);

    combat.counters.lineagePowers.base = Math.max(0, lineageBaseUses);
    combat.counters.lineagePowers.bonus = Math.max(0, lineageBonusUses);
    combat.counters.lineagePowers.max = combat.counters.lineagePowers.base + combat.counters.lineagePowers.bonus;

    if (!Number.isFinite(Number(combat.counters.lineagePowers.remaining))) {
      combat.counters.lineagePowers.remaining = combat.counters.lineagePowers.max;
    }

    combat.counters.lineagePowers.remaining = this._clampNumber(
      Number(combat.counters.lineagePowers.remaining ?? combat.counters.lineagePowers.max),
      0,
      combat.counters.lineagePowers.max
    );

    // Santé / paliers.
    combat.health.manualState = combat.health.manualState ?? "none";
    combat.health.notes = combat.health.notes ?? "";

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

    const updatingUser = game.users?.get(user);
    const isGM = Boolean(updatingUser?.isGM);

    if (isGM) return allowed;

    const creationLocked = this.isCreationLocked();

    const flat = foundry.utils.flattenObject(changed);

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

        if (lockedPrefixes.some((prefix) => path.startsWith(prefix))) {
          deletePath(path);
        }

        if (path.match(/^system\.skills\.[^.]+\.owned$/)) {
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
        deletePath(path);
      }

      if (path === "system.nindo.charges.value" || path === "system.nindo.charges.max") {
        deletePath(path);
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

  async rollInitiativeAction() {
    const total = Number(this.system.combat?.initiative?.total ?? 0);

    return this._rollExplodingD10("Initiative", total, {
      flavor: `Initiative — ${this.name}`
    });
  }

  async rollBasicAttack(kind) {
    const attack = this.system.combat?.attacks?.[kind];

    if (!attack) {
      ui.notifications.warn("Attaque introuvable.");
      return null;
    }

    const label = kind === "arm" ? "Attaque ARM basique" : "Attaque TAI basique";
    const total = Number(attack.total ?? 0);

    return this._rollExplodingD10(label, total, {
      flavor: `${label} — ${this.name}`
    });
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
    const total = Number(interception.total ?? 0);

    return this._rollExplodingD10(label, total, {
      flavor: `${label} — ${this.name} (${remaining - 1}/${counter.max} restantes)`
    });
  }

  async spendLineagePowerUse() {
    if (this.type !== "shinobi") return;

    const counter = this.system.combat?.counters?.lineagePowers;
    if (!counter) return;

    const remaining = Number(counter.remaining ?? 0);

    if (remaining <= 0) {
      ui.notifications.warn("Aucune utilisation de pouvoir de lignée restante.");
      return;
    }

    await this.update({
      "system.combat.counters.lineagePowers.remaining": remaining - 1
    });

    ui.notifications.info(`Utilisation de pouvoir de lignée dépensée (${remaining - 1}/${counter.max} restantes).`);
  }

  async resetCombatCounters(scope = "round") {
    if (this.type !== "shinobi") return;

    if (!game.user.isGM) {
      ui.notifications.warn("Seul le MJ peut réinitialiser les compteurs.");
      return;
    }

    const updates = {};

    if (scope === "round") {
      const armMax = Number(this.system.combat?.counters?.interceptions?.arm?.max ?? 0);
      const taiMax = Number(this.system.combat?.counters?.interceptions?.tai?.max ?? 0);

      updates["system.combat.counters.interceptions.arm.remaining"] = armMax;
      updates["system.combat.counters.interceptions.tai.remaining"] = taiMax;
    }

    if (scope === "session") {
      const lineageMax = Number(this.system.combat?.counters?.lineagePowers?.max ?? 0);

      updates["system.combat.counters.lineagePowers.remaining"] = lineageMax;
    }

    await this.update(updates);

    if (scope === "round") {
      ui.notifications.info("Compteurs de round réinitialisés.");
    }

    if (scope === "session") {
      ui.notifications.info("Compteurs de session réinitialisés.");
    }
  }

  _prepareInventory(system) {
    if (!system.inventory) system.inventory = {};

    const inventory = system.inventory;

    inventory.ryo = Math.max(0, Number(inventory.ryo ?? 0));
    inventory.ryoDelta = Math.max(0, Number(inventory.ryoDelta ?? 0));

    inventory.permissions = inventory.permissions ?? {};
    inventory.permissions.allowPlayerRyoEdit = Boolean(inventory.permissions.allowPlayerRyoEdit);

    inventory.newItem = inventory.newItem ?? {};
    inventory.newItem.name = inventory.newItem.name ?? "";
    inventory.newItem.type = inventory.newItem.type ?? "misc";
    inventory.newItem.quantity = Math.max(1, Number(inventory.newItem.quantity ?? 1));

    if (!Array.isArray(inventory.items)) {
      inventory.items = [];
    }

    inventory.items = inventory.items.map((item, index) => {
      const type = NARUTO25E.inventoryTypes[item.type] ? item.type : "misc";

      return {
        id: item.id ?? foundry.utils.randomID(16),
        name: item.name ?? "Objet sans nom",
        type,
        quantity: Math.max(1, Number(item.quantity ?? 1)),
        equipped: Boolean(item.equipped),
        notes: item.notes ?? "",
        value: Math.max(0, Number(item.value ?? 0)),
        weight: Math.max(0, Number(item.weight ?? 0)),
        sort: Number(item.sort ?? index)
      };
    }).sort((a, b) => {
      const typeA = NARUTO25E.inventoryTypeOrder.indexOf(a.type);
      const typeB = NARUTO25E.inventoryTypeOrder.indexOf(b.type);

      if (typeA !== typeB) return typeA - typeB;
      return Number(a.sort ?? 0) - Number(b.sort ?? 0);
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
      equipped: false,
      notes: "",
      value: 0,
      weight: 0,
      sort: items.length
    });

    await this.update({
      "system.inventory.items": items,
      "system.inventory.newItem.name": "",
      "system.inventory.newItem.quantity": 1
    });

    ui.notifications.info(`${name} ajouté à l’inventaire.`);
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

    const items = foundry.utils.deepClone(this.system.inventory?.items ?? []);
    const item = items.find((entry) => entry.id === itemId);

    if (!item) {
      ui.notifications.warn("Objet introuvable.");
      return;
    }

    Object.assign(item, changes);

    item.quantity = Math.max(1, Number(item.quantity ?? 1));
    item.value = Math.max(0, Number(item.value ?? 0));
    item.weight = Math.max(0, Number(item.weight ?? 0));
    item.equipped = Boolean(item.equipped);

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
}