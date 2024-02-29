import { NextResponse } from "next/server";

//import prisma from "./lib/prisma";

export default async function middleware(req) {
  //@ts-ignore
  //const user = await prisma.user.findFirst({where: {email: session.email}})
  //console.log({user})
  return NextResponse.next();
};
