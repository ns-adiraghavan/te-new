import React, { useEffect, useRef, useState } from "react";
import SubPageDotRail from "@/components/shared/SubPageDotRail";
import tsmHeroImg from "@/assets/homepagebanner/Tata Daewoo.jpg";

const FONT         = "'DM Sans',ui-sans-serif,system-ui,sans-serif";
const ACCENT_NAVY  = "#0D1B3E";
const B_YELLOW     = "#F79425";
const COLOUR       = "#C3DB6F";   // TSM olive-lime
const COLOUR_DARK  = "#7a9a18";
const COLOUR_LIGHT = "#f2f8dc";
const BORDER       = "#e8e8f0";

const TSM_DRIVE = "https://drive.google.com/drive/folders/1yH2VG6bEHYN6I0f8-eAMdnI6pCmVqbBb";

const DIAG: React.CSSProperties = {
  position: "absolute", inset: 0,
  backgroundImage: "repeating-linear-gradient(45deg,rgba(255,255,255,0.03) 1px,transparent 1px)",
  backgroundSize: "28px 28px",
  pointerEvents: "none",
};

const SECTIONS = [
  { id: "ckit-hero",   label: "Overview" },
  { id: "ckit-tsm23",  label: "TSM 23"   },
  { id: "ckit-tsm24",  label: "TSM 24"   },
  { id: "ckit-tsm25",  label: "TSM 25"   },
];

const EDITIONS = [
  { id: "tsm23", label: "TSM 23", year: "2023", theme: "Demystifying Sustainability", volunteers: "12,000+", activities: "180+", active: false },
  { id: "tsm24", label: "TSM 24", year: "2024", theme: "Decarbonize. Restore. Sustain.", volunteers: "16,000+", activities: "240+", active: false },
  { id: "tsm25", label: "TSM 25", year: "2025", theme: "Resource Efficiency & Biodiversity", volunteers: "Active edition", activities: "Open", active: true },
];

// ── Sub-components ────────────────────────────────────────────────────────────
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
        color: solid ? ACCENT_NAVY : COLOUR_DARK,
        border: `1.5px solid ${solid ? accent : accent + "55"}`,
        transition: "all 0.15s",
      }}
    >
      {solid && (
        <svg width="9" height="9" viewBox="0 0 12 12" fill="none" stroke={ACCENT_NAVY} strokeWidth="1.7" strokeLinecap="round">
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
  // TSM: solid accent = olive on dark overlay, inverted = white bg with olive text
  const bg      = inverted ? "#fff" : ACCENT_NAVY;
  const eyebrow = inverted ? COLOUR_DARK + "bb" : "rgba(195,219,111,0.65)";
  const heading = inverted ? ACCENT_NAVY : COLOUR;
  const sub     = inverted ? "#94a3b8" : "rgba(195,219,111,0.5)";
  const topBar  = inverted ? accent + "55" : accent;
  return (
    <div style={{
      position: "relative", width: "100%", minHeight, background: bg,
      borderRadius: 0, overflow: "hidden",
      display: "flex", flexDirection: "column", justifyContent: "space-between",
      padding: "18px 20px",
      backgroundImage: inverted
        ? `radial-gradient(circle, ${accent}18 1.5px, transparent 1.5px)`
        : "repeating-linear-gradient(45deg,rgba(195,219,111,0.04) 0px,rgba(195,219,111,0.04) 1px,transparent 1px,transparent 22px)",
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
        <div style={{ fontFamily: FONT, fontSize: 10, fontWeight: 800, letterSpacing: "1.2px", textTransform: "uppercase", color: COLOUR_DARK, marginBottom: 8 }}>{sectionTag}</div>
        <div style={{ fontFamily: FONT, fontSize: 15, fontWeight: 900, color: ACCENT_NAVY, lineHeight: 1.3, marginBottom: 8 }}>{title}</div>
        <p style={{ fontFamily: FONT, fontSize: 12, color: "#475569", lineHeight: 1.65, marginBottom: 16 }}>{desc}</p>
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
          {links.map((l, i) => <DlBtn key={i} label={l.label} href={l.href} solid={l.solid} accent={accent} />)}
        </div>
      </div>
    </div>
  );
}

function LeafIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke={ACCENT_NAVY} strokeWidth="1.5" strokeLinecap="round">
      <path d="M2 12c2-4 4-8 10-10C12 8 8 10 2 12z"/>
      <path d="M2 12l4-4"/>
    </svg>
  );
}

function EditionSection({ ed, assets }: {
  ed: typeof EDITIONS[0];
  assets: { typeTag: string; thumbLabel: string; dims: string; title: string; meta: string; links: { label: string; href: string; solid?: boolean }[]; featured?: boolean; sectionTag?: string; desc?: string; }[];
}) {
  const featured = assets.find(a => a.featured);
  const regular  = assets.filter(a => !a.featured);
  return (
    <div id={`ckit-${ed.id}`}>
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "48px 56px 0" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 20 }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: COLOUR, borderRadius: 10, padding: "7px 16px 7px 12px", fontFamily: FONT, fontSize: 12, fontWeight: 800, color: ACCENT_NAVY, whiteSpace: "nowrap" }}>
            <LeafIcon />{ed.label}
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
            <div style={{ fontFamily: FONT, fontSize: 22, fontWeight: 900, color: COLOUR_DARK, letterSpacing: "-0.5px" }}>{ed.volunteers}</div>
            <div style={{ fontFamily: FONT, fontSize: 10, fontWeight: 700, color: "#64748b", letterSpacing: "0.5px", textTransform: "uppercase" }}>Volunteers</div>
          </div>
          <div style={{ width: 1, height: 40, background: BORDER }} />
          <div style={{ textAlign: "center" }}>
            <div style={{ fontFamily: FONT, fontSize: 22, fontWeight: 900, color: COLOUR_DARK, letterSpacing: "-0.5px" }}>{ed.activities}</div>
            <div style={{ fontFamily: FONT, fontSize: 10, fontWeight: 700, color: "#64748b", letterSpacing: "0.5px", textTransform: "uppercase" }}>Activities</div>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "20px 56px 0" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 16 }}>
          {featured && (
            <FeaturedCard typeTag={featured.typeTag} accent={COLOUR}
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

// ── Asset data ────────────────────────────────────────────────────────────────
const TSM23_ASSETS = [
  { featured: true, typeTag: "Poster", thumbLabel: "TSM23 Main Poster", dims: "A4 · Portrait",
    title: "Tata Sustainability Month 23 — Main Poster",
    desc: "Primary TSM23 campaign poster. Use for office displays, intranet, and internal communications to drive participation.",
    links: [{ label: "Download PNG", href: TSM_DRIVE, solid: true }, { label: "Download PDF", href: TSM_DRIVE }] },
  { typeTag: "Poster",  thumbLabel: "Portrait B",       dims: "A4 · Portrait",  title: "TSM23 Poster — Portrait B",       meta: "Secondary portrait variant. A4 print and digital-screen ready.",              links: [{ label: "PNG", href: TSM_DRIVE, solid: true }, { label: "PDF", href: TSM_DRIVE }] },
  { typeTag: "Social",  thumbLabel: "Social Square",     dims: "1080 × 1080",   title: "TSM23 Social Media Square",        meta: "1080×1080 for LinkedIn, Instagram and Yammer posts.",                        links: [{ label: "PNG", href: TSM_DRIVE, solid: true }] },
  { typeTag: "Banner",  thumbLabel: "Landscape Banner",  dims: "1200 × 628",    title: "TSM23 Landscape Banner",           meta: "Email headers, intranet banners, digital displays.",                         links: [{ label: "PNG", href: TSM_DRIVE, solid: true }, { label: "PDF", href: TSM_DRIVE }] },
  { typeTag: "Story",   thumbLabel: "Story Format",      dims: "1080 × 1920",   title: "TSM23 Instagram / WhatsApp Story", meta: "1080×1920 vertical for Instagram Stories and WhatsApp status.",              links: [{ label: "PNG", href: TSM_DRIVE, solid: true }] },
  { typeTag: "Guide",   thumbLabel: "DIY Kit",           dims: "PDF · A4",      title: "TSM23 DIY Activity Kit",           meta: "Ideas and guides for running independent sustainability activities.",         links: [{ label: "PDF", href: TSM_DRIVE, solid: true }] },
];

const TSM24_ASSETS = [
  { featured: true, typeTag: "Poster", thumbLabel: "TSM24 Main Poster", dims: "A4 · Portrait",
    title: "Tata Sustainability Month 24 — Main Poster",
    desc: "Primary TSM24 campaign poster for the Decarbonize. Restore. Sustain. theme. For office displays, intranet, and internal communications.",
    links: [{ label: "Download PNG", href: TSM_DRIVE, solid: true }, { label: "Download PDF", href: TSM_DRIVE }] },
  { typeTag: "Poster",  thumbLabel: "Portrait B",       dims: "A4 · Portrait",  title: "TSM24 Poster — Portrait B",        meta: "Secondary portrait variant. A4 print and digital-screen ready.",              links: [{ label: "PNG", href: TSM_DRIVE, solid: true }, { label: "PDF", href: TSM_DRIVE }] },
  { typeTag: "Social",  thumbLabel: "Social Square A",   dims: "1080 × 1080",   title: "TSM24 Social Media Square A",       meta: "1080×1080 for LinkedIn and Instagram posts.",                                links: [{ label: "PNG", href: TSM_DRIVE, solid: true }] },
  { typeTag: "Social",  thumbLabel: "Social Square B",   dims: "1080 × 1080",   title: "TSM24 Social Media Square B",       meta: "Alternate square layout. Different visual treatment to Option A.",           links: [{ label: "PNG", href: TSM_DRIVE, solid: true }] },
  { typeTag: "Banner",  thumbLabel: "Landscape Banner",  dims: "1200 × 628",    title: "TSM24 Landscape Banner",            meta: "Email headers, intranet banners, digital displays.",                         links: [{ label: "PNG", href: TSM_DRIVE, solid: true }, { label: "PDF", href: TSM_DRIVE }] },
  { typeTag: "Story",   thumbLabel: "Story Format",      dims: "1080 × 1920",   title: "TSM24 Instagram / WhatsApp Story",  meta: "1080×1920 vertical for Instagram Stories and WhatsApp status.",              links: [{ label: "PNG", href: TSM_DRIVE, solid: true }] },
];

const TSM25_ASSETS = [
  { featured: true, typeTag: "Poster", thumbLabel: "TSM25 Main Poster", dims: "A4 · Portrait",
    title: "Tata Sustainability Month 25 — Main Poster",
    desc: "Primary campaign poster for the Resource Efficiency & Biodiversity theme. Use for office displays, intranet, and internal communications.",
    links: [{ label: "Download PNG", href: TSM_DRIVE, solid: true }, { label: "Download PDF", href: TSM_DRIVE }] },
  { typeTag: "Poster",  thumbLabel: "Portrait B",       dims: "A4 · Portrait",  title: "TSM25 Poster — Portrait B",        meta: "Secondary portrait variant. A4 print and digital-screen ready.",              links: [{ label: "PNG", href: TSM_DRIVE, solid: true }, { label: "PDF", href: TSM_DRIVE }] },
  { typeTag: "Social",  thumbLabel: "Social Square A",   dims: "1080 × 1080",   title: "TSM25 Social Media Square A",       meta: "1080×1080 for LinkedIn, Instagram and Yammer posts.",                        links: [{ label: "PNG", href: TSM_DRIVE, solid: true }] },
  { typeTag: "Social",  thumbLabel: "Social Square B",   dims: "1080 × 1080",   title: "TSM25 Social Media Square B",       meta: "Alternate square layout. Different visual treatment to Option A.",           links: [{ label: "PNG", href: TSM_DRIVE, solid: true }] },
  { typeTag: "Banner",  thumbLabel: "Landscape Banner",  dims: "1920 × 1080",   title: "TSM25 Landscape Banner",            meta: "Wide format for email headers, intranet and digital boards.",                links: [{ label: "PNG", href: TSM_DRIVE, solid: true }, { label: "PDF", href: TSM_DRIVE }] },
  { typeTag: "Story",   thumbLabel: "Story Format",      dims: "1080 × 1920",   title: "TSM25 Instagram / WhatsApp Story",  meta: "1080×1920 vertical for Instagram Stories and WhatsApp status.",              links: [{ label: "PNG", href: TSM_DRIVE, solid: true }] },
  { typeTag: "Display", thumbLabel: "Screensaver",       dims: "1920 × 1080",   title: "TSM25 Laptop / Screen Wallpaper",   meta: "Desktop wallpaper for employee devices. 1920×1080 resolution.",             links: [{ label: "PNG", href: TSM_DRIVE, solid: true }] },
  { typeTag: "Guide",   thumbLabel: "DIY Kit",           dims: "PDF · A4",      title: "TSM25 DIY Activity Kit",            meta: "Ideas and guides for running independent sustainability activities.",         links: [{ label: "PDF", href: TSM_DRIVE, solid: true }] },
  { typeTag: "Email",   thumbLabel: "Email Header",      dims: "1200 × 400",    title: "TSM25 Email Campaign Header",       meta: "For internal email announcements and TSM25 newsletters.",                    links: [{ label: "PNG", href: TSM_DRIVE, solid: true }] },
];

// ── Main component ────────────────────────────────────────────────────────────
export default function TSMCampaignKitView() {
  return (
    <div style={{ fontFamily: FONT, background: "#f5f5fa", minHeight: "100vh" }}>

      {/* Top accent line */}
      <div style={{ height: 3, background: COLOUR, width: "100%" }} />

      <SubPageDotRail sections={SECTIONS} accentColour={COLOUR} />

      {/* ── HERO ── */}
      <div id="ckit-hero" style={{ position: "relative", minHeight: "92vh", overflow: "hidden", display: "flex", alignItems: "center", paddingTop: 64 }}>
        <img src={tsmHeroImg} alt="" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "center" }} />
        {/* Dark base overlay so lime accent doesn't wash out — TSM unique treatment */}
        <div style={{ position: "absolute", inset: 0, background: `linear-gradient(110deg, rgba(13,27,62,0.88) 0%, rgba(13,27,62,0.70) 38%, ${COLOUR}88 65%, ${COLOUR}44 100%)` }} />
        <div style={DIAG} />

        <div style={{ position: "relative", zIndex: 1, maxWidth: 1100, margin: "0 auto", padding: "0 64px", width: "100%", display: "grid", gridTemplateColumns: "1.2fr 0.8fr", gap: 56, alignItems: "center" }}>

          {/* Left */}
          <div>
            <p style={{ fontFamily: FONT, fontSize: 11, fontWeight: 700, letterSpacing: "1.6px", textTransform: "uppercase", color: "rgba(255,255,255,0.65)", margin: "0 0 12px" }}>
              Tata Sustainability Group · Tata Sustainability Month
            </p>
            <div style={{ height: 2, width: 48, borderRadius: 2, background: COLOUR, margin: "0 0 22px" }} />
            <h1 style={{ fontFamily: FONT, fontSize: "clamp(2.4rem,5vw,3.8rem)", fontWeight: 400, color: "#fff", lineHeight: 1.12, letterSpacing: "-0.5px", margin: "0 0 18px" }}>
              Sustainability Month Campaign Kit
            </h1>
            <p style={{ fontFamily: FONT, fontSize: 15, fontWeight: 300, lineHeight: 1.7, color: "rgba(255,255,255,0.65)", margin: "0 0 32px", maxWidth: 480 }}>
              Download official Tata Sustainability Month creative assets — posters, social media graphics, banners, DIY kits — to drive participation and awareness across your company.
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
                  <div style={{ width: 8, height: 8, borderRadius: "50%", background: ed.active ? "#4ade80" : COLOUR + "99", flexShrink: 0 }} />
                  <span style={{ fontFamily: FONT, fontSize: 13, fontWeight: 700, color: "rgba(255,255,255,0.85)" }}>{ed.label} · {ed.year}</span>
                  {ed.active && <span style={{ marginLeft: "auto", fontFamily: FONT, fontSize: 9, fontWeight: 800, letterSpacing: "1px", textTransform: "uppercase", color: "#4ade80" }}>Active</span>}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── EDITIONS ── */}
      <EditionSection ed={EDITIONS[0]} assets={TSM23_ASSETS} />
      <EditionSection ed={EDITIONS[1]} assets={TSM24_ASSETS} />
      <EditionSection ed={EDITIONS[2]} assets={TSM25_ASSETS} />

      {/* ── INFO STRIP ── */}
      <div style={{ maxWidth: 1100, margin: "40px auto 0", padding: "0 56px" }}>
        <div style={{ background: ACCENT_NAVY, borderRadius: 14, padding: "22px 28px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 24 }}>
          <div>
            <div style={{ fontFamily: FONT, fontSize: 11, fontWeight: 700, letterSpacing: "1.5px", textTransform: "uppercase", color: COLOUR + "99", marginBottom: 4 }}>Need help or custom assets?</div>
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
