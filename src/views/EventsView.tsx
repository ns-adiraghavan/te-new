import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAppNavigate } from "@/hooks/useAppNavigate";
import SubPageDotRail from "@/components/shared/SubPageDotRail";

import tsc22Chairman from "@/assets/events/tsc-2022-chairman.png";
import tsc22Awards   from "@/assets/events/tsc-2022-awards.png";
import volconChacko  from "@/assets/events/volcon-2024-chacko.png";
import volconPanel   from "@/assets/events/volcon-2024-panel.png";
import volconAwardsTCS from "@/assets/events/volcon-2024-awards.png";
import volconNitin   from "@/assets/events/volcon-2024-nitin.png";
import volconArjinder from "@/assets/events/volcon-2024-arjinder.png";
import volconMusic1  from "@/assets/events/volcon-2024-music1.png";
import volconMusic2  from "@/assets/events/volcon-2024-music2.png";
import volconTribalChefs from "@/assets/events/volcon-2024-tribal-chefs.png";
import iavePanel     from "@/assets/events/iave-2022-panel.png";
import iave24Img1    from "@/assets/events/iave24-hero.png";
import iave24Img2    from "@/assets/events/iave24-2.jpg";
import iave24Img3    from "@/assets/events/iave24-3.jpg";
import iave24Img4    from "@/assets/events/iave24-4.png";
import iave24Img5    from "@/assets/events/iave24-5.png";
import iave24Img6    from "@/assets/events/iave24-6.png";
import eventsHeroImg from "@/assets/tce-2.jpg";

const ACCENT_NAVY = "#0D1B3E";
const B_INDIGO    = "#333399";
const FONT        = "'DM Sans','Noto Sans',ui-sans-serif,system-ui,sans-serif";

const EVENT_ACCENT = "#135EA9";  // Single blue accent for all events
const TSC_ACCENT  = EVENT_ACCENT;
const VOL_ACCENT  = EVENT_ACCENT;
const IAVE_ACCENT = EVENT_ACCENT;

const DIAG: React.CSSProperties = {
  position: "absolute", inset: 0,
  backgroundImage: "repeating-linear-gradient(45deg,rgba(255,255,255,0.035) 0px,rgba(255,255,255,0.035) 1px,transparent 1px,transparent 24px)",
  backgroundSize: "24px 24px",
  pointerEvents: "none",
};

// ── Slideshow ─────────────────────────────────────────────────────────────────
function Slideshow({ slides }: { slides: { src: string; caption: string }[] }) {
  const [i, setI] = useState(0);
  useEffect(() => {
    if (slides.length <= 1) return;
    const t = setInterval(() => setI((p) => (p + 1) % slides.length), 6000);
    return () => clearInterval(t);
  }, [slides.length]);
  if (!slides.length) return null;
  return (
    <div style={{ borderRadius: 14, overflow: "hidden", background: "#000" }}>
      <div style={{ position: "relative", aspectRatio: "16/10" }}>
        {slides.map((s, idx) => (
          <img key={idx} src={s.src} alt={s.caption}
            style={{ position: "absolute", inset: 0, width: "100%", height: "100%",
              objectFit: "cover", objectPosition: "center 30%",
              opacity: idx === i ? 1 : 0, transition: "opacity 0.6s ease" }} />
        ))}
        {slides.length > 1 && (
          <div style={{ position: "absolute", bottom: 10, left: 0, right: 0,
            display: "flex", justifyContent: "center", gap: 6, zIndex: 2 }}>
            {slides.map((_, idx) => (
              <button key={idx} onClick={() => setI(idx)}
                style={{ width: idx === i ? 24 : 8, height: 8, borderRadius: 100,
                  border: "none", cursor: "pointer",
                  background: idx === i ? "#fff" : "rgba(255,255,255,0.5)",
                  transition: "all 0.3s" }} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// ── YouTube embed ─────────────────────────────────────────────────────────────
function YouTubeEmbed({ id, caption }: { id: string; caption?: string }) {
  return (
    <div style={{ borderRadius: 14, overflow: "hidden", background: "#000" }}>
      <div style={{ position: "relative", aspectRatio: "16/9" }}>
        <iframe src={`https://www.youtube.com/embed/${id}`} title="YouTube video"
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", border: "none" }}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen />
      </div>
      {caption && (
        <div style={{ background: "#f7f8fc", padding: "12px 16px" }}>
          <p style={{ fontFamily: FONT, fontSize: 12, color: "#374151",
            lineHeight: 1.5, margin: 0, fontStyle: "italic" }}>{caption}</p>
        </div>
      )}
    </div>
  );
}

// ── Hero ──────────────────────────────────────────────────────────────────────
function EventHero({ accent, eyebrow, title, subtitle, heroImage }: {
  accent: string; eyebrow: string; title: string; subtitle: string; heroImage?: string;
}) {
  return (
    <div style={{ position: "relative", minHeight: "92vh", display: "flex",
      flexDirection: "column", justifyContent: "flex-end", overflow: "hidden", paddingTop: 64 }}>
      <img src={heroImage ?? eventsHeroImg} alt=""
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%",
          objectFit: "cover", objectPosition: "center 30%" }} />
      <div style={{ position: "absolute", inset: 0,
        background: "linear-gradient(160deg,rgba(8,12,22,0.82) 0%,rgba(8,12,22,0.60) 45%,rgba(8,12,22,0.22) 100%)" }} />
      <div style={DIAG} />
      <div style={{ position: "relative", zIndex: 1, maxWidth: 1100, margin: "0 auto",
        padding: "0 56px 56px", width: "100%" }}>
        <p style={{ fontFamily: FONT, fontSize: 14, fontWeight: 700, letterSpacing: "1.8px",
          textTransform: "uppercase", color: "#ffffff", margin: "0 0 10px" }}>
          {eyebrow}
        </p>
        <div style={{ height: 2, width: 52, borderRadius: 2, background: accent, marginBottom: 20 }} />
        <h1 style={{ fontFamily: FONT, fontSize: "clamp(2.4rem,5vw,3.8rem)", fontWeight: 400,
          color: "#fff", lineHeight: 1.12, letterSpacing: "-0.4px", margin: "0 0 14px",
          maxWidth: 720 }}>{title}</h1>
        <p style={{ fontFamily: FONT, fontSize: 15, fontWeight: 300,
          color: "rgba(255,255,255,0.78)", lineHeight: 1.7, maxWidth: 520, margin: 0 }}>
          {subtitle}
        </p>
      </div>
    </div>
  );
}

// ── ArticleBody ───────────────────────────────────────────────────────────────
function ArticleBody({ accent, children }: { accent: string; children: React.ReactNode }) {
  return (
    <div style={{ background: "#fff" }}>
      <div style={{ height: 3, background: accent }} />
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "56px 56px 80px" }}>
        {children}
      </div>
    </div>
  );
}

// ── Paragraphs ────────────────────────────────────────────────────────────────
function Paras({ texts }: { texts: string[] }) {
  return (
    <>
      {texts.map((p, i) => (
        <p key={i} style={{ fontFamily: FONT, fontSize: 15, color: "#374151",
          lineHeight: 1.85, margin: "0 0 18px" }}>{p}</p>
      ))}
    </>
  );
}

// ── Section heading ───────────────────────────────────────────────────────────
function SectionHead({ title, accent }: { title: string; accent: string }) {
  return (
    <h2 style={{ fontFamily: FONT, fontSize: 18, fontWeight: 800, color: ACCENT_NAVY,
      letterSpacing: "-0.2px", margin: "40px 0 16px", paddingTop: 8,
      borderTop: `2px solid ${accent}22` }}>{title}</h2>
  );
}

// ── Media + text ──────────────────────────────────────────────────────────────
function MediaBlock({ title, body, media, mediaLeft = false, accent }: {
  title?: string; body: string | string[]; media?: React.ReactNode;
  mediaLeft?: boolean; accent: string;
}) {
  const paras = Array.isArray(body) ? body : [body];
  return (
    <div style={{ margin: "40px 0" }}>
      {title && <SectionHead title={title} accent={accent} />}
      {media ? (
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 40, alignItems: "start" }}>
          <div style={{ order: mediaLeft ? 2 : 1 }}><Paras texts={paras} /></div>
          <div style={{ order: mediaLeft ? 1 : 2 }}>{media}</div>
        </div>
      ) : (
        <Paras texts={paras} />
      )}
    </div>
  );
}

// ── Pull quote — accent-tinted ────────────────────────────────────────────────
function PullQuote({ text, attribution, accent }: {
  text: string; attribution: string; accent: string;
}) {
  return (
    <div style={{ background: accent, borderRadius: 12, padding: "28px 32px", margin: "28px 0" }}>
      <div style={{ fontFamily: "Georgia,serif", fontSize: 32, lineHeight: 0.7,
        color: "rgba(255,255,255,0.25)", marginBottom: 10 }}>"</div>
      <p style={{ fontFamily: "'Playfair Display',Georgia,serif", fontSize: 16,
        fontStyle: "italic", color: "#fff", lineHeight: 1.72, margin: "0 0 16px" }}>{text}</p>
      <p style={{ fontFamily: FONT, fontSize: 11, fontWeight: 700, letterSpacing: "1px",
        textTransform: "uppercase", color: "rgba(255,255,255,0.75)", margin: 0 }}>
        {attribution}
      </p>
    </div>
  );
}

// ── Awards table ──────────────────────────────────────────────────────────────
function AwardsTable({ rows, accent }: { rows: { category: string; winners: string }[]; accent: string }) {
  return (
    <div style={{ border: `1px solid ${accent}22`, borderRadius: 12, overflow: "hidden" }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1.4fr",
        background: accent, padding: "10px 18px" }}>
        {["Award", "Winner(s)"].map(h => (
          <span key={h} style={{ fontFamily: FONT, fontSize: 10, fontWeight: 700,
            letterSpacing: "1px", textTransform: "uppercase",
            color: "rgba(255,255,255,0.75)" }}>{h}</span>
        ))}
      </div>
      {rows.map((row, i) => (
        <div key={i} style={{ display: "grid", gridTemplateColumns: "1fr 1.4fr",
          padding: "12px 18px", background: i % 2 === 0 ? "#fff" : `${accent}06`,
          borderTop: `1px solid ${accent}14` }}>
          <span style={{ fontFamily: FONT, fontSize: 13, fontWeight: 700,
            color: ACCENT_NAVY, lineHeight: 1.4 }}>{row.category}</span>
          <span style={{ fontFamily: FONT, fontSize: 13, color: "#374151",
            lineHeight: 1.5 }}>{row.winners}</span>
        </div>
      ))}
    </div>
  );
}

// ── Photo grid ────────────────────────────────────────────────────────────────
function PhotoGrid({ images }: { images: { src: string; alt: string }[] }) {
  return (
    <div style={{ display: "grid",
      gridTemplateColumns: `repeat(${Math.min(images.length, 2)}, 1fr)`,
      gap: 12, margin: "28px 0" }}>
      {images.map((img, i) => (
        <img key={i} src={img.src} alt={img.alt}
          style={{ width: "100%", borderRadius: 10, objectFit: "cover",
            objectPosition: "center 30%", aspectRatio: "4/3", display: "block" }} />
      ))}
    </div>
  );
}

// ── Opening para block ────────────────────────────────────────────────────────
function OpeningParas({ texts, accent }: { texts: string[]; accent: string }) {
  return (
    <div style={{ borderLeft: `3px solid ${accent}`, paddingLeft: 20, margin: "0 0 40px" }}>
      <Paras texts={texts} />
    </div>
  );
}

// ── Back breadcrumb ───────────────────────────────────────────────────────────
function Breadcrumb({ onBack }: { onBack: () => void }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 20 }}>
      <button onClick={onBack}
        style={{ background: "rgba(255,255,255,0.12)", border: "1px solid rgba(255,255,255,0.2)",
          color: "rgba(255,255,255,0.7)", borderRadius: 6, padding: "4px 12px",
          fontSize: 11, fontWeight: 600, cursor: "pointer", fontFamily: FONT }}>
        ← Events
      </button>
      <span style={{ color: "rgba(255,255,255,0.3)", fontSize: 11 }}>/</span>
      <span style={{ color: "rgba(255,255,255,0.5)", fontSize: 11, fontWeight: 600 }}>
        Tata Engage
      </span>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// PER-EVENT RENDERERS
// ─────────────────────────────────────────────────────────────────────────────

function Tsc2022({ onBack }: { onBack: () => void }) {
  const accent = TSC_ACCENT;
  return (
    <>
      <EventHero accent={accent}
        eyebrow="Tata Engage · Conclave"
        title="Tata Sustainability Conclave 2022"
        subtitle="Volunteering @Tata: Embedding Quality & Scale — Taj Lands End, Mumbai · November 2022"
        heroImage={tsc22Chairman} />
      <ArticleBody accent={accent}>
        <Breadcrumb onBack={onBack} />

        <OpeningParas accent={accent} texts={[
          "After a two-year break due to the pandemic, more than 200 leaders and sustainability professionals from the Tata Group came together at the Tata Sustainability Conclave 2022 — the Tata Sustainability Group's flagship event — inaugurated by the Group Chairman at Taj Lands End, Mumbai on 29th November, 2022.",
          "Mr. Siddharth Sharma, Group Chief Sustainability Officer, delivered the welcome address. Comparing the sustainability journey to an ultra-marathon, the Chairman encouraged companies to sharpen their sustainability agendas, lay out decarbonisation plans, and invest in innovative solutions.",
        ]} />

        <PullQuote accent={accent}
          text="While sustainability is one of the biggest challenges facing corporates today, it is also a big opportunity."
          attribution="N. Chandrasekaran, Chairman, Tata Sons" />

        <MediaBlock accent={accent} title="Volunteering @Tata: Embedding Quality & Scale"
          body={[
            "The volunteering session celebrated the Tata Group legacy of giving back, and sought leadership perspectives on institutionalising volunteering while ensuring scale and quality — on the journey towards 4 per capita volunteering hours (PCVH) by 2025.",
            "Moderated by Mr. Harish Bhat, Brand Custodian, Tata Sons, the panel featured leaders from four Tata Group companies sharing their approaches to building a culture of purposeful volunteering.",
          ]}
          media={<Slideshow slides={[
            { src: tsc22Chairman, caption: "Mr. N. Chandrasekaran, Chairman, Tata Sons delivering the inaugural address at TSC 2022." },
          ]} />} />

        <Paras texts={[
          "Mr. Puneet Chhatwal, MD & CEO, Indian Hotels Company Ltd., shared how IHCL moved from PCVH of 0.59 in FY21 to 2.25 in FY22, embedding volunteering as part of the core value of 'Tajness'.",
          "Mr. Sanjiv Lal, MD & CEO, Rallis India Ltd., spoke on Rallis' rural-community focus and how the company consistently grew PCVH year-on-year while keeping employees engaged with farming communities.",
          "Mr. A.S. Lakshminarayanan, MD & CEO, Tata Communications, highlighted DRIVE Week as the company's flagship volunteering programme, and the approaches adopted to execute it across international locations.",
          "Mr. Milind Lakkad, CHRO, Tata Consultancy Services, spoke on the digital Adult Literacy Programme and TCS' plan to democratise it through the Each One Empowers One platform.",
        ]} />

        <SectionHead title="Tata Volunteering Week Awards" accent={accent} />
        <Paras texts={[
          "The Conclave concluded with the Volunteering Award winners being felicitated by Tata Sons leaders Ms. Roopa Purushothaman, Ms. Nupur Mallick, and Mr. Siddharth Sharma, Group Chief Sustainability Officer.",
        ]} />
        <div style={{ display: "grid", gridTemplateColumns: "1.3fr 1fr", gap: 28,
          alignItems: "start", marginTop: 20 }}>
          <AwardsTable accent={accent} rows={[
            { category: "Volunteering Stalwart", winners: "Tata Consultancy Services" },
            { category: "Highest Hours (TVW-19)", winners: "TCS · Tata Coffee · Tata Consulting Engineers · Tata Realty & Infrastructure" },
            { category: "Excellence in Volunteering", winners: "Tata Communications · TCS · Titan · Rallis India · Tata Insights & Quants" },
            { category: "SPOC Hero", winners: "SPOCs across companies recognised for steering TVW activities" },
            { category: "Exemplary Volunteering", winners: "Individual volunteer champions clocking maximum TVW hours" },
          ]} />
          <Slideshow slides={[
            { src: tsc22Awards, caption: "Volunteering Award winners felicitated at TSC 2022." },
          ]} />
        </div>
      </ArticleBody>
    </>
  );
}

function Volcon2024({ onBack }: { onBack: () => void }) {
  const accent = VOL_ACCENT;
  return (
    <>
      <EventHero accent={accent}
        eyebrow="Tata Engage · VOLCON"
        title="TATA VOLCON 2024"
        subtitle="Celebrating a Million Hours — Taj Mahal Palace, Mumbai · 6 March 2024"
        heroImage={volconAwardsTCS} />
      <ArticleBody accent={accent}>
        <Breadcrumb onBack={onBack} />

        <OpeningParas accent={accent} texts={[
          "On 6th March 2024, Tata Sustainability Group hosted TATA VOLCON 2024 at Taj Mahal Palace, Mumbai — bringing together 170 Tata leaders, volunteering leads, champions, and employees. Over the past seven years, collective efforts have contributed to the Tata Group clocking over a million volunteering hours annually, surpassing the aspiration of 4 volunteering hours per capita.",
          "The day-long programme reiterated the Group's volunteering goal, celebrated champions across companies, and surfaced leaders' perspectives on the pathways to the 2025 aspiration — alongside best practices to deepen and widen volunteering at enterprise level.",
        ]} />

        <MediaBlock accent={accent} title="Opening Address — Chacko Thomas"
          body={[
            "The opening address was delivered by Mr. Chacko Thomas, Group Chief Sustainability Officer at Tata Sons, who highlighted the remarkable volunteering journey of the Tata Group — rooted in Jamsetji Tata's vision of keeping the community central, and the Tata core value of responsibility.",
            "With over a million employees globally, the Tata Group ranked prominently among corporate volunteering programmes worldwide in FY23. He emphasised that embedding scale in volunteering had been possible due to the Group's 'Big Tent' approach.",
          ]}
          media={<Slideshow slides={[
            { src: volconChacko, caption: "Mr. Chacko Thomas, Group Chief Sustainability Officer, delivering the inaugural address at TATA VOLCON 2024." },
          ]} />}
          mediaLeft />

        <MediaBlock accent={accent} title="Special Address — Nichole Cirillo, IAVE"
          body={[
            "The keynote was delivered by Nichole Cirillo, Executive Director of the International Association for Volunteer Efforts (IAVE). She congratulated the Tata Group for fostering a positive, inclusive, and sustainable culture of volunteering, and presented future trends for volunteering identified through IAVE's global research.",
          ]}
          media={<YouTubeEmbed id="ld0-X5_fEGA" caption="Nichole Cirillo, Executive Director of IAVE, delivering the special address at TATA VOLCON 2024." />} />

        <MediaBlock accent={accent} title="Leaders Speak — Panel Discussion"
          body={[
            "Moderated by Mr. Adrian Terron, Head of Corporate Brand and Marketing Strategy at Tata Group, the panelists included Dr. Praveer Sinha (Tata Power Group), Mr. Neelesh Garg (Tata AIG), Mr. Sanjay Dutt (Tata Realty and Infrastructure), and Mr. Milind Lakkad (TCS) — sharing their perspectives on building a culture of volunteering within different business realities.",
          ]}
          media={<Slideshow slides={[
            { src: volconPanel, caption: "Panel discussion at TATA VOLCON 2024 — L–R: Adrian Terron, Neelesh Garg, Praveer Sinha, Sanjay Dutt, Milind Lakkad." },
          ]} />}
          mediaLeft />

        <SectionHead title="Tata Engage Awards" accent={accent} />
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 28, alignItems: "start" }}>
          <Paras texts={[
            "The evening celebrated dedication to year-round volunteering through the prestigious Tata Engage Awards — presented to 11 companies across 9 categories. Honourees included Tata Consultancy Services, Tata Power Group, Tata Communications, Tata Coffee, Titan Company, Rallis India, Tata Consulting Engineers, Tata Realty and Infrastructure, and Tata Insights and Quants.",
            "Two employees — Nitin Yadav (Tata Motors) and Arjinder Singh (Tata Power) — were honoured for Exemplary Volunteering. The winners were felicitated by Mr. K.R.S. Jamwal, Mr. Harish Bhat, and Mr. Chacko Thomas.",
          ]} />
          <Slideshow slides={[
            { src: volconAwardsTCS, caption: "Tata Consultancy Services receiving the Tata Engage Award at VOLCON 2024." },
            { src: volconNitin, caption: "Nitin Yadav, Tata Motors — Exemplary Volunteering Award." },
            { src: volconArjinder, caption: "Arjinder Singh, Tata Power — Exemplary Volunteering Award." },
          ]} />
        </div>

        <MediaBlock accent={accent} title="Cultural Celebration"
          body={[
            "The evening was made special with a musical performance by Kalasagar, the cultural society of Tata Motors, and Tribal Home Chefs supported by Tata Steel Foundation — from 5 states (Meghalaya, Arunachal Pradesh, Himachal Pradesh, Telangana, and Jharkhand) — who served exquisite culinary delights.",
          ]}
          media={<Slideshow slides={[
            { src: volconMusic1, caption: "Kalasagar, the cultural society of Tata Motors, at TATA VOLCON 2024." },
            { src: volconMusic2, caption: "Performers on stage at TATA VOLCON 2024." },
            { src: volconTribalChefs, caption: "Tribal Home Chefs supported by Tata Steel Foundation." },
          ]} />} />
      </ArticleBody>
    </>
  );
}

function Iave2022({ onBack }: { onBack: () => void }) {
  const accent = IAVE_ACCENT;
  return (
    <>
      <EventHero accent={accent}
        eyebrow="Tata Engage · Global Forum"
        title="26th IAVE World Volunteer Conference"
        subtitle="Volunteering for the Common Good — ADNOC Business Center, Abu Dhabi · 24–27 October 2022"
        heroImage={iavePanel} />
      <ArticleBody accent={accent}>
        <Breadcrumb onBack={onBack} />

        <OpeningParas accent={accent} texts={[
          "Tata Sustainability Group was invited as a panel member for the plenary 'Corporate Volunteering for a Post-Pandemic World'. The session was moderated by Dr. Kenn Allen (IAVE, USA); panelists included Dr. Tania Haddad (American University of Beirut), Andronica Mabuya (Discovery, South Africa), Stephanie Franco (TELUS, Canada), and Gauri Rajadhyaksha (Tata Sons, India).",
          "The conference theme — 'Volunteering for the Common Good: Making Life Better for People and Communities' — saw IAVE and the Emirates Foundation celebrate volunteering and call for stronger volunteer leadership to address the world's most pressing challenges.",
        ]} />

        <img src={iavePanel} alt="Gauri Rajadhyaksha at 26th IAVE World Volunteer Conference, Abu Dhabi"
          style={{ width: "100%", display: "block", borderRadius: 14,
            aspectRatio: "16/10", objectFit: "cover", objectPosition: "center 30%",
            margin: "0 0 40px" }} />

        <Paras texts={[
          "Gauri Rajadhyaksha shared the Tata Group's approach to volunteering and the role of Tata Engage in unifying all group companies onto a common platform. She underscored the importance of company-specific programmes that align business context and employee aspirations, and the IAVE recommendations to 'widen the big tent of volunteering' and focus on impact-focused, skill-based volunteering.",
          "She applauded Tata SPOCs across companies for steering the Group to clock over a million volunteering hours annually for seven consecutive years.",
          "The Tata Group has been a member and contributor to IAVE since 2018. Tata Engage won the 'Best Global Volunteer Programme' award from IAVE in 2019 and joined IAVE's Global Corporate Volunteer Council in 2019–20.",
        ]} />

        <PullQuote accent={accent}
          text="For over 150 years, Tata Group has served as a contributor to public good. With over 1 million employees globally, the Tata Group corporate volunteering programme has contributed over 8 million hours. As a member of the Board of Directors of IAVE, we are committed to lending strength to IAVE's stewardship in driving excellence in corporate volunteering."
          attribution="Chacko Thomas, Group Chief Sustainability Officer, Tata Sons" />
      </ArticleBody>
    </>
  );
}

function Iave2024({ onBack }: { onBack: () => void }) {
  const accent = IAVE_ACCENT;
  return (
    <>
      <EventHero accent={accent}
        eyebrow="Tata Engage · Global Forum"
        title="27th IAVE World Volunteer Conference"
        subtitle="People Power: Creating a Sustainable Future through Volunteering — Busan, Republic of Korea · 22–24 October 2024"
        heroImage={iave24Img1} />
      <ArticleBody accent={accent}>
        <Breadcrumb onBack={onBack} />

        <OpeningParas accent={accent} texts={[
          "Tata Sustainability Group was invited to participate in the 27th IAVE World Volunteer Conference, themed 'People Power: Creating a Sustainable Future through Volunteering.' The conference was inaugurated by the Hon'ble President of South Korea, Yoon Suk Yeol, who underscored the urgent need for global solidarity.",
          "The event brought together over 1,500 volunteer leaders from 90 countries, reaffirming the power of volunteering to co-create solutions for pressing global challenges.",
        ]} />

        <MediaBlock accent={accent} title="Plenary Session — Shrirang Dhavale"
          body="Shrirang Dhavale represented Tata Sustainability Group in the plenary session 'Responding to the Sustainability Challenge: The Role of Corporate Volunteering.' He emphasised how volunteering can help reimagine personal values and lifestyles to address climate change, highlighting Tata's perspective on embedding sustainability into corporate volunteering ecosystems."
          media={<img src={iave24Img2} alt="Shrirang Dhavale at IAVE 2024 plenary"
            style={{ width: "100%", borderRadius: 12, objectFit: "cover",
              objectPosition: "center 30%", aspectRatio: "4/3", display: "block" }} />} />

        <MediaBlock accent={accent} title="Global Corporate Volunteer Council — Gauri Rajadhyaksha & Pallavi Barua"
          body="Gauri Rajadhyaksha and Pallavi Barua represented Tata Engage at the Global Corporate Volunteer Council (GCVC) meeting, deliberating on trends in corporate volunteering across Asia — Korea, China, and Japan — and highlighting new opportunities and challenges. The sessions enabled rich cross-sharing of strategies and innovative initiatives."
          media={<img src={iave24Img3} alt="Gauri and Pallavi at GCVC"
            style={{ width: "100%", borderRadius: 12, objectFit: "cover",
              objectPosition: "center 30%", aspectRatio: "4/3", display: "block" }} />}
          mediaLeft />

        <MediaBlock accent={accent} title="India Country Spotlight — Pallavi Barua"
          body="Pallavi Barua presented Tata Communications' DRIVE campaign during the India Country Spotlight, offering a five-point recommendation for companies planning to embed scale in their volunteering programmes."
          media={<img src={iave24Img4} alt="Pallavi Barua presenting India Country Spotlight"
            style={{ width: "100%", borderRadius: 12, objectFit: "cover",
              objectPosition: "center 30%", aspectRatio: "4/3", display: "block" }} />} />

        <SectionHead title="Key Highlights" accent={accent} />
        <Paras texts={[
          "The plenary and GCVC sessions reinforced the importance of skill-based volunteering and impact-focused initiatives in the post-pandemic era — a direction the Tata Group has been pioneering through ProEngage.",
          "Tata Engage's role as a unifying platform across Tata companies was spotlighted, showcasing how SPOCs and employee champions have enabled the Group to consistently clock over a million volunteering hours annually for seven consecutive years.",
          "Since 2020, the Tata Group has been part of the Global Corporate Volunteer Council, steering discussions on corporate volunteering and remaining committed to fostering a collaborative spirit globally.",
        ]} />

        <PhotoGrid images={[
          { src: iave24Img5, alt: "IAVE 2024 session" },
          { src: iave24Img6, alt: "IAVE 2024 closing" },
        ]} />

        <Paras texts={[
          "The conference celebrated volunteering as a driver of sustainability and inclusion. Tata Sustainability Group's participation highlighted the Group's belief that volunteering is not only about giving time but also about reimagining values, lifestyles, and business contexts to create a more sustainable future.",
        ]} />
        <a href="https://iave.org" target="_blank" rel="noopener noreferrer"
          style={{ display: "inline-flex", alignItems: "center", gap: 8, background: accent,
            color: "#fff", borderRadius: 10, padding: "10px 22px", fontFamily: FONT,
            fontWeight: 700, fontSize: 13, textDecoration: "none" }}>
          Visit IAVE ↗
        </a>
      </ArticleBody>
    </>
  );
}

// ── Main ──────────────────────────────────────────────────────────────────────
const SECTIONS_NAV = [
  { id: "story-hero", label: "Overview" },
  { id: "story-body", label: "Story" },
];

export default function EventsView() {
  const params = useParams();
  const id = params.slug;
  const navigate = useAppNavigate();
  const onBack = () => navigate("events-page");

  const accentFor: Record<string, string> = {
    "tsc-2022": TSC_ACCENT,
    "volcon-2024": VOL_ACCENT,
    "iave-2022": IAVE_ACCENT,
    "iave-2024": IAVE_ACCENT,
  };
  const accent = (id && accentFor[id]) || B_INDIGO;

  const renderer = (() => {
    switch (id) {
      case "tsc-2022":    return <Tsc2022 onBack={onBack} />;
      case "volcon-2024": return <Volcon2024 onBack={onBack} />;
      case "iave-2022":   return <Iave2022 onBack={onBack} />;
      case "iave-2024":   return <Iave2024 onBack={onBack} />;
      default: return null;
    }
  })();

  if (!renderer) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center",
        justifyContent: "center", fontFamily: FONT, paddingTop: 64 }}>
        <div style={{ textAlign: "center" }}>
          <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "2px",
            textTransform: "uppercase", color: "#94a3b8", marginBottom: 16 }}>
            Event not found
          </p>
          <h1 style={{ fontSize: 32, fontWeight: 900, color: ACCENT_NAVY, marginBottom: 24 }}>
            This event doesn't exist yet.
          </h1>
          <button onClick={() => navigate("events-page")}
            style={{ background: B_INDIGO, color: "#fff", border: "none", borderRadius: 10,
              padding: "10px 24px", fontFamily: FONT, fontWeight: 700, fontSize: 14,
              cursor: "pointer" }}>
            ← Back to Events
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ background: "#f7f8fc", minHeight: "100vh", fontFamily: FONT }}>
      <div style={{ height: 3, background: accent, width: "100%" }} />
      <SubPageDotRail sections={SECTIONS_NAV} accentColour={accent} />
      <div id="story-hero">{renderer}</div>
      <div id="story-body" />
    </div>
  );
}
