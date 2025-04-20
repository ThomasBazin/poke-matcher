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
    New question : you are a Pokémon expert AI. Based on the user's personality test answers, identify the single most fitting Pokémon from the database below.
    Take into account the user's temperament, preferences, and lifestyle. Carefully analyze and compare them with each Pokémon's type and description.
    Your picked Pokémon should exist in the database below.

    User's Answers:
    ${quiz}

    Pokémon database:
    ${pokemonsInfos}

    Which Pokémon best matches this user ? Your choice should be one the Pokémons in the list.
    Justify your choice with 1 sentence maximum: why this Pokémon matches the overall personality. 
    In your response, name and types should be identical to what is in the database. Image should be the full url as in the database.
    Return your answer one JSON object format according to the schema below (properties name, types, image and justification):

    {
    "name": "name of the pokemon",
    "types: ["type 1", 'type 2"...],
    "image": "url of the pokemon image as in database",
    "justification": "short explanation of the match"
    }

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
