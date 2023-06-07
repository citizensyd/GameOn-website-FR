import { validateFields } from "./form-validation.js";

// Function that allows the form to be sent and confirmation to be displayed
const submitForm = (event) => {
  event.preventDefault();
  const fieldsValid = validateFields();
  
  if (fieldsValid) {
    const eraseForm = () => {
      const form = document.querySelector("form");
      form.style.opacity = "0";
      
      // Log form inputs to the console
      const inputs = form.querySelectorAll("input");
      const newUser = [];
      inputs.forEach((input) => {
        if (input.name === "location" && input.checked) {
          const label = form.querySelector(`label[for="${input.id}"]`);
          const labelText = label.textContent.trim();
          newUser.push(`${input.name}: ${labelText}`);
        } else if (input.type === "text" || input.type === "email" || input.type === "date" || input.type === "number") {
          newUser.push(`${input.name}: ${input.value}`);
        } else if (input.name === "agreement1" && input.checked) {
          newUser.push(`${input.name}: ${input.value}`);
        } else if (input.name === "agreement" && input.checked) {
          newUser.push(`${input.name}: ${input.value}`);
        }
      });
      console.log(newUser);
      // Clear form inputs
      inputs.forEach((input) => {
        input.value = "";
      });
    };
    eraseForm();
    
    // Display confirmation message
    const displayConfirmationMessage = () => {
      const modalBody = document.querySelector(".modal-body");
      const confirmation = document.createElement("p");
      confirmation.textContent = "Merci pour votre inscription";
      confirmation.classList.add("text-confirmation");
      modalBody.appendChild(confirmation);
      
      const closeButton = document.createElement("button");
      closeButton.textContent = "Fermer";
      closeButton.classList.add("btn-close");
      modalBody.appendChild(closeButton);
    };
    displayConfirmationMessage();
  }
  setupModal();
};

// Listening to the submit button
const btnSubmit = document.querySelector(".btn-submit");
btnSubmit.addEventListener("click", submitForm);
