function createCards() {
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

  const pairedColors = [...colors, ...colors];

  pairedColors.forEach((color) => {
    const card = document.createElement("div");
    card.className = "box";
    card.style.backgroundColor = color;
    container.appendChild(card);
    console.log("Box", card);
  });
  console.log("Collors", colors);
  console.log("Container:", container);
}
