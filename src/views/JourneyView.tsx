import { useState, useEffect, useRef } from "react";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { useAppNavigate } from "@/hooks/useAppNavigate";
import Footer from "@/components/layout/Footer";

// ── Asset imports ─────────────────────────────────────────────────────────────
import imgTrent        from "@/assets/trent.jpg";
import imgDR1          from "@/assets/dr_photo.jpg";
import imgElxsi        from "@/assets/tata-elxsi.jpg";
import imgBball        from "@/assets/tatabball.jpg";
import imgIHCL         from "@/assets/IHCL.jpg";
import imgMotors       from "@/assets/Tata_Motors_1.jpg";
import imgComms        from "@/assets/tata-communications-1.jpg";
import imgAirIndia     from "@/assets/air-india.jpg";
import imgAIG          from "@/assets/tata-aig-1.jpg";
import imgTrent2       from "@/assets/trent_2.jpg";
import imgDR2          from "@/assets/dr_photo_2.jpg";

// ── Brand tokens ──────────────────────────────────────────────────────────────
const ACCENT_NAVY = "#0D1B3E";
const B_YELLOW    = "#F5A623";

// ── Era colour palette (cycling: lime, yellow, teal, blue, forest) ────────────
const C_FOREST = "#2A7A4F";
const C_AMBER  = "#C8940A";
const C_TEAL   = "#0D7A8A";
const C_BLUE   = "#1E6BB8";
const C_LIME   = "#4A7C2F";

// ── Timeline data ─────────────────────────────────────────────────────────────
// KNOWLEDGE_v18: do not use 2007/2009/2010 as founding year. Origin = 2014.
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
        body: "Launched with Tata Volunteering Week and ProEngage on the 175th birth anniversary of Jamsetji Tata. A target of one million volunteering hours is set for the Group.",
        stat: "1M hrs",
        statSub: "first target set",
        photo: imgTrent,
      },
      {
        key: "fy2016",
        year: "FY 2016",
        tag: "First Response",
        title: "Tamil Nadu Floods — DR deploys",
        body: "Tata Engage crosses 1.02 million hours. 100+ volunteers deploy for the Tamil Nadu floods. The One Tata Response framework is formally adopted by the Tata Group Sustainability Council.",
        stat: "1.02M",
        statSub: "hours logged",
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
        body: "Tata Group volunteering guidelines published — helping 100+ companies develop consistent, structured programmes across geographies for the first time.",
        stat: "100+",
        statSub: "companies guided",
        photo: imgElxsi,
      },
      {
        key: "fy2018",
        year: "FY 2018",
        tag: "Community",
        title: "The first Tata VolCon",
        body: "The inaugural Tata Volunteering Conference brings together experts Group-wide. Regional SPOC forums are created for cross-company knowledge sharing and capacity building.",
        stat: "VolCon",
        statSub: "inaugural edition",
        photo: imgBball,
      },
      {
        key: "fy2019",
        year: "FY 2019",
        tag: "Global Award",
        title: "IAVE Best Global Programme",
        body: "Tata Engage wins Best Global Volunteer Program by the International Association for Volunteer Effort. The Group simultaneously crosses 1.5 million cumulative volunteering hours.",
        stat: "1.5M+",
        statSub: "hours + IAVE award",
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
        title: "4 PCVH by 2025 — the target is set",
        body: "The Tata Group Sustainability Council formally adopts a 4 Per Capita Volunteering Hours target by 2025. Tata Engage joins IAVE's Global Corporate Volunteer Council.",
        stat: "4 PCVH",
        statSub: "group target by 2025",
        photo: imgMotors,
      },
      {
        key: "fy2021",
        year: "FY 2021",
        tag: "Pivot",
        title: "Virtual — and still one million",
        body: "COVID-19 forces a complete pivot to virtual volunteering. Despite the pandemic, Tata volunteers clock over one million hours entirely online — proving volunteering transcends geography.",
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
        title: "1.34M hours — back with momentum",
        body: "Volunteering returns in phygital form. 1.34 million hours and 1.5 PCVH recorded. ProEngage is scaled significantly; an e-orientation module for the SPOC cadre is launched.",
        stat: "1.34M",
        statSub: "hours · 1.5 PCVH",
        photo: imgAirIndia,
      },
      {
        key: "fy2023",
        year: "FY 2023",
        tag: "Record",
        title: "3.67 million hours",
        body: "A Group-level record: 3.67 million hours at 3.77 PCVH. 17 companies cross 4 PCVH individually. 8 companies achieve the 2025 target two full years ahead of schedule.",
        stat: "3.67M",
        statSub: "hours · 3.77 PCVH",
        photo: imgAIG,
      },
    ],
  },
  {
    id: "era-today",
    label: "Today",
    years: "FY 2024 – Now",
    colour: C_LIME,
    milestones: [
      {
        key: "fy2024",
        year: "FY 2024",
        tag: "Target met",
        title: "8.02M hours — a year early",
        body: "4 PCVH achieved one year ahead of target. ProEngage completes a decade: 4,392 projects, 8,735+ volunteers, 1,222 NGOs helped. The Group's strongest year of volunteering ever.",
        stat: "8.02M",
        statSub: "hours · 4 PCVH",
        photo: imgTrent2,
      },
      {
        key: "fy2526",
        year: "2025–26",
        tag: "Now",
        title: "The platform evolves",
        body: "Tata Engage relaunches with AI-powered matching, a rebuilt volunteer experience, real-time SPOC dashboards, and an integrated Disaster Response cadre — built for the next decade.",
        stat: "Next",
        statSub: "chapter starts now",
        photo: imgDR2,
      },
    ],
  },
] as const;

type Era = typeof ERAS[number];
type Milestone = Era["milestones"][number];

// ── Milestone card (coloured header block, white body) ────────────────────────
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
      { threshold: 0.12 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{
        background: "#fff",
        border: "1px solid #e8e8f0",
        borderRadius: 20,
        overflow: "hidden",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(28px)",
        transition: "opacity 0.55s ease, transform 0.55s ease, box-shadow 0.25s ease",
        transitionDelay: `${(index % 2) * 0.1}s`,
        cursor: "default",
        display: "flex",
        flexDirection: "column",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-5px)";
        e.currentTarget.style.boxShadow = `0 20px 48px ${colour}22, 0 4px 16px rgba(0,0,0,0.07)`;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "none";
      }}
    >
      {/* ── Coloured top section ── */}
      <div
        style={{
          background: colour,
          position: "relative",
          overflow: "hidden",
          flexShrink: 0,
        }}
      >
        {/* Photo with overlay */}
        <div style={{ height: 200, position: "relative", overflow: "hidden" }}>
          <img
            src={m.photo}
            alt={m.title}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              display: "block",
              transition: "transform 0.6s ease",
            }}
            onMouseEnter={(e) => { (e.target as HTMLImageElement).style.transform = "scale(1.05)"; }}
            onMouseLeave={(e) => { (e.target as HTMLImageElement).style.transform = "scale(1)"; }}
          />
          {/* Dark scrim so badges are always readable */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: `linear-gradient(to bottom, rgba(0,0,0,0.28) 0%, rgba(0,0,0,0.05) 50%, ${colour}cc 100%)`,
            }}
          />
          {/* Badges */}
          <div
            style={{
              position: "absolute",
              top: 14,
              left: 14,
              right: 14,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
            }}
          >
            <span
              style={{
                fontFamily: "'DM Mono', monospace",
                fontSize: 9,
                fontWeight: 700,
                letterSpacing: "1px",
                textTransform: "uppercase",
                padding: "5px 12px",
                borderRadius: 100,
                background: "rgba(255,255,255,0.22)",
                backdropFilter: "blur(8px)",
                border: "1px solid rgba(255,255,255,0.35)",
                color: "#fff",
              }}
            >
              {m.year}
            </span>
            <span
              style={{
                fontFamily: "'DM Mono', monospace",
                fontSize: 9,
                fontWeight: 700,
                letterSpacing: "1.5px",
                textTransform: "uppercase",
                padding: "5px 12px",
                borderRadius: 100,
                background: "rgba(255,255,255,0.95)",
                color: colour,
              }}
            >
              {m.tag}
            </span>
          </div>
        </div>

        {/* Stat row — sits in colour band below photo */}
        <div
          style={{
            padding: "14px 20px 16px",
            display: "flex",
            alignItems: "baseline",
            gap: 8,
          }}
        >
          <span
            style={{
              fontSize: 26,
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
              fontSize: 10,
              color: "rgba(255,255,255,0.65)",
            }}
          >
            {m.statSub}
          </span>
        </div>
      </div>

      {/* ── White body ── */}
      <div style={{ padding: "20px 22px 24px", flex: 1 }}>
        <h3
          style={{
            fontSize: 17,
            fontWeight: 900,
            color: ACCENT_NAVY,
            letterSpacing: "-0.3px",
            lineHeight: 1.25,
            marginBottom: 10,
          }}
        >
          {m.title}
        </h3>
        <p
          style={{
            fontSize: 13,
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

// ── Era section ────────────────────────────────────────────────────────────────
function EraSection({ era, globalStart }: { era: Era; globalStart: number }) {
  return (
    <section
      id={era.id}
      style={{ paddingBottom: 64, scrollMarginTop: 64 }}
    >
      {/* Era label row */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 14,
          padding: "32px 0 28px",
          borderBottom: `2px solid ${era.colour}`,
          marginBottom: 32,
        }}
      >
        {/* Coloured lozenge */}
        <div
          style={{
            background: era.colour,
            color: "#fff",
            fontFamily: "'DM Mono', monospace",
            fontSize: 10,
            fontWeight: 700,
            letterSpacing: "1.5px",
            textTransform: "uppercase",
            padding: "6px 14px",
            borderRadius: 100,
            flexShrink: 0,
          }}
        >
          {era.label}
        </div>
        <span
          style={{
            fontFamily: "'DM Mono', monospace",
            fontSize: 11,
            color: "#94a3b8",
            letterSpacing: "0.3px",
          }}
        >
          {era.years}
        </span>
      </div>

      {/* Cards grid — 2 columns */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gap: 24,
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

  // Track active era via IntersectionObserver
  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    ERAS.forEach(({ id }, idx) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveEraIdx(idx);
        },
        { threshold: 0.2, rootMargin: "-64px 0px -50% 0px" }
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  const activeEra = ERAS[activeEraIdx];

  const jumpTo = (idx: number) => {
    const el = document.getElementById(ERAS[idx].id);
    el?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  // Count milestones before each era for staggered animation index
  const globalStarts = ERAS.reduce<number[]>((acc, era, i) => {
    acc.push(i === 0 ? 0 : acc[i - 1] + ERAS[i - 1].milestones.length);
    return acc;
  }, []);

  return (
    <div
      style={{
        paddingTop: 80,
        paddingBottom: 80,
        background: "#f9f9fb",
        minHeight: "100vh",
        fontFamily: "'DM Sans', sans-serif",
      }}
    >
      {/* ── Top accent line (public subpage rule) ── */}
      <div
        style={{
          position: "fixed",
          top: 64,
          left: 0,
          right: 0,
          height: 3,
          zIndex: 90,
          background: `linear-gradient(to right, ${C_FOREST}, ${C_AMBER}, ${C_TEAL}, ${C_BLUE}, ${C_LIME})`,
          transition: "opacity 0.3s",
        }}
      />

      {/* ── Right-side dot rail ── */}
      <div
        style={{
          position: "fixed",
          right: 20,
          top: "50%",
          transform: "translateY(-50%)",
          zIndex: 40,
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-end",
          gap: 10,
        }}
      >
        {ERAS.map((era, i) => {
          const isActive = i === activeEraIdx;
          return (
            <button
              key={era.id}
              onClick={() => jumpTo(i)}
              title={era.label}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                background: "none",
                border: "none",
                cursor: "pointer",
                padding: 0,
              }}
            >
              {isActive && (
                <span
                  style={{
                    fontSize: 12,
                    fontWeight: 600,
                    color: "#334155",
                    background: "#fff",
                    border: "1px solid #e2e8f0",
                    padding: "4px 10px",
                    borderRadius: 100,
                    whiteSpace: "nowrap",
                    boxShadow: "0 1px 4px rgba(0,0,0,0.08)",
                  }}
                >
                  {era.label}
                </span>
              )}
              <div
                style={{
                  width: isActive ? 10 : 7,
                  height: isActive ? 10 : 7,
                  borderRadius: "50%",
                  background: isActive ? era.colour : "#CBD5E1",
                  transition: "all 0.3s",
                  flexShrink: 0,
                }}
              />
            </button>
          );
        })}
      </div>

      {/* ── Hero ── */}
      <div
        style={{
          maxWidth: 960,
          margin: "0 auto",
          padding: "48px 48px 0",
        }}
      >
        <p
          style={{
            fontFamily: "'DM Mono', monospace",
            fontSize: 10,
            fontWeight: 700,
            letterSpacing: "2.5px",
            textTransform: "uppercase",
            color: "#94a3b8",
            marginBottom: 16,
          }}
        >
          Tata Engage · 2014 – 2026
        </p>
        <h1
          style={{
            fontSize: "clamp(36px, 5vw, 64px)",
            fontWeight: 900,
            letterSpacing: "-2px",
            lineHeight: 1.02,
            color: ACCENT_NAVY,
            marginBottom: 20,
          }}
        >
          A decade of{" "}
          <em
            style={{
              fontStyle: "italic",
              fontFamily: "'Playfair Display', serif",
              fontWeight: 700,
            }}
          >
            purposeful
          </em>{" "}
          action
        </h1>
        <p
          style={{
            fontSize: 16,
            fontWeight: 300,
            lineHeight: 1.7,
            color: "#475569",
            maxWidth: 500,
            marginBottom: 40,
          }}
        >
          From one million hours to eight million. From a single week to a
          year-round platform. The story of how the Tata Group built one of the
          world's largest corporate volunteering programmes.
        </p>

        {/* Stats row */}
        <div
          style={{
            display: "flex",
            gap: 40,
            paddingBottom: 48,
            borderBottom: "1px solid #e8e8f0",
            marginBottom: 8,
          }}
        >
          {[
            { num: "8.02M", lbl: "Hours in FY24" },
            { num: "4,392", lbl: "ProEngage projects" },
            { num: "1,222", lbl: "NGOs supported" },
            { num: "11 yrs", lbl: "Of impact" },
          ].map(({ num, lbl }) => (
            <div key={lbl}>
              <div
                style={{
                  fontSize: 28,
                  fontWeight: 900,
                  letterSpacing: "-0.8px",
                  color: ACCENT_NAVY,
                }}
              >
                {num}
              </div>
              <div style={{ fontSize: 12, color: "#94a3b8", marginTop: 2 }}>
                {lbl}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Era sections ── */}
      <div style={{ maxWidth: 960, margin: "0 auto", padding: "0 48px" }}>
        {ERAS.map((era, eraIdx) => (
          <EraSection
            key={era.id}
            era={era}
            globalStart={globalStarts[eraIdx]}
          />
        ))}
      </div>

      {/* ── CTA strip ── */}
      <div
        style={{
          background: `linear-gradient(135deg, ${ACCENT_NAVY} 0%, #1a2a5e 100%)`,
          padding: "64px 40px",
          textAlign: "center",
          position: "relative",
          overflow: "hidden",
          marginTop: 32,
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "repeating-linear-gradient(45deg, rgba(255,255,255,0.02) 1px, transparent 1px)",
            backgroundSize: "24px 24px",
          }}
        />
        <div style={{ position: "relative", zIndex: 1 }}>
          <p
            style={{
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: "2px",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.4)",
              margin: "0 0 12px",
            }}
          >
            The next chapter
          </p>
          <h2
            style={{
              fontSize: 32,
              fontWeight: 900,
              color: "#fff",
              margin: "0 0 14px",
              letterSpacing: "-0.5px",
            }}
          >
            Be part of what comes next
          </h2>
          <p
            style={{
              fontSize: 16,
              color: "rgba(255,255,255,0.65)",
              maxWidth: 480,
              margin: "0 auto 32px",
              lineHeight: 1.7,
            }}
          >
            Join the Tata family's longest-running commitment to community.
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
                fontWeight: 700,
                fontSize: 15,
                cursor: "pointer",
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
              }}
            >
              Register as Volunteer <ArrowRight size={15} />
            </button>
            <button
              onClick={() => navigate("about")}
              style={{
                background: "rgba(255,255,255,0.1)",
                color: "#fff",
                border: "1px solid rgba(255,255,255,0.2)",
                borderRadius: 10,
                padding: "13px 28px",
                fontWeight: 700,
                fontSize: 15,
                cursor: "pointer",
              }}
            >
              About TataEngage
            </button>
          </div>
        </div>
      </div>

      <Footer />

      {/* ── Bottom era nav ── */}
      <div
        style={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          height: 56,
          background: "rgba(255,255,255,0.95)",
          backdropFilter: "blur(12px)",
          borderTop: "1px solid #e8e8f0",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 6,
        }}
      >
        {/* Prev arrow */}
        <button
          onClick={() => jumpTo(Math.max(0, activeEraIdx - 1))}
          disabled={activeEraIdx === 0}
          style={{
            width: 34,
            height: 34,
            borderRadius: "50%",
            border: "1.5px solid #e2e8f0",
            background: "#fff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: activeEraIdx === 0 ? "default" : "pointer",
            opacity: activeEraIdx === 0 ? 0.35 : 1,
            marginRight: 4,
            color: "#475569",
            transition: "opacity 0.2s",
          }}
        >
          <ChevronLeft size={14} />
        </button>

        {/* Era pills */}
        {ERAS.map((era, i) => {
          const isActive = i === activeEraIdx;
          return (
            <button
              key={era.id}
              onClick={() => jumpTo(i)}
              style={{
                fontFamily: "'DM Mono', monospace",
                fontSize: 10,
                fontWeight: 700,
                letterSpacing: "1px",
                textTransform: "uppercase",
                padding: "7px 16px",
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

        {/* Next arrow */}
        <button
          onClick={() => jumpTo(Math.min(ERAS.length - 1, activeEraIdx + 1))}
          disabled={activeEraIdx === ERAS.length - 1}
          style={{
            width: 34,
            height: 34,
            borderRadius: "50%",
            border: "1.5px solid #e2e8f0",
            background: "#fff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: activeEraIdx === ERAS.length - 1 ? "default" : "pointer",
            opacity: activeEraIdx === ERAS.length - 1 ? 0.35 : 1,
            marginLeft: 4,
            color: "#475569",
            transition: "opacity 0.2s",
          }}
        >
          <ChevronRight size={14} />
        </button>
      </div>
    </div>
  );
}
