import React from 'react';
import { motion } from 'framer-motion';
import { StatBar } from './StatBar';
import { Pokemon } from '../types/pokemon';

const typeColors: Record<string, string> = {
  normal: 'bg-gray-400',
  fire: 'bg-red-500',
  water: 'bg-blue-500',
  electric: 'bg-yellow-400',
  grass: 'bg-green-500',
  ice: 'bg-blue-300',
  fighting: 'bg-red-700',
  poison: 'bg-purple-500',
  ground: 'bg-yellow-600',
  flying: 'bg-indigo-400',
  psychic: 'bg-pink-500',
  bug: 'bg-green-600',
  rock: 'bg-yellow-800',
  ghost: 'bg-purple-700',
  dragon: 'bg-indigo-700',
  dark: 'bg-gray-800',
  steel: 'bg-gray-500',
  fairy: 'bg-pink-400',
};

interface Props {
  pokemon: Pokemon | null;
  side: 'left' | 'right';
}

export const PokemonCard: React.FC<Props> = ({ pokemon, side }) => {
  if (!pokemon) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-gray-100 rounded-lg p-8">
        <p className="text-gray-500">Select a Pokémon</p>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full bg-white rounded-lg shadow-lg p-6"
    >
      <div className="relative">
        <motion.img
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          src={pokemon.sprites.other['official-artwork'].front_default}
          alt={pokemon.name}
          className="w-full h-48 object-contain"
        />
      </div>

      <h2 className="text-2xl font-bold text-center capitalize mt-4 mb-2">
        {pokemon.name}
      </h2>

      <div className="flex gap-2 justify-center mb-4">
        {pokemon.types.map((type) => (
          <span
            key={type.type.name}
            className={`px-3 py-1 rounded-full text-white text-sm capitalize ${
              typeColors[type.type.name]
            }`}
          >
            {type.type.name}
          </span>
        ))}
      </div>

      <div className="space-y-3 mt-6">
        {pokemon.stats.map((stat) => (
          <StatBar
            key={stat.stat.name}
            statName={stat.stat.name}
            value={stat.base_stat}
            color={
              stat.base_stat > 100
                ? 'bg-green-500'
                : stat.base_stat > 50
                ? 'bg-yellow-500'
                : 'bg-red-500'
            }
          />
        ))}
      </div>

      <div className="mt-6 space-y-2">
        <p className="text-sm">
          <span className="font-semibold">Height:</span> {pokemon.height / 10}m
        </p>
        <p className="text-sm">
          <span className="font-semibold">Weight:</span> {pokemon.weight / 10}kg
        </p>
        <div>
          <p className="text-sm font-semibold mb-1">Abilities:</p>
          <div className="flex flex-wrap gap-2">
            {pokemon.abilities.map((ability) => (
              <span
                key={ability.ability.name}
                className="px-2 py-1 bg-gray-100 rounded-md text-sm capitalize"
              >
                {ability.ability.name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};