import React from "react";
import { ToggleMode } from "./ToggleMode";
import { logOutUser } from "@/app/services/auth/logOutUser";
import { BiLogOut } from "react-icons/bi";
import UserSettings from "@/components/UserSettings";
import { useRouter } from "next/navigation";
import Link from "next/link";

function ProfileHeader() {
  const router = useRouter();

  const handleLogout = () => {
    logOutUser(router);
  };

  return (
    <div className="flex justify-between items-center p-9 lg:p-16 md:p-16 sm:p-14">
      <Link href="/">
        <h1 className="dark:text-white text-black font-bold">Pomomac</h1>
      </Link>
      <div className="flex">
        <div className="flex justify-evenly w-24 mr-12">
          <button
            onClick={handleLogout}
            className="flex justify-center items-center border border-black dark:border-white rounded-lg dark:text-white text-black px-2 py-2"
          >
            <BiLogOut
              className="dark:text-white text-black w-auto mr-2"
              size={20}
            />
            <span className="whitespace-nowrap">Logout</span>
          </button>
        </div>
        <UserSettings />
        <ToggleMode />
      </div>
    </div>
  );
}

export default ProfileHeader;
