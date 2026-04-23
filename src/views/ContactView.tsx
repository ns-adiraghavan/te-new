import { useRef, useState, useEffect } from "react";
import SubPageDotRail from "@/components/shared/SubPageDotRail";
import contactHeroImg from "@/assets/tata-infinit.jpg";

const ACCENT       = "#D84926";   // orange-red — Contact page
const ACCENT_DARK  = "#A8341A";
const ACCENT_LIGHT = "#FDF1ED";
const NAVY         = "#0D1B3E";

const DIAG: React.CSSProperties = {
  position: "absolute", inset: 0,
  backgroundImage: "repeating-linear-gradient(45deg,rgba(255,255,255,0.04) 1px,transparent 1px)",
  backgroundSize: "28px 28px",
  pointerEvents: "none",
};

const SECTIONS = [
  { id: "contact-hero",    label: "Overview" },
  { id: "contact-email",   label: "Email"    },
  { id: "contact-social",  label: "Social"   },
];

function DefinerBar({ light = false }: { light?: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const [on, setOn] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setOn(true); }, { threshold: 0.4 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return (
    <div ref={ref} style={{ height: 3, background: light ? "rgba(255,255,255,0.2)" : "#e8e8f0", borderRadius: 2, overflow: "hidden", width: 48, marginTop: 10 }}>
      <div style={{ height: "100%", background: light ? "rgba(255,255,255,0.85)" : ACCENT, borderRadius: 2, transition: "width 0.65s cubic-bezier(0.22,1,0.36,1)", width: on ? "100%" : "0%" }} />
    </div>
  );
}

// ── Hero ──────────────────────────────────────────────────────────────────────
function Hero() {
  return (
    <div id="contact-hero" style={{ position: "relative", background: ACCENT_DARK, padding: "100px 56px 96px", overflow: "hidden" }}>
      <img src={contactHeroImg} alt="" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "center" }} />
      <div style={{ position: "absolute", inset: 0, background: `linear-gradient(110deg, ${ACCENT_DARK}f5 0%, ${ACCENT_DARK}ee 38%, ${ACCENT}d0 62%, ${ACCENT}80 85%, ${ACCENT}40 100%)` }} />
      <div style={DIAG} />
      <div style={{ position: "absolute", top: -80, right: -60, width: 440, height: 440, background: `radial-gradient(circle, rgba(255,255,255,0.15) 0%, transparent 68%)`, pointerEvents: "none" }} />
      <div style={{ position: "relative", zIndex: 1, maxWidth: 1100, margin: "0 auto" }}>
        <p style={{ fontFamily: "'DM Mono',monospace", fontSize: 10, fontWeight: 600, letterSpacing: "2.5px", textTransform: "uppercase", color: "rgba(255,255,255,0.85)", marginBottom: 18 }}>
          Tata Engage · Get in Touch
        </p>
        <div style={{ width: 40, height: 3, background: "rgba(255,255,255,0.85)", borderRadius: 2, marginBottom: 24 }} />
        <h1 style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "clamp(2.2rem,4.5vw,3.2rem)", fontWeight: 900, color: "#fff", lineHeight: 1.08, letterSpacing: "-1.5px", margin: "0 0 18px", maxWidth: 620 }}>
          Contact &amp; Connect with Tata Engage
        </h1>
        <p style={{ fontSize: 15, fontWeight: 300, color: "rgba(255,255,255,0.9)", maxWidth: 520, lineHeight: 1.6 }}>
          Whether you're a civil society organisation, a Tata colleague, or a partner exploring collaboration — the Tata Engage team is here to help.
        </p>
      </div>
    </div>
  );
}

// ── Email banner (Stay-in-the-loop style) ────────────────────────────────────
function EmailSection() {
  return (
    <section id="contact-email" style={{ background: "#fff", padding: "96px 56px" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <p style={{ fontFamily: "'DM Mono',monospace", fontSize: 11, fontWeight: 600, letterSpacing: "1.8px", textTransform: "uppercase", color: ACCENT_DARK, marginBottom: 10 }}>
          Get in touch directly
        </p>
        <h2 style={{ fontSize: 30, fontWeight: 900, color: NAVY, letterSpacing: "-0.5px" }}>Email the Tata Engage team</h2>
        <DefinerBar />

        <div style={{ marginTop: 44, background: NAVY, borderRadius: 20, padding: "48px 52px", position: "relative", overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 32 }}>
          <div style={DIAG} />
          <div style={{ position: "absolute", bottom: -60, right: -60, width: 300, height: 300, background: `radial-gradient(circle,${ACCENT}33 0%,transparent 68%)`, pointerEvents: "none" }} />
          <div style={{ position: "relative", zIndex: 1, maxWidth: 560 }}>
            <p style={{ fontFamily: "'DM Mono',monospace", fontSize: 10, fontWeight: 700, letterSpacing: "1.5px", textTransform: "uppercase", color: "rgba(255,255,255,0.6)", marginBottom: 14 }}>
              Drop us a line
            </p>
            <p style={{ fontFamily: "'Playfair Display',Georgia,serif", fontSize: 20, fontStyle: "italic", color: "#fff", lineHeight: 1.65, marginBottom: 0 }}>
              Our team will be happy to guide you on areas you need assistance, or respond to your queries.
            </p>
          </div>
          <div style={{ position: "relative", zIndex: 1, flexShrink: 0 }}>
            <a href="mailto:tataengage@tata.com"
              style={{ display: "inline-flex", alignItems: "center", gap: 10, background: "#fff", color: NAVY, padding: "16px 24px", borderRadius: 12, fontSize: 14, fontWeight: 800, textDecoration: "none", boxShadow: "0 6px 20px rgba(0,0,0,0.25)", transition: "transform 0.2s" }}
              onMouseEnter={e => (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(-2px)"}
              onMouseLeave={e => (e.currentTarget as HTMLAnchorElement).style.transform = "none"}
            >
              ✉ tataengage@tata.com
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Social (full-bleed) ───────────────────────────────────────────────────────
function SocialSection() {
  const channels = [
    {
      label: "LinkedIn",
      heading: "Follow on LinkedIn",
      body: "Stay updated on volunteering programmes, partner opportunities, and impact stories from across the Tata ecosystem.",
      detail: "Tata Engage — official page",
      icon: (
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/>
        </svg>
      ),
    },
    {
      label: "X (Twitter)",
      heading: "Follow on X",
      body: "Real-time updates on TVW editions, ProEngage openings, and volunteering stories from across the Tata Group.",
      detail: "Tata Engage — official handle",
      icon: (
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"/>
        </svg>
      ),
    },
    {
      label: "Website",
      heading: "Tata Sustainability & Tata Group",
      body: "Reach Tata Engage via the broader Tata Sustainability and Tata Group platforms for partner enquiries and ecosystem updates.",
      detail: "Visit Tata Sustainability ↗",
      icon: (
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/>
        </svg>
      ),
    },
  ];

  return (
    <section id="contact-social" style={{ position: "relative", background: `linear-gradient(135deg, ${ACCENT_DARK} 0%, ${ACCENT} 100%)`, padding: "96px 56px", overflow: "hidden" }}>
      <div style={DIAG} />
      <div style={{ position: "absolute", top: -120, right: -80, width: 480, height: 480, background: "radial-gradient(circle, rgba(255,255,255,0.12) 0%, transparent 68%)", pointerEvents: "none" }} />
      <div style={{ position: "relative", zIndex: 1, maxWidth: 1100, margin: "0 auto" }}>
        <p style={{ fontFamily: "'DM Mono',monospace", fontSize: 11, fontWeight: 600, letterSpacing: "1.8px", textTransform: "uppercase", color: "rgba(255,255,255,0.75)", marginBottom: 10 }}>
          Stay connected
        </p>
        <h2 style={{ fontSize: 30, fontWeight: 900, color: "#fff", letterSpacing: "-0.5px" }}>Follow Tata Engage</h2>
        <DefinerBar light />

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 20, marginTop: 44 }}>
          {channels.map(c => (
            <a
              key={c.label}
              href="#"
              style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.18)", borderRadius: 18, padding: "32px 28px", textDecoration: "none", display: "block", transition: "transform 0.2s, background 0.2s" }}
              onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(-3px)"; (e.currentTarget as HTMLAnchorElement).style.background = "rgba(255,255,255,0.14)"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.transform = "none"; (e.currentTarget as HTMLAnchorElement).style.background = "rgba(255,255,255,0.08)"; }}
            >
              <div style={{ width: 52, height: 52, borderRadius: 14, background: "rgba(255,255,255,0.15)", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 20 }}>
                {c.icon}
              </div>
              <p style={{ fontFamily: "'DM Mono',monospace", fontSize: 10, fontWeight: 700, letterSpacing: "1.2px", textTransform: "uppercase", color: "rgba(255,255,255,0.7)", marginBottom: 10 }}>{c.label}</p>
              <h3 style={{ fontSize: 17, fontWeight: 800, color: "#fff", marginBottom: 10, lineHeight: 1.3 }}>{c.heading}</h3>
              <p style={{ fontSize: 14, color: "rgba(255,255,255,0.8)", lineHeight: 1.7, marginBottom: 20 }}>{c.body}</p>
              <span style={{ fontSize: 13, fontWeight: 700, color: "#fff", display: "inline-flex", alignItems: "center", gap: 4 }}>
                {c.detail} ↗
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Main ──────────────────────────────────────────────────────────────────────
export default function ContactView() {
  return (
    <div style={{ background: "#fff", minHeight: "100vh", fontFamily: "'DM Sans',sans-serif", paddingTop: 64 }}>
      <SubPageDotRail sections={SECTIONS} accentColour={ACCENT} />
      <Hero />
      <EmailSection />
      <SocialSection />
    </div>
  );
}
