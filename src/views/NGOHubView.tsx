import { useState, useEffect, useRef } from "react";
import { useAppContext } from "@/context/AppContext";
import { useAppNavigate } from "@/hooks/useAppNavigate";
import { ArrowRight } from "lucide-react";
import { Facebook, Twitter, Instagram, Linkedin, Youtube } from "lucide-react";
import tataLogo from "@/assets/tata-logo.png";
import tataEngageLogo from "@/assets/tata-engage-logo-nobg.png";
import heroImg from "@/assets/infiniti-1.jpg";
import { B_TICKER, B_YELLOW, B_TEAL, ACCENT_NAVY } from "@/data/homeSharedData";
import { ProgrammeSpotlight, JourneySection, NumbersSection, QuoteBanner, TickerBar, SectionDivider } from "@/components/shared/HomeSections";

const B_NGO = "#F0494E";

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

const NGOHubView = () => {
  const { ngoData, triggerToast } = useAppContext();
  const navigate = useAppNavigate();

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

      {/* HERO — full-bleed edge-to-edge */}
      <section id="hub-hero" className="relative w-full overflow-hidden" style={{ minHeight: "92vh" }}>

        {/* Background image */}
        <img
          src={heroImg}
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
          style={{ objectPosition: "center 40%" }}
        />

        {/* ACCENT-tinted gradient */}
        <div className="absolute inset-0" style={{
          background: `linear-gradient(110deg, ${B_NGO}e8 0%, ${B_NGO}cc 38%, ${B_NGO}aa 58%, ${B_NGO}77 78%, ${B_NGO}44 100%)`
        }} />

        <div className="relative z-10 flex flex-col justify-between px-8 md:px-16 py-8" style={{ minHeight: "92vh", paddingTop: 80 }}>

            {/* Top — greeting */}
            <div>
              <p className="text-white/90 text-4xl font-sans font-light" style={{ letterSpacing: "-0.5px", lineHeight: 1.15 }}>
                {greeting()}, <span className="font-bold text-white">{ngoData.firstName ?? "Anjali"}</span>.
              </p>
              <p className="text-white/50 text-base font-medium tracking-wide mt-2">
                Let's move your mission forward.
              </p>
            </div>

            {/* Centre — quote */}
            <div className="max-w-lg">
              <svg width="24" height="20" viewBox="0 0 28 22" fill="none" className="mb-3 opacity-20">
                <path d="M0 22V13.5C0 5.8 4.5 1.5 13.5 0L15 3C10.5 4.2 8 7 7.5 11H12V22H0ZM16 22V13.5C16 5.8 20.5 1.5 29.5 0L31 3C26.5 4.2 24 7 23.5 11H28V22H16Z" fill="white"/>
              </svg>
              <h2 className="text-white font-bold text-xl md:text-2xl leading-snug tracking-tight mb-3">
                Alone we can do so little; together we can do so much.
              </h2>
              <p className="text-white/40 text-xs font-bold uppercase tracking-widest">— Helen Keller</p>
            </div>

            {/* Bottom — CTA */}
            <div className="flex justify-end">
              <button
                onClick={() => navigate("ngo-dashboard")}
                className="flex items-center gap-2 text-white text-sm font-bold px-6 py-2.5 rounded-xl hover:brightness-110 transition-all cursor-pointer shadow-lg"
                style={{ backgroundColor: B_NGO }}
              >
                My Space <ArrowRight size={15} />
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
              border: "1px solid #e2e8f0",
              color: B_TICKER,
              boxShadow: "0 1px 6px rgba(0,0,0,0.10)",
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

export default NGOHubView;
