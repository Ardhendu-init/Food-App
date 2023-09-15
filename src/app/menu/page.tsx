"use client";
import { MenuType } from "@/types/types";
import serverAxios from "@/utils/http";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import React from "react";

const MenuPage: React.FC = () => {
  const { isLoading, error, data } = useQuery({
    queryKey: ["/categories"],
    queryFn: () => {
      return serverAxios.get("/api/categories").then((res) => res.data);
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
    <div className="p-4 lg:px-20 xl:px-40 h-[calc(100vh-6rem)] md:h-[calc(100vh-9rem)] flex flex-col md:flex-row items-center">
      {data?.map((category: MenuType) => (
        <Link
          href={`/menu/${category.slug}`}
          key={category.id}
          className="w-full h-1/3 bg-cover sm:p-8 p-4 md:h-[45vh]"
          style={{ backgroundImage: `url(${category.img})` }}
        >
          <div className={`text-${category.color} sm:w-1/2 w-[70%]`}>
            <h1 className="uppercase font-bold text-3xl">{category.title}</h1>
            <p className="text-base sm:my-8 my-2 ">{category.desc}</p>
            <button
              className={`hidden 2xl:block bg-${category.color} text-${
                category.color === "black" ? "white" : "red-500"
              } py-2 px-4 rounded-md`}
            >
              Explore
            </button>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default MenuPage;
