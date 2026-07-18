import { Code2Icon, ZapIcon, ClipboardCheckIcon, DatabaseIcon } from "lucide-react";

type ChatEmptyProps = {
  onSelectPrompt?: (prompt: string) => void;
};

const SUGGESTIONS = [
  {
    icon: Code2Icon,
    title: "Explain code",
    description: "Break down a complex TypeScript React hook or design pattern.",
    prompt: "Can you explain how a TypeScript custom React hook works and provide best practices for state management?",
  },
  {
    icon: ZapIcon,
    title: "Optimize API performance",
    description: "Find bottlenecks in a Next.js server actions database query.",
    prompt: "How can I optimize Next.js server actions and database queries to reduce latency and handle high loads?",
  },
  {
    icon: ClipboardCheckIcon,
    title: "Write unit tests",
    description: "Generate robust Vitest tests for a Redux/reducer flow.",
    prompt: "Write a comprehensive set of unit tests using Vitest for a standard state reducer function.",
  },
  {
    icon: DatabaseIcon,
    title: "Design SQL schema",
    description: "Design a PostgreSQL migration for role-based access control.",
    prompt: "Design a PostgreSQL database schema for role-based access control (RBAC) with users, roles, and permissions.",
  },
];

/** Empty-state placeholder shown before the first message is sent. */
export function ChatEmpty({ onSelectPrompt }: ChatEmptyProps) {
  return (
    <div className="flex flex-1 flex-col items-center justify-center px-4 py-8">
      {/* Vercel-style Glowing Logo */}
      <div className="relative mb-8 flex h-16 w-16 items-center justify-center">
        {/* Glow behind the logo */}
        <div className="absolute inset-0 rounded-xl bg-primary/20 blur-xl transition-all duration-500 group-hover:bg-primary/30" />
        
        {/* The geometric minimalist logo */}
        <div className="relative flex h-14 w-14 items-center justify-center rounded-xl border border-primary/30 bg-black shadow-[0_0_20px_rgba(0,114,245,0.15)] transition-all duration-300 hover:border-primary/60">
          <svg
            className="h-7 w-7 text-primary animate-pulse"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z"
            />
          </svg>
        </div>
      </div>

      {/* Main headings */}
      <div className="mb-12 text-center">
        <h2 className="bg-gradient-to-b from-foreground to-foreground/75 bg-clip-text text-3xl font-bold tracking-tight text-transparent sm:text-4xl">
          What are we building?
        </h2>
        <p className="mt-2.5 text-sm text-muted-foreground/80">
          Select a developer task below or type a custom prompt to start coding.
        </p>
      </div>

      {/* Suggestion Cards Grid */}
      <div className="grid w-full max-w-2xl grid-cols-1 gap-3 sm:grid-cols-2">
        {SUGGESTIONS.map((item, idx) => (
          <button
            key={idx}
            onClick={() => onSelectPrompt?.(item.prompt)}
            className="group flex flex-col items-start rounded-xl border border-border/50 bg-card p-4 text-left transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/40 hover:bg-secondary/40 hover:shadow-[0_4px_20px_rgba(0,114,245,0.05)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
          >
            <div className="mb-2.5 rounded-lg border border-border/50 bg-secondary p-1.5 text-muted-foreground transition-colors duration-200 group-hover:border-primary/20 group-hover:bg-primary/5 group-hover:text-primary">
              <item.icon className="h-4 w-4" />
            </div>
            <h3 className="text-sm font-semibold tracking-tight text-foreground transition-colors duration-200 group-hover:text-primary">
              {item.title}
            </h3>
            <p className="mt-1 text-xs text-muted-foreground/90 leading-normal">
              {item.description}
            </p>
          </button>
        ))}
      </div>
    </div>
  );
}

