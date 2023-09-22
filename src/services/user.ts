import UserRepository from "@/repositories/UserRepository";

const getById = (id: string) => {
  return UserRepository.getById(id);
};
const getAllPassengers = () => {
  return UserRepository.getAll({
    filters: [{ key: "role", operation: "==", value: "passenger" }],
  });
};

const getPasswordByUsername = (username: string) => {
  return UserRepository.getPasswordByUsername(username);
};

export const userService = {
  getById,
  getPasswordByUsername,
  getAllPassengers,
};
