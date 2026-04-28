import { useRef, useState, useEffect } from "react";
import { useAppNavigate } from "@/hooks/useAppNavigate";
import SubPageDotRail from "@/components/shared/SubPageDotRail";
import aboutHeroImg from "@/assets/banner_photos/About Tata Engage Banner.jpg";
import jamsetjiImg  from "@/assets/banner_photos/About Tata Engage below the banner.png";

// ── Tokens ────────────────────────────────────────────────────────────────────
const ACCENT      = "#4376BB";
const ACCENT_DARK = "#2D5494";
const NAVY        = "#0D1B3E";
// Programme colours — match HomeSections PROG_CONFIG exactly
const TVW_C = "#3B7ABD";
const PE_C  = "#803998";
const DR_C  = "#13BBB4";

const FONT = "'DM Sans', 'Noto Sans', ui-sans-serif, system-ui, sans-serif";

const DIAG: React.CSSProperties = {
  position: "absolute", inset: 0,
  backgroundImage: "repeating-linear-gradient(45deg,rgba(255,255,255,0.03) 1px,transparent 1px)",
  backgroundSize: "28px 28px",
  pointerEvents: "none",
};

const SECTIONS = [
  { id: "about-hero",       label: "Overview"    },
  { id: "about-legacy",     label: "Legacy"      },
  { id: "about-what",       label: "Tata Engage" },
  { id: "about-impact",     label: "Impact"      },
  { id: "about-programmes", label: "Programmes"  },
];

// ── Atoms ─────────────────────────────────────────────────────────────────────
function Eyebrow({ text, light = false }: { text: string; light?: boolean }) {
  return (
    <p style={{
      fontFamily: FONT, fontSize: 14, fontWeight: 700,
      letterSpacing: "1.8px", textTransform: "uppercase",
      color: light ? "rgba(255,255,255,0.7)" : ACCENT,
      margin: "0 0 10px",
    }}>
      {text}
    </p>
  );
}

function SectionH2({ children, light = false }: { children: React.ReactNode; light?: boolean }) {
  return (
    <h2 style={{
      fontFamily: FONT, fontSize: 30, fontWeight: 900,
      color: light ? "#fff" : NAVY, letterSpacing: "-0.5px",
      margin: 0, lineHeight: 1.15,
    }}>
      {children}
    </h2>
  );
}

function DefinerBar({ light = false }: { light?: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const [on, setOn] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setOn(true); }, { threshold: 0.4 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return (
    <div ref={ref} style={{ height: 2, background: light ? "rgba(255,255,255,0.2)" : "#e8e8f0", borderRadius: 2, overflow: "hidden", width: 48, marginTop: 10 }}>
      <div style={{ height: "100%", background: light ? "rgba(255,255,255,0.8)" : ACCENT, borderRadius: 2, transition: "width 0.65s cubic-bezier(0.22,1,0.36,1)", width: on ? "100%" : "0%" }} />
    </div>
  );
}

// ── Hero ──────────────────────────────────────────────────────────────────────
function Hero() {
  return (
    <div id="about-hero" style={{ position: "relative", minHeight: "92vh", display: "flex", alignItems: "center", overflow: "hidden", paddingTop: 64 }}>
      <img src={aboutHeroImg} alt="" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "center" }} />
      <div style={{ position: "absolute", inset: 0, background: `linear-gradient(110deg, ${ACCENT}e8 0%, ${ACCENT}cc 38%, ${ACCENT}aa 58%, ${ACCENT}77 78%, ${ACCENT}44 100%)` }} />
      <div style={{ position: "relative", zIndex: 1, maxWidth: 1100, margin: "0 auto", padding: "0 64px", width: "100%" }}>
        <p style={{ fontFamily: FONT, fontSize: 14, fontWeight: 700, letterSpacing: "1.8px", textTransform: "uppercase", color: "#ffffff", margin: "0 0 12px" }}>
          Tata Sustainability Group · Est. 2014
        </p>
        <div style={{ height: 2, width: 48, borderRadius: 2, background: "rgba(255,255,255,0.6)", margin: "12px 0 22px" }} />
        <h1 style={{ fontFamily: FONT, fontSize: "clamp(2.4rem,5vw,3.8rem)", fontWeight: 400, color: "#fff", lineHeight: 1.12, letterSpacing: "-0.5px", margin: "0 0 18px", maxWidth: 640 }}>
          About Tata Engage
        </h1>
        <p style={{ fontFamily: FONT, fontSize: 16, fontWeight: 300, lineHeight: 1.7, color: "rgba(255,255,255,0.65)", maxWidth: 520, margin: 0 }}>
          The Tata Group's volunteering platform — designed to inspire, enable, and amplify employee engagement with communities and the environment.
        </p>
      </div>
    </div>
  );
}

// ── Legacy ────────────────────────────────────────────────────────────────────
function LegacySection() {
  return (
    <section id="about-legacy" style={{ padding: "96px 56px", background: "#fff" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 72, alignItems: "center" }}>

        <div>
          <Eyebrow text="Our Legacy of Giving" />
          <SectionH2>Business exists to serve society</SectionH2>
          <DefinerBar />
          <p style={{ fontFamily: FONT, fontSize: 15, color: "#475569", lineHeight: 1.85, marginTop: 24, marginBottom: 16 }}>
            Jamsetji Tata believed that business exists to serve society. That belief—rooted in selfless giving and constructive philanthropy—continues to guide the Tata Group today.
          </p>
          <p style={{ fontFamily: FONT, fontSize: 15, color: "#475569", lineHeight: 1.85 }}>
            Across diverse companies and geographies, Tata employees are united by shared values and a deep commitment to giving back. One of the ways this legacy comes to life today is through our collective volunteering efforts.
          </p>
        </div>

        {/* Founder card — accent coloured, photo at top */}
        <div style={{ background: ACCENT, borderRadius: 20, overflow: "hidden", position: "relative" }}>
          <div style={DIAG} />
          <div style={{ width: "100%", height: 260, overflow: "hidden", position: "relative" }}>
            <img
              src={jamsetjiImg}
              alt="Jamsetji Tata"
              style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 10%", display: "block" }}
            />
            <div style={{ position: "absolute", inset: 0, background: `linear-gradient(to bottom, transparent 50%, ${ACCENT} 100%)` }} />
          </div>
          <div style={{ padding: "20px 32px 36px", position: "relative", zIndex: 1 }}>
            <div style={{ fontSize: 48, lineHeight: 0.7, color: "rgba(255,255,255,0.2)", fontFamily: "Georgia,serif", marginBottom: 16 }}>"</div>
            <p style={{ fontFamily: FONT, fontSize: 17, fontStyle: "italic", fontWeight: 300, color: "rgba(255,255,255,0.92)", lineHeight: 1.75, margin: "0 0 24px" }}>
              In a free enterprise, the community is not just another stakeholder in business, but is in fact the very purpose of its existence.
            </p>
            <div style={{ borderTop: "1px solid rgba(255,255,255,0.25)", paddingTop: 16 }}>
              <div style={{ fontFamily: FONT, fontSize: 15, fontWeight: 800, color: "#fff" }}>Jamsetji Tata</div>
              <div style={{ fontFamily: FONT, fontSize: 11, color: "rgba(255,255,255,0.6)", marginTop: 4, letterSpacing: "0.5px" }}>Founder · Tata Group</div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}

// ── What Is Tata Engage ───────────────────────────────────────────────────────
function WhatSection() {
  const navigate = useAppNavigate();
  return (
    <section id="about-what" style={{ background: "#F4F8F7", padding: "96px 56px" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <Eyebrow text="What Is Tata Engage?" />
        <SectionH2>The Tata Group's volunteering platform</SectionH2>
        <DefinerBar />
        <p style={{ fontFamily: FONT, fontSize: 15, color: "#475569", lineHeight: 1.85, marginTop: 24, maxWidth: 760 }}>
          Tata Engage is the Tata Group's volunteering platform—designed to inspire, enable, and amplify employee engagement with communities and the environment.
        </p>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1.4fr", gap: 20, marginTop: 40 }}>

          {/* Vision — accent box */}
          <div style={{ background: ACCENT, borderRadius: 18, padding: "32px", position: "relative", overflow: "hidden" }}>
            <div style={DIAG} />
            <div style={{ position: "relative", zIndex: 1 }}>
              <p style={{ fontFamily: FONT, fontSize: 14, fontWeight: 700, letterSpacing: "1.8px", textTransform: "uppercase", color: "rgba(255,255,255,0.75)", marginBottom: 14 }}>
                Our Vision
              </p>
              <p style={{ fontFamily: FONT, fontSize: 17, fontStyle: "italic", fontWeight: 300, color: "#fff", lineHeight: 1.72 }}>
                To inspire Tata volunteers around the world to engage with communities by contributing their time and skills.
              </p>
            </div>
          </div>

          {/* Purpose — white box */}
          <div style={{ background: "#fff", border: "1px solid #e8eef0", borderRadius: 18, padding: "32px" }}>
            <p style={{ fontFamily: FONT, fontSize: 14, fontWeight: 700, letterSpacing: "1.8px", textTransform: "uppercase", color: ACCENT_DARK, marginBottom: 14 }}>
              Our Purpose
            </p>
            <p style={{ fontFamily: FONT, fontSize: 14.5, color: "#475569", lineHeight: 1.78, margin: 0 }}>
              Tata Engage brings together Tata employees, their families, and retired colleagues, and enables them to contribute their time, skills, and experience to address pressing social and environmental challenges, while strengthening communities and fostering social cohesion.
            </p>
          </div>
        </div>

        {/* Register CTA */}
        <div style={{ marginTop: 20, background: "#1E6BB8", borderRadius: 16, padding: "28px 32px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 24, position: "relative", overflow: "hidden" }}>
          <div style={DIAG} />
          <div style={{ position: "relative", zIndex: 1 }}>
            <div style={{ fontFamily: FONT, fontSize: 14, fontWeight: 700, letterSpacing: "1.8px", textTransform: "uppercase", color: "#ffffff", marginBottom: 8 }}>
              Register to Volunteer
            </div>
            <div style={{ fontFamily: FONT, fontSize: 17, fontStyle: "italic", fontWeight: 300, color: "rgba(255,255,255,0.85)" }}>
              Be part of the Tata legacy of giving.
            </div>
          </div>
          <button
            onClick={() => navigate("register-role")}
            style={{ position: "relative", zIndex: 1, background: "#F5A623", color: "#0D1B3E", border: "none", borderRadius: 10, padding: "12px 24px", fontFamily: FONT, fontWeight: 800, fontSize: 14, cursor: "pointer", whiteSpace: "nowrap", flexShrink: 0 }}
          >
            Register Now on Tata Engage →
          </button>
        </div>
      </div>
    </section>
  );
}

// ── How Tata Engage Creates Impact ────────────────────────────────────────────
function ImpactSection() {
  const features = [
    { label: "Bringing people together",         desc: "Employees, families, and retired Tata colleagues united by a shared purpose.",                                colour: TVW_C      },
    { label: "Connecting volunteers to causes",   desc: "Matching individual interests and skills with credible, impact-driven non-profits.",                         colour: PE_C       },
    { label: "Enabling skill-based volunteering", desc: "Encouraging not just time, but professional expertise.",                                                     colour: DR_C       },
    { label: "Curating flexible opportunities",   desc: "From one-hour experiences to six-month project engagements.",                                               colour: ACCENT     },
    { label: "Designing meaningful programmes",   desc: "Creating value for communities while supporting volunteers' personal and professional growth.",               colour: ACCENT_DARK },
  ];

  return (
    <section id="about-impact" style={{ padding: "96px 56px", background: "#fff" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <Eyebrow text="How Tata Engage Creates Impact" />
        <SectionH2>Five ways we create impact</SectionH2>
        <DefinerBar />

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginTop: 44 }}>
          {features.map((f, i) => {
            const isLastOdd = i === features.length - 1 && features.length % 2 === 1;
            return (
              <div
                key={f.label}
                style={{
                  ...(isLastOdd ? { gridColumn: "1 / -1" } : {}),
                  background: f.colour,
                  borderRadius: 16,
                  padding: "28px 32px",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                <div style={DIAG} />
                <div style={{ position: "relative", zIndex: 1 }}>
                  <div style={{ fontFamily: FONT, fontSize: 16, fontWeight: 800, color: "#fff", marginBottom: 8 }}>{f.label}</div>
                  <div style={{ fontFamily: FONT, fontSize: 14, color: "rgba(255,255,255,0.85)", lineHeight: 1.72 }}>{f.desc}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ── Programmes ────────────────────────────────────────────────────────────────
function ProgrammesSection() {
  const navigate = useAppNavigate();
  const progs = [
    {
      name: "Tata Volunteering Week",
      tag: "Bi-annual · Global",
      desc: "Held twice every year — commencing 3 March and 5 September — TVW unites the Tata family through half-day group volunteering activities. Each edition runs over a four-week period.",
      colour: TVW_C,
      route: "about-tvw",
    },
    {
      name: "ProEngage",
      tag: "Skill-based · Year-round",
      desc: "The Tata Group's flagship part-time, skill-based volunteering programme. Projects announced twice a year (15 June and 5 December) and run for 1 to 6 months.",
      colour: PE_C,
      route: "about-proengage",
    },
    {
      name: "Disaster Response",
      tag: "Rapid Action",
      desc: "Volunteers mobilised rapidly when communities face crisis — working as Project Managers, Procurement Officers, or Core Volunteers under the One Tata Response framework.",
      colour: DR_C,
      route: "disaster-response",
    },
  ];

  return (
    <section id="about-programmes" style={{ padding: "96px 56px", background: "#F4F8F7" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <Eyebrow text="Our Programmes" />
        <SectionH2>Three ways to volunteer</SectionH2>
        <DefinerBar />

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 20, marginTop: 44 }}>
          {progs.map(p => (
            <div
              key={p.name}
              style={{ borderRadius: 18, overflow: "hidden", background: p.colour, color: "#fff", display: "flex", flexDirection: "column", position: "relative", transition: "transform 0.2s, box-shadow 0.2s" }}
              onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.transform = "translateY(-3px)"; (e.currentTarget as HTMLDivElement).style.boxShadow = `0 14px 32px ${p.colour}55`; }}
              onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.transform = "none"; (e.currentTarget as HTMLDivElement).style.boxShadow = "none"; }}
            >
              <div style={{ position: "absolute", inset: 0, backgroundImage: "repeating-linear-gradient(135deg,rgba(255,255,255,0.05) 0 2px,transparent 2px 14px)", pointerEvents: "none" }} />
              <div style={{ padding: "28px 28px 18px", position: "relative" }}>
                <div style={{ height: 3, background: "rgba(255,255,255,0.85)", borderRadius: 2, width: 32, marginBottom: 16 }} />
                <div style={{ fontFamily: FONT, fontSize: 10, fontWeight: 700, letterSpacing: "1.5px", textTransform: "uppercase", color: "rgba(255,255,255,0.85)", marginBottom: 8 }}>{p.tag}</div>
                <div style={{ fontFamily: FONT, fontSize: 20, fontWeight: 900, color: "#fff", letterSpacing: "-0.3px" }}>{p.name}</div>
              </div>
              <div style={{ padding: "8px 28px 28px", position: "relative", flex: 1, display: "flex", flexDirection: "column" }}>
                <p style={{ fontFamily: FONT, fontSize: 14, color: "rgba(255,255,255,0.92)", lineHeight: 1.7, marginBottom: 20, flex: 1 }}>{p.desc}</p>
                <button
                  onClick={() => navigate(p.route)}
                  style={{ background: "#fff", border: "none", borderRadius: 8, padding: "10px 20px", fontFamily: FONT, fontSize: 13, fontWeight: 800, color: p.colour, cursor: "pointer", alignSelf: "flex-start" }}
                >
                  Learn more →
                </button>
              </div>
            </div>
          ))}
        </div>

        <div style={{ marginTop: 20, background: "#fff", border: "1px solid #e8eef0", borderRadius: 16, padding: "24px 32px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 24 }}>
          <div>
            <div style={{ fontFamily: FONT, fontSize: 15, fontWeight: 800, color: NAVY, marginBottom: 4 }}>Are you an NGO?</div>
            <div style={{ fontFamily: FONT, fontSize: 14, color: "#64748B" }}>Partner with us to access skilled Tata volunteers for your projects.</div>
          </div>
          <button
            onClick={() => navigate("partner")}
            style={{ background: "#F5A623", color: "#0D1B3E", border: "none", borderRadius: 10, padding: "11px 24px", fontFamily: FONT, fontWeight: 800, fontSize: 14, cursor: "pointer", whiteSpace: "nowrap", flexShrink: 0 }}
          >
            Partner with us →
          </button>
        </div>
      </div>
    </section>
  );
}

// ── Main ──────────────────────────────────────────────────────────────────────
export default function AboutView() {
  return (
    <div style={{ background: "transparent", minHeight: "100vh", fontFamily: FONT, paddingTop: 64 }}>
      <SubPageDotRail sections={SECTIONS} accentColour={ACCENT} />
      <Hero />
      <LegacySection />
      <WhatSection />
      <ImpactSection />
      <ProgrammesSection />
    </div>
  );
}
