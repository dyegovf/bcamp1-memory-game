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

const shuffle = (array) => {
  return array.sort(() => 0.5 - Math.random());
};

const createElement = (tag, className) => {
  const element = document.createElement(tag);
  element.className = className;
  return element;
};

const createCard = (color) => {
  const card = createElement("div", "card");
  const front = createElement("div", "face front");
  const back = createElement("div", "face back");

  front.style.backgroundColor = color;

  card.appendChild(front);
  card.appendChild(back);

  return card;
};

const loadGame = () => {
  const shuffledColors = shuffle(pairedColors);
  shuffledColors.forEach((color) => {
    const card = createCard(color);
    grid.appendChild(card);
  });
};

loadGame();
