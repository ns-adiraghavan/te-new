import { useState, useEffect, useRef } from "react";
import { ArrowRight, ChevronDown, ChevronUp } from "lucide-react";
import { Twitter, Instagram, Linkedin } from "lucide-react";
import { useAppContext } from "@/context/AppContext";
import { useAppNavigate } from "@/hooks/useAppNavigate";
import {
  B_INDIGO, B_YELLOW, B_RED, B_TEAL, B_BLUE, B_TICKER,
  P_INDIGO, P_TEAL, P_RED, P_YELLOW,
  secBg, SectionDivider,
  FLAGSHIP_PROGRAMMES, JOURNEY_MILESTONES, FUN_FACTS,
  HERO_STATS, SOCIAL_POSTS, TICKER_ITEMS, EOEO,
  ACCENT_NAVY,
} from "@/data/homeSharedData";
import doodleCluster1 from "@/assets/doodle-cluster-1.png";
import doodleCluster2 from "@/assets/doodle-cluster-2.png";
import doodleCluster3 from "@/assets/doodle-cluster-3.png";
import doodleCluster4 from "@/assets/doodle-cluster-4.png";
import tataElxsiImg   from "@/assets/tata-elxsi.jpg";
import airIndia from "@/assets/air-india.jpg";
import tataCommunications from "@/assets/tata-communications-1.jpg";
import infiniti from "@/assets/Infiniti_2.jpg";
import drPhoto from "@/assets/dr_photo.jpg";
import tajSatsImg from "@/assets/tata-motors-2.jpg";
import titanImg from "@/assets/titain.jpeg";
import trentImg from "@/assets/trent_2.jpg";

export { SectionDivider };

// ─────────────────────────────────────────────────────────────────────────────
// DESIGN TOKENS
// ─────────────────────────────────────────────────────────────────────────────
// Accent for changed tiles: #E8401C (TSG red-orange), replacing forest green
const B_ACCENT = "#F93822";
// All eyebrow / mono text → Noto Sans (no DM Mono)
const FONT_SANS = "'Noto Sans', 'DM Sans', ui-sans-serif, system-ui, sans-serif";

// ─────────────────────────────────────────────────────────────────────────────
// GLOBAL STYLES
// ─────────────────────────────────────────────────────────────────────────────
const GLOBAL_STYLES = `
  /* Noto Sans everywhere — no DM Mono in UI */
  body, .section-block, .section-header, h1, h2, h3, p, span, button {
    font-family: ${FONT_SANS};
  }

  /* Section rhythm */
  .section-block { padding: 72px 48px; position: relative; overflow: hidden; }
  .section-header { margin-bottom: 40px; }

  /* Lift on hover */
  .hover-lift { transition: transform 0.25s ease, box-shadow 0.25s ease; }
  .hover-lift:hover { transform: translateY(-3px); }

  /* Definer underline — animated fill */
  .te-definer-track {
    height: 1.4px; border-radius: 2px;
    background: #e8e8f0; margin-top: 5px; overflow: hidden;
  }
  .te-definer-fill {
    height: 100%; border-radius: 2px; width: 0%;
    transition: width 0.65s cubic-bezier(0.22, 1, 0.36, 1);
  }
  .te-definer-fill.on { width: 100%; }

  @keyframes te-draw {
    from { width: 0%; }
    to   { width: 100%; }
  }
  .te-draw { animation: te-draw 0.75s cubic-bezier(0.22, 1, 0.36, 1) forwards; }

  /* Ticker */
  @keyframes te-marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
  .te-marquee { animation: te-marquee 34s linear infinite; display: flex; gap: 64px; white-space: nowrap; }
  .te-marquee:hover { animation-play-state: paused; }

  /* Shimmer */
  @keyframes te-shimmer { 0% { left: -40%; } 100% { left: 140%; } }

  /* Chevron bob */
  @keyframes te-bob {
    0%, 100% { transform: translateY(0);   opacity: 1;    }
    50%       { transform: translateY(6px); opacity: 0.6; }
  }
  .te-bob-1 { animation: te-bob 1.6s ease-in-out infinite 0s;     }
  .te-bob-2 { animation: te-bob 1.6s ease-in-out infinite 0.18s;  }
  .te-bob-3 { animation: te-bob 1.6s ease-in-out infinite 0.36s;  }

  /* Journey trail draw-on */
  .te-trail { stroke-dashoffset: 2000; transition: stroke-dashoffset 1.4s ease-out; }
  .te-trail.on { stroke-dashoffset: 0; }

  /* Journey card fade-slide */
  .te-jcard { opacity: 0; transition: opacity 0.45s ease, transform 0.45s ease; }
  .te-jcard.up   { transform: translateY(12px);  }
  .te-jcard.down { transform: translateY(-12px); }
  .te-jcard.on   { opacity: 1; transform: translateY(0); }

  /* Stat pulse dot */
  @keyframes te-pulse { 0%,100%{opacity:1} 50%{opacity:0.35} }
  .te-pulse { animation: te-pulse 2s ease-in-out infinite; }

  /* Programme scroll/parallax lift — scroll driven */
  @keyframes te-prog-enter {
    from { opacity: 0; transform: translateY(32px) scale(0.97); }
    to   { opacity: 1; transform: translateY(0)    scale(1);    }
  }
  .prog-card-enter { animation: te-prog-enter 0.55s cubic-bezier(0.22, 1, 0.36, 1) forwards; }

  /* Card tilt on hover — subtle 3D feel */
  .prog-tilt {
    transition: transform 0.4s cubic-bezier(0.22,1,0.36,1), box-shadow 0.4s ease;
    transform-style: preserve-3d;
  }
  .prog-tilt:hover {
    transform: perspective(800px) rotateY(-2deg) rotateX(1deg) translateY(-4px);
    box-shadow: 8px 20px 48px rgba(0,0,0,0.18);
  }

  /* Shadow rail on right of each card */
  .card-shadow-right {
    box-shadow: 6px 0 24px rgba(0,0,0,0.10), 0 4px 16px rgba(0,0,0,0.06);
  }

  /* Italic accent inside headings */
  .te-italic-accent {
    font-style: italic;
    color: ${B_ACCENT};
    font-weight: inherit;
  }

  /* Quote panel */
  @keyframes te-quote-fade {
    from { opacity: 0; transform: translateY(16px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  .te-quote-enter { animation: te-quote-fade 0.7s cubic-bezier(0.22,1,0.36,1) forwards; }

  /* Uniform card border-radius */
  .te-card {
    border-radius: 14px;
    background: #ffffff;
    border: 1px solid #e8e8f0;
  }




  /* Programme tile hover */
  .prog-style-a { transition: transform 0.35s ease, box-shadow 0.35s ease; }
  .prog-style-a:hover { transform: translateY(-4px); box-shadow: 0 14px 40px rgba(0,0,0,0.18); }
  .prog-style-a .prog-img-card { transition: transform 0.4s ease; }
  .prog-style-a:hover .prog-img-card { transform: scale(1.04); }

  /* CVP/EOI indicator dot */
  .prog-extra-dot {
    width: 5px; height: 5px; border-radius: 50%;
    display: inline-block;
    transition: all 0.3s;
  }
`;

// ─────────────────────────────────────────────────────────────────────────────
// DEFINER UNDERLINE
// ─────────────────────────────────────────────────────────────────────────────
function DefinerUnderline({ colour = B_INDIGO, width = 56 }: { colour?: string; width?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [on, setOn] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setOn(true); obs.disconnect(); } },
      { threshold: 0.4 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div ref={ref} className="te-definer-track" style={{ width }}>
      <div className={`te-definer-fill${on ? " on" : ""}`} style={{ background: colour }} />
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// GEO ICONS
// ─────────────────────────────────────────────────────────────────────────────
const GeoIcon = {
  diamond: (colour: string, size = 24) => (
    <svg viewBox="0 0 100 100" width={size} height={size} style={{ display: "block" }}>
      <polygon points="50,4 96,50 50,96 4,50" fill={colour} />
    </svg>
  ),
  hexagon: (colour: string, size = 24) => (
    <svg viewBox="0 0 100 100" width={size} height={size} style={{ display: "block" }}>
      <polygon points="50,4 90,27 90,73 50,96 10,73 10,27" fill={colour} />
    </svg>
  ),
  triangle: (colour: string, size = 24) => (
    <svg viewBox="0 0 100 100" width={size} height={size} style={{ display: "block" }}>
      <polygon points="50,6 95,94 5,94" fill={colour} />
    </svg>
  ),
  circle: (colour: string, size = 24) => (
    <svg viewBox="0 0 100 100" width={size} height={size} style={{ display: "block" }}>
      <circle cx="50" cy="50" r="46" fill={colour} />
    </svg>
  ),
};

// ─────────────────────────────────────────────────────────────────────────────
// SECTION EYEBROW helper — Noto Sans, consistent across all sections
// ─────────────────────────────────────────────────────────────────────────────
function SectionEyebrow({ label, dark = false }: { label: string; dark?: boolean }) {
  return (
    <p style={{
      fontFamily: FONT_SANS,
      fontSize: 14,
      fontWeight: 700,
      letterSpacing: "1.8px",
      textTransform: "uppercase",
      color: dark ? "#ffffff" : ACCENT_NAVY,
      margin: "0 0 8px",
      opacity: 1,
    }}>
      {label}
    </p>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// SECTION H2 helper — with optional italic accent word
// Usage: <SectionH2 dark>Volunteering <em>Opportunities</em></SectionH2>
// ─────────────────────────────────────────────────────────────────────────────
function SectionH2({ children, dark = false }: { children: React.ReactNode; dark?: boolean }) {
  return (
    <h2 style={{
      fontFamily: FONT_SANS,
      fontSize: 32,
      fontWeight: 900,
      color: dark ? "#ffffff" : ACCENT_NAVY,
      letterSpacing: "-0.5px",
      margin: 0,
      lineHeight: 1.15,
    }}>
      {children}
    </h2>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// PROGRAMME CONFIG
// ─────────────────────────────────────────────────────────────────────────────
const PROG_CONFIG = [
  {
    id: "TVW", route: "about-tvw",
    title: "Tata Volunteering Week",
    label: "Bi-annual · Global",
    stat1: "12 Editions", stat2: "50K+ Volunteers",
    colour: "#3E7EB0",
    photo: airIndia, photoPos: "center 25%",
    accentWord: "Volunteering",         // word to italicise in card title
  },
  {
    id: "ProEngage", route: "about-proengage",
    title: "ProEngage",
    label: "Skill-based · Year-round",
    stat1: "1,200+ Projects", stat2: "85 NGO Partners",
    colour: "#A4CC4C",
    photo: tataCommunications, photoPos: "center center",
    accentWord: "ProEngage",
  },
  {
    id: "Disaster Response", route: "disaster-response",
    title: "Disaster Response",
    label: "Rapid Action",
    stat1: "24 Responses", stat2: "8 States",
    colour: "#00A896",
    photo: drPhoto, photoPos: "center 20%",
    accentWord: "Response",
  },
];

const PROG_SUBS = [
  "Volunteering together, amplifying community impact",
  "Where professional expertise creates lasting change.",
  "Standing together when communities need it most.",
];

// ─────────────────────────────────────────────────────────────────────────────
// PROGRAMME SPOTLIGHT
// Scroll-driven parallax card entry. Cards animate in as the section enters
// viewport — slight translateY + scale entrance, mimicking the Dribbble card
// scroll effect without reinventing the component.
// ─────────────────────────────────────────────────────────────────────────────
export function ProgrammeSpotlight() {
  const navigate        = useAppNavigate();
  const [idx, setIdx]   = useState(0);
  const [rightBox, setRightBox] = useState(0);
  const [visible, setVisible]   = useState(false);
  const timerRef        = useRef<ReturnType<typeof setInterval> | null>(null);
  const sectionRef      = useRef<HTMLElement>(null);

  // Intersection → trigger card entrance animation
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const resetTimer = (nextIdx?: number) => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(
      () => setIdx((p) => (p + 1) % PROG_CONFIG.length),
      5000
    );
    if (nextIdx !== undefined) setIdx(nextIdx);
  };

  useEffect(() => {
    resetTimer();
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, []);

  const p = PROG_CONFIG[idx];

  // Render title with italic accent on the accent word
  const renderTitle = (title: string, accentWord: string, colour: string) => {
    const parts = title.split(accentWord);
    if (parts.length < 2) {
      return <span style={{ fontStyle: "italic", color: colour }}>{title}</span>;
    }
    return (
      <>
        {parts[0]}
        <em style={{ fontStyle: "italic", color: colour }}>{accentWord}</em>
        {parts[1]}
      </>
    );
  };

  return (
    <>
      <style>{GLOBAL_STYLES}</style>
      <section
        ref={sectionRef}
        id="programmes"
        className="section-block"
        style={{
          background: "#fafafa",
          padding: "72px 48px",
          backgroundImage: "radial-gradient(circle, rgba(51,51,153,0.09) 1.2px, transparent 1.2px)",
          backgroundSize: "20px 20px",
        }}
      >
        <div style={{ maxWidth: 1100, margin: "0 auto", position: "relative" }}>

          {/* Section header */}
          <div className="section-header">
            <SectionEyebrow label="Our Programmes" />
            <SectionH2>
              Volunteering <em style={{ fontStyle: "italic", color: B_YELLOW }}>Opportunities</em>
            </SectionH2>
            <div style={{ width: 120, height: 1.4, borderRadius: 2, background: "#e8e8f0", marginTop: 10, overflow: "hidden" }}>
              <div className="te-draw" style={{ height: "100%", background: B_INDIGO, borderRadius: 2 }} />
            </div>
          </div>

          {/* Main grid */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 260px", gap: 16, alignItems: "start" }}>

            {/* LEFT: programme card with scroll-entrance animation */}
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>

              {/* Animated card wrapper — staggered entrance mimicking scroll card reveal */}
              <div
                key={idx}
                style={{
                  opacity: visible ? 1 : 0,
                  transform: visible ? "translateY(0) scale(1)" : "translateY(28px) scale(0.97)",
                  transition: "opacity 0.55s cubic-bezier(0.22,1,0.36,1), transform 0.55s cubic-bezier(0.22,1,0.36,1)",
                }}
              >
                <div
                  className="prog-style-a prog-tilt card-shadow-right"
                  onClick={() => navigate(p.route)}
                  style={{
                    minHeight: 340,
                    borderRadius: 18,
                    overflow: "hidden",
                    cursor: "pointer",
                    display: "grid",
                    gridTemplateColumns: "1fr 0.9fr",
                    gap: 0,
                  }}
                >
                  {/* Image portion */}
                  <div
                    className="prog-img-card"
                    style={{
                      position: "relative",
                      clipPath: "polygon(0 0, 100% 0, 88% 100%, 0 100%)",
                      zIndex: 1,
                      backgroundImage: `url(${p.photo})`,
                      backgroundSize: "cover",
                      backgroundPosition: p.photoPos,
                    }}
                  />
                  {/* Text portion */}
                  <div style={{
                    background: `linear-gradient(135deg, ${p.colour} 0%, ${p.colour}cc 100%)`,
                    padding: "36px 28px 36px 16px",
                    display: "flex", flexDirection: "column",
                    justifyContent: "center",
                  }}>
                    <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center" }}>
                      {/* Italic title with accent word */}
                      <h3 style={{
                        fontFamily: FONT_SANS,
                        fontSize: 28, fontWeight: 900, color: "#ffffff",
                        letterSpacing: "-0.4px", lineHeight: 1.2, margin: "0 0 8px",
                      }}>
                        {renderTitle(p.title, p.accentWord, "rgba(255,255,255,0.7)")}
                      </h3>
                      <div style={{ width: 40, height: 2, background: "rgba(255,255,255,0.6)", borderRadius: 1, margin: "6px 0 10px" }} />
                      <p style={{ fontFamily: FONT_SANS, fontSize: 14, color: "rgba(255,255,255,0.85)", lineHeight: 1.55, margin: 0 }}>
                        {PROG_SUBS[idx]}
                      </p>
                    </div>
                    <div style={{ marginTop: 16 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 6, fontFamily: FONT_SANS, fontSize: 13, fontWeight: 700, color: "#ffffff" }}>
                        Learn more <ArrowRight size={13} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Dot indicators */}
              <div style={{ display: "flex", gap: 8, paddingLeft: 4 }}>
                {PROG_CONFIG.map((pc, i) => (
                  <button
                    key={i}
                    onClick={() => resetTimer(i)}
                    style={{
                      width: i === idx ? 24 : 8, height: 7,
                      borderRadius: 100, border: "none", cursor: "pointer", padding: 0,
                      background: i === idx ? pc.colour : "#d1d5db",
                      transition: "all 0.35s ease",
                    }}
                  />
                ))}
              </div>
            </div>

            {/* RIGHT: CVP + EOI tiles — B_ACCENT replaces forest green */}
            <div style={{ position: "relative", overflow: "hidden", borderRadius: 14, minHeight: 340 }}>

              {/* CVP tile — B_ACCENT (#E8401C) */}
              <div style={{
                position: "absolute", inset: 0,
                background: "#1434A4",
                padding: "28px 20px 16px",
                display: "flex", flexDirection: "column",
                justifyContent: "center",
                borderRadius: 14,
                opacity: rightBox === 0 ? 1 : 0,
                transform: rightBox === 0 ? "translateY(0)" : "translateY(-24px)",
                transition: "opacity 0.3s ease, transform 0.3s ease",
                pointerEvents: rightBox === 0 ? "auto" : "none",
                boxShadow: "6px 0 24px rgba(0,0,0,0.10), 0 4px 16px rgba(0,0,0,0.08)",
              }}>
                <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center" }}>
                  <h3 style={{
                    fontFamily: FONT_SANS,
                    fontSize: 22, fontWeight: 900, color: "#ffffff",
                    lineHeight: 1.2, margin: "0 0 8px", letterSpacing: "-0.4px",
                  }}>
                    Company <em style={{ fontStyle: "italic", color: "rgba(255,255,255,0.75)" }}>Volunteering</em> Programme
                  </h3>
                  <div style={{ width: 40, height: 2, background: "rgba(255,255,255,0.6)", borderRadius: 1, margin: "6px 0 10px" }} />
                  <p style={{
                    fontFamily: FONT_SANS, fontSize: 14, color: "rgba(255,255,255,0.85)",
                    lineHeight: 1.55, margin: "0 0 0",
                  }}>
                    Company led volunteering programme or opportunities customised for operating context and needs of the local communities
                  </p>
                </div>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 16 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 6, fontFamily: FONT_SANS, fontSize: 13, fontWeight: 700, color: "#ffffff" }}>
                    Learn More <ArrowRight size={13} />
                  </div>
                  <button
                    onClick={(e) => { e.stopPropagation(); setRightBox(1); }}
                    style={{
                      width: 26, height: 26, borderRadius: "50%",
                      background: "rgba(255,255,255,0.18)", border: "1px solid rgba(255,255,255,0.4)",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      cursor: "pointer", color: "#ffffff",
                    }}
                  >
                    <ChevronDown size={14} />
                  </button>
                </div>
              </div>

              {/* EOI tile — pink */}
              <div style={{
                position: "absolute", inset: 0,
                background: "#F2778A",
                padding: "28px 20px 16px",
                display: "flex", flexDirection: "column",
                justifyContent: "center",
                borderRadius: 14,
                opacity: rightBox === 1 ? 1 : 0,
                transform: rightBox === 1 ? "translateY(0)" : "translateY(24px)",
                transition: "opacity 0.3s ease, transform 0.3s ease",
                pointerEvents: rightBox === 1 ? "auto" : "none",
                boxShadow: "6px 0 24px rgba(0,0,0,0.10), 0 4px 16px rgba(0,0,0,0.08)",
              }}>
                <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center" }}>
                  <h3 style={{
                    fontFamily: FONT_SANS,
                    fontSize: 22, fontWeight: 900, color: "#ffffff",
                    lineHeight: 1.2, margin: "0 0 8px", letterSpacing: "-0.4px",
                  }}>
                    Employees' <em style={{ fontStyle: "italic", color: "rgba(255,255,255,0.75)" }}>Own</em> Initiatives
                  </h3>
                  <div style={{ width: 40, height: 2, background: "rgba(255,255,255,0.6)", borderRadius: 1, margin: "6px 0 10px" }} />
                  <p style={{
                    fontFamily: FONT_SANS, fontSize: 14, color: "rgba(255,255,255,0.85)",
                    lineHeight: 1.55, margin: "0 0 0",
                  }}>
                    Empowering employees to volunteer their way for causes close to their heart
                  </p>
                </div>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 16 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 6, fontFamily: FONT_SANS, fontSize: 13, fontWeight: 700, color: "#ffffff" }}>
                    Learn More <ArrowRight size={13} />
                  </div>
                  <button
                    onClick={(e) => { e.stopPropagation(); setRightBox(0); }}
                    style={{
                      width: 26, height: 26, borderRadius: "50%",
                      background: "#F9A8D460", border: "1px solid #F9A8D4",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      cursor: "pointer", color: "#9D174D",
                    }}
                  >
                    <ChevronUp size={14} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// QUOTE BANNER — section break between Programmes and Numbers
// Uses trent_2.jpg as background (same dark overlay technique as JourneySection)
// Shorter height: padding 40px vs 72px for journey
// ─────────────────────────────────────────────────────────────────────────────
export function QuoteBanner() {
  const ref = useRef<HTMLElement>(null);
  const [vis, setVis] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVis(true); obs.disconnect(); } },
      { threshold: 0.25 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      className="section-block"
      style={{
        backgroundImage: `url(${trentImg})`,
        backgroundSize: "cover",
        backgroundPosition: "center 40%",
        position: "relative",
        overflow: "hidden",
        padding: "52px 48px",          // shorter than Journey's 72px
      }}
    >
      {/* Dark overlay — heavier than journey for quote legibility */}
      <div style={{
        position: "absolute", inset: 0,
        background: "linear-gradient(135deg, rgba(5,5,20,0.82) 0%, rgba(5,5,20,0.76) 100%)",
        pointerEvents: "none",
      }} />

      {/* Subtle diagonal texture overlay */}
      <div style={{
        position: "absolute", inset: 0,
        backgroundImage: "repeating-linear-gradient(45deg, rgba(255,255,255,0.012) 0 1px, transparent 1px 18px)",
        pointerEvents: "none",
      }} />

      <div style={{
        maxWidth: 820,
        margin: "0 auto",
        position: "relative",
        textAlign: "center",
        opacity: vis ? 1 : 0,
        transform: vis ? "translateY(0)" : "translateY(20px)",
        transition: "opacity 0.7s cubic-bezier(0.22,1,0.36,1), transform 0.7s cubic-bezier(0.22,1,0.36,1)",
      }}>

        {/* Opening quote mark */}
        <div style={{
          fontFamily: FONT_SANS,
          fontSize: 72,
          lineHeight: 1,
          color: B_ACCENT,
          opacity: 0.5,
          marginBottom: -12,
          fontWeight: 900,
          userSelect: "none",
        }}>
          "
        </div>

        {/* Primary quote */}
        <blockquote style={{
          fontFamily: FONT_SANS,
          fontSize: 22,
          fontWeight: 400,
          fontStyle: "italic",
          color: "rgba(255,255,255,0.93)",
          lineHeight: 1.65,
          margin: "0 0 24px",
          letterSpacing: "-0.2px",
        }}>
          Volunteering is not about doing more. It is about{" "}
          <em style={{ fontStyle: "italic", color: B_YELLOW, fontWeight: 600 }}>refusing to look away</em>
          {" "}— and choosing, consistently, to be part of something{" "}
          <em style={{ fontStyle: "italic", color: B_YELLOW, fontWeight: 600 }}>larger than ourselves</em>.
        </blockquote>

        {/* Attribution */}
        <div style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 12,
        }}>
          <div style={{ height: 1, width: 32, background: B_ACCENT, opacity: 0.7, borderRadius: 1 }} />
          <span style={{
            fontFamily: FONT_SANS,
            fontSize: 12,
            fontWeight: 700,
            letterSpacing: "2px",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.45)",
          }}>
            Tata Engage · Spirit of Service
          </span>
          <div style={{ height: 1, width: 32, background: B_ACCENT, opacity: 0.7, borderRadius: 1 }} />
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// NUMBERS SECTION — with radial dot grid background texture
// ─────────────────────────────────────────────────────────────────────────────
export function NumbersSection() {
  const { triggerToast } = useAppContext();
  const [factIdx,    setFactIdx]    = useState(0);
  const [factFading, setFactFading] = useState(false);
  const [socialIdx,  setSocialIdx]  = useState(0);
  const [shimmer,    setShimmer]    = useState(false);

  useEffect(() => {
    const t = setInterval(() => setSocialIdx((p) => (p + 1) % SOCIAL_POSTS.length), 4000);
    return () => clearInterval(t);
  }, []);

  const cycleFact = () => {
    setFactFading(true);
    setTimeout(() => { setFactIdx((p) => (p + 1) % FUN_FACTS.length); setFactFading(false); }, 280);
  };

  const blockEyebrow = (label: string, dark = false) => (
    <span style={{
      fontFamily: FONT_SANS,
      fontSize: 11, fontWeight: 800, letterSpacing: "1.6px",
      textTransform: "uppercase",
      color: dark ? "#ffffff" : "#64748b",
      display: "block",
      marginBottom: 10,
    }}>
      {label}
    </span>
  );

  return (
    // Radial dot grid texture on the Numbers white section
    <section className="section-block" style={{
      background: "#fafafa",
      padding: "72px 48px",
      backgroundImage: "radial-gradient(circle, rgba(51,51,153,0.09) 1.2px, transparent 1.2px)",
      backgroundSize: "20px 20px",
    }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", position: "relative" }}>

        <div className="section-header">
          <SectionEyebrow label="By the numbers" />
          <SectionH2>
            In the <em style={{ fontStyle: "italic", color: B_YELLOW }}>Spotlight</em>
          </SectionH2>
          <div style={{ width: 48, height: 1.4, borderRadius: 2, background: B_TEAL, marginTop: 10 }} />
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16, alignItems: "center" }}>

          {/* Tile 1 — "Did you know?" — B_ACCENT (salmon-red) replaces old pink */}
          <div style={{
            borderRadius: 14,
            position: "relative", overflow: "hidden", minHeight: 280,
            background: "#F2778A",
            boxShadow: "6px 0 24px rgba(0,0,0,0.10), 0 4px 16px rgba(0,0,0,0.08)",
            alignSelf: "center",
          }}>
            <div style={{
              position: "relative", zIndex: 10, padding: "20px 28px",
              display: "flex", flexDirection: "column",
              justifyContent: "space-between", height: "100%", minHeight: 280, gap: 14,
            }}>
              <span style={{
                fontFamily: FONT_SANS,
                fontSize: 11, fontWeight: 800, letterSpacing: "1.6px",
                textTransform: "uppercase",
                color: "#ffffff",
                display: "block",
                marginBottom: 10,
              }}>
                Did you know?
              </span>
              <p style={{
                fontFamily: FONT_SANS,
                color: "#ffffff", fontSize: 19, fontWeight: 600,
                lineHeight: 1.55, maxWidth: 520,
                opacity: factFading ? 0 : 1,
                transition: "opacity 0.28s", margin: 0,
              }}>
                {FUN_FACTS[factIdx]}
              </p>

              <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-end" }}>
                <button
                  onClick={cycleFact}
                  title="Next fact"
                  style={{
                    width: 28, height: 28, borderRadius: "50%",
                    background: "rgba(255,255,255,0.18)",
                    border: "1px solid rgba(255,255,255,0.3)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    cursor: "pointer", color: "rgba(255,255,255,0.9)",
                    flexShrink: 0,
                  }}
                >
                  <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                    <path d="M11 6.5A4.5 4.5 0 1 1 6.5 2c1.2 0 2.3.47 3.1 1.24" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
                    <polyline points="9.5,1 9.5,3.5 12,3.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              </div>
            </div>
          </div>

          {/* Tile 2 — KPI stat cards — B_ACCENT replaces forest green */}
          <div style={{ display: "flex", flexDirection: "column", gap: 0, minHeight: 280, alignSelf: "center" }}>
            <div style={{ flex: 1, position: "relative" }}>
              {HERO_STATS.map((s, i) => (
                <div key={s.label} style={{
                  position: "absolute", inset: 0,
                  display: "flex",
                  flexDirection: "column", justifyContent: "flex-start", alignItems: "center", textAlign: "center",
                  borderRadius: 14, padding: "20px 28px",
                  background: "#4347B0",
                  boxShadow: "6px 0 24px rgba(0,0,0,0.10), 0 4px 20px rgba(0,0,0,0.12)",
                  opacity: i === 0 ? 1 : 0,
                  transition: "opacity 0.5s ease",
                  animation: `kpiCycle${i} ${HERO_STATS.length * 3.5}s ${i * 3.5}s infinite`,
                }}>
                  {/* Top accent line */}
                  <div style={{
                    position: "absolute", top: 0, left: 0, right: 0, height: 1.4,
                    background: "rgba(255,255,255,0.35)",
                  }} />
                  <p style={{
                    fontFamily: FONT_SANS,
                    fontSize: 10, fontWeight: 800, textTransform: "uppercase",
                    letterSpacing: "1.4px", margin: 0, color: "#ffffff",
                    alignSelf: "flex-start", textAlign: "left",
                  }}>
                    In the numbers
                  </p>
                  <div style={{ flex: 1 }} />
                  <p style={{
                    fontFamily: FONT_SANS,
                    fontSize: 12, fontWeight: 800, textTransform: "uppercase",
                    letterSpacing: "1.2px", margin: "0 0 8px", color: "rgba(255,255,255,0.9)",
                  }}>
                    {s.label}
                  </p>
                  <p style={{
                    fontFamily: FONT_SANS,
                    fontSize: 64, fontWeight: 900, color: "#ffffff",
                    letterSpacing: "-1.5px", lineHeight: 1, margin: 0,
                  }}>
                    {s.num}
                  </p>
                  <p style={{ fontFamily: FONT_SANS, fontSize: 13, margin: "8px 0 0", color: "rgba(255,255,255,0.78)" }}>
                    {s.sub}
                  </p>
                  <div style={{ flex: 1 }} />
                </div>
              ))}
            </div>
          </div>

          {/* Tile 3 — Social feed */}
          <div
            style={{
              borderRadius: 14, background: "white", minHeight: 280,
              overflow: "hidden", position: "relative",
              boxShadow: "6px 0 24px rgba(0,0,0,0.08), 0 4px 16px rgba(0,0,0,0.04)",
              border: "1px solid #f0f0f5", display: "flex", flexDirection: "column",
              alignSelf: "start",
            }}
            onMouseEnter={() => setShimmer(true)}
            onMouseLeave={() => setShimmer(false)}
          >
            {shimmer && (
              <div style={{
                position: "absolute", top: 0, bottom: 0, width: "40%",
                background: "linear-gradient(105deg, transparent 0%, rgba(51,51,153,0.04) 45%, rgba(51,51,153,0.06) 50%, rgba(51,51,153,0.04) 55%, transparent 100%)",
                animation: "te-shimmer 0.6s ease-out forwards",
                pointerEvents: "none", zIndex: 5,
              }} />
            )}

            <div style={{
              padding: "16px 20px 12px", borderBottom: "1px solid #f0f0f5",
              display: "flex", alignItems: "center", justifyContent: "space-between",
            }}>
              {blockEyebrow("Social Feed")}
              <div style={{ display: "flex", gap: 6 }}>
                {[{ Icon: Twitter, c: "#0EA5E9" }, { Icon: Instagram, c: "#EC4899" }, { Icon: Linkedin, c: "#1D4ED8" }].map(({ Icon, c }) => (
                  <div key={c} style={{
                    width: 24, height: 24, borderRadius: 6,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    background: `${c}12`, cursor: "pointer",
                  }}>
                    <Icon size={10} style={{ color: c }} />
                  </div>
                ))}
              </div>
            </div>

            <div style={{ flex: 1, padding: "16px 20px" }}>
              {SOCIAL_POSTS.map((post, i) => (
                <div key={i} style={{ display: i === socialIdx ? "block" : "none" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
                    <div style={{
                      width: 36, height: 36, borderRadius: 10, flexShrink: 0,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      background: `linear-gradient(135deg, ${post.iconBg}, ${post.iconBg}cc)`,
                    }}>
                      <post.Icon size={13} color="white" />
                    </div>
                    <div>
                      <p style={{ fontFamily: FONT_SANS, fontSize: 13, fontWeight: 800, color: ACCENT_NAVY, margin: 0 }}>{post.handle}</p>
                      <p style={{ fontFamily: FONT_SANS, fontSize: 11, color: "#94a3b8", margin: 0 }}>{post.time} · {post.platform}</p>
                    </div>
                  </div>
                  <p style={{ fontFamily: FONT_SANS, fontSize: 13, color: "#475569", lineHeight: 1.6, margin: 0 }}>{post.text}</p>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 12 }}>
                    <span style={{ fontFamily: FONT_SANS, fontSize: 11, color: "#94a3b8" }}>❤️ {post.likes}</span>
                    <button onClick={() => triggerToast("Opening social post...")}
                      style={{ fontFamily: FONT_SANS, fontSize: 11, fontWeight: 800, color: B_TICKER, background: "none", border: "none", cursor: "pointer" }}>
                      View →
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div style={{ padding: "0 20px 16px" }}>
              <div style={{ display: "flex", gap: 5, justifyContent: "center", marginBottom: 10 }}>
                {SOCIAL_POSTS.map((_, i) => (
                  <button key={i} onClick={() => setSocialIdx(i)} style={{
                    width: i === socialIdx ? 16 : 6, height: 4,
                    borderRadius: 100, border: "none", cursor: "pointer", padding: 0,
                    background: i === socialIdx ? B_TICKER : "#e2e8f0",
                    transition: "all 0.2s",
                  }} />
                ))}
              </div>
              <button onClick={() => triggerToast("Opening social media...")} style={{
                width: "100%", display: "flex", alignItems: "center", justifyContent: "center",
                gap: 6, padding: "9px 0", borderRadius: 10,
                fontFamily: FONT_SANS, fontSize: 12, fontWeight: 800,
                background: B_TICKER,
                color: "white", border: "none", cursor: "pointer",
              }}>
                Follow @TataEngage <ArrowRight size={9} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* KPI cycle keyframes */}
      <style>{`
        @keyframes kpiCycle0 { 0%,30%{opacity:1} 33%,96%{opacity:0} 100%{opacity:1} }
        @keyframes kpiCycle1 { 0%,30%{opacity:0} 33%,63%{opacity:1} 66%,100%{opacity:0} }
        @keyframes kpiCycle2 { 0%,63%{opacity:0} 66%,96%{opacity:1} 100%{opacity:0} }
      `}</style>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// JOURNEY SECTION — shrunk to ~50% of original height
// Wave pattern texture on dark bg (subtle)
// ─────────────────────────────────────────────────────────────────────────────
export function JourneySection() {
  const navigate    = useAppNavigate();
  const ref         = useRef<HTMLElement>(null);
  const [vis, setVis] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVis(true); obs.disconnect(); } },
      { threshold: 0.12 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const milestones = JOURNEY_MILESTONES;

  return (
    <section ref={ref} className="section-block" style={{
      backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 24px, rgba(255,255,255,0.016) 24px, rgba(255,255,255,0.016) 25px), url(${titanImg})`,
      backgroundSize: "auto, cover",
      backgroundPosition: "center, center",
      position: "relative", overflow: "hidden",
      // Reduced from 72px to ~36px for 50% height reduction
      padding: "40px 48px",
    }}>
      {/* Dark overlay */}
      <div style={{
        position: "absolute", inset: 0,
        background: "linear-gradient(135deg, rgba(5,5,20,0.68) 0%, rgba(5,5,20,0.60) 100%)",
        pointerEvents: "none",
      }} />

      {/* Faint wave pattern on dark bg */}
      <div style={{
        position: "absolute", inset: 0,
        backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 24px, rgba(255,255,255,0.018) 24px, rgba(255,255,255,0.018) 25px)",
        pointerEvents: "none",
      }} />

      <div style={{ maxWidth: 1100, margin: "0 auto", position: "relative" }}>

        {/* Header */}
        <div style={{ marginBottom: 28 }}>
          <SectionEyebrow label="Our Journey" dark />
          <SectionH2 dark>
            A <em style={{ fontStyle: "italic", color: B_YELLOW }}>Decade</em> of Giving Back
          </SectionH2>
          <div style={{ width: 48, height: 1.4, borderRadius: 2, background: B_YELLOW, marginTop: 10 }} />
        </div>

        {/* Desktop timeline — compact */}
        <div className="hidden lg:block">

          {/* ROW 1 — even milestones above track */}
          <div style={{ display: "flex", alignItems: "flex-end" }}>
            {milestones.map((m, i) => {
              const isAbove = i % 2 === 0;
              return (
                <div
                  key={`top-${i}`}
                  style={{
                    flex: 1,
                    display: "flex", flexDirection: "column",
                    alignItems: "center", textAlign: "center",
                    visibility: isAbove ? "visible" : "hidden",
                    minHeight: 72,                     // reduced from 100
                    opacity: vis ? 1 : 0,
                    transform: vis ? "translateY(0)" : "translateY(-10px)",
                    transition: `opacity 0.45s ease ${i * 0.09}s, transform 0.45s ease ${i * 0.09}s`,
                  }}
                >
                  <span style={{
                    fontFamily: FONT_SANS,
                    fontSize: 22, fontWeight: 900, color: m.colour,
                    background: `${m.colour}14`,
                    borderRadius: 5, padding: "3px 9px",
                    letterSpacing: "-0.3px", marginBottom: 4,
                    display: "inline-block",
                  }}>
                    {m.year}
                  </span>
                  <div style={{ fontFamily: FONT_SANS, fontSize: 13, fontWeight: 800, color: "white", lineHeight: 1.3, marginBottom: 6 }}>
                    {m.title}
                  </div>
                  <div style={{
                    width: 1.5, flex: 1, minHeight: 10,
                    background: `linear-gradient(to bottom, ${m.colour}, ${m.colour}44)`,
                    opacity: vis ? 1 : 0,
                    transition: `opacity 0.55s ease ${i * 0.09 + 0.25}s`,
                  }} />
                </div>
              );
            })}
          </div>

          {/* TRACK */}
          <div style={{ position: "relative", height: 14 }}>
            <svg width="100%" height="14" viewBox="0 0 1000 14" preserveAspectRatio="none"
              style={{ position: "absolute", top: 0, left: 0 }}>
              <line x1="0" y1="7" x2="1000" y2="7" stroke="rgba(255,255,255,0.30)" strokeWidth="1.2" />
              {milestones.map((m, i) => {
                const cx = (i / (milestones.length - 1)) * 1000;
                return (
                  <circle key={i} cx={cx} cy="7" r="4"
                    fill={m.colour} stroke="rgba(255,255,255,0.5)" strokeWidth="1.5"
                    opacity={vis ? 1 : 0}
                    style={{ transition: `opacity 0.35s ease ${i * 0.1 + 0.35}s` }}
                  />
                );
              })}
            </svg>
          </div>

          {/* ROW 3 — odd milestones below track */}
          <div style={{ display: "flex", alignItems: "flex-start" }}>
            {milestones.map((m, i) => {
              const isBelow = i % 2 !== 0;
              return (
                <div
                  key={`bot-${i}`}
                  style={{
                    flex: 1,
                    display: "flex", flexDirection: "column",
                    alignItems: "center", textAlign: "center",
                    visibility: isBelow ? "visible" : "hidden",
                    minHeight: 72,
                    opacity: vis ? 1 : 0,
                    transform: vis ? "translateY(0)" : "translateY(10px)",
                    transition: `opacity 0.45s ease ${i * 0.09}s, transform 0.45s ease ${i * 0.09}s`,
                  }}
                >
                  <div style={{
                    width: 1.5, flex: 1, minHeight: 10,
                    background: `linear-gradient(to bottom, ${m.colour}44, ${m.colour})`,
                    opacity: vis ? 1 : 0,
                    transition: `opacity 0.55s ease ${i * 0.09 + 0.25}s`,
                  }} />
                  <span style={{
                    fontFamily: FONT_SANS,
                    fontSize: 22, fontWeight: 900, color: m.colour,
                    background: `${m.colour}14`,
                    borderRadius: 5, padding: "3px 9px",
                    letterSpacing: "-0.3px", marginTop: 6, marginBottom: 3,
                    display: "inline-block",
                  }}>
                    {m.year}
                  </span>
                  <div style={{ fontFamily: FONT_SANS, fontSize: 13, fontWeight: 800, color: "white", lineHeight: 1.3 }}>
                    {m.title}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Mobile fallback */}
        <div className="lg:hidden" style={{ paddingLeft: 24, position: "relative" }}>
          <div style={{
            position: "absolute", left: 8, top: 0, bottom: 0, width: 1.5,
            background: `linear-gradient(180deg, ${B_TICKER}60, ${B_TEAL}60)`,
          }} />
          {milestones.map((m, i) => (
            <div key={i} style={{ position: "relative", marginBottom: 14 }}>
              <div style={{
                position: "absolute", left: -20, top: 6, width: 8, height: 8,
                borderRadius: "50%", background: m.colour,
              }} />
              <span style={{ fontFamily: FONT_SANS, fontSize: 15, fontWeight: 900, color: m.colour }}>{m.year}</span>
              <div style={{ fontFamily: FONT_SANS, fontSize: 12, fontWeight: 800, color: "white", marginTop: 2 }}>{m.title}</div>
            </div>
          ))}
        </div>

        <div style={{ marginTop: 28, display: "flex", justifyContent: "flex-end" }}>
          <button
            onClick={() => navigate("journey")}
            style={{
              display: "inline-flex", alignItems: "center", gap: 6,
              fontFamily: FONT_SANS, fontSize: 13, fontWeight: 700,
              background: "none", color: "#ffffff",
              border: "none", cursor: "pointer", padding: 0,
            }}
          >
            Learn more <ArrowRight size={13} />
          </button>
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// TICKER BAR
// ─────────────────────────────────────────────────────────────────────────────
export function TickerBar({ fixed = false }: { fixed?: boolean }) {
  const tickerDouble = [...TICKER_ITEMS, ...TICKER_ITEMS];
  return (
    <div style={{
      ...(fixed ? { position: "fixed", bottom: 0, left: 0, right: 0, zIndex: 50 } : {}),
      padding: "10px 0", overflow: "hidden",
      background: B_TICKER,
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
        <div style={{ flexShrink: 0, paddingLeft: 24 }}>
          <span style={{
            fontFamily: FONT_SANS,
            fontSize: 11, fontWeight: 900,
            background: B_YELLOW, color: ACCENT_NAVY,
            padding: "3px 12px", borderRadius: 100, whiteSpace: "nowrap",
          }}>
            🔴 LIVE
          </span>
        </div>
        <div style={{ flex: 1, overflow: "hidden" }}>
          <div className="te-marquee">
            {tickerDouble.map((item, i) => (
              <span key={i}
                style={{ fontFamily: FONT_SANS, fontSize: 13, color: "rgba(255,255,255,1)", flexShrink: 0, cursor: "pointer", transition: "color 0.15s" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "white")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,1)")}
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// HERO BANNER — exported for use in HomeView.tsx
// ─────────────────────────────────────────────────────────────────────────────
export function HeroBanner({
  title,
  eyebrow,
  description,
  scrollTargetId = "programmes",
}: {
  title: React.ReactNode;
  eyebrow: string;
  description: string;
  scrollTargetId?: string;
}) {
  const imgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => {
      if (!imgRef.current) return;
      imgRef.current.style.transform = `translateY(${window.scrollY * 0.4}px)`;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollDown = () =>
    document.getElementById(scrollTargetId)?.scrollIntoView({ behavior: "smooth" });

  return (
    <>
      <style>{GLOBAL_STYLES}</style>
      <div style={{
        position: "relative", overflow: "hidden",
        height: "100vh", minHeight: 600,
        display: "flex", flexDirection: "column",
        alignItems: "flex-start", justifyContent: "center",
      }}>
        <div
          ref={imgRef}
          style={{
            position: "absolute",
            top: "-20%", left: 0, right: 0, bottom: "-20%",
            backgroundImage: `url(${tataElxsiImg})`,
            backgroundSize: "cover", backgroundPosition: "center",
            willChange: "transform",
          }}
        />

        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(155deg, rgba(8,12,22,0.74) 0%, rgba(8,12,22,0.50) 100%)",
        }} />

        <img src={doodleCluster4} alt="" style={{
          position: "absolute", top: 40, right: -60, width: 280, opacity: 0.06,
          pointerEvents: "none", userSelect: "none", transform: "rotate(-10deg)",
        }} />

        <div style={{ position: "relative", zIndex: 10, padding: "0 64px", maxWidth: 760 }}>
          <p style={{
            fontFamily: FONT_SANS,
            fontSize: 11, fontWeight: 800, letterSpacing: "2.5px",
            textTransform: "uppercase", color: "rgba(255,255,255,0.5)",
            margin: 0,
          }}>
            {eyebrow}
          </p>
          <DefinerUnderline colour={B_TEAL} width={60} />

          <h1 style={{
            fontFamily: FONT_SANS,
            fontSize: 52, lineHeight: 1.1, letterSpacing: "-0.5px",
            color: "white", margin: "18px 0 20px",
          }}>
            {title}
          </h1>

          <p style={{
            fontFamily: FONT_SANS,
            fontSize: 16, lineHeight: 1.7, fontWeight: 300,
            color: "rgba(255,255,255,0.65)",
            maxWidth: 520, margin: 0,
          }}>
            {description}
          </p>
        </div>

        <button
          onClick={scrollDown}
          style={{
            position: "absolute", bottom: 40, left: "50%",
            transform: "translateX(-50%)",
            background: "none", border: "none", cursor: "pointer",
            display: "flex", flexDirection: "column",
            alignItems: "center", gap: 2, padding: 8, zIndex: 10,
          }}
          aria-label="Scroll down"
        >
          <ChevronDown size={22} color="rgba(255,255,255,0.9)"  className="te-bob-1" />
          <ChevronDown size={22} color="rgba(255,255,255,0.55)" className="te-bob-2" />
          <ChevronDown size={22} color="rgba(255,255,255,0.28)" className="te-bob-3" />
        </button>
      </div>
    </>
  );
}
