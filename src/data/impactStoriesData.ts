import tataAIG from "@/assets/Tata_AIG_2.jpg";
import tataMotors1 from "@/assets/Tata_Motors_1.jpg";

const ACCENT_NAVY = "#0D1B3E";
const B_INDIGO    = "#333399";
const B_RED       = "#E8401C";

export interface StoryQuote {
  text: string;
  attribution: string;
  role?: string;
}

export interface StorySection {
  heading?: string;
  body?: string;
  bullets?: string[];
  /** Optional sub-blocks rendered inside the section (used for grouped lists like Health/Education/Governance). */
  subBlocks?: { heading: string; bullets: string[] }[];
}

export interface ImpactStory {
  slug: string;
  title: string;
  eyebrow: string;
  tag: string;
  accentColor: string;
  heroImage: string;
  heroImageAlt: string;
  date: string;
  excerpt: string;
  openingPara: string;
  sections: StorySection[];
  quotes?: StoryQuote[];
  stats?: { num: string; label: string }[];
  featured?: boolean;
  archived?: boolean;
  slideHeadline: string;
  slideSub: string;
}

export const IMPACT_STORIES: ImpactStory[] = [
  {
    slug: "wayanad-2024",
    title: "United in Action",
    eyebrow: "Disaster Response",
    tag: "Disaster Response",
    accentColor: B_RED,
    heroImage: tataAIG,
    heroImageAlt: "Tata volunteers on the ground in Wayanad",
    date: "July–August 2024",
    excerpt: "Volunteer voices from the ONE Tata Wayanad Landslide Response 2024 — 34 volunteers, 12 Tata companies, 1,000 tribal families, 45 days.",
    openingPara:
      "In the early hours of July 30, 2024, the hills of Wayanad trembled. Torrential rains — nearly 50 cm in just 48 hours — loosened the fragile soil, triggering a devastating landslide that swallowed an entire village. Hours later, a second landslide struck further north. The accumulated debris altered the course of river waters, causing flash floods that swept away more villages.",
    sections: [
      {
        body: "Early next day, the 'ONE' Tata Kerala Landslides and Floods Response moved in quickly to support immediate response, relief and subsequent rehabilitation of the affected. The show of hands by several Tata Group of companies under the aegis of Tata Sustainability Group (TSG), collaborated with local and Government disaster response agencies, NGOs, medical professionals, and other key responders in the relief operations.",
      },
      {
        body: "The 'ONE Tata Disaster Response' Framework, anchored by TSG, brings together the strength of Tata companies, their technical capabilities, and their people — into one coordinated, collective effort. From immediate emergency relief to long-term rehabilitation, the Group supports in distributing essential supplies for temporary shelters and restoring infrastructure in the aftermath of a disaster.",
      },
      {
        heading: "On the ground in Wayanad",
        body: "In Wayanad, 34 core volunteers from 12 Tata group companies stepped forward to help communities in crisis as part of the 'ONE' Tata Kerala Landslide and Floods Response Programme. Each volunteer spent 7–10 days and worked round the clock to ensure families received the support they needed to return to normalcy. Some of the critical tasks undertaken were:",
        bullets: [
          "Provided equipment for ongoing search and rescue operations; food and essentials to 300 tribal affected families in relief camps and tribal hamlets, and 700 families were provided with comprehensive family kits.",
          "Needs of relief camps and affected hamlets were assessed and support was provided to 200 families with clothes, bedding and 5 wheelchairs. Volunteers including women from Tata Elxsi were stationed at the Meppadi School relief camp, supporting logistics, coordination of aid and needs assessment with government response teams.",
          "1,000 tribal families in flood-prone areas and remote clusters in Wayanad were supported. Volunteers conducted needs assessments to identify the most vulnerable families, then planned and ensured doorstep delivery of family kits comprising 11 items and weighing 65 kg. The entire operation ran for 45 days. The families belonged to socially and economically backward categories, including Particularly Vulnerable Tribal Groups (PVTGs), whose lives and livelihoods are in constant precarity. The relief phase was about restoring a sense of safety, agency, and dignity to those who endure nature's fury year after year.",
        ],
      },
      {
        body: "Their undeterred courage, compassion, and commitment exemplified the spirit of \"Together We Rise.\" Through their voluntary actions, they rekindled hope in the hearts of those who had lost everything.",
      },
    ],
    quotes: [
      {
        text: "The system established under the Tata Group Disaster Response is very effective in management of relief operations.",
        attribution: "Subramanian RV",
        role: "Tata AIA · ONE Tata Disaster Response Project Manager",
      },
      {
        text: "I'm proud to be a part of 'ONE Tata Disaster Response' supporting landslide-affected communities in Wayanad. While communities are in temporary accommodations, our team is providing necessary support during this critical phase. With my procurement expertise, I'm assisting the on-ground team with supply chain and logistics arrangements to ensure that the aid reaches the most affected communities.",
        attribution: "Phaneesha H K",
        role: "Group Manager, Manufacturing, Titan · ONE Tata Disaster Response Procurement Officer",
      },
      {
        text: "From August 3 to 7, I was stationed in Wayanad for the One-Tata disaster response. Collaborating with government officials, we contributed to the needs assessment and visited landslide sites and relief camps, engaging with affected communities, including tribal colonies. We mobilized essential supplies such as emergency medicine, raincoats, lemongrass oil, and PPE kits. Witnessing the crisis, I realized the power of collective efforts from the community and corporates.",
        attribution: "Sanjith P Raju",
        role: "Head – HR, Kanan Devan Hills Plantations Company Private Limited",
      },
      {
        text: "When our MD & CEO, Mr. Manoj Raghavan, urged us to join the response team in Wayanad, we received over 75 volunteering requests from our Kozhikode center. This was an eye opener, revealing the struggles of those affected and demonstrating the TATA group's commitment towards those in need. In the first phase, over 25 volunteers participated, and we are ready to continue making a meaningful impact.",
        attribution: "Rajagopalan Nair & Sharath M Nair",
        role: "Kozhikode Admin Manager & Center Operations Manager, Tata Elxsi",
      },
      {
        text: "Tata Group approached us right after the disaster and they have been with us right from the search and rescue operations to rehabilitation phase.",
        attribution: "Megashree DR, IAS",
        role: "District Collector & District Magistrate, Wayanad",
      },
    ],
    stats: [
      { num: "34", label: "Core volunteers" },
      { num: "12", label: "Tata companies" },
      { num: "1,000", label: "Tribal families supported" },
      { num: "45", label: "Days of operations" },
    ],
    featured: true,
    slideHeadline: "United in Action: ONE Tata Wayanad Landslide Response 2024",
    slideSub: "34 volunteers from 12 Tata companies. 45 days. 1,000 tribal families.",
  },
  {
    slug: "melghat-mitra",
    title: "Melghat Mitra",
    eyebrow: "Long-form Volunteering",
    tag: "Community",
    accentColor: B_INDIGO,
    heroImage: tataMotors1,
    heroImageAlt: "Tata Motors volunteers in Melghat",
    date: "2000–Present",
    excerpt: "When service becomes stewardship — over two decades, a group of Tata Motors employees has transformed 50 villages in Melghat, with 40,000 volunteer hours and zero hunger deaths.",
    openingPara:
      "Twenty-five years ago, a newspaper report on hunger deaths among tribal children in Melghat, a remote tiger reserve in Maharashtra, stopped Mangesh Joshi in his tracks. An employee at Tata Motors since 1990, Mangesh could not look away from what he had read — and more importantly, he could not walk away.",
    sections: [
      {
        body: "That first moment of shock became the beginning of a journey that has now spanned over two decades, thousands of hours, and tens of thousands of lives. What began as emergency 'rescue camps' during the monsoon — known locally as Dhadak Mohim — has grown into Melghat Mitra, a sustained, people-led movement rooted in trust, presence, and partnership.",
      },
      {
        heading: "From outsiders to \"Boko Mitras\"",
        body: "Early visits to Melghat were met with fear and resistance. To the tribal communities, outsiders were often seen as jhangadis — urban intruders with dubious intent. The Melghat Mitra group listened, learned, and adapted. Guided by local leaders, they dressed like the community, learned key words of the local Korku dialect, and began building relationships — especially with the youth.\n\nSlowly, suspicion turned into dialogue. The team began calling themselves Boko Mitras — younger friends. Friendship became the foundation for every intervention that followed.",
      },
      {
        heading: "From hunger relief to holistic development",
        body: "For over 20 years, the Melghat Mitra group has travelled to Melghat every year for 15–20 days, often during the monsoon when villages are physically cut off. Working entirely in their personal time, they have collectively invested over 40,000 volunteer hours.\n\nWhat started with preventing hunger deaths among children evolved into a multi-pronged development effort across health, education, livelihoods, and governance:",
        bullets: [
          "Grain banks and access to safe drinking water.",
          "Preventive and curative healthcare, with a sharp shift towards institutional deliveries.",
          "Training youth for jobs, including apprenticeships under national schemes.",
          "Building sports teams and leadership capability among village youth.",
          "Creating market linkages for forest and farm produce to formalise local livelihoods.",
        ],
      },
      {
        body: "To sustain this work, Melghat Mitra established a control centre in Paratwada and a project office in one of the villages — ensuring continuous engagement, not intermittent intervention.",
      },
      {
        heading: "Working with systems, not around them",
        body: "A defining strength of Melghat Mitra has been its ability to work across systems. Over the years, the team has partnered with:",
        bullets: [
          "Government departments such as Forest, ICDS, and Agriculture.",
          "Krishi Vigyan Kendras and Sagar University for agricultural technology transfer.",
          "Maitri, a Pune-based NGO, to anchor development interventions.",
        ],
      },
      {
        body: "This consistent engagement has improved the implementation of government programmes, reduced inter-tribe conflicts, and strengthened trust between communities and the forest department.",
      },
      {
        heading: "Impact that endures",
        body: "Today, Melghat Mitra works across over 50 villages, with deep, direct interventions in 12 villages — positively impacting more than 6,200 people directly and over 15,000 lives overall.",
        subBlocks: [
          {
            heading: "Health",
            bullets: [
              "No reported cases of malnutrition in the 12 intervention villages.",
              "Child mortality rates aligned with state averages.",
              "Over 95% institutional deliveries.",
              "Significant reduction in dependence on traditional faith healers.",
            ],
          },
          {
            heading: "Education & Employability",
            bullets: [
              "School teaching days increased from as low as 2 weeks to nearly 90 days a year.",
              "Improved enrolment and better gender balance in schools.",
              "Youth placed in government and private sector jobs, including apprenticeships at Tata Motors.",
            ],
          },
          {
            heading: "Governance",
            bullets: [
              "Regular Gram Sabhas with higher community participation.",
              "Stronger local leadership, now driven by trained youth Boko Mitras.",
            ],
          },
        ],
      },
      {
        heading: "A culture of volunteering, backed by belief",
        body: "Melghat Mitra is a reminder that sustainable change does not arrive all at once. It is built patiently — through trust, consistency, and the courage to show up, year after year.",
      },
    ],
    quotes: [
      {
        text: "The management of Tata Motors has always supported our volunteering work. Professionally, we've been entrusted with a challenging and overwhelming responsibility. Personally, the appreciation from society keeps us committed to continuing this journey.",
        attribution: "Melghat Mitra Group",
        role: "Tata Motors volunteers",
      },
    ],
    stats: [
      { num: "50+", label: "Villages reached" },
      { num: "40,000", label: "Volunteer hours" },
      { num: "15,000+", label: "Lives impacted" },
      { num: "20+", label: "Years of service" },
    ],
    featured: true,
    slideHeadline: "Melghat Mitra: When Service Becomes Stewardship",
    slideSub: "Over two decades, a group of Tata Motors employees has transformed 50 villages — 40,000 volunteer hours, zero hunger deaths.",
  },
];
