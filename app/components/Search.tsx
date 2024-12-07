"use client";
import useFilterParams from "@/hooks/useSearchAndFilterParams";
import React, { ChangeEvent } from "react";
import { IoMdSearch } from "react-icons/io";

const Search = () => {
  const { handleSearchChange, search } = useFilterParams();

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    handleSearchChange(e.target.value);
  };
  return (
    <div className="relative flex items-center rounded-3xl border-gray-400">
      <IoMdSearch className="absolute left-3 text-black" />

      <input
        type="text"
        className="w-full border border-gray-200 py-2 pl-10 text-left focus:outline-none"
        value={search}
        placeholder="Search by trees, job funned types..."
        onChange={handleInputChange}
      />
    </div>
  );
};

export default Search;
