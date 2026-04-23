import { useState, useEffect, useRef } from "react";
import { useAppNavigate } from "@/hooks/useAppNavigate";
import { useAuth } from "@/context/AuthContext";
import { useAppContext } from "@/context/AppContext";
import Footer from "@/components/layout/Footer";
import SubPageDotRail from "@/components/shared/SubPageDotRail";

// ── Tokens ────────────────────────────────────────────────────────────────────
const ACCENT_NAVY  = "#0D1B3E";
const B_YELLOW     = "#F5A623";
const COLOUR       = "#1E6BB8";   // TVW blue
const COLOUR_DARK  = "#154E8A";
const COLOUR_LIGHT = "#EEF4FF";

const SECTIONS = [
  { id: "tvw-overview", label: "Overview"     },
  { id: "tvw-who",      label: "Who"          },
  { id: "tvw-how",      label: "How it works" },
  { id: "tvw-timelines", label: "Timelines"   },
  { id: "tvw-tsg",      label: "TSG Role"     },
];

const DIAG: React.CSSProperties = {
  position: "absolute", inset: 0,
  backgroundImage: "repeating-linear-gradient(45deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
  backgroundSize: "28px 28px",
  pointerEvents: "none",
};



// ── SVG Icons (no emoji) ──────────────────────────────────────────────────────
const IconEmployee = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
    <circle cx="12" cy="7" r="4"/>
  </svg>
);

const IconFamily = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
    <circle cx="9" cy="7" r="4"/>
    <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
    <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
  </svg>
);

const IconRetired = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="8" r="4"/>
    <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/>
    <path d="M9 12.5L12 16l3-3.5"/>
  </svg>
);

// How-to-volunteer step icons
const IconRegister = () => (
  <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
    <rect x="4" y="4" width="20" height="20" rx="4"/>
    <path d="M9 14h10M9 9h6M9 19h4"/>
  </svg>
);
const IconBrowse = () => (
  <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="7"/>
    <path d="M21 21l-4-4"/>
    <path d="M9 12h6M12 9v6"/>
  </svg>
);
const IconParticipate = () => (
  <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 20c0-4 3.6-6 8-6s8 2 8 6"/>
    <circle cx="14" cy="9" r="4"/>
    <path d="M20 12l3 3-3 3"/>
  </svg>
);
const IconShare = () => (
  <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="18" cy="6" r="3"/>
    <circle cx="6" cy="14" r="3"/>
    <circle cx="18" cy="22" r="3"/>
    <path d="M9 15.5l6 4M15 8.5l-6 4"/>
  </svg>
);

const HOW_STEPS = [
  {
    num: "01",
    title: "Register on Tata Engage",
    desc: "Create your profile, add your interests, and indicate your location. Takes just a few minutes.",
    Icon: IconRegister,
    colour: "#1E6BB8",
  },
  {
    num: "02",
    title: "Browse available events",
    desc: "Explore TVW events posted by SPOCs across your company and location. Filter by theme, date, or mode.",
    Icon: IconBrowse,
    colour: "#0D7C52",
  },
  {
    num: "03",
    title: "Sign up and show up",
    desc: "Register for an activity and participate with your team. Half-day group sessions designed for all skill levels.",
    Icon: IconParticipate,
    colour: "#5B21B6",
  },
  {
    num: "04",
    title: "Share your story",
    desc: "After volunteering, share your experience. Your story inspires others across the Tata Group.",
    Icon: IconShare,
    colour: "#C14D00",
  },
];

const WHO = [
  { label: "Tata Employees",         Icon: IconEmployee, desc: "All group company employees — no specialised skills required for most TVW activities." },
  { label: "Family Members",         Icon: IconFamily,   desc: "Spouses and family members of Tata employees are warmly welcome." },
  { label: "Retired Tata Employees", Icon: IconRetired,  desc: "Former Tata employees remain part of the volunteering family even after retirement." },
];

const TSG_POINTS = [
  "Centralised campaigns and communications for each edition",
  "Cross-company collaboration and coordination",
  "Regional coordination across geographies",
  "Participation tracking and impact reporting",
  "Recognition of volunteering contributions",
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
      <div style={{ height: 4, background: COLOUR, position: "sticky", top: 0, zIndex: 40 }} />

      <SubPageDotRail sections={SECTIONS} />

      {/* ════════════════════ HERO ════════════════════ */}
      <div style={{ position: "relative", minHeight: "92vh", overflow: "hidden", display: "flex", alignItems: "center" }}>
        <img src="https://images.unsplash.com/photo-1559027615-cd4628902d4a?auto=format&fit=crop&q=80&w=1800"
          alt="" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "center" }} referrerPolicy="no-referrer" />
        <div style={{ position: "absolute", inset: 0, background: `linear-gradient(108deg, ${COLOUR}f5 0%, ${COLOUR}e8 28%, ${COLOUR}b0 52%, ${COLOUR}50 70%, ${COLOUR}18 100%)` }} />
        <div style={DIAG} />
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 80, background: "linear-gradient(to bottom, transparent, #fff)", pointerEvents: "none" }} />

        <div style={{ position: "relative", zIndex: 1, maxWidth: 1100, margin: "0 auto", padding: "120px 56px 96px", width: "100%" }}>
          <div style={{ maxWidth: 640 }}>
            <p style={{ fontFamily: "'DM Mono', monospace", fontSize: 12, fontWeight: 600, letterSpacing: "2.4px", textTransform: "uppercase", color: "rgba(255,255,255,0.6)", marginBottom: 20 }}>
              Flagship Programme · Since 2014
            </p>
            <div style={{ width: 44, height: 3, background: "rgba(255,255,255,0.55)", borderRadius: 2, marginBottom: 28 }} />
            <h1 style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "clamp(3.4rem, 6.8vw, 5.4rem)", fontWeight: 900, color: "#fff", lineHeight: 1.02, letterSpacing: "-2.5px", margin: "0 0 28px", whiteSpace: "pre-line" }}>
              {"Tata\nVolunteering\nWeek"}
            </h1>
            <p style={{ fontSize: 18, fontWeight: 300, lineHeight: 1.75, color: "rgba(255,255,255,0.88)", margin: "0 0 48px", maxWidth: 560 }}>
              A Celebration of Collective Action. Held twice every year, TVW is a time when the Tata volunteering tribe comes together — turning intent into action by volunteering time, skills, and compassion for causes close to their heart.
            </p>
            <div style={{ display: "flex", gap: 14 }}>
              <button onClick={() => navigate(isLoggedIn ? "tvw" : "register-role")}
                style={{ background: B_YELLOW, color: ACCENT_NAVY, border: "none", borderRadius: 12, padding: "16px 32px", fontWeight: 800, fontSize: 16, cursor: "pointer", boxShadow: "0 4px 20px rgba(0,0,0,0.25)" }}>
                Register to Volunteer →
              </button>
              <button onClick={() => document.getElementById("tvw-overview")?.scrollIntoView({ behavior: "smooth" })}
                style={{ background: "rgba(255,255,255,0.11)", color: "#fff", border: "1.5px solid rgba(255,255,255,0.26)", borderRadius: 12, padding: "16px 28px", fontWeight: 600, fontSize: 16, cursor: "pointer" }}>
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
              <p style={{ fontSize: 15, color: "#475569", lineHeight: 1.82, marginBottom: 16 }}>
                Tata Volunteering Week provides an opportunity for volunteers — many of them first-timers — to experience the joy and outcome of giving back, and to build a long-term volunteering habit.
              </p>
              <p style={{ fontSize: 15, color: "#475569", lineHeight: 1.82 }}>
                From supporting under-resourced communities and caring for the environment to engaging with children, patients, and vulnerable groups, TVW enables simple actions to collectively create large-scale impact. Specially curated DIY activity guides also empower individuals to take action independently.
              </p>
            </div>
          </div>
          <div style={{ position: "relative" }}>
            <div style={{ position: "absolute", top: -16, right: -16, zIndex: 0, width: 64, height: 64, borderRadius: 16, background: COLOUR, opacity: 0.12 }} />
            <div style={{ borderRadius: 18, overflow: "hidden", boxShadow: "0 4px 32px rgba(0,0,0,0.10)", position: "relative", zIndex: 1 }}>
              <img src="https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?auto=format&fit=crop&q=80&w=900" alt=""
                style={{ width: "100%", height: 380, objectFit: "cover", display: "block" }} referrerPolicy="no-referrer" />
            </div>
            <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 4, background: COLOUR, borderRadius: "0 0 18px 18px", zIndex: 2 }} />
          </div>
        </div>
      </section>

      {/* ════════════════════ WHO ════════════════════ */}
      <section id="tvw-who" style={{ position: "relative", overflow: "hidden", minHeight: 480 }}>
        <img src="https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&q=80&w=1800" alt=""
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
                No specialised skills are required for most TVW activities. Volunteers are encouraged to participate with sensitivity, responsibility, and respect for communities.
              </p>
            </div>
            <div>
              {WHO.map((w, i) => (
                <div key={w.label} style={{ padding: "28px 0", borderBottom: i < WHO.length - 1 ? "1px solid rgba(255,255,255,0.14)" : "none", display: "flex", gap: 20, alignItems: "flex-start" }}>
                  <div style={{ width: 52, height: 52, borderRadius: 14, flexShrink: 0, background: "rgba(255,255,255,0.14)", backdropFilter: "blur(4px)", border: "1px solid rgba(255,255,255,0.2)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff" }}>
                    <w.Icon />
                  </div>
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

      {/* ════════════════════ HOW IT WORKS — Creative visual ════════════════════ */}
      <section id="tvw-how" style={{ padding: "96px 56px", background: "#fff" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <p style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, fontWeight: 600, letterSpacing: "1.8px", textTransform: "uppercase", color: COLOUR + "cc", marginBottom: 10 }}>
            The Volunteer Journey
          </p>
          <h2 style={{ fontSize: 30, fontWeight: 900, color: ACCENT_NAVY, letterSpacing: "-0.5px" }}>How Tata Volunteering Week works</h2>
          <DefinerBar colour={COLOUR} />
          <p style={{ fontSize: 15, color: "#64748B", lineHeight: 1.75, marginTop: 18, maxWidth: 540, marginBottom: 60 }}>
            This group-wide approach enables collaboration, inclusivity, and scale — while allowing volunteers to choose causes aligned with their interests.
          </p>

          {/* Horizontal step pipeline */}
          <div style={{ position: "relative" }}>
            {/* Connector line */}
            <div style={{ position: "absolute", top: 44, left: "calc(12.5% + 28px)", right: "calc(12.5% + 28px)", height: 2, background: `linear-gradient(90deg, ${COLOUR}40, ${COLOUR}, ${COLOUR}40)`, zIndex: 0, borderRadius: 2 }} />

            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 24, position: "relative", zIndex: 1 }}>
              {HOW_STEPS.map((step, idx) => (
                <div key={step.num} style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}>
                  {/* Step dot/icon */}
                  <div style={{
                    width: 88, height: 88,
                    borderRadius: "50%",
                    background: idx === 0 ? step.colour : "#fff",
                    border: `2px solid ${step.colour}`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    flexShrink: 0,
                    marginBottom: 24,
                    boxShadow: idx === 0 ? `0 8px 28px ${step.colour}40` : `0 4px 16px rgba(0,0,0,0.07)`,
                    transition: "all 0.2s",
                    color: idx === 0 ? "#fff" : step.colour,
                    position: "relative",
                  }}>
                    <step.Icon />
                    {/* Step number badge */}
                    <div style={{
                      position: "absolute", top: -6, right: -6,
                      width: 22, height: 22, borderRadius: "50%",
                      background: step.colour, color: "#fff",
                      fontSize: 10, fontWeight: 800, fontFamily: "'DM Mono', monospace",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      border: "2px solid #fff",
                    }}>{idx + 1}</div>
                  </div>

                  <div style={{ fontSize: 14, fontWeight: 800, color: ACCENT_NAVY, marginBottom: 10, lineHeight: 1.3 }}>{step.title}</div>
                  <div style={{ fontSize: 13, color: "#64748B", lineHeight: 1.65 }}>{step.desc}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Programme detail cards */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16, marginTop: 64 }}>
            {[
              { title: "Each edition", body: "Tata Engage builds a unique, engaging umbrella campaign. Tata companies curate volunteering opportunities across social and environmental themes — half-day, group-based activities." },
              { title: "Accessible activities", body: "Opportunities span companies and locations. DIY (Do It Yourself) guides also empower individuals to take action independently — without waiting for a group event." },
              { title: "Cross-company scale", body: "This group-wide approach enables collaboration, inclusivity, and scale. Companies coordinate through their SPOCs to ensure maximum participation." },
            ].map((card) => (
              <div key={card.title} style={{ background: COLOUR_LIGHT, borderRadius: 16, padding: "28px 24px", border: `1px solid ${COLOUR}22` }}>
                <div style={{ width: 32, height: 3, background: COLOUR, borderRadius: 2, marginBottom: 18 }} />
                <div style={{ fontSize: 15, fontWeight: 800, color: ACCENT_NAVY, marginBottom: 12 }}>{card.title}</div>
                <div style={{ fontSize: 13, color: "#475569", lineHeight: 1.72 }}>{card.body}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════ TIMELINES ════════════════════ */}
      <section id="tvw-timelines" style={{ background: "#F0F4FA", padding: "80px 56px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <p style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, fontWeight: 600, letterSpacing: "1.8px", textTransform: "uppercase", color: COLOUR + "cc", marginBottom: 10 }}>When does TVW run?</p>
          <h2 style={{ fontSize: 30, fontWeight: 900, color: ACCENT_NAVY, letterSpacing: "-0.5px" }}>Twice every year, every year</h2>
          <DefinerBar colour={COLOUR} />
          <p style={{ fontSize: 15, color: "#64748B", marginTop: 18, marginBottom: 44, maxWidth: 480, lineHeight: 1.72 }}>
            Each edition runs over a four-week period, commencing on the dates below. Both editions follow the same programme structure.
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, maxWidth: 600 }}>
            {[
              { date: "3 March", label: "Spring Edition", desc: "Marks the beginning of the volunteering year across the Tata Group." },
              { date: "5 September", label: "Autumn Edition", desc: "Carried forward from the momentum of the spring edition." },
            ].map((ed) => (
              <div key={ed.date} style={{ background: "#fff", borderRadius: 16, padding: "28px 26px", border: `1px solid ${COLOUR}20`, boxShadow: "0 2px 12px rgba(0,0,0,0.04)" }}>
                <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, fontWeight: 600, letterSpacing: "1.2px", color: COLOUR, textTransform: "uppercase", marginBottom: 10 }}>{ed.label}</div>
                <div style={{ fontSize: 30, fontWeight: 900, color: COLOUR, letterSpacing: "-0.5px", marginBottom: 8 }}>{ed.date}</div>
                <div style={{ width: 24, height: 3, background: COLOUR, borderRadius: 2, marginBottom: 14 }} />
                <div style={{ fontSize: 13, color: "#64748B", lineHeight: 1.65 }}>{ed.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════ TSG ROLE ════════════════════ */}
      <section id="tvw-tsg" style={{ background: COLOUR_DARK, padding: "88px 56px", position: "relative", overflow: "hidden" }}>
        <div style={DIAG} />
        <div style={{ maxWidth: 1100, margin: "0 auto", position: "relative", zIndex: 1, display: "grid", gridTemplateColumns: "1.1fr 0.9fr", gap: 72, alignItems: "start" }}>
          <div>
            <p style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, fontWeight: 600, letterSpacing: "1.8px", textTransform: "uppercase", color: "rgba(255,255,255,0.5)", marginBottom: 10 }}>Tata Sustainability Group</p>
            <h2 style={{ fontSize: 30, fontWeight: 900, color: "#fff", letterSpacing: "-0.5px" }}>TSG's role in Tata Volunteering Week</h2>
            <div style={{ height: 3, background: "rgba(255,255,255,0.25)", borderRadius: 2, width: 48, marginTop: 10, marginBottom: 36 }} />
            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              {TSG_POINTS.map((p, i) => (
                <div key={i} style={{ display: "flex", gap: 16, alignItems: "flex-start" }}>
                  {/* Check icon SVG */}
                  <div style={{ width: 28, height: 28, borderRadius: "50%", background: "rgba(255,255,255,0.14)", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", marginTop: 1 }}>
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <path d="M2 6l3 3 5-5" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <span style={{ fontSize: 15, color: "rgba(255,255,255,0.85)", lineHeight: 1.65 }}>{p}</span>
                </div>
              ))}
            </div>
          </div>
          <div style={{ background: "rgba(0,0,0,0.22)", borderRadius: 20, padding: "40px 36px", border: "1px solid rgba(255,255,255,0.14)" }}>
            <div style={{ fontSize: 24, fontWeight: 900, color: "#fff", marginBottom: 14, lineHeight: 1.2 }}>
              Be Part of Tata Volunteering Week
            </div>
            <p style={{ fontSize: 15, color: "rgba(255,255,255,0.68)", lineHeight: 1.78, marginBottom: 36 }}>
              Join thousands of Tata volunteers across the world and experience the joy and power of collective action.
            </p>
            <button onClick={() => navigate(isLoggedIn ? "tvw" : "register-role")}
              style={{ background: B_YELLOW, color: ACCENT_NAVY, border: "none", borderRadius: 10, padding: "14px 28px", fontWeight: 800, fontSize: 15, cursor: "pointer", width: "100%", boxShadow: "0 4px 20px rgba(0,0,0,0.22)" }}>
              Register to Volunteer →
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
