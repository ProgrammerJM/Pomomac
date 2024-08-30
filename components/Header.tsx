import React from "react";
import { ToggleMode } from "./ToggleMode";
import { BsThreeDots } from "react-icons/bs";
import { FaUserCircle } from "react-icons/fa";
import Link from "next/link";

function Header() {
  return (
    <div className="flex justify-between items-center p-9 lg:p-16 md:p-16 sm:p-14">
      <Link href="/">
        <h1 className="dark:text-white text-black font-bold">Pomomac</h1>
      </Link>
      <div className="flex">
        <div className="flex justify-evenly w-24 mr-12">
          <Link
            href={"/signup"}
            className="flex justify-center items-center border border-black dark:border-white rounded-lg dark:text-white text-black px-2 py-2"
          >
            <FaUserCircle
              className="dark:text-white text-black w-auto mr-2"
              size={20}
            />
            <span className="whitespace-nowrap">Sign Up</span>
          </Link>
          <button>
            <BsThreeDots
              className="dark:text-white text-black ml-2"
              width={20}
              height={20}
            />
          </button>
        </div>
        <ToggleMode />
      </div>
    </div>
  );
}

export default Header;
