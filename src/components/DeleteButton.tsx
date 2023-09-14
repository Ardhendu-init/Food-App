"use client";

import serverAxios from "@/utils/http";
import { useSession } from "next-auth/react";

import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

const DeleteButton = ({ id }: { id: string }) => {
  const { data: session, status } = useSession();
  const router = useRouter();

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  if (status === "unauthenticated" || !session?.user.isAdmin) {
    return;
  }

  const handleDelete = async () => {
    try {
      const response = await serverAxios.delete(`/api/products/${id}`);

      if (response.status === 200) {
        router.push("/menu");
        toast("The product has been deleted!");
      } else {
        const data = await response.data;
        toast.error(data.message);
      }
    } catch (error) {
      console.error(error);

      throw error;
    }
  };

  return (
    <button
      className="uppercase  bg-red-500 hover:bg-red-600 text-white p-3 rounded-md"
      onClick={handleDelete}
    >
      Delete
    </button>
  );
};

export default DeleteButton;
