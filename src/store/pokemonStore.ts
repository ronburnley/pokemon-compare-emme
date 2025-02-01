import { create } from 'zustand';
import { Pokemon } from '../types/pokemon';

interface PokemonStore {
  leftPokemon: Pokemon | null;
  rightPokemon: Pokemon | null;
  setLeftPokemon: (pokemon: Pokemon | null) => void;
  setRightPokemon: (pokemon: Pokemon | null) => void;
}

export const usePokemonStore = create<PokemonStore>((set) => ({
  leftPokemon: null,
  rightPokemon: null,
  setLeftPokemon: (pokemon) => set({ leftPokemon: pokemon }),
  setRightPokemon: (pokemon) => set({ rightPokemon: pokemon }),
}));