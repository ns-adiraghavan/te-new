import { useState, useEffect, useRef } from "react";
import { ArrowRight } from "lucide-react";
import { Facebook, Twitter, Instagram, Linkedin, Youtube } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useAppContext } from "@/context/AppContext";
import { useAppNavigate } from "@/hooks/useAppNavigate";
import { ROHAN_DESAI_VOLUNTEER } from "@/data/mockData";
import RoleToggle from "@/components/shared/RoleToggle";
import tataLogo from "@/assets/tata-logo.png";
import tataEngageLogo from "@/assets/tata-engage-logo-nobg.png";
import heroImg from "@/assets/Taj_Sats_1.jpeg";
import { B_TICKER, B_YELLOW, ACCENT_NAVY } from "@/data/homeSharedData";
import { ProgrammeSpotlight, JourneySection, NumbersSection, QuoteBanner, TickerBar, SectionDivider } from "@/components/shared/HomeSections";

const DOT_SECTIONS = [
  { id: "hub-hero", label: "Home" },
  { id: "programmes", label: "Programmes" },
  { id: "journey", label: "Journey" },
  { id: "numbers", label: "Numbers" },
];
const ACCENT = B_TICKER;

const greeting = () => {
  const h = new Date().getHours();
  if (h < 12) return "Good morning";
  if (h < 17) return "Good afternoon";
  return "Good evening";
};

const VolunteerHubView = () => {
  const { user: authUser } = useAuth();
  const navigate = useAppNavigate();
  const { triggerToast } = useAppContext();

  const user = authUser?.role === "corporate_spoc" ? ROHAN_DESAI_VOLUNTEER : authUser;

  const [activeSection, setActiveSection] = useState(0);
  const [showLabel, setShowLabel] = useState(false);

  const labelTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const obs: IntersectionObserver[] = [];
    DOT_SECTIONS.forEach((s, idx) => {
      const el = document.getElementById(s.id);
      if (!el) return;
      const o = new IntersectionObserver(([e]) => {
        if (e.isIntersecting) {
          setActiveSection(idx);
          setShowLabel(true);
          if (labelTimer.current) clearTimeout(labelTimer.current);
          labelTimer.current = setTimeout(() => setShowLabel(false), 1800);
        }
      }, { threshold: 0.2 });
      o.observe(el);
      obs.push(o);
    });
    return () => { obs.forEach((o) => o.disconnect()); if (labelTimer.current) clearTimeout(labelTimer.current); };
  }, []);



  return (
    <div className="min-h-screen bg-white pb-12">

      {/* Dot rail */}
      <div className="fixed right-4 top-1/2 -translate-y-1/2 z-40 flex flex-col items-end" style={{ gap: 0 }}>
        {DOT_SECTIONS.map((s, i) => {
          const active = activeSection === i;
          const isLast = i === DOT_SECTIONS.length - 1;
          const dotColor = ACCENT;
          const inactiveColor = "#CBD5E1";
          const lineColor = `${ACCENT}50`;
          return (
            <div key={s.id} className="flex flex-col items-end">
              <button
                onClick={() => document.getElementById(s.id)?.scrollIntoView({ behavior: "smooth" })}
                className="flex items-center justify-end"
                style={{ marginBottom: 0 }}
              >
                {active && showLabel && (
                  <span
                    className="whitespace-nowrap shadow-sm transition-all duration-300 mr-2"
                    style={{
                      fontSize: 11, fontWeight: 700, letterSpacing: "0.3px",
                      padding: "3px 9px",
                      borderRadius: 4,
                      backgroundColor: "rgba(13,27,62,0.92)",
                      border: `1px solid ${ACCENT_NAVY}`,
                      color: "#ffffff",
                    }}>
                    {s.label}
                  </span>
                )}
                <span
                  className="transition-all duration-300"
                  style={{
                    width: active ? 9 : 6, height: active ? 9 : 6,
                    borderRadius: 2,
                    backgroundColor: active ? dotColor : inactiveColor,
                    border: `1px solid ${active ? dotColor : inactiveColor}`,
                    display: "block",
                    flexShrink: 0,
                  }}
                />
              </button>
              {!isLast && (
                <div style={{
                  width: 1,
                  height: 28,
                  marginLeft: "auto",
                  marginRight: active ? "4px" : "2.5px",
                  backgroundImage: `repeating-linear-gradient(to bottom, ${lineColor} 0px, ${lineColor} 3px, transparent 3px, transparent 7px)`,
                  transition: "all 0.3s",
                }} />
              )}
            </div>
          );
        })}
      </div>

      {/* ══════════════════════════════════════════════════════════════════
          HERO — full-bleed edge-to-edge
      ══════════════════════════════════════════════════════════════════ */}
      <section id="hub-hero" className="relative w-full overflow-hidden" style={{ minHeight: "92vh" }}>

        {/* Background image */}
        <img
          src={heroImg}
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
          style={{ objectPosition: "center 30%", transform: "scaleX(-1)" }}
        />

        {/* ACCENT-tinted gradient */}
        <div className="absolute inset-0" style={{
          background: `linear-gradient(110deg, #135EA9e8 0%, #135EA9cc 38%, #135EA9aa 58%, #135EA977 78%, #135EA944 100%)`
        }} />

        <div className="relative z-10 flex flex-col" style={{ minHeight: "92vh", paddingTop: 64, padding: "clamp(72px, 10vw, 80px) clamp(20px, 5vw, 64px) clamp(40px, 6vw, 64px)", maxWidth: 1100, margin: "0 auto", width: "100%" }}>

            {/* Top — greeting + quote stacked */}
            <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", gap: 48 }}>
              <div style={{ maxWidth: 580 }}>
              {(user?.role?.includes("spoc") || user?.role === "corporate_spoc") && (
                <RoleToggle activeView="volunteer" className="mb-4" />
              )}
              <h1 style={{
                fontFamily: "'DM Sans', 'Noto Sans', ui-sans-serif, system-ui, sans-serif",
                fontSize: "clamp(2.4rem, 5vw, 3.8rem)",
                lineHeight: 1.12, letterSpacing: "-0.5px",
                color: "white", margin: "0 0 16px", fontWeight: 400,
              }}>
                Welcome, <span style={{ fontWeight: 700 }}>{user?.firstName ?? "there"}</span>.
              </h1>
              <div style={{ height: 1.4, width: 80, borderRadius: 2, background: "rgba(255,255,255,0.12)", marginBottom: 18, overflow: "hidden" }}>
                <div style={{ height: "100%", borderRadius: 2, background: B_YELLOW }} />
              </div>
              <p style={{
                fontFamily: "'DM Sans', 'Noto Sans', ui-sans-serif, system-ui, sans-serif",
                fontSize: "clamp(1rem, 1.6vw, 1.25rem)",
                color: "rgba(255,255,255,0.82)", lineHeight: 1.5,
                margin: 0, fontWeight: 300,
              }}>
                Let's make today count.
              </p>
            </div>

            {/* Centre — quote */}
            <div style={{ maxWidth: 520 }}>
              <svg width="24" height="20" viewBox="0 0 28 22" fill="none" style={{ marginBottom: 12, opacity: 0.2 }}>
                <path d="M0 22V13.5C0 5.8 4.5 1.5 13.5 0L15 3C10.5 4.2 8 7 7.5 11H12V22H0ZM16 22V13.5C16 5.8 20.5 1.5 29.5 0L31 3C26.5 4.2 24 7 23.5 11H28V22H16Z" fill="white"/>
              </svg>
              <h2 style={{
                fontFamily: "'DM Sans', 'Noto Sans', ui-sans-serif, system-ui, sans-serif",
                fontSize: "clamp(1.1rem, 1.8vw, 1.4rem)",
                lineHeight: 1.4, letterSpacing: "-0.2px",
                color: "white", margin: "0 0 10px", fontWeight: 400,
              }}>
                The smallest act of kindness is worth more than the grandest intention.
              </h2>
              <p style={{ fontSize: 11, fontWeight: 800, letterSpacing: "2px", textTransform: "uppercase", color: "rgba(255,255,255,0.55)", margin: 0 }}>
                — Oscar Wilde
              </p>
            </div>
            </div>

            {/* Bottom — CTA pinned to bottom-right */}
            <div className="flex justify-end" style={{ paddingTop: 32 }}>
              <button
                onClick={() => navigate("dashboard")}
                className="flex items-center gap-2 cursor-pointer cta-btn"
                style={{
                  padding: "11px 24px", borderRadius: 10,
                  fontSize: 13, fontWeight: 800, color: "#0D1B3E",
                  background: B_YELLOW, border: "none",
                  fontFamily: "'DM Sans', ui-sans-serif, system-ui, sans-serif",
                }}
              >
                My Space <ArrowRight size={14} />
              </button>
            </div>
        </div>
      </section>

      <div id="programmes"><ProgrammeSpotlight /></div>

      {/* Quote banner between Programmes and Numbers */}
      <QuoteBanner />

      <div id="numbers"><NumbersSection /></div>

      <div id="journey"><JourneySection /></div>

      <TickerBar fixed />

      {/* Floating social cluster */}
      <div className="fixed bottom-24 left-5 z-40 flex flex-col gap-2 items-center">
        {[
          { icon: <Linkedin size={15} />, label: "LinkedIn" },
          { icon: <Instagram size={15} />, label: "Instagram" },
          { icon: <Twitter size={15} />, label: "X (Twitter)" },
        ].map(({ icon, label }) => (
          <button
            key={label}
            onClick={() => triggerToast(`Opening ${label}...`)}
            title={label}
            className="w-9 h-9 rounded-full flex items-center justify-center transition-all cursor-pointer"
            style={{
              backgroundColor: "white",
              border: "1px solid #e8e8f0",
              color: B_TICKER,
              boxShadow: "0 1px 6px rgba(13,27,62,0.10)",
            }}
            onMouseEnter={e => (e.currentTarget.style.backgroundColor = "#EEF0FF")}
            onMouseLeave={e => (e.currentTarget.style.backgroundColor = "white")}
          >
            {icon}
          </button>
        ))}
        <div className="w-px h-5" style={{ backgroundColor: "#e2e8f0" }} />
      </div>

    </div>
  );
};

export default VolunteerHubView;
