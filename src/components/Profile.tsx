import { CircleUser } from "lucide-react";
import React from "react";

const Profile = () => {
  return (
    <div className="h-10 md:px-3 md:py-1 md:bg-slate-50 cursor-pointer flex items-center rounded">
      <div className="hidden h-full md:flex items-center gap-2 py-3">
        <div className="w-8 h-8 rounded-full bg-[#6969ff]"></div>
        <span className="font-semibold drop-shadow-md text-md">David John</span>
      </div>
      <CircleUser strokeWidth={1.25} className="md:hidden drop-shadow-md" />
    </div>
  );
};

export default Profile;
