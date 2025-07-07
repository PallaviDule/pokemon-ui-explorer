import { GetServerSideProps } from "next";
import PokemonTable from "./components/PokemonTable";

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
      <PokemonTable pokemons={pokemons} currentPage={page} />
    </div>
  );
}
