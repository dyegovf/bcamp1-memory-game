const grid = document.querySelector("#screen");
// grid.innerHTML = "";

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

const pairedColors = [...colors, ...colors];

const createElement = (tag, className) => {
  const element = document.createElement(tag);
  element.className = className;
  return element;
};

let random = (randomNumber = Math.floor(Math.random() * pairedColors.length));

const createCard = (color) => {
  const card = createElement("div", "card");
  const front = createElement("div", "face front");
  const back = createElement("div", "face back");

  front.style.backgoundColor = random[color];
  back.style.backgroundColor = "blue";

  card.appendChild(front);
  card.appendChild(back);

  return card;
};

const loadGame = () => {
  pairedColors.forEach((color) => {
    const card = createCard();
    grid.appendChild(card);
  });
};

loadGame();
