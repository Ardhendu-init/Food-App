"use client";
import { useCartStore } from "@/utils/store";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect } from "react";

const CartIcon = () => {
  const { totalItems } = useCartStore();

  const { data: session } = useSession();
  useEffect(() => {
    useCartStore.persist.rehydrate();
  }, []);

  return (
    <>
      {session?.user.isAdmin ? (
        <Link
          href="/add"
          className=" bg-orange-300 hover:bg-orange-400 px-1 whitespace-nowrap rounded-md"
        >
          Add Items
        </Link>
      ) : (
        <Link href="/cart" className="relative">
          <div className=" w-12 h-12 md:w-5 md:h-5">
            <Image src="/cart.png" alt="Cart-icon" fill sizes="" />
            <span className="absolute top-[-10px] right-[-11px] text-base">
              {totalItems}
            </span>
          </div>
        </Link>
      )}
    </>
  );
};

export default CartIcon;
