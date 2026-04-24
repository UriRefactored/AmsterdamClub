"use client";

interface Props {
  date: Date | null;
  value: string | null;
  onChange: (t: string) => void;
}

const MOCK_UNAVAILABLE = ["11:00", "11:30", "14:00", "15:30", "16:00"];

function generateSlots(): string[] {
  const slots: string[] = [];
  for (let h = 10; h <= 19; h++) {
    slots.push(`${String(h).padStart(2, "0")}:00`);
    if (h < 19) {
      slots.push(`${String(h).padStart(2, "0")}:30`);
    }
  }
  // 19:30 is the last
  slots.push("19:30");
  return slots;
}

const ALL_SLOTS = generateSlots();

function formatDate(date: Date): string {
  const days = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
  const months = [
    "enero", "febrero", "marzo", "abril", "mayo", "junio",
    "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre",
  ];
  return `${days[date.getDay()]}, ${date.getDate()} de ${months[date.getMonth()]}`;
}

export default function TimeSlots({ date, value, onChange }: Props) {
  if (!date) {
    return (
      <div
        style={{
          padding: "1.5rem",
          background: "var(--surface-2)",
          border: "1px solid var(--border)",
          textAlign: "center",
          marginTop: "1.5rem",
        }}
      >
        <p
          style={{
            fontFamily: "'Rajdhani', sans-serif",
            color: "var(--white-mute)",
            fontSize: "0.9rem",
            letterSpacing: "0.08em",
            textTransform: "uppercase",
          }}
        >
          Selecciona una fecha para ver los horarios disponibles
        </p>
      </div>
    );
  }

  return (
    <div style={{ marginTop: "1.5rem" }}>
      {/* Date label */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "0.75rem",
          marginBottom: "1rem",
          paddingBottom: "0.75rem",
          borderBottom: "1px solid var(--border)",
        }}
      >
        <div
          style={{
            width: "3px",
            height: "20px",
            background: "var(--gold)",
            flexShrink: 0,
          }}
        />
        <span
          style={{
            fontFamily: "'Rajdhani', sans-serif",
            fontWeight: 600,
            fontSize: "0.9rem",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            color: "var(--white-dim)",
          }}
        >
          {formatDate(date)}
        </span>
      </div>

      {/* Slots grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: "0.5rem",
        }}
        className="slots-grid"
      >
        {ALL_SLOTS.map((slot) => {
          const unavailable = MOCK_UNAVAILABLE.includes(slot);
          const selected = value === slot;

          return (
            <button
              key={slot}
              onClick={() => !unavailable && onChange(slot)}
              disabled={unavailable}
              style={{
                padding: "10px 4px",
                background: selected
                  ? "var(--gold)"
                  : unavailable
                  ? "var(--surface)"
                  : "var(--surface-2)",
                color: selected
                  ? "var(--black)"
                  : unavailable
                  ? "var(--white-mute)"
                  : "var(--white)",
                border: `1px solid ${
                  selected
                    ? "var(--gold-bright)"
                    : unavailable
                    ? "var(--border)"
                    : "var(--border)"
                }`,
                clipPath: selected
                  ? "polygon(6px 0%, 100% 0%, calc(100% - 6px) 100%, 0% 100%)"
                  : "none",
                fontFamily: selected ? "'Bebas Neue', sans-serif" : "'Rajdhani', sans-serif",
                fontWeight: 600,
                fontSize: selected ? "1rem" : "0.9rem",
                letterSpacing: selected ? "0.1em" : "0.06em",
                textDecoration: unavailable ? "line-through" : "none",
                cursor: unavailable ? "not-allowed" : "pointer",
                transition: "all 0.15s ease",
                outline: "none",
                textAlign: "center",
                animation: selected ? "goldPulse 2s ease-in-out infinite" : "none",
              }}
              onMouseEnter={(e) => {
                if (unavailable || selected) return;
                (e.currentTarget as HTMLButtonElement).style.borderColor = "var(--gold-dim)";
                (e.currentTarget as HTMLButtonElement).style.background = "var(--surface-3)";
                (e.currentTarget as HTMLButtonElement).style.color = "var(--gold)";
              }}
              onMouseLeave={(e) => {
                if (unavailable || selected) return;
                (e.currentTarget as HTMLButtonElement).style.borderColor = "var(--border)";
                (e.currentTarget as HTMLButtonElement).style.background = "var(--surface-2)";
                (e.currentTarget as HTMLButtonElement).style.color = "var(--white)";
              }}
            >
              {slot}
            </button>
          );
        })}
      </div>

      {/* Legend */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "1.5rem",
          marginTop: "1rem",
          paddingTop: "0.75rem",
          borderTop: "1px solid var(--border)",
        }}
      >
        <LegendItem color="var(--surface-2)" border="var(--border)" label="Disponible" />
        <LegendItem color="var(--surface)" border="var(--border)" label="Reservado" strikethrough />
        <LegendItem color="var(--gold)" border="var(--gold-bright)" label="Seleccionado" />
      </div>

      <style>{`
        @media (max-width: 480px) {
          .slots-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
      `}</style>
    </div>
  );
}

function LegendItem({
  color,
  border,
  label,
  strikethrough,
}: {
  color: string;
  border: string;
  label: string;
  strikethrough?: boolean;
}) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
      <div
        style={{
          width: "12px",
          height: "12px",
          background: color,
          border: `1px solid ${border}`,
          flexShrink: 0,
        }}
      />
      <span
        style={{
          fontFamily: "'Rajdhani', sans-serif",
          fontSize: "0.72rem",
          color: "var(--white-mute)",
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          textDecoration: strikethrough ? "line-through" : "none",
        }}
      >
        {label}
      </span>
    </div>
  );
}
