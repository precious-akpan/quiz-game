// src/components/Question.tsx
import React from 'react';
import { QuizQuestion } from '../types/quiz.types';
import styles from './Question.module.css'; // Import the CSS module

interface QuestionProps {
    question: QuizQuestion;
    onAnswer: (answer: string) => void;
}

const Question: React.FC<QuestionProps> = ({ question, onAnswer }) => {
    return (
        <div className={styles.questionBox}>
            <h2 className={styles.questionText}>{question.question}</h2>
            <ul className={styles.answerList}>
                {question.answers.map((answer, index) => (
                    <li key={index} className={styles.answerItem} onClick={() => onAnswer(answer)}>
                        {answer}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Question;
