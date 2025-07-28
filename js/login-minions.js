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
  if (username.length >= 3) {
    localStorage.setItem("username", username);
    window.location.href = "./page/game.html";
  } else {
    alert("Please enter a valid username with at least 3 characters.");
  }
};

input.addEventListener("input", validateInput);
form.addEventListener("submit", handleSubmit);
