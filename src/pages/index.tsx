import { GetServerSideProps } from "next";
import EvolutionTriggerTable from "./components/EvolutionTriggerTable";
import PokemonTableSection from "./components/PokemonTableSection";

type Pokemon = {
  name: string;
  url: string;
};

type HomeProps = {
  pokemons: Pokemon[];
  page: number;
  isFiltered: boolean;
  dataCount: number;
  error: string | null;
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
        error: null
      }
    };
  } catch (err: unknown) {
    let errorMessage: string = "Pokemon not found. Please try again.";

    if (err instanceof Error) {
      errorMessage = err.message;
    }

    return {
      props: {
        pokemons: [],
        page: 1,
        isFiltered: false,
        error: errorMessage,
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

  return (
    <div className="min-h-screen bg-gray-50 p-2">
      <div className="max-w-4xl mx-auto">
        <PokemonTableSection
          pokemons={pokemons}
          page={page}
          isFiltered={isFiltered}
          dataCount={dataCount}
          error={error}
        />
        <EvolutionTriggerTable />
      </div>
    </div>
  );
}
