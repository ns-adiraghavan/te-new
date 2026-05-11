import { useState } from "react";
import { motion } from "framer-motion";
import { Building2, ShieldCheck, Landmark, Mail, Lock, Eye, MapPin } from "lucide-react";
import { useLocation } from "react-router-dom";
import { VIKRAM_NAIR, ROHAN_DESAI, PRIYA_SHARMA, ANJALI_MEHTA, ANJALI_GUPTA_REGIONAL, IS_PE_SEASON, togglePESeason } from "@/data/mockData";
import { useAppContext } from "@/context/AppContext";
import { useAuth } from "@/context/AuthContext";
import { useAppNavigate } from "@/hooks/useAppNavigate";
import { ACCENT_NAVY, B_TICKER } from "@/data/homeSharedData";

const MAIN_DEMO_BUTTONS = [
  {
    label: "Tata Employee",
    icon: ShieldCheck,
    user: PRIYA_SHARMA,
    dest: "volunteer-hub" as const,
    toast: "Login Successful! Welcome back, Shrirang.",
  },
  {
    label: "NGO",
    icon: Landmark,
    user: ANJALI_MEHTA,
    dest: "ngo-hub" as const,
    toast: "Login Successful! Welcome back, Anjali.",
  },
];

const SPOC_DEMO_BUTTONS = [
  {
    label: "Corp. SPOC",
    icon: Building2,
    user: ROHAN_DESAI,
    dest: "spoc-hub" as const,
    toast: "Login Successful! Welcome back, Rohan.",
  },
  {
    label: "Regional SPOC",
    icon: MapPin,
    user: ANJALI_GUPTA_REGIONAL,
    dest: "spoc-hub" as const,
    toast: "Login Successful! Welcome back, Anjali (Regional SPOC).",
  },
];

const LoginView = () => {
  const { setIsLoggedIn, setUser } = useAuth();
  const navigate = useAppNavigate();
  const { triggerToast } = useAppContext();
  const location = useLocation();
  const isAdminLogin = location.pathname === "/admin-login";
  const [isPESeason, setIsPESeason] = useState(IS_PE_SEASON);
  const [showPassword, setShowPassword] = useState(false);

  const togglePE = () => {
    const newVal = togglePESeason();
    setIsPESeason(newVal);
    triggerToast(newVal ? "PE Season ON — dashboard shows ProEngage mode" : "PE Season OFF — dashboard shows non-PE mode");
  };

  const handleLogin = (user: Record<string, any>, dest: string, toast: string) => {
    setIsLoggedIn(true);
    setUser(user);
    navigate(dest as any);
    triggerToast(toast);
  };

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", background: "linear-gradient(135deg, #065666 0%, #135EA9 60%, #0891b2 100%)", transition: "background 0.5s" }}>

      {/* MAIN CONTENT */}
      <div style={{ flex: 1, position: "relative", display: "flex", alignItems: "center", justifyContent: "center", padding: "80px 32px 52px", overflow: "hidden" }}>

        {/* Doodles */}
        <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none", opacity: 0.13, overflow: "hidden" }} viewBox="0 0 1400 900" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
          <style>{`@keyframes lda{0%,100%{transform:translate(0,0) rotate(0deg)}50%{transform:translate(8px,-12px) rotate(6deg)}} @keyframes ldb{0%,100%{transform:translate(0,0) rotate(0deg)}50%{transform:translate(-10px,8px) rotate(-8deg)}} @keyframes ldc{0%,100%{transform:translate(0,0) rotate(0deg)}50%{transform:translate(6px,10px) rotate(4deg)}} @keyframes ldd{0%,100%{transform:translate(0,0) rotate(0deg)}50%{transform:translate(-8px,-6px) rotate(-5deg)}} .lla{animation:lda 22s ease-in-out infinite;transform-origin:center} .llb{animation:ldb 28s ease-in-out infinite;transform-origin:center} .llc{animation:ldc 18s ease-in-out infinite;transform-origin:center} .lld{animation:ldd 32s ease-in-out infinite;transform-origin:center}`}</style>
          <g className="lla"><path d="M1280 80 C1308 54,1352 60,1362 94 C1372 128,1346 160,1314 162 C1282 164,1258 136,1266 102 C1270 82,1280 80,1280 80 Z" fill="none" stroke="white" strokeWidth="2.8" strokeLinecap="round"/></g>
          <g className="llb" transform="translate(1210,110)"><line x1="0" y1="-20" x2="0" y2="20" stroke="white" strokeWidth="2.4" strokeLinecap="round"/><line x1="-20" y1="0" x2="20" y2="0" stroke="white" strokeWidth="2.4" strokeLinecap="round"/><line x1="-14" y1="-14" x2="14" y2="14" stroke="white" strokeWidth="1.8" strokeLinecap="round"/><line x1="14" y1="-14" x2="-14" y2="14" stroke="white" strokeWidth="1.8" strokeLinecap="round"/></g>
          <g className="llc"><path d="M980 480 C1008 460,1036 500,1064 480 C1092 460,1120 500,1148 480 C1176 460,1204 500,1232 480" fill="none" stroke="white" strokeWidth="2.4" strokeLinecap="round"/></g>
          <g className="lld"><rect x="1180" y="720" width="44" height="44" rx="6" fill="none" stroke="white" strokeWidth="2.2" transform="rotate(16,1202,742)"/></g>
          <g className="llb"><path d="M80 600 C108 572,150 578,158 614 C166 650,138 678,106 676 C74 674,54 644,64 610 C68 594,80 600,80 600 Z" fill="none" stroke="white" strokeWidth="2.4" strokeLinecap="round"/></g>
          <g className="lla" transform="translate(160,340)"><line x1="0" y1="-14" x2="0" y2="14" stroke="white" strokeWidth="2" strokeLinecap="round"/><line x1="-14" y1="0" x2="14" y2="0" stroke="white" strokeWidth="2" strokeLinecap="round"/><line x1="-10" y1="-10" x2="10" y2="10" stroke="white" strokeWidth="1.4" strokeLinecap="round"/><line x1="10" y1="-10" x2="-10" y2="10" stroke="white" strokeWidth="1.4" strokeLinecap="round"/></g>
          <g className="llc"><path d="M60 160 C88 142,116 168,144 150 C172 132,200 158,228 140" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round"/></g>
          <g className="lld"><circle cx="120" cy="800" r="36" fill="none" stroke="white" strokeWidth="2.2"/><circle cx="120" cy="800" r="18" fill="none" stroke="white" strokeWidth="1.4"/></g>
          <g className="lla"><path d="M680 50 L720 90 L680 130 L640 90 Z" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></g>
          <g className="llb"><rect x="620" y="820" width="32" height="32" rx="4" fill="none" stroke="white" strokeWidth="2" transform="rotate(-12,636,836)"/></g>
          <g className="llc"><path d="M330 80 C348 70,362 80,358 96 C354 112,336 116,326 102 C318 90,330 80,330 80 Z" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round"/></g>
          <g className="lld"><path d="M860 60 C876 50,890 60,886 76 C882 90,864 94,856 80 C850 70,860 60,860 60 Z" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round"/></g>
        </svg>

        <div style={{ width: "100%", maxWidth: 480, position: "relative", zIndex: 1 }}>
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>

            {/* Heading */}
            <div style={{ textAlign: "center", marginBottom: 32 }}>
              <h2 style={{ fontSize: 28, fontWeight: 900, color: "#fff", marginBottom: 8, letterSpacing: "-0.4px" }}>
                {isAdminLogin ? "Admin Login" : "Welcome back!"}
              </h2>
              <div style={{ width: 48, height: 3, borderRadius: 2, background: B_TICKER, margin: "0 auto 14px" }} />
              <p style={{ fontSize: 14, color: "rgba(255,255,255,0.65)", margin: 0 }}>
                {isAdminLogin ? "Login to your admin dashboard" : "Login to your volunteering dashboard"}
              </p>
            </div>

            {/* White card */}
            <div style={{ background: "rgba(255,255,255,0.96)", backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)", border: "1px solid rgba(255,255,255,0.3)", borderRadius: 16, padding: "36px 32px" }}>

              {/* Demo login buttons */}
              {!isAdminLogin && (
                <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 24 }}>
                  {/* Main: Tata Employee + NGO */}
                  {MAIN_DEMO_BUTTONS.map(({ label, icon: Icon, user, dest, toast }) => (
                    <button
                      key={label}
                      onClick={() => handleLogin(user, dest, toast)}
                      style={{
                        width: "100%", display: "flex", alignItems: "center", justifyContent: "center", gap: 10,
                        backgroundColor: B_TICKER, color: "#fff",
                        padding: "13px 20px", borderRadius: 10,
                        fontSize: 14, fontWeight: 700, border: "none", cursor: "pointer",
                        transition: "filter 0.15s",
                      }}
                      onMouseEnter={e => (e.currentTarget.style.filter = "brightness(1.1)")}
                      onMouseLeave={e => (e.currentTarget.style.filter = "brightness(1)")}
                    >
                      <Icon size={17} />
                      {label}
                    </button>
                  ))}

                  {/* PE season toggle + SPOC pills on same row */}
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8, marginTop: 4, flexWrap: "wrap" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <span style={{ fontSize: 10, fontWeight: 700, color: "#94a3b8", textTransform: "uppercase", letterSpacing: "1px" }}>Demo</span>
                      <button
                        onClick={togglePE}
                        style={{
                          display: "flex", alignItems: "center", gap: 6,
                          padding: "5px 12px", borderRadius: 100, fontSize: 11, fontWeight: 600,
                          border: `1px solid ${isPESeason ? `${B_TICKER}40` : "#e2e8f0"}`,
                          background: isPESeason ? `${B_TICKER}10` : "#f8fafc",
                          color: isPESeason ? B_TICKER : "#94a3b8",
                          cursor: "pointer",
                        }}
                      >
                        <span style={{ width: 6, height: 6, borderRadius: "50%", background: isPESeason ? "#22c55e" : "#94a3b8", display: "inline-block" }} />
                        {isPESeason ? "PE Season active" : "Outside PE Season"}
                      </button>
                    </div>
                    {/* SPOC pill buttons */}
                    <div style={{ display: "flex", gap: 6 }}>
                      {SPOC_DEMO_BUTTONS.map(({ label, icon: Icon, user, dest, toast }) => (
                        <button
                          key={label}
                          onClick={() => handleLogin(user, dest, toast)}
                          style={{
                            display: "flex", alignItems: "center", gap: 5,
                            padding: "5px 12px", borderRadius: 100, fontSize: 11, fontWeight: 700,
                            background: "rgba(62,126,176,0.12)", color: B_TICKER,
                            border: `1px solid ${B_TICKER}30`, cursor: "pointer",
                            transition: "background 0.15s",
                          }}
                          onMouseEnter={e => (e.currentTarget.style.background = `${B_TICKER}22`)}
                          onMouseLeave={e => (e.currentTarget.style.background = "rgba(62,126,176,0.12)")}
                        >
                          <Icon size={11} />
                          {label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {isAdminLogin && (
                <button
                  onClick={() => handleLogin(VIKRAM_NAIR, "admin-dashboard", "Login Successful! Welcome, Vikram Nair.")}
                  style={{
                    width: "100%", display: "flex", alignItems: "center", justifyContent: "center", gap: 10,
                    backgroundColor: ACCENT_NAVY, color: "#fff",
                    padding: "13px 20px", borderRadius: 10, marginBottom: 24,
                    fontSize: 14, fontWeight: 700, border: "none", cursor: "pointer",
                  }}
                >
                  <ShieldCheck size={17} />
                  Login as Admin
                </button>
              )}

              {/* Divider */}
              <div style={{ position: "relative", margin: "4px 0 20px" }}>
                <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center" }}>
                  <div style={{ width: "100%", borderTop: "1px solid #e8e8f0" }} />
                </div>
                <div style={{ position: "relative", display: "flex", justifyContent: "center" }}>
                  <span style={{ background: "#fff", padding: "0 10px", fontSize: 10, fontWeight: 700, color: "#94a3b8", textTransform: "uppercase", letterSpacing: "1.5px" }}>
                    Or login with
                  </span>
                </div>
              </div>

              {/* Email/password form */}
              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                <div>
                   <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: "rgba(255,255,255,0.75)", marginBottom: 6 }}>Email Address</label>
                  <div style={{ position: "relative" }}>
                    <Mail size={16} style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", color: "#94a3b8" }} />
                    <input type="text" placeholder="Enter email ID" className="form-input" style={{ paddingLeft: 40 }} />
                  </div>
                </div>
                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
                    <label style={{ fontSize: 12, fontWeight: 600, color: "rgba(255,255,255,0.75)" }}>Password</label>
                    <button onClick={() => navigate("forgot-password")} style={{ fontSize: 11, fontWeight: 700, color: B_TICKER, background: "none", border: "none", cursor: "pointer" }}>
                      Forgot Password?
                    </button>
                  </div>
                  <div style={{ position: "relative" }}>
                    <Lock size={16} style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", color: "#94a3b8" }} />
                    <input type={showPassword ? "text" : "password"} placeholder="••••••••" className="form-input" style={{ paddingLeft: 40, paddingRight: 40 }} />
                    <button type="button" onClick={() => setShowPassword(v => !v)} style={{ position: "absolute", right: 14, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", color: "#94a3b8" }}>
                      <Eye size={16} />
                    </button>
                  </div>
                </div>
                <button type="button" disabled style={{ width: "100%", padding: "13px", borderRadius: 10, fontSize: 14, fontWeight: 700, background: ACCENT_NAVY, color: "#fff", border: "none", opacity: 0.4, cursor: "not-allowed", marginTop: 4 }}>
                  Log In
                </button>
              </div>
            </div>

            {!isAdminLogin && (
              <p style={{ textAlign: "center", fontSize: 13, color: "#fff", marginTop: 20 }}>
                Don't have an account?{" "}
                <button onClick={() => navigate("register-role")} style={{ fontWeight: 700, color: "#fff", background: "none", border: "none", cursor: "pointer", textDecoration: "underline" }}>
                  Register Now
                </button>
              </p>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default LoginView;
