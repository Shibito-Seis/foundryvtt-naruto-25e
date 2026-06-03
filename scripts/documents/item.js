import { NARUTO25E } from "../config.js";

export class Naruto25eItem extends Item {
    prepareDerivedData() {
        super.prepareDerivedData();

        if (this.type === "technique") {
            this._prepareTechniqueData();
        }

        if (this.type === "pouvoirLignee") {
            this._prepareLineagePowerData();
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
        system.prerequisites.value = system.prerequisites.value ?? "";
        system.prerequisites.text = system.prerequisites.text ?? "";
        system.prerequisites.masteryRank = Number(system.prerequisites.masteryRank ?? 5);
        system.prerequisites.validated = Boolean(system.prerequisites.validated);
    }

    _prepareLineagePowerData() {
        const system = this.system;

        system.clan = system.clan ?? "";
        system.lineageRank = Math.max(1, Number(system.lineageRank ?? 1));
        system.powerType = system.powerType ?? "maintained";

        system.activationCost = Math.max(0, Number(system.activationCost ?? 0));
        system.maintenanceCost = Math.max(0, Number(system.maintenanceCost ?? 0));

        system.effect = system.effect ?? "";

        system.prerequisites = system.prerequisites ?? {};
        system.prerequisites.text = system.prerequisites.text ?? "";
        system.prerequisites.gmValidation = Boolean(system.prerequisites.gmValidation);
    }

    async toggleLineagePower() {
        if (this.type !== "pouvoirLignee") {
            ui.notifications.warn("Cet item n’est pas un pouvoir de lignée.");
            return;
        }

        const actor = this.parent;

        if (!(actor instanceof Actor)) {
            ui.notifications.warn("Ce pouvoir doit être possédé par un acteur pour être activé.");
            return;
        }

        if (actor.type !== "shinobi") {
            ui.notifications.warn("Ce pouvoir doit être utilisé par un Shinobi.");
            return;
        }

        if (typeof actor.isLineagePowerActive !== "function") {
            ui.notifications.warn("La fiche ne sait pas encore gérer les pouvoirs de lignée actifs.");
            return;
        }

        if ((this.system.powerType ?? "maintained") === "passive") {
            ui.notifications.info(`${this.name} est un pouvoir passif et ne s’active pas.`);
            return;
        }

        if (actor.isLineagePowerActive(this)) {
            await actor.deactivateLineagePower(this.id);
            return;
        }

        await actor.activateLineagePower(this);
    }

    getTechniqueRollActor() {
        if (this.parent instanceof Actor) return this.parent;

        const controlled = canvas?.tokens?.controlled ?? [];
        if (controlled.length === 1) return controlled[0].actor;

        return null;
    }

        _getActorClanKeys(actor) {
        const heritage = actor?.system?.heritage ?? {};
        const clanKeys = [
            heritage.clan,
            heritage.hybrid?.secondaryClan
        ].filter(Boolean);

        return Array.from(new Set(clanKeys));
    }

    _getActorVoieKeys(actor) {
        const heritage = actor?.system?.heritage ?? {};
        const voieKeys = [
            heritage.voie
        ];

        if (heritage.mode === "hybridVoie") {
            voieKeys.push(heritage.hybrid?.secondaryClan);
        }

        return Array.from(new Set(voieKeys.filter(Boolean)));
    }

    _getActorAffinityKeys(actor) {
        const chakraAffinities = actor?.system?.chakra?.affinities ?? {};
        const heritageAffinities = actor?.system?.heritage?.affinities ?? {};
        const keys = new Set();

        const addValue = (value) => {
            if (!value) return;

            if (Array.isArray(value)) {
                for (const entry of value) addValue(entry);
                return;
            }

            if (typeof value === "object") {
                if (value.key) keys.add(value.key);
                if (value.id) keys.add(value.id);
                if (value.value) keys.add(value.value);
                return;
            }

            keys.add(String(value));
        };

        addValue(chakraAffinities.primary);
        addValue(chakraAffinities.secondary);
        addValue(chakraAffinities.forced);
        addValue(chakraAffinities.extra);
        addValue(chakraAffinities.owned);

        addValue(heritageAffinities.primary);
        addValue(heritageAffinities.secondary);
        addValue(heritageAffinities.forced);
        addValue(heritageAffinities.extra);

        return Array.from(keys);
    }

    _getGmOptionLabel(optionKey) {
        const labels = {
            hasMangekyoSharingan: "Mangekyō Sharingan",
            hasEternalMangekyoSharingan: "Mangekyō Sharingan Éternel",
            hasSenjuCells: "Cellules Senju",
            hasRinnegan: "Rinnegan",
            hasTenseigan: "Tenseigan"
        };

        return labels[optionKey] ?? optionKey;
    }

    _normalizeGmOptionKey(value) {
        const aliases = {
            mangekyo: "hasMangekyoSharingan",
            ms: "hasMangekyoSharingan",
            eternalMangekyo: "hasEternalMangekyoSharingan",
            ems: "hasEternalMangekyoSharingan",
            senjuCells: "hasSenjuCells",
            cellulesSenju: "hasSenjuCells",
            rinnegan: "hasRinnegan",
            tenseigan: "hasTenseigan"
        };

        return aliases[value] ?? value;
    }

    _checkTechniquePrerequisite(actor, system, skill, definition) {
        const prerequisites = system.prerequisites ?? {};
        const prerequisiteType = prerequisites.type ?? "none";
        const strictPrerequisite = Boolean(prerequisites.strict);
        const typeLabel = NARUTO25E.techniquePrerequisiteTypes?.[prerequisiteType] ?? prerequisiteType;

        if (!strictPrerequisite || prerequisiteType === "none") {
            return {
                ok: true,
                label: strictPrerequisite ? typeLabel : "Non strict"
            };
        }

        const requiredValue = String(prerequisites.value ?? "").trim();
        const masteryRank = Number(prerequisites.masteryRank ?? 5);
        const skillOwned = Boolean(skill?.owned || definition.ownedByDefault);
        const skillValue = Number(skill?.natural ?? 0);

        const fail = (message) => ({
            ok: false,
            label: typeLabel,
            message
        });

        if (prerequisiteType === "skill" && !skillOwned) {
            return fail(`${actor.name} ne possède pas la compétence requise : ${definition.label}.`);
        }

        if (prerequisiteType === "mastery" && skillValue < masteryRank) {
            return fail(`${actor.name} ne maîtrise pas suffisamment ${definition.label} (${skillValue}/${masteryRank}).`);
        }

        if (prerequisiteType === "affinity") {
            const affinityKey = requiredValue || system.skill;
            const affinityKeys = this._getActorAffinityKeys(actor);

            if (!affinityKey) {
                return fail("Cette technique demande une affinité, mais aucune valeur de prérequis n’est renseignée.");
            }

            if (!affinityKeys.includes(affinityKey)) {
                const affinityLabel = NARUTO25E.chakraAffinities?.[affinityKey]?.label ?? affinityKey;
                return fail(`${actor.name} ne possède pas l’affinité requise : ${affinityLabel}.`);
            }

            return {
                ok: true,
                label: `${typeLabel} : ${NARUTO25E.chakraAffinities?.[affinityKey]?.label ?? affinityKey}`
            };
        }

        if (prerequisiteType === "clan") {
            const clanKeys = this._getActorClanKeys(actor);

            if (!requiredValue) {
                return fail("Cette technique demande un clan, mais aucune valeur de prérequis n’est renseignée.");
            }

            if (!clanKeys.includes(requiredValue)) {
                const clanLabel = NARUTO25E.clans?.[requiredValue]?.label ?? requiredValue;
                return fail(`${actor.name} n’appartient pas au clan requis : ${clanLabel}.`);
            }

            return {
                ok: true,
                label: `${typeLabel} : ${NARUTO25E.clans?.[requiredValue]?.label ?? requiredValue}`
            };
        }

        if (prerequisiteType === "voie") {
            const voieKeys = this._getActorVoieKeys(actor);

            if (!requiredValue) {
                return fail("Cette technique demande une voie, mais aucune valeur de prérequis n’est renseignée.");
            }

            if (!voieKeys.includes(requiredValue)) {
                const voieLabel = NARUTO25E.voies?.[requiredValue]?.label ?? requiredValue;
                return fail(`${actor.name} ne possède pas la voie requise : ${voieLabel}.`);
            }

            return {
                ok: true,
                label: `${typeLabel} : ${NARUTO25E.voies?.[requiredValue]?.label ?? requiredValue}`
            };
        }

        if (prerequisiteType === "lineage") {
            const requiredLineage = Number(requiredValue || masteryRank || 0);
            const actorLineage = Number(
                actor.system.bases?.lign?.total ??
                actor.system.bases?.lign?.value ??
                0
            );

            if (actorLineage < requiredLineage) {
                return fail(`${actor.name} n’a pas assez en Lignée (${actorLineage}/${requiredLineage}).`);
            }

            return {
                ok: true,
                label: `${typeLabel} : ${requiredLineage}`
            };
        }

        if (prerequisiteType === "gmOption") {
            const clanKeys = this._getActorClanKeys(actor);
            const gmOptions = actor.system.heritage?.gmOptions ?? {};
            const optionKey = this._normalizeGmOptionKey(requiredValue);

            if (!optionKey) {
                return fail("Cette technique demande une option MJ de lignée, mais aucune valeur n’est renseignée.");
            }

            let enabled = Boolean(gmOptions[optionKey]);

            if (optionKey === "hasSenjuCells") {
                enabled = enabled || clanKeys.includes("senju");
            }

            if (!enabled) {
                return fail(`${actor.name} ne possède pas l’option MJ requise : ${this._getGmOptionLabel(optionKey)}.`);
            }

            return {
                ok: true,
                label: `${typeLabel} : ${this._getGmOptionLabel(optionKey)}`
            };
        }

        if (["gm", "kekkeiGenkai", "kekkeiTota", "kinjutsu"].includes(prerequisiteType)) {
            if (!prerequisites.validated) {
                return fail(`${actor.name} n’a pas encore la validation MJ requise pour cette technique.`);
            }

            return {
                ok: true,
                label: `${typeLabel} : validé`
            };
        }

        return {
            ok: true,
            label: typeLabel
        };
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

        const prerequisiteResult = this._checkTechniquePrerequisite(
            rollActor,
            system,
            skill,
            definition
        );

        if (!prerequisiteResult.ok) {
            ui.notifications.warn(prerequisiteResult.message);
            return null;
        }

        const skillOwned = Boolean(skill?.owned || definition.ownedByDefault);

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
                <div><strong>Prérequis :</strong> ${prerequisiteResult.label}</div>
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

    async _preUpdate(changed, options, user) {
        const allowed = await super._preUpdate(changed, options, user);
        if (allowed === false) return false;

        const updatingUser = typeof user === "string"
            ? game.users?.get(user)
            : (user ?? game.user);

        if (!updatingUser?.isGM) {
                ui.notifications.warn("Seul le MJ peut modifier les données d’un item Naruto 2.5e.");
                return false;
        }

        return allowed;
    }
}