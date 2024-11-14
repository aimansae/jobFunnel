import { sites } from "@/data";

export const getCountryNames = (siteIds: string[]): string[] => {
  return siteIds
    .map((siteId) => sites.find((site) => site.id === siteId)?.country)
    .filter((country) => country !== undefined) as string[];
};
