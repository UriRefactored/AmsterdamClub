"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ServicePicker from "./ServicePicker";
import BarberPicker from "./BarberPicker";
import ScissorsCalendar from "./ScissorsCalendar";
import TimeSlots from "./TimeSlots";
import ClientForm, { ClientData } from "./ClientForm";
import BookingConfirmation from "./BookingConfirmation";

// ── Types ──────────────────────────────────────────────────────────────────

interface BookingState {
  step: number;
  service: string | null;
  barber: string | null;
  date: Date | null;
  time: string | null;
  client: ClientData;
  isMember: boolean;
}

const STEP_LABELS = [
  "SERVICIO",
  "BARBERO",
  "FECHA",
  "TUS DATOS",
  "CONFIRMACIÓN",
];

// ── Stepper Indicator ──────────────────────────────────────────────────────

function StepperIndicator({ currentStep }: { currentStep: number }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "0",
        marginBottom: "2.5rem",
        overflowX: "auto",
        paddingBottom: "4px",
      }}
      className="stepper-wrapper"
    >
      {STEP_LABELS.map((label, idx) => {
        const stepNum = idx + 1;
        const isActive = stepNum === currentStep;
        const isCompleted = stepNum < currentStep;

        return (
          <div
            key={label}
            style={{
              display: "flex",
              alignItems: "center",
              flex: 1,
              minWidth: 0,
            }}
          >
            {/* Step pill */}
            <div
              style={{
                flex: 1,
                padding: "8px 16px 8px 20px",
                clipPath:
                  idx === 0
                    ? "polygon(0% 0%, calc(100% - 10px) 0%, 100% 50%, calc(100% - 10px) 100%, 0% 100%)"
                    : idx === STEP_LABELS.length - 1
                    ? "polygon(10px 0%, 100% 0%, 100% 100%, 10px 100%, 0% 50%)"
                    : "polygon(10px 0%, calc(100% - 10px) 0%, 100% 50%, calc(100% - 10px) 100%, 10px 100%, 0% 50%)",
                background: isCompleted
                  ? "var(--gold)"
                  : isActive
                  ? "var(--gold-muted)"
                  : "var(--surface-2)",
                border: isActive
                  ? "1px solid var(--gold)"
                  : isCompleted
                  ? "1px solid var(--gold)"
                  : "1px solid var(--border)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "6px",
                transition: "all 0.3s ease",
                minWidth: 0,
              }}
            >
              {isCompleted ? (
                <svg width="12" height="10" viewBox="0 0 12 10" fill="none" style={{ flexShrink: 0 }}>
                  <path
                    d="M1 5L4.5 8.5L11 1"
                    stroke="var(--black)"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              ) : (
                <span
                  style={{
                    fontFamily: "'Bebas Neue', sans-serif",
                    fontSize: "0.75rem",
                    color: isActive ? "var(--gold)" : "var(--white-mute)",
                    letterSpacing: "0.06em",
                    lineHeight: 1,
                    flexShrink: 0,
                  }}
                >
                  {stepNum}
                </span>
              )}
              <span
                style={{
                  fontFamily: "'Rajdhani', sans-serif",
                  fontWeight: 600,
                  fontSize: "0.65rem",
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  color: isCompleted
                    ? "var(--black)"
                    : isActive
                    ? "var(--gold)"
                    : "var(--white-mute)",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  transition: "color 0.3s ease",
                }}
                className="step-label"
              >
                {label}
              </span>
            </div>
          </div>
        );
      })}

      <style>{`
        .stepper-wrapper::-webkit-scrollbar { height: 2px; }
        .stepper-wrapper::-webkit-scrollbar-thumb { background: var(--gold-dim); }
        @media (max-width: 500px) {
          .step-label { display: none !important; }
        }
      `}</style>
    </div>
  );
}

// ── Step content wrapper with animation ───────────────────────────────────

const slideVariants = {
  enterForward: { x: 60, opacity: 0 },
  enterBackward: { x: -60, opacity: 0 },
  center: { x: 0, opacity: 1 },
  exitForward: { x: -60, opacity: 0 },
  exitBackward: { x: 60, opacity: 0 },
};

// ── Main BookingFlow ───────────────────────────────────────────────────────

export default function BookingFlow() {
  const [state, setState] = useState<BookingState>({
    step: 1,
    service: null,
    barber: null,
    date: null,
    time: null,
    client: { name: "", email: "", phone: "" },
    isMember: false,
  });
  const [direction, setDirection] = useState<"forward" | "backward">("forward");

  const update = <K extends keyof BookingState>(key: K, val: BookingState[K]) => {
    setState((prev) => ({ ...prev, [key]: val }));
  };

  const canProceed = (): boolean => {
    switch (state.step) {
      case 1:
        return state.service !== null;
      case 2:
        return state.barber !== null;
      case 3:
        return state.date !== null && state.time !== null;
      case 4:
        return (
          state.client.name.trim().length > 0 &&
          state.client.email.trim().length > 0 &&
          /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(state.client.email)
        );
      case 5:
        return true;
      default:
        return false;
    }
  };

  const goNext = () => {
    if (!canProceed() || state.step >= 5) return;
    setDirection("forward");
    setState((prev) => ({ ...prev, step: prev.step + 1 }));
  };

  const goPrev = () => {
    if (state.step <= 1) return;
    setDirection("backward");
    setState((prev) => ({ ...prev, step: prev.step - 1 }));
  };

  const renderStep = () => {
    switch (state.step) {
      case 1:
        return (
          <ServicePicker
            value={state.service}
            onChange={(v) => update("service", v)}
          />
        );
      case 2:
        return (
          <BarberPicker
            value={state.barber}
            onChange={(v) => update("barber", v)}
          />
        );
      case 3:
        return (
          <div>
            <ScissorsCalendar
              value={state.date}
              onChange={(d) => update("date", d)}
            />
            <TimeSlots
              date={state.date}
              value={state.time}
              onChange={(t) => update("time", t)}
            />
          </div>
        );
      case 4:
        return (
          <ClientForm
            value={state.client}
            onChange={(d) => update("client", d)}
            isMember={state.isMember}
            onMemberChange={(v) => update("isMember", v)}
          />
        );
      case 5:
        return (
          <BookingConfirmation
            service={state.service}
            barber={state.barber}
            date={state.date}
            time={state.time}
            client={state.client}
            isMember={state.isMember}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div
      style={{
        background: "var(--surface)",
        border: "1px solid var(--border)",
        padding: "clamp(1.5rem, 4vw, 2.5rem)",
        maxWidth: "760px",
        margin: "0 auto",
        position: "relative",
      }}
    >
      {/* Angular top accent line */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "2px",
          background: "linear-gradient(90deg, var(--gold-dim), var(--gold-bright) 50%, var(--gold-dim))",
        }}
      />

      {/* Stepper */}
      <StepperIndicator currentStep={state.step} />

      {/* Animated step content */}
      <div style={{ position: "relative", overflow: "hidden", minHeight: "300px" }}>
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={state.step}
            custom={direction}
            variants={slideVariants}
            initial={direction === "forward" ? "enterForward" : "enterBackward"}
            animate="center"
            exit={direction === "forward" ? "exitForward" : "exitBackward"}
            transition={{ duration: 0.28, ease: "easeInOut" }}
          >
            {renderStep()}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation */}
      {state.step < 5 && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginTop: "2.5rem",
            paddingTop: "1.5rem",
            borderTop: "1px solid var(--border)",
            gap: "1rem",
          }}
        >
          <button
            onClick={goPrev}
            disabled={state.step === 1}
            className="btn-outline"
            style={{
              opacity: state.step === 1 ? 0.3 : 1,
              cursor: state.step === 1 ? "not-allowed" : "pointer",
              fontSize: "0.95rem",
              padding: "10px 24px",
            }}
          >
            ← ANTERIOR
          </button>

          {/* Step progress text */}
          <span
            style={{
              fontFamily: "'Rajdhani', sans-serif",
              fontSize: "0.75rem",
              color: "var(--white-mute)",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
            }}
          >
            {state.step} / 5
          </span>

          <button
            onClick={goNext}
            disabled={!canProceed()}
            className="btn-gold"
            style={{
              opacity: canProceed() ? 1 : 0.4,
              cursor: canProceed() ? "pointer" : "not-allowed",
              fontSize: "0.95rem",
              padding: "10px 24px",
              transform: canProceed() ? undefined : "none",
            }}
          >
            {state.step === 4 ? "REVISAR →" : "SIGUIENTE →"}
          </button>
        </div>
      )}
    </div>
  );
}
