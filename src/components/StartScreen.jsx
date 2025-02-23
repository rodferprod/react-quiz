import { useQuestions } from "../context/QuestionsProvider"

function StartScreen() {
    const { qntQuestions, dispatch } = useQuestions();
    return (
        <div className="start">
            <h2>Welcome to React Quiz!</h2>
            <h3>{qntQuestions} questions to test your React mastery</h3>
            <button className="btn" onClick={() => dispatch({ type: 'start' })}>Lest's start</button>
        </div>
    )
}

export default StartScreen
