import React from 'react';

const Cell = ({ value, i, j, onStep }) => {
    let a = null;

    if (value === 1)
        a = 'X';
    else if (value === -1)
        a = 'O';

    let classNames = ['cell'];
    if(!a) classNames.push('empty');
    classNames = classNames.join(' ');

    return (
        <div className={classNames} onClick={() => onStep(i, j)}>
            { a }
        </div>
    )
}

export default Cell;