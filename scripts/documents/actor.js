import { NARUTO25E } from "../config.js";

export class Naruto25eActor extends Actor {
  prepareDerivedData() {
    super.prepareDerivedData();

    if (this.type !== "shinobi") return;

    const system = this.system;

    this._prepareBases(system);
    this._prepareResources(system);
    this._prepareExperience(system);
    this._prepareMissions(system);
    this._prepareNindo(system);
    this._prepareSkills(system);
  }

  _getBaseEffective(system, key) {
    const base = system.bases?.[key];
    if (!base) return 0;

    const value = Number(base.value ?? 0);
    const bonus = Number(base.bonus ?? 0);

    return value + bonus;
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

    const vigueur = system.resources?.vigueur;
    if (vigueur) {
      const bonus = Number(vigueur.bonus ?? 0);
      vigueur.max = Math.max(0, 2 + cor + bonus);
      vigueur.value = this._clampNumber(vigueur.value, 0, vigueur.max);
    }

    const caractere = system.resources?.caractere;
    if (caractere) {
      const bonus = Number(caractere.bonus ?? 0);
      caractere.max = Math.max(0, 2 + esp + bonus);
      caractere.value = this._clampNumber(caractere.value, 0, caractere.max);
    }

    const chakra = system.resources?.chakra;
    if (chakra) {
      chakra.bonus = Number(chakra.bonus ?? 0);
      chakra.passiveRegen = Number(chakra.passiveRegen ?? 0);
      chakra.activeRegen = Number(chakra.activeRegen ?? 0);
      chakra.sonneThreshold = Number(chakra.sonneThreshold ?? 50);

      const formulaMode = game.settings?.get("naruto-25e", "chakraFormulaMode") ?? "standard";

      if (formulaMode === "manual") {
        chakra.max = Math.max(0, Number(chakra.max ?? 0));
      } else if (formulaMode === "harsh") {
        chakra.max = Math.max(0, cor * 30 + esp * 30 + chakra.bonus);
      } else if (formulaMode === "heroic") {
        chakra.max = Math.max(0, cor * 50 + esp * 50 + chakra.bonus);
      } else {
        chakra.max = Math.max(0, cor * 30 + esp * 30 + 50 + chakra.bonus);
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
  }

  _clampNumber(value, min, max) {
    const number = Number(value ?? 0);
    return Math.min(Math.max(number, min), max);
  }
  getBaseCap() {
  const rankKey = this.system.progression?.rank?.key ?? this.system.identity?.rang ?? "aspirant";
  return NARUTO25E.baseCaps[rankKey] ?? NARUTO25E.baseCaps.aspirant;
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
}