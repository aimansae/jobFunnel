"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import RadioButton from "./Checkbox";
import { radioButtons } from "@/data";
import { BsSliders } from "react-icons/bs";
import { LuArrowRightFromLine } from "react-icons/lu";
import Label from "./Label";
import { IoMdClose } from "react-icons/io";

const Duplicate = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const [filters, setFilters] = useState({
    category: searchParams.get("category") || "",
    status: searchParams.get("status") || "",
    country: searchParams.get("country") || "",
  });

  const [toggleAllFilters, setToggleAllFilters] = useState(true);
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
    <>
      <div className="flex items-center justify-between py-2">
        <div className="md:flex md:gap-2">
          <button onClick={mobileFilterView}>
            {toggleMobileFilters ? (
              <>
                <IoMdClose size={17} className="block md:hidden" />
                <BsSliders
                  size={17}
                  className="hidden cursor-pointer text-gray-700 md:block"
                />
              </>
            ) : (
              <BsSliders size={17} className="cursor-pointer text-gray-700" />
            )}
          </button>

          <span className="hidden text-sm font-semibold text-gray-700 md:block">
            Filter
          </span>
        </div>

        <button
          onClick={() => setToggleAllFilters((prev) => !prev)}
          className="hidden md:block"
        >
          <LuArrowRightFromLine
            className="mx-2 cursor-pointer text-gray-700"
            size={16}
          />
        </button>
      </div>
      <div className={`bg-yellow-400`}>
        {/*        className={`md:text:sm md:justify-left absolute left-0 z-10 mt-2 w-full flex-col space-y-4 bg-purple-400 p-4 text-xs font-bold transition-transform duration-300 ease-in-out md:static md:flex md:w-auto md:flex-row md:gap-3 md:space-y-0 md:bg-red-300 md:p-0 ${toggleMobileFilters ? "flex" : "hidden md:flex"}`}
         */}
        {toggleMobileFilters ||
          (toggleAllFilters && (
            <div className="bg-gray-200 p-2 md:w-full md:bg-transparent md:px-2">
              {/*all filters*/}
              <div className="space-y-4 py-1">
                <div className="space-y-4">
                  {/* Category Filter */}
                  <div className="space-y-3">
                    <Label
                      text={radioButtons.categories.title}
                      onClick={() => handleFilterVisibility("category")}
                      filterIsVisible={filterIsVisible.category}
                    />
                    {filterIsVisible.category && (
                      <>
                        {radioButtons.categories.options.map(
                          ({ id, label }) => (
                            <RadioButton
                              key={id}
                              id={id}
                              value={id}
                              checked={filters.category === id}
                              onChange={() =>
                                handleFilterChange("category", id)
                              }
                              label={label}
                            />
                          ),
                        )}
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
                      <div className="flex flex-col space-y-3">
                        {radioButtons.countries.options.map(
                          ({ id, label, site }) => (
                            <div key={id}>
                              <RadioButton
                                id={id}
                                value={id}
                                checked={filters.country === id}
                                onChange={() =>
                                  handleFilterChange("country", id)
                                }
                                flag={label}
                                label={site}
                              />
                            </div>
                          ),
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>
    </>
  );
};

export default Duplicate;
