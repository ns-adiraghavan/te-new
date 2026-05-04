import React, { useState, useEffect, useRef } from "react";
import {
  X, ChevronRight, Users, Search,
  Check, Sparkles, MessageSquare, Plus, Edit2, Trash2,
  AlertTriangle, Download, CheckCircle2, FileText,
  BarChart3, BookOpen, Inbox, Copy,
  ChevronDown, ChevronUp,
  Share2, UserPlus, Award, Briefcase, TrendingUp,
  Star,
} from "lucide-react";
import { MOCK_APPLICANTS, ANJALI_MEHTA } from "@/data/mockData";
import { useAppContext } from "@/context/AppContext";
import { useAppNavigate } from "@/hooks/useAppNavigate";
import badgeVeteran    from "@/assets/badges/veteran.svg";
import badgeAmbassador from "@/assets/badges/ambassador.svg";
import badgeNorthStar  from "@/assets/badges/northstar.svg";
import badgeLead       from "@/assets/badges/lead.svg";
import badgeChampion   from "@/assets/badges/lead.png";
import imgPhotos  from "@/assets/tatabball.jpg";
import imgVideos  from "@/assets/tata_power.JPG";
import imgStories from "@/assets/trent.jpg";
import imgEModule from "@/assets/Tata_international.jpeg";

// ─── Brand tokens ─────────────────────────────────────────────────────────────
const B_YELLOW    = "#F5A623";
const B_TEAL      = "#00A896";
const B_RED       = "#E8401C";
const B_BLUE      = "#135EA9";    // TVW blue
const B_MID_BLUE  = "#3B7ABD";    // mid blue
const B_ABOUT_BLUE = "#4376BB";   // about blue
const B_PINK      = "#F4838A";    // pink accent
const ACCENT_NAVY = "#0D1B3E";

const P_YELLOW    = "#FEF6E4";
const P_TEAL      = "#E6F8F5";
const P_BLUE      = "#EBF4FF";
const P_RED       = "#FFF0EE";
const P_PINK      = "#FEF0F4";

// NGO primary palette — purple (#803998)
const B_NGO       = "#803998";   // NGO primary — ProEngage purple
const B_NGO_SOFT  = "#9B4DB5";   // NGO secondary — lighter purple
const P_NGO       = "#F3EEFF";   // NGO pastel — light purple surface
const P_NGO_MID   = "#E9DAFF";   // NGO mid-pastel — avatar bg, mini chips

// KPI tile colours — rotate across 5 primary site colours
const KPI_GREEN     = B_BLUE;        // active projects — TVW blue
const KPI_TEAL      = B_MID_BLUE;    // volunteers engaged — mid blue
const KPI_LIME      = B_NGO;         // completed — NGO purple
const KPI_BLUE      = B_ABOUT_BLUE;  // pending reviews — about blue

// Aliases for legacy references
const B_GREEN = B_NGO;
const P_GREEN = P_NGO;
const P_LIME  = P_NGO_MID;

const NGO_BADGES = [
  { id: "b1", name: "ProEngage Partner",   image: badgeVeteran,    desc: "Completed 5+ matched projects",              earned: "Jan 2026" },
  { id: "b2", name: "5-Star NGO",          image: badgeAmbassador, desc: "Consistently high volunteer ratings",         earned: "Dec 2025" },
  { id: "b3", name: "Community Champion",  image: badgeNorthStar,  desc: "10+ editions of TVW engagement",              earned: "Nov 2025" },
  { id: "b4", name: "Impact Pathfinder",   image: badgeChampion,   desc: "First edition with 100% feedback submitted",  earned: "Oct 2025" },
  { id: "b5", name: "NGO Pioneer",         image: badgeLead,       desc: "First NGO to complete a ProEngage project",   earned: "2020"     },
];

const notifDot: React.CSSProperties = {
  position: "absolute", top: -3, right: -6,
  width: 8, height: 8, borderRadius: "50%",
  background: B_RED, boxShadow: "0 0 0 2px white",
};

const card: React.CSSProperties = {
  background: "#fff", border: "1px solid #e8e8f0", borderRadius: 14, padding: "20px 22px",
};

// ─── Count-up hook ────────────────────────────────────────────────────────────
function useCountUp(target: number, duration = 1100, start = false) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!start || target === 0) { setValue(0); return; }
    let t0: number | null = null;
    const tick = (now: number) => {
      if (!t0) t0 = now;
      const p = Math.min((now - t0) / duration, 1);
      const ease = 1 - Math.pow(1 - p, 4);
      setValue(Math.round(ease * target));
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [target, duration, start]);
  return value;
}

// ─── KPI Stat tile — matches Volunteer/SPOC bold coloured tile ────────────────
function StatTile({
  value, suffix = "", label, accentColor, delay, started,
}: {
  value: number; suffix?: string; label: string; accentColor: string; delay: number; started: boolean;
}) {
  const [go, setGo] = useState(false);
  useEffect(() => {
    if (started) { const t = setTimeout(() => setGo(true), delay); return () => clearTimeout(t); }
  }, [started, delay]);
  const n = useCountUp(value, 1100, go);
  const isZero = value === 0;
  return (
    <div style={{
      background: isZero ? "#fafafa" : accentColor,
      borderRadius: 18, padding: "22px 14px 18px", textAlign: "center",
      boxShadow: isZero ? "none" : `0 4px 20px ${accentColor}33`,
      transition: "transform 0.2s, box-shadow 0.2s", cursor: "default",
      position: "relative", overflow: "hidden",
    }}
      onMouseEnter={e => { if (!isZero) { (e.currentTarget as HTMLElement).style.transform = "translateY(-3px)"; } }}
      onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = "translateY(0)"; }}
    >
      {!isZero && <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 1.4, background: "rgba(255,255,255,0.35)" }} />}
      <div style={{ fontSize: 38, fontWeight: 900, color: isZero ? "#bbb" : "#fff", letterSpacing: "-2px", lineHeight: 1 }}>
        {n}{suffix}
      </div>
      <div style={{ fontSize: 11, fontWeight: 600, color: isZero ? "#ccc" : "rgba(255,255,255,0.78)", marginTop: 7, lineHeight: 1.3 }}>
        {label}
      </div>
    </div>
  );
}

// ─── DrawerShell — centred modal (identical spec to Volunteer/SPOC) ────────────
function DrawerShell({
  open, onClose, title, subtitle, accentTag, width = 560, children,
}: {
  open: boolean; onClose: () => void; title: string;
  subtitle?: string; accentTag?: string; width?: number; children: React.ReactNode;
}) {
  useEffect(() => {
    const h = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", h);
    return () => document.removeEventListener("keydown", h);
  }, [onClose]);

  return (
    <>
      <div onClick={onClose} style={{ position: "fixed", inset: 0, background: "rgba(13,27,62,0.45)", zIndex: 200, opacity: open ? 1 : 0, pointerEvents: open ? "auto" : "none", transition: "opacity 0.22s", backdropFilter: "blur(2px)" }} />
      <div style={{ position: "fixed", top: "50%", left: "50%", transform: open ? "translate(-50%, -50%) scale(1)" : "translate(-50%, -48%) scale(0.97)", transition: "transform 0.25s cubic-bezier(0.4,0,0.2,1), opacity 0.25s", opacity: open ? 1 : 0, pointerEvents: open ? "auto" : "none", width, maxWidth: "calc(100vw - 40px)", maxHeight: "calc(100vh - 80px)", background: "#fff", borderRadius: 16, zIndex: 201, boxShadow: "0 24px 64px rgba(13,27,62,0.22)", display: "flex", flexDirection: "column", overflowY: "auto" }}>
        <div style={{ background: B_NGO, padding: "24px 28px", borderRadius: "16px 16px 0 0", flexShrink: 0 }}>
          <button onClick={onClose} style={{ background: "rgba(255,255,255,0.1)", border: "none", borderRadius: 7, color: "rgba(255,255,255,0.7)", fontSize: 13, fontWeight: 500, padding: "5px 12px", cursor: "pointer", marginBottom: 16 }}>← Close</button>
          {accentTag && <div style={{ display: "inline-block", background: "rgba(255,255,255,0.18)", border: "1px solid rgba(255,255,255,0.3)", borderRadius: 100, padding: "3px 10px", fontSize: 10.5, fontWeight: 700, color: "#fff", letterSpacing: "0.6px", textTransform: "uppercase", marginBottom: 10 }}>{accentTag}</div>}
          <div style={{ fontSize: 17, fontWeight: 700, color: "#fff", lineHeight: 1.3 }}>{title}</div>
          {subtitle && <div style={{ fontSize: 12.5, color: "rgba(255,255,255,0.45)", marginTop: 5 }}>{subtitle}</div>}
        </div>
        <div style={{ flex: 1, overflowY: "auto", padding: "24px 28px" }}>{children}</div>
      </div>
    </>
  );
}

// ─── Field helpers ────────────────────────────────────────────────────────────
function Label({ children, required }: { children: React.ReactNode; required?: boolean }) {
  return <div style={{ fontSize: 10.5, fontWeight: 700, color: "#aaaabc", textTransform: "uppercase", letterSpacing: "0.8px", marginBottom: 6 }}>{children}{required && <span style={{ color: B_RED, marginLeft: 3 }}>*</span>}</div>;
}
function FInput({ value, onChange, placeholder, type = "text" }: { value: string; onChange?: (v: string) => void; placeholder?: string; type?: string }) {
  return <input type={type} value={value} placeholder={placeholder} onChange={e => onChange?.(e.target.value)} style={{ width: "100%", border: "1.5px solid #e0e0e8", borderRadius: 8, padding: "9px 12px", fontSize: 13.5, color: ACCENT_NAVY, outline: "none", boxSizing: "border-box" }} onFocus={e => (e.target.style.borderColor = B_NGO)} onBlur={e => (e.target.style.borderColor = "#e0e0e8")} />;
}
function FSelect({ value, onChange, options }: { value: string; onChange: (v: string) => void; options: string[] }) {
  return <select value={value} onChange={e => onChange(e.target.value)} style={{ width: "100%", border: "1.5px solid #e0e0e8", borderRadius: 8, padding: "9px 12px", fontSize: 13.5, color: ACCENT_NAVY, outline: "none", background: "#fff", appearance: "none", cursor: "pointer", boxSizing: "border-box" }} onFocus={e => (e.target.style.borderColor = B_NGO)} onBlur={e => (e.target.style.borderColor = "#e0e0e8")}>{options.map(o => <option key={o}>{o}</option>)}</select>;
}

// ─── AI Enhance textarea (reused from current file) ──────────────────────────
function AITextarea({ value, onChange, placeholder, rows = 3, label }: {
  value: string; onChange: (v: string) => void; placeholder?: string; rows?: number; label?: string;
}) {
  const [enhancing, setEnhancing] = useState(false);
  const [enhanced, setEnhanced] = useState(false);
  const doEnhance = () => {
    if (!value.trim()) return;
    setEnhancing(true);
    setTimeout(() => {
      onChange(value + "\n\n[Enhanced: Section refined for clarity, specificity, and alignment with ProEngage quality standards.]");
      setEnhancing(false); setEnhanced(true);
      setTimeout(() => setEnhanced(false), 3000);
    }, 1400);
  };
  const score = Math.min(100, Math.max(0, Math.round(value.length / 3)));
  const scoreColor = score >= 70 ? B_TEAL : score >= 40 ? B_YELLOW : B_RED;
  return (
    <div style={{ position: "relative" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 6 }}>
        {label && <Label>{label}</Label>}
        <button onClick={doEnhance} disabled={enhancing || !value.trim()}
          style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 11.5, fontWeight: 700, color: enhancing ? "#aaaabc" : enhanced ? B_TEAL : B_NGO, background: enhanced ? P_TEAL : P_NGO, border: `1px solid ${enhanced ? B_TEAL : B_NGO}30`, borderRadius: 7, padding: "4px 10px", cursor: enhancing || !value.trim() ? "not-allowed" : "pointer", transition: "all 0.2s", whiteSpace: "nowrap" }}>
          {enhancing ? <><span style={{ display: "inline-block", width: 12, height: 12, borderRadius: "50%", border: `2px solid ${B_NGO}`, borderTopColor: "transparent", animation: "ngo-spin 0.8s linear infinite" }} /> Enhancing…</> : enhanced ? <><Check size={12} /> Enhanced</> : <><Sparkles size={12} /> AI Enhance</>}
        </button>
      </div>
      <textarea value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} rows={rows}
        style={{ width: "100%", border: `1.5px solid ${enhanced ? B_TEAL : "#e0e0e8"}`, borderRadius: 8, padding: "9px 12px", fontSize: 13.5, color: ACCENT_NAVY, outline: "none", resize: "none", boxSizing: "border-box", transition: "border-color 0.2s" }}
        onFocus={e => (e.target.style.borderColor = B_NGO)} onBlur={e => (e.target.style.borderColor = enhanced ? B_TEAL : "#e0e0e8")} />
      {value.length > 0 && (
        <div style={{ marginTop: 5, display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{ flex: 1, height: 4, background: "#e8e8f0", borderRadius: 2, overflow: "hidden" }}>
            <div style={{ height: "100%", width: `${score}%`, background: scoreColor, borderRadius: 2, transition: "width 0.3s, background 0.3s" }} />
          </div>
          <div style={{ fontSize: 10.5, fontWeight: 700, color: scoreColor, minWidth: 60 }}>{score >= 70 ? "Good quality" : score >= 40 ? "Needs more" : "Too brief"}</div>
        </div>
      )}
      <style>{`@keyframes ngo-spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}

// ─── Status badge ─────────────────────────────────────────────────────────────
function Badge({ status }: { status: string }) {
  const map: Record<string, [string, string]> = {
    Approved:       [P_TEAL,    "#0A8246"],
    Active:         [P_TEAL,    "#0A8246"],
    Live:           [P_TEAL,    "#0A8246"],
    Matched:        [P_TEAL,    "#0A8246"],
    Submitted:      [P_TEAL,    "#0A8246"],
    Completed:      ["#f0f0f4", "#888"],
    Closed:         ["#f0f0f4", "#888"],
    Draft:          ["#f0f0f4", "#888"],
    "Under Review": [P_YELLOW,  "#9a6500"],
    Pending:        [P_YELLOW,  "#9a6500"],
    Rejected:       [P_RED,     "#c0392b"],
    Inactive:       ["#f0f0f4", "#888"],
    Fulfilled:      ["#f0f0f4", "#888"],
  };
  const [bg, color] = map[status] ?? ["#f0f0f4", "#666"];
  return <span style={{ background: bg, color, fontSize: 11, fontWeight: 700, padding: "2px 9px", borderRadius: 100, whiteSpace: "nowrap" }}>{status}</span>;
}

// ─── Section heading — matches Volunteer/SPOC exactly ────────────────────────
function SH({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <div style={{ marginBottom: 24 }}>
      <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "1.8px", textTransform: "uppercase", color: "#0D1B3E", marginBottom: 5 }}>{eyebrow}</div>
      <h2 style={{ fontFamily: "'DM Sans', ui-sans-serif, system-ui, sans-serif", fontSize: 21, fontWeight: 900, color: ACCENT_NAVY, margin: 0, letterSpacing: -0.3 }}>{title}</h2>
    </div>
  );
}

// ─── Activity action card (2-col grid) — matches SPOC pattern ────────────────
function ActionCard({ icon: Icon, title, sub, cta, onClick, bell }: {
  icon: React.FC<any>; title: string; sub: string; cta: string; onClick: () => void; bell?: boolean;
}) {
  const [hov, setHov] = useState(false);
  return (
    <button onClick={onClick}
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{ background: hov ? P_NGO : "#f8f9ff", border: `1px solid ${hov ? B_NGO + "60" : "#e8e8f0"}`, borderRadius: 10, padding: "14px", textAlign: "left", cursor: "pointer", display: "flex", flexDirection: "column", gap: 6, transition: "border-color 0.15s, background 0.15s" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <Icon size={15} color={B_NGO} />
        <span style={{ position: "relative", fontSize: 13, fontWeight: 700, color: ACCENT_NAVY }}>
          {title}{bell && <span style={notifDot} />}
        </span>
      </div>
      <div style={{ fontSize: 11.5, color: "#888", lineHeight: 1.4 }}>{sub}</div>
      <span style={{ fontSize: 11, fontWeight: 600, color: B_NGO }}>{cta}</span>
    </button>
  );
}

// ─── Resource photo card ──────────────────────────────────────────────────────
function ResourceCard({ label, desc, count, photo, accent, pastel, onClick }: {
  label: string; desc: string; count?: string; photo: string; accent: string; pastel: string; onClick: () => void;
}) {
  const [hov, setHov] = useState(false);
  return (
    <div onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)} onClick={onClick}
      style={{ background: "#fff", border: "1px solid #e8e8f0", borderRadius: 14, overflow: "hidden", cursor: "pointer", transform: hov ? "translateY(-3px)" : "translateY(0)", boxShadow: hov ? `0 8px 24px ${accent}18` : "none", transition: "transform 0.18s, box-shadow 0.18s" }}>
      <div style={{ height: 150, background: `url(${photo}) center/cover no-repeat` }} />
      <div style={{ background: accent, padding: "12px 14px", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ fontSize: 14.5, fontWeight: 900, color: "#fff", textAlign: "center", lineHeight: 1.3 }}>{label}</div>
      </div>
    </div>
  );
}

// ─── Add Project form ─────────────────────────────────────────────────────────
function AddProjectForm({ clonedFrom, onClose, onSubmit }: { clonedFrom?: any; onClose: () => void; onSubmit: () => void }) {
  const [form, setForm] = useState({
    hostOrg: clonedFrom?.hostOrg ?? "Pratham Foundation",
    areaOfWork: clonedFrom?.areaOfWork ?? "Education",
    deliveryType: clonedFrom?.deliveryType ?? "Hybrid",
    background: clonedFrom ? "Update this section with outcomes from the new edition." : "",
    deliverables: clonedFrom ? "Update deliverables for the new project scope." : "",
    expectedLearning: clonedFrom ? "Describe what volunteers will gain in this edition." : "",
    volunteerProfile: clonedFrom?.volunteerProfile ?? "",
    location: clonedFrom?.location ?? "Mumbai",
    duration: clonedFrom?.duration ?? "3 months",
    volunteersRequired: String(clonedFrom?.volunteers ?? 5),
    undertaking: false,
  });
  const set = (k: string, v: any) => setForm(f => ({ ...f, [k]: v }));
  const totalScore = [form.background, form.deliverables, form.expectedLearning, form.volunteerProfile]
    .reduce((s, v) => s + Math.min(25, Math.round(v.length / 4)), 0);
  const pct = Math.min(100, totalScore);
  const scoreColor = pct >= 70 ? B_TEAL : pct >= 40 ? B_YELLOW : B_RED;

  return (
    <div>
      {clonedFrom && (
        <div style={{ background: P_YELLOW, border: `1px solid ${B_YELLOW}44`, borderRadius: 10, padding: "10px 14px", marginBottom: 18, fontSize: 12.5, color: "#7c5500", display: "flex", gap: 8 }}>
          <Sparkles size={14} style={{ flexShrink: 0, marginTop: 1 }} />
          Cloned from <strong>"{clonedFrom.title}"</strong>. Update outcomes, deliverables and impact for this edition.
        </div>
      )}
      <div style={{ display: "flex", flexDirection: "column", gap: 14, maxHeight: "60vh", overflowY: "auto", paddingRight: 4 }}>
        <div><Label required>Host Organisation</Label><FInput value={form.hostOrg} onChange={v => set("hostOrg", v)} /></div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
          <div><Label required>Area of Work</Label><FSelect value={form.areaOfWork} onChange={v => set("areaOfWork", v)} options={["Education","Health","Environment","Livelihoods","Technology","Finance","Gender Equality","Others"]} /></div>
          <div><Label required>Type of Delivery</Label><FSelect value={form.deliveryType} onChange={v => set("deliveryType", v)} options={["Remote","In-Person","Hybrid"]} /></div>
          <div><Label required>Location</Label><FInput value={form.location} onChange={v => set("location", v)} /></div>
          <div><Label required>Duration</Label><FInput value={form.duration} onChange={v => set("duration", v)} placeholder="e.g. 3 months" /></div>
          <div><Label required>Volunteers Required</Label><FInput value={form.volunteersRequired} onChange={v => set("volunteersRequired", v)} type="number" /></div>
        </div>
        <AITextarea label="Project Background" value={form.background} onChange={v => set("background", v)} placeholder="Describe the project context and community need…" rows={4} />
        <AITextarea label="Deliverables *" value={form.deliverables} onChange={v => set("deliverables", v)} placeholder="What will volunteers produce or accomplish?" rows={3} />
        <AITextarea label="Expected Learning for Volunteer *" value={form.expectedLearning} onChange={v => set("expectedLearning", v)} placeholder="What skills or perspectives will volunteers gain?" rows={3} />
        <AITextarea label="Ideal Volunteer Profile" value={form.volunteerProfile} onChange={v => set("volunteerProfile", v)} placeholder="e.g. Finance professional, 3+ years experience" rows={2} />
        <div style={{ background: "#f8f9ff", border: "1px solid #e8e8f0", borderRadius: 10, padding: "12px 14px" }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: "#aaaabc", textTransform: "uppercase", letterSpacing: "0.8px", marginBottom: 8 }}>🤖 AI Quality Score</div>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
            <div style={{ flex: 1, height: 8, background: "#e8e8f0", borderRadius: 4, overflow: "hidden" }}>
              <div style={{ height: "100%", width: `${pct}%`, background: scoreColor, borderRadius: 4, transition: "width 0.4s" }} />
            </div>
            <div style={{ fontSize: 16, fontWeight: 900, color: scoreColor, minWidth: 40 }}>{pct}</div>
          </div>
          <div style={{ fontSize: 12, color: "#6b6b7a" }}>
            {pct >= 70 ? "Good — ready to submit." : pct >= 40 ? "Needs more detail in key sections." : "Too thin — expand deliverables and expected learning."}
            {" "}Score visible only to you.
          </div>
        </div>
        <label style={{ display: "flex", alignItems: "flex-start", gap: 10, fontSize: 13, color: "#555", cursor: "pointer" }}>
          <input type="checkbox" checked={form.undertaking} onChange={e => set("undertaking", e.target.checked)} style={{ accentColor: B_NGO, marginTop: 2 }} />
          I confirm the information is accurate and agree to the Tata ProEngage undertaking.
        </label>
      </div>
      <div style={{ display: "flex", gap: 10, marginTop: 16, paddingTop: 16, borderTop: "1px solid #f0f0f8" }}>
        <button onClick={onClose} style={{ flex: 1, padding: "10px", background: "#f8f8fc", border: "1px solid #e0e0e8", borderRadius: 9, fontSize: 13.5, fontWeight: 600, color: "#6b6b7a", cursor: "pointer" }}>Cancel</button>
        <button onClick={onSubmit} style={{ flex: 1, padding: "10px", background: B_NGO, border: "none", borderRadius: 9, fontSize: 13.5, fontWeight: 700, color: "#fff", cursor: "pointer" }}>Submit for Review</button>
      </div>
    </div>
  );
}

// ─── Feedback form ────────────────────────────────────────────────────────────
function FeedbackForm({ onClose, onSubmit }: { onClose: () => void; onSubmit: () => void }) {
  const [status, setStatus] = useState("Completed");
  const [costSaving, setCostSaving] = useState("");
  const [ratings, setRatings] = useState([0, 0]);
  const [testimonial, setTestimonial] = useState("");
  return (
    <div>
      <div style={{ background: P_YELLOW, border: `1px solid ${B_YELLOW}44`, borderRadius: 9, padding: "10px 14px", marginBottom: 16, fontSize: 12.5, color: "#7c5500" }}>
        Feedback is mandatory for certificate generation. Both volunteer and NGO must submit before TSG Admin triggers certificates.
      </div>
      <div style={{ marginBottom: 14 }}>
        <Label>Q1 — Completion status</Label>
        <div style={{ display: "flex", gap: 16 }}>
          {["Completed","Not Completed"].map(o => (
            <label key={o} style={{ display: "flex", alignItems: "center", gap: 7, fontSize: 13.5, cursor: "pointer", color: ACCENT_NAVY }}>
              <input type="radio" checked={status === o} onChange={() => setStatus(o)} style={{ accentColor: B_NGO }} />{o}
            </label>
          ))}
        </div>
      </div>
      {status === "Completed" && (
        <>
          <div style={{ marginBottom: 14 }}>
            <Label>Q2 — Estimated cost saving (INR)</Label>
            <FInput value={costSaving} onChange={setCostSaving} type="number" placeholder="e.g. 50000" />
          </div>
          <div style={{ marginBottom: 14 }}>
            <Label>Q3 — Rate PE team support</Label>
            <div style={{ background: "#f8f9ff", border: "1px solid #e8e8f0", borderRadius: 9, padding: "12px 14px" }}>
              {["Team was accessible and responsive", "Queries were resolved effectively"].map((lbl, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
                  <div style={{ fontSize: 13, color: "#555", flex: 1 }}>{lbl}</div>
                  <div style={{ display: "flex", gap: 3 }}>
                    {[1,2,3,4,5].map(n => (
                      <span key={n} onClick={() => setRatings(r => { const a = [...r]; a[i] = n; return a; })}
                        style={{ fontSize: 18, cursor: "pointer", color: n <= ratings[i] ? B_NGO : "#ddd" }}>★</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div style={{ marginBottom: 16 }}>
            <Label>Q4 — Testimonial (optional)</Label>
            <textarea value={testimonial} onChange={e => setTestimonial(e.target.value)} placeholder="Share your experience with this volunteer…" rows={4}
              style={{ width: "100%", border: "1.5px solid #e0e0e8", borderRadius: 8, padding: "9px 12px", fontSize: 13.5, color: ACCENT_NAVY, outline: "none", resize: "none", boxSizing: "border-box" }} />
            <div style={{ fontSize: 11, color: "#aaaabc", marginTop: 4 }}>Testimonials go to Admin moderation before being published.</div>
          </div>
        </>
      )}
      {status === "Not Completed" && (
        <div style={{ marginBottom: 16 }}>
          <Label>Q2 — Reason for non-completion</Label>
          {["Volunteer withdrew","Project scope changed significantly","Scheduling/availability conflict"].map(opt => (
            <label key={opt} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, cursor: "pointer", color: ACCENT_NAVY, marginBottom: 8 }}>
              <input type="radio" name="reason" style={{ accentColor: B_NGO }} />{opt}
            </label>
          ))}
        </div>
      )}
      <div style={{ display: "flex", gap: 10 }}>
        <button onClick={onClose} style={{ flex: 1, padding: "10px", background: "#f8f8fc", border: "1px solid #e0e0e8", borderRadius: 9, fontSize: 13.5, fontWeight: 600, color: "#6b6b7a", cursor: "pointer" }}>Cancel</button>
        <button onClick={onSubmit} style={{ flex: 1, padding: "10px", background: B_NGO, border: "none", borderRadius: 9, fontSize: 13.5, fontWeight: 700, color: "#fff", cursor: "pointer" }}>Submit Feedback</button>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// MAIN COMPONENT
// ─────────────────────────────────────────────────────────────────────────────
const NGODashboardView = () => {
  const { setActiveProject, setClonedProject, ngoData, triggerToast, setShowOrientationModal, setShowSupportModal } = useAppContext();
  const navigate = useAppNavigate();

  // Section refs for scroll tracking
  const snapshotRef     = useRef<HTMLDivElement>(null);
  const activitiesRef   = useRef<HTMLDivElement>(null);
  const applicationsRef = useRef<HTMLDivElement>(null);
  const historyRef      = useRef<HTMLDivElement>(null);
  const partnerRef      = useRef<HTMLDivElement>(null);
  const reportsRef      = useRef<HTMLDivElement>(null);
  const resourcesRef    = useRef<HTMLDivElement>(null);
  const [activeSection, setActiveSection] = useState("snapshot");

  useEffect(() => {
    const obs = new IntersectionObserver(entries => {
      for (const e of entries) { if (e.isIntersecting) setActiveSection(e.target.id); }
    }, { threshold: 0.25 });
    [snapshotRef, activitiesRef, applicationsRef, historyRef, partnerRef, reportsRef, resourcesRef]
      .forEach(r => r.current && obs.observe(r.current));
    return () => obs.disconnect();
  }, []);

  const scrollTo = (ref: React.RefObject<HTMLDivElement | null>) =>
    ref.current?.scrollIntoView({ behavior: "smooth", block: "start" });

  // Count-up trigger
  const [kpiStarted, setKpiStarted] = useState(false);
  useEffect(() => { const t = setTimeout(() => setKpiStarted(true), 300); return () => clearTimeout(t); }, []);

  const projects     = ngoData.projects ?? ANJALI_MEHTA.projects;
  const isLeadPartner = (ngoData.tier ?? ANJALI_MEHTA.tier) === "Lead Partner";
  const partnerNGOs  = isLeadPartner ? (ngoData.partnerNGOs ?? ANJALI_MEHTA.partnerNGOs ?? []) : [];

  const [applicants, setApplicants] = useState(MOCK_APPLICANTS);
  const [searchQuery, setSearchQuery] = useState("");
  const [appTab, setAppTab]          = useState<"shortlist" | "all">("shortlist");
  const [auditLog, setAuditLog]      = useState<any[]>([]);
  const [coordinators, setCoordinators] = useState(ngoData.coordinators ?? ANJALI_MEHTA.coordinators);

  const [historyTab, setHistoryTab]   = useState<"projects" | "volunteers" | "feedback">("projects");
  const [drillEdition, setDrillEdition] = useState<string | null>(null);
  const [drillProject, setDrillProject] = useState<any | null>(null);

  // Edition filter
  const [selectedEdition, setSelectedEdition] = useState("Edition 23 · 2025–26");

  type ModalKey = null | "addProject" | "cloneProject" | "viewProjects" | "feedback" | "healthUpdate" | "manageTeam" | "selectedApplicant" | "grievance" | "projectGuide" | "referNGO" | "shareStory";
  const [modal, setModal]               = useState<ModalKey>(null);
  const [selectedApplicant, setSelectedApplicant] = useState<any>(null);
  const [feedbackProject, setFeedbackProject]     = useState<any>(null);
  const [clonedFrom, setClonedFrom]               = useState<any>(null);
  const [grievanceForm, setGrievanceForm]         = useState({ projectId: "", category: "", description: "" });
  const [submittedGrievances, setSubmittedGrievances] = useState<any[]>([]);
  const [expandedPartner, setExpandedPartner]     = useState<number | null>(null);
  const [snapPopout, setSnapPopout]               = useState<null | "skills" | "badges" | "social">(null);
  const [addCoordName, setAddCoordName]           = useState("");
  const [addCoordEmail, setAddCoordEmail]         = useState("");
  const [addCoordRole, setAddCoordRole]           = useState("Project Coordinator");

  // Stats
  const activeProjects  = projects.filter((p: any) => p.status === "Active").length;
  const totalVols       = projects.filter((p: any) => ["Active","Closed"].includes(p.status)).reduce((s: number, p: any) => s + (p.volunteers ?? 0), 0);
  const completedVols   = projects.filter((p: any) => p.status === "Closed").reduce((s: number, p: any) => s + (p.volunteers ?? 0), 0);
  const pendingApps     = ngoData.pendingApplications ?? 8;

  const shortlisted = [...applicants].filter(a => a.status === "Pending").sort((a, b) => b.matchPercentage - a.matchPercentage);
  const filtered    = applicants.filter(a =>
    a.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    a.skills.some((s: string) => s.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const handleAccept = (id: number) => {
    const a = applicants.find(x => x.id === id);
    setApplicants(prev => prev.map(x => x.id === id ? { ...x, status: "Matched" } : x));
    setAuditLog(prev => [{ id: Date.now(), action: "Accepted", volunteer: a?.name ?? "", date: new Date().toLocaleString() }, ...prev]);
    triggerToast(`Accepted ${a?.name}. Confirmation email sent.`);
    setModal(null);
  };
  const handleReject = (id: number) => {
    const a = applicants.find(x => x.id === id);
    setApplicants(prev => prev.map(x => x.id === id ? { ...x, status: "Rejected" } : x));
    triggerToast(`${a?.name} rejected. They can apply to other projects.`);
    setModal(null);
  };

  // Rail link style — SPOC-matching pattern with NGO accent
  const railLink = (active: boolean): React.CSSProperties => ({
    display: "flex", alignItems: "center", gap: 10,
    padding: "9px 10px", borderRadius: 8, cursor: "pointer",
    background: active ? P_NGO : "transparent",
    transition: "background 0.18s",
  });
  const railLinkBar = (active: boolean): React.CSSProperties => ({
    width: 2, height: 12, borderRadius: 2, flexShrink: 0,
    background: active ? B_NGO : "#dddde8", transition: "background 0.18s",
  });
  const railLinkText = (active: boolean): React.CSSProperties => ({
    fontSize: 12.5, fontWeight: active ? 700 : 400,
    color: active ? B_NGO : "#aaaabc", transition: "color 0.18s",
  });
  const tabBtn = (active: boolean): React.CSSProperties => ({
    fontSize: 12.5, fontWeight: active ? 700 : 500,
    color: active ? B_NGO : "#6b6b7a",
    background: active ? P_NGO : "transparent",
    border: active ? `1px solid ${B_NGO}40` : "1px solid transparent",
    borderRadius: 7, padding: "5px 13px", cursor: "pointer",
  });

  return (
    <div style={{ background: "#f8f9ff", minHeight: "100vh", paddingBottom: 80 }}>

      {/* Full-bleed greeting banner */}
      <div style={{ background: `linear-gradient(135deg, #3d1a5e 0%, ${B_NGO} 55%, ${B_NGO_SOFT} 100%)`, minHeight: 340, padding: "92px 40px 40px", display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 24, flexWrap: "wrap", position: "relative", overflow: "hidden" }}>
        {/* Hand-drawn doodle overlay */}
        <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none", opacity: 0.12, overflow: "hidden" }} viewBox="0 0 1200 340" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
        <style>{`@keyframes ndA{0%,100%{transform:translate(0,0) rotate(0deg)}50%{transform:translate(6px,-10px) rotate(5deg)}} @keyframes ndB{0%,100%{transform:translate(0,0) rotate(0deg)}50%{transform:translate(-8px,7px) rotate(-7deg)}} @keyframes ndC{0%,100%{transform:translate(0,0) rotate(0deg)}50%{transform:translate(5px,9px) rotate(3deg)}} @keyframes ndD{0%,100%{transform:translate(0,0) rotate(0deg)}50%{transform:translate(-6px,-5px) rotate(-4deg)}} .nda{animation:ndA 22s ease-in-out infinite;transform-origin:center} .ndb{animation:ndB 28s ease-in-out infinite;transform-origin:center} .ndc{animation:ndC 18s ease-in-out infinite;transform-origin:center} .ndd{animation:ndD 32s ease-in-out infinite;transform-origin:center}`}</style>
          <g className="nda"><path d="M1090 52 C1110 34, 1142 38, 1150 64 C1158 90, 1138 114, 1112 116 C1086 118, 1068 96, 1074 70 C1077 56, 1090 52, 1090 52 Z" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round"/></g>
          <g className="ndb" transform="translate(1038, 82)"><line x1="0" y1="-16" x2="0" y2="16" stroke="white" strokeWidth="2.2" strokeLinecap="round"/><line x1="-16" y1="0" x2="16" y2="0" stroke="white" strokeWidth="2.2" strokeLinecap="round"/><line x1="-11" y1="-11" x2="11" y2="11" stroke="white" strokeWidth="1.6" strokeLinecap="round"/><line x1="11" y1="-11" x2="-11" y2="11" stroke="white" strokeWidth="1.6" strokeLinecap="round"/></g>
          <g className="ndc"><path d="M820 210 C840 196, 860 224, 880 210 C900 196, 920 224, 940 210 C960 196, 980 224, 1000 210" fill="none" stroke="white" strokeWidth="2.2" strokeLinecap="round"/></g>
          <g className="ndd"><rect x="960" y="240" width="28" height="28" rx="4" fill="none" stroke="white" strokeWidth="2" transform="rotate(14, 974, 254)"/></g>
          <g className="ndb"><path d="M60 280 C80 260, 110 275, 100 300 C90 325, 58 320, 55 295 C53 280, 60 280, 60 280 Z" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round"/></g>
          <g className="nda"><path d="M140 60 C158 46, 178 52, 174 72 C170 92, 148 98, 136 82 C128 70, 140 60, 140 60 Z" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round"/></g>
          <g className="ndc" transform="translate(200, 270)"><line x1="0" y1="-10" x2="0" y2="10" stroke="white" strokeWidth="2" strokeLinecap="round"/><line x1="-10" y1="0" x2="10" y2="0" stroke="white" strokeWidth="2" strokeLinecap="round"/><line x1="-7" y1="-7" x2="7" y2="7" stroke="white" strokeWidth="1.4" strokeLinecap="round"/><line x1="7" y1="-7" x2="-7" y2="7" stroke="white" strokeWidth="1.4" strokeLinecap="round"/></g>
          <g className="ndd"><path d="M420 290 C438 278, 456 298, 474 286 C492 274, 510 294, 528 282" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round"/></g>
          <g className="nda"><circle cx="700" cy="42" r="22" fill="none" stroke="white" strokeWidth="2.2"/><circle cx="700" cy="42" r="10" fill="none" stroke="white" strokeWidth="1.4"/></g>
          <g className="ndb"><rect x="1100" y="280" width="22" height="22" rx="3" fill="none" stroke="white" strokeWidth="2" transform="rotate(-10, 1111, 291)"/></g>
          <g className="ndc"><path d="M330 80 C348 70, 362 80, 358 96 C354 112, 336 116, 326 102 C318 90, 330 80, 330 80 Z" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round"/></g>
          <g className="ndd"><path d="M860 60 C876 50, 890 60, 886 76 C882 90, 864 94, 856 80 C850 70, 860 60, 860 60 Z" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round"/></g>
        </svg>
        <div>
          <div style={{ fontSize: "clamp(1.8rem,3vw,2.6rem)", fontWeight: 900, color: "#fff", letterSpacing: -0.5 }}>
            {ngoData.organization ?? "Pratham Foundation"}, this is your NGO space.
          </div>
          <div style={{ fontSize: 14, color: "rgba(255,255,255,0.65)", marginTop: 6, fontWeight: 300 }}>
            {ngoData.tier ?? "Lead Partner"} · Education · Mumbai, India
          </div>
        </div>
      </div>


      {/* Main layout */}
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "40px 40px 100px", display: "flex", gap: 44, alignItems: "start" }}>

        {/* ── MAIN SCROLL ── */}
        <div style={{ flex: 1, minWidth: 0 }}>

          {/* ─── I. Engagement Snapshot ─── */}
          <div id="snapshot" ref={snapshotRef} style={card}>
            <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "1.8px", textTransform: "uppercase", color: "#aaaabc", marginBottom: 16 }}>I · My Engagement Snapshot</div>

            {/* KPI tiles — bold coloured, matches Volunteer/SPOC */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, marginBottom: 20 }}>
              <StatTile value={activeProjects}  label="Active projects"    accentColor={KPI_GREEN}  delay={0}   started={kpiStarted} />
              <StatTile value={totalVols}       label="Volunteers engaged" accentColor={KPI_TEAL}   delay={80}  started={kpiStarted} />
              <StatTile value={completedVols}   label="Completed"          accentColor={KPI_LIME}   delay={160} started={kpiStarted} />
              <StatTile value={pendingApps}     label="Pending reviews"    accentColor={KPI_BLUE}   delay={240} started={kpiStarted} />
            </div>

            {/* Secondary info tiles — Skills, Badges, Social (expandable) */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 10, marginBottom: snapPopout ? 12 : 0 }}>
              {/* Skills */}
              <div onClick={() => setSnapPopout(snapPopout === "skills" ? null : "skills")}
                style={{ background: P_BLUE, borderRadius: 10, padding: "12px 14px", cursor: "pointer", border: `1.5px solid ${snapPopout === "skills" ? B_BLUE : "transparent"}`, transition: "border-color 0.15s" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 6 }}>
                  <Briefcase size={13} color={B_BLUE} />
                  <div style={{ fontSize: 10.5, fontWeight: 700, color: "#6b6b7a", textTransform: "uppercase", letterSpacing: "0.6px" }}>Skills Utilised</div>
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
                  {["Finance","Education","IT","HR"].map(s => (
                    <span key={s} style={{ fontSize: 10.5, fontWeight: 600, background: "#fff", color: B_BLUE, border: `1px solid ${B_BLUE}30`, borderRadius: 100, padding: "2px 7px" }}>{s}</span>
                  ))}
                  <span style={{ fontSize: 10.5, fontWeight: 600, color: "#888", padding: "2px 4px" }}>+3 more</span>
                </div>
                <div style={{ fontSize: 10, color: B_BLUE, fontWeight: 600, marginTop: 6 }}>View all →</div>
              </div>

              <div onClick={() => setSnapPopout(snapPopout === "badges" ? null : "badges")}
                style={{ background: P_YELLOW, borderRadius: 10, padding: "12px 14px", cursor: "pointer", border: `1.5px solid ${snapPopout === "badges" ? B_YELLOW : "transparent"}`, transition: "border-color 0.15s" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 6 }}>
                  <Award size={13} color="#9a6500" />
                  <div style={{ fontSize: 10.5, fontWeight: 700, color: "#6b6b7a", textTransform: "uppercase", letterSpacing: "0.6px" }}>Badges Earned</div>
                </div>
                <div style={{ display: "flex", gap: 4, alignItems: "center" }}>
                  {NGO_BADGES.slice(0, 4).map(b => (
                    <img key={b.id} src={b.image} alt={b.name} style={{ width: 28, height: 28, objectFit: "contain" }} />
                  ))}
                </div>
                <div style={{ fontSize: 24, fontWeight: 700, color: "#9a6500", letterSpacing: "-1px", marginTop: 4 }}>{NGO_BADGES.length}</div>
                <div style={{ fontSize: 10, color: "#9a6500", fontWeight: 600 }}>View all →</div>
              </div>

              {/* Social */}
              <div onClick={() => setSnapPopout(snapPopout === "social" ? null : "social")}
                style={{ background: P_NGO, borderRadius: 10, padding: "12px 14px", cursor: "pointer", border: `1.5px solid ${snapPopout === "social" ? B_NGO : "transparent"}`, transition: "border-color 0.15s" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 6 }}>
                  <TrendingUp size={13} color={B_NGO} />
                  <div style={{ fontSize: 10.5, fontWeight: 700, color: "#6b6b7a", textTransform: "uppercase", letterSpacing: "0.6px" }}>Social Contribution</div>
                </div>
                <div style={{ fontSize: 24, fontWeight: 700, color: B_NGO, letterSpacing: "-1px" }}>12</div>
                <div style={{ fontSize: 11, color: "#555", marginTop: 2 }}>posts · 3.4k reach</div>
                <div style={{ fontSize: 10, color: B_NGO, fontWeight: 600, marginTop: 4 }}>View breakdown →</div>
              </div>
            </div>

            {/* Popout panels */}
            {snapPopout === "skills" && (
              <div style={{ background: "#f8f9ff", border: `1.5px solid ${B_BLUE}30`, borderRadius: 10, padding: "16px", marginBottom: 4 }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
                  <div style={{ fontSize: 12.5, fontWeight: 700, color: ACCENT_NAVY }}>Skills Utilised This Edition</div>
                  <button onClick={() => setSnapPopout(null)} style={{ background: "none", border: "none", color: "#aaa", cursor: "pointer", fontSize: 16 }}>✕</button>
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                  {[{ skill: "Finance & Accounting", count: 14 },{ skill: "Education & Training", count: 22 },{ skill: "IT / Technology", count: 9 },{ skill: "Human Resources", count: 7 },{ skill: "Communications", count: 11 },{ skill: "Project Management", count: 5 }].map(s => (
                    <div key={s.skill} style={{ display: "flex", alignItems: "center", gap: 8, background: "#fff", border: `1px solid ${B_BLUE}25`, borderRadius: 8, padding: "8px 12px", minWidth: 180 }}>
                      <div style={{ flex: 1, fontSize: 12.5, color: ACCENT_NAVY, fontWeight: 500 }}>{s.skill}</div>
                      <div style={{ fontSize: 12, fontWeight: 700, color: B_BLUE }}>{s.count} vols</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {snapPopout === "badges" && (
              <div style={{ background: P_NGO, border: `1.5px solid ${B_NGO}30`, borderRadius: 10, padding: "16px", marginBottom: 4 }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
                  <div style={{ fontSize: 12.5, fontWeight: 700, color: ACCENT_NAVY }}>Badges Earned</div>
                  <button onClick={() => setSnapPopout(null)} style={{ background: "none", border: "none", color: "#aaa", cursor: "pointer", fontSize: 16 }}>✕</button>
                </div>
                <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
                  {NGO_BADGES.map(b => (
                    <div key={b.id} title={`${b.name} — ${b.desc} (${b.earned})`}
                      style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 5, cursor: "default", transition: "transform 0.15s" }}
                      onMouseEnter={e => (e.currentTarget.style.transform = "scale(1.08)")}
                      onMouseLeave={e => (e.currentTarget.style.transform = "scale(1)")}>
                      <img src={b.image} alt={b.name} style={{ width: 52, height: 52, objectFit: "contain", display: "block" }} />
                      <span style={{ fontSize: 10, fontWeight: 600, color: "#6b6b7a", textAlign: "center", lineHeight: 1.2, maxWidth: 64 }}>{b.name}</span>
                      <span style={{ fontSize: 9.5, fontWeight: 600, color: B_NGO }}>{b.earned}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {snapPopout === "social" && (
              <div style={{ background: P_NGO_MID, border: `1.5px solid ${B_NGO}25`, borderRadius: 10, padding: "16px", marginBottom: 4 }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
                  <div style={{ fontSize: 12.5, fontWeight: 700, color: ACCENT_NAVY }}>Social Media Contribution</div>
                  <button onClick={() => setSnapPopout(null)} style={{ background: "none", border: "none", color: "#aaa", cursor: "pointer", fontSize: 16 }}>✕</button>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 8, marginBottom: 12 }}>
                  {[{ label: "Total Posts", value: "12" },{ label: "Est. Reach", value: "3,400" },{ label: "Shares", value: "47" }].map(s => (
                    <div key={s.label} style={{ background: "#fff", borderRadius: 8, padding: "10px 12px", textAlign: "center", border: `1px solid ${B_NGO}20` }}>
                      <div style={{ fontSize: 20, fontWeight: 700, color: B_NGO, letterSpacing: "-0.5px" }}>{s.value}</div>
                      <div style={{ fontSize: 10.5, color: "#6b6b7a", marginTop: 2 }}>{s.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Feedback reminder alerts */}
            {projects
              .filter((p: any) => { if (p.status !== "Active" || !p.endDate) return false; const d = (new Date(p.endDate).getTime() - Date.now()) / 86400000; return d <= 3 && d >= -1; })
              .map((p: any) => {
                const days = Math.ceil((new Date(p.endDate).getTime() - Date.now()) / 86400000);
                return (
                  <div key={p.id} style={{ background: P_YELLOW, border: "1px solid #f5d48a", borderRadius: 10, padding: "12px 16px", display: "flex", alignItems: "center", gap: 12, marginTop: 14 }}>
                    <AlertTriangle size={15} color="#9a6500" style={{ flexShrink: 0 }} />
                    <div style={{ flex: 1, fontSize: 13, color: "#7c5500", lineHeight: 1.5 }}>
                      <strong>Feedback due {days <= 0 ? "today" : `in ${days} day${days !== 1 ? "s" : ""}`}</strong> — "{p.title}"
                    </div>
                    <button onClick={() => { setActiveProject(p); setFeedbackProject(p); setModal("feedback"); }}
                      style={{ background: "#9a6500", border: "none", borderRadius: 8, padding: "7px 14px", fontSize: 12.5, fontWeight: 700, color: "#fff", cursor: "pointer", whiteSpace: "nowrap" }}>
                      Complete Feedback
                    </button>
                  </div>
                );
              })}

            {/* M&E health tiles */}
            {projects.filter((p: any) => p.status === "Active" && p.healthUpdates).map((p: any) => {
              const hasRisk = p.healthUpdates.some((h: any) => ["At Risk","Drop Out"].includes(h.status));
              return (
                <div key={p.id} style={{ background: "#f8f9ff", border: "1px solid #e8e8f0", borderRadius: 10, padding: "12px 14px", marginTop: 14 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                    <div style={{ fontSize: 12.5, fontWeight: 700, color: ACCENT_NAVY, flex: 1 }}>{p.title}</div>
                    {hasRisk && <span style={{ background: P_RED, color: B_RED, fontSize: 10.5, fontWeight: 700, padding: "2px 8px", borderRadius: 100, display: "flex", alignItems: "center", gap: 4 }}><AlertTriangle size={10} /> Flagged</span>}
                  </div>
                  <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                    {p.healthUpdates.map((h: any, i: number) => {
                      const bg    = h.status === "Healthy" ? P_TEAL : h.status === "At Risk" ? P_RED : "#f0f0f4";
                      const color = h.status === "Healthy" ? "#0A8246" : h.status === "At Risk" ? B_RED : "#888";
                      return (
                        <div key={i} style={{ background: bg, borderRadius: 7, padding: "6px 10px", minWidth: 78 }}>
                          <div style={{ fontSize: 10, fontWeight: 700, color: "#888", marginBottom: 2 }}>{h.month}</div>
                          <div style={{ fontSize: 11, fontWeight: 700, color }}>{h.status}</div>
                        </div>
                      );
                    })}
                  </div>
                  <div style={{ fontSize: 11, color: "#aaaabc", marginTop: 6, fontStyle: "italic" }}>Health updates are submitted by TSG sub-admin after offline check-ins. Read-only for NGO.</div>
                </div>
              );
            })}
          </div>

          {/* ─── II. My Activities ─── */}
          <div id="activities" ref={activitiesRef} style={{ ...card, marginTop: 20 }}>
            <SH eyebrow="II · My Activities" title="What do you need to do?" />
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
              <ActionCard icon={Plus}          title="Add project"                   sub="Full form with AI quality scoring"             cta="New → or Clone from previous"      onClick={() => { setClonedFrom(null); setModal("addProject"); }} />
              <ActionCard icon={FileText}       title="View / Edit my projects"       sub="Draft → Under Review → Live / Returned"        cta="Open →"                            onClick={() => setModal("viewProjects")} />
              <ActionCard icon={Inbox}          title="Review applications"           sub={`${pendingApps} pending · AI shortlist at top`} cta="Jump to queue ↓"                  onClick={() => scrollTo(applicationsRef)} bell />
              <ActionCard icon={MessageSquare}  title="Submit feedback"               sub="Per-project, per-volunteer. Mandatory for certs." cta="Open →"                         onClick={() => setModal("feedback")} bell />
              <ActionCard icon={BarChart3}      title="Project health update"         sub="Active / Paused / Extended / Close early"      cta="Open →"                            onClick={() => setModal("healthUpdate")} />
              <ActionCard icon={Users}          title="Manage team / co-ordinators"   sub="Self-service — no Admin needed"                cta="Open →"                            onClick={() => setModal("manageTeam")} />
              <ActionCard icon={UserPlus}       title="Refer an NGO"                  sub="Invite another NGO to join ProEngage"          cta="Open →"                            onClick={() => setModal("referNGO")} />
              <ActionCard icon={Share2}         title="Share your story / experience" sub="Post a project highlight. Goes to moderation." cta="Open →"                            onClick={() => setModal("shareStory")} />
            </div>
          </div>

          {/* ─── III. Application Queue ─── */}
          <div id="applications" ref={applicationsRef} style={{ ...card, marginTop: 20 }}>
            <div style={{ marginBottom: 20 }}>
              <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "1.8px", textTransform: "uppercase", color: "#aaaabc", marginBottom: 4 }}>III · Application Queue</div>
              <div style={{ fontSize: 20, fontWeight: 900, color: ACCENT_NAVY, position: "relative", display: "inline-flex" }}>
                Review Applications<span style={notifDot} />
              </div>
            </div>
            {/* Tab switcher */}
            <div style={{ display: "flex", gap: 6, padding: "4px", background: "#f0f0f4", borderRadius: 9, marginBottom: 14, width: "fit-content" }}>
              {(["shortlist","all"] as const).map(t => (
                <button key={t} onClick={() => setAppTab(t)} style={{ ...tabBtn(appTab === t), minWidth: 120 }}>
                  {t === "shortlist" ? "🤖 AI Shortlist" : `All (${applicants.length})`}
                </button>
              ))}
            </div>
            <div style={{ position: "relative", marginBottom: 12 }}>
              <Search size={13} style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)", color: "#aaa" }} />
              <input placeholder="Search name or skill…" value={searchQuery} onChange={e => setSearchQuery(e.target.value)}
                style={{ width: "100%", paddingLeft: 32, paddingRight: 12, paddingTop: 8, paddingBottom: 8, border: "1px solid #e0e0e8", borderRadius: 8, fontSize: 13, outline: "none", boxSizing: "border-box" }} />
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 1, maxHeight: 340, overflowY: "auto" }}>
              {(appTab === "shortlist" ? shortlisted : filtered).map((a, i) => (
                <div key={a.id} onClick={() => { setSelectedApplicant(a); setModal("selectedApplicant"); }}
                  style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 8px", borderBottom: "1px solid #f0f0f8", cursor: "pointer" }}
                  onMouseEnter={e => (e.currentTarget.style.background = "#f8f9ff")}
                  onMouseLeave={e => (e.currentTarget.style.background = "transparent")}>
                  {appTab === "shortlist" && (
                    <div style={{ width: 22, height: 22, borderRadius: "50%", background: i === 0 ? "#f59e0b" : i === 1 ? "#94a3b8" : i === 2 ? "#c47c2a" : "#e0e0e8", color: "#fff", fontSize: 10, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>{i + 1}</div>
                  )}
                  <div style={{ width: 32, height: 32, borderRadius: "50%", background: P_NGO, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 700, color: B_NGO, flexShrink: 0 }}>
                    {a.name.split(" ").map((n: string) => n[0]).join("")}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 13, fontWeight: 600, color: ACCENT_NAVY }}>{a.name}</div>
                    <div style={{ display: "flex", gap: 5, marginTop: 4, flexWrap: "wrap" }}>
                      <span style={{ fontSize: 10.5, fontWeight: 600, background: P_BLUE, color: B_BLUE, borderRadius: 100, padding: "1px 7px" }}>{a.city}</span>
                      <span style={{ fontSize: 10.5, fontWeight: 600, background: P_TEAL, color: "#0A8246", borderRadius: 100, padding: "1px 7px" }}>{a.availability}</span>
                      {a.skills.slice(0, 2).map((s: string) => (
                        <span key={s} style={{ fontSize: 10.5, fontWeight: 600, background: P_NGO, color: B_NGO, borderRadius: 100, padding: "1px 7px" }}>{s}</span>
                      ))}
                    </div>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <div style={{ fontSize: 12.5, fontWeight: 700, color: a.matchPercentage >= 90 ? B_TEAL : a.matchPercentage >= 80 ? B_NGO : "#888" }}>{a.matchPercentage}%</div>
                    <Badge status={a.status} />
                  </div>
                </div>
              ))}
            </div>
            {appTab === "shortlist" && shortlisted.filter(a => a.status === "Pending").length >= 5 && (
              <button onClick={() => shortlisted.filter(a => a.status === "Pending").forEach(a => handleAccept(a.id))}
                style={{ width: "100%", marginTop: 12, padding: "10px", background: B_NGO, border: "none", borderRadius: 9, fontSize: 13.5, fontWeight: 700, color: "#fff", cursor: "pointer" }}>
                Bulk Accept Top {shortlisted.filter(a => a.status === "Pending").length}
              </button>
            )}
            {auditLog.length > 0 && (
              <div style={{ marginTop: 12, paddingTop: 12, borderTop: "1px solid #f0f0f8" }}>
                <div style={{ fontSize: 10, fontWeight: 700, color: "#aaaabc", textTransform: "uppercase", letterSpacing: "0.8px", marginBottom: 8 }}>Recent Actions</div>
                {auditLog.slice(0, 3).map(log => (
                  <div key={log.id} style={{ display: "flex", gap: 10, fontSize: 12, marginBottom: 4 }}>
                    <span style={{ fontWeight: 700, color: log.action === "Accepted" ? B_TEAL : B_RED }}>{log.action}</span>
                    <span style={{ color: "#888" }}>{log.volunteer}</span>
                    <span style={{ color: "#aaaabc", marginLeft: "auto" }}>{log.date}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* ─── IV. History ─── */}
          <div id="history" ref={historyRef} style={{ ...card, marginTop: 20 }}>
            <SH eyebrow="IV · History" title="Records by Edition" />
            {/* Edition filter — matches SPOC pattern */}
            <div style={{ display: "flex", gap: 8, marginBottom: 14, alignItems: "center" }}>
              <select value={selectedEdition} onChange={e => setSelectedEdition(e.target.value)}
                style={{ fontSize: 11.5, padding: "5px 10px", border: "1px solid #e0e0e8", borderRadius: 7, background: "#f8f9ff", color: "#555", outline: "none" }}>
                <option>Edition 23 · 2025–26</option>
                <option>Edition 22 · 2024–25</option>
                <option>Edition 21 · 2023–24</option>
              </select>
              <button onClick={() => triggerToast("Generating export…")} style={{ marginLeft: "auto", fontSize: 12, color: B_NGO, fontWeight: 600, background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: 5 }}>
                <Download size={12} /> Export
              </button>
            </div>
            {/* Tab switcher */}
            <div style={{ display: "flex", gap: 6, marginBottom: 14, flexWrap: "wrap" }}>
              {(["projects","volunteers","feedback"] as const).map(t => (
                <button key={t} onClick={() => { setHistoryTab(t); setDrillEdition(null); setDrillProject(null); }} style={tabBtn(historyTab === t)}>
                  {t === "projects" ? "My Projects" : t === "volunteers" ? "My Volunteers" : "My Feedback"}
                </button>
              ))}
            </div>

            {historyTab === "projects" && (
              <>
                {(drillEdition || drillProject) && (
                  <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 12, fontSize: 12 }}>
                    <button onClick={() => { setDrillEdition(null); setDrillProject(null); }} style={{ color: "#aaa", background: "none", border: "none", cursor: "pointer" }}>Editions</button>
                    {drillEdition && <><span style={{ color: "#ccc" }}>›</span><button onClick={() => setDrillProject(null)} style={{ color: drillProject ? "#aaa" : ACCENT_NAVY, fontWeight: drillProject ? 400 : 700, background: "none", border: "none", cursor: "pointer" }}>{drillEdition}</button></>}
                    {drillProject && <><span style={{ color: "#ccc" }}>›</span><span style={{ color: ACCENT_NAVY, fontWeight: 700 }}>{drillProject.title}</span></>}
                  </div>
                )}
                {!drillEdition && (
                  <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                    {[{ id: `ProEngage · ${selectedEdition}`, status: "Active", count: projects.length },{ id: "ProEngage · Edition 22 · 2024–25", status: "Closed", count: 3 }].map(ed => (
                      <div key={ed.id} onClick={() => setDrillEdition(ed.id)}
                        style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 14px", background: "#f8f9ff", border: "1px solid #e8e8f0", borderRadius: 10, cursor: "pointer" }}
                        onMouseEnter={e => (e.currentTarget.style.borderColor = B_NGO)} onMouseLeave={e => (e.currentTarget.style.borderColor = "#e8e8f0")}>
                        <div style={{ flex: 1 }}>
                          <div style={{ fontSize: 13.5, fontWeight: 600, color: ACCENT_NAVY }}>{ed.id}</div>
                          <div style={{ fontSize: 11, color: "#888", marginTop: 2 }}>{ed.count} projects</div>
                        </div>
                        <Badge status={ed.status} /><ChevronRight size={14} color="#aaa" />
                      </div>
                    ))}
                  </div>
                )}
                {drillEdition && !drillProject && (
                  <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                    {projects.map((p: any) => (
                      <div key={p.id} onClick={() => setDrillProject(p)}
                        style={{ display: "flex", alignItems: "center", gap: 12, padding: "11px 14px", background: "#f8f9ff", border: "1px solid #e8e8f0", borderRadius: 10, cursor: "pointer" }}
                        onMouseEnter={e => (e.currentTarget.style.borderColor = B_NGO)} onMouseLeave={e => (e.currentTarget.style.borderColor = "#e8e8f0")}>
                        <div style={{ flex: 1 }}>
                          <div style={{ fontSize: 13.5, fontWeight: 600, color: ACCENT_NAVY }}>{p.title}</div>
                          <div style={{ display: "flex", gap: 5, marginTop: 4 }}>
                            <span style={{ fontSize: 10.5, fontWeight: 600, background: P_TEAL, color: "#0A8246", borderRadius: 100, padding: "1px 7px" }}>{p.volunteers ?? 0} volunteers</span>
                            <span style={{ fontSize: 10.5, fontWeight: 600, background: P_BLUE, color: B_BLUE, borderRadius: 100, padding: "1px 7px" }}>{p.applications ?? 0} applications</span>
                          </div>
                        </div>
                        <Badge status={p.status} /><ChevronRight size={14} color="#aaa" />
                      </div>
                    ))}
                  </div>
                )}
                {drillProject && (
                  <div>
                    <div style={{ background: "#fff", border: "1px solid #e8e8f0", borderRadius: 10, overflow: "hidden" }}>
                      <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr 1fr", padding: "8px 14px", background: "#f8f9ff", borderBottom: "1px solid #e8e8f0" }}>
                        {["Volunteer","Status","Feedback","Hours",""].map(h => (
                          <div key={h} style={{ fontSize: 10, fontWeight: 700, color: "#aaaabc", textTransform: "uppercase", letterSpacing: "0.7px" }}>{h}</div>
                        ))}
                      </div>
                      {[{ name: "Priya Sharma", status: "Active", feedbackDone: false, hours: null },{ name: "Amit Verma", status: "Matched", feedbackDone: false, hours: null },{ name: "Sneha Rathore", status: "Active", feedbackDone: true, hours: "14h" }].map((v, i) => (
                        <div key={i} style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr 1fr", padding: "11px 14px", borderBottom: "1px solid #f0f0f8", alignItems: "center" }}>
                          <div style={{ fontSize: 13, fontWeight: 600, color: ACCENT_NAVY }}>{v.name}</div>
                          <Badge status={v.status} />
                          <div>
                            {v.feedbackDone
                              ? <span style={{ fontSize: 11.5, color: B_TEAL, fontWeight: 700, display: "flex", alignItems: "center", gap: 4 }}><CheckCircle2 size={12} /> Submitted</span>
                              : <button onClick={() => { setActiveProject(drillProject); navigate("project-feedback"); }} style={{ fontSize: 11.5, fontWeight: 600, color: B_NGO, background: "none", border: "none", cursor: "pointer" }}>Give Feedback</button>}
                          </div>
                          <div style={{ fontSize: 12, color: "#777" }}>{v.hours ?? "—"}</div>
                          <button onClick={() => { setActiveProject(drillProject); navigate("active-project-management"); }} style={{ fontSize: 11.5, fontWeight: 600, color: "#aaa", background: "none", border: "none", cursor: "pointer" }}>View</button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </>
            )}

            {historyTab === "volunteers" && (
              <div>
                {[
                  { name: "Priya Sharma",  project: "Financial Literacy for Rural Women", status: "Active",    hours: "12h", skill: "Finance",    edition: "Edn 23" },
                  { name: "Amit Verma",    project: "Digital Skills for Youth",            status: "Matched",   hours: "—",   skill: "IT",         edition: "Edn 23" },
                  { name: "Sneha Rathore", project: "Community Health Awareness",           status: "Completed", hours: "40h", skill: "Healthcare", edition: "Edn 22" },
                ].map((v, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 0", borderBottom: "1px solid #f0f0f8" }}>
                    <div style={{ width: 32, height: 32, borderRadius: "50%", background: P_NGO, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 700, color: B_NGO, flexShrink: 0 }}>
                      {v.name.split(" ").map(n => n[0]).join("")}
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 13, fontWeight: 600, color: ACCENT_NAVY }}>{v.name}</div>
                      <div style={{ display: "flex", gap: 5, marginTop: 4, flexWrap: "wrap" }}>
                        <span style={{ fontSize: 10.5, fontWeight: 600, background: P_NGO, color: B_NGO, borderRadius: 100, padding: "1px 7px" }}>{v.skill}</span>
                        <span style={{ fontSize: 10.5, fontWeight: 600, background: "#f0f0f4", color: "#555", borderRadius: 100, padding: "1px 7px" }}>{v.edition}</span>
                        <span style={{ fontSize: 10.5, color: "#888", padding: "1px 0" }}>{v.project}</span>
                      </div>
                    </div>
                    <Badge status={v.status} />
                    <div style={{ fontSize: 12, fontWeight: 600, color: v.hours !== "—" ? B_NGO : "#bbb", minWidth: 30, textAlign: "right" }}>{v.hours}</div>
                  </div>
                ))}
              </div>
            )}

            {historyTab === "feedback" && (
              <div>
                {[
                  { project: "Community Health Awareness",          vol: "Sneha Rathore", submitted: "15-Mar-26", done: true,  edition: "Edn 22" },
                  { project: "Financial Literacy for Rural Women",  vol: "Priya Sharma",  submitted: "Pending",   done: false, edition: "Edn 23" },
                ].map((f, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 8px", borderBottom: "1px solid #f0f0f8" }}>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 13, fontWeight: 600, color: ACCENT_NAVY }}>{f.project}</div>
                      <div style={{ display: "flex", gap: 5, marginTop: 4, flexWrap: "wrap" }}>
                        <span style={{ fontSize: 10.5, fontWeight: 600, background: P_BLUE, color: B_BLUE, borderRadius: 100, padding: "1px 7px" }}>{f.vol}</span>
                        <span style={{ fontSize: 10.5, fontWeight: 600, background: "#f0f0f4", color: "#555", borderRadius: 100, padding: "1px 7px" }}>{f.edition}</span>
                        {f.done && <span style={{ fontSize: 10.5, fontWeight: 600, background: "#f0f0f4", color: "#888", borderRadius: 100, padding: "1px 7px" }}>{f.submitted}</span>}
                      </div>
                    </div>
                    <Badge status={f.done ? "Submitted" : "Pending"} />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* ─── V. Partner NGOs (Lead Partners only) ─── */}
          {isLeadPartner && partnerNGOs.length > 0 && (
            <div id="partnerngos" ref={partnerRef} style={{ ...card, marginTop: 20 }}>
              <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 20 }}>
                <SH eyebrow="V · Network" title="Partner NGOs" />
                <div style={{ fontSize: 11, color: "#aaaabc", marginTop: 4, textAlign: "right", maxWidth: 220, lineHeight: 1.5 }}>
                  As Lead Partner, you can view partner details. Edits are managed by TSG Admin.
                </div>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {partnerNGOs.map((partner: any) => {
                  const isOpen = expandedPartner === partner.id;
                  return (
                    <div key={partner.id} style={{ border: "1px solid #e8e8f0", borderRadius: 12, overflow: "hidden" }}>
                      <div onClick={() => setExpandedPartner(isOpen ? null : partner.id)}
                        style={{ display: "flex", alignItems: "center", gap: 12, padding: "13px 16px", cursor: "pointer", background: isOpen ? "#f8f9ff" : "#fff" }}
                        onMouseEnter={e => { if (!isOpen) e.currentTarget.style.background = "#fafafa"; }}
                        onMouseLeave={e => { if (!isOpen) e.currentTarget.style.background = "#fff"; }}>
                        <div style={{ width: 36, height: 36, borderRadius: 9, background: P_NGO, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 700, color: B_NGO, flexShrink: 0 }}>{partner.name.charAt(0)}</div>
                        <div style={{ flex: 1 }}>
                          <div style={{ fontSize: 13.5, fontWeight: 600, color: ACCENT_NAVY }}>{partner.name}</div>
                          <div style={{ display: "flex", gap: 5, marginTop: 4, flexWrap: "wrap" }}>
                            <span style={{ fontSize: 10.5, fontWeight: 600, background: P_BLUE, color: B_BLUE, borderRadius: 100, padding: "1px 7px" }}>{partner.city}</span>
                            <span style={{ fontSize: 10.5, fontWeight: 600, background: P_NGO, color: B_NGO, borderRadius: 100, padding: "1px 7px" }}>{partner.focusArea}</span>
                            <span style={{ fontSize: 10.5, fontWeight: 600, background: "#f0f0f4", color: "#555", borderRadius: 100, padding: "1px 7px" }}>{partner.projects.length} project{partner.projects.length !== 1 ? "s" : ""}</span>
                          </div>
                        </div>
                        <Badge status={partner.status} />
                        {isOpen ? <ChevronUp size={14} color="#aaa" /> : <ChevronDown size={14} color="#aaa" />}
                      </div>
                      {isOpen && (
                        <div style={{ padding: "0 16px 16px", borderTop: "1px solid #f0f0f8", background: "#f8f9ff" }}>
                          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 8, margin: "14px 0" }}>
                            {[{ label: "Volunteers", val: partner.volunteersTotal },{ label: "Projects", val: partner.projects.length },{ label: "Partner since", val: new Date(partner.joinedDate).getFullYear() }].map(s => (
                              <div key={s.label} style={{ background: "#fff", border: "1px solid #e8e8f0", borderRadius: 9, padding: "10px 12px", textAlign: "center" }}>
                                <div style={{ fontSize: 10, fontWeight: 700, color: "#aaaabc", textTransform: "uppercase", letterSpacing: "0.7px", marginBottom: 4 }}>{s.label}</div>
                                <div style={{ fontSize: 18, fontWeight: 700, color: ACCENT_NAVY }}>{s.val}</div>
                              </div>
                            ))}
                          </div>
                          <div style={{ marginBottom: 12 }}>
                            <div style={{ fontSize: 10, fontWeight: 700, color: "#aaaabc", textTransform: "uppercase", letterSpacing: "0.7px", marginBottom: 6 }}>Contact</div>
                            <div style={{ fontSize: 13.5, fontWeight: 600, color: ACCENT_NAVY }}>{partner.contactName}</div>
                            <div style={{ fontSize: 12, color: "#777", marginTop: 2 }}>{partner.contactEmail}</div>
                          </div>
                          <div style={{ fontSize: 10, fontWeight: 700, color: "#aaaabc", textTransform: "uppercase", letterSpacing: "0.7px", marginBottom: 8 }}>Projects</div>
                          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                            {partner.projects.map((proj: any) => (
                              <div key={proj.id} style={{ display: "flex", alignItems: "center", gap: 10, padding: "9px 12px", background: "#fff", border: "1px solid #e8e8f0", borderRadius: 9 }}>
                                <div style={{ flex: 1 }}>
                                  <div style={{ fontSize: 13, fontWeight: 600, color: ACCENT_NAVY }}>{proj.title}</div>
                                  <div style={{ marginTop: 4 }}>
                                    <span style={{ fontSize: 10.5, fontWeight: 600, background: P_TEAL, color: "#0A8246", borderRadius: 100, padding: "1px 7px" }}>{proj.volunteers} volunteer{proj.volunteers !== 1 ? "s" : ""}</span>
                                  </div>
                                </div>
                                <Badge status={proj.status} />
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* ─── VI. Reports ─── */}
          <div id="reports" ref={reportsRef} style={{ ...card, marginTop: 20 }}>
            <SH eyebrow={`${isLeadPartner ? "VI" : "V"} · Analytics`} title="Reports" />
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
              {[
                { title: "Edition Participation Report",  desc: "Applications, matches, completions", date: "Generated 1 Apr 2026",  tag: "Edn 23",    tagColor: B_NGO,  tagBg: P_NGO  },
                { title: "Volunteer Engagement Summary",  desc: "Hours logged, feedback rates, certificate status", date: "Generated 1 Apr 2026", tag: "Edn 23", tagColor: B_TEAL, tagBg: P_TEAL },
                { title: "Project Health Report",         desc: "Monthly M&E status across all active projects", date: "Generated 20 Mar 2026", tag: "Active projects", tagColor: KPI_LIME, tagBg: P_NGO_MID },
                { title: "Feedback Completion Tracker",   desc: "Who has and hasn't submitted feedback", date: "Generated 5 Apr 2026", tag: "Pending",  tagColor: "#9a6500", tagBg: P_YELLOW },
              ].map((r, i) => (
                <div key={i} style={{ background: "#f8f9ff", border: "1px solid #e8e8f0", borderRadius: 10, padding: "14px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
                    <div style={{ fontSize: 13, fontWeight: 700, color: ACCENT_NAVY, flex: 1 }}>{r.title}</div>
                    <span style={{ fontSize: 10.5, fontWeight: 700, background: r.tagBg, color: r.tagColor, borderRadius: 100, padding: "2px 8px", whiteSpace: "nowrap" }}>{r.tag}</span>
                  </div>
                  <div style={{ fontSize: 12, color: "#6b6b7a", lineHeight: 1.4, marginBottom: 12 }}>{r.desc}</div>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <span style={{ fontSize: 11, color: "#aaaabc" }}>{r.date}</span>
                    <button onClick={() => triggerToast(`Generating "${r.title}"…`)}
                      style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 12, fontWeight: 700, color: B_NGO, background: P_NGO, border: `1px solid ${B_NGO}30`, borderRadius: 7, padding: "5px 10px", cursor: "pointer" }}>
                      <Download size={12} /> Download
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ─── VII. Resource Library ─── */}
          <div id="resources" ref={resourcesRef} style={{ background: "#f0f1f8", borderRadius: 16, padding: "24px 22px", marginTop: 20 }}>
            <SH eyebrow={`${isLeadPartner ? "VII" : "VI"} · Learning & Support`} title="Resource Library" />
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12 }}>
              {[
                { label: "E-Module / Orientation", desc: "Mandatory onboarding. Progress tracked by Admin.", count: "2 of 5 complete", photo: imgEModule,  accent: B_BLUE,   pastel: P_BLUE   },
                { label: "NGO Project Guide",       desc: "Templates, guidelines, undertaking text.",          count: "8 documents",    photo: imgPhotos,   accent: B_NGO,    pastel: P_NGO    },
                { label: "Media Library",           desc: "NGO-scoped photos and assets. View-only.",          count: "64 items",       photo: imgVideos,   accent: KPI_LIME, pastel: P_NGO_MID },
                { label: "Feedback Templates",      desc: "Excel bulk upload template for large NGOs.",        count: "Download",       photo: imgStories,  accent: B_TEAL,   pastel: P_TEAL   },
                { label: "Grievance Redressal",     desc: "Raise a concern about a project or volunteer.",     count: submittedGrievances.length > 0 ? `${submittedGrievances.length} open` : "No open cases", photo: imgPhotos, accent: B_RED, pastel: P_RED },
                { label: "Help & Support",          desc: "Opens support modal. Chatbot always available.",    count: "24/7",           photo: imgEModule,  accent: B_BLUE,   pastel: P_BLUE   },
              ].map(r => (
                <ResourceCard key={r.label} {...r} onClick={() => {
                  if (r.label === "Grievance Redressal") setModal("grievance");
                  else if (r.label === "E-Module / Orientation") setShowOrientationModal(true);
                  else if (r.label === "NGO Project Guide") setModal("projectGuide");
                  else if (r.label === "Media Library") navigate("media");
                  else if (r.label === "Help & Support") setShowSupportModal(true);
                  else triggerToast(`Opening ${r.label}…`);
                }} />
              ))}
            </div>
          </div>

        </div>

        {/* ── RIGHT RAIL ── */}
        <div style={{ width: 148, flexShrink: 0, position: "sticky", top: 108, alignSelf: "flex-start" }}>
          {/* Section nav */}
          <div style={{ fontSize: 9.5, fontWeight: 700, letterSpacing: "1.8px", textTransform: "uppercase", color: "#0D1B3E", marginBottom: 12 }}>On this page</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 1, marginBottom: 28 }}>
            {[
              { id: "snapshot",     label: "Snapshot"     },
              { id: "activities",   label: "Activities"   },
              { id: "applications", label: "App. Queue"   },
              { id: "history",      label: "History"      },
              ...(isLeadPartner ? [{ id: "partnerngos", label: "Partner NGOs" }] : []),
              { id: "reports",      label: "Reports"      },
              { id: "resources",    label: "Resources"    },
            ].map(({ id, label }) => {
              const on = activeSection === id;
              return (
                <div key={id} onClick={() => scrollTo({ current: document.getElementById(id) } as any)} style={{ ...railLink(on), position: "relative" }}>
                  <div style={railLinkBar(on)} />
                  <span style={railLinkText(on)}>{label}</span>
                  {id === "applications" && <span style={{ ...notifDot, top: 6, right: 4 }} />}
                </div>
              );
            })}
          </div>
          {/* Quick links */}
          <div style={{ marginBottom: 20 }}>
            <div style={{ fontSize: 9.5, fontWeight: 700, letterSpacing: "1.8px", textTransform: "uppercase", color: "#0D1B3E", marginBottom: 12 }}>Quick Links</div>
            {[
              { label: "Edit Profile",     action: () => navigate("profile") },
              { label: "Add Co-ordinator", action: () => setModal("manageTeam") },
              { label: "Clone Previous",   action: () => setModal("cloneProject") },
              { label: "Raise Grievance",  action: () => setModal("grievance") },
            ].map(({ label, action }) => (
              <button key={label} onClick={action}
                style={{ display: "block", width: "100%", background: "none", border: "none", padding: "7px 10px", borderRadius: 8, fontSize: 12.5, color: "#8888a0", cursor: "pointer", textAlign: "left", fontFamily: "'DM Sans', ui-sans-serif, system-ui, sans-serif", transition: "background 0.15s, color 0.15s" }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = P_NGO; (e.currentTarget as HTMLElement).style.color = B_NGO; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "none"; (e.currentTarget as HTMLElement).style.color = "#8888a0"; }}>
                {label}
              </button>
            ))}
          </div>
          {/* Pending tasks */}
          <div style={{ background: "#fff", border: "1.5px solid #fde68a", borderRadius: 10, padding: "10px 12px", marginBottom: 10 }}>
            <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: "1px", textTransform: "uppercase", color: "#9a6500", marginBottom: 8 }}>Pending Tasks</div>
            {[
              { label: "Feedback due", detail: "2 projects", color: B_RED },
              { label: "Co-ord request", detail: "1 pending", color: B_NGO },
              { label: "Health update", detail: "Overdue", color: B_RED },
            ].map(({ label, detail, color }) => (
              <div key={label} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "5px 0", borderBottom: "1px solid #fef3c7" }}>
                <div style={{ fontSize: 11, color: "#555", fontWeight: 500 }}>{label}</div>
                <span style={{ fontSize: 10.5, fontWeight: 700, color }}>{detail}</span>
              </div>
            ))}
          </div>
          {/* Edition badge */}
          <div style={{ background: P_NGO, border: `1px solid ${B_NGO}40`, borderRadius: 10, padding: "10px 12px" }}>
            <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: "1px", textTransform: "uppercase", color: B_NGO, marginBottom: 6 }}>PE Edition 23</div>
            <div style={{ fontSize: 11, color: B_NGO, fontWeight: 600 }}>Applications open</div>
            <div style={{ fontSize: 11, color: "#365314", marginTop: 3 }}>Closes 29 Jan 2026</div>
          </div>
        </div>
      </div>

      {/* ═══════ MODALS ═══════ */}

      {/* Clone from previous */}
      <DrawerShell open={modal === "cloneProject"} onClose={() => setModal(null)} title="Clone from Previous Project" accentTag="Template">
        <div>
          <div style={{ background: P_BLUE, border: `1px solid ${B_BLUE}22`, borderRadius: 10, padding: "12px 14px", marginBottom: 18, fontSize: 12.5, color: B_BLUE, lineHeight: 1.5 }}>
            Select a past project to use as a template. Remember to update the outcome and impact sections for this new edition.
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {projects.filter((p: any) => ["Active","Closed","Under Review"].includes(p.status)).map((p: any) => (
              <div key={p.id} onClick={() => { setClonedFrom(p); setClonedProject({ title: p.title, isClone: true, sourceTitle: p.title }); setModal("addProject"); }}
                style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 14px", background: "#f8f9ff", border: "1px solid #e8e8f0", borderRadius: 10, cursor: "pointer" }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = B_NGO; e.currentTarget.style.background = P_NGO; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = "#e8e8f0"; e.currentTarget.style.background = "#f8f9ff"; }}>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 13.5, fontWeight: 600, color: ACCENT_NAVY }}>{p.title}</div>
                  <div style={{ fontSize: 11, color: "#888", marginTop: 2 }}>{p.volunteers ?? 0} volunteers matched</div>
                </div>
                <Badge status={p.status} />
                <Copy size={13} color="#aaa" />
              </div>
            ))}
          </div>
        </div>
      </DrawerShell>

      {/* Add project */}
      <DrawerShell open={modal === "addProject"} onClose={() => { setModal(null); setClonedFrom(null); }} title={clonedFrom ? `New Project (from "${clonedFrom.title}")` : "Add New Project"} accentTag={clonedFrom ? "Cloned" : "New"} width={620}>
        <AddProjectForm clonedFrom={clonedFrom} onClose={() => { setModal(null); setClonedFrom(null); }} onSubmit={() => { setModal(null); setClonedFrom(null); triggerToast("Project submitted for TSG Admin review. You'll be notified once approved."); }} />
      </DrawerShell>

      {/* View / edit projects */}
      <DrawerShell open={modal === "viewProjects"} onClose={() => setModal(null)} title="My Projects" subtitle={`${projects.length} projects this edition`}>
        <div>
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 14 }}>
            {["All","Active","Under Review","Draft","Closed"].map(f => (
              <span key={f} style={{ fontSize: 12, padding: "4px 11px", border: "1px solid #e0e0e8", borderRadius: 6, color: "#555", cursor: "pointer", fontWeight: 500 }}>{f}</span>
            ))}
          </div>
          {projects.map((p: any) => (
            <div key={p.id} style={{ display: "flex", alignItems: "center", gap: 12, padding: "11px 0", borderBottom: "1px solid #f0f0f8" }}>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13.5, fontWeight: 600, color: ACCENT_NAVY }}>{p.title}</div>
                <div style={{ fontSize: 11, color: "#888", marginTop: 2 }}>{p.volunteers ?? 0} matched · {p.applications ?? 0} applications</div>
              </div>
              <Badge status={p.status} />
              <button onClick={() => triggerToast("Opening project editor…")} style={{ background: "none", border: "none", cursor: "pointer", color: "#aaa", padding: 4 }}><Edit2 size={14} /></button>
            </div>
          ))}
          <button onClick={() => triggerToast("Downloading project export…")} style={{ marginTop: 14, display: "flex", alignItems: "center", gap: 6, fontSize: 12.5, fontWeight: 600, color: B_NGO, background: "none", border: "none", cursor: "pointer" }}>
            <Download size={13} /> Export Project Details (Excel)
          </button>
        </div>
      </DrawerShell>

      {/* Applicant detail */}
      <DrawerShell open={modal === "selectedApplicant"} onClose={() => setModal(null)} title="Volunteer Profile" accentTag={selectedApplicant ? `${selectedApplicant.matchPercentage}% Match` : ""}>
        {selectedApplicant && (
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 20 }}>
              <div style={{ width: 52, height: 52, borderRadius: "50%", background: P_NGO, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, fontWeight: 700, color: B_NGO, flexShrink: 0 }}>
                {selectedApplicant.name.split(" ").map((n: string) => n[0]).join("")}
              </div>
              <div>
                <div style={{ fontSize: 16, fontWeight: 700, color: ACCENT_NAVY }}>{selectedApplicant.name}</div>
                <div style={{ fontSize: 12, color: "#6b6b7a", marginTop: 2 }}>{selectedApplicant.city} · {selectedApplicant.availability}</div>
                {selectedApplicant.isReturning && <span style={{ background: P_YELLOW, color: "#9a6500", fontSize: 11, fontWeight: 700, padding: "2px 9px", borderRadius: 100, marginTop: 6, display: "inline-block" }}>Returning</span>}
              </div>
            </div>
            <div style={{ marginBottom: 14 }}>
              <div style={{ fontSize: 10.5, fontWeight: 700, color: "#aaaabc", textTransform: "uppercase", letterSpacing: "0.8px", marginBottom: 6 }}>Experience Summary</div>
              <div style={{ background: "#f8f9ff", border: "1px solid #e8e8f0", borderRadius: 9, padding: "12px 14px", fontSize: 13, color: "#444", lineHeight: 1.6 }}>{selectedApplicant.experience}</div>
            </div>
            <div style={{ marginBottom: 14 }}>
              <div style={{ fontSize: 10.5, fontWeight: 700, color: "#aaaabc", textTransform: "uppercase", letterSpacing: "0.8px", marginBottom: 6 }}>Skills</div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                {selectedApplicant.skills.map((s: string) => <span key={s} style={{ background: P_NGO, color: B_NGO, fontSize: 12, fontWeight: 600, padding: "3px 10px", borderRadius: 100 }}>{s}</span>)}
              </div>
            </div>
            <div style={{ marginBottom: 20 }}>
              <div style={{ fontSize: 10.5, fontWeight: 700, color: "#aaaabc", textTransform: "uppercase", letterSpacing: "0.8px", marginBottom: 6 }}>Languages</div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                {selectedApplicant.languages.map((l: string) => <span key={l} style={{ background: "#f0f0f4", color: "#555", fontSize: 12, fontWeight: 600, padding: "3px 10px", borderRadius: 100 }}>{l}</span>)}
              </div>
            </div>
            {selectedApplicant.status === "Pending" && (
              <div style={{ display: "flex", gap: 10 }}>
                <button onClick={() => handleReject(selectedApplicant.id)} style={{ flex: 1, padding: "11px", background: P_RED, border: `1px solid ${B_RED}30`, borderRadius: 9, fontSize: 13.5, fontWeight: 700, color: B_RED, cursor: "pointer" }}>Reject</button>
                <button onClick={() => handleAccept(selectedApplicant.id)} style={{ flex: 1, padding: "11px", background: ACCENT_NAVY, border: "none", borderRadius: 9, fontSize: 13.5, fontWeight: 700, color: "#fff", cursor: "pointer" }}>Accept Volunteer</button>
              </div>
            )}
          </div>
        )}
      </DrawerShell>

      {/* Submit feedback */}
      <DrawerShell open={modal === "feedback"} onClose={() => { setModal(null); setFeedbackProject(null); }} title="Submit Volunteer Feedback">
        {!feedbackProject ? (
          <div>
            <div style={{ marginBottom: 14, fontSize: 13, color: "#6b6b7a" }}>Select a project to submit feedback for:</div>
            {projects.filter((p: any) => ["Active","Closed"].includes(p.status)).map((p: any) => (
              <button key={p.id} onClick={() => setFeedbackProject(p)}
                style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 14px", background: "#f8f9ff", border: "1px solid #e8e8f0", borderRadius: 10, cursor: "pointer", textAlign: "left", width: "100%", marginBottom: 8 }}>
                <MessageSquare size={16} color={B_NGO} />
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 13.5, fontWeight: 600, color: ACCENT_NAVY }}>{p.title}</div>
                  <div style={{ fontSize: 11, color: "#888" }}>{p.volunteers ?? 0} volunteers · {p.status}</div>
                </div>
                <ChevronRight size={14} color="#aaa" />
              </button>
            ))}
          </div>
        ) : (
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16, padding: "8px 12px", background: P_NGO, borderRadius: 8 }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: B_NGO, flex: 1 }}>{feedbackProject.title}</div>
              <button onClick={() => setFeedbackProject(null)} style={{ fontSize: 11, color: B_NGO, background: "none", border: "none", cursor: "pointer" }}>← Change</button>
            </div>
            <FeedbackForm onClose={() => { setModal(null); setFeedbackProject(null); }} onSubmit={() => { setModal(null); setFeedbackProject(null); triggerToast("Feedback submitted. Certificate process begins once volunteer also submits."); }} />
          </div>
        )}
      </DrawerShell>

      {/* Health update */}
      <DrawerShell open={modal === "healthUpdate"} onClose={() => setModal(null)} title="Project Health Update">
        <div>
          <div style={{ marginBottom: 12 }}><Label>Project</Label><FSelect value="" onChange={() => {}} options={["Select project…", ...projects.filter((p: any) => p.status === "Active").map((p: any) => p.title)]} /></div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 12 }}>
            <div><Label>Month</Label><FSelect value="April 2026" onChange={() => {}} options={["April 2026","March 2026","February 2026","January 2026"]} /></div>
            <div><Label>Status</Label><FSelect value="Healthy" onChange={() => {}} options={["Healthy","At Risk","Drop Out","Paused","Extended","Close Early"]} /></div>
          </div>
          <div style={{ marginBottom: 18 }}><Label>Notes (optional)</Label>
            <textarea rows={3} style={{ width: "100%", border: "1.5px solid #e0e0e8", borderRadius: 8, padding: "9px 12px", fontSize: 13.5, color: ACCENT_NAVY, outline: "none", resize: "none", boxSizing: "border-box" }} placeholder="Context for this update…" />
          </div>
          <div style={{ display: "flex", gap: 10 }}>
            <button onClick={() => setModal(null)} style={{ flex: 1, padding: "10px", background: "#f8f8fc", border: "1px solid #e0e0e8", borderRadius: 9, fontSize: 13.5, fontWeight: 600, color: "#6b6b7a", cursor: "pointer" }}>Cancel</button>
            <button onClick={() => { setModal(null); triggerToast("Health update submitted. TSG Admin notified."); }} style={{ flex: 1, padding: "10px", background: B_NGO, border: "none", borderRadius: 9, fontSize: 13.5, fontWeight: 700, color: "#fff", cursor: "pointer" }}>Submit Update</button>
          </div>
        </div>
      </DrawerShell>

      {/* Manage team / co-ordinators — same pattern as SPOC directory */}
      <DrawerShell open={modal === "manageTeam"} onClose={() => setModal(null)} title="Manage Team / Co-ordinators">
        <div>
          {coordinators.map((c: any) => (
            <div key={c.id} style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 0", borderBottom: "1px solid #f0f0f8" }}>
              <div style={{ width: 36, height: 36, borderRadius: "50%", background: P_NGO, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 700, color: B_NGO, flexShrink: 0 }}>
                {c.name.split(" ").map((n: string) => n[0]).join("")}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13.5, fontWeight: 600, color: ACCENT_NAVY }}>{c.name}</div>
                <div style={{ fontSize: 11, color: "#888" }}>{c.role} · {c.email}</div>
              </div>
              <button onClick={() => triggerToast("Opening edit form…")} style={{ background: "none", border: "none", cursor: "pointer", color: "#aaa", padding: 4 }}><Edit2 size={14} /></button>
              <button onClick={() => { setCoordinators((prev: any[]) => prev.filter((x: any) => x.id !== c.id)); triggerToast("Co-ordinator removed."); }} style={{ background: "none", border: "none", cursor: "pointer", color: B_RED, padding: 4 }}><Trash2 size={14} /></button>
            </div>
          ))}

          {/* Add co-ordinator form — same inline-form pattern as SPOC directory */}
          <div style={{ marginTop: 20, background: "#f8f9ff", border: `1.5px solid ${B_NGO}30`, borderRadius: 12, padding: "16px" }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: ACCENT_NAVY, marginBottom: 14 }}>Add Co-ordinator</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <div><Label required>Name</Label><FInput value={addCoordName} onChange={setAddCoordName} placeholder="Full name" /></div>
              <div><Label required>Email</Label><FInput value={addCoordEmail} onChange={setAddCoordEmail} type="email" placeholder="coordinator@ngo.org" /></div>
              <div><Label>Role</Label><FSelect value={addCoordRole} onChange={setAddCoordRole} options={["Project Coordinator","Programme Manager","Field Officer","Communication Lead","Data Analyst"]} /></div>
            </div>
            <button onClick={() => {
              if (!addCoordName || !addCoordEmail) { triggerToast("Please fill name and email."); return; }
              setCoordinators((prev: any[]) => [...prev, { id: Date.now(), name: addCoordName, email: addCoordEmail, role: addCoordRole }]);
              setAddCoordName(""); setAddCoordEmail(""); setAddCoordRole("Project Coordinator");
              triggerToast("Co-ordinator added successfully.");
            }} style={{ marginTop: 14, width: "100%", padding: "10px", background: B_NGO, border: "none", borderRadius: 9, fontSize: 13.5, fontWeight: 700, color: "#fff", cursor: "pointer" }}>
              Add Co-ordinator
            </button>
          </div>
          <div style={{ fontSize: 11, color: "#aaaabc", marginTop: 10, fontStyle: "italic" }}>Co-ordinators can edit assigned projects before Admin approval. For access changes, contact TSG Admin.</div>
        </div>
      </DrawerShell>

      {/* Grievance */}
      <DrawerShell open={modal === "grievance"} onClose={() => setModal(null)} title="Raise a Grievance">
        <div>
          <div style={{ marginBottom: 12 }}><Label>Project</Label><FSelect value={grievanceForm.projectId} onChange={v => setGrievanceForm(f => ({ ...f, projectId: v }))} options={["Select a project…", ...projects.filter((p: any) => p.status === "Active").map((p: any) => p.title)]} /></div>
          <div style={{ marginBottom: 12 }}><Label>Category</Label><FSelect value={grievanceForm.category} onChange={v => setGrievanceForm(f => ({ ...f, category: v }))} options={["Select category…","Volunteer conduct","Communication breakdown","Project scope disagreement","Scheduling conflict","Platform / technical issue","Other"]} /></div>
          <div style={{ marginBottom: 18 }}><Label>Description</Label>
            <textarea value={grievanceForm.description} onChange={e => setGrievanceForm(f => ({ ...f, description: e.target.value }))} placeholder="Describe the issue clearly. TSG Admin acknowledges within 2 working days." rows={4}
              style={{ width: "100%", border: "1.5px solid #e0e0e8", borderRadius: 8, padding: "9px 12px", fontSize: 13.5, color: ACCENT_NAVY, outline: "none", resize: "none", boxSizing: "border-box" }} />
          </div>
          <div style={{ fontSize: 11.5, color: "#0D1B3E", marginBottom: 12, fontStyle: "italic" }}>Only 1 open grievance per active project at a time. Auto-acknowledgement sent on submission.</div>
          <div style={{ display: "flex", gap: 10 }}>
            <button onClick={() => setModal(null)} style={{ flex: 1, padding: "10px", background: "#f8f8fc", border: "1px solid #e0e0e8", borderRadius: 9, fontSize: 13.5, fontWeight: 600, color: "#6b6b7a", cursor: "pointer" }}>Cancel</button>
            <button onClick={() => {
              if (!grievanceForm.category || !grievanceForm.description || !grievanceForm.projectId) { triggerToast("Please fill all fields."); return; }
              setSubmittedGrievances(prev => [...prev, { ...grievanceForm, id: Date.now(), status: "Open", date: new Date().toLocaleDateString() }]);
              setGrievanceForm({ projectId: "", category: "", description: "" });
              setModal(null);
              triggerToast("Grievance submitted. TSG Admin notified. Auto-acknowledgement sent to your email.");
            }} style={{ flex: 1, padding: "10px", background: B_RED, border: "none", borderRadius: 9, fontSize: 13.5, fontWeight: 700, color: "#fff", cursor: "pointer" }}>Submit Grievance</button>
          </div>
        </div>
      </DrawerShell>

      {/* NGO Project Guide */}
      <DrawerShell open={modal === "projectGuide"} onClose={() => setModal(null)} title="NGO Project Guide" accentTag="Resources">
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {["Project Brief Template","Volunteer Undertaking Form","M&E Reporting Guidelines","Photo & Media Consent Form","Code of Conduct — NGO","ProEngage Edition Calendar","Feedback Submission Guide","TSG Contact Directory"].map(name => (
            <div key={name} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 14px", background: "#f8f9ff", borderRadius: 9, border: "1px solid #e8e8f0" }}>
              <span style={{ fontSize: 13, fontWeight: 600, color: ACCENT_NAVY }}>📄 {name}</span>
              <button onClick={() => triggerToast(`Downloading ${name}...`)} style={{ fontSize: 12, fontWeight: 700, color: B_NGO, background: P_NGO, border: "none", borderRadius: 7, padding: "5px 14px", cursor: "pointer" }}>Download</button>
            </div>
          ))}
        </div>
      </DrawerShell>

      {/* Refer an NGO */}
      <DrawerShell open={modal === "referNGO"} onClose={() => setModal(null)} title="Refer an NGO" accentTag="Refer" subtitle="Help grow the ProEngage partner network">
        <div>
          <div style={{ background: P_NGO, border: `1px solid ${B_NGO}30`, borderRadius: 10, padding: "12px 14px", marginBottom: 18, fontSize: 12.5, color: ACCENT_NAVY, lineHeight: 1.5 }}>
            Know a like-minded NGO? Fill in their details and we'll reach out on your behalf.
          </div>
          <div style={{ marginBottom: 12 }}><Label required>NGO Name</Label><FInput value="" placeholder="e.g. Akanksha Foundation" /></div>
          <div style={{ marginBottom: 12 }}><Label required>Primary Contact Name</Label><FInput value="" placeholder="Contact person's name" /></div>
          <div style={{ marginBottom: 12 }}><Label required>Contact Email</Label><FInput value="" type="email" placeholder="contact@ngo.org" /></div>
          <div style={{ marginBottom: 12 }}><Label>Contact Phone</Label><FInput value="" placeholder="+91 98XXXXXXXX" /></div>
          <div style={{ marginBottom: 12 }}><Label>Focus Area</Label><FSelect value="Select focus area" onChange={() => {}} options={["Select focus area","Education","Health","Environment","Livelihood","Disaster Relief","Women Empowerment","Other"]} /></div>
          <div style={{ marginBottom: 18 }}><Label>Why are you recommending them?</Label>
            <textarea placeholder="What makes this NGO a good fit for ProEngage?" rows={3} style={{ width: "100%", border: "1.5px solid #e0e0e8", borderRadius: 8, padding: "9px 12px", fontSize: 13.5, color: ACCENT_NAVY, outline: "none", resize: "none", boxSizing: "border-box" }} />
          </div>
          <div style={{ display: "flex", gap: 10 }}>
            <button onClick={() => setModal(null)} style={{ flex: 1, padding: "10px", background: "#f8f8fc", border: "1px solid #e0e0e8", borderRadius: 9, fontSize: 13.5, fontWeight: 600, color: "#6b6b7a", cursor: "pointer" }}>Cancel</button>
            <button onClick={() => { setModal(null); triggerToast("Referral submitted! TSG Admin will reach out within 3 working days."); }} style={{ flex: 1, padding: "10px", background: B_NGO, border: "none", borderRadius: 9, fontSize: 13.5, fontWeight: 700, color: "#fff", cursor: "pointer" }}>Submit Referral</button>
          </div>
        </div>
      </DrawerShell>

      {/* Share story */}
      <DrawerShell open={modal === "shareStory"} onClose={() => setModal(null)} title="Share Your Story" accentTag="Story" subtitle="Post a project highlight or impact experience">
        <div>
          <div style={{ background: P_NGO_MID, border: `1px solid ${B_NGO}25`, borderRadius: 10, padding: "12px 14px", marginBottom: 18, fontSize: 12.5, color: ACCENT_NAVY, lineHeight: 1.5 }}>
            Stories go to TSG Admin for moderation before being published. Approved stories may appear on the TVW Vibe wall and TataEngage homepage.
          </div>
          <div style={{ marginBottom: 12 }}><Label required>Story Type</Label><FSelect value="Select type" onChange={() => {}} options={["Select type","Project Highlight","Impact Story","Volunteer Spotlight","Community Change","Partnership Achievement"]} /></div>
          <div style={{ marginBottom: 12 }}><Label required>Headline</Label><FInput value="" placeholder="A short, compelling title for your story" /></div>
          <div style={{ marginBottom: 12 }}><Label required>Your Story</Label>
            <textarea placeholder="Describe the experience, impact, or moment you want to share…" rows={5} style={{ width: "100%", border: "1.5px solid #e0e0e8", borderRadius: 8, padding: "9px 12px", fontSize: 13.5, color: ACCENT_NAVY, outline: "none", resize: "none", boxSizing: "border-box" }} />
          </div>
          <div style={{ marginBottom: 12 }}><Label>Link to a Project (optional)</Label><FSelect value="Select project" onChange={() => {}} options={["Select project", ...(ngoData.projects ?? []).map((p: any) => p.title)]} /></div>
          <div style={{ marginBottom: 18 }}>
            <Label>Add Image (optional)</Label>
            <div style={{ border: "1.5px dashed #e0e0e8", borderRadius: 8, padding: "18px", textAlign: "center", cursor: "pointer", color: "#aaa", fontSize: 13 }} onClick={() => triggerToast("File upload simulated.")}>📎 Click to attach a photo</div>
          </div>
          <div style={{ display: "flex", gap: 10 }}>
            <button onClick={() => setModal(null)} style={{ flex: 1, padding: "10px", background: "#f8f8fc", border: "1px solid #e0e0e8", borderRadius: 9, fontSize: 13.5, fontWeight: 600, color: "#6b6b7a", cursor: "pointer" }}>Cancel</button>
            <button onClick={() => { setModal(null); triggerToast("Story submitted for moderation. TSG Admin will review within 2 working days."); }} style={{ flex: 1, padding: "10px", background: B_NGO, border: "none", borderRadius: 9, fontSize: 13.5, fontWeight: 700, color: "#fff", cursor: "pointer" }}>Submit Story</button>
          </div>
        </div>
      </DrawerShell>

    </div>
  );
};

export default NGODashboardView;
