import { ReactNode } from "react";

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

export type RadioButtonType = {
  id: string;
  value: string;
  checked: boolean;
  label?: string;
  onChange: () => void;
  flag?: string;
  className?: string;
};
export type CountryFlagProps = {
  country: string;
  className?: string;
};
export type LabelType = {
  text: string;
  children?: ReactNode;
  onClick: () => void;
  filterIsVisible: boolean;
};

export type SelectedFiltersType = {
  searchQuery: string;
  category: string;
  status: string;
  country: string;
  // onRemoveFilter: (filterName: string) => void;
};
