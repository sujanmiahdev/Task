// lib/api.ts

import { Weekend } from "@/app/types/Weekend";

/* =====================
   FETCH ALL
===================== */
export const fetchWeekends = async (): Promise<Weekend[]> => {
  const res = await fetch("http://localhost:5000/weekends");

  if (!res.ok) {
    throw new Error("Failed to fetch");
  }

  return res.json();
};


/* =====================
   UPDATE
===================== */
export const updateWeekend = async (
  id: number,
  updatedFields: Partial<Weekend>
): Promise<Weekend> => {
  const res = await fetch(
    `http://localhost:5000/weekends/${id}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedFields),
    }
  );

  if (!res.ok) {
    throw new Error("Failed to update");
  }

  return res.json();
};