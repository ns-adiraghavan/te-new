import { useRef, useState, useEffect } from "react";
import SubPageDotRail from "@/components/shared/SubPageDotRail";
import chackoThomasPortrait from "@/assets/chacko-thomas.jpg";
import tcsForestImg from "@/assets/tcs-forest.png";

const ACCENT      = "#4376BB";
const ACCENT_DARK = "#2D5494";
const NAVY        = "#0D1B3E";

const FONT = "'DM Sans', 'Noto Sans', ui-sans-serif, system-ui, sans-serif";

const DIAG: React.CSSProperties = {
  position: "absolute", inset: 0,
  backgroundImage: "repeating-linear-gradient(45deg,rgba(255,255,255,0.03) 1px,transparent 1px)",
  backgroundSize: "28px 28px",
  pointerEvents: "none",
};

const SECTIONS = [
  { id: "gcso-letter", label: "The Letter" },
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
      <img src={tcsForestImg} alt="" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "center" }} />
      <div style={{ position: "absolute", inset: 0, background: `linear-gradient(110deg, ${ACCENT}e8 0%, ${ACCENT}cc 38%, ${ACCENT}aa 58%, ${ACCENT}77 78%, ${ACCENT}44 100%)` }} />
      <div style={{ position: "relative", zIndex: 1, maxWidth: 1100, margin: "0 auto", padding: "0 64px", width: "100%" }}>
        <p style={{ fontFamily: FONT, fontSize: 14, fontWeight: 700, letterSpacing: "1.8px", textTransform: "uppercase", color: "#ffffff", margin: "0 0 12px" }}>
          Tata Sustainability Group
        </p>
        <div style={{ height: 2, width: 48, borderRadius: 2, background: "rgba(255,255,255,0.6)", margin: "12px 0 22px" }} />
        <h1 style={{ fontFamily: FONT, fontSize: "clamp(2.4rem,5vw,3.8rem)", fontWeight: 400, color: "#fff", lineHeight: 1.12, letterSpacing: "-0.5px", margin: "0 0 18px", maxWidth: 560 }}>
          Letter from GCSO
        </h1>
      </div>
    </div>
  );
}

// ── Letter ────────────────────────────────────────────────────────────────────
function LetterSection() {
  return (
    <section id="gcso-letter" style={{ background: "#F4F8F7", padding: "96px 56px" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "0.9fr 1.1fr", gap: 72, alignItems: "start" }}>

          {/* Photo — accent coloured card */}
          <div style={{ position: "relative" }}>
            <div style={{ background: ACCENT, borderRadius: 20, overflow: "hidden" }}>
              <img
                src={chackoThomasPortrait}
                alt="Chacko Thomas, Group Chief Sustainability Officer, Tata Sons"
                style={{ display: "block", width: "100%", height: 480, objectFit: "cover", objectPosition: "30% top" }}
              />
            </div>
            {/* Name plate */}
            <div style={{ position: "absolute", bottom: -20, left: 24, right: 24, background: "#fff", borderRadius: 12, padding: "16px 20px", boxShadow: "0 4px 20px rgba(0,0,0,0.10)", display: "flex", alignItems: "center", gap: 16 }}>
              <div style={{ width: 4, height: 40, background: ACCENT, borderRadius: 2, flexShrink: 0 }} />
              <div>
                <div style={{ fontFamily: FONT, fontSize: 15, fontWeight: 800, color: NAVY }}>Chacko Thomas</div>
                <div style={{ fontFamily: FONT, fontSize: 12, color: "#64748B", marginTop: 2 }}>Group Chief Sustainability Officer, Tata Sons</div>
              </div>
            </div>
          </div>

          {/* Letter */}
          <div style={{ paddingTop: 20 }}>
            <p style={{ fontFamily: FONT, fontSize: 14, fontWeight: 700, letterSpacing: "1.8px", textTransform: "uppercase", color: ACCENT, marginBottom: 10 }}>
              From the desk of the GCSO
            </p>
            <h2 style={{ fontFamily: FONT, fontSize: 30, fontWeight: 900, color: NAVY, letterSpacing: "-0.5px", lineHeight: 1.2, margin: 0 }}>
              A letter from<br />Chacko Thomas
            </h2>
            <DefinerBar />

            <div style={{ margin: "32px 0 0" }}>
              <p style={{ fontFamily: FONT, fontSize: 15, color: "#475569", lineHeight: 1.82, marginBottom: 16 }}>
                Volunteering has always been integral to the Tata ethos—not as an act separate from business, but as a way of staying closely connected to communities, realities, and responsibilities that shape our shared future. Across the Tata Group, volunteering continues to evolve from acts of compassion to expressions of thoughtful engagement, where time, skills, and intent come together to create meaningful outcomes. Through Tata Engage, we see this spirit come alive every day—in Tata colleagues, family members and retirees choosing to step forward, to contribute consistently, and to work alongside communities with empathy and purpose.
              </p>
              <p style={{ fontFamily: FONT, fontSize: 15, color: "#475569", lineHeight: 1.82, marginBottom: 16 }}>
                What makes this journey especially powerful is the diversity of ways in which Tata volunteers engage. From large, collective movements to deeply personal initiatives; from hands-on volunteering to skill-based problem solving—each form of engagement strengthens our understanding of impact and reinforces the belief that sustainable progress is built through participation. As we look ahead, our aspiration is to continue nurturing this culture—one that enables action, learning, and recognises that lasting change often begins with individuals choosing to engage, again and again.
              </p>
              <p style={{ fontFamily: FONT, fontSize: 15, color: "#475569", lineHeight: 1.82, marginBottom: 32 }}>
                Tata Engage remains a vital platform in this journey, not just as an enabler of volunteering, but as a reflection of who we are as a Group—committed, compassionate, and connected by a shared sense of purpose.
              </p>
              {/* Signature */}
              <div style={{ borderTop: "1px solid #e8eef0", paddingTop: 24 }}>
                <div style={{ fontFamily: FONT, fontSize: 16, fontWeight: 800, color: NAVY }}>Chacko Thomas</div>
                <div style={{ fontFamily: FONT, fontSize: 13, color: "#64748B", marginTop: 4 }}>Group Chief Sustainability Officer, Tata Sons</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Main ──────────────────────────────────────────────────────────────────────
export default function GCSOView() {
  return (
    <div style={{ background: "transparent", minHeight: "100vh", fontFamily: FONT, paddingTop: 64 }}>
      <SubPageDotRail sections={SECTIONS} accentColour={ACCENT} />
      <Hero />
      <LetterSection />
    </div>
  );
}
