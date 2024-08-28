import React from "react";
import { ToggleMode } from "./ToggleMode";
import { BsThreeDots } from "react-icons/bs";
import Pomomac from "@/public/pomomaclogo.svg";
import Image from "next/image";

function ProfileHeader() {
  return (
    <div className="flex justify-between items-center p-9 lg:p-16 md:p-16 sm:p-14">
      <Image src={Pomomac} width={60} height={60} alt="Pomomac Logo" />
      <div className="flex">
        <ToggleMode />
      </div>
    </div>
  );
}

export default ProfileHeader;
