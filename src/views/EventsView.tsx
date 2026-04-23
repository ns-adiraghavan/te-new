import { useRef, useState, useEffect } from "react";
import SubPageDotRail from "@/components/shared/SubPageDotRail";

import tsc22Chairman from "@/assets/events/tsc-2022-chairman.png";
import tsc22Awards from "@/assets/events/tsc-2022-awards.png";
import volconChacko from "@/assets/events/volcon-2024-chacko.png";
import volconPanel from "@/assets/events/volcon-2024-panel.png";
import volconAwardsTCS from "@/assets/events/volcon-2024-awards.png";
import volconNitin from "@/assets/events/volcon-2024-nitin.png";
import volconArjinder from "@/assets/events/volcon-2024-arjinder.png";
import volconMusic1 from "@/assets/events/volcon-2024-music1.png";
import volconMusic2 from "@/assets/events/volcon-2024-music2.png";
import volconTribalChefs from "@/assets/events/volcon-2024-tribal-chefs.png";
import iavePanel from "@/assets/events/iave-2022-panel.png";

const ACCENT       = "#F0494E";   // red — Events page (TSC 2022)
const ACCENT_DARK  = "#C53035";
const ACCENT_LIGHT = "#FEF2F2";
const NAVY         = "#0D1B3E";
const B_PINK       = "#F4838A";   // VOLCON 2024
const B_PINK_DARK  = "#C95F66";
const B_PINK_LIGHT = "#FEF1F2";
const B_ORANGE     = "#D84926";   // IAVE 2022
const B_ORANGE_DARK = "#A8341A";
const B_ORANGE_LIGHT = "#FDF1ED";

const DIAG: React.CSSProperties = {
  position: "absolute", inset: 0,
  backgroundImage: "repeating-linear-gradient(45deg,rgba(255,255,255,0.03) 1px,transparent 1px)",
  backgroundSize: "28px 28px",
  pointerEvents: "none",
};

const SECTIONS = [
  { id: "events-intro",  label: "Overview" },
  { id: "events-tsc22", label: "TSC 2022"  },
  { id: "events-volcon", label: "VOLCON 2024" },
  { id: "events-iave",  label: "IAVE 2022" },
];

function DefinerBar({ colour = ACCENT, light = false }: { colour?: string; light?: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const [on, setOn] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setOn(true); }, { threshold: 0.4 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return (
    <div ref={ref} style={{ height: 3, background: light ? "rgba(255,255,255,0.2)" : "#e8e8f0", borderRadius: 2, overflow: "hidden", width: 48, marginTop: 10 }}>
      <div style={{ height: "100%", background: light ? "rgba(255,255,255,0.7)" : colour, borderRadius: 2, transition: "width 0.65s cubic-bezier(0.22,1,0.36,1)", width: on ? "100%" : "0%" }} />
    </div>
  );
}

// ── Slideshow ─────────────────────────────────────────────────────────────────
interface Slide { src: string; caption: string; }
function Slideshow({ slides, accent, aspect = "16/10" }: { slides: Slide[]; accent: string; accentDark?: string; aspect?: string }) {
  const [i, setI] = useState(0);
  useEffect(() => {
    if (slides.length <= 1) return;
    const t = setInterval(() => setI(p => (p + 1) % slides.length), 6000);
    return () => clearInterval(t);
  }, [slides.length]);
  if (!slides.length) return null;
  return (
    <div style={{ borderRadius: 16, overflow: "hidden", background: "#000", border: `1px solid ${accent}30`, position: "relative" }}>
      <div style={{ position: "relative", aspectRatio: aspect, background: "#000" }}>
        {slides.map((s, idx) => (
          <img key={idx} src={s.src} alt={s.caption}
            style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", opacity: idx === i ? 1 : 0, transition: "opacity 0.6s ease" }} />
        ))}
        {slides.length > 1 && (
          <div style={{ position: "absolute", bottom: 12, left: 0, right: 0, display: "flex", justifyContent: "center", gap: 6, zIndex: 2 }}>
            {slides.map((_, idx) => (
              <button key={idx} onClick={() => setI(idx)} aria-label={`Slide ${idx + 1}`}
                style={{ width: idx === i ? 24 : 8, height: 8, borderRadius: 100, border: "none", cursor: "pointer", background: idx === i ? "#fff" : "rgba(255,255,255,0.5)", transition: "all 0.3s" }} />
            ))}
          </div>
        )}
      </div>
      <div style={{ background: "#fff", borderTop: `3px solid ${accent}`, padding: "14px 20px" }}>
        <p style={{ fontSize: 12, color: "#475569", lineHeight: 1.5, margin: 0 }}>{slides[i].caption}</p>
      </div>
    </div>
  );
}

// ── YouTube embed ─────────────────────────────────────────────────────────────
function YouTubeEmbed({ id, accent, caption }: { id: string; accent: string; caption?: string }) {
  return (
    <div style={{ borderRadius: 16, overflow: "hidden", border: `1px solid ${accent}30`, background: "#000" }}>
      <div style={{ position: "relative", aspectRatio: "16/9" }}>
        <iframe
          src={`https://www.youtube.com/embed/${id}`}
          title="YouTube video"
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", border: "none" }}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
      {caption && (
        <div style={{ background: "#fff", borderTop: `3px solid ${accent}`, padding: "14px 20px" }}>
          <p style={{ fontSize: 12, color: "#475569", lineHeight: 1.5, margin: 0 }}>{caption}</p>
        </div>
      )}
    </div>
  );
}

// ── Sub-event block (used inside parent event sections) ───────────────────────
interface SubEventProps {
  title: string;
  body: string | string[];
  media?: React.ReactNode;
  accent: string;
  accentDark: string;
  accentLight: string;
  mediaSide?: "left" | "right";
}
function SubEvent({ title, body, media, accent, accentDark, accentLight, mediaSide = "right" }: SubEventProps) {
  const paras = Array.isArray(body) ? body : [body];
  return (
    <div style={{ marginTop: 56, paddingTop: 40, borderTop: `1px dashed ${accent}40` }}>
      <p style={{ fontFamily: "'DM Mono',monospace", fontSize: 10, fontWeight: 700, letterSpacing: "1.5px", textTransform: "uppercase", color: accentDark, marginBottom: 10 }}>Programme highlight</p>
      <h3 style={{ fontSize: 20, fontWeight: 800, color: NAVY, letterSpacing: "-0.3px", marginBottom: 22 }}>{title}</h3>
      {media ? (
        <div style={{ display: "grid", gridTemplateColumns: mediaSide === "left" ? "0.95fr 1.05fr" : "1.05fr 0.95fr", gap: 40, alignItems: "start" }}>
          <div style={{ order: mediaSide === "left" ? 2 : 1 }}>
            {paras.map((p, i) => (
              <p key={i} style={{ fontSize: 14.5, color: "#475569", lineHeight: 1.82, marginBottom: 14 }}>{p}</p>
            ))}
          </div>
          <div style={{ order: mediaSide === "left" ? 1 : 2 }}>{media}</div>
        </div>
      ) : (
        paras.map((p, i) => (
          <p key={i} style={{ fontSize: 14.5, color: "#475569", lineHeight: 1.82, marginBottom: 14 }}>{p}</p>
        ))
      )}
    </div>
  );
}

// ── Hero ──────────────────────────────────────────────────────────────────────
function Hero() {
  return (
    <div style={{ position: "relative", background: `linear-gradient(135deg, ${ACCENT_DARK} 0%, ${ACCENT} 100%)`, padding: "100px 56px 72px", overflow: "hidden" }}>
      <div style={DIAG} />
      <div style={{ position: "absolute", top: -80, right: -60, width: 440, height: 440, background: `radial-gradient(circle, rgba(255,255,255,0.12) 0%, transparent 68%)`, pointerEvents: "none" }} />
      <div style={{ position: "relative", zIndex: 1, maxWidth: 1100, margin: "0 auto" }}>
        <p style={{ fontFamily: "'DM Mono',monospace", fontSize: 10, fontWeight: 600, letterSpacing: "2.5px", textTransform: "uppercase", color: "rgba(255,255,255,0.4)", marginBottom: 18 }}>
          Tata Engage · Events & Conclaves
        </p>
        <div style={{ width: 40, height: 3, background: ACCENT, borderRadius: 2, marginBottom: 24 }} />
        <h1 style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "clamp(2.2rem,4.5vw,3.2rem)", fontWeight: 900, color: "#fff", lineHeight: 1.08, letterSpacing: "-1.5px", margin: "0 0 18px", maxWidth: 600 }}>
          Events & Global Engagement
        </h1>
        <p style={{ fontSize: 15, fontWeight: 300, color: "rgba(255,255,255,0.6)", maxWidth: 480 }}>
          Tata Engage convenes leaders, volunteers, and global partners to celebrate the spirit of giving and chart the future of corporate volunteering.
        </p>
      </div>

      {/* Event index boxes */}
      <div style={{ position: "relative", zIndex: 1, maxWidth: 1100, margin: "40px auto 0" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 0, borderRadius: 14, overflow: "hidden", boxShadow: "0 8px 32px rgba(0,0,0,0.25)" }}>
          {[
            { date: "Nov 2022", label: "Tata Sustainability Conclave", tag: "TSC 2022", bg: ACCENT, text: "#fff" },
            { date: "Mar 2024", label: "Tata Volunteerism Conference", tag: "VOLCON 2024", bg: B_PINK, text: "#fff" },
            { date: "Oct 2022", label: "IAVE World Volunteer Conference", tag: "Abu Dhabi", bg: B_ORANGE, text: "#fff" },
          ].map((b, i) => (
            <div
              key={b.tag}
              style={{ background: b.bg, padding: "28px 24px", cursor: "pointer", borderRight: i < 2 ? "1px solid rgba(255,255,255,0.15)" : "none", transition: "filter 0.2s" }}
              onClick={() => document.getElementById(["events-tsc22", "events-volcon", "events-iave"][i])?.scrollIntoView({ behavior: "smooth" })}
              onMouseEnter={e => (e.currentTarget as HTMLDivElement).style.filter = "brightness(0.9)"}
              onMouseLeave={e => (e.currentTarget as HTMLDivElement).style.filter = "none"}
            >
              <p style={{ fontFamily: "'DM Mono',monospace", fontSize: 10, fontWeight: 700, letterSpacing: "1.5px", textTransform: "uppercase", color: b.text === "#fff" ? "rgba(255,255,255,0.5)" : "rgba(0,0,0,0.4)", marginBottom: 10 }}>{b.date}</p>
              <p style={{ fontSize: 14, fontWeight: 800, color: b.text, lineHeight: 1.35, marginBottom: 10 }}>{b.label}</p>
              <span style={{ fontSize: 11, fontWeight: 700, background: b.text === "#fff" ? "rgba(255,255,255,0.18)" : "rgba(0,0,0,0.10)", color: b.text, borderRadius: 100, padding: "3px 10px" }}>{b.tag}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Shared event card layout ──────────────────────────────────────────────────
interface EventSectionProps {
  id: string;
  accent: string;
  accentDark: string;
  accentLight: string;
  date: string;
  tag: string;
  title: string;
  subtitle: string;
  quote?: string;
  quoteAttrib?: string;
  paragraphs: string[];
  highlights?: { label: string; value: string }[];
  photoSide?: "left" | "right";
  bg?: string;
  /** When true, the section uses a subtle accent wash background. */
  accentBg?: boolean;
  /** When true, render the heroMedia full-width across the top, with paragraphs+quote in 2-cols below. Used for panoramic images. */
  heroFullWidth?: boolean;
  /** Extra top padding before this section (used to space the last event). */
  topGap?: number;
  awardsTable?: { category: string; winners: string }[];
  awardsMedia?: React.ReactNode;
  heroMedia?: React.ReactNode;
  children?: React.ReactNode;
}

function EventSection({
  id, accent, accentDark, accentLight, date, tag, title, subtitle,
  quote, quoteAttrib, paragraphs, highlights, photoSide = "right",
  bg = "#fff", accentBg = false, heroFullWidth = false, topGap = 0,
  awardsTable, awardsMedia, heroMedia, children,
}: EventSectionProps) {
  // Subtle wash when accentBg=true: a soft tint of the accent on a near-white surface,
  // with all body text staying dark. Only headers, eyebrows, dividers and small accents
  // pick up the accent colour. The hero banner (outside this component) is the only
  // full-bleed accent area on the page.
  const sectionBg = accentBg
    ? `linear-gradient(180deg, ${accentLight} 0%, #ffffff 100%)`
    : bg;

  return (
    <section id={id} style={{ background: sectionBg, position: "relative", overflow: "hidden", paddingTop: topGap, scrollMarginTop: 80 }}>
      {accentBg && (
        <div style={{ position: "absolute", top: topGap, right: -80, width: 360, height: 360, background: `radial-gradient(circle, ${accent}22 0%, transparent 70%)`, pointerEvents: "none" }} />
      )}

      {/* Full-width coloured header bar — edge-to-edge — distinguishes events */}
      <div style={{ background: `linear-gradient(135deg, ${accentDark} 0%, ${accent} 100%)`, padding: "32px 56px", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, backgroundImage: "repeating-linear-gradient(45deg,rgba(255,255,255,0.05) 1px,transparent 1px)", backgroundSize: "28px 28px", pointerEvents: "none" }} />
        <div style={{ position: "absolute", top: -60, right: -40, width: 240, height: 240, background: "radial-gradient(circle, rgba(255,255,255,0.18) 0%, transparent 68%)", pointerEvents: "none" }} />
        <div style={{ position: "relative", maxWidth: 1100, margin: "0 auto", display: "flex", alignItems: "center", gap: 16 }}>
          <div style={{ width: 4, height: 56, background: "rgba(255,255,255,0.85)", borderRadius: 2, flexShrink: 0 }} />
          <div>
            <p style={{ fontFamily: "'DM Mono',monospace", fontSize: 10, fontWeight: 700, letterSpacing: "1.8px", textTransform: "uppercase", color: "rgba(255,255,255,0.75)", marginBottom: 6 }}>{date} · {tag}</p>
            <h2 style={{ fontSize: 26, fontWeight: 900, color: "#fff", letterSpacing: "-0.4px", lineHeight: 1.2, margin: 0 }}>{title}</h2>
            <p style={{ fontSize: 14, color: "rgba(255,255,255,0.85)", marginTop: 4 }}>{subtitle}</p>
          </div>
        </div>
      </div>

      <div style={{ padding: "72px 56px 96px", position: "relative", zIndex: 1, maxWidth: 1100, margin: "0 auto" }}>

        {/* Body layout — heroFullWidth puts the image full-width across the top
            and renders paragraphs (left) + quote (right) below. Default keeps the
            existing 2-column text + media layout. */}
        {heroFullWidth && heroMedia ? (
          <>
            <div style={{ marginBottom: 48 }}>{heroMedia}</div>
            <div style={{ display: "grid", gridTemplateColumns: quote ? "1.15fr 0.85fr" : "1fr", gap: 48, alignItems: "start", marginBottom: highlights || awardsTable || children ? 48 : 0 }}>
              <div>
                {paragraphs.map((p, i) => (
                  <p key={i} style={{ fontSize: 14.5, color: "#475569", lineHeight: 1.82, marginBottom: 16 }}>{p}</p>
                ))}
              </div>
              {quote && (
                <div style={{ background: accentLight, borderLeft: `4px solid ${accent}`, borderRadius: "0 12px 12px 0", padding: "24px 26px", position: "sticky", top: 96 }}>
                  <div style={{ fontSize: 36, lineHeight: 0.7, color: accent + "55", fontFamily: "Georgia,serif", marginBottom: 10 }}>"</div>
                  <p style={{ fontFamily: "'Playfair Display',Georgia,serif", fontSize: 15, fontStyle: "italic", color: NAVY, lineHeight: 1.7, marginBottom: 12 }}>{quote}</p>
                  {quoteAttrib && <p style={{ fontFamily: "'DM Mono',monospace", fontSize: 10, fontWeight: 700, letterSpacing: "1px", textTransform: "uppercase", color: accentDark }}>{quoteAttrib}</p>}
                </div>
              )}
            </div>
          </>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: photoSide === "left" ? "0.95fr 1.05fr" : "1.05fr 0.95fr", gap: 56, alignItems: "start", marginBottom: highlights || awardsTable || children ? 48 : 0 }}>

            {/* Text column */}
            <div style={{ order: photoSide === "left" ? 2 : 1 }}>
              {quote && (
                <div style={{ background: accentLight, borderLeft: `4px solid ${accent}`, borderRadius: "0 12px 12px 0", padding: "20px 24px", marginBottom: 28 }}>
                  <div style={{ fontSize: 36, lineHeight: 0.7, color: accent + "50", fontFamily: "Georgia,serif", marginBottom: 10 }}>"</div>
                  <p style={{ fontFamily: "'Playfair Display',Georgia,serif", fontSize: 16, fontStyle: "italic", color: NAVY, lineHeight: 1.7, marginBottom: 10 }}>{quote}</p>
                  {quoteAttrib && <p style={{ fontFamily: "'DM Mono',monospace", fontSize: 10, fontWeight: 700, letterSpacing: "1px", textTransform: "uppercase", color: accentDark + "aa" }}>{quoteAttrib}</p>}
                </div>
              )}
              {paragraphs.map((p, i) => (
                <p key={i} style={{ fontSize: 14.5, color: "#475569", lineHeight: 1.82, marginBottom: 16 }}>{p}</p>
              ))}
            </div>

            {/* Photo / media column */}
            <div style={{ order: photoSide === "left" ? 1 : 2 }}>
              {heroMedia || (
                <div style={{ borderRadius: 16, overflow: "hidden", position: "relative", background: `linear-gradient(135deg,${accentLight} 0%,${accentLight}80 100%)`, border: `1px solid ${accent}20` }}>
                  <div style={{ height: 300, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 12 }}>
                    <div style={{ width: 56, height: 56, borderRadius: "50%", background: accent + "22", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={accent} strokeWidth="1.8"><rect x="3" y="3" width="18" height="18" rx="3"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="M21 15l-5-5L5 21"/></svg>
                    </div>
                    <p style={{ fontFamily: "'DM Mono',monospace", fontSize: 11, color: accent + "99", letterSpacing: "1px", textTransform: "uppercase" }}>Photo — {tag}</p>
                  </div>
                  <div style={{ background: "#fff", borderTop: `3px solid ${accent}`, padding: "14px 20px" }}>
                    <p style={{ fontSize: 12, color: "#475569", lineHeight: 1.5 }}><strong style={{ color: NAVY }}>{tag}</strong> · {date}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Highlights row */}
        {highlights && (
          <div style={{ display: "grid", gridTemplateColumns: `repeat(${highlights.length},1fr)`, gap: 12 }}>
            {highlights.map(h => (
              <div key={h.label} style={{ background: accentLight, borderRadius: 12, padding: "20px 20px", borderTop: `3px solid ${accent}` }}>
                <div style={{ fontSize: 22, fontWeight: 900, color: accentDark, letterSpacing: "-0.5px" }}>{h.value}</div>
                <div style={{ fontFamily: "'DM Mono',monospace", fontSize: 11, color: accentDark + "99", marginTop: 5, letterSpacing: "0.5px" }}>{h.label}</div>
              </div>
            ))}
          </div>
        )}

        {/* Awards section: table + optional photo box side-by-side */}
        {awardsTable && (
          <div style={{ marginTop: 44 }}>
            <p style={{ fontFamily: "'DM Mono',monospace", fontSize: 10, fontWeight: 700, letterSpacing: "1.5px", textTransform: "uppercase", color: accent, marginBottom: 8 }}>Tata Volunteering Week Awards</p>
            <h3 style={{ fontSize: 18, fontWeight: 800, color: NAVY, letterSpacing: "-0.3px", marginBottom: 16 }}>Award Categories & Winners</h3>
            <p style={{ fontSize: 14, color: "#475569", lineHeight: 1.75, marginBottom: 24, maxWidth: 760 }}>
              The Conclave concluded on a celebratory note with the Volunteering Award winners being felicitated by Tata Sons leaders Ms. Roopa Purushothaman, Chief Economist and Head of Policy Advocacy, Tata Sons; Ms. Nupur Mallick, Group Chief Human Resources Officer and Mr. Siddharth Sharma, Group Chief Sustainability Officer, Tata Sons.
            </p>
            <div style={{ display: "grid", gridTemplateColumns: awardsMedia ? "1.3fr 1fr" : "1fr", gap: 24, alignItems: "start" }}>
              <div style={{ border: `1px solid ${accent}22`, borderRadius: 14, overflow: "hidden" }}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", background: accentDark, padding: "12px 20px" }}>
                  <span style={{ fontFamily: "'DM Mono',monospace", fontSize: 10, fontWeight: 700, letterSpacing: "1px", textTransform: "uppercase", color: "rgba(255,255,255,0.7)" }}>Category</span>
                  <span style={{ fontFamily: "'DM Mono',monospace", fontSize: 10, fontWeight: 700, letterSpacing: "1px", textTransform: "uppercase", color: "rgba(255,255,255,0.7)" }}>Winners</span>
                </div>
                {awardsTable.map((row, i) => (
                  <div key={i} style={{ display: "grid", gridTemplateColumns: "1fr 1fr", padding: "14px 20px", background: i % 2 === 0 ? "#fff" : accentLight, borderTop: `1px solid ${accent}18` }}>
                    <span style={{ fontSize: 13.5, fontWeight: 700, color: NAVY, lineHeight: 1.4 }}>{row.category}</span>
                    <span style={{ fontSize: 13, color: "#475569", lineHeight: 1.5 }}>{row.winners}</span>
                  </div>
                ))}
              </div>
              {awardsMedia}
            </div>
          </div>
        )}

        {/* Sub-events */}
        {children}
      </div>
    </section>
  );
}

// ── Main ──────────────────────────────────────────────────────────────────────
export default function EventsView() {
  return (
    <div style={{ background: "#eef0f5", minHeight: "100vh", fontFamily: "'DM Sans',sans-serif", paddingTop: 64 }}>
      <div style={{ height: 4, background: ACCENT, position: "sticky", top: 64, zIndex: 100 }} />
      <SubPageDotRail sections={SECTIONS} accentColour={ACCENT} />
      <Hero />

      {/* Intro strip */}
      <section id="events-intro" style={{ background: "#f5f5fa", padding: "56px 56px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <p style={{ fontSize: 15, color: "#475569", lineHeight: 1.85, maxWidth: 760 }}>
            From global conclaves to international volunteering forums, Tata Engage brings together leaders, volunteers, and partners to advance the cause of corporate volunteering. These landmark events celebrate milestones, share best practices, and set the agenda for what comes next.
          </p>
        </div>
      </section>

      {/* TSC 2022 — accent (red) bg */}
      <EventSection
        id="events-tsc22"
        accent={ACCENT}
        accentDark={ACCENT_DARK}
        accentLight={ACCENT_LIGHT}
        date="November 2022"
        tag="TSC 2022"
        title="Tata Sustainability Conclave 2022"
        subtitle="Volunteering @Tata: Embedding Quality & Scale — Taj Lands End, Mumbai"
        quote="While sustainability is one of the biggest challenges facing corporates today, it is also a big opportunity."
        quoteAttrib="N. Chandrasekaran, Chairman, Tata Sons"
        paragraphs={[
          "After a two-year break due to the pandemic, more than 200 leaders and sustainability professionals from the Tata Group came together at the Tata Sustainability Conclave 2022 (TSC 2022) — the Tata Sustainability Group's flagship event — inaugurated by the Group Chairman at Taj Lands End, Mumbai on 29th November, 2022. Mr. Siddharth Sharma, Group Chief Sustainability Officer, delivered the welcome address, detailing the Group's Sustainability Approach and the role of the Tata Sustainability Group in realising the Group's Sustainability Vision.",
          "Comparing the sustainability journey to an ultra-marathon, the Chairman encouraged companies to sharpen their sustainability agendas, lay out decarbonisation plans as the world transitions to a low-carbon economy, and invest in innovative solutions.",
          "The volunteering session aimed to celebrate the Tata Group legacy of giving back, seek leadership perspectives on enterprise-level efforts to institutionalise volunteering while ensuring scale and quality, and cross-share challenges and opportunities on the journey towards 4 per capita volunteering hours (PCVH) by 2025.",
        ]}
        heroMedia={
          <Slideshow
            accent={ACCENT}
            accentDark={ACCENT_DARK}
            slides={[
              { src: tsc22Chairman, caption: "Mr. N. Chandrasekaran, Chairman, Tata Sons delivering the inaugural address at the Tata Sustainability Conclave 2022." },
            ]}
          />
        }
        highlights={[
          { label: "Leaders in attendance", value: "200+" },
          { label: "Tata companies", value: "Multi" },
          { label: "Group PCVH aspiration", value: "4 by 2025" },
        ]}
        awardsTable={[
          { category: "Volunteering Stalwart", winners: "Tata Consultancy Services" },
          { category: "Highest Volunteering Hours (TVW-19)", winners: "TCS · Tata Coffee · Tata Consulting Engineers · Tata Realty & Infrastructure" },
          { category: "Excellence in Volunteering", winners: "Tata Communications · TCS · Titan · Rallis India · Tata Insights & Quants" },
          { category: "SPOC Hero", winners: "SPOCs across companies recognised for steering TVW activities" },
          { category: "Exemplary Volunteering", winners: "Individual volunteer champions clocking maximum TVW hours" },
        ]}
        awardsMedia={
          <Slideshow
            accent={ACCENT}
            accentDark={ACCENT_DARK}
            slides={[
              { src: tsc22Awards, caption: "Volunteering Award winners felicitated by Tata Sons leaders Ms. Roopa Purushothaman, Ms. Nupur Mallick, and Mr. Siddharth Sharma at TSC 2022." },
            ]}
          />
        }
      >
        {/* Sub-event: TSC 2022 Panel Discussion */}
        <SubEvent
          accent={ACCENT}
          accentDark={ACCENT_DARK}
          accentLight={ACCENT_LIGHT}
          title="Panel Discussion — Embedding Quality & Scale"
          body={[
            "Moderated by Mr. Harish Bhat, Brand Custodian, Tata Sons, the panel reiterated the Group aspiration of 4 per capita volunteering hours by 2025 — inked by the Tata Group Sustainability Council — and discussed the many benefits of volunteering for communities and for employees alike.",
            "Mr. Puneet Chhatwal, MD & CEO, Indian Hotels Company Ltd., shared how IHCL moved from PCVH of 0.59 in FY21 to 2.25 in FY22, embedding volunteering as part of the core value of \"Tajness\".",
            "Mr. Sanjiv Lal, MD & CEO, Rallis India Ltd., spoke on Rallis' rural-community focus, motivating employees to engage with farming communities while consistently growing PCVH year-on-year.",
            "Mr. A.S. Lakshminarayanan, MD & CEO, Tata Communications, highlighted DRIVE Week as the company's flagship volunteering programme, and the approach to executing it across international locations.",
            "Mr. Milind Lakkad, CHRO, Tata Consultancy Services, spoke passionately on the digital Adult Literacy Programme and TCS' plan to democratise it through the Each One Empowers One platform — enabling employees across the Tata Group to scale impact.",
          ]}
        />
      </EventSection>

      {/* VOLCON 2024 — white bg with sub-events keeping VOLCON blue accent */}
      <EventSection
        id="events-volcon"
        accent={B_PINK}
        accentDark={B_PINK_DARK}
        accentLight={B_PINK_LIGHT}
        date="March 2024"
        tag="VOLCON 2024"
        title="TATA VOLCON 2024"
        subtitle="Celebrating a Million Hours — Taj Mahal Palace, Mumbai"
        paragraphs={[
          "On 6th March 2024, Tata Sustainability Group hosted TATA VOLCON 2024 at Taj Mahal Palace, Mumbai — bringing together 170 Tata leaders, volunteering leads, champions, and employees. Over the past seven years, collective efforts have contributed to the Tata Group clocking over a million volunteering hours annually, surpassing the aspiration of 4 volunteering hours per capita.",
          "The day-long programme reiterated the Group's volunteering goal, celebrated champions across companies, and surfaced leaders' perspectives on the pathways to the 2025 aspiration — alongside best practices to deepen and widen volunteering at an enterprise level.",
        ]}
        photoSide="left"
        bg="#fff"
        heroMedia={
          <Slideshow
            accent={B_PINK}
            accentDark={B_PINK_DARK}
            slides={[
              { src: volconChacko, caption: "Mr. Chacko Thomas, Group Chief Sustainability Officer, delivered the inaugural address at the TATA VOLCON 2024." },
            ]}
          />
        }
        highlights={[
          { label: "Leaders in attendance", value: "170" },
          { label: "Award categories", value: "9" },
          { label: "Companies honoured", value: "11" },
          { label: "Annual hours clocked", value: "1M+" },
        ]}
      >
        {/* Sub-event: Chacko Thomas inaugural quote */}
        <SubEvent
          accent={B_PINK}
          accentDark={B_PINK_DARK}
          accentLight={B_PINK_LIGHT}
          title="Inaugural Address — Mr. Chacko Thomas"
          body={[
            "The opening address was delivered by Mr. Chacko Thomas, Group Chief Sustainability Officer at Tata Sons, who highlighted the remarkable volunteering journey of the Tata Group — rooted in Jamsetji Tata's vision of keeping the community central, and the Tata core value of responsibility.",
            "With over a million employees globally, the Tata Group ranked prominently among corporate volunteering programmes worldwide in FY23. He emphasised that embedding scale in volunteering had been possible due to the Group's 'Big Tent' approach, and committed: \"Moving ahead, we will continue to embed further scale and quality in volunteering, towards increased social and environmental impact.\"",
          ]}
        />

        {/* Sub-event: Nichole Cirillo — YouTube embed */}
        <SubEvent
          accent={B_PINK}
          accentDark={B_PINK_DARK}
          accentLight={B_PINK_LIGHT}
          title="Special Address — Nichole Cirillo, IAVE"
          mediaSide="left"
          body={[
            "The keynote address at TATA VOLCON 2024 was delivered by Nichole Cirillo, Executive Director of the International Association for Volunteer Efforts (IAVE).",
            "Nichole congratulated the Tata Group for fostering a positive, inclusive, and sustainable culture of volunteering across companies and their diverse business contexts. She presented future trends for volunteering identified through IAVE's global research, which resonated with the volunteering SPOCs and champions, and expressed hope that the Tata Group continues to be a global leader — achieving the landmark 10 PCVH performance in the near future.",
          ]}
          media={
            <YouTubeEmbed
              id="ld0-X5_fEGA"
              accent={B_PINK}
              caption="Executive Director of the International Association for Volunteer Efforts (IAVE), Nichole Cirillo, delivering the special address at TATA VOLCON 2024."
            />
          }
        />

        {/* Sub-event: Leaders Speak Panel */}
        <SubEvent
          accent={B_PINK}
          accentDark={B_PINK_DARK}
          accentLight={B_PINK_LIGHT}
          title="Leaders Speak — Panel Discussion"
          body={[
            "The power-packed session highlighted how a culture of volunteering had been built within different business realities, and how it had brought alive the core Tata value of responsibility.",
            "Moderated by Mr. Adrian Terron, Head of Corporate Brand and Marketing Strategy at Tata Group, the panelists included Dr. Praveer Sinha, MD & CEO, Tata Power Group; Mr. Neelesh Garg, MD & CEO, Tata AIG General Insurance Company; Mr. Sanjay Dutt, MD & CEO, Tata Realty And Infrastructure; and Mr. Milind Lakkad, CHRO, Tata Consultancy Services — who shared their invaluable perspectives on volunteering.",
          ]}
          media={
            <Slideshow
              accent={B_PINK}
              accentDark={B_PINK_DARK}
              slides={[
                { src: volconPanel, caption: "Discussing culture of volunteering within different business realities at TATA VOLCON 2024 — L–R: Mr. Adrian Terron (Tata Group); Mr. Neelesh Garg (Tata AIG); Dr. Praveer Sinha (Tata Power); Mr. Sanjay Dutt (Tata Realty & Infrastructure); Mr. Milind Lakkad (TCS)." },
              ]}
            />
          }
        />

        {/* Sub-event: Tata Engage Awards */}
        <SubEvent
          accent={B_PINK}
          accentDark={B_PINK_DARK}
          accentLight={B_PINK_LIGHT}
          title="Tata Engage Awards"
          mediaSide="left"
          body={[
            "The evening celebrated the remarkable dedication of both companies and individuals to year-round volunteering across various platforms through the prestigious Tata Engage Awards. Presented to 11 deserving companies across 9 distinguished categories, honourees included Tata Consultancy Services, Tata Power Group, Tata Communications, Tata Coffee, Titan Company, Rallis India, Tata Consulting Engineers, Tata Realty and Infrastructure, and Tata Insights and Quants.",
            "Two employees — Nitin Yadav (Tata Motors) and Arjinder Singh (Tata Power) — were honoured for Exemplary Volunteering, recognising their exceptional efforts and unmatched commitment to social causes over the years.",
            "The winners were felicitated by Tata Sons leaders, including Mr. K.R.S. Jamwal, Executive Director, Tata Industries; Mr. Harish Bhat, Tata Sons; and Mr. Chacko Thomas, Group Chief Sustainability Officer, Tata Sons.",
          ]}
          media={
            <Slideshow
              accent={B_PINK}
              accentDark={B_PINK_DARK}
              slides={[
                { src: volconAwardsTCS, caption: "Tata Consultancy Services, one of the winners of the Tata Engage Awards, at TATA VOLCON 2024." },
                { src: volconNitin, caption: "Nitin Yadav from Tata Motors — recipient of the prestigious Exemplary Volunteering Award at TATA VOLCON 2024." },
                { src: volconArjinder, caption: "Arjinder Singh from Tata Power — recipient of the prestigious Exemplary Volunteering Award at TATA VOLCON 2024." },
              ]}
            />
          }
        />

        {/* Sub-event: Cultural celebration */}
        <SubEvent
          accent={B_PINK}
          accentDark={B_PINK_DARK}
          accentLight={B_PINK_LIGHT}
          title="Cultural Celebration — Kalasagar & Tribal Home Chefs"
          body={[
            "The evening was made even more special with a power-packed musical performance by Kalasagar, the cultural society of Tata Motors, and Tribal Home Chefs supported by Tata Steel Foundation — from 5 states (Meghalaya, Arunachal Pradesh, Himachal Pradesh, Telangana, and Jharkhand) — who served exquisite culinary delights.",
          ]}
          media={
            <Slideshow
              accent={B_PINK}
              accentDark={B_PINK_DARK}
              slides={[
                { src: volconMusic1, caption: "Kalasagar, the cultural society of Tata Motors, delivered an enthralling musical performance at TATA VOLCON 2024." },
                { src: volconMusic2, caption: "Performers and guests on stage at TATA VOLCON 2024." },
                { src: volconTribalChefs, caption: "Tribal Home Chefs supported by Tata Steel Foundation — enriching the gathering with the richness of tribal delicacies." },
              ]}
            />
          }
        />
      </EventSection>

      {/* IAVE 2022 — accent (green) bg */}
      <EventSection
        id="events-iave"
        accent={B_ORANGE}
        accentDark={B_ORANGE_DARK}
        accentLight={B_ORANGE_LIGHT}
        date="October 2022"
        tag="IAVE 2022"
        title="Tata Sustainability Group at the 26th IAVE World Volunteer Conference"
        subtitle="Volunteering for the Common Good — ADNOC Business Center, Abu Dhabi (24–27 October 2022)"
        quote="For over 150 years, Tata Group has served as a contributor to public good. With over 1 million employees globally, the Tata Group corporate volunteering programme has contributed over 8 million hours. With strong leadership commitment to deepen and broaden volunteering across the Tata Group, we follow the big tent approach with a focus on impact volunteering. As a member of the Board of Directors of IAVE, we are committed to lending strength to IAVE's stewardship in driving excellence in corporate volunteering."
        quoteAttrib="Chacko Thomas, Group Chief Sustainability Officer, Tata Sons"
        paragraphs={[
          "Tata Sustainability Group was invited as a panel member for the plenary 'Corporate Volunteering for a Post-Pandemic World'. The session was moderated by Dr. Kenn Allen (IAVE, USA); panelists included Dr. Tania Haddad (American University of Beirut, Lebanon); Andronica Mabuya (Discovery, South Africa); Stephanie Franco (TELUS, Canada); and Gauri Rajadhyaksha (Tata Sons, India).",
          "The conference theme — 'Volunteering for the Common Good: Making Life Better for People and Communities' — saw IAVE and the Emirates Foundation celebrate volunteering and call for stronger volunteer leadership to address the world's most pressing challenges and build a more equal, inclusive future.",
          "Gauri Rajadhyaksha shared the Tata Group's approach to volunteering and the role of Tata Engage in unifying all group companies onto a common platform. She underscored the importance of company-specific programmes that align business context and employee aspirations, and the IAVE recommendations to 'widen the big tent of volunteering' and to focus on impact-focused, skill-based volunteering — while applauding Tata SPOCs across companies for steering the Group to clock over a million volunteering hours annually for seven consecutive years.",
          "The Tata Group has been a member and contributor to IAVE since 2018. Tata Engage won the 'Best Global Volunteer Programme' award from IAVE in 2019 and joined IAVE's Global Corporate Volunteer Council — a consortium of global companies with volunteering presence in three or more countries — in 2019–20.",
        ]}
        heroMedia={
          <Slideshow
            accent={B_ORANGE_DARK}
            accentDark={B_ORANGE_DARK}
            aspect="3.5/1"
            slides={[
              { src: iavePanel, caption: "Plenary panel 'Corporate Volunteering for a Post-Pandemic World' at the 26th IAVE World Volunteer Conference, Abu Dhabi — including Gauri Rajadhyaksha (Tata Sons, India)." },
            ]}
          />
        }
        highlights={[
          { label: "IAVE member since", value: "2018" },
          { label: "Best Global Volunteer Programme", value: "2019" },
          { label: "Cumulative volunteering hours", value: "8M+" },
        ]}
        heroFullWidth
        topGap={32}
      />
    </div>
  );
}
