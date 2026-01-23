let lists = document.getElementsByClassName("list");
let firstBox = document.getElementById("first-box");
let secondBox = document.getElementById("second-box");

let selected = null;
// Loop through all draggable list
for (let list of lists) {
  list.addEventListener("dragstart", function (e) {
    selected = e.target;
  });
}

secondBox.addEventListener("dragover", function (e) {
  e.preventDefault();
});
secondBox.addEventListener("drop", function (e) {
  secondBox.appendChild(selected);
  selected = null;
});


firstBox.addEventListener("dragover", function (e) {
  e.preventDefault();
});
firstBox.addEventListener("drop", function (e) {
  firstBox.appendChild(selected);
  selected = null;
});