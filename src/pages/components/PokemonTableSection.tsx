import React, { useState } from 'react';
import { useRouter } from 'next/router';
import SearchBox from './SearchBox';
import PokemonTable from './PokemonTable';
import PokemonModal from './PokemonModal';

type Props = {
  pokemons: any[];
  page: number;
  isFiltered: boolean;
  dataCount: number;
  error: string | null;
};

const PokemonTableSection = ({ pokemons, page, isFiltered, dataCount, error }: Props) => {
    const router = useRouter();
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedPokemon, setSelectedPokemon] = useState<any>(null);

    const handlePageChange = (newPage: number) => {
        router.push(`/?page=${newPage}`);
    };

    const handleRowClick = async (name: string) => {
        if (selectedPokemon?.name === name) {
            setModalOpen(true);
            return;
        }
        try {
            const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
            const data = await res.json();
            setSelectedPokemon(data);
            setModalOpen(true);
        } catch (err) {
            console.error('Failed to fetch Pokémon details:', err);
        }
    };

    return (
    <>
        <h1 className="text-3xl font-bold text-center text-blue-700 mb-4">Pokémon Table</h1>
        <div className="border border-gray-300 rounded-md p-2">
            <SearchBox />
            <PokemonTable
                data={pokemons}
                pageCount={Math.ceil(dataCount / 20)}
                currentPage={page}
                onPageChange={handlePageChange}
                isFiltered={isFiltered}
                onRowClick={handleRowClick}
            />
            {error && <p className="text-red-500 mt-2">{error}</p>}
            {/* Modal */}
            {selectedPokemon && (
                <PokemonModal
                    isOpen={modalOpen}
                    onClose={() => setModalOpen(false)}
                    pokemon={selectedPokemon}
                />
            )}
        </div>
    </>
  );
};

export default PokemonTableSection;
