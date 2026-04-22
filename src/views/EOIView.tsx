import { useState, useEffect, useRef } from "react";
import { useAppNavigate } from "@/hooks/useAppNavigate";
import { useAuth } from "@/context/AuthContext";
import Footer from "@/components/layout/Footer";

// ── Tokens ────────────────────────────────────────────────────────────────────
const ACCENT_NAVY  = "#0D1B3E";
const B_MUSTARD    = "#C8940A";
const COLOUR       = "#333399"; // B_INDIGO
const COLOUR_MID   = "#252573";
const COLOUR_LIGHT = "#EEF0FF";

const SECTIONS = [
  { id: "eoi-overview", label: "Overview"             },
  { id: "eoi-who",      label: "Who can participate"  },
  { id: "eoi-eoeo",     label: "Each One Empowers One" },
];

const DIAG: React.CSSProperties = {
  position: "absolute", inset: 0,
  backgroundImage: "repeating-linear-gradient(45deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
  backgroundSize: "28px 28px",
  pointerEvents: "none",
};

const STEPS = [
  { num: "01", text: "Identify and understand your beneficiary — we recommend a pre-assessment test" },
  { num: "02", text: "Enroll your beneficiary by filling in the required details" },
  { num: "03", text: "Teach at your own pace — content is downloadable" },
  { num: "04", text: "Earn rewards and certificates for your contribution" },
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
export default function EOIView() {
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
        <img src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&q=80&w=1800"
          alt="" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "center" }} referrerPolicy="no-referrer" />
        <div style={{ position: "absolute", inset: 0, background: `linear-gradient(108deg, ${COLOUR}f5 0%, ${COLOUR}e8 28%, ${COLOUR}b0 52%, ${COLOUR}50 70%, ${COLOUR}18 100%)` }} />
        <div style={DIAG} />
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 80, background: "linear-gradient(to bottom, transparent, #fff)", pointerEvents: "none" }} />

        <div style={{ position: "relative", zIndex: 1, maxWidth: 1100, margin: "0 auto", padding: "120px 56px 96px", width: "100%" }}>
          <div style={{ maxWidth: 600 }}>
            <p style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, fontWeight: 600, letterSpacing: "2.2px", textTransform: "uppercase", color: "rgba(255,255,255,0.5)", marginBottom: 16 }}>
              Employee Initiative · Year-round
            </p>
            <div style={{ width: 32, height: 2, background: "rgba(255,255,255,0.45)", borderRadius: 2, marginBottom: 22 }} />
            <h1 style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "clamp(2.8rem, 5.5vw, 4.2rem)", fontWeight: 900, color: "#fff", lineHeight: 1.02, letterSpacing: "-2px", margin: "0 0 22px" }}>
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
              <button onClick={() => document.getElementById("eoi-eoeo")?.scrollIntoView({ behavior: "smooth" })}
                style={{ background: "rgba(255,255,255,0.11)", color: "#fff", border: "1.5px solid rgba(255,255,255,0.26)", borderRadius: 10, padding: "12px 22px", fontWeight: 600, fontSize: 14, cursor: "pointer" }}>
                Featured EOI
              </button>
            </div>
          </div>
        </div>

        <div style={{ position: "absolute", bottom: 100, right: 56, background: "rgba(0,0,0,0.28)", backdropFilter: "blur(8px)", border: "1px solid rgba(255,255,255,0.18)", borderRadius: 100, padding: "7px 18px", fontFamily: "'DM Mono', monospace", fontSize: 10, fontWeight: 600, letterSpacing: "1.5px", textTransform: "uppercase", color: "rgba(255,255,255,0.7)" }}>
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

      {/* ════════════════════ EACH ONE EMPOWERS ONE ════════════════════ */}
      <section id="eoi-eoeo" style={{ padding: "88px 56px", background: "#fff" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <p style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, fontWeight: 600, letterSpacing: "1.8px", textTransform: "uppercase", color: COLOUR + "cc", marginBottom: 10 }}>Featured EOI</p>
          <h2 style={{ fontSize: 32, fontWeight: 900, color: ACCENT_NAVY, letterSpacing: "-0.5px" }}>Each One Empowers One</h2>
          <DefinerBar colour={COLOUR} />

          <div style={{ marginTop: 32, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 56, alignItems: "start" }}>
            <div>
              <p style={{ fontSize: 16, color: "#475569", lineHeight: 1.82, marginBottom: 16 }}>
                One very impactful, flexible, and easy to use EOI opportunity that every Tata Group employee can explore is 'Each One Empower One' — TCS's intuitive digital literacy platform for the people, by the people.
              </p>
              <p style={{ fontSize: 16, color: "#475569", lineHeight: 1.82 }}>
                The platform enables any individual to empower another by providing financial and digital literacy, while unlocking citizen entitlements. It is accessible in 9 Indian languages and offers trainings, videos, assessments, and digital certificates for both the volunteer and their beneficiary.
              </p>
            </div>
            <div style={{ background: COLOUR_LIGHT, borderRadius: 18, padding: "32px 28px", border: `1px solid ${COLOUR}22` }}>
              <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, fontWeight: 700, letterSpacing: "1.8px", textTransform: "uppercase", color: COLOUR, marginBottom: 14 }}>How it works</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                {STEPS.map((s) => (
                  <div key={s.num} style={{ background: "#fff", borderRadius: 12, padding: "16px 18px", display: "flex", gap: 16, alignItems: "flex-start", border: "1px solid #e8e8f0" }}>
                    <div style={{ width: 36, height: 36, borderRadius: 10, flexShrink: 0, background: COLOUR, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'DM Mono',monospace", fontSize: 13, fontWeight: 700 }}>{s.num}</div>
                    <div style={{ fontSize: 14, color: "#334155", lineHeight: 1.6, paddingTop: 6 }}>{s.text}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div style={{ marginTop: 48, background: COLOUR, borderRadius: 20, padding: "40px 44px", position: "relative", overflow: "hidden", display: "grid", gridTemplateColumns: "1.4fr 0.6fr", gap: 32, alignItems: "center" }}>
            <div style={DIAG} />
            <div style={{ position: "relative", zIndex: 1 }}>
              <div style={{ fontSize: 22, fontWeight: 900, color: "#fff", lineHeight: 1.25, marginBottom: 10, letterSpacing: "-0.4px" }}>Ready to make a difference, one person at a time?</div>
              <p style={{ fontSize: 14, color: "rgba(255,255,255,0.78)", lineHeight: 1.7, margin: 0 }}>
                Join thousands of Tata employees empowering beneficiaries with financial and digital literacy.
              </p>
            </div>
            <div style={{ position: "relative", zIndex: 1, display: "flex", justifyContent: "flex-end" }}>
              <button
                onClick={() => navigate(isLoggedIn ? "dashboard" : "register-role")}
                style={{ background: B_MUSTARD, color: "#fff", border: "none", borderRadius: 10, padding: "14px 26px", fontWeight: 800, fontSize: 14, cursor: "pointer", boxShadow: "0 4px 20px rgba(0,0,0,0.22)", whiteSpace: "nowrap" }}
              >
                Become a Literacy Champion →
              </button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
