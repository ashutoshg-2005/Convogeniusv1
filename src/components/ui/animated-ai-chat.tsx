"use client";

import * as React from "react";
import { useCallback, useEffect, useRef, useState, useTransition } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Figma,
  ImageIcon,
  LoaderIcon,
  MonitorIcon,
  SendIcon,
  Sparkles,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface UseAutoResizeTextareaProps {
  minHeight: number;
  maxHeight?: number;
}

function useAutoResizeTextarea({ minHeight, maxHeight }: UseAutoResizeTextareaProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const adjustHeight = useCallback(
    (reset?: boolean) => {
      const textarea = textareaRef.current;
      if (!textarea) return;

      if (reset) {
        textarea.style.height = `${minHeight}px`;
        return;
      }

      textarea.style.height = `${minHeight}px`;
      const newHeight = Math.max(
        minHeight,
        Math.min(textarea.scrollHeight, maxHeight ?? Number.POSITIVE_INFINITY),
      );

      textarea.style.height = `${newHeight}px`;
    },
    [minHeight, maxHeight],
  );

  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = `${minHeight}px`;
    }
  }, [minHeight]);

  useEffect(() => {
    const handleResize = () => adjustHeight();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [adjustHeight]);

  return { textareaRef, adjustHeight };
}

interface CommandSuggestion {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  prefix: string;
}

const COMMAND_SUGGESTIONS: CommandSuggestion[] = [
  { icon: ImageIcon, label: "Clone UI", prefix: "/clone" },
  { icon: Figma, label: "Import Figma", prefix: "/figma" },
  { icon: MonitorIcon, label: "Create Page", prefix: "/page" },
  { icon: Sparkles, label: "Improve", prefix: "/improve" },
];

interface AnimatedAIChatProps {
  onSendMessage?: (message: string) => Promise<void> | void;
  disabled?: boolean;
  placeholder?: string;
  className?: string;
}

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  containerClassName?: string;
  showRing?: boolean;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, containerClassName, showRing = true, ...props }, ref) => {
    const [isFocused, setIsFocused] = React.useState(false);

    return (
      <div className={cn("relative", containerClassName)}>
        <textarea
          className={cn(
            "flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm",
            "transition-all duration-200 ease-in-out",
            "placeholder:text-muted-foreground",
            "disabled:cursor-not-allowed disabled:opacity-50",
            showRing ? "focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0" : "",
            className,
          )}
          ref={ref}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          {...props}
        />

        {showRing && isFocused && (
          <motion.span
            className="pointer-events-none absolute inset-0 rounded-md ring-2 ring-primary/30"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          />
        )}
      </div>
    );
  },
);
Textarea.displayName = "Textarea";

export function AnimatedAIChat({
  onSendMessage,
  disabled,
  placeholder = "Ask a question...",
  className,
}: AnimatedAIChatProps) {
  const [value, setValue] = useState("");
  const [activeSuggestion, setActiveSuggestion] = useState<number>(-1);
  const [showCommandPalette, setShowCommandPalette] = useState(false);
  const [recentCommand, setRecentCommand] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const { textareaRef, adjustHeight } = useAutoResizeTextarea({
    minHeight: 52,
    maxHeight: 180,
  });
  const commandPaletteRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (value.startsWith("/") && !value.includes(" ")) {
      setShowCommandPalette(true);
      const matchingSuggestionIndex = COMMAND_SUGGESTIONS.findIndex((cmd) => cmd.prefix.startsWith(value));
      setActiveSuggestion(matchingSuggestionIndex >= 0 ? matchingSuggestionIndex : -1);
    } else {
      setShowCommandPalette(false);
    }
  }, [value]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;

      if (
        commandPaletteRef.current &&
        !commandPaletteRef.current.contains(target)
      ) {
        setShowCommandPalette(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSendMessage = () => {
    if (!value.trim() || disabled || isPending) return;

    const message = value.trim();
    startTransition(async () => {
      await onSendMessage?.(message);
      setValue("");
      adjustHeight(true);
    });
  };

  const selectCommandSuggestion = (index: number) => {
    const selectedCommand = COMMAND_SUGGESTIONS[index];
    setValue(`${selectedCommand.prefix} `);
    setShowCommandPalette(false);
    setRecentCommand(selectedCommand.label);
    setTimeout(() => setRecentCommand(null), 2000);
  };


  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (showCommandPalette) {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setActiveSuggestion((prev) => (prev < COMMAND_SUGGESTIONS.length - 1 ? prev + 1 : 0));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setActiveSuggestion((prev) => (prev > 0 ? prev - 1 : COMMAND_SUGGESTIONS.length - 1));
      } else if (e.key === "Tab" || e.key === "Enter") {
        e.preventDefault();
        if (activeSuggestion >= 0) {
          selectCommandSuggestion(activeSuggestion);
        }
      } else if (e.key === "Escape") {
        e.preventDefault();
        setShowCommandPalette(false);
      }
    } else if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className={cn("relative rounded-2xl border border-border bg-card", className)}>
      <AnimatePresence>
        {showCommandPalette && (
          <motion.div
            ref={commandPaletteRef}
            className="absolute bottom-full left-3 right-3 z-50 mb-2 overflow-hidden rounded-lg border border-border bg-popover shadow-lg"
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 5 }}
            transition={{ duration: 0.15 }}
          >
            <div className="py-1">
              {COMMAND_SUGGESTIONS.map((suggestion, index) => {
                const Icon = suggestion.icon;

                return (
                  <motion.div
                    key={suggestion.prefix}
                    className={cn(
                      "flex cursor-pointer items-center gap-2 px-3 py-2 text-xs transition-colors",
                      activeSuggestion === index
                        ? "bg-accent text-accent-foreground"
                        : "text-muted-foreground hover:bg-accent/60",
                    )}
                    onClick={() => selectCommandSuggestion(index)}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: index * 0.03 }}
                  >
                    <div className="flex h-5 w-5 items-center justify-center">
                      <Icon className="h-4 w-4" />
                    </div>
                    <div className="font-medium">{suggestion.label}</div>
                    <div className="ml-1 text-[11px] text-muted-foreground">{suggestion.prefix}</div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="p-3">
        <Textarea
          ref={textareaRef}
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
            adjustHeight();
          }}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          containerClassName="w-full"
          className={cn(
            "min-h-[52px] w-full resize-none border-none bg-transparent px-3 py-2 text-sm text-foreground",
            "focus:outline-none",
            "placeholder:text-muted-foreground",
          )}
          style={{ overflow: "hidden" }}
          showRing={false}
          disabled={disabled || isPending}
        />
      </div>

      <div className="flex items-center justify-end border-t border-border p-3">

        <motion.button
          type="button"
          onClick={handleSendMessage}
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.98 }}
          disabled={disabled || isPending || !value.trim()}
          className={cn(
            "flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-all",
            value.trim() && !disabled && !isPending
              ? "bg-primary text-primary-foreground"
              : "bg-muted text-muted-foreground",
          )}
        >
          {isPending ? <LoaderIcon className="h-4 w-4 animate-spin" /> : <SendIcon className="h-4 w-4" />}
          <span>Send</span>
        </motion.button>
      </div>

      <AnimatePresence>
        {recentCommand && (
          <motion.div
            className="absolute -top-3 right-3 rounded-full border border-border bg-background px-2 py-1 text-[10px] text-muted-foreground"
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
          >
            Using: {recentCommand}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
