export default defineEventHandler(async (event) => {
  setCookie(event, "auth_token", "", {
    httpOnly: true,
    secure: true,
    sameSite: "none", // change later
    expires: new Date(0),
    domain: ".app.github.dev",
    path: "/",
  });

  return { message: "Logged out" };
});
