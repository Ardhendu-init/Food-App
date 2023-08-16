import React from "react";
import Link from "next/link";
import CartIcon from "./CartIcon";
import Image from "next/image";
import Menu from "./Menu";

const menuItems = [
  { text: "Home", path: "/" },
  { text: "Menu", path: "/menu" },
  { text: "Contact", path: "/" },
];

const Navbar: React.FC = () => {
  const user = false; // Change this based on user authentication

  return (
    <div className="h-12 md:h-16 bg-gradient-to-r from-red-500 to-orange-500 text-white p-4 flex items-center justify-between border-b-2 border-b-red-500 font-medium  lg:px-20 xl:px- text-lg ">
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
          <Image
            src="/foodappLogo.png"
            width={200}
            height={100}
            alt="Food_App_Logo"
            className="sm:h-12"
          />
        </Link>
      </div>
      {/* MOBILE MENU */}
      <div className="md:hidden">
        <Menu />
      </div>
      {/* RIGHT LINKS */}
      <div className="hidden md:flex gap-4 items-center justify-end flex-1">
        <div className="md:absolute top-3 r-2 lg:static flex items-center gap-2 cursor-pointer bg-orange-300 px-1 rounded-md">
          <Image src="/phone.png" alt="" width={20} height={20} />
          <span>123 456 78</span>
        </div>
        {!user ? (
          <Link href="/login">Login</Link>
        ) : (
          <Link href="/orders">Orders</Link>
        )}
        <CartIcon />
      </div>
    </div>
  );
};

export default Navbar;
