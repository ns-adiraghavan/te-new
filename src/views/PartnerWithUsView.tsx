import { useState, useEffect, useRef } from "react";
import { useAppNavigate } from "@/hooks/useAppNavigate";
import { useAuth } from "@/context/AuthContext";
import Footer from "@/components/layout/Footer";
import SubPageDotRail from "@/components/shared/SubPageDotRail";

// ── Colour tokens ─────────────────────────────────────────────────────────────
const ACCENT_NAVY = "#0D1B3E";
const B_YELLOW    = "#F5A623";
const COLOUR      = "#0D6B7A";   // Partner teal
const COLOUR_DARK = "#0A3D47";
const COLOUR_LIGHT = "#E8F5F7";

const DIAG: React.CSSProperties = {
  position: "absolute",
  inset: 0,
  backgroundImage:
    "repeating-linear-gradient(45deg,rgba(255,255,255,0.03) 1px,transparent 1px)",
  backgroundSize: "28px 28px",
  pointerEvents: "none",
};

const SECTIONS = [
  { id: "pwu-overview", label: "Overview"     },
  { id: "pwu-bridge",   label: "How we bridge" },
  { id: "pwu-ngo",      label: "For NGOs"      },
  { id: "pwu-contact",  label: "Contact"       },
  { id: "pwu-social",   label: "Stay connected" },
  { id: "pwu-cta",      label: "Get started"   },
];

// ── Atoms ─────────────────────────────────────────────────────────────────────
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
          background: light ? "rgba(255,255,255,0.7)" : COLOUR,
          borderRadius: 2,
          transition: "width 0.65s cubic-bezier(0.22,1,0.36,1)",
          width: on ? "100%" : "0%",
        }}
      />
    </div>
  );
}

// ── SVG Icons ─────────────────────────────────────────────────────────────────
const IconRegister = () => (
  <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
    <rect x="4" y="4" width="20" height="20" rx="4"/>
    <path d="M9 14h10M9 9h6M9 19h4"/>
  </svg>
);
const IconPost = () => (
  <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 4v20M4 14h20"/>
    <circle cx="14" cy="14" r="10"/>
  </svg>
);
const IconSubscribe = () => (
  <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 20l7-7 4 4 9-11"/>
    <circle cx="22" cy="6" r="3" fill="currentColor" stroke="none"/>
  </svg>
);

// ── 1. Hero — full-bleed immersive (matches AboutTVWView pattern) ──────────────
function Hero() {
  const navigate = useAppNavigate();
  const { isLoggedIn } = useAuth();

  return (
    <div
      style={{
        position: "relative",
        minHeight: "92vh",
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
      }}
    >
      {/* Background photo */}
      <img
        src="https://images.unsplash.com/photo-1559027615-cd4628902d4a?auto=format&fit=crop&q=80&w=1800"
        alt=""
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          objectPosition: "center 30%",
        }}
        referrerPolicy="no-referrer"
      />

      {/* Gradient overlay — strong left, fades right */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `linear-gradient(108deg, ${COLOUR}f5 0%, ${COLOUR}e8 28%, ${COLOUR}b0 52%, ${COLOUR}50 70%, ${COLOUR}18 100%)`,
        }}
      />

      {/* Diagonal texture */}
      <div style={DIAG} />

      {/* Bottom white fade-out — matches TVW pattern */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: 80,
          background: "linear-gradient(to bottom, transparent, #fff)",
          pointerEvents: "none",
        }}
      />

      {/* Content */}
      <div
        style={{
          position: "relative",
          zIndex: 1,
          maxWidth: 1100,
          margin: "0 auto",
          padding: "120px 56px 96px",
          width: "100%",
        }}
      >
        <div style={{ maxWidth: 640 }}>
          <p
            style={{
              fontFamily: "'DM Mono', monospace",
              fontSize: 12,
              fontWeight: 600,
              letterSpacing: "2.4px",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.6)",
              marginBottom: 20,
            }}
          >
            Tata Engage · Civil Society Partnerships
          </p>
          <div
            style={{
              width: 44,
              height: 3,
              background: "rgba(255,255,255,0.55)",
              borderRadius: 2,
              marginBottom: 28,
            }}
          />
          <h1
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "clamp(3.2rem, 6.4vw, 5.2rem)",
              fontWeight: 900,
              color: "#fff",
              lineHeight: 1.02,
              letterSpacing: "-2.5px",
              margin: "0 0 28px",
              whiteSpace: "pre-line",
            }}
          >
            {"Bridging intent\nwith impact"}
          </h1>
          <p
            style={{
              fontSize: 18,
              fontWeight: 300,
              lineHeight: 1.75,
              color: "rgba(255,255,255,0.88)",
              margin: "0 0 48px",
              maxWidth: 560,
            }}
          >
            Across the world, countless Tata professionals are eager to volunteer their time and skills — and equally many civil society organisations doing impactful work need the right support. Tata Engage is the trusted bridge between the two.
          </p>

          {/* Stat strip */}
          <div
            style={{
              display: "flex",
              gap: 40,
              paddingTop: 32,
              borderTop: "1px solid rgba(255,255,255,0.18)",
            }}
          >
            {[
              { num: "50,000+", label: "Tata volunteers"   },
              { num: "85+",     label: "NGO partners"       },
              { num: "1,200+",  label: "Projects completed" },
            ].map((s) => (
              <div key={s.label}>
                <div
                  style={{
                    fontSize: 28,
                    fontWeight: 900,
                    color: "#fff",
                    letterSpacing: "-0.5px",
                  }}
                >
                  {s.num}
                </div>
                <div
                  style={{
                    fontFamily: "'DM Mono', monospace",
                    fontSize: 11,
                    color: "rgba(255,255,255,0.5)",
                    marginTop: 6,
                    letterSpacing: "0.5px",
                  }}
                >
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Floating caption badge */}
      <div
        style={{
          position: "absolute",
          bottom: 100,
          right: 56,
          background: "rgba(0,0,0,0.28)",
          backdropFilter: "blur(8px)",
          border: "1px solid rgba(255,255,255,0.18)",
          borderRadius: 100,
          padding: "7px 18px",
          fontFamily: "'DM Mono', monospace",
          fontSize: 10,
          fontWeight: 600,
          letterSpacing: "1.5px",
          textTransform: "uppercase",
          color: "rgba(255,255,255,0.7)",
        }}
      >
        Civil Society · Partnerships · Impact
      </div>
    </div>
  );
}

// ── 2. Overview — who we are (white section) ──────────────────────────────────
function OverviewSection() {
  return (
    <section
      id="pwu-overview"
      style={{ padding: "88px 56px", background: "#fff" }}
    >
      <div
        style={{
          maxWidth: 1100,
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 72,
          alignItems: "center",
        }}
      >
        <div>
          <p
            style={{
              fontFamily: "'DM Mono', monospace",
              fontSize: 11,
              fontWeight: 600,
              letterSpacing: "1.8px",
              textTransform: "uppercase",
              color: COLOUR + "cc",
              marginBottom: 10,
            }}
          >
            What is Tata Engage?
          </p>
          <h2
            style={{
              fontSize: 32,
              fontWeight: 900,
              color: ACCENT_NAVY,
              letterSpacing: "-0.5px",
            }}
          >
            Where skilled people meet meaningful causes
          </h2>
          <DefinerBar />
          <div style={{ marginTop: 28 }}>
            <p
              style={{
                fontSize: 15,
                color: "#475569",
                lineHeight: 1.82,
                marginBottom: 16,
              }}
            >
              We serve as a trusted platform that connects credible Not-for-Profit organisations with motivated professionals from across the Tata ecosystem — enabling partnerships that strengthen organisational capacity and deliver real, on-ground impact.
            </p>
            <p
              style={{
                fontSize: 15,
                color: "#475569",
                lineHeight: 1.82,
              }}
            >
              Whether you are a civil society organisation looking for volunteers, or a Tata professional seeking purpose-driven work, Tata Engage has a path for you.
            </p>
          </div>
        </div>

        <div style={{ position: "relative" }}>
          <div
            style={{
              position: "absolute",
              top: -16,
              right: -16,
              zIndex: 0,
              width: 64,
              height: 64,
              borderRadius: 16,
              background: COLOUR,
              opacity: 0.12,
            }}
          />
          <div
            style={{
              borderRadius: 18,
              overflow: "hidden",
              boxShadow: "0 4px 32px rgba(0,0,0,0.10)",
              position: "relative",
              zIndex: 1,
            }}
          >
            <img
              src="https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?auto=format&fit=crop&q=80&w=900"
              alt=""
              style={{
                width: "100%",
                height: 380,
                objectFit: "cover",
                display: "block",
              }}
              referrerPolicy="no-referrer"
            />
          </div>
          <div
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              height: 4,
              background: COLOUR,
              borderRadius: "0 0 18px 18px",
              zIndex: 2,
            }}
          />
        </div>
      </div>
    </section>
  );
}

// ── 3. Bridge — two-world split card (light bg section) ───────────────────────
function BridgeSection() {
  const ngoPoints = [
    "Credible Not-for-Profit organisations",
    "Post projects requiring professional expertise",
    "Receive structured, TSG-supported partnerships",
    "Strengthen organisational capacity & on-ground impact",
  ];
  const volPoints = [
    "Motivated professionals from across the Tata ecosystem",
    "Apply to skill-based ProEngage projects (1–6 months)",
    "Join large-scale Tata Volunteering Week events",
    "Earn recognition, certificates & meaningful experience",
  ];

  return (
    <section
      id="pwu-bridge"
      style={{ padding: "88px 56px", background: "#F0F4FA" }}
    >
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 64 }}>
          <p
            style={{
              fontFamily: "'DM Mono', monospace",
              fontSize: 11,
              fontWeight: 600,
              letterSpacing: "1.8px",
              textTransform: "uppercase",
              color: COLOUR + "cc",
              marginBottom: 10,
            }}
          >
            How Tata Engage bridges this gap
          </p>
          <h2
            style={{
              fontSize: 30,
              fontWeight: 900,
              color: ACCENT_NAVY,
              letterSpacing: "-0.5px",
            }}
          >
            Two worlds, one platform
          </h2>
          <div style={{ display: "flex", justifyContent: "center", marginTop: 10 }}>
            <DefinerBar />
          </div>
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
          <div style={{ background: COLOUR_LIGHT, padding: "48px 44px" }}>
            <div
              style={{
                fontFamily: "'DM Mono', monospace",
                fontSize: 10,
                fontWeight: 700,
                letterSpacing: "2px",
                textTransform: "uppercase",
                color: COLOUR + "99",
                marginBottom: 16,
              }}
            >
              Civil society organisations
            </div>
            <h3
              style={{
                fontSize: 22,
                fontWeight: 900,
                color: ACCENT_NAVY,
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
                      background: COLOUR,
                      flexShrink: 0,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      marginTop: 2,
                    }}
                  >
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                      <path d="M2 5l2 2 4-4" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <span style={{ fontSize: 14, color: "#475569", lineHeight: 1.65 }}>{p}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Centre bridge column */}
          <div
            style={{
              background: COLOUR,
              width: 64,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: 12,
              padding: "20px 0",
              position: "relative",
            }}
          >
            <div style={DIAG} />
            {[0, 1, 2, 3].map((i) => (
              <div key={i} style={{ width: 4, height: 4, borderRadius: "50%", background: "rgba(255,255,255,0.4)", position: "relative", zIndex: 1 }} />
            ))}
            <div
              style={{
                writingMode: "vertical-lr" as const,
                transform: "rotate(180deg)",
                fontFamily: "'DM Mono', monospace",
                fontSize: 10,
                fontWeight: 700,
                letterSpacing: "2px",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.7)",
                whiteSpace: "nowrap",
                position: "relative",
                zIndex: 1,
              }}
            >
              Tata Engage
            </div>
            {[0, 1, 2, 3].map((i) => (
              <div key={i} style={{ width: 4, height: 4, borderRadius: "50%", background: "rgba(255,255,255,0.4)", position: "relative", zIndex: 1 }} />
            ))}
          </div>

          {/* Volunteer side */}
          <div style={{ background: COLOUR_DARK, padding: "48px 44px" }}>
            <div
              style={{
                fontFamily: "'DM Mono', monospace",
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
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                      <path d="M2 5l2 2 4-4" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <span style={{ fontSize: 14, color: "rgba(255,255,255,0.72)", lineHeight: 1.65 }}>{p}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── 4. For NGOs — numbered steps (white, with photo) ──────────────────────────
function NGOSection() {
  const steps: Array<{
    num: string;
    title: string;
    desc: string;
    Icon: React.FC;
    bullets?: Array<{ heading?: string; text: string }>;
  }> = [
    {
      num: "01",
      title: "Register on Tata Engage",
      desc: "Interested Not-for-Profit organisations must register on the Tata Engage platform, provide necessary profile details, and upload requested documents for due diligence.",
      Icon: IconRegister,
    },
    {
      num: "02",
      title: "Post your projects, once enrolled",
      desc: "Once enrolled on Tata Engage:",
      Icon: IconPost,
      bullets: [
        { text: "Authorised non-profit representatives can log in and post volunteering projects requiring professional expertise through ProEngage." },
        { text: "Stay informed about programme timelines, project upload windows, and other engagement opportunities." },
      ],
    },
    {
      num: "03",
      title: "Subscribe for alerts & updates",
      desc: "Subscribe to receive regular alerts and updates on Tata Engage initiatives — so your organisation is prepared and visible when Tata volunteers are mobilised.",
      Icon: IconSubscribe,
      bullets: [
        { heading: "ProEngage", text: "Skill-based volunteering projects." },
        { heading: "Tata Volunteering Week", text: "Large-scale, event-based volunteering." },
      ],
    },
  ];

  return (
    <section id="pwu-ngo" style={{ padding: "88px 56px", background: "#fff" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 80,
          }}
        >
          {/* Left: heading + photo */}
          <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
            <div>
              <p
                style={{
                  fontFamily: "'DM Mono', monospace",
                  fontSize: 11,
                  fontWeight: 600,
                  letterSpacing: "1.8px",
                  textTransform: "uppercase",
                  color: COLOUR + "cc",
                  marginBottom: 10,
                }}
              >
                For not-for-profit organisations
              </p>
              <h2
                style={{
                  fontSize: 30,
                  fontWeight: 900,
                  color: ACCENT_NAVY,
                  letterSpacing: "-0.5px",
                }}
              >
                Are you an NGO that needs volunteers?
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
                Not-for-Profit organisations seeking to collaborate with the{" "}
                <strong style={{ color: ACCENT_NAVY }}>Tata Sustainability Group</strong>{" "}
                can partner with Tata Engage to access skilled and committed volunteers from across the Tata ecosystem.
              </p>
            </div>

            {/* Photo placeholder */}
            <div
              style={{
                borderRadius: 18,
                overflow: "hidden",
                flex: 1,
                minHeight: 280,
                position: "relative",
                background: COLOUR_LIGHT,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 4px 24px rgba(0,0,0,0.08)",
              }}
            >
              <span
                style={{
                  fontFamily: "'DM Mono', monospace",
                  fontSize: 11,
                  color: COLOUR,
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
                  background: COLOUR,
                }}
              />
            </div>
          </div>

          {/* Right: numbered steps with icons */}
          <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
            {steps.map((s, i) => (
              <div
                key={s.num}
                style={{
                  paddingBottom: i < steps.length - 1 ? 36 : 0,
                  marginBottom: i < steps.length - 1 ? 36 : 0,
                  borderBottom: i < steps.length - 1 ? "1px solid #e8eef0" : "none",
                  display: "flex",
                  gap: 20,
                }}
              >
                {/* Icon circle */}
                <div
                  style={{
                    width: 52,
                    height: 52,
                    borderRadius: 14,
                    background: COLOUR_LIGHT,
                    border: `1.5px solid ${COLOUR}22`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: COLOUR,
                    flexShrink: 0,
                  }}
                >
                  <s.Icon />
                </div>

                <div style={{ flex: 1 }}>
                  <div
                    style={{
                      fontFamily: "'DM Mono', monospace",
                      fontSize: 10,
                      fontWeight: 700,
                      color: COLOUR + "80",
                      letterSpacing: "1px",
                      marginBottom: 6,
                    }}
                  >
                    Step {s.num}
                  </div>
                  <div
                    style={{
                      fontSize: 16,
                      fontWeight: 800,
                      color: ACCENT_NAVY,
                      marginBottom: 8,
                    }}
                  >
                    {s.title}
                  </div>
                  <div style={{ fontSize: 14, color: "#64748B", lineHeight: 1.75 }}>
                    {s.desc}
                  </div>

                  {s.bullets && (
                    <ul
                      style={{
                        listStyle: "none",
                        padding: 0,
                        margin: "14px 0 0",
                        display: "flex",
                        flexDirection: "column",
                        gap: 10,
                      }}
                    >
                      {s.bullets.map((b, bi) => (
                        <li
                          key={bi}
                          style={{
                            display: "flex",
                            gap: 10,
                            alignItems: "flex-start",
                            background: "#fff",
                            border: "1px solid #e8eef0",
                            borderLeft: `3px solid ${COLOUR}`,
                            borderRadius: 8,
                            padding: "10px 14px",
                          }}
                        >
                          <span
                            style={{
                              width: 6,
                              height: 6,
                              borderRadius: "50%",
                              background: COLOUR,
                              marginTop: 8,
                              flexShrink: 0,
                            }}
                          />
                          <span style={{ fontSize: 13, color: "#475569", lineHeight: 1.65 }}>
                            {b.heading && (
                              <strong style={{ color: ACCENT_NAVY, fontWeight: 800 }}>
                                {b.heading}:{" "}
                              </strong>
                            )}
                            {b.text}
                          </span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ── 5. Contact — dark teal section (matches TVW TSG section pattern) ──────────
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
        background: COLOUR_DARK,
        padding: "88px 56px",
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
          display: "grid",
          gridTemplateColumns: "1.1fr 0.9fr",
          gap: 72,
          alignItems: "start",
        }}
      >
        <div>
          <p
            style={{
              fontFamily: "'DM Mono', monospace",
              fontSize: 11,
              fontWeight: 600,
              letterSpacing: "1.8px",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.5)",
              marginBottom: 10,
            }}
          >
            Get in touch
          </p>
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
              marginBottom: 32,
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
            Whether you're a civil society organisation looking for volunteers, or a partner exploring collaboration opportunities, the Tata Engage team is here to help. Write to us with your organisation profile, details of your association with Tata companies, and your volunteering requirements — our team will guide you through the next steps of the enrolment process.
          </p>
        </div>

        <div
          style={{
            background: "rgba(0,0,0,0.22)",
            borderRadius: 20,
            padding: "40px 36px",
            border: "1px solid rgba(255,255,255,0.14)",
          }}
        >
          {/* Email card */}
          <div
            style={{
              fontFamily: "'DM Mono', monospace",
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
              fontSize: 19,
              fontWeight: 800,
              color: "#fff",
              marginBottom: 20,
            }}
          >
            tataengage@tata.com
          </div>
          <button
            onClick={copy}
            style={{
              background: copied ? "rgba(255,255,255,0.25)" : B_YELLOW,
              color: copied ? "#fff" : ACCENT_NAVY,
              border: "none",
              borderRadius: 10,
              padding: "13px 28px",
              fontWeight: 800,
              fontSize: 14,
              cursor: "pointer",
              transition: "background 0.2s",
              width: "100%",
              marginBottom: 12,
              boxShadow: copied ? "none" : "0 4px 20px rgba(0,0,0,0.22)",
            }}
          >
            {copied ? "Copied ✓" : "Copy email address"}
          </button>
          <button
            onClick={() => window.open("mailto:tataengage@tata.com")}
            style={{
              background: "transparent",
              color: "rgba(255,255,255,0.6)",
              border: "1px solid rgba(255,255,255,0.22)",
              borderRadius: 10,
              padding: "13px 28px",
              fontWeight: 600,
              fontSize: 14,
              cursor: "pointer",
              width: "100%",
            }}
          >
            Open in mail app
          </button>
        </div>
      </div>
    </section>
  );
}

// ── 6. Stay Connected (light bg) ──────────────────────────────────────────────
function StayConnectedSection() {
  const channels = [
    { platform: "LinkedIn",     handle: "Tata Engage",             note: "Official page",                                        url: "#" },
    { platform: "X (Twitter)", handle: "@TataEngage",              note: "Official handle",                                      url: "#" },
    { platform: "Website",     handle: "tata.com / Sustainability", note: "Tata Engage on the Tata Group platforms",              url: "#" },
  ];

  return (
    <section
      id="pwu-social"
      style={{ padding: "88px 56px", background: "#F0F4FA" }}
    >
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <p
            style={{
              fontFamily: "'DM Mono', monospace",
              fontSize: 11,
              fontWeight: 600,
              letterSpacing: "1.8px",
              textTransform: "uppercase",
              color: COLOUR + "cc",
              marginBottom: 10,
            }}
          >
            Stay connected
          </p>
          <h2
            style={{
              fontSize: 30,
              fontWeight: 900,
              color: ACCENT_NAVY,
              letterSpacing: "-0.5px",
            }}
          >
            Follow Tata Engage
          </h2>
          <div style={{ display: "flex", justifyContent: "center", marginTop: 10 }}>
            <DefinerBar />
          </div>
          <p
            style={{
              fontSize: 15,
              color: "#64748B",
              lineHeight: 1.8,
              maxWidth: 600,
              margin: "20px auto 0",
            }}
          >
            Stay updated on volunteering programmes, partner opportunities, and impact stories from across the Tata ecosystem.
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 20,
          }}
        >
          {channels.map((c) => (
            <a
              key={c.platform}
              href={c.url}
              style={{
                display: "block",
                background: "#fff",
                border: "1px solid #e8eef0",
                borderRadius: 16,
                padding: "28px 28px 26px",
                textDecoration: "none",
                color: "inherit",
                position: "relative",
                overflow: "hidden",
                transition: "transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(-3px)";
                (e.currentTarget as HTMLAnchorElement).style.boxShadow = "0 12px 28px rgba(13,107,122,0.12)";
                (e.currentTarget as HTMLAnchorElement).style.borderColor = COLOUR;
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.transform = "none";
                (e.currentTarget as HTMLAnchorElement).style.boxShadow = "none";
                (e.currentTarget as HTMLAnchorElement).style.borderColor = "#e8eef0";
              }}
            >
              {/* Top accent bar */}
              <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: COLOUR }} />
              <div
                style={{
                  fontFamily: "'DM Mono', monospace",
                  fontSize: 10,
                  fontWeight: 700,
                  letterSpacing: "1.8px",
                  textTransform: "uppercase",
                  color: COLOUR,
                  marginBottom: 10,
                }}
              >
                {c.platform}
              </div>
              <div style={{ fontSize: 17, fontWeight: 800, color: ACCENT_NAVY, marginBottom: 6, letterSpacing: "-0.2px" }}>
                {c.handle}
              </div>
              <div style={{ fontSize: 13, color: "#64748B", lineHeight: 1.6 }}>
                {c.note}
              </div>
              <div
                style={{
                  marginTop: 18,
                  fontFamily: "'DM Mono', monospace",
                  fontSize: 11,
                  fontWeight: 700,
                  letterSpacing: "1.2px",
                  textTransform: "uppercase",
                  color: COLOUR,
                }}
              >
                Follow ↗
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── 7. Two-path CTA — dark NAVY closing section (matches TVW closing section) ──
function CTASection() {
  const navigate = useAppNavigate();

  return (
    <section
      id="pwu-cta"
      style={{
        background: COLOUR_DARK,
        padding: "88px 56px",
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
          display: "grid",
          gridTemplateColumns: "1.1fr 0.9fr",
          gap: 72,
          alignItems: "start",
        }}
      >
        {/* Left: text */}
        <div>
          <p
            style={{
              fontFamily: "'DM Mono', monospace",
              fontSize: 11,
              fontWeight: 600,
              letterSpacing: "1.8px",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.5)",
              marginBottom: 10,
            }}
          >
            Get started
          </p>
          <h2 style={{ fontSize: 30, fontWeight: 900, color: "#fff", letterSpacing: "-0.5px" }}>
            Two paths. One platform.
          </h2>
          <div
            style={{
              height: 3,
              background: "rgba(255,255,255,0.25)",
              borderRadius: 2,
              width: 48,
              marginTop: 10,
              marginBottom: 32,
            }}
          />
          <p
            style={{
              fontSize: 15,
              color: "rgba(255,255,255,0.7)",
              lineHeight: 1.82,
              maxWidth: 460,
            }}
          >
            Whether you're an NGO looking for skilled volunteers or a Tata professional ready to make an impact, Tata Engage makes the connection easy.
          </p>
        </div>

        {/* Right: two CTA cards */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {/* NGO path */}
          <div
            style={{
              background: "rgba(0,0,0,0.22)",
              borderRadius: 16,
              padding: "28px 28px 32px",
              border: "1px solid rgba(255,255,255,0.14)",
            }}
          >
            <div
              style={{
                fontFamily: "'DM Mono', monospace",
                fontSize: 10,
                fontWeight: 700,
                letterSpacing: "2px",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.4)",
                marginBottom: 12,
              }}
            >
              Civil society organisation
            </div>
            <div style={{ fontSize: 18, fontWeight: 900, color: "#fff", marginBottom: 10, lineHeight: 1.2 }}>
              Are you an NGO or non-profit?
            </div>
            <p style={{ fontSize: 14, color: "rgba(255,255,255,0.65)", lineHeight: 1.75, marginBottom: 20 }}>
              Partner with Tata Engage to access skilled, committed volunteers from across the Tata ecosystem.
            </p>
            <button
              onClick={() => navigate("register-role")}
              style={{
                background: B_YELLOW,
                color: ACCENT_NAVY,
                border: "none",
                borderRadius: 10,
                padding: "13px 24px",
                fontWeight: 800,
                fontSize: 14,
                cursor: "pointer",
                width: "100%",
                boxShadow: "0 4px 20px rgba(0,0,0,0.22)",
              }}
            >
              Register as NGO partner →
            </button>
          </div>

          {/* Volunteer path */}
          <div
            style={{
              background: "rgba(255,255,255,0.06)",
              borderRadius: 16,
              padding: "28px 28px 32px",
              border: "1px solid rgba(255,255,255,0.10)",
            }}
          >
            <div
              style={{
                fontFamily: "'DM Mono', monospace",
                fontSize: 10,
                fontWeight: 700,
                letterSpacing: "2px",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.4)",
                marginBottom: 12,
              }}
            >
              Tata professional
            </div>
            <div style={{ fontSize: 18, fontWeight: 900, color: "#fff", marginBottom: 10, lineHeight: 1.2 }}>
              Are you a Tata employee?
            </div>
            <p style={{ fontSize: 14, color: "rgba(255,255,255,0.65)", lineHeight: 1.75, marginBottom: 20 }}>
              Register on Tata Engage and discover volunteering opportunities across TVW, ProEngage, and Disaster Response.
            </p>
            <button
              onClick={() => navigate("register-role")}
              style={{
                background: "transparent",
                color: "rgba(255,255,255,0.7)",
                border: "1.5px solid rgba(255,255,255,0.28)",
                borderRadius: 10,
                padding: "13px 24px",
                fontWeight: 700,
                fontSize: 14,
                cursor: "pointer",
                width: "100%",
              }}
            >
              Register as volunteer →
            </button>
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
        fontFamily: "'DM Sans', sans-serif",
        paddingTop: 64,
      }}
    >
      {/* Top accent stripe — sticky at top, matching all other subpages */}
      <div
        style={{
          height: 4,
          background: COLOUR,
          position: "sticky",
          top: 0,
          zIndex: 40,
        }}
      />

      <SubPageDotRail sections={SECTIONS} />

      <Hero />
      <OverviewSection />
      <BridgeSection />
      <NGOSection />
      <ContactSection />
      <StayConnectedSection />
      <CTASection />
    </div>
  );
}
