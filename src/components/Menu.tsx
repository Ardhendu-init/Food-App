"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import CartIcon from "./CartIcon";

import { RiMenu3Line } from "react-icons/ri";
import { MdRestaurantMenu } from "react-icons/md";
const links = [
  { id: 1, title: "Homepage", url: "/" },
  { id: 2, title: "Menu", url: "/menu" },
  { id: 3, title: "Working Hours", url: "/" },
  { id: 4, title: "Contact", url: "/" },
];

const Menu = () => {
  const [open, setOpen] = useState(false);

  // TEMPORARY
  const user = false;
  return (
    <div>
      <div
        onClick={() => setOpen(!open)}
        className="cursor-pointer p-2 rounded-full bg-gradient-to-b from-red-500 to-orange-500"
      >
        {open ? <MdRestaurantMenu size={25} /> : <RiMenu3Line size={25} />}
      </div>

      {open && (
        <div className="bg-gradient-to-b from-red-500 to-orange-500 text-white absolute left-0 top-24 w-full h-[calc(100vh-6rem)] flex flex-col gap-8 items-center justify-center text-3xl z-10">
          {links.map((item) => (
            <Link
              href={item.url}
              key={item.id}
              onClick={() => setOpen(false)}
              className="hover:font-bold "
            >
              {item.title}
            </Link>
          ))}

          <Link
            href={user ? "/orders" : "login"}
            onClick={() => setOpen(false)}
            className="hover:font-bold"
          >
            {user ? "Orders" : "Login"}
          </Link>
          <Link
            href="/cart"
            onClick={() => setOpen(false)}
            className="hover:font-bold"
          >
            <CartIcon />
          </Link>
        </div>
      )}
    </div>
  );
};

export default Menu;
