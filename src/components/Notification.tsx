import { BellRing } from "lucide-react";
import React from "react";

const Notification = () => {
  return (
    <div className="h-10 md:px-3 md:py-1 md:bg-slate-50 cursor-pointer flex items-center rounded relative">
      <BellRing strokeWidth={1.25} />
      <div className="w-4 h-4 rounded-full bg-red-500 text-xs text-white absolute top-0 right-[-10px] flex items-center justify-center">
        3
      </div>
    </div>
  );
};

export default Notification;
