import { useSearchParams } from "react-router-dom";
import { useAppNavigate } from "@/hooks/useAppNavigate";
import SubPageDotRail from "@/components/shared/SubPageDotRail";
import { IMPACT_STORIES } from "@/data/impactStoriesData";

const ACCENT_NAVY = "#0D1B3E";
const B_INDIGO    = "#333399";
const FONT        = "'Noto Sans','DM Sans',ui-sans-serif,system-ui,sans-serif";

const DIAG: React.CSSProperties = {
  position: "absolute", inset: 0,
  backgroundImage: "repeating-linear-gradient(45deg,rgba(255,255,255,0.035) 0px,rgba(255,255,255,0.035) 1px,transparent 1px,transparent 24px)",
  backgroundSize: "24px 24px",
  pointerEvents: "none",
};

const ImagePlaceholder = ({ height, caption }: { height: number; caption?: string }) => (
  <figure style={{ margin: "8px 0 32px" }}>
    <div style={{
      width: "100%", height, borderRadius: 12,
      background: "linear-gradient(135deg, #e2e8f0 0%, #cbd5e1 100%)",
      display: "flex", alignItems: "center", justifyContent: "center",
      overflow: "hidden", position: "relative",
    }}>
      <div style={{ textAlign: "center", padding: 16 }}>
        <div style={{ width: 44, height: 44, borderRadius: "50%", background: "rgba(0,0,0,0.08)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 10px" }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="rgba(0,0,0,0.32)" strokeWidth="1.5"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
        </div>
        <span style={{ fontSize: 12, color: "rgba(0,0,0,0.32)", fontWeight: 600 }}>Image placeholder</span>
        {caption && (
          <div style={{
            marginTop: 10,
            fontFamily: "'Playfair Display', Georgia, serif",
            fontStyle: "italic",
            fontSize: 14,
            color: "rgba(13,27,62,0.65)",
            maxWidth: 460,
            lineHeight: 1.5,
          }}>
            “{caption}”
          </div>
        )}
      </div>
    </div>
    {caption && (
      <figcaption style={{
        marginTop: 10,
        fontSize: 12,
        fontWeight: 700,
        letterSpacing: "0.6px",
        textTransform: "uppercase",
        color: "#64748b",
      }}>
        Caption · {caption}
      </figcaption>
    )}
  </figure>
);

export default function ImpactStoryView() {
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id") ?? undefined;
  const navigate = useAppNavigate();

  const story = IMPACT_STORIES.find((s) => s.slug === id);

  const SECTIONS_NAV = story ? [
    { id: "story-hero",   label: "Overview" },
    { id: "story-body",   label: "Story"    },
    ...(story.quotes?.length ? [{ id: "story-quotes", label: "Voices" }] : []),
    { id: "story-more",   label: "More Stories" },
  ] : [];

  if (!story) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: FONT, paddingTop: 64 }}>
        <div style={{ textAlign: "center" }}>
          <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "2px", textTransform: "uppercase", color: "#94a3b8", marginBottom: 16 }}>Story not found</p>
          <h1 style={{ fontSize: 32, fontWeight: 900, color: ACCENT_NAVY, marginBottom: 24 }}>This story doesn't exist yet.</h1>
          <button onClick={() => navigate("media")} style={{ background: B_INDIGO, color: "#fff", border: "none", borderRadius: 10, padding: "10px 24px", fontWeight: 700, fontSize: 14, cursor: "pointer" }}>
            ← Back to Media
          </button>
        </div>
      </div>
    );
  }

  const accent = story.accentColor;
  const others = IMPACT_STORIES.filter((s) => s.slug !== story.slug);

  return (
    <div style={{ fontFamily: FONT, background: "#f7f8fc", minHeight: "100vh" }}>

      {/* Top accent line */}
      <div style={{ height: 3, background: accent, width: "100%" }} />

      <SubPageDotRail sections={SECTIONS_NAV} accentColor={accent} />

      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <div id="story-hero" style={{ position: "relative", minHeight: "75vh", display: "flex", alignItems: "flex-end", overflow: "hidden", paddingTop: 64 }}>
        <img
          src={story.heroImage}
          alt={story.heroImageAlt}
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 35%" }}
        />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(160deg, rgba(8,12,22,0.78) 0%, rgba(8,12,22,0.55) 45%, rgba(8,12,22,0.22) 100%)" }} />
        <div style={DIAG} />

        <div style={{ position: "relative", zIndex: 1, maxWidth: 1100, margin: "0 auto", padding: "0 64px 56px", width: "100%" }}>

          {/* Breadcrumb */}
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 20 }}>
            <button
              onClick={() => navigate("media")}
              style={{ background: "rgba(255,255,255,0.12)", border: "1px solid rgba(255,255,255,0.2)", color: "rgba(255,255,255,0.7)", borderRadius: 6, padding: "4px 12px", fontSize: 11, fontWeight: 600, cursor: "pointer" }}
            >
              ← Media & Resources
            </button>
            <span style={{ color: "rgba(255,255,255,0.3)", fontSize: 11 }}>/</span>
            <span style={{ color: "rgba(255,255,255,0.5)", fontSize: 11, fontWeight: 600 }}>Impact Stories</span>
          </div>

          <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "2px", textTransform: "uppercase", color: "rgba(255,255,255,0.55)", margin: "0 0 10px" }}>
            {story.eyebrow} · {story.date}
          </p>
          <div style={{ height: 2, width: 52, borderRadius: 2, background: accent, marginBottom: 20 }} />

          <h1 style={{ fontFamily: FONT, fontSize: "clamp(1.9rem, 3.8vw, 3rem)", fontWeight: 400, color: "#fff", lineHeight: 1.12, letterSpacing: "-0.4px", margin: "0 0 12px", maxWidth: 720 }}>
            {story.title}
          </h1>

          {story.subtitle && (
            <p style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontStyle: "italic",
              fontSize: "clamp(1.05rem, 1.7vw, 1.35rem)",
              color: "rgba(255,255,255,0.85)",
              lineHeight: 1.4,
              margin: "0 0 24px",
              maxWidth: 720,
            }}>
              {story.subtitle}
            </p>
          )}

          {/* Stats — only shown if story has them */}
          {story.stats && (
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
              {story.stats.map((s) => (
                <div key={s.label} style={{ background: "rgba(255,255,255,0.10)", border: "1px solid rgba(255,255,255,0.18)", borderRadius: 8, padding: "8px 16px", textAlign: "center" }}>
                  <div style={{ fontSize: 20, fontWeight: 900, color: "#fff", lineHeight: 1 }}>{s.num}</div>
                  <div style={{ fontSize: 10, fontWeight: 600, color: "rgba(255,255,255,0.6)", textTransform: "uppercase", letterSpacing: "0.8px", marginTop: 3 }}>{s.label}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* ── Body ──────────────────────────────────────────────────────────── */}
      <div id="story-body" style={{ background: "#fff" }}>
        <div style={{ maxWidth: 740, margin: "0 auto", padding: "64px 32px 56px" }}>

          {/* i. Opening paragraph — Playfair italic, no border */}
          <p style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontSize: 20,
            fontStyle: "italic",
            color: ACCENT_NAVY,
            lineHeight: 1.78,
            margin: "0 0 36px",
          }}>
            {story.openingPara}
          </p>

          {/* Body sections — render with optional headings, bullets, sub-blocks, tables, and image slots. */}
          {(() => {
            // If any section explicitly defines an imageAfter, the story controls placement;
            // otherwise we auto-distribute three placeholders across the section count.
            const hasExplicitImages = story.sections.some((s) => s.imageAfter);
            const total = story.sections.length;
            const slot1 = 0;
            const slot2 = Math.min(Math.max(Math.floor(total / 2), 1), total - 1);
            const slot3 = total - 1;

            const renderSection = (sec: typeof story.sections[number], i: number) => (
              <div key={i} style={{ marginBottom: 8 }}>
                {sec.heading && (
                  <h2 style={{
                    fontFamily: FONT,
                    fontSize: 22,
                    fontWeight: 800,
                    color: ACCENT_NAVY,
                    lineHeight: 1.3,
                    margin: "12px 0 16px",
                    letterSpacing: "-0.2px",
                  }}>
                    {sec.heading}
                  </h2>
                )}
                {sec.body && sec.body.split("\n\n").map((para, pi) => (
                  <p key={pi} style={{ fontFamily: FONT, fontSize: 16, color: "#374151", lineHeight: 1.85, margin: "0 0 20px", fontWeight: 400 }}>
                    {para}
                  </p>
                ))}
                {sec.bullets && sec.bullets.length > 0 && (
                  <ul style={{ margin: "0 0 24px", paddingLeft: 22 }}>
                    {sec.bullets.map((b, bi) => (
                      <li key={bi} style={{
                        fontFamily: FONT, fontSize: 16, color: "#374151",
                        lineHeight: 1.75, margin: "0 0 12px", fontWeight: 400,
                      }}>
                        {b}
                      </li>
                    ))}
                  </ul>
                )}
                {sec.subBlocks && sec.subBlocks.map((sb, sbi) => (
                  <div key={sbi} style={{ margin: "20px 0 24px" }}>
                    <div style={{
                      fontFamily: FONT,
                      fontSize: 11,
                      fontWeight: 800,
                      letterSpacing: "1.6px",
                      textTransform: "uppercase",
                      color: accent,
                      marginBottom: 10,
                    }}>
                      {sb.heading}
                    </div>
                    <ul style={{ margin: 0, paddingLeft: 22 }}>
                      {sb.bullets.map((b, bi) => (
                        <li key={bi} style={{
                          fontFamily: FONT, fontSize: 16, color: "#374151",
                          lineHeight: 1.75, margin: "0 0 10px", fontWeight: 400,
                        }}>
                          {b}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
                {sec.table && (
                  <div style={{ overflowX: "auto", margin: "8px 0 28px", border: "1px solid #e8e8f0", borderRadius: 10 }}>
                    <table style={{ width: "100%", borderCollapse: "collapse", fontFamily: FONT, fontSize: 14 }}>
                      <thead>
                        <tr style={{ background: "#f7f8fc" }}>
                          {sec.table.headers.map((h, hi) => (
                            <th key={hi} style={{
                              textAlign: "left",
                              padding: "10px 14px",
                              fontSize: 11,
                              fontWeight: 800,
                              letterSpacing: "0.8px",
                              textTransform: "uppercase",
                              color: ACCENT_NAVY,
                              borderBottom: "1px solid #e8e8f0",
                            }}>{h}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {sec.table.rows.map((row, ri) => (
                          <tr key={ri} style={{ borderTop: ri === 0 ? "none" : "1px solid #f1f1f5" }}>
                            {row.map((cell, ci) => (
                              <td key={ci} style={{
                                padding: "10px 14px",
                                color: "#374151",
                                fontWeight: ci === 1 ? 600 : 400,
                              }}>{cell}</td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            );

            const out: React.ReactNode[] = [];
            story.sections.forEach((sec, i) => {
              out.push(renderSection(sec, i));
              if (hasExplicitImages) {
                if (sec.imageAfter) {
                  out.push(
                    <ImagePlaceholder
                      key={`img-explicit-${i}`}
                      height={sec.imageAfter.height ?? 300}
                      caption={sec.imageAfter.caption}
                    />,
                  );
                }
              } else {
                if (i === slot1) out.push(<ImagePlaceholder key={`img-1-${i}`} height={320} />);
                else if (i === slot2 && slot2 !== slot1 && slot2 !== slot3) out.push(<ImagePlaceholder key={`img-2-${i}`} height={260} />);
                else if (i === slot3 && slot3 !== slot1) out.push(<ImagePlaceholder key={`img-3-${i}`} height={300} />);
              }
            });
            return out;
          })()}
        </div>
      </div>

      {/* ── Quotes — styled like About founder card ───────────────────────── */}
      {story.quotes && story.quotes.length > 0 && (
        <div id="story-quotes" style={{ background: "#f7f8fc", padding: "56px 32px" }}>
          <div style={{ maxWidth: 1100, margin: "0 auto" }}>
            <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "2px", textTransform: "uppercase", color: "#94a3b8", marginBottom: 8 }}>
              Voices from the Field
            </p>
            <div style={{ width: 36, height: 2, borderRadius: 2, background: accent, marginBottom: 28 }} />

            <div style={{ display: "grid", gridTemplateColumns: story.quotes.length === 1 ? "1fr" : "1fr 1fr", gap: 20 }}>
              {story.quotes.map((q, i) => (
                <div key={i} style={{
                  background: ACCENT_NAVY,
                  borderRadius: 20,
                  padding: "40px",
                  position: "relative",
                  overflow: "hidden",
                }}>
                  <div style={DIAG} />
                  <div style={{ position: "relative", zIndex: 1 }}>
                    <div style={{
                      fontFamily: "Georgia, serif",
                      fontSize: 56,
                      lineHeight: 0.7,
                      color: "rgba(255,255,255,0.15)",
                      marginBottom: 18,
                      userSelect: "none",
                    }}>"</div>
                    <p style={{
                      fontFamily: "'Playfair Display', Georgia, serif",
                      fontSize: 19,
                      fontStyle: "italic",
                      color: "rgba(255,255,255,0.92)",
                      lineHeight: 1.75,
                      margin: "0 0 28px",
                    }}>
                      {q.text}
                    </p>
                    <div style={{ borderTop: "1px solid rgba(255,255,255,0.18)", paddingTop: 18 }}>
                      <div style={{ fontSize: 15, fontWeight: 800, color: "#fff" }}>{q.attribution}</div>
                      {q.role && <div style={{ fontSize: 11, color: "rgba(255,255,255,0.5)", marginTop: 4 }}>{q.role}</div>}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ── More Stories ──────────────────────────────────────────────────── */}
      <div id="story-more" style={{ background: "#f7f8fc", padding: "56px 32px 72px" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "2px", textTransform: "uppercase", color: "#94a3b8", marginBottom: 8 }}>More Impact Stories</p>
          <div style={{ width: 36, height: 2, borderRadius: 2, background: B_INDIGO, marginBottom: 28 }} />

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
            {others.map((s) => (
              <div
                key={s.slug}
                onClick={() => { navigate("stories", s.slug); window.scrollTo(0, 0); }}
                style={{ background: "#fff", border: "1px solid #e8e8f0", borderRadius: 14, overflow: "hidden", cursor: "pointer", transition: "transform 0.18s, box-shadow 0.18s" }}
                onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-3px)"; e.currentTarget.style.boxShadow = "0 8px 24px rgba(0,0,0,0.08)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; }}
              >
                <div style={{ height: 130, overflow: "hidden" }}>
                  <img src={s.heroImage} alt={s.heroImageAlt} style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 35%" }} />
                </div>
                <div style={{ padding: "18px 20px" }}>
                  <span style={{ display: "inline-block", background: `${s.accentColor}15`, color: s.accentColor, fontSize: 10, fontWeight: 700, padding: "3px 9px", borderRadius: 4, marginBottom: 10, textTransform: "uppercase", letterSpacing: "0.6px" }}>{s.tag}</span>
                  <div style={{ fontSize: 15, fontWeight: 700, color: ACCENT_NAVY, lineHeight: 1.4, marginBottom: 8 }}>{s.title}</div>
                  <p style={{ fontSize: 13, color: "#64748b", lineHeight: 1.6, margin: "0 0 12px" }}>{s.excerpt}</p>
                  <span style={{ fontSize: 12, fontWeight: 700, color: B_INDIGO }}>Read story →</span>
                </div>
              </div>
            ))}
          </div>

          <div style={{ textAlign: "center", marginTop: 36 }}>
            <button onClick={() => navigate("media")} style={{ background: "none", border: `1.5px solid ${B_INDIGO}`, color: B_INDIGO, borderRadius: 10, padding: "10px 28px", fontWeight: 700, fontSize: 14, cursor: "pointer" }}>
              All stories in Media & Resources →
            </button>
          </div>
        </div>
      </div>

    </div>
  );
}
