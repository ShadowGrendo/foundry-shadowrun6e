import fs from 'fs'
import Handlebars from 'handlebars'


// this is a copy of the handlebars helpers included in foundry.js and shadowrun6e.js
// they've been altered to run in a testing environment, namely, the rich editor is removed. 

export default function () {

   // load the translation json
   let lang = fs.readFileSync('lang/en.json')
   let translations = JSON.parse(lang)

   function getProperty(object, key) {
      if (!key) return undefined;
      let target = object;
      for (let p of key.split('.')) {
         target = target || {};
         if (p in target) target = target[p];
         else return undefined;
      }
      return target;
   }

   function localize(stringId) {
      return getProperty(translations, stringId) || stringId;
   }

   Handlebars.registerHelper('localize', function (value, options) {
      return localize(value);
   })

   RegExp.escape = function (string) {
      return string.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
   };

   Handlebars.registerHelper('select', function (selected, options) {
      const escapedValue = RegExp.escape(Handlebars.escapeExpression(selected));
      const rgx = new RegExp(' value=\"' + escapedValue + '\"');
      const html = options.fn(this);
      return html.replace(rgx, "$& selected");
   });



   Handlebars.registerHelper("toHeaderCase", function (str) {
      if (str) return Helpers.label(str);
      return "";
   });

   Handlebars.registerHelper("concat", function (strs, c = ",") {
      if (Array.isArray(strs)) {
         return strs.join(c);
      }
      return strs;
   });
   Handlebars.registerHelper("ifin", function (val, arr, options) {
      if (arr.includes(val)) return options.fn(this);
      else return options.inverse(this);
   });
   // if greater than
   Handlebars.registerHelper("ifgt", function (v1, v2, options) {
      if (v1 > v2) return options.fn(this);
      else return options.inverse(this);
   });
   // if not equal
   Handlebars.registerHelper("ifne", function (v1, v2, options) {
      if (v1 !== v2) return options.fn(this);
      else return options.inverse(this);
   });
   // if equal
   Handlebars.registerHelper("ife", function (v1, v2, options) {
      if (v1 === v2) return options.fn(this);
      else return options.inverse(this);
   });
   Handlebars.registerHelper("sum", function (v1, v2) {
      return v1 + v2;
   });


   Handlebars.registerHelper('checked', function (value, options) {
      return Boolean(value) ? "checked" : "";
   });


   /**
    * An Handlebars helper to format numbers
    */
   Handlebars.registerHelper('numberFormat', function (value, options) {

      // Helper parameters
      let dec = (options.hash['decimals'] !== undefined) ? options.hash['decimals'] : 0,
         sign = options.hash['sign'] || false;

      // Parse to float
      value = parseFloat(value).toFixed(dec);

      // Attach sign
      if (sign) {
         return (value >= 0) ? "+" + value : value;
      } else {
         return value;
      }
   });


   /* -------------------------------------------- */

   Handlebars.registerHelper('timeSince', function (value, options) {
      return timeSince(value);
   });

   /* -------------------------------------------- */


   /**
    * Render a file-picker button linked to an <input> field
    */
   Handlebars.registerHelper('filePicker', function (options) {
      let type = options.hash['type'],
         target = options.hash['target'];
      if (!target) throw new Error("You must define the name of the target field.");

      // Do not display the button for users who do not have browse permission
      // if (game.world && !game.user.can("FILES_BROWSE")) return "";

      // Construct the HTML
      return new Handlebars.SafeString(`
   <button type="button" class="file-picker" data-type="${type}" data-target="${target}" title="Browse Files" tabindex="-1">
       <i class="fas fa-file-import fa-fw"></i>
   </button>`);
   });


   /* -------------------------------------------- */


   /**
    * Render a MCE editor container with an optional toggle button
    */
   Handlebars.registerHelper('editor', function (options) {
      let target = options.hash['target'],
         content = options.hash['content'] || "",
         button = Boolean(options.hash['button']),
         owner = Boolean(options.hash['owner']),
         editable = Boolean(options.hash['editable']);
      if (!target) throw new Error("You must define the name of a target field.");

      // Enrich the content
      // content = TextEditor.enrichHTML(content, { secrets: owner, entities: true });

      // Construct the HTML
      let editor = `<div class="editor"><div class="editor-content" data-edit="${target}">${content}</div></div>`;

      // Append edit button
      // if (button && editable) editor.append($('<a class="editor-edit"><i class="fas fa-edit"></i></a>'));
      return new Handlebars.SafeString(editor[0].outerHTML);
   });





}