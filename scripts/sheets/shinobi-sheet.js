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

    return context;
  }

  activateListeners(html) {
    super.activateListeners(html);

    if (!this.isEditable) return;
  }
}