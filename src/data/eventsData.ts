import tsc22Chairman from "@/assets/events/tsc-2022-chairman.png";
import volconChacko from "@/assets/events/volcon-2024-chacko.png";
import iavePanel from "@/assets/events/iave-2022-panel.png";
import iave24Hero from "@/assets/events/iave24-1.jpg";

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

export const EVENTS: EventEntry[] = [
  {
    slug: "tsc-2022",
    title: "Tata Sustainability Conclave 2022",
    tag: "TSC 2022",
    date: "November 2022",
    excerpt:
      "After a two-year pandemic break, 200+ leaders gathered at Taj Lands End Mumbai to chart the Group's volunteering future.",
    accentColor: "#5B21B6",
    heroImage: tsc22Chairman,
  },
  {
    slug: "volcon-2024",
    title: "TATA VOLCON 2024",
    tag: "VOLCON 2024",
    date: "March 2024",
    excerpt:
      "170 Tata leaders celebrated a million volunteering hours at Taj Mahal Palace Mumbai.",
    accentColor: "#7C3ABD",
    heroImage: volconChacko,
  },
  {
    slug: "iave-2022",
    title: "26th IAVE World Volunteer Conference",
    tag: "IAVE 2022",
    date: "October 2022",
    excerpt:
      "Tata Sustainability Group participated as a panel member at the global volunteering forum in Abu Dhabi.",
    accentColor: "#333399",
    heroImage: iavePanel,
  },
  {
    slug: "iave-2024",
    title: "27th IAVE World Volunteer Conference",
    tag: "IAVE 2024",
    date: "October 2024",
    location: "Busan, Republic of Korea",
    excerpt:
      "Tata Sustainability Group represented at the 27th IAVE World Volunteer Conference, themed 'People Power: Creating a Sustainable Future through Volunteering.'",
    accentColor: "#333399",
    heroImage: iave24Hero,
  },
];
