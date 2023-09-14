"use client";
import { ProductType } from "@/types/types";
import serverAxios from "@/utils/http";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaStar } from "react-icons/fa";

const Featured: React.FC = () => {
  const { isLoading, error, data } = useQuery({
    queryKey: ["/products"],
    queryFn: () => {
      return serverAxios.get("/products").then((res) => res.data);
    },
  });
  if (error) {
    return (
      <div className="flex justify-center items-center text-lg">
        Something went Wrong...
      </div>
    );
  }

  return (
    <div className="w-full overflow-hidden bg-gray-100 py-10">
      <div className="container mx-auto">
        <h2 className="text-3xl font-semibold text-center mb-6 text-red-500">
          Featured Products
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {data?.map((item: ProductType) => (
            <div
              key={item.id}
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg  duration-300 text-red-500 hover:bg-fuchsia-50 transition-all relative"
            >
              {item.img && (
                <div className="w-full h-40 relative mb-4 hover:rotate-[60deg] transition-all duration-500">
                  <Image
                    src={item.img}
                    alt=""
                    layout="fill"
                    objectFit="contain"
                  />
                </div>
              )}
              {/* TEXT CONTAINER */}
              <div className=" flex-1 flex flex-col items-center justify-center text-center gap-2">
                <h1 className="text-xl font-bold uppercase xl:text-2xl ">
                  {item.title}
                </h1>
                <p className="p-4 ">{item.desc}</p>
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
                      ({item.rating?.toFixed(1)})
                    </span>
                  </div>
                )}
                <span className="text-xl font-bold">₹{item.price}</span>
                <Link
                  className="bg-red-500 text-white p-2 rounded-md "
                  href={`/product/${item.id}`}
                >
                  Order Now
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Featured;
