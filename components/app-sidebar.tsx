"use client"

import * as React from "react"
import {
  LayoutDashboard,
  Settings2,
  Shield,
  Users,
  Building2,
  Bot,
  Brain,
  FileText,
  Key,
} from "lucide-react"

import { NavMain } from "@/components/nav-main"
import { NavProjects } from "@/components/nav-projects"
import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"
import { useSession } from "@/lib/auth-client"
import { Logo } from "@/components/logo"
import Link from "next/link"

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { data: session } = useSession()

  // Generate navigation items based on user role and session
  const navMain = React.useMemo(() => {
    const items = [
      {
        title: "Dashboard",
        url: "/dashboard",
        icon: LayoutDashboard,
        isActive: true,
      },
      {
        title: "Agents",
        url: "/agents",
        icon: Bot,
        isActive: false,
      },
      {
        title: "LLMs",
        url: "/llms",
        icon: Brain,
        isActive: false,
      },
      {
        title: "Prompt Management",
        url: "/prompt-management",
        icon: FileText,
        isActive: false,
      },
      {
        title: "API Keys",
        url: "/api-keys",
        icon: Key,
        isActive: false,
      },
      {
        title: "Settings",
        url: "/settings",
        icon: Settings2,
        isActive: false,
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

    return items
  }, [session?.user?.role])


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
            <p className="dark:text-white text-black font-bold">MARRAKECH</p>
          </Link>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={navMain} />
      </SidebarContent>
      <SidebarFooter>
        {user && <NavUser user={user} />}
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
