import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Clock, Lock, Eye, EyeOff, Check } from "lucide-react";
import { useAppContext } from "@/context/AppContext";
import { useAppNavigate } from "@/hooks/useAppNavigate";
import ConsentModal from "@/components/shared/ConsentModal";
import { ACCENT_NAVY, B_BLUE, B_TICKER, B_INDIGO, B_TEAL, B_RED, B_YELLOW } from "@/data/homeSharedData";

const FONT = "'DM Sans', ui-sans-serif, system-ui, sans-serif";

const TATA_COMPANIES = [
  "Tata Consultancy Services", "Tata Motors", "Tata Steel", "Tata Power",
  "Titan Company", "Tata Communications", "Indian Hotels (IHCL)",
  "Tata Consumer Products", "Tata Chemicals", "Tata Elxsi",
];

const ROLE_GRADIENTS: Record<string, string> = {
  tata_employee:    "linear-gradient(135deg, #065666 0%, #135EA9 60%, #0891b2 100%)",
  retired_employee: "linear-gradient(135deg, #1a2a5e 0%, #333399 60%, #4376BB 100%)",
  ngo:              "linear-gradient(135deg, #3d1a5e 0%, #803998 55%, #9B4DB5 100%)",
  family_member:    "linear-gradient(135deg, #7a1a40 0%, #c05070 60%, #F4838A 100%)",
  default:          "linear-gradient(135deg, #0D1B3E 0%, #1a2a5e 100%)",
};

const ROLE_ACCENT: Record<string, string> = {
  tata_employee:    B_BLUE,
  retired_employee: B_INDIGO,
  ngo:              "#803998",
  family_member:    "#c05070",
  default:          B_TICKER,
};

// Darker solid shades for navbar on field focus
const ROLE_NAV_FOCUS: Record<string, string> = {
  tata_employee:    "rgba(3,34,60,0.97)",
  retired_employee: "rgba(14,18,60,0.97)",
  ngo:              "rgba(34,10,54,0.97)",
  family_member:    "rgba(60,10,28,0.97)",
  default:          "rgba(4,42,48,0.97)",
};

function dispatchFocus(bg: string | null) {
  document.dispatchEvent(new CustomEvent("te:formFocus", { detail: { bg } }));
}

function DoodleLayer() {
  return (
    <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0, overflow: "hidden" }}>
      <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.13 }}
        viewBox="0 0 1400 900" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
        <style>{`
          @keyframes d1{0%,100%{transform:translate(0,0) rotate(0deg)}50%{transform:translate(8px,-12px) rotate(6deg)}}
          @keyframes d2{0%,100%{transform:translate(0,0) rotate(0deg)}50%{transform:translate(-10px,8px) rotate(-8deg)}}
          @keyframes d3{0%,100%{transform:translate(0,0) rotate(0deg)}50%{transform:translate(6px,10px) rotate(4deg)}}
          @keyframes d4{0%,100%{transform:translate(0,0) rotate(0deg)}50%{transform:translate(-8px,-6px) rotate(-5deg)}}
          .da{animation:d1 22s ease-in-out infinite;transform-origin:center}
          .db{animation:d2 28s ease-in-out infinite;transform-origin:center}
          .dc{animation:d3 18s ease-in-out infinite;transform-origin:center}
          .dd{animation:d4 32s ease-in-out infinite;transform-origin:center}
        `}</style>
        <g className="da"><path d="M1280 80 C1308 54,1352 60,1362 94 C1372 128,1346 160,1314 162 C1282 164,1258 136,1266 102 C1270 82,1280 80,1280 80 Z" fill="none" stroke="white" strokeWidth="2.8" strokeLinecap="round"/></g>
        <g className="db" transform="translate(1210,110)"><line x1="0" y1="-20" x2="0" y2="20" stroke="white" strokeWidth="2.4" strokeLinecap="round"/><line x1="-20" y1="0" x2="20" y2="0" stroke="white" strokeWidth="2.4" strokeLinecap="round"/><line x1="-14" y1="-14" x2="14" y2="14" stroke="white" strokeWidth="1.8" strokeLinecap="round"/><line x1="14" y1="-14" x2="-14" y2="14" stroke="white" strokeWidth="1.8" strokeLinecap="round"/></g>
        <g className="dc"><path d="M980 480 C1008 460,1036 500,1064 480 C1092 460,1120 500,1148 480 C1176 460,1204 500,1232 480" fill="none" stroke="white" strokeWidth="2.4" strokeLinecap="round"/></g>
        <g className="dd"><rect x="1180" y="720" width="44" height="44" rx="6" fill="none" stroke="white" strokeWidth="2.2" transform="rotate(16,1202,742)"/></g>
        <g className="db"><path d="M80 600 C108 572,150 578,158 614 C166 650,138 678,106 676 C74 674,54 644,64 610 C68 594,80 600,80 600 Z" fill="none" stroke="white" strokeWidth="2.4" strokeLinecap="round"/></g>
        <g className="da" transform="translate(160,340)"><line x1="0" y1="-14" x2="0" y2="14" stroke="white" strokeWidth="2" strokeLinecap="round"/><line x1="-14" y1="0" x2="14" y2="0" stroke="white" strokeWidth="2" strokeLinecap="round"/><line x1="-10" y1="-10" x2="10" y2="10" stroke="white" strokeWidth="1.4" strokeLinecap="round"/><line x1="10" y1="-10" x2="-10" y2="10" stroke="white" strokeWidth="1.4" strokeLinecap="round"/></g>
        <g className="dc"><path d="M60 160 C88 142,116 168,144 150 C172 132,200 158,228 140" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round"/></g>
        <g className="dd"><circle cx="120" cy="800" r="36" fill="none" stroke="white" strokeWidth="2.2"/><circle cx="120" cy="800" r="18" fill="none" stroke="white" strokeWidth="1.4"/></g>
        <g className="da"><path d="M680 50 L720 90 L680 130 L640 90 Z" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></g>
        <g className="db"><rect x="620" y="820" width="32" height="32" rx="4" fill="none" stroke="white" strokeWidth="2" transform="rotate(-12,636,836)"/></g>
        <g className="dc"><path d="M330 80 C348 70,362 80,358 96 C354 112,336 116,326 102 C318 90,330 80,330 80 Z" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round"/></g>
        <g className="dd"><path d="M860 60 C876 50,890 60,886 76 C882 90,864 94,856 80 C850 70,860 60,860 60 Z" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round"/></g>
      </svg>
    </div>
  );
}

function StepRail({ step, accent }: { step: 1 | 2; accent: string }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 28 }}>
      <style>{`@keyframes stepPulse{0%,100%{box-shadow:0 0 0 3px ${accent}44}50%{box-shadow:0 0 0 7px ${accent}18}}`}</style>
      {[1, 2].map((s, i) => {
        const done = step > s; const active = step === s;
        return (
          <div key={s} style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
              <div style={{ width: active ? 10 : 8, height: active ? 10 : 8, borderRadius: "50%", background: (done || active) ? accent : "rgba(255,255,255,0.3)", boxShadow: active ? `0 0 0 3px ${accent}44` : "none", transition: "all 0.3s", animation: active ? "stepPulse 2s ease-in-out infinite" : "none" }} />
              <span style={{ fontSize: 11, fontWeight: 700, fontFamily: FONT, color: active ? "#fff" : done ? "rgba(255,255,255,0.7)" : "rgba(255,255,255,0.4)" }}>
                {s === 1 ? "Choose role" : "Your details"}
              </span>
            </div>
            {i === 0 && <div style={{ width: 32, height: 1.5, background: step > 1 ? accent : "rgba(255,255,255,0.2)", borderRadius: 2, transition: "background 0.4s" }} />}
          </div>
        );
      })}
    </div>
  );
}

function PillSelector({ options, selected, onToggle, multi = false, accent }: { options: string[]; selected: string[]; onToggle: (v: string) => void; multi?: boolean; accent: string }) {
  return (
    <div style={{ display: "flex", flexWrap: "wrap" as const, gap: 8, marginTop: 8 }}>
      {options.map(opt => {
        const active = selected.includes(opt);
        return (
          <button key={opt} type="button" onClick={() => onToggle(opt)} style={{ padding: "7px 14px", borderRadius: 100, border: `1.5px solid ${active ? accent : "#e0e0e8"}`, background: active ? accent : "#fff", color: active ? "#fff" : "#555", fontSize: 12.5, fontWeight: 600, fontFamily: FONT, cursor: "pointer", transition: "all 0.15s", display: "flex", alignItems: "center", gap: 5, boxShadow: active ? `0 2px 8px ${accent}33` : "none" }}>
            {active && <Check size={11} />}{opt}
          </button>
        );
      })}
    </div>
  );
}

const SKILL_PRESETS = ["Finance", "Legal", "Technology", "Teaching", "Design", "Marketing", "Healthcare", "Engineering", "HR", "Strategy", "Operations", "Research", "Communications", "Environment", "Data & Analytics"];

function SkillBubbles({ selected, onToggle, accent }: { selected: string[]; onToggle: (v: string) => void; accent: string }) {
  const [custom, setCustom] = useState("");
  return (
    <div>
      <div style={{ display: "flex", flexWrap: "wrap" as const, gap: 8, marginTop: 8 }}>
        {SKILL_PRESETS.map(skill => {
          const active = selected.includes(skill);
          return (
            <motion.button key={skill} type="button" onClick={() => onToggle(skill)} whileHover={{ scale: 1.06 }} whileTap={{ scale: 0.96 }} style={{ padding: "8px 16px", borderRadius: 100, border: `1.5px solid ${active ? accent : "#e0e0e8"}`, background: active ? accent : "#fafafa", color: active ? "#fff" : "#555", fontSize: 13, fontWeight: 600, fontFamily: FONT, cursor: "pointer", boxShadow: active ? `0 3px 12px ${accent}40` : "0 1px 3px rgba(0,0,0,0.05)", transition: "background 0.15s, border-color 0.15s, color 0.15s", display: "flex", alignItems: "center", gap: 5 }}>
              {active && <Check size={11} />}{skill}
            </motion.button>
          );
        })}
      </div>
      <div style={{ marginTop: 10, display: "flex", gap: 8, alignItems: "center" }}>
        <input type="text" value={custom} placeholder="+ Add your own" onChange={e => setCustom(e.target.value)} onKeyDown={e => { if (e.key === "Enter" && custom.trim()) { onToggle(custom.trim()); setCustom(""); e.preventDefault(); } }} style={{ fontSize: 12.5, fontFamily: FONT, border: "1.5px solid #e0e0e8", borderRadius: 100, padding: "7px 14px", outline: "none", color: ACCENT_NAVY, width: 180 }} />
        <button type="button" onClick={() => { if (custom.trim()) { onToggle(custom.trim()); setCustom(""); } }} style={{ fontSize: 12, fontWeight: 700, color: accent, background: "none", border: "none", cursor: "pointer", fontFamily: FONT }}>Add</button>
      </div>
    </div>
  );
}

function CompanySelect({ value, onChange, label = "Tata Company*", accent, navFocusBg }: { value: string; onChange: (v: string) => void; label?: string; accent: string; navFocusBg?: string }) {
  return (
    <div>
      <label style={{ display: "block", fontSize: 12, fontWeight: 700, color: "#444", marginBottom: 6, fontFamily: FONT }}>{label}</label>
      <select required value={value} onChange={e => onChange(e.target.value)} onFocus={e => { e.target.style.borderColor = accent; if (navFocusBg) dispatchFocus(navFocusBg); }} onBlur={e => { e.target.style.borderColor = "#e0e0e8"; dispatchFocus(null); }} style={{ width: "100%", border: "1.5px solid #e0e0e8", borderRadius: 12, padding: "13px 16px", fontSize: 14.5, fontFamily: FONT, color: value ? ACCENT_NAVY : "#94a3b8", outline: "none", background: "#fff", cursor: "pointer", appearance: "none" as const, transition: "border-color 0.15s" }}>
        <option value="">Select company</option>
        {TATA_COMPANIES.map(c => <option key={c}>{c}</option>)}
      </select>
      <AnimatePresence>
        {value && (
          <motion.div initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} style={{ marginTop: 8, display: "inline-flex", alignItems: "center", gap: 6, background: `${accent}12`, border: `1px solid ${accent}30`, borderRadius: 100, padding: "4px 12px" }}>
            <Check size={11} color={accent} />
            <span style={{ fontSize: 11.5, fontWeight: 700, color: accent, fontFamily: FONT }}>{value}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function PasswordField({ label, value, onChange, accent, navFocusBg }: { label: string; value: string; onChange: (v: string) => void; accent: string; navFocusBg?: string }) {
  const [show, setShow] = useState(false);
  const strength = !value ? 0 : value.length < 6 ? 1 : value.length < 10 || !/[^a-zA-Z0-9]/.test(value) ? 2 : value.length < 14 ? 3 : 4;
  const colours = ["#e0e0e8", B_RED, "#F79425", B_TICKER, B_TEAL];
  const labels  = ["", "Too short", "Weak", "Good", "Strong"];
  return (
    <div>
      <label style={{ display: "block", fontSize: 12, fontWeight: 700, color: "#444", marginBottom: 6, fontFamily: FONT }}>{label}</label>
      <div style={{ position: "relative" }}>
        <input type={show ? "text" : "password"} value={value} onChange={e => onChange(e.target.value)} placeholder="••••••••" required onFocus={e => { e.target.style.borderColor = accent; e.target.style.background = `${accent}08`; if (navFocusBg) dispatchFocus(navFocusBg); }} onBlur={e => { e.target.style.borderColor = "#e0e0e8"; e.target.style.background = "#fff"; dispatchFocus(null); }} style={{ width: "100%", border: "1.5px solid #e0e0e8", borderRadius: 12, padding: "13px 44px 13px 16px", fontSize: 14.5, fontFamily: FONT, outline: "none", boxSizing: "border-box" as const, background: "#fff", transition: "border-color 0.15s, background 0.15s" }} />
        <button type="button" onClick={() => setShow(v => !v)} style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", color: "#94a3b8" }}>{show ? <EyeOff size={15} /> : <Eye size={15} />}</button>
      </div>
      {value && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ marginTop: 7 }}>
          <div style={{ display: "flex", gap: 4 }}>{[1,2,3,4].map(i => <div key={i} style={{ flex: 1, height: 4, borderRadius: 2, background: i <= strength ? colours[strength] : "#e8e8f0", transition: "background 0.25s" }} />)}</div>
          <span style={{ fontSize: 10.5, fontWeight: 700, color: colours[strength], fontFamily: FONT, marginTop: 3, display: "block" }}>{labels[strength]}</span>
        </motion.div>
      )}
    </div>
  );
}

function YearSlider({ value, onChange, accent }: { value: number; onChange: (v: number) => void; accent: string }) {
  const min = 1980; const max = 2025;
  return (
    <div>
      <label style={{ display: "block", fontSize: 12, fontWeight: 700, color: "#444", marginBottom: 10, fontFamily: FONT }}>Year of Retirement*</label>
      <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
        <input type="range" min={min} max={max} value={value} onChange={e => onChange(Number(e.target.value))} style={{ flex: 1, accentColor: accent, cursor: "pointer" }} />
        <motion.div key={value} initial={{ scale: 0.85 }} animate={{ scale: 1 }} style={{ minWidth: 64, textAlign: "center", background: accent, borderRadius: 10, padding: "6px 12px" }}>
          <span style={{ fontSize: 18, fontWeight: 900, color: "#fff", fontFamily: FONT, letterSpacing: "-0.5px" }}>{value}</span>
        </motion.div>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", marginTop: 3 }}>
        <span style={{ fontSize: 10.5, color: "#94a3b8", fontFamily: FONT }}>{min}</span>
        <span style={{ fontSize: 10.5, color: "#94a3b8", fontFamily: FONT }}>{max}</span>
      </div>
    </div>
  );
}

function EmployeeLookup({ email, onChange, onFound, accent, navFocusBg }: { email: string; onChange: (v: string) => void; onFound: (d: { company: string; designation: string } | null) => void; accent: string; navFocusBg?: string }) {
  const [status, setStatus] = useState<"idle"|"loading"|"found"|"notfound">("idle");
  useEffect(() => {
    onFound(null); setStatus("idle");
    if (!email.includes("@")) return;
    setStatus("loading");
    const t = setTimeout(() => {
      if (email.includes("tata") || email.includes("tcs")) { setStatus("found"); onFound({ company: "Tata Consultancy Services", designation: "Senior Manager" }); }
      else { setStatus("notfound"); onFound(null); }
    }, 1200);
    return () => clearTimeout(t);
  }, [email]);
  return (
    <div>
      <label style={{ display: "block", fontSize: 12, fontWeight: 700, color: "#444", marginBottom: 6, fontFamily: FONT }}>Linked Tata Employee Email*</label>
      <div style={{ position: "relative" }}>
        <input type="email" required value={email} onChange={e => onChange(e.target.value)} placeholder="Enter employee's email" onFocus={e => { e.target.style.borderColor = accent; e.target.style.background = `${accent}08`; if (navFocusBg) dispatchFocus(navFocusBg); }} onBlur={e => { e.target.style.borderColor = status === "found" ? B_TEAL : status === "notfound" ? B_RED : "#e0e0e8"; e.target.style.background = "#fff"; dispatchFocus(null); }} style={{ width: "100%", border: `1.5px solid ${status === "found" ? B_TEAL : status === "notfound" ? B_RED : "#e0e0e8"}`, borderRadius: 12, padding: "13px 44px 13px 16px", fontSize: 14.5, fontFamily: FONT, outline: "none", boxSizing: "border-box" as const, transition: "border-color 0.2s, background 0.15s", background: "#fff" }} />
        <div style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)" }}>
          {status === "loading" && <div style={{ width: 14, height: 14, borderRadius: "50%", border: `2px solid ${accent}`, borderTopColor: "transparent", animation: "empSpin 0.7s linear infinite" }} />}
          {status === "found" && <Check size={15} color={B_TEAL} />}
          {status === "notfound" && <span style={{ fontSize: 13, color: B_RED }}>✕</span>}
        </div>
      </div>
      <style>{`@keyframes empSpin{to{transform:rotate(360deg)}}`}</style>
      <AnimatePresence>
        {status === "found" && (
          <motion.div initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} style={{ marginTop: 8, display: "inline-flex", alignItems: "center", gap: 6, background: `${B_TEAL}14`, border: `1px solid ${B_TEAL}30`, borderRadius: 8, padding: "5px 12px" }}>
            <Check size={11} color={B_TEAL} />
            <span style={{ fontSize: 11.5, fontWeight: 700, color: B_TEAL, fontFamily: FONT }}>Employee found</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function FLabel({ children }: { children: React.ReactNode }) {
  return <label style={{ display: "block", fontSize: 12, fontWeight: 700, color: "#444", marginBottom: 6, fontFamily: FONT }}>{children}</label>;
}

function TInput({ placeholder, type = "text", required = false, accent, onChange, value, navFocusBg }: { placeholder: string; type?: string; required?: boolean; accent: string; onChange?: (v: string) => void; value?: string; navFocusBg?: string }) {
  return <input type={type} placeholder={placeholder} required={required} value={value} onChange={e => onChange?.(e.target.value)} onFocus={e => { e.target.style.borderColor = accent; if (navFocusBg) dispatchFocus(navFocusBg); }} onBlur={e => { e.target.style.borderColor = "#e0e0e8"; dispatchFocus(null); }} style={{ width: "100%", border: "1.5px solid #e0e0e8", borderRadius: 10, padding: "10px 14px", fontSize: 13.5, fontFamily: FONT, color: ACCENT_NAVY, outline: "none", boxSizing: "border-box" as const }} />;
}

function SectionDivider({ label, accent }: { label: string; accent: string }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 12, margin: "4px 0" }}>
      <div style={{ height: 1, background: "#f0f0f8", flex: 1 }} />
      <span style={{ fontSize: 10, fontWeight: 700, color: accent, textTransform: "uppercase" as const, letterSpacing: "1.4px", fontFamily: FONT, whiteSpace: "nowrap" as const }}>{label}</span>
      <div style={{ height: 1, background: "#f0f0f8", flex: 1 }} />
    </div>
  );
}

const RegisterFormView = () => {
  const { selectedRole, formData, setFormData, handleConsentAccept, triggerToast } = useAppContext();
  const navigate = useAppNavigate();
  const [isConsentOpen, setIsConsentOpen] = useState(false);
  const [ngoSubmitted, setNgoSubmitted] = useState(false);
  const [skills, setSkills]         = useState<string[]>([]);
  const [interests, setInterests]   = useState<string[]>([]);
  const [focusAreas, setFocusAreas] = useState<string[]>([]);
  const [relation, setRelation]     = useState<string[]>([]);
  const [company, setCompany]       = useState("");
  const [empEmail, setEmpEmail]     = useState("");
  const [empFound, setEmpFound]     = useState<{ company: string; designation: string } | null>(null);
  const [password, setPassword]     = useState("");
  const [retireYear, setRetireYear] = useState(2015);

  const accent    = ROLE_ACCENT[selectedRole ?? "default"]    ?? B_TICKER;
  const gradient  = ROLE_GRADIENTS[selectedRole ?? "default"]  ?? ROLE_GRADIENTS.default;
  const navFocus  = ROLE_NAV_FOCUS[selectedRole ?? "default"]  ?? ROLE_NAV_FOCUS.default;

  // Wrap TInput to auto-pass navFocusBg
  const Input = (props: Omit<Parameters<typeof TInput>[0], "navFocusBg">) =>
    <TInput {...props} navFocusBg={navFocus} />;

  const toggle = (setter: React.Dispatch<React.SetStateAction<string[]>>, multi: boolean) => (v: string) =>
    setter(p => multi ? (p.includes(v) ? p.filter(x => x !== v) : [...p, v]) : [v]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedRole === "corporate_spoc") { triggerToast("SPOC roles are assigned by TSG Admin. Your request has been submitted for review."); return; }
    setIsConsentOpen(true);
  };
  const handleConsentAcceptLocal = () => {
    setIsConsentOpen(false);
    if (selectedRole === "ngo") { setNgoSubmitted(true); return; }
    handleConsentAccept();
  };

  const roleLabel = selectedRole === "tata_employee" ? "Tata Employee" : selectedRole === "retired_employee" ? "Retired Employee" : selectedRole === "ngo" ? "Partner Organisation" : selectedRole === "family_member" ? "Family Member" : selectedRole?.replace("-", " ");

  if (ngoSubmitted) {
    return (
      <div style={{ minHeight: "100vh", background: gradient, display: "flex", alignItems: "center", justifyContent: "center", padding: "80px 24px", fontFamily: FONT, position: "relative", transition: "background 0.5s" }}>
        <DoodleLayer />
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} style={{ background: "rgba(255,255,255,0.95)", backdropFilter: "blur(16px)", borderRadius: 20, padding: "52px 44px", maxWidth: 520, width: "100%", textAlign: "center", zIndex: 1, position: "relative" }}>
          <div style={{ width: 72, height: 72, background: `${accent}18`, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 24px" }}>
            <Clock size={34} color={accent} />
          </div>
          <h2 style={{ fontSize: 26, fontWeight: 900, color: ACCENT_NAVY, marginBottom: 12, fontFamily: FONT }}>Application Submitted</h2>
          <div style={{ background: `${accent}10`, border: `1px solid ${accent}30`, borderRadius: 14, padding: "20px 24px", marginBottom: 24 }}>
            <p style={{ fontWeight: 700, color: accent, marginBottom: 6, fontSize: 15, fontFamily: FONT }}>Your application is under review.</p>
            <p style={{ color: "#555", fontSize: 13, lineHeight: 1.6, margin: 0, fontFamily: FONT }}>TSG Admin will respond within 48 hours. You'll receive an email once approved.</p>
          </div>
          <button onClick={() => navigate("home")} style={{ padding: "11px 28px", borderRadius: 10, border: `1.5px solid ${accent}`, background: "transparent", color: accent, fontWeight: 700, fontSize: 14, fontFamily: FONT, cursor: "pointer" }}>Return to Home</button>
        </motion.div>
      </div>
    );
  }

  const renderFields = () => {
    switch (selectedRole) {
      case "tata_employee": return (
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <SectionDivider label="About You" accent={accent} />
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            <div><FLabel>Full Name*</FLabel><Input placeholder="Enter full name" required accent={accent} /></div>
            <div><FLabel>Date of Birth*</FLabel><Input type="date" placeholder="" required accent={accent} /></div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            <div><FLabel>Designation*</FLabel><Input placeholder="e.g. Senior Manager" required accent={accent} /></div>
            <div><FLabel>City / Country*</FLabel><Input placeholder="e.g. Mumbai, India" required accent={accent} /></div>
          </div>
          <div><FLabel>LinkedIn URL</FLabel><Input type="url" placeholder="https://linkedin.com/in/..." accent={accent} /></div>
          <SectionDivider label="Your Tata Connection" accent={accent} />
          <CompanySelect value={company} onChange={setCompany} accent={accent} navFocusBg={navFocus} />
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            <div><FLabel>Work / Personal Email*</FLabel><Input type="email" placeholder="Enter email" required accent={accent} onChange={v => setFormData({ ...formData, email: v })} /></div>
            <div><FLabel>SPOC Email</FLabel><Input type="email" placeholder="Required if no @tata.com email" accent={accent} /></div>
          </div>
          <SectionDivider label="Skills & Interests" accent={accent} />
          <div><FLabel>Professional Skills*</FLabel><SkillBubbles selected={skills} onToggle={toggle(setSkills, true)} accent={accent} /></div>
          <div><FLabel>Language Proficiency*</FLabel><PillSelector options={["English","Hindi","Tamil","Marathi","Bengali","Gujarati","Other"]} selected={interests} onToggle={toggle(setInterests, true)} multi accent={accent} /></div>
          <div><FLabel>Area of Interest*</FLabel><PillSelector options={["Education","Environment","Livelihood","Health"]} selected={focusAreas} onToggle={toggle(setFocusAreas, true)} multi accent={accent} /></div>
          <SectionDivider label="Account Security" accent={accent} />
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            <PasswordField label="Password*" value={password} onChange={setPassword} accent={accent} navFocusBg={navFocus} />
            <div><FLabel>Confirm Password*</FLabel><Input type="password" placeholder="••••••••" required accent={accent} /></div>
          </div>
        </div>
      );
      case "retired_employee": return (
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <SectionDivider label="About You" accent={accent} />
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            <div><FLabel>Full Name*</FLabel><Input placeholder="Enter full name" required accent={accent} /></div>
            <div><FLabel>Date of Birth*</FLabel><Input type="date" placeholder="" required accent={accent} /></div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            <div><FLabel>City / Country*</FLabel><Input placeholder="e.g. Mumbai, India" required accent={accent} /></div>
            <div><FLabel>Personal Email*</FLabel><Input type="email" placeholder="Enter personal email" required accent={accent} onChange={v => setFormData({ ...formData, email: v })} /></div>
          </div>
          <SectionDivider label="Your Tata Service" accent={accent} />
          <CompanySelect value={company} onChange={setCompany} label="Last Tata Company*" accent={accent} navFocusBg={navFocus} />
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            <div><FLabel>Last Designation Held*</FLabel><Input placeholder="e.g. Senior Manager" required accent={accent} /></div>
            <YearSlider value={retireYear} onChange={setRetireYear} accent={accent} />
          </div>
          <div><FLabel>SPOC / HR Email from Last Company*</FLabel><Input type="email" placeholder="This person will verify your service history" required accent={accent} /></div>
          <SectionDivider label="Interests" accent={accent} />
          <div><FLabel>Areas of Interest*</FLabel><PillSelector options={["Education","Environment","Health","Livelihood","Mentoring","Skill Development"]} selected={focusAreas} onToggle={toggle(setFocusAreas, true)} multi accent={accent} /></div>
          <SectionDivider label="Account Security" accent={accent} />
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            <PasswordField label="Password*" value={password} onChange={setPassword} accent={accent} navFocusBg={navFocus} />
            <div><FLabel>Confirm Password*</FLabel><Input type="password" placeholder="••••••••" required accent={accent} /></div>
          </div>
        </div>
      );
      case "ngo": return (
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <SectionDivider label="Organisation Details" accent={accent} />
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            <div><FLabel>NGO Name*</FLabel><Input placeholder="Enter NGO name" required accent={accent} /></div>
            <div><FLabel>Registration Number*</FLabel><Input placeholder="Enter registration number" required accent={accent} /></div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            <div><FLabel>Email Address*</FLabel><Input type="email" placeholder="Enter email" required accent={accent} /></div>
            <div><FLabel>Website</FLabel><Input type="url" placeholder="https://www.ngo.org" accent={accent} /></div>
          </div>
          <div>
            <FLabel>Address*</FLabel>
            <textarea placeholder="Enter full address" rows={3} onFocus={e => { e.target.style.borderColor = accent; e.target.style.background = `${accent}08`; if (navFocusBg) dispatchFocus(navFocusBg); }} onBlur={e => { e.target.style.borderColor = "#e0e0e8"; e.target.style.background = "#fff"; dispatchFocus(null); }} style={{ width: "100%", border: "1.5px solid #e0e0e8", borderRadius: 12, padding: "13px 16px", fontSize: 14.5, fontFamily: FONT, outline: "none", resize: "vertical", boxSizing: "border-box" as const, transition: "border-color 0.15s, background 0.15s", background: "#fff" }} />
          </div>
          <SectionDivider label="Focus Areas" accent={accent} />
          <div><FLabel>What does your organisation work on?*</FLabel><PillSelector options={["Education","Healthcare","Rural Development","Skill Development","Sustainability","Livelihoods","Women Empowerment"]} selected={focusAreas} onToggle={toggle(setFocusAreas, true)} multi accent={accent} /></div>
        </div>
      );
      case "family_member": return (
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <SectionDivider label="About You" accent={accent} />
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            <div><FLabel>Full Name*</FLabel><Input placeholder="Enter full name" required accent={accent} /></div>
            <div><FLabel>Date of Birth*</FLabel><Input type="date" placeholder="" required accent={accent} /></div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            <div><FLabel>Personal Email*</FLabel><Input type="email" placeholder="Enter personal email" required accent={accent} onChange={v => setFormData({ ...formData, email: v })} /></div>
            <div><FLabel>City / Country*</FLabel><Input placeholder="e.g. Mumbai, India" required accent={accent} /></div>
          </div>
          <SectionDivider label="Your Tata Connection" accent={accent} />
          <div><FLabel>Relation to Employee*</FLabel><PillSelector options={["Spouse","Child","Parent","Sibling"]} selected={relation} onToggle={toggle(setRelation, false)} accent={accent} /></div>
          <EmployeeLookup email={empEmail} onChange={setEmpEmail} onFound={setEmpFound} accent={accent} navFocusBg={navFocus} />
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            <div>
              <FLabel>Company (of Employee)*</FLabel>
              <div style={{ position: "relative" }}>
                <input type="text" readOnly={!!empFound} value={empFound?.company ?? ""} placeholder="Auto-filled on lookup" onFocus={e => (e.target.style.borderColor = accent)} onBlur={e => (e.target.style.borderColor = "#e0e0e8")} style={{ width: "100%", border: "1.5px solid #e0e0e8", borderRadius: 10, padding: "10px 36px 10px 14px", fontSize: 13.5, fontFamily: FONT, background: empFound ? "#f8f9ff" : "#fff", color: ACCENT_NAVY, outline: "none", boxSizing: "border-box" as const }} />
                {empFound && <Lock size={13} style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", color: "#94a3b8" }} />}
              </div>
            </div>
            <div>
              <FLabel>Designation (of Employee)*</FLabel>
              <div style={{ position: "relative" }}>
                <input type="text" readOnly={!!empFound} value={empFound?.designation ?? ""} placeholder="Auto-filled on lookup" onFocus={e => (e.target.style.borderColor = accent)} onBlur={e => (e.target.style.borderColor = "#e0e0e8")} style={{ width: "100%", border: "1.5px solid #e0e0e8", borderRadius: 10, padding: "10px 36px 10px 14px", fontSize: 13.5, fontFamily: FONT, background: empFound ? "#f8f9ff" : "#fff", color: ACCENT_NAVY, outline: "none", boxSizing: "border-box" as const }} />
                {empFound && <Lock size={13} style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", color: "#94a3b8" }} />}
              </div>
            </div>
          </div>
          <SectionDivider label="Account Security" accent={accent} />
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            <PasswordField label="Password*" value={password} onChange={setPassword} accent={accent} navFocusBg={navFocus} />
            <div><FLabel>Confirm Password*</FLabel><Input type="password" placeholder="••••••••" required accent={accent} /></div>
          </div>
        </div>
      );
      default: return null;
    }
  };

  return (
    <div style={{ minHeight: "100vh", background: gradient, position: "relative", fontFamily: FONT, transition: "background 0.5s ease" }}>
      <DoodleLayer />
      <div style={{ position: "relative", zIndex: 1, display: "flex", justifyContent: "center", padding: "80px 24px 60px" }}>
        <div style={{ width: "100%", maxWidth: 760 }}>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
            <StepRail step={2} accent={accent} />
            <div style={{ marginBottom: 24 }}>
              <h2 style={{ fontSize: 26, fontWeight: 900, color: "#fff", letterSpacing: "-0.4px", margin: "0 0 6px", fontFamily: FONT }}>Register as {roleLabel}</h2>
              <p style={{ fontSize: 13, color: "rgba(255,255,255,0.65)", fontFamily: FONT, margin: 0 }}>Fill in your details below to create your account.</p>
            </div>
            <div style={{ background: "rgba(255,255,255,0.96)", backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)", borderRadius: 20, padding: "40px 36px", boxShadow: "0 24px 64px rgba(0,0,0,0.22), 0 4px 16px rgba(0,0,0,0.1)" }}>
              <form onSubmit={handleSubmit}>
                {renderFields()}
                <div style={{ marginTop: 32, display: "flex", gap: 12 }}>
                  <button type="button" onClick={() => navigate("register-role")} style={{ flex: 1, padding: "13px", borderRadius: 10, border: `1.5px solid ${accent}40`, background: "transparent", color: accent, fontWeight: 700, fontSize: 14, fontFamily: FONT, cursor: "pointer" }}>← Back</button>
                  <button type="submit" style={{ flex: 2, padding: "13px", borderRadius: 10, border: "none", background: accent, color: "#fff", fontWeight: 700, fontSize: 14, fontFamily: FONT, cursor: "pointer", boxShadow: `0 4px 16px ${accent}44` }}>
                    {selectedRole === "ngo" ? "Submit Application" : "Create Account"} →
                  </button>
                </div>
              </form>
            </div>
            <p style={{ textAlign: "center", fontSize: 13, color: "rgba(255,255,255,0.55)", marginTop: 20, fontFamily: FONT }}>
              Already have an account?{" "}
              <button onClick={() => navigate("login")} style={{ fontWeight: 700, color: "#fff", background: "none", border: "none", cursor: "pointer", textDecoration: "underline", fontFamily: FONT }}>Login here</button>
            </p>
          </motion.div>
        </div>
      </div>
      <ConsentModal isOpen={isConsentOpen} onAccept={handleConsentAcceptLocal} onCancel={() => setIsConsentOpen(false)} />
    </div>
  );
};

export default RegisterFormView;
