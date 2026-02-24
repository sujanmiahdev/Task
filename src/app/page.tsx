"use client";

import Navbar from "./components/Navbar";
import FilterBar from "./components/FilterBar";
import WeekendCard from "./components/WeekendCard";
import WeekendModal from "./components/WeekendModal";
import AddWeekend from "./components/AddWeekends";
import EditWeekendModal from "./components/EditWeekendModal";

import { useUIStore } from "@/app/store/uiStore";
import { useFilterStore } from "@/app/store/useFilterStore";

import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Weekend } from "./types/Weekend";



export default function Page() {

  const { isFilterOpen, openEditModal } = useUIStore();
  const { search, office, weekendDayFilter } = useFilterStore();

  const queryClient = useQueryClient();

  /*  Fetch Weekends */
  const { data: weekends = [], isLoading } = useQuery({
    queryKey: ["weekends"],
    queryFn: async () => {
      const res = await fetch("http://localhost:5000/weekends");
      return res.json();
    },
  });

  /* ✅ Delete */
  const handleDelete = async (id: number) => {

    await fetch(`http://localhost:5000/weekends/${id}`, {
      method: "DELETE",
    });

    queryClient.invalidateQueries({ queryKey: ["weekends"] });
  };

  /* ✅ Add Weekend */
  const handleSave = async (officeId: number, selectedDays: string[]) => {

    await fetch("http://localhost:5000/weekends", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        officeId,
        branch: "New Branch",
        weekendDays: selectedDays,
        start: "09:00",
        end: "17:00",
        createdAt: new Date().toLocaleDateString(),
        status: "active",
      }),
    });

    queryClient.invalidateQueries({ queryKey: ["weekends"] });
  };

  /* ✅ Update Weekend */

  /* ✅ Filter Logic */
  const filteredWeekends = (weekends || []).filter((w: Weekend) =>
    ((w.branch || "").toLowerCase().includes(search.toLowerCase()) ||
      (w.weekendDays || []).some((day) =>
        day.toLowerCase().includes(search.toLowerCase())
      )) &&
    (office ? w.branch === office : true) &&
    (weekendDayFilter
      ? w.weekendDays?.includes(weekendDayFilter)
      : true)
  );

  

  return (
    <div className="bg-black min-h-screen">

      <Navbar />

      <AddWeekend />

      {/* Filter */}
      <div
        className={`transition-all duration-300 overflow-hidden ${
          isFilterOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <FilterBar />
      </div>

      {/* Cards */}
      <div className="grid md:grid-cols-3 gap-6 mt-6 px-8">

        {isLoading ? (
          <p className="text-white">Loading...</p>
        ) : (
          filteredWeekends.map((item: Weekend) => (
            <WeekendCard
              key={item.id}
              data={item}
              onDelete={handleDelete}
              onEdit={() => openEditModal(item)}
            />
          ))
        )}

      </div>

      <WeekendModal onSave={handleSave} weekends={weekends} />

      <EditWeekendModal/>

    </div>
  );
}