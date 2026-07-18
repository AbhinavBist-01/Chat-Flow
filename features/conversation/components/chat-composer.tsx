"use client";

import * as React from "react";
import { ArrowUpIcon } from "lucide-react";

import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupTextarea,
} from "@/components/ui/input-group";
import { Spinner } from "@/components/ui/spinner";
import { cn } from "@/lib/utils";

type ChatComposerProps = {
  onSend: (content: string) => Promise<void> | void;
  isSending?: boolean;
  placeholder?: string;
  className?: string;
  autoFocus?: boolean;
};

/**
 * Message input form with send button. Enter sends; Shift+Enter inserts a newline.
 */
export function ChatComposer({
  onSend,
  isSending = false,
  placeholder = "Message ChaiGPT…",
  className,
  autoFocus = false,
}: ChatComposerProps) {
  const [value, setValue] = React.useState("");
  const textareaRef = React.useRef<HTMLTextAreaElement>(null);

  React.useEffect(() => {
    if (autoFocus) {
      textareaRef.current?.focus();
    }
  }, [autoFocus]);

  /** Submits the current message when the form is submitted or Enter is pressed. */
  async function handleSubmit(event?: React.FormEvent) {
    event?.preventDefault();
    const content = value.trim();
    if (!content || isSending) return;

    setValue("");
    await onSend(content);
    textareaRef.current?.focus();
  }

  /** Handles keyboard shortcuts — Enter to send, Shift+Enter for a new line. */
  function handleKeyDown(event: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      void handleSubmit();
    }
  }

  const canSend = value.trim().length > 0 && !isSending;

  return (
    <form
      onSubmit={(event) => void handleSubmit(event)}
      className={cn("mx-auto w-full max-w-3xl px-4 pb-4 md:px-6", className)}
    >
      <InputGroup className="h-auto min-h-14 rounded-2xl border border-border/80 bg-background/50 dark:bg-black/40 shadow-sm backdrop-blur-md transition-all duration-300 hover:border-border/100 focus-within:border-primary/50 focus-within:ring-2 focus-within:ring-primary/10">
        <InputGroupTextarea
          ref={textareaRef}
          value={value}
          onChange={(event) => setValue(event.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          disabled={isSending}
          rows={1}
          className="max-h-48 min-h-12 py-3.5 pl-4 text-[15px] leading-relaxed text-foreground placeholder:text-muted-foreground/60"
        />
        <InputGroupAddon align="inline-end" className="pr-2 pb-2 self-end">
          <InputGroupButton
            type="submit"
            size="icon-sm"
            disabled={!canSend}
            className={cn(
              "size-8 rounded-full transition-all duration-250",
              canSend 
                ? "bg-primary text-primary-foreground shadow-[0_0_12px_rgba(0,114,245,0.3)] hover:bg-primary/95 hover:scale-105 active:scale-95" 
                : "bg-secondary text-muted-foreground/40 opacity-70"
            )}
            aria-label="Send message"
          >
            {isSending ? <Spinner className="size-4 text-primary-foreground" /> : <ArrowUpIcon className="size-4" />}
          </InputGroupButton>
        </InputGroupAddon>
      </InputGroup>
      <p className="mt-2.5 text-center text-[10.5px] font-medium tracking-wide text-muted-foreground/50 uppercase">
        ChaiGPT Dev Mode • Press Enter to Send
      </p>
    </form>
  );
}
