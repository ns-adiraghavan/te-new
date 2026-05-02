import React, { useEffect, useRef, useState } from "react";
import SubPageDotRail from "@/components/shared/SubPageDotRail";

// Import real platform assets — same folder structure as AbouProEngageView
import peHeroImg from "@/assets/banner_photos/Inner Page ProEngage banner.jpg";

// ── Tokens ────────────────────────────────────────────────────────────────────
const FONT         = "'DM Sans',ui-sans-serif,system-ui,sans-serif";
const ACCENT_NAVY  = "#0D1B3E";
const B_YELLOW     = "#F79425";
const B_BLUE       = "#135EA9";
const COLOUR       = "#803998";   // ProEngage purple
const COLOUR_DARK  = "#4a1f5c";
const COLOUR_LIGHT = "#F3EEFF";
const BORDER       = "#e8e8f0";

const DIAG: React.CSSProperties = {
  position: "absolute", inset: 0,
  backgroundImage: "repeating-linear-gradient(45deg,rgba(255,255,255,0.03) 1px,transparent 1px)",
  backgroundSize: "28px 28px",
  pointerEvents: "none",
};

const SECTIONS = [
  { id: "ckit-hero", label: "Overview"  },
  { id: "ckit-pe",   label: "ProEngage" },
  { id: "ckit-tvw",  label: "TVW25"     },
];

// Drive links
const PE_DRIVE  = "https://drive.google.com/drive/folders/1yH2VG6bEHYN6I0f8-eAMdnI6pCmVqbBb";
const TVW_DRIVE = "https://drive.google.com/drive/folders/110-97fEP1DhitHy1LxRAoG2KagVsBNsU";

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

// ── Download button ───────────────────────────────────────────────────────────
function DlBtn({ label, href, solid, accent }: { label: string; href: string; solid?: boolean; accent: string }) {
  const [hov, setHov] = useState(false);
  return (
    <a
      href={href}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        display: "inline-flex", alignItems: "center", gap: 4,
        padding: "5px 10px", borderRadius: 6,
        fontFamily: FONT, fontSize: 10, fontWeight: 800, letterSpacing: "0.2px",
        textDecoration: "none",
        background: solid ? (hov ? COLOUR_DARK : accent) : (hov ? COLOUR_LIGHT : "transparent"),
        color: solid ? "#fff" : accent,
        border: `1.5px solid ${solid ? accent : accent + "55"}`,
        transition: "all 0.15s",
      }}
    >
      {solid && (
        <svg width="9" height="9" viewBox="0 0 12 12" fill="none" stroke="white" strokeWidth="1.7" strokeLinecap="round">
          <path d="M6 2v7M3 7l3 3 3-3"/><path d="M2 10h8"/>
        </svg>
      )}
      {label}
    </a>
  );
}

// ── Info tile (KPI-style, replaces old ThumbIcon thumbnails) ─────────────────
function InfoTile({ accent, typeTag, thumbLabel, dims, minHeight = 140 }: {
  accent: string; typeTag: string; thumbLabel: string; dims: string; minHeight?: number;
}) {
  return (
    <div style={{
      position: "relative", width: "100%", minHeight, background: accent,
      borderRadius: 0, overflow: "hidden",
      display: "flex", flexDirection: "column", justifyContent: "space-between",
      padding: "18px 20px",
    }}>
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: "rgba(255,255,255,0.35)" }} />
      <div style={{
        fontFamily: FONT, fontSize: 11, fontWeight: 800, letterSpacing: "1.6px",
        textTransform: "uppercase", color: "rgba(255,255,255,0.65)",
      }}>{typeTag}</div>
      <div style={{
        fontFamily: FONT, fontSize: 22, fontWeight: 900, color: "#fff",
        letterSpacing: "-0.3px", lineHeight: 1.1,
      }}>{thumbLabel}</div>
      <div style={{
        fontFamily: FONT, fontSize: 11, fontWeight: 600,
        color: "rgba(255,255,255,0.55)", letterSpacing: "0.4px",
      }}>{dims}</div>
    </div>
  );
}

// ── Asset card ────────────────────────────────────────────────────────────────
function AssetCard({
  typeTag, accent, title, meta, thumbLabel, dims,
  links,
}: {
  typeTag: string; accent: string;
  title: string; meta: string; thumbLabel: string; dims: string;
  links: { label: string; href: string; solid?: boolean }[];
}) {
  const [hov, setHov] = useState(false);
  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        background: "#fff", border: `1px solid ${BORDER}`, borderRadius: 14,
        overflow: "hidden", display: "flex", flexDirection: "column",
        boxShadow: hov ? "0 8px 24px rgba(0,0,0,0.08)" : "none",
        transform: hov ? "translateY(-3px)" : "translateY(0)",
        transition: "transform 0.18s, box-shadow 0.18s",
      }}
    >
      <InfoTile accent={accent} typeTag={typeTag} thumbLabel={thumbLabel} dims={dims} minHeight={140} />
      <div style={{ padding: "14px 16px 16px", flex: 1, display: "flex", flexDirection: "column" }}>
        <div style={{ fontFamily: FONT, fontSize: 13, fontWeight: 800, color: ACCENT_NAVY, lineHeight: 1.35, marginBottom: 5 }}>{title}</div>
        <div style={{ fontFamily: FONT, fontSize: 12, color: "#64748b", lineHeight: 1.55, flex: 1, marginBottom: 12 }}>{meta}</div>
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
          {links.map((l, i) => <DlBtn key={i} label={l.label} href={l.href} solid={l.solid} accent={accent} />)}
        </div>
      </div>
    </div>
  );
}

// Featured card (spans 2 cols)
function FeaturedCard({
  typeTag, accent, sectionTag, title, desc, thumbLabel, dims, links,
}: {
  typeTag: string; accent: string;
  sectionTag: string; title: string; desc: string;
  thumbLabel: string; dims: string;
  links: { label: string; href: string; solid?: boolean }[];
}) {
  const [hov, setHov] = useState(false);
  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        gridColumn: "span 2",
        display: "grid", gridTemplateColumns: "1fr 1fr",
        background: "#fff", border: `1px solid ${BORDER}`, borderRadius: 14,
        overflow: "hidden",
        boxShadow: hov ? "0 8px 24px rgba(0,0,0,0.08)" : "none",
        transform: hov ? "translateY(-3px)" : "translateY(0)",
        transition: "transform 0.18s, box-shadow 0.18s",
      }}
    >
      <InfoTile accent={accent} typeTag={typeTag} thumbLabel={thumbLabel} dims={dims} minHeight={180} />
      <div style={{ padding: "22px 24px", borderLeft: `1px solid ${BORDER}`, display: "flex", flexDirection: "column", justifyContent: "center" }}>
        <div style={{ fontFamily: FONT, fontSize: 10, fontWeight: 800, letterSpacing: "1.2px", textTransform: "uppercase", color: accent, marginBottom: 8 }}>{sectionTag}</div>
        <div style={{ fontFamily: FONT, fontSize: 15, fontWeight: 900, color: ACCENT_NAVY, lineHeight: 1.3, marginBottom: 8 }}>{title}</div>
        <p style={{ fontFamily: FONT, fontSize: 12, color: "#475569", lineHeight: 1.65, marginBottom: 16 }}>{desc}</p>
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
          {links.map((l, i) => <DlBtn key={i} label={l.label} href={l.href} solid={l.solid} accent={accent} />)}
        </div>
      </div>
    </div>
  );
}

// Section header
function SectionHd({ label, accent, count, icon }: { label: string; accent: string; count: string; icon: React.ReactNode }) {
  return (
    <div style={{ maxWidth: 1100, margin: "0 auto", padding: "56px 56px 20px" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
        <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: accent, borderRadius: 8, padding: "7px 16px 7px 12px", fontFamily: FONT, fontSize: 12, fontWeight: 800, color: "#fff", whiteSpace: "nowrap" }}>
          {icon}{label}
        </div>
        <div style={{ flex: 1, height: 1.5, background: BORDER, borderRadius: 2 }} />
        <div style={{ fontFamily: FONT, fontSize: 11, fontWeight: 700, letterSpacing: "1.5px", textTransform: "uppercase", color: "#94a3b8" }}>{count}</div>
      </div>
    </div>
  );
}

// ── Component ─────────────────────────────────────────────────────────────────
export default function ProEngageCampaignKitView() {
  return (
    <div style={{ fontFamily: FONT, background: "#f5f5fa", minHeight: "100vh" }}>

      {/* Top accent line */}
      <div style={{ height: 3, background: COLOUR, width: "100%" }} />

      <SubPageDotRail sections={SECTIONS} accentColour={COLOUR} />

      {/* ── HERO — real PE banner photo with purple overlay, mirrors AboutProEngageView ── */}
      <div id="ckit-hero" style={{ position: "relative", minHeight: "92vh", overflow: "hidden", display: "flex", alignItems: "center", paddingTop: 64 }}>
        <img src={peHeroImg} alt="" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "center" }} />
        <div style={{ position: "absolute", inset: 0, background: `linear-gradient(110deg,${COLOUR}e8 0%,${COLOUR}cc 38%,${COLOUR}aa 58%,${COLOUR}77 78%,${COLOUR}44 100%)` }} />
        <div style={DIAG} />

        <div style={{ position: "relative", zIndex: 1, maxWidth: 1100, margin: "0 auto", padding: "0 64px", width: "100%", display: "grid", gridTemplateColumns: "1.2fr 0.8fr", gap: 56, alignItems: "center" }}>

          {/* Left */}
          <div>
            <p style={{ fontFamily: FONT, fontSize: 11, fontWeight: 700, letterSpacing: "1.6px", textTransform: "uppercase", color: "rgba(255,255,255,0.65)", margin: "0 0 12px" }}>
              Tata Engage · Skill-Based Volunteering
            </p>
            <div style={{ height: 2, width: 48, borderRadius: 2, background: "rgba(255,255,255,0.6)", margin: "0 0 22px" }} />
            <h1 style={{ fontFamily: FONT, fontSize: "clamp(2.4rem,5vw,3.8rem)", fontWeight: 400, color: "#fff", lineHeight: 1.12, letterSpacing: "-0.5px", margin: "0 0 18px" }}>
              ProEngage Campaign Kit
            </h1>
            <p style={{ fontFamily: FONT, fontSize: 15, fontWeight: 300, lineHeight: 1.7, color: "rgba(255,255,255,0.65)", margin: "0 0 32px", maxWidth: 480 }}>
              Download and share official ProEngage creative assets — posters, social media graphics, banners, and more — to amplify participation across your company.
            </p>
            <a href="mailto:tataengage@tata.com" style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              background: B_YELLOW, color: ACCENT_NAVY, borderRadius: 10, padding: "14px 28px",
              fontFamily: FONT, fontSize: 14, fontWeight: 800, textDecoration: "none",
              boxShadow: "0 4px 20px rgba(0,0,0,0.25)",
            }}>
              Request custom assets
            </a>
          </div>

          {/* Right — contents summary panel */}
          <div style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.14)", borderRadius: 16, padding: 28, position: "relative", overflow: "hidden" }}>
            <div style={DIAG} />
            <div style={{ fontFamily: FONT, display: "inline-block", background: B_YELLOW, color: ACCENT_NAVY, fontSize: 9, fontWeight: 900, letterSpacing: "1.5px", textTransform: "uppercase", padding: "4px 10px", borderRadius: 100, marginBottom: 16, position: "relative", zIndex: 1 }}>
              What's inside
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10, position: "relative", zIndex: 1 }}>
              {[
                { dot: COLOUR,  label: "ProEngage Assets", count: "10 files" },
                { dot: B_BLUE,  label: "TVW Assets",       count: "6 files"  },
                { dot: "#13BBB4",label:"Posters, Banners, Social", count: "Multiple formats" },
              ].map((r, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 10, padding: "10px 14px" }}>
                  <div style={{ width: 8, height: 8, borderRadius: "50%", background: r.dot, flexShrink: 0 }} />
                  <span style={{ fontFamily: FONT, fontSize: 13, fontWeight: 700, color: "rgba(255,255,255,0.85)" }}>{r.label}</span>
                  <span style={{ marginLeft: "auto", fontFamily: FONT, fontSize: 10, fontWeight: 700, letterSpacing: "1px", textTransform: "uppercase", color: "rgba(255,255,255,0.4)" }}>{r.count}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── PROENGAGE ASSETS ── */}
      <div id="ckit-pe">
        <SectionHd label="ProEngage Assets" accent={COLOUR} count="10 Assets" icon={
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="white" strokeWidth="1.6" strokeLinecap="round">
            <rect x="1" y="1" width="12" height="12" rx="2"/><path d="M1 5h12M5 1v12"/>
          </svg>
        } />
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 56px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 16 }}>

            <FeaturedCard thumbBg={`linear-gradient(135deg,${COLOUR_LIGHT},#c890e0)`} typeTag="Poster" typeTagColor={COLOUR_DARK} accent={COLOUR}
              sectionTag="ProEngage · Main Poster" title="ProEngage Poster — Portrait A"
              desc="Primary recruitment poster for ProEngage. Use on office notice boards, internal screens, intranet pages and team communications to drive volunteer registrations."
              links={[{ label: "Download PNG", href: PE_DRIVE, solid: true }, { label: "Download PDF", href: PE_DRIVE }]}
            >
              <ThumbIcon bg={`${COLOUR}1a`} color={COLOUR} label="Primary Recruitment Poster">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={COLOUR} strokeWidth="1.7" strokeLinecap="round"><rect x="3" y="3" width="18" height="18" rx="3"/><path d="M3 9h18M9 3v18"/></svg>
              </ThumbIcon>
            </FeaturedCard>

            {[
              { bg: `linear-gradient(135deg,${COLOUR_LIGHT},#d0a8e8)`, tag: "Poster",   label: "Portrait B",    title: "ProEngage Poster — Portrait B",          meta: "Secondary portrait variant. A4 print and digital-screen ready.", links: [{ label: "PNG", href: PE_DRIVE, solid: true }, { label: "PDF", href: PE_DRIVE }], icon: <svg width="20" height="20" viewBox="0 0 22 22" fill="none" stroke={COLOUR} strokeWidth="1.6" strokeLinecap="round"><rect x="4" y="2" width="14" height="18" rx="2"/><path d="M7 7h8M7 11h5"/></svg> },
              { bg: "linear-gradient(135deg,#ece0ff,#c898e0)",           tag: "Poster",   label: "Portrait C",    title: "ProEngage Poster — Portrait C",          meta: "Third portrait variant. Suitable for WhatsApp and internal messaging.", links: [{ label: "PNG", href: PE_DRIVE, solid: true }, { label: "PDF", href: PE_DRIVE }], icon: <svg width="20" height="20" viewBox="0 0 22 22" fill="none" stroke={COLOUR} strokeWidth="1.6" strokeLinecap="round"><rect x="4" y="2" width="14" height="18" rx="2"/><circle cx="11" cy="11" r="4"/></svg> },
              { bg: `linear-gradient(135deg,${COLOUR_LIGHT},#bda0d8)`,   tag: "Banner",   label: "Landscape A",   title: "ProEngage Banner — Landscape A",         meta: "Email headers, intranet banners, digital displays. 1200×628.", links: [{ label: "PNG", href: PE_DRIVE, solid: true }, { label: "PDF", href: PE_DRIVE }], icon: <svg width="20" height="20" viewBox="0 0 22 22" fill="none" stroke={COLOUR} strokeWidth="1.6" strokeLinecap="round"><rect x="2" y="6" width="18" height="10" rx="2"/><path d="M6 11h10"/></svg> },
              { bg: "linear-gradient(135deg,#ede0ff,#c090d8)",            tag: "Social",   label: "Social Square A",title: "Social Media Square — Option A",        meta: "1080×1080 for LinkedIn, Instagram and Yammer posts.", links: [{ label: "PNG", href: PE_DRIVE, solid: true }, { label: "JPG", href: PE_DRIVE }], icon: <svg width="20" height="20" viewBox="0 0 22 22" fill="none" stroke={COLOUR} strokeWidth="1.6" strokeLinecap="round"><rect x="4" y="4" width="14" height="14" rx="2"/><path d="M8 11h6M11 8v6"/></svg> },
              { bg: "linear-gradient(135deg,#e8d8fc,#b070cc)",            tag: "Social",   label: "Social Square B",title: "Social Media Square — Option B",        meta: "Alternate square layout. Different visual treatment to Option A.", links: [{ label: "PNG", href: PE_DRIVE, solid: true }, { label: "JPG", href: PE_DRIVE }], icon: <svg width="20" height="20" viewBox="0 0 22 22" fill="none" stroke={COLOUR} strokeWidth="1.6" strokeLinecap="round"><rect x="4" y="4" width="14" height="14" rx="2"/><path d="M8 8h6M8 12h4"/></svg> },
              { bg: "linear-gradient(180deg,#f0e4ff,#c080d8)",            tag: "Story",    label: "Story Format",   title: "Instagram / WhatsApp Story",            meta: "1080×1920 vertical format for Instagram Stories and WhatsApp status.", links: [{ label: "PNG", href: PE_DRIVE, solid: true }], icon: <svg width="20" height="20" viewBox="0 0 22 22" fill="none" stroke={COLOUR} strokeWidth="1.6" strokeLinecap="round"><rect x="7" y="2" width="8" height="18" rx="2"/></svg> },
              { bg: "linear-gradient(135deg,#ede0ff,#a868c8)",            tag: "Display",  label: "Screensaver",    title: "Laptop / Screen Wallpaper",             meta: "Desktop wallpaper for employee devices. 1920×1080 resolution.", links: [{ label: "PNG", href: PE_DRIVE, solid: true }], icon: <svg width="20" height="20" viewBox="0 0 22 22" fill="none" stroke={COLOUR} strokeWidth="1.6" strokeLinecap="round"><rect x="2" y="4" width="18" height="12" rx="2"/><path d="M8 20h6M11 16v4"/></svg> },
              { bg: "linear-gradient(135deg,#ece0ff,#b878d8)",            tag: "Email",    label: "Email Header",   title: "Email Campaign Header",                 meta: "For internal email announcements and ProEngage newsletters.", links: [{ label: "PNG", href: PE_DRIVE, solid: true }], icon: <svg width="20" height="20" viewBox="0 0 22 22" fill="none" stroke={COLOUR} strokeWidth="1.6" strokeLinecap="round"><rect x="2" y="5" width="18" height="12" rx="2"/><path d="M2 7l9 6 9-6"/></svg> },
            ].map((c, i) => (
              <AssetCard key={i} thumbBg={c.bg} typeTag={c.tag} typeTagColor={COLOUR_DARK} accent={COLOUR} title={c.title} meta={c.meta} links={c.links}>
                <ThumbIcon bg={`${COLOUR}1a`} color={COLOUR} label={c.label}>{c.icon}</ThumbIcon>
              </AssetCard>
            ))}
          </div>
        </div>
      </div>

      {/* ── TVW ASSETS ── */}
      <div id="ckit-tvw" style={{ paddingTop: 8 }}>
        <SectionHd label="TVW Assets" accent={B_BLUE} count="6 Assets" icon={
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="white" strokeWidth="1.6" strokeLinecap="round">
            <path d="M7 2l1.5 4.5H13l-3.75 2.75L10.75 13 7 10.5 3.25 13l1.5-3.75L1 6.5h4.5z"/>
          </svg>
        } />
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 56px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 16 }}>

            <FeaturedCard thumbBg="linear-gradient(135deg,#EEF4FF,#b8d0f0)" typeTag="Poster" typeTagColor="#0d3a69" accent={B_BLUE}
              sectionTag="TVW25 · Campaign Poster" title="Tata Volunteering Week 25 — Main Poster"
              desc="Primary TVW25 campaign poster featuring the IVY League of Volunteers theme. Use for office displays, intranet, and internal communications across your company."
              links={[{ label: "Download PNG", href: TVW_DRIVE, solid: true }, { label: "Download PDF", href: TVW_DRIVE }]}
            >
              <ThumbIcon bg={`${B_BLUE}1a`} color={B_BLUE} label="TVW25 Main Poster">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={B_BLUE} strokeWidth="1.7" strokeLinecap="round"><path d="M12 2l1.5 4.5H18l-3.75 2.75L15.75 13 12 10.5 8.25 13l1.5-3.75L6 6.5h4.5z"/></svg>
              </ThumbIcon>
            </FeaturedCard>

            {[
              { bg: "linear-gradient(135deg,#EEF4FF,#a0c0e8)", tag: "Poster",  label: "TVW Portrait B",  title: "TVW25 Poster — Portrait B",      meta: "Secondary TVW25 portrait poster. A4 print and digital display.", links: [{ label: "PNG", href: TVW_DRIVE, solid: true }, { label: "PDF", href: TVW_DRIVE }], icon: <svg width="20" height="20" viewBox="0 0 22 22" fill="none" stroke={B_BLUE} strokeWidth="1.6" strokeLinecap="round"><rect x="4" y="2" width="14" height="18" rx="2"/><path d="M7 7h8M7 11h5"/></svg> },
              { bg: "linear-gradient(135deg,#ddeeff,#88b8e8)",  tag: "Social", label: "Social Square",    title: "TVW25 Social Media Square",      meta: "1080×1080 for LinkedIn and Instagram promoting TVW25.", links: [{ label: "PNG", href: TVW_DRIVE, solid: true }], icon: <svg width="20" height="20" viewBox="0 0 22 22" fill="none" stroke={B_BLUE} strokeWidth="1.6" strokeLinecap="round"><rect x="4" y="4" width="14" height="14" rx="2"/><path d="M8 11h6M11 8v6"/></svg> },
              { bg: "linear-gradient(135deg,#ddeeff,#70a8d8)",  tag: "Banner", label: "Landscape Banner", title: "TVW25 Landscape Banner",          meta: "Wide format for email headers, intranet and digital boards.", links: [{ label: "PNG", href: TVW_DRIVE, solid: true }, { label: "PDF", href: TVW_DRIVE }], icon: <svg width="20" height="20" viewBox="0 0 22 22" fill="none" stroke={B_BLUE} strokeWidth="1.6" strokeLinecap="round"><rect x="2" y="6" width="18" height="10" rx="2"/><path d="M5 11h12"/></svg> },
              { bg: "linear-gradient(180deg,#ddeeff,#60a0d0)",  tag: "Story",  label: "Story Format",     title: "TVW25 Instagram Story",          meta: "1080×1920 vertical for Instagram Stories and WhatsApp status.", links: [{ label: "PNG", href: TVW_DRIVE, solid: true }], icon: <svg width="20" height="20" viewBox="0 0 22 22" fill="none" stroke={B_BLUE} strokeWidth="1.6" strokeLinecap="round"><rect x="7" y="2" width="8" height="18" rx="2"/></svg> },
              { bg: "linear-gradient(135deg,#EEF4FF,#90b8e0)",  tag: "Guide",  label: "DIY Guide",        title: "TVW25 DIY Activity Guide",       meta: "Step-by-step guide for volunteers running independent DIY activities.", links: [{ label: "PDF", href: "https://tataengage.com/TVW25/PDF/TVW25_DIY_Guide.pdf", solid: true }], icon: <svg width="20" height="20" viewBox="0 0 22 22" fill="none" stroke={B_BLUE} strokeWidth="1.6" strokeLinecap="round"><path d="M14 2H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8l-4-6z"/><path d="M14 2v6h6M9 13h4M9 17h6"/></svg> },
            ].map((c, i) => (
              <AssetCard key={i} thumbBg={c.bg} typeTag={c.tag} typeTagColor="#0d3a69" accent={B_BLUE} title={c.title} meta={c.meta} links={c.links}>
                <ThumbIcon bg={`${B_BLUE}1a`} color={B_BLUE} label={c.label}>{c.icon}</ThumbIcon>
              </AssetCard>
            ))}
          </div>
        </div>
      </div>

      {/* ── INFO STRIP ── */}
      <div style={{ maxWidth: 1100, margin: "40px auto 0", padding: "0 56px" }}>
        <div style={{ background: COLOUR, borderRadius: 14, padding: "22px 28px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 24 }}>
          <div>
            <div style={{ fontFamily: FONT, fontSize: 11, fontWeight: 700, letterSpacing: "1.5px", textTransform: "uppercase", color: "rgba(255,255,255,0.6)", marginBottom: 4 }}>Need help or custom assets?</div>
            <div style={{ fontFamily: FONT, fontSize: 17, fontWeight: 900, color: "#fff" }}>Reach out to the Tata Engage team</div>
          </div>
          <a href="mailto:tataengage@tata.com" style={{
            background: B_YELLOW, color: ACCENT_NAVY, borderRadius: 10, padding: "11px 22px",
            fontFamily: FONT, fontSize: 13, fontWeight: 800, textDecoration: "none",
            whiteSpace: "nowrap", flexShrink: 0,
          }}>tataengage@tata.com</a>
        </div>
      </div>

      {/* bottom padding — real footer mounts above this */}
      <div style={{ height: 80 }} />

    </div>
  );
}
