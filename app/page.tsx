"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

/* ── Íconos y Utilidades ──────────────────────────── */
function GoldCheck() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ flexShrink: 0, marginTop: "4px" }}>
      <path d="M2 7L5.5 10.5L12 3.5" stroke="var(--gold)" strokeWidth="1.5" strokeLinecap="square" />
    </svg>
  );
}

function RazorIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" strokeWidth="1.5">
      <path d="M4 20L20 4M20 4V10M20 4H14" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function CalendarIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
      <line x1="16" y1="2" x2="16" y2="6"></line>
      <line x1="8" y1="2" x2="8" y2="6"></line>
      <line x1="3" y1="10" x2="21" y2="10"></line>
    </svg>
  );
}

function StoreIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
      <polyline points="9 22 9 12 15 12 15 22"></polyline>
    </svg>
  );
}

function CrownIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
    </svg>
  );
}

function ArrowUpIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="12" y1="19" x2="12" y2="5"></line>
      <polyline points="5 12 12 5 19 12"></polyline>
    </svg>
  );
}

/* ── Datos de las Membresías ──────────────────────── */
const MEMBERSHIPS = [
  {
    id: "visitante",
    tier: "VISITANTE",
    benefits: ["Reserva estándar online", "Acceso a todos los servicios", "Experiencia premium Club Amsterdam"],
    price: "Libre",
    priceLabel: "Pago por visita",
    cta: "IR AL CALENDARIO",
    link: "/reservar",
    featured: false,
  },
  {
    id: "clasico",
    tier: "CLÁSICO",
    benefits: ["1 corte incluido al mes", "Reserva prioritaria garantizada", "10% descuento en productos", "Sin depósito previo"],
    price: "€39",
    priceLabel: "por mes",
    cta: "HAZTE MIEMBRO",
    link: "/membresias",
    featured: true,
  },
  {
    id: "fundador",
    tier: "FUNDADOR",
    benefits: ["Cortes ilimitados", "Servicio de barba en cada visita", "Whisky de cortesía", "Acceso after-hours exclusivo"],
    price: "€89",
    priceLabel: "por mes",
    cta: "ACCEDER AL CLUB",
    link: "/membresias",
    featured: false,
  },
];

/* ── Tarjeta Interactiva ──────────────────────────── */
function InteractiveCard({ plan, delay }: { plan: any; delay: number }) {
  const [showPrice, setShowPrice] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
      style={{
        position: "relative",
        background: plan.featured ? "var(--surface-2)" : "var(--surface)",
        border: `1px solid ${plan.featured ? "var(--gold)" : "var(--border)"}`,
        clipPath: "polygon(12px 0%, 100% 0%, calc(100% - 12px) 100%, 0% 100%)",
        padding: "2.5rem 2rem",
        display: "flex",
        flexDirection: "column",
        gap: "1.5rem",
        boxShadow: plan.featured ? "0 0 40px rgba(201,168,76,0.12)" : "none",
        minHeight: "400px",
      }}
    >
      {plan.featured && (
        <div style={{ position: "absolute", top: "-1px", left: "50%", transform: "translateX(-50%)", background: "var(--gold)", color: "var(--black)", fontFamily: "'Bebas Neue', sans-serif", fontSize: "0.85rem", letterSpacing: "0.15em", padding: "4px 20px", clipPath: "polygon(6px 0%, 100% 0%, calc(100% - 6px) 100%, 0% 100%)", whiteSpace: "nowrap" }}>
          MÁS ELEGIDO
        </div>
      )}

      <div>
        <h3 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "2rem", letterSpacing: "0.1em", color: plan.featured ? "var(--gold)" : "var(--white)", margin: 0, lineHeight: 1 }}>{plan.tier}</h3>
        <div style={{ height: "1px", background: "var(--border)", marginTop: "1rem" }} />
      </div>

      <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: "1rem", flex: 1 }}>
        {plan.benefits.map((b: string, i: number) => (
          <motion.li key={b} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: delay + 0.2 + i * 0.1 }} style={{ display: "flex", alignItems: "flex-start", gap: "0.75rem", fontFamily: "'Rajdhani', sans-serif", fontSize: "1.05rem", color: "var(--white-dim)", lineHeight: "1.4" }}>
            <GoldCheck />{b}
          </motion.li>
        ))}
      </ul>

      <AnimatePresence mode="wait">
        {!showPrice ? (
          <motion.button key="reveal" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={(e) => { e.stopPropagation(); setShowPrice(true); }} className="btn-outline" style={{ width: "100%", justifyContent: "center", borderStyle: "dashed", borderColor: "var(--gold-dim)", color: "var(--gold)", position: "relative", zIndex: 10 }}>
            VER INVERSIÓN
          </motion.button>
        ) : (
          <motion.div key="price" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} style={{ display: "flex", flexDirection: "column", gap: "1.25rem", alignItems: "center" }}>
            <div style={{ textAlign: "center", padding: "0.5rem 0" }}>
              <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "3rem", color: plan.featured ? "var(--gold-bright)" : "var(--white)", lineHeight: 1, letterSpacing: "0.05em" }}>{plan.price}</div>
              <div style={{ fontFamily: "'Rajdhani', sans-serif", fontSize: "0.9rem", color: "var(--white-dim)", textTransform: "uppercase", letterSpacing: "0.1em", marginTop: "0.25rem" }}>{plan.priceLabel}</div>
            </div>
            <Link href={plan.link} className={plan.featured ? "btn-gold" : "btn-outline"} style={{ width: "100%", justifyContent: "center", position: "relative", zIndex: 10 }}>
              {plan.cta}
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

/* ── Main page ────────────────────────────────────── */
export default function Home() {
  const [view, setView] = useState<"hero" | "left" | "right" | "bottom">("hero");
  
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [windowSize, setWindowSize] = useState({ w: 1000, h: 1000 });
  const [hoverZone, setHoverZone] = useState<"center" | "left" | "right" | "bottom" | "top">("center");
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    setIsDesktop(window.innerWidth > 768);
    setWindowSize({ w: window.innerWidth, h: window.innerHeight });

    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
      const w = window.innerWidth;
      const h = window.innerHeight;
      
      // Si estamos DENTRO de una sección, solo revelamos el "Top" para volver al inicio
      if (view !== "hero") {
        if (e.clientY < h * 0.15) setHoverZone("top");
        else setHoverZone("center");
        return;
      }
      
      // Si estamos en el Hero, revelamos las esquinas ocultas
      if (e.clientX < w * 0.15) setHoverZone("left");
      else if (e.clientX > w * 0.85) setHoverZone("right");
      else if (e.clientY > h * 0.85 && e.clientX > w * 0.15 && e.clientX < w * 0.85) setHoverZone("bottom");
      else setHoverZone("center");
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [view]);

  // Manejar clic general en la zona
  const handleZoneClick = () => {
    if (view === "hero" && hoverZone !== "center" && hoverZone !== "top") {
      setView(hoverZone as "left" | "right" | "bottom");
    } else if (view !== "hero" && hoverZone === "top") {
      setView("hero");
      setHoverZone("center");
    }
  };

  // Parallax Inverso (Se mueve en la dirección opuesta al mouse)
  const parallaxOffsetX = isDesktop ? (mousePos.x - windowSize.w / 2) * -0.05 : 0;
  const parallaxOffsetY = isDesktop ? (mousePos.y - windowSize.h / 2) * -0.05 : 0;

  return (
    <>
      <main
        onClick={handleZoneClick}
        style={{
          minHeight: "100vh",
          background: "var(--black)",
          position: "relative",
          overflow: "hidden",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* Background Gradients & Textures */}
        <motion.div
          animate={{
            backgroundPosition: hoverZone === "left" ? "20% 50%" : hoverZone === "right" ? "80% 50%" : hoverZone === "bottom" ? "50% 80%" : "50% 50%",
          }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          style={{
            position: "absolute",
            inset: -100, // Oversize para parallax
            background: "radial-gradient(ellipse at center, rgba(201,168,76,0.15) 0%, transparent 50%)",
            pointerEvents: "none",
          }}
        />
        <div style={{ position: "absolute", inset: 0, opacity: 0.035, backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`, backgroundRepeat: "repeat", backgroundSize: "256px 256px", pointerEvents: "none" }} />

        {/* ── PÁGINAS OCULTAS (PEEKS) ── */}

        {/* Peek Izquierdo (El Local) */}
        {view === "hero" && (
          <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: "100px", overflow: "hidden", zIndex: 50, pointerEvents: hoverZone === "left" ? "auto" : "none" }}>
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: hoverZone === "left" ? 0 : "-100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              style={{ width: "100%", height: "100%", background: "rgba(16,16,16,0.8)", borderRight: "1px solid var(--gold)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", cursor: "pointer", backdropFilter: "blur(12px)" }}
            >
              <StoreIcon />
              <span style={{ writingMode: "vertical-rl", transform: "rotate(180deg)", marginTop: "1rem", fontFamily: "'Bebas Neue', sans-serif", fontSize: "1.5rem", letterSpacing: "0.15em", color: "var(--gold)" }}>
                EL LOCAL
              </span>
            </motion.div>
          </div>
        )}

        {/* Peek Derecho (Calendario) */}
        {view === "hero" && (
          <div style={{ position: "absolute", right: 0, top: 0, bottom: 0, width: "100px", overflow: "hidden", zIndex: 50, pointerEvents: hoverZone === "right" ? "auto" : "none" }}>
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: hoverZone === "right" ? 0 : "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              style={{ width: "100%", height: "100%", background: "rgba(16,16,16,0.8)", borderLeft: "1px solid var(--gold)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", cursor: "pointer", backdropFilter: "blur(12px)", color: "var(--gold)" }}
            >
              <CalendarIcon />
              <span style={{ writingMode: "vertical-rl", transform: "rotate(180deg)", marginTop: "1rem", fontFamily: "'Bebas Neue', sans-serif", fontSize: "1.5rem", letterSpacing: "0.15em" }}>
                CALENDARIO
              </span>
            </motion.div>
          </div>
        )}

        {/* Peek Inferior (Membresías) */}
        {view === "hero" && (
          <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "100px", overflow: "hidden", zIndex: 50, pointerEvents: hoverZone === "bottom" ? "auto" : "none" }}>
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: hoverZone === "bottom" ? 0 : "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              style={{ width: "100%", height: "100%", background: "rgba(16,16,16,0.8)", borderTop: "1px solid var(--gold)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", backdropFilter: "blur(12px)", color: "var(--gold)" }}
            >
              <CrownIcon />
              <span style={{ marginLeft: "1rem", fontFamily: "'Bebas Neue', sans-serif", fontSize: "1.8rem", letterSpacing: "0.15em", marginTop: "4px" }}>
                MEMBRESÍAS
              </span>
            </motion.div>
          </div>
        )}

        {/* Peek Superior (Volver al Inicio) */}
        {view !== "hero" && (
          <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "90px", overflow: "hidden", zIndex: 9999, pointerEvents: hoverZone === "top" ? "auto" : "none" }}>
            <motion.div
              initial={{ y: "-100%" }}
              animate={{ y: hoverZone === "top" ? 0 : "-100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              style={{ width: "100%", height: "100%", background: "rgba(16,16,16,0.9)", borderBottom: "1px solid var(--gold)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", backdropFilter: "blur(15px)", color: "var(--gold)" }}
            >
              <ArrowUpIcon />
              <span style={{ marginLeft: "1rem", fontFamily: "'Bebas Neue', sans-serif", fontSize: "1.5rem", letterSpacing: "0.15em", marginTop: "4px" }}>
                VOLVER AL INICIO
              </span>
            </motion.div>
          </div>
        )}


        <div style={{ width: "100%", maxWidth: "1200px", padding: "2rem", position: "relative", zIndex: 1, marginTop: 0 }}>
          <AnimatePresence mode="wait">
            
            {/* VIEW 1: HERO IMPACTANTE */}
            {view === "hero" && (
              <motion.div
                key="hero"
                initial={{ opacity: 0, filter: "blur(5px)" }}
                animate={{ opacity: 1, filter: "blur(0px)", x: parallaxOffsetX, y: parallaxOffsetY }}
                exit={{ opacity: 0, filter: "blur(10px)", scale: 0.95 }}
                transition={{ 
                  duration: 0.6, 
                  ease: [0.22, 1, 0.36, 1],
                  x: { type: "spring", stiffness: 200, damping: 30 },
                  y: { type: "spring", stiffness: 200, damping: 30 }
                }}
                style={{ textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center" }}
              >
                <h1 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(5rem, 16vw, 12rem)", color: "var(--white)", lineHeight: 0.85, margin: 0, letterSpacing: "0.02em" }}>
                  CLUB
                </h1>
                <h1 className="gold-shimmer" style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(5rem, 16vw, 12rem)", lineHeight: 0.85, margin: 0, letterSpacing: "0.02em" }}>
                  AMSTERDAM
                </h1>

                <p style={{ fontFamily: "'Rajdhani', sans-serif", fontSize: "1.25rem", letterSpacing: "0.25em", color: "var(--white-dim)", textTransform: "uppercase", marginTop: "2rem", marginBottom: "4rem" }}>
                  El arte del detalle.
                </p>

                {/* CTAs estáticos para móvil y para backup */}
                <div style={{ display: "flex", gap: "2rem", flexWrap: "wrap", justifyContent: "center", position: "relative", zIndex: 10 }}>
                  {!isDesktop && (
                    <>
                      <button onClick={(e) => { e.stopPropagation(); setView("left"); }} className="btn-outline">EL LOCAL</button>
                      <button onClick={(e) => { e.stopPropagation(); setView("right"); }} className="btn-gold">RESERVAR SILLA</button>
                      <button onClick={(e) => { e.stopPropagation(); setView("bottom"); }} className="btn-outline">MEMBRESÍAS</button>
                    </>
                  )}
                </div>
              </motion.div>
            )}

            {/* VIEW LEFT: EL LOCAL */}
            {view === "left" && (
              <motion.div
                key="left"
                initial={{ opacity: 0, x: -100, clipPath: "polygon(0 0, 0 0, 0 100%, 0% 100%)" }}
                animate={{ opacity: 1, x: 0, clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)" }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                style={{ display: "flex", gap: "4rem", alignItems: "center", flexWrap: "wrap" }}
              >
                <div style={{ flex: 1, minWidth: "300px" }}>
                  <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(3rem, 6vw, 5rem)", margin: "0 0 1rem", letterSpacing: "0.08em" }}>EL <span className="gold-shimmer">ESPACIO</span></h2>
                  <p style={{ fontFamily: "'Rajdhani', sans-serif", fontSize: "1.1rem", color: "var(--white-dim)", lineHeight: 1.8, marginBottom: "1.5rem" }}>
                    Amsterdam merece una barbería a la altura de su cultura. Cada detalle ha sido elegido con la misma atención que ponemos en cada corte. Las sillas de cuero envejecido, los espejos con marco de cobre, la luz cálida y cuidada.
                  </p>
                  <Link href="/el-club" className="btn-outline" style={{ display: "inline-flex" }}>VER GALERÍA COMPLETA</Link>
                </div>
                <div style={{ flex: 1, minWidth: "300px", aspectRatio: "4/3", border: "1px dashed var(--gold-dim)", display: "flex", alignItems: "center", justifyContent: "center", position: "relative" }}>
                   <div style={{ position: "absolute", inset: "12px", border: "1px solid var(--surface-3)" }} />
                   <span style={{ fontFamily: "'Rajdhani', sans-serif", color: "var(--white-mute)", letterSpacing: "0.2em", textTransform: "uppercase", fontSize: "0.8rem" }}>Fotografía del Local</span>
                </div>
              </motion.div>
            )}

            {/* VIEW RIGHT: CALENDARIO */}
            {view === "right" && (
              <motion.div
                key="right"
                initial={{ opacity: 0, x: 100, clipPath: "polygon(100% 0, 100% 0, 100% 100%, 100% 100%)" }}
                animate={{ opacity: 1, x: 0, clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)" }}
                exit={{ opacity: 0, x: 50 }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                style={{ textAlign: "center", maxWidth: "600px", margin: "0 auto" }}
              >
                <div style={{ display: "flex", justifyContent: "center", marginBottom: "2rem" }}>
                  <motion.div animate={{ rotate: [0, 15, -15, 0] }} transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}>
                    <RazorIcon />
                  </motion.div>
                </div>
                <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(3rem, 6vw, 5rem)", margin: "0 0 1rem", letterSpacing: "0.08em" }}>TU <span className="gold-shimmer">TIEMPO</span> ES ORO</h2>
                <p style={{ fontFamily: "'Rajdhani', sans-serif", fontSize: "1.1rem", color: "var(--white-dim)", lineHeight: 1.8, marginBottom: "3rem" }}>
                  Elige a tu barbero, selecciona tu horario y asegura tu silla. Un proceso sin fricción, diseñado para hombres que valoran la puntualidad y el resultado perfecto.
                </p>
                <Link href="/reservar" className="btn-gold" style={{ padding: "1.25rem 3rem", fontSize: "1.2rem" }}>ABRIR CALENDARIO</Link>
              </motion.div>
            )}

            {/* VIEW BOTTOM: MEMBRESÍAS */}
            {view === "bottom" && (
              <motion.div
                key="bottom"
                initial={{ opacity: 0, y: 100, clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0 100%)" }}
                animate={{ opacity: 1, y: 0, clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)" }}
                exit={{ opacity: 0, y: 50 }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                style={{ width: "100%" }}
              >
                <div style={{ display: "flex", justifyContent: "center", marginBottom: "3rem" }}>
                  <div style={{ textAlign: "center" }}>
                    <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(3rem, 6vw, 4.5rem)", letterSpacing: "0.08em", margin: 0, lineHeight: 1 }}>
                      ELIGE TU <span className="gold-shimmer">NIVEL</span>
                    </h2>
                    <p style={{ fontFamily: "'Rajdhani', sans-serif", fontSize: "1.15rem", color: "var(--white-dim)", marginTop: "0.75rem", letterSpacing: "0.05em", marginBottom: 0 }}>
                      Enfocados en tu experiencia. Descubre el valor que te damos antes de hablar de números.
                    </p>
                  </div>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "2rem" }}>
                  {MEMBERSHIPS.map((plan, i) => (
                    <InteractiveCard key={plan.id} plan={plan} delay={i * 0.15} />
                  ))}
                </div>
              </motion.div>
            )}

          </AnimatePresence>
        </div>
      </main>
    </>
  );
}
