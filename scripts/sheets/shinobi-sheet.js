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
  }
}