import { NextResponse } from "next/server";
import {
  getSession,
} from "@auth0/nextjs-auth0";
import prisma from "./lib/prisma";

export default async function middleware(req) {
  //@ts-ignore
  const session = await getSession(req);
  const user = await prisma.user.findFirst({where: {email: session.email}})
  console.log({user})
  return NextResponse.next();
};
