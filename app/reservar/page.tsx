"use client";

import Nav from "@/components/Nav";
import BookingFlow from "@/components/booking/BookingFlow";

export default function ReservarPage() {
  return (
    <>
      <Nav />

      <main
        style={{
          minHeight: "100vh",
          background: "var(--black)",
          paddingTop: "72px", // nav height
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Radial gold gradient — top right */}
        <div
          aria-hidden
          style={{
            position: "fixed",
            top: 0,
            right: 0,
            width: "600px",
            height: "600px",
            background:
              "radial-gradient(ellipse at top right, rgba(201,168,76,0.07) 0%, rgba(201,168,76,0.02) 40%, transparent 70%)",
            pointerEvents: "none",
            zIndex: 0,
          }}
        />

        {/* Subtle bottom left accent */}
        <div
          aria-hidden
          style={{
            position: "fixed",
            bottom: 0,
            left: 0,
            width: "400px",
            height: "400px",
            background:
              "radial-gradient(ellipse at bottom left, rgba(201,168,76,0.04) 0%, transparent 60%)",
            pointerEvents: "none",
            zIndex: 0,
          }}
        />

        <div
          style={{
            position: "relative",
            zIndex: 1,
            maxWidth: "900px",
            margin: "0 auto",
            padding: "clamp(2rem, 5vw, 4rem) clamp(1rem, 4vw, 2rem) clamp(3rem, 6vw, 5rem)",
          }}
        >
          {/* Page heading */}
          <header style={{ marginBottom: "clamp(2rem, 5vw, 3.5rem)", textAlign: "center" }}>
            {/* Blade line above */}
            <div
              className="blade-line"
              style={{ maxWidth: "200px", margin: "0 auto 1.25rem" }}
            />

            {/* RESERVAR heading with gold shimmer */}
            <h1
              className="gold-shimmer"
              style={{
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: "clamp(4rem, 12vw, 8rem)",
                letterSpacing: "0.1em",
                lineHeight: 0.9,
                marginBottom: "0.75rem",
              }}
            >
              RESERVAR
            </h1>

            {/* Subheading */}
            <p
              style={{
                fontFamily: "'Rajdhani', sans-serif",
                fontWeight: 300,
                fontSize: "clamp(1rem, 2.5vw, 1.3rem)",
                letterSpacing: "0.3em",
                color: "var(--white-dim)",
                textTransform: "uppercase",
                marginBottom: "1.5rem",
              }}
            >
              Tu silla te espera.
            </p>

            {/* Blade line below */}
            <div
              className="blade-line"
              style={{ maxWidth: "200px", margin: "0 auto" }}
            />
          </header>

          {/* Booking flow */}
          <BookingFlow />

          {/* Footer note */}
          <p
            style={{
              fontFamily: "'Rajdhani', sans-serif",
              fontSize: "0.78rem",
              color: "var(--white-mute)",
              letterSpacing: "0.08em",
              textAlign: "center",
              marginTop: "2rem",
            }}
          >
            ¿Tienes dudas?{" "}
            <a
              href="/contacto"
              style={{
                color: "var(--gold)",
                textDecoration: "none",
                borderBottom: "1px solid var(--gold-dim)",
                transition: "border-color 0.2s",
              }}
              onMouseEnter={(e) =>
                ((e.currentTarget as HTMLAnchorElement).style.borderColor = "var(--gold)")
              }
              onMouseLeave={(e) =>
                ((e.currentTarget as HTMLAnchorElement).style.borderColor = "var(--gold-dim)")
              }
            >
              Escríbenos
            </a>
          </p>
        </div>
      </main>
    </>
  );
}
