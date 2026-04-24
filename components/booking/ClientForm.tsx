"use client";

import { useState } from "react";

export interface ClientData {
  name: string;
  email: string;
  phone: string;
}

interface Props {
  value: ClientData;
  onChange: (d: ClientData) => void;
  isMember: boolean;
  onMemberChange: (v: boolean) => void;
}

interface FieldProps {
  label: string;
  type: string;
  value: string;
  placeholder: string;
  onChange: (v: string) => void;
  autoComplete?: string;
}

function Field({ label, type, value, placeholder, onChange, autoComplete }: FieldProps) {
  const [focused, setFocused] = useState(false);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
      <label
        style={{
          fontFamily: "'Rajdhani', sans-serif",
          fontWeight: 600,
          fontSize: "0.72rem",
          letterSpacing: "0.18em",
          textTransform: "uppercase",
          color: focused ? "var(--gold)" : "var(--white-dim)",
          transition: "color 0.2s",
        }}
      >
        {label}
      </label>
      <input
        type={type}
        value={value}
        placeholder={placeholder}
        autoComplete={autoComplete}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        style={{
          background: "var(--surface-2)",
          border: "none",
          borderBottom: `1px solid ${focused ? "var(--gold)" : "var(--gold-dim)"}`,
          outline: focused ? "1px solid var(--gold)" : "none",
          outlineOffset: "0px",
          color: "var(--white)",
          fontFamily: "'Rajdhani', sans-serif",
          fontWeight: 500,
          fontSize: "1rem",
          letterSpacing: "0.04em",
          padding: "12px 14px",
          width: "100%",
          transition: "border-color 0.2s, outline 0.2s",
          borderRadius: "0",
        }}
      />
    </div>
  );
}

export default function ClientForm({ value, onChange, isMember, onMemberChange }: Props) {
  const update = (field: keyof ClientData) => (v: string) => {
    onChange({ ...value, [field]: v });
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
      <p
        style={{
          fontFamily: "'Rajdhani', sans-serif",
          color: "var(--white-dim)",
          fontSize: "1rem",
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          marginBottom: "0.5rem",
        }}
      >
        Tus datos para la reserva
      </p>

      <Field
        label="Nombre Completo"
        type="text"
        value={value.name}
        placeholder="Tu nombre"
        onChange={update("name")}
        autoComplete="name"
      />

      <Field
        label="Email"
        type="email"
        value={value.email}
        placeholder="tu@email.com"
        onChange={update("email")}
        autoComplete="email"
      />

      <Field
        label="Teléfono"
        type="tel"
        value={value.phone}
        placeholder="+34 6XX XXX XXX"
        onChange={update("phone")}
        autoComplete="tel"
      />

      {/* Member checkbox */}
      <label
        style={{
          display: "flex",
          alignItems: "flex-start",
          gap: "12px",
          cursor: "pointer",
          paddingTop: "0.5rem",
          borderTop: "1px solid var(--border)",
        }}
      >
        <div style={{ position: "relative", flexShrink: 0, marginTop: "2px" }}>
          <input
            type="checkbox"
            checked={isMember}
            onChange={(e) => onMemberChange(e.target.checked)}
            style={{
              appearance: "none",
              WebkitAppearance: "none",
              width: "20px",
              height: "20px",
              background: isMember ? "var(--gold)" : "var(--surface-2)",
              border: `1px solid ${isMember ? "var(--gold-bright)" : "var(--gold-dim)"}`,
              cursor: "pointer",
              transition: "all 0.2s",
              display: "block",
            }}
          />
          {isMember && (
            <svg
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                pointerEvents: "none",
              }}
              width="11"
              height="9"
              viewBox="0 0 11 9"
              fill="none"
            >
              <path d="M1 4.5L4 7.5L10 1" stroke="#080808" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          )}
        </div>

        <div>
          <div
            style={{
              fontFamily: "'Rajdhani', sans-serif",
              fontWeight: 600,
              fontSize: "0.95rem",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: isMember ? "var(--gold)" : "var(--white-dim)",
              transition: "color 0.2s",
            }}
          >
            Soy miembro del club
          </div>
          <div
            style={{
              fontFamily: "'Rajdhani', sans-serif",
              fontSize: "0.8rem",
              color: "var(--white-mute)",
              letterSpacing: "0.04em",
              marginTop: "2px",
            }}
          >
            Sin depósito · Reserva prioritaria
          </div>
        </div>
      </label>

      {/* Deposit info for non-members */}
      {!isMember && (
        <div
          style={{
            border: "1px solid var(--gold-dim)",
            background: "var(--gold-muted)",
            padding: "1rem 1.25rem",
            display: "flex",
            gap: "0.75rem",
            alignItems: "flex-start",
          }}
        >
          <div
            style={{
              width: "3px",
              minHeight: "100%",
              background: "var(--gold)",
              flexShrink: 0,
              alignSelf: "stretch",
            }}
          />
          <div>
            <div
              style={{
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: "1rem",
                letterSpacing: "0.1em",
                color: "var(--gold-bright)",
                marginBottom: "4px",
              }}
            >
              DEPÓSITO REQUERIDO
            </div>
            <p
              style={{
                fontFamily: "'Rajdhani', sans-serif",
                fontSize: "0.88rem",
                color: "var(--white-dim)",
                lineHeight: 1.5,
                letterSpacing: "0.03em",
              }}
            >
              Para completar la reserva se requiere un depósito de{" "}
              <strong style={{ color: "var(--gold-bright)" }}>€5</strong>.
              Será descontado de tu servicio el día de la visita.
            </p>
          </div>
        </div>
      )}

      <style>{`
        input::placeholder {
          color: var(--white-mute);
          font-family: 'Rajdhani', sans-serif;
        }
      `}</style>
    </div>
  );
}
