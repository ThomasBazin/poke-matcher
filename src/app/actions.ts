'use server';
import { getPokemons } from '@/api/pokemons-api';
import { getAIResponse } from '@/api/ai-api';
import { type AnswersType } from '@/types/answers';
import { questions } from '@/data/questions';
import {
  formatAnswersForPrompt,
  formatPokemonsForPrompt,
  generateAIPrompt,
  parsePokemonFromAiResponse,
} from '@/utils/prompt-utils';

export async function submitForm(answers: AnswersType) {
  try {
    const formattedAnswers = formatAnswersForPrompt({
      questions,
      answers,
    });

    const pokemons = await getPokemons();

    if (!pokemons) {
      throw new Error('An error occured, please try again later.');
    }

    const prompt = generateAIPrompt({
      userAnswers: formattedAnswers,
      pokemonsInfos: formatPokemonsForPrompt(pokemons),
    });

    const aiResponse = await getAIResponse(prompt);
    if (!aiResponse) {
      throw new Error('An error occured, please try again later.');
    }
    const parsedPokemon = parsePokemonFromAiResponse(aiResponse);
    if (!parsedPokemon) {
      throw new Error('An error occured, please try again later.');
    }
    return parsedPokemon;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
