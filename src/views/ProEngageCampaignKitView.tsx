import React, { useEffect, useRef, useState } from "react";
import SubPageDotRail from "@/components/shared/SubPageDotRail";
import peHeroImg from "@/assets/banner_photos/Inner Page ProEngage banner.jpg";

const FONT         = "'DM Sans',ui-sans-serif,system-ui,sans-serif";
const ACCENT_NAVY  = "#0D1B3E";
const B_YELLOW     = "#F79425";
const COLOUR       = "#803998";   // ProEngage purple
const COLOUR_DARK  = "#4a1f5c";
const COLOUR_LIGHT = "#F3EEFF";
const BORDER       = "#e8e8f0";

const PE_DRIVE = "https://drive.google.com/drive/folders/1yH2VG6bEHYN6I0f8-eAMdnI6pCmVqbBb";

const DIAG: React.CSSProperties = {
  position: "absolute", inset: 0,
  backgroundImage: "repeating-linear-gradient(45deg,rgba(255,255,255,0.03) 1px,transparent 1px)",
  backgroundSize: "28px 28px",
  pointerEvents: "none",
};

const SECTIONS = [
  { id: "ckit-hero",  label: "Overview" },
  { id: "ckit-pe24",  label: "PE 24"    },
  { id: "ckit-pe23",  label: "PE 23"    },
  { id: "ckit-pe22",  label: "PE 22"    },
];

// ── Edition history data ─────────────────────────────────────────────────────
const EDITIONS = [
  { id: "pe22", label: "ProEngage 22", year: "2023", theme: "Skills for Good", volunteers: "4,200+", projects: "310+", active: false },
  { id: "pe23", label: "ProEngage 23", year: "2024", theme: "Volunteer Your Skills to Help NGOs", volunteers: "5,800+", projects: "420+", active: false },
  { id: "pe24", label: "ProEngage 24", year: "2025", theme: "Be a ProEngager. Help NGOs in Need.", volunteers: "Active edition", projects: "Open", active: true },
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

// ── Edition section ───────────────────────────────────────────────────────────
function EditionSection({ ed, assets }: {
  ed: typeof EDITIONS[0];
  assets: { typeTag: string; thumbLabel: string; dims: string; title: string; meta: string; links: { label: string; href: string; solid?: boolean }[]; featured?: boolean; sectionTag?: string; desc?: string; }[];
}) {
  const HexIcon = () => (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="white" strokeWidth="1.4" strokeLinecap="round">
      <polygon points="7,1 13,4 13,10 7,13 1,10 1,4"/>
    </svg>
  );

  const featured = assets.find(a => a.featured);
  const regular  = assets.filter(a => !a.featured);

  return (
    <div id={`ckit-${ed.id}`}>
      {/* Edition header — label + year only */}
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "48px 56px 0" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 20 }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: COLOUR, borderRadius: 10, padding: "7px 16px 7px 12px", fontFamily: FONT, fontSize: 12, fontWeight: 800, color: "#fff", whiteSpace: "nowrap" }}>
            <HexIcon />{ed.label}
          </div>
          {ed.active && (
            <span style={{ fontFamily: FONT, fontSize: 9, fontWeight: 800, letterSpacing: "1.2px", textTransform: "uppercase", background: "#dcfce7", color: "#166534", padding: "4px 10px", borderRadius: 100 }}>
              Active Edition
            </span>
          )}
          <div style={{ flex: 1, height: 1.5, background: BORDER }} />
          <div style={{ fontFamily: FONT, fontSize: 11, fontWeight: 700, letterSpacing: "1.5px", textTransform: "uppercase", color: "#94a3b8" }}>{ed.year}</div>
        </div>
      </div>

      {/* Asset grid */}
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "20px 56px 0" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 16 }}>
          {featured && (
            <FeaturedCard
              typeTag={featured.typeTag} accent={COLOUR}
              sectionTag={`${ed.label} · Campaign Poster`}
              title={featured.title} desc={featured.desc!}
              thumbLabel={featured.thumbLabel} dims={featured.dims}
              links={featured.links}
            />
          )}
          {regular.map((c, i) => (
            <AssetCard key={i} typeTag={c.typeTag} accent={COLOUR}
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

// ── Asset data per edition ────────────────────────────────────────────────────
const PE22_ASSETS = [
  { featured: true, typeTag: "Poster", thumbLabel: "PE22 Reminder 2", dims: "A4 · Portrait",
    title: "ProEngage 22 — Reminder Mailer 2",
    desc: "Primary PE22 reminder mailer. Use on office displays, intranet, internal screens and team communications to drive volunteer registrations.",
    links: [{ label: "Download HTML", href: PE_DRIVE, solid: true }, { label: "Download PDF", href: PE_DRIVE }, { label: "Download JPG", href: PE_DRIVE }] },
  { typeTag: "Poster",  thumbLabel: "PE22 Reminder 1",      dims: "A4 · Portrait",  title: "ProEngage 22 — Reminder Mailer 1",    meta: "First PE22 reminder mailer for internal communications.",       links: [{ label: "HTML", href: PE_DRIVE, solid: true }, { label: "Download AI", href: PE_DRIVE }, { label: "JPG", href: PE_DRIVE }] },
  { typeTag: "Poster",  thumbLabel: "PE22 Promo 4",         dims: "A4 · Portrait",  title: "ProEngage 22 — Promotional Mailer 4", meta: "Fourth promotional mailer — A4 print and digital-screen ready.", links: [{ label: "HTML", href: PE_DRIVE, solid: true }, { label: "PDF", href: PE_DRIVE }, { label: "JPG", href: PE_DRIVE }] },
  { typeTag: "Poster",  thumbLabel: "PE22 Promo 2",         dims: "A4 · Portrait",  title: "ProEngage 22 — Promotional Mailer 2", meta: "Second promotional mailer. Suitable for WhatsApp and internal messaging.", links: [{ label: "HTML", href: PE_DRIVE, solid: true }, { label: "AI", href: PE_DRIVE }, { label: "PDF", href: PE_DRIVE }, { label: "JPG", href: PE_DRIVE }] },
  { typeTag: "Poster",  thumbLabel: "PE22 Promo 3",         dims: "A4 · Portrait",  title: "ProEngage 22 — Promotional Mailer 3", meta: "Third promotional mailer variant.",                              links: [{ label: "HTML", href: PE_DRIVE, solid: true }, { label: "PDF", href: PE_DRIVE }, { label: "JPG", href: PE_DRIVE }] },
  { typeTag: "Social",  thumbLabel: "LinkedIn Post",         dims: "1080 × 1080",   title: "LinkedIn Post — ProEngage 22",         meta: "1080×1080 for LinkedIn and Yammer posts.",                      links: [{ label: "PNG", href: PE_DRIVE, solid: true }] },
  { typeTag: "Email",   thumbLabel: "Email Header",          dims: "1200 × 400",    title: "ProEngage 22 Email Campaign Header",   meta: "For internal email announcements and PE22 newsletters.",        links: [{ label: "PNG", href: PE_DRIVE, solid: true }] },
];

const PE23_ASSETS = [
  { featured: true, typeTag: "Poster", thumbLabel: "PE23 Main Poster", dims: "A4 · Portrait",
    title: "ProEngage 23 — Promotional Mailer A",
    desc: "Primary PE23 campaign poster. Use on office notice boards, internal screens, intranet pages and team communications to drive volunteer registrations.",
    links: [{ label: "Download PNG", href: PE_DRIVE, solid: true }, { label: "Download PDF", href: PE_DRIVE }] },
  { typeTag: "Poster",  thumbLabel: "PE23 Promo B",          dims: "A4 · Portrait",  title: "ProEngage 23 — Promotional Mailer B", meta: "Secondary portrait variant. A4 print and digital-screen ready.", links: [{ label: "PNG", href: PE_DRIVE, solid: true }, { label: "PDF", href: PE_DRIVE }] },
  { typeTag: "Poster",  thumbLabel: "PE23 Promo C",          dims: "A4 · Portrait",  title: "ProEngage 23 — Promotional Mailer C", meta: "Third promotional variant. Suitable for WhatsApp and internal messaging.", links: [{ label: "PNG", href: PE_DRIVE, solid: true }, { label: "PDF", href: PE_DRIVE }] },
  { typeTag: "Banner",  thumbLabel: "Landscape Banner",       dims: "1200 × 628",    title: "PE23 Banner — Landscape A",            meta: "Email headers, intranet banners, digital displays. 1200×628.",  links: [{ label: "PNG", href: PE_DRIVE, solid: true }, { label: "PDF", href: PE_DRIVE }] },
  { typeTag: "Social",  thumbLabel: "Social Square A",        dims: "1080 × 1080",   title: "PE23 Social Media Square A",           meta: "1080×1080 for LinkedIn, Instagram and Yammer posts.",           links: [{ label: "PNG", href: PE_DRIVE, solid: true }, { label: "JPG", href: PE_DRIVE }] },
  { typeTag: "Social",  thumbLabel: "Social Square B",        dims: "1080 × 1080",   title: "PE23 Social Media Square B",           meta: "Alternate square layout. Different visual treatment to Option A.", links: [{ label: "PNG", href: PE_DRIVE, solid: true }, { label: "JPG", href: PE_DRIVE }] },
  { typeTag: "Story",   thumbLabel: "Story Format",           dims: "1080 × 1920",   title: "PE23 Instagram / WhatsApp Story",       meta: "1080×1920 vertical format for Instagram Stories and WhatsApp status.", links: [{ label: "PNG", href: PE_DRIVE, solid: true }] },
  { typeTag: "Display", thumbLabel: "Screensaver",            dims: "1920 × 1080",   title: "PE23 Laptop / Screen Wallpaper",        meta: "Desktop wallpaper for employee devices. 1920×1080 resolution.", links: [{ label: "PNG", href: PE_DRIVE, solid: true }] },
];

const PE24_ASSETS = [
  { featured: true, typeTag: "Poster", thumbLabel: "PE24 Main Poster", dims: "A4 · Portrait",
    title: "ProEngage 24 — Primary Recruitment Poster",
    desc: "Primary recruitment poster for ProEngage 24. Use on office notice boards, internal screens, intranet pages and team communications to drive volunteer registrations.",
    links: [{ label: "Download PNG", href: PE_DRIVE, solid: true }, { label: "Download PDF", href: PE_DRIVE }] },
  { typeTag: "Poster",  thumbLabel: "PE24 Portrait B",        dims: "A4 · Portrait",  title: "ProEngage 24 — Portrait B",            meta: "Secondary portrait variant. A4 print and digital-screen ready.", links: [{ label: "PNG", href: PE_DRIVE, solid: true }, { label: "PDF", href: PE_DRIVE }] },
  { typeTag: "Poster",  thumbLabel: "PE24 Portrait C",        dims: "A4 · Portrait",  title: "ProEngage 24 — Portrait C",            meta: "Third portrait variant. Suitable for WhatsApp and internal messaging.", links: [{ label: "PNG", href: PE_DRIVE, solid: true }, { label: "PDF", href: PE_DRIVE }] },
  { typeTag: "Banner",  thumbLabel: "Landscape Banner A",     dims: "1200 × 628",    title: "PE24 Banner — Landscape A",             meta: "Email headers, intranet banners, digital displays. 1200×628.",  links: [{ label: "PNG", href: PE_DRIVE, solid: true }, { label: "PDF", href: PE_DRIVE }] },
  { typeTag: "Social",  thumbLabel: "Social Square A",        dims: "1080 × 1080",   title: "PE24 Social Media Square A",            meta: "1080×1080 for LinkedIn, Instagram and Yammer posts.",           links: [{ label: "PNG", href: PE_DRIVE, solid: true }, { label: "JPG", href: PE_DRIVE }] },
  { typeTag: "Social",  thumbLabel: "Social Square B",        dims: "1080 × 1080",   title: "PE24 Social Media Square B",            meta: "Alternate square layout. Different visual treatment to Option A.", links: [{ label: "PNG", href: PE_DRIVE, solid: true }, { label: "JPG", href: PE_DRIVE }] },
  { typeTag: "Story",   thumbLabel: "Story Format",           dims: "1080 × 1920",   title: "PE24 Instagram / WhatsApp Story",        meta: "1080×1920 vertical for Instagram Stories and WhatsApp status.", links: [{ label: "PNG", href: PE_DRIVE, solid: true }] },
  { typeTag: "Display", thumbLabel: "Screensaver",            dims: "1920 × 1080",   title: "PE24 Laptop / Screen Wallpaper",         meta: "Desktop wallpaper for employee devices. 1920×1080 resolution.", links: [{ label: "PNG", href: PE_DRIVE, solid: true }] },
  { typeTag: "Email",   thumbLabel: "Email Header",           dims: "1200 × 400",    title: "PE24 Email Campaign Header",             meta: "For internal email announcements and PE24 newsletters.",        links: [{ label: "PNG", href: PE_DRIVE, solid: true }] },
  { typeTag: "Template",thumbLabel: "Ambassador PPT",         dims: "PPT · 16:9",    title: "PE24 Ambassador Template",               meta: "PowerPoint template for ProEngage Ambassadors and SPOCs.",     links: [{ label: "PPT", href: PE_DRIVE, solid: true }, { label: "PDF", href: PE_DRIVE }] },
  { typeTag: "Template",thumbLabel: "Senior Leader PPT",      dims: "PPT · 16:9",    title: "PE24 Senior Leader Cascade Template",    meta: "Presentation template for senior leader cascade communications.", links: [{ label: "PPT", href: PE_DRIVE, solid: true }] },
];

// ── Main component ────────────────────────────────────────────────────────────
export default function ProEngageCampaignKitView() {
  return (
    <div style={{ fontFamily: FONT, background: "#f5f5fa", minHeight: "100vh" }}>

      {/* Top accent line */}
      <div style={{ height: 3, background: COLOUR, width: "100%" }} />

      <SubPageDotRail sections={SECTIONS} accentColour={COLOUR} />

      {/* ── HERO ── */}
      <div id="ckit-hero" style={{ position: "relative", minHeight: "92vh", overflow: "hidden", display: "flex", alignItems: "center", paddingTop: 64 }}>
        <img src={peHeroImg} alt="" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "center" }} />
        <div style={{ position: "absolute", inset: 0, background: `linear-gradient(110deg,${COLOUR}e8 0%,${COLOUR}cc 38%,${COLOUR}aa 58%,${COLOUR}77 78%,${COLOUR}44 100%)` }} />
        <div style={DIAG} />

        <div style={{ position: "relative", zIndex: 1, maxWidth: 1100, margin: "0 auto", padding: "0 64px", width: "100%" }}>

          {/* Left */}
          <div style={{ maxWidth: 560 }}>
            <p style={{ fontFamily: FONT, fontSize: 11, fontWeight: 700, letterSpacing: "1.6px", textTransform: "uppercase", color: "rgba(255,255,255,0.65)", margin: "0 0 12px" }}>
              Tata Engage · Skill-Based Volunteering
            </p>
            <div style={{ height: 2, width: 48, borderRadius: 2, background: "rgba(255,255,255,0.6)", margin: "0 0 22px" }} />
            <h1 style={{ fontFamily: FONT, fontSize: "clamp(2.4rem,5vw,3.8rem)", fontWeight: 400, color: "#fff", lineHeight: 1.12, letterSpacing: "-0.5px", margin: "0 0 18px" }}>
              ProEngage Campaign Kit
            </h1>
            <p style={{ fontFamily: FONT, fontSize: 15, fontWeight: 300, lineHeight: 1.7, color: "rgba(255,255,255,0.65)", margin: "0 0 32px", maxWidth: 480 }}>
              Download and share official ProEngage creative assets — posters, social media graphics, banners, ambassador templates, and more — to amplify participation across your company.
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

        </div>
      </div>

      {/* ── EDITIONS — latest first ── */}
      <EditionSection ed={EDITIONS[2]} assets={PE24_ASSETS} />
      <EditionSection ed={EDITIONS[1]} assets={PE23_ASSETS} />
      <EditionSection ed={EDITIONS[0]} assets={PE22_ASSETS} />

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

      <div style={{ height: 80 }} />
    </div>
  );
}
