import React, { useState } from "react";
import { motion } from "framer-motion";
import { Users, Building2, Briefcase, Heart } from "lucide-react";
import type { Role } from "@/types";
import { useAppContext } from "@/context/AppContext";
import { useAppNavigate } from "@/hooks/useAppNavigate";
import { ACCENT_NAVY, B_BLUE, B_YELLOW, B_TICKER, B_INDIGO } from "@/data/homeSharedData";

const FONT = "'DM Sans', ui-sans-serif, system-ui, sans-serif";

const ROLES = [
  { id: "tata_employee",    title: "Tata Employee",        icon: Briefcase,  desc: "Current Tata Group employees, with or without a Tata email",         gradient: "linear-gradient(135deg, #065666 0%, #135EA9 60%, #0891b2 100%)", accent: B_BLUE },
  { id: "family_member",    title: "Family Member",        icon: Users,      desc: "Spouse, child, parent, or sibling of a Tata employee",               gradient: "linear-gradient(135deg, #7a1a40 0%, #c05070 60%, #F4838A 100%)", accent: "#c05070" },
  { id: "retired_employee", title: "Retired Employee",     icon: Heart,      desc: "Former Tata Group employees who have retired",                       gradient: "linear-gradient(135deg, #1a2a5e 0%, #333399 60%, #4376BB 100%)", accent: B_INDIGO },
  { id: "ngo",              title: "Partner Organisation", icon: Building2,  desc: "NGOs and non-profits seeking skilled volunteer support",              gradient: "linear-gradient(135deg, #3d1a5e 0%, #803998 55%, #9B4DB5 100%)", accent: "#803998" },
];

const DEFAULT_GRADIENT = "linear-gradient(135deg, #0D1B3E 0%, #1a2a5e 100%)";
const DEFAULT_ACCENT   = B_TICKER;

function DoodleLayer() {
  return (
    <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0, overflow: "hidden" }}>
      <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.13 }} viewBox="0 0 1400 900" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
        <style>{`
          @keyframes d1r{0%,100%{transform:translate(0,0) rotate(0deg)}50%{transform:translate(8px,-12px) rotate(6deg)}}
          @keyframes d2r{0%,100%{transform:translate(0,0) rotate(0deg)}50%{transform:translate(-10px,8px) rotate(-8deg)}}
          @keyframes d3r{0%,100%{transform:translate(0,0) rotate(0deg)}50%{transform:translate(6px,10px) rotate(4deg)}}
          @keyframes d4r{0%,100%{transform:translate(0,0) rotate(0deg)}50%{transform:translate(-8px,-6px) rotate(-5deg)}}
          .ra{animation:d1r 22s ease-in-out infinite;transform-origin:center}
          .rb{animation:d2r 28s ease-in-out infinite;transform-origin:center}
          .rc{animation:d3r 18s ease-in-out infinite;transform-origin:center}
          .rd{animation:d4r 32s ease-in-out infinite;transform-origin:center}
        `}</style>
        <g className="ra"><path d="M1280 80 C1308 54,1352 60,1362 94 C1372 128,1346 160,1314 162 C1282 164,1258 136,1266 102 C1270 82,1280 80,1280 80 Z" fill="none" stroke="white" strokeWidth="2.8" strokeLinecap="round"/></g>
        <g className="rb" transform="translate(1210,110)"><line x1="0" y1="-20" x2="0" y2="20" stroke="white" strokeWidth="2.4" strokeLinecap="round"/><line x1="-20" y1="0" x2="20" y2="0" stroke="white" strokeWidth="2.4" strokeLinecap="round"/><line x1="-14" y1="-14" x2="14" y2="14" stroke="white" strokeWidth="1.8" strokeLinecap="round"/><line x1="14" y1="-14" x2="-14" y2="14" stroke="white" strokeWidth="1.8" strokeLinecap="round"/></g>
        <g className="rc"><path d="M980 480 C1008 460,1036 500,1064 480 C1092 460,1120 500,1148 480 C1176 460,1204 500,1232 480" fill="none" stroke="white" strokeWidth="2.4" strokeLinecap="round"/></g>
        <g className="rd"><rect x="1180" y="720" width="44" height="44" rx="6" fill="none" stroke="white" strokeWidth="2.2" transform="rotate(16,1202,742)"/></g>
        <g className="rb"><path d="M80 600 C108 572,150 578,158 614 C166 650,138 678,106 676 C74 674,54 644,64 610 C68 594,80 600,80 600 Z" fill="none" stroke="white" strokeWidth="2.4" strokeLinecap="round"/></g>
        <g className="ra" transform="translate(160,340)"><line x1="0" y1="-14" x2="0" y2="14" stroke="white" strokeWidth="2" strokeLinecap="round"/><line x1="-14" y1="0" x2="14" y2="0" stroke="white" strokeWidth="2" strokeLinecap="round"/><line x1="-10" y1="-10" x2="10" y2="10" stroke="white" strokeWidth="1.4" strokeLinecap="round"/><line x1="10" y1="-10" x2="-10" y2="10" stroke="white" strokeWidth="1.4" strokeLinecap="round"/></g>
        <g className="rc"><path d="M60 160 C88 142,116 168,144 150 C172 132,200 158,228 140" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round"/></g>
        <g className="rd"><circle cx="120" cy="800" r="36" fill="none" stroke="white" strokeWidth="2.2"/><circle cx="120" cy="800" r="18" fill="none" stroke="white" strokeWidth="1.4"/></g>
        <g className="ra"><path d="M680 50 L720 90 L680 130 L640 90 Z" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></g>
        <g className="rb"><rect x="620" y="820" width="32" height="32" rx="4" fill="none" stroke="white" strokeWidth="2" transform="rotate(-12,636,836)"/></g>
      </svg>
    </div>
  );
}

function StepRail({ accent }: { accent: string }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 28 }}>
      <style>{`@keyframes sp2{0%,100%{box-shadow:0 0 0 3px ${accent}44}50%{box-shadow:0 0 0 7px ${accent}18}}`}</style>
      {[1,2].map((s, i) => (
        <div key={s} style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
            <div style={{ width: s === 1 ? 10 : 8, height: s === 1 ? 10 : 8, borderRadius: "50%", background: s === 1 ? accent : "rgba(255,255,255,0.3)", boxShadow: s === 1 ? `0 0 0 3px ${accent}44` : "none", animation: s === 1 ? "sp2 2s ease-in-out infinite" : "none" }} />
            <span style={{ fontSize: 11, fontWeight: 700, fontFamily: FONT, color: s === 1 ? "#fff" : "rgba(255,255,255,0.4)" }}>{s === 1 ? "Choose role" : "Your details"}</span>
          </div>
          {i === 0 && <div style={{ width: 32, height: 1.5, background: "rgba(255,255,255,0.2)", borderRadius: 2 }} />}
        </div>
      ))}
    </div>
  );
}

const RegisterRoleView = () => {
  const { selectedRole, handleRoleSelect } = useAppContext();
  const navigate = useAppNavigate();
  const [hovered, setHovered] = useState<string | null>(null);

  const activeRole = ROLES.find(r => r.id === selectedRole);
  const hoveredRole = ROLES.find(r => r.id === hovered);
  const displayRole = hoveredRole ?? activeRole;
  const bg = displayRole?.gradient ?? DEFAULT_GRADIENT;
  const accent = displayRole?.accent ?? DEFAULT_ACCENT;

  return (
    <div style={{ minHeight: "100vh", background: bg, position: "relative", fontFamily: FONT, transition: "background 0.45s ease" }}>
      <DoodleLayer />
      <div style={{ position: "relative", zIndex: 1, display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh", padding: "80px 24px 56px" }}>
        <div style={{ width: "100%", maxWidth: 880 }}>
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
            <StepRail accent={accent} />
            <div style={{ textAlign: "center", marginBottom: 36 }}>
              <h2 style={{ fontSize: 28, fontWeight: 900, color: "#fff", marginBottom: 8, letterSpacing: "-0.4px", lineHeight: 1.15, fontFamily: FONT }}>Create Your Account</h2>
              <p style={{ fontSize: 14, color: "rgba(255,255,255,0.65)", margin: 0, fontFamily: FONT }}>Who are you joining as?</p>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 14 }}>
              {ROLES.map((role, i) => {
                const active = selectedRole === role.id;
                return (
                  <motion.div key={role.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }}
                    onClick={() => handleRoleSelect(role.id as Role)}
                    onMouseEnter={() => setHovered(role.id)}
                    onMouseLeave={() => setHovered(null)}
                    style={{ background: active ? "rgba(255,255,255,0.22)" : "rgba(255,255,255,0.10)", backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)", border: `1.5px solid ${active ? "rgba(255,255,255,0.6)" : "rgba(255,255,255,0.18)"}`, borderRadius: 16, padding: "28px 20px 24px", cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", gap: 12, transition: "all 0.2s", boxShadow: active ? "0 8px 32px rgba(0,0,0,0.22)" : "0 2px 8px rgba(0,0,0,0.10)", transform: active ? "translateY(-3px)" : "translateY(0)" }}>
                    <div style={{ width: 52, height: 52, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", background: active ? "rgba(255,255,255,0.25)" : "rgba(255,255,255,0.12)", color: "#fff", flexShrink: 0 }}>
                      <role.icon size={23} />
                    </div>
                    <div>
                      <h4 style={{ fontWeight: 700, fontSize: 14, color: "#fff", marginBottom: 6, fontFamily: FONT }}>{role.title}</h4>
                      <p style={{ fontSize: 11.5, color: "rgba(255,255,255,0.6)", lineHeight: 1.55, margin: 0, fontFamily: FONT }}>{role.desc}</p>
                    </div>
                    {active && <div style={{ fontSize: 11, fontWeight: 700, color: B_YELLOW, letterSpacing: "0.3px", marginTop: 2 }}>Selected ✓</div>}
                  </motion.div>
                );
              })}
            </div>
            {selectedRole && (
              <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} style={{ textAlign: "center", marginTop: 32 }}>
                <button onClick={() => navigate("register-form")} style={{ padding: "13px 40px", borderRadius: 10, border: "none", background: "rgba(255,255,255,0.95)", color: ACCENT_NAVY, fontWeight: 700, fontSize: 15, fontFamily: FONT, cursor: "pointer", boxShadow: "0 4px 20px rgba(0,0,0,0.18)" }}>
                  Continue →
                </button>
              </motion.div>
            )}
            <p style={{ textAlign: "center", fontSize: 13, color: "rgba(255,255,255,0.45)", marginTop: 20, fontFamily: FONT }}>
              Already have an account?{" "}
              <button onClick={() => navigate("login")} style={{ fontWeight: 700, color: "rgba(255,255,255,0.8)", background: "none", border: "none", cursor: "pointer", textDecoration: "underline", fontFamily: FONT }}>Login here</button>
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default RegisterRoleView;
