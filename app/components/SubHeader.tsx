"use client";

import Link from "next/link";
import React from "react";
import { subHeaderLinks } from "../../data";

const SubHeader = () => {
  return (
    <header data-testid="subheader" className="border-y">
      <nav className="p-4">
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
    </header>
  );
};

export default SubHeader;
