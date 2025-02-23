import { useQuestions } from "../context/QuestionsProvider";

function FinishScreen() {
    const { points, maxPoints, highscore, dispatch } = useQuestions();

    const percentage = (points / maxPoints) * 100;
    let emoji;
    if (percentage === 100) emoji = "🥇";
    if (percentage >= 80 && percentage < 100) emoji = "🥳";
    if (percentage >= 50 && percentage < 80) emoji = "🙂";
    if (percentage > 0 && percentage < 50) emoji = "🤔";
    if (percentage === 0) emoji = "😭";
    return (
        <>
            <p className="result">
                <span>{emoji}</span> You scored <strong>{points}</strong> out of {maxPoints} ({Math.ceil(percentage)}%)
            </p>
            <p className="highscore">
                Highscore: {highscore} points
            </p>
            <p style={{ display: 'flex', justifyContent: 'center' }}>
                <button className="btn" onClick={() => dispatch({ type: 'restart' })}>Restart quiz</button>
            </p>
        </>
    )
}

export default FinishScreen
