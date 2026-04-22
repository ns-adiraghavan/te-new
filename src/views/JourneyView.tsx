import { useState, useEffect, useRef } from "react";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { useAppNavigate } from "@/hooks/useAppNavigate";

// ── Asset imports ─────────────────────────────────────────────────────────────
import imgTrent        from "@/assets/trent.jpg";
import imgBball        from "@/assets/tatabball.jpg";
import imgDR1          from "@/assets/dr_photo.jpg";
import imgElxsi        from "@/assets/tata-elxsi.jpg";
import imgIHCL         from "@/assets/IHCL.jpg";
import imgMotors       from "@/assets/Tata_Motors_1.jpg";
import imgComms        from "@/assets/tata-communications-1.jpg";
import imgAirIndia     from "@/assets/air-india.jpg";
import imgAIG          from "@/assets/tata-aig-1.jpg";
import imgTrent2       from "@/assets/trent_2.jpg";
import imgDR2          from "@/assets/dr_photo_2.jpg";
import imgInfiniti     from "@/assets/infiniti-1.jpg";

// ── Brand tokens ──────────────────────────────────────────────────────────────
const ACCENT_NAVY = "#0D1B3E";
const B_YELLOW    = "#F5A623";

// ── Era colour palette (cycling: forest → amber → teal → blue → lime) ────────
const C_FOREST = "#2A7A4F";
const C_AMBER  = "#C8940A";
const C_TEAL   = "#0D7A8A";
const C_BLUE   = "#1E6BB8";
const C_LIME   = "#4A7C2F";

// ── Timeline data — sourced from The_Tata_Engage_Journey doc ─────────────────
const ERAS = [
  {
    id: "era-genesis",
    label: "Genesis",
    years: "FY 2015 – 2016",
    colour: C_FOREST,
    milestones: [
      {
        key: "fy2015",
        year: "FY 2015",
        tag: "Launch",
        title: "Tata Engage is born",
        body: "Launched with Tata Volunteering Week and ProEngage on the 175th birth anniversary of Jamsetji Tata. A goal of one million volunteering hours is set for the Group.",
        stat: "1 goal",
        statSub: "one million hours",
        photo: imgTrent,
      },
      {
        key: "fy2016",
        year: "FY 2016",
        tag: "Disaster Response",
        title: "1.02M hours & Tamil Nadu floods",
        body: "Tata Engage crosses 1.02 million hours. 100+ volunteers deploy for the Tamil Nadu floods. The One Tata Response framework is adopted as part of disaster response guidelines.",
        stat: "1.02M",
        statSub: "volunteering hours",
        photo: imgDR1,
      },
    ],
  },
  {
    id: "era-building",
    label: "Building",
    years: "FY 2017 – 2019",
    colour: C_AMBER,
    milestones: [
      {
        key: "fy2017",
        year: "FY 2017",
        tag: "Policy",
        title: "Group volunteering guidelines",
        body: "Tata Group volunteering guidelines launched to help 100+ companies review or develop new volunteering programmes and policies across geographies.",
        stat: "100+",
        statSub: "companies guided",
        photo: imgElxsi,
      },
      {
        key: "fy2018",
        year: "FY 2018",
        tag: "Community",
        title: "Regional SPOC forums & first VolCon",
        body: "Regional SPOC forums created for knowledge building and best-practice sharing. The inaugural Tata Volunteering Conference (VolCon) brings together Group-wide volunteering experts.",
        stat: "VolCon",
        statSub: "inaugural edition",
        photo: imgBball,
      },
      {
        key: "fy2019",
        year: "FY 2019",
        tag: "Global Award",
        title: "IAVE Best Global Volunteer Program",
        body: "Tata Engage wins the IAVE \"Best Global Volunteer Program\" award — the International Association for Volunteer Effort's highest recognition for corporate volunteering.",
        stat: "IAVE",
        statSub: "global #1",
        photo: imgIHCL,
      },
    ],
  },
  {
    id: "era-resilience",
    label: "Resilience",
    years: "FY 2020 – 2021",
    colour: C_TEAL,
    milestones: [
      {
        key: "fy2020",
        year: "FY 2020",
        tag: "Ambition",
        title: "1.5M hours & the 4 PCVH target",
        body: "Crossed 1.5 million hours. The Tata Group Sustainability Council adopts a 4 Per Capita Volunteering Hours target by 2025. Tata Engage joins IAVE's Global Corporate Volunteer Council.",
        stat: "1.5M",
        statSub: "hours · 4 PCVH target set",
        photo: imgMotors,
      },
      {
        key: "fy2021",
        year: "FY 2021",
        tag: "Pivot",
        title: "Virtual — and still one million",
        body: "COVID-19 forces a full pivot to virtual volunteering. Despite the pandemic, Tata volunteers clock over one million hours entirely online, and the group volunteering strategy is disseminated to senior leaders across all companies.",
        stat: "1M+",
        statSub: "hours · all virtual",
        photo: imgComms,
      },
    ],
  },
  {
    id: "era-acceleration",
    label: "Acceleration",
    years: "FY 2022 – 2023",
    colour: C_BLUE,
    milestones: [
      {
        key: "fy2022",
        year: "FY 2022",
        tag: "Phygital",
        title: "1.34M hours — post-pandemic upswing",
        body: "Volunteering returns in phygital form with 1.34 million hours (1.5 PCVH). ProEngage scales for deeper skill-based impact; e-orientation module for the SPOC cadre launched.",
        stat: "1.34M",
        statSub: "hours · 1.5 PCVH",
        photo: imgAirIndia,
      },
      {
        key: "fy2023",
        year: "FY 2023",
        tag: "Record",
        title: "3.67M hours — 17 companies cross 4 PCVH",
        body: "Group-level record of 3.67 million hours at 3.77 PCVH. 17 companies embed scale and cross 4 PCVH. 6 companies roll out enterprise-level volunteering policies. Tata Engage presents at the Global Conference on Volunteering in Abu Dhabi.",
        stat: "3.67M",
        statSub: "hours · 3.77 PCVH",
        photo: imgAIG,
      },
    ],
  },
  {
    id: "era-today",
    label: "Today",
    years: "FY 2024 – 2025",
    colour: C_LIME,
    milestones: [
      {
        key: "fy2024",
        year: "FY 2024",
        tag: "Target met",
        title: "8.02M hours — 4 PCVH, a year early",
        body: "4 PCVH achieved one year ahead of target. 24 companies cross 4 PCVH. Tata group joins the Board of Directors of IAVE. VolCon hosted at Taj Mahal Palace, Mumbai for 170 Tata leaders.",
        stat: "8.02M",
        statSub: "hours · PCVH 7.97",
        photo: imgTrent2,
      },
      {
        key: "fy2025",
        year: "FY 2025",
        tag: "Global leader",
        title: "10.87M hours — highest ever",
        body: "10.87 million hours at 10.67 PCVH — the highest in Tata Engage's history. 27 companies cross 4 PCVH. Tata group emerges as a possible global leader in corporate volunteering: Rank 1 in total hours, Rank 2 in per capita contribution.",
        stat: "10.87M",
        statSub: "hours · PCVH 10.67",
        photo: imgInfiniti,
      },
    ],
  },
] as const;

type Era = typeof ERAS[number];
type Milestone = Era["milestones"][number];

// ── Milestone card ────────────────────────────────────────────────────────────
function MilestoneCard({
  m,
  colour,
  index,
}: {
  m: Milestone;
  colour: string;
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{
        background: "#fff",
        border: "1px solid #e4e7ef",
        borderRadius: 18,
        overflow: "hidden",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(32px)",
        transition: "opacity 0.5s ease, transform 0.5s ease, box-shadow 0.22s ease",
        transitionDelay: `${(index % 2) * 0.1}s`,
        display: "flex",
        flexDirection: "column",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-4px)";
        e.currentTarget.style.boxShadow = `0 16px 40px ${colour}28, 0 2px 12px rgba(0,0,0,0.06)`;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "none";
      }}
    >
      {/* Coloured header block */}
      <div style={{ background: colour, flexShrink: 0 }}>
        {/* Photo */}
        <div style={{ height: 196, position: "relative", overflow: "hidden" }}>
          <img
            src={m.photo}
            alt={m.title}
            style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
          />
          {/* Gradient: dark top for badge legibility, colour fade at bottom into stat strip */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: `linear-gradient(to bottom,
                rgba(0,0,0,0.32) 0%,
                rgba(0,0,0,0.0) 38%,
                ${colour}aa 75%,
                ${colour} 100%)`,
            }}
          />
          {/* Year pill — top left */}
          <span
            style={{
              position: "absolute",
              top: 13,
              left: 13,
              fontFamily: "'DM Mono', monospace",
              fontSize: 9,
              fontWeight: 700,
              letterSpacing: "1px",
              textTransform: "uppercase",
              padding: "5px 11px",
              borderRadius: 100,
              background: "rgba(255,255,255,0.18)",
              backdropFilter: "blur(8px)",
              border: "1px solid rgba(255,255,255,0.3)",
              color: "#fff",
            }}
          >
            {m.year}
          </span>
          {/* Tag pill — top right, white with era colour text */}
          <span
            style={{
              position: "absolute",
              top: 13,
              right: 13,
              fontFamily: "'DM Mono', monospace",
              fontSize: 9,
              fontWeight: 700,
              letterSpacing: "1.5px",
              textTransform: "uppercase",
              padding: "5px 11px",
              borderRadius: 100,
              background: "rgba(255,255,255,0.95)",
              color: colour,
            }}
          >
            {m.tag}
          </span>
        </div>

        {/* Stat strip — lives in the colour band */}
        <div
          style={{
            padding: "12px 18px 14px",
            display: "flex",
            alignItems: "baseline",
            gap: 8,
          }}
        >
          <span
            style={{
              fontSize: 24,
              fontWeight: 900,
              color: "#fff",
              letterSpacing: "-0.5px",
              lineHeight: 1,
            }}
          >
            {m.stat}
          </span>
          <span
            style={{
              fontFamily: "'DM Mono', monospace",
              fontSize: 9.5,
              color: "rgba(255,255,255,0.62)",
            }}
          >
            {m.statSub}
          </span>
        </div>
      </div>

      {/* White body */}
      <div style={{ padding: "18px 20px 22px", flex: 1 }}>
        <h3
          style={{
            fontSize: 16,
            fontWeight: 900,
            color: ACCENT_NAVY,
            letterSpacing: "-0.2px",
            lineHeight: 1.25,
            marginBottom: 8,
          }}
        >
          {m.title}
        </h3>
        <p
          style={{
            fontSize: 12.5,
            color: "#64748b",
            lineHeight: 1.72,
            margin: 0,
          }}
        >
          {m.body}
        </p>
      </div>
    </div>
  );
}

// ── Era section ───────────────────────────────────────────────────────────────
function EraSection({ era, globalStart }: { era: Era; globalStart: number }) {
  return (
    <section id={era.id} style={{ paddingBottom: 40, scrollMarginTop: 64 }}>
      {/* Era divider label — compact, no wasted space */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 12,
          paddingTop: 40,
          paddingBottom: 20,
        }}
      >
        <div
          style={{
            background: era.colour,
            color: "#fff",
            fontFamily: "'DM Mono', monospace",
            fontSize: 9,
            fontWeight: 700,
            letterSpacing: "1.8px",
            textTransform: "uppercase",
            padding: "5px 13px",
            borderRadius: 100,
            flexShrink: 0,
          }}
        >
          {era.label}
        </div>
        <div
          style={{
            flex: 1,
            height: 1,
            background: `linear-gradient(to right, ${era.colour}55, transparent)`,
          }}
        />
        <span
          style={{
            fontFamily: "'DM Mono', monospace",
            fontSize: 10,
            color: "#b0b8c8",
            flexShrink: 0,
          }}
        >
          {era.years}
        </span>
      </div>

      {/* Card grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gap: 20,
        }}
      >
        {era.milestones.map((m, i) => (
          <MilestoneCard
            key={m.key}
            m={m}
            colour={era.colour}
            index={globalStart + i}
          />
        ))}
      </div>
    </section>
  );
}

// ── Main component ────────────────────────────────────────────────────────────
export default function JourneyView() {
  const navigate = useAppNavigate();
  const [activeEraIdx, setActiveEraIdx] = useState(0);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    ERAS.forEach(({ id }, idx) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveEraIdx(idx); },
        { threshold: 0.18, rootMargin: "-64px 0px -50% 0px" }
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  const jumpTo = (idx: number) => {
    const el = document.getElementById(ERAS[idx].id);
    el?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const globalStarts = ERAS.reduce<number[]>((acc, era, i) => {
    acc.push(i === 0 ? 0 : acc[i - 1] + ERAS[i - 1].milestones.length);
    return acc;
  }, []);

  return (
    <div
      style={{
        paddingTop: 64,
        paddingBottom: 52,
        background: "#f4f5f8",
        minHeight: "100vh",
        fontFamily: "'DM Sans', sans-serif",
      }}
    >
      {/* Rainbow accent line — sits below the navbar */}
      <div
        style={{
          position: "fixed",
          top: 64,
          left: 0,
          right: 0,
          height: 3,
          zIndex: 30,
          background: `linear-gradient(to right, ${C_FOREST}, ${C_AMBER}, ${C_TEAL}, ${C_BLUE}, ${C_LIME})`,
        }}
      />

      {/* Right dot rail — unified site style (square navy nodes, navy label pill, dotted connector) */}
      <div
        className="fixed right-4 top-1/2 -translate-y-1/2 z-40 flex flex-col items-end"
        style={{ gap: 0 }}
      >
        {ERAS.map((era, i) => {
          const isActive = i === activeEraIdx;
          const isLast = i === ERAS.length - 1;
          return (
            <div key={era.id} className="flex flex-col items-end">
              <button
                onClick={() => jumpTo(i)}
                title={era.label}
                className="flex items-center justify-end"
                style={{ background: "none", border: "none", cursor: "pointer", padding: 0, marginBottom: 0 }}
              >
                {isActive && (
                  <span
                    className="whitespace-nowrap shadow-sm transition-all duration-300 mr-2"
                    style={{
                      fontSize: 11,
                      fontWeight: 700,
                      letterSpacing: "0.3px",
                      padding: "3px 9px",
                      borderRadius: 4,
                      backgroundColor: "rgba(13,27,62,0.92)",
                      border: `1px solid ${ACCENT_NAVY}`,
                      color: "#ffffff",
                    }}
                  >
                    {era.label}
                  </span>
                )}
                <span
                  className="transition-all duration-300"
                  style={{
                    width: isActive ? 9 : 6,
                    height: isActive ? 9 : 6,
                    borderRadius: 2,
                    backgroundColor: ACCENT_NAVY,
                    border: `1px solid rgba(13,27,62,0.25)`,
                    display: "block",
                    flexShrink: 0,
                  }}
                />
              </button>
              {!isLast && (
                <div
                  style={{
                    width: 1,
                    height: 28,
                    marginLeft: "auto",
                    marginRight: isActive ? "4px" : "2.5px",
                    backgroundImage: `repeating-linear-gradient(to bottom, ${ACCENT_NAVY}50 0px, ${ACCENT_NAVY}50 3px, transparent 3px, transparent 7px)`,
                    transition: "all 0.3s",
                  }}
                />
              )}
            </div>
          );
        })}
      </div>

      {/* ══════════════════════════════════════════
          HERO — full-bleed dark photo banner
      ══════════════════════════════════════════ */}
      <div
        style={{
          position: "relative",
          height: "88vh",
          minHeight: 560,
          overflow: "hidden",
          background: ACCENT_NAVY,
        }}
      >
        <img
          src={imgBball}
          alt="Tata volunteers"
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center 30%",
            display: "block",
          }}
        />

        {/* Left-heavy editorial gradient */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: `linear-gradient(
              to right,
              rgba(8,14,30,0.91) 0%,
              rgba(8,14,30,0.74) 42%,
              rgba(8,14,30,0.28) 76%,
              rgba(8,14,30,0.10) 100%
            )`,
          }}
        />

        {/* Diagonal texture */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "repeating-linear-gradient(135deg, rgba(255,255,255,0.018) 0px, rgba(255,255,255,0.018) 1px, transparent 1px, transparent 28px)",
            pointerEvents: "none",
          }}
        />

        {/* Rainbow top accent within hero */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: 4,
            background: `linear-gradient(to right, ${C_FOREST}, ${C_AMBER}, ${C_TEAL}, ${C_BLUE}, ${C_LIME})`,
          }}
        />

        {/* Hero content — bottom-anchored */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-end",
            padding: "0 72px 64px",
            maxWidth: 860,
          }}
        >
          <p
            style={{
              fontFamily: "'DM Mono', monospace",
              fontSize: 10,
              fontWeight: 700,
              letterSpacing: "3px",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.40)",
              marginBottom: 16,
            }}
          >
            Tata Engage · 2014 – 2025
          </p>

          {/* Yellow definer bar */}
          <div
            style={{
              width: 48,
              height: 3,
              borderRadius: 2,
              background: B_YELLOW,
              marginBottom: 22,
            }}
          />

          {/* H1 — tagline from doc: "Shaped by compassion, action and community" */}
          <h1
            style={{
              fontSize: "clamp(36px, 5.5vw, 66px)",
              fontWeight: 900,
              letterSpacing: "-2px",
              lineHeight: 1.02,
              color: "#fff",
              margin: "0 0 18px",
            }}
          >
            Shaped by compassion,
            <br />
            <em
              style={{
                fontStyle: "italic",
                fontFamily: "'Playfair Display', serif",
                fontWeight: 700,
              }}
            >
              action
            </em>{" "}
            and community
          </h1>

          <p
            style={{
              fontSize: 15,
              fontWeight: 300,
              lineHeight: 1.7,
              color: "rgba(255,255,255,0.60)",
              maxWidth: 480,
              marginBottom: 40,
            }}
          >
            From one million hours to ten. Eleven years of the Tata Group's
            commitment to purposeful volunteering — and counting.
          </p>

          {/* Stat pills */}
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            {[
              { n: "10.87M", l: "Hours in FY25" },
              { n: "4,392",  l: "ProEngage projects" },
              { n: "1,222",  l: "NGOs supported" },
              { n: "Rank 1", l: "Global total hours" },
            ].map(({ n, l }) => (
              <div
                key={l}
                style={{
                  background: "rgba(255,255,255,0.10)",
                  border: "1px solid rgba(255,255,255,0.18)",
                  borderRadius: 10,
                  padding: "10px 18px",
                  backdropFilter: "blur(4px)",
                }}
              >
                <div
                  style={{
                    fontSize: 20,
                    fontWeight: 900,
                    color: "#fff",
                    letterSpacing: "-0.5px",
                    lineHeight: 1,
                  }}
                >
                  {n}
                </div>
                <div
                  style={{
                    fontFamily: "'DM Mono', monospace",
                    fontSize: 9,
                    color: "rgba(255,255,255,0.46)",
                    marginTop: 4,
                  }}
                >
                  {l}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll chevrons — bottom right */}
        <div
          style={{
            position: "absolute",
            bottom: 28,
            right: 56,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 3,
            opacity: 0.38,
          }}
        >
          {([0, 0.18, 0.36] as const).map((delay) => (
            <svg
              key={delay}
              width="18"
              height="10"
              viewBox="0 0 18 10"
              fill="none"
              style={{ animation: `chevBob 1.4s ease-in-out ${delay}s infinite` }}
            >
              <polyline
                points="1,1 9,9 17,1"
                stroke="#fff"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          ))}
        </div>
      </div>

      {/* Chevron animation */}
      <style>{`
        @keyframes chevBob {
          0%, 100% { transform: translateY(0); }
          50%       { transform: translateY(4px); }
        }
      `}</style>

      {/* ══════════════════════════════════════════
          ERA SECTIONS
      ══════════════════════════════════════════ */}
      <div style={{ maxWidth: 980, margin: "0 auto", padding: "0 48px" }}>
        {ERAS.map((era, eraIdx) => (
          <EraSection
            key={era.id}
            era={era}
            globalStart={globalStarts[eraIdx]}
          />
        ))}
      </div>

      {/* ══════════════════════════════════════════
          NAVY BOTTOM STRIP
      ══════════════════════════════════════════ */}
      <div
        style={{
          background: ACCENT_NAVY,
          padding: "72px 48px",
          marginTop: 24,
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Diagonal texture */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "repeating-linear-gradient(135deg, rgba(255,255,255,0.022) 0px, rgba(255,255,255,0.022) 1px, transparent 1px, transparent 28px)",
            pointerEvents: "none",
          }}
        />
        {/* Radial glow */}
        <div
          style={{
            position: "absolute",
            top: "-60px",
            right: "-60px",
            width: 360,
            height: 360,
            borderRadius: "50%",
            background: `radial-gradient(circle, ${C_LIME}20 0%, transparent 70%)`,
            pointerEvents: "none",
          }}
        />

        <div
          style={{
            position: "relative",
            zIndex: 1,
            maxWidth: 620,
            margin: "0 auto",
            textAlign: "center",
          }}
        >
          <p
            style={{
              fontFamily: "'DM Mono', monospace",
              fontSize: 10,
              fontWeight: 700,
              letterSpacing: "2.5px",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.35)",
              marginBottom: 14,
            }}
          >
            The next chapter
          </p>

          <div
            style={{
              width: 40,
              height: 3,
              borderRadius: 2,
              background: B_YELLOW,
              margin: "0 auto 24px",
            }}
          />

          <h2
            style={{
              fontSize: "clamp(26px, 4vw, 40px)",
              fontWeight: 900,
              color: "#fff",
              letterSpacing: "-0.8px",
              lineHeight: 1.1,
              marginBottom: 16,
            }}
          >
            Be part of what comes next
          </h2>
          <p
            style={{
              fontSize: 15,
              color: "rgba(255,255,255,0.55)",
              lineHeight: 1.72,
              marginBottom: 36,
            }}
          >
            Join a community of 50,000+ volunteers shaping a better world
            through the Tata Group's longest-running commitment to action.
          </p>

          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: 12,
              flexWrap: "wrap",
            }}
          >
            <button
              onClick={() => navigate("register-role")}
              style={{
                background: B_YELLOW,
                color: ACCENT_NAVY,
                border: "none",
                borderRadius: 10,
                padding: "13px 28px",
                fontWeight: 800,
                fontSize: 14,
                cursor: "pointer",
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                letterSpacing: "-0.2px",
              }}
            >
              Register as Volunteer <ArrowRight size={14} />
            </button>
            <button
              onClick={() => navigate("about")}
              style={{
                background: "rgba(255,255,255,0.08)",
                color: "rgba(255,255,255,0.82)",
                border: "1px solid rgba(255,255,255,0.16)",
                borderRadius: 10,
                padding: "13px 28px",
                fontWeight: 600,
                fontSize: 14,
                cursor: "pointer",
              }}
            >
              About TataEngage
            </button>
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════
          BOTTOM ERA NAV — fixed
      ══════════════════════════════════════════ */}
      <nav
        style={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          height: 52,
          background: "rgba(255,255,255,0.96)",
          backdropFilter: "blur(12px)",
          borderTop: "1px solid #e4e7ef",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 5,
        }}
      >
        <button
          onClick={() => jumpTo(Math.max(0, activeEraIdx - 1))}
          disabled={activeEraIdx === 0}
          style={{
            width: 32,
            height: 32,
            borderRadius: "50%",
            border: "1.5px solid #e2e8f0",
            background: "#fff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: activeEraIdx === 0 ? "default" : "pointer",
            opacity: activeEraIdx === 0 ? 0.3 : 1,
            marginRight: 2,
            color: "#475569",
            transition: "opacity 0.2s",
          }}
        >
          <ChevronLeft size={13} />
        </button>

        {ERAS.map((era, i) => {
          const isActive = i === activeEraIdx;
          return (
            <button
              key={era.id}
              onClick={() => jumpTo(i)}
              style={{
                fontFamily: "'DM Mono', monospace",
                fontSize: 9.5,
                fontWeight: 700,
                letterSpacing: "1px",
                textTransform: "uppercase",
                padding: "6px 14px",
                borderRadius: 100,
                border: isActive ? "1.5px solid transparent" : "1.5px solid #e2e8f0",
                background: isActive ? era.colour : "transparent",
                color: isActive ? "#fff" : "#94a3b8",
                cursor: "pointer",
                transition: "all 0.2s ease",
              }}
            >
              {era.label}
            </button>
          );
        })}

        <button
          onClick={() => jumpTo(Math.min(ERAS.length - 1, activeEraIdx + 1))}
          disabled={activeEraIdx === ERAS.length - 1}
          style={{
            width: 32,
            height: 32,
            borderRadius: "50%",
            border: "1.5px solid #e2e8f0",
            background: "#fff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: activeEraIdx === ERAS.length - 1 ? "default" : "pointer",
            opacity: activeEraIdx === ERAS.length - 1 ? 0.3 : 1,
            marginLeft: 2,
            color: "#475569",
            transition: "opacity 0.2s",
          }}
        >
          <ChevronRight size={13} />
        </button>
      </nav>
    </div>
  );
}
