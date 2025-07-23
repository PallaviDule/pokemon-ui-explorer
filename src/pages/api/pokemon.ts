export const fetchPokemonByName = async (name: string) => {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name.toLowerCase()}`);

    if (!response.ok) throw new Error('Pokemon not found');

    return await response.json();
}

export const fetchPokemons = async(limit: number, offset: number) =>{
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`);
    
    if (!response.ok) throw new Error('Failed to fetch pokemons');

    return await response.json();
}