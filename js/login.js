const section = document.querySelector(".login-section");
const modal = document.getElementById("difficulty-modal");
const closeButton = document.querySelector(".close-button");
const difficultyButtons = document.querySelectorAll(".difficulty-btn");
const config = document.getElementById("gearBtn");

const createElement = (tag, className) => {
  const element = document.createElement(tag);
  if (className) element.className = className;
  return element;
};

const createForm = () => {
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

  return form;
};

const loadPage = () => {
  section.innerHTML = "";
  section.className = "";
};

window.onload = () => {
  loadPage();
  const form = createForm();
  section.appendChild(form);

  const input = form.querySelector(".login-input");
  const button = form.querySelector(".login-button");

  input.addEventListener("input", (event) => {
    const value = event.target.value.trim();
    button.disabled = value.length < 3;
  });

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const username = input.value.trim();

    if (username.length >= 3) {
      localStorage.setItem("username", username);
      // modal.classList.remove("hidden");
    } else {
      alert("Please enter a valid username with at least 3 characters.");
    }
  });
};

// Modal and difficulty logic
config.addEventListener("click", () => {
  modal.classList.remove("hidden");
});

closeButton.addEventListener("click", () => {
  modal.classList.add("hidden");
});

window.addEventListener("click", (event) => {
  if (event.target === modal) {
    modal.classList.add("hidden");
  }
});

difficultyButtons.forEach((btn) =>
  btn.addEventListener("click", (event) => {
    const level = event.target.getAttribute("data-level");
    localStorage.setItem("difficulty", level);
    // window.location.href = "./page/app.html";
  })
);
