import Link from "next/link"
import { useRouter } from "next/router";
import { useState } from "react";
import PokemonModal from "./PokemonModal";

const PokemonTable = ({pokemons, currentPage, isFiltered}: {pokemons: any[], currentPage: number, isFiltered: boolean   }) => {
    const [searchText, setSearchText] = useState(''); 
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedPokemon, setSelectedPokemon] = useState<any>(null);
    const router = useRouter();

    const handleSearchByName = (event: React.FormEvent) => {
        event.preventDefault();
        if (searchText.trim()) {
            router.push(`/?name=${searchText.trim().toLowerCase()}`);
        }
    };


  const handleRowClick = async (name: string) => {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
    const data = await res.json();
    setSelectedPokemon(data);
    setModalOpen(true);
  };

    return (
        <div>
            <form onSubmit={handleSearchByName}>
                <input 
                    type='text'
                    value={searchText}  
                    onChange={(event) => setSearchText(event.target.value)}
                    placeholder="Search Pokémon by name"
                    className="border p-2 rounded w-64"/>
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
                    Search
                </button>
            </form>
            <table className="w-full border-collapse border border-gray-300">
                <thead className="bg-gray-200">
                <tr>
                    <th className="border p-2 text-left">Name</th>
                </tr>
                </thead>
                <tbody>
                {pokemons.map((pokemon) => (
                    <tr 
                        key={pokemon.name} 
                        className="border hover:bg-gray-100"
                        onClick={() => handleRowClick(pokemon.name)}>
                        <td className="p-2 capitalize">{pokemon.name}</td>
                    </tr>
                ))}
                </tbody>
            </table>
            {!isFiltered && (
                <div className="mt-4 flex gap-2">
                {currentPage > 1 && (
                <Link href={`/?page=${currentPage - 1}`}>
                    <button className="px-4 py-2 bg-blue-500 text-white rounded">Previous</button>
                </Link>
                )}
                <Link href={`/?page=${currentPage + 1}`}>
                <button className="px-4 py-2 bg-blue-500 text-white rounded">Next</button>
                </Link>
                </div>
            )}
             <PokemonModal
                isOpen={modalOpen}
                onClose={() => setModalOpen(false)}
                pokemon={selectedPokemon}
            />
        </div>
  )
}

export default PokemonTable