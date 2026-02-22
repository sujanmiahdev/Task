"use client"

import { Building2, Briefcase, Logs, CalendarDays } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

const menus = [
  {
    name: "Office",
    icon: Building2,
    href: "/office",
  },
  {
    name: "Departments",
    icon: Briefcase,
    href: "/departments",
  },
  {
    name: "Designations",
    icon: Logs,
    href: "/designations",
  },
  {
    name: "Office Holidays",
    icon: CalendarDays,
    href: "/office-holidays",
  },
  {
    name: "Office Weekends",
    icon: CalendarDays,
    href: "/office-weekends",
  },
]

export default function TopNav() {
  const pathname = usePathname()

  return (
    <div className="border-b border-blue-500/20 bg-[#0b1422] px-8 py-4">
      <div className="flex items-center divide-x divide-white">

        {menus.map((menu) => {
          const Icon = menu.icon
          const active = pathname === menu.href

          return (
            <Link
              key={menu.name}
              href={menu.href}
              className={`flex items-center gap-2 text-sm font-medium px-6 py-2 transition
              ${active 
                ? "text-blue-400 border-b-2 border-blue-500 pb-2" 
                : "text-gray-400 hover:text-white"
              }`}
            >
              <Icon size={16} />
              {menu.name}
            </Link>
          )
        })}

      </div>
    </div>
  )
}
