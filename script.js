let lastValue = 16;

function rangeSlide(value) {
    document.getElementById('rangeValue').innerHTML = `${value}x${value}`;
    console.log(value)
    if (value != lastValue) {
        const gridButton = document.getElementById('grid-button');
        const isGridToggledOn = gridButton.classList.contains('toggled-on');
        
        createGrid(value);
        lastValue = value;
        
        if (isGridToggledOn) {
            toggleGridOutline();

        }
    }  
} 

let isDrawing = false;

function startDrawing() {
    event.preventDefault(); // Prevent default drag behavior
    isDrawing = true;
}

function stopDrawing() {
    isDrawing = false;
}

function draw(cell) {
    if (isDrawing) {
        darkenGridCell(cell);
    }
}

function createGrid(gridSize) {
    const container = document.querySelector('.grid-container');
    container.style.setProperty('--rangeValue', gridSize); // Set CSS variable

    container.innerHTML = '';

    for (let y = 0; y < gridSize; y++) {
        for (let x = 0; x < gridSize; x++) {
            const div = document.createElement('div');
            div.classList.add('grid-cell');
            container.appendChild(div);

            //div.style.backgroundColor = 'rgba(0, 0, 0, 0.0)';

            /* Use mousedown to start drawing */
            div.addEventListener('mousedown', function() {
                startDrawing();
                draw(this);
                console.log("mousedown")
            });

            /* Use mousemove to continue drawing */
            div.addEventListener('mousemove', function() {
                draw(this);
                console.log("mousemove")
            });

            /* Use mouseup to stop drawing */
            div.addEventListener('mouseup', function() {
                stopDrawing();
            });
        }
    }
}

/* This ensures that the grid is created immediately*/
document.addEventListener("DOMContentLoaded", function() {
    createGrid(lastValue);
});

function darkenGridCell(cell) {
    let opacity = parseFloat(cell.style.backgroundColor.slice(-4, -1));
    // console.log(cell.style.backgroundColor)
    console.log(cell.style.backgroundColor.slice(-4, -1))
    console.log(parseFloat(cell.style.backgroundColor.slice(-4, -1)))

    //console.log(opacity)
    
    if (isNaN(opacity)) {
        opacity = 0;
    } 

    opacity = Math.min(opacity + 0.1, 0.9); // Increment opacity, capped at 1.0

    setTimeout(function() {
        opacity = Math.min(opacity + 0.1, 0.9); // Increment opacity, capped at 1.0
        cell.style.backgroundColor = `rgba(0, 0, 0, ${opacity})`;
    }, 50);
}

function toggleGridOutline() {
    const gridCells = document.querySelectorAll('.grid-cell');
    gridCells.forEach(cell => {
        cell.classList.toggle('outlined');
    });

    const gridButton = document.getElementById('grid-button');
    gridButton.classList.toggle('toggled-on');
    
}

function clearCells() {
    const gridCells = document.querySelectorAll('.grid-cell');
    gridCells.forEach(cell => {
        cell.style.backgroundColor = 'rgba(0, 0, 0, 0.0)';
    });

    const clearButton = document.getElementById('clear-button');
    clearButton.classList.add('clicked');

    setTimeout(() => {
        clearButton.classList.remove('clicked');
    }, 500);
}
