import { NextFetchEvent, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const GET = async () => {
  const data = await prisma.post.findMany();
  return new NextResponse(JSON.stringify(data));
};
