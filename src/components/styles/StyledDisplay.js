import styled from 'styled-components'

export const StyledDisplay = styled.div`
    box-sizing: border-box;
    display: flex;
    align-items: flex-start;
    margin-bottom: 20px;
    padding: 20px;
    border: 3px solid grey;
    min-height: 30px;
    width: 100%;
    border-radius: 15px;
    color: ${props => (props.gameOver ? 'red' : 'white')};
    background: black;
    font-family: Pixel, sans-serif;
    font-size: 12px; 
`