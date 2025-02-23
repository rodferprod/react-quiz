import { useQuestions } from "../context/QuestionsProvider";

function NextButton() {
    const { dispatch, answer, index, qntQuestions } = useQuestions();

    if (answer === null) return null;
    const endOfQuiz = index === qntQuestions - 1;
    return (
        <button className="btn btn-ui" onClick={() => endOfQuiz ? dispatch({ type: 'finish' }) : dispatch({ type: 'nextQuestion' })}>
            {endOfQuiz ? 'Finish' : 'Next'}
        </button>
    )
}

export default NextButton
