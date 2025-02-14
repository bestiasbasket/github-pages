// Código React de la aplicación
function App() {
    const [minutes, setMinutes] = React.useState(10);
    const [seconds, setSeconds] = React.useState(0);
    const [isRunning, setIsRunning] = React.useState(false);
    const [isPaused, setIsPaused] = React.useState(false);
    const [popupWindow, setPopupWindow] = React.useState(null);

    React.useEffect(() => {
        let interval;
        if (isRunning && !isPaused) {
            interval = setInterval(() => {
                if (seconds > 0) {
                    setSeconds(seconds - 1);
                } else if (minutes > 0) {
                    setMinutes(minutes - 1);
                    setSeconds(59);
                } else {
                    clearInterval(interval);
                    setIsRunning(false);
                }
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [isRunning, minutes, seconds, isPaused]);

    React.useEffect(() => {
        if (popupWindow && !popupWindow.closed) {
            const timerElement = popupWindow.document.getElementById('timer-display');
            if (timerElement) {
                timerElement.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
            }
        }
    }, [minutes, seconds, popupWindow]);

    const openPopupWindow = () => {
        const popup = window.open('', 'Timer', 'width=600,height=400');
        if (popup) {
            popup.document.write(`
                <!DOCTYPE html>
                <html>
                <head>
                    <title>Timer</title>
                    <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
                </head>
                <body class="bg-gray-900 flex items-center justify-center h-screen m-0">
                    <div class="bg-black p-8 rounded-xl border-4 border-yellow-500">
                        <div id="timer-display" class="text-[15vh] font-bold font-mono text-white">
                            ${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}
                        </div>
                    </div>
                </body>
                </html>
            `);
            popup.document.close();
            setPopupWindow(popup);
        }
    };

    const handleStart = () => {
        setIsRunning(true);
        setIsPaused(false);
    };

    const handlePause = () => {
        setIsPaused(!isPaused);
    };

    const handleStop = () => {
        setIsRunning(false);
        setIsPaused(false);
        setMinutes(10);
        setSeconds(0);
    };

    const handleReset = () => {
        setMinutes(10);
        setSeconds(0);
        setIsRunning(false);
        setIsPaused(false);
    };

    const increaseMinutes = () => {
        if (minutes < 99) setMinutes(minutes + 1);
    };

    const decreaseMinutes = () => {
        if (minutes > 0) setMinutes(minutes - 1);
    };

    const increaseSeconds = () => {
        if (seconds < 59) {
            setSeconds(seconds + 1);
        } else {
            setSeconds(0);
            if (minutes < 99) setMinutes(minutes + 1);
        }
    };

    const decreaseSeconds = () => {
        if (seconds > 0) {
            setSeconds(seconds - 1);
        } else if (minutes > 0) {
            setSeconds(59);
            setMinutes(minutes - 1);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 p-4">
            <div className="bg-black p-4 rounded-xl border-8 border-yellow-500 shadow-2xl w-full max-w-[95vw] h-[90vh] flex flex-col justify-between">
                <div className="flex-grow flex items-center justify-center mb-4">
                    <div className="flex justify-center items-center space-x-4 w-full">
                        <div className="bg-red-600 rounded-lg flex items-center justify-center w-[40%] aspect-square">
                            <span className="text-[25vh] font-bold font-mono text-white leading-none">
                                {minutes.toString().padStart(2, '0')}
                            </span>
                        </div>
                        <div className="text-[20vh] font-bold text-yellow-500 leading-none">:</div>
                        <div className="bg-red-600 rounded-lg flex items-center justify-center w-[40%] aspect-square">
                            <span className="text-[25vh] font-bold font-mono text-white leading-none">
                                {seconds.toString().padStart(2, '0')}
                            </span>
                        </div>
                    </div>
                </div>

                <div className="mt-auto">
                    <button
                        onClick={openPopupWindow}
                        className="w-full mb-4 bg-purple-600 text-white p-3 rounded-lg text-lg font-bold hover:bg-purple-700 transition-colors"
                    >
                        <i className="fas fa-external-link-alt mr-2"></i>
                        Abrir en ventana nueva
                    </button>

                    <div className="grid grid-cols-2 gap-2 mb-2">
                        <button onClick={increaseMinutes} className="bg-blue-500 text-white p-2 rounded text-sm hover:bg-blue-600">
                            <i className="fas fa-arrow-up"></i> Min +
                        </button>
                        <button onClick={increaseSeconds} className="bg-blue-500 text-white p-2 rounded text-sm hover:bg-blue-600">
                            <i className="fas fa-arrow-up"></i> Sec +
                        </button>
                        <button onClick={decreaseMinutes} className="bg-blue-500 text-white p-2 rounded text-sm hover:bg-blue-600">
                            <i className="fas fa-arrow-down"></i> Min -
                        </button>
                        <button onClick={decreaseSeconds} className="bg-blue-500 text-white p-2 rounded text-sm hover:bg-blue-600">
                            <i className="fas fa-arrow-down"></i> Sec -
                        </button>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                        {!isRunning ? (
                            <button onClick={handleStart} className="bg-green-500 text-white p-2 rounded text-sm hover:bg-green-600">
                                <i className="fas fa-play"></i> Iniciar
                            </button>
                        ) : (
                            <button onClick={handlePause} className="bg-yellow-500 text-white p-2 rounded text-sm hover:bg-yellow-600">
                                {isPaused ? <><i className="fas fa-play"></i> Reanudar</> : <><i className="fas fa-pause"></i> Pausar</>}
                            </button>
                        )}
                        <button onClick={handleStop} className="bg-red-500 text-white p-2 rounded text-sm hover:bg-red-600">
                            <i className="fas fa-stop"></i> Detener
                        </button>
                        <button onClick={handleReset} className="col-span-2 bg-gray-500 text-white p-2 rounded text-sm hover:bg-gray-600">
                            <i className="fas fa-redo"></i> Reiniciar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

ReactDOM.render(<App />, document.getElementById('root'));
