import { useRef, useState, useEffect } from "react";
import SubPageDotRail from "@/components/shared/SubPageDotRail";
import shrirangPortrait from "@/assets/team/shrirang-dhavale.png";
import gauriPortrait from "@/assets/team/gauri-rajadhyaksha.png";
import supriyaPortrait from "@/assets/team/supriya-ramachandran.png";
import truptiPortrait from "@/assets/team/trupti-prabhu.png";
import teamHeroImg from "@/assets/tata-projects.jpg";

const ACCENT       = "#F4838A";   // pink — Team page
const ACCENT_DARK  = "#C85E64";
const ACCENT_LIGHT = "#FEF0F1";
const NAVY         = "#0D1B3E";

const DIAG: React.CSSProperties = {
  position: "absolute", inset: 0,
  backgroundImage: "repeating-linear-gradient(45deg,rgba(255,255,255,0.03) 1px,transparent 1px)",
  backgroundSize: "28px 28px",
  pointerEvents: "none",
};

const SECTIONS = [
  { id: "team-intro", label: "Overview" },
  { id: "team-members", label: "The Team" },
];

function DefinerBar({ colour = ACCENT }: { colour?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [on, setOn] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setOn(true); }, { threshold: 0.4 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return (
    <div ref={ref} style={{ height: 3, background: "#e8e8f0", borderRadius: 2, overflow: "hidden", width: 48, marginTop: 10 }}>
      <div style={{ height: "100%", background: colour, borderRadius: 2, transition: "width 0.65s cubic-bezier(0.22,1,0.36,1)", width: on ? "100%" : "0%" }} />
    </div>
  );
}

// ── Hero ──────────────────────────────────────────────────────────────────────
function Hero() {
  return (
    <div style={{ position: "relative", background: ACCENT_DARK, padding: "100px 56px 72px", overflow: "hidden" }}>
      <img src={teamHeroImg} alt="" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "center" }} />
      <div style={{ position: "absolute", inset: 0, background: `linear-gradient(110deg, ${ACCENT_DARK}f5 0%, ${ACCENT_DARK}ee 38%, ${ACCENT}d0 62%, ${ACCENT}80 85%, ${ACCENT}40 100%)` }} />
      <div style={DIAG} />
      <div style={{ position: "absolute", top: -80, right: -60, width: 440, height: 440, background: `radial-gradient(circle, rgba(255,255,255,0.15) 0%, transparent 68%)`, pointerEvents: "none" }} />
      <div style={{ position: "relative", zIndex: 1, maxWidth: 1100, margin: "0 auto" }}>
        <p style={{ fontFamily: "'DM Mono',monospace", fontSize: 10, fontWeight: 600, letterSpacing: "2.5px", textTransform: "uppercase", color: "rgba(255,255,255,0.75)", marginBottom: 18 }}>
          Social Services Cluster · Tata Sustainability Group
        </p>
        <div style={{ width: 40, height: 3, background: "#fff", borderRadius: 2, marginBottom: 24 }} />
        <h1 style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "clamp(2.2rem,4.5vw,3.2rem)", fontWeight: 900, color: "#fff", lineHeight: 1.08, letterSpacing: "-1.5px", margin: "0 0 18px", maxWidth: 560 }}>
          Meet Tata Engage
        </h1>
        <p style={{ fontSize: 15, fontWeight: 300, color: "rgba(255,255,255,0.88)", maxWidth: 460 }}>
          The people behind the Tata Group's volunteering platform — driving scale, quality, and impact across 100+ companies.
        </p>
      </div>
    </div>
  );
}

// ── Intro strip ───────────────────────────────────────────────────────────────
function IntroSection() {
  return (
    <section id="team-intro" style={{ background: "#f5f5fa", padding: "64px 56px" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 20 }}>
          {[
            { label: "Our cluster", body: "The Social Services Cluster within Tata Sustainability Group leads all volunteering strategy, programme design, and community impact for the Tata Group." },
            { label: "What we do", body: "We design and run Tata Engage — the group-wide volunteering platform spanning TVW, ProEngage, and Disaster Response — for over 100 Tata companies." },
            { label: "Get in touch", body: "Reach us at tataengage@tata.com for queries on volunteering, partnerships, or programme participation across the Tata ecosystem." },
          ].map(b => (
            <div key={b.label} style={{ background: "#fff", border: "1px solid #e8eef0", borderTop: `3px solid ${ACCENT}`, borderRadius: 14, padding: "28px 24px" }}>
              <p style={{ fontFamily: "'DM Mono',monospace", fontSize: 10, fontWeight: 700, letterSpacing: "1.5px", textTransform: "uppercase", color: ACCENT, marginBottom: 12 }}>{b.label}</p>
              <p style={{ fontSize: 14, color: "#475569", lineHeight: 1.75 }}>{b.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Team ── identical card design from AboutView, accent updated ───────────────
function TeamSection() {
  const team = [
    { name: "Shrirang Dhavale",     title: "Cluster Head",                   linkedin: "https://www.linkedin.com/in/shrirang-dhavale-45b89812/", photo: shrirangPortrait, focus: "center 25%" },
    { name: "Gauri Rajadhyaksha",   title: "Deputy General Manager",         linkedin: "https://www.linkedin.com/in/gaurir/",                   photo: gauriPortrait,    focus: "center 25%" },
    { name: "Supriya Ramachandran", title: "Manager",                        linkedin: null,                                                      photo: supriyaPortrait,  focus: "center 25%" },
    { name: "Trupti Prabhu",        title: "Assistant Manager",              linkedin: "https://www.linkedin.com/in/trupti-prabhu-1bb720169/",   photo: truptiPortrait,   focus: "center 30%" },
  ];
  const initials = (n: string) => n.split(" ").map(w => w[0]).slice(0, 2).join("");

  return (
    <section id="team-members" style={{ background: "#F4F8F7", padding: "96px 56px" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <p style={{ fontFamily: "'DM Mono',monospace", fontSize: 11, fontWeight: 600, letterSpacing: "1.8px", textTransform: "uppercase", color: ACCENT + "cc", marginBottom: 10 }}>
          The team
        </p>
        <h2 style={{ fontSize: 30, fontWeight: 900, color: NAVY, letterSpacing: "-0.5px" }}>The people behind the platform</h2>
        <DefinerBar />

        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 20, marginTop: 44 }}>
          {team.map(t => (
            <div
              key={t.name}
              style={{ background: "#fff", border: "1px solid #e8eef0", borderRadius: 18, padding: "32px 24px", textAlign: "center", transition: "transform 0.2s,box-shadow 0.2s" }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLDivElement).style.transform = "translateY(-3px)";
                (e.currentTarget as HTMLDivElement).style.boxShadow = "0 10px 28px rgba(0,0,0,0.08)";
                const img = e.currentTarget.querySelector<HTMLImageElement>("[data-portrait-img]");
                const overlay = e.currentTarget.querySelector<HTMLDivElement>("[data-portrait-name]");
                if (img) img.style.transform = "scale(1.12)";
                if (overlay) overlay.style.opacity = "1";
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLDivElement).style.transform = "none";
                (e.currentTarget as HTMLDivElement).style.boxShadow = "none";
                const img = e.currentTarget.querySelector<HTMLImageElement>("[data-portrait-img]");
                const overlay = e.currentTarget.querySelector<HTMLDivElement>("[data-portrait-name]");
                if (img) img.style.transform = "scale(1)";
                if (overlay) overlay.style.opacity = "0";
              }}
            >
              {/* Avatar */}
              <div style={{ width: 180, height: 180, borderRadius: 14, background: `linear-gradient(135deg,${ACCENT} 0%,${ACCENT_DARK} 100%)`, color: "#fff", margin: "0 auto 22px", position: "relative", overflow: "hidden" }}>
                {t.photo ? (
                  <img data-portrait-img src={t.photo} alt={t.name} style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: t.focus, display: "block", transition: "transform 0.35s ease" }} />
                ) : (
                  <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 28, fontWeight: 800, letterSpacing: "0.5px" }}>
                    {initials(t.name)}
                  </div>
                )}
                <div data-portrait-name style={{ position: "absolute", inset: 0, background: "rgba(44,30,60,0.55)", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", padding: "0 12px", fontSize: 15, fontWeight: 800, lineHeight: 1.25, textAlign: "center", opacity: 0, transition: "opacity 0.25s ease", pointerEvents: "none" }}>
                  {t.name}
                </div>
              </div>

              <div style={{ marginBottom: 16 }}>
                <div style={{ fontSize: 15, fontWeight: 800, color: NAVY, marginBottom: 4 }}>{t.name}</div>
                <div style={{ fontSize: 13, color: "#64748B", lineHeight: 1.5 }}>{t.title}</div>
              </div>

              <div style={{ fontSize: 11, fontWeight: 600, color: ACCENT_DARK, background: ACCENT_LIGHT, borderRadius: 100, padding: "3px 12px", display: "inline-block", marginBottom: t.linkedin ? 12 : 0 }}>
                Social Services Cluster
              </div>

              {t.linkedin && (
                <div style={{ marginTop: 8 }}>
                  <a href={t.linkedin} target="_blank" rel="noopener noreferrer" style={{ fontSize: 12, color: "#0077B5", fontWeight: 600, textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 4 }}>
                    LinkedIn ↗
                  </a>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Main ──────────────────────────────────────────────────────────────────────
export default function TeamView() {
  return (
    <div style={{ background: "#fff", minHeight: "100vh", fontFamily: "'DM Sans',sans-serif", paddingTop: 64 }}>
      <SubPageDotRail sections={SECTIONS} accentColour={ACCENT} />
      <Hero />
      <IntroSection />
      <TeamSection />
    </div>
  );
}
