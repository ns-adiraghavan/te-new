import React, { useState } from "react";
import SubPageDotRail from "@/components/shared/SubPageDotRail";

const FONT        = "'DM Sans',ui-sans-serif,system-ui,sans-serif";
const ACCENT_NAVY = "#0D1B3E";
const B_BLUE      = "#135EA9";
const B_YELLOW    = "#F79425";
const B_TEAL      = "#13BBB4";
const B_RED       = "#D84926";
const B_GREEN     = "#0D7C52";
const B_PURPLE    = "#803998";

// Better hero — sharper, more editorial crowd image
const HERO_IMG = "https://www.tataengage.com/images/TVW25_Campaign/Update1/image_4.jpg";

const COLOUR_CYCLE = ["#135EA9", "#307FE2", "#00A896", "#803998", "#F4838A"];

const DIAG: React.CSSProperties = {
  position: "absolute", inset: 0,
  backgroundImage: "repeating-linear-gradient(45deg,rgba(255,255,255,0.03) 1px,transparent 1px)",
  backgroundSize: "28px 28px",
  pointerEvents: "none",
};

const SECTIONS = [
  { id: "tvw-hero",    label: "Overview"   },
  { id: "tvw-updates", label: "Activities" },
];

const CARDS = [
  { img: "https://www.tataengage.com/images/TVW25_Campaign/Update1/image_1.jpg",  tag: "Health",          company: "Tata Motors",                 title: "Health Initiative under Integrated Village Development Program (IVDP)",         desc: "A health-focused community initiative at Khatola Gram Panchayat, Udham Singh Nagar, strengthening health awareness and community engagement around preventive care.", loc: "Udham Singh Nagar" },
  { img: "https://www.tataengage.com/images/TVW25_Campaign/Update1/image_2.jpg",  tag: "Environment",     company: "Tata Motors",                 title: "Sapling Donation & Plantation Drive",                                          desc: "Volunteers planted saplings at the Gurugram Zonal Office and Chandigarh Regional Office, contributing to Climate Action and Life on Land.", loc: "Gurugram / Chandigarh, March 5" },
  { img: "https://www.tataengage.com/images/TVW25_Campaign/Update1/image_3.jpg",  tag: "Gender Equality", company: "Tata Motors",                 title: "Celebrating Women Warriors (Women who broke stereotypes)",                     desc: "On International Women's Day, 46 volunteers celebrated women breaking stereotypes, including an interactive road safety session with women RTO officers.", loc: "Thane, March 10" },
  { img: "https://www.tataengage.com/images/TVW25_Campaign/Update1/image_4.jpg",  tag: "Art & Culture",   company: "Tata Steel",                  title: "Holi Celebration with Residential Girl Students at Masti Ki Pathshala, Kadma", desc: "31 volunteers contributed 62 hours engaging residential girl students through discussions, inspiring stories, and a joyful Holi celebration.", loc: "Jamshedpur, March 6" },
  { img: "https://www.tataengage.com/images/TVW25_Campaign/Update1/image_5.jpg",  tag: "Education",       company: "Tata Steel",                  title: "Initiative to Support Girl Students",                                          desc: "Four volunteers distributed drawing books, colouring materials, stationery, and provided financial assistance for uniforms — 12 hours of engagement.", loc: "Jamshedpur, March 7" },
  { img: "https://www.tataengage.com/images/TVW25_Campaign/Update1/image_6.jpg",  tag: "Gender Equality", company: "Tata Tele Business Services", title: "Women's Day Initiative: Appreciating Women in Our Community",                 desc: "TTBS volunteers distributed reusable water bottles, chocolates, roses and thank-you notes to women workers near P.S. Srijan Tech Park, Kolkata.", loc: "Kolkata, March 9" },
  { img: "https://www.tataengage.com/images/TVW25_Campaign/Update1/image_7.jpg",  tag: "Health",          company: "IHCL – Taj Wellington Mews",  title: "Dental Camp for Girls",                                                        desc: "20 volunteers at the Yojak Centre, Mumbai raised awareness about oral hygiene among young girls, educating on early dental care and preventive healthcare.", loc: "Mumbai, March 6" },
  { img: "https://www.tataengage.com/images/TVW25_Campaign/Update1/image_8.jpg",  tag: "Art & Culture",   company: "TAJ SATS Air Catering",       title: "Timeless Traditions: Celebrating Holi at an Old Age Home",                    desc: "20 Taj SATS Delhi volunteers celebrated Holi with music, exchange of colours, and gujiyas at a Rangpuri old-age home, promoting intergenerational bonding.", loc: "New Delhi, March 3" },
  { img: "https://www.tataengage.com/images/TVW25_Campaign/Update1/image_9.jpg",  tag: "Health",          company: "Tata Technologies",           title: "Blood Donation Drive",                                                         desc: "57 volunteers at Tata Technologies' Aundh Campus donated blood, demonstrating collective commitment to public health and well-being.", loc: "Pune, March 5" },
  { img: "https://www.tataengage.com/images/TVW25_Campaign/Update1/image_10.jpg", tag: "Education",       company: "TACO Group",                  title: "Making Story Books in Braille",                                                desc: "76 volunteers at a Tata AutoComp plant created ~15 Braille storybooks for visually impaired children, embossing pages into tactile formats for literacy.", loc: "Chakan, March 4" },
  { img: "https://www.tataengage.com/images/TVW25_Campaign/Update1/image_11.jpg", tag: "Women & Env.",    company: "Voltas Ltd.",                 title: "Women's Day Celebration with Tribal Women",                                   desc: "12 volunteers celebrated Women's Day with tribal women in Karjat, introducing Voltas' upcoming 10-year afforestation project with A.K. Rural Development.", loc: "Karjat, March 10" },
  { img: "https://www.tataengage.com/images/TVW25_Campaign/Update1/image_12.jpg", tag: "Environment",     company: "Tata Chemicals",              title: '"Prakruti" Eco Club Program Assessment',                                      desc: "Five TCL volunteers facilitated group discussions on local biodiversity at Vasai Primary School, assessing program impact and conservation awareness.", loc: "Devbhoomi Dwarka, March 6" },
  { img: "https://www.tataengage.com/images/TVW25_Campaign/Update1/image_13.jpg", tag: "Environment",     company: "Tata Chemicals",              title: "Nursery Development",                                                          desc: "Four TCL volunteers gave a live demonstration on raising saplings at TATACHEM DAV Public School, guiding students on growing plants from seeds.", loc: "Devbhoomi Dwarka, March 10" },
  { img: "https://www.tataengage.com/images/TVW25_Campaign/Update1/image_14.jpg", tag: "Art & Creativity",company: "Tata Elxsi",                  title: "Diary Creation for Underprivileged Students",                                  desc: "75 Tata Elxsi volunteers created handmade diaries from recycled materials, encouraging self-expression, creativity and disciplined learning habits.", loc: "Bengaluru, March 3 & 11" },
  { img: "https://www.tataengage.com/images/TVW25_Campaign/Update1/image_15.jpg", tag: "Sustainability",  company: "Tata Elxsi",                  title: "Cloth Bag Painting",                                                           desc: "300 Tata Elxsi employees designed reusable cloth bags as eco-friendly alternatives to single-use plastics, for school children and communities.", loc: "Trivandrum / Hyderabad, March 4 & 12" },
  { img: "https://www.tataengage.com/images/TVW25_Campaign/Update1/image_16.jpg", tag: "Education",       company: "Tata Chemicals",              title: "Drop-Out Survey (Phase I)",                                                    desc: "14 volunteers surveyed villages identifying 42 dropouts across 7 villages. Broader effort targets 33 villages and ~500 students with the Primary Education Department.", loc: "Devbhoomi Dwarka, March 12" },
  { img: "https://www.tataengage.com/images/TVW25_Campaign/Update1/image_17.jpg", tag: "Education",       company: "Tata Chemicals",              title: "Drop-Out Survey (Phase II)",                                                   desc: "Continued survey across Bhimarana, Khatumba and Aniyari identified 20 more dropouts, with strong family and retiree participation throughout.", loc: "Devbhoomi Dwarka, March 11" },
  { img: "https://www.tataengage.com/images/TVW25_Campaign/Update1/image_18.jpg", tag: "Cleanliness",     company: "Tata Chemicals",              title: "Cleanliness Drive — Charakla–Dwarka Highway",                                 desc: "60 volunteers plus retirees gathered 4,125 kg of roadside waste over two days in collaboration with Nagar Palikas, TCL and TCSRD.", loc: "Devbhoomi Dwarka, March 6–7" },
  { img: "https://www.tataengage.com/images/TVW25_Campaign/Update1/image_19.jpg", tag: "Art & Safety",    company: "Tata Chemicals",              title: "Drawing Competition — Safety & Awareness",                                     desc: "Five volunteers and 24 students expressed ideas on personal safety, road safety and community well-being through creative artwork in Shivrajpur.", loc: "Devbhoomi Dwarka, March 13" },
  { img: "https://www.tataengage.com/images/TVW25_Campaign/Update1/image_20.jpg", tag: "Elderly Care",    company: "Tata Tele Business Services", title: "Old Age Home Visit",                                                           desc: "TTBS volunteers visited Second Innings Old Age Home, Nerul, distributing fruits and biscuits and listening to life stories.", loc: "Navi Mumbai, March 11" },
  { img: "https://www.tataengage.com/images/TVW25_Campaign/Update1/image_21.jpg", tag: "Social Inclusion",company: "Tata Tele Business Services", title: "Initiative with Specially Abled Residents of Sadhana Institute",              desc: "28 volunteers at the Sadhana Institute engaged with intellectually challenged residents through games, art activities and interactive sessions.", loc: "Hyderabad, March 14" },
  { img: "https://www.tataengage.com/images/TVW25_Campaign/Update1/image_22.jpg", tag: "Health",          company: "Tata Motors",                 title: "Mega Blood Donation Drive — Founders' Day",                                   desc: "1,480 employee volunteers donated blood on Founders' Day, recording 3,140 units — graced by Girish Wagh, MD, Tata Motors CV.", loc: "Jamshedpur, March 3" },
  { img: "https://www.tataengage.com/images/TVW25_Campaign/Update1/image_23.jpg", tag: "Environment",     company: "Tata Motors",                 title: "Mulching and Watering of Plants at Plantation Site",                          desc: "50 volunteers from TML Pantnagar carried out mulching and watering in Haldwani to improve soil moisture and support healthy plant growth.", loc: "Haldwani, March 13" },
];

function PinIcon() {
  return (
    <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
      <path d="M6 1C4.07 1 2.5 2.57 2.5 4.5c0 3.15 3.5 6.5 3.5 6.5s3.5-3.35 3.5-6.5C9.5 2.57 7.93 1 6 1z"
        stroke="currentColor" strokeWidth="1.2" fill="none"/>
    </svg>
  );
}

// ── Activity card — compact, distinct from JourneyView ───────────────────────
// Format: coloured header band (not full-panel), photo below, text at bottom
function ActivityCard({ card, colour }: { card: typeof CARDS[0]; colour: string }) {
  const [hov, setHov] = useState(false);

  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        background: "#fff",
        border: "1px solid #e8e8f0",
        borderRadius: 16,
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        boxShadow: hov ? "0 12px 32px rgba(13,27,62,0.12)" : "0 2px 8px rgba(13,27,62,0.04)",
        transform: hov ? "translateY(-3px)" : "translateY(0)",
        transition: "transform 0.2s ease, box-shadow 0.2s ease",
      }}
    >
      {/* Coloured header band with tag + company */}
      <div style={{
        background: colour,
        padding: "12px 16px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        position: "relative",
        overflow: "hidden",
      }}>
        <div style={DIAG} />
        {/* Tag pill */}
        <span style={{
          fontFamily: FONT,
          fontSize: 9, fontWeight: 800,
          letterSpacing: "1.2px", textTransform: "uppercase",
          color: "#fff",
          background: "rgba(255,255,255,0.18)",
          border: "1px solid rgba(255,255,255,0.25)",
          padding: "3px 8px", borderRadius: 4,
          position: "relative", zIndex: 1,
        }}>{card.tag}</span>
        {/* Company */}
        <span style={{
          fontFamily: FONT,
          fontSize: 9, fontWeight: 700,
          color: "rgba(255,255,255,0.72)",
          position: "relative", zIndex: 1,
          maxWidth: 140, textAlign: "right", lineHeight: 1.3,
        }}>{card.company}</span>
      </div>

      {/* Photo */}
      <div style={{ position: "relative", height: 180, overflow: "hidden", flexShrink: 0 }}>
        <img
          src={card.img}
          alt={card.title}
          style={{
            width: "100%", height: "100%",
            objectFit: "cover", objectPosition: "center",
            display: "block",
            transform: hov ? "scale(1.04)" : "scale(1)",
            transition: "transform 0.4s ease",
          }}
        />
        {/* Bottom colour bar */}
        <div style={{
          position: "absolute", bottom: 0, left: 0, right: 0,
          height: 3, background: colour,
        }} />
      </div>

      {/* Text body */}
      <div style={{ padding: "16px 18px 18px", flex: 1, display: "flex", flexDirection: "column" }}>
        <div style={{
          fontFamily: FONT,
          fontSize: 13, fontWeight: 800,
          color: ACCENT_NAVY, lineHeight: 1.35,
          marginBottom: 8,
        }}>{card.title}</div>
        <p style={{
          fontFamily: FONT,
          fontSize: 12, color: "#475569",
          lineHeight: 1.7, flex: 1,
          margin: 0,
          display: "-webkit-box",
          WebkitLineClamp: 3,
          WebkitBoxOrient: "vertical" as const,
          overflow: "hidden",
        }}>{card.desc}</p>
        {/* Location */}
        <div style={{
          marginTop: 12,
          display: "flex", alignItems: "center", gap: 4,
          fontFamily: FONT, fontSize: 10, fontWeight: 600,
          color: colour, opacity: 0.85,
        }}>
          <PinIcon />{card.loc}
        </div>
      </div>
    </div>
  );
}

// ── Section divider between colour groups ────────────────────────────────────
function ThemeDivider({ label, colour }: { label: string; colour: string }) {
  return (
    <div style={{
      display: "flex", alignItems: "center", gap: 14,
      margin: "48px 0 28px",
    }}>
      <div style={{ width: 4, height: 20, borderRadius: 2, background: colour, flexShrink: 0 }} />
      <span style={{
        fontFamily: FONT, fontSize: 11, fontWeight: 700,
        letterSpacing: "1.6px", textTransform: "uppercase",
        color: colour,
      }}>{label}</span>
      <div style={{ flex: 1, height: 1, background: "#e8e8f0" }} />
    </div>
  );
}

export default function TVW25Update1View() {
  return (
    <div style={{ fontFamily: FONT, background: "#f5f5fa", minHeight: "100vh" }}>

      {/* Top accent line */}
      <div style={{ height: 3, background: B_BLUE, width: "100%" }} />

      <SubPageDotRail sections={SECTIONS} accentColour={B_BLUE} />

      {/* ── HERO ── */}
      <div id="tvw-hero" style={{
        position: "relative", minHeight: "92vh",
        overflow: "hidden", display: "flex",
        alignItems: "center", paddingTop: 64,
      }}>
        <img
          src={HERO_IMG} alt=""
          style={{
            position: "absolute", inset: 0,
            width: "100%", height: "100%",
            objectFit: "cover", objectPosition: "center 40%",
          }}
        />
        <div style={{
          position: "absolute", inset: 0,
          background: `linear-gradient(110deg,${ACCENT_NAVY}f2 0%,${B_BLUE}cc 38%,${B_BLUE}99 58%,${B_BLUE}55 78%,${B_BLUE}11 100%)`,
        }} />
        <div style={DIAG} />

        <div style={{
          position: "relative", zIndex: 1,
          maxWidth: 1100, margin: "0 auto",
          padding: "0 64px", width: "100%",
        }}>
          <p style={{
            fontFamily: FONT, fontSize: 11, fontWeight: 700,
            letterSpacing: "1.6px", textTransform: "uppercase",
            color: "rgba(255,255,255,0.65)", margin: "0 0 12px",
          }}>
            Tata Sustainability Group · TVW 25th Edition
          </p>
          <div style={{ height: 2, width: 48, borderRadius: 2, background: "rgba(255,255,255,0.6)", margin: "0 0 22px" }} />
          <h1 style={{
            fontFamily: FONT,
            fontSize: "clamp(2.4rem,5vw,3.8rem)",
            fontWeight: 400, color: "#fff",
            lineHeight: 1.12, letterSpacing: "-0.5px",
            margin: "0 0 18px",
          }}>
            Tata Volunteering Week 25
          </h1>
          <p style={{
            fontFamily: FONT, fontSize: 15, fontWeight: 300,
            lineHeight: 1.7, color: "rgba(255,255,255,0.65)",
            margin: "0 0 8px", maxWidth: 520,
          }}>
            The 25th Silver Edition — aligned with International Volunteer Year (IVY) — unites the Tata family as the IVY League of Volunteers.
          </p>
          <p style={{
            fontFamily: FONT, fontSize: 15, fontWeight: 300,
            lineHeight: 1.7, color: "rgba(255,255,255,0.65)",
            margin: "0 0 32px", maxWidth: 520,
          }}>
            Update 01 features 23 activities from across the Group, 3–31 March 2026.
          </p>
          <a
            href="https://www.tataengage.com/view-opportunities.aspx"
            style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              background: B_YELLOW, color: ACCENT_NAVY,
              borderRadius: 10, padding: "14px 28px",
              fontFamily: FONT, fontSize: 14, fontWeight: 800,
              textDecoration: "none",
              boxShadow: "0 4px 20px rgba(0,0,0,0.25)",
            }}
          >
            Explore Opportunities
          </a>
        </div>
      </div>

      {/* ── UPDATE LABEL BAR ── */}
      <div style={{ background: B_BLUE }}>
        <div style={{
          maxWidth: 1100, margin: "0 auto",
          padding: "14px 56px",
          display: "flex", alignItems: "center", gap: 16,
        }}>
          <span style={{ fontFamily: FONT, fontSize: 15, fontWeight: 900, color: "#fff", letterSpacing: "-0.2px" }}>
            Update — 01
          </span>
          <div style={{ flex: 1, height: 1, background: "rgba(255,255,255,0.25)", borderRadius: 1 }} />
          <span style={{
            fontFamily: FONT, fontSize: 11, fontWeight: 700,
            letterSpacing: "1.5px", textTransform: "uppercase",
            color: "rgba(255,255,255,0.65)",
          }}>23 Activities · March 2026</span>
        </div>
      </div>

      {/* ── ACTIVITY GRID ── */}
      <div id="tvw-updates" style={{ maxWidth: 1100, margin: "0 auto", padding: "48px 56px 80px" }}>

        {/* Intro stat strip — 3 headline numbers */}
        <div style={{
          display: "grid", gridTemplateColumns: "repeat(3,1fr)",
          gap: 16, marginBottom: 52,
        }}>
          {[
            { num: "23", label: "Activities", sub: "across the Group" },
            { num: "1,480+", label: "Volunteers", sub: "in a single initiative" },
            { num: "3–31", label: "March 2026", sub: "TVW 25th Edition" },
          ].map((s, i) => (
            <div key={i} style={{
              background: "#fff",
              border: "1px solid #e8e8f0",
              borderRadius: 14,
              padding: "20px 24px",
              borderTop: `3px solid ${COLOUR_CYCLE[i]}`,
            }}>
              <div style={{
                fontFamily: FONT, fontSize: 32, fontWeight: 900,
                color: COLOUR_CYCLE[i], letterSpacing: "-0.8px", lineHeight: 1,
                marginBottom: 4,
              }}>{s.num}</div>
              <div style={{ fontFamily: FONT, fontSize: 13, fontWeight: 700, color: ACCENT_NAVY }}>{s.label}</div>
              <div style={{ fontFamily: FONT, fontSize: 11, color: "#94a3b8", marginTop: 2 }}>{s.sub}</div>
            </div>
          ))}
        </div>

        {/* Cards grid — 3 columns */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 20 }}>
          {CARDS.map((card, i) => (
            <ActivityCard
              key={i}
              card={card}
              colour={COLOUR_CYCLE[i % COLOUR_CYCLE.length]}
            />
          ))}
        </div>

      </div>
    </div>
  );
}
