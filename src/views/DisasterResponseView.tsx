import { useState, useEffect, useRef } from "react";
import { useAppNavigate } from "@/hooks/useAppNavigate";
import { useAuth } from "@/context/AuthContext";
import SubPageDotRail from "@/components/shared/SubPageDotRail";
import drHeroImg  from "@/assets/banner_photos/Inner Page - Program - Disaster Response Ban.jpg";
import drBelowImg from "@/assets/banner_photos/DR Inner page below banner.JPG";
import drWhoImg   from "@/assets/homepagebanner/DSC_0250.JPG";

// ── Tokens ────────────────────────────────────────────────────────────────────
const ACCENT_NAVY  = "#0D1B3E";
const B_YELLOW     = "#F79425";
const COLOUR       = "#007A8A";
const COLOUR_MID   = "#005F6B";
const COLOUR_LIGHT = "#E6F5F7";

const SECTIONS = [
  { id: "dr-overview",  label: "Overview"     },
  { id: "dr-why",       label: "Why it matters" },
  { id: "dr-who",       label: "Who"           },
  { id: "dr-how",       label: "How it works"  },
  { id: "dr-tsg",       label: "TSG Role"      },
];

const DIAG: React.CSSProperties = {
  position: "absolute", inset: 0,
  backgroundImage: "repeating-linear-gradient(45deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
  backgroundSize: "28px 28px",
  pointerEvents: "none",
};

// ── All data strictly from vetted copy ───────────────────────────────────────

// Three volunteer roles — exact durations from vetted copy
const ROLES = [
  {
    label: "Project Managers",
    duration: "15–60 days",
    desc: "Bring the knowledge and capability to manage large-scale disaster response initiatives. As leaders of the relief mission.",
  },
  {
    label: "Procurement Officers",
    duration: "15–60 days",
    desc: "Trained in emergency supply-chain management and logistics.",
  },
  {
    label: "Core Volunteers",
    duration: "7–30 days",
    desc: "Contribute to critical activities such as conducting need assessments, coordinating logistics, preparing and distributing relief kits, and supporting medical camps and allied relief efforts.",
  },
];

// Why it matters — for communities (vetted copy)
const FOR_COMMUNITIES = [
  "Faster access to essential relief and medical support",
  "Better-coordinated on-ground efforts driven by clear assessments and planning",
  "Support that goes beyond immediate relief to enable early recovery",
];

// Why it matters — for volunteers (vetted copy)
const FOR_VOLUNTEERS = [
  "Make a direct, tangible difference during moments of crisis",
  "Work closely with cross-company teams in challenging environments",
  "Deepen a sense of purpose, empathy, and social responsibility",
];

// Selection criteria — verbatim from vetted copy
const SELECTION_CRITERIA = [
  "Proximity to the disaster-affected area",
  "Knowledge of the local language",
  "Past volunteering and field experience",
  "Medical fitness",
];

// SVG icons — no emoji
const IconManager = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="7" width="20" height="14" rx="2"/>
    <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/>
    <line x1="12" y1="12" x2="12" y2="16"/>
    <line x1="10" y1="14" x2="14" y2="14"/>
  </svg>
);

const IconProcurement = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M1 3h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
    <circle cx="10" cy="20.5" r="1.5"/>
    <circle cx="18" cy="20.5" r="1.5"/>
  </svg>
);

const IconVolunteer = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
    <circle cx="9" cy="7" r="4"/>
    <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
    <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
  </svg>
);

const ROLE_ICONS = [IconManager, IconProcurement, IconVolunteer];

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
    <div className="dot-grid-bg" style={{ background: "transparent", minHeight: "100vh", position: "relative" }}>

      <SubPageDotRail sections={SECTIONS} />

      {/* ════════════════════ HERO — photo + accent overlay ════════════════════ */}
      <div style={{ position: "relative", minHeight: "92vh", overflow: "hidden", display: "flex", alignItems: "center", paddingTop: 64 }}>
        <img src={drHeroImg} alt="" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "center" }} />
        <div style={{ position: "absolute", inset: 0, background: `linear-gradient(110deg, ${COLOUR}e8 0%, ${COLOUR}cc 38%, ${COLOUR}aa 58%, ${COLOUR}77 78%, ${COLOUR}44 100%)` }} />

        <div style={{ position: "relative", zIndex: 1, maxWidth: 1100, margin: "0 auto", padding: "0 64px", width: "100%" }}>
          <p style={{ fontFamily: "'DM Sans','Noto Sans',ui-sans-serif,system-ui,sans-serif", fontSize: 14, fontWeight: 700, letterSpacing: "1.8px", textTransform: "uppercase", color: "#ffffff", margin: "0 0 12px" }}>
            Emergency Volunteering · One Tata Response
          </p>
          <div style={{ height: 2, width: 48, borderRadius: 2, background: "rgba(255,255,255,0.6)", margin: "12px 0 22px" }} />
          <h1 style={{ fontFamily: "'DM Sans','Noto Sans',ui-sans-serif,system-ui,sans-serif", fontSize: "clamp(2.4rem, 5vw, 3.8rem)", fontWeight: 400, color: "#fff", lineHeight: 1.12, letterSpacing: "-0.5px", margin: "0 0 18px" }}>
            Volunteering for Disaster Response
          </h1>
          <p style={{ fontFamily: "'DM Sans','Noto Sans',ui-sans-serif,system-ui,sans-serif", fontSize: 15, fontWeight: 300, lineHeight: 1.7, color: "rgba(255,255,255,0.65)", margin: "0 0 32px", maxWidth: 520 }}>
            Responding to humanitarian crises has always been integral to the Tata ethos. In moments of natural and humanitarian disasters, the Tata Engage platform serves as a vital channel to mobilise employees across the Group, enabling quick, coordinated volunteer action.
          </p>
          <div style={{ display: "flex", gap: 12 }}>
            <button onClick={() => navigate(isLoggedIn ? "dr-availability-form" : "register-role")}
              style={{ background: B_YELLOW, color: ACCENT_NAVY, border: "none", borderRadius: 10, padding: "14px 28px", fontWeight: 800, fontSize: 14, cursor: "pointer", boxShadow: "0 4px 20px rgba(0,0,0,0.25)" }}>
              Register your interest →
            </button>
            <button onClick={() => document.getElementById("dr-overview")?.scrollIntoView({ behavior: "smooth" })}
              style={{ background: "rgba(255,255,255,0.12)", color: "#fff", border: "1.5px solid rgba(255,255,255,0.28)", borderRadius: 10, padding: "14px 22px", fontWeight: 600, fontSize: 14, cursor: "pointer" }}>
              Learn more
            </button>
          </div>
        </div>

        <div style={{ position: "absolute", bottom: 32, right: 56, background: "rgba(0,0,0,0.22)", border: "1px solid rgba(255,255,255,0.2)", borderRadius: 100, padding: "7px 18px", fontFamily: "'DM Sans','Noto Sans',ui-sans-serif,system-ui,sans-serif", fontSize: 10, fontWeight: 700, letterSpacing: "1.5px", textTransform: "uppercase", color: "rgba(255,255,255,0.75)" }}>
          Rapid · Organised · Compassionate
        </div>
      </div>

      {/* ════════════════════ OVERVIEW ════════════════════ */}
      <section id="dr-overview" style={{ padding: "88px 56px", background: "transparent" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 72, alignItems: "center" }}>
          <div>
            <p style={{ fontFamily: "'DM Sans','Noto Sans',ui-sans-serif,system-ui,sans-serif", fontSize: 14, fontWeight: 700, letterSpacing: "1.8px", textTransform: "uppercase", color: COLOUR + "cc", marginBottom: 10 }}>About the programme</p>
            <h2 style={{ fontSize: 30, fontWeight: 900, color: ACCENT_NAVY, letterSpacing: "-0.5px" }}>The Tata ethos of service, in action</h2>
            <DefinerBar colour={COLOUR} />
            <div style={{ marginTop: 28 }}>
              <p style={{ fontSize: 15, color: "#475569", lineHeight: 1.82, marginBottom: 16 }}>
                Responding to humanitarian crises has always been integral to the Tata ethos. In moments of natural and humanitarian disasters, the Tata Engage platform serves as a vital channel to mobilise employees across the Group, enabling quick, coordinated volunteer action.
              </p>
              <p style={{ fontSize: 15, color: "#475569", lineHeight: 1.82 }}>
                Volunteers from different Tata companies work closely on the ground alongside Project Managers, Procurement Officers, and Core Volunteers — each playing a defined role in the relief mission. Their contribution plays a vital role in ensuring timely, efficient, and dignified support to affected communities.
              </p>
            </div>
          </div>
          <div style={{ position: "relative" }}>
            <div style={{ position: "absolute", top: -16, right: -16, zIndex: 0, width: 64, height: 64, borderRadius: 16, background: COLOUR, opacity: 0.12 }} />
            <div style={{ borderRadius: 18, overflow: "hidden", boxShadow: "0 4px 32px rgba(0,0,0,0.10)", position: "relative", zIndex: 1 }}>
              <img src={drBelowImg} alt=""
                style={{ width: "100%", height: 380, objectFit: "cover", objectPosition: "center", display: "block" }} />
            </div>
            <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 4, background: COLOUR, borderRadius: "0 0 18px 18px", zIndex: 2 }} />
          </div>
        </div>
      </section>

      {/* ════════════════════ WHY IT MATTERS ════════════════════ */}
      <section id="dr-why" style={{ padding: "88px 56px", background: "#F4F8F7" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <p style={{ fontFamily: "'DM Sans','Noto Sans',ui-sans-serif,system-ui,sans-serif", fontSize: 14, fontWeight: 700, letterSpacing: "1.8px", textTransform: "uppercase", color: COLOUR + "cc", marginBottom: 10 }}>Why it matters</p>
          <h2 style={{ fontSize: 30, fontWeight: 900, color: ACCENT_NAVY, letterSpacing: "-0.5px" }}>Why is volunteering for Disaster Response important?</h2>
          <DefinerBar colour={COLOUR} />
          <p style={{ fontSize: 15, color: "#475569", lineHeight: 1.82, marginTop: 24, maxWidth: 700, marginBottom: 48 }}>
            In the wake of disasters, timely and coordinated action can significantly ease suffering and accelerate recovery. Volunteering for Disaster Response enables Tata to mobilise trained, committed employees who can respond quickly and responsibly when communities are at their most vulnerable.
          </p>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
            {/* For communities */}
            <div style={{ background: "#fff", borderRadius: 18, padding: "32px 28px", border: `1px solid ${COLOUR}18` }}>
              <div style={{ width: 32, height: 3, background: COLOUR, borderRadius: 2, marginBottom: 20 }} />
              <div style={{ fontSize: 16, fontWeight: 800, color: ACCENT_NAVY, marginBottom: 20 }}>For affected communities</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                {FOR_COMMUNITIES.map((point, i) => (
                  <div key={i} style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                    <div style={{ width: 20, height: 20, borderRadius: "50%", background: COLOUR_LIGHT, flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", marginTop: 2 }}>
                      <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                        <path d="M1.5 5l2.5 2.5 4.5-4" stroke={COLOUR} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    <span style={{ fontSize: 14, color: "#475569", lineHeight: 1.65 }}>{point}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* For volunteers */}
            <div style={{ background: COLOUR, borderRadius: 18, padding: "32px 28px" }}>
              <div style={{ width: 32, height: 3, background: "rgba(255,255,255,0.4)", borderRadius: 2, marginBottom: 20 }} />
              <div style={{ fontSize: 16, fontWeight: 800, color: "#fff", marginBottom: 20 }}>For volunteers</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                {FOR_VOLUNTEERS.map((point, i) => (
                  <div key={i} style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                    <div style={{ width: 20, height: 20, borderRadius: "50%", background: "rgba(255,255,255,0.2)", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", marginTop: 2 }}>
                      <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                        <path d="M1.5 5l2.5 2.5 4.5-4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    <span style={{ fontSize: 14, color: "rgba(255,255,255,0.85)", lineHeight: 1.65 }}>{point}</span>
                  </div>
                ))}
              </div>
              <p style={{ fontSize: 13, color: "rgba(255,255,255,0.6)", lineHeight: 1.7, marginTop: 24, fontStyle: "italic" }}>
                Rooted in the Tata tradition of service, Disaster Response volunteering reflects the belief that compassion, when combined with professional capability, can create meaningful and lasting impact.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════ WHO ════════════════════ */}
      <section id="dr-who" style={{ position: "relative", overflow: "hidden", minHeight: 480 }}>
        <img src={drWhoImg} alt=""
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 40%" }} />
        <div style={{ position: "absolute", inset: 0, background: `linear-gradient(110deg, ${COLOUR}f8 0%, ${COLOUR}e0 38%, ${COLOUR}c0 58%, ${COLOUR}88 78%, ${COLOUR}44 100%)` }} />
        <div style={DIAG} />
        <div style={{ position: "relative", zIndex: 1, padding: "88px 56px" }}>
          <div style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "start" }}>
            <div>
              <p style={{ fontFamily: "'DM Sans','Noto Sans',ui-sans-serif,system-ui,sans-serif", fontSize: 14, fontWeight: 700, letterSpacing: "1.8px", textTransform: "uppercase", color: "#ffffff", marginBottom: 10 }}>Who can volunteer?</p>
              <h2 style={{ fontSize: 30, fontWeight: 900, color: "#fff", letterSpacing: "-0.5px" }}>Tata Employees</h2>
              <div style={{ height: 3, background: "rgba(255,255,255,0.28)", borderRadius: 2, width: 48, marginTop: 10, marginBottom: 28 }} />
              <p style={{ fontSize: 15, color: "rgba(255,255,255,0.8)", lineHeight: 1.8, marginBottom: 28, maxWidth: 380 }}>
                Expressions of interest are invited from Tata employees registered on tataengage.com. Based on defined eligibility criteria and the ability to commit time and effort during emergencies, volunteers are shortlisted to join the Disaster Response teams deployed on the ground.
              </p>
              <p style={{ fontSize: 13, color: "rgba(255,255,255,0.55)", lineHeight: 1.7, maxWidth: 360, fontStyle: "italic" }}>
                Volunteers from different Tata companies work closely on the ground alongside Project Managers, Procurement Officers, and Core Volunteers.
              </p>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
              {ROLES.map((role, i) => {
                const Icon = ROLE_ICONS[i];
                return (
                  <div key={role.label} style={{ padding: "28px 0", borderBottom: i < ROLES.length - 1 ? "1px solid rgba(255,255,255,0.14)" : "none", display: "flex", gap: 20, alignItems: "flex-start" }}>
                    <div style={{ width: 52, height: 52, borderRadius: 14, flexShrink: 0, background: "rgba(255,255,255,0.14)", backdropFilter: "blur(4px)", border: "1px solid rgba(255,255,255,0.2)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff" }}>
                      <Icon />
                    </div>
                    <div>
                      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
                        <div style={{ fontSize: 16, fontWeight: 800, color: "#fff" }}>{role.label}</div>
                        <div style={{ fontFamily: "'DM Sans','Noto Sans',ui-sans-serif,system-ui,sans-serif", fontSize: 10, fontWeight: 700, color: COLOUR, background: "rgba(255,255,255,0.15)", border: "1px solid rgba(255,255,255,0.2)", borderRadius: 100, padding: "2px 8px", letterSpacing: "0.5px" }}>{role.duration}</div>
                      </div>
                      <div style={{ fontSize: 13, color: "rgba(255,255,255,0.65)", lineHeight: 1.7 }}>{role.desc}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════ HOW IT WORKS ════════════════════ */}
      <section id="dr-how" style={{ padding: "88px 56px", background: "transparent" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <p style={{ fontFamily: "'DM Sans','Noto Sans',ui-sans-serif,system-ui,sans-serif", fontSize: 14, fontWeight: 700, letterSpacing: "1.8px", textTransform: "uppercase", color: COLOUR + "cc", marginBottom: 10 }}>The process</p>
          <h2 style={{ fontSize: 30, fontWeight: 900, color: ACCENT_NAVY, letterSpacing: "-0.5px" }}>How do we go about it?</h2>
          <DefinerBar colour={COLOUR} />
          <p style={{ fontSize: 15, color: "#475569", lineHeight: 1.82, marginTop: 24, maxWidth: 680, marginBottom: 52 }}>
            Once a request is received from Project Managers, the volunteer identification process begins through two primary channels: volunteers who have registered their interest on the Tata Engage platform, and nominations facilitated through the CSR Heads of Tata companies.
          </p>

          {/* Two identification channels */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 48 }}>
            <div style={{ background: COLOUR, borderRadius: 16, padding: "28px 26px", border: `1px solid ${COLOUR}` }}>
              <div style={{ width: 32, height: 3, background: "rgba(255,255,255,0.6)", borderRadius: 2, marginBottom: 18 }} />
              <div style={{ fontSize: 15, fontWeight: 800, color: "#fff", marginBottom: 10 }}>Channel 1</div>
              <div style={{ fontSize: 14, color: "rgba(255,255,255,0.88)", lineHeight: 1.7 }}>Volunteers who have registered their interest on the Tata Engage platform</div>
            </div>
            <div style={{ background: COLOUR, borderRadius: 16, padding: "28px 26px", border: `1px solid ${COLOUR}` }}>
              <div style={{ width: 32, height: 3, background: "rgba(255,255,255,0.6)", borderRadius: 2, marginBottom: 18 }} />
              <div style={{ fontSize: 15, fontWeight: 800, color: "#fff", marginBottom: 10 }}>Channel 2</div>
              <div style={{ fontSize: 14, color: "rgba(255,255,255,0.88)", lineHeight: 1.7 }}>Nominations facilitated through the CSR Heads of Tata companies</div>
            </div>
          </div>

          {/* Selection criteria */}
          <div style={{ background: "#1E6BB8", borderRadius: 18, padding: "36px 40px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 40, alignItems: "start" }}>
            <div>
              <p style={{ fontFamily: "'DM Sans','Noto Sans',ui-sans-serif,system-ui,sans-serif", fontSize: 14, fontWeight: 700, letterSpacing: "1.8px", textTransform: "uppercase", color: "#ffffff", marginBottom: 14 }}>Selection criteria</p>
              <div style={{ fontSize: 20, fontWeight: 900, color: "#fff", lineHeight: 1.25, marginBottom: 16 }}>Selection is based on parameters such as:</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {SELECTION_CRITERIA.map((c, i) => (
                  <div key={i} style={{ display: "flex", gap: 12, alignItems: "center" }}>
                    <div style={{ width: 24, height: 24, borderRadius: "50%", background: COLOUR, flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                        <path d="M1.5 5l2.5 2.5 4.5-4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    <span style={{ fontSize: 14, color: "rgba(255,255,255,0.85)", lineHeight: 1.5 }}>{c}</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <p style={{ fontFamily: "'DM Sans','Noto Sans',ui-sans-serif,system-ui,sans-serif", fontSize: 14, fontWeight: 700, letterSpacing: "1.8px", textTransform: "uppercase", color: "#ffffff", marginBottom: 14 }}>Then</p>
              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                {[
                  { step: "01", text: "Shortlisted volunteers are interviewed and oriented" },
                  { step: "02", text: "Deployed to provide essential on-ground support" },
                  { step: "03", text: "Immersed fully in rescue, relief, and recovery over 7–10 days" },
                  { step: "04", text: "On completion, formally recognised and awarded certificates" },
                ].map((s) => (
                  <div key={s.step} style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
                    <div style={{ fontFamily: "'DM Sans','Noto Sans',ui-sans-serif,system-ui,sans-serif", fontSize: 11, fontWeight: 700, color: COLOUR, flexShrink: 0, minWidth: 24 }}>{s.step}</div>
                    <span style={{ fontSize: 14, color: "rgba(255,255,255,0.75)", lineHeight: 1.6 }}>{s.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════ TSG ROLE ════════════════════ */}
      <section id="dr-tsg" style={{ background: COLOUR_MID, padding: "88px 56px", position: "relative", overflow: "hidden" }}>
        <div style={DIAG} />
        <div style={{ maxWidth: 1100, margin: "0 auto", position: "relative", zIndex: 1, display: "grid", gridTemplateColumns: "1.1fr 0.9fr", gap: 72, alignItems: "start" }}>
          <div>
            <p style={{ fontFamily: "'DM Sans','Noto Sans',ui-sans-serif,system-ui,sans-serif", fontSize: 14, fontWeight: 700, letterSpacing: "1.8px", textTransform: "uppercase", color: "#ffffff", marginBottom: 10 }}>Tata Sustainability Group</p>
            <h2 style={{ fontSize: 30, fontWeight: 900, color: "#fff", letterSpacing: "-0.5px" }}>TSG's role in Disaster Response</h2>
            <div style={{ height: 3, background: "rgba(255,255,255,0.25)", borderRadius: 2, width: 48, marginTop: 10, marginBottom: 28 }} />
            <p style={{ fontSize: 15, color: "rgba(255,255,255,0.8)", lineHeight: 1.82, marginBottom: 32 }}>
              The Tata Sustainability Group anchors and steers the ONE Tata Disaster Response programme end-to-end. Working in close collaboration with Tata companies, TSG leads the planning, coordination, and execution of relief and rehabilitation measures in disaster-affected areas, ensuring that Tata's response is timely, structured, and impactful.
            </p>
          </div>
          <div style={{ background: "rgba(0,0,0,0.22)", borderRadius: 20, padding: "40px 36px", border: "1px solid rgba(255,255,255,0.14)" }}>
            <div style={{ fontSize: 22, fontWeight: 900, color: "#fff", marginBottom: 14, lineHeight: 1.25 }}>
              Register your interest
            </div>
            <p style={{ fontSize: 15, color: "rgba(255,255,255,0.68)", lineHeight: 1.78, marginBottom: 36 }}>
              Expressions of interest are invited from Tata employees registered on tataengage.com. Join the Disaster Response volunteer pool today.
            </p>
            <button onClick={() => navigate(isLoggedIn ? "dr-availability-form" : "register-role")}
              style={{ background: B_YELLOW, color: ACCENT_NAVY, border: "none", borderRadius: 10, padding: "14px 28px", fontWeight: 800, fontSize: 15, cursor: "pointer", width: "100%", boxShadow: "0 4px 20px rgba(0,0,0,0.22)" }}>
              Register your interest →
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
