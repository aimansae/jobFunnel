import React from "react";

type CountryFlagTypes = {
  country: string;
  className?: string;
};

const countryCodes: { [key: string]: string } = {
  USA: "us",
  Canada: "ca",
  France: "fr",
  Italy: "it",
};

const CountryFlag = ({ country }: CountryFlagTypes) => {
  const countryCode = countryCodes[country] || "us"; // Default to "us" if country code is not found

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={`https://flagpedia.net/data/flags/h80/${countryCode}.png`}
      alt={`${country} flag`}
      width="30"
      height="20"
    />
  );
};

export default CountryFlag;
