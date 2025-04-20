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
    You are a personality profiler and a Pokémon expert. First, analyze the user's personality based on the quiz below. It contains questions about the user's personality and their answers.
    Then, analyze the Pokémons list below and figure out which Pokemon best matches the user. Only use this list for reference and no other resource.
    Take into account the user's temperament, preferences, and lifestyle. Carefully analyze and compare them with each Pokémon's type and description.
    Your picked Pokémon should exist in the list below.
    Analyze all the Pokémons of the database below to make your decision.
    Justify your choice with 1 sentence maximum: why this Pokémon matches the overall personality. 
    In your response, name and types should be identical to what is in the database. Image should be the full url as in the database.
    Return your answer in a single JSON object format according to the schema below (properties name, types, image and justification):

    {
    "name": "name of the pokemon",
    "types: ["type 1", 'type 2"...],
    "image": "url of the pokemon image as in database",
    "justification": "short explanation of the match"
    }

    -----
    User's quiz:
    ${quiz}
    -----
    Pokémon database:
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
      !matchedPokemon.types ||
      !matchedPokemon.image ||
      !matchedPokemon.justification
    ) {
      return null;
    }

    return {
      ...matchedPokemon,
      image: `${process.env.NEXT_PUBLIC_POKEMON_IMAGE_BASE_URL}/${matchedPokemon.name}.jpg`,
    };
  } catch (error) {
    console.error(error);
    return null;
  }
}
