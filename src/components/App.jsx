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
import { useQuestions } from "../context/QuestionsProvider";

export default function App() {
    const {
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

    } = useQuestions();

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
