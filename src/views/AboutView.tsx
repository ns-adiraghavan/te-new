import { useState, useEffect, useRef } from "react";
import { useAppNavigate } from "@/hooks/useAppNavigate";

// ── Colour tokens (page-local — matches HTML prototype) ──────────────────────
const C       = "#0D6B7A";
const C_MID   = "#0A5260";
const C_LIGHT = "#E8F5F7";
const C_DARK  = "#0A3D47";
const NAVY    = "#0D1B3E";
const MUSTARD = "#C8940A";
const TVW_C   = "#333399";
const PE_C    = "#4D7A2A";
const DR_C    = "#007A8A";

const DIAG: React.CSSProperties = {
  position: "absolute",
  inset: 0,
  backgroundImage:
    "repeating-linear-gradient(45deg,rgba(255,255,255,0.03) 1px,transparent 1px)",
  backgroundSize: "28px 28px",
  pointerEvents: "none",
};

// ── Sections for dot-rail ────────────────────────────────────────────────────
const SECTIONS = [
  { id: "about-gcso",       label: "GCSO Message" },
  { id: "about-vision",     label: "Vision"        },
  { id: "about-what",       label: "What we do"    },
  { id: "about-impact",     label: "Impact"        },
  { id: "about-programmes", label: "Programmes"    },
  { id: "about-team",       label: "Team"          },
];

// ── Atoms ────────────────────────────────────────────────────────────────────
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

function DefinerBar({ colour = C, light = false }: { colour?: string; light?: boolean }) {
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
          background: light ? "rgba(255,255,255,0.7)" : colour,
          borderRadius: 2,
          transition: "width 0.65s cubic-bezier(0.22,1,0.36,1)",
          width: on ? "100%" : "0%",
        }}
      />
    </div>
  );
}

// ── Dot Rail ─────────────────────────────────────────────────────────────────
function DotRail({ active }: { active: number }) {
  return (
    <div
      style={{
        position: "fixed",
        right: 20,
        top: "50%",
        transform: "translateY(-50%)",
        display: "flex",
        flexDirection: "column",
        gap: 12,
        zIndex: 50,
      }}
    >
      {SECTIONS.map(({ id, label }, i) => {
        const isActive = active === i;
        return (
          <button
            key={id}
            onClick={() =>
              document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })
            }
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: 0,
            }}
          >
            {isActive && (
              <span
                style={{
                  fontSize: 11,
                  fontWeight: 600,
                  padding: "3px 10px",
                  borderRadius: 100,
                  marginRight: 8,
                  whiteSpace: "nowrap",
                  background: "#fff",
                  border: "1px solid #e2e8f0",
                  color: "#334155",
                  boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
                }}
              >
                {label}
              </span>
            )}
            <span
              style={{
                display: "block",
                borderRadius: "50%",
                width: isActive ? 10 : 7,
                height: isActive ? 10 : 7,
                background: isActive ? C : "#CBD5E1",
                transition: "all 0.25s",
              }}
            />
          </button>
        );
      })}
    </div>
  );
}

// ── Hero ─────────────────────────────────────────────────────────────────────
function Hero() {
  return (
    <div
      style={{
        position: "relative",
        minHeight: "82vh",
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
      }}
    >
      {/* Background — teal gradient fallback (replace with real photo) */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `linear-gradient(135deg, ${C_DARK} 0%, ${C} 60%, ${C_MID} 100%)`,
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `linear-gradient(108deg,${C_DARK}f8 0%,${C_DARK}e0 35%,${C}aa 58%,${C}55 78%,${C}22 100%)`,
        }}
      />
      <div style={DIAG} />
      {/* Fade to white at bottom */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: 80,
          background: "linear-gradient(to bottom,transparent,#fff)",
          pointerEvents: "none",
        }}
      />

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
        <div style={{ maxWidth: 600 }}>
          <p
            style={{
              fontFamily: "'DM Mono',monospace",
              fontSize: 10,
              fontWeight: 600,
              letterSpacing: "2.5px",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.45)",
              marginBottom: 18,
            }}
          >
            Tata Sustainability Group · Est. 2014
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
              fontSize: "clamp(2.8rem,5.5vw,4rem)",
              fontWeight: 900,
              color: "#fff",
              lineHeight: 1.05,
              letterSpacing: "-2px",
              margin: "0 0 22px",
            }}
          >
            About Tata Engage
          </h1>
          <p
            style={{
              fontSize: 16,
              fontWeight: 300,
              lineHeight: 1.82,
              color: "rgba(255,255,255,0.75)",
              margin: "0 0 48px",
              maxWidth: 480,
            }}
          >
            Institutionalising the spirit of giving across the Tata Group —
            connecting 50,000 volunteers, 85 NGO partners, and communities
            across India and the world.
          </p>
          <div
            style={{
              display: "flex",
              gap: 40,
              flexWrap: "wrap",
              paddingTop: 36,
              borderTop: "1px solid rgba(255,255,255,0.12)",
            }}
          >
            {[
              { num: "50,000+", label: "Active volunteers" },
              { num: "85+",     label: "NGO partners"      },
              { num: "16+",     label: "TVW editions"      },
              { num: "8.02M",   label: "Hours in FY24"     },
            ].map((s) => (
              <div key={s.label}>
                <div
                  style={{
                    fontSize: 24,
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
                    marginTop: 5,
                  }}
                >
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ── GCSO Letter ──────────────────────────────────────────────────────────────
function GCSOSection() {
  return (
    <section id="about-gcso" style={{ background: "#F4F8F7", padding: "96px 56px" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "0.9fr 1.1fr",
            gap: 72,
            alignItems: "center",
          }}
        >
          {/* Photo placeholder */}
          <div style={{ position: "relative" }}>
            <div
              style={{
                borderRadius: 18,
                overflow: "hidden",
                boxShadow: "0 8px 40px rgba(0,0,0,0.12)",
              }}
            >
              <div
                style={{
                  height: 480,
                  background: `linear-gradient(135deg,${C_DARK} 0%,${C} 100%)`,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 12,
                }}
              >
                <div
                  style={{
                    width: 96,
                    height: 96,
                    borderRadius: "50%",
                    background: "rgba(255,255,255,0.15)",
                    border: "2px solid rgba(255,255,255,0.25)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <span
                    style={{
                      fontSize: 36,
                      fontWeight: 900,
                      color: "rgba(255,255,255,0.8)",
                    }}
                  >
                    CT
                  </span>
                </div>
                <div
                  style={{
                    fontFamily: "'DM Mono',monospace",
                    fontSize: 10,
                    color: "rgba(255,255,255,0.4)",
                    letterSpacing: "1px",
                    marginTop: 8,
                  }}
                >
                  [ portrait photo ]
                </div>
              </div>
            </div>
            {/* Name plate */}
            <div
              style={{
                position: "absolute",
                bottom: -20,
                left: 24,
                right: 24,
                background: "#fff",
                borderRadius: 12,
                padding: "16px 20px",
                boxShadow: "0 4px 20px rgba(0,0,0,0.10)",
                display: "flex",
                alignItems: "center",
                gap: 16,
              }}
            >
              <div
                style={{
                  width: 4,
                  height: 40,
                  background: C,
                  borderRadius: 2,
                  flexShrink: 0,
                }}
              />
              <div>
                <div style={{ fontSize: 15, fontWeight: 800, color: NAVY }}>
                  Chacko Thomas
                </div>
                <div style={{ fontSize: 12, color: "#64748B", marginTop: 2 }}>
                  Group Chief Sustainability Officer, Tata Sons
                </div>
              </div>
            </div>
          </div>

          {/* Letter content */}
          <div style={{ paddingTop: 20 }}>
            <Eyebrow text="From the desk of the GCSO" />
            <h2
              style={{
                fontSize: 28,
                fontWeight: 900,
                color: NAVY,
                letterSpacing: "-0.5px",
                lineHeight: 1.2,
              }}
            >
              A letter from
              <br />
              Chacko Thomas
            </h2>
            <DefinerBar />

            <div style={{ margin: "32px 0 24px" }}>
              <div
                style={{
                  fontSize: 72,
                  lineHeight: 0.6,
                  color: C + "30",
                  fontFamily: "Georgia,serif",
                  marginBottom: 20,
                  marginLeft: -4,
                }}
              >
                "
              </div>
              <p
                style={{
                  fontFamily: "'Playfair Display',Georgia,serif",
                  fontSize: 19,
                  fontStyle: "italic",
                  color: NAVY,
                  lineHeight: 1.72,
                  marginBottom: 20,
                }}
              >
                Volunteering has always been integral to the Tata ethos — not
                as an act separate from business, but as a way of staying
                closely connected to communities, realities, and
                responsibilities that shape our shared future.
              </p>
            </div>

            <p
              style={{
                fontSize: 15,
                color: "#475569",
                lineHeight: 1.82,
                marginBottom: 16,
              }}
            >
              Across the Tata Group, volunteering continues to evolve from
              acts of compassion to expressions of thoughtful engagement,
              where time, skills, and intent come together to create
              meaningful outcomes.
            </p>
            <p
              style={{
                fontSize: 15,
                color: "#475569",
                lineHeight: 1.82,
                marginBottom: 16,
              }}
            >
              Through Tata Engage, we see this spirit come alive every day —
              in Tata colleagues, family members and retirees choosing to step
              forward, to contribute consistently, and to work alongside
              communities with empathy and purpose.
            </p>
            <p style={{ fontSize: 15, color: "#475569", lineHeight: 1.82 }}>
              Tata Engage remains a vital platform in this journey — not just
              as an enabler of volunteering, but as a reflection of who we are
              as a Group: committed, compassionate, and connected by a shared
              sense of purpose.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Vision ───────────────────────────────────────────────────────────────────
function VisionSection() {
  return (
    <section
      id="about-vision"
      style={{ padding: "96px 56px", background: "#fff" }}
    >
      <div
        style={{
          maxWidth: 1100,
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 72,
        }}
      >
        <div>
          <Eyebrow text="Why Tata Engage exists" />
          <h2
            style={{
              fontSize: 30,
              fontWeight: 900,
              color: NAVY,
              letterSpacing: "-0.5px",
            }}
          >
            Institutionalising the spirit of giving
          </h2>
          <DefinerBar />
          <p
            style={{
              fontSize: 15,
              color: "#475569",
              lineHeight: 1.85,
              marginTop: 24,
              marginBottom: 16,
            }}
          >
            Jamsetji Tata believed that business exists to serve society. That belief — rooted in selfless giving and constructive philanthropy — continues to guide the Tata Group today. Across diverse companies and geographies, Tata employees are united by shared values and a deep commitment to giving back.
          </p>
          <p style={{ fontSize: 15, color: "#475569", lineHeight: 1.85 }}>
            Tata Engage is the Tata Group's volunteering platform — designed to inspire, enable, and amplify employee engagement with communities and the environment. It brings together Tata employees, their families, and retired colleagues, and enables them — through its flagship programmes — to contribute their time, skills, and experience to address pressing social and environmental challenges.
          </p>
        </div>

        {/* Vision card */}
        <div
          style={{
            background: C_DARK,
            borderRadius: 20,
            padding: "40px 40px",
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
                fontWeight: 700,
                letterSpacing: "1.5px",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.35)",
                margin: "0 0 20px",
              }}
            >
              TE Vision
            </p>
            <p
              style={{
                fontFamily: "'Playfair Display',Georgia,serif",
                fontSize: 18,
                fontStyle: "italic",
                color: "rgba(255,255,255,0.92)",
                lineHeight: 1.75,
                margin: "0 0 32px",
              }}
            >
              "To inspire Tata volunteers around the world to engage with communities by contributing their time and skills."
            </p>
            <div style={{ display: "flex", gap: 28 }}>
              {[
                { num: "2014", label: "Platform launched"  },
                { num: "100+", label: "Companies reached"  },
              ].map((s) => (
                <div key={s.label}>
                  <div
                    style={{ fontSize: 22, fontWeight: 900, color: "#fff" }}
                  >
                    {s.num}
                  </div>
                  <div
                    style={{
                      fontFamily: "'DM Mono',monospace",
                      fontSize: 11,
                      color: "rgba(255,255,255,0.4)",
                      marginTop: 4,
                    }}
                  >
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── What we do ───────────────────────────────────────────────────────────────
function WhatSection() {
  const features = [
    {
      label: "Bringing together",
      desc:  "Not only Tata employees, but their families and retired Tata employees — one unified volunteer community.",
      colour: TVW_C,
    },
    {
      label: "Connecting volunteers",
      desc:  "With causes close to their hearts and the NGOs who work towards them most competently.",
      colour: PE_C,
    },
    {
      label: "Donating talent",
      desc:  "Helping employees contribute not just their time but their professional skills to bring about a greater difference.",
      colour: DR_C,
    },
    {
      label: "Curating opportunities",
      desc:  "Ranging from a one-hour experiential activity to a six-month professional project.",
      colour: MUSTARD,
    },
    {
      label: "Designing for dual growth",
      desc:  "Programmes that contribute to community development and to the volunteer's professional and personal growth.",
      colour: C,
    },
  ];

  return (
    <section
      id="about-what"
      style={{ background: "#F4F8F7", padding: "96px 56px" }}
    >
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ marginBottom: 52 }}>
          <Eyebrow text="What Tata Engage does" />
          <h2
            style={{
              fontSize: 30,
              fontWeight: 900,
              color: NAVY,
              letterSpacing: "-0.5px",
            }}
          >
            Five ways we create impact
          </h2>
          <DefinerBar />
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 16,
          }}
        >
          {features.slice(0, 4).map((f) => (
            <div
              key={f.label}
              style={{
                background: "#fff",
                borderRadius: 16,
                padding: "28px 28px",
                border: "1px solid #e8eef0",
                borderLeft: `4px solid ${f.colour}`,
                display: "flex",
                gap: 20,
                alignItems: "flex-start",
                transition: "transform 0.2s,box-shadow 0.2s",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLDivElement).style.transform = "translateY(-2px)";
                (e.currentTarget as HTMLDivElement).style.boxShadow = "0 8px 24px rgba(0,0,0,0.07)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLDivElement).style.transform = "none";
                (e.currentTarget as HTMLDivElement).style.boxShadow = "none";
              }}
            >
              <div
                style={{
                  width: 10,
                  height: 10,
                  borderRadius: "50%",
                  background: f.colour,
                  flexShrink: 0,
                  marginTop: 6,
                }}
              />
              <div>
                <div
                  style={{
                    fontSize: 16,
                    fontWeight: 800,
                    color: NAVY,
                    marginBottom: 8,
                  }}
                >
                  {f.label}
                </div>
                <div
                  style={{ fontSize: 14, color: "#64748B", lineHeight: 1.72 }}
                >
                  {f.desc}
                </div>
              </div>
            </div>
          ))}

          {/* 5th feature — full-width dark */}
          <div
            style={{
              gridColumn: "1 / -1",
              background: C_DARK,
              borderRadius: 16,
              padding: "28px 32px",
              display: "flex",
              gap: 20,
              alignItems: "center",
            }}
          >
            <div
              style={{
                width: 10,
                height: 10,
                borderRadius: "50%",
                background: MUSTARD,
                flexShrink: 0,
              }}
            />
            <div style={{ flex: 1 }}>
              <div
                style={{
                  fontSize: 16,
                  fontWeight: 800,
                  color: "#fff",
                  marginBottom: 6,
                }}
              >
                {features[4].label}
              </div>
              <div
                style={{
                  fontSize: 14,
                  color: "rgba(255,255,255,0.65)",
                  lineHeight: 1.72,
                  maxWidth: 600,
                }}
              >
                {features[4].desc}
              </div>
            </div>
            <button
              style={{
                background: MUSTARD,
                color: "#fff",
                border: "none",
                borderRadius: 10,
                padding: "11px 24px",
                fontWeight: 800,
                fontSize: 14,
                cursor: "pointer",
                whiteSpace: "nowrap",
                flexShrink: 0,
              }}
            >
              Volunteer now →
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Impact ───────────────────────────────────────────────────────────────────
function ImpactSection() {
  const stats = [
    { num: "50,000+", label: "Active Volunteers", sub: "Across 100+ Tata companies"  },
    { num: "85+",     label: "NGO Partners",       sub: "Across 15 states in India"   },
    { num: "8.02M",   label: "Hours in FY24",      sub: "Target met one year early"   },
    { num: "16+",     label: "TVW Editions",        sub: "Since March 2014"            },
  ];

  return (
    <section
      id="about-impact"
      style={{
        background: C,
        padding: "96px 56px",
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
        <Eyebrow text="Impact & Reach" dark />
        <h2
          style={{
            fontSize: 30,
            fontWeight: 900,
            color: "#fff",
            letterSpacing: "-0.5px",
            marginBottom: 0,
          }}
        >
          A decade of walking the talk
        </h2>
        <div
          style={{
            height: 3,
            background: "rgba(255,255,255,0.25)",
            borderRadius: 2,
            width: 48,
            marginTop: 10,
            marginBottom: 52,
          }}
        />

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4,1fr)",
            gap: 16,
            marginBottom: 52,
          }}
        >
          {stats.map((s) => (
            <div
              key={s.label}
              style={{
                background: "rgba(255,255,255,0.1)",
                border: "1px solid rgba(255,255,255,0.15)",
                borderRadius: 16,
                padding: "28px 22px",
              }}
            >
              <div
                style={{
                  fontSize: 36,
                  fontWeight: 900,
                  color: "#fff",
                  letterSpacing: "-1.5px",
                  lineHeight: 1,
                }}
              >
                {s.num}
              </div>
              <div
                style={{
                  fontSize: 14,
                  fontWeight: 700,
                  color: "rgba(255,255,255,0.9)",
                  marginTop: 10,
                }}
              >
                {s.label}
              </div>
              <div
                style={{
                  fontFamily: "'DM Mono',monospace",
                  fontSize: 11,
                  color: "rgba(255,255,255,0.45)",
                  marginTop: 5,
                }}
              >
                {s.sub}
              </div>
            </div>
          ))}
        </div>

        {/* Journey teaser */}
        <div
          style={{
            background: "rgba(255,255,255,0.08)",
            border: "1px solid rgba(255,255,255,0.15)",
            borderRadius: 16,
            padding: "28px 36px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 24,
          }}
        >
          <div>
            <div
              style={{
                fontSize: 16,
                fontWeight: 800,
                color: "#fff",
                marginBottom: 6,
              }}
            >
              From 4 companies to 100+ — see the full story
            </div>
            <div style={{ fontSize: 14, color: "rgba(255,255,255,0.6)" }}>
              Explore our interactive journey from 2014 to today.
            </div>
          </div>
          <button
            style={{
              background: MUSTARD,
              color: "#fff",
              border: "none",
              borderRadius: 10,
              padding: "12px 24px",
              fontWeight: 800,
              fontSize: 14,
              cursor: "pointer",
              whiteSpace: "nowrap",
              flexShrink: 0,
            }}
          >
            Our Journey →
          </button>
        </div>
      </div>
    </section>
  );
}

// ── Programmes ───────────────────────────────────────────────────────────────
function ProgrammesSection() {
  const navigate = useAppNavigate();

  const progs = [
    {
      name:   "Tata Volunteering Week",
      tag:    "Bi-annual · Global",
      desc:   "Held twice every year — commencing 3 March and 5 September — TVW unites the Tata family through half-day group volunteering activities. Each edition runs over a four-week period.",
      colour: TVW_C,
      light:  "#EEF0FF",
      route:  "about-tvw",
    },
    {
      name:   "ProEngage",
      tag:    "Skill-based · Year-round",
      desc:   "The Tata Group's flagship part-time, skill-based volunteering programme. Projects announced twice a year (15 June and 5 December) and run for 1 to 6 months.",
      colour: PE_C,
      light:  "#EDF5E8",
      route:  "about-proengage",
    },
    {
      name:   "Disaster Response",
      tag:    "Rapid Action",
      desc:   "Volunteers mobilised rapidly when communities face crisis — working as Project Managers, Procurement Officers, or Core Volunteers under the One Tata Response framework.",
      colour: DR_C,
      light:  "#E6F5F7",
      route:  "disaster-response",
    },
  ];

  return (
    <section
      id="about-programmes"
      style={{ padding: "96px 56px", background: "#fff" }}
    >
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <Eyebrow text="Our programmes" />
        <h2
          style={{
            fontSize: 30,
            fontWeight: 900,
            color: NAVY,
            letterSpacing: "-0.5px",
          }}
        >
          Three ways to volunteer
        </h2>
        <DefinerBar />

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3,1fr)",
            gap: 20,
            marginTop: 44,
          }}
        >
          {progs.map((p) => (
            <div
              key={p.name}
              style={{
                borderRadius: 18,
                overflow: "hidden",
                border: "1px solid #e8eef0",
                transition: "transform 0.2s,box-shadow 0.2s",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLDivElement).style.transform = "translateY(-3px)";
                (e.currentTarget as HTMLDivElement).style.boxShadow = "0 10px 28px rgba(0,0,0,0.08)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLDivElement).style.transform = "none";
                (e.currentTarget as HTMLDivElement).style.boxShadow = "none";
              }}
            >
              {/* Coloured header */}
              <div
                style={{
                  background: p.light,
                  padding: "28px 28px 22px",
                  borderBottom: `1px solid ${p.colour}20`,
                }}
              >
                <div
                  style={{
                    height: 3,
                    background: p.colour,
                    borderRadius: 2,
                    width: 32,
                    marginBottom: 16,
                  }}
                />
                <div
                  style={{
                    fontFamily: "'DM Mono',monospace",
                    fontSize: 10,
                    fontWeight: 700,
                    letterSpacing: "1.5px",
                    textTransform: "uppercase",
                    color: p.colour + "cc",
                    marginBottom: 8,
                  }}
                >
                  {p.tag}
                </div>
                <div style={{ fontSize: 18, fontWeight: 900, color: NAVY }}>
                  {p.name}
                </div>
              </div>

              <div style={{ padding: "20px 28px 28px" }}>
                <p
                  style={{
                    fontSize: 14,
                    color: "#64748B",
                    lineHeight: 1.75,
                    marginBottom: 20,
                  }}
                >
                  {p.desc}
                </p>
                <button
                  onClick={() => navigate(p.route)}
                  style={{
                    background: "none",
                    border: `1.5px solid ${p.colour}`,
                    borderRadius: 8,
                    padding: "8px 18px",
                    fontSize: 13,
                    fontWeight: 700,
                    color: p.colour,
                    cursor: "pointer",
                  }}
                >
                  Learn more →
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* NGO CTA */}
        <div
          style={{
            marginTop: 20,
            background: "#F4F8F7",
            borderRadius: 16,
            padding: "24px 32px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 24,
          }}
        >
          <div>
            <div
              style={{
                fontSize: 15,
                fontWeight: 800,
                color: NAVY,
                marginBottom: 4,
              }}
            >
              Are you an NGO?
            </div>
            <div style={{ fontSize: 14, color: "#64748B" }}>
              Partner with us to access skilled Tata volunteers for your projects.
            </div>
          </div>
          <button
            onClick={() => navigate("partner")}
            style={{
              background: NAVY,
              color: "#fff",
              border: "none",
              borderRadius: 10,
              padding: "11px 24px",
              fontWeight: 800,
              fontSize: 14,
              cursor: "pointer",
              whiteSpace: "nowrap",
              flexShrink: 0,
            }}
          >
            Partner with us →
          </button>
        </div>
      </div>
    </section>
  );
}

// ── Team ─────────────────────────────────────────────────────────────────────
function TeamSection() {
  const team = [
    { name: "Shrirang Dhavale",      title: "Cluster Head & General Manager", linkedin: true  },
    { name: "Gauri Rajadhyaksha",   title: "Deputy General Manager",          linkedin: true  },
    { name: "Supriya Ramachandran", title: "Manager",                         linkedin: false },
    { name: "Trupti Prabhu",        title: "Assistant Manager",               linkedin: true  },
  ];

  const initials = (n: string) =>
    n.split(" ").map((w) => w[0]).slice(0, 2).join("");

  return (
    <section
      id="about-team"
      style={{ background: "#F4F8F7", padding: "96px 56px" }}
    >
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <Eyebrow text="The team" />
        <h2
          style={{
            fontSize: 30,
            fontWeight: 900,
            color: NAVY,
            letterSpacing: "-0.5px",
          }}
        >
          Meet Tata Engage
        </h2>
        <DefinerBar />

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4,1fr)",
            gap: 20,
            marginTop: 44,
          }}
        >
          {team.map((t) => (
            <div
              key={t.name}
              style={{
                background: "#fff",
                border: "1px solid #e8eef0",
                borderRadius: 18,
                padding: "32px 24px",
                textAlign: "center",
                transition: "transform 0.2s,box-shadow 0.2s",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLDivElement).style.transform = "translateY(-3px)";
                (e.currentTarget as HTMLDivElement).style.boxShadow = "0 10px 28px rgba(0,0,0,0.08)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLDivElement).style.transform = "none";
                (e.currentTarget as HTMLDivElement).style.boxShadow = "none";
              }}
            >
              {/* Avatar */}
              <div
                style={{
                  width: 64,
                  height: 64,
                  borderRadius: "50%",
                  background: `linear-gradient(135deg,${C} 0%,${C_DARK} 100%)`,
                  color: "#fff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 20,
                  fontWeight: 800,
                  margin: "0 auto 18px",
                  letterSpacing: "0.5px",
                }}
              >
                {initials(t.name)}
              </div>

              <div style={{ marginBottom: 16 }}>
                <div
                  style={{
                    fontSize: 15,
                    fontWeight: 800,
                    color: NAVY,
                    marginBottom: 4,
                  }}
                >
                  {t.name}
                </div>
                <div
                  style={{
                    fontSize: 13,
                    color: "#64748B",
                    lineHeight: 1.5,
                  }}
                >
                  {t.title}
                </div>
              </div>

              <div
                style={{
                  fontSize: 11,
                  fontWeight: 600,
                  color: C,
                  background: C_LIGHT,
                  borderRadius: 100,
                  padding: "3px 12px",
                  display: "inline-block",
                  marginBottom: t.linkedin ? 12 : 0,
                }}
              >
                Social Services Cluster
              </div>

              {t.linkedin && (
                <div style={{ marginTop: 8 }}>
                  <a
                    href="#"
                    style={{
                      fontSize: 12,
                      color: "#0077B5",
                      fontWeight: 600,
                      textDecoration: "none",
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 4,
                    }}
                  >
                    LinkedIn ↗
                  </a>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Main View ─────────────────────────────────────────────────────────────────
export default function AboutView() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    SECTIONS.forEach(({ id }, idx) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([e]) => { if (e.isIntersecting) setActive(idx); },
        { threshold: 0.25 }
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  return (
    <div
      style={{
        background: "#fff",
        minHeight: "100vh",
        fontFamily: "'DM Sans',sans-serif",
        paddingTop: 64, // navbar clearance
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

      <DotRail active={active} />
      <Hero />
      <GCSOSection />
      <VisionSection />
      <WhatSection />
      <ImpactSection />
      <ProgrammesSection />
      <TeamSection />
    </div>
  );
}
