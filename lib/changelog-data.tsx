import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export interface ChangelogEntry {
  id: string
  title: string
  description: string
  date: string
  version?: string
  tags?: string[]
  content: () => JSX.Element
}

export const changelogEntries: ChangelogEntry[] = [
  {
    id: "2025-10-18",
    title: "Enhanced AI Agent Interface and Reasoning Capabilities",
    description: "Major improvements to AI agent performance, conversation interface, and reasoning abilities.",
    date: "2025-10-18",
    version: "1.2",
    tags: ["AI", "Performance", "Interface", "Reasoning"],
    content: () => (
      <>
        <img 
          src="https://images.unsplash.com/photo-1677442136019-21780ecad995?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8YWklMjBhZ2VudHxlbnwwfHwwfHx8MA%3D%3D" 
          alt="Enhanced AI Agent Interface" 
          className="rounded-md border mb-6"
        />
        
        <ul className="space-y-2 mb-6">
          <li><strong>Enhanced Reasoning</strong>: Improved logical thinking and problem-solving</li>
          <li><strong>Context Awareness</strong>: Better understanding of conversation history</li>
          <li><strong>Multi-modal Support</strong>: Process text, images, and code simultaneously</li>
          <li><strong>Adaptive Responses</strong>: Tailored communication style based on user preferences</li>
          <li><strong>Real-time Learning</strong>: Dynamic adaptation during conversations</li>
        </ul>

        <Accordion type="multiple" collapsible className="w-full not-prose">
          <AccordionItem value="item-1">
            <AccordionTrigger>Features</AccordionTrigger>
            <AccordionContent className="flex flex-col gap-4 text-balance">
              <ul className="list-disc space-y-2 pl-4">
                <li><strong>60% faster response generation</strong></li>
                <li>Optimized model inference with reduced latency</li>
                <li>Improved memory management for long conversations</li>
                <li>Enhanced token efficiency and cost optimization</li>
                <li>Better handling of complex multi-step tasks</li>
              </ul>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>Bug Fixes</AccordionTrigger>
            <AccordionContent className="flex flex-col gap-4 text-balance">
              <ul className="list-disc space-y-2 pl-4">
                <li>Fixed conversation context loss in long sessions</li>
                <li>Resolved inconsistent response formatting</li>
                <li>Corrected memory retention issues</li>
                <li>Fixed edge cases in code generation</li>
                <li>Improved error handling and recovery</li>
              </ul>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </>
    )
  },
  {
    id: "2025-10-15",
    title: "New Dashboard Analytics and Real-time Monitoring",
    description: "Introducing comprehensive analytics dashboard with real-time monitoring capabilities for AI applications.",
    date: "2025-10-15",
    version: "1.1",
    tags: ["Dashboard", "Analytics", "Monitoring", "Real-time"],
    content: () => (
      <>
        <img 
          src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZGFzaGJvYXJkfGVufDB8fDB8fHww" 
          alt="Dashboard Analytics" 
          className="rounded-md border mb-6"
        />
        
        <h3 className="text-lg font-semibold mb-4">What's New</h3>
        <ul className="space-y-2 mb-6">
          <li><strong>Real-time Metrics</strong>: Live tracking of AI execution performance and costs</li>
          <li><strong>Advanced Filtering</strong>: Filter by date range, model, user, and custom parameters</li>
          <li><strong>Export Capabilities</strong>: Download reports in CSV, PDF, and JSON formats</li>
          <li><strong>Custom Dashboards</strong>: Create personalized views for different team roles</li>
        </ul>

        <Accordion type="multiple" collapsible className="w-full not-prose">
          <AccordionItem value="item-1">
            <AccordionTrigger>Analytics Features</AccordionTrigger>
            <AccordionContent className="flex flex-col gap-4 text-balance">
              <ul className="list-disc space-y-2 pl-4">
                <li>Interactive charts with zoom and pan capabilities</li>
                <li>Customizable dashboard widgets</li>
                <li>Real-time alerts and notifications</li>
                <li>Historical data analysis with trend detection</li>
                <li>Multi-tenant analytics for enterprise customers</li>
              </ul>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>Performance Improvements</AccordionTrigger>
            <AccordionContent className="flex flex-col gap-4 text-balance">
              <ul className="list-disc space-y-2 pl-4">
                <li>50% faster dashboard loading times</li>
                <li>Optimized data aggregation queries</li>
                <li>Improved caching for better performance</li>
                <li>Reduced memory usage by 30%</li>
                <li>Better handling of large datasets</li>
              </ul>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </>
    )
  },
  {
    id: "2025-01-15",
    title: "New Real-time Analytics Dashboard",
    description: "Introducing comprehensive real-time analytics with advanced filtering and export capabilities.",
    date: "2025-01-15",
    version: "2.0",
    tags: ["Analytics", "Dashboard", "Real-time", "Export"],
    content: () => (
      <>
        <img 
          src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZGFzaGJvYXJkfGVufDB8fDB8fHww" 
          alt="Analytics Dashboard" 
          className="rounded-md border mb-6"
        />
        
        <h3 className="text-lg font-semibold mb-4">What's New</h3>
        <ul className="space-y-2 mb-6">
          <li><strong>Real-time Metrics</strong>: Live tracking of AI execution performance and costs</li>
          <li><strong>Advanced Filtering</strong>: Filter by date range, model, user, and custom parameters</li>
          <li><strong>Export Capabilities</strong>: Download reports in CSV, PDF, and JSON formats</li>
          <li><strong>Custom Dashboards</strong>: Create personalized views for different team roles</li>
        </ul>

        <Accordion type="multiple" collapsible className="w-full not-prose">
          <AccordionItem value="item-1">
            <AccordionTrigger>Analytics Features</AccordionTrigger>
            <AccordionContent className="flex flex-col gap-4 text-balance">
              <ul className="list-disc space-y-2 pl-4">
                <li>Interactive charts with zoom and pan capabilities</li>
                <li>Customizable dashboard widgets</li>
                <li>Real-time alerts and notifications</li>
                <li>Historical data analysis with trend detection</li>
                <li>Multi-tenant analytics for enterprise customers</li>
              </ul>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>Performance Improvements</AccordionTrigger>
            <AccordionContent className="flex flex-col gap-4 text-balance">
              <ul className="list-disc space-y-2 pl-4">
                <li>50% faster dashboard loading times</li>
                <li>Optimized data aggregation queries</li>
                <li>Improved caching for better performance</li>
                <li>Reduced memory usage by 30%</li>
                <li>Better handling of large datasets</li>
              </ul>
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        <h3 className="text-lg font-semibold mb-4 mt-8">Breaking Changes</h3>
        <ul className="space-y-2">
          <li><strong>API Changes</strong>: Updated analytics API endpoints (migration guide available)</li>
          <li><strong>Dashboard Layout</strong>: New default layout with improved navigation</li>
          <li><strong>Export Format</strong>: Enhanced CSV export with additional metadata fields</li>
        </ul>
      </>
    )
  },
  {
    id: "2025-01-10",
    title: "Enhanced Security and Authentication",
    description: "Major security improvements including multi-factor authentication, session management, and audit logging.",
    date: "2025-01-10",
    version: "1.8",
    tags: ["Security", "Authentication", "MFA", "Audit"],
    content: () => (
      <>
        <img 
          src="https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8c2VjdXJpdHl8ZW58MHx8MHx8fDA%3D" 
          alt="Security Features" 
          className="rounded-md border mb-6"
        />
        
        <h3 className="text-lg font-semibold mb-4">Security Enhancements</h3>
        <ul className="space-y-2 mb-6">
          <li><strong>Multi-Factor Authentication</strong>: Support for TOTP, SMS, and hardware keys</li>
          <li><strong>Session Management</strong>: Advanced session controls with device tracking</li>
          <li><strong>Audit Logging</strong>: Comprehensive audit trails for all user actions</li>
          <li><strong>API Security</strong>: Enhanced API authentication with rate limiting</li>
        </ul>

        <Accordion type="multiple" collapsible className="w-full not-prose">
          <AccordionItem value="item-1">
            <AccordionTrigger>New Security Features</AccordionTrigger>
            <AccordionContent className="flex flex-col gap-4 text-balance">
              <ul className="list-disc space-y-2 pl-4">
                <li>Multi-factor authentication (MFA) support</li>
                <li>Device management and trusted device tracking</li>
                <li>Comprehensive audit logging for compliance</li>
                <li>Advanced session controls and timeout policies</li>
                <li>API rate limiting and abuse prevention</li>
              </ul>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>Compliance & Privacy</AccordionTrigger>
            <AccordionContent className="flex flex-col gap-4 text-balance">
              <ul className="list-disc space-y-2 pl-4">
                <li>GDPR compliance features</li>
                <li>Data retention policies</li>
                <li>Privacy controls for user data</li>
                <li>Encryption at rest and in transit</li>
                <li>SOC 2 Type II compliance preparation</li>
              </ul>
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        <h3 className="text-lg font-semibold mb-4 mt-8">Bug Fixes</h3>
        <ul className="space-y-2">
          <li>Fixed session timeout issues in long-running operations</li>
          <li>Resolved authentication token refresh edge cases</li>
          <li>Improved error handling for failed login attempts</li>
          <li>Fixed audit log data integrity issues</li>
        </ul>
      </>
    )
  },
  {
    id: "2025-01-05",
    title: "Mobile App Launch and Cross-Platform Support",
    description: "Introducing our native mobile applications for iOS and Android with full feature parity.",
    date: "2025-01-05",
    version: "1.7",
    tags: ["Mobile", "iOS", "Android", "Cross-platform"],
    content: () => (
      <>
        <img 
          src="https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bW9iaWxlJTIwYXBwfGVufDB8fDB8fHww" 
          alt="Mobile App" 
          className="rounded-md border mb-6"
        />
        
        <h3 className="text-lg font-semibold mb-4">Mobile Applications</h3>
        <ul className="space-y-2 mb-6">
          <li><strong>iOS App</strong>: Native iPhone and iPad support with optimized interface</li>
          <li><strong>Android App</strong>: Full Android compatibility with Material Design</li>
          <li><strong>Offline Support</strong>: Core features available without internet connection</li>
          <li><strong>Push Notifications</strong>: Real-time alerts for important updates</li>
        </ul>

        <Accordion type="multiple" collapsible className="w-full not-prose">
          <AccordionItem value="item-1">
            <AccordionTrigger>Mobile Features</AccordionTrigger>
            <AccordionContent className="flex flex-col gap-4 text-balance">
              <ul className="list-disc space-y-2 pl-4">
                <li>Native iOS and Android applications</li>
                <li>Offline mode for core functionality</li>
                <li>Biometric authentication support</li>
                <li>Push notifications for real-time updates</li>
                <li>Optimized for both phones and tablets</li>
              </ul>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>Cross-Platform Sync</AccordionTrigger>
            <AccordionContent className="flex flex-col gap-4 text-balance">
              <ul className="list-disc space-y-2 pl-4">
                <li>Real-time synchronization across devices</li>
                <li>Seamless handoff between web and mobile</li>
                <li>Cloud backup and restore functionality</li>
                <li>Multi-device session management</li>
                <li>Consistent user experience across platforms</li>
              </ul>
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        <h3 className="text-lg font-semibold mb-4 mt-8">Download Links</h3>
        <ul className="space-y-2">
          <li><strong>iOS</strong>: Available on the App Store</li>
          <li><strong>Android</strong>: Available on Google Play Store</li>
          <li><strong>Beta Testing</strong>: Join our beta program for early access to new features</li>
        </ul>
      </>
    )
  },
  {
    id: "2024-12-28",
    title: "API v2.0 and Developer Experience Improvements",
    description: "Complete API redesign with better documentation, SDKs, and developer tools.",
    date: "2024-12-28",
    version: "2.0",
    tags: ["API", "SDK", "Developer", "Documentation"],
    content: () => (
      <>
        <img 
          src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YXBpfGVufDB8fDB8fHww" 
          alt="API Documentation" 
          className="rounded-md border mb-6"
        />
        
        <h3 className="text-lg font-semibold mb-4">API v2.0 Release</h3>
        <ul className="space-y-2 mb-6">
          <li><strong>RESTful Design</strong>: Clean, consistent REST API endpoints</li>
          <li><strong>GraphQL Support</strong>: Flexible querying with GraphQL API</li>
          <li><strong>SDK Updates</strong>: Updated SDKs for Python, JavaScript, Go, and Ruby</li>
          <li><strong>Interactive Documentation</strong>: Live API explorer with code examples</li>
        </ul>

        <Accordion type="multiple" collapsible className="w-full not-prose">
          <AccordionItem value="item-1">
            <AccordionTrigger>New API Features</AccordionTrigger>
            <AccordionContent className="flex flex-col gap-4 text-balance">
              <ul className="list-disc space-y-2 pl-4">
                <li>RESTful API with consistent HTTP methods</li>
                <li>GraphQL endpoint for flexible data querying</li>
                <li>Webhook support for real-time notifications</li>
                <li>Rate limiting with clear error messages</li>
                <li>Comprehensive API versioning strategy</li>
              </ul>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>Developer Tools</AccordionTrigger>
            <AccordionContent className="flex flex-col gap-4 text-balance">
              <ul className="list-disc space-y-2 pl-4">
                <li>Interactive API documentation</li>
                <li>Code examples in multiple languages</li>
                <li>Postman collection for testing</li>
                <li>CLI tools for common operations</li>
                <li>Sandbox environment for testing</li>
              </ul>
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        <h3 className="text-lg font-semibold mb-4 mt-8">Migration Guide</h3>
        <ul className="space-y-2">
          <li><strong>API v1 Deprecation</strong>: v1 API will be supported until June 2025</li>
          <li><strong>Migration Tools</strong>: Automated migration scripts available</li>
          <li><strong>Documentation</strong>: Comprehensive migration guide with examples</li>
          <li><strong>Support</strong>: Dedicated support channel for migration assistance</li>
        </ul>
      </>
    )
  }
]
