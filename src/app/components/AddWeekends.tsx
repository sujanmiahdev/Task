"use client";

import { Filter } from "lucide-react";

interface Props {
  toggleFilter: () => void;
  onAddClick: () => void;
}


export default function AddWeekend({ toggleFilter, onAddClick }: Props) {
  return (
    <div className="flex pt-5 justify-between items-center mb-3 px-8">
      <h1 className="text-2xl font-semibold text-white">Weekends</h1>

      <div className="flex items-center gap-4">
        <button
          onClick={toggleFilter}
          className="bg-gray-700 hover:bg-gray-600 text-white p-2 rounded-lg"
        >
          <Filter size={20} />
        </button>

        <button
          onClick={onAddClick}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-xl transition"
        >
          + Add Weekend
        </button>
      </div>
    </div>
  );
}
