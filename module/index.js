
// Import Modules
import { ShadowrunActor } from "./actor.js"
import { ShadowrunItemSheet } from "./item-sheet.js"
import { ShadowrunActorSheet } from "./actor-sheet.js"
import { Names } from './shadowrun.js'



/* -------------------------------------------- */
/*  Foundry VTT Initialization                  */
/* -------------------------------------------- */

Hooks.once("init", async function () {
   console.log(`Welcome to Shadowrun 6th World, Chummer!`)

	/**
	 * Set an initiative formula for the system
	 * @type {String}
	 */

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


   // isEqual
   Handlebars.registerHelper("isEqual", function (a, b) {
      return a === b
   })

   Handlebars.registerHelper("abbreviate", function (term) {
      return Names[term].abbreviation || term
   })


   // Register an inline markdown editor helper
   Handlebars.registerHelper('md-editor', function (options) {

      // texteditor enrich html. 

      let target = options.hash['target'],
         content = options.hash['content'] || "",
         button = Boolean(options.hash['button']),
         owner = Boolean(options.hash['owner']),
         editable = Boolean(options.hash['editable']);


      if (!target) throw new Error("You must define the name of a target field.");

      // Enrich the content
      // this will do foundry specific stuff to html. We want to run it, for secrets and such, but we'll have to do it 
      content = TextEditor.enrichHTML(content, { secrets: owner, entities: true });

      // Construct the HTML
      let editor = $(`<div class="editor"><div class="editor-content" data-edit="${target}">${content}</div></div>`);

      // Append edit button
      if (button && editable) editor.append($('<a class="editor-edit"><i class="fas fa-edit"></i></a>'));
      return new Handlebars.SafeString(editor[0].outerHTML);


   });



})
