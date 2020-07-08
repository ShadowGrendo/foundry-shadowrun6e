export class QualitySheet extends ItemSheet {
   constructor(...args) {
      super(...args)

      // track a list of things marked as deleted for the formudata method
      this.deleted = []
      // keep a hold of the calculated  data so we can resolve tests, hope chrome optimizes objects in memory
      this.calculated = {}


   }

   /** @override */
   static get defaultOptions() {
      return mergeObject(super.defaultOptions, {
         classes: ["shadowrun", "sheet", "quality"],
         template: "systems/shadowrun6e/templates/items/quality-sheet.html",
         width: 500,
         height: 250,
         // tabs: [{ navSelector: ".sheet-tabs", contentSelector: ".sheet-body", initial: "overview" }]

      })
   }

}