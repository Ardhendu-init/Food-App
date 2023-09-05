import Image from "next/image";
import Link from "next/link";
import React from "react";

const CartIcon = () => {
  return (
    <Link href="/cart" className="  relative">
      <div className=" w-12 h-12 md:w-5 md:h-5">
        <Image src="/cart.png" alt="Cart-icon" fill />
        <span className="absolute top-[-10px] right-[-11px] text-base">3</span>
      </div>
    </Link>
  );
};

export default CartIcon;
