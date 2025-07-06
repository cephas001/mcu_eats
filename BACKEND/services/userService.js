const MongoUserRepository = require("../infrastructure/MongoUserRepository.js");
const createUser = require("../../APPLICATION/usecases/createUser.js");

const userRepo = new MongoUserRepository();

const createUserUseCase = createUser(userRepo);

module.exports = {
  createUserUseCase,
};
