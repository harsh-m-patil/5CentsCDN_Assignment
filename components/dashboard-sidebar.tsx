"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { LayoutDashboard, Settings, User } from "lucide-react"

const sidebarLinks = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Profile",
    href: "/dashboard/profile",
    icon: User,
  },
  {
    title: "Settings",
    href: "/dashboard/settings",
    icon: Settings,
  },
]

export function DashboardSidebar() {
  const pathname = usePathname()

  return (
    <aside className="hidden border-r bg-muted/40 md:block md:w-64">
      <div className="flex h-16 items-center border-b px-4">
        <Link href="/dashboard" className="flex items-center gap-2 font-semibold">
          <LayoutDashboard className="h-6 w-6" />
          <span>Admin Dashboard</span>
        </Link>
      </div>
      <ScrollArea className="h-[calc(100vh-64px)]">
        <div className="px-3 py-4">
          <div className="space-y-1">
            {sidebarLinks.map((link) => (
              <Button
                key={link.href}
                variant={pathname === link.href ? "secondary" : "ghost"}
                className={cn("w-full justify-start", pathname === link.href && "bg-secondary")}
                asChild
              >
                <Link href={link.href}>
                  <link.icon className="mr-2 h-4 w-4" />
                  {link.title}
                </Link>
              </Button>
            ))}
          </div>
        </div>
      </ScrollArea>
    </aside>
  )
}

