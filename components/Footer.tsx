"use client";

import Link from "next/link";

const footerLinks = [
  { label: "Inicio", href: "/#inicio" },
  { label: "Membresías", href: "/membresias" },
  { label: "Reservar", href: "/reservar" },
  { label: "El Club", href: "/el-club" },
  { label: "Contacto", href: "/contacto" },
];

export default function Footer() {
  return (
    <footer
      style={{
        background: "#101010",
        borderTop: "none",
        position: "relative",
      }}
    >
      {/* Gold blade line top */}
      <div className="blade-line" />

      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "4rem 2rem 2rem",
        }}
      >
        {/* Three columns */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "3rem",
            marginBottom: "3rem",
          }}
        >
          {/* Column 1: Brand */}
          <div>
            <div style={{ marginBottom: "1rem" }}>
              <span
                style={{
                  fontFamily: "'Bebas Neue', sans-serif",
                  fontSize: "1.8rem",
                  letterSpacing: "0.1em",
                  color: "var(--gold)",
                }}
              >
                CLUB{" "}
              </span>
              <span
                style={{
                  fontFamily: "'Bebas Neue', sans-serif",
                  fontSize: "1.8rem",
                  letterSpacing: "0.1em",
                  color: "var(--white)",
                }}
              >
                AMSTERDAM
              </span>
            </div>
            <p
              style={{
                fontFamily: "'Rajdhani', sans-serif",
                color: "var(--white-dim)",
                fontSize: "0.95rem",
                lineHeight: "1.7",
                maxWidth: "240px",
              }}
            >
              Una barbería. Un club. Un estándar.
              <br />
              Precisión, ritual y pertenencia — desde Amsterdam.
            </p>

            {/* Instagram */}
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                marginTop: "1.25rem",
                color: "var(--gold)",
                textDecoration: "none",
                fontFamily: "'Rajdhani', sans-serif",
                fontWeight: 600,
                letterSpacing: "0.1em",
                fontSize: "0.85rem",
                textTransform: "uppercase",
              }}
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                <circle cx="12" cy="12" r="4" />
                <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
              </svg>
              @clubamsterdam
            </a>
          </div>

          {/* Column 2: Links */}
          <div>
            <h4
              style={{
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: "1.1rem",
                letterSpacing: "0.15em",
                color: "var(--gold)",
                marginBottom: "1.25rem",
              }}
            >
              Navegación
            </h4>
            <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    style={{
                      fontFamily: "'Rajdhani', sans-serif",
                      color: "var(--white-dim)",
                      textDecoration: "none",
                      fontSize: "0.95rem",
                      letterSpacing: "0.08em",
                      textTransform: "uppercase",
                      transition: "color 0.2s",
                    }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = "var(--gold)"; }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = "var(--white-dim)"; }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Horarios */}
          <div>
            <h4
              style={{
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: "1.1rem",
                letterSpacing: "0.15em",
                color: "var(--gold)",
                marginBottom: "1.25rem",
              }}
            >
              Horarios
            </h4>
            <div
              style={{
                fontFamily: "'Rajdhani', sans-serif",
                color: "var(--white-dim)",
                fontSize: "0.95rem",
                lineHeight: "1.9",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", maxWidth: "200px" }}>
                <span>Lunes – Viernes</span>
                <span style={{ color: "var(--white)" }}>10:00–20:00</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", maxWidth: "200px" }}>
                <span>Sábado</span>
                <span style={{ color: "var(--white)" }}>10:00–18:00</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", maxWidth: "200px" }}>
                <span>Domingo</span>
                <span style={{ color: "var(--white-mute)" }}>Cerrado</span>
              </div>
            </div>

            <div style={{ marginTop: "1.5rem", fontFamily: "'Rajdhani', sans-serif", fontSize: "0.9rem", color: "var(--white-mute)" }}>
              <div>Calle Ejemplo 42</div>
              <div>Amsterdam, Países Bajos</div>
            </div>
          </div>
        </div>

        {/* Bottom row */}
        <div
          style={{
            borderTop: "1px solid var(--border)",
            paddingTop: "1.5rem",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "0.75rem",
          }}
        >
          <p
            style={{
              fontFamily: "'Rajdhani', sans-serif",
              fontSize: "0.8rem",
              color: "var(--white-mute)",
              letterSpacing: "0.06em",
              margin: 0,
            }}
          >
            © {new Date().getFullYear()} Club Amsterdam. Todos los derechos reservados.
          </p>
          <p
            style={{
              fontFamily: "'Rajdhani', sans-serif",
              fontSize: "0.8rem",
              color: "var(--white-mute)",
              letterSpacing: "0.06em",
              margin: 0,
            }}
          >
            Hecho con precisión ✦
          </p>
        </div>
      </div>
    </footer>
  );
}
