import React from 'react';
import { motion } from 'framer-motion';

interface Props {
  statName: string;
  value: number;
  maxValue?: number;
  color: string;
}

export const StatBar: React.FC<Props> = ({ statName, value, maxValue = 255, color }) => {
  const percentage = (value / maxValue) * 100;

  return (
    <div className="w-full">
      <div className="flex justify-between mb-1">
        <span className="text-sm capitalize">{statName}</span>
        <span className="text-sm font-semibold">{value}</span>
      </div>
      <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.5 }}
          className={`h-full rounded-full ${color}`}
        />
      </div>
    </div>
  );
};