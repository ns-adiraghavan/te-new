import { ArrowRight } from "lucide-react";
import { useAppNavigate } from "@/hooks/useAppNavigate";
import SubPageDotRail from "@/components/shared/SubPageDotRail";

// ── Asset imports ─────────────────────────────────────────────────────────────
import imgTrent        from "@/assets/trent.jpg";
import imgBball        from "@/assets/tatabball.jpg";
import img2016         from "@/assets/homepagebanner/2016.png";
import img2015         from "@/assets/homepagebanner/2015.png";
import img2017         from "@/assets/homepagebanner/2017.png";
import imgIHCL         from "@/assets/IHCL.jpg";
import imgMotors       from "@/assets/Tata_Motors_1.jpg";
import imgComms        from "@/assets/tata-communications-1.jpg";
import imgAirIndia     from "@/assets/air-india.jpg";
import imgAIG          from "@/assets/tata-aig-1.jpg";
import imgTrent2       from "@/assets/trent_2.jpg";
import img2025         from "@/assets/homepagebanner/2025.png";
import imgDR2          from "@/assets/dr_photo_2.jpg";
import journeyHeroImg  from "@/assets/homepagebanner/IHCL 1.jpg";

// ── Brand tokens ──────────────────────────────────────────────────────────────
const ACCENT_NAVY = "#0D1B3E";
const B_TICKER    = "#3B7ABD";
const B_YELLOW    = "#F79425";

const FONT = "'DM Sans', 'Noto Sans', ui-sans-serif, system-ui, sans-serif";

// ── 5 colours from HomeSections JourneySection — cycling across milestones ───
const PALETTE = [
  "#135EA9", // deep blue
  "#F4838A", // salmon pink
  "#00A896", // teal
  "#307FE2", // mid blue
  "#803998", // purple
];

// ── Timeline data — exact approved copy ──────────────────────────────────────
const MILESTONES = [
  {
    key: "fy2015",
    year: "FY 2015",
    tag: "Launch",
    title: "Launched Tata Engage",
    body: "Launched with two volunteering formats — Tata Volunteering Week and ProEngage. Set a goal to achieve a million volunteering hours as a group.",
    stat: "1M",
    statSub: "hours · goal set",
    photo: img2015,
  },
  {
    key: "fy2016",
    year: "FY 2016",
    tag: "Disaster Response",
    title: "1.02M hours & Tamil Nadu Floods",
    body: "Clocked 1.02 million volunteering hours, including supporting the disaster response during Tamil Nadu Floods with 100+ volunteers. Adopted the One Tata Response as part of disaster response guidelines.",
    stat: "1.02M",
    statSub: "hours clocked",
    photo: img2016,
  },
  {
    key: "fy2017",
    year: "FY 2017",
    tag: "Policy",
    title: "Group volunteering guidelines",
    body: "Launched Tata Group volunteering guidelines to help companies review existing programmes — or develop new ones — and shape consistent policy across the Group.",
    stat: "1",
    statSub: "Group-wide playbook",
    photo: img2017,
  },
  {
    key: "fy2018",
    year: "FY 2018",
    tag: "Community",
    title: "Regional SPOC forums & first VolCon",
    body: "Created Regional SPOC forums for knowledge building, cross-sharing of best practices and capacity building of the volunteer SPOC cadre. Hosted the first Tata VolCon (Tata Volunteering Conference) to bring together Tata experts on one platform.",
    stat: "VolCon",
    statSub: "inaugural edition",
    photo: imgBball,
  },
  {
    key: "fy2019",
    year: "FY 2019",
    tag: "Global Award",
    title: "Best Global Volunteer Program — IAVE",
    body: "Tata Engage won the \"Best Global Volunteer Program\" award by the International Association for Volunteer Effort (IAVE).",
    stat: "IAVE",
    statSub: "global #1",
    photo: imgIHCL,
  },
  {
    key: "fy2020",
    year: "FY 2020",
    tag: "Ambition",
    title: "1.5M hours & the 4 PCVH target",
    body: "Crossed 1.5 million volunteering hours. Became a member of IAVE's Global Corporate Volunteer Council. Tata Group Sustainability Council adopted the group aspiration of 4 Per Capita Volunteering Hours (PCVH) by 2025. Created the Tata Group volunteering strategy for 2025.",
    stat: "4 PCVH",
    statSub: "by 2025 · target set",
    photo: imgMotors,
  },
  {
    key: "fy2021",
    year: "FY 2021",
    tag: "Pivot",
    title: "Virtual — and still one million",
    body: "Pivoted to a virtual mode for volunteering in response to the Covid-19 pandemic. Clocked over a million hours despite the challenges. Disseminated the group volunteering strategy to senior leaders across Tata companies. Developed an e-orientation module for ProEngagers.",
    stat: "1M+",
    statSub: "hours · all virtual",
    photo: imgComms,
  },
  {
    key: "fy2022",
    year: "FY 2022",
    tag: "Phygital",
    title: "1.34M hours — post-pandemic upswing",
    body: "Clocked 1.34 million hours (1.5 PCVH), signifying an upswing in enthusiasm for volunteering post-pandemic. Pivoted to a phygital mode. Developed an e-orientation module for capacity building of the SPOC cadre. Scaled up ProEngage for deeper skill-based impact.",
    stat: "1.34M",
    statSub: "hours · 1.5 PCVH",
    photo: imgAirIndia,
  },
  {
    key: "fy2023",
    year: "FY 2023",
    tag: "Record",
    title: "3.67M hours — 17 companies cross 4 PCVH",
    body: "Clocked 3.67 million hours at 3.77 PCVH. 17 companies crossed 4 PCVH. 6 companies rolled out enterprise-level volunteering policies. TSG hosted 7 regional SPOC meets. Tata Engage Awards expanded to reward year-round performance. Presented the Tata group volunteering approach at the Global Conference on Volunteering, Abu Dhabi.",
    stat: "3.67M",
    statSub: "hours · 3.77 PCVH",
    photo: imgAIG,
  },
  {
    key: "fy2024",
    year: "FY 2024",
    tag: "Target met",
    title: "8.02M hours — 4 PCVH, a year early",
    body: "Clocked 8.02 million hours at 7.97 PCVH — surpassing the TGSC aspiration of 4 PCVH by 2025, one year ahead of target. 24 companies crossed 4 PCVH and 35 reported significant increases. Hosted VolCon at Taj Mahal Palace, Mumbai for 170 Tata leaders. Tata group joined the Board of Directors of IAVE.",
    stat: "8.02M",
    statSub: "hours · PCVH 7.97",
    photo: imgTrent2,
  },
  {
    key: "fy2025",
    year: "FY 2025",
    tag: "Global leader",
    title: "10.87M hours — highest ever",
    body: "Clocked 10.87 million volunteering hours (highest ever) at 10.67 PCVH. 27 group companies crossed 4 PCVH. 38 companies showed improvement in PCVH. Tata Steel and Tata Motors integrated volunteering into their assurance frameworks. TSG hosted 7 regional SPOC meets for 278 SPOCs from 41 companies. Tata group emerges as a possible global leader: Rank 1 in total hours, Rank 2 in per-capita contribution.",
    stat: "10.87M",
    statSub: "hours · PCVH 10.67",
    photo: img2025,
  },
] as const;

type Milestone = typeof MILESTONES[number];

// ── Milestone row ─────────────────────────────────────────────────────────────
function MilestoneRow({ m, index, colour }: { m: Milestone; index: number; colour: string }) {
  const textOnLeft = index % 2 === 0;

  const TextPanel = (
    <div style={{
      background: colour,
      padding: "44px 44px 40px",
      display: "flex", flexDirection: "column", justifyContent: "center",
      position: "relative",
      borderTop: "4px solid rgba(255,255,255,0.35)",
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 18, flexWrap: "wrap" }}>
        <span style={{ background: "rgba(255,255,255,0.18)", color: "#fff", fontFamily: FONT, fontWeight: 800, fontSize: 13, letterSpacing: "-0.2px", padding: "5px 12px", borderRadius: 6, border: "1px solid rgba(255,255,255,0.25)" }}>
          {m.year}
        </span>
      </div>
      <h3 style={{ fontFamily: FONT, fontSize: 24, fontWeight: 900, color: "#fff", letterSpacing: "-0.4px", lineHeight: 1.2, margin: "0 0 14px" }}>
        {m.title}
      </h3>
      <p style={{ fontFamily: FONT, fontSize: 14.5, color: "rgba(255,255,255,0.88)", lineHeight: 1.72, margin: 0, maxWidth: 460 }}>
        {m.body}
      </p>
      <div style={{ marginTop: 24, display: "inline-flex", alignItems: "baseline", gap: 10, paddingTop: 16, borderTop: "1px dashed rgba(255,255,255,0.4)" }}>
        <span style={{ fontFamily: FONT, fontSize: 26, fontWeight: 900, color: "#fff", letterSpacing: "-0.6px" }}>{m.stat}</span>
        <span style={{ fontFamily: FONT, fontSize: 11, color: "rgba(255,255,255,0.72)", letterSpacing: "0.4px" }}>{m.statSub}</span>
      </div>
    </div>
  );

  const PhotoPanel = (
    <div style={{ position: "relative", overflow: "hidden", background: colour, minHeight: 320 }}>
      <img src={m.photo} alt={m.title} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", position: "absolute", inset: 0 }} />
      <div style={{ position: "absolute", inset: 0, background: `linear-gradient(${textOnLeft ? "to left" : "to right"}, ${colour}88 0%, ${colour}22 55%, transparent 100%)` }} />
      <div style={{ position: "absolute", bottom: 18, left: 20, right: 20, display: "flex", alignItems: "center", gap: 10 }}>
        <span style={{ background: "rgba(13,27,62,0.78)", backdropFilter: "blur(6px)", color: "#fff", fontFamily: FONT, fontSize: 10, fontWeight: 700, letterSpacing: "1.6px", textTransform: "uppercase", padding: "6px 12px", borderRadius: 4 }}>
          {m.year}
        </span>
      </div>
    </div>
  );

  return (
    <section id={m.key} data-milestone-row style={{ position: "relative", scrollMarginTop: 80 }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", borderRadius: 22, overflow: "hidden", boxShadow: "0 18px 44px rgba(13,27,62,0.10), 0 2px 6px rgba(13,27,62,0.04)" }}>
        {textOnLeft ? <>{TextPanel}{PhotoPanel}</> : <>{PhotoPanel}{TextPanel}</>}
      </div>
    </section>
  );
}

// ── Dotted connector ──────────────────────────────────────────────────────────
function DottedConnector({ colourFrom, colourTo }: { colourFrom: string; colourTo: string }) {
  return (
    <div aria-hidden style={{ position: "relative", height: 72, margin: "0 auto", width: "100%", display: "flex", justifyContent: "center" }}>
      <div style={{ width: 2, height: "100%", backgroundImage: `repeating-linear-gradient(to bottom, ${colourFrom}cc 0px, ${colourFrom}cc 4px, transparent 4px, transparent 10px)` }} />
      <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: 12, height: 12, borderRadius: "50%", background: `linear-gradient(135deg, ${colourFrom}, ${colourTo})`, boxShadow: "0 0 0 4px #f4f5f8" }} />
    </div>
  );
}

const RAIL_SECTIONS = MILESTONES.map(m => ({ id: m.key, label: m.year }));

// ── Main ──────────────────────────────────────────────────────────────────────
export default function JourneyView() {
  const navigate = useAppNavigate();

  return (
    <div style={{ paddingTop: 64, paddingBottom: 72, background: "#f4f5f8", minHeight: "100vh", fontFamily: FONT }}>

      {/* ── Hero ── */}
      <div style={{ position: "relative", minHeight: "92vh", overflow: "hidden", background: ACCENT_NAVY }}>
        <img
          src={journeyHeroImg}
          alt="Tata volunteers"
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 30%", display: "block" }}
        />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(110deg, #0D1B3Ee8 0%, #0D1B3Ecc 38%, #0D1B3Eaa 58%, #0D1B3E77 78%, #0D1B3E44 100%)" }} />

        <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", justifyContent: "center", paddingTop: 64 }}>
          <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 64px", width: "100%" }}>
            <p style={{ fontFamily: FONT, fontSize: 14, fontWeight: 700, letterSpacing: "1.8px", textTransform: "uppercase", color: "#ffffff", marginBottom: 12 }}>
              Tata Engage · 2014 – the journey continues
            </p>
            <div style={{ width: 48, height: 2, borderRadius: 2, background: "rgba(255,255,255,0.6)", marginBottom: 22 }} />
            <h1 style={{ fontFamily: FONT, fontSize: "clamp(2.4rem, 5vw, 3.8rem)", fontWeight: 400, letterSpacing: "-0.5px", lineHeight: 1.12, color: "#fff", margin: "0 0 18px" }}>
              Shaped by compassion,{" "}
              <em style={{ fontStyle: "italic", fontWeight: 700 }}>action</em>{" "}
              and community
            </h1>
            <p style={{ fontFamily: FONT, fontSize: 16, fontWeight: 300, lineHeight: 1.7, color: "rgba(255,255,255,0.65)", maxWidth: 480, margin: 0 }}>
              From one million hours to ten. Eleven years of the Tata Group's commitment to purposeful volunteering — and counting.
            </p>
          </div>
        </div>

        {/* Bouncing chevrons */}
        <div style={{ position: "absolute", bottom: 28, right: 56, display: "flex", flexDirection: "column", alignItems: "center", gap: 3, opacity: 0.38 }}>
          {([0, 0.18, 0.36] as const).map((delay) => (
            <svg key={delay} width="18" height="10" viewBox="0 0 18 10" fill="none" style={{ animation: `chevBob 1.4s ease-in-out ${delay}s infinite` }}>
              <polyline points="1,1 9,9 17,1" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes chevBob {
          0%, 100% { transform: translateY(0); }
          50%       { transform: translateY(4px); }
        }
      `}</style>

      {/* ── Timeline ── */}
      <div style={{ maxWidth: 1080, margin: "0 auto", padding: "72px 32px 24px" }}>
        {MILESTONES.map((m, i) => {
          const colour     = PALETTE[i % PALETTE.length];
          const nextColour = PALETTE[(i + 1) % PALETTE.length];
          const isLast     = i === MILESTONES.length - 1;
          return (
            <div key={m.key}>
              <MilestoneRow m={m} index={i} colour={colour} />
              {!isLast && <DottedConnector colourFrom={colour} colourTo={nextColour} />}
            </div>
          );
        })}
      </div>

      {/* ── CTA strip ── */}
      <div style={{ background: B_TICKER, padding: "72px 48px", marginTop: 64, position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, backgroundImage: "repeating-linear-gradient(135deg, rgba(255,255,255,0.022) 0px, rgba(255,255,255,0.022) 1px, transparent 1px, transparent 28px)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", top: "-60px", right: "-60px", width: 360, height: 360, borderRadius: "50%", background: `radial-gradient(circle, ${PALETTE[2]}20 0%, transparent 70%)`, pointerEvents: "none" }} />
        <div style={{ position: "relative", zIndex: 1, maxWidth: 620, margin: "0 auto", textAlign: "center" }}>
          <p style={{ fontFamily: FONT, fontSize: 14, fontWeight: 700, letterSpacing: "1.8px", textTransform: "uppercase", color: "#ffffff", marginBottom: 14 }}>
            The legacy continues with you
          </p>
          <div style={{ width: 40, height: 3, borderRadius: 2, background: B_YELLOW, margin: "0 auto 24px" }} />
          <h2 style={{ fontFamily: FONT, fontSize: "clamp(26px, 4vw, 40px)", fontWeight: 900, color: "#fff", letterSpacing: "-0.8px", lineHeight: 1.1, marginBottom: 16 }}>
            Be part of what comes next
          </h2>
          <p style={{ fontFamily: FONT, fontSize: 15, color: "rgba(255,255,255,0.55)", lineHeight: 1.72, marginBottom: 36 }}>
            Join a community of 50,000+ volunteers shaping a better world through the Tata Group's longest-running commitment to action.
          </p>
          <div style={{ display: "flex", justifyContent: "center", gap: 12, flexWrap: "wrap" }}>
            <button
              onClick={() => navigate("register-role")}
              style={{ background: B_YELLOW, color: ACCENT_NAVY, border: "none", borderRadius: 10, padding: "13px 28px", fontFamily: FONT, fontWeight: 800, fontSize: 14, cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 8, letterSpacing: "-0.2px" }}
            >
              Register as Volunteer <ArrowRight size={14} />
            </button>
            <button
              onClick={() => navigate("about")}
              style={{ background: "rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.82)", border: "1px solid rgba(255,255,255,0.16)", borderRadius: 10, padding: "13px 28px", fontFamily: FONT, fontWeight: 600, fontSize: 14, cursor: "pointer" }}
            >
              About Tata Engage
            </button>
          </div>
        </div>
      </div>

      {/* suppress unused import warning */}
      <span style={{ display: "none" }} aria-hidden><img src={imgDR2} alt="" /></span>

      <SubPageDotRail sections={RAIL_SECTIONS} />
    </div>
  );
}
