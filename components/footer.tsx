"use client";

import Link from "next/link";
import { Logo } from "./logo";
import { usePathname } from "next/navigation";

export function Footer({ variant }: { variant?: 'landing' | 'minimal' }) {
  const pathname = usePathname();
  
  // If variant is explicitly provided, use it
  if (variant === 'landing') {
    return <LandingFooter />;
  }
  if (variant === 'minimal') {
    return <MinimalFooter />;
  }
  
  // Auto-detect based on route (fallback)
  const isPublicRoute = ['/', '/sign-in', '/pricing', '/forget-password', 
    '/reset-password', '/two-factor', '/apps/register', '/client-test',
    '/accept-invitation', '/oauth/authorize', '/changelog'].some(route => 
      pathname === route || pathname.startsWith(route)
  );

  if (isPublicRoute) {
    return <LandingFooter />;
  }

  return <MinimalFooter />;
}

function LandingFooter() {
  return (
    <footer className="border-t border-border bg-white dark:bg-black">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          {/* Logo & Tagline */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <Logo className="w-6 h-6" />
              <span className="font-semibold">MARRAKECH</span>
            </div>
            <p className="text-sm text-foreground">
              Build AI products users love to interact with
            </p>
          </div>

          {/* Product */}
          <div>
            <h3 className="font-semibold mb-4 text-sm">Product</h3>
            <ul className="space-y-3">
              <li><Link href="/dashboard" className="text-sm text-foreground hover:text-foreground transition-colors">Dashboard</Link></li>
              <li><Link href="https://github.com/your-org/marrakech-sdk" className="text-sm text-foreground hover:text-foreground transition-colors">SDK</Link></li>
              <li><Link href="/pricing" className="text-sm text-foreground hover:text-foreground transition-colors">Pricing</Link></li>
            </ul>
          </div>

          {/* Developers */}
          <div>
            <h3 className="font-semibold mb-4 text-sm">Developers</h3>
            <ul className="space-y-3">
              <li><Link href="https://status.marrakech.dev" target="_blank" className="text-sm text-foreground hover:text-foreground transition-colors flex items-center gap-2">
                <span className="w-2 h-2 bg-green-500 rounded-full" />
                Status
              </Link></li>
              <li><Link href="https://docs.marrakech.dev" target="_blank" className="text-sm text-foreground hover:text-foreground transition-colors">Documentation</Link></li>
              <li><Link href="https://github.com/your-org/marrakech-sdk" target="_blank" className="text-sm text-foreground hover:text-foreground transition-colors">GitHub</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-semibold mb-4 text-sm">Company</h3>
            <ul className="space-y-3">
              <li><Link href="/about" className="text-sm text-foreground hover:text-foreground transition-colors">About</Link></li>
              <li><Link href="/changelog" className="text-sm text-foreground hover:text-foreground transition-colors">Changelog</Link></li>
              <li><Link href="/blog" className="text-sm text-foreground hover:text-foreground transition-colors">Blog</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-border pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-foreground">
            © {new Date().getFullYear()} Marrakech. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link href="/privacy" className="text-xs text-foreground hover:text-foreground transition-colors">Privacy</Link>
            <Link href="/terms" className="text-xs text-foreground hover:text-foreground transition-colors">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

function MinimalFooter() {
  return (
    <footer className="border-t border-border bg-background/50 backdrop-blur-sm mt-auto">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs">
          <p className="text-muted-foreground">
            © {new Date().getFullYear()} Marrakech
          </p>
          
          <div className="flex items-center gap-6">
            <Link 
              href="https://status.marrakech.dev" 
              target="_blank"
              className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2"
            >
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span>Status</span>
            </Link>
            <Link href="https://docs.marrakech.dev" target="_blank" className="text-muted-foreground hover:text-foreground transition-colors">Docs</Link>
            <Link href="/support" className="text-muted-foreground hover:text-foreground transition-colors">Support</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
