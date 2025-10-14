"use client"

import { ApiKeysCard } from '@daveyplate/better-auth-ui'

export default function APIKeysPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold">API Keys</h1>
        <p className="text-muted-foreground">
          Manage your API keys and access tokens. Keys are shown only once after creation.
        </p>
      </div>
      
      <ApiKeysCard />
      
      <div className="rounded-lg border bg-card p-6">
        <h3 className="text-lg font-semibold mb-2">Using Your API Keys</h3>
        <p className="text-sm text-muted-foreground mb-4">
          Your API keys use the <code className="bg-muted px-1 rounded">pk_test_</code> prefix. 
          Include your API key in requests using the X-API-Key header:
        </p>
        <div className="space-y-3">
          <div>
            <p className="text-sm font-medium mb-1">Test API Key Validation:</p>
            <code className="block bg-muted p-3 rounded-md text-sm">
              curl -X POST \<br />
              &nbsp;&nbsp;-H "X-API-Key: pk_test_your_key_here" \<br />
              &nbsp;&nbsp;-H "Content-Type: application/json" \<br />
              &nbsp;&nbsp;http://localhost:3000/api/validate-key
            </code>
          </div>
          <div>
            <p className="text-sm font-medium mb-1">General API Usage:</p>
            <code className="block bg-muted p-3 rounded-md text-sm">
              curl -H "X-API-Key: pk_test_your_key_here" https://your-api.com/endpoint
            </code>
          </div>
        </div>
      </div>
    </div>
  )
}
