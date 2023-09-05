"use client";
import { OrderType } from "@/types/types";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React from "react";

const OrdersPage = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const { isLoading, error, data } = useQuery({
    queryKey: ["orders"],
    queryFn: () => {
      return fetch("http://localhost:3000/api/orders").then((res) =>
        res.json()
      );
    },
  });

  if (status === "unauthenticated") {
    router.push("/");
  }

  if (status === "loading" || isLoading) {
    return "Loading ...";
  }

  return (
    <div className="p-4 lg:px-20 xl:px-40">
      <table className="w-full border-collapse border">
        <thead>
          <tr className="text-left bg-red-500 text-white">
            <th className="hidden md:table-cell py-3 px-4">Order ID</th>
            <th className="py-3 px-4">Date</th>
            <th className="py-3 px-4">Price</th>
            <th className="hidden md:table-cell py-3 px-4">Products</th>
            <th className="py-3 px-4">Status</th>
          </tr>
        </thead>
        <tbody>
          {data ? (
            data.map((item: OrderType) => (
              <tr
                className="text-sm md:text-base odd:bg-gray-100"
                key={item.id}
              >
                <td className="hidden md:table-cell py-3 px-4">
                  1237861238721
                </td>
                <td className="py-3 px-4">19.07.2023</td>
                <td className="py-3 px-4">$89.90</td>
                <td className="hidden md:table-cell py-3 px-4">
                  Big Burger Menu (2), Veggie Pizza (2), Coca Cola 1L (2)
                </td>
                <td className="py-3 px-4">
                  <span className="text-green-500">On the way</span> (approx.
                  10min)...
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={5}>No orders available.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default OrdersPage;
