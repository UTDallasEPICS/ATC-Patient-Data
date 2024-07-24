import { logoutRedirectUrl } from "./auth0";

export default defineEventHandler(async (event) => {
  // console.log("inside logout api");
  const id_token = getCookie(event, "token");
  setCookie(event, "token", "");

  // console.log("from logout api id_token", id_token);
  // console.log(
  //   "from logout api logoutRedirectUrl",
  //   logoutRedirectUrl(id_token as string) || ""
  // );
  await sendRedirect(event, logoutRedirectUrl(id_token as string) || "");
  console.log("inside of logout.get.ts and after sendRedirect");
  // window.location.href = "http://localhost:3000/";
  // return await sendRedirect(event, "/");
});
