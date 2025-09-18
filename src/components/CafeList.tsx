import React from 'react';
import type { Cafe } from '../types';

interface CafeListProps {
  cafes: Cafe[];
  onContactClick: () => void;
}

const CafeList: React.FC<CafeListProps> = ({ cafes, onContactClick }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg border border-slate-200">
      <h2 className="text-2xl font-bold mb-4 text-indigo-700">Registered Cyber Cafes</h2>
      <div className="h-80 overflow-y-auto pr-2">
        <ul className="space-y-3">
          {cafes.map((cafe) => (
            <li
              key={cafe.id}
              className="flex justify-between items-center bg-slate-50 p-4 rounded-md border-l-4 border-indigo-500 transition-all duration-200 hover:shadow-md hover:bg-indigo-50"
            >
              <span className="font-medium text-slate-700">{cafe.name}</span>
              <button
                onClick={onContactClick}
                className="px-4 py-2 bg-indigo-600 text-white text-sm font-semibold rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-transform duration-150 hover:scale-105"
              >
                Contact
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CafeList;