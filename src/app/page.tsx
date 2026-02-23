"use client";

import { useState } from "react";
import Navbar from "./components/Navbar";
import FilterBar from "./components/FilterBar";
import WeekendCard from "./components/WeekendCard";
import WeekendModal from "./components/WeekendModal";
import AddWeekend from "./components/AddWeekends";
import allWeekends from "./data/weekends.json";
import { Weekend } from "./types/Weekend";
import EditWeekendModal from "./components/EditWeekendModal";
import { useUIStore } from "@/app/store/uiStore";
import { useFilterStore} from "@/app/store/useFilterStore"

export default function Page() {

const { isFilterOpen } = useUIStore();
const { search, office, weekendDayFilter } = useFilterStore();

  /* Weekend Data */
  const [weekends, setWeekends] = useState<Weekend[]>(allWeekends);

  /* Delete */
  const handleDelete = (id: number) => {
    setWeekends((prev) => prev.filter((w) => w.id !== id));
  };

  /* Save Weekend */
  const handleSave = (officeId: number, selectedDays: string[]) => {
    setWeekends((prev) =>
      prev.map((w) =>
        w.officeId === officeId
          ? { ...w, weekendDays: selectedDays }
          : w
      )
    );
  };

  /* Update Edit Modal Data */
  const handleUpdate = (updatedData: Weekend) => {
    setWeekends((prev) =>
      prev.map((item) =>
        item.id === updatedData.id ? updatedData : item
      )
    );
  };


  const filteredWeekends = weekends.filter(
    (w) =>
      (w.branch.toLowerCase().includes(search.toLowerCase()) ||
        w.weekendDays.some((day) =>
          day.toLowerCase().includes(search.toLowerCase())
        )) &&
      (office ? w.branch === office : true) &&
      (weekendDayFilter
        ? w.weekendDays.includes(weekendDayFilter)
        : true)
  );
  return (
    <div className="bg-black min-h-screen">

      <Navbar />

      {/* Header */}
      <AddWeekend />

      {/* Filter */}
      <div
        className={`transition-all duration-300 overflow-hidden ${
          isFilterOpen
            ? "max-h-96 opacity-100"
            : "max-h-0 opacity-0"
        }`}
      >
        <FilterBar />
      </div>

      {/* Cards */}
      <div className="grid md:grid-cols-3 gap-6 mt-6 px-8">
        {filteredWeekends.map((item) => (
          <WeekendCard
            key={item.id}
            data={item}
            onDelete={handleDelete}
           
          />
        ))}
      </div>

      {/* Modals */}
      <WeekendModal
        onSave={handleSave}
        weekends={weekends}
      />

      <EditWeekendModal
        onUpdate={handleUpdate}
      />

    </div>
  );
}