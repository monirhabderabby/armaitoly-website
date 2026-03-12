"use client";
import { useEffect, useRef, useState } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────

type Theme = {
  card: { background: string; border: string; boxShadow: string };
  label: string;
  value: string;
  dimmed: string;
  divider: string;
  icon: string;
  counter: {
    border: string;
    bg: string;
    color: string;
    hoverBg: string;
    hoverBorder: string;
    hoverColor: string;
  };
};

interface CalendarProps {
  value: Date | null;
  onChange: (date: Date) => void;
  onClose: () => void;
  minDate?: Date | null;
  dropDir: "above" | "below"; // ← add
}

interface DateFieldProps {
  label: string;
  value: Date | null;
  onChange: (date: Date) => void;
  minDate?: Date | null;
  theme: Theme;
}

interface CounterFieldProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  theme: Theme;
}

interface SummaryBadgeProps {
  nights: number;
  totalGuests: number;
}

interface AvailabilityResultProps {
  available: boolean;
}

interface CheckButtonProps {
  canCheck: boolean;
  loading: boolean;
  onClick: () => void;
}

// ─── Constants ────────────────────────────────────────────────────────────────

const MONTHS: string[] = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const DAYS: string[] = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

// ─── useBreakpoint ────────────────────────────────────────────────────────────

function useBreakpoint() {
  const [width, setWidth] = useState<number>(
    typeof window !== "undefined" ? window.innerWidth : 1024,
  );
  useEffect(() => {
    const handler = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, []);
  return {
    isMobile: width < 640,
    isTablet: width >= 640 && width < 1024,
    isDesktop: width >= 1024,
    width,
  };
}

// ─── Calendar ─────────────────────────────────────────────────────────────────

function Calendar({
  value,
  onChange,
  onClose,
  minDate,
  dropDir,
}: CalendarProps) {
  const today = new Date();
  const [viewDate, setViewDate] = useState<Date>(value ?? today);
  const { isMobile } = useBreakpoint();

  const year: number = viewDate.getFullYear();
  const month: number = viewDate.getMonth();
  const firstDay: number = new Date(year, month, 1).getDay();
  const daysInMonth: number = new Date(year, month + 1, 0).getDate();

  const cells: (Date | null)[] = [
    ...Array(firstDay).fill(null),
    ...Array.from(
      { length: daysInMonth },
      (_, i) => new Date(year, month, i + 1),
    ),
  ];

  const prevMonth = () => setViewDate(new Date(year, month - 1, 1));
  const nextMonth = () => setViewDate(new Date(year, month + 1, 1));

  const isDisabled = (date: Date | null): boolean => {
    if (!date) return true;
    const floor = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate(),
    );
    if (minDate) return date < minDate;
    return date < floor;
  };

  const isSelected = (date: Date | null): boolean =>
    !!(
      date &&
      value &&
      date.getFullYear() === value.getFullYear() &&
      date.getMonth() === value.getMonth() &&
      date.getDate() === value.getDate()
    );

  return (
    <div
      style={{
        position: "absolute",
        ...(dropDir === "below"
          ? { top: "calc(100% + 8px)", bottom: "auto" }
          : { bottom: "calc(100% + 8px)", top: "auto" }),
        left: isMobile ? "50%" : 0,
        transform: isMobile ? "translateX(-50%)" : "none",

        background: "rgba(10,10,18,0.97)",
        border: "1px solid rgba(255,255,255,0.08)",
        borderRadius: "16px",
        padding: "16px",
        width: isMobile ? "calc(100vw - 40px)" : "268px",
        maxWidth: "300px",
        boxShadow:
          "0 24px 64px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.04)",
        backdropFilter: "blur(20px)",
        zIndex: 99999,
      }}
    >
      {/* Month nav */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "12px",
        }}
      >
        {[prevMonth, nextMonth].map((fn, i) => (
          <button
            key={i}
            onClick={fn}
            style={{
              background: "none",
              border: "none",
              color: "rgba(255,255,255,0.4)",
              cursor: "pointer",
              fontSize: "16px",
              padding: "3px 7px",
              borderRadius: "6px",
              fontFamily: "inherit",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#fff")}
            onMouseLeave={(e) =>
              (e.currentTarget.style.color = "rgba(255,255,255,0.4)")
            }
          >
            {i === 0 ? "‹" : "›"}
          </button>
        ))}
        <span
          style={{
            color: "#fff",
            fontSize: "13px",
            fontWeight: 600,
            letterSpacing: "0.4px",
          }}
        >
          {MONTHS[month]} {year}
        </span>
      </div>

      {/* Day headers */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(7,1fr)",
          gap: "2px",
          marginBottom: "6px",
        }}
      >
        {DAYS.map((d) => (
          <div
            key={d}
            style={{
              textAlign: "center",
              fontSize: "10px",
              color: "rgba(255,255,255,0.3)",
              padding: "3px 0",
              fontWeight: 600,
              letterSpacing: "0.4px",
            }}
          >
            {d}
          </div>
        ))}
      </div>

      {/* Date cells */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(7,1fr)",
          gap: "2px",
        }}
      >
        {cells.map((date, i) => {
          const disabled = isDisabled(date);
          const selected = isSelected(date);
          return (
            <button
              key={i}
              disabled={disabled || !date}
              onClick={() => {
                if (date && !disabled) {
                  onChange(date);
                  onClose();
                }
              }}
              style={{
                background: selected
                  ? "linear-gradient(135deg,#24a9e1,#1a8fc0)"
                  : "none",
                border: "none",
                borderRadius: "6px",
                color: !date
                  ? "transparent"
                  : disabled
                    ? "rgba(255,255,255,0.15)"
                    : selected
                      ? "#fff"
                      : "rgba(255,255,255,0.8)",
                cursor: disabled || !date ? "default" : "pointer",
                fontSize: "12px",
                padding: "6px 0",
                fontWeight: selected ? 700 : 400,
                transition: "background 0.15s, color 0.15s",
                fontFamily: "inherit",
              }}
              onMouseEnter={(e) => {
                if (!disabled && date && !selected)
                  e.currentTarget.style.background = "rgba(36,169,225,0.15)";
              }}
              onMouseLeave={(e) => {
                if (!disabled && date && !selected)
                  e.currentTarget.style.background = "none";
              }}
            >
              {date ? date.getDate() : ""}
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ─── DateField ────────────────────────────────────────────────────────────────

function DateField({ label, value, onChange, minDate, theme }: DateFieldProps) {
  const [open, setOpen] = useState<boolean>(false);
  const [dropDir, setDropDir] = useState<"above" | "below">("below");
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node))
        setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleOpen = () => {
    if (!open && ref.current) {
      const rect = ref.current.getBoundingClientRect();
      const calendarHeight = 320;
      const spaceBelow = window.innerHeight - rect.bottom;
      const spaceAbove = rect.top;
      setDropDir(
        spaceBelow >= calendarHeight
          ? "below"
          : spaceAbove >= calendarHeight
            ? "above"
            : spaceBelow >= spaceAbove
              ? "below"
              : "above",
      );
    }
    setOpen((o) => !o);
  };

  const fmt = (d: Date | null): string | null =>
    d
      ? d.toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        })
      : null;

  return (
    // In DateField's outer div:
    <div
      ref={ref}
      style={{
        position: "relative",
        flex: 1,
        minWidth: 0,
        zIndex: open ? 9999 : 1, // ← bump to 9999
        isolation: "isolate", // ← creates new stacking context
      }}
      suppressHydrationWarning
    >
      <div
        style={{
          fontSize: "9px",
          fontWeight: 700,
          letterSpacing: "1.2px",
          color: theme.label,
          textTransform: "uppercase",
          marginBottom: "4px",
        }}
      >
        {label}
      </div>
      <button
        onClick={handleOpen}
        style={{
          width: "100%",
          background: "none",
          border: "none",
          padding: 0,
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          gap: "7px",
          textAlign: "left",
        }}
      >
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke={open ? "#24a9e1" : theme.icon}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{ transition: "stroke 0.2s", flexShrink: 0 }}
        >
          <rect x="3" y="4" width="18" height="18" rx="2" />
          <line x1="16" y1="2" x2="16" y2="6" />
          <line x1="8" y1="2" x2="8" y2="6" />
          <line x1="3" y1="10" x2="21" y2="10" />
        </svg>
        <span
          style={{
            fontSize: "13px",
            fontWeight: value ? 500 : 400,
            color: value ? theme.value : theme.dimmed,
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
            transition: "color 0.2s",
          }}
        >
          {fmt(value) ?? "Select date"}
        </span>
      </button>
      {open && (
        <Calendar
          value={value}
          onChange={onChange}
          onClose={() => setOpen(false)}
          minDate={minDate}
          dropDir={dropDir}
        />
      )}
    </div>
  );
}

// ─── CounterField ─────────────────────────────────────────────────────────────

function CounterField({
  label,
  value,
  onChange,
  min = 0,
  max = 10,
  theme,
}: CounterFieldProps) {
  const btnBase: React.CSSProperties = {
    width: "26px",
    height: "26px",
    borderRadius: "50%",
    border: `1px solid ${theme.counter.border}`,
    background: theme.counter.bg,
    color: theme.counter.color,
    cursor: "pointer",
    fontSize: "14px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "all 0.2s",
    fontFamily: "inherit",
    lineHeight: 1,
    flexShrink: 0,
  };
  const hoverIn = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.currentTarget.style.background = theme.counter.hoverBg;
    e.currentTarget.style.borderColor = theme.counter.hoverBorder;
    e.currentTarget.style.color = theme.counter.hoverColor;
  };
  const hoverOut = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.currentTarget.style.background = theme.counter.bg;
    e.currentTarget.style.borderColor = theme.counter.border;
    e.currentTarget.style.color = theme.counter.color;
  };

  return (
    <div style={{ flexShrink: 0 }}>
      <div
        style={{
          fontSize: "9px",
          fontWeight: 700,
          letterSpacing: "1.2px",
          color: theme.label,
          textTransform: "uppercase",
          marginBottom: "4px",
        }}
      >
        {label}
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        <button
          onClick={() => onChange(Math.max(min, value - 1))}
          style={btnBase}
          onMouseEnter={hoverIn}
          onMouseLeave={hoverOut}
        >
          −
        </button>
        <span
          style={{
            fontSize: "15px",
            fontWeight: 600,
            color: theme.value,
            minWidth: "18px",
            textAlign: "center",
          }}
        >
          {value}
        </span>
        <button
          onClick={() => onChange(Math.min(max, value + 1))}
          style={btnBase}
          onMouseEnter={hoverIn}
          onMouseLeave={hoverOut}
        >
          +
        </button>
      </div>
    </div>
  );
}

// ─── Dividers ─────────────────────────────────────────────────────────────────

function HDivider({ theme }: { theme: Theme }) {
  return (
    <div style={{ width: "100%", height: "1px", background: theme.divider }} />
  );
}

function VDivider({ theme }: { theme: Theme }) {
  return (
    <div
      style={{
        width: "1px",
        height: "36px",
        background: theme.divider,
        flexShrink: 0,
      }}
    />
  );
}

// ─── SummaryBadge ─────────────────────────────────────────────────────────────

function SummaryBadge({ nights, totalGuests }: SummaryBadgeProps) {
  return (
    <div
      style={{
        background: "rgba(36,169,225,0.08)",
        border: "1px solid rgba(36,169,225,0.2)",
        borderRadius: "8px",
        padding: "6px 14px",
        color: "#24a9e1",
        fontSize: "12px",
        fontWeight: 500,
      }}
    >
      {nights} night{nights !== 1 ? "s" : ""} · {totalGuests} guest
      {totalGuests !== 1 ? "s" : ""}
    </div>
  );
}

// ─── AvailabilityResult ───────────────────────────────────────────────────────

function AvailabilityResult({ available }: AvailabilityResultProps) {
  return (
    <div
      style={{
        background: available
          ? "rgba(52,211,153,0.08)"
          : "rgba(239,68,68,0.08)",
        border: `1px solid ${available ? "rgba(52,211,153,0.2)" : "rgba(239,68,68,0.2)"}`,
        borderRadius: "8px",
        padding: "6px 14px",
        color: available ? "#34d399" : "#f87171",
        fontSize: "12px",
        fontWeight: 500,
        display: "flex",
        alignItems: "center",
        gap: "6px",
      }}
    >
      {available ? (
        <>
          <svg
            width="13"
            height="13"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="20 6 9 17 4 12" />
          </svg>
          Rooms available for your dates
        </>
      ) : (
        <>
          <svg
            width="13"
            height="13"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
          No availability for these dates
        </>
      )}
    </div>
  );
}

// ─── CheckButton ──────────────────────────────────────────────────────────────

function CheckButton({ canCheck, loading, onClick }: CheckButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={!canCheck || loading}
      style={{
        width: "100%",
        padding: "11px 22px",
        background: canCheck ? "#24a9e1" : "rgba(255,255,255,0.04)",
        border: canCheck ? "none" : "1px solid rgba(255,255,255,0.08)",
        borderRadius: "12px",
        color: canCheck ? "#fff" : "rgba(255,255,255,0.2)",
        fontSize: "13px",
        fontWeight: 600,
        cursor: canCheck ? "pointer" : "not-allowed",
        letterSpacing: "0.3px",
        transition: "all 0.25s",
        whiteSpace: "nowrap",
        boxShadow: canCheck ? "0 6px 20px rgba(36,169,225,0.35)" : "none",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "7px",
        fontFamily: "inherit",
      }}
      onMouseEnter={(e) => {
        if (canCheck) {
          e.currentTarget.style.transform = "translateY(-1px)";
          e.currentTarget.style.boxShadow = "0 10px 28px rgba(36,169,225,0.5)";
        }
      }}
      onMouseLeave={(e) => {
        if (canCheck) {
          e.currentTarget.style.transform = "";
          e.currentTarget.style.boxShadow = "0 6px 20px rgba(36,169,225,0.35)";
        }
      }}
    >
      {loading ? (
        <>
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            style={{ animation: "spin 1s linear infinite" }}
          >
            <path d="M21 12a9 9 0 1 1-6.219-8.56" />
          </svg>
          Checking…
        </>
      ) : (
        "Check Availability"
      )}
    </button>
  );
}

// ─── Exported Data Interface ──────────────────────────────────────────────────

export interface AvailabilityCheckData {
  checkIn: Date;
  checkOut: Date;
  adults: number;
  children: number;
  nights: number;
  totalGuests: number;
}

// ─── Props ────────────────────────────────────────────────────────────────────

interface AvailabilityCheckerProps {
  onCheck: (data: AvailabilityCheckData) => void;
  loading?: boolean;
  variant?: "glass" | "solid";
  defaultCheckIn?: Date | null;
  defaultCheckOut?: Date | null;
  defaultAdults?: number;
  defaultChildren?: number;
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function AvailabilityChecker({
  onCheck,
  loading: externalLoading,
  variant = "glass",
  defaultCheckIn = null,
  defaultCheckOut = null,
  defaultAdults = 2,
  defaultChildren = 0,
}: AvailabilityCheckerProps) {
  const [checkIn, setCheckIn] = useState<Date | null>(defaultCheckIn);
  const [checkOut, setCheckOut] = useState<Date | null>(defaultCheckOut);
  const [adults, setAdults] = useState<number>(defaultAdults);
  const [children, setChildren] = useState<number>(defaultChildren);
  const [checked, setChecked] = useState<boolean>(false);

  const isLoading = externalLoading ?? false;
  const { isMobile, isTablet, isDesktop } = useBreakpoint();

  // ─── Theme ──────────────────────────────────────────────────────────────────

  const theme: Theme = {
    card:
      variant === "solid"
        ? {
            background: "#ffffff",
            border: "1px solid #e5e7eb",
            boxShadow:
              "0 4px 24px rgba(0,0,0,0.07), inset 0 1px 0 rgba(255,255,255,0.9)",
          }
        : {
            background: "rgba(255,255,255,0.03)",
            border: "1px solid rgba(255,255,255,0.07)",
            boxShadow:
              "0 32px 80px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.06)",
          },
    label: variant === "solid" ? "#9ca3af" : "rgba(255,255,255,0.35)",
    value: variant === "solid" ? "#111827" : "#ffffff",
    dimmed: variant === "solid" ? "#d1d5db" : "rgba(255,255,255,0.3)",
    divider: variant === "solid" ? "#f3f4f6" : "rgba(255,255,255,0.07)",
    icon: variant === "solid" ? "#9ca3af" : "rgba(255,255,255,0.35)",
    counter: {
      border: variant === "solid" ? "#e5e7eb" : "rgba(255,255,255,0.12)",
      bg: variant === "solid" ? "#f9fafb" : "rgba(255,255,255,0.05)",
      color: variant === "solid" ? "#6b7280" : "rgba(255,255,255,0.6)",
      hoverBg:
        variant === "solid" ? "rgba(36,169,225,0.08)" : "rgba(36,169,225,0.15)",
      hoverBorder: "#24a9e1",
      hoverColor: "#24a9e1",
    },
  };

  // ─── Handlers ───────────────────────────────────────────────────────────────

  const handleCheckIn = (date: Date): void => {
    setCheckIn(date);
    if (checkOut && date >= checkOut) setCheckOut(null);
  };

  const handleCheck = (): void => {
    if (!checkIn || !checkOut) return;
    setChecked(true);
    onCheck({
      checkIn,
      checkOut,
      adults,
      children,
      nights: Math.max(
        0,
        Math.round((checkOut.getTime() - checkIn.getTime()) / 86400000),
      ),
      totalGuests: adults + children,
    });
  };

  const nights: number | null =
    checkIn && checkOut
      ? Math.max(
          0,
          Math.round((checkOut.getTime() - checkIn.getTime()) / 86400000),
        )
      : null;

  const canCheck: boolean = !!(checkIn && checkOut && checkOut > checkIn);
  const totalGuests: number = adults + children;
  const checkOutMin: Date | null = checkIn
    ? new Date(checkIn.getTime() + 86400000)
    : null;

  const layoutProps: LayoutProps = {
    checkIn,
    checkOut,
    adults,
    children,
    canCheck,
    isLoading,
    checkOutMin,
    theme,
    handleCheckIn,
    setCheckOut,
    setAdults,
    setChildren,
    handleCheck,
    cardBase: (extra) => cardBase(theme, extra),
  };

  // ─── Render ──────────────────────────────────────────────────────────────────

  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      {/* Ambient glows — only for glass variant */}
      {variant === "glass" && (
        <>
          <div
            style={{
              position: "fixed",
              top: "20%",
              left: "30%",
              width: "500px",
              height: "400px",
              background:
                "radial-gradient(ellipse,rgba(36,169,225,0.1) 0%,transparent 70%)",
              pointerEvents: "none",
            }}
          />
          <div
            style={{
              position: "fixed",
              bottom: "25%",
              right: "25%",
              width: "400px",
              height: "300px",
              background:
                "radial-gradient(ellipse,rgba(56,130,246,0.07) 0%,transparent 70%)",
              pointerEvents: "none",
            }}
          />
        </>
      )}

      {/* Responsive layout */}
      <div style={{ width: "100%", maxWidth: isDesktop ? "860px" : "100%" }}>
        {isMobile && <MobileLayout {...layoutProps} />}
        {isTablet && <TabletLayout {...layoutProps} />}
        {isDesktop && <DesktopLayout {...layoutProps} />}
      </div>

      {/* Result badges */}
      {(nights !== null || checked) && (
        <div
          style={{
            marginTop: "14px",
            display: "flex",
            gap: "10px",
            flexWrap: "wrap",
            justifyContent: "center",
            animation: "fadeUp 0.4s ease both",
          }}
        >
          {nights !== null && nights > 0 && (
            <SummaryBadge nights={nights} totalGuests={totalGuests} />
          )}
          {checked && <AvailabilityResult available={true} />}
        </div>
      )}

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&display=swap');
        @keyframes spin    { to { transform: rotate(360deg); } }
        @keyframes fadeUp  { from { opacity:0; transform:translateY(8px); } to { opacity:1; transform:translateY(0); } }
        * { box-sizing: border-box; }
      `}</style>
    </div>
  );
}

// In cardBase function, add overflow visible:
function cardBase(
  theme: Theme,
  extra: React.CSSProperties,
): React.CSSProperties {
  return {
    ...theme.card,
    backdropFilter: "blur(24px)",
    position: "relative",
    width: "100%",
    overflow: "visible", // ← critical
    ...extra,
  };
}

interface LayoutProps {
  checkIn: Date | null;
  checkOut: Date | null;
  adults: number;
  children: number;
  canCheck: boolean;
  isLoading: boolean;
  checkOutMin: Date | null;
  theme: Theme;
  handleCheckIn: (date: Date) => void;
  setCheckOut: (date: Date) => void;
  setAdults: (n: number) => void;
  setChildren: (n: number) => void;
  handleCheck: () => void;
  cardBase: (extra: React.CSSProperties) => React.CSSProperties;
}

function MobileLayout({
  checkIn,
  checkOut,
  adults,
  children,
  canCheck,
  isLoading,
  checkOutMin,
  theme,
  handleCheckIn,
  setCheckOut,
  setAdults,
  setChildren,
  handleCheck,
  cardBase,
}: LayoutProps) {
  return (
    <div
      style={cardBase({
        borderRadius: "18px",
        padding: "16px",
        display: "flex",
        flexDirection: "column",
        gap: "12px",
      })}
    >
      <DateField
        label="Check-in"
        value={checkIn}
        onChange={handleCheckIn}
        theme={theme}
      />
      <HDivider theme={theme} />
      <DateField
        label="Check-out"
        value={checkOut}
        onChange={setCheckOut}
        theme={theme}
        minDate={checkOutMin}
      />
      <HDivider theme={theme} />
      <div
        style={{
          display: "flex",
          gap: "16px",
          justifyContent: "space-between",
        }}
      >
        <CounterField
          label="Adults"
          value={adults}
          onChange={setAdults}
          theme={theme}
          min={1}
          max={12}
        />
        <CounterField
          label="Children"
          value={children}
          onChange={setChildren}
          theme={theme}
          min={0}
          max={8}
        />
      </div>
      <HDivider theme={theme} />
      <CheckButton
        canCheck={canCheck}
        loading={isLoading}
        onClick={handleCheck}
      />
    </div>
  );
}

function TabletLayout({
  checkIn,
  checkOut,
  adults,
  children,
  canCheck,
  isLoading,
  checkOutMin,
  theme,
  handleCheckIn,
  setCheckOut,
  setAdults,
  setChildren,
  handleCheck,
  cardBase,
}: LayoutProps) {
  return (
    <div
      style={cardBase({
        borderRadius: "20px",
        padding: "18px 20px",
        display: "flex",
        flexDirection: "column",
        gap: "14px",
      })}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1px 1fr",
          alignItems: "center",
          position: "relative", // ← add
          zIndex: 1, // ← add
          overflow: "visible", // ← add
        }}
      >
        <div style={{ paddingRight: "16px", position: "relative", zIndex: 1 }}>
          <DateField
            label="Check-in"
            value={checkIn}
            onChange={handleCheckIn}
            theme={theme}
          />
        </div>
        <VDivider theme={theme} />
        <div style={{ paddingRight: "16px", position: "relative", zIndex: 1 }}>
          <DateField
            label="Check-out"
            value={checkOut}
            onChange={setCheckOut}
            theme={theme}
            minDate={checkOutMin}
          />
        </div>
      </div>
      <HDivider theme={theme} />
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "16px",
          flexWrap: "wrap",
        }}
      >
        <CounterField
          label="Adults"
          value={adults}
          onChange={setAdults}
          theme={theme}
          min={1}
          max={12}
        />
        <VDivider theme={theme} />
        <CounterField
          label="Children"
          value={children}
          onChange={setChildren}
          theme={theme}
          min={0}
          max={8}
        />
        <div style={{ flex: 1, minWidth: "150px" }}>
          <CheckButton
            canCheck={canCheck}
            loading={isLoading}
            onClick={handleCheck}
          />
        </div>
      </div>
    </div>
  );
}

function DesktopLayout({
  checkIn,
  checkOut,
  adults,
  children,
  canCheck,
  isLoading,
  checkOutMin,
  theme,
  handleCheckIn,
  setCheckOut,
  setAdults,
  setChildren,
  handleCheck,
  cardBase,
}: LayoutProps) {
  return (
    <div
      style={cardBase({
        borderRadius: "20px",
        padding: "18px 24px",
        maxWidth: "860px",
        display: "flex",
        alignItems: "center",
        gap: "16px",
        flexWrap: "nowrap",
      })}
    >
      <DateField
        label="Check-in"
        value={checkIn}
        onChange={handleCheckIn}
        theme={theme}
      />
      <VDivider theme={theme} />
      <DateField
        label="Check-out"
        value={checkOut}
        onChange={setCheckOut}
        theme={theme}
        minDate={checkOutMin}
      />
      <VDivider theme={theme} />
      <CounterField
        label="Adults"
        value={adults}
        onChange={setAdults}
        theme={theme}
        min={1}
        max={12}
      />
      <VDivider theme={theme} />
      <CounterField
        label="Children"
        value={children}
        onChange={setChildren}
        theme={theme}
        min={0}
        max={8}
      />
      <div style={{ marginLeft: "auto", flexShrink: 0 }}>
        <button
          onClick={handleCheck}
          disabled={!canCheck || isLoading}
          style={{
            padding: "11px 22px",
            background: canCheck ? "#24a9e1" : "rgba(255,255,255,0.04)",
            border: canCheck ? "none" : "1px solid rgba(255,255,255,0.08)",
            borderRadius: "12px",
            color: canCheck ? "#fff" : "rgba(255,255,255,0.2)",
            fontSize: "13px",
            fontWeight: 600,
            cursor: canCheck ? "pointer" : "not-allowed",
            letterSpacing: "0.3px",
            transition: "all 0.25s",
            whiteSpace: "nowrap",
            boxShadow: canCheck ? "0 6px 20px rgba(36,169,225,0.35)" : "none",
            display: "flex",
            alignItems: "center",
            gap: "7px",
            fontFamily: "inherit",
          }}
          onMouseEnter={(e) => {
            if (canCheck) {
              e.currentTarget.style.transform = "translateY(-1px)";
              e.currentTarget.style.boxShadow =
                "0 10px 28px rgba(36,169,225,0.5)";
            }
          }}
          onMouseLeave={(e) => {
            if (canCheck) {
              e.currentTarget.style.transform = "";
              e.currentTarget.style.boxShadow =
                "0 6px 20px rgba(36,169,225,0.35)";
            }
          }}
        >
          {isLoading ? (
            <>
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                style={{ animation: "spin 1s linear infinite" }}
              >
                <path d="M21 12a9 9 0 1 1-6.219-8.56" />
              </svg>
              Checking…
            </>
          ) : (
            "Check Availability"
          )}
        </button>
      </div>
    </div>
  );
}
