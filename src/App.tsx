// src/components/App.tsx
import React, { useState, useEffect } from 'react';
import { fetchQuestions } from './utils/api';
import Question from './components/Question';
import { QuizQuestion } from './types/quiz.types';
import styles from './App.module.css'; // Import the CSS module

const App: React.FC = () => {
    const [questions, setQuestions] = useState<QuizQuestion[]>([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [score, setScore] = useState(0);

    useEffect(() => {
        const loadQuestions = async () => {
            const questions = await fetchQuestions();
            setQuestions(questions);
        };

        loadQuestions().then(r => console.log(r)).catch(err => alert(err.message));
    }, []);

    const handleAnswer = (answer: string) => {
        const currentQuestion = questions[currentQuestionIndex];
        if (answer === currentQuestion.correct_answer) {
            setScore(score + 1);
        }
        const nextQuestionIndex = currentQuestionIndex + 1;
        if (nextQuestionIndex < questions.length) {
            setCurrentQuestionIndex(nextQuestionIndex);
        } else {
            alert(`Game Over! Your score: ${score}`);
            // Optionally reset or navigate to a score screen
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.header}>Quiz Game</div>
            {questions.length > 0 ? (
                <div className={styles.questionContainer}>
                    <Question
                        question={questions[currentQuestionIndex]}
                        onAnswer={handleAnswer}
                    />
                </div>
            ) : (
                <p className={styles.loading}>Loading questions...</p>
            )}
        </div>
    );
};

export default App;
