"use client";
import React from "react";
import Image from "next/image";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const LoginUser: React.FC = () => {
  const { status, data } = useSession();
  const router = useRouter();

  return (
    <div className="relative group">
      {/* User dropdown */}
      {status === "unauthenticated" ? (
        <button
          className="cursor-pointer bg-orange-300 hover:bg-orange-400 px-2  rounded-md   font-medium"
          onClick={() => router.push("/login")}
        >
          Login
        </button>
      ) : (
        <div>
          {data?.user.image && (
            <Image
              src={data?.user?.image}
              alt="User Icon"
              width={40}
              height={40}
              className="cursor-pointer rounded-full"
            />
          )}

          <div className="absolute top-full right-0 hidden group-hover:block bg-gradient-to-t from-red-500 to-orange-500 text-white py-2 px-4 space-y-2 border border-gray-200 rounded-lg shadow-lg z-10 ">
            <p className="whitespace-nowrap">
              {" "}
              Welcome {String(data?.user?.name).split(" ")[0]} !
            </p>
            <button
              className="cursor-pointer bg-orange-300 px-2  rounded-md   font-medium hover:bg-orange-400 "
              onClick={() => signOut()}
            >
              Logout
            </button>
            <div>
              <Link
                href="/orders"
                className="bg-orange-300 px-2 py-1 rounded-md hover:bg-orange-400"
              >
                Orders
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LoginUser;
