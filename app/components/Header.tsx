"use client";

import React, { useState } from "react";
import Link from "next/link";
import { CiMenuBurger } from "react-icons/ci";
import { IoMdClose } from "react-icons/io";
import { navLinks } from "@/data";
import Image from "next/image";
import logo from "../../public/assets/logo.png";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => {
    setIsMenuOpen((prevIsMenuOpen) => !prevIsMenuOpen);
  };
  return (
    <header className="p-4 bg-[#4d40ab] text-white  w-full md:flex md:justify-around items-center text-sm">
      {/*Logo*/}
      <div className="flex items-center justify-between md:mr-6 ">
        <Link href={"/"}>
          <Image src={logo} alt="logo" width={70} />
        </Link>
        <button
          className="flex  text-white text-2xl md:hidden"
          onClick={toggleMenu}
          aria-label="toggle-menu"
        >
          {!isMenuOpen ? <CiMenuBurger /> : <IoMdClose />}
        </button>
      </div>

      <ul
        className={`flex-col md:flex-row md:flex  md:justify-center md:gap-3 space-y-4 md:space-y-0 absolute md:static bg-[#4d40ab] md:bg-transparent w-full md:w-auto left-0 p-4 md:p-0 z-10 transition-transform duration-300 ease-in-out font-bold  ${
          isMenuOpen ? "flex" : "hidden md:flex"
        }`}
      >
        {navLinks.map(({ href, label }) => (
          <li key={href}>
            <Link href={href}>{label}</Link>
          </li>
        ))}
      </ul>
      <div className="hidden md:block">
        <li key={"/"} className="list-none">
          <Link href={"/"}>Logout</Link>
        </li>
      </div>
    </header>
  );
};

export default Header;
