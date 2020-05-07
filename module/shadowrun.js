
export default function (_) {

   //todo - probably need a function to run per sheet type
   console.log('[shadowrun]', _)

   // determine current values for attributes
   _.data.attributes.body.current = _.data.attributes.body.base + _.data.attributes.body.adj
   _.data.attributes.agility.current = _.data.attributes.agility.base + _.data.attributes.agility.adj
   _.data.attributes.reaction.current = _.data.attributes.reaction.base + _.data.attributes.reaction.adj
   _.data.attributes.strength.current = _.data.attributes.strength.base + _.data.attributes.strength.adj
   _.data.attributes.willpower.current = _.data.attributes.willpower.base + _.data.attributes.willpower.adj
   _.data.attributes.logic.current = _.data.attributes.logic.base + _.data.attributes.logic.adj
   _.data.attributes.intuition.current = _.data.attributes.intuition.base + _.data.attributes.intuition.adj
   _.data.attributes.charisma.current = _.data.attributes.charisma.base + _.data.attributes.charisma.adj
   _.data.attributes.edge.current = _.data.attributes.edge.base + _.data.attributes.edge.adj
   _.data.attributes.essence.current = _.data.attributes.essence.base + _.data.attributes.essence.adj

   // magic and resonance reduced by 1 for every full 
   let essenceLoss = 6 - Math.ceil(_.data.attributes.essence.current)

   _.data.attributes.magic.current = _.data.attributes.magic.base + _.data.attributes.magic.adj - essenceLoss
   _.data.attributes.resonance.current = _.data.attributes.resonance.base + _.data.attributes.resonance.adj - essenceLoss

   // set maximums based on metatype
   // it's not a huge calc, but wish I didn't have to do it every time. 



   // condition tracks

   
   return _

}