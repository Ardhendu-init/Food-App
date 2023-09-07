"use client";

import { Inputs, Option } from "@/types/types";
import { useSession } from "next-auth/react";
import { FaUpload, FaPlusCircle, FaTrash } from "react-icons/fa";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const AddPage = () => {
  const { data: session, status } = useSession();
  const [inputs, setInputs] = useState<Inputs>({
    title: "",
    desc: "",
    price: 0,
    catSlug: "",
  });

  const [option, setOption] = useState<Option>({
    title: "",
    additionalPrice: 0,
  });

  const [options, setOptions] = useState<Option[]>([]);
  const [file, setFile] = useState<File>();

  const router = useRouter();

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  if (status === "unauthenticated" || !session?.user.isAdmin) {
    router.push("/");
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setInputs((prev) => {
      return {
        ...prev,
        [name]: name === "price" ? parseFloat(value) : value,
      };
    });
  };
  const changeOption = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setOption((prev) => {
      return {
        ...prev,
        [name]: name === "additionalPrice" ? parseFloat(value) : value,
      };
    });
  };

  const handleChangeImg = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    const item = (target.files as FileList)[0];

    setFile(item);
  };

  const upload = async () => {
    const data = new FormData();
    data.append("file", file!);
    data.append("upload_preset", "restaurant");
    data.append("cloud_name", "dgsvcxwsd");

    const res = await fetch(
      "https://api.cloudinary.com/v1_1/dgsvcxwsd/image/upload",
      {
        method: "POST",

        body: data,
      }
    );

    const resData = await res.json();

    return resData.url;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("first", inputs, option);
    try {
      const url = await upload();
      // const url = "//temporary/p1.png";
      const res = await fetch("http://localhost:3000/api/products", {
        method: "POST",
        body: JSON.stringify({
          img: url,
          ...inputs,
          options,
        }),
      });

      const data = await res.json();

      router.push(`/product/${data.id}`);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="p-4 sm:px-8 md:px-12 lg:px-20 xl:px-40  mx-auto bg-[url('/offerBg.png')]">
      <form onSubmit={handleSubmit} className="w-full max-w-xl mx-auto mt-4">
        <h1 className="text-4xl mb-4 text-gray-300 font-bold text-center">
          Add New Product
        </h1>
        <div className="flex flex-col gap-3">
          <div className="w-full flex flex-col gap-3 ">
            <label className="text-lg text-white font-medium">Title</label>
            <input
              className="ring-1 ring-red-200 p-4 rounded-sm placeholder-red-200 outline-none"
              type="text"
              placeholder="Bella Napoli"
              name="title"
              onChange={handleChange}
            />
          </div>
          <div className="w-full flex flex-col gap-3">
            <label className="text-lg text-white font-medium">
              Description
            </label>
            <textarea
              rows={3}
              className="ring-1 ring-red-200 p-4 rounded-sm placeholder-text-red-200 outline-none"
              placeholder="A timeless favorite with a twist, showcasing a thin crust topped with sweet tomatoes, fresh basil and creamy mozzarella."
              name="desc"
              onChange={handleChange}
            />
          </div>
          <div className="w-full flex flex-col gap-3 ">
            <label className="text-lg text-white font-medium">Price</label>
            <input
              className="ring-1 ring-red-200 p-4 rounded-sm placeholder-text-red-200 outline-none"
              type="number"
              placeholder="29"
              name="price"
              onChange={handleChange}
            />
          </div>
          <div className="w-full flex flex-col gap-3 ">
            <label className="text-lg text-white font-medium">Category</label>
            <input
              className="ring-1 ring-red-200 p-4 rounded-sm placeholder-text-red-200 outline-none"
              type="text"
              placeholder="pizzas"
              name="catSlug"
              onChange={handleChange}
            />
          </div>
          <div className="w-full flex flex-col gap-3">
            <label className="text-lg text-white font-medium">Options</label>
            <div className="flex gap-2 flex-col md:flex-row">
              <input
                className="ring-1 ring-red-200 p-4 rounded-sm placeholder-text-red-200 outline-none"
                type="text"
                placeholder="Title"
                name="title"
                onChange={changeOption}
              />
              <input
                className="ring-1 ring-red-200 p-4 rounded-sm placeholder-text-red-200 outline-none"
                type="number"
                placeholder="Additional Price"
                name="additionalPrice"
                onChange={changeOption}
              />

              <div
                className="bg-gray-500 p-3 text-white rounded-md hover:bg-gray-700 transition-colors duration-300 flex items-center justify-center"
                onClick={() => setOptions((prev) => [...prev, option])}
              >
                <FaPlusCircle size={22} />
              </div>
            </div>
            <div className="flex flex-wrap gap-4 mt-2">
              {options.map((opt) => (
                <div
                  key={opt.title}
                  className="p-2  rounded-md cursor-pointer bg-gray-200 text-gray-400 flex items-center justify-between"
                  onClick={() =>
                    setOptions((prev) =>
                      prev.filter((item) => item.title !== opt.title)
                    )
                  }
                >
                  <span>{opt.title}</span>
                  <span className="text-xs"> (+{opt.additionalPrice})</span>
                  <FaTrash className="text-red-500 cursor-pointer" />{" "}
                  {/* Delete icon */}
                </div>
              ))}
            </div>
          </div>
          <div className="w-full flex flex-col gap-2 bg-red-200 py-5 mb-3 items-center rounded-sm ">
            <label
              className="text-sm cursor-pointer flex gap-4 items-center"
              htmlFor="file"
            >
              <FaUpload /> {/* Replace the image with the FaUpload icon */}
              <span>Upload Image</span>
            </label>
            <input
              type="file"
              onChange={handleChangeImg}
              id="file"
              className="hidden"
            />
          </div>
        </div>
        <button
          type="submit"
          className="bg-red-500 p-4 text-white rounded-md hover:bg-red-600 transition-colors duration-300 w-full"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddPage;
