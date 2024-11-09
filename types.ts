export type QuestionTree = {
  id: string;
  name: string;
  status: "draft" | "published";
  jobFunnel?: JobFunnel;
  siteIds?: string[];
};

export type JobFunnel = {
  id: string;
  name: string;
  slug: string;
  type: "category" | "service";
  questionTrees: QuestionTree[];
};

export type Site = {
  id: string;
  name: string;
  country: string;
  language: string;
};
