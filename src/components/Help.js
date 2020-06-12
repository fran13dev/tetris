import React from 'react'
import { StyledHelp } from './styles/StyledHelp'



const Help = () => {
    return (
        <StyledHelp onClick={() => alert('Left and Right Keys: Moves The Tetromino Sideways. \nUp Key: Rotates the Tetromino. \nDown Key: Drops The Tetromino.')
        }>
            Tetris Guideline
        </StyledHelp>
    )
}

export default Help


 