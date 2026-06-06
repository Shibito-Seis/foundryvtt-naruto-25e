const SHINOBIMANCER_STEPS = [
  {
    key: "identity",
    number: 1,
    label: "Identité",
    shortLabel: "Identité",
    status: "active",
    description: "Nom, prénom, portrait et premières notes du Shinobi."
  },
  {
    key: "village",
    number: 2,
    label: "Village",
    shortLabel: "Village",
    status: "locked",
    description: "Village d’origine et statut politique."
  },
  {
    key: "heritage",
    number: 3,
    label: "Héritage",
    shortLabel: "Héritage",
    status: "locked",
    description: "Clan, voie ou héritage particulier."
  },
  {
    key: "clan",
    number: 4,
    label: "Clan / Voie",
    shortLabel: "Clan",
    status: "locked",
    description: "Choix détaillé du clan, de la voie ou de l’hybridation."
  },
  {
    key: "affinities",
    number: 5,
    label: "Affinités",
    shortLabel: "Affinités",
    status: "locked",
    description: "Affinités de Chakra naturelles, imposées ou spéciales."
  },
  {
    key: "skills",
    number: 6,
    label: "Compétences",
    shortLabel: "Compétences",
    status: "locked",
    description: "Compétences initiales après application des affinités."
  },
  {
    key: "bases",
    number: 7,
    label: "Bases / XP",
    shortLabel: "Bases",
    status: "locked",
    description: "Répartition des bases et suivi de l’expérience."
  },
  {
    key: "equipment",
    number: 8,
    label: "Équipement",
    shortLabel: "Équipement",
    status: "locked",
    description: "Paquetage ninja et équipement de départ."
  },
  {
    key: "summary",
    number: 9,
    label: "Résumé final",
    shortLabel: "Résumé",
    status: "locked",
    description: "Contrôle final, avertissements et validation MJ."
  }
];

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
      width: 1040,
      height: 740,
      resizable: true
    });
  }

  get title() {
    const actorName = this.actor?.name ?? "Nouveau Shinobi";
    return `Shinobimancer — ${actorName}`;
  }

  getData(options = {}) {
    const context = super.getData(options);
    const validation = getActorCreationSummary(this.actor);
    const creationSummary = validation.summary ?? {};
    const system = this.actor?.system ?? {};

    const steps = SHINOBIMANCER_STEPS.map((step) => {
      const isActive = step.key === this.currentStep;

      return {
        ...step,
        isActive,
        isLocked: !isActive && step.status === "locked",
        isComplete: step.status === "complete",
        cssClass: [
          isActive ? "is-active" : "",
          !isActive && step.status === "locked" ? "is-locked" : "",
          step.status === "complete" ? "is-complete" : ""
        ].filter(Boolean).join(" ")
      };
    });

    const activeStep = steps.find((step) => step.isActive) ?? steps[0];

    context.actor = this.actor;
    context.actorName = this.actor?.name ?? "Nouveau Shinobi";
    context.actorImg = this.actor?.img ?? "icons/svg/mystery-man.svg";
    context.system = system;

    context.currentStep = this.currentStep;
    context.steps = steps;
    context.activeStep = activeStep;

    context.identity = {
      name: this.actor?.name ?? "",
      prenom: getSafeSystemValue(this.actor, "identity.prenom", ""),
      rank: getSafeSystemValue(this.actor, "progression.rank.current", "aspirant"),
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

    context.previewNotices = [
      {
        type: "info",
        title: "Pré-version 0.1.28.1",
        text: "Cette fenêtre sert de support visuel pour la maquette. Les prochaines étapes seront branchées progressivement."
      },
      {
        type: "warning",
        title: "Ordre de création",
        text: "Les affinités viendront avant les compétences afin de tenir compte des choix offerts, imposés ou comptabilisés."
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

    html.find(".shinobimancer-next-step").on("click", async (event) => {
      event.preventDefault();

      await updateShinobimancerCreationState(this.actor, {
        currentStep: this.currentStep,
        lastOpenedAt: new Date().toISOString()
      });

      ui.notifications.info("Les étapes suivantes du Shinobimancer seront branchées après validation de la maquette.");
    });

    html.find(".shinobimancer-previous-step").on("click", async (event) => {
      event.preventDefault();

      await updateShinobimancerCreationState(this.actor, {
        currentStep: this.currentStep,
        lastOpenedAt: new Date().toISOString()
      });

      ui.notifications.info("La navigation complète sera ajoutée dans une prochaine version.");
    });
  }
}