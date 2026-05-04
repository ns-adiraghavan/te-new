import { useState, useEffect, useRef } from "react";
import { useAppNavigate } from "@/hooks/useAppNavigate";
import { useAuth } from "@/context/AuthContext";
import { useAppContext } from "@/context/AppContext";
import SubPageDotRail from "@/components/shared/SubPageDotRail";
import tvwHeroImg from "@/assets/banner_photos/TVW Inner Banner.JPG";
import tvwBelowImg from "@/assets/banner_photos/TVW Inner Page below Banner.jpg";
import tvwPhoto3 from "@/assets/banner_photos/TVW photo 3 on innerpg.jpg";

// ── Tokens ────────────────────────────────────────────────────────────────────
const ACCENT_NAVY  = "#0D1B3E";
const B_YELLOW     = "#F79425";
const COLOUR       = "#135EA9";   // TVW blue
const COLOUR_DARK  = "#154E8A";
const COLOUR_LIGHT = "#EEF4FF";

const SECTIONS = [
  { id: "tvw-overview",  label: "Overview"      },
  { id: "tvw-why",       label: "Why it matters" },
  { id: "tvw-who",       label: "Who"           },
  { id: "tvw-how",       label: "How it works"  },
  { id: "tvw-timelines", label: "Timelines"     },
  { id: "tvw-tsg",       label: "TSG Role"      },
];

const DIAG: React.CSSProperties = {
  position: "absolute", inset: 0,
  backgroundImage: "repeating-linear-gradient(45deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
  backgroundSize: "28px 28px",
  pointerEvents: "none",
};

// ── SVG Icons ─────────────────────────────────────────────────────────────────
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
    num: "01", title: "Register on Tata Engage",
    desc: "Create your profile, add your skills and interests, and indicate your location. Takes just a few minutes.",
    Icon: IconRegister, colour: "#135EA9",
  },
  {
    num: "02", title: "Browse available events",
    desc: "Explore TVW events posted by SPOCs across your company and location. Filter by theme, date, or mode.",
    Icon: IconBrowse, colour: "#0D7C52",
  },
  {
    num: "03", title: "Sign up and show up",
    desc: "Register for an activity and participate with your team. Half-day, group-based sessions designed for all skill levels.",
    Icon: IconParticipate, colour: "#5B21B6",
  },
  {
    num: "04", title: "Share your story",
    desc: "After volunteering, share your experience on Tata Engage. Your story inspires others across the Tata Group.",
    Icon: IconShare, colour: "#F16323",
  },
];

const WHO = [
  { label: "Tata Employees",         Icon: IconEmployee, desc: "All group company employees — no specialised skills required for most TVW activities." },
  { label: "Family Members",         Icon: IconFamily,   desc: "Spouses and family members of Tata employees are warmly welcome to participate." },
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
    <div style={{ background: "transparent", minHeight: "100vh", position: "relative", backgroundImage: "radial-gradient(circle, rgba(13,27,62,0.06) 1px, transparent 1px)", backgroundSize: "20px 20px" }}>

      <SubPageDotRail sections={SECTIONS} />

      {/* ════════════════════ HERO ════════════════════ */}
      <div style={{ position: "relative", minHeight: "92vh", overflow: "hidden", display: "flex", alignItems: "center", paddingTop: 64 }}>
        <img src={tvwHeroImg} alt=""
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "center" }} />
        <div style={{ position: "absolute", inset: 0, background: `linear-gradient(110deg, ${COLOUR}e8 0%, ${COLOUR}cc 38%, ${COLOUR}aa 58%, ${COLOUR}77 78%, ${COLOUR}44 100%)` }} />

        <div style={{ position: "relative", zIndex: 1, maxWidth: 1100, margin: "0 auto", padding: "0 64px", width: "100%" }}>
          <p style={{ fontFamily: "'DM Sans','Noto Sans',ui-sans-serif,system-ui,sans-serif", fontSize: 14, fontWeight: 700, letterSpacing: "1.8px", textTransform: "uppercase", color: "#ffffff", margin: "0 0 12px" }}>
            Flagship Programme · Since 2014
          </p>
          <div style={{ height: 2, width: 48, borderRadius: 2, background: "rgba(255,255,255,0.6)", margin: "12px 0 22px" }} />
          <h1 style={{ fontFamily: "'DM Sans','Noto Sans',ui-sans-serif,system-ui,sans-serif", fontSize: "clamp(2.4rem, 5vw, 3.8rem)", fontWeight: 400, color: "#fff", lineHeight: 1.12, letterSpacing: "-0.5px", margin: "0 0 18px" }}>
            Tata Volunteering Week
          </h1>
          <p style={{ fontFamily: "'DM Sans','Noto Sans',ui-sans-serif,system-ui,sans-serif", fontSize: 15, fontWeight: 300, lineHeight: 1.7, color: "rgba(255,255,255,0.65)", margin: "0 0 32px", maxWidth: 520 }}>
            A Celebration of Collective Action. Held twice every year, TVW brings together thousands of Tata employees, their families, and retired colleagues from across the world to create meaningful community impact.
          </p>
          <div style={{ display: "flex", gap: 14 }}>
            <button onClick={() => navigate(isLoggedIn ? "tvw" : "register-role")}
              style={{ background: B_YELLOW, color: ACCENT_NAVY, border: "none", borderRadius: 10, padding: "14px 28px", fontWeight: 800, fontSize: 14, cursor: "pointer", boxShadow: "0 4px 20px rgba(13,27,62,0.25)" }}>
              Register to Volunteer →
            </button>
            <button onClick={() => document.getElementById("tvw-overview")?.scrollIntoView({ behavior: "smooth" })}
              style={{ background: "rgba(255,255,255,0.12)", color: "#fff", border: "1.5px solid rgba(255,255,255,0.28)", borderRadius: 10, padding: "14px 22px", fontWeight: 600, fontSize: 14, cursor: "pointer" }}>
              Learn more
            </button>
          </div>
        </div>

      </div>

      {/* ════════════════════ OVERVIEW ════════════════════ */}
      <section id="tvw-overview" style={{ padding: "88px 56px", background: "transparent" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 72, alignItems: "center" }}>
          <div>
            <p style={{ fontFamily: "'DM Sans','Noto Sans',ui-sans-serif,system-ui,sans-serif", fontSize: 14, fontWeight: 700, letterSpacing: "1.8px", textTransform: "uppercase", color: COLOUR + "cc", marginBottom: 10 }}>What is TVW?</p>
            <h2 style={{ fontSize: 30, fontWeight: 900, color: ACCENT_NAVY, letterSpacing: "-0.5px" }}>The Tata Group's flagship volunteering initiative</h2>
            <DefinerBar colour={COLOUR} />
            <div style={{ marginTop: 28 }}>
              <p style={{ fontSize: 15, color: "#475569", lineHeight: 1.82, marginBottom: 16 }}>
                Tata Volunteering Week (TVW) is the Tata Group's flagship volunteering initiative — bringing together thousands of Tata employees, their families, and retired colleagues from across the world to create meaningful community impact.
              </p>
              <p style={{ fontSize: 15, color: "#475569", lineHeight: 1.82 }}>
                Held twice every year, TVW is a time when the Tata volunteering tribe comes together to turn intent into action — by volunteering time, skills, and compassion for causes close to their heart.
              </p>
            </div>
          </div>
          <div style={{ position: "relative" }}>
            <div style={{ borderRadius: 18, overflow: "hidden", boxShadow: "0 4px 32px rgba(13,27,62,0.10)", position: "relative", zIndex: 1 }}>
              <img src={tvwBelowImg} alt=""
                style={{ width: "100%", height: 380, objectFit: "cover", objectPosition: "center", display: "block" }} />
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════ WHY IT MATTERS ════════════════════ */}
      <section id="tvw-why" style={{ background: "#F0F4FA", padding: "88px 56px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <p style={{ fontFamily: "'DM Sans','Noto Sans',ui-sans-serif,system-ui,sans-serif", fontSize: 14, fontWeight: 700, letterSpacing: "1.8px", textTransform: "uppercase", color: COLOUR + "cc", marginBottom: 10 }}>Purpose</p>
          <h2 style={{ fontSize: 30, fontWeight: 900, color: ACCENT_NAVY, letterSpacing: "-0.5px" }}>Why Tata Volunteering Week matters</h2>
          <DefinerBar colour={COLOUR} />
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48, marginTop: 40, alignItems: "start" }}>
            <div>
              <p style={{ fontSize: 15, color: "#475569", lineHeight: 1.82, marginBottom: 16 }}>
                Change begins when we move from conversation to action. Tata Volunteering Week provides an opportunity for volunteers — many of them first-timers — to experience the joy and outcome of giving back, and to build a long-term volunteering habit.
              </p>
              <p style={{ fontSize: 15, color: "#475569", lineHeight: 1.82 }}>
                From supporting under-resourced communities and caring for the environment to engaging with children, patients, and vulnerable groups, TVW enables simple actions to collectively create large-scale impact.
              </p>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {[
                { theme: "Community & Social", desc: "Supporting under-resourced communities and vulnerable groups" },
                { theme: "Environment", desc: "Caring for the environment and promoting sustainable practices" },
                { theme: "Children & Education", desc: "Engaging with children and youth to create lasting change" },
                { theme: "Health & Wellbeing", desc: "Caring for patients and those who need support" },
              ].map((item) => (
                <div key={item.theme} style={{ display: "flex", gap: 14, alignItems: "flex-start", background: "#fff", borderRadius: 14, padding: "16px 20px", border: `1px solid ${COLOUR}18` }}>
                  <div style={{ width: 6, height: 6, borderRadius: "50%", background: COLOUR, flexShrink: 0, marginTop: 7 }} />
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 800, color: ACCENT_NAVY, marginBottom: 3 }}>{item.theme}</div>
                    <div style={{ fontSize: 13, color: "#64748B", lineHeight: 1.6 }}>{item.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════ WHO ════════════════════ */}
      <section id="tvw-who" style={{ position: "relative", overflow: "hidden", minHeight: 480 }}>
        <img src={tvwPhoto3} alt=""
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 40%" }} />
        <div style={{ position: "absolute", inset: 0, background: `linear-gradient(110deg, ${COLOUR}f8 0%, ${COLOUR}e0 38%, ${COLOUR}c0 58%, ${COLOUR}88 78%, ${COLOUR}44 100%)` }} />
        <div style={DIAG} />
        <div style={{ position: "relative", zIndex: 1, padding: "88px 56px" }}>
          <div style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "center" }}>
            <div>
              <p style={{ fontFamily: "'DM Sans','Noto Sans',ui-sans-serif,system-ui,sans-serif", fontSize: 14, fontWeight: 700, letterSpacing: "1.8px", textTransform: "uppercase", color: "#ffffff", marginBottom: 10 }}>Who Can Volunteer?</p>
              <h2 style={{ fontSize: 30, fontWeight: 900, color: "#fff", letterSpacing: "-0.5px" }}>Open to the entire Tata family</h2>
              <div style={{ height: 3, background: "rgba(255,255,255,0.28)", borderRadius: 2, width: 48, marginTop: 10, marginBottom: 36 }} />
              <div style={{ marginBottom: 36 }}>
                <div style={{ fontSize: "clamp(3.5rem, 7vw, 5.5rem)", fontWeight: 900, color: "#fff", lineHeight: 1, letterSpacing: "-3px" }}>50,000+</div>
                <div style={{ fontFamily: "'DM Sans','Noto Sans',ui-sans-serif,system-ui,sans-serif", fontSize: 12, color: "rgba(255,255,255,0.55)", marginTop: 10, letterSpacing: "0.8px", maxWidth: 260, lineHeight: 1.5 }}>active volunteers across the Tata Group</div>
              </div>
              <p style={{ fontSize: 15, color: "rgba(255,255,255,0.7)", lineHeight: 1.8, maxWidth: 380 }}>
                No specialised skills are required for most TVW activities. Volunteers are encouraged to participate with sensitivity, responsibility, and respect for communities, guided by Tata Engage's volunteering principles.
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

      {/* ════════════════════ HOW IT WORKS ════════════════════ */}
      <section id="tvw-how" style={{ padding: "96px 56px", background: "transparent" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <p style={{ fontFamily: "'DM Sans','Noto Sans',ui-sans-serif,system-ui,sans-serif", fontSize: 14, fontWeight: 700, letterSpacing: "1.8px", textTransform: "uppercase", color: COLOUR + "cc", marginBottom: 10 }}>
            The Volunteer Journey
          </p>
          <h2 style={{ fontSize: 30, fontWeight: 900, color: ACCENT_NAVY, letterSpacing: "-0.5px" }}>How Tata Volunteering Week works</h2>
          <DefinerBar colour={COLOUR} />
          <p style={{ fontSize: 15, color: "#64748B", lineHeight: 1.75, marginTop: 18, maxWidth: 540, marginBottom: 60 }}>
            This group-wide approach enables collaboration, inclusivity, and scale — while allowing volunteers to choose causes aligned with their interests.
          </p>

          {/* Step pipeline */}
          <div style={{ position: "relative" }}>
            <div style={{ position: "absolute", top: 44, left: "calc(12.5% + 28px)", right: "calc(12.5% + 28px)", height: 2, background: `linear-gradient(90deg, ${COLOUR}40, ${COLOUR}, ${COLOUR}40)`, zIndex: 0, borderRadius: 2 }} />
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 24, position: "relative", zIndex: 1 }}>
              {HOW_STEPS.map((step, idx) => (
                <div key={step.num} style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}>
                  <div style={{
                    width: 88, height: 88, borderRadius: "50%",
                    background: idx === 0 ? step.colour : "#fff",
                    border: `2px solid ${step.colour}`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    flexShrink: 0, marginBottom: 24,
                    boxShadow: idx === 0 ? `0 8px 28px ${step.colour}40` : `0 4px 16px rgba(0,0,0,0.07)`,
                    color: idx === 0 ? "#fff" : step.colour,
                    position: "relative",
                  }}>
                    <step.Icon />
                    <div style={{
                      position: "absolute", top: -6, right: -6,
                      width: 22, height: 22, borderRadius: "50%",
                      background: step.colour, color: "#fff",
                      fontSize: 10, fontWeight: 800,
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
              { title: "Each edition", body: "Tata Engage builds a unique, engaging umbrella campaign. Tata companies across global locations curate volunteering opportunities spanning social and environmental community-development themes." },
              { title: "Accessible activities", body: "Half-day, group-based activities are accessible across companies and locations. Specially curated DIY activity guides empower individuals to take action independently — without waiting for a group event." },
              { title: "Cross-company scale", body: "This group-wide approach enables collaboration, inclusivity, and scale — while allowing volunteers to choose causes aligned with their interests. Companies coordinate through their SPOCs to ensure maximum participation." },
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
          <p style={{ fontFamily: "'DM Sans','Noto Sans',ui-sans-serif,system-ui,sans-serif", fontSize: 14, fontWeight: 700, letterSpacing: "1.8px", textTransform: "uppercase", color: COLOUR + "cc", marginBottom: 10 }}>When does TVW run?</p>
          <h2 style={{ fontSize: 30, fontWeight: 900, color: ACCENT_NAVY, letterSpacing: "-0.5px" }}>Twice every year, every year</h2>
          <DefinerBar colour={COLOUR} />
          <p style={{ fontSize: 15, color: "#64748B", marginTop: 18, marginBottom: 44, maxWidth: 480, lineHeight: 1.72 }}>
            Tata Volunteering Week is celebrated twice each year across the Tata Group. Each edition runs over a four-week period, commencing on the dates below.
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, maxWidth: 600 }}>
            {[
              { date: "3 March", label: "Spring Edition", desc: "Marks the beginning of the volunteering year across the Tata Group." },
              { date: "5 September", label: "Autumn Edition", desc: "Carried forward from the momentum of the spring edition." },
            ].map((ed) => (
              <div key={ed.date} style={{ background: COLOUR, borderRadius: 16, padding: "28px 26px", boxShadow: "0 2px 12px rgba(13,27,62,0.08)" }}>
                <div style={{ fontFamily: "'DM Sans','Noto Sans',ui-sans-serif,system-ui,sans-serif", fontSize: 11, fontWeight: 600, letterSpacing: "1.2px", color: "rgba(255,255,255,0.75)", textTransform: "uppercase", marginBottom: 10 }}>{ed.label}</div>
                <div style={{ fontSize: 30, fontWeight: 900, color: "#fff", letterSpacing: "-0.5px", marginBottom: 8 }}>{ed.date}</div>
                <div style={{ width: 24, height: 3, background: "rgba(255,255,255,0.6)", borderRadius: 2, marginBottom: 14 }} />
                <div style={{ fontSize: 13, color: "rgba(255,255,255,0.85)", lineHeight: 1.65 }}>{ed.desc}</div>
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
            <p style={{ fontFamily: "'DM Sans','Noto Sans',ui-sans-serif,system-ui,sans-serif", fontSize: 14, fontWeight: 700, letterSpacing: "1.8px", textTransform: "uppercase", color: "#ffffff", marginBottom: 10 }}>Tata Sustainability Group</p>
            <h2 style={{ fontSize: 30, fontWeight: 900, color: "#fff", letterSpacing: "-0.5px" }}>The role of Tata Sustainability Group</h2>
            <div style={{ height: 3, background: "rgba(255,255,255,0.25)", borderRadius: 2, width: 48, marginTop: 10, marginBottom: 24 }} />
            <p style={{ fontSize: 15, color: "rgba(255,255,255,0.7)", lineHeight: 1.8, marginBottom: 32, maxWidth: 440 }}>
              Tata Volunteering Week is anchored by the Tata Sustainability Group, which enables the programme through:
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              {TSG_POINTS.map((p, i) => (
                <div key={i} style={{ display: "flex", gap: 16, alignItems: "flex-start" }}>
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
              style={{ background: B_YELLOW, color: ACCENT_NAVY, border: "none", borderRadius: 10, padding: "14px 28px", fontWeight: 800, fontSize: 14, cursor: "pointer", width: "100%", boxShadow: "0 4px 20px rgba(13,27,62,0.25)" }}>
              Register to Volunteer →
            </button>
            <button onClick={() => navigate(isLoggedIn ? "tvw" : "register-role")}
              style={{ background: "transparent", color: "rgba(255,255,255,0.75)", border: "1px solid rgba(255,255,255,0.22)", borderRadius: 10, padding: "14px 22px", fontWeight: 600, fontSize: 14, cursor: "pointer", width: "100%", marginTop: 12 }}>
              View Volunteering Opportunities →
            </button>
            <button onClick={() => navigate("about")}
              style={{ background: "transparent", color: "rgba(255,255,255,0.45)", border: "none", padding: "12px 0 0", fontWeight: 500, fontSize: 13, cursor: "pointer", width: "100%", textAlign: "center" as const }}>
              ← Back to About
            </button>
          </div>
        </div>
      </section>

    </div>
  );
}
