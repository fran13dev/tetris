import { useState, useEffect } from 'react'
import { createStage } from '../gameHelpers'

export const useStage = (player, resetPlayer) => {
    // set the initial state of the stage variable
    const [stage, setStage] = useState(createStage())
    // sets the stage variable = createStage() function created in gameHelpers.js

    const [rowsCleared, setRowsCleared] = useState(0)

    useEffect(() => {
        setRowsCleared(0)

        const sweepRows = (newStage) =>
            newStage.reduce((acc, row) => {
                // check if the statement findIndex(cell => cell[0] === 0) returns -1, index not found
                if (row.findIndex(cell => cell[0] === 0) === -1) {
                    setRowsCleared(prev => prev + 1)
                    acc.unshift(new Array(newStage[0].length).fill([0, 'clear']))
                    return acc
                }
                acc.push(row)
                return acc
            }, [])

        // the (prev) value is passed to updateStage from setStage()
        const updateStage = (prev) => {
            // map through the values of the prev array (the height)
            const newStage = prev.map(row => // the callback argument is: the value of each element (row)
                row.map(cell => // map through the values of each element in the width array
                    // check if the following cell is clear
                    (cell[1] === 'clear' ? [0, 'clear'] : cell))
                    // if clear, set value = [0, 'clear'] else the value of cell
            )

            // The forEach() method executes once for each element in a tetro array e.g 0: [0, "L", 0] 1: [0, "L", 0] 2: [0, "L", "L"]
            player.tetromino.forEach((row, y) => { // callback is invoked with the arguments: 1. the value of the element (row) 2. the index of the element (y)
                row.forEach((value, x) => { // The forEach() method executes once for each element in ONE of the tetro arrays e.g [0, "L", 0]
                    if (value !== 0) {
                        newStage[y + player.pos.y][x + player.pos.x] = // y and x are = array element indexes
                            [ 
                                value,
                                `${player.collided ? 'merged' : 'clear'}`
                            ]
                    }
                })
            })
            //console.log(newStage)

            // if collided evaluated to true
            if (player.collided) {
                // call the resetPlayer function, found in the usePlayer() custom hook
                resetPlayer()
                return sweepRows(newStage)
            }
            // else, if collided evaluated to false, return newStage
            return newStage

        }

        // pass the previous value of the stage variable as a parameter to the updateStage function
        setStage(prev => updateStage(prev))

    }, [player, resetPlayer])

    return [stage, setStage, rowsCleared]
}

