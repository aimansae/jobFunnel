"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import RadioButton from "./RadioButton";
import { radioButtons } from "@/data";
import { BsSliders } from "react-icons/bs";
import { LuArrowRightFromLine } from "react-icons/lu";
import Label from "./Label";
import { IoMdClose } from "react-icons/io";

const Filter = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const [filters, setFilters] = useState({
    category: searchParams.get("category") || "",
    status: searchParams.get("status") || "",
    country: searchParams.get("country") || "",
  });

  const [toggleMobileFilters, setToggleMobileFilters] = useState(false);

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

  const mobileFilterView = () => {
    setToggleMobileFilters((prev) => !prev);
  };

  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    const { category, status, country } = filters;

    if (category) params.set("category", category);
    if (status) params.set("status", status);
    if (country) params.set("country", country);
    router.push(`${pathname}?${params.toString()}`);
  }, [filters, pathname, router, searchParams]);

  return (
    <div className="relative p-4 md:m-0">
      <div className="flex items-center justify-between text-left">
        <button
          onClick={mobileFilterView}
          className="z-50 flex items-center gap-2 text-black"
        >
          {" "}
          {toggleMobileFilters ? (
            <>
              <BsSliders size={17} className="cursor-pointer" />
              <span className="hidden md:block">Filter</span>
            </>
          ) : (
            <>
              <IoMdClose size={20} className="cursor-pointer" />
              <span className="hidden md:block">Filter</span>
            </>
          )}
        </button>

        <button onClick={mobileFilterView}>
          <LuArrowRightFromLine
            className="ml-2 hidden cursor-pointer text-gray-700 md:flex"
            size={16}
          />
        </button>
      </div>
      {!toggleMobileFilters && (
        <div className="h-min-screen absolute left-0 top-0 z-40 w-[250] bg-gray-200 pt-8 md:bg-transparent">
          {/*all filters*/}
          <div className="p-4">
            {/* Category Filter */}
            <div className="text-sx space-y-3">
              <Label
                text={radioButtons.categories.title}
                onClick={() => handleFilterVisibility("category")}
                filterIsVisible={filterIsVisible.category}
              />
              {filterIsVisible.category && (
                <>
                  {radioButtons.categories.options.map(({ id, label }) => (
                    <RadioButton
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
            <div className="space-y-3">
              <Label
                text={radioButtons.statuses.title}
                onClick={() => handleFilterVisibility("status")}
                filterIsVisible={filterIsVisible.status}
              />
              {filterIsVisible.status && (
                <>
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
                </>
              )}
            </div>

            {/* Country Filter */}
            <div className="space-y-3">
              <Label
                text={radioButtons.countries.title}
                onClick={() => handleFilterVisibility("country")}
                filterIsVisible={filterIsVisible.country}
              />
              {filterIsVisible.country && (
                <div className="flex flex-col gap-2 space-y-3">
                  {radioButtons.countries.options.map(({ id, label }) => (
                    <div key={id}>
                      <RadioButton
                        id={id}
                        value={id}
                        checked={filters.country === id}
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
