import { Code2Icon, ZapIcon, ClipboardCheckIcon, DatabaseIcon } from "lucide-react";

type ChatEmptyProps = {
  onSelectPrompt?: (prompt: string) => void;
};

const SUGGESTIONS = [
  {
    icon: Code2Icon,
    title: "Explain Codebase",
    tag: "ANALYSIS",
    description: "Break down a complex TypeScript React hook, middleware, or recursive routing system.",
    prompt: "Can you explain how a TypeScript custom React hook works and provide best practices for state management?",
  },
  {
    icon: ZapIcon,
    title: "Optimize Performance",
    tag: "TUNING",
    description: "Audit query bottlenecks, API round-trips, and structure server-side caching states.",
    prompt: "How can I optimize Next.js server actions and database queries to reduce latency and handle high loads?",
  },
  {
    icon: ClipboardCheckIcon,
    title: "Generate Test Suites",
    tag: "QUALITY",
    description: "Create comprehensive mock-based unit tests for React components or state reducers.",
    prompt: "Write a comprehensive set of unit tests using Vitest for a standard state reducer function.",
  },
  {
    icon: DatabaseIcon,
    title: "Draft SQL Schema",
    tag: "ARCHITECTURE",
    description: "Model relationships, junction tables, indexes, and write migration statements.",
    prompt: "Design a PostgreSQL database schema for role-based access control (RBAC) with users, roles, and permissions.",
  },
];

/** Empty-state placeholder shown before the first message is sent. */
export function ChatEmpty({ onSelectPrompt }: ChatEmptyProps) {
  return (
    <div className="flex flex-1 flex-col items-center justify-center px-4 py-12 select-none">
      <style>{`
        @keyframes pulseGlow {
          0%, 100% { transform: scale(1); opacity: 0.15; filter: blur(20px); }
          50% { transform: scale(1.15); opacity: 0.35; filter: blur(25px); }
        }
        @keyframes floatLogo {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-4px) rotate(2deg); }
        }
        @keyframes waveMotion {
          0% { stroke-dashoffset: 60; }
          100% { stroke-dashoffset: 0; }
        }
      `}</style>

      {/* Futuristic Layered SVG Logo */}
      <div className="relative mb-8 flex h-24 w-24 items-center justify-center animate-[floatLogo_4s_ease-in-out_infinite]">
        {/* Breathing backdrop glow */}
        <div className="absolute inset-0 rounded-full bg-primary/25 opacity-20 animate-[pulseGlow_5s_infinite]" />
        
        {/* Layered console borders */}
        <div className="relative flex h-20 w-20 items-center justify-center rounded-2xl border border-primary/30 bg-black/80 shadow-[0_0_30px_rgba(0,114,245,0.15)] backdrop-blur-md transition-all duration-300 hover:border-primary/50">
          <div className="absolute inset-1 rounded-[14px] border border-primary/10 bg-gradient-to-tr from-primary/5 to-transparent" />
          
          {/* Custom Flow SVG Logo */}
          <svg className="relative h-11 w-11 text-primary" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="logoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#0072F5" />
                <stop offset="50%" stopColor="#00A2FF" />
                <stop offset="100%" stopColor="#00D2FF" />
              </linearGradient>
            </defs>
            {/* Background wave */}
            <path
              d="M15,50 Q32.5,20 50,50 T85,50"
              stroke="url(#logoGrad)"
              strokeWidth="6"
              strokeLinecap="round"
              fill="none"
              opacity="0.3"
            />
            {/* Foreground flowing wave */}
            <path
              d="M15,50 Q32.5,20 50,50 T85,50"
              stroke="url(#logoGrad)"
              strokeWidth="7.5"
              strokeLinecap="round"
              fill="none"
              strokeDasharray="30 30"
              className="animate-[waveMotion_2s_linear_infinite]"
            />
            {/* Overlapping cross wave */}
            <path
              d="M15,50 Q32.5,80 50,50 T85,50"
              stroke="url(#logoGrad)"
              strokeWidth="4"
              strokeLinecap="round"
              fill="none"
              opacity="0.25"
            />
          </svg>
        </div>
      </div>

      {/* Main product branding & taglines */}
      <div className="mb-14 text-center max-w-lg">
        <h2 className="bg-gradient-to-b from-foreground via-foreground/95 to-foreground/80 bg-clip-text text-4xl font-extrabold tracking-tight text-transparent font-heading">
          ChatFlow
        </h2>
        <p className="mt-3 text-[10.5px] font-bold tracking-widest text-muted-foreground/60 uppercase">
          The Developer Intelligence Console
        </p>
        <p className="mt-4.5 text-sm text-muted-foreground/85 leading-relaxed">
          A blazing fast, minimalist terminal for code engineering, performance tuning, and technical architecture.
        </p>
      </div>

      {/* Suggestion Cards Grid */}
      <div className="grid w-full max-w-2xl grid-cols-1 gap-3.5 sm:grid-cols-2">
        {SUGGESTIONS.map((item, idx) => (
          <button
            key={idx}
            onClick={() => onSelectPrompt?.(item.prompt)}
            className="group relative flex flex-col items-start rounded-xl border border-border/60 bg-black/20 dark:bg-black/30 p-5 text-left transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/50 hover:bg-secondary/20 hover:shadow-[0_8px_30px_rgba(0,114,245,0.06)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 overflow-hidden"
          >
            {/* Card inner glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            
            <div className="flex w-full items-center justify-between mb-3.5 relative z-10">
              <div className="rounded-lg border border-border bg-secondary/50 p-2 text-muted-foreground transition-all duration-300 group-hover:border-primary/30 group-hover:bg-primary/10 group-hover:text-primary">
                <item.icon className="h-4.5 w-4.5" />
              </div>
              <span className="font-mono text-[9px] font-bold tracking-widest text-muted-foreground/40 uppercase bg-secondary/40 border border-border/40 px-2 py-0.5 rounded group-hover:text-primary/70 group-hover:border-primary/20 transition-all duration-300">
                {item.tag}
              </span>
            </div>
            
            <h3 className="text-[14.5px] font-bold tracking-tight text-foreground relative z-10 transition-colors duration-200 group-hover:text-primary">
              {item.title}
            </h3>
            <p className="mt-1.5 text-xs text-muted-foreground/75 leading-normal relative z-10">
              {item.description}
            </p>
          </button>
        ))}
      </div>
    </div>
  );
}

