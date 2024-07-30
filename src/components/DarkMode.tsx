import { SunMoon } from "lucide-react";
import React from "react";

const DarkMode = () => {
  return (
    <div className="h-10 md:px-3 md:py-1 md:bg-slate-50 cursor-pointer flex items-center rounded">
      <SunMoon strokeWidth={1.25} />
    </div>
  );
};

export default DarkMode;
