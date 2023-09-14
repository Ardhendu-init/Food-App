import { ProductType } from "@/types/types";
import serverAxios from "@/utils/http";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaStar } from "react-icons/fa";

const getProducts = async (category: string) => {
  try {
    const response = await serverAxios.get(`/api/products?cat=${category}`, {
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
type paramsProps = {
  params: { category: string };
};

const CategoryPage: React.FC<paramsProps> = async ({ params }) => {
  const products: ProductType[] = await getProducts(params.category);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 py-6 px-3">
      {products.map((item) => (
        <div
          key={item.id}
          className="border rounded-lg overflow-hidden hover:shadow-md transition duration-300 bg-white even:bg-fuchsia-50"
        >
          <Link href={`/product/${item.id}`}>
            <div className="relative h-[250px]">
              {item.img && (
                <Image
                  src={item.img}
                  alt=""
                  layout="fill"
                  objectFit="contain"
                />
              )}
            </div>
            <div className="p-4">
              <h1 className="text-xl font-semibold mb-2 text-red-500 text-center">
                {item.title}
              </h1>
              <div className="flex justify-between items-center">
                {item.rating && (
                  <div className="flex items-center">
                    <span className="text-yellow-400">
                      {Array.from({ length: Math.floor(item.rating) }).map(
                        (_, index) => (
                          <FaStar
                            key={index}
                            className="inline text-yellow-400"
                          />
                        )
                      )}
                    </span>
                    <span className="text-orange-600 font-medium ml-1 mt-1">
                      ({item.rating.toFixed(1)})
                    </span>
                  </div>
                )}
                <span className="text-lg font-bold text-red-500">
                  Price - ₹{item.price.toFixed(2)}
                </span>
              </div>
            </div>
          </Link>
          {/* <button className="bg-red-500 text-white text-center py-2 w-full">
            Add to Cart
          </button> */}
        </div>
      ))}
    </div>
  );
};

export default CategoryPage;
