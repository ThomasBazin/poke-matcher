'use client';

import QuizForm from '@/components/quiz-form';
import QuizResult from '@/components/quiz-result';
import { useState } from 'react';
import { questions } from '@/data/questions';
import {
  formatAnswersForPrompt,
  formatPokemonsForPrompt,
  generateAIPrompt,
  parsePokemonFromAiResponse,
} from '@/utils/prompt-utils';
import { getPokemons } from '@/api/pokemons-api';
import { getAIResponse } from '@/api/ai-api';
import { MatchedPokemonType } from '@/types/matched-pokemon';
import { useAnswers } from '@/context/answers-context';

export default function QuizPage() {
  const [error, setError] = useState<string | null>(null);
  const [isFormCompleted, setIsFormCompleted] = useState<boolean>(false);
  const [loading, setLoading] = useState(false);

  const [matchedPokemon, setMatchedPokemon] = useState<
    MatchedPokemonType | undefined
  >(undefined);

  const { answers } = useAnswers();

  const questionsData = questions;

  const submitForm = async () => {
    try {
      setLoading(true);
      setIsFormCompleted(true);
      const formattedAnswers = formatAnswersForPrompt({ questions, answers });

      const pokemons = await getPokemons();

      if (!pokemons) {
        return setError('An error occured, please try again later.');
      }

      const prompt = generateAIPrompt({
        userAnswers: formattedAnswers,
        pokemonsInfos: formatPokemonsForPrompt(pokemons),
      });

      const aiResponse = await getAIResponse(prompt);
      if (!aiResponse) {
        return setError('An error occured, please try again later.');
      }
      const parsedPokemon = parsePokemonFromAiResponse(aiResponse);
      setMatchedPokemon(parsedPokemon);
    } catch (error) {
      console.error(error);
      setError('An error occured, please try again later.');
    } finally {
      setLoading(false);
    }
  };

  if (error) return <p>Error</p>;

  if (loading)
    return (
      <>
        <p>Loading...</p>
        <p>This might take a few minutes</p>
      </>
    );

  return !isFormCompleted ? (
    <QuizForm questions={questionsData} onSubmit={submitForm}></QuizForm>
  ) : (
    matchedPokemon && <QuizResult matchedPokemon={matchedPokemon}></QuizResult>
  );
}
