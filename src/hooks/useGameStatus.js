import { useState, useEffect, useCallback } from 'react'

export const useGameStatus = (rowsCleared) => {

    const [score, setScore] = useState(0)
    const [rows, setRows] = useState(0)
    const [level, setLevel] = useState(0)

    const tetrisPoints = [40, 100, 300, 1200]

    // calculate the Tetris score
    const calcScore = useCallback(() => {
        // if one or more rows has been cleared
        if (rowsCleared > 0) {
            // [rowsCleared - 1] to get the correct value
            setScore(prev => prev + tetrisPoints[rowsCleared - 1] * (level + 1)) // (level + 1) because level starts at 1
            // displays the total amount of rows that has been cleared
            setRows(prev => prev + rowsCleared)
        }

        // add dependencies so that calcScore only renders once one of these values change
    }, [level, tetrisPoints, rowsCleared])

    useEffect(() => {
        calcScore()

        // add dependencies as calcScore() is dependant on these values
    }, [calcScore, rowsCleared, score])

    // to be used in the Tetris component
    return [score, setScore, rows, setRows, level, setLevel]
}