import tsc22Chairman from "@/assets/events/tsc-2022-chairman.png";
import volconChacko  from "@/assets/events/volcon-2024-chacko.png";
import iavePanel     from "@/assets/events/iave-2022-panel.png";
import iave24Hero    from "@/assets/events/iave24-1.jpg";

export interface EventEntry {
  slug: string;
  title: string;
  tag: string;
  date: string;
  location?: string;
  excerpt: string;
  accentColor: string;
  heroImage: string;
}

// Ordered newest → oldest
export const EVENTS: EventEntry[] = [
  {
    slug: "iave-2024",
    title: "27th IAVE World Volunteer Conference",
    tag: "IAVE 2024",
    date: "October 2024",
    location: "Busan, Republic of Korea",
    excerpt:
      "1,500+ volunteer leaders from 90 countries. Tata Sustainability Group represented at the global forum themed 'People Power: Creating a Sustainable Future through Volunteering.'",
    accentColor: "#5B21B6",
    heroImage: iave24Hero,
  },
  {
    slug: "volcon-2024",
    title: "TATA VOLCON 2024",
    tag: "VOLCON 2024",
    date: "March 2024",
    location: "Taj Mahal Palace, Mumbai",
    excerpt:
      "170 Tata leaders, volunteering leads, and champions came together to celebrate a million hours and chart the Group's volunteering future.",
    accentColor: "#5B21B6",
    heroImage: volconChacko,
  },
  {
    slug: "tsc-2022",
    title: "Tata Sustainability Conclave 2022",
    tag: "TSC 2022",
    date: "November 2022",
    location: "Taj Lands End, Mumbai",
    excerpt:
      "200+ leaders and sustainability professionals deliberated on embedding quality and scale in volunteering — on the path to 4 per capita volunteering hours by 2025.",
    accentColor: "#5B21B6",
    heroImage: tsc22Chairman,
  },
  {
    slug: "iave-2022",
    title: "26th IAVE World Volunteer Conference",
    tag: "IAVE 2022",
    date: "October 2022",
    location: "Abu Dhabi",
    excerpt:
      "Tata Sustainability Group participated as a panellist at the global volunteering forum, sharing the Group's approach to embedding scale and quality in volunteering.",
    accentColor: "#5B21B6",
    heroImage: iavePanel,
  },
];
