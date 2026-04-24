"use client";

interface ServiceOption {
  id: string;
  name: string;
  duration: string;
  price: string;
  description: string;
}

const SERVICES: ServiceOption[] = [
  { id: "corte", name: "CORTE", duration: "30 min", price: "€20", description: "Corte clásico a tijera o máquina" },
  { id: "barba", name: "BARBA", duration: "30 min", price: "€15", description: "Perfilado y arreglo con navaja" },
  { id: "corte-barba", name: "CORTE + BARBA", duration: "45 min", price: "€30", description: "El servicio completo del club" },
  { id: "tratamiento", name: "TRATAMIENTO", duration: "45 min", price: "€25", description: "Hidratación y cuidado capilar" },
];

interface Props {
  value: string | null;
  onChange: (v: string) => void;
}

export default function ServicePicker({ value, onChange }: Props) {
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
        Elige el servicio para tu visita
      </p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gap: "1rem",
        }}
        className="service-grid"
      >
        {SERVICES.map((svc) => {
          const selected = value === svc.id;
          return (
            <button
              key={svc.id}
              onClick={() => onChange(svc.id)}
              style={{
                position: "relative",
                background: selected ? "var(--gold-muted)" : "var(--surface-2)",
                border: `1px solid ${selected ? "var(--gold)" : "var(--border)"}`,
                clipPath: "polygon(12px 0%, 100% 0%, calc(100% - 12px) 100%, 0% 100%)",
                padding: "1.75rem 1.5rem",
                cursor: "pointer",
                textAlign: "left",
                transition: "all 0.2s ease",
                outline: "none",
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
              {/* Checkmark */}
              {selected && (
                <div
                  style={{
                    position: "absolute",
                    top: "12px",
                    right: "20px",
                    width: "20px",
                    height: "20px",
                    background: "var(--gold)",
                    clipPath: "polygon(4px 0%, 100% 0%, calc(100% - 4px) 100%, 0% 100%)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                    <path d="M1 4L3.5 6.5L9 1" stroke="#080808" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              )}

              {/* Service name */}
              <div
                style={{
                  fontFamily: "'Bebas Neue', sans-serif",
                  fontSize: "1.8rem",
                  letterSpacing: "0.08em",
                  color: selected ? "var(--gold-bright)" : "var(--white)",
                  lineHeight: 1,
                  marginBottom: "0.5rem",
                }}
              >
                {svc.name}
              </div>

              {/* Description */}
              <div
                style={{
                  fontFamily: "'Rajdhani', sans-serif",
                  fontSize: "0.85rem",
                  color: "var(--white-dim)",
                  letterSpacing: "0.04em",
                  marginBottom: "1rem",
                  lineHeight: 1.4,
                }}
              >
                {svc.description}
              </div>

              {/* Duration + price row */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  borderTop: `1px solid ${selected ? "var(--gold-dim)" : "var(--border)"}`,
                  paddingTop: "0.75rem",
                }}
              >
                <span
                  style={{
                    fontFamily: "'Rajdhani', sans-serif",
                    fontSize: "0.8rem",
                    color: "var(--white-mute)",
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                  }}
                >
                  {svc.duration}
                </span>
                <span
                  style={{
                    fontFamily: "'Bebas Neue', sans-serif",
                    fontSize: "1.4rem",
                    color: selected ? "var(--gold-bright)" : "var(--gold)",
                    letterSpacing: "0.06em",
                  }}
                >
                  {svc.price}
                </span>
              </div>
            </button>
          );
        })}
      </div>

      <style>{`
        @media (max-width: 540px) {
          .service-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}
