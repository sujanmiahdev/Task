"use client";

import { X} from "lucide-react";
import { useFilterStore } from "@/app/store/useFilterStore";
import { useEffect, useState } from "react";

/* ✅ Type Outside Component */
interface Weekend {
  id: number;
  branch: string;
  weekendDays: string[];
}

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

  const [weekends, setWeekends] = useState<Weekend[]>([]);

  /* ✅ Fetch Data */
  useEffect(() => {
    fetch("http://localhost:5000/weekends")
      .then(res => res.json())
      .then(data => setWeekends(data));
  }, []);

  /* ✅ Unique Branch List */
  const uniqueBranches = [
    ...new Set(weekends.map((item) => item.branch)),
  ];

  /* ✅ Unique Days */
  const uniqueDays = [
    ...new Set(
      weekends.flatMap((item) => item.weekendDays)
    ),
  ];

  return (
    <div className="grid md:grid-cols-4 bg-gray-900 rounded-2xl mx-8 my-2 p-5 gap-4">

      {/* Search */}
      <div className="flex flex-col relative">
        <label className="text-gray-400 text-xl mb-1">Search</label>

        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search Weekend Days, Branch Name..."
          className="bg-[#18263c] pl-3 p-3 rounded-lg text-sm text-white w-full"
        />
      </div>

      {/* Office Dropdown */}
      <div className="flex flex-col">
        <label className="text-gray-400 text-xl mb-1">Office</label>

        <select
          value={office}
          onChange={(e) => setOffice(e.target.value)}
          className="bg-[#18263c] text-white p-3 rounded-lg text-sm"
        >
          <option value="">Filter by Office</option>

          {uniqueBranches.map((branch) => (
            <option key={branch} value={branch}>
              {branch}
            </option>
          ))}

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

          {uniqueDays.map((day) => (
            <option key={day} value={day}>
              {day}
            </option>
          ))}

        </select>
      </div>

      {/* Clear */}
      <div className="flex items-end pb-2">
        <button
          onClick={clearFilters}
          className="bg-gray-700 text-white p-2 rounded-lg text-sm flex items-center gap-2 px-4"
        >
          <X size={16} />
          Clear Filters
        </button>
      </div>

    </div>
  );
}