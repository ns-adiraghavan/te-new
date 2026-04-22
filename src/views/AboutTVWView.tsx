import { useState, useEffect, useRef } from "react";
import { useAppNavigate } from "@/hooks/useAppNavigate";
import { useAuth } from "@/context/AuthContext";
import { useAppContext } from "@/context/AppContext";
import Footer from "@/components/layout/Footer";
import SubPageDotRail from "@/components/shared/SubPageDotRail";

// ── Tokens ────────────────────────────────────────────────────────────────────
const ACCENT_NAVY  = "#0D1B3E";
const B_MUSTARD    = "#C8940A";
const COLOUR       = "#1E6BB8";
const COLOUR_MID   = "#154E8A";
const COLOUR_LIGHT = "#EEF4FF";

const SECTIONS = [
  { id: "tvw-overview", label: "Overview"    },
  { id: "tvw-who",      label: "Who"         },
  { id: "tvw-how",      label: "How it works" },
  { id: "tvw-editions", label: "Editions"    },
  { id: "tvw-tsg",      label: "TSG Role"    },
];

const DIAG: React.CSSProperties = {
  position: "absolute", inset: 0,
  backgroundImage: "repeating-linear-gradient(45deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
  backgroundSize: "28px 28px",
  pointerEvents: "none",
};

const STATS = [
  { num: "25+",     label: "Editions since 2014"            },
  { num: "50,000+", label: "Volunteers per edition" },
  { num: "100+",    label: "Tata companies"       },
];

const WHO = [
  { label: "Tata Employees",          icon: "👤", desc: "All group company employees during TVW dates" },
  { label: "Family Members",          icon: "👨‍👩‍👧", desc: "Family members of Tata employees" },
  { label: "Retired Tata Employees",  icon: "🎓", desc: "Former employees still connected to the group" },
];

const STEPS = [
  { num: "01", title: "Company organises",  desc: "Each Tata company arranges its own events — half-day group sessions coordinated by Corporate SPOCs and NGO partners." },
  { num: "02", title: "Employees sign up",  desc: "Team members register via Tata Engage, choose activities aligned with their interests, and participate together." },
  { num: "03", title: "Impact is logged",   desc: "Volunteering hours, participation and outcomes are tracked in real time on the platform for reporting and recognition." },
  { num: "04", title: "Stories are shared", desc: "Highlights, photos and testimonials are curated into TVW Vibe — the living record of each edition." },
];

const ALL_EDITIONS = [
  "TVW25","TVW24","TVW23","TVW22","TVW21","TVW20",
  "TVW19","TVW18","TVW17","TVW16","TVW15","TVW14",
  "TVW13","TVW12","TVW11","TVW10","TVW9","TVW8",
  "TVW7","TVW6","TVW5","TVW4","TVW3","TVW2","TVW1",
];

const TSG_POINTS = [
  "Centralised campaigns and communications",
  "Cross-company collaboration",
  "Regional coordination",
  "Participation tracking and reporting",
  "Recognition of volunteering contributions"
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
export default function AboutTVWView() {
  const navigate = useAppNavigate();
  const { isLoggedIn } = useAuth();
  const { triggerToast } = useAppContext();

  return (
    <div style={{ background: "#fff", minHeight: "100vh", position: "relative" }}>

      {/* Sticky top accent stripe */}
      <div style={{ height: 4, background: COLOUR, position: "sticky", top: 0, zIndex: 100 }} />

      <SubPageDotRail sections={SECTIONS} />

      {/* ════════════════════ HERO ════════════════════ */}
      <div style={{ position: "relative", minHeight: "92vh", overflow: "hidden", display: "flex", alignItems: "center" }}>
        <img src="https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&q=80&w=1800"
          alt="" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "center" }} referrerPolicy="no-referrer" />
        <div style={{ position: "absolute", inset: 0, background: `linear-gradient(108deg, ${COLOUR}f5 0%, ${COLOUR}e8 28%, ${COLOUR}b0 52%, ${COLOUR}50 70%, ${COLOUR}18 100%)` }} />
        <div style={DIAG} />
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 80, background: "linear-gradient(to bottom, transparent, #fff)", pointerEvents: "none" }} />

        <div style={{ position: "relative", zIndex: 1, maxWidth: 1100, margin: "0 auto", padding: "120px 56px 96px", width: "100%" }}>
          <div style={{ maxWidth: 560 }}>
            <p style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, fontWeight: 600, letterSpacing: "2.2px", textTransform: "uppercase", color: "rgba(255,255,255,0.5)", marginBottom: 16 }}>
              Flagship Programme · Since 2014
            </p>
            <div style={{ width: 32, height: 2, background: "rgba(255,255,255,0.45)", borderRadius: 2, marginBottom: 22 }} />
            <h1 style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "clamp(2.8rem, 5.5vw, 4.2rem)", fontWeight: 900, color: "#fff", lineHeight: 1.02, letterSpacing: "-2px", margin: "0 0 22px", whiteSpace: "pre-line" }}>
              {"Tata\nVolunteering\nWeek"}
            </h1>
            <p style={{ fontSize: 15, fontWeight: 300, lineHeight: 1.8, color: "rgba(255,255,255,0.78)", margin: "0 0 44px", maxWidth: 460 }}>
              Tata Volunteering Week (TVW) is the Tata Group's flagship volunteering initiative — bringing together thousands of Tata employees, their families, and retired colleagues from across the world to create meaningful community impact. Held twice every year, TVW is a time when the Tata volunteering tribe comes together to turn intent into action.
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
              <button onClick={() => navigate(isLoggedIn ? "tvw" : "register-role")}
                style={{ background: B_MUSTARD, color: "#fff", border: "none", borderRadius: 10, padding: "12px 26px", fontWeight: 800, fontSize: 14, cursor: "pointer", boxShadow: "0 4px 20px rgba(0,0,0,0.25)" }}>
                Sign up for TVW →
              </button>
              <button onClick={() => document.getElementById("tvw-overview")?.scrollIntoView({ behavior: "smooth" })}
                style={{ background: "rgba(255,255,255,0.11)", color: "#fff", border: "1.5px solid rgba(255,255,255,0.26)", borderRadius: 10, padding: "12px 22px", fontWeight: 600, fontSize: 14, cursor: "pointer" }}>
                Learn more
              </button>
            </div>
          </div>
        </div>

        <div style={{ position: "absolute", bottom: 100, right: 56, background: "rgba(0,0,0,0.28)", backdropFilter: "blur(8px)", border: "1px solid rgba(255,255,255,0.18)", borderRadius: 100, padding: "7px 18px", fontFamily: "'DM Mono', monospace", fontSize: 10, fontWeight: 600, letterSpacing: "1.5px", textTransform: "uppercase", color: "rgba(255,255,255,0.7)" }}>
          Flagship · Bi-annual · Global
        </div>
      </div>

      {/* ════════════════════ OVERVIEW ════════════════════ */}
      <section id="tvw-overview" style={{ padding: "88px 56px", background: "#fff" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 72, alignItems: "center" }}>
          <div>
            <p style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, fontWeight: 600, letterSpacing: "1.8px", textTransform: "uppercase", color: COLOUR + "cc", marginBottom: 10 }}>What is TVW?</p>
            <h2 style={{ fontSize: 32, fontWeight: 900, color: ACCENT_NAVY, letterSpacing: "-0.5px" }}>The Group's largest moment of giving</h2>
            <DefinerBar colour={COLOUR} />
            <div style={{ marginTop: 28 }}>
              <p style={{ fontSize: 16, color: "#475569", lineHeight: 1.82, marginBottom: 16 }}>
                Tata Engage builds a unique, engaging umbrella campaign for each edition. Tata companies across global locations curate volunteering opportunities — half-day, group-based activities spanning social and environmental community-development themes. Specially curated DIY (Do It Yourself) activity guides also empower individuals to take action independently.
              </p>
              <p style={{ fontSize: 16, color: "#475569", lineHeight: 1.82 }}>
                No specialised skills are required for most activities. Volunteers are encouraged to participate with sensitivity, responsibility, and respect for communities, guided by Tata Engage's volunteering principles.
              </p>
            </div>
          </div>
          <div style={{ position: "relative" }}>
            <div style={{ position: "absolute", top: -16, right: -16, zIndex: 0, width: 64, height: 64, borderRadius: 16, background: COLOUR, opacity: 0.12 }} />
            <div style={{ borderRadius: 18, overflow: "hidden", boxShadow: "0 4px 32px rgba(0,0,0,0.10)", position: "relative", zIndex: 1 }}>
              <img src="https://images.unsplash.com/photo-1559027615-cd4628902d4a?auto=format&fit=crop&q=80&w=900" alt=""
                style={{ width: "100%", height: 380, objectFit: "cover", display: "block" }} referrerPolicy="no-referrer" />
            </div>
            <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 4, background: COLOUR, borderRadius: "0 0 18px 18px", zIndex: 2 }} />
          </div>
        </div>
      </section>

      {/* ════════════════════ WHO ════════════════════ */}
      <section id="tvw-who" style={{ position: "relative", overflow: "hidden", minHeight: 480 }}>
        <img src="https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?auto=format&fit=crop&q=80&w=1800" alt=""
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 40%" }} referrerPolicy="no-referrer" />
        <div style={{ position: "absolute", inset: 0, background: `linear-gradient(110deg, ${COLOUR}f8 0%, ${COLOUR}e0 38%, ${COLOUR}c0 58%, ${COLOUR}88 78%, ${COLOUR}44 100%)` }} />
        <div style={DIAG} />
        <div style={{ position: "relative", zIndex: 1, padding: "88px 56px" }}>
          <div style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "center" }}>
            <div>
              <p style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, fontWeight: 600, letterSpacing: "1.8px", textTransform: "uppercase", color: "rgba(255,255,255,0.5)", marginBottom: 10 }}>Eligibility</p>
              <h2 style={{ fontSize: 30, fontWeight: 900, color: "#fff", letterSpacing: "-0.5px" }}>Open to the entire Tata family</h2>
              <div style={{ height: 3, background: "rgba(255,255,255,0.28)", borderRadius: 2, width: 48, marginTop: 10, marginBottom: 36 }} />
              <div style={{ marginBottom: 36 }}>
                <div style={{ fontSize: "clamp(3.5rem, 7vw, 5.5rem)", fontWeight: 900, color: "#fff", lineHeight: 1, letterSpacing: "-3px" }}>50,000+</div>
                <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 12, color: "rgba(255,255,255,0.55)", marginTop: 10, letterSpacing: "0.8px", maxWidth: 260, lineHeight: 1.5 }}>active volunteers across the Tata group</div>
              </div>
              <p style={{ fontSize: 15, color: "rgba(255,255,255,0.7)", lineHeight: 1.8, maxWidth: 380 }}>
                TVW is open to anyone in the extended Tata family — employees, their loved ones, and those who have retired from the group.
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
      <section id="tvw-how" style={{ padding: "88px 56px", background: "#fff" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <p style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, fontWeight: 600, letterSpacing: "1.8px", textTransform: "uppercase", color: COLOUR + "cc", marginBottom: 10 }}>How it works</p>
          <h2 style={{ fontSize: 30, fontWeight: 900, color: ACCENT_NAVY, letterSpacing: "-0.5px" }}>Four steps to participation</h2>
          <DefinerBar colour={COLOUR} />
          <div style={{ marginTop: 56, display: "flex", alignItems: "flex-start" }}>
            {STEPS.map((s, i) => (
              <>
                <div key={s.num} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", padding: "0 12px" }}>
                  <div style={{ width: 56, height: 56, borderRadius: "50%", background: i === 0 ? COLOUR : COLOUR_LIGHT, border: `2px solid ${COLOUR}`, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'DM Mono',monospace", fontSize: 14, fontWeight: 700, color: i === 0 ? "#fff" : COLOUR, marginBottom: 20, flexShrink: 0, boxShadow: i === 0 ? `0 4px 16px ${COLOUR}40` : "none" }}>{s.num}</div>
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
        </div>
      </section>

      {/* ════════════════════ EDITIONS ════════════════════ */}
      <section id="tvw-editions" style={{ background: COLOUR, padding: "80px 56px", position: "relative", overflow: "hidden" }}>
        <div style={DIAG} />
        <div style={{ maxWidth: 1100, margin: "0 auto", position: "relative", zIndex: 1, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 72, alignItems: "center" }}>
          <div>
            <p style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, fontWeight: 600, letterSpacing: "1.8px", textTransform: "uppercase", color: "rgba(255,255,255,0.5)", marginBottom: 10 }}>Editions</p>
            <div style={{ fontSize: "clamp(5rem,10vw,8rem)", fontWeight: 900, color: "#fff", lineHeight: 0.9, letterSpacing: "-4px", marginBottom: 16 }}>25+</div>
            <h2 style={{ fontSize: 22, fontWeight: 800, color: "rgba(255,255,255,0.85)", letterSpacing: "-0.3px", marginBottom: 20, lineHeight: 1.3 }}>editions of Tata Volunteering Week since 2014</h2>
            <div style={{ height: 3, background: "rgba(255,255,255,0.25)", borderRadius: 2, width: 48, marginBottom: 24 }} />
            <p style={{ fontSize: 15, color: "rgba(255,255,255,0.65)", lineHeight: 1.8, maxWidth: 380 }}>
              Tata Volunteering Week is celebrated twice each year across the Tata Group, commencing annually on 3 March and 5 September. Each edition runs over a four-week period.
            </p>
          </div>
          <div>
            <div style={{ fontFamily: "'DM Mono',monospace", fontSize: 10, fontWeight: 700, letterSpacing: "2px", textTransform: "uppercase", color: "rgba(255,255,255,0.4)", marginBottom: 16 }}>All editions</div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {ALL_EDITIONS.map((ed, i) => (
                <div key={ed} style={{ background: i === 0 ? B_MUSTARD : "rgba(255,255,255,0.1)", border: `1px solid ${i === 0 ? B_MUSTARD : "rgba(255,255,255,0.18)"}`, color: i === 0 ? "#fff" : "rgba(255,255,255,0.7)", fontFamily: "'DM Mono',monospace", fontSize: i === 0 ? 13 : 11, fontWeight: i === 0 ? 800 : 500, padding: i === 0 ? "6px 14px" : "4px 12px", borderRadius: 100 }}>
                  {ed}{i === 0 ? " ↗" : ""}
                </div>
              ))}
            </div>
            <div style={{ marginTop: 20, fontFamily: "'DM Mono',monospace", fontSize: 10, color: "rgba(255,255,255,0.3)", letterSpacing: "0.5px" }}>Next: TVW26 · Sep 2026</div>
          </div>
        </div>
      </section>

      {/* ════════════════════ TSG ROLE ════════════════════ */}
      <section id="tvw-tsg" style={{ background: COLOUR_MID, padding: "88px 56px", position: "relative", overflow: "hidden" }}>
        <div style={DIAG} />
        <div style={{ maxWidth: 1100, margin: "0 auto", position: "relative", zIndex: 1, display: "grid", gridTemplateColumns: "1.1fr 0.9fr", gap: 72, alignItems: "start" }}>
          <div>
            <p style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, fontWeight: 600, letterSpacing: "1.8px", textTransform: "uppercase", color: "rgba(255,255,255,0.5)", marginBottom: 10 }}>Tata Sustainability Group</p>
            <h2 style={{ fontSize: 30, fontWeight: 900, color: "#fff", letterSpacing: "-0.5px" }}>TSG's role in every edition</h2>
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
            <div style={{ fontSize: 24, fontWeight: 900, color: "#fff", marginBottom: 14, lineHeight: 1.2 }}>Ready to make an impact?</div>
            <p style={{ fontSize: 15, color: "rgba(255,255,255,0.68)", lineHeight: 1.78, marginBottom: 36 }}>
              Join thousands of Tata colleagues who volunteer through TVW every year.
            </p>
            <button onClick={() => navigate(isLoggedIn ? "tvw" : "register-role")}
              style={{ background: B_MUSTARD, color: "#fff", border: "none", borderRadius: 10, padding: "14px 28px", fontWeight: 800, fontSize: 15, cursor: "pointer", width: "100%", boxShadow: "0 4px 20px rgba(0,0,0,0.22)" }}>
              Sign up for TVW →
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
