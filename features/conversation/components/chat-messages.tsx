"use client";

import { isTextUIPart, type UIMessage } from "ai";
import type { ChatStatus } from "ai";

import {
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
import { Spinner } from "@/components/ui/spinner";

/** Extracts plain text from a `UIMessage` by joining all text parts. */
function getMessageText(message: UIMessage) {
  return message.parts
    .filter(isTextUIPart)
    .map((part) => part.text)
    .join("");
}

/** Simple regex-based markdown parser to render headings, lists, bold text, inline code, and code blocks. */
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
            <code>{code}</code>
          </pre>
        </div>
      );
    }

    const lines = part.split("\n");
    return (
      <div key={index} className="space-y-2">
        {lines.map((line, lineIdx) => {
          let content: React.ReactNode = line;

          const isBullet = line.trim().startsWith("- ") || line.trim().startsWith("* ");
          const lineText = isBullet ? line.trim().slice(2) : line;

          const codeParts = lineText.split(/(`[^`]+`)/g);
          const parsedElements = codeParts.map((subPart, subIdx) => {
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

          if (isBullet) {
            return (
              <ul key={lineIdx} className="list-disc pl-5 my-1 leading-relaxed text-foreground/90">
                <li>{parsedElements}</li>
              </ul>
            );
          }

          if (!line.trim()) {
            return <div key={lineIdx} className="h-2" />;
          }

          return (
            <p key={lineIdx} className="leading-relaxed text-foreground/90">
              {parsedElements}
            </p>
          );
        })}
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
  );
}
