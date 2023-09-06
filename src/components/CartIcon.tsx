"use client";
import { useCartStore } from "@/utils/store";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect } from "react";

const CartIcon = () => {
  const { totalItems } = useCartStore();

  useEffect(() => {
    useCartStore.persist.rehydrate();
  }, []);

  return (
    <Link href="/cart" className="  relative">
      <div className=" w-12 h-12 md:w-5 md:h-5">
        <Image src="/cart.png" alt="Cart-icon" fill />
        <span className="absolute top-[-10px] right-[-11px] text-base">
          {totalItems}
        </span>
      </div>
    </Link>
  );
};

export default CartIcon;
