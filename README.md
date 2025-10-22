# Marrakesh

**Context Engineering for Developers** - A platform for building, testing, and analyzing AI agent behavior using structured prompts and comprehensive analytics.

Marrakesh is a Next.js application that provides a complete solution for managing AI prompts, tracking their performance, and analyzing agent behavior through detailed analytics dashboards. Built with Better Auth for authentication and Tinybird for real-time analytics.

## 🚀 What is Marrakesh?

Marrakesh is a comprehensive platform that helps developers:

- **Build AI Agents**: Create structured prompts with type-safe tools and outputs
- **Test & Validate**: Run comprehensive test suites against your prompts
- **Monitor Performance**: Track execution metrics, costs, and success rates
- **Analyze Behavior**: Get insights into tool usage, error patterns, and optimization opportunities
- **Manage Teams**: Organize prompts and analytics across organizations

## 🏗️ Architecture

### Core Components

- **Next.js 15** - React framework with App Router
- **Better Auth** - Complete authentication system with multiple providers
- **Tinybird** - Real-time analytics and data pipeline
- **TypeScript** - Full type safety throughout the application
- **Tailwind CSS** - Modern styling with shadcn/ui components

### Data Pipeline

The platform uses a sophisticated analytics pipeline:

1. **Data Ingestion**: Collects prompt executions, tool calls, and test results
2. **Real-time Processing**: Tinybird processes data in real-time
3. **Analytics Dashboard**: Visualize performance metrics and insights
4. **API Integration**: RESTful APIs for data ingestion and retrieval

## 🛠️ Getting Started

### Prerequisites

- Node.js 18+ 
- pnpm (recommended) or npm
- Database (SQLite, MySQL, PostgreSQL, or Turso)

### Installation

1. **Clone the repository**:

   ```bash
   git clone https://github.com/AmineAfia/marrakesh-www
   cd marrakesh-www
   ```

2. **Install dependencies**:

   ```bash
   pnpm install
   # or
   npm install
   ```

3. **Set up environment variables**:

   Create a `.env.local` file with the following variables:

   ```bash
   # Database Configuration (choose one)
   TURSO_DATABASE_URL=your_turso_url
   TURSO_AUTH_TOKEN=your_turso_token
   # OR
   USE_MYSQL=true
   MYSQL_DATABASE_URL=your_mysql_url
   # OR
   USE_POSTGRES=true
   MYSQL_DATABASE_URL=your_postgres_url

   # Better Auth Configuration
   BETTER_AUTH_SECRET=your_secret_key
   BETTER_AUTH_URL=http://localhost:3000
   BETTER_AUTH_EMAIL=your_email@example.com

   # Email Configuration (Resend)
   RESEND_API_KEY=your_resend_api_key
   TEST_EMAIL=test@example.com

   # Tinybird Analytics
   TINYBIRD_TOKEN=your_tinybird_token

   # OAuth Providers (optional)
   GITHUB_CLIENT_ID=your_github_client_id
   GITHUB_CLIENT_SECRET=your_github_client_secret
   GOOGLE_CLIENT_ID=your_google_client_id
   GOOGLE_CLIENT_SECRET=your_google_client_secret
   # Add other OAuth providers as needed
   ```

4. **Run database migrations**:

   ```bash
   pnpm db:migrate
   ```

5. **Start the development server**:

   ```bash
   pnpm dev
   ```

The application will be available at [http://localhost:3000](http://localhost:3000).

## 📊 Features

### Authentication & User Management
- **Multi-provider OAuth**: GitHub, Google, Discord, Microsoft, and more
- **Email/Password Authentication**: Traditional login with email verification
- **Passkeys**: Passwordless authentication using WebAuthn
- **Two-Factor Authentication**: SMS and TOTP support
- **Organization Management**: Team-based access control
- **API Key Management**: Secure API access for integrations

### Prompt Management
- **Structured Prompts**: Type-safe prompt definitions with Zod schemas
- **Version Control**: Track prompt changes and rollbacks
- **Tool Integration**: Define and manage AI tools with type safety
- **Output Validation**: Ensure consistent response formats

### Analytics & Monitoring
- **Real-time Metrics**: Execution times, success rates, and error tracking
- **Cost Analysis**: Token usage and cost optimization insights
- **Performance Dashboards**: Visual analytics with interactive charts
- **Test Results**: Comprehensive test suite execution and reporting
- **Regional Analytics**: Geographic performance distribution

### Developer Experience
- **Type Safety**: Full TypeScript support with strict typing
- **API Documentation**: Auto-generated OpenAPI documentation
- **SDK Integration**: Easy integration with Vercel AI SDK and other frameworks
- **Testing Tools**: Built-in testing utilities for prompt validation

## 🔧 Development

### Available Scripts

```bash
# Development
pnpm dev              # Start development server
pnpm dev:secure       # Start with HTTPS (for OAuth testing)

# Building
pnpm build            # Build for production
pnpm start            # Start production server

# Code Quality
pnpm lint             # Run ESLint
pnpm typecheck        # Run TypeScript checks
```

### Project Structure

```
├── app/                    # Next.js App Router pages
│   ├── (auth)/            # Authentication pages
│   ├── dashboard/         # Analytics dashboard
│   ├── api/               # API routes
│   └── api-keys/          # API key management
├── components/            # Reusable UI components
├── lib/                   # Utility functions and configurations
├── analytics/             # Tinybird analytics configuration
└── better-auth_migrations/ # Database migrations
```

## 🔌 API Integration

### Data Ingestion

Send analytics data to the platform:

```bash
curl -X POST http://localhost:3000/api/ingest \
  -H "X-API-Key: pk_test_your_key_here" \
  -H "Content-Type: application/json" \
  -d '{
    "prompt_executions": [...],
    "tool_calls": [...],
    "test_runs": [...]
  }'
```

### API Key Validation

```bash
curl -X POST http://localhost:3000/api/validate-key \
  -H "X-API-Key: pk_test_your_key_here"
```

## 🚀 Deployment

### Vercel (Recommended)

1. Connect your GitHub repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Docker

```bash
# Build the image
docker build -t marrakesh .

# Run the container
docker run -p 3000:3000 marrakesh
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📚 Learn More

- [Better Auth Documentation](https://better-auth.com/docs) - Complete authentication guide
- [Next.js Documentation](https://nextjs.org/docs) - React framework documentation
- [Tinybird Documentation](https://www.tinybird.co/docs) - Real-time analytics platform
- [Vercel AI SDK](https://sdk.vercel.ai/) - AI integration framework

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

Built with ❤️ for the AI age.
