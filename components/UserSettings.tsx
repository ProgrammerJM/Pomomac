import { editUserSettings } from "@/app/services/editUserSettings";
import React from "react";
import { CiSettings } from "react-icons/ci";

function UserSettings() {
  return (
    <div className="flex justify-evenly w-24 mr-12">
      <button
        onClick={editUserSettings}
        className="flex justify-center items-center border border-black dark:border-white rounded-lg dark:text-white text-black px-2 py-2"
      >
        <CiSettings
          className="dark:text-white text-black w-auto mr-2"
          size={20}
        />
        <span className="whitespace-nowrap">Settings</span>
      </button>
    </div>
  );
}

export default UserSettings;
