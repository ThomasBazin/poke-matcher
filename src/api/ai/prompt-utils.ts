import { PokemonFromApiType } from '@/api/pokemon/pokemons-api';
import { type MatchedPokemonType } from '@/types/matched-pokemon';

export function formatQuizForPrompt(
  quiz: { id: number; label: string; answers: string[] }[]
): string {
  return quiz
    .map((question) => {
      return `Question ${question.id} : ${question.label}\nAnswer: ${
        question.answers.length > 1
          ? question.answers.join(', ')
          : question.answers[0]
      }`;
    })
    .join('\n\n');
}

export function formatPokemonsForPrompt(
  pokemons: PokemonFromApiType[]
): string {
  return pokemons
    .map((pokemon) => {
      let stringifiedPokemon = '';
      for (const prop in pokemon) {
        const typedProp = prop as keyof PokemonFromApiType;
        let string = '';
        if (typeof pokemon[typedProp] === 'string') {
          string = `${prop}: ${pokemon[typedProp]}\n`;
        }
        if (Array.isArray(pokemon[typedProp])) {
          string = `${prop}: ${pokemon[typedProp].join(', ')}\n`;
        }
        stringifiedPokemon += string;
      }
      return stringifiedPokemon;
    })
    .join('\n\n');
}

export function generateAIPrompt({
  quiz,
  pokemonsInfos,
}: {
  quiz: string;
  pokemonsInfos: string;
}): string {
  return `
    You are a personality profiler and a Pokémon expert. First, analyze the user's personality based on the quiz below. It contains questions about the user's personality and their answers.\n
    Then, analyze the Pokémons list below and figure out which Pokemon best matches the user. Only use this list for reference and no other resource.\n
    Take into account the user's temperament, preferences, and lifestyle. Carefully analyze and compare them with each Pokémon's type and description.\n
    Your picked Pokémon should exist in the list below.\n
    Analyze all the Pokémons of the database below to make your decision.\n
    Include your justification in 1 sentence maximum: don't point to a particular question, stay generic.\n
    In your response, name should be identical to the name in the database.\n
    Return your response in a single JSON object format according to the schema below :\n

    {
    "name": "name of the pokemon",
    "justification": "short explanation of the match"
    }
    \n
    -----\n
    User's quiz:\n
    ${quiz}
    -----\n
    Pokémon database:\n
    ${pokemonsInfos}
    -----
    `;
}

export function parsePokemonFromAiResponse(
  aiResponse: string
): MatchedPokemonType | null {
  try {
    const match = aiResponse.match(/{[\s\S]*}/);
    if (!match) return null;

    const matchedPokemon = JSON.parse(match[0]);

    if (
      !matchedPokemon.name ||
      (!matchedPokemon.justification && !matchedPokemon.description)
    ) {
      return null;
    }

    return {
      name: matchedPokemon.name,
      image: `${process.env.NEXT_PUBLIC_POKEMON_IMAGE_BASE_URL}/${matchedPokemon.name}.jpg`,
      justification:
        matchedPokemon.justification ??
        matchedPokemon.description ??
        'This is the best match !',
    };
  } catch (error) {
    console.error(error);
    return null;
  }
}
