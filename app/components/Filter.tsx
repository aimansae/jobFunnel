"use client";

import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import RadioButton from "./RadioButton";
import { radioButtons } from "@/data";

const Filter = () => {
  const [category, setCategory] = useState("");
  const [status, setStatus] = useState("");
  const [country, setCountry] = useState("");
  const router = useRouter();

  useEffect(() => {
    const updateQuery = () => {
      const query: { category?: string; status?: string; country?: string } =
        {};
      if (category) query.category = category;
      if (status) query.status = status;
      if (country) query.country = country;
      const queryString = new URLSearchParams(query).toString();

      router.push(`/?search&${queryString}`);
    };
    updateQuery();
  }, [category, status, country]);

  const handleCategoryChange = (value: string) => {
    setCategory(value);
  };
  const handleStatusChange = (value: string) => {
    setStatus(value);
  };
  const handleCountryChange = (value: string) => {
    setCountry(value);
  };

  return (
    <div className="flex flex-col">
      <h4 className="mb-2 text-lg font-semibold text-gray-700">Filter</h4>
      <div className="space-y-2">
        <label className="block font-medium text-gray-600">
          {radioButtons.categories.title}
        </label>
        <div className="flex flex-col space-y-1 pl-4">
          {radioButtons.categories.options.map(({ id, label }) => (
            <RadioButton
              key={id}
              id={id}
              value={id}
              checked={category === id}
              onChange={() => handleCategoryChange(id)}
              label={label}
            />
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <label className="my-3 block font-medium text-gray-600">
          {" "}
          {radioButtons.statuses.title}
        </label>
        <div className="flex flex-col space-y-1 pl-4">
          {radioButtons.statuses.options.map(({ id, label }) => (
            <RadioButton
              id={id}
              value={id}
              checked={status === id}
              onChange={() => handleStatusChange(id)}
              label={label}
            />
          ))}
        </div>
      </div>

      {/* Countries Section */}
      <div className="space-y-2">
        <label className="my-3 block font-medium text-gray-600">
          {radioButtons.countries.title}
        </label>
        <div className="flex flex-col space-y-1 pl-4">
          {radioButtons.countries.options.map(({ id, label }) => (
            <RadioButton
              id={id}
              value={id}
              checked={country === id}
              onChange={() => handleCountryChange(id)}
              label={label}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Filter;
