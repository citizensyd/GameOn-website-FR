// Function to handle navigation menu
function editNav() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

// DOM Elements
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const modalClose = document.querySelectorAll(".close");
const formData = document.querySelectorAll(".formData");
const modalBody = document.querySelector(".modal-body");

// Event listener to launch modal form
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

// close modal event
modalClose.forEach((span) => span.addEventListener("click", closeModal));

// Function to show modal window
function launchModal() {
  modalbg.style.display = "block";
}

// close modal form
function closeModal() {
  modalbg.style.display = "none";
}

// declaration of variables to validate each entry
let formFields = {
  isFirstValid: false,
  isLastValid: false,
  isEmailValid: false,
  isBirthdateValid: false,
  isNumberCompetitionsValid: false,
  whatTownChecked: false,
  useConditions: false,
};

const form = document.querySelector("form");

// Listen to input event on form
const inputFormListening = () => {
  form.addEventListener("input", (event) => {
    const target = event.target;
    target.matches("[name='first']")
      ? validateField(target, ["first"])
      : target.matches("[name='last']")
      ? validateField(target, ["last"])
      : target.matches("[name='email']")
      ? validateField(target, ["email"])
      : target.matches("[name='birthdate']")
      ? validateField(target, ["birthdate"])
      : target.matches("[name='quantity']")
      ? validateField(target, ["quantity"])
      : target.matches("[name='location']")
      ? validateField(target, ["location"])
      : target.matches("[name='agreement1']")
      ? validateField(target, ["agreement1"])
      : null;
  });
};
inputFormListening();

// Display error message for invalid input
const displayErrorMessage = (field, message) => {
  const errorMessageSpan = field
    .closest(".formData")
    .querySelector(".data-error");
  const errorTextfield = field.parentNode.querySelector(".text-control");
  errorMessageSpan.textContent = message;
  errorMessageSpan.classList.add("data-error-visible");
  errorTextfield !== null
    ? errorTextfield.classList.add("text-control-boder-red")
    : null;
};

// Remove error message when input is valid
const removeErrorMessage = (field) => {
  const errorMessageSpan = field
    .closest(".formData")
    .querySelector(".data-error");
  const errorTextfield = field.parentNode.querySelector(".text-control");
  errorMessageSpan.textContent = "";
  errorMessageSpan.classList.remove("data-error-visible");
  errorTextfield !== null
    ? errorTextfield.classList.remove("text-control-boder-red")
    : null;
};

let isValidChecked = false;
let isValid = false;

// Validate required field
const validateRequired = (field) => {
  if (
    field.type === "text" ||
    field.type === "email" ||
    field.type === "number" ||
    field.type === "date"
  ) {
    isValid = field.value.trim() !== "";
    return isValid;
  }
  if (field.type === "checkbox") {
    isValid = field.checked;
    return isValid;
  }
  if (field.type === "radio") {
    if (field.checked) {
      isValidChecked = true;
      return isValidChecked;
    }
    if (!field.checked && isValidChecked === true) {
      return isValidChecked;
    }
    if (!field.checked) {
      return isValidChecked;
    }
  }
};

// Validate name input
const validateName = (value) => {
  const nameRegex = /^.+\S{2,}$/;
  return nameRegex.test(value);
};

// Validate email input
const validateEmail = (value) => {
  const emailRegex = /^[\w\.-]+@[\w-]+\.[\w\.-]+$/;
  return emailRegex.test(value);
};

// Validate birthdate input
const validateBirthday = (value) => {
  const regex = /^(19|20)\d{2}\-(0[1-9]|1[0-2])\-(0[1-9]|[12][0-9]|3[01])$/;
  return !regex.test(value)
    ? false
    : new Date(value) > Date.now()
    ? false
    : true;
};

// number of competitions entry test
const validateNumberCompetitions = (value) => {
  const regexNumberCompetitions = /^[0-9][0-9]?$/;
  return regexNumberCompetitions.test(value);
};

// Validate use conditions checkbox
const validateCheckBoxUse = () => {
  const selectCheckbox = document.querySelector(
    'input[type="checkbox"][name="agreement1"]'
  );
  const isValid = selectCheckbox.checked;
  return isValid;
};

// Objects for rules and error messages
const validationRules = {
  required: {
    validator: validateRequired,
    errorMessage: "Ce champ est requis",
    formFieldKey: null,
  },
  first: {
    validator: validateName,
    errorMessage:
      "Veuillez entrer 2 caractères ou plus pour le champ du prénom.",
    formFieldKey: "isFirstValid",
  },
  last: {
    validator: validateName,
    errorMessage: "Veuillez entrer 2 caractères ou plus pour le champ du nom.",
    formFieldKey: "isLastValid",
  },
  email: {
    validator: validateEmail,
    errorMessage: "Veuillez entrer une adresse email valide.",
    formFieldKey: "isEmailValid",
  },
  birthdate: {
    validator: validateBirthday,
    errorMessage: "Vous devez entrer votre date de naissance.",
    formFieldKey: "isBirthdateValid",
  },
  quantity: {
    validator: validateNumberCompetitions,
    errorMessage:
      "Le nombre de tournoi (entre 1 et 99) auquel vous avez participé cette année.",
    formFieldKey: "isNumberCompetitionsValid",
  },
  location: {
    validator: () => true,
    formFieldKey: "whatTownChecked",
  },
  agreement1: {
    validator: validateCheckBoxUse,
    errorMessage: "Veuillez accepter les conditions d'utilisation.",
    formFieldKey: "useConditions",
  },
};

// Validate each field according to its rules
const validateField = (field, rules) => {
  for (let rule of rules) {
    const { validator, errorMessage, formFieldKey } = validationRules[rule];
    if (!validator(field.value)) {
      if (errorMessage) {
        displayErrorMessage(field, errorMessage);
      }
      if (formFieldKey) {
        formFields[formFieldKey] = false;
      }
      return false;
    } else {
      removeErrorMessage(field);
      if (formFieldKey) {
        formFields[formFieldKey] = true;
      }
    }
  }
  return true;
};

// Validate all required fields
const requiredValidate = () => {
  let isValid = true;
  const selectFieldsValidation = document.querySelectorAll("[required]");
  selectFieldsValidation.forEach((inputField) => {
    !validateRequired(inputField)
      ? (displayErrorMessage(inputField, "Ce champ est requis"),
        (isValid = false))
      : removeErrorMessage(inputField);
  });
  return isValid;
};

const submitForm = (event) => {
  event.preventDefault();
  if (requiredValidate() && areAllValid()) {
    form.style.opacity = "0";
    const confirmation = document.createElement("p");
    confirmation.textContent = "Merci pour\nvotre inscription";
    confirmation.classList.add("text-confirmation");
    modalBody.appendChild(confirmation);
    const closeButton = document.createElement("button");
    closeButton.textContent = "Fermer";
    closeButton.classList.add("btn-close");
    modalBody.appendChild(closeButton);
    closeButton.addEventListener("click", closeModal);
  }
};

const areAllValid = () => {
  const formFields = document.querySelectorAll("input, select, textarea");
  return Array.from(formFields).every((field) => field.checkValidity());
};

const formSubmit = document.querySelector('form[name="reserve"]');
formSubmit.addEventListener("submit");
