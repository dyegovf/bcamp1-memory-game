const grid = document.querySelector("#screen");

const createCard = () => {
  const box = document.createElement("div");
  const front = document.createElement("div");
  const back = document.createElement("div");

  box.className = "box";
  front.className = "face front";
  back.className = "face back";

  box.appendChild(front);
  box.appendChild(back);

  grid.appendChild(box);
};

createCard();
