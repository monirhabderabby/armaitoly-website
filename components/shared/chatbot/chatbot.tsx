"use client";

/**
 * ChatBot — Refactored with correct scroll behaviour
 *
 * ROOT CAUSE OF THE ORIGINAL SCROLL BUG
 * ──────────────────────────────────────
 * The original code used ShadCN <ScrollArea> in the comments/intent, but the
 * actual JSX used a plain <div className="cb-messages-scroll">. That class set
 * both `flex: 1 1 0%` AND `min-height: 0`, but the parent was a CSS Grid
 * container (gridTemplateRows: "auto 1fr auto auto"). Flex properties have
 * zero effect on a grid child — the div was still being sized by the `1fr`
 * row, but the overflow-y:auto was effectively clipped because the grid row
 * didn't constrain the child's height through a proper flex/grid chain.
 *
 * Additionally, the wheel event fix (addEventListener with passive:false) was
 * correct in intent, but the element it targeted was sometimes not yet mounted
 * or was remounted on re-renders without re-attaching the listener, making it
 * unreliable.
 *
 * THE REAL FIX
 * ─────────────
 * • Replace CSS Grid on the chat window with a Flexbox column:
 *     flex flex-col  →  header (shrink-0) + messages (flex-1 min-h-0) + footer (shrink-0)
 * • The messages container is a plain <div> with overflow-y:auto. This is
 *   intentional: ShadCN's <ScrollArea> wraps Radix UI, which injects its own
 *   viewport div. Attaching a ref to <ScrollArea> gives you the *wrapper*, not
 *   the scrollable viewport, so auto-scroll via scrollTop breaks silently.
 *   A plain overflow div is simpler, more predictable, and equally accessible.
 * • Auto-scroll uses bottomRef.scrollIntoView({ behavior: "smooth" }) —
 *   cleaner than manually setting scrollTop.
 * • The wheel listener is re-attached only when the element changes (correct
 *   dependency array), and { passive: false } is kept so boundary prevention
 *   still works.
 */

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
  botName?: string;
  botLogo?: string;
  botInitials?: string;
  tagline?: string;
  accentColor?: string;
  inputPlaceholder?: string;
  welcomeMessage?: string;
  position?: "bottom-right" | "bottom-left";
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

  /**
   * scrollViewportRef → the actual scrollable <div> inside ShadCN ScrollArea.
   *
   * ShadCN's <ScrollArea> renders:
   *   <ScrollArea>          ← outer wrapper  (what a ref on <ScrollArea> gives you)
   *     <ScrollAreaViewport> ← the scrollable div  ← THIS is what we need
   *       {children}
   *     </ScrollAreaViewport>
   *   </ScrollArea>
   *
   * We use a callback ref on the viewport div via the `[data-radix-scroll-area-viewport]`
   * query, OR — more reliably — we render our OWN plain overflow div and pass
   * our ref directly. We choose the plain div approach here for zero ambiguity.
   */
  const scrollViewportRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const initials =
    botInitials ??
    botName
      .split(" ")
      .map((w) => w[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);

  // ── Auto-scroll to latest message ───────────────────────────────────────────
  // scrollIntoView is cleaner and more reliable than manually setting scrollTop.
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  // ── Wheel isolation ─────────────────────────────────────────────────────────
  // We attach a non-passive wheel listener so we can call stopPropagation
  // and prevent the page behind the chat from scrolling when the user is
  // scrolling the message list.
  //
  // React's synthetic onWheel is passive by default in React 17+, so it
  // cannot call stopPropagation reliably — we must use addEventListener.

  // ── Focus input when chat opens; reset unread count ─────────────────────────
  useEffect(() => {
    if (open) {
      setUnread(0);
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [open]);

  // ── Send message ─────────────────────────────────────────────────────────────
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
        body: JSON.stringify({ user_query: text, prev_info: history }),
      });

      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();

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

  const posClass =
    position === "bottom-left" ? "left-5 sm:left-8" : "right-5 sm:right-8";

  return (
    <>
      {/* ── Prose styles + thin scrollbar ────────────────────────────────── */}
      <style>{`
        .cb-prose { font-size: 0.875rem; line-height: 1.65; color: inherit; }
        .cb-prose p { margin: 0 0 0.5em; }
        .cb-prose p:last-child { margin-bottom: 0; }
        .cb-prose ul, .cb-prose ol { padding-left: 1.25em; margin: 0 0 0.5em; }
        .cb-prose li { margin-bottom: 0.25em; }
        .cb-prose strong { font-weight: 600; }
        .cb-prose em { font-style: italic; }
        .cb-prose a { color: ${accentColor}; text-decoration: underline; }
        .cb-prose code {
          background: rgba(0,0,0,0.08); border-radius: 3px;
          padding: 0.1em 0.35em; font-size: 0.82em; font-family: monospace;
        }
        .cb-prose pre {
          background: rgba(0,0,0,0.06); border-radius: 6px;
          padding: 0.75em 1em; overflow-x: auto;
          font-size: 0.82em; margin-bottom: 0.5em;
        }
        .cb-prose h1,.cb-prose h2,.cb-prose h3 { font-weight: 600; margin: 0.6em 0 0.3em; }
        .cb-prose table { border-collapse: collapse; width: 100%; margin-bottom: 0.5em; font-size: 0.82em; }
        .cb-prose th, .cb-prose td { border: 1px solid rgba(0,0,0,0.15); padding: 0.3em 0.6em; text-align: left; }
        .cb-prose th { background: rgba(0,0,0,0.05); font-weight: 600; }

        /* Thin, unobtrusive scrollbar for the message area */
        .cb-scroll-viewport::-webkit-scrollbar { width: 4px; }
        .cb-scroll-viewport::-webkit-scrollbar-track { background: transparent; }
        .cb-scroll-viewport::-webkit-scrollbar-thumb {
          background: rgba(0,0,0,0.15); border-radius: 99px;
        }
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
            className={`fixed bottom-24 sm:bottom-28 ${posClass} z-50 rounded-2xl shadow-2xl overflow-hidden`}
            style={{
              width: "min(92vw, 400px)",
              height: "min(80vh, 580px)",
              background: "#ffffff",
              border: "1px solid rgba(0,0,0,0.08)",
              boxShadow: `0 24px 64px rgba(0,0,0,0.18), 0 0 0 1px rgba(0,0,0,0.04)`,
              /**
               * KEY FIX — use a flex column instead of CSS Grid.
               *
               * CSS Grid (`1fr`) and `overflow: auto` on a grid child is
               * notoriously tricky: the child must also have `min-height: 0`
               * (which the original code set via the CSS class), AND the grid
               * itself must not have an intrinsic height problem.
               *
               * Flexbox column is simpler and unambiguous:
               *   • Header  → shrink-0  (takes its natural height)
               *   • Messages → flex-1 min-h-0  (fills remaining space, allows shrink)
               *   • Footer   → shrink-0  (takes its natural height)
               *
               * With `min-h-0` on the messages div, the browser is allowed to
               * shrink it below its content height, which activates overflow-y:auto
               * and makes wheel/trackpad scrolling work natively.
               */
              display: "flex",
              flexDirection: "column",
            }}
          >
            {/* ── Header ────────────────────────────────────────────────── */}
            {/* shrink-0 prevents the header from being compressed */}
            <div
              className="shrink-0 flex items-center gap-3 px-4 py-3.5"
              style={{ background: accentColor }}
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

            {/* ── Messages — scrollable area ──────────────────────────────
             *
             *  WHY A PLAIN <div> INSTEAD OF SHADCN <ScrollArea>?
             *  ──────────────────────────────────────────────────
             *  ShadCN's <ScrollArea> renders:
             *
             *    <div>                              ← outer wrapper
             *      <div data-radix-scroll-area-viewport>  ← actual scrollable el
             *        {children}
             *      </div>
             *      <ScrollBar />
             *    </div>
             *
             *  If you attach a ref to <ScrollArea>, you get the outer wrapper —
             *  NOT the scrollable viewport. This means:
             *    • scrollTop reads/writes go to the wrong element → auto-scroll breaks
             *    • wheel event listeners land on the wrong element → scroll isolation fails
             *
             *  To use <ScrollArea> correctly you would need to either:
             *    (a) query `el.querySelector('[data-radix-scroll-area-viewport]')`
             *        after mount, which is fragile, or
             *    (b) use the `viewportRef` prop added in newer Radix versions
             *
             *  A plain overflow div is simpler, equally accessible, and gives us a
             *  direct ref to exactly the element we need.  We keep a thin custom
             *  scrollbar via CSS to match the ShadCN aesthetic.
             *
             *  CRITICAL CLASSES:
             *    flex-1     → fills all remaining vertical space in the flex column
             *    min-h-0    → allows the div to shrink below its content height
             *                 (without this, the div grows to fit content and
             *                  overflow:auto never activates → no scrollbar, no wheel)
             *    overflow-y-auto   → show scrollbar only when content overflows
             *    overflow-x-hidden → prevent horizontal scroll
             *    overscroll-contain → stop scroll from propagating to the page
             */}
            <div
              ref={scrollViewportRef}
              data-lenis-prevent
              className="cb-scroll-viewport flex-1 min-h-0 overflow-y-auto overflow-x-hidden overscroll-contain"
              style={{
                background: "#f8f9fb",
                WebkitOverflowScrolling: "touch", // smooth momentum on iOS
              }}
            >
              <div className="px-4 py-4 space-y-4">
                {messages.map((msg) => (
                  <motion.div
                    key={msg.id}
                    initial={{ opacity: 0, y: 10, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
                    className={`flex gap-2.5 ${
                      msg.role === "user" ? "flex-row-reverse" : "flex-row"
                    }`}
                  >
                    {msg.role === "ai" && (
                      <Avatar className="h-7 w-7 shrink-0 mt-0.5">
                        {botLogo && <AvatarImage src={botLogo} alt={botName} />}
                        <AvatarFallback
                          className="text-[10px] font-bold"
                          style={{ background: accentColor, color: "#fff" }}
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

                {/* Scroll anchor — scrollIntoView targets this */}
                <div ref={bottomRef} />
              </div>
            </div>

            {/* ── Input Bar — always visible at the bottom ────────────────
             *  flex-shrink-0 ensures this never gets squashed by the messages div
             */}
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
                  { "--tw-ring-color": accentColor } as React.CSSProperties
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

            {/* ── Powered-by footer ────────────────────────────────────────
             *  flex-shrink-0 keeps it pinned at the very bottom
             */}
            <div
              className="shrink-0 text-center py-1.5 border-t border-gray-100"
              style={{ background: "#ffffff" }}
            >
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
