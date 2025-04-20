'use server';

import { getPokemons } from '@/api/pokemon/pokemons-api';
import { getMatchedPokemonFromAI } from '@/api/ai/ai-api';
import { ollamaProvider } from '@/api/ai/providers/ollama.provider';
import { type MatchedPokemonType } from '@/types/matched-pokemon';

import { type AnswersType } from '@/types/answers';
import { questions } from '@/data/questions';

export async function submitForm(
  answers: AnswersType
): Promise<MatchedPokemonType> {
  try {
    const pokemons = await getPokemons();

    if (!pokemons) {
      throw new Error('Error while fetching pokemons');
    }

    const quiz = questions.map((question, index) => {
      return {
        id: index + 1,
        label: question.label,
        answers: answers[index + 1],
      };
    });

    const matchedPokemon = await getMatchedPokemonFromAI({
      AIProvider: ollamaProvider,
      quiz,
      pokemons,
    });

    return matchedPokemon;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
