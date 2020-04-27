import { Actor6e } from './actor/entity.js';

export const addChatMessageContextOptions = function(html, options) {
  let canRoll = li => {
    let msg = game.messages.get(li.data().messageId);

    if (li.find(".dice-roll").length
          && msg 
          && (msg.user.id === game.user.id || game.user.isGM)) {
      return true;
    }

    return false;
  }
  options.push(
    {
      name: 'Push the Limit',
      callback: li => Actor6e.pushTheLimit(li),
      condition: canRoll,
      icon: '<i class="fas fa-meteor"></i>'
    },
    {
      name: 'Second Chance',
      callback: li => Actor6e.secondChance(li),
      condition: canRoll,
      icon: '<i class="fas fa-dice-d6"></i>'
    }
  );
  return options;
}
