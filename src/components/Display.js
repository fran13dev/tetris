import React from 'react'
import { StyledDisplay } from './styles/StyledDisplay'

const Display = ({ gameOver, text }) => (
    <StyledDisplay
        gameOver={gameOver} // gameOver is used in the StyledDisplay file as a prop, for the colour of the text
    >
        {text}
    </StyledDisplay>
)

export default Display
