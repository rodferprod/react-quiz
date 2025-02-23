import { useEffect, useReducer, useContext, createContext } from "react";

const QuestionsContext = createContext();

const SCNDS_PER_QUESTION = 30;

const initialState = {
	questions: [],
	// The index array of the current Quiz question that will be shown
	index: 0,
	// The answer selected by the user
	answer: null,
	// How many questions was corrected answered
	points: 0,
	// The high pontuation of the user
	highscore: 0,
	// Seconds remaining to the end of the Quiz
	secondsRemaining: null,
	// 'loading' | 'error' | 'ready' | 'active' | 'finished' |  'restart
	status: "loading",
};

function reducerFn(currState, action) {
	switch (action.type) {
		case "dataReceived":
			return {
				...currState,
				questions: action.questions,
				status: "ready",
			};
		case "dataFailed":
			return {
				...currState,
				status: "error",
			};
		case "start":
			return {
				...currState,
				status: "active",
				secondsRemaining:
					currState.questions.length * SCNDS_PER_QUESTION,
			};
		case "newAnswer":
			// Each time the user answer a question we need to know:
			//  1) What's the current question;
			//  2) If the answer is correct;
			//  3) Increase user points or not.
			const currentQuestion = currState.questions.at(currState.index);
			const isCorrectQuestion =
				action.answer === currentQuestion.correctOption;
			return {
				...currState,
				answer: action.answer,
				points: isCorrectQuestion
					? currState.points + currentQuestion.points
					: currState.points,
			};
		case "nextQuestion":
			return {
				...currState,
				index: currState.index + 1,
				answer: null,
			};
		case "finish":
			return {
				...currState,
				status: "finished",
				highscore:
					currState.points > currState.highscore
						? currState.points
						: currState.highscore,
			};
		case "tic-tac":
			return {
				...currState,
				secondsRemaining: currState.secondsRemaining - 1,
				status:
					currState.secondsRemaining === 0
						? "finished"
						: currState.status,
			};
		case "restart":
			return {
				...initialState,
				status: "ready",
				questions: currState.questions,
				highscore: currState.highscore,
			};
		default:
			throw new Error("Unknow action provided");
	}
}

function QuestionsProvider({ children }) {
	const [state, dispatch] = useReducer(reducerFn, initialState);
	const {
		questions,
		status,
		index,
		answer,
		points,
		highscore,
		secondsRemaining,
	} = state;

	const qntQuestions = questions.length;
	// Zero, as the second parameter of array.reduce(), is the initial acumulatedValue
	const maxPoints = questions.reduce(
		(acumulatedValue, question) => acumulatedValue + question.points,
		0
	);

	useEffect(() => {
		fetch("http://localhost:8000/questions")
			.then((res) => res.json())
			.then((data) => dispatch({ type: "dataReceived", questions: data }))
			.catch((err) => dispatch({ type: "dataFailed" }));
	}, []);

	return (
		<QuestionsContext.Provider
			value={{
				questions,
				status,
				index,
				answer,
				points,
				highscore,
				secondsRemaining,
				maxPoints,
				qntQuestions,
				dispatch,
			}}
		>
			{children}
		</QuestionsContext.Provider>
	);
}

function useQuestions() {
	const context = useContext(QuestionsContext);
	if (!context)
		throw new Error("Can't access the context outside of the provider!");
	return context;
}

export { QuestionsProvider, useQuestions };
