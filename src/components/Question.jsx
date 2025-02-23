import { useQuestions } from "../context/QuestionsProvider"
import Option from "./Option"

function Question() {
    const { question } = useQuestions();
    return (
        <div>
            <h4>{question.question}</h4>
            <Option />
        </div>
    )
}

export default Question
