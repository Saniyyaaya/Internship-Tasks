let imageSrc = "";
let gridSize = 4;
let emptyIndex = gridSize * gridSize - 1;
let tiles = [];
let positions = [];

document.getElementById("imageInput").addEventListener("change", function(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            imageSrc = e.target.result;
            startGame();
        };
        reader.readAsDataURL(file);
    }
});

function startGame() {
    const puzzleContainer = document.getElementById("puzzle-container");
    puzzleContainer.innerHTML = "";
    tiles = [];
    positions = Array.from({ length: gridSize * gridSize }, (_, i) => i);

    do {
        positions.sort(() => Math.random() - 0.5);
    } while (!isSolvable(positions));

    emptyIndex = positions.indexOf(gridSize * gridSize - 1);

    for (let i = 0; i < gridSize * gridSize; i++) {
        let tile = document.createElement("div");
        tile.classList.add("tile");
        tile.dataset.index = i;
        
        if (positions[i] !== gridSize * gridSize - 1) {
            tile.style.backgroundImage = `url(${imageSrc})`;
            let x = (positions[i] % gridSize) * -100;
            let y = Math.floor(positions[i] / gridSize) * -100;
            tile.style.backgroundPosition = `${x}px ${y}px`;
        } else {
            tile.classList.add("empty");
        }

        tile.addEventListener("click", () => moveTile(i));
        puzzleContainer.appendChild(tile);
        tiles.push(tile);
    }
}

function moveTile(index) {
    let row = Math.floor(index / gridSize);
    let col = index % gridSize;
    let emptyRow = Math.floor(emptyIndex / gridSize);
    let emptyCol = emptyIndex % gridSize;

    if ((Math.abs(row - emptyRow) === 1 && col === emptyCol) ||
        (Math.abs(col - emptyCol) === 1 && row === emptyRow)) {
        
        [tiles[emptyIndex].style.backgroundImage, tiles[index].style.backgroundImage] = 
        [tiles[index].style.backgroundImage, tiles[emptyIndex].style.backgroundImage];

        [tiles[emptyIndex].classList, tiles[index].classList] = 
        [tiles[index].classList, tiles[emptyIndex].classList];

        emptyIndex = index;

        if (checkWin()) {
            setTimeout(() => alert("🎉 Puzzle Solved!"), 200);
        }
    }
}

function isSolvable(positions) {
    let inversions = 0;
    for (let i = 0; i < positions.length - 1; i++) {
        for (let j = i + 1; j < positions.length; j++) {
            if (positions[i] > positions[j] && positions[i] !== gridSize * gridSize - 1) {
                inversions++;
            }
        }
    }
    return inversions % 2 === 0;
}

function checkWin() {
    return tiles.every((tile, index) => {
        return tile.dataset.index == index || tile.classList.contains("empty");
    });
}

function resetGame() {
    startGame();
}
