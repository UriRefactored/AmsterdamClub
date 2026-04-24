"use client";

import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
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

function GoldCheck() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ flexShrink: 0, marginTop: "3px" }}>
      <path d="M2 7L5.5 10.5L12 3.5" stroke="var(--gold)" strokeWidth="1.5" strokeLinecap="square" />
    </svg>
  );
}

function CrossIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" style={{ flexShrink: 0, marginTop: "3px" }}>
      <path d="M2 2L10 10M10 2L2 10" stroke="var(--white-mute)" strokeWidth="1.5" strokeLinecap="square" />
    </svg>
  );
}

const features = [
  "Reserva estándar online",
  "Precio regular de tarifa",
  "Depósito previo de €5",
  "1 corte incluido al mes",
  "Reserva prioritaria garantizada",
  "Sin depósito previo",
  "10% descuento en productos",
  "Cortes ilimitados",
  "Barba incluida",
  "Whisky de la casa",
  "Acceso after-hours",
  "Consultor de imagen personal",
];

const plans: {
  name: string;
  price: string;
  priceSub: string;
  featured?: boolean;
  badge?: string;
  features: boolean[];
  cta: string;
}[] = [
  {
    name: "VISITANTE",
    price: "Libre",
    priceSub: "Pago por visita",
    features: [true, true, true, false, false, false, false, false, false, false, false, false],
    cta: "EMPEZAR AQUÍ",
  },
  {
    name: "CLÁSICO",
    price: "€39",
    priceSub: "al mes",
    featured: true,
    badge: "MÁS POPULAR",
    features: [true, false, false, true, true, true, true, false, false, false, false, false],
    cta: "HAZTE MIEMBRO",
  },
  {
    name: "FUNDADOR",
    price: "€89",
    priceSub: "al mes",
    features: [true, false, false, false, true, true, true, true, true, true, true, true],
    cta: "ACCEDER AL CLUB",
  },
];

/* ── FAQ Accordion ────────────────────────────────── */
function FaqItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div
      style={{
        borderBottom: "1px solid var(--border)",
      }}
    >
      <button
        onClick={() => setOpen(!open)}
        style={{
          width: "100%",
          background: "none",
          border: "none",
          cursor: "pointer",
          padding: "1.5rem 0",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: "1rem",
          textAlign: "left",
        }}
      >
        <span
          style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: "1.3rem",
            letterSpacing: "0.08em",
            color: open ? "var(--gold)" : "var(--white)",
            transition: "color 0.2s",
          }}
        >
          {question}
        </span>
        <span
          style={{
            color: "var(--gold)",
            fontSize: "1.5rem",
            lineHeight: 1,
            transform: open ? "rotate(45deg)" : "rotate(0deg)",
            transition: "transform 0.3s ease",
            flexShrink: 0,
          }}
        >
          +
        </span>
      </button>
      <div
        style={{
          maxHeight: open ? "400px" : "0",
          overflow: "hidden",
          transition: "max-height 0.4s ease",
        }}
      >
        <p
          style={{
            fontFamily: "'Rajdhani', sans-serif",
            fontSize: "1rem",
            color: "var(--white-dim)",
            lineHeight: "1.8",
            paddingBottom: "1.5rem",
            margin: 0,
          }}
        >
          {answer}
        </p>
      </div>
    </div>
  );
}

export default function MembresiaPage() {
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
                "radial-gradient(ellipse at 50% 60%, rgba(201,168,76,0.07) 0%, transparent 65%)",
              pointerEvents: "none",
            }}
          />
          <div style={{ position: "relative", maxWidth: "900px", margin: "0 auto", textAlign: "center" }}>
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
                MEMB<span className="gold-shimmer">RESÍAS</span>
              </h1>
              <p
                style={{
                  fontFamily: "'Rajdhani', sans-serif",
                  fontSize: "1.1rem",
                  color: "var(--white-dim)",
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  maxWidth: "500px",
                  margin: "0 auto",
                  lineHeight: "1.7",
                }}
              >
                Elige el nivel que encaja con tu ritmo. Sin permanencia. Sin sorpresas.
              </p>
            </motion.div>
          </div>
          <div className="blade-line" style={{ marginTop: "4rem" }} />
        </section>

        {/* ── COMPARISON TABLE ───────────────────────── */}
        <section style={{ background: "var(--surface)", padding: "5rem 2rem" }}>
          <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
            <FadeUp>
              <div style={{ overflowX: "auto" }}>
                <table style={{ width: "100%", borderCollapse: "collapse", minWidth: "600px" }}>
                  <thead>
                    <tr>
                      <th
                        style={{
                          fontFamily: "'Bebas Neue', sans-serif",
                          fontSize: "1rem",
                          letterSpacing: "0.15em",
                          color: "var(--white-mute)",
                          textAlign: "left",
                          padding: "0 0 2rem",
                          width: "40%",
                          borderBottom: "1px solid var(--border)",
                        }}
                      >
                        CARACTERÍSTICA
                      </th>
                      {plans.map((p) => (
                        <th
                          key={p.name}
                          style={{
                            padding: "0 1.5rem 2rem",
                            textAlign: "center",
                            borderBottom: `1px solid ${p.featured ? "var(--gold)" : "var(--border)"}`,
                            position: "relative",
                          }}
                        >
                          {p.badge && (
                            <div
                              style={{
                                position: "absolute",
                                top: 0,
                                left: "50%",
                                transform: "translateX(-50%)",
                                background: "var(--gold)",
                                color: "var(--black)",
                                fontFamily: "'Bebas Neue', sans-serif",
                                fontSize: "0.65rem",
                                letterSpacing: "0.12em",
                                padding: "2px 12px",
                                clipPath: "polygon(4px 0%, 100% 0%, calc(100% - 4px) 100%, 0% 100%)",
                                whiteSpace: "nowrap",
                              }}
                            >
                              {p.badge}
                            </div>
                          )}
                          <div
                            style={{
                              fontFamily: "'Bebas Neue', sans-serif",
                              fontSize: "1.5rem",
                              letterSpacing: "0.1em",
                              color: p.featured ? "var(--gold)" : "var(--white)",
                              marginTop: p.badge ? "1.5rem" : 0,
                            }}
                          >
                            {p.name}
                          </div>
                          <div
                            style={{
                              fontFamily: "'Bebas Neue', sans-serif",
                              fontSize: "2rem",
                              color: p.featured ? "var(--gold-bright)" : "var(--white)",
                              lineHeight: 1,
                            }}
                          >
                            {p.price}
                          </div>
                          <div
                            style={{
                              fontFamily: "'Rajdhani', sans-serif",
                              fontSize: "0.8rem",
                              color: "var(--white-mute)",
                              letterSpacing: "0.08em",
                              textTransform: "uppercase",
                            }}
                          >
                            {p.priceSub}
                          </div>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {features.map((feat, fi) => (
                      <tr
                        key={feat}
                        style={{
                          borderBottom: "1px solid var(--border)",
                        }}
                      >
                        <td
                          style={{
                            padding: "1rem 0",
                            fontFamily: "'Rajdhani', sans-serif",
                            fontSize: "0.95rem",
                            color: "var(--white-dim)",
                            letterSpacing: "0.04em",
                          }}
                        >
                          {feat}
                        </td>
                        {plans.map((p) => (
                          <td key={p.name} style={{ textAlign: "center", padding: "1rem 1.5rem" }}>
                            <div style={{ display: "flex", justifyContent: "center" }}>
                              {p.features[fi] ? <GoldCheck /> : <CrossIcon />}
                            </div>
                          </td>
                        ))}
                      </tr>
                    ))}
                    {/* CTA row */}
                    <tr>
                      <td style={{ padding: "2rem 0" }} />
                      {plans.map((p) => (
                        <td key={p.name} style={{ padding: "2rem 1.5rem", textAlign: "center" }}>
                          <Link
                            href="/reservar"
                            className={p.featured ? "btn-gold" : "btn-outline"}
                            style={{ justifyContent: "center" }}
                          >
                            {p.cta}
                          </Link>
                        </td>
                      ))}
                    </tr>
                  </tbody>
                </table>
              </div>
            </FadeUp>
          </div>
        </section>

        {/* ── FUNDADOR FULL-WIDTH ─────────────────────── */}
        <section style={{ background: "var(--black)", padding: "5rem 2rem" }}>
          <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
            <FadeUp>
              <div
                style={{
                  border: "1px solid var(--gold)",
                  background: "var(--surface-2)",
                  clipPath: "polygon(16px 0%, 100% 0%, calc(100% - 16px) 100%, 0% 100%)",
                  padding: "3.5rem 4rem",
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                  gap: "3rem",
                  alignItems: "center",
                  boxShadow: "0 0 60px rgba(201,168,76,0.08)",
                }}
              >
                <div>
                  <div
                    style={{
                      fontFamily: "'Rajdhani', sans-serif",
                      fontSize: "0.8rem",
                      letterSpacing: "0.25em",
                      textTransform: "uppercase",
                      color: "var(--gold-dim)",
                      marginBottom: "0.75rem",
                    }}
                  >
                    Nivel máximo
                  </div>
                  <h2
                    className="gold-shimmer"
                    style={{
                      fontFamily: "'Bebas Neue', sans-serif",
                      fontSize: "4rem",
                      letterSpacing: "0.1em",
                      margin: "0 0 1rem",
                      display: "block",
                    }}
                  >
                    FUNDADOR
                  </h2>
                  <p
                    style={{
                      fontFamily: "'Rajdhani', sans-serif",
                      fontSize: "1.05rem",
                      color: "var(--white-dim)",
                      lineHeight: "1.8",
                      margin: 0,
                    }}
                  >
                    Para quien entiende que el tiempo, la imagen y el espacio
                    son inversiones — no gastos. El plan Fundador es la experiencia
                    completa del Club Amsterdam, sin limitaciones.
                  </p>
                </div>
                <div>
                  <ul style={{ listStyle: "none", margin: "0 0 2.5rem", padding: 0, display: "flex", flexDirection: "column", gap: "0.85rem" }}>
                    {[
                      "Cortes ilimitados — ven cuando quieras",
                      "Barba y arreglo incluidos en cada visita",
                      "Whisky de la casa al llegar",
                      "Acceso after-hours y eventos privados",
                      "Reserva instantánea sin depósito",
                      "Consultor de imagen personal",
                    ].map((b) => (
                      <li
                        key={b}
                        style={{
                          display: "flex",
                          alignItems: "flex-start",
                          gap: "0.75rem",
                          fontFamily: "'Rajdhani', sans-serif",
                          fontSize: "1rem",
                          color: "var(--white-dim)",
                        }}
                      >
                        <GoldCheck />
                        {b}
                      </li>
                    ))}
                  </ul>
                  <div style={{ display: "flex", alignItems: "baseline", gap: "0.75rem", marginBottom: "2rem" }}>
                    <span
                      style={{
                        fontFamily: "'Bebas Neue', sans-serif",
                        fontSize: "3.5rem",
                        color: "var(--gold-bright)",
                        lineHeight: 1,
                      }}
                    >
                      €89
                    </span>
                    <span
                      style={{
                        fontFamily: "'Rajdhani', sans-serif",
                        color: "var(--white-dim)",
                        fontSize: "0.9rem",
                        letterSpacing: "0.08em",
                        textTransform: "uppercase",
                      }}
                    >
                      / mes
                    </span>
                  </div>
                  <Link href="/reservar" className="btn-gold">
                    ACCEDER AL CLUB
                  </Link>
                </div>
              </div>
            </FadeUp>
          </div>
        </section>

        {/* ── FAQ ────────────────────────────────────── */}
        <section style={{ background: "var(--surface)", padding: "5rem 2rem 7rem" }}>
          <div style={{ maxWidth: "700px", margin: "0 auto" }}>
            <FadeUp>
              <h2
                style={{
                  fontFamily: "'Bebas Neue', sans-serif",
                  fontSize: "clamp(2rem, 5vw, 3.5rem)",
                  letterSpacing: "0.1em",
                  marginBottom: "2.5rem",
                  textAlign: "center",
                }}
              >
                PREGUNTAS FRECUENTES
              </h2>
            </FadeUp>

            <FadeUp delay={0.1}>
              <div style={{ borderTop: "1px solid var(--border)" }}>
                <FaqItem
                  question="¿Puedo cancelar mi membresía en cualquier momento?"
                  answer="Sí. Puedes cancelar tu membresía en cualquier momento desde tu perfil o contactando con nosotros directamente. No hay permanencia mínima ni penalizaciones. El acceso se mantiene hasta el final del período facturado."
                />
                <FaqItem
                  question="¿Qué pasa si no uso mi corte mensual del plan Clásico?"
                  answer="Los cortes del plan Clásico no se acumulan ni se transfieren al mes siguiente. Recomendamos reservar a principios de mes para asegurarte tu cita."
                />
                <FaqItem
                  question="¿El depósito de €5 del plan Visitante se descuenta del precio final?"
                  answer="Sí. El depósito de €5 se aplica íntegramente al precio del servicio el día de tu visita. Existe para reducir las cancelaciones de última hora y garantizar la disponibilidad para todos."
                />
                <FaqItem
                  question="¿Puedo cambiar de plan después de registrarme?"
                  answer="Por supuesto. Puedes subir o bajar de plan en cualquier momento. Los cambios se aplican en el siguiente ciclo de facturación. Si subes de plan, el acceso al nuevo nivel es inmediato."
                />
              </div>
            </FadeUp>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
