"use client"

import { X, Search } from "lucide-react"

type Props = {
  search: string
  setSearch: (value: string) => void
  office: string
  setOffice: (value: string) => void
  weekendDayFilter: string
  setWeekendDayFilter: (value: string) => void
  clearFilters: () => void
}

const filterItems = [
  {
    type: "input",
    label: "Search",
    placeholder: "Search Weekend Days, Branch Name...",
  },
  {
    type: "select",
    label: "Office",
    placeholder: "Filter by Office",
    options: ["Uttara Branch", "Motijheel Branch", "Karwan Bazar Branch"],
  },
  {
    type: "select",
    label: "Weekend Days",
    placeholder: "Filter by Days",
    options: [
      "Saturday",
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
    ],
  },
  {
    type: "button",
    label: "Clear Filters",
  },
]

export default function FilterBar({
  search,
  setSearch,
  office,
  setOffice,
  weekendDayFilter,
  setWeekendDayFilter,
  clearFilters,
}: Props) {
  return (
    <div className="grid md:grid-cols-4 bg-gray-900 rounded-2xl mx-8 my-2 p-5 gap-4">
      {filterItems.map((item, index) => {
        if (item.type === "input") {
          return (
            <div key={index} className="flex flex-col relative">
              <label className="text-gray-400 text-xl mb-1">{item.label}</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-white">
                  <Search size={16} />
                </span>
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder={item.placeholder}
                  className="bg-[#18263c] pl-10 p-3 placeholder-white rounded-lg text-sm text-white outline-none w-full"
                />
              </div>
            </div>
          )
        }

        if (item.type === "select" && item.label === "Office") {
          return (
            <div key={index} className="flex flex-col">
              <label className="text-gray-400 text-xl mb-1">{item.label}</label>
              <select
                value={office}
                onChange={(e) => setOffice(e.target.value)}
                className="bg-[#18263c] text-white p-3 rounded-lg text-sm"
              >
                <option value="">{item.placeholder}</option>
                {item.options?.map((opt, i) => (
                  <option key={i} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </div>
          )
        }

        if (item.type === "select" && item.label === "Weekend Days") {
          return (
            <div key={index} className="flex flex-col">
              <label className="text-gray-400 text-xl mb-1">{item.label}</label>
              <select
                value={weekendDayFilter}
                onChange={(e) => setWeekendDayFilter(e.target.value)}
                className="bg-[#18263c] text-white p-3 rounded-lg text-sm"
              >
                <option value="">{item.placeholder}</option>
                {item.options?.map((opt, i) => (
                  <option key={i} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </div>
          )
        }

        if (item.type === "button") {
          return (
            <div key={index} className="flex items-end pb-2">
              <button
                onClick={clearFilters}
                className="bg-gray-700 text-white p-2 hover:bg-gray-600 rounded-lg text-sm flex items-center gap-2 px-4"
              >
                <X size={16} />
                {item.label}
              </button>
            </div>
          )
        }

        return null
      })}
    </div>
  )
}
