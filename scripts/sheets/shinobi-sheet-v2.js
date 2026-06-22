import { NARUTO25E } from "../config.js";
import { Naruto25eShinobiSheet } from "./shinobi-sheet.js";

const NARUTO25E_V2_CHAKRA_ICON_PATHS = {
  katon: "systems/naruto-25e/assets/chakra/katon.webp",
  suiton: "systems/naruto-25e/assets/chakra/suiton.webp",
  doton: "systems/naruto-25e/assets/chakra/doton.webp",
  raiton: "systems/naruto-25e/assets/chakra/raiton.webp",
  futon: "systems/naruto-25e/assets/chakra/futon.webp",
  iryo: "systems/naruto-25e/assets/chakra/iryo.webp",
  taijutsu: "systems/naruto-25e/assets/chakra/taijutsu.webp",
  armes: "systems/naruto-25e/assets/chakra/armes.webp"
};

const NARUTO25E_V2_VILLAGE_ICON_PATHS = {
  konoha: "systems/naruto-25e/assets/village/konoha.webp",
  konoha_nukenin: "systems/naruto-25e/assets/village/konoha_nukenin.webp",
  kiri: "systems/naruto-25e/assets/village/kiri.webp",
  kiri_nukenin: "systems/naruto-25e/assets/village/kiri_nukenin.webp",
  suna: "systems/naruto-25e/assets/village/suna.webp",
  suna_nukenin: "systems/naruto-25e/assets/village/suna_nukenin.webp"
};

const NARUTO25E_V2_SKILL_HELP = {
  armesSimples: "Maîtrise des armes ninja et armes courantes : kunaï, shuriken, sabres simples et équipement martial standard.",
  camouflage: "Discrétion, infiltration, dissimulation et capacité à disparaître dans l’environnement.",
  corpsACorps: "Combat rapproché générique sans école de Taijutsu avancée.",
  esquive: "Capacité à éviter une attaque par déplacement, réflexe ou lecture du danger.",
  gensou: "Genjutsu commun, illusions de base, perturbations sensorielles et Kai.",
  henge: "Transformation, déguisement ninja et altération d’apparence.",
  kawarimi: "Permutation, substitution et défense ninja de base.",
  mental: "Résistance mentale, sang-froid, volonté et stabilité psychologique.",
  parade: "Défense avec arme, blocage, déviation et protection active.",
  physique: "Force, endurance, athlétisme, effort physique et résistance corporelle.",
  survie: "Orientation, bivouac, pistage simple, autonomie et survie en terrain hostile.",
  vigilance: "Perception, attention, anticipation et détection du danger.",

  armesExotiques: "Maîtrise des armes rares, inhabituelles ou spécialisées.",
  chuken: "Style de Taijutsu souple, alternatif ou technique, entre adaptation et contrôle.",
  coupSpecialArm: "Attaques armées spéciales : désarmer, briser, immobiliser ou exploiter une manœuvre martiale.",
  coupSpecialTai: "Attaques Taijutsu spéciales : assommer, projeter, immobiliser ou exploiter une manœuvre au corps à corps.",
  doton: "Nature de Terre : défense, stabilité, murs, sols, structures et contrôle du terrain.",
  futon: "Nature de Vent : vitesse, tranchant, projection, mobilité et attaques coupantes.",
  goken: "Style de Taijutsu dur et direct, basé sur la puissance physique et l’impact.",
  juken: "Style du Poing Souple, lié au contrôle du Chakra, aux Tenketsu et aux traditions Hyūga / Byakugan / Médecine selon prérequis.",
  intimidation: "Pression, menace, domination sociale et capacité à faire reculer l’adversaire.",
  katon: "Nature de Feu : dégâts directs, pression offensive, brûlures et destruction.",
  premiersSoins: "Soins de terrain immédiats, stabilisation et gestes médicaux d’urgence.",
  raiton: "Nature de Foudre : vitesse, percussion, stimulation, précision et attaques électriques.",
  regeneration: "Récupération, soin assisté par Chakra et soutien de guérison.",
  resistancesElementaires: "Résistance aux dégâts élémentaires et aux agressions de Chakra élémentaire.",
  resistancesEnvironnementales: "Résistance aux dangers du terrain, du climat, des toxines naturelles ou des environnements hostiles.",
  resistancesPhysiques: "Résistance aux chocs, blessures, impacts, contraintes corporelles et violences physiques.",
  resistancesPsychiques: "Résistance aux attaques mentales, spirituelles, psychiques ou émotionnelles.",
  scienceExplosifs: "Connaissance, pose, fabrication et neutralisation d’explosifs ninja.",
  sciencePieges: "Création, détection, pose et désamorçage de pièges.",
  suiton: "Nature d’Eau : flux, adaptation, entrave, pression et contrôle de zone.",
  yuryoku: "Force spirituelle, pression d’âme, puissance intérieure et techniques liées au Genjutsu / spirituel.",

  collecterInformations: "Enquête, rumeurs, recherche sociale et récupération d’informations utiles.",
  education: "Culture générale, savoir académique, lecture, histoire et connaissances formelles.",
  empathie: "Lecture des émotions, compréhension d’autrui et intuition sociale.",
  fauxSemblants: "Mensonge, déguisement social, manipulation d’identité et tromperie.",
  fuin: "Sceaux, verrouillage, stockage, inscriptions et techniques de scellement.",
  iryo: "Médecine ninja, Chakra médical, soins avancés et techniques Iryō.",
  kuchiyose: "Invocation, pactes, contrats et liens avec des créatures ou clans d’invocation.",
  loisTraditions: "Connaissance des lois, coutumes, protocoles, hiérarchies et traditions.",
  manipulation: "Influence sociale, persuasion trouble, mensonge orienté et pression relationnelle.",
  medecine: "Diagnostic, chirurgie, soins savants, anatomie et traitement médical structuré.",
  scienceDrogues: "Fabrication, connaissance et usage des drogues, remèdes et substances contrôlées.",
  sciencePoisons: "Fabrication, connaissance et neutralisation des poisons.",
  sentinelle: "Surveillance, garde, perception prolongée et tenue d’un poste d’observation.",
  sixiemeSens: "Intuition surnaturelle, perception occulte et pressentiments difficiles à expliquer.",
  technologie: "Usage, réparation, sabotage et compréhension des outils technologiques.",

  jiton: "Nature magnétique, métal, sable ferrugineux et contrôle d’attraction.",
  kage: "Techniques d’ombre, immobilisation, contrôle et manipulation des formes sombres.",
  kikaichu: "Symbiose Aburame, insectes Kikaichū, essaims et réserve associée.",
  mokuton: "Nature supérieure du Bois, issue de Doton et Suiton, liée au clan Senju.",
  resistancesEmotionnelles: "Résistance aux blessures émotionnelles, pressions affectives et manipulations intimes.",
  sumi: "Encre, calligraphie, formes dessinées, matérialisation et techniques liées au clan Aniki.",
  unificationDesunification: "Manipulation de l’unité, de la séparation, de l’assemblage ou de la désunion."
};

export class Naruto25eShinobiSheetV2 extends Naruto25eShinobiSheet {
  static get defaultOptions() {
    return foundry.utils.mergeObject(super.defaultOptions, {
      classes: ["naruto-25e", "sheet", "actor", "shinobi", "shinobi-v2"],
      template: "systems/naruto-25e/templates/actor/shinobi-sheet-v2.hbs",
      width: 1080,
      height: 780,
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
    return `${this.actor.name} — Shinobi V2`;
  }

  async getData(options = {}) {
    const context = await super.getData(options);

    context.v2 = this._buildV2Context(context);

    return context;
  }

  activateListeners(html) {
    super.activateListeners(html);

    this._activateV2StoredTab();

    html.find(".shinobi-v2-tabs .item").on("click", async (event) => {
      const tabKey = event.currentTarget?.dataset?.tab;
      if (!tabKey) return;

      if (!this.actor?.isOwner && !game.user?.isGM) return;

      const currentTab = this.actor.getFlag?.("naruto-25e", "shinobiSheetV2ActiveTab") ?? "summary";

      if (currentTab === tabKey) return;

      await this.actor.setFlag("naruto-25e", "shinobiSheetV2ActiveTab", tabKey);
    });

    html.find(".shinobi-v2-portrait-picker").on("click", async (event) => {
      event.preventDefault();

      await this._openV2PortraitDialog();
    });
    html.find("[data-v2-resource-control]").on("click", async (event) => {
      event.preventDefault();

      if (!game.user?.isGM) return;

      const control = event.currentTarget?.dataset?.v2ResourceControl ?? "";

      if (control === "health") {
        await this._openV2HealthControlDialog();
        return;
      }

      if (control === "chakra") {
        await this._openV2ChakraControlDialog();
        return;
      }

      if (control === "nindo") {
        await this._openV2NindoControlDialog();
        return;
      }

      if (control === "experience") {
        await this._openV2ExperienceControlDialog();
      }
    });

    html.find(".inventory-carry-action").on("click", async (event) => {
      event.preventDefault();

      const itemId = event.currentTarget?.dataset?.itemId;
      const carryState = event.currentTarget?.dataset?.carryState;

      if (!itemId || !carryState) return;

      await this.actor.setInventoryItemCarryState(itemId, carryState);
      this.render(false);
    });

    html.find(".combat-spend-simple-action").on("click", async (event) => {
      event.preventDefault();

      await this.actor.spendCombatAction("simple", "Action simple manuelle");
      this.render(false);
    });

    html.find(".combat-spend-complex-action").on("click", async (event) => {
      event.preventDefault();

      await this.actor.spendCombatAction("complex", "Action complexe manuelle");
      this.render(false);
    });

    html.find(".combat-delay-complex-action").on("click", async (event) => {
      event.preventDefault();

      await this.actor.delayComplexAction();
      this.render(false);
    });

    html.find(".combat-spend-delayed-action").on("click", async (event) => {
      event.preventDefault();

      await this.actor.spendDelayedAction("Action retardée manuelle");
      this.render(false);
    });

    html.find(".combat-reset-turn-actions").on("click", async (event) => {
      event.preventDefault();

      if (!game.user?.isGM) return;

      await this.actor.resetCombatCounters("turn", {
        notify: true,
        requireGM: true
      });
      this.render(false);
    });

    html.find(".nindo-opportunity-consume").on("click", async (event) => {
      event.preventDefault();

      await this.actor.consumeNindoOpportunity();
      this.render(false);
    });

    html.find(".nindo-chakra-boost-reduce").on("click", async (event) => {
      event.preventDefault();

      await this.actor.reduceNindoChakraBoostTurns(1, {
        requireGM: true,
        reason: "Réduction manuelle MJ"
      });
      this.render(false);
    });

    html.find(".nindo-chakra-boost-end").on("click", async (event) => {
      event.preventDefault();

      await this.actor.endNindoChakraBoost({
        reason: "Suppression manuelle MJ"
      });
      this.render(false);
    });

    html.find(".nindo-effects-reset").on("click", async (event) => {
      event.preventDefault();

      await this.actor.resetNindoActiveEffects();
      this.render(false);
    });
  }

  _activateV2StoredTab() {
    const canSeePrivateLineage = Boolean(this.actor?.isOwner || game.user?.isGM);
    let tabKey = this.actor.getFlag?.("naruto-25e", "shinobiSheetV2ActiveTab") ?? "summary";

    if (!canSeePrivateLineage) {
      tabKey = "summary";
    }

    if (!tabKey) return;

    const tabController = Array.isArray(this._tabs) ? this._tabs[0] : null;

    if (tabController && typeof tabController.activate === "function") {
      tabController.activate(tabKey, {
        triggerCallback: false
      });
      return;
    }

    const element = this.element;
    if (!element?.length) return;

    element.find(".shinobi-v2-tabs .item").removeClass("active");
    element.find(`.shinobi-v2-tabs .item[data-tab="${tabKey}"]`).addClass("active");

    element.find(".shinobi-v2-body .tab").removeClass("active");
    element.find(`.shinobi-v2-body .tab[data-tab="${tabKey}"]`).addClass("active");
  }

  _canEditV2Portrait() {
    return Boolean(this.actor?.isOwner || game.user?.isGM);
  }

  async _pickV2LocalImageFile() {
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
  }

  _getV2PortraitUploadSettings() {
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
  }

  async _uploadV2PortraitFromComputer() {
    if (!this._canEditV2Portrait()) {
      ui.notifications.warn("Tu n’as pas les droits nécessaires pour modifier ce portrait.");
      return;
    }

    const file = await this._pickV2LocalImageFile();

    if (!file) return;

    if (!String(file.type ?? "").startsWith("image/")) {
      ui.notifications.warn("Le fichier choisi n’est pas une image.");
      return;
    }

    const { source, path } = this._getV2PortraitUploadSettings();

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
        console.warn("Naruto 2.5e | Upload portrait V2 sans chemin exploitable.", {
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
    } catch (error) {
      console.error("Naruto 2.5e | Upload du portrait V2 impossible.", error);
      ui.notifications.error("Impossible d’importer le portrait. Voir la console ou demander au MJ.");
    }
  }

  async _browseV2ExistingPortrait() {
    if (!this._canEditV2Portrait()) {
      ui.notifications.warn("Tu n’as pas les droits nécessaires pour modifier ce portrait.");
      return;
    }

    const picker = new FilePicker({
      type: "image",
      current: this.actor?.img ?? "",
      callback: async (path) => {
        await this.actor.update({
          img: path
        });

        this.render(false);
      }
    });

    picker.browse();
  }

  async _openV2PortraitDialog() {
    if (!this._canEditV2Portrait()) {
      ui.notifications.warn("Tu n’as pas les droits nécessaires pour modifier ce portrait.");
      return;
    }

    const { source, path } = this._getV2PortraitUploadSettings();

    const safePath = foundry.utils.escapeHTML?.(path) ?? path;
    const safeSource = foundry.utils.escapeHTML?.(source) ?? source;

    const content = `
      <div class="naruto-portrait-upload-dialog">
        <p>
          Importe un portrait depuis ton ordinateur.
        </p>
        <p>
          Dossier cible : <strong>${safePath}</strong>
        </p>
        <p class="hint">
          Source : ${safeSource}
        </p>
        <p class="hint">
          Le recadrage interactif viendra plus tard. Pour l’instant, l’image est importée puis cadrée par la fiche.
        </p>
      </div>
    `;

    const buttons = {
      upload: {
        label: "Importer une image",
        callback: async () => this._uploadV2PortraitFromComputer()
      }
    };

    if (game.user?.isGM) {
      buttons.browse = {
        label: "Choisir une image existante",
        callback: async () => this._browseV2ExistingPortrait()
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
  }

  _getV2DialogNumber(html) {
    const rawValue = html.find('[name="value"]').val();
    const value = Math.max(0, Number(rawValue ?? 0));

    if (!Number.isFinite(value)) return 0;

    return value;
  }

  async _openV2HealthControlDialog() {
    if (!game.user?.isGM) {
      ui.notifications.warn("Seul le MJ peut modifier directement la piste de santé.");
      return;
    }

    const track = this.actor.getHealthTrackSummary?.() ?? {
      value: 0,
      max: 0,
      activeLabel: "—"
    };

    const content = `
      <form class="shinobi-v2-control-dialog">
        <p>
          Cette jauge représente les <strong>dégâts subis</strong>, pas les PV restants.
        </p>

        <p>
          État actuel : <strong>${track.activeLabel ?? "—"}</strong><br />
          Dégâts subis : <strong>${track.value ?? 0} / ${track.max ?? 0}</strong>
        </p>

        <label>
          Valeur
          <input type="number" name="value" value="5" min="0" />
        </label>
      </form>
    `;

    await new Dialog({
      title: `Modifier la santé — ${this.actor.name}`,
      content,
      buttons: {
        damage: {
          label: "Infliger des dégâts",
          callback: async (html) => {
            const value = this._getV2DialogNumber(html);
            if (value <= 0) return;

            await this.actor.adjustHealthTrack(value, {
              sourceName: "Ajustement MJ",
              reason: "Dégâts infligés depuis la fiche V2"
            });
          }
        },
        heal: {
          label: "Soigner des dégâts",
          callback: async (html) => {
            const value = this._getV2DialogNumber(html);
            if (value <= 0) return;

            await this.actor.adjustHealthTrack(-value, {
              sourceName: "Ajustement MJ",
              reason: "Dégâts soignés depuis la fiche V2"
            });
          }
        },
        resetZero: {
          label: "Remettre en forme : 0 dégât subi",
          callback: async () => {
            await this.actor.resetHealthTrack?.();
          }
        },
        fillTrack: {
          label: "Remplir la piste : état critique",
          callback: async () => {
            const currentTrack = this.actor.getHealthTrackSummary?.() ?? {
              max: 0
            };

            await this.actor.update({
              "system.combat.health.damageTrack.value": Math.max(0, Number(currentTrack.max ?? 0))
            });

            ui.notifications.warn(`${this.actor.name} : piste de santé remplie au maximum.`);
          }
        },
        cancel: {
          label: "Annuler"
        }
      },
      default: "damage"
    }).render(true);
  }

  async _openV2ChakraControlDialog() {
    if (!game.user?.isGM) {
      ui.notifications.warn("Seul le MJ peut modifier directement le Chakra.");
      return;
    }

    const chakra = this.actor.system?.resources?.chakra ?? {};
    const current = Math.max(0, Number(chakra.value ?? 0));
    const max = Math.max(0, Number(chakra.max ?? 0));

    const content = `
      <form class="shinobi-v2-control-dialog">
        <p>
          Chakra actuel : <strong>${current} / ${max}</strong>
        </p>

        <label>
          Valeur
          <input type="number" name="value" value="10" min="0" />
        </label>
      </form>
    `;

    const setChakra = async (nextValue) => {
      const value = Math.max(0, Math.min(max, Number(nextValue ?? 0)));

      await this.actor.update({
        "system.resources.chakra.value": value
      });

      ui.notifications.info(`${this.actor.name} : Chakra ${current} → ${value}.`);
    };

    await new Dialog({
      title: `Modifier le Chakra — ${this.actor.name}`,
      content,
      buttons: {
        restore: {
          label: "Restaurer du Chakra",
          callback: async (html) => {
            const value = this._getV2DialogNumber(html);
            await setChakra(current + value);
          }
        },
        spend: {
          label: "Dépenser / retirer du Chakra",
          callback: async (html) => {
            const value = this._getV2DialogNumber(html);
            await setChakra(current - value);
          }
        },
        zero: {
          label: "Mettre à 0",
          callback: async () => {
            await setChakra(0);
          }
        },
        full: {
          label: "Restaurer au maximum",
          callback: async () => {
            await setChakra(max);
          }
        },
        cancel: {
          label: "Annuler"
        }
      },
      default: "restore"
    }).render(true);
  }

  async _openV2NindoControlDialog() {
    if (!game.user?.isGM) return;

    const nindo = this.actor.system?.nindo ?? {};
    const minValue = -10;
    const maxValue = Math.max(0, Number(nindo.max ?? 0));
    const currentValue = Math.max(minValue, Math.min(maxValue, Number(nindo.value ?? 0)));
    const currentCharges = Math.max(0, Number(nindo.charges?.value ?? 0));
    const maxCharges = Math.max(0, Number(nindo.charges?.max ?? 0));

    new Dialog({
      title: `Nindō — ${this.actor.name}`,
      content: `
        <form class="shinobi-v2-dialog-form">
          <p>
            Points actuels : <strong>${currentValue} / ${maxValue}</strong> <small>(minimum ${minValue})</small><br />
            Charges Nindō : <strong>${currentCharges} / ${maxCharges}</strong>
          </p>

          <label>
            Valeur
            <input type="number" name="value" value="1" min="0" step="1" />
          </label>

          <label>
            Charges Nindō
            <input type="number" name="charges" value="${currentCharges}" min="0" max="${maxCharges}" step="1" />
          </label>
        </form>
      `,
      buttons: {
        add: {
          label: "Accorder points",
          callback: async (html) => {
            const value = this._getV2DialogNumber(html);
            const nextValue = Math.max(minValue, Math.min(maxValue, currentValue + value));

            await this.actor.update({
              "system.nindo.value": nextValue
            });
          }
        },
        remove: {
          label: "Retirer points",
          callback: async (html) => {
            const value = this._getV2DialogNumber(html);
            const nextValue = Math.max(minValue, Math.min(maxValue, currentValue - value));

            await this.actor.update({
              "system.nindo.value": nextValue
            });
          }
        },
        zero: {
          label: "Points à 0",
          callback: async () => {
            await this.actor.update({
              "system.nindo.value": 0
            });
          }
        },
        minimum: {
          label: "Points à -10",
          callback: async () => {
            await this.actor.update({
              "system.nindo.value": minValue
            });
          }
        },
        charges: {
          label: "Modifier charges",
          callback: async (html) => {
            const rawValue = Number(html.find("[name='charges']").val() ?? currentCharges);
            const nextCharges = Math.max(0, Math.min(maxCharges, rawValue));

            await this.actor.update({
              "system.nindo.charges.value": nextCharges
            });
          }
        }
      },
      default: "add"
    }).render(true);
  }

  async _openV2ExperienceControlDialog() {
    if (!game.user?.isGM) {
      ui.notifications.warn("Seul le MJ peut modifier directement l’XP totale.");
      return;
    }

    const experience = this.actor.system?.progression?.experience ?? {};
    const currentTotal = Math.max(0, Number(experience.total ?? 0));
    const spent = Math.max(0, Number(experience.spent ?? 0));
    const available = Math.max(0, Number(experience.available ?? 0));

    const content = `
      <form class="shinobi-v2-control-dialog">
        <p>
          L’XP totale est la réserve globale gagnée par le personnage.
        </p>

        <p>
          XP totale : <strong>${currentTotal}</strong><br />
          XP dépensée : <strong>${spent}</strong><br />
          XP disponible : <strong>${available}</strong>
        </p>

        <label>
          Valeur
          <input type="number" name="value" value="25" min="0" />
        </label>
      </form>
    `;

    const setTotalExperience = async (nextTotal, reason = "Ajustement MJ") => {
      const total = Math.max(0, Number(nextTotal ?? 0));

      await this.actor.update({
        "system.progression.experience.total": total
      });

      this.actor.prepareData();
      this.render(false);

      ui.notifications.info(`${this.actor.name} : XP totale ${currentTotal} → ${total} (${reason}).`);
    };

    await new Dialog({
      title: `Modifier l’XP totale — ${this.actor.name}`,
      content,
      buttons: {
        grant: {
          label: "Accorder de l’XP",
          callback: async (html) => {
            const value = this._getV2DialogNumber(html);
            await setTotalExperience(currentTotal + value, `+${value} XP`);
          }
        },
        remove: {
          label: "Retirer de l’XP",
          callback: async (html) => {
            const value = this._getV2DialogNumber(html);
            await setTotalExperience(currentTotal - value, `-${value} XP`);
          }
        },
        zero: {
          label: "Mettre l’XP totale à 0",
          callback: async () => {
            await setTotalExperience(0, "remise à zéro");
          }
        },
        cancel: {
          label: "Annuler"
        }
      },
      default: "grant"
    }).render(true);
  }

  _buildV2AwakeningContext() {
    const awakening = this.actor.system?.nindo?.activeEffects?.awakening ?? {};
    const active = Boolean(awakening.active);
    const remaining = Math.max(0, Number(awakening.actionsRemaining ?? 0));
    const max = Math.max(0, Number(awakening.maxActions ?? 3));
    const spent = Math.max(0, Number(awakening.actionsSpent ?? Math.max(0, max - remaining)));
    const bonus = active
      ? Math.max(10, Number(awakening.bonus ?? 10))
      : 0;

    return {
      active,
      remaining,
      max,
      spent,
      bonus,
      label: active
        ? `Éveil ${remaining} / ${max}`
        : "",
      title: active
        ? `Éveil actif — ${remaining} action(s) d’Éveil restante(s) / ${max}. Bonus +${bonus} aux jets lancés via action d’Éveil. Lignée effective traitée comme 10 jusqu’au prochain tour du personnage.`
        : ""
    };
  }

  _buildV2Context(context = {}) {
    const system = this.actor.system ?? {};
    const identity = system.identity ?? {};
    const heritage = system.heritage ?? {};
    const resources = system.resources ?? {};
    const combat = system.combat ?? {};
    const combatActions = combat.actions ?? {};
    const progression = system.progression ?? {};
    const canSeePrivateLineage = Boolean(this.actor.isOwner || game.user?.isGM);

    const identityContext = this._buildV2IdentityContext(
      context,
      identity,
      heritage,
      progression,
      canSeePrivateLineage
    );

    return {
      canSeePrivateLineage,
      identity: identityContext,
      resources: this._buildV2ResourceContext(context, resources, combatActions),
      awakening: this._buildV2AwakeningContext(),
      health: this._buildV2HealthContext(context),
      summary: this._buildV2SummaryContext(context, identityContext),
      character: this._buildV2CharacterContext(identity),
      creation: this._buildV2CreationContext(context, progression),
      combat: this._buildV2CombatContext(context, combat),
      techniques: this._buildV2TechniqueContext(context),
      inventory: this._buildV2InventoryContext(context),
      lineage: this._buildV2LineageContext(context, heritage, identityContext, canSeePrivateLineage),
      progression: this._buildV2ProgressionContext(context),
      tabs: this._buildV2TabsContext(canSeePrivateLineage)
    };
  }

  _buildV2IdentityContext(context, identity, heritage, progression, canSeePrivateLineage) {
    const villageKey = String(heritage.village || identity.village || "");
    const villageStatusKey = String(heritage.villageStatus || "loyal");
    const villageLabel = NARUTO25E.villages?.[villageKey]?.label ?? villageKey;
    const statusLabel = NARUTO25E.villageStatuses?.[villageStatusKey] ?? villageStatusKey;
    const villageIcon = this._getV2VillageIcon(villageKey, villageStatusKey);

    const heritageMode = typeof this.actor._getNormalizedHeritageMode === "function"
      ? this.actor._getNormalizedHeritageMode(heritage)
      : String(heritage.mode ?? "clan");

    const publicHeritageModeLabel = canSeePrivateLineage
      ? NARUTO25E.heritageModes?.[heritageMode] ?? "Clan"
      : heritageMode === "voie"
        ? "Voie"
        : "Clan";

    const publicHeritageLabel = this._getV2PublicHeritageLabel(heritage, heritageMode);

    const rankLabel = context.rankProgression?.currentLabel
      ?? NARUTO25E.ranks?.[progression.rank?.current]?.label
      ?? progression.rank?.current
      ?? identity.rang
      ?? "—";

    return {
      name: this.actor.name,
      img: this.actor.img,
      nickname: identity.prenom || "—",
      age: identity.age || "—",
      birth: identity.birth || "—",
      sex: identity.sex || "—",
      height: identity.height || "—",
      weight: identity.weight || "—",
      hair: identity.hair || "—",
      eyes: identity.eyes || "—",
      sensei: identity.sensei || "—",
      team: identity.team || "—",
      nindo: this._getV2NindoShort(identity),
      rankLabel,
      villageKey,
      villageLabel,
      villageStatusKey,
      statusLabel,
      villageIcon,
      publicHeritageLabel,
      publicHeritageModeLabel,
      chakraIcons: this._getV2ChakraIcons()
    };
  }

  _buildV2ResourceContext(context, resources, combatActions) {
    const chakra = resources.chakra ?? {};
    const chakraValue = Math.max(0, Number(chakra.value ?? 0));
    const chakraMax = Math.max(0, Number(chakra.max ?? 0));
    const chakraNaturalMax = Math.max(0, Number(chakra.naturalMax ?? chakra.rawMax ?? chakra.max ?? 0));
    const chakraTemporaryBonus = chakra.temporaryBonus ?? {};
    const chakraTemporaryTotal = Math.max(0, Number(chakraTemporaryBonus.total ?? 0));

    const chakraBoost = this.actor.system?.nindo?.activeEffects?.chakraBoost ?? {};
    const chakraBoostActive = Boolean(chakraBoost.active)
      && Number(chakraBoost.remainingTurns ?? 0) > 0;

    const hasStoredChakraBeforeGain =
      chakraBoost.storedChakraBeforeGain !== undefined
      && chakraBoost.storedChakraBeforeGain !== null
      && chakraBoost.storedChakraBeforeGain !== "";

    const storedChakraBeforeGain = hasStoredChakraBeforeGain
      ? Math.max(0, Number(chakraBoost.storedChakraBeforeGain ?? 0))
      : 0;

    const hasTemporaryChakra = chakraTemporaryTotal > 0;
    const chakraDisplayMax = chakraMax;

    const chakraTemporaryAnchorValue = hasTemporaryChakra
      ? Math.max(
          0,
          Math.min(
            chakraDisplayMax,
            chakraBoostActive && hasStoredChakraBeforeGain
              ? storedChakraBeforeGain
              : chakraNaturalMax
          )
        )
      : 0;

    const chakraNaturalValue = hasTemporaryChakra
      ? Math.max(0, Math.min(chakraValue, chakraTemporaryAnchorValue))
      : Math.max(0, Math.min(chakraValue, chakraNaturalMax));

    const chakraTemporaryValue = hasTemporaryChakra
      ? Math.max(0, Math.min(chakraValue, chakraDisplayMax) - chakraTemporaryAnchorValue)
      : 0;

    const chakraTemporaryZoneValue = hasTemporaryChakra
      ? Math.max(0, chakraDisplayMax - chakraTemporaryAnchorValue)
      : 0;

    const getChakraPercent = (value) => {
      if (chakraDisplayMax <= 0) return 0;

      const percent = (Math.max(0, Number(value ?? 0)) / chakraDisplayMax) * 100;

      return Math.max(0, Math.min(100, Number(percent.toFixed(4))));
    };

    const chakraPercent = getChakraPercent(chakraValue);
    const chakraNaturalPercent = getChakraPercent(chakraNaturalValue);
    const chakraTemporaryPercent = getChakraPercent(chakraTemporaryValue);
    const chakraTemporaryStartPercent = getChakraPercent(chakraTemporaryAnchorValue);
    const chakraTemporaryZoneStartPercent = getChakraPercent(chakraTemporaryAnchorValue);
    const chakraTemporaryZonePercent = getChakraPercent(chakraTemporaryZoneValue);

    const chakraTemporarySources = Array.isArray(chakraTemporaryBonus.sources)
      ? chakraTemporaryBonus.sources
      : [];
    const chakraTemporarySourceText = chakraTemporarySources.length
      ? chakraTemporarySources.map((source) => `${source.label} +${source.amount}`).join(" — ")
      : "";

    const nindo = this.actor.system?.nindo ?? {};
    const nindoValue = Math.max(-10, Math.min(Number(nindo.max ?? 0), Number(nindo.value ?? 0)));
    const nindoMax = Math.max(0, Number(nindo.max ?? 0));
    const nindoChargeValue = Math.max(0, Number(nindo.charges?.value ?? 0));
    const nindoChargeMax = Math.max(0, Number(nindo.charges?.max ?? 0));
    const nindoNegative = nindoValue < 0;

    const initiative = Number(this.actor.system?.combat?.initiative?.total ?? 0);

    return {
      chakra: {
        value: chakraValue,
        max: chakraMax,
        displayMax: chakraDisplayMax,
        naturalMax: chakraNaturalMax,
        naturalValue: chakraNaturalValue,
        temporaryValue: chakraTemporaryValue,
        temporaryTotal: chakraTemporaryTotal,
        temporaryAnchorValue: chakraTemporaryAnchorValue,
        temporaryZoneValue: chakraTemporaryZoneValue,
        percent: chakraPercent,
        naturalPercent: chakraNaturalPercent,
        temporaryPercent: chakraTemporaryPercent,
        temporaryStartPercent: chakraTemporaryStartPercent,
        temporaryZoneStartPercent: chakraTemporaryZoneStartPercent,
        temporaryZonePercent: chakraTemporaryZonePercent,
        hasTemporaryBonus: hasTemporaryChakra,
        temporarySourceText: chakraTemporarySourceText,
        title: hasTemporaryChakra
          ? `Chakra : ${chakraValue} / ${chakraMax} — Naturel : ${chakraNaturalValue} / ${chakraNaturalMax} — Bonus temporaire : +${chakraTemporaryTotal}${chakraTemporarySourceText ? ` — ${chakraTemporarySourceText}` : ""}`
          : `Chakra : ${chakraValue} / ${chakraMax}`,
        passiveRegen: Number(chakra.passiveRegen ?? 0),
        activeRegen: Number(chakra.activeRegen ?? 0)
      },
      vigor: Number(resources.vigueur?.value ?? 0),
      character: Number(resources.caractere?.value ?? 0),
      initiative,
      nindo: {
        value: nindoValue,
        max: nindoMax,
        chargeValue: nindoChargeValue,
        chargeMax: nindoChargeMax,
        negative: nindoNegative,
        headerLabel: `${nindoValue} · ChN. ${nindoChargeValue}`,
        title: `Points de Nindō actuels : ${nindoValue} / ${nindoMax} — Charges de Nindō : ${nindoChargeValue} / ${nindoChargeMax}${nindoNegative ? " — Attention : Nindō négatif" : ""}`
      },
      actions: {
        simple: Boolean(combatActions.simpleAvailable),
        complex: Boolean(combatActions.complexAvailable),
        delayed: Boolean(combatActions.delayedAvailable),
        label: this._getV2ActionSummary(combatActions)
      }
    };
  }

  _buildV2HealthContext(context) {
    const track = context.combatHealthTrack ?? this.actor.getHealthTrackSummary?.() ?? {
      value: 0,
      max: 0,
      segments: []
    };

    const max = Math.max(0, Number(track.max ?? 0));
    const damageValue = Math.max(0, Math.min(max, Number(track.value ?? 0)));
    const remainingValue = Math.max(0, max - damageValue);

    const damagePercent = max > 0
      ? Math.max(0, Math.min(100, Math.round((damageValue / max) * 100)))
      : 0;

    const remainingPercent = max > 0
      ? Math.max(0, Math.min(100, Math.round((remainingValue / max) * 100)))
      : 0;

    const segments = Array.isArray(track.segments) ? track.segments : [];
    const thresholdCount = Math.max(0, segments.length - 1);

    const thresholds = Array.from({
      length: thresholdCount
    }).map((_, index) => {
      const nextSegment = segments[index + 1] ?? {};
      const nextState = String(nextSegment.state ?? "");
      const nextKey = String(nextSegment.key ?? "");
      const position = segments.length > 0
        ? ((index + 1) / segments.length) * 100
        : 0;

      let severity = "fatigue";

      if (nextState === "sonne") {
        severity = "shock";
      } else if (
        nextState.startsWith("blessure")
        || nextKey.startsWith("wound")
      ) {
        severity = "wound";
      }

      return {
        index,
        position: position.toFixed(4),
        severity,
        label: nextSegment.label ?? ""
      };
    });

    return {
      track,
      percent: remainingPercent,
      damagePercent,
      remaining: {
        value: remainingValue,
        max,
        percent: remainingPercent
      },
      thresholds,
      effective: context.effectiveHealthState ?? this.actor.getEffectiveHealthStateSummary?.() ?? {
        label: "Pleine forme",
        source: "—",
        hasPenalty: false
      },
      stateLabel: context.combatSummary?.effectiveStateLabel ?? "Pleine forme",
      stateSource: context.combatSummary?.effectiveStateSource ?? "—"
    };
  }

  _buildV2SummaryContext(context, identityContext) {
    const techniqueGroups = Array.isArray(context.techniqueGroups)
      ? context.techniqueGroups
      : [];

    const visibleTechniqueGroups = techniqueGroups
      .map((group) => {
        const techniques = Array.isArray(group.techniques) ? group.techniques : [];

        return {
          key: group.key,
          label: group.label,
          count: techniques.length,
          techniques: techniques.slice(0, 4)
        };
      })
      .filter((group) => group.count > 0);

    const techniqueTotal = visibleTechniqueGroups.reduce((total, group) => {
      return total + group.count;
    }, 0);

    const lineagePowers = Array.isArray(context.lineagePowerItems)
      ? context.lineagePowerItems
      : [];

    const activeLineagePowers = lineagePowers.filter((power) => Boolean(power.active));

    return {
      identity: identityContext,
      creationState: context.creationState ?? {},
      creationValidation: context.creationValidation ?? {},
      equippedWeapons: Array.isArray(context.equippedWeapons) ? context.equippedWeapons : [],
      equippedArmors: Array.isArray(context.equippedArmors) ? context.equippedArmors : [],
      techniqueGroups: visibleTechniqueGroups,
      techniqueTotal,
      lineagePowerItems: lineagePowers,
      activeLineagePowers,
      hasTechniqueItems: techniqueTotal > 0,
      hasLineagePowerItems: lineagePowers.length > 0,
      hasActiveLineagePowers: activeLineagePowers.length > 0
    };
  }

  _buildV2CharacterContext(identity) {
    const nindo = this.actor.system?.nindo ?? {};
    const nindoValue = Number(nindo.value ?? 0);
    const nindoMax = Math.max(0, Number(nindo.max ?? 0));
    const nindoChargeValue = Math.max(0, Number(nindo.charges?.value ?? 0));
    const nindoChargeMax = Math.max(0, Number(nindo.charges?.max ?? 0));
    const nindoChoiceMode = String(nindo.choiceMode ?? "preset");
    const nindoPresetKey = String(nindo.preset ?? "");
    const nindoPreset = NARUTO25E.nindoPresets?.[nindoPresetKey] ?? null;
    const isCustomNindo = nindoChoiceMode === "custom";

    const nindoDisplay = {
      mode: nindoChoiceMode,
      name: isCustomNindo
        ? (nindo.custom?.name || "Nindō personnalisé")
        : (nindoPreset?.label || "Aucun Nindō choisi"),
      description: isCustomNindo
        ? (nindo.custom?.description || "")
        : (nindoPreset?.description || "")
    };

    const nindoActions = Object.entries(NARUTO25E.nindoActions ?? {}).map(([key, action]) => ({
      key,
      label: action.label ?? key,
      cost: action.cost ?? 0,
      variableCost: Boolean(action.variableCost),
      maxCost: action.maxCost ?? action.cost ?? 0,
      temporalite: action.temporalite ?? "—",
      description: action.description ?? "",
      canUse: true
    }));

    return {
      nindo: {
        value: nindoValue,
        max: nindoMax,
        chargeValue: nindoChargeValue,
        chargeMax: nindoChargeMax,
        choiceMode: nindoChoiceMode,
        presetKey: nindoPresetKey,
        presetName: nindoDisplay.name,
        presetDescription: nindoDisplay.description,
        customName: nindo.custom?.name ?? "",
        customDescription: nindo.custom?.description ?? "",
        identityText: identity.nindoText ?? "",
        isCustom: isCustomNindo,
        display: nindoDisplay,
        actions: nindoActions,
        hasActions: nindoActions.length > 0,
        activeEffects: {
          chakraBoost: nindo.activeEffects?.chakraBoost ?? {},
          awakening: nindo.activeEffects?.awakening ?? {},
          opportunity: nindo.activeEffects?.opportunity ?? {}
        }
      },
      age: identity.age || "",
      birth: identity.birth || "",
      sex: identity.sex || "",
      height: identity.height || "",
      weight: identity.weight || "",
      hair: identity.hair || "",
      eyes: identity.eyes || "",
      sensei: identity.sensei || "",
      team: identity.team || "",
      loyalty: identity.loyalty || "",
      doctrine: identity.doctrine || "",
      dailyLife: identity.dailyLife || "",
      religion: identity.religion || "",
      prejudices: identity.prejudices || "",
      notes: identity.notes || "",
      hasPhysicalDetails: Boolean(
        identity.age
        || identity.birth
        || identity.sex
        || identity.height
        || identity.weight
        || identity.hair
        || identity.eyes
      ),
      hasSocialDetails: Boolean(
        identity.sensei
        || identity.team
        || identity.loyalty
        || identity.doctrine
        || identity.dailyLife
        || identity.religion
        || identity.prejudices
      )
    };
  }

  _buildV2CreationContext(context, progression) {
    const creationState = context.creationState ?? {};
    const creationValidation = context.creationValidation ?? {};
    const creation = progression.creation ?? {};
    const experience = progression.experience ?? {};
    const rank = progression.rank ?? {};

    return {
      state: creationState,
      validation: creationValidation,
      locked: Boolean(creation.locked),
      mode: creation.mode || "—",
      currentStep: creation.currentStep || "—",
      validatedAt: creation.validatedAt || "",
      validatedBy: creation.validatedBy || "",
      notes: creation.notes || "",
      xpTotal: Number(experience.total ?? 0),
      xpSpent: Number(experience.spent ?? 0),
      xpAvailable: Number(experience.available ?? 0),
      rankCurrent: rank.current || "—",
      lastPromotion: rank.lastPromotion || "",
      promotionNotes: rank.promotionNotes || ""
    };
  }

  _buildV2CombatContext(context, combat) {
    const attacks = combat.attacks ?? {};
    const damage = combat.damage ?? {};
    const interceptions = combat.interceptions ?? {};
    const counters = combat.counters ?? {};
    const health = combat.health ?? {};
    const inventoryItems = Array.isArray(this.actor.system?.inventory?.items)
      ? this.actor.system.inventory.items
      : [];

    const equippedWeapons = inventoryItems
      .filter((item) => item.type === "weapon" && item.equipped)
      .map((item) => this._buildV2CombatItemContext(item));

    const combatItems = inventoryItems
      .filter((item) => Boolean(item.hasCombatUse))
      .map((item) => this._buildV2CombatItemContext(item));

    return {
      quickSkillOptions: Array.isArray(context.combatSkillOptions) ? context.combatSkillOptions : [],
      attacks: {
        arm: {
          total: Number(attacks.arm?.total ?? 0),
          bonus: Number(attacks.arm?.bonus ?? 0),
          skill: attacks.arm?.skill ?? "armesSimples",
          skillLabel: NARUTO25E.skillDefinitions?.[attacks.arm?.skill]?.label ?? "Armes Simples",
          damageTotal: Number(damage.arm?.total ?? 0),
          damageBonus: Number(damage.arm?.bonus ?? 0),
          weaponBonus: Number(damage.arm?.weaponBonus ?? 0)
        },
        tai: {
          total: Number(attacks.tai?.total ?? 0),
          bonus: Number(attacks.tai?.bonus ?? 0),
          skill: attacks.tai?.skill ?? "corpsACorps",
          skillLabel: NARUTO25E.skillDefinitions?.[attacks.tai?.skill]?.label ?? "Corps à Corps",
          damageTotal: Number(damage.tai?.total ?? 0),
          damageBonus: Number(damage.tai?.bonus ?? 0)
        }
      },
      taijutsuStyles: this._getV2TaijutsuStyleSummaries(),
      equippedWeapons,
      combatItems,
      hasEquippedWeapons: equippedWeapons.length > 0,
      hasCombatItems: combatItems.length > 0,
      counters: {
        interceptionsArm: counters.interceptions?.arm ?? { remaining: 0, max: 0 },
        interceptionsTai: counters.interceptions?.tai ?? { remaining: 0, max: 0 },
        esquive: counters.defenses?.esquive ?? { remaining: 0, max: 0 },
        parade: counters.defenses?.parade ?? { remaining: 0, max: 0 },
        lineagePowers: counters.lineagePowers ?? {
          base: 0,
          bonus: 0,
          max: 0,
          remaining: 0,
          usedThisTurn: false
        }
      },
      interceptions: {
        arm: {
          total: Number(interceptions.arm?.total ?? interceptions.arm?.rollTotal ?? 0),
          bonus: Number(interceptions.arm?.bonus ?? 0)
        },
        tai: {
          total: Number(interceptions.tai?.total ?? interceptions.tai?.rollTotal ?? 0),
          bonus: Number(interceptions.tai?.bonus ?? 0)
        }
      },
      health: {
        manualState: health.manualState ?? "none",
        conditions: health.conditions ?? "",
        aggravations: health.aggravations ?? "",
        weaknesses: health.weaknesses ?? "",
        notes: health.notes ?? "",
        woundCalculator: health.woundCalculator ?? {
          incomingDamage: 0,
          defense: "vigueur",
          damageType: "PHY"
        }
      },
      maintenance: context.lineageMaintenanceSummary ?? {
        activeCount: 0,
        totalMaintenance: 0,
        passiveRegen: 0,
        netCost: 0,
        currentChakra: 0,
        nextChakra: 0,
        crossesCriticalThreshold: false
      }
    };
  }

  _buildV2CombatItemContext(item = {}) {
    const damage = item.damage ?? {};
    const useEffect = item.useEffect ?? {};
    const uses = item.uses ?? {};
    const carryState = String(item.carryState ?? "notHeld");
    const carryLabel = typeof this.actor._getInventoryCarryStateLabel === "function"
      ? this.actor._getInventoryCarryStateLabel(carryState)
      : carryState;

    const heldStates = ["rightHand", "leftHand", "twoHands"];
    const isHeld = heldStates.includes(carryState);
    const canHold = Boolean(item.holdable || item.carry?.holdable || item.type === "weapon" || item.hasCombatUse);

    const gripOptions = [
      { key: "rightHand", label: "MD", fullLabel: "Main droite" },
      { key: "leftHand", label: "MG", fullLabel: "Main gauche" },
      { key: "twoHands", label: "2M", fullLabel: "Deux mains" }
    ];

    return {
      id: item.id,
      name: item.name ?? "Objet",
      type: item.type ?? "misc",
      quantity: Number(item.quantity ?? 1),
      equipped: Boolean(item.equipped),
      carryState,
      carryLabel,
      canHold,
      isHeld,
      isDropped: carryState === "dropped",
      drawOptions: gripOptions,
      changeGripOptions: gripOptions.filter((option) => option.key !== carryState),
      damageFormula: damage.formula ?? "",
      damageType: NARUTO25E.damageTypes?.[damage.type] ?? damage.type ?? "",
      hasDamage: Boolean(damage.formula),
      hasCombatUse: Boolean(item.hasCombatUse),
      hasUses: Boolean(item.hasUses),
      usesValue: Number(uses.value ?? 0),
      usesMax: Number(uses.max ?? 0),
      useEffectText: useEffect.text ?? "",
      notes: item.notes ?? ""
    };
  }

  _getV2TaijutsuStyleSummaries() {
    const skills = this.actor.system?.skills ?? {};
    const styleKeys = ["corpsACorps", "goken", "juken", "chuken", "coupSpecialTai"];

    return styleKeys
      .map((skillKey) => {
        const skill = skills[skillKey] ?? {};
        const definition = NARUTO25E.skillDefinitions?.[skillKey] ?? {};
        const owned = Boolean(skill.owned || definition.ownedByDefault);

        if (!owned) return null;

        return {
          key: skillKey,
          label: definition.label ?? skillKey,
          value: Number(skill.total ?? skill.natural ?? skill.value ?? 0),
          base: definition.base ?? "",
          hint: skillKey === "juken"
            ? "Style Jūken : dépend des prérequis Hyūga / Byakugan / Médecine selon cadrage."
            : skillKey === "goken"
            ? "Style Gōken : combat physique direct."
            : skillKey === "chuken"
            ? "Style Chūken : combat souple / alternatif."
            : "Corps à corps générique."
        };
      })
      .filter(Boolean);
  }

  _buildV2TechniqueContext(context) {
    const sourceGroups = Array.isArray(context.techniqueGroups)
      ? context.techniqueGroups
      : [];

    const groups = sourceGroups.map((group) => {
      const techniques = Array.isArray(group.techniques)
        ? group.techniques.map((technique) => ({
            ...technique,
            frenchName: this._getV2TechniqueFrenchName(technique)
          }))
        : [];

      return {
        ...group,
        techniques
      };
    });

    const lineagePowers = Array.isArray(context.lineagePowerItems)
      ? context.lineagePowerItems
      : [];

    const activeLineagePowers = lineagePowers.filter((power) => Boolean(power.active));
    const activeTechniques = groups
      .flatMap((group) => Array.isArray(group.techniques) ? group.techniques : [])
      .filter((technique) => Boolean(technique.active));

    return {
      groups,
      hasGroups: groups.some((group) => Array.isArray(group.techniques) && group.techniques.length > 0),
      activeTechniques,
      hasActiveTechniques: activeTechniques.length > 0,
      total: groups.reduce((total, group) => {
        return total + (Array.isArray(group.techniques) ? group.techniques.length : 0);
      }, 0),
      lineagePowers,
      activeLineagePowers,
      hasLineagePowers: lineagePowers.length > 0,
      hasActiveLineagePowers: activeLineagePowers.length > 0,
      maintenance: context.lineageMaintenanceSummary ?? {
        activeCount: 0,
        totalMaintenance: 0,
        passiveRegen: 0,
        netCost: 0,
        currentChakra: 0,
        nextChakra: 0,
        crossesCriticalThreshold: false
      }
    };
  }

  _buildV2InventoryContext(context) {
    const system = this.actor.system ?? {};
    const inventory = system.inventory ?? {};
    const consumables = system.consumables ?? {};
    const groups = Array.isArray(context.inventoryByType) ? context.inventoryByType : [];

    const countItems = (type) => {
      const group = groups.find((entry) => entry.type === type);
      return Array.isArray(group?.items) ? group.items.length : 0;
    };

    return {
      ryo: Number(inventory.ryo ?? 0),
      ryoDelta: Number(inventory.ryoDelta ?? 0),
      groups,
      summary: inventory.summary ?? {
        totalItems: 0,
        totalWeight: 0,
        equippedWeight: 0,
        totalValue: 0,
        valueByType: {}
      },
      encumbrance: inventory.encumbrance ?? {
        label: "Charge inactive",
        penaltyText: "La charge est désactivée pour Naruto 2.5e dans cette version."
      },
      toxicity: consumables.toxicity ?? {
        value: 0,
        max: 10,
        dailyValue: 0,
        dailyMax: 6,
        weeklyValue: 0,
        weeklyMax: 10,
        notes: ""
      },
      counts: {
        weapons: countItems("weapon"),
        armors: countItems("armor"),
        consumables: countItems("consumable"),
        misc: countItems("misc")
      }
    };
  }

  _buildV2LineageContext(context, heritage, identityContext, canSeePrivateLineage) {
    const heritageState = context.heritageState ?? {};
    const mode = String(heritageState.mode ?? heritage.mode ?? "clan");
    const hiddenClan = heritageState.hiddenClan ?? {};
    const gmOptions = heritage.gmOptions ?? {};
    const lineagePowerItems = Array.isArray(context.lineagePowerItems)
      ? context.lineagePowerItems
      : [];

    const getClanLabel = (clanKey) => {
      const key = String(clanKey ?? "");
      if (!key) return "—";
      return NARUTO25E.clans?.[key]?.label ?? key;
    };

    const getVoieLabel = (voieKey) => {
      const key = String(voieKey ?? "");
      if (!key) return "—";
      return NARUTO25E.voies?.[key]?.label ?? key;
    };

    const primaryClanKey = String(heritage.clan ?? "");
    const secondaryClanKey = String(heritage.hybrid?.secondaryClan ?? "");
    const voieKey = String(heritage.voie ?? "");
    const customClan = heritage.customClan ?? {};

    const mechanicalClanLabels = Array.isArray(heritageState.mechanicalClanKeys)
      ? heritageState.mechanicalClanKeys.map((clanKey) => ({
          key: clanKey,
          label: getClanLabel(clanKey)
        }))
      : [];

    return {
      canSeePrivateLineage,
      public: {
        modeLabel: identityContext.publicHeritageModeLabel,
        heritageLabel: identityContext.publicHeritageLabel
      },
      mode,
      modeLabel: NARUTO25E.heritageModes?.[mode] ?? mode,
      primaryClan: {
        key: primaryClanKey,
        label: getClanLabel(primaryClanKey)
      },
      secondaryClan: {
        key: secondaryClanKey,
        label: getClanLabel(secondaryClanKey)
      },
      voie: {
        key: voieKey,
        label: getVoieLabel(voieKey)
      },
      customClan: {
        name: String(customClan.name ?? ""),
        summary: String(customClan.summary ?? ""),
        notes: String(customClan.notes ?? "")
      },
      hiddenClan: {
        officialClan: hiddenClan.officialClan ?? "",
        officialClanLabel: hiddenClan.officialClanLabel ?? getClanLabel(hiddenClan.officialClan),
        realClan: hiddenClan.realClan ?? "",
        realClanLabel: hiddenClan.realClanLabel ?? getClanLabel(hiddenClan.realClan),
        awareness: hiddenClan.awareness ?? "ignorant",
        awarenessLabel: hiddenClan.awarenessLabel ?? "—",
        awarenessSummary: hiddenClan.awarenessSummary ?? "",
        unlocked: Boolean(hiddenClan.unlocked),
        effectiveLineageCap: hiddenClan.effectiveLineageCap ?? null,
        effectiveLineageValue: hiddenClan.effectiveLineageValue ?? 0,
        notes: hiddenClan.notes ?? ""
      },
      mechanicalClanLabels,
      hasMechanicalClans: mechanicalClanLabels.length > 0,
      mandatorySkills: Array.isArray(context.heritageMandatorySkills) ? context.heritageMandatorySkills : [],
      hasMandatorySkills: Boolean(context.lineageInfo?.hasMandatorySkills),
      tracks: Array.isArray(context.lineageTracks) ? context.lineageTracks : [],
      hasTracks: Boolean(context.lineageInfo?.hasTracks),
      lineageValue: Number(context.lineageInfo?.value ?? this.actor.system?.bases?.lign?.value ?? 0),
      powers: lineagePowerItems,
      activePowers: lineagePowerItems.filter((power) => Boolean(power.active)),
      hasPowers: lineagePowerItems.length > 0,
      hasActivePowers: lineagePowerItems.some((power) => Boolean(power.active)),
      gmOptions: {
        allowHybridClan: Boolean(heritageState.allowHybridClan ?? gmOptions.allowHybridClan),
        allowHybridVoie: Boolean(heritageState.allowHybridVoie ?? gmOptions.allowHybridVoie),
        allowCustomClan: Boolean(heritageState.allowCustomClan ?? gmOptions.allowCustomClan),
        hasMangekyoSharingan: Boolean(heritageState.hasMangekyoSharingan ?? gmOptions.hasMangekyoSharingan),
        hasEternalMangekyoSharingan: Boolean(heritageState.hasEternalMangekyoSharingan ?? gmOptions.hasEternalMangekyoSharingan),
        hasSenjuCells: Boolean(heritageState.hasSenjuCells ?? gmOptions.hasSenjuCells),
        hasRinnegan: Boolean(heritageState.hasRinnegan ?? gmOptions.hasRinnegan),
        hasTenseigan: Boolean(heritageState.hasTenseigan ?? gmOptions.hasTenseigan)
      },
      dojutsu: {
        hasUchihaLineage: Boolean(heritageState.hasUchihaLineage),
        hasHyugaLineage: Boolean(heritageState.hasHyugaLineage),
        hasSenjuLineage: Boolean(heritageState.hasSenjuLineage),
        hasMangekyoSharingan: Boolean(heritageState.hasMangekyoSharingan),
        hasEternalMangekyoSharingan: Boolean(heritageState.hasEternalMangekyoSharingan),
        hasSenjuCells: Boolean(heritageState.hasSenjuCells),
        hasSenjuCellsByLineage: Boolean(heritageState.hasSenjuCellsByLineage),
        hasSenjuCellsByImplant: Boolean(heritageState.hasSenjuCellsByImplant),
        canAwakenRinnegan: Boolean(heritageState.canAwakenRinnegan),
        hasRinnegan: Boolean(heritageState.hasRinnegan),
        hasTenseigan: Boolean(heritageState.hasTenseigan)
      },
      uchihaPowerMode: heritageState.uchihaPowerMode ?? "classic",
      uchihaPowerModeData: heritageState.uchihaPowerModeData ?? {},
      uchihaEyePowers: heritageState.uchihaEyePowers ?? [],
      mangekyo: heritageState.mangekyo ?? {
        rightEyePowerLabel: "—",
        leftEyePowerLabel: "—",
        rightEyeStateLabel: "Sain",
        leftEyeStateLabel: "Sain",
        rightEyePowerOptions: [],
        leftEyePowerOptions: [],
        rightEyeStateOptions: [],
        leftEyeStateOptions: [],
        uses: 0,
        usageState: {}
      }
    };
  }

  _buildV2ProgressionContext(context) {
    const system = this.actor.system ?? {};
    const missions = system.missions ?? {};
    const rankProgression = context.rankProgression ?? {};
    const experienceSummary = context.experienceSummary ?? {};
    const creationValidation = context.creationValidation ?? {};

    return {
      rank: {
        currentLabel: rankProgression.currentLabel ?? "Aspirant Ninja",
        currentShortLabel: rankProgression.currentShortLabel ?? "Aspirant",
        currentBaseCap: Number(rankProgression.currentBaseCap ?? context.baseCap ?? 3),
        next: rankProgression.next ?? null,
        checks: Array.isArray(rankProgression.checks) ? rankProgression.checks : [],
        canPromote: Boolean(rankProgression.canPromote),
        requiresGM: Boolean(rankProgression.requiresGM),
        automaticChecksPassed: Boolean(rankProgression.automaticChecksPassed),
        isMaxRank: Boolean(rankProgression.isMaxRank)
      },
      experience: {
        total: Number(experienceSummary.total ?? system.progression?.experience?.total ?? 0),
        spent: Number(experienceSummary.spent ?? system.progression?.experience?.spent ?? 0),
        baseSpent: Number(experienceSummary.baseSpent ?? 0),
        skillSpent: Number(experienceSummary.skillSpent ?? 0),
        available: Number(experienceSummary.available ?? system.progression?.experience?.available ?? 0)
      },
      bases: Array.isArray(context.bases) ? context.bases : [],
      skillGroups: Array.isArray(context.skillGroups)
        ? context.skillGroups.map((group) => ({
            ...group,
            skills: Array.isArray(group.skills)
              ? group.skills.map((skill) => ({
                  ...skill,
                  help: this._getV2SkillHelp(skill)
                }))
              : []
          }))
        : [],
      creationSkillSummary: context.creationSkillSummary ?? {
        used: 0,
        max: 5,
        remaining: 5,
        overLimit: false
      },
      missions: {
        ranks: Array.isArray(context.missionRanks) ? context.missionRanks : [],
        totalCompleted: Number(missions.totalCompleted ?? 0),
        totalFailed: Number(missions.totalFailed ?? 0)
      },
      creation: {
        state: context.creationState ?? {},
        validation: creationValidation,
        valid: Boolean(creationValidation.valid),
        errors: Array.isArray(creationValidation.errors) ? creationValidation.errors : [],
        warnings: Array.isArray(creationValidation.warnings) ? creationValidation.warnings : [],
        summary: creationValidation.summary ?? {}
      }
    };
  }

  _getV2SkillHelp(skill = {}) {
    const key = String(skill.key ?? "");
    const definition = NARUTO25E.skillDefinitions?.[key] ?? {};

    if (NARUTO25E_V2_SKILL_HELP[key]) {
      return NARUTO25E_V2_SKILL_HELP[key];
    }

    if (definition.description) {
      return definition.description;
    }

    const baseLabel = NARUTO25E.baseLabels?.[definition.base] ?? definition.base ?? "—";
    const categoryLabel =
      NARUTO25E.skillCategoryLabels?.[definition.category]
      ?? NARUTO25E.skillCategories?.[definition.category]
      ?? definition.category
      ?? "Compétence";

    return `${categoryLabel}. Base associée : ${baseLabel}.`;
  }

  _getV2TechniqueFrenchName(technique = {}) {
    const directName =
      technique.frenchName
      ?? technique.frName
      ?? technique.nameFr
      ?? technique.translationFr
      ?? technique.localizedName
      ?? "";

    if (directName) return String(directName);

    const name = String(technique.name ?? "");

    if (name.includes("—")) {
      const [, frenchPart] = name.split("—");
      return String(frenchPart ?? "").trim();
    }

    if (name.includes(" - ")) {
      const [, frenchPart] = name.split(" - ");
      return String(frenchPart ?? "").trim();
    }

    return "";
  }

  _buildV2TabsContext(canSeePrivateLineage = true) {
    if (!canSeePrivateLineage) {
      return [
        { key: "summary", label: "Résumé" }
      ];
    }

    return [
      { key: "summary", label: "Résumé" },
      { key: "combat", label: "Combat" },
      { key: "techniques", label: "Techniques" },
      { key: "inventory", label: "Inventaire" },
      { key: "character", label: "Personnage" },
      { key: "lineage", label: "Lignée" },
      { key: "progression", label: "Progression" }
    ];
  }

  _getV2PublicHeritageLabel(heritage, heritageMode) {
    if (heritageMode === "voie") {
      const voieKey = String(heritage.voie ?? "");
      return NARUTO25E.voies?.[voieKey]?.label ?? (voieKey || "—");
    }

    if (heritageMode === "hiddenClan" && typeof this.actor._getSocialClanKey === "function") {
      const socialClanKey = this.actor._getSocialClanKey();
      return NARUTO25E.clans?.[socialClanKey]?.label ?? (socialClanKey || "—");
    }

    const clanKey = String(heritage.clan ?? "");

    if (clanKey) {
      return NARUTO25E.clans?.[clanKey]?.label ?? clanKey;
    }

    const voieKey = String(heritage.voie ?? "");

    if (voieKey) {
      return NARUTO25E.voies?.[voieKey]?.label ?? voieKey;
    }

    return "—";
  }

  _getV2NindoShort(identity) {
    const nindo = this.actor.system?.nindo ?? {};
    const choiceMode = String(nindo.choiceMode ?? "preset");

    if (choiceMode === "custom") {
      return String(identity.nindoText ?? "").trim() || "—";
    }

    const presetKey = String(nindo.preset ?? "");
    const preset = NARUTO25E.nindoPresets?.[presetKey];

    return preset?.name ?? preset?.label ?? identity.nindoText ?? "—";
  }

  _getV2VillageIcon(villageKey, villageStatusKey) {
    const isNukenin = ["deserter", "nukenin"].includes(String(villageStatusKey ?? ""));
    const iconKey = isNukenin ? `${villageKey}_nukenin` : villageKey;

    return NARUTO25E_V2_VILLAGE_ICON_PATHS[iconKey] ?? NARUTO25E_V2_VILLAGE_ICON_PATHS[villageKey] ?? "";
  }

  _getV2ChakraIcons() {
    const icons = [];
    const addIcon = (key, label = "") => {
      const normalizedKey = String(key ?? "");
      if (!normalizedKey) return;
      if (icons.some((icon) => icon.key === normalizedKey)) return;

      const src = NARUTO25E_V2_CHAKRA_ICON_PATHS[normalizedKey];
      if (!src) return;

      icons.push({
        key: normalizedKey,
        label: label || NARUTO25E.skillDefinitions?.[normalizedKey]?.label || NARUTO25E.chakraAffinities?.[normalizedKey]?.label || normalizedKey,
        src
      });
    };

    const affinities = this.actor.system?.chakra?.affinities ?? {};
    const ownedAffinities = Array.isArray(affinities.owned) ? affinities.owned : [];
    const forcedAffinities = Array.isArray(affinities.forced) ? affinities.forced : [];
    const extraAffinities = Array.isArray(affinities.extra) ? affinities.extra : [];

    addIcon(affinities.primary);
    addIcon(affinities.secondary);

    for (const affinity of ownedAffinities) {
      addIcon(typeof affinity === "object" ? affinity.key : affinity);
    }

    for (const affinity of forcedAffinities) {
      addIcon(typeof affinity === "object" ? affinity.key : affinity);
    }

    for (const affinity of extraAffinities) {
      addIcon(typeof affinity === "object" ? affinity.key : affinity);
    }

    const skills = this.actor.system?.skills ?? {};

    if (skills.iryo?.owned) addIcon("iryo", "Iryō");

    if (skills.goken?.owned || skills.juken?.owned || skills.chuken?.owned || skills.corpsACorps?.owned) {
      addIcon("taijutsu", "Taijutsu");
    }

    if (skills.armesSimples?.owned || skills.armesExotiques?.owned || skills.coupSpecialArm?.owned) {
      addIcon("armes", "Armes");
    }

    return icons;
  }

  _getV2ActionSummary(combatActions) {
    const simple = combatActions.simpleAvailable ? "Simple ✓" : "Simple ×";
    const complex = combatActions.complexAvailable ? "Complexe ✓" : "Complexe ×";
    const delayed = combatActions.delayedAvailable ? "Retardée ✓" : "Retardée —";

    return `${simple} · ${complex} · ${delayed}`;
  }
}