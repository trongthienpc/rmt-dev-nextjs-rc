import Image from "next/image";
import React from "react";

const Background = () => {
  return (
    <div className="background">
      <Image src={"pattern.svg"} width={1000} height={1000} alt="pattern" />
    </div>
  );
};

export default Background;
