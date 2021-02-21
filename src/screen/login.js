import { io } from "socket.io-client";
import { useState, useEffect } from 'react'
import {API_SOCKET} from '../api'
// const socket = io('https://vast-spire-20853.herokuapp.com/');
const socket = io(API_SOCKET);

const LoginScreen = () => {
    const [gameCode, setGameCode] = useState("")

    // Set up socket
    useEffect(()=> {
        socket.on('gameCode', handleGameCode);
        socket.on('msg', handleGameMsg);

    },[])

    const createNewGame = () => {
        console.log("createNewGame");
        socket.emit('newGame');
        console.log("createNewGame2");
    }
    function handleGameMsg() {
        console.log("handleGameMsg");
    }
    function handleGameCode(gameCode) {
        console.log("gameCode", gameCode);
        setGameCode(gameCode);
      }
    function newGame() {
        socket.emit('newGame');
        // init();
    }
    return (
        <section className="vh-100">
            <div className="container h-100">

                <div id="initialScreen" className="h-100">
                    <div className="d-flex flex-column align-items-center justify-content-center h-100">
                        <h1>Ping Pong</h1>
                        <button
                            type="submit"
                            className="btn btn-success"
                            id="newGameButton"
                            onClick={createNewGame}
                        >
                            Create New Game
            </button>
                        <div>OR</div>
                        <div className="form-group">
                            <input type="text" placeholder="Enter Game Code" id="gameCodeInput" />
                        </div>
                        <button
                            type="submit"
                            className="btn btn-success"
                            id="joinGameButton"
                        >
                            Join Game
            </button>
                    </div>
                </div>

                <div id="gameScreen" className="h-100">
                    <div className="d-flex flex-column align-items-center justify-content-center h-100">

                        <h1>Your game code is: <span id="gameCodeDisplay"></span></h1>

                        <canvas id="canvas"></canvas>
                    </div>
                </div>

            </div>
        </section>
    )
}

export default LoginScreen