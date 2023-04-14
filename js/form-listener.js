import { validateField } from "./form-validation.js";

// Event listeners by type

const form = document.querySelector("form");

const addEventListenerByType = (selector, eventType, rules) => {
  const fields = form.querySelectorAll(selector);
  fields.forEach((field) => {
    field.addEventListener(eventType, () => {
        console.log(field);
      validateField(field, [...rules, field.name]);
    });
  });
};

// Calling up the headphone function by type

addEventListenerByType("[type='text'][required]", "input", ["required"]);
addEventListenerByType("[type='email'][required]", "input", ["required"]);
addEventListenerByType("[type='number'][required]", "input", ["required"]);
addEventListenerByType("[type='radio'][required]", "click", []);
addEventListenerByType("[type='checkbox'][required]", "click", []);
addEventListenerByType("[type='date'][required]", "input", ["required"]);

export { addEventListenerByType };
