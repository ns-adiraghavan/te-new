import { useState, useEffect, useRef } from "react";
import { useAppNavigate } from "@/hooks/useAppNavigate";
import { useAuth } from "@/context/AuthContext";
import SubPageDotRail from "@/components/shared/SubPageDotRail";

// ── Tokens ────────────────────────────────────────────────────────────────────
const ACCENT_NAVY  = "#0D1B3E";
const COLOUR       = "#2A7A4F"; // Green accent for TSM
const COLOUR_MID   = "#1F5C3B";
const COLOUR_LIGHT = "#E8F5EE";

const SECTIONS = [
  { id: "tsm-overview",      label: "Overview" },
  { id: "tsm-aims",          label: "Aims" },
  { id: "tsm-2024",          label: "2024 Edition" },
  { id: "tsm-participate",   label: "How to participate" },
];

const DIAG: React.CSSProperties = {
  position: "absolute", inset: 0,
  backgroundImage: "repeating-linear-gradient(45deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
  backgroundSize: "28px 28px",
  pointerEvents: "none",
};

const PARTICIPATE_CARDS = [
  { title: "DIY Activities", desc: "Access the Do It Yourself ideas using the DIY KIT — take action independently at your own pace" },
  { title: "Company Activities", desc: "Participate in company curated activities. Reach out to your company's CSR/Volunteering SPOC for more information" },
  { title: "Tata Engage Opportunities", desc: "Participate in Tata Engage facilitated 'One Tata' volunteering opportunities across the month" },
];

const THEME_CHIPS = [
  "Demystifying Sustainability",
  "Decarbonization",
  "Resource Efficiency",
  "Biodiversity"
];

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
export default function TataSmView() {
  const navigate = useAppNavigate();
  const { isLoggedIn } = useAuth();

  return (
    <div className="dot-grid-bg" style={{ background: "transparent", minHeight: "100vh", position: "relative" }}>

      {/* Sticky top accent stripe */}
      <div style={{ height: 4, background: COLOUR, position: "sticky", top: 0, zIndex: 100 }} />

      <SubPageDotRail sections={SECTIONS} />

      {/* ════════════════════ HERO ════════════════════ */}
      <div style={{ position: "relative", minHeight: "92vh", overflow: "hidden", display: "flex", alignItems: "center" }}>
        <img src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=1800"
          alt="" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "center" }} referrerPolicy="no-referrer" />
        <div style={{ position: "absolute", inset: 0, background: `linear-gradient(108deg, ${COLOUR}f5 0%, ${COLOUR}e8 28%, ${COLOUR}b0 52%, ${COLOUR}50 70%, ${COLOUR}18 100%)` }} />
        <div style={DIAG} />
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 80, background: "linear-gradient(to bottom, transparent, #fff)", pointerEvents: "none" }} />

        <div style={{ position: "relative", zIndex: 1, maxWidth: 1100, margin: "0 auto", padding: "120px 56px 96px", width: "100%" }}>
          <div style={{ maxWidth: 560 }}>
            <p style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, fontWeight: 600, letterSpacing: "2.2px", textTransform: "uppercase", color: "rgba(255,255,255,0.5)", marginBottom: 16 }}>
              Annual Initiative · Every June
            </p>
            <div style={{ width: 32, height: 2, background: "rgba(255,255,255,0.45)", borderRadius: 2, marginBottom: 22 }} />
            <h1 style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "clamp(2.8rem, 5.5vw, 4.2rem)", fontWeight: 900, color: "#fff", lineHeight: 1.02, letterSpacing: "-2px", margin: "0 0 22px", whiteSpace: "pre-line" }}>
              {"Tata\nSustainability\nMonth"}
            </h1>
            <p style={{ fontSize: 15, fontWeight: 300, lineHeight: 1.8, color: "rgba(255,255,255,0.78)", margin: "0 0 44px", maxWidth: 460 }}>
              An annual initiative led by the Tata Sustainability Group to deepen the understanding of sustainability among employees across Tata companies. Each June, TSM catalyzes actions and learning.
            </p>
            <div style={{ display: "flex", gap: 12 }}>
              <button onClick={() => navigate(isLoggedIn ? "dashboard" : "register-role")}
                style={{ background: "#2A7A4F", color: "#fff", border: "none", borderRadius: 10, padding: "12px 26px", fontWeight: 800, fontSize: 14, cursor: "pointer", boxShadow: "0 4px 20px rgba(0,0,0,0.25)" }}>
                Explore Opportunities →
              </button>
              <button onClick={() => document.getElementById("tsm-overview")?.scrollIntoView({ behavior: "smooth" })}
                style={{ background: "rgba(255,255,255,0.11)", color: "#fff", border: "1.5px solid rgba(255,255,255,0.26)", borderRadius: 10, padding: "12px 22px", fontWeight: 600, fontSize: 14, cursor: "pointer" }}>
                Learn more
              </button>
            </div>
          </div>
        </div>

        <div style={{ position: "absolute", bottom: 100, right: 56, background: "rgba(0,0,0,0.28)", backdropFilter: "blur(8px)", border: "1px solid rgba(255,255,255,0.18)", borderRadius: 100, padding: "7px 18px", fontFamily: "'DM Mono', monospace", fontSize: 10, fontWeight: 600, letterSpacing: "1.5px", textTransform: "uppercase", color: "rgba(255,255,255,0.7)" }}>
          Annual · June · Group-wide
        </div>
      </div>

      {/* ════════════════════ OVERVIEW ════════════════════ */}
      <section id="tsm-overview" style={{ padding: "88px 56px", background: "transparent" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 72, alignItems: "center" }}>
          <div>
            <p style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, fontWeight: 600, letterSpacing: "1.8px", textTransform: "uppercase", color: COLOUR + "cc", marginBottom: 10 }}>About TSM</p>
            <h2 style={{ fontSize: 32, fontWeight: 900, color: ACCENT_NAVY, letterSpacing: "-0.5px" }}>Sustainability — understood, embraced, acted upon</h2>
            <DefinerBar colour={COLOUR} />
            <div style={{ marginTop: 28 }}>
              <p style={{ fontSize: 16, color: "#475569", lineHeight: 1.82, marginBottom: 16 }}>
                Tata Sustainability Month (TSM) is the Tata Group's flagship annual movement to inspire, enable, and embed sustainability into everyday choices — at work and at home.
              </p>
              <p style={{ fontSize: 16, color: "#475569", lineHeight: 1.82, marginBottom: 16 }}>
                Led by the Tata Sustainability Group, TSM brings together Tata employees across companies every June to deepen understanding, demonstrate how individuals and businesses can make sustainable impact, and inspire colleagues to translate intent into action.
              </p>
              <p style={{ fontSize: 16, color: "#475569", lineHeight: 1.82 }}>
                Through engaging campaigns, learning resources, and volunteering opportunities, TSM empowers individuals to recognise how small, mindful actions can collectively drive meaningful progress towards sustainable development.
              </p>
            </div>
          </div>
          <div style={{ position: "relative" }}>
            <div style={{ position: "absolute", top: -16, right: -16, zIndex: 0, width: 64, height: 64, borderRadius: 16, background: COLOUR, opacity: 0.12 }} />
            <div style={{ borderRadius: 18, overflow: "hidden", boxShadow: "0 4px 32px rgba(0,0,0,0.10)", position: "relative", zIndex: 1 }}>
              <img src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=900" alt=""
                style={{ width: "100%", height: 380, objectFit: "cover", display: "block" }} referrerPolicy="no-referrer" />
            </div>
            <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 4, background: COLOUR, borderRadius: "0 0 18px 18px", zIndex: 2 }} />
          </div>
        </div>
      </section>

      {/* ════════════════════ TSM AIMS ════════════════════ */}
      <section id="tsm-aims" style={{ padding: "88px 56px", background: "transparent" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <p style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, fontWeight: 600, letterSpacing: "1.8px", textTransform: "uppercase", color: COLOUR + "cc", marginBottom: 10 }}>Our Purpose</p>
          <h2 style={{ fontSize: 30, fontWeight: 900, color: ACCENT_NAVY, letterSpacing: "-0.5px" }}>TSM aims to</h2>
          <DefinerBar colour={COLOUR} />
          <div style={{ marginTop: 56, display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }}>
            <div style={{ background: "#fff", borderRadius: 16, padding: 32, boxShadow: "0 2px 12px rgba(0,0,0,0.06)", border: "1px solid #e2e8f0" }}>
              <div style={{ fontSize: 17, fontWeight: 800, color: ACCENT_NAVY, marginBottom: 12 }}>Unpack 'sustainability'</div>
              <div style={{ fontSize: 14, color: "#64748B", lineHeight: 1.7 }}>To have a common understanding of the term and what it means for the Tata group.</div>
            </div>
            <div style={{ background: "#fff", borderRadius: 16, padding: 32, boxShadow: "0 2px 12px rgba(0,0,0,0.06)", border: "1px solid #e2e8f0" }}>
              <div style={{ fontSize: 17, fontWeight: 800, color: ACCENT_NAVY, marginBottom: 12 }}>Mainstream sustainability</div>
              <div style={{ fontSize: 14, color: "#64748B", lineHeight: 1.7 }}>And position it at the heart of business, by disseminating attributes of Tata sustainability policy, philosophy, principles and commitments.</div>
            </div>
            <div style={{ background: "#fff", borderRadius: 16, padding: 32, boxShadow: "0 2px 12px rgba(0,0,0,0.06)", border: "1px solid #e2e8f0" }}>
              <div style={{ fontSize: 17, fontWeight: 800, color: ACCENT_NAVY, marginBottom: 12 }}>Inspire colleagues</div>
              <div style={{ fontSize: 14, color: "#64748B", lineHeight: 1.7 }}>To take this understanding to the next level and to bring about a change in their lives through sustainable actions, making sustainability a habit.</div>
            </div>
          </div>
        </div>
      </section>

      <section id="tsm-2024" style={{ position: "relative", overflow: "hidden", minHeight: 480 }}>
        <img src="https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&q=80&w=1800" alt=""
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 40%" }} referrerPolicy="no-referrer" />
        <div style={{ position: "absolute", inset: 0, background: `linear-gradient(110deg, ${COLOUR}f8 0%, ${COLOUR}e0 38%, ${COLOUR}c0 58%, ${COLOUR}88 78%, ${COLOUR}44 100%)` }} />
        <div style={DIAG} />
        <div style={{ position: "relative", zIndex: 1, padding: "88px 56px" }}>
          <div style={{ maxWidth: 1100, margin: "0 auto" }}>
            <p style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, fontWeight: 600, letterSpacing: "1.8px", textTransform: "uppercase", color: "rgba(255,255,255,0.5)", marginBottom: 10 }}>2024 Edition</p>
            <h2 style={{ fontSize: 30, fontWeight: 900, color: "#fff", letterSpacing: "-0.5px" }}>2024 Edition: Smart LiFE</h2>
            <div style={{ height: 3, background: "rgba(255,255,255,0.28)", borderRadius: 2, width: 48, marginTop: 10, marginBottom: 36 }} />
            <p style={{ fontSize: 15, color: "rgba(255,255,255,0.85)", lineHeight: 1.8, maxWidth: 720, marginBottom: 28 }}>
              The 2024 edition of Tata Sustainability Month is "Smart LiFE" — emphasising a Smart Lifestyle for Environment, inviting Tata employees to take small and decisive steps to imbibe a more sustainable lifestyle.
            </p>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              {THEME_CHIPS.map((chip) => (
                <span key={chip} style={{ fontSize: 12, fontWeight: 600, padding: "8px 16px", borderRadius: 100, background: "rgba(255,255,255,0.15)", border: "1px solid rgba(255,255,255,0.25)", color: "#fff" }}>
                  {chip}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════ HOW TO PARTICIPATE ════════════════════ */}
      <section id="tsm-participate" style={{ padding: "88px 56px", background: "#f5f5fa" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <p style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, fontWeight: 600, letterSpacing: "1.8px", textTransform: "uppercase", color: COLOUR + "cc", marginBottom: 10 }}>Get involved</p>
          <h2 style={{ fontSize: 30, fontWeight: 900, color: ACCENT_NAVY, letterSpacing: "-0.5px" }}>Join 1 million+ Tata colleagues</h2>
          <DefinerBar colour={COLOUR} />
          <div style={{ marginTop: 56, display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }}>
            {PARTICIPATE_CARDS.map((card, i) => (
              <div key={i} style={{ background: "#fff", borderRadius: 16, padding: 32, boxShadow: "0 2px 12px rgba(0,0,0,0.06)", border: "1px solid #e2e8f0" }}>
                <div style={{ width: 48, height: 48, borderRadius: 12, background: COLOUR_LIGHT, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 20, fontSize: 20, fontWeight: 700, color: COLOUR }}>
                  {String(i + 1).padStart(2, '0')}
                </div>
                <div style={{ fontSize: 17, fontWeight: 800, color: ACCENT_NAVY, marginBottom: 10 }}>{card.title}</div>
                <div style={{ fontSize: 14, color: "#64748B", lineHeight: 1.7 }}>{card.desc}</div>
              </div>
            ))}
          </div>

          {/* CTA Section */}
          <div style={{ marginTop: 64, textAlign: "center" }}>
            <button onClick={() => navigate(isLoggedIn ? "dashboard" : "register-role")}
              style={{ background: COLOUR, color: "#fff", border: "none", borderRadius: 10, padding: "14px 32px", fontWeight: 800, fontSize: 15, cursor: "pointer", boxShadow: "0 4px 20px rgba(0,0,0,0.25)" }}>
              Explore Volunteering Opportunities →
            </button>
            <p style={{ fontSize: 13, color: "#64748B", marginTop: 16 }}>
              For queries, reach out to <a href="mailto:tataengage@tata.com" style={{ color: COLOUR, textDecoration: "none", fontWeight: 600 }}>tataengage@tata.com</a>
            </p>
          </div>
        </div>
      </section>

      
    </div>
  );
}
