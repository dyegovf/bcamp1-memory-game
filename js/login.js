const loginSection = document.querySelector(".login-section");
const modalSection = document.querySelector(".modal-section");
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

const createModal = () => {
  const modal = createElement("div", "modal hidden");
  modal.id = "difficulty-modal";

  const closeButton = createElement("span", "close-button");
  closeButton.textContent = "×";

  const modalContent = createElement("div", "modal-content");

  const difficultySection = createElement("div", "difficulty-options");
  const difficultyHeader = document.createElement("header");
  const difficultyTitle = document.createElement("h2");
  difficultyTitle.textContent = "Difficulty";
  difficultyHeader.appendChild(difficultyTitle);

  const easyBtn = createElement("button", "difficulty-btn");
  easyBtn.textContent = "Easy (8 cards)";
  easyBtn.dataset.level = "easy";

  const mediumBtn = createElement("button", "difficulty-btn");
  mediumBtn.textContent = "Medium (12 cards)";
  mediumBtn.dataset.level = "medium";

  const hardBtn = createElement("button", "difficulty-btn");
  hardBtn.textContent = "Hard (16 cards)";
  hardBtn.dataset.level = "hard";

  difficultySection.appendChild(difficultyHeader);
  difficultySection.appendChild(easyBtn);
  difficultySection.appendChild(mediumBtn);
  difficultySection.appendChild(hardBtn);

  const themeSection = createElement("div", "difficulty-options");
  const themeHeader = document.createElement("header");
  const themeTitle = document.createElement("h2");
  themeTitle.textContent = "Theme";
  themeHeader.appendChild(themeTitle);

  const classicBtn = createElement("button", "theme-btn");
  classicBtn.textContent = "Classic";
  classicBtn.dataset.level = "classic";

  const adventureBtn = createElement("button", "theme-btn");
  adventureBtn.textContent = "Adventure";
  adventureBtn.dataset.level = "adventure";

  const agentBtn = createElement("button", "theme-btn");
  agentBtn.textContent = "007";
  agentBtn.dataset.level = "007";

  themeSection.appendChild(themeHeader);
  themeSection.appendChild(classicBtn);
  themeSection.appendChild(adventureBtn);
  themeSection.appendChild(agentBtn);

  modalContent.appendChild(difficultySection);
  modalContent.appendChild(themeSection);

  modal.appendChild(closeButton);
  modal.appendChild(modalContent);

  return modal;
};

const restSection = () => {
  loginSection.innerHTML = "";
  loginSection.className = "";
};

window.onload = () => {
  restSection();

  const form = createForm();
  loginSection.appendChild(form);

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

  // Cria e insere o modal dentro da section estática
  const modal = createModal();
  modalSection.appendChild(modal);

  // Agora que o modal existe, podemos registrar os eventos
  const closeButton = modal.querySelector(".close-button");
  const difficultyButtons = modal.querySelectorAll(".difficulty-btn");

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
};
