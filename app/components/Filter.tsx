"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import Checkbox from "./Checkbox";
import { radioButtons } from "../../data";
import { BsSliders } from "react-icons/bs";
import { LuArrowRightFromLine } from "react-icons/lu";
import Label from "./Label";
import { IoMdClose } from "react-icons/io";
import { FiltersType } from "../../types";
import useFilterParams from "@/hooks/useFilterParams";

const Filter = () => {
  const {
    filters,
    filterIsVisible,
    handleFilterChange,
    handleFilterVisibility,
  } = useFilterParams();

  const [toggleMobileFilters, setToggleMobileFilters] = useState(false);

  const mobileFilterView = () => {
    setToggleMobileFilters((prev) => !prev);
  };

  const countFilters = () => {
    let count = 0;
    if (filters.category) count++;
    if (filters.status) count++;

    if (filters.country.length > 0) count++;
    return count;
  };
  return (
    <div className="relative p-4 md:m-0">
      <div className="flex items-center justify-between text-left">
        <button
          onClick={mobileFilterView}
          className="z-40 flex items-center gap-2 text-black"
        >
          {toggleMobileFilters ? (
            <div className="relative flex items-center">
              <IoMdClose size={20} className="text-gray-70 cursor-pointer" />
            </div>
          ) : (
            <>
              <BsSliders size={17} className="cursor-pointer" />
              <span className="text-base text-gray-700">Filter</span>
            </>
          )}
        </button>
        {!toggleMobileFilters && countFilters() > 0 && (
          <span className="absolute left-[5rem] top-[1rem] z-50 rounded-full border bg-violet-500 px-1 text-center text-xs text-white">
            {countFilters()}
          </span>
        )}
        <button onClick={mobileFilterView}>
          <LuArrowRightFromLine
            className="ml-2 hidden cursor-pointer text-gray-700 md:flex"
            size={16}
          />
        </button>
      </div>
      {toggleMobileFilters && (
        <div className="h-min-screen absolute left-0 top-[-10px] z-20 w-[250] bg-gray-200 pt-8 md:bg-transparent">
          {/*all filters*/}
          <div className="my-6 flex flex-col gap-6 p-4">
            {/* Funnel Filter */}
            <div className="space-y-4">
              <Label
                text={radioButtons.categories.title}
                onClick={() => handleFilterVisibility("category")}
                filterIsVisible={filterIsVisible.category}
              />
              {filterIsVisible.category && (
                <>
                  {radioButtons.categories.options.map(({ id, label }) => (
                    <Checkbox
                      key={id}
                      id={id}
                      value={id}
                      checked={filters.category === id}
                      onChange={() => handleFilterChange("category", id)}
                      label={label}
                    />
                  ))}
                </>
              )}
            </div>

            {/* Status Filter */}
            <div className="space-y-4">
              <Label
                text={radioButtons.statuses.title}
                onClick={() => handleFilterVisibility("status")}
                filterIsVisible={filterIsVisible.status}
              />
              {filterIsVisible.status && (
                <>
                  {radioButtons.statuses.options.map(({ id, label }) => (
                    <Checkbox
                      key={id}
                      id={id}
                      value={id}
                      checked={filters.status === id}
                      onChange={() => handleFilterChange("status", id)}
                      label={label}
                    />
                  ))}
                </>
              )}
            </div>

            {/* Country Filter */}
            <div className="space-y-4">
              <Label
                text={radioButtons.countries.title}
                onClick={() => handleFilterVisibility("country")}
                filterIsVisible={filterIsVisible.country}
              />
              {filterIsVisible.country && (
                <div className="flex flex-col gap-2 space-y-3">
                  {radioButtons.countries.options.map(({ id, label }) => (
                    <div key={id}>
                      <Checkbox
                        id={id}
                        value={id}
                        checked={(filters.country as string[]).includes(id)}
                        onChange={() => handleFilterChange("country", id)}
                        flag={label}
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Filter;
