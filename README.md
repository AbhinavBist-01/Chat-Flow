# ChatFlow — Developer Intelligence Console

<p align="center">
  <img src="https://img.shields.io/badge/Framework-Next.js%2016-000000?style=for-the-badge&logo=nextdotjs&logoColor=white" alt="Next.js 16" />
  <img src="https://img.shields.io/badge/Theme-Vercel%20Black%20%26%20Blue-0072F5?style=for-the-badge" alt="Vercel Black and Blue" />
  <img src="https://img.shields.io/badge/Language-TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Styling-Tailwind%20CSS%20v4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" alt="Tailwind CSS v4" />
  <img src="https://img.shields.io/badge/Package%20Manager-Bun-fbf0df?style=for-the-badge&logo=bun&logoColor=black" alt="Bun" />
</p>

**ChatFlow** is a minimalist, high-performance AI chat interface engineered specifically for developers. Styled with a pitch-black Vercel theme, glowing electric blue highlights (`#0072F5`), and typography mapped to Geist Sans and Geist Mono, ChatFlow delivers a seamless terminal-like experience for code analysis, performance tuning, and technical architecture.

---

## ⚡ Features

- **🎨 Vercel Black & Blue Theme**: Dark-mode interface featuring pitch-black backgrounds (`#000000`), translucent header bars, glowing active rings, and high-contrast typography.
- **🌊 Custom Flow Animations**: Custom animated dual-wave SVG logo representing real-time streams of logic, complete with breathing glow filters.
- **💻 Markdown Engine with Code Blocks**: Integrated lightweight React markdown parser rendering formatted paragraphs, bold highlights, inline code, and dark code editor blocks (`#0e0e0e`) equipped with language tags and one-click copy functionality.
- **💬 Interactive Prompt Suggestions**: Homepage dashboard cards (*"Explain Codebase"*, *"Optimize Performance"*, *"Generate Test Suites"*, *"Draft SQL Schema"*) with uppercase tags (`ANALYSIS`, `TUNING`, `QUALITY`, `ARCHITECTURE`) that execute instantly upon click.
- **🟢 Organic Bouncing Dot Loader**: Dynamic three-dot glowing blue typing indicator reflecting AI thinking states.
- **🔒 Authentication & Storage**: User authentication powered by Clerk and persistent message store using Prisma with PostgreSQL.
- **📱 Responsive Sidebar**: Collapsible sidebar with active conversation indicators featuring a Vercel Blue left border and background highlights.

---

## 🛠️ Tech Stack

| Category | Technology |
| :--- | :--- |
| **Framework** | Next.js 16 (App Router) |
| **Runtime & Package Manager** | Bun / Node.js |
| **Styling & Components** | Tailwind CSS v4, Base UI, Shadcn UI primitives, Lucide Icons |
| **Fonts** | Geist Sans & Geist Mono |
| **AI Integration** | Vercel AI SDK (`ai`, `@ai-sdk/openai`, `@ai-sdk/react`) |
| **Authentication** | Clerk (`@clerk/nextjs`) |
| **Database & ORM** | PostgreSQL, Prisma (`@prisma/client`, `@prisma/adapter-pg`) |
| **State Management** | TanStack React Query v5 |

---

## 📁 Project Structure

```text
chatflow/
├── app/
│   ├── (root)/
│   │   └── c/[id]/         # Conversation dynamic route
│   ├── api/
│   │   └── chat/           # AI streaming chat API route
│   ├── globals.css         # Vercel Black & Blue theme CSS tokens
│   ├── layout.tsx          # Root layout with dark mode theme provider
│   └── page.tsx            # Main chat interface entry point
├── components/
│   ├── ui/                 # Reusable UI primitives (bubble, message-scroller, etc.)
│   └── providers/          # Theme & Query providers
├── features/
│   ├── ai/                 # AI model utilities and chat store actions
│   ├── conversation/       # Sidebar, composer, messages, and empty state components
│   │   ├── components/
│   │   │   ├── app-sidebar.tsx
│   │   │   ├── chat-composer.tsx
│   │   │   ├── chat-empty.tsx
│   │   │   ├── chat-messages.tsx
│   │   │   └── conversation-view.tsx
│   │   └── hooks/
├── prisma/
│   └── schema.prisma       # User, Conversation, and Message database models
├── .agents/                # Custom agent skills (e.g. frontend-design)
├── package.json
└── tsconfig.json
```

---

## 🚀 Getting Started

### Prerequisites

- **Bun** (recommended) or **Node.js v18+**
- **PostgreSQL** database instance
- **Clerk** account for authentication
- **OpenAI** API Key for AI responses

### 1. Environment Setup

Create a `.env` file in the root directory:

```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/chatflow?schema=public"

# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="pk_test_..."
CLERK_SECRET_KEY="sk_test_..."
NEXT_PUBLIC_CLERK_SIGN_IN_URL="/sign-in"
NEXT_PUBLIC_CLERK_SIGN_UP_URL="/sign-up"

# OpenAI AI SDK
OPENAI_API_KEY="sk-proj-..."
```

### 2. Install Dependencies

```bash
bun install
```

### 3. Database Migration

Push the Prisma schema to your PostgreSQL database:

```bash
bun prisma db push
```

### 4. Run the Development Server

```bash
bun dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📜 Available Scripts

- `bun dev`: Starts the Next.js development server.
- `bun build`: Compiles the application for production deployment.
- `bun start`: Runs the built production server.
- `bun lint`: Executes ESLint code quality checks.

---

## 📄 License

Distributed under the MIT License. See `LICENSE` for details.
