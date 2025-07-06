const User = require("../domain/User");
const { createUserSchema } = require("../validators/validateUserData");

function createUser(userRepo) {
  return async function (userData) {
    const validationResult = createUserSchema.safeParse(userData);

    if (!validationResult.success) {
      const messages = validationResult.error.errors
        .map((e) => {
          const field = e.path.join(".") || "unknown";
          return `• ${field}: ${e.message}`;
        })
        .join("\n");

      throw new Error(`Validation failed:\n${messages}`);
    }

    const validatedData = validationResult.data;

    // Check if user already exists
    const existingUser = await userRepo.findById(validatedData.id);

    if (existingUser) {
      throw new Error("User with this email already exists");
    }
    // Create a new user instance
    const user = new User(validatedData);
    return await userRepo.create(user);
  };
}

module.exports = createUser;
