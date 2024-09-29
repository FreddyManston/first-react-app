import { useState } from 'react';

export default function Game() {
    return (
        <div className="game">
            <div className="game-board">
                <Board />
            </div>
            <div className="game-info">
                <ol>{/*TODO*/}</ol>
            </div>
        </div>
    );
}

function Board() {
    const [squares, setSquares] = useState(Array(9).fill(null));    // Why does state not get reset when we re-render the component?
    const [xIsNext, setXIsNext] = useState(true);

    function handleClick(i) {
        if (squares[i] != null || calculateWinner(squares)) {
            return;
        }

        /*
            Maintain immutability has the following benefits:
                1. Easier to implement time travel feature.
                2. Much cheaper for React to determine when components require re-rendering.
                     By default, all child components re-render automatically when the state of a parent component changes.
                     This includes even the child components that weren’t affected by the change.
                     Although re-rendering is not by itself noticeable to the user (you shouldn’t actively try to avoid it!),
                    you might want to skip re-rendering a part of the tree that clearly wasn’t affected by it for performance reasons.
        */
        const nextSquares = squares.slice();    // TODO: Confirm benefits for keeping this immutable.
        if (xIsNext) {
            nextSquares[i] = 'X';
        }
        else {
            nextSquares[i] = 'O';
        }
        setSquares(nextSquares);
        setXIsNext(!xIsNext);
    }

    const winner = calculateWinner(squares);    // Why is winner a constant, yet it mutates? Is it undefined as null , and then stays defined when we find a winner?
    let status;
    if (winner) {
        status = 'Winner: ' + winner;
    }
    else {
        status = 'Next player: ' + (xIsNext ? 'X' : 'O');
    }

    return <>
        <div className="status">{status}</div>
        <div className="board-row">
            <Square value={squares[0]} onSquareClick={() => handleClick(0)}/>
            <Square value={squares[1]} onSquareClick={() => handleClick(1)}/>
            <Square value={squares[2]} onSquareClick={() => handleClick(2)}/>
        </div>
        <div className="board-row">
            <Square value={squares[3]} onSquareClick={() => handleClick(3)}/>
            <Square value={squares[4]} onSquareClick={() => handleClick(4)}/>
            <Square value={squares[5]} onSquareClick={() => handleClick(5)}/>
        </div>
        <div className="board-row">
            <Square value={squares[6]} onSquareClick={() => handleClick(6)}/>
            <Square value={squares[7]} onSquareClick={() => handleClick(7)}/>
            <Square value={squares[8]} onSquareClick={() => handleClick(8)}/>
        </div>
    </>;
}

function Square({ value, onSquareClick }) {
    /* 
        This is a bit circular. Board , has a bunch of Squares.
        Each Square has onSquareClick prop, which is an empty function pointing to another function , which is defined in Board.
        Is this good practice? Why
    */
    return <button className="square" onClick={onSquareClick}>{value}</button>;
}

function calculateWinner(squares) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];
        }
    }
    return null;
}
