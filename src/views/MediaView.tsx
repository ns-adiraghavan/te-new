import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useAppContext } from "@/context/AppContext";
import { useAppNavigate } from "@/hooks/useAppNavigate";
import { SOCIAL_POSTS } from "@/data/homeSharedData";
import { IMPACT_STORIES } from "@/data/impactStoriesData";

import SubPageDotRail from "@/components/shared/SubPageDotRail";
import heroImg          from "@/assets/tata-projects.jpg";
import photo01 from "@/assets/homepagebanner/TVW 6  - 7th Day 7.JPG";
import photo02 from "@/assets/homepagebanner/Volunteering in Action 5.jpg";
import photo03 from "@/assets/homepagebanner/Westside Store employees_Paint an Orphanage - Trent.JPG";
import photo04 from "@/assets/homepagebanner/Antarang Foundation - Project Horizon - Mentoring Session by Leadership - Tata AIA.jpg";
import photo05 from "@/assets/homepagebanner/General_Titan Company Ltd_01.jpg";
import photo06 from "@/assets/homepagebanner/IHCL 1.jpg";
import photo07 from "@/assets/homepagebanner/Road Safety Awareness by HRM (2).JPG";
import photo08 from "@/assets/homepagebanner/JCAPCPL 3 (2).JPG";
import photo09 from "@/assets/homepagebanner/Eye Scanning Camp Joda 1.jpg";
import photo10 from "@/assets/homepagebanner/JCAPCPL22.JPG";
import photo11 from "@/assets/homepagebanner/20240729_114952.jpg";
import photo12 from "@/assets/homepagebanner/4. Mithapur_Eco-Tourism_LEEPEN_Harivan Farm_2022-23_Lipan Work (5).jpeg";

const B_INDIGO = "#333399";
const B_BLUE = "#333399";
const ACCENT_NAVY = "#0D1B3E";

const TABS = ["Impact Stories", "Photos", "Videos", "Social Media"] as const;

const HASH_TO_TAB: Record<string, typeof TABS[number]> = {
  stories: "Impact Stories",
  photos: "Photos",
  videos: "Videos",
  social: "Social Media",
};

const SECTIONS = [
  { id: "media-hero", label: "Overview" },
  { id: "media-content", label: "Content" },
];

const DIAG_TEXTURE = {
  position: "absolute" as const, inset: 0,
  backgroundImage: "repeating-linear-gradient(45deg, rgba(255,255,255,0.025) 0px, rgba(255,255,255,0.025) 1px, transparent 1px, transparent 22px)",
  backgroundSize: "22px 22px",
  pointerEvents: "none" as const,
};

const cardHover = {
  onMouseEnter: (e: React.MouseEvent<HTMLDivElement>) => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 8px 24px rgba(0,0,0,0.08)"; },
  onMouseLeave: (e: React.MouseEvent<HTMLDivElement>) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; },
};

const PHOTOS = [
  photo01, photo02, photo03, photo04,
  photo05, photo06, photo07, photo08,
  photo09, photo10, photo11, photo12,
];

const VIDEOS = [
  { title: "TVW25 Launch Film", duration: "3:45" },
  { title: "ProEngage Volunteer Stories", duration: "5:12" },
  { title: "VolCon 2024 Highlights", duration: "8:30" },
  { title: "Impact: Education Projects", duration: "4:18" },
  { title: "One Tata Response — DR2024", duration: "6:02" },
  { title: "GCSO Message TVW25", duration: "2:55" },
];

// Parse dates for sorting — returns a sortable number (ms or ordinal)
function parseDateVal(d: string): number {
  // "July–August 2024" → 2024, "March 2024" → 202403, "2000–Present" → 2000
  const m = d.match(/(\d{4})/);
  if (!m) return 0;
  const year = parseInt(m[1]);
  const months: Record<string, number> = {
    january: 1, february: 2, march: 3, april: 4, may: 5, june: 6,
    july: 7, august: 8, september: 9, october: 10, november: 11, december: 12,
  };
  const monthMatch = d.toLowerCase().match(/(january|february|march|april|may|june|july|august|september|october|november|december)/);
  const month = monthMatch ? months[monthMatch[1]] : 0;
  return year * 100 + month;
}


export default function MediaView() {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState<typeof TABS[number]>("Impact Stories");
  const { triggerToast } = useAppContext();
  const navigate = useAppNavigate();
  const [storiesSort, setStoriesSort] = useState<"newest" | "oldest">("newest");

  useEffect(() => {
    const raw = location.hash.replace(/^#/, "");
    const params = new URLSearchParams(raw);
    const key = params.get("tab");
    if (key && HASH_TO_TAB[key]) {
      setActiveTab(HASH_TO_TAB[key]);
      setTimeout(() => document.getElementById("media-content")?.scrollIntoView({ behavior: "smooth" }), 120);
    }
  }, [location.hash]);

  const sortedStories = [...IMPACT_STORIES].sort((a, b) =>
    storiesSort === "newest" ? parseDateVal(b.date) - parseDateVal(a.date) : parseDateVal(a.date) - parseDateVal(b.date)
  );

  const SortBar = ({ value, onChange }: { value: "newest" | "oldest"; onChange: (v: "newest" | "oldest") => void }) => (
    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 20, justifyContent: "flex-end" }}>
      <span style={{ fontSize: 12, color: "#94a3b8", fontWeight: 600 }}>Sort:</span>
      {(["newest", "oldest"] as const).map((opt) => (
        <button key={opt} onClick={() => onChange(opt)} style={{
          background: value === opt ? B_INDIGO : "#f5f5fa",
          color: value === opt ? "#fff" : "#6b6b7a",
          border: "none", borderRadius: 100, padding: "5px 14px",
          fontWeight: 600, fontSize: 12, cursor: "pointer",
        }}>
          {opt === "newest" ? "Newest first" : "Oldest first"}
        </button>
      ))}
    </div>
  );

  return (
    <div className="dot-grid-bg" style={{ paddingTop: 0, paddingBottom: 0, background: "transparent", minHeight: "100vh" }}>

      {/* 2px accent line */}
      <div style={{ height: 2, background: B_BLUE, width: "100%" }} />

      {/* Dot rail */}
      <SubPageDotRail sections={SECTIONS} accentColor={B_BLUE} />

      {/* 1 — Hero (shorter: 50vh) */}
      <div id="media-hero" style={{ position: "relative", minHeight: "92vh", display: "flex", alignItems: "center", overflow: "hidden", paddingTop: 64 }}>
        <img src={heroImg} alt="" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 40%" }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(105deg, rgba(8,12,22,0.88) 0%, rgba(8,12,22,0.70) 40%, rgba(8,12,22,0.28) 75%, rgba(8,12,22,0.08) 100%)" }} />
        <div style={DIAG_TEXTURE} />
        <div style={{ position: "relative", zIndex: 1, maxWidth: 1100, margin: "0 auto", padding: "0 64px", width: "100%" }}>
          <p style={{ fontFamily: "'DM Sans','Noto Sans',ui-sans-serif,system-ui,sans-serif", fontSize: 14, fontWeight: 700, letterSpacing: "1.8px", textTransform: "uppercase", color: "#ffffff", marginBottom: 12 }}>
            Tata Engage · Media &amp; Resources
          </p>
          <div style={{ width: 48, height: 2, borderRadius: 2, background: "rgba(255,255,255,0.6)", marginBottom: 22 }} />
          <h1 style={{ fontFamily: "'DM Sans','Noto Sans',ui-sans-serif,system-ui,sans-serif", fontSize: "clamp(2rem, 3.5vw, 3rem)", fontWeight: 400, letterSpacing: "-0.5px", lineHeight: 1.12, color: "#fff", margin: "0 0 14px" }}>
            Stories, photos and moments<br />from the Tata Engage community
          </h1>
          <p style={{ fontFamily: "'DM Sans','Noto Sans',ui-sans-serif,system-ui,sans-serif", fontSize: 15, fontWeight: 300, color: "rgba(255,255,255,0.65)", lineHeight: 1.7, maxWidth: 480, margin: 0 }}>
            Capturing the spirit of volunteering across every edition, company and cause.
          </p>
        </div>
      </div>

      {/* 2 — Tabs */}
      <div id="media-content" style={{ display: "flex", justifyContent: "center", gap: 8, padding: "20px 24px", flexWrap: "wrap" }}>
        {TABS.map((t) => (
          <button
            key={t}
            onClick={() => setActiveTab(t)}
            style={{
              background: activeTab === t ? "#333399" : "#f5f5fa",
              color: activeTab === t ? "#fff" : "#6b6b7a",
              border: "none", borderRadius: 100, padding: "8px 20px", fontWeight: 600, fontSize: 14, cursor: "pointer",
            }}
          >
            {t}
          </button>
        ))}
      </div>

      <div style={{ maxWidth: 1060, margin: "0 auto", padding: "8px 24px 64px" }}>

        {/* 3 — Photos */}
        {activeTab === "Photos" && (
          <div>
            <div style={{ columns: 4, columnGap: 16 }}>
              {PHOTOS.map((src, i) => (
                <div
                  key={i}
                  onClick={() => triggerToast("Opening full image...")}
                  style={{ breakInside: "avoid", marginBottom: 16, borderRadius: 10,
                    overflow: "hidden", cursor: "pointer",
                    transition: "transform 0.2s, box-shadow 0.2s" }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLDivElement).style.transform = "translateY(-3px)"; (e.currentTarget as HTMLDivElement).style.boxShadow = "0 8px 24px rgba(0,0,0,0.12)"; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLDivElement).style.transform = "none"; (e.currentTarget as HTMLDivElement).style.boxShadow = "none"; }}
                >
                  <img src={src} alt="" style={{ width: "100%", display: "block" }} />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 4 — Videos */}
        {activeTab === "Videos" && (
          <div style={{ columns: 3, columnGap: 16 }}>
            {VIDEOS.map((v, i) => (
              <div
                key={i}
                onClick={() => triggerToast("Opening video player...")}
                style={{
                  breakInside: "avoid", marginBottom: 16,
                  borderRadius: 12, overflow: "hidden", cursor: "pointer",
                  position: "relative", background: ACCENT_NAVY,
                  transition: "transform 0.2s, box-shadow 0.2s",
                }}
                onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-3px)"; e.currentTarget.style.boxShadow = "0 10px 28px rgba(0,0,0,0.18)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "none"; }}
              >
                <div style={{
                  height: [200, 150, 240, 170, 220, 160][i % 6],
                  display: "flex", alignItems: "center", justifyContent: "center",
                  background: `linear-gradient(135deg, ${ACCENT_NAVY} 0%, #1a3560 100%)`,
                  position: "relative",
                }}>
                  <div style={{ width: 48, height: 48, borderRadius: "50%", background: "rgba(255,255,255,0.15)", border: "1.5px solid rgba(255,255,255,0.25)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <span style={{ fontSize: 18, color: "#fff", marginLeft: 3 }}>▶</span>
                  </div>
                  <span style={{ position: "absolute", bottom: 10, right: 12, background: "rgba(0,0,0,0.55)", color: "#fff", fontSize: 11, fontWeight: 700, padding: "3px 8px", borderRadius: 4 }}>{v.duration}</span>
                </div>
                <div style={{ padding: "14px 16px 16px", background: "#fff" }}>
                  <div style={{ fontSize: 14, fontWeight: 700, color: ACCENT_NAVY, lineHeight: 1.4 }}>{v.title}</div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* 5 — Impact Stories */}
        {activeTab === "Impact Stories" && (
          <div>
            <SortBar value={storiesSort} onChange={setStoriesSort} />
            <div style={{ columns: 2, columnGap: 20 }}>
              {sortedStories.map((s) => (
                <div
                  key={s.slug}
                  onClick={() => navigate("stories", s.slug)}
                  style={{
                    breakInside: "avoid", marginBottom: 20,
                    background: "#fff", border: "1px solid #e8e8f0",
                    borderRadius: 14, overflow: "hidden", cursor: "pointer",
                    transition: "transform 0.2s, box-shadow 0.2s",
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-3px)"; e.currentTarget.style.boxShadow = "0 8px 24px rgba(0,0,0,0.08)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; }}
                >
                  <div style={{ aspectRatio: "16/10", overflow: "hidden" }}>
                    <img src={s.heroImage} alt={s.heroImageAlt}
                      style={{ width: "100%", height: "100%", objectFit: "cover",
                        objectPosition: s.slug === "beyond-the-boardroom" ? "center 70%" : "center 35%" }} />
                  </div>
                  <div style={{ padding: "20px 22px 22px" }}>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
                      <span style={{ display: "inline-block", background: `${s.accentColor}15`, color: s.accentColor, fontSize: 10, fontWeight: 700, padding: "3px 9px", borderRadius: 4, textTransform: "uppercase", letterSpacing: "0.5px" }}>{s.tag}</span>
                      <span style={{ fontSize: 11, color: "#94a3b8", fontWeight: 500 }}>{s.date}</span>
                    </div>
                    <div style={{ fontSize: 15, fontWeight: 700, color: ACCENT_NAVY, marginBottom: 10, lineHeight: 1.4 }}>{s.title}</div>
                    <p style={{ fontSize: 13, color: "#64748B", lineHeight: 1.7, marginBottom: 16 }}>{s.excerpt}</p>
                    <span style={{ fontSize: 13, fontWeight: 700, color: B_INDIGO }}>Read story →</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 6 — Social Media */}
        {activeTab === "Social Media" && (
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 20 }}>
            {SOCIAL_POSTS.map((post, i) => {
              const IconComp = post.Icon;
              return (
                <div key={i} style={{ background: "#fff", border: "1px solid #e8e8f0", borderRadius: 14, padding: 20, transition: "transform 0.2s, box-shadow 0.2s" }} {...cardHover}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
                    <div style={{ width: 32, height: 32, borderRadius: "50%", background: post.iconBg, display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <IconComp size={16} color="#fff" />
                    </div>
                    <div>
                      <div style={{ fontSize: 13, fontWeight: 700, color: ACCENT_NAVY }}>{post.handle}</div>
                      <div style={{ fontSize: 11, color: "#94A3B8" }}>{post.platform} · {post.time}</div>
                    </div>
                  </div>
                  <p style={{ fontSize: 14, color: "#475569", lineHeight: 1.6, marginBottom: 10 }}>{post.text}</p>
                  <span style={{ fontSize: 12, color: "#94A3B8" }}>♡ {post.likes}</span>
                </div>
              );
            })}
          </div>
        )}

      </div>

      
    </div>
  );
}

