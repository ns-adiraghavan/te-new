import { useState, useEffect, useRef } from "react";
import { useAppNavigate } from "@/hooks/useAppNavigate";
import { useAuth } from "@/context/AuthContext";
import SubPageDotRail from "@/components/shared/SubPageDotRail";

// ── Tokens ────────────────────────────────────────────────────────────────────
const ACCENT_NAVY  = "#0D1B3E";
const B_MUSTARD    = "#C8940A";
const COLOUR       = "#333399"; // B_INDIGO
const COLOUR_MID   = "#252573";
const COLOUR_LIGHT = "#EEF0FF";

const SECTIONS = [
  { id: "eoi-overview", label: "Overview"            },
  { id: "eoi-who",      label: "Who can participate" },
  { id: "eoi-featured", label: "Featured EOI"        },
];

const DIAG: React.CSSProperties = {
  position: "absolute", inset: 0,
  backgroundImage: "repeating-linear-gradient(45deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
  backgroundSize: "28px 28px",
  pointerEvents: "none",
};



// ── DefinerBar ────────────────────────────────────────────────────────────────
function DefinerBar({ colour }: { colour: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [on, setOn] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setOn(true); }, { threshold: 0.4 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return (
    <div ref={ref} style={{ height: 3, background: "#e8e8f0", borderRadius: 2, overflow: "hidden", width: 48, marginTop: 10 }}>
      <div style={{ height: "100%", background: colour, borderRadius: 2, transition: "width 0.65s cubic-bezier(0.22,1,0.36,1)", width: on ? "100%" : "0%" }} />
    </div>
  );
}

// ── Component ─────────────────────────────────────────────────────────────────
export default function EOIView() {
  const navigate = useAppNavigate();
  const { isLoggedIn } = useAuth();

  return (
    <div style={{ background: "#fff", minHeight: "100vh", position: "relative" }}>

      {/* Sticky top accent stripe */}
      <div style={{ height: 4, background: COLOUR, position: "fixed", top: 64, left: 0, right: 0, zIndex: 100 }} />

      <SubPageDotRail sections={SECTIONS} />

      {/* ════════════════════ HERO ════════════════════ */}
      <div style={{ position: "relative", minHeight: "92vh", overflow: "hidden", display: "flex", alignItems: "center", paddingTop: 64 }}>
        <img src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&q=80&w=1800"
          alt="" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "center" }} referrerPolicy="no-referrer" />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(155deg, rgba(8,12,22,0.62) 0%, rgba(8,12,22,0.38) 100%)" }} />
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 80, background: "linear-gradient(to bottom, transparent, #fff)", pointerEvents: "none" }} />

        <div style={{ position: "relative", zIndex: 1, maxWidth: 1100, margin: "0 auto", padding: "0 64px", width: "100%" }}>
          <div style={{ maxWidth: 600 }}>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, fontWeight: 800, letterSpacing: "2.5px", textTransform: "uppercase", color: "rgba(255,255,255,0.5)", margin: "0 0 12px" }}>
              Employee Initiative · Year-round
            </p>
            <div style={{ width: 48, height: 2, background: "rgba(255,255,255,0.6)", borderRadius: 2, margin: "12px 0 22px" }} />
            <h1 style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "clamp(2.4rem, 5vw, 3.8rem)", fontWeight: 400, color: "#fff", lineHeight: 1.12, letterSpacing: "-0.5px", margin: "0 0 22px" }}>
              Employees' Own Initiatives
            </h1>
            <p style={{ fontSize: 15, fontWeight: 300, lineHeight: 1.8, color: "rgba(255,255,255,0.78)", margin: "0 0 44px", maxWidth: 520 }}>
              EOI enables Tata employees to pursue personal volunteering efforts beyond formal company-led programmes, with the organisation playing a supportive and enabling role.
            </p>
            <div style={{ display: "flex", gap: 12 }}>
              <button onClick={() => document.getElementById("eoi-overview")?.scrollIntoView({ behavior: "smooth" })}
                style={{ background: B_MUSTARD, color: "#fff", border: "none", borderRadius: 10, padding: "12px 26px", fontWeight: 800, fontSize: 14, cursor: "pointer", boxShadow: "0 4px 20px rgba(0,0,0,0.25)" }}>
                Learn more →
              </button>
              <button onClick={() => document.getElementById("eoi-featured")?.scrollIntoView({ behavior: "smooth" })}
                style={{ background: "rgba(255,255,255,0.11)", color: "#fff", border: "1.5px solid rgba(255,255,255,0.26)", borderRadius: 10, padding: "12px 22px", fontWeight: 600, fontSize: 14, cursor: "pointer" }}>
                Featured EOI
              </button>
            </div>
          </div>
        </div>

        <div style={{ position: "absolute", bottom: 100, right: 56, background: "rgba(0,0,0,0.28)", backdropFilter: "blur(8px)", border: "1px solid rgba(255,255,255,0.18)", borderRadius: 100, padding: "7px 18px", fontFamily: "'DM Sans', sans-serif", fontSize: 10, fontWeight: 700, letterSpacing: "1.5px", textTransform: "uppercase", color: "rgba(255,255,255,0.75)" }}>
          Personal · Flexible · Empowering
        </div>
      </div>

      {/* ════════════════════ OVERVIEW ════════════════════ */}
      <section id="eoi-overview" style={{ padding: "88px 56px", background: "#fff" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 72, alignItems: "center" }}>
          <div>
            <p style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, fontWeight: 600, letterSpacing: "1.8px", textTransform: "uppercase", color: COLOUR + "cc", marginBottom: 10 }}>What is EOI?</p>
            <h2 style={{ fontSize: 32, fontWeight: 900, color: ACCENT_NAVY, letterSpacing: "-0.5px" }}>Volunteer in your own way, for causes you care about</h2>
            <DefinerBar colour={COLOUR} />
            <div style={{ marginTop: 28 }}>
              <p style={{ fontSize: 16, color: "#475569", lineHeight: 1.82, marginBottom: 16 }}>
                Employees' Own Initiatives (EOI) enable Tata employees to pursue personal volunteering efforts beyond formal company-led volunteering programmes, with the organisation playing a supportive and enabling role.
              </p>
              <p style={{ fontSize: 16, color: "#475569", lineHeight: 1.82 }}>
                EOI empowers employees to volunteer in their own time, in their own way, for causes and communities they deeply care about — whether at the local, national, or global level. Introduced during the pandemic, EOI emerged as a vital way for employees to respond to community needs with agility, empathy, and initiative.
              </p>
            </div>
          </div>
          <div style={{ position: "relative" }}>
            <div style={{ position: "absolute", top: -16, right: -16, zIndex: 0, width: 64, height: 64, borderRadius: 16, background: COLOUR, opacity: 0.12 }} />
            <div style={{ borderRadius: 18, overflow: "hidden", boxShadow: "0 4px 32px rgba(0,0,0,0.10)", position: "relative", zIndex: 1 }}>
              <img src="https://images.unsplash.com/photo-1497486751825-1233686d5d80?auto=format&fit=crop&q=80&w=900" alt=""
                style={{ width: "100%", height: 380, objectFit: "cover", display: "block" }} referrerPolicy="no-referrer" />
            </div>
            <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 4, background: COLOUR, borderRadius: "0 0 18px 18px", zIndex: 2 }} />
          </div>
        </div>
      </section>

      {/* ════════════════════ WHO ════════════════════ */}
      <section id="eoi-who" style={{ padding: "88px 56px", background: "#f5f5fa" }}>
        <div style={{ maxWidth: 900, margin: "0 auto", textAlign: "center" }}>
          <p style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, fontWeight: 600, letterSpacing: "1.8px", textTransform: "uppercase", color: COLOUR + "cc", marginBottom: 10 }}>Eligibility</p>
          <h2 style={{ fontSize: 32, fontWeight: 900, color: ACCENT_NAVY, letterSpacing: "-0.5px", margin: "0 0 14px" }}>Who can participate?</h2>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <DefinerBar colour={COLOUR} />
          </div>
          <p style={{ fontSize: 17, color: "#475569", lineHeight: 1.82, marginTop: 32, maxWidth: 760, margin: "32px auto 0" }}>
            Any Tata Group employee can pursue an EOI. The organisation plays a supportive and enabling role — recognising and endorsing individual efforts that reflect Tata's values of service and social responsibility.
          </p>
        </div>
      </section>

      {/* ════════════════════ FEATURED EOI ════════════════════ */}
      <section id="eoi-featured" style={{ padding: "88px 56px", background: "#fff" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <p style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, fontWeight: 600, letterSpacing: "1.8px", textTransform: "uppercase", color: COLOUR + "cc", marginBottom: 10 }}>Featured EOI</p>
          <h2 style={{ fontSize: 32, fontWeight: 900, color: ACCENT_NAVY, letterSpacing: "-0.5px" }}>Each One Empowers One</h2>
          <DefinerBar colour={COLOUR} />

          <div style={{ marginTop: 40, background: COLOUR_LIGHT, borderRadius: 20, padding: "40px 44px", border: `1px solid ${COLOUR}22`, display: "grid", gridTemplateColumns: "1.2fr 0.8fr", gap: 48, alignItems: "center" }}>
            <div>
              <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, fontWeight: 700, letterSpacing: "1.8px", textTransform: "uppercase", color: COLOUR, marginBottom: 14 }}>TCS · Digital Literacy Platform</div>
              <p style={{ fontSize: 16, color: "#334155", lineHeight: 1.82, marginBottom: 16 }}>
                One very impactful, flexible, and easy-to-use EOI opportunity that every Tata Group employee can explore is <strong>"Each One Empowers One"</strong> — TCS's intuitive digital literacy platform for the people, by the people.
              </p>
              <p style={{ fontSize: 16, color: "#475569", lineHeight: 1.82 }}>
                The platform enables any individual to empower another by providing financial and digital literacy while unlocking citizen entitlements — accessible in 9 Indian languages.
              </p>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <button
                onClick={() => navigate("eoeo")}
                style={{ background: COLOUR, color: "#fff", border: "none", borderRadius: 10, padding: "14px 24px", fontWeight: 800, fontSize: 14, cursor: "pointer", boxShadow: `0 4px 20px ${COLOUR}40` }}
              >
                Explore Each One Empowers One →
              </button>
              <div style={{ fontSize: 12, color: "#64748B", textAlign: "center" }}>
                Financial · Digital · Functional Literacy · 9 Indian Languages
              </div>
            </div>
          </div>
        </div>
      </section>

      
    </div>
  );
}
