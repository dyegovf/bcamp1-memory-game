// Finding the container element and clearing its contents

const container = document.querySelector("#screen");
container.innerHTML = "";

// Creating an array of colors and duplicating it for pairing

const colors = [
  "red",
  "blue",
  "green",
  "yellow",
  "purple",
  "orange",
  "pink",
  "cyan",
];

const pairedColors = [...colors, ...colors];

// Function to create cards with paired colors
// Each card is a div with a class of "box" and a background color set to

function createCards() {
  for (let i = 0; i < pairedColors.length; i++) {
    const card = document.createElement("div");
    card.className = "box";
    card.style.backgroundColor = pairedColors[i];
    container.appendChild(card);
  }
}
