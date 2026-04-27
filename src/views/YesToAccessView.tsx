import { useState, useEffect, useRef } from "react";
import SubPageDotRail from "@/components/shared/SubPageDotRail";

// ── Tokens ────────────────────────────────────────────────────────────────────
const ACCENT_NAVY  = "#0D1B3E";
const COLOUR       = "#307FE2"; // Yes To Access blue
const COLOUR_MID   = "#225FAE";
const COLOUR_LIGHT = "#E8F1FC";

const SECTIONS = [
  { id: "yta-overview", label: "Overview" },
  { id: "yta-why",      label: "Why volunteer" },
  { id: "yta-who",      label: "Who can join" },
  { id: "yta-howto",    label: "How to start" },
];

const DIAG: React.CSSProperties = {
  position: "absolute", inset: 0,
  backgroundImage: "repeating-linear-gradient(45deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
  backgroundSize: "28px 28px",
  pointerEvents: "none",
};

const STEPS = [
  { num: "01", title: "Download the app", desc: "Download the Yes to Access app using the QR / store link and apply the coupon code TVW" },
  { num: "02", title: "Audit a space", desc: "Do accessibility checks of your building, community halls, schools, market areas, and more" },
  { num: "03", title: "Submit your audit", desc: "Click submit to ensure your accessibility check is recorded in the system" },
  { num: "04", title: "Report your hours", desc: "Report the number of hours volunteered to your SPOC, or write to tataengage@tata.com" },
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
export default function YesToAccessView() {

  return (
    <div className="dot-grid-bg" style={{ background: "transparent", minHeight: "100vh", position: "relative" }}>

      {/* Sticky top accent stripe */}
      <div style={{ height: 4, background: COLOUR, position: "fixed", top: 64, left: 0, right: 0, zIndex: 100 }} />

      <SubPageDotRail sections={SECTIONS} />

      {/* ════════════════════ HERO ════════════════════ */}
      <div style={{ position: "relative", minHeight: "92vh", overflow: "hidden", display: "flex", alignItems: "center", paddingTop: 64 }}>
        <img src="https://images.unsplash.com/photo-1573497019418-b400bb3ab074?auto=format&fit=crop&q=80&w=1800"
          alt="" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "center" }} referrerPolicy="no-referrer" />
        <div style={{ position: "absolute", inset: 0, background: `linear-gradient(110deg, ${COLOUR}e8 0%, ${COLOUR}cc 38%, ${COLOUR}aa 58%, ${COLOUR}77 78%, ${COLOUR}44 100%)` }} />
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 80, background: "linear-gradient(to bottom, transparent, #fff)", pointerEvents: "none" }} />

        <div style={{ position: "relative", zIndex: 1, maxWidth: 1100, margin: "0 auto", padding: "0 64px", width: "100%" }}>
          <div style={{ maxWidth: 620 }}>
            <p style={{ fontFamily: "'DM Sans','Noto Sans',ui-sans-serif,system-ui,sans-serif", fontSize: 14, fontWeight: 700, letterSpacing: "1.8px", textTransform: "uppercase", color: "#ffffff", margin: "0 0 12px" }}>
              Volunteer-driven · Year-round
            </p>
            <div style={{ width: 44, height: 3, background: "rgba(255,255,255,0.55)", borderRadius: 2, marginBottom: 28 }} />
            <h1 style={{ fontFamily: "'DM Sans','Noto Sans',ui-sans-serif,system-ui,sans-serif", fontSize: "clamp(2.4rem, 5vw, 3.8rem)", fontWeight: 400, color: "#fff", lineHeight: 1.12, letterSpacing: "-0.5px", margin: "0 0 28px", whiteSpace: "pre-line" }}>
              {"Yes To\nAccess"}
            </h1>
            <p style={{ fontSize: 15, fontWeight: 300, lineHeight: 1.7, color: "rgba(255,255,255,0.65)", margin: "0 0 48px", maxWidth: 540 }}>
              An initiative by The Association of People with Disability (APD) — a volunteer-driven movement to make public spaces, transport, and digital platforms barrier-free for persons with disabilities.
            </p>
            <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
              <a href="https://yestoaccess.in/" target="_blank" rel="noopener noreferrer"
                style={{ background: COLOUR, color: "#fff", border: "none", borderRadius: 10, padding: "14px 28px", fontWeight: 800, fontSize: 14, cursor: "pointer", boxShadow: "0 4px 20px rgba(0,0,0,0.25)", textDecoration: "none", display: "inline-block" }}>
                Become an Inclusion Champion →
              </a>
              <button onClick={() => document.getElementById("yta-overview")?.scrollIntoView({ behavior: "smooth" })}
                style={{ background: "rgba(255,255,255,0.12)", color: "#fff", border: "1.5px solid rgba(255,255,255,0.28)", borderRadius: 10, padding: "14px 22px", fontWeight: 600, fontSize: 14, cursor: "pointer" }}>
                Learn more
              </button>
            </div>
          </div>
        </div>

        <div style={{ position: "absolute", bottom: 100, right: 56, background: "rgba(0,0,0,0.28)", backdropFilter: "blur(8px)", border: "1px solid rgba(255,255,255,0.18)", borderRadius: 100, padding: "7px 18px", fontFamily: "'DM Sans','Noto Sans',ui-sans-serif,system-ui,sans-serif", fontSize: 14, fontWeight: 700, letterSpacing: "1.8px", textTransform: "uppercase", color: "#ffffff" }}>
          An initiative by APD India
        </div>
      </div>

      {/* ════════════════════ OVERVIEW ════════════════════ */}
      <section id="yta-overview" style={{ padding: "88px 56px", background: "transparent" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 72, alignItems: "center" }}>
          <div>
            <p style={{ fontFamily: "'DM Sans','Noto Sans',ui-sans-serif,system-ui,sans-serif", fontSize: 14, fontWeight: 700, letterSpacing: "1.8px", textTransform: "uppercase", color: COLOUR + "cc", marginBottom: 10 }}>About the movement</p>
            <h2 style={{ fontSize: 30, fontWeight: 900, color: ACCENT_NAVY, letterSpacing: "-0.5px" }}>Universal accessibility, lived reality.</h2>
            <DefinerBar colour={COLOUR} />
            <div style={{ marginTop: 28 }}>
              <p style={{ fontSize: 15, color: "#475569", lineHeight: 1.82, marginBottom: 16 }}>
                Yes to Access is a volunteer-driven movement committed to promoting universal accessibility and inclusion. Led by APD, it aims to transform public spaces, transport systems, and digital platforms into barrier-free environments for persons with disabilities (PwDs).
              </p>
              <p style={{ fontSize: 14, color: "#64748B", lineHeight: 1.7 }}>
                Learn more at <a href="https://yestoaccess.in/" target="_blank" rel="noopener noreferrer" style={{ color: COLOUR, textDecoration: "none", fontWeight: 600 }}>www.yestoaccess.in</a> · <a href="https://www.apd-india.org/" target="_blank" rel="noopener noreferrer" style={{ color: COLOUR, textDecoration: "none", fontWeight: 600 }}>www.apd-india.org</a>
              </p>
            </div>
          </div>
          <div style={{ position: "relative" }}>
            <div style={{ position: "absolute", top: -16, right: -16, zIndex: 0, width: 64, height: 64, borderRadius: 16, background: COLOUR, opacity: 0.12 }} />
            <div style={{ borderRadius: 18, overflow: "hidden", boxShadow: "0 4px 32px rgba(0,0,0,0.10)", position: "relative", zIndex: 1 }}>
              <img src="https://images.unsplash.com/photo-1573497019418-b400bb3ab074?auto=format&fit=crop&q=80&w=900" alt=""
                style={{ width: "100%", height: 380, objectFit: "cover", display: "block" }} referrerPolicy="no-referrer" />
            </div>
            <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 4, background: COLOUR, borderRadius: "0 0 18px 18px", zIndex: 2 }} />
          </div>
        </div>
      </section>

      {/* ════════════════════ WHY VOLUNTEER ════════════════════ */}
      <section id="yta-why" style={{ position: "relative", overflow: "hidden", minHeight: 480 }}>
        <img src="https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&q=80&w=1800" alt=""
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 40%" }} referrerPolicy="no-referrer" />
        <div style={{ position: "absolute", inset: 0, background: `linear-gradient(110deg, ${COLOUR}e8 0%, ${COLOUR}cc 38%, ${COLOUR}aa 58%, ${COLOUR}77 78%, ${COLOUR}44 100%)` }} />
        <div style={{ position: "relative", zIndex: 1, padding: "88px 56px" }}>
          <div style={{ maxWidth: 1100, margin: "0 auto" }}>
            <p style={{ fontFamily: "'DM Sans','Noto Sans',ui-sans-serif,system-ui,sans-serif", fontSize: 14, fontWeight: 700, letterSpacing: "1.8px", textTransform: "uppercase", color: "#ffffff", marginBottom: 10 }}>Why volunteer?</p>
            <h2 style={{ fontSize: 30, fontWeight: 900, color: "#fff", letterSpacing: "-0.5px", maxWidth: 760 }}>Bridge the gap between policy and lived experience.</h2>
            <div style={{ height: 3, background: "rgba(255,255,255,0.28)", borderRadius: 2, width: 48, marginTop: 10, marginBottom: 36 }} />
            <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 24, maxWidth: 880 }}>
              <div style={{ background: "rgba(255,255,255,0.10)", backdropFilter: "blur(8px)", border: "1px solid rgba(255,255,255,0.18)", borderRadius: 16, padding: 32 }}>
                <p style={{ fontSize: 16, color: "#fff", lineHeight: 1.78, margin: 0 }}>
                  Even today, persons with disabilities in India face daily barriers to access and inclusion — despite constitutional promises, legal protections like the <strong>Rights of Persons with Disabilities Act (2016)</strong>, and national efforts such as the <strong>Accessible India Campaign</strong>. Progress has been slow, and awareness remains limited.
                </p>
                <p style={{ fontSize: 16, color: "#fff", lineHeight: 1.78, marginTop: 18, marginBottom: 0 }}>
                  By volunteering with <strong>Yes to Access</strong>, you help bridge this gap. Every audit you complete through the app highlights real challenges in public spaces, sparks conversations, and drives meaningful change — making accessibility a shared responsibility and a lived reality for all.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════ WHO CAN JOIN ════════════════════ */}
      <section id="yta-who" style={{ padding: "88px 56px", background: "transparent" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 72, alignItems: "center" }}>
          <div>
            <p style={{ fontFamily: "'DM Sans','Noto Sans',ui-sans-serif,system-ui,sans-serif", fontSize: 14, fontWeight: 700, letterSpacing: "1.8px", textTransform: "uppercase", color: COLOUR + "cc", marginBottom: 10 }}>Eligibility</p>
            <h2 style={{ fontSize: 30, fontWeight: 900, color: ACCENT_NAVY, letterSpacing: "-0.5px" }}>Who can participate?</h2>
            <DefinerBar colour={COLOUR} />
            <div style={{ marginTop: 28 }}>
              <p style={{ fontSize: 15, color: "#475569", lineHeight: 1.82 }}>
                Any Tata Group employee, retiree and their family members can volunteer.
              </p>
              <p style={{ fontSize: 14, color: "#64748B", lineHeight: 1.7, marginTop: 14 }}>
                Volunteering that fits into your walk to work, your evening stroll, or your weekend outing.
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

      {/* ════════════════════ HOW TO START ════════════════════ */}
      <section id="yta-howto" style={{ padding: "88px 56px", background: "#f5f5fa" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <p style={{ fontFamily: "'DM Sans','Noto Sans',ui-sans-serif,system-ui,sans-serif", fontSize: 14, fontWeight: 700, letterSpacing: "1.8px", textTransform: "uppercase", color: COLOUR + "cc", marginBottom: 10 }}>Where do I start?</p>
          <h2 style={{ fontSize: 30, fontWeight: 900, color: ACCENT_NAVY, letterSpacing: "-0.5px" }}>Become an Inclusion Champion</h2>
          <DefinerBar colour={COLOUR} />
          <p style={{ fontSize: 15, color: "#475569", lineHeight: 1.7, marginTop: 18, maxWidth: 720 }}>
            Follow these simple steps to join the movement and start logging accessibility audits in your neighbourhood.
          </p>

          <div style={{ marginTop: 56, display: "flex", alignItems: "flex-start" }}>
            {STEPS.map((s, i) => (
              <>
                <div key={s.num} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", padding: "0 12px" }}>
                  <div style={{ width: 56, height: 56, borderRadius: "50%", background: i === 0 ? COLOUR : COLOUR_LIGHT, border: `2px solid ${COLOUR}`, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'DM Sans','Noto Sans',ui-sans-serif,system-ui,sans-serif", fontSize: 14, fontWeight: 700, color: i === 0 ? "#fff" : COLOUR, marginBottom: 20, flexShrink: 0, boxShadow: i === 0 ? `0 4px 16px ${COLOUR}40` : "none" }}>{s.num}</div>
                  <div style={{ fontSize: 15, fontWeight: 800, color: ACCENT_NAVY, marginBottom: 8, lineHeight: 1.2 }}>{s.title}</div>
                  <div style={{ fontSize: 13, color: "#64748B", lineHeight: 1.72 }}>{s.desc}</div>
                </div>
                {i < STEPS.length - 1 && (
                  <div style={{ display: "flex", alignItems: "flex-start", paddingTop: 18, flexShrink: 0 }}>
                    <svg width="32" height="20" viewBox="0 0 32 20" fill="none">
                      <line x1="0" y1="10" x2="26" y2="10" stroke={COLOUR} strokeWidth="1.5" strokeDasharray="4 3"/>
                      <polyline points="20,4 28,10 20,16" stroke={COLOUR} strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                )}
              </>
            ))}
          </div>

          {/* Coupon callout */}
          <div style={{ marginTop: 56, background: "#fff", border: `1.5px solid ${COLOUR}`, borderRadius: 16, padding: "24px 28px", display: "flex", alignItems: "center", gap: 20, maxWidth: 720, marginLeft: "auto", marginRight: "auto" }}>
            <div style={{ flex: "0 0 auto", background: COLOUR_LIGHT, color: COLOUR_MID, fontFamily: "'DM Sans','Noto Sans',ui-sans-serif,system-ui,sans-serif", fontWeight: 800, fontSize: 18, padding: "10px 16px", borderRadius: 10, letterSpacing: "2px" }}>TVW</div>
            <div>
              <div style={{ fontSize: 14, fontWeight: 800, color: ACCENT_NAVY }}>Use coupon code TVW in the app</div>
              <div style={{ fontSize: 13, color: "#64748B", marginTop: 4 }}>Apply this code when you download the Yes to Access app to register your volunteering against Tata Engage.</div>
            </div>
          </div>

          {/* CTA Section */}
          <div style={{ marginTop: 48, textAlign: "center" }}>
            <a href="https://yestoaccess.in/" target="_blank" rel="noopener noreferrer"
              style={{ display: "inline-block", background: "transparent", color: COLOUR, border: `2px solid ${COLOUR}`, borderRadius: 10, padding: "14px 28px", fontWeight: 800, fontSize: 14, cursor: "pointer", textDecoration: "none", transition: "all 0.2s", marginRight: 12 }}>
              Visit yestoaccess.in
            </a>
            <a href="mailto:tataengage@tata.com"
              style={{ display: "inline-block", background: COLOUR, color: "#fff", border: `2px solid ${COLOUR}`, borderRadius: 10, padding: "14px 28px", fontWeight: 800, fontSize: 14, cursor: "pointer", textDecoration: "none", transition: "all 0.2s" }}>
              Request communication collaterals
            </a>
            <p style={{ fontSize: 13, color: "#64748B", marginTop: 16 }}>
              Not sure who your SPOC is? Write to <a href="mailto:tataengage@tata.com" style={{ color: COLOUR, textDecoration: "none", fontWeight: 600 }}>tataengage@tata.com</a>
            </p>
          </div>
        </div>
      </section>

    </div>
  );
}
