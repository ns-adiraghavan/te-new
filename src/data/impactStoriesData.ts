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
  body: string;
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
    title: "United in Action: ONE Tata Wayanad Landslide Response 2024",
    eyebrow: "Disaster Response",
    tag: "Disaster Response",
    accentColor: B_RED,
    heroImage: tataAIG,
    heroImageAlt: "Tata volunteers on the ground in Wayanad",
    date: "July–August 2024",
    excerpt: "34 volunteers from 12 Tata companies stepped forward within 48 hours of the Wayanad landslides — supporting 1,000 tribal families across 45 days of relief operations.",
    openingPara:
      "In the early hours of July 30, 2024, the hills of Wayanad trembled. Torrential rains — nearly 50 cm in just 48 hours — loosened the fragile soil, triggering a devastating landslide that swallowed an entire village. Hours later, a second landslide struck further north. The accumulated debris altered the course of river waters, causing flash floods that swept away more villages.",
    sections: [
      {
        body: "Early next day, the ONE Tata Kerala Landslides and Floods Response moved in quickly to support immediate response, relief and subsequent rehabilitation of the affected. Several Tata Group companies, under the aegis of Tata Sustainability Group, collaborated with local and Government disaster response agencies, NGOs, medical professionals, and other key responders in the relief operations.",
      },
      {
        body: "The ONE Tata Disaster Response Framework, anchored by TSG, brings together the strength of Tata companies, their technical capabilities, and their people — into one coordinated, collective effort. From immediate emergency relief to long-term rehabilitation, the Group supports in distributing essential supplies for temporary shelters and restoring infrastructure in the aftermath of a disaster.",
      },
      {
        body: "In Wayanad, 34 core volunteers from 12 Tata Group companies stepped forward to help communities in crisis. Each volunteer spent 7–10 days and worked round the clock to ensure families received the support they needed and could begin their return to normalcy.",
      },
      {
        body: "Equipment was provided for ongoing search and rescue operations; food and essentials reached 300 tribal families in relief camps and tribal hamlets; and 700 families were provided with comprehensive family kits. Volunteers including women from Tata Elxsi were stationed at the Meppadi School relief camp, supporting logistics, coordination of aid and needs assessment with government response teams.",
      },
      {
        body: "1,000 tribal families in flood-prone areas and remote clusters across Wayanad were supported. Volunteers conducted needs assessments to identify the most vulnerable families, then planned and ensured delivery of family kits comprising 11 items and weighing 65 kg — at the doorstep. The entire operation ran for 45 days. The families belonged to socially and economically backward categories, including Particularly Vulnerable Tribal Groups whose lives and livelihoods are in constant precarity.",
      },
      {
        body: "The relief phase was about restoring a sense of safety, agency, and dignity to those who endure nature's fury year after year. Their undeterred courage, compassion, and commitment exemplified the spirit of 'Together We Rise.'",
      },
    ],
    quotes: [
      {
        text: "The system established under the Tata Group Disaster Response is very effective in management of relief operations.",
        attribution: "Subramanian RV",
        role: "Tata AIA · ONE Tata Disaster Response Project Manager",
      },
      {
        text: "I'm proud to be a part of ONE Tata Disaster Response. With my procurement expertise, I'm assisting the on-ground team with supply chain and logistics arrangements to ensure that the aid reaches the most affected communities.",
        attribution: "Phaneesha H K",
        role: "Group Manager Manufacturing, Titan · ONE Tata DR Procurement Officer",
      },
      {
        text: "This was an eye opener, revealing the struggles of those affected and demonstrating the Tata group's commitment towards those in need. In the first phase, over 25 volunteers participated, and we are ready to continue making a meaningful impact.",
        attribution: "Rajagopalan Nair & Sharath M Nair",
        role: "Kozhikode Admin & Operations, Tata Elxsi",
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
    title: "Melghat Mitra: When Service Becomes Stewardship",
    eyebrow: "Long-form Volunteering",
    tag: "Community",
    accentColor: B_INDIGO,
    heroImage: tataMotors1,
    heroImageAlt: "Tata Motors volunteers in Melghat",
    date: "2000–Present",
    excerpt: "For over two decades, a group of Tata Motors employees has been quietly transforming 50 villages in Maharashtra's Melghat region — 40,000 volunteer hours, zero hunger deaths.",
    openingPara:
      "Twenty-five years ago, a newspaper report on hunger deaths among tribal children in Melghat, a remote tiger reserve in Maharashtra, stopped Mangesh Joshi in his tracks. An employee at Tata Motors since 1990, Mangesh could not look away from what he had read — and more importantly, he could not walk away.",
    sections: [
      {
        body: "That first moment of shock became the beginning of a journey that has now spanned over two decades, thousands of hours, and tens of thousands of lives. What began as emergency 'rescue camps' during the monsoon — known locally as Dhadak Mohim — has grown into Melghat Mitra, a sustained, people-led movement rooted in trust, presence, and partnership.",
      },
      {
        body: "Early visits to Melghat were met with fear and resistance. To the tribal communities, outsiders were often seen as jhangadis — urban intruders with dubious intent. The Melghat Mitra group listened, learned, and adapted. Guided by local leaders, they dressed like the community, learned key words of the local Korku dialect, and began building relationships — especially with the youth. Slowly, suspicion turned into dialogue. The team began calling themselves Boko Mitras — younger friends. Friendship became the foundation for every intervention that followed.",
      },
      {
        body: "For over 20 years, the Melghat Mitra group has travelled to Melghat every year for 15–20 days, often during the monsoon when villages are physically cut off. Working entirely in their personal time, they have collectively invested over 40,000 volunteer hours.",
      },
      {
        body: "What started with preventing hunger deaths among children evolved into a multi-pronged development effort: grain banks and access to safe drinking water; preventive and curative healthcare with a sharp shift towards institutional deliveries; training youth for jobs including apprenticeships under national schemes; building sports teams and leadership capability among village youth; and creating market linkages for forest and farm produce.",
      },
      {
        body: "To sustain this work, Melghat Mitra established a control centre in Paratwada and a project office in one of the villages — ensuring continuous engagement, not intermittent intervention. A defining strength has been its ability to work with government departments such as Forest, ICDS, and Agriculture; Krishi Vigyan Kendras and Sagar University for agricultural technology transfer; and Maitri, a Pune-based NGO, to anchor development interventions.",
      },
      {
        body: "Today, Melghat Mitra works across over 50 villages, with deep, direct interventions in 12 villages. There are no reported cases of malnutrition in those villages. Child mortality rates are aligned with state averages. Over 95% of deliveries are now institutional. School teaching days have increased from as low as 2 weeks to nearly 90 days a year. Youth have been placed in government and private sector jobs, including apprenticeships at Tata Motors itself.",
      },
      {
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
    featured: true,
    slideHeadline: "Melghat Mitra: When Service Becomes Stewardship",
    slideSub: "Over two decades, a group of Tata Motors employees has transformed 50 villages — 40,000 volunteer hours, zero hunger deaths.",
  },
];
