const input = document.querySelector(".login-input");
const button = document.querySelector(".login-button");
const form = document.querySelector(".login-form");

const modal = document.getElementById("difficulty-modal");
const closeButton = document.querySelector(".close-button");
const difficultyButtons = document.querySelectorAll(".difficulty-btn");

const config = document.getElementById("gearBtn");

// Validate input
const validateInput = (event) => {
  const value = event.target.value.trim();
  button.disabled = value.length < 3;
};

// Show modal after form submission
const handleSubmit = (event) => {
  event.preventDefault();
  const username = input.value.trim();

  if (username.length >= 3) {
    localStorage.setItem("username", username);
    // modal.classList.remove("hidden");
  } else {
    alert("Please enter a valid username with at least 3 characters.");
  }
};

// Handle difficulty selection
const handleDifficultySelection = (event) => {
  const level = event.target.getAttribute("data-level");
  localStorage.setItem("difficulty", level);
  // window.location.href = "./page/app.html";
};

// Handle Config
const handleConfig = () => {
  modal.classList.remove("hidden");
};

// Close modal
const closeModal = () => {
  modal.classList.add("hidden");
};

// Close modal when clicking outside
const handleOutsideClick = (event) => {
  if (event.target === modal) {
    closeModal();
  }
};

// Event listeners
input.addEventListener("input", validateInput);
form.addEventListener("submit", handleSubmit);
config.addEventListener("click", handleConfig);
difficultyButtons.forEach((btn) =>
  btn.addEventListener("click", handleDifficultySelection)
);
closeButton.addEventListener("click", closeModal);
window.addEventListener("click", handleOutsideClick);
