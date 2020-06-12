import React, { useState } from 'react'
import { createStage, checkCollision } from '../gameHelpers'

// Styled Components
import { StyledTetrisWrapper, StyledTetris } from './styles/StyledTetris'

// Components 
import Stage from './Stage'
import Display from './Display'
import StartButton from './StartButton'
import Help from './Help'

// Custom Hooks
import { useInterval } from '../hooks/useInterval'
import { usePlayer } from '../hooks/usePlayer'
import { useStage } from '../hooks/useStage'
import { useGameStatus } from '../hooks/useGameStatus'

const Tetris = () => {
    const [dropTime, setDropTime] = useState(null)
    const [gameOver, setGameOver] = useState(false)
    const [restart, setRestart] = useState(false)
    const [player, updatePlayerPos, resetPlayer, playerRotate] = usePlayer()
    const [stage, setStage, rowsCleared] = useStage(player, resetPlayer)
    const [score, setScore, rows, setRows, level, setLevel] = useGameStatus(rowsCleared)

    const startGame = () => {
        setDropTime(1000)
        // reset the stage by calling createStage()
        setStage(createStage())
        // call the setPlayer variable, to set the values for the player variable
        resetPlayer()
        setGameOver(false)
        setRestart(true)
        setScore(0)
        setRows(0)
        setLevel(0)
    }

    // move the tetro to either the left or right, the (dir) value will be passed to movePlayer() from move()
    const movePlayer = (dir) => {
        // if the tetro does not collide with anything...
        if (!checkCollision(player, stage, { x: dir, y: 0 })) { // passes these values as props to the checkCollision function
            updatePlayerPos(
                {
                    x: dir, // moves the tetro in the width of the stage
                    y: 0,
                    collided: false // as long as the tetro can move, collided is false
                }
            )
        }
    }

    // the value of keyCode will be sent to the movePlayer function as the (dir) value
    const move = ({ keyCode }) => { // keyCode is a global event
        if (!gameOver) {
            if (keyCode === 37) { // left arrow key
                movePlayer(-1) // value will be sent to the movePlayer function
            } else if (keyCode === 39) { // right arrow key
                movePlayer(1) // // value will be sent to the movePlayer function
            } else if (keyCode === 40) { // down arrow key
                dropPlayer() // calls dropPlayer()
            } else if (keyCode === 38) {
                playerRotate(stage, 1) // function will execute each time the player presses the up arrow key
                // passing the stage and the value 1 to the playerRotate function
            }
        }
    }

    const keyUp = ({ keyCode }) => {
        if (!gameOver) {
            if (keyCode === 40) {
                setDropTime(1000)
            }

        }
    }

    // this function will be called each time the user click the down arrow key
    const dropPlayer = () => {
        setDropTime(null)
        drop() // calls drop()
    }

    // moves the tetro down
    const drop = () => {
        // increase the level, if 10 rows has been cleared
        if (rows > (level + 1) * 10) {
            setLevel(prev => prev + 1)
            // increase the drop time when level increases
            setDropTime(1000 / (level + 1))
        }
        // if the tetro does not collide with anything...
        if (!checkCollision(player, stage, { x: 0, y: 1 })) { // passes these values as props to the checkCollision function
            updatePlayerPos(
                {
                    x: 0,
                    y: 1, // moves the tetro in the height of the stage
                    collided: false // as long as the tetro can move, collided is false
                }
            )
        // if the tetro does collide with something...
        } else {
            //  if the tetro collides with something AND the value of y < 1, the game is over 
            if (player.pos.y < 2) {
                //console.log('Game Over')
                setGameOver(true)
                setDropTime(null)
                setRestart(false)
            }
            // reset the player values
            updatePlayerPos(
                {
                    x: 0,
                    y: 0,
                    collided: true
                }
            )
        }
    }

    // this hook will make the tetro move down automatically
    useInterval(() => {
        drop() // call the drop function
    }, dropTime) // call dropTime as the delay

    return (
        <StyledTetrisWrapper
            // understand the attributes
            tabIndex="0"
            onKeyDown={e => move(e)}
            onKeyUp={keyUp}>

            <StyledTetris>

                <Stage // {stage} being passed as a prop, is the createStage() function
                    stage={stage} /> 
                <aside>
                    {gameOver ? (
                        <Display
                            gameOver={gameOver} // passed as a prop to the <Display /> component to change the "Game Over" text colour
                            text="Game Over" /> // {text} being passed as a prop, is the text the <Display /> component will render
                        )
                        :
                        (
                            <div>
                                <Display // {text} being passed as a prop, is the text the <Display /> component will render
                                    text={`Score: ${score}`} />
                                <Display // {text} being passed as a prop, is the text the <Display /> component will render
                                    text={`Rows: ${rows}`} />
                                <Display // {text} being passed as a prop, is the text the <Display /> component will render
                                    text={`Level: ${level}`} />
                            </div>
                        )
                    }
                    <Help />
                    <StartButton // {start} being passed as a prop, will be used with the onClick event
                        start={startGame}
                        restart={restart}
                    />
                </aside>

            </StyledTetris>

        </StyledTetrisWrapper>
    )
}

export default Tetris
