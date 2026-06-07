import { NARUTO25E } from "../config.js";

const SHINOBIMANCER_STEPS = [
  {
    key: "identity",
    number: 1,
    label: "Identité",
    shortLabel: "Identité",
    description: "Nom, dossier personnel, Nindō et premières informations du Shinobi."
  },
  {
    key: "village",
    number: 2,
    label: "Village",
    shortLabel: "Village",
    description: "Village d’origine, statut politique et loyauté administrative."
  },
  {
    key: "heritage",
    number: 3,
    label: "Héritage",
    shortLabel: "Héritage",
    description: "Choix du mode d’héritage : clan, voie ou cas particulier encadré par le MJ."
  },
  {
    key: "clan",
    number: 4,
    label: "Clan / Voie",
    shortLabel: "Clan",
    description: "Choix détaillé du clan, de la voie ou de l’hybridation."
  },
  {
    key: "bases",
    number: 5,
    label: "Bases / XP",
    shortLabel: "Bases",
    description: "Répartition des Bases, plafonds, XP et toile de profil."
  },
  {
    key: "affinities",
    number: 6,
    label: "Affinités",
    shortLabel: "Affinités",
    description: "Affinités de Chakra naturelles, imposées, secondaires ou spéciales."
  },
  {
    key: "skills",
    number: 7,
    label: "Compétences",
    shortLabel: "Compétences",
    description: "Compétences initiales après application des Bases et affinités."
  },
  {
    key: "equipment",
    number: 8,
    label: "Équipement",
    shortLabel: "Équipement",
    description: "Paquetage ninja et équipement de départ."
  },
  {
    key: "summary",
    number: 9,
    label: "Résumé final",
    shortLabel: "Résumé",
    description: "Contrôle final, avertissements, récapitulatif et validation MJ."
  }
];

const SHINOBIMANCER_TEST_CLANS = [
  {
    key: "uchiha",
    emblem: "写",
    tagline: "Dōjutsu, feu et destin tragique.",
    feature: "Katon, Sharingan, Mangekyō sous validation MJ.",
    warning: "Les pouvoirs du Mangekyō demandent une validation narrative et une santé oculaire suivie."
  },
  {
    key: "senju",
    emblem: "木",
    tagline: "Vitalité, puissance naturelle et Mokuton.",
    feature: "Mokuton, Doton et Suiton imposés par la lignée.",
    warning: "Mokuton impose des contraintes fortes sur les affinités et compétences de départ."
  },
  {
    key: "hyuga",
    emblem: "眼",
    tagline: "Byakugan, Jūken et perception absolue.",
    feature: "Byakugan, Jūken, vision du réseau de Chakra.",
    warning: "Le style de combat Hyūga structure fortement la création."
  },
  {
    key: "kato",
    emblem: "幽",
    tagline: "Esprit, perception et projection spirituelle.",
    feature: "Yūrengan, Ikiryō et pouvoirs spirituels.",
    warning: "Les pouvoirs avancés seront détaillés progressivement."
  },
  {
    key: "nara",
    emblem: "影",
    tagline: "Ombres, stratégie et contrôle du terrain.",
    feature: "Pouvoir des Ombres, Kagemane, Kage Nui.",
    warning: "Pouvoir des Ombres est passif ; Kagemane et Kage Nui seront automatisés plus tard."
  },
  {
    key: "aburame",
    emblem: "虫",
    tagline: "Essaim, symbiose et gestion du Chakra.",
    feature: "Kikaichū, réserve d’insectes et techniques d’essaim.",
    warning: "Une partie du Chakra brut peut être allouée à la colonie Kikaichū."
  },
  {
    key: "inuzuka",
    emblem: "牙",
    tagline: "Instinct, pistage et compagnon canin.",
    feature: "Gardien du clan Inu, flair, forme sauvage.",
    warning: "La fiche complète de compagnon viendra dans une version ultérieure."
  }
];

const SHINOBIMANCER_AFFINITY_FALLBACKS = [
  { key: "katon", label: "Katon", icon: "火", tone: "Feu", description: "Puissance offensive, pression et techniques destructrices." },
  { key: "futon", label: "Fūton", icon: "風", tone: "Vent", description: "Vitesse, tranchant, projection et mobilité." },
  { key: "raiton", label: "Raïton", icon: "雷", tone: "Foudre", description: "Percussion, vitesse, stimulation et précision." },
  { key: "doton", label: "Doton", icon: "土", tone: "Terre", description: "Défense, stabilité, construction et contrôle du terrain." },
  { key: "suiton", label: "Suiton", icon: "水", tone: "Eau", description: "Adaptation, entrave, flux et contrôle de zone." },
  { key: "fuin", label: "Fūin", icon: "封", tone: "Sceau", description: "Sceaux, stockage, verrouillage et techniques de contrôle." }
];

const SHINOBIMANCER_EQUIPMENT_PREVIEW = [
  {
    name: "Kunaï",
    type: "Arme",
    quantity: 10,
    description: "Arme de jet et outil polyvalent ninja."
  },
  {
    name: "Shuriken",
    type: "Arme",
    quantity: 10,
    description: "Projectile ninja léger pour harceler ou distraire."
  },
  {
    name: "Note explosive",
    type: "Consommable",
    quantity: 10,
    description: "Parchemin explosif pour pièges, diversion ou attaque."
  },
  {
    name: "Pilule du soldat",
    type: "Consommable",
    quantity: 5,
    description: "Pilule militaire standard pour soutenir l’endurance."
  },
  {
    name: "Pilule de chakra mineure",
    type: "Consommable",
    quantity: 1,
    description: "Restaure 25 Chakra."
  },
  {
    name: "Kit de premiers soins",
    type: "Équipement",
    quantity: 1,
    description: "Kit médical de terrain basique."
  },
  {
    name: "Kit de survie",
    type: "Équipement",
    quantity: 1,
    description: "Kit de base pour bivouac, déplacement et survie."
  },
  {
    name: "Kit technique",
    type: "Équipement",
    quantity: 1,
    description: "Outils simples pour manipulations techniques, pièges ou réparations."
  }
];

const SHINOBIMANCER_BASE_ORDER = ["cor", "arm", "tai", "nin", "gen", "esp", "lign"];

function getActorCreationSummary(actor) {
  if (!actor || typeof actor.getCreationValidationSummary !== "function") {
    return {
      valid: false,
      errors: [],
      warnings: [],
      summary: {
        village: "—",
        status: "—",
        heritage: "—",
        heritageMode: "—",
        affinities: ["—"],
        initialSkillsUsed: 0,
        maxInitialSkills: 5,
        initialSkillsRemaining: 5,
        xpAvailable: 0
      }
    };
  }

  return actor.getCreationValidationSummary();
}

function getSafeSystemValue(actor, path, fallback = "") {
  return foundry.utils.getProperty(actor?.system ?? {}, path) ?? fallback;
}

function normalizeShinobimancerStep(stepKey) {
  const key = String(stepKey ?? "identity");
  const allowedSteps = new Set(SHINOBIMANCER_STEPS.map((step) => step.key));

  return allowedSteps.has(key) ? key : "identity";
}

function getStepIndex(stepKey) {
  return SHINOBIMANCER_STEPS.findIndex((step) => step.key === stepKey);
}

function getAdjacentStep(stepKey, direction = 1) {
  const currentIndex = getStepIndex(stepKey);
  const nextIndex = Math.clamp(currentIndex + direction, 0, SHINOBIMANCER_STEPS.length - 1);

  return SHINOBIMANCER_STEPS[nextIndex]?.key ?? "identity";
}

async function updateShinobimancerCreationState(actor, updateData = {}) {
  if (!actor || actor.type !== "shinobi") {
    ui.notifications.warn("Aucun acteur Shinobi valide n’est associé au Shinobimancer.");
    return false;
  }

  if (!actor.isOwner && !game.user?.isGM) {
    ui.notifications.warn("Tu n’as pas les droits nécessaires pour modifier ce dossier de création.");
    return false;
  }

  const expandedData = {};

  for (const [key, value] of Object.entries(updateData)) {
    expandedData[`system.progression.creation.${key}`] = value;
  }

  await actor.update(expandedData);

  return true;
}

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function buildBaseRows(actor) {
  const bases = actor?.system?.bases ?? {};

  return SHINOBIMANCER_BASE_ORDER.map((key) => {
    const base = bases[key] ?? {};
    const value = Number(base.value ?? 1);
    const bonus = Number(base.bonus ?? 0);
    const total = value + bonus;
    const max = Number(base.max ?? 14);
    const absoluteMax = Number(base.absoluteMax ?? 16);

    return {
      key,
      label: base.label ?? NARUTO25E.baseLabels?.[key] ?? key,
      value,
      bonus,
      total,
      max,
      absoluteMax,
      percent: Math.clamp((total / 14) * 100, 0, 100)
    };
  });
}

function renderBaseRadarSvg(baseRows, options = {}) {
  const size = Number(options.size ?? 260);
  const center = size / 2;
  const radius = size * 0.38;
  const maxValue = 14;
  const rings = 14;
  const axisCount = baseRows.length;
  const angleOffset = -Math.PI / 2;

  const pointFor = (index, valueRatio) => {
    const angle = angleOffset + (Math.PI * 2 * index) / axisCount;
    const currentRadius = radius * valueRatio;

    return {
      x: center + Math.cos(angle) * currentRadius,
      y: center + Math.sin(angle) * currentRadius
    };
  };

  const polygonPoints = (ratio) => {
    return baseRows
      .map((_, index) => {
        const point = pointFor(index, ratio);
        return `${point.x.toFixed(2)},${point.y.toFixed(2)}`;
      })
      .join(" ");
  };

  const valuePoints = baseRows
    .map((base, index) => {
      const ratio = Math.clamp(Number(base.total ?? 1) / maxValue, 0, 1);
      const point = pointFor(index, ratio);
      return `${point.x.toFixed(2)},${point.y.toFixed(2)}`;
    })
    .join(" ");

  const grid = Array.from({ length: rings }, (_, index) => {
    const ratio = (index + 1) / rings;
    const opacity = index + 1 === rings ? 0.42 : 0.18;

    return `<polygon points="${polygonPoints(ratio)}" fill="none" stroke="currentColor" stroke-opacity="${opacity}" stroke-width="${index + 1 === rings ? 1.5 : 1}" />`;
  }).join("");

  const axes = baseRows.map((base, index) => {
    const end = pointFor(index, 1);
    const labelPoint = pointFor(index, 1.16);
    const valuePoint = pointFor(index, 0.72);

    return `
      <line x1="${center}" y1="${center}" x2="${end.x.toFixed(2)}" y2="${end.y.toFixed(2)}" stroke="currentColor" stroke-opacity="0.22" stroke-width="1" />
      <text x="${labelPoint.x.toFixed(2)}" y="${labelPoint.y.toFixed(2)}" text-anchor="middle" dominant-baseline="middle" class="shinobimancer-radar-label">${escapeHtml(base.label)}</text>
      <text x="${valuePoint.x.toFixed(2)}" y="${valuePoint.y.toFixed(2)}" text-anchor="middle" dominant-baseline="middle" class="shinobimancer-radar-value">${Number(base.total ?? 1)}</text>
    `;
  }).join("");

  return `
    <svg class="shinobimancer-base-radar-svg" viewBox="0 0 ${size} ${size}" role="img" aria-label="Toile des Bases">
      <g class="shinobimancer-radar-grid">
        ${grid}
        ${axes}
      </g>
      <polygon class="shinobimancer-radar-shape" points="${valuePoints}" />
      <circle cx="${center}" cy="${center}" r="3" class="shinobimancer-radar-center" />
    </svg>
  `;
}

function buildVillageCards(actor) {
  const selectedVillage = actor?.system?.heritage?.village ?? "konoha";

  return Object.entries(NARUTO25E.villages ?? {}).map(([key, village]) => ({
    key,
    label: village.label ?? key,
    selectable: Boolean(village.selectable),
    selected: key === selectedVillage,
    status: village.selectable ? "Disponible" : "Verrouillé",
    description: key === "konoha"
      ? "Village caché de la Feuille, centre administratif et militaire du Pays du Feu."
      : "Village visible pour préparer l’extension future du Shinobimancer."
  }));
}

function buildHeritageModeCards(actor) {
  const selectedMode = actor?.system?.heritage?.mode ?? "clan";

  return [
    {
      key: "clan",
      label: "Clan",
      selected: selectedMode === "clan",
      available: true,
      description: "Création classique autour d’un clan principal.",
      note: "Recommandé pour les 7 clans de test."
    },
    {
      key: "voie",
      label: "Voie",
      selected: selectedMode === "voie",
      available: true,
      description: "Création fondée sur une voie plutôt qu’un clan.",
      note: "Accessible mais encore peu détaillé dans cette pré-maquette."
    },
    {
      key: "hybridClan",
      label: "Clan hybride",
      selected: selectedMode === "hybridClan",
      available: true,
      description: "Clan principal et clan secondaire sous validation MJ.",
      note: "Mode avancé, à encadrer en 0.2.x."
    },
    {
      key: "hybridVoie",
      label: "Voie hybridée",
      selected: selectedMode === "hybridVoie",
      available: true,
      description: "Clan principal accompagné d’une voie particulière.",
      note: "Mode MJ, prévu pour les cas narratifs."
    }
  ];
}

function buildClanCards(actor) {
  const selectedClan = actor?.system?.heritage?.clan ?? "";

  return SHINOBIMANCER_TEST_CLANS.map((preview) => {
    const clan = NARUTO25E.clans?.[preview.key] ?? {};
    const skillKey = clan.skillKey ?? "";
    const skillLabel = skillKey
      ? NARUTO25E.skillDefinitions?.[skillKey]?.label ?? skillKey
      : "À définir";

    return {
      ...preview,
      label: clan.label ?? preview.key,
      selected: selectedClan === preview.key,
      available: true,
      village: NARUTO25E.villages?.[clan.village]?.label ?? "Konoha",
      skillLabel
    };
  });
}

function buildAffinityCards(actor) {
  const chakraAffinities = NARUTO25E.chakraAffinities ?? {};
  const primary = actor?.system?.chakra?.affinities?.primary ?? "";
  const secondary = actor?.system?.chakra?.affinities?.secondary ?? "";
  const forced = actor?.system?.chakra?.affinities?.forced ?? [];

  const entries = Object.keys(chakraAffinities).length > 0
    ? Object.entries(chakraAffinities).slice(0, 10).map(([key, affinity]) => ({
        key,
        label: affinity.label ?? key,
        icon: affinity.icon ?? " chakra ",
        tone: affinity.tone ?? "Chakra",
        description: affinity.summary ?? affinity.description ?? "Affinité de Chakra préparée pour la création guidée."
      }))
    : SHINOBIMANCER_AFFINITY_FALLBACKS;

  return entries.map((affinity) => ({
    ...affinity,
    isPrimary: affinity.key === primary,
    isSecondary: affinity.key === secondary,
    isForced: forced.includes(affinity.key),
    status: forced.includes(affinity.key)
      ? "Imposée"
      : affinity.key === primary
      ? "Principale"
      : affinity.key === secondary
      ? "Secondaire"
      : "Disponible"
  }));
}

function buildSkillPreview(actor) {
  const skills = actor?.system?.skills ?? {};
  const definitions = NARUTO25E.skillDefinitions ?? {};
  const categoryOrder = ["common", "combat", "terrain", "clan"];

  const sourceLabels = {
    common: "Commune",
    manual: "Choix initial",
    heritage: "Clan / Voie",
    affinityForced: "Affinité imposée",
    affinityPrimary: "Affinité principale",
    affinityPrimaryFree: "Affinité principale offerte",
    affinitySecondary: "Affinité secondaire",
    affinityExtra: "Affinité spéciale"
  };

  return categoryOrder.map((category) => {
    const categorySkills = Object.entries(definitions)
      .filter(([, definition]) => definition.category === category)
      .slice(0, category === "common" ? 12 : 9)
      .map(([key, definition]) => {
        const skill = skills[key] ?? {};
        const sources = Array.isArray(skill.creationSources) ? skill.creationSources : [];

        return {
          key,
          label: definition.label ?? key,
          base: definition.base,
          baseLabel: NARUTO25E.baseLabels?.[definition.base] ?? definition.base,
          owned: Boolean(skill.owned ?? definition.ownedByDefault),
          total: Number(skill.total ?? skill.natural ?? 1),
          sourceText: sources.length > 0
            ? sources.map((source) => sourceLabels[source] ?? source).join(", ")
            : definition.ownedByDefault
            ? "Commune"
            : "Disponible"
        };
      });

    return {
      key: category,
      label: NARUTO25E.skillCategoryLabels?.[category] ?? NARUTO25E.skillCategories?.[category] ?? category,
      skills: categorySkills
    };
  });
}

function buildEquipmentPreview() {
  return SHINOBIMANCER_EQUIPMENT_PREVIEW.map((item) => ({
    ...item,
    quantityLabel: item.quantity > 1 ? `×${item.quantity}` : "×1"
  }));
}

export class Naruto25eShinobimancerChoiceApplication extends Application {
  constructor(actor, options = {}) {
    super(options);

    this.actor = actor;
    this.sourceSheet = options.sourceSheet ?? null;
  }

  static get defaultOptions() {
    return foundry.utils.mergeObject(super.defaultOptions, {
      id: "naruto-25e-shinobimancer-choice",
      classes: ["naruto-25e", "shinobimancer", "shinobimancer-choice-window"],
      title: "Création du Shinobi",
      template: "systems/naruto-25e/templates/apps/shinobimancer-choice.hbs",
      width: 1000,
      height: "auto",
      resizable: true
    });
  }

  getData(options = {}) {
    const context = super.getData(options);
    const creation = this.actor?.system?.progression?.creation ?? {};
    const validation = getActorCreationSummary(this.actor);

    context.actor = this.actor;
    context.actorName = this.actor?.name ?? "Nouveau Shinobi";
    context.actorImg = this.actor?.img ?? "icons/svg/mystery-man.svg";
    context.creationLocked = Boolean(creation.locked);
    context.creationValidation = validation;
    context.manualSheetAvailable = Boolean(this.actor?.sheet);
    context.shinobimancerAvailable = Boolean(this.actor);

    context.choiceCards = [
      {
        key: "shinobimancer",
        title: "Utiliser le Shinobimancer",
        eyebrow: "Création guidée",
        icon: "fa-solid fa-scroll",
        text: "Ouvre l’assistant de création visuel. Cette pré-version sert surtout à poser la maquette, la barre d’étapes et l’ambiance générale.",
        buttonLabel: "Entrer dans le Shinobimancer",
        recommended: true
      },
      {
        key: "manual",
        title: "Ouvrir la fiche manuelle",
        eyebrow: "Création libre",
        icon: "fa-solid fa-pen-nib",
        text: "Conserve la fiche Shinobi classique pour modifier les champs directement, comme dans les versions précédentes.",
        buttonLabel: "Continuer sur la fiche"
      }
    ];

    return context;
  }

  activateListeners(html) {
    super.activateListeners(html);

    html.find(".shinobimancer-choice-start").on("click", async (event) => {
      event.preventDefault();

      if (!this.actor) {
        ui.notifications.warn("Aucun acteur Shinobi associé à cette création.");
        return;
      }

      const creation = this.actor.system?.progression?.creation ?? {};
      const currentStep = normalizeShinobimancerStep(creation.currentStep ?? "identity");
      const now = new Date().toISOString();

      const updated = await updateShinobimancerCreationState(this.actor, {
        mode: "shinobimancer",
        currentStep,
        shinobimancerStartedAt: creation.shinobimancerStartedAt || now,
        lastOpenedAt: now
      });

      if (!updated) return;

      new Naruto25eShinobimancerApplication(this.actor, {
        sourceSheet: this.sourceSheet,
        currentStep
      }).render(true);

      this.close();
    });

    html.find(".shinobimancer-choice-manual").on("click", async (event) => {
      event.preventDefault();

      const now = new Date().toISOString();

      const updated = await updateShinobimancerCreationState(this.actor, {
        mode: "manual",
        manualChosenAt: now,
        lastOpenedAt: now
      });

      if (!updated) return;

      this.actor._naruto25eBypassShinobimancerOnce = game.user?.id ?? "unknown";
      this.sourceSheet?.render?.(true);
      this.close();
    });
  }
}

export class Naruto25eShinobimancerApplication extends Application {
  constructor(actor, options = {}) {
    super(options);

    this.actor = actor;
    this.sourceSheet = options.sourceSheet ?? null;
    this.currentStep = normalizeShinobimancerStep(
      options.currentStep ?? actor?.system?.progression?.creation?.currentStep ?? "identity"
    );
  }

  static get defaultOptions() {
    return foundry.utils.mergeObject(super.defaultOptions, {
      id: "naruto-25e-shinobimancer",
      classes: ["naruto-25e", "shinobimancer", "shinobimancer-window"],
      title: "Shinobimancer",
      template: "systems/naruto-25e/templates/apps/shinobimancer.hbs",
      width: 1160,
      height: 740,
      resizable: true
    });
  }

  get title() {
    const actorName = this.actor?.name ?? "Nouveau Shinobi";
    return `Shinobimancer — ${actorName}`;
  }

  async _setCurrentStep(stepKey) {
    const currentStep = normalizeShinobimancerStep(stepKey);

    this.currentStep = currentStep;

    await updateShinobimancerCreationState(this.actor, {
      currentStep,
      lastOpenedAt: new Date().toISOString()
    });

    this.render(false);
  }

  getData(options = {}) {
    const context = super.getData(options);
    const validation = getActorCreationSummary(this.actor);
    const creationSummary = validation.summary ?? {};
    const system = this.actor?.system ?? {};
    const currentIndex = getStepIndex(this.currentStep);

    const steps = SHINOBIMANCER_STEPS.map((step, index) => {
      const isActive = step.key === this.currentStep;
      const isComplete = index < currentIndex;

      return {
        ...step,
        isActive,
        isLocked: false,
        isComplete,
        cssClass: [
          isActive ? "is-active" : "",
          isComplete ? "is-complete" : ""
        ].filter(Boolean).join(" ")
      };
    });

    const activeStep = steps.find((step) => step.isActive) ?? steps[0];
    const baseRows = buildBaseRows(this.actor);
    const baseRadarSvg = renderBaseRadarSvg(baseRows);

    context.actor = this.actor;
    context.actorName = this.actor?.name ?? "Nouveau Shinobi";
    context.actorImg = this.actor?.img ?? "icons/svg/mystery-man.svg";
    context.system = system;

    context.currentStep = this.currentStep;
    context.steps = steps;
    context.activeStep = activeStep;
    context.canGoPrevious = currentIndex > 0;
    context.canGoNext = currentIndex < SHINOBIMANCER_STEPS.length - 1;
    context.previousStepLabel = currentIndex > 0 ? SHINOBIMANCER_STEPS[currentIndex - 1].label : "Retour";
    context.nextStepLabel = currentIndex < SHINOBIMANCER_STEPS.length - 1 ? SHINOBIMANCER_STEPS[currentIndex + 1].label : "Finaliser";

    context.identity = {
      name: this.actor?.name ?? "",
      prenom: getSafeSystemValue(this.actor, "identity.prenom", ""),
      rank: getSafeSystemValue(this.actor, "progression.rank.current", "aspirant"),
      age: getSafeSystemValue(this.actor, "identity.age", ""),
      birth: getSafeSystemValue(this.actor, "identity.birth", ""),
      sex: getSafeSystemValue(this.actor, "identity.sex", ""),
      height: getSafeSystemValue(this.actor, "identity.height", ""),
      weight: getSafeSystemValue(this.actor, "identity.weight", ""),
      hair: getSafeSystemValue(this.actor, "identity.hair", ""),
      skin: getSafeSystemValue(this.actor, "identity.skin", ""),
      eyes: getSafeSystemValue(this.actor, "identity.eyes", ""),
      nindo: getSafeSystemValue(this.actor, "identity.nindoText", ""),
      sensei: getSafeSystemValue(this.actor, "identity.sensei", ""),
      team: getSafeSystemValue(this.actor, "identity.team", ""),
      teammates: getSafeSystemValue(this.actor, "identity.teammates", ""),
      assignment: getSafeSystemValue(this.actor, "identity.assignment", ""),
      notes: getSafeSystemValue(this.actor, "progression.creation.notes", "")
    };

    context.summaryPanel = {
      village: creationSummary.village ?? "—",
      status: creationSummary.status ?? "—",
      heritage: creationSummary.heritage ?? "—",
      heritageMode: creationSummary.heritageMode ?? "—",
      affinities: Array.isArray(creationSummary.affinities) ? creationSummary.affinities : ["—"],
      initialSkillsUsed: Number(creationSummary.initialSkillsUsed ?? 0),
      maxInitialSkills: Number(creationSummary.maxInitialSkills ?? 5),
      initialSkillsRemaining: Number(creationSummary.initialSkillsRemaining ?? 5),
      xpAvailable: Number(creationSummary.xpAvailable ?? 0),
      valid: Boolean(validation.valid),
      warningCount: validation.warnings?.length ?? 0,
      errorCount: validation.errors?.length ?? 0
    };

    context.creationValidation = validation;

    context.baseRows = baseRows;
    context.baseRadarSvg = baseRadarSvg;
    context.baseCap = typeof this.actor?.getBaseCap === "function" ? this.actor.getBaseCap() : 3;

    context.villageCards = buildVillageCards(this.actor);
    context.heritageModeCards = buildHeritageModeCards(this.actor);
    context.clanCards = buildClanCards(this.actor);
    context.affinityCards = buildAffinityCards(this.actor);
    context.skillGroups = buildSkillPreview(this.actor);
    context.equipmentPreview = buildEquipmentPreview();

    context.experienceSummary = {
      total: Number(system.progression?.experience?.total ?? 0),
      spent: Number(system.progression?.experience?.spent ?? 0),
      baseSpent: Number(system.progression?.experience?.baseSpent ?? 0),
      skillSpent: Number(system.progression?.experience?.skillSpent ?? 0),
      available: Number(system.progression?.experience?.available ?? 0)
    };

    context.previewNotices = [
      {
        type: "info",
        title: "Pré-version 0.1.29.2",
        text: "Toutes les étapes sont maintenant visibles et navigables pour soutenir la maquette graphique."
      },
      {
        type: "warning",
        title: "Pré-maquette non définitive",
        text: "Les écrans affichent des données réalistes, mais la logique complète de création reste prévue pour la 0.2.0."
      }
    ];

    return context;
  }

  activateListeners(html) {
    super.activateListeners(html);

    html.find(".shinobimancer-close").on("click", (event) => {
      event.preventDefault();
      this.close();
    });

    html.find(".shinobimancer-open-sheet").on("click", (event) => {
      event.preventDefault();

      if (this.actor) {
        this.actor._naruto25eBypassShinobimancerOnce = game.user?.id ?? "unknown";
      }

      this.actor?.sheet?.render(true);
    });

    html.find(".shinobimancer-step").on("click", async (event) => {
      event.preventDefault();

      const stepKey = event.currentTarget?.dataset?.step;

      if (!stepKey) return;

      await this._setCurrentStep(stepKey);
    });

    html.find(".shinobimancer-next-step").on("click", async (event) => {
      event.preventDefault();

      const nextStep = getAdjacentStep(this.currentStep, 1);

      await this._setCurrentStep(nextStep);
    });

    html.find(".shinobimancer-previous-step").on("click", async (event) => {
      event.preventDefault();

      const previousStep = getAdjacentStep(this.currentStep, -1);

      await this._setCurrentStep(previousStep);
    });

    html.find(".shinobimancer-finalize-preview").on("click", (event) => {
      event.preventDefault();
      ui.notifications.info("La validation finale complète sera branchée avec le Charactomancer fonctionnel.");
    });
  }
}