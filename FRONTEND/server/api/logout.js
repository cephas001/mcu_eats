export default defineEventHandler(async (event) => {
  try {
    setCookie(event, "auth_token", "", {
      httpOnly: true,
      secure: true,
      sameSite: "none", // change later
      expires: new Date(0),
      domain: ".app.github.dev",
      path: "/",
    });

    return { message: "Logged out" };
  } catch (error) {
    throw error;
  }
});
