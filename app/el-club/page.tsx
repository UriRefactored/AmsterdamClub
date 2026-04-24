"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

function ImagePlaceholder({ label, aspectRatio = "4/3" }: { label: string; aspectRatio?: string }) {
  return (
    <div
      style={{
        border: "1px dashed var(--gold-dim)",
        aspectRatio,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "0.75rem",
        background: "var(--surface-2)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: "12px",
          border: "1px solid var(--surface-3)",
        }}
      />
      <svg width="28" height="28" viewBox="0 0 32 32" fill="none" style={{ opacity: 0.35 }}>
        <rect x="2" y="6" width="28" height="20" rx="1" stroke="var(--gold)" strokeWidth="1" />
        <circle cx="11" cy="13" r="3" stroke="var(--gold)" strokeWidth="1" />
        <path d="M2 22L10 15L16 21L21 17L30 26" stroke="var(--gold)" strokeWidth="1" strokeLinecap="square" />
      </svg>
      <span
        style={{
          fontFamily: "'Rajdhani', sans-serif",
          fontSize: "0.75rem",
          letterSpacing: "0.2em",
          textTransform: "uppercase",
          color: "var(--white-mute)",
          textAlign: "center",
          padding: "0 1rem"
        }}
      >
        {label}
      </span>
    </div>
  );
}

const TABS = [
  { id: "historia", label: "NUESTRA HISTORIA" },
  { id: "espacio", label: "EL ESPACIO" },
  { id: "ubicacion", label: "CÓMO LLEGAR" },
];

export default function ElClubPage() {
  const [activeTab, setActiveTab] = useState(TABS[0].id);

  return (
    <>
      <Nav />

      <main style={{ paddingTop: "72px", minHeight: "100vh", display: "flex", flexDirection: "column" }}>
        {/* ── HERO & NAVIGATION ──────────────────────── */}
        <section
          style={{
            background: "var(--black)",
            padding: "5rem 2rem 0",
            position: "relative",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "radial-gradient(ellipse at 50% 0%, rgba(201,168,76,0.08) 0%, transparent 70%)",
              pointerEvents: "none",
            }}
          />
          <div style={{ position: "relative", width: "100%", maxWidth: "900px", textAlign: "center" }}>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              <h1
                style={{
                  fontFamily: "'Bebas Neue', sans-serif",
                  fontSize: "clamp(3.5rem, 10vw, 8rem)",
                  letterSpacing: "0.06em",
                  lineHeight: 0.9,
                  margin: "0 0 1rem",
                  color: "var(--white)",
                }}
              >
                EL{" "}
                <span className="gold-shimmer" style={{ display: "inline-block" }}>
                  CLUB
                </span>
              </h1>
              <p
                style={{
                  fontFamily: "'Rajdhani', sans-serif",
                  fontSize: "1.15rem",
                  color: "var(--white-dim)",
                  letterSpacing: "0.08em",
                  margin: "0 auto 3rem",
                }}
              >
                Más que una barbería.
              </p>
            </motion.div>

            {/* Tabs */}
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              transition={{ delay: 0.3, duration: 0.8 }}
              style={{
                display: "flex",
                gap: "2rem",
                justifyContent: "center",
                borderBottom: "1px solid var(--surface-3)",
                paddingBottom: "1px", // Para alinear el indicador
                overflowX: "auto",
                scrollbarWidth: "none"
              }}
            >
              {TABS.map((tab) => {
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    style={{
                      background: "none",
                      border: "none",
                      padding: "0 0 1rem",
                      cursor: "pointer",
                      position: "relative",
                      outline: "none",
                      whiteSpace: "nowrap"
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "'Rajdhani', sans-serif",
                        fontSize: "0.9rem",
                        letterSpacing: "0.15em",
                        textTransform: "uppercase",
                        fontWeight: isActive ? 600 : 400,
                        color: isActive ? "var(--gold)" : "var(--white-mute)",
                        transition: "color 0.3s ease",
                      }}
                    >
                      {tab.label}
                    </span>
                    {isActive && (
                      <motion.div
                        layoutId="activeTabIndicator"
                        style={{
                          position: "absolute",
                          bottom: "-1px", 
                          left: 0,
                          right: 0,
                          height: "2px",
                          background: "var(--gold)",
                        }}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      />
                    )}
                  </button>
                );
              })}
            </motion.div>
          </div>
        </section>

        {/* ── DYNAMIC CONTENT ────────────────────────── */}
        <section 
          style={{ 
            flex: 1, 
            background: "var(--surface)", 
            padding: "4rem 2rem 6rem",
            position: "relative",
            minHeight: "60vh",
            overflow: "hidden" 
          }}
        >
          <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
            <AnimatePresence mode="wait">
              
              {/* HISTORIA */}
              {activeTab === "historia" && (
                <motion.div
                  key="historia"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
                    gap: "5rem",
                    alignItems: "center",
                  }}
                >
                  <div>
                    <h2
                      style={{
                        fontFamily: "'Bebas Neue', sans-serif",
                        fontSize: "clamp(2.5rem, 4vw, 3.5rem)",
                        letterSpacing: "0.1em",
                        marginBottom: "1.5rem",
                        lineHeight: 0.95,
                      }}
                    >
                      UN ESPACIO CONSTRUIDO CON INTENCIÓN
                    </h2>
                    <p
                      style={{
                        fontFamily: "'Rajdhani', sans-serif",
                        fontSize: "1.05rem",
                        color: "var(--white-dim)",
                        lineHeight: "1.85",
                        marginBottom: "1.25rem",
                      }}
                    >
                      Club Amsterdam nació de una premisa simple: Amsterdam merece
                      una barbería a la altura de su cultura. Una ciudad que valora
                      el diseño, la calidad y la precisión — y eso es exactamente
                      lo que traemos al asiento del barbero.
                    </p>
                    <p
                      style={{
                        fontFamily: "'Rajdhani', sans-serif",
                        fontSize: "1.05rem",
                        color: "var(--white-dim)",
                        lineHeight: "1.85",
                        marginBottom: "1.25rem",
                      }}
                    >
                      Cada detalle del espacio ha sido elegido con la misma atención
                      que ponemos en cada corte. Las sillas de cuero envejecido, los
                      espejos con marco de cobre, la luz cálida y cuidada. Nada es
                      accidental.
                    </p>
                    <p
                      style={{
                        fontFamily: "'Rajdhani', sans-serif",
                        fontSize: "1.05rem",
                        color: "var(--white-dim)",
                        lineHeight: "1.85",
                      }}
                    >
                      No somos una cadena. No somos un local de paso. Somos el club
                      al que quieres pertenecer.
                    </p>
                  </div>
                  <ImagePlaceholder label="Fotografía del espacio" aspectRatio="3/4" />
                </motion.div>
              )}

              {/* ESPACIO (GALERÍA) */}
              {activeTab === "espacio" && (
                <motion.div
                  key="espacio"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                >
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                      gap: "1.5rem",
                    }}
                  >
                    {[
                      "Interior — Zona principal",
                      "Detalle — Sillas de cuero",
                      "Ambiente — Iluminación",
                    ].map((label, i) => (
                      <motion.div 
                        key={label}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.1, duration: 0.5 }}
                      >
                        <ImagePlaceholder label={label} aspectRatio="4/3" />
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* UBICACIÓN */}
              {activeTab === "ubicacion" && (
                <motion.div
                  key="ubicacion"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                    gap: "4rem",
                    alignItems: "start",
                  }}
                >
                  <div style={{ display: "flex", flexDirection: "column", gap: "2.5rem" }}>
                    <div>
                      <div
                        style={{
                          fontFamily: "'Bebas Neue', sans-serif",
                          fontSize: "1.1rem",
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
                          fontSize: "1.05rem",
                          color: "var(--white-dim)",
                          lineHeight: "1.7",
                          margin: 0,
                        }}
                      >
                        Calle Ejemplo 42<br />
                        1012 AB Amsterdam<br />
                        Países Bajos
                      </p>
                    </div>

                    <div>
                      <div
                        style={{
                          fontFamily: "'Bebas Neue', sans-serif",
                          fontSize: "1.1rem",
                          letterSpacing: "0.2em",
                          color: "var(--gold)",
                          marginBottom: "1rem",
                        }}
                      >
                        HORARIOS
                      </div>
                      <div
                        style={{
                          fontFamily: "'Rajdhani', sans-serif",
                          fontSize: "1.05rem",
                          color: "var(--white-dim)",
                          lineHeight: "2",
                        }}
                      >
                        {[
                          ["Lunes – Viernes", "10:00 – 20:00"],
                          ["Sábado", "10:00 – 18:00"],
                          ["Domingo", "Cerrado"],
                        ].map(([day, hours]) => (
                          <div
                            key={day}
                            style={{ 
                              display: "flex", 
                              justifyContent: "space-between", 
                              maxWidth: "320px", 
                              borderBottom: "1px dashed var(--surface-3)", 
                              paddingBottom: "0.5rem", 
                              marginBottom: "0.5rem" 
                            }}
                          >
                            <span>{day}</span>
                            <span
                              style={{
                                color: hours === "Cerrado" ? "var(--white-mute)" : "var(--white)",
                                fontWeight: hours !== "Cerrado" ? 600 : 400
                              }}
                            >
                              {hours}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <div
                        style={{
                          fontFamily: "'Bebas Neue', sans-serif",
                          fontSize: "1.1rem",
                          letterSpacing: "0.2em",
                          color: "var(--gold)",
                          marginBottom: "0.5rem",
                        }}
                      >
                        TRANSPORTE
                      </div>
                      <p
                        style={{
                          fontFamily: "'Rajdhani', sans-serif",
                          fontSize: "1.05rem",
                          color: "var(--white-dim)",
                          lineHeight: "1.7",
                          margin: 0,
                        }}
                      >
                        Metro: Línea 52 — Parada Centraal (5 min a pie)<br />
                        Tranvía: Líneas 2, 12 — Parada Spui<br />
                        Parking: Garaje Centraal (200m)
                      </p>
                    </div>
                  </div>

                  <div
                    style={{
                      border: "1px dashed var(--gold-dim)",
                      minHeight: "450px",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "1rem",
                      background: "var(--surface-2)",
                      position: "relative",
                    }}
                  >
                    <div
                      style={{
                        position: "absolute",
                        inset: "12px",
                        border: "1px solid var(--surface-3)",
                      }}
                    />
                    <svg width="40" height="40" viewBox="0 0 32 32" fill="none" style={{ opacity: 0.4 }}>
                      <path
                        d="M16 3C11.582 3 8 6.582 8 11C8 17.5 16 29 16 29C16 29 24 17.5 24 11C24 6.582 20.418 3 16 3Z"
                        stroke="var(--gold)"
                        strokeWidth="1.5"
                        fill="none"
                      />
                      <circle cx="16" cy="11" r="3" stroke="var(--gold)" strokeWidth="1.5" />
                    </svg>
                    <span
                      style={{
                        fontFamily: "'Rajdhani', sans-serif",
                        fontSize: "0.85rem",
                        letterSpacing: "0.2em",
                        textTransform: "uppercase",
                        color: "var(--white-mute)",
                      }}
                    >
                      Google Maps
                    </span>
                    <span
                      style={{
                        fontFamily: "'Rajdhani', sans-serif",
                        fontSize: "0.75rem",
                        color: "var(--white-mute)",
                        opacity: 0.6,
                      }}
                    >
                      [Mapa interactivo en producción]
                    </span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
