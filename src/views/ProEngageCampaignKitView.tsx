import React, { useEffect, useRef, useState } from "react";
import SubPageDotRail from "@/components/shared/SubPageDotRail";
import peHeroImg from "@/assets/banner_photos/Inner Page ProEngage banner.jpg";

const FONT        = "'DM Sans',ui-sans-serif,system-ui,sans-serif";
const ACCENT_NAVY = "#0D1B3E";
const B_YELLOW    = "#F79425";
const COLOUR      = "#803998";   // ProEngage purple
const COLOUR_DARK = "#4a1f5c";
const COLOUR_LIGHT= "#F3EEFF";
const BORDER      = "#e8e8f0";

const PE_DRIVE = "https://drive.google.com/drive/folders/1yH2VG6bEHYN6I0f8-eAMdnI6pCmVqbBb";

const DIAG: React.CSSProperties = {
  position: "absolute", inset: 0,
  backgroundImage: "repeating-linear-gradient(45deg,rgba(255,255,255,0.03) 1px,transparent 1px)",
  backgroundSize: "28px 28px",
  pointerEvents: "none",
};

const SECTIONS = [
  { id: "ckit-hero", label: "Overview" },
  { id: "ckit-pe23", label: "PE 23"    },
  { id: "ckit-pe22", label: "PE 22"    },
  { id: "ckit-pe21", label: "PE 21"    },
];

const EDITIONS = [
  { id: "pe21", label: "ProEngage 21", year: "2022", theme: "Skills for Good", volunteers: "4,200+", projects: "310+", active: false },
  { id: "pe22", label: "ProEngage 22", year: "2023", theme: "Skills for Good", volunteers: "5,800+", projects: "420+", active: false },
  { id: "pe23", label: "ProEngage 23", year: "2024", theme: "Volunteer Your Skills to Help NGOs", volunteers: "Active edition", projects: "Open", active: true },
];

// ── DrawerShell ───────────────────────────────────────────────────────────────
function DrawerShell({ open, onClose, title, subtitle, accentTag, accentColor, children }: {
  open: boolean; onClose: () => void; title: string; subtitle?: string; accentTag?: string; accentColor?: string; children: React.ReactNode;
}) {
  useEffect(() => {
    const h = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", h);
    return () => document.removeEventListener("keydown", h);
  }, [onClose]);
  return (
    <>
      <div onClick={onClose} style={{ position: "fixed", inset: 0, background: "rgba(13,27,62,0.45)", zIndex: 200, opacity: open ? 1 : 0, pointerEvents: open ? "auto" : "none", transition: "opacity 0.22s", backdropFilter: "blur(2px)" }} />
      <div style={{ position: "fixed", top: "50%", left: "50%", transform: open ? "translate(-50%, -50%) scale(1)" : "translate(-50%, -48%) scale(0.97)", transition: "transform 0.25s cubic-bezier(0.4,0,0.2,1), opacity 0.25s", opacity: open ? 1 : 0, pointerEvents: open ? "auto" : "none", width: 560, maxWidth: "calc(100vw - 40px)", maxHeight: "calc(100vh - 80px)", background: "#fff", borderRadius: 16, zIndex: 201, boxShadow: "0 24px 64px rgba(13,27,62,0.22)", display: "flex", flexDirection: "column", fontFamily: FONT, overflowY: "auto" }}>
        <div style={{ background: accentColor || ACCENT_NAVY, padding: "24px 28px", borderRadius: "16px 16px 0 0", flexShrink: 0, position: "relative", overflow: "hidden" }}>
          <button onClick={onClose} style={{ background: "rgba(255,255,255,0.18)", border: "none", borderRadius: 7, color: "rgba(255,255,255,0.95)", fontSize: 13, fontWeight: 500, padding: "5px 12px", cursor: "pointer", marginBottom: 16, position: "relative", zIndex: 1 }}>← Close</button>
          {accentTag && <div style={{ display: "inline-block", background: "rgba(255,255,255,0.18)", border: "1px solid rgba(255,255,255,0.3)", borderRadius: 100, padding: "3px 10px", fontSize: 10.5, fontWeight: 700, color: "#fff", letterSpacing: "0.6px", textTransform: "uppercase", marginBottom: 10, position: "relative", zIndex: 1 }}>{accentTag}</div>}
          <div style={{ fontSize: 17, fontWeight: 700, color: "#fff", lineHeight: 1.3, position: "relative", zIndex: 1 }}>{title}</div>
          {subtitle && <div style={{ fontSize: 12.5, color: "rgba(255,255,255,0.7)", marginTop: 5, position: "relative", zIndex: 1 }}>{subtitle}</div>}
        </div>
        <div style={{ flex: 1, overflowY: "auto" }}>{children}</div>
      </div>
    </>
  );
}

// ── Lightbox (image-only) ─────────────────────────────────────────────────────
function Lightbox({ src, onClose }: { src: string; onClose: () => void }) {
  useEffect(() => {
    const h = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", h);
    return () => document.removeEventListener("keydown", h);
  }, [onClose]);
  return (
    <div onClick={onClose} style={{ position: "fixed", inset: 0, background: "rgba(13,27,62,0.85)", zIndex: 300, display: "flex", alignItems: "center", justifyContent: "center", backdropFilter: "blur(4px)", cursor: "zoom-out" }}>
      <img src={src} alt="" onClick={e => e.stopPropagation()} style={{ maxWidth: "90vw", maxHeight: "88vh", borderRadius: 12, boxShadow: "0 32px 80px rgba(0,0,0,0.5)", objectFit: "contain" }} />
      <button onClick={onClose} style={{ position: "absolute", top: 24, right: 28, background: "rgba(255,255,255,0.15)", border: "none", borderRadius: 8, color: "#fff", fontSize: 13, fontWeight: 600, padding: "6px 14px", cursor: "pointer" }}>✕ Close</button>
    </div>
  );
}

// ── DefinerBar ────────────────────────────────────────────────────────────────
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

// ── Download button with dropdown ─────────────────────────────────────────────
type FileOption = { label: string; href: string };

function DownloadDropdown({ options, accent }: { options: FileOption[]; accent: string }) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const h = (e: MouseEvent) => { if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false); };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, []);

  const cur = options[selected];

  return (
    <div ref={ref} style={{ display: "inline-flex", position: "relative" }}>
      {/* Main download button */}
      <a href={cur.href} target="_blank" rel="noopener noreferrer"
        style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "7px 12px", borderRadius: "7px 0 0 7px", background: accent, color: "#fff", fontFamily: FONT, fontSize: 11, fontWeight: 800, textDecoration: "none", letterSpacing: "0.2px", whiteSpace: "nowrap" }}>
        <svg width="9" height="9" viewBox="0 0 12 12" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round"><path d="M6 2v7M3 7l3 3 3-3"/><path d="M2 10h8"/></svg>
        {cur.label}
      </a>
      {/* Chevron toggle */}
      {options.length > 1 && (
        <button onClick={() => setOpen(o => !o)}
          style={{ display: "inline-flex", alignItems: "center", padding: "7px 8px", borderRadius: "0 7px 7px 0", background: `${accent}cc`, border: `1px solid ${accent}`, borderLeft: "1px solid rgba(255,255,255,0.25)", color: "#fff", cursor: "pointer", fontSize: 10 }}>
          {open ? "▲" : "▼"}
        </button>
      )}
      {/* Dropdown */}
      {open && options.length > 1 && (
        <div style={{ position: "absolute", top: "calc(100% + 4px)", left: 0, background: "#fff", border: `1px solid ${BORDER}`, borderRadius: 8, boxShadow: "0 8px 24px rgba(13,27,62,0.12)", zIndex: 50, minWidth: 140, overflow: "hidden" }}>
          {options.map((o, i) => (
            <button key={i} onClick={() => { setSelected(i); setOpen(false); }}
              style={{ display: "block", width: "100%", textAlign: "left", padding: "9px 14px", background: i === selected ? COLOUR_LIGHT : "#fff", border: "none", borderBottom: i < options.length - 1 ? `1px solid ${BORDER}` : "none", fontFamily: FONT, fontSize: 12, fontWeight: 700, color: i === selected ? accent : ACCENT_NAVY, cursor: "pointer", letterSpacing: "0.2px" }}>
              {o.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

// ── Asymmetric ColourBox (replaces thumbnail) ─────────────────────────────────
// alternates between COLOUR-filled and white
function AsymBox({ inverted, accent, typeTag, dims }: { inverted: boolean; accent: string; typeTag: string; dims: string }) {
  const bg     = inverted ? "#fff" : accent;
  const fg     = inverted ? accent : "#fff";
  const fgSub  = inverted ? accent + "88" : "rgba(255,255,255,0.55)";
  const topBar = inverted ? accent + "55" : "rgba(255,255,255,0.35)";

  // Asymmetric clip — alternates direction
  const clip = inverted
    ? "polygon(0 0, 100% 0, 100% 78%, 86% 100%, 0 100%)"
    : "polygon(0 0, 100% 0, 100% 100%, 14% 100%, 0 78%)";

  return (
    <div style={{
      position: "relative", minHeight: 100,
      background: bg,
      clipPath: clip,
      overflow: "hidden",
      display: "flex", flexDirection: "column", justifyContent: "space-between",
      padding: "14px 18px 22px",
      backgroundImage: inverted
        ? `radial-gradient(circle, ${accent}18 1.5px, transparent 1.5px)`
        : "repeating-linear-gradient(45deg,rgba(255,255,255,0.03) 0px,rgba(255,255,255,0.03) 1px,transparent 1px,transparent 22px)",
      backgroundSize: inverted ? "16px 16px" : "22px 22px",
    }}>
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: topBar }} />
      <div style={{ fontFamily: FONT, fontSize: 10, fontWeight: 800, letterSpacing: "1.6px", textTransform: "uppercase", color: fgSub }}>{typeTag}</div>
      <div style={{ fontFamily: FONT, fontSize: 11, fontWeight: 600, color: fgSub, letterSpacing: "0.3px", marginTop: 6 }}>{dims}</div>
    </div>
  );
}

// ── Asset types ───────────────────────────────────────────────────────────────
type FileLink = { label: string; href: string };
type SubItem  = { label: string; files: FileLink[] };
type Asset = {
  typeTag: string;
  title: string;
  dims: string;
  files: FileLink[];           // primary download options (the dropdown)
  previewSrc?: string;         // image URL for lightbox
  subItems?: SubItem[];        // secondary subitems (emailer, fb cover, etc.)
  featured?: boolean;
  sectionTag?: string;
  desc?: string;
};

// ── AssetCard ─────────────────────────────────────────────────────────────────
function AssetCard({ asset, accent, cardIndex, onPreview, onSeeMore }: {
  asset: Asset; accent: string; cardIndex: number; onPreview: (src: string) => void; onSeeMore: (asset: Asset) => void;
}) {
  const [hov, setHov] = useState(false);
  const inverted = cardIndex % 2 === 1;
  const hasSubItems = asset.subItems && asset.subItems.length > 0;
  const visibleSubs = hasSubItems ? asset.subItems!.slice(0, 2) : [];
  const hasMore     = hasSubItems && asset.subItems!.length > 2;

  return (
    <div onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{ background: "#fff", border: `1px solid ${BORDER}`, borderRadius: 14, overflow: "hidden", display: "flex", flexDirection: "column", boxShadow: hov ? "0 8px 24px rgba(13,27,62,0.10)" : "none", transform: hov ? "translateY(-3px)" : "translateY(0)", transition: "transform 0.18s, box-shadow 0.18s" }}>

      {/* Asymmetric box */}
      <AsymBox inverted={inverted} accent={accent} typeTag={asset.typeTag} dims={asset.dims} />

      {/* Body */}
      <div style={{ padding: "12px 16px 16px", flex: 1, display: "flex", flexDirection: "column", gap: 10 }}>

        {/* Header row: type tag + preview */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ fontFamily: FONT, fontSize: 11, fontWeight: 800, letterSpacing: "1.3px", textTransform: "uppercase", color: accent }}>{asset.typeTag}</div>
          {asset.previewSrc && (
            <button onClick={() => onPreview(asset.previewSrc!)}
              style={{ background: "none", border: `1px solid ${accent}55`, borderRadius: 5, padding: "3px 9px", fontFamily: FONT, fontSize: 10, fontWeight: 700, color: accent, cursor: "pointer", letterSpacing: "0.3px", textTransform: "uppercase" }}>
              Preview
            </button>
          )}
        </div>

        {/* Download */}
        <DownloadDropdown options={asset.files} accent={accent} />

        {/* Sub-items (up to 2, then see more) */}
        {hasSubItems && (
          <div style={{ borderTop: `1px solid ${BORDER}`, paddingTop: 10, display: "flex", flexDirection: "column", gap: 7 }}>
            {visibleSubs.map((sub, si) => (
              <div key={si} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8 }}>
                <div style={{ fontFamily: FONT, fontSize: 11, fontWeight: 700, color: ACCENT_NAVY, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{sub.label}</div>
                <DownloadDropdown options={sub.files} accent={accent} />
              </div>
            ))}
            {hasMore && (
              <button onClick={() => onSeeMore(asset)}
                style={{ alignSelf: "flex-start", background: "none", border: "none", fontFamily: FONT, fontSize: 11, fontWeight: 700, color: accent, cursor: "pointer", padding: 0, textDecoration: "underline", letterSpacing: "0.2px" }}>
                See all ({asset.subItems!.length}) →
              </button>
            )}
          </div>
        )}

      </div>
    </div>
  );
}

// ── Featured wide card ────────────────────────────────────────────────────────
function FeaturedCard({ asset, accent, onPreview, onSeeMore }: {
  asset: Asset; accent: string; onPreview: (src: string) => void; onSeeMore: (asset: Asset) => void;
}) {
  const [hov, setHov] = useState(false);
  const hasSubItems = asset.subItems && asset.subItems.length > 0;
  const visibleSubs = hasSubItems ? asset.subItems!.slice(0, 2) : [];
  const hasMore     = hasSubItems && asset.subItems!.length > 2;

  return (
    <div onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{ gridColumn: "span 2", display: "grid", gridTemplateColumns: "1fr 1fr", background: "#fff", border: `1px solid ${BORDER}`, borderRadius: 14, overflow: "hidden", boxShadow: hov ? "0 8px 24px rgba(13,27,62,0.10)" : "none", transform: hov ? "translateY(-3px)" : "translateY(0)", transition: "transform 0.18s, box-shadow 0.18s" }}>

      {/* Left asymmetric panel */}
      <div style={{ position: "relative", minHeight: 180, background: accent, overflow: "hidden", display: "flex", flexDirection: "column", justifyContent: "flex-end", padding: "22px 24px 26px",
        clipPath: "polygon(0 0, 100% 0, 88% 100%, 0 100%)",
        backgroundImage: "repeating-linear-gradient(45deg,rgba(255,255,255,0.025) 0px,rgba(255,255,255,0.025) 1px,transparent 1px,transparent 22px)", backgroundSize: "22px 22px" }}>
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: "rgba(255,255,255,0.35)" }} />
        <div style={{ fontFamily: FONT, fontSize: 10, fontWeight: 800, letterSpacing: "1.6px", textTransform: "uppercase", color: "rgba(255,255,255,0.55)", marginBottom: 6 }}>{asset.typeTag}</div>
        <div style={{ fontFamily: FONT, fontSize: 11, fontWeight: 600, color: "rgba(255,255,255,0.5)" }}>{asset.dims}</div>
      </div>

      {/* Right body */}
      <div style={{ padding: "22px 24px", borderLeft: `1px solid ${BORDER}`, display: "flex", flexDirection: "column", gap: 10, justifyContent: "center" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ fontFamily: FONT, fontSize: 10, fontWeight: 800, letterSpacing: "1.2px", textTransform: "uppercase", color: accent }}>{asset.sectionTag || asset.typeTag}</div>
          {asset.previewSrc && (
            <button onClick={() => onPreview(asset.previewSrc!)}
              style={{ background: "none", border: `1px solid ${accent}55`, borderRadius: 5, padding: "3px 9px", fontFamily: FONT, fontSize: 10, fontWeight: 700, color: accent, cursor: "pointer", letterSpacing: "0.3px", textTransform: "uppercase" }}>
              Preview
            </button>
          )}
        </div>
        {asset.desc && <p style={{ fontFamily: FONT, fontSize: 12, color: "#475569", lineHeight: 1.65, margin: 0 }}>{asset.desc}</p>}
        <DownloadDropdown options={asset.files} accent={accent} />

        {hasSubItems && (
          <div style={{ borderTop: `1px solid ${BORDER}`, paddingTop: 10, display: "flex", flexDirection: "column", gap: 7 }}>
            {visibleSubs.map((sub, si) => (
              <div key={si} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8 }}>
                <div style={{ fontFamily: FONT, fontSize: 11, fontWeight: 700, color: ACCENT_NAVY }}>{sub.label}</div>
                <DownloadDropdown options={sub.files} accent={accent} />
              </div>
            ))}
            {hasMore && (
              <button onClick={() => onSeeMore(asset)}
                style={{ alignSelf: "flex-start", background: "none", border: "none", fontFamily: FONT, fontSize: 11, fontWeight: 700, color: accent, cursor: "pointer", padding: 0, textDecoration: "underline" }}>
                See all ({asset.subItems!.length}) →
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

// ── See More Drawer ───────────────────────────────────────────────────────────
function SeeMoreDrawer({ asset, accent, open, onClose }: { asset: Asset | null; accent: string; open: boolean; onClose: () => void }) {
  if (!asset) return null;
  return (
    <DrawerShell open={open} onClose={onClose} title={asset.typeTag} subtitle={asset.dims} accentTag="All Files" accentColor={accent}>
      <div style={{ padding: "20px 28px", display: "flex", flexDirection: "column", gap: 0 }}>
        {/* Primary */}
        <div style={{ paddingBottom: 16, borderBottom: `1px solid ${BORDER}` }}>
          <div style={{ fontFamily: FONT, fontSize: 10, fontWeight: 800, letterSpacing: "1.3px", textTransform: "uppercase", color: "#94a3b8", marginBottom: 10 }}>Primary</div>
          <DownloadDropdown options={asset.files} accent={accent} />
        </div>
        {/* Sub items */}
        {asset.subItems?.map((sub, i) => (
          <div key={i} style={{ paddingTop: 16, paddingBottom: 16, borderBottom: i < (asset.subItems!.length - 1) ? `1px solid ${BORDER}` : "none", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12 }}>
            <div style={{ fontFamily: FONT, fontSize: 13, fontWeight: 700, color: ACCENT_NAVY }}>{sub.label}</div>
            <DownloadDropdown options={sub.files} accent={accent} />
          </div>
        ))}
      </div>
    </DrawerShell>
  );
}

// ── Edition section ───────────────────────────────────────────────────────────
function EditionSection({ ed, assets }: { ed: typeof EDITIONS[0]; assets: Asset[] }) {
  const [lightboxSrc, setLightboxSrc] = useState<string | null>(null);
  const [drawerAsset, setDrawerAsset] = useState<Asset | null>(null);

  const HexIcon = () => (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="white" strokeWidth="1.4" strokeLinecap="round">
      <polygon points="7,1 13,4 13,10 7,13 1,10 1,4"/>
    </svg>
  );

  const featured = assets.find(a => a.featured);
  const regular  = assets.filter(a => !a.featured);

  return (
    <div id={`ckit-${ed.id}`}>
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

      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "20px 56px 0" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 16 }}>
          {featured && (
            <FeaturedCard asset={featured} accent={COLOUR} onPreview={setLightboxSrc} onSeeMore={a => setDrawerAsset(a)} />
          )}
          {regular.map((asset, i) => (
            <AssetCard key={i} asset={asset} accent={COLOUR} cardIndex={i} onPreview={setLightboxSrc} onSeeMore={a => setDrawerAsset(a)} />
          ))}
        </div>
      </div>

      {lightboxSrc && <Lightbox src={lightboxSrc} onClose={() => setLightboxSrc(null)} />}
      <SeeMoreDrawer asset={drawerAsset} accent={COLOUR} open={!!drawerAsset} onClose={() => setDrawerAsset(null)} />
    </div>
  );
}

// ── Asset data ────────────────────────────────────────────────────────────────
const PE21_ASSETS: Asset[] = [
  {
    featured: true, typeTag: "Poster", sectionTag: "ProEngage 21 · Campaign Poster", dims: "A4 · Portrait",
    desc: "Primary PE22 reminder mailer. Use on office displays, intranet, internal screens and team communications to drive volunteer registrations.",
    files: [{ label: "Download HTML", href: PE_DRIVE }, { label: "Download PDF", href: PE_DRIVE }, { label: "Download JPG", href: PE_DRIVE }],
  },
  {
    typeTag: "Emailer", dims: "600px wide",
    files: [{ label: "Download HTML", href: PE_DRIVE }, { label: "Download PDF", href: PE_DRIVE }, { label: "Download JPG", href: PE_DRIVE }],
    subItems: [
      { label: "Reminder Mailer 1", files: [{ label: "Download HTML", href: PE_DRIVE }, { label: "Download JPG", href: PE_DRIVE }] },
      { label: "Reminder Mailer 2", files: [{ label: "Download HTML", href: PE_DRIVE }, { label: "Download JPG", href: PE_DRIVE }] },
      { label: "Promotional Mailer 2", files: [{ label: "Download HTML", href: PE_DRIVE }, { label: "Download AI", href: PE_DRIVE }, { label: "Download PDF", href: PE_DRIVE }] },
      { label: "Promotional Mailer 3", files: [{ label: "Download HTML", href: PE_DRIVE }, { label: "Download PDF", href: PE_DRIVE }] },
      { label: "Promotional Mailer 4", files: [{ label: "Download HTML", href: PE_DRIVE }, { label: "Download PDF", href: PE_DRIVE }, { label: "Download JPG", href: PE_DRIVE }] },
    ],
  },
  {
    typeTag: "Launch Kit", dims: "Multi-format",
    files: [{ label: "Download HTML", href: PE_DRIVE }],
    subItems: [
      { label: "Video", files: [{ label: "Download MP4", href: PE_DRIVE }] },
      { label: "Launch Mailer", files: [{ label: "Download HTML", href: PE_DRIVE }] },
      { label: "StockEngine Banner", files: [{ label: "Download JPG", href: PE_DRIVE }] },
      { label: "TSG WebEx Banner", files: [{ label: "Download PG (Desktop)", href: PE_DRIVE }, { label: "Download PG (Mobile)", href: PE_DRIVE }] },
      { label: "Tata World Banner", files: [{ label: "Download JPG", href: PE_DRIVE }] },
    ],
  },
  {
    typeTag: "Social", dims: "1080 × 1080",
    files: [{ label: "Download PNG", href: PE_DRIVE }, { label: "Download JPG", href: PE_DRIVE }],
    subItems: [
      { label: "FB Cover", files: [{ label: "Download JPG", href: PE_DRIVE }] },
      { label: "LinkedIn Cover", files: [{ label: "Download JPG", href: PE_DRIVE }] },
      { label: "LinkedIn Post", files: [{ label: "Download PNG", href: PE_DRIVE }] },
    ],
  },
  {
    typeTag: "Template", dims: "PPT · 16:9",
    files: [{ label: "Download PPT", href: PE_DRIVE }, { label: "Download PDF", href: PE_DRIVE }],
    subItems: [
      { label: "Ambassador Template", files: [{ label: "Download PPT", href: PE_DRIVE }] },
      { label: "Senior Leader Template", files: [{ label: "Download PPT", href: PE_DRIVE }] },
    ],
  },
  {
    typeTag: "Logo", dims: "SVG / PNG",
    files: [{ label: "Download PDF", href: PE_DRIVE }, { label: "Download AI", href: PE_DRIVE }, { label: "Download CDR", href: PE_DRIVE }, { label: "Download PNG", href: PE_DRIVE }, { label: "Download JPG", href: PE_DRIVE }],
  },
];

const PE22_ASSETS_NEW: Asset[] = [
  {
    featured: true, typeTag: "Poster", sectionTag: "ProEngage 22 · Campaign Poster", dims: "A4 · Portrait",
    desc: "Primary PE23 campaign poster. Use on office notice boards, internal screens, intranet pages and team communications to drive volunteer registrations.",
    files: [{ label: "Download PNG", href: PE_DRIVE }, { label: "Download PDF", href: PE_DRIVE }],
  },
  {
    typeTag: "Emailer", dims: "600px wide",
    files: [{ label: "Download HTML", href: PE_DRIVE }, { label: "Download PNG", href: PE_DRIVE }],
    subItems: [
      { label: "Thank You Mailer", files: [{ label: "Download HTML", href: PE_DRIVE }, { label: "Download AI", href: PE_DRIVE }, { label: "Download PNG", href: PE_DRIVE }] },
      { label: "Reminder Mailer 1", files: [{ label: "Download HTML", href: PE_DRIVE }] },
      { label: "Reminder Mailer 2", files: [{ label: "Download HTML", href: PE_DRIVE }] },
      { label: "Promotional Mailer 3", files: [{ label: "Download HTML", href: PE_DRIVE }, { label: "Download AI", href: PE_DRIVE }, { label: "Download PNG", href: PE_DRIVE }] },
      { label: "Promotional Mailer 4", files: [{ label: "Download HTML", href: PE_DRIVE }, { label: "Download AI", href: PE_DRIVE }, { label: "Download PNG", href: PE_DRIVE }] },
      { label: "Promotional Mailer 5", files: [{ label: "Download HTML", href: PE_DRIVE }, { label: "Download AI", href: PE_DRIVE }, { label: "Download PNG", href: PE_DRIVE }] },
    ],
  },
  {
    typeTag: "Launch Kit", dims: "Multi-format",
    files: [{ label: "Download HTML", href: PE_DRIVE }],
    subItems: [
      { label: "Video", files: [{ label: "Download MP4", href: PE_DRIVE }] },
      { label: "Launch Mailer", files: [{ label: "Download JPG", href: PE_DRIVE }, { label: "Download PDF", href: PE_DRIVE }, { label: "Download AI", href: PE_DRIVE }, { label: "Download HTML", href: PE_DRIVE }] },
      { label: "StockEngine Banner", files: [{ label: "Download JPG", href: PE_DRIVE }] },
      { label: "Tata World Banner", files: [{ label: "Download JPG", href: PE_DRIVE }, { label: "Download PNG (720p)", href: PE_DRIVE }] },
      { label: "Launch Standee", files: [{ label: "Download JPG", href: PE_DRIVE }, { label: "Download AI", href: PE_DRIVE }] },
    ],
  },
  {
    typeTag: "Social", dims: "1080 × 1080",
    files: [{ label: "Download PNG", href: PE_DRIVE }, { label: "Download JPG", href: PE_DRIVE }],
    subItems: [
      { label: "FB Cover", files: [{ label: "Download JPG", href: PE_DRIVE }] },
      { label: "LinkedIn Cover", files: [{ label: "Download JPG", href: PE_DRIVE }] },
      { label: "Web Banner", files: [{ label: "Download JPG", href: PE_DRIVE }, { label: "Download AI", href: PE_DRIVE }, { label: "Download PDF", href: PE_DRIVE }] },
      { label: "LinkedIn Post", files: [{ label: "Download PNG", href: PE_DRIVE }] },
    ],
  },
  {
    typeTag: "Template", dims: "PPT · 16:9",
    files: [{ label: "Download PPT", href: PE_DRIVE }, { label: "Download PDF", href: PE_DRIVE }],
    subItems: [
      { label: "Ambassador Template", files: [{ label: "Download PPT", href: PE_DRIVE }] },
      { label: "Senior Leader Template", files: [{ label: "Download PPT", href: PE_DRIVE }] },
    ],
  },
  {
    typeTag: "Logo", dims: "SVG / PNG",
    files: [{ label: "Download PDF", href: PE_DRIVE }, { label: "Download AI", href: PE_DRIVE }, { label: "Download CDR", href: PE_DRIVE }, { label: "Download PNG", href: PE_DRIVE }, { label: "Download JPG", href: PE_DRIVE }],
  },
  {
    typeTag: "Teaser", dims: "Multi-format",
    files: [{ label: "Download PNG", href: PE_DRIVE }, { label: "Download AI", href: PE_DRIVE }, { label: "Download HTML", href: PE_DRIVE }],
    subItems: [
      { label: "FB Cover", files: [{ label: "Download JPG", href: PE_DRIVE }] },
      { label: "LinkedIn Cover", files: [{ label: "Download JPG", href: PE_DRIVE }] },
      { label: "Web Banner", files: [{ label: "Download JPG", href: PE_DRIVE }, { label: "Download AI", href: PE_DRIVE }, { label: "Download PDF", href: PE_DRIVE }] },
      { label: "LinkedIn Post", files: [{ label: "Download PNG", href: PE_DRIVE }] },
    ],
  },
];

const PE23_ASSETS: Asset[] = [
  {
    featured: true, typeTag: "Poster", sectionTag: "ProEngage 23 · Primary Recruitment Poster", dims: "A4 · Portrait",
    desc: "Primary recruitment poster for ProEngage 24. Use on office notice boards, internal screens, intranet pages and team communications to drive volunteer registrations.",
    files: [{ label: "Download PNG", href: PE_DRIVE }, { label: "Download PDF", href: PE_DRIVE }],
  },
  {
    typeTag: "Emailer", dims: "600px wide",
    files: [{ label: "Download HTML", href: PE_DRIVE }, { label: "Download PNG", href: PE_DRIVE }],
    subItems: [
      { label: "Promotional Mailer B", files: [{ label: "Download PNG", href: PE_DRIVE }, { label: "Download PDF", href: PE_DRIVE }] },
      { label: "Promotional Mailer C", files: [{ label: "Download PNG", href: PE_DRIVE }, { label: "Download PDF", href: PE_DRIVE }] },
    ],
  },
  {
    typeTag: "Banner", dims: "1200 × 628",
    files: [{ label: "Download PNG", href: PE_DRIVE }, { label: "Download PDF", href: PE_DRIVE }],
    subItems: [
      { label: "Landscape Banner A", files: [{ label: "Download PNG", href: PE_DRIVE }, { label: "Download PDF", href: PE_DRIVE }] },
    ],
  },
  {
    typeTag: "Social", dims: "1080 × 1080",
    files: [{ label: "Download PNG", href: PE_DRIVE }, { label: "Download JPG", href: PE_DRIVE }],
    subItems: [
      { label: "Square A", files: [{ label: "Download PNG", href: PE_DRIVE }, { label: "Download JPG", href: PE_DRIVE }] },
      { label: "Square B", files: [{ label: "Download PNG", href: PE_DRIVE }, { label: "Download JPG", href: PE_DRIVE }] },
    ],
  },
  {
    typeTag: "Story", dims: "1080 × 1920",
    files: [{ label: "Download PNG", href: PE_DRIVE }],
  },
  {
    typeTag: "Template", dims: "PPT · 16:9",
    files: [{ label: "Download PPT", href: PE_DRIVE }, { label: "Download PDF", href: PE_DRIVE }],
    subItems: [
      { label: "Ambassador Template", files: [{ label: "Download PPT", href: PE_DRIVE }] },
      { label: "Senior Leader Cascade", files: [{ label: "Download PPT", href: PE_DRIVE }] },
    ],
  },
  {
    typeTag: "Display", dims: "1920 × 1080",
    files: [{ label: "Download PNG", href: PE_DRIVE }],
  },
  {
    typeTag: "Email Header", dims: "1200 × 400",
    files: [{ label: "Download PNG", href: PE_DRIVE }],
  },
];

// ── Main component ────────────────────────────────────────────────────────────
export default function ProEngageCampaignKitView() {
  return (
    <div style={{ fontFamily: FONT, background: "#f5f5fa", minHeight: "100vh" }}>
      <div style={{ height: 3, background: COLOUR, width: "100%" }} />
      <SubPageDotRail sections={SECTIONS} accentColour={COLOUR} />

      {/* Hero */}
      <div id="ckit-hero" style={{ position: "relative", minHeight: "92vh", overflow: "hidden", display: "flex", alignItems: "center", paddingTop: 64 }}>
        <img src={peHeroImg} alt="" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "center" }} />
        <div style={{ position: "absolute", inset: 0, background: `linear-gradient(110deg,${COLOUR}e8 0%,${COLOUR}cc 38%,${COLOUR}aa 58%,${COLOUR}77 78%,${COLOUR}44 100%)` }} />
        <div style={DIAG} />
        <div style={{ position: "relative", zIndex: 1, maxWidth: 1100, margin: "0 auto", padding: "0 64px", width: "100%" }}>
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
            <a href="mailto:tataengage@tata.com" style={{ display: "inline-flex", alignItems: "center", gap: 8, background: B_YELLOW, color: ACCENT_NAVY, borderRadius: 10, padding: "14px 28px", fontFamily: FONT, fontSize: 14, fontWeight: 800, textDecoration: "none", boxShadow: "0 4px 20px rgba(13,27,62,0.25)" }}>
              Request custom assets
            </a>
          </div>
        </div>
      </div>

      <EditionSection ed={EDITIONS[2]} assets={PE23_ASSETS} />
      <EditionSection ed={EDITIONS[1]} assets={PE22_ASSETS} />
      <EditionSection ed={EDITIONS[0]} assets={PE21_ASSETS} />

      {/* Info strip */}
      <div style={{ maxWidth: 1100, margin: "40px auto 0", padding: "0 56px" }}>
        <div style={{ background: COLOUR, borderRadius: 14, padding: "22px 28px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 24 }}>
          <div>
            <div style={{ fontFamily: FONT, fontSize: 11, fontWeight: 700, letterSpacing: "1.5px", textTransform: "uppercase", color: "rgba(255,255,255,0.6)", marginBottom: 4 }}>Need help or custom assets?</div>
            <div style={{ fontFamily: FONT, fontSize: 17, fontWeight: 900, color: "#fff" }}>Reach out to the Tata Engage team</div>
          </div>
          <a href="mailto:tataengage@tata.com" style={{ background: B_YELLOW, color: ACCENT_NAVY, borderRadius: 10, padding: "11px 22px", fontFamily: FONT, fontSize: 13, fontWeight: 800, textDecoration: "none", whiteSpace: "nowrap", flexShrink: 0 }}>tataengage@tata.com</a>
        </div>
      </div>

      <div style={{ height: 80 }} />
    </div>
  );
}
