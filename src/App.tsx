import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { PokemonSearch } from './components/PokemonSearch';
import { PokemonCard } from './components/PokemonCard';
import { usePokemonStore } from './store/pokemonStore';
import { Swords } from 'lucide-react';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
      cacheTime: Infinity,
    },
  },
});

function App() {
  const { leftPokemon, rightPokemon, setLeftPokemon, setRightPokemon } = usePokemonStore();

  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen bg-gradient-to-br from-red-500 to-blue-500">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-white mb-2 flex items-center justify-center gap-2">
              <Swords className="w-8 h-8" />
              Emme's Pokémon Comparison
            </h1>
            <p className="text-white/80">Compare your favorite Pokémon side by side!</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <PokemonSearch onSelect={setLeftPokemon} side="left" />
              <PokemonCard pokemon={leftPokemon} side="left" />
            </div>

            <div className="space-y-4">
              <PokemonSearch onSelect={setRightPokemon} side="right" />
              <PokemonCard pokemon={rightPokemon} side="right" />
            </div>
          </div>
        </div>
      </div>
    </QueryClientProvider>
  );
}

export default App;