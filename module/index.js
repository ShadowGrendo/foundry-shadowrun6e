
// Import Modules
import { ShadowrunActor } from "./actor.js"
import { ShadowrunItemSheet } from "./item-sheet.js"
import { ShadowrunActorSheet } from "./actor-sheet.js"

/* -------------------------------------------- */
/*  Foundry VTT Initialization                  */
/* -------------------------------------------- */

Hooks.once("init", async function () {
   console.log(`Welcome to Shadowrun 6th World, Chummer!`)

	/**
	 * Set an initiative formula for the system
	 * @type {String}
	 */
   CONFIG.Combat.initiative = {
      formula: "1d20",
      decimals: 2
   }

   // Define custom Entity classes
   CONFIG.Actor.entityClass = ShadowrunActor

   // Register sheet application classes
   Actors.unregisterSheet("core", ActorSheet)
   Actors.registerSheet("shadowrun", ShadowrunActorSheet, { makeDefault: true })
   Items.unregisterSheet("core", ItemSheet)
   Items.registerSheet("shadowrun", ShadowrunItemSheet, { makeDefault: true })

   // Register system settings
   game.settings.register("shadowrun", "macroShorthand", {
      name: "Shortened Macro Syntax",
      hint: "Enable a shortened macro syntax which allows referencing attributes directly, for example @str instead of @attributes.str.value. Disable this setting if you need the ability to reference the full attribute model, for example @attributes.str.label.",
      scope: "world",
      type: Boolean,
      default: true,
      config: true
   })
})
