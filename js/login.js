const loginSection = document.querySelector(".login-section");
const modalSection = document.querySelector(".modal-section");
const config = document.getElementById("gearBtn");

const href = document.querySelector("base");

console.log(href);

const createElement = (tag, className) => {
  const element = document.createElement(tag);
  if (className) element.className = className;
  return element;
};

const createForm = () => {
  const form = createElement("form", "login-form");
  const header = createElement("header", "login-header");
  const img = createElement("img");

  const group = localStorage.getItem("group") || "minions";
  const theme = localStorage.getItem("theme") || "classic";
  img.src = `assets/memory-games/${group}/themes/${theme}/login-${theme}.png`;
  img.alt = "Login Theme";

  const title = createElement("h1");
  title.textContent = "Memory Game";

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

const createModal = async () => {
  // console.log("createModal foi chamado");

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
  difficultySection.appendChild(difficultyHeader);

  const difficultyRes = await fetch("assets/difficulty-level.json");
  const difficultyData = await difficultyRes.json();

  difficultyData.forEach((item) => {
    const btn = createElement("button", "difficulty-btn");
    btn.textContent = `${item.label} (${item.cards} cards)`;
    btn.dataset.level = item.level;
    btn.dataset.cards = item.cards;

    btn.addEventListener("click", () => {
      localStorage.setItem("difficulty", item.level);
      localStorage.setItem("cards", item.cards);
      document
        .querySelectorAll(".difficulty-btn")
        .forEach((b) => b.classList.remove("selected"));
      btn.classList.add("selected");
    });

    difficultySection.appendChild(btn);
    // console.log("Criando botão de dificuldade:", item.label, item.cards);
  });

  const themeSection = createElement("div", "difficulty-options");
  const themeHeader = document.createElement("header");
  const themeTitle = document.createElement("h2");
  themeTitle.textContent = "Theme";
  themeHeader.appendChild(themeTitle);
  themeSection.appendChild(themeHeader);

  const themeRes = await fetch("assets/themes.json");
  const themeData = await themeRes.json();

  themeData.groups.forEach((group) => {
    group.themes.forEach((theme) => {
      const btn = createElement("button", "theme-btn");
      btn.textContent = `${group.name} - ${theme.name}`;
      btn.dataset.group = group.id;
      btn.dataset.theme = theme.id;

      btn.addEventListener("click", () => {
        localStorage.setItem("group", group.id);
        localStorage.setItem("theme", theme.id);

        const img = document.querySelector(".login-header img");
        img.src = `assets/memory-games/${group.id}/themes/${theme.id}/login-${theme.id}.png`;
        document
          .querySelectorAll(".theme-btn")
          .forEach((b) => b.classList.remove("selected"));
        btn.classList.add("selected");
      });

      themeSection.appendChild(btn);
    });
  });

  modalContent.appendChild(difficultySection);
  modalContent.appendChild(themeSection);
  modal.appendChild(closeButton);
  modal.appendChild(modalContent);

  setTimeout(() => {
    const lsGroup = localStorage.getItem("group");
    const lsTheme = localStorage.getItem("theme");
    const lsDifficulty = localStorage.getItem("difficulty");

    const themeBtns = document.querySelectorAll(".theme-btn");
    themeBtns.forEach((btn) => {
      const isSelected =
        btn.dataset.group === lsGroup && btn.dataset.theme === lsTheme;
      btn.classList.toggle("selected", isSelected);
      // console.log(btn.dataset.group, btn.dataset.theme, lsGroup, lsTheme);
      // console.log("isSelected:", isSelected);
    });

    const difficultyBtns = document.querySelectorAll(".difficulty-btn");
    difficultyBtns.forEach((btn) => {
      const isSelected = btn.dataset.level === lsDifficulty;
      btn.classList.toggle("selected", isSelected);
    });
  }, 100);

  return modal;
};

window.onload = async () => {
  loginSection.innerHTML = "";
  loginSection.className = "";

  const form = createForm();
  const modal = await createModal();

  loginSection.appendChild(form);
  modalSection.appendChild(modal);

  const input = form.querySelector(".login-input");
  const button = form.querySelector(".login-button");
  const closeButton = modal.querySelector(".close-button");

  input.addEventListener("input", (event) => {
    const value = event.target.value.trim();
    button.disabled = value.length < 3;
  });

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

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const username = input.value.trim();

    if (username.length >= 3) {
      localStorage.setItem("username", username);

      // Garantir que grupo e tema estejam definidos
      if (!localStorage.getItem("group")) {
        localStorage.setItem("group", "minions");
      }
      if (!localStorage.getItem("theme")) {
        localStorage.setItem("theme", "classic");
      }

      window.location.href = "page/app.html";
    } else {
      alert("Please enter a valid username with at least 3 characters.");
    }
  });
};
