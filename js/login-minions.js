const input = document.querySelector(".login-input");
const button = document.querySelector(".login-button");
const form = document.querySelector(".login-form");

const validateInput = ({ target }) => {
  if (target.value.length >= 3) {
    target.classList.remove("disabled");
    button.disabled = false;
    return;
  }
  target.classList.add("disabled");
  button.disabled = true;
};

const handleSubmit = (event) => {
  event.preventDefault();
  const username = input.value.trim();
  localStorage.setItem("username", username);
  window.location.href = "./page/game.html";
};

input.addEventListener("input", validateInput);
form.addEventListener("submit", handleSubmit);
