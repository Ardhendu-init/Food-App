"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import CartIcon from "./CartIcon";

import { RiMenu3Line } from "react-icons/ri";
import { MdRestaurantMenu } from "react-icons/md";
import { signOut, useSession } from "next-auth/react";
import LoginUser from "./LoginUser";
import { useRouter } from "next/navigation";
const links = [
  { id: 1, title: "Homepage", url: "/" },
  { id: 2, title: "Menu", url: "/menu" },

  { id: 4, title: "Contact", url: "/" },
];

const Menu = () => {
  const [open, setOpen] = useState(false);
  const { status, data } = useSession();
  const router = useRouter();

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

          {status === "unauthenticated" ? (
            <button
              className="cursor-pointer bg-orange-300 hover:bg-orange-400 px-2  rounded-md   font-medium"
              onClick={() => router.push("/login")}
            >
              Login
            </button>
          ) : (
            <div className="flex flex-col items-center gap-3">
              <div className="flex gap-2">
                {data?.user?.image && (
                  <Image
                    src={data?.user?.image}
                    alt="User Icon"
                    width={40}
                    height={40}
                    className="cursor-pointer rounded-full"
                  />
                )}
                <p className="whitespace-nowrap">
                  {" "}
                  Welcome {String(data?.user?.name).split(" ")[0]} !
                </p>
              </div>
              <button
                className="cursor-pointer bg-orange-300 px-2 py-1 rounded-md   font-medium hover:bg-orange-400 text-2xl"
                onClick={() => signOut()}
              >
                Logout
              </button>
              <div>
                <Link
                  href="/orders"
                  className="bg-orange-300 px-2 py-1 rounded-md hover:bg-orange-400 text-2xl"
                >
                  Orders
                </Link>
              </div>
            </div>
          )}

          <Link
            href="/cart"
            onClick={() => setOpen(false)}
            className="hover:font-bold text-2xl"
          >
            <CartIcon />
          </Link>
        </div>
      )}
    </div>
  );
};

export default Menu;
