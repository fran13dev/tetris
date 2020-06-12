import React from 'react';
import Cell from './Cell';
import { StyledStage } from './styles/StyledStage'

//  {stage} is the createStage() function created in gameHelpers
const Stage = ({ stage }) => (
    <StyledStage
        width={stage[0].length} // 12
        height={stage.length} // 20
    >
        {stage.map(row => // map through the height of the stage variable (the rows)
            row.map((cell, x) => // map through the width, of each element, in the stage variable (the cells in each row)
                // {x} is the index and {cell} is the value of each cell
                <Cell key={x} type={cell[0]} /> // the callback arguments are: 1. the value of the element and 2. the index of the element
            )
        )}
    </StyledStage>
)

export default Stage