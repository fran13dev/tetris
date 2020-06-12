// Capitalize to emphasize values need to remain constant
export const STAGE_WIDTH = 12
export const STAGE_HEIGHT = 20

// Create a copy of the [STAGE_HEIGHT] array (with a length of 20) with the Array.from method
export const createStage = () =>
    // Array.from includes a map function to call on every element of the array.
    Array.from(Array(STAGE_HEIGHT),
        // for every element in the [STAGE_HEIGHT] array, create a new array from STAGE_WIDTH
        () => Array(STAGE_WIDTH)
            // the .fill method modifies the array with a static value, in this case, another array with values 0 and clear, for each array [STAGE_WIDTH] in the array [STAGE_HEIGHT]
            .fill([0, 'clear']))

/* createStage(), therefor, creates 3 arrays:

1. Array.from() creates a copy of the [STAGE_HEIGHT] array - ONE array with a length of 20
2. The map function then creates an array [STAGE_WIDTH] from each element in the [STAGE_HEIGHT] array - ONE array from EACH element in the mapped array, i.e 20 arrays
3. The .fill method then creates an array with values [0, 'clear'] from each element in the [STAGE_WIDTH] array

*/

// function will be used to check that tetro stays within the stage size
export const checkCollision = (player, stage, { x: width, y: height }) => {
    for (let i = 0; i < player.tetromino.length; i++) {
        for (let j = 0; j < player.tetromino[i].length; j++) {

            // if player.tetromino is not 0 (default)
            if (player.tetromino[i][j] !== 0) {
                if (
                    // if tetro is not inside the game height (y)
                    !stage[i + player.pos.y + height] ||

                    // if tetro is not inside the game width (x)
                    !stage[i + player.pos.y + height][j + player.pos.x + width] ||

                    // if tetro is not moving to a merged cell
                    stage[i + player.pos.y + height][j + player.pos.x + width][1] !== 'clear'
                ) {
                    // stop tetro from moving, ends function execution
                    return true
                }
            }
        }
    }
    return false
}

// the checkCollision function will be called each time the tetro moves in either height or width
