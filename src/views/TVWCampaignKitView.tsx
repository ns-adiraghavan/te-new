import React, { useEffect, useRef, useState } from "react";
import SubPageDotRail from "@/components/shared/SubPageDotRail";
import tvwHeroImg from "@/assets/banner_photos/TVW Inner Banner.JPG";

const FONT        = "'DM Sans',ui-sans-serif,system-ui,sans-serif";
const ACCENT_NAVY = "#0D1B3E";
const B_YELLOW    = "#F79425";
const B_BLUE      = "#135EA9";   // TVW primary
const B_BLUE_DARK = "#0d3a6e";
const B_BLUE_LIGHT = "#EEF4FF";
const BORDER      = "#e8e8f0";

const TVW_DRIVE = "https://drive.google.com/drive/folders/110-97fEP1DhitHy1LxRAoG2KagVsBNsU";

const DIAG: React.CSSProperties = {
  position: "absolute", inset: 0,
  backgroundImage: "repeating-linear-gradient(45deg,rgba(255,255,255,0.03) 1px,transparent 1px)",
  backgroundSize: "28px 28px",
  pointerEvents: "none",
};

const SECTIONS = [
  { id: "ckit-hero",    label: "Overview"  },
  { id: "ckit-tvw23",  label: "TVW 23"    },
  { id: "ckit-tvw24",  label: "TVW 24"    },
  { id: "ckit-tvw25",  label: "TVW 25"    },
];

// ── Edition history data ─────────────────────────────────────────────────────
const EDITIONS = [
  { id: "tvw23", label: "TVW 23", year: "2024", theme: "Volunteer. Connect. Transform.", volunteers: "18,000+", hours: "95,000+", active: false },
  { id: "tvw24", label: "TVW 24", year: "2025", theme: "Lead the Change", volunteers: "21,000+", hours: "1,10,000+", active: false },
  { id: "tvw25", label: "TVW 25", year: "2026", theme: "IVY League of Volunteers", volunteers: "Active edition", hours: "3–31 Mar 2026", active: true },
];

// ── Sub-components ────────────────────────────────────────────────────────────
function DefinerBar({ colour }: { colour: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [on, setOn] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setOn(true); }, { threshold: 0.4 });
    obs.observe(el); return () => obs.disconnect();
  }, []);
  return (
    <div ref={ref} style={{ height: 3, background: "#e8e8f0", borderRadius: 2, overflow: "hidden", width: 48, marginTop: 10 }}>
      <div style={{ height: "100%", background: colour, borderRadius: 2, transition: "width 0.65s cubic-bezier(0.22,1,0.36,1)", width: on ? "100%" : "0%" }} />
    </div>
  );
}

function DlBtn({ label, href, solid, accent }: { label: string; href: string; solid?: boolean; accent: string }) {
  const [hov, setHov] = useState(false);
  return (
    <a href={href} target="_blank" rel="noopener noreferrer"
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{
        display: "inline-flex", alignItems: "center", gap: 4,
        padding: "5px 10px", borderRadius: 6,
        fontFamily: FONT, fontSize: 10, fontWeight: 800, letterSpacing: "0.2px",
        textDecoration: "none",
        background: solid ? (hov ? B_BLUE_DARK : accent) : (hov ? B_BLUE_LIGHT : "transparent"),
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

function InfoTile({ accent, typeTag, thumbLabel, dims, minHeight = 140, inverted = false }: {
  accent: string; typeTag: string; thumbLabel: string; dims: string; minHeight?: number; inverted?: boolean;
}) {
  const bg      = inverted ? "#fff" : accent;
  const eyebrow = inverted ? accent + "99" : "rgba(255,255,255,0.65)";
  const heading = inverted ? accent : "#fff";
  const sub     = inverted ? accent + "88" : "rgba(255,255,255,0.55)";
  const topBar  = inverted ? accent + "55" : "rgba(255,255,255,0.35)";
  return (
    <div style={{
      position: "relative", width: "100%", minHeight, background: bg,
      borderRadius: 0, overflow: "hidden",
      display: "flex", flexDirection: "column", justifyContent: "space-between",
      padding: "18px 20px",
      backgroundImage: inverted
        ? `radial-gradient(circle, ${accent}18 1.5px, transparent 1.5px)`
        : "repeating-linear-gradient(45deg,rgba(255,255,255,0.025) 0px,rgba(255,255,255,0.025) 1px,transparent 1px,transparent 22px)",
      backgroundSize: inverted ? "16px 16px" : "22px 22px",
    }}>
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: topBar }} />
      <div style={{ fontFamily: FONT, fontSize: 11, fontWeight: 800, letterSpacing: "1.6px", textTransform: "uppercase", color: eyebrow }}>{typeTag}</div>
      <div style={{ fontFamily: FONT, fontSize: 22, fontWeight: 900, color: heading, letterSpacing: "-0.3px", lineHeight: 1.1 }}>{thumbLabel}</div>
      <div style={{ fontFamily: FONT, fontSize: 11, fontWeight: 600, color: sub, letterSpacing: "0.4px" }}>{dims}</div>
    </div>
  );
}

function AssetCard({ typeTag, accent, title, meta, thumbLabel, dims, links, inverted = false }: {
  typeTag: string; accent: string; title: string; meta: string; thumbLabel: string; dims: string;
  links: { label: string; href: string; solid?: boolean }[]; inverted?: boolean;
}) {
  const [hov, setHov] = useState(false);
  return (
    <div onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{
        background: "#fff", border: `1px solid ${BORDER}`, borderRadius: 14,
        overflow: "hidden", display: "flex", flexDirection: "column",
        boxShadow: hov ? "0 8px 24px rgba(13,27,62,0.10)" : "none",
        transform: hov ? "translateY(-3px)" : "translateY(0)",
        transition: "transform 0.18s, box-shadow 0.18s",
      }}
    >
      <InfoTile accent={accent} typeTag={typeTag} thumbLabel={thumbLabel} dims={dims} minHeight={140} inverted={inverted} />
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

function FeaturedCard({ typeTag, accent, sectionTag, title, desc, thumbLabel, dims, links }: {
  typeTag: string; accent: string; sectionTag: string; title: string; desc: string;
  thumbLabel: string; dims: string; links: { label: string; href: string; solid?: boolean }[];
}) {
  const [hov, setHov] = useState(false);
  return (
    <div onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{
        gridColumn: "span 2",
        display: "grid", gridTemplateColumns: "1fr 1fr",
        background: "#fff", border: `1px solid ${BORDER}`, borderRadius: 14,
        overflow: "hidden",
        boxShadow: hov ? "0 8px 24px rgba(13,27,62,0.10)" : "none",
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

function SectionHd({ label, accent, count, icon }: { label: string; accent: string; count: string; icon: React.ReactNode }) {
  return (
    <div style={{ maxWidth: 1100, margin: "0 auto", padding: "56px 56px 20px" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
        <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: accent, borderRadius: 10, padding: "7px 16px 7px 12px", fontFamily: FONT, fontSize: 12, fontWeight: 800, color: "#fff", whiteSpace: "nowrap" }}>
          {icon}{label}
        </div>
        <div style={{ flex: 1, height: 1.5, background: BORDER, borderRadius: 2 }} />
        <div style={{ fontFamily: FONT, fontSize: 11, fontWeight: 700, letterSpacing: "1.5px", textTransform: "uppercase", color: "#94a3b8" }}>{count}</div>
      </div>
    </div>
  );
}

// ── Edition section (repeatable) ─────────────────────────────────────────────
function EditionSection({ ed, assets }: {
  ed: typeof EDITIONS[0];
  assets: { typeTag: string; thumbLabel: string; dims: string; title: string; meta: string; links: { label: string; href: string; solid?: boolean }[]; featured?: boolean; sectionTag?: string; desc?: string; }[];
}) {
  const StarIcon = () => (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="white" strokeWidth="1.6" strokeLinecap="round">
      <path d="M7 2l1.5 4.5H13l-3.75 2.75L10.75 13 7 10.5 3.25 13l1.5-3.75L1 6.5h4.5z"/>
    </svg>
  );

  // Edition header with stats
  const headerEl = (
    <div style={{ maxWidth: 1100, margin: "0 auto", padding: "48px 56px 0" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 20 }}>
        <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: B_BLUE, borderRadius: 10, padding: "7px 16px 7px 12px", fontFamily: FONT, fontSize: 12, fontWeight: 800, color: "#fff", whiteSpace: "nowrap" }}>
          <StarIcon />{ed.label}
        </div>
        {ed.active && (
          <span style={{ fontFamily: FONT, fontSize: 9, fontWeight: 800, letterSpacing: "1.2px", textTransform: "uppercase", background: "#dcfce7", color: "#166534", padding: "4px 10px", borderRadius: 100 }}>
            Active Edition
          </span>
        )}
        <div style={{ flex: 1, height: 1.5, background: BORDER }} />
        <div style={{ fontFamily: FONT, fontSize: 11, fontWeight: 700, letterSpacing: "1.5px", textTransform: "uppercase", color: "#94a3b8" }}>{ed.year}</div>
      </div>

      {/* Theme + stats bar */}
      <div style={{ background: "#fff", border: `1px solid ${BORDER}`, borderRadius: 14, padding: "20px 24px", display: "flex", alignItems: "center", gap: 32, marginBottom: 0 }}>
        <div style={{ flex: 1 }}>
          <div style={{ fontFamily: FONT, fontSize: 10, fontWeight: 700, letterSpacing: "1.4px", textTransform: "uppercase", color: "#94a3b8", marginBottom: 4 }}>Edition theme</div>
          <div style={{ fontFamily: FONT, fontSize: 15, fontWeight: 800, color: ACCENT_NAVY }}>{ed.theme}</div>
        </div>
        <div style={{ width: 1, height: 40, background: BORDER }} />
        <div style={{ textAlign: "center" }}>
          <div style={{ fontFamily: FONT, fontSize: 22, fontWeight: 900, color: B_BLUE, letterSpacing: "-0.5px" }}>{ed.volunteers}</div>
          <div style={{ fontFamily: FONT, fontSize: 10, fontWeight: 700, color: "#64748b", letterSpacing: "0.5px", textTransform: "uppercase" }}>Volunteers</div>
        </div>
        <div style={{ width: 1, height: 40, background: BORDER }} />
        <div style={{ textAlign: "center" }}>
          <div style={{ fontFamily: FONT, fontSize: 22, fontWeight: 900, color: B_BLUE, letterSpacing: "-0.5px" }}>{ed.hours}</div>
          <div style={{ fontFamily: FONT, fontSize: 10, fontWeight: 700, color: "#64748b", letterSpacing: "0.5px", textTransform: "uppercase" }}>Hours / Window</div>
        </div>
      </div>
    </div>
  );

  // Featured + regular assets
  const featured = assets.find(a => a.featured);
  const regular  = assets.filter(a => !a.featured);

  return (
    <div id={`ckit-${ed.id}`}>
      {headerEl}
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "20px 56px 0" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 16 }}>
          {featured && (
            <FeaturedCard
              typeTag={featured.typeTag} accent={B_BLUE}
              sectionTag={`${ed.label} · Campaign Poster`}
              title={featured.title} desc={featured.desc!}
              thumbLabel={featured.thumbLabel} dims={featured.dims}
              links={featured.links}
            />
          )}
          {regular.map((c, i) => (
            <AssetCard key={i} typeTag={c.typeTag} accent={B_BLUE}
              title={c.title} meta={c.meta}
              thumbLabel={c.thumbLabel} dims={c.dims}
              links={c.links} inverted={i % 2 === 1}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Asset data per edition ───────────────────────────────────────────────────
const TVW23_ASSETS = [
  { featured: true, typeTag: "Poster", thumbLabel: "TVW23 Main Poster", dims: "A4 · Portrait",
    title: "Tata Volunteering Week 23 — Main Poster",
    desc: "Primary TVW23 campaign poster. Use for office displays, intranet, and internal communications.",
    sectionTag: "TVW23 · Campaign Poster",
    links: [{ label: "Download PNG", href: TVW_DRIVE, solid: true }, { label: "Download PDF", href: TVW_DRIVE }] },
  { typeTag: "Poster",  thumbLabel: "Portrait B",       dims: "A4 · Portrait",  title: "TVW23 Poster — Portrait B",        meta: "Secondary portrait variant. A4 print and digital-screen ready.",              links: [{ label: "PNG", href: TVW_DRIVE, solid: true }, { label: "PDF", href: TVW_DRIVE }] },
  { typeTag: "Social",  thumbLabel: "Social Square",     dims: "1080 × 1080",   title: "TVW23 Social Media Square",         meta: "1080×1080 for LinkedIn, Instagram and Yammer posts.",                        links: [{ label: "PNG", href: TVW_DRIVE, solid: true }] },
  { typeTag: "Banner",  thumbLabel: "Landscape Banner",  dims: "1200 × 628",    title: "TVW23 Landscape Banner",            meta: "Email headers, intranet banners, digital displays.",                         links: [{ label: "PNG", href: TVW_DRIVE, solid: true }, { label: "PDF", href: TVW_DRIVE }] },
  { typeTag: "Story",   thumbLabel: "Story Format",      dims: "1080 × 1920",   title: "TVW23 Instagram / WhatsApp Story",  meta: "1080×1920 vertical format for Stories and WhatsApp status.",                links: [{ label: "PNG", href: TVW_DRIVE, solid: true }] },
  { typeTag: "Guide",   thumbLabel: "DIY Guide",         dims: "PDF · A4",      title: "TVW23 DIY Activity Guide",          meta: "Step-by-step guide for volunteers running independent DIY activities.",      links: [{ label: "PDF", href: TVW_DRIVE, solid: true }] },
];

const TVW24_ASSETS = [
  { featured: true, typeTag: "Poster", thumbLabel: "TVW24 Main Poster", dims: "A4 · Portrait",
    title: "Tata Volunteering Week 24 — Main Poster",
    desc: "Primary TVW24 poster for the Lead the Change edition. Use for office displays, intranet, and internal communications.",
    sectionTag: "TVW24 · Campaign Poster",
    links: [{ label: "Download PNG", href: TVW_DRIVE, solid: true }, { label: "Download PDF", href: TVW_DRIVE }] },
  { typeTag: "Poster",  thumbLabel: "Portrait B",       dims: "A4 · Portrait",  title: "TVW24 Poster — Portrait B",        meta: "Secondary portrait variant. A4 print and digital-screen ready.",              links: [{ label: "PNG", href: TVW_DRIVE, solid: true }, { label: "PDF", href: TVW_DRIVE }] },
  { typeTag: "Social",  thumbLabel: "Social Square",     dims: "1080 × 1080",   title: "TVW24 Social Media Square",         meta: "1080×1080 for LinkedIn, Instagram and Yammer posts.",                        links: [{ label: "PNG", href: TVW_DRIVE, solid: true }] },
  { typeTag: "Banner",  thumbLabel: "Landscape Banner",  dims: "1200 × 628",    title: "TVW24 Landscape Banner",            meta: "Email headers, intranet banners, digital displays.",                         links: [{ label: "PNG", href: TVW_DRIVE, solid: true }, { label: "PDF", href: TVW_DRIVE }] },
  { typeTag: "Story",   thumbLabel: "Story Format",      dims: "1080 × 1920",   title: "TVW24 Instagram / WhatsApp Story",  meta: "1080×1920 vertical format for Stories and WhatsApp status.",                links: [{ label: "PNG", href: TVW_DRIVE, solid: true }] },
  { typeTag: "Display", thumbLabel: "Screensaver",       dims: "1920 × 1080",   title: "TVW24 Laptop / Screen Wallpaper",   meta: "Desktop wallpaper for employee devices. 1920×1080 resolution.",             links: [{ label: "PNG", href: TVW_DRIVE, solid: true }] },
];

const TVW25_ASSETS = [
  { featured: true, typeTag: "Poster", thumbLabel: "TVW25 Main Poster", dims: "A4 · Portrait",
    title: "Tata Volunteering Week 25 — Main Poster",
    desc: "Primary TVW25 campaign poster featuring the IVY League of Volunteers theme. Use for office displays, intranet, and internal communications.",
    sectionTag: "TVW25 · Campaign Poster",
    links: [{ label: "Download PNG", href: TVW_DRIVE, solid: true }, { label: "Download PDF", href: TVW_DRIVE }] },
  { typeTag: "Poster",  thumbLabel: "Portrait B",        dims: "A4 · Portrait",  title: "TVW25 Poster — Portrait B",           meta: "Secondary portrait variant. A4 print and digital-screen ready.",              links: [{ label: "PNG", href: TVW_DRIVE, solid: true }, { label: "PDF", href: TVW_DRIVE }] },
  { typeTag: "Social",  thumbLabel: "Social Square A",   dims: "1080 × 1080",    title: "TVW25 Social Media Square A",          meta: "1080×1080 for LinkedIn and Instagram promoting TVW25.",                       links: [{ label: "PNG", href: TVW_DRIVE, solid: true }] },
  { typeTag: "Social",  thumbLabel: "Social Square B",   dims: "1080 × 1080",    title: "TVW25 Social Media Square B",          meta: "Alternate square layout — different visual treatment to Option A.",           links: [{ label: "PNG", href: TVW_DRIVE, solid: true }] },
  { typeTag: "Banner",  thumbLabel: "Landscape Banner",  dims: "1920 × 1080",    title: "TVW25 Landscape Banner",               meta: "Wide format for email headers, intranet and digital boards.",                links: [{ label: "PNG", href: TVW_DRIVE, solid: true }, { label: "PDF", href: TVW_DRIVE }] },
  { typeTag: "Story",   thumbLabel: "Story Format",      dims: "1080 × 1920",    title: "TVW25 Instagram Story",                meta: "1080×1920 vertical for Instagram Stories and WhatsApp status.",              links: [{ label: "PNG", href: TVW_DRIVE, solid: true }] },
  { typeTag: "Display", thumbLabel: "Screensaver",       dims: "1920 × 1080",    title: "TVW25 Laptop / Screen Wallpaper",      meta: "Desktop wallpaper for employee devices. 1920×1080 resolution.",             links: [{ label: "PNG", href: TVW_DRIVE, solid: true }] },
  { typeTag: "Email",   thumbLabel: "Email Header",      dims: "1200 × 400",     title: "TVW25 Email Campaign Header",          meta: "For internal email announcements and TVW25 newsletters.",                    links: [{ label: "PNG", href: TVW_DRIVE, solid: true }] },
  { typeTag: "Guide",   thumbLabel: "DIY Guide",         dims: "PDF · A4",       title: "TVW25 DIY Activity Guide",             meta: "Step-by-step guide for volunteers running independent DIY activities.",      links: [{ label: "PDF", href: "https://tataengage.com/TVW25/PDF/TVW25_DIY_Guide.pdf", solid: true }] },
];

// ── Main component ────────────────────────────────────────────────────────────
export default function TVWCampaignKitView() {
  return (
    <div style={{ fontFamily: FONT, background: "#f5f5fa", minHeight: "100vh" }}>

      {/* Top accent line */}
      <div style={{ height: 3, background: B_BLUE, width: "100%" }} />

      <SubPageDotRail sections={SECTIONS} accentColour={B_BLUE} />

      {/* ── HERO ── */}
      <div id="ckit-hero" style={{ position: "relative", minHeight: "92vh", overflow: "hidden", display: "flex", alignItems: "center", paddingTop: 64 }}>
        <img src={tvwHeroImg} alt="" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "center" }} />
        <div style={{ position: "absolute", inset: 0, background: `linear-gradient(110deg,${B_BLUE}e8 0%,${B_BLUE}cc 38%,${B_BLUE}aa 58%,${B_BLUE}77 78%,${B_BLUE}44 100%)` }} />
        <div style={DIAG} />

        <div style={{ position: "relative", zIndex: 1, maxWidth: 1100, margin: "0 auto", padding: "0 64px", width: "100%", display: "grid", gridTemplateColumns: "1.2fr 0.8fr", gap: 56, alignItems: "center" }}>

          {/* Left */}
          <div>
            <p style={{ fontFamily: FONT, fontSize: 11, fontWeight: 700, letterSpacing: "1.6px", textTransform: "uppercase", color: "rgba(255,255,255,0.65)", margin: "0 0 12px" }}>
              Tata Sustainability Group · Tata Volunteering Week
            </p>
            <div style={{ height: 2, width: 48, borderRadius: 2, background: "rgba(255,255,255,0.6)", margin: "0 0 22px" }} />
            <h1 style={{ fontFamily: FONT, fontSize: "clamp(2.4rem,5vw,3.8rem)", fontWeight: 400, color: "#fff", lineHeight: 1.12, letterSpacing: "-0.5px", margin: "0 0 18px" }}>
              TVW Campaign Kit
            </h1>
            <p style={{ fontFamily: FONT, fontSize: 15, fontWeight: 300, lineHeight: 1.7, color: "rgba(255,255,255,0.65)", margin: "0 0 32px", maxWidth: 480 }}>
              Download official TVW creative assets — posters, social media graphics, banners, DIY guides — to amplify participation across your company.
            </p>
            <a href="mailto:tataengage@tata.com" style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              background: B_YELLOW, color: ACCENT_NAVY, borderRadius: 10, padding: "14px 28px",
              fontFamily: FONT, fontSize: 14, fontWeight: 800, textDecoration: "none",
              boxShadow: "0 4px 20px rgba(13,27,62,0.25)",
            }}>
              Request custom assets
            </a>
          </div>

          {/* Right — edition summary */}
          <div style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.14)", borderRadius: 16, padding: 28, position: "relative", overflow: "hidden" }}>
            <div style={DIAG} />
            <div style={{ fontFamily: FONT, display: "inline-block", background: B_YELLOW, color: ACCENT_NAVY, fontSize: 9, fontWeight: 900, letterSpacing: "1.5px", textTransform: "uppercase", padding: "4px 10px", borderRadius: 100, marginBottom: 16, position: "relative", zIndex: 1 }}>
              3 editions available
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10, position: "relative", zIndex: 1 }}>
              {EDITIONS.map((ed, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 10, padding: "10px 14px" }}>
                  <div style={{ width: 8, height: 8, borderRadius: "50%", background: ed.active ? "#4ade80" : "rgba(255,255,255,0.4)", flexShrink: 0 }} />
                  <span style={{ fontFamily: FONT, fontSize: 13, fontWeight: 700, color: "rgba(255,255,255,0.85)" }}>{ed.label} · {ed.year}</span>
                  {ed.active && <span style={{ marginLeft: "auto", fontFamily: FONT, fontSize: 9, fontWeight: 800, letterSpacing: "1px", textTransform: "uppercase", color: "#4ade80" }}>Active</span>}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── EDITIONS ── */}
      <EditionSection ed={EDITIONS[0]} assets={TVW23_ASSETS} />
      <EditionSection ed={EDITIONS[1]} assets={TVW24_ASSETS} />
      <EditionSection ed={EDITIONS[2]} assets={TVW25_ASSETS} />

      {/* ── INFO STRIP ── */}
      <div style={{ maxWidth: 1100, margin: "40px auto 0", padding: "0 56px" }}>
        <div style={{ background: B_BLUE, borderRadius: 14, padding: "22px 28px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 24 }}>
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

      <div style={{ height: 80 }} />
    </div>
  );
}
