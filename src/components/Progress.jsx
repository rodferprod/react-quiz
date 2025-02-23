import { useQuestions } from "../context/QuestionsProvider"

function Progress() {
    const { index, qntQuestions, points, maxPoints, answer } = useQuestions();
    return (
        <header className="progress">
            {/* Trick: We're converting a boolean to number to increase the index when we have an answered question */}
            <progress max={qntQuestions} value={index + Number(answer !== null)} />
            <p>Question <strong>{index + 1}</strong>/{qntQuestions}</p>
            <p><strong>{points}</strong> / {maxPoints}</p>
        </header>
    )
}

export default Progress
