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
    category: "",
    status: "",
    country: "",
  });

  const [toggle, setToggle] = useState(true);
  const [expandedOption, setExpandedOption] = useState<string | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    const { category, status, country } = filters;
    if (category) params.set("category", category);
    if (status) params.set("status", status);
    if (country) params.set("country", country);
    router.push(`${pathname}?${params.toString()}`);
  }, [filters]);

  const handleFilterChange = (type: string, value: string) => {
    setFilters((prevFilters) => ({ ...prevFilters, [type]: value }));
  };

  const toggleAllFilters = (section?: string) => {
    if (section) {
      setExpandedOption((prev) => (prev === section ? null : section));
    } else {
      console.log("clicked");
      setToggle((prevToggle) => !prevToggle);
    }
  };

  return (
    <div className="min-h-screen">
      <div className="flex items-center justify-between py-3">
        <div className="flex items-center gap-1">
          <BsSliders size={18} className="text-gray-700" />
          <span className="text-sm font-semibold text-gray-700">Filter</span>
        </div>
        <LuArrowRightFromLine
          className="text-gray-700"
          size={18}
          onClick={() => toggleAllFilters()}
        />
      </div>
      {/* FILTERS */}
      {toggle && (
        <div className="flex flex-col space-y-4 py-1">
          {/* <div className="space-y-2">
              <div className="space-y-3">
                <Label
                  text={radioButtons.statuses.title}
                  onClick={() => toggleAllFilters("category")}
                />
                {expandedOption === "category "&&(
                {radioButtons.categories.options.map(({ id, label }) => (<>
                  <RadioButton
                    key={id}
                    id={id}
                    value={id}
                    checked={filters.category === id}
                    onChange={() => handleFilterChange("category", id)}
                    label={label}
                  />
                ))}
                </>)}
              </div>
            ))}
            )}
          </div> */}

          {/* Status Section */}
          <div className="space-y-3">
            <Label
              text={radioButtons.statuses.title}
              onClick={() => toggleAllFilters("status")}
            />
            <div className="space-y-3">
              {radioButtons.statuses.options.map(({ id, label }) => (
                <RadioButton
                  key={id}
                  id={id}
                  value={id}
                  checked={filters.status === id}
                  onChange={() => handleFilterChange("status", id)}
                  label={label}
                />
              ))}
            </div>
          </div>

          {/* Countries Section */}
          <div className="space-y-3">
            <Label
              text={radioButtons.countries.title}
              onClick={() => toggleAllFilters("country")}
            />

            <div className="space-y-3">
              {radioButtons.countries.options.map(({ id, label }) => (
                <RadioButton
                  key={id}
                  id={id}
                  value={id}
                  checked={filters.country === id}
                  onChange={() => handleFilterChange("country", id)}
                  label={label}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Filter;
