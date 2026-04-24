"use client";

interface BarberOption {
  id: string;
  name: string;
  tagline: string;
  specialty: string;
}

const BARBERS: BarberOption[] = [
  {
    id: "cualquiera",
    name: "CUALQUIER BARBERO",
    tagline: "Asignamos el mejor disponible",
    specialty: "Disponibilidad máxima",
  },
  {
    id: "marco",
    name: "MARCO",
    tagline: "Especialista en degradados",
    specialty: "Fade · Crop · Textura",
  },
  {
    id: "rafael",
    name: "RAFAEL",
    tagline: "Maestro en navajas",
    specialty: "Barba · Navaja · Clásico",
  },
];

interface Props {
  value: string | null;
  onChange: (v: string) => void;
}

function ScissorsAvatar() {
  return (
    <div
      style={{
        width: "64px",
        height: "64px",
        borderRadius: "50%",
        background: "var(--surface-3)",
        border: "1px solid var(--border)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
      }}
    >
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        {/* Upper blade */}
        <path
          d="M6 10 L22 6 L22 9 L6 13Z"
          fill="var(--gold)"
          opacity="0.8"
        />
        {/* Lower blade */}
        <path
          d="M6 18 L22 22 L22 19 L6 15Z"
          fill="var(--gold)"
          opacity="0.8"
        />
        {/* Pivot screw */}
        <circle cx="7" cy="14" r="2.5" fill="var(--gold-bright)" />
        <circle cx="7" cy="14" r="1" fill="var(--black)" />
      </svg>
    </div>
  );
}

function BarberInitialAvatar({ name }: { name: string }) {
  const initial = name.charAt(0);
  return (
    <div
      style={{
        width: "64px",
        height: "64px",
        borderRadius: "50%",
        background: "linear-gradient(135deg, var(--surface-3) 0%, var(--gold-muted) 100%)",
        border: "1px solid var(--gold-dim)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
      }}
    >
      <span
        style={{
          fontFamily: "'Bebas Neue', sans-serif",
          fontSize: "1.8rem",
          color: "var(--gold)",
          letterSpacing: "0.06em",
          lineHeight: 1,
        }}
      >
        {initial}
      </span>
    </div>
  );
}

export default function BarberPicker({ value, onChange }: Props) {
  return (
    <div>
      <p
        style={{
          fontFamily: "'Rajdhani', sans-serif",
          color: "var(--white-dim)",
          fontSize: "1rem",
          letterSpacing: "0.08em",
          marginBottom: "2rem",
          textTransform: "uppercase",
        }}
      >
        ¿Con quién quieres reservar?
      </p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "1rem",
        }}
        className="barber-grid"
      >
        {BARBERS.map((barber) => {
          const selected = value === barber.id;
          return (
            <button
              key={barber.id}
              onClick={() => onChange(barber.id)}
              style={{
                position: "relative",
                background: selected ? "var(--gold-muted)" : "var(--surface-2)",
                border: `1px solid ${selected ? "var(--gold)" : "var(--border)"}`,
                clipPath: "polygon(10px 0%, 100% 0%, calc(100% - 10px) 100%, 0% 100%)",
                padding: "1.5rem 1.25rem",
                cursor: "pointer",
                textAlign: "center",
                transition: "all 0.2s ease",
                outline: "none",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "1rem",
              }}
              onMouseEnter={(e) => {
                if (!selected) {
                  (e.currentTarget as HTMLButtonElement).style.borderColor = "var(--gold-dim)";
                  (e.currentTarget as HTMLButtonElement).style.background = "var(--surface-3)";
                }
              }}
              onMouseLeave={(e) => {
                if (!selected) {
                  (e.currentTarget as HTMLButtonElement).style.borderColor = "var(--border)";
                  (e.currentTarget as HTMLButtonElement).style.background = "var(--surface-2)";
                }
              }}
            >
              {/* Selected indicator */}
              {selected && (
                <div
                  style={{
                    position: "absolute",
                    top: "10px",
                    right: "18px",
                    width: "18px",
                    height: "18px",
                    background: "var(--gold)",
                    clipPath: "polygon(3px 0%, 100% 0%, calc(100% - 3px) 100%, 0% 100%)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <svg width="8" height="7" viewBox="0 0 8 7" fill="none">
                    <path d="M1 3.5L3 5.5L7 1" stroke="#080808" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              )}

              {/* Avatar */}
              {barber.id === "cualquiera" ? (
                <ScissorsAvatar />
              ) : (
                <BarberInitialAvatar name={barber.name} />
              )}

              {/* Name */}
              <div
                style={{
                  fontFamily: "'Bebas Neue', sans-serif",
                  fontSize: barber.id === "cualquiera" ? "1.1rem" : "1.6rem",
                  letterSpacing: "0.08em",
                  color: selected ? "var(--gold-bright)" : "var(--white)",
                  lineHeight: 1.1,
                }}
              >
                {barber.name}
              </div>

              {/* Tagline */}
              <div
                style={{
                  fontFamily: "'Rajdhani', sans-serif",
                  fontSize: "0.8rem",
                  color: "var(--white-dim)",
                  letterSpacing: "0.04em",
                  lineHeight: 1.4,
                  textAlign: "center",
                }}
              >
                {barber.tagline}
              </div>

              {/* Specialty tag */}
              <div
                style={{
                  fontFamily: "'Rajdhani', sans-serif",
                  fontSize: "0.7rem",
                  color: selected ? "var(--gold)" : "var(--white-mute)",
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  borderTop: `1px solid ${selected ? "var(--gold-dim)" : "var(--border)"}`,
                  paddingTop: "0.6rem",
                  width: "100%",
                  textAlign: "center",
                }}
              >
                {barber.specialty}
              </div>
            </button>
          );
        })}
      </div>

      <style>{`
        @media (max-width: 640px) {
          .barber-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}
