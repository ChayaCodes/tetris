//tetris game


let currentShape = generateNewShape()
const cellsTaken = initCellsTaken()



function initCellsTaken() {
    //init cellsTaken to white
    const cellsTaken = []
    for (let i = 0; i < height; i++) {
        cellsTaken.push([])
        for (let j = 0; j < width; j++) {
            cellsTaken[i].push("white")
        }
    }
    console.log(cellsTaken)
    return cellsTaken
}

function getPositionShape(shape, position) {

    let newShape = (shape).map((cell) => {
        return {
            row: cell.row + position.top,
            col: cell.col + position.left
        }
    })
    return newShape
}

function generateNewShape() {
    const randomIndex = Math.floor(Math.random() * shapes.length)
    const newShape = shapes[randomIndex]
    newShape.position = newShape.position
    return newShape
}

function fallDown() {
    setInterval(() => {
        if (canMove({ top: currentShape.position.top + 1, left: currentShape.position.left })) {
            currentShape.position.top++
            clearBoard()
            drawShape(currentShape)
            
        } else {
            addToCellsTaken()
            currentShape = generateNewShape()
        }
    }, 1000)
}

function addToCellsTaken() {
    const cellsArr = getPositionShape(currentShape.shape, currentShape.position)
    for (let i = 0; i < cellsArr.length; i++) {
        const cell = cellsArr[i]
        cellsTaken[cell.row][cell.col] = currentShape.color
    }
}


function canMove(nextPosition) {
    const cellsArr = getPositionShape(currentShape.shape, nextPosition)
    for (let i = 0; i < cellsArr.length; i++) {
        const cell = cellsArr[i]
        if (cell.row >= height || cell.col >= width || cell.col < 0) {
            return false
        }
        if (cell.row>0 && cell.col>0 && cellsTaken[cell.row][cell.col] !== "white") {
            return false
        }
    }
    return true
}

//event listener
document.addEventListener("keydown", (event) => {
    if (event.key === "ArrowLeft") {
        if (canMove({ top: currentShape.position.top, left: currentShape.position.left - 1 })) {
            currentShape.position.left--
            clearBoard()
            drawShape(currentShape)
        }
    }
    if (event.key === "ArrowRight") {
        if (canMove({ top: currentShape.position.top, left: currentShape.position.left + 1 })) {
            currentShape.position.left++
            clearBoard()
            drawShape(currentShape)
        }
    }
    if (event.key === "ArrowDown") {
        if (canMove({ top: currentShape.position.top + 1, left: currentShape.position.left })) {
            currentShape.position.top++
            clearBoard()
            drawShape(currentShape)
        }
    }
    
    //rotate (arrow up)
    if (event.key === "ArrowUp") {
        const newShape = { ...currentShape } //copy currentShape
        newShape.shape = currentShape.shape.map((cell) => {
            return {
                row: cell.col,
                col: -cell.row
            }
        })
        if (canMove(newShape.position)) {
            currentShape.shape = newShape.shape
            clearBoard()
            drawShape(currentShape)
        }
    }        

})




drawFrame()
drawGrid()
fallDown()

