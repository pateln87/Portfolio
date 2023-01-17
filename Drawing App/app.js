// Initial References
const canvas = document.getElementById("drawingCanvas");
const ctx = canvas.getContext("2d");

const penButton = document.getElementById("penButton");
const eraseButton = document.getElementById("eraseButton");
const toolType = document.getElementById("toolType");
const colourSelector = document.getElementById("colourSelector");
const backgroundSelector = document.getElementById("backgroundSelector");
const penSize = document.getElementById("penSize");
const clearButton = document.getElementById("clearButton");

let mouseX = 0;
let mouseY = 0;
let drawing = false;
let erasing = false;

window.addEventListener("load", () => {
    canvas.height = canvas.offsetHeight;
    canvas.width = canvas.offsetWidth;
    canvas.style.backgroundColor = "#FFFFFF";

    let rectLeft = canvas.getBoundingClientRect().left;
    let rectTop = canvas.getBoundingClientRect().top;

    function draw(e) {
        if (drawing) { 
            ctx.lineCap = "round";
    
            mouseX = (e.pageX - rectLeft);
            mouseY = (e.pageY - rectTop);
    
            ctx.lineTo(mouseX, mouseY);
            ctx.stroke();
            ctx.beginPath();
            ctx.moveTo(mouseX, mouseY);
        } else return; //add erase function
    
    }

    function startPosition(e) {
        drawing = true;
        draw(e);
    }
    
    function finishedPosition() {
        drawing = false;
        ctx.beginPath();
    }

    // Event Listeners
    canvas.addEventListener("mousedown", startPosition);
    canvas.addEventListener("mouseup", finishedPosition);
    canvas.addEventListener("mousemove", draw);
    canvas.addEventListener("mouseleave", finishedPosition);

    penButton.addEventListener("click", () => {
        toolType.innerHTML = "Pen Size";
        erasing = false;
    });

    eraseButton.addEventListener("click", () => {
        toolType.innerHTML = "Eraser Size";
        erasing = true;
    });

    // Change Pen Size
    penSize.addEventListener("input", () => {
        ctx.lineWidth = penSize.value;
    });

    // Change Pen Colour
    colourSelector.addEventListener("change", () => {
        ctx.strokeStyle = colourSelector.value;
    });

    // Change Background
    backgroundSelector.addEventListener("change", () => {
        canvas.style.backgroundColor = backgroundSelector.value;
    });

    // Clear Canvas
    clearButton.addEventListener("click", () => {
        ctx.clearRect(0,0,canvas.width, canvas.height);
        canvas.style.backgroundColor = "#FFFFFF";
        backgroundSelector.value = "#FFFFFF";
    });
});