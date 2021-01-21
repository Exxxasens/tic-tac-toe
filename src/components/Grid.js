import React from 'react';
import Row from './Row';

const Grid = ({ field, onStep }) => {
    return (
        <div className='field-wrapper'>
            { field.map((row, i) => <Row row={row} onStep={onStep} i={i} key={i} />) }
        </div>
    )
}

export default Grid;