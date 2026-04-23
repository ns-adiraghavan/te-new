import { useState, useEffect, useRef } from "react";
import { useAppNavigate } from "@/hooks/useAppNavigate";
import { useAuth } from "@/context/AuthContext";
import SubPageDotRail from "@/components/shared/SubPageDotRail";
import cvpHeroImg from "@/assets/tata-elxsi.jpg";

// ── Tokens ────────────────────────────────────────────────────────────────────
const ACCENT_NAVY  = "#0D1B3E";
const B_YELLOW     = "#F79425";
const COLOUR       = "#5B21B6";  // PE purple
const COLOUR_DARK  = "#3b1278";
const COLOUR_LIGHT = "#F3EEFF";

const SECTIONS = [
  { id: "cvp-overview", label: "Overview"           },
  { id: "cvp-examples", label: "Company programmes" },
  { id: "cvp-explore",  label: "Get involved"       },
];

const DIAG: React.CSSProperties = {
  position: "absolute", inset: 0,
  backgroundImage: "repeating-linear-gradient(45deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
  backgroundSize: "28px 28px",
  pointerEvents: "none",
};

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

export default function CVPView() {
  const navigate = useAppNavigate();
  const { isLoggedIn } = useAuth();

  return (
    <div className="dot-grid-bg" style={{ background: "transparent", minHeight: "100vh", position: "relative" }}>

      <SubPageDotRail sections={SECTIONS} />

      {/* ════ HERO ════ */}
      <div style={{ position: "relative", minHeight: "92vh", overflow: "hidden", display: "flex", alignItems: "center", paddingTop: 64 }}>
        <img src={cvpHeroImg} alt=""
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "center" }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to right, rgba(8,12,22,0.82) 0%, rgba(8,12,22,0.65) 40%, rgba(8,12,22,0.18) 75%, rgba(8,12,22,0.10) 100%)" }} />
        <div style={{ position: "relative", zIndex: 1, maxWidth: 1100, margin: "0 auto", padding: "0 64px", width: "100%" }}>
          <p style={{ fontFamily: "'Noto Sans','DM Sans',ui-sans-serif,system-ui,sans-serif", fontSize: 14, fontWeight: 700, letterSpacing: "1.8px", textTransform: "uppercase", color: "#ffffff", margin: "0 0 12px" }}>
            Group-wide · Year-round
          </p>
          <div style={{ height: 2, width: 48, borderRadius: 2, background: "rgba(255,255,255,0.6)", margin: "12px 0 22px" }} />
          <h1 style={{ fontFamily: "'Noto Sans','DM Sans',ui-sans-serif,system-ui,sans-serif", fontSize: "clamp(2.4rem, 5vw, 3.8rem)", fontWeight: 400, color: "#fff", lineHeight: 1.12, letterSpacing: "-0.5px", margin: "0 0 18px", maxWidth: 620 }}>
            Company Volunteering Programmes
          </h1>
          <p style={{ fontFamily: "'Noto Sans','DM Sans',ui-sans-serif,system-ui,sans-serif", fontSize: 16, fontWeight: 300, lineHeight: 1.7, color: "rgba(255,255,255,0.65)", margin: "0 0 32px", maxWidth: 520 }}>
            Each Tata company runs its own volunteering initiatives — rooted in their unique business context, employee strengths, and the communities they serve.
          </p>
          <div style={{ display: "flex", gap: 14 }}>
            <button onClick={() => navigate(isLoggedIn ? "dashboard" : "register-role")}
              style={{ background: B_YELLOW, color: ACCENT_NAVY, border: "none", borderRadius: 12, padding: "14px 28px", fontWeight: 800, fontSize: 14, cursor: "pointer", boxShadow: "0 4px 20px rgba(0,0,0,0.25)" }}>
              {isLoggedIn ? "Go to Dashboard" : "Join Tata Engage"} →
            </button>
            <button onClick={() => document.getElementById("cvp-overview")?.scrollIntoView({ behavior: "smooth" })}
              style={{ background: "rgba(255,255,255,0.12)", color: "#fff", border: "1.5px solid rgba(255,255,255,0.28)", borderRadius: 12, padding: "14px 24px", fontWeight: 600, fontSize: 14, cursor: "pointer" }}>
              Learn more
            </button>
          </div>
        </div>
        <div style={{ position: "absolute", bottom: 32, right: 56, background: "rgba(0,0,0,0.22)", border: "1px solid rgba(255,255,255,0.2)", borderRadius: 100, padding: "7px 18px", fontFamily: "'Noto Sans','DM Sans',ui-sans-serif,system-ui,sans-serif", fontSize: 14, fontWeight: 700, letterSpacing: "1.8px", textTransform: "uppercase", color: "#ffffff" }}>
          Company-led · Context-driven · Year-round
        </div>
      </div>

      {/* ════ OVERVIEW ════ */}
      <section id="cvp-overview" style={{ padding: "88px 56px", background: "transparent" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 72, alignItems: "center" }}>
          <div>
            <p style={{ fontFamily: "'Noto Sans','DM Sans',ui-sans-serif,system-ui,sans-serif", fontSize: 14, fontWeight: 700, letterSpacing: "1.8px", textTransform: "uppercase", color: COLOUR + "cc", marginBottom: 10 }}>About CVP</p>
            <h2 style={{ fontSize: 32, fontWeight: 900, color: ACCENT_NAVY, letterSpacing: "-0.5px" }}>Volunteering, the way each Tata company does it</h2>
            <DefinerBar colour={COLOUR} />
            <div style={{ marginTop: 28 }}>
              <p style={{ fontSize: 15, color: "#475569", lineHeight: 1.82, marginBottom: 16 }}>
                A Company Volunteering Programme (CVP) is a company-led volunteering programme or bouquet of volunteering opportunities mindfully curated by the company considering the operating context and employee aspirations, and may cater to the needs of the local communities.
              </p>
              <p style={{ fontSize: 15, color: "#475569", lineHeight: 1.82, marginBottom: 16 }}>
                These may be aligned to the company's CSR programmes, are usually branded, and entail employees volunteering their time and expertise either during official work hours or in their personal time.
              </p>
              <p style={{ fontSize: 15, color: "#475569", lineHeight: 1.82 }}>
                CVPs have contributed significantly to institutionalising and building a culture of volunteering at the company level.
              </p>
            </div>
          </div>
          <div style={{ position: "relative" }}>
            <div style={{ position: "absolute", top: -16, right: -16, zIndex: 0, width: 64, height: 64, borderRadius: 16, background: COLOUR, opacity: 0.12 }} />
            <div style={{ borderRadius: 18, overflow: "hidden", boxShadow: "0 4px 32px rgba(0,0,0,0.10)", position: "relative", zIndex: 1 }}>
              <img src="https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&q=80&w=900" alt=""
                style={{ width: "100%", height: 380, objectFit: "cover", display: "block" }} referrerPolicy="no-referrer" />
            </div>
            <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 4, background: COLOUR, borderRadius: "0 0 18px 18px", zIndex: 2 }} />
          </div>
        </div>
      </section>

      {/* ════ EXAMPLES — dark accent panel ════ */}
      <section id="cvp-examples" style={{ position: "relative", overflow: "hidden", minHeight: 480 }}>
        <img src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80&w=1800" alt=""
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 40%" }} referrerPolicy="no-referrer" />
        <div style={{ position: "absolute", inset: 0, background: `linear-gradient(110deg, ${COLOUR}f8 0%, ${COLOUR}e0 38%, ${COLOUR}c0 58%, ${COLOUR}88 78%, ${COLOUR}44 100%)` }} />
        <div style={DIAG} />
        <div style={{ position: "relative", zIndex: 1, padding: "88px 56px" }}>
          <div style={{ maxWidth: 1100, margin: "0 auto" }}>
            <p style={{ fontFamily: "'Noto Sans','DM Sans',ui-sans-serif,system-ui,sans-serif", fontSize: 14, fontWeight: 700, letterSpacing: "1.8px", textTransform: "uppercase", color: "#ffffff", marginBottom: 10 }}>Programmes from across the Group</p>
            <h2 style={{ fontSize: 30, fontWeight: 900, color: "#fff", letterSpacing: "-0.5px" }}>Company programmes in action</h2>
            <div style={{ height: 3, background: "rgba(255,255,255,0.28)", borderRadius: 2, width: 48, marginTop: 10, marginBottom: 40 }} />
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
              {[
                { title: "TCS — Each One Empowers One", desc: "A digital literacy platform enabling any employee to teach financial and digital skills to a beneficiary — accessible in 9 Indian languages." },
                { title: "Infiniti Retail — E-Waste Warrior Programme", desc: "Croma's campaign to educate, empower, and encourage Tata Group employees to responsibly recycle e-waste through authorised partners." },
                { title: "Company-led initiatives", desc: "Across the Tata Group, companies run their own employee-led initiatives focused on education, health, environment, and community welfare in their operating regions." },
              ].map((c, i) => (
                <div key={i} style={{ background: "rgba(255,255,255,0.10)", backdropFilter: "blur(8px)", border: "1px solid rgba(255,255,255,0.18)", borderRadius: 16, padding: 28 }}>
                  <div style={{ width: 32, height: 3, background: "rgba(255,255,255,0.55)", borderRadius: 2, marginBottom: 18 }} />
                  <div style={{ fontSize: 15, fontWeight: 800, color: "#fff", marginBottom: 12, lineHeight: 1.3 }}>{c.title}</div>
                  <div style={{ fontSize: 13, color: "rgba(255,255,255,0.78)", lineHeight: 1.72 }}>{c.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ════ TSG / GET INVOLVED ════ */}
      <section id="cvp-explore" style={{ background: COLOUR_DARK, padding: "88px 56px", position: "relative", overflow: "hidden" }}>
        <div style={DIAG} />
        <div style={{ maxWidth: 1100, margin: "0 auto", position: "relative", zIndex: 1, display: "grid", gridTemplateColumns: "1.1fr 0.9fr", gap: 72, alignItems: "start" }}>
          <div>
            <p style={{ fontFamily: "'Noto Sans','DM Sans',ui-sans-serif,system-ui,sans-serif", fontSize: 14, fontWeight: 700, letterSpacing: "1.8px", textTransform: "uppercase", color: "#ffffff", marginBottom: 10 }}>Get involved</p>
            <h2 style={{ fontSize: 30, fontWeight: 900, color: "#fff", letterSpacing: "-0.5px" }}>Find a CVP near you</h2>
            <div style={{ height: 3, background: "rgba(255,255,255,0.25)", borderRadius: 2, width: 48, marginTop: 10, marginBottom: 36 }} />
            <p style={{ fontSize: 15, color: "rgba(255,255,255,0.85)", lineHeight: 1.78, marginBottom: 24 }}>
              To learn more about your company's volunteering programme, reach out to your CSR or Volunteering SPOC. Tata Engage facilitates collaboration and visibility across the Group.
            </p>
            <p style={{ fontSize: 14, color: "rgba(255,255,255,0.5)", lineHeight: 1.7 }}>
              For queries, reach out to <a href="mailto:tataengage@tata.com" style={{ color: "rgba(255,255,255,0.75)", textDecoration: "none", fontWeight: 600 }}>tataengage@tata.com</a>
            </p>
          </div>
          <div style={{ background: "rgba(0,0,0,0.22)", borderRadius: 20, padding: "40px 36px", border: "1px solid rgba(255,255,255,0.14)" }}>
            <div style={{ fontSize: 24, fontWeight: 900, color: "#fff", marginBottom: 14, lineHeight: 1.2 }}>Be Part of the Movement</div>
            <p style={{ fontSize: 15, color: "rgba(255,255,255,0.68)", lineHeight: 1.78, marginBottom: 36 }}>
              Join millions of Tata employees volunteering through company-led programmes across the Group.
            </p>
            <button onClick={() => navigate(isLoggedIn ? "dashboard" : "register-role")}
              style={{ background: B_YELLOW, color: ACCENT_NAVY, border: "none", borderRadius: 10, padding: "14px 28px", fontWeight: 800, fontSize: 15, cursor: "pointer", width: "100%", boxShadow: "0 4px 20px rgba(0,0,0,0.22)" }}>
              {isLoggedIn ? "Go to Dashboard" : "Join Tata Engage"} →
            </button>
            <button onClick={() => navigate("eoi")}
              style={{ background: "transparent", color: "rgba(255,255,255,0.6)", border: "1px solid rgba(255,255,255,0.22)", borderRadius: 10, padding: "13px 28px", fontWeight: 600, fontSize: 14, cursor: "pointer", width: "100%", marginTop: 12 }}>
              Explore Employees' Own Initiatives
            </button>
          </div>
        </div>
      </section>

    </div>
  );
}
