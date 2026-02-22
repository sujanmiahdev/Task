"use client";

import { useState, useEffect, useRef } from "react";
import { Weekend } from "../types/Weekend";



interface WeekendModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (officeId: number, weekendDays: string[]) => void;
  officeId?: number | null;
  weekends: Weekend[];
}

export default function WeekendModal({
  isOpen,
  onClose,
  onSave,
  officeId,
  weekends,
}: WeekendModalProps) {
  const [selectedOffice, setSelectedOffice] = useState<number | "">("");
  const [selectedDays, setSelectedDays] = useState<Record<string, boolean>>({});
  const modalRef = useRef<HTMLDivElement>(null);

  // 🔥 Load office data when editing
  useEffect(() => {
    if (!isOpen) return;

    if (officeId) {
      setSelectedOffice(officeId);

      const officeData = weekends.find(
        (w) => w.officeId === officeId
      );

      if (officeData) {
        const daysObj: Record<string, boolean> = {};
        officeData.weekendDays.forEach((day) => {
          daysObj[day] = true;
        });
        setSelectedDays(daysObj);
      }
    } else {
      setSelectedOffice("");
      setSelectedDays({});
    }
  }, [officeId, isOpen, weekends]);


  //  ESC key close
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    if (isOpen) {
      window.addEventListener("keydown", handleEsc);
      document.body.style.overflow = "hidden"; // Scroll lock
    }

    return () => {
      window.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "auto";
    };
  }, [isOpen, onClose]);

  //  Outside click close
  const handleOutsideClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      onClose();
    }
  };

  const toggleDay = (day: string) => {
    setSelectedDays((prev) => ({
      ...prev,
      [day]: !prev[day],
    }));
  };

  const handleReset = () => {
    setSelectedOffice("");
    setSelectedDays({});
  };

  const handleSaveClick = () => {
    if (!selectedOffice) return;

    const daysSelected = Object.keys(selectedDays).filter(
      (d) => selectedDays[d]
    );

    onSave(Number(selectedOffice), daysSelected);
    onClose();
  };

  if (!isOpen) return null;

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
      onClick={handleOutsideClick}
    >
      <div
        ref={modalRef}
        className="w-150 rounded-2xl bg-[#1f2a37] p-8 shadow-2xl text-white relative transition-all duration-300 scale-100"
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold">
            {officeId ? "Edit Weekend" : "Add Weekend"}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white text-xl"
          >
            ✕
          </button>
        </div>

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
            disabled={!!officeId}
            className="w-full rounded-lg bg-[#2b3746] p-3 text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select Office Here...</option>
            {weekends.map((item) => (
              <option key={item.id} value={item.officeId}>
                {item.branch}
              </option>
            ))}
          </select>
        </div>

        {/* Days Toggle Grid */}
        <div className="grid grid-cols-3 gap-6 mb-8">
          {days.map((day) => (
            <div key={day} className="flex items-center justify-between">
              <span className="text-lg">{day}</span>
              <button
                onClick={() => toggleDay(day)}
                className={`relative w-12 h-6 rounded-full transition ${
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
            className="w-[48%] bg-blue-600 hover:bg-blue-700 py-3 rounded-xl text-lg font-medium transition"
          >
            Save
          </button>

          <button
            onClick={handleReset}
            className="w-[48%] border border-gray-500 py-3 rounded-xl text-lg font-medium hover:bg-gray-700 transition"
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
}