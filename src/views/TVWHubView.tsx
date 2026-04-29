import { useState } from "react";
import { Search, Calendar, MapPin, CalendarDays, List, Check, Download, FileText, Camera, BookOpen, X, Upload, ChevronDown } from "lucide-react";

import { TVW_EVENTS } from "@/data/mockData";
import { useAppContext } from "@/context/AppContext";
import { useAppNavigate } from "@/hooks/useAppNavigate";
import SubPageDotRail from "@/components/shared/SubPageDotRail";
import { TickerBar } from "@/components/shared/HomeSections";
import tvwHeroImg from "@/assets/banner_photos/TVW Inner Banner.JPG";
import tvwVibeImg from "@/assets/banner_photos/TVW Inner Page below Banner.jpg";

// ── Tokens ────────────────────────────────────────────────────────────────────
const B_YELLOW    = "#F5A623";
const B_TEAL      = "#00A896";
const ACCENT_NAVY = "#0D1B3E";
const TVW_BLUE    = "#135EA9";

const FONT = "'DM Sans','Noto Sans',ui-sans-serif,system-ui,sans-serif";

const DIAG_TEXTURE: React.CSSProperties = {
  position: "absolute", inset: 0,
  backgroundImage: "repeating-linear-gradient(45deg,rgba(255,255,255,0.035) 1px,transparent 1px)",
  backgroundSize: "28px 28px",
  pointerEvents: "none",
};

const SECTIONS_NAV = [
  { id: "tvw-hero",       label: "Overview"  },
  { id: "tvw-events",     label: "Events"    },
  { id: "tvw-vibe",       label: "TVW Vibe"  },
  { id: "tvw-collateral", label: "Resources" },
];

const VIBE_STORIES = [
  { location: "Mumbai",  caption: "Teaching digital literacy to senior citizens at a local community centre.", status: "Published"    },
  { location: "Pune",    caption: "Tree plantation drive across 3 campuses — 500 saplings in one morning.",   status: "Published"    },
  { location: "Chennai", caption: "Blood donation camp organised with Rotary Club partnership.",               status: "Under Review" },
];

const VIBE_CATEGORIES = ["Education", "Environment", "Health", "Animal Welfare", "Disaster Relief", "Community Development", "Other"];

const RESOURCES = [
  { title: "Campaign Kit",           desc: "Posters, banners and social media templates for TVW 2025.", icon: FileText, photo: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=400&q=80", action: "download" as const },
  { title: "Volunteer Handbook",     desc: "Guidelines, FAQs and best practices for first-time volunteers.", icon: BookOpen, photo: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=400&q=80", action: "navigate" as const },
  { title: "Photo Submission Guide", desc: "How to capture, tag and submit your volunteering photos.",    icon: Camera,   photo: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=400&q=80", action: "download" as const },
];

// ── Shared Drawer Shell ───────────────────────────────────────────────────────
function DrawerShell({ onClose, title, subtitle, accentTag, children }: {
  onClose: () => void; title: string; subtitle?: string; accentTag?: string; children: React.ReactNode;
}) {
  return (
    <div
      style={{ position: "fixed", inset: 0, zIndex: 300, display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(13,27,62,0.45)", backdropFilter: "blur(2px)" }}
      onClick={e => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div style={{ background: "#fff", borderRadius: 16, width: "min(540px,92vw)", maxHeight: "88vh", overflow: "hidden", display: "flex", flexDirection: "column", animation: "drawerScale 0.18s ease-out forwards", boxShadow: "0 24px 64px rgba(0,0,0,0.22)" }}>
        <style>{`@keyframes drawerScale{from{transform:scale(0.97);opacity:0}to{transform:scale(1);opacity:1}}`}</style>
        {/* Header */}
        <div style={{ background: ACCENT_NAVY, padding: "22px 28px", flexShrink: 0 }}>
          <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 12 }}>
            <div>
              {accentTag && (
                <div style={{ display: "inline-block", background: `${B_YELLOW}22`, border: `1px solid ${B_YELLOW}44`, borderRadius: 100, padding: "3px 10px", fontSize: 10.5, fontWeight: 700, color: B_YELLOW, letterSpacing: "0.6px", textTransform: "uppercase", marginBottom: 10, fontFamily: FONT }}>
                  {accentTag}
                </div>
              )}
              <div style={{ fontFamily: FONT, fontSize: 17, fontWeight: 700, color: "#fff", lineHeight: 1.25 }}>{title}</div>
              {subtitle && <div style={{ fontFamily: FONT, fontSize: 13, color: "rgba(255,255,255,0.55)", marginTop: 4 }}>{subtitle}</div>}
            </div>
            <button onClick={onClose} style={{ background: "rgba(255,255,255,0.1)", border: "none", borderRadius: 8, padding: "6px 10px", cursor: "pointer", color: "rgba(255,255,255,0.7)", display: "flex", alignItems: "center", gap: 6, fontSize: 12, fontFamily: FONT, flexShrink: 0 }}>
              <X size={14} /> Close
            </button>
          </div>
        </div>
        {/* Scrollable body */}
        <div style={{ padding: "24px 28px", overflowY: "auto", flex: 1 }}>{children}</div>
      </div>
    </div>
  );
}

// ── Vibe Submission Drawer ────────────────────────────────────────────────────
function VibeSubmitDrawer({ onClose, onSubmit }: { onClose: () => void; onSubmit: () => void }) {
  const [form, setForm] = useState({ location: "", category: "", caption: "", impact: "", fileName: "" });
  const [errors, setErrors] = useState<Record<string, boolean>>({});

  const set = (k: string, v: string) => { setForm(f => ({ ...f, [k]: v })); setErrors(e => ({ ...e, [k]: false })); };

  const handleSubmit = () => {
    const required = ["location", "category", "caption"];
    const newErrors: Record<string, boolean> = {};
    required.forEach(k => { if (!form[k as keyof typeof form].trim()) newErrors[k] = true; });
    if (Object.keys(newErrors).length) { setErrors(newErrors); return; }
    onSubmit();
  };

  const inputStyle = (err?: boolean): React.CSSProperties => ({
    width: "100%", padding: "10px 14px", border: `1.5px solid ${err ? "#E8401C" : "#e0e0e8"}`, borderRadius: 10,
    fontSize: 13.5, fontFamily: FONT, color: ACCENT_NAVY, outline: "none", background: "#fff", boxSizing: "border-box",
  });

  const labelStyle: React.CSSProperties = { fontFamily: FONT, fontSize: 12, fontWeight: 700, color: "#64748b", textTransform: "uppercase", letterSpacing: "0.6px", marginBottom: 6, display: "block" };

  return (
    <DrawerShell onClose={onClose} title="Submit a TVW Vibe Story" subtitle="Your moment goes to Admin review before publishing." accentTag="TVW Vibe">
      <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>

        {/* Location */}
        <div>
          <label style={labelStyle}>Location <span style={{ color: "#E8401C" }}>*</span></label>
          <input type="text" placeholder="e.g. Mumbai, Delhi, Virtual" value={form.location} onChange={e => set("location", e.target.value)}
            style={inputStyle(errors.location)}
            onFocus={e => (e.target.style.borderColor = TVW_BLUE)} onBlur={e => (e.target.style.borderColor = errors.location ? "#E8401C" : "#e0e0e8")} />
          {errors.location && <p style={{ fontFamily: FONT, fontSize: 12, color: "#E8401C", margin: "4px 0 0" }}>Required</p>}
        </div>

        {/* Category */}
        <div>
          <label style={labelStyle}>Cause Area <span style={{ color: "#E8401C" }}>*</span></label>
          <div style={{ position: "relative" }}>
            <select value={form.category} onChange={e => set("category", e.target.value)}
              style={{ ...inputStyle(errors.category), appearance: "none", paddingRight: 36, cursor: "pointer" }}>
              <option value="">Select a category</option>
              {VIBE_CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
            <ChevronDown size={15} style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", color: "#94a3b8", pointerEvents: "none" }} />
          </div>
          {errors.category && <p style={{ fontFamily: FONT, fontSize: 12, color: "#E8401C", margin: "4px 0 0" }}>Required</p>}
        </div>

        {/* Caption */}
        <div>
          <label style={labelStyle}>Story Caption <span style={{ color: "#E8401C" }}>*</span></label>
          <textarea rows={3} placeholder="Describe the volunteering moment in 1–2 sentences…" value={form.caption} onChange={e => set("caption", e.target.value)}
            style={{ ...inputStyle(errors.caption), resize: "vertical", lineHeight: 1.6 }}
            onFocus={e => (e.target.style.borderColor = TVW_BLUE)} onBlur={e => (e.target.style.borderColor = errors.caption ? "#E8401C" : "#e0e0e8")} />
          {errors.caption && <p style={{ fontFamily: FONT, fontSize: 12, color: "#E8401C", margin: "4px 0 0" }}>Required</p>}
        </div>

        {/* Impact (optional) */}
        <div>
          <label style={labelStyle}>Impact / Outcome <span style={{ color: "#94a3b8", fontWeight: 400, textTransform: "none", letterSpacing: 0 }}>(optional)</span></label>
          <input type="text" placeholder="e.g. 200 meals served, 50 children taught" value={form.impact} onChange={e => set("impact", e.target.value)}
            style={inputStyle()}
            onFocus={e => (e.target.style.borderColor = TVW_BLUE)} onBlur={e => (e.target.style.borderColor = "#e0e0e8")} />
        </div>

        {/* Photo upload (simulated) */}
        <div>
          <label style={labelStyle}>Photo <span style={{ color: "#94a3b8", fontWeight: 400, textTransform: "none", letterSpacing: 0 }}>(optional)</span></label>
          <div
            onClick={() => set("fileName", "volunteer-photo.jpg")}
            style={{ border: "2px dashed #e0e0e8", borderRadius: 10, padding: "20px", textAlign: "center", cursor: "pointer", background: form.fileName ? "#f0fdf4" : "#fafafa", transition: "border-color 0.15s, background 0.15s" }}
            onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.borderColor = TVW_BLUE; }}
            onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.borderColor = "#e0e0e8"; }}
          >
            {form.fileName ? (
              <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
                <Check size={16} style={{ color: "#16a34a" }} />
                <span style={{ fontFamily: FONT, fontSize: 13, fontWeight: 600, color: "#16a34a" }}>{form.fileName}</span>
                <button onClick={e => { e.stopPropagation(); set("fileName", ""); }} style={{ background: "none", border: "none", cursor: "pointer", color: "#94a3b8", padding: 0 }}><X size={13} /></button>
              </div>
            ) : (
              <>
                <Upload size={20} style={{ color: "#94a3b8", margin: "0 auto 6px" }} />
                <div style={{ fontFamily: FONT, fontSize: 13, fontWeight: 600, color: "#64748b" }}>Click to upload a photo</div>
                <div style={{ fontFamily: FONT, fontSize: 11, color: "#94a3b8", marginTop: 3 }}>JPG or PNG · Max 5 MB</div>
              </>
            )}
          </div>
        </div>

        {/* Note */}
        <div style={{ background: "#FEF6E4", border: "1px solid #fde68a", borderRadius: 10, padding: "12px 16px", fontSize: 13, color: "#78350f", fontFamily: FONT }}>
          📋 Stories go to Admin moderation — only published once approved. You'll receive a confirmation email after submission.
        </div>

        {/* Submit */}
        <button onClick={handleSubmit}
          style={{ background: TVW_BLUE, color: "#fff", border: "none", borderRadius: 10, padding: "14px", fontSize: 14, fontWeight: 700, cursor: "pointer", fontFamily: FONT }}>
          Submit Story for Review
        </button>
      </div>
    </DrawerShell>
  );
}

// ── Event Card ────────────────────────────────────────────────────────────────
function EventCard({ event, isRegistered, onContact }: { event: typeof TVW_EVENTS[0]; isRegistered: boolean; onContact: () => void }) {
  const [hov, setHov] = useState(false);
  const isFull = event.capacity === "Full";
  return (
    <div
      style={{ background: "#fff", border: "1px solid #e8e8f0", borderRadius: 14, overflow: "hidden", display: "flex", flexDirection: "column", transform: hov ? "translateY(-3px)" : "translateY(0)", boxShadow: hov ? "0 8px 28px rgba(13,27,62,0.10)" : "none", transition: "transform 0.18s, box-shadow 0.18s" }}
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
    >
      <div style={{ height: 3, background: TVW_BLUE }} />
      <div style={{ padding: "20px 22px", flex: 1, display: "flex", flexDirection: "column" }}>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 12 }}>
          <span style={{ background: event.mode === "Virtual" ? "#e0f2fe" : "#ede9fe", color: event.mode === "Virtual" ? "#0369a1" : "#6d28d9", fontSize: 11, fontWeight: 700, padding: "2px 9px", borderRadius: 100, fontFamily: FONT }}>
            {event.mode}
          </span>
          {isRegistered && (
            <span style={{ display: "inline-flex", alignItems: "center", gap: 4, background: B_TEAL, color: "#fff", fontSize: 11, fontWeight: 700, padding: "2px 9px", borderRadius: 100, fontFamily: FONT }}>
              <Check size={11} /> Registered
            </span>
          )}
          {isFull && !isRegistered && (
            <span style={{ background: "#fef2f2", color: "#E8401C", fontSize: 11, fontWeight: 700, padding: "2px 9px", borderRadius: 100, fontFamily: FONT }}>Full</span>
          )}
        </div>
        <div style={{ fontFamily: FONT, fontSize: 10, fontWeight: 700, color: "#94a3b8", letterSpacing: "0.6px", textTransform: "uppercase", marginBottom: 6 }}>{event.company}</div>
        <h3 style={{ fontFamily: FONT, fontSize: 14, fontWeight: 700, color: ACCENT_NAVY, margin: "0 0 8px", lineHeight: 1.3, flex: 1 }}>{event.title}</h3>
        <p style={{ fontFamily: FONT, fontSize: 13, color: "#64748b", lineHeight: 1.55, margin: "0 0 16px" }}>{event.description}</p>
        <div style={{ display: "flex", flexDirection: "column", gap: 6, marginBottom: 18 }}>
          {[
            { icon: <Calendar size={13} style={{ color: "#94a3b8" }} />, text: event.date },
            { icon: <MapPin    size={13} style={{ color: "#94a3b8" }} />, text: event.location },
          ].map(({ icon, text }, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, color: "#475569", fontFamily: FONT }}>{icon}{text}</div>
          ))}
        </div>
        <button
          onClick={e => { e.stopPropagation(); onContact(); }}
          style={{ background: TVW_BLUE, color: "#fff", border: "none", borderRadius: 10, padding: "12px", fontSize: 13, fontWeight: 700, cursor: "pointer", fontFamily: FONT }}
        >
          Contact SPOC to Register
        </button>
      </div>
    </div>
  );
}

// ── Calendar View ─────────────────────────────────────────────────────────────
function CalendarView({ events, onContact }: { events: typeof TVW_EVENTS; onContact: (ev: typeof TVW_EVENTS[0]) => void }) {
  return (
    <div style={{ background: "#fff", borderRadius: 14, border: "1px solid #e8e8f0", overflow: "hidden" }}>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(7,1fr)", borderBottom: "1px solid #e8e8f0" }}>
        {["Sun","Mon","Tue","Wed","Thu","Fri","Sat"].map(d => (
          <div key={d} style={{ padding: "12px 8px", textAlign: "center", fontSize: 11, fontWeight: 700, color: "#94a3b8", letterSpacing: "1px", textTransform: "uppercase", fontFamily: FONT }}>{d}</div>
        ))}
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(7,1fr)" }}>
        {Array.from({ length: 30 }).map((_, i) => {
          const day = i + 1;
          const hasEvent = events.find(e => e.date.includes(`June ${day}`));
          return (
            <div key={i} style={{ minHeight: 100, padding: "10px 8px", borderRight: (i+1)%7 !== 0 ? "1px solid #f0f0f5" : "none", borderBottom: "1px solid #f0f0f5" }}>
              <span style={{ fontSize: 12, fontWeight: 700, color: "#cbd5e1", display: "block", marginBottom: 4, fontFamily: FONT }}>{day}</span>
              {hasEvent && (
                <div onClick={() => onContact(hasEvent)} style={{ background: "#EEF4FF", border: "1px solid #bfdbfe", borderRadius: 6, padding: "4px 6px", cursor: "pointer" }}>
                  <div style={{ fontSize: 11, fontWeight: 700, color: TVW_BLUE, lineHeight: 1.3, fontFamily: FONT }}>{hasEvent.title}</div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ── Resource Card ─────────────────────────────────────────────────────────────
function ResourceCard({ resource, onClick }: { resource: typeof RESOURCES[0]; onClick: () => void }) {
  const [hov, setHov] = useState(false);
  const IconComp = resource.icon;
  return (
    <div
      onClick={onClick}
      style={{ background: "#fff", border: "1px solid #e8e8f0", borderRadius: 14, overflow: "hidden", cursor: "pointer", transform: hov ? "translateY(-3px)" : "translateY(0)", boxShadow: hov ? "0 8px 28px rgba(13,27,62,0.10)" : "none", transition: "transform 0.18s, box-shadow 0.18s" }}
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
    >
      <div style={{ height: 140, overflow: "hidden" }}>
        <img src={resource.photo} alt={resource.title} style={{ width: "100%", height: "100%", objectFit: "cover", transform: hov ? "scale(1.05)" : "scale(1)", transition: "transform 0.5s" }} referrerPolicy="no-referrer" />
      </div>
      <div style={{ padding: "18px 20px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
          <IconComp size={15} style={{ color: TVW_BLUE }} />
          <h3 style={{ fontFamily: FONT, fontSize: 14, fontWeight: 700, color: ACCENT_NAVY, margin: 0 }}>{resource.title}</h3>
        </div>
        <p style={{ fontFamily: FONT, fontSize: 13, color: "#64748b", lineHeight: 1.55, marginBottom: 14 }}>{resource.desc}</p>
        <div style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 12, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.8px", fontFamily: FONT, color: TVW_BLUE }}>
          {resource.action === "navigate" ? (
            <><BookOpen size={13} /> View Handbook →</>
          ) : (
            <><Download size={13} /> Download</>
          )}
        </div>
      </div>
    </div>
  );
}

// ── Main View ─────────────────────────────────────────────────────────────────
const TVWHubView = () => {
  const { registeredEvents, triggerToast } = useAppContext();
  const navigate = useAppNavigate();

  const [viewMode,      setViewMode]      = useState<"list"|"calendar">("list");
  const [filters,       setFilters]       = useState({ location: "All", mode: "All" });
  const [search,        setSearch]        = useState("");
  const [spocModal,     setSpocModal]     = useState<typeof TVW_EVENTS[0] | null>(null);
  const [showVibeForm,  setShowVibeForm]  = useState(false);

  const filteredEvents = TVW_EVENTS.filter(ev => {
    const q = search.toLowerCase();
    return (
      (ev.title.toLowerCase().includes(q) || ev.description.toLowerCase().includes(q)) &&
      (filters.location === "All" || ev.location.includes(filters.location)) &&
      (filters.mode === "All" || ev.mode === filters.mode)
    );
  });

  const handleResourceClick = (resource: typeof RESOURCES[0]) => {
    if (resource.action === "navigate") {
      navigate("volunteering-guidelines");
    } else {
      triggerToast(`Downloading ${resource.title}...`);
    }
  };

  return (
    // FIX: removed overflow:hidden (was creating stacking context that constrained fixed TickerBar width → caused text wrapping)
    // FIX: added paddingBottom:48 so last section content clears the fixed ticker
    <div style={{ fontFamily: FONT, background: "#f7f8fc", minHeight: "100vh", paddingBottom: 48 }}>
      <div style={{ height: 3, background: TVW_BLUE, width: "100%" }} />
      <SubPageDotRail sections={SECTIONS_NAV} accentColor={TVW_BLUE} />

      {/* ══ HERO ══ */}
      <div id="tvw-hero" style={{ position: "relative", minHeight: "92vh", display: "flex", alignItems: "center", overflow: "hidden", paddingTop: 64 }}>
        <img src={tvwHeroImg} alt="" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "center" }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(105deg,rgba(8,12,22,0.88) 0%,rgba(8,12,22,0.70) 40%,rgba(8,12,22,0.28) 75%,rgba(8,12,22,0.08) 100%)" }} />
        <div style={DIAG_TEXTURE} />
        <div style={{ position: "relative", zIndex: 1, maxWidth: 1100, margin: "0 auto", padding: "0 64px", width: "100%" }}>
          <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "1.8px", textTransform: "uppercase", color: "rgba(255,255,255,0.5)", marginBottom: 12, fontFamily: FONT }}>
            Tata Engage · Tata Volunteering Week · Edition 2025
          </p>
          <div style={{ width: 48, height: 2, borderRadius: 2, background: B_YELLOW, marginBottom: 22 }} />
          <h1 style={{ fontFamily: FONT, fontSize: "clamp(2.2rem,4vw,3.4rem)", fontWeight: 400, letterSpacing: "-0.5px", lineHeight: 1.12, color: "#fff", margin: "0 0 18px" }}>
            Make Every Hour Count
          </h1>
          <p style={{ fontFamily: FONT, fontSize: 15, fontWeight: 300, color: "rgba(255,255,255,0.65)", lineHeight: 1.7, maxWidth: 480, margin: "0 0 32px" }}>
            One week. Every Tata company. Thousands of acts of service — coming together to drive real community impact.
          </p>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap", alignItems: "center" }}>
            <button
              onClick={() => document.getElementById("tvw-events")?.scrollIntoView({ behavior: "smooth" })}
              style={{ background: TVW_BLUE, color: "#fff", border: "none", borderRadius: 10, padding: "12px 28px", fontSize: 14, fontWeight: 700, cursor: "pointer", fontFamily: FONT }}
            >
              Browse Events
            </button>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.18)", borderRadius: 100, padding: "10px 20px" }}>
              <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#4ade80" }} />
              <span style={{ fontSize: 13, fontWeight: 600, color: "rgba(255,255,255,0.8)", fontFamily: FONT }}>22 Sep – 4 Oct 2025 · Active</span>
            </div>
          </div>
        </div>
      </div>

      {/* ══ EVENTS ══ */}
      <div id="tvw-events" style={{ maxWidth: 1200, margin: "0 auto", padding: "56px 48px 80px" }}>
        <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "1.8px", textTransform: "uppercase", color: "#aaaabc", margin: "0 0 6px", fontFamily: FONT }}>Browse & Register</p>
        <div style={{ width: 36, height: 3, borderRadius: 2, background: TVW_BLUE, marginBottom: 16 }} />
        <h2 style={{ fontSize: 22, fontWeight: 900, color: ACCENT_NAVY, margin: "0 0 28px", letterSpacing: "-0.3px", fontFamily: FONT }}>TVW 2025 Events</h2>

        {/* Controls */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: 12, marginBottom: 28, alignItems: "center" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 2, background: "#fff", padding: 4, borderRadius: 10, border: "1.5px solid #e0e0e8" }}>
            {(["list","calendar"] as const).map(mode => (
              <button key={mode} onClick={() => setViewMode(mode)}
                style={{ display:"flex",alignItems:"center",gap:6,padding:"7px 14px",borderRadius:7,border:"none",fontSize:13,fontWeight:600,cursor:"pointer",fontFamily:FONT,background:viewMode===mode?TVW_BLUE:"transparent",color:viewMode===mode?"#fff":"#64748b",transition:"all 0.15s" }}>
                {mode === "list" ? <List size={15}/> : <CalendarDays size={15}/>}
                {mode === "list" ? "List" : "Calendar"}
              </button>
            ))}
          </div>
          <div style={{ flex: 1, position: "relative", minWidth: 220 }}>
            <Search size={16} style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", color: "#aaaabc" }} />
            <input type="text" placeholder="Search events…" value={search} onChange={e => setSearch(e.target.value)}
              style={{ width:"100%",paddingLeft:40,paddingRight:14,paddingTop:11,paddingBottom:11,border:"1.5px solid #e0e0e8",borderRadius:10,fontSize:13.5,fontFamily:FONT,color:ACCENT_NAVY,outline:"none",background:"#fff",boxSizing:"border-box" }}
              onFocus={e=>(e.target.style.borderColor=TVW_BLUE)} onBlur={e=>(e.target.style.borderColor="#e0e0e8")}/>
          </div>
          <select value={filters.location} onChange={e=>setFilters({...filters,location:e.target.value})}
            style={{ padding:"10px 14px",border:"1.5px solid #e0e0e8",borderRadius:10,fontSize:13,fontFamily:FONT,color:ACCENT_NAVY,background:"#fff",outline:"none",cursor:"pointer" }}>
            <option value="All">All Locations</option>
            {["Mumbai","Pune","Chennai","Virtual"].map(l=><option key={l} value={l}>{l}</option>)}
          </select>
          <select value={filters.mode} onChange={e=>setFilters({...filters,mode:e.target.value})}
            style={{ padding:"10px 14px",border:"1.5px solid #e0e0e8",borderRadius:10,fontSize:13,fontFamily:FONT,color:ACCENT_NAVY,background:"#fff",outline:"none",cursor:"pointer" }}>
            <option value="All">All Modes</option>
            <option value="In-person">In-person</option>
            <option value="Virtual">Virtual</option>
          </select>
        </div>

        {viewMode === "list" ? (
          <div style={{ display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(320px,1fr))",gap:16 }}>
            {filteredEvents.map(ev => (
              <EventCard key={ev.id} event={ev} isRegistered={registeredEvents.includes(ev.id)} onContact={()=>setSpocModal(ev)} />
            ))}
            {filteredEvents.length === 0 && (
              <div style={{ gridColumn:"1/-1",textAlign:"center",padding:"64px 0",color:"#94a3b8",fontFamily:FONT }}>
                <div style={{ fontSize:32,marginBottom:12 }}>🔍</div>
                <div style={{ fontSize:15,fontWeight:600 }}>No events match your filters</div>
              </div>
            )}
          </div>
        ) : (
          <CalendarView events={filteredEvents} onContact={ev=>setSpocModal(ev)} />
        )}
      </div>

      {/* ══ TVW VIBE ══ */}
      {/* FIX: removed overflow:hidden — it created a new stacking context that constrained the width of the fixed TickerBar, causing it to wrap */}
      <section id="tvw-vibe" style={{ position:"relative" }}>
        <img src={tvwVibeImg} alt="" style={{ position:"absolute",inset:0,width:"100%",height:"100%",objectFit:"cover",objectPosition:"center" }}/>
        <div style={{ position:"absolute",inset:0,background:"linear-gradient(105deg,rgba(8,12,22,0.90) 0%,rgba(8,12,22,0.75) 50%,rgba(8,12,22,0.55) 100%)" }}/>
        <div style={DIAG_TEXTURE}/>
        <div style={{ position:"relative",zIndex:1,maxWidth:1100,margin:"0 auto",padding:"96px 64px" }}>
          <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:80,alignItems:"start" }}>
            {/* Left */}
            <div>
              <p style={{ fontSize:11,fontWeight:700,letterSpacing:"1.8px",textTransform:"uppercase",color:"rgba(255,255,255,0.45)",marginBottom:8,fontFamily:FONT }}>Community Stories</p>
              <div style={{ width:36,height:2,borderRadius:2,background:B_YELLOW,marginBottom:20 }}/>
              <h2 style={{ fontFamily:FONT,fontSize:30,fontWeight:900,color:"#fff",letterSpacing:"-0.5px",margin:"0 0 18px" }}>TVW Vibe</h2>
              <p style={{ fontFamily:FONT,fontSize:15,fontWeight:300,color:"rgba(255,255,255,0.65)",lineHeight:1.7,marginBottom:32 }}>
                Volunteering moments from across the Tata Group — submitted by SPOCs and reviewed by Admin before going live.
              </p>
              <button onClick={() => setShowVibeForm(true)}
                style={{ background:B_YELLOW,color:ACCENT_NAVY,border:"none",borderRadius:10,padding:"12px 24px",fontSize:14,fontWeight:800,cursor:"pointer",fontFamily:FONT }}>
                Submit Your Story
              </button>
            </div>

            {/* Right — story cards */}
            <div style={{ display:"flex",flexDirection:"column",gap:12 }}>
              {VIBE_STORIES.map((s,i) => (
                <div key={i} style={{ background:"rgba(255,255,255,0.08)",border:"1px solid rgba(255,255,255,0.12)",borderRadius:12,padding:"18px 20px" }}>
                  <div style={{ display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:10 }}>
                    <span style={{ fontFamily:FONT,fontSize:10,fontWeight:700,letterSpacing:"1px",textTransform:"uppercase",color:"#93c5fd",background:"rgba(147,197,253,0.12)",borderRadius:100,padding:"3px 10px" }}>{s.location}</span>
                    <span style={{ fontFamily:FONT,fontSize:10,fontWeight:700,letterSpacing:"1px",textTransform:"uppercase",borderRadius:100,padding:"3px 10px",color:s.status==="Published"?"#4ade80":"#fbbf24",background:s.status==="Published"?"rgba(74,222,128,0.12)":"rgba(251,191,36,0.12)" }}>{s.status}</span>
                  </div>
                  <p style={{ fontFamily:FONT,fontSize:14,color:"rgba(255,255,255,0.8)",lineHeight:1.6,margin:0 }}>{s.caption}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══ RESOURCES ══ */}
      <div id="tvw-collateral" style={{ maxWidth:1200,margin:"0 auto",padding:"56px 48px 80px" }}>
        <p style={{ fontSize:11,fontWeight:700,letterSpacing:"1.8px",textTransform:"uppercase",color:"#aaaabc",margin:"0 0 6px",fontFamily:FONT }}>Downloads</p>
        <div style={{ width:36,height:3,borderRadius:2,background:TVW_BLUE,marginBottom:16 }}/>
        <h2 style={{ fontSize:22,fontWeight:900,color:ACCENT_NAVY,margin:"0 0 28px",letterSpacing:"-0.3px",fontFamily:FONT }}>Campaign Resources</h2>
        <div style={{ display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:16 }}>
          {RESOURCES.map((r,i) => (
            <ResourceCard key={i} resource={r} onClick={() => handleResourceClick(r)} />
          ))}
        </div>
      </div>

      {/* ══ SPOC DRAWER ══ */}
      {spocModal && (
        <DrawerShell onClose={()=>setSpocModal(null)} title={spocModal.title} subtitle={`${spocModal.date} · ${spocModal.location}`} accentTag="TVW 22">
          <div style={{ display:"flex",flexDirection:"column",gap:12,fontFamily:FONT }}>
            {[
              { label:"Event",     value:spocModal.title    },
              { label:"Date",      value:spocModal.date     },
              { label:"Mode",      value:spocModal.mode     },
              { label:"Venue",     value:spocModal.location },
              { label:"Hosted by", value:spocModal.company  },
            ].map(({label,value}) => (
              <div key={label} style={{ display:"flex",justifyContent:"space-between",fontSize:14,paddingBottom:10,borderBottom:"1px solid #f0f0f5" }}>
                <span style={{ color:"#94a3b8",fontWeight:600 }}>{label}</span>
                <span style={{ color:ACCENT_NAVY,fontWeight:600,textAlign:"right",maxWidth:"60%" }}>{value}</span>
              </div>
            ))}
            <div style={{ background:"#f0fdf4",border:"1px solid #bbf7d0",borderRadius:10,padding:"12px 16px",fontSize:13,color:"#166534",marginTop:4 }}>
              Your SPOC has been notified — Rohan Desai will reach out within 24 hours to complete your registration.
            </div>
            <button onClick={()=>{ triggerToast("Your SPOC has been notified — Rohan Desai will reach out within 24 hours."); setSpocModal(null); }}
              style={{ background:TVW_BLUE,color:"#fff",border:"none",borderRadius:10,padding:"14px",fontSize:14,fontWeight:700,cursor:"pointer",fontFamily:FONT,marginTop:4 }}>
              Confirm – Notify SPOC
            </button>
          </div>
        </DrawerShell>
      )}

      {/* ══ VIBE SUBMISSION DRAWER ══ */}
      {showVibeForm && (
        <VibeSubmitDrawer
          onClose={() => setShowVibeForm(false)}
          onSubmit={() => {
            setShowVibeForm(false);
            triggerToast("Story submitted! Admin will review and publish it shortly.");
          }}
        />
      )}

      <TickerBar fixed />
    </div>
  );
};

export default TVWHubView;
