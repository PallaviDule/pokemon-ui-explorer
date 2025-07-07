type Props = {
  isOpen: boolean;
  onClose: () => void;
  pokemon: any;
};

export default function PokemonModal({ isOpen, onClose, pokemon }: Props) {
  if (!isOpen || !pokemon) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-600 hover:text-black text-xl"
        >
          &times;
        </button>

        <h2 className="text-2xl font-semibold mb-4 text-center capitalize">
          {pokemon.name}
        </h2>

        <div className="flex justify-center mb-4">
          <img
            src={pokemon.sprites?.front_default}
            alt={pokemon.name}
            className="h-36 w-36"
          />
        </div>

        <p><strong>Height:</strong> {pokemon.height}</p>
        <p><strong>Weight:</strong> {pokemon.weight}</p>
        <p className="mt-2"><strong>Types:</strong> {pokemon.types.map((t: any) => t.type.name).join(', ')}</p>
        <p>
          <strong>Abilities:</strong>{' '}
          {pokemon.abilities.map((a: any) => a.ability.name).join(', ')}
        </p>
      </div>
    </div>
  );
}
