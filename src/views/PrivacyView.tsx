import { useRef, useState, useEffect } from "react";
import SubPageDotRail from "@/components/shared/SubPageDotRail";

const ACCENT      = "#4376BB";
const ACCENT_DARK = "#2d5a9e";
const NAVY        = "#0D1B3E";
const FONT        = "'DM Sans', 'Noto Sans', ui-sans-serif, system-ui, sans-serif";

const DIAG: React.CSSProperties = {
  position: "absolute", inset: 0,
  backgroundImage: "repeating-linear-gradient(45deg,rgba(255,255,255,0.04) 1px,transparent 1px)",
  backgroundSize: "28px 28px",
  pointerEvents: "none",
};

const SECTIONS = [
  { id: "privacy-hero",     label: "Overview"        },
  { id: "privacy-s1",      label: "Definitions"     },
  { id: "privacy-s2",      label: "Scope"           },
  { id: "privacy-s3",      label: "Data Collected"  },
  { id: "privacy-s7",      label: "Use of Data"     },
  { id: "privacy-s8",      label: "Data Sharing"    },
  { id: "privacy-s10",     label: "Retention"       },
  { id: "privacy-s11",     label: "Your Rights"     },
  { id: "privacy-cookies", label: "Cookies"         },
  { id: "privacy-s19",     label: "General"         },
];

function DefinerBar({ light = false }: { light?: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const [on, setOn] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setOn(true); }, { threshold: 0.4 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return (
    <div ref={ref} style={{ height: 2, background: light ? "rgba(255,255,255,0.2)" : "#e8e8f0", borderRadius: 2, overflow: "hidden", width: 48, marginTop: 10 }}>
      <div style={{ height: "100%", background: light ? "rgba(255,255,255,0.8)" : ACCENT_DARK, borderRadius: 2, transition: "width 0.65s cubic-bezier(0.22,1,0.36,1)", width: on ? "100%" : "0%" }} />
    </div>
  );
}

function Sec({ id, num, title, children, bg = "#fff" }: {
  id: string; num: string; title: string; children: React.ReactNode; bg?: string;
}) {
  return (
    <section id={id} style={{ padding: "64px 56px", background: bg, scrollMarginTop: 80 }}>
      <div style={{ maxWidth: 860, margin: "0 auto" }}>
        <p style={{ fontFamily: FONT, fontSize: 11, fontWeight: 700, letterSpacing: "1.6px", textTransform: "uppercase", color: ACCENT, margin: "0 0 8px" }}>{num}</p>
        <h2 style={{ fontFamily: FONT, fontSize: 24, fontWeight: 900, color: NAVY, letterSpacing: "-0.3px", margin: 0 }}>{title}</h2>
        <DefinerBar />
        <div style={{ marginTop: 24, fontFamily: FONT, fontSize: 14.5, color: "#475569", lineHeight: 1.82 }}>
          {children}
        </div>
      </div>
    </section>
  );
}

function P({ children }: { children: React.ReactNode }) {
  return <p style={{ margin: "0 0 14px" }}>{children}</p>;
}

function Ul({ items }: { items: string[] }) {
  return (
    <ul style={{ paddingLeft: 20, margin: "8px 0 14px" }}>
      {items.map((item, i) => <li key={i} style={{ marginBottom: 6 }}>{item}</li>)}
    </ul>
  );
}

function DefTable({ rows }: { rows: [string, string][] }) {
  return (
    <div style={{ border: "1px solid #e8e8f0", borderRadius: 12, overflow: "hidden", marginTop: 16 }}>
      {rows.map(([term, def], i) => (
        <div key={i} style={{ display: "grid", gridTemplateColumns: "160px 1fr", borderBottom: i < rows.length - 1 ? "1px solid #e8e8f0" : "none" }}>
          <div style={{ padding: "12px 16px", background: "#f5f5fa", fontWeight: 700, fontSize: 13.5, color: NAVY }}>{term}</div>
          <div style={{ padding: "12px 16px", fontSize: 13.5 }}>{def}</div>
        </div>
      ))}
    </div>
  );
}

function InfoBox({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ background: "#EEF4FF", border: "1px solid #c7d9f5", borderRadius: 12, padding: "16px 20px", margin: "12px 0 20px" }}>
      <p style={{ fontFamily: FONT, fontSize: 11, fontWeight: 800, letterSpacing: "1px", textTransform: "uppercase", color: ACCENT_DARK, margin: "0 0 8px" }}>{title}</p>
      <div style={{ fontFamily: FONT, fontSize: 13.5, color: "#1e3a8a", lineHeight: 1.7 }}>{children}</div>
    </div>
  );
}

export default function PrivacyView() {
  return (
    <div style={{ background: "#f5f5fa", minHeight: "100vh", fontFamily: FONT }}>
      <div style={{ height: 3, background: ACCENT, width: "100%" }} />
      <SubPageDotRail sections={SECTIONS} accentColor={ACCENT} />

      {/* Hero */}
      <div id="privacy-hero" style={{ position: "relative", background: NAVY, padding: "96px 56px 72px", overflow: "hidden" }}>
        <div style={DIAG} />
        <div style={{ position: "absolute", top: -80, right: -80, width: 400, height: 400, background: `radial-gradient(circle, ${ACCENT}55 0%, transparent 70%)`, pointerEvents: "none" }} />
        <div style={{ position: "relative", zIndex: 1, maxWidth: 860, margin: "0 auto" }}>
          <p style={{ fontFamily: FONT, fontSize: 11, fontWeight: 700, letterSpacing: "2px", textTransform: "uppercase", color: "rgba(255,255,255,0.45)", margin: "0 0 12px" }}>Tata Engage · Legal</p>
          <div style={{ height: 2, width: 48, borderRadius: 2, background: "rgba(255,255,255,0.4)", margin: "12px 0 22px" }} />
          <h1 style={{ fontFamily: FONT, fontSize: "clamp(2rem,4vw,3rem)", fontWeight: 900, color: "#fff", lineHeight: 1.1, letterSpacing: "-0.5px", margin: "0 0 18px", maxWidth: 620 }}>Privacy &amp; Cookies Policy</h1>
          <p style={{ fontFamily: FONT, fontSize: 15, fontWeight: 300, color: "rgba(255,255,255,0.65)", maxWidth: 560, lineHeight: 1.7, margin: "0 0 28px" }}>
            Your privacy is important to us. This statement explains what personal data we collect from you through our interactions on this website, and how we use that data.
          </p>
          <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
            {[["Applies to", "www.tataengage.com & microsites"], ["Contact", "tataengage@tata.com"]].map(([label, val]) => (
              <div key={label} style={{ background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.15)", borderRadius: 8, padding: "8px 16px" }}>
                <p style={{ fontSize: 10, fontWeight: 700, color: "rgba(255,255,255,0.45)", textTransform: "uppercase", letterSpacing: "1px", margin: "0 0 4px" }}>{label}</p>
                <p style={{ fontSize: 13, fontWeight: 600, color: "#fff", margin: 0 }}>{val}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Intro */}
      <div style={{ background: "#fff", padding: "40px 56px 0" }}>
        <div style={{ maxWidth: 860, margin: "0 auto", fontFamily: FONT, fontSize: 14.5, color: "#475569", lineHeight: 1.82 }}>
          <P>This privacy statement applies to the main website www.tataengage.com, as well as the sites.tataengage.com sub-domain (sometimes called "microsites"). Please note that these websites may include links to websites of third parties whose privacy practices differ from those of Tata Sons. If you provide personal data to any of those websites, your data is governed by their privacy statements.</P>
        </div>
      </div>

      {/* 1. Definitions */}
      <Sec id="privacy-s1" num="1" title="Definitions" bg="#fff">
        <P>In this privacy policy, the following definitions are used:</P>
        <DefTable rows={[
          ["Data", "Includes information that you submit to Tata Sons via the Website, and information which is accessed by Tata Sons pursuant to your visit to the Website."],
          ["Cookies", "A small text file placed on your computer by this Website when you either visit, or use certain features of, the Website. A cookie generally allows the website to \"remember\" your actions or preference for a certain period of time."],
          ["Data Protection Laws", "Any applicable law relating to the processing of personal Data, including the GDPR and the Information Technology Act, 2000, as amended or substituted."],
          ["GDPR", "The General Data Protection Regulation (EU) 2016/679."],
          ["Tata Sons or us", "Tata Sons Private Limited, a company incorporated in India whose registered office is at Bombay House, 24 Homi Mody Street, Mumbai, India, 400001."],
          ["User or you", "The natural person who accesses the Website."],
          ["Website", "The website that you are currently using, www.tataengage.com, and any sub-domains of this site, unless excluded by their own terms."],
        ]} />
      </Sec>

      {/* 2. Scope */}
      <Sec id="privacy-s2" num="2" title="Scope" bg="#f5f5fa">
        <P>Tata Sons collects data to operate this Website. You provide some of this data directly, such as when you register on the Website or apply for a volunteering project, or indirectly when you log in using Single Sign On from tataworld.com.</P>
        <P>You can visit www.tataengage.com without telling us who you are. You can make choices about our collection and use of your data. For example, you may want to access, edit or remove the personal information in your account, change your password, or close your account.</P>
        <P>When you are asked to provide personal data, you may choose not to provide it. However, if you do not provide personal data that is mandatory to register or apply for a volunteering project, your registration or application will not be completed and you may not be able to access all sections of the Website or participate in volunteering projects or award schemes.</P>
      </Sec>

      {/* 3–6. Data Collected */}
      <Sec id="privacy-s3" num="3–6" title="Data Collected &amp; How We Collect It" bg="#fff">
        <p style={{ margin: "0 0 8px", fontWeight: 700, color: NAVY }}>We may collect information that could allow you to be identified, including:</p>
        <Ul items={[
          "Contact and personal information: first and last name, gender, birth date, email address, city, country, employer, phone number and other similar contact data",
          "Profession and job title",
          "Photograph",
        ]} />
        <p style={{ margin: "14px 0 8px", fontWeight: 700, color: NAVY }}>We collect data in the following ways:</p>
        <Ul items={[
          "Data given to us by you directly",
          "Data collected automatically pursuant to your visit to the Website",
        ]} />
        <p style={{ margin: "14px 0 8px", fontWeight: 700, color: NAVY }}>Data shared by you is collected when:</p>
        <Ul items={[
          "You contact us through the Website",
          "You register with us and apply to participate in volunteering projects or awards schemes",
          "You complete surveys conducted by or for us",
          "You enter a competition or promotion",
          "You elect to receive communications (including newsletters or promotional offers) from us",
          "From information gathered by your visit to our webpages",
        ]} />
        <p style={{ margin: "14px 0 8px", fontWeight: 700, color: NAVY }}>Data collected automatically includes:</p>
        <Ul items={[
          "IP address and the way you use and interact with Website content",
          "Operating system details, browsing details, device details and language settings",
          "Aggregated metrics: number of visits, average time spent on site, pages viewed and similar information",
          "Data collected via Cookies, in line with cookie settings on your browser",
        ]} />
      </Sec>

      {/* 7. Use of Data */}
      <Sec id="privacy-s7" num="7" title="Our Use of Data" bg="#f5f5fa">
        <P>Any or all the above data may be used by us for the following reasons:</P>
        <Ul items={[
          "Improvement of our projects and services, as well as those of our group entities",
          "Transmission by email or any other form of communication of materials to you",
          "Contact for survey or feedback via email or mail",
          "To enable our group entities to reach out to you in relation to their programs, products or services",
          "To process your requests (such as replying to your queries)",
          "To seek your participation in volunteering initiatives of Tata Sons and/or our group entities",
          "To execute marketing campaigns and promotional communications for which consent is appropriately taken",
        ]} />
        <P>We may use your data for the above purposes if we deem it necessary for our legitimate interests. If you are not satisfied with this, you have the right to object (see "Your Rights" below). We also use data to protect the security and safety of our Website.</P>
      </Sec>

      {/* 8. Sharing */}
      <Sec id="privacy-s8" num="8" title="Who We Share Data With" bg="#fff">
        <P>We may share your personal data with:</P>
        <Ul items={[
          "Tata Sons-controlled affiliates, subsidiaries and other entities within the Tata group, to assist them in reaching out to you in relation to their programs or campaigns and to process your queries",
          "Our employees, vendors, agents and professional advisors working on our behalf for the purposes described in this policy",
          "Service-providers who assist in protecting and securing our systems and provide services requiring the processing of personal data, such as hosting or data analysis",
        ]} />
        <P>We usually do not share personal data with other third parties. However, this may happen if you request or authorise us to do so; we need to comply with applicable law or respond to valid legal process; or we need to maintain the security of this website.</P>
      </Sec>

      {/* 9. Security */}
      <Sec id="privacy-s9" num="9" title="Keeping Data Secure" bg="#f5f5fa">
        <P>We will use technical and organisational measures to safeguard your data and we store your data on secure servers. Technical and organisational measures include measures to deal with any suspected data breach.</P>
        <InfoBox title="Report a concern">If you suspect any misuse, loss or unauthorised access to your data, please contact us immediately at <strong>tataengage@tata.com</strong>.</InfoBox>
      </Sec>

      {/* 10. Retention */}
      <Sec id="privacy-s10" num="10" title="Retention of Personal Data" bg="#fff">
        <P>Tata Sons retains personal data for as long as necessary to provide access to and use of the Website, or for other essential purposes such as complying with our legal obligations, resolving disputes and enforcing our rights. Because these needs can vary for different data types and purposes, actual retention periods can vary significantly.</P>
        <P>Even if we delete your data, it may persist on backup or archival media for audit, legal, tax or regulatory purposes.</P>
      </Sec>

      {/* 11–12. Rights + Security */}
      <Sec id="privacy-s11" num="11–12" title="Your Rights &amp; Data Security" bg="#f5f5fa">
        <P>When we process data about you, we do so with your consent and/or as necessary to provide the website you use, operate our business, meet our contractual and legal obligations, protect the security of our systems, or fulfil other legitimate interests of Tata Sons.</P>
        <p style={{ margin: "0 0 8px", fontWeight: 700, color: NAVY }}>Tata Sons adheres to applicable data protection laws, which include the following rights:</p>
        <Ul items={[
          "Right to access — request copies of the information we hold about you, or that we modify, update or delete such information",
          "Right to correct — have your data rectified if it is inaccurate or incomplete",
          "Right to erase — request that we delete or remove your data from our systems",
          "Right to restrict our use of your data — limit the way in which we can use it",
          "Right to data portability — request that we move, copy or transfer your data",
          "Right to object — object to our use of your data including where we use it for our legitimate interests",
        ]} />
        <InfoBox title="Exercise your rights">For information about managing your contact data, email subscriptions and promotional communications, submit a request at <strong>tataengage@tata.com</strong>. Please keep us informed if your data changes during the period for which we hold it.</InfoBox>
        <P>Tata Sons is committed to protecting the security of your data. We use a variety of security technologies and procedures to help protect your personal data from unauthorised access, use or disclosure.</P>
      </Sec>

      {/* 13. Storage */}
      <Sec id="privacy-s13" num="13" title="Where We Store and Process Personal Data" bg="#fff">
        <P>Personal data collected and processed under this statement is hosted on servers located in India. Tata Sons is part of a corporate group with affiliates and subsidiaries based in the European Economic Area (EEA), the U.S. and Asia. We take steps to ensure that the data we collect is processed according to the provisions of this statement and applicable law wherever the data is located.</P>
        <P>Data we collect may be stored and processed in, and transferred to, countries outside of the EEA. We may also share information with group companies located outside the EEA. Transfer of data will be in compliance with applicable laws, and we have put in place appropriate safeguards with the third parties we share your data with.</P>
      </Sec>

      {/* 14. Links */}
      <Sec id="privacy-s14" num="14" title="Links to Other Websites" bg="#f5f5fa">
        <P>This Website may, from time to time, provide links to other websites. We have no control over such websites and are not responsible for their content. This privacy policy does not extend to your use of such websites. You are advised to read the privacy policy or statement of other websites prior to using them.</P>
      </Sec>

      {/* 15–18. Cookies */}
      <Sec id="privacy-cookies" num="15–18" title="Cookies" bg="#fff">
        <P>This Website may place and access certain Cookies on your computer. Tata Sons uses Cookies to improve your experience. Before the Website places Cookies on your computer, you will be presented with a message bar requesting your consent. You may deny consent; however certain features of the Website may not function fully or as intended.</P>
        <div style={{ border: "1px solid #e8e8f0", borderRadius: 12, overflow: "hidden", marginTop: 16, marginBottom: 16 }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", background: "#f5f5fa", borderBottom: "1px solid #e8e8f0" }}>
            <div style={{ padding: "10px 16px", fontWeight: 800, fontSize: 12, textTransform: "uppercase", letterSpacing: "0.8px", color: NAVY }}>Type of Cookie</div>
            <div style={{ padding: "10px 16px", fontWeight: 800, fontSize: 12, textTransform: "uppercase", letterSpacing: "0.8px", color: NAVY }}>Purpose</div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr" }}>
            <div style={{ padding: "12px 16px", fontWeight: 600, fontSize: 13.5 }}>Non-Persistent Cookies</div>
            <div style={{ padding: "12px 16px", fontSize: 13.5 }}>Used to save username and password in memory if the user selects the 'Remember Me' option on the Login page.</div>
          </div>
        </div>
        <Ul items={[
          "You can choose to enable or disable Cookies in your internet browser. By default, most internet browsers accept Cookies, but this can be changed via your browser's help menu.",
          "You can choose to delete Cookies at any time; however, you may lose any information that enables you to access the Website more quickly and efficiently, including personalisation settings.",
          "It is recommended that you ensure your internet browser is up-to-date and that you consult the help and guidance provided by the developer of your browser if unsure about adjusting your privacy settings.",
        ]} />
      </Sec>

      {/* 19–20. General + Changes */}
      <Sec id="privacy-s19" num="19–20" title="General &amp; Changes to This Policy" bg="#f5f5fa">
        <P>If any court or competent authority finds that any provision of this privacy policy is invalid, illegal or unenforceable, that provision will, to the extent required, be deemed to be deleted, and the validity and enforceability of the other provisions will not be affected.</P>
        <P>Tata Sons reserves the right to change this privacy statement as it may deem necessary from time to time or as may be required by law. Any changes will be immediately posted on the Website and you are deemed to have accepted the terms of the privacy statement on your first use of the Website following the alterations.</P>
        <InfoBox title="Contact us">You may contact us by writing to us at <strong>tataengage@tata.com</strong>.</InfoBox>
      </Sec>
    </div>
  );
}
