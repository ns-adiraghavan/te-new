import React, { useState, useEffect } from "react";
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

const ROLE_STATS: Record<string, { label: string; value: string }[]> = {
  tata_employee:    [{ label: "Projects", value: "240+" }, { label: "NGO Partners", value: "80+" }],
  family_member:    [{ label: "Family Volunteers", value: "1,200+" }, { label: "Hours logged", value: "4,800+" }],
  retired_employee: [{ label: "Mentors", value: "320+" }, { label: "Avg. tenure", value: "28 yrs" }],
  ngo:              [{ label: "Active NGOs", value: "80+" }, { label: "Projects matched", value: "500+" }],
};

const RegisterRoleView = () => {
  const { selectedRole, handleRoleSelect } = useAppContext();
  const navigate = useAppNavigate();
  const [hovered, setHovered] = useState<string | null>(null);

  const activeRole = ROLES.find(r => r.id === selectedRole);
  const hoveredRole = ROLES.find(r => r.id === hovered);
  const displayRole = hoveredRole ?? activeRole;
  const bg = displayRole?.gradient ?? DEFAULT_GRADIENT;
  const accent = displayRole?.accent ?? DEFAULT_ACCENT;

  // Sync navbar colour whenever display role changes
  useEffect(() => {
    document.dispatchEvent(new CustomEvent("te:formFocus", { detail: { bg: displayRole?.gradient ?? null } }));
  }, [displayRole?.id]);

  // Clear on unmount
  useEffect(() => {
    return () => document.dispatchEvent(new CustomEvent("te:formFocus", { detail: { bg: null } }));
  }, []);

  return (
    <div style={{ minHeight: "100vh", background: bg, position: "relative", fontFamily: FONT, transition: "background 0.5s ease" }}>
      <DoodleLayer />
      {/* Reactive radial glow */}
      <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0, background: `radial-gradient(ellipse 65% 55% at 50% 65%, ${accent}30 0%, transparent 70%)`, transition: "background 0.5s ease" }} />
      <div style={{ position: "relative", zIndex: 1, display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh", padding: "80px 24px 56px" }}>
        <div style={{ width: "100%", maxWidth: 900 }}>
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
            <StepRail accent={accent} />
            <div style={{ textAlign: "center", marginBottom: 40 }}>
              <motion.h2
                key={displayRole?.id ?? "default"}
                initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.28 }}
                style={{ fontSize: 28, fontWeight: 900, color: "#fff", marginBottom: 8, letterSpacing: "-0.4px", lineHeight: 1.15, fontFamily: FONT }}
              >
                {displayRole ? `Joining as ${displayRole.title}` : "Create Your Account"}
              </motion.h2>
              <motion.p
                key={`sub-${displayRole?.id ?? "default"}`}
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.28, delay: 0.06 }}
                style={{ fontSize: 13.5, color: "rgba(255,255,255,0.6)", margin: 0, fontFamily: FONT }}
              >
                {displayRole?.desc ?? "Who are you joining as?"}
              </motion.p>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 14 }}>
              {ROLES.map((role, i) => {
                const active = selectedRole === role.id;
                const isHovered = hovered === role.id;
                const stats = ROLE_STATS[role.id] ?? [];
                return (
                  <motion.div key={role.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }}
                    onClick={() => handleRoleSelect(role.id as Role)}
                    onMouseEnter={() => setHovered(role.id)}
                    onMouseLeave={() => setHovered(null)}
                    style={{ background: active ? "rgba(255,255,255,0.22)" : isHovered ? "rgba(255,255,255,0.16)" : "rgba(255,255,255,0.10)", backdropFilter: "blur(14px)", WebkitBackdropFilter: "blur(14px)", border: `1.5px solid ${active ? "rgba(255,255,255,0.65)" : isHovered ? "rgba(255,255,255,0.35)" : "rgba(255,255,255,0.18)"}`, borderRadius: 18, padding: "26px 18px 22px", cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", gap: 10, transition: "all 0.22s cubic-bezier(0.4,0,0.2,1)", boxShadow: active ? `0 12px 40px rgba(0,0,0,0.28), 0 0 0 1px ${accent}55` : isHovered ? "0 6px 20px rgba(0,0,0,0.18)" : "0 2px 8px rgba(0,0,0,0.10)", transform: active ? "translateY(-5px) scale(1.025)" : isHovered ? "translateY(-2px)" : "translateY(0)" }}>
                    <div style={{ width: 52, height: 52, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", background: active ? "rgba(255,255,255,0.28)" : "rgba(255,255,255,0.14)", color: "#fff", flexShrink: 0, transition: "all 0.22s", boxShadow: active ? `0 0 0 6px ${accent}38` : "none" }}>
                      <role.icon size={23} />
                    </div>
                    <h4 style={{ fontWeight: 700, fontSize: 14, color: "#fff", margin: 0, fontFamily: FONT }}>{role.title}</h4>
                    {/* Stats chips — appear on hover / active */}
                    <div style={{ display: "flex", gap: 7, justifyContent: "center", opacity: active || isHovered ? 1 : 0, maxHeight: active || isHovered ? 60 : 0, overflow: "hidden", transition: "opacity 0.2s, max-height 0.22s" }}>
                      {stats.map(s => (
                        <div key={s.label} style={{ background: "rgba(255,255,255,0.15)", borderRadius: 10, padding: "4px 9px", textAlign: "center" }}>
                          <div style={{ fontSize: 12, fontWeight: 800, color: "#fff", fontFamily: FONT }}>{s.value}</div>
                          <div style={{ fontSize: 9, color: "rgba(255,255,255,0.55)", fontFamily: FONT, textTransform: "uppercase", letterSpacing: "0.4px" }}>{s.label}</div>
                        </div>
                      ))}
                    </div>
                    {active && <div style={{ fontSize: 11, fontWeight: 700, color: B_YELLOW, letterSpacing: "0.3px" }}>Selected ✓</div>}
                  </motion.div>
                );
              })}
            </div>
            {selectedRole && (
              <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} style={{ textAlign: "center", marginTop: 32 }}>
                <button onClick={() => navigate("register-form")} style={{ padding: "13px 40px", borderRadius: 10, border: "none", background: "rgba(255,255,255,0.95)", color: ACCENT_NAVY, fontWeight: 700, fontSize: 15, fontFamily: FONT, cursor: "pointer", boxShadow: "0 4px 20px rgba(13,27,62,0.18)" }}>
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
