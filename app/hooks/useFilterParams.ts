"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { FiltersType } from "../../types";

const useFilterParams = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [filters, setFilters] = useState({
    category: searchParams.get("category") || "",
    status: searchParams.get("status") || "",
    country: searchParams.get("country")
      ? searchParams.get("country")!.split(",")
      : [],
  });

  const [filterIsVisible, setFilterIsVisible] = useState({
    category: true,
    status: true,
    country: true,
  });

  useEffect(() => {
    const updatedFilters = {
      category: searchParams.get("category") || "",
      status: searchParams.get("status") || "",
      country: searchParams.get("country")
        ? searchParams.get("country")!.split(",")
        : [],
    };
    setFilters(updatedFilters);
  }, [searchParams]);

  const handleFilterVisibility = (id: keyof typeof filterIsVisible) => {
    setFilterIsVisible((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleFilterChange = (type: keyof FiltersType, value: string) => {
    setFilters((prevFilters) => {
      if (type === "country") {
        const countryArray = prevFilters.country as string[];
        const updatedCountries = countryArray.includes(value)
          ? countryArray.filter((item) => item !== value)
          : [...countryArray, value];
        return { ...prevFilters, country: updatedCountries };
      }
      return {
        ...prevFilters,
        [type]: prevFilters[type] === value ? "" : value,
      };
    });
  };

  useEffect(() => {
    const params = new URLSearchParams();

    const { category, status, country } = filters;

    if (category) {
      params.set("category", category);
    }

    if (status) {
      params.set("status", status);
    }

    if (country.length > 0) {
      params.set("country", country.join(","));
    }
    router.push(`${pathname}?${params.toString()}`);
  }, [filters, pathname, router]);

  return {
    filters,
    filterIsVisible,
    handleFilterChange,
    handleFilterVisibility,
  };
};

export default useFilterParams;
