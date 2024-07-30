import Image from "next/image";
import Link from "next/link";
import React from "react";

const Logo = () => {
  return (
    <Link href="." className="logo">
      <Image
        src="logo.svg"
        alt="Logo"
        width={100}
        height={100}
        className="logo__img"
      />
    </Link>
  );
};

export default Logo;
