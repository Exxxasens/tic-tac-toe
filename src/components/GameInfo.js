import React from 'react';

const GameInfo = ({ gameStatus, isNextStepX, onRestart }) => {
    let content;
    let isGameEnd = !!gameStatus;

    if (gameStatus === -1) content = 'Победа O';
    else if (gameStatus === 1) content = 'Победа X'; 
    else if (gameStatus) content = 'Ничья';
    else if (isNextStepX) content = 'Ход X';
    else content = 'Ход O';

    return (
        <div className='game-info'>
            { content }
            { isGameEnd ? <button onClick={onRestart} className='restart-btn'>Начать заново</button> : null }
        </div>
    )
}

export default GameInfo;