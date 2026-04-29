import { useNavigate } from "react-router-dom";
import { useCallback } from "react";

const VIEW_TO_PATH: Record<string, string> = {
  home: "/",
  login: "/login",
  "register-role": "/register",
  "register-form": "/register/form",
  otp: "/otp/verify",
  "forgot-password": "/forgot-password",
  dashboard: "/dashboard",
  "volunteer-hub": "/hub",
  "ngo-hub": "/ngo/hub",
  "spoc-hub": "/spoc/hub",
  "ngo-dashboard": "/ngo/dashboard",
  "create-project": "/projects/create",
  "active-project-management": "/projects/active",
  "project-feedback": "/projects/feedback",
  profile: "/profile",
  tvw: "/tvw",
  proengage: "/proengage",
  "disaster-response": "/disaster-response",
  
  "dr-availability-form": "/disaster-response/availability",
  "dr-confirmation": "/disaster-response/confirmation",
  "spoc-dashboard": "/spoc/dashboard",
  "admin-login": "/admin-login",
  "admin-dashboard": "/admin/dashboard",
  "journey": "/journey",
  "about": "/about",
  "about-tvw": "/about/tvw",
  "about-proengage": "/about/proengage",
  "about-gcso": "/about/gcso",
  "about-team": "/about/team",
  "about-events": "/about/events",
  "event-detail": "/about/events/detail",
  "about-contact": "/about/contact",
  "partner": "/partner",
  "media": "/media",
  "contact": "/contact",
  "faq": "/faq",
  "policy": "/policy",
  "eoi": "/eoi",
  "eoeo": "/eoeo",
  "ewaste": "/ewaste",
  "tata-sm": "/tata-sustainability-month",
  "cvp": "/cvp",
  "yes-to-access": "/yes-to-access",
  "stories": "/stories",
  "event": "/about/events",
  "events-page": "/events",
  "privacy": "/privacy",
  "legal": "/legal",
  "volunteering-guidelines": "/volunteering-guidelines",
  "code-of-conduct": "/code-of-conduct",
};

export const useAppNavigate = () => {
  const nav = useNavigate();
  return useCallback(
    (view: string, slugOrHash?: string) => {
      const path = VIEW_TO_PATH[view] || "/";
      if ((view === "stories" || view === "event" || view === "event-detail") && slugOrHash) {
        nav(`${path}?id=${slugOrHash}`);
      } else {
        nav(slugOrHash ? `${path}#${slugOrHash.replace(/^#/, "")}` : path);
      }
      window.scrollTo(0, 0);
    },
    [nav]
  );
};
