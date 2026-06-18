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
    shortLabel: "Clan / Voie",
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
    description: "Contrôle final, avertissements, récapitulatif et validation du dossier."
  }
];

const SHINOBIMANCER_CLAN_PREVIEWS = {
  uchiha: {
    emblem: "写",
    tagline: "Dōjutsu, feu et destin tragique.",
    feature: "Katon, Sharingan, Mangekyō sous validation MJ.",
    warning: "Les pouvoirs du Mangekyō demandent une validation narrative et une santé oculaire suivie."
  },
  senju: {
    emblem: "木",
    tagline: "Vitalité, puissance naturelle et Mokuton.",
    feature: "Mokuton, Doton et Suiton imposés par la lignée.",
    warning: "Mokuton impose des contraintes fortes sur les affinités et compétences de départ."
  },
  hyuga: {
    emblem: "眼",
    tagline: "Byakugan, Jūken et perception absolue.",
    feature: "Byakugan, Jūken, vision du réseau de Chakra.",
    warning: "Le style de combat Hyūga structure fortement la création."
  },
  kato: {
    emblem: "幽",
    tagline: "Esprit, perception et projection spirituelle.",
    feature: "Yūrengan, Ikiryō et pouvoirs spirituels.",
    warning: "Le clan Katō reste limité à un seul Shinobi joueur validé dans le monde."
  },
  nara: {
    emblem: "影",
    tagline: "Ombres, stratégie et contrôle du terrain.",
    feature: "Pouvoir des Ombres, Kagemane, Kage Nui.",
    warning: "Pouvoir des Ombres est passif ; Kagemane et Kage Nui seront automatisés plus tard."
  },
  aburame: {
    emblem: "虫",
    tagline: "Essaim, symbiose et gestion du Chakra.",
    feature: "Kikaichū, réserve d’insectes et techniques d’essaim.",
    warning: "Une partie du Chakra brut peut être allouée à la colonie Kikaichū."
  },
  inuzuka: {
    emblem: "牙",
    tagline: "Instinct, pistage et compagnon canin.",
    feature: "Gardien du clan Inu, flair, forme sauvage.",
    warning: "La fiche complète de compagnon viendra dans une version ultérieure."
  }
};

const SHINOBIMANCER_VOIE_PREVIEWS = {
  shokanShi: {
    emblem: "幻",
    tagline: "Voie du Genjutsu, illusions et contrôle perceptif.",
    feature: "Orientation Genjutsu, manipulation mentale et tromperie sensorielle.",
    warning: "Les techniques détaillées de Genjutsu seront automatisées dans le chantier Techniques."
  },
  ninpo: {
    emblem: "忍",
    tagline: "Voie du Ninjutsu, polyvalence et techniques shinobi.",
    feature: "Orientation Ninjutsu, affinités, contrôle du Chakra et techniques variées.",
    warning: "Les effets détaillés des techniques Ninpō seront automatisés plus tard."
  },
  kriegsiter: {
    emblem: "武",
    tagline: "Voie des Armes, discipline martiale et maîtrise de l’équipement.",
    feature: "Orientation Armes, combat armé et spécialisation martiale.",
    warning: "Les actions de combat avancées seront automatisées dans le chantier Combat / Actions."
  },
  kugutsu: {
    emblem: "傀",
    tagline: "Voie du Marionnettiste, pantins, fils de Chakra et préparation.",
    feature: "Voie liée à Suna. Visible mais verrouillée tant que Suna n’est pas jouable.",
    warning: "Kugutsu reste verrouillée pour l’instant, car Suna n’est pas encore disponible à la création."
  },
  hachimon: {
    emblem: "門",
    tagline: "Voie du Taijutsu, dépassement physique et portes internes.",
    feature: "Orientation Taijutsu, corps, effort extrême et puissance physique.",
    warning: "Les ouvertures de portes et leurs conséquences seront automatisées dans le chantier Combat / Santé."
  }
};

function getShinobimancerVoieKeys() {
  return Object.keys(NARUTO25E.voies ?? {}).filter((voieKey) => {
    return Boolean(NARUTO25E.voies?.[voieKey]);
  });
}

function getVoiePreviewData(voieKey, voie = {}) {
  const preview = SHINOBIMANCER_VOIE_PREVIEWS[voieKey] ?? {};
  const voieLabel = voie.label ?? voieKey;

  return {
    emblem: preview.emblem ?? voieLabel.slice(0, 1),
    tagline: preview.tagline ?? `${voieLabel} — voie de progression shinobi.`,
    feature: preview.feature ?? "Voie jouable préparée côté création.",
    warning: preview.warning ?? "Les effets complexes de cette voie seront automatisés dans les chantiers dédiés."
  };
}

function buildVoieCards(actor) {
  const heritage = actor?.system?.heritage ?? {};
  const selectedVoie = String(heritage.voie ?? "");
  const villageKey = String(heritage.village ?? "konoha");

  return getShinobimancerVoieKeys().map((voieKey) => {
    const voie = NARUTO25E.voies?.[voieKey] ?? {};
    const preview = getVoiePreviewData(voieKey, voie);
    const voieVillage = String(voie.village ?? "any");
    const villageAllowed = voieVillage === "any" || voieVillage === villageKey;
    const selectable = Boolean(voie.selectable) && villageAllowed;
    const villageLabel = voieVillage === "any"
      ? "Tous villages"
      : NARUTO25E.villages?.[voieVillage]?.label ?? voieVillage;

    return {
      key: voieKey,
      emblem: preview.emblem,
      tagline: preview.tagline,
      feature: preview.feature,
      warning: preview.warning,
      label: voie.label ?? voieKey,
      selected: selectedVoie === voieKey,
      available: selectable,
      village: villageLabel,
      status: selectable ? "Disponible" : "Verrouillée",
      tags: Array.isArray(voie.tags) ? voie.tags : []
    };
  });
}

function getShinobimancerClanKeys() {
  return Object.keys(NARUTO25E.clans ?? {}).filter((clanKey) => {
    return Boolean(NARUTO25E.clans?.[clanKey]);
  });
}

function getClanSkillLabel(clan = {}) {
  const skillKey = String(clan.skillKey ?? "");

  if (!skillKey) return "Aucune compétence obligatoire";

  return NARUTO25E.skillDefinitions?.[skillKey]?.label ?? skillKey;
}

function getClanPreviewData(clanKey, clan = {}) {
  const preview = SHINOBIMANCER_CLAN_PREVIEWS[clanKey] ?? {};
  const clanLabel = clan.label ?? clanKey;
  const lineageCap = NARUTO25E.getClanLineageCap?.(clanKey) ?? NARUTO25E.clanLineageCaps?.[clanKey] ?? 10;
  const features = Array.isArray(NARUTO25E.clanLineageFeatures?.[clanKey])
    ? NARUTO25E.clanLineageFeatures[clanKey]
    : [];

  const featureNames = features
    .slice(0, 3)
    .map((feature) => feature.label)
    .filter(Boolean);

  const generatedFeature = featureNames.length > 0
    ? `Lignée max ${lineageCap} · ${featureNames.join(", ")}`
    : `Lignée max ${lineageCap} · Pouvoirs de lignée préparés côté fiche.`;

  return {
    emblem: preview.emblem ?? clanLabel.slice(0, 1),
    tagline: preview.tagline ?? `${clanLabel} — clan jouable de Konoha.`,
    feature: preview.feature ?? generatedFeature,
    warning: preview.warning ?? "Les effets complexes de combat, techniques, blessures ou transformations seront automatisés dans les chantiers dédiés."
  };
}

const SHINOBIMANCER_AFFINITY_FALLBACKS = [
  { key: "katon", label: "Katon", icon: "火", tone: "Feu", description: "Puissance offensive, pression et techniques destructrices." },
  { key: "futon", label: "Fūton", icon: "風", tone: "Vent", description: "Vitesse, tranchant, projection et mobilité." },
  { key: "raiton", label: "Raïton", icon: "雷", tone: "Foudre", description: "Percussion, vitesse, stimulation et précision." },
  { key: "doton", label: "Doton", icon: "土", tone: "Terre", description: "Défense, stabilité, construction et contrôle du terrain." },
  { key: "suiton", label: "Suiton", icon: "水", tone: "Eau", description: "Adaptation, entrave, flux et contrôle de zone." },
  { key: "fuin", label: "Fūin", icon: "封", tone: "Sceau", description: "Sceaux, stockage, verrouillage et techniques de contrôle." }
];

const SHINOBIMANCER_STARTING_EQUIPMENT = {
  mainWeapons: [
    {
      key: "kunai",
      name: "Kunaï",
      type: "Arme principale",
      quantity: 1,
      description: "Arme courte polyvalente ninja. Simple, discrète et utilitaire."
    },
    {
      key: "tanto",
      name: "Tantō",
      type: "Arme principale",
      quantity: 1,
      description: "Lame courte japonaise, discrète et fiable pour un Shinobi mobile."
    },
    {
      key: "wakizashi",
      name: "Wakizashi",
      type: "Arme principale",
      quantity: 1,
      description: "Sabre court, compromis entre discrétion et combat rapproché."
    },
    {
      key: "katana",
      name: "Katana",
      type: "Arme principale",
      quantity: 1,
      description: "Sabre japonais emblématique, plus martial et visible."
    },
    {
      key: "ninjato",
      name: "Ninjatō",
      type: "Arme principale",
      quantity: 1,
      description: "Lame droite de Shinobi, pensée pour l’efficacité et l’usage utilitaire."
    }
  ],
  combatLots: [
    {
      key: "kunaiLot",
      name: "Kunaï — lot de jet",
      type: "Lot de combat",
      quantity: 10,
      description: "Lot de kunaï destinés au lancer, aux pièges et aux usages polyvalents."
    },
    {
      key: "shurikenLot",
      name: "Shuriken — lot de jet",
      type: "Lot de combat",
      quantity: 10,
      description: "Lot de shuriken légers pour distraire, harceler ou blesser à distance."
    },
    {
      key: "senbonLot",
      name: "Senbon — lot de jet",
      type: "Lot de combat",
      quantity: 10,
      description: "Lot de fines aiguilles de lancer, discrètes et précises."
    },
    {
      key: "explosiveNoteLot",
      name: "Note explosive — lot",
      type: "Lot de combat",
      quantity: 10,
      description: "Lot de notes explosives pour pièges, diversion et attaque."
    }
  ],
  fixed: [
    {
      key: "soldierPills",
      name: "Pilule du soldat",
      type: "Fixe",
      quantity: 5,
      description: "Pilules militaires standards accordées à tout Shinobi débutant."
    },
    {
      key: "minorChakraPill",
      name: "Pilule de chakra mineure",
      type: "Fixe",
      quantity: 1,
      description: "Pilule de chakra de base. Restaure 25 Chakra."
    },
    {
      key: "firstAidKit",
      name: "Kit de premiers soins",
      type: "Fixe",
      quantity: 1,
      description: "Kit médical de terrain basique."
    },
    {
      key: "survivalKit",
      name: "Kit de survie",
      type: "Fixe",
      quantity: 1,
      description: "Kit de base pour bivouac, déplacement et survie en mission."
    },
    {
      key: "technicalKit",
      name: "Kit technique",
      type: "Fixe",
      quantity: 1,
      description: "Outils simples pour manipulations techniques, pièges ou réparations."
    }
  ]
};

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

function purgeShinobimancerTemplateCache() {
  const matchesShinobimancer = (key) => {
    return String(key ?? "").includes("shinobimancer");
  };

  for (const key of Object.keys(globalThis._templateCache ?? {})) {
    if (matchesShinobimancer(key)) delete globalThis._templateCache[key];
  }

  for (const key of Object.keys(Handlebars.partials ?? {})) {
    if (matchesShinobimancer(key)) delete Handlebars.partials[key];
  }

  const foundryTemplateCache = foundry.applications?.handlebars?.templateCache ?? {};

  for (const key of Object.keys(foundryTemplateCache)) {
    if (matchesShinobimancer(key)) delete foundryTemplateCache[key];
  }
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
    const nextCost = typeof actor?.getBaseUpgradeCost === "function"
      ? actor.getBaseUpgradeCost(key)
      : null;

    const nextCostLabel = value >= max
      ? "Maximum atteint"
      : nextCost !== null
      ? `${nextCost} XP`
      : "Coût non défini";

    const hiddenLineageCap = key === "lign" && typeof actor?._getHiddenClanLineageCap === "function"
      ? actor._getHiddenClanLineageCap()
      : null;

    const effectiveLineage = key === "lign" && typeof actor?._getEffectiveLineageValue === "function"
      ? actor._getEffectiveLineageValue()
      : value;

    return {
      key,
      label: base.label ?? NARUTO25E.baseLabels?.[key] ?? key,
      value,
      bonus,
      total,
      max,
      absoluteMax,
      nextCost,
      nextCostLabel,
      percent: Math.clamp((total / 14) * 100, 0, 100),
      hiddenLineageCap,
      effectiveLineage,
      hasHiddenEffectiveValue: key === "lign" && hiddenLineageCap !== null && effectiveLineage !== value
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

function getHeritageModeRequestData(actor, modeKey) {
  const heritage = actor?.system?.heritage ?? {};
  const request = foundry.utils.getProperty(heritage, `requests.${modeKey}`) ?? {};
  const status = String(request.status ?? "none");
  const normalizedStatus = ["none", "pending", "accepted", "refused"].includes(status)
    ? status
    : "none";

  return {
    status: normalizedStatus,
    requestedAt: String(request.requestedAt ?? ""),
    requestedBy: String(request.requestedBy ?? ""),
    requestedByName: String(request.requestedByName ?? ""),
    resolvedAt: String(request.resolvedAt ?? ""),
    resolvedBy: String(request.resolvedBy ?? ""),
    resolvedByName: String(request.resolvedByName ?? ""),
    isNone: normalizedStatus === "none",
    isPending: normalizedStatus === "pending",
    isAccepted: normalizedStatus === "accepted",
    isRefused: normalizedStatus === "refused"
  };
}

function buildHybridAuthorizationState(actor, modeKey, allowed) {
  const request = getHeritageModeRequestData(actor, modeKey);
  const isGm = Boolean(game.user?.isGM);
  const isHybridRequestMode = ["hybridClan", "hybridVoie"].includes(modeKey);
  const creationLocked = Boolean(actor?.system?.progression?.creation?.locked);
  const canEditCreation = Boolean(actor?.isOwner || game.user?.isGM) && !creationLocked;

  const canRequestAuthorization =
    isHybridRequestMode
    && canEditCreation
    && !isGm
    && !allowed
    && request.isNone;

  const canAuthorizeDirectly =
    isHybridRequestMode
    && canEditCreation
    && isGm
    && !allowed
    && request.isNone;

  const canAcceptRequest =
    isHybridRequestMode
    && canEditCreation
    && isGm
    && !allowed
    && request.isPending;

  const canRefuseRequest =
    isHybridRequestMode
    && canEditCreation
    && isGm
    && !allowed
    && request.isPending;

  const canResetRequest =
    isHybridRequestMode
    && canEditCreation
    && isGm
    && !request.isNone;

  let statusLabel = allowed ? "Disponible" : "Verrouillé";
  let requestText = "";
  let cssClass = "";

  if (!allowed && !canRequestAuthorization && !canAuthorizeDirectly && !request.isPending && !request.isAccepted) {
    cssClass = "is-disabled";
  }

  if (canRequestAuthorization || canAuthorizeDirectly) {
    cssClass = "has-request-controls";
  }

  if (request.isPending) {
    statusLabel = "Demande en attente";
    requestText = request.requestedByName
      ? `Demande envoyée par ${request.requestedByName}.`
      : "Demande envoyée au MJ.";
    cssClass = "has-request-controls is-request-pending";
  }

  if (request.isAccepted) {
    statusLabel = "Demande acceptée";
    requestText = request.resolvedByName
      ? `Demande acceptée par ${request.resolvedByName}.`
      : "Demande acceptée par le MJ.";
    cssClass = allowed ? "is-request-accepted" : "has-request-controls is-request-accepted";
  }

  if (request.isRefused) {
    statusLabel = "Demande refusée ✕";
    requestText = request.resolvedByName
      ? `Demande refusée par ${request.resolvedByName}.`
      : "Demande refusée par le MJ.";
    cssClass = "is-disabled is-request-refused";
  }

  return {
    requestStatus: request.status,
    requestStatusLabel: statusLabel,
    requestText,
    requestPending: request.isPending,
    requestAccepted: request.isAccepted,
    requestRefused: request.isRefused,
    hasRequestState: !request.isNone,
    cssClass,
    canRequestAuthorization,
    canAuthorizeDirectly,
    canAcceptRequest,
    canRefuseRequest,
    canResetRequest
  };
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
  const gmOptions = actor?.system?.heritage?.gmOptions ?? {};
  const allowHybridClan = Boolean(gmOptions.allowHybridClan);
  const allowHybridVoie = Boolean(gmOptions.allowHybridVoie);

  return [
    {
      key: "clan",
      label: "Clan",
      selected: selectedMode === "clan",
      available: true,
      description: "Création classique autour d’un clan principal.",
      note: "Mode standard de création.",
      requestStatusLabel: "Disponible",
      requestText: "",
      cssClass: "",
      canRequestAuthorization: false,
      canAcceptRequest: false,
      canRefuseRequest: false,
      canResetRequest: false
    },
    {
      key: "voie",
      label: "Voie",
      selected: selectedMode === "voie",
      available: true,
      description: "Création fondée sur une voie plutôt qu’un clan.",
      note: "Mode actif : affiche les Voies jouables à l’étape Clan / Voie.",
      requestStatusLabel: "Disponible",
      requestText: "",
      cssClass: "",
      canRequestAuthorization: false,
      canAcceptRequest: false,
      canRefuseRequest: false,
      canResetRequest: false
    },
    {
      key: "hybridClan",
      label: "Clan hybride",
      selected: selectedMode === "hybridClan",
      available: allowHybridClan,
      description: "Clan principal et clan secondaire sous validation MJ.",
      note: allowHybridClan ? "Autorisé par le MJ." : "Nécessite une autorisation MJ.",
      ...buildHybridAuthorizationState(actor, "hybridClan", allowHybridClan)
    },
    {
      key: "hybridVoie",
      label: "Voie hybridée",
      selected: selectedMode === "hybridVoie",
      available: allowHybridVoie,
      description: "Clan principal accompagné d’une voie particulière.",
      note: allowHybridVoie ? "Autorisé par le MJ." : "Nécessite une autorisation MJ.",
      ...buildHybridAuthorizationState(actor, "hybridVoie", allowHybridVoie)
    },
    {
      key: "hiddenClan",
      label: "Clan caché / dissimulé",
      selected: selectedMode === "hiddenClan",
      available: true,
      description: "Clan officiel visible et Réel Clan mécanique dissimulé aux observateurs.",
      note: "Mode narratif avancé : le propriétaire et le MJ voient les deux lignées.",
      requestStatusLabel: "Disponible",
      requestText: "",
      cssClass: "",
      canRequestAuthorization: false,
      canAcceptRequest: false,
      canRefuseRequest: false,
      canResetRequest: false
    }
  ];
}

function buildClanCards(actor, options = {}) {
  const selectedPath = String(options.selectedPath ?? "heritage.clan");
  const cardRole = String(options.role ?? "mainClan");
  const excludedClan = String(options.excludeClan ?? "");
  const selectedClan = String(foundry.utils.getProperty(actor?.system ?? {}, selectedPath) ?? "");

  return getShinobimancerClanKeys().map((clanKey) => {
    const clan = NARUTO25E.clans?.[clanKey] ?? {};
    const skillLabel = getClanSkillLabel(clan);
    const preview = getClanPreviewData(clanKey, clan);
    const available = !excludedClan || clanKey !== excludedClan;

    return {
      key: clanKey,
      role: cardRole,
      emblem: preview.emblem,
      kamon: `systems/naruto-25e/assets/clans/kamon_${clanKey}.svg`,
      tagline: preview.tagline,
      feature: preview.feature,
      warning: preview.warning,
      label: clan.label ?? clanKey,
      selected: selectedClan === clanKey,
      available,
      village: NARUTO25E.villages?.[clan.village]?.label ?? "Konoha",
      skillLabel
    };
  });
}
function buildHiddenClanCards(actor, field = "officialClan") {
  const heritage = actor?.system?.heritage ?? {};
  const hiddenClan = heritage.hiddenClan ?? {};
  const selectedClan = String(hiddenClan[field] ?? "");

  return getShinobimancerClanKeys().map((clanKey) => {
    const clan = NARUTO25E.clans?.[clanKey] ?? {};
    const skillLabel = getClanSkillLabel(clan);
    const preview = getClanPreviewData(clanKey, clan);

    return {
      key: clanKey,
      emblem: preview.emblem,
      kamon: `systems/naruto-25e/assets/clans/kamon_${clanKey}.svg`,
      tagline: preview.tagline,
      feature: preview.feature,
      warning: preview.warning,
      label: clan.label ?? clanKey,
      selected: selectedClan === clanKey,
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

  const getForcedKey = (entry) => {
    if (!entry) return "";
    if (typeof entry === "object") return String(entry.key ?? entry.id ?? entry.value ?? "");
    return String(entry);
  };

  const getForcedSlot = (entry) => {
    if (!entry || typeof entry !== "object") return "";
    return String(entry.slot ?? "");
  };

  const forcedEntries = Array.isArray(forced) ? forced : [];
  const forcedKeys = forcedEntries.map(getForcedKey).filter(Boolean);

  const forcedPrimary = forcedEntries.find((entry) => getForcedSlot(entry) === "primary");
  const forcedSecondary = forcedEntries.find((entry) => getForcedSlot(entry) === "secondary");

  const entries = Object.keys(chakraAffinities).length > 0
    ? Object.entries(chakraAffinities).slice(0, 10).map(([key, affinity]) => ({
        key,
        label: affinity.label ?? key,
        icon: affinity.icon ?? " chakra ",
        tone: affinity.tone ?? "Chakra",
        description: affinity.summary ?? affinity.description ?? "Affinité de Chakra préparée pour la création guidée.",
        playstyle: affinity.playstyle ?? "",
        strengths: Array.isArray(affinity.strengths) ? affinity.strengths : [],
        weakness: affinity.weakness ?? affinity.weaknesses ?? "",
        recommendedFor: affinity.recommendedFor ?? "",
        previewTags: Array.isArray(affinity.previewTags) ? affinity.previewTags : []
      }))
    : SHINOBIMANCER_AFFINITY_FALLBACKS.map((affinity) => ({
        ...affinity,
        playstyle: "",
        strengths: [],
        weakness: "",
        recommendedFor: "",
        previewTags: []
      }));

  return entries.map((affinity) => {
    const forcedEntry = forcedEntries.find((entry) => getForcedKey(entry) === affinity.key);
    const forcedSlot = getForcedSlot(forcedEntry);
    const isPrimary = affinity.key === primary;
    const isSecondary = affinity.key === secondary;
    const isForced = forcedKeys.includes(affinity.key);
    const primaryLocked = Boolean(forcedPrimary);
    const secondaryLocked = Boolean(forcedSecondary);
    const bothSlotsLocked = primaryLocked && secondaryLocked;

    let disabled = false;

    if (isForced) disabled = true;
    if (bothSlotsLocked && !isForced) disabled = true;

    return {
      key: affinity.key,
      label: affinity.label,
      icon: affinity.icon,
      tone: affinity.tone,
      description: affinity.description,
      playstyle: affinity.playstyle,
      strengths: affinity.strengths.slice(0, 2),
      weakness: affinity.weakness,
      recommendedFor: affinity.recommendedFor,
      previewTags: affinity.previewTags.slice(0, 4),
      isPrimary,
      isSecondary,
      isSelected: isPrimary || isSecondary,
      isForced,
      disabled,
      status: isForced
        ? forcedSlot === "primary"
          ? "Principale imposée"
          : forcedSlot === "secondary"
          ? "Secondaire imposée"
          : "Imposée"
        : isPrimary
        ? "Principale"
        : isSecondary
        ? "Secondaire"
        : disabled
        ? "Indisponible"
        : "Disponible"
    };
  });
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

  const countableCreationSources = new Set([
    "manual",
    "heritage",
    "affinityForced",
    "affinityPrimary",
    "affinitySecondary",
    "affinityExtra"
  ]);

  let usedInitialSkills = 0;

  for (const skill of Object.values(skills)) {
    const sources = Array.isArray(skill.creationSources)
      ? skill.creationSources
      : [];

    const hasCountingSource = sources.some((source) => countableCreationSources.has(source));
    const hasFreePrimaryAffinity = sources.includes("affinityPrimaryFree");

    const counts =
      hasCountingSource
      && !(hasFreePrimaryAffinity && sources.every((source) => {
        return source === "manual" || source === "affinityPrimaryFree";
      }));

    if (counts) usedInitialSkills += 1;
  }

  const maxInitialSkills = 5;
  const remainingInitialSkills = Math.max(0, maxInitialSkills - usedInitialSkills);

  return categoryOrder.map((category) => {
    const categorySkills = Object.entries(definitions)
      .filter(([, definition]) => definition.category === category)
      .map(([key, definition]) => {
        const skill = skills[key] ?? {};
        const sources = Array.isArray(skill.creationSources) ? skill.creationSources : [];
        const natural = Number(skill.natural ?? 1);
        const nextCost = typeof actor?.getSkillUpgradeCost === "function"
          ? actor.getSkillUpgradeCost(key)
          : null;
        const cap = typeof actor?.getSkillCap === "function"
          ? actor.getSkillCap(key)
          : 3;

        const lockedBySource = sources.some((source) => {
          return source === "common"
            || source === "heritage"
            || source === "affinityForced"
            || source === "affinityPrimary"
            || source === "affinityPrimaryFree"
            || source === "affinitySecondary"
            || source === "affinityExtra";
        });

        const owned = Boolean(skill.owned ?? definition.ownedByDefault);
        const manualOwned = Boolean(skill.manualOwned);
        const selectableAsInitial =
          !owned
          && !definition.ownedByDefault
          && definition.category !== "clan"
          && remainingInitialSkills > 0;

        const canIncrease =
          (owned && natural < cap && nextCost !== null)
          || selectableAsInitial;

        const canDecrease = natural > 1 || (manualOwned && !lockedBySource);

        const nextCostLabel = !owned
          ? selectableAsInitial
            ? "Choix initial"
            : "Non disponible"
          : natural >= cap
          ? "Maximum atteint"
          : nextCost !== null
          ? `${nextCost} XP`
          : "Coût non défini";

        return {
          key,
          label: definition.label ?? key,
          base: definition.base,
          baseLabel: NARUTO25E.baseLabels?.[definition.base] ?? definition.base,
          owned,
          manualOwned,
          lockedBySource,
          selectableAsInitial,
          natural,
          total: Number(skill.total ?? natural),
          cap,
          nextCost,
          nextCostLabel,
          sourceText: sources.length > 0
            ? sources.map((source) => sourceLabels[source] ?? source).join(", ")
            : definition.ownedByDefault
            ? "Commune"
            : "Disponible",
          canIncrease,
          canDecrease
        };
      });

    return {
      key: category,
      label: NARUTO25E.skillCategoryLabels?.[category] ?? NARUTO25E.skillCategories?.[category] ?? category,
      skills: categorySkills
    };
  });
}
function buildEquipmentPreview(actor) {
  const startingEquipment = actor?.system?.progression?.creation?.startingEquipment ?? {};
  const selectedMainWeapon = String(startingEquipment.mainWeapon ?? "");
  const selectedCombatLots = Array.isArray(startingEquipment.combatLots)
    ? startingEquipment.combatLots
    : [];

  const normalizeCard = (item) => ({
    key: item.key,
    name: item.name,
    type: item.type,
    quantity: item.quantity,
    quantityLabel: item.quantity > 1 ? `×${item.quantity}` : "×1",
    description: item.description
  });

  return {
    mainWeapons: SHINOBIMANCER_STARTING_EQUIPMENT.mainWeapons.map((item) => {
      const card = normalizeCard(item);
      card.selected = card.key === selectedMainWeapon;
      return card;
    }),
    combatLots: SHINOBIMANCER_STARTING_EQUIPMENT.combatLots.map((item) => {
      const card = normalizeCard(item);
      card.selected = selectedCombatLots.includes(card.key);
      return card;
    }),
    fixed: SHINOBIMANCER_STARTING_EQUIPMENT.fixed.map(normalizeCard),
    selectedMainWeapon,
    selectedMainWeaponCount: selectedMainWeapon ? 1 : 0,
    requiredMainWeaponCount: 1,
    selectedCombatLots,
    selectedCombatLotCount: selectedCombatLots.length,
    requiredCombatLotCount: 2
  };
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
      classes: ["naruto-25e", "shinobimancer", "shinobimancer-choice-window", "shinobimancer-maquette-v2"],
      title: "Création du Shinobi",
      template: "systems/naruto-25e/templates/apps/shinobimancer-choice.hbs",
      width: 1000,
      height: "auto",
      resizable: true
    });
  }

  getData(options = {}) {
    purgeShinobimancerTemplateCache();

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
        text: "Ouvre l’assistant de création visuel avec les clans jouables étendus, les obligations de création et le résumé de dossier.",
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
      classes: ["naruto-25e", "shinobimancer", "shinobimancer-window", "shinobimancer-maquette-v2"],
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
    purgeShinobimancerTemplateCache();

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
    context.canFinalizeCreation = Boolean(this.actor?.isOwner || game.user?.isGM)
      && !Boolean(this.actor?.system?.progression?.creation?.locked)
      && Boolean(validation.valid);
    context.creationLocked = Boolean(this.actor?.system?.progression?.creation?.locked);

    context.baseRows = baseRows;
    context.baseRadarSvg = baseRadarSvg;
    context.baseCap = typeof this.actor?.getBaseCap === "function" ? this.actor.getBaseCap() : 3;

    const heritage = system.heritage ?? {};
    const hiddenClan = heritage.hiddenClan ?? {};
    const hiddenClanAwareness = String(hiddenClan.awareness ?? "ignorant");
    const hiddenClanState = NARUTO25E.getHiddenClanAwarenessState?.(hiddenClanAwareness) ?? {
      label: "Dans l’ignorance",
      summary: "Le personnage ignore totalement sa vraie lignée.",
      maxCreationLineage: 0
    };

    const heritageMode = String(heritage.mode ?? "clan");

    context.villageCards = buildVillageCards(this.actor);
    context.heritageModeCards = buildHeritageModeCards(this.actor);
    context.clanCards = buildClanCards(this.actor, {
      selectedPath: "heritage.clan",
      role: "mainClan"
    });
    context.secondaryClanCards = buildClanCards(this.actor, {
      selectedPath: "heritage.hybrid.secondaryClan",
      role: "secondaryClan",
      excludeClan: String(heritage.clan ?? "")
    });
    context.hiddenClanOfficialCards = buildHiddenClanCards(this.actor, "officialClan");
    context.hiddenClanRealCards = buildHiddenClanCards(this.actor, "realClan");
    context.voieCards = buildVoieCards(this.actor);

    context.heritageMode = heritageMode;
    context.clanOnlyMode = heritageMode === "clan";
    context.voieOnlyMode = heritageMode === "voie";
    context.hybridClanMode = heritageMode === "hybridClan";
    context.hybridVoieMode = heritageMode === "hybridVoie";
    context.hiddenClanMode = heritageMode === "hiddenClan";
    context.hiddenClanAwarenessStates = Object.entries(NARUTO25E.hiddenClanAwarenessStates ?? {}).map(([key, state]) => ({
      key,
      label: state.label,
      summary: state.summary,
      selected: key === hiddenClanAwareness
    }));
    context.hiddenClanSummary = {
      officialClan: String(hiddenClan.officialClan ?? ""),
      realClan: String(hiddenClan.realClan ?? ""),
      awareness: hiddenClanAwareness,
      awarenessLabel: hiddenClanState.label,
      awarenessSummary: hiddenClanState.summary,
      unlocked: Boolean(hiddenClan.unlocked)
    };
    context.affinityCards = buildAffinityCards(this.actor);
    context.skillGroups = buildSkillPreview(this.actor);
    context.equipmentPreview = buildEquipmentPreview(this.actor);
    const nindo = system.nindo ?? {};
    const nindoChoiceMode = nindo.choiceMode ?? "preset";
    const nindoPresetMode = nindoChoiceMode === "preset";
    const nindoCustomMode = !nindoPresetMode;

    context.nindoPresetMode = nindoPresetMode;
    context.nindoCustomMode = nindoCustomMode;

    context.nindoChoiceModes = Object.entries(NARUTO25E.nindoChoiceModes ?? {}).map(([key, label]) => ({
      key,
      label,
      selected: key === nindoChoiceMode
    }));

    context.nindoPresets = Object.entries(NARUTO25E.nindoPresets ?? {}).map(([key, preset]) => ({
      key,
      label: preset.name ?? key,
      description: preset.description ?? "",
      selected: nindoPresetMode && key === (nindo.preset ?? "")
    }));

    const selectedNindoPreset = nindoPresetMode
      ? NARUTO25E.nindoPresets?.[nindo.preset ?? ""]
      : null;

    context.selectedNindoPreset = selectedNindoPreset
      ? {
          name: selectedNindoPreset.name ?? nindo.preset,
          description: selectedNindoPreset.description ?? ""
        }
      : null;

    const chakraSpecState = system.chakra?.specializationState ?? {
      available: 1,
      spent: 0,
      remaining: 1,
      overLimit: false
    };

    context.chakraSpecializationState = chakraSpecState;

    context.chakraSpecializations = (NARUTO25E.chakraSpecializationOrder ?? []).map((key) => {
      const definition = NARUTO25E.chakraSpecializations?.[key] ?? {};
      const value = Number(system.chakra?.specializations?.[key] ?? 0);
      const maxStacks = Number(definition.maxStacks ?? 1);

      return {
        key,
        label: definition.label ?? key,
        value,
        maxStacks,
        unique: Boolean(definition.unique),
        specialOnly: Boolean(definition.specialOnly),
        effect: definition.effect ?? "",
        canIncrease: value < maxStacks && Number(chakraSpecState.remaining ?? 0) > 0,
        canDecrease: value > 0
      };
    });

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

    const canEditCreation = () => {
      if (!this.actor) return false;

      if (!this.actor.isOwner && !game.user?.isGM) {
        ui.notifications.warn("Tu n’as pas les droits nécessaires pour modifier ce dossier.");
        return false;
      }

      if (this.actor.isCreationLocked?.()) {
        ui.notifications.warn("Cette création est déjà validée.");
        return false;
      }

      return true;
    };

    const updateActorAndRender = async (updateData) => {
      if (!canEditCreation()) return;

      await this.actor.update(updateData);
      this.render(false);
      this.sourceSheet?.render?.(false);
    };

    html.find(".shinobimancer-close").on("click", (event) => {
      event.preventDefault();
      this.close();
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

    const pickLocalImageFile = async () => {
      return new Promise((resolve) => {
        const input = document.createElement("input");

        input.type = "file";
        input.accept = "image/*";

        input.addEventListener("change", () => {
          resolve(input.files?.[0] ?? null);
        }, {
          once: true
        });

        input.click();
      });
    };

    const getPortraitUploadSettings = () => {
      let source = "forgevtt";
      let path = "worlds/Naruto/PJ";

      try {
        source = game.settings.get("naruto-25e", "portraitUploadSource") || source;
      } catch (error) {
        source = "forgevtt";
      }

      try {
        path = game.settings.get("naruto-25e", "portraitUploadPath") || path;
      } catch (error) {
        path = "worlds/Naruto/PJ";
      }

      return {
        source,
        path: String(path).replace(/^\/+|\/+$/g, "")
      };
    };

    const uploadPortraitFromComputer = async () => {
      if (!canEditCreation()) return;

      const file = await pickLocalImageFile();

      if (!file) return;

      if (!String(file.type ?? "").startsWith("image/")) {
        ui.notifications.warn("Le fichier choisi n’est pas une image.");
        return;
      }

      const { source, path } = getPortraitUploadSettings();

      try {
        try {
          await FilePicker.createDirectory(source, path, {
            notify: false
          });
        } catch (directoryError) {
          console.debug("Naruto 2.5e | Dossier portrait déjà existant ou non créable automatiquement.", {
            source,
            path,
            directoryError
          });
        }

        const result = await FilePicker.upload(source, path, file, {}, {
          notify: true
        });

        const uploadedPath = result?.path ?? result?.url ?? result;

        if (!uploadedPath) {
          ui.notifications.warn("L’upload du portrait n’a pas renvoyé de chemin utilisable.");
          console.warn("Naruto 2.5e | Upload portrait sans chemin exploitable.", {
            result,
            source,
            path
          });
          return;
        }

        await this.actor.update({
          img: uploadedPath
        });

        ui.notifications.info(`Portrait importé pour ${this.actor.name}.`);

        this.render(false);
        this.sourceSheet?.render?.(false);
      } catch (error) {
        console.error("Naruto 2.5e | Upload du portrait impossible.", error);
        ui.notifications.error("Impossible d’importer le portrait. Voir la console ou demander au MJ.");
      }
    };

    const browseExistingPortrait = async () => {
      if (!canEditCreation()) return;

      const picker = new FilePicker({
        type: "image",
        current: this.actor?.img ?? "",
        callback: async (path) => {
          await this.actor.update({
            img: path
          });

          this.render(false);
          this.sourceSheet?.render?.(false);
        }
      });

      picker.browse();
    };

    const openPortraitDialog = async () => {
      if (!canEditCreation()) return;

      const { source, path } = getPortraitUploadSettings();

      const content = `
        <div class="naruto-portrait-upload-dialog">
          <p>
            Importe un portrait depuis ton ordinateur.
          </p>
          <p>
            Dossier cible : <strong>${foundry.utils.escapeHTML?.(path) ?? path}</strong>
          </p>
          <p class="hint">
            Source : ${foundry.utils.escapeHTML?.(source) ?? source}
          </p>
        </div>
      `;

      const buttons = {
        upload: {
          label: "Importer une image",
          callback: async () => uploadPortraitFromComputer()
        }
      };

      if (game.user?.isGM) {
        buttons.browse = {
          label: "Choisir une image existante",
          callback: async () => browseExistingPortrait()
        };
      }

      buttons.cancel = {
        label: "Annuler"
      };

      await new Dialog({
        title: "Changer le portrait",
        content,
        buttons,
        default: "upload"
      }).render(true);
    };

    html.find(".shinobimancer-portrait-picker").on("click", async (event) => {
      event.preventDefault();

      await openPortraitDialog();
    });

    html.find("[data-shinobimancer-field]").on("change", async (event) => {
      event.preventDefault();

      const field = event.currentTarget?.dataset?.shinobimancerField;
      if (!field) return;

      const value = event.currentTarget.value ?? "";

      if (field === "name") {
        await updateActorAndRender({ name: value });
        return;
      }

      if (field === "system.nindo.choiceMode") {
        const updateData = {
          [field]: value
        };

        if (value !== "preset") {
          updateData["system.nindo.preset"] = "";
        }

        if (value === "preset") {
          updateData["system.identity.nindoText"] = "";
        }

        await updateActorAndRender(updateData);
        return;
      }

      if (field === "system.nindo.preset") {
        await updateActorAndRender({
          [field]: value,
          "system.identity.nindoText": ""
        });
        return;
      }

      await updateActorAndRender({
        [field]: value
      });
    });

    html.find(".shinobimancer-village-card").on("click", async (event) => {
      event.preventDefault();

      const villageKey = event.currentTarget?.dataset?.village;
      const village = NARUTO25E.villages?.[villageKey];

      if (!villageKey || !village) return;

      if (!village.selectable) {
        ui.notifications.warn("Ce village n’est pas encore disponible.");
        return;
      }

      await updateActorAndRender({
        "system.heritage.village": villageKey,
        "system.identity.village": villageKey
      });
    });

        html.find(".shinobimancer-heritage-request-action").on("click", async (event) => {
      event.preventDefault();
      event.stopPropagation();

      if (!canEditCreation()) return;

      const mode = String(event.currentTarget?.dataset?.heritageRequestMode ?? "");
      const action = String(event.currentTarget?.dataset?.heritageRequestAction ?? "");

      if (!["hybridClan", "hybridVoie"].includes(mode)) return;
      if (!["request", "authorize", "accept", "refuse", "reset"].includes(action)) return;

      const allowField = mode === "hybridClan"
        ? "allowHybridClan"
        : "allowHybridVoie";

      const now = new Date().toISOString();
      const updateData = {};

      if (action === "request") {
        if (game.user?.isGM) {
          ui.notifications.warn("Le MJ peut autoriser directement ce mode.");
          return;
        }

        updateData[`system.heritage.requests.${mode}.status`] = "pending";
        updateData[`system.heritage.requests.${mode}.requestedAt`] = now;
        updateData[`system.heritage.requests.${mode}.requestedBy`] = game.user?.id ?? "";
        updateData[`system.heritage.requests.${mode}.requestedByName`] = game.user?.name ?? "";
        updateData[`system.heritage.requests.${mode}.resolvedAt`] = "";
        updateData[`system.heritage.requests.${mode}.resolvedBy`] = "";
        updateData[`system.heritage.requests.${mode}.resolvedByName`] = "";

        await updateActorAndRender(updateData);
        ui.notifications.info("Demande envoyée au MJ.");
        return;
      }

      if (!game.user?.isGM) {
        ui.notifications.warn("Seul le MJ peut répondre à cette demande.");
        return;
      }

      if (action === "authorize") {
        updateData[`system.heritage.gmOptions.${allowField}`] = true;
        updateData[`system.heritage.requests.${mode}.status`] = "accepted";
        updateData[`system.heritage.requests.${mode}.requestedAt`] = "";
        updateData[`system.heritage.requests.${mode}.requestedBy`] = "";
        updateData[`system.heritage.requests.${mode}.requestedByName`] = "";
        updateData[`system.heritage.requests.${mode}.resolvedAt`] = now;
        updateData[`system.heritage.requests.${mode}.resolvedBy`] = game.user?.id ?? "";
        updateData[`system.heritage.requests.${mode}.resolvedByName`] = game.user?.name ?? "";

        await updateActorAndRender(updateData);
        ui.notifications.info("Mode autorisé par le MJ.");
        return;
      }

      if (action === "accept") {
        updateData[`system.heritage.gmOptions.${allowField}`] = true;
        updateData[`system.heritage.requests.${mode}.status`] = "accepted";
        updateData[`system.heritage.requests.${mode}.resolvedAt`] = now;
        updateData[`system.heritage.requests.${mode}.resolvedBy`] = game.user?.id ?? "";
        updateData[`system.heritage.requests.${mode}.resolvedByName`] = game.user?.name ?? "";

        await updateActorAndRender(updateData);
        ui.notifications.info("Demande acceptée.");
        return;
      }

      if (action === "refuse") {
        updateData[`system.heritage.gmOptions.${allowField}`] = false;
        updateData[`system.heritage.requests.${mode}.status`] = "refused";
        updateData[`system.heritage.requests.${mode}.resolvedAt`] = now;
        updateData[`system.heritage.requests.${mode}.resolvedBy`] = game.user?.id ?? "";
        updateData[`system.heritage.requests.${mode}.resolvedByName`] = game.user?.name ?? "";

        await updateActorAndRender(updateData);
        ui.notifications.info("Demande refusée.");
        return;
      }

      if (action === "reset") {
        updateData[`system.heritage.gmOptions.${allowField}`] = false;
        updateData[`system.heritage.requests.${mode}.status`] = "none";
        updateData[`system.heritage.requests.${mode}.requestedAt`] = "";
        updateData[`system.heritage.requests.${mode}.requestedBy`] = "";
        updateData[`system.heritage.requests.${mode}.requestedByName`] = "";
        updateData[`system.heritage.requests.${mode}.resolvedAt`] = "";
        updateData[`system.heritage.requests.${mode}.resolvedBy`] = "";
        updateData[`system.heritage.requests.${mode}.resolvedByName`] = "";

        const currentMode = String(this.actor.system?.heritage?.mode ?? "clan");

        if (mode === "hybridClan" && currentMode === "hybridClan") {
          updateData["system.heritage.mode"] = "clan";
          updateData["system.heritage.hybrid.secondaryClan"] = "";
          updateData["system.heritage.hybrid.reason"] = "";
        }

        if (mode === "hybridVoie" && currentMode === "hybridVoie") {
          updateData["system.heritage.mode"] = "voie";
          updateData["system.heritage.hybrid.secondaryClan"] = "";
          updateData["system.heritage.hybrid.reason"] = "";
        }

        await updateActorAndRender(updateData);
        ui.notifications.info("Demande réinitialisée.");
      }
    });

    html.find(".shinobimancer-heritage-card").on("click", async (event) => {
      event.preventDefault();

      const mode = event.currentTarget?.dataset?.heritageMode;
      if (!mode) return;

      if (event.target?.closest?.(".shinobimancer-heritage-request-action")) {
        return;
      }

      const cardIsAvailable = event.currentTarget?.dataset?.available === "true";

      if (!cardIsAvailable) {
        if (["hybridClan", "hybridVoie"].includes(String(mode))) {
          ui.notifications.warn("Ce mode d’héritage nécessite une autorisation MJ.");
        } else {
          ui.notifications.warn("Ce mode d’héritage n’est pas encore disponible dans le Shinobimancer.");
        }

        return;
      }

      const updateData = {
        "system.heritage.mode": mode
      };

      if (mode === "clan") {
        updateData["system.heritage.voie"] = "";
        updateData["system.heritage.hybrid.secondaryClan"] = "";
        updateData["system.heritage.hybrid.reason"] = "";
      }

      if (mode === "voie") {
        updateData["system.heritage.clan"] = "";
        updateData["system.heritage.hybrid.secondaryClan"] = "";
        updateData["system.heritage.hybrid.reason"] = "";
      }

      if (mode === "hybridClan") {
        updateData["system.heritage.voie"] = "";
      }

      if (mode === "hybridVoie") {
        updateData["system.heritage.hybrid.secondaryClan"] = "";
        updateData["system.heritage.hybrid.reason"] = "";
      }

      if (mode === "hiddenClan") {
        updateData["system.heritage.clan"] = "";
        updateData["system.heritage.voie"] = "";
        updateData["system.heritage.hybrid.secondaryClan"] = "";
        updateData["system.heritage.hybrid.reason"] = "";
        updateData["system.heritage.hiddenClan.unlocked"] = false;
      }

      await updateActorAndRender(updateData);
    });

    html.find(".shinobimancer-clan-card").on("click", async (event) => {
      event.preventDefault();

      if (!canEditCreation()) return;

      if (event.currentTarget.classList.contains("shinobimancer-hidden-clan-card")) {
        return;
      }

      const clanKey = event.currentTarget?.dataset?.clan;
      if (!clanKey) return;

      const available = event.currentTarget?.dataset?.available !== "false";
      if (!available) {
        ui.notifications.warn("Ce choix de clan n’est pas disponible dans ce rôle.");
        return;
      }

      const role = String(event.currentTarget?.dataset?.clanRole ?? "mainClan");
      const currentMode = String(this.actor.system?.heritage?.mode ?? "clan");
      const updateData = {};

      if (role === "secondaryClan") {
        updateData["system.heritage.mode"] = "hybridClan";
        updateData["system.heritage.hybrid.secondaryClan"] = clanKey;
        updateData["system.heritage.voie"] = "";
      } else {
        updateData["system.heritage.clan"] = clanKey;
        updateData["system.identity.clan"] = clanKey;

        if (currentMode === "hybridVoie") {
          updateData["system.heritage.mode"] = "hybridVoie";
          updateData["system.heritage.hybrid.secondaryClan"] = "";
          updateData["system.heritage.hybrid.reason"] = "";
        } else if (currentMode === "hybridClan") {
          updateData["system.heritage.mode"] = "hybridClan";
          updateData["system.heritage.voie"] = "";
        } else {
          updateData["system.heritage.mode"] = "clan";
          updateData["system.heritage.voie"] = "";
          updateData["system.heritage.hybrid.secondaryClan"] = "";
          updateData["system.heritage.hybrid.reason"] = "";
        }
      }

      await updateActorAndRender(updateData);
    });

    html.find(".shinobimancer-voie-card").on("click", async (event) => {
      event.preventDefault();

      if (!canEditCreation()) return;

      const voieKey = event.currentTarget?.dataset?.voie;
      if (!voieKey) return;

      const available = event.currentTarget?.dataset?.available === "true";
      if (!available) {
        ui.notifications.warn("Cette voie n’est pas disponible pour ce village ou cette version.");
        return;
      }

      const currentMode = String(this.actor.system?.heritage?.mode ?? "clan");
      const updateData = {
        "system.heritage.voie": voieKey
      };

      if (currentMode === "hybridVoie") {
        updateData["system.heritage.mode"] = "hybridVoie";
        updateData["system.heritage.hybrid.secondaryClan"] = "";
        updateData["system.heritage.hybrid.reason"] = "";
      } else {
        updateData["system.heritage.mode"] = "voie";
        updateData["system.heritage.clan"] = "";
        updateData["system.identity.clan"] = "";
        updateData["system.heritage.hybrid.secondaryClan"] = "";
        updateData["system.heritage.hybrid.reason"] = "";
      }

      await updateActorAndRender(updateData);
    });

    html.find(".shinobimancer-hidden-clan-card").on("click", async (event) => {
      event.preventDefault();

      if (!canEditCreation()) return;

      const clanKey = event.currentTarget?.dataset?.clan;
      const role = event.currentTarget?.dataset?.hiddenClanRole;

      if (!clanKey || !role) return;

      if (!["officialClan", "realClan"].includes(role)) return;

      const updateData = {
        [`system.heritage.hiddenClan.${role}`]: clanKey
      };

      if (role === "officialClan") {
        updateData["system.identity.clan"] = clanKey;
      }

      await updateActorAndRender(updateData);
    });

    html.find(".shinobimancer-hidden-clan-awareness").on("change", async (event) => {
      event.preventDefault();

      if (!canEditCreation()) return;

      const awareness = event.currentTarget?.value ?? "ignorant";

      await updateActorAndRender({
        "system.heritage.hiddenClan.awareness": awareness,
        "system.heritage.hiddenClan.unlocked": false
      });
    });

    html.find(".shinobimancer-base-increase").on("click", async (event) => {
      event.preventDefault();

      if (!canEditCreation()) return;

      const baseKey = event.currentTarget?.dataset?.base;
      if (!baseKey || typeof this.actor.increaseBase !== "function") return;

      await this.actor.increaseBase(baseKey);
      this.render(false);
      this.sourceSheet?.render?.(false);
    });

    html.find(".shinobimancer-base-decrease").on("click", async (event) => {
      event.preventDefault();

      if (!canEditCreation()) return;

      const baseKey = event.currentTarget?.dataset?.base;
      if (!baseKey || typeof this.actor.decreaseBase !== "function") return;

      await this.actor.decreaseBase(baseKey);
      this.render(false);
      this.sourceSheet?.render?.(false);
    });

    html.find(".shinobimancer-affinity-card").on("click", async (event) => {
      event.preventDefault();

      if (!canEditCreation()) return;

      const affinityKey = event.currentTarget?.dataset?.affinity;
      if (!affinityKey) return;

      const chakraAffinities = this.actor.system.chakra?.affinities ?? {};
      const forcedEntries = Array.isArray(chakraAffinities.forced) ? chakraAffinities.forced : [];

      const getForcedKey = (entry) => {
        if (!entry) return "";
        if (typeof entry === "object") return String(entry.key ?? entry.id ?? entry.value ?? "");
        return String(entry);
      };

      const getForcedSlot = (entry) => {
        if (!entry || typeof entry !== "object") return "";
        return String(entry.slot ?? "");
      };

      const forcedPrimary = forcedEntries.find((entry) => getForcedSlot(entry) === "primary");
      const forcedSecondary = forcedEntries.find((entry) => getForcedSlot(entry) === "secondary");
      const forcedKeys = forcedEntries.map(getForcedKey).filter(Boolean);

      if (forcedKeys.includes(affinityKey)) {
        ui.notifications.info("Cette affinité est imposée par l’héritage et ne peut pas être retirée.");
        return;
      }

      if (forcedPrimary && forcedSecondary) {
        ui.notifications.warn("Les deux affinités naturelles sont imposées par l’héritage.");
        return;
      }

      const currentPrimary = chakraAffinities.primary ?? "";
      const currentSecondary = chakraAffinities.secondary ?? "";

      const updateData = {};

      if (currentPrimary === affinityKey && !forcedPrimary) {
        updateData["system.chakra.affinities.primary"] = currentSecondary;
        updateData["system.chakra.affinities.secondary"] = "";
        await updateActorAndRender(updateData);
        return;
      }

      if (currentSecondary === affinityKey && !forcedSecondary) {
        updateData["system.chakra.affinities.secondary"] = "";
        await updateActorAndRender(updateData);
        return;
      }

      if (!currentPrimary && !forcedPrimary) {
        updateData["system.chakra.affinities.primary"] = affinityKey;
        await updateActorAndRender(updateData);
        return;
      }

      if (!currentSecondary && !forcedSecondary && currentPrimary !== affinityKey) {
        updateData["system.chakra.affinities.secondary"] = affinityKey;
        await updateActorAndRender(updateData);
        return;
      }

      ui.notifications.warn("Deux affinités naturelles sont déjà sélectionnées.");
    });

    html.find(".shinobimancer-chakra-specialization-increase").on("click", async (event) => {
      event.preventDefault();

      if (!canEditCreation()) return;

      const key = event.currentTarget?.dataset?.specialization;
      if (!key || typeof this.actor.increaseChakraSpecialization !== "function") return;

      await this.actor.increaseChakraSpecialization(key);
      this.render(false);
      this.sourceSheet?.render?.(false);
    });

    html.find(".shinobimancer-chakra-specialization-decrease").on("click", async (event) => {
      event.preventDefault();

      if (!canEditCreation()) return;

      const key = event.currentTarget?.dataset?.specialization;
      if (!key || typeof this.actor.decreaseChakraSpecialization !== "function") return;

      await this.actor.decreaseChakraSpecialization(key);
      this.render(false);
      this.sourceSheet?.render?.(false);
    });

    const countInitialSkills = () => {
      const countableSources = new Set([
        "manual",
        "heritage",
        "affinityForced",
        "affinityPrimary",
        "affinitySecondary",
        "affinityExtra"
      ]);

      let count = 0;

      for (const skill of Object.values(this.actor.system.skills ?? {})) {
        const sources = Array.isArray(skill.creationSources)
          ? skill.creationSources
          : [];

        const hasCountingSource = sources.some((source) => countableSources.has(source));
        const hasFreePrimaryAffinity = sources.includes("affinityPrimaryFree");

        const counts =
          hasCountingSource
          && !(hasFreePrimaryAffinity && sources.every((source) => {
            return source === "manual" || source === "affinityPrimaryFree";
          }));

        if (counts) count += 1;
      }

      return count;
    };

    const isSkillLockedBySource = (skill) => {
      const sources = Array.isArray(skill?.creationSources) ? skill.creationSources : [];

      return sources.some((source) => {
        return source === "common"
          || source === "heritage"
          || source === "affinityForced"
          || source === "affinityPrimary"
          || source === "affinityPrimaryFree"
          || source === "affinitySecondary"
          || source === "affinityExtra";
      });
    };

    const chooseInitialSkill = async (skillKey) => {
      if (!canEditCreation()) return;

      const definition = NARUTO25E.skillDefinitions?.[skillKey];
      if (!definition) return;

      const skill = this.actor.system.skills?.[skillKey] ?? {};
      const owned = Boolean(skill.owned);
      const manualOwned = Boolean(skill.manualOwned);
      const lockedBySource = isSkillLockedBySource(skill);

      if (owned) {
        if (!manualOwned || lockedBySource) {
          ui.notifications.info("Cette compétence est accordée par une source fixe et ne peut pas être retirée ici.");
          return;
        }

        const confirmedRemove = await Dialog.confirm({
          title: "Retirer une compétence de création",
          content: `
            <p>Veux-tu retirer <strong>${definition.label}</strong> de tes compétences de création ?</p>
            <p>Elle ne comptera plus dans ta limite de 5 compétences initiales.</p>
          `,
          yes: () => true,
          no: () => false,
          defaultYes: false
        });

        if (!confirmedRemove) return;

        await updateActorAndRender({
          [`system.skills.${skillKey}.owned`]: false,
          [`system.skills.${skillKey}.manualOwned`]: false
        });

        return;
      }

      if (definition.ownedByDefault || definition.category === "clan") {
        ui.notifications.info("Cette compétence ne peut pas être choisie manuellement à la création.");
        return;
      }

      const usedInitialSkills = countInitialSkills();

      if (usedInitialSkills >= 5) {
        ui.notifications.warn("La limite de 5 compétences de création est déjà atteinte.");
        return;
      }

      const confirmedAdd = await Dialog.confirm({
        title: "Choisir une compétence de création",
        content: `
          <p>Veux-tu prendre <strong>${definition.label}</strong> dans ta limite de 5 compétences de création ?</p>
          <p>Compétences utilisées actuellement : <strong>${usedInitialSkills} / 5</strong>.</p>
        `,
        yes: () => true,
        no: () => false,
        defaultYes: false
      });

      if (!confirmedAdd) return;

      await updateActorAndRender({
        [`system.skills.${skillKey}.owned`]: true,
        [`system.skills.${skillKey}.manualOwned`]: true
      });
    };

    html.find(".shinobimancer-skill-pill").on("click", async (event) => {
      if (event.target.closest("button")) return;

      event.preventDefault();

      const skillKey = event.currentTarget?.dataset?.skill;
      if (!skillKey) return;

      await chooseInitialSkill(skillKey);
    });

    html.find(".shinobimancer-skill-increase").on("click", async (event) => {
      event.preventDefault();

      if (!canEditCreation()) return;

      const skillKey = event.currentTarget?.dataset?.skill;
      if (!skillKey) return;

      const skill = this.actor.system.skills?.[skillKey] ?? {};
      const owned = Boolean(skill.owned);

      if (!owned) {
        await chooseInitialSkill(skillKey);
        return;
      }

      if (typeof this.actor.increaseSkill === "function") {
        await this.actor.increaseSkill(skillKey);
        this.render(false);
        this.sourceSheet?.render?.(false);
      }
    });

    html.find(".shinobimancer-skill-decrease").on("click", async (event) => {
      event.preventDefault();

      if (!canEditCreation()) return;

      const skillKey = event.currentTarget?.dataset?.skill;
      if (!skillKey) return;

      const skill = this.actor.system.skills?.[skillKey] ?? {};
      const natural = Number(skill.natural ?? 1);
      const lockedBySource = isSkillLockedBySource(skill);

      if (natural > 1 && typeof this.actor.decreaseSkill === "function") {
        await this.actor.decreaseSkill(skillKey);
        this.render(false);
        this.sourceSheet?.render?.(false);
        return;
      }

      if (skill.manualOwned && !lockedBySource) {
        await chooseInitialSkill(skillKey);
        return;
      }

      ui.notifications.info("Cette compétence ne peut pas être retirée depuis la création.");
    });

    html.find(".shinobimancer-equipment-main").on("click", async (event) => {
      event.preventDefault();

      const key = event.currentTarget?.dataset?.equipment;
      if (!key) return;

      await updateActorAndRender({
        "system.progression.creation.startingEquipment.mainWeapon": key
      });
    });

    html.find(".shinobimancer-equipment-lot").on("click", async (event) => {
      event.preventDefault();

      if (!canEditCreation()) return;

      const key = event.currentTarget?.dataset?.equipment;
      if (!key) return;

      const currentLots = Array.isArray(this.actor.system.progression?.creation?.startingEquipment?.combatLots)
        ? Array.from(this.actor.system.progression.creation.startingEquipment.combatLots)
        : [];

      const selected = currentLots.includes(key);

      let nextLots = [];

      if (selected) {
        nextLots = currentLots.filter((lotKey) => lotKey !== key);
      } else {
        if (currentLots.length >= 2) {
          ui.notifications.warn("Tu dois choisir exactement 2 lots de combat. Retire d’abord un lot déjà sélectionné.");
          return;
        }

        nextLots = currentLots.concat([key]);
      }

      await updateActorAndRender({
        "system.progression.creation.startingEquipment.combatLots": nextLots
      });
    });

    html.find(".shinobimancer-finalize-creation").on("click", async (event) => {
      event.preventDefault();

      if (!this.actor || typeof this.actor.finalizeCreation !== "function") {
        ui.notifications.warn("La finalisation de création n’est pas disponible pour cet acteur.");
        return;
      }

      await this.actor.finalizeCreation();

      if (this.actor.system?.progression?.creation?.locked) {
        this.sourceSheet?.render?.(false);
        this.close();
      } else {
        this.render(false);
      }
    });
  }
}