import Link from "next/link"

const PokemonTable = ({pokemons, currentPage}: {pokemons: any[], currentPage: number}) => {
  return (
    <div>
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
    </div>
  )
}

export default PokemonTable