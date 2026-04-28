import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react";
import tataEngageLogoNoBg from "@/assets/tata-engage-logo-nobg.png";
import { useAppContext } from "@/context/AppContext";
import { useAppNavigate } from "@/hooks/useAppNavigate";

const FONT = "'DM Sans','Noto Sans',ui-sans-serif,system-ui,sans-serif";
const NAVY = "#0D1B3E";
const B_YELLOW = "#F5A623";

const Footer = () => {
  const { triggerToast } = useAppContext();
  const navigate = useAppNavigate();

  const scrollTo = (view: string, id: string) => {
    navigate(view as any);
    setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }), 120);
  };

  const linkStyle = {
    fontFamily: FONT,
    fontSize: 13,
    color: "rgba(255,255,255,0.52)",
    cursor: "pointer",
    transition: "color 0.15s",
    display: "block",
    marginBottom: 10,
    textDecoration: "none",
  } as const;

  return (
    <footer style={{ background: "#09090b", color: "#fff", fontFamily: FONT, paddingTop: 56, paddingBottom: 32 }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 56px" }}>

        {/* Top grid */}
        <div style={{ display: "grid", gridTemplateColumns: "1.6fr 1fr 1fr 1.4fr", gap: 48, marginBottom: 48 }}>

          {/* Brand */}
          <div>
            <img src={tataEngageLogoNoBg} alt="Tata Engage"
              style={{ height: 48, objectFit: "contain", filter: "brightness(0) invert(1)", marginBottom: 18, display: "block" }} />
            <p style={{ fontSize: 13, color: "rgba(255,255,255,0.52)", lineHeight: 1.72, marginBottom: 24, maxWidth: 280 }}>
              The Tata Group's volunteering platform — connecting employees, families, and retirees with communities that need their time, skills, and purpose.
            </p>
            <div style={{ display: "flex", gap: 12 }}>
              {[
                { Icon: Linkedin, label: "LinkedIn" },
                { Icon: Instagram, label: "Instagram" },
                { Icon: Facebook, label: "Facebook" },
                { Icon: Twitter, label: "Twitter" },
              ].map(({ Icon, label }) => (
                <button key={label} aria-label={label}
                  style={{ width: 34, height: 34, borderRadius: "50%", border: "1px solid rgba(255,255,255,0.16)",
                    background: "rgba(255,255,255,0.06)", display: "flex", alignItems: "center",
                    justifyContent: "center", cursor: "pointer", transition: "all 0.15s" }}
                  onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,0.14)"; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,0.06)"; }}>
                  <Icon size={15} color="rgba(255,255,255,0.7)" />
                </button>
              ))}
            </div>
          </div>

          {/* Quick links */}
          <div>
            <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: "1.4px", textTransform: "uppercase",
              color: "rgba(255,255,255,0.35)", marginBottom: 18 }}>About</p>
            {[
              { label: "About Tata Engage", action: () => scrollTo("about", "about-vision") },
              { label: "Our Journey", action: () => navigate("journey" as any) },
              { label: "Disaster Response", action: () => navigate("disaster-response" as any) },
              { label: "Partner With Us", action: () => navigate("partner" as any) },
              { label: "Media & Resources", action: () => navigate("media" as any) },
            ].map(({ label, action }) => (
              <span key={label} onClick={action} style={linkStyle}
                onMouseEnter={e => { (e.currentTarget as HTMLSpanElement).style.color = "#fff"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLSpanElement).style.color = "rgba(255,255,255,0.52)"; }}>
                {label}
              </span>
            ))}
          </div>

          {/* Programmes */}
          <div>
            <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: "1.4px", textTransform: "uppercase",
              color: "rgba(255,255,255,0.35)", marginBottom: 18 }}>Programmes</p>
            {[
              { label: "Tata Volunteering Week (TVW)", action: () => navigate("about-tvw" as any) },
              { label: "ProEngage", action: () => navigate("about-proengage" as any) },
              { label: "Disaster Response", action: () => navigate("disaster-response" as any) },
              { label: "Tata Sustainability Month", action: () => navigate("tata-sm" as any) },
              { label: "Company Volunteering", action: () => navigate("cvp" as any) },
            ].map(({ label, action }) => (
              <span key={label} onClick={action} style={linkStyle}
                onMouseEnter={e => { (e.currentTarget as HTMLSpanElement).style.color = "#fff"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLSpanElement).style.color = "rgba(255,255,255,0.52)"; }}>
                {label}
              </span>
            ))}
          </div>

          {/* Newsletter */}
          <div>
            <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: "1.4px", textTransform: "uppercase",
              color: "rgba(255,255,255,0.35)", marginBottom: 18 }}>Stay Updated</p>
            <p style={{ fontSize: 13, color: "rgba(255,255,255,0.52)", lineHeight: 1.65, marginBottom: 18 }}>
              Get updates on volunteering programmes, impact stories, and events from across the Tata Group.
            </p>
            <input type="text" placeholder="Your name"
              style={{ width: "100%", background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.12)",
                borderRadius: 8, padding: "9px 12px", fontSize: 13, color: "#fff", outline: "none",
                marginBottom: 8, boxSizing: "border-box", fontFamily: FONT }} />
            <input type="email" placeholder="Your email"
              style={{ width: "100%", background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.12)",
                borderRadius: 8, padding: "9px 12px", fontSize: 13, color: "#fff", outline: "none",
                marginBottom: 12, boxSizing: "border-box", fontFamily: FONT }} />
            <button onClick={() => triggerToast("Subscribed! Welcome to Tata Engage updates.")}
              style={{ width: "100%", background: B_YELLOW, color: NAVY, border: "none", borderRadius: 8,
                padding: "10px 0", fontFamily: FONT, fontWeight: 800, fontSize: 13, cursor: "pointer" }}>
              Subscribe →
            </button>
          </div>
        </div>

        {/* Divider */}
        <div style={{ height: 1, background: "rgba(255,255,255,0.10)", marginBottom: 24 }} />

        {/* Bottom bar */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
            <p style={{ fontSize: 12, color: "rgba(255,255,255,0.28)", margin: 0 }}>
              © 2026 Tata Sons Private Limited. All rights reserved.
            </p>
            <span onClick={() => navigate("admin-login" as any)}
              style={{ fontSize: 12, color: "rgba(255,255,255,0.18)", cursor: "pointer" }}
              onMouseEnter={e => { (e.currentTarget as HTMLSpanElement).style.color = "rgba(255,255,255,0.38)"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLSpanElement).style.color = "rgba(255,255,255,0.18)"; }}>
              Admin
            </span>
          </div>
          <div style={{ display: "flex", gap: 24 }}>
            {[
              { label: "Privacy Policy", action: () => navigate("privacy" as any) },
              { label: "Terms of Use", action: () => navigate("legal" as any) },
              { label: "Cookie Policy", action: () => scrollTo("privacy", "privacy-cookies") },
            ].map(({ label, action }) => (
              <span key={label} onClick={action}
                style={{ fontSize: 12, color: "rgba(255,255,255,0.32)", cursor: "pointer" }}
                onMouseEnter={e => { (e.currentTarget as HTMLSpanElement).style.color = "rgba(255,255,255,0.7)"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLSpanElement).style.color = "rgba(255,255,255,0.32)"; }}>
                {label}
              </span>
            ))}
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
