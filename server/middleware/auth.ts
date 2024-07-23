import { loginRedirectUrl, logoutRedirectUrl } from "../api/auth/auth0";
import { PrismaClient } from "@prisma/client";
const prismaClient = new PrismaClient();
import jwt from "jsonwebtoken";
import fs from "fs";
const runtime = useRuntimeConfig();

export default defineEventHandler(async (event) => {
  console.log("middleware accessed");
  event.context.prisma = prismaClient;
  const token = getCookie(event, "token") || "";
  if (!token && !event.node.req.url?.includes("/api/auth/callback")) {
    await sendRedirect(event, loginRedirectUrl());
  } else {
    if (token) {
      try {
        const claims = jwt.verify(
          token,
          fs.readFileSync(process.cwd() + "/cert-dev.pem")
        );
        event.context.claims = claims;
        // event.context.currUser = await event.context.prisma.user.findFirst({
        //   where: { email: claims.email },
        // });
        // console.log("currUser", event.context.currUser);
        // if (!event.context.currUser) {
        //   console.error(`${claims.email} not found`);
        //   setCookie(event, "token", "");
        //   // setCookie(event, "cvuser", "");
        //   return await fetch("http://localhost:3000/api/auth/logout", {
        //     method: "GET",
        //     headers: {
        //       "Content-Type": "application/json",
        //     },
        //   });
        // }
      } catch (e) {
        console.error(e);
      }
    } else {
      // console.log("token not found");
    }
  }
});
