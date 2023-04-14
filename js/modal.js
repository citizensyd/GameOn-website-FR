// Function to handle navigation menu
const editNav = () => {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
};

// DOM Elements
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const modalClose = document.querySelectorAll(".close");

// Function to show modal window
const launchModal = () => {
  modalbg.style.display = "block";
};

// close modal form
const closeModal = () => {
  modalbg.style.display = "none";
};
// Event listener to launch modal form
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

// close modal event
modalClose.forEach((close) => close.addEventListener("click", closeModal));

