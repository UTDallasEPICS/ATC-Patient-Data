import jwt from "jsonwebtoken";
import fs from "fs";

export default defineEventHandler(async (event) => {
  console.log("callback accessed");
  const body = await readBody(event);
  let retrievedEmail;
  // console.log("this is the body in the callback.post.ts search for it", body);
  let payload = jwt.verify(
    body.id_token,
    fs.readFileSync(process.cwd() + "/cert-dev.pem")
  );
  console.log("payload", payload);

  if (typeof payload === "object" && "email" in payload) {
    retrievedEmail = payload.email;
  }

  let retrievedUser;
  try {
    retrievedUser = await event.context.prisma.user.findFirst({
      where: { email: retrievedEmail },
    });
    // if (!retrievedUser) {
    // console.error(`${retrievedEmail} not found`);
    // return await fetch("http://localhost:3000/api/auth/logout", {
    //   method: "GET",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    // });
    // } else {
    console.log("retrievedUser", retrievedUser);
    setCookie(event, "token", body.id_token);
    setCookie(event, "userId", retrievedUser.id.toString());
    await sendRedirect(event, "/students");
    // }
  } catch (error) {
    console.error(error);
  }
});
