const grid = document.querySelector("#screen");
const spanPlayer = document.querySelector(".player");
const spanTimer = document.querySelector(".timer");
const difficulty = localStorage.getItem("difficulty");
const restartButton = document.getElementById("restart-btn");

const minionsImages = [
  "img1",
  "img2",
  "img3",
  "img4",
  "img5",
  "img6",
  "img7",
  "img8",
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
    clearInterval(this.loop);
    alert(
      `${spanPlayer.innerHTML}, Congratulations! You've matched all cards in ${spanTimer.innerHTML}!`
    );
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

const getImagesByDifficulty = () => {
  switch (difficulty) {
    case "easy":
      return minionsImages.slice(0, 4); // 4 pairs = 8 cards
    case "medium":
      return minionsImages.slice(0, 6); // 6 pairs = 12 cards
    case "hard":
    default:
      return minionsImages.slice(0, 8); // 8 pairs = 16 cards
  }
};

const loadGame = () => {
  const selectedImages = getImagesByDifficulty();
  const doubleImages = selectedImages.flatMap((item) => [item, item]);
  const shuffledImages = shuffle(doubleImages);

  grid.innerHTML = "";

  grid.className = "";
  grid.classList.add(difficulty);

  shuffledImages.forEach((item) => {
    const card = createCard(item);
    grid.appendChild(card);
  });
  console.log(`Game loaded with difficulty: ${difficulty}`);
};

let totalSeconds = 0;

const startTimer = () => {
  this.loop = setInterval(() => {
    totalSeconds++;

    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    const formattedTime = `${minutes}:${seconds.toString().padStart(2, "0")}`;

    spanTimer.innerHTML = formattedTime;
    // console.log("Timer updated:", formattedTime);
  }, 1000);
};

const restartGame = () => {
  totalSeconds = 0;
  spanTimer.innerHTML = "0:00";
  clearInterval(loop);
  startTimer();
  firstCard = "";
  secondCard = "";
  loadGame();
};

restartButton.addEventListener("click", () => {
  if (confirm("Are you sure you want to restart the game?")) {
    restartGame();
  }
});

window.onload = () => {
  const playerName = localStorage.getItem("username");
  spanPlayer.innerHTML = playerName;
  startTimer();
  loadGame();
  console.log("Player name set to:", playerName);
};
