function createDiv() {
  var div = document.createElement("screen");
  var imgDiv = document.createTextNode("img");
  div.setAttribute("style", "background-color: red;");
  div.appendChild(imgDiv);
  document.body.appendChild(div);
}

// function myFunction() {
//   var x = document.createElement("DIV");
//   var t = document.createTextNode("This is a div element.");
//   x.setAttribute("style", "background-color: pink;");
//   x.appendChild(t);
//   document.body.appendChild(x);
// }

// let screen = document.getElementById("screen");

// let colors = [
//   "red",
//   "blue",
//   "green",
//   "yellow",
//   "purple",
//   "orange",
//   "pink",
//   "cyan",
// ];
