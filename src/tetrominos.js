// Capitalize to emphasize values need to remain constant

// TETROMINOS variable will be used to create the tetromino shapes
export const TETROMINOS = {

    // default, blank screen
    0: {
        shape: [
            [0]
        ],
        color: '0, 0, 0'
    },

    // The [I] tetro shape
    I: {
        shape: [ 
            [0, 'I', 0, 0],
            [0, 'I', 0, 0],
            [0, 'I', 0, 0],
            [0, 'I', 0, 0]
        ],
        // color is added in the Cell component
        color: '0, 255, 255',
    },

    // The [J] tetro shape
    J: {
        shape: [
            [0, 'J', 0],
            [0, 'J', 0],
            ['J', 'J', 0],
        ],
        // color is added in the Cell component
        color: '0, 0, 255',
    },

    // The [L] tetro shape
    L: {
        shape: [
            [0, 'L', 0],
            [0, 'L', 0],
            [0, 'L', 'L']
        ],
        // color is added in the Cell component
        color: '255, 128, 0'
    },

    // The [O] tetro shape
    O: {
        shape: [
            ['O', 'O'],
            ['O', 'O']
        ],
        // color is added in the Cell component
        color: '255, 255, 0'
    },

    // The [S] tetro shape
    S: {
        shape: [
            [0, 'S', 'S'],
            ['S', 'S', 0],
            [0, 0, 0]
        ],
        // color is added in the Cell component
        color: '0, 204, 0'
    },

    // The [T] tetro shape
    T: {
        shape: [
            [0, 0, 0],
            ['T', 'T', 'T'],
            [0, 'T', 0]
        ],
        // color is added in the Cell component
        color: '204, 0, 204'
    },

    // The [Z] tetro shape
    Z: {
        shape: [
            ['Z', 'Z', 0],
            [0, 'Z', 'Z'],
            [0, 0, 0]
        ],
        // color is added in the Cell component
        color: '255, 0, 0'
    },   
}

// The randomTetromino function will be used to select a random tetro shape each time it is executed
export const randomTetromino = () => {
    // declare the different shapes as a string
    const tetrominos = 'IJLOSTZ'
    // selects the letter with the same index [] as the Math.floor(Math.random()) method
    const randomTetro = tetrominos[Math.floor(Math.random() * tetrominos.length)]

    // returns the corresponding key of the TETROMINOS variable
    return TETROMINOS[randomTetro]
}

// whenever randomTetromino() is executed, it returns the TETROMINOS variable with a [randomTetro]

