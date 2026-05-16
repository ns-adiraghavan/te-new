import { useState, useEffect, useRef } from "react";
import { Facebook, Instagram, Linkedin } from "lucide-react";
import { useAppNavigate } from "@/hooks/useAppNavigate";
import { useAuth } from "@/context/AuthContext";

import SubPageDotRail from "@/components/shared/SubPageDotRail";
import partnerHero from "@/assets/tata-comm-2.jpeg";
import partnerSectionImg from "@/assets/tata-communications-1.jpg";
import partnerNgoImg from "@/assets/homepagebanner/Volunteering in Action 5.jpg";

// ── Colour tokens ─────────────────────────────────────────────────────────────
const ACCENT_NAVY  = "#0D1B3E";
const B_YELLOW     = "#F5A623";
const COLOUR       = "#0D6B7A";
const COLOUR_DARK  = "#0A3D47";
const COLOUR_LIGHT = "#E8F5F7";

const DIAG: React.CSSProperties = {
  position: "absolute",
  inset: 0,
  backgroundImage:
    "repeating-linear-gradient(45deg,rgba(255,255,255,0.03) 1px,transparent 1px)",
  backgroundSize: "28px 28px",
  pointerEvents: "none",
};

const SECTIONS = [
  { id: "pwu-intro",   label: "Overview"      },
  { id: "pwu-ngo",     label: "For NGOs"       },
  { id: "pwu-contact", label: "Contact"        },
  { id: "pwu-social",  label: "Stay connected" },
];

// ── DefinerBar ────────────────────────────────────────────────────────────────
function DefinerBar({ light = false }: { light?: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const [on, setOn] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setOn(true); },
      { threshold: 0.4 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return (
    <div
      ref={ref}
      style={{
        height: 3,
        background: light ? "rgba(255,255,255,0.2)" : "#e8e8f0",
        borderRadius: 2,
        overflow: "hidden",
        width: 48,
        marginTop: 10,
      }}
    >
      <div
        style={{
          height: "100%",
          background: light ? "rgba(255,255,255,0.7)" : COLOUR,
          borderRadius: 2,
          transition: "width 0.65s cubic-bezier(0.22,1,0.36,1)",
          width: on ? "100%" : "0%",
        }}
      />
    </div>
  );
}

// ── SVG Icons ─────────────────────────────────────────────────────────────────
const IconRegister = () => (
  <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
    <rect x="4" y="4" width="20" height="20" rx="4"/>
    <path d="M9 14h10M9 9h6M9 19h4"/>
  </svg>
);
const IconPost = () => (
  <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
    <rect x="4" y="4" width="20" height="20" rx="4"/>
    <path d="M9 10h10M9 14h10M9 18h6"/>
    <path d="M22 2l-4 4 4 4"/>
  </svg>
);
const IconSubscribe = () => (
  <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 6h20v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6z"/>
    <path d="M4 6l10 9 10-9"/>
  </svg>
);

// ── 1. Hero — full-bleed immersive ────────────────────────────────────────────
function Hero() {
  return (
    <div
      style={{
        position: "relative",
        minHeight: "92vh",
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        paddingTop: 64,
      }}
    >
      <img
        src={partnerHero}
        alt=""
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          objectPosition: "center 30%",
        }}
        referrerPolicy="no-referrer"
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `linear-gradient(110deg, ${COLOUR}e8 0%, ${COLOUR}cc 38%, ${COLOUR}aa 58%, ${COLOUR}77 78%, ${COLOUR}44 100%)`,
        }}
      />

      <div
        style={{
          position: "relative",
          zIndex: 1,
          maxWidth: 1100,
          margin: "0 auto",
          padding: "0 64px",
          width: "100%",
        }}
      >
        <div style={{ maxWidth: 640 }}>
          <p
            style={{
              fontFamily: "'DM Sans','Noto Sans',ui-sans-serif,system-ui,sans-serif",
              fontSize: 14,
              fontWeight: 700,
              letterSpacing: "1.8px",
              textTransform: "uppercase",
              color: "#ffffff",
              margin: "0 0 12px",
            }}
          >
            Tata Engage · Civil Society Partnerships
          </p>
          <div style={{ width: 48, height: 2, background: "rgba(255,255,255,0.6)", borderRadius: 2, margin: "12px 0 22px" }} />
          <h1
            style={{
              fontFamily: "'DM Sans','Noto Sans',ui-sans-serif,system-ui,sans-serif",
              fontSize: "clamp(2.4rem, 5vw, 3.8rem)",
              fontWeight: 400,
              color: "#fff",
              lineHeight: 1.12,
              letterSpacing: "-0.5px",
              margin: "0 0 18px",
            }}
          >
            Partner With Us
          </h1>
          <p
            style={{
              fontFamily: "'DM Sans','Noto Sans',ui-sans-serif,system-ui,sans-serif",
              fontSize: 16,
              fontWeight: 300,
              lineHeight: 1.7,
              color: "rgba(255,255,255,0.65)",
              margin: "0 0 32px",
              maxWidth: 520,
            }}
          >
            Across the world, there are countless Tata professionals eager to volunteer their time and skills — and equally many civil society organisations doing impactful work that need the right support. Yet, meaningful volunteering opportunities often go unrealised simply because the right connections don't exist.
          </p>
        </div>
      </div>
    </div>
  );
}

// ── 2. Intro — what Tata Engage does (white) ──────────────────────────────────
function IntroSection() {
  return (
    <section id="pwu-intro" style={{ padding: "88px 56px", background: "transparent" }}>
      <div
        style={{
          maxWidth: 1100,
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 72,
          alignItems: "center",
        }}
      >
        <div>
          <p
            style={{
              fontFamily: "'DM Sans','Noto Sans',ui-sans-serif,system-ui,sans-serif",
              fontSize: 14,
              fontWeight: 700,
              letterSpacing: "1.8px",
              textTransform: "uppercase",
              color: COLOUR + "cc",
              marginBottom: 10,
            }}
          >
            What we do
          </p>
          <h2 style={{ fontSize: 30, fontWeight: 900, color: ACCENT_NAVY, letterSpacing: "-0.5px" }}>
            Tata Engage bridges this gap
          </h2>
          <DefinerBar />
          <p style={{ fontSize: 15, color: "#475569", lineHeight: 1.82, marginTop: 24 }}>
            We serve as a trusted platform that connects{" "}
            <strong style={{ color: ACCENT_NAVY }}>credible Not-for-Profit organisations</strong>{" "}
            with{" "}
            <strong style={{ color: ACCENT_NAVY }}>motivated professionals from across the Tata ecosystem</strong>
            , enabling partnerships that strengthen organisational capacity and deliver real, on-ground impact.
          </p>
        </div>

        <div style={{ position: "relative" }}>
          <div
            style={{
              position: "absolute",
              top: -16,
              right: -16,
              zIndex: 0,
              width: 64,
              height: 64,
              borderRadius: 16,
              background: COLOUR,
              opacity: 0.12,
            }}
          />
          <div
            style={{
              borderRadius: 18,
              overflow: "hidden",
              boxShadow: "0 4px 32px rgba(13,27,62,0.10)",
              position: "relative",
              zIndex: 1,
            }}
          >
            <img
              src={partnerSectionImg}
              alt=""
              style={{ width: "100%", height: 380, objectFit: "cover", display: "block" }}
            />
          </div>
          <div
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              height: 4,
              background: COLOUR,
              borderRadius: "0 0 18px 18px",
              zIndex: 2,
            }}
          />
        </div>
      </div>
    </section>
  );
}

// ── 3. For NGOs — DR-style fixed-height dark photo block ─────────────────────
function NGOSection() {
  const steps = [
    {
      num: "01",
      title: "Register on Tata Engage",
      desc: "Interested Not-for-Profit organisations must REGISTER on the Tata Engage platform, provide necessary profile details and upload requested documents for due diligence.",
      Icon: IconRegister,
    },
    {
      num: "02",
      title: "Post your projects, once enrolled",
      desc: "Authorised non-profit representatives can log in and post volunteering projects requiring professional expertise through ProEngage, and stay informed about programme timelines and project upload windows.",
      Icon: IconPost,
    },
    {
      num: "03",
      title: "Subscribe for alerts & updates",
      desc: "SUBSCRIBE to receive regular alerts on Tata Engage initiatives — ProEngage skill-based projects and Tata Volunteering Week large-scale events — so your organisation is ready when volunteers are mobilised.",
      Icon: IconSubscribe,
    },
  ];

  return (
    <section id="pwu-ngo" style={{ position: "relative", overflow: "hidden", minHeight: 480 }}>
      <img
        src={partnerNgoImg}
        alt=""
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 40%" }}
      />
      <div style={{ position: "absolute", inset: 0, background: `linear-gradient(110deg, ${COLOUR}f8 0%, ${COLOUR}e0 38%, ${COLOUR}c0 58%, ${COLOUR}88 78%, ${COLOUR}44 100%)` }} />
      <div style={DIAG} />
      <div style={{ position: "relative", zIndex: 1, padding: "88px 56px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "start" }}>
          <div>
            <p style={{ fontFamily: "'DM Sans','Noto Sans',ui-sans-serif,system-ui,sans-serif", fontSize: 14, fontWeight: 700, letterSpacing: "1.8px", textTransform: "uppercase", color: "#ffffff", marginBottom: 10 }}>
              For not-for-profit organisations
            </p>
            <h2 style={{ fontSize: 30, fontWeight: 900, color: "#fff", letterSpacing: "-0.5px" }}>
              Are you a Not-for-Profit organisation who needs volunteers?
            </h2>
            <div style={{ height: 3, background: "rgba(255,255,255,0.28)", borderRadius: 2, width: 48, marginTop: 10, marginBottom: 28 }} />
            <p style={{ fontSize: 15, color: "rgba(255,255,255,0.8)", lineHeight: 1.8, maxWidth: 380 }}>
              Not-for-Profit organisations seeking to collaborate with the{" "}
              <strong style={{ color: "#fff" }}>Tata Sustainability Group</strong>{" "}
              can partner with Tata Engage to access skilled and committed volunteers.
            </p>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
            {steps.map((s, i) => (
              <div key={s.num} style={{ padding: "24px 0", borderBottom: i < steps.length - 1 ? "1px solid rgba(255,255,255,0.14)" : "none", display: "flex", gap: 20, alignItems: "flex-start" }}>
                <div style={{ width: 52, height: 52, borderRadius: 14, flexShrink: 0, background: "rgba(255,255,255,0.14)", backdropFilter: "blur(4px)", border: "1px solid rgba(255,255,255,0.2)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff" }}>
                  <s.Icon />
                </div>
                <div>
                  <div style={{ fontSize: 10, fontWeight: 700, color: "rgba(255,255,255,0.5)", letterSpacing: "1px", marginBottom: 4 }}>Step {s.num}</div>
                  <div style={{ fontSize: 15, fontWeight: 800, color: "#fff", marginBottom: 6 }}>{s.title}</div>
                  <div style={{ fontSize: 13, color: "rgba(255,255,255,0.65)", lineHeight: 1.7 }}>{s.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ── 3b. TSG Role & Register CTA (dark) ───────────────────────────────────────
function NGORegisterSection() {
  const navigate = useAppNavigate();
  return (
    <section style={{ background: COLOUR_DARK, padding: "88px 56px", position: "relative", overflow: "hidden" }}>
      <div style={DIAG} />
      <div style={{ maxWidth: 1100, margin: "0 auto", position: "relative", zIndex: 1, display: "grid", gridTemplateColumns: "1.1fr 0.9fr", gap: 72, alignItems: "start" }}>
        <div>
          <p style={{ fontFamily: "'DM Sans','Noto Sans',ui-sans-serif,system-ui,sans-serif", fontSize: 14, fontWeight: 700, letterSpacing: "1.8px", textTransform: "uppercase", color: "#ffffff", marginBottom: 10 }}>
            Tata Sustainability Group
          </p>
          <h2 style={{ fontSize: 30, fontWeight: 900, color: "#fff", letterSpacing: "-0.5px" }}>
            TSG's role in Civil Society Partnerships
          </h2>
          <div style={{ height: 3, background: "rgba(255,255,255,0.25)", borderRadius: 2, width: 48, marginTop: 10, marginBottom: 28 }} />
          <p style={{ fontSize: 15, color: "rgba(255,255,255,0.8)", lineHeight: 1.82, marginBottom: 0, maxWidth: 480 }}>
            The Tata Sustainability Group anchors all civil society partnerships on Tata Engage — working closely with Tata companies to identify, vet, and onboard credible Not-for-Profit organisations, and ensuring that volunteer engagements are meaningful, well-supported, and impactful for communities on the ground.
          </p>
        </div>
        <div style={{ background: "rgba(0,0,0,0.22)", borderRadius: 20, padding: "40px 36px", border: "1px solid rgba(255,255,255,0.14)" }}>
          <div style={{ fontSize: 22, fontWeight: 900, color: "#fff", marginBottom: 14, lineHeight: 1.25 }}>
            Register your organisation
          </div>
          <p style={{ fontSize: 15, color: "rgba(255,255,255,0.68)", lineHeight: 1.78, marginBottom: 36 }}>
            Credible Not-for-Profit organisations associated with Tata companies can partner with Tata Engage to access skilled and committed Tata volunteers.
          </p>
          <button
            onClick={() => navigate("register-role")}
            style={{ background: B_YELLOW, color: ACCENT_NAVY, border: "none", borderRadius: 10, padding: "14px 28px", fontWeight: 800, fontSize: 15, cursor: "pointer", width: "100%", boxShadow: "0 4px 20px rgba(13,27,62,0.22)" }}
          >
            Register Your Organisation →
          </button>
        </div>
      </div>
    </section>
  );
}

// ── 4. Contact (dark) ─────────────────────────────────────────────────────────
function ContactSection() {
  const [copied, setCopied] = useState(false);

  const copy = () => {
    navigator.clipboard?.writeText("tataengage@tata.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section
      id="pwu-contact"
      style={{
        background: ACCENT_NAVY,
        padding: "88px 56px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div style={DIAG} />
      <div
        style={{
          maxWidth: 1100,
          margin: "0 auto",
          position: "relative",
          zIndex: 1,
          display: "grid",
          gridTemplateColumns: "1.1fr 0.9fr",
          gap: 72,
          alignItems: "start",
        }}
      >
        <div>
          <p
            style={{
              fontFamily: "'DM Sans','Noto Sans',ui-sans-serif,system-ui,sans-serif",
              fontSize: 14,
              fontWeight: 700,
              letterSpacing: "1.8px",
              textTransform: "uppercase",
              color: "#ffffff",
              marginBottom: 10,
            }}
          >
            Contact &amp; connect
          </p>
          <h2 style={{ fontSize: 30, fontWeight: 900, color: "#fff", letterSpacing: "-0.5px" }}>
            We'd love to hear from you
          </h2>
          <div
            style={{
              height: 3,
              background: "rgba(255,255,255,0.25)",
              borderRadius: 2,
              width: 48,
              marginTop: 10,
              marginBottom: 32,
            }}
          />
          <p style={{ fontSize: 15, color: "rgba(255,255,255,0.72)", lineHeight: 1.82, maxWidth: 480 }}>
            Whether you're a civil society organisation looking for volunteers, or a partner exploring collaboration opportunities, the Tata Engage team is here to help. Write to us with your organisation profile, details of your association with Tata companies, and your volunteering requirements. Our team will be happy to guide you through the next steps of the enrolment process or respond to your queries.
          </p>
        </div>

        <div
          style={{
            background: "rgba(0,0,0,0.22)",
            borderRadius: 20,
            padding: "40px 36px",
            border: "1px solid rgba(255,255,255,0.14)",
          }}
        >
          <div
            style={{
              fontFamily: "'DM Sans','Noto Sans',ui-sans-serif,system-ui,sans-serif",
              fontSize: 10,
              fontWeight: 700,
              letterSpacing: "1.5px",
              textTransform: "uppercase",
              color: "#ffffff",
              marginBottom: 10,
            }}
          >
            Email
          </div>
          <div style={{ fontSize: 19, fontWeight: 800, color: "#fff", marginBottom: 24 }}>
            tataengage@tata.com
          </div>
          <button
            onClick={copy}
            style={{
              background: copied ? "rgba(255,255,255,0.25)" : B_YELLOW,
              color: copied ? "#fff" : ACCENT_NAVY,
              border: "none",
              borderRadius: 10,
              padding: "14px 28px",
              fontWeight: 800,
              fontSize: 14,
              cursor: "pointer",
              transition: "background 0.2s",
              width: "100%",
              boxShadow: copied ? "none" : "0 4px 20px rgba(13,27,62,0.25)",
            }}
          >
            {copied ? "Copied ✓" : "Copy email address"}
          </button>
        </div>
      </div>
    </section>
  );
}

// ── 5. Stay Connected (white) ─────────────────────────────────────────────────
function StayConnectedSection() {
  const socialChannels = [
    { handle: "Tata Engage", platform: "Facebook", note: "Latest news and updates from Tata Engage", time: "Follow us", Icon: Facebook, iconBg: "#1877F2", url: "#" },
    { handle: "@tata_engage", platform: "Instagram", note: "Stories, photos and volunteering moments from across the Group", time: "Follow us", Icon: Instagram, iconBg: "#EC4899", url: "#" },
    { handle: "Tata Engage", platform: "LinkedIn", note: "Professional updates, programme announcements and impact stories", time: "Follow us", Icon: Linkedin, iconBg: "#1D4ED8", url: "#" },
  ];

  return (
    <section id="pwu-social" style={{ padding: "88px 56px", background: "transparent" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ marginBottom: 48 }}>
          <p style={{ fontFamily: "'DM Sans','Noto Sans',ui-sans-serif,system-ui,sans-serif", fontSize: 14, fontWeight: 700, letterSpacing: "1.8px", textTransform: "uppercase", color: COLOUR + "cc", marginBottom: 10 }}>
            Stay connected
          </p>
          <h2 style={{ fontSize: 30, fontWeight: 900, color: ACCENT_NAVY, letterSpacing: "-0.5px" }}>
            Follow Tata Engage
          </h2>
          <DefinerBar />
          <p style={{ fontSize: 15, color: "#64748B", lineHeight: 1.8, maxWidth: 560, marginTop: 20 }}>
            Stay updated on volunteering programmes, partner opportunities, and impact stories from across the Tata ecosystem.
          </p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 20 }}>
          {socialChannels.map((ch, i) => {
            const IconComp = ch.Icon;
            return (
              <a key={i} href={ch.url} style={{ background: "#fff", border: "1px solid #e8e8f0", borderRadius: 14, padding: 20, textDecoration: "none", color: "inherit", display: "block", transition: "transform 0.2s, box-shadow 0.2s" }}
                onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(-3px)"; (e.currentTarget as HTMLAnchorElement).style.boxShadow = "0 8px 24px rgba(13,27,62,0.10)"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.transform = "none"; (e.currentTarget as HTMLAnchorElement).style.boxShadow = "none"; }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
                  <div style={{ width: 32, height: 32, borderRadius: "50%", background: ch.iconBg, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <IconComp size={16} color="#fff" />
                  </div>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 700, color: "#0D1B3E" }}>{ch.handle}</div>
                    <div style={{ fontSize: 11, color: "#94A3B8" }}>{ch.platform} · {ch.time}</div>
                  </div>
                </div>
                <p style={{ fontSize: 14, color: "#475569", lineHeight: 1.6, marginBottom: 10 }}>{ch.note}</p>
                <span style={{ fontSize: 12, color: "#94A3B8" }}>Follow ↗</span>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
export default function PartnerWithUsView() {
  return (
    <div className="dot-grid-bg"
      style={{
        background: "transparent",
        minHeight: "100vh",
        fontFamily: "'DM Sans','Noto Sans',ui-sans-serif,system-ui,sans-serif",
      }}
    >
      <div style={{ height: 4, background: COLOUR, position: "sticky", top: 0, zIndex: 40 }} />
      <SubPageDotRail sections={SECTIONS} />

      <Hero />
      <IntroSection />
      <NGOSection />
      <NGORegisterSection />
      <ContactSection />
      <StayConnectedSection />
    </div>
  );
}
