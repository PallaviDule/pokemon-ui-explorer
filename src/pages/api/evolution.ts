export const fetchEvolutionTrigger = async(pageSize: number, offset: number) => {
    const res = await fetch(`https://pokeapi.co/api/v2/evolution-trigger?limit=${pageSize}&offset=${offset}`);

    if (!res.ok) throw new Error("Failed to fetch evolution triggers");

    return await res.json();
}