"use client";

import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";
import { subHeaderLinks } from "@/data";

const SubHeader = () => {
  const currentPath = usePathname();
  console.log("current path", currentPath);
  return (
    <header className="border-y">
      <nav className="p-4">
        <ul className="sm:text-md flex items-center gap-4 text-xs sm:text-base md:justify-start md:gap-4">
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
