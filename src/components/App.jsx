import { useEffect, useReducer } from "react";
import Header from "./Header";
import Main from "./Main";
import Loader from "./Loader";
import Error from "./Error";
import StartScreen from "./StartScreen";
import Question from "./Question";
import NextButton from "./NextButton";
import Progress from "./Progress";
import FinishScreen from "./FinishScreen";
import Footer from "./Footer";
import Timer from "./Timer";

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
    status: 'loading'
}

function reducerFn(currState, action) {

    switch (action.type) {
        case 'dataReceived':
            return {
                ...currState,
                questions: action.questions,
                status: 'ready'
            };
        case 'dataFailed':
            return {
                ...currState,
                status: 'error'
            };
        case 'start':
            return {
                ...currState,
                status: 'active',
                secondsRemaining: currState.questions.length * SCNDS_PER_QUESTION
            };
        case 'newAnswer':
            // Each time the user answer a question we need to know:
            //  1) What's the current question;
            //  2) If the answer is correct;
            //  3) Increase user points or not.
            const currentQuestion = currState.questions.at(currState.index);
            const isCorrectQuestion = action.answer === currentQuestion.correctOption;
            return {
                ...currState,
                answer: action.answer,
                points: isCorrectQuestion ? currState.points + currentQuestion.points : currState.points
            }
        case 'nextQuestion':
            return {
                ...currState,
                index: currState.index + 1,
                answer: null
            }
        case 'finish':
            return {
                ...currState,
                status: 'finished',
                highscore: currState.points > currState.highscore ? currState.points : currState.highscore
            }
        case 'tic-tac':
            return {
                ...currState,
                secondsRemaining: currState.secondsRemaining - 1,
                status: currState.secondsRemaining === 0 ? 'finished' : currState.status
            }
        case 'restart':
            return {
                ...initialState,
                status: 'ready',
                questions: currState.questions,
                highscore: currState.highscore
            };
        default:
            throw new Error("Unknow action provided");
    }

}

export default function App() {
    const [state, dispatch] = useReducer(reducerFn, initialState);
    const { questions, status, index, answer, points, highscore, secondsRemaining } = state;

    const qntQuestions = questions.length;
    // Zero, as the second parameter of array.reduce(), is the initial acumulatedValue
    const maxPoints = questions.reduce((acumulatedValue, question) => acumulatedValue + question.points, 0);

    useEffect(() => {
        fetch('http://localhost:8000/questions')
            .then((res) => res.json())
            .then((data) => dispatch({ type: 'dataReceived', questions: data }))
            .catch((err) => dispatch({ type: 'dataFailed' }));
    }, [])

    return (
        <div className="app">
            <Header />

            <Main>
                {status === 'loading' && <Loader />}
                {status === 'error' && <Error />}
                {status === 'ready' &&
                    <StartScreen qntQuestions={qntQuestions} dispatch={dispatch} />
                }
                {status === 'active' &&
                    <>
                        <Progress
                            index={index}
                            qntQuestions={qntQuestions}
                            points={points}
                            maxPoints={maxPoints}
                            answer={answer}
                        />
                        <Question
                            question={questions[index]}
                            dispatch={dispatch}
                            answer={answer}
                        />
                        <Footer>
                            <Timer dispatch={dispatch} secondsRemaining={secondsRemaining} />
                            <NextButton
                                dispatch={dispatch}
                                answer={answer}
                                index={index}
                                qntQuestions={qntQuestions}
                            />
                        </Footer>
                    </>
                }
                {status === 'finished' &&
                    <FinishScreen
                        points={points}
                        maxPoints={maxPoints}
                        highscore={highscore}
                        dispatch={dispatch}
                    />}
            </Main>
        </div>
    );
}
