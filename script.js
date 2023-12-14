//***** global variables *****/

let tileMap = tileMap01
let tileType
let playerCoords
let totalGoalCount
let goalCount
let moveCount
let gameCompleted = false
let gameCompleteMessage = document.getElementById("gameCompleteMessage")

const tileClass = {
    " ": Tiles.Space,
    W: Tiles.Wall,
    B: Entities.Block,
    G: Tiles.Goal,
    P: Entities.Character,
}

const map = document.getElementById("map")

//***** change map *****/

function changeMap() {
    const mapSelector = document.getElementById("mapSelector");
    const selectedMap = mapSelector.value;

    // Update tileMap based on the selected map
    if (selectedMap == "map01") {
        tileMap = tileMap01;
    } else if (selectedMap == "map02") {
        tileMap = tileMap02;
    } else if (selectedMap == "map03") {
        tileMap = tileMap03;
    } else if (selectedMap == "map04") {
        tileMap = tileMap04;
    } else if (selectedMap == "map05") {
        tileMap = tileMap05;
    } else if (selectedMap == "map06") {
        tileMap = tileMap06;
    } else if (selectedMap == "map07") {
        tileMap = tileMap07;
    } else if (selectedMap == "map08") {
        tileMap = tileMap08;
    } else if (selectedMap == "map09") {
        tileMap = tileMap09;
    } else if (selectedMap == "map10") {
        tileMap = tileMap10;
    } else if (selectedMap == "map11") {
        tileMap = tileMap11;
    } else if (selectedMap == "map12") {
        tileMap = tileMap12;
    } else if (selectedMap == "map13") {
        tileMap = tileMap13;
    } else if (selectedMap == "map14") {
        tileMap = tileMap14;
    } else if (selectedMap == "map15") {
        tileMap = tileMap15;
    } else if (selectedMap == "map16") {
        tileMap = tileMap16;
    } else if (selectedMap == "map17") {
        tileMap = tileMap17;
    } else if (selectedMap == "map18") {
        tileMap = tileMap18;
    } else if (selectedMap == "map19") {
        tileMap = tileMap19;
    } else if (selectedMap == "map20") {
        tileMap = tileMap20;
    } else if (selectedMap == "map21") {
        tileMap = tileMap21;
    } else if (selectedMap == "map22") {
        tileMap = tileMap22;
    } else if (selectedMap == "map23") {
        tileMap = tileMap23;
    } else if (selectedMap == "map24") {
        tileMap = tileMap24;
    } else if (selectedMap == "map25") {
        tileMap = tileMap25;
    } else if (selectedMap == "map26") {
        tileMap = tileMap26;
    } else if (selectedMap == "map27") {
        tileMap = tileMap27;
    } else if (selectedMap == "map28") {
        tileMap = tileMap28;
    } else if (selectedMap == "map29") {
        tileMap = tileMap29;
    } else if (selectedMap == "map30") {
        tileMap = tileMap30;
    }
    
    // Recreate the map with the new selected map
    createMap();
}

//***** create map *****/

function createMap(){

    gameCompleteMessage.classList = "inactiveGameComplete"
    moveCount = -1
    totalGoalCount = 0
    goalCount = 0
    gameCompleted = false

    map.innerHTML = ""    

    for (let y = 0; y < tileMap.height ; y++) {
        for (let x = 0; x < tileMap.width ; x++) {
            let tile = document.createElement("div")
            tile.id = "x" + x + "y" + y; // Set tile ID according to its coords
            tile.className = "tile"; // Set general tile class
    
            tileType = tileMap.mapGrid[y][x][0]
            tile.classList.add(tileClass[tileType]) // Set class according to tile type
    
            if(tileType == "P") {playerCoords = { x, y }} // Set player coordinates
            if(tileType == "G") {totalGoalCount ++} // Set total count of goals
    
            map.appendChild(tile)
        }
    }    

    goalCounter()
    moveCounter()

}


createMap();



//***** player input *****/

function playerInput(event){

    if (event.key == ("ArrowUp") && gameCompleted != true) { movePlayer(0, -1); }
    else if (event.key == ("w") && gameCompleted != true) { movePlayer(0, -1); }
    else if (event.key == ("W") && gameCompleted != true) { movePlayer(0, -1); }
    else if (event.key == ("ArrowLeft") && gameCompleted != true) { movePlayer(-1, 0); }
    else if (event.key == ("a") && gameCompleted != true) { movePlayer(-1, 0); }
    else if (event.key == ("A") && gameCompleted != true) { movePlayer(-1, 0); }
    else if (event.key == ("ArrowDown") && gameCompleted != true) { movePlayer(0, 1); }
    else if (event.key == ("s") && gameCompleted != true) { movePlayer(0, 1); }
    else if (event.key == ("S") && gameCompleted != true) { movePlayer(0, 1); }
    else if (event.key == ("ArrowRight") && gameCompleted != true) { movePlayer(1, 0); }
    else if (event.key == ("d") && gameCompleted != true) { movePlayer(1, 0); }
    else if (event.key == ("D") && gameCompleted != true) { movePlayer(1, 0); }
    event.preventDefault();
}

//***** player movement *****/

function movePlayer(moveX, moveY){
    
    let moveIsValid = false

    let targetTiles = [ document.getElementById("x" + playerCoords.x + "y" + playerCoords.y), // current player tile
                        document.getElementById("x" + (playerCoords.x + moveX) + "y" + (playerCoords.y + moveY)), // player targer tile
                        document.getElementById("x" + (playerCoords.x + 2 * moveX) + "y" + (playerCoords.y + 2 * moveY))] // box target tile

    let targetTilesClasses = [targetTiles[0].classList, targetTiles[1].classList, targetTiles[2].classList]


    if (targetTilesClasses[1].contains(Tiles.Space)) 
    {
        moveIsValid = true
    }

    if (targetTilesClasses[1].contains(Tiles.Goal))
    {
        moveIsValid = true
    }

    if (targetTilesClasses[1].contains(Entities.Block) && targetTilesClasses[2].contains(Tiles.Space))
    {
        moveIsValid = true

        targetTiles[2].classList.remove(Tiles.Space)
        targetTiles[2].classList.add(Entities.Block)

    }

    if (targetTilesClasses[1].contains(Entities.Block) && targetTilesClasses[2].contains(Tiles.Goal))
    {
        moveIsValid = true

        targetTiles[2].classList.remove(Tiles.Goal)
        targetTiles[2].classList.add(Entities.BlockDone)

        goalCount++

    }

    if (targetTilesClasses[1].contains(Entities.BlockDone) && targetTilesClasses[2].contains(Tiles.Goal))
    {
        moveIsValid = true

        targetTiles[2].classList.remove(Tiles.Goal)
        targetTiles[2].classList.add(Entities.BlockDone)
    }

    if (targetTilesClasses[1].contains(Entities.BlockDone) && targetTilesClasses[2].contains(Tiles.Space))
    {
        moveIsValid = true

        targetTiles[2].classList.remove(Tiles.Space)
        targetTiles[2].classList.add(Entities.Block)

        goalCount--
    }

    if (moveIsValid == true)
    {
            moveCounter()

        if (tileMap.mapGrid[playerCoords.y][playerCoords.x][0] == "G")
        {
            targetTiles[0].classList.add(Tiles.Goal)
        }
        else{
            targetTiles[0].classList.add(Tiles.Space)
        }

        playerCoords.x = playerCoords.x + moveX
        playerCoords.y = playerCoords.y + moveY

        targetTiles[0].classList.remove(Entities.Character)
        targetTiles[1].classList= "tile"
        targetTiles[1].classList.add(Entities.Character)
    }

    if (goalCount == totalGoalCount) {gameComplete()}

    goalCounter()

}

//***** move counter *****/
function goalCounter(){
    document.getElementById("goalCounter").innerHTML = goalCount + " / " + totalGoalCount;

}

//***** move counter *****/

function moveCounter(){
    moveCount++
    document.getElementById("moveCounter").innerHTML = moveCount
}

//***** game complete *****/

function gameComplete(){
    gameCompleted = true
    gameCompleteMessage.classList = "activeGameComplete"
    document.getElementById("completedMoves").innerHTML = moveCount
}


//***** event listeners *****/

document.addEventListener("keydown", playerInput);
