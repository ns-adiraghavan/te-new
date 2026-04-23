import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  IS_PE_SEASON,
  ROHAN_DESAI, ROHAN_DESAI_VOLUNTEER, ANJALI_GUPTA_REGIONAL,
  SPOC_DIRECTORY, PENDING_APPROVALS_DATA, TCS_TVW_EVENTS,
  PROENGAGE_PIPELINE, AT_RISK_VOLUNTEERS,
  COMPANY_LEADERBOARD, VOLUNTEER_CERTIFICATES, FEEDBACK_MONITOR_DATA,
  OPEN_PROENGAGE_PROJECTS,
} from "@/data/mockData";
import { useAppContext } from "@/context/AppContext";
import { useAppNavigate } from "@/hooks/useAppNavigate";
import badgeVeteran    from "@/assets/badges/veteran.svg";
import badgeAmbassador from "@/assets/badges/ambassador.svg";
import badgeLead       from "@/assets/badges/lead.svg";
import badgeChampion   from "@/assets/badges/champion.png";
import imgPhotos  from "@/assets/tatabball.jpg";
import imgVideos  from "@/assets/tata_power.JPG";
import imgStories from "@/assets/trent.jpg";
import imgEvents  from "@/assets/IHCL.jpg";
import imgEModule from "@/assets/Tata_international.jpeg";

const B_YELLOW    = "#F79425";
const B_TEAL      = "#13BBB4";
const B_RED       = "#D84926";
const B_BLUE      = "#135EA9";
const B_PRIMARY   = "#15B8E8";   // primary interactive
const B_VOL       = "#4376BB";   // volunteer mode accent
const B_SPOC_TOG  = "#135EA9";   // SPOC corner toggle accent
const ACCENT_NAVY = "#0D1B3E";

const P_YELLOW    = "#FEF6E4";
const P_TEAL      = "#E6F8F5";
const P_BLUE      = "#EBF4FF";
const P_RED       = "#FFF0EE";
const P_VOL       = "#EBF1FA";   // volunteer accent pastel
const P_SPOC      = "#E8EEF7";   // SPOC accent pastel

const KPI_PINK       = "#F4838A";
const KPI_YELLOW     = "#F79425";
const KPI_PROENGAGE  = "#1A6B3C";
const KPI_TVW        = "#3B7ABD";
const KPI_NUMBERS    = "#A8C94A";
const KPI_TEAL       = "#13BBB4";
const KPI_CVP        = "#F79425";
const B_LIME_DARK    = "#365314";
const B_TEAL_DARK    = "#0F766E";
const P_TEAL_DARK    = "#D1FAE5";

const IS_TVW_SEASON = true;

const SPOC_VOL_HISTORY_PROJECTS = [
  { id: "sp0", title: "Financial Literacy Programme",     ngo: "Udayan Care",        edition: "ProEngage 2025 | 02", year: "2025", hours: 12, outcome: "Project in progress. Initial discovery sessions completed with the programme team.", skills: ["Finance","Coaching"], cert: false, projectStatus: "Applied"   },
  { id: "sp1", title: "NGO Digitisation Support",         ngo: "Saksham Foundation", edition: "ProEngage 2025 | 01", year: "2025", hours: 42, outcome: "Successfully digitised field records for 600+ beneficiaries. Certificate received.",        skills: ["IT","Operations"],   cert: true,  projectStatus: "Completed" },
  { id: "sp2", title: "Volunteer Coordination System",    ngo: "Teach For India",    edition: "ProEngage 2024 | 02", year: "2024", hours: 28, outcome: "Built a tracking system used by 15 programme managers across India.",                         skills: ["Strategy","IT"],     cert: true,  projectStatus: "Completed" },
  { id: "sp3", title: "Annual Report Drafting",           ngo: "Chezuba",            edition: "ProEngage 2023 | 02", year: "2023", hours: 20, outcome: "Annual report drafted and submitted to Chezuba for FY2022-23.",                               skills: ["Operations"],        cert: false, projectStatus: "Completed" },
  { id: "sp4", title: "Strategic Roadmap for Skills NGO", ngo: "Pratham",            edition: "ProEngage 2022 | 01", year: "2022", hours: 36, outcome: "3-year strategic roadmap presented to Pratham leadership.",                                   skills: ["Strategy"],          cert: false, projectStatus: "Completed" },
];

const SPOC_VOL_APPLICATIONS = [
  { id: "sa0", project: "Financial Literacy Programme",     edition: "ProEngage 2025 | 02", year: "2025", status: "Applied",   date: "Apr 2026", type: "ProEngage", ngo: "Udayan Care",        skillArea: "Finance",        timeline: [{ label: "Applied", date: "Apr 2026", done: true }, { label: "Under Review", date: "Apr 2026", done: false }, { label: "Selected", date: "TBD", done: false }, { label: "Project Complete", date: "TBD", done: false }] },
  { id: "sa1", project: "NGO Digitisation Support",         edition: "ProEngage 2025 | 01", year: "2025", status: "Completed", date: "2025",     type: "ProEngage", ngo: "Saksham Foundation", skillArea: "IT / Operations", timeline: [{ label: "Applied", date: "2025", done: true }, { label: "Under Review", date: "2025", done: true }, { label: "Selected", date: "2025", done: true }, { label: "Project Complete", date: "2025", done: true }] },
  { id: "sa2", project: "Volunteer Coordination System",    edition: "ProEngage 2024 | 02", year: "2024", status: "Completed", date: "2024",     type: "ProEngage", ngo: "Teach For India",    skillArea: "Strategy / IT",  timeline: [{ label: "Applied", date: "2024", done: true }, { label: "Under Review", date: "2024", done: true }, { label: "Selected", date: "2024", done: true }, { label: "Project Complete", date: "2024", done: true }] },
  { id: "sa3", project: "Annual Report Drafting",           edition: "ProEngage 2023 | 02", year: "2023", status: "Completed", date: "2023",     type: "ProEngage", ngo: "Chezuba",            skillArea: "Operations",     timeline: [{ label: "Applied", date: "2023", done: true }, { label: "Under Review", date: "2023", done: true }, { label: "Selected", date: "2023", done: true }, { label: "Project Complete", date: "2023", done: true }] },
  { id: "sa4", project: "Strategic Roadmap for Skills NGO", edition: "ProEngage 2022 | 01", year: "2022", status: "Completed", date: "2022",     type: "ProEngage", ngo: "Pratham",            skillArea: "Strategy",       timeline: [{ label: "Applied", date: "2022", done: true }, { label: "Under Review", date: "2022", done: true }, { label: "Selected", date: "2022", done: true }, { label: "Project Complete", date: "2022", done: true }] },
];

const SPOC_VOL_FEEDBACK = [
  { id: "sf1", projectId: "sp1", title: "NGO Digitisation Support",      ngo: "Saksham Foundation", edition: "ProEngage 2025 | 01", year: "2025", completed: true, months: 3, hoursWeek: 3, nps: 9,  supportRatings: [4,5,4], attrRatings: [4,3,4,5,4], suggestions: "" },
  { id: "sf2", projectId: "sp2", title: "Volunteer Coordination System", ngo: "Teach For India",    edition: "ProEngage 2024 | 02", year: "2024", completed: true, months: 2, hoursWeek: 3, nps: 10, supportRatings: [5,4,5], attrRatings: [5,4,4,5,4], suggestions: "" },
];

const PE_EDITIONS_SPOC = ["ProEngage 2025 | 02","ProEngage 2025 | 01","ProEngage 2024 | 02","ProEngage 2024 | 01","ProEngage 2023 | 02","ProEngage 2022 | 01"];

const DIY_ACTIVITIES = [
  { id: "d1", title: "Create Awareness on Social Entitlements", desc: "TCS' 'Each One Empowers One' initiative. Help citizens understand key entitlements and empower semi-literate individuals with legal and social literacy.", theme: "Citizen Empowerment", org: "TCS Empowers", accentColor: "#13BBB4", pastel: "#E6F8F5" },
  { id: "d2", title: "Donate Blood, Save Lives", desc: "By choosing to donate blood you're not just giving blood — you're giving hope and a chance at life. Sign up at your nearest Tata blood drive.", theme: "Health", org: "SDG Goal 3", accentColor: "#65A30D", pastel: "#F7FEE7" },
];

const TVW_OPPORTUNITIES_SPOC = [
  { id: "t1", title: "Tree Plantation Drive — Aarey Forest",         company: "Tata Motors", date: "18 Apr 2026", mode: "In-person · Mumbai", theme: "Environment", accentColor: "#65A30D", pastel: "#F7FEE7" },
  { id: "t2", title: "Digital Literacy Workshop for Senior Citizens", company: "TCS",         date: "25 Apr 2026", mode: "Online · Pan-India", theme: "Education",   accentColor: "#135EA9", pastel: "#EBF4FF" },
];

const PE_OPPORTUNITIES_SPOC = [
  { id: "p1", title: "Build a Fundraising Dashboard for Child Rights NGO", ngo: "Butterflies India",     skillArea: "Finance / Data",   duration: "3 months", mode: "Online",          closes: "15 Jul 2025", applicants: 14, match: 94, accentColor: "#135EA9", pastel: "#EBF4FF" },
  { id: "p2", title: "Marketing Strategy for Women's Skilling Programme",  ngo: "Stree Mukti Sanghatna", skillArea: "Marketing",        duration: "4 months", mode: "Hybrid · Mumbai", closes: "20 Jul 2025", applicants: 9,  match: 89, accentColor: "#65A30D", pastel: "#F7FEE7" },
  { id: "p3", title: "Product Roadmap for Disability Employment Platform", ngo: "Samarthanam Trust",     skillArea: "Product Strategy", duration: "6 months", mode: "Online",          closes: "30 Jul 2025", applicants: 6,  match: 97, accentColor: "#13BBB4", pastel: "#E6F8F5" },
];

const notifDot: React.CSSProperties = {
  position: "absolute", top: -3, right: -6, width: 8, height: 8,
  borderRadius: "50%", background: B_RED, boxShadow: "0 0 0 2px white",
};

const card: React.CSSProperties = {
  background: "#fff", border: "1px solid #e8e8f0", borderRadius: 14, padding: "20px 22px",
};
const spocCard: React.CSSProperties = {
  background: "#fff", border: "1.5px solid #c8c6f0", borderRadius: 14, padding: "20px 22px",
};

const VOL_SECTIONS  = [
  { id: "vol-snapshot",   label: "Snapshot"   },
  { id: "vol-activities", label: "Activities" },
  { id: "vol-history",    label: "History"    },
  { id: "vol-resources",  label: "Resources"  },
];
const SPOC_SECTIONS = [
  { id: "spoc-kpis",      label: "Impact KPIs"  },
  { id: "spoc-tvw",       label: "TVW"           },
  { id: "spoc-oversight", label: "Oversight"     },
  { id: "spoc-mgt",       label: "SPOC Mgmt"     },
  { id: "spoc-resources", label: "Resources"     },
];

function useCountUp(target: number, duration = 1200, start = false) {
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

function StatTile({ value, suffix = "", label, accentColor, delay, started, tooltip }: {
  value: number; suffix?: string; label: string; accentColor: string;
  delay: number; started: boolean; tooltip?: string;
}) {
  const [go, setGo] = useState(false);
  const [showTip, setShowTip] = useState(false);
  useEffect(() => {
    if (started) { const t = setTimeout(() => setGo(true), delay); return () => clearTimeout(t); }
  }, [started, delay]);
  const n = useCountUp(value, 1100, go);
  return (
    <div
      style={{ background: accentColor, borderRadius: 18, padding: "22px 14px 18px", textAlign: "center",
        boxShadow: `0 4px 20px ${accentColor}33`, transition: "transform 0.2s, box-shadow 0.2s",
        cursor: "default", position: "relative", overflow: "hidden" }}
      onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = "translateY(-3px)"; (e.currentTarget as HTMLElement).style.boxShadow = `0 8px 28px ${accentColor}44`; setShowTip(true); }}
      onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = "translateY(0)"; (e.currentTarget as HTMLElement).style.boxShadow = `0 4px 20px ${accentColor}33`; setShowTip(false); }}
    >
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 1.4, background: "rgba(255,255,255,0.35)" }} />
      <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 38, fontWeight: 900, lineHeight: 1, letterSpacing: "-2px", color: "#ffffff", position: "relative", zIndex: 1 }}>
        {n}{suffix}
      </div>
      <div style={{ fontSize: 10, fontWeight: 700, color: "rgba(255,255,255,0.85)", marginTop: 10, textTransform: "uppercase", letterSpacing: "1px", lineHeight: 1.3 }}>{label}</div>
      {showTip && tooltip && (
        <div style={{ position: "absolute", bottom: "calc(100% + 8px)", left: "50%", transform: "translateX(-50%)", background: ACCENT_NAVY, color: "rgba(255,255,255,0.88)", fontSize: 12, lineHeight: 1.5, padding: "10px 14px", borderRadius: 9, width: 200, zIndex: 50, pointerEvents: "none", boxShadow: "0 4px 20px rgba(13,27,62,0.2)", textAlign: "left", fontWeight: 400 }}>
          {tooltip}
          <div style={{ position: "absolute", bottom: -5, left: "50%", transform: "translateX(-50%)", width: 10, height: 10, background: ACCENT_NAVY, clipPath: "polygon(0 0, 100% 0, 50% 100%)" }} />
        </div>
      )}
    </div>
  );
}

function Slicers({ options, active, onChange, accentColor = B_BLUE, notifications }: {
  options: { id: string; label: string }[]; active: string; onChange: (id: string) => void;
  accentColor?: string; notifications?: Record<string, boolean>;
}) {
  return (
    <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 22 }}>
      {options.map(o => (
        <button key={o.id} onClick={() => onChange(o.id)} style={{ position: "relative", display: "inline-flex", padding: "6px 16px", borderRadius: 100, border: `1.5px solid ${active === o.id ? accentColor : "#dddde8"}`, background: active === o.id ? accentColor : "transparent", color: active === o.id ? "#fff" : "#666", fontSize: 13, fontWeight: active === o.id ? 600 : 400, cursor: "pointer", transition: "all 0.15s", fontFamily: "'DM Sans', sans-serif" }}>
          {o.label}
          {notifications?.[o.id] && <span style={notifDot} />}
        </button>
      ))}
    </div>
  );
}

function SectionHeading({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <div style={{ marginBottom: 24 }}>
      <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "1.8px", textTransform: "uppercase", color: "#aaaabc", marginBottom: 5 }}>{eyebrow}</div>
      <h2 style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 21, fontWeight: 900, color: ACCENT_NAVY, margin: 0, letterSpacing: -0.3 }}>{title}</h2>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const map: Record<string, [string, string, string]> = {
    "Active":            ["#F0FDF4", "#16A34A", "Active"],
    "Matched":           ["#F0FDF4", "#16A34A", "Matched"],
    "Applied":           [P_TEAL,    B_TEAL,    "Applied"],
    "Completed":         [P_BLUE,    B_BLUE,    "Completed"],
    "Dropped":           [P_RED,     B_RED,     "Dropped Out"],
    "Pending":           [P_YELLOW,  "#9a6500", "Pending"],
    "Approved":          ["#F0FDF4", "#16A34A", "Approved"],
    "Inactive":          ["#f0f0f4", "#888",    "Inactive"],
    "Live":              [P_VOL,     B_VOL,     "Live"],
    "Upcoming":          [P_BLUE,    B_BLUE,    "Upcoming"],
    "Generated":         ["#F0FDF4", "#16A34A", "Generated"],
    "Pending Feedback":  [P_YELLOW,  "#9a6500", "Pending Feedback"],
  };
  const [bg, color, label] = map[status] ?? ["#f0f0f0", "#555", status];
  return <span style={{ background: bg, color, fontSize: 11, fontWeight: 700, padding: "3px 10px", borderRadius: 100, letterSpacing: "0.3px", whiteSpace: "nowrap" }}>{label}</span>;
}

function CollapsiblePanel({ title, eyebrow, defaultOpen = false, accentColor = B_VOL, badge, children }: {
  title: string; eyebrow?: string; defaultOpen?: boolean; accentColor?: string; badge?: string | number; children: React.ReactNode;
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div style={{ ...spocCard, padding: 0, overflow: "hidden", marginBottom: 12 }}>
      <div onClick={() => setOpen(x => !x)} style={{ display: "flex", alignItems: "center", gap: 12, padding: "16px 20px", cursor: "pointer", userSelect: "none", background: open ? "#fafafa" : "#fff", transition: "background 0.15s" }}>
        <div style={{ width: 6, height: 6, borderRadius: "50%", background: accentColor, flexShrink: 0 }} />
        <div style={{ flex: 1 }}>
          {eyebrow && <div style={{ fontSize: 9.5, fontWeight: 700, letterSpacing: "1.5px", textTransform: "uppercase", color: "#aaaabc", marginBottom: 2 }}>{eyebrow}</div>}
          <div style={{ fontSize: 14, fontWeight: 700, color: ACCENT_NAVY }}>{title}</div>
        </div>
        {badge !== undefined && (
          <span style={{ background: accentColor, color: "#fff", fontSize: 11, fontWeight: 700, padding: "2px 9px", borderRadius: 100, marginRight: 6 }}>{badge}</span>
        )}
        <span style={{ fontSize: 18, color: "#dddde8", transform: open ? "rotate(90deg)" : "rotate(0deg)", transition: "transform 0.2s", flexShrink: 0 }}>›</span>
      </div>
      {open && <div style={{ padding: "0 20px 20px", borderTop: "1px solid #e8e8f0" }}>{children}</div>}
    </div>
  );
}

function DrawerShell({ open, onClose, title, subtitle, accentTag, accentColor, children }: {
  open: boolean; onClose: () => void; title: string; subtitle?: string; accentTag?: string; accentColor?: string; children: React.ReactNode;
}) {
  useEffect(() => {
    const h = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", h);
    return () => document.removeEventListener("keydown", h);
  }, [onClose]);
  return (
    <>
      <div onClick={onClose} style={{ position: "fixed", inset: 0, background: "rgba(13,27,62,0.45)", zIndex: 200, opacity: open ? 1 : 0, pointerEvents: open ? "auto" : "none", transition: "opacity 0.22s", backdropFilter: "blur(2px)" }} />
      <div style={{ position: "fixed", top: "50%", left: "50%", transform: open ? "translate(-50%, -50%) scale(1)" : "translate(-50%, -48%) scale(0.97)", transition: "transform 0.25s cubic-bezier(0.4,0,0.2,1), opacity 0.25s", opacity: open ? 1 : 0, pointerEvents: open ? "auto" : "none", width: 560, maxWidth: "calc(100vw - 40px)", maxHeight: "calc(100vh - 80px)", background: "#fff", borderRadius: 16, zIndex: 201, boxShadow: "0 24px 64px rgba(13,27,62,0.22)", display: "flex", flexDirection: "column", fontFamily: "'DM Sans', sans-serif", overflowY: "auto" }}>
        <div style={{ background: accentColor || ACCENT_NAVY, padding: "24px 28px", borderRadius: "16px 16px 0 0", flexShrink: 0 }}>
          <button onClick={onClose} style={{ background: "rgba(255,255,255,0.18)", border: "none", borderRadius: 7, color: "rgba(255,255,255,0.95)", fontSize: 13, fontWeight: 500, padding: "5px 12px", cursor: "pointer", marginBottom: 16 }}>← Close</button>
          {accentTag && <div style={{ display: "inline-block", background: "rgba(255,255,255,0.18)", border: "1px solid rgba(255,255,255,0.3)", borderRadius: 100, padding: "3px 10px", fontSize: 10.5, fontWeight: 700, color: "#fff", letterSpacing: "0.6px", textTransform: "uppercase", marginBottom: 10 }}>{accentTag}</div>}
          <div style={{ fontSize: 17, fontWeight: 700, color: "#fff", lineHeight: 1.3 }}>{title}</div>
          {subtitle && <div style={{ fontSize: 12.5, color: "rgba(255,255,255,0.7)", marginTop: 5 }}>{subtitle}</div>}
        </div>
        <div style={{ flex: 1, overflowY: "auto" }}>{children}</div>
      </div>
    </>
  );
}

function TVWRegDrawer({ event, onClose, triggerToast }: { event: any; onClose: () => void; triggerToast: (msg: string) => void }) {
  const [confirmed, setConfirmed] = useState(false);
  const reset = () => { onClose(); setConfirmed(false); };
  return (
    <DrawerShell open={!!event} onClose={reset} title={event?.title ?? ""} subtitle={event?.venue ?? ""} accentTag="TVW 22" accentColor={KPI_TVW}>
      {event && (confirmed ? (
        <div style={{ padding: "40px 28px", textAlign: "center" }}>
          <div style={{ width: 56, height: 56, borderRadius: "50%", background: "#F7FEE7", border: "2px solid #84CC16", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px" }}>
            <svg width="22" height="18" viewBox="0 0 22 18" fill="none"><path d="M2 9l7 7L20 2" stroke="#65A30D" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </div>
          <div style={{ fontSize: 16, fontWeight: 700, color: ACCENT_NAVY, marginBottom: 8 }}>Registered!</div>
          <div style={{ fontSize: 13.5, color: "#6b6b7a", lineHeight: 1.6 }}>Confirmation email sent to rohan.desai@tcs.com</div>
        </div>
      ) : (
        <div style={{ padding: "24px 28px" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 22 }}>
            {[["Event", event.title], ["Date", event.date], ["Mode", event.mode], ["Venue", event.venue], ["Capacity", event.capacity]].map(([k, v]) => (
              <div key={k} style={{ display: "flex", justifyContent: "space-between", gap: 12, padding: "10px 0", borderBottom: "1px solid #f0f0f8" }}>
                <span style={{ fontSize: 12.5, color: "#8888a0" }}>{k}</span>
                <span style={{ fontSize: 12.5, color: ACCENT_NAVY, fontWeight: 600 }}>{v}</span>
              </div>
            ))}
          </div>
          <div style={{ background: "#F0FDF4", border: "1px solid #bbf7d0", borderRadius: 10, padding: "12px 14px", fontSize: 13, color: "#15803d", marginBottom: 20, lineHeight: 1.5 }}>
            Registering as a volunteer for this event. Hours will be logged against your profile.
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            <button onClick={() => { setConfirmed(true); triggerToast("Registered! Confirmation email sent to rohan.desai@tcs.com"); }} style={{ width: "100%", background: KPI_TVW, color: "#fff", border: "none", borderRadius: 10, padding: "13px", fontSize: 14, fontWeight: 700, cursor: "pointer", fontFamily: "'DM Sans', sans-serif" }}>Confirm Registration</button>
            <button onClick={reset} style={{ width: "100%", background: "#fff", border: "1.5px solid #dddde8", borderRadius: 10, padding: "12px", fontSize: 13.5, fontWeight: 600, color: "#6b6b7a", cursor: "pointer", fontFamily: "'DM Sans', sans-serif" }}>Cancel</button>
          </div>
        </div>
      ))}
    </DrawerShell>
  );
}

function ResourceCard({ r, onClick }: { r: { label: string; desc: string; count: string; accentColor: string; photo: string }; onClick?: () => void }) {
  const [hov, setHov] = useState(false);
  return (
    <div onClick={onClick} onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{ background: "#fff", border: "1px solid #e8e8f0", borderRadius: 14, overflow: "hidden", cursor: "pointer", transform: hov ? "translateY(-3px)" : "translateY(0)", boxShadow: hov ? `0 8px 24px ${r.accentColor}18` : "none", transition: "transform 0.18s, box-shadow 0.18s" }}>
      <div style={{ height: 150, background: `url(${r.photo}) center/cover no-repeat` }} />
      <div style={{ background: r.accentColor, padding: "12px 14px", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ fontSize: 14.5, fontWeight: 900, color: "#fff", textAlign: "center", lineHeight: 1.3 }}>{r.label}</div>
      </div>
    </div>
  );
}

function PipelineRow({ v }: { v: typeof PROENGAGE_PIPELINE[0] }) {
  const [open, setOpen] = useState(false);
  const statusColor  = v.status === "Active" || v.status === "Matched" ? KPI_PROENGAGE : v.status === "Completed" ? B_BLUE : v.status === "Dropped" ? B_RED : "#9a6500";
  const statusPastel = v.status === "Active" || v.status === "Matched" ? "#E6F4EE" : v.status === "Completed" ? P_BLUE : v.status === "Dropped" ? P_RED : P_YELLOW;
  return (
    <div style={{ background: "#fff", border: "1px solid #e8e8f0", borderRadius: 12, overflow: "hidden", marginBottom: 8 }}>
      <div onClick={() => setOpen(x => !x)} style={{ display: "flex", alignItems: "center", gap: 12, padding: "13px 16px", cursor: "pointer", userSelect: "none" }}>
        <div style={{ width: 36, height: 36, borderRadius: 8, background: statusPastel, border: `1px solid ${statusColor}22`, flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div style={{ width: 7, height: 7, borderRadius: "50%", background: statusColor }} />
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 13.5, fontWeight: 700, color: ACCENT_NAVY, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{v.name}</div>
          <div style={{ fontSize: 12, color: "#aaaabc", marginTop: 2 }}>{v.project} · {v.ngo}</div>
        </div>
        <StatusBadge status={v.status} />
        <span style={{ fontSize: 18, color: "#dddde8", transform: open ? "rotate(90deg)" : "rotate(0deg)", transition: "transform 0.2s", marginLeft: 4 }}>›</span>
      </div>
      {open && (
        <div style={{ padding: "0 16px 14px", borderTop: "1px solid #f0f0f8" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginTop: 12 }}>
            {[["Email", v.email], ["Company", v.company], ["Experience", v.experience], ["Last Update", v.lastUpdated]].map(([k, val]) => (
              <div key={k} style={{ background: "#f8f8fc", borderRadius: 8, padding: "8px 10px" }}>
                <div style={{ fontSize: 9.5, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.8px", color: "#aaaabc", marginBottom: 3 }}>{k}</div>
                <div style={{ fontSize: 12.5, fontWeight: 600, color: ACCENT_NAVY }}>{val}</div>
              </div>
            ))}
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 5, marginTop: 10 }}>
            {v.skills.map((s: string) => (
              <span key={s} style={{ background: P_BLUE, color: B_BLUE, fontSize: 11, fontWeight: 600, padding: "2px 9px", borderRadius: 100 }}>{s}</span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}


// ─── Project Update Drawer ─────────────────────────────────────────────────────
function ProjectUpdateDrawer({ open, onClose, project }: { open: boolean; onClose: () => void; project: any }) {
  const [text, setText] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const reset = () => { onClose(); setSubmitted(false); setText(""); };
  return (
    <DrawerShell open={open} onClose={reset} title="Post Your Monthly Update" subtitle={project ? `${project.ngo} · ProEngage 2025` : ""} accentTag="Monthly Update" accentColor={KPI_PROENGAGE}>
      {submitted ? (
        <div style={{ padding: "40px 28px", textAlign: "center" }}>
          <div style={{ width: 56, height: 56, borderRadius: "50%", background: "#F7FEE7", border: "2px solid #84CC16", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px" }}>
            <svg width="22" height="18" viewBox="0 0 22 18" fill="none"><path d="M2 9l7 7L20 2" stroke="#65A30D" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </div>
          <div style={{ fontSize: 16, fontWeight: 700, color: ACCENT_NAVY, marginBottom: 8 }}>Update posted</div>
          <div style={{ fontSize: 13.5, color: "#6b6b7a", lineHeight: 1.6 }}>Your update has been shared with TSG and your NGO partner.</div>
        </div>
      ) : (
        <div style={{ padding: "24px 28px" }}>
          <p style={{ fontSize: 13.5, color: "#6b6b7a", lineHeight: 1.6, marginBottom: 22 }}>Share a brief progress note with TSG and your NGO partner.</p>
          <label style={{ fontSize: 11, fontWeight: 700, color: "#aaaabc", textTransform: "uppercase", letterSpacing: "1px", display: "block", marginBottom: 8 }}>Update</label>
          <textarea value={text} onChange={e => setText(e.target.value)} placeholder="What progress have you made this week? Any blockers or next steps?" rows={6}
            style={{ width: "100%", border: "1.5px solid #e0e0e8", borderRadius: 10, padding: "12px 14px", fontSize: 13.5, fontFamily: "'DM Sans', sans-serif", color: ACCENT_NAVY, resize: "vertical", outline: "none", lineHeight: 1.6, boxSizing: "border-box", marginBottom: 16 }}
            onFocus={e => (e.target.style.borderColor = B_BLUE)} onBlur={e => (e.target.style.borderColor = "#e0e0e8")} />
          <div style={{ border: "1.5px dashed #dddde8", borderRadius: 10, padding: "16px", textAlign: "center", fontSize: 13, color: "#aaaabc", cursor: "pointer", marginBottom: 16 }}>Drop a file here or click to browse (optional)</div>
          <button disabled={!text.trim()} onClick={() => setSubmitted(true)} style={{ width: "100%", background: text.trim() ? B_BLUE : "#e0e0e8", color: text.trim() ? "#fff" : "#aaa", border: "none", borderRadius: 10, padding: "13px", fontSize: 14, fontWeight: 700, cursor: text.trim() ? "pointer" : "not-allowed", fontFamily: "'DM Sans', sans-serif" }}>Post Update</button>
        </div>
      )}
    </DrawerShell>
  );
}

// ─── Feedback Drawer (volunteer) ───────────────────────────────────────────────
function FeedbackVolDrawer({ open, onClose, project }: { open: boolean; onClose: () => void; project: any }) {
  const [completed, setCompleted] = useState<""|"yes"|"no">("");
  const [submitted, setSubmitted] = useState(false);
  const [nps, setNps] = useState(0); const [npsHov, setNpsHov] = useState(0);
  const [supportRatings, setSupportRatings] = useState([0,0,0]); const [supportHov, setSupportHov] = useState([0,0,0]);
  const [months, setMonths] = useState(""); const [hoursWeek, setHoursWeek] = useState("");
  const [dropoutReason, setDropoutReason] = useState("");
  const reset = () => { onClose(); setSubmitted(false); setCompleted(""); setNps(0); setSupportRatings([0,0,0]); setMonths(""); setHoursWeek(""); setDropoutReason(""); };
  const canSubmit = completed === "yes" ? !!(months && hoursWeek && supportRatings.every(r=>r>0) && nps>0) : !!(completed === "no" && dropoutReason);
  const sel: React.CSSProperties = { width:"100%", border:"1.5px solid #e0e0e8", borderRadius:10, padding:"10px 14px", fontSize:13.5, fontFamily:"'DM Sans', sans-serif", color:ACCENT_NAVY, outline:"none", boxSizing:"border-box", appearance:"none", cursor:"pointer", background:"#fff" };
  const lbl: React.CSSProperties = { fontSize:11, fontWeight:700, color:"#aaaabc", textTransform:"uppercase", letterSpacing:"1px", display:"block", marginBottom:8 };
  const supportItems = ["Easily accessible","Resolved queries","Liaising with NGO partners"];
  const dropoutReasons = ["Change in project scope by NGO / NGO Unresponsive","Personal and professional transitions hindered engagement","I didn't feel motivated / I lost interest"];
  function StarRow({ count=5, value, hover, onHov, onSet }: { count?: number; value: number; hover: number; onHov:(v:number)=>void; onSet:(v:number)=>void }) {
    return <div style={{ display:"flex", gap:4 }}>{Array.from({length:count},(_,i)=>i+1).map(i=><span key={i} onMouseEnter={()=>onHov(i)} onMouseLeave={()=>onHov(0)} onClick={()=>onSet(i)} style={{ fontSize:count===10?22:26, cursor:"pointer", color:i<=(hover||value)?"#0B7285":"#e0e0e8", lineHeight:1 }}>★</span>)}</div>;
  }
  return (
    <DrawerShell open={open} onClose={reset} title="ProEngage Volunteer Feedback" subtitle={project ? `${project.ngo} · ProEngage 2025` : ""} accentTag="Project Feedback" accentColor={KPI_CVP}>
      {submitted ? (
        <div style={{ padding:"40px 28px", textAlign:"center" }}>
          <div style={{ width:56, height:56, borderRadius:"50%", background:"#F7FEE7", border:"2px solid #84CC16", display:"flex", alignItems:"center", justifyContent:"center", margin:"0 auto 16px" }}><svg width="22" height="18" viewBox="0 0 22 18" fill="none"><path d="M2 9l7 7L20 2" stroke="#65A30D" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" /></svg></div>
          <div style={{ fontSize:16, fontWeight:700, color:ACCENT_NAVY, marginBottom:8 }}>Feedback submitted</div>
          <div style={{ fontSize:13.5, color:"#6b6b7a", lineHeight:1.6 }}>Thank you. Certificate will be generated within 24 hours once the NGO also submits.</div>
        </div>
      ) : (
        <div style={{ padding:"24px 28px" }}>
          <div style={{ background:P_BLUE, border:`1px solid ${B_BLUE}22`, borderRadius:10, padding:"12px 16px", marginBottom:24, fontSize:13, color:B_BLUE, lineHeight:1.6 }}>Please fill in this feedback form. All fields marked * are mandatory.</div>
          <div style={{ marginBottom:24 }}>
            <label style={lbl}>1. Were you able to successfully complete the project? *</label>
            {[["yes","Yes"],["no","No"]].map(([val,lab])=><label key={val} style={{ display:"flex", alignItems:"center", gap:10, cursor:"pointer", fontSize:13.5, color:completed===val?B_BLUE:ACCENT_NAVY, fontWeight:completed===val?600:400, marginBottom:8 }}><div onClick={()=>setCompleted(val as "yes"|"no")} style={{ width:18, height:18, borderRadius:"50%", border:`2px solid ${completed===val?B_BLUE:"#dddde8"}`, background:completed===val?B_BLUE:"#fff", flexShrink:0, display:"flex", alignItems:"center", justifyContent:"center", cursor:"pointer" }}>{completed===val&&<div style={{ width:7, height:7, borderRadius:"50%", background:"#fff" }} />}</div>{lab}</label>)}
          </div>
          {completed==="yes" && <>
            <div style={{ marginBottom:18 }}><label style={lbl}>2. Months dedicated? *</label><select value={months} onChange={e=>setMonths(e.target.value)} style={sel}><option value="">Select</option>{[1,2,3,4,5,6].map(n=><option key={n} value={n}>{n}</option>)}</select></div>
            <div style={{ marginBottom:18 }}><label style={lbl}>3. Hours per week? *</label><select value={hoursWeek} onChange={e=>setHoursWeek(e.target.value)} style={sel}><option value="">Select</option>{[1,2,3,4,5,6,7,8].map(n=><option key={n} value={n}>{n}</option>)}</select></div>
            <div style={{ marginBottom:20 }}>
              <label style={lbl}>4. Rate ProEngage support *</label>
              {supportItems.map((item,i)=><div key={i} style={{ display:"flex", justifyContent:"space-between", alignItems:"center", gap:12, marginBottom:12 }}><span style={{ fontSize:12.5, color:"#555", flex:1 }}>{item}</span><StarRow value={supportRatings[i]} hover={supportHov[i]} onHov={v=>{const a=[...supportHov];a[i]=v;setSupportHov(a);}} onSet={v=>{const a=[...supportRatings];a[i]=v;setSupportRatings(a);}} /></div>)}
            </div>
            <div style={{ marginBottom:18 }}>
              <label style={lbl}>5. Likelihood to recommend *</label>
              <div style={{ display:"flex", alignItems:"center", gap:8 }}><span style={{ fontSize:11.5, color:"#8888a0" }}>Unlikely</span><StarRow count={10} value={nps} hover={npsHov} onHov={setNpsHov} onSet={setNps} /><span style={{ fontSize:11.5, color:"#8888a0" }}>Likely</span></div>
            </div>
          </>}
          {completed==="no" && <div style={{ marginBottom:22 }}>
            <label style={lbl}>2. Reason for no completion *</label>
            {dropoutReasons.map((r,i)=><label key={i} style={{ display:"flex", alignItems:"flex-start", gap:10, cursor:"pointer", fontSize:13, color:dropoutReason===r?B_BLUE:ACCENT_NAVY, fontWeight:dropoutReason===r?600:400, lineHeight:1.5, marginBottom:10 }}><div onClick={()=>setDropoutReason(r)} style={{ width:18, height:18, minWidth:18, borderRadius:"50%", border:`2px solid ${dropoutReason===r?B_BLUE:"#dddde8"}`, background:dropoutReason===r?B_BLUE:"#fff", display:"flex", alignItems:"center", justifyContent:"center", cursor:"pointer", marginTop:2 }}>{dropoutReason===r&&<div style={{ width:7, height:7, borderRadius:"50%", background:"#fff" }} />}</div>{r}</label>)}
          </div>}
          <button disabled={!canSubmit} onClick={()=>setSubmitted(true)} style={{ width:"100%", background:canSubmit?B_BLUE:"#e0e0e8", color:canSubmit?"#fff":"#aaa", border:"none", borderRadius:10, padding:"13px", fontSize:14, fontWeight:700, cursor:canSubmit?"pointer":"not-allowed", fontFamily:"'DM Sans', sans-serif" }}>Submit Feedback</button>
        </div>
      )}
    </DrawerShell>
  );
}

// ─── Grievance Drawer ──────────────────────────────────────────────────────────
function GrievanceVolDrawer({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [category, setCategory] = useState(""); const [text, setText] = useState(""); const [submitted, setSubmitted] = useState(false);
  const reset = () => { onClose(); setSubmitted(false); setCategory(""); setText(""); };
  const categories = ["Communication issues with NGO","Project scope changed unexpectedly","Scheduling conflict","Platform issue","Other"];
  return (
    <DrawerShell open={open} onClose={reset} title="Raise a Grievance" subtitle="Reviewed in confidence by TSG Admin" accentTag="Grievance" accentColor={B_RED}>
      {submitted ? (
        <div style={{ padding:"40px 28px", textAlign:"center" }}>
          <div style={{ width:56, height:56, borderRadius:"50%", background:P_YELLOW, border:`2px solid ${B_YELLOW}`, display:"flex", alignItems:"center", justifyContent:"center", margin:"0 auto 16px" }}><svg width="22" height="18" viewBox="0 0 22 18" fill="none"><path d="M2 9l7 7L20 2" stroke={B_YELLOW} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" /></svg></div>
          <div style={{ fontSize:16, fontWeight:700, color:ACCENT_NAVY, marginBottom:8 }}>Grievance submitted</div>
          <div style={{ fontSize:13.5, color:"#6b6b7a", lineHeight:1.6 }}>TSG Admin will respond within 3 working days.</div>
        </div>
      ) : (
        <div style={{ padding:"24px 28px" }}>
          <div style={{ marginBottom:18 }}>
            <label style={{ fontSize:11, fontWeight:700, color:"#aaaabc", textTransform:"uppercase", letterSpacing:"1px", display:"block", marginBottom:10 }}>Category *</label>
            {categories.map(c=><label key={c} style={{ display:"flex", alignItems:"center", gap:10, cursor:"pointer", fontSize:13.5, color:category===c?B_BLUE:ACCENT_NAVY, fontWeight:category===c?600:400, marginBottom:8 }}><div onClick={()=>setCategory(c)} style={{ width:18, height:18, borderRadius:"50%", border:`2px solid ${category===c?B_BLUE:"#dddde8"}`, background:category===c?B_BLUE:"#fff", flexShrink:0, display:"flex", alignItems:"center", justifyContent:"center", cursor:"pointer" }}>{category===c&&<div style={{ width:7, height:7, borderRadius:"50%", background:"#fff" }} />}</div>{c}</label>)}
          </div>
          <div style={{ marginBottom:22 }}>
            <label style={{ fontSize:11, fontWeight:700, color:"#aaaabc", textTransform:"uppercase", letterSpacing:"1px", display:"block", marginBottom:8 }}>Describe the issue *</label>
            <textarea value={text} onChange={e=>setText(e.target.value)} rows={5} placeholder="Provide as much detail as possible." style={{ width:"100%", border:"1.5px solid #e0e0e8", borderRadius:10, padding:"12px 14px", fontSize:13.5, fontFamily:"'DM Sans', sans-serif", color:ACCENT_NAVY, resize:"none", outline:"none", lineHeight:1.6, boxSizing:"border-box" }} onFocus={e=>(e.target.style.borderColor=B_BLUE)} onBlur={e=>(e.target.style.borderColor="#e0e0e8")} />
          </div>
          <button disabled={!(category && text.trim().length > 10)} onClick={()=>setSubmitted(true)} style={{ width:"100%", background:category&&text.trim().length>10?B_BLUE:"#e0e0e8", color:category&&text.trim().length>10?"#fff":"#aaa", border:"none", borderRadius:10, padding:"13px", fontSize:14, fontWeight:700, cursor:category&&text.trim().length>10?"pointer":"not-allowed", fontFamily:"'DM Sans', sans-serif" }}>Submit Grievance</button>
        </div>
      )}
    </DrawerShell>
  );
}

// ─── Apply Drawer ──────────────────────────────────────────────────────────────
function ApplyVolDrawer({ project, onClose }: { project: typeof PE_OPPORTUNITIES_SPOC[0] | null; onClose: () => void }) {
  const [agreed, setAgreed] = useState(false); const [why, setWhy] = useState(""); const [submitted, setSubmitted] = useState(false);
  const reset = () => { onClose(); setSubmitted(false); setAgreed(false); setWhy(""); };
  return (
    <DrawerShell open={!!project} onClose={reset} title={project?.title ?? ""} subtitle={project ? `${project.ngo} · ${project.skillArea}` : ""} accentTag="ProEngage Application">
      {project && (submitted ? (
        <div style={{ padding:"40px 28px", textAlign:"center" }}>
          <div style={{ width:56, height:56, borderRadius:"50%", background:"#F7FEE7", border:"2px solid #84CC16", display:"flex", alignItems:"center", justifyContent:"center", margin:"0 auto 16px" }}><svg width="22" height="18" viewBox="0 0 22 18" fill="none"><path d="M2 9l7 7L20 2" stroke="#65A30D" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" /></svg></div>
          <div style={{ fontSize:16, fontWeight:700, color:ACCENT_NAVY, marginBottom:8 }}>Application submitted!</div>
          <div style={{ fontSize:13.5, color:"#6b6b7a", lineHeight:1.6 }}>Sent to {project.ngo}. You'll receive email confirmation shortly.</div>
        </div>
      ) : (
        <div style={{ padding:"24px 28px" }}>
          <div style={{ background:P_BLUE, border:`1px solid ${B_BLUE}22`, borderRadius:10, padding:"12px 16px", marginBottom:20, display:"flex", flexWrap:"wrap", gap:"8px 24px" }}>
            {[["Mode",project.mode],["Duration",project.duration],["Closes",project.closes],["Applicants",`${project.applicants} applied`]].map(([k,v])=><div key={k}><div style={{ fontSize:10, fontWeight:700, color:"#aaaabc", textTransform:"uppercase" }}>{k}</div><div style={{ fontSize:13, fontWeight:600, color:ACCENT_NAVY }}>{v}</div></div>)}
          </div>
          <label style={{ fontSize:11, fontWeight:700, color:"#aaaabc", textTransform:"uppercase", letterSpacing:"1px", display:"block", marginBottom:8 }}>Why are you the best fit? *</label>
          <textarea value={why} onChange={e=>setWhy(e.target.value)} rows={5} placeholder="Describe your motivation and relevant experience" style={{ width:"100%", border:"1.5px solid #e0e0e8", borderRadius:10, padding:"12px 14px", fontSize:13.5, fontFamily:"'DM Sans', sans-serif", color:ACCENT_NAVY, resize:"none", outline:"none", lineHeight:1.6, boxSizing:"border-box", marginBottom:16 }} onFocus={e=>(e.target.style.borderColor=B_BLUE)} onBlur={e=>(e.target.style.borderColor="#e0e0e8")} />
          <label style={{ display:"flex", alignItems:"flex-start", gap:10, marginBottom:22, cursor:"pointer" }}>
            <input type="checkbox" checked={agreed} onChange={e=>setAgreed(e.target.checked)} style={{ marginTop:3, accentColor:B_BLUE, width:15, height:15 }} />
            <span style={{ fontSize:13, color:B_BLUE, fontWeight:600, lineHeight:1.5 }}>I agree to the volunteer undertaking terms</span>
          </label>
          <div style={{ display:"flex", gap:10 }}>
            <button onClick={reset} style={{ flex:1, background:"#fff", border:"1.5px solid #dddde8", borderRadius:10, padding:"12px", fontSize:13.5, fontWeight:600, color:"#6b6b7a", cursor:"pointer", fontFamily:"'DM Sans', sans-serif" }}>Save for Later</button>
            <button disabled={!(agreed&&why.trim())} onClick={()=>setSubmitted(true)} style={{ flex:2, background:agreed&&why.trim()?B_BLUE:"#e0e0e8", color:agreed&&why.trim()?"#fff":"#aaa", border:"none", borderRadius:10, padding:"12px", fontSize:14, fontWeight:700, cursor:agreed&&why.trim()?"pointer":"not-allowed", fontFamily:"'DM Sans', sans-serif" }}>Submit Application</button>
          </div>
        </div>
      ))}
    </DrawerShell>
  );
}

// ─── Referral Drawer ───────────────────────────────────────────────────────────
function ReferralVolDrawer({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [copied, setCopied] = useState(false);
  const refLink = "https://tataengage.com/join?ref=RD5521";
  return (
    <DrawerShell open={open} onClose={onClose} title="Refer a Colleague or Family Member" subtitle="Share your unique referral link below" accentTag="Referral" accentColor={B_TEAL}>
      <div style={{ padding:"28px" }}>
        <p style={{ fontSize:13.5, color:"#6b6b7a", lineHeight:1.6, marginBottom:22 }}>When someone joins using your link, your Referred count goes up toward the Connector badge.</p>
        <div style={{ background:P_BLUE, border:`1px solid ${B_BLUE}22`, borderRadius:10, padding:"14px 16px", display:"flex", alignItems:"center", gap:12, marginBottom:16 }}>
          <span style={{ flex:1, fontSize:13.5, fontWeight:600, color:B_BLUE, wordBreak:"break-all" }}>{refLink}</span>
          <button onClick={()=>{setCopied(true);setTimeout(()=>setCopied(false),2000);}} style={{ background:copied?"#65A30D":B_BLUE, color:"#fff", border:"none", borderRadius:8, padding:"8px 16px", fontSize:13, fontWeight:700, cursor:"pointer", whiteSpace:"nowrap", transition:"background 0.2s" }}>{copied?"Copied!":"Copy Link"}</button>
        </div>
        <div style={{ fontSize:12, color:"#aaaabc" }}>Link expires in 30 days. You have referred 3 people so far.</div>
      </div>
    </DrawerShell>
  );
}

// ─── Share Story Drawer ────────────────────────────────────────────────────────
function ShareVolDrawer({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [active, setActive] = useState("linkedin");
  const captions: Record<string,string> = {
    linkedin: "Volunteering through @TataEngage on the Financial Literacy Programme with Udayan Care. Giving back with skills you love is the most rewarding thing. #TataEngage #BeTheChange",
    twitter: "Volunteering through @TataEngage on Financial Literacy. Skills + purpose = impact. #TataEngage",
    whatsapp: "Hey! I'm volunteering through Tata Engage — an amazing platform to give back using professional skills. https://tataengage.com",
  };
  return (
    <DrawerShell open={open} onClose={onClose} title="Share Your Story" subtitle="Let your network know about your volunteering journey" accentTag="Social Share" accentColor={B_BLUE}>
      <div style={{ padding:"28px" }}>
        <div style={{ display:"flex", gap:8, marginBottom:18 }}>
          {[["linkedin","LinkedIn"],["twitter","Twitter"],["whatsapp","WhatsApp"]].map(([id,lab])=><button key={id} onClick={()=>setActive(id)} style={{ flex:1, padding:"8px", borderRadius:8, border:`1.5px solid ${active===id?B_BLUE:"#dddde8"}`, background:active===id?P_BLUE:"#fff", color:active===id?B_BLUE:"#6b6b7a", fontSize:12.5, fontWeight:600, cursor:"pointer" }}>{lab}</button>)}
        </div>
        <label style={{ fontSize:11, fontWeight:700, color:"#aaaabc", textTransform:"uppercase", letterSpacing:"1px", display:"block", marginBottom:8 }}>Pre-written caption (you can edit)</label>
        <textarea defaultValue={captions[active]} rows={5} style={{ width:"100%", border:"1.5px solid #e0e0e8", borderRadius:10, padding:"12px 14px", fontSize:13.5, fontFamily:"'DM Sans', sans-serif", color:ACCENT_NAVY, resize:"none", outline:"none", lineHeight:1.6, boxSizing:"border-box", marginBottom:16 }} onFocus={e=>(e.target.style.borderColor=B_BLUE)} onBlur={e=>(e.target.style.borderColor="#e0e0e8")} />
        <div style={{ fontSize:12, color:"#aaaabc", marginBottom:20 }}>The platform never auto-posts on your behalf.</div>
        <button style={{ width:"100%", background:B_BLUE, color:"#fff", border:"none", borderRadius:10, padding:"13px", fontSize:14, fontWeight:700, cursor:"pointer", fontFamily:"'DM Sans', sans-serif" }}>Open {active.charAt(0).toUpperCase()+active.slice(1)}</button>
      </div>
    </DrawerShell>
  );
}

// ─── Feedback history card ─────────────────────────────────────────────────────
type SpocFeedbackEntry = typeof SPOC_VOL_FEEDBACK[0];
function FeedbackCard({ f, supportLabels, attrLabels }: { f: SpocFeedbackEntry; supportLabels: string[]; attrLabels: string[] }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ background:"#fff", border:"1px solid #e8e8f0", borderRadius:14, overflow:"hidden" }}>
      <div onClick={()=>setOpen(x=>!x)} style={{ display:"flex", alignItems:"center", gap:12, padding:"16px 18px", cursor:"pointer", userSelect:"none" }}>
        <div style={{ width:36, height:36, borderRadius:8, background:P_BLUE, border:`1px solid ${B_BLUE}22`, flexShrink:0, display:"flex", alignItems:"center", justifyContent:"center" }}><div style={{ width:7, height:7, borderRadius:"50%", background:B_BLUE }} /></div>
        <div style={{ flex:1 }}>
          <div style={{ fontSize:13.5, fontWeight:700, color:ACCENT_NAVY, marginBottom:4 }}>{f.title}</div>
          <div style={{ display:"flex", gap:6, flexWrap:"wrap" }}>
            <span style={{ background:P_BLUE, color:B_BLUE, fontSize:11, fontWeight:600, padding:"2px 9px", borderRadius:100 }}>{f.ngo}</span>
            <span style={{ background:P_BLUE, color:B_BLUE, fontSize:11, fontWeight:600, padding:"2px 9px", borderRadius:100 }}>{f.edition}</span>
            <span style={{ background:"#F7FEE7", color:"#65A30D", fontSize:11, fontWeight:700, padding:"2px 9px", borderRadius:100 }}>Submitted</span>
          </div>
        </div>
        <span style={{ fontSize:18, color:"#dddde8", transform:open?"rotate(90deg)":"rotate(0deg)", transition:"transform 0.2s" }}>›</span>
      </div>
      {open && <div style={{ padding:"0 18px 18px", borderTop:"1px solid #e8e8f0" }}>
        <div style={{ paddingTop:14 }}>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:8, marginBottom:12 }}>
            {[["Completion",f.completed?"Yes":"No"],["Duration",`${f.months} months`],["Hrs/week",`${f.hoursWeek} hrs`]].map(([lab,val])=><div key={lab} style={{ background:"#f5f5fa", borderRadius:8, padding:"8px 10px", textAlign:"center" }}><div style={{ fontSize:10, fontWeight:700, textTransform:"uppercase", letterSpacing:"0.8px", color:"#aaaabc", marginBottom:3 }}>{lab}</div><div style={{ fontSize:13, fontWeight:700, color:ACCENT_NAVY }}>{val}</div></div>)}
          </div>
          {supportLabels.map((lab,i)=><div key={i} style={{ display:"flex", alignItems:"center", gap:10, marginBottom:6 }}><div style={{ fontSize:12, color:"#6b6b7a", flex:1 }}>{lab}</div><div style={{ display:"flex", gap:2 }}>{[1,2,3,4,5].map(s=><div key={s} style={{ width:12, height:12, borderRadius:"50%", background:s<=f.supportRatings[i]?B_BLUE:"#e0e0e8" }} />)}</div><div style={{ fontSize:12, fontWeight:700, color:B_BLUE, width:16 }}>{f.supportRatings[i]}</div></div>)}
          <div style={{ background:P_BLUE, borderRadius:8, padding:"8px 12px", display:"flex", alignItems:"center", justifyContent:"space-between", marginTop:8 }}>
            <span style={{ fontSize:12, color:B_BLUE, fontWeight:600 }}>Likelihood to recommend</span>
            <span style={{ fontSize:15, fontWeight:900, color:B_BLUE }}>{f.nps} / 10</span>
          </div>
        </div>
      </div>}
    </div>
  );
}

export default function SPOCDashboardView() {
  const navigate = useNavigate();
  const onNavigate = useAppNavigate();
  const { setShowOrientationModal, triggerToast } = useAppContext();

  const isRegionalSPOC = false;
  const spocData = isRegionalSPOC ? ANJALI_GUPTA_REGIONAL : ROHAN_DESAI;
  const volData  = ROHAN_DESAI_VOLUNTEER;

  const [spocMode, setSpocMode] = useState(false);
  const [activeSection, setActiveSection] = useState("vol-snapshot");
  const statsRef = useRef<HTMLDivElement>(null);
  const [statsStarted, setStatsStarted] = useState(false);

  const currentSections = spocMode ? SPOC_SECTIONS : VOL_SECTIONS;
  const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  useEffect(() => {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) setActiveSection(e.target.id); });
    }, { threshold: 0.2 });
    currentSections.forEach(s => { const el = document.getElementById(s.id); if (el) obs.observe(el); });
    return () => obs.disconnect();
  }, [spocMode]);

  useEffect(() => {
    if (!statsRef.current) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setStatsStarted(true); }, { threshold: 0.3 });
    obs.observe(statsRef.current);
    return () => obs.disconnect();
  }, [spocMode]);

  const [spocPipelineFilter, setSpocPipelineFilter] = useState("current");
  const [activeVolActivity,   setActiveVolActivity]   = useState("opportunities");
  const [activeVolHistory,    setActiveVolHistory]     = useState("projects");
  const [histEditionFilter,   setHistEditionFilter]    = useState("ProEngage 2025 | 02");
  const [projExpanded,        setProjExpanded]         = useState(false);
  const [appsExpanded,        setAppsExpanded]         = useState(false);
  const [certsExpanded,       setCertsExpanded]        = useState(false);
  const [feedbackExpanded,    setFeedbackExpanded]     = useState(false);
  const [drawerApp,           setDrawerApp]            = useState<typeof SPOC_VOL_APPLICATIONS[0] | null>(null);
  const [updateOpen,          setUpdateOpen]           = useState(false);
  const [feedbackOpen,        setFeedbackOpen]         = useState(false);
  const [grievanceOpen,       setGrievanceOpen]        = useState(false);
  const [applyProject,        setApplyProject]         = useState<typeof PE_OPPORTUNITIES_SPOC[0] | null>(null);
  const [referralOpen,        setReferralOpen]         = useState(false);
  const [shareOpen,           setShareOpen]            = useState(false);
  const [orientationOpen,     setOrientationOpen]      = useState(false);
  const [pendingFilter, setPendingFilter]           = useState("all");
  const [certFilter, setCertFilter]                 = useState("all");

  const [tvwRegEvent, setTvwRegEvent]   = useState<any>(null);
  const [createEventOpen, setCreateEventOpen] = useState(false);
  const [evTitle, setEvTitle] = useState("");
  const [evDate, setEvDate]   = useState("");
  const [evMode, setEvMode]   = useState("In-Person");
  const [evVenue, setEvVenue] = useState("");
  const [evCap, setEvCap]     = useState("");

  const PE_EDITIONS = ["ProEngage 2025 | 02", "ProEngage 2025 | 01", "ProEngage 2024 | 02"];

  const hasActive = !!volData.activeApplication;
  const volActivitySlicers = IS_PE_SEASON && hasActive
    ? [{id:"opportunities",label:"View Opportunities"},{id:"diy",label:"DIY Activities"},{id:"proengage",label:"My ProEngage Project"}]
    : IS_PE_SEASON
    ? [{id:"opportunities",label:"View Opportunities"},{id:"diy",label:"DIY Activities"},{id:"apply",label:"Apply for a Project"}]
    : [{id:"opportunities",label:"View Opportunities"},{id:"diy",label:"DIY Activities"},{id:"early",label:"Apply Early for ProEngage"}];

  const filteredVolProjects = SPOC_VOL_HISTORY_PROJECTS.filter(p => !histEditionFilter || p.edition === histEditionFilter);
  const filteredVolApps     = SPOC_VOL_APPLICATIONS.filter(a => !histEditionFilter || a.edition === histEditionFilter);
  const filteredVolCerts    = filteredVolProjects.filter(p => p.cert);
  const filteredVolFeedback = SPOC_VOL_FEEDBACK.filter(f => !histEditionFilter || f.edition === histEditionFilter);
  const COLLAPSE = 3;

  const filteredPipeline = PROENGAGE_PIPELINE.filter(v =>
    spocPipelineFilter === "current" ? v.isCurrentEdition : !v.isCurrentEdition
  );
  const filteredPending = PENDING_APPROVALS_DATA.filter(p =>
    pendingFilter === "all" ? true : p.status === (pendingFilter === "pending" ? "Pending" : "Approved")
  );
  const filteredCerts = VOLUNTEER_CERTIFICATES.filter(c =>
    certFilter === "all" ? true :
    certFilter === "generated" ? c.status === "Generated" :
    c.status !== "Generated"
  );

  const VOL_HISTORY_PROJECTS = volData.history.map((h: any, i: number) => ({
    id: `h${i}`, title: h.project, ngo: h.ngo, edition: `ProEngage ${h.year} | 01`, year: h.year,
    hours: h.hours, cert: i === 0,
    outcome: `Completed ${h.hours} hours of volunteering. Delivered project outcomes to ${h.ngo}.`,
  }));

  const SPOC_BADGES = [
    { id: "b1", name: "Edition Champion", image: badgeChampion,   desc: "Top performer in ProEngage 2025 edition",        earned: "2025", color: B_VOL },
    { id: "b2", name: "SPOC Veteran",     image: badgeVeteran,    desc: "Managed 3+ ProEngage editions",                  earned: "2024", color: KPI_TVW },
    { id: "b3", name: "Community Lead",   image: badgeLead,       desc: "Onboarded 100+ volunteers to the platform",      earned: "2024", color: KPI_PROENGAGE },
    { id: "b4", name: "Ambassador",       image: badgeAmbassador, desc: "Represented TCS at Tata Group SPOC Convention",  earned: "2025", color: KPI_YELLOW },
  ];

  const SPOC_RESOURCES = [
    { id: "photos",  label: "Photos",   desc: "Gallery from TVW22 and PE projects", count: "247 items",   accentColor: B_BLUE,        photo: imgPhotos  },
    { id: "videos",  label: "Videos",   desc: "Impact films and event highlights",  count: "38 videos",   accentColor: B_TEAL,        photo: imgVideos  },
    { id: "stories", label: "Stories",  desc: "Volunteer experiences and impact",   count: "94 stories",  accentColor: KPI_PROENGAGE, photo: imgStories },
    { id: "events",  label: "Events",   desc: "VolCon and upcoming gatherings",     count: "12 upcoming", accentColor: KPI_PINK,      photo: imgEvents  },
    { id: "emodule", label: "E-Module", desc: "SPOC orientation and guidelines",    count: "5 modules",   accentColor: "#C8850A",     photo: imgEModule },
  ];

  const inp: React.CSSProperties = { width: "100%", border: "1.5px solid #e0e0e8", borderRadius: 10, padding: "10px 14px", fontSize: 13.5, fontFamily: "'DM Sans', sans-serif", color: ACCENT_NAVY, outline: "none", boxSizing: "border-box" };

  // ── Volunteer sections JSX ──────────────────────────────────────────────────
  const volSectionsJSX = (
    <>
      {/* SNAPSHOT */}
      <div style={{ background: "#f0f1f8", borderRadius: 16, padding: "24px 22px", marginBottom: 52 }}>
        <section id="vol-snapshot" style={{ scrollMarginTop: 108 }}>
          <SectionHeading eyebrow="Your impact, at a glance" title="Engagement Snapshot" />
          <div ref={statsRef} style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 10, marginBottom: 16 }}>
            <StatTile value={volData.hoursVolunteered}      label="Hours Volunteered"  accentColor={KPI_PROENGAGE} delay={0}   started={statsStarted} tooltip="Total hours logged across all ProEngage projects." />
            <StatTile value={SPOC_VOL_APPLICATIONS.length}  label="Projects Applied"   accentColor={KPI_TVW}       delay={100} started={statsStarted} tooltip="ProEngage applications submitted across editions." />
            <StatTile value={4}                             label="Projects Completed" accentColor={KPI_CVP}       delay={200} started={statsStarted} tooltip="Projects where both sides have submitted feedback." />
            <StatTile value={0}                             label="Dropped Out"        accentColor={KPI_PINK}      delay={300} started={statsStarted} tooltip="Projects that ended early." />
            <StatTile value={3}                             label="No of Referrals"    accentColor={KPI_NUMBERS}   delay={400} started={statsStarted} tooltip="Colleagues who joined via your referral link." />
            <StatTile value={SPOC_BADGES.length}            label="Badges Earned"      accentColor={KPI_TEAL}      delay={500} started={statsStarted} tooltip="Awarded for key milestones." />
          </div>
          <div style={{ ...card, marginBottom: 10 }}>
            <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "1.5px", textTransform: "uppercase", color: "#aaaabc", marginBottom: 12 }}>Skills You Bring</div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 7 }}>
              {volData.skills.map((s: string) => <span key={s} style={{ background: P_BLUE, color: B_BLUE, fontSize: 12.5, fontWeight: 600, padding: "4px 12px", borderRadius: 100 }}>{s}</span>)}
            </div>
          </div>
          <div style={{ ...card, marginBottom: 10 }}>
            <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "1.5px", textTransform: "uppercase", color: "#aaaabc", marginBottom: 14 }}>Badges Earned</div>
            <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
              {SPOC_BADGES.map(b => (
                <div key={b.id} title={`${b.name} — ${b.desc} (${b.earned})`}
                  style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6, cursor: "default", transition: "transform 0.15s" }}
                  onMouseEnter={e => (e.currentTarget.style.transform = "scale(1.08)")}
                  onMouseLeave={e => (e.currentTarget.style.transform = "scale(1)")}>
                  <img src={b.image} alt={b.name} style={{ width: 56, height: 56, objectFit: "contain" }} />
                  <span style={{ fontSize: 10, fontWeight: 600, color: "#6b6b7a", textAlign: "center", lineHeight: 1.2, maxWidth: 64 }}>{b.name}</span>
                </div>
              ))}
            </div>
          </div>
          <div>
            <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "1.5px", textTransform: "uppercase", color: "#aaaabc", marginBottom: 12 }}>Testimonial from the field</div>
            <div style={{ background: P_TEAL_DARK, borderRadius: 14, padding: "28px 32px", position: "relative", overflow: "hidden", border: `1px solid ${B_LIME_DARK}33` }}>
              <div style={{ position: "absolute", top: -20, left: 20, fontFamily: "Georgia, serif", fontSize: 160, color: `${B_LIME_DARK}0d`, lineHeight: 1, userSelect: "none", pointerEvents: "none" }}>"</div>
              <div style={{ display: "inline-block", background: `${B_LIME_DARK}18`, border: `1px solid ${B_LIME_DARK}44`, borderRadius: 100, padding: "3px 10px", fontSize: 10.5, fontWeight: 700, color: B_LIME_DARK, letterSpacing: "0.6px", textTransform: "uppercase", marginBottom: 16 }}>ProEngage 2025 | 01</div>
              <blockquote style={{ fontSize: 15, lineHeight: 1.72, color: B_LIME_DARK, fontStyle: "italic", fontWeight: 300, margin: "0 0 22px", position: "relative", zIndex: 1 }}>"Rohan's contribution to the NGO digitisation project was exceptional. His systematic approach and stakeholder management made the entire process seamless."</blockquote>
              <div style={{ display: "flex", alignItems: "center", gap: 12, position: "relative", zIndex: 1 }}>
                <div style={{ width: 38, height: 38, borderRadius: "50%", background: "#1A4731", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 700, color: "#fff" }}>PK</div>
                <div>
                  <div style={{ fontWeight: 700, color: ACCENT_NAVY, fontSize: 13.5 }}>Pradeep Kumar</div>
                  <div style={{ fontSize: 12, color: "#6b6b7a", marginTop: 2 }}>Director, Saksham Foundation</div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* ACTIVITIES */}
      <div style={{ background: "#f0f1f8", borderRadius: 16, padding: "24px 22px", marginBottom: 52 }}>
        <section id="vol-activities" style={{ scrollMarginTop: 108 }}>
          <SectionHeading eyebrow={IS_PE_SEASON ? "ProEngage Edition 23 · Open" : "Non-PE season"} title="My Activities" />

          {/* Orientation — collapsed panel above activity tabs */}
          {(() => {
            const [oOpen, setOOpen] = useState(false);
            return (
              <div style={{ background: "#fff", border: "1.5px solid #c8c6f0", borderRadius: 12, marginBottom: 16, overflow: "hidden" }}>
                <div onClick={() => setOOpen(x => !x)} style={{ display: "flex", alignItems: "center", gap: 12, padding: "13px 16px", cursor: "pointer", userSelect: "none" }}>
                  <div style={{ width: 6, height: 6, borderRadius: "50%", background: B_VOL, flexShrink: 0 }} />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 9.5, fontWeight: 700, letterSpacing: "1.5px", textTransform: "uppercase", color: "#aaaabc", marginBottom: 2 }}>SPOC Orientation</div>
                    <div style={{ fontSize: 13.5, fontWeight: 700, color: ACCENT_NAVY, display: "flex", alignItems: "center", gap: 10 }}>
                      E-Module Progress
                      <span style={{ background: P_VOL, color: B_VOL, fontSize: 11, fontWeight: 700, padding: "2px 9px", borderRadius: 100 }}>{spocData.orientationProgress}/{spocData.totalOrientationModules} modules</span>
                    </div>
                  </div>
                  <div style={{ width: 80 }}>
                    <div style={{ height: 6, background: "#e8e8f0", borderRadius: 3, overflow: "hidden" }}>
                      <div style={{ height: "100%", width: `${(spocData.orientationProgress / spocData.totalOrientationModules) * 100}%`, background: B_VOL, borderRadius: 3 }} />
                    </div>
                  </div>
                  <span style={{ fontSize: 18, color: "#dddde8", transform: oOpen ? "rotate(90deg)" : "rotate(0deg)", transition: "transform 0.2s" }}>›</span>
                </div>
                {oOpen && (
                  <div style={{ padding: "0 16px 16px", borderTop: "1px solid #e8e8f0" }}>
                    <p style={{ fontSize: 13, color: "#6b6b7a", lineHeight: 1.6, margin: "12px 0 14px" }}>Complete all orientation modules to unlock full SPOC capabilities and stay current with ProEngage guidelines.</p>
                    <button onClick={() => setShowOrientationModal(true)} style={{ background: B_VOL, color: "#fff", border: "none", borderRadius: 10, padding: "9px 20px", fontSize: 13, fontWeight: 700, cursor: "pointer", fontFamily: "'DM Sans', sans-serif" }}>
                      {spocData.orientationProgress < spocData.totalOrientationModules ? "Continue Orientation" : "Review Orientation"}
                    </button>
                  </div>
                )}
              </div>
            );
          })()}

          <Slicers options={volActivitySlicers} active={activeVolActivity} onChange={setActiveVolActivity} accentColor={B_TEAL} />

          {/* View Opportunities */}
          {activeVolActivity === "opportunities" && (
            <div>
              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                {TVW_OPPORTUNITIES_SPOC.map(ev => (
                  <div key={ev.id} style={{ ...card, display: "flex", gap: 16, alignItems: "center", cursor: "pointer", transition: "box-shadow 0.18s, transform 0.18s", padding: "18px 20px" }}
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.boxShadow = "0 4px 16px rgba(13,27,62,0.08)"; (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)"; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.boxShadow = "none"; (e.currentTarget as HTMLElement).style.transform = "translateY(0)"; }}>
                    <div style={{ width: 44, height: 44, borderRadius: 10, background: ev.pastel, border: `1px solid ${ev.accentColor}22`, flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <div style={{ width: 8, height: 8, borderRadius: "50%", background: ev.accentColor }} />
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: 700, fontSize: 14, color: ACCENT_NAVY, marginBottom: 8 }}>{ev.title}</div>
                      <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                        {[ev.company, ev.date, ev.mode, ev.theme].map((d, i) => <span key={i} style={{ background: ev.pastel, color: ev.accentColor, fontSize: 11, fontWeight: 600, padding: "2px 9px", borderRadius: 100 }}>{d}</span>)}
                      </div>
                    </div>
                    <button onClick={e => { e.stopPropagation(); setTvwRegEvent(ev); }} style={{ background: ev.accentColor, color: "#fff", border: "none", borderRadius: 8, padding: "6px 14px", fontSize: 12.5, fontWeight: 600, cursor: "pointer" }}>Register</button>
                  </div>
                ))}
              </div>
              <button onClick={() => navigate("/tvw")} style={{ marginTop: 14, background: "none", border: "none", fontSize: 13.5, color: B_TEAL, fontWeight: 600, cursor: "pointer", padding: 0 }}>View all opportunities →</button>
            </div>
          )}

          {/* DIY Activities */}
          {activeVolActivity === "diy" && (
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              {DIY_ACTIVITIES.map(a => (
                <div key={a.id} style={{ ...card, padding: "20px", cursor: "pointer", display: "flex", flexDirection: "column", transition: "transform 0.18s, box-shadow 0.18s" }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)"; (e.currentTarget as HTMLElement).style.boxShadow = `0 6px 20px ${a.accentColor}18`; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = "translateY(0)"; (e.currentTarget as HTMLElement).style.boxShadow = "none"; }}>
                  <div style={{ display: "flex", gap: 14, alignItems: "flex-start", marginBottom: 14 }}>
                    <div style={{ width: 44, height: 44, borderRadius: 10, background: a.pastel, border: `1px solid ${a.accentColor}22`, flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <div style={{ width: 8, height: 8, borderRadius: "50%", background: a.accentColor }} />
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: "flex", gap: 5, marginBottom: 7 }}>
                        <span style={{ background: a.pastel, color: a.accentColor, fontSize: 11, fontWeight: 700, padding: "2px 9px", borderRadius: 100 }}>{a.theme}</span>
                        <span style={{ background: a.pastel, color: a.accentColor, fontSize: 11, fontWeight: 600, padding: "2px 9px", borderRadius: 100 }}>{a.org}</span>
                      </div>
                      <div style={{ fontSize: 13.5, fontWeight: 700, color: ACCENT_NAVY, marginBottom: 6 }}>{a.title}</div>
                      <div style={{ fontSize: 12.5, color: "#555", lineHeight: 1.55 }}>{a.desc}</div>
                    </div>
                  </div>
                  <button onClick={e => { e.stopPropagation(); triggerToast("Please contact your SPOC to sign up for this activity."); }} style={{ width: "100%", background: a.accentColor, color: "#fff", border: "none", borderRadius: 10, padding: "10px 0", fontSize: 12.5, fontWeight: 700, cursor: "pointer", fontFamily: "'DM Sans', sans-serif" }}>Contact SPOC</button>
                </div>
              ))}
            </div>
          )}

          {/* My ProEngage Project */}
          {activeVolActivity === "proengage" && IS_PE_SEASON && hasActive && (
            <div>
              <div style={{ ...card, marginBottom: 16, display: "flex", gap: 16, alignItems: "flex-start", padding: "20px 22px" }}>
                <div style={{ width: 44, height: 44, borderRadius: 10, background: P_TEAL, border: `1px solid ${B_TEAL}22`, flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", marginTop: 2 }}>
                  <div style={{ width: 8, height: 8, borderRadius: "50%", background: B_TEAL }} />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 700, fontSize: 14.5, color: ACCENT_NAVY, marginBottom: 10 }}>{(volData.activeApplication as any).title}</div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                    <StatusBadge status={(volData.activeApplication as any).status} />
                    <span style={{ background: P_BLUE, color: B_BLUE, fontSize: 11, fontWeight: 600, padding: "2px 9px", borderRadius: 100 }}>{(volData.activeApplication as any).ngo}</span>
                  </div>
                </div>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                {[
                  { label: "Post Your Monthly Update", tags: ["Progress Report","NGO Partner & TSG"], color: KPI_PROENGAGE, pastel: "#E6F4EE", action: () => setUpdateOpen(true),          disabled: false },
                  { label: "Access E-Module",          tags: ["Orientations","Roles & Responsibilities"], color: KPI_TVW,  pastel: "#E8F3FB", action: () => setShowOrientationModal(true), disabled: false },
                  { label: "Submit Feedback",          tags: ["Experience Rating","Share Learnings"],  color: KPI_CVP,    pastel: P_YELLOW,  action: () => setFeedbackOpen(true),         disabled: false },
                  { label: "Download Certificate",     tags: [] as string[],                           color: "#bbb",     pastel: "#f8f8fc", action: () => {},                            disabled: true  },
                ].map(a => (
                  <button key={a.label} disabled={a.disabled} onClick={a.action}
                    style={{ background: "#fff", border: `1px solid ${a.color}22`, borderRadius: 14, padding: "18px 18px 16px", textAlign: "left", cursor: a.disabled ? "not-allowed" : "pointer", opacity: a.disabled ? 0.55 : 1, transition: "transform 0.18s, box-shadow 0.18s", fontFamily: "'DM Sans', sans-serif", boxShadow: `0 2px 12px ${a.color}11` }}
                    onMouseEnter={e => { if (!a.disabled) { (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)"; (e.currentTarget as HTMLElement).style.boxShadow = `0 8px 28px ${a.color}22`; }}}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = "translateY(0)"; (e.currentTarget as HTMLElement).style.boxShadow = `0 2px 12px ${a.color}11`; }}>
                    <div style={{ width: 40, height: 40, borderRadius: 9, background: a.disabled ? "#f0f0f5" : a.pastel, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 12 }}>
                      <div style={{ width: 8, height: 8, borderRadius: "50%", background: a.disabled ? "#ccc" : a.color }} />
                    </div>
                    <div style={{ fontSize: 13.5, fontWeight: 700, color: a.disabled ? "#aaa" : ACCENT_NAVY, marginBottom: 8 }}>{a.label}</div>
                    {a.tags.length > 0
                      ? <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>{a.tags.map(t => <span key={t} style={{ background: a.color, color: "#fff", fontSize: 11, fontWeight: 600, padding: "3px 10px", borderRadius: 100 }}>{t}</span>)}</div>
                      : <div style={{ fontSize: 11.5, color: "#ccc", fontStyle: "italic" }}>Awaiting feedback submission</div>}
                  </button>
                ))}
              </div>
            </div>
          )}

          {activeVolActivity === "apply" && IS_PE_SEASON && !hasActive && (
            <div>
              <div style={{ background: P_BLUE, border: `1px solid ${B_BLUE}22`, borderRadius: 12, padding: "16px 18px", marginBottom: 20 }}>
                <div style={{ fontSize: 13.5, fontWeight: 700, color: B_BLUE, marginBottom: 4 }}>Applications close 15 July 2025</div>
                <div style={{ fontSize: 13, color: "#555", lineHeight: 1.6 }}>ProEngage Edition 11 is open. These projects match your skills.</div>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {PE_OPPORTUNITIES_SPOC.map(p => (
                  <div key={p.id} style={{ ...card, padding: "20px", border: `1px solid ${p.accentColor}22` }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 12 }}>
                      <div style={{ flex: 1 }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
                          <span style={{ background: p.pastel, color: p.accentColor, fontSize: 12, fontWeight: 700, padding: "3px 10px", borderRadius: 100 }}>{p.match}% match</span>
                          <span style={{ fontSize: 11.5, color: "#aaaabc" }}>{p.skillArea}</span>
                        </div>
                        <div style={{ fontWeight: 700, fontSize: 14.5, color: ACCENT_NAVY, marginBottom: 3 }}>{p.title}</div>
                        <div style={{ fontSize: 12.5, color: "#8888a0" }}>{p.ngo} · {p.mode} · {p.duration}</div>
                      </div>
                      <div style={{ textAlign: "right", flexShrink: 0 }}>
                        <div style={{ fontSize: 11.5, color: "#aaaabc", marginBottom: 8 }}>Closes {p.closes}</div>
                        <button onClick={() => setApplyProject(p)} style={{ background: p.accentColor, color: "#fff", border: "none", borderRadius: 8, padding: "8px 18px", fontSize: 13, fontWeight: 700, cursor: "pointer" }}>Apply</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeVolActivity === "early" && !IS_PE_SEASON && (
            <div style={{ ...card, textAlign: "center", padding: "36px 32px" }}>
              <div style={{ fontSize: 15, fontWeight: 700, color: ACCENT_NAVY, marginBottom: 8 }}>ProEngage applications open in January 2026</div>
              <div style={{ fontSize: 13.5, color: "#8888a0", lineHeight: 1.65, maxWidth: 380, margin: "0 auto 20px" }}>Register your interest early and be first to know when projects are listed.</div>
              <button style={{ background: B_VOL, color: "#fff", border: "none", borderRadius: 10, padding: "10px 24px", fontSize: 13.5, fontWeight: 700, cursor: "pointer", fontFamily: "'DM Sans', sans-serif" }}>Register Early Interest</button>
            </div>
          )}

          {/* Refer + Share — always visible below active tab */}
          <div style={{ display: "flex", gap: 10, marginTop: 20 }}>
            <button onClick={() => setReferralOpen(true)} style={{ flex: 1, background: P_TEAL, border: `1.5px solid ${B_TEAL}33`, borderRadius: 10, padding: "13px 16px", fontSize: 13.5, fontWeight: 600, color: B_TEAL, cursor: "pointer", fontFamily: "'DM Sans', sans-serif", transition: "border-color 0.18s, transform 0.18s" }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = B_TEAL; (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = `${B_TEAL}33`; (e.currentTarget as HTMLElement).style.transform = "translateY(0)"; }}>
              Refer a Colleague or Family Member
            </button>
            <button onClick={() => setShareOpen(true)} style={{ flex: 1, background: P_BLUE, border: `1.5px solid ${B_BLUE}22`, borderRadius: 10, padding: "13px 16px", fontSize: 13.5, fontWeight: 600, color: B_BLUE, cursor: "pointer", fontFamily: "'DM Sans', sans-serif", transition: "border-color 0.18s, transform 0.18s" }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = B_BLUE; (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = `${B_BLUE}22`; (e.currentTarget as HTMLElement).style.transform = "translateY(0)"; }}>
              Share Your Story
            </button>
          </div>
        </section>
      </div>

      {/* HISTORY */}
      <div style={{ background: "#f0f1f8", borderRadius: 16, padding: "24px 22px", marginBottom: 52 }}>
        <section id="vol-history" style={{ scrollMarginTop: 108 }}>
          <SectionHeading eyebrow="Your volunteering trail" title="My History" />
          <Slicers
            options={[{id:"projects",label:"My Projects"},{id:"applications",label:"My Applications"},{id:"certificates",label:"My Certificates"},{id:"feedback",label:"My Feedback"}]}
            active={activeVolHistory}
            onChange={id => { setActiveVolHistory(id); setHistEditionFilter("ProEngage 2025 | 02"); setProjExpanded(false); setAppsExpanded(false); setCertsExpanded(false); setFeedbackExpanded(false); }}
            accentColor={B_BLUE}
          />
          <div style={{ marginBottom: 16 }}>
            <select value={histEditionFilter} onChange={e => { setHistEditionFilter(e.target.value); setProjExpanded(false); setAppsExpanded(false); }} style={{ padding: "6px 12px", borderRadius: 8, border: "1.5px solid #dddde8", background: "#fff", fontSize: 13, color: ACCENT_NAVY, fontFamily: "'DM Sans', sans-serif", cursor: "pointer", outline: "none" }}>
              <option value="ProEngage 2025 | 02">ProEngage 2025 | 02 (Latest)</option>
              <option value="">All Editions</option>
              {PE_EDITIONS_SPOC.filter(e => e !== "ProEngage 2025 | 02").map(e => <option key={e} value={e}>{e}</option>)}
            </select>
          </div>

          {activeVolHistory === "projects" && (() => {
            const shown = projExpanded ? filteredVolProjects : filteredVolProjects.slice(0, COLLAPSE);
            return (
              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                {shown.map(p => {
                  const isActive  = p.projectStatus === "Applied";
                  const ac        = isActive ? B_TEAL : B_BLUE;
                  const pas       = isActive ? P_TEAL : P_BLUE;
                  const statusBg  = isActive ? "#E6F8F5" : "#F7FEE7";
                  const statusCol = isActive ? B_TEAL_DARK : "#65A30D";
                  const statusLbl = isActive ? "Applied" : "Completed";
                  return (
                    <div key={p.id} style={{ ...card, display: "flex", gap: 16, alignItems: "flex-start", padding: "18px 20px", transition: "box-shadow 0.18s, transform 0.18s" }}
                      onMouseEnter={e => { (e.currentTarget as HTMLElement).style.boxShadow = "0 4px 16px rgba(13,27,62,0.08)"; (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)"; }}
                      onMouseLeave={e => { (e.currentTarget as HTMLElement).style.boxShadow = "none"; (e.currentTarget as HTMLElement).style.transform = "translateY(0)"; }}>
                      <div style={{ width: 44, height: 44, borderRadius: 10, background: pas, border: `1px solid ${ac}22`, flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", marginTop: 2 }}><div style={{ width: 8, height: 8, borderRadius: "50%", background: ac }} /></div>
                      <div style={{ flex: 1 }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
                          <div style={{ fontWeight: 700, fontSize: 14, color: ACCENT_NAVY, flex: 1 }}>{p.title}</div>
                          <span style={{ background: statusBg, color: statusCol, fontSize: 11, fontWeight: 700, padding: "3px 10px", borderRadius: 100, whiteSpace: "nowrap" }}>{statusLbl}</span>
                        </div>
                        <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 10 }}>
                          <span style={{ background: pas, color: ac, fontSize: 11, fontWeight: 600, padding: "2px 9px", borderRadius: 100 }}>{p.ngo}</span>
                          <span style={{ background: pas, color: ac, fontSize: 11, fontWeight: 600, padding: "2px 9px", borderRadius: 100 }}>{p.edition}</span>
                          <span style={{ background: pas, color: ac, fontSize: 11, fontWeight: 600, padding: "2px 9px", borderRadius: 100 }}>{p.hours} hrs</span>
                        </div>
                        <div style={{ background: isActive ? P_TEAL : "#F7FEE7", borderRadius: 8, padding: "9px 12px", fontSize: 12.5, color: isActive ? B_TEAL_DARK : "#365314", borderLeft: `3px solid ${ac}`, lineHeight: 1.55 }}>{p.outcome}</div>
                      </div>
                      {p.cert && <button style={{ background: B_BLUE, color: "#fff", border: "none", borderRadius: 8, padding: "6px 13px", fontSize: 12, fontWeight: 700, cursor: "pointer", whiteSpace: "nowrap" }}>Download Certificate</button>}
                    </div>
                  );
                })}
                {filteredVolProjects.length === 0 && <div style={{ ...card, textAlign: "center", padding: "28px", color: "#aaaabc", fontSize: 13.5 }}>No projects for this edition.</div>}
                {filteredVolProjects.length > COLLAPSE && <button onClick={() => setProjExpanded(x => !x)} style={{ background: "none", border: "none", fontSize: 13, color: B_BLUE, fontWeight: 600, cursor: "pointer", padding: "6px 0" }}>{projExpanded ? "Show less ↑" : `Show all ${filteredVolProjects.length} projects ↓`}</button>}
              </div>
            );
          })()}

          {activeVolHistory === "applications" && (() => {
            const shown = appsExpanded ? filteredVolApps : filteredVolApps.slice(0, COLLAPSE);
            return (
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {shown.map(a => (
                  <div key={a.id} onClick={() => setDrawerApp(a)} style={{ ...card, display: "flex", gap: 14, alignItems: "center", cursor: "pointer", transition: "box-shadow 0.15s, transform 0.15s", padding: "13px 18px" }}
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.boxShadow = "0 4px 14px rgba(13,27,62,0.08)"; (e.currentTarget as HTMLElement).style.transform = "translateX(2px)"; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.boxShadow = "none"; (e.currentTarget as HTMLElement).style.transform = "translateX(0)"; }}>
                    <span style={{ fontSize: 10.5, fontWeight: 700, padding: "3px 9px", borderRadius: 100, background: P_BLUE, color: B_BLUE, whiteSpace: "nowrap" }}>{a.edition}</span>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: 13.5, fontWeight: 600, color: ACCENT_NAVY, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{a.project}</div>
                      <div style={{ fontSize: 12, color: "#aaaabc", marginTop: 2 }}>{a.ngo} · {a.date}</div>
                    </div>
                    <StatusBadge status={a.status} />
                    <span style={{ fontSize: 18, color: "#dddde8", marginLeft: 4 }}>›</span>
                  </div>
                ))}
                {filteredVolApps.length === 0 && <div style={{ ...card, textAlign: "center", padding: "28px", color: "#aaaabc", fontSize: 13.5 }}>No applications for this edition.</div>}
                {filteredVolApps.length > COLLAPSE && <button onClick={() => setAppsExpanded(x => !x)} style={{ background: "none", border: "none", fontSize: 13, color: B_BLUE, fontWeight: 600, cursor: "pointer", padding: "6px 0" }}>{appsExpanded ? "Show less ↑" : `Show all ${filteredVolApps.length} applications ↓`}</button>}
              </div>
            );
          })()}

          {activeVolHistory === "certificates" && (() => {
            const shown = certsExpanded ? filteredVolCerts : filteredVolCerts.slice(0, 2);
            return (
              <div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                  {shown.map(p => (
                    <div key={p.id} style={{ background: "#fff", border: `1px solid ${B_TEAL}33`, borderRadius: 14, padding: "22px 20px" }}>
                      <div style={{ fontSize: 10.5, fontWeight: 700, color: B_TEAL, textTransform: "uppercase", marginBottom: 6 }}>Certificate of Completion</div>
                      <div style={{ fontSize: 14.5, fontWeight: 700, color: B_BLUE, marginBottom: 3 }}>{p.title}</div>
                      <div style={{ fontSize: 12.5, color: "#8888a0", marginBottom: 14 }}>{p.ngo} · {p.edition}</div>
                      <div style={{ display: "flex", gap: 8 }}>
                        <button style={{ flex: 1, background: B_BLUE, color: "#fff", border: "none", borderRadius: 8, padding: "8px", fontSize: 12.5, fontWeight: 600, cursor: "pointer" }}>Download PDF</button>
                        <button style={{ background: B_TEAL, color: "#fff", border: "none", borderRadius: 8, padding: "8px 14px", fontSize: 12.5, fontWeight: 600, cursor: "pointer" }}>Share</button>
                      </div>
                    </div>
                  ))}
                </div>
                {filteredVolCerts.length === 0 && <div style={{ ...card, textAlign: "center", padding: "28px", color: "#aaaabc", fontSize: 13.5 }}>No certificates for this edition.</div>}
                {filteredVolCerts.length > 2 && <button onClick={() => setCertsExpanded(x => !x)} style={{ background: "none", border: "none", fontSize: 13, color: B_BLUE, fontWeight: 600, cursor: "pointer", padding: "10px 0" }}>{certsExpanded ? "Show less ↑" : `Show all ${filteredVolCerts.length} certificates ↓`}</button>}
              </div>
            );
          })()}

          {activeVolHistory === "feedback" && (() => {
            const supportLabels = ["Easily accessible","Resolved queries","Liaising with NGO Partners"];
            const attrLabels    = ["Critical thinking & adaptability","Communication & networking","Understanding NGO sector","Leadership & ambiguity management","Empathy & innovation"];
            const shown = feedbackExpanded ? filteredVolFeedback : filteredVolFeedback.slice(0, COLLAPSE);
            return (
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {shown.map(f => <FeedbackCard key={f.id} f={f} supportLabels={supportLabels} attrLabels={attrLabels} />)}
                {hasActive && (
                  <div style={{ background: P_BLUE, border: `1px solid ${B_BLUE}22`, borderRadius: 12, padding: "16px 18px" }}>
                    <div style={{ fontSize: 13.5, fontWeight: 600, color: ACCENT_NAVY, marginBottom: 4 }}>{(volData.activeApplication as any).title}</div>
                    <div style={{ fontSize: 13, color: B_BLUE, lineHeight: 1.5 }}>Feedback can be submitted once your project is marked complete by the NGO.</div>
                  </div>
                )}
                {filteredVolFeedback.length === 0 && !hasActive && <div style={{ ...card, textAlign: "center", padding: "28px", color: "#aaaabc", fontSize: 13.5 }}>No feedback for this edition.</div>}
                {filteredVolFeedback.length > COLLAPSE && <button onClick={() => setFeedbackExpanded(x => !x)} style={{ background: "none", border: "none", fontSize: 13, color: B_BLUE, fontWeight: 600, cursor: "pointer", padding: "6px 0" }}>{feedbackExpanded ? "Show less ↑" : `Show all ${filteredVolFeedback.length} entries ↓`}</button>}
              </div>
            );
          })()}
        </section>
      </div>

      {/* RESOURCES */}
      <div style={{ background: "#f0f1f8", borderRadius: 16, padding: "24px 22px", marginBottom: 52 }}>
        <section id="vol-resources" style={{ scrollMarginTop: 108 }}>
          <SectionHeading eyebrow="Learning and inspiration" title="Resource Library" />
          <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 12 }}>
            {SPOC_RESOURCES.map(r => <ResourceCard key={r.id} r={r} onClick={() => { if (r.id === "emodule") setShowOrientationModal(true); else onNavigate("media"); }} />)}
          </div>
        </section>
      </div>
    </>
  );

  // ── SPOC sections JSX ───────────────────────────────────────────────────────
  const spocSectionsJSX = (
    <>
      {/* 1. IMPACT KPIs */}
      <div style={{ background: "#f0f1f8", borderRadius: 16, padding: "24px 22px", marginBottom: 52 }}>
        <section id="spoc-kpis" style={{ scrollMarginTop: 108 }}>
          <SectionHeading eyebrow="Company-wide impact" title="Impact KPIs" />
          <div ref={statsRef} style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 10, marginBottom: 16 }}>
            <StatTile value={spocData.stats.totalVolunteers}  label="Total Volunteers"  accentColor={KPI_PINK}      delay={0}   started={statsStarted} tooltip="All registered volunteers under your company scope." />
            <StatTile value={spocData.stats.activeProEngage}  label="Active ProEngage"  accentColor={KPI_PROENGAGE} delay={100} started={statsStarted} tooltip="Volunteers currently matched to a ProEngage project." />
            <StatTile value={spocData.stats.tvwEvents}        label="TVW Events"         accentColor={KPI_TVW}       delay={200} started={statsStarted} tooltip="Total TVW events posted this edition." />
            <StatTile value={spocData.stats.pendingApprovals} label="Pending Approvals"  accentColor={KPI_YELLOW}    delay={300} started={statsStarted} tooltip="Retiree and no-email registrations awaiting your review." />
            <StatTile value={FEEDBACK_MONITOR_DATA.length}    label="Feedback Overdue"   accentColor={KPI_NUMBERS}   delay={400} started={statsStarted} tooltip="Volunteers who haven't submitted project feedback yet." />
            <StatTile value={COMPANY_LEADERBOARD.find(c => c.name === "TCS")?.rank ?? 2} label="Leaderboard Rank" accentColor={KPI_TEAL} delay={500} started={statsStarted} tooltip="TCS ranking on the ProEngage company leaderboard." />
          </div>

          {AT_RISK_VOLUNTEERS.length > 0 && (
            <div style={{ background: "#fff", border: `1.5px solid ${KPI_YELLOW}55`, borderRadius: 14, padding: "16px 20px" }}>
              <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "1.5px", textTransform: "uppercase", color: "#aaaabc", marginBottom: 14 }}>
                At-Risk Volunteers
                <span style={{ background: P_YELLOW, color: "#9a6500", fontSize: 11, fontWeight: 700, padding: "2px 8px", borderRadius: 100, marginLeft: 6 }}>{AT_RISK_VOLUNTEERS.length} flagged</span>
              </div>
              {AT_RISK_VOLUNTEERS.map((v: any) => {
                const sc = v.severity === "high" ? B_RED : B_YELLOW;
                const sp = v.severity === "high" ? P_RED : P_YELLOW;
                return (
                  <div key={v.id} style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 0", borderBottom: "1px solid #f0f0f8" }}>
                    <div style={{ width: 32, height: 32, borderRadius: 8, background: sp, flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <div style={{ width: 7, height: 7, borderRadius: "50%", background: sc }} />
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 13, fontWeight: 700, color: ACCENT_NAVY }}>{v.name}</div>
                      <div style={{ fontSize: 12, color: "#8888a0" }}>{v.project} · {v.reason}</div>
                    </div>
                    <span style={{ background: sp, color: sc, fontSize: 11, fontWeight: 700, padding: "3px 10px", borderRadius: 100 }}>{v.severity === "high" ? "High Risk" : "Medium"}</span>
                    <div style={{ fontSize: 11, color: "#aaaabc", whiteSpace: "nowrap" }}>{v.daysInactive}d inactive</div>
                  </div>
                );
              })}
              <div style={{ marginTop: 10, fontSize: 12, color: "#aaaabc", fontStyle: "italic" }}>Read-only view — TSG Admin handles nudges and interventions.</div>
            </div>
          )}
        </section>
      </div>

      {/* 2. TVW ACTIONS */}
      {IS_TVW_SEASON && (
        <div style={{ background: "#f0f1f8", borderRadius: 16, padding: "24px 22px", marginBottom: 52 }}>
          <section id="spoc-tvw" style={{ scrollMarginTop: 108 }}>
            <SectionHeading eyebrow="Tata Volunteering Week · Edition 22" title="TVW Actions" />
            <div style={{ background: B_VOL, borderRadius: 14, padding: "20px 22px", marginBottom: 16, display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16 }}>
              <div>
                <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "1.5px", textTransform: "uppercase", color: "rgba(255,255,255,0.5)", marginBottom: 6 }}>Your Events</div>
                <div style={{ fontSize: 15, fontWeight: 700, color: "#fff" }}>Post a new TVW event</div>
                <div style={{ fontSize: 13, color: "rgba(255,255,255,0.55)", marginTop: 4 }}>Goes live on the TVW calendar within 5 minutes.</div>
              </div>
              <button onClick={() => setCreateEventOpen(true)} style={{ background: B_YELLOW, color: ACCENT_NAVY, border: "none", borderRadius: 10, padding: "10px 20px", fontSize: 13.5, fontWeight: 700, cursor: "pointer", whiteSpace: "nowrap", fontFamily: "'DM Sans', sans-serif" }}>+ Post Event</button>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {TCS_TVW_EVENTS.map((ev: any) => {
                const isLive = ev.status === "Live";
                const ac = isLive ? B_VOL : B_BLUE;
                const pas = isLive ? P_VOL : P_BLUE;
                return (
                  <div key={ev.id} style={{ ...spocCard, display: "flex", gap: 14, alignItems: "center", padding: "16px 18px" }}>
                    <div style={{ width: 42, height: 42, borderRadius: 10, background: pas, border: `1px solid ${ac}22`, flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <div style={{ width: 8, height: 8, borderRadius: "50%", background: ac }} />
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 13.5, fontWeight: 700, color: ACCENT_NAVY, marginBottom: 7 }}>{ev.title}</div>
                      <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                        <span style={{ background: pas, color: ac, fontSize: 11, fontWeight: 600, padding: "2px 9px", borderRadius: 100 }}>{ev.date}</span>
                        <span style={{ background: pas, color: ac, fontSize: 11, fontWeight: 600, padding: "2px 9px", borderRadius: 100 }}>{ev.mode}</span>
                        <span style={{ background: pas, color: ac, fontSize: 11, fontWeight: 600, padding: "2px 9px", borderRadius: 100 }}>Cap {ev.capacity}</span>
                        <span style={{ background: pas, color: ac, fontSize: 11, fontWeight: 600, padding: "2px 9px", borderRadius: 100 }}>{ev.volunteeringHours}h</span>
                        <StatusBadge status={ev.status} />
                      </div>
                    </div>
                    <button onClick={() => triggerToast("Volunteering hours updated for this event.")} style={{ background: B_YELLOW, color: ACCENT_NAVY, border: "none", borderRadius: 8, padding: "6px 13px", fontSize: 12, fontWeight: 700, cursor: "pointer", whiteSpace: "nowrap" }}>Add Hours</button>
                  </div>
                );
              })}
            </div>
          </section>
        </div>
      )}

      {/* 3. OVERSIGHT */}
      <div style={{ background: "#f0f1f8", borderRadius: 16, padding: "24px 22px", marginBottom: 52 }}>
        <section id="spoc-oversight" style={{ scrollMarginTop: 108 }}>
          <SectionHeading eyebrow="Manage & monitor" title="Oversight" />

          {/* Top-level edition filter */}
          <div style={{ marginBottom: 16 }}>
            <select value={spocPipelineFilter} onChange={e => setSpocPipelineFilter(e.target.value)} style={{ padding: "6px 12px", borderRadius: 8, border: "1.5px solid #dddde8", background: "#fff", fontSize: 13, color: ACCENT_NAVY, fontFamily: "'DM Sans', sans-serif", cursor: "pointer", outline: "none" }}>
              <option value="current">ProEngage 2025 | 02 (Current)</option>
              <option value="past">Past Editions</option>
            </select>
          </div>

          <CollapsiblePanel title="ProEngage Volunteer Pipeline" eyebrow="Real-time" defaultOpen accentColor={KPI_PROENGAGE} badge={filteredPipeline.length}>
            <div style={{ paddingTop: 16 }}>
              {filteredPipeline.map((v: any) => <PipelineRow key={v.id} v={v} />)}
              {filteredPipeline.length === 0 && <div style={{ ...card, textAlign: "center", padding: "24px", color: "#aaaabc", fontSize: 13.5 }}>No volunteers for this filter.</div>}
            </div>
          </CollapsiblePanel>

          <CollapsiblePanel title="Feedback Monitor" eyebrow="Overdue submissions" accentColor={KPI_YELLOW} badge={FEEDBACK_MONITOR_DATA.length}>
            <div style={{ paddingTop: 16, display: "flex", flexDirection: "column", gap: 10 }}>
              {FEEDBACK_MONITOR_DATA.map((f: any) => (
                <div key={f.id} style={{ ...card, display: "flex", gap: 12, alignItems: "center", padding: "13px 16px" }}>
                  <div style={{ width: 36, height: 36, borderRadius: 8, background: P_YELLOW, border: `1px solid ${KPI_YELLOW}22`, flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <div style={{ width: 7, height: 7, borderRadius: "50%", background: KPI_YELLOW }} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 13.5, fontWeight: 700, color: ACCENT_NAVY }}>{f.name}</div>
                    <div style={{ fontSize: 12, color: "#aaaabc", marginTop: 2 }}>{f.project} · Due {f.dueDate}</div>
                    {f.reminders.length > 0 && (
                      <div style={{ display: "flex", gap: 5, marginTop: 6 }}>
                        {f.reminders.map((r: string) => <span key={r} style={{ background: P_YELLOW, color: "#9a6500", fontSize: 10.5, fontWeight: 600, padding: "2px 8px", borderRadius: 100 }}>{r}</span>)}
                      </div>
                    )}
                  </div>
                  <span style={{ background: P_RED, color: B_RED, fontSize: 11, fontWeight: 700, padding: "3px 10px", borderRadius: 100, whiteSpace: "nowrap" }}>{f.daysOverdue}d overdue</span>
                </div>
              ))}
            </div>
          </CollapsiblePanel>

          <CollapsiblePanel title="Pending Registrations" eyebrow="Retirees & no-email employees" accentColor={KPI_PINK} badge={PENDING_APPROVALS_DATA.filter((p: any) => p.status === "Pending").length}>
            <div style={{ paddingTop: 16 }}>
              <Slicers options={[{ id: "all", label: "All" }, { id: "pending", label: "Pending" }, { id: "approved", label: "Approved" }]} active={pendingFilter} onChange={setPendingFilter} accentColor={KPI_PINK} />
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {filteredPending.map((p: any) => (
                  <div key={p.id} style={{ ...card, display: "flex", gap: 12, alignItems: "center", padding: "14px 16px" }}>
                    <div style={{ width: 36, height: 36, borderRadius: "50%", background: P_VOL, border: `1px solid ${B_VOL}22`, flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 700, color: B_VOL }}>
                      {p.name.split(" ").map((n: string) => n[0]).join("").slice(0, 2)}
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 13.5, fontWeight: 700, color: ACCENT_NAVY }}>{p.name}</div>
                      <div style={{ fontSize: 12, color: "#8888a0", marginTop: 2 }}>{p.type} · {p.company} · {p.registeredDate}</div>
                    </div>
                    <StatusBadge status={p.status} />
                    {p.status === "Pending" && (
                      <div style={{ display: "flex", gap: 6 }}>
                        <button onClick={() => triggerToast(`${p.name} approved. Welcome email sent.`)} style={{ background: "#F0FDF4", color: "#16A34A", border: "1px solid #bbf7d0", borderRadius: 7, padding: "5px 11px", fontSize: 12, fontWeight: 700, cursor: "pointer" }}>Approve</button>
                        <button onClick={() => triggerToast(`${p.name}'s registration declined.`)} style={{ background: P_RED, color: B_RED, border: `1px solid ${B_RED}33`, borderRadius: 7, padding: "5px 11px", fontSize: 12, fontWeight: 700, cursor: "pointer" }}>Reject</button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </CollapsiblePanel>

          <CollapsiblePanel title="Volunteer Certificates" eyebrow="Current edition" accentColor={KPI_TVW} badge={VOLUNTEER_CERTIFICATES.length}>
            <div style={{ paddingTop: 16 }}>
              <Slicers options={[{ id: "all", label: "All" }, { id: "generated", label: "Generated" }, { id: "pending", label: "Pending" }]} active={certFilter} onChange={setCertFilter} accentColor={KPI_TVW} />
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {filteredCerts.map((c: any) => (
                  <div key={c.id} style={{ ...card, display: "flex", gap: 12, alignItems: "center", padding: "13px 16px" }}>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 13.5, fontWeight: 700, color: ACCENT_NAVY }}>{c.name}</div>
                      <div style={{ fontSize: 12, color: "#8888a0", marginTop: 2 }}>{c.project} · {c.ngo}</div>
                    </div>
                    <StatusBadge status={c.status} />
                    {c.status === "Generated" && (
                      <button onClick={() => triggerToast(`Certificate downloaded for ${c.name}.`)} style={{ background: KPI_TVW, color: "#fff", border: "none", borderRadius: 7, padding: "5px 12px", fontSize: 12, fontWeight: 700, cursor: "pointer" }}>Download</button>
                    )}
                  </div>
                ))}
              </div>
              <button onClick={() => triggerToast("Bulk ZIP download started — all certificates for current edition.")} style={{ marginTop: 14, background: ACCENT_NAVY, color: "#fff", border: "none", borderRadius: 10, padding: "10px 20px", fontSize: 13, fontWeight: 700, cursor: "pointer", fontFamily: "'DM Sans', sans-serif" }}>Bulk Download All (ZIP)</button>
            </div>
          </CollapsiblePanel>
        </section>
      </div>

      {/* 4. SPOC MANAGEMENT (Corporate only) */}
      {!isRegionalSPOC && (
        <div style={{ background: "#f0f1f8", borderRadius: 16, padding: "24px 22px", marginBottom: 52 }}>
          <section id="spoc-mgt" style={{ scrollMarginTop: 108 }}>
            <SectionHeading eyebrow="Corporate SPOC · TCS" title="SPOC Management" />

            <CollapsiblePanel title="Company Leaderboard" eyebrow="Top 10" accentColor={B_VOL} badge={COMPANY_LEADERBOARD.length}>
              <div style={{ paddingTop: 16, display: "flex", flexDirection: "column", gap: 8 }}>
                {COMPANY_LEADERBOARD.map((c: any) => {
                  const isTCS = c.name === "TCS";
                  const barColor = c.rank === 1 ? KPI_YELLOW : isTCS ? B_VOL : KPI_TVW;
                  const maxMatched = COMPANY_LEADERBOARD[0].matched;
                  return (
                    <div key={c.rank} style={{ display: "flex", alignItems: "center", gap: 12, padding: "8px 12px", borderRadius: 10, background: isTCS ? P_VOL : "#f8f8fc", border: isTCS ? `1.5px solid ${B_VOL}33` : "1.5px solid transparent" }}>
                      <div style={{ fontSize: 13, fontWeight: 700, color: isTCS ? B_VOL : "#aaaabc", width: 20, textAlign: "center" }}>#{c.rank}</div>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: 13, fontWeight: isTCS ? 700 : 500, color: ACCENT_NAVY, marginBottom: 5 }}>{c.name}</div>
                        <div style={{ height: 5, background: "#e8e8f0", borderRadius: 3, overflow: "hidden" }}>
                          <div style={{ height: "100%", width: `${(c.matched / maxMatched) * 100}%`, background: barColor, borderRadius: 3 }} />
                        </div>
                      </div>
                      <div style={{ fontSize: 12, fontWeight: 700, color: isTCS ? B_VOL : "#6b6b7a", minWidth: 40, textAlign: "right" }}>{c.matched.toLocaleString()}</div>
                    </div>
                  );
                })}
              </div>
            </CollapsiblePanel>

            <CollapsiblePanel title="SPOC Directory" eyebrow="TCS SPOCs" accentColor={B_VOL} badge={SPOC_DIRECTORY.filter((s: any) => s.company === "TCS").length}>
              <div style={{ paddingTop: 16, display: "flex", flexDirection: "column", gap: 8 }}>
                {SPOC_DIRECTORY.filter((s: any) => s.company === "TCS").map((s: any) => (
                  <div key={s.id} style={{ ...card, display: "flex", gap: 12, alignItems: "center", padding: "12px 16px" }}>
                    <div style={{ width: 34, height: 34, borderRadius: "50%", background: P_VOL, border: `1px solid ${B_VOL}22`, flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 700, color: B_VOL }}>
                      {s.name.split(" ").map((n: string) => n[0]).join("").slice(0, 2)}
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 13.5, fontWeight: 700, color: ACCENT_NAVY }}>{s.name}</div>
                      <div style={{ fontSize: 12, color: "#8888a0" }}>{s.role} · {s.geography}</div>
                    </div>
                    <StatusBadge status={s.status} />
                    <div style={{ fontSize: 11, color: "#aaaabc", whiteSpace: "nowrap" }}>{s.lastActive}</div>
                  </div>
                ))}
                <button onClick={() => triggerToast("Add Regional SPOC flow coming soon.")} style={{ background: "none", border: "1.5px solid #dddde8", borderRadius: 10, padding: "10px 16px", fontSize: 13, fontWeight: 600, color: "#6b6b7a", cursor: "pointer", fontFamily: "'DM Sans', sans-serif", marginTop: 4 }}>+ Add Regional SPOC</button>
              </div>
            </CollapsiblePanel>

            <CollapsiblePanel title="Open ProEngage Projects" eyebrow="Share with employees" accentColor={KPI_PROENGAGE}>
              <div style={{ paddingTop: 16, display: "flex", flexDirection: "column", gap: 10 }}>
                {OPEN_PROENGAGE_PROJECTS.map((p: any) => (
                  <div key={p.id} style={{ ...card, display: "flex", gap: 12, alignItems: "center", padding: "13px 16px" }}>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 13.5, fontWeight: 700, color: ACCENT_NAVY }}>{p.title}</div>
                      <div style={{ fontSize: 12, color: "#8888a0", marginTop: 2 }}>{p.ngo}</div>
                      <div style={{ display: "flex", gap: 5, marginTop: 6 }}>
                        {p.skills.map((s: string) => <span key={s} style={{ background: "#E6F4EE", color: KPI_PROENGAGE, fontSize: 11, fontWeight: 600, padding: "2px 8px", borderRadius: 100 }}>{s}</span>)}
                      </div>
                    </div>
                    <button onClick={() => triggerToast("Apply link copied to clipboard.")} style={{ background: KPI_PROENGAGE, color: "#fff", border: "none", borderRadius: 8, padding: "6px 13px", fontSize: 12, fontWeight: 700, cursor: "pointer" }}>Copy Link</button>
                  </div>
                ))}
              </div>
            </CollapsiblePanel>

            {/* Annual Reporting */}
            <div style={{ ...spocCard, marginTop: 12, display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16, padding: "18px 20px" }}>
              <div>
                <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "1.5px", textTransform: "uppercase", color: "#aaaabc", marginBottom: 5 }}>Annual Reporting</div>
                <div style={{ fontSize: 14, fontWeight: 700, color: ACCENT_NAVY, marginBottom: 4 }}>Submit Annual Volunteering Report</div>
                <div style={{ fontSize: 12.5, color: "#8888a0", lineHeight: 1.5 }}>Compile and submit the annual volunteering data for TCS to the TSG reporting portal.</div>
              </div>
              <button onClick={() => triggerToast("Opening annual reporting portal...")} style={{ background: ACCENT_NAVY, color: "#fff", border: "none", borderRadius: 10, padding: "10px 18px", fontSize: 13, fontWeight: 700, cursor: "pointer", whiteSpace: "nowrap", fontFamily: "'DM Sans', sans-serif" }}>Open Portal ↗</button>
            </div>
          </section>
        </div>
      )}

      {/* 5. SPOC RESOURCES */}
      <div style={{ background: "#f0f1f8", borderRadius: 16, padding: "24px 22px", marginBottom: 52 }}>
        <section id="spoc-resources" style={{ scrollMarginTop: 108 }}>
          <SectionHeading eyebrow="Tools & learning" title="SPOC Resources" />
          <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 12, marginBottom: 16 }}>
            {SPOC_RESOURCES.map(r => (
              <ResourceCard key={r.id} r={r} onClick={() => { if (r.id === "emodule") setShowOrientationModal(true); else onNavigate("media"); }} />
            ))}
          </div>
          <div style={{ ...spocCard }}>
            <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "1.5px", textTransform: "uppercase", color: "#aaaabc", marginBottom: 12 }}>SPOC Orientation Progress</div>
            <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 12 }}>
              <div style={{ flex: 1 }}>
                <div style={{ height: 8, background: "#e8e8f0", borderRadius: 4, overflow: "hidden" }}>
                  <div style={{ height: "100%", width: `${(spocData.orientationProgress / spocData.totalOrientationModules) * 100}%`, background: B_VOL, borderRadius: 4 }} />
                </div>
              </div>
              <div style={{ fontSize: 13, fontWeight: 700, color: B_VOL, whiteSpace: "nowrap" }}>{spocData.orientationProgress}/{spocData.totalOrientationModules} modules</div>
            </div>
            <button onClick={() => setShowOrientationModal(true)} style={{ background: B_VOL, color: "#fff", border: "none", borderRadius: 10, padding: "10px 20px", fontSize: 13, fontWeight: 700, cursor: "pointer", fontFamily: "'DM Sans', sans-serif" }}>
              {spocData.orientationProgress < spocData.totalOrientationModules ? "Continue Orientation" : "Review Orientation"}
            </button>
          </div>
        </section>
      </div>
    </>
  );

  return (
    <>
      <div style={{ background: "#f8f9ff", minHeight: "100vh", fontFamily: "'DM Sans', sans-serif", paddingBottom: 80 }}>

        {/* Greeting bar */}
        <div style={{ background: spocMode ? "linear-gradient(135deg, #1a2a5e 0%, #333399 60%, #4376BB 100%)" : "linear-gradient(135deg, #065666 0%, #0B7285 60%, #0891b2 100%)", padding: "92px 40px 28px", display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 24, flexWrap: "wrap" }}>
          <div>
            <div style={{ fontSize: 24, fontWeight: 900, color: "#fff", letterSpacing: -0.5 }}>
              {spocData.firstName}, {spocMode ? "take charge." : "this is your volunteering space."}
            </div>
            <div style={{ fontSize: 14, color: "rgba(255,255,255,0.65)", marginTop: 6, fontWeight: 300 }}>
              {spocMode ? `${spocData.company} · ${spocData.tier}` : "Your story, Your impact."}
            </div>
          </div>

          {spocMode ? (
            <div style={{ background: "rgba(255,255,255,0.12)", border: "1px solid rgba(255,255,255,0.22)", borderRadius: 12, padding: "14px 20px", maxWidth: 360 }}>
              <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "1.5px", textTransform: "uppercase", color: "rgba(255,255,255,0.7)", marginBottom: 5 }}>Company · {spocData.company}</div>
              <div style={{ fontSize: 14, fontWeight: 700, color: "#fff" }}>
                {spocData.stats.activeProEngage} volunteers active · Rank #{COMPANY_LEADERBOARD.find((c: any) => c.name === "TCS")?.rank ?? 2} on leaderboard
              </div>
              <div style={{ fontSize: 12.5, color: "rgba(255,255,255,0.6)", marginTop: 4 }}>
                {spocData.stats.pendingApprovals} registrations pending your approval
              </div>
            </div>
          ) : IS_PE_SEASON && hasActive ? (
            <div style={{ background: "rgba(255,255,255,0.12)", border: "1px solid rgba(255,255,255,0.22)", borderRadius: 12, padding: "14px 20px", maxWidth: 360 }}>
              <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "1.5px", textTransform: "uppercase", color: "rgba(255,255,255,0.7)", marginBottom: 5 }}>Active · ProEngage 2025</div>
              <div style={{ fontSize: 14, fontWeight: 700, color: "#fff", lineHeight: 1.3 }}>{(volData.activeApplication as any).title}</div>
              <div style={{ fontSize: 12.5, color: "rgba(255,255,255,0.6)", marginTop: 4 }}>{(volData.activeApplication as any).ngo}</div>
            </div>
          ) : (
            <div style={{ background: "rgba(255,255,255,0.10)", border: "1px solid rgba(255,255,255,0.18)", borderRadius: 12, padding: "14px 20px", maxWidth: 360 }}>
              <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "1.5px", textTransform: "uppercase", color: "rgba(255,255,255,0.55)", marginBottom: 5 }}>Next ProEngage Edition</div>
              <div style={{ fontSize: 14, fontWeight: 600, color: "rgba(255,255,255,0.85)", lineHeight: 1.4 }}>Opens January 2026. Explore TVW events below.</div>
            </div>
          )}
        </div>

        {/* No tab bar here — toggle lives above the right-rail nav */}

        {/* Body */}
        <div style={{ display: "flex", maxWidth: 1200, margin: "0 auto", padding: "40px 40px 100px", gap: 44 }}>

          <div style={{ flex: 1, minWidth: 0 }}>
            {spocMode ? spocSectionsJSX : volSectionsJSX}
          </div>

          {/* Right rail */}
          <div style={{ width: 148, flexShrink: 0, position: "sticky", top: 108, alignSelf: "flex-start" }}>

            {/* Mode toggle */}
            <div style={{ marginBottom: 24, background: "#fff", border: "1px solid #e8e8f0", borderRadius: 12, padding: "10px 10px 10px" }}>
              <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: "1.6px", textTransform: "uppercase", color: "#c0c0cc", marginBottom: 8, paddingLeft: 2 }}>View</div>
              {/* Slider track */}
              <div style={{ position: "relative", background: "#f0f1f7", borderRadius: 8, padding: 3, display: "flex", gap: 0 }}>
                {/* Sliding pill */}
                <div style={{
                  position: "absolute", top: 3, left: spocMode ? "calc(50% + 1.5px)" : 3,
                  width: "calc(50% - 4.5px)", bottom: 3,
                  background: spocMode ? B_SPOC_TOG : B_VOL,
                  borderRadius: 6,
                  transition: "left 0.22s cubic-bezier(0.4,0,0.2,1), background 0.22s",
                  boxShadow: "0 1px 4px rgba(0,0,0,0.14)",
                }} />
                {[{ id: false, label: "My Space" }, { id: true, label: "SPOC" }].map(t => (
                  <button key={String(t.id)}
                    onClick={() => { setSpocMode(t.id); setStatsStarted(false); setTimeout(() => setStatsStarted(true), 300); }}
                    style={{
                      flex: 1, position: "relative", zIndex: 1,
                      background: "none", border: "none", borderRadius: 6,
                      padding: "7px 4px",
                      fontSize: 11.5, fontWeight: spocMode === t.id ? 700 : 500,
                      color: spocMode === t.id ? "#fff" : "#9090a8",
                      cursor: "pointer", fontFamily: "'DM Sans', sans-serif",
                      transition: "color 0.22s",
                      whiteSpace: "nowrap",
                    }}>
                    {t.label}
                  </button>
                ))}
              </div>
            </div>

            <div style={{ fontSize: 9.5, fontWeight: 700, letterSpacing: "1.8px", textTransform: "uppercase", color: "#c0c0cc", marginBottom: 12 }}>On this page</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 1 }}>
              {currentSections.map(s => {
                const on = activeSection === s.id;
                const railAccent = spocMode ? B_SPOC_TOG : B_VOL;
                const railPastel = spocMode ? P_SPOC : P_VOL;
                return (
                  <button key={s.id} onClick={() => scrollTo(s.id)}
                    style={{ display: "flex", alignItems: "center", gap: 10, padding: "9px 10px", borderRadius: 8, border: "none", background: on ? railPastel : "transparent", cursor: "pointer", textAlign: "left", transition: "background 0.18s", fontFamily: "'DM Sans', sans-serif" }}>
                    <div style={{ width: 2, height: 12, borderRadius: 2, background: on ? railAccent : "#dddde8", flexShrink: 0, transition: "background 0.18s" }} />
                    <span style={{ fontSize: 12.5, fontWeight: on ? 700 : 400, color: on ? railAccent : "#aaaabc", transition: "color 0.18s" }}>{s.label}</span>
                  </button>
                );
              })}
            </div>
            <div style={{ marginTop: 28 }}>
              <div style={{ fontSize: 9.5, fontWeight: 700, letterSpacing: "1.8px", textTransform: "uppercase", color: "#c0c0cc", marginBottom: 12 }}>Quick Links</div>
              {[
                { label: "Edit Profile",  action: () => onNavigate("profile") },
                { label: "Orientation",   action: () => setShowOrientationModal(true) },
                { label: "Raise Grievance", action: () => setGrievanceOpen(true) },
                { label: "Media Library", action: () => onNavigate("media") },
              ].map(a => (
                <button key={a.label} onClick={a.action}
                  style={{ display: "block", width: "100%", background: "none", border: "none", padding: "7px 10px", borderRadius: 8, fontSize: 12.5, color: "#8888a0", cursor: "pointer", textAlign: "left", fontFamily: "'DM Sans', sans-serif", transition: "background 0.15s, color 0.15s" }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "#f0f0f8"; (e.currentTarget as HTMLElement).style.color = ACCENT_NAVY; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "none"; (e.currentTarget as HTMLElement).style.color = "#8888a0"; }}>
                  {a.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <TVWRegDrawer event={tvwRegEvent} onClose={() => setTvwRegEvent(null)} triggerToast={triggerToast} />
      {drawerApp && (
        <DrawerShell open={!!drawerApp} onClose={() => setDrawerApp(null)} title={drawerApp.project} subtitle={`${drawerApp.ngo} · ${drawerApp.skillArea}`} accentTag={`${drawerApp.type} · ${drawerApp.edition}`}>
          <div style={{ padding: "24px 28px 0" }}><StatusBadge status={drawerApp.status} /></div>
          <div style={{ padding: "20px 28px 32px" }}>
            <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "1.5px", textTransform: "uppercase", color: "#aaaabc", marginBottom: 20 }}>Application Timeline</div>
            <div style={{ position: "relative" }}>
              <div style={{ position: "absolute", left: 11, top: 0, bottom: 0, width: 2, background: "#e8e8f0" }} />
              {drawerApp.timeline.map((step, i) => (
                <div key={i} style={{ display: "flex", gap: 18, marginBottom: 24, position: "relative" }}>
                  <div style={{ width: 24, height: 24, borderRadius: "50%", background: step.done ? B_BLUE : "#fff", border: `2.5px solid ${step.done ? B_BLUE : "#dddde8"}`, flexShrink: 0, zIndex: 1, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    {step.done && <svg width="10" height="8" viewBox="0 0 10 8" fill="none"><path d="M1 4l3 3 5-6" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>}
                  </div>
                  <div style={{ paddingTop: 2 }}>
                    <div style={{ fontSize: 13.5, fontWeight: step.done ? 600 : 400, color: step.done ? ACCENT_NAVY : "#aaaabc" }}>{step.label}</div>
                    <div style={{ fontSize: 12, color: "#aaaabc", marginTop: 2 }}>{step.date}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </DrawerShell>
      )}
      <ProjectUpdateDrawer open={updateOpen} onClose={() => setUpdateOpen(false)} project={volData.activeApplication} />
      <FeedbackVolDrawer open={feedbackOpen} onClose={() => setFeedbackOpen(false)} project={volData.activeApplication} />
      <GrievanceVolDrawer open={grievanceOpen} onClose={() => setGrievanceOpen(false)} />
      <ApplyVolDrawer project={applyProject} onClose={() => setApplyProject(null)} />
      <ReferralVolDrawer open={referralOpen} onClose={() => setReferralOpen(false)} />
      <ShareVolDrawer open={shareOpen} onClose={() => setShareOpen(false)} />

      <DrawerShell open={createEventOpen} onClose={() => setCreateEventOpen(false)} title="Post a TVW Event" subtitle="Goes live on the TVW calendar within 5 minutes" accentTag="TVW 22" accentColor={KPI_TVW}>
        <div style={{ padding: "24px 28px" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 16, marginBottom: 22 }}>
            {([["Event Title", evTitle, setEvTitle, "e.g. Beach Clean-up Drive"], ["Date", evDate, setEvDate, "DD/MM/YYYY"], ["Venue / Link", evVenue, setEvVenue, "Address or video call URL"], ["Capacity", evCap, setEvCap, "Max no. of volunteers"]] as const).map(([label, val, setter, ph]) => (
              <div key={label}>
                <div style={{ fontSize: 10.5, fontWeight: 700, color: "#aaaabc", textTransform: "uppercase", letterSpacing: "0.8px", marginBottom: 7 }}>{label}</div>
                <input type="text" value={val} onChange={e => (setter as any)(e.target.value)} placeholder={ph} style={inp}
                  onFocus={e => (e.target.style.borderColor = KPI_TVW)} onBlur={e => (e.target.style.borderColor = "#e0e0e8")} />
              </div>
            ))}
            <div>
              <div style={{ fontSize: 10.5, fontWeight: 700, color: "#aaaabc", textTransform: "uppercase", letterSpacing: "0.8px", marginBottom: 7 }}>Mode</div>
              <div style={{ display: "flex", gap: 8 }}>
                {["In-Person", "Virtual", "Hybrid"].map(m => (
                  <button key={m} onClick={() => setEvMode(m)} style={{ flex: 1, padding: "9px", borderRadius: 8, border: `1.5px solid ${evMode === m ? KPI_TVW : "#dddde8"}`, background: evMode === m ? P_BLUE : "#fff", color: evMode === m ? KPI_TVW : "#666", fontSize: 13, fontWeight: evMode === m ? 700 : 400, cursor: "pointer", fontFamily: "'DM Sans', sans-serif" }}>{m}</button>
                ))}
              </div>
            </div>
          </div>
          <button disabled={!evTitle.trim() || !evDate.trim()} onClick={() => { setCreateEventOpen(false); triggerToast("Event posted to TVW calendar — live within 5 minutes."); setEvTitle(""); setEvDate(""); setEvVenue(""); setEvCap(""); }}
            style={{ width: "100%", background: evTitle.trim() && evDate.trim() ? KPI_TVW : "#e0e0e8", color: evTitle.trim() && evDate.trim() ? "#fff" : "#aaa", border: "none", borderRadius: 10, padding: "13px", fontSize: 14, fontWeight: 700, cursor: evTitle.trim() && evDate.trim() ? "pointer" : "not-allowed", fontFamily: "'DM Sans', sans-serif" }}>
            Post Event
          </button>
        </div>
      </DrawerShell>
    </>
  );
}
