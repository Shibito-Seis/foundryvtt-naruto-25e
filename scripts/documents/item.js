import { NARUTO25E } from "../config.js";

export class Naruto25eItem extends Item {
    prepareDerivedData() {
        super.prepareDerivedData();

        this._prepareBaseItemData();

        if (this.type === "technique") {
            this._prepareTechniqueData();
        }

        if (this.type === "consommable") {
            this._prepareConsumableData();
        }

        if (this.type === "pouvoirLignee") {
            this._prepareLineagePowerData();
        }
    }

    _prepareBaseItemData() {
        const system = this.system;

        system.description = system.description ?? "";

        system.taxonomy = system.taxonomy ?? {};
        system.taxonomy.category = system.taxonomy.category ?? this._inferDefaultTaxonomyCategory();
        system.taxonomy.subcategory = system.taxonomy.subcategory ?? "";
        system.taxonomy.rankGroup = system.taxonomy.rankGroup ?? "";
        system.taxonomy.academy = Boolean(system.taxonomy.academy);
        system.taxonomy.startingEligible = Boolean(system.taxonomy.startingEligible);
        system.taxonomy.clan = system.taxonomy.clan ?? "";
        system.taxonomy.element = system.taxonomy.element ?? "";
        system.taxonomy.school = system.taxonomy.school ?? "";
        system.taxonomy.packTarget = system.taxonomy.packTarget ?? "";
        system.taxonomy.tags = this._normalizeTaxonomyTags(system.taxonomy.tags);

        system.automation = system.automation ?? {};
        system.automation.status = ["automated", "partial", "manual", "blocked"].includes(system.automation.status)
            ? system.automation.status
            : "manual";
        system.automation.notes = system.automation.notes ?? "";

        system.damage = system.damage ?? {};
        system.damage.formula = system.damage.formula ?? "";
        system.damage.type = system.damage.type ?? "none";
        system.damage.scaling = system.damage.scaling ?? "";
        system.damage.calculation = system.damage.calculation ?? {};
        system.damage.calculation.enabled = Boolean(system.damage.calculation.enabled);
        system.damage.calculation.bases = Array.isArray(system.damage.calculation.bases)
            ? system.damage.calculation.bases
                .map((base) => String(base ?? "").trim())
                .filter(Boolean)
            : String(system.damage.calculation.bases ?? "")
                .split(/[,;\s]+/g)
                .map((base) => base.trim())
                .filter(Boolean);
        system.damage.calculation.flat = Number(system.damage.calculation.flat ?? 0);
        system.damage.calculation.perItem = Math.max(0, Number(system.damage.calculation.perItem ?? 0));
        system.damage.calculation.perItemLimitBase = String(system.damage.calculation.perItemLimitBase ?? "");
        system.damage.calculation.condition = String(system.damage.calculation.condition ?? "");
        
        system.uses = system.uses ?? {};
        system.uses.enabled = Boolean(system.uses.enabled);
        system.uses.value = Math.max(0, Number(system.uses.value ?? 0));
        system.uses.max = Math.max(0, Number(system.uses.max ?? 0));
        system.uses.per = system.uses.per ?? "charges";

        if (system.uses.enabled && system.uses.max > 0 && system.uses.value <= 0) {
            system.uses.value = system.uses.max;
        }

        if (system.uses.value > system.uses.max && system.uses.max > 0) {
            system.uses.value = system.uses.max;
        }
    }

    _inferDefaultTaxonomyCategory() {
        if (this.type === "arme") return "arme";
        if (this.type === "armure") return "armure";
        if (this.type === "consommable") return "consommable";
        if (this.type === "equipement") return "divers";
        if (this.type === "pouvoirLignee") return "lignee";
        if (this.type === "technique") return "divers";

        return "divers";
    }

    _normalizeTaxonomyTags(tags) {
        if (Array.isArray(tags)) {
            return tags
                .map((tag) => String(tag ?? "").trim())
                .filter(Boolean);
        }

        if (typeof tags === "string") {
            return tags
                .split(/[,;\n]/g)
                .map((tag) => tag.trim())
                .filter(Boolean);
        }

        return [];
    }

    _prepareTechniqueData() {
        const system = this.system;

        system.family = system.family ?? "";
        system.domain = system.domain ?? "";
        system.rank = system.rank ?? "";

        this._normalizeTechniqueLegacyData(system);

        const inferredCategory = this._inferTechniqueTaxonomyCategory(system);
        const inferredClan = this._inferTechniqueClanKey(system);
        const inferredElement = this._inferTechniqueElementKey(system);
        const inferredSchool = this._inferTechniqueSchoolKey(system);

        if (!system.taxonomy.category || system.taxonomy.category === "divers" || system.taxonomy.category === "commune") {
            system.taxonomy.category = inferredCategory;
        }

        if (!system.taxonomy.clan && inferredClan) {
            system.taxonomy.clan = inferredClan;
        }

        if (!system.taxonomy.element && inferredElement) {
            system.taxonomy.element = inferredElement;
        }

        if (!system.taxonomy.school && inferredSchool) {
            system.taxonomy.school = inferredSchool;
        }

        if (!system.taxonomy.subcategory) {
            if (system.taxonomy.category === "lignee" && system.taxonomy.clan) {
                system.taxonomy.subcategory = this._inferTechniqueLineageSubcategory(system);
            } else if (system.taxonomy.element) {
                system.taxonomy.subcategory = system.taxonomy.element;
            } else if (system.taxonomy.school) {
                system.taxonomy.subcategory = system.taxonomy.school;
            } else if (system.skill) {
                system.taxonomy.subcategory = system.skill;
            }
        }

        if (!system.taxonomy.rankGroup) {
            system.taxonomy.rankGroup = ["d", "c", "b", "a", "s", "aa", "sPlus"].includes(system.rank)
                ? system.rank
                : "";
        }

        system.taxonomy.packTarget = this._inferTechniquePackTarget(system);
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
        system.damage.calculation = system.damage.calculation ?? {};
        system.damage.calculation.enabled = Boolean(system.damage.calculation.enabled);
        system.damage.calculation.bases = Array.isArray(system.damage.calculation.bases)
            ? system.damage.calculation.bases
                .map((base) => String(base ?? "").trim())
                .filter(Boolean)
            : String(system.damage.calculation.bases ?? "")
                .split(/[,;\s]+/g)
                .map((base) => base.trim())
                .filter(Boolean);
        system.damage.calculation.flat = Number(system.damage.calculation.flat ?? 0);
        system.damage.calculation.perItem = Math.max(0, Number(system.damage.calculation.perItem ?? 0));
        system.damage.calculation.perItemLimitBase = String(system.damage.calculation.perItemLimitBase ?? "");
        system.damage.calculation.condition = String(system.damage.calculation.condition ?? "");

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

    _inferTechniqueTaxonomyCategory(system) {
        const family = String(system.family ?? "").toLowerCase();
        const skill = String(system.skill ?? "").toLowerCase();
        const domain = String(system.domain ?? "").toLowerCase();

        if (family === "lignee" || family === "lignée") return "lignee";
        if (family === "armes") return "armes";
        if (family === "taijutsu") return "taijutsu";
        if (family === "genjutsu") return "genjutsu";

        if (["gensou", "yuryoku"].includes(skill)) return "genjutsu";

        if (family === "ninjutsu") {
            if (["henge", "kawarimi"].includes(skill)) return "commune";
            return "ninjutsu";
        }

        if (["henge", "kawarimi"].includes(skill)) return "commune";

        if ([
            "katon",
            "suiton",
            "doton",
            "futon",
            "raiton",
            "iryo",
            "fuin"
        ].includes(skill)) {
            return "ninjutsu";
        }

        if (["goken", "juken", "chuken", "hachimon"].includes(skill)) return "taijutsu";

        if (domain.includes("mokuton") || skill === "mokuton") return "lignee";
        if (["kage", "kikaichu", "jiton", "sumi", "resistancesEmotionnelles"].includes(skill)) return "lignee";

        return "divers";
    }

    _inferTechniquePackTarget(system) {
        const category = system.taxonomy?.category ?? this._inferTechniqueTaxonomyCategory(system);

        if (category === "commune") return "techniques-communes";
        if (category === "ninjutsu") return "techniques-ninjutsu";
        if (category === "genjutsu") return "techniques-genjutsu";
        if (category === "taijutsu") return "techniques-taijutsu";
        if (category === "armes") return "techniques-armes";
        if (category === "lignee") return "techniques-lignees";

        return "";
    }

    _normalizeTechniqueLegacyData(system) {
        const family = String(system.family ?? "");
        const rank = String(system.rank ?? "");
        const skill = String(system.skill ?? "").toLowerCase();

        if (family.toLowerCase() === "lignée") {
            system.family = "lignee";
        }

        if (["gensou", "yuryoku"].includes(skill)) {
            system.family = "genjutsu";
            system.base = system.base || "gen";
        }

        if (skill === "mokuton" && rank.toLowerCase() === "mokuton") {
            system.family = "lignee";
            system.rank = "d";
            system.taxonomy.category = "lignee";
            system.taxonomy.clan = "senju";
            system.taxonomy.subcategory = "mokuton";
            system.taxonomy.rankGroup = system.taxonomy.rankGroup || "d";

            if (!String(system.domain ?? "").toLowerCase().includes("mokuton")) {
                system.domain = `Mokuton — ${system.domain || "Technique"}`;
            }
        }
    }

    _inferTechniqueElementKey(system) {
        const skill = String(system.skill ?? "").toLowerCase();

        if (["katon", "suiton", "doton", "futon", "raiton"].includes(skill)) {
            return skill;
        }

        return "";
    }

    _inferTechniqueSchoolKey(system) {
        const skill = String(system.skill ?? "").toLowerCase();

        if (["goken", "juken", "chuken", "hachimon"].includes(skill)) {
            return skill;
        }

        return "";
    }

    _inferTechniqueClanKey(system) {
        const skill = String(system.skill ?? "").toLowerCase();
        const domain = String(system.domain ?? "").toLowerCase();
        const name = String(this.name ?? "").toLowerCase();

        if (skill === "mokuton" || domain.includes("mokuton") || name.includes("mokuton")) return "senju";
        if (skill === "kage") return "nara";
        if (skill === "kikaichu") return "aburame";
        if (skill === "jiton") return "munefuda";
        if (skill === "sumi") return "aniki";
        if (skill === "juken") return "hyuga";
        if (skill === "resistancesEmotionnelles") return "yamanaka";

        return "";
    }

    _inferTechniqueLineageSubcategory(system) {
        const skill = String(system.skill ?? "").toLowerCase();

        if (skill === "mokuton") return "mokuton";
        if (skill === "kage") return "kage";
        if (skill === "kikaichu") return "kikaichu";
        if (skill === "jiton") return "jiton";
        if (skill === "sumi") return "sumi";
        if (skill === "juken") return "juken";
        if (skill === "resistancesEmotionnelles") return "resistancesEmotionnelles";

        return system.taxonomy?.clan ?? "";
    }

    _prepareConsumableData() {
        const system = this.system;

        system.subtype = system.subtype ?? "medicine";
        if (!system.taxonomy.subcategory) {
            system.taxonomy.subcategory = system.subtype;
        }

        if (!system.taxonomy.category || system.taxonomy.category === "divers") {
            if (system.subtype === "tool") {
                system.taxonomy.category = "outil";
            } else if (system.subtype === "poison") {
                system.taxonomy.category = "consommable";
                if (!system.taxonomy.tags.includes("poison")) system.taxonomy.tags.push("poison");
            } else if (system.subtype === "drug") {
                system.taxonomy.category = "consommable";
                if (!system.taxonomy.tags.includes("drogue")) system.taxonomy.tags.push("drogue");
            } else {
                system.taxonomy.category = "consommable";
            }
        }
        system.quantity = Math.max(1, Number(system.quantity ?? 1));
        system.value = Math.max(0, Number(system.value ?? 0));
        system.weight = Math.max(0, Number(system.weight ?? 0));

        system.carry = system.carry ?? {};
        system.carry.holdable = Boolean(system.carry.holdable);
        system.carry.wearable = Boolean(system.carry.wearable);

        system.useEffect = system.useEffect ?? {};
        system.useEffect.type = system.useEffect.type ?? "none";
        system.useEffect.resource = system.useEffect.resource ?? "none";
        system.useEffect.amount = Math.max(0, Number(system.useEffect.amount ?? 0));
        system.useEffect.consumeOnUse = system.useEffect.consumeOnUse !== false;
        system.useEffect.text = system.useEffect.text ?? "";

        system.toxicity = system.toxicity ?? {};
        system.toxicity.enabled = Boolean(system.toxicity.enabled);
        system.toxicity.amount = Math.max(0, Number(system.toxicity.amount ?? 0));
        system.toxicity.period = ["none", "day", "week"].includes(system.toxicity.period)
            ? system.toxicity.period
            : "none";
        system.toxicity.iaTurns = Math.max(0, Number(system.toxicity.iaTurns ?? 0));
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

        const chakra = rollActor.system.resources?.chakra ?? {};
        const currentChakra = Math.max(0, Number(chakra.value ?? 0));
        const maxChakra = Math.max(0, Number(chakra.max ?? 0));

        const initialCost = Math.max(0, Number(system.chakra?.initial ?? 0));
        const maintenanceCost = Math.max(0, Number(system.chakra?.maintenance ?? 0));
        const hasMaintenance = maintenanceCost > 0;

        if (initialCost > 0 && currentChakra < initialCost) {
            ui.notifications.warn(`${rollActor.name} n’a pas assez de Chakra pour utiliser ${this.name} (${currentChakra}/${initialCost}).`);
            return null;
        }

        const activeEffects = foundry.utils.deepClone(rollActor.system.resources?.activeLineagePowers ?? []);

        if (hasMaintenance && activeEffects.some((effect) => effect.itemId === this.id)) {
            ui.notifications.warn(`${this.name} est déjà maintenue. Désactive-la avant de la relancer.`);
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

        const rollEnabled = system.roll?.enabled !== false;

        let roll = null;
        let exploded = false;
        let rollTotal = "—";
        let diceText = "—";
        let modifierText = modifier >= 0 ? `+ ${modifier}` : `- ${Math.abs(modifier)}`;

        if (rollEnabled) {
            const formula = `1d10x + ${modifier}`;

            roll = new Roll(formula);
            await roll.evaluate();

            const dice = roll.dice?.[0];
            const dieResults = dice?.results ?? [];
            const naturalResults = dieResults.map((result) => Number(result.result ?? 0));

            exploded = naturalResults.some((value) => value === 10) && naturalResults.length > 1;
            rollTotal = roll.total;
            diceText = naturalResults.length ? naturalResults.join(" + ") : "—";
        }

        const nextChakra = Math.max(0, currentChakra - initialCost);

        const updateData = {
            "system.resources.chakra.value": nextChakra
        };

        let maintainedMessage = "";

        if (hasMaintenance) {
            const updatedActiveEffects = [
                ...activeEffects,
                {
                    id: foundry.utils.randomID(16),
                    itemId: this.id,
                    uuid: this.uuid,
                    name: this.name,
                    sourceType: "technique",
                    activationCost: initialCost,
                    maintenanceCost,
                    startedRound: game.combat?.round ?? 0,
                    startedTurn: game.combat?.turn ?? 0
                }
            ];

            updateData["system.resources.activeLineagePowers"] = updatedActiveEffects;

            maintainedMessage = `
                <div class="naruto-technique-maintained">
                    <strong>Maintien :</strong>
                    cette technique est ajoutée aux effets maintenus actifs.
                </div>
            `;
        }

        await rollActor.update(updateData);

        const familyLabel = NARUTO25E.techniqueFamilies?.[system.family] ?? system.family ?? "—";
        const rankLabel = NARUTO25E.techniqueRanks?.[system.rank] ?? system.rank ?? "—";
        const actionLabel = NARUTO25E.techniqueActionTypes?.[system.actionType] ?? system.actionType ?? "—";
        const skillLabel = rollModeLabel;

        const safeTechniqueName = foundry.utils.escapeHTML?.(this.name) ?? this.name;
        const safeActorName = foundry.utils.escapeHTML?.(rollActor.name) ?? rollActor.name;
        const safeEffect = foundry.utils.escapeHTML?.(system.effect ?? "") ?? "";
        const safeRange = foundry.utils.escapeHTML?.(system.range || "—") ?? (system.range || "—");
        const safeTarget = foundry.utils.escapeHTML?.(system.target || "—") ?? (system.target || "—");
        const safeDuration = foundry.utils.escapeHTML?.(system.duration || "—") ?? (system.duration || "—");
        const safeArea = foundry.utils.escapeHTML?.(system.area || "—") ?? (system.area || "—");
        const safeDamageFormula = foundry.utils.escapeHTML?.(system.damage?.formula || "—") ?? (system.damage?.formula || "—");
        const damageTypeLabel = NARUTO25E.damageTypes?.[system.damage?.type] ?? system.damage?.type ?? "";
        const safeDamageType = foundry.utils.escapeHTML?.(damageTypeLabel) ?? damageTypeLabel;
        const safePrerequisite = foundry.utils.escapeHTML?.(prerequisiteResult.label ?? "—") ?? (prerequisiteResult.label ?? "—");

        const rollBlock = rollEnabled
            ? `
                <div class="${exploded ? "naruto-roll-result exploded" : "naruto-roll-result"}">
                    ${rollTotal}
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
            `
            : `
                <div class="naruto-roll-result">
                    Sans jet
                </div>

                <div class="naruto-roll-details">
                    <span>Cette technique ne lance pas de jet automatique.</span>
                </div>
            `;

        const content = `
            <div class="naruto-roll-card naruto-technique-card ${exploded ? "is-exploded" : ""}">
                <header class="naruto-roll-header">
                    <h3>${safeTechniqueName} — ${safeActorName}</h3>
                </header>

                <div class="naruto-technique-meta">
                    <span><strong>Famille</strong> ${familyLabel}</span>
                    <span><strong>Rang</strong> ${rankLabel}</span>
                    <span><strong>Action</strong> ${actionLabel}</span>
                    <span><strong>Compétence</strong> ${skillLabel}</span>
                </div>

                ${rollBlock}

                <div class="naruto-technique-details">
                    <div><strong>Coût initial :</strong> ${initialCost} Chakra</div>
                    <div><strong>Chakra :</strong> ${currentChakra} → ${nextChakra} / ${maxChakra}</div>
                    <div><strong>Entretien :</strong> ${maintenanceCost} Chakra / tour</div>
                    <div><strong>Portée :</strong> ${safeRange}</div>
                    <div><strong>Cible :</strong> ${safeTarget}</div>
                    <div><strong>Durée :</strong> ${safeDuration}</div>
                    <div><strong>Zone :</strong> ${safeArea}</div>
                    <div><strong>Dégâts :</strong> ${safeDamageFormula} ${safeDamageType}</div>
                    <div><strong>Prérequis :</strong> ${safePrerequisite}</div>
                </div>

                ${maintainedMessage}

                ${safeEffect ? `
                    <div class="naruto-technique-effect">
                        <strong>Effet</strong>
                        <div>${safeEffect}</div>
                    </div>
                ` : ""}
            </div>
        `;

        await ChatMessage.create({
            speaker: ChatMessage.getSpeaker({ actor: rollActor }),
            flavor: `Technique : ${safeTechniqueName}`,
            content,
            rolls: roll ? [roll] : []
        });

        ui.notifications.info(`${this.name} utilisée.`);

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