import { NARUTO25E } from "../config.js";

export class Naruto25eItemSheet extends ItemSheet {
    static get defaultOptions() {
        return foundry.utils.mergeObject(super.defaultOptions, {
            classes: ["naruto-25e", "sheet", "item", "naruto-25e-item-sheet"],
            template: "systems/naruto-25e/templates/item/item-sheet.hbs",
            width: 620,
            height: 720,
            tabs: [
            {
                navSelector: ".sheet-tabs",
                contentSelector: ".sheet-body",
                initial: "main"
            }
            ]
        });
    }

    getData(options = {}) {
        const context = super.getData(options);

        context.system = this.item.system;
        context.isTechnique = this.item.type === "technique";

        context.techniqueFamilies = Object.entries(NARUTO25E.techniqueFamilies ?? {}).map(([key, label]) => ({
            key,
            label,
            selected: context.system.family === key
        }));

        context.techniqueRanks = Object.entries(NARUTO25E.techniqueRanks ?? {}).map(([key, label]) => ({
            key,
            label,
            selected: context.system.rank === key
        }));

        context.techniqueActionTypes = Object.entries(NARUTO25E.techniqueActionTypes ?? {}).map(([key, label]) => ({
            key,
            label,
            selected: context.system.actionType === key
        }));

        context.baseOptions = Object.entries(NARUTO25E.baseLabels ?? {}).map(([key, label]) => ({
            key,
            label,
            selected: context.system.base === key
        }));

        context.skillOptions = Object.entries(NARUTO25E.skillDefinitions ?? {})
            .map(([key, definition]) => ({
                key,
                label: `${definition.label} (${(definition.base ?? "").toUpperCase()})`,
                selected: context.system.skill === key
            }))
        .sort((a, b) => a.label.localeCompare(b.label, "fr"));

        return context;
    }

    activateListeners(html) {
        super.activateListeners(html);

        html.find(".technique-roll").on("click", async (event) => {
            event.preventDefault();
            await this.item.rollTechnique();
        });
    }
}