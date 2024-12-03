"use client";

import { SelectedFiltersType } from "../../types";
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

  const filters: { label: string; key: string; value: string }[] = [];

  if (category && visibleFilters.category)
    filters.push({ label: ` ${category}`, key: "category", value: category });
  if (status && visibleFilters.status)
    filters.push({ label: ` ${status}`, key: "status", value: status });
  if (visibleFilters.country) {
    const countries = searchParams.getAll("country");
    if (countries.length > 0) {
      countries.forEach((country) => {
        filters.push({ label: ` ${country}`, key: "country", value: country });
      });
    }
  }

  const handleRemoveFilter = (
    filterKey: string,
    filterValue: string,
    countryToRemove?: string,
  ) => {
    const updatedSearchParams = new URLSearchParams(searchParams.toString());

    // Handle multiple country values
    if (filterKey === "country" && countryToRemove) {
      const existingCountries =
        updatedSearchParams.get(filterKey)?.split(",") || [];
      const updatedCountries = existingCountries.filter(
        (c) => c !== countryToRemove,
      );

      if (updatedCountries.length > 0) {
        updatedSearchParams.set("country", updatedCountries.join(","));
      } else {
        updatedSearchParams.delete("country");
      }
    } else {
      updatedSearchParams.delete(filterKey);
    }
    setVisibleFilters((prevFilters) => ({
      ...prevFilters,
      [filterKey]: updatedSearchParams.has(filterKey),
    }));

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
    <div className="p-1 shadow-lg md:p-4">
      <ul className="flex flex-wrap items-center gap-2 p-4 md:p-0">
        {filters.map((filter, index) => {
          // If it's a country, split the label into separate spans
          if (filter.key === "country") {
            const countries = filter.value.split(","); // Split countries if there are multiple
            return countries.map((country, idx) => (
              <li
                key={`${index}-${idx}`} // Unique key for each country
                className="flex items-center gap-2 rounded-md border bg-gray-200 p-1 px-2 md:px-4 md:py-2"
              >
                <span>{country}</span>
                <button
                  onClick={() =>
                    handleRemoveFilter(filter.key, filter.value, country)
                  } // Remove individual country
                >
                  <IoMdClose
                    size={18}
                    className="cursor:pointer rounded-full border-2 bg-gray-400 text-white"
                  />
                </button>
              </li>
            ));
          }

          // For non-country filters, display them as is
          return (
            <li
              key={index}
              className="flex items-center gap-2 rounded-md border bg-gray-200 p-1 px-2 md:px-4 md:py-2"
            >
              <span>{filter.label}</span>
              <button
                onClick={() => handleRemoveFilter(filter.key, filter.value)}
              >
                <IoMdClose
                  size={18}
                  className="cursor:pointer rounded-full border-2 bg-gray-400 text-white"
                />
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  ) : null;
};

export default SelectedFilters;
