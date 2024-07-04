import { logoutRedirectUrl } from "./auth0";

export default defineEventHandler(async (event) => {
  const id_token = getCookie(event, "token");
  await sendRedirect(event, logoutRedirectUrl(id_token as string) || "");
});
