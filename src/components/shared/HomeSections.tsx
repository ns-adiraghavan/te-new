import { useState, useEffect, useRef } from "react";
import { ArrowRight, ChevronDown, ChevronUp } from "lucide-react";
import { Facebook, Instagram, Linkedin } from "lucide-react";
import { useAppContext } from "@/context/AppContext";
import { useAppNavigate } from "@/hooks/useAppNavigate";
import { IMPACT_STORIES } from "@/data/impactStoriesData";
import {
  B_INDIGO,
  B_YELLOW,
  B_RED,
  B_TEAL,
  B_BLUE,
  B_TICKER,
  P_INDIGO,
  P_TEAL,
  P_RED,
  P_YELLOW,
  secBg,
  SectionDivider,
  FLAGSHIP_PROGRAMMES,
  JOURNEY_MILESTONES,
  FUN_FACTS,
  HERO_STATS,
  SOCIAL_POSTS,
  TICKER_ITEMS,
  EOEO,
  ACCENT_NAVY,
} from "@/data/homeSharedData";
import doodleCluster1 from "@/assets/doodle-cluster-1.png";
import doodleCluster2 from "@/assets/doodle-cluster-2.png";
import doodleCluster3 from "@/assets/doodle-cluster-3.png";
import doodleCluster4 from "@/assets/doodle-cluster-4.png";
import tataElxsiImg from "@/assets/tata-elxsi.jpg";
import airIndia from "@/assets/air-india.jpg";
import tataCommunications from "@/assets/tata-communications-1.jpg";
import infiniti from "@/assets/Infiniti_2.jpg";
import tataPower from "@/assets/tata_power.JPG";
import drPhoto from "@/assets/Home_Page_DR_Option2.JPG";
import tajSatsImg from "@/assets/tata-motors-2.jpg";
import titanImg from "@/assets/titain.jpeg";
import trentImg from "@/assets/trent_2.jpg";
import tataMotors3 from "@/assets/tata-motors-3.jpg";
import tataProjects from "@/assets/tata-projects.jpg";
import tataBball from "@/assets/tatabball.jpg";
import drPhoto2 from "@/assets/dr_photo_2.jpg";
import happyEyes from "@/assets/happy-eyes.jpg";
import tataAig from "@/assets/tata-aig-1.jpg";
import tataInfinit from "@/assets/tata-infinit.jpg";
import tataComm2 from "@/assets/tata-comm-2.jpeg";
import tataMotors1 from "@/assets/Tata_Motors_1.jpg";
import tajSats1 from "@/assets/Taj_Sats.jpeg";
import trent1 from "@/assets/trent.jpg";

// Journey collage — homepagebanner folder
import hb_jcapcpl22 from "@/assets/homepagebanner/JCAPCPL22.JPG";
import hb_antarang from "@/assets/homepagebanner/Antarang Foundation - Project Horizon - Mentoring Session by Leadership - Tata AIA.jpg";
import hb_ihcl from "@/assets/homepagebanner/IHCL 1.jpg";
import hb_tvw6 from "@/assets/homepagebanner/TVW 6  - 7th Day 7.JPG";
import hb_roadSafety from "@/assets/homepagebanner/Road Safety Awareness by HRM (2).JPG";
import hb_eyeScanning from "@/assets/homepagebanner/Eye Scanning Camp Joda 1.jpg";
import hb_images3 from "@/assets/homepagebanner/images3.jpg";
import hb_titan from "@/assets/homepagebanner/General_Titan Company Ltd_01.jpg";
import hb_voltas from "@/assets/homepagebanner/Voltas.jpg";
import hb_volunteeringInAction from "@/assets/homepagebanner/Volunteering in Action 5.jpg";
import hb_jcapcpl3 from "@/assets/homepagebanner/JCAPCPL 3 (2).JPG";
import hb_2021 from "@/assets/homepagebanner/2021-09-08T17_58_56.4567530+05_30.jpg";
import hb_img20230211 from "@/assets/homepagebanner/IMG-20230211-WA0080.jpg";
import hb_bluescope from "@/assets/homepagebanner/Tata Bluescope Steel (2).jpg";
import hb_westside from "@/assets/homepagebanner/Westside Store employees_Paint an Orphanage - Trent.JPG";
import hb_mithapur from "@/assets/homepagebanner/4. Mithapur_Eco-Tourism_LEEPEN_Harivan Farm_2022-23_Lipan Work (5).jpeg";

export { SectionDivider };

// ─────────────────────────────────────────────────────────────────────────────
// DESIGN TOKENS
// ─────────────────────────────────────────────────────────────────────────────
// Accent for changed tiles: #D84926 (TSG red-orange), replacing forest green
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

  /* ── Responsive overrides for shared HomeSections (Hubs + Home) ── */
  @media (max-width: 1023px) {
    .section-block { padding: 56px 28px !important; }
    .section-block #programmes-grid,
    .section-block .te-prog-grid { grid-template-columns: 1fr !important; }
    .section-block .te-num-grid { grid-template-columns: 1fr 1fr !important; }
    .section-block .te-card-split { grid-template-columns: 1fr !important; }
    .section-block .te-card-split > * { clip-path: none !important; }
  }
  @media (max-width: 639px) {
    .section-block { padding: 40px 18px !important; }
    .section-block .te-num-grid { grid-template-columns: 1fr !important; }
    .section-block h1, .section-block h2 { font-size: clamp(1.4rem, 6vw, 2rem) !important; line-height: 1.2 !important; }
  }


  /* Lift on hover */
  .hover-lift { transition: transform 0.18s ease, box-shadow 0.18s ease; }
  .hover-lift:hover { transform: translateY(-3px); box-shadow: 0 8px 24px rgba(0,0,0,0.10); }

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
    transform: perspective(800px) rotateY(-2deg) rotateX(1deg) translateY(-3px);
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
  .prog-style-a:hover { transform: translateY(-3px); box-shadow: 0 8px 24px rgba(0,0,0,0.10); }
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
      ([e]) => {
        if (e.isIntersecting) {
          setOn(true);
          obs.disconnect();
        }
      },
      { threshold: 0.4 },
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
    <p
      style={{
        fontFamily: FONT_SANS,
        fontSize: 14,
        fontWeight: 700,
        letterSpacing: "1.8px",
        textTransform: "uppercase",
        color: dark ? "#ffffff" : ACCENT_NAVY,
        margin: "0 0 8px",
        opacity: 1,
      }}
    >
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
    <h2
      style={{
        fontFamily: FONT_SANS,
        fontSize: 32,
        fontWeight: 900,
        color: dark ? "#ffffff" : ACCENT_NAVY,
        letterSpacing: "-0.5px",
        margin: 0,
        lineHeight: 1.15,
      }}
    >
      {children}
    </h2>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// PROGRAMME CONFIG
// ─────────────────────────────────────────────────────────────────────────────
const PROG_CONFIG = [
  {
    id: "TVW",
    route: "about-tvw",
    title: "Tata Volunteering Week",
    label: "Bi-annual · Global",
    stat1: "12 Editions",
    stat2: "50K+ Volunteers",
    colour: "#3B7ABD",
    photo: airIndia,
    photoPos: "center 25%",
    accentWord: "Volunteering", // word to italicise in card title
  },
  {
    id: "ProEngage",
    route: "about-proengage",
    title: "ProEngage",
    label: "Skill-based · Year-round",
    stat1: "1,200+ Projects",
    stat2: "85 NGO Partners",
    colour: "#803998",
    photo: tataCommunications,
    photoPos: "center center",
    accentWord: "ProEngage",
  },
  {
    id: "Disaster Response",
    route: "disaster-response",
    title: "Disaster Response",
    label: "Rapid Action",
    stat1: "24 Responses",
    stat2: "8 States",
    colour: "#13BBB4",
    photo: drPhoto,
    photoPos: "center 20%",
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
  const navigate = useAppNavigate();
  const [idx, setIdx] = useState(0);
  const [rightBox, setRightBox] = useState(0);
  const [visible, setVisible] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const sectionRef = useRef<HTMLElement>(null);

  // Intersection → trigger card entrance animation
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.1 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const resetTimer = (nextIdx?: number) => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => setIdx((p) => (p + 1) % PROG_CONFIG.length), 5000);
    if (nextIdx !== undefined) setIdx(nextIdx);
  };

  useEffect(() => {
    resetTimer();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  const p = PROG_CONFIG[idx];

  // Render title with italic accent on the accent word
  const renderTitle = (title: string, _accentWord: string, _colour: string) => {
    // No italic inside programme cards — plain bold only
    return <span>{title}</span>;
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
          padding: "72px 28px",
          backgroundImage: "radial-gradient(circle, rgba(51,51,153,0.09) 1.2px, transparent 1.2px)",
          backgroundSize: "20px 20px",
        }}
      >
        <div style={{ maxWidth: 1100, margin: "0 auto", position: "relative" }}>
          {/* Section header */}
          <div className="section-header">
            <SectionEyebrow label="Our Programmes" />
            <SectionH2>
              Volunteering <em style={{ fontStyle: "italic", color: B_INDIGO }}>Opportunities</em>
            </SectionH2>
            <div
              style={{
                width: 120,
                height: 1.4,
                borderRadius: 2,
                background: "#e8e8f0",
                marginTop: 10,
                overflow: "hidden",
              }}
            >
              <div className="te-draw" style={{ height: "100%", background: B_INDIGO, borderRadius: 2 }} />
            </div>
          </div>

          {/* Main grid */}
          <div className="te-prog-grid" style={{ display: "grid", gridTemplateColumns: "1fr 260px", gap: 16, alignItems: "start" }}>
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
                  className="prog-style-a prog-tilt card-shadow-right te-card-split"
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
                  <div
                    style={{
                      background: `linear-gradient(135deg, ${p.colour} 0%, ${p.colour}cc 100%)`,
                      padding: "36px 28px 36px 16px",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                    }}
                  >
                    <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center" }}>
                      {/* Italic title with accent word */}
                      <h3
                        style={{
                          fontFamily: FONT_SANS,
                          fontSize: 28,
                          fontWeight: 900,
                          color: "#ffffff",
                          letterSpacing: "-0.4px",
                          lineHeight: 1.2,
                          margin: "0 0 8px",
                        }}
                      >
                        {renderTitle(p.title, p.accentWord, "rgba(255,255,255,0.7)")}
                      </h3>
                      <div
                        style={{
                          width: 40,
                          height: 2,
                          background: "rgba(255,255,255,0.6)",
                          borderRadius: 1,
                          margin: "6px 0 10px",
                        }}
                      />
                      <p
                        style={{
                          fontFamily: FONT_SANS,
                          fontSize: 14,
                          color: "rgba(255,255,255,0.85)",
                          lineHeight: 1.55,
                          margin: 0,
                        }}
                      >
                        {PROG_SUBS[idx]}
                      </p>
                    </div>
                    <div style={{ marginTop: 16 }}>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 6,
                          fontFamily: FONT_SANS,
                          fontSize: 13,
                          fontWeight: 700,
                          color: "#ffffff",
                        }}
                      >
                        Learn More <ArrowRight size={13} />
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
                      width: i === idx ? 24 : 8,
                      height: 7,
                      borderRadius: 100,
                      border: "none",
                      cursor: "pointer",
                      padding: 0,
                      background: i === idx ? pc.colour : "#d1d5db",
                      transition: "all 0.35s ease",
                    }}
                  />
                ))}
              </div>
            </div>

            {/* RIGHT: CVP + EOI tiles — B_ACCENT replaces forest green */}
            <div style={{ position: "relative", overflow: "hidden", borderRadius: 14, minHeight: 340 }}>
              {/* CVP tile — B_ACCENT (#D84926) */}
              <div
                onClick={() => navigate("cvp")}
                style={{
                  position: "absolute",
                  inset: 0,
                  background: "#135EA9",
                  padding: "28px 20px 16px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  borderRadius: 14,
                  opacity: rightBox === 0 ? 1 : 0,
                  transform: rightBox === 0 ? "translateY(0)" : "translateY(-24px)",
                  transition: "opacity 0.3s ease, transform 0.3s ease",
                  pointerEvents: rightBox === 0 ? "auto" : "none",
                  boxShadow: "6px 0 24px rgba(13,27,62,0.10), 0 4px 16px rgba(0,0,0,0.08)",
                  cursor: "pointer",
                }}
              >
                <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center" }}>
                  <h3
                    style={{
                      fontFamily: FONT_SANS,
                      fontSize: 22,
                      fontWeight: 900,
                      color: "#ffffff",
                      lineHeight: 1.2,
                      margin: "0 0 8px",
                      letterSpacing: "-0.4px",
                    }}
                  >
                    Company Volunteering Programme
                  </h3>
                  <div
                    style={{
                      width: 40,
                      height: 2,
                      background: "rgba(255,255,255,0.6)",
                      borderRadius: 1,
                      margin: "6px 0 10px",
                    }}
                  />
                  <p
                    style={{
                      fontFamily: FONT_SANS,
                      fontSize: 14,
                      color: "rgba(255,255,255,0.85)",
                      lineHeight: 1.55,
                      margin: "0 0 0",
                    }}
                  >
                    Company led volunteering programme or opportunities customised for operating context and needs of
                    the local communities
                  </p>
                </div>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 16 }}>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate("cvp");
                    }}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 6,
                      fontFamily: FONT_SANS,
                      fontSize: 13,
                      fontWeight: 700,
                      color: "#ffffff",
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      padding: 0,
                    }}
                  >
                    Learn More <ArrowRight size={13} />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setRightBox(1);
                    }}
                    style={{
                      width: 26,
                      height: 26,
                      borderRadius: "50%",
                      background: "rgba(255,255,255,0.18)",
                      border: "1px solid rgba(255,255,255,0.4)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      cursor: "pointer",
                      color: "#ffffff",
                    }}
                  >
                    <ChevronDown size={14} />
                  </button>
                </div>
              </div>

              {/* EOI tile — pink */}
              <div
                onClick={() => navigate("eoi")}
                style={{
                  position: "absolute",
                  inset: 0,
                  background: "#F4838A",
                  padding: "28px 20px 16px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  borderRadius: 14,
                  opacity: rightBox === 1 ? 1 : 0,
                  transform: rightBox === 1 ? "translateY(0)" : "translateY(24px)",
                  transition: "opacity 0.3s ease, transform 0.3s ease",
                  pointerEvents: rightBox === 1 ? "auto" : "none",
                  boxShadow: "6px 0 24px rgba(13,27,62,0.10), 0 4px 16px rgba(0,0,0,0.08)",
                  cursor: "pointer",
                }}
              >
                <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center" }}>
                  <h3
                    style={{
                      fontFamily: FONT_SANS,
                      fontSize: 22,
                      fontWeight: 900,
                      color: "#ffffff",
                      lineHeight: 1.2,
                      margin: "0 0 8px",
                      letterSpacing: "-0.4px",
                    }}
                  >
                    Employees' Own Initiatives
                  </h3>
                  <div
                    style={{
                      width: 40,
                      height: 2,
                      background: "rgba(255,255,255,0.6)",
                      borderRadius: 1,
                      margin: "6px 0 10px",
                    }}
                  />
                  <p
                    style={{
                      fontFamily: FONT_SANS,
                      fontSize: 14,
                      color: "rgba(255,255,255,0.85)",
                      lineHeight: 1.55,
                      margin: "0 0 0",
                    }}
                  >
                    Empowering employees to volunteer their way for causes close to their heart
                  </p>
                </div>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 16 }}>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate("eoi");
                    }}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 6,
                      fontFamily: FONT_SANS,
                      fontSize: 13,
                      fontWeight: 700,
                      color: "#ffffff",
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      padding: 0,
                    }}
                  >
                    Learn More <ArrowRight size={13} />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setRightBox(0);
                    }}
                    style={{
                      width: 26,
                      height: 26,
                      borderRadius: "50%",
                      background: "#F9A8D460",
                      border: "1px solid #F9A8D4",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      cursor: "pointer",
                      color: "#9D174D",
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
      ([e]) => {
        if (e.isIntersecting) {
          setVis(true);
          obs.disconnect();
        }
      },
      { threshold: 0.25 },
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
        padding: "52px 48px", // shorter than Journey's 72px
      }}
    >
      {/* Dark overlay — lightened for image visibility */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(135deg, rgba(5,5,20,0.72) 0%, rgba(5,5,20,0.68) 100%)",
          pointerEvents: "none",
        }}
      />

      {/* Subtle diagonal texture overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: "repeating-linear-gradient(45deg, rgba(255,255,255,0.012) 0 1px, transparent 1px 18px)",
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          maxWidth: 820,
          margin: "0 auto",
          position: "relative",
          textAlign: "center",
          opacity: vis ? 1 : 0,
          transform: vis ? "translateY(0)" : "translateY(20px)",
          transition: "opacity 0.7s cubic-bezier(0.22,1,0.36,1), transform 0.7s cubic-bezier(0.22,1,0.36,1)",
        }}
      >
        {/* Opening quote mark */}
        <div
          style={{
            fontFamily: FONT_SANS,
            fontSize: 72,
            lineHeight: 1,
            color: "#ffffff",
            opacity: 0.5,
            marginBottom: -12,
            fontWeight: 900,
            userSelect: "none",
          }}
        >
          "
        </div>

        {/* Primary quote */}
        <blockquote
          style={{
            fontFamily: FONT_SANS,
            fontSize: 22,
            fontWeight: 400,
            fontStyle: "italic",
            color: "rgba(255,255,255,0.93)",
            lineHeight: 1.65,
            margin: "0 0 24px",
            letterSpacing: "-0.2px",
          }}
        >
          Volunteering is not about doing more. It is about{" "}
          <em style={{ fontStyle: "italic", color: B_YELLOW, fontWeight: 600 }}>refusing to look away</em> — and
          choosing, consistently, to be part of something{" "}
          <em style={{ fontStyle: "italic", color: B_YELLOW, fontWeight: 600 }}>larger than ourselves</em>.
        </blockquote>

        {/* Attribution */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 12,
          }}
        >
          <div style={{ height: 1, width: 32, background: "#ffffff", opacity: 0.7, borderRadius: 1 }} />
          <span
            style={{
              fontFamily: FONT_SANS,
              fontSize: 12,
              fontWeight: 700,
              letterSpacing: "2px",
              textTransform: "uppercase",
              color: "#ffffff",
            }}
          >
            Tata Engage · Spirit of Service
          </span>
          <div style={{ height: 1, width: 32, background: "#ffffff", opacity: 0.7, borderRadius: 1 }} />
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// NUMBERS SECTION — with radial dot grid background texture
// ─────────────────────────────────────────────────────────────────────────────
// ─────────────────────────────────────────────────────────────────────────────
// STORY ROTATOR — single card that cycles through 3 impact stories
// ─────────────────────────────────────────────────────────────────────────────
function StoryRotator({ navigate }: { navigate: (view: any, slug?: string) => void }) {
  const stories = IMPACT_STORIES.slice(0, 3);
  const [idx, setIdx] = useState(0);
  const [prevIdx, setPrevIdx] = useState(0);
  const [showCurrent, setShowCurrent] = useState(true);

  useEffect(() => {
    const t = setInterval(() => setIdx((p) => (p + 1) % stories.length), 4000);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    setShowCurrent(false);
    const r = requestAnimationFrame(() => setShowCurrent(true));
    const t = setTimeout(() => setPrevIdx(idx), 380);
    return () => { cancelAnimationFrame(r); clearTimeout(t); };
  }, [idx]);

  const renderLayer = (story: typeof stories[number], opacity: number, interactive: boolean) => (
    <div
      style={{
        position: "absolute", inset: 0,
        borderRadius: 14, overflow: "hidden",
        backgroundImage: `url(${story.heroImage})`,
        backgroundSize: "cover", backgroundPosition: "center",
        opacity, transition: "opacity 0.36s ease",
        pointerEvents: interactive ? "auto" : "none",
        cursor: interactive ? "pointer" : "default",
      }}
      onClick={interactive ? () => navigate("stories", story.slug) : undefined}
    >
      <div style={{ position: "absolute", inset: 0,
        background: `linear-gradient(160deg, ${story.accentColor}dd 0%, ${story.accentColor}99 45%, rgba(0,0,0,0.55) 100%)`,
      }} />
      <div style={{ position: "relative", zIndex: 1, padding: "20px 22px",
        height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <span style={{
            fontFamily: FONT_SANS, fontSize: 14, fontWeight: 800,
            textTransform: "uppercase", letterSpacing: "1.6px",
            color: "#ffffff", background: "transparent", border: "none", padding: 0,
          }}>{story.tag}</span>
          {interactive && (
            <div style={{ display: "flex", gap: 5 }}>
              {stories.map((_, i) => (
                <button key={i}
                  onClick={(e) => { e.stopPropagation(); setIdx(i); }}
                  style={{
                    width: i === idx ? 18 : 6, height: 6,
                    borderRadius: 100, border: "none", padding: 0, cursor: "pointer",
                    background: i === idx ? "rgba(255,255,255,0.90)" : "rgba(255,255,255,0.35)",
                    transition: "all 0.3s ease",
                  }}
                />
              ))}
            </div>
          )}
        </div>
        <div>
          <p style={{
            fontFamily: FONT_SANS, fontSize: 22, fontWeight: 900,
            color: "#ffffff", margin: "0 0 8px", lineHeight: 1.2, letterSpacing: "-0.4px",
          }}>{story.title}</p>
          {story.subtitle && (
            <p style={{
              fontFamily: FONT_SANS, fontSize: 14, fontWeight: 400,
              color: "rgba(255,255,255,0.85)", margin: "0 0 12px", lineHeight: 1.55,
            }}>{story.subtitle}</p>
          )}
          <span style={{
            fontFamily: FONT_SANS, fontSize: 13, fontWeight: 700,
            color: "#ffffff", display: "flex", alignItems: "center", gap: 4,
          }}>Read story <ArrowRight size={12} /></span>
        </div>
      </div>
    </div>
  );

  return (
    <div style={{
      position: "relative", borderRadius: 14, overflow: "hidden",
      minHeight: 340, alignSelf: "center",
      boxShadow: "6px 0 24px rgba(13,27,62,0.10), 0 4px 16px rgba(0,0,0,0.08)",
    }}>
      {prevIdx !== idx && renderLayer(stories[prevIdx], 1, false)}
      {renderLayer(stories[idx], showCurrent ? 1 : 0, true)}
    </div>
  );
}

export function NumbersSection() {
  const navigate = useAppNavigate();
  const { triggerToast } = useAppContext();
  const [factIdx, setFactIdx] = useState(0);
  const [factFading, setFactFading] = useState(false);
  const [socialIdx, setSocialIdx] = useState(0);
  const [shimmer, setShimmer] = useState(false);

  useEffect(() => {
    const t = setInterval(() => setSocialIdx((p) => (p + 1) % SOCIAL_POSTS.length), 4000);
    return () => clearInterval(t);
  }, []);

  const cycleFact = () => {
    setFactFading(true);
    setTimeout(() => {
      setFactIdx((p) => (p + 1) % FUN_FACTS.length);
      setFactFading(false);
    }, 280);
  };

  const blockEyebrow = (label: string, dark = false) => (
    <span
      style={{
        fontFamily: FONT_SANS,
        fontSize: 14,
        fontWeight: 800,
        letterSpacing: "1.6px",
        textTransform: "uppercase",
        color: dark ? "#ffffff" : "#64748b",
        display: "block",
        marginBottom: 10,
      }}
    >
      {label}
    </span>
  );

  return (
    // Radial dot grid texture on the Numbers white section
    <section
      className="section-block"
      style={{
        background: "#fafafa",
        padding: "72px 28px",
        backgroundImage: "radial-gradient(circle, rgba(51,51,153,0.09) 1.2px, transparent 1.2px)",
        backgroundSize: "20px 20px",
      }}
    >
      <div style={{ maxWidth: 1100, margin: "0 auto", position: "relative" }}>
        <div className="section-header">
          <SectionEyebrow label="By the numbers" />
          <SectionH2>
            In the <em style={{ fontStyle: "italic", color: B_INDIGO }}>Spotlight</em>
          </SectionH2>
          <div style={{ width: 48, height: 1.4, borderRadius: 2, background: B_TEAL, marginTop: 10 }} />
        </div>

        <div className="te-num-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16, alignItems: "center" }}>
          {/* Tile 1 — "Did you know?" — B_ACCENT (salmon-red) replaces old pink */}
          <div
            style={{
              borderRadius: 14,
              position: "relative",
              overflow: "hidden",
              minHeight: 340,
              background: "#F4838A",
              boxShadow: "6px 0 24px rgba(13,27,62,0.10), 0 4px 16px rgba(0,0,0,0.08)",
              alignSelf: "center",
            }}
          >
            <div
              style={{
                position: "relative",
                zIndex: 10,
                padding: "20px 28px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                height: "100%",
                minHeight: 340,
                gap: 14,
              }}
            >
              <span
                style={{
                  fontFamily: FONT_SANS,
                  fontSize: 14,
                  fontWeight: 800,
                  letterSpacing: "1.6px",
                  textTransform: "uppercase",
                  color: "#ffffff",
                  display: "block",
                  marginBottom: 10,
                }}
              >
                Did you know?
              </span>
              <p
                style={{
                  fontFamily: FONT_SANS,
                  color: "#ffffff",
                  fontSize: 19,
                  fontWeight: 600,
                  lineHeight: 1.55,
                  maxWidth: 520,
                  opacity: factFading ? 0 : 1,
                  transition: "opacity 0.28s",
                  margin: 0,
                }}
              >
                {FUN_FACTS[factIdx]}
              </p>

              <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-end" }}>
                <button
                  onClick={cycleFact}
                  title="Next fact"
                  style={{
                    width: 28,
                    height: 28,
                    borderRadius: "50%",
                    background: "rgba(255,255,255,0.18)",
                    border: "1px solid rgba(255,255,255,0.3)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                    color: "rgba(255,255,255,0.9)",
                    flexShrink: 0,
                  }}
                >
                  <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                    <path
                      d="M11 6.5A4.5 4.5 0 1 1 6.5 2c1.2 0 2.3.47 3.1 1.24"
                      stroke="currentColor"
                      strokeWidth="1.4"
                      strokeLinecap="round"
                    />
                    <polyline
                      points="9.5,1 9.5,3.5 12,3.5"
                      stroke="currentColor"
                      strokeWidth="1.4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          {/* Tile 2 — Auto-rotating impact story card */}
          <StoryRotator navigate={navigate} />

          {/* Tile 3 — Social feed */}
          <div
            style={{
              borderRadius: 14,
              background: "white",
              minHeight: 340,
              overflow: "hidden",
              position: "relative",
              boxShadow: "6px 0 24px rgba(13,27,62,0.08), 0 4px 16px rgba(0,0,0,0.04)",
              border: "1px solid #f0f0f5",
              display: "flex",
              flexDirection: "column",
              alignSelf: "center",
            }}
            onMouseEnter={() => setShimmer(true)}
            onMouseLeave={() => setShimmer(false)}
          >
            {shimmer && (
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  bottom: 0,
                  width: "40%",
                  background:
                    "linear-gradient(105deg, transparent 0%, rgba(51,51,153,0.04) 45%, rgba(51,51,153,0.06) 50%, rgba(51,51,153,0.04) 55%, transparent 100%)",
                  animation: "te-shimmer 0.6s ease-out forwards",
                  pointerEvents: "none",
                  zIndex: 5,
                }}
              />
            )}

            <div
              style={{
                padding: "16px 20px 12px",
                borderBottom: "1px solid #f0f0f5",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              {blockEyebrow("Social Feed")}
              <div style={{ display: "flex", gap: 6 }}>
                {[
                  { Icon: Facebook, c: "#1877F2" },
                  { Icon: Instagram, c: "#EC4899" },
                  { Icon: Linkedin, c: "#1D4ED8" },
                ].map(({ Icon, c }) => (
                  <div
                    key={c}
                    style={{
                      width: 24,
                      height: 24,
                      borderRadius: 6,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      background: `${c}12`,
                      cursor: "pointer",
                    }}
                  >
                    <Icon size={10} style={{ color: c }} />
                  </div>
                ))}
              </div>
            </div>

            <div style={{ flex: 1, padding: "16px 20px" }}>
              {SOCIAL_POSTS.map((post, i) => (
                <div key={i} style={{ display: i === socialIdx ? "block" : "none" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
                    <div
                      style={{
                        width: 36,
                        height: 36,
                        borderRadius: 10,
                        flexShrink: 0,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        background: `linear-gradient(135deg, ${post.iconBg}, ${post.iconBg}cc)`,
                      }}
                    >
                      <post.Icon size={13} color="white" />
                    </div>
                    <div>
                      <p
                        style={{ fontFamily: FONT_SANS, fontSize: 13, fontWeight: 800, color: ACCENT_NAVY, margin: 0 }}
                      >
                        {post.handle}
                      </p>
                      <p style={{ fontFamily: FONT_SANS, fontSize: 11, color: "#94a3b8", margin: 0 }}>
                        {post.time} · {post.platform}
                      </p>
                    </div>
                  </div>
                  <p style={{ fontFamily: FONT_SANS, fontSize: 13, color: "#475569", lineHeight: 1.6, margin: 0 }}>
                    {post.text}
                  </p>
                  <div
                    style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 12 }}
                  >
                    <span style={{ fontFamily: FONT_SANS, fontSize: 11, color: "#94a3b8" }}>❤️ {post.likes}</span>
                    <button
                      onClick={() => triggerToast("Opening social post...")}
                      style={{
                        fontFamily: FONT_SANS,
                        fontSize: 11,
                        fontWeight: 800,
                        color: B_TICKER,
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                      }}
                    >
                      View →
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div style={{ padding: "0 20px 16px" }}>
              <div style={{ display: "flex", gap: 5, justifyContent: "center", marginBottom: 10 }}>
                {SOCIAL_POSTS.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setSocialIdx(i)}
                    style={{
                      width: i === socialIdx ? 16 : 6,
                      height: 4,
                      borderRadius: 100,
                      border: "none",
                      cursor: "pointer",
                      padding: 0,
                      background: i === socialIdx ? B_TICKER : "#e2e8f0",
                      transition: "all 0.2s",
                    }}
                  />
                ))}
              </div>
              <button
                onClick={() => triggerToast("Opening social media...")}
                style={{
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 6,
                  padding: "9px 0",
                  borderRadius: 10,
                  fontFamily: FONT_SANS,
                  fontSize: 12,
                  fontWeight: 800,
                  background: B_TICKER,
                  color: "white",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                Follow @TataEngage <ArrowRight size={9} />
              </button>
            </div>
          </div>
        </div>
      </div>

    </section>
  );
}

export function JourneySection() {
  const navigate = useAppNavigate();
  const ref = useRef<HTMLElement>(null);
  const [vis, setVis] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setVis(true);
          obs.disconnect();
        }
      },
      { threshold: 0.08 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  // 5 milestones — left-to-right, slight zigzag (FY15 topmost, FY25 bottommost)
  const milestones = [
    { fy: "FY 2015", colour: "#135EA9", key: "fy2015", text: "Launched Tata Engage\nTVW & ProEngage" },
    { fy: "FY 2017", colour: "#307FE2", key: "fy2017", text: "Group volunteering\nguidelines launched" },
    { fy: "FY 2019", colour: "#00A896", key: "fy2019", text: "Best Global Volunteer\nProgram — IAVE" },
    { fy: "FY 2022", colour: "#803998", key: "fy2022", text: "1.34M hours clocked\nPhygital pivot" },
    { fy: "FY 2025", colour: "#F4838A", key: "fy2025", text: "10.87M hours\nhighest ever" },
  ];

  // All available images — will be distributed to fill every gap
  const imgs = [
    hb_jcapcpl22, // idx 0  — large 2×2 (col 1/3, row 3/5)
    hb_antarang, // idx 1  — tall 1×2 (col 1/2, row 5/7)
    hb_ihcl, // idx 2  — tall 1×2 (col 2/3, row 5/7)
    hb_tvw6, // idx 3  — large 2×2 (col 3/5, row 4/6)
    hb_roadSafety, // idx 4  — wide 2×1 (col 3/5, row 6/7)
    hb_eyeScanning, // idx 5  — small 1×1 (col 3/4, row 1/2)
    hb_images3, // idx 6  — small 1×1 (col 4/5, row 1/2)
    hb_titan, // idx 7  — large 2×2 (col 5/7, row 1/3)
    hb_voltas, // idx 8  — tall 1×2 (col 5/6, row 5/7)
    hb_volunteeringInAction, // idx 9  — tall 1×2 (col 6/7, row 5/7)
    hb_jcapcpl3, // idx 10 — large 2×2 (col 7/9, row 1/3)
    hb_2021, // idx 11 — small 1×1 (col 7/8, row 3/4)
    hb_img20230211, // idx 12 — small 1×1 (col 8/9, row 3/4)
    hb_bluescope, // idx 13 — wide 2×1 (col 7/9, row 6/7)
    hb_westside, // idx 14 — large 2×2 (col 9/11, row 1/3)
    hb_mithapur, // idx 15 — tall 1×2 (col 9/10, row 3/5)
    tataCommunications, // idx 16 — tall 1×2 (col 10/11, row 3/5)
  ];

  // Grid: 10 cols × 6 rows of 52px. Milestones placed left→right on a gentle zigzag.
  // Row 0 = top. FY15 at col 0-1 row 0-2, FY17 at col 2-3 row 1-3,
  // FY19 at col 4-5 row 2-4, FY22 at col 6-7 row 3-5, FY25 at col 8-9 row 4-6.
  const mPositions = [
    { col: "1 / 3", row: "1 / 3" },
    { col: "3 / 5", row: "2 / 4" },
    { col: "5 / 7", row: "3 / 5" },
    { col: "7 / 9", row: "4 / 6" },
    { col: "9 / 11", row: "5 / 7" },
  ];

  // Remaining cells for photos — fill column-by-column to avoid any empty cells
  // We pre-define photo placements that don't overlap with milestones
  const photoSlots: { col: string; row: string; aspect?: number }[] = [
    { col: "1 / 3", row: "3 / 5" },
    { col: "1 / 2", row: "5 / 7" },
    { col: "2 / 3", row: "5 / 7" },
    { col: "3 / 5", row: "4 / 6" },
    { col: "3 / 5", row: "6 / 7" },
    { col: "3 / 4", row: "1 / 2" },
    { col: "4 / 5", row: "1 / 2" },
    { col: "5 / 7", row: "1 / 3" },
    { col: "5 / 6", row: "5 / 7" },
    { col: "6 / 7", row: "5 / 7" },
    { col: "7 / 9", row: "1 / 3" },
    { col: "7 / 8", row: "3 / 4" },
    { col: "8 / 9", row: "3 / 4" },
    { col: "7 / 9", row: "6 / 7" },
    { col: "9 / 11", row: "1 / 3" },
    { col: "9 / 10", row: "3 / 5" },
    { col: "10 / 11", row: "3 / 5" },
  ];

  return (
    <section
      ref={ref}
      className="section-block"
      style={{
        background: "#e8e9ee",
        backgroundImage: "radial-gradient(circle, rgba(0,0,0,0.18) 1px, transparent 1px)",
        backgroundSize: "18px 18px",
        padding: "32px 48px",
      }}
    >
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        {/* Header */}
        <div style={{ marginBottom: 14 }}>
          <SectionEyebrow label="Our Journey" />
          <SectionH2>
            A <em style={{ fontStyle: "italic", color: B_INDIGO }}>Decade</em> of Giving Back
          </SectionH2>
          <div style={{ width: 36, height: 1.2, background: B_INDIGO, marginTop: 6 }} />
        </div>

        {/* Grid — 10 cols × 6 rows, each 52px tall, 4px gap. Scrolls on mobile. */}
        <div style={{ overflowX: "auto", margin: "0 -12px", padding: "0 12px" }}>
          <div
            className="te-journey-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(10, minmax(56px, 1fr))",
              gridTemplateRows: "repeat(6, 52px)",
              gap: 4,
              minWidth: 720,
            }}
          >
          {/* Photos */}
          {photoSlots.map((slot, i) => (
            <div
              key={"ph" + i}
              style={{
                gridColumn: slot.col,
                gridRow: slot.row,
                borderRadius: 5,
                overflow: "hidden",
                opacity: vis ? 1 : 0,
                transition: `opacity 0.25s ease ${i * 0.015}s`,
              }}
            >
              <img src={imgs[i % imgs.length]} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            </div>
          ))}

          {/* Milestone tiles — left→right zigzag */}
          {milestones.map((m, i) => (
            <div
              key={"ms" + i}
              onClick={() => {
                navigate("journey");
                setTimeout(() => document.getElementById(m.key)?.scrollIntoView({ behavior: "smooth" }), 120);
              }}
              style={{
                gridColumn: mPositions[i].col,
                gridRow: mPositions[i].row,
                background: m.colour,
                borderRadius: 5,
                padding: "8px 10px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                textAlign: "center",
                opacity: vis ? 1 : 0,
                transition: `opacity 0.3s ease ${i * 0.07}s`,
                cursor: "pointer",
              }}
            >
              <div
                style={{
                  fontFamily: FONT_SANS,
                  fontSize: 14,
                  fontWeight: 800,
                  letterSpacing: "1.8px",
                  textTransform: "uppercase",
                  color: "rgba(255,255,255,0.8)",
                  marginBottom: 3,
                }}
              >
                {m.fy}
              </div>
              <div
                style={{
                  fontFamily: FONT_SANS,
                  fontSize: 14,
                  lineHeight: 1.35,
                  color: "#fff",
                  whiteSpace: "pre-line",
                  fontWeight: 700,
                  letterSpacing: "0.5px",
                }}
              >
                {m.text}
              </div>
            </div>
          ))}
          </div>
        </div>

        {/* CTA */}
        <div style={{ marginTop: 8, display: "flex", justifyContent: "flex-end" }}>
          <button
            onClick={() => navigate("journey")}
            style={{
              fontSize: 12,
              fontWeight: 700,
              background: "none",
              border: "none",
              color: "#333399",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: 4,
            }}
          >
            Learn More <ArrowRight size={12} />
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
    <div
      style={{
        ...(fixed ? { position: "fixed", bottom: 0, left: 0, right: 0, zIndex: 50 } : {}),
        padding: "10px 0",
        overflow: "hidden",
        background: B_TICKER,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
        <div style={{ flexShrink: 0, paddingLeft: 24 }}>
          <span
            style={{
              fontFamily: FONT_SANS,
              fontSize: 11,
              fontWeight: 900,
              background: B_YELLOW,
              color: ACCENT_NAVY,
              padding: "3px 12px",
              borderRadius: 100,
              whiteSpace: "nowrap",
            }}
          >
            🔴 LIVE
          </span>
        </div>
        <div style={{ flex: 1, overflow: "hidden" }}>
          <div className="te-marquee">
            {tickerDouble.map((item, i) => (
              <span
                key={i}
                style={{
                  fontFamily: FONT_SANS,
                  fontSize: 13,
                  color: "rgba(255,255,255,1)",
                  flexShrink: 0,
                  cursor: "pointer",
                  transition: "color 0.15s",
                }}
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

  const scrollDown = () => document.getElementById(scrollTargetId)?.scrollIntoView({ behavior: "smooth" });

  return (
    <>
      <style>{GLOBAL_STYLES}</style>
      <div
        style={{
          position: "relative",
          overflow: "hidden",
          height: "100vh",
          minHeight: 600,
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
        }}
      >
        <div
          ref={imgRef}
          style={{
            position: "absolute",
            top: "-20%",
            left: 0,
            right: 0,
            bottom: "-20%",
            backgroundImage: `url(${tataElxsiImg})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            willChange: "transform",
          }}
        />

        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(155deg, rgba(8,12,22,0.74) 0%, rgba(8,12,22,0.50) 100%)",
          }}
        />

        <img
          src={doodleCluster4}
          alt=""
          style={{
            position: "absolute",
            top: 40,
            right: -60,
            width: 280,
            opacity: 0.06,
            pointerEvents: "none",
            userSelect: "none",
            transform: "rotate(-10deg)",
          }}
        />

        <div style={{ position: "relative", zIndex: 10, padding: "0 64px", maxWidth: 760 }}>
          <p
            style={{
              fontFamily: FONT_SANS,
              fontSize: 11,
              fontWeight: 800,
              letterSpacing: "2.5px",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.5)",
              margin: 0,
            }}
          >
            {eyebrow}
          </p>
          <DefinerUnderline colour={B_TEAL} width={60} />

          <h1
            style={{
              fontFamily: FONT_SANS,
              fontSize: 52,
              lineHeight: 1.1,
              letterSpacing: "-0.5px",
              color: "white",
              margin: "18px 0 20px",
            }}
          >
            {title}
          </h1>

          <p
            style={{
              fontFamily: FONT_SANS,
              fontSize: 16,
              lineHeight: 1.7,
              fontWeight: 300,
              color: "rgba(255,255,255,0.65)",
              maxWidth: 520,
              margin: 0,
            }}
          >
            {description}
          </p>
        </div>

        <button
          onClick={scrollDown}
          style={{
            position: "absolute",
            bottom: 40,
            left: "50%",
            transform: "translateX(-50%)",
            background: "none",
            border: "none",
            cursor: "pointer",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 2,
            padding: 8,
            zIndex: 10,
          }}
          aria-label="Scroll down"
        >
          <ChevronDown size={22} color="#ffffff" className="te-bob-1" />
          <ChevronDown size={22} color="#ffffff" className="te-bob-2" />
          <ChevronDown size={22} color="#ffffff" className="te-bob-3" />
        </button>
      </div>
    </>
  );
}
