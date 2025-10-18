"use client"

import { useSession } from "@/lib/auth-client"
import { usePathname } from "next/navigation"
import { AppSidebar } from "@/components/app-sidebar"
import { SidebarHeader } from "@/components/sidebar-header"
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar"
import { Wrapper } from "@/components/wrapper"
import { Footer } from "@/components/footer"

// Routes that should NOT show the sidebar (public routes)
const PUBLIC_ROUTES = [
  '/',
  '/sign-in',
  '/forget-password', 
  '/reset-password',
  '/two-factor',
  '/pricing',
  '/apps/register',
  '/client-test',
  '/accept-invitation',
  '/oauth/authorize',
]

// Routes that should show sidebar even if they might be partially public
const PROTECTED_ROUTES = [
  '/dashboard',
  '/agents',
  '/llms',
  '/prompt-management',
  '/api-keys',
  '/settings',
  '/admin',
  '/device',
]

export function ConditionalLayout({ children }: { children: React.ReactNode }) {
  const { data: session, isPending } = useSession()
  const pathname = usePathname()

  // Check if current route should show sidebar
  const shouldShowSidebar = () => {
    // Always show sidebar for protected routes if user is authenticated
    if (session?.user && PROTECTED_ROUTES.some(route => pathname.startsWith(route))) {
      return true
    }
    
    // Don't show sidebar for public routes
    if (PUBLIC_ROUTES.some(route => pathname.startsWith(route))) {
      return false
    }
    
    // For any other route, show sidebar if user is authenticated
    return !!session?.user
  }

  const showSidebar = shouldShowSidebar()

  // Show loading state while checking session
  if (isPending) {
    return (
      <div className="min-h-screen w-full dark:bg-black bg-white dark:bg-grid-small-white/[0.2] bg-grid-small-black/[0.2] relative flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-foreground" />
      </div>
    )
  }

  // Show sidebar layout for authenticated users on non-public routes
  if (showSidebar) {
    return (
      <div className="min-h-screen w-full dark:bg-black bg-white dark:bg-grid-small-white/[0.2] bg-grid-small-black/[0.2] relative">
        <div className="absolute pointer-events-none inset-0 md:flex items-center justify-center dark:bg-black bg-white mask-[radial-gradient(ellipse_at_center,transparent_20%,black)] hidden" />
        <SidebarProvider>
          <AppSidebar />
          <SidebarInset className="relative z-10">
            <SidebarHeader />
            <div className="flex flex-1 flex-col gap-4 pt-0">
              <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-20">
                {children}
              </div>
              <Footer variant="minimal" />
            </div>
          </SidebarInset>
        </SidebarProvider>
      </div>
    )
  }

  // Show normal wrapper for public routes or unauthenticated users
  return <Wrapper>{children}</Wrapper>
}
