"use client"

import * as React from "react"
import {
  LayoutDashboard,
  Settings2,
  Shield,
  Users,
  Building2,
} from "lucide-react"

import { NavMain } from "@/components/nav-main"
import { NavProjects } from "@/components/nav-projects"
import { NavUser } from "@/components/nav-user"
import { TeamSwitcher } from "@/components/team-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"
import { useSession } from "@/lib/auth-client"
import { useListOrganizations } from "@/lib/auth-client"
import { Logo } from "@/components/logo"
import { ThemeToggle } from "@/components/theme-toggle"
import Link from "next/link"

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { data: session } = useSession()
  const { data: organizations } = useListOrganizations()

  // Generate navigation items based on user role and session
  const navMain = React.useMemo(() => {
    const items = [
      {
        title: "Dashboard",
        url: "/dashboard",
        icon: LayoutDashboard,
        isActive: true,
      },
    ]

    // Add Admin navigation if user has admin role
    if (session?.user?.role === "admin") {
      items.push({
        title: "Admin",
        url: "/admin",
        icon: Shield,
        isActive: false,
      })
    }

    items.push({
      title: "Settings",
      url: "/settings",
      icon: Settings2,
      isActive: false,
    })

    return items
  }, [session?.user?.role])

  // Convert organizations to teams format
  const teams = React.useMemo(() => {
    if (!organizations) return []
    
    return organizations.map((org) => ({
      name: org.name,
      logo: Building2,
      plan: "Organization",
    }))
  }, [organizations])

  // User data from session
  const user = React.useMemo(() => {
    if (!session?.user) return null
    
    return {
      name: session.user.name || "User",
      email: session.user.email,
      avatar: session.user.image || "/avatars/default.jpg",
    }
  }, [session?.user])

  if (!session?.user) {
    return null
  }

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <div className="flex items-center gap-2 px-2 py-2">
          <Link href="/" className="flex gap-2 cursor-pointer">
            <Logo />
            <p className="dark:text-white text-black font-bold">BETTER-AUTH.</p>
          </Link>
        </div>
        {teams.length > 0 && <TeamSwitcher teams={teams} />}
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={navMain} />
      </SidebarContent>
      <SidebarFooter>
        <div className="flex items-center justify-between px-2 py-2">
          <ThemeToggle />
        </div>
        {user && <NavUser user={user} />}
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
