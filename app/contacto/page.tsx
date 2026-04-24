"use client";

import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

function FadeUp({
  children,
  delay = 0,
  style,
}: {
  children: React.ReactNode;
  delay?: number;
  style?: React.CSSProperties;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 36 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      style={style}
    >
      {children}
    </motion.div>
  );
}

const inputStyle: React.CSSProperties = {
  width: "100%",
  background: "var(--surface-2)",
  border: "1px solid var(--border)",
  color: "var(--white)",
  fontFamily: "'Rajdhani', sans-serif",
  fontSize: "1rem",
  letterSpacing: "0.04em",
  padding: "0.875rem 1rem",
  outline: "none",
  transition: "border-color 0.2s",
  clipPath: "polygon(6px 0%, 100% 0%, calc(100% - 6px) 100%, 0% 100%)",
};

const labelStyle: React.CSSProperties = {
  display: "block",
  fontFamily: "'Bebas Neue', sans-serif",
  fontSize: "0.9rem",
  letterSpacing: "0.18em",
  color: "var(--gold)",
  marginBottom: "0.5rem",
};

export default function ContactoPage() {
  const [submitted, setSubmitted] = useState(false);
  const [focused, setFocused] = useState<string | null>(null);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitted(true);
  }

  function getInputStyle(field: string): React.CSSProperties {
    return {
      ...inputStyle,
      borderColor: focused === field ? "var(--gold)" : "var(--border)",
    };
  }

  return (
    <>
      <Nav />

      <main style={{ paddingTop: "72px" }}>
        {/* ── HERO ───────────────────────────────────── */}
        <section
          style={{
            background: "var(--black)",
            padding: "7rem 2rem 5rem",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "radial-gradient(ellipse at 70% 40%, rgba(201,168,76,0.07) 0%, transparent 60%)",
              pointerEvents: "none",
            }}
          />
          <div style={{ position: "relative", maxWidth: "900px", margin: "0 auto" }}>
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              <h1
                style={{
                  fontFamily: "'Bebas Neue', sans-serif",
                  fontSize: "clamp(4rem, 14vw, 12rem)",
                  letterSpacing: "0.06em",
                  lineHeight: 0.9,
                  margin: "0 0 1.5rem",
                  color: "var(--white)",
                }}
              >
                CON<span className="gold-shimmer" style={{ display: "inline-block" }}>TACTO</span>
              </h1>
              <p
                style={{
                  fontFamily: "'Rajdhani', sans-serif",
                  fontSize: "1.1rem",
                  color: "var(--white-dim)",
                  letterSpacing: "0.1em",
                  maxWidth: "440px",
                  lineHeight: "1.7",
                }}
              >
                Cuéntanos qué necesitas. Te respondemos en menos de 24 horas.
              </p>
            </motion.div>
          </div>
          <div className="blade-line" style={{ marginTop: "4rem" }} />
        </section>

        {/* ── FORM + INFO ─────────────────────────────── */}
        <section style={{ background: "var(--surface)", padding: "5rem 2rem 7rem" }}>
          <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
                gap: "4rem",
                alignItems: "start",
              }}
            >
              {/* Form */}
              <FadeUp delay={0.05}>
                <div>
                  <h2
                    style={{
                      fontFamily: "'Bebas Neue', sans-serif",
                      fontSize: "2rem",
                      letterSpacing: "0.1em",
                      marginBottom: "2rem",
                      color: "var(--white)",
                    }}
                  >
                    ENVÍANOS UN MENSAJE
                  </h2>

                  {submitted ? (
                    <div
                      style={{
                        border: "1px solid var(--gold)",
                        padding: "2rem",
                        clipPath: "polygon(8px 0%, 100% 0%, calc(100% - 8px) 100%, 0% 100%)",
                        background: "var(--surface-2)",
                      }}
                    >
                      <div
                        style={{
                          fontFamily: "'Bebas Neue', sans-serif",
                          fontSize: "1.5rem",
                          letterSpacing: "0.1em",
                          color: "var(--gold)",
                          marginBottom: "0.5rem",
                        }}
                      >
                        ¡Mensaje recibido!
                      </div>
                      <p
                        style={{
                          fontFamily: "'Rajdhani', sans-serif",
                          fontSize: "1rem",
                          color: "var(--white-dim)",
                          lineHeight: "1.7",
                          margin: 0,
                        }}
                      >
                        Te respondemos en menos de 24h.
                      </p>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} noValidate style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                      {/* Nombre */}
                      <div>
                        <label htmlFor="nombre" style={labelStyle}>
                          Nombre
                        </label>
                        <input
                          id="nombre"
                          name="nombre"
                          type="text"
                          placeholder="Tu nombre completo"
                          required
                          style={getInputStyle("nombre")}
                          onFocus={() => setFocused("nombre")}
                          onBlur={() => setFocused(null)}
                        />
                      </div>

                      {/* Email */}
                      <div>
                        <label htmlFor="email" style={labelStyle}>
                          Email
                        </label>
                        <input
                          id="email"
                          name="email"
                          type="email"
                          placeholder="tu@email.com"
                          required
                          style={getInputStyle("email")}
                          onFocus={() => setFocused("email")}
                          onBlur={() => setFocused(null)}
                        />
                      </div>

                      {/* Mensaje */}
                      <div>
                        <label htmlFor="mensaje" style={labelStyle}>
                          Mensaje
                        </label>
                        <textarea
                          id="mensaje"
                          name="mensaje"
                          placeholder="Escribe tu mensaje aquí..."
                          required
                          rows={5}
                          style={{
                            ...getInputStyle("mensaje"),
                            clipPath: "none",
                            resize: "vertical",
                            minHeight: "140px",
                          }}
                          onFocus={() => setFocused("mensaje")}
                          onBlur={() => setFocused(null)}
                        />
                      </div>

                      <button type="submit" className="btn-gold" style={{ alignSelf: "flex-start" }}>
                        ENVIAR MENSAJE
                      </button>
                    </form>
                  )}

                  {/* WhatsApp */}
                  <div style={{ marginTop: "2.5rem" }}>
                    <div className="blade-line" style={{ marginBottom: "2rem" }} />
                    <p
                      style={{
                        fontFamily: "'Rajdhani', sans-serif",
                        fontSize: "0.9rem",
                        letterSpacing: "0.12em",
                        textTransform: "uppercase",
                        color: "var(--white-mute)",
                        marginBottom: "1rem",
                      }}
                    >
                      ¿Prefieres hablar directamente?
                    </p>
                    <a
                      href="https://wa.me/31612345678"
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "0.75rem",
                        background: "#1A6B3C",
                        color: "#F0EDE5",
                        fontFamily: "'Bebas Neue', sans-serif",
                        fontSize: "1.1rem",
                        letterSpacing: "0.12em",
                        padding: "12px 28px",
                        clipPath: "polygon(8px 0%, 100% 0%, calc(100% - 8px) 100%, 0% 100%)",
                        textDecoration: "none",
                        transition: "background 0.2s, transform 0.15s",
                        border: "1px solid #2A9B5A",
                      }}
                      onMouseEnter={(e) => {
                        (e.currentTarget as HTMLAnchorElement).style.background = "#22875C";
                        (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(-2px)";
                      }}
                      onMouseLeave={(e) => {
                        (e.currentTarget as HTMLAnchorElement).style.background = "#1A6B3C";
                        (e.currentTarget as HTMLAnchorElement).style.transform = "none";
                      }}
                    >
                      {/* WhatsApp SVG */}
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                      </svg>
                      ESCRIBIR POR WHATSAPP
                    </a>
                  </div>
                </div>
              </FadeUp>

              {/* Info column */}
              <FadeUp delay={0.15}>
                <div style={{ display: "flex", flexDirection: "column", gap: "2.5rem" }}>
                  <h2
                    style={{
                      fontFamily: "'Bebas Neue', sans-serif",
                      fontSize: "2rem",
                      letterSpacing: "0.1em",
                      color: "var(--white)",
                      marginBottom: 0,
                    }}
                  >
                    INFORMACIÓN
                  </h2>

                  {/* Address */}
                  <div>
                    <div
                      style={{
                        fontFamily: "'Bebas Neue', sans-serif",
                        fontSize: "0.9rem",
                        letterSpacing: "0.2em",
                        color: "var(--gold)",
                        marginBottom: "0.5rem",
                      }}
                    >
                      DIRECCIÓN
                    </div>
                    <p
                      style={{
                        fontFamily: "'Rajdhani', sans-serif",
                        fontSize: "1rem",
                        color: "var(--white-dim)",
                        lineHeight: "1.75",
                        margin: 0,
                      }}
                    >
                      Calle Ejemplo 42<br />
                      1012 AB Amsterdam<br />
                      Países Bajos
                    </p>
                  </div>

                  {/* Phone */}
                  <div>
                    <div
                      style={{
                        fontFamily: "'Bebas Neue', sans-serif",
                        fontSize: "0.9rem",
                        letterSpacing: "0.2em",
                        color: "var(--gold)",
                        marginBottom: "0.5rem",
                      }}
                    >
                      TELÉFONO
                    </div>
                    <a
                      href="tel:+31612345678"
                      style={{
                        fontFamily: "'Rajdhani', sans-serif",
                        fontSize: "1rem",
                        color: "var(--white-dim)",
                        textDecoration: "none",
                        transition: "color 0.2s",
                      }}
                      onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = "var(--gold)"; }}
                      onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = "var(--white-dim)"; }}
                    >
                      +31 6 12 34 56 78
                    </a>
                  </div>

                  {/* Email */}
                  <div>
                    <div
                      style={{
                        fontFamily: "'Bebas Neue', sans-serif",
                        fontSize: "0.9rem",
                        letterSpacing: "0.2em",
                        color: "var(--gold)",
                        marginBottom: "0.5rem",
                      }}
                    >
                      EMAIL
                    </div>
                    <a
                      href="mailto:hola@clubamsterdam.nl"
                      style={{
                        fontFamily: "'Rajdhani', sans-serif",
                        fontSize: "1rem",
                        color: "var(--white-dim)",
                        textDecoration: "none",
                        transition: "color 0.2s",
                      }}
                      onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = "var(--gold)"; }}
                      onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = "var(--white-dim)"; }}
                    >
                      hola@clubamsterdam.nl
                    </a>
                  </div>

                  {/* Hours */}
                  <div>
                    <div
                      style={{
                        fontFamily: "'Bebas Neue', sans-serif",
                        fontSize: "0.9rem",
                        letterSpacing: "0.2em",
                        color: "var(--gold)",
                        marginBottom: "0.75rem",
                      }}
                    >
                      HORARIOS
                    </div>
                    <div
                      style={{
                        fontFamily: "'Rajdhani', sans-serif",
                        fontSize: "1rem",
                        color: "var(--white-dim)",
                        lineHeight: "1.9",
                      }}
                    >
                      {[
                        ["Lunes – Viernes", "10:00 – 20:00"],
                        ["Sábado", "10:00 – 18:00"],
                        ["Domingo", "Cerrado"],
                      ].map(([day, hours]) => (
                        <div
                          key={day}
                          style={{ display: "flex", justifyContent: "space-between", maxWidth: "240px" }}
                        >
                          <span>{day}</span>
                          <span
                            style={{
                              color: hours === "Cerrado" ? "var(--white-mute)" : "var(--white)",
                            }}
                          >
                            {hours}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Blade accent */}
                  <div className="blade-line" />
                  <p
                    style={{
                      fontFamily: "'Rajdhani', sans-serif",
                      fontSize: "0.9rem",
                      color: "var(--white-mute)",
                      lineHeight: "1.7",
                      margin: 0,
                      fontStyle: "italic",
                    }}
                  >
                    Para reservas, utiliza directamente el sistema en línea. El formulario es para consultas generales, membresías y eventos privados.
                  </p>
                </div>
              </FadeUp>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
