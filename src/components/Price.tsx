"use client";

import { ProductType } from "@/types/types";
import { useCartStore } from "@/utils/store";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const Price = ({ product }: { product: ProductType }) => {
  const [total, setTotal] = useState(product.price);
  const [quantity, setQuantity] = useState(1);
  const [selected, setSelected] = useState(0);
  const { addToCart } = useCartStore();
  console.log("second", product);
  useEffect(() => {
    useCartStore.persist.rehydrate();
  }, []);

  useEffect(() => {
    setTotal(
      quantity *
        (product.options?.length
          ? product.price + product.options[selected].additionalPrice
          : product.price)
    );
  }, [quantity, selected, product]);

  const handleCart = () => {
    addToCart({
      id: product.id,
      title: product.title,
      img: product.img,
      price: total,
      ...(product.options?.length && {
        optionTitle: product.options[selected].title,
      }),
      quantity: quantity,
    });
    toast.success("The product added to the cart!");
  };

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-2xl font-bold text-red-500">${total.toFixed(2)}</h2>
      {/* OPTIONS CONTAINER */}
      <div className="flex gap-4">
        {product.options?.length &&
          product.options?.map((option, index) => (
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
        <button
          className="uppercase  bg-red-500 text-white p-3 rounded-md"
          onClick={() => handleCart()}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default Price;
