import Price from "@/components/Price";
import { singleProduct } from "@/data";
import Image from "next/image";
import React from "react";

const SingleProductPage = () => {
  return (
    <div className="px-4 lg:px-20 xl:px-40 h-screen flex flex-col md:flex-row md:gap-8 md:items-center">
      {/* IMAGE CONTAINER */}
      <div className="relative w-full h-[300px] md:w-[50%] md:h-[70%]">
        {singleProduct.img && (
          <Image
            src={singleProduct.img}
            alt=""
            layout="fill"
            objectFit="contain"
          />
        )}
      </div>
      {/* TEXT CONTAINER */}
      <div className="flex flex-col justify-center w-full h-fit  py-8 md:w-[50%] md:py-0 ">
        <h1 className="text-3xl font-semibold mb-4 text-red-500 uppercase xl:text-5xl">
          {singleProduct.title}
        </h1>
        <p className="text-gray-600 mb-6">{singleProduct.desc}</p>
        <Price
          price={singleProduct.price}
          id={singleProduct.id}
          options={singleProduct.options}
        />
      </div>
    </div>
  );
};

export default SingleProductPage;
