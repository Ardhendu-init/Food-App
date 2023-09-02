import React from "react";
import Link from "next/link";
import CartIcon from "./CartIcon";
import Image from "next/image";
import Menu from "./Menu";
import LoginUser from "./LoginUser";

const menuItems = [
  { text: "Home", path: "/" },
  { text: "Menu", path: "/menu" },
  { text: "Contact", path: "/" },
];

const Navbar: React.FC = () => {
  return (
    <div className="h-12 md:h-16 bg-gradient-to-r from-red-500 to-orange-500 text-white p-4 flex items-center justify-between border-b-2 border-b-red-500 font-medium  lg:px-20  text-lg ">
      {/* LEFT LINKS */}
      <div className="hidden md:flex gap-4 flex-1">
        {menuItems.map((item) => (
          <Link key={item.text} href={item.path}>
            {item.text}
          </Link>
        ))}
      </div>
      {/* LOGO */}
      <div className="flex-1 md:justify-center flex ">
        <Link href="/">
          <h1 className=" text-lg md:text-3xl font-bold  border-2 p-1 rounded-md">
            CraveWave
          </h1>
        </Link>
      </div>
      {/* MOBILE MENU */}
      <div className="md:hidden">
        <Menu />
      </div>
      {/* RIGHT LINKS */}
      <div className="hidden md:flex gap-5 items-center justify-end flex-1">
        <div className="md:absolute top-3 r-2 lg:static flex items-center gap-2 cursor-pointer bg-orange-300 px-1 rounded-md">
          <Image src="/phone.png" alt="" width={20} height={20} />
          <span>123 456 78</span>
        </div>

        <CartIcon />
        <LoginUser />
      </div>
    </div>
  );
};

export default Navbar;
