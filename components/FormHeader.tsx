import React from "react";
import { ToggleMode } from "./ToggleMode";
import Link from "next/link";

export default function FormHeader() {
  return (
    <div className="flex justify-between items-center p-6 lg:p-16 md:p-16 sm:p-14">
      <Link href="/">
        <h1 className="dark:text-white text-black font-bold">Pomomac</h1>
      </Link>
      <ToggleMode />
    </div>
  );
}
