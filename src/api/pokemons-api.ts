import axios from 'axios';

export type PokemonFromApiType = {
  name: string;
  image: string;
  types: string[];
  description: string;
};

async function getAllPokemons(): Promise<[]> {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_POKE_API_BASE_URL}/pokemon?limit=151`
    );
    return response.data.results;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function getOnePokemon(
  name: string
): Promise<{ types: { type: { name: string } }[] }> {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_POKE_API_BASE_URL}/pokemon/${name}`
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

// async function getPokemonDescriptionv1(name: string): Promise<string> {
//   try {
//     const response = await axios.get(
//       `https://pokeapi.co/api/v2/pokemon-species/${name}`
//     );
//     const descriptionsArray = response.data.flavor_text_entries.filter(
//       (element: {
//         flavor_text: string;
//         language: { name: string; url: string };
//       }) => element.language.name === 'en'
//     );

//     return [
//       ...new Set(
//         descriptionsArray.map((description: { flavor_text: string }) => {
//           return description.flavor_text.replace(/[\n\f]/g, ' ');
//         })
//       ),
//     ].join(' ');
//   } catch (error) {
//     console.error(error);
//     throw error;
//   }
// }

async function getPokemonDescription(name: string): Promise<string> {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_POKE_API_BASE_URL}/pokemon-species/${name}`
    );
    const description = response.data.flavor_text_entries.find(
      (element: {
        flavor_text: string;
        language: { name: string; url: string };
      }) => element.language.name === 'en'
    );

    return description.flavor_text.replace(/[\n\f]/g, ' ');
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function getPokemons(): Promise<PokemonFromApiType[] | null> {
  try {
    const rawPokemons = await getAllPokemons();

    const mappedPokemons = rawPokemons.map(
      async (pokemon: { name: string }) => {
        const pokemonDetails = await getOnePokemon(pokemon.name);
        const pokemonTypes = pokemonDetails.types.map(
          (pokeType: { type: { name: string } }) => pokeType.type.name
        );
        const pokemonDescription = await getPokemonDescription(pokemon.name);
        return {
          name: pokemon.name,
          types: pokemonTypes ?? [],
          image: `${process.env.NEXT_PUBLIC_POKEMON_IMAGE_BASE_URL}/${pokemon.name}.jpg`,
          description: pokemonDescription ?? 'No description for this pokémon.',
        };
      }
    );

    const mappedPokemonsToSend: PokemonFromApiType[] = [];

    for (const pokemon of mappedPokemons) {
      const pokemonAwaited = await pokemon;
      mappedPokemonsToSend.push(pokemonAwaited);
    }

    return mappedPokemonsToSend;
  } catch (error) {
    console.error(error);
    return null;
  }
}
