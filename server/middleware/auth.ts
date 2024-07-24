import { loginRedirectUrl, logoutRedirectUrl } from "../api/auth/auth0";
import { PrismaClient } from "@prisma/client";
const prismaClient = new PrismaClient();
import jwt from "jsonwebtoken";
import fs from "fs";
const runtime = useRuntimeConfig();

export default defineEventHandler(async (event) => {
  console.log("middleware accessed");
  // const body = readBody(event);
  // console.log("this is the body in the middleware search for it", body);
  // const body = readBody(event);
  // let payload = jwt.verify(
  //   body.id_token,
  //   fs.readFileSync(process.cwd() + "/cert-dev.pem")
  // );
  // console.log("payload", payload);

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
        // await sendRedirect(event, logoutRedirectUrl(token));
        // const id_token = getCookie(event, "token");
        setCookie(event, "token", "");
        await sendRedirect(event, logoutRedirectUrl(token as string) || "");
        // try {
        //   await $fetch(`/api/auth/logout`, {
        //     mode: "no-cors",
        //     method: "GET",
        //     headers: {
        //       "Content-Type": "application/json",
        //     },
        //   });
        // } catch (error) {
        //   console.error("Error logging out:", error);
        // }
        // await sendRedirect(event, "/");
      }
    } else {
      console.log("token not found");
    }
  }
});
