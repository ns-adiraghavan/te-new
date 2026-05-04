// Hero images
import tsc22Chairman   from "@/assets/events/tsc-2022-chairman.png";
import tsc22Awards     from "@/assets/events/tsc-2022-awards.png";
import volconChacko    from "@/assets/events/volcon-2024-chacko.png";
import volconPanel     from "@/assets/events/volcon-2024-panel.png";
import volconAwards    from "@/assets/events/volcon-2024-awards.png";
import volconNitin     from "@/assets/events/volcon-2024-nitin.png";
import volconArjinder  from "@/assets/events/volcon-2024-arjinder.png";
import volconMusic1    from "@/assets/events/volcon-2024-music1.png";
import volconTribal    from "@/assets/events/volcon-2024-tribal-chefs.png";
import iavePanel       from "@/assets/events/iave-2022-panel.png";
import iave24Hero      from "@/assets/events/iave24-hero.png";
import iave24Img2      from "@/assets/events/iave24-2.jpg";
import iave24Img3      from "@/assets/events/iave24-3.jpg";
import iave24Img4      from "@/assets/events/iave24-4.png";
import iave24Img5      from "@/assets/events/iave24-5.png";
import iave24Img6      from "@/assets/events/iave24-6.png";

const ACCENT_NAVY  = "#0D1B3E";
const E_BLUE_TVW   = "#135EA9";   // iave-2024 — TVW blue
const E_BLUE_MID   = "#3B7ABD";   // volcon-2024 — mid blue
const E_PURPLE     = "#5B21B6";   // tsc-2022 — purple
const E_BLUE_ABOUT = "#4376BB";   // iave-2022 — about blue

export interface EventPhoto {
  src: string;
  caption?: string;
}

export interface EventSection {
  heading?: string;
  body?: string;
  bullets?: string[];
  table?: { headers: string[]; rows: string[][] };
}

export interface EventQuote {
  text: string;
  attribution: string;
  role?: string;
}

export interface EventEntry {
  slug: string;
  title: string;
  subtitle: string;
  eyebrow: string;
  tag: string;
  date: string;
  location?: string;
  excerpt: string;
  accentColor: string;
  heroImage: string;
  heroImageAlt: string;
  photos: EventPhoto[];
  openingPara: string;
  sections: EventSection[];
  quotes?: EventQuote[];
  stats?: { num: string; label: string }[];
  slideHeadline: string;
  slideSub: string;
}

// Ordered newest first
export const EVENTS: EventEntry[] = [
  {
    slug: "iave-2024",
    title: "27th IAVE World Volunteer Conference",
    subtitle: "People Power: Creating a Sustainable Future through Volunteering",
    eyebrow: "Global Forum",
    tag: "IAVE 2024",
    date: "22–24 October 2024",
    location: "Busan, Republic of Korea",
    excerpt:
      "1,500+ volunteer leaders from 90 countries. Tata Sustainability Group represented at the global forum on the role of corporate volunteering in addressing the sustainability challenge.",
    accentColor: E_BLUE_TVW,
    heroImage: iave24Hero,
    heroImageAlt: "Tata Engage delegation at the 27th IAVE World Volunteer Conference, Busan",
    photos: [
      { src: iave24Img2 },
      { src: iave24Img3 },
      { src: iave24Img4 },
      { src: iave24Img5 },
      { src: iave24Img6 },
    ],
    slideHeadline: "27th IAVE World Volunteer Conference",
    slideSub: "Busan, Republic of Korea · October 2024",
    openingPara:
      "The 27th IAVE World Volunteer Conference, themed 'People Power: Creating a Sustainable Future through Volunteering,' brought together over 1,500 volunteer leaders from 90 countries at the Busan Exhibition and Convention Center. Inaugurated by the President of South Korea, Yoon Suk Yeol, the conference reaffirmed the power of volunteering to co-create solutions for pressing global challenges.",
    sections: [
      {
        heading: "Tata Group's Representation",
        body: "Tata Sustainability Group had a strong presence across multiple sessions of the conference.",
        bullets: [
          "Shrirang Dhavale represented Tata Sustainability Group in the plenary session 'Responding to the Sustainability Challenge: The Role of Corporate Volunteering,' emphasising how volunteering can help reimagine personal values and lifestyles to address climate change.",
          "Gauri Rajadhyaksha and Pallavi Barua joined Shrirang at the Global Corporate Volunteer Council (GCVC) meeting, where participants deliberated on trends in corporate volunteering across Asia — specifically Korea, China, and Japan — and highlighted new opportunities and challenges on the horizon.",
          "Pallavi Barua presented Tata Communications' DRIVE campaign during the India Country Spotlight, offering a five-point recommendation for companies planning to embed scale in their volunteering programmes.",
        ],
      },
      {
        heading: "Key Highlights",
        bullets: [
          "The plenary and GCVC sessions reinforced the importance of skill-based volunteering and impact-focused initiatives in the post-pandemic era.",
          "Tata Engage's role as a unifying platform across Tata companies was spotlighted, showcasing how SPOCs and employee champions have enabled the Group to consistently clock over a million volunteering hours annually for seven consecutive years.",
          "Since 2020, the Tata Group has been part of the Global Corporate Volunteer Council (GCVC) — steering discussions on corporate volunteering and fostering collaboration among member companies globally.",
        ],
      },
      {
        heading: "Reflections",
        body: "The conference celebrated volunteering as a driver of sustainability and inclusion. Tata Sustainability Group's participation highlighted the Group's belief that volunteering is not only about giving time — but about reimagining values, lifestyles, and business contexts to create a more sustainable future.",
      },
    ],
    stats: [
      { num: "1,500+", label: "Participants from 90 countries" },
      { num: "3", label: "TSG delegates" },
      { num: "7", label: "Consecutive years of 1M+ hours" },
    ],
  },

  {
    slug: "volcon-2024",
    title: "TATA VOLCON 2024",
    subtitle: "Celebrating a decade of impact and charting the volunteering agenda",
    eyebrow: "Leadership Conclave",
    tag: "VOLCON 2024",
    date: "6 March 2024",
    location: "Taj Mahal Palace, Mumbai",
    excerpt:
      "170 Tata leaders, volunteering leads, and champions came together to celebrate a million hours, recognise outstanding contributors, and chart the Group's volunteering future.",
    accentColor: E_BLUE_MID,
    heroImage: volconPanel,
    heroImageAlt: "Panel discussion at TATA VOLCON 2024, Taj Mahal Palace Mumbai",
    photos: [
      { src: volconChacko, caption: "Chacko Thomas, Group CSO, delivering the inaugural address" },
      { src: volconAwards, caption: "Tata Consultancy Services receiving the Tata Engage Award" },
      { src: volconNitin,  caption: "Nitin Yadav, Tata Motors — Exemplary Volunteering Award" },
      { src: volconArjinder, caption: "Arjinder Singh, Tata Power — Exemplary Volunteering Award" },
      { src: volconMusic1, caption: "Kalasagar, the cultural society of Tata Motors" },
      { src: volconTribal, caption: "Tribal Home Chefs supported by Tata Steel Foundation" },
    ],
    slideHeadline: "TATA VOLCON 2024",
    slideSub: "Taj Mahal Palace, Mumbai · March 2024",
    openingPara:
      "On 6 March 2024, Tata Sustainability Group hosted TATA VOLCON 2024 at Taj Mahal Palace, Mumbai, bringing together 170 Tata leaders, volunteering leads, champions, and employees. The conclave aimed to reiterate the Group's volunteering aspiration, celebrate the spirit of volunteering, and share leaders' perspectives on pathways to the Group's 2025 goals.",
    sections: [
      {
        heading: "Inaugural Address",
        body: "The opening address was delivered by Mr. Chacko Thomas, Group Chief Sustainability Officer at Tata Sons, who highlighted the remarkable volunteering journey of the Tata Group — rooted in Jamsetji Tata's vision of keeping the community central to everything the Group does. With over a million employees globally, the Tata Group ranks prominently among corporate volunteering programmes worldwide. He emphasised that embedding scale in volunteering had been possible due to the Group's 'Big Tent' approach, and shared that moving ahead, the Group would continue its endeavour to embed further scale and quality in volunteering, towards increased social and environmental impact.",
      },
      {
        heading: "Special Address",
        body: "The keynote was delivered by Nichole Cirillo, Executive Director of IAVE, who congratulated the Tata Group for fostering a positive, inclusive, and sustainable culture of volunteering across its diverse companies. She presented future trends in volunteering identified through IAVE's global research — and expressed the hope that the Tata Group continues as a global leader, achieving the landmark of 10 per capita volunteering hours in the near future.",
      },
      {
        heading: "Leaders Speak — Panel Discussion",
        body: "Moderated by Mr. Adrian Terron, Head of Corporate Brand and Marketing Strategy at Tata Group, the panel included Dr. Praveer Sinha (MD & CEO, Tata Power Group), Mr. Neelesh Garg (MD & CEO, Tata AIG), Mr. Sanjay Dutt (MD & CEO, Tata Realty and Infrastructure), and Mr. Milind Lakkad (CHRO, Tata Consultancy Services). Together they shared perspectives on how a culture of volunteering has been built within different business realities, and how it brings alive the core Tata value of responsibility.",
      },
      {
        heading: "Tata Engage Awards",
        body: "The evening celebrated the remarkable dedication of companies and individuals to year-round volunteering through the Tata Engage Awards — presented to 11 deserving companies across 9 award categories. Two employees were also honoured for Exemplary Volunteering: Nitin Yadav from Tata Motors, and Arjinder Singh from Tata Power.",
        table: {
          headers: ["Award Category", "Winners"],
          rows: [
            ["Volunteering Stalwart", "Tata Consultancy Services"],
            ["Highest Number of Volunteering Hours", "Tata Power Group · Tata Coffee · Tata Consulting Engineers · Tata Realty and Infrastructure"],
            ["Highest Per Capita Volunteering Hours", "Tata Power Group · Tata Coffee · Rallis India · Tata Realty and Infrastructure"],
            ["Highest % Unique Volunteers", "Tata Communications · Titan Company · Rallis India · Tata Insights and Quants"],
            ["Highest Hours During TVW 18", "Tata Power Group · Tata Coffee · Tata Consulting Engineers · Tata Realty and Infrastructure"],
            ["Highest Hours During TVW 19", "Tata Consultancy Services · Tata Coffee · Tata Consulting Engineers · Tata Realty and Infrastructure"],
            ["Excellence in Volunteering", "Tata Communications · Tata Consultancy Services · Titan Company · Rallis India · Tata Insights and Quants"],
            ["SPOC Hero", "Shyam Sunder Singh (Tata Motors) · Harish Kulkarni (Tata Communications) · Santhi PS (Titan) · Deepali Goja (Taj SATS) · Tanmoy Bhattacharjee (Tata Realty)"],
            ["Exemplary Volunteering", "Nitin Yadav, Tata Motors · Arjinder Singh, Tata Power Group"],
          ],
        },
      },
      {
        heading: "An Evening to Remember",
        body: "The evening concluded with a performance by Kalasagar, the cultural society of Tata Motors, and Tribal Home Chefs supported by Tata Steel Foundation from five states — Meghalaya, Arunachal Pradesh, Himachal Pradesh, Telangana, and Jharkhand — who served exquisite culinary delights from across India.",
      },
    ],
    stats: [
      { num: "170", label: "Tata leaders and champions" },
      { num: "11", label: "Award-winning companies" },
      { num: "1M+", label: "Volunteering hours annually" },
    ],
  },

  {
    slug: "tsc-2022",
    title: "Tata Sustainability Conclave 2022",
    subtitle: "Volunteering @Tata: Embedding Quality & Scale",
    eyebrow: "Leadership Conclave",
    tag: "TSC 2022",
    date: "29 November 2022",
    location: "Taj Lands End, Mumbai",
    excerpt:
      "200+ leaders and sustainability professionals deliberated on embedding quality and scale in volunteering — on the path to 4 per capita volunteering hours by 2025.",
    accentColor: E_PURPLE,
    heroImage: tsc22Chairman,
    heroImageAlt: "N. Chandrasekaran, Chairman Tata Sons, delivering the inaugural address at TSC 2022",
    photos: [
      { src: tsc22Awards, caption: "TVW Award winners felicitated at TSC 2022" },
    ],
    slideHeadline: "Tata Sustainability Conclave 2022",
    slideSub: "Taj Lands End, Mumbai · November 2022",
    openingPara:
      "After a two-year break due to the pandemic, more than 200 leaders and sustainability professionals from the Tata Group came together to deliberate sustainability imperatives at the Tata Sustainability Conclave 2022 (TSC 2022). Organised by the Tata Sustainability Group as its flagship event, TSC 2022 was inaugurated by Group Chairman N. Chandrasekaran at Taj Lands End, Mumbai.",
    sections: [
      {
        heading: "Setting the Stage",
        body: "Mr. Siddharth Sharma, the Group Chief Sustainability Officer, delivered the welcome address, detailing the Group's Sustainability Approach and TSG's role in realising its Sustainability Vision. In the inaugural address, the Chairman emphasised that while sustainability is one of the biggest challenges facing corporates today, it is also a significant opportunity. Comparing the journey to an ultra-marathon, he encouraged companies to sharpen their sustainability agendas and lay out decarbonisation plans as the world transitions to a low-carbon economy.",
      },
      {
        heading: "Volunteering @Tata: Embedding Quality & Scale",
        body: "Moderated by Mr. Harish Bhat, Brand Custodian, Tata Sons, the panel discussion celebrated the Tata Group's legacy of giving back, and sought leadership perspectives on institutionalising volunteering while ensuring scale and quality. Mr. Bhat reiterated the Group aspiration of 4 per capita volunteering hours by 2025 — inked by the Tata Group Sustainability Council — and discussed the benefits of volunteering for communities, employees, and organisations alike.",
      },
      {
        heading: "Panellist Perspectives",
        bullets: [
          "Puneet Chhatwal, MD & CEO, Indian Hotels Company Limited: Shared how IHCL moved from a PCVH of 0.59 in FY21 to 2.25 in FY22, and how volunteering became core to the value of 'Tajness' — even through the depths of the pandemic.",
          "Sanjiv Lal, MD & CEO, Rallis India Ltd.: Spoke about Rallis's unique focus on rural communities and farmers — and how the company achieved high per capita volunteering hours on a year-on-year basis.",
          "Amur Lakshminarayanan, MD & CEO, Tata Communications: Shared the significance of the DRIVE week as a flagship volunteering programme, including how the company executes it across international locations.",
          "Milind Lakkad, CHRO, Tata Consultancy Services: Spoke about the digital Adult Literacy Programme and TCS's plan to democratise impact through the 'Each One Empowers One' platform, enabling employees across the Group to scale impact together.",
        ],
      },
      {
        heading: "Tata Volunteering Week Awards",
        body: "The Conclave concluded with the Volunteering Award winners being felicitated by Tata Sons leaders — Ms. Roopa Purushothaman, Ms. Nupur Mallick, and Mr. Siddharth Sharma. The awards recognised companies with unique volunteering programmes, maximum employee participation, and honoured individual volunteer champions, SPOC heroes, and leader-volunteers.",
      },
    ],
    stats: [
      { num: "200+", label: "Leaders and professionals" },
      { num: "4 PCVH", label: "Group aspiration by 2025" },
      { num: "7", label: "Consecutive years of 1M+ hours" },
    ],
  },

  {
    slug: "iave-2022",
    title: "26th IAVE World Volunteer Conference",
    subtitle: "Volunteering for the Common Good: Making Life Better for People and Communities",
    eyebrow: "Global Forum",
    tag: "IAVE 2022",
    date: "24–27 October 2022",
    location: "Abu Dhabi",
    excerpt:
      "Tata Sustainability Group participated as a panellist at the global volunteering forum, sharing the Group's approach to embedding scale and quality in volunteering in a post-pandemic world.",
    accentColor: E_BLUE_ABOUT,
    heroImage: iavePanel,
    heroImageAlt: "Gauri Rajadhyaksha, Tata Sons, on the panel at the 26th IAVE World Volunteer Conference",
    photos: [],
    slideHeadline: "26th IAVE World Volunteer Conference",
    slideSub: "Abu Dhabi · October 2022",
    openingPara:
      "Tata Sustainability Group was invited to participate as a panel member for the plenary 'Corporate Volunteering for a Post-Pandemic World' at the 26th IAVE World Volunteer Conference in Abu Dhabi. The conference celebrated volunteering and acknowledged that volunteer engagement and leadership is needed more than ever to address the world's most pressing challenges.",
    sections: [
      {
        heading: "Tata's Voice on the Global Stage",
        body: "Gauri Rajadhyaksha from Tata Sustainability Group shared the Tata Group's approach on volunteering and the role of Tata Engage — the Group-level volunteering programme — in unifying all Group companies onto a common platform. She shed light on the importance of company-specific volunteering programmes to align business context and employee aspirations, alongside the need to empower employees to pursue volunteering in areas they are most passionate about.",
      },
      {
        heading: "Key Themes",
        bullets: [
          "The IAVE report's recommendations of 'widening the big tent of volunteering' and 'focus on impact-focused, skill-based volunteering' were highlighted as critical to embedding scale and quality in the post-pandemic era.",
          "Tata volunteering SPOCs across companies were applauded for championing volunteering and steering the Group to clock over a million volunteering hours annually for seven consecutive years.",
          "Cross-sharing of strategies, challenges, and innovative initiatives enabled rich dialogue between corporate volunteering leaders from across the globe.",
        ],
      },
      {
        heading: "Tata Group's IAVE Partnership",
        body: "The Tata Group has been a member and contributor to IAVE's initiatives since 2018. Tata Engage won IAVE's 'Best Global Volunteer Program' award in 2019, and became a member of IAVE's Global Corporate Volunteer Council in 2019–20. As a member of IAVE's Board of Directors, the Group is committed to lending strength to IAVE's stewardship in driving excellence in corporate volunteering.",
      },
    ],
    quotes: [
      {
        text: "For over 150 years, Tata Group has served as a contributor to public good. Today, with over 1 million employees globally, our corporate volunteering programme has contributed over 8 million hours. With strong leadership commitment, we follow the big tent approach with a focus on impact volunteering.",
        attribution: "Chacko Thomas",
        role: "Group Chief Sustainability Officer, Tata Sons",
      },
    ],
    stats: [
      { num: "8M+", label: "Volunteering hours contributed" },
      { num: "2018", label: "Year Tata joined IAVE" },
      { num: "90+", label: "Countries represented" },
    ],
  },
];
