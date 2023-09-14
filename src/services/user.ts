import UserRepository from "@/repositories/UserRepository";

const getById = (id: string) => {
  return UserRepository.getById(id);
};

const getPasswordByUsername = (username: string) => {
  return UserRepository.getPasswordByUsername(username);
};

export const userService = {
  getById,
  getPasswordByUsername,
};
