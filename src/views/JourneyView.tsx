import { useState, useEffect } from "react";
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
const B_TICKER    = "#3E7EB0"; // Chatbot blue — replaces navy banners site-wide
const B_YELLOW    = "#F5A623";

// ── Cycling colour palette per milestone ──────────────────────────────────────
const PALETTE = [
  "#2A7A4F", // forest
  "#C8940A", // amber
  "#0D7A8A", // teal
  "#1E6BB8", // blue
  "#7A2E8F", // plum
  "#B0411F", // rust
  "#1F6F4A", // emerald
  "#8A5A1F", // bronze
  "#264C8A", // indigo
  "#9C2B5C", // berry
  "#3F7A2E", // moss
];

// ── Timeline data — flat milestone list (one per FY) ─────────────────────────
const MILESTONES = [
  {
    key: "fy2015",
    year: "FY 2015",
    tag: "Launch",
    title: "Tata Engage is born",
    body: "Launched with two volunteering formats — Tata Volunteering Week and ProEngage. A goal of one million volunteering hours is set for the Group.",
    stat: "1M",
    statSub: "hours · goal set",
    photo: imgTrent,
  },
  {
    key: "fy2016",
    year: "FY 2016",
    tag: "Disaster Response",
    title: "1.02M hours & Tamil Nadu floods",
    body: "Crossed 1.02 million volunteering hours. 100+ volunteers deploy for the Tamil Nadu floods. The One Tata Response framework is adopted as part of disaster response guidelines.",
    stat: "1.02M",
    statSub: "hours clocked",
    photo: imgDR1,
  },
  {
    key: "fy2017",
    year: "FY 2017",
    tag: "Policy",
    title: "Group volunteering guidelines",
    body: "Tata Group volunteering guidelines launched to help companies review existing programmes — or develop new ones — and shape consistent policy across the Group.",
    stat: "1",
    statSub: "Group-wide playbook",
    photo: imgElxsi,
  },
  {
    key: "fy2018",
    year: "FY 2018",
    tag: "Community",
    title: "Regional SPOC forums & first VolCon",
    body: "Regional SPOC forums created for knowledge building and best-practice sharing. The inaugural Tata Volunteering Conference (VolCon) brings Group-wide volunteering experts onto one platform.",
    stat: "VolCon",
    statSub: "inaugural edition",
    photo: imgBball,
  },
  {
    key: "fy2019",
    year: "FY 2019",
    tag: "Global Award",
    title: "IAVE Best Global Volunteer Program",
    body: "Tata Engage wins the International Association for Volunteer Effort's \"Best Global Volunteer Program\" award — the International Association for Volunteer Effort's highest recognition for corporate volunteering.",
    stat: "IAVE",
    statSub: "global #1",
    photo: imgIHCL,
  },
  {
    key: "fy2020",
    year: "FY 2020",
    tag: "Ambition",
    title: "1.5M hours & the 4 PCVH target",
    body: "Crossed 1.5 million hours. The Tata Group Sustainability Council adopts a 4 Per Capita Volunteering Hours target by 2025. Tata Engage joins IAVE's Global Corporate Volunteer Council.",
    stat: "4 PCVH",
    statSub: "by 2025 · target set",
    photo: imgMotors,
  },
  {
    key: "fy2021",
    year: "FY 2021",
    tag: "Pivot",
    title: "Virtual — and still one million",
    body: "COVID-19 forces a full pivot to virtual volunteering. Despite the pandemic, Tata volunteers clock over a million hours entirely online and the Group volunteering strategy is shared with senior leaders across companies.",
    stat: "1M+",
    statSub: "hours · all virtual",
    photo: imgComms,
  },
  {
    key: "fy2022",
    year: "FY 2022",
    tag: "Phygital",
    title: "1.34M hours — post-pandemic upswing",
    body: "Volunteering returns in phygital form with 1.34 million hours (1.5 PCVH). ProEngage scales for deeper skill-based impact and an e-orientation module is launched for the SPOC cadre.",
    stat: "1.34M",
    statSub: "hours · 1.5 PCVH",
    photo: imgAirIndia,
  },
  {
    key: "fy2023",
    year: "FY 2023",
    tag: "Record",
    title: "3.67M hours — 17 companies cross 4 PCVH",
    body: "3.67 million hours at 3.77 PCVH. 17 companies embed scale and cross 4 PCVH. 6 companies roll out enterprise-level volunteering policies. Tata Engage presents at the Global Conference on Volunteering, Abu Dhabi.",
    stat: "3.67M",
    statSub: "hours · 3.77 PCVH",
    photo: imgAIG,
  },
  {
    key: "fy2024",
    year: "FY 2024",
    tag: "Target met",
    title: "8.02M hours — 4 PCVH, a year early",
    body: "4 PCVH achieved one year ahead of target. 24 companies cross 4 PCVH and 35 record significant PCVH gains. Tata group joins the Board of IAVE. VolCon hosted at Taj Mahal Palace, Mumbai for 170 leaders.",
    stat: "8.02M",
    statSub: "hours · PCVH 7.97",
    photo: imgTrent2,
  },
  {
    key: "fy2025",
    year: "FY 2025",
    tag: "Global leader",
    title: "10.87M hours — highest ever",
    body: "10.87 million hours at 10.67 PCVH — the highest in Tata Engage's history. 27 companies cross 4 PCVH. Tata group emerges as a possible global leader: Rank 1 in total hours, Rank 2 in per-capita contribution.",
    stat: "10.87M",
    statSub: "hours · PCVH 10.67",
    photo: imgInfiniti,
  },
] as const;

type Milestone = typeof MILESTONES[number];

// ── Helpers ───────────────────────────────────────────────────────────────────
function tint(hex: string, amount: number) {
  // Returns hex blended toward white by `amount` (0-1).
  const h = hex.replace("#", "");
  const r = parseInt(h.slice(0, 2), 16);
  const g = parseInt(h.slice(2, 4), 16);
  const b = parseInt(h.slice(4, 6), 16);
  const m = (c: number) => Math.round(c + (255 - c) * amount);
  return `rgb(${m(r)}, ${m(g)}, ${m(b)})`;
}

// ── Milestone row — text panel one side, photo panel the other ───────────────
function MilestoneRow({
  m,
  index,
  colour,
}: {
  m: Milestone;
  index: number;
  colour: string;
}) {
  const textOnLeft = index % 2 === 0;
  const surface = colour; // full-bleed colour (no tinting)

  const TextPanel = (
    <div
      style={{
        background: surface,
        padding: "44px 44px 40px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        position: "relative",
        borderTop: `4px solid rgba(255,255,255,0.35)`,
      }}
    >
      {/* Year + tag */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 12,
          marginBottom: 18,
          flexWrap: "wrap",
        }}
      >
        <span
          style={{
            background: "rgba(255,255,255,0.18)",
            color: "#fff",
            fontWeight: 800,
            fontSize: 13,
            letterSpacing: "-0.2px",
            padding: "5px 12px",
            borderRadius: 6,
            border: "1px solid rgba(255,255,255,0.25)",
          }}
        >
          {m.year}
        </span>
        <span
          style={{
            background: "rgba(255,255,255,0.14)",
            color: "rgba(255,255,255,0.92)",
            fontFamily: "'DM Mono', monospace",
            fontSize: 10,
            fontWeight: 700,
            letterSpacing: "1.2px",
            textTransform: "uppercase",
            padding: "4px 10px",
            borderRadius: 100,
          }}
        >
          {m.tag}
        </span>
      </div>

      <h3
        style={{
          fontSize: 24,
          fontWeight: 900,
          color: "#fff",
          letterSpacing: "-0.4px",
          lineHeight: 1.2,
          margin: "0 0 14px",
        }}
      >
        {m.title}
      </h3>

      <p
        style={{
          fontSize: 14.5,
          color: "rgba(255,255,255,0.88)",
          lineHeight: 1.72,
          margin: 0,
          maxWidth: 460,
        }}
      >
        {m.body}
      </p>

      {/* Stat block */}
      <div
        style={{
          marginTop: 24,
          display: "inline-flex",
          alignItems: "baseline",
          gap: 10,
          paddingTop: 16,
          borderTop: `1px dashed rgba(255,255,255,0.4)`,
        }}
      >
        <span
          style={{
            fontSize: 26,
            fontWeight: 900,
            color: "#fff",
            letterSpacing: "-0.6px",
          }}
        >
          {m.stat}
        </span>
        <span
          style={{
            fontFamily: "'DM Mono', monospace",
            fontSize: 11,
            color: "rgba(255,255,255,0.72)",
            letterSpacing: "0.4px",
          }}
        >
          {m.statSub}
        </span>
      </div>
    </div>
  );

  const PhotoPanel = (
    <div
      style={{
        position: "relative",
        overflow: "hidden",
        background: colour,
        minHeight: 320,
      }}
    >
      <img
        src={m.photo}
        alt={m.title}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          display: "block",
          position: "absolute",
          inset: 0,
        }}
      />
      {/* Colour overlay tying the image to the row's hue */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `linear-gradient(${textOnLeft ? "to left" : "to right"},
            ${colour}88 0%,
            ${colour}22 55%,
            transparent 100%)`,
        }}
      />
      {/* Caption ribbon */}
      <div
        style={{
          position: "absolute",
          bottom: 18,
          left: 20,
          right: 20,
          display: "flex",
          alignItems: "center",
          gap: 10,
        }}
      >
        <span
          style={{
            background: "rgba(13,27,62,0.78)",
            backdropFilter: "blur(6px)",
            color: "#fff",
            fontFamily: "'DM Mono', monospace",
            fontSize: 10,
            fontWeight: 700,
            letterSpacing: "1.6px",
            textTransform: "uppercase",
            padding: "6px 12px",
            borderRadius: 4,
          }}
        >
          {m.year}
        </span>
      </div>
    </div>
  );

  return (
    <section
      id={m.key}
      data-milestone-row
      style={{
        position: "relative",
        scrollMarginTop: 80,
      }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          borderRadius: 22,
          overflow: "hidden",
          boxShadow: "0 18px 44px rgba(13,27,62,0.10), 0 2px 6px rgba(13,27,62,0.04)",
        }}
      >
        {textOnLeft ? (
          <>
            {TextPanel}
            {PhotoPanel}
          </>
        ) : (
          <>
            {PhotoPanel}
            {TextPanel}
          </>
        )}
      </div>
    </section>
  );
}

// ── Dotted connector that sits between two rows ──────────────────────────────
function DottedConnector({ colourFrom, colourTo }: { colourFrom: string; colourTo: string }) {
  return (
    <div
      aria-hidden
      style={{
        position: "relative",
        height: 72,
        margin: "0 auto",
        width: "100%",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          width: 2,
          height: "100%",
          backgroundImage: `repeating-linear-gradient(
            to bottom,
            ${colourFrom}cc 0px,
            ${colourFrom}cc 4px,
            transparent 4px,
            transparent 10px
          )`,
        }}
      />
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 12,
          height: 12,
          borderRadius: "50%",
          background: `linear-gradient(135deg, ${colourFrom}, ${colourTo})`,
          boxShadow: "0 0 0 4px #f4f5f8",
        }}
      />
    </div>
  );
}

// ── Main component ────────────────────────────────────────────────────────────
export default function JourneyView() {
  const navigate = useAppNavigate();
  const [activeIdx, setActiveIdx] = useState(0);

  // Track which milestone is currently in view
  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    MILESTONES.forEach((m, idx) => {
      const el = document.getElementById(m.key);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveIdx(idx);
        },
        { threshold: 0.4, rootMargin: "-80px 0px -40% 0px" }
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  const jumpTo = (idx: number) => {
    const clamped = Math.max(0, Math.min(MILESTONES.length - 1, idx));
    const el = document.getElementById(MILESTONES[clamped].key);
    el?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div
      style={{
        paddingTop: 64,
        paddingBottom: 72,
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
          background: `linear-gradient(to right, ${PALETTE[0]}, ${PALETTE[2]}, ${PALETTE[4]}, ${PALETTE[6]}, ${PALETTE[8]})`,
        }}
      />

      {/* ══════════════════════════════════════════
          HERO — full-bleed dark photo banner
      ══════════════════════════════════════════ */}
      <div
        style={{
          position: "relative",
          height: "82vh",
          minHeight: 520,
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
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "repeating-linear-gradient(135deg, rgba(255,255,255,0.018) 0px, rgba(255,255,255,0.018) 1px, transparent 1px, transparent 28px)",
            pointerEvents: "none",
          }}
        />

        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-end",
            padding: "0 72px 64px",
            maxWidth: 880,
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
          <div
            style={{
              width: 48,
              height: 3,
              borderRadius: 2,
              background: B_YELLOW,
              marginBottom: 22,
            }}
          />
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
              marginBottom: 0,
            }}
          >
            From one million hours to ten. Eleven years of the Tata Group's
            commitment to purposeful volunteering — and counting.
          </p>
        </div>

        {/* Bouncing chevrons — bottom right */}
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
          TIMELINE — flat alternating rows
      ══════════════════════════════════════════ */}
      <div
        style={{
          maxWidth: 1080,
          margin: "0 auto",
          padding: "72px 32px 24px",
        }}
      >
        {MILESTONES.map((m, i) => {
          const colour = PALETTE[i % PALETTE.length];
          const nextColour = PALETTE[(i + 1) % PALETTE.length];
          const isLast = i === MILESTONES.length - 1;
          return (
            <div key={m.key}>
              <MilestoneRow m={m} index={i} colour={colour} />
              {!isLast && (
                <DottedConnector colourFrom={colour} colourTo={nextColour} />
              )}
            </div>
          );
        })}
      </div>

      {/* ══════════════════════════════════════════
          NAVY BOTTOM STRIP — closing call-to-action
      ══════════════════════════════════════════ */}
      <div
        style={{
          background: B_TICKER,
          padding: "72px 48px",
          marginTop: 64,
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "repeating-linear-gradient(135deg, rgba(255,255,255,0.022) 0px, rgba(255,255,255,0.022) 1px, transparent 1px, transparent 28px)",
            pointerEvents: "none",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: "-60px",
            right: "-60px",
            width: 360,
            height: 360,
            borderRadius: "50%",
            background: `radial-gradient(circle, ${PALETTE[2]}20 0%, transparent 70%)`,
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
              About Tata Engage
            </button>
          </div>
        </div>
      </div>

      {/* Suppress unused-var warning for legacy asset import we keep around */}
      <span style={{ display: "none" }} aria-hidden>
        <img src={imgDR2} alt="" />
      </span>

      {/* ══════════════════════════════════════════
          BOTTOM CHEVRON NAV — milestone-by-milestone
      ══════════════════════════════════════════ */}
      <nav
        style={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          height: 56,
          background: "rgba(255,255,255,0.96)",
          backdropFilter: "blur(12px)",
          borderTop: "1px solid #e4e7ef",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 14,
          padding: "0 16px",
        }}
      >
        <button
          onClick={() => jumpTo(activeIdx - 1)}
          disabled={activeIdx === 0}
          aria-label="Previous milestone"
          style={{
            width: 36,
            height: 36,
            borderRadius: "50%",
            border: "1.5px solid #e2e8f0",
            background: "#fff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: activeIdx === 0 ? "default" : "pointer",
            opacity: activeIdx === 0 ? 0.3 : 1,
            color: ACCENT_NAVY,
            transition: "opacity 0.2s",
          }}
        >
          <ChevronLeft size={16} />
        </button>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            minWidth: 110,
          }}
        >
          <span
            style={{
              fontFamily: "'DM Mono', monospace",
              fontSize: 10,
              fontWeight: 700,
              letterSpacing: "1.4px",
              textTransform: "uppercase",
              color: "#94a3b8",
            }}
          >
            Milestone {activeIdx + 1} / {MILESTONES.length}
          </span>
          <span
            style={{
              fontSize: 13,
              fontWeight: 800,
              color: PALETTE[activeIdx % PALETTE.length],
              letterSpacing: "-0.2px",
              marginTop: 2,
            }}
          >
            {MILESTONES[activeIdx].year}
          </span>
        </div>

        <button
          onClick={() => jumpTo(activeIdx + 1)}
          disabled={activeIdx === MILESTONES.length - 1}
          aria-label="Next milestone"
          style={{
            width: 36,
            height: 36,
            borderRadius: "50%",
            border: "1.5px solid #e2e8f0",
            background: "#fff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: activeIdx === MILESTONES.length - 1 ? "default" : "pointer",
            opacity: activeIdx === MILESTONES.length - 1 ? 0.3 : 1,
            color: ACCENT_NAVY,
            transition: "opacity 0.2s",
          }}
        >
          <ChevronRight size={16} />
        </button>
      </nav>
    </div>
  );
}
