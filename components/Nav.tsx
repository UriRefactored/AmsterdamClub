"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

const navLinks = [
  { label: "Inicio", href: "/#inicio" },
  { label: "Membresías", href: "/membresias" },
  { label: "Reservar", href: "/reservar", highlight: true },
  { label: "El Club", href: "/el-club" },
  { label: "Contacto", href: "/contacto" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 100);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  return (
    <>
      <nav
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          height: "72px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          paddingLeft: "2rem",
          paddingRight: "2rem",
          background: scrolled
            ? "rgba(8,8,8,0.97)"
            : "rgba(8,8,8,0.92)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          transition: "background 0.3s ease",
        }}
      >
        {/* Logo */}
        <Link
          href="/"
          style={{ display: "flex", alignItems: "baseline", gap: "0.4rem", textDecoration: "none" }}
        >
          <span
            style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: "1.6rem",
              letterSpacing: "0.1em",
              color: "var(--gold)",
              lineHeight: 1,
            }}
          >
            CLUB
          </span>
          <span
            style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: "1.6rem",
              letterSpacing: "0.1em",
              color: "var(--white)",
              lineHeight: 1,
            }}
          >
            AMSTERDAM
          </span>
        </Link>

        {/* Desktop nav */}
        <ul
          style={{
            display: "none",
            alignItems: "center",
            gap: "2.5rem",
            listStyle: "none",
            margin: 0,
            padding: 0,
          }}
          className="md-nav-list"
        >
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                style={{
                  fontFamily: "'Rajdhani', sans-serif",
                  fontWeight: 600,
                  fontSize: link.highlight ? "1rem" : "0.85rem",
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  color: link.highlight ? "var(--gold)" : "var(--white-dim)",
                  textDecoration: "none",
                  transition: "color 0.2s",
                  ...(link.highlight ? { borderBottom: "1px solid var(--gold)" } : {}),
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.color = "var(--white)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.color = link.highlight
                    ? "var(--gold)"
                    : "var(--white-dim)";
                }}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Hamburger */}
        <button
          aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
          onClick={() => setMenuOpen(!menuOpen)}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: "8px",
            display: "flex",
            flexDirection: "column",
            gap: "5px",
            zIndex: 60,
          }}
          className="hamburger-btn"
        >
          <span
            style={{
              display: "block",
              width: "24px",
              height: "1px",
              background: menuOpen ? "var(--gold)" : "var(--white)",
              transition: "transform 0.3s, opacity 0.3s",
              transform: menuOpen ? "translateY(6px) rotate(45deg)" : "none",
            }}
          />
          <span
            style={{
              display: "block",
              width: "24px",
              height: "1px",
              background: menuOpen ? "var(--gold)" : "var(--white)",
              transition: "opacity 0.3s",
              opacity: menuOpen ? 0 : 1,
            }}
          />
          <span
            style={{
              display: "block",
              width: "24px",
              height: "1px",
              background: menuOpen ? "var(--gold)" : "var(--white)",
              transition: "transform 0.3s, opacity 0.3s",
              transform: menuOpen ? "translateY(-6px) rotate(-45deg)" : "none",
            }}
          />
        </button>

        {/* Blade line bottom */}
        <div
          className="blade-line"
          style={{ position: "absolute", bottom: 0, left: 0, right: 0 }}
        />
      </nav>

      {/* Full-screen mobile overlay */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 40,
          background: "rgba(8,8,8,0.98)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "2.5rem",
          transform: menuOpen ? "translateX(0)" : "translateX(100%)",
          transition: "transform 0.4s cubic-bezier(0.77,0,0.18,1)",
        }}
      >
        {navLinks.map((link, i) => (
          <Link
            key={link.href}
            href={link.href}
            onClick={() => setMenuOpen(false)}
            style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: "3.5rem",
              letterSpacing: "0.1em",
              color: link.highlight ? "var(--gold)" : "var(--white)",
              textDecoration: "none",
              opacity: menuOpen ? 1 : 0,
              transform: menuOpen ? "translateY(0)" : "translateY(20px)",
              transition: `opacity 0.4s ${i * 0.07}s, transform 0.4s ${i * 0.07}s`,
            }}
          >
            {link.label}
          </Link>
        ))}

        <div
          className="blade-line"
          style={{ width: "160px", marginTop: "1rem" }}
        />
      </div>

      <style>{`
        @media (min-width: 768px) {
          .md-nav-list { display: flex !important; }
          .hamburger-btn { display: none !important; }
        }
      `}</style>
    </>
  );
}
