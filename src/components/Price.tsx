"use client";

import React, { useEffect, useState } from "react";

type Props = {
  price: number;
  id: number;
  options?: { title: string; additionalPrice: number }[];
};

const Price = ({ price, id, options }: Props) => {
  const [total, setTotal] = useState(price);
  const [quantity, setQuantity] = useState(1);
  const [selected, setSelected] = useState(0);

  useEffect(() => {
    setTotal(
      quantity * (options ? price + options[selected].additionalPrice : price)
    );
  }, [quantity, selected, options, price]);

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-2xl font-bold text-red-500">${total.toFixed(2)}</h2>
      {/* OPTIONS CONTAINER */}
      <div className="flex gap-4">
        {options?.map((option, index) => (
          <button
            key={option.title}
            className={`min-w-[6rem] py-2 px-4 rounded-md ${
              selected === index
                ? "bg-red-500 text-white"
                : "bg-red-100 text-red-500"
            }`}
            onClick={() => setSelected(index)}
          >
            {option.title}
          </button>
        ))}
      </div>
      {/* QUANTITY AND ADD BUTTON CONTAINER */}
      <div className="flex justify-between  flex-col gap-6">
        {/* QUANTITY */}
        <div className="flex gap-6 items-center w-1/2 ">
          <span className="text-base font-bold text-red-500">Quantity</span>
          <div className="flex gap-2 items-center">
            <button
              onClick={() => setQuantity((prev) => (prev > 1 ? prev - 1 : 1))}
              className="py-2 px-3 rounded-md bg-red-100 text-red-500 hover:bg-red-200 transition duration-300"
            >
              -
            </button>
            <span className="text-red-500 font-semibold">{quantity}</span>
            <button
              onClick={() => setQuantity((prev) => (prev < 9 ? prev + 1 : 9))}
              className="py-2 px-3 rounded-md bg-red-100 text-red-500 hover:bg-red-200 transition duration-300"
            >
              +
            </button>
          </div>
        </div>
        {/* CART BUTTON */}
        <button className="uppercase  bg-red-500 text-white p-3 rounded-md">
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default Price;
