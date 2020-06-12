import React, { useEffect } from 'react';
import Tetris from './components/Tetris';
import './App.css';

const App = () => {

    useEffect(() => {
        // Update the document title using the browser API
        document.title = 'Tetris in Reactjs'
    });

    return (
        <div className='app'>
            <Tetris />
        </div>
    )
}

export default App