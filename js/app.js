const grid = document.querySelector("#screen");
const player = document.querySelector(".player");
const timer = document.querySelector(".timer");
const difficulty = localStorage.getItem("difficulty");
const theme = localStorage.getItem("theme");
const group = localStorage.getItem("group");
const cardCount = parseInt(localStorage.getItem("cards"), 10);
const restartButton = document.getElementById("restart-btn");

let firstCard = "";
let secondCard = "";
let totalSeconds = 0;
let loop;

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

const applyTheme = () => {
  const main = document.querySelector("main");
  main.style.backgroundImage = `url(../assets/memory-games/${group}/themes/${theme}/bg-game-${theme}.png)`;

  const style = document.createElement("style");
  style.innerHTML = `
    .back {
      background-image: url(../assets/memory-games/${group}/themes/${theme}/back-cards-${theme}.png);
    }
  `;
  document.head.appendChild(style);
};

const createCard = (item) => {
  const card = createElement("div", "card");
  const front = createElement("div", "face front");
  const back = createElement("div", "face back");

  front.style.backgroundImage = `url(../assets/memory-games/${group}/cards/${item}.png)`;

  card.appendChild(front);
  card.appendChild(back);
  card.addEventListener("click", revealCard);
  card.setAttribute("data-item", item);

  return card;
};

const checkEndGame = () => {
  const disabledCards = document.querySelectorAll(".disabled-card");
  if (disabledCards.length === cardCount) {
    clearInterval(loop);
    alert(
      `${player.innerHTML}, parabéns! Você encontrou todos os pares em ${timer.innerHTML}!`
    );
  }
};

const checkCards = () => {
  const firstItem = firstCard.getAttribute("data-item");
  const secondItem = secondCard.getAttribute("data-item");
  if (firstItem === secondItem) {
    firstCard.firstChild.classList.add("disabled-card");
    secondCard.firstChild.classList.add("disabled-card");
    firstCard = "";
    secondCard = "";
    checkEndGame();
  } else {
    setTimeout(() => {
      firstCard.classList.remove("reveal-card");
      secondCard.classList.remove("reveal-card");
      firstCard = "";
      secondCard = "";
    }, 1000);
  }
};

const revealCard = ({ target }) => {
  if (target.parentNode.classList.contains("reveal-card")) return;
  if (firstCard === "") {
    target.parentNode.classList.add("reveal-card");
    firstCard = target.parentNode;
  } else if (secondCard === "") {
    target.parentNode.classList.add("reveal-card");
    secondCard = target.parentNode;
    checkCards();
  }
};

const getImages = async () => {
  const response = await fetch("../assets/themes.json");
  const data = await response.json();
  const selectedGroup = data.groups.find((g) => g.id === group);
  const cardImages = selectedGroup?.cards || [];

  return cardImages.slice(0, cardCount / 2);
};

const loadGame = async () => {
  applyTheme();
  const selectedImages = await getImages();
  const doubleImages = selectedImages.flatMap((item) => [item, item]);
  const shuffledImages = shuffle(doubleImages);

  grid.innerHTML = "";
  grid.setAttribute("data-cards", cardCount);

  shuffledImages.forEach((item) => {
    const card = createCard(item);
    grid.appendChild(card);
  });
};

const startTimer = () => {
  loop = setInterval(() => {
    totalSeconds++;
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    timer.innerHTML = `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  }, 1000);
};

window.onload = () => {
  player.innerHTML = localStorage.getItem("username") || "Player";
  loadGame();
  startTimer();
};

restartButton.addEventListener("click", () => {
  location.reload();
});

// const grid = document.querySelector("#screen");
// const player = document.querySelector(".player");
// const timer = document.querySelector(".timer");
// const difficulty = localStorage.getItem("difficulty");
// const theme = localStorage.getItem("theme");
// const restartButton = document.getElementById("restart-btn");

// const minionsImages = [
//   "img1",
//   "img2",
//   "img3",
//   "img4",
//   "img5",
//   "img6",
//   "img7",
//   "img8",
// ];

// // async function getData() {
// //   const url = "../assets/themes.json";
// //   try {
// //     const response = await fetch(url);
// //     if (!response.ok) {
// //       throw new Error(`Response status: ${response.status}`);
// //     }

// //     const result = await response.json();
// //     return result; // Retorna os dados
// //   } catch (error) {
// //     console.error(error.message);
// //     return null; // Retorna null em caso de erro
// //   }
// // }

// // getData().then((data) => {
// //   if (data) {
// //     console.log("Dados recebidos:", data);
// //     // Aqui você pode usar os dados para montar seu jogo da memória
// //   }
// // });

// const shuffle = (array) => {
//   const result = [];
//   const copy = [...array];

//   while (copy.length > 0) {
//     const randomIndex = Math.floor(Math.random() * copy.length);
//     result.push(copy[randomIndex]);
//     copy.splice(randomIndex, 1);
//   }

//   return result;
// };

// const createElement = (tag, className) => {
//   const element = document.createElement(tag);
//   element.className = className;
//   return element;
// };

// let firstCard = "";
// let secondCard = "";

// const checkEndGame = () => {
//   const disabledCards = document.querySelectorAll(".disabled-card");
//   if (disabledCards.length == minionsImages.length * 2) {
//     clearInterval(this.loop);
//     alert(
//       `${player.innerHTML}, Congratulations! You've matched all cards in ${timer.innerHTML}!`
//     );
//   }
// };

// const checkCards = () => {
//   const firstItem = firstCard.getAttribute("data-item");
//   const secondItem = secondCard.getAttribute("data-item");
//   if (firstItem === secondItem) {
//     console.log("Match found!");
//     firstCard.firstChild.classList.add("disabled-card");
//     secondCard.firstChild.classList.add("disabled-card");
//     firstCard = "";
//     secondCard = "";
//     checkEndGame();
//   } else {
//     console.log("No match, hiding cards again.");
//     setTimeout(() => {
//       firstCard.classList.remove("reveal-card");
//       secondCard.classList.remove("reveal-card");
//       firstCard = "";
//       secondCard = "";
//     }, 1000);
//   }
// };

// const revealCard = ({ target }) => {
//   if (target.parentNode.className.includes("reveal-card")) {
//     console.log("Card already revealed");
//     return;
//   }
//   if (firstCard == "") {
//     target.parentNode.classList.add("reveal-card");
//     firstCard = target.parentNode;
//   } else if (secondCard == "") {
//     target.parentNode.classList.add("reveal-card");
//     secondCard = target.parentNode;
//     checkCards();
//   }
// };

// const createCard = (item) => {
//   const card = createElement("div", "card");
//   const front = createElement("div", "face front");
//   const back = createElement("div", "face back");

//   front.style.backgroundImage = `url(../img/minions/${item}.png)`;

//   card.appendChild(front);
//   card.appendChild(back);

//   card.addEventListener("click", revealCard);
//   card.setAttribute("data-item", item);

//   return card;
// };

// const getImagesByDifficulty = () => {
//   switch (difficulty) {
//     case "easy":
//       return minionsImages.slice(0, 4);
//     case "medium":
//       return minionsImages.slice(0, 6);
//     case "hard":
//     default:
//       return minionsImages.slice(0, 8);
//   }
// };

// const loadGame = () => {
//   const selectedImages = getImagesByDifficulty();
//   const doubleImages = selectedImages.flatMap((item) => [item, item]);
//   const shuffledImages = shuffle(doubleImages);

//   grid.innerHTML = "";

//   grid.className = "";
//   grid.classList.add(difficulty);

//   shuffledImages.forEach((item) => {
//     const card = createCard(item);
//     grid.appendChild(card);
//   });
//   console.log(`Game loaded with difficulty: ${difficulty}`);
// };

// let totalSeconds = 0;

// const startTimer = () => {
//   this.loop = setInterval(() => {
//     totalSeconds++;

//     const minutes = Math.floor(totalSeconds / 60);
//     const seconds = totalSeconds % 60;
//     const formattedTime = `${minutes}:${seconds.toString().padStart(2, "0")}`;

//     timer.innerHTML = formattedTime;
//     // console.log("Timer updated:", formattedTime);
//   }, 1000);
// };

// const restartGame = () => {
//   totalSeconds = 0;
//   timer.innerHTML = "0:00";
//   clearInterval(loop);
//   startTimer();
//   firstCard = "";
//   secondCard = "";
//   loadGame();
// };

// restartButton.addEventListener("click", () => {
//   if (confirm("Are you sure you want to restart the game?")) {
//     restartGame();
//   }
// });

// window.onload = () => {
//   const playerName = localStorage.getItem("username");
//   player.innerHTML = playerName;
//   startTimer();
//   loadGame();
//   console.log("Player name set to:", playerName);
// };
