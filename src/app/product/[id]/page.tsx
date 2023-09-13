import Price from "@/components/Price";

import { ProductType } from "@/types/types";
import serverAxios from "@/utils/http";
import Image from "next/image";
import React from "react";

const getSingleProduct = async (id: string) => {
  try {
    const response = await serverAxios.get(`/products/${id}`, {
      headers: {
        "Cache-Control": "no-store",
      },
    });

    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error("Failed");
    }
  } catch (error) {
    console.error(error);

    throw error;
  }
};

const SingleProductPage: React.FC<{ params: { id: string } }> = async ({
  params,
}) => {
  const singleProduct: ProductType = await getSingleProduct(params.id);

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
        <Price product={singleProduct} />
      </div>
    </div>
  );
};

export default SingleProductPage;
