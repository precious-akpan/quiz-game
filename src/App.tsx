import React, { useState, useEffect } from 'react';
import { fetchQuestions } from './utils/api';
import Question from './components/Question';
import { QuizQuestion } from './types/quiz.types';

const App: React.FC = () => {
    const [questions, setQuestions] = useState<QuizQuestion[]>([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [score, setScore] = useState(0);

    useEffect(() => {
        const loadQuestions = async () => {
            const questions = await fetchQuestions();
            setQuestions(questions);
        };

        loadQuestions();
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
        <div>
            {questions.length > 0 ? (
                <Question
                    question={questions[currentQuestionIndex]}
                    onAnswer={handleAnswer}
                />
            ) : (
                <p>Loading questions...</p>
            )}
        </div>
    );
};

export default App;

