"use client";

import React, { useState } from "react";
import Link from "next/link";
import { CiMenuBurger } from "react-icons/ci";
import { IoMdClose } from "react-icons/io";
import { navLinks } from "../../data";
import Image from "next/image";
import logo from "../../public/assets/logo.png";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => {
    setIsMenuOpen((prevIsMenuOpen) => !prevIsMenuOpen);
  };
  return (
    <header className="w-full items-center bg-[#4d40ab] p-6 text-sm text-white md:flex md:items-center md:justify-evenly">
      {/*Logo*/}
      <div className="flex items-center justify-between">
        <Link href={"/"}>
          <Image src={logo} alt="logo" width={70} />
        </Link>
        <button
          className="flex text-2xl text-white md:hidden"
          onClick={toggleMenu}
          aria-label="toggle-menu"
        >
          {!isMenuOpen ? <CiMenuBurger /> : <IoMdClose />}
        </button>
      </div>

      <ul
        className={`absolute left-0 z-50 w-full flex-col space-y-4 bg-[#4d40ab] p-4 font-bold transition-transform duration-300 ease-in-out md:static md:flex md:w-auto md:flex-row md:justify-center md:gap-3 md:space-y-0 md:bg-transparent md:p-0 ${
          isMenuOpen ? "flex" : "hidden md:flex"
        }`}
      >
        {navLinks.map(({ href, label }) => (
          <li key={href}>
            <Link href={href}>{label}</Link>
          </li>
        ))}
      </ul>
    </header>
  );
};

export default Header;
