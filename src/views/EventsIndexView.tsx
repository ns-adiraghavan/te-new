import React, { useState } from "react";
import { useAppNavigate } from "@/hooks/useAppNavigate";
import { EVENTS } from "@/data/eventsData";
import SubPageDotRail from "@/components/shared/SubPageDotRail";
import volconHero from "@/assets/events/volcon-2024-panel.png";

const ACCENT_NAVY = "#0D1B3E";
const B_INDIGO    = "#333399";
const FONT        = "'DM Sans','Noto Sans',ui-sans-serif,system-ui,sans-serif";
const ACCENT      = "#135EA9";   // Events page accent — blue

const DIAG: React.CSSProperties = {
  position: "absolute", inset: 0,
  backgroundImage: "repeating-linear-gradient(45deg,rgba(255,255,255,0.035) 0px,rgba(255,255,255,0.035) 1px,transparent 1px,transparent 24px)",
  backgroundSize: "24px 24px",
  pointerEvents: "none",
};

const SECTIONS = [
  { id: "events-hero",    label: "Overview" },
  { id: "events-content", label: "Events"   },
];

function parseDateVal(d: string): number {
  const m = d.match(/(\d{4})/);
  if (!m) return 0;
  const year = parseInt(m[1]);
  const months: Record<string, number> = {
    january: 1, february: 2, march: 3, april: 4, may: 5, june: 6,
    july: 7, august: 8, september: 9, october: 10, november: 11, december: 12,
  };
  const mm = d.toLowerCase().match(/(january|february|march|april|may|june|july|august|september|october|november|december)/);
  return year * 100 + (mm ? months[mm[1]] : 0);
}

export default function EventsIndexView() {
  const navigate = useAppNavigate();
  const [sort, setSort] = useState<"newest" | "oldest">("newest");

  const sorted = [...EVENTS].sort((a, b) =>
    sort === "newest"
      ? parseDateVal(b.date) - parseDateVal(a.date)
      : parseDateVal(a.date) - parseDateVal(b.date)
  );

  return (
    <div style={{ fontFamily: FONT, background: "#f7f8fc", minHeight: "100vh" }}>

      <div style={{ height: 3, background: ACCENT, width: "100%" }} />
      <SubPageDotRail sections={SECTIONS} accentColour={ACCENT} />

      {/* ── Hero ── */}
      <div id="events-hero" style={{ position: "relative", minHeight: "92vh",
        display: "flex", alignItems: "center", overflow: "hidden", paddingTop: 64 }}>
        <img src={volconHero} alt=""
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%",
            objectFit: "cover", objectPosition: "center 35%" }} />
        <div style={{ position: "absolute", inset: 0,
          background: "linear-gradient(160deg,rgba(8,12,22,0.82) 0%,rgba(8,12,22,0.60) 45%,rgba(8,12,22,0.22) 100%)" }} />
        <div style={DIAG} />

        <div style={{ position: "relative", zIndex: 1, maxWidth: 1100, margin: "0 auto",
          padding: "0 56px", width: "100%" }}>

          <h1 style={{ fontFamily: FONT, fontSize: "clamp(2.4rem,5vw,3.8rem)", fontWeight: 400,
            color: "#fff", lineHeight: 1.12, letterSpacing: "-0.5px",
            margin: "0 0 14px" }}>
            Events
          </h1>
          <p style={{ fontFamily: FONT, fontSize: 18, fontWeight: 300,
            color: "rgba(255,255,255,0.8)", lineHeight: 1.6, maxWidth: 560, margin: "0 0 32px" }}>
            Conclaves, forums and gatherings that shape the volunteering agenda.
          </p>
          <p style={{ fontFamily: FONT, fontSize: 15, fontWeight: 300,
            color: "rgba(255,255,255,0.72)", lineHeight: 1.7, maxWidth: 480, margin: 0 }}>
            From TSG's flagship Sustainability Conclave to the global IAVE forum — moments where leaders, champions and the community come together.
          </p>

          {/* Stat pills */}
          <div style={{ display: "flex", gap: 12, marginTop: 32, flexWrap: "wrap" }}>
            {[
              { num: `${EVENTS.length}`, label: "Events documented" },
              { num: "4+", label: "Years" },
              { num: "1,500+", label: "Global participants" },
            ].map((s, i) => (
              <div key={i} style={{ background: "rgba(255,255,255,0.1)",
                border: "1px solid rgba(255,255,255,0.18)", borderRadius: 8,
                padding: "8px 16px" }}>
                <div style={{ fontFamily: FONT, fontSize: 20, fontWeight: 900,
                  color: "#fff", lineHeight: 1 }}>{s.num}</div>
                <div style={{ fontFamily: FONT, fontSize: 11, color: "rgba(255,255,255,0.6)",
                  marginTop: 3 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Content ── */}
      <div id="events-content" style={{ maxWidth: 1100, margin: "0 auto", padding: "40px 56px 80px" }}>

        {/* Sort bar */}
        <div style={{ display: "flex", alignItems: "center", gap: 8,
          marginBottom: 28, justifyContent: "flex-end" }}>
          <span style={{ fontSize: 12, color: ACCENT_NAVY, fontWeight: 600 }}>Sort:</span>
          {(["newest", "oldest"] as const).map((opt) => (
            <button key={opt} onClick={() => setSort(opt)} style={{
              background: sort === opt ? B_INDIGO : "#f5f5fa",
              color: sort === opt ? "#fff" : "#6b6b7a",
              border: "none", borderRadius: 100, padding: "5px 14px",
              fontWeight: 600, fontSize: 12, cursor: "pointer",
            }}>
              {opt === "newest" ? "Newest first" : "Oldest first"}
            </button>
          ))}
        </div>

        {/* Card grid */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
          {sorted.map((e) => (
            <div key={e.slug}
              onClick={() => navigate("event-detail", e.slug)}
              style={{ background: "#fff", border: "1px solid #e8e8f0", borderRadius: 14,
                overflow: "hidden", cursor: "pointer",
                transition: "transform 0.18s, box-shadow 0.18s" }}
              onMouseEnter={(ev) => {
                ev.currentTarget.style.transform = "translateY(-3px)";
                ev.currentTarget.style.boxShadow = "0 8px 24px rgba(0,0,0,0.08)";
              }}
              onMouseLeave={(ev) => {
                ev.currentTarget.style.transform = "translateY(0)";
                ev.currentTarget.style.boxShadow = "none";
              }}>

              {/* Thumbnail — accent-tinted overlay on hover */}
              <div style={{ aspectRatio: "16/10", overflow: "hidden", position: "relative" }}>
                <img src={e.heroImage} alt={e.title}
                  style={{ width: "100%", height: "100%", objectFit: "cover",
                    objectPosition: "center 30%", display: "block" }} />
                {/* Accent colour bar at bottom of image */}
                <div style={{ position: "absolute", bottom: 0, left: 0, right: 0,
                  height: 3, background: e.accentColor }} />
              </div>

              <div style={{ padding: "20px 22px 24px" }}>
                <div style={{ display: "flex", alignItems: "center",
                  justifyContent: "space-between", marginBottom: 10 }}>
                  <span style={{ display: "inline-block", background: `${e.accentColor}15`,
                    color: e.accentColor, fontSize: 10, fontWeight: 700, padding: "3px 9px",
                    borderRadius: 4, textTransform: "uppercase", letterSpacing: "0.5px" }}>
                    {e.tag}
                  </span>
                  <span style={{ fontSize: 11, color: ACCENT_NAVY, fontWeight: 500 }}>
                    {e.date}{e.location ? ` · ${e.location}` : ""}
                  </span>
                </div>
                <div style={{ fontFamily: FONT, fontSize: 15, fontWeight: 700,
                  color: ACCENT_NAVY, lineHeight: 1.4, marginBottom: 8 }}>{e.title}</div>
                <p style={{ fontFamily: FONT, fontSize: 13, color: "#64748b",
                  lineHeight: 1.7, margin: "0 0 16px" }}>{e.excerpt}</p>
                <span style={{ fontFamily: FONT, fontSize: 12, fontWeight: 700,
                  color: e.accentColor }}>View event →</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
