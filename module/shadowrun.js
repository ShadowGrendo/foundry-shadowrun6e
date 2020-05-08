let metatypes = {
   human: {
      attributes: {
         body: { min: 1, max: 6 },
         agility: { min: 1, max: 6 },
         reaction: { min: 1, max: 6 },
         strength: { min: 1, max: 6 },
         willpower: { min: 1, max: 6 },
         logic: { min: 1, max: 6 },
         intuition: { min: 1, max: 6 },
         charisma: { min: 1, max: 6 },
         edge: { min: 1, max: 7 },
      },
      qualities: []
   },
   dwarf: {
      attributes: {
         body: { min: 1, max: 7 },
         agility: { min: 1, max: 6 },
         reaction: { min: 1, max: 5 },
         strength: { min: 1, max: 8 },
         willpower: { min: 1, max: 7 },
         logic: { min: 1, max: 6 },
         intuition: { min: 1, max: 6 },
         charisma: { min: 1, max: 6 },
         edge: { min: 1, max: 6 },
      },
      qualities: ["Toxin Resistance", "Thermographic Vision"]
   },
   elf: {
      attributes: {
         body: { min: 1, max: 6 },
         agility: { min: 1, max: 7 },
         reaction: { min: 1, max: 6 },
         strength: { min: 1, max: 6 },
         willpower: { min: 1, max: 6 },
         logic: { min: 1, max: 6 },
         intuition: { min: 1, max: 6 },
         charisma: { min: 1, max: 8 },
         edge: { min: 1, max: 6 },
      },
      qualities: ["Low-Light Vision"]
   },
   ork: {
      attributes: {
         body: { min: 1, max: 8 },
         agility: { min: 1, max: 6 },
         reaction: { min: 1, max: 6 },
         strength: { min: 1, max: 8 },
         willpower: { min: 1, max: 6 },
         logic: { min: 1, max: 6 },
         intuition: { min: 1, max: 6 },
         charisma: { min: 1, max: 5 },
         edge: { min: 1, max: 6 },
      },
      qualities: ["Low-Light Vision", "Build Tough 1"]
   },
   troll: {
      attributes: {
         body: { min: 1, max: 9 },
         agility: { min: 1, max: 5 },
         reaction: { min: 1, max: 6 },
         strength: { min: 1, max: 9 },
         willpower: { min: 1, max: 6 },
         logic: { min: 1, max: 6 },
         intuition: { min: 1, max: 6 },
         charisma: { min: 1, max: 5 },
         edge: { min: 1, max: 6 },
      },
      qualities: ["Dermal Deposits", "Thermographic Vision", "Built Tough 2"]
   }
}

let abbreviations = {
   "body": "B",
   "agility": "A",
   "reaction": "R",
   "strength": "S",
   "willpower": "W",
   "logic": "L",
   "intuition": "I",
   "charisma": "C",
   "edge": "EDG",
   "essence": "ESS",
   "magic": "M",
   "resonance": "RES"
}

let calculateCharacterData = function (character) {
   console.log('[shadowrun]', character)
   // determine current values for attributes
   character.data.attributes.body.current = character.data.attributes.body.base + character.data.attributes.body.adj
   character.data.attributes.agility.current = character.data.attributes.agility.base + character.data.attributes.agility.adj
   character.data.attributes.reaction.current = character.data.attributes.reaction.base + character.data.attributes.reaction.adj
   character.data.attributes.strength.current = character.data.attributes.strength.base + character.data.attributes.strength.adj
   character.data.attributes.willpower.current = character.data.attributes.willpower.base + character.data.attributes.willpower.adj
   character.data.attributes.logic.current = character.data.attributes.logic.base + character.data.attributes.logic.adj
   character.data.attributes.intuition.current = character.data.attributes.intuition.base + character.data.attributes.intuition.adj
   character.data.attributes.charisma.current = character.data.attributes.charisma.base + character.data.attributes.charisma.adj
   character.data.attributes.edge.current = character.data.attributes.edge.base + character.data.attributes.edge.adj
   character.data.attributes.essence.current = character.data.attributes.essence.base + character.data.attributes.essence.adj

   // magic and resonance reduced by 1 for every full point of essence loss
   let essenceLoss = 6 - Math.ceil(character.data.attributes.essence.current)

   character.data.attributes.magic.current = character.data.attributes.magic.base + character.data.attributes.magic.adj - essenceLoss
   character.data.attributes.resonance.current = character.data.attributes.resonance.base + character.data.attributes.resonance.adj - essenceLoss

   // set maximums based on metatype
   // it's not a huge calc, but wish I didn't have to do it every time. 
   let meta = metatypes[character.data.metatype]
   character.data.attributes.body.max = meta.attributes.body.max
   character.data.attributes.agility.max = meta.attributes.agility.max
   character.data.attributes.reaction.max = meta.attributes.reaction.max
   character.data.attributes.strength.max = meta.attributes.strength.max
   character.data.attributes.willpower.max = meta.attributes.willpower.max
   character.data.attributes.logic.max = meta.attributes.logic.max
   character.data.attributes.intuition.max = meta.attributes.intuition.max
   character.data.attributes.charisma.max = meta.attributes.charisma.max
   character.data.attributes.edge.max = meta.attributes.edge.max

   // calculate default skill pool, including untrained penelties?
   for (let [key, skill] of Object.entries(character.data.skills.active)) {
      if (skill.untrained) {
         skill.pool = (skill.rank === 0 ? -1 : skill.rank) + character.data.attributes[skill.primaryAttribute].current
      } else {
         skill.pool = skill.rank === 0 ? 0 : (skill.rank + character.data.attributes[skill.primaryAttribute].current)
      }
   }

   // condition tracks


   return character

}

export { calculateCharacterData as CalculateCharacterData, metatypes as Metatypes, abbreviations as Abbreviations }