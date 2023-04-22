import { validateFields } from "./form-validation.js";

// Function that allows the form to be sent and confirmation to be displayed
const submitForm = (event) => {
  event.preventDefault();
  const fieldsValid = validateFields();
  if (fieldsValid) {
    const form = document.querySelector("form");
    const modalBody = document.querySelector(".modal-body");
    form.style.opacity = "0";
    const confirmation = document.createElement("p");
    confirmation.textContent = "Merci pour\nvotre inscription";
    confirmation.classList.add("text-confirmation");
    modalBody.appendChild(confirmation);
    const closeButton = document.createElement("button");
    closeButton.textContent = "Fermer";
    closeButton.classList.add("btn-close");
    modalBody.appendChild(closeButton);
    setupModal();
    const formSubmit = document.querySelector('form[name="reserve"]');
  }
};

// Listening to the submit button
const btnSubmit = document.querySelector(".btn-submit");
btnSubmit.addEventListener("click", submitForm);
