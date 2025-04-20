import { type PokemonFromApiType } from '../pokemon/pokemons-api';
import { type MatchedPokemonType } from '@/types/matched-pokemon';
import { type QuizType } from '@/types/quiz';
import { AIProviderInterface } from './providers/ai-provider';

import {
  formatPokemonsForPrompt,
  formatQuizForPrompt,
  generateAIPrompt,
  parsePokemonFromAiResponse,
} from './prompt-utils';

export async function getMatchedPokemonFromAI({
  provider,
  quiz,
  pokemons,
}: {
  provider: AIProviderInterface;
  quiz: QuizType;
  pokemons: PokemonFromApiType[];
}): Promise<MatchedPokemonType> {
  try {
    const stringifiedQuiz = formatQuizForPrompt(quiz);

    const stringifiedPokemons = formatPokemonsForPrompt(pokemons);

    const prompt = generateAIPrompt({
      quiz: stringifiedQuiz,
      pokemonsInfos: stringifiedPokemons,
    });

    const aiResponse = await provider.POST(prompt);

    const parsedPokemon = parsePokemonFromAiResponse(aiResponse);
    if (!parsedPokemon) {
      // If parsedPokemon is null, it means AI didn't include proper JSON in its response. MAYBE TO BE IMPROVED?: ask AI again to include correct JSON once, and throw if second answer is still not valid ?
      throw new Error('Error while parsing AI response');
    }
    return parsedPokemon;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
