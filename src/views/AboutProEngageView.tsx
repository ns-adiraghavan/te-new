import { useState, useEffect, useRef } from "react";
import { useAppNavigate } from "@/hooks/useAppNavigate";
import { useAuth } from "@/context/AuthContext";
import SubPageDotRail from "@/components/shared/SubPageDotRail";
import peHeroImg from "@/assets/tce-2.jpg";

// ── Tokens ────────────────────────────────────────────────────────────────────
const ACCENT_NAVY  = "#0D1B3E";
const B_YELLOW     = "#F5A623";
const COLOUR       = "#0D7C52";   // ProEngage green
const COLOUR_DARK  = "#0A5C3E";
const COLOUR_LIGHT = "#E6F5EE";

const SECTIONS = [
  { id: "pe-overview", label: "Overview"    },
  { id: "pe-unique",   label: "What's unique" },
  { id: "pe-who",      label: "Who"         },
  { id: "pe-how",      label: "How it works" },
  { id: "pe-timeline", label: "Timeline"    },
  { id: "pe-skills",   label: "Skill areas" },
  { id: "pe-tsg",      label: "TSG Role"    },
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
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
  </svg>
);
const IconFamily = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/>
    <path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
  </svg>
);
const IconRetired = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/>
    <path d="M8 14l4 4 4-4"/>
  </svg>
);

// How-it-works step icons
const IconAnnounce = () => (
  <svg width="26" height="26" viewBox="0 0 26 26" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 10v6l13 5V5L3 10z"/>
    <path d="M16 9a4 4 0 0 1 0 8"/>
    <path d="M6 16v3a2 2 0 0 0 4 0v-2"/>
  </svg>
);
const IconNGO = () => (
  <svg width="26" height="26" viewBox="0 0 26 26" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="10" width="20" height="13" rx="2"/>
    <path d="M13 3l10 7H3l10-7z"/>
    <rect x="9" y="15" width="8" height="8"/>
  </svg>
);
const IconApply = () => (
  <svg width="26" height="26" viewBox="0 0 26 26" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 6h18M4 12h12M4 18h8"/>
    <circle cx="20" cy="18" r="4"/>
    <path d="M18 18l1.5 1.5L22 16"/>
  </svg>
);
const IconMatch = () => (
  <svg width="26" height="26" viewBox="0 0 26 26" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="9" cy="9" r="5"/><circle cx="17" cy="17" r="5"/>
    <path d="M13 9h4v4"/>
  </svg>
);
const IconOrient = () => (
  <svg width="26" height="26" viewBox="0 0 26 26" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 6l9-3 9 3v10c0 4-9 7-9 7S4 20 4 16V6z"/>
    <path d="M13 10v4M13 16v.5"/>
  </svg>
);
const IconDeliver = () => (
  <svg width="26" height="26" viewBox="0 0 26 26" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
    <rect x="4" y="8" width="18" height="14" rx="2"/>
    <path d="M16 8V6a4 4 0 0 0-6.93-2.75"/>
    <path d="M9 15l3 3 6-6"/>
  </svg>
);
const IconCert = () => (
  <svg width="26" height="26" viewBox="0 0 26 26" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="20" height="15" rx="2"/>
    <circle cx="13" cy="20" r="3"/><path d="M10 23l3-3 3 3"/>
    <path d="M8 9h10M8 13h6"/>
  </svg>
);

// Volunteer value icons
const IconLeadership = () => (
  <svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
    <path d="M11 2l2.4 7.4H21l-6.2 4.5 2.4 7.4L11 17l-6.2 4.3 2.4-7.4L1 9.4h7.6z"/>
  </svg>
);
const IconFlexible = () => (
  <svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="9"/><path d="M11 6v5l3 3"/>
  </svg>
);
const IconGrowth = () => (
  <svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="3,17 8,12 12,15 19,7"/>
    <polyline points="15,7 19,7 19,11"/>
  </svg>
);
const IconImpact = () => (
  <svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
    <path d="M11 3C7 3 4 6 4 10c0 5 7 9 7 9s7-4 7-9c0-4-3-7-7-7z"/>
    <circle cx="11" cy="10" r="2.5"/>
  </svg>
);

// NGO value icons
const IconAccess = () => (
  <svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="9"/>
    <path d="M11 6v5l4 2"/>
  </svg>
);
const IconCapacity = () => (
  <svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="11" width="5" height="8"/><rect x="9" y="6" width="5" height="13"/><rect x="15" y="3" width="5" height="16"/>
  </svg>
);
const IconStructured = () => (
  <svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 5h16M3 9h10M3 13h7M3 17h4"/>
    <circle cx="17" cy="14" r="4"/>
    <path d="M15.5 14l1 1.5L18.5 13"/>
  </svg>
);
const IconPartner = () => (
  <svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
    <path d="M7 11l2.5 2.5L15 8"/>
    <path d="M14.5 3.5A8 8 0 1 1 3.5 14.5"/>
    <path d="M14.5 3.5l2 5-5-2"/>
  </svg>
);

const WHO = [
  { label: "Tata Employees",         Icon: IconEmployee, desc: "Contribute skills from your current professional role. Apply only to projects aligned with your expertise." },
  { label: "Family Members",         Icon: IconFamily,   desc: "Spouses and family members of Tata employees with relevant professional skills." },
  { label: "Retired Tata Employees", Icon: IconRetired,  desc: "Decades of experience — still valued and welcomed. Your expertise continues to create impact." },
];

const HOW_STEPS = [
  { num: "01", title: "Project Announcements",   Icon: IconAnnounce, colour: "#7C3AED", desc: "Projects are announced twice a year — 15 June and 5 December. Engagements typically run 1–6 months, done during weekends, holidays, and after-work hours." },
  { num: "02", title: "NGO Project Upload",      Icon: IconNGO,      colour: "#1E6BB8", desc: "Credible NGOs submit project requirements designed to address a real organisational need and deliver tangible outcomes." },
  { num: "03", title: "Volunteer Applications",  Icon: IconApply,    colour: "#0D7C52", desc: "Eligible volunteers apply to projects aligned with their skills via the ProEngage platform, across diverse functional areas." },
  { num: "04", title: "Selection & Team Formation", Icon: IconMatch, colour: "#5B21B6", desc: "Non-profits review applications and select the best-fit volunteers for each project." },
  { num: "05", title: "Orientation & Planning",  Icon: IconOrient,   colour: "#C14D00", desc: "A mandatory orientation workshop sets expectations for both volunteers and non-profits. Clear action plans, objectives, and timelines are defined." },
  { num: "06", title: "Execution & Tracking",    Icon: IconDeliver,  colour: "#0E7490", desc: "Projects are tracked periodically to ensure progress and outcomes throughout the engagement." },
  { num: "07", title: "Closure & Recognition",   Icon: IconCert,     colour: "#B91C1C", desc: "Successful volunteers receive certificates. Learnings are documented for knowledge sharing and future impact." },
];

const VOLUNTEER_VALUES = [
  { label: "Apply your professional skills to real-world social challenges", Icon: IconImpact },
  { label: "Lead high-impact projects beyond your day-to-day role",          Icon: IconLeadership },
  { label: "Build leadership, collaboration, and problem-solving skills",    Icon: IconGrowth },
  { label: "Experience personal fulfilment by contributing to causes that matter", Icon: IconImpact },
  { label: "Volunteer flexibly, alongside your work commitments",            Icon: IconFlexible },
];

const NGO_VALUES = [
  { label: "Access high-quality professional expertise that may otherwise be unaffordable", Icon: IconAccess },
  { label: "Strengthen organisational capacity and long-term sustainability",               Icon: IconCapacity },
  { label: "Receive structured, outcome-driven support — not just ad hoc volunteering",     Icon: IconStructured },
  { label: "Partner with motivated professionals committed to delivering results",          Icon: IconPartner },
];

const SKILLS = [
  { label: "Human Resources",              icon: "HR" },
  { label: "Finance",                       icon: "FIN" },
  { label: "Business Planning & Strategy", icon: "STR" },
  { label: "Information Technology",       icon: "IT" },
  { label: "Web Design & Digital Solutions", icon: "WEB" },
  { label: "Marketing & Social Media",     icon: "MKT" },
  { label: "Mentoring & Coaching",          icon: "MNT" },
];

const TSG_POINTS = [
  "Sourcing meaningful, high-impact projects",
  "Inviting and managing volunteer applications",
  "Conducting orientation workshops",
  "Tracking progress throughout the project lifecycle",
  "Recognising successful volunteers",
  "Documenting learnings and building institutional knowledge",
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
export default function AboutProEngageView() {
  const navigate = useAppNavigate();
  const { isLoggedIn } = useAuth();

  return (
    <div style={{ background: "#fff", minHeight: "100vh", position: "relative" }}>

      <SubPageDotRail sections={SECTIONS} />

      {/* ════════════════════ HERO — photo + accent overlay ════════════════════ */}
      <div style={{ position: "relative", overflow: "hidden", display: "flex", alignItems: "center", background: COLOUR_DARK, paddingTop: 64 }}>
        <img src={peHeroImg} alt="" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "center" }} />
        <div style={{ position: "absolute", inset: 0, background: `linear-gradient(110deg, ${COLOUR_DARK}f5 0%, ${COLOUR_DARK}ee 38%, ${COLOUR}d0 62%, ${COLOUR}80 85%, ${COLOUR}40 100%)` }} />
        <div style={DIAG} />
        <div style={{ position: "absolute", top: -120, right: -100, width: 520, height: 520, background: "radial-gradient(circle, rgba(255,255,255,0.14) 0%, transparent 68%)", pointerEvents: "none" }} />

        <div style={{ position: "relative", zIndex: 1, maxWidth: 1100, margin: "0 auto", padding: "120px 56px 110px", width: "100%" }}>
          <div style={{ maxWidth: 720 }}>
            <p style={{ fontFamily: "'DM Mono', monospace", fontSize: 12, fontWeight: 600, letterSpacing: "2.4px", textTransform: "uppercase", color: "rgba(255,255,255,0.7)", marginBottom: 20 }}>
              Skill-Based Volunteering · Since 2014
            </p>
            <div style={{ width: 44, height: 3, background: "rgba(255,255,255,0.65)", borderRadius: 2, marginBottom: 28 }} />
            <h1 style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "clamp(3.4rem, 6.8vw, 5.4rem)", fontWeight: 900, color: "#fff", lineHeight: 1.02, letterSpacing: "-2.5px", margin: "0 0 28px" }}>
              ProEngage
            </h1>
            <p style={{ fontSize: 18, fontWeight: 300, lineHeight: 1.75, color: "rgba(255,255,255,0.92)", margin: "0 0 48px", maxWidth: 600 }}>
              ProEngage is the Tata Group's flagship part-time, skill-based volunteering programme — bringing together Tata talent and civil society organisations to create meaningful, long-term impact. Volunteers don't just give back. They lead, problem-solve, and create lasting change.
            </p>
            <div style={{ display: "flex", gap: 14 }}>
              <button onClick={() => navigate(isLoggedIn ? "proengage" : "register-role")}
                style={{ background: B_YELLOW, color: ACCENT_NAVY, border: "none", borderRadius: 12, padding: "16px 32px", fontWeight: 800, fontSize: 16, cursor: "pointer", boxShadow: "0 4px 20px rgba(0,0,0,0.25)" }}>
                Browse open projects →
              </button>
              <button onClick={() => document.getElementById("pe-overview")?.scrollIntoView({ behavior: "smooth" })}
                style={{ background: "rgba(255,255,255,0.14)", color: "#fff", border: "1.5px solid rgba(255,255,255,0.3)", borderRadius: 12, padding: "16px 28px", fontWeight: 600, fontSize: 16, cursor: "pointer" }}>
                Learn more
              </button>
            </div>
          </div>
        </div>

        <div style={{ position: "absolute", bottom: 32, right: 56, background: "rgba(0,0,0,0.22)", border: "1px solid rgba(255,255,255,0.2)", borderRadius: 100, padding: "7px 18px", fontFamily: "'DM Mono', monospace", fontSize: 10, fontWeight: 600, letterSpacing: "1.5px", textTransform: "uppercase", color: "rgba(255,255,255,0.85)" }}>
          Skill-based · Bi-annual · Year-round
        </div>
      </div>

      {/* ════════════════════ OVERVIEW ════════════════════ */}
      <section id="pe-overview" style={{ padding: "88px 56px", background: "#fff" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 72, alignItems: "center" }}>
          <div>
            <p style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, fontWeight: 600, letterSpacing: "1.8px", textTransform: "uppercase", color: COLOUR + "cc", marginBottom: 10 }}>What is ProEngage?</p>
            <h2 style={{ fontSize: 32, fontWeight: 900, color: ACCENT_NAVY, letterSpacing: "-0.5px" }}>Skill as a force for social good</h2>
            <DefinerBar colour={COLOUR} />
            <div style={{ marginTop: 28 }}>
              <p style={{ fontSize: 15, color: "#475569", lineHeight: 1.82, marginBottom: 16 }}>
                Many non-profits have deep passion and on-ground reach but often lack access to specialised professional skills. At the same time, the Tata Group is home to a diverse pool of experienced professionals across disciplines. ProEngage bridges this gap.
              </p>
              <p style={{ fontSize: 15, color: "#475569", lineHeight: 1.82 }}>
                Volunteers already working independently with a non-profit can also route their projects through ProEngage by emailing <span style={{ color: COLOUR, fontWeight: 600 }}>tataengage@tata.com</span>
              </p>
            </div>
          </div>
          <div style={{ position: "relative" }}>
            <div style={{ position: "absolute", top: -16, right: -16, zIndex: 0, width: 64, height: 64, borderRadius: 16, background: COLOUR, opacity: 0.12 }} />
            <div style={{ borderRadius: 18, overflow: "hidden", boxShadow: "0 4px 32px rgba(0,0,0,0.10)", position: "relative", zIndex: 1 }}>
              <img src="https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&q=80&w=900" alt=""
                style={{ width: "100%", height: 380, objectFit: "cover", display: "block" }} referrerPolicy="no-referrer" />
            </div>
            <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 4, background: COLOUR, borderRadius: "0 0 18px 18px", zIndex: 2 }} />
          </div>
        </div>
      </section>

      {/* ════════════════════ WHAT MAKES IT UNIQUE ════════════════════ */}
      <section id="pe-unique" style={{ padding: "80px 56px", background: "#F0F8F4" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <p style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, fontWeight: 600, letterSpacing: "1.8px", textTransform: "uppercase", color: COLOUR + "cc", marginBottom: 10 }}>The ProEngage difference</p>
          <h2 style={{ fontSize: 30, fontWeight: 900, color: ACCENT_NAVY, letterSpacing: "-0.5px" }}>What makes ProEngage unique?</h2>
          <DefinerBar colour={COLOUR} />
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, marginTop: 48 }}>

            {/* For Volunteers */}
            <div style={{ background: "#fff", borderRadius: 18, padding: "32px 28px", border: `1px solid ${COLOUR}18` }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 24 }}>
                <div style={{ width: 40, height: 40, borderRadius: 10, background: COLOUR_LIGHT, display: "flex", alignItems: "center", justifyContent: "center", color: COLOUR }}>
                  <IconEmployee />
                </div>
                <div style={{ fontSize: 16, fontWeight: 800, color: ACCENT_NAVY }}>For Volunteers</div>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                {VOLUNTEER_VALUES.map((v, i) => (
                  <div key={i} style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                    <div style={{ width: 32, height: 32, borderRadius: 8, background: COLOUR_LIGHT, flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", color: COLOUR }}>
                      <v.Icon />
                    </div>
                    <span style={{ fontSize: 14, color: "#475569", lineHeight: 1.55, paddingTop: 5 }}>{v.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* For Non-Profits */}
            <div style={{ background: COLOUR, borderRadius: 18, padding: "32px 28px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 24 }}>
                <div style={{ width: 40, height: 40, borderRadius: 10, background: "rgba(255,255,255,0.18)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff" }}>
                  <IconNGO />
                </div>
                <div style={{ fontSize: 16, fontWeight: 800, color: "#fff" }}>For Non-Profits</div>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                {NGO_VALUES.map((v, i) => (
                  <div key={i} style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                    <div style={{ width: 32, height: 32, borderRadius: 8, background: "rgba(255,255,255,0.18)", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff" }}>
                      <v.Icon />
                    </div>
                    <span style={{ fontSize: 14, color: "rgba(255,255,255,0.85)", lineHeight: 1.55, paddingTop: 5 }}>{v.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════ WHO ════════════════════ */}
      <section id="pe-who" style={{ position: "relative", overflow: "hidden", minHeight: 480 }}>
        <img src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=1800" alt=""
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 40%" }} referrerPolicy="no-referrer" />
        <div style={{ position: "absolute", inset: 0, background: `linear-gradient(110deg, ${COLOUR}f8 0%, ${COLOUR}e0 38%, ${COLOUR}c0 58%, ${COLOUR}88 78%, ${COLOUR}44 100%)` }} />
        <div style={DIAG} />
        <div style={{ position: "relative", zIndex: 1, padding: "88px 56px" }}>
          <div style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "center" }}>
            <div>
              <p style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, fontWeight: 600, letterSpacing: "1.8px", textTransform: "uppercase", color: "rgba(255,255,255,0.5)", marginBottom: 10 }}>Eligibility</p>
              <h2 style={{ fontSize: 30, fontWeight: 900, color: "#fff", letterSpacing: "-0.5px" }}>Who can participate?</h2>
              <div style={{ height: 3, background: "rgba(255,255,255,0.28)", borderRadius: 2, width: 48, marginTop: 10, marginBottom: 36 }} />
              <div style={{ marginBottom: 36 }}>
                <div style={{ fontSize: "clamp(3.5rem, 7vw, 5.5rem)", fontWeight: 900, color: "#fff", lineHeight: 1, letterSpacing: "-3px" }}>8,735+</div>
                <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 12, color: "rgba(255,255,255,0.55)", marginTop: 10, letterSpacing: "0.8px", maxWidth: 260, lineHeight: 1.5 }}>professionals who have donated their skills</div>
              </div>
              <p style={{ fontSize: 15, color: "rgba(255,255,255,0.7)", lineHeight: 1.8, maxWidth: 380 }}>
                ProEngage projects are skill-based. Volunteers are expected to apply only to projects aligned with their professional expertise.
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
      <section id="pe-how" style={{ padding: "96px 56px", background: "#fff" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <p style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, fontWeight: 600, letterSpacing: "1.8px", textTransform: "uppercase", color: COLOUR + "cc", marginBottom: 10 }}>The ProEngage journey</p>
          <h2 style={{ fontSize: 30, fontWeight: 900, color: ACCENT_NAVY, letterSpacing: "-0.5px" }}>Seven steps from announcement to certificate</h2>
          <DefinerBar colour={COLOUR} />
          <p style={{ fontSize: 15, color: "#64748B", marginTop: 18, maxWidth: 540, marginBottom: 56, lineHeight: 1.72 }}>
            Here's how the journey unfolds — from NGO submission through to volunteer recognition.
          </p>

          {/* Zigzag step layout */}
          <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
            {HOW_STEPS.map((step, idx) => (
              <div key={step.num} style={{
                display: "grid",
                gridTemplateColumns: idx % 2 === 0 ? "1fr auto 1fr" : "1fr auto 1fr",
                gap: 0,
                alignItems: "center",
                marginBottom: idx < HOW_STEPS.length - 1 ? 0 : 0,
              }}>
                {/* Left content */}
                {idx % 2 === 0 ? (
                  <div style={{ padding: "28px 36px 28px 0", textAlign: "right" }}>
                    <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, fontWeight: 700, letterSpacing: "1.5px", color: step.colour, textTransform: "uppercase", marginBottom: 8, opacity: 0.7 }}>{step.num}</div>
                    <div style={{ fontSize: 16, fontWeight: 800, color: ACCENT_NAVY, marginBottom: 8 }}>{step.title}</div>
                    <div style={{ fontSize: 13, color: "#64748B", lineHeight: 1.7, maxWidth: 320, marginLeft: "auto" }}>{step.desc}</div>
                  </div>
                ) : <div />}

                {/* Center icon */}
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", position: "relative" }}>
                  {idx > 0 && <div style={{ width: 2, height: 28, background: `${step.colour}30` }} />}
                  <div style={{
                    width: 64, height: 64, borderRadius: "50%",
                    background: step.colour,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    color: "#fff",
                    boxShadow: `0 6px 24px ${step.colour}40`,
                    flexShrink: 0,
                    zIndex: 1,
                  }}>
                    <step.Icon />
                  </div>
                  {idx < HOW_STEPS.length - 1 && <div style={{ width: 2, height: 28, background: `${HOW_STEPS[idx + 1].colour}30` }} />}
                </div>

                {/* Right content */}
                {idx % 2 !== 0 ? (
                  <div style={{ padding: "28px 0 28px 36px" }}>
                    <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, fontWeight: 700, letterSpacing: "1.5px", color: step.colour, textTransform: "uppercase", marginBottom: 8, opacity: 0.7 }}>{step.num}</div>
                    <div style={{ fontSize: 16, fontWeight: 800, color: ACCENT_NAVY, marginBottom: 8 }}>{step.title}</div>
                    <div style={{ fontSize: 13, color: "#64748B", lineHeight: 1.7, maxWidth: 320 }}>{step.desc}</div>
                  </div>
                ) : <div />}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════ TIMELINE ════════════════════ */}
      <section id="pe-timeline" style={{ padding: "88px 56px", background: "#fff" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <p style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, fontWeight: 600, letterSpacing: "1.8px", textTransform: "uppercase", color: COLOUR + "cc", marginBottom: 10 }}>Annual cycle</p>
          <h2 style={{ fontSize: 30, fontWeight: 900, color: ACCENT_NAVY, letterSpacing: "-0.5px" }}>Two announcement windows each year</h2>
          <DefinerBar colour={COLOUR} />
          <p style={{ fontSize: 15, color: "#64748B", lineHeight: 1.75, marginTop: 20, maxWidth: 560, marginBottom: 48 }}>
            ProEngage projects are announced twice a year. Mark these dates — they're when new opportunities open up across the platform.
          </p>

          <div style={{ position: "relative", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 32 }}>
            {/* Connecting line */}
            <div style={{ position: "absolute", top: 38, left: "12%", right: "12%", height: 2, background: `${COLOUR}25`, zIndex: 0 }} />

            {[
              { date: "15 June",      cycle: "Cycle 1",  desc: "Mid-year announcement opens the first wave of projects. Volunteers can browse and apply through monsoon and into the second half of the year." },
              { date: "5 December",   cycle: "Cycle 2",  desc: "Year-end announcement launches the second wave. Projects typically run through the new year, leveraging holidays and weekends." },
            ].map((t, i) => (
              <div key={t.date} style={{ position: "relative", zIndex: 1, background: COLOUR, border: `1.5px solid ${COLOUR}`, borderRadius: 18, padding: "28px 28px 30px", boxShadow: "0 4px 20px rgba(13,124,82,0.15)" }}>
                {/* Marker dot */}
                <div style={{ position: "absolute", top: -10, left: 28, width: 20, height: 20, borderRadius: "50%", background: "#fff", border: `4px solid ${COLOUR}`, boxShadow: `0 0 0 2px ${COLOUR}40` }} />
                <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, fontWeight: 700, letterSpacing: "1.8px", color: "rgba(255,255,255,0.75)", textTransform: "uppercase", marginTop: 10, marginBottom: 8 }}>{t.cycle}</div>
                <div style={{ fontSize: 32, fontWeight: 900, color: "#fff", letterSpacing: "-1px", lineHeight: 1, marginBottom: 14 }}>{t.date}</div>
                <div style={{ width: 32, height: 2, background: "rgba(255,255,255,0.6)", borderRadius: 2, marginBottom: 16 }} />
                <p style={{ fontSize: 14, color: "rgba(255,255,255,0.88)", lineHeight: 1.7, margin: 0 }}>{t.desc}</p>
              </div>
            ))}
          </div>

          <div style={{ marginTop: 40, padding: "18px 22px", background: COLOUR_LIGHT, border: `1px dashed ${COLOUR}55`, borderRadius: 12, fontSize: 13, color: COLOUR_DARK, fontWeight: 500, lineHeight: 1.6 }}>
            <strong style={{ fontWeight: 800 }}>Engagement length:</strong> Projects typically run 1–6 months, undertaken during weekends, holidays, and after-work hours.
          </div>
        </div>
      </section>

      {/* ════════════════════ SKILLS ════════════════════ */}
      <section id="pe-skills" style={{ padding: "80px 56px", background: "#F0F8F4" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <p style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, fontWeight: 600, letterSpacing: "1.8px", textTransform: "uppercase", color: COLOUR + "cc", marginBottom: 10 }}>Skill areas</p>
          <h2 style={{ fontSize: 30, fontWeight: 900, color: ACCENT_NAVY, letterSpacing: "-0.5px" }}>What skills are needed?</h2>
          <DefinerBar colour={COLOUR} />
          <p style={{ fontSize: 15, color: "#64748B", lineHeight: 1.75, marginTop: 20, maxWidth: 540, marginBottom: 40 }}>
            NGOs seek expertise across these disciplines. Apply only for projects aligned with your professional background.
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 12 }}>
            {SKILLS.map((skill) => (
              <div key={skill.label}
                style={{ background: "#fff", border: `1.5px solid ${COLOUR}18`, borderRadius: 14, padding: "20px 16px", display: "flex", flexDirection: "column", alignItems: "center", gap: 12, textAlign: "center", cursor: "default" }}>
                {/* Monogram badge instead of emoji */}
                <div style={{ width: 36, height: 36, borderRadius: 8, background: COLOUR_LIGHT, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, fontWeight: 800, color: COLOUR, letterSpacing: "0.5px" }}>{skill.icon}</span>
                </div>
                <div style={{ fontSize: 12, fontWeight: 700, color: ACCENT_NAVY, lineHeight: 1.3 }}>{skill.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════ TSG ROLE ════════════════════ */}
      <section id="pe-tsg" style={{ background: COLOUR_DARK, padding: "88px 56px", position: "relative", overflow: "hidden" }}>
        <div style={DIAG} />
        <div style={{ maxWidth: 1100, margin: "0 auto", position: "relative", zIndex: 1, display: "grid", gridTemplateColumns: "1.1fr 0.9fr", gap: 72, alignItems: "start" }}>
          <div>
            <p style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, fontWeight: 600, letterSpacing: "1.8px", textTransform: "uppercase", color: "rgba(255,255,255,0.5)", marginBottom: 10 }}>Tata Sustainability Group</p>
            <h2 style={{ fontSize: 30, fontWeight: 900, color: "#fff", letterSpacing: "-0.5px" }}>TSG's role in ProEngage</h2>
            <div style={{ height: 3, background: "rgba(255,255,255,0.25)", borderRadius: 2, width: 48, marginTop: 10, marginBottom: 24 }} />
            <p style={{ fontSize: 15, color: "rgba(255,255,255,0.78)", lineHeight: 1.75, marginBottom: 32, maxWidth: 480 }}>
              Tata Sustainability Group <strong style={{ color: "#fff", fontWeight: 700 }}>anchors and enables the ProEngage programme end-to-end</strong> by:
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
            <div style={{ fontSize: 24, fontWeight: 900, color: "#fff", marginBottom: 14, lineHeight: 1.2 }}>Ready to make an impact?</div>
            <p style={{ fontSize: 15, color: "rgba(255,255,255,0.68)", lineHeight: 1.78, marginBottom: 36 }}>
              Join thousands of Tata colleagues who contribute their professional skills through ProEngage.
            </p>
            <button onClick={() => navigate(isLoggedIn ? "proengage" : "register-role")}
              style={{ background: B_YELLOW, color: ACCENT_NAVY, border: "none", borderRadius: 10, padding: "14px 28px", fontWeight: 800, fontSize: 15, cursor: "pointer", width: "100%", boxShadow: "0 4px 20px rgba(0,0,0,0.22)" }}>
              Browse open projects →
            </button>
            <button onClick={() => navigate("about")}
              style={{ background: "transparent", color: "rgba(255,255,255,0.6)", border: "1px solid rgba(255,255,255,0.22)", borderRadius: 10, padding: "13px 28px", fontWeight: 600, fontSize: 14, cursor: "pointer", width: "100%", marginTop: 12 }}>
              ← Back to About
            </button>
          </div>
        </div>
      </section>

      
    </div>
  );
}
