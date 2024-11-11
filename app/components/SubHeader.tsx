"use client";

import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";
import { subHeaderLinks } from "@/data";

const SubHeader = () => {
  const currentPath = usePathname();
  console.log("current path", currentPath);
  return (
    <header className="border-y p-2 md:p-4">
      <nav>
        <ul className="sm:text-md flex flex-row items-center gap-3 text-xs sm:gap-4 sm:text-base">
          {subHeaderLinks.map(({ href, label }) => (
            <li key={href}>
              <Link
                href={href}
                className={
                  currentPath === href ? "font-bold text-violet-800" : ""
                }
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
