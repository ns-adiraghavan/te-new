import { useState, useEffect, useRef } from "react";
import { useAppNavigate } from "@/hooks/useAppNavigate";
import SubPageDotRail from "@/components/shared/SubPageDotRail";

// ── Colour tokens ─────────────────────────────────────────────────────────────
const C       = "#0D6B7A";
const C_LIGHT = "#E8F5F7";
const C_DARK  = "#0A3D47";
const NAVY    = "#0D1B3E";
const MUSTARD = "#C8940A";

const DIAG: React.CSSProperties = {
  position: "absolute",
  inset: 0,
  backgroundImage:
    "repeating-linear-gradient(45deg,rgba(255,255,255,0.03) 1px,transparent 1px)",
  backgroundSize: "28px 28px",
  pointerEvents: "none",
};

const SECTIONS = [
  { id: "pwu-hero",    label: "Overview"     },
  { id: "pwu-bridge",  label: "How we bridge"},
  { id: "pwu-ngo",     label: "For NGOs"     },
  { id: "pwu-contact", label: "Contact"      },
  { id: "pwu-social",  label: "Stay connected"},
  { id: "pwu-cta",     label: "Get started"  },
];

// ── Atoms ─────────────────────────────────────────────────────────────────────
function Eyebrow({ text, dark = false }: { text: string; dark?: boolean }) {
  return (
    <p
      style={{
        fontFamily: "'DM Mono',monospace",
        fontSize: 11,
        fontWeight: 600,
        letterSpacing: "1.8px",
        textTransform: "uppercase",
        color: dark ? "rgba(255,255,255,0.5)" : C + "cc",
        marginBottom: 10,
      }}
    >
      {text}
    </p>
  );
}

function DefinerBar({ light = false }: { light?: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const [on, setOn] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setOn(true); },
      { threshold: 0.4 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{
        height: 3,
        background: light ? "rgba(255,255,255,0.2)" : "#e8e8f0",
        borderRadius: 2,
        overflow: "hidden",
        width: 48,
        marginTop: 10,
      }}
    >
      <div
        style={{
          height: "100%",
          background: light ? "rgba(255,255,255,0.7)" : C,
          borderRadius: 2,
          transition: "width 0.65s cubic-bezier(0.22,1,0.36,1)",
          width: on ? "100%" : "0%",
        }}
      />
    </div>
  );
}


// ── 1. Hero — split dark / photo ──────────────────────────────────────────────
function Hero() {
  return (
    <div
      id="pwu-hero"
      style={{ display: "grid", gridTemplateColumns: "1fr 1fr", minHeight: "88vh" }}
    >
      {/* Left — dark teal */}
      <div
        style={{
          background: C_DARK,
          padding: "120px 64px 80px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div style={DIAG} />
        <div style={{ position: "relative", zIndex: 1 }}>
          <p
            style={{
              fontFamily: "'DM Mono',monospace",
              fontSize: 10,
              fontWeight: 600,
              letterSpacing: "2.5px",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.45)",
              marginBottom: 20,
            }}
          >
            Tata Engage · Civil Society Partnerships
          </p>
          <div
            style={{
              width: 32,
              height: 2,
              background: "rgba(255,255,255,0.35)",
              borderRadius: 2,
              marginBottom: 24,
            }}
          />
          <h1
            style={{
              fontFamily: "'DM Sans',sans-serif",
              fontSize: "clamp(2.4rem,4.5vw,3.4rem)",
              fontWeight: 900,
              color: "#fff",
              lineHeight: 1.08,
              letterSpacing: "-1.5px",
              margin: "0 0 24px",
            }}
          >
            Bridging intent
            <br />
            with impact
          </h1>
          <p
            style={{
              fontSize: 16,
              fontWeight: 300,
              lineHeight: 1.82,
              color: "rgba(255,255,255,0.72)",
              maxWidth: 420,
              marginBottom: 48,
            }}
          >
            Across the world, Tata professionals are eager to volunteer their
            time and skills. Equally, civil society organisations doing impactful
            work need the right support. Tata Engage is the bridge.
          </p>

          {/* Stats strip */}
          <div
            style={{
              display: "flex",
              gap: 40,
              paddingTop: 36,
              borderTop: "1px solid rgba(255,255,255,0.12)",
            }}
          >
            {[
              { num: "50,000+", label: "Tata volunteers"    },
              { num: "85+",     label: "NGO partners"        },
              { num: "1,200+",  label: "Projects completed"  },
            ].map((s) => (
              <div key={s.label}>
                <div
                  style={{
                    fontSize: 26,
                    fontWeight: 900,
                    color: "#fff",
                    letterSpacing: "-0.5px",
                  }}
                >
                  {s.num}
                </div>
                <div
                  style={{
                    fontFamily: "'DM Mono',monospace",
                    fontSize: 11,
                    color: "rgba(255,255,255,0.45)",
                    marginTop: 6,
                  }}
                >
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right — photo placeholder */}
      <div
        style={{
          position: "relative",
          overflow: "hidden",
          background: `linear-gradient(135deg, ${C} 0%, ${C_DARK} 100%)`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div style={DIAG} />
        {/* Left-fade overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to right,rgba(10,52,71,0.5) 0%,transparent 40%)",
          }}
        />
        {/* Photo placeholder text */}
        <div
          style={{
            position: "relative",
            zIndex: 1,
            fontFamily: "'DM Mono',monospace",
            fontSize: 11,
            color: "rgba(255,255,255,0.3)",
            letterSpacing: "1px",
          }}
        >
          [ programme photography ]
        </div>
        {/* Caption tag */}
        <div
          style={{
            position: "absolute",
            bottom: 32,
            left: 32,
            background: "rgba(0,0,0,0.45)",
            backdropFilter: "blur(8px)",
            border: "1px solid rgba(255,255,255,0.18)",
            borderRadius: 100,
            padding: "7px 18px",
            fontFamily: "'DM Mono',monospace",
            fontSize: 10,
            fontWeight: 600,
            letterSpacing: "1.5px",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.7)",
          }}
        >
          Tata volunteers in action
        </div>
      </div>
    </div>
  );
}

// ── 2. Bridge — two-world split card ─────────────────────────────────────────
function BridgeSection() {
  const ngoPoints = [
    "Post projects requiring professional expertise",
    "Define timelines, skills needed, and impact goals",
    "Get matched with motivated Tata volunteers",
    "Receive structured, TSG-supported partnerships",
  ];
  const volPoints = [
    "Browse skill-matched NGO projects on Tata Engage",
    "Apply for 1–6 month ProEngage projects year-round",
    "Volunteer in large events during Tata Volunteering Week",
    "Log hours, earn recognition, and get certified",
  ];

  return (
    <section id="pwu-bridge" style={{ padding: "96px 0", background: "#fff" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 56px" }}>
        <div style={{ textAlign: "center", marginBottom: 64 }}>
          <Eyebrow text="How Tata Engage works" />
          <h2
            style={{
              fontSize: 32,
              fontWeight: 900,
              color: NAVY,
              letterSpacing: "-0.5px",
            }}
          >
            Where skilled people meet meaningful causes
          </h2>
          <div style={{ display: "flex", justifyContent: "center", marginTop: 10 }}>
            <DefinerBar />
          </div>
          <p
            style={{
              fontSize: 16,
              color: "#64748B",
              lineHeight: 1.8,
              maxWidth: 560,
              margin: "20px auto 0",
            }}
          >
            We serve as a trusted platform that connects credible not-for-profit
            organisations with motivated professionals from across the Tata
            ecosystem.
          </p>
        </div>

        {/* Two-world split card */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr auto 1fr",
            borderRadius: 20,
            overflow: "hidden",
            boxShadow: "0 4px 32px rgba(0,0,0,0.08)",
          }}
        >
          {/* NGO side */}
          <div style={{ background: C_LIGHT, padding: "48px 44px" }}>
            <div
              style={{
                fontFamily: "'DM Mono',monospace",
                fontSize: 10,
                fontWeight: 700,
                letterSpacing: "2px",
                textTransform: "uppercase",
                color: C + "99",
                marginBottom: 16,
              }}
            >
              Civil society organisations
            </div>
            <h3
              style={{
                fontSize: 22,
                fontWeight: 900,
                color: NAVY,
                marginBottom: 20,
                lineHeight: 1.2,
              }}
            >
              You have the mission.
              <br />
              We find the talent.
            </h3>
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {ngoPoints.map((p, i) => (
                <div key={i} style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                  <div
                    style={{
                      width: 20,
                      height: 20,
                      borderRadius: "50%",
                      background: C,
                      flexShrink: 0,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      marginTop: 2,
                    }}
                  >
                    <span style={{ color: "#fff", fontSize: 10, fontWeight: 800 }}>✓</span>
                  </div>
                  <span style={{ fontSize: 14, color: "#475569", lineHeight: 1.65 }}>{p}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Centre bridge column */}
          <div
            style={{
              background: C,
              width: 64,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: 12,
              padding: "20px 0",
            }}
          >
            {[0, 1, 2, 3].map((i) => (
              <div
                key={i}
                style={{
                  width: 4,
                  height: 4,
                  borderRadius: "50%",
                  background: "rgba(255,255,255,0.5)",
                }}
              />
            ))}
            <div
              style={{
                writingMode: "vertical-lr" as const,
                transform: "rotate(180deg)",
                fontFamily: "'DM Mono',monospace",
                fontSize: 10,
                fontWeight: 700,
                letterSpacing: "2px",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.7)",
                whiteSpace: "nowrap",
              }}
            >
              Tata Engage
            </div>
            {[0, 1, 2, 3].map((i) => (
              <div
                key={i}
                style={{
                  width: 4,
                  height: 4,
                  borderRadius: "50%",
                  background: "rgba(255,255,255,0.5)",
                }}
              />
            ))}
          </div>

          {/* Volunteer side */}
          <div style={{ background: C_DARK, padding: "48px 44px" }}>
            <div
              style={{
                fontFamily: "'DM Mono',monospace",
                fontSize: 10,
                fontWeight: 700,
                letterSpacing: "2px",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.4)",
                marginBottom: 16,
              }}
            >
              Tata professionals
            </div>
            <h3
              style={{
                fontSize: 22,
                fontWeight: 900,
                color: "#fff",
                marginBottom: 20,
                lineHeight: 1.2,
              }}
            >
              You have the skills.
              <br />
              We find the purpose.
            </h3>
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {volPoints.map((p, i) => (
                <div key={i} style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                  <div
                    style={{
                      width: 20,
                      height: 20,
                      borderRadius: "50%",
                      background: "rgba(255,255,255,0.18)",
                      flexShrink: 0,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      marginTop: 2,
                    }}
                  >
                    <span style={{ color: "#fff", fontSize: 10, fontWeight: 800 }}>✓</span>
                  </div>
                  <span
                    style={{
                      fontSize: 14,
                      color: "rgba(255,255,255,0.72)",
                      lineHeight: 1.65,
                    }}
                  >
                    {p}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── 3. For NGOs — numbered steps ──────────────────────────────────────────────
function NGOSection() {
  const steps = [
    {
      num: "01",
      title: "Register on Tata Engage",
      desc: "Interested Not-for-Profit organisations must REGISTER on the Tata Engage platform, provide necessary profile details, and upload requested documents for due diligence. Once enrolled, authorised representatives can log in and post volunteering projects requiring professional volunteers through ProEngage.",
    },
    {
      num: "02",
      title: "Post your projects",
      desc: "Once enrolled, authorised representatives can log in and upload projects requiring professional volunteers — specifying skills needed, duration, and expected outcomes.",
    },
    {
      num: "03",
      title: "Stay informed",
      desc: "SUBSCRIBE to receive regular alerts and updates on Tata Engage initiatives including ProEngage (skill-based volunteering projects) and Tata Volunteering Week (large-scale, event-based volunteering). This ensures your organisation is prepared and visible when Tata volunteers are mobilised.",
    },
    {
      num: "04",
      title: "Get matched",
      desc: "Tata Engage's matching process connects your projects with the most relevant Tata volunteers. TSG supports onboarding, orientation, and milestone tracking throughout.",
    },
  ];

  return (
    <section id="pwu-ngo" style={{ background: "#F4F8F7", padding: "96px 56px" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 80,
          }}
        >
          {/* Left: heading + photo placeholder */}
          <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
            <div>
              <Eyebrow text="For not-for-profit organisations" />
              <h2
                style={{
                  fontSize: 30,
                  fontWeight: 900,
                  color: NAVY,
                  letterSpacing: "-0.5px",
                }}
              >
                Need skilled volunteers?
              </h2>
              <DefinerBar />
              <p
                style={{
                  fontSize: 15,
                  color: "#64748B",
                  lineHeight: 1.82,
                  marginTop: 20,
                }}
              >
                Not-for-profit organisations associated with a Tata company are
                eligible to partner with Tata Engage. Here's how the process
                works.
              </p>
            </div>

            {/* Photo placeholder */}
            <div
              style={{
                borderRadius: 18,
                overflow: "hidden",
                boxShadow: "0 4px 24px rgba(0,0,0,0.09)",
                flex: 1,
                minHeight: 280,
                position: "relative",
                background: C_LIGHT,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <span
                style={{
                  fontFamily: "'DM Mono',monospace",
                  fontSize: 11,
                  color: C,
                  letterSpacing: "1px",
                }}
              >
                [ programme photography ]
              </span>
              <div
                style={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  right: 0,
                  height: 4,
                  background: C,
                }}
              />
            </div>
          </div>

          {/* Right: numbered steps */}
          <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
            {steps.map((s, i) => (
              <div
                key={s.num}
                style={{
                  paddingBottom: i < steps.length - 1 ? 32 : 0,
                  marginBottom: i < steps.length - 1 ? 32 : 0,
                  borderBottom:
                    i < steps.length - 1 ? "1px solid #e8eef0" : "none",
                  display: "flex",
                  gap: 20,
                }}
              >
                <div
                  style={{
                    fontFamily: "'DM Mono',monospace",
                    fontSize: 28,
                    fontWeight: 500,
                    color: C + "28",
                    lineHeight: 1,
                    flexShrink: 0,
                    width: 44,
                    letterSpacing: "-1px",
                  }}
                >
                  {s.num}
                </div>
                <div>
                  <div
                    style={{
                      fontSize: 16,
                      fontWeight: 800,
                      color: NAVY,
                      marginBottom: 8,
                    }}
                  >
                    {s.title}
                  </div>
                  <div
                    style={{
                      fontSize: 14,
                      color: "#64748B",
                      lineHeight: 1.75,
                    }}
                  >
                    {s.desc}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ── 4. Contact strip ──────────────────────────────────────────────────────────
function ContactSection() {
  const [copied, setCopied] = useState(false);

  const copy = () => {
    navigator.clipboard?.writeText("tataengage@tata.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section
      id="pwu-contact"
      style={{
        background: C,
        padding: "80px 56px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div style={DIAG} />
      <div
        style={{
          maxWidth: 1100,
          margin: "0 auto",
          position: "relative",
          zIndex: 1,
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1.2fr 0.8fr",
            gap: 72,
            alignItems: "center",
          }}
        >
          <div>
            <Eyebrow text="Get in touch" dark />
            <h2
              style={{
                fontSize: 30,
                fontWeight: 900,
                color: "#fff",
                letterSpacing: "-0.5px",
              }}
            >
              We'd love to hear from you
            </h2>
            <div
              style={{
                height: 3,
                background: "rgba(255,255,255,0.25)",
                borderRadius: 2,
                width: 48,
                marginTop: 10,
                marginBottom: 28,
              }}
            />
            <p
              style={{
                fontSize: 15,
                color: "rgba(255,255,255,0.72)",
                lineHeight: 1.82,
                maxWidth: 480,
              }}
            >
              Whether you're a civil society organisation looking for volunteers,
              or a partner exploring collaboration opportunities, the Tata Engage
              team is here to help. Write to us with your organisation profile
              and volunteering requirements.
            </p>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {/* Email card */}
            <div
              style={{
                background: "rgba(255,255,255,0.1)",
                border: "1px solid rgba(255,255,255,0.18)",
                borderRadius: 14,
                padding: "24px 24px",
              }}
            >
              <div
                style={{
                  fontFamily: "'DM Mono',monospace",
                  fontSize: 10,
                  fontWeight: 700,
                  letterSpacing: "1.5px",
                  textTransform: "uppercase",
                  color: "rgba(255,255,255,0.45)",
                  marginBottom: 10,
                }}
              >
                Email
              </div>
              <div
                style={{
                  fontSize: 17,
                  fontWeight: 800,
                  color: "#fff",
                  marginBottom: 14,
                }}
              >
                tataengage@tata.com
              </div>
              <button
                onClick={copy}
                style={{
                  background: copied ? "rgba(255,255,255,0.25)" : MUSTARD,
                  color: "#fff",
                  border: "none",
                  borderRadius: 8,
                  padding: "9px 20px",
                  fontWeight: 700,
                  fontSize: 13,
                  cursor: "pointer",
                  transition: "background 0.2s",
                }}
              >
                {copied ? "Copied ✓" : "Copy email"}
              </button>
            </div>

            {/* Social card */}
            <div
              style={{
                background: "rgba(255,255,255,0.08)",
                border: "1px solid rgba(255,255,255,0.12)",
                borderRadius: 14,
                padding: "20px 24px",
              }}
            >
              <div
                style={{
                  fontFamily: "'DM Mono',monospace",
                  fontSize: 10,
                  fontWeight: 700,
                  letterSpacing: "1.5px",
                  textTransform: "uppercase",
                  color: "rgba(255,255,255,0.45)",
                  marginBottom: 12,
                }}
              >
                Stay connected
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {[
                  { platform: "LinkedIn",    handle: "Tata Engage"  },
                  { platform: "X (Twitter)", handle: "@TataEngage"  },
                ].map((s) => (
                  <div
                    key={s.platform}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <span
                      style={{
                        fontSize: 14,
                        color: "rgba(255,255,255,0.75)",
                        fontWeight: 600,
                      }}
                    >
                      {s.platform}
                    </span>
                    <span
                      style={{
                        fontFamily: "'DM Mono',monospace",
                        fontSize: 12,
                        color: "rgba(255,255,255,0.45)",
                      }}
                    >
                      {s.handle}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── 5. Two-path CTA ───────────────────────────────────────────────────────────
function CTASection() {
  const navigate = useAppNavigate();

  return (
    <section id="pwu-cta" style={{ padding: "96px 56px", background: "#fff" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 56 }}>
          <Eyebrow text="Get started" />
          <h2
            style={{
              fontSize: 30,
              fontWeight: 900,
              color: NAVY,
              letterSpacing: "-0.5px",
            }}
          >
            Two paths. One platform.
          </h2>
          <div style={{ display: "flex", justifyContent: "center", marginTop: 10 }}>
            <DefinerBar />
          </div>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 24,
          }}
        >
          {/* NGO path */}
          <div
            style={{
              borderRadius: 20,
              overflow: "hidden",
              border: "1px solid #e8eef0",
            }}
          >
            <div style={{ height: 6, background: C }} />
            <div style={{ padding: "40px 40px 44px" }}>
              <div
                style={{
                  fontFamily: "'DM Mono',monospace",
                  fontSize: 10,
                  fontWeight: 700,
                  letterSpacing: "2px",
                  textTransform: "uppercase",
                  color: C + "99",
                  marginBottom: 16,
                }}
              >
                Civil society organisation
              </div>
              <h3
                style={{
                  fontSize: 22,
                  fontWeight: 900,
                  color: NAVY,
                  marginBottom: 14,
                  lineHeight: 1.2,
                }}
              >
                Are you an NGO or non-profit?
              </h3>
              <p
                style={{
                  fontSize: 15,
                  color: "#64748B",
                  lineHeight: 1.75,
                  marginBottom: 32,
                }}
              >
                Partner with Tata Engage to access skilled, committed volunteers
                from across the Tata ecosystem for your projects.
              </p>
              <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                <button
                  onClick={() => navigate("register-role")}
                  style={{
                    background: C,
                    color: "#fff",
                    border: "none",
                    borderRadius: 10,
                    padding: "12px 26px",
                    fontWeight: 800,
                    fontSize: 14,
                    cursor: "pointer",
                  }}
                >
                  Register as NGO partner →
                </button>
                <button
                  onClick={() =>
                    document
                      .getElementById("pwu-contact")
                      ?.scrollIntoView({ behavior: "smooth" })
                  }
                  style={{
                    background: "none",
                    color: C,
                    border: `1.5px solid ${C}`,
                    borderRadius: 10,
                    padding: "12px 20px",
                    fontWeight: 700,
                    fontSize: 14,
                    cursor: "pointer",
                  }}
                >
                  Email us
                </button>
              </div>
            </div>
          </div>

          {/* Volunteer path */}
          <div
            style={{
              borderRadius: 20,
              overflow: "hidden",
              background: C_DARK,
              border: `1px solid ${C_DARK}`,
            }}
          >
            <div style={{ height: 6, background: MUSTARD }} />
            <div style={{ padding: "40px 40px 44px" }}>
              <div
                style={{
                  fontFamily: "'DM Mono',monospace",
                  fontSize: 10,
                  fontWeight: 700,
                  letterSpacing: "2px",
                  textTransform: "uppercase",
                  color: "rgba(255,255,255,0.4)",
                  marginBottom: 16,
                }}
              >
                Tata professional
              </div>
              <h3
                style={{
                  fontSize: 22,
                  fontWeight: 900,
                  color: "#fff",
                  marginBottom: 14,
                  lineHeight: 1.2,
                }}
              >
                Are you a Tata employee?
              </h3>
              <p
                style={{
                  fontSize: 15,
                  color: "rgba(255,255,255,0.68)",
                  lineHeight: 1.75,
                  marginBottom: 32,
                }}
              >
                Register on Tata Engage and discover volunteering opportunities
                across TVW, ProEngage, and Disaster Response.
              </p>
              <button
                onClick={() => navigate("register-role")}
                style={{
                  background: MUSTARD,
                  color: "#fff",
                  border: "none",
                  borderRadius: 10,
                  padding: "12px 26px",
                  fontWeight: 800,
                  fontSize: 14,
                  cursor: "pointer",
                }}
              >
                Register as volunteer →
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Main View ─────────────────────────────────────────────────────────────────
export default function PartnerWithUsView() {
  return (
    <div
      style={{
        background: "#fff",
        minHeight: "100vh",
        fontFamily: "'DM Sans',sans-serif",
        paddingTop: 64,
      }}
    >
      {/* Top accent line */}
      <div
        style={{
          height: 4,
          background: C,
          position: "sticky",
          top: 64,
          zIndex: 100,
        }}
      />

      <SubPageDotRail sections={SECTIONS} />
      <Hero />
      <BridgeSection />
      <NGOSection />
      <ContactSection />
      <CTASection />
    </div>
  );
}
