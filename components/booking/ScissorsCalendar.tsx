"use client";

import { useState, useRef, useCallback, useMemo } from "react";
import { motion, useAnimation } from "framer-motion";

interface Props {
  value: Date | null;
  onChange: (d: Date) => void;
}

const DAY_HEADERS = ["L", "M", "X", "J", "V", "S", "D"];
const MONTH_NAMES = [
  "ENERO", "FEBRERO", "MARZO", "ABRIL", "MAYO", "JUNIO",
  "JULIO", "AGOSTO", "SEPTIEMBRE", "OCTUBRE", "NOVIEMBRE", "DICIEMBRE",
];

function getDaysInMonth(year: number, month: number): number {
  return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfMonth(year: number, month: number): number {
  // 0=Sun, we want 0=Mon
  const day = new Date(year, month, 1).getDay();
  return day === 0 ? 6 : day - 1;
}

interface CutState {
  dayNum: number;
  phase: "idle" | "slicing" | "settling";
}

export default function ScissorsCalendar({ value, onChange }: Props) {
  const today = useMemo(() => {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    return d;
  }, []);

  const [viewYear, setViewYear] = useState(today.getFullYear());
  const [viewMonth, setViewMonth] = useState(today.getMonth());
  const [scissorsVisible, setScissorsVisible] = useState(false);
  const [scissorsY, setScissorsY] = useState(0);
  const [cutState, setCutState] = useState<CutState>({ dayNum: -1, phase: "idle" });
  const containerRef = useRef<HTMLDivElement>(null);
  const scissorsControls = useAnimation();
  const isAnimatingRef = useRef(false);

  const daysInMonth = getDaysInMonth(viewYear, viewMonth);
  const firstDayOffset = getFirstDayOfMonth(viewYear, viewMonth);

  const isToday = (day: number) => {
    return (
      day === today.getDate() &&
      viewMonth === today.getMonth() &&
      viewYear === today.getFullYear()
    );
  };

  const isPast = (day: number) => {
    const d = new Date(viewYear, viewMonth, day);
    return d < today;
  };

  const isSelected = (day: number) => {
    if (!value) return false;
    const v = new Date(value);
    v.setHours(0, 0, 0, 0);
    return (
      day === v.getDate() &&
      viewMonth === v.getMonth() &&
      viewYear === v.getFullYear()
    );
  };

  const canGoBack = () => {
    return viewYear > today.getFullYear() || viewMonth > today.getMonth();
  };

  const goBack = () => {
    if (!canGoBack()) return;
    if (viewMonth === 0) {
      setViewMonth(11);
      setViewYear((y) => y - 1);
    } else {
      setViewMonth((m) => m - 1);
    }
  };

  const goForward = () => {
    if (viewMonth === 11) {
      setViewMonth(0);
      setViewYear((y) => y + 1);
    } else {
      setViewMonth((m) => m + 1);
    }
  };

  const handleDayClick = useCallback(
    async (day: number, cellEl: HTMLElement) => {
      // Use ref to avoid stale closure issue with isAnimating state
      if (isAnimatingRef.current) return;

      const container = containerRef.current;
      if (!container) return;

      isAnimatingRef.current = true;

      const containerRect = container.getBoundingClientRect();
      const cellRect = cellEl.getBoundingClientRect();

      const cellX = cellRect.left - containerRect.left;
      const cellY = cellRect.top - containerRect.top + cellRect.height / 2 - 15;
      const containerWidth = containerRect.width;

      // Set vertical position for scissors, show them
      setScissorsY(cellY);
      setScissorsVisible(true);

      // Snap to start position
      await scissorsControls.set({ x: -80, opacity: 1 });

      // Fly to cell center (500ms)
      const flyPromise = scissorsControls.start({
        x: cellX + cellRect.width / 2 - 30,
        opacity: 1,
        transition: { duration: 0.5, ease: "easeOut" },
      });

      // At ~80% = 400ms, trigger the slice cut effect on the cell
      setTimeout(() => {
        setCutState({ dayNum: day, phase: "slicing" });
        setTimeout(() => {
          setCutState({ dayNum: day, phase: "settling" });
          setTimeout(() => {
            setCutState({ dayNum: -1, phase: "idle" });
          }, 200);
        }, 150);
      }, 400);

      await flyPromise;

      // Continue off-screen and fade out (300ms)
      await scissorsControls.start({
        x: containerWidth + 80,
        opacity: 0,
        transition: { duration: 0.3, ease: "easeIn" },
      });

      setScissorsVisible(false);
      isAnimatingRef.current = false;

      // Commit selection after animation completes
      onChange(new Date(viewYear, viewMonth, day));
    },
    [viewYear, viewMonth, scissorsControls, onChange]
  );

  // Build calendar grid cells
  const totalCells = Math.ceil((firstDayOffset + daysInMonth) / 7) * 7;
  const cells: (number | null)[] = [];
  for (let i = 0; i < totalCells; i++) {
    const dayNum = i - firstDayOffset + 1;
    cells.push(dayNum >= 1 && dayNum <= daysInMonth ? dayNum : null);
  }

  return (
    <div ref={containerRef} style={{ position: "relative", userSelect: "none" }}>
      {/* Scissors SVG - absolutely positioned, animated by framer-motion */}
      {scissorsVisible && (
        <motion.div
          animate={scissorsControls}
          style={{
            position: "absolute",
            top: scissorsY,
            left: 0,
            zIndex: 20,
            pointerEvents: "none",
            width: "60px",
            height: "30px",
          }}
        >
          <ScissorsSVG />
        </motion.div>
      )}

      {/* Month Navigator */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: "1.25rem",
        }}
      >
        <button
          onClick={goBack}
          disabled={!canGoBack()}
          style={{
            background: "none",
            border: "none",
            cursor: canGoBack() ? "pointer" : "not-allowed",
            color: canGoBack() ? "var(--gold)" : "var(--white-mute)",
            padding: "8px",
            fontSize: "1.2rem",
            transition: "color 0.2s",
            lineHeight: 1,
          }}
          aria-label="Mes anterior"
        >
          ‹
        </button>

        <div
          style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: "1.5rem",
            letterSpacing: "0.12em",
            color: "var(--white)",
          }}
        >
          {MONTH_NAMES[viewMonth]}{" "}
          <span style={{ color: "var(--gold)", fontSize: "1.2rem" }}>{viewYear}</span>
        </div>

        <button
          onClick={goForward}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            color: "var(--gold)",
            padding: "8px",
            fontSize: "1.2rem",
            transition: "color 0.2s",
            lineHeight: 1,
          }}
          aria-label="Mes siguiente"
          onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.color = "var(--gold-bright)")}
          onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.color = "var(--gold)")}
        >
          ›
        </button>
      </div>

      {/* Day headers */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(7, 1fr)",
          gap: "2px",
          marginBottom: "4px",
        }}
      >
        {DAY_HEADERS.map((h) => (
          <div
            key={h}
            style={{
              textAlign: "center",
              fontFamily: "'Rajdhani', sans-serif",
              fontWeight: 700,
              fontSize: "0.75rem",
              letterSpacing: "0.12em",
              color: "var(--gold)",
              textTransform: "uppercase",
              padding: "6px 0",
            }}
          >
            {h}
          </div>
        ))}
      </div>

      {/* Calendar grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(7, 1fr)",
          gap: "2px",
        }}
      >
        {cells.map((day, idx) => {
          if (day === null) {
            return <div key={`empty-${idx}`} style={{ minHeight: "40px" }} />;
          }

          const past = isPast(day);
          const todayCell = isToday(day);
          const selectedCell = isSelected(day);
          const isSlicing = cutState.dayNum === day && cutState.phase === "slicing";
          const isSettling = cutState.dayNum === day && cutState.phase === "settling";

          return (
            <DayCell
              key={`day-${day}`}
              day={day}
              past={past}
              todayCell={todayCell}
              selectedCell={selectedCell}
              isSlicing={isSlicing}
              isSettling={isSettling}
              onClick={handleDayClick}
            />
          );
        })}
      </div>

      <style>{`
        @keyframes goldPulseDay {
          0%, 100% { box-shadow: 0 0 0 0 rgba(201,168,76,0); }
          50%       { box-shadow: 0 0 14px 3px rgba(201,168,76,0.4); }
        }
        @keyframes scissorBlade {
          0%   { transform: rotate(0deg); }
          30%  { transform: rotate(18deg); }
          60%  { transform: rotate(-18deg); }
          100% { transform: rotate(0deg); }
        }
      `}</style>
    </div>
  );
}

// ── Day Cell ────────────────────────────────────────────────────────────────

interface DayCellProps {
  day: number;
  past: boolean;
  todayCell: boolean;
  selectedCell: boolean;
  isSlicing: boolean;
  isSettling: boolean;
  onClick: (day: number, el: HTMLElement) => void;
}

function DayCell({ day, past, todayCell, selectedCell, isSlicing, isSettling, onClick }: DayCellProps) {
  const ref = useRef<HTMLButtonElement>(null);

  const handleClick = () => {
    if (past || !ref.current) return;
    onClick(day, ref.current);
  };

  const getBackground = () => {
    if (selectedCell) return "var(--gold)";
    if (isSlicing || isSettling) return "var(--gold-muted)";
    return "transparent";
  };

  const getColor = () => {
    if (selectedCell) return "var(--black)";
    if (past) return "var(--white-mute)";
    return "var(--white)";
  };

  const getBorder = () => {
    if (selectedCell) return "1px solid var(--gold-bright)";
    if (todayCell) return "1px solid var(--white)";
    return "1px solid transparent";
  };

  const getTransform = () => {
    if (isSlicing) return "scaleY(0.85)";
    return "none";
  };

  return (
    <button
      ref={ref}
      onClick={handleClick}
      disabled={past}
      style={{
        minHeight: "40px",
        minWidth: "40px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: getBackground(),
        color: getColor(),
        border: getBorder(),
        borderRadius: "1px",
        fontFamily: "'Rajdhani', sans-serif",
        fontWeight: selectedCell ? 700 : 500,
        fontSize: "0.9rem",
        cursor: past ? "not-allowed" : "pointer",
        transition: "all 0.15s ease",
        transform: getTransform(),
        animation: selectedCell ? "goldPulseDay 2s ease-in-out infinite" : "none",
        outline: "none",
        position: "relative",
        overflow: "hidden",
      }}
      onMouseEnter={(e) => {
        if (past || selectedCell) return;
        (e.currentTarget as HTMLButtonElement).style.background = "var(--surface-3)";
        (e.currentTarget as HTMLButtonElement).style.borderColor = "var(--gold-dim)";
      }}
      onMouseLeave={(e) => {
        if (past || selectedCell) return;
        (e.currentTarget as HTMLButtonElement).style.background = "transparent";
        (e.currentTarget as HTMLButtonElement).style.borderColor = todayCell ? "var(--white)" : "transparent";
      }}
    >
      {day}
    </button>
  );
}

// ── Scissors SVG ────────────────────────────────────────────────────────────

function ScissorsSVG() {
  return (
    <svg
      width="60"
      height="30"
      viewBox="0 0 60 30"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ display: "block" }}
    >
      {/* Upper blade group — rotates around pivot */}
      <g
        style={{
          transformOrigin: "12px 15px",
          animation: "scissorBlade 0.4s ease-in-out infinite",
        }}
      >
        {/* Upper blade body */}
        <path
          d="M12 15 L56 8 L58 11 L14 17Z"
          fill="var(--scissors-blade)"
        />
        {/* Upper handle loop */}
        <ellipse cx="7" cy="10" rx="5" ry="4" fill="none" stroke="var(--scissors-blade)" strokeWidth="1.5" />
      </g>

      {/* Lower blade group — rotates opposite direction */}
      <g
        style={{
          transformOrigin: "12px 15px",
          animation: "scissorBlade 0.4s ease-in-out infinite reverse",
        }}
      >
        {/* Lower blade body */}
        <path
          d="M12 15 L56 22 L58 19 L14 13Z"
          fill="var(--scissors-blade)"
        />
        {/* Lower handle loop */}
        <ellipse cx="7" cy="20" rx="5" ry="4" fill="none" stroke="var(--scissors-blade)" strokeWidth="1.5" />
      </g>

      {/* Pivot screw */}
      <circle cx="12" cy="15" r="3.5" fill="var(--scissors-screw)" />
      <circle cx="12" cy="15" r="1.5" fill="var(--black)" />
    </svg>
  );
}
