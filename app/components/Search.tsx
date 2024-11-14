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
    <div className="relative mx-4 rounded-3xl border-gray-200 bg-gray-200">
      <IoMdSearch className="absolute left-3 top-5 -translate-y-1/2 transform text-black" />

      <input
        type="text"
        className="ml-8 border-gray-200 bg-gray-200 py-2 text-left focus:outline-none"
        value={search}
        placeholder="Search Job"
        onChange={handleSearch}
      />
    </div>
  );
};

export default Search;
