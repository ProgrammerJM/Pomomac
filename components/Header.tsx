import React from "react";
import { ToggleMode } from "./ToggleMode";

function Header() {
  return (
    <div className="flex justify-between p-12 lg:p-20 md:p-24 sm:p-24">
      <h1>Pomomac</h1>
      <ToggleMode />
    </div>
  );
}

export default Header;
