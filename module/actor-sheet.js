import { CalculateCharacterData, Names } from './shadowrun.js'


/**
 * Extend the basic ActorSheet with some very simple modifications
 * @extends {ActorSheet}
 */
export class ShadowrunActorSheet extends ActorSheet {


   constructor(...args) {
      super(...args)

      // track a list of things marked as deleted for the formudate method
      this.deleted = []
   }


   /** @override */
   static get defaultOptions() {
      return mergeObject(super.defaultOptions, {
         classes: ["shadowrun", "sheet", "actor"],
         template: "systems/shadowrun6e/templates/actor-sheet.html",
         width: 1000,
         height: 600,
         tabs: [{ navSelector: ".sheet-tabs", contentSelector: ".sheet-body", initial: "overview" }]
      })
   }

   /* -------------------------------------------- */

   /** @override */
   getData() {
      const data = super.getData()
      console.log(`[get data]`, data)
      var calculated = CalculateCharacterData(data)
      return calculated
   }

   /* -------------------------------------------- */

   /** @override */
   activateListeners(html) {
      super.activateListeners(html)

      // Everything below here is only needed if the sheet is editable
      if (!this.options.editable) return

      // // Update Inventory Item
      // html.find('.item-edit').click(ev => {
      //    const li = $(ev.currentTarget).parents(".item")
      //    const item = this.actor.getOwnedItem(li.data("itemId"))
      //    item.sheet.render(true)
      // })

      // // Delete Inventory Item
      // html.find('.item-delete').click(ev => {
      //    const li = $(ev.currentTarget).parents(".item")
      //    this.actor.deleteOwnedItem(li.data("itemId"))
      //    li.slideUp(200, () => this.render(false))
      // })

      // // Add or Remove Attribute
      // html.find(".attributes").on("click", ".attribute-control", this._onClickAttributeControl.bind(this))

      // console.log('[listener html]', html.find('[data-control=knowledge-skills]'))

      // register listener for knowledge skill controls
      html.find('[data-control=knowledge-skills]').on('click', this.knowledgeSkillsControl.bind(this))

      html.find('[data-roll]').on('click', this.rollTest.bind(this))


   }



   async knowledgeSkillsControl(event) {
      event.preventDefault()

      let a = event.currentTarget
      let action = a.dataset.action
      let knowledges = this.object.data.data.skills.knowledge
      let form = this.form

      if (action === 'create') {
         // add a new knowledge skill
         let next = Object.keys(knowledges).length
         let newSkill = document.createElement('li')
         newSkill.innerHTML = `<input type="text" data-dtype="String" name="data.skills.knowledge.${next}.name" value="" placeholder="knowledge" />
         <a data-control="knowledge-skills" data-action="delete"><i class="fas fa-trash"></i></a>`
         form.appendChild(newSkill)
      } else if (action === 'delete') {
         let li = a.parentElement
         let id = li.dataset.id
         delete this.object.data.data.skills.knowledge[id]
         // push a delete message to be appended to the formdata update
         this.deleted.push(`data.skills.knowledge.-=${id}`)
         li.remove()
      }

      await this._onSubmit(event)
   }

   async rollTest(event) {
      event.preventDefault()
      let a = event.currentTarget
      let data = JSON.parse(a.dataset.roll)

      // todo - if holding shift when the event triggers, first show a dialog with options for rolling options like edge, threshold, and conditions

      if (event.shiftKey) {
         let roll = new Roll(`${data.pool}d6cs>4`).roll()

         return roll.toMessage({
            speaker: {
               actor: this.actor._id,
               token: this.actor.token,
               alias: this.actor.name
            },
            flavor: `Shift Key ${Names.display(data.test)}`
         })


         carolina
         // Render modal dialog
         //  template = template || "systems/dnd5e/templates/chat/roll-dialog.html";
         //  let dialogData = {
         //    formula: parts.join(" + "),
         //    data: data,
         //    rollMode: rollMode,
         //    rollModes: CONFIG.rollModes,
         //    config: CONFIG.DND5E
         //  };
         //  const html = await renderTemplate(template, dialogData);

         // Create the Dialog window
         //  let roll;
         //  return new Promise(resolve => {
         //    new Dialog({
         //      title: title,
         //      content: html,
         //      buttons: {
         //        advantage: {
         //          label: game.i18n.localize("DND5E.Advantage"),
         //          callback: html => roll = _roll(parts, 1, html[0].children[0])
         //        },
         //        normal: {
         //          label: game.i18n.localize("DND5E.Normal"),
         //          callback: html => roll = _roll(parts, 0, html[0].children[0])
         //        },
         //        disadvantage: {
         //          label: game.i18n.localize("DND5E.Disadvantage"),
         //          callback: html => roll = _roll(parts, -1, html[0].children[0])
         //        }
         //      },
         //      default: "normal",
         //      close: html => {
         //        if (onClose) onClose(html, parts, data);
         //        resolve(rolled ? roll : false)
         //      }
         //    }, dialogOptions).render(true);
         //  })






      } else {
         let roll = new Roll(`${data.pool}d6cs>4`).roll()
         return roll.toMessage({
            speaker: {
               actor: this.actor._id,
               token: this.actor.token,
               alias: this.actor.name
            },
            flavor: `${Names.display(data.test)}`
         })
      }

   }

   /* -------------------------------------------- */

   /** @override */
   setPosition(options = {}) {
      const position = super.setPosition(options)
      return position
   }

   /* -------------------------------------------- */

   /**
    * Listen for click events on an attribute control to modify the composition of attributes in the sheet
    * @param {MouseEvent} event    The originating left click event
    * @private
    */
   async _onClickAttributeControl(event) {
      event.preventDefault()
      // const a = event.currentTarget
      // const action = a.dataset.action
      // const attrs = this.object.data.data.attributes
      // const form = this.form

      // // Add new attribute
      // if (action === "create") {
      //    const nk = Object.keys(attrs).length + 1
      //    let newKey = document.createElement("div")
      //    newKey.innerHTML = `<input type="text" name="data.attributes.attr${nk}.key" value="attr${nk}"/>`
      //    newKey = newKey.children[0]
      //    form.appendChild(newKey)
      //    await this._onSubmit(event)
      // }

      // // Remove existing attribute
      // else if (action === "delete") {
      //    const li = a.closest(".attribute")
      //    li.parentElement.removeChild(li)
      //    await this._onSubmit(event)
      // }
   }

   /* -------------------------------------------- */

   /** @override */
   _updateObject(event, formData) {

      // // Handle the free-form attributes list
      // const formAttrs = expandObject(formData).data.attributes || {}
      // const attributes = Object.values(formAttrs).reduce((obj, v) => {
      //    let k = v["key"].trim()
      //    if (/[\s\.]/.test(k)) return ui.notifications.error("Attribute keys may not contain spaces or periods")
      //    delete v["key"]
      //    obj[k] = v
      //    return obj
      // }, {})

      // // Remove attributes which are no longer used
      // for (let k of Object.keys(this.object.data.data.attributes)) {
      //    if (!attributes.hasOwnProperty(k)) attributes[`-=${k}`] = null
      // }

      // // Re-combine formData
      // formData = Object.entries(formData).filter(e => !e[0].startsWith("data.attributes")).reduce((obj, e) => {
      //    obj[e[0]] = e[1]
      //    return obj
      // }, { _id: this.object._id, "data.attributes": attributes })

      // let d = expandObject(formData)
      // console.log('[expanded update data]', d)
      //formData['data.skills.knowledge.-=2'] = null

      console.log('[update object deleted', this.deleted)
      console.log('[update object]', formData)

      this.deleted.forEach(element => {
         formData[element] = null
      })
      this.deleted = []

      // Update the Actor
      return this.object.update(formData)
   }
}
