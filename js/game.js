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

const pairedColors = [...colors, ...colors];

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
  console.log("Game loaded with cards:", shuffledColors);
};

loadGame();
