import React from "react";
import { CountryFlagProps } from "../../types";
import Image from "next/image";
const countryCodes: { [key: string]: string } = {
  USA: "us",
  Canada: "ca",
  France: "fr",
  Italy: "it",
};

const CountryFlag = ({ country }: CountryFlagProps) => {
  const countryCode = countryCodes[country] || "us"; // Default to "us" if country code is not found

  return (
    <img
      src={`https://flagpedia.net/data/flags/h80/${countryCode}.png`}
      alt={`${country} flag`}
      width="32"
      height="24"
    />
  );
};

export default CountryFlag;
