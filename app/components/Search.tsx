"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { ChangeEvent, useEffect, useState } from "react";
import { IoMdSearch } from "react-icons/io";

const Search = () => {
  const [search, setSearch] = useState("");
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const querySearch = searchParams.get("search");
    setSearch(querySearch || "");
  }, [searchParams]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (search) {
        router.push(`${pathname}?search=${encodeURIComponent(search)}`);
      } else {
        router.push("/");
      }
    }, 500);
    return () => clearTimeout(timer);
  }, [search, pathname, router]);

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    console.log(search);
  };
  return (
    <div className="relative flex items-center rounded-3xl border-gray-400">
      <IoMdSearch className="absolute left-3 text-black" />

      <input
        type="text"
        className="w-full border border-gray-200 py-2 pl-10 text-left focus:outline-none"
        value={search}
        placeholder="Search by trees, job funned types..."
        onChange={handleSearch}
      />
    </div>
  );
};

export default Search;
