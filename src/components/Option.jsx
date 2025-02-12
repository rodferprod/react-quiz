function Option({ question, dispatch, answer }) {
    /* If the question was answered:
        1) Disable all buttons;
        2) Change the button classes.
    */
    const hasAnswer = answer !== null;

    return (
        <div className="options">
            {question.options.map(
                (option, index) => <button
                    key={index}
                    className={
                        `btn btn-option
                        ${index === answer ? 'answer' : ''}
                        ${hasAnswer ?
                            (index === question.correctOption ?
                                'correct' : 'wrong'
                            ) : ''
                        }`}
                    onClick={() => dispatch({ type: 'newAnswer', answer: index })}
                    disabled={hasAnswer}
                >
                    {option}
                </button>
            )}
        </div>
    )
}

export default Option
