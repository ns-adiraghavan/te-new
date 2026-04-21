import { useState } from "react";
import { Linkedin, Instagram, Facebook, Bell, X, Check } from "lucide-react";
import { useAppContext } from "@/context/AppContext";
import { B_TICKER } from "@/data/homeSharedData";

interface SocialClusterProps {
  isLoggedIn: boolean;
  inHero?: boolean;
}

const SocialCluster = ({ isLoggedIn, inHero = false }: SocialClusterProps) => {
  const { triggerToast } = useAppContext();
  const [subOpen, setSubOpen] = useState(false);
  const [subName, setSubName] = useState("");
  const [subEmail, setSubEmail] = useState("");
  const [subDone, setSubDone] = useState(false);

  return (
    <div className="fixed bottom-24 left-5 z-40 flex flex-col gap-2 items-center transition-colors duration-300">
      {[
        { icon: <Linkedin size={15} />, label: "LinkedIn" },
        { icon: <Instagram size={15} />, label: "Instagram" },
        { icon: <Facebook size={15} />, label: "Facebook" },
      ].map(({ icon, label }) => (
        <button
          key={label}
          onClick={() => triggerToast(`Opening ${label}...`)}
          title={label}
          className="w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 cursor-pointer"
          style={{
            backgroundColor: inHero ? "rgba(255,255,255,0.12)" : "white",
            border: inHero ? "1px solid rgba(255,255,255,0.25)" : "1px solid #e2e8f0",
            color: inHero ? "white" : B_TICKER,
            boxShadow: inHero ? "0 1px 6px rgba(0,0,0,0.20)" : "0 1px 6px rgba(0,0,0,0.10)",
          }}
          onMouseEnter={e => (e.currentTarget.style.backgroundColor = inHero ? "rgba(255,255,255,0.22)" : "#EEF0FF")}
          onMouseLeave={e => (e.currentTarget.style.backgroundColor = inHero ? "rgba(255,255,255,0.12)" : "white")}
        >
          {icon}
        </button>
      ))}
      <div className="w-px h-5 transition-colors duration-300" style={{ backgroundColor: inHero ? "rgba(255,255,255,0.25)" : "#e2e8f0" }} />

      {/* Subscribe — only when not logged in */}
      {!isLoggedIn && (
        <div style={{ position: "relative" }}>
          <button
            onClick={() => { setSubOpen(o => !o); if (subDone) { setSubDone(false); setSubName(""); setSubEmail(""); } }}
            title="Subscribe to newsletter"
            style={{
              width: 36, height: 36, borderRadius: "50%",
              backgroundColor: subDone ? "#0d7c52" : B_TICKER,
              border: "none", color: "#fff",
              display: "flex", alignItems: "center", justifyContent: "center",
              cursor: "pointer", boxShadow: "0 2px 8px rgba(0,0,0,0.18)",
              transition: "background 0.3s",
            }}
          >
            {subDone ? <Check size={14} /> : <Bell size={14} />}
          </button>

          {subOpen && (
            <div style={{
              position: "absolute", left: 44, bottom: 0,
              width: 232, background: "#fff",
              border: "1px solid #e2e8f0", borderRadius: 14,
              boxShadow: "0 8px 32px rgba(0,0,0,0.13)",
              padding: "16px 14px", zIndex: 50,
            }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                <span style={{ fontSize: 13, fontWeight: 700, color: "#0D1B3E" }}>Stay in the loop</span>
                <button onClick={() => setSubOpen(false)} style={{ background: "none", border: "none", cursor: "pointer", color: "#94a3b8", padding: 2 }}>
                  <X size={13} />
                </button>
              </div>
              <p style={{ fontSize: 11.5, color: "#64748b", marginBottom: 10, lineHeight: 1.5 }}>
                TVW dates, new ProEngage projects &amp; impact stories — straight to your inbox.
              </p>
              <input
                type="text" placeholder="Your name" value={subName}
                onChange={e => setSubName(e.target.value)}
                style={{ width: "100%", padding: "7px 10px", fontSize: 12.5, border: "1px solid #e2e8f0", borderRadius: 7, marginBottom: 6, outline: "none", boxSizing: "border-box" as const }}
              />
              <input
                type="email" placeholder="Your email" value={subEmail}
                onChange={e => setSubEmail(e.target.value)}
                style={{ width: "100%", padding: "7px 10px", fontSize: 12.5, border: "1px solid #e2e8f0", borderRadius: 7, marginBottom: 8, outline: "none", boxSizing: "border-box" as const }}
              />
              <button
                onClick={() => {
                  if (!subEmail) return;
                  setSubDone(true);
                  setSubOpen(false);
                  triggerToast("You're subscribed! Welcome to TataEngage updates.");
                }}
                style={{
                  width: "100%", padding: "8px 0",
                  backgroundColor: B_TICKER, color: "#fff",
                  border: "none", borderRadius: 7,
                  fontSize: 12.5, fontWeight: 700, cursor: "pointer",
                }}
              >
                Subscribe →
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SocialCluster;
