"use client";

import { isTextUIPart, type UIMessage, type ChatStatus } from "ai";

import {
  MessageScrollerProvider,
  MessageScroller,
  MessageScrollerViewport,
  MessageScrollerContent,
  MessageScrollerItem,
  MessageScrollerButton,
} from "@/components/ui/message-scroller";
import {
  Message,
  MessageContent,
} from "@/components/ui/message";
import {
  Bubble,
  BubbleContent,
} from "@/components/ui/bubble";

/** Extracts plain text from a `UIMessage` by joining all text parts. */
function getMessageText(message: UIMessage) {
  return message.parts
    .filter(isTextUIPart)
    .map((part) => part.text)
    .join("");
}

/** Safe HTML escaping helper */
function escapeHtml(str: string) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

/** Client-side lightweight regex-based syntax highlighter for premium code rendering */
function highlightCode(code: string, lang: string) {
  const escaped = escapeHtml(code);
  if (!lang) return escaped;

  const lowerLang = lang.toLowerCase();

  if (["javascript", "js", "typescript", "ts", "json", "python", "py"].includes(lowerLang)) {
    return escaped
      // Comments
      .replace(/(\/\/.*|\/\*[\s\S]*?\*\/|#.*)/g, '<span class="text-zinc-500 font-normal">$1</span>')
      // Strings
      .replace(/(["'`])(.*?)\1/g, '<span class="text-emerald-400 font-medium">$1$2$1</span>')
      // Keywords
      .replace(/\b(const|let|var|function|return|import|export|from|default|class|extends|if|else|for|while|do|switch|case|break|continue|new|this|typeof|instanceof|async|await|try|catch|finally|throw|as|type|interface|enum|public|private|protected|static|readonly|keyof|def|import|as|from|print|in|is|not|and|or|lambda)\b/g, '<span class="text-violet-400 font-semibold">$1</span>')
      // Constants
      .replace(/\b(true|false|null|undefined|None)\b/g, '<span class="text-amber-400 font-semibold">$1</span>')
      // Numbers
      .replace(/\b(\d+)\b/g, '<span class="text-amber-400">$1</span>')
      // Globals
      .replace(/\b(console|log|window|document|process|globalThis|Object|Array|String|Number|Boolean|Promise|React|useState|useEffect|useMemo|useCallback)\b/g, '<span class="text-sky-400">$1</span>');
  } else if (["html", "xml", "svg"].includes(lowerLang)) {
    return escaped
      // Comments
      .replace(/(&lt;!--[\s\S]*?--&gt;)/g, '<span class="text-zinc-500 font-normal">$1</span>')
      // Tags
      .replace(/(&lt;\/?[a-zA-Z0-9:-]+)/g, '<span class="text-violet-400">$1</span>')
      // Closing tag bracket
      .replace(/(\/?&gt;)/g, '<span class="text-violet-400">$1</span>')
      // Attributes
      .replace(/\b([a-zA-Z0-9:-]+)(=)/g, '<span class="text-sky-400">$1</span>$2')
      // Attribute values
      .replace(/(["'])(.*?)\1/g, '<span class="text-emerald-400 font-medium">$1$2$1</span>');
  } else if (["css"].includes(lowerLang)) {
    return escaped
      // Comments
      .replace(/(\/\*[\s\S]*?\*\/)/g, '<span class="text-zinc-500 font-normal">$1</span>')
      // Selectors
      .replace(/^([^\{\n]+)(?=\s*\{)/gm, '<span class="text-violet-400 font-medium">$1</span>')
      // Properties
      .replace(/\b([a-zA-Z-]+)(?=\s*:)/g, '<span class="text-sky-400">$1</span>')
      // Values
      .replace(/(["'])(.*?)\1/g, '<span class="text-emerald-400 font-medium">$1$2$1</span>')
      .replace(/\b(\d+(px|rem|em|vh|vw|%|s|ms|deg)?)\b/g, '<span class="text-amber-400">$1</span>');
  }

  return escaped;
}

/** Regex-based markdown parser rendering lists, nested indentations, bolding, inline code, and syntax highlighted blocks. */
function renderMarkdown(text: string) {
  const parts = text.split(/(```[\s\S]*?```)/g);

  return parts.map((part, index) => {
    if (part.startsWith("```")) {
      const match = part.match(/```(\w*)\n([\s\S]*?)```/);
      const lang = match ? match[1] : "";
      const code = match ? match[2].trim() : part.slice(3, -3).trim();

      return (
        <div key={index} className="my-4 overflow-hidden rounded-xl border border-border bg-black font-mono text-xs shadow-md">
          <div className="flex items-center justify-between border-b border-border/80 bg-secondary/50 px-4 py-1.5 text-[11px] font-medium text-muted-foreground select-none">
            <span className="uppercase tracking-wider">{lang || "code"}</span>
            <button
              onClick={() => {
                void navigator.clipboard.writeText(code);
              }}
              className="hover:text-foreground transition-colors duration-150 active:scale-95 cursor-pointer"
            >
              Copy
            </button>
          </div>
          <pre className="overflow-x-auto p-4 leading-relaxed text-foreground/90 font-mono">
            <code dangerouslySetInnerHTML={{ __html: highlightCode(code, lang) }} />
          </pre>
        </div>
      );
    }

    const lines = part.split("\n");
    const elements: React.ReactNode[] = [];
    let currentList: React.ReactNode[] = [];

    const parseLine = (lineText: string) => {
      const codeParts = lineText.split(/(`[^`]+`)/g);
      return codeParts.map((subPart, subIdx) => {
        if (subPart.startsWith("`") && subPart.endsWith("`")) {
          return (
            <code key={subIdx} className="rounded bg-secondary border border-border/40 px-1.5 py-0.5 font-mono text-xs text-primary font-medium">
              {subPart.slice(1, -1)}
            </code>
          );
        }

        const boldParts = subPart.split(/(\*\*[^*]+\*\*)/g);
        return boldParts.map((boldPart, boldIdx) => {
          if (boldPart.startsWith("**") && boldPart.endsWith("**")) {
            return (
              <strong key={boldIdx} className="font-semibold text-foreground">
                {boldPart.slice(2, -2)}
              </strong>
            );
          }
          return boldPart;
        });
      });
    };

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      const trimmed = line.trim();

      const isBullet = trimmed.startsWith("- ") || trimmed.startsWith("* ") || trimmed.startsWith("• ");
      const isOrdered = /^\d+\.\s/.test(trimmed);

      if (isBullet || isOrdered) {
        const listText = isBullet ? trimmed.replace(/^[-*•]\s+/, "") : trimmed.replace(/^\d+\.\s+/, "");
        const parsed = parseLine(listText);

        const leadingSpaces = line.length - line.trimStart().length;
        const indentStyle = leadingSpaces > 0 ? { paddingLeft: `${leadingSpaces * 8}px` } : undefined;

        currentList.push(
          <li key={i} style={indentStyle} className="my-1.5 leading-relaxed text-foreground/90">
            {parsed}
          </li>
        );
      } else {
        if (currentList.length > 0) {
          const isPrevOrdered = /^\d+\.\s/.test(lines[i - currentList.length].trim());
          const Tag = isPrevOrdered ? "ol" : "ul";
          const listClass = isPrevOrdered ? "list-decimal pl-6 my-3 space-y-1" : "list-disc pl-6 my-3 space-y-1";
          elements.push(
            <Tag key={`list-${i}`} className={listClass}>
              {currentList}
            </Tag>
          );
          currentList = [];
        }

        if (trimmed) {
          elements.push(
            <p key={i} className="my-2.5 leading-relaxed text-foreground/90">
              {parseLine(line)}
            </p>
          );
        } else {
          elements.push(<div key={i} className="h-2" />);
        }
      }
    }

    if (currentList.length > 0) {
      const isPrevOrdered = /^\d+\.\s/.test(lines[lines.length - currentList.length].trim());
      const Tag = isPrevOrdered ? "ol" : "ul";
      const listClass = isPrevOrdered ? "list-decimal pl-6 my-3 space-y-1" : "list-disc pl-6 my-3 space-y-1";
      elements.push(
        <Tag key={`list-end`} className={listClass}>
          {currentList}
        </Tag>
      );
    }

    return (
      <div key={index} className="space-y-1">
        {elements}
      </div>
    );
  });
}

type ChatMessagesProps = {
  messages: UIMessage[];
  status: ChatStatus;
};

/**
 * Renders the conversation message list with markdown responses and a loading indicator.
 */
export function ChatMessages({ messages, status }: ChatMessagesProps) {
  const isWaiting = status === "submitted" && messages.at(-1)?.role === "user";

  return (
    <MessageScrollerProvider>
      <MessageScroller className="flex-1">
        <MessageScrollerViewport>
          <MessageScrollerContent className="py-8 px-4 max-w-3xl mx-auto w-full">
            {messages.map((message) => {
              const isUser = message.role === "user";
              return (
                <MessageScrollerItem key={message.id}>
                  <Message align={isUser ? "end" : "start"}>
                    <MessageContent>
                      <Bubble variant={isUser ? "default" : "muted"}>
                        <BubbleContent className={isUser ? "px-4 py-2.5 rounded-2xl" : "px-5 py-4 rounded-2xl border border-border/30 shadow-[0_4px_12px_rgba(0,0,0,0.15)] bg-card"}>
                          {isUser ? getMessageText(message) : renderMarkdown(getMessageText(message))}
                        </BubbleContent>
                      </Bubble>
                    </MessageContent>
                  </Message>
                </MessageScrollerItem>
              );
            })}

            {isWaiting ? (
              <MessageScrollerItem>
                <Message align="start">
                  <MessageContent>
                    <Bubble variant="muted">
                      <BubbleContent className="flex items-center justify-center px-4 py-3 rounded-2xl border border-border/30 bg-card">
                        <div className="flex items-center gap-1.5 py-1">
                          <div className="size-2 rounded-full bg-primary animate-bounce [animation-delay:-0.3s]" />
                          <div className="size-2 rounded-full bg-primary/70 animate-bounce [animation-delay:-0.15s]" />
                          <div className="size-2 rounded-full bg-primary/40 animate-bounce" />
                        </div>
                      </BubbleContent>
                    </Bubble>
                  </MessageContent>
                </Message>
              </MessageScrollerItem>
            ) : null}
          </MessageScrollerContent>
        </MessageScrollerViewport>
        <MessageScrollerButton direction="end" />
      </MessageScroller>
    </MessageScrollerProvider>
  );
}
