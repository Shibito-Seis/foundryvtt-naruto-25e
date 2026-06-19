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

    get isEditable() {
        return Boolean(game.user.isGM) && super.isEditable;
    }

    getData(options = {}) {
        const context = super.getData(options);

        context.system = this.item.system;
        context.isTechnique = this.item.type === "technique";
        context.isConsommable = this.item.type === "consommable";
        context.isPouvoirLignee = this.item.type === "pouvoirLignee";
        context.isEmbeddedInActor = this.item.parent instanceof Actor;
        context.isLineagePowerActive = context.isEmbeddedInActor
            && this.item.parent?.isLineagePowerActive?.(this.item);

        context.consumableSubtypes = [
            { key: "medicine", label: "Médecine" },
            { key: "drug", label: "Drogue" },
            { key: "poison", label: "Poison" },
            { key: "food", label: "Nourriture" },
            { key: "tool", label: "Outil" },
            { key: "scroll", label: "Parchemin" },
            { key: "other", label: "Autre" }
        ].map((option) => ({
            ...option,
            selected: context.system.subtype === option.key
        }));

        context.consumableEffectTypes = [
            { key: "none", label: "Aucun" },
            { key: "restoreResource", label: "Restaurer une ressource" }
        ].map((option) => ({
            ...option,
            selected: context.system.useEffect?.type === option.key
        }));

        context.consumableResources = [
            { key: "none", label: "Aucune" },
            { key: "chakra", label: "Chakra" },
            { key: "vigueur", label: "Vigueur" },
            { key: "caractere", label: "Caractère" }
        ].map((option) => ({
            ...option,
            selected: context.system.useEffect?.resource === option.key
        }));

        context.consumableToxicityPeriods = [
            { key: "none", label: "Aucune" },
            { key: "day", label: "Jour" },
            { key: "week", label: "Semaine" }
        ].map((option) => ({
            ...option,
            selected: context.system.toxicity?.period === option.key
        }));

        context.lineagePowerTypes = [
            { key: "passive", label: "Passif" },
            { key: "activable", label: "Activable" },
            { key: "maintained", label: "Maintenu" }
        ].map((option) => ({
            ...option,
            selected: context.system.powerType === option.key
        }));

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

        context.techniquePrerequisiteTypes = Object.entries(NARUTO25E.techniquePrerequisiteTypes ?? {}).map(([key, label]) => ({
            key,
            label,
            selected: context.system.prerequisites?.type === key
        }));

        context.damageTypes = Object.entries(NARUTO25E.damageTypes ?? {}).map(([key, label]) => ({
            key,
            label,
            selected: context.system.damage?.type === key
        }));

        context.owner = this.item.isOwner;
        context.editable = this.isEditable;
        context.taxonomyCategories = Object.entries(NARUTO25E.taxonomyCategories ?? {}).map(([key, label]) => ({
            key,
            label,
            selected: context.system.taxonomy?.category === key
        }));

        context.automationStatuses = Object.entries(NARUTO25E.automationStatuses ?? {}).map(([key, label]) => ({
            key,
            label,
            selected: context.system.automation?.status === key
        }));

        context.taxonomyTagsText = Array.isArray(context.system.taxonomy?.tags)
            ? context.system.taxonomy.tags.join(", ")
            : String(context.system.taxonomy?.tags ?? "");

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

        html.find(".lineage-power-toggle").on("click", async (event) => {
            event.preventDefault();
            await this.item.toggleLineagePower();
        });
    }
}