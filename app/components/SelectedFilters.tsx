"use client";

import { SelectedFiltersType } from "@/types";
import React, { useState } from "react";
import { IoMdClose } from "react-icons/io";
import { useRouter, useSearchParams } from "next/navigation"; // Import useRouter

const SelectedFilters = ({
  searchQuery,
  category,
  status,
  country,
}: SelectedFiltersType) => {
  const [visibleFilters, setVisibleFilters] = useState({
    searchQuery: Boolean(searchQuery),
    category: Boolean(category),
    status: Boolean(status),
    country: Boolean(country),
  });
  const router = useRouter();
  const searchParams = useSearchParams(); // Access the current URL search parameters

  const filters = [];
  if (searchQuery && visibleFilters.searchQuery)
    filters.push({ label: `search: ${searchQuery}`, key: "searchQuery" });
  if (category && visibleFilters.category)
    filters.push({ label: ` ${category}`, key: "category" });
  if (status && visibleFilters.status)
    filters.push({ label: ` ${status}`, key: "status" });
  if (country && visibleFilters.country)
    filters.push({ label: ` ${country}`, key: "country" });

  const handleRemoveFilter = (filterKey: string) => {
    setVisibleFilters((prevFilters) => ({
      ...prevFilters,
      [filterKey]: false,
    }));

    const updatedSearchParams = new URLSearchParams(searchParams.toString());
    updatedSearchParams.delete(filterKey);

    router.push(`?${updatedSearchParams.toString()}`);
  };
  return filters.length > 0 ? (
    <div className="p-2 shadow-lg md:p-4">
      <ul className="flex flex-col items-center gap-2 md:flex-row">
        {filters.map((filter, index) => (
          <li
            key={index}
            className="flex items-center gap-2 rounded-md border bg-[#E8DEF8] p-1 px-2 md:px-4 md:py-2"
          >
            <span>{filter.label}</span>
            <button onClick={() => handleRemoveFilter(filter.key)}>
              <IoMdClose size={18} className="cursor:pointer" />
            </button>
          </li>
        ))}
      </ul>
    </div>
  ) : null;
};

export default SelectedFilters;
