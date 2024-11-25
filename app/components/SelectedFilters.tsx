"use client";

import { SelectedFiltersType } from "@/types";
import React, { useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";
import { useRouter, useSearchParams } from "next/navigation";

const SelectedFilters = ({
  searchQuery,
  category,
  status,
  country,
}: SelectedFiltersType) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [visibleFilters, setVisibleFilters] = useState({
    searchQuery: Boolean(searchQuery),
    category: Boolean(category),
    status: Boolean(status),
    country: Boolean(country),
  });

  const [updatedSearchParams, setUpdatedSearchParams] = useState(
    new URLSearchParams(searchParams.toString()),
  );
  console.log("UPDATED:", updatedSearchParams);
  const filters = [];

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
    console.log("FILTER PAGE Current searchParams:", searchParams.toString());

    updatedSearchParams.delete(filterKey);

    router.push(`?${updatedSearchParams.toString()}`);
  };
  useEffect(() => {
    const queryParams = searchParams;

    setVisibleFilters({
      searchQuery: Boolean(queryParams.get("search")),
      category: Boolean(queryParams.get("category")),
      status: Boolean(queryParams.get("status")),
      country: Boolean(queryParams.get("country")),
    });

    setUpdatedSearchParams(new URLSearchParams(queryParams.toString()));
  }, [searchParams]);

  return filters.length > 0 ? (
    <div className="p-2 shadow-lg md:p-4">
      <ul className="flex items-center justify-center gap-2">
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
