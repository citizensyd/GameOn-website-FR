import { removeErrorMessage, displayErrorMessage } from "./form-message.js";

// Validation of required fields
const validateRequired = (field) => {
  if (field instanceof NodeList) {
    field = field[0];
  }
  switch (field.type) {
    case "text":
    case "email":
    case "number":
    case "date":
      return field.value.trim() !== "";
    case "checkbox":
      return field.checked;
    case "radio":
      const selectFieldsValidation = document.querySelectorAll(
        "input[type='radio'][required]"
      );
      return validateLocation(selectFieldsValidation);
    default:
      return false;
  }
};

// Validate name input
const validateName = (field) => {
  const nameRegex = /^.+\S{2,}$/;
  return nameRegex.test(field.value);
};

// Validate email input
const validateEmail = (field) => {
  const emailRegex = /^[\w\.-]+@[\w-]+\.[\w\.-]+$/;
  return emailRegex.test(field.value);
};

// Validate birthdate input
const validateBirthday = (field) => {
  const regex = /^(19|20)\d{2}\-(0[1-9]|1[0-2])\-(0[1-9]|[12][0-9]|3[01])$/;
  return !regex.test(field.value)
    ? false
    : new Date(field.value) > Date.now()
    ? false
    : true;
};

// Validate number of competitions entry test
const validateNumberCompetitions = (field) => {
  const regexNumberCompetitions = /^[0-9][0-9]?$/;
  return regexNumberCompetitions.test(field.value);
};

// Validation of an item in the radio list
const validateLocation = (field) => {
  let isValid = false;
  // If field is a single element
  if (field instanceof Element) {
    isValid = field.checked;
    // If field is a NodeList
  } else if (field instanceof NodeList) {
    for (const radio of field) {
      if (radio.checked) {
        isValid = true;
        break;
      }
    }
  }
  return isValid;
};

// Validate use conditions checkbox
const validateCheckbox = (field) => {
  const isValid = field.checked;
  return isValid;
};

// Declaration of variable to validate each entry
let formFields = {
  isFirstValid: false,
  isLastValid: false,
  isEmailValid: false,
  isBirthdateValid: false,
  isNumberCompetitionsValid: false,
  whatTownChecked: false,
  useConditions: false,
};

// Objects for rules and error messages
class ValidationRule {
  constructor(validator, errorMessage, formFieldKey) {
    this.validator = validator;
    this.errorMessage = errorMessage;
    this.formFieldKey = formFieldKey;
  }
}

const validationRules = {
  required: new ValidationRule(validateRequired, "Ce champ est requis", null),
  first: new ValidationRule(
    validateName,
    "Veuillez entrer 2 caractères ou plus pour le champ du prénom.",
    "isFirstValid"
  ),
  last: new ValidationRule(
    validateName,
    "Veuillez entrer 2 caractères ou plus pour le champ du nom.",
    "isLastValid"
  ),
  email: new ValidationRule(
    validateEmail,
    "Veuillez entrer une adresse email valide.",
    "isEmailValid"
  ),
  birthdate: new ValidationRule(
    validateBirthday,
    "Vous devez entrer votre date de naissance.",
    "isBirthdateValid"
  ),
  quantity: new ValidationRule(
    validateNumberCompetitions,
    "Le nombre de tournoi (entre 1 et 99) auquel vous avez participé cette année.",
    "isNumberCompetitionsValid"
  ),
  location: new ValidationRule(
    validateLocation,
    "Veuillez sélectionner un tournoi",
    "whatTownChecked"
  ),
  agreement1: new ValidationRule(
    validateCheckbox,
    "Veuillez accepter les conditions d'utilisation.",
    "useConditions"
  ),
};

// Validate each field according to its rules
const validateField = (field, rules) => {
  let isValid = true;
  console.log(field);
  for (let i = 0; i < rules.length; i++) {
    const rule = rules[i];
    const { validator, errorMessage, formFieldKey } = validationRules[rule];
    if (!validator(field)) {
      if (errorMessage) {
        displayErrorMessage(field, errorMessage);
      }
      if (formFieldKey) {
        formFields[formFieldKey] = false;
      }
      isValid = false;
      break; // Stop validating rules if current one fails
    } else {
      removeErrorMessage(field);
      if (formFieldKey) {
        formFields[formFieldKey] = true;
      }
    }
  }
  return isValid;
};

// Validation of all fields before sending
const validateFields = () => {
  let fieldsRadioName;
  let isValid = true;
  const fields = document.querySelectorAll(
    'input[type="text"]:required, input[type="email"]:required, input[type="number"]:required, input[type="date"]:required, input[type="checkbox"]:required'
  );
  fields.forEach((field) => {
    let error;
    if (field.type === "checkbox") {
      error = validateField(field, [field.name]);
    } else {
      error = validateField(field, ["required", field.name]);
      if (!error) {
        isValid = false;
      }
    }
  });
  const fieldsRadio = document.querySelectorAll('input[type="radio"]:required');
  fieldsRadioName = fieldsRadio[0].name;
  if (!validateField(fieldsRadio, [fieldsRadioName])) {
    isValid = false;
  }
  return isValid;
};

export { validateFields, validateField };
