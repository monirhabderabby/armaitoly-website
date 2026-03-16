"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { AnimatePresence, motion } from "framer-motion";
import React, { useCallback, useEffect, useRef, useState } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────

interface PrevInfo {
  user_query: string;
  ai_response: string;
}

interface Message {
  id: string;
  role: "user" | "ai";
  content: string;
  timestamp: Date;
}

interface ChatBotProps {
  /** Display name shown in the chat header */
  botName?: string;
  /** URL or path to the bot's avatar/logo */
  botLogo?: string;
  /** Fallback initials if no logo provided */
  botInitials?: string;
  /** Tagline shown beneath the bot name */
  tagline?: string;
  /** Accent color (CSS color string, e.g. "#6366f1" or "hsl(240,80%,60%)") */
  accentColor?: string;
  /** Placeholder text for the input */
  inputPlaceholder?: string;
  /** Initial greeting message */
  welcomeMessage?: string;
  /** Position of the launcher button */
  position?: "bottom-right" | "bottom-left";
  /** API endpoint override */
  apiEndpoint?: string;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function uid() {
  return Math.random().toString(36).slice(2, 10);
}

function formatTime(date: Date) {
  return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

// ─── Typing indicator ─────────────────────────────────────────────────────────

function TypingDots({ color }: { color: string }) {
  return (
    <div className="flex items-center gap-1 px-1 py-0.5">
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className="block h-2 w-2 rounded-full"
          style={{ background: color }}
          animate={{ y: [0, -5, 0], opacity: [0.4, 1, 0.4] }}
          transition={{
            duration: 0.9,
            repeat: Infinity,
            delay: i * 0.2,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function ChatBot({
  botName = "AI Assistant",
  botLogo,
  botInitials,
  tagline = "Ask me anything",
  accentColor = "#24a9e1",
  inputPlaceholder = "Type your message…",
  welcomeMessage = "Hello! 👋 How can I help you today?",
  position = "bottom-right",
  apiEndpoint = "https://armaitoly-website-ai-response.vercel.app/api/v1/chatbot",
}: ChatBotProps) {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: uid(),
      role: "ai",
      content: `<p>${welcomeMessage}</p>`,
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [unread, setUnread] = useState(0);
  const bottomRef = useRef<HTMLDivElement>(null);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const initials =
    botInitials ??
    botName
      .split(" ")
      .map((w) => w[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);

  // Auto-scroll to bottom — find shadcn ScrollArea's inner viewport div
  useEffect(() => {
    const viewport = scrollAreaRef.current?.querySelector(
      "[data-radix-scroll-area-viewport]",
    ) as HTMLDivElement | null;
    if (viewport) {
      viewport.scrollTop = viewport.scrollHeight;
    }
  }, [messages, loading]);

  // Focus input when chat opens; reset unread
  useEffect(() => {
    if (open) {
      setUnread(0);
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [open]);

  const sendMessage = useCallback(async () => {
    const text = input.trim();
    if (!text || loading) return;

    const userMsg: Message = {
      id: uid(),
      role: "user",
      content: text,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    // Build prev_info from existing ai↔user pairs
    // Always include at least one empty entry as required by the API
    const history: PrevInfo[] = [];
    const msgs = [...messages, userMsg];
    for (let i = 0; i < msgs.length - 1; i++) {
      if (msgs[i].role === "user" && msgs[i + 1]?.role === "ai") {
        history.push({
          user_query: msgs[i].content,
          ai_response: msgs[i + 1].content,
        });
      }
    }
    if (history.length === 0) {
      history.push({ user_query: "", ai_response: "" });
    }

    try {
      const res = await fetch(apiEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user_query: text,
          prev_info: history,
        }),
      });

      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();

      // Accept various response shapes
      const aiContent: string =
        data?.response ??
        data?.answer ??
        data?.message ??
        data?.data ??
        "<p>Sorry, I couldn't understand the response.</p>";

      const aiMsg: Message = {
        id: uid(),
        role: "ai",
        content: aiContent,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiMsg]);
      if (!open) setUnread((n) => n + 1);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: uid(),
          role: "ai",
          content:
            "<p>⚠️ Something went wrong. Please try again in a moment.</p>",
          timestamp: new Date(),
        },
      ]);
    } finally {
      setLoading(false);
    }
  }, [input, loading, messages, open, apiEndpoint]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  // ── Positioning ──────────────────────────────────────────────────────────
  const posClass =
    position === "bottom-left" ? "left-5 sm:left-8" : "right-5 sm:right-8";

  // ── Render ───────────────────────────────────────────────────────────────
  return (
    <>
      {/* Inject prose styles for AI HTML content */}
      <style>{`
        .cb-prose { font-size: 0.875rem; line-height: 1.65; color: inherit; }
        .cb-prose p { margin: 0 0 0.5em; }
        .cb-prose p:last-child { margin-bottom: 0; }
        .cb-prose ul, .cb-prose ol { padding-left: 1.25em; margin: 0 0 0.5em; }
        .cb-prose li { margin-bottom: 0.25em; }
        .cb-prose strong { font-weight: 600; }
        .cb-prose em { font-style: italic; }
        .cb-prose a { color: ${accentColor}; text-decoration: underline; }
        .cb-prose code { background: rgba(0,0,0,0.08); border-radius: 3px; padding: 0.1em 0.35em; font-size: 0.82em; font-family: monospace; }
        .cb-prose pre { background: rgba(0,0,0,0.06); border-radius: 6px; padding: 0.75em 1em; overflow-x: auto; font-size: 0.82em; margin-bottom: 0.5em; }
        .cb-prose h1,.cb-prose h2,.cb-prose h3 { font-weight: 600; margin: 0.6em 0 0.3em; }
        .cb-prose table { border-collapse: collapse; width: 100%; margin-bottom: 0.5em; font-size: 0.82em; }
        .cb-prose th, .cb-prose td { border: 1px solid rgba(0,0,0,0.15); padding: 0.3em 0.6em; text-align: left; }
        .cb-prose th { background: rgba(0,0,0,0.05); font-weight: 600; }

      `}</style>

      {/* ── Launcher Button ─────────────────────────────────────────────── */}
      <div className={`fixed bottom-6 sm:bottom-8 ${posClass} z-50`}>
        <motion.button
          onClick={() => setOpen((v) => !v)}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.93 }}
          className="relative flex h-14 w-14 items-center justify-center rounded-full shadow-2xl focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
          style={{
            background: accentColor,
            boxShadow: `0 8px 32px ${accentColor}55`,
          }}
          aria-label={open ? "Close chat" : "Open chat"}
        >
          <AnimatePresence mode="wait" initial={false}>
            {open ? (
              <motion.span
                key="close"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="text-white text-xl font-light select-none"
              >
                ✕
              </motion.span>
            ) : (
              <motion.span
                key="chat"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="text-white text-2xl select-none"
              >
                💬
              </motion.span>
            )}
          </AnimatePresence>

          {/* Unread badge */}
          <AnimatePresence>
            {unread > 0 && !open && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
                className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-rose-500 text-white text-[10px] font-bold"
              >
                {unread > 9 ? "9+" : unread}
              </motion.span>
            )}
          </AnimatePresence>
        </motion.button>
      </div>

      {/* ── Chat Window ─────────────────────────────────────────────────── */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="chat-window"
            initial={{ opacity: 0, y: 32, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 380, damping: 30 }}
            className={`fixed bottom-24 sm:bottom-28 ${posClass} z-50 flex flex-col overflow-hidden rounded-2xl shadow-2xl`}
            style={{
              width: "min(92vw, 400px)",
              height: "min(80vh, 580px)",
              background: "#ffffff",
              border: "1px solid rgba(0,0,0,0.08)",
              boxShadow: `0 24px 64px rgba(0,0,0,0.18), 0 0 0 1px rgba(0,0,0,0.04)`,
            }}
          >
            {/* Header */}
            <div
              className="flex items-center gap-3 px-4 py-3.5 shrink-0"
              style={{
                background: accentColor,
              }}
            >
              <motion.div
                initial={{ scale: 0.6, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.1, type: "spring", stiffness: 400 }}
              >
                <Avatar className="h-9 w-9 border-2 border-white/30 shadow">
                  {botLogo && <AvatarImage src={botLogo} alt={botName} />}
                  <AvatarFallback
                    className="text-sm font-bold"
                    style={{ background: `${accentColor}cc`, color: "#fff" }}
                  >
                    {initials}
                  </AvatarFallback>
                </Avatar>
              </motion.div>

              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-white leading-tight truncate">
                  {botName}
                </p>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-sm" />
                  <p className="text-xs text-white/75 truncate">{tagline}</p>
                </div>
              </div>

              <Badge
                variant="secondary"
                className="shrink-0 bg-white/20 text-white border-0 text-[10px] font-medium px-2 py-0.5"
              >
                Online
              </Badge>
            </div>

            {/* Messages */}
            <ScrollArea
              ref={scrollAreaRef}
              className="flex-1"
              style={{ background: "#f8f9fb" }}
              onWheel={(e) => e.stopPropagation()}
              onTouchMove={(e) => e.stopPropagation()}
            >
              <div className="px-4 py-4 space-y-4">
                {messages.map((msg, idx) => (
                  <motion.div
                    key={msg.id}
                    initial={{ opacity: 0, y: 10, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{
                      duration: 0.25,
                      delay: idx === 0 ? 0 : 0,
                      ease: [0.4, 0, 0.2, 1],
                    }}
                    className={`flex gap-2.5 ${
                      msg.role === "user" ? "flex-row-reverse" : "flex-row"
                    }`}
                  >
                    {/* Avatar */}
                    {msg.role === "ai" && (
                      <Avatar className="h-7 w-7 shrink-0 mt-0.5">
                        {botLogo && <AvatarImage src={botLogo} alt={botName} />}
                        <AvatarFallback
                          className="text-[10px] font-bold"
                          style={{
                            background: accentColor,
                            color: "#fff",
                          }}
                        >
                          {initials}
                        </AvatarFallback>
                      </Avatar>
                    )}

                    <div
                      className={`flex flex-col gap-1 ${
                        msg.role === "user" ? "items-end" : "items-start"
                      } max-w-[82%]`}
                    >
                      <div
                        className={`rounded-2xl px-3.5 py-2.5 text-sm shadow-sm ${
                          msg.role === "user"
                            ? "rounded-tr-sm text-white"
                            : "rounded-tl-sm bg-white text-gray-800 border border-gray-100"
                        }`}
                        style={
                          msg.role === "user"
                            ? { background: accentColor }
                            : undefined
                        }
                      >
                        {msg.role === "ai" ? (
                          <div
                            className="cb-prose"
                            dangerouslySetInnerHTML={{ __html: msg.content }}
                          />
                        ) : (
                          <p className="leading-relaxed">{msg.content}</p>
                        )}
                      </div>
                      <span className="text-[10px] text-gray-400 px-1">
                        {formatTime(msg.timestamp)}
                      </span>
                    </div>
                  </motion.div>
                ))}

                {/* Typing indicator */}
                <AnimatePresence>
                  {loading && (
                    <motion.div
                      key="typing"
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 4 }}
                      className="flex items-center gap-2.5"
                    >
                      <Avatar className="h-7 w-7 shrink-0">
                        {botLogo && <AvatarImage src={botLogo} alt={botName} />}
                        <AvatarFallback
                          className="text-[10px] font-bold"
                          style={{ background: accentColor, color: "#fff" }}
                        >
                          {initials}
                        </AvatarFallback>
                      </Avatar>
                      <div className="rounded-2xl rounded-tl-sm bg-white border border-gray-100 px-3 py-2.5 shadow-sm">
                        <TypingDots color={accentColor} />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <div ref={bottomRef} />
              </div>
            </ScrollArea>

            {/* Input Bar */}
            <div
              className="shrink-0 px-3 py-3 border-t border-gray-100 flex items-center gap-2"
              style={{ background: "#ffffff" }}
            >
              <Input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={inputPlaceholder}
                disabled={loading}
                className="flex-1 rounded-xl border-gray-200 bg-gray-50 text-sm focus-visible:ring-1 disabled:opacity-50 h-10 px-4"
                style={
                  {
                    "--tw-ring-color": accentColor,
                  } as React.CSSProperties
                }
              />
              <Button
                onClick={sendMessage}
                disabled={!input.trim() || loading}
                className="h-10 w-10 shrink-0 rounded-xl p-0 text-white transition-all active:scale-95 disabled:opacity-40"
                style={{ background: accentColor }}
                aria-label="Send message"
              >
                <motion.span
                  animate={loading ? { rotate: 360 } : { rotate: 0 }}
                  transition={
                    loading
                      ? { duration: 1, repeat: Infinity, ease: "linear" }
                      : {}
                  }
                  className="text-base"
                >
                  {loading ? "⏳" : "➤"}
                </motion.span>
              </Button>
            </div>

            {/* Powered-by footer */}
            <div className="text-center py-1.5 border-t border-gray-100">
              <p className="text-[10px] text-gray-400">
                Powered by{" "}
                <span className="font-semibold" style={{ color: accentColor }}>
                  {botName}
                </span>
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
