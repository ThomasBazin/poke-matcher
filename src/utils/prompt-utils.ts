import { QuestionType } from '@/data/questions';
import { PokemonFromApiType } from '@/api/pokemons-api';
import { type MatchedPokemonType } from '@/types/matched-pokemon';

export function formatAnswersForPrompt({
  questions,
  answers,
}: {
  questions: QuestionType[];
  answers: Record<number, string[]>;
}): string {
  const questionsPlusAnswers = questions.map((question, index) => {
    return `Question ${index + 1} : ${question.label}\nAnswer: ${answers[
      index
    ].join(', ')}`;
  });

  return questionsPlusAnswers.join('\n\n');
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
  userAnswers,
  pokemonsInfos,
}: {
  userAnswers: string;
  pokemonsInfos: string;
}): string {
  return `
    New question : you are a Pokémon expert AI. Based on the user's personality test answers, identify the single most fitting Pokémon from the database below.
    Take into account the user's temperament, preferences, and lifestyle. Carefully analyze and compare them with each Pokémon's type and description.
    Your picked Pokémon should exist in the database below.

    User's Answers:
    ${userAnswers}

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
): MatchedPokemonType | undefined {
  const match = aiResponse.match(/{[\s\S]*}/);
  if (!match) throw new Error('No JSON found in the AI response');
  try {
    const matchedPokemon = JSON.parse(match[0]);
    return matchedPokemon;
  } catch (error) {
    console.error(error);
  }
}
