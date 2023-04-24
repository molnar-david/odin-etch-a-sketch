const container = document.querySelector("#container");

function createGrid() {
    for (let i=0; i<16; i++) {
        const divRow = document.createElement("div");
        for (let j=0; j<16; j++) {
            const divColumn = document.createElement("div");
            divColumn.classList.add("grid-item");
            divColumn.style.width = "32px";
            divColumn.style.height = "32px";
            divRow.appendChild(divColumn);
        }
        divRow.style.display = "flex";
        container.appendChild(divRow);
    }
}

createGrid();
const gridItems = document.querySelectorAll(".grid-item");
gridItems.forEach((gridItem) => {
    gridItem.addEventListener("mouseover", () => {
        gridItem.style.backgroundColor = "black";
    })
});
