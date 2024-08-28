import React from "react";
import { ToggleMode } from "./ToggleMode";
import Pomomac from "@/public/pomomaclogo.svg";
import Image from "next/image";
import { logOutUser } from "@/app/services/logOutUser";
import { BiLogOut } from "react-icons/bi";

function ProfileHeader() {
  return (
    <div className="flex justify-between items-center p-9 lg:p-16 md:p-16 sm:p-14">
      <Image src={Pomomac} width={60} height={60} alt="Pomomac Logo" />
      <div className="flex">
        <div className="flex justify-evenly w-24 mr-12">
          <button
            onClick={logOutUser}
            className="flex justify-center items-center border border-black dark:border-white rounded-lg dark:text-white text-black px-2 py-2"
          >
            <BiLogOut
              className="dark:text-white text-black w-auto mr-2"
              size={20}
            />
            <span className="whitespace-nowrap">Logout</span>
          </button>
        </div>
        <ToggleMode />
      </div>
    </div>
  );
}

export default ProfileHeader;
