import Link from "next/link"
import { useRouter } from "next/router";
import { useState } from "react"

const PokemonTable = ({pokemons, currentPage, isFiltered}: {pokemons: any[], currentPage: number, isFiltered: boolean   }) => {
    const [searchText, setSearchText] = useState(''); 
    const router = useRouter();

    const handleSearchByName = (event: React.FormEvent) => {
        event.preventDefault();
        if (searchText.trim()) {
            router.push(`/?name=${searchText.trim().toLowerCase()}`);
        }
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
                    <tr key={pokemon.name} className="border hover:bg-gray-100">
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
        </div>
  )
}

export default PokemonTable