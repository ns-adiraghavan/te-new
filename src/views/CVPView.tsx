import { useState, useEffect, useRef } from "react";
import { useAppNavigate } from "@/hooks/useAppNavigate";
import { useAuth } from "@/context/AuthContext";
import cvpHeroImg from "@/assets/tata-elxsi.jpg";

// ── Tokens ────────────────────────────────────────────────────────────────────
const ACCENT_NAVY = "#0D1B3E";
const COLOUR = "#1F5F3A"; // Forest green
const COLOUR_MID = "#16472B";
const COLOUR_LIGHT = "#E8F2EC";

const SECTIONS = [
  { id: "cvp-overview", label: "Overview" },
  { id: "cvp-examples", label: "Company programmes" },
  { id: "cvp-explore", label: "Explore" },
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
    <div ref={ref} style={{ width: 64, height: 4, background: "#e5e5ec", borderRadius: 2, overflow: "hidden", marginBottom: 24 }}>
      <div style={{ width: on ? "100%" : 0, height: "100%", background: colour, transition: "width 700ms ease" }} />
    </div>
  );
}

export default function CVPView() {
  const navigate = useAppNavigate();
  const { isLoggedIn } = useAuth();
  const [activeId, setActiveId] = useState(SECTIONS[0].id);

  useEffect(() => {
    const handler = () => {
      let current = SECTIONS[0].id;
      for (const s of SECTIONS) {
        const el = document.getElementById(s.id);
        if (el && el.getBoundingClientRect().top <= 200) current = s.id;
      }
      setActiveId(current);
    };
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif", background: "#f5f5fa", minHeight: "100vh" }}>
      {/* Sticky top accent stripe */}
      <div style={{ position: "fixed", top: 0, left: 0, right: 0, height: 3, background: COLOUR, zIndex: 60 }} />

      {/* Right-side dot rail */}
      <div style={{ position: "fixed", right: 24, top: "50%", transform: "translateY(-50%)", display: "flex", flexDirection: "column", gap: 16, zIndex: 50 }}>
        {SECTIONS.map((s) => (
          <button
            key={s.id}
            title={s.label}
            onClick={() => document.getElementById(s.id)?.scrollIntoView({ behavior: "smooth" })}
            style={{
              width: 10, height: 10, borderRadius: "50%", border: "none", padding: 0, cursor: "pointer",
              background: activeId === s.id ? COLOUR : "#cfcfd8",
              outline: activeId === s.id ? `2px solid ${COLOUR_MID}` : "2px solid transparent",
              transition: "all 200ms ease",
            }}
          />
        ))}
      </div>

      {/* ── HERO (full-bleed, matching AboutTVWView) ── */}
      <section style={{ position: "relative", minHeight: "92vh", display: "flex", alignItems: "center", overflow: "hidden", paddingTop: 64 }}>
        <img
          src={cvpHeroImg}
          alt=""
          style={{
            position: "absolute", inset: 0,
            width: "100%", height: "100%",
            objectFit: "cover", objectPosition: "center",
          }}
        />
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(155deg, rgba(8,12,22,0.62) 0%, rgba(8,12,22,0.38) 100%)",
        }} />

        <div style={{ position: "relative", zIndex: 1, maxWidth: 1100, margin: "0 auto", padding: "0 64px", width: "100%" }}>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, fontWeight: 800, letterSpacing: "2.5px", textTransform: "uppercase", color: "rgba(255,255,255,0.5)", margin: "0 0 12px" }}>
            Group-wide · Year-round
          </p>
          <div style={{ height: 2, width: 48, borderRadius: 2, background: "rgba(255,255,255,0.6)", margin: "12px 0 22px" }} />
          <h1 style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "clamp(2.4rem, 5vw, 3.8rem)", fontWeight: 400, lineHeight: 1.12, letterSpacing: "-0.5px", margin: "0 0 18px", color: "#fff", maxWidth: 700 }}>
            Company Volunteering Programmes
          </h1>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 16, lineHeight: 1.7, color: "rgba(255,255,255,0.65)", fontWeight: 300, maxWidth: 520, margin: 0 }}>
            Each Tata company runs its own volunteering initiatives — rooted in their unique business context, employee strengths, and the communities they serve.
          </p>
        </div>
      </section>

      {/* OVERVIEW */}
      <section id="cvp-overview" style={{ background: "#fff", padding: "96px 56px" }}>
        <div style={{ maxWidth: 980, margin: "0 auto" }}>
          <DefinerBar colour={COLOUR} />
          <h2 style={{ fontSize: 36, fontWeight: 700, color: ACCENT_NAVY, margin: "0 0 24px", letterSpacing: -0.5 }}>
            Volunteering, the way each Tata company does it
          </h2>
          <p style={{ fontSize: 17, lineHeight: 1.7, color: "#3a3a4a", margin: "0 0 16px" }}>
            Beyond the Group-wide platforms — TVW, ProEngage, Disaster Response, and Tata Sustainability Month — individual Tata companies design and run their own Company Volunteering Programmes (CVP).
          </p>
          <p style={{ fontSize: 17, lineHeight: 1.7, color: "#3a3a4a", margin: 0 }}>
            These programmes harness the unique skills of employees and respond to causes most relevant to each business. Together, they form a vibrant ecosystem of giving across the Tata Group.
          </p>
        </div>
      </section>

      {/* EXAMPLES */}
      <section id="cvp-examples" style={{ background: "#f5f5fa", padding: "96px 56px" }}>
        <div style={{ maxWidth: 980, margin: "0 auto" }}>
          <DefinerBar colour={COLOUR} />
          <h2 style={{ fontSize: 36, fontWeight: 700, color: ACCENT_NAVY, margin: "0 0 32px", letterSpacing: -0.5 }}>
            Programmes from across the Group
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 16 }}>
            {[
              { title: "TCS — Each One Empowers One", desc: "A digital literacy platform that empowers any employee to teach a beneficiary financial and digital skills, available in 9 Indian languages." },
              { title: "Infiniti Retail — E-Waste Warrior Programme", desc: "Croma's campaign to educate, empower, and engage Tata employees on responsible e-waste recycling." },
              { title: "Other company initiatives", desc: "Many Tata companies run their own employee-led initiatives — focusing on education, health, environment, and community welfare in the regions they operate." },
            ].map((c) => (
              <div key={c.title} style={{ background: "#fff", borderRadius: 12, padding: 24, border: "1px solid #e8e8ef" }}>
                <h3 style={{ fontSize: 18, fontWeight: 700, color: ACCENT_NAVY, margin: "0 0 8px" }}>{c.title}</h3>
                <p style={{ fontSize: 15, lineHeight: 1.6, color: "#54546a", margin: 0 }}>{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* EXPLORE */}
      <section id="cvp-explore" style={{ background: "#fff", padding: "96px 56px" }}>
        <div style={{ maxWidth: 980, margin: "0 auto" }}>
          <DefinerBar colour={COLOUR} />
          <h2 style={{ fontSize: 36, fontWeight: 700, color: ACCENT_NAVY, margin: "0 0 24px", letterSpacing: -0.5 }}>
            Find a CVP near you
          </h2>
          <p style={{ fontSize: 17, lineHeight: 1.7, color: "#3a3a4a", margin: "0 0 32px" }}>
            To learn more about your company's volunteering programme, reach out to your CSR or Volunteering SPOC. Tata Engage facilitates collaboration and visibility across the Group.
          </p>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" as const }}>
            <button
              onClick={() => navigate(isLoggedIn ? "dashboard" : "register-role")}
              style={{ background: COLOUR, color: "#fff", border: "none", padding: "14px 28px", borderRadius: 8, fontSize: 15, fontWeight: 600, cursor: "pointer" }}
            >
              {isLoggedIn ? "Go to Dashboard" : "Join Tata Engage"}
            </button>
            <button
              onClick={() => navigate("eoi")}
              style={{ background: COLOUR_LIGHT, color: COLOUR_MID, border: `1px solid ${COLOUR}`, padding: "14px 28px", borderRadius: 8, fontSize: 15, fontWeight: 600, cursor: "pointer" }}
            >
              Explore EOI
            </button>
          </div>
          <p style={{ fontSize: 14, color: "#7a7a8a", marginTop: 24 }}>
            For queries, reach out to tataengage@tata.com
          </p>
        </div>
      </section>
    </div>
  );
}
