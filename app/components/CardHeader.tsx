"use client";

import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";
import { cardHeaderLinks } from "@/data";

const CardHeader = () => {
  const currentPath = usePathname();
  console.log("current path", currentPath);
  return (
    <header className="border-y p-2 md:p-4">
      <nav>
        <ul className="flex flex-row  gap-3 sm:gap-4 items-center text-xs sm:text-base sm:text-md">
          {cardHeaderLinks.map(({ href, label }) => (
            <li key={href}>
              <Link
                href={href}
                className={
                  currentPath === href ? "text-violet-800 font-bold" : ""
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

export default CardHeader;
