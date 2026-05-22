import { NARUTO25E } from "../config.js";

export class Naruto25eItem extends Item {
    prepareDerivedData() {
        super.prepareDerivedData();

        if (this.type === "technique") {
            this._prepareTechniqueData();
        }
    }

    _prepareTechniqueData() {
        const system = this.system;

        system.family = system.family ?? "";
        system.domain = system.domain ?? "";
        system.rank = system.rank ?? "";
        system.level = Number(system.level ?? 1);
        system.skill = system.skill ?? "";
        system.base = system.base ?? "";
        system.range = system.range ?? "";
        system.duration = system.duration ?? "";
        system.target = system.target ?? "";
        system.area = system.area ?? "";
        system.effect = system.effect ?? "";

        system.actionType = system.actionType ?? "complex";

        system.damage = system.damage ?? {};
        system.damage.formula = system.damage.formula ?? String(system.damage.value ?? "");
        system.damage.type = system.damage.type ?? "none";
        system.damage.scaling = system.damage.scaling ?? "";

        system.chakra = system.chakra ?? {};
        system.chakra.initial = Math.max(0, Number(system.chakra.initial ?? 0));
        system.chakra.maintenance = Math.max(0, Number(system.chakra.maintenance ?? 0));
        system.chakra.text = system.chakra.text ?? "";

        system.roll = system.roll ?? {};
        system.roll.enabled = system.roll.enabled !== false;
        system.roll.defaultDifficulty = Number(system.roll.defaultDifficulty ?? 6);
        system.roll.opposed = Boolean(system.roll.opposed);

        system.prerequisites = system.prerequisites ?? {};
        system.prerequisites.strict = Boolean(system.prerequisites.strict);
        system.prerequisites.type = system.prerequisites.type ?? "none";
        system.prerequisites.text = system.prerequisites.text ?? "";
        system.prerequisites.masteryRank = Number(system.prerequisites.masteryRank ?? 5);
    }

    getTechniqueRollActor() {
        if (this.parent instanceof Actor) return this.parent;

        const controlled = canvas?.tokens?.controlled ?? [];
        if (controlled.length === 1) return controlled[0].actor;

        return null;
    }

    async rollTechnique(actor = null) {
        if (this.type !== "technique") {
            ui.notifications.warn("Cet item n’est pas une technique.");
            return null;
        }

        const rollActor = actor ?? this.getTechniqueRollActor();

        if (!rollActor) {
            ui.notifications.warn("Aucun acteur trouvé. Sélectionne un token ou utilise une technique possédée par un acteur.");
            return null;
        }

        if (rollActor.type !== "shinobi") {
            ui.notifications.warn("La technique doit être lancée par un Shinobi.");
            return null;
        }

        const system = this.system;
        const skillKey = system.skill;

        if (!skillKey) {
            ui.notifications.warn("Aucune compétence liée à cette technique.");
            return null;
        }

        const skill = rollActor.system.skills?.[skillKey];
        const definition = NARUTO25E.skillDefinitions?.[skillKey];

        if (!definition) {
            ui.notifications.warn("Compétence liée introuvable dans la configuration du système.");
            return null;
        }

        const prerequisites = system.prerequisites ?? {};
        const prerequisiteType = prerequisites.type ?? "none";
        const strictPrerequisite = Boolean(prerequisites.strict);

        const skillOwned = Boolean(skill?.owned || definition.ownedByDefault);
        const masteryRank = Number(prerequisites.masteryRank ?? 5);
        const skillValue = Number(skill?.natural ?? 0);

        if (strictPrerequisite && prerequisiteType === "skill" && !skillOwned) {
            ui.notifications.warn(`${rollActor.name} ne possède pas la compétence requise : ${definition.label}.`);
            return null;
        }

        if (strictPrerequisite && prerequisiteType === "mastery" && skillValue < masteryRank) {
            ui.notifications.warn(`${rollActor.name} ne maîtrise pas suffisamment ${definition.label} (${skillValue}/${masteryRank}).`);
            return null;
        }

        const baseKey = definition.base ?? system.base;
        const baseTotal = Number(
            rollActor.system.bases?.[baseKey]?.total ??
            rollActor.system.bases?.[baseKey]?.value ??
            0
        );

        const modifier = skillOwned
        ? Number(skill?.total ?? baseTotal)
        : baseTotal;

        const rollModeLabel = skillOwned
        ? `${definition.label}`
        : `${definition.label} non possédée — Base ${(baseKey ?? "").toUpperCase()}`;
        const formula = `1d10x + ${modifier}`;

        const roll = new Roll(formula);
        await roll.evaluate();

        const dice = roll.dice?.[0];
        const dieResults = dice?.results ?? [];
        const naturalResults = dieResults.map((result) => Number(result.result ?? 0));
        const exploded = naturalResults.some((value) => value === 10) && naturalResults.length > 1;

        const diceText = naturalResults.length ? naturalResults.join(" + ") : "—";
        const modifierText = modifier >= 0 ? `+ ${modifier}` : `- ${Math.abs(modifier)}`;

        const familyLabel = NARUTO25E.techniqueFamilies?.[system.family] ?? system.family ?? "—";
        const rankLabel = NARUTO25E.techniqueRanks?.[system.rank] ?? system.rank ?? "—";
        const actionLabel = NARUTO25E.techniqueActionTypes?.[system.actionType] ?? system.actionType ?? "—";
        const skillLabel = rollModeLabel;

        const content = `
            <div class="naruto-roll-card naruto-technique-card ${exploded ? "is-exploded" : ""}">
                <header class="naruto-roll-header">
                    <h3>${this.name} — ${rollActor.name}</h3>
                </header>

            <div class="naruto-technique-meta">
                <span><strong>Famille</strong> ${familyLabel}</span>
                <span><strong>Rang</strong> ${rankLabel}</span>
                <span><strong>Action</strong> ${actionLabel}</span>
                <span><strong>Compétence</strong> ${skillLabel}</span>
            </div>

            <div class="${exploded ? "naruto-roll-result exploded" : "naruto-roll-result"}">
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

            <div class="naruto-technique-details">
                <div><strong>Chakra :</strong> ${system.chakra?.initial ?? 0}</div>
                <div><strong>Entretien :</strong> ${system.chakra?.maintenance ?? 0}</div>
                <div><strong>Portée :</strong> ${system.range || "—"}</div>
                <div><strong>Cible :</strong> ${system.target || "—"}</div>
                <div><strong>Durée :</strong> ${system.duration || "—"}</div>
                <div><strong>Zone :</strong> ${system.area || "—"}</div>
                <div><strong>Dégâts :</strong> ${system.damage?.formula || "—"} ${NARUTO25E.damageTypes?.[system.damage?.type] ?? system.damage?.type ?? ""}</div>
                <div><strong>Prérequis :</strong> ${strictPrerequisite ? (NARUTO25E.techniquePrerequisiteTypes?.[prerequisiteType] ?? prerequisiteType) : "Non strict"}</div>
            </div>

            ${system.effect ? `
                <div class="naruto-technique-effect">
                    <strong>Effet</strong>
                    <div>${system.effect}</div>
                </div>
            ` : ""}
            </div>
        `;

        await ChatMessage.create({
            speaker: ChatMessage.getSpeaker({ actor: rollActor }),
            flavor: `Technique : ${this.name}`,
            content,
            rolls: [roll]
        });

        return roll;
    }
}