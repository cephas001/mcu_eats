export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  setCookie(event, "auth_token", body.token, {
    httpOnly: true,
    secure: true,
    sameSite: "none", // change later
    domain: ".app.github.dev",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });

  return { message: "Success" };
});
