import { MenuType } from "@/types/types";
import serverAxios from "@/utils/http";
import Link from "next/link";
import React from "react";

const getCategories = async () => {
  try {
    const response = await serverAxios.get("/categories", {
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

const MenuPage: React.FC = () => {
  const menu: MenuType = [];
  return (
    <div className="p-4 lg:px-20 xl:px-40 h-[calc(100vh-6rem)] md:h-[calc(100vh-9rem)] flex flex-col md:flex-row items-center">
      {menu.map((category) => (
        <Link
          href={`/menu/${category.slug}`}
          key={category.id}
          className="w-full h-1/3 bg-cover p-8 md:h-[45vh]"
          style={{ backgroundImage: `url(${category.img})` }}
        >
          <div className={`text-${category.color} w-1/2`}>
            <h1 className="uppercase font-bold text-3xl">{category.title}</h1>
            <p className="text-base my-8">{category.desc}</p>
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
