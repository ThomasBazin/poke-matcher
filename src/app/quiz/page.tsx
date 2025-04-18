'use client';

import QuizForm from '@/components/quiz-form';
import QuizResult from '@/components/quiz-result';
import ErrorMessage from '@/components/error-message';
import Loader from '@/components/loader';

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

type AnswerType = Record<number, string[]>;

export default function QuizPage() {
  const [error, setError] = useState<string | null>(null);
  const [globalAnswers, setGlobalAnswers] = useState<AnswerType | null>(null);
  const [loading, setLoading] = useState(false);

  const [matchedPokemon, setMatchedPokemon] = useState<
    MatchedPokemonType | undefined
  >(undefined);

  const questionsData = questions;

  const submitForm = async (answers: AnswerType) => {
    try {
      setLoading(true);
      setGlobalAnswers(answers);
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

  return !globalAnswers ? (
    <QuizForm questions={questionsData} onSubmit={submitForm}></QuizForm>
  ) : (
    matchedPokemon && <QuizResult matchedPokemon={matchedPokemon}></QuizResult>
  );
}
