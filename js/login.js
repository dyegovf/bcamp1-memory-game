const input = document.querySelector(".login-input");
const button = document.querySelector(".login-button");
const form = document.querySelector(".login-form");

const modal = document.getElementById("difficulty-modal");
const closeButton = document.querySelector(".close-button");
const difficultyButtons = document.querySelectorAll(".difficulty-btn");

const config = document.getElementById("gearBtn");

const section = document.querySelector(".login-section");

const createElement = (tag, className) => {
  const element = document.createElement(tag);
  element.className = className;
  return element;
};

const createForm = (item) => {
  // const section = document.querySelector(".login-section");
  const form = createElement("form", "login-form");
  const header = createElement("header", "login-header");
  const img = createElement("img");
  img.src = "./img/minions/img-login2.png";
  img.alt = "Minions icon";
  const title = createElement("h1");
  title.textContent = "Minions Memory Game";
  const fieldset = createElement("fieldset", "form-group");
  const input = createElement("input", "login-input");
  const button = createElement("button", "login-button");

  input.type = "text";
  input.id = "username";
  input.placeholder = "Enter your name";

  button.type = "submit";
  button.textContent = "Play";
  button.disabled = true;

  header.appendChild(img);
  header.appendChild(title);

  fieldset.appendChild(input);
  fieldset.appendChild(button);

  form.appendChild(header);
  form.appendChild(fieldset);

  section.appendChild(form);

  // return section;
};

const loadPage = () => {
  section.innerHTML = "";
  section.className = "";
};

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

window.onload = () => {
  // loadPage();
  createForm();
  // document.body.appendChild(section);
};
input.addEventListener("input", validateInput);
form.addEventListener("submit", handleSubmit);
config.addEventListener("click", handleConfig);
difficultyButtons.forEach((btn) =>
  btn.addEventListener("click", handleDifficultySelection)
);
closeButton.addEventListener("click", closeModal);
window.addEventListener("click", handleOutsideClick);
