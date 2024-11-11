"use client";
import { useRouter } from "next/navigation";
import React, { ChangeEvent, useEffect, useState } from "react";

const Search = () => {
  const [search, setSearch] = useState("");
  const router = useRouter();
  console.log("current router", router);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (search) {
        router.push(`/?search=${encodeURIComponent(search)}`);
      } else {
        router.push("/");
      }
    }, 500);
    return () => clearTimeout(timer);
  }, [search]);

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    console.log(search);
  };
  return (
    <div className="">
      <input
        type="text"
        className="p rounded-3xl border border-gray-400 py-2 text-center"
        value={search}
        placeholder="Search Job"
        onChange={handleSearch}
      />
    </div>
  );
};

export default Search;
