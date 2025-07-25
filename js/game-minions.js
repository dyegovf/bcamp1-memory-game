const grid = document.querySelector("#screen");
grid.innerHTML = "";

const minionsImages = [
  "img1",
  "img2",
  "img3",
  "img4",
  "img5",
  "img6",
  "img7",
  "img8",
  "img9",
  "img10",
];

const shuffle = (array) => {
  const result = [];
  const copy = [...array];

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
  if (disabledCards.length == minionsImages.length * 2) {
    alert("Congratulations! You've matched all cards!");
  }
};

const checkCards = () => {
  const firstItem = firstCard.getAttribute("data-item");
  const secondItem = secondCard.getAttribute("data-item");
  if (firstItem === secondItem) {
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

const createCard = (item) => {
  const card = createElement("div", "card");
  const front = createElement("div", "face front");
  const back = createElement("div", "face back");

  front.style.backgroundImage = `url(../img/minions/${item}.png)`;

  card.appendChild(front);
  card.appendChild(back);

  card.addEventListener("click", revealCard);
  card.setAttribute("data-item", item);

  return card;
};

const loadGame = () => {
  const doubleImages = [...minionsImages, ...minionsImages];
  const shuffledImages = shuffle(doubleImages);
  shuffledImages.forEach((item) => {
    const card = createCard(item);
    grid.appendChild(card);
  });
  console.log("Game loaded with cards:", shuffledImages);
};

loadGame();
