
// DOM Elements
const formData = document.querySelectorAll(".formData");

// Return the first element of a nodelist
const getNodeListOrElement = (value) => {
  if (value instanceof NodeList && value.length > 0) {
    return value.item(0);
  } else {
    return value;
  }
};

// Display error message for invalid input
const displayErrorMessage = (field, message) => {
  const fieldNodeVerification = getNodeListOrElement(field);
  const errorMessageSpan = fieldNodeVerification
    .closest(".formData")
    .querySelector(".data-error");
  const errorTextfield =
    fieldNodeVerification.parentNode.querySelector(".text-control");
  errorMessageSpan.textContent = message;
  errorMessageSpan.classList.add("data-error-visible");
  errorTextfield !== null
    ? errorTextfield.classList.add("text-control-boder-red")
    : null;
};

// Remove error message when input is valid
const removeErrorMessage = (field) => {
  const fieldNodeVerification = getNodeListOrElement(field);
  const errorMessageSpan = fieldNodeVerification
    .closest(".formData")
    .querySelector(".data-error");
  const errorTextfield =
    fieldNodeVerification.parentNode.querySelector(".text-control");
  errorMessageSpan.textContent = "";
  errorMessageSpan.classList.remove("data-error-visible");
  errorTextfield !== null
    ? errorTextfield.classList.remove("text-control-boder-red")
    : null;
};

export {
  removeErrorMessage,
  displayErrorMessage
}
