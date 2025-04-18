'use client';

import { useState } from 'react';

import { questions } from '@/data/questions';

import { type MatchedPokemonType } from '@/types/matched-pokemon';
import { type AnswersType } from '@/types/answers';

import QuizForm from '@/components/quiz-form';
import QuizResult from '@/components/quiz-result';
import ErrorMessage from '@/components/error-message';
import Loader from '@/components/loader';

import { getPokemons } from '@/api/pokemons-api';
import { getAIResponse } from '@/api/ai-api';

import {
  formatAnswersForPrompt,
  formatPokemonsForPrompt,
  generateAIPrompt,
  parsePokemonFromAiResponse,
} from '@/utils/prompt-utils';

export default function QuizPage() {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);

  const [matchedPokemon, setMatchedPokemon] = useState<
    MatchedPokemonType | undefined
  >(undefined);

  const questionsData = questions;

  const submitForm = async (answers: AnswersType) => {
    try {
      setLoading(true);
      setIsFormSubmitted(true);
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
      console.log('airesponse', parsedPokemon);
      setMatchedPokemon(parsedPokemon);
    } catch (error) {
      console.error(error);
      setError('An error occured, please try again later.');
    } finally {
      setLoading(false);
    }
  };

  if (error) return <ErrorMessage message={error}></ErrorMessage>;

  if (loading)
    return <Loader message="This might take a few minutes."></Loader>;

  return !isFormSubmitted ? (
    <QuizForm questions={questionsData} onSubmit={submitForm}></QuizForm>
  ) : (
    matchedPokemon && <QuizResult matchedPokemon={matchedPokemon}></QuizResult>
  );
}
