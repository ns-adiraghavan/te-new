import { useRef, useState, useEffect } from "react";
import SubPageDotRail from "@/components/shared/SubPageDotRail";

const ACCENT      = "#0D7C52";
const ACCENT_DARK = "#085c3c";
const NAVY        = "#0D1B3E";
const FONT        = "'DM Sans', 'Noto Sans', ui-sans-serif, system-ui, sans-serif";

const DIAG: React.CSSProperties = {
  position: "absolute", inset: 0,
  backgroundImage: "repeating-linear-gradient(45deg,rgba(255,255,255,0.04) 1px,transparent 1px)",
  backgroundSize: "28px 28px",
  pointerEvents: "none",
};

const SECTIONS = [
  { id: "coc-hero",       label: "Overview"  },
  { id: "coc-principles", label: "Principles" },
];

const PRINCIPLES = [
  { num: "01", text: "Volunteers must act responsibly and sensibly towards the communities they serve." },
  { num: "02", text: "Volunteers should treat every individual equally and not discriminate on the basis of age, race, culture, religion, caste, disability, gender or sexuality." },
  { num: "03", text: "Volunteers should not show any kind of affiliation to any religious or political institution." },
  { num: "04", text: "Volunteers must take responsibility for their safety as well as the safety of their family members accompanying them for the volunteering activity." },
  { num: "05", text: "In case any sensitive or personal information is received during volunteering hours, it should be treated as confidential." },
  { num: "06", text: "Volunteers are advised to refrain from making statements to the media or press without express permission of the organisation." },
  { num: "07", text: "Volunteers are advised to take permission of the NGO partner and the beneficiaries before taking photographs at the volunteering venue." },
  { num: "08", text: "Volunteers are advised to avoid smoking at or around the venue of a volunteering activity." },
  { num: "09", text: "If a volunteer knows that he or she is going to miss or be late for a session, he or she should let the co-ordinator of the organisation know." },
  { num: "10", text: "In case a volunteer wishes to leave a particular programme, he or she should give adequate notice to the concerned coordinator." },
  { num: "11", text: "Volunteers are advised to maintain proper conduct as they are representing the organisation. They should refrain from any activity that will affect the reputation or image of the company or Tata Group." },
];

function DefinerBar({ light = false }: { light?: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const [on, setOn] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setOn(true); }, { threshold: 0.4 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return (
    <div ref={ref} style={{ height: 2, background: light ? "rgba(255,255,255,0.2)" : "#e8e8f0", borderRadius: 2, overflow: "hidden", width: 48, marginTop: 10 }}>
      <div style={{ height: "100%", background: light ? "rgba(255,255,255,0.8)" : ACCENT_DARK, borderRadius: 2, transition: "width 0.65s cubic-bezier(0.22,1,0.36,1)", width: on ? "100%" : "0%" }} />
    </div>
  );
}

export default function CodeOfConductView() {
  return (
    <div style={{ background: "#f5f5fa", minHeight: "100vh", fontFamily: FONT }}>
      <div style={{ height: 3, background: ACCENT, width: "100%" }} />
      <SubPageDotRail sections={SECTIONS} accentColor={ACCENT} />

      {/* Hero */}
      <div id="coc-hero" style={{ position: "relative", background: NAVY, padding: "96px 56px 72px", overflow: "hidden" }}>
        <div style={DIAG} />
        <div style={{ position: "absolute", top: -80, right: -80, width: 400, height: 400, background: `radial-gradient(circle, ${ACCENT}55 0%, transparent 70%)`, pointerEvents: "none" }} />
        <div style={{ position: "relative", zIndex: 1, maxWidth: 1000, margin: "0 auto" }}>
          <p style={{ fontFamily: FONT, fontSize: 11, fontWeight: 700, letterSpacing: "2px", textTransform: "uppercase", color: "rgba(255,255,255,0.45)", margin: "0 0 12px" }}>Tata Engage · Resources</p>
          <div style={{ height: 2, width: 48, borderRadius: 2, background: "rgba(255,255,255,0.4)", margin: "12px 0 22px" }} />
          <h1 style={{ fontFamily: FONT, fontSize: "clamp(2rem,4vw,3rem)", fontWeight: 900, color: "#fff", lineHeight: 1.1, letterSpacing: "-0.5px", margin: "0 0 18px", maxWidth: 620 }}>Code of Conduct for Volunteers</h1>
          <p style={{ fontFamily: FONT, fontSize: 15, fontWeight: 300, color: "rgba(255,255,255,0.65)", maxWidth: 560, lineHeight: 1.7, margin: "0 0 28px" }}>
            Standards of behaviour expected of every Tata Engage volunteer. By participating, you agree to uphold these principles at all times.
          </p>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.2)", borderRadius: 10, padding: "8px 16px" }}>
            <span style={{ fontSize: 11, fontWeight: 700, color: "rgba(255,255,255,0.5)", textTransform: "uppercase", letterSpacing: "1px" }}>11 principles</span>
          </div>
        </div>
      </div>

      {/* Principles */}
      <section id="coc-principles" style={{ padding: "72px 56px", background: "#fff", scrollMarginTop: 80 }}>
        <div style={{ maxWidth: 1000, margin: "0 auto" }}>
          <p style={{ fontFamily: FONT, fontSize: 11, fontWeight: 700, letterSpacing: "1.6px", textTransform: "uppercase", color: ACCENT, margin: "0 0 10px" }}>Conduct standards</p>
          <h2 style={{ fontFamily: FONT, fontSize: 28, fontWeight: 900, color: NAVY, letterSpacing: "-0.4px", margin: 0 }}>11 Principles of Conduct</h2>
          <DefinerBar />
          <div style={{ marginTop: 36, display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(420px, 1fr))", gap: 16 }}>
            {PRINCIPLES.map((p) => (
              <div key={p.num} style={{ background: "#fff", border: "1px solid #e8e8f0", borderRadius: 14, padding: "20px 22px", display: "flex", gap: 16, alignItems: "flex-start" }}>
                <div style={{ flexShrink: 0, width: 36, height: 36, borderRadius: 10, background: "#E6F5EE", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, fontWeight: 700, color: ACCENT }}>{p.num}</span>
                </div>
                <p style={{ fontFamily: FONT, fontSize: 14, color: "#374151", lineHeight: 1.7, margin: 0 }}>{p.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer note */}
      <section style={{ padding: "48px 56px", background: "#f5f5fa" }}>
        <div style={{ maxWidth: 1000, margin: "0 auto" }}>
          <div style={{ background: "#E6F5EE", border: "1px solid #a7d9c0", borderRadius: 14, padding: "24px 28px", display: "flex", gap: 20, alignItems: "center" }}>
            <div style={{ flexShrink: 0, width: 44, height: 44, borderRadius: 14, background: ACCENT, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20 }}>🤝</div>
            <div>
              <p style={{ fontFamily: FONT, fontSize: 14, fontWeight: 700, color: NAVY, margin: "0 0 4px" }}>Questions about this code of conduct?</p>
              <p style={{ fontFamily: FONT, fontSize: 13.5, color: "#475569", margin: 0 }}>Contact the Tata Engage team at <a href="mailto:tataengage@tata.com" style={{ color: ACCENT, fontWeight: 600 }}>tataengage@tata.com</a></p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
