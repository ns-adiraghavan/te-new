import { useRef, useState, useEffect } from "react";
import SubPageDotRail from "@/components/shared/SubPageDotRail";

const ACCENT      = "#4376BB";
const ACCENT_DARK = "#2d5a9e";
const NAVY        = "#0D1B3E";
const FONT        = "'DM Sans', 'Noto Sans', ui-sans-serif, system-ui, sans-serif";

const DIAG: React.CSSProperties = {
  position: "absolute", inset: 0,
  backgroundImage: "repeating-linear-gradient(45deg,rgba(255,255,255,0.04) 1px,transparent 1px)",
  backgroundSize: "28px 28px",
  pointerEvents: "none",
};

const SECTIONS = [
  { id: "legal-hero",      label: "Overview"    },
  { id: "legal-copyright", label: "Copyright"   },
  { id: "legal-use",       label: "Permitted Use" },
  { id: "legal-liability", label: "Liability"   },
];

function DefinerBar({ light = false }: { light?: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const [on, setOn] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setOn(true); }, { threshold: 0.4 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return (
    <div ref={ref} style={{ height: 2, background: light ? "rgba(255,255,255,0.2)" : "#e8e8f0", borderRadius: 2, overflow: "hidden", width: 48, marginTop: 10 }}>
      <div style={{ height: "100%", background: light ? "rgba(255,255,255,0.8)" : ACCENT_DARK, borderRadius: 2, transition: "width 0.65s cubic-bezier(0.22,1,0.36,1)", width: on ? "100%" : "0%" }} />
    </div>
  );
}

function Sec({ id, title, children, bg = "#fff" }: {
  id: string; title: string; children: React.ReactNode; bg?: string;
}) {
  return (
    <section id={id} style={{ padding: "64px 56px", background: bg, scrollMarginTop: 80 }}>
      <div style={{ maxWidth: 860, margin: "0 auto" }}>
        <h2 style={{ fontFamily: FONT, fontSize: 24, fontWeight: 900, color: NAVY, letterSpacing: "-0.3px", margin: 0 }}>{title}</h2>
        <DefinerBar />
        <div style={{ marginTop: 24, fontFamily: FONT, fontSize: 14.5, color: "#475569", lineHeight: 1.82 }}>
          {children}
        </div>
      </div>
    </section>
  );
}

function P({ children }: { children: React.ReactNode }) {
  return <p style={{ margin: "0 0 14px" }}>{children}</p>;
}

export default function LegalView() {
  return (
    <div style={{ background: "#f5f5fa", minHeight: "100vh", fontFamily: FONT }}>
      <div style={{ height: 3, background: ACCENT, width: "100%" }} />
      <SubPageDotRail sections={SECTIONS} accentColor={ACCENT} />

      {/* Hero */}
      <div id="legal-hero" style={{ position: "relative", background: NAVY, padding: "96px 56px 72px", overflow: "hidden" }}>
        <div style={DIAG} />
        <div style={{ position: "absolute", top: -80, right: -80, width: 400, height: 400, background: `radial-gradient(circle, ${ACCENT}55 0%, transparent 70%)`, pointerEvents: "none" }} />
        <div style={{ position: "relative", zIndex: 1, maxWidth: 860, margin: "0 auto" }}>
          <p style={{ fontFamily: FONT, fontSize: 11, fontWeight: 700, letterSpacing: "2px", textTransform: "uppercase", color: "rgba(255,255,255,0.45)", margin: "0 0 12px" }}>Tata Engage · Legal</p>
          <div style={{ height: 2, width: 48, borderRadius: 2, background: "rgba(255,255,255,0.4)", margin: "12px 0 22px" }} />
          <h1 style={{ fontFamily: FONT, fontSize: "clamp(2rem,4vw,3rem)", fontWeight: 900, color: "#fff", lineHeight: 1.1, letterSpacing: "-0.5px", margin: "0 0 18px", maxWidth: 620 }}>Legal Disclaimer &amp; Terms of Use</h1>
          <p style={{ fontFamily: FONT, fontSize: 15, fontWeight: 300, color: "rgba(255,255,255,0.65)", maxWidth: 560, lineHeight: 1.7, margin: 0 }}>
            This page sets out the terms governing your use of the Tata Engage website, including copyright, permitted use of content, and limitations on liability.
          </p>
        </div>
      </div>

      {/* Copyright */}
      <Sec id="legal-copyright" title="Copyright" bg="#fff">
        <P>Tata Sons Limited retains copyright on all the text, graphics and trademarks displayed on this site. All the text, graphics and trademarks displayed on this site are owned by Tata Sons Limited and used under licence by Tata affiliates.</P>
      </Sec>

      {/* Permitted Use */}
      <Sec id="legal-use" title="Permitted Use of Content" bg="#f5f5fa">
        <P>You may print copies of the information on this site for your personal use and store the files on your computer for personal use. You may not distribute text or graphics to others without the express written consent of Tata Sons and Tata affiliates.</P>
        <P>You may not, without our permission, copy and distribute this information on any other server, or modify or reuse text or graphics on this or any other system.</P>
        <P>No reproduction of any part of the site may be sold or distributed for commercial gain, nor shall it be modified or incorporated in any other work, publication or site, whether in hard copy or electronic format, including postings to any other site. Tata Sons Limited reserves all other rights.</P>
      </Sec>

      {/* Liability */}
      <Sec id="legal-liability" title="Disclaimer &amp; Limitation of Liability" bg="#fff">
        <P>The information on this site has been included in good faith and is for general purposes only. It should not be relied upon for any specific purpose and no representation or warranty is given as regards its accuracy or completeness.</P>
        <P>No information on this site shall constitute an invitation to invest in Tata or any of its affiliates. Neither Tata Sons and Tata affiliates, nor their or their affiliates' officers, employees or agents shall be liable for any loss, damage or expense arising out of any access to or use of this site or any site linked to it, including, without limitation, any loss of profit, indirect, incidental or consequential loss.</P>
        <div style={{ background: "#FFF8E1", border: "1px solid #f5d76e", borderRadius: 14, padding: "16px 20px", marginTop: 20 }}>
          <p style={{ fontFamily: FONT, fontSize: 11, fontWeight: 800, letterSpacing: "1px", textTransform: "uppercase", color: "#7c5d00", margin: "0 0 8px" }}>Note</p>
          <p style={{ fontFamily: FONT, fontSize: 13.5, color: "#5a4400", lineHeight: 1.7, margin: 0 }}>For queries relating to this disclaimer or the use of content from this site, please contact us at <strong>tataengage@tata.com</strong>.</p>
        </div>
      </Sec>
    </div>
  );
}
