import React from 'react'
import { StyledCell } from './styles/StyledCell'
import { TETROMINOS } from '../tetrominos'

const Cell = ({ type }) => (
    <StyledCell
        // note back with more information
        color={TETROMINOS[type].color} />
)
// React.memo bails out from rendering when there's no changes in the component.
export default React.memo(Cell);

// With the initial load, all 240 <Cell /> components will render and afterwards, only the components who's value change, will re-render