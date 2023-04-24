const container = document.querySelector("#container");
const gridWidthAndHeight = 800;
let isMouseDown = false;
let inkColor = "rainbow";   // can be either "black" or "rainbow"

function getRandomColor() {
    const letters = "0123456789abcdef";
    let newColor = "#";

    for (let i=0; i<6; i++) {
        newColor += letters[Math.floor(Math.random() * 16)];
    }

    return newColor;
}

function changeBackgroundColor(event) {
    if (isMouseDown || event.type === "click") {
        switch (inkColor) {
            case "rainbow":
                // Only decrease brightness if gridItem is inked
                if (this.style.backgroundColor) {
                    const regexBrightness = /brightness\((.+)\)/;
                    const currentBrightness = Number(regexBrightness.exec(this.style.filter)[1]);
                    this.style.filter = `brightness(${Math.max(currentBrightness-0.1, 0)})`;
                }
                this.style.backgroundColor = getRandomColor();
                break;
            case "black":
            default:
            this.style.backgroundColor = "black";
        }
    }
}

function clearGrid() {
    container.textContent = "";
}

function createGrid(gridSize = 16) {
    clearGrid();

    for (let i=0; i<gridSize; i++) {
        const divRow = document.createElement("div");
        for (let j=0; j<gridSize; j++) {
            const divColumn = document.createElement("div");
            divColumn.classList.add("grid-item");
            const gridItemWidthAndHeight = gridWidthAndHeight/gridSize;
            divColumn.style.width = `${gridItemWidthAndHeight}px`;
            divColumn.style.height = `${gridItemWidthAndHeight}px`;
            divColumn.style.filter = "brightness(1)";
            divRow.appendChild(divColumn);
        }
        divRow.style.display = "flex";
        container.appendChild(divRow);
    }
    let gridItems = document.querySelectorAll(".grid-item");

    gridItems.forEach((gridItem) => {
            gridItem.addEventListener("click", changeBackgroundColor);
            gridItem.addEventListener("mouseover", changeBackgroundColor);
            gridItem.style.draggable = "false";
    });
};

function changeInkColor() {
    console.log('.');
    if (inkColor === "black") {
        inkColor = "rainbow";
    } else {
        inkColor = "black";
    }
    container.style.filter = "brightness(1)";
}

createGrid();

const btnResizeGrid = document.querySelector("#btn-resize-grid");
const btnChangeColor = document.querySelector("#btn-change-color");
document.body.addEventListener("mousedown", () => isMouseDown = true);
document.body.addEventListener("mouseup", () => isMouseDown = false);
container.addEventListener("mousedown", (event) => {
    event.preventDefault();     // Prevent dragging
});

btnResizeGrid.onclick = () => createGrid(Math.min(prompt("Enter new grid size:", 16), 100));
btnChangeColor.onclick = () => changeInkColor();
