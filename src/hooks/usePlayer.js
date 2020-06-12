import { useState, useCallback } from 'react'
import { TETROMINOS, randomTetromino } from '../tetrominos'
import { STAGE_WIDTH, checkCollision } from '../gameHelpers';

// usePlayer will be created as a custom hook
export const usePlayer = () => {

    const [player, setPlayer] = useState({
        // set the initial state of the player variable
        pos: {
        // the pos key will determine where the tetro is on the stage
            x: 0, // by default x is set to 0
            y: 0 // by default y is set to 0
        },
        tetromino: TETROMINOS[0].shape, // by default the tetromino is set to 0 (blank)
        collided: false
    })

    //console.log(player.tetromino)

    // rotate() will be used to rotate the tetro on the stage
    const rotate = (tetro, dir) => {
        // _ because we don't need the value, but do need the index
        const rotatedTetro = tetro.map((_, index) =>
            tetro.map(col => col[index])
        )
        if (dir > 0)
            return rotatedTetro.map(row => 
                row.reverse())
        return rotatedTetro.reverse()
    }

    const playerRotate = (stage, dir) => {
        // make a copy of the player variable
        const copyPlayer = JSON.parse(JSON.stringify(player))
        //console.log(copyPlayer)
        copyPlayer.tetromino = rotate(copyPlayer.tetromino, dir)
        // the copyPlayer.tetromino and dir values are passed to the rotate() function
        let offset = 1
        while (checkCollision(copyPlayer, stage, { x: 0, y: 0 })) {
            copyPlayer.pos.x += offset
            offset = -(offset + (offset > 0 ? 1 : -1))
            //console.log(offset)
            if (offset > copyPlayer.tetromino[0].length) {
                rotate(copyPlayer.tetromino, -dir)
                return
            }
        }
        setPlayer(copyPlayer)
    }

    // x, y and collided passed as "props" to the function
    const updatePlayerPos = ({ x, y, collided }) => {
        setPlayer(prev => ({
            ...prev,
            pos: {
                x: (prev.pos.x += x),
                y: (prev.pos.y += y)
            },
            collided
        }))
    }

    const resetPlayer = useCallback(() => {
        setPlayer(
            {
                pos: {
                    x: STAGE_WIDTH / 3, // x is the width of the stage, places the tetro in the middle of the stage 
                    y: 0 // y is the height of the stage, places the tetro at the top of the stage
                },
                tetromino: randomTetromino().shape, // whenever randomTetromino() is executed, it returns the TETROMINOS variable with a [randomTetro]
                collided: false
        })
    }, [] )

    return [player, updatePlayerPos, resetPlayer, playerRotate]
}

