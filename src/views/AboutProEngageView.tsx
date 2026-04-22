import { useState, useEffect, useRef } from "react";
import { useAppNavigate } from "@/hooks/useAppNavigate";
import { useAuth } from "@/context/AuthContext";
import Footer from "@/components/layout/Footer";

// ── Tokens ────────────────────────────────────────────────────────────────────
const ACCENT_NAVY  = "#0D1B3E";
const B_MUSTARD    = "#C8940A";
const COLOUR       = "#4D7A2A";
const COLOUR_MID   = "#3A5C1F";
const COLOUR_LIGHT = "#EDF5E8";

const SECTIONS = [
  { id: "pe-overview", label: "Overview"    },
  { id: "pe-who",      label: "Who"         },
  { id: "pe-how",      label: "How it works" },
  { id: "pe-skills",   label: "Skills"      },
  { id: "pe-tsg",      label: "TSG Role"    },
];

const DIAG: React.CSSProperties = {
  position: "absolute", inset: 0,
  backgroundImage: "repeating-linear-gradient(45deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
  backgroundSize: "28px 28px",
  pointerEvents: "none",
};

const STATS = [
  { num: "4,392",  label: "Projects in FY24"   },
  { num: "85+",    label: "NGO partners"        },
  { num: "1–6 mo", label: "Project duration"    },
];

const WHO = [
  { label: "Tata Employees",         icon: "💼", desc: "Contribute skills from your current professional role" },
  { label: "Family Members",         icon: "👨‍👩‍👧", desc: "Spouses and family with relevant expertise" },
  { label: "Retired Tata Employees", icon: "🎓", desc: "Decades of experience — still valued and welcomed" },
];

const STEPS = [
  { num: "01", title: "NGOs submit briefs",      desc: "Projects are announced twice a year: 15 June and 5 December. Projects typically run for 1 to 6 months, with volunteering done during weekends, holidays, and after-work hours.", highlight: true },
  { num: "02", title: "TSG curates & approves",  desc: "Credible NGOs submit their project requirements designed to address a real organisational need and deliver tangible outcomes. TSG reviews each brief for quality, feasibility, and impact.", highlight: false },
  { num: "03", title: "Volunteers apply",         desc: "Tata employees browse open projects, filter by skill and cause, and submit applications.", highlight: false },
  { num: "04", title: "AI-assisted matching",     desc: "A matching algorithm pairs best-fit volunteers with each project based on skills and availability.", highlight: false },
  { num: "05", title: "Orientation & kick-off",   desc: "TSG conducts an orientation workshop. Volunteers get all the context they need to start strong.", highlight: false },
  { num: "06", title: "Deliver & get certified",  desc: "Volunteers complete the project with periodic TSG check-ins. Certificates issued on completion.", highlight: false },
];

const SKILLS = [
  "Human Resources", "Finance & Accounting", "Business Planning & Strategy",
  "Information Technology", "Web Design & Digital Solutions", "Marketing & Social Media",
  "Mentoring & Coaching", "Legal & Compliance", "Data & Analytics", "Project Management",
];

const TSG_POINTS = [
  "Sourcing meaningful projects from verified NGO partners",
  "Reviewing and approving volunteer applications",
  "Conducting orientation workshops for selected volunteers",
  "Periodic milestone tracking throughout the project",
  "Awarding certificates on project completion",
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
  const [activeSection, setActiveSection] = useState(0);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    SECTIONS.forEach(({ id }, idx) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveSection(idx); },
        { threshold: 0.25 }
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  return (
    <div style={{ background: "#fff", minHeight: "100vh", position: "relative" }}>

      {/* Sticky top accent stripe */}
      <div style={{ height: 4, background: COLOUR, position: "sticky", top: 0, zIndex: 100 }} />

      {/* ── Dot rail ── */}
      <div style={{ position: "fixed", right: 20, top: "50%", transform: "translateY(-50%)", display: "flex", flexDirection: "column", gap: 12, zIndex: 50 }}>
        {SECTIONS.map(({ id, label }, i) => {
          const active = activeSection === i;
          return (
            <button key={id} onClick={() => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })}
              style={{ display: "flex", alignItems: "center", justifyContent: "flex-end", background: "none", border: "none", cursor: "pointer", padding: 0 }}>
              {active && (
                <span style={{ fontSize: 11, fontWeight: 600, padding: "3px 10px", borderRadius: 100, marginRight: 8, whiteSpace: "nowrap", background: "#fff", border: "1px solid #e2e8f0", color: "#334155", boxShadow: "0 1px 4px rgba(0,0,0,0.06)" }}>{label}</span>
              )}
              <span style={{ display: "block", borderRadius: "50%", width: active ? 10 : 7, height: active ? 10 : 7, background: active ? COLOUR : "#CBD5E1", transition: "all 0.25s" }} />
            </button>
          );
        })}
      </div>

      {/* ════════════════════ HERO ════════════════════ */}
      <div style={{ position: "relative", minHeight: "92vh", overflow: "hidden", display: "flex", alignItems: "center" }}>
        <img src="https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&q=80&w=1800"
          alt="" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "center" }} referrerPolicy="no-referrer" />
        <div style={{ position: "absolute", inset: 0, background: `linear-gradient(108deg, ${COLOUR}f5 0%, ${COLOUR}e8 28%, ${COLOUR}b0 52%, ${COLOUR}50 70%, ${COLOUR}18 100%)` }} />
        <div style={DIAG} />
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 80, background: "linear-gradient(to bottom, transparent, #fff)", pointerEvents: "none" }} />

        <div style={{ position: "relative", zIndex: 1, maxWidth: 1100, margin: "0 auto", padding: "120px 56px 96px", width: "100%" }}>
          <div style={{ maxWidth: 560 }}>
            <p style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, fontWeight: 600, letterSpacing: "2.2px", textTransform: "uppercase", color: "rgba(255,255,255,0.5)", marginBottom: 16 }}>
              Skill-Based Volunteering · Since Dec 2014
            </p>
            <div style={{ width: 32, height: 2, background: "rgba(255,255,255,0.45)", borderRadius: 2, marginBottom: 22 }} />
            <h1 style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "clamp(2.8rem, 5.5vw, 4.2rem)", fontWeight: 900, color: "#fff", lineHeight: 1.02, letterSpacing: "-2px", margin: "0 0 22px" }}>
              ProEngage
            </h1>
            <p style={{ fontSize: 15, fontWeight: 300, lineHeight: 1.8, color: "rgba(255,255,255,0.78)", margin: "0 0 44px", maxWidth: 460 }}>
              ProEngage is the Tata Group's flagship part-time, skill-based volunteering programme that brings together Tata talent and civil society organisations to create meaningful, long-term impact. Volunteers don't just give back — they lead, problem-solve, and create lasting change.
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
              <button onClick={() => navigate(isLoggedIn ? "proengage" : "register-role")}
                style={{ background: B_MUSTARD, color: "#fff", border: "none", borderRadius: 10, padding: "12px 26px", fontWeight: 800, fontSize: 14, cursor: "pointer", boxShadow: "0 4px 20px rgba(0,0,0,0.25)" }}>
                Browse open projects →
              </button>
              <button onClick={() => document.getElementById("pe-overview")?.scrollIntoView({ behavior: "smooth" })}
                style={{ background: "rgba(255,255,255,0.11)", color: "#fff", border: "1.5px solid rgba(255,255,255,0.26)", borderRadius: 10, padding: "12px 22px", fontWeight: 600, fontSize: 14, cursor: "pointer" }}>
                Learn more
              </button>
            </div>
          </div>
        </div>

        <div style={{ position: "absolute", bottom: 100, right: 56, background: "rgba(0,0,0,0.28)", backdropFilter: "blur(8px)", border: "1px solid rgba(255,255,255,0.18)", borderRadius: 100, padding: "7px 18px", fontFamily: "'DM Mono', monospace", fontSize: 10, fontWeight: 600, letterSpacing: "1.5px", textTransform: "uppercase", color: "rgba(255,255,255,0.7)" }}>
          Skill-based · Year-round
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
              <p style={{ fontSize: 16, color: "#475569", lineHeight: 1.82, marginBottom: 16 }}>
                At its core, ProEngage enables Tata employees, their families, and retired colleagues to contribute their professional expertise to purpose-driven projects — helping non-profits accelerate their goals while offering volunteers a deeply fulfilling personal and professional experience.
              </p>
              <p style={{ fontSize: 16, color: "#475569", lineHeight: 1.82 }}>
                Volunteers already working with a non-profit independently can also route their projects through ProEngage by emailing tataengage@tata.com
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
                <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 12, color: "rgba(255,255,255,0.55)", marginTop: 10, letterSpacing: "0.8px", maxWidth: 260, lineHeight: 1.5 }}>professionals who've donated their skills</div>
              </div>
              <p style={{ fontSize: 15, color: "rgba(255,255,255,0.7)", lineHeight: 1.8, maxWidth: 380 }}>
                ProEngage is open to Tata Employees, Family Members of Tata Employees, and Retired Tata Employees. Note: ProEngage projects are skill-based. Volunteers are expected to apply only to projects aligned with their expertise.
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
      <section id="pe-how" style={{ padding: "88px 56px", background: "#fff" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <p style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, fontWeight: 600, letterSpacing: "1.8px", textTransform: "uppercase", color: COLOUR + "cc", marginBottom: 10 }}>The ProEngage journey</p>
          <h2 style={{ fontSize: 30, fontWeight: 900, color: ACCENT_NAVY, letterSpacing: "-0.5px" }}>Six steps from brief to certificate</h2>
          <DefinerBar colour={COLOUR} />
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16, marginTop: 48 }}>
            {STEPS.map((s) => (
              <div key={s.num}
                style={{ background: s.highlight ? COLOUR : "#fff", border: `1px solid ${s.highlight ? COLOUR : "#e8e8f0"}`, borderRadius: 16, padding: "26px 22px", transition: "box-shadow 0.2s" }}
                onMouseEnter={(e) => { if (!s.highlight) (e.currentTarget as HTMLElement).style.boxShadow = "0 8px 24px rgba(0,0,0,0.08)"; }}
                onMouseLeave={(e) => { if (!s.highlight) (e.currentTarget as HTMLElement).style.boxShadow = "none"; }}
              >
                <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, fontWeight: 600, letterSpacing: "1.5px", color: s.highlight ? "rgba(255,255,255,0.5)" : COLOUR + "90", marginBottom: 14 }}>{s.num}</div>
                <div style={{ fontSize: 15, fontWeight: 800, color: s.highlight ? "#fff" : ACCENT_NAVY, marginBottom: 8 }}>{s.title}</div>
                <div style={{ fontSize: 13, color: s.highlight ? "rgba(255,255,255,0.75)" : "#64748B", lineHeight: 1.7 }}>{s.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════ SKILLS ════════════════════ */}
      <section id="pe-skills" style={{ padding: "80px 56px", background: "#F4F8F5" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <p style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, fontWeight: 600, letterSpacing: "1.8px", textTransform: "uppercase", color: COLOUR + "cc", marginBottom: 10 }}>Skill areas</p>
          <h2 style={{ fontSize: 30, fontWeight: 900, color: ACCENT_NAVY, letterSpacing: "-0.5px" }}>What skills are needed?</h2>
          <DefinerBar colour={COLOUR} />
          <p style={{ fontSize: 15, color: "#64748B", lineHeight: 1.75, marginTop: 20, maxWidth: 540 }}>
            NGOs seek expertise across these domains. Apply for a project in the area you know best.
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 12, marginTop: 36 }}>
            {SKILLS.map((skill) => (
              <div key={skill}
                style={{ background: "#fff", border: `1.5px solid ${COLOUR}18`, borderRadius: 14, padding: "20px 16px", display: "flex", flexDirection: "column", alignItems: "center", gap: 10, textAlign: "center", cursor: "pointer", transition: "all 0.18s" }}
                onMouseEnter={(e) => { const el = e.currentTarget as HTMLElement; el.style.background = COLOUR_LIGHT; el.style.borderColor = COLOUR; el.style.transform = "translateY(-2px)"; }}
                onMouseLeave={(e) => { const el = e.currentTarget as HTMLElement; el.style.background = "#fff"; el.style.borderColor = COLOUR + "18"; el.style.transform = "none"; }}
              >
                <div style={{ fontSize: 12, fontWeight: 700, color: ACCENT_NAVY, lineHeight: 1.3 }}>{skill}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════ TSG ROLE ════════════════════ */}
      <section id="pe-tsg" style={{ background: COLOUR_MID, padding: "88px 56px", position: "relative", overflow: "hidden" }}>
        <div style={DIAG} />
        <div style={{ maxWidth: 1100, margin: "0 auto", position: "relative", zIndex: 1, display: "grid", gridTemplateColumns: "1.1fr 0.9fr", gap: 72, alignItems: "start" }}>
          <div>
            <p style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, fontWeight: 600, letterSpacing: "1.8px", textTransform: "uppercase", color: "rgba(255,255,255,0.5)", marginBottom: 10 }}>Tata Sustainability Group</p>
            <h2 style={{ fontSize: 30, fontWeight: 900, color: "#fff", letterSpacing: "-0.5px" }}>TSG's role in ProEngage</h2>
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
              Join thousands of Tata colleagues who contribute their professional skills through ProEngage.
            </p>
            <button onClick={() => navigate(isLoggedIn ? "proengage" : "register-role")}
              style={{ background: B_MUSTARD, color: "#fff", border: "none", borderRadius: 10, padding: "14px 28px", fontWeight: 800, fontSize: 15, cursor: "pointer", width: "100%", boxShadow: "0 4px 20px rgba(0,0,0,0.22)" }}>
              Browse open projects →
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
