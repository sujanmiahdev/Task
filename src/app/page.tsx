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


export default function Page() {
  // Filter States
  const [search, setSearch] = useState("");
  const [office, setOffice] = useState("");
  const [weekendDayFilter, setWeekendDayFilter] = useState("");
  const [showFilter, setShowFilter] = useState(true);

  // Main Weekend State (Single Source of Truth)
  const [weekends, setWeekends] = useState<Weekend[]>(allWeekends);

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingOfficeId, setEditingOfficeId] = useState<number | null>(null);

  // Clear Filters
  const clearFilters = () => {
    setSearch("");
    setOffice("");
    setWeekendDayFilter("");
  };

  // Delete Weekend
  const handleDelete = (id: number) => {
    setWeekends((prev) => prev.filter((w) => w.id !== id));
  };

  // Open Modal for Edit
  const openModalForOffice = (officeId: number) => {
    setEditingOfficeId(officeId);
    setIsModalOpen(true);
  };

  // Open Modal for Add (will update selected branch only)
  const openModalForAdd = () => {
    setEditingOfficeId(null);
    setIsModalOpen(true);
  };

  // Save from Modal (ONLY UPDATE — No New Branch Creation)
  const handleSave = (officeId: number, selectedDays: string[]) => {
    setWeekends((prev) =>
      prev.map((w) =>
        w.officeId === officeId
          ? { ...w, weekendDays: selectedDays }
          : w
      )
    );

    setIsModalOpen(false);
    setEditingOfficeId(null);
  };


  const [selectedWeekend, setSelectedWeekend] = useState<Weekend | null>(null);
const [isEditOpen, setIsEditOpen] = useState(false);

const handleEdit = (data: Weekend) => {
  setSelectedWeekend(data);
  setIsEditOpen(true);
};

const handleUpdate = (updatedData: Weekend) => {
  setWeekends((prev) =>
    prev.map((item) =>
      item.id === updatedData.id ? updatedData : item
    )
  );
};

  // Filtering Logic
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
      <AddWeekend
        toggleFilter={() => setShowFilter(!showFilter)}
        onAddClick={openModalForAdd}
      />

      {/* FilterBar */}
      <div
        className={`transition-all duration-300 ease-in-out overflow-hidden ${
          showFilter
            ? "max-h-96 opacity-100 translate-y-0"
            : "max-h-0 opacity-0 -translate-y-2"
        }`}
      >
        <FilterBar
          search={search}
          setSearch={setSearch}
          office={office}
          setOffice={setOffice}
          weekendDayFilter={weekendDayFilter}
          setWeekendDayFilter={setWeekendDayFilter}
          clearFilters={clearFilters}
        />
      </div>

      {/* Weekend Cards */}
      <div className="grid md:grid-cols-3 gap-6 mt-6 px-8">
        {filteredWeekends.map((item) => (
          <WeekendCard
            key={item.id}
            data={item}
            onDelete={handleDelete}
            // onEdit={() => openModalForOffice(item.officeId)}
             onEdit={handleEdit}
          />
        ))}
      </div>

      {/* Modal */}
      <WeekendModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSave}
        officeId={editingOfficeId}
        weekends={weekends}
      />
<EditWeekendModal
  isOpen={isEditOpen}
  onClose={() => setIsEditOpen(false)}
  onUpdate={handleUpdate}
  data={selectedWeekend}
/>
    </div>
  );
}