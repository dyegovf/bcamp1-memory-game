function createCards() {
  const screen = document.getElementById("screen");
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

  colors.forEach((color) => {
    const card = document.createElement("div");
    card.className = "box";
    card.style.backgroundColor = color;
    screen.appendChild(card);
  });
}
