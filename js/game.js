const grid = document.querySelector("#screen");
grid.innerHTML = "";

const colors = [
  "red",
  "blue",
  "green",
  "yellow",
  "purple",
  "orange",
  "pink",
  "cyan",
  "brown",
  "lime",
];

const shuffle = (array) => {
  const result = [];
  const copy = [...array]; // preserva o original para reutilizações

  while (copy.length > 0) {
    const randomIndex = Math.floor(Math.random() * copy.length);
    result.push(copy[randomIndex]);
    copy.splice(randomIndex, 1);
  }

  return result;
};

const createElement = (tag, className) => {
  const element = document.createElement(tag);
  element.className = className;
  return element;
};

let firstCard = "";
let secondCard = "";

const checkEndGame = () => {
  const disabledCards = document.querySelectorAll(".disabled-card");
  if (disabledCards.length == colors.length * 2) {
    console.log("Congratulations! You've matched all cards!");
  }
};

const checkCards = () => {
  const firstColor = firstCard.getAttribute("data-color");
  const secondColor = secondCard.getAttribute("data-color");
  if (firstColor === secondColor) {
    console.log("Match found!");
    firstCard.firstChild.classList.add("disabled-card");
    secondCard.firstChild.classList.add("disabled-card");
    firstCard = "";
    secondCard = "";
    checkEndGame();
  } else {
    console.log("No match, hiding cards again.");
    setTimeout(() => {
      firstCard.classList.remove("reveal-card");
      secondCard.classList.remove("reveal-card");
      firstCard = "";
      secondCard = "";
    }, 1000);
  }
};

const revealCard = ({ target }) => {
  if (target.parentNode.className.includes("reveal-card")) {
    console.log("Card already revealed");
    return;
  }

  if (firstCard == "") {
    target.parentNode.classList.add("reveal-card");
    firstCard = target.parentNode;
  } else if (secondCard == "") {
    target.parentNode.classList.add("reveal-card");
    secondCard = target.parentNode;
    checkCards();
  }
};

const createCard = (color) => {
  const card = createElement("div", "card");
  const front = createElement("div", "face front");
  const back = createElement("div", "face back");

  front.style.backgroundColor = color;

  card.appendChild(front);
  card.appendChild(back);

  card.addEventListener("click", revealCard);
  card.setAttribute("data-color", color);

  return card;
};

const loadGame = () => {
  const pairedColors = [...colors, ...colors];
  const shuffledColors = shuffle(pairedColors);
  shuffledColors.forEach((color) => {
    const card = createCard(color);
    grid.appendChild(card);
  });
  console.log("Game loaded with cards:", shuffledColors);
};

loadGame();
