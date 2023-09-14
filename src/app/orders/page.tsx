"use client";
import { OrderType } from "@/types/types";
import serverAxios from "@/utils/http";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { useSession } from "next-auth/react";

import { useRouter } from "next/navigation";
import React, { useState } from "react";

const OrdersPage = () => {
  const [statusUpdates, setStatusUpdates] = useState<{ [key: string]: string }>(
    {}
  );
  const { data: session, status } = useSession();
  const router = useRouter();
  const { isLoading, error, data } = useQuery({
    queryKey: ["orders"],
    queryFn: () => {
      return serverAxios.get("/api/orders").then((res) => res.data);
    },
  });

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async ({ id, status }: { id: string; status: string }) => {
      try {
        const response = await serverAxios.put(
          `/api/orders/${id}`,
          { status },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        console.log("first", response.data);
        return response.data;
      } catch (error) {
        // Handle any errors here
        throw error;
      }
    },
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
    },
  });

  const hanndleUpdate = (e: React.FormEvent<HTMLFormElement>, id: string) => {
    e.preventDefault();
    const status = statusUpdates[id];
    mutation.mutate({ id, status });
  };
  if (status === "loading" || isLoading) {
    return "Loading ...";
  }
  if (status === "unauthenticated") {
    router.push("/");
  } else {
    return (
      <div className="p-4 lg:px-20 xl:px-40 overflow-auto">
        <table className="w-full border-collapse border  ">
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
                  <td className="hidden md:table-cell py-3 px-4">{item.id}</td>
                  <td className="py-3 px-4">
                    {item.createdAt.toString().slice(0, 10)}
                  </td>
                  <td className="py-3 px-4">{item.price}</td>
                  <td className="hidden md:table-cell py-3 px-4">
                    {item.products[0].title}
                  </td>
                  {session?.user.isAdmin ? (
                    <td>
                      <form
                        onSubmit={(e) => hanndleUpdate(e, item.id)}
                        className="flex items-center gap-2"
                      >
                        <select
                          value={statusUpdates[item.id] || ""}
                          onChange={(e) => {
                            setStatusUpdates({
                              ...statusUpdates,
                              [item.id]: e.target.value,
                            });
                          }}
                          className="bg-transparent p-2 ring-1 ring-red-100 rounded-md"
                        >
                          <option value="Preparing">Preparing your Food</option>
                          <option value="Preparation Done">
                            Preparation done
                          </option>
                          <option value="Discharge For Delivery">
                            Discharge for delivery
                          </option>
                          <option value="Delivered">Delivered</option>
                        </select>
                        <button
                          type="submit"
                          className="p-2 bg-red-500 rounded-md text-white"
                        >
                          Update
                        </button>
                      </form>
                    </td>
                  ) : (
                    <td className="py-3 px-4">
                      <span className="text-green-500">{item.status}</span>
                    </td>
                  )}
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
  }
};

export default OrdersPage;
