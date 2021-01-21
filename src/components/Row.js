import React from 'react';
import Cell from './Cell';

const Row = ({ row, onStep, i }) => {
    return (
        <div className='row'>
            { row.map((value, j) => <Cell value={value} onStep={onStep} i={i} j={j} key={j} />) }
        </div>
    )
}

export default Row;