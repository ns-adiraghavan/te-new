import { useState, useEffect, useRef } from "react";
import { useAppNavigate } from "@/hooks/useAppNavigate";
import { useAuth } from "@/context/AuthContext";
import Footer from "@/components/layout/Footer";
import SubPageDotRail from "@/components/shared/SubPageDotRail";

// ── Tokens ────────────────────────────────────────────────────────────────────
const ACCENT_NAVY  = "#0D1B3E";
const B_MUSTARD    = "#C8940A";
const COLOUR       = "#007A8A";
const COLOUR_MID   = "#005F6B";
const COLOUR_LIGHT = "#E6F5F7";

const SECTIONS = [
  { id: "dr-overview",  label: "Overview"    },
  { id: "dr-who",       label: "Cadre"       },
  { id: "dr-how",       label: "How it works" },
  { id: "dr-framework", label: "Framework"   },
  { id: "dr-tsg",       label: "TSG Role"    },
];

const DIAG: React.CSSProperties = {
  position: "absolute", inset: 0,
  backgroundImage: "repeating-linear-gradient(45deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
  backgroundSize: "28px 28px",
  pointerEvents: "none",
};

const STATS = [
  { num: "48h",    label: "Deployment target"              },
  { num: "100+",   label: "Deployed in TN Floods 2016"     },
  { num: "FY2016", label: "Framework adopted by TGSC"       },
];

const WHO = [
  { label: "Project Managers", icon: "📋", desc: "Bring knowledge and capability to manage large-scale disaster response initiatives. Volunteer commitment: 15–60 days on the ground." },
  { label: "Procurement Officers", icon: "🚚", desc: "Trained in emergency supply-chain management and logistics. Volunteer commitment: 15–60 days on the ground." },
  { label: "Core Volunteers", icon: "🤝", desc: "Spend 7–30 days in disaster-affected areas contributing to need assessments, logistics coordination, relief kit distribution, and support for medical camps and allied relief efforts." },
];

const STEPS = [
  { num: "01", title: "Volunteer pre-registers", desc: "Expressions of interest are invited from Tata employees registered on tataengage.com. Volunteers opt into the cadre and are shortlisted based on proximity to affected areas, local language knowledge, past field experience, and medical fitness.", time: "Ongoing" },
  { num: "02", title: "Alert is issued",          desc: "TSG identifies a disaster event requiring volunteer deployment and activates the One Tata Response protocol.", time: "Day 0" },
  { num: "03", title: "Cadre is notified",        desc: "Pre-registered volunteers in relevant geographies receive an immediate alert with deployment details.", time: "< 24h" },
  { num: "04", title: "Deployment & coordination", desc: "Volunteers are briefed, coordinated with local NGO partners, and deployed to affected communities.", time: "< 48h" },
];

const TIME_LABELS = ["Always active", "Trigger", "Notification sent", "Deployed"];

const PRINCIPLES = [
  { label: "Readiness",    desc: "Pre-registered cadre, always ready to be activated",                   icon: "🟢" },
  { label: "Speed",        desc: "Volunteer selection based on proximity, language, experience, and medical fitness.",                icon: "⚡" },
  { label: "Coordination", desc: "TSG-led, with local NGO partner integration on the ground",            icon: "🔗" },
  { label: "Coverage",     desc: "Multi-company mobilisation spanning geographies and borders",           icon: "🌏" },
];

const TSG_POINTS = [
  "Monitoring disaster situations across India and globally",
  "Activating the One Tata Response protocol",
  "Coordinating with local NGO partners on the ground",
  "Managing volunteer briefings and logistics",
  "Documenting response impact and learnings for future readiness",
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
export default function DisasterResponseView() {
  const navigate = useAppNavigate();
  const { isLoggedIn } = useAuth();

  return (
    <div style={{ background: "#fff", minHeight: "100vh", position: "relative" }}>

      {/* Sticky top accent stripe */}
      <div style={{ height: 4, background: COLOUR, position: "sticky", top: 0, zIndex: 100 }} />

      <SubPageDotRail sections={SECTIONS} />

      {/* ════════════════════ HERO ════════════════════ */}
      <div style={{ position: "relative", minHeight: "92vh", overflow: "hidden", display: "flex", alignItems: "center" }}>
        <img src="https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?auto=format&fit=crop&q=80&w=1800"
          alt="" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "center" }} referrerPolicy="no-referrer" />
        <div style={{ position: "absolute", inset: 0, background: `linear-gradient(108deg, ${COLOUR}f5 0%, ${COLOUR}e8 28%, ${COLOUR}b0 52%, ${COLOUR}50 70%, ${COLOUR}18 100%)` }} />
        <div style={DIAG} />
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 80, background: "linear-gradient(to bottom, transparent, #fff)", pointerEvents: "none" }} />

        <div style={{ position: "relative", zIndex: 1, maxWidth: 1100, margin: "0 auto", padding: "120px 56px 96px", width: "100%" }}>
          <div style={{ maxWidth: 560 }}>
            <p style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, fontWeight: 600, letterSpacing: "2.2px", textTransform: "uppercase", color: "rgba(255,255,255,0.5)", marginBottom: 16 }}>
              Emergency Volunteering · One Tata Response Framework
            </p>
            <div style={{ width: 32, height: 2, background: "rgba(255,255,255,0.45)", borderRadius: 2, marginBottom: 22 }} />
            <h1 style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "clamp(2.8rem, 5.5vw, 4.2rem)", fontWeight: 900, color: "#fff", lineHeight: 1.02, letterSpacing: "-2px", margin: "0 0 22px", whiteSpace: "pre-line" }}>
              {"Disaster\nResponse"}
            </h1>
            <p style={{ fontSize: 15, fontWeight: 300, lineHeight: 1.8, color: "rgba(255,255,255,0.78)", margin: "0 0 44px", maxWidth: 460 }}>
              When communities face a crisis — flood, cyclone, drought, or earthquake — the One Tata Response framework mobilises trained Tata volunteers within 48 hours. Rapid, organised, compassionate.
            </p>
            <div style={{ display: "flex", gap: 40, flexWrap: "wrap", marginBottom: 44, paddingBottom: 40, borderBottom: "1px solid rgba(255,255,255,0.12)" }}>
              {STATS.map((s) => (
                <div key={s.label}>
                  <div style={{ fontSize: 28, fontWeight: 900, color: "#fff", lineHeight: 1, letterSpacing: "-0.5px" }}>{s.num}</div>
                  <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, color: "rgba(255,255,255,0.5)", marginTop: 5 }}>{s.label}</div>
                </div>
              ))}
            </div>
            <div style={{ display: "flex", gap: 12 }}>
              <button onClick={() => navigate(isLoggedIn ? "dr-availability-form" : "register-role")}
                style={{ background: B_MUSTARD, color: "#fff", border: "none", borderRadius: 10, padding: "12px 26px", fontWeight: 800, fontSize: 14, cursor: "pointer", boxShadow: "0 4px 20px rgba(0,0,0,0.25)" }}>
                Join the Response Cadre →
              </button>
              <button onClick={() => document.getElementById("dr-overview")?.scrollIntoView({ behavior: "smooth" })}
                style={{ background: "rgba(255,255,255,0.11)", color: "#fff", border: "1.5px solid rgba(255,255,255,0.26)", borderRadius: 10, padding: "12px 22px", fontWeight: 600, fontSize: 14, cursor: "pointer" }}>
                Learn more
              </button>
            </div>
          </div>
        </div>

        <div style={{ position: "absolute", bottom: 100, right: 56, background: "rgba(0,0,0,0.28)", backdropFilter: "blur(8px)", border: "1px solid rgba(255,255,255,0.18)", borderRadius: 100, padding: "7px 18px", fontFamily: "'DM Mono', monospace", fontSize: 10, fontWeight: 600, letterSpacing: "1.5px", textTransform: "uppercase", color: "rgba(255,255,255,0.7)" }}>
          Rapid Action · One Tata Response
        </div>
      </div>

      {/* ════════════════════ OVERVIEW ════════════════════ */}
      <section id="dr-overview" style={{ padding: "88px 56px", background: "#fff" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 72, alignItems: "center" }}>
          <div>
            <p style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, fontWeight: 600, letterSpacing: "1.8px", textTransform: "uppercase", color: COLOUR + "cc", marginBottom: 10 }}>The Disaster Response Cadre</p>
            <h2 style={{ fontSize: 32, fontWeight: 900, color: ACCENT_NAVY, letterSpacing: "-0.5px" }}>Pre-registered, always ready</h2>
            <DefinerBar colour={COLOUR} />
            <div style={{ marginTop: 28 }}>
              <p style={{ fontSize: 16, color: "#475569", lineHeight: 1.82, marginBottom: 16 }}>
                Tata Engage's Disaster Response programme is not spontaneous — it is a pre-registered cadre of Tata volunteers who have indicated their willingness to be deployed rapidly when a crisis hits.
              </p>
              <p style={{ fontSize: 16, color: "#475569", lineHeight: 1.82 }}>
                Responding to humanitarian crises has always been integral to the Tata ethos. In moments of natural and humanitarian disasters, the Tata Engage platform serves as a vital channel to mobilise employees across the Group, enabling quick, coordinated volunteer action. Volunteers work closely alongside Project Managers, Procurement Officers, and Core Volunteers — each playing a defined role in the relief mission.
              </p>
            </div>
          </div>
          <div style={{ position: "relative" }}>
            <div style={{ position: "absolute", top: -16, right: -16, zIndex: 0, width: 64, height: 64, borderRadius: 16, background: COLOUR, opacity: 0.12 }} />
            <div style={{ borderRadius: 18, overflow: "hidden", boxShadow: "0 4px 32px rgba(0,0,0,0.10)", position: "relative", zIndex: 1 }}>
              <img src="https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&q=80&w=900" alt=""
                style={{ width: "100%", height: 380, objectFit: "cover", display: "block" }} referrerPolicy="no-referrer" />
            </div>
            <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 4, background: COLOUR, borderRadius: "0 0 18px 18px", zIndex: 2 }} />
          </div>
        </div>
      </section>

      {/* ════════════════════ WHO ════════════════════ */}
      <section id="dr-who" style={{ position: "relative", overflow: "hidden", minHeight: 480 }}>
        <img src="https://images.unsplash.com/photo-1591901206069-ed60c4429e2a?auto=format&fit=crop&q=80&w=1800" alt=""
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 40%" }} referrerPolicy="no-referrer" />
        <div style={{ position: "absolute", inset: 0, background: `linear-gradient(110deg, ${COLOUR}f8 0%, ${COLOUR}e0 38%, ${COLOUR}c0 58%, ${COLOUR}88 78%, ${COLOUR}44 100%)` }} />
        <div style={DIAG} />
        <div style={{ position: "relative", zIndex: 1, padding: "88px 56px" }}>
          <div style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "center" }}>
            <div>
              <p style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, fontWeight: 600, letterSpacing: "1.8px", textTransform: "uppercase", color: "rgba(255,255,255,0.5)", marginBottom: 10 }}>The Cadre</p>
              <h2 style={{ fontSize: 30, fontWeight: 900, color: "#fff", letterSpacing: "-0.5px" }}>Who is in the cadre?</h2>
              <div style={{ height: 3, background: "rgba(255,255,255,0.28)", borderRadius: 2, width: 48, marginTop: 10, marginBottom: 36 }} />
              <div style={{ marginBottom: 36 }}>
                <div style={{ fontSize: "clamp(3.5rem, 7vw, 5.5rem)", fontWeight: 900, color: "#fff", lineHeight: 1, letterSpacing: "-3px" }}>100+</div>
                <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 12, color: "rgba(255,255,255,0.55)", marginTop: 10, letterSpacing: "0.8px", maxWidth: 260, lineHeight: 1.5 }}>volunteers deployed in Tamil Nadu Floods alone</div>
              </div>
              <p style={{ fontSize: 15, color: "rgba(255,255,255,0.7)", lineHeight: 1.8, maxWidth: 380 }}>
                The cadre is made up of Tata employees who have proactively registered their availability and readiness for disaster deployment.
              </p>
            </div>
            <div>
              {WHO.map((w, i) => (
                <div key={w.label} style={{ padding: "28px 0", borderBottom: i < WHO.length - 1 ? "1px solid rgba(255,255,255,0.14)" : "none", display: "flex", gap: 20, alignItems: "flex-start" }}>
                  <div style={{ width: 52, height: 52, borderRadius: 14, flexShrink: 0, background: "rgba(255,255,255,0.14)", backdropFilter: "blur(4px)", border: "1px solid rgba(255,255,255,0.2)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24 }}>{w.icon}</div>
                  <div>
                    <div style={{ fontSize: 17, fontWeight: 800, color: "#fff", marginBottom: 6 }}>{w.label}</div>
                    <div style={{ fontSize: 14, color: "rgba(255,255,255,0.65)", lineHeight: 1.7 }}>{w.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════ HOW IT WORKS ════════════════════ */}
      <section id="dr-how" style={{ padding: "88px 56px", background: "#F4F8F7" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <p style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, fontWeight: 600, letterSpacing: "1.8px", textTransform: "uppercase", color: COLOUR + "cc", marginBottom: 10 }}>From alert to action</p>
          <h2 style={{ fontSize: 30, fontWeight: 900, color: ACCENT_NAVY, letterSpacing: "-0.5px" }}>How rapid response works</h2>
          <DefinerBar colour={COLOUR} />
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, marginTop: 48 }}>
            {STEPS.map((s, i) => {
              const isFirst = i === 0;
              return (
                <div key={s.num}
                  style={{ borderRadius: 16, overflow: "hidden", background: isFirst ? COLOUR : "#fff", border: `1px solid ${isFirst ? COLOUR : "#e8eef0"}`, boxShadow: isFirst ? `0 8px 28px ${COLOUR}30` : "none", transition: "transform 0.2s, box-shadow 0.2s" }}
                  onMouseEnter={(e) => { if (!isFirst) { (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)"; (e.currentTarget as HTMLElement).style.boxShadow = "0 8px 24px rgba(0,0,0,0.08)"; } }}
                  onMouseLeave={(e) => { if (!isFirst) { (e.currentTarget as HTMLElement).style.transform = "none"; (e.currentTarget as HTMLElement).style.boxShadow = "none"; } }}
                >
                  <div style={{ background: isFirst ? "rgba(0,0,0,0.15)" : COLOUR_LIGHT, padding: "20px 20px 16px", borderBottom: `1px solid ${isFirst ? "rgba(255,255,255,0.12)" : COLOUR + "18"}` }}>
                    <div style={{ fontFamily: "'DM Mono',monospace", fontSize: 26, fontWeight: 700, lineHeight: 1, color: isFirst ? "#fff" : COLOUR, letterSpacing: "-1px" }}>{s.time}</div>
                    <div style={{ fontFamily: "'DM Mono',monospace", fontSize: 9, fontWeight: 700, letterSpacing: "1.5px", textTransform: "uppercase", color: isFirst ? "rgba(255,255,255,0.45)" : COLOUR + "80", marginTop: 5 }}>{TIME_LABELS[i]}</div>
                  </div>
                  <div style={{ padding: "18px 20px 22px" }}>
                    <div style={{ fontSize: 14, fontWeight: 800, color: isFirst ? "#fff" : ACCENT_NAVY, marginBottom: 8 }}>{s.title}</div>
                    <div style={{ fontSize: 12, lineHeight: 1.72, color: isFirst ? "rgba(255,255,255,0.72)" : "#64748B" }}>{s.desc}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ════════════════════ FRAMEWORK ════════════════════ */}
      <section id="dr-framework" style={{ padding: "80px 56px", background: "#fff" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <p style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, fontWeight: 600, letterSpacing: "1.8px", textTransform: "uppercase", color: COLOUR + "cc", marginBottom: 10 }}>One Tata Response</p>
          <h2 style={{ fontSize: 30, fontWeight: 900, color: ACCENT_NAVY, letterSpacing: "-0.5px" }}>A Group-wide commitment to rapid action</h2>
          <DefinerBar colour={COLOUR} />
          <p style={{ fontSize: 15, color: "#64748B", lineHeight: 1.82, marginTop: 24, maxWidth: 680 }}>
            The One Tata Response framework, adopted by the Tata Group Sustainability Council, provides a structured protocol for cross-company disaster response — ensuring multiple Tata companies can mobilise simultaneously with unified TSG coordination.
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginTop: 40 }}>
            {PRINCIPLES.map((p) => (
              <div key={p.label}
                style={{ background: "#fff", borderRadius: 14, border: "1px solid #e8eef0", padding: "26px 24px", display: "flex", gap: 18, alignItems: "flex-start", transition: "box-shadow 0.2s" }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.boxShadow = "0 6px 20px rgba(0,0,0,0.07)"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.boxShadow = "none"; }}
              >
                <div style={{ width: 44, height: 44, borderRadius: 11, flexShrink: 0, background: COLOUR_LIGHT, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20 }}>{p.icon}</div>
                <div>
                  <div style={{ fontSize: 15, fontWeight: 800, color: ACCENT_NAVY, marginBottom: 6 }}>{p.label}</div>
                  <div style={{ fontSize: 14, color: "#64748B", lineHeight: 1.65 }}>{p.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════ TSG ROLE ════════════════════ */}
      <section id="dr-tsg" style={{ background: COLOUR_MID, padding: "88px 56px", position: "relative", overflow: "hidden" }}>
        <div style={DIAG} />
        <div style={{ maxWidth: 1100, margin: "0 auto", position: "relative", zIndex: 1, display: "grid", gridTemplateColumns: "1.1fr 0.9fr", gap: 72, alignItems: "start" }}>
          <div>
            <p style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, fontWeight: 600, letterSpacing: "1.8px", textTransform: "uppercase", color: "rgba(255,255,255,0.5)", marginBottom: 10 }}>Tata Sustainability Group</p>
            <h2 style={{ fontSize: 30, fontWeight: 900, color: "#fff", letterSpacing: "-0.5px" }}>TSG coordinates every response</h2>
            <div style={{ height: 3, background: "rgba(255,255,255,0.25)", borderRadius: 2, width: 48, marginTop: 10, marginBottom: 36 }} />
            <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
              {TSG_POINTS.map((p, i) => (
                <div key={i} style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
                  <div style={{ width: 24, height: 24, borderRadius: "50%", background: "rgba(255,255,255,0.18)", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", marginTop: 1 }}>
                    <span style={{ color: "#fff", fontSize: 11, fontWeight: 800 }}>✓</span>
                  </div>
                  <span style={{ fontSize: 15, color: "rgba(255,255,255,0.85)", lineHeight: 1.65 }}>{p}</span>
                </div>
              ))}
            </div>
          </div>
          <div style={{ background: "rgba(0,0,0,0.22)", borderRadius: 20, padding: "40px 36px", border: "1px solid rgba(255,255,255,0.14)" }}>
            <div style={{ fontSize: 24, fontWeight: 900, color: "#fff", marginBottom: 14, lineHeight: 1.2 }}>Ready to respond?</div>
            <p style={{ fontSize: 15, color: "rgba(255,255,255,0.68)", lineHeight: 1.78, marginBottom: 36 }}>
              Join the pre-registered cadre and be ready to make a difference when it matters most.
            </p>
            <button onClick={() => navigate(isLoggedIn ? "dr-availability-form" : "register-role")}
              style={{ background: B_MUSTARD, color: "#fff", border: "none", borderRadius: 10, padding: "14px 28px", fontWeight: 800, fontSize: 15, cursor: "pointer", width: "100%", boxShadow: "0 4px 20px rgba(0,0,0,0.22)" }}>
              Join the Response Cadre →
            </button>
            <button onClick={() => navigate("about")}
              style={{ background: "transparent", color: "rgba(255,255,255,0.6)", border: "1px solid rgba(255,255,255,0.22)", borderRadius: 10, padding: "13px 28px", fontWeight: 600, fontSize: 14, cursor: "pointer", width: "100%", marginTop: 12 }}>
              ← Back to About
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
