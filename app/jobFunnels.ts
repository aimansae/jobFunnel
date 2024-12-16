import { JobFunnel } from "./types";
import { questionTrees } from "./questionTrees";

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
