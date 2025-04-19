'use client';

import { useContext } from 'react';
import { QuizContext } from '@/context/quiz-context';

import QuizResult from '@/components/quiz-result';
import ErrorMessage from '@/components/error-message';

export default function ResultPage() {
  const quizState = useContext(QuizContext);
  const resultPokemon = quizState.matchedPokemon;

  if (resultPokemon) {
    return <QuizResult matchedPokemon={resultPokemon}></QuizResult>;
  }
  return (
    <ErrorMessage message="First, take the quiz to see the result"></ErrorMessage>
  );
}
