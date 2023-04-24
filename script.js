const container = document.querySelector("#container");
const gridWidthAndHeight = 800;
let gridItems;

function changeBackgroundColor() {
    this.style.backgroundColor = "black";
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
            divRow.appendChild(divColumn);
        }
        divRow.style.display = "flex";
        container.appendChild(divRow);
    }
    gridItems = document.querySelectorAll(".grid-item");

    gridItems.forEach((gridItem) => {
        gridItem.addEventListener("mouseover", changeBackgroundColor)
    });
};

createGrid();

const btnResizeGrid = document.querySelector("#btn-resize-grid");
btnResizeGrid.addEventListener("click", (e) => {
    createGrid(Math.min(prompt("Enter new grid size:", 16), 100));
});
