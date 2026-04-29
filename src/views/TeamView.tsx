import { useRef, useState, useEffect } from "react";
import SubPageDotRail from "@/components/shared/SubPageDotRail";
import shrirangPortrait from "@/assets/team/shrirang-dhavale.png";
import gauriPortrait from "@/assets/team/gauri-rajadhyaksha.png";
import supriyaPortrait from "@/assets/team/supriya-ramachandran.png";
import truptiPortrait from "@/assets/team/trupti-prabhu.png";
import teamHeroImg from "@/assets/tata-projects.jpg";

const ACCENT      = "#F4838A";
const ACCENT_DARK = "#C85E64";
const NAVY        = "#0D1B3E";

const FONT = "'DM Sans', 'Noto Sans', ui-sans-serif, system-ui, sans-serif";

const SECTIONS = [
  { id: "team-members", label: "The Team" },
];

function DefinerBar() {
  const ref = useRef<HTMLDivElement>(null);
  const [on, setOn] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setOn(true); }, { threshold: 0.4 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return (
    <div ref={ref} style={{ height: 2, background: "#e8e8f0", borderRadius: 2, overflow: "hidden", width: 48, marginTop: 10 }}>
      <div style={{ height: "100%", background: ACCENT, borderRadius: 2, transition: "width 0.65s cubic-bezier(0.22,1,0.36,1)", width: on ? "100%" : "0%" }} />
    </div>
  );
}

// ── Hero ──────────────────────────────────────────────────────────────────────
function Hero() {
  return (
    <div style={{ position: "relative", minHeight: "92vh", display: "flex", alignItems: "center", overflow: "hidden", paddingTop: 64 }}>
      <img src={teamHeroImg} alt="" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "center" }} />
      <div style={{ position: "absolute", inset: 0, background: `linear-gradient(110deg, ${ACCENT}e8 0%, ${ACCENT}cc 38%, ${ACCENT}aa 58%, ${ACCENT}77 78%, ${ACCENT}44 100%)` }} />
      <div style={{ position: "relative", zIndex: 1, maxWidth: 1100, margin: "0 auto", padding: "0 64px", width: "100%" }}>
        <p style={{ fontFamily: FONT, fontSize: 14, fontWeight: 700, letterSpacing: "1.8px", textTransform: "uppercase", color: "#ffffff", margin: "0 0 12px" }}>
          Social Services Cluster · Tata Sustainability Group
        </p>
        <div style={{ height: 2, width: 48, borderRadius: 2, background: "rgba(255,255,255,0.6)", margin: "12px 0 22px" }} />
        <h1 style={{ fontFamily: FONT, fontSize: "clamp(2.4rem,5vw,3.8rem)", fontWeight: 400, color: "#fff", lineHeight: 1.12, letterSpacing: "-0.5px", margin: "0 0 18px", maxWidth: 560 }}>
          Meet the Tata Engage Team
        </h1>
        <p style={{ fontFamily: FONT, fontSize: 16, fontWeight: 300, color: "rgba(255,255,255,0.65)", lineHeight: 1.7, maxWidth: 460, margin: 0 }}>
          The people behind the Tata Group's volunteering platform — driving scale, quality, and impact across 100+ companies.
        </p>
      </div>
    </div>
  );
}

// ── Team ──────────────────────────────────────────────────────────────────────
function TeamSection() {
  const team = [
    { name: "Shrirang Dhavale",     title: "Cluster Head",           linkedin: "https://www.linkedin.com/in/shrirang-dhavale-45b89812/", photo: shrirangPortrait, focus: "center 25%" },
    { name: "Gauri Rajadhyaksha",   title: "Deputy General Manager", linkedin: "https://www.linkedin.com/in/gaurir/",                   photo: gauriPortrait,    focus: "center 25%" },
    { name: "Supriya Ramachandran", title: "Manager",                linkedin: null,                                                    photo: supriyaPortrait,  focus: "center 25%" },
    { name: "Trupti Prabhu",        title: "Assistant Manager",      linkedin: "https://www.linkedin.com/in/trupti-prabhu-1bb720169/",  photo: truptiPortrait,   focus: "center 30%" },
  ];
  const initials = (n: string) => n.split(" ").map(w => w[0]).slice(0, 2).join("");

  return (
    <section id="team-members" style={{ background: "#F4F8F7", padding: "96px 56px" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <p style={{ fontFamily: FONT, fontSize: 14, fontWeight: 700, letterSpacing: "1.8px", textTransform: "uppercase", color: ACCENT, margin: "0 0 10px" }}>
          The team
        </p>
        <h2 style={{ fontFamily: FONT, fontSize: 30, fontWeight: 900, color: NAVY, letterSpacing: "-0.5px", margin: 0 }}>
          The people behind the platform
        </h2>
        <DefinerBar />

        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 20, marginTop: 44 }}>
          {team.map(t => (
            <div
              key={t.name}
              style={{ background: "#fff", border: "1px solid #e8eef0", borderRadius: 18, padding: "32px 24px", textAlign: "center", transition: "transform 0.2s, box-shadow 0.2s" }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLDivElement).style.transform = "translateY(-3px)";
                (e.currentTarget as HTMLDivElement).style.boxShadow = "0 10px 28px rgba(0,0,0,0.08)";
                const img = e.currentTarget.querySelector<HTMLImageElement>("[data-portrait-img]");
                if (img) img.style.transform = "scale(1.08)";
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLDivElement).style.transform = "none";
                (e.currentTarget as HTMLDivElement).style.boxShadow = "none";
                const img = e.currentTarget.querySelector<HTMLImageElement>("[data-portrait-img]");
                if (img) img.style.transform = "scale(1)";
              }}
            >
              {/* Avatar — accent coloured */}
              <div style={{ width: 160, height: 160, borderRadius: 14, background: `linear-gradient(135deg,${ACCENT} 0%,${ACCENT_DARK} 100%)`, color: "#fff", margin: "0 auto 22px", position: "relative", overflow: "hidden" }}>
                {t.photo ? (
                  <img
                    data-portrait-img
                    src={t.photo}
                    alt={t.name}
                    style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: t.focus, display: "block", transition: "transform 0.35s ease" }}
                  />
                ) : (
                  <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: FONT, fontSize: 28, fontWeight: 800 }}>
                    {initials(t.name)}
                  </div>
                )}
              </div>

              <div style={{ marginBottom: 12 }}>
                <div style={{ fontFamily: FONT, fontSize: 15, fontWeight: 800, color: NAVY, marginBottom: 4 }}>{t.name}</div>
                <div style={{ fontFamily: FONT, fontSize: 13, color: "#64748B", lineHeight: 1.5 }}>{t.title}</div>
              </div>

              <div style={{ fontFamily: FONT, fontSize: 11, fontWeight: 600, color: ACCENT_DARK, background: "#FEF0F1", borderRadius: 100, padding: "3px 12px", display: "inline-block", marginBottom: t.linkedin ? 12 : 0 }}>
                Social Services Cluster
              </div>

              {t.linkedin && (
                <div style={{ marginTop: 8 }}>
                  <a href={t.linkedin} target="_blank" rel="noopener noreferrer" style={{ fontFamily: FONT, fontSize: 12, color: "#0077B5", fontWeight: 600, textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 4 }}>
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
    <div style={{ background: "transparent", minHeight: "100vh", fontFamily: FONT }}>
      <SubPageDotRail sections={SECTIONS} accentColour={ACCENT} />
      <Hero />
      <TeamSection />
    </div>
  );
}
