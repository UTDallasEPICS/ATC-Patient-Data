export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  setCookie(event, "token", body.id_token);
  await sendRedirect(event, "/students");
});
