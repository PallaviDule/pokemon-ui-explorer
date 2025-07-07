import { GetServerSideProps } from "next";
import PokemonTable from "./components/PokemonTable";

export const getServerSideProps: GetServerSideProps = async(context) => {
  const name = (context.query.name as string) || null;

  try {
    if(name) {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name.toLowerCase()}`);
      
      if (!response.ok) throw new Error('Not found');
      
      const data = await response.json();
      
      return {
        props: {
          pokemons: [data],
          page: 1,
          isFiltered: true,
          error: null,
        }
      }
    }

    const page = Number(context.query.page) || 1;
    const limit = 20;
    const offset = (page-1)* limit;
    
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`);
    const data = await response.json();

    return {
      props: {
        pokemons: data.results || [],
        page,
        isFiltered: false,
        error: null
      }
    }
  } catch (error){
    return {
      props: {
        pokemons: [],
        page: 1,
        isFiltered: false,
        error: 'Pokemon not found. Please try again.'
      }
    }
  }
}


export default function Home({pokemons, page, isFiltered, error}: {pokemons: any[], page: number, isFiltered: boolean, error: string | null}) {
  console.log('Pokemons:', pokemons);
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Pokémon List (Page {page})</h1>
      <PokemonTable pokemons={pokemons} currentPage={page} isFiltered={isFiltered}/>
      {error && <p className="text-red-500 mt-2">{error}</p>}
    </div>
  );
}
