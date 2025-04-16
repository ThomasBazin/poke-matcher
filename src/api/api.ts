import axios from 'axios';

export type PokemonType = {
  name: string;
  image: string;
  types: string[];
  description: string;
};

async function getAllPokemons(): Promise<{
  data: [] | null;
  error: string | null;
}> {
  try {
    const response = await axios.get(
      'https://pokeapi.co/api/v2/pokemon?limit=151'
    );
    return { data: response.data.results, error: null };
  } catch (error) {
    console.error(error);
    if (axios.isAxiosError(error)) {
      return { data: null, error: error.message };
    }
    return { data: null, error: 'An error occured while fetching pokemons' };
  }
}

async function getOnePokemon(name: string): Promise<{
  data: { types: { type: { name: string } }[] } | null;
  error: string | null;
}> {
  try {
    const response = await axios.get(
      `https://pokeapi.co/api/v2/pokemon/${name}`
    );
    return { data: response.data, error: null };
  } catch (error) {
    console.error(error);
    if (axios.isAxiosError(error)) {
      return { data: null, error: error.message };
    }
    return {
      data: null,
      error: 'An error occured while fetching pokemon details',
    };
  }
}

async function getPokemonDescription(
  name: string
): Promise<{ data: string | null; error: string | null }> {
  try {
    const response = await axios.get(
      `https://pokeapi.co/api/v2/pokemon-species/${name}`
    );
    const descriptionsArray = response.data.flavor_text_entries.filter(
      (element: {
        flavor_text: string;
        language: { name: string; url: string };
      }) => element.language.name === 'en'
    );

    const cleanedDescription = [
      ...new Set(
        descriptionsArray.map((description: { flavor_text: string }) => {
          return description.flavor_text.replace(/[\n\f]/g, ' ');
        })
      ),
    ].join(' ');

    return {
      data: cleanedDescription || 'No description for this pokemon.',
      error: null,
    };
  } catch (error) {
    console.error(error);
    if (axios.isAxiosError(error)) {
      return { data: null, error: error.message };
    }
    return { data: null, error: 'An error occured while fetching description' };
  }
}

export async function getPokemons(): Promise<PokemonType[] | null> {
  try {
    const pokemons = await getAllPokemons();

    if (pokemons.data) {
      const mappedPokemons = pokemons.data.map(
        async (pokemon: { name: string }) => {
          const pokemonDetails = await getOnePokemon(pokemon.name);
          const pokemonTypes = pokemonDetails.data?.types.map(
            (pokeType: { type: { name: string } }) => pokeType.type.name
          );
          const { data: pokemonDescription } = await getPokemonDescription(
            pokemon.name
          );
          return {
            name: pokemon.name,
            types: pokemonTypes ?? [],
            image: `https://img.pokemondb.net/artwork/${pokemon.name}.jpg`,
            description:
              pokemonDescription ?? 'No description for this pokemon.',
          };
        }
      );

      return Promise.all(mappedPokemons);
    }
    return null;
  } catch (error) {
    console.error(error);
    return null;
  }
}
