# Club Amsterdam — Plan del Proyecto

> Documento de planificación para el sitio web de Club Amsterdam. Escrito para que cualquier sesión futura (incluida Sonnet) pueda continuar sin contexto previo.

## Contexto del proyecto

- **Qué es:** sitio web para una barbería llamada **Club Amsterdam**.
- **Para quién:** el usuario está construyendo esto como **demo / borrador para pitchear a un cliente potencial** (el dueño de la barbería). No es un producto de producción todavía.
- **Idioma:** **todo el contenido va en español**.
- **Alcance:** una sola ubicación por ahora.
- **Sistema de reservas:** **propio**, construido desde cero. No usar Booksy, Fresha, Treatwell, ni ningún embed de terceros.
- **Prioridad:** impacto visual + sistema de reservas funcional. El resto se recorta.

## Posicionamiento de marca

La palabra **"Club"** es la estrategia entera. No es una barbería — es una membresía.

- Clientes = **miembros**
- Citas = **reservas**
- Local = **espacio** / "el club"
- Tono: confiado, sobrio, masculino sin ser agresivo. Lounge privado, no peluquería de barrio.
- Referencia estética: minimalismo neerlandés, lujo silencioso, artesanía.

**Taglines candidatos:**
- "Una barbería. Un club. Un estándar."
- "Corte, ritual, pertenencia."
- "Tu silla te espera."
- "Más que una barbería. Un club."

## Mapa del sitio (5 páginas)

```
/                  → Inicio (hero + pitch del club)
/membresias        → Planes del club
/reservar          → Sistema de reservas propio (la estrella técnica)
/el-club           → Espacio, historia, ubicación
/contacto          → Formulario + WhatsApp + mapa
```

**Navegación (top):** `Inicio · Membresías · Reservar · El Club · Contacto`

Se recortaron `/servicios` y `/barberos` como páginas separadas — se integran como secciones dentro de Inicio y El Club para densidad visual.

## Página por página — intención

### Inicio
- **Hero:** foto/video a pantalla completa del espacio, titular único, dos CTAs:
  - Primario: **"Hazte miembro"**
  - Secundario: **"Reservar silla"**
- **Sección 1:** pitch del Club (3 beneficios, iconografía mínima)
- **Sección 2:** preview de membresías (lleva a /membresias)
- **Sección 3:** el espacio (galería, dirección teaser)
- **Sección 4:** prueba social (reseñas de Google o testimonios)
- **Footer:** horarios, dirección, IG, opt-in newsletter

### Membresías
- Comparativa lado a lado de 3 planes
- Plan del medio destacado visualmente ("Más popular")
- CTA de cada plan lleva al flujo de reserva / alta

### Reservar
- Ver sección "Sistema de reservas" más abajo

### El Club
- Fotografía del espacio hace el 80% del trabajo
- Mapa embebido, horarios, transporte/parking, reglas de la casa
- Historia breve / propuesta

### Contacto
- Formulario simple (nombre, email, mensaje)
- Botón directo a WhatsApp
- Mapa + dirección + horarios

## Membresías — 3 niveles

| Plan | Precio/mes | Incluye | Ángulo |
|---|---|---|---|
| **Visitante** | Pago por visita | Reserva estándar, precio regular | Puerta de entrada |
| **Clásico** ⭐ | €39 | 1 corte/mes, 10% en productos, reserva prioritaria | El default |
| **Fundador** | €89 | Cortes ilimitados, barba incluida, whisky de la casa, acceso after-hours | Aspiracional |

Tres planes = sweet spot visual. El del medio con badge "Más popular" / "Recomendado".

## Copy clave en español

**Hero:**
> # Club Amsterdam
> *Una barbería. Un club. Un estándar.*
>
> `[Hazte miembro]` `[Reservar silla]`

**Intro de membresías:**
> *No vendemos cortes. Vendemos el hábito de verse bien.*

**Botones / microcopy:**
- CTA reserva: **"Reservar"** (NO "Agendar cita" — suena a consultorio médico)
- Confirmación de reserva: **"Tu silla está reservada."**
- Botón miembro: **"Hazte miembro"** (no "Suscribirse")
- Formulario contacto enviado: **"Mensaje recibido. Te respondemos en menos de 24h."**

## Sistema de reservas — arquitectura

### Modelo de datos (tablas mínimas)

```
barberos        → id, nombre, foto, horario_semanal (JSON)
servicios       → id, nombre, duracion_min, precio
disponibilidad  → barbero_id, fecha, slots[] (o calculada dinámicamente)
reservas        → id, cliente_id, barbero_id, servicio_id,
                  fecha, hora, estado, creado_en
clientes        → id, nombre, email, telefono, es_miembro (bool)
miembros        → cliente_id, plan, activo_desde, proxima_renovacion
```

### Flujo de reserva (5 pasos, stepper en una sola pantalla)

1. **Servicio** — corte / barba / corte+barba / tratamiento
2. **Barbero** — cualquiera / elegir específico
3. **Fecha y hora** — calendario con slots disponibles
4. **Datos del cliente** — nombre, email, teléfono (login si es miembro)
5. **Confirmación** — email (+ WhatsApp opcional)

### Reglas de negocio (decididas)

- Duración de slot: **30 min** (corte) / **45 min** (corte + barba)
- Ventana de cancelación: **24h antes**
- **Depósito de €5 para no-miembros** (evita no-shows, demuestra que pensaste el negocio)
- Miembros: sin depósito
- Hora de apertura/cierre configurable por barbero
- Bloqueos manuales permitidos (vacaciones, días libres)

### Stack sugerido (el usuario decide)

- **Frontend:** Next.js + Tailwind CSS
- **Backend:** Next.js API routes (o Node/Express, o Python/FastAPI)
- **DB:** PostgreSQL en producción, SQLite está bien para el demo
- **Auth:** email + contraseña simple, o magic link
- **Email:** Resend (gratis en volumen bajo) o similar
- **Deploy:** Vercel (instantáneo desde un repo)

## Dirección visual

- **Paleta:** negro profundo + hueso/crema + **un** color acento.
  - Opciones de acento: verde oliva oscuro, cobre/bronce, oxblood (rojo vino). **Evitar rojo-blanco-azul de barbería genérica.**
- **Tipografía:**
  - Titulares: serif editorial — *Canela*, *GT Sectra*, *Fraunces* (gratis en Google Fonts)
  - Cuerpo: sans limpio — *Inter*, *Söhne*, *Manrope*
- **Fotografía:** real > ilustración. Si no hay shoot real, Unsplash **muy curado**: "barber shop interior dark", "men's grooming", "leather chair". Nada obvio de stock.
- **Movimiento:** sutil — fade-ins al hacer scroll, video loop silencioso en hero si hay material bueno. Sin animaciones payasas.
- **Mobile-first:** 70%+ de las reservas vendrán de móvil.

## Lo que NO hacemos en esta fase

Para mantener scope limpio:

- ❌ Gift cards / tarjetas regalo
- ❌ Sistema de referidos
- ❌ Dashboard avanzado de miembro (solo login básico si hace falta)
- ❌ Multi-idioma (solo español)
- ❌ Integraciones con Google Calendar / POS
- ❌ Panel de administración completo (quizás un mini-panel solo para ver reservas del día, si sobra tiempo)
- ❌ Programa de fidelización con puntos
- ❌ Email marketing / automation

Todo esto queda como **"fase 2"** — argumentos para cuando el cliente pregunte "¿y esto se puede hacer?".

## Orden de construcción recomendado

1. **Setup del proyecto** — Next.js + Tailwind + estructura de carpetas + fuentes
2. **Navegación + layout base** — header, footer, tipografía, paleta aplicada
3. **Hero de Inicio** — la primera impresión. Tiene que estar perfecta.
4. **Resto del Inicio** — secciones de pitch, preview de membresías, el espacio, footer
5. **Página de Membresías** — los 3 planes, visualmente impactantes
6. **Sistema de reservas** — modelo de datos, API, flujo de 5 pasos, confirmación por email
7. **El Club** — storytelling, galería, mapa
8. **Contacto** — formulario simple + WhatsApp
9. **Pulido** — animaciones, responsive, estados de carga, errores
10. **Deploy** — Vercel, dominio temporal para el pitch

## Guion para el pitch al cliente (dueño de la barbería)

Cuando se muestre el demo:

1. **Abrir el hero** — 3 segundos en silencio mientras lo ve
2. **Scroll a membresías** — explicar aquí el ángulo "Club"
3. **Click en Reservar** — hacer una reserva en vivo, enfatizando que el sistema es propio, no un widget de terceros
4. **Mostrar El Club** — aquí va la historia, la ubicación, el espacio
5. **Cerrar:** "Esto es un borrador. Podemos iterar sobre el diseño y agregar lo que necesites en fase 2."

## Preguntas abiertas (resolver antes de empezar a codear)

- [ ] ¿Hay material fotográfico real del espacio, o arrancamos con Unsplash?
- [ ] ¿Cuántos barberos tendría la barbería? (Afecta el paso "elegir barbero" del flujo)
- [ ] Color de acento final: ¿oliva, cobre u oxblood?
- [ ] Stack definitivo: ¿Next.js está OK para el usuario?
- [ ] ¿Dominio para el deploy del demo, o subdominio de Vercel?

---

**Estado del plan:** listo para empezar a construir. Cualquier sesión futura puede leer este archivo y continuar desde el paso 1 de "Orden de construcción".
