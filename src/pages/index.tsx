import { GetServerSideProps } from "next";
import PokemonModelNew from "./components/PokemonTable";
import { useRouter } from "next/router";
import SearchBox from "./components/SearchBox";
import EvolutionTriggerTable from "./components/EvolutionTriggerTable";

type Pokemon = {
  name: string;
  url: string;
};

type EvolutionTrigger = {
  name: string;
  url: string;
};

type HomeProps = {
  pokemons: Pokemon[];
  page: number;
  isFiltered: boolean;
  dataCount: number;
  error?: string | null;
  evolutionTriggers: EvolutionTrigger[];
  evolutionCount: number;
  evolutionPage: number;
  evolutionLimit: number;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const name = (context.query.name as string) || null;
  const page = Number(context.query.page) || 1;
  const limit = 20;
  const offset = (page - 1) * limit;

  try {
    let pokemons = [];
    let dataCount = 0;
    let isFiltered = false;
    let error = null;

    // If searching by name
    if (name) {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name.toLowerCase()}`);
      if (!response.ok) throw new Error('Not found');
      const data = await response.json();
      pokemons = [data];
      isFiltered = true;
    } else {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`);
      const data = await response.json();
      pokemons = data.results || [];
      dataCount = data.count || 0;
    }

    return {
      props: {
        pokemons,
        page,
        isFiltered,
        dataCount,
        error
      }
    };
  } catch (err) {
    return {
      props: {
        pokemons: [],
        page: 1,
        isFiltered: false,
        error: 'Pokemon not found. Please try again.',
        dataCount: 0,
      }
    };
  }
};

export default function Home({ 
  pokemons,
  page,
  isFiltered,
  dataCount,
  error,}: 
  HomeProps) {
  console.log('Pokemons:', pokemons);
  const router = useRouter();

  const onPageChange = (newPage) => {
    router.push({
      pathname: '/',
      query: { ...router.query, page: newPage },
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 p-2">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center text-blue-700 mb-4">Pokémon Table</h1>
        <div className="border border-gray-300 rounded-md p-2">
          <SearchBox/>
          <PokemonModelNew 
            data={pokemons}  
            pageCount={Math.ceil(dataCount / 20)} 
            currentPage={page}  
            onPageChange={onPageChange} 
            isFiltered={isFiltered}
          />
          {error && <p className="text-red-500 mt-2">{error}</p>}
        </div>
        <EvolutionTriggerTable />
      </div>
    </div>
  );
}
