import React, { useState, useEffect } from 'react';
import { 
  Dice1, Dice2, Dice3, Dice4, Dice5, Dice6 
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useQuery } from 'react-query';

interface Props {
  onSelect: (pokemon: any) => void;
  side: 'left' | 'right';
}

const DiceIcons = [Dice1, Dice2, Dice3, Dice4, Dice5, Dice6];

export const PokemonSearch: React.FC<Props> = ({ onSelect, side }) => {
  const [search, setSearch] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const [isSpinning, setIsSpinning] = useState(false);
  const [currentDice, setCurrentDice] = useState(0);
  const [diceInterval, setDiceInterval] = useState<NodeJS.Timeout | null>(null);

  const { data: pokemonList } = useQuery('pokemon-list', async () => {
    const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=100000');
    return response.json();
  });

  const filteredPokemon = pokemonList?.results.filter((pokemon: any) =>
    pokemon.name.toLowerCase().includes(search.toLowerCase())
  ) || [];

  useEffect(() => {
    return () => {
      if (diceInterval) clearInterval(diceInterval);
    };
  }, [diceInterval]);

  const handleRandomSelect = async () => {
    setIsSpinning(true);
    
    // Start rapidly changing dice faces
    const interval = setInterval(() => {
      setCurrentDice(prev => (prev + 1) % 6);
    }, 100);
    setDiceInterval(interval);

    const randomId = Math.floor(Math.random() * 151) + 1;
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${randomId}`);
    const pokemon = await response.json();
    onSelect(pokemon);

    // Stop the dice animation after 600ms
    setTimeout(() => {
      clearInterval(interval);
      setDiceInterval(null);
      setIsSpinning(false);
      // Set a final random dice face
      setCurrentDice(Math.floor(Math.random() * 6));
    }, 600);
  };

  const CurrentDiceIcon = DiceIcons[currentDice];

  return (
    <div className="relative w-full max-w-xs">
      <div className="relative">
        <input
          type="text"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setShowDropdown(true);
          }}
          className="w-full px-4 py-2 rounded-lg border-2 border-yellow-400 focus:outline-none focus:border-yellow-500 pr-10"
          placeholder="Search Pokémon..."
        />
        <div className="absolute right-2 top-1/2 -translate-y-1/2">
          <motion.button
            onClick={handleRandomSelect}
            className="p-1 text-gray-500 hover:text-yellow-500 transition-colors rounded-full hover:bg-gray-100"
            whileTap={{ scale: 0.95 }}
            disabled={isSpinning}
          >
            <motion.div
              animate={isSpinning ? { rotate: 360 } : { rotate: 0 }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            >
              <CurrentDiceIcon className="w-5 h-5" />
            </motion.div>
          </motion.button>
        </div>
      </div>

      {showDropdown && search && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute z-10 w-full mt-1 bg-white rounded-lg shadow-lg max-h-60 overflow-auto"
        >
          {filteredPokemon.map((pokemon: any) => (
            <div
              key={pokemon.name}
              className="px-4 py-2 hover:bg-yellow-100 cursor-pointer capitalize"
              onClick={async () => {
                const response = await fetch(pokemon.url);
                const pokemonData = await response.json();
                onSelect(pokemonData);
                setSearch('');
                setShowDropdown(false);
              }}
            >
              {pokemon.name}
            </div>
          ))}
        </motion.div>
      )}
    </div>
  );
};
