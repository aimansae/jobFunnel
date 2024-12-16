export type QuestionTree = {
  id: string;
  name: string;
  status: string;
  jobFunnel?: JobFunnel;
  siteIds?: string[];
};

export type JobFunnel = {
  id: string;
  name: string;
  slug: string;
  type: "category" | "service" | "cluster";
  questionTrees: QuestionTree[];
};

export type Site = {
  id: string;
  name: string;
  country: string;
  language: string;
};

export type FiltersType = {
  category: string;
  status: string;
  country: string;
};
