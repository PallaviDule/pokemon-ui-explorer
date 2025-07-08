import { GetServerSideProps } from "next";
import PokemonModelNew from "./components/PokemonTable";
import { useRouter } from "next/router";
import SearchBox from "./components/SearchBox";

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
          dataCount: 0,
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
        dataCount: data.count || 0,
        error: null
      }
    }
  } catch (error){
    return {
      props: {
        pokemons: [],
        page: 1,
        isFiltered: false,
        error: 'Pokemon not found. Please try again.',
                dataCount: 0,
      }
    }
  }
}


export default function Home({pokemons, page, isFiltered, dataCount, error}: 
  {pokemons: any[], page: number, isFiltered: boolean, dataCount: number, error: string | null}) {
  console.log('Pokemons:', pokemons);
  const router = useRouter();

  const onPageChange = (pageNum: number) => {
    router.push(`/?page=${pageNum}`);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-5 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center text-blue-700 mb-8">Pokémon Directory</h1>
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
      </div>
    </div>
  );
}
