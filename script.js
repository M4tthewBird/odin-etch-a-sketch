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

function createGrid(gridSize) {
    const container = document.querySelector('.grid-container');
    container.style.setProperty('--rangeValue', gridSize); // Set CSS variable

    container.innerHTML = '';

    for (let y = 0; y < gridSize; y++) {
        for (let x = 0; x < gridSize; x++) {
            const div = document.createElement('div');
            div.classList.add('grid-cell');
            container.appendChild(div);

            div.addEventListener('mousedown', function() {
                darkenGridCell(this);
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
    opacity = isNaN(opacity) ? 0 : opacity;
    opacity += 0.1;

    if (opacity > 1.0) {
        opacity = 1.0;
    }

    cell.style.backgroundColor = `rgba(0, 0, 0, ${opacity})`;
}


function toggleGridOutline() {
    const gridCells = document.querySelectorAll('.grid-cell');
    gridCells.forEach(cell => {
        cell.classList.toggle('outlined');
    });

    const gridButton = document.getElementById('grid-button');
    gridButton.classList.toggle('toggled-on');
}


