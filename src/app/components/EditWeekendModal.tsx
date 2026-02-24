"use client";

import { useState, useEffect, useRef } from "react";
import { Weekend } from "../types/Weekend";
import { useUIStore } from "@/app/store/uiStore";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function EditWeekendModal() {
  const { isEditModalOpen, closeEditModal, selectedWeekend } = useUIStore();

  const [formData, setFormData] = useState<Weekend | null>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const queryClient = useQueryClient();

  /* Load selected data */
  useEffect(() => {
    if (selectedWeekend) {
      setFormData({ ...selectedWeekend });
    }
  }, [selectedWeekend]);

  /* ESC Close */
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeEditModal();
    };

    if (isEditModalOpen) {
      window.addEventListener("keydown", handleEsc);
      document.body.style.overflow = "hidden";
    }

    return () => {
      window.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "auto";
    };
  }, [isEditModalOpen, closeEditModal]);

  /* Mutation */
  const updateMutation = useMutation({
    mutationFn: async (updatedData: Weekend) => {
      const res = await fetch(
        `http://localhost:5000/weekends/${updatedData.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedData),
        }
      );

      if (!res.ok) {
        throw new Error("Failed to update weekend");
      }

      return res.json();
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["weekends"] });
      closeEditModal();
    },
  });

  /* Modal Hide */
  if (!isEditModalOpen || !formData) return null;

  const handleOutsideClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      closeEditModal();
    }
  };

  const handleChange = (field: keyof Weekend, value: any) => {
    setFormData((prev) => (prev ? { ...prev, [field]: value } : prev));
  };

  const handleSubmit = () => {
    if (formData) {
      updateMutation.mutate(formData);
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50"
      onClick={handleOutsideClick}
    >
      <div
        ref={modalRef}
        className="bg-[#0f1b2e] border border-blue-500/20 rounded-2xl p-8 w-130 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-white text-xl font-semibold text-center mb-6">
          Edit Weekend Card
        </h2>

        <div className="grid grid-cols-2 gap-4">
          {/* Branch */}
          <div className="col-span-2">
            <label className="text-sm text-gray-400">Branch Name</label>
            <input
              value={formData.branch}
              onChange={(e) => handleChange("branch", e.target.value)}
              className="w-full mt-1 p-2 rounded-lg bg-gray-800 text-white border border-gray-600"
            />
          </div>

          {/* Office ID */}
          <div>
            <label className="text-sm text-gray-400">Office ID</label>
            <input
              type="number"
              value={formData.officeId}
              onChange={(e) =>
                handleChange("officeId", Number(e.target.value))
              }
              className="w-full mt-1 p-2 rounded-lg bg-gray-800 text-white border border-gray-600"
            />
          </div>

          {/* Start Time */}
          <div>
            <label className="text-sm text-gray-400">Start Time</label>
            <input
              type="time"
              value={formData.start}
              onChange={(e) => handleChange("start", e.target.value)}
              className="w-full mt-1 p-2 rounded-lg bg-gray-800 text-white border border-gray-600"
            />
          </div>

          {/* End Time */}
          <div>
            <label className="text-sm text-gray-400">End Time</label>
            <input
              type="time"
              value={formData.end}
              onChange={(e) => handleChange("end", e.target.value)}
              className="w-full mt-1 p-2 rounded-lg bg-gray-800 text-white border border-gray-600"
            />
          </div>

          {/* Weekend Days */}
          <div className="col-span-2">
            <label className="text-sm text-gray-400">Weekend Days</label>
            <input
              value={formData.weekendDays.join(", ")}
              onChange={(e) =>
                handleChange(
                  "weekendDays",
                  e.target.value.split(",").map((d) => d.trim())
                )
              }
              className="w-full mt-1 p-2 rounded-lg bg-gray-800 text-white border border-gray-600"
            />
          </div>
        </div>

        {/* Created At */}
        <div className="mt-6 pt-4 border-t border-gray-700">
          <label className="text-xs text-gray-400">Created At</label>
          <p className="text-gray-300 text-sm">{formData.createdAt}</p>
        </div>

        {/* Error */}
        {updateMutation.isError && (
          <p className="text-red-400 text-sm mt-3">
            Failed to update. Try again.
          </p>
        )}

        {/* Buttons */}
        <div className="flex justify-end gap-4 mt-6">
          <button
            onClick={closeEditModal}
            disabled={updateMutation.isPending}
            className="px-5 py-2 bg-gray-600 hover:bg-gray-500 rounded-lg text-white"
          >
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            disabled={updateMutation.isPending}
            className="px-5 py-2 bg-blue-600 hover:bg-blue-500 rounded-lg text-white"
          >
            {updateMutation.isPending ? "Updating..." : "Update"}
          </button>
        </div>
      </div>
    </div>
  );
}