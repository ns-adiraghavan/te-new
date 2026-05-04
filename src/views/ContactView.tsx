import { useRef, useState, useEffect } from "react";
import { Facebook, Linkedin, Instagram } from "lucide-react";
import SubPageDotRail from "@/components/shared/SubPageDotRail";
import contactHeroImg from "@/assets/tata-infinit.jpg";

const ACCENT      = "#C3DB6F";
const ACCENT_DARK = "#7a8f2a";
const NAVY        = "#0D1B3E";

const FONT = "'DM Sans', 'Noto Sans', ui-sans-serif, system-ui, sans-serif";

const DIAG: React.CSSProperties = {
  position: "absolute", inset: 0,
  backgroundImage: "repeating-linear-gradient(45deg,rgba(255,255,255,0.04) 1px,transparent 1px)",
  backgroundSize: "28px 28px",
  pointerEvents: "none",
};

const SECTIONS = [
  { id: "contact-hero",   label: "Overview" },
  { id: "contact-touch",  label: "Get in Touch" },
  { id: "contact-social", label: "Stay Connected" },
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
    <div ref={ref} style={{ height: 2, background: light ? "rgba(255,255,255,0.2)" : "#e8e8f0", borderRadius: 2, overflow: "hidden", width: 48, marginTop: 10 }}>
      <div style={{ height: "100%", background: light ? "rgba(255,255,255,0.8)" : ACCENT_DARK, borderRadius: 2, transition: "width 0.65s cubic-bezier(0.22,1,0.36,1)", width: on ? "100%" : "0%" }} />
    </div>
  );
}

// ── Hero ──────────────────────────────────────────────────────────────────────
function Hero() {
  return (
    <div id="contact-hero" style={{ position: "relative", minHeight: "92vh", display: "flex", alignItems: "center", overflow: "hidden", paddingTop: 64 }}>
      <img src={contactHeroImg} alt="" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "center" }} />
      <div style={{ position: "absolute", inset: 0, background: `linear-gradient(110deg, ${ACCENT}e8 0%, ${ACCENT}cc 38%, ${ACCENT}aa 58%, ${ACCENT}77 78%, ${ACCENT}44 100%)` }} />
      <div style={{ position: "relative", zIndex: 1, maxWidth: 1100, margin: "0 auto", padding: "0 64px", width: "100%" }}>
        <p style={{ fontFamily: FONT, fontSize: 14, fontWeight: 700, letterSpacing: "1.8px", textTransform: "uppercase", color: "#ffffff", margin: "0 0 12px" }}>
          Tata Engage · Get in Touch
        </p>
        <div style={{ height: 2, width: 48, borderRadius: 2, background: "rgba(255,255,255,0.6)", margin: "12px 0 22px" }} />
        <h1 style={{ fontFamily: FONT, fontSize: "clamp(2.4rem,5vw,3.8rem)", fontWeight: 400, color: "#fff", lineHeight: 1.12, letterSpacing: "-0.5px", margin: "0 0 18px", maxWidth: 620 }}>
          Contact &amp; Connect with Tata Engage
        </h1>
        <p style={{ fontFamily: FONT, fontSize: 16, fontWeight: 300, color: "rgba(255,255,255,0.65)", maxWidth: 520, lineHeight: 1.7, margin: 0 }}>
          We'd love to hear from you. Whether you're a civil society organisation looking for volunteers, a partner exploring collaboration opportunities, or a Tata colleague building your own volunteering journey, the Tata Engage team is here to help.
        </p>
      </div>
    </div>
  );
}

// ── Get in Touch ──────────────────────────────────────────────────────────────
function TouchSection() {
  return (
    <section id="contact-touch" style={{ padding: "96px 56px", background: "#fff" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <p style={{ fontFamily: FONT, fontSize: 14, fontWeight: 700, letterSpacing: "1.8px", textTransform: "uppercase", color: ACCENT_DARK, margin: "0 0 10px" }}>
          Get in Touch
        </p>
        <h2 style={{ fontFamily: FONT, fontSize: 30, fontWeight: 900, color: NAVY, letterSpacing: "-0.5px", margin: 0 }}>
          Email the Tata Engage team
        </h2>
        <DefinerBar />

        {/* Accent-coloured email card */}
        <div style={{ marginTop: 44, background: ACCENT, borderRadius: 20, padding: "48px 52px", position: "relative", overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 32 }}>
          <div style={DIAG} />
          <div style={{ position: "absolute", bottom: -60, right: -60, width: 300, height: 300, background: "radial-gradient(circle,rgba(255,255,255,0.2) 0%,transparent 68%)", pointerEvents: "none" }} />
          <div style={{ position: "relative", zIndex: 1, maxWidth: 560 }}>
            <p style={{ fontFamily: FONT, fontSize: 14, fontWeight: 700, letterSpacing: "1.8px", textTransform: "uppercase", color: NAVY, marginBottom: 14, opacity: 0.75 }}>
              Drop us a line
            </p>
            <p style={{ fontFamily: FONT, fontSize: 17, fontWeight: 300, fontStyle: "italic", color: NAVY, lineHeight: 1.65, margin: 0, opacity: 0.9 }}>
              Our team will be happy to guide you on areas you need assistance, or respond to your queries.
            </p>
          </div>
          <div style={{ position: "relative", zIndex: 1, flexShrink: 0 }}>
            <a
              href="mailto:tataengage@tata.com"
              style={{ display: "inline-flex", alignItems: "center", gap: 10, background: NAVY, color: "#fff", padding: "16px 24px", borderRadius: 12, fontFamily: FONT, fontSize: 14, fontWeight: 800, textDecoration: "none", transition: "transform 0.2s" }}
              onMouseEnter={e => (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(-3px)"}
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

// ── Stay Connected ────────────────────────────────────────────────────────────
function SocialSection() {
  const channels = [
    { handle: "Tata Engage", platform: "Facebook", note: "Real-time updates on TVW editions, ProEngage openings, and volunteering stories from across the Tata Group.", time: "Follow us", Icon: Facebook, iconBg: "#1877F2", url: "#" },
    { handle: "Tata Engage", platform: "LinkedIn", note: "Stay updated on volunteering programmes, partner opportunities, and impact stories from across the Tata ecosystem.", time: "Follow us", Icon: Linkedin, iconBg: "#1D4ED8", url: "#" },
    { handle: "@tata_engage", platform: "Instagram", note: "Stories, photos and volunteering moments from across the Tata Group.", time: "Follow us", Icon: Instagram, iconBg: "#EC4899", url: "#" },
  ];

  return (
    <section id="contact-social" style={{ padding: "0 56px 96px", background: "#fff" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <p style={{ fontFamily: FONT, fontSize: 14, fontWeight: 700, letterSpacing: "1.8px", textTransform: "uppercase", color: ACCENT_DARK, margin: "0 0 10px" }}>
          Stay Connected
        </p>
        <h2 style={{ fontFamily: FONT, fontSize: 30, fontWeight: 900, color: NAVY, letterSpacing: "-0.5px", margin: 0 }}>
          Follow Tata Engage
        </h2>
        <DefinerBar />

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 20, marginTop: 44 }}>
          {channels.map((ch, i) => {
            const IconComp = ch.Icon;
            return (
              <a key={i} href={ch.url}
                style={{ background: "#fff", border: "1px solid #e8e8f0", borderRadius: 14,
                  padding: 20, textDecoration: "none", color: "inherit", display: "block",
                  transition: "transform 0.2s, box-shadow 0.2s" }}
                onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(-3px)"; (e.currentTarget as HTMLAnchorElement).style.boxShadow = "0 8px 24px rgba(0,0,0,0.10)"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.transform = "none"; (e.currentTarget as HTMLAnchorElement).style.boxShadow = "none"; }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
                  <div style={{ width: 32, height: 32, borderRadius: "50%", background: ch.iconBg,
                    display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <IconComp size={16} color="#fff" />
                  </div>
                  <div>
                    <div style={{ fontFamily: FONT, fontSize: 13, fontWeight: 700, color: NAVY }}>{ch.handle}</div>
                    <div style={{ fontFamily: FONT, fontSize: 11, color: "#94A3B8" }}>{ch.platform} · {ch.time}</div>
                  </div>
                </div>
                <p style={{ fontFamily: FONT, fontSize: 14, color: "#475569", lineHeight: 1.6, marginBottom: 10 }}>{ch.note}</p>
                <span style={{ fontFamily: FONT, fontSize: 12, color: "#94A3B8" }}>Follow ↗</span>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ── Main ──────────────────────────────────────────────────────────────────────
export default function ContactView() {
  return (
    <div style={{ background: "transparent", minHeight: "100vh", fontFamily: FONT }}>
      <SubPageDotRail sections={SECTIONS} accentColour={ACCENT} />
      <Hero />
      <TouchSection />
      <SocialSection />
    </div>
  );
}
