const width = 10
const height = 15
const cellSize = 30


const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");



function drawFrame(){
    ctx.beginPath();
    ctx.rect(0, 0, width*cellSize, height*cellSize);
    ctx.stroke();
    ctx.closePath();
}

function drawLine(start, end){
    /*start: {row: 1, col: 0}, end: {row: 1, col: 10}*/
    ctx.beginPath();
    ctx.moveTo(start.col*cellSize, start.row*cellSize);
    ctx.lineTo(end.col*cellSize, end.row*cellSize);
    ctx.stroke();
    ctx.closePath();
}

function drawGrid() {
    for(let i = 0;i<width; i++){
        drawLine({row: 0, col: i}, {row: height, col: i})
    }
    for(let i = 0;i<height; i++){
        drawLine({row: i, col: 0}, {row: i, col: width})
    }
    drawShape(shapes[0])

}

function drawCell(cell, color){

    // cell: {row: 1, col: 0}
    ctx.beginPath();
    ctx.rect(cell.col*cellSize, cell.row*cellSize, cellSize, cellSize);
    ctx.fillStyle = color;
    ctx.fill();
    ctx.closePath();
}

function drawShape(){
    const newS = getPositionShape(currentShape.shape, currentShape.position)
            for (let i = 0; i < newS.length; i++) {
                const cell = newS[i]
                drawCell(cell, currentShape.color)
            }
}

function clearBoard() {
    console.log(cellsTaken)

    for (let i = 0; i < height; i++) {
        for (let j = 0; j < width; j++) {
            // console.log("cellsTaken[i][j]: ")
            drawCell({ row: i, col: j }, cellsTaken[i][j])
        }
    }
    drawGrid()
}

