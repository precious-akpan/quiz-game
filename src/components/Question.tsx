import React from 'react';
import { QuizQuestion } from '../types/quiz.types';

interface QuestionProps {
    question: QuizQuestion;
    onAnswer: (answer: string) => void;
}

const Question: React.FC<QuestionProps> = ({ question, onAnswer }) => {
    return (
        <div>
            <h2>{question.question}</h2>
            <ul>
                {question.answers.map((answer, index) => (
                    <li key={index} onClick={() => onAnswer(answer)}>
                        {answer}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Question;
