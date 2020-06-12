import React from 'react'
import { StyledButton } from './styles/StyledButton'

const StartButton = ({ start, restart }) => (
    <StyledButton
        onClick={start} // onClick calls the startGame function created in the <Tetris /> component
    > 
        {restart ? 'Restart' : 'Start Game'}
    </StyledButton>
)

export default StartButton