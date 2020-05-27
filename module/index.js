import { ShadowrunActor } from "./actor.js"
import { ShadowrunItemSheet } from "./item-sheet.js"
import { ShadowrunActorSheet } from "./actor-sheet.js"
import { Names } from './shadowrun.js'

/* -------------------------------------------- */
/*  Foundry VTT Initialization                  */
/* -------------------------------------------- */

Hooks.once("init", async function () {
   console.log(`Welcome to Shadowrun 6th World, Chummer!`)

   // Define custom Entity classes
   CONFIG.Actor.entityClass = ShadowrunActor

   Combat.prototype._getInitiativeFormula = combatant => {
      let data = combatant.actor.data.data
      // console.log('[initiative]', data)
      return `${data.attributes.reaction.value + data.attributes.intuition.value} + ${data.initiative.physical.dice}d6`
   }

   // Register sheet application classes
   Actors.unregisterSheet("core", ActorSheet)
   Actors.registerSheet("shadowrun", ShadowrunActorSheet, { makeDefault: true })
   Items.unregisterSheet("core", ItemSheet)
   Items.registerSheet("shadowrun", ShadowrunItemSheet, { makeDefault: true })


   Hooks.on("renderChatMessage", (msg, html, data) => {
      // check for glitches when rolling #d6cs>4
      if (!msg.isRoll || !msg.isContentVisible || msg.roll.parts[0].faces !== 6 || !msg.roll.formula.match(/cs>4/i)) return

      let results = msg.roll.parts[0].rolls.reduce((accumulator, current) => {
         if (current.roll === 1) {
            accumulator.ones++
         } else if (current.success) {
            accumulator.hits++
         }
         accumulator.dice++
         return accumulator
      }, { ones: 0, hits: 0, dice: 0 })

      if (results.ones > results.dice / 2 && results.hits === 0) {
         html.find('.dice-total').addClass('glitch')
         html.find('.dice-total')[0].innerText = 'CRITICAL GLITCH!'
      } else if (results.ones > results.dice / 2) {
         html.find('.dice-total').addClass('glitch')
         html.find('.dice-total').append(`<span> ${msg.roll.result === '1' ? 'hit' : 'hits'} + glitch</span>`)
      } else {
         html.find('.dice-total').append(`<span> ${msg.roll.result === '1' ? 'hit' : 'hits'}</span>`)
      }

   })


   // isEqual helper
   Handlebars.registerHelper("isEqual", function (a, b) {
      return a === b
   })

   // lookup the abbreviation of a well know term
   Handlebars.registerHelper("abbreviate", function (term) {
      return Names.abbreviate(term)
   })

   // lookup the display version of a well know term
   Handlebars.registerHelper("display", function (term) {
      return Names.display(term)
   })

   Handlebars.registerHelper('add', function (a, b) {
      return a + b
   })



   // Register an inline markdown editor helper
   Handlebars.registerHelper('md-editor', function (options) {

      // texteditor enrich html. 

      let target = options.hash['target'],
         content = options.hash['content'] || "",
         button = Boolean(options.hash['button']),
         owner = Boolean(options.hash['owner']),
         editable = Boolean(options.hash['editable'])


      if (!target) throw new Error("You must define the name of a target field.")

      // Enrich the content
      // this will do foundry specific stuff to html. We want to run it, for secrets and such, but we'll have to do it 
      content = TextEditor.enrichHTML(content, { secrets: owner, entities: true })

      // Construct the HTML
      let editor = $(`<div class="editor"><div class="editor-content" data-edit="${target}">${content}</div></div>`)

      // Append edit button
      if (button && editable) editor.append($('<a class="editor-edit"><i class="fas fa-edit"></i></a>'))
      return new Handlebars.SafeString(editor[0].outerHTML)


   })



})
