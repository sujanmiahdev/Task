"use client";

import { useState, useEffect, useRef } from "react";
import { Weekend } from "../types/Weekend";
import { useUIStore } from "@/app/store/uiStore";

export default function WeekendModal({
  onSave,
  weekends,
}: {
  onSave: (officeId: number, weekendDays: string[]) => void;
  weekends: Weekend[];
}) {

  const {
    isAddModalOpen,
    closeAddModal,
    selectedWeekend,
  } = useUIStore();

  const [selectedOffice, setSelectedOffice] = useState<number | "">("");
  const [selectedDays, setSelectedDays] = useState<Record<string, boolean>>({});

  const modalRef = useRef<HTMLDivElement>(null);

  /* Load Data when modal open */
  useEffect(() => {
    if (!isAddModalOpen && !selectedWeekend) return;

    if (selectedWeekend) {
      setSelectedOffice(selectedWeekend.officeId);

      const daysObj: Record<string, boolean> = {};

      selectedWeekend.weekendDays.forEach((day) => {
        daysObj[day] = true;
      });

      setSelectedDays(daysObj);
    } else {
      setSelectedOffice("");
      setSelectedDays({});
    }

  }, [isAddModalOpen, selectedWeekend]);

  /* ESC Close */
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeAddModal();
    };

    if (isAddModalOpen) {
      window.addEventListener("keydown", handleEsc);
      document.body.style.overflow = "hidden";
    }

    return () => {
      window.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "auto";
    };

  }, [isAddModalOpen, closeAddModal]);

  if (!isAddModalOpen) return null;

  const toggleDay = (day: string) => {
    setSelectedDays((prev) => ({
      ...prev,
      [day]: !prev[day],
    }));
  };

  const handleSaveClick = () => {
    if (!selectedOffice) return;

    const daysSelected = Object.keys(selectedDays).filter(
      (d) => selectedDays[d]
    );

    onSave(Number(selectedOffice), daysSelected);
    closeAddModal();
  };

  const days = [
    "Saturday",
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
  ];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
      onClick={(e) => {
        if (!modalRef.current?.contains(e.target as Node)) {
          closeAddModal();
        }
      }}
    >
      <div
        ref={modalRef}
        className="w-150 rounded-2xl bg-[#1f2a37] p-8 shadow-2xl text-white"
        onClick={(e) => e.stopPropagation()}
      >

        <h2 className="text-2xl font-semibold mb-6 text-center">
          {selectedWeekend ? "Edit Weekend" : "Add Weekend"}
        </h2>

        {/* Office Select */}
        <div className="mb-6">
          <label className="block mb-2 text-sm text-gray-300">
            Select Office
          </label>

          <select
            value={selectedOffice}
            onChange={(e) =>
              setSelectedOffice(Number(e.target.value))
            }
            disabled={!!selectedWeekend}
            className="w-full rounded-lg bg-[#2b3746] p-3 text-gray-300"
          >
            <option value="">Select Office</option>

            {weekends.map((item) => (
              <option key={item.id} value={item.officeId}>
                {item.branch}
              </option>
            ))}
          </select>
        </div>

        {/* Days */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          {days.map((day) => (
            <div key={day} className="flex justify-between items-center">
              <span>{day}</span>

              <button
                onClick={() => toggleDay(day)}
                className={`w-12 h-6 rounded-full relative transition ${
                  selectedDays[day] ? "bg-green-600" : "bg-gray-600"
                }`}
              >
                <span
                  className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition ${
                    selectedDays[day] ? "translate-x-6" : ""
                  }`}
                />
              </button>
            </div>
          ))}
        </div>

        {/* Buttons */}
        <div className="flex justify-between">
          <button
            onClick={handleSaveClick}
            className="w-[48%] bg-blue-600 py-3 rounded-xl"
          >
            Save
          </button>

          <button
            onClick={closeAddModal}
            className="w-[48%] bg-gray-600 py-3 rounded-xl"
          >
            Cancel
          </button>
        </div>

      </div>
    </div>
  );
}