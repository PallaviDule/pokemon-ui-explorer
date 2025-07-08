import { X } from 'lucide-react';
type Props = {
  isOpen: boolean;
  onClose: () => void;
  pokemon: any;
};

export default function PokemonModal({ isOpen, onClose, pokemon }: Props) {
  if (!isOpen || !pokemon) return null;

  return (
<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-xs">
  <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md max-h-[80vh] relative overflow-y-auto">
    <button
      onClick={onClose}
      className="absolute top-2 right-2 text-gray-400 hover:text-black text-xl"
    >
      <X size={20} />
    </button>

    <h2 className="text-2xl font-bold mb-6 text-center capitalize">
      {pokemon.name}
    </h2>

    <div className="flex justify-center mb-3">
      <img
        src={pokemon.sprites?.front_default}
        alt={pokemon.name}
        className="h-36 w-36"
      />
    </div>  

    <dl className="grid grid-cols-2 gap-y-2 mt-4 mb-1">
      <dt className="font-semibold">Type</dt>
      <dd>{pokemon.types.map((t: any) => t.type.name).join(', ')}</dd>

      <dt className="font-semibold">Height</dt>
      <dd>{pokemon.height}</dd>

      <dt className="font-semibold">Weight</dt>
      <dd>{pokemon.weight}</dd>

      <dt className="font-semibold">Abilities</dt>
      <dd>{pokemon.abilities.map((a: any) => a.ability.name).join(', ')}</dd>
    </dl>
    <div>
      <h3 className="font-semibold">Moves</h3>
      <div className="flex space-x-3 overflow-x-auto max-w-full py-2 px-2 hide-scrollbar">
        {pokemon.moves.map((moveObj: any) => (
          <span
            key={moveObj.move.name}
            className="flex-shrink-0 bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-semibold capitalize whitespace-nowrap"
          >
            {moveObj.move.name.replace(/-/g, ' ')}
          </span>
        ))}
      </div>
    </div>
  </div>
</div>

  );
}
