import { GetServerSideProps } from "next";

export const getServerSideProps: GetServerSideProps = async(context) => {
  const page = Number(context.query.page) || 1;
  const limit = 20;
  const offset = (page-1)* limit;
  
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`);
  const data = await response.json();

  return {
    props: {
      pokemons: data.results || [],
      page,
    }
  }
}


export default function Home({pokemons, page}: {pokemons: any[], page: number}) {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Pokémon List (Page {page})</h1>
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
    </div>
  );
}
