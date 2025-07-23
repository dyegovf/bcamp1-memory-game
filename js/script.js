const container = document.getElementById("screen");
container.innerHTML = "";
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

function createCards() {
  const pairedColors = [...colors, ...colors];

  pairedColors.forEach((color) => {
    const card = document.createElement("div");
    card.className = "box";
    card.style.backgroundColor = color;
    container.appendChild(card);
  });
}
