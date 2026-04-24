"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import type { ClientData } from "./ClientForm";

const SERVICE_LABELS: Record<string, string> = {
  corte: "Corte",
  barba: "Barba",
  "corte-barba": "Corte + Barba",
  tratamiento: "Tratamiento",
};

const BARBER_LABELS: Record<string, string> = {
  cualquiera: "Cualquier barbero disponible",
  marco: "Marco",
  rafael: "Rafael",
};

interface Props {
  service: string | null;
  barber: string | null;
  date: Date | null;
  time: string | null;
  client: ClientData;
  isMember: boolean;
}

function formatDate(date: Date): string {
  const days = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
  const months = [
    "enero", "febrero", "marzo", "abril", "mayo", "junio",
    "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre",
  ];
  return `${days[date.getDay()]}, ${date.getDate()} de ${months[date.getMonth()]} de ${date.getFullYear()}`;
}

function ConfirmRow({ label, value }: { label: string; value: string }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "flex-start",
        gap: "0.75rem",
        padding: "0.85rem 0",
        borderBottom: "1px solid var(--border)",
      }}
    >
      <div
        style={{
          width: "3px",
          height: "20px",
          background: "var(--gold)",
          flexShrink: 0,
          marginTop: "2px",
        }}
      />
      <div style={{ flex: 1 }}>
        <div
          style={{
            fontFamily: "'Rajdhani', sans-serif",
            fontSize: "0.7rem",
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "var(--white-mute)",
            marginBottom: "2px",
          }}
        >
          {label}
        </div>
        <div
          style={{
            fontFamily: "'Rajdhani', sans-serif",
            fontWeight: 600,
            fontSize: "1rem",
            letterSpacing: "0.04em",
            color: "var(--white)",
          }}
        >
          {value}
        </div>
      </div>
    </div>
  );
}

function ConfirmedView() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      style={{ textAlign: "center", padding: "2rem 0" }}
    >
      {/* Animated checkmark */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.175, 0.885, 0.32, 1.275] }}
        style={{ display: "inline-flex", justifyContent: "center", marginBottom: "2rem" }}
      >
        <div
          style={{
            width: "80px",
            height: "80px",
            background: "var(--gold)",
            clipPath: "polygon(16px 0%, 100% 0%, calc(100% - 16px) 100%, 0% 100%)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <svg width="36" height="30" viewBox="0 0 36 30" fill="none">
            <motion.path
              d="M2 15L12 25L34 2"
              stroke="#080808"
              strokeWidth="3.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
            />
          </svg>
        </div>
      </motion.div>

      {/* Celebratory scissors */}
      <motion.div
        initial={{ rotate: 0, scale: 0 }}
        animate={{ rotate: [0, -15, 15, -10, 10, 0], scale: 1 }}
        transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
        style={{ display: "inline-block", marginBottom: "1.5rem" }}
      >
        <svg width="48" height="24" viewBox="0 0 60 30" fill="none">
          <path d="M12 15 L56 8 L58 11 L14 17Z" fill="var(--gold)" />
          <path d="M12 15 L56 22 L58 19 L14 13Z" fill="var(--gold)" />
          <ellipse cx="7" cy="10" rx="5" ry="4" fill="none" stroke="var(--gold)" strokeWidth="1.5" />
          <ellipse cx="7" cy="20" rx="5" ry="4" fill="none" stroke="var(--gold)" strokeWidth="1.5" />
          <circle cx="12" cy="15" r="3.5" fill="var(--gold-bright)" />
          <circle cx="12" cy="15" r="1.5" fill="#080808" />
        </svg>
      </motion.div>

      {/* Heading */}
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        style={{
          fontFamily: "'Bebas Neue', sans-serif",
          fontSize: "clamp(1.8rem, 5vw, 2.8rem)",
          letterSpacing: "0.08em",
          color: "var(--white)",
          lineHeight: 1,
          marginBottom: "1rem",
        }}
      >
        TU SILLA ESTÁ RESERVADA.
      </motion.h2>

      {/* Subtext */}
      <motion.p
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.65 }}
        style={{
          fontFamily: "'Rajdhani', sans-serif",
          fontSize: "1.05rem",
          color: "var(--white-dim)",
          letterSpacing: "0.06em",
          marginBottom: "0.5rem",
        }}
      >
        Recibirás una confirmación en tu email.
      </motion.p>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.8 }}
        style={{
          fontFamily: "'Rajdhani', sans-serif",
          fontSize: "0.85rem",
          color: "var(--white-mute)",
          letterSpacing: "0.05em",
          marginBottom: "2.5rem",
        }}
      >
        Recuerda: cancelaciones con al menos 24h de antelación.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.9 }}
      >
        <Link href="/" className="btn-outline">
          VOLVER AL INICIO
        </Link>
      </motion.div>
    </motion.div>
  );
}

export default function BookingConfirmation({ service, barber, date, time, client, isMember }: Props) {
  const [confirmed, setConfirmed] = useState(false);

  if (confirmed) {
    return (
      <AnimatePresence mode="wait">
        <ConfirmedView key="confirmed" />
      </AnimatePresence>
    );
  }

  return (
    <div>
      <p
        style={{
          fontFamily: "'Rajdhani', sans-serif",
          color: "var(--white-dim)",
          fontSize: "1rem",
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          marginBottom: "1.5rem",
        }}
      >
        Revisa los detalles de tu reserva
      </p>

      {/* Summary card */}
      <div
        style={{
          border: "1px solid var(--border-gold)",
          background: "var(--surface-2)",
          padding: "1.5rem",
          marginBottom: "1.5rem",
          clipPath: "polygon(16px 0%, 100% 0%, calc(100% - 0px) 100%, 0% 100%)",
        }}
      >
        <h3
          style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: "1.6rem",
            letterSpacing: "0.1em",
            color: "var(--gold)",
            marginBottom: "0.75rem",
            lineHeight: 1,
          }}
        >
          TU RESERVA
        </h3>

        <ConfirmRow label="Servicio" value={service ? SERVICE_LABELS[service] ?? service : "—"} />
        <ConfirmRow label="Barbero" value={barber ? BARBER_LABELS[barber] ?? barber : "—"} />
        <ConfirmRow label="Fecha" value={date ? formatDate(date) : "—"} />
        <ConfirmRow label="Hora" value={time ?? "—"} />
        <ConfirmRow label="Nombre" value={client.name || "—"} />
        <ConfirmRow label="Email" value={client.email || "—"} />
        {client.phone && <ConfirmRow label="Teléfono" value={client.phone} />}

        {/* Membership / deposit status */}
        <div
          style={{
            marginTop: "1rem",
            padding: "0.75rem 1rem",
            background: isMember ? "rgba(201,168,76,0.08)" : "var(--gold-muted)",
            border: `1px solid ${isMember ? "var(--gold-dim)" : "var(--gold-dim)"}`,
            display: "flex",
            alignItems: "center",
            gap: "8px",
          }}
        >
          <div
            style={{
              width: "8px",
              height: "8px",
              borderRadius: "50%",
              background: isMember ? "var(--gold)" : "var(--gold-dim)",
              flexShrink: 0,
            }}
          />
          {isMember ? (
            <span
              style={{
                fontFamily: "'Rajdhani', sans-serif",
                fontSize: "0.85rem",
                letterSpacing: "0.08em",
                color: "var(--gold)",
                textTransform: "uppercase",
              }}
            >
              Miembro del club · Sin depósito
            </span>
          ) : (
            <span
              style={{
                fontFamily: "'Rajdhani', sans-serif",
                fontSize: "0.85rem",
                letterSpacing: "0.04em",
                color: "var(--white-dim)",
              }}
            >
              Se realizará un cargo de{" "}
              <strong style={{ color: "var(--gold-bright)" }}>€5</strong> como depósito de reserva
            </span>
          )}
        </div>
      </div>

      {/* Confirm button */}
      <button
        onClick={() => setConfirmed(true)}
        className="btn-gold"
        style={{ width: "100%", justifyContent: "center", fontSize: "1.2rem", padding: "16px 32px" }}
      >
        CONFIRMAR RESERVA
      </button>

      <p
        style={{
          fontFamily: "'Rajdhani', sans-serif",
          fontSize: "0.75rem",
          color: "var(--white-mute)",
          letterSpacing: "0.06em",
          textAlign: "center",
          marginTop: "0.75rem",
        }}
      >
        Al confirmar aceptas la política de cancelación de 24h
      </p>
    </div>
  );
}
