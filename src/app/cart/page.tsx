"use client";
import Image from "next/image";
import React, { useState } from "react";
import { FaTrash } from "react-icons/fa";

const CartPage = () => {
  const [cartItems, setCartItems] = useState([
    { id: 1, title: "Sicilian Pizza", size: "Large", price: 79.9, quantity: 1 },
    { id: 2, title: "Sicilian Pizza", size: "Large", price: 79.9, quantity: 1 },

    // ...other cart items...
  ]);

  const handleRemoveItem = (id: number) => {
    const updatedCartItems = cartItems.filter((item) => item.id !== id);
    setCartItems(updatedCartItems);
  };

  const handleQuantityChange = (id: number, newQuantity: number) => {
    const updatedCartItems = cartItems.map((item) =>
      item.id === id ? { ...item, quantity: newQuantity } : item
    );
    setCartItems(updatedCartItems);
  };

  const calculateSubtotal = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  return (
    <div className="h-[calc(100vh-9rem)]  flex flex-col text-red-500 lg:flex-row ">
      {/* PRODUCTS CONTAINER */}
      <div className=" h-1/2 p-4 flex flex-col justify-center overflow-y-scroll   lg:h-full lg:w-2/3 2xl:w-1/2 lg:px-20 xl:px-40">
        {cartItems.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between mb-6 p-4 rounded-md bg-white shadow-md"
          >
            <div className="w-24 h-24 relative mr-4">
              <Image
                src="/temporary/p1.png"
                alt=""
                layout="fill"
                objectFit="cover"
                className="rounded-md"
              />
            </div>
            <div className="flex-1">
              <h1 className="uppercase text-lg font-semibold">{item.title}</h1>
              <span className="text-gray-600 text-sm block mt-1">
                {item.size}
              </span>
            </div>
            <div className="text-red-600 font-semibold mr-2">
              ${item.price.toFixed(2)}
            </div>
            <button
              onClick={() => handleRemoveItem(item.id)}
              className="text-gray-500 hover:text-red-500 focus:outline-none transition transform hover:scale-105"
            >
              <FaTrash />
            </button>
          </div>
        ))}
      </div>
      {/* PAYMENT CONTAINER */}
      <div className="h-1/2 p-4 bg-gray-100 flex flex-col gap-4 justify-center lg:h-full lg:w-1/3 2xl:w-1/2 lg:px-20 2xl:text-xl 2xl:gap-6">
        <div className="flex justify-between">
          <span className="font-semibold">Subtotal (3 items)</span>
          <span className="font-semibold">
            ${calculateSubtotal().toFixed(2)}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="font-semibold">Service Cost</span>
          <span className="font-semibold">$0.00</span>
        </div>
        <div className="flex justify-between">
          <span className="font-semibold">Delivery Cost</span>
          <span className="text-green-500">FREE!</span>
        </div>
        <hr className="my-2 border-gray-300" />
        <div className="flex justify-between">
          <span className="font-semibold">TOTAL (Incl. VAT)</span>
          <span className="font-bold text-red-600">
            ${calculateSubtotal().toFixed(2)}
          </span>
        </div>
        <button className="bg-red-500 text-white py-3 rounded-md hover:bg-red-600 transition transform hover:scale-105 focus:outline-none">
          CHECKOUT
        </button>
      </div>
    </div>
  );
};

export default CartPage;
