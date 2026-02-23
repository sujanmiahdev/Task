"use client";

import { X, Search } from "lucide-react";
import { useFilterStore } from "@/app/store/useFilterStore";

export default function FilterBar() {
  const {
    search,
    setSearch,
    office,
    setOffice,
    weekendDayFilter,
    setWeekendDayFilter,
    clearFilters,
  } = useFilterStore();

  return (
    <div className="grid md:grid-cols-4 bg-gray-900 rounded-2xl mx-8 my-2 p-5 gap-4">
      
      {/* Search */}
      <div className="flex flex-col relative">
        <label className="text-gray-400 text-xl mb-1">Search</label>
        <div className="relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-white">
            <Search size={16} />
          </span>
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search Weekend Days, Branch Name..."
            className="bg-[#18263c] pl-10 p-3 placeholder-white rounded-lg text-sm text-white outline-none w-full"
          />
        </div>
      </div>

      {/* Office */}
      <div className="flex flex-col">
        <label className="text-gray-400 text-xl mb-1">Office</label>
        <select
          value={office}
          onChange={(e) => setOffice(e.target.value)}
          className="bg-[#18263c] text-white p-3 rounded-lg text-sm"
        >
          <option value="">Filter by Office</option>
          <option value="Uttara Branch">Uttara Branch</option>
          <option value="Motijheel Branch">Motijheel Branch</option>
          <option value="Karwan Bazar Branch">Karwan Bazar Branch</option>
        </select>
      </div>

      {/* Weekend Days */}
      <div className="flex flex-col">
        <label className="text-gray-400 text-xl mb-1">Weekend Days</label>
        <select
          value={weekendDayFilter}
          onChange={(e) => setWeekendDayFilter(e.target.value)}
          className="bg-[#18263c] text-white p-3 rounded-lg text-sm"
        >
          <option value="">Filter by Days</option>
          <option value="Saturday">Saturday</option>
          <option value="Sunday">Sunday</option>
          <option value="Monday">Monday</option>
          <option value="Tuesday">Tuesday</option>
          <option value="Wednesday">Wednesday</option>
          <option value="Thursday">Thursday</option>
          <option value="Friday">Friday</option>
        </select>
      </div>

      {/* Clear Button */}
      <div className="flex items-end pb-2">
        <button
          onClick={clearFilters}
          className="bg-gray-700 text-white p-2 hover:bg-gray-600 rounded-lg text-sm flex items-center gap-2 px-4"
        >
          <X size={16} />
          Clear Filters
        </button>
      </div>

    </div>
  );
}