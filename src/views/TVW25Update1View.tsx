import React, { useState } from "react";
import SubPageDotRail from "@/components/shared/SubPageDotRail";

// ── Tokens — exact platform values ───────────────────────────────────────────
const FONT        = "'DM Sans',ui-sans-serif,system-ui,sans-serif";
const ACCENT_NAVY = "#0D1B3E";
const B_BLUE      = "#135EA9";
const B_YELLOW    = "#F79425";
const B_TEAL      = "#13BBB4";
const B_RED       = "#D84926";
const B_GREEN     = "#0D7C52";
const B_PURPLE    = "#803998";

// Full-bleed hero — a real TVW activity photo (large crowd, works as editorial bg)
const HERO_IMG = "https://www.tataengage.com/images/TVW25_Campaign/Update1/image_22.jpg";

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
  { img: "https://www.tataengage.com/images/TVW25_Campaign/Update1/image_1.jpg",  tag: "Health",          tagColor: B_TEAL,   company: "Tata Motors",                 accent: B_TEAL,   title: "Health Initiative under Integrated Village Development Program (IVDP)",         desc: "A health-focused community initiative at Khatola Gram Panchayat, Udham Singh Nagar. The activity strengthened health awareness and encouraged community engagement around preventive care. Attended by senior leaders from TML Pantnagar including Mahesh Suguru (Sr. GM & Plant Head).", loc: "Udham Singh Nagar" },
  { img: "https://www.tataengage.com/images/TVW25_Campaign/Update1/image_2.jpg",  tag: "Environment",     tagColor: B_GREEN,  company: "Tata Motors",                 accent: B_GREEN,  title: "Sapling Donation & Plantation Drive",                                          desc: "Volunteers planted saplings at the Gurugram Zonal Office and Chandigarh Regional Office to support green cover. Contributing to Climate Action and Life on Land with senior leadership participation.", loc: "Gurugram / Chandigarh, March 5" },
  { img: "https://www.tataengage.com/images/TVW25_Campaign/Update1/image_3.jpg",  tag: "Gender Equality", tagColor: B_RED,    company: "Tata Motors",                 accent: B_RED,    title: "Celebrating Women Warriors (Women who broke stereotypes)",                     desc: "On International Women's Day, 46 volunteers at Tata Motors Thane celebrated women breaking stereotypes, including an interactive road safety session with women RTO officers promoting Gender Equality and Good Health & Well-Being.", loc: "Thane, March 10" },
  { img: "https://www.tataengage.com/images/TVW25_Campaign/Update1/image_4.jpg",  tag: "Art & Culture",   tagColor: B_PURPLE, company: "Tata Steel",                  accent: B_PURPLE, title: "Holi Celebration with Residential Girl Students at Masti Ki Pathshala, Kadma", desc: "31 volunteers contributed 62 hours at Masti Ki Pathshala, engaging residential girl students through discussions, inspiring stories, and a joyful Holi celebration with sweets and fruits distributed.", loc: "Jamshedpur, March 6" },
  { img: "https://www.tataengage.com/images/TVW25_Campaign/Update1/image_5.jpg",  tag: "Education",       tagColor: B_BLUE,   company: "Tata Steel",                  accent: B_BLUE,   title: "Initiative to Support Girl Students",                                          desc: "Four volunteers visited Sanskar Jeevan Arsh Kanya Gurukul Gauri, distributing drawing books, colouring materials, stationery, and providing financial assistance for uniforms — 12 hours of engagement.", loc: "Jamshedpur, March 7" },
  { img: "https://www.tataengage.com/images/TVW25_Campaign/Update1/image_6.jpg",  tag: "Gender Equality", tagColor: B_RED,    company: "Tata Tele Business Services", accent: B_RED,    title: "Women's Day Initiative: Appreciating Women in Our Community",                 desc: "TTBS volunteers recognised women working in eateries near P.S. Srijan Tech Park, Kolkata, distributing reusable water bottles, chocolates, roses and thank-you notes, promoting safe drinking water and community welfare.", loc: "Kolkata, March 9" },
  { img: "https://www.tataengage.com/images/TVW25_Campaign/Update1/image_7.jpg",  tag: "Health",          tagColor: B_TEAL,   company: "IHCL – Taj Wellington Mews",  accent: B_TEAL,   title: "Dental Camp for Girls",                                                        desc: "20 volunteers at the Yojak Centre, Mumbai raised awareness about oral hygiene among young girls — educating on early dental care, proper hygiene practices, and preventive healthcare awareness.", loc: "Mumbai, March 6" },
  { img: "https://www.tataengage.com/images/TVW25_Campaign/Update1/image_8.jpg",  tag: "Art & Culture",   tagColor: B_PURPLE, company: "TAJ SATS Air Catering",       accent: B_PURPLE, title: "Timeless Traditions: Celebrating Holi at an Old Age Home",                    desc: "20 Taj SATS Delhi volunteers celebrated Holi at a Rangpuri old-age home with music, laughter, exchange of colours, and gujiyas — promoting social inclusion, dignity in aging, and intergenerational bonding.", loc: "New Delhi, March 3" },
  { img: "https://www.tataengage.com/images/TVW25_Campaign/Update1/image_9.jpg",  tag: "Health",          tagColor: B_TEAL,   company: "Tata Technologies",           accent: B_TEAL,   title: "Blood Donation Drive",                                                         desc: "57 volunteers at Tata Technologies' Aundh Campus, Pune donated blood to help maintain adequate supplies for patients in need — demonstrating collective commitment to public health.", loc: "Pune, March 5" },
  { img: "https://www.tataengage.com/images/TVW25_Campaign/Update1/image_10.jpg", tag: "Education",       tagColor: B_BLUE,   company: "TACO Group",                  accent: B_BLUE,   title: "Making Story Books in Braille",                                                desc: "76 volunteers at a Tata AutoComp plant in Chakan created ~15 Braille storybooks for visually impaired children, embossing pre-designed pages into tactile formats for literacy and independent learning.", loc: "Chakan, March 4" },
  { img: "https://www.tataengage.com/images/TVW25_Campaign/Update1/image_11.jpg", tag: "Women & Env.",    tagColor: B_RED,    company: "Voltas Ltd.",                 accent: B_RED,    title: "Women's Day Celebration with Tribal Women",                                   desc: "12 volunteers at Ganegaon, Chinchavali in Karjat celebrated Women's Day with tribal women, introducing Voltas' upcoming 10-year afforestation project in partnership with A.K. Rural Development.", loc: "Karjat, March 10" },
  { img: "https://www.tataengage.com/images/TVW25_Campaign/Update1/image_12.jpg", tag: "Environment",     tagColor: B_GREEN,  company: "Tata Chemicals",              accent: B_GREEN,  title: '"Prakruti" Eco Club Program Assessment',                                      desc: "Five TCL volunteers facilitated group discussions on local biodiversity at Vasai Primary School, Mithapur — assessing program impact while strengthening student awareness of conservation.", loc: "Devbhoomi Dwarka, March 6" },
  { img: "https://www.tataengage.com/images/TVW25_Campaign/Update1/image_13.jpg", tag: "Environment",     tagColor: B_GREEN,  company: "Tata Chemicals",              accent: B_GREEN,  title: "Nursery Development",                                                          desc: "Four TCL volunteers conducted a live demonstration on raising saplings at TATACHEM DAV Public School, guiding students and teachers on growing plants from seeds and fostering environmental responsibility.", loc: "Devbhoomi Dwarka, March 10" },
  { img: "https://www.tataengage.com/images/TVW25_Campaign/Update1/image_14.jpg", tag: "Art & Creativity",tagColor: B_PURPLE, company: "Tata Elxsi",                  accent: B_PURPLE, title: "Diary Creation for Underprivileged Students",                                  desc: "75 Tata Elxsi volunteers in Bengaluru created handmade diaries from recycled materials for underprivileged students — encouraging self-expression, creativity and disciplined learning habits.", loc: "Bengaluru, March 3 & 11" },
  { img: "https://www.tataengage.com/images/TVW25_Campaign/Update1/image_15.jpg", tag: "Sustainability",  tagColor: B_GREEN,  company: "Tata Elxsi",                  accent: B_GREEN,  title: "Cloth Bag Painting",                                                           desc: "300 Tata Elxsi employees across Trivandrum and Hyderabad designed reusable cloth bags to be distributed to school children and communities as eco-friendly alternatives to single-use plastics.", loc: "Trivandrum / Hyderabad, March 4 & 12" },
  { img: "https://www.tataengage.com/images/TVW25_Campaign/Update1/image_16.jpg", tag: "Education",       tagColor: B_BLUE,   company: "Tata Chemicals",              accent: B_BLUE,   title: "Drop-Out Survey (Phase I)",                                                    desc: "14 volunteers surveyed villages in Devbhoomi Dwarka, identifying school dropouts across 7 villages (42 dropouts found). Broader effort targets 33 villages and ~500 students, in collaboration with the Primary Education Department, TCL & TCSRD.", loc: "Devbhoomi Dwarka, March 12" },
  { img: "https://www.tataengage.com/images/TVW25_Campaign/Update1/image_17.jpg", tag: "Education",       tagColor: B_BLUE,   company: "Tata Chemicals",              accent: B_BLUE,   title: "Drop-Out Survey (Phase II)",                                                   desc: "Continued survey across Bhimarana, Khatumba and Aniyari identified 20 more dropouts. Initiative supports school retention with family and retiree participation reflecting strong community engagement.", loc: "Devbhoomi Dwarka, March 11" },
  { img: "https://www.tataengage.com/images/TVW25_Campaign/Update1/image_18.jpg", tag: "Cleanliness",     tagColor: B_GREEN,  company: "Tata Chemicals",              accent: B_GREEN,  title: "Cleanliness Drive — Charakla–Dwarka Highway",                                 desc: "60 volunteers plus retirees and family members gathered 4,125 kg of roadside waste over two days — a large-scale cleanliness drive in collaboration with Nagar Palikas, TCL and TCSRD.", loc: "Devbhoomi Dwarka, March 6–7" },
  { img: "https://www.tataengage.com/images/TVW25_Campaign/Update1/image_19.jpg", tag: "Art & Safety",    tagColor: B_PURPLE, company: "Tata Chemicals",              accent: B_PURPLE, title: "Drawing Competition — Safety & Awareness",                                     desc: "Five volunteers and 24 students of Grades 6 and 8 in Shivrajpur expressed ideas on personal safety, road safety and community well-being through creative artwork, fostering awareness and learning.", loc: "Devbhoomi Dwarka, March 13" },
  { img: "https://www.tataengage.com/images/TVW25_Campaign/Update1/image_20.jpg", tag: "Elderly Care",    tagColor: B_TEAL,   company: "Tata Tele Business Services", accent: B_TEAL,   title: "Old Age Home Visit",                                                           desc: "TTBS volunteers and family members visited Second Innings Old Age Home, Nerul, distributing fruits and biscuits, listening to life stories, and pledging to return with spiritual and Marathi books.", loc: "Navi Mumbai, March 11" },
  { img: "https://www.tataengage.com/images/TVW25_Campaign/Update1/image_21.jpg", tag: "Social Inclusion",tagColor: B_TEAL,   company: "Tata Tele Business Services", accent: B_TEAL,   title: "Initiative with Specially Abled Residents of Sadhana Institute",              desc: "28 volunteers at the Sadhana Institute, Hyderabad engaged with intellectually challenged residents through games, art activities and interactive sessions — donating groceries and contributing Rs 10,000.", loc: "Hyderabad, March 14" },
  { img: "https://www.tataengage.com/images/TVW25_Campaign/Update1/image_22.jpg", tag: "Health",          tagColor: B_RED,    company: "Tata Motors",                 accent: B_RED,    title: "Mega Blood Donation Drive — Founders' Day",                                   desc: "On Founders' Day near Telco Colony, Jamshedpur, 1,480 employee volunteers donated blood — recording 3,140 units. Graced by Girish Wagh, MD, Tata Motors CV, this was a landmark act of community service.", loc: "Jamshedpur, March 3" },
  { img: "https://www.tataengage.com/images/TVW25_Campaign/Update1/image_23.jpg", tag: "Environment",     tagColor: B_GREEN,  company: "Tata Motors",                 accent: B_GREEN,  title: "Mulching and Watering of Plants at Plantation Site",                          desc: "50 volunteers from the TML Pantnagar Quality Team carried out mulching and watering in Haldwani to improve soil moisture and support healthy plant growth, strengthening ongoing plantation efforts.", loc: "Haldwani, March 13" },
];

function PinIcon() {
  return (
    <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
      <path d="M6 1C4.07 1 2.5 2.57 2.5 4.5c0 3.15 3.5 6.5 3.5 6.5s3.5-3.35 3.5-6.5C9.5 2.57 7.93 1 6 1z" stroke="#94a3b8" strokeWidth="1.2"/>
      <circle cx="6" cy="4.5" r="1.2" stroke="#94a3b8" strokeWidth="1"/>
    </svg>
  );
}

function ActivityCard({ card }: { card: typeof CARDS[0] }) {
  const [hov, setHov] = useState(false);
  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        background: "#fff", border: "1px solid #e8e8f0", borderRadius: 14,
        overflow: "hidden", display: "flex", flexDirection: "column",
        boxShadow: hov ? "0 8px 24px rgba(0,0,0,0.08)" : "none",
        transform: hov ? "translateY(-3px)" : "translateY(0)",
        transition: "transform 0.18s, box-shadow 0.18s",
        breakInside: "avoid" as any,
        marginBottom: 20,
      }}
    >
      <div style={{ position: "relative", height: 200, overflow: "hidden" }}>
        <img src={card.img} alt={card.title} style={{
          width: "100%", height: "100%", objectFit: "cover", objectPosition: "center", display: "block",
          transform: hov ? "scale(1.04)" : "scale(1)", transition: "transform 0.4s ease",
        }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top,rgba(13,27,62,0.52) 0%,transparent 55%)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 3, background: card.accent }} />
        <span style={{
          position: "absolute", top: 12, right: 12,
          fontFamily: FONT, fontSize: 9, fontWeight: 800,
          letterSpacing: "0.8px", textTransform: "uppercase",
          color: "#fff", padding: "4px 10px", borderRadius: 100,
          background: card.tagColor + "dd", backdropFilter: "blur(6px)",
        }}>{card.tag}</span>
        <span style={{
          position: "absolute", bottom: 12, left: 12,
          fontFamily: FONT, fontSize: 9, fontWeight: 700,
          color: "rgba(255,255,255,0.9)", background: "rgba(0,0,0,0.42)",
          backdropFilter: "blur(4px)", padding: "2px 8px", borderRadius: 100,
        }}>{card.company}</span>
      </div>
      <div style={{ padding: "18px 20px 20px", flex: 1, display: "flex", flexDirection: "column" }}>
        <div style={{ width: 24, height: 3, borderRadius: 2, background: card.accent, marginBottom: 10 }} />
        <div style={{ fontFamily: FONT, fontSize: 14, fontWeight: 800, color: ACCENT_NAVY, lineHeight: 1.35, marginBottom: 8 }}>{card.title}</div>
        <p style={{
          fontFamily: FONT, fontSize: 13, color: "#475569", lineHeight: 1.72, flex: 1,
          display: "-webkit-box", WebkitLineClamp: 4, WebkitBoxOrient: "vertical" as any, overflow: "hidden",
        }}>{card.desc}</p>
        <div style={{ marginTop: 12, display: "flex", alignItems: "center", gap: 5, fontFamily: FONT, fontSize: 11, color: "#94a3b8", fontWeight: 600 }}>
          <PinIcon />{card.loc}
        </div>
      </div>
    </div>
  );
}

export default function TVW25Update1View() {
  return (
    <div style={{ fontFamily: FONT, background: "#f5f5fa", minHeight: "100vh" }}>

      {/* Top accent line */}
      <div style={{ height: 3, background: B_BLUE, width: "100%" }} />

      <SubPageDotRail sections={SECTIONS} accentColour={B_BLUE} />

      {/* ── HERO — full-bleed photo, same pattern as AboutProEngageView ── */}
      <div id="tvw-hero" style={{ position: "relative", minHeight: "92vh", overflow: "hidden", display: "flex", alignItems: "center", paddingTop: 64 }}>
        <img src={HERO_IMG} alt="" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 30%" }} />
        <div style={{ position: "absolute", inset: 0, background: `linear-gradient(110deg,${ACCENT_NAVY}f0 0%,${B_BLUE}cc 38%,${B_BLUE}aa 58%,${B_BLUE}66 78%,${B_BLUE}22 100%)` }} />
        <div style={DIAG} />

        <div style={{ position: "relative", zIndex: 1, maxWidth: 1100, margin: "0 auto", padding: "0 64px", width: "100%" }}>
          <p style={{ fontFamily: FONT, fontSize: 11, fontWeight: 700, letterSpacing: "1.6px", textTransform: "uppercase", color: "rgba(255,255,255,0.65)", margin: "0 0 12px" }}>
            Tata Sustainability Group · TVW 25th Edition
          </p>
          <div style={{ height: 2, width: 48, borderRadius: 2, background: "rgba(255,255,255,0.6)", margin: "0 0 22px" }} />
          <h1 style={{ fontFamily: FONT, fontSize: "clamp(2.4rem,5vw,3.8rem)", fontWeight: 400, color: "#fff", lineHeight: 1.12, letterSpacing: "-0.5px", margin: "0 0 18px" }}>
            Tata Volunteering Week 25
          </h1>
          <p style={{ fontFamily: FONT, fontSize: 15, fontWeight: 300, lineHeight: 1.7, color: "rgba(255,255,255,0.65)", margin: "0 0 8px", maxWidth: 520 }}>
            The 25th Silver Edition — aligned with International Volunteer Year (IVY) — unites the Tata family as the IVY League of Volunteers.
          </p>
          <p style={{ fontFamily: FONT, fontSize: 15, fontWeight: 300, lineHeight: 1.7, color: "rgba(255,255,255,0.65)", margin: "0 0 32px", maxWidth: 520 }}>
            Update 01 features 23 activities from across the Group, 3–31 March 2026.
          </p>
          <a href="https://www.tataengage.com/view-opportunities.aspx" style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            background: B_YELLOW, color: ACCENT_NAVY, borderRadius: 10, padding: "14px 28px",
            fontFamily: FONT, fontSize: 14, fontWeight: 800, textDecoration: "none",
            boxShadow: "0 4px 20px rgba(0,0,0,0.25)",
          }}>
            Explore Opportunities
          </a>
        </div>
      </div>

      {/* ── UPDATE LABEL BAR ── */}
      <div style={{ background: B_BLUE }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "14px 56px", display: "flex", alignItems: "center", gap: 16 }}>
          <span style={{ fontFamily: FONT, fontSize: 15, fontWeight: 900, color: "#fff", letterSpacing: "-0.2px" }}>Update — 01</span>
          <div style={{ flex: 1, height: 1, background: "rgba(255,255,255,0.25)", borderRadius: 1 }} />
          <span style={{ fontFamily: FONT, fontSize: 11, fontWeight: 700, letterSpacing: "1.5px", textTransform: "uppercase", color: "rgba(255,255,255,0.65)" }}>23 Activities · March 2026</span>
        </div>
      </div>

      {/* ── MASONRY CARD GRID ── */}
      <div id="tvw-updates" style={{ maxWidth: 1100, margin: "0 auto", padding: "36px 56px 80px", columns: 2, columnGap: 20 }}>
        {CARDS.map((card, i) => <ActivityCard key={i} card={card} />)}
      </div>

    </div>
  );
}
