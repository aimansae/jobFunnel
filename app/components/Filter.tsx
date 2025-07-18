"use client";
import React, { useState } from "react";
import Checkbox from "./Checkbox";
import { BsSliders } from "react-icons/bs";
import { LuArrowRightFromLine } from "react-icons/lu";
import Label from "./Label";
import { IoMdClose } from "react-icons/io";
import useSearchAndFilterParams from "@/hooks/useSearchAndFilterParams";
import { CheckBox } from "@/checkbox";

const Filter = () => {
  const {
    filters,
    filterIsVisible,
    handleFilterChange,
    handleFilterVisibility,
    countFilters,
  } = useSearchAndFilterParams();

  const [toggleMobileFilters, setToggleMobileFilters] = useState(false);

  const mobileFilterView = () => {
    setToggleMobileFilters((prev) => !prev);
  };

  return (
    <div className="relative p-4 md:m-0" data-testid="filter">
      <div className="flex items-center justify-between text-left">
        <button
          onClick={mobileFilterView}
          className="z-40 flex items-center gap-2 text-black"
        >
          {toggleMobileFilters ? (
            <div className="relative flex items-center gap-2">
              <IoMdClose
                data-testid="icon-close"
                size={20}
                className="cursor-pointer border-gray-900 text-gray-700 hover:border"
              />
              <span className="text-base text-gray-700">Filter</span>
            </div>
          ) : (
            <>
              <BsSliders
                size={17}
                className="cursor-pointer"
                data-testid="icon-sliders"
              />
              <span className="text-base text-gray-700">Filter</span>
            </>
          )}
        </button>
        {countFilters > 0 && (
          <span
            data-testid="filter-count"
            className="bg-customPurple absolute left-[5rem] top-[1rem] z-50 ml-1 rounded-full border px-1 text-center text-xs text-white"
          >
            {countFilters}
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
            {/* Funnel Type */}
            <div className="space-y-4">
              <Label
                text={CheckBox.categories.title}
                onClick={() => handleFilterVisibility("category")}
                filterIsVisible={filterIsVisible.category}
              />
              {filterIsVisible.category && (
                <>
                  {CheckBox.categories.options.map(({ id, label }) => (
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
                text={CheckBox.statuses.title}
                onClick={() => handleFilterVisibility("status")}
                filterIsVisible={filterIsVisible.status}
              />
              {filterIsVisible.status && (
                <>
                  {CheckBox.statuses.options.map(({ id, label }) => (
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
                text={CheckBox.countries.title}
                onClick={() => handleFilterVisibility("country")}
                filterIsVisible={filterIsVisible.country}
              />
              {filterIsVisible.country && (
                <div className="flex flex-col gap-2 space-y-3">
                  {CheckBox.countries.options.map(({ id, label }) => (
                    <div key={id}>
                      <Checkbox
                        id={id}
                        value={id}
                        checked={((filters.country as string[]) || []).includes(
                          id,
                        )}
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
