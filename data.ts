import { JobFunnel, QuestionTree, Site } from "./types";

export const sites: Site[] = [
  { id: "usa", name: "homeadvisor.com", country: "USA", language: "en" },
  { id: "canada", name: "homestars.com", country: "Canada", language: "en" },
  { id: "france", name: "travaux.com", country: "France", language: "fr" },
  { id: "italy", name: "instapro.cit", country: "Italy", language: "it" },
];

export const questionTrees: QuestionTree[] = [
  {
    id: "q1",
    name: "Interior Painting",
    status: "published",
    siteIds: ["usa", "canada"],
  },
  {
    id: "q2",
    name: "Remove Cabinets",
    status: "draft",
    siteIds: ["usa", "france"],
  },
  {
    id: "q3",
    name: "Bathroom Remodel",
    status: "published",
    siteIds: ["canada", "france"],
  },

  {
    id: "q4",
    name: "Exterior Painting",
    status: "published",
    siteIds: ["usa", "canada"],
  },
  {
    id: "q5",
    name: "Tree plantation",
    status: "published",
    siteIds: ["usa", "canada"],
  },
  {
    id: "q6",
    name: "Grass Removal",
    status: "published",
    siteIds: ["usa", "canada"],
  },
  {
    id: "q7",
    name: "Shower Installation",
    status: "draft",
    siteIds: ["canada", "italy"],
  },
  {
    id: "q8",
    name: "Wallpapering",
    status: "draft",
    siteIds: ["france", "italy"],
  },
];

export const jobFunnels: JobFunnel[] = [
  {
    id: "jf1",
    name: "Painting",
    slug: "home-painting",
    type: "service",
    questionTrees: [questionTrees[0], questionTrees[3]],
  },
  {
    id: "jf2",
    name: "Kitchen Renovation",
    slug: "kitchen-renovation",
    type: "service",
    questionTrees: [questionTrees[1]],
  },
  {
    id: "jf3",
    name: "Bathroom",
    slug: "bathroom",
    type: "category",
    questionTrees: [questionTrees[2], questionTrees[6]],
  },
  {
    id: "jf4",
    name: "Gardening",
    slug: "gardening",
    type: "category",
    questionTrees: [questionTrees[4], questionTrees[5]],
  },
  {
    id: "jf5",
    name: "Walls",
    slug: "walls",
    type: "category",
    questionTrees: [questionTrees[7]],
  },
  {
    id: "jf6",
    name: "Doors",
    slug: "doors",
    type: "cluster",
    questionTrees: [questionTrees[7]],
  },
];

export const subHeaderLinks = [
  { href: "/", label: "Trees" },
  { href: "/", label: "Forms" },
  { href: "/", label: "Templates" },
  { href: "/", label: "Editor" },
];

export const navLinks = [
  { href: "/", label: "QTE" },
  { href: "/", label: "Services" },
  { href: "/", label: "Professions" },
  { href: "/", label: "Topic Cluster" },
  { href: "/", label: "Job Funnel" },
  { href: "/", label: "Price Rules" },
  { href: "/", label: "Versions" },
  { href: "/", label: "Logout" },
];

export const radioButtons = {
  categories: {
    title: "Funnel Type",
    options: [
      {
        id: "service",
        value: "service",
        label: "Service",
      },
      {
        id: "cluster",
        value: "cluster",
        label: "Cluster",
      },
      {
        id: "partnership",
        value: "partnership",
        label: "Partnership",
      },
    ],
  },
  statuses: {
    title: "Status",
    options: [
      {
        id: "draft",
        value: "draft",
        label: "Draft",
      },
      {
        id: "ready",
        value: "ready",
        label: "Ready to be published",
      },
      {
        id: "published",
        value: "published",
        label: "Published",
      },
      {
        id: "archive",
        value: "archive",
        label: "Archive",
      },
    ],
  },
  countries: {
    title: "Countries",
    options: [
      {
        id: "usa",
        value: "USA",
        label: "USA",
        site: "homeadvisor.com",
      },
      {
        id: "canada",
        value: "Canada",
        label: "Canada",
        site: "homestars.com",
      },
      {
        id: "france",
        value: "France",
        label: "France",
        site: "travaux.it",
      },
      {
        id: "italy",
        value: "Italy",
        label: "Italy",
        site: "instapro.it",
      },
    ],
  },
};
