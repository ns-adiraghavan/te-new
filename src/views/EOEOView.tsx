import React, { useState, useEffect, useRef } from "react";
import { useAppNavigate } from "@/hooks/useAppNavigate";
import { useAuth } from "@/context/AuthContext";
import SubPageDotRail from "@/components/shared/SubPageDotRail";

const ACCENT_NAVY  = "#0D1B3E";
const COLOUR       = "#F4838A";  // Team pink
const COLOUR_MID   = "#C85E64";
const COLOUR_LIGHT = "#FEF0F1";

const SECTIONS = [
  { id: "eoeo-about",     label: "About"          },
  { id: "eoeo-who",       label: "Who can join"   },
  { id: "eoeo-offerings", label: "Offerings"      },
  { id: "eoeo-journey",   label: "4-step journey" },
];

const DIAG: React.CSSProperties = {
  position: "absolute", inset: 0,
  backgroundImage: "repeating-linear-gradient(45deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
  backgroundSize: "28px 28px",
  pointerEvents: "none",
};

const STEPS = [
  { num: "01", title: "Identify your beneficiary", desc: "Know your beneficiary through a pre-assessment test before you begin." },
  { num: "02", title: "Enrol in the system",       desc: "Fill in the required details to enrol your beneficiary and start the journey." },
  { num: "03", title: "Teach at your own pace",    desc: "Content is downloadable — volunteer at a pace that works for you." },
  { num: "04", title: "Get rewards & certificates",desc: "Recognition of your beneficiary's learning and your contribution matters to us." },
];

const OFFERINGS = [
  {
    title: "Functional Literacy",
    hours: "55 hours",
    desc: "Self-paced learning focused on reading, writing, and arithmetic. Knowledge of 500 commonly used words in regional language. Ability to read newspapers, sign boards, do calculations, and budgeting. Builds self-respect, confidence, and dignity.",
  },
  {
    title: "Key Citizen Entitlements",
    hours: "6 hours",
    desc: "Self-paced awareness on Aadhaar Card, Jan Dhan Bank Account, PM Jeevan Jyoti Bima Yojana, PM Suraksha Bima Yojana, and PM Jan Aarogya Yojana. Builds self-respect, confidence, and dignity.",
  },
];

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

export default function EOEOView() {
  const navigate = useAppNavigate();
  const { isLoggedIn } = useAuth();

  return (
    <div style={{ background: "#f5f5fa", minHeight: "100vh", position: "relative" }}>

      <SubPageDotRail sections={SECTIONS} />

      {/* HERO */}
      <div style={{ position: "relative", minHeight: "92vh", overflow: "hidden", display: "flex", alignItems: "center", paddingTop: 64 }}>
        <img
          src="https://images.unsplash.com/photo-1497486751825-1233686d5d80?auto=format&fit=crop&q=80&w=1800"
          alt="" referrerPolicy="no-referrer"
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "center" }}
        />
        <div style={{ position: "absolute", inset: 0, background: `linear-gradient(110deg, ${COLOUR}e8 0%, ${COLOUR}cc 38%, ${COLOUR}aa 58%, ${COLOUR}77 78%, ${COLOUR}44 100%)` }} />

        <div style={{ position: "relative", zIndex: 1, maxWidth: 1100, margin: "0 auto", padding: "0 64px", width: "100%" }}>
          <div style={{ maxWidth: 640 }}>
            <p style={{ fontFamily: "'DM Sans','Noto Sans',ui-sans-serif,system-ui,sans-serif", fontSize: 14, fontWeight: 700, letterSpacing: "1.8px", textTransform: "uppercase", color: "#ffffff", margin: "0 0 12px" }}>
              TCS · Employee Initiative · Year-round
            </p>
            <div style={{ width: 48, height: 2, background: "rgba(255,255,255,0.6)", borderRadius: 2, margin: "12px 0 22px" }} />
            <h1 style={{ fontFamily: "'DM Sans','Noto Sans',ui-sans-serif,system-ui,sans-serif", fontSize: "clamp(2.4rem, 5vw, 3.8rem)", fontWeight: 400, color: "#fff", lineHeight: 1.12, letterSpacing: "-0.5px", margin: "0 0 22px" }}>
              Each One<br />Empowers One
            </h1>
            <p style={{ fontFamily: "'DM Sans','Noto Sans',ui-sans-serif,system-ui,sans-serif", fontSize: 15, fontWeight: 300, lineHeight: 1.7, color: "rgba(255,255,255,0.65)", margin: "0 0 32px", maxWidth: 520 }}>
              TCS's intuitive digital literacy platform — for the people, by the people. Enable financial, digital, and functional literacy in 9 Indian languages.
            </p>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              <a
                href="https://tcsempowers.tcsapps.com/apac2/alp/"
                target="_blank" rel="noopener noreferrer"
                style={{ background: "#fff", color: COLOUR_MID, border: "none", borderRadius: 10, padding: "14px 28px", fontWeight: 800, fontSize: 14, boxShadow: "0 4px 20px rgba(0,0,0,0.25)", textDecoration: "none", display: "inline-block" }}
              >
                Become a Literacy Champion →
              </a>
              <button
                onClick={() => document.getElementById("eoeo-about")?.scrollIntoView({ behavior: "smooth" })}
                style={{ background: "rgba(255,255,255,0.12)", color: "#fff", border: "1.5px solid rgba(255,255,255,0.28)", borderRadius: 10, padding: "14px 22px", fontWeight: 600, fontSize: 14, cursor: "pointer" }}
              >
                Learn more
              </button>
            </div>
          </div>
        </div>

        <div style={{ position: "absolute", bottom: 100, right: 56, background: "rgba(0,0,0,0.28)", backdropFilter: "blur(8px)", border: "1px solid rgba(255,255,255,0.18)", borderRadius: 100, padding: "7px 18px", fontFamily: "'DM Sans','Noto Sans',ui-sans-serif,system-ui,sans-serif", fontSize: 14, fontWeight: 700, letterSpacing: "1.8px", textTransform: "uppercase", color: "#ffffff" }}>
          Digital · Financial · Functional Literacy
        </div>
      </div>

      {/* ABOUT */}
      <section id="eoeo-about" style={{ padding: "88px 56px", background: "#fff" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 72, alignItems: "start" }}>
          <div>
            <p style={{ fontFamily: "'DM Sans','Noto Sans',ui-sans-serif,system-ui,sans-serif", fontSize: 14, fontWeight: 700, letterSpacing: "1.8px", textTransform: "uppercase", color: COLOUR, marginBottom: 10 }}>About the platform</p>
            <h2 style={{ fontSize: 30, fontWeight: 900, color: ACCENT_NAVY, letterSpacing: "-0.5px" }}>Become a TCS Literacy Champion</h2>
            <DefinerBar colour={COLOUR} />
            <div style={{ marginTop: 28 }}>
              <p style={{ fontSize: 15, color: "#475569", lineHeight: 1.82, marginBottom: 16 }}>
                At the Tata Group, we welcome volunteering efforts of employees outside the framework of company-led programmes, provided it has been enabled by some element of support from the company. The <strong>Employees' Own Initiative (EOI)</strong> avenue was initiated during the pandemic and has continued to thrive — successfully democratising volunteering by empowering employees to give back at their convenience, for causes they are passionate about.
              </p>
              <p style={{ fontSize: 15, color: "#475569", lineHeight: 1.82 }}>
                One very impactful, flexible, and easy-to-use EOI opportunity is <strong>"Each One Empowers One"</strong> — TCS's intuitive digital literacy platform for the people, by the people. The platform enables any individual to empower another by providing financial and digital literacy while unlocking citizen entitlements — social safety nets offered by the Indian Government. Accessible in <strong>9 Indian languages</strong>, it offers trainings, videos, assessments, and digital certificates for both the volunteer and their beneficiary.
              </p>
            </div>
          </div>
          <div>
            <div style={{ background: COLOUR_LIGHT, borderRadius: 18, padding: "32px 28px", border: "1px solid #13BBB430", marginBottom: 16 }}>
              <div style={{ fontFamily: "'DM Sans','Noto Sans',ui-sans-serif,system-ui,sans-serif", fontSize: 10, fontWeight: 700, letterSpacing: "1.8px", textTransform: "uppercase", color: COLOUR, marginBottom: 12 }}>Sign up to volunteer</div>
              <p style={{ fontSize: 15, color: "#334155", lineHeight: 1.7, marginBottom: 20 }}>
                Use your official Tata email ID to register as a volunteer on the TCS Empowers portal and enrol one or more beneficiaries.
              </p>
              <a
                href="https://tcsempowers.tcsapps.com/apac2/alp/"
                target="_blank" rel="noopener noreferrer"
                style={{ display: "inline-block", background: COLOUR, color: "#fff", borderRadius: 8, padding: "12px 24px", fontWeight: 700, fontSize: 14, textDecoration: "none" }}
              >
                Sign up on TCS Empowers →
              </a>
            </div>
            <div style={{ background: "#fff", border: "1px solid #e8e8f0", borderRadius: 14, padding: "20px 24px" }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: ACCENT_NAVY, marginBottom: 6 }}>Available in 9 Indian languages</div>
              <div style={{ fontSize: 13, color: "#64748B", lineHeight: 1.6 }}>Hindi · Bengali · Telugu · Marathi · Tamil · Urdu · Gujarati · Kannada · Odia</div>
            </div>
          </div>
        </div>
      </section>

      {/* WHO */}
      <section id="eoeo-who" style={{ background: "#f5f5fa", padding: "88px 56px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64 }}>
          <div>
            <p style={{ fontFamily: "'DM Sans','Noto Sans',ui-sans-serif,system-ui,sans-serif", fontSize: 14, fontWeight: 700, letterSpacing: "1.8px", textTransform: "uppercase", color: COLOUR, marginBottom: 10 }}>Volunteers</p>
            <h2 style={{ fontSize: 30, fontWeight: 900, color: ACCENT_NAVY, letterSpacing: "-0.5px" }}>Who can participate?</h2>
            <DefinerBar colour={COLOUR} />
            <p style={{ fontSize: 15, color: "#475569", lineHeight: 1.82, marginTop: 24 }}>
              Any Tata Group employee can register using their official Tata email ID and enrol one or more beneficiaries.
            </p>
          </div>
          <div>
            <p style={{ fontFamily: "'DM Sans','Noto Sans',ui-sans-serif,system-ui,sans-serif", fontSize: 14, fontWeight: 700, letterSpacing: "1.8px", textTransform: "uppercase", color: COLOUR, marginBottom: 10 }}>Beneficiaries</p>
            <h2 style={{ fontSize: 30, fontWeight: 900, color: ACCENT_NAVY, letterSpacing: "-0.5px" }}>Whom can you empower?</h2>
            <DefinerBar colour={COLOUR} />
            <p style={{ fontSize: 15, color: "#475569", lineHeight: 1.82, marginTop: 24 }}>
              Any adult (age ≥ 15 years) — women or marginalised youth — who have never been to school or are partially literate, lack financial/digital literacy, or are unaware of their citizen entitlements. This could include your cook, driver, security guard, gardener, or housekeeping staff.
            </p>
          </div>
        </div>
      </section>

      {/* OFFERINGS */}
      <section id="eoeo-offerings" style={{ background: "#fff", padding: "88px 56px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <p style={{ fontFamily: "'DM Sans','Noto Sans',ui-sans-serif,system-ui,sans-serif", fontSize: 14, fontWeight: 700, letterSpacing: "1.8px", textTransform: "uppercase", color: COLOUR, marginBottom: 10 }}>What's on offer</p>
          <h2 style={{ fontSize: 30, fontWeight: 900, color: ACCENT_NAVY, letterSpacing: "-0.5px" }}>The offerings</h2>
          <DefinerBar colour={COLOUR} />
          <div style={{ marginTop: 48, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
            {OFFERINGS.map((o) => (
              <div key={o.title} style={{ background: COLOUR_LIGHT, borderRadius: 16, padding: "32px 28px", border: "1px solid #13BBB425" }}>
                <div style={{ display: "inline-block", background: COLOUR, color: "#fff", borderRadius: 100, padding: "4px 14px", fontSize: 12, fontWeight: 700, marginBottom: 16 }}>{o.hours} self-paced</div>
                <div style={{ fontSize: 18, fontWeight: 800, color: ACCENT_NAVY, marginBottom: 12 }}>{o.title}</div>
                <div style={{ fontSize: 14, color: "#475569", lineHeight: 1.75 }}>{o.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4-STEP JOURNEY */}
      <section id="eoeo-journey" style={{ background: "#f5f5fa", padding: "88px 56px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <p style={{ fontFamily: "'DM Sans','Noto Sans',ui-sans-serif,system-ui,sans-serif", fontSize: 14, fontWeight: 700, letterSpacing: "1.8px", textTransform: "uppercase", color: COLOUR, marginBottom: 10 }}>How it works</p>
          <h2 style={{ fontSize: 30, fontWeight: 900, color: ACCENT_NAVY, letterSpacing: "-0.5px" }}>The 4-step journey of empowerment</h2>
          <DefinerBar colour={COLOUR} />

          <div style={{ marginTop: 56, display: "flex", alignItems: "flex-start" }}>
            {STEPS.map((s, i) => (
              <React.Fragment key={s.num}>
                <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", padding: "0 12px" }}>
                  <div style={{ width: 60, height: 60, borderRadius: "50%", background: i === 0 ? COLOUR : "#fff", border: "2px solid #F4838A", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'DM Sans','Noto Sans',ui-sans-serif,system-ui,sans-serif", fontSize: 14, fontWeight: 700, color: i === 0 ? "#fff" : COLOUR, marginBottom: 20, flexShrink: 0, boxShadow: i === 0 ? "0 4px 16px #F4838A50" : "0 2px 8px rgba(0,0,0,0.06)" }}>{s.num}</div>
                  <div style={{ fontSize: 14, fontWeight: 800, color: ACCENT_NAVY, marginBottom: 8, lineHeight: 1.25 }}>{s.title}</div>
                  <div style={{ fontSize: 13, color: "#64748B", lineHeight: 1.7 }}>{s.desc}</div>
                </div>
                {i < STEPS.length - 1 && (
                  <div style={{ display: "flex", alignItems: "flex-start", paddingTop: 20, flexShrink: 0 }}>
                    <svg width="32" height="20" viewBox="0 0 32 20" fill="none">
                      <line x1="0" y1="10" x2="26" y2="10" stroke="#13BBB4" strokeWidth="1.5" strokeDasharray="4 3"/>
                      <polyline points="20,4 28,10 20,16" stroke="#13BBB4" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>

          {/* CTA banner */}
          <div style={{ marginTop: 72, background: COLOUR, borderRadius: 20, padding: "44px 48px", position: "relative", overflow: "hidden", display: "grid", gridTemplateColumns: "1.4fr 0.6fr", gap: 32, alignItems: "center" }}>
            <div style={{ position: "relative", zIndex: 1 }}>
              <div style={{ fontSize: 24, fontWeight: 900, color: "#fff", lineHeight: 1.2, marginBottom: 10, letterSpacing: "-0.4px" }}>
                Be a Literacy Champion — sign up now
              </div>
              <p style={{ fontSize: 14, color: "rgba(255,255,255,0.82)", lineHeight: 1.7, margin: 0 }}>
                Join thousands of Tata employees empowering beneficiaries with financial, digital, and functional literacy.
              </p>
            </div>
            <div style={{ position: "relative", zIndex: 1, display: "flex", justifyContent: "flex-end" }}>
              <a
                href="https://tcsempowers.tcsapps.com/apac2/alp/"
                target="_blank" rel="noopener noreferrer"
                style={{ background: "#fff", color: COLOUR_MID, border: "none", borderRadius: 10, padding: "14px 28px", fontWeight: 800, fontSize: 14, textDecoration: "none", display: "inline-block", boxShadow: "0 4px 20px rgba(0,0,0,0.25)", whiteSpace: "nowrap" }}
              >
                Sign Up on TCS Empowers →
              </a>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
