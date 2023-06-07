// Function to handle navigation menu
const editNav = () => {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
};

// Function to show  and close modal window
const setupModal = () => {
  const modal = document.querySelector(".bground");
  const btnClose = document.querySelector(".btn-close");

  const showModal = () => {
    modal.style.display = "block";
  };

  const hideModal = () => {
    modal.style.display = "none";
  };

  document.querySelector(".btn-signup1").addEventListener("click", showModal);
  document.querySelector(".btn-signup2").addEventListener("click", showModal);

  document.querySelector(".close").addEventListener("click", hideModal);

  if (btnClose) {
    btnClose.addEventListener("click", hideModal);
  }
};

setupModal();
