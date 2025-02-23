import { useQuestions } from "../context/QuestionsProvider"
import Option from "./Option"

function Question() {
    const { questions, index } = useQuestions();
    const actualQuestion = questions.at(index);
    return (
        <div>
            <h4>{actualQuestion.question}</h4>
            <Option question={actualQuestion} />
        </div>
    )
}

export default Question
