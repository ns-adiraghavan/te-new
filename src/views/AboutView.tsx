import { useRef, useState, useEffect } from "react";
import { useAppNavigate } from "@/hooks/useAppNavigate";
import SubPageDotRail from "@/components/shared/SubPageDotRail";

// ── Colour tokens ─────────────────────────────────────────────────────────────
const ACCENT      = "#4376BB";   // About blue
const ACCENT_DARK = "#2D5494";
const ACCENT_LIGHT= "#EBF1FB";
const NAVY        = "#0D1B3E";
const TVW_C       = "#333399";
const PE_C        = "#4D7A2A";
const DR_C        = "#007A8A";
const MUSTARD     = "#C8940A";

const DIAG: React.CSSProperties = {
  position: "absolute", inset: 0,
  backgroundImage: "repeating-linear-gradient(45deg,rgba(255,255,255,0.03) 1px,transparent 1px)",
  backgroundSize: "28px 28px",
  pointerEvents: "none",
};

const SECTIONS = [
  { id: "about-hero",       label: "Overview"     },
  { id: "about-vision",     label: "Vision"        },
  { id: "about-what",       label: "What we do"   },
  { id: "about-programmes", label: "Programmes"   },
];

// ── Atoms ─────────────────────────────────────────────────────────────────────
function Eyebrow({ text, dark = false }: { text: string; dark?: boolean }) {
  return (
    <p style={{
      fontFamily: "'DM Mono',monospace",
      fontSize: 11, fontWeight: 600, letterSpacing: "1.8px",
      textTransform: "uppercase",
      color: dark ? "rgba(255,255,255,0.5)" : ACCENT + "cc",
      marginBottom: 10,
    }}>
      {text}
    </p>
  );
}

function DefinerBar({ colour = ACCENT, light = false }: { colour?: string; light?: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const [on, setOn] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setOn(true); }, { threshold: 0.4 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return (
    <div ref={ref} style={{ height: 3, background: light ? "rgba(255,255,255,0.2)" : "#e8e8f0", borderRadius: 2, overflow: "hidden", width: 48, marginTop: 10 }}>
      <div style={{ height: "100%", background: light ? "rgba(255,255,255,0.7)" : colour, borderRadius: 2, transition: "width 0.65s cubic-bezier(0.22,1,0.36,1)", width: on ? "100%" : "0%" }} />
    </div>
  );
}

// ── Hero ──────────────────────────────────────────────────────────────────────
function Hero() {
  const navigate = useAppNavigate();

  const boxes = [
    {
      label: "Our Vision",
      body: "To inspire Tata volunteers around the world to engage with communities by contributing their time and skills.",
      bg: ACCENT, text: "#fff",
      action: () => document.getElementById("about-vision")?.scrollIntoView({ behavior: "smooth" }),
      cta: "Read more ↓",
    },
    {
      label: "Our Programmes",
      body: "From TVW to ProEngage to Disaster Response — three ways to give back, suited to every schedule.",
      bg: "#fff", text: NAVY,
      action: () => document.getElementById("about-programmes")?.scrollIntoView({ behavior: "smooth" }),
      cta: "Explore ↓",
    },
    {
      label: "GCSO Message",
      body: "A letter from Chacko Thomas, Group Chief Sustainability Officer, Tata Sons.",
      bg: NAVY, text: "#fff",
      action: () => navigate("about-gcso"),
      cta: "Read letter →",
    },
    {
      label: "Meet the Team",
      body: "The Social Services Cluster at Tata Sustainability Group — the people behind Tata Engage.",
      bg: ACCENT_LIGHT, text: NAVY,
      action: () => navigate("about-team"),
      cta: "Meet us →",
    },
  ];

  return (
    <div id="about-hero" style={{ position: "relative", overflow: "hidden" }}>
      {/* Dark full-bleed header */}
      <div style={{ position: "relative", background: NAVY, padding: "120px 56px 80px", overflow: "hidden" }}>
        <div style={DIAG} />
        {/* Radial glow */}
        <div style={{ position: "absolute", top: -100, right: -80, width: 500, height: 500, background: `radial-gradient(circle,${ACCENT}55 0%,transparent 68%)`, pointerEvents: "none" }} />

        <div style={{ position: "relative", zIndex: 1, maxWidth: 1100, margin: "0 auto" }}>
          <p style={{ fontFamily: "'DM Mono',monospace", fontSize: 10, fontWeight: 600, letterSpacing: "2.5px", textTransform: "uppercase", color: "rgba(255,255,255,0.4)", marginBottom: 18 }}>
            Tata Sustainability Group · Est. 2014
          </p>
          <div style={{ width: 40, height: 3, background: ACCENT, borderRadius: 2, marginBottom: 24 }} />
          <h1 style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "clamp(2.6rem,5vw,3.8rem)", fontWeight: 900, color: "#fff", lineHeight: 1.06, letterSpacing: "-2px", margin: "0 0 22px", maxWidth: 640 }}>
            About Tata Engage
          </h1>
          <p style={{ fontSize: 16, fontWeight: 300, lineHeight: 1.82, color: "rgba(255,255,255,0.68)", maxWidth: 520 }}>
            Institutionalising the spirit of giving across the Tata Group — connecting volunteers, NGO partners, and communities across India and the world.
          </p>
        </div>
      </div>

      {/* Coloured boxes strip — overlaps hero bottom */}
      <div style={{ background: "#f5f5fa", padding: "0 56px 64px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 0, borderRadius: 18, overflow: "hidden", boxShadow: "0 12px 48px rgba(13,27,62,0.18)", marginTop: -40, position: "relative", zIndex: 2 }}>
            {boxes.map((b, i) => (
              <div
                key={b.label}
                style={{ background: b.bg, padding: "32px 28px", display: "flex", flexDirection: "column", justifyContent: "space-between", minHeight: 200, borderRight: i < boxes.length - 1 ? "1px solid rgba(255,255,255,0.12)" : "none", cursor: "pointer", transition: "filter 0.2s" }}
                onClick={b.action}
                onMouseEnter={e => (e.currentTarget as HTMLDivElement).style.filter = "brightness(0.93)"}
                onMouseLeave={e => (e.currentTarget as HTMLDivElement).style.filter = "none"}
              >
                <div>
                  <p style={{ fontFamily: "'DM Mono',monospace", fontSize: 10, fontWeight: 700, letterSpacing: "1.5px", textTransform: "uppercase", color: b.text === "#fff" ? "rgba(255,255,255,0.45)" : ACCENT + "aa", marginBottom: 12 }}>
                    {b.label}
                  </p>
                  <p style={{ fontSize: 13.5, lineHeight: 1.72, color: b.text === "#fff" ? "rgba(255,255,255,0.78)" : "#475569" }}>
                    {b.body}
                  </p>
                </div>
                <span style={{ fontSize: 12, fontWeight: 700, color: b.text === "#fff" ? "rgba(255,255,255,0.6)" : ACCENT, marginTop: 20, display: "block" }}>
                  {b.cta}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Vision ────────────────────────────────────────────────────────────────────
function VisionSection() {
  return (
    <section id="about-vision" style={{ padding: "96px 56px", background: "#fff" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 72, alignItems: "start" }}>
        <div>
          <Eyebrow text="Why Tata Engage exists" />
          <h2 style={{ fontSize: 30, fontWeight: 900, color: NAVY, letterSpacing: "-0.5px" }}>
            Institutionalising the spirit of giving
          </h2>
          <DefinerBar />
          <p style={{ fontSize: 15, color: "#475569", lineHeight: 1.85, marginTop: 24, marginBottom: 16 }}>
            Jamsetji Tata believed that business exists to serve society. That belief — rooted in selfless giving and constructive philanthropy — continues to guide the Tata Group today. Across diverse companies and geographies, Tata employees are united by shared values and a deep commitment to giving back. One of the ways this legacy comes to life today is through our collective volunteering efforts.
          </p>
          <p style={{ fontSize: 15, color: "#475569", lineHeight: 1.85, marginBottom: 28 }}>
            Tata Engage is the Tata Group's volunteering platform — designed to inspire, enable, and amplify employee engagement with communities and the environment. It brings together Tata employees, their families, and retired colleagues, enabling them to contribute their time, skills, and experience to address pressing social and environmental challenges, while strengthening communities and fostering social cohesion.
          </p>
          <div style={{ background: "#f5f5fa", border: `1px solid ${ACCENT}30`, borderLeft: `4px solid ${ACCENT}`, borderRadius: "0 10px 10px 0", padding: "18px 22px" }}>
            <p style={{ fontFamily: "'Playfair Display',Georgia,serif", fontSize: 14, fontStyle: "italic", color: NAVY, marginBottom: 10 }}>Be part of the Tata legacy of giving.</p>
            <button style={{ background: ACCENT, color: "#fff", border: "none", borderRadius: 8, padding: "9px 20px", fontSize: 13, fontWeight: 800, cursor: "pointer" }}>
              Register Now on Tata Engage →
            </button>
          </div>
        </div>

        {/* Vision card */}
        <div style={{ background: ACCENT_DARK, borderRadius: 20, padding: "40px", position: "relative", overflow: "hidden" }}>
          <div style={DIAG} />
          <div style={{ position: "relative", zIndex: 1 }}>
            <p style={{ fontFamily: "'DM Mono',monospace", fontSize: 10, fontWeight: 700, letterSpacing: "1.5px", textTransform: "uppercase", color: "rgba(255,255,255,0.35)", margin: "0 0 20px" }}>
              TE Vision
            </p>
            <div style={{ fontSize: 56, lineHeight: 0.7, color: "rgba(255,255,255,0.15)", fontFamily: "Georgia,serif", marginBottom: 18 }}>"</div>
            <p style={{ fontFamily: "'Playfair Display',Georgia,serif", fontSize: 19, fontStyle: "italic", color: "rgba(255,255,255,0.92)", lineHeight: 1.75, margin: "0 0 32px" }}>
              To inspire Tata volunteers around the world to engage with communities by contributing their time and skills.
            </p>
            <div style={{ display: "flex", gap: 28 }}>
              {[{ num: "2014", label: "Platform launched" }, { num: "100+", label: "Companies reached" }].map(s => (
                <div key={s.label}>
                  <div style={{ fontSize: 22, fontWeight: 900, color: "#fff" }}>{s.num}</div>
                  <div style={{ fontFamily: "'DM Mono',monospace", fontSize: 11, color: "rgba(255,255,255,0.4)", marginTop: 4 }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── What we do ────────────────────────────────────────────────────────────────
function WhatSection() {
  const features = [
    { label: "Bringing people together",     desc: "Not only Tata employees, but their families and retired Tata employees — one unified volunteer community.", colour: TVW_C },
    { label: "Connecting volunteers to causes", desc: "Matching individual interests and skills with credible, impact-driven nonprofits.", colour: PE_C },
    { label: "Enabling skill-based volunteering", desc: "Encouraging not just time, but professional expertise to create a greater difference.", colour: DR_C },
    { label: "Curating flexible opportunities", desc: "Ranging from a one-hour experiential activity to a six-month professional project.", colour: MUSTARD },
    { label: "Designing meaningful programmes", desc: "Creating value for communities while supporting volunteers' personal and professional growth.", colour: ACCENT },
  ];

  return (
    <section id="about-what" style={{ background: "#F4F8F7", padding: "96px 56px" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ marginBottom: 52 }}>
          <Eyebrow text="What Tata Engage does" />
          <h2 style={{ fontSize: 30, fontWeight: 900, color: NAVY, letterSpacing: "-0.5px" }}>Five ways we create impact</h2>
          <DefinerBar />
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
          {features.slice(0, 4).map(f => (
            <div key={f.label}
              style={{ background: "#fff", borderRadius: 16, padding: "28px", border: "1px solid #e8eef0", borderLeft: `4px solid ${f.colour}`, display: "flex", gap: 20, alignItems: "flex-start", transition: "transform 0.2s,box-shadow 0.2s" }}
              onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.transform = "translateY(-2px)"; (e.currentTarget as HTMLDivElement).style.boxShadow = "0 8px 24px rgba(0,0,0,0.07)"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.transform = "none"; (e.currentTarget as HTMLDivElement).style.boxShadow = "none"; }}
            >
              <div style={{ width: 10, height: 10, borderRadius: "50%", background: f.colour, flexShrink: 0, marginTop: 6 }} />
              <div>
                <div style={{ fontSize: 16, fontWeight: 800, color: NAVY, marginBottom: 8 }}>{f.label}</div>
                <div style={{ fontSize: 14, color: "#64748B", lineHeight: 1.72 }}>{f.desc}</div>
              </div>
            </div>
          ))}
          {/* 5th — full-width dark */}
          <div style={{ gridColumn: "1 / -1", background: ACCENT_DARK, borderRadius: 16, padding: "28px 32px", display: "flex", gap: 20, alignItems: "center" }}>
            <div style={{ width: 10, height: 10, borderRadius: "50%", background: MUSTARD, flexShrink: 0 }} />
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 16, fontWeight: 800, color: "#fff", marginBottom: 6 }}>{features[4].label}</div>
              <div style={{ fontSize: 14, color: "rgba(255,255,255,0.65)", lineHeight: 1.72, maxWidth: 600 }}>{features[4].desc}</div>
            </div>
            <button style={{ background: MUSTARD, color: "#fff", border: "none", borderRadius: 10, padding: "11px 24px", fontWeight: 800, fontSize: 14, cursor: "pointer", whiteSpace: "nowrap", flexShrink: 0 }}>
              Volunteer now →
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Programmes ────────────────────────────────────────────────────────────────
function ProgrammesSection() {
  const navigate = useAppNavigate();
  const progs = [
    { name: "Tata Volunteering Week", tag: "Bi-annual · Global", desc: "Held twice every year — commencing 3 March and 5 September — TVW unites the Tata family through half-day group volunteering activities. Each edition runs over a four-week period.", colour: TVW_C, light: "#EEF0FF", route: "about-tvw" },
    { name: "ProEngage", tag: "Skill-based · Year-round", desc: "The Tata Group's flagship part-time, skill-based volunteering programme. Projects announced twice a year (15 June and 5 December) and run for 1 to 6 months.", colour: PE_C, light: "#EDF5E8", route: "about-proengage" },
    { name: "Disaster Response", tag: "Rapid Action", desc: "Volunteers mobilised rapidly when communities face crisis — working as Project Managers, Procurement Officers, or Core Volunteers under the One Tata Response framework.", colour: DR_C, light: "#E6F5F7", route: "disaster-response" },
  ];

  return (
    <section id="about-programmes" style={{ padding: "96px 56px", background: "#fff" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <Eyebrow text="Our programmes" />
        <h2 style={{ fontSize: 30, fontWeight: 900, color: NAVY, letterSpacing: "-0.5px" }}>Three ways to volunteer</h2>
        <DefinerBar />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 20, marginTop: 44 }}>
          {progs.map(p => (
            <div key={p.name}
              style={{ borderRadius: 18, overflow: "hidden", border: "1px solid #e8eef0", transition: "transform 0.2s,box-shadow 0.2s" }}
              onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.transform = "translateY(-3px)"; (e.currentTarget as HTMLDivElement).style.boxShadow = "0 10px 28px rgba(0,0,0,0.08)"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.transform = "none"; (e.currentTarget as HTMLDivElement).style.boxShadow = "none"; }}
            >
              <div style={{ background: p.light, padding: "28px 28px 22px", borderBottom: `1px solid ${p.colour}20` }}>
                <div style={{ height: 3, background: p.colour, borderRadius: 2, width: 32, marginBottom: 16 }} />
                <div style={{ fontFamily: "'DM Mono',monospace", fontSize: 10, fontWeight: 700, letterSpacing: "1.5px", textTransform: "uppercase", color: p.colour + "cc", marginBottom: 8 }}>{p.tag}</div>
                <div style={{ fontSize: 18, fontWeight: 900, color: NAVY }}>{p.name}</div>
              </div>
              <div style={{ padding: "20px 28px 28px" }}>
                <p style={{ fontSize: 14, color: "#64748B", lineHeight: 1.75, marginBottom: 20 }}>{p.desc}</p>
                <button onClick={() => navigate(p.route)} style={{ background: "none", border: `1.5px solid ${p.colour}`, borderRadius: 8, padding: "8px 18px", fontSize: 13, fontWeight: 700, color: p.colour, cursor: "pointer" }}>
                  Learn more →
                </button>
              </div>
            </div>
          ))}
        </div>
        <div style={{ marginTop: 20, background: "#F4F8F7", borderRadius: 16, padding: "24px 32px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 24 }}>
          <div>
            <div style={{ fontSize: 15, fontWeight: 800, color: NAVY, marginBottom: 4 }}>Are you an NGO?</div>
            <div style={{ fontSize: 14, color: "#64748B" }}>Partner with us to access skilled Tata volunteers for your projects.</div>
          </div>
          <button onClick={() => navigate("partner")} style={{ background: NAVY, color: "#fff", border: "none", borderRadius: 10, padding: "11px 24px", fontWeight: 800, fontSize: 14, cursor: "pointer", whiteSpace: "nowrap", flexShrink: 0 }}>
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
    <div style={{ background: "#fff", minHeight: "100vh", fontFamily: "'DM Sans',sans-serif", paddingTop: 64 }}>
      <SubPageDotRail sections={SECTIONS} accentColour={ACCENT} />
      <Hero />
      <VisionSection />
      <WhatSection />
      <ProgrammesSection />
    </div>
  );
}
