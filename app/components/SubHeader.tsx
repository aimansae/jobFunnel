"use client";

import Link from "next/link";
import React from "react";

const subHeaderLinks = [
  { href: "/", label: "Trees" },
  { href: "/", label: "Forms" },
  { href: "/", label: "Templates" },
  { href: "/", label: "Editor" },
];
const SubHeader = () => {
  return (
    <nav data-testid="subheader" className="border-y p-4">
      <ul className="sm:text-md flex gap-4 text-xs sm:text-base md:justify-start md:gap-4">
        {subHeaderLinks.map(({ href, label }) => (
          <li key={label}>
            <Link
              href={href}
              className="font-bold text-violet-800 hover:text-black"
            >
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default SubHeader;
