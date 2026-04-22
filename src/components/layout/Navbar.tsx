import { useState, useRef, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Bell, ChevronDown, ChevronRight, User, LogOut, Share2, LayoutDashboard, Search } from "lucide-react";
import tataLogo from "@/assets/Tata-removebg-preview.png";
import tataEngageLogo from "@/assets/tata-engage-logo.png";
import type { View } from "@/types";
import { NOTIFICATIONS_VOLUNTEER, NOTIFICATIONS_NGO, NOTIFICATIONS_SPOC, NOTIFICATIONS_ADMIN } from "@/data/mockData";
import { useAppContext } from "@/context/AppContext";

const Navbar = ({
  onNavigate,
  isLoggedIn,
  onLogout,
  user,
}: {
  onNavigate: (view: View) => void;
  isLoggedIn: boolean;
  onLogout: () => void;
  user: any;
}) => {
  const location = useLocation();
  const { triggerToast } = useAppContext();
  const getRoleNotifications = () => {
    if (!user) return NOTIFICATIONS_VOLUNTEER;
    if (user.role === "ngo") return NOTIFICATIONS_NGO;
    if (user.role === "corporate_spoc" || user.role === "regional_spoc") return NOTIFICATIONS_SPOC;
    if (user.role === "platform_admin") return NOTIFICATIONS_ADMIN;
    return NOTIFICATIONS_VOLUNTEER;
  };

  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [notifications, setNotifications] = useState(getRoleNotifications());

  useEffect(() => { setNotifications(getRoleNotifications()); }, [user]);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const notifRef    = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) setDropdownOpen(false);
      if (notifRef.current    && !notifRef.current.contains(e.target as Node))    setNotifOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const roleLabel = () => {
    if (!user) return "";
    if (user.role === "ngo") return `NGO · ${user.organization}`;
    if (user.role === "corporate_spoc") return `Corporate SPOC · ${user.company}`;
    if (user.role === "platform_admin") return "TSG Admin";
    return `Tata Employee · ${user.company}`;
  };

  const hubView = (): View =>
    user?.role === "ngo"
      ? "ngo-hub"
      : user?.role === "corporate_spoc"
      ? "spoc-hub"
      : "volunteer-hub";

  const unreadCount = notifications.filter((n) => !n.read).length;
  // Routes whose first viewport is a dark hero — drives white-text mode by default
  const DARK_SCENE_ROUTES = ["/", "/hub", "/ngo/hub", "/spoc/hub", "/dashboard", "/profile", "/disaster-response", "/eoi", "/ewaste", "/tata-sustainability-month", "/cvp", "/about/tvw", "/about/proengage", "/journey"];
  const isDarkScene = DARK_SCENE_ROUTES.includes(location.pathname) && !scrolled;
  // While not scrolled the bar is fully transparent. Once scrolled, frosted matching the scene.
  const isTransparent = !scrolled;

  const dotColor = (type: string) => {
    if (type === "match" || type === "approval") return "bg-green-500";
    if (type === "certificate") return "bg-blue-500";
    if (type === "verification" || type === "grievance") return "bg-red-500";
    if (type === "leaderboard") return "bg-violet-500";
    return "bg-amber-500";
  };

  const iconChip = (type: string) => {
    if (type === "match" || type === "approval") return "✓";
    if (type === "certificate") return "↓";
    if (type === "feedback") return "★";
    if (type === "verification") return "!";
    if (type === "leaderboard") return "↑";
    if (type === "grievance") return "⚠";
    return "•";
  };

  const notifRoleLabel = () => {
    if (!user) return "Volunteer";
    if (user.role === "ngo") return "NGO";
    if (user.role === "corporate_spoc" || user.role === "regional_spoc") return "SPOC";
    if (user.role === "platform_admin") return "Admin";
    return "Volunteer";
  };

  const handleMarkAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    setNotifOpen(false);
  };

  const isOnDarkRoute = DARK_SCENE_ROUTES.includes(location.pathname);
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 group/nav">
      <div className={`h-16 flex items-center justify-between px-6 md:px-12 transition-all duration-300 ${scrolled ? (isDarkScene ? "bg-zinc-900/55 backdrop-blur-md border-b border-white/10 shadow-[0_1px_12px_rgba(0,0,0,0.18)]" : "bg-white/70 backdrop-blur-md border-b border-white/60 shadow-[0_1px_12px_rgba(0,0,0,0.07)]") : (isOnDarkRoute ? "bg-transparent border-b border-transparent group-hover/nav:bg-zinc-900/55 group-hover/nav:backdrop-blur-md group-hover/nav:border-white/10" : "bg-transparent border-b border-transparent group-hover/nav:bg-white/80 group-hover/nav:backdrop-blur-md group-hover/nav:border-white/60")}`}>

        {/* ── LEFT: TataEngage logo ── */}
        <div className="flex-shrink-0">
          <img
            src={tataEngageLogo}
            alt="TataEngage"
            className="h-9 object-contain cursor-pointer"
            onClick={() => isLoggedIn ? onNavigate(hubView()) : onNavigate("home")}
          />
        </div>

        {/* ── CENTRE: public nav links ── */}
        <div className="hidden md:flex items-center gap-10 lg:gap-[60px]">
            {(() => {
              const isHomeActive = location.pathname === "/";
              const activeBase = "border-b-2 pb-0.5";
              const activeCls = isDarkScene
                ? `text-white ${activeBase} border-white/70`
                : `text-zinc-900 ${activeBase} border-[#333399]`;
              const hoverCls = isDarkScene
                ? "text-white/85 hover:text-white"
                : "text-zinc-700 hover:text-zinc-900";
              return (
                <span
                  onClick={() => onNavigate("home")}
                  className={`text-sm font-medium transition-colors duration-300 cursor-pointer ${isHomeActive ? activeCls : hoverCls}`}
                >
                  Home
                </span>
              );
            })()}

            {(() => {
              const triggerCls = (isActive: boolean) => {
                const activeCls = isDarkScene
                  ? "text-white border-b-2 border-white/70 pb-0.5"
                  : "text-zinc-900 border-b-2 border-[#333399] pb-0.5";
                const hoverCls = isDarkScene
                  ? "text-white/85 hover:text-white"
                  : "text-zinc-700 hover:text-zinc-900";
                return `text-sm font-medium transition-colors duration-300 cursor-pointer flex items-center gap-1 ${isActive ? activeCls : hoverCls}`;
              };

              // ── Clean hover-list (Tata.com style) ─────────────────────────
              // Dark slate panel · airy padding · plain text rows · subtle colour-only hover
              const panelCls = "absolute top-full left-0 mt-3 bg-zinc-900/95 backdrop-blur-md border border-white/10 rounded-xl shadow-[0_12px_40px_rgba(0,0,0,0.35)] py-4 z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-150";
              const itemCls = "block w-full text-left px-6 py-1.5 text-[13px] text-white/75 hover:text-white cursor-pointer transition-colors";
              const nestPanelCls = "absolute left-full top-0 ml-2 bg-zinc-900/95 backdrop-blur-md border border-white/10 rounded-xl shadow-[0_12px_40px_rgba(0,0,0,0.35)] py-4 z-[60] opacity-0 invisible group-hover/nest:opacity-100 group-hover/nest:visible transition-all duration-150";
              const nestTriggerCls = "flex items-center justify-between w-full px-6 py-1.5 text-[13px] text-white/75 hover:text-white cursor-pointer transition-colors";
              const dividerCls = "border-t border-white/10 my-3 mx-2";
              const subSectionLabelCls = "text-[10px] font-semibold uppercase tracking-[0.12em] text-white/40 px-6 pt-3 pb-1";

              const scrollAfter = (id: string) => setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }), 120);

              const programmesGroups: { label: string; items: { label: string; action: () => void }[] }[] = [
                {
                  label: "ProEngage",
                  items: [
                    { label: "About ProEngage", action: () => onNavigate("about-proengage") },
                    { label: "ProEngage is Live", action: () => onNavigate("proengage") },
                    { label: "Apply for a Project", action: () => onNavigate("proengage") },
                    { label: "E-Module", action: () => isLoggedIn ? onNavigate("dashboard") : triggerToast("Please log in to access the E-Module") },
                    { label: "Resources", action: () => onNavigate("partner") },
                  ],
                },
                {
                  label: "Tata Volunteering Week",
                  items: [
                    { label: "About TVW", action: () => onNavigate("about-tvw") },
                    { label: "TVW is Live", action: () => onNavigate("tvw") },
                    { label: "Volunteering Opportunities", action: () => onNavigate("tvw") },
                    { label: "DIY Kit", action: () => triggerToast("DIY Kit available — check Resources") },
                    { label: "TVW Archives", action: () => onNavigate("about-tvw") },
                    { label: "Resources", action: () => onNavigate("partner") },
                  ],
                },
                {
                  label: "Volunteering for Disaster Response",
                  items: [
                    { label: "About", action: () => onNavigate("disaster-response") },
                  ],
                },
                {
                  label: "Tata Sustainability Month",
                  items: [
                    { label: "About", action: () => onNavigate("tata-sm") },
                    { label: "TSM Volunteering", action: () => onNavigate("tata-sm") },
                    { label: "DIY Activities", action: () => triggerToast("DIY Activities available during TSM season") },
                  ],
                },
                {
                  label: "Company Volunteering Programme",
                  items: [
                    { label: "About CVP", action: () => onNavigate("cvp") },
                    { label: "__SECTION__Explore", action: () => {} },
                    { label: "TCS Each One Empowers One", action: () => onNavigate("eoi") },
                    { label: "Infiniti Retail E-Waste Warrior", action: () => onNavigate("ewaste") },
                    { label: "Yes To Access", action: () => triggerToast("Yes To Access — coming soon") },
                  ],
                },
                {
                  label: "Employees' Own Initiatives",
                  items: [
                    { label: "About EOI", action: () => onNavigate("eoi") },
                  ],
                },
              ];

              return (
                <>
                  {/* ABOUT */}
                  <div className="relative group">
                    <span
                      onClick={() => onNavigate("about")}
                      className={triggerCls(location.pathname.startsWith("/about") || location.pathname === "/journey")}
                    >
                      About <ChevronDown size={12} />
                    </span>
                    <div className={`${panelCls} w-64`}>
                      <span onClick={() => onNavigate("about")} className={itemCls}>Overview</span>
                      <span onClick={() => { onNavigate("about"); scrollAfter("about-vision"); }} className={itemCls}>TE Vision &amp; Mission</span>
                      <span onClick={() => onNavigate("journey")} className={itemCls}>Our Journey</span>
                      <span onClick={() => onNavigate("media")} className={itemCls}>Events</span>
                      <span onClick={() => { onNavigate("about"); scrollAfter("about-contact"); }} className={itemCls}>Contact Us</span>
                      <span onClick={() => { onNavigate("about"); scrollAfter("about-team"); }} className={itemCls}>Team</span>
                      {isLoggedIn && (
                        <>
                          <div className={dividerCls} />
                          <span onClick={() => { onNavigate("dashboard"); scrollAfter("resources"); }} className={itemCls}>E-Module</span>
                          <span onClick={() => { onNavigate("spoc-dashboard"); scrollAfter("spoc-mgt"); }} className={itemCls}>SPOC Directory</span>
                          <div className="relative group/nest">
                            <span className={nestTriggerCls}>
                              Campaign Kits <ChevronRight size={12} className="opacity-60" />
                            </span>
                            <div className={`${nestPanelCls} w-56`}>
                              <span onClick={() => triggerToast("ProEngage Campaign Kit available in Resource Library")} className={itemCls}>PE Kit</span>
                              <span onClick={() => triggerToast("TVW Campaign Kit available in Resource Library")} className={itemCls}>TVW Kit</span>
                              <span onClick={() => triggerToast("TSM Campaign Kit available in Resource Library")} className={itemCls}>TSM Kit</span>
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                  </div>

                  {/* PROGRAMMES */}
                  <div className="relative group">
                    <span
                      onClick={() => onNavigate("about")}
                      className={triggerCls(
                        location.pathname.startsWith("/proengage") ||
                        location.pathname.startsWith("/tvw") ||
                        location.pathname.startsWith("/disaster-response") ||
                        location.pathname.startsWith("/tata-sustainability-month") ||
                        location.pathname.startsWith("/cvp") ||
                        location.pathname.startsWith("/eoi") ||
                        location.pathname.startsWith("/ewaste") ||
                        location.pathname.startsWith("/about/proengage") ||
                        location.pathname.startsWith("/about/tvw")
                      )}
                    >
                      Programmes <ChevronDown size={12} />
                    </span>
                    <div className={`${panelCls} w-72`}>
                      {programmesGroups.map((grp, gi) => (
                        <div key={grp.label}>
                          {gi === 3 && <div className={dividerCls} />}
                          <div className="relative group/nest">
                            <span className={nestTriggerCls}>
                              {grp.label} <ChevronRight size={12} className="opacity-60" />
                            </span>
                            <div className={`${nestPanelCls} w-64`}>
                              {grp.items.map((it) => {
                                if (it.label.startsWith("__SECTION__")) {
                                  return <div key={it.label} className={subSectionLabelCls}>{it.label.replace("__SECTION__", "")}</div>;
                                }
                                return (
                                  <span key={it.label} onClick={it.action} className={itemCls}>{it.label}</span>
                                );
                              })}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* MEDIA & RESOURCES */}
                  <div className="relative group">
                    <span
                      onClick={() => onNavigate("media")}
                      className={triggerCls(location.pathname.startsWith("/media"))}
                    >
                      Media &amp; Resources <ChevronDown size={12} />
                    </span>
                    <div className={`${panelCls} w-64`}>
                      <span onClick={() => onNavigate("media")} className={itemCls}>Impact Stories</span>
                      <span onClick={() => onNavigate("media")} className={itemCls}>Photo Gallery</span>
                      <span onClick={() => onNavigate("media")} className={itemCls}>Video Gallery</span>
                      <span onClick={() => onNavigate("media")} className={itemCls}>Social Media Snippets</span>
                    </div>
                  </div>

                  {/* PARTNER WITH US */}
                  {(() => {
                    const isActive = location.pathname.startsWith("/partner");
                    const activeCls = isDarkScene
                      ? "text-white border-b-2 border-white/70 pb-0.5"
                      : "text-zinc-900 border-b-2 border-[#333399] pb-0.5";
                    const hoverCls = isDarkScene
                      ? "text-white/85 hover:text-white"
                      : "text-zinc-700 hover:text-zinc-900";
                    return (
                      <span
                        onClick={() => onNavigate("partner")}
                        className={`text-sm font-medium transition-colors duration-300 cursor-pointer ${isActive ? activeCls : hoverCls}`}
                      >
                        Partner With Us
                      </span>
                    );
                  })()}
                </>
              );
            })()}

            <Search size={18} className={`cursor-pointer transition-colors duration-300 ${isDarkScene ? "text-white/80 hover:text-white" : "text-zinc-500 hover:text-zinc-800"}`} />
          </div>

        {/* ── RIGHT ── */}
        <div className="flex items-center gap-4">
          {isLoggedIn ? (
            <>
              {/* Bell */}
              <div className="relative" ref={notifRef}>
                <button onClick={() => setNotifOpen((o) => !o)}
                  className={`p-2 rounded-full cursor-pointer relative transition-colors duration-300 ${isDarkScene ? "hover:bg-white/10" : "hover:bg-zinc-100"}`}>
                  <Bell size={20} className={`transition-colors duration-300 ${isDarkScene ? "text-white/90" : "text-zinc-700"}`} />
                  {unreadCount > 0 && (
                    <span className={`absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 ${isDarkScene ? "border-transparent" : "border-white"}`} />
                  )}
                </button>

                {notifOpen && (
                  <div className="absolute right-0 top-full mt-2 w-96 bg-white border border-gray-200 rounded-2xl shadow-sm z-50 overflow-hidden">
                    <div className="flex items-center justify-between px-5 py-4 border-b border-zinc-100">
                      <div>
                        <span className="font-semibold text-sm text-zinc-900">Notifications</span>
                        <p className="text-xs text-slate-400">{notifRoleLabel()}</p>
                      </div>
                      <button onClick={handleMarkAllRead}
                        className="text-xs text-blue-600 font-medium hover:underline cursor-pointer">
                        Mark all as read
                      </button>
                    </div>
                    {unreadCount === 0 && notifications.every((n) => n.read) ? (
                      <div className="py-8 text-center">
                        <p className="text-xs text-slate-400">You're all caught up</p>
                      </div>
                    ) : (
                      <div className="max-h-[420px] overflow-y-auto">
                        {notifications.map((n) => (
                          <div key={n.id}
                            className={`flex items-start gap-3 px-5 py-4 border-b border-zinc-50 last:border-b-0 ${n.read ? "bg-white" : "bg-slate-50"}`}>
                            <span className={`mt-0.5 w-6 h-6 rounded-full shrink-0 flex items-center justify-center text-white text-xs font-bold ${dotColor(n.type)}`}>
                              {iconChip(n.type)}
                            </span>
                            <div className="min-w-0">
                              <p className="font-semibold text-sm text-zinc-900">{n.title}</p>
                              <p className="text-sm text-slate-500 line-clamp-2">{n.body}</p>
                              <p className="text-xs text-slate-400 mt-1">{n.time}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Avatar dropdown */}
              <div className="relative" ref={dropdownRef}>
                <button onClick={() => setDropdownOpen((o) => !o)}
                  className="flex items-center gap-2 cursor-pointer group">
                  <div className="w-9 h-9 rounded-full bg-[#3E7EB0] text-white flex items-center justify-center text-sm font-bold">
                    {user?.firstName?.[0]}{user?.lastName?.[0]}
                  </div>
                  <ChevronDown size={14} className={`transition-colors duration-300 ${isDarkScene ? "text-white/60 group-hover:text-white" : "text-zinc-400 group-hover:text-zinc-600"}`} />
                </button>

                {dropdownOpen && (
                  <div className="absolute right-0 top-full mt-2 w-64 bg-white rounded-xl shadow-xl border border-zinc-100 overflow-hidden z-[80]">
                    <div className="px-4 py-3 border-b border-zinc-100">
                      <div className="font-semibold text-sm text-zinc-900">{user?.firstName} {user?.lastName}</div>
                      <p className="text-xs text-zinc-500 mt-0.5">{roleLabel()}</p>
                    </div>
                    <div className="py-1">
                      {[
                        { icon: User,            label: "Profile",          action: () => { onNavigate("profile");   setDropdownOpen(false); } },
                        { icon: LayoutDashboard, label: "My Hub",           action: () => { onNavigate(hubView());  setDropdownOpen(false); } },
                        { icon: Share2,          label: "Refer a Colleague",action: () => { setDropdownOpen(false); } },
                      ].map(({ icon: Icon, label, action }) => (
                        <button key={label} onClick={action}
                          className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-zinc-700 hover:bg-zinc-50 transition-colors cursor-pointer">
                          <Icon size={16} /> {label}
                        </button>
                      ))}
                    </div>
                    <div className="border-t border-zinc-100 py-1">
                      <button onClick={() => { onLogout(); setDropdownOpen(false); }}
                        className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 transition-colors cursor-pointer">
                        <LogOut size={16} /> Log Out
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Tata logo — right side when logged in */}
              <img src={tataLogo} alt="Tata" className={`h-8 w-8 object-contain hidden md:block transition-all duration-300 ${isDarkScene ? "brightness-0 invert" : ""}`} />
            </>
          ) : (
            /* ── Public right: Log In + Register + Tata logo ── */
            <div className="flex items-center gap-4">
              <span onClick={() => onNavigate("login")}
                className={`text-sm font-medium transition-colors duration-300 cursor-pointer ${isDarkScene ? "text-white/90 hover:text-white" : "text-zinc-700 hover:text-zinc-900"}`}>
                Log In
              </span>
              <button onClick={() => onNavigate("register-role")}
                className="py-2 px-5 text-sm font-semibold rounded-lg cursor-pointer transition-all hover:brightness-95"
                style={{ background: "#FCB514", color: "#0D1B3E" }}>
                Register
              </button>
              {/* Tata logo — right end */}
              <img src={tataLogo} alt="Tata" className={`h-8 w-8 object-contain hidden md:block transition-all duration-300 ${isDarkScene ? "brightness-0 invert" : ""}`} />
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
