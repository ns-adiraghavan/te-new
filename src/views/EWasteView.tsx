import { useState, useEffect, useRef } from "react";
import { useAppNavigate } from "@/hooks/useAppNavigate";
import { useAuth } from "@/context/AuthContext";
import SubPageDotRail from "@/components/shared/SubPageDotRail";

// ── Tokens ────────────────────────────────────────────────────────────────────
const ACCENT_NAVY  = "#0D1B3E";
const COLOUR       = "#333399"; // Tata Blue
const COLOUR_MID   = "#252573";
const COLOUR_LIGHT = "#EEF0FF";

const SECTIONS = [
  { id: "ewaste-overview", label: "Overview" },
  { id: "ewaste-why",      label: "Why volunteer" },
  { id: "ewaste-who",      label: "Who can join" },
  { id: "ewaste-howto",    label: "How to start" },
];

const DIAG: React.CSSProperties = {
  position: "absolute", inset: 0,
  backgroundImage: "repeating-linear-gradient(45deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
  backgroundSize: "28px 28px",
  pointerEvents: "none",
};



const WHY_CARDS = [
  { desc: "Reduce the hazardous impact of unsafe electronic waste disposal on the environment" },
  { desc: "Create mass awareness on what electronic waste is and what measures must be taken" },
  { desc: "Build consciousness and behaviour change amongst civil society to reduce, reuse, and recycle e-waste" },
];

const STEPS = [
  { num: "01", title: "Collect e-waste", desc: "Collect your e-waste — old phones, chargers, cables, laptops, tablets" },
  { num: "02", title: "Drop off", desc: "Drop off at any Croma retail store near you" },
  { num: "03", title: "Recycled responsibly", desc: "Your e-waste is responsibly recycled through authorised partners" },
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
export default function EWasteView() {
  const navigate = useAppNavigate();
  const { isLoggedIn } = useAuth();

  return (
    <div className="dot-grid-bg" style={{ background: "transparent", minHeight: "100vh", position: "relative" }}>

      <SubPageDotRail sections={SECTIONS} />

      {/* ════════════════════ HERO ════════════════════ */}
      <div style={{ position: "relative", minHeight: "92vh", overflow: "hidden", display: "flex", alignItems: "center", paddingTop: 64 }}>
        <img src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&q=80&w=1800"
          alt="" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "center" }} referrerPolicy="no-referrer" />
        <div style={{ position: "absolute", inset: 0, background: `linear-gradient(110deg, ${COLOUR}e8 0%, ${COLOUR}cc 38%, ${COLOUR}aa 58%, ${COLOUR}77 78%, ${COLOUR}44 100%)` }} />

        <div style={{ position: "relative", zIndex: 1, maxWidth: 1100, margin: "0 auto", padding: "0 64px", width: "100%" }}>
          <div style={{ maxWidth: 620 }}>
            <p style={{ fontFamily: "'DM Sans','Noto Sans',ui-sans-serif,system-ui,sans-serif", fontSize: 14, fontWeight: 700, letterSpacing: "1.8px", textTransform: "uppercase", color: "#ffffff", margin: "0 0 12px" }}>
              Employee Initiative · Year-round
            </p>
            <div style={{ width: 44, height: 3, background: "rgba(255,255,255,0.55)", borderRadius: 2, marginBottom: 28 }} />
            <h1 style={{ fontFamily: "'DM Sans','Noto Sans',ui-sans-serif,system-ui,sans-serif", fontSize: "clamp(2.4rem, 5vw, 3.8rem)", fontWeight: 400, color: "#fff", lineHeight: 1.12, letterSpacing: "-0.5px", margin: "0 0 28px", whiteSpace: "pre-line" }}>
              {"E-Waste\nWarrior\nProgramme"}
            </h1>
            <p style={{ fontSize: 15, fontWeight: 300, lineHeight: 1.7, color: "rgba(255,255,255,0.65)", margin: "0 0 48px", maxWidth: 540 }}>
              Step up to Recycle and Reboot. Electronic waste is a growing concern — India is the 3rd largest e-waste generator in the world. Be part of the movement.
            </p>
            <div style={{ display: "flex", gap: 14 }}>
              <button onClick={() => navigate(isLoggedIn ? "dashboard" : "register-role")}
                style={{ background: "#333399", color: "#fff", border: "none", borderRadius: 10, padding: "14px 28px", fontWeight: 800, fontSize: 14, cursor: "pointer", boxShadow: "0 4px 20px rgba(0,0,0,0.25)" }}>
                Become a Warrior →
              </button>
              <button onClick={() => document.getElementById("ewaste-overview")?.scrollIntoView({ behavior: "smooth" })}
                style={{ background: "rgba(255,255,255,0.12)", color: "#fff", border: "1.5px solid rgba(255,255,255,0.28)", borderRadius: 10, padding: "14px 22px", fontWeight: 600, fontSize: 14, cursor: "pointer" }}>
                Learn more
              </button>
            </div>
          </div>
        </div>

        <div style={{ position: "absolute", bottom: 100, right: 56, background: "rgba(0,0,0,0.28)", backdropFilter: "blur(8px)", border: "1px solid rgba(255,255,255,0.18)", borderRadius: 100, padding: "7px 18px", fontFamily: "'DM Sans','Noto Sans',ui-sans-serif,system-ui,sans-serif", fontSize: 14, fontWeight: 700, letterSpacing: "1.8px", textTransform: "uppercase", color: "#ffffff" }}>
          Employee Initiative · Croma × Infiniti Retail
        </div>
      </div>

      {/* ════════════════════ OVERVIEW ════════════════════ */}
      <section id="ewaste-overview" style={{ padding: "88px 56px", background: "transparent" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 72, alignItems: "center" }}>
          <div>
            <p style={{ fontFamily: "'DM Sans','Noto Sans',ui-sans-serif,system-ui,sans-serif", fontSize: 14, fontWeight: 700, letterSpacing: "1.8px", textTransform: "uppercase", color: COLOUR + "cc", marginBottom: 10 }}>About the programme</p>
            <h2 style={{ fontSize: 30, fontWeight: 900, color: ACCENT_NAVY, letterSpacing: "-0.5px" }}>Recycle. Reboot. Make a difference.</h2>
            <DefinerBar colour={COLOUR} />
            <div style={{ marginTop: 28 }}>
              <p style={{ fontSize: 15, color: "#475569", lineHeight: 1.82, marginBottom: 16 }}>
                Electronic waste is a growing concern across the world. India is the 3rd largest e-waste generator in the world with poor recycling rates. By 2030, global e-waste generation is estimated to touch 82 billion kg. There is an urgent need to address this issue, keeping in view the Group goal of ensuring zero waste goes to landfill by 2030.
              </p>
              <p style={{ fontSize: 15, color: "#475569", lineHeight: 1.82 }}>
                Infiniti Retail has launched a campaign to educate, empower, and encourage Tata Group employees to be a part of the E-Waste Awareness and Recycling Movement. E-waste dropped off at any Croma retail store will be responsibly recycled through authorised recycling partners.
              </p>
            </div>
          </div>
          <div style={{ position: "relative" }}>
            <div style={{ position: "absolute", top: -16, right: -16, zIndex: 0, width: 64, height: 64, borderRadius: 16, background: COLOUR, opacity: 0.12 }} />
            <div style={{ borderRadius: 18, overflow: "hidden", boxShadow: "0 4px 32px rgba(0,0,0,0.10)", position: "relative", zIndex: 1 }}>
              <img src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&q=80&w=900" alt=""
                style={{ width: "100%", height: 380, objectFit: "cover", display: "block" }} referrerPolicy="no-referrer" />
            </div>
            <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 4, background: COLOUR, borderRadius: "0 0 18px 18px", zIndex: 2 }} />
          </div>
        </div>
      </section>

      {/* ════════════════════ WHY VOLUNTEER ════════════════════ */}
      <section id="ewaste-why" style={{ position: "relative", overflow: "hidden", minHeight: 480 }}>
        <img src="https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&q=80&w=1800" alt=""
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 40%" }} referrerPolicy="no-referrer" />
        <div style={{ position: "absolute", inset: 0, background: `linear-gradient(110deg, ${COLOUR}e8 0%, ${COLOUR}cc 38%, ${COLOUR}aa 58%, ${COLOUR}77 78%, ${COLOUR}44 100%)` }} />
        <div style={{ position: "relative", zIndex: 1, padding: "88px 56px" }}>
          <div style={{ maxWidth: 1100, margin: "0 auto" }}>
            <p style={{ fontFamily: "'DM Sans','Noto Sans',ui-sans-serif,system-ui,sans-serif", fontSize: 14, fontWeight: 700, letterSpacing: "1.8px", textTransform: "uppercase", color: "#ffffff", marginBottom: 10 }}>Impact</p>
            <h2 style={{ fontSize: 30, fontWeight: 900, color: "#fff", letterSpacing: "-0.5px" }}>Why become an E-Waste Warrior?</h2>
            <div style={{ height: 3, background: "rgba(255,255,255,0.28)", borderRadius: 2, width: 48, marginTop: 10, marginBottom: 36 }} />
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }}>
              {WHY_CARDS.map((card, i) => (
                <div key={i} style={{ background: "rgba(255,255,255,0.10)", backdropFilter: "blur(8px)", border: "1px solid rgba(255,255,255,0.18)", borderRadius: 16, padding: 28 }}>
                  <div style={{ fontSize: 15, color: "#fff", lineHeight: 1.7 }}>{card.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════ WHO CAN JOIN ════════════════════ */}
      <section id="ewaste-who" style={{ padding: "88px 56px", background: "transparent" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 72, alignItems: "center" }}>
          <div>
            <p style={{ fontFamily: "'DM Sans','Noto Sans',ui-sans-serif,system-ui,sans-serif", fontSize: 14, fontWeight: 700, letterSpacing: "1.8px", textTransform: "uppercase", color: COLOUR + "cc", marginBottom: 10 }}>Eligibility</p>
            <h2 style={{ fontSize: 30, fontWeight: 900, color: ACCENT_NAVY, letterSpacing: "-0.5px" }}>Who can participate?</h2>
            <DefinerBar colour={COLOUR} />
            <div style={{ marginTop: 28 }}>
              <p style={{ fontSize: 15, color: "#475569", lineHeight: 1.82 }}>
                Any Tata Group employee, retiree, and their family members can volunteer and become an E-Waste Warrior.
              </p>
            </div>
          </div>
          <div style={{ position: "relative" }}>
            <div style={{ position: "absolute", top: -16, right: -16, zIndex: 0, width: 64, height: 64, borderRadius: 16, background: COLOUR, opacity: 0.12 }} />
            <div style={{ borderRadius: 18, overflow: "hidden", boxShadow: "0 4px 32px rgba(0,0,0,0.10)", position: "relative", zIndex: 1 }}>
              <img src="https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&q=80&w=900" alt=""
                style={{ width: "100%", height: 380, objectFit: "cover", display: "block" }} referrerPolicy="no-referrer" />
            </div>
            <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 4, background: COLOUR, borderRadius: "0 0 18px 18px", zIndex: 2 }} />
          </div>
        </div>
      </section>

      {/* ════════════════════ HOW TO START ════════════════════ */}
      <section id="ewaste-howto" style={{ padding: "88px 56px", background: "#f5f5fa" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <p style={{ fontFamily: "'DM Sans','Noto Sans',ui-sans-serif,system-ui,sans-serif", fontSize: 14, fontWeight: 700, letterSpacing: "1.8px", textTransform: "uppercase", color: COLOUR + "cc", marginBottom: 10 }}>Get started</p>
          <h2 style={{ fontSize: 30, fontWeight: 900, color: ACCENT_NAVY, letterSpacing: "-0.5px" }}>How to get started</h2>
          <DefinerBar colour={COLOUR} />
          <div style={{ marginTop: 56, display: "flex", alignItems: "flex-start" }}>
            {STEPS.map((s, i) => (
              <>
                <div key={s.num} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", padding: "0 12px" }}>
                  <div style={{ width: 56, height: 56, borderRadius: "50%", background: i === 0 ? COLOUR : COLOUR_LIGHT, border: `2px solid ${COLOUR}`, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'DM Sans','Noto Sans',ui-sans-serif,system-ui,sans-serif", fontSize: 14, fontWeight: 700, color: i === 0 ? "#fff" : COLOUR, marginBottom: 20, flexShrink: 0, boxShadow: i === 0 ? `0 4px 16px ${COLOUR}40` : "none" }}>{s.num}</div>
                  <div style={{ fontSize: 15, fontWeight: 800, color: ACCENT_NAVY, marginBottom: 8, lineHeight: 1.2 }}>{s.title}</div>
                  <div style={{ fontSize: 13, color: "#64748B", lineHeight: 1.72 }}>{s.desc}</div>
                </div>
                {i < STEPS.length - 1 && (
                  <div style={{ display: "flex", alignItems: "flex-start", paddingTop: 18, flexShrink: 0 }}>
                    <svg width="32" height="20" viewBox="0 0 32 20" fill="none">
                      <line x1="0" y1="10" x2="26" y2="10" stroke={COLOUR} strokeWidth="1.5" strokeDasharray="4 3"/>
                      <polyline points="20,4 28,10 20,16" stroke={COLOUR} strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                )}
              </>
            ))}
          </div>

          {/* CTA Section */}
          <div style={{ marginTop: 64, textAlign: "center" }}>
            <a href="https://www.croma.com/store-locator" target="_blank" rel="noopener noreferrer"
              style={{ display: "inline-block", background: "transparent", color: COLOUR, border: `2px solid ${COLOUR}`, borderRadius: 10, padding: "14px 28px", fontWeight: 800, fontSize: 14, cursor: "pointer", textDecoration: "none", transition: "all 0.2s" }}>
              Find a Croma Store
            </a>
            <p style={{ fontSize: 13, color: "#64748B", marginTop: 16 }}>
              For communication collaterals, reach out to <a href="mailto:tataengage@tata.com" style={{ color: COLOUR, textDecoration: "none", fontWeight: 600 }}>tataengage@tata.com</a>
            </p>
          </div>
        </div>
      </section>

      
    </div>
  );
}
