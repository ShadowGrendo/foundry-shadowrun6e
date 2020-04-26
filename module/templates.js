export const preloadHandlebarsTemplates = async () => {

  const templatePaths = [
    "systems/shadowrun6e/templates/actor/parts/actor-equipment.html",
    "systems/shadowrun6e/templates/actor/parts/actor-spellbook.html",
    "systems/shadowrun6e/templates/actor/parts/actor-skills.html",
    "systems/shadowrun6e/templates/actor/parts/actor-matrix.html",
    "systems/shadowrun6e/templates/actor/parts/actor-actions.html",
    "systems/shadowrun6e/templates/actor/parts/actor-config.html",
    "systems/shadowrun6e/templates/actor/parts/actor-bio.html",
    "systems/shadowrun6e/templates/actor/parts/actor-social.html",
    "systems/shadowrun6e/templates/item/parts/description.html",
    "systems/shadowrun6e/templates/item/parts/technology.html",
    "systems/shadowrun6e/templates/item/parts/header.html",
    "systems/shadowrun6e/templates/item/parts/ammo.html",
    "systems/shadowrun6e/templates/item/parts/action.html",
    "systems/shadowrun6e/templates/item/parts/damage.html",
    "systems/shadowrun6e/templates/item/parts/opposed.html",
    "systems/shadowrun6e/templates/item/parts/spell.html",
    "systems/shadowrun6e/templates/item/parts/complex_form.html",
    "systems/shadowrun6e/templates/item/parts/weapon.html",
    "systems/shadowrun6e/templates/item/parts/armor.html",
    "systems/shadowrun6e/templates/item/parts/matrix.html",
    "systems/shadowrun6e/templates/item/parts/weapon-mods.html",
    "systems/shadowrun6e/templates/item/parts/sin.html",
    "systems/shadowrun6e/templates/item/parts/contact.html",
    "systems/shadowrun6e/templates/item/parts/lifestyle.html"
  ];

  return loadTemplates(templatePaths);
};
