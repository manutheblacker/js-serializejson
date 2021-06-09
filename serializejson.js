/**
 * Serialize all form data into a JSON string
 * (c) 2021 Chris Ferdinandi, MIT License, https://gomakethings.com
 * @param {HTMLFormElement} form The form to serialize
 * @returns {String} The serialized form data
 */
function serializeJSON (form) {
  var obj = {};
  Array.prototype.slice.call(form.elements).forEach(function (field) {
    if (!field.name || field.disabled || ['file', 'reset', 'submit', 'button'].indexOf(field.type) > -1) return;
    if (field.type === 'select-multiple') {
      var options = [];
      Array.prototype.slice.call(field.options).forEach(function (option) {
        if (!option.selected) return;
        options.push(option.value);
      });
      if (options.length) {
        obj[field.name] = options;
      }
      return;
    }
    if (['checkbox', 'radio'].indexOf(field.type) > -1 && !field.checked) return;
    obj[field.name] = field.value;
  });
  return JSON.stringify(obj, null, 2);
}
