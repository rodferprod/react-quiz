function NextButton({ dispatch, answer, index, qntQuestions }) {
    if (answer === null) return null;
    const endOfQuiz = index === qntQuestions - 1;
    return (
        <button className="btn btn-ui" onClick={() => endOfQuiz ? dispatch({ type: 'finish' }) : dispatch({ type: 'nextQuestion' })}>
            {endOfQuiz ? 'Finish' : 'Next'}
        </button>
    )
}

export default NextButton
