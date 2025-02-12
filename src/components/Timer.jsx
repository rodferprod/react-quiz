import { useEffect } from "react"

function Timer({ dispatch, secondsRemaining }) {
    // Our timer are sending a message to the reducerFn each second
    // and there we'll decrease secondsRemainig until it's zero,
    // so then we'll finish the quiz.
    useEffect(() => {
        const timer = setInterval(() => {
            dispatch({ type: 'tic-tac' });
        }, 1000);

        // Here we're cleaning our timer when this component unmounts
        // so then it'll restart from the total of seconds remaining again.
        return () => clearInterval(timer);
    }, [dispatch])

    const minutes = Math.floor(secondsRemaining / 60);
    const seconds = secondsRemaining % 60;

    return (
        <div className="timer">
            {minutes < 10 && "0"}{minutes}:{seconds < 10 && "0"}{seconds}
        </div>
    )
}

export default Timer
