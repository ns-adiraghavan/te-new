import { useRef, useState, useEffect } from "react";
import SubPageDotRail from "@/components/shared/SubPageDotRail";
import chackoThomasPortrait from "@/assets/chacko-thomas.jpg";

const ACCENT      = "#4376BB";
const ACCENT_DARK = "#2D5494";
const NAVY        = "#0D1B3E";

const DIAG: React.CSSProperties = {
  position: "absolute", inset: 0,
  backgroundImage: "repeating-linear-gradient(45deg,rgba(255,255,255,0.03) 1px,transparent 1px)",
  backgroundSize: "28px 28px",
  pointerEvents: "none",
};

const SECTIONS = [
  { id: "gcso-letter", label: "The Letter" },
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
    <div style={{ position: "relative", background: `linear-gradient(135deg, ${ACCENT_DARK} 0%, ${ACCENT} 100%)`, padding: "100px 56px 72px", overflow: "hidden" }}>
      <div style={DIAG} />
      <div style={{ position: "absolute", top: -80, right: -60, width: 440, height: 440, background: `radial-gradient(circle, rgba(255,255,255,0.12) 0%, transparent 68%)`, pointerEvents: "none" }} />
      <div style={{ position: "relative", zIndex: 1, maxWidth: 1100, margin: "0 auto" }}>
        <p style={{ fontFamily: "'DM Mono',monospace", fontSize: 10, fontWeight: 600, letterSpacing: "2.5px", textTransform: "uppercase", color: "rgba(255,255,255,0.4)", marginBottom: 18 }}>
          Tata Sustainability Group
        </p>
        <div style={{ width: 40, height: 3, background: ACCENT, borderRadius: 2, marginBottom: 24 }} />
        <h1 style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "clamp(2.2rem,4.5vw,3.2rem)", fontWeight: 900, color: "#fff", lineHeight: 1.08, letterSpacing: "-1.5px", margin: "0 0 18px", maxWidth: 560 }}>
          From the Desk of the Group Chief Sustainability Officer
        </h1>
        <p style={{ fontSize: 15, fontWeight: 300, color: "rgba(255,255,255,0.6)", maxWidth: 440 }}>
          Chacko Thomas · Group Chief Sustainability Officer, Tata Sons
        </p>
      </div>
    </div>
  );
}

// ── Letter ────────────────────────────────────────────────────────────────────
function LetterSection() {
  return (
    <section id="gcso-letter" style={{ background: "#F4F8F7", padding: "96px 56px" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "0.9fr 1.1fr", gap: 72, alignItems: "center" }}>

          {/* Photo */}
          <div style={{ position: "relative" }}>
            <div style={{ borderRadius: 18, overflow: "hidden", boxShadow: "0 8px 40px rgba(0,0,0,0.12)" }}>
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
                <div style={{ fontSize: 15, fontWeight: 800, color: NAVY }}>Chacko Thomas</div>
                <div style={{ fontSize: 12, color: "#64748B", marginTop: 2 }}>Group Chief Sustainability Officer, Tata Sons</div>
              </div>
            </div>
          </div>

          {/* Letter content — identical formatting to original */}
          <div style={{ paddingTop: 20 }}>
            <p style={{ fontFamily: "'DM Mono',monospace", fontSize: 11, fontWeight: 600, letterSpacing: "1.8px", textTransform: "uppercase", color: ACCENT + "cc", marginBottom: 10 }}>
              From the desk of the GCSO
            </p>
            <h2 style={{ fontSize: 28, fontWeight: 900, color: NAVY, letterSpacing: "-0.5px", lineHeight: 1.2 }}>
              A letter from<br />Chacko Thomas
            </h2>
            <DefinerBar />

            <div style={{ margin: "32px 0 24px" }}>
              <div style={{ fontSize: 72, lineHeight: 0.6, color: ACCENT + "30", fontFamily: "Georgia,serif", marginBottom: 20, marginLeft: -4 }}>"</div>
              <p style={{ fontFamily: "'Playfair Display',Georgia,serif", fontSize: 19, fontStyle: "italic", color: NAVY, lineHeight: 1.72, marginBottom: 20 }}>
                Volunteering has always been integral to the Tata ethos — not as an act separate from business, but as a way of staying closely connected to communities, realities, and responsibilities that shape our shared future.
              </p>
            </div>

            <p style={{ fontSize: 15, color: "#475569", lineHeight: 1.82, marginBottom: 16 }}>
              Across the Tata Group, volunteering continues to evolve from acts of compassion to expressions of thoughtful engagement, where time, skills, and intent come together to create meaningful outcomes.
            </p>
            <p style={{ fontSize: 15, color: "#475569", lineHeight: 1.82, marginBottom: 16 }}>
              Through Tata Engage, we see this spirit come alive every day — in Tata colleagues, family members and retirees choosing to step forward, to contribute consistently, and to work alongside communities with empathy and purpose.
            </p>
            <p style={{ fontSize: 15, color: "#475569", lineHeight: 1.82, marginBottom: 16 }}>
              What makes this journey especially powerful is the diversity of ways in which Tata volunteers engage. From large, collective movements to deeply personal initiatives; from hands-on volunteering to skill-based problem solving — each form of engagement strengthens our understanding of impact and reinforces the belief that sustainable progress is built through participation. As we look ahead, our aspiration is to continue nurturing this culture — one that enables action, learning, and recognises that lasting change often begins with individuals choosing to engage, again and again.
            </p>
            <p style={{ fontSize: 15, color: "#475569", lineHeight: 1.82 }}>
              Tata Engage remains a vital platform in this journey — not just as an enabler of volunteering, but as a reflection of who we are as a Group: committed, compassionate, and connected by a shared sense of purpose.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Main ──────────────────────────────────────────────────────────────────────
export default function GCSOView() {
  return (
    <div className="dot-grid-bg" style={{ background: "transparent", minHeight: "100vh", fontFamily: "'DM Sans',sans-serif", paddingTop: 64 }}>
      <SubPageDotRail sections={SECTIONS} accentColour={ACCENT} />
      <Hero />
      <LetterSection />
    </div>
  );
}
