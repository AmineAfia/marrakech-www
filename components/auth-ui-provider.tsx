"use client"

import { AuthUIProvider } from '@daveyplate/better-auth-ui'
import { client } from '@/lib/auth-client'

export function BetterAuthUIProvider({ children }: { children: React.ReactNode }) {
  return (
    <AuthUIProvider
      authClient={client}
      apiKey={{
        prefix: process.env.NODE_ENV === 'production' ? 'pk_' : 'pk_test_',
        metadata: {
          environment: process.env.NODE_ENV || 'development',
          application: 'marrakesh'
        }
      }}
    >
      {children}
    </AuthUIProvider>
  )
}
