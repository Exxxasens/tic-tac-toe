import React from 'react';
import Grid from './Grid';
import GameInfo from './GameInfo';

const createField = (n, m) => {
    let field = [];

    for (let i = 0; i < n; i++) {
        let line = [];
        for (let j = 0; j < m; j++) {
            line.push(0);
        }
        field.push(line);
    }

    return field;
}

const checkDiagonal = (grid) => {
    let height = grid.length - 1;
    let firstDiagonal = {
        canWinO: true,
        canWinX: true
    }
    let secondDiagonal = {
        canWinO: true,
        canWinX: true
    }
    for (let i = 0; i <= height; i++) {
        if (grid[i][i] === 1) firstDiagonal.canWinO = false; // Элемент по диагонали - крестик
        else if (grid[i][i] === -1) firstDiagonal.canWinX = false; // Элемент по диагонали нолик
        else { // Если ячейка на диагонали пустая
            firstDiagonal.canWinO = false;
            firstDiagonal.canWinX = false;
        }

        if (grid[i][height-i] === 1) secondDiagonal.canWinO = false; // Элемент по диагонали - крестик
        else if (grid[i][height-i] === -1) secondDiagonal.canWinX = false; // Элемент по диагонали нолик
        else { // Если ячейка на диагонали пустая
            secondDiagonal.canWinO = false;
            secondDiagonal.canWinX = false;
        }


    }

    if (firstDiagonal.canWinO || secondDiagonal.canWinO) return -1;
    if (firstDiagonal.canWinX || secondDiagonal.canWinX) return 1;

    return 0;
}

function checkLines(grid) {
    var height = grid.length;
    var width = grid[0].length;

    for (let i = 0; i < height; i++) {
        var horizontal = -2, vertical = -2 // Стандартное значение

        for (let j = 0; j < width; j++) {

            if (vertical === -2) vertical = grid[j][i]; // Первая ячейка, предыдущей нет.
            if (vertical === grid[j][i]) {
                vertical = grid[j][i] // Предыдущая совпадает с текущей
            } else vertical = 0; // Предыдущая не совпадает с текущей

            if (horizontal === -2) horizontal = grid[i][j]; // Первая ячейка, предыдущей нет.
            if (grid[i][j] === horizontal) {
                horizontal = grid[i][j]; // Предыдущая совпадает с текущей
            } else horizontal = 0; // Предыдущая не совпадает с текущей

        }

        if (vertical === -1 || horizontal === -1) return -1;
        if (vertical === 1 || horizontal === 1) return 1;

    }

    return 0; // В случае если нет заполненных линий
}

function getStatus(grid) {
    let isAnyEmpty = false;

    for(let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[0].length; j++) {
            if (!grid[i][j]) isAnyEmpty = true;
        }
    }

    return checkDiagonal(grid) || checkLines(grid) || !isAnyEmpty;
}

const App = () => {
    const [field, setField] = React.useState(createField(3, 3));
    const [isNextStepX, toggleNextStep] = React.useState(true);
    const [isGameEnd, setGameStatus] = React.useState(0);

    const restartGame = () => {
        setField(createField(3, 3));
        toggleNextStep(true);
        setGameStatus(0);
    }

    const copyMatrix = (n) => {
        return n.map(m => [...m]);
    }

    const onClick = (i, j) => {
        if (!field[i][j] && !isGameEnd) {
            let newField = copyMatrix(field);
            newField[i][j] = (isNextStepX) ? 1 : -1;
            setField(newField);
            toggleNextStep(prevStep => !prevStep);
            setGameStatus(getStatus(newField));
        }
    }

    console.log(isGameEnd)

    return (
        <div className='app'>
            <GameInfo gameStatus={isGameEnd} isNextStepX={isNextStepX} onRestart={restartGame} />
            <Grid field={field} onStep={onClick} />
        </div>
    )
}

export default App;