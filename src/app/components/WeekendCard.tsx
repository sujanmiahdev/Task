"use client";

import { useState } from "react";
import { Weekend } from "../types/Weekend";
import {
  Pencil,
  Trash2,
  Calendar,
  Clock,
  Building2,
  MapPin,
} from "lucide-react";
import { useUIStore } from "@/app/store/uiStore";

interface Props {
  data: Weekend;
  onDelete: (id: number) => void;
}

const formatDisplayTime = (time: string) => {
  if (!time) return "";

  const [h, m] = time.split(":");
  let hour = Number(h);

  const ampm = hour >= 12 ? "PM" : "AM";
  hour = hour % 12 || 12;

  return `${hour.toString().padStart(2, "0")}:${m} ${ampm}`;
};

export default function WeekendCard({ data, onDelete }: Props) {
  const [isDeleting, setIsDeleting] = useState(false);

  // ✅ Zustand থেকে modal open function নিচ্ছি
  const openEditModal = useUIStore((state) => state.openEditModal);

  // Delete with animation
  const handleDeleteClick = () => {
    setIsDeleting(true);
    setTimeout(() => {
      onDelete(data.id);
    }, 300);
  };

  // ✅ Edit now uses Zustand
  const handleEditClick = () => {
    openEditModal(data);
  };

  return (
    <div
      className={`relative bg-[#11213a] border border-blue-500/20 rounded-2xl p-6 shadow-md hover:shadow-blue-500 transition-all duration-300 ${
        isDeleting ? "opacity-0 scale-95" : "opacity-100 scale-100"
      }`}
    >
      {/* Left Blue Border */}
      <div className="absolute left-0 top-0 h-full w-1 bg-blue-500 rounded-l-2xl" />

      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-semibold text-white flex items-center gap-2">
            <Building2 size={18} className="text-blue-400" />
            {data.branch}
          </h3>
          <p className="text-sm text-gray-400 mt-1 flex items-center gap-1">
            <MapPin size={14} />
            Office ID: {data.officeId}
          </p>
        </div>

        <div className="flex gap-2">
          {/* Edit button */}
          <button
            className="p-2 rounded-lg bg-gray-700 hover:bg-gray-600"
            onClick={handleEditClick}
          >
            <Pencil size={16} />
          </button>

          {/* Delete button */}
          <button
            className="p-2 rounded-lg bg-red-600/20 hover:bg-red-600/40 text-red-500"
            onClick={handleDeleteClick}
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>

      {/* Weekend Days */}
      <div className="mb-4">
        <div className="flex items-center gap-2 text-gray-300 mb-2">
          <Calendar size={16} className="text-red-400" />
          <span className="font-medium">Weekend Days:</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {data.weekendDays.map((day, i) => (
            <span
              key={i}
              className="px-3 py-1 text-xs bg-red-600/20 text-red-400 rounded-full"
            >
              {day}
            </span>
          ))}
        </div>
      </div>

      {/* Office Hours */}
      <div className="mb-4">
        <div className="flex items-center gap-2 text-gray-300 mb-2">
          <Clock size={16} className="text-purple-400" />
          <span className="font-medium">Office Hours:</span>
        </div>

        <div className="flex justify-between text-sm text-gray-400">
          <div>
            <p>Start:</p>
            <p className="text-white">
              {formatDisplayTime(data.start)}
            </p>
          </div>
          <div>
            <p>End:</p>
            <p className="text-white">
              {formatDisplayTime(data.end)}
            </p>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-700 pt-3 text-xs text-gray-500">
        Created: {data.createdAt}
      </div>
    </div>
  );
}