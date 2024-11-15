"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import RadioButton from "./RadioButton";
import { radioButtons } from "@/data";
import { BsSliders } from "react-icons/bs";
import { LuArrowRightFromLine } from "react-icons/lu";
import Label from "./Label";

const Filter = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const [filters, setFilters] = useState({
    category: searchParams.get("category") || "",
    status: searchParams.get("status") || "",
    country: searchParams.get("country") || "",
  });
  const [toggleAllFilters, setToggleAllFilters] = useState(true);
  const [filterIsVisible, setFilterIsVisible] = useState({
    category: true,
    status: true,
    country: true,
  });
  const handleFilterVisibility = (id: keyof typeof filterIsVisible) => {
    setFilterIsVisible((prev) => ({ ...prev, [id]: !prev[id] }));
  };
  const handleFilterChange = (type: string, value: string) => {
    setFilters((prevFilters) => ({ ...prevFilters, [type]: value }));
  };

  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    const { category, status, country } = filters;
    if (category) params.set("category", category);
    if (status) params.set("status", status);
    if (country) params.set("country", country);
    console.log("Updated URL Params:", params.toString());
    router.push(`${pathname}?${params.toString()}`);
    console.log("STATUS", status);
  }, [filters, pathname, router, searchParams]);

  return (
    <div className="">
      <div className="flex items-center justify-between py-2">
        <div className="flex items-center gap-2">
          <BsSliders size={17} className="cursor-pointer text-gray-700" />
          <span className="text-sm font-semibold text-gray-700">Filter</span>
        </div>
        <button onClick={() => setToggleAllFilters((prev) => !prev)}>
          <LuArrowRightFromLine
            className="ml-2 cursor-pointer text-gray-700"
            size={16}
            // Toggle all filters when clicked
          />
        </button>
      </div>

      {/* FILTERS */}
      {toggleAllFilters && (
        <div className="flex flex-col space-y-4 py-1">
          <div className="space-y-4">
            {/* Category Filter */}
            <div className="space-y-3">
              <Label
                text={radioButtons.categories.title}
                onClick={() => handleFilterVisibility("category")} // Expand/collapse category section
                filterIsVisible={filterIsVisible.category}
              />
              {filterIsVisible["category"] && (
                <>
                  {radioButtons.categories.options.map(({ id, label }) => (
                    <RadioButton
                      key={id}
                      id={id}
                      value={id}
                      checked={filters.category === id}
                      onChange={() => handleFilterChange("category", id)} // Update category filter
                      label={label}
                    />
                  ))}
                </>
              )}
            </div>
            <div className="space-y-3">
              <Label
                text={radioButtons.statuses.title}
                onClick={() => handleFilterVisibility("status")}
                filterIsVisible={filterIsVisible.status}
              />
              {filterIsVisible["status"] && (
                <div>
                  {radioButtons.statuses.options.map(({ id, label }) => (
                    <RadioButton
                      key={id}
                      id={id}
                      value={id}
                      checked={filters.status === id}
                      onChange={() => handleFilterChange("status", id)} // Update category filter
                      label={label}
                    />
                  ))}
                </div>
              )}
            </div>
            <div className="space-y-3">
              <Label
                text={radioButtons.countries.title}
                onClick={() => handleFilterVisibility("country")} // Expand/collapse country section
                filterIsVisible={filterIsVisible.country}
              />
              {filterIsVisible["country"] && (
                <>
                  {radioButtons.countries.options.map(({ id, label }) => (
                    <RadioButton
                      key={id}
                      id={id}
                      value={id}
                      checked={filters.country === id}
                      onChange={() => handleFilterChange("country", id)} // Update category filter
                      label={label}
                    />
                  ))}
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Filter;
